/**
 * clmtrackr library (https://www.github.com/auduno/clmtrackr/)
 *
 * Copyright (c) 2013, Audun Mathias Øygard
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

"use strict";
//requires: ccv.js, numeric.js

var clm = {
	tracker : function(params) {
		
		if (!params) params = {};
		if (params.constantVelocity === undefined) params.constantVelocity = true;
		if (params.searchWindow === undefined) params.searchWindow = 11;
		if (params.useWebGL === undefined) params.useWebGL = true;
		if (params.scoreThreshold === undefined) params.scoreThreshold = 0.5;
		if (params.stopOnConvergence === undefined) params.stopOnConvergence = false;
		if (params.weightPoints === undefined) params.weightPoints = undefined;
		if (params.sharpenResponse === undefined) params.sharpenResponse = false;

		if (params.faceDetection === undefined) params.faceDetection = {};
		if (params.faceDetection.workSize === undefined) params.faceDetection.workSize = 160;
		if (params.faceDetection.minScale === undefined) params.faceDetection.minScale = 2;
		if (params.faceDetection.scaleFactor === undefined) params.faceDetection.scaleFactor = 1.15;
		if (params.faceDetection.useCanny === undefined) params.faceDetection.useCanny = false;
		if (params.faceDetection.edgesDensity === undefined) params.faceDetection.edgesDensity = 0.13;
		if (params.faceDetection.equalizeHistogram === undefined) params.faceDetection.equalizeHistogram = true;
		
		var numPatches, patchSize, numParameters, patchType;
		var gaussianPD;
		var eigenVectors, eigenValues;
		var sketchCC, sketchW, sketchH, sketchCanvas;
		var candidate;
		var weights, model, biases;
		
		var sobelInit = false;
		var lbpInit = false;
		
		var currentParameters = [];
		var currentPositions = [];
		var previousParameters = [];
		var previousPositions = [];
		
		var patches = [];
		var responses = [];
		var meanShape = [];
		
		var responseMode = 'single';
		var responseList = ['raw'];
		var responseIndex = 0;
		
		/*
		It's possible to experiment with the sequence of variances used for the finding the maximum in the KDE.
		This sequence is pretty arbitrary, but was found to be okay using some manual testing.
		*/
		var varianceSeq = [10,5,1];
		//var varianceSeq = [3,1.5,0.75];
		//var varianceSeq = [6,3,0.75];
		var PDMVariance = 0.7;
		
		var relaxation = 0.1;
		
		var first = true;
		
		var convergenceLimit = 0.01;
		
		var learningRate = [];
		var stepParameter = 1.25;
		var prevCostFunc = []
		
		var searchWindow;
		var modelWidth, modelHeight;
		var halfSearchWindow, vecProbs, responsePixels;
		
		if(typeof Float64Array !== 'undefined') {
			var updatePosition = new Float64Array(2);
			var vecpos = new Float64Array(2);
		} else {
			var updatePosition = new Array(2);
			var vecpos = new Array(2);
		}
		var pw, pl, pdataLength;
		
		var facecheck_count = 0;
		
		var webglFi, svmFi, mosseCalc, jf;

		var scoringCanvas = document.createElement('canvas');
		//document.body.appendChild(scoringCanvas);
		var scoringContext = scoringCanvas.getContext('2d');
		var msxmin, msymin, msxmax, msymax;
		var msmodelwidth, msmodelheight;
		var scoringWeights, scoringBias;
		var scoringHistory = [];
		var meanscore = 0;

		var mossef_lefteye, mossef_righteye, mossef_nose;
		var right_eye_position = [0.0,0.0];
		var left_eye_position = [0.0,0.0];
		var nose_position = [0.0,0.0];
		var lep, rep, mep;
		var runnerTimeout, runnerElement, runnerBox;
		
		var pointWeights;

		var halfPI = Math.PI/2;
		
		/*
		 *	load model data, initialize filters, etc.
		 *
		 *	@param	<Object>	pdm model object
		 */
		this.init = function(pdmmodel) {
			
			model = pdmmodel;
			
			// load from model
			patchType = model.patchModel.patchType;
			numPatches = model.patchModel.numPatches;
			patchSize = model.patchModel.patchSize[0];
			if (patchType == "MOSSE") {
				searchWindow = patchSize;
			} else {
				searchWindow = params.searchWindow;
			}
			numParameters = model.shapeModel.numEvalues;
			modelWidth = model.patchModel.canvasSize[0];
			modelHeight = model.patchModel.canvasSize[1];
			
			// set up canvas to work on
			sketchCanvas = document.createElement('canvas');
			sketchCC = sketchCanvas.getContext('2d');

			sketchW = sketchCanvas.width = modelWidth + (searchWindow-1) + patchSize-1;
			sketchH = sketchCanvas.height = modelHeight + (searchWindow-1) + patchSize-1;
			
			if (model.hints && mosseFilter && left_eye_filter && right_eye_filter && nose_filter) {
				//var mossef_lefteye = new mosseFilter({drawResponse : document.getElementById('overlay2')});
				mossef_lefteye = new mosseFilter();
				mossef_lefteye.load(left_eye_filter);
				//var mossef_righteye = new mosseFilter({drawResponse : document.getElementById('overlay2')});
				mossef_righteye = new mosseFilter();
				mossef_righteye.load(right_eye_filter);
				//var mossef_nose = new mosseFilter({drawResponse : document.getElementById('overlay2')});
				mossef_nose = new mosseFilter();
				mossef_nose.load(nose_filter);
			} else {
				console.log("MOSSE filters not found, using rough approximation for initialization.");
			}

			// load eigenvectors
			eigenVectors = numeric.rep([numPatches*2,numParameters],0.0);
			for (var i = 0;i < numPatches*2;i++) {
				for (var j = 0;j < numParameters;j++) {
					eigenVectors[i][j] = model.shapeModel.eigenVectors[i][j];
				}
			}
			
			// load mean shape
			for (var i = 0; i < numPatches;i++) {
				meanShape[i] = [model.shapeModel.meanShape[i][0], model.shapeModel.meanShape[i][1]];
			}

			// get max and mins, width and height of meanshape
			msxmax = msymax = 0;
			msxmin = msymin = 1000000;
			for (var i = 0;i < numPatches;i++) {
				if (meanShape[i][0] < msxmin) msxmin = meanShape[i][0];
				if (meanShape[i][1] < msymin) msymin = meanShape[i][1];
				if (meanShape[i][0] > msxmax) msxmax = meanShape[i][0];
				if (meanShape[i][1] > msymax) msymax = meanShape[i][1];
			}
			msmodelwidth = msxmax-msxmin;
			msmodelheight = msymax-msymin;
			
			// get scoringweights if they exist
			if (model.scoring) {
				scoringWeights = new Float64Array(model.scoring.coef);
				scoringBias = model.scoring.bias;
				scoringCanvas.width = model.scoring.size[0];
				scoringCanvas.height = model.scoring.size[1];
			}
			
			// load eigenvalues
			eigenValues = model.shapeModel.eigenValues;
			
			weights = model.patchModel.weights;
			biases = model.patchModel.bias;
			
			// precalculate gaussianPriorDiagonal
			gaussianPD = numeric.rep([numParameters+4, numParameters+4],0);
			// set values and append manual inverse
			for (var i = 0;i < numParameters;i++) {
				if (model.shapeModel.nonRegularizedVectors.indexOf(i) >= 0) {
					gaussianPD[i+4][i+4] = 1/10000000;
				} else {
					gaussianPD[i+4][i+4] = 1/eigenValues[i];
				}
			}
			
			for (var i = 0;i < numParameters+4;i++) {
				currentParameters[i] = 0;
			}
			
			if (patchType == "SVM") {
				var webGLContext;
				var webGLTestCanvas = document.createElement('canvas');
				if (window.WebGLRenderingContext) {
					webGLContext = webGLTestCanvas.getContext('webgl') || webGLTestCanvas.getContext('experimental-webgl');
					if (!webGLContext || !webGLContext.getExtension('OES_texture_float')) {
						webGLContext = null;
					}
				} 
				
				if (webGLContext && params.useWebGL && (typeof(webglFilter) !== "undefined")) {
					webglFi = new webglFilter();
					try {
						webglFi.init(weights, biases, numPatches, searchWindow+patchSize-1, searchWindow+patchSize-1, patchSize, patchSize);
						if ('lbp' in weights) lbpInit = true;
						if ('sobel' in weights) sobelInit = true;
					} 
					catch(err) {
						alert("There was a problem setting up webGL programs, falling back to slightly slower javascript version. :(");
						webglFi = undefined;
						svmFi = new svmFilter();
						svmFi.init(weights['raw'], biases['raw'], numPatches, patchSize, searchWindow);
					}
				} else if (typeof(svmFilter) !== "undefined") {
					// use fft convolution if no webGL is available
					svmFi = new svmFilter();
					svmFi.init(weights['raw'], biases['raw'], numPatches, patchSize, searchWindow);
				} else {
					throw "Could not initiate filters, please make sure that svmfilter.js or svmfilter_conv_js.js is loaded."
				}
			} else if (patchType == "MOSSE") {
				mosseCalc = new mosseFilterResponses();
				mosseCalc.init(weights, numPatches, patchSize, patchSize);
			}
			
			if (patchType == "SVM") {
				pw = pl = patchSize+searchWindow-1;
			} else {
				pw = pl = searchWindow;
			}
			pdataLength = pw*pl;
			halfSearchWindow = (searchWindow-1)/2;
			responsePixels = searchWindow*searchWindow;
			if(typeof Float64Array !== 'undefined') {
				vecProbs = new Float64Array(responsePixels);
				for (var i = 0;i < numPatches;i++) {
					patches[i] = new Float64Array(pdataLength);
				}
			} else {
				vecProbs = new Array(responsePixels);
				for (var i = 0;i < numPatches;i++) {
					patches[i] = new Array(pdataLength);
				}
			}
			
			for (var i = 0;i < numPatches;i++) {
				learningRate[i] = 1.0;
				prevCostFunc[i] = 0.0;
			}

			if (params.weightPoints) {
				// weighting of points 
				pointWeights = [];
				for (var i = 0;i < numPatches;i++) {
					if (i in params.weightPoints) {
						pointWeights[(i*2)] = params.weightPoints[i];
						pointWeights[(i*2)+1] = params.weightPoints[i];
					} else {
						pointWeights[(i*2)] = 1;
						pointWeights[(i*2)+1] = 1;
					}
				}
				pointWeights = numeric.diag(pointWeights);
			}
		}
		
		/*
		 *	starts the tracker to run on a regular interval
		 */
		this.start = function(element, box) {
			// check if model is initalized, else return false
			if (typeof(model) === "undefined") {
				console.log("tracker needs to be initalized before starting to track.");
				return false;
			}
			//check if a runnerelement already exists, if not, use passed parameters
			if (typeof(runnerElement) === "undefined") {
				runnerElement = element;
				runnerBox = box;
			}
			// setup the jsfeat face tracker with the element
			jf = new jsfeat_face(element, params.faceDetection.workSize);
			// start named timeout function
			runnerTimeout = requestAnimFrame(runnerFunction);
		}

		/*
		 *	stop the running tracker
		 */
		this.stop = function() {
			// stop the running tracker if any exists
			cancelRequestAnimFrame(runnerTimeout);
		}

		/*
		 *  element : canvas or video element
		 *  TODO: should be able to take img element as well
		 */
		this.track = function(element, box) {
			
			var evt = document.createEvent("Event");
			evt.initEvent("clmtrackrBeforeTrack", true, true);
			document.dispatchEvent(evt)

			var scaling, translateX, translateY, rotation;
			var croppedPatches = [];
			var ptch, px, py;
						
			if (first) {
				// do viola-jones on canvas to get initial guess, if we don't have any points
				var gi = getInitialPosition(element, box);
				if (!gi) {
					// send an event on no face found
					var evt = document.createEvent("Event");
					evt.initEvent("clmtrackrNotFound", true, true);
					document.dispatchEvent(evt)
					
					return false;
				}
				scaling = gi[0];
				rotation = gi[1];
				translateX = gi[2];
				translateY = gi[3];
				
				first = false;
			} else {
				facecheck_count += 1;
				
				if (params.constantVelocity) {
					// calculate where to get patches via constant velocity prediction
					if (previousParameters.length >= 2) {
						for (var i = 0;i < currentParameters.length;i++) {
							currentParameters[i] = (relaxation)*previousParameters[1][i] + (1-relaxation)*((2*previousParameters[1][i]) - previousParameters[0][i]);
							//currentParameters[i] = (3*previousParameters[2][i]) - (3*previousParameters[1][i]) + previousParameters[0][i];
						}
					}
				}
				
				// change translation, rotation and scale parameters
				rotation = halfPI - Math.atan((currentParameters[0]+1)/currentParameters[1]);
				if (rotation > halfPI) {
					rotation -= Math.PI;
				}
				scaling = currentParameters[1] / Math.sin(rotation);
				translateX = currentParameters[2];
				translateY = currentParameters[3];
			}
			
			// copy canvas to a new dirty canvas
			sketchCC.save();
			
			// clear canvas
			sketchCC.clearRect(0, 0, sketchW, sketchH);
			
			sketchCC.scale(1/scaling, 1/scaling);
			sketchCC.rotate(-rotation);
			sketchCC.translate(-translateX, -translateY);
			
			sketchCC.drawImage(element, 0, 0, element.width, element.height);
			
			sketchCC.restore();
			//	get cropped images around new points based on model parameters (not scaled and translated)
			var patchPositions = calculatePositions(currentParameters, false);
			
			// check whether tracking is ok
			if (scoringWeights && (facecheck_count % 10 == 0)) {
				if (!checkTracking()) {
					// reset all parameters
					first = true;
					scoringHistory = [];
					for (var i = 0;i < currentParameters.length;i++) {
						currentParameters[i] = 0;
						previousParameters = [];
					}
					
					// send event to signal that tracking was lost
					var evt = document.createEvent("Event");
					evt.initEvent("clmtrackrLost", true, true);
					document.dispatchEvent(evt)
					
					return false;
				}
			}


			var pdata, pmatrix, grayscaleColor;
			for (var i = 0; i < numPatches; i++) {
				px = patchPositions[i][0]-(pw/2);
				py = patchPositions[i][1]-(pl/2);
				ptch = sketchCC.getImageData(Math.round(px), Math.round(py), pw, pl);
				pdata = ptch.data;
				
				// convert to grayscale
				pmatrix = patches[i];
				for (var j = 0;j < pdataLength;j++) {
					grayscaleColor = pdata[j*4]*0.3 + pdata[(j*4)+1]*0.59 + pdata[(j*4)+2]*0.11;
					pmatrix[j] = grayscaleColor;
				}
			}
			
			/*print weights*/
			/*sketchCC.clearRect(0, 0, sketchW, sketchH);
			var nuWeights;
			for (var i = 0;i < numPatches;i++) {
				nuWeights = weights[i].map(function(x) {return x*2000+127;});
				drawData(sketchCC, nuWeights, patchSize, patchSize, false, patchPositions[i][0]-(patchSize/2), patchPositions[i][1]-(patchSize/2));
			}*/
			
			// print patches
			/*sketchCC.clearRect(0, 0, sketchW, sketchH);
			for (var i = 0;i < numPatches;i++) {
				if ([27,32,44,50].indexOf(i) > -1) {
					drawData(sketchCC, patches[i], pw, pl, false, patchPositions[i][0]-(pw/2), patchPositions[i][1]-(pl/2));
				}
			}*/
			if (patchType == "SVM") {
				if (typeof(webglFi) !== "undefined") {
					responses = getWebGLResponses(patches);
				} else if (typeof(svmFi) !== "undefined"){
					responses = svmFi.getResponses(patches);
				} else {
					throw "SVM-filters do not seem to be initiated properly."
				}
			} else if (patchType == "MOSSE") {
				responses = mosseCalc.getResponses(patches);
			}

			// option to increase sharpness of responses
			if (params.sharpenResponse) {
				for (var i = 0;i < numPatches;i++) {
					for (var j = 0;j < responses[i].length;j++) {
						responses[i][j] = Math.pow(responses[i][j], params.sharpenResponse);
					}
				}
			}

			// print responses
			/*sketchCC.clearRect(0, 0, sketchW, sketchH);
			var nuWeights;
			for (var i = 0;i < numPatches;i++) {
		
				nuWeights = [];
				for (var j = 0;j < responses[i].length;j++) {
					nuWeights.push(responses[i][j]*255);
				}
				
				//if ([27,32,44,50].indexOf(i) > -1) {
				//	drawData(sketchCC, nuWeights, searchWindow, searchWindow, false, patchPositions[i][0]-((searchWindow-1)/2), patchPositions[i][1]-((searchWindow-1)/2));
				//}
				drawData(sketchCC, nuWeights, searchWindow, searchWindow, false, patchPositions[i][0]-((searchWindow-1)/2), patchPositions[i][1]-((searchWindow-1)/2));
			}*/
			
			// iterate until convergence or max 10, 20 iterations?:
			var originalPositions = currentPositions;
			var jac;
			var meanshiftVectors = [];
			
			for (var i = 0; i < varianceSeq.length; i++) {
				
				// calculate jacobian
				jac = createJacobian(currentParameters, eigenVectors);

				// for debugging
				//var debugMVs = [];
				//
				
				var opj0, opj1;
				
				for (var j = 0;j < numPatches;j++) {
					opj0 = originalPositions[j][0]-((searchWindow-1)*scaling/2);
					opj1 = originalPositions[j][1]-((searchWindow-1)*scaling/2);
					
					// calculate PI x gaussians
					var vpsum = gpopt(searchWindow, currentPositions[j], updatePosition, vecProbs, responses, opj0, opj1, j, varianceSeq[i], scaling);
					
					// calculate meanshift-vector
					gpopt2(searchWindow, vecpos, updatePosition, vecProbs, vpsum, opj0, opj1, scaling);
					
					// for debugging
					//var debugMatrixMV = gpopt2(searchWindow, vecpos, updatePosition, vecProbs, vpsum, opj0, opj1);
					
					// evaluate here whether to increase/decrease stepSize
					/*if (vpsum >= prevCostFunc[j]) {
						learningRate[j] *= stepParameter;
					} else {
						learningRate[j] = 1.0;
					}
					prevCostFunc[j] = vpsum;*/
					
					// compute mean shift vectors
					// extrapolate meanshiftvectors
					/*var msv = [];
					msv[0] = learningRate[j]*(vecpos[0] - currentPositions[j][0]);
					msv[1] = learningRate[j]*(vecpos[1] - currentPositions[j][1]);
					meanshiftVectors[j] = msv;*/
					meanshiftVectors[j] = [vecpos[0] - currentPositions[j][0], vecpos[1] - currentPositions[j][1]];
					
					//if (isNaN(msv[0]) || isNaN(msv[1])) debugger;
					
					//for debugging
					//debugMVs[j] = debugMatrixMV;
					//
				}
				
				// draw meanshiftVector
				/*sketchCC.clearRect(0, 0, sketchW, sketchH);
				var nuWeights;
				for (var npidx = 0;npidx < numPatches;npidx++) {
					nuWeights = debugMVs[npidx].map(function(x) {return x*255*500;});
					drawData(sketchCC, nuWeights, searchWindow, searchWindow, false, patchPositions[npidx][0]-((searchWindow-1)/2), patchPositions[npidx][1]-((searchWindow-1)/2));
				}*/
				
				var meanShiftVector = numeric.rep([numPatches*2, 1],0.0);
				for (var k = 0;k < numPatches;k++) {
					meanShiftVector[k*2][0] = meanshiftVectors[k][0];
					meanShiftVector[(k*2)+1][0] = meanshiftVectors[k][1];
				}
				
				// compute pdm parameter update
				//var prior = numeric.mul(gaussianPD, PDMVariance);
				var prior = numeric.mul(gaussianPD, varianceSeq[i]);
				if (params.weightPoints) {
					var jtj = numeric.dot(numeric.transpose(jac), numeric.dot(pointWeights, jac));
				} else {
					var jtj = numeric.dot(numeric.transpose(jac), jac);
				}
				var cpMatrix = numeric.rep([numParameters+4, 1],0.0);
				for (var l = 0;l < (numParameters+4);l++) {
					cpMatrix[l][0] = currentParameters[l];
				}
				var priorP = numeric.dot(prior, cpMatrix);
				if (params.weightPoints) {
					var jtv = numeric.dot(numeric.transpose(jac), numeric.dot(pointWeights, meanShiftVector));
				} else {
					var jtv = numeric.dot(numeric.transpose(jac), meanShiftVector);
				}
				var paramUpdateLeft = numeric.add(prior, jtj);
				var paramUpdateRight = numeric.sub(priorP, jtv);
				var paramUpdate = numeric.dot(numeric.inv(paramUpdateLeft), paramUpdateRight);
				//var paramUpdate = numeric.solve(paramUpdateLeft, paramUpdateRight, true);
				
				var oldPositions = currentPositions;
				
				// update estimated parameters
				for (var k = 0;k < numParameters+4;k++) {
					currentParameters[k] -= paramUpdate[k];
				}
				
				// clipping of parameters if they're too high
				var clip;
				for (var k = 0;k < numParameters;k++) {
					clip = Math.abs(3*Math.sqrt(eigenValues[k]));
					if (Math.abs(currentParameters[k+4]) > clip) {
						if (currentParameters[k+4] > 0) {
							currentParameters[k+4] = clip;
						} else {
							currentParameters[k+4] = -clip;
						}
					}
					
				}
				
				// update current coordinates
				currentPositions = calculatePositions(currentParameters, true);
				
				// check if converged
				// calculate norm of parameterdifference
				var positionNorm = 0;
				var pnsq_x, pnsq_y;
				for (var k = 0;k < currentPositions.length;k++) {
					pnsq_x = (currentPositions[k][0]-oldPositions[k][0]);
					pnsq_y = (currentPositions[k][1]-oldPositions[k][1]);
					positionNorm += ((pnsq_x*pnsq_x) + (pnsq_y*pnsq_y));
				}
				//console.log("positionnorm:"+positionNorm);
				
				// if norm < limit, then break
				if (positionNorm < convergenceLimit) {
					break;
				}
			
			}
			
			if (params.constantVelocity) {
				// add current parameter to array of previous parameters
				previousParameters.push(currentParameters.slice());
				previousParameters.splice(0, previousParameters.length == 3 ? 1 : 0);
			}
			
			// store positions, for checking convergence
			previousPositions.splice(0, previousPositions.length == 10 ? 1 : 0);
			previousPositions.push(currentPositions.slice(0));
			
			// send an event on each iteration
			var evt = document.createEvent("Event");
			evt.initEvent("clmtrackrIteration", true, true);
			document.dispatchEvent(evt)
			
			if (this.getConvergence() < 0.5) {
				// we must get a score before we can say we've converged
				if (scoringHistory.length >= 5) {
					if (params.stopOnConvergence) {
						this.stop();
					}

					var evt = document.createEvent("Event");
					evt.initEvent("clmtrackrConverged", true, true);
					document.dispatchEvent(evt)
				}
			}
			
			// return new points
			return currentPositions;
		}

		/*
		 *	reset tracking, so that track() will start a new detection
		 */
		this.reset = function() {
			first = true;
			scoringHistory = [];
			for (var i = 0;i < currentParameters.length;i++) {
				currentParameters[i] = 0;
				previousParameters = [];
			}
			runnerElement = undefined;
			runnerBox = undefined;
		}

		/*
		 *	draw model on given canvas
		 */
		this.draw = function(canvas, pv, path) {
			// if no previous points, just draw in the middle of canvas
			
			var params;
			if (pv === undefined) {
				params = currentParameters.slice(0);
			} else {
				params = pv.slice(0);
			}
			
			var cc = canvas.getContext('2d');
			cc.fillStyle = "rgb(200,200,200)";
			cc.strokeStyle = "rgb(130,255,50)";
			//cc.lineWidth = 1;
			
			var paths;
			if (path === undefined) {
				paths = model.path.normal;
			} else {
				paths = model.path[path];
			}

			for (var i = 0;i < paths.length;i++) {
				if (typeof(paths[i]) == 'number') {
					drawPoint(cc, paths[i], params);
				} else {
					drawPath(cc, paths[i], params);
				}
			}
		}

		/*
		 * 	get the score of the current model fit
		 *	(based on svm of face according to current model)
		 */
		this.getScore = function() {
			return meanscore;
		}

		/*
		 *	calculate positions based on parameters
		 */
		this.calculatePositions = function(parameters) {
			return calculatePositions(parameters, true);
		}
		
		/*
		 *	get coordinates of current model fit
		 */
		this.getCurrentPosition = function() {
			if (first) {
				return false;
			} else {
				return currentPositions;
			}
		}
		
		/*
		 *	get parameters of current model fit
		 */
		this.getCurrentParameters = function() {
			return currentParameters;
		}

		/*
		 *	Get the average of recent model movements
		 *	Used for checking whether model fit has converged
		 */
		this.getConvergence = function() {
			if (previousPositions.length < 10) return 999999;
			
			var prevX = 0.0;
			var prevY = 0.0;
			var currX = 0.0;
			var currY = 0.0;
			
			// average 5 previous positions 
			for (var i = 0;i < 5;i++) {
				for (var j = 0;j < numPatches;j++) {
					prevX += previousPositions[i][j][0];
					prevY += previousPositions[i][j][1];
				}
			}
			prevX /= 5;
			prevY /= 5;
			
			// average 5 positions before that
			for (var i = 5;i < 10;i++) {
				for (var j = 0;j < numPatches;j++) {
					currX += previousPositions[i][j][0];
					currY += previousPositions[i][j][1];
				}
			}
			currX /= 5;
			currY /= 5;

			// calculate difference
			var diffX = currX-prevX;
			var diffY = currY-prevY;
			var msavg = ((diffX*diffX) + (diffY*diffY));
			msavg /= previousPositions.length
			return msavg;
		}
		
		/*
		 * Set response mode (only useful if webGL is available)
		 * mode : either "single", "blend" or "cycle"
		 * list : array of values "raw", "sobel", "lbp"
		 */
		this.setResponseMode = function(mode, list) {
			// clmtrackr must be initialized with model first
			if (typeof(model) === "undefined") {
				console.log("Clmtrackr has not been initialized with a model yet. No changes made.");
				return;
			}
			// must check whether webGL or not
			if (typeof(webglFi) === "undefined") {
				console.log("Responsemodes are only allowed when using webGL. In pure JS, only 'raw' mode is available.");
				return;
			}
			if (['single', 'blend', 'cycle'].indexOf(mode) < 0) {
				console.log("Tried to set an unknown responsemode : '"+mode+"'. No changes made.");
				return;
			}
			if (!(list instanceof Array)) {
				console.log("List in setResponseMode must be an array of strings! No changes made.");
				return;
			} else {
				for (var i = 0;i < list.length;i++) {
					if (['raw', 'sobel', 'lbp'].indexOf(list[i]) < 0) {
						console.log("Unknown element in responsemode list : '"+list[i]+"'. No changes made.");
					}
					// check whether filters are initialized 
					if (list[i] == 'sobel' && sobelInit == false) {
						console.log("The sobel filters have not been initialized! No changes made.");
					}
					if (list[i] == 'lbp' && lbpInit == false) {
						console.log("The LBP filters have not been initialized! No changes made.");
					}
				}
			}
			// reset index
			responseIndex = 0;
			responseMode = mode;
			responseList = list;
		}

		var runnerFunction = function() {
			runnerTimeout = requestAnimFrame(runnerFunction);
			// schedule as many iterations as we can during each request
			var startTime = (new Date()).getTime();
			while (((new Date()).getTime() - startTime) < 16) {
				var tracking = this.track(runnerElement, runnerBox);
				if (!tracking) continue;
			}
		}.bind(this);
		
		var getWebGLResponsesType = function(type, patches) {
			if (type == 'lbp') {
				return webglFi.getLBPResponses(patches);
			} else if (type == 'raw') {
				return webglFi.getRawResponses(patches);
			} else if (type == 'sobel') {
				return webglFi.getSobelResponses(patches);
			}
		}
		
		var getWebGLResponses = function(patches) {
			if (responseMode == 'single') {
				return getWebGLResponsesType(responseList[0], patches);
			} else if (responseMode == 'cycle') {
				var response = getWebGLResponsesType(responseList[responseIndex], patches);
				responseIndex++;
				if (responseIndex >= responseList.length) responseIndex = 0;
				return response;
			} else {
				// blend
				var responses = [];
				for (var i = 0;i < responseList.length;i++) {
					responses[i] = getWebGLResponsesType(responseList[i], patches);
				}
				var blendedResponses = [];
				for (var i = 0;i < numPatches;i++) {
					var response = Array(searchWindow*searchWindow);
					for (var k = 0;k < searchWindow*searchWindow;k++) response[k] = 0;
					for (var j = 0;j < responseList.length;j++) {
						for (var k = 0;k < searchWindow*searchWindow;k++) {
							response[k] += (responses[j][i][k]/responseList.length);
						}
					}
					blendedResponses[i] = response;
				}
				return blendedResponses;
			}
		}

		// generates the jacobian matrix used for optimization calculations
		var createJacobian = function(parameters, eigenVectors) {
			
			var jacobian = numeric.rep([2*numPatches, numParameters+4],0.0);
			var j0,j1;
			for (var i = 0;i < numPatches;i ++) {
				// 1
				j0 = meanShape[i][0];
				j1 = meanShape[i][1];
				for (var p = 0;p < numParameters;p++) {
					j0 += parameters[p+4]*eigenVectors[i*2][p];
					j1 += parameters[p+4]*eigenVectors[(i*2)+1][p];
				}
				jacobian[i*2][0] = j0;
				jacobian[(i*2)+1][0] = j1;
				// 2
				j0 = meanShape[i][1];
				j1 = meanShape[i][0];
				for (var p = 0;p < numParameters;p++) {
					j0 += parameters[p+4]*eigenVectors[(i*2)+1][p];
					j1 += parameters[p+4]*eigenVectors[i*2][p];
				}
				jacobian[i*2][1] = -j0;
				jacobian[(i*2)+1][1] = j1;
				// 3
				jacobian[i*2][2] = 1;
				jacobian[(i*2)+1][2] = 0;
				// 4
				jacobian[i*2][3] = 0;
				jacobian[(i*2)+1][3] = 1;
				// the rest
				for (var j = 0;j < numParameters;j++) {
					j0 = parameters[0]*eigenVectors[i*2][j] - parameters[1]*eigenVectors[(i*2)+1][j] + eigenVectors[i*2][j];
					j1 = parameters[0]*eigenVectors[(i*2)+1][j] + parameters[1]*eigenVectors[i*2][j] + eigenVectors[(i*2)+1][j];
					jacobian[i*2][j+4] = j0;
					jacobian[(i*2)+1][j+4] = j1;
				}
			}
			
			return jacobian;
		}
		
		// calculate positions from parameters
		var calculatePositions = function(parameters, useTransforms) {
			var x, y, a, b;
			var numParameters = parameters.length;
			var positions = [];
			for (var i = 0;i < numPatches;i++) {
				x = meanShape[i][0];
				y = meanShape[i][1];
				for (var j = 0;j < numParameters-4;j++) {
					x += model.shapeModel.eigenVectors[(i*2)][j]*parameters[j+4];
					y += model.shapeModel.eigenVectors[(i*2)+1][j]*parameters[j+4];
				}
				if (useTransforms) {
					a = parameters[0]*x - parameters[1]*y + parameters[2];
					b = parameters[0]*y + parameters[1]*x + parameters[3];
					x += a;
					y += b;
				}
				positions[i] = [x,y];
			}
			
			return positions;
		}
		
		// detect position of face on canvas/video element
		var detectPosition = function(el) {
			var comp = jf.findFace(params.faceDetection);
			
			if (comp) {
				candidate = comp;
			} else {
				return false;
			}
			
			return candidate;
		}
		
		// part one of meanshift calculation
		var gpopt = function(responseWidth, currentPositionsj, updatePosition, vecProbs, responses, opj0, opj1, j, variance, scaling) {
			var pos_idx = 0;
			var vpsum = 0;
			var dx, dy;
			for (var k = 0;k < responseWidth;k++) {
				updatePosition[1] = opj1+(k*scaling);
				for (var l = 0;l < responseWidth;l++) {
					updatePosition[0] = opj0+(l*scaling);

					dx = currentPositionsj[0] - updatePosition[0];
					dy = currentPositionsj[1] - updatePosition[1];
					vecProbs[pos_idx] = responses[j][pos_idx] * Math.exp(-0.5*((dx*dx)+(dy*dy))/(variance*scaling));
					
					vpsum += vecProbs[pos_idx];
					pos_idx++;
				}
			}
			
			return vpsum;
		}
		
		// part two of meanshift calculation
		var gpopt2 = function(responseWidth, vecpos, updatePosition, vecProbs, vpsum, opj0, opj1, scaling) {
			//for debugging
			//var vecmatrix = [];
			
			var pos_idx = 0;
			var vecsum = 0;
			vecpos[0] = 0;
			vecpos[1] = 0;
			for (var k = 0;k < responseWidth;k++) {
				updatePosition[1] = opj1+(k*scaling);
				for (var l = 0;l < responseWidth;l++) {
					updatePosition[0] = opj0+(l*scaling);
					vecsum = vecProbs[pos_idx]/vpsum;
					
					//for debugging
					//vecmatrix[k*responseWidth + l] = vecsum;
					
					vecpos[0] += vecsum*updatePosition[0];
					vecpos[1] += vecsum*updatePosition[1];
					pos_idx++;
				}
			}
			// for debugging
			//return vecmatrix;
		}
		
		// calculate score of current fit
		var checkTracking = function() {			
			scoringContext.drawImage(sketchCanvas, Math.round(msxmin+(msmodelwidth/4.5)), Math.round(msymin-(msmodelheight/12)), Math.round(msmodelwidth-(msmodelwidth*2/4.5)), Math.round(msmodelheight-(msmodelheight/12)), 0, 0, 20, 22);
			// getImageData of canvas
			var imgData = scoringContext.getImageData(0,0,20,22);
			// convert data to grayscale
			var scoringData = new Array(20*22);
			var scdata = imgData.data;
			var scmax = 0;
			for (var i = 0;i < 20*22;i++) {
				scoringData[i] = scdata[i*4]*0.3 + scdata[(i*4)+1]*0.59 + scdata[(i*4)+2]*0.11;
				scoringData[i] = Math.log(scoringData[i]+1);
				if (scoringData[i] > scmax) scmax = scoringData[i];
			}

			if (scmax > 0) {
				// normalize & multiply by svmFilter
				var mean = 0;
				for (var i = 0;i < 20*22;i++) {
					mean += scoringData[i];
				}
				mean /= (20*22);
				var sd = 0;
				for (var i = 0;i < 20*22;i++) {
					sd += (scoringData[i]-mean)*(scoringData[i]-mean);
				}
				sd /= (20*22 - 1)
				sd = Math.sqrt(sd);
				
				var score = 0;
				for (var i = 0;i < 20*22;i++) {
					scoringData[i] = (scoringData[i]-mean)/sd;
					score += (scoringData[i])*scoringWeights[i];
				}
				score += scoringBias;
				score = 1/(1+Math.exp(-score));

				scoringHistory.splice(0, scoringHistory.length == 5 ? 1 : 0);
				scoringHistory.push(score);

				if (scoringHistory.length > 4) {
					// get average
					meanscore = 0;
					for (var i = 0;i < 5;i++) {
						meanscore += scoringHistory[i];
					}
					meanscore /= 5;
					// if below threshold, then reset (return false)
					if (meanscore < params.scoreThreshold) return false;
				}
			}
			return true;
		}
		
		// get initial starting point for model
		var getInitialPosition = function(element, box) {
			var translateX, translateY, scaling, rotation;
			if (box) {
				candidate = {x : box[0], y : box[1], width : box[2], height : box[3]};
			} else {
				var det = detectPosition(element);
				if (!det) {
					// if no face found, stop.
					return false;
				}
			}
			
			if (model.hints && mosseFilter && left_eye_filter && right_eye_filter && nose_filter) {
				var noseFilterWidth = candidate.width * 4.5/10;
				var eyeFilterWidth = candidate.width * 6/10;
				
				// detect position of eyes and nose via mosse filter
				//
				/*element.pause();
				
				var canvasContext = document.getElementById('overlay2').getContext('2d')
				canvasContext.clearRect(0,0,500,375);
				canvasContext.strokeRect(candidate.x, candidate.y, candidate.width, candidate.height);*/
				//

				var nose_result = mossef_nose.track(element, Math.round(candidate.x+(candidate.width/2)-(noseFilterWidth/2)), Math.round(candidate.y+candidate.height*(5/8)-(noseFilterWidth/2)), noseFilterWidth, noseFilterWidth, false);
				var right_result = mossef_righteye.track(element, Math.round(candidate.x+(candidate.width*3/4)-(eyeFilterWidth/2)), Math.round(candidate.y+candidate.height*(2/5)-(eyeFilterWidth/2)), eyeFilterWidth, eyeFilterWidth, false);
				var left_result = mossef_lefteye.track(element, Math.round(candidate.x+(candidate.width/4)-(eyeFilterWidth/2)), Math.round(candidate.y+candidate.height*(2/5)-(eyeFilterWidth/2)), eyeFilterWidth, eyeFilterWidth, false);
				right_eye_position[0] = Math.round(candidate.x+(candidate.width*3/4)-(eyeFilterWidth/2))+right_result[0];
				right_eye_position[1] = Math.round(candidate.y+candidate.height*(2/5)-(eyeFilterWidth/2))+right_result[1];
				left_eye_position[0] = Math.round(candidate.x+(candidate.width/4)-(eyeFilterWidth/2))+left_result[0];
				left_eye_position[1] = Math.round(candidate.y+candidate.height*(2/5)-(eyeFilterWidth/2))+left_result[1];
				nose_position[0] = Math.round(candidate.x+(candidate.width/2)-(noseFilterWidth/2))+nose_result[0];
				nose_position[1] = Math.round(candidate.y+candidate.height*(5/8)-(noseFilterWidth/2))+nose_result[1];
				
				//
				/*canvasContext.strokeRect(Math.round(candidate.x+(candidate.width*3/4)-(eyeFilterWidth/2)), Math.round(candidate.y+candidate.height*(2/5)-(eyeFilterWidth/2)), eyeFilterWidth, eyeFilterWidth);
				canvasContext.strokeRect(Math.round(candidate.x+(candidate.width/4)-(eyeFilterWidth/2)), Math.round(candidate.y+candidate.height*(2/5)-(eyeFilterWidth/2)), eyeFilterWidth, eyeFilterWidth);
				//canvasContext.strokeRect(Math.round(candidate.x+(candidate.width/2)-(noseFilterWidth/2)), Math.round(candidate.y+candidate.height*(3/4)-(noseFilterWidth/2)), noseFilterWidth, noseFilterWidth);
				canvasContext.strokeRect(Math.round(candidate.x+(candidate.width/2)-(noseFilterWidth/2)), Math.round(candidate.y+candidate.height*(5/8)-(noseFilterWidth/2)), noseFilterWidth, noseFilterWidth);
				
				canvasContext.fillStyle = "rgb(0,0,250)";
				canvasContext.beginPath();
				canvasContext.arc(left_eye_position[0], left_eye_position[1], 3, 0, Math.PI*2, true);
				canvasContext.closePath();
				canvasContext.fill();
				
				canvasContext.beginPath();
				canvasContext.arc(right_eye_position[0], right_eye_position[1], 3, 0, Math.PI*2, true);
				canvasContext.closePath();
				canvasContext.fill();
				
				canvasContext.beginPath();
				canvasContext.arc(nose_position[0], nose_position[1], 3, 0, Math.PI*2, true);
				canvasContext.closePath();
				canvasContext.fill();
				
				debugger;
				element.play()
				canvasContext.clearRect(0,0,element.width,element.height);*/
				//
				
				// get eye and nose positions of model
				var lep = model.hints.leftEye;
				var rep = model.hints.rightEye;
				var mep = model.hints.nose;
				
				// get scaling, rotation, etc. via procrustes analysis
				var procrustes_params = procrustes([left_eye_position, right_eye_position, nose_position], [lep, rep, mep]);
				translateX = procrustes_params[0];
				translateY = procrustes_params[1];
				scaling = procrustes_params[2];
				rotation = procrustes_params[3];
				
				//element.play();
				
				//var maxscale = 1.10;
				//if ((scaling*modelHeight)/candidate.height < maxscale*0.7) scaling = (maxscale*0.7*candidate.height)/modelHeight;
				//if ((scaling*modelHeight)/candidate.height > maxscale*1.2) scaling = (maxscale*1.2*candidate.height)/modelHeight;
				
				/*var smean = [0,0];
				smean[0] += lep[0];
				smean[1] += lep[1];
				smean[0] += rep[0];
				smean[1] += rep[1];
				smean[0] += mep[0];
				smean[1] += mep[1];
				smean[0] /= 3;
				smean[1] /= 3;
				
				var nulep = [(lep[0]*scaling*Math.cos(-rotation)+lep[1]*scaling*Math.sin(-rotation))+translateX, (lep[0]*scaling*(-Math.sin(-rotation)) + lep[1]*scaling*Math.cos(-rotation))+translateY];
				var nurep = [(rep[0]*scaling*Math.cos(-rotation)+rep[1]*scaling*Math.sin(-rotation))+translateX, (rep[0]*scaling*(-Math.sin(-rotation)) + rep[1]*scaling*Math.cos(-rotation))+translateY];
				var numep = [(mep[0]*scaling*Math.cos(-rotation)+mep[1]*scaling*Math.sin(-rotation))+translateX, (mep[0]*scaling*(-Math.sin(-rotation)) + mep[1]*scaling*Math.cos(-rotation))+translateY];
				
				canvasContext.fillStyle = "rgb(200,10,100)";
				canvasContext.beginPath();
				canvasContext.arc(nulep[0], nulep[1], 3, 0, Math.PI*2, true);
				canvasContext.closePath();
				canvasContext.fill();
				
				canvasContext.beginPath();
				canvasContext.arc(nurep[0], nurep[1], 3, 0, Math.PI*2, true);
				canvasContext.closePath();
				canvasContext.fill();
				
				canvasContext.beginPath();
				canvasContext.arc(numep[0], numep[1], 3, 0, Math.PI*2, true);
				canvasContext.closePath();
				canvasContext.fill();*/
				
				currentParameters[0] = (scaling*Math.cos(rotation))-1;
				currentParameters[1] = (scaling*Math.sin(rotation));
				currentParameters[2] = translateX;
				currentParameters[3] = translateY;
				
				//this.draw(document.getElementById('overlay'), currentParameters);
				
			} else {
				scaling = candidate.width/modelheight;
				//var ccc = document.getElementById('overlay').getContext('2d');
				//ccc.strokeRect(candidate.x,candidate.y,candidate.width,candidate.height);
				translateX = candidate.x-(xmin*scaling)+0.1*candidate.width;
				translateY = candidate.y-(ymin*scaling)+0.25*candidate.height;
				currentParameters[0] = scaling-1;
				currentParameters[2] = translateX;
				currentParameters[3] = translateY;
			}
		
			currentPositions = calculatePositions(currentParameters, true);
			
			return [scaling, rotation, translateX, translateY];
		}
		
		// draw a parametrized line on a canvas
		var drawPath = function(canvasContext, path, dp) {
			canvasContext.beginPath();
			var i, x, y, a, b;
			for (var p = 0;p < path.length;p++) {
				i = path[p]*2;
				x = meanShape[i/2][0];
				y = meanShape[i/2][1];
				for (var j = 0;j < numParameters;j++) {
					x += model.shapeModel.eigenVectors[i][j]*dp[j+4];
					y += model.shapeModel.eigenVectors[i+1][j]*dp[j+4];
				}
				a = dp[0]*x - dp[1]*y + dp[2];
				b = dp[0]*y + dp[1]*x + dp[3];
				x += a;
				y += b;
				
				if (i == 0) {
					canvasContext.moveTo(x,y);
				} else {
					canvasContext.lineTo(x,y);
				}
			}
			canvasContext.moveTo(0,0);
			canvasContext.closePath();
			canvasContext.stroke();
		}
		
		// draw a point on a canvas
		function drawPoint(canvasContext, point, dp) {
			var i, x, y, a, b;
			i = point*2;
			x = meanShape[i/2][0];
			y = meanShape[i/2][1];
			for (var j = 0;j < numParameters;j++) {
				x += model.shapeModel.eigenVectors[i][j]*dp[j+4];
				y += model.shapeModel.eigenVectors[i+1][j]*dp[j+4];
			}
			a = dp[0]*x - dp[1]*y + dp[2];
			b = dp[0]*y + dp[1]*x + dp[3];
			x += a;
			y += b;
			canvasContext.beginPath();
			canvasContext.arc(x, y, 1, 0, Math.PI*2, true);
			canvasContext.closePath();
			canvasContext.fill();
		}
		
		// procrustes analysis
		function procrustes(template, shape) {
			// assume template and shape is a vector of x,y-coordinates
			//i.e. template = [[x1,y1], [x2,y2], [x3,y3]];
			var templateClone = [];
			var shapeClone = [];
			for (var i = 0;i < template.length;i++) {
				templateClone[i] = [template[i][0], template[i][1]];
			}
			for (var i = 0;i < shape.length;i++) {
				shapeClone[i] = [shape[i][0], shape[i][1]];
			}
			shape = shapeClone;
			template = templateClone;
			
			// calculate translation
			var templateMean = [0.0, 0.0];
			for (var i = 0;i < template.length;i++) {
				templateMean[0] += template[i][0];
				templateMean[1] += template[i][1];
			}
			templateMean[0] /= template.length;
			templateMean[1] /= template.length;
			
			var shapeMean = [0.0, 0.0];
			for (var i = 0;i < shape.length;i++) {
				shapeMean[0] += shape[i][0];
				shapeMean[1] += shape[i][1];
			}
			shapeMean[0] /= shape.length;
			shapeMean[1] /= shape.length;
			
			var translationX = templateMean[0] - shapeMean[0];
			var translationY = templateMean[1] - shapeMean[1];
			
			// centralize
			for (var i = 0;i < shape.length;i++) {
				shape[i][0] -= shapeMean[0];
				shape[i][1] -= shapeMean[1];
			}
			for (var i = 0;i < template.length;i++) {
				template[i][0] -= templateMean[0];
				template[i][1] -= templateMean[1];
			}
			
			// scaling
			
			var scaleS = 0.0;
			for (var i = 0;i < shape.length;i++) {
				scaleS += ((shape[i][0])*(shape[i][0]));
				scaleS += ((shape[i][1])*(shape[i][1]));
			}
			scaleS = Math.sqrt(scaleS/shape.length);
			
			var scaleT = 0.0;
			for (var i = 0;i < template.length;i++) {
				scaleT += ((template[i][0])*(template[i][0]));
				scaleT += ((template[i][1])*(template[i][1]));
			}
			scaleT = Math.sqrt(scaleT/template.length);
			
			var scaling = scaleT/scaleS;
			
			for (var i = 0;i < shape.length;i++) {
				shape[i][0] *= scaling;
				shape[i][1] *= scaling;
			}
				
			// rotation
			
			var top = 0.0;
			var bottom = 0.0;
			for (var i = 0;i < shape.length;i++) {
				top += (shape[i][0]*template[i][1] - shape[i][1]*template[i][0]);
				bottom += (shape[i][0]*template[i][0] + shape[i][1]*template[i][1]);
			}
			var rotation = Math.atan(top/bottom);
			
			translationX += (shapeMean[0]-(scaling*Math.cos(-rotation)*shapeMean[0])-(scaling*shapeMean[1]*Math.sin(-rotation)));
			translationY += (shapeMean[1]+(scaling*Math.sin(-rotation)*shapeMean[0])-(scaling*shapeMean[1]*Math.cos(-rotation)));
			
			//returns rotation, scaling, transformx and transformx
			return [translationX, translationY, scaling, rotation];
		}
		
		// function to draw pixeldata on some canvas, only used for debugging
		var drawData = function(canvasContext, data, width, height, transposed, drawX, drawY) {
			var psci = canvasContext.createImageData(width, height);
			var pscidata = psci.data;
			for (var j = 0;j < width*height;j++) {
				if (!transposed) {
					var val = data[(j%width)+((j/width) >> 0)*width];
				} else {
					var val = data[(j%height)*height+((j/height) >> 0)];
				}
				val = val > 255 ? 255 : val;
				val = val < 0 ? 0 : val;
				pscidata[j*4] = val;
				pscidata[(j*4)+1] = val;
				pscidata[(j*4)+2] = val;
				pscidata[(j*4)+3] = 255;
			}
			canvasContext.putImageData(psci, drawX, drawY);
		}
		
		var requestAnimFrame = (function() {
			return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
				return window.setTimeout(callback, 1000/60);
			};
		})();
		
		var cancelRequestAnimFrame = (function() {
			return window.cancelAnimationFrame ||
				window.webkitCancelRequestAnimationFrame ||
				window.mozCancelRequestAnimationFrame ||
				window.oCancelRequestAnimationFrame ||
				window.msCancelRequestAnimationFrame ||
				window.clearTimeout;
		})();
		
		return true;
	}
}
"use strict";

var webglFilter = function() {

  /*
   * Textures:
   * 0 : raw filter
   * 1 : patches
   * 2 : finished response
   * 3 : grad/lbp treated patches 
   * 4 : sobel filter
   * 5 : lbp filter
   * 
   * Routing:
   *         (              )  0/4/5 --\
   *         (              )          _\|
   * 1 ----> ( ---------->3 ) ----------> 2
   *         lbpResponse/      patchResponse
   *         gradientResponse  
   */

  var gl, canvas;
  var filterWidth, filterHeight, patchWidth, patchHeight, numPatches, canvasWidth, canvasHeight;
  var patchResponseProgram, patchDrawProgram;
  var fbo, numBlocks, patchTex;
  var drawRectBuffer, drawLayerBuffer, drawImageBuffer, rttTexture;
  var texCoordBuffer, texCoordLocation, apositionBuffer;
  var newCanvasWidth, newCanvasBlockHeight, newCanvasHeight;
  var drawOutRectangles, drawOutImages, drawOutLayer;
  var patchCells, textureWidth, textureHeight, patchSize, patchArray;
  var biases;
  
  var lbpResponseProgram;
  var lbo, lbpTexCoordLocation, lbpTexCoordBuffer, lbpPositionLocation, lbpAPositionBuffer;

  var gradientResponseProgram;
  var gbo, gradTexCoordLocation, gradTexCoordBuffer, gradPositionLocation, gradAPositionBuffer;

  var lbpInit = false;
  var sobelInit = false;
  var rawInit = false;

  var lbpResponseVS = [
    "attribute vec2 a_texCoord;",
    "attribute vec2 a_position;",
    "",
    "varying vec2 v_texCoord;",
    "",
    "void main() {",
    "   // transform coordinates to regular coordinates",
    "   gl_Position = vec4(a_position,0.0,1.0);",
    " ",
    "   // pass the texCoord to the fragment shader",
    "   v_texCoord = a_texCoord;",
    "}"
  ].join('\n');
  var lbpResponseFS;

  var gradientResponseVS = [
    "attribute vec2 a_texCoord;",
    "attribute vec2 a_position;",
    "",
    "varying vec2 v_texCoord;",
    "",
    "void main() {",
    "   // transform coordinates to regular coordinates",
    "   gl_Position = vec4(a_position,0.0,1.0);",
    " ",
    "   // pass the texCoord to the fragment shader",
    "   v_texCoord = a_texCoord;",
    "}"
  ].join('\n');
  var gradientResponseFS;
  
  var patchResponseVS;
  var patchResponseFS;
  
  var drawResponsesVS = [
    "attribute vec2 a_texCoord_draw;",
    "attribute vec2 a_position_draw;",
    "attribute float a_patchChoice_draw;",
    "",
    "uniform vec2 u_resolutiondraw;",
    "",
    "varying vec2 v_texCoord;",
    "varying float v_select;",
    "",
    "void main() {",
    "   // convert the rectangle from pixels to 0.0 to 1.0",
    "   vec2 zeroToOne = a_position_draw / u_resolutiondraw;",
    "",
    "   // convert from 0->1 to 0->2",
    "   vec2 zeroToTwo = zeroToOne * 2.0;",
    "",
    "   // convert from 0->2 to -1->+1 (clipspace)",
    "   vec2 clipSpace = zeroToTwo - 1.0;",
    "   ",
    "   // transform coordinates to regular coordinates",
    "   gl_Position = vec4(clipSpace * vec2(1.0, 1.0), 0, 1);",
    "",
    "   // pass the texCoord to the fragment shader",
    "   v_texCoord = a_texCoord_draw;",
    "   ",
    "   v_select = a_patchChoice_draw;",
    "}"
  ].join('\n');
  
  var drawResponsesFS = [
    "precision mediump float;",
    "",
    "// our responses",
    "uniform sampler2D u_responses;",
    "",
    "// the texCoords passed in from the vertex shader.",
    "varying vec2 v_texCoord;",
    "varying float v_select;",
    "",
    "const vec4 bit_shift = vec4(256.0*256.0*256.0, 256.0*256.0, 256.0, 1.0);",
    "const vec4 bit_mask  = vec4(0.0, 1.0/256.0, 1.0/256.0, 1.0/256.0);",
    "",
    "// packing code from here http://stackoverflow.com/questions/9882716/packing-float-into-vec4-how-does-this-code-work",
    "void main() {",
    "  vec4 colorSum = texture2D(u_responses, v_texCoord);",
    "  float value = 0.0;",
    "  if (v_select < 0.1) {",
    "    value = colorSum[0];",
    "  } else if (v_select > 0.9 && v_select < 1.1) {",
    "    value = colorSum[1];",
    "  } else if (v_select > 1.9 && v_select < 2.1) {",
    "    value = colorSum[2];",
    "  } else if (v_select > 2.9 && v_select < 3.1) {",
    "    value = colorSum[3];",
    "  } else {",
    "    value = 1.0;",
    "  }",
    "  ",
    "  vec4 res = fract(value * bit_shift);",
    "  res -= res.xxyz * bit_mask;",
    "  ",
    "  //gl_FragColor = vec4(value, value, value, value);",
    "  //gl_FragColor = vec4(1.0, value, 1.0, 1.0);",
    "  gl_FragColor = res;",
    "}"
  ].join('\n');
  
  this.init = function(filters, bias, nP, pW, pH, fW, fH) {
    // we assume filterVector goes from left to right, rowwise, i.e. row-major order

    if (fW != fH) {
      alert("filter width and height must be same size!");
      return;
    }
    
    // if filter width is not odd, alert
    if (fW % 2 == 0 || fH % 2 == 0) {
      alert("filters used in svm must be of odd dimensions!");
      return;
    }
    
    // setup variables
    biases = bias;
    filterWidth = fW;
    filterHeight = fH;
    patchWidth = pW;
    patchHeight = pH;
    numPatches = nP;
    numBlocks = Math.floor(numPatches / 4) + Math.ceil((numPatches % 4)/4);
    canvasWidth = patchWidth;
    canvasHeight = patchHeight*numBlocks;
    newCanvasWidth = patchWidth-filterWidth+1;
    newCanvasBlockHeight = patchHeight-filterWidth+1;
    newCanvasHeight = newCanvasBlockHeight*numPatches;
    patchCells = (Math.floor(numPatches / 4) + Math.ceil((numPatches % 4)/4));
    textureWidth = patchWidth;
    textureHeight = patchHeight*patchCells;
    patchSize = patchWidth*patchHeight;
    patchArray = new Float32Array(patchSize*patchCells*4);
    var opp = [1/patchWidth, 1/(patchHeight*numBlocks)];

    // write out shaders
    patchResponseFS = [
      "precision mediump float;",
      "",
      "const vec2 u_onePixelPatches = vec2("+(1/patchWidth).toFixed(10)+","+(1/(patchHeight*numBlocks)).toFixed(10)+");",
      "const vec2 u_onePixelFilters = vec2("+(1/filterWidth).toFixed(10)+","+(1/(filterHeight*numBlocks)).toFixed(10)+");",
      "const float u_halffilterwidth = "+((filterWidth-1.0)/2).toFixed(1)+";",
      "const float u_halffilterheight = "+((filterHeight-1.0)/2).toFixed(1)+";",
      "",
      "// our patches",
      "uniform sampler2D u_patches;",
      "// our filters",
      "uniform sampler2D u_filters;",
      "",
      "// the texCoords passed in from the vertex shader.",
      "varying vec2 v_texCoord;",
      "varying vec2 v_texCoordFilters; // this should give us correct filter",
      "",
      "void main() {",
      "  vec4 colorSum = vec4(0.0, 0.0, 0.0, 0.0);",
      "  vec4 maxn = vec4(0.0, 0.0, 0.0, 0.0);",
      "  vec4 minn = vec4(256.0, 256.0, 256.0, 256.0);",
      "  vec4 scale = vec4(0.0, 0.0, 0.0, 0.0);",
      "  vec4 patchValue = vec4(0.0, 0.0, 0.0, 0.0);",
      "  vec4 filterValue = vec4(0.0, 0.0, 0.0, 0.0);",
      "  vec4 filterTemp = vec4(0.0, 0.0, 0.0, 0.0);",
      "  for (int w = 0;w < "+filterWidth+";w++) {",
      "    for (int h = 0;h < "+filterHeight+";h++) {",
      "      patchValue = texture2D(u_patches, v_texCoord + u_onePixelPatches * vec2(float(w)-u_halffilterwidth, float(h)-u_halffilterheight));",
      "      filterValue = texture2D(u_filters, v_texCoordFilters + u_onePixelFilters * vec2(float(w)-u_halffilterwidth, float(h)-u_halffilterheight));",
      "      maxn = max(patchValue, maxn);",
      "      minn = min(patchValue, minn);",
      "      colorSum += patchValue*filterValue;",
      "      filterTemp += filterValue;",
      "    } ",
      "  }",
      "  scale = maxn-minn;",
      "  colorSum = (colorSum-(minn*filterTemp))/scale;",
      "  // logistic transformation",
      "  colorSum = 1.0/(1.0 + exp(- (colorSum) ));",
      "  gl_FragColor = colorSum;",
      "}"
    ].join('\n');
    
    patchResponseVS = [
      "attribute vec2 a_texCoord;",
      "attribute vec2 a_position;",
      "",
      "const vec2 u_resolution = vec2("+canvasWidth.toFixed(1)+","+canvasHeight.toFixed(1)+");",
      "const float u_patchHeight = "+(1/numBlocks).toFixed(10)+";",
      "const float u_filterHeight = "+(1/numBlocks).toFixed(10)+";",
      "const vec2 u_midpoint = vec2(0.5 ,"+(1/(numBlocks*2)).toFixed(10)+");",
      "",
      "varying vec2 v_texCoord;",
      "varying vec2 v_texCoordFilters;",
      "",
      "void main() {",
      "   // convert the rectangle from pixels to 0.0 to 1.0",
      "   vec2 zeroToOne = a_position / u_resolution;",
      "",
      "   // convert from 0->1 to 0->2",
      "   vec2 zeroToTwo = zeroToOne * 2.0;",
      "",
      "   // convert from 0->2 to -1->+1 (clipspace)",
      "   vec2 clipSpace = zeroToTwo - 1.0;",
      "   ",
      "   // transform coordinates to regular coordinates",
      "   gl_Position = vec4(clipSpace * vec2(1.0, 1.0), 0, 1);",
      " ",
      "   // pass the texCoord to the fragment shader",
      "   v_texCoord = a_texCoord;",
      "   ",
      "   // set the filtertexture coordinate based on number filter to use",
      "   v_texCoordFilters = u_midpoint + vec2(0.0, u_filterHeight * floor(a_texCoord[1]/u_patchHeight));",
      "}"
    ].join('\n');

    if ('lbp' in filters) {
      // lbpResponseFragment
      lbpResponseFS = [
        "precision mediump float;",
        "",
        "uniform vec2 u_onePixelPatches;",
        "",
        "// our patches",
        "uniform sampler2D u_patches;",
        "",
        "// the texCoords passed in from the vertex shader.",
        "varying vec2 v_texCoord;",
        "",
        "void main() {",
        "  vec4 topLeft = texture2D(u_patches, v_texCoord + vec2(-"+opp[0].toFixed(5)+", -"+opp[1].toFixed(5)+"));",
        "  vec4 topMid = texture2D(u_patches, v_texCoord + vec2(0.0, -"+opp[1].toFixed(5)+"));",
        "  vec4 topRight = texture2D(u_patches, v_texCoord + vec2("+opp[0].toFixed(5)+", -"+opp[1].toFixed(5)+"));",
        "  vec4 midLeft = texture2D(u_patches, v_texCoord + vec2(-"+opp[0].toFixed(5)+", 0.0));",
        "  vec4 midMid = texture2D(u_patches, v_texCoord);",
        "  vec4 midRight = texture2D(u_patches, v_texCoord + vec2("+opp[0].toFixed(5)+", 0.0));",
        "  vec4 bottomLeft = texture2D(u_patches, v_texCoord + vec2(-"+opp[0].toFixed(5)+", "+opp[1].toFixed(5)+"));",
        "  vec4 bottomMid = texture2D(u_patches, v_texCoord + vec2(0.0, "+opp[1].toFixed(5)+"));",
        "  vec4 bottomRight = texture2D(u_patches, v_texCoord + vec2("+opp[0].toFixed(5)+", "+opp[1].toFixed(5)+"));",
        "  vec4 lbp = step(midMid, midRight)*1.0 + step(midMid, topRight)*2.0 + step(midMid, topMid)*4.0;",
        "  lbp = lbp + step(midMid, topLeft)*8.0 + step(midMid, midLeft)*16.0 + step(midMid, bottomLeft)*32.0;",
        "  lbp = lbp + step(midMid, bottomMid)*64.0 + step(midMid, bottomRight)*128.0;",
        "  gl_FragColor = lbp;",
        "}"
      ].join('\n');
    }

    if ('sobel' in filters) {
      // gradResponseFragment
      gradientResponseFS = [
        "precision mediump float;",
        "",
        "uniform vec2 u_onePixelPatches;",
        "",
        "// our patches",
        "uniform sampler2D u_patches;",
        "",
        "// the texCoords passed in from the vertex shader.",
        "varying vec2 v_texCoord;",
        "",
        "void main() {",
        "  vec4 bottomLeft = texture2D(u_patches, v_texCoord + vec2(-"+opp[0].toFixed(5)+", "+opp[1].toFixed(5)+"));",
        "  vec4 bottomRight = texture2D(u_patches, v_texCoord + vec2("+opp[0].toFixed(5)+", "+opp[1].toFixed(5)+"));",
        "  vec4 topLeft = texture2D(u_patches, v_texCoord + vec2(-"+opp[0].toFixed(5)+", -"+opp[1].toFixed(5)+"));",
        "  vec4 topRight = texture2D(u_patches, v_texCoord + vec2("+opp[0].toFixed(5)+", -"+opp[1].toFixed(5)+"));",
        "  vec4 dx = (",
        "    bottomLeft +",
        "    (texture2D(u_patches, v_texCoord + vec2(-"+opp[0].toFixed(5)+", 0.0))*vec4(2.0,2.0,2.0,2.0)) +",
        "    topLeft -",
        "    bottomRight -",
        "    (texture2D(u_patches, v_texCoord + vec2("+opp[0].toFixed(5)+", 0.0))*vec4(2.0,2.0,2.0,2.0)) -",
        "    topRight)/4.0;",
        "  vec4 dy = (",
        "    bottomLeft +",
        "    (texture2D(u_patches, v_texCoord + vec2(0.0, "+opp[1].toFixed(5)+"))*vec4(2.0,2.0,2.0,2.0)) +",
        "    bottomRight -",
        "    topLeft -",
        "    (texture2D(u_patches, v_texCoord + vec2(0.0, -"+opp[1].toFixed(5)+"))*vec4(2.0,2.0,2.0,2.0)) -",
        "    topRight)/4.0;",
        "  vec4 gradient = sqrt((dx*dx) + (dy*dy));",
        "  gl_FragColor = gradient;",
        "}"
      ].join('\n');
    }

    //create webglcanvas
    canvas = document.createElement('canvas')
    canvas.setAttribute('width', (patchWidth-filterWidth+1)+"px");
    canvas.setAttribute('height', ((patchHeight-filterHeight+1)*numPatches)+"px");
    canvas.setAttribute('id', 'renderCanvas');
    canvas.setAttribute('style', 'display:none;');
    document.body.appendChild(canvas);
    // TODO : isolate this library from webgl-util.js
    gl = setupWebGL(canvas, {premultipliedAlpha: false, preserveDrawingBuffer : true, antialias : false});
    

    // check for float textures support and fail if not
    if (!gl.getExtension("OES_texture_float")) {
      alert("Your graphics card does not support floating point textures! :(");
      return;
    }
    
    /** insert filters into textures **/
    if ('raw' in filters) {
      insertFilter(filters['raw'], gl.TEXTURE0)
      rawInit = true;
    }
    if ('sobel' in filters) {
      insertFilter(filters['sobel'], gl.TEXTURE4)
      sobelInit = true;
    }
    if ('lbp' in filters) {
      insertFilter(filters['lbp'], gl.TEXTURE5)
      lbpInit = true;
    }

    /** calculate vertices for calculating responses **/
    
    // vertex rectangles to draw out
    var rectangles = [];
    var halfFilter = (filterWidth-1)/2;
    var yOffset;
    for (var i = 0;i < numBlocks;i++) {
      yOffset = i*patchHeight;
      //first triangle
      rectangles = rectangles.concat(
        [halfFilter, yOffset+halfFilter, 
        patchWidth-halfFilter, yOffset+halfFilter,
        halfFilter, yOffset+patchHeight-halfFilter]
      );
      //second triangle
      rectangles = rectangles.concat(
        [halfFilter, yOffset+patchHeight-halfFilter, 
        patchWidth-halfFilter, yOffset+halfFilter,
        patchWidth-halfFilter, yOffset+patchHeight-halfFilter]
      );
    }
    rectangles = new Float32Array(rectangles);
    
    // image rectangles to draw out
    var irectangles = [];
    for (var i = 0;i < rectangles.length;i++) {
      if (i % 2 == 0) {
        irectangles[i] = rectangles[i]/canvasWidth;
      } else {
        irectangles[i] = rectangles[i]/canvasHeight;
      }
    }
    irectangles = new Float32Array(irectangles);

    if ('lbp' in filters || 'sobel' in filters) {
      var topCoord = 1.0 - 2/(patchHeight*numBlocks);
      var bottomCoord = 1.0 - 2/numBlocks + 2/(patchHeight*numBlocks);
      var yOffset;
      // calculate position of vertex rectangles for gradient/lbp program
      var gradRectangles = [];
      for (var i = 0;i < numBlocks;i++) {
        yOffset = i * (2/numBlocks);
        //first triangle
        gradRectangles = gradRectangles.concat(
          [-1.0, topCoord - yOffset, 
          1.0, topCoord - yOffset,
          -1.0, bottomCoord - yOffset]
        );
        //second triangle
        gradRectangles = gradRectangles.concat(
          [-1.0, bottomCoord - yOffset, 
          1.0, topCoord - yOffset,
          1.0, bottomCoord - yOffset]
        );
      }
      gradRectangles = new Float32Array(gradRectangles);
      
      topCoord = 1.0 - 1/(patchHeight*numBlocks);
      bottomCoord = 1.0 - 1/numBlocks + 1/(patchHeight*numBlocks);
      // calculate position of image rectangles to draw out
      var gradIRectangles = [];
      for (var i = 0;i < numBlocks;i++) {
        yOffset = i * (1/numBlocks);
        //first triangle
        gradIRectangles = gradIRectangles.concat(
          [0.0, topCoord - yOffset, 
          1.0, topCoord - yOffset,
          0.0, bottomCoord - yOffset]
        );
        //second triangle
        gradIRectangles = gradIRectangles.concat(
          [0.0, bottomCoord - yOffset, 
          1.0, topCoord - yOffset,
          1.0, bottomCoord - yOffset]
        );
      }
      gradIRectangles = new Float32Array(gradIRectangles);
    }

    // vertices for drawing out responses

    // drawOutRectangles
    drawOutRectangles = new Float32Array(12*numPatches);
    var yOffset, indexOffset;
    for (var i = 0;i < numPatches;i++) {
      yOffset = i*newCanvasBlockHeight;
      indexOffset = i*12;
      
      //first triangle
      drawOutRectangles[indexOffset] = 0.0;
      drawOutRectangles[indexOffset+1] = yOffset;
      drawOutRectangles[indexOffset+2] = newCanvasWidth;
      drawOutRectangles[indexOffset+3] = yOffset;
      drawOutRectangles[indexOffset+4] = 0.0;
      drawOutRectangles[indexOffset+5] = yOffset+newCanvasBlockHeight;
      
      //second triangle
      drawOutRectangles[indexOffset+6] = 0.0;
      drawOutRectangles[indexOffset+7] = yOffset+newCanvasBlockHeight;
      drawOutRectangles[indexOffset+8] = newCanvasWidth;
      drawOutRectangles[indexOffset+9] = yOffset;
      drawOutRectangles[indexOffset+10] = newCanvasWidth;
      drawOutRectangles[indexOffset+11] = yOffset+newCanvasBlockHeight;
    }
    
    // images
    drawOutImages = new Float32Array(numPatches*12);
    var halfFilterWidth = ((filterWidth-1)/2)/patchWidth;
    var halfFilterHeight = ((filterWidth-1)/2)/(patchHeight*patchCells);
    var patchHeightT = patchHeight / (patchHeight*patchCells);
    for (var i = 0;i < numPatches;i++) {
      yOffset = Math.floor(i / 4)*patchHeightT;
      indexOffset = i*12;
      
      //first triangle
      drawOutImages[indexOffset] = halfFilterWidth;
      drawOutImages[indexOffset+1] = yOffset+halfFilterHeight;
      drawOutImages[indexOffset+2] = 1.0-halfFilterWidth;
      drawOutImages[indexOffset+3] = yOffset+halfFilterHeight;
      drawOutImages[indexOffset+4] = halfFilterWidth;
      drawOutImages[indexOffset+5] = yOffset+patchHeightT-halfFilterHeight;
      
      //second triangle
      drawOutImages[indexOffset+6] = halfFilterWidth;
      drawOutImages[indexOffset+7] = yOffset+patchHeightT-halfFilterHeight;
      drawOutImages[indexOffset+8] = 1.0-halfFilterWidth;
      drawOutImages[indexOffset+9] = yOffset+halfFilterHeight;
      drawOutImages[indexOffset+10] = 1.0-halfFilterWidth;
      drawOutImages[indexOffset+11] = yOffset+patchHeightT-halfFilterHeight;
    }
    
    // layer
    drawOutLayer = new Float32Array(numPatches*6);
    var layernum;
    for (var i = 0;i < numPatches;i++) {
      layernum = i % 4;
      indexOffset = i*6;
      drawOutLayer[indexOffset] = layernum;
      drawOutLayer[indexOffset+1] = layernum;
      drawOutLayer[indexOffset+2] = layernum;
      drawOutLayer[indexOffset+3] = layernum;
      drawOutLayer[indexOffset+4] = layernum;
      drawOutLayer[indexOffset+5] = layernum;
    }
    
    /** set up programs and load attributes etc **/

    if ('sobel' in filters) {
      var grVertexShader = loadShader(gl, gradientResponseVS, gl.VERTEX_SHADER);
      var grFragmentShader = loadShader(gl, gradientResponseFS, gl.FRAGMENT_SHADER);
      gradientResponseProgram = createProgram(gl, [grVertexShader, grFragmentShader]);
      gl.useProgram(gradientResponseProgram);

      // set up vertices with rectangles
      gradPositionLocation = gl.getAttribLocation(gradientResponseProgram, "a_position");
      gradAPositionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, gradAPositionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, gradRectangles, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(gradPositionLocation);
      gl.vertexAttribPointer(gradPositionLocation, 2, gl.FLOAT, false, 0, 0);
      
      // set up texture positions
      gradTexCoordLocation = gl.getAttribLocation(gradientResponseProgram, "a_texCoord");
      gradTexCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, gradTexCoordBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, gradIRectangles, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(gradTexCoordLocation);
      gl.vertexAttribPointer(gradTexCoordLocation, 2, gl.FLOAT, false, 0, 0);
      
      // set up patches texture in gradientResponseProgram
      gl.uniform1i(gl.getUniformLocation(gradientResponseProgram, "u_patches"), 1);
    }
    if ('lbp' in filters) {
      var lbpVertexShader = loadShader(gl, lbpResponseVS, gl.VERTEX_SHADER);
      var lbpFragmentShader = loadShader(gl, lbpResponseFS, gl.FRAGMENT_SHADER);
      lbpResponseProgram = createProgram(gl, [lbpVertexShader, lbpFragmentShader]);
      gl.useProgram(lbpResponseProgram);

      // set up vertices with rectangles
      lbpPositionLocation = gl.getAttribLocation(lbpResponseProgram, "a_position");
      lbpAPositionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, lbpAPositionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, gradRectangles, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(lbpPositionLocation);
      gl.vertexAttribPointer(lbpPositionLocation, 2, gl.FLOAT, false, 0, 0);
      
      // set up texture positions
      gradTexCoordLocation = gl.getAttribLocation(lbpResponseProgram, "a_texCoord");
      lbpTexCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, lbpTexCoordBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, gradIRectangles, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(lbpTexCoordLocation);
      gl.vertexAttribPointer(lbpTexCoordLocation, 2, gl.FLOAT, false, 0, 0);

      // set up patches texture in lbpResponseProgram
      gl.uniform1i(gl.getUniformLocation(lbpResponseProgram, "u_patches"), 1);
    }

    // setup patchdraw program
    var drVertexShader = loadShader(gl, drawResponsesVS, gl.VERTEX_SHADER);
    var drFragmentShader = loadShader(gl, drawResponsesFS, gl.FRAGMENT_SHADER);
    patchDrawProgram = createProgram(gl, [drVertexShader, drFragmentShader]);
    gl.useProgram(patchDrawProgram);
    
    // set the resolution/dimension of the canvas
    var resolutionLocation = gl.getUniformLocation(patchDrawProgram, "u_resolutiondraw");
    gl.uniform2f(resolutionLocation, newCanvasWidth, newCanvasHeight);
    
    // set u_responses
    var responsesLocation = gl.getUniformLocation(patchDrawProgram, "u_responses");
    gl.uniform1i(responsesLocation, 2);
    
    // setup patchresponse program
    var prVertexShader = loadShader(gl, patchResponseVS, gl.VERTEX_SHADER);
    var prFragmentShader = loadShader(gl, patchResponseFS, gl.FRAGMENT_SHADER);
    patchResponseProgram = createProgram(gl, [prVertexShader, prFragmentShader]);
    gl.useProgram(patchResponseProgram);
    
    // set up vertices with rectangles
    var positionLocation = gl.getAttribLocation(patchResponseProgram, "a_position");
    apositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, apositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, rectangles, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    // set up texture positions
    texCoordLocation = gl.getAttribLocation(patchResponseProgram, "a_texCoord");
    texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, irectangles, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

    if ('lbp' in filters || 'sobel' in filters) {
      // set up gradient/lbp buffer (also used for lbp)
      gl.activeTexture(gl.TEXTURE3);
      var gradients = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, gradients);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, patchWidth, patchHeight*numBlocks, 0, gl.RGBA, gl.FLOAT, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

      // set up gradient/lbp framebuffer
      gbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, gbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, gradients, 0);
    }

    // set up buffer to draw to
    gl.activeTexture(gl.TEXTURE2);
    rttTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, rttTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, patchWidth, patchHeight*numBlocks, 0, gl.RGBA, gl.FLOAT, null);
    
    // set up response framebuffer
    fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, rttTexture, 0);

    gl.viewport(0, 0, patchWidth, patchHeight*numBlocks);

    /* initialize some textures and buffers used later on */

    patchTex = gl.createTexture();
    drawRectBuffer = gl.createBuffer();
    drawImageBuffer = gl.createBuffer();
    drawLayerBuffer = gl.createBuffer();
  }

  this.getRawResponses = function(patches) {
    // TODO: check patches correct length/dimension
    
    insertPatches(patches);
    
    // switch to correct program
    gl.useProgram(patchResponseProgram);

    // set u_patches to point to texture 1
    gl.uniform1i(gl.getUniformLocation(patchResponseProgram, "u_patches"), 1);

    // set u_filters to point to correct filter
    gl.uniform1i(gl.getUniformLocation(patchResponseProgram, "u_filters"), 0);
      
    // set up vertices with rectangles
    var positionLocation = gl.getAttribLocation(patchResponseProgram, "a_position");
    gl.bindBuffer(gl.ARRAY_BUFFER, apositionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    // set up texture positions
    var texCoordLocation = gl.getAttribLocation(patchResponseProgram, "a_texCoord");
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
    
    // set framebuffer to the original one if not already using it
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    
    gl.viewport(0, 0, patchWidth, patchHeight*numBlocks);
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER)
    
    // draw to framebuffer
    gl.drawArrays(gl.TRIANGLES, 0, patchCells*6);
    
    //gl.finish();
    
    var responses = drawOut('raw');

    return responses;
  }

  this.getSobelResponses = function(patches) {
    // check that it is initialized
    if (!sobelInit) return;

    insertPatches(patches);

    /* do sobel filter on patches */

    // switch to correct program
    gl.useProgram(gradientResponseProgram);

    // set up vertices with rectangles
    var gradPositionLocation = gl.getAttribLocation(gradientResponseProgram, "a_position");
    gl.bindBuffer(gl.ARRAY_BUFFER, gradAPositionBuffer);
    gl.enableVertexAttribArray(gradPositionLocation);
    gl.vertexAttribPointer(gradPositionLocation, 2, gl.FLOAT, false, 0, 0);
    
    // set up texture positions
    var gradTexCoordLocation = gl.getAttribLocation(gradientResponseProgram, "a_texCoord");
    gl.bindBuffer(gl.ARRAY_BUFFER, gradTexCoordBuffer);
    gl.enableVertexAttribArray(gradTexCoordLocation);
    gl.vertexAttribPointer(gradTexCoordLocation, 2, gl.FLOAT, false, 0, 0);

    // set framebuffer to the original one if not already using it
    gl.bindFramebuffer(gl.FRAMEBUFFER, gbo);

    gl.viewport(0, 0, patchWidth, patchHeight*numBlocks);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER)

    // draw to framebuffer
    gl.drawArrays(gl.TRIANGLES, 0, patchCells*6);

    /* calculate responses */

    gl.useProgram(patchResponseProgram);
    
    // set patches and filters to point to correct textures
    gl.uniform1i(gl.getUniformLocation(patchResponseProgram, "u_filters"), 4);
    gl.uniform1i(gl.getUniformLocation(patchResponseProgram, "u_patches"), 3);

    var positionLocation = gl.getAttribLocation(patchResponseProgram, "a_position");
    gl.bindBuffer(gl.ARRAY_BUFFER, apositionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // set up texture positions
    var texCoordLocation = gl.getAttribLocation(patchResponseProgram, "a_texCoord");
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
    
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.viewport(0, 0, patchWidth, patchHeight*numBlocks);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER)
    
    // draw to framebuffer
    gl.drawArrays(gl.TRIANGLES, 0, patchCells*6);

    /* get the responses */

    var responses = drawOut('sobel');

    return responses;
  }

  this.getLBPResponses = function(patches) {
    // check that it is initialized
    if (!lbpInit) return;

    insertPatches(patches);

     /* do sobel filter on patches */

    // switch to correct program
    gl.useProgram(lbpResponseProgram);

    // set up vertices with rectangles
    var lbpPositionLocation = gl.getAttribLocation(lbpResponseProgram, "a_position");
    gl.bindBuffer(gl.ARRAY_BUFFER, lbpAPositionBuffer);
    gl.enableVertexAttribArray(lbpPositionLocation);
    gl.vertexAttribPointer(lbpPositionLocation, 2, gl.FLOAT, false, 0, 0);
    
    // set up texture positions
    var lbpTexCoordLocation = gl.getAttribLocation(lbpResponseProgram, "a_texCoord");
    gl.bindBuffer(gl.ARRAY_BUFFER, lbpTexCoordBuffer);
    gl.enableVertexAttribArray(lbpTexCoordLocation);
    gl.vertexAttribPointer(lbpTexCoordLocation, 2, gl.FLOAT, false, 0, 0);

    // set framebuffer to the original one if not already using it
    gl.bindFramebuffer(gl.FRAMEBUFFER, gbo);

    gl.viewport(0, 0, patchWidth, patchHeight*numBlocks);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER)

    // draw to framebuffer
    gl.drawArrays(gl.TRIANGLES, 0, patchCells*6);

    /* calculate responses */

    gl.useProgram(patchResponseProgram);

    gl.uniform1i(gl.getUniformLocation(patchResponseProgram, "u_filters"), 5);
    gl.uniform1i(gl.getUniformLocation(patchResponseProgram, "u_patches"), 3);

    var positionLocation = gl.getAttribLocation(patchResponseProgram, "a_position");
    gl.bindBuffer(gl.ARRAY_BUFFER, apositionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // set up texture positions
    var texCoordLocation = gl.getAttribLocation(patchResponseProgram, "a_texCoord");
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
    
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.viewport(0, 0, patchWidth, patchHeight*numBlocks);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER)
    
    // draw to framebuffer
    gl.drawArrays(gl.TRIANGLES, 0, patchCells*6);

    /* get the responses */

    var responses = drawOut('lbp');

    return responses;
  }

  var insertPatches = function(patches) {
    // pass patches into texture, each patch in either r, g, b or a
    var patchArrayIndex = 0;
    var patchesIndex1 = 0;
    var patchesIndex2 = 0;
    for (var i = 0;i < patchCells;i++) {
      for (var j = 0;j < patchHeight;j++) {
        for (var k = 0;k < patchWidth;k++) {
          patchesIndex1 = i*4;
          patchesIndex2 = (j*patchWidth) + k;
          patchArrayIndex = ((patchSize*i) + patchesIndex2)*4;
          
          //set r with first patch
          if (patchesIndex1 < numPatches) {
            patchArray[patchArrayIndex] = patches[patchesIndex1][patchesIndex2];
          } else {
            patchArray[patchArrayIndex] = 0;
          }
          //set g with 2nd patch
          if (patchesIndex1+1 < numPatches) {
            patchArray[patchArrayIndex + 1] = patches[patchesIndex1+1][patchesIndex2];
          } else {
            patchArray[patchArrayIndex + 1] = 0;
          }
          //set b with 3rd patch
          if (patchesIndex1+2 < numPatches) {
            patchArray[patchArrayIndex + 2] = patches[patchesIndex1+2][patchesIndex2];
          } else {
            patchArray[patchArrayIndex + 2] = 0;
          }
          //set a with 4th patch
          if (patchesIndex1+3 < numPatches) {
            patchArray[patchArrayIndex + 3] = patches[patchesIndex1+3][patchesIndex2];
          } else {
            patchArray[patchArrayIndex + 3] = 0;
          }
        }
      }
    }
    
    // pass texture into an uniform
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, patchTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, textureWidth, textureHeight, 0, gl.RGBA, gl.FLOAT, patchArray);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  }

  var insertFilter = function(filter, textureNum) {
    var filterSize = filterWidth*filterHeight;
    var filterArray = new Float32Array(filterSize*(numBlocks)*4);
    for (var i = 0;i < numBlocks;i++) {
      for (var j = 0;j < filterHeight;j++) {
        for (var k = 0;k < filterWidth;k++) {
          //set r with first filter
          if (i*4 < filter.length) {
            filterArray[((filterSize*i) + (j*filterWidth) + k)*4] = filter[i*4][(j*filterWidth) + k];
          } else {
            filterArray[((filterSize*i) + (j*filterWidth) + k)*4] = 0;
          }
          //set g with 2nd filter
          if ((i*4 + 1) < filter.length) {
            filterArray[((filterSize*i) + (j*filterWidth) + k)*4 + 1] = filter[(i*4)+1][(j*filterWidth) + k];
          } else {
            filterArray[((filterSize*i) + (j*filterWidth) + k)*4 + 1] = 0;
          }
          //set b with 3rd filter
          if ((i*4 + 2) < filter.length) {
            filterArray[((filterSize*i) + (j*filterWidth) + k)*4 + 2] = filter[(i*4)+2][(j*filterWidth) + k];
          } else {
            filterArray[((filterSize*i) + (j*filterWidth) + k)*4 + 2] = 0;
          }
          //set a with 4th filter
          if ((i*4 + 3) < filter.length) {
            filterArray[((filterSize*i) + (j*filterWidth) + k)*4 + 3] = filter[(i*4)+3][(j*filterWidth) + k];
          } else {
            filterArray[((filterSize*i) + (j*filterWidth) + k)*4 + 3] = 0;
          }
        }
      }
    }

    gl.activeTexture(textureNum);
    var filterTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, filterTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, filterWidth, filterHeight*numBlocks, 0, gl.RGBA, gl.FLOAT, filterArray);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  }

  var drawOut = function(type) {
    // switch programs
    gl.useProgram(patchDrawProgram);
    
    // bind canvas buffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, newCanvasWidth, newCanvasHeight);
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER)

    gl.bindBuffer(gl.ARRAY_BUFFER, drawRectBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER, 
      drawOutRectangles, 
      gl.STATIC_DRAW);
    var positionLocation = gl.getAttribLocation(patchDrawProgram, "a_position_draw");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, drawImageBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER, 
      drawOutImages, 
      gl.STATIC_DRAW);
    var textureLocation = gl.getAttribLocation(patchDrawProgram, "a_texCoord_draw");
    gl.enableVertexAttribArray(textureLocation);
    gl.vertexAttribPointer(textureLocation, 2, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, drawLayerBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER, 
      drawOutLayer, 
      gl.STATIC_DRAW);
    var layerLocation = gl.getAttribLocation(patchDrawProgram, "a_patchChoice_draw");
    gl.enableVertexAttribArray(layerLocation);
    gl.vertexAttribPointer(layerLocation, 1, gl.FLOAT, false, 0, 0);
    
    // draw out
    gl.drawArrays(gl.TRIANGLES, 0, numPatches*6);

    var responses = getOutput();
    
    responses = unpackToFloat(responses);
    
    // split
    responses = splitArray(responses, numPatches);
    
    // add bias
    responses = addBias(responses, biases[type]);
    
    // normalize responses to lie within [0,1]
    var rl = responses.length;
    
    for (var i = 0;i < rl;i++) {
      responses[i] = normalizeFilterMatrix(responses[i]);
    }

    return responses;
  }
  
  var addBias = function(responses, bias) {
    // do a little trick to add bias in the logit function
    var biasMult;
    for (var i = 0;i < responses.length;i++) {
      biasMult = Math.exp(bias[i]);
      for (var j = 0;j < responses[i].length;j++) {
        responses[i][j] = 1/(1+((1-responses[i][j])/(responses[i][j]*biasMult)));
      }
    }
    return responses;
  }
  
  var splitArray = function(array, parts) {
    var sp = [];
    var al = array.length;
    var splitlength = al/parts;
    var ta = [];
    for (var i = 0;i < al;i++) {
      if (i % splitlength == 0) {
        if (i != 0) {
          sp.push(ta);
        }
        ta = [];
      }
      ta.push(array[i]); 
    }
    sp.push(ta);
    return sp;
  }
  
  var getOutput = function() {
    // get data
    var pixelValues = new Uint8Array(4*canvas.width*canvas.height);
    var data = gl.readPixels(0, 0, canvas.width, canvas.height, gl.RGBA, gl.UNSIGNED_BYTE, pixelValues);
    // return
    return pixelValues;
  }
  
  var unpackToFloat = function(array) {
    // convert packed floats to proper floats : see http://stackoverflow.com/questions/9882716/packing-float-into-vec4-how-does-this-code-work
    var newArray = [];
    var al = array.length;
    for (var i = 0;i < al;i+=4) {
      newArray[(i / 4) >> 0] = ((array[i]/(256*256*256*256))+(array[i+1]/(256*256*256))+(array[i+2]/(256*256))+(array[i+3]/256));
    }
    return newArray;
  }
  
  var normalizeFilterMatrix = function(response) {
    // normalize responses to lie within [0,1]
    var msize = response.length;
    var max = 0;
    var min = 1;
    
    for (var i = 0;i < msize;i++) {
      max = response[i] > max ? response[i] : max;
      min = response[i] < min ? response[i] : min;
    }
    var dist = max-min;
    
    if (dist == 0) {
      console.log("a patchresponse was monotone, causing normalization to fail. Leaving it unchanged.")
      response = response.map(function() {return 1});
    } else {
      for (var i = 0;i < msize;i++) {
        response[i] = (response[i]-min)/dist;
      }
    }
    
    return response
  }
};

// The rest of the code is based on webgl-utils.js authored by Gregg Tavares, license below:
/*
 * Copyright (c) 2011, Gregg Tavares
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  * Neither the name of greggman.com nor the names of its contributors
 *   may be used to endorse or promote products derived from this software
 *   without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function() {
  
  /**
   * Wrapped logging function.
   * @param {string} msg The message to log.
   */
  var log = function(msg) {
    if (window.console && window.console.log) {
      window.console.log(msg);
    }
  };

  /**
   * Wrapped logging function.
   * @param {string} msg The message to log.
   */
  var error = function(msg) {
    if (window.console) {
      if (window.console.error) {
        window.console.error(msg);
      }
      else if (window.console.log) {
        window.console.log(msg);
      }
    }
    throw msg;
  };

  /**
   * Turn off all logging.
   */
  var loggingOff = function() {
    log = function() {};
    error = function() {};
  };

  /**
   * Check if the page is embedded.
   * @return {boolean} True of we are in an iframe
   */
  var isInIFrame = function() {
    return window != window.top;
  };

  /**
   * Converts a WebGL enum to a string
   * @param {!WebGLContext} gl The WebGLContext to use.
   * @param {number} value The enum value.
   * @return {string} The enum as a string.
   */
  var glEnumToString = function(gl, value) {
    for (var p in gl) {
      if (gl[p] == value) {
        return p;
      }
    }
    return "0x" + value.toString(16);
  };

  /**
   * Creates the HTLM for a failure message
   * @param {string} canvasContainerId id of container of th
   *        canvas.
   * @return {string} The html.
   */
  var makeFailHTML = function(msg) {
    return '' +
      '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
      '<td align="center">' +
      '<div style="display: table-cell; vertical-align: middle;">' +
      '<div style="">' + msg + '</div>' +
      '</div>' +
      '</td></tr></table>';
  };

  /**
   * Mesasge for getting a webgl browser
   * @type {string}
   */
  var GET_A_WEBGL_BROWSER = '' +
    'This page requires a browser that supports WebGL.<br/>' +
    '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

  /**
   * Mesasge for need better hardware
   * @type {string}
   */
  var OTHER_PROBLEM = '' +
    "It doesn't appear your computer can support WebGL.<br/>" +
    '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';

  /**
   * Creates a webgl context. If creation fails it will
   * change the contents of the container of the <canvas>
   * tag to an error message with the correct links for WebGL.
   * @param {Element} canvas. The canvas element to create a
   *     context from.
   * @param {WebGLContextCreationAttirbutes} opt_attribs Any
   *     creation attributes you want to pass in.
   * @return {WebGLRenderingContext} The created context.
   */
  var setupWebGL = function(canvas, opt_attribs) {
    function showLink(str) {
      var container = canvas.parentNode;
      if (container) {
        container.innerHTML = makeFailHTML(str);
      }
    };

    if (!window.WebGLRenderingContext) {
      //showLink(GET_A_WEBGL_BROWSER);
      return null;
    }

    var context = create3DContext(canvas, opt_attribs);
    if (!context) {
      //showLink(OTHER_PROBLEM);
      return null;
    }
    return context;
  };

  /**
   * Creates a webgl context.
   * @param {!Canvas} canvas The canvas tag to get context
   *     from. If one is not passed in one will be created.
   * @return {!WebGLContext} The created context.
   */
  var create3DContext = function(canvas, opt_attribs) {
    var names = ["webgl", "experimental-webgl"];
    var context = null;
    for (var ii = 0; ii < names.length; ++ii) {
      try {
        context = canvas.getContext(names[ii], opt_attribs);
      } catch(e) {}
      if (context) {
        break;
      }
    }
    return context;
  }

  var updateCSSIfInIFrame = function() {
    if (isInIFrame()) {
      document.body.className = "iframe";
    }
  };

  /**
   * Gets a WebGL context.
   * makes its backing store the size it is displayed.
   */
  var getWebGLContext = function(canvas) {
    if (isInIFrame()) {
      updateCSSIfInIFrame();

      // make the canvas backing store the size it's displayed.
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }

    var gl = setupWebGL(canvas);
    return gl;
  };

  /**
   * Loads a shader.
   * @param {!WebGLContext} gl The WebGLContext to use.
   * @param {string} shaderSource The shader source.
   * @param {number} shaderType The type of shader.
   * @param {function(string): void) opt_errorCallback callback for errors.
   * @return {!WebGLShader} The created shader.
   */
  var loadShader = function(gl, shaderSource, shaderType, opt_errorCallback) {
    var errFn = opt_errorCallback || error;
    // Create the shader object
    var shader = gl.createShader(shaderType);

    // Load the shader source
    gl.shaderSource(shader, shaderSource);

    // Compile the shader
    gl.compileShader(shader);

    // Check the compile status
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
      // Something went wrong during compilation; get the error
      var lastError = gl.getShaderInfoLog(shader);
      errFn("*** Error compiling shader '" + shader + "':" + lastError);
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  /**
   * Creates a program, attaches shaders, binds attrib locations, links the
   * program and calls useProgram.
   * @param {!Array.<!WebGLShader>} shaders The shaders to attach
   * @param {!Array.<string>} opt_attribs The attribs names.
   * @param {!Array.<number>} opt_locations The locations for the attribs.
   */
  var loadProgram = function(gl, shaders, opt_attribs, opt_locations) {
    var program = gl.createProgram();
    for (var ii = 0; ii < shaders.length; ++ii) {
      gl.attachShader(program, shaders[ii]);
    }
    if (opt_attribs) {
      for (var ii = 0; ii < opt_attribs.length; ++ii) {
        gl.bindAttribLocation(
            program,
            opt_locations ? opt_locations[ii] : ii,
            opt_attribs[ii]);
      }
    }
    gl.linkProgram(program);

    // Check the link status
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        // something went wrong with the link
        var lastError = gl.getProgramInfoLog (program);
        error("Error in program linking:" + lastError);

        gl.deleteProgram(program);
        return null;
    }
    return program;
  };

  /**
   * Loads a shader from a script tag.
   * @param {!WebGLContext} gl The WebGLContext to use.
   * @param {string} scriptId The id of the script tag.
   * @param {number} opt_shaderType The type of shader. If not passed in it will
   *     be derived from the type of the script tag.
   * @param {function(string): void) opt_errorCallback callback for errors.
   * @return {!WebGLShader} The created shader.
   */
  var createShaderFromScript = function(
      gl, scriptId, opt_shaderType, opt_errorCallback) {
    var shaderSource = "";
    var shaderType;
    var shaderScript = document.getElementById(scriptId);
    if (!shaderScript) {
      throw("*** Error: unknown script element" + scriptId);
    }
    shaderSource = shaderScript.text;

    if (!opt_shaderType) {
      if (shaderScript.type == "x-shader/x-vertex") {
        shaderType = gl.VERTEX_SHADER;
      } else if (shaderScript.type == "x-shader/x-fragment") {
        shaderType = gl.FRAGMENT_SHADER;
      } else if (shaderType != gl.VERTEX_SHADER && shaderType != gl.FRAGMENT_SHADER) {
        throw("*** Error: unknown shader type");
        return null;
      }
    }

    return loadShader(
        gl, shaderSource, opt_shaderType ? opt_shaderType : shaderType,
        opt_errorCallback);
  };

  /* export functions */
  window.setupWebGL = setupWebGL;
  window.createProgram = loadProgram;
  window.createShaderFromScriptElement = createShaderFromScript;
  window.getWebGLContext = getWebGLContext;
  window.updateCSSIfInIFrame = updateCSSIfInIFrame;
  window.loadShader = loadShader;

}());

"use strict";

var svmFilter = function() {
  
  var _fft, fft_filters, responses, biases;
  var fft_size, filterLength, filter_width, search_width, num_patches;
  var temp_imag_part, temp_real_part;
  
  // fft function
  this.fft_inplace = function(array, _im_part) {
      // in-place
      
      if (typeof _im_part == "undefined") {
        _im_part = temp_imag_part;
      }
      
      for (var i = 0;i < filterLength;i++) {
        _im_part[i] = 0.0;
      }
      
      _fft.real_fft2d(array,_im_part);
      
      return [array, _im_part];
  }
  
  this.ifft = function(rn, cn) {
      // in-place
      _fft.real_ifft2d(rn, cn);
      return rn;
  }
  
  var complex_mult_inplace = function(cn1, cn2) {
      // in-place, cn1 is the one modified
      var temp1, temp2;
      for (var r = 0;r < filterLength;r++) {
          temp1 = (cn1[0][r]*cn2[0][r]) - (cn1[1][r]*cn2[1][r]);
          temp2 = (cn1[0][r]*cn2[1][r]) + (cn1[1][r]*cn2[0][r]);
          cn1[0][r] = temp1;
          cn1[1][r] = temp2;
      }
  }
  
  this.init = function(filter_input, bias_input, numPatches, filterWidth, searchWidth) {
    
    var temp, fft, offset;
    
    // calculate needed size of fft (has to be power of two)
    fft_size = upperPowerOfTwo(filterWidth-1+searchWidth);
    filterLength = fft_size*fft_size;
    _fft = new FFT();
    _fft.init(fft_size);
    fft_filters = Array(numPatches);
    var fft_filter;
    var edge = (filterWidth-1)/2;
    
    for (var i = 0;i < numPatches;i++) {
      var flar_fi0 = new Float64Array(filterLength);
      var flar_fi1 = new Float64Array(filterLength);
      
      // load filter 
      var xOffset, yOffset;
      for (var j = 0;j < filterWidth;j++) {
        for (var k = 0;k < filterWidth;k++) {
          // TODO : rotate filter
          
          xOffset = k < edge ? (fft_size-edge) : (-edge);
          yOffset = j < edge ? (fft_size-edge) : (-edge);
          flar_fi0[k+xOffset+((j+yOffset)*fft_size)] = filter_input[i][(filterWidth-1-j)+((filterWidth-1-k)*filterWidth)];
          
          /*xOffset = k < edge ? (fft_size-edge) : (-edge);
          yOffset = j < edge ? (fft_size-edge) : (-edge);
          flar_fi0[k+xOffset+((j+yOffset)*fft_size)] = filter_input[i][k+(j*filterWidth)];*/
          
          //console.log(k + ","+ j+":" + (k+xOffset+((j+yOffset)*fft_size)))
        }
      }

      // fft it and store
      fft_filter = this.fft_inplace(flar_fi0, flar_fi1);
      fft_filters[i] = fft_filter;

    }
    
    // set up biases
    biases = new Float64Array(numPatches);
    for (var i = 0;i < numPatches;i++) {
      biases[i] = bias_input[i];
    }
    
    responses = Array(numPatches);
    temp_imag_part = Array(numPatches);
    for (var i = 0;i < numPatches;i++) {
      responses[i] = new Float64Array(searchWidth*searchWidth);
      temp_imag_part[i] = new Float64Array(searchWidth*searchWidth);
    }
    temp_real_part = new Float64Array(filterLength);
    
    num_patches = numPatches;
    filter_width = filterWidth;
    search_width = searchWidth;
  }
  
  this.getResponses = function(patches) {
    var response, temp, edge;
    var patch_width = filter_width-1+search_width;
    for (var i = 0;i < num_patches;i++) {
      // reset zeroes in temp_real_part
      for (var j = 0;j < fft_size*fft_size;j++) {
        temp_real_part[j] = 0.0;
      }
      
      // normalize patches to 0-1
      patches[i] = normalizePatches(patches[i]);
      
      // patch must be padded (with zeroes) to match fft size
      for (var j = 0;j < patch_width;j++) {
        for (var k = 0;k < patch_width;k++) {
          temp_real_part[j + (fft_size*k)] = patches[i][k + (patch_width*j)];
        }
      }
      
      //drawData(document.getElementById('sketch').getContext('2d'), temp_real_part, 32, 32, false, 0, 0);
      
      // fft it
      response = this.fft_inplace(temp_real_part);
      
      // multiply pointwise with filter
      complex_mult_inplace(response, fft_filters[i]);
      
      // inverse fft it
      response = this.ifft(response[0], response[1]);
      
      // crop out edges
      edge = (filter_width-1)/2;
      for (var j = 0;j < search_width;j++) {
        for (var k = 0;k < search_width;k++) {
          responses[i][j + (k*search_width)] = response[edge + k + ((j+edge)*(fft_size))];
        }
      }

      // add bias
      for (var j = 0;j < search_width*search_width;j++) {
        responses[i][j] += biases[i];
      }
      
      // logistic transformation
      responses[i] = logisticResponse(responses[i]);
      
      /*responses[i] = new Float64Array(32*32)
      for (var j = 0;j < 32;j++) {
        for (var k = 0;k < 32;k++) {
          responses[i][k + (j*(32))] = response[k + (j*(32))]
        }
      }*/
      
      // normalization?
      inplaceNormalizeFilterMatrix(responses[i]);
    }
    
    return responses;
  }
  
  var normalizePatches = function(patch) {
    var patch_width = filter_width-1+search_width;
    var max = 0;
    var min = 1000;
    var value;
    for (var j = 0;j < patch_width;j++) {
      for (var k = 0;k < patch_width;k++) {
        value = patch[k + (patch_width*j)]
        if (value < min) {
          min = value;
        }
        if (value > max) {
          max = value;
        }
      }
    }
    var scale = max-min;
    for (var j = 0;j < patch_width;j++) {
      for (var k = 0;k < patch_width;k++) {
        patch[k + (patch_width*j)] = (patch[k + (patch_width*j)]-min)/scale;
      }
    }
    return patch;
  }
  
  var logisticResponse = function(response) {
    // create probability by doing logistic transformation
    for (var j = 0;j < search_width;j++) {
      for (var k = 0;k < search_width;k++) {
        response[j + (k*search_width)] = 1.0/(1.0 + Math.exp(- (response[j + (k*search_width)] - 1.0 )));
      }
    }
    return response
  }
  
  var upperPowerOfTwo = function(x) {
    x--;
    x |= x >> 1;
    x |= x >> 2;
    x |= x >> 4;
    x |= x >> 8;
    x |= x >> 16;
    x++;
    return x;
  }
  
  var inplaceNormalizeFilterMatrix = function(response) {
    // normalize responses to lie within [0,1]
    var msize = response.length;
    var max = 0;
    var min = 1;
    
    for (var i = 0;i < msize;i++) {
      max = response[i] > max ? response[i] : max;
      min = response[i] < min ? response[i] : min;
    }
    var dist = max-min;
    
    if (dist == 0) {
      console.log("a patchresponse was monotone, causing normalization to fail. Leaving it unchanged.")
    } else {
      for (var i = 0;i < msize;i++) {
        response[i] = (response[i]-min)/dist;
      }
    }
  }

  /**
   * Fast Fourier Transform
   * 1D-FFT/IFFT, 2D-FFT/IFFT (radix-2)
   * 
   * @author ryo / github.com/wellflat
   * Based on https://github.com/wellflat/javascript-labs with some tiny optimizations
   */

  function FFT() {
    
    var _n = 0,          // order
        _bitrev = null,  // bit reversal table
        _cstb = null;    // sin/cos table
    var _tre, _tim;
    
    this.init = function (n) {
      if(n !== 0 && (n & (n - 1)) === 0) {
        _n = n;
        _setVariables();
        _makeBitReversal();
        _makeCosSinTable();
      } else {
        throw new Error("init: radix-2 required");
      }
    }
      
    // 1D-FFT
    this.fft1d = function (re, im) {
      fft(re, im, 1);
    }
      
    // 1D-IFFT
    this.ifft1d = function (re, im) {
      var n = 1/_n;
      fft(re, im, -1);
      for(var i=0; i<_n; i++) {
        re[i] *= n;
        im[i] *= n;
      }
    }
    
    // 2D-FFT
    this.fft2d = function (re, im) {
      var i = 0;
      // x-axis
      for(var y=0; y<_n; y++) {
        i = y*_n;
        for(var x1=0; x1<_n; x1++) {
          _tre[x1] = re[x1 + i];
          _tim[x1] = im[x1 + i];
        }
        this.fft1d(_tre, _tim);
        for(var x2=0; x2<_n; x2++) {
          re[x2 + i] = _tre[x2];
          im[x2 + i] = _tim[x2];
        }
      }
      
      // y-axis
      for(var x=0; x<_n; x++) {
        for(var y1=0; y1<_n; y1++) {
          i = x + y1*_n;
          _tre[y1] = re[i];
          _tim[y1] = im[i];
        }
        this.fft1d(_tre, _tim);
        for(var y2=0; y2<_n; y2++) {
          i = x + y2*_n;
          re[i] = _tre[y2];
          im[i] = _tim[y2];
        }
      }
    }
    
    // 2D-IFFT
    this.ifft2d = function (re, im) {
      var i = 0;
      // x-axis
      for(var y=0; y<_n; y++) {
        i = y*_n;
        for(var x1=0; x1<_n; x1++) {
          _tre[x1] = re[x1 + i];
          _tim[x1] = im[x1 + i];
        }
        this.ifft1d(_tre, _tim);
        for(var x2=0; x2<_n; x2++) {
          re[x2 + i] = _tre[x2];
          im[x2 + i] = _tim[x2];
        }
      }
      // y-axis
      for(var x=0; x<_n; x++) {
        for(var y1=0; y1<_n; y1++) {
          i = x + y1*_n;
          _tre[y1] = re[i];
          _tim[y1] = im[i];
        }
        this.ifft1d(_tre, _tim);
        for(var y2=0; y2<_n; y2++) {
          i = x + y2*_n;
          re[i] = _tre[y2];
          im[i] = _tim[y2];
        }
      }
    }
    
    // 2D-IFFT, real-valued
    // only outputs the real valued part
    this.real_ifft2d = function (re, im) {
      var i2;
      var i = 0;
      // x-axis
      for(var y=0; y<_n; y++) {
        i = y*_n;
        for(var x1=0; x1<_n; x1++) {
          _tre[x1] = re[x1 + i];
          _tim[x1] = im[x1 + i];
        }
        this.ifft1d(_tre, _tim);
        for(var x2=0; x2<_n; x2++) {
          re[x2 + i] = _tre[x2];
          im[x2 + i] = _tim[x2];
        }
      }
      // y-axis
      var halfn = _n/2;
      var rowIdx = 0;
      for(var x=0; x<_n; x+=2) {
        //untangle
        i = x;
        i2 = x+1;
        _tre[0] = re[0 + i];
        _tim[0] = re[0 + i2];
        _tre[_n/2] = re[(halfn*_n) + i];
        _tim[_n/2] = re[(halfn*_n) + i2];
        for (var x2=1;x2<halfn;x2++) {
          rowIdx = x2*_n
          _tre[x2] = re[rowIdx+i] - im[rowIdx + i2];
          _tre[_n - x2] = re[rowIdx+i] + im[rowIdx + i2];
          _tim[x2] = im[rowIdx+i] + re[rowIdx+i2];
          _tim[_n - x2] = re[rowIdx+i2] - im[rowIdx+i];
        }
        this.ifft1d(_tre, _tim);
        for(var y2=0; y2<_n; y2++) {
          i = x + y2*_n;
          i2 = (x + 1) + y2*_n;
          re[i] = _tre[y2];
          re[i2] = _tim[y2];
        }
      }
    }
    
    // 2D-FFT, real-valued only
    // ignores the imaginary input
    //   see:
    // http://www.inf.fu-berlin.de/lehre/SS12/SP-Par/download/fft1.pdf
    // http://cnx.org/content/m12021/latest/
    // http://images.apple.com/acg/pdf/g4fft.pdf
    // http://www.ti.com/lit/an/spra291/spra291.pdf
    this.real_fft2d = function (re, im) {
      var i = 0, i2 = 0;
      var fftlen = (_n*_n)-1;
      // x-axis
      for(var y=0; y<_n; y += 2) {
        i = y*_n;
        i2 = (y+1)*_n;
        // tangle
        for(var x1=0; x1<_n; x1++) {
          _tre[x1] = re[x1 + i];
          _tim[x1] = re[x1 + i2];
        }
        this.fft1d(_tre, _tim);
        // untangle
        re[0 + i] = _tre[0];
        re[0 + i2] = _tim[0];
        im[0 + i] = 0;
        im[0 + i2] = 0;
        re[_n/2 + i] = _tre[_n/2];
        re[_n/2 + i2] = _tim[_n/2];
        im[_n/2 + i] = 0;
        im[_n/2 + i2] = 0;
        for(var x2=1;x2<(_n/2);x2++) {
          re[x2 + i] = 0.5 * (_tre[x2] + _tre[_n - x2]);
          im[x2 + i] = 0.5 * (_tim[x2] - _tim[_n - x2]);
          re[x2 + i2] = 0.5 * (_tim[x2] + _tim[_n - x2]);
          im[x2 + i2] = -0.5 * (_tre[x2] - _tre[_n - x2]);
          re[(_n-x2) + i] = re[x2 + i];
          im[(_n-x2) + i] = -im[x2 + i];
          re[(_n-x2) + i2] = re[x2 + i2];
          im[(_n-x2) + i2] = -im[x2 + i2];
        }
      }
      // y-axis
      for(var x=0; x<_n; x++) {
        for(var y1=0; y1<_n; y1++) {
          i = x + y1*_n;
          _tre[y1] = re[i];
          _tim[y1] = im[i];
        }
        this.fft1d(_tre, _tim);
        for(var y2=0; y2<_n; y2++) {
          i = x + y2*_n;
          re[i] = _tre[y2];
          im[i] = _tim[y2];
        }
      }
    }
    
    // core operation of FFT
    function fft(re, im, inv) {
      var d, h, ik, m, tmp, wr, wi, xr, xi,
          n4 = _n >> 2;
      // bit reversal
      for(var l=0; l<_n; l++) {
        m = _bitrev[l];
        if(l < m) {
          tmp = re[l];
          re[l] = re[m];
          re[m] = tmp;
          tmp = im[l];
          im[l] = im[m];
          im[m] = tmp;
        }
      }
      // butterfly operation
      //butfly(re,im,inv,n4);
      for(var k=1; k<_n; k<<=1) {
        h = 0;
        d = _n/(k << 1);
        for(var j=0; j<k; j++) {
          wr = _cstb[h + n4];
          wi = inv*_cstb[h];
          for(var i=j; i<_n; i+=(k<<1)) {
            ik = i + k;
            xr = wr*re[ik] + wi*im[ik];
            xi = wr*im[ik] - wi*re[ik];
            re[ik] = re[i] - xr;
            re[i] += xr;
            im[ik] = im[i] - xi;
            im[i] += xi;
          }
          h += d;
        }
      }
    }
    
    function butfly(re, im, inv, n4) {
      var h,d,wr,wi,ik,xr,xi;
      for(var k=1; k<_n; k<<=1) {
        h = 0;
        d = _n/(k << 1);
        for(var j=0; j<k; j++) {
          wr = _cstb[h + n4];
          wi = inv*_cstb[h];
          for(var i=j; i<_n; i+=(k<<1)) {
            ik = i + k;
            xr = wr*re[ik] + wi*im[ik];
            xi = wr*im[ik] - wi*re[ik];
            re[ik] = re[i] - xr;
            re[i] += xr;
            im[ik] = im[i] - xi;
            im[i] += xi;
          }
          h += d;
        }
      }
    }
    
    // set variables
    function _setVariables() {
      if(typeof Uint8Array !== 'undefined') {
        _bitrev = new Uint8Array(_n);
      } else {
        _bitrev = new Array(_n);
      }
      if(typeof Float64Array !== 'undefined') {
        _cstb = new Float64Array(_n*1.25);
        _tre = new Float64Array(_n);
        _tim = new Float64Array(_n);
      } else {
        _cstb = new Array(_n*1.25);
        _tre = new Array(_n);
        _tim = new Array(_n);
      }
    }
    
    // make bit reversal table
    function _makeBitReversal() {
      var i = 0,
          j = 0,
          k = 0;
      _bitrev[0] = 0;
      while(++i < _n) {
        k = _n >> 1;
        while(k <= j) {
          j -= k;
          k >>= 1;
        }
        j += k;
        _bitrev[i] = j;
      }
    }
    
    // make trigonometric function table
    function _makeCosSinTable() {
      var n2 = _n >> 1,
          n4 = _n >> 2,
          n8 = _n >> 3,
          n2p4 = n2 + n4,
          t = Math.sin(Math.PI/_n),
          dc = 2*t*t,
          ds = Math.sqrt(dc*(2 - dc)),
          c = _cstb[n4] = 1,
          s = _cstb[0] = 0;
      t = 2*dc;
      for(var i=1; i<n8; i++) {
        c -= dc;
        dc += t*c;
        s += ds;
        ds -= t*s;
        _cstb[i] = s;
        _cstb[n4 - i] = c;
      }
      if(n8 !== 0) {
        _cstb[n8] = Math.sqrt(0.5);
      }
      for(var j=0; j<n4; j++) {
        _cstb[n2 - j]  = _cstb[j];
      }
      for(var k=0; k<n2p4; k++) {
        _cstb[k + n2] = -_cstb[k];
      }
    }
  }
}

// requires mosse.js

var mosseFilterResponses = function() {
  
  var filters = [];
  var responses = [];
  var num_Patches = 0;
  
  this.init = function(filter_input, numPatches, filterWidth, filterHeight) {
    // load filters, make fft ready
    
    for (var i = 0;i < numPatches;i++) {
      var temp = {};
      temp.width = filterWidth;
      temp.height = filterHeight;
      var filterLength = filterWidth*filterHeight
      var flar_fi0 = new Float64Array(filterLength);
      var flar_fi1 = new Float64Array(filterLength);
      for (var j = 0;j < filterLength;j++) {
        flar_fi0[j] = filter_input[i][0][j];
        flar_fi1[j] = filter_input[i][1][j];
      }
      temp.real = flar_fi0;
      temp.imag = flar_fi1;
      filters[i] = new mosseFilter();
      filters[i].load(temp);
    }
    
    num_Patches = numPatches;
  }
  
  this.getResponses = function(patches) {
    for (var i = 0;i < num_Patches;i++) {
      responses[i] = filters[i].getResponse(patches[i]);
      //responses[i] = logisticResponse(responses[i]);
      responses[i] = normalizeFilterMatrix(responses[i]);
    }
    
    return responses;
  }
  
  var logisticResponse = function(response) {
    // create probability by doing logistic transformation
    var filter_size = response.length;
    for (var j = 0;j < filter_size;j++) {
      response[j] = 1.0/(1.0 + Math.exp(- (response[j]-1.0) ));
    }
    return response;
  }
  
  var normalizeFilterMatrix = function(response) {
    // normalize responses to lie within [0,1]
    var msize = response.length;
    var max = 0;
    var min = 1;
    
    for (var i = 0;i < msize;i++) {
      max = response[i] > max ? response[i] : max;
      min = response[i] < min ? response[i] : min;
    }
    var dist = max-min;
    
    if (dist == 0) {
      console.log("a patchresponse was monotone, causing normalization to fail. Leaving it unchanged.")
      response = response.map(function() {return 1});
    } else {
      for (var i = 0;i < msize;i++) {
        response[i] = (response[i]-min)/dist;
      }
    }
    
    return response
  }
}

var left_eye_filter = {"real": [1.5419219943717721, 0.40010880110578706, -0.79043641265342957, -1.2685464969238938, 0.39878117336167285, -1.0673489992245377, -0.079880838229404019, -0.45374680224191505, -0.043474097938900787, -0.31125662385352687, 0.17092430376098702, -0.29613086164846153, 0.5616469648110296, -1.559786848789493, 0.64513037997492662, -1.2899747976234162, 1.1761667998175334, -1.2899747976233551, 0.64513037997490474, -1.5597868487894897, 0.56164696481102505, -0.29613086164845964, 0.17092430376099094, -0.31125662385352959, -0.043474097938900787, -0.45374680224191177, -0.079880838229404658, -1.0673489992245357, 0.39878117336167307, -1.2685464969238942, -0.79043641265343012, 0.40010880110578717, -1.3820969331049027, 0.069560471269205768, -1.9786339579213206, -1.9807415717551982, -0.78667274410450883, -1.2217002325587256, -0.19150029104902774, -0.35131617290773243, -0.17646388464205803, -0.16672095020503441, -0.092298612924566523, -0.028899376452253527, -0.1314555696102146, -0.32892265898101813, -0.40987148655061206, 0.11741827111366547, -0.67254330182605138, -0.46007833291519956, -0.67215259521101001, -0.44871907432473013, -0.034749316729184583, 0.0055639281302433969, -0.17675902360981591, -0.26196208085032191, -0.36301254306387037, -0.33546767337818123, -0.6458889740799838, -1.1981932989987978, 0.12372650763830917, -1.4996172161865935, -2.4084298023013888, -2.0505291279591722, -1.7249706159518585, -2.277646289702639, -3.1259631743419591, -2.9656385065342015, -2.8480835086962011, -1.4260964500310189, -0.61792590829173544, -0.2611655301498782, -0.38519889843539723, -0.17511899827006483, -0.32808050503227176, 0.0076800871037463036, -0.18710828510427668, 0.1976534820339281, -0.55444453100465052, 0.14583567590328381, -0.69844971117515287, -0.90188577233526623, -0.53500016384583371, -0.044420751861669799, 0.014727914354086128, -0.28084584584371913, -0.29890408748685848, -0.39431380149336548, -0.39569215798819307, -0.74351999988258299, -0.82502198370631752, -1.851491897104155, -0.74302378668934244, 0.21156442062863762, -3.3061472495599986, -1.7990472945779568, -2.2193764251732282, -2.3438802466919251, -3.3615971067123311, -3.5383249085863708, -2.2639673745086588, -2.0271757806780748, -0.75242583405872232, -0.30143411016839378, -0.3625272253546275, -0.25489431004647689, -0.18928491561467081, -0.1179891518538482, 0.027920290231533224, -0.035472107498143821, -0.29008721857562259, -0.3604588674139817, -0.39156143807433802, -0.82222257402876564, -0.44979914971695928, -0.098136330355476253, 0.065628582466229365, -0.33607304327303128, -0.32161201323497779, -0.41856090178723965, -0.64028425429629054, -0.7766428172010218, -1.3946448661671447, -2.2603422126144683, -0.38769722219534525, -0.95341593939478653, -1.412952994959813, -2.3602336858020432, -1.2756392437278019, -2.0983496132652038, -2.5682454610054268, -2.8791053946930378, -2.1809972632688095, -0.84281293847776861, -0.75998936793718697, -0.18584599820380068, -0.30105748355308259, -0.16098142942852958, -0.13792125740417191, -0.089790022871128708, -0.12321821342876504, -0.1128661923016878, -0.3924098378001975, -0.5780902167586397, -0.48685989567066695, -0.53565359443296234, -0.051036689850526382, -0.0068547033925117689, -0.18963405157839419, -0.22514761090777807, -0.35555823460888908, -0.46670603976585517, -0.56179541485257889, -0.7495095888115163, -1.4772075422260349, -1.5836466114968029, -2.3846549454186694, -1.4884613952536236, -1.8237453905245253, -1.6712324532934877, -1.5169157844507295, -1.6930052820597281, -2.1023566589276004, -2.2062031109308458, -1.7945281756942255, -0.26457398838912649, 0.22038139379151148, -0.43479836723775234, -0.19830827357221226, -0.18018565146479498, -0.097060879184795737, -0.10088329756370379, -0.063069709957272527, -0.17970932516041177, -0.1943040732581543, -0.37970560392277619, -0.47302301606251812, -0.30366967948052181, -0.064732391018915397, -0.08902516330269715, -0.082000200083027344, -0.22965854401457736, -0.32035624605031326, -0.31836783196552437, -0.40132058236311119, -0.65601747033470859, -0.59040483751417483, -1.8503084663080034, -1.8694842425148914, -1.9326778896298584, -1.6301578422923519, -1.4332006785118301, -1.305707665299106, -1.364200787821644, -1.5357935460809622, -1.6161992336951241, -0.74003518668370516, -0.29423824173210689, 0.025934598230976654, -0.043349004411304674, -0.25408021803022468, -0.066965686484977499, -0.075717498698635255, 0.007057189465364498, -0.042171356658338113, -0.036938315661768008, -0.34221561581756049, -0.20400167508805764, -0.37417116097079772, -0.25039909487805356, -0.070874531394524931, -0.0569972852039487, -0.067238206950403182, -0.17397285212300442, -0.20428337307808273, -0.23651154356493315, -0.33356498933276568, -0.07339749754226077, -0.70367959806681601, -0.82403680021595049, -1.6058616381755235, -1.6192427030685497, -1.5705638815427956, -1.4659201063980019, -0.95504179549951018, -0.97237526162739873, -1.0460191987834688, -0.91465668941265721, -0.60548232361398524, 0.01898438364933451, -0.19419044456729498, -0.039627851124307223, 0.0012357796666701798, -0.078110822445325079, 0.0048626364920250518, -0.040449089662379589, -0.0035054269587873454, -0.13387544724730729, -0.10031131456276647, -0.25968674675684189, -0.20555329767005767, -0.26509289948725284, -0.038788452621647145, -0.076999891872251258, -0.071661433038976499, -0.14182240789719938, -0.1654673053291095, -0.19859450279267193, -0.053382326365810369, -0.2156585383674445, -0.045097357284793499, -0.62449818579949512, -0.92624906744917224, -1.0411254782363617, -1.122035196738675, -1.0607692164246043, -0.57723811773534028, -0.63187735896388075, -0.54813311204421922, -0.55320252101738743, -0.30197299587482401, -0.047213249757838388, 0.082808930467383288, -0.067715134483222431, -0.01022881748368659, 0.042038311258956552, -0.063371767399980669, 0.029161890169972702, -0.091396316586836127, -0.0034600735070754811, -0.12424052925006424, -0.24432996418012101, -0.26521664175359499, -0.22745980283820413, -0.14361316535317664, -0.00075904203100577935, -0.020936168457862139, -0.14205665196423617, -0.19024248288823023, -0.079686122362245204, -0.15016133237735926, 0.049598910651295514, -0.11760486834511712, -0.1837522251545049, -0.38594205494114608, -0.53542516436999843, -0.57340991730807989, -0.52753621424018138, -0.23151163972118355, -0.22295096919949259, -0.33704349161770436, -0.26165852514054583, -0.13898866968588663, 0.034596483191139484, -0.012631210076789067, 0.047371310076345617, -0.038651839330751551, -0.0019970761454430018, 0.063048845258375494, -0.1124891762554399, 0.08556992539656616, -0.21043659051868199, -0.19223333969456, -0.39082994830035861, -0.19294368007162721, -0.41025595439938572, -0.17178084419175166, -0.010933041190555012, -0.089512936152074493, -0.21569610281495066, -0.09144756671688016, -0.19525258909505316, -0.029753598134641936, -0.021307245660079924, 0.029087127940551009, 0.037511290653097842, -0.20600990120705839, -0.26967580750352926, -0.21000923681194664, -0.28209018858285628, -0.11925518789339556, -0.24869348141289982, -0.21025892926356746, -0.15567029136726124, -0.040546729108395907, -0.0050266153100547101, 0.030710887069787196, -0.0061104340245858278, 0.0369376092260571, -0.054862661367900321, 0.013297880203253048, 0.19659447375886394, -0.2499491329142558, -0.062959699002865757, -0.53055029095956008, -0.38784811281629444, -0.53891285075962392, -0.41886712861154285, -0.099230097260325875, -0.16474199810952628, -0.28693665642627014, -0.0095667980850221105, -0.32619954993450928, -0.08627491478166284, -0.073253161755714766, 0.015634174038690329, 0.082440536547531792, 0.025411878261881942, -0.11318909242737961, -0.1270560226842935, -0.21657212936164139, -0.13993873549611191, -0.37510275237622831, -0.26472923111076219, -0.24460131567533192, -0.14127652303494026, -0.050428686591045178, 0.041347840374190772, -0.0061780445153000636, 0.0073990345210250153, -0.014062739037014381, 0.14348925152561878, -0.015321787554403667, 0.0017746672356015968, 0.25165135427361052, -0.626463828190993, -0.48167134330805639, -1.045863293770664, -0.69512591788493194, -0.44532127384388254, -0.28479724025368391, -0.39470955087317983, 0.20227228344720469, -0.53909912073488953, -0.12025629051789474, -0.1899243750597305, -0.048474806721595133, 0.060764771353227762, 0.090648151782516159, 0.091608208912697275, 0.0036582478916540977, -0.22492530005263131, -0.27295314658024766, -0.35559738025257359, -0.62902925014412947, -0.57166411974881004, -0.37258895173129181, -0.22157638610464933, 0.022494427132080854, 0.014769425415166171, 0.003526808789406817, -0.011346909674078769, 0.050921170848348289, 0.090308541799219627, 0.37260817254533324, -0.25909871392159911, -0.42379280974334355, -0.095380647808568128, -1.1906083748893519, -0.78599914414892469, -0.95277914352730275, -0.63659778359422337, -0.98026015008952749, 0.48173198285916102, -0.60092009018055192, -0.10265418316164113, -0.39913639006279306, -0.17310908908773887, -0.0194191171632387, 0.054047965289179878, 0.1388529643463832, 0.15661099050145999, -0.10898263774416243, -0.33291231456737602, -0.59569027865888713, -0.69353081584948972, -1.0999707493347484, -0.74392084753736687, -0.49074781214158159, -0.065190556733852961, 0.012289768389229717, 0.024577513704595676, 0.0040302804696096322, 0.036047756292976456, 0.058236765637246286, 0.13893846256790621, 0.036944676036934632, 0.41686279554239464, -0.85232286388185818, -1.2988315127624981, -0.47352779677305168, -0.81763632541546793, -0.77384457803621831, -1.4256240004519281, 0.52588993532360684, -0.89821724022902683, 0.1591911967653899, -0.55046596772346867, -0.30980016041271019, -0.16709614007114884, -0.046029700131955266, 0.044793268150423983, 0.1689242242845459, 0.14412365934528507, -0.0088250071313367359, -0.36778545124666312, -0.79393844517732104, -1.1610479066529615, -0.76523210008850662, -0.63009858032048405, -0.13947023057344932, -0.017173105577524262, 0.039030007688455846, 0.014491273083805401, 0.039792542943837252, 0.054072846696920814, 0.11729310469925348, 0.053609281522667675, 0.0081549498718087084, -0.30910813452845548, 0.25944224899607843, -1.3584842180322938, -1.5885570490138659, -0.65759582794618221, -1.139869490652734, 0.70928264080594694, -1.9674198903133462, 0.37712664425406606, -0.84336038390578949, -0.47788074719428036, -0.18342000086663721, -0.18811394573901796, -0.055050027645985648, 0.045043056834335606, 0.11486303559854361, 0.22023958716404868, 0.14735402009444676, -0.27894427087197998, -0.73080536953129638, -0.76794305693297227, -0.37355919765840223, 0.12353986794322802, 0.090505348376311842, 0.14069908672094206, 0.087373214380278855, 0.023353946735568523, 0.031400559920396587, 0.079550230446202241, 0.084927161382185437, 0.040777158255349423, -0.16274954314482293, -0.41184413435479567, -0.71871288822574875, 0.55302907456342854, -1.5309493464500674, -2.9026104205694736, 0.42043303599508353, -1.7138106264793671, 0.29513888249127102, -1.2517216433630918, -0.66769942176516839, -0.28576739334390183, -0.24127777006787937, -0.10778095858902549, -0.036092425009198861, 0.021519213385077923, 0.13414694961717147, 0.16917378957839613, 0.17307922682581758, 0.076246758829015673, -0.047904835134272621, -0.27544262702406924, 0.61826249566563185, 0.26987423123693399, 0.2085883517320696, 0.26073426210721973, 0.12070625812911842, 0.062945582093309679, 0.083649573916505432, 0.049688095345785867, 0.019564357607843069, -0.046035817476596949, -0.13409074070830324, -0.49027201814294552, -0.47756457321420159, -0.74403675135427549, -0.3080068432033089, -0.043712438842705037, -4.735594317158907, -0.043712438842706695, -0.30800684320330962, -0.74403675135427572, -0.47756457321420304, -0.49027201814294813, -0.13409074070830412, -0.046035817476598156, 0.019564357607843069, 0.049688095345786006, 0.083649573916506056, 0.062945582093310845, 0.12070625812911921, 0.26073426210722073, 0.20858835173207019, 0.26987423123693399, -0.37355919765836759, -0.27544262702403433, -0.047904835134273127, 0.076246758829012523, 0.17307922682581853, 0.16917378957839499, 0.13414694961716844, 0.02151921338507657, -0.036092425009199861, -0.1077809585890261, -0.24127777006787943, -0.2857673933439015, -0.66769942176516905, -1.2517216433630949, 0.29513888249127429, -1.7138106264793713, 0.42043303599507681, -2.902610420569474, -1.5309493464500692, 0.55302907456342232, -0.71871288822575019, -0.41184413435479833, -0.16274954314482265, 0.04077715825534866, 0.08492716138218645, 0.079550230446203143, 0.031400559920398419, 0.023353946735571576, 0.08737321438028138, 0.14069908672095732, 0.090505348376334033, 0.1235398679432393, -0.76523210008847808, -0.76794305693296139, -0.73080536953128505, -0.27894427087197604, 0.1473540200944477, 0.22023958716404682, 0.11486303559854165, 0.045043056834333829, -0.055050027645986453, -0.18811394573901843, -0.18342000086663854, -0.47788074719428042, -0.84336038390579149, 0.37712664425406617, -1.9674198903133469, 0.70928264080593695, -1.1398694906527307, -0.65759582794619398, -1.588557049013867, -1.3584842180322987, 0.25944224899607732, -0.30910813452845781, 0.0081549498718086911, 0.053609281522667279, 0.11729310469925426, 0.054072846696921202, 0.039792542943838709, 0.014491273083807311, 0.039030007688458185, -0.017173105577517028, -0.13947023057343994, -0.63009858032045107, -1.0999707493347308, -1.1610479066529467, -0.79393844517731305, -0.3677854512466584, -0.0088250071313340107, 0.14412365934528559, 0.16892422428454401, 0.044793268150420118, -0.046029700131956147, -0.16709614007115095, -0.30980016041271097, -0.55046596772347045, 0.15919119676539073, -0.8982172402290286, 0.52588993532360329, -1.4256240004519327, -0.77384457803621687, -0.8176363254154656, -0.47352779677305679, -1.2988315127625027, -0.85232286388185829, 0.41686279554239525, 0.036944676036935756, 0.13893846256790574, 0.058236765637246675, 0.036047756292977066, 0.0040302804696111128, 0.02457751370459911, 0.012289768389232913, -0.065190556733844662, -0.49074781214156804, -0.74392084753735632, -0.62902925014412903, -0.69353081584948562, -0.59569027865888302, -0.33291231456737491, -0.10898263774416028, 0.15661099050145985, 0.13885296434638142, 0.054047965289177706, -0.019419117163239467, -0.17310908908773912, -0.39913639006279433, -0.10265418316163986, -0.60092009018055315, 0.48173198285915786, -0.98026015008952594, -0.63659778359422126, -0.9527791435273002, -0.78599914414892458, -1.190608374889349, -0.095380647808570002, -0.42379280974334488, -0.25909871392159683, 0.37260817254533357, 0.09030854179921953, 0.050921170848348372, -0.011346909674079158, 0.0035268087894081549, 0.014769425415168456, 0.022494427132082863, -0.22157638610464575, -0.37258895173129003, -0.5716641197488066, -0.37510275237622537, -0.35559738025257059, -0.27295314658024672, -0.22492530005262792, 0.0036582478916564426, 0.091608208912696387, 0.090648151782514966, 0.060764771353224882, -0.048474806721595647, -0.18992437505973167, -0.12025629051789351, -0.53909912073488875, 0.20227228344720258, -0.39470955087317799, -0.28479724025368247, -0.44532127384387832, -0.69512591788493272, -1.04586329377066, -0.48167134330805861, -0.62646382819099156, 0.25165135427361029, 0.0017746672356018336, -0.0153217875544032, 0.14348925152561842, -0.01406273903701487, 0.0073990345210243587, -0.0061780445152985596, 0.04134784037419488, -0.050428686591041855, -0.1412765230349349, -0.2446013156753272, -0.26472923111076024, -0.11925518789339257, -0.13993873549610955, -0.21657212936163839, -0.1270560226842922, -0.11318909242737903, 0.025411878261882927, 0.082440536547530169, 0.015634174038688685, -0.073253161755715501, -0.086274914781661965, -0.326199549934509, -0.0095667980850238903, -0.28693665642627003, -0.16474199810952764, -0.099230097260324029, -0.41886712861154318, -0.53891285075962314, -0.38784811281629461, -0.53055029095956219, -0.062959699002866631, -0.24994913291425488, 0.1965944737588636, 0.013297880203252755, -0.054862661367901897, 0.036937609226056677, -0.0061104340245862225, 0.030710887069788338, -0.005026615310052167, -0.040546729108393256, -0.15567029136725916, -0.21025892926356554, -0.24869348141289621, -0.23151163972117689, -0.28209018858284918, -0.21000923681193823, -0.26967580750352416, -0.20600990120705304, 0.037511290653099091, 0.029087127940549885, -0.02130724566008323, -0.029753598134642099, -0.19525258909505444, -0.091447566716882075, -0.21569610281495041, -0.089512936152075853, -0.010933041190555782, -0.17178084419175305, -0.41025595439938806, -0.19294368007162768, -0.39082994830036216, -0.19223333969456258, -0.21043659051868269, 0.085569925396567076, -0.11248917625543933, 0.063048845258374231, -0.0019970761454456269, -0.038651839330752197, 0.047371310076345617, -0.012631210076786959, 0.034596483191142599, -0.13898866968588444, -0.26165852514053983, -0.33704349161769737, -0.22295096919948695, -0.57723811773534028, -0.52753621424018138, -0.57340991730807944, -0.53542516436999865, -0.38594205494114614, -0.1837522251545064, -0.11760486834511884, 0.049598910651293758, -0.15016133237735926, -0.07968612236224891, -0.1902424828882312, -0.14205665196423831, -0.020936168457862579, -0.00075904203100844866, -0.14361316535317845, -0.2274598028382093, -0.26521664175359499, -0.24432996418012529, -0.12424052925006639, -0.0034600735070760831, -0.09139631658683596, 0.029161890169972428, -0.063371767399980516, 0.042038311258955005, -0.01022881748368659, -0.067715134483221959, 0.082808930467383746, -0.047213249757837236, -0.3019729958748239, -0.55320252101738743, -0.548133112044219, -0.63187735896388053, -0.95504179549950285, -1.060769216424599, -1.1220351967386673, -1.0411254782363524, -0.92624906744916458, -0.62449818579949246, -0.045097357284792555, -0.21565853836744897, -0.053382326365811708, -0.19859450279267432, -0.16546730532911214, -0.14182240789720132, -0.07166143303897729, -0.076999891872253062, -0.038788452621649434, -0.2650928994872585, -0.20555329767005678, -0.25968674675684078, -0.10031131456276626, -0.13387544724730568, -0.0035054269587865765, -0.040449089662379971, 0.0048626364920241281, -0.078110822445325467, 0.0012357796666695618, -0.039627851124306598, -0.19419044456729473, 0.018984383649339364, -0.60548232361397991, -0.91465668941264988, -1.0460191987834631, -0.97237526162739263, -1.3057076652991049, -1.4659201063979992, -1.5705638815427927, -1.6192427030685486, -1.6058616381755215, -0.82403680021595249, -0.70367959806681868, -0.073397497542269388, -0.33356498933276529, -0.23651154356493967, -0.2042833730780847, -0.17397285212300875, -0.067238206950403417, -0.056997285203952995, -0.070874531394526111, -0.25039909487805306, -0.37417116097079761, -0.20400167508805389, -0.34221561581755761, -0.036938315661763657, -0.042171356658337315, 0.0070571894653653896, -0.075717498698634964, -0.066965686484977194, -0.25408021803022474, -0.043349004411301621, 0.025934598230977574, -0.29423824173210122, -0.74003518668370272, -1.6161992336951192, -1.5357935460809593, -1.3642007878216427, -1.5169157844507262, -1.4332006785118279, -1.6301578422923491, -1.932677889629856, -1.8694842425148879, -1.8503084663080056, -0.59040483751417916, -0.65601747033471336, -0.40132058236311047, -0.31836783196552787, -0.32035624605031593, -0.22965854401457814, -0.082000200083028219, -0.089025163302698024, -0.064732391018913552, -0.30366967948051288, -0.4730230160625184, -0.37970560392275871, -0.19430407325814622, -0.1797093251603995, -0.063069709957271444, -0.10088329756370083, -0.097060879184794432, -0.18018565146479387, -0.19830827357221226, -0.43479836723774673, 0.22038139379151372, -0.26457398838911428, -1.79452817569422, -2.2062031109308391, -2.102356658927595, -1.6930052820597257, -1.2756392437278008, -1.6712324532934884, -1.8237453905245253, -1.4884613952536252, -2.384654945418673, -1.5836466114968115, -1.4772075422260404, -0.74950958881152596, -0.561795414852579, -0.46670603976586306, -0.35555823460889052, -0.22514761090777982, -0.18963405157839525, -0.0068547033925124142, -0.051036689850529192, -0.53565359443295624, -0.48685989567066656, -0.57809021675862349, -0.39240983780018618, -0.11286619230167973, -0.12321821342876334, -0.089790022871127112, -0.13792125740417074, -0.16098142942852883, -0.30105748355308298, -0.18584599820379807, -0.75998936793718352, -0.8428129384777584, -2.1809972632688073, -2.8791053946930352, -2.5682454610054237, -2.0983496132652038, -2.219376425173226, -2.3602336858020396, -1.4129529949598048, -0.95341593939478875, -0.38769722219534936, -2.2603422126144772, -1.394644866167148, -0.77664281720103345, -0.64028425429629032, -0.41856090178724664, -0.3216120132349809, -0.33607304327303461, 0.065628582466230781, -0.098136330355478765, -0.44979914971695495, -0.82222257402878096, -0.39156143807433802, -0.36045886741397631, -0.29008721857562392, -0.035472107498135542, 0.027920290231535812, -0.117989151853845, -0.1892849156146684, -0.25489431004647656, -0.3625272253546275, -0.30143411016838906, -0.75242583405872021, -2.0271757806780628, -2.2639673745086539, -3.5383249085863659, -3.361597106712324, -2.3438802466919229, -1.7249706159518579, -1.7990472945779559, -3.3061472495599995, 0.21156442062862166, -0.74302378668934399, -1.8514918971041745, -0.82502198370632651, -0.74351999988260331, -0.39569215798819279, -0.3943138014933833, -0.29890408748686254, -0.28084584584372846, 0.01472791435408881, -0.04442075186168376, -0.53500016384583715, -0.90188577233528688, -0.69844971117515353, 0.14583567590324595, -0.5544445310046473, 0.1976534820339324, -0.18710828510427244, 0.0076800871037496377, -0.32808050503226982, -0.17511899827005836, -0.38519889843539723, -0.26116553014987143, -0.61792590829173255, -1.4260964500310052, -2.8480835086962002, -2.9656385065341997, -3.1259631743419583, -2.2776462897026373, -1.3820969331049018, -2.0505291279591713, -2.4084298023013879, -1.4996172161865962, 0.12372650763830863, -1.1981932989988076, -0.64588897407998824, -0.33546767337818667, -0.36301254306387043, -0.26196208085033179, -0.17675902360982099, 0.0055639281302357606, -0.034749316729180774, -0.44871907432473696, -0.67215259521100923, -0.46007833291523831, -0.67254330182605182, 0.11741827111366224, -0.409871486550618, -0.32892265898101625, -0.13145556961021479, -0.028899376452251727, -0.092298612924564649, -0.16672095020503341, -0.17646388464205828, -0.35131617290772521, -0.19150029104902661, -1.2217002325587201, -0.7866727441045076, -1.9807415717551959, -1.978633957921319, 0.069560471269209931], "bottom": {"real": [4103.3252596935745, 31959.928439656338, 10854.934870050551, 5174.7646941682715, 2670.3793024702013, 1512.8812431609856, 751.72119813508266, 487.34157279751093, 286.27976884850017, 202.21445228809756, 139.363320073941, 96.326676625874271, 67.416513392704019, 55.036039361563731, 42.617455049491909, 37.327841235406673, 35.198800209060273, 37.327841235406588, 42.617455049491802, 55.036039361563766, 67.416513392704019, 96.326676625874285, 139.36332007394108, 202.21445228809804, 286.27976884850017, 487.34157279751093, 751.72119813508289, 1512.8812431609856, 2670.3793024702018, 5174.7646941682751, 10854.934870050551, 31959.928439656363, 12454.694619943468, 7821.5833902765553, 5473.1790170642225, 2925.2286142376206, 1403.2127508507554, 917.05530556073552, 556.73350878905819, 335.58154911349368, 222.7562369115075, 161.71079893305554, 119.4497628246793, 75.609007514321249, 55.496087080936569, 43.998829489125107, 34.725029965122339, 29.983374804996487, 29.187336608781969, 30.714909872552553, 33.135728528562289, 38.780040560556557, 50.11926248444739, 62.426609296740132, 93.916765363567279, 123.96413175241418, 177.16967383039952, 250.50030243800805, 399.94920918463373, 596.1485322845399, 914.24633406931139, 1871.6210271277439, 4518.4223121248042, 13565.815861293135, 16084.742683461694, 10028.519769850123, 2736.2851033168113, 1377.4551350842332, 614.08174831750455, 382.39730464420114, 237.0105878631189, 156.24359018004319, 129.95938769710136, 95.53783206710068, 72.004092864891931, 47.804301653843083, 38.41781199466849, 32.452048622414502, 26.753427300507923, 23.772936248165699, 23.138404805980134, 23.598476471031617, 24.755859033283485, 28.713323989162731, 33.395537201677122, 40.850586549891439, 58.649881806718739, 74.872968711973769, 93.465129226367807, 123.19419955144703, 174.75706127058839, 262.71291650117263, 321.82068054258934, 657.05253635266399, 2163.5932265202309, 10212.960963472207, 3792.0213246064613, 2759.3366542985627, 1627.1011647050395, 788.44977202016776, 362.8509317865861, 253.90720770691448, 163.04342130809295, 117.95146004773997, 90.766106703902594, 66.207745096840526, 48.204553381452804, 35.429206551568903, 28.049881805648454, 23.25027473117818, 20.778936642061399, 19.004228801577, 17.585642163629327, 17.698181326434501, 18.806836162280465, 20.329571180523736, 23.456998427374465, 27.472702254518477, 37.193120035742723, 49.117252584083957, 59.574829012615233, 73.59994664128709, 112.97176733843995, 181.91972084309376, 284.0343016488693, 486.29648203694052, 857.05287855361007, 2037.977143592303, 2057.7285052573056, 2152.5952706253152, 1395.1090523951752, 736.25297680000074, 343.98700964912916, 189.68478304615005, 127.37774106216496, 91.12789293157843, 73.667255133763959, 55.964360327653644, 39.482567042532949, 28.14219415335706, 21.278934963706885, 18.193385040510105, 16.473354788100497, 15.086583853495943, 14.403945056404867, 14.533202056236952, 15.306988390608382, 16.092687824041843, 18.097466979870337, 20.289280537832838, 26.201109009342694, 34.023571220637564, 41.620492531599325, 50.685682074964014, 82.560701981631325, 127.19888958323958, 237.89761616945128, 410.06312322518994, 1062.2303232610248, 1612.0404058137353, 2295.1409914972487, 1787.3905923922546, 1192.2295048012345, 614.24882525880628, 260.82616895243024, 126.23242010647614, 84.151076288810984, 67.709414992782712, 60.122571559472298, 42.830591238304876, 28.733103940874788, 20.365121706656215, 16.211112474155353, 14.072758594539286, 13.483685068827034, 12.859628868618824, 11.868475605254234, 11.903201306554562, 12.816996745648828, 13.065794209061782, 14.312459824747068, 16.296926608708432, 20.657711991677495, 27.653390070235432, 33.593110413967857, 40.672720076575544, 55.856624618502167, 103.16047843117397, 179.23484372919035, 453.7513605151255, 902.26285048256875, 1683.7179352249004, 1784.083505146898, 1577.4265763170067, 936.66309122894188, 441.20892337587179, 176.43359667751182, 98.093971741535682, 65.995944695036641, 53.240295707495449, 45.85166507919449, 32.407485359783081, 22.496202298890402, 16.965613714417799, 13.731573445856062, 12.28236966845588, 11.747735381447885, 11.213125876643861, 10.807806034266576, 10.840341477375139, 11.066245600125107, 11.119452781179984, 12.424913044930788, 14.610027556462221, 16.887227742677396, 22.29462391228396, 27.978157381323118, 31.991250392971789, 44.052658881876532, 76.109568327798371, 159.13944268405785, 318.39207128278571, 686.00323178071869, 1336.6568589814267, 1043.0649603599104, 984.78746182807288, 618.0395600950327, 289.32426118556657, 132.98214831862998, 71.520048430881175, 52.57629039600819, 41.525598741467476, 33.633912722813989, 27.031255662449681, 19.489513580793098, 14.812681614273632, 12.21137274400836, 10.893625186679536, 10.482989068673637, 10.105487112246305, 9.7116899243817354, 9.9488069804828818, 10.161347795217756, 10.513274350469635, 11.294150924355744, 12.914730156139361, 14.478861048855546, 19.021661277112585, 23.907610167423496, 27.23573455134931, 38.742976413983023, 62.869223125902629, 111.92503010834605, 213.21062569137553, 433.61330953226366, 726.70269845820769, 562.21861410525219, 539.290746631297, 362.9446461846826, 211.46669660189423, 107.79772661917396, 60.676668375567573, 41.743276533116536, 34.42369696468284, 31.26708433258414, 25.313030406949355, 18.452791878453507, 13.956644256748325, 11.043046695375654, 10.111101652499672, 9.4550360444473061, 9.2429593469396529, 8.9521911222399257, 9.2321124164010211, 9.1908041669169815, 9.5662827353227868, 10.506864865879585, 11.825879962774797, 13.52813582962821, 15.999059082232355, 19.794027285196304, 22.478845287715099, 32.163272384867753, 47.951984523863096, 81.309242866655126, 150.93744536633105, 263.84630525991662, 439.27951033199258, 309.78719189559973, 306.63257299287005, 244.19689848939953, 151.98869039704036, 91.330482004276163, 57.352753322013349, 38.709160706067429, 33.087086449001383, 29.826655436967027, 23.987725148031473, 16.89184234468231, 13.041947079601194, 10.535809562752126, 9.5359471621683909, 8.9374483496855426, 8.5672643122912326, 8.4572735895659434, 8.4602804400971099, 8.5543457526330293, 9.3823763336699937, 10.377230417708629, 11.799673812944503, 12.361176855966248, 14.786798351390814, 16.739331260686697, 20.590148031359199, 25.753571174908508, 38.382893067866803, 63.23013835373618, 105.62437218489313, 175.68359833526657, 256.05708017959813, 224.80770864957879, 228.96753655549054, 172.54966320095522, 116.26546821946491, 80.46990226978717, 53.844334876610212, 37.483534347728245, 31.075867215997253, 26.284110672635684, 20.645029038002825, 15.025930043703783, 11.738276392873866, 10.201438772469425, 8.8203445227279982, 8.4945509856995365, 8.1968728409344909, 8.1790777304419588, 7.908377156922052, 8.6785477295074038, 9.6473715156890378, 10.339435934253908, 10.728035799158873, 11.983620383388951, 13.687783504221503, 16.433795900162693, 18.309125668572698, 22.485075799802843, 31.764684376383052, 49.270779583367755, 77.729851956279916, 123.50059845139852, 179.77043479461938, 159.57955623939222, 154.53329869380329, 127.96891349444883, 91.96783661678981, 66.921744646417011, 48.818287955893446, 36.591061653526779, 27.834277069623926, 23.041902152181589, 18.358713894245302, 13.567338391039883, 11.281789781943191, 9.6038295455647198, 8.7333277563772516, 8.338123667351045, 7.8992088061869676, 7.7104322426775909, 7.9983869985641034, 8.5436438490902269, 9.4432158844800043, 9.7870344410918424, 10.423788563863184, 11.253535869282553, 13.327727562718719, 15.178485067808285, 17.337135682195893, 21.668177060872456, 29.324826866357235, 41.492753218636352, 60.042185621507166, 90.318134916215342, 130.8805255687621, 104.24612656823803, 108.8028525877362, 89.555745560157249, 69.785669575239666, 56.746590174428, 44.171218069814536, 32.39838941697333, 25.182252759236459, 21.610810960419155, 16.972539478480535, 13.238333358456819, 10.614964653675054, 9.3806927946307859, 8.7492814832421075, 8.135298996501481, 7.634398163782139, 7.4852869889479292, 7.8316993609624435, 8.3853957415274643, 9.2315742305614634, 9.8389441629514209, 10.386606043801919, 11.354519695989614, 13.10793814373473, 15.240615596988986, 17.58979203150065, 21.461767190818147, 26.661531554562984, 36.123337028978582, 50.320731869274383, 69.065609719997795, 87.442260857354199, 76.677643276575949, 72.689147636714068, 65.50785565022079, 58.297658406357961, 49.558598741148941, 39.192968104211104, 29.954333787314212, 23.9458863540046, 19.99476230299754, 16.735792774046942, 12.901585018586687, 10.289994503175569, 9.3977765822679924, 8.6704196287803228, 7.8828328381527575, 7.5341478839019471, 7.4312929200041102, 7.7985159766257679, 8.1869060912414078, 9.142118635191288, 9.830770779287306, 10.340589147553608, 11.281171263863113, 12.984935438318947, 15.107976469419242, 18.19770629294057, 20.668346478928893, 25.761496132514932, 32.251424266134499, 39.95295492008993, 51.369438078625848, 65.569299562662465, 55.468849468729523, 55.86542097352833, 55.101138782973663, 50.531848368674723, 43.701470536966781, 35.866381440857431, 28.439396618258566, 22.42863349391925, 18.945030358082761, 15.596977301337661, 12.206893729284205, 10.050508612628137, 9.5473939482322869, 8.6463276280830179, 7.910774588392556, 7.2755514089661562, 7.5482842032534565, 7.5443879419641391, 7.9636187803325598, 8.9922015447577355, 9.6351997849989068, 10.0402383165895, 11.706284711344862, 13.336194440398188, 15.639893484781382, 17.791763978880017, 20.83131115781941, 25.6818621728188, 31.387128642704546, 37.143166049555219, 44.038766386780296, 52.904506937405849, 48.059389050535145, 50.072432061388255, 49.115010315515249, 44.160423468831148, 38.440953181308423, 32.35840674752788, 26.251111011761232, 21.081922570464979, 17.515101530242855, 14.10261621013594, 11.438986216849498, 10.422223192105227, 9.76207732514108, 8.7746319169344158, 7.5939451837729885, 7.2605949806802883, 7.4766919496025244, 7.419064545103371, 8.0187357229163059, 8.9266344512172839, 9.6975643711848107, 10.35689464395745, 11.451859179394017, 13.10319606057651, 15.460942026724263, 18.825021564083144, 22.773162722002358, 26.906890973713775, 31.803276985208164, 37.82902190094245, 42.388788349798304, 44.620105679799558, 48.859277780953818, 46.136110292205181, 41.908361785717766, 39.521022744549988, 35.052294933716347, 29.181343166303421, 23.802472557875006, 19.955746539759069, 16.22743816874862, 13.086681034223906, 11.226909204888067, 10.616041272149978, 9.8385492842648201, 8.6563005846195669, 7.8952678290472065, 7.2762149925656852, 7.3094046208482961, 7.276214992565686, 7.8952678290472083, 8.656300584619574, 9.8385492842648219, 10.616041272149991, 11.226909204888063, 13.086681034223904, 16.22743816874862, 19.955746539759044, 23.802472557874989, 29.181343166303414, 35.052294933716361, 39.521022744549988, 41.908361785717766, 46.136110292205167, 48.059389050535053, 44.620105679799494, 42.388788349798226, 37.82902190094255, 31.803276985208186, 26.906890973713825, 22.773162722002368, 18.825021564083173, 15.460942026724263, 13.103196060576508, 11.451859179394024, 10.356894643957441, 9.6975643711848196, 8.9266344512172751, 8.0187357229163005, 7.4190645451033674, 7.4766919496025226, 7.2605949806802919, 7.5939451837729957, 8.7746319169344176, 9.7620773251410817, 10.42222319210523, 11.438986216849505, 14.102616210135931, 17.515101530242841, 21.081922570464972, 26.251111011761218, 32.358406747527845, 38.44095318130838, 44.160423468831063, 49.115010315515164, 50.072432061388007, 55.468849468729232, 52.90450693740565, 44.038766386780239, 37.143166049555234, 31.387128642704567, 25.681862172818796, 20.831311157819414, 17.79176397888002, 15.639893484781378, 13.336194440398192, 11.706284711344864, 10.040238316589498, 9.6351997849989122, 8.9922015447577301, 7.9636187803325527, 7.5443879419641293, 7.5482842032534556, 7.2755514089661553, 7.9107745883925578, 8.6463276280830215, 9.5473939482322869, 10.050508612628141, 12.206893729284213, 15.596977301337661, 18.945030358082761, 22.428633493919239, 28.439396618258566, 35.866381440857388, 43.70147053696676, 50.531848368674645, 55.101138782973628, 55.865420973528131, 76.677643276575822, 65.569299562662337, 51.369438078625784, 39.952954920090001, 32.251424266134514, 25.761496132514949, 20.668346478928903, 18.19770629294057, 15.107976469419244, 12.984935438318949, 11.28117126386311, 10.340589147553612, 9.8307707792872954, 9.1421186351912915, 8.1869060912414096, 7.7985159766257599, 7.4312929200041067, 7.5341478839019365, 7.882832838152761, 8.6704196287803175, 9.3977765822679942, 10.289994503175565, 12.901585018586699, 16.735792774046928, 19.99476230299755, 23.945886354004585, 29.954333787314209, 39.19296810421109, 49.55859874114887, 58.297658406357826, 65.507855650220662, 72.689147636713827, 104.24612656823788, 87.442260857354213, 69.065609719997752, 50.320731869274368, 36.123337028978554, 26.661531554563005, 21.461767190818144, 17.589792031500657, 15.24061559698899, 13.107938143734735, 11.354519695989618, 10.386606043801917, 9.8389441629514156, 9.2315742305614528, 8.3853957415274607, 7.8316993609624372, 7.4852869889479301, 7.6343981637821372, 8.1352989965014757, 8.7492814832421111, 9.3806927946307876, 10.614964653675061, 13.238333358456819, 16.972539478480542, 21.610810960419155, 25.182252759236462, 32.39838941697333, 44.171218069814465, 56.746590174427972, 69.785669575239609, 89.555745560157177, 108.80285258773613, 159.57955623939191, 130.8805255687619, 90.318134916215342, 60.042185621507201, 41.492753218636388, 29.32482686635726, 21.668177060872456, 17.3371356821959, 15.178485067808294, 13.327727562718726, 11.253535869282553, 10.423788563863175, 9.7870344410918424, 9.4432158844800025, 8.5436438490902233, 7.9983869985640963, 7.7104322426775891, 7.8992088061869596, 8.338123667351045, 8.7333277563772533, 9.6038295455647145, 11.281789781943189, 13.567338391039879, 18.358713894245295, 23.041902152181613, 27.834277069623926, 36.591061653526772, 48.818287955893382, 66.921744646416983, 91.967836616789555, 127.96891349444861, 154.53329869380323, 224.80770864957842, 179.77043479461912, 123.50059845139837, 77.729851956279958, 49.27077958336772, 31.764684376383045, 22.485075799802868, 18.309125668572733, 16.433795900162703, 13.6877835042215, 11.983620383388955, 10.72803579915886, 10.339435934253904, 9.6473715156890254, 8.6785477295073967, 7.9083771569220449, 8.1790777304419553, 8.1968728409344909, 8.4945509856995347, 8.8203445227279857, 10.201438772469423, 11.738276392873869, 15.02593004370379, 20.645029038002832, 26.284110672635681, 31.075867215997253, 37.483534347728245, 53.844334876610127, 80.46990226978717, 116.26546821946468, 172.54966320095502, 228.96753655548974, 309.78719189559854, 256.05708017959756, 175.68359833526623, 105.62437218489312, 63.230138353736059, 38.382893067866796, 25.753571174908501, 20.590148031359234, 16.739331260686704, 14.786798351390802, 12.361176855966249, 11.799673812944498, 10.377230417708628, 9.3823763336699955, 8.5543457526330204, 8.4602804400970992, 8.4572735895659417, 8.567264312291222, 8.9374483496855408, 9.5359471621683873, 10.535809562752121, 13.041947079601202, 16.891842344682331, 23.987725148031487, 29.826655436966995, 33.087086449001376, 38.709160706067401, 57.35275332201325, 91.33048200427605, 151.98869039703999, 244.19689848939879, 306.63257299286875, 562.21861410525219, 439.27951033199281, 263.84630525991662, 150.93744536633125, 81.309242866655154, 47.951984523863167, 32.163272384867753, 22.478845287715121, 19.794027285196304, 15.999059082232373, 13.528135829628219, 11.82587996277479, 10.50686486587958, 9.5662827353227868, 9.190804166916978, 9.2321124164010211, 8.9521911222399257, 9.2429593469396458, 9.4550360444473043, 10.111101652499666, 11.043046695375656, 13.956644256748326, 18.452791878453535, 25.313030406949409, 31.26708433258414, 34.423696964682833, 41.743276533116529, 60.676668375567509, 107.79772661917396, 211.46669660189391, 362.94464618468271, 539.29074663129688, 1043.064960359907, 726.70269845820621, 433.61330953226252, 213.21062569137561, 111.92503010834588, 62.869223125902685, 38.742976413983001, 27.235734551349324, 23.907610167423499, 19.021661277112635, 14.478861048855546, 12.91473015613936, 11.29415092435573, 10.513274350469626, 10.161347795217747, 9.9488069804828747, 9.7116899243817407, 10.105487112246305, 10.48298906867363, 10.893625186679529, 12.211372744008356, 14.812681614273641, 19.489513580793123, 27.031255662449723, 33.633912722813953, 41.52559874146754, 52.576290396008147, 71.520048430881019, 132.98214831862995, 289.32426118556515, 618.03956009503077, 984.7874618280689, 1784.0835051468939, 1336.6568589814267, 686.00323178071801, 318.39207128278593, 159.1394426840578, 76.109568327798428, 44.05265888187656, 31.991250392971853, 27.978157381323108, 22.294623912284028, 16.8872277426774, 14.610027556462216, 12.424913044930783, 11.119452781179971, 11.066245600125109, 10.840341477375128, 10.807806034266576, 11.213125876643852, 11.747735381447885, 12.282369668455885, 13.731573445856061, 16.965613714417831, 22.496202298890438, 32.407485359783124, 45.85166507919449, 53.24029570749542, 65.99594469503667, 98.093971741535469, 176.43359667751176, 441.208923375871, 936.66309122894131, 1577.4265763170022, 2295.1409914972464, 1683.7179352249, 902.26285048256875, 453.75136051512629, 179.23484372919026, 103.16047843117398, 55.856624618502074, 40.67272007657553, 33.59311041396785, 27.653390070235471, 20.65771199167747, 16.296926608708404, 14.312459824747059, 13.065794209061782, 12.816996745648842, 11.903201306554557, 11.868475605254236, 12.859628868618808, 13.483685068827036, 14.072758594539282, 16.21111247415536, 20.365121706656261, 28.733103940874788, 42.830591238304876, 60.122571559472277, 67.709414992782641, 84.151076288810941, 126.23242010647601, 260.82616895243001, 614.24882525880446, 1192.2295048012338, 1787.3905923922525, 2057.7285052573061, 1612.0404058137367, 1062.2303232610243, 410.06312322519068, 237.89761616945111, 127.19888958323968, 82.560701981631325, 50.685682074964042, 41.620492531599325, 34.023571220637599, 26.201109009342684, 20.289280537832823, 18.09746697987034, 16.092687824041846, 15.306988390608383, 14.533202056236956, 14.40394505640487, 15.086583853495929, 16.47335478810048, 18.193385040510101, 21.278934963706888, 28.142194153357082, 39.482567042533006, 55.964360327653644, 73.667255133763959, 91.127892931578486, 127.37774106216477, 189.68478304614982, 343.98700964912905, 736.25297679999983, 1395.1090523951759, 2152.5952706253147, 3792.0213246064582, 2037.977143592301, 857.05287855360893, 486.29648203694126, 284.03430164886925, 181.91972084309373, 112.97176733844, 73.599946641287119, 59.574829012615204, 49.117252584084042, 37.193120035742723, 27.472702254518456, 23.456998427374469, 20.329571180523697, 18.806836162280476, 17.698181326434526, 17.585642163629327, 19.004228801577025, 20.77893664206141, 23.250274731178163, 28.04988180564844, 35.429206551568925, 48.204553381452833, 66.207745096840512, 90.766106703902594, 117.95146004774013, 163.04342130809306, 253.90720770691391, 362.85093178658599, 788.44977202016594, 1627.1011647050398, 2759.3366542985605, 16084.742683461691, 10212.960963472211, 2163.5932265202296, 657.05253635266433, 321.82068054258923, 262.71291650117286, 174.75706127058845, 123.19419955144714, 93.465129226367836, 74.87296871197394, 58.649881806718732, 40.850586549891496, 33.395537201677108, 28.713323989162756, 24.755859033283489, 23.59847647103166, 23.138404805980127, 23.77293624816566, 26.753427300507926, 32.452048622414509, 38.417811994668497, 47.804301653843162, 72.004092864892002, 95.537832067100879, 129.95938769710136, 156.24359018004333, 237.01058786311899, 382.39730464420052, 614.08174831750478, 1377.4551350842296, 2736.2851033168104, 10028.51976985012, 12454.694619943462, 13565.815861293133, 4518.4223121248006, 1871.6210271277425, 914.24633406931184, 596.14853228454001, 399.94920918463339, 250.50030243800833, 177.16967383039946, 123.96413175241405, 93.91676536356745, 62.426609296740118, 50.119262484447404, 38.780040560556571, 33.135728528562332, 30.714909872552628, 29.187336608781973, 29.983374804996448, 34.725029965122346, 43.998829489125086, 55.496087080936618, 75.609007514321277, 119.44976282467937, 161.7107989330556, 222.75623691150756, 335.58154911349339, 556.73350878905831, 917.05530556073529, 1403.2127508507556, 2925.2286142376206, 5473.1790170642225, 7821.5833902765453], "imag": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, "imag": [0.0, 1.2364045139795619, -1.417097645517349, -0.56399113050110405, 0.44612204752934542, -0.22857396866743723, -0.12233724123958876, -0.22175063370253431, -0.081847654478992143, -0.082144528420219798, -0.016319194688300422, -0.22782269816808789, -0.31553723757062957, -0.34627737582788948, 1.2289873494343531, 0.23714731979244019, 0.0, -0.23714731979246589, -1.2289873494343397, 0.34627737582788415, 0.31553723757063035, 0.2278226981680877, 0.01631919468830003, 0.082144528420217924, 0.081847654478992143, 0.22175063370252604, 0.12233724123959235, 0.22857396866743548, -0.4461220475293452, 0.56399113050110417, 1.4170976455173483, -1.2364045139795607, 1.3606412475160685, 1.4411916754234004, -0.33639737707180672, -0.40059289889731398, 0.077869450453742065, 0.11933000679564014, -0.37020072416606636, -0.12600631152419078, -0.29291723130603109, -0.050683391882318747, -0.2123566898458312, -0.16517843825664788, -0.37438920939802389, 0.24863698196016526, 0.3956337373323095, 0.63308466384569972, -0.42643957249522613, -0.28749903579454716, -0.42301568032975828, 0.27971623762695519, 0.37808744252168813, 0.15296582393741001, 0.10558339349178479, 0.088135922159038316, 0.16705843369252343, 0.44192642538865684, 0.29915225181421068, -0.047649837051313024, -0.91046045526812369, 2.0668504460046964, 1.0236217631956717, 0.095775027331123308, 0.74327388531916394, -0.034562131954570079, 0.86361123753821734, 0.14688086473050152, -0.48040960369964397, 0.72553155869356101, -0.87865322612555963, -0.4386512882244577, -0.48573187070285989, -0.32017932907631874, -0.2830749986604581, -0.26990648117356825, 0.02650526715020339, 0.070485969368273949, 0.54370981678608021, -0.067938463814195812, 0.03776680164210118, -0.5672727000472354, 0.70317235961628322, -0.021133356436660328, 0.38778419454697149, -0.021237638325898506, 0.22272564345822293, -0.028529610958430065, 0.38389116569218468, 0.54015192300945081, 0.60890484535134959, -0.58851980199844323, -0.44257995715790832, -0.31054780878465871, 0.29452233058397137, 1.4203730522981519, 0.55042973333868539, 1.0635980503754177, -0.33223282315731317, 0.34444399750770754, 1.4812987845914649, 0.28203486996779931, -0.50640814880924923, -0.63152717265524028, -0.629560147993244, -0.38143909917016799, -0.26024004494781861, -0.19111004712688462, -0.0074049384249937926, 0.048145781851611912, 0.1775395908501845, -0.010766872600667563, -0.30557543109041663, -0.12790446781789691, 0.26497067484017217, 0.49718432792560446, 0.10847923107858634, 0.18362798444374009, 0.075793328725680426, 0.060915837919074359, 0.19352569039908019, 0.72484131059467238, 0.44769863619371908, 0.65727781823869813, -2.7705947112358387, -1.8545676439466314, 1.2534804319442749, -0.33201271766592177, -0.88179245186152566, -0.49191197464707653, 0.25061306335904526, 0.36434278784189494, 1.1059306596340364, 0.5161851914994362, -0.56259342729123341, -0.79818525223670012, -0.50614275317411506, -0.33450192958610769, -0.24220392956380443, -0.29363217368931438, -0.008975674876931768, 0.015702042401798396, 0.0043287613096781611, 0.11769772351691517, 0.14847974776257877, -0.070404205425901215, 0.15992872157624444, 0.12352253662711207, 0.22950814490677918, 0.17507285276321555, 0.13747467644410705, -0.011397583876153142, 0.1103654239578318, 0.24404333943616102, 1.1434123865171273, -0.60566186502851971, -1.3365493166122577, -1.1338250057068979, -1.8155993788135394, -1.0591766157447149, -0.69010247253016843, -0.46612626705839738, -0.20353239335470796, 0.51663850122650623, 0.2659701357580968, -0.10657803670351902, -0.69730138646619577, -0.60106744735123385, -0.33542800506255299, -0.30564289179799509, -0.26672832014897818, -0.19552146385155383, -0.070818253229817343, 0.24716165183995586, 0.24871001073085031, 0.087906272749659523, -0.066392764898707615, 0.11463822183417864, -0.097387114548935505, 0.203187369929616, 0.14292038700683402, 0.20736891492564988, 0.013685307258532538, -0.024371827339033106, -0.07233585420108031, 0.49291782026044645, 0.048917424863979306, 0.2263553910474094, 0.10839909954530379, -1.1957108711898896, -1.074771579950879, -1.1175823884839045, -0.23901621577757862, -0.12877260884038383, 0.23623861798820722, 0.17111767858219226, 0.46208690546761177, -0.23679486634226876, -0.53178862418379869, -0.34021620386249335, -0.23658495591681358, -0.22275756609764855, -0.20572232603908905, -0.14494733127712761, 0.042569660785953992, 0.077733070765218709, 0.20558191361174552, 0.031719635617051253, -0.031869312918226284, 0.0092446671691655703, 0.056907964871031128, 0.0068114015565279478, 0.20608602740074444, 0.023033890597355222, 0.064944626021130644, -0.089711600875347838, 0.051877409795188095, -0.22207073062343796, 0.24248276916859771, 0.82932242402320455, -0.0013771249391571728, -0.059139017637367147, -0.22067925957890699, -0.040068334939789486, 0.30677005181582889, 0.34490255487274107, 0.22221882441368751, 0.30818729583490434, 0.041656273199714877, 0.04389672863559383, -0.30032839778423015, -0.24246246508902861, -0.17809969240648099, -0.14126159805998126, -0.15553553242798068, -0.11510723629505018, 0.024565620333015844, 0.099324973861333238, 0.11314958231531824, 0.10920785431914558, -0.0027478677647314949, -0.002197448124614016, -0.069940656171551499, 0.14656177726216579, 0.078770189361086429, 0.10241250352514093, -0.021646587213105684, 0.019211160710794505, -0.26281055993233693, -0.055146819140509458, 0.35375643597531126, 0.22411418130009836, 0.3875457037899096, 0.25423051056794166, 0.30581901500051717, 0.085911462662090085, 0.39107302489471046, 0.24699055160378858, 0.29387297238508514, 0.15373347718831995, -0.002984582508486469, -0.017260207971634491, 0.072827255227658205, -0.062089135258224848, -0.11929552297831249, -0.14454547803177953, -0.095268264507681985, -0.10089614648569632, 0.048761457544342565, 0.09609679137720413, 0.10529567915508571, 0.012037966893712556, 0.076343100588013288, -0.20546035926376272, 0.13459193297647368, 0.025732944443593878, 0.15693288111736364, 0.043761647973181578, 0.083479299629684353, -0.15251693996845875, -0.10657849804550705, 0.038641816351084518, -0.10231188547257405, 0.21957600785318707, 0.264774413728534, 0.35686545376814865, 0.29428485506006929, 0.49934135456989248, 0.18285689914378289, 0.23675610338446562, 0.10353827744151976, 0.063107949091445251, 0.03846587209017991, 0.13661717625997899, 0.098122755354854277, -0.0039906200934582137, -0.09009439550122221, -0.16647262366552176, -0.19237746196753996, 0.026647194061990561, 0.048509383863749068, 0.1654716680991411, -0.035914795239386038, 0.099273739290017232, -0.11264804489487676, 0.14792025966567318, -0.093791526140286519, 0.10021979561886898, 0.0080449729031339574, 0.25399382193861558, -0.10951630791791984, -0.033548122233328939, -0.024275040060575473, -0.15565555640319179, -0.035231426543991154, 0.063485173587351437, 0.22814734409189322, 0.10684932807789806, 0.2355554633425988, 0.10407564589066262, 0.015525256999673128, -0.011913601076877599, -0.0039295920043740662, 0.044701593559494178, 0.16547295203389104, 0.15907957720488838, 0.074664630781852093, -0.04243906497357175, -0.11246394245376416, -0.16972427151540079, -0.21530290856092721, -0.15195750501651711, 0.40553391670472716, -0.05507255324487554, 0.18488826926783164, -0.03502892748503212, 0.37001387119519319, -0.15325722566754377, 0.27168929694820759, -0.059701216280397838, 0.48380889084850937, -0.13017614472815323, 0.047673421329954523, 0.071305584258896423, -0.15733503034508964, -0.079593566039511662, -0.075485820780456944, 0.06620598245919887, -0.0012785498169557718, 0.063827392702187832, -0.0024400785561267094, 0.050942947866382475, -0.16777938781510365, -0.092876049496631446, -0.010378011540593757, 0.1594331602275639, 0.19523869399925237, 0.18464942262011227, 0.063285121982437173, -0.077221658551183223, -0.1491589460269398, -0.17912928670535297, -0.11490318286815507, -0.11189726101521234, -0.20487634390276235, 0.76498375921014561, -0.23800865420158882, 0.74083633586796371, -0.083846748018997191, 0.46372256496136105, -0.16834959597660981, 0.80860396068755125, -0.25555617026146216, 0.19463913189037535, 0.30097794980879877, -0.16302064990391507, -0.10690976611351247, -0.13497815095121923, -0.049772201284698683, -0.079451894223961053, 0.040407604161455342, -0.09194915079908203, -0.14731166465811507, -0.26499922119954511, -0.15560186997026057, -0.069496867327866862, 0.16530147427910571, 0.22324548858793775, 0.26718136730575287, 0.19166419512490171, 0.060936923017668537, -0.088626234734120041, -0.14658150061325853, -0.15988330961851069, -0.18630425886720847, 0.20226767939927157, -0.086142375874942501, -0.77766311308853053, 1.4090153420038987, -0.3038886842868152, 1.2888777036518135, -0.074470758177722834, 1.2482190395029773, -0.80123249840125998, 0.47055407026248136, 0.75577199845745624, -0.11037652666672627, -0.054458369263067428, -0.19918107544886771, -0.10899116252888987, -0.15332031366957818, 0.043654486348545761, -0.022154991408309264, -0.15239448898889341, -0.19372066727324463, -0.023769000914279543, 0.24457812931884867, 0.51722906014629877, 0.4305115414461968, 0.4535547011943914, 0.3493581281435395, 0.21076698450898321, 0.063956239140020049, -0.043266091906771414, -0.12307402164456596, -0.17588597679362872, -0.057160335632577657, -0.0784239564694168, 0.14377922602722487, -0.28610637890062873, -1.3867297053543113, 2.7076021550256568, -0.12637740826622818, 2.0046873376560574, -1.442367549533677, 0.41516901914168741, 1.1637625900709285, 0.02187980097289477, 0.2119473473283329, -0.11885489129254229, -0.1159981397382039, -0.18899269201836941, -0.058557612447368006, -0.043992442353640485, -0.026879139952720663, -0.019298206516241499, 0.11425895652801879, -0.10204731321609413, 1.0976378910336273, 0.78083298172023552, 0.7892686156410853, 0.65585934200294294, 0.41963945036689065, 0.21495377802894691, 0.10907743849349204, -0.015003791740152183, -0.098108352324783196, -0.099983461914768382, -0.14074054993981988, -0.049222223079134708, -0.60225632344115432, 0.14822551318702831, -0.20779420774376042, -2.0348285284263787, 4.0251861194251459, -2.7420491756647705, 0.80731183784095106, 1.5256751899261984, -0.015777910213839702, 0.56481061463658855, 0.094745090670160736, 0.032305441115857418, -0.15496296066268442, -0.070898922964745509, -0.15185446167165811, -0.099013378837322308, -0.033839198092832617, 0.20170996830425536, 0.31395340400286426, 0.91804938453195506, 0.90837480132247328, 1.1212514777242175, 0.8111537128593137, 0.65461252772518352, 0.44812018281017851, 0.29338133862249183, 0.080942506543726575, -0.0048876135806632161, -0.042045437831147933, -0.048279129686226115, -0.13748504879992385, -0.22867414001479172, -0.65206021382919555, -1.4414816884582773, 0.34900156189272369, 1.2663064061664397, -4.4519069438082273, 2.3981175155339263, 2.0366543361516527, -0.11574419894478603, 0.9938253915317542, 0.40253059498542132, 0.29787521235777348, -0.048128801274628118, 0.001834095689180732, -0.063578064856638958, -0.14911097873279969, -0.17638384543546787, -0.15061392115741762, -0.13638564133647435, 0.3292785127452974, 0.45646012748955422, 0.0, -0.098380202448484569, 0.2889284460821786, 0.39981384774007012, 0.45036129401449043, 0.22152969012775114, 0.11073273247786891, 0.024117745722163984, -0.0050280129542534689, -0.087106960572679512, -0.083653448195472838, -0.51521426958714545, -0.86124262209127589, -0.78939851130304506, -0.74423225935393889, -1.1208061672534484, 0.0, 1.1208061672534437, 0.74423225935393811, 0.78939851130304262, 0.86124262209127656, 0.51521426958714389, 0.083653448195472491, 0.087106960572679332, 0.0050280129542534689, -0.02411774572216354, -0.11073273247786865, -0.22152969012775126, -0.45036129401449054, -0.39981384774006945, -0.28892844608217838, 0.098380202448484236, -0.90837480132241455, -0.45646012748952708, -0.32927851274525655, 0.13638564133649642, 0.15061392115742586, 0.17638384543547556, 0.14911097873280194, 0.063578064856639402, -0.0018340956891807838, 0.048128801274627743, -0.29787521235777292, -0.40253059498541977, -0.99382539153175098, 0.11574419894478773, -2.0366543361516536, -2.3981175155339201, 4.4519069438082379, -1.2663064061664346, -0.34900156189272086, 1.4414816884582851, 0.65206021382919577, 0.22867414001479336, 0.13748504879992438, 0.048279129686228148, 0.042045437831148495, 0.0048876135806649092, -0.08094250654372509, -0.29338133862248678, -0.44812018281017507, -0.6546125277251672, -0.81115371285928006, -1.1212514777241573, -1.0976378910335893, -0.91804938453192131, -0.31395340400284805, -0.20170996830424559, 0.033839198092839695, 0.09901337883732686, 0.1518544616716597, 0.070898922964745925, 0.15496296066268506, -0.032305441115858605, -0.09474509067015939, -0.56481061463658966, 0.01577791021384034, -1.5256751899262007, -0.80731183784094906, 2.7420491756647789, -4.0251861194251397, 2.0348285284263898, 0.20779420774376556, -0.14822551318702654, 0.60225632344115643, 0.049222223079135728, 0.14074054993982205, 0.099983461914770352, 0.098108352324783543, 0.015003791740153814, -0.10907743849349157, -0.21495377802894516, -0.41963945036688871, -0.65585934200294016, -0.78926861564106898, -0.78083298172020743, -0.24457812931883488, 0.10204731321609872, -0.11425895652800651, 0.019298206516249916, 0.026879139952725083, 0.04399244235364598, 0.058557612447370934, 0.18899269201837068, 0.11599813973820411, 0.11885489129254237, -0.21194734732833254, -0.021879800972893531, -1.1637625900709312, -0.4151690191416833, 1.4423675495336772, -2.0046873376560503, 0.12637740826623128, -2.7076021550256497, 1.3867297053543175, 0.28610637890063351, -0.14377922602722601, 0.078423956469422018, 0.057160335632579121, 0.1758859767936318, 0.12307402164456618, 0.043266091906772712, -0.063956239140019508, -0.21076698450897985, -0.34935812814353639, -0.45355470119438479, -0.43051154144618958, -0.51722906014628944, 0.15560186997025938, 0.02376900091427863, 0.1937206672732435, 0.15239448898889424, 0.022154991408310377, -0.043654486348542874, 0.15332031366958024, 0.10899116252889095, 0.19918107544886771, 0.054458369263066984, 0.11037652666672665, -0.75577199845745313, -0.47055407026248092, 0.80123249840126409, -1.2482190395029769, 0.074470758177730939, -1.2888777036518133, 0.30388868428682408, -1.4090153420038936, 0.77766311308853486, 0.086142375874943722, -0.20226767939927121, 0.18630425886721039, 0.15988330961851227, 0.14658150061325848, 0.088626234734120221, -0.060936923017667906, -0.19166419512490052, -0.26718136730575015, -0.22324548858793625, -0.16530147427910316, 0.069496867327866751, 0.16777938781510615, 0.26499922119954472, 0.14731166465811715, 0.091949150799082904, -0.040407604161453857, 0.07945189422396387, 0.049772201284700876, 0.13497815095122018, 0.10690976611351256, 0.16302064990391416, -0.30097794980879811, -0.19463913189037552, 0.25555617026146371, -0.80860396068754914, 0.16834959597661264, -0.46372256496135666, 0.083846748018996636, -0.7408363358679616, 0.23800865420159104, -0.76498375921014483, 0.20487634390276502, 0.11189726101521356, 0.11490318286815554, 0.17912928670535491, 0.14915894602693922, 0.077221658551183403, -0.063285121982436826, -0.18464942262010964, -0.19523869399925042, -0.15943316022756263, 0.01037801154059478, 0.09287604949663382, -0.015525256999667727, -0.050942947866376924, 0.0024400785561280833, -0.06382739270218761, 0.0012785498169549515, -0.066205982459197621, 0.075485820780458165, 0.079593566039511995, 0.1573350303450895, -0.071305584258897034, -0.047673421329955501, 0.13017614472815361, -0.48380889084851014, 0.05970121628039872, -0.27168929694820493, 0.1532572256675474, -0.37001387119519286, 0.035028927485033709, -0.18488826926782947, 0.055072553244877351, -0.40553391670472771, 0.15195750501651886, 0.21530290856092779, 0.16972427151540051, 0.11246394245376394, 0.042439064973571687, -0.07466463078185144, -0.159079577204887, -0.16547295203388937, -0.044701593559494109, 0.0039295920043746378, 0.011913601076878649, -0.18285689914377989, -0.10407564589066134, -0.23555546334259525, -0.10684932807789757, -0.22814734409189458, -0.063485173587349258, 0.035231426543992535, 0.15565555640319106, 0.02427504006057549, 0.033548122233326282, 0.10951630791791925, -0.25399382193861758, -0.0080449729031340841, -0.10021979561886678, 0.093791526140288961, -0.14792025966567243, 0.11264804489487593, -0.099273739290014568, 0.035914795239387988, -0.16547166809914049, -0.048509383863747611, -0.02664719406199113, 0.19237746196754099, 0.16647262366552154, 0.090094395501221572, 0.0039906200934596249, -0.098122755354853444, -0.1366171762599761, -0.038465872090180271, -0.063107949091446403, -0.10353827744152141, -0.2367561033844639, -0.39107302489471046, -0.4993413545698927, -0.29428485506006952, -0.35686545376814893, -0.26477441372853422, -0.21957600785318782, 0.10231188547257429, -0.038641816351083894, 0.10657849804550705, 0.15251693996845886, -0.083479299629685352, -0.043761647973181945, -0.1569328811173635, -0.025732944443590922, -0.13459193297646968, 0.2054603592637699, -0.076343100588013288, -0.012037966893705314, -0.10529567915508307, -0.096096791377201118, -0.048761457544342024, 0.10089614648569795, 0.095268264507682401, 0.14454547803178003, 0.11929552297831249, 0.062089135258225896, -0.072827255227657164, 0.017260207971635976, 0.0029845825084865137, -0.15373347718831978, -0.29387297238508514, -0.24699055160378858, -0.30677005181583211, -0.085911462662095636, -0.30581901500051922, -0.25423051056794305, -0.38754570378991321, -0.22411418130009808, -0.35375643597530843, 0.055146819140510416, 0.26281055993233621, -0.019211160710796572, 0.021646587213104713, -0.10241250352514171, -0.078770189361086179, -0.14656177726216213, 0.06994065617155748, 0.0021974481246246629, 0.002747867764730379, -0.10920785431913549, -0.11314958231531393, -0.099324973861329505, -0.024565620333014605, 0.11510723629505158, 0.15553553242798132, 0.1412615980599799, 0.1780996924064803, 0.24246246508902825, 0.30032839778422799, -0.043896728635589223, -0.041656273199716369, -0.30818729583490695, -0.22221882441369153, -0.34490255487274391, 0.23901621577757753, 0.040068334939789153, 0.22067925957890494, 0.059139017637366363, 0.0013771249391555669, -0.82932242402320322, -0.24248276916859551, 0.2220707306234446, -0.05187740979518813, 0.089711600875348782, -0.064944626021130755, -0.023033890597353883, -0.20608602740074317, -0.0068114015565181726, -0.056907964871020393, -0.0092446671691440163, 0.031869312918224861, -0.031719635617030659, -0.20558191361174011, -0.077733070765210868, -0.042569660785952056, 0.14494733127713064, 0.20572232603908944, 0.22275756609764749, 0.23658495591681294, 0.34021620386249518, 0.53178862418379935, 0.23679486634227159, -0.4620869054676115, -0.17111767858219507, -0.23623861798820922, 0.12877260884038208, 0.69010247253016699, 1.1175823884838996, 1.0747715799508781, 1.1957108711898863, -0.10839909954530788, -0.2263553910474054, -0.048917424863973949, -0.49291782026044056, 0.072335854201080588, 0.024371827339035017, -0.013685307258532536, -0.20736891492564691, -0.14292038700683141, -0.20318736992960118, 0.09738711454895084, -0.11463822183415182, 0.066392764898706338, -0.087906272749638886, -0.24871001073084317, -0.24716165183994784, 0.070818253229819925, 0.19552146385155544, 0.2667283201489779, 0.30564289179799059, 0.3354280050625516, 0.60106744735122974, 0.69730138646619622, 0.10657803670352221, -0.26597013575809814, -0.51663850122651156, 0.20353239335470413, 0.46612626705839527, 0.88179245186152555, 1.0591766157447142, 1.8155993788135401, 1.1338250057069015, 1.3365493166122591, 0.60566186502852537, -1.1434123865171271, -0.24404333943615408, -0.11036542395783162, 0.011397583876152599, -0.13747467644410641, -0.17507285276321236, -0.22950814490677501, -0.12352253662709391, -0.15992872157622667, 0.070404205425931329, -0.14847974776257952, -0.11769772351689584, -0.0043287613096706385, -0.01570204240179094, 0.0089756748769360926, 0.29363217368931571, 0.24220392956380496, 0.33450192958610414, 0.50614275317411517, 0.79818525223669812, 0.56259342729123207, -0.51618519149943443, -1.105930659634037, -0.36434278784189805, -0.25061306335904537, 0.49191197464707476, -0.55042973333868328, 0.33201271766592266, -1.2534804319442674, 1.8545676439466376, 2.7705947112358396, -0.65727781823869658, -0.44769863619371453, -0.72484131059467105, -0.19352569039907921, -0.06091583791907576, -0.075793328725683354, -0.18362798444373865, -0.10847923107858076, -0.4971843279255892, -0.26497067484015147, 0.12790446781792791, 0.30557543109041591, 0.010766872600696822, -0.17753959085018053, -0.04814578185160058, 0.007404938424997059, 0.19111004712688809, 0.26024004494781799, 0.38143909917016594, 0.62956014799324345, 0.63152717265524094, 0.50640814880924734, -0.28203486996779953, -1.481298784591466, -0.34444399750770943, 0.33223282315731145, -1.0635980503754157, -0.74327388531916416, -1.4203730522981521, -0.29452233058397176, 0.31054780878465887, 0.4425799571579111, 0.58851980199844711, -0.60890484535134703, -0.54015192300944392, -0.38389116569218451, 0.02852961095842791, -0.22272564345822352, 0.021237638325899852, -0.387784194546968, 0.021133356436687064, -0.70317235961626101, 0.56727270004732033, -0.037766801642101375, 0.06793846381428098, -0.54370981678606445, -0.070485969368251203, -0.02650526715020184, 0.26990648117357596, 0.2830749986604576, 0.32017932907632218, 0.48573187070286, 0.4386512882244713, 0.87865322612556163, -0.72553155869355623, 0.48040960369964236, -0.14688086473049994, -0.86361123753821778, 0.034562131954569586, -1.3606412475160699, -0.095775027331125598, -1.0236217631956728, -2.0668504460046977, 0.91046045526812469, 0.047649837051312177, -0.29915225181420874, -0.44192642538866073, -0.16705843369252318, -0.088135922159037081, -0.1055833934917848, -0.15296582393740679, -0.37808744252168625, -0.27971623762694292, 0.42301568032977793, 0.28749903579456393, 0.42643957249522774, -0.63308466384561635, -0.39563373733228846, -0.2486369819601503, 0.37438920939802361, 0.1651784382566546, 0.21235668984583117, 0.050683391882319691, 0.2929172313060312, 0.12600631152419559, 0.37020072416606892, -0.11933000679563836, -0.077869450453742661, 0.40059289889731342, 0.33639737707180556, -1.4411916754233998], "height": 32, "width": 32, "top": {"real": [6327.0074679827858, 12787.448651417644, -8580.1357782693794, -6564.4296251926053, 1064.8969915597925, -1614.7722808334524, -60.048119421842308, -221.12968025641604, -12.445754708845573, -62.940587713583341, 23.820578453457951, -28.525301748952867, 37.864280125154337, -85.844490405627994, 27.493814969643068, -48.151974443362732, 41.399660199307142, -48.151974443360345, 27.493814969642067, -85.844490405627866, 37.864280125154032, -28.525301748952689, 23.820578453458509, -62.940587713584037, -12.445754708845573, -221.12968025641445, -60.048119421842806, -1614.7722808334493, 1064.8969915597932, -6564.4296251926125, -8580.1357782693849, 12787.448651417659, -17213.595236981997, 544.07302669902936, -10829.417860945707, -5794.1219231083051, -1103.8692252742003, -1120.3666800727638, -106.61462896985108, -117.89522553300084, -39.308430893651213, -26.960578056534288, -11.025047422886351, -2.1850531713376355, -7.2952697383625882, -14.472211987615461, -14.23279965231924, 3.5205960317557246, -19.629747734378611, -14.131264529804582, -22.272265924680642, -17.401343902608428, -1.7416101263052008, 0.34733716754184635, -16.60063574625633, -32.47390190466588, -64.31481385096977, -84.034753639409303, -258.32278440436392, -714.30117659130417, 113.1165060355228, -2806.7151144576005, -10882.302955904926, -27817.100568112113, -27745.708494118069, -22841.420845008699, -8553.5264674688351, -4085.033989629072, -1748.9561003744159, -545.33543865452532, -146.45498278007594, -40.805440061891282, -50.060212982262158, -16.730489448484349, -23.62313915150434, 0.36714120063527833, -7.1882909197809326, 6.4142604093545659, -14.833291452397129, 3.4669422259569203, -16.161012153790594, -21.283130178011959, -13.244388638951026, -1.2754674400463286, 0.49184661171499777, -11.472717532816317, -17.530689402649369, -29.523444921912187, -36.983418680226812, -91.597351236026796, -144.17841735614732, -486.41083616652156, -239.1204206916959, 139.00893917602821, -7153.1577950265046, -18373.599790964956, -8415.9227315857388, -6467.5546779833858, -5469.6585676007244, -2789.7914675082047, -821.48267137489768, -514.71454200305448, -122.6780822655295, -35.554593402553344, -32.905184819607861, -16.875977506192179, -9.1243948190511883, -4.1802620318744168, 0.78316084097390803, -0.82473624462572925, -6.0277039354546789, -6.8502427898926159, -6.8858593350514123, -14.551844205848809, -8.4592989146599145, -1.9950695133570466, 1.5394495557011576, -9.232834653609892, -11.961754213185406, -20.558561534905806, -38.14482496917136, -57.160869905334089, -157.5554953403844, -411.20082432868492, -110.11930975746139, -463.64281724562954, -1210.9754315912523, -4810.1023052011815, -2624.9192342435695, -4516.897453633137, -3582.982491421491, -2119.7499173636902, -750.23472664477231, -159.86878938364373, -96.805728919101412, -16.935754226078267, -22.178078450833883, -9.0092227225989756, -5.4454852920506616, -2.5268882566736748, -2.6219523498948458, -2.0534180946008638, -6.4643064804236223, -8.7214065300148622, -7.0127031874072934, -7.7847619200438425, -0.78121801903708787, -0.11031060182209244, -3.4318959866990171, -4.568083040130742, -9.3160200641569482, -15.87900618307528, -23.382201868158507, -37.989404730637517, -121.95929165874175, -201.43809047465336, -567.30372690179445, -610.36312853782476, -1937.2376557226703, -2694.0942422163184, -3481.5355975420739, -3026.0617140239533, -2506.4916383888308, -1355.1576691715959, -468.0599091435185, -33.397814851582154, 18.545331481583979, -29.439943085485314, -11.922803368680741, -7.7174579848963036, -2.7888603302094261, -2.0545006330536419, -1.0224301618297007, -2.5290059501700397, -2.6199349314032494, -4.8828731457816774, -5.6140621268617785, -3.6146413255535528, -0.82967484502750599, -1.1631844631411599, -1.1736245693095499, -3.7427284368684024, -6.6178270656423424, -8.8039498431578131, -13.481606634721874, -26.682014936266803, -32.97802138197703, -190.87870662958537, -335.07671606134033, -876.95522185704988, -1470.8308615232113, -2413.1056871868645, -2329.4915082040015, -2151.9265781424592, -1438.5211303616525, -713.08152385953474, -130.56706965452, -28.862997769748436, 1.7115783105395304, -2.3079138134833856, -11.650001060370576, -2.1701895043697319, -1.7033561682904694, 0.11972955037883275, -0.5790790812653609, -0.45369004788794814, -4.0202584980239315, -2.2874964618085922, -4.0439693313887179, -2.7144116941037568, -0.78431497120559035, -0.63377862148075614, -0.83542887465582039, -2.5417481635934216, -3.4497798452119151, -5.2729359146939485, -9.3325337684514853, -2.3480777220919959, -30.998957295773433, -62.717085150656224, -255.55592612696097, -515.55403813953228, -1077.4118984564277, -1959.4321649356718, -996.17063256475433, -957.58296584245431, -646.48124546709357, -264.63237090275328, -80.518340163143705, 1.3577640380308329, -10.209813205700032, -1.6455702447745924, 0.041564105453412992, -2.1114336115237951, 0.094770419949782359, -0.59915948675603581, -0.042806075220647909, -1.4583889440112543, -1.0515624140257636, -2.6242610725724358, -1.9962698899057387, -2.6373580888952279, -0.39414295752688255, -0.80952098820947449, -0.80935504019781357, -1.8315981280862581, -2.3957781219887311, -3.7775973636187947, -1.2762438485839673, -5.8736187047076989, -1.7472058496177199, -39.26171578474986, -103.67045476207605, -221.97901463800724, -486.52939506954147, -770.86385201715837, -324.53401456188737, -340.76561269504333, -198.94197841299811, -116.98390967138687, -32.552002455687223, -2.8647426984892057, 3.4567160839115996, -2.3310052693731942, -0.31982529888503974, 1.0641170511547686, -1.1693860348016079, 0.40700212695667498, -1.0092937918537679, -0.034985154955161232, -1.1746986822405672, -2.2583319261560799, -2.3742700657768196, -2.0999344700147127, -1.3199204785521135, -0.00726121067659493, -0.21997349279604808, -1.6799449140427334, -2.573626149077699, -1.2749029797075579, -2.9722975102588807, 1.1149262389696764, -3.7825574143705132, -8.8112838568342262, -31.380656277665604, -80.815706494855448, -151.2920880811312, -231.73584987382, -71.719340760371239, -68.364029336894532, -82.304975309081328, -39.769136567332623, -12.693902195545155, 1.9842035662706039, -0.48894354077452629, 1.5673786316984977, -1.1528550937233366, -0.047905313676576855, 1.0650111541187497, -1.4670778837513785, 0.90154843827712783, -2.0067122081730173, -1.7180755446076856, -3.3483434682482898, -1.6317774897434336, -3.4708804264384949, -1.4694727348954268, -0.10257790692130256, -0.92889636381571783, -2.5451436559397584, -1.1303995452351283, -2.8871606625355204, -0.49805533537312113, -0.43871934228158149, 0.74909741969065036, 1.439791857975526, -13.026034555561825, -28.484337861014367, -36.895178406765908, -72.231190035838395, -26.809485534889244, -56.942733796520351, -36.280107429422031, -18.099079313675151, -3.2627913287121535, -0.27065475805048173, 1.1511525903295716, -0.1898870363801409, 0.97087220888025372, -1.1326412370424179, 0.19981301766363371, 2.3076802702931332, -2.5498407756566031, -0.55532623625253041, -4.5067864970337066, -3.1791416623515807, -4.4078100962970312, -3.3125592316970569, -0.86117313527739991, -1.5893272599995412, -2.966763176308445, -0.10263295233944174, -3.9090515756474873, -1.1809123553765606, -1.2038275093350199, 0.28624805719871799, 1.8536817132476691, 0.80720029239974944, -5.5769148242308617, -9.876045833403877, -26.746787584056406, -25.156847324745275, -59.858730768373135, -40.909481344220289, -31.301364606284917, -12.992896188265529, -3.3747756869001191, 2.018530777741562, -0.2260612077575776, 0.20594677690592242, -0.32403225688254972, 2.6342781156582364, -0.20787587650621794, 0.020021422684959465, 2.4168167113542753, -5.4711139391067487, -4.0162352275216753, -8.2614925402209369, -5.3597212899808353, -3.5618518868969149, -2.433206189931258, -3.72732750056158, 1.9796458045760836, -5.6194552495050392, -1.3533084788499918, -2.5312603283156982, -0.73577412998862446, 1.0534870856485199, 1.9641802030644013, 2.686394865901931, 0.15179077698100021, -13.505006616733285, -24.652619118640313, -46.540772018331772, -65.573862825648789, -62.198686950727755, -33.367481359773279, -15.462856466374785, 1.2764820376727259, 0.65238351077916601, 0.11426292455840634, -0.28574074744887695, 1.1004477970868616, 1.5327652909312646, 4.9327112002405187, -2.7503236900904393, -3.9754701567757182, -0.83451213573114202, -9.6859551174636032, -6.0006304228248837, -7.1318253263858704, -4.9856424549649869, -8.2198692881497966, 4.4471445589999075, -5.9124192136821829, -1.066228559248251, -4.5320020023541776, -2.2691032318803455, -0.29595929991781228, 0.95069246916243999, 2.9800299945570488, 4.1754888650460389, -3.9368165535394617, -16.752391317324459, -41.141712299851427, -60.643902512124761, -84.343164732157774, -54.074972316673119, -32.147836838432397, -3.8004568077904586, 0.60906370022349199, 0.96326571070502964, 0.12072436644318041, 0.86319547550846831, 1.1644302862121145, 2.3252453178811563, 0.4766448788746544, 4.2895158747096422, -8.0099398507205173, -11.261414242734404, -3.7327404661807368, -6.1601929909303115, -5.7506657339441176, -11.117751544185502, 4.3054115148233869, -8.2116085703478756, 1.5649721654809707, -5.692142411938895, -3.4949086671880489, -2.1697325908161673, -0.69541562648800392, 0.8151347377023449, 3.4913843961972888, 3.7128410928274609, -0.28461904914440361, -14.694115553922865, -40.784171797776878, -76.129097997930202, -42.446544168449137, -35.20072244442639, -7.6849685309209681, -0.86778876706269803, 1.7056687310546401, 0.51974952798739482, 1.1316759112288739, 1.2127800605381189, 2.2221214293211369, 0.8361427470500683, 0.099546606452808759, -3.1066939683116588, 2.4769973579809332, -11.745899626687375, -12.566716735550758, -4.7843722525441121, -8.6040588700645948, 5.3511034027408684, -15.66778198729919, 3.3911987930307137, -8.1259457896856588, -4.7980365887404339, -2.1471667518999764, -2.5087241573260579, -0.86097656871748596, 0.80139543608377761, 2.3927476350849495, 5.6561627225456101, 4.6250195847240709, -10.360873371570062, -32.183766942993408, -40.627648783043085, -17.95302681367091, 6.1859416444601623, 4.4451711191118575, 6.2133312512745986, 3.3587096432927233, 0.75569650762962715, 0.82429958430179118, 1.6770717987294814, 1.4875078542842981, 0.57506461301516931, -1.8616897808321822, -4.2923314886050523, -7.0161307894352376, 4.8526265686569623, -11.625945416074895, -21.07467865045702, 3.1434482955713889, -12.714871655934468, 2.366640700254353, -11.173661544979289, -6.475058123170597, -2.9596627855411386, -2.7630790459355632, -1.4122750319888788, -0.55802289067111654, 0.40509965601619852, 3.0549503122920978, 4.5519407117959005, 5.5044865911271481, 2.884340309618711, -2.0306279174386637, -12.290279126535582, 30.20785901727286, 12.45094729737127, 8.7415961086741216, 10.304484703022888, 4.2310313602871554, 1.8368366318675937, 1.9910666876255574, 0.99156303676388502, 0.31747940339256003, -0.60245605946597469, -1.5054245711483085, -5.2047479791857727, -4.6985425899868174, -6.4406057657264579, -2.4317965202694718, -0.31806110286890099, -34.614374984304249, -0.31806110286891309, -2.431796520269478, -6.440605765726465, -4.6985425899868325, -5.2047479791858065, -1.5054245711483181, -0.60245605946599046, 0.31747940339256003, 0.99156303676388657, 1.9910666876255707, 1.836836631867627, 4.2310313602871847, 10.304484703022929, 8.7415961086741465, 12.450947297371268, -17.953026813669211, -12.290279126534008, -2.0306279174386814, 2.8843403096185996, 5.504486591127181, 4.5519407117958774, 3.0549503122920303, 0.40509965601617365, -0.55802289067113198, -1.4122750319888866, -2.7630790459355659, -2.9596627855411324, -6.4750581231706095, -11.173661544979305, 2.3666407002543774, -12.714871655934495, 3.1434482955713383, -21.074678650457034, -11.625945416074918, 4.852626568656909, -7.0161307894352527, -4.2923314886050816, -1.8616897808321802, 0.57506461301515821, 1.4875078542843145, 1.6770717987294999, 0.82429958430183881, 0.75569650762972518, 3.3587096432928165, 6.2133312512752603, 4.4451711191129393, 6.1859416444606961, -42.446544168447332, -40.62764878304236, -32.183766942992868, -10.360873371569919, 4.6250195847241038, 5.6561627225455622, 2.3927476350849091, 0.80139543608374619, -0.86097656871749839, -2.5087241573260646, -2.1471667518999924, -4.7980365887404339, -8.1259457896856819, 3.3911987930307128, -15.667781987299181, 5.3511034027407849, -8.6040588700645682, -4.7843722525441965, -12.56671673555077, -11.745899626687423, 2.4769973579809226, -3.1066939683116837, 0.09954660645280862, 0.83614274705006209, 2.2221214293211515, 1.2127800605381271, 1.1316759112289154, 0.51974952798746277, 1.7056687310547414, -0.86778876706233132, -7.6849685309204459, -35.200722444424429, -84.343164732156296, -76.12909799792908, -40.784171797776416, -14.694115553922703, -0.28461904914431585, 3.7128410928274769, 3.4913843961972515, 0.81513473770227451, -0.69541562648801736, -2.1697325908161949, -3.4949086671880569, -5.6921424119389146, 1.5649721654809774, -8.2116085703478952, 4.3054115148233585, -11.117751544185527, -5.7506657339441034, -6.1601929909302848, -3.732740466180779, -11.261414242734437, -8.0099398507205191, 4.2895158747096467, 0.47664487887466933, 2.3252453178811465, 1.164430286212123, 0.86319547550848241, 0.12072436644322472, 0.96326571070516387, 0.60906370022364942, -3.8004568077899661, -32.147836838431445, -54.074972316672174, -65.573862825648646, -60.643902512124406, -41.141712299851122, -16.752391317324395, -3.9368165535393809, 4.1754888650460389, 2.9800299945570101, 0.95069246916240213, -0.29595929991782399, -2.2691032318803499, -4.5320020023541936, -1.0662285592482377, -5.9124192136821918, 4.4471445589998728, -8.2198692881497806, -4.9856424549649665, -7.1318253263858535, -6.0006304228248819, -9.685955117463573, -0.83451213573115879, -3.9754701567757316, -2.7503236900904167, 4.9327112002405231, 1.5327652909312637, 1.1004477970868634, -0.28574074744888678, 0.11426292455844969, 0.65238351077926593, 1.2764820376728394, -15.462856466374522, -33.367481359773095, -62.198686950727343, -59.858730768372553, -46.54077201833131, -24.652619118640224, -13.505006616733089, 0.15179077698109764, 2.6863948659019079, 1.9641802030643754, 1.0534870856484704, -0.73577412998863267, -2.5312603283157147, -1.3533084788499781, -5.6194552495050258, 1.979645804576063, -3.7273275005615623, -2.4332061899312447, -3.561851886896878, -5.3597212899808397, -8.2614925402208979, -4.0162352275216939, -5.471113939106738, 2.4168167113542718, 0.020021422684962133, -0.20787587650621156, 2.6342781156582284, -0.32403225688256132, 0.20594677690590416, -0.22606120775752253, 2.01853077774176, -3.3747756868998953, -12.992896188264998, -31.301364606284267, -40.909481344219984, -26.809485534888527, -25.156847324744817, -26.746787584056008, -9.8760458334037811, -5.576914824230828, 0.80720029239978064, 1.8536817132476344, 0.28624805719868845, -1.2038275093350328, -1.1809123553765482, -3.9090515756474855, -0.10263295233946072, -2.9667631763084428, -1.589327259999552, -0.86117313527738326, -3.3125592316970565, -4.4078100962970224, -3.179141662351582, -4.5067864970337235, -0.5553262362525373, -2.5498407756565928, 2.3076802702931301, 0.19981301766362944, -1.1326412370424508, 0.9708722088802425, -0.18988703638015317, 1.1511525903296145, -0.27065475805034434, -3.2627913287119403, -18.099079313674878, -36.280107429421662, -56.94273379651932, -71.719340760368894, -72.231190035836406, -36.895178406764366, -28.484337861013827, -13.026034555561461, 1.4397918579755735, 0.74909741969062116, -0.43871934228165033, -0.49805533537312413, -2.8871606625355364, -1.1303995452351521, -2.5451436559397544, -0.92889636381573193, -0.10257790692130979, -1.4694727348954375, -3.47088042643851, -1.6317774897434372, -3.3483434682483164, -1.7180755446077083, -2.0067122081730231, 0.90154843827713693, -1.4670778837513718, 1.0650111541187297, -0.047905313676639846, -1.1528550937233546, 1.5673786316984972, -0.48894354077444435, 1.9842035662707793, -12.693902195544938, -39.769136567331614, -82.304975309079381, -68.364029336892514, -324.53401456188737, -231.73584987382011, -151.29208808113108, -80.815706494855604, -31.380656277665615, -8.8112838568343115, -3.7825574143705687, 1.1149262389696379, -2.9722975102588807, -1.2749029797076188, -2.5736261490777141, -1.679944914042758, -0.21997349279605258, -0.0072612106766204651, -1.3199204785521295, -2.0999344700147602, -2.3742700657768196, -2.2583319261561177, -1.1746986822405874, -0.034985154955167297, -1.0092937918537661, 0.40700212695667115, -1.169386034801607, 1.0641170511547318, -0.31982529888503974, -2.3310052693731778, 3.4567160839116182, -2.8647426984891329, -32.552002455687209, -116.98390967138671, -198.94197841299811, -340.7656126950431, -996.17063256474341, -770.86385201715302, -486.52939506953675, -221.97901463800537, -103.67045476207502, -39.261715784749725, -1.7472058496176825, -5.8736187047078241, -1.2762438485839995, -3.7775973636188502, -2.3957781219887693, -1.831598128086283, -0.80935504019782156, -0.8095209882094927, -0.39414295752690548, -2.6373580888952821, -1.9962698899057312, -2.6242610725724247, -1.0515624140257607, -1.4583889440112356, -0.042806075220638506, -0.5991594867560418, 0.09477041994976447, -2.1114336115238088, 0.041564105453392161, -1.645570244774569, -10.20981320570001, 1.3577640380311771, -80.518340163142966, -264.63237090274987, -646.481245467088, -957.58296584244442, -2329.4915082039943, -1959.4321649356684, -1077.4118984564245, -515.55403813953228, -255.55592612696057, -62.717085150656416, -30.998957295773568, -2.3480777220922762, -9.3325337684514711, -5.2729359146941093, -3.4497798452119492, -2.5417481635934838, -0.83542887465582316, -0.63377862148080311, -0.78431497120560345, -2.7144116941037488, -4.0439693313887171, -2.2874964618085487, -4.0202584980238978, -0.45369004788789491, -0.57907908126534979, 0.1197295503788481, -1.7033561682904654, -2.1701895043697248, -11.650001060370577, -2.3079138134832218, 1.7115783105395919, -28.862997769747821, -130.56706965451951, -713.08152385953122, -1438.5211303616488, -2151.926578142451, -3481.535597542063, -2413.1056871868605, -1470.8308615232086, -876.95522185705033, -335.07671606133954, -190.87870662958562, -32.978021381977214, -26.682014936266988, -13.48160663472185, -8.8039498431579233, -6.6178270656423885, -3.7427284368684086, -1.1736245693095617, -1.1631844631411714, -0.82967484502748334, -3.6146413255534444, -5.614062126861783, -4.8828731457814465, -2.619934931403141, -2.5290059501698665, -1.0224301618296836, -2.0545006330535864, -2.7888603302093888, -7.7174579848962566, -11.922803368680738, -29.439943085484902, 18.545331481584157, -33.397814851580577, -468.05990914351662, -1355.1576691715877, -2506.491638388823, -3026.0617140239456, -2624.9192342435676, -2694.0942422163216, -1937.2376557226696, -610.36312853782647, -567.30372690179479, -201.43809047465459, -121.9592916587422, -37.989404730638029, -23.382201868158511, -15.879006183075566, -9.3160200641569801, -4.5680830401307739, -3.4318959866990371, -0.11031060182210287, -0.78121801903713106, -7.7847619200437572, -7.0127031874072889, -8.7214065300146117, -6.4643064804234296, -2.0534180946007163, -2.6219523498948099, -2.5268882566736321, -5.4454852920506234, -9.009222722598933, -22.178078450833912, -16.935754226078039, -96.805728919100844, -159.86878938364163, -750.23472664477129, -2119.7499173636857, -3582.9824914214882, -4516.8974536331352, -8415.9227315857224, -4810.1023052011687, -1210.9754315912437, -463.64281724563131, -110.11930975746253, -411.20082432868651, -157.55549534038482, -57.160869905334962, -38.144824969171324, -20.558561534906186, -11.961754213185522, -9.2328346536099755, 1.5394495557011911, -1.9950695133570939, -8.4592989146598381, -14.5518442058491, -6.8858593350514123, -6.8502427898925227, -6.0277039354547091, -0.82473624462553619, 0.7831608409739802, -4.1802620318743058, -9.1243948190510782, -16.875977506192154, -32.905184819607861, -35.55459340255284, -122.67808226552924, -514.71454200305027, -821.48267137489574, -2789.7914675081947, -5469.6585676007144, -6467.5546779833749, -27745.708494118051, -18373.599790964956, -7153.1577950265018, 139.0089391760178, -239.12042069169632, -486.41083616652713, -144.17841735614894, -91.597351236029397, -36.983418680226798, -29.52344492191359, -17.530689402649603, -11.472717532816715, 0.49184661171508715, -1.2754674400467305, -13.244388638951113, -21.283130178012485, -16.161012153790605, 3.4669422259560148, -14.833291452397047, 6.4142604093547071, -7.1882909197807701, 0.36714120063543831, -23.623139151504223, -16.730489448483766, -50.060212982262158, -40.805440061890259, -146.45498278007528, -545.33543865451918, -1748.9561003744159, -4085.0339896290589, -8553.5264674688297, -22841.42084500867, -17213.595236981979, -27817.100568112102, -10882.302955904914, -2806.7151144576032, 113.11650603552238, -714.3011765913102, -258.32278440436545, -84.034753639410752, -64.314813850969756, -32.473901904667066, -16.600635746256838, 0.34733716754136956, -1.7416101263050108, -17.401343902608698, -22.272265924680649, -14.131264529805808, -19.629747734378629, 3.5205960317556224, -14.232799652319452, -14.472211987615371, -7.2952697383626051, -2.1850531713375001, -11.025047422886134, -26.960578056534132, -39.308430893651277, -117.89522553299832, -106.61462896985047, -1120.3666800727583, -1103.8692252741987, -5794.1219231082987, -10829.417860945698, 544.0730266990613], "imag": [0.0, 39515.399789254865, -15382.502646592808, -2918.5213899411633, 1191.3150820979915, -345.80526987183259, -91.963497561164317, -108.06830259743781, -23.431327605037779, -16.610810822958811, -2.2742971526945692, -21.94540337447156, -21.272420402577179, -19.057735286082725, 52.376313120912741, 8.8521975026144215, 0.0, -8.8521975026153612, -52.376313120912044, 19.05773528608244, 21.272420402577229, 21.945403374471546, 2.2742971526945164, 16.61081082295847, 23.431327605037779, 108.06830259743377, 91.963497561167031, 345.80526987182992, -1191.3150820979911, 2918.521389941166, 15382.502646592799, -39515.399789254865, 16946.371225111547, 11272.400870696511, -1841.1630655848539, -1171.8258105148211, 109.26740577843201, 109.43221584454041, -206.10314812122442, -42.28539321936541, -65.249140172269108, -8.1960517939269071, -25.365956236318521, -12.488977779350739, -20.777136166915728, 10.939736173955986, 13.738393384077787, 18.982014759380824, -12.446635345723246, -8.8305069728752752, -14.016932746731957, 10.847407040619599, 18.949463773817904, 9.5491377266946333, 9.9160507928571491, 10.925693066643545, 29.597688207921799, 110.70270321520633, 119.64570653889598, -28.406380421737747, -832.38513354395832, 3868.3607546707453, 4625.1554139998552, 1299.266384884336, 11955.369188695569, -346.60702359457474, 2363.0865643328202, 202.32180136864196, -295.01076934839688, 277.44131247872377, -208.25011765184485, -68.536452109290167, -63.125416501511275, -30.589238972650307, -20.382558491276782, -12.902690844348575, 1.0182743702449766, 2.2874141051372452, 14.546101055958879, -1.6150967690531892, 0.87386354462209248, -13.38677146472326, 17.407635810762027, -0.60680891034428563, 12.950261495215786, -0.86756998254740836, 13.062832664150156, -2.136096668655318, 35.880437410281019, 66.543583791324124, 106.41042136702396, -154.61175360170367, -142.43138300706809, -204.04622542072212, 637.22651951043269, 14506.214536688893, 2087.241286517743, 2934.8250858413794, -540.57641351250766, 271.57679130866723, 537.49064424335052, 71.610686309506633, -82.566517160157844, -74.489552074506761, -57.142723569279489, -25.254222647826957, -12.544755138678799, -6.7708773337384622, -0.20770764759918051, 1.1194026551973495, 3.6890839097334878, -0.20461611038051675, -5.3737401851528386, -2.2636764639022453, 4.9832600695280087, 10.10754418440443, 2.544597152813191, 5.0447569422202223, 2.8189903732027388, 2.9920185974422946, 11.529259915073515, 53.348281783168488, 50.577306165813702, 119.57179721034167, -786.94393395792213, -901.86972095078409, 1074.2990124084633, -676.63432998511303, -1814.4894639161919, -1058.8873901892568, 349.63255334068964, 268.2484621242063, 380.4257804868011, 97.912476061205965, -71.661879904778658, -72.736940205390937, -37.286147332183255, -18.720186517652358, -9.5628328869678363, -8.2634536416369482, -0.19099280196160889, 0.28567330333833429, 0.071309220847330906, 1.775656575203522, 2.1386941287610384, -1.0231985430634363, 2.4480270844924137, 1.9878096211738889, 4.1535160740617325, 3.5521022242715827, 3.6019889835361654, -0.38778650675348675, 4.5934633035837322, 12.369503115173785, 94.400929285346393, -77.039516694541632, -317.96189631496532, -464.93982303098932, -1928.5847150696218, -1707.435501473529, -1583.8824730375936, -833.14970460709912, -242.65732454029356, 317.34459246185179, 69.371971565542168, -13.453603503282046, -58.678662168810511, -40.697925231357267, -20.16679423742438, -13.090865763493372, -7.6639325468155182, -3.9818184076004774, -1.1480426683317846, 3.4782462601712654, 3.3535274581593777, 1.1304420427842019, -0.78798091056569108, 1.3645618319176871, -1.2482103302418359, 2.6548043613808709, 2.0455422971726147, 3.3794759874708187, 0.28270713586437868, -0.67396364813071052, -2.4299863370655714, 20.048308524208917, 2.7323622379310764, 23.350930435926227, 19.428895667387472, -542.55543458513841, -969.72646934413422, -1881.6935115818319, -426.42488803140975, -203.12933548649579, 221.2759941924873, 75.498646737827528, 81.527654709232138, -23.228148927519229, -35.095892631083601, -18.113211298120703, -10.84781416147373, -7.2190125620904571, -4.6279710639736358, -2.4591204313834965, 0.58454842364750592, 0.9547463106026568, 2.4151219203224654, 0.35567626693527166, -0.34443735246553581, 0.10021534895843374, 0.62975751586612239, 0.075739057981468363, 2.5606009702294732, 0.33652577635989583, 1.0967346902818458, -2.0000864020848046, 1.451434335785166, -7.1043203483245918, 10.682010714917043, 63.119371696969466, -0.21915489532378957, -18.829394319190524, -151.38668525810633, -53.557614725234764, 319.98109193688521, 339.65571159114432, 137.34002448547074, 89.166061674211335, 5.5395407010458548, 3.1394961579749192, -15.790153056071546, -10.068399035154068, -5.990189510359599, -3.8184783724455591, -3.031311871551015, -1.7050468427375405, 0.29997994657424726, 1.0820090369221063, 1.186145834536469, 1.1035985643781976, -0.026686439684276222, -0.021861987241408937, -0.71069133238487792, 1.5408441736495715, 0.88964240698419117, 1.3226298476418663, -0.31341792844049038, 0.36542819178090652, -6.2831724147446009, -1.5019641274621849, 13.705577255286178, 14.08988446983488, 43.376064565045787, 54.204646228028693, 132.60719521227122, 62.432091745032416, 219.86853407025291, 133.19971898528303, 106.65962198554573, 32.509510578136677, -0.32173120932219279, -1.0472919151881939, 3.0400482541159932, -2.1373375769283371, -3.730023177462626, -3.658884080605465, -1.7579654575817145, -1.4081716233776314, 0.53847505259675243, 0.97164442609396484, 0.99557444173589427, 0.11126643861839057, 0.68343802732828218, -1.8968331338371984, 1.2370080984335854, 0.24616862215977253, 1.6488725749132858, 0.51751999590405229, 1.1293193043526017, -2.440127533596657, -2.1096176983280075, 0.86862341139232857, -3.2906850406637935, 10.529105330387669, 21.528607110729595, 53.864359931260871, 77.645971701549371, 219.35042572397626, 56.646725304489401, 72.597133152544643, 25.283726226154087, 9.5916945360518575, 3.5131066387109651, 7.8353712095885921, 3.7982495059531924, -0.1320379920173739, -2.6872144914167868, -3.9932995411602161, -3.2496097582258021, 0.34753129477634409, 0.51108563039490118, 1.5779290838292743, -0.32098662744154494, 0.85050436376706862, -0.95269533500567993, 1.2514468795435802, -0.80232514327112969, 0.9402998385797201, 0.083484537520043395, 2.9970442493787712, -1.3537504507858638, -0.49606931853204594, -0.40634793694041288, -3.2049709482452999, -0.90733505109423707, 2.4367446291982722, 14.425788131967863, 11.285893196605656, 41.383231407558732, 26.64930600456886, 3.49019745229235, -2.7278278900775033, -0.6780497768719117, 5.1972517053508067, 13.315592278460391, 8.5655340270495799, 2.7986942524720009, -1.3188307478897958, -2.9560147101356677, -3.5039625138893249, -3.2351264422424442, -1.7837191938553947, 4.1370294214229899, -0.48575889336608402, 1.5705428299533406, -0.28712766434912351, 3.0263722138472242, -1.2120159426024513, 2.3578685311613299, -0.57595981339550073, 5.0023110313506045, -1.3965343408401143, 0.57130018359553258, 0.97601539997779907, -2.5856117766371072, -1.4572886030272592, -1.697304402058907, 2.1030121366448049, -0.062995146217583023, 4.9612937854964008, -0.301351161950073, 9.1580358876592047, -26.774160253651129, -14.352442298363405, -1.3280628610826339, 14.662722831107068, 13.065714024917916, 9.0142686843581057, 2.3156698002103213, -2.1494090398895276, -3.4369058394752816, -3.2885833247038136, -1.5589303641797962, -1.2624013759488528, -1.9675974847606275, 6.6808538974877765, -1.9845455926326385, 5.8520209082315047, -0.64649466936933941, 3.7090325345277484, -1.4383189901623872, 7.6358217658181289, -2.5011370399824613, 2.0288771570791524, 3.3870661540364408, -2.1726948090167277, -1.6227282885568253, -2.3401345171732064, -1.0784728701462345, -2.329913042321786, 1.6766227476276099, -5.5208279800184377, -13.304914803323909, -34.683237345909106, -16.2208922311743, -7.5614574111833583, 14.803696771258469, 15.579335900760762, 15.161631552742872, 8.4660409590375174, 1.9742581617985508, -2.2318082441740326, -3.1677451000476946, -2.7136257844502993, -2.4663578849843404, 2.1470642674041458, -0.80807516468244989, -6.8039934755458935, 11.462761097859508, -2.3200072133134322, 9.6476195054900042, -0.58323258923086063, 10.466810618341768, -7.3966372849294499, 4.629755222962074, 7.8499060069144697, -1.2532724460122664, -0.71383693570895246, -3.0356422051110532, -1.9171318821546592, -3.2905248775997, 1.1638954652799918, -0.8003122215164804, -7.6686022187651925, -13.379436000591463, -2.0784151782651223, 18.753674553162941, 37.596939514973172, 28.201887912811504, 26.441177038828386, 17.313699289624569, 8.2605837012813357, 1.9157665349814501, -1.0360449197814665, -2.460835808457071, -2.9435912594789997, -0.73745892985465067, -0.80698208098757895, 1.3512050433752707, -2.4806623635392717, -10.931358459008862, 20.399475046734903, -0.93914753929729033, 15.633586230850142, -11.808527677086202, 3.7955244266493091, 11.440683264496995, 0.22625003249094855, 2.3910143241324033, -1.5433230899620785, -1.7524971656611896, -3.4392335008624597, -1.2102890230410412, -1.1333111335531953, -0.86689054652400055, -0.77102037498198228, 5.869418392294464, -6.6911708498309208, 60.884710948918006, 43.621563233816303, 43.489599527484941, 33.141784821271486, 18.338861076357606, 7.7096141949396086, 3.1020965354201242, -0.33651454595896624, -1.858665713174497, -1.559439785993801, -1.7180049365163976, -0.49470837698954684, -5.7499783777067037, 1.2816063498557866, -1.6438131382345036, -14.80449956699707, 30.383248800411909, -20.687082737158004, 6.4291237134149926, 13.719178799652914, -0.15202331710012035, 5.6708331746907428, 1.1091130063870853, 0.43083164420390874, -2.423604198850752, -1.2614169037455483, -3.1633275417854718, -2.5428479485652051, -1.0621152637056996, 7.4921468465754772, 13.826120615216594, 48.56895003285198, 43.655937980459306, 56.143788442077074, 39.839822974553684, 28.907966432346075, 17.226166967005444, 9.493352687280801, 2.1248307248495761, -0.10304029106189502, -0.73643011249607004, -0.68086203692422775, -1.5726895782452095, -2.38329292549688, -6.3654622280486342, -12.648471231222512, 2.6502987300644998, 9.1941379366153466, -33.28553680715055, 17.791788634489134, 16.331392880531652, -1.0332061538290742, 9.6376857080971341, 4.1689669632335153, 3.4112249849533103, -0.63064111926197686, 0.028356847121888181, -1.1968584419289052, -3.3957285823190806, -4.7459408986565164, -4.790016252397657, -5.1593354130915703, 13.957717184896774, 20.367299127198688, 0.0, -4.5388798707327584, 12.10851784859719, 15.801052170121357, 15.786196904526062, 6.4645339091427658, 2.6357128260629894, 0.48128762074186304, -0.08159176932681525, -1.1399410088753745, -0.93916966756638098, -5.4695359499377414, -8.4733779831544798, -6.8332707948903639, -5.8759130146162706, -8.1552266379296245, 0.0, 8.1552266379295908, 5.8759130146162661, 6.8332707948903488, 8.4733779831544869, 5.4695359499377316, 0.93916966756637688, 1.1399410088753721, 0.08159176932681525, -0.48128762074185355, -2.635712826062981, -6.4645339091427667, -15.786196904526072, -15.801052170121331, -12.108517848597181, 4.5388798707327416, -43.655937980456407, -20.367299127197448, -13.957717184895019, 5.1593354130924185, 4.7900162523979217, 4.7459408986567313, 3.395728582319133, 1.1968584419289152, -0.028356847121888983, 0.63064111926197186, -3.4112249849533058, -4.1689669632334958, -9.6376857080971128, 1.0332061538290882, -16.331392880531649, -17.79178863448908, 33.285536807150621, -9.1941379366153146, -2.6502987300644807, 12.648471231222583, 6.3654622280486368, 2.3832929254968982, 1.5726895782452166, 0.68086203692425595, 0.73643011249607926, 0.10304029106193066, -2.1248307248495362, -9.4933526872806269, -17.226166967005291, -28.907966432345297, -39.839822974551964, -56.143788442073777, -60.884710948915583, -48.568950032850019, -13.82612061521586, -7.4921468465751166, 1.0621152637059226, 2.5428479485653219, 3.1633275417855051, 1.261416903745556, 2.4236041988507613, -0.43083164420392467, -1.1091130063870698, -5.6708331746907525, 0.15202331710012659, -13.719178799652925, -6.4291237134149712, 20.687082737158036, -30.383248800411859, 14.804499566997148, 1.6438131382345447, -1.2816063498557717, 5.7499783777067242, 0.49470837698955733, 1.7180049365164254, 1.5594397859938318, 1.8586657131745035, 0.33651454595900265, -3.1020965354201109, -7.7096141949395376, -18.33886107635751, -33.141784821271301, -43.48959952748401, -43.621563233814584, -18.753674553161851, 6.6911708498312086, -5.8694183922938254, 0.77102037498232001, 0.86689054652414343, 1.1333111335533379, 1.2102890230411023, 3.4392335008624833, 1.7524971656611932, 1.5433230899620796, -2.3910143241323984, -0.22625003249093578, -11.440683264497009, -3.7955244266492731, 11.808527677086207, -15.633586230850069, 0.93914753929731287, -20.399475046734821, 10.931358459008916, 2.4806623635393117, -1.3512050433752816, 0.80698208098763236, 0.73745892985467021, 2.943591259479049, 2.4608358084570767, 1.0360449197814969, -1.9157665349814337, -8.2605837012812007, -17.313699289624388, -26.441177038827938, -28.201887912810978, -37.59693951497237, 16.220892231174151, 2.0784151782650429, 13.379436000591378, 7.6686022187652325, 0.80031222151651993, -1.1638954652799158, 3.290524877599744, 1.917131882154679, 3.0356422051110541, 0.71383693570894702, 1.2532724460122711, -7.849906006914436, -4.6297552229620669, 7.3966372849294793, -10.466810618341761, 0.58323258923092358, -9.6476195054900042, 2.3200072133134997, -11.462761097859458, 6.8039934755459344, 0.80807516468246154, -2.1470642674041431, 2.4663578849843657, 2.7136257844503273, 3.1677451000476933, 2.2318082441740374, -1.9742581617985304, -8.4660409590374517, -15.161631552742712, -15.579335900760643, -14.803696771258227, 7.5614574111833424, 26.774160253651477, 34.683237345909006, 13.304914803324097, 5.5208279800184936, -1.6766227476275497, 2.3299130423218712, 1.078472870146282, 2.3401345171732237, 1.6227282885568277, 2.1726948090167162, -3.3870661540364337, -2.0288771570791524, 2.5011370399824764, -7.6358217658181076, 1.4383189901624107, -3.7090325345277098, 0.64649466936933497, -5.8520209082314834, 1.984545592632657, -6.6808538974877711, 1.9675974847606519, 1.2624013759488664, 1.5589303641798025, 3.2885833247038483, 3.4369058394752718, 2.1494090398895325, -2.3156698002103084, -9.0142686843579654, -13.06571402491778, -14.662722831106908, 1.3280628610827629, 14.352442298363767, -3.4901974522911301, -9.158035887658194, 0.30135116195024236, -4.9612937854963866, 0.062995146217542555, -2.1030121366447649, 1.6973044020589363, 1.457288603027268, 2.5856117766371063, -0.97601539997780706, -0.57130018359554458, 1.396534340840117, -5.0023110313506107, 0.5759598133955085, -2.357868531161305, 1.2120159426024788, -3.0263722138472202, 0.28712766434913656, -1.5705428299533217, 0.48575889336609929, -4.1370294214229943, 1.783719193855416, 3.2351264422424548, 3.5039625138893205, 2.956014710135662, 1.3188307478897938, -2.7986942524719765, -8.5655340270494893, -13.315592278460258, -5.1972517053507898, 0.67804977687200962, 2.7278278900777337, -56.64672530448825, -26.649306004568476, -41.383231407558036, -11.285893196605604, -14.42578813196792, -2.4367446291981882, 0.90733505109427226, 3.2049709482452906, 0.40634793694041338, 0.49606931853200609, 1.3537504507858567, -2.9970442493787934, -0.083484537520044699, -0.94029983857969957, 0.80232514327114979, -1.2514468795435723, 0.95269533500567261, -0.85050436376704475, 0.32098662744156231, -1.5779290838292681, -0.51108563039488553, -0.3475312947763517, 3.2496097582258234, 3.9932995411602126, 2.687214491416765, 0.13203799201742056, -3.7982495059531578, -7.8353712095884145, -3.5131066387109939, -9.5916945360520085, -25.283726226154414, -72.597133152543805, -219.86853407025291, -219.35042572397646, -77.645971701549428, -53.864359931260992, -21.52860711072962, -10.52910533038772, 3.2906850406638011, -0.86862341139231525, 2.1096176983280075, 2.4401275335966615, -1.1293193043526162, -0.5175199959040564, -1.6488725749132833, -0.24616862215974425, -1.2370080984335483, 1.8968331338372646, -0.68343802732828218, -0.11126643861832354, -0.99557444173586918, -0.97164442609393387, -0.53847505259674655, 1.408171623377654, 1.757965457581725, 3.6588840806054854, 3.730023177462626, 2.1373375769283727, -3.0400482541159497, 1.0472919151882829, 0.32173120932219762, -32.509510578136599, -106.65962198554575, -133.199718985283, -319.98109193688754, -62.432091745036324, -132.60719521227176, -54.20464622802902, -43.376064565046129, -14.089884469834875, -13.705577255286062, 1.5019641274622118, 6.2831724147445849, -0.36542819178094682, 0.31341792844047633, -1.3226298476418761, -0.88964240698418728, -1.5408441736495315, 0.71069133238493809, 0.021861987241514846, 0.026686439684265401, -1.1035985643780957, -1.1861458345364231, -1.082009036922065, -0.29997994657423205, 1.7050468427375622, 3.031311871551031, 3.818478372445528, 5.9901895103595697, 10.068399035154069, 15.790153056071421, -3.1394961579745826, -5.539540701046052, -89.166061674211662, -137.34002448547281, -339.65571159114575, 426.42488803140685, 53.557614725234323, 151.38668525810476, 18.829394319190286, 0.21915489532353391, -63.119371696969402, -10.682010714916952, 7.1043203483248183, -1.4514343357851665, 2.0000864020848317, -1.0967346902818478, -0.33652577635987613, -2.5606009702294568, -0.075739057981359575, -0.6297575158660037, -0.1002153489582, 0.34443735246552043, -0.35567626693504045, -2.4151219203224019, -0.95474631060256077, -0.58454842364747928, 2.4591204313835524, 4.6279710639736518, 7.2190125620904322, 10.8478141614737, 18.113211298120788, 35.095892631083665, 23.228148927519459, -81.527654709232067, -75.498646737828622, -221.27599419248904, 203.12933548649244, 1583.8824730375886, 1881.6935115818235, 969.72646934413342, 542.55543458513785, -19.428895667388197, -23.350930435925818, -2.7323622379307726, -20.048308524208668, 2.4299863370655803, 0.67396364813076437, -0.28270713586437829, -3.3794759874707645, -2.0455422971725761, -2.6548043613806773, 1.248210330242034, -1.3645618319173671, 0.78798091056567598, -1.130442042783935, -3.3535274581592822, -3.4782462601711517, 1.1480426683318268, 3.9818184076005192, 7.6639325468155093, 13.090865763493181, 20.166794237424288, 40.697925231356948, 58.678662168810511, 13.453603503282435, -69.371971565542452, -317.34459246185418, 242.65732454028887, 833.14970460709446, 1814.4894639161919, 1707.4355014735293, 1928.5847150696216, 464.93982303099165, 317.96189631496537, 77.039516694542414, -94.400929285346379, -12.369503115173439, -4.5934633035837242, 0.38778650675346871, -3.6019889835361467, -3.5521022242715157, -4.1535160740616579, -1.9878096211735969, -2.4480270844921423, 1.0231985430638744, -2.1386941287610495, -1.7756565752032289, -0.071309220847206922, -0.28567330333819857, 0.19099280196170093, 8.2634536416369908, 9.5628328869678718, 18.720186517652159, 37.286147332183262, 72.736940205390795, 71.661879904778388, -97.912476061205524, -380.4257804868011, -268.24846212420823, -349.63255334068992, 1058.8873901892528, -2087.2412865177334, 676.63432998511416, -1074.2990124084556, 901.86972095078841, 786.94393395792224, -119.57179721034137, -50.577306165813212, -53.34828178316841, -11.529259915073451, -2.9920185974423683, -2.8189903732028481, -5.0447569422201788, -2.5445971528130604, -10.107544184404102, -4.9832600695276215, 2.2636764639027978, 5.3737401851528253, 0.20461611038107308, -3.6890839097334074, -1.119402655197085, 0.20770764759927202, 6.7708773337385892, 12.544755138678777, 25.254222647826818, 57.14272356927944, 74.489552074506946, 82.566517160157588, -71.610686309506534, -537.49064424335074, -271.57679130866813, 540.57641351250493, -2934.8250858413712, -11955.369188695569, -14506.214536688902, -637.22651951043315, 204.04622542072232, 142.43138300706894, 154.61175360170483, -106.41042136702355, -66.543583791323357, -35.880437410281012, 2.1360966686551617, -13.062832664150186, 0.86756998254746465, -12.950261495215663, 0.6068089103450538, -17.40763581076148, 13.386771464725289, -0.87386354462209659, 1.6150967690552112, -14.546101055958459, -2.2874141051365076, -1.0182743702449171, 12.902690844348964, 20.382558491276768, 30.589238972650698, 63.125416501511289, 68.536452109292355, 208.25011765184536, -277.4413124787215, 295.01076934839597, -202.32180136863923, -2363.0865643328207, 346.60702359456963, -16946.371225111554, -1299.266384884367, -4625.1554139998561, -3868.3607546707453, 832.38513354395968, 28.40638042173725, -119.64570653889508, -110.70270321520742, -29.597688207921749, -10.925693066643381, -9.9160507928571686, -9.5491377266944308, -18.949463773817815, -10.847407040619126, 14.016932746732627, 8.8305069728758134, 12.446635345723296, -18.982014759378298, -13.73839338407706, -10.939736173955323, 20.777136166915735, 12.48897777935125, 25.365956236318532, 8.1960517939270616, 65.249140172269151, 42.285393219366988, 206.10314812122587, -109.43221584453876, -109.26740577843286, 1171.8258105148195, 1841.1630655848473, -11272.400870696491]}};

var right_eye_filter = {"real": [1.8229079259010603, 0.097810498648582461, -0.55840092137248587, -0.99970462842356578, 0.18757876559092043, -0.81617694863114465, -0.17457078018685562, 0.13822182613073089, -0.13830885288846723, 0.14088352498892928, -0.11242245121823281, 0.64190144530750459, -0.18081689212517704, 0.84757445423403044, -2.0367692338977426, 2.3450651085370726, -3.2227771639624789, 2.3450651085369945, -2.0367692338977101, 0.84757445423403854, -0.18081689212518082, 0.64190144530750537, -0.11242245121823641, 0.14088352498894169, -0.13830885288846723, 0.13822182613073003, -0.17457078018684977, -0.81617694863113666, 0.18757876559091927, -0.99970462842356267, -0.55840092137248509, 0.097810498648581323, -1.0960340088024074, -1.9119199452512301, -2.4095702665388479, -0.55162352804953241, -0.50505328014021589, -1.3068505835636635, -0.49437187443975589, 0.23127204626685588, 0.043350794355039197, -0.071787406154436809, 0.070854449837205943, 0.17221102955705567, 0.44602122877614064, 0.074148205591900399, -0.015611524439393865, -0.79896724757292914, -0.67155961060437053, -0.49375784053273253, 0.028167647498424205, -0.3191891366103583, 0.53582170174408217, 0.20183473326047152, 0.12710467168208503, -0.071400263514192097, 0.074560604448017792, -0.12451483496807111, 0.051358135035693774, -0.77282398113384443, -0.42160647485916963, -1.1311602269894514, -1.4625324828122208, 0.3337871926813808, -1.77011609742092, -1.4302518240108344, -3.0428213499062116, -0.60631225487833551, -0.13683987631719793, -2.3692424085383519, -0.34105804260324346, -0.25969657852057992, 0.23610433796619859, -0.27685168579683173, 0.16986402710259335, 0.073612585805396993, 0.57704911017089122, -0.059867579479423505, 0.51680219528175042, -1.0666730319382505, -0.0056552094670686828, -0.75809939060745812, -0.064701320250044561, -0.19832318162238824, 0.37732986906226257, 0.20777584924550152, 0.15451076629740465, -0.013991851319401968, 0.13841341497021592, -0.086883949036928532, 0.25261423619714551, -1.1991385138433881, -1.9867837341406693, -2.275962773839737, -3.1079150257531585, -2.3995834975192567, -2.2937692343725722, -2.1872173045799017, -1.3988308931230504, -2.2073957813815439, -1.9667941627002865, -1.6748432066635108, -0.92650772032564344, -0.054197237250052703, -0.18026213329416008, -0.15232124758200827, -0.016555865669302033, 0.31289505893870784, 0.42806542968274719, 0.23124350286854853, -0.087366382764607439, -0.12552132795947232, -0.12547908619418155, -0.38089709050886683, -0.28444076658768042, -0.11944152964360766, 0.12056136689031131, 0.21189843131890268, 0.16581598470154221, 0.13376820638890077, 0.22205496825803592, 0.15120100371874812, 0.12380717441381156, -1.2352596784322261, -2.2222759116849211, -3.3782856809989692, -3.415076124219421, -2.7282977589825297, -1.5576789730825455, -1.6478932560447972, -2.067907968457094, -2.004290735457912, -2.6427456963680775, -1.9309474679838621, -0.16864865516592528, -0.22642518078963322, -0.13321306237600422, -0.20692971953006373, -0.068344938706069003, 0.14493915164047724, 0.46505832474821007, 0.32789481378377733, 0.1852927254910838, -0.1356638873386786, -0.03585192275390197, -0.17203834043005656, -0.15954900238018477, -0.059581713131431221, -0.017228379259871054, 0.12402459410135006, 0.1524538089963059, 0.16271946063708961, 0.24817234249560427, 0.26053579199245763, -0.04769125558408293, -0.81459993031792033, -2.0740660744196808, -3.1544891598954261, -2.9212825837849565, -2.4077419089431702, -1.6411629435379833, -1.576697627349694, -1.8007661961299257, -2.0001525985045707, -1.5107274159689619, -1.2839600483166405, -0.63196711118813498, 0.31071574064221719, -0.21370915949408273, -0.16393119308951343, -0.097481704015839707, 0.13767875532837173, 0.23695911940697742, 0.36158774196732829, -0.00066962538216623158, -0.1026502520704758, -0.18176695609293456, -0.059120611570986824, -0.13702193484548986, -0.0073538013157976303, 0.020281061259494877, 0.15032501459982059, 0.16876214929227357, 0.18780650312631536, 0.16308782299108887, 0.18583847563977354, 0.44907296092364651, -0.020800703185301726, -1.4297091333258476, -2.4259185480628145, -2.4053777736536626, -1.9821307035675879, -1.3372642957080885, -1.2989780551182537, -1.3731553217305845, -1.2269479805895975, -1.2032897772528626, -0.22206046284030648, -0.18415548289109809, -0.23415549346578352, 0.077936325689887453, -0.21633114300736572, -0.059449722211757941, 0.013318329293146938, 0.28775437300883983, 0.21963323601338633, 0.16649953505637383, -0.18974789333555656, -0.17379580132236441, -0.23416130311702454, -0.13478379984035538, -0.13112027137758978, 0.033522350558872455, 0.13259733500476653, 0.171380750952115, 0.15737574769334917, 0.092477162456605533, 0.13448891283084696, 0.41161459424817443, 0.35609170613712005, -0.55316449850203808, -1.540851379466907, -1.8005308506197801, -1.5719273509294158, -0.94040577953316051, -0.83899416480020927, -0.77336416928591256, -0.66562411016509948, -0.4002640865408188, -0.36750971454913561, 0.2414435659750552, -0.065677188177910795, -0.21341675767851534, -0.041369287190265204, -0.087404842921799578, 0.04460147122538273, 0.19583406251777175, 0.1830038441344799, 0.012219595757112435, -0.034593273427629516, -0.14926486203867156, -0.036665364495836496, -0.1306231554860259, -0.086381624051938985, 0.0020423415177502173, 0.11239290885891448, 0.12781279786870536, 0.10954302373131516, 0.14996801038078228, 0.12965098836907352, 0.14324588543961356, 0.0567484033157079, -0.079342592710004017, -0.77145898274835445, -1.1705860882999304, -1.0754357146023004, -0.5463269466436349, -0.37732231762995055, -0.29185933229148303, -0.18245346577017127, -0.15252816280103537, 0.00992307413149221, -0.05334501261419268, 0.10643359538216246, -0.069635302172998029, -0.20853401810086858, 0.03871878333386132, 0.024793140061197767, 0.22215018549405419, 0.19090693911120471, 0.13458393481660855, -0.1226120784542075, -0.060406846903667433, -0.083060383383984554, -0.016925686434954099, -0.033352938195947639, 0.056474422402956102, 0.04873056181166667, 0.092098221631537164, 0.13542751998114597, 0.15540921558269635, 0.10094403852684107, 0.050489672984821425, 0.089840998861512991, 0.018445471788018183, -0.44280324831238471, -0.64559475523542686, -0.64123409592876457, -0.25571779361731761, -0.15489773108593363, -0.10375533557574061, -0.074018947274090252, -0.074021765277388324, -0.034956034554291714, 0.065331700319185393, -0.079299771847393716, 0.035725424097319471, -0.10252861876832269, -0.22107962950770202, 0.20755848067860572, 0.23157078159613848, 0.34013467279608883, 0.23914223921471078, 0.043591964044129211, -0.20186945117744784, 0.04172561648658725, -0.038784831650455286, 0.076248151019351923, -0.060276976551200255, -0.0031358189183758184, 0.13054366560393055, 0.16122088670834137, 0.12129220423951546, 0.064624059271846127, 0.063153633523538075, 0.036868954773612302, 0.025599835220982206, -0.17872521900892777, -0.37577894082797708, -0.33418602947194676, -0.19087946198724595, -0.092430559387195924, -0.15843188266072916, -0.1178716916883143, -0.079832857077627425, -0.038455609721169501, 0.015668866487966955, 0.0052656766019976578, -0.12562510603385343, -0.024970842739258457, -0.030574039563531708, -0.21969881405226874, 0.59191387060782108, 0.39965780946904006, 0.22624763974293111, 0.077143781693831126, 0.078542516808501189, -0.0038697706067326258, 0.21858339549378, 0.083870133819846815, -0.19149929243694441, 0.053673315180545467, 0.22201073984886688, 0.16922848807595664, 0.12511007660405662, 0.095111634855384236, 0.084195395624058103, 0.010195208908487656, -0.016589123313681509, -0.076922699191606214, -0.17023093289451025, -0.26998035777525775, -0.28189859430096476, -0.32749231042729776, -0.240474927671948, -0.27714150491609907, -0.16857870511456344, -0.056310601502134704, 0.026291702225850644, -0.028508101274427284, -0.066307061790986485, -0.27187198211633473, 0.066219257946262391, 0.32825613521942065, -0.21303758386300781, 1.1917438602108388, 0.2807025357241521, 0.23447144426975483, 0.16511529097099151, 0.40113579910945835, 0.017152293761210982, -0.1450564820739392, 0.13833755803781553, 0.2361453534315919, 0.16033553043559276, 0.17442784770871, 0.17988585089228476, 0.143828955260344, 0.07132752932041192, 0.016244981011210025, -0.013577696292888701, -0.024045478766089354, -0.11184718959298219, -0.14666574805211069, 0.0080876817899727359, -0.16842937423863127, -0.43543489379944889, -0.29975286851709859, -0.22753898297998879, -0.069036032916579657, 0.014977564920406507, -0.020420877906038481, -0.13524198281736244, -0.15739380447541659, -0.33401260934309918, 0.46815371603113554, 0.93021729768322625, -0.26733338229185055, 1.4166629302294091, 0.60664479608939625, 0.3603810860087503, 0.4605515924213614, -0.32071019427276837, 0.15916183580862947, 0.55142162929110317, 0.20419289205444074, 0.051921880744650394, 0.24679565757292954, 0.2706202610478356, 0.15590400545853877, 0.081859441051199647, -0.040980231107277158, 0.019596242113331462, 0.094364427919773758, 0.065278519802775978, -0.029838116901178446, 0.15435464918439099, -0.039386655944161249, -0.077796406016204619, -0.28158476919608044, -0.033110128022724852, 0.018548614200940845, 0.067046107651037731, -0.044245201781535203, -0.1525534131110006, -0.22929077462390082, -0.085302710712388263, -0.049302393683332231, 0.85744368463127818, 1.8448220136861364, -0.68744556831975012, 1.810880881855317, 0.66237039703709566, -0.31567909429421087, 0.83232217907475781, 0.97863365922997991, 0.30994126117364096, -0.041163173314528664, 0.17633262873947353, 0.23161854928102976, 0.25087704366702551, 0.19868696729956423, 0.093569887694449877, 0.032362324442922322, -0.0027507666136337679, 0.21821986304703905, 0.37880734420129814, 0.40096920495374666, 0.93561154193066887, 0.61326039955329958, 0.1638528799494483, 0.1009541629695858, 0.056601591846233243, 0.15561323638878471, 0.073000292812971587, -0.0055442453146915694, -0.13817032242271102, -0.11770539535407684, -0.096245457278447424, 0.46442894125096079, 0.45587938373772585, 1.3432089992982477, 2.5059762271849535, -0.93829697639874887, 0.6492144586928863, 0.79782532034480069, 1.3025551528258366, 0.94174974100732234, 0.099921469659734793, 0.28712786266920659, 0.15853680079243379, 0.130717335778855, 0.17042917695126153, 0.19986443324539621, 0.13725228360851915, 0.029723534135295476, 0.098143635338702864, 0.19047751491127032, 0.49335337973435212, 0.78089304412099847, 0.29686587428828037, 0.38131881367791126, 0.40643673652514922, 0.19053499830856688, 0.20033550195294633, 0.13287714582076576, 0.10533560171090586, 0.00085487897815388243, -0.049435296406267468, -0.081309411554979491, 0.057947716710403128, 0.48207744089263116, 1.2538880645112733, 1.2204758332556214, 0.87793863876625744, 1.8796293205435075, -0.45285576127696725, 2.2308682152547137, 1.2382711063757557, -0.035207936995945072, 0.88175672278306683, 0.55916031961657942, 0.18718127547628777, 0.011764673252274449, 0.068747006595272581, 0.13522321325294812, 0.17151312046437606, 0.10315365060575944, -0.0011239413451798732, 0.14993420590829387, 0.38959110228082239, 0.38845862264410469, 0.69716730182732189, 0.51802064393501412, 0.28837767001488912, 0.10583936790249669, 0.071016615670210698, 0.16001776032454934, 0.10715662619027419, 0.056188716759532117, -0.035825840155044517, 0.0061469917968111389, 0.089493877843564718, 0.68387295014825999, 1.1016519558168656, 1.3182383587355595, 0.66635382040153524, 0.54863673632097221, 4.0547770231048936, 0.54863673632097154, 0.66635382040153424, 1.3182383587355562, 1.101651955816866, 0.68387295014826144, 0.089493877843565064, 0.0061469917968106288, -0.035825840155044517, 0.056188716759530431, 0.10715662619027334, 0.16001776032454856, 0.071016615670210018, 0.10583936790249539, 0.28837767001488829, 0.51802064393501346, 0.29686587428830957, 0.38845862264412201, 0.38959110228084654, 0.14993420590831108, -0.001123941345177488, 0.10315365060576374, 0.17151312046437922, 0.13522321325295103, 0.068747006595273552, 0.011764673252275867, 0.18718127547628682, 0.55916031961657786, 0.88175672278306205, -0.035207936995944634, 1.2382711063757532, 2.2308682152547106, -0.45285576127696175, 1.8796293205435037, 0.87793863876625788, 1.2204758332556218, 1.2538880645112747, 0.48207744089263271, 0.057947716710405182, -0.081309411554979547, -0.04943529640626837, 0.0008548789781495917, 0.10533560171090255, 0.13287714582076099, 0.20033550195294705, 0.19053499830855697, 0.40643673652513423, 0.38131881367792647, 0.93561154193068807, 0.78089304412102711, 0.49335337973436416, 0.19047751491127579, 0.098143635338704696, 0.029723534135297252, 0.13725228360851988, 0.19986443324539666, 0.17042917695126267, 0.13071733577885625, 0.15853680079243432, 0.28712786266920415, 0.099921469659732226, 0.94174974100731712, 1.3025551528258328, 0.79782532034480169, 0.64921445869288619, -0.93829697639874454, 2.5059762271849548, 1.3432089992982421, 0.45587938373772335, 0.46442894125096235, -0.096245457278447175, -0.11770539535407766, -0.13817032242271216, -0.0055442453146945193, 0.073000292812969436, 0.15561323638878341, 0.056601591846233208, 0.10095416296958591, 0.16385287994945555, 0.61326039955330602, 0.15435464918440814, 0.40096920495376004, 0.37880734420131523, 0.21821986304704899, -0.0027507666136306606, 0.032362324442924542, 0.093569887694449336, 0.19868696729956342, 0.25087704366702551, 0.23161854928103059, 0.17633262873947425, -0.041163173314526666, 0.30994126117363635, 0.97863365922997669, 0.83232217907475781, -0.31567909429421592, 0.66237039703709699, 1.810880881855315, -0.68744556831974835, 1.8448220136861369, 0.85744368463127729, -0.049302393683329601, -0.085302710712388291, -0.22929077462390179, -0.15255341311100187, -0.044245201781539331, 0.067046107651035594, 0.018548614200940294, -0.033110128022720509, -0.28158476919607578, -0.077796406016200054, -0.039386655944146774, 0.0080876817899761342, -0.029838116901173162, 0.065278519802780599, 0.09436442791977824, 0.019596242113334855, -0.040980231107276652, 0.08185944105119855, 0.15590400545853553, 0.2706202610478356, 0.24679565757292907, 0.051921880744651677, 0.20419289205443947, 0.55142162929109917, 0.15916183580862936, -0.32071019427277109, 0.46055159242136157, 0.36038108600874996, 0.60664479608939803, 1.4166629302294049, -0.2673333822918505, 0.93021729768322625, 0.46815371603113448, -0.3340126093430979, -0.15739380447541709, -0.13524198281736302, -0.020420877906040739, 0.014977564920405115, -0.069036032916578546, -0.22753898297998629, -0.29975286851709465, -0.43543489379944272, -0.16842937423862725, -0.28189859430095965, -0.14666574805210519, -0.1118471895929717, -0.024045478766081197, -0.013577696292883971, 0.016244981011212731, 0.071327529320409616, 0.14382895526034015, 0.1798858508922834, 0.17442784770871067, 0.16033553043559218, 0.23614535343159299, 0.13833755803781575, -0.14505648207394348, 0.017152293761212339, 0.40113579910946001, 0.16511529097099317, 0.23447144426975502, 0.28070253572415382, 1.1917438602108381, -0.21303758386300692, 0.32825613521942509, 0.066219257946262128, -0.27187198211633529, -0.066307061790987387, -0.028508101274429792, 0.026291702225849072, -0.056310601502134003, -0.1685787051145608, -0.27714150491609657, -0.24047492767194564, -0.32749231042729471, -0.19087946198724157, -0.26998035777525148, -0.17023093289450597, -0.076922699191602426, -0.016589123313677224, 0.01019520890848913, 0.084195395624057118, 0.095111634855381461, 0.12511007660405613, 0.1692284880759545, 0.22201073984886613, 0.053673315180547035, -0.19149929243694658, 0.083870133819847037, 0.21858339549377928, -0.0038697706067313737, 0.078542516808500606, 0.077143781693833222, 0.22624763974292969, 0.39965780946904111, 0.59191387060782175, -0.21969881405226852, -0.030574039563530501, -0.024970842739259945, -0.12562510603385371, 0.0052656766019967011, 0.015668866487966397, -0.038455609721168606, -0.079832857077626357, -0.11787169168831266, -0.15843188266072725, -0.092430559387194119, -0.25571779361731145, -0.33418602947193976, -0.37577894082796842, -0.17872521900892277, 0.025599835220983438, 0.036868954773614897, 0.063153633523536298, 0.064624059271844544, 0.12129220423951372, 0.1612208867083402, 0.13054366560393141, -0.0031358189183775171, -0.060276976551199596, 0.076248151019351354, -0.038784831650455917, 0.041725616486585258, -0.20186945117744698, 0.043591964044126186, 0.23914223921470992, 0.34013467279608772, 0.23157078159613964, 0.20755848067860685, -0.22107962950770196, -0.1025286187683216, 0.035725424097318138, -0.079299771847393549, 0.065331700319185088, -0.034956034554288036, -0.074021765277385243, -0.074018947274086908, -0.10375533557573537, -0.15489773108592672, -0.5463269466436349, -0.64123409592876401, -0.64559475523542686, -0.44280324831238616, 0.018445471788017767, 0.089840998861510313, 0.050489672984820259, 0.10094403852683856, 0.15540921558269635, 0.13542751998114574, 0.092098221631536192, 0.04873056181166658, 0.056474422402955825, -0.033352938195949811, -0.016925686434957218, -0.083060383383990535, -0.060406846903667433, -0.1226120784542102, 0.13458393481660744, 0.19090693911120402, 0.22215018549405383, 0.024793140061198739, 0.038718783333861403, -0.20853401810086775, -0.069635302172998029, 0.1064335953821621, -0.053345012614191917, 0.0099230741314936706, -0.15252816280103507, -0.18245346577017069, -0.29185933229148298, -0.3773223176299495, -0.94040577953315341, -1.0754357146022915, -1.1705860882999222, -0.77145898274834734, -0.079342592710004489, 0.05674840331570382, 0.14324588543960787, 0.12965098836906794, 0.14996801038078103, 0.10954302373131049, 0.12781279786870486, 0.11239290885891398, 0.0020423415177517252, -0.086381624051941733, -0.13062315548602732, -0.036665364495841957, -0.14926486203867201, -0.034593273427634852, 0.012219595757109143, 0.18300384413447635, 0.1958340625177715, 0.044601471225384402, -0.08740484292179726, -0.041369287190262873, -0.21341675767851565, -0.065677188177906895, 0.24144356597505726, -0.36750971454912684, -0.40026408654081164, -0.66562411016509171, -0.77336416928590557, -0.83899416480020206, -1.3372642957080858, -1.5719273509294132, -1.8005308506197781, -1.5408513794669076, -0.5531644985020383, 0.35609170613711127, 0.4116145942481696, 0.13448891283084041, 0.092477162456604783, 0.15737574769334561, 0.17138075095211283, 0.13259733500476581, 0.033522350558872378, -0.13112027137759125, -0.13478379984035713, -0.23416130311702804, -0.17379580132236419, -0.18974789333555622, 0.16649953505637016, 0.21963323601338522, 0.28775437300883855, 0.013318329293152468, -0.059449722211754409, -0.21633114300735917, 0.077936325689886982, -0.23415549346577649, -0.18415548289109335, -0.2220604628402971, -1.203289777252857, -1.2269479805895944, -1.3731553217305832, -1.2989780551182524, -1.64116294353798, -1.9821307035675826, -2.4053777736536572, -2.4259185480628087, -1.4297091333258454, -0.020800703185307738, 0.44907296092364196, 0.1858384756397643, 0.16308782299108818, 0.18780650312631128, 0.16876214929227229, 0.15032501459981898, 0.020281061259495404, -0.0073538013157964212, -0.13702193484548603, -0.059120611570979247, -0.18176695609293375, -0.10265025207047287, -0.00066962538216844151, 0.36158774196732713, 0.23695911940697681, 0.13767875532837892, -0.097481704015832935, -0.1639311930895031, -0.2137091594940832, 0.3107157406422304, -0.63196711118812665, -1.2839600483166249, -1.5107274159689543, -2.0001525985045667, -1.8007661961299211, -1.5766976273496909, -1.557678973082544, -2.4077419089431698, -2.9212825837849552, -3.1544891598954266, -2.0740660744196822, -0.81459993031793032, -0.047691255584086843, 0.26053579199245114, 0.24817234249560396, 0.16271946063708537, 0.1524538089963024, 0.12402459410134949, -0.017228379259870755, -0.059581713131428661, -0.15954900238017725, -0.17203834043004781, -0.03585192275390215, -0.13566388733867182, 0.18529272549107739, 0.32789481378377766, 0.46505832474821029, 0.14493915164048596, -0.068344938706060163, -0.20692971953005135, -0.13321306237600447, -0.22642518078961474, -0.16864865516591712, -1.9309474679838514, -2.6427456963680735, -2.0042907354579094, -2.0679079684570931, -1.6478932560447959, -2.2937692343725686, -2.7282977589825266, -3.4150761242194196, -3.3782856809989692, -2.2222759116849189, -1.2352596784322352, 0.12380717441380877, 0.15120100371873849, 0.22205496825803597, 0.13376820638889372, 0.16581598470153905, 0.21189843131890046, 0.1205613668903118, -0.11944152964360859, -0.2844407665876833, -0.38089709050886922, -0.1254790861941803, -0.12552132795948226, -0.087366382764606329, 0.2312435028685467, 0.42806542968274885, 0.31289505893871633, -0.016555865669298363, -0.15232124758199445, -0.18026213329416074, -0.054197237250036744, -0.92650772032563145, -1.6748432066634964, -1.9667941627002861, -2.2073957813815404, -1.3988308931230464, -2.1872173045798968, -1.7701160974209202, -2.3995834975192563, -3.1079150257531603, -2.2759627738397428, -1.9867837341406698, -1.1991385138433992, 0.25261423619714135, -0.086883949036943853, 0.13841341497021575, -0.013991851319408978, 0.15451076629740176, 0.20777584924549833, 0.37732986906226257, -0.1983231816223982, -0.064701320250050057, -0.75809939060751286, -0.0056552094670687921, -1.0666730319382445, 0.5168021952817432, -0.059867579479421881, 0.57704911017089144, 0.073612585805408248, 0.16986402710259826, -0.27685168579682035, 0.23610433796619823, -0.25969657852055217, -0.34105804260323408, -2.3692424085383355, -0.13683987631719494, -0.60631225487832385, -3.0428213499062093, -1.4302518240108333, -1.0960340088024054, 0.33378719268138207, -1.462532482812221, -1.1311602269894572, -0.42160647485916913, -0.77282398113385165, 0.051358135035689895, -0.12451483496808054, 0.074560604448017945, -0.071400263514198398, 0.12710467168208478, 0.20183473326046905, 0.53582170174408328, -0.31918913661037829, 0.028167647498415164, -0.49375784053277538, -0.67155961060436897, -0.79896724757297555, -0.015611524439376389, 0.074148205591898927, 0.44602122877613765, 0.17221102955705844, 0.070854449837212188, -0.07178740615442418, 0.043350794355038948, 0.23127204626685866, -0.49437187443974595, -1.3068505835636535, -0.50505328014021666, -0.55162352804951942, -2.4095702665388461, -1.9119199452512292], "bottom": {"real": [4046.4241509904555, 28839.973879370627, 10191.512031448321, 4381.7455807293263, 2071.9548413915022, 1107.2825867454831, 528.34551553150311, 308.97330299730402, 185.81061014820492, 130.08108126519062, 87.65365496956511, 59.09553675383809, 43.506269455848397, 34.575222311681692, 30.798097452905282, 25.523061346781674, 25.951646714603154, 25.523061346781589, 30.798097452905211, 34.575222311681706, 43.506269455848361, 59.095536753838019, 87.653654969565167, 130.08108126519082, 185.81061014820492, 308.97330299730379, 528.34551553150334, 1107.2825867454833, 2071.9548413915031, 4381.7455807293318, 10191.512031448323, 28839.973879370646, 13493.224333003216, 16392.519951456161, 4871.8353885075767, 1571.3337493887716, 567.64096645153529, 373.6703632325283, 244.24660034041102, 142.79597933554817, 106.13580676907658, 75.858347622710525, 58.061322564190078, 39.854538473021549, 30.569538051408923, 25.094853941398878, 22.929757321982656, 20.808198660555963, 22.04888812794956, 23.622937534136554, 29.138683151168021, 38.082981074479143, 54.39934218587819, 77.826621492011839, 121.61239162949131, 177.63416429867098, 254.30481783551838, 430.47940336338183, 664.63525809030591, 1219.8477670929726, 1935.5749815900854, 3358.0980991141623, 6069.2175916916049, 8660.7039291701622, 15384.540019848313, 11175.737303494303, 2216.879483433469, 674.59859086304846, 308.57630937597452, 222.13525013253278, 144.62539946693838, 89.351789047349641, 66.200283784031811, 53.5880480094322, 38.104835124660447, 27.112718944065261, 23.033311632510099, 19.858863545618888, 19.408029208714364, 19.38215160767772, 20.871711217553681, 24.726583224259915, 29.429525390428484, 39.688247321389746, 54.026677368666491, 71.509189516532359, 109.7023701375058, 145.30501493896827, 183.84765943176359, 237.38092500065588, 353.51632607639505, 531.27032729465725, 719.17065363709912, 1367.9024800373177, 2857.7322293344778, 8625.0149751320059, 3926.8611003464521, 2444.3527388912776, 1028.8359899085383, 585.56166554295623, 332.57137935864864, 180.13762334769046, 105.17011934648103, 61.496465220623485, 45.504823244138095, 37.908460172493172, 30.846794326525625, 21.222093075405745, 18.718288087401802, 17.679602313216872, 17.409839934721365, 17.794391783727544, 18.55926931620083, 21.348409581307148, 24.39997962145603, 30.767061622228063, 38.103008129659166, 44.81251118779231, 61.577721983396955, 87.291485884508717, 106.99539363556599, 134.18057082099898, 169.37440787587974, 269.99443977661724, 364.56248799144709, 674.50839546082307, 1521.022929703357, 2634.7343778883865, 2024.849011267275, 1926.8239401023498, 1491.9478410044117, 611.83627918833088, 316.43682665588744, 155.99683828976544, 89.673379864750018, 50.013293885425135, 37.528009707176061, 32.4518569290627, 24.966146703509182, 19.130394004010906, 15.343856356149828, 14.843145659919786, 14.861292517540363, 15.036681247518919, 15.312687438440403, 17.138709070816013, 19.446116741695533, 22.850207518010233, 27.457440287528367, 32.581505308308088, 40.985078317877736, 54.412823137373685, 75.762437644265901, 94.733059346587339, 128.1467358253355, 182.29010502256293, 275.95498073034861, 527.32695578494008, 1132.5867520786235, 1866.4077869841046, 2266.7457843108455, 2107.8495169895441, 1234.6592459623437, 673.70954283481137, 266.6693703142779, 139.47307538222793, 66.730731113314476, 41.917980917088734, 31.2590211502941, 26.786032891522527, 20.35627716260823, 16.038244917569745, 14.499148814332527, 13.459360575928033, 13.144389071570192, 12.567429683418663, 12.230328765246885, 13.466217665828195, 15.328301760046475, 17.144679989146308, 19.68756841312236, 24.074134044705339, 32.727034612286992, 43.026808431859955, 59.193773906230369, 78.820512563030945, 92.994178544706472, 120.42091176843755, 201.9182636225097, 436.44287859172925, 877.8862778005057, 1439.6385876846614, 1649.9911393469049, 1699.4038415062987, 1039.2560892520887, 495.51661529689329, 235.81544665938515, 113.58561083280532, 60.921551746622946, 35.725757089786256, 25.024628727892466, 22.490208420088727, 17.759823791920191, 13.543616943986416, 12.938917306264663, 11.956364952724385, 11.421939705679733, 11.372903592178258, 11.032765269291394, 11.408229662647633, 12.481114469594095, 13.60275540468532, 14.91952183557448, 17.807798659576154, 23.277252196336814, 31.950664619854233, 47.416694920263616, 56.268912844615144, 64.959626427586997, 85.070809539003847, 130.82046704446515, 257.67571935262418, 627.46721263291658, 1194.1693767483914, 1080.1900960853154, 902.674413704009, 600.04055794738224, 333.23520458041997, 166.5653831933532, 88.946305547571072, 50.717393232745131, 31.897215329939996, 23.060146944216118, 18.579780562544169, 15.572760511446054, 13.273777678692191, 12.224913053368416, 11.68638594982613, 10.392044527527784, 10.422646713468026, 10.113778554702394, 10.225072497047023, 10.776357928238541, 11.471833692521193, 12.585855785544721, 15.131216045563061, 18.856673404562432, 24.858220592568422, 32.657280802203381, 43.037987696240307, 51.536289299313914, 59.08796022590117, 89.418846636419246, 168.44781050782811, 382.14409608709747, 745.27797642375992, 544.93523795856049, 546.63255943550212, 362.69938393816085, 222.4530875664997, 124.78354764285341, 69.155510455436144, 41.705006957506896, 26.952419331651356, 19.778555411511121, 17.743475715717917, 14.471795156401063, 12.765457059373892, 11.899864411981882, 10.85818004844373, 10.325708895539952, 9.5692719745256376, 9.2113480820863387, 9.0680329970290128, 9.7734432560375648, 10.488284402310196, 11.323197140674811, 13.23504887223821, 16.674941080314653, 20.771526297093455, 27.569417818570489, 33.103068481604573, 37.131609415223707, 47.964760430736398, 66.578817507603574, 119.94841754808802, 237.18123750436465, 409.50889944188236, 307.01018353832677, 288.66760291638428, 236.16368190120858, 154.32114106589464, 92.303773245695481, 55.468009578938926, 35.843010431224045, 24.692475316947775, 18.31794202383119, 15.815283825259236, 13.970653175227845, 12.321358605090134, 11.166914874614415, 10.532076178141539, 9.9738582700772742, 9.4395532322934326, 8.8524779931517035, 8.5960325163902862, 8.7233150994257276, 9.4605465058702709, 10.702831587760128, 11.695932356823622, 14.406509159208545, 18.893042693096525, 25.031728162044864, 28.237283751764654, 32.110154440123182, 38.781782989560291, 56.412497176172337, 92.156945934839797, 157.10935603874077, 244.24925081430641, 218.20881258539546, 216.90433976724358, 169.13695858014356, 112.62100758585845, 68.70530790516959, 45.982361360241526, 32.725373555898344, 22.221572369125827, 17.135020014783734, 14.281960328360523, 12.699315839076576, 11.637118060780567, 11.004832210877884, 10.393382355075936, 9.6259602166533789, 8.7652013845999868, 8.5650120282362092, 8.5854476517741869, 8.1851518687531879, 9.1270872628576836, 9.8383977040140795, 11.693775785132257, 13.287947209975439, 16.544820171465705, 21.672488061489553, 27.762087103200397, 29.796933806391767, 35.443188490268959, 51.826480475596476, 76.692136618774384, 114.45554660359461, 172.81330831382385, 150.57608076172548, 151.07347077509746, 119.80060075739978, 84.307080896770614, 55.59442395215062, 38.954469932130465, 27.855857296119165, 21.147383956632677, 16.095362427853317, 14.114901096214023, 12.272097096384341, 11.279235865220194, 10.45557624282722, 10.213403723979409, 9.4352540004127672, 9.059591562681522, 8.4285767722705884, 8.2189676916739653, 8.2483207838968369, 8.7272133851807343, 9.3853417746714207, 10.436988631508529, 11.737372360714012, 14.160123000210135, 18.959579242189701, 24.173697545434358, 27.627516713161423, 33.591531685669004, 45.297439984936638, 65.897539497304663, 88.610944521286385, 122.51594786973793, 102.9717174324289, 99.771144171631136, 80.254636450195903, 61.009511746666256, 44.786912913807178, 34.271024500323179, 25.65851527359349, 19.184194785168692, 15.369946764821139, 13.384363033613122, 12.174478369218367, 10.905903566261369, 10.181651684644681, 9.6408755952533021, 9.5742304532973588, 8.9763308722412098, 8.5493032688069821, 8.0644484764315241, 8.4276865988342919, 8.7290963397981098, 9.1210926884309647, 10.045472592156113, 11.11042960636143, 12.723025686618605, 15.905816263070196, 20.709491045732211, 24.791931496783274, 30.865414152401307, 41.835714185623189, 55.039237230593706, 69.947250962386548, 86.305656954166849, 70.246077416654487, 70.163190967731239, 60.941585457354833, 46.988681551588527, 37.426824229947464, 31.105114654781531, 24.717957509432271, 18.191253220796238, 14.40571246916225, 12.794837539520243, 11.45286867499644, 10.555233980671725, 10.138595490186225, 9.7617939326440126, 9.2945114067021706, 9.1978519570897408, 8.5269704682665068, 8.3694986947733589, 8.3900850601209847, 8.9019780110016278, 9.4993224051697176, 10.189344774081897, 11.038776504531349, 12.139382952337165, 14.296273465828305, 18.325479810549485, 23.245126565071455, 28.658675517780157, 38.227879918404916, 50.026933715114076, 59.913478880080035, 67.142884728350211, 60.673200962744687, 56.006191670589025, 48.952383807337931, 41.877289900824969, 35.563752651142892, 29.381802508508265, 23.323351055229473, 18.385352146785323, 14.386074460433269, 11.971768024825069, 10.813949701229296, 10.104265892334448, 9.7873837360525968, 9.7876450182420029, 9.3736570608881902, 9.1067837514303367, 8.8782742568475381, 8.4108604655156682, 8.5145291911969032, 9.1444638633789328, 9.5903687569174956, 10.050972673200409, 10.599176866339214, 12.029252308933458, 13.885440808202775, 16.933840539652099, 20.949767453800131, 27.392670445772911, 35.246945811604022, 44.844494652773115, 53.527920120533459, 59.511906457614529, 53.048047546158344, 49.667902591204928, 45.161821768091436, 39.040569237963304, 34.153498370766542, 28.812200326236947, 21.915204963295363, 16.825291542921018, 14.194481006765461, 11.707465544074312, 10.438485210613589, 9.8151245648739263, 9.283134914271356, 9.0821420578250009, 9.0470505359514384, 9.0924089982219396, 8.8466944313913523, 8.4735939062643375, 8.4980702515250215, 9.0113445722107848, 9.2898710387292809, 9.9575678866832327, 10.426127211956205, 11.223822839806607, 13.773251241827809, 16.688691177663944, 20.746301629724744, 26.320191080313084, 33.979868436578599, 42.0788988747152, 48.313306819757166, 52.481937610238305, 49.070609767594966, 49.766679020971374, 46.544272852318578, 40.229040805773415, 32.559839637781486, 26.180018982316895, 21.083604085221012, 16.97356072267355, 13.301411970448795, 11.264067238060504, 10.255581922596939, 9.6536213682112031, 9.2153774062964224, 8.7468110761182825, 8.4356542718375049, 8.7323846743622209, 8.8458599078381237, 8.7323846743622209, 8.4356542718375032, 8.7468110761182896, 9.2153774062964278, 9.653621368211212, 10.255581922596944, 11.264067238060512, 13.301411970448795, 16.973560722673543, 21.083604085221008, 26.180018982316881, 32.559839637781494, 40.22904080577338, 46.544272852318571, 49.766679020971331, 53.048047546158344, 52.481937610238198, 48.313306819757052, 42.0788988747152, 33.979868436578577, 26.320191080313087, 20.746301629724748, 16.688691177663959, 13.773251241827822, 11.22382283980661, 10.426127211956201, 9.9575678866832256, 9.2898710387292791, 9.0113445722107919, 8.4980702515250268, 8.4735939062643357, 8.8466944313913505, 9.0924089982219467, 9.0470505359514402, 9.0821420578250063, 9.2831349142713542, 9.815124564873928, 10.438485210613582, 11.707465544074319, 14.194481006765461, 16.825291542921001, 21.915204963295366, 28.81220032623694, 34.153498370766549, 39.040569237963282, 45.161821768091372, 49.667902591204999, 60.67320096274468, 59.511906457614572, 53.527920120533402, 44.844494652773072, 35.246945811604007, 27.392670445772925, 20.949767453800135, 16.933840539652095, 13.88544080820277, 12.029252308933453, 10.599176866339214, 10.0509726732004, 9.5903687569174885, 9.1444638633789328, 8.5145291911969103, 8.4108604655156718, 8.8782742568475346, 9.1067837514303385, 9.3736570608881848, 9.7876450182420012, 9.7873837360526021, 10.10426589233446, 10.813949701229305, 11.971768024825074, 14.386074460433273, 18.385352146785333, 23.323351055229466, 29.381802508508251, 35.563752651142877, 41.877289900824962, 48.952383807337874, 56.006191670588912, 70.246077416654288, 67.142884728350111, 59.913478880079964, 50.026933715114062, 38.227879918404923, 28.658675517780189, 23.24512656507147, 18.325479810549478, 14.296273465828305, 12.139382952337156, 11.038776504531354, 10.189344774081897, 9.4993224051697229, 8.9019780110016331, 8.3900850601209847, 8.3694986947733572, 8.5269704682665068, 9.197851957089739, 9.2945114067021635, 9.7617939326440144, 10.138595490186225, 10.555233980671725, 11.452868674996441, 12.794837539520238, 14.405712469162248, 18.191253220796249, 24.717957509432264, 31.105114654781534, 37.426824229947449, 46.988681551588492, 60.941585457354776, 70.163190967731154, 102.97171743242879, 86.305656954166807, 69.947250962386491, 55.039237230593784, 41.835714185623168, 30.865414152401325, 24.791931496783278, 20.709491045732214, 15.905816263070196, 12.723025686618604, 11.110429606361421, 10.045472592156107, 9.1210926884309735, 8.7290963397981116, 8.4276865988342937, 8.0644484764315258, 8.5493032688069821, 8.9763308722412134, 9.5742304532973623, 9.6408755952533056, 10.181651684644681, 10.905903566261369, 12.174478369218367, 13.384363033613125, 15.369946764821144, 19.184194785168689, 25.658515273593498, 34.271024500323144, 44.78691291380715, 61.009511746666178, 80.25463645019579, 99.771144171631008, 150.57608076172505, 122.51594786973776, 88.610944521286228, 65.897539497304635, 45.297439984936574, 33.591531685669025, 27.627516713161402, 24.173697545434354, 18.959579242189701, 14.160123000210131, 11.737372360714007, 10.436988631508525, 9.3853417746714172, 8.7272133851807325, 8.2483207838968262, 8.2189676916739689, 8.4285767722705902, 9.0595915626815202, 9.4352540004127654, 10.213403723979411, 10.455576242827226, 11.279235865220191, 12.272097096384336, 14.114901096214016, 16.095362427853331, 21.147383956632702, 27.855857296119162, 38.954469932130408, 55.594423952150585, 84.307080896770429, 119.80060075739968, 151.07347077509721, 218.20881258539524, 172.81330831382382, 114.45554660359451, 76.692136618774427, 51.826480475596433, 35.443188490268959, 29.796933806391745, 27.762087103200372, 21.672488061489549, 16.544820171465698, 13.287947209975444, 11.693775785132251, 9.8383977040140866, 9.1270872628576836, 8.1851518687531897, 8.5854476517741798, 8.5650120282362074, 8.7652013845999939, 9.6259602166533789, 10.393382355075921, 11.004832210877884, 11.637118060780562, 12.699315839076572, 14.281960328360505, 17.135020014783741, 22.221572369125806, 32.725373555898322, 45.982361360241477, 68.705307905169562, 112.62100758585837, 169.13695858014344, 216.90433976724287, 307.01018353832563, 244.24925081430612, 157.1093560387404, 92.156945934839754, 56.412497176172316, 38.781782989560298, 32.110154440123168, 28.237283751764654, 25.031728162044857, 18.893042693096504, 14.406509159208543, 11.695932356823613, 10.702831587760132, 9.4605465058702674, 8.7233150994257205, 8.5960325163902844, 8.8524779931517052, 9.4395532322934272, 9.9738582700772813, 10.53207617814155, 11.166914874614413, 12.321358605090143, 13.970653175227838, 15.815283825259229, 18.317942023831186, 24.692475316947778, 35.843010431224023, 55.468009578938812, 92.303773245695368, 154.32114106589427, 236.16368190120789, 288.66760291638354, 544.93523795856049, 409.50889944188282, 237.18123750436465, 119.9484175480882, 66.578817507603574, 47.964760430736455, 37.131609415223693, 33.103068481604559, 27.569417818570489, 20.771526297093434, 16.674941080314646, 13.235048872238199, 11.323197140674804, 10.488284402310184, 9.7734432560375648, 9.068032997029011, 9.2113480820863387, 9.5692719745256465, 10.325708895539957, 10.85818004844373, 11.899864411981884, 12.765457059373892, 14.471795156401072, 17.743475715717903, 19.778555411511121, 26.952419331651342, 41.705006957506882, 69.155510455435987, 124.78354764285341, 222.45308756649936, 362.69938393816079, 546.63255943550212, 1080.190096085312, 745.27797642375788, 382.14409608709587, 168.44781050782805, 89.418846636419218, 59.087960225901135, 51.536289299313893, 43.037987696240307, 32.657280802203374, 24.858220592568383, 18.8566734045624, 15.131216045563052, 12.585855785544725, 11.471833692521184, 10.776357928238532, 10.225072497047019, 10.113778554702403, 10.422646713468026, 10.39204452752778, 11.686385949826136, 12.224913053368411, 13.273777678692191, 15.572760511446033, 18.579780562544141, 23.060146944216122, 31.897215329939918, 50.717393232745025, 88.946305547570788, 166.56538319335294, 333.23520458041884, 600.04055794738088, 902.6744137040065, 1649.9911393469013, 1194.1693767483896, 627.46721263291568, 257.67571935262464, 130.82046704446515, 85.070809539003903, 64.95962642758694, 56.268912844615201, 47.416694920263595, 31.950664619854226, 23.277252196336782, 17.807798659576147, 14.919521835574468, 13.60275540468532, 12.481114469594081, 11.408229662647638, 11.032765269291394, 11.37290359217827, 11.421939705679749, 11.956364952724407, 12.938917306264656, 13.543616943986398, 17.759823791920141, 22.490208420088635, 25.024628727892473, 35.725757089786228, 60.92155174662291, 113.58561083280503, 235.81544665938503, 495.51661529689198, 1039.2560892520876, 1699.403841506296, 2266.7457843108423, 1439.6385876846614, 877.88627780050422, 436.44287859172971, 201.91826362250967, 120.42091176843758, 92.994178544706443, 78.820512563031016, 59.193773906230312, 43.026808431859891, 32.72703461228695, 24.074134044705318, 19.687568413122339, 17.144679989146301, 15.32830176004647, 13.466217665828177, 12.230328765246888, 12.567429683418707, 13.144389071570203, 13.459360575928054, 14.499148814332536, 16.038244917569731, 20.356277162608194, 26.786032891522385, 31.259021150294068, 41.917980917088691, 66.730731113314405, 139.47307538222745, 266.66937031427761, 673.70954283481024, 1234.659245962343, 2107.8495169895405, 2024.849011267276, 1866.4077869841062, 1132.5867520786235, 527.32695578494054, 275.9549807303485, 182.29010502256293, 128.14673582533564, 94.733059346587495, 75.762437644265887, 54.412823137373678, 40.985078317877729, 32.581505308308067, 27.457440287528364, 22.850207518010212, 19.446116741695526, 17.138709070816009, 15.312687438440404, 15.036681247518965, 14.861292517540395, 14.843145659919811, 15.343856356149836, 19.130394004010878, 24.966146703509185, 32.451856929062608, 37.528009707176075, 50.013293885425036, 89.673379864749862, 155.99683828976509, 316.43682665588739, 611.83627918833008, 1491.9478410044112, 1926.8239401023493, 3926.8611003464503, 2634.734377888386, 1521.0229297033557, 674.50839546082398, 364.56248799144686, 269.99443977661741, 169.37440787587963, 134.18057082099915, 106.99539363556599, 87.291485884508702, 61.577721983396906, 44.812511187792317, 38.103008129659166, 30.767061622228066, 24.399979621456033, 21.348409581307155, 18.55926931620083, 17.794391783727576, 17.409839934721397, 17.67960231321689, 18.718288087401788, 21.222093075405763, 30.846794326525586, 37.908460172493079, 45.504823244138095, 61.496465220623335, 105.17011934648093, 180.13762334768973, 332.57137935864853, 585.56166554295532, 1028.8359899085369, 2444.3527388912739, 15384.540019848309, 8625.0149751320096, 2857.732229334476, 1367.9024800373199, 719.17065363709889, 531.27032729465782, 353.51632607639499, 237.38092500065625, 183.84765943176362, 145.3050149389683, 109.70237013750581, 71.509189516532217, 54.026677368666469, 39.688247321389689, 29.429525390428473, 24.726583224260004, 20.871711217553678, 19.382151607677731, 19.408029208714364, 19.858863545618949, 23.033311632510113, 27.11271894406525, 38.10483512466044, 53.588048009431979, 66.200283784031811, 89.351789047349371, 144.62539946693829, 222.13525013253218, 308.57630937597452, 674.59859086304834, 2216.8794834334685, 11175.737303494294, 13493.224333003214, 8660.703929170164, 6069.217591691604, 3358.0980991141591, 1935.5749815900851, 1219.8477670929722, 664.63525809030602, 430.47940336338263, 254.30481783551838, 177.63416429867087, 121.61239162949126, 77.826621492011839, 54.399342185878204, 38.082981074479164, 29.138683151168006, 23.622937534136597, 22.04888812794956, 20.808198660555991, 22.92975732198266, 25.094853941398917, 30.569538051408909, 39.854538473021513, 58.061322564190043, 75.858347622710383, 106.13580676907651, 142.795979335548, 244.24660034041099, 373.67036323252819, 567.64096645153575, 1571.3337493887695, 4871.835388507573, 16392.519951456165], "imag": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, "imag": [0.0, -1.343901621327011, 1.7218333249394571, 1.3937858919791224, -0.90478486773452105, 0.99560837280124848, 0.13374486301187097, 0.79781790598886937, 0.081235430122062774, 0.47338465820086184, -0.078534664439216209, 0.29500119331967589, -0.62479162763734286, 0.29517170974740459, -1.8712573358384692, 0.14096520515743682, 0.0, -0.14096520515741828, 1.8712573358384816, -0.29517170974737811, 0.62479162763733731, -0.29500119331966146, 0.078534664439223051, -0.47338465820085962, -0.081235430122062774, -0.79781790598886004, -0.13374486301187369, -0.99560837280124848, 0.90478486773452083, -1.3937858919791226, -1.7218333249394557, 1.3439016213270112, 1.5871307700950068, 0.56370110925886319, 1.2603198064423482, 2.9317402483699255, -0.84090846562801591, 0.28395441021550888, 1.0393523450590114, 0.83104911233799517, 0.57334259680943678, 0.30043904784975134, 0.29266755430531527, 0.082930104064024152, -0.36502835420313379, -0.76213554623438207, -0.54316838647957832, -0.66028179246101926, 0.20250391456576916, -0.059393044635645806, 0.9730252602081445, -0.01782962412134724, 0.18933865423621773, 0.011846708470834844, 0.014269719747672759, -0.16281560265463554, -0.24410560657714067, -0.34963232308526365, -0.32234943120999277, -0.6691127915152365, 0.14162995430492473, -0.96909874957635578, -1.0446282489208472, 1.3612809629252947, 0.70464907960903156, 1.644656498115789, 1.457626495523533, -0.6840361527612806, -0.68147470897196205, 0.73118573872942638, 1.2398159392319572, 1.2736175855463174, 0.65550663858936109, 0.45897332874861019, 0.24948129249627171, 0.22959418801218681, -0.67355449112520815, -0.78917379441405089, -0.83366315887398401, -0.022795944141155908, 0.15753196960053301, 0.50836195321582456, 0.16292155588892338, 0.14047533322536612, -0.029004083819245446, 0.042892010327960466, -0.084780328674450303, -0.13217055914433321, -0.30971168558439593, -0.44061350110378666, -0.59380988893293396, -0.46719027726302742, -1.2068396187631398, -0.94969408752542273, 0.28960616895899027, -0.40038203546320883, 0.55620249274438927, 0.14065731983379595, 1.390858139437829, -0.67833342052765033, -2.0926714021100303, 1.5120873610545131, 1.7251253398279642, 1.0499886203647506, 0.6413261932720733, 0.43315407205712014, 0.32584150801434064, 0.17968537990933128, -0.27887473465086693, -0.72646685328097149, -0.95200274282553721, -0.38747270801185796, 0.31172559850957127, 0.3167238274644899, 0.25925756638025876, 0.20404659434537992, 0.19201780058118942, 0.0025274006864131854, -0.20254250312507205, -0.30146681989018398, -0.45156398868756126, -0.71583959398165176, -0.78636343748881254, -1.3089140888320636, 0.41393919421363429, -0.92308378001125058, -0.96086768695066838, 0.99489496750979101, -0.39381772120025876, -0.59264738582705545, -1.1161873115341066, -0.38954314931717815, 0.15776662530084892, 0.39428020304678685, 1.7089894615168126, 0.92868491010646026, 0.350973234838865, 0.32125288047075679, 0.23669588269358602, 0.19592809956108717, -0.32646969875093118, -0.5617213523679232, -0.76596137582739887, -0.4848448097808058, 0.0035984972735877987, 0.36234031342999445, 0.02584515038201295, 0.38132345964413561, 0.29172235696712762, 0.10460468586389386, -0.14942504329756173, -0.23406484190568319, -0.59702583417138988, -0.64791716309340031, -1.1972380302487249, -0.37081056871520385, 0.31028937719203986, -0.11181138224479611, 0.050224150041196312, -0.59242819035998506, -0.4703174557375312, -0.55567065990801068, -0.18073895078348806, -0.07286620180284567, 0.9080135456055427, 1.3448759333642528, 0.56391746646770735, 0.68824563709365816, 0.27054447491545203, 0.18555506064923469, 0.21628766080629094, 0.089227696371118645, -0.1330464412169812, -0.51044075389216448, -0.57482956329522528, -0.49992842173388902, -0.0088882269741786465, -0.026119953804469152, 0.16649307508904443, 0.18021017930701566, 0.24129551707937363, 0.051414766220490717, -0.054409237913703348, -0.21354052285348152, -0.34065461819243753, -0.83215952955458006, -0.65455151443418824, -0.51711748874533736, -0.34193161983249143, 0.25991967791421511, -0.31922838969311168, -0.25096233231074472, -0.019538834540300996, 0.23386297177233037, 0.39736821511961345, 0.72603823847118543, 0.8168297825020705, 1.0763583447726135, 0.80611388127401196, -0.023349196100613815, 0.09911450222934183, 0.11136104528246665, 0.11912886110102348, 0.1510441091194204, -0.10294245821664937, -0.34339582552474845, -0.46071517851602106, -0.27454988477746128, -0.021291149638310566, 0.035818571775215378, 0.08165077597052256, 0.19593247304969552, 0.16021249355536668, 0.073411101811457824, -0.094413661460628892, -0.14774431296435828, -0.3788677957633147, -0.38953231590523063, -0.62892221563014938, -0.80219655994233319, 0.19764870263775744, -0.28620163890053252, 0.041738811618785537, -0.047502831671303453, 0.42759360787810174, 0.44353340330745888, 0.61232760985457502, 0.70207820166905466, 0.72192603666395361, 0.63928791416871467, 0.32589261306510392, 0.17268517789923485, -0.11832252230060911, 0.049391580905339259, 0.12347320818582375, 0.064697981434016727, -0.0067102091687047593, -0.27370819742589092, -0.26939466873920287, -0.25176222060998998, 0.0081310228529853402, 0.013089808045657288, 0.185105158015618, 0.11713478908555769, 0.20974664985683705, 0.048745778368168922, -0.0069359534603168627, -0.18083894269546222, -0.15907734702039189, -0.30490326972545728, -0.49525043110711681, -0.20633977154543071, -0.28929558460304977, 0.017255660868048289, 0.089250558912840242, 0.34349774583430781, 0.38277205043588519, 0.56772102070325814, 0.48811475177501612, 0.43659704639067964, 0.38858095560717315, 0.35469216713625445, 0.11095078972724678, -0.050354098986562471, 0.010426074631633324, -0.023032548262322892, 0.068558023511485697, 0.1199625535177883, -0.0044347552049944488, -0.14323623171577524, -0.2742488887234425, -0.15059247824174998, -0.18695930341705305, 0.068136880204083733, 0.049162011568203073, 0.16362595169702937, 0.078325720975578078, 0.11153460033842358, -0.10346450949096449, -0.039250261082814021, -0.12027128091306288, -0.23113762225192683, -0.07885965728132803, -0.25982980909746989, -0.11219308206942701, -0.19372413199270677, 0.1843821378255476, 0.22544536191476028, 0.22838873802709003, 0.11856768480607156, 0.20011010622694389, 0.16443500436191505, 0.13441036107213369, 0.15600995797323181, 0.029984980792926118, -0.017950425588896139, -0.095997178609832007, 0.045815559155676679, 0.050600401411128038, 0.062555070152262096, 0.095362679574156284, -0.25884721081868178, -0.19352665675464722, -0.35758313393883445, 0.057241994101256972, -0.074489797691212556, 0.15760636776309309, 0.077110294424560424, 0.21793581355625327, -0.085384156728057797, 0.054278095118519401, -0.063513516552257218, -0.13925876777247995, -0.053090482149624127, -0.088550664314818353, 0.097053178020475875, 0.021982682491266895, -0.032057043772553598, 0.011606155190390474, 0.20297398899260674, 0.087137707937781944, 0.14235450986309658, -0.0066344290522644652, 0.069443551113326479, 0.037974760198136455, 0.02723212012252952, -0.030406089689394462, -0.062891439826322393, -0.033462702565164315, -0.13091343010011852, 0.18662643567548856, 0.14580799486104234, -0.055902479292620696, -0.12813917376287484, -0.43706544906097528, -0.097926711565598012, -0.17130544619864244, 0.30727693305691806, -0.2953735036217468, 0.22056405751825581, -0.16529753202987246, 0.34047455883436423, -0.0020829156573361745, -0.14775664020163451, -0.074518551996532553, -0.14850320507536691, -0.057283952975165524, 0.064665418468806371, 0.23511892751228192, 0.11870789775778592, 0.0625549454189092, -0.031298024311669038, 0.0064402102662661845, -0.079082063664820082, 0.0553675188881671, 0.025089334126077875, 0.063800091749494747, 0.015988824093570549, -0.048545356942180602, -0.11558972094679192, -0.097487343329346582, -0.00049492928166827938, -0.18157168721539482, 0.33942288969170681, 0.30522386319855388, -0.54639589537101751, 0.013830571830100688, -0.38850732372171304, 0.223075916963486, -0.31865288748874443, 0.25745374979707547, -0.81885347149607268, 0.50855168910609783, 0.20195166784419227, -0.069785743671890318, 0.050884179954965268, -0.18377202523753672, -0.17303565260659334, -0.15924096907201105, 0.092146932205194695, 0.26379835890783954, 0.35934781180257075, 0.24329566614587647, 0.18564601960109514, 0.24223475523068938, 0.28967646870392649, 0.15967526911861643, 0.22365254766781259, 0.12185893624650075, 0.070105150765122456, -0.045495054958742086, -0.13016925945874308, -0.12331107551299306, -0.096585989040329473, 0.22919036999990153, -0.39865574246315477, 0.3675558227752026, 0.45597314967635888, -0.93227329954448013, 0.32110784375924512, -0.59160024067907024, 0.39469180639349893, -1.5810043928614619, 0.71926168426275527, -0.095920343398476549, -0.084877145937512208, 0.40399573862898452, -0.041743397742653787, -0.10303861084867461, -0.21220001866353477, -0.17318676777643013, 0.015792824133968684, 0.37994714934071439, 0.4573031649737595, 0.48491463219236358, 0.278045596991639, 0.33099751793182702, 0.073461819418744675, 0.30445717300203839, 0.34815332433352569, 0.27336662525128713, 0.050113511094951838, -0.059405844632707393, -0.16261143474742229, -0.10891422081227681, -0.075070297171157971, 0.15348950297637756, 0.63132994551184463, -0.93604459898777692, 0.42325697055405742, 1.1782712312395338, -1.6700526640562563, 0.67307548012867768, -2.0365876460209691, 0.69665186973993298, -0.3990336398782886, -0.77751104168880314, 0.5628167675812451, 0.044468991083659551, 0.081278132745909976, -0.070993394358423723, -0.091852860366211056, -0.10956166698887557, 0.072941493094735049, 0.35167328896657912, 0.63488067579895824, 0.56199684605205058, 0.60627707274502263, -0.018970197624819329, 0.37668655809680845, 0.22317003729918369, 0.17596357423928666, 0.18202109891962201, 0.038230887694388455, -0.10475039750351335, -0.15123171993121909, -0.11278544639649389, 0.054110895720760221, 0.23852479976301316, 0.30802887330694756, 0.9587111952302938, -1.4503952980081434, -0.061458391503499687, 2.1389978076683529, -3.5142346308062073, 1.6764175122847729, -0.63252660757872936, -1.1970497991660358, 0.46027494328631885, -0.38868529039399474, 0.063066133758830412, 0.085024034480974467, 0.047630852690686495, -0.022775175196356016, 0.011847923870825085, 0.13095780969018636, 0.39870906011464996, 0.54100133271840178, 0.62859642257501991, 0.12859489098386362, -0.17371304193339687, -0.77135662792152559, -0.35696964892202537, -0.15350152251372465, -0.081108427029901481, -0.12890403553126065, -0.14048874638904316, -0.18368108831833277, -0.13143015225876853, 0.037318187986402011, 0.39815350666418903, 0.44685069559938601, 0.29854169122462937, 1.0193515924216456, -2.1696976832709978, -1.5476694374721527, 4.1115013597100623, -1.6066056279080296, -1.1129988398741206, 0.94641351902713078, -0.66464487182371434, -0.22405122030787003, -0.16845135046504239, 0.10281428632219461, 0.12776142939872864, 0.10903691838775739, 0.097477148948306502, 0.19622512970077355, 0.37581890109000032, 0.58152174984392169, 0.57588244896775898, 0.56835821427965394, 0.0, -0.075660591040101741, -0.5319087481065502, -0.49066506338765509, -0.25388521774435541, -0.17759782612549996, -0.17342105765811164, -0.17172379067488869, -0.17163733194043357, -0.0096917261033460274, 0.23320936684713756, 0.61544163247884909, 0.23031783223894131, 0.4504667163321609, -0.25422186154383031, -1.2338903723029762, 0.0, 1.2338903723029679, 0.25422186154382892, -0.45046671633216256, -0.23031783223894184, -0.61544163247884998, -0.2332093668471385, 0.0096917261033450074, 0.17163733194043357, 0.17172379067488885, 0.17342105765811225, 0.17759782612550043, 0.25388521774435546, 0.49066506338765642, 0.53190874810654976, 0.075660591040102837, 0.17371304193345374, -0.56835821427958444, -0.57588244896772234, -0.58152174984391114, -0.37581890108999716, -0.19622512970076919, -0.097477148948305531, -0.10903691838775691, -0.12776142939873006, -0.10281428632219579, 0.16845135046504131, 0.22405122030786861, 0.66464487182371257, -0.94641351902713855, 1.1129988398741191, 1.6066056279080259, -4.1115013597100578, 1.5476694374721462, 2.1696976832709982, -1.0193515924216472, -0.29854169122463242, -0.44685069559938834, -0.39815350666419097, -0.037318187986404149, 0.13143015225876697, 0.18368108831833294, 0.14048874638904385, 0.12890403553126736, 0.081108427029909794, 0.15350152251374438, 0.35696964892206617, 0.77135662792155557, 0.018970197624865574, -0.12859489098383081, -0.62859642257500314, -0.54100133271839856, -0.39870906011464824, -0.13095780969018578, -0.011847923870824886, 0.022775175196357359, -0.047630852690687051, -0.085024034480974689, -0.063066133758832563, 0.38868529039399197, -0.46027494328632251, 1.1970497991660347, 0.63252660757872814, -1.6764175122847713, 3.5142346308062082, -2.1389978076683618, 0.061458391503496308, 1.4503952980081398, -0.95871119523029713, -0.30802887330694667, -0.2385247997630148, -0.054110895720761498, 0.11278544639649313, 0.15123171993121864, 0.1047503975035141, -0.038230887694384028, -0.18202109891961496, -0.17596357423927469, -0.2231700372991606, -0.37668655809676688, -0.33099751793180054, -0.60627707274499654, -0.56199684605203359, -0.63488067579895024, -0.35167328896657507, -0.072941493094733675, 0.1095616669888755, 0.091852860366211805, 0.07099339435842339, -0.08127813274590924, -0.044468991083660724, -0.56281676758124888, 0.77751104168880336, 0.39903363987828711, -0.69665186973992854, 2.0365876460209633, -0.67307548012867546, 1.6700526640562572, -1.17827123123954, -0.42325697055405653, 0.93604459898777859, -0.63132994551184651, -0.15348950297637845, 0.075070297171156097, 0.10891422081227575, 0.16261143474742193, 0.059405844632708517, -0.050113511094947612, -0.27336662525128258, -0.34815332433351742, -0.30445717300202041, -0.073461819418725136, -0.24223475523068566, -0.278045596991634, -0.48491463219235625, -0.45730316497375445, -0.37994714934071183, -0.015792824133968708, 0.17318676777642958, 0.21220001866353638, 0.10303861084867472, 0.04174339774265514, -0.40399573862898636, 0.084877145937511819, 0.095920343398476396, -0.71926168426275106, 1.5810043928614652, -0.39469180639349549, 0.59160024067907002, -0.32110784375924395, 0.93227329954447902, -0.4559731496763611, -0.36755582277520088, 0.39865574246315755, -0.22919036999990147, 0.096585989040328876, 0.12331107551299252, 0.1301692594587433, 0.045495054958742745, -0.070105150765121721, -0.12185893624649984, -0.22365254766781101, -0.15967526911861513, -0.28967646870392255, -0.0064402102662611729, -0.18564601960108706, -0.24329566614587189, -0.35934781180256659, -0.2637983589078372, -0.092146932205193599, 0.15924096907201093, 0.17303565260659445, 0.18377202523753683, -0.05088417995496395, 0.069785743671890568, -0.20195166784419286, -0.50855168910609727, 0.81885347149607191, -0.25745374979707175, 0.3186528874887527, -0.22307591696348483, 0.38850732372171648, -0.013830571830101068, 0.54639589537102196, -0.30522386319855499, -0.33942288969170481, 0.18157168721539607, 0.0004949292816654663, 0.097487343329345874, 0.11558972094679136, 0.04854535694218131, -0.015988824093569717, -0.06380009174949508, -0.025089334126078205, -0.055367518888164394, 0.079082063664820748, -0.087137707937777115, 0.031298024311669809, -0.062554945418906743, -0.1187078977577844, -0.23511892751228033, -0.064665418468805788, 0.057283952975166051, 0.14850320507536743, 0.074518551996532748, 0.14775664020163706, 0.0020829156573371555, -0.34047455883436323, 0.16529753202987046, -0.22056405751825445, 0.29537350362174863, -0.30727693305691484, 0.17130544619864224, 0.097926711565602301, 0.43706544906097711, 0.12813917376287753, 0.055902479292622584, -0.14580799486104357, -0.18662643567548898, 0.13091343010011883, 0.03346270256516358, 0.062891439826322837, 0.030406089689394671, -0.027232120122529239, -0.037974760198136892, -0.069443551113326632, 0.0066344290522653612, -0.14235450986309153, -0.22838873802708684, -0.2029739889926063, -0.011606155190393872, 0.032057043772551565, -0.021982682491265355, -0.097053178020474681, 0.088550664314818187, 0.053090482149624633, 0.13925876777248047, 0.063513516552260146, -0.054278095118517826, 0.08538415672805795, -0.21793581355625447, -0.077110294424558939, -0.15760636776309189, 0.074489797691215873, -0.057241994101257694, 0.35758313393883939, 0.19352665675464989, 0.25884721081868634, -0.095362679574154757, -0.062555070152259029, -0.050600401411129904, -0.04581555915567774, 0.095997178609832215, 0.0179504255888953, -0.029984980792924155, -0.15600995797322956, -0.13441036107213314, -0.16443500436191227, -0.20011010622694014, -0.1185676848060674, -0.38277205043588519, -0.22544536191476122, -0.18438213782554774, 0.19372413199270522, 0.11219308206942717, 0.25982980909746933, 0.078859657281328127, 0.23113762225192824, 0.12027128091306288, 0.03925026108281611, 0.10346450949096535, -0.11153460033842286, -0.078325720975578092, -0.16362595169702793, -0.049162011568201006, -0.06813688020407746, 0.18695930341705305, 0.15059247824175628, 0.27424888872344572, 0.14323623171577923, 0.0044347552049957819, -0.11996255351778637, -0.068558023511484198, 0.023032548262321723, -0.010426074631633324, 0.05035409898656467, -0.11095078972724633, -0.35469216713625396, -0.38858095560717304, -0.43659704639067964, -0.48811475177501651, -0.56772102070325836, -0.42759360787810491, -0.34349774583431025, -0.089250558912845224, -0.017255660868053985, 0.28929558460304938, 0.20633977154543065, 0.49525043110711575, 0.30490326972545867, 0.15907734702039197, 0.18083894269546641, 0.0069359534603191542, -0.048745778368166057, -0.20974664985683683, -0.11713478908555536, -0.18510515801561447, -0.013089808045645399, -0.0081310228529865667, 0.25176222061000281, 0.2693946687392072, 0.27370819742589902, 0.0067102091687078758, -0.064697981434012536, -0.12347320818582255, -0.049391580905336498, 0.11832252230060807, -0.17268517789922963, -0.32589261306509937, -0.639287914168712, -0.72192603666395261, -0.70207820166905555, -0.61232760985457479, -0.44353340330746277, 0.019538834540299969, 0.047502831671299713, -0.041738811618788646, 0.28620163890052958, -0.19764870263775797, 0.80219655994233652, 0.62892221563015416, 0.38953231590523568, 0.37886779576331475, 0.14774431296436413, 0.094413661460632833, -0.073411101811453133, -0.16021249355536557, -0.19593247304968892, -0.081650775970513151, -0.035818571775193361, 0.021291149638310077, 0.27454988477748077, 0.46071517851603194, 0.34339582552475939, 0.10294245821665464, -0.15104410911941546, -0.11912886110102075, -0.1113610452824651, -0.099114502229341719, 0.023349196100618572, -0.80611388127400851, -1.0763583447726097, -0.8168297825020715, -0.72603823847118742, -0.39736821511961523, -0.23386297177233123, 0.4703174557375292, 0.25096233231074278, 0.31922838969310624, -0.25991967791422005, 0.34193161983249054, 0.51711748874534202, 0.65455151443419168, 0.83215952955458772, 0.34065461819243747, 0.21354052285348993, 0.054409237913707532, -0.051414766220484194, -0.24129551707937194, -0.18021017930700467, -0.16649307508903324, 0.02611995380449984, 0.0088882269741778191, 0.49992842173391339, 0.57482956329523827, 0.51044075389218102, 0.13304644121698647, -0.089227696371110179, -0.21628766080628836, -0.18555506064923225, -0.27054447491545125, -0.68824563709364495, -0.56391746646770291, -1.3448759333642519, -0.90801354560554559, 0.072866201802841646, 0.18073895078348665, 0.55567065990800857, 0.39381772120025821, 0.59242819035998318, -0.05022415004119711, 0.11181138224479518, -0.31028937719203997, 0.3708105687152074, 1.1972380302487284, 0.6479171630934083, 0.5970258341713901, 0.23406484190569171, 0.1494250432975659, -0.10460468586388726, -0.29172235696712562, -0.38132345964412656, -0.02584515038199919, -0.36234031342997136, -0.0035984972735878563, 0.484844809780835, 0.76596137582741564, 0.56172135236794307, 0.32646969875093934, -0.19592809956107882, -0.23669588269358457, -0.32125288047075495, -0.35097323483886461, -0.92868491010645182, -1.7089894615168075, -0.39428020304678818, -0.15776662530084981, 0.38954314931717637, 1.1161873115341048, 0.59264738582705467, -0.5562024927443876, -0.99489496750979078, 0.9608676869506646, 0.92308378001124303, -0.4139391942136339, 1.3089140888320632, 0.78636343748881332, 0.71583959398165975, 0.45156398868756092, 0.30146681989019147, 0.20254250312507779, -0.0025274006864056797, -0.19201780058118689, -0.20404659434537004, -0.25925756638025355, -0.31672382746446043, -0.31172559850957088, 0.38747270801190198, 0.95200274282556019, 0.72646685328099436, 0.2788747346508717, -0.17968537990931685, -0.3258415080143367, -0.43315407205711348, -0.64132619327207141, -1.0499886203647348, -1.7251253398279605, -1.5120873610545145, 2.092671402110029, 0.678333420527655, -1.3908581394378237, -0.14065731983379445, -0.704649079609032, 0.40038203546320611, -0.28960616895899161, 0.94969408752542028, 1.2068396187631385, 0.4671902772630277, 0.59380988893293563, 0.44061350110379105, 0.30971168558439566, 0.13217055914433939, 0.084780328674454217, -0.042892010327952576, 0.029004083819250629, -0.14047533322535441, -0.16292155588890503, -0.50836195321575572, -0.15753196960053273, 0.022795944141262008, 0.83366315887402342, 0.78917379441409119, 0.67355449112521315, -0.2295941880121686, -0.24948129249626083, -0.45897332874859181, -0.65550663858936065, -1.2736175855462932, -1.2398159392319503, -0.73118573872941783, 0.68147470897196305, 0.68403615276129381, -1.4576264955235338, -1.6446564981157907, -1.587130770095007, -1.361280962925294, 1.044628248920846, 0.96909874957635356, -0.14162995430492481, 0.66911279151523617, 0.32234943120999365, 0.34963232308526704, 0.244105606577141, 0.16281560265463482, -0.014269719747667968, -0.011846708470826806, -0.18933865423621368, 0.017829624121361812, -0.97302526020811309, 0.059393044635753067, -0.20250391456577049, 0.6602817924610479, 0.54316838647960974, 0.76213554623441593, 0.36502835420313695, -0.082930104064008442, -0.29266755430530383, -0.30043904784973247, -0.57334259680943656, -0.83104911233797829, -1.039352345059011, -0.28395441021550044, 0.84090846562801602, -2.9317402483699175, -1.2603198064423498, -0.5637011092588653], "height": 32, "width": 32, "top": {"real": [7376.2586563979694, 2820.8522261533344, -5690.9497085395169, -4380.4513376296127, 388.6547315083493, -903.73852292232903, -92.233688854560938, 42.706854165930984, -25.699252344104405, 18.326281263011424, -9.8542387499157442, 37.933510453511431, -7.8666684309670254, 29.305075180843883, -62.728617354661907, 59.853240627388928, -83.636374399044939, 59.853240627386725, -62.728617354660756, 29.305075180844177, -7.8666684309671826, 37.933510453511431, -9.8542387499160657, 18.326281263013065, -25.699252344104405, 42.706854165930693, -92.233688854557883, -903.7385229223205, 388.65473150834708, -4380.4513376296045, -5690.9497085395114, 2820.8522261533035, -14789.032757371706, -31341.185848117759, -11739.029695619593, -866.78466658113393, -286.68893204831016, -488.33133225087568, -120.74864963582691, 33.024718339611894, 4.6010715329524166, -5.4456740109959769, 4.1139030671062393, 6.8633911029603265, 13.634662924808397, 1.860738389345556, -0.35796846682150263, -16.625069210775109, -14.807142725465134, -11.664010623894898, 0.82076815557037341, -12.155673848711613, 29.148348103795893, 15.708115389403888, 15.457503110539639, -12.683126140048403, 18.961120931859309, -53.601071866945205, 34.13442733448511, -942.72760774202175, -816.05094481379797, -3798.5470080468217, -8876.4278731043305, 2890.8320511623124, -27232.421940549859, -15984.118662988652, -6745.5682223604126, -409.0173927639226, -42.225544009425754, -526.29225504527119, -49.325655652906178, -23.20435390028933, 15.630174176003303, -14.835941429972856, 6.4726407463551725, 1.9958373496876167, 13.291351981828791, -1.1889020916883648, 10.030112101155916, -20.674418420848429, -0.1180338988714332, -18.745207674116038, -1.9041291470929314, -7.8710994817942428, 20.385879097388031, 14.857882580655026, 16.950197274587541, -2.033086164989526, 25.446982376231624, -20.624592190095939, 89.303256695009566, -637.06671072120571, -1428.8365567175017, -3113.2951228079887, -8881.5889351276946, -20696.443600183225, -9007.3131796291163, -5346.3306090002807, -1439.1675666408983, -1292.5663502582722, -654.09944760377277, -301.70227472838963, -97.440927522083996, -3.3329385156017457, -8.2027965131620153, -5.7742639473870323, -0.51069538319854635, 6.6402880636318233, 8.0126520330591013, 4.0882931682311625, -1.5210347396074151, -2.2335756869246048, -2.3288001542285928, -8.1315470965115093, -6.9403489082507335, -3.6748649027980562, 4.5937507427443531, 9.4957008241539675, 10.21057060635477, 11.676825499792781, 23.758858737501662, 20.288236987689611, 20.969766857125101, -333.51324485695324, -810.1584353673162, -2278.6820540988888, -5194.4090916202094, -7188.339898707115, -3154.0647285180166, -3175.2001764803263, -3085.2108289353805, -1226.2977859942123, -836.26206181721784, -301.22169990911055, -15.123294918373254, -11.324269109892445, -4.9992210979693361, -6.7152536525607003, -1.7063097661780617, 2.7727430774894133, 7.1357881321682148, 4.8669904821248817, 2.7536893948953045, -2.039934630711028, -0.54898928719761031, -2.9485150656567436, -3.1026085263061316, -1.3614545093317587, -0.47304719477880164, 4.0409079710738931, 6.2483313015723709, 8.8540252326547968, 18.802141623354618, 24.681352644731625, -6.1114787305120313, -148.49350684902615, -572.34886359995278, -1663.447165744248, -3308.6059534728529, -4493.8282478995061, -3720.0991836319017, -3323.4413322476125, -2223.3326338682518, -1347.5218927383742, -402.86472873295924, -179.07785660663581, -42.171627369153548, 13.024576486879551, -6.680339136637107, -4.3910663300422375, -1.9843645852297727, 2.2081255979025864, 3.4357055351949564, 4.8667397989738959, -0.0088018165553918268, -1.2900498248809058, -2.2230696316747851, -0.79613102395178958, -2.1003135650570957, -0.12607857026311342, 0.39928478103703097, 3.6189445517483683, 5.5230847011321824, 8.0807144322734796, 9.6537837209938342, 14.647883903859292, 41.761171107733581, -2.5048396429986766, -288.68438568639834, -1058.7748743456032, -2111.6481404168812, -2853.5518466904464, -2206.4742388833251, -2207.4882969003411, -1427.0600295974209, -607.97311048711572, -283.75431628355585, -25.222873313531675, -11.21903778037437, -8.3653822807976148, 1.9503276148055415, -4.8653324939916756, -1.0558165909594248, 0.18037835028025548, 3.7232300368774149, 2.6260151255238955, 1.901747650437611, -2.157984497724208, -1.9174482807780493, -2.671365924063863, -1.6822520344543337, -1.7835969801453151, 0.50013744114287995, 2.3612666445612516, 3.9892729615099713, 5.0282597338489978, 4.3849613992965208, 7.5675449146459712, 26.738330274504211, 30.293009711209869, -72.365238046453968, -397.03998761961856, -1129.7740740979677, -1877.1475049531305, -1015.8170093531105, -757.33856581211364, -464.04986763483271, -221.8093865245269, -66.670140953208971, -32.688631361988044, 12.245388279073117, -2.09491941357581, -4.9214217924247272, -0.76863227802399692, -1.3611346863617457, 0.59203001318831738, 2.3940543871676745, 2.1386535528573569, 0.12698658321630202, -0.36055346759858353, -1.509631760657328, -0.37490601010058217, -1.4076418772333708, -0.9909556252137327, 0.025704615807234758, 1.7006413859335137, 2.4101241863335301, 2.7230446482899899, 4.8975474263529586, 5.5799176422335819, 7.3823613929523022, 3.3531473980019464, -7.0947231292717241, -129.95057654055665, -447.33256260550814, -801.49855315264267, -297.71280467242298, -206.25666421819534, -105.85720001872387, -40.587336797783266, -19.033005269759897, 0.68623525685047748, -2.224754122223199, 2.8686428937153541, -1.3772856826259623, -3.7001182860738422, 0.56033030111271653, 0.31649576481826269, 2.6435570864758695, 2.0729019173667451, 1.3896745329326239, -1.1733083260901866, -0.5564284933709801, -0.75319429727185228, -0.16542223594150865, -0.34981510145177358, 0.63947101827441399, 0.64495136714903334, 1.5357324193076427, 2.8130362926385226, 4.2845415972556511, 3.3415574201637508, 1.8747628167747612, 4.3092019872505318, 1.2280777000161127, -53.113548920223614, -153.12296297306594, -262.59106890839882, -78.507966752468647, -44.713956729763169, -24.503242066462356, -11.422688403833899, -6.8324882374101472, -1.9389416594991726, 2.3416848160301655, -1.9581076589813595, 0.65441624739147974, -1.6215192060328243, -3.0886268279599727, 2.5574024719687731, 2.5859312055320047, 3.582324284715654, 2.3851708003164411, 0.41148866509477899, -1.7870448740379692, 0.35867475608513461, -0.33833230756510146, 0.72134917870519866, -0.6451343286468626, -0.036676325952571386, 1.8806785141996829, 3.0459530955995717, 3.0361534846987768, 1.8248078988499765, 2.0278729258957484, 1.4298438030821454, 1.444150632114136, -16.470770345398158, -59.038387406403551, -81.624687331130716, -41.65158074717607, -20.04858945819673, -26.796686775361913, -13.274828683787613, -5.4849410264677898, -1.7682797425272327, 0.51276950901621554, 0.11701161368370352, -2.1525887062494076, -0.35663258536781867, -0.3882693848937121, -2.5566610369397282, 6.5139128293303541, 4.1537964250038213, 2.1778507792771808, 0.67618078211604771, 0.67271760119275736, -0.033223712968477391, 1.7891382881043305, 0.76549003012129324, -1.8840461990319548, 0.62764371336603419, 2.9500669911593334, 2.7998549031057309, 2.7114466415734606, 2.640497491382968, 2.5087646302130264, 0.3613507110411972, -0.85975587552377708, -5.8993661554875496, -19.483874473281006, -46.656198806892085, -42.447185502078959, -49.475399988407517, -28.809040802191632, -23.364991274814315, -9.3720360014436217, -2.193549633075087, 0.73237790527535407, -0.60287176352488314, -1.0672361910519921, -3.8374461384037328, 0.81264916316705227, 3.7024783733454592, -2.2274307006673761, 12.171761179906976, 2.6484997231173142, 2.1242155181960216, 1.3916869062247985, 3.2969221728544564, 0.14147762112210061, -1.2659388719629114, 1.2983452624583423, 2.4646463691490883, 1.8819178233751466, 2.4699197782172551, 3.4105600445409938, 3.476877662739366, 1.970602508408192, 0.54569379437115284, -0.61503488296082265, -1.584537886719974, -9.9108851118855448, -17.968893142628509, 0.83280248396047341, -16.804391379900096, -34.94566909960443, -18.287776152890835, -10.19076861522101, -2.3659355754892188, 0.38430207827148843, -0.39175809943359002, -2.0786620762717161, -2.1066158183404973, -4.0664292874937455, 5.1056392812224729, 9.4711485160420441, -2.577327881134023, 13.563457368659881, 5.4454444116217209, 3.0810071966308192, 3.71409458782056, -2.7028450063821525, 1.3893389983926554, 5.0295677911697716, 2.0512141006459763, 0.57687440104333121, 3.1399874906463121, 4.3044361492909653, 3.2286926050373941, 2.0294536549063102, -1.2648718051872285, 0.81982278416560761, 5.1937461344056883, 4.5660530070978913, -2.5751982814314349, 10.842808636227273, -2.7634934625905125, -4.7410363255116081, -13.231297049532179, -1.2392069417375811, 0.57695677140757395, 1.6572428400911725, -0.80487566941313171, -2.1976406054664008, -2.9337382106235617, -0.97696074341019468, -0.52039830113476337, 8.6932746740913363, 18.008772340009436, -6.3894706762347742, 16.656214263229323, 5.6480128145892756, -2.6420757676626341, 6.9832538798624686, 8.7117753152913409, 2.944231966553327, -0.4194257648970201, 1.9464964791115495, 2.8117062685871983, 3.586606822562346, 3.6410340078674697, 2.1750438821370093, 0.92746135521083628, -0.10515597578954901, 10.916870623975495, 22.695665816423684, 26.922229107827643, 56.766547106622895, 34.346379481364103, 8.0209890672230593, 4.2276867493724737, 2.0129650120803855, 4.5721973792850843, 1.7026114564114816, -0.10193290249876912, -1.9877285465951933, -1.4091416884493304, -1.0407935339809435, 4.6927135104950821, 4.461866465996299, 13.14685287043932, 23.490161756370188, -8.5448676586843408, 5.7639040157862622, 6.7103974452754578, 11.090643871879529, 8.6117964749879281, 0.95828374077, 2.8859143014026349, 1.6803595914225926, 1.5724318132354216, 2.3664842485474589, 3.3844724421254813, 2.8754034241014996, 0.81420697505183059, 3.4592633965370854, 8.5418678989119741, 26.408180301615612, 46.472433795130719, 15.748155014076561, 18.939305693948317, 18.355423454953527, 7.4385947937208252, 6.8421582395566496, 3.8284829441665011, 2.3084513014265475, 0.014383588041353481, -0.70170837590258439, -0.9519271341888802, 0.60488638387036897, 4.7316501322768225, 11.640012070252736, 11.084534895769892, 7.9427552323827459, 17.090358547431578, -4.0062765415124373, 18.903471314461139, 10.522914852414784, -0.31727085194714888, 8.1914062421872558, 5.5678768421215832, 1.9515757898119943, 0.13204460835173984, 0.94686979396028259, 2.2566984460298456, 3.5582629306092612, 2.7150237945754423, -0.038191379039643265, 6.3090662882758242, 18.822434458740766, 20.387061197767007, 34.210424610695611, 25.78016711295075, 13.422328957688888, 4.2578162502068047, 2.3122896178400203, 4.1892680028045364, 2.2592478817037658, 0.95372259584702335, -0.47653425908969432, 0.069240128911087023, 0.91781179579556105, 6.6018505246928774, 10.152138543237006, 11.530381877152177, 5.6211304516254526, 4.7909070280413646, 35.867989503906792, 4.7909070280413584, 5.6211304516254428, 11.530381877152157, 10.152138543237017, 6.6018505246928978, 0.91781179579556504, 0.069240128911081333, -0.47653425908969432, 0.95372259584699437, 2.2592478817037476, 4.1892680028045142, 2.3122896178399985, 4.2578162502067478, 13.422328957688848, 25.780167112950689, 15.74815501407811, 20.387061197767874, 18.822434458741888, 6.309066288276548, -0.038191379039562191, 2.7150237945755555, 3.5582629306093274, 2.2566984460298958, 0.94686979396029702, 0.1320446083517558, 1.9515757898119841, 5.5678768421215636, 8.1914062421872096, -0.31727085194714522, 10.522914852414772, 18.903471314461111, -4.0062765415123884, 17.090358547431556, 7.9427552323827513, 11.084534895769902, 11.640012070252746, 4.7316501322768385, 0.60488638387038995, -0.9519271341888812, -0.70170837590259716, 0.014383588041281273, 2.3084513014264751, 3.8284829441663635, 6.8421582395566762, 7.4385947937204353, 18.355423454952824, 18.939305693949098, 56.76654710662406, 46.472433795132453, 26.408180301616227, 8.5418678989122103, 3.4592633965371484, 0.81420697505187978, 2.8754034241015152, 3.3844724421254879, 2.3664842485474735, 1.572431813235436, 1.6803595914225982, 2.8859143014026083, 0.95828374076997469, 8.6117964749878801, 11.090643871879506, 6.7103974452754693, 5.7639040157862587, -8.5448676586843018, 23.490161756370185, 13.146852870439265, 4.4618664659962768, 4.6927135104951034, -1.0407935339809418, -1.4091416884493408, -1.9877285465952099, -0.10193290249882341, 1.7026114564114307, 4.5721973792850434, 2.0129650120803833, 4.2276867493724772, 8.0209890672234039, 34.346379481364394, 10.842808636228447, 26.9222291078285, 22.695665816424683, 10.916870623975989, -0.10515597578943024, 0.92746135521090112, 2.1750438821369982, 3.6410340078674537, 3.5866068225623455, 2.8117062685872063, 1.9464964791115584, -0.41942576489699973, 2.9442319665532848, 8.7117753152913178, 6.9832538798624677, -2.6420757676626758, 5.6480128145892872, 16.656214263229302, -6.389470676234752, 18.008772340009443, 8.6932746740913274, -0.52039830113473562, -0.97696074341019512, -2.9337382106235728, -2.1976406054664195, -0.80487566941320732, 1.657242840091119, 0.57695677140755675, -1.2392069417374179, -13.231297049531948, -4.7410363255113248, -2.7634934625894938, 0.83280248396082224, -2.5751982814309775, 4.566053007098211, 5.1937461344059415, 0.81982278416574916, -1.2648718051872136, 2.0294536549062832, 3.2286926050373275, 4.3044361492909653, 3.1399874906463054, 0.57687440104334498, 2.0512141006459621, 5.0295677911697396, 1.3893389983926545, -2.7028450063821756, 3.7140945878205622, 3.0810071966308161, 5.4454444116217395, 13.563457368659845, -2.5773278811340234, 9.4711485160420441, 5.1056392812224614, -4.0664292874937296, -2.1066158183405044, -2.0786620762717254, -0.39175809943363327, 0.38430207827145285, -2.3659355754891784, -10.190768615220893, -18.287776152890569, -34.94566909960389, -16.804391379899673, -42.447185502078064, -17.968893142627813, -9.910885111884598, -1.5845378867194357, -0.61503488296060749, 0.5456937943712441, 1.9706025084081269, 3.4768776627392723, 3.4105600445409681, 2.4699197782172639, 1.881917823375139, 2.4646463691490985, 1.2983452624583438, -1.2659388719629485, 0.1414776211221116, 3.2969221728544715, 1.3916869062248129, 2.1242155181960229, 2.6484997231173293, 12.171761179906973, -2.2274307006673681, 3.702478373345508, 0.81264916316704883, -3.8374461384037382, -1.0672361910520076, -0.60287176352493688, 0.73237790527531033, -2.1935496330750563, -9.3720360014434689, -23.364991274814056, -28.809040802191326, -49.47539998840697, -41.651580747175068, -46.656198806890998, -19.483874473280501, -5.8993661554872627, -0.85975587552355426, 0.36135071104124949, 2.5087646302129953, 2.6404974913828889, 2.7114466415734491, 2.7998549031056945, 2.9500669911593249, 0.62764371336605218, -1.8840461990319775, 0.76549003012129535, 1.789138288104325, -0.033223712968466615, 0.67271760119275215, 0.67618078211606658, 2.1778507792771671, 4.1537964250038266, 6.5139128293303603, -2.5566610369397242, -0.38826938489369667, -0.35663258536783948, -2.1525887062494129, 0.11701161368368215, 0.51276950901619689, -1.7682797425271899, -5.4849410264677143, -13.274828683787417, -26.796686775361572, -20.048589458196275, -78.507966752466459, -81.624687331128925, -59.038387406402052, -16.470770345397689, 1.4441506321142048, 1.429843803082246, 2.0278729258956907, 1.8248078988499317, 3.0361534846987319, 3.045953095599546, 1.8806785141996951, -0.036676325952591224, -0.64513432864685583, 0.72134917870519299, -0.33833230756510668, 0.35867475608511745, -1.7870448740379619, 0.41148866509475018, 2.385170800316434, 3.582324284715646, 2.5859312055320172, 2.5574024719687887, -3.08862682795997, -1.6215192060328063, 0.65441624739145521, -1.9581076589813555, 2.3416848160301531, -1.9389416594989646, -6.8324882374098541, -11.422688403833355, -24.503242066461048, -44.713956729761051, -297.71280467242298, -262.59106890839888, -153.12296297306594, -53.113548920223877, 1.2280777000160852, 4.3092019872504084, 1.8747628167747172, 3.341557420163666, 4.2845415972556511, 2.8130362926385151, 1.5357324193076258, 0.64495136714903156, 0.63947101827441044, -0.34981510145179595, -0.16542223594153913, -0.75319429727190634, -0.5564284933709801, -1.1733083260902135, 1.3896745329326132, 2.0729019173667376, 2.6435570864758655, 0.31649576481827513, 0.56033030111271809, -3.7001182860738244, -1.3772856826259623, 2.8686428937153425, -2.2247541222231662, 0.68623525685057685, -19.033005269759858, -40.587336797783074, -105.85720001872383, -206.25666421819477, -1015.8170093530997, -801.4985531526338, -447.3325626055032, -129.9505765405554, -7.094723129271765, 3.3531473980017035, 7.3823613929520073, 5.5799176422333412, 4.8975474263529168, 2.7230446482898696, 2.4101241863335168, 1.700641385933505, 0.025704615807253747, -0.99095562521376346, -1.4076418772333852, -0.37490601010063784, -1.5096317606573337, -0.36055346759863915, 0.12698658321626774, 2.1386535528573165, 2.3940543871676701, 0.59203001318833959, -1.3611346863617075, -0.7686322780239524, -4.9214217924247352, -2.0949194135756803, 12.245388279073195, -32.688631361987156, -66.670140953207678, -221.8093865245236, -464.04986763482748, -757.33856581210489, -2206.474238883316, -1877.1475049531243, -1129.7740740979648, -397.03998761961947, -72.365238046453996, 30.293009711209137, 26.738330274503873, 7.5675449146456106, 4.3849613992964835, 5.0282597338488833, 3.9892729615099154, 2.3612666445612378, 0.50013744114287839, -1.7835969801453351, -1.6822520344543537, -2.6713659240639043, -1.9174482807780469, -2.1579844977242066, 1.9017476504375719, 2.6260151255238871, 3.7232300368773963, 0.18037835028033014, -1.0558165909593593, -4.8653324939915077, 1.9503276148055297, -8.3653822807973572, -11.219037780374073, -25.222873313530549, -283.75431628355437, -607.97311048711254, -1427.0600295974182, -2207.4882969003352, -3720.099183631889, -2853.5518466904387, -2111.648140416873, -1058.7748743456016, -288.68438568639789, -2.5048396429994018, 41.761171107733141, 14.647883903858578, 9.6537837209937827, 8.0807144322732913, 5.5230847011321327, 3.6189445517483261, 0.3992847810370409, -0.12607857026309263, -2.1003135650570361, -0.79613102395168645, -2.2230696316747758, -1.2900498248808734, -0.0088018165554208834, 4.8667397989738888, 3.4357055351949497, 2.2081255979026997, -1.9843645852296314, -4.3910663300419372, -6.6803391366371141, 13.024576486880093, -42.171627369152944, -179.07785660663302, -402.86472873295685, -1347.5218927383694, -2223.332633868245, -3323.4413322476003, -3154.0647285180148, -4493.8282478995088, -3308.6059534728515, -1663.4471657442498, -572.34886359995289, -148.49350684902797, -6.1114787305125393, 24.681352644731046, 18.802141623354593, 8.8540252326545641, 6.2483313015722262, 4.0409079710738718, -0.47304719477879342, -1.361454509331699, -3.1026085263059842, -2.948515065656593, -0.5489892871976132, -2.0399346307109321, 2.7536893948952148, 4.8669904821248942, 7.1357881321682211, 2.7727430774895763, -1.706309766177841, -6.7152536525602784, -4.9992210979693477, -11.324269109891496, -15.123294918372496, -301.22169990910822, -836.26206181721659, -1226.2977859942089, -3085.2108289353782, -3175.2001764803231, -9007.3131796291, -7188.3398987071041, -5194.4090916202022, -2278.6820540988915, -810.15843536731495, -333.51324485695591, 20.969766857124615, 20.288236987688347, 23.758858737501669, 11.676825499792164, 10.210570606354567, 9.4957008241538698, 4.5937507427443718, -3.6748649027980855, -6.9403489082508045, -8.1315470965115626, -2.3288001542285697, -2.2335756869247856, -1.5210347396073984, 4.088293168231135, 8.0126520330591262, 6.6402880636320099, -0.51069538319843244, -5.7742639473864941, -8.2027965131620455, -3.3329385156007563, -97.440927522082632, -301.70227472838576, -654.09944760377232, -1292.5663502582681, -1439.1675666408923, -5346.3306090002598, -27232.421940549855, -20696.443600183229, -8881.5889351276946, -3113.2951228080024, -1428.8365567175017, -637.0667107212123, 89.303256695008088, -20.624592190099609, 25.446982376231595, -2.0330861649905447, 16.950197274587225, 14.857882580654767, 20.385879097388024, -7.8710994817946256, -1.9041291470930921, -18.745207674117459, -0.11803389887143546, -20.674418420848326, 10.030112101155776, -1.1889020916883362, 13.291351981828802, 1.9958373496879209, 6.472640746355359, -14.835941429972186, 15.63017417600328, -23.204353900286776, -49.325655652904786, -526.29225504526619, -42.22554400942483, -409.0173927639147, -6745.5682223604063, -15984.118662988625, -14789.032757371675, 2890.8320511623242, -8876.4278731043305, -3798.5470080468367, -816.05094481379706, -942.72760774203016, 34.134427334482538, -53.601071866949361, 18.961120931859348, -12.683126140049515, 15.4575031105396, 15.708115389403696, 29.148348103795954, -12.155673848712381, 0.82076815557010951, -11.664010623895932, -14.807142725465098, -16.625069210776097, -0.357968466821102, 1.860738389345522, 13.634662924808296, 6.8633911029604313, 4.1139030671065999, -5.4456740109950088, 4.6010715329523864, 33.024718339612249, -120.74864963582446, -488.33133225087175, -286.68893204831085, -866.78466658111245, -11739.029695619576, -31341.185848117751], "imag": [0.0, -38758.087655514835, 17548.085047269142, 6107.2151726624015, -1874.673387120311, 1102.4198144208276, 70.663498597697227, 246.50443360377355, 15.094404836632346, 61.578388193120794, -6.883850379905633, 17.433253862249003, -27.182352905748338, 10.205627484635695, -57.631165788617082, 3.5978635789949243, 0.0, -3.5978635789944389, 57.631165788617331, -10.205627484634785, 27.182352905748068, -17.433253862248129, 6.883850379906236, -61.578388193120603, -15.094404836632346, -246.50443360377048, -70.663498597698691, -1102.4198144208278, 1874.6733871203112, -6107.2151726624097, -17548.085047269135, 38758.087655514864, 21415.511526704078, 9240.4816801838842, 6140.0706338628515, 4606.7423967050836, -477.33409412636456, 106.10534760670754, 253.85827683649731, 118.670471872242, 60.852179067446961, 22.790809731222598, 16.992665274593527, 3.3051410229913314, -11.158748163655874, -19.125680216300069, -12.454719286949617, -13.739274709476872, 4.4649861577324996, -1.4030381833900449, 28.352674755287939, -0.67900523797834378, 10.299898240809684, 0.92198929608587377, 1.7353747463970652, -28.921613512340663, -62.077231813228479, -150.50951383829744, -214.24479740751684, -816.21574466320703, 274.1353961963593, -3254.3286688062722, -6340.0761451284025, 11789.651384311641, 10840.701965194425, 18380.248977426931, 3231.3822724351476, -461.44982475214084, -210.28695062763435, 162.42212696600188, 179.30887547689923, 113.80000983072934, 43.394725496932487, 24.59548477602943, 9.5064435172576207, 6.2249226907652995, -15.514190495563678, -15.67209469704693, -16.179758937655365, -0.44183444538403649, 3.28796177703477, 12.57005414423841, 4.7947040656811843, 5.5752197676029693, -1.566994278876134, 3.0671728952871886, -9.3006029966239439, -19.205045070959127, -56.939768493357462, -104.59324045979437, -209.92149032340299, -248.20433151041027, -867.92363746103479, -1299.0888976028032, 827.61688284819274, -3453.3010516440099, 2184.1299326736716, 343.81610498084558, 1430.9649107108667, -397.20604751762147, -695.96261474413006, 272.38382351444113, 181.43163787734565, 64.570588674311324, 29.183435066681643, 16.420203889130576, 10.051165980763317, 3.8132998567254699, -5.2200576234926608, -12.843645059741645, -16.574215370008311, -6.8948411718648668, 5.7853993354930253, 6.7615499928711884, 6.3258793363865982, 6.2779141420300757, 7.316455816584333, 0.11325917153592484, -12.472105947256997, -26.315486653091728, -48.315266721271882, -96.05176533673017, -133.18984159990899, -353.39952612993443, 150.90670251969735, -622.62775933130001, -1461.5017842629939, 2621.2839732861958, -797.42142339187535, -1141.9271710506443, -1665.2932495998289, -238.3366310615267, 49.923170262409073, 61.506465075545492, 153.25086116745172, 46.446591336114025, 13.171326963991907, 10.42525251508628, 5.9093841314446687, 3.7481817410606739, -5.009304162269796, -8.3377118534842136, -11.383176063308646, -7.2904568591879206, 0.055102663998529922, 6.2100452165049633, 0.50258781153530074, 8.7133201843540995, 8.0099491969619425, 3.408178127748358, -6.1241971022028396, -12.736128845291272, -45.232132533425755, -61.3791750629996, -153.42214558232837, -67.595097514570796, 85.625899103861244, -58.961155821254636, 56.883206971067992, -1105.7125877167775, -1066.0901100808514, -1171.2701320923616, -223.1510166903665, -49.090655504704266, 242.13940044346495, 187.57398243385657, 37.630624824958112, 28.849867481961542, 8.4569554634773265, 4.9702839577388582, 4.4028115702250554, 1.4310556478305501, -1.929060150422355, -6.8702061592831818, -7.5557834297932249, -6.2828152868831211, -0.10870593803434039, -0.35173698335235887, 2.5520560959229499, 3.0896458550054593, 4.7505220002799033, 1.2377659738692817, -1.7806530124299274, -9.1879671692559626, -20.164632449396379, -65.591240653702698, -60.869480400000917, -62.271759486118263, -69.04223895420877, 113.44009243151515, -280.24622279593513, -361.29505764988915, -32.2389038646619, 397.42763261597736, 412.9673372382922, 359.76401050336045, 192.6210800054142, 122.25882006598455, 49.109708531705785, -0.83416770813231356, 2.4803036198391495, 2.5045331182816137, 2.1157075816863125, 2.0456835555591151, -1.3319639541688315, -4.1057658132159602, -5.2622609905014679, -3.122429370817716, -0.23490025627283884, 0.40862649299968534, 1.0190926814192749, 2.6652215067301066, 2.3902937959311288, 1.3072901204360872, -2.1976906085986245, -4.7205289930149936, -17.964658686821839, -21.918559933832515, -40.854552179344822, -68.24351076369831, 25.856495589804037, -73.74721318359471, 26.189735785049756, -56.726426890704197, 461.88238037931336, 400.36625478870423, 367.42140066372616, 233.95717316464078, 120.24788693419019, 56.86229814651989, 16.528423808469729, 5.5081763037408891, -2.7285347510623343, 0.91768473485835012, 1.922818700657754, 0.85878662181529319, -0.082031723657331246, -3.1986596327501684, -2.7995613930163934, -2.624028681216124, 0.082235364558318216, 0.13384423623927519, 1.9947594371394528, 1.3437508199980643, 2.6398410865992954, 0.73758290379789837, -0.13078900915043976, -4.4953343292506398, -5.1950335909144894, -13.12242317098767, -25.523369493146305, -12.192196214097944, -25.868477512213353, 2.9066782920883432, 34.106574161015573, 256.00130492151595, 208.58597838816522, 310.3347945923577, 177.03891975992664, 97.122360992021001, 48.488510187113192, 24.528917872852549, 4.6272034575157122, -1.3571647909533122, 0.20621269482631011, -0.40867746076362715, 0.99215767258594889, 1.5313768256641691, -0.052772985639764861, -1.5552847934304939, -2.8318141898835965, -1.44106038161314, -1.7221472209588695, 0.61786747800524422, 0.48048213041449506, 1.7161555169971148, 0.88689757979195871, 1.4761658864245926, -1.7252645996654892, -0.81528783024945528, -3.3158091950668926, -7.6513645380807835, -2.9281859927886749, -12.462674546124116, -7.4696827367159715, -23.236903073402107, 43.7319836231637, 92.321882041990349, 70.117668379783737, 34.226649356314077, 47.258739472197036, 25.375797504306092, 12.406583490274283, 8.6535618432690811, 1.0747519793409035, -0.44324044078252567, -1.7584707522262704, 0.72458607165998101, 0.70692065864217946, 0.77076345191259166, 1.0649069250197341, -2.7261985428418192, -1.9302074459527443, -3.3754250277859401, 0.50673349306549698, -0.64031672309299725, 1.374850007673434, 0.72950552648490297, 2.3325303094340692, -0.9986473214357906, 0.78195787446934228, -1.1999635798104886, -3.4858876190620522, -1.4991310089769327, -2.8433755069243221, 3.7638952884372583, 1.2400980139632869, -2.9542792497780144, 1.8234355680479359, 49.576244746235467, 19.014215780516388, 30.877310974744532, -1.1221271518157558, 7.8208026967228905, 2.609067592037944, 1.2521971880796572, -0.99505064345958283, -1.3975466814991453, -0.57338407820284554, -1.8697004151394911, 2.3700280505641378, 1.696784850403636, -0.61519740478736618, -1.3317994275810727, -4.2071746247346917, -0.85834734780410316, -1.4672332071937433, 2.6381100233578914, -2.4176769851497171, 2.0131074000190821, -1.6262628596018911, 3.9814331515508763, -0.027677673297514374, -2.444607041276003, -1.6150024285043403, -4.1227589144067673, -1.7068861549694658, 2.2919486155920237, 12.185386506158462, 9.103962312567619, 7.1597604706792799, -5.4087151249860161, 0.96974162117579055, -11.947201833901593, 6.6330620252490986, 2.1152085218133552, 3.546929348907518, 0.62283616740311709, -1.3522725353705505, -2.4444202103018355, -1.5690941230144015, -0.0069858778603680161, -2.2282653754616524, 3.8284308308873771, 3.1912913728027457, -5.5805618725494135, 0.13049495818795365, -3.5197176720292105, 1.8802124921714005, -2.6189977871286096, 2.1235611153433935, -7.1463089769422359, 4.7729314123471731, 2.1077672614040215, -0.81910125894631813, 0.72052624692713507, -3.4842402749887631, -4.1829115306886377, -4.3994325344570067, 3.0953565929079909, 11.949390330752637, 23.680136621529911, 21.558658775121675, 22.744598059672118, 24.943328767928129, 28.901352722188449, 12.814680673201753, 13.644932734111247, 5.45768556544121, 2.4025753394703617, -1.1673355625318591, -2.4971924284976894, -1.8952846661475429, -1.2927419412763479, 2.7902732019969552, -4.3477010834394934, 3.7423253621601038, 4.3959804108055893, -8.9257994152947724, 2.882370251254919, -5.0577698714645729, 3.1829717367300585, -13.324209534416688, 6.2785045354550411, -0.87489834284363188, -0.85263104321571348, 4.4885662153073236, -0.53110232172652128, -1.6389132121610095, -4.3945543864166812, -4.2936344828625694, 0.48745205753098192, 15.895360345460416, 25.169617383292081, 33.918445473292621, 23.996907911576923, 23.251277269359601, 5.1543156647143702, 18.554102826608389, 16.359265688234956, 10.231244633613841, 1.5587865083621433, -1.4683911434431964, -2.958105786087343, -1.5689869488245065, -0.96051225634847215, 1.7578951205789273, 6.6638352938822507, -9.4901775499106478, 4.1317473271038834, 10.951455398944859, -15.360897164532773, 5.739294741971535, -17.045217645164048, 5.8449684444103616, -3.5521886878464675, -7.3858280585812945, 5.7347340895196259, 0.4908832539545151, 0.98666637905349674, -1.0149409800154179, -1.6832477381822215, -2.5467748158366237, 2.0904065823844138, 13.443724261124899, 31.761133485201317, 33.671186166611122, 40.707191608760652, -1.1509826127936451, 21.096779572504321, 10.924705320167561, 7.3688776104039446, 6.4733533392666498, 1.1232923919614803, -2.4431302941492752, -2.7804484266994756, -1.6225398299131664, 0.6478030911844409, 2.5793951871330139, 3.1124056384095988, 9.3832743597685244, -14.195954313031031, -0.57608988546761064, 19.479390479219269, -31.200338855208866, 14.100113777774123, -5.3856662644378392, -10.946378631138824, 4.4142064356850845, -3.9066652322250062, 0.66844910598604979, 1.0227755630951001, 0.66137538568075327, -0.38567118503773246, 0.24821124990411303, 3.5872841231435211, 14.053276636456639, 24.260931372233497, 33.647459095648763, 7.6529271231588307, -9.2151377078706354, -38.311665858686638, -16.121399661234683, -5.9927868178298498, -2.7701365304211771, -3.7140088945870469, -3.0788396721523017, -3.0904878618769733, -1.8655827999533823, 0.43690140001808947, 4.1561194908680763, 4.3858952392085353, 2.7714027971729753, 9.257895969243517, -19.629364588289473, -14.072043519544888, 36.373196183604975, -13.61372365841147, -9.4583423311161248, 8.5284583277520429, -6.1744651457950592, -2.2310052363098367, -1.75629520897435, 1.1539693350814639, 1.7596902661237352, 1.8196834579374304, 2.022290334087173, 5.1646829084835781, 12.770276815017757, 24.46979490512981, 27.822785449092486, 29.828540342091252, 0.0, -3.7653763488297254, -24.757305904406468, -19.738984856989376, -8.2664619761594462, -4.6495144591838038, -3.656340919703911, -2.9147641885479052, -2.2830188616483764, -0.10916825448095578, 2.3916977668177819, 5.941240494184604, 2.1224657474819093, 3.9401472638367774, -2.1445277323266949, -10.774805376941604, 0.0, 10.774805376941531, 2.1445277323266829, -3.9401472638367951, -2.1224657474819155, -5.9412404941846173, -2.3916977668177926, 0.10916825448094437, 2.2830188616483764, 2.9147641885479065, 3.6563409197039234, 4.6495144591838136, 8.2664619761594498, 19.738984856989411, 24.75730590440644, 3.7653763488297773, 9.2151377078736516, -29.828540342087546, -27.822785449090652, -24.469794905129369, -12.770276815017642, -5.1646829084834636, -2.022290334087153, -1.8196834579374237, -1.7596902661237566, -1.1539693350814775, 1.7562952089743382, 2.2310052363098212, 6.1744651457950415, -8.5284583277521193, 9.4583423311161194, 13.613723658411436, -36.373196183604932, 14.07204351954484, 19.629364588289484, -9.2578959692435348, -2.7714027971730033, -4.3858952392085584, -4.1561194908680932, -0.43690140001811473, 1.8655827999533605, 3.0904878618769729, 3.0788396721523177, 3.7140088945872396, 2.7701365304214618, 5.9927868178306163, 16.121399661236502, 38.31166585868818, 1.1509826127964509, -7.6529271231568821, -33.647459095647825, -24.260931372233326, -14.053276636456571, -3.5872841231435073, -0.24821124990410889, 0.3856711850377551, -0.66137538568076071, -1.0227755630951023, -0.66844910598607266, 3.9066652322249751, -4.4142064356851165, 10.946378631138813, 5.3856662644378339, -14.100113777774116, 31.200338855208855, -19.479390479219351, 0.57608988546757856, 14.195954313030994, -9.3832743597685617, -3.1124056384095939, -2.5793951871330338, -0.64780309118445645, 1.6225398299131557, 2.7804484266994689, 2.4431302941492916, -1.1232923919613498, -6.4733533392663958, -7.368877610403441, -10.924705320166419, -21.096779572501951, -23.251277269357679, -40.707191608758833, -33.671186166610063, -31.761133485200901, -13.443724261124748, -2.0904065823843769, 2.5467748158366237, 1.6832477381822348, 1.0149409800154132, -0.98666637905348697, -0.49088325395452825, -5.734734089519665, 7.3858280585813008, 3.5521886878464564, -5.8449684444103243, 17.045217645163998, -5.7392947419715155, 15.360897164532778, -10.951455398944907, -4.1317473271038754, 9.4901775499106655, -6.6638352938822702, -1.7578951205789377, 0.96051225634844795, 1.5689869488244914, 2.9581057860873381, 1.4683911434432237, -1.5587865083620118, -10.231244633613667, -16.359265688234554, -18.554102826607274, -5.1543156647129926, -24.943328767927714, -23.996907911576475, -33.918445473292081, -25.169617383291836, -15.895360345460304, -0.48745205753098297, 4.2936344828625552, 4.3945543864167149, 1.6389132121610113, 0.53110232172653837, -4.4885662153073405, 0.85263104321570904, 0.87489834284363122, -6.2785045354550046, 13.324209534416719, -3.1829717367300314, 5.0577698714645702, -2.8823702512549096, 8.9257994152947653, -4.3959804108056124, -3.742325362160086, 4.3477010834395236, -2.7902732019969543, 1.2927419412763401, 1.8952846661475349, 2.4971924284976934, 1.1673355625318764, -2.4025753394703346, -5.4576855654411656, -13.644932734111133, -12.814680673201632, -28.901352722188015, -0.96974162117503315, -22.744598059671098, -21.558658775121231, -23.680136621529623, -11.949390330752514, -3.0953565929079563, 4.3994325344570004, 4.1829115306886644, 3.4842402749887649, -0.72052624692711631, 0.81910125894632069, -2.1077672614040264, -4.772931412347166, 7.1463089769422288, -2.1235611153433602, 2.6189977871286789, -1.8802124921713912, 3.5197176720292407, -0.1304949581879572, 5.5805618725494606, -3.191291372802759, -3.8284308308873531, 2.228265375461667, 0.0069858778603283057, 1.5690941230143916, 2.4444202103018267, 1.3522725353705702, -0.62283616740308378, -3.546929348907534, -2.1152085218133783, -6.6330620252487682, 11.947201833901675, -19.014215780515311, 5.4087151249861485, -7.159760470678993, -9.1039623125675071, -12.18538650615837, -2.2919486155920032, 1.7068861549694805, 4.1227589144067789, 1.6150024285043441, 2.4446070412760443, 0.027677673297527423, -3.981433151550863, 1.6262628596018724, -2.0131074000190696, 2.4176769851497326, -2.6381100233578612, 1.4672332071937413, 0.85834734780414157, 4.2071746247347095, 1.3317994275810989, 0.61519740478738694, -1.6967848504036496, -2.3700280505641422, 1.8697004151394931, 0.5733840782028331, 1.397546681499154, 0.99505064345958893, -1.2521971880796428, -2.6090675920379729, -7.8208026967229012, 1.1221271518159068, -30.877310974743335, -70.117668379782501, -49.576244746235311, -1.8234355680484657, 2.9542792497778261, -1.2400980139631994, -3.7638952884372125, 2.8433755069243154, 1.499131008976947, 3.4858876190620642, 1.1999635798105424, -0.78195787446931964, 0.9986473214357916, -2.332530309434083, -0.72950552648488864, -1.3748500076734225, 0.64031672309302556, -0.50673349306550342, 3.375425027785985, 1.930207445952772, 2.7261985428418698, -1.0649069250197167, -0.77076345191255435, -0.7069206586422051, -0.72458607165999755, 1.7584707522262737, 0.44324044078250502, -1.0747519793408324, -8.6535618432689372, -12.406583490274217, -25.375797504305602, -47.258739472196019, -34.226649356312784, -208.58597838816522, -92.321882041990833, -43.731983623163735, 23.236903073401958, 7.4696827367159822, 12.462674546124104, 2.9281859927886771, 7.6513645380808271, 3.3158091950668926, 0.8152878302494978, 1.7252645996655027, -1.4761658864245817, -0.88689757979195827, -1.7161555169970975, -0.48048213041447491, -0.61786747800518715, 1.7221472209588695, 1.4410603816132017, 2.8318141898836315, 1.5552847934305372, 0.05277298563978073, -1.5313768256641445, -0.9921576725859278, 0.40867746076360606, -0.20621269482631011, 1.3571647909533708, -4.6272034575156908, -24.528917872852457, -48.488510187113178, -97.122360992020845, -177.03891975992676, -310.33479459235781, -461.88238037931535, -256.00130492151709, -34.106574161017335, -2.9066782920893011, 25.868477512213314, 12.192196214097933, 25.523369493146241, 13.12242317098773, 5.1950335909144911, 4.4953343292507366, 0.13078900915048275, -0.73758290379785463, -2.6398410865992936, -1.3437508199980366, -1.9947594371394133, -0.13384423623915356, -0.082235364558330679, 2.6240286812162581, 2.7995613930164374, 3.1986596327502643, 0.082031723657369299, -0.85878662181523746, -1.9228187006577324, -0.91768473485829727, 2.7285347510623108, -5.5081763037407097, -16.528423808469462, -56.862298146519464, -120.24788693418984, -233.9571731646403, -367.42140066372525, -400.36625478870656, 32.238903864660138, 56.726426890699642, -26.189735785051667, 73.747213183594084, -25.856495589804108, 68.243510763698637, 40.854552179345092, 21.918559933832821, 17.964658686821831, 4.7205289930151793, 2.1976906085987129, -1.3072901204360032, -2.3902937959311101, -2.6652215067300165, -1.0190926814191563, -0.40862649299943438, 0.23490025627283342, 3.1224293708179411, 5.2622609905015993, 4.1057658132160988, 1.331963954168899, -2.0456835555590454, -2.1157075816862583, -2.504533118281568, -2.4803036198391473, 0.83416770813248287, -49.109708531705543, -122.25882006598383, -192.62108000541431, -359.76401050336045, -412.96733723829362, -397.42763261597815, 1066.0901100808455, 361.29505764988636, 280.2462227959299, -113.44009243151743, 69.042238954208585, 62.271759486118853, 60.869480400001216, 65.591240653703366, 20.164632449396354, 9.1879671692563107, 1.7806530124300617, -1.2377659738691233, -4.7505220002798652, -3.0896458550052697, -2.5520560959227772, 0.35173698335277165, 0.10870593803433028, 6.2828152868834488, 7.5557834297934026, 6.8702061592834163, 1.9290601504224327, -1.4310556478304128, -4.402811570224995, -4.9702839577387659, -8.4569554634772928, -28.849867481960956, -37.630624824957771, -187.57398243385583, -242.13940044346546, 49.090655504701473, 223.15101669036463, 1171.270132092355, 797.42142339187455, 1105.712587716775, -56.883206971068894, 58.961155821254195, -85.625899103861229, 67.595097514571449, 153.42214558232899, 61.379175063000453, 45.232132533425769, 12.736128845291734, 6.1241971022030093, -3.4081781277481404, -8.0099491969618857, -8.7133201843538846, -0.50258781153503296, -6.2100452165045663, -0.055102663998530817, 7.2904568591883807, 11.383176063308918, 8.3377118534845209, 5.009304162269923, -3.7481817410605087, -5.9093841314446331, -10.425252515086191, -13.171326963991898, -46.446591336113507, -153.25086116745101, -61.506465075545563, -49.92317026240935, 238.33663106152528, 1665.2932495998259, 1141.9271710506428, -2184.1299326736644, -2621.2839732861944, 1461.5017842629866, 622.62775933129569, -150.90670251969709, 353.39952612993454, 133.18984159990904, 96.051765336731378, 48.315266721271847, 26.315486653092378, 12.47210594725734, -0.11325917153558851, -7.3164558165842362, -6.2779141420297728, -6.325879336386472, -6.7615499928705614, -5.7853993354930182, 6.8948411718656626, 16.574215370008741, 12.843645059742064, 5.220057623492746, -3.813299856725167, -10.051165980763182, -16.420203889130285, -29.183435066681557, -64.570588674310201, -181.43163787734505, -272.38382351444022, 695.96261474412938, 397.20604751762363, -1430.9649107108592, -343.81610498084137, -10840.70196519443, 3453.3010516439876, -827.61688284819604, 1299.088897602802, 867.92363746103354, 248.20433151041067, 209.92149032340356, 104.5932404597956, 56.939768493357427, 19.205045070960029, 9.3006029966243737, -3.0671728952866175, 1.5669942788764133, -5.5752197676024959, -4.7947040656806426, -12.570054144236753, -3.2879617770347638, 0.44183444538609318, 16.179758937656128, 15.672094697047777, 15.514190495563801, -6.2249226907648021, -9.506443517257205, -24.595484776028343, -43.394725496932452, -113.80000983072682, -179.30887547689812, -162.42212696599955, 210.28695062763467, 461.44982475214965, -3231.3822724351485, -18380.248977426934, -21415.511526704078, -11789.651384311637, 6340.0761451283952, 3254.3286688062612, -274.13539619635947, 816.21574466320624, 214.24479740751747, 150.50951383829917, 62.077231813228565, 28.921613512340514, -1.7353747463964819, -0.92198929608524804, -10.299898240809465, 0.679005237978899, -28.352674755287008, 1.4030381833925814, -4.4649861577325289, 13.739274709477487, 12.454719286950338, 19.12568021630095, 11.158748163655963, -3.3051410229907021, -16.992665274592852, -22.790809731221124, -60.852179067446897, -118.67047187223945, -253.85827683649717, -106.10534760670436, 477.33409412636507, -4606.7423967050645, -6140.0706338628543, -9240.4816801839206]}};

var nose_filter = {"real": [3.0408379415611857, 0.37822261363137938, 1.1747173276627942, 0.87791572866957501, 0.27429578524536991, -0.26015038230887205, -0.04589694540462394, 0.18194913988848616, -0.19035992880648842, -0.050064472206627651, -0.016354960260506177, 0.073013903204916478, 0.15053197342937383, -0.47378158951033317, -0.33333577915227425, -0.30434085338299055, 0.26372284406307878, -0.30434085338299449, -0.33333577915227836, -0.47378158951033028, 0.15053197342937505, 0.073013903204915576, -0.016354960260505706, -0.050064472206628768, -0.19035992880648842, 0.18194913988848541, -0.045896945404624932, -0.2601503823088735, 0.27429578524536952, 0.87791572866957457, 1.1747173276627942, 0.3782226136313796, 1.5638480130127614, -1.0502161590016221, -0.28144140655806793, 0.66007876209063499, 0.25575295594566605, -0.11471557758718753, 0.22751157962613866, -0.29100003355994186, 0.29242994865853178, 0.14950061311078749, -0.02214037256893809, 0.034503572794411914, -0.17412889405901469, 0.060297128338254534, -0.49717312826403576, -0.10585857030501357, 0.082780177430083327, -0.11056584899062352, -0.72499416196392785, -0.15612863751308359, -0.36586758725441215, -0.19718551141955715, -0.043434328775718851, -0.060442748560529294, 0.1383233017601592, -0.071714399164362744, 0.31725814504248484, 0.16801904131477274, 0.58675004339129755, 1.5155025161072819, 0.99232752650122635, -1.0129349058609656, -1.6725083187014358, -0.66077224091757791, 2.2217962254133496, 0.98390492917013095, -0.16319024909703178, 0.67271651276019184, 0.16380771710007475, 0.21989373735679621, -0.12296413131763459, -0.18224776807046256, -0.011168077595514938, 0.10364961453623285, 0.1359801303077682, -0.26339593722715721, 0.039396952561874886, -0.33866696253626483, -0.0043101841409601402, 0.17740469505625342, -0.10830858623812685, -0.33186051211466239, 0.12060535717228799, 0.084703474730635803, -0.086262426064740078, -0.1297477439897661, -0.28426475792188655, 0.21965961682575447, 0.24955999100642301, 0.46804088594167448, -0.46946217188769823, -0.31724338121882617, 1.7716903674840139, 0.56577881124465312, 0.71512595047089234, 0.4910867492003736, 0.92310119575914651, -1.0939934957719639, 0.18102793706565934, 0.35484595526186652, 0.48676804973393767, -0.097923922056211768, -7.8200063684236368e-05, -0.016095705887683227, -0.084263209727683391, 0.0080331646697531477, -0.044853168166469837, 0.0062170702455977547, -0.15890945005602863, 0.22815908460498888, 0.17110516400703918, -0.29052216822588434, -0.18224178792918044, -0.018421573557969844, 0.032535239746583795, -0.08121081614537759, -0.029175915115094032, 0.092929862040843081, 0.16824405476099044, -0.24679227625704581, 0.00030176170486908785, 0.023943010115746295, -0.43281940369171445, -0.57166836623813821, 1.2482467538506352, 0.74385331371246666, 0.54787745216002559, 0.92898941300038174, 0.54473301805335128, -0.4877077226718825, -0.40370312470951597, 0.39096527623299848, 0.12644205243911047, 0.0424168022733412, 0.049219693586430309, -0.077748186566067037, -0.043614575991677208, -0.0041635061718157101, 0.07897222152752259, 0.053944973270972973, 0.11232623315704468, -0.070445625631503542, -0.072057201177642652, 0.12706805404252855, -0.13757198545862262, -0.31639223989443899, -0.029240486244660611, 0.10973045554309782, 0.04102655016489614, 0.01891084247324943, -0.056922369420476487, 0.030805208457151782, -0.1512000567754726, -0.058122663069861934, -0.30506910575481916, -0.79033868813295383, 0.026308878650124864, 1.7521122327973906, 0.64566220514793682, 0.40042515638418263, -0.33461208848408402, -0.55369429571770823, -0.030140868003777126, 0.27230784814155334, 0.008194429787378334, -0.030645866021173498, 0.023928227792328404, 0.090706510487419734, -0.021569631345745226, -0.0064127815367693367, -0.026343653609827326, 0.0079365608693974798, -0.18791450411345401, 0.14319521757460194, 0.17003550871316017, -0.24661106106331201, -0.21167593067635404, -0.098206750946426211, -0.048592759447365123, 0.0028129255950110439, 0.049868939755416952, 0.039023237394102607, -0.0036267311717218496, -0.12930461632538415, -0.067411320951837855, 0.010801205387038189, 0.074931291451028059, 0.0657071501308885, -0.22930577035731903, -0.34894672904561169, 0.37107135970432037, 0.49136473213042475, 0.10645611255411164, -0.27741376367012294, -0.015474080963115254, 0.13417678111594294, -0.00046677178847574514, -0.064152245495751381, 0.038292630722847554, 0.017696001575747813, 0.0052157631901947011, -0.023883294001795573, 0.00060518848897931612, -0.088395093514235953, -0.11757758027246699, -0.019555697374511325, 0.025650630137194243, -0.043746931993730094, -0.08846438922222799, -0.074442233736365312, -0.0099104052825428144, 0.064871673248634965, 0.03524540038796406, -0.0065163090427015676, -0.065286881502250399, 0.023130909787941502, -0.028452880392855154, -0.098638256951482817, -0.23382813425811513, -0.077933249962103476, 0.069575788839216612, 0.86635491100693507, 0.33668792873864722, 0.34253529215971401, -0.019122146869457048, -0.016521364547457899, 0.098161425946316522, -0.011130337821465129, -0.092543539386829035, -0.0046973120649884213, -0.0086885172531639618, 0.041915865623990751, 0.004043623749362439, -0.037907101781325205, -0.03902357631677511, -0.037690963997300889, -0.11419210623041842, -0.076732726183972602, 0.12573571356763677, 0.012633232837618465, -0.098942005293094951, -0.061888601165125671, -0.0090012900880717846, -0.014247675993027883, 0.027023228844142398, -0.0050282774165556453, -0.031667371615742887, -0.033818612421867206, -0.01148054478950835, 0.002410610826462259, 0.084402385062259444, 0.069824545029654947, 0.043930202648898894, 0.078872059827297045, 0.055053359776043469, 0.0133618922103162, 0.068453834537836655, 0.081701490128889276, -0.023034972903402569, -0.042406682273060693, 0.035148729718712253, -0.037569795749083354, -0.0041828274568459145, 0.012961699649937737, -0.015475583648045266, -0.027857672235467607, 0.011169867646763214, -0.052725469767566695, -0.0070148730067698924, 0.053188940442296044, -0.095289423698368528, 0.016377276604450954, -0.015232023889946105, -0.077682201861009353, -0.048207693014304241, 0.014396940553395536, 0.021075876818278678, -0.0024069559974744716, -0.016758259649352489, 0.031865879706987753, 0.032824623168326933, -0.074182732572421473, -0.080036865363297197, 0.055652716802045685, 0.11130862970905192, 0.072952972838101024, 0.035098396968263772, 0.070242479721294437, 0.040747896169172335, -0.022459274904977577, 0.014257984954846613, 0.019887732012022184, -0.040811004345713692, 0.0088191619820225595, 0.012579825412037176, 0.0010521231241174983, 0.006430724322423028, -0.0107697788586532, -0.065313535534231901, -0.062769573271966861, 0.11452944472315789, 0.040092306883550234, 0.12236977033818973, 0.13624403896529741, 0.027359429809611827, -0.0259369720098807, -0.021419082531908291, -0.02797214703330133, 0.0080320798501609496, 0.0013100558771969473, -0.0052561866064455981, -0.0097375289490629017, 0.028455863356249757, 0.056425701741664613, -0.0014166564531825356, -0.032528933027316242, -0.019619112630340951, 0.065700689463789611, -0.027574493612476551, -0.032810042710946841, -0.021337213333243964, 0.019592990080295629, -0.019759750092557201, -0.030135000999364853, 0.031698488621630008, 0.023522054710864718, -0.021766544372719836, -0.0029827434432790761, 0.0078373508878122541, -0.0028057606437618767, -0.033232550782043478, -0.070830818977105636, 0.059080455669844649, 0.36951320092865036, 0.091411128665944044, 0.16404233417264649, 0.062598270207454218, 0.044986403519809939, -0.081510896741027974, -0.042341618007147169, -0.019737461729971092, -0.0048974001169366831, 0.01654258945512711, 0.0088012977267579451, -0.013696041496545335, -0.0020268100930256635, 0.015845305908809133, 0.016458612619479462, 0.00059474001274681517, -0.078529066256991353, -0.013402803779002156, -0.0036013299995064228, 0.037573591582025043, -0.0076636494655425947, -0.0021144243161753088, 0.032140257903604356, 0.0203960516207237, -0.013294834505552555, 0.0021732333351695376, 0.015223562704661827, -0.01560949450401263, 0.015060609589555461, 0.099241248305729085, -0.19173261262163863, 0.2450151004066432, 0.26383919410790774, 0.33963060937430933, 0.34586223870135113, 0.1799263961717959, 0.13137374163691276, -0.036493858716968031, -0.041981936023927684, -0.060258932305754208, -0.0099079010405710068, -0.010024579181759819, 0.016637976300589805, 0.031629106230310143, -0.011441752446030828, -0.010113005489671789, -0.027490450999295705, -0.018258671855796018, 0.061296263921274532, 0.10180457538537498, 0.097647442588889397, 0.063246459754600901, 0.0018146068702083835, -0.012539173975430248, -0.008345642545901014, 0.020763503842579332, 0.035996162307667869, -0.015675575409266479, -0.029662747125522582, 0.021312770128680401, 0.08274253615935892, -0.10682054954404013, -0.033729052458342255, -0.12662108035586636, 0.18053751384272299, 0.70940599530087467, -0.21337246968950196, 0.09763637724258438, 0.15345959634626791, -0.11690110107335749, 0.030098075283007168, 0.034186076429122053, -0.021402902917041923, 0.0046349096026103891, 0.011776544425663813, -0.0089673934626629329, 0.025701507905379287, -0.029333520957471802, 0.0051215906448292756, -9.6207917787476249e-05, -0.027988212781709806, 0.093695296747695708, 0.10174972110658871, 0.1657472048824174, 0.097917377942654052, 0.0075790364114050627, 0.031051039914505564, 0.015692601846482499, -0.015197940538429407, 0.026154427883432859, 0.038178927860434288, 0.07391023019778703, 0.0062621769249755375, 0.14786394857966245, -0.24133125024592791, 0.31944609486771169, 0.50715637065140251, 0.3628700351691248, 1.3060302403517683, -0.51467834215318464, -0.23826829822593068, -0.0093468845104923252, 0.16015106243072727, 0.02805086056222977, -0.0035899004350242064, -0.0055435803643170143, -0.026732920924661639, -0.010772744125100176, -0.024390993371714485, 0.012627431507206405, -0.0087203787935273471, 0.017390054254405412, 0.12375300108425245, 0.24623032442851775, 0.32220608581938742, 0.14931322115435106, -0.030460558403777184, 0.017160725214558258, -0.0094839753900354314, -0.040937983123008212, 0.021461267056132466, 0.052605242734811673, 0.082583919156513017, 0.060994911510484674, 0.19212485777257118, 0.030490864773295545, 0.17592824054988929, 0.2988664581273196, -0.3440942993173739, 1.3210609586317499, 0.059297195869563314, 0.66450815180221101, -0.18837022473974091, 0.34310308052214539, 0.41335445680081984, 0.18880277280085617, -0.0025387166530481263, -0.027056960212979365, -0.014992917126512385, -0.065825070508153574, 0.0059924400617866053, 0.016058491686644451, 0.096318218677932735, 0.11648035795043635, 0.083105673180647682, 0.32671351148908129, 0.21720864831216413, 0.29412476851730657, 0.14853499339159934, 0.018970981025801619, -0.0063191769526926853, -0.01818046447321878, -0.033255690840711123, 0.042088106914846247, 0.11598544099090941, 0.13859711550376397, -0.01128947190338442, 0.086653868373652729, 0.5559656926196751, 0.37680556076813249, 0.88488899182435787, -1.1019114795534606, 1.0072326177374842, -0.25696609936231163, 0.22595605005106759, 0.20124367647634336, 0.25020565573121023, 0.15194580903531119, 0.054188690404279045, -0.031588472981034531, -0.072469006265441768, -0.025752917138555535, -0.0471489088024604, 0.079293556902861981, 0.16429646904639772, 0.19502382977708654, 0.21468548823411557, 0.26510515339808566, 0.4121092848683291, 0.24137856300787749, 0.039245063706659693, 0.01328784964664576, 0.063938494959291103, -0.056808918829038463, -0.039159725623022792, 0.028736615885883075, 0.075674855852819814, 0.10715382591497533, 0.29941075202959372, 0.24751816611443234, -0.14971685838339424, 0.92725020353048182, -0.58030730777587713, 1.4965419400087898, -0.58030730777587824, 0.92725020353048315, -0.1497168583833956, 0.24751816611443228, 0.29941075202959394, 0.10715382591497527, 0.075674855852819592, 0.028736615885883075, -0.039159725623022994, -0.05680891882903847, 0.063938494959291325, 0.013287849646645755, 0.039245063706659422, 0.24137856300787733, 0.41210928486832976, 0.32671351148908501, 0.21468548823411696, 0.19502382977708541, 0.16429646904639761, 0.079293556902861592, -0.047148908802460261, -0.025752917138555938, -0.072469006265442351, -0.031588472981034621, 0.054188690404279302, 0.15194580903531177, 0.25020565573121106, 0.20124367647634361, 0.22595605005106811, -0.25696609936231096, 1.007232617737484, -1.1019114795534584, 0.88488899182435599, 0.37680556076813088, 0.55596569261967799, 0.086653868373653353, -0.011289471903383815, 0.13859711550376486, 0.11598544099090989, 0.042088106914846005, -0.033255690840710936, -0.018180464473218153, -0.0063191769526928735, 0.018970981025801085, 0.14853499339159881, 0.2941247685173069, 0.21720864831216452, 0.24623032442851894, 0.083105673180647877, 0.11648035795043606, 0.096318218677932249, 0.016058491686644111, 0.0059924400617863598, -0.065825070508153657, -0.014992917126512623, -0.027056960212979545, -0.0025387166530475712, 0.18880277280085703, 0.41335445680082034, 0.34310308052214539, -0.18837022473973905, 0.66450815180220979, 0.059297195869561843, 1.3210609586317497, -0.34409429931737384, 0.2988664581273206, 0.17592824054988909, 0.030490864773296485, 0.19212485777257224, 0.06099491151048541, 0.082583919156513072, 0.052605242734811722, 0.021461267056132546, -0.040937983123008163, -0.0094839753900352007, 0.017160725214558203, -0.030460558403777944, 0.14931322115435064, 0.32220608581938709, 0.093695296747697082, 0.1237530010842532, 0.017390054254405134, -0.0087203787935278762, 0.012627431507206037, -0.024390993371714388, -0.010772744125100247, -0.026732920924662094, -0.0055435803643169856, -0.0035899004350241582, 0.028050860562230339, 0.16015106243072863, -0.0093468845104915464, -0.23826829822592965, -0.51467834215318398, 1.3060302403517683, 0.3628700351691248, 0.5071563706514024, 0.31944609486771208, -0.24133125024592691, 0.14786394857966259, 0.0062621769249767058, 0.073910230197787502, 0.038178927860434683, 0.026154427883432977, -0.015197940538429256, 0.015692601846482655, 0.031051039914505491, 0.0075790364114048233, 0.097917377942654316, 0.16574720488241704, 0.10174972110658852, 0.10180457538537414, -0.027988212781709362, -9.6207917787273747e-05, 0.0051215906448293215, -0.029333520957471861, 0.025701507905379183, -0.0089673934626627958, 0.01177654442566399, 0.0046349096026104134, -0.021402902917041607, 0.03418607642912222, 0.030098075283007585, -0.1169011010733573, 0.15345959634626896, 0.097636377242582312, -0.21337246968950468, 0.70940599530087356, 0.18053751384272154, -0.12662108035586525, -0.033729052458342325, -0.1068205495440398, 0.082742536159359198, 0.021312770128680637, -0.02966274712552271, -0.015675575409266458, 0.03599616230766798, 0.020763503842579301, -0.0083456425459010053, -0.012539173975430275, 0.001814606870208027, 0.063246459754600651, 0.097647442588889521, -0.013402803779000846, 0.061296263921273318, -0.018258671855796015, -0.027490450999295389, -0.010113005489671634, -0.011441752446030721, 0.031629106230310081, 0.016637976300589583, -0.010024579181759814, -0.0099079010405707553, -0.060258932305754062, -0.041981936023927795, -0.036493858716967892, 0.13137374163691345, 0.17992639617179582, 0.34586223870135102, 0.3396306093743105, 0.26383919410790552, 0.24501510040664315, -0.19173261262163757, 0.099241248305728891, 0.015060609589555881, -0.015609494504012908, 0.015223562704661735, 0.0021732333351695459, -0.013294834505552418, 0.02039605162072387, 0.032140257903604141, -0.0021144243161752658, -0.0076636494655425496, 0.037573591582025015, -0.0036013299995066783, -0.027574493612477238, -0.078529066256990701, 0.00059474001274650921, 0.016458612619479316, 0.015845305908809258, -0.0020268100930258088, -0.013696041496545191, 0.0088012977267581446, 0.016542589455127047, -0.0048974001169365296, -0.019737461729970797, -0.042341618007146614, -0.081510896741027863, 0.044986403519810654, 0.062598270207453191, 0.16404233417264671, 0.091411128665944058, 0.36951320092864953, 0.059080455669845232, -0.070830818977105567, -0.033232550782043346, -0.0028057606437617323, 0.0078373508878121518, -0.0029827434432791976, -0.021766544372719729, 0.023522054710864829, 0.031698488621629953, -0.030135000999364715, -0.019759750092557201, 0.019592990080295483, -0.021337213333244086, -0.032810042710946043, 0.035098396968265562, 0.065700689463788264, -0.019619112630341284, -0.032528933027315937, -0.001416656453182401, 0.056425701741664544, 0.028455863356249663, -0.0097375289490629503, -0.0052561866064455114, 0.0013100558771970501, 0.0080320798501610554, -0.027972147033301621, -0.021419082531907708, -0.025936972009880058, 0.027359429809612409, 0.13624403896529816, 0.12236977033819048, 0.040092306883550463, 0.11452944472315811, -0.062769573271967, -0.065313535534231998, -0.010769778858653123, 0.0064307243224230766, 0.0010521231241173155, 0.012579825412037126, 0.0088191619820226965, -0.040811004345713484, 0.019887732012021993, 0.014257984954846677, -0.022459274904977573, 0.040747896169171828, 0.070242479721293896, 0.055053359776043469, 0.072952972838101038, 0.11130862970905199, 0.055652716802045553, -0.080036865363297377, -0.074182732572421722, 0.032824623168326919, 0.031865879706987767, -0.016758259649352489, -0.0024069559974744621, 0.021075876818278654, 0.014396940553395566, -0.048207693014304456, -0.077682201861009201, -0.015232023889946197, 0.016377276604451121, -0.095289423698368528, 0.053188940442295753, -0.007014873006770006, -0.052725469767566646, 0.011169867646763318, -0.027857672235467666, -0.015475583648045285, 0.012961699649937817, -0.0041828274568459145, -0.037569795749083312, 0.035148729718712211, -0.042406682273060839, -0.023034972903402475, 0.081701490128889429, 0.068453834537836641, 0.013361892210316275, 0.33668792873864783, 0.078872059827295921, 0.043930202648898596, 0.069824545029654933, 0.084402385062259569, 0.0024106108264623457, -0.011480544789508253, -0.033818612421867275, -0.031667371615742741, -0.00502827741655568, 0.027023228844142416, -0.014247675993027993, -0.0090012900880712381, -0.061888601165125297, -0.098942005293094756, 0.01263323283761883, 0.12573571356763666, -0.076732726183971922, -0.11419210623041808, -0.037690963997301666, -0.039023576316775249, -0.037907101781325052, 0.0040436237493623132, 0.041915865623990772, -0.0086885172531639947, -0.0046973120649884377, -0.092543539386828647, -0.011130337821465186, 0.098161425946316272, -0.016521364547457937, -0.019122146869457519, 0.34253529215971379, 0.37107135970432042, 0.86635491100693385, 0.069575788839216376, -0.077933249962103462, -0.23382813425811527, -0.09863825695148333, -0.028452880392854651, 0.02313090978794155, -0.065286881502250455, -0.0065163090427018816, 0.035245400387964018, 0.064871673248635159, -0.009910405282542379, -0.074442233736364327, -0.088464389222228296, -0.043746931993730226, 0.025650630137194336, -0.019555697374510583, -0.11757758027246727, -0.088395093514236453, 0.00060518848897882292, -0.023883294001795972, 0.0052157631901946491, 0.017696001575747886, 0.038292630722847568, -0.064152245495751242, -0.00046677178847581285, 0.13417678111594261, -0.015474080963115183, -0.27741376367012288, 0.10645611255411111, 0.49136473213042497, 0.64566220514793704, -0.34894672904561197, -0.22930577035731828, 0.065707150130888653, 0.074931291451028587, 0.010801205387038527, -0.067411320951837883, -0.12930461632538409, -0.0036267311717218076, 0.039023237394102503, 0.049868939755416578, 0.0028129255950110478, -0.048592759447364742, -0.098206750946425017, -0.21167593067635238, -0.24661106106331246, 0.17003550871316073, 0.14319521757460188, -0.18791450411345456, 0.0079365608693964147, -0.026343653609827478, -0.0064127815367698198, -0.021569631345745438, 0.090706510487419845, 0.023928227792328456, -0.030645866021173446, 0.0081944297873781744, 0.27230784814155318, -0.030140868003777244, -0.55369429571770845, -0.33461208848408441, 0.40042515638418175, 0.54787745216002603, 1.7521122327973908, 0.02630887865012415, -0.7903386881329546, -0.30506910575481899, -0.058122663069862322, -0.1512000567754718, 0.030805208457151921, -0.056922369420476453, 0.018910842473248434, 0.041026550164896362, 0.10973045554309671, -0.029240486244660805, -0.3163922398944391, -0.13757198545862218, 0.12706805404252669, -0.072057201177643526, -0.070445625631504319, 0.11232623315704422, 0.053944973270972273, 0.078972221527521536, -0.00416350617181658, -0.043614575991677791, -0.077748186566067592, 0.049219693586430378, 0.042416802273341318, 0.12644205243911066, 0.39096527623299887, -0.40370312470951558, -0.48770772267188234, 0.54473301805335006, 0.92898941300038107, 0.71512595047089234, 0.74385331371246577, 1.2482467538506357, -0.57166836623813888, -0.43281940369171401, 0.023943010115746077, 0.00030176170486927514, -0.24679227625704431, 0.16824405476099039, 0.092929862040844205, -0.029175915115095267, -0.081210816145377299, 0.032535239746583337, -0.018421573557966798, -0.18224178792918325, -0.29052216822588622, 0.17110516400703951, 0.22815908460498383, -0.15890945005602886, 0.0062170702455973175, -0.044853168166470177, 0.0080331646697508995, -0.0842632097276826, -0.016095705887684088, -7.820006368420517e-05, -0.097923922056211893, 0.48676804973393806, 0.35484595526186524, 0.18102793706565945, -1.0939934957719641, 0.9231011957591454, 0.49108674920037432, -1.6725083187014362, 0.56577881124465212, 1.7716903674840145, -0.31724338121882639, -0.46946217188769945, 0.46804088594167398, 0.2495599910064237, 0.21965961682575341, -0.28426475792188616, -0.12974774398976752, -0.086262426064739897, 0.084703474730633041, 0.12060535717228706, -0.33186051211466344, -0.10830858623812538, 0.17740469505624151, -0.0043101841409599814, -0.33866696253627121, 0.0393969525618715, -0.26339593722715154, 0.13598013030776659, 0.10364961453623139, -0.011168077595515221, -0.18224776807046214, -0.12296413131763473, 0.21989373735679868, 0.16380771710007386, 0.67271651276019118, -0.16319024909703136, 0.98390492917013062, 2.2217962254133496, -0.66077224091757802, 1.5638480130127614, -1.0129349058609651, 0.99232752650122769, 1.5155025161072819, 0.58675004339129688, 0.16801904131477496, 0.31725814504248523, -0.071714399164359219, 0.13832330176015895, -0.060442748560523389, -0.043434328775720558, -0.19718551141955432, -0.36586758725441343, -0.15612863751307984, -0.72499416196393318, -0.11056584899062098, 0.082780177430082938, -0.10585857030502534, -0.49717312826403764, 0.060297128338251849, -0.1741288940590143, 0.034503572794408806, -0.022140372568936324, 0.14950061311078439, 0.29242994865853189, -0.29100003355994419, 0.22751157962613949, -0.11471557758718894, 0.25575295594566499, 0.66007876209063321, -0.28144140655806837, -1.050216159001623], "bottom": {"real": [5837.242024063461, 16421.190569053251, 8527.2275182117319, 3938.41845467232, 969.21000043764093, 269.87346390668256, 193.53992011404216, 135.14631901451781, 58.523829955616236, 29.311524302602624, 20.863281166035843, 14.808244655557742, 11.401757474781434, 9.6386493936653288, 8.0538591094176777, 7.4714398062124641, 7.2711776175262477, 7.4714398062124241, 8.0538591094176653, 9.638649393665327, 11.401757474781416, 14.808244655557761, 20.863281166035858, 29.311524302602734, 58.523829955616236, 135.14631901451779, 193.53992011404216, 269.87346390668273, 969.21000043764059, 3938.4184546723186, 8527.2275182117301, 16421.190569053259, 14982.474506443205, 4755.1985786680198, 3083.8642011691682, 1502.8058566448747, 596.26851293203197, 262.35520536881347, 201.52671733896852, 108.13603201941604, 57.999252895466505, 28.992297197792773, 19.233600066307524, 13.871180161098291, 10.761421361485239, 8.8506828512506655, 7.8125584926262617, 7.1234501229356377, 6.6618841738486525, 7.1762884709606958, 8.1416889804019927, 8.8663632607744063, 11.328672883224474, 14.773155762512141, 20.058056528572401, 28.688344099071909, 57.995376649220766, 126.94075502116374, 211.30702516808583, 262.54448595536269, 752.96024761972672, 2141.5368023327851, 3891.3661973657881, 5583.5460990085166, 9500.6528086677681, 4225.3848573287933, 1708.1934289355966, 562.9450489663958, 526.41420210821127, 290.26438540271903, 151.34732218304231, 89.304597077577796, 50.161041673414204, 27.913649363990057, 19.253723232543383, 14.310501425792925, 10.622538104620221, 8.6520747616015274, 7.6796432895344049, 6.9311889072641995, 6.5442165971044535, 6.8352472963781299, 7.2531587818267287, 8.8125700197174819, 10.256278085266516, 13.962876672312342, 18.680978544191657, 27.641611280844351, 51.70590284164593, 92.383035108628647, 175.23999552329536, 238.6238705323166, 446.2130896894364, 589.84950644143407, 1459.800700420838, 2983.6421667816849, 6639.6980670311659, 3615.9230624353354, 1045.9683029029898, 541.95698246733389, 551.2292078912385, 269.01748102372522, 121.81702466062521, 78.619304368994548, 46.266475261147157, 26.895860643920866, 18.966790938143397, 14.141216689343503, 10.624588727031869, 8.5120674584469107, 7.5084078178458054, 7.127942028564302, 6.5505226441602824, 6.5976614570745582, 7.5671769464103935, 8.4293753366132105, 10.446992271959362, 13.755112829750516, 18.515159362788847, 25.868606557166544, 43.593025933023839, 76.847860046206122, 125.03651194390009, 241.77755195523335, 523.08499299660048, 633.36555854289827, 855.69476790230692, 2473.0066947172836, 2803.9496552692158, 1850.6397468329815, 645.77314636959022, 447.00563976857688, 381.6372474267435, 196.7755433249871, 93.586816816137713, 72.612365740746853, 43.711482900929944, 27.782222145016455, 18.647268962291367, 13.844325818813939, 10.350953817244738, 8.7140342291788997, 7.3516641952705921, 6.886474159529909, 6.1226840838853605, 6.7186507131414492, 7.0148796268173141, 7.9020046012660439, 9.6536048586555445, 13.744699851401226, 17.872279960942961, 25.025889030797831, 38.775468597625853, 68.228616115874232, 97.806667851841851, 178.52012140604563, 362.80035213144055, 506.96305099601244, 508.39785887877764, 1271.7627571663681, 1970.0713813014595, 1211.9708052435174, 448.82610946730466, 388.91483700385658, 294.26646682781944, 147.68595350614527, 76.563818921604266, 57.53338100926053, 37.094893522892434, 25.168957624787666, 17.405368368923924, 12.931100650610183, 10.211256703797424, 8.3783082007702649, 6.8845647672161352, 6.2954630311895761, 6.1711525716900475, 6.2852637654745882, 7.1318002457288037, 7.8126464614985656, 9.3562580058102185, 12.456351018938477, 17.12365920646733, 22.851195586808732, 34.22708028584924, 57.273965595477058, 82.126801795962663, 114.0182287640494, 248.69630423497404, 396.25330408596494, 382.77662480077174, 646.86127060880278, 1066.1959535576209, 770.74521634546068, 344.77171326148743, 328.21152488387929, 223.6732358532505, 124.39997807543456, 66.042124980023658, 49.833499278727395, 36.080812354502541, 24.010000461569632, 16.241873057458708, 11.94801819096188, 9.663620823552634, 8.1734814269274114, 6.8263151892657215, 6.1094005534487641, 5.5560364128866686, 6.0895161225652297, 6.7371553850929349, 7.5614980494024309, 9.3035460399083956, 11.904089289656403, 15.753116847312391, 22.116186781807659, 33.401673308199264, 45.775772578430164, 60.542807604917392, 91.412240599681226, 164.58197575163385, 289.97996145010069, 367.09809735899603, 433.51729458889321, 538.99714678707312, 436.9735160339028, 214.45700003213321, 226.27353228768246, 190.72528880002966, 104.24105887361294, 63.096291028318397, 44.895692115573439, 34.378771692376986, 22.743616534455565, 14.943130070579064, 11.306154107321404, 9.490726177732828, 8.057539867813432, 6.6249917656310648, 5.80530835366394, 5.6727594087192097, 5.6803994552580717, 6.4512234217242401, 7.3091820969038412, 8.9053168517088785, 11.147020821533502, 13.978280110937801, 19.308076160210224, 27.380246565144393, 39.45337202937899, 53.823906577074318, 70.344986096434994, 125.18491111128095, 220.27402210338624, 239.02095964975129, 253.52805611791149, 337.90351459641266, 301.96557555412664, 163.14862666039761, 176.1964602722083, 155.2640157056349, 91.402170635856464, 57.9223709952281, 44.132906015519367, 31.477476121951593, 19.994026988386896, 14.669539930994308, 10.52228821405147, 8.9499245076841039, 7.4160858759377133, 6.0652235290917815, 5.5336836347972449, 5.3453345499720717, 5.5251998880295652, 6.049359333226362, 7.4989544637904162, 8.6441457110666775, 10.17217183387787, 12.922358897606493, 16.497840703497662, 24.473525343022239, 36.893225695749557, 46.488420049270196, 60.008949681859932, 101.55324863109907, 172.57213254679178, 186.99209153386954, 177.69050334329205, 224.71115213821386, 219.35401697656656, 131.98987419085088, 139.58612051732652, 133.97255559613592, 83.717667146076977, 52.48988401855501, 39.948149447326976, 29.992243301791387, 19.792293237610107, 13.550533437330548, 10.191515700191694, 8.7251285565258279, 7.0130966099588283, 6.0412905020539274, 5.1695609453883042, 5.2335464217738297, 5.2748937601741233, 5.9151189141762242, 6.6404924993384702, 8.2525633194354864, 9.86505065394757, 11.857247340871206, 15.821441128307118, 21.809722446513074, 33.204842604441232, 45.292100524348356, 53.588237099743992, 86.046570865333351, 138.34470513151498, 144.28338780744133, 137.47961624149846, 184.36194031651988, 195.75342807998493, 111.69248606852764, 108.22432115257934, 110.31477193613289, 70.737952758714727, 45.316084199866118, 35.221165127538775, 25.132656234698317, 17.808708328889288, 13.205138111505544, 9.8319756958291311, 8.3851869715659166, 6.6979147774695411, 5.5577949826186863, 5.0640136062157843, 4.915924071395172, 5.1747375238921238, 5.621849200313962, 6.3926522738336189, 7.8838556827841355, 9.5880495388903295, 11.2702077240605, 14.675031755421674, 19.961485602094882, 28.340133288775018, 38.071807302485439, 46.211805942072893, 70.896288173632385, 115.46517347822648, 119.73189294718243, 110.21299532100423, 137.49078682179271, 145.21239507063157, 90.736475500202033, 84.820134662984671, 87.028887735269166, 58.592780926558561, 39.140475702708279, 30.030590426700837, 23.561748558876776, 17.07171690133644, 12.059539847971436, 9.1303469917064106, 7.8824915696444915, 6.5574577163884546, 5.4508327472027114, 4.6319487889521351, 4.8556936697031698, 5.0952139895658046, 5.3626061482546099, 6.0231504777267588, 7.3929124540904754, 8.8697139145390977, 10.839689611405708, 13.484775054138881, 18.125520870461621, 25.51326521840107, 33.814821758723511, 43.000660712963757, 59.289067569698993, 89.523100480006264, 96.002834501641331, 88.248403951505949, 114.22377327036351, 136.39754784126862, 85.133937137494058, 70.757613581150778, 72.941136445046624, 50.417131404641061, 35.29732697897046, 27.270836476117434, 20.337170678571646, 15.328073102208975, 11.227626008224609, 8.8894703399043831, 7.3066732490559749, 6.1117570010797007, 5.2240396800825373, 4.6927944754047974, 4.4462691956761722, 4.8997943453914665, 5.030120352863074, 5.8504059853355139, 6.9021030785339024, 8.6936481048417669, 10.014300550884089, 12.783989981758968, 16.915182814597465, 23.037925870268026, 29.781501040175886, 36.137786628939317, 46.659613314406016, 72.542096884400053, 80.098309124706176, 76.772569487169434, 87.96931966600367, 100.35528192635977, 66.390743706670477, 56.297220892995071, 57.449776912893739, 42.311817158751616, 30.3950154293208, 24.633397231162515, 18.800000277532757, 13.906344724637259, 10.685561612392762, 8.7726633553262534, 7.3765778222647702, 6.0238006847876884, 5.2082074327498917, 4.5886719664559399, 4.6166410353959701, 4.6115148269570563, 4.9920772309179853, 5.6445124723515159, 6.7980683034043956, 7.4975962005340229, 9.6066586869080837, 12.06652313244911, 16.251663826300451, 21.003823940677318, 27.622933573071261, 33.836788273738165, 41.877854423447168, 58.532835369703733, 68.239320296767971, 62.326149739008642, 71.583830955139561, 81.611391861674278, 61.290606958364052, 49.963935495056425, 49.744027747354536, 38.555965139546075, 28.313241453630848, 22.404376161451804, 17.69007471646092, 13.348861556136391, 10.46674681432143, 8.1507364253451371, 6.7804933363165576, 5.7303247473649055, 4.9737961537641029, 4.6591603640435002, 4.3691273542401863, 4.5876440856805019, 4.8775279419312838, 5.5643157824289267, 6.5106424514611394, 7.6517258774697732, 9.3978270674435489, 12.208065227131403, 15.316902707006163, 20.982661610009878, 26.317869298031479, 32.313264556083666, 38.062860113666069, 50.105167484748129, 58.219661124046276, 59.861157680092496, 61.019020366450448, 69.642805168222978, 57.634563900118565, 46.967523109902231, 43.85887184820529, 34.957640557066753, 26.505039983640941, 21.71545909517323, 16.236775633007202, 12.875777825381771, 9.9834739610997616, 7.8930497070448, 6.6829715569803687, 5.6672193704500122, 5.0794246915518446, 4.681264046528276, 4.6186632297539427, 4.6211092904368423, 5.0897865773957403, 5.5691810710797096, 6.5035187317991277, 7.2014326998593701, 9.1703620437944053, 12.475838151915292, 15.6623920524898, 19.528853843427893, 25.077028045409381, 30.833489267211636, 39.113296407386123, 46.770991427918581, 55.937485646720255, 57.570245344451905, 57.637817589030213, 59.860391566610879, 52.776195682327739, 43.839296967027423, 39.833012832197511, 33.598213438023812, 26.072700016436322, 20.276975501521189, 16.195672497297036, 12.239826665071417, 9.6875213487165066, 7.7379543893933631, 6.3786782254807157, 5.5950259327840586, 5.1232903828272987, 4.5786592309737237, 4.5178908466513406, 4.578659230973722, 5.1232903828272978, 5.5950259327840595, 6.3786782254807148, 7.7379543893933684, 9.6875213487165084, 12.239826665071421, 16.195672497297036, 20.276975501521182, 26.072700016436304, 33.598213438023805, 39.833012832197511, 43.839296967027416, 52.776195682327739, 59.860391566610836, 61.019020366450441, 57.570245344451919, 55.937485646720255, 46.770991427918517, 39.113296407386116, 30.833489267211636, 25.077028045409371, 19.528853843427893, 15.662392052489803, 12.475838151915296, 9.1703620437944, 7.2014326998593674, 6.5035187317991294, 5.5691810710797114, 5.0897865773957385, 4.6211092904368405, 4.6186632297539418, 4.6812640465282733, 5.0794246915518446, 5.6672193704500087, 6.6829715569803696, 7.8930497070447982, 9.9834739610997651, 12.875777825381764, 16.236775633007209, 21.715459095173252, 26.505039983640959, 34.957640557066775, 43.858871848205247, 46.967523109902238, 57.634563900118593, 69.642805168222949, 71.583830955139618, 59.861157680092482, 58.21966112404624, 50.105167484748137, 38.062860113666083, 32.313264556083666, 26.317869298031482, 20.982661610009867, 15.316902707006161, 12.208065227131399, 9.3978270674435436, 7.6517258774697732, 6.5106424514611394, 5.5643157824289284, 4.8775279419312856, 4.587644085680501, 4.3691273542401872, 4.6591603640434966, 4.973796153764102, 5.7303247473649037, 6.7804933363165594, 8.1507364253451371, 10.466746814321423, 13.348861556136386, 17.69007471646092, 22.404376161451779, 28.313241453630852, 38.555965139546039, 49.744027747354508, 49.963935495056418, 61.290606958364073, 81.611391861674235, 87.969319666003628, 62.326149739008663, 68.239320296767957, 58.532835369703712, 41.877854423447168, 33.836788273738158, 27.622933573071283, 21.003823940677311, 16.251663826300444, 12.066523132449106, 9.6066586869080837, 7.4975962005340202, 6.7980683034043929, 5.6445124723515194, 4.9920772309179844, 4.6115148269570598, 4.6166410353959719, 4.5886719664559372, 5.2082074327498908, 6.0238006847876866, 7.3765778222647711, 8.7726633553262587, 10.685561612392764, 13.906344724637258, 18.80000027753276, 24.633397231162533, 30.395015429320793, 42.311817158751609, 57.449776912893732, 56.297220892995028, 66.390743706670506, 100.35528192635975, 114.22377327036349, 76.772569487169449, 80.098309124706219, 72.542096884400053, 46.659613314406002, 36.137786628939317, 29.781501040175893, 23.037925870268033, 16.915182814597468, 12.783989981758975, 10.014300550884082, 8.6936481048417651, 6.9021030785339006, 5.8504059853355228, 5.0301203528630678, 4.8997943453914612, 4.4462691956761731, 4.6927944754048019, 5.2240396800825328, 6.1117570010797033, 7.3066732490559732, 8.8894703399043813, 11.227626008224609, 15.32807310220897, 20.337170678571649, 27.270836476117438, 35.297326978970467, 50.417131404641083, 72.941136445046638, 70.757613581150821, 85.133937137494073, 136.39754784126856, 137.49078682179265, 88.248403951506006, 96.002834501641317, 89.523100480006221, 59.289067569698972, 43.000660712963743, 33.814821758723504, 25.51326521840107, 18.125520870461624, 13.484775054138884, 10.839689611405714, 8.8697139145391013, 7.3929124540904745, 6.0231504777267606, 5.362606148254609, 5.0952139895658073, 4.8556936697031734, 4.6319487889521325, 5.4508327472027096, 6.5574577163884502, 7.8824915696444933, 9.1303469917064124, 12.059539847971436, 17.071716901336433, 23.561748558876776, 30.030590426700826, 39.140475702708279, 58.592780926558504, 87.028887735269151, 84.820134662984628, 90.73647550020199, 145.21239507063157, 184.36194031652002, 110.2129953210042, 119.73189294718252, 115.4651734782265, 70.896288173632399, 46.211805942072878, 38.071807302485439, 28.340133288775018, 19.961485602094882, 14.675031755421674, 11.270207724060505, 9.5880495388903277, 7.8838556827841364, 6.3926522738336233, 5.6218492003139611, 5.1747375238921247, 4.9159240713951746, 5.0640136062157861, 5.5577949826186863, 6.697914777469534, 8.3851869715659184, 9.8319756958291471, 13.205138111505548, 17.808708328889303, 25.13265623469832, 35.221165127538775, 45.316084199866097, 70.737952758714712, 110.3147719361329, 108.22432115257941, 111.69248606852767, 195.75342807998487, 224.71115213821398, 137.47961624149852, 144.28338780744139, 138.3447051315149, 86.046570865333337, 53.588237099743992, 45.292100524348342, 33.204842604441232, 21.809722446513071, 15.82144112830712, 11.857247340871208, 9.86505065394757, 8.2525633194354864, 6.640492499338464, 5.9151189141762242, 5.2748937601741233, 5.2335464217738297, 5.1695609453883096, 6.0412905020539247, 7.0130966099588328, 8.725128556525835, 10.191515700191694, 13.550533437330545, 19.792293237610103, 29.992243301791408, 39.948149447327012, 52.489884018555003, 83.717667146076963, 133.97255559613592, 139.58612051732649, 131.98987419085091, 219.35401697656653, 337.90351459641266, 177.69050334329216, 186.99209153386957, 172.57213254679186, 101.55324863109904, 60.008949681859939, 46.488420049270182, 36.893225695749557, 24.473525343022239, 16.497840703497666, 12.922358897606497, 10.172171833877869, 8.6441457110666775, 7.4989544637904126, 6.0493593332263602, 5.5251998880295634, 5.3453345499720717, 5.5336836347972458, 6.0652235290917806, 7.4160858759377133, 8.949924507684111, 10.522288214051471, 14.669539930994311, 19.994026988386889, 31.477476121951593, 44.13290601551936, 57.922370995228107, 91.402170635856407, 155.2640157056349, 176.1964602722083, 163.14862666039767, 301.96557555412653, 538.99714678707278, 253.5280561179116, 239.02095964975135, 220.2740221033861, 125.18491111128091, 70.344986096434923, 53.823906577074332, 39.453372029378947, 27.380246565144397, 19.308076160210238, 13.978280110937792, 11.147020821533506, 8.9053168517088821, 7.3091820969038439, 6.4512234217242392, 5.6803994552580681, 5.6727594087192079, 5.8053083536639392, 6.6249917656310666, 8.0575398678134302, 9.4907261777328298, 11.306154107321403, 14.943130070579077, 22.743616534455558, 34.378771692377001, 44.895692115573446, 63.09629102831839, 104.241058873613, 190.72528880002952, 226.27353228768243, 214.45700003213315, 436.97351603390234, 1066.1959535576209, 433.51729458889332, 367.09809735899597, 289.97996145010086, 164.58197575163376, 91.412240599681198, 60.542807604917364, 45.775772578430157, 33.401673308199264, 22.116186781807642, 15.753116847312398, 11.904089289656401, 9.303546039908392, 7.5614980494024362, 6.7371553850929322, 6.0895161225652297, 5.5560364128866677, 6.1094005534487605, 6.8263151892657268, 8.1734814269274096, 9.6636208235526269, 11.948018190961893, 16.241873057458722, 24.010000461569639, 36.080812354502534, 49.833499278727416, 66.042124980023658, 124.39997807543459, 223.67323585325056, 328.21152488387946, 344.77171326148749, 770.74521634546022, 1970.0713813014588, 646.86127060880301, 382.77662480077169, 396.2533040859646, 248.69630423497387, 114.01822876404945, 82.126801795962692, 57.273965595476994, 34.227080285849233, 22.851195586808739, 17.12365920646733, 12.456351018938475, 9.3562580058102167, 7.8126464614985656, 7.1318002457288037, 6.2852637654745882, 6.1711525716900475, 6.2954630311895787, 6.8845647672161387, 8.3783082007702561, 10.211256703797417, 12.931100650610194, 17.405368368923916, 25.168957624787648, 37.094893522892434, 57.533381009260523, 76.563818921604266, 147.68595350614524, 294.26646682781944, 388.91483700385658, 448.82610946730478, 1211.9708052435162, 2803.9496552692158, 1271.7627571663686, 508.39785887877753, 506.96305099601244, 362.80035213144049, 178.52012140604566, 97.806667851841823, 68.228616115874146, 38.775468597625853, 25.025889030797838, 17.872279960942965, 13.74469985140124, 9.6536048586555427, 7.9020046012660456, 7.0148796268173159, 6.7186507131414386, 6.1226840838853631, 6.8864741595299055, 7.3516641952705939, 8.7140342291789032, 10.350953817244736, 13.844325818813926, 18.64726896229136, 27.782222145016434, 43.711482900929937, 72.612365740746867, 93.586816816137656, 196.7755433249871, 381.63724742674339, 447.00563976857711, 645.77314636959011, 1850.6397468329806, 6639.698067031165, 2473.0066947172841, 855.69476790230704, 633.36555854289816, 523.0849929966007, 241.77755195523349, 125.03651194390012, 76.847860046206094, 43.593025933023853, 25.868606557166554, 18.515159362788847, 13.755112829750496, 10.44699227195936, 8.4293753366132176, 7.5671769464103917, 6.5976614570745609, 6.5505226441602797, 7.1279420285643011, 7.5084078178458018, 8.5120674584469089, 10.624588727031863, 14.141216689343507, 18.966790938143404, 26.895860643920869, 46.266475261147157, 78.619304368994577, 121.81702466062518, 269.01748102372505, 551.22920789123827, 541.95698246733446, 1045.9683029029893, 3615.9230624353345, 9500.6528086677681, 2983.6421667816867, 1459.8007004208382, 589.84950644143373, 446.2130896894364, 238.62387053231652, 175.23999552329542, 92.383035108628548, 51.705902841645944, 27.641611280844312, 18.680978544191667, 13.962876672312348, 10.256278085266519, 8.8125700197175014, 7.2531587818267402, 6.8352472963781254, 6.5442165971044517, 6.9311889072641986, 7.6796432895344058, 8.6520747616015186, 10.622538104620222, 14.310501425792921, 19.253723232543386, 27.913649363990046, 50.161041673414196, 89.304597077577839, 151.34732218304231, 290.26438540271909, 526.41420210821127, 562.94504896639603, 1708.1934289355961, 4225.3848573287914, 14982.474506443201, 5583.5460990085194, 3891.3661973657854, 2141.5368023327842, 752.9602476197266, 262.54448595536314, 211.30702516808589, 126.94075502116375, 57.995376649220773, 28.688344099071898, 20.058056528572401, 14.773155762512143, 11.328672883224492, 8.8663632607744169, 8.1416889804020052, 7.1762884709607109, 6.6618841738486552, 7.1234501229356262, 7.8125584926262608, 8.8506828512506655, 10.761421361485221, 13.871180161098282, 19.233600066307527, 28.992297197792769, 57.999252895466505, 108.13603201941609, 201.52671733896852, 262.35520536881353, 596.26851293203185, 1502.8058566448742, 3083.8642011691672, 4755.1985786680179], "imag": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, "imag": [0.0, -0.13871927675086548, -0.55827571496092165, -0.85383263724083092, -0.46701193383615952, 0.047809537946767316, -0.3426920474802197, 0.15831589374137059, 0.20589774809377467, -0.21944378817656213, -0.12654666933988368, -0.19544466487854822, -0.096446269450190733, -0.2265628704083768, 0.10840537931386109, -0.055457499657790024, 0.0, 0.055457499657784036, -0.10840537931384955, 0.22656287040837902, 0.096446269450189581, 0.19544466487854698, 0.1265466693398799, 0.21944378817656165, -0.20589774809377467, -0.15831589374137045, 0.34269204748022014, -0.047809537946767663, 0.46701193383615958, 0.85383263724082981, 0.55827571496092188, 0.13871927675086551, -1.279550584464304, -0.80695903119669909, -0.5066002982483182, -1.4561178571661, -0.13414323846201096, -0.25055297311154978, -0.64027404819684697, -0.19951473048424853, 0.33137912963317689, -0.047498243759329373, -0.24064979253244873, 0.1395435157196932, 0.17789090203786645, -0.044374683774468404, -0.36806933922228663, 0.19528135326361654, 0.32999646269142918, -0.13015393203002068, 0.1959681784626765, 0.28571835588367483, 0.22705801052414751, -0.14508578389537852, 0.23457709892354506, 0.21163882649779878, -0.20150153854805303, 0.060946718066345364, 0.31004041285864392, -0.26258387187077481, 0.13955938857309563, -0.2449447076348287, 0.068510051090992716, -1.1758121586434307, -1.3682011726001491, -1.6899938281650106, -0.75019268688655194, 0.68911282851752931, 0.44086751164178845, -0.23155959034339019, -0.54510315877084203, 0.26585764990704713, 0.2624959582084973, -0.045146091846171167, 0.011517786678353055, -0.057907844320373422, 0.076854124253010955, 0.0035092112107953564, -0.23588030048916386, -0.048277840380711062, -0.21489820671404902, 0.26817287178185911, -0.027468417557455105, 0.29873174456545087, 0.072899207479288589, 0.023829771073631354, 0.0066491170121291982, 0.0048298736467919092, -0.13057930804766787, -0.26946209593128789, 0.39240115086507854, 0.85317721061416651, -0.11752989424299426, 0.99998707389668307, 0.55787436167296656, -1.0314907737559058, -1.5043263157657751, -1.3830149751777026, -0.20446853801739454, -0.28364033101911829, 0.68303147161529054, 0.03902721990981517, -0.18273076418691683, -0.013466871818696777, 0.028891896132398606, -0.068621242214500722, -0.026792869524675422, 0.18842973810535804, 0.068392282535087487, -0.17097210848547728, -0.23288712244734344, -0.31416612358708279, 0.27284169211913839, -0.072438990225411531, 0.1202436118466384, 0.067443262257117789, -0.0040452326400191837, -0.15231382612170316, 0.020438609938141238, 0.10773227995476008, -0.1646961578394999, -0.034526357222664054, 0.34045699686317549, 0.3582562672018631, 0.50203282214727851, -0.90050578840564854, 1.1141651843864948, -1.0547694551235964, 0.15113295529591572, -0.42011997382980693, -1.1306687523196075, 0.59904899563122349, 0.12782476119556421, -0.26469201284371935, -0.0028564673365734715, 0.25878855026626812, 0.00078645201341040851, -0.17181320075266995, 0.013143422355015144, 0.050238396740841747, 0.072156922858987921, 0.041604673982592558, -0.0112715468909201, -0.016101389694688766, -0.31269363662275068, 0.094974334151300396, -0.067869387966968731, 0.14811752790953986, 0.010724993842567176, -0.071495661604357427, -0.037154193600070516, 0.05779163337935353, 0.094937931062917286, -0.1272883333159909, -0.017408469796284951, 0.62003762386212868, 0.074417004563971767, -0.12904495334293709, -1.4636084587609224, -0.036743730082780299, -0.77470195486186, -0.60686918965332004, 0.62872636200456622, -0.46894237369717673, -0.18368617361305525, 0.26816260026693856, 0.13447215443394772, 0.041008154934057489, -0.017107991149299187, -0.0680369475996533, -0.01240601732954733, 0.059356927461924558, 0.12615835751185028, 0.053672308552617974, 0.037749743592242362, -0.10597138547480481, 0.022172258797336697, -0.058681894939636686, 0.12792055300624736, -0.060154323470105943, 0.032298308999269151, -0.015701976416949814, 0.0007367446231764113, 0.07712597645572114, 0.055644084876628218, -0.065981740018919821, -0.14567847379973994, 0.039540586335773356, 0.24917063867041539, -0.6432675339043068, 0.36754664039982821, -0.069649876974948205, 0.2952063874323651, -0.011417685121456805, -1.0450941798657123, -0.17374602795438093, 0.19930768818407893, -0.1556206112582631, 0.055817128538076119, 0.17900936499027481, 0.0052374024484263433, -0.042596098823283683, -0.020834261928533829, 0.036686593450547957, 0.00076880260958178746, 0.061719692477810909, 0.027700064466885506, 0.10661165850403151, -0.13945785164947772, -0.050544258155460708, -0.11937846922953205, 0.034399558837173369, 0.02521789889898339, -0.0047468618190418272, -0.028256857448446509, 0.029239764799856467, 0.046539635523190424, -0.033316423902485758, -0.15842957449053302, 0.14741145606308881, 0.1752194519195491, -0.075629282019522973, -0.91968716746889456, -0.45504702044764878, -0.12177128356890227, -0.10462001130261206, 0.1804016527269576, -0.047005347129142915, -0.19200701617075638, 0.1133507155810588, 0.14315736053243958, -0.067545520465919412, -0.0022066601859379556, 0.0084001340729883862, 0.0049338006978182497, 0.016196236751475263, 0.066419574069183293, -0.012240235365542763, 0.014433128838537781, 0.023674926554515096, -0.017114978073907605, -0.14379898617791109, 0.084303725772385638, 0.0056779923265117766, 0.048321020114327755, 0.022849248448590556, 0.012395399307186424, 0.023865191872962568, -0.0060375152678495622, -0.021897165586045375, -0.092173327221095822, -0.17587869380621102, 0.091992925322100877, 0.014980171338571357, 0.0086063527817299007, 0.098130362913165001, 0.130338354535672, 0.094203305677599436, -0.19730813245926024, -0.10041080102702246, 0.075932042745803577, 0.021134287621881041, -0.059575532325244519, 0.0082992125422013917, 0.015272751179096435, 0.0090248536114060952, -0.019251438395354602, -0.015788972597383853, 0.003250945662643008, 0.032968975479440332, -0.015058032290062954, 0.017643635220692015, -0.068857003169531444, 0.030070570566209365, -0.12793975070954616, -0.043534834876013277, 0.0017423598025251587, 0.028592812647173952, 0.0036967486190428137, 0.0090453167838253218, -0.016259252101333162, -0.0052076817297827191, 0.018046490267575967, -0.026168992315517926, -0.083077034868877908, 0.032798990212655046, -0.027546636940189637, -0.12409557570816734, -0.0088356071822206419, -0.034333260533212014, 0.056177295075322577, 0.057994393113440637, -0.032566171451921935, -0.010465798382464413, 0.020079425427313443, -0.017396471253638312, -0.017870360905994483, 0.010919865739753416, 0.012363627500514531, -0.014313215415815719, 0.034201557920817111, 0.10796975372596095, 0.21064351401911494, -0.046016401957029461, -0.083803307026608195, -0.15128619138644472, -0.070745415327885988, -0.06951503451164355, 0.070638418064815661, -0.0080019035626016123, 0.02654845111893607, 0.019862790828204354, -0.0038698355762961699, -0.020866890117519677, -0.0048084432749845906, -0.0036451640963975299, -0.0026341276434262537, -0.0023099396961399252, 0.043908100663757832, 0.096772033742844044, 0.04918905117971889, 0.070600771528734244, -0.026773628633603139, -0.05973226936448265, 0.013552286601009756, 0.0032289712715403013, -0.023046337829044056, -0.010405151723131599, 0.019427096259341661, 0.018256051683800133, -0.056759870222018213, -0.032960560091393032, -0.017399004273096801, 0.12185282737260948, 0.037984234337547759, -0.12270039394272629, -0.055947445070994896, 0.04621845892784341, -0.1857137618225036, -0.063810892086947277, 0.07053672326645595, 0.03906718120738633, 0.01577517031413787, -0.0047456570119124219, -0.019801411975277249, 0.024637199092487311, 0.019457415538283646, -0.0067710516924983765, -0.028346017012320548, -0.0065098329229195291, -0.0013352981567293612, -0.023151697315085987, -0.06519950655383687, -0.1042256990435297, -0.023224778901070588, 0.0072963544312097499, -0.034708386400909293, -0.0023809918522597964, 0.016167541663812009, -0.0054340236987463174, 0.0027208109883995382, 0.0066841964011560553, -0.023932611476630623, -0.039005803210705049, 0.016396390506166533, 0.058067983872416511, 0.15112210885707694, 0.091953539825334094, -0.30878981646904202, 0.23773808023122034, -0.11496619447060334, -0.15410637679425881, 0.16398523681965352, -0.042160123131605852, -0.0057838899052936009, 0.021159112170606904, -0.00089194024953267548, -0.043632529695206895, 0.025594278576058532, 0.04827977682701759, 0.008656372871138766, -0.025123508323013247, -0.021222695138498154, 0.012727342518660707, 0.0027327273075534982, 0.016727222825244921, -0.062351999721191126, -0.095086485134993501, 0.009789315676701096, 0.020526538310240195, -0.0017729650965628652, 0.0042367342426148282, 0.0096918161659650896, -0.014518052118829046, -0.0045810353743419062, -0.069451504639382974, -0.036289590762181183, 0.22708969966074724, 0.3665342673930222, -0.59625762091850343, 0.36774772058649913, 0.2627894192943519, -0.10703484463450727, -0.13950623949894417, -0.080806137493453625, -0.018761372187400087, -0.14807112835842171, 0.015533054933596769, -0.013156170331620851, 0.033053795814988449, 0.012901798319361097, 0.00377273404398293, -0.0087050725477761486, -0.026200884444946355, -0.069983120002794802, -0.045851102565308888, -0.0080215915074989454, -0.048063119818621811, -0.055909188302307122, 0.015567334119352533, -0.069113723063989038, -0.0072474243428621863, 0.042526562044161449, 0.039806904605142766, -0.027582495505149615, 0.0049261433754253488, -0.04754279011762625, -0.074122351214929355, 0.22223052073714245, -0.0077417273670608014, -0.080825286420915882, 0.62390518555370134, -0.18988737165776209, -0.013310214088767865, -0.13538196037364333, -0.38370084094404533, -0.32853605615928166, -0.23095349816725769, 0.0024573680892555631, -0.060148519255615616, 0.030360401196840837, -0.0084214745912351684, 0.033027304906486414, 0.030739864021722699, 0.0097039926999964547, -0.060698557392036313, -0.04746519227839175, -0.053530300822357386, -0.046174234082698239, 0.0052112044634668644, 0.020596160958060543, -0.15878906772803425, -0.02193329327109424, 0.0079342423803948989, 0.027919450264392773, 0.0070430807013025284, 0.020085011074200358, -0.075935043112063852, -0.041652272773957957, 0.16889959178925665, 0.18647295463827135, 0.014154913289577202, 0.060521107576468509, -0.63637312336837226, 0.90191957381577925, 0.27922666018549325, -0.48673882008850766, -0.33370031357259311, -0.3513559741645329, -0.2622745616761345, -0.17197492325356289, -0.0057315027931728107, -0.04469091820910031, 0.053283308768024513, 0.039465599946438043, -0.014174493080162808, -0.04946368453866596, -0.022857667990750397, -0.16881304090125779, -0.080812526909499666, 0.00058234446045326367, 0.084338425974376116, -0.12518231680881081, -0.040506406338050263, -0.08374410530080309, -0.001350704062862842, 0.030200114248426838, 0.042299889130269351, 0.011310849850443803, 0.081759178445920677, 0.035289563063634108, -0.12268118169149339, 0.058157249768416797, 0.19453030659557169, -0.32019695139960919, 1.2621857571853639, 0.24947885513851267, -0.86827138009746829, -0.26346017480935824, -0.40312000272498982, -0.22820944406317872, 0.0813299683314989, 0.0038871367161771898, -0.10891614598123801, 0.00043800911235750134, -0.043289297526922212, 0.012593343881888895, -0.0042686636670869688, -0.008833188472774969, -0.024141666831206311, -0.03923653338217388, -0.25435751708422283, 0.0, 0.13106581900761921, 0.22441332039311174, -0.094768447018961463, 0.0024812204443016074, 0.036286268392045858, 0.0056698536823630895, -0.010705526315732189, 0.082044918512892334, 0.0010532751265284197, 0.015101105715477795, 0.090653505450224631, 0.27613653682211553, 0.17494988738073455, 0.30956821269851931, 0.034540476362705901, 0.0, -0.034540476362701966, -0.30956821269851847, -0.17494988738073411, -0.27613653682211575, -0.090653505450227129, -0.015101105715478274, -0.0010532751265287738, -0.082044918512892334, 0.010705526315732109, -0.0056698536823632534, -0.036286268392045982, -0.0024812204443015839, 0.094768447018961921, -0.22441332039311199, -0.13106581900761924, -0.00058234446045052997, 0.25435751708422299, 0.039236533382173068, 0.024141666831206714, 0.0088331884727747174, 0.0042686636670865837, -0.012593343881888968, 0.04328929752692242, -0.00043800911235742604, 0.1089161459812379, -0.0038871367161778295, -0.081329968331500163, 0.22820944406317803, 0.40312000272499021, 0.26346017480936107, 0.86827138009747229, -0.24947885513851314, -1.2621857571853632, 0.32019695139960752, -0.19453030659557399, -0.058157249768416672, 0.12268118169149329, -0.035289563063634503, -0.081759178445920649, -0.011310849850443772, -0.042299889130268831, -0.030200114248426623, 0.0013507040628626303, 0.083744105300802674, 0.040506406338050895, 0.12518231680881103, -0.084338425974375644, 0.046174234082696289, 0.08081252690949875, 0.16881304090125832, 0.022857667990750261, 0.04946368453866589, 0.014174493080162815, -0.039465599946438334, -0.053283308768024965, 0.044690918209100129, 0.0057315027931725314, 0.1719749232535624, 0.26227456167613394, 0.3513559741645329, 0.33370031357259339, 0.48673882008850966, -0.27922666018549408, -0.90191957381578058, 0.63637312336837637, -0.060521107576467635, -0.014154913289577215, -0.18647295463827063, -0.16889959178925743, 0.041652272773958374, 0.075935043112064518, -0.020085011074200423, -0.0070430807013025249, -0.02791945026439252, -0.0079342423803949891, 0.021933293271094115, 0.15878906772803389, -0.02059616095805995, -0.0052112044634673969, 0.008021591507499164, 0.05353030082235833, 0.047465192278390397, 0.060698557392036064, -0.0097039926999963107, -0.030739864021722747, -0.033027304906486449, 0.008421474591235165, -0.03036040119684083, 0.060148519255615165, -0.0024573680892551967, 0.23095349816725866, 0.32853605615928261, 0.38370084094404566, 0.13538196037364647, 0.01331021408876858, 0.18988737165776171, -0.62390518555369734, 0.080825286420916714, 0.0077417273670609497, -0.22223052073714233, 0.074122351214929452, 0.047542790117626306, -0.0049261433754249724, 0.027582495505149737, -0.039806904605142586, -0.042526562044161428, 0.0072474243428622999, 0.069113723063988594, -0.015567334119352927, 0.055909188302305984, 0.048063119818621922, -0.0027327273075535455, 0.045851102565308353, 0.069983120002795093, 0.026200884444945973, 0.0087050725477759057, -0.0037727340439829347, -0.012901798319361227, -0.033053795814988754, 0.013156170331620811, -0.015533054933596691, 0.14807112835842184, 0.018761372187400604, 0.080806137493454139, 0.13950623949894433, 0.10703484463450816, -0.26278941929435246, -0.36774772058649907, 0.59625762091850687, -0.36653426739302131, -0.22708969966074771, 0.036289590762181079, 0.069451504639383266, 0.0045810353743422905, 0.014518052118829408, -0.0096918161659651156, -0.0042367342426148941, 0.0017729650965627938, -0.020526538310240098, -0.0097893156767009607, 0.095086485134992974, 0.062351999721190751, -0.01672722282524514, 0.065199506553837216, -0.012727342518659639, 0.021222695138497675, 0.025123508323013449, -0.0086563728711387469, -0.048279776827017555, -0.025594278576058595, 0.04363252969520693, 0.00089194024953267417, -0.021159112170607019, 0.0057838899052937813, 0.042160123131606046, -0.16398523681965352, 0.15410637679425865, 0.11496619447060411, -0.23773808023122042, 0.30878981646904247, -0.091953539825333053, -0.15112210885707561, -0.058067983872415838, -0.016396390506166002, 0.039005803210705077, 0.023932611476630637, -0.006684196401155907, -0.0027208109883995707, 0.0054340236987462662, -0.016167541663812044, 0.0023809918522598732, 0.034708386400909043, -0.0072963544312100569, 0.023224778901069786, 0.10422569904352962, -0.049189051179719279, 0.023151697315084544, 0.0013352981567299367, 0.0065098329229194736, 0.02834601701232067, 0.0067710516924982707, -0.019457415538283694, -0.024637199092487305, 0.019801411975277225, 0.0047456570119127489, -0.015775170314137797, -0.03906718120738624, -0.070536723266456214, 0.063810892086946833, 0.18571376182250354, -0.046218458927843417, 0.055947445070994993, 0.1227003939427266, -0.037984234337547038, -0.12185282737260873, 0.01739900427309727, 0.032960560091392817, 0.056759870222018227, -0.018256051683799891, -0.019427096259341584, 0.010405151723131587, 0.023046337829044038, -0.0032289712715403299, -0.013552286601009622, 0.059732269364482463, 0.026773628633603028, -0.070600771528734632, 0.008835607182220432, -0.096772033742842878, -0.043908100663758234, 0.0023099396961402566, 0.0026341276434262424, 0.0036451640963978101, 0.004808443274984581, 0.020866890117519587, 0.0038698355762962896, -0.019862790828204292, -0.026548451118935872, 0.0080019035626017337, -0.0706384180648158, 0.069515034511643051, 0.070745415327885364, 0.15128619138644453, 0.083803307026608292, 0.046016401957029593, -0.21064351401911435, -0.10796975372596025, -0.034201557920816583, 0.01431321541581594, -0.012363627500514576, -0.010919865739753575, 0.017870360905994497, 0.017396471253638378, -0.02007942542731345, 0.01046579838246435, 0.032566171451921762, -0.05799439311344054, -0.056177295075322847, 0.034333260533212451, -0.130338354535672, 0.12409557570816747, 0.027546636940189641, -0.032798990212655137, 0.083077034868877978, 0.026168992315517999, -0.018046490267575984, 0.005207681729782772, 0.016259252101333162, -0.009045316783825131, -0.0036967486190426836, -0.028592812647173869, -0.0017423598025251908, 0.043534834876013409, 0.12793975070954686, -0.030070570566209584, 0.068857003169531444, -0.017643635220692303, 0.015058032290063167, -0.032968975479440069, -0.0032509456626426633, 0.015788972597383943, 0.019251438395354474, -0.0090248536114061126, -0.015272751179096435, -0.0082992125422014836, 0.059575532325244533, -0.021134287621881149, -0.075932042745803632, 0.10041080102702246, 0.19730813245926007, -0.094203305677599283, 0.12177128356890216, -0.098130362913164085, -0.0086063527817301141, -0.014980171338571052, -0.091992925322100572, 0.17587869380621152, 0.092173327221095724, 0.021897165586045479, 0.0060375152678496429, -0.02386519187296254, -0.012395399307185896, -0.022849248448590303, -0.048321020114327692, -0.0056779923265118269, -0.084303725772385735, 0.1437989861779114, 0.017114978073907855, -0.023674926554513819, -0.014433128838537597, 0.012240235365543381, -0.066419574069182918, -0.016196236751474646, -0.0049338006978182185, -0.0084001340729884851, 0.0022066601859378697, 0.067545520465919467, -0.1431573605324398, -0.11335071558105927, 0.19200701617075636, 0.047005347129143109, -0.18040165272695829, 0.10462001130261284, -0.2952063874323646, 0.45504702044764878, 0.91968716746889512, 0.075629282019523555, -0.17521945191954877, -0.14741145606308895, 0.15842957449053352, 0.033316423902485841, -0.046539635523190549, -0.029239764799856394, 0.028256857448446561, 0.0047468618190423398, -0.025217898898983061, -0.034399558837173737, 0.11937846922953181, 0.050544258155460854, 0.1394578516494776, -0.10661165850403005, -0.027700064466883865, -0.061719692477810832, -0.00076880260958129979, -0.036686593450547596, 0.020834261928534131, 0.042596098823283357, -0.0052374024484263546, -0.17900936499027453, -0.055817128538076279, 0.1556206112582631, -0.19930768818407885, 0.17374602795438115, 1.0450941798657116, 0.011417685121456564, 0.77470195486186011, 0.069649876974948843, -0.36754664039982721, 0.64326753390430735, -0.24917063867041553, -0.039540586335773169, 0.14567847379973992, 0.065981740018920196, -0.055644084876628218, -0.07712597645572139, -0.00073674462317611055, 0.015701976416950342, -0.032298308999268784, 0.060154323470106401, -0.12792055300624763, 0.058681894939637193, -0.022172258797336572, 0.105971385474807, -0.037749743592242278, -0.053672308552617946, -0.12615835751184992, -0.059356927461923663, 0.012406017329547145, 0.068036947599653702, 0.017107991149299284, -0.041008154934057878, -0.13447215443394772, -0.26816260026693878, 0.18368617361305564, 0.46894237369717728, -0.62872636200456533, 0.60686918965331993, -0.15113295529591578, 0.036743730082780514, 1.463608458760923, 0.12904495334293731, -0.074417004563971351, -0.62003762386212891, 0.017408469796284774, 0.1272883333159911, -0.094937931062917147, -0.057791633379354237, 0.037154193600070003, 0.071495661604358593, -0.010724993842566222, -0.14811752790953939, 0.067869387966970118, -0.094974334151300438, 0.31269363662275046, 0.01610138969469304, 0.011271546890921311, -0.0416046739825933, -0.072156922858987255, -0.050238396740841143, -0.013143422355014638, 0.17181320075266959, -0.00078645201341033847, -0.2587885502662679, 0.0028564673365731054, 0.26469201284371935, -0.12782476119556443, -0.59904899563122194, 1.130668752319608, 0.4201199738298067, 1.5043263157657745, 1.0547694551235969, -1.1141651843864939, 0.90050578840564954, -0.50203282214727829, -0.35825626720186354, -0.34045699686317654, 0.034526357222664658, 0.16469615783949973, -0.10773227995476188, -0.020438609938140839, 0.15231382612170388, 0.0040452326400209297, -0.067443262257115694, -0.120243611846639, 0.072438990225412794, -0.27284169211913811, 0.31416612358708496, 0.23288712244734694, 0.17097210848547523, -0.068392282535087695, -0.1884297381053561, 0.026792869524674363, 0.068621242214500999, -0.028891896132398506, 0.01346687181869554, 0.18273076418691644, -0.039027219909814823, -0.68303147161529132, 0.28364033101911773, 0.20446853801739462, 1.3830149751777017, 1.3682011726001495, 1.0314907737559074, -0.55787436167296611, -0.99998707389668362, 0.11752989424299397, -0.85317721061416762, -0.39240115086507799, 0.26946209593128989, 0.13057930804766765, -0.0048298736467919578, -0.0066491170121302217, -0.023829771073630532, -0.072899207479286424, -0.29873174456544577, 0.027468417557455698, -0.26817287178186705, 0.21489820671404794, 0.048277840380711166, 0.23588030048916517, -0.0035092112107956196, -0.076854124253010928, 0.057907844320372041, -0.011517786678353752, 0.045146091846170348, -0.2624959582084973, -0.26585764990704652, 0.54510315877084026, 0.23155959034339049, -0.44086751164178861, -0.68911282851752897, 0.75019268688655205, 1.6899938281650098, 1.2795505844643045, 1.1758121586434311, -0.068510051090992494, 0.24494470763482898, -0.13955938857309558, 0.26258387187077409, -0.31004041285864437, -0.060946718066343622, 0.20150153854805294, -0.21163882649779717, -0.23457709892354675, 0.14508578389537688, -0.22705801052414679, -0.2857183558836735, -0.19596817846267664, 0.13015393203001066, -0.32999646269142935, -0.19528135326362211, 0.36806933922229168, 0.044374683774465004, -0.17789090203786717, -0.13954351571969323, 0.24064979253244634, 0.047498243759330878, -0.33137912963317673, 0.19951473048424839, 0.64027404819684597, 0.25055297311154973, 0.13414323846201037, 1.4561178571660989, 0.50660029824831798, 0.80695903119669876], "height": 32, "width": 32, "top": {"real": [17750.107020847583, 6210.8656159662787, 10017.081922566327, 3457.5995074393513, 265.850218137708, -70.207684810343054, -8.882891147089472, 24.589756503786479, -11.140592103834141, -1.46746599378154, -0.34121813437428317, 1.0812077419156148, 1.7163290532419633, -4.5666146304635689, -2.6846394014203829, -2.2738643666223468, 1.917575640981823, -2.2738643666223641, -2.6846394014204122, -4.5666146304635395, 1.7163290532419744, 1.0812077419156028, -0.34121813437427356, -1.4674659937815784, -11.140592103834141, 24.589756503786372, -8.8828911470896639, -70.20768481034348, 265.8502181377076, 3457.5995074393486, 10017.081922566325, 6210.8656159662851, 23430.31298691556, -4993.9863865787011, -867.92707841112326, 991.9702295167051, 152.49743471969379, -30.096228916888641, 45.849661798659078, -31.467588946689009, 16.960718546454469, 4.334366206560186, -0.42583907131000093, 0.47860527443285728, -1.8738744001784808, 0.5336707597630499, -3.8841941455247579, -0.75407824565303971, 0.55147195392985549, -0.79345242739339283, -5.9026769793174889, -1.384293215600769, -4.1447942145798233, -2.9130522743117342, -0.87120822186396762, -1.7340023689981476, 8.0221119849442548, -9.1034799758133218, 67.038874839272566, 44.112472832699858, 441.79945796279685, 3245.5044122716786, 3861.5097933424754, -5655.7687421695537, -15889.920855591003, -2792.0170209163471, 3795.2577126849956, 553.88440852995757, -85.905664770254234, 195.26564512659746, 24.791859336013662, 19.637521614531401, -6.1680089153590449, -5.0872002952886746, -0.21502707506361318, 1.4832779566036471, 1.4444541156654906, -2.278921340791467, 0.30255454236990775, -2.3473646939882187, -0.02820677859184775, 1.2126049622480428, -0.78557937342030726, -2.9245439997897638, 1.236962081731878, 1.1827041713801927, -1.6114665304853286, -3.5864367039316236, -14.698165954413065, 20.29282209316159, 43.732891706759197, 111.68572777077691, -209.48016621032312, -187.12585183373633, 2586.3148393820152, 1688.0815183011628, 4748.2203910254093, 1775.7319020900284, 965.53459113591498, -592.89741380746352, 99.787886354888371, 95.459765036004825, 59.296635518443523, -7.6987106331430111, -0.0036180413118668542, -0.43290786252066471, -1.598202682681902, 0.11359872229615781, -0.47654646487314006, 0.052920121324431191, -1.1931569571302629, 1.6263047283546588, 1.1208282513608689, -1.916766911729648, -1.3790558562903064, -0.15528235781115707, 0.33989539819890602, -1.1170639390757935, -0.54019671791116586, 2.4039660385463359, 7.3342674422729397, -18.965458306286095, 0.037731231015075362, 5.7888823722245277, -226.40133474887324, -362.07505408372458, 1068.1182163210274, 1839.5542246985658, 1536.2207931138801, 1719.2247320855465, 351.77395499971544, -218.00810259302051, -154.06814929171503, 76.932404651951941, 11.83330919947551, 3.0799843602247936, 2.1514657945922595, -2.1600173905506583, -0.81329272919310069, -0.057640935991259419, 0.81743781787660708, 0.47007834357539929, 0.82578474649026179, -0.485121980563267, -0.44118347877967812, 0.85372587191033056, -0.96505091801449949, -2.5001329354507269, -0.28227610008090631, 1.5082121759974054, 0.73323799037869442, 0.47326064521443867, -2.2071915479661444, 2.1017967421924912, -14.788373732218277, -10.376064867674437, -110.67917899227207, -400.67251265606825, 13.375377575225066, 2228.271084047331, 1272.0006323499422, 485.30359922269918, -150.18264185504094, -215.33992676901764, -8.8694467345951651, 40.216044199991913, 0.62739683840663496, -1.763160286154926, 0.88761506214793773, 2.2829883187502253, -0.37542737915458396, -0.082924323502338942, -0.2690018095258665, 0.066494953017985289, -1.2937095742683771, 0.90148019848405447, 1.049315066873844, -1.5500155662664761, -1.5096304544124948, -0.76725462527686761, -0.45464639460382006, 0.03503878860161394, 0.85393872935961013, 0.89172763012310696, -0.12413241898971583, -7.4057881467564117, -5.5362761946156125, 1.231534306746803, 18.635135255424384, 26.03667534143711, -87.772888824715437, -225.72012452523001, 395.63478219787083, 378.71701677039351, 36.703056312438811, -91.050394397947159, -3.4611377608751717, 16.691588629055683, -0.030826600791664327, -3.1969308796412692, 1.3816292236713215, 0.42488100600164197, 0.084713763632908196, -0.28535803119354425, 0.0058483120842748731, -0.72249565507011926, -0.80262162213105104, -0.11947358836291604, 0.14251583505573939, -0.26639764768858409, -0.59599833623749066, -0.56289480519068613, -0.092201911820288446, 0.77223819072116529, 0.55522491064190738, -0.14411590791637013, -2.1806910872492855, 1.0588352659849944, -1.722617263430356, -9.0167440767821265, -38.483896322518888, -22.599080819691828, 25.541139705127691, 375.57983717352784, 181.47383294778024, 149.67885098073037, -4.1008782517976057, -3.7383475143657869, 18.721866312633942, -1.1602382001305473, -5.8391540939420112, -0.21088907624048864, -0.29870055099180226, 0.95331837446181378, 0.060424395643205529, -0.42858353450158043, -0.37036207729837234, -0.30369644506457261, -0.75652176347658984, -0.44545713631522388, 0.71326845215283508, 0.071761808928956311, -0.63829698193917794, -0.45235505563855871, -0.080159340308425753, -0.15881914095274483, 0.37773826228539636, -0.097086363313521495, -0.86706044290909523, -1.3342582973973045, -0.61792777020441481, 0.16957438507140327, 10.565905071599056, 15.380533375221102, 10.500239194747859, 19.996280010030237, 18.60272375866586, 4.0348314717803326, 11.168149094486143, 14.395513359675057, -3.576502394652771, -3.8760628092228431, 2.0358977627782506, -1.6580642648165547, -0.13166485139511078, 0.2591565726162201, -0.22701969228044258, -0.29312645623416966, 0.099969472199353857, -0.39101661164543228, -0.042546772814251566, 0.29433076927773894, -0.50935384874181677, 0.090487726861141621, -0.092143985882572388, -0.58253529440268437, -0.41671432281001702, 0.14644815319126417, 0.2723500443275419, -0.039709576626662156, -0.41013369223337515, 1.1756350920235048, 1.5259648698081887, -4.4516278662013118, -8.128003687892722, 9.6041080205516938, 20.813833475064627, 12.963050463991683, 7.8870012209429445, 15.407970089260955, 5.3783096889109112, -3.1350030536179672, 1.9101786820520572, 1.6649545288728531, -2.1421648847872561, 0.35230920085802159, 0.37729718445187704, 0.020823929394603979, 0.087139744957248078, -0.10976037032555666, -0.56986899401739111, -0.44020908152219312, 0.69190564661152409, 0.20725962387572397, 0.64042787368671816, 0.71867283099896739, 0.16183428074791173, -0.17223426808716463, -0.17676233483878773, -0.27594664738318686, 0.095238357444986099, 0.020726971935864241, -0.11463597101365795, -0.32333311610982368, 1.2888258236383847, 3.0237538834517612, -0.12189842989060286, -4.5002056479068653, -2.8307120360813536, 9.0325055742836575, -5.0836871456416608, -6.4226783361185662, -2.3832064029645541, 2.1204380507892151, -2.1797923249754283, -2.1316882770768921, 1.4364513793862836, 0.82847417311036753, -0.54705107713687473, -0.053118808001263999, 0.10349330090189141, -0.027586170457780668, -0.27866115184949369, -0.4744187891270259, 0.32835706009268834, 1.8712198771790323, 0.44937016780231559, 0.8488760221500451, 0.35191803530681381, 0.28758243475250972, -0.6426201464805843, -0.40597353100929789, -0.22244529364246871, -0.071869502235051647, 0.33021466122988641, 0.24942995069051274, -0.5214330526633183, -0.093662554700336673, 1.1233733739102922, 1.9003965613191238, 0.07120934753760759, -8.6549236119446178, -1.8427620371931031, -0.52295775466804406, 3.4092952720370122, -0.65003177967723336, -0.1840159964371442, 1.8831870902689825, 0.7983111628921199, -0.39925172982701851, 0.051205177403033819, 0.2598923527237304, -0.18824332097783142, 0.13750859145926242, 0.78226830313090512, -1.2572785001190825, 1.3355363328556911, 1.2220896356262305, 1.6491421999762639, 1.7622421170936717, 0.96487439834416744, 0.79128381470112286, -0.26979590260649117, -0.37236776211072153, -0.65318812250908376, -0.13360581679076858, -0.1817007191765827, 0.4244891020544192, 1.0695325895656689, -0.49200291489349485, -0.59959066580988751, -2.4610304070506381, -1.7528842523917616, 5.4092974592427554, 11.628502736704702, 13.318871722095572, 5.3844201289172418, 0.12839725172390623, -0.91462159985003533, -0.4207633568928546, 0.73289618436063231, 0.98164545606019249, -0.31879685258307294, -0.45467275635234927, 0.23929181220408463, 0.73553732103708702, -0.78050285180289647, -0.20614377250205779, -0.66147354811396541, 0.84722544756444751, 3.1542100241342745, -1.0454812204468338, 0.49112272834774079, 0.89780094097137775, -0.80686344960242362, 0.26166207514350009, 0.34234964401672252, -0.27361449647202374, 0.078400343257288022, 0.27130715748636108, -0.26706243773596255, 0.92879560872659372, -1.3686907450256593, 0.37153092475944227, -0.0077060915391855903, -2.1487270106054996, 8.2423115107991176, 10.211121947580189, 11.004080199445575, 5.512476255300478, 0.43541395104991965, 1.3138259234516578, 0.47697687525002369, -0.37437690637871951, 0.49170325146724819, 0.53092933204425685, 0.78977231856458541, 0.054935970034302541, 1.0907299238052364, -1.4537313504920895, 1.6637415256529431, 2.3271742206176285, 1.6752406948773604, 6.0227778178364675, -2.5693140331095292, -1.3449083811022362, -0.063540759326359386, 1.2007479971921078, 0.26947504329539196, -0.043317616642408706, -0.090092404474960294, -0.56149356452164179, -0.29757479536733583, -0.82531287850485402, 0.52880973840083989, -0.51042849628299192, 1.1866854822445434, 7.7130480762288167, 17.626109919920186, 26.29568713002228, 9.1514979514586194, -1.521929375229722, 0.85364359123771261, -0.365663824522519, -1.1590870007863963, 0.48082630002696519, 0.93059067445638155, 1.1024013035834523, 0.63841829574218301, 1.5659590764611497, 0.20674310541385973, 1.0081259505833966, 1.4865008399227626, -1.6031905208728288, 5.7718835709767413, 0.2720344299284404, 3.2411570780563994, -1.0481514144590243, 2.2338214812745694, 3.1628749936702945, 1.7743358086362808, -0.03099281849361625, -0.41442882712954171, -0.31459130661253104, -1.7323756021672925, 0.19363530105298493, 0.61123212270521721, 4.8260404786904152, 6.7814469674820135, 4.974801806376985, 19.935738411546794, 15.127019575257112, 16.951752765718286, 6.976320734749117, 0.83204582564536733, -0.22090351652873133, -0.48187393778382737, -0.72216259413318939, 0.68337514879437744, 1.4934027691778771, 1.3836806937153638, -0.089108362899698895, 0.57910533764344185, 3.1507795425198797, 1.9139554692796912, 4.1423990225960203, -5.0893580330573318, 4.6545320074577088, -1.3079026033800338, 1.2583901568403451, 1.3087920196200225, 1.8018391908724931, 1.3933980798910508, 0.67604933114803067, -0.49475104816844406, -1.4152366315362725, -0.64580662533466104, -1.4537653735214031, 3.1014323943375786, 7.6843087454063586, 10.909142678924193, 12.359496229531475, 15.280082473470735, 24.669023160454167, 12.739042274822818, 1.7204760023261643, 0.52929508548715176, 2.1482192005482723, -1.481161898887601, -0.79404079710432474, 0.46540881956838565, 0.92624711854277975, 1.0380549761479756, 2.3168267428989626, 1.5788387366050483, -0.83766970523004924, 4.7505720502223729, -2.6570294115495297, 6.7612131323955511, -2.6570294115495336, 4.7505720502223783, -0.83766970523005702, 1.5788387366050476, 2.3168267428989657, 1.0380549761479752, 0.9262471185427773, 0.46540881956838565, -0.79404079710432862, -1.4811618988876001, 2.148219200548279, 0.52929508548715154, 1.7204760023261518, 12.739042274822809, 24.669023160454188, 19.935738411547018, 12.35949622953156, 10.909142678924129, 7.6843087454063417, 3.101432394337563, -1.4537653735213987, -0.64580662533467093, -1.4152366315362839, -0.49475104816844562, 0.67604933114803401, 1.3933980798910552, 1.8018391908724987, 1.3087920196200247, 1.2583901568403484, -1.3079026033800301, 4.6545320074577061, -5.0893580330573203, 4.1423990225960088, 1.913955469279683, 3.1507795425198943, 0.57910533764344618, -0.089108362899694094, 1.3836806937153729, 1.4934027691778826, 0.68337514879437378, -0.72216259413318618, -0.4818739377838111, -0.22090351652873805, 0.83204582564534302, 6.976320734749093, 16.951752765718314, 15.127019575257133, 17.626109919920285, 4.9748018063769956, 6.7814469674819922, 4.8260404786903921, 0.61123212270520444, 0.19363530105297699, -1.7323756021672947, -0.31459130661253587, -0.41442882712954437, -0.030992818493609464, 1.7743358086362877, 3.162874993670298, 2.2338214812745694, -1.0481514144590143, 3.241157078056395, 0.27203442992843363, 5.7718835709767413, -1.6031905208728274, 1.4865008399227673, 1.0081259505833953, 0.20674310541386615, 1.5659590764611582, 0.63841829574219022, 1.1024013035834526, 0.93059067445638244, 0.48082630002696636, -1.1590870007863949, -0.36566382452250978, 0.85364359123770939, -1.5219293752297598, 9.1514979514585963, 26.295687130022237, 8.2423115107992349, 7.7130480762288673, 1.1866854822445243, -0.51042849628302267, 0.52880973840082446, -0.82531287850485058, -0.297574795367338, -0.56149356452165111, -0.090092404474959795, -0.043317616642408116, 0.26947504329539745, 1.2007479971921178, -0.063540759326354057, -1.3449083811022313, -2.5693140331095257, 6.0227778178364719, 1.675240694877361, 2.3271742206176271, 1.6637415256529449, -1.4537313504920832, 1.0907299238052377, 0.054935970034312817, 0.78977231856459063, 0.53092933204426229, 0.49170325146725052, -0.37437690637871607, 0.4769768752500283, 1.3138259234516545, 0.43541395104990577, 5.5124762553004887, 11.004080199445557, 10.211121947580168, 11.628502736704604, -2.1487270106054663, -0.0077060915391693741, 0.37153092475944555, -1.3686907450256616, 0.92879560872659006, -0.26706243773595856, 0.27130715748636525, 0.078400343257288438, -0.27361449647201985, 0.34234964401672396, 0.26166207514350365, -0.80686344960242218, 0.8978009409713853, 0.49112272834772974, -1.045481220446846, 3.1542100241342701, 0.84722544756444151, -0.66147354811395898, -0.20614377250205829, -0.7805028518028938, 0.73553732103708935, 0.23929181220408727, -0.45467275635235105, -0.31879685258307255, 0.98164545606019549, 0.73289618436063131, -0.42076335689285432, -0.91462159985003766, 0.12839725172388108, 5.3844201289172204, 13.318871722095585, -1.8427620371929223, 5.4092974592426515, -1.7528842523917609, -2.4610304070506088, -0.59959066580987819, -0.49200291489348996, 1.0695325895656664, 0.42448910205441354, -0.18170071917658262, -0.13360581679076522, -0.65318812250908243, -0.3723677621107227, -0.26979590260649017, 0.7912838147011273, 0.96487439834416677, 1.7622421170936722, 1.6491421999762705, 1.2220896356262196, 1.3355363328556904, -1.2572785001190749, 0.78226830313090379, 0.13750859145926628, -0.18824332097783478, 0.25989235272372874, 0.051205177403034013, -0.39925172982701423, 0.79831116289212645, 1.8831870902689678, -0.18401599643714045, -0.65003177967722925, 3.4092952720370082, -0.52295775466808114, -5.0836871456417914, -8.654923611944545, 0.071209347537571008, 1.9003965613191072, 1.1233733739103013, -0.093662554700343362, -0.52143305266331286, 0.24942995069051838, 0.33021466122988513, -0.071869502235049398, -0.22244529364246549, -0.40597353100929245, -0.64262014648058341, 0.28758243475251449, 0.35191803530680799, 0.84887602215004632, 0.44937016780231587, 1.8712198771790289, 0.32835706009269156, -0.47441878912702484, -0.27866115184949264, -0.027586170457779294, 0.1034933009018901, -0.053118808001266206, -0.54705107713687218, 0.82847417311037153, 1.4364513793862805, -2.1316882770768819, -2.1797923249754287, 2.1204380507892009, -2.3832064029645679, -6.4226783361184081, 7.8870012209433504, 9.0325055742834763, -2.8307120360814029, -4.5002056479068191, -0.12189842989059124, 3.0237538834517572, 1.2888258236383801, -0.32333311610982529, -0.11463597101365604, 0.020726971935865871, 0.09523835744498739, -0.27594664738318975, -0.17676233483878293, -0.17223426808716019, 0.16183428074791517, 0.71867283099897139, 0.64042787368672205, 0.20725962387572536, 0.69190564661152509, -0.44020908152219435, -0.56986899401739244, -0.10976037032555588, 0.087139744957248716, 0.020823929394600361, 0.37729718445187588, 0.35230920085802736, -2.142164884787245, 1.6649545288728365, 1.9101786820520659, -3.1350030536179658, 5.3783096889108455, 15.40797008926083, 18.60272375866586, 12.963050463991696, 20.813833475064644, 9.604108020551676, -8.1280036878927362, -4.4516278662013278, 1.5259648698081876, 1.1756350920235052, -0.41013369223337515, -0.039709576626662003, 0.27235004432754167, 0.14644815319126442, -0.41671432281001886, -0.58253529440268281, -0.092143985882572915, 0.090487726861142509, -0.50935384874181677, 0.29433076927773738, -0.042546772814252246, -0.39101661164543189, 0.09996947219935487, -0.29312645623417033, -0.22701969228044291, 0.2591565726162216, -0.13166485139511078, -1.6580642648165524, 2.0358977627782484, -3.8760628092228537, -3.5765023946527563, 14.395513359675084, 11.168149094486147, 4.034831471780354, 181.47383294778047, 19.996280010029963, 10.50023919474779, 15.38053337522109, 10.565905071599067, 0.16957438507140921, -0.6179277702044097, -1.3342582973973056, -0.86706044290909146, -0.097086363313522245, 0.37773826228539636, -0.1588191409527461, -0.080159340308420923, -0.45235505563855616, -0.63829698193917661, 0.071761808928958337, 0.71326845215283419, -0.44545713631521988, -0.75652176347658784, -0.30369644506457882, -0.37036207729837373, -0.42858353450157866, 0.060424395643203697, 0.953318374461814, -0.29870055099180354, -0.21088907624048941, -5.8391540939419864, -1.1602382001305538, 18.721866312633882, -3.7383475143657954, -4.100878251797706, 149.67885098073012, 395.63478219787089, 375.57983717352744, 25.541139705127598, -22.599080819691835, -38.483896322518888, -9.0167440767821709, -1.7226172634303247, 1.0588352659849967, -2.1806910872492873, -0.14411590791637696, 0.55522491064190693, 0.77223819072116739, -0.092201911820284366, -0.56289480519067914, -0.59599833623749254, -0.26639764768858487, 0.14251583505573989, -0.11947358836291141, -0.80262162213105359, -0.72249565507012325, 0.0058483120842701027, -0.28535803119354936, 0.084713763632907418, 0.42488100600164375, 1.3816292236713219, -3.1969308796412634, -0.030826600791668796, 16.691588629055648, -3.4611377608751566, -91.050394397947187, 36.703056312438633, 378.71701677039351, 1272.0006323499422, -225.72012452523026, -87.772888824715139, 26.036675341437149, 18.635135255424501, 1.2315343067468421, -5.536276194615616, -7.4057881467564011, -0.12413241898971436, 0.89172763012310496, 0.8539387293596038, 0.035038788601613982, -0.4546463946038164, -0.76725462527685828, -1.509630454412483, -1.550015566266479, 1.0493150668738473, 0.90148019848405436, -1.2937095742683813, 0.066494953017976297, -0.26900180952586789, -0.082924323502345257, -0.37542737915458746, 2.2829883187502267, 0.88761506214793962, -1.7631602861549227, 0.62739683840662275, 40.216044199991877, -8.8694467345952006, -215.33992676901772, -150.18264185504114, 485.3035992226977, 1536.2207931138814, 2228.2710840473319, 13.3753775752247, -400.67251265606865, -110.679178992272, -10.376064867674508, -14.788373732218197, 2.1017967421924983, -2.207191547966143, 0.47326064521441386, 0.73323799037869852, 1.5082121759973919, -0.28227610008090809, -2.5001329354507282, -0.96505091801449672, 0.8537258719103169, -0.44118347877968372, -0.48512198056327205, 0.82578474649025857, 0.47007834357539341, 0.81743781787659597, -0.057640935991271409, -0.81329272919311113, -2.1600173905506721, 2.1514657945922622, 3.0799843602248034, 11.833309199475522, 76.932404651952027, -154.06814929171483, -218.00810259302057, 351.77395499971459, 1719.2247320855445, 4748.2203910254084, 1839.554224698564, 1068.1182163210278, -362.07505408372486, -226.40133474887313, 5.7888823722244789, 0.037731231015098787, -18.965458306285971, 7.3342674422729388, 2.4039660385463657, -0.54019671791118873, -1.1170639390757879, 0.33989539819890108, -0.15528235781113153, -1.3790558562903272, -1.9167669117296613, 1.1208282513608707, 1.6263047283546224, -1.193156957130264, 0.052920121324427458, -0.4765464648731435, 0.11359872229612604, -1.5982026826818876, -0.43290786252068791, -0.0036180413118654109, -7.6987106331430244, 59.296635518443559, 95.459765036004427, 99.787886354888386, -592.89741380746432, 965.53459113591339, 1775.7319020900306, -15889.920855591006, 1688.0815183011607, 2586.3148393820165, -187.12585183373636, -209.48016621032366, 111.68572777077674, 43.732891706759332, 20.292822093161472, -14.698165954413049, -3.5864367039316574, -1.611466530485326, 1.1827041713801545, 1.2369620817318689, -2.9245439997897797, -0.78557937342029793, 1.2126049622479607, -0.028206778591846705, -2.3473646939882631, 0.30255454236988177, -2.278921340791416, 1.4444541156654738, 1.483277956603626, -0.21502707506361871, -5.0872002952886604, -6.168008915359052, 19.637521614531632, 24.791859336013527, 195.26564512659732, -85.905664770254006, 553.88440852995757, 3795.2577126849942, -2792.0170209163462, 23430.312986915553, -5655.7687421695537, 3861.5097933424781, 3245.5044122716772, 441.79945796279628, 44.112472832700512, 67.038874839272665, -9.1034799758128742, 8.0221119849442406, -1.7340023689979776, -0.87120822186400182, -2.9130522743116929, -4.1447942145798446, -1.3842932156007377, -5.9026769793175413, -0.7934524273933764, 0.55147195392985315, -0.75407824565312243, -3.8841941455247726, 0.53367075976302614, -1.8738744001784735, 0.47860527443281381, -0.42583907130996707, 4.3343662065600954, 16.960718546454476, -31.467588946689279, 45.849661798659248, -30.096228916889014, 152.4974347196931, 991.97022951670215, -867.92707841112428, -4993.9863865787029], "imag": [0.0, -2277.9356791272003, -4760.5440393641002, -3362.7502157108247, -452.6326365977277, 12.902525613472081, -66.324591493039264, 21.395810280639775, 12.049924797684376, -6.4322319301924828, -2.6401787430633603, -2.8941924141450355, -1.0996569736184965, -2.1837600734887777, 0.87308165169681873, -0.4143473704962265, 0.0, 0.41434737049617953, -0.87308165169672458, 2.1837600734887985, 1.0996569736184816, 2.8941924141450213, 2.6401787430632839, 6.4322319301924944, -12.049924797684376, -21.395810280639751, 66.32459149303935, -12.902525613472182, 452.63263659772764, 3362.7502157108197, 4760.5440393641011, 2277.9356791272016, -19170.834011440937, -3837.2504381898657, -1562.2865240696121, -2188.2624437144, -79.985389317630222, -65.73387671644744, -129.03232713044309, -21.574731283989859, 19.219741943874205, -1.3770831994436832, -4.6285618656089973, 1.9356332468609161, 1.914358953204174, -0.39274625271235863, -2.8755632420164114, 1.3910769799127469, 2.1983982122300691, -0.93402216187723952, 1.5955119590990243, 2.5332827335358816, 2.5722659267438073, -2.1433748844126024, 4.7051607105169868, 6.0715674792926295, -11.686157623491814, 7.736622407403881, 65.513717323045199, -68.939947660481394, 105.08267177765576, -524.55810593663, 266.59769699529215, -6565.2013915603111, -12998.804313286138, -7140.8743305075541, -1281.4742181751476, 387.93265499317204, 232.0789193763446, -67.213502175129548, -82.499903393484686, 23.742310304940581, 13.167070698799225, -1.2601921779485123, 0.22176027695648487, -0.82869028871129857, 0.81638586337482588, 0.030361957750051641, -1.8114765667849664, -0.33462283171345614, -1.4063404110660631, 1.8330278968089115, -0.19923279402973898, 2.6325944160953934, 0.74767454410312451, 0.33273215463055067, 0.1242120122414053, 0.13350548988021607, -6.7517210150420688, -24.893726268864828, 68.764375920932309, 203.58844824671789, -52.443377241039173, 589.84188198577237, 814.38538391702434, -3077.5993672243876, -9988.2725309741327, -5000.8757444384873, -213.86760970710961, -153.72085790515706, 376.50689706328353, 10.499004391497454, -22.259718007212538, -1.0587560944123571, 1.3367261976572533, -1.845627367813951, -0.50817475490747221, 2.6646257572641145, 0.72663987403826902, -1.4553261209412862, -1.7486114908592469, -2.2393579162674944, 1.7872556824974239, -0.4779279337995983, 0.90990468751900189, 0.56850457149088529, -0.042260514128558184, -2.0950938638350283, 0.37842412015856491, 2.7868839636562086, -7.1796038797667068, -2.6532766677526052, 42.569555354666804, 86.618323256686423, 262.60583525697274, -570.34935164465662, 953.3853188584327, -2608.4519239039555, 423.76919790180068, -777.49072200787271, -730.15551768721184, 267.77827954485849, 48.782690015655945, -52.084914641107339, -0.26732768536918228, 18.791248861451912, 0.034376983736590996, -4.7733525107569852, 0.2450889317389604, 0.69551673309505335, 0.74689297610787508, 0.36254455317814038, -0.082864627703290866, -0.11088180406499534, -1.9145243520823481, 0.63809937787576865, -0.47609558693404908, 1.1704253870693357, 0.1035348526676573, -0.98268640942924379, -0.66403014974353547, 1.4462870038602533, 3.6812627646537175, -8.6847068298461885, -1.7026644231740631, 110.68919188818327, 26.998515460375977, -65.421023262373453, -744.09540667092062, -46.729307478653496, -1526.2181503116453, -735.50774046161519, 282.18880697804167, -182.37864683063907, -54.052681314235201, 39.603849315110104, 10.295701682078779, 2.359337802307917, -0.63461911007383953, -1.7124190510555728, -0.21593130161202514, 0.76755040332111413, 1.2882353738829533, 0.44968314290067118, 0.25989055470659483, -0.66713893962057369, 0.13682839189736165, -0.36883118795348507, 0.91230383136371929, -0.46996446240256329, 0.30219131214854422, -0.19558932994062075, 0.012615763849470061, 1.762420772813289, 1.9045345605049635, -3.7790359077733253, -11.964107143689581, 4.5083476182968525, 61.96781696120042, -254.89688572081204, 140.68826246910922, -45.053807917761794, 314.74785574475101, -8.8001261891015723, -360.31891091191073, -57.025448777424479, 44.579795546563595, -19.359200628613657, 3.6862817789376683, 8.9206630611283089, 0.18896973496668307, -1.0227323524081069, -0.33838743748909134, 0.43833208591156991, 0.0074294169071561673, 0.50446476014305897, 0.1890893708139402, 0.65133332546862077, -0.77483290182744535, -0.30779007494077709, -0.80427129683389309, 0.26011219704759059, 0.23461588343644721, -0.056507066939534729, -0.44513357712322738, 0.64667209976975049, 1.5545017016282721, -1.5250850436867627, -9.5917712473092696, 13.475211488788412, 28.837963587037802, -21.930976284520067, -337.61540934331555, -197.27075321520147, -65.634374404237917, -45.716174186409042, 38.688397244662028, -10.636065931319841, -36.620593610799475, 11.815798616251305, 9.0326984830007095, -3.0325028906240825, -0.075862266735019127, 0.19104942819406223, 0.073726425569811863, 0.18311714867084192, 0.63036999033226249, -0.098626184449280729, 0.095619359707605045, 0.13744024889930673, -0.097089152898782338, -0.81683568275166918, 0.54386217024143169, 0.041501479859297266, 0.43031399471588661, 0.25470104821283102, 0.17326636360277617, 0.46079094226119127, -0.16530865667454481, -0.86391702025516282, -4.9611285532463629, -12.372184270457062, 11.516126179313906, 3.2997425925449804, 2.0570987009733872, 24.878800155519915, 44.041788084316849, 28.446155418037641, -32.190550839656126, -17.692027714058376, 11.789513877445387, 1.9317197634824401, -3.4507560855810171, 0.36626836712779354, 0.48074766055651602, 0.18044316667269442, -0.28240974426973131, -0.16613612027343372, 0.029095718259237995, 0.24450075339721422, -0.091330331747513635, 0.097634295479075664, -0.36806371804963284, 0.16614591312540511, -0.77395352504544712, -0.3264657443238585, 0.015061212014132833, 0.29085100346092985, 0.047770712409502418, 0.14922819541222396, -0.39792121836056477, -0.1921281774085053, 0.83895281997413806, -1.5703737430868945, -8.4367427775736452, 5.6601916863792336, -5.1510032561702124, -22.050605310259861, -1.9854594697574779, -7.5311386138630718, 7.4148341093741337, 8.0952123464619365, -4.3629732153959058, -0.87617222540110651, 1.0539667118389069, -0.69495683349647086, -0.53597221218340763, 0.21612918483653182, 0.16753374785242167, -0.14587335963051168, 0.2984129896925935, 0.75720231383362635, 1.2725586605629424, -0.23788459440434945, -0.43858849762191893, -0.79801858694486538, -0.41846754429723099, -0.46161406526582383, 0.58294801786464678, -0.078939183973068427, 0.31479155143425391, 0.31425797573231379, -0.084400039832661436, -0.69288180199641103, -0.21778449617622889, -0.19533791786522492, -0.22665765093841067, -0.31956792613405932, 6.3352095159571435, 13.304182061875538, 9.0685889178215753, 13.820343051841526, -2.9904131431626517, -6.4644843028741459, 1.4950174056035006, 0.22841081726546483, -1.0443697855595202, -0.36648156701751267, 0.48825453192442753, 0.32511669967392476, -0.74952192547288132, -0.32406742573949188, -0.14589390394899102, 0.81615985313544603, 0.21110858701983537, -0.62135646441400272, -0.27503339195756299, 0.23916839371037824, -1.0440547633891395, -0.40792084439497517, 0.55610134656922072, 0.37457806876122546, 0.17778944632276653, -0.069642667350154328, -0.39526560004564598, 0.69822150614317735, 0.740778974977921, -0.31290252683747921, -2.0096273906801638, -0.75165898775917361, -0.15987777595408992, -2.5516179078608778, -8.9643314564796608, -15.134863386021781, -2.1073345817546003, 0.61887776540407591, -3.0206322635570779, -0.13950893398737912, 0.63280527166495781, -0.16318694006603662, 0.06410706438489891, 0.11411070867346804, -0.2886162817684455, -0.35613651800395313, 0.12924440993745664, 0.38077834891929796, 0.82374133978448782, 0.42592408743381815, -1.4993887570975311, 1.2113263922466315, -0.61651842130949264, -0.92820589700907985, 1.2123284995709924, -0.37394823077908607, -0.062695571319925397, 0.28532586796592635, -0.016166881608109255, -1.1132083022635739, 0.86546596809253507, 2.0760623026361933, 0.51322827606545562, -2.2491343600113889, -2.0374388890600263, 1.1231676638159473, 0.31214242438772172, 2.2815521755579042, -5.3082712246609329, -6.7280927719717081, 0.71404381047788856, 1.0348891792697787, -0.062580928735681385, 0.11553928672311624, 0.19710411955257187, -0.22253376417909151, -0.05143415191355815, -0.61738709055352659, -0.26515618204121805, 1.3879170617746586, 1.9147895569711311, -2.7981144693643607, 1.6351053618238791, 1.2876141106871726, -0.53839815046157202, -0.81616813855627257, -0.55773229035800009, -0.16310476776122179, -1.4828287822897712, 0.19857441865721279, -0.22253902629935005, 0.76149089771667944, 0.38423492006819204, 0.13633825788919049, -0.40617531895308634, -1.9006670978622686, -5.6055295794952666, -3.5201069577585091, -0.70565394755327504, -4.8233879396582013, -3.7118525914264513, 0.87639764763224848, -3.9705679716456896, -0.3066516936670704, 1.2925955094882555, 0.98057929368147423, -0.5185509231518588, 0.068504647941653091, -0.50802141302695303, -0.65025043431383311, 1.6393007306999561, -0.046634622615140439, -0.42095485749155304, 2.8628962346767608, -0.87664183209871016, -0.061380249620325719, -0.67583720185830587, -2.165804182360429, -2.2334105499018988, -1.7315960703588726, 0.023607096501577673, -0.72578349898044647, 0.49340703388266716, -0.17688316963519096, 0.91231104952944475, 1.0401382704665323, 0.40638239361664558, -3.5528586670065754, -3.2389924588328527, -3.336337544628424, -3.3053285670589143, 0.42529364953930032, 1.2623512061316915, -7.9337267372836493, -1.0910503490681764, 0.30591237262721482, 0.79049013658839029, 0.15779582936744363, 0.35530534658354934, -1.0136463777621887, -0.43596379336607172, 1.3766560550226186, 1.2643786263280588, 0.081112249920068616, 0.30101965208538256, -2.9649644331404845, 3.940601481283172, 1.2809925361642973, -2.3740821954043603, -1.8568139214134618, -2.2875531209700912, -2.0068530505793203, -1.6161905886738603, -0.069970559948539499, -0.68452644609555957, 1.1180256373411306, 1.0386505011587546, -0.45802414484767806, -1.8827293053017495, -1.1452872829873149, -9.8282380345909921, -4.8375314158562777, 0.035534088492687292, 5.8735645683280717, -7.2148282372822923, -1.9024855757814658, -3.6729219824305321, -0.04721742712852893, 0.80045523566507781, 0.91856151213872683, 0.18365173124028911, 1.0527130168554166, 0.35231243394437906, -0.96832866520995176, 0.38866324603453256, 1.1024459216780036, -1.6264163010988006, 5.9086248051519128, 1.1522588148293589, -4.0123769411888297, -1.3409560614230069, -2.2450482885496141, -1.484164394238348, 0.58569229342098317, 0.035646451001070931, -1.3588202093923047, 0.006860270440306241, -0.84539036438792836, 0.31580363771161246, -0.13161779536446233, -0.34549511895795371, -1.1291296924180168, -2.1947930228924113, -14.643424663744323, 0.0, 7.8456512467946364, 11.843681310787776, -4.1545820919682566, 0.098834485797376734, 1.2191537903053737, 0.14782839419733967, -0.21707569483499198, 1.3287726303022269, 0.012891904979339022, 0.146292284007916, 0.70147269041246085, 1.7613861146868823, 0.97884915683286033, 1.5860078469473597, 0.15814907094033309, 0.0, -0.158149070940315, -1.5860078469473551, -0.978849156832858, -1.7613861146868832, -0.70147269041248062, -0.14629228400792066, -0.012891904979343359, -1.3287726303022269, 0.21707569483499028, -0.14782839419734384, -1.2191537903053777, -0.098834485797375804, 4.1545820919682752, -11.843681310787789, -7.8456512467946329, -0.035534088492520481, 14.643424663744339, 2.194793022892366, 1.1291296924180338, 0.34549511895794383, 0.13161779536445045, -0.31580363771161418, 0.84539036438793247, -0.0068602704403050632, 1.3588202093923036, -0.035646451001076773, -0.58569229342099216, 1.484164394238344, 2.2450482885496172, 1.3409560614230207, 4.0123769411888466, -1.1522588148293609, -5.9086248051519057, 1.6264163010987922, -1.102445921678016, -0.38866324603453178, 0.96832866520995076, -0.35231243394438311, -1.0527130168554157, -0.18365173124028866, -0.91856151213871651, -0.80045523566507271, 0.047217427128521561, 3.6729219824305099, 1.9024855757814958, 7.21482823728231, -5.8735645683280371, 3.3053285670587775, 4.8375314158562217, 9.828238034591017, 1.1452872829873084, 1.8827293053017478, 0.45802414484767828, -1.0386505011587623, -1.1180256373411397, 0.68452644609555668, 0.069970559948536071, 1.6161905886738546, 2.0068530505793158, 2.2875531209700912, 1.856813921413464, 2.3740821954043709, -1.2809925361643011, -3.9406014812831787, 2.9649644331405014, -0.30101965208537818, -0.081112249920068671, -1.2643786263280541, -1.3766560550226248, 0.43596379336607571, 1.0136463777621971, -0.35530534658355051, -0.15779582936744335, -0.79049013658838307, -0.30591237262721799, 1.0910503490681696, 7.9337267372836298, -1.2623512061316555, -0.42529364953934357, 0.70565394755329391, 3.336337544628484, 3.2389924588327594, 3.5528586670065589, -0.40638239361663953, -1.0401382704665338, -0.91231104952944642, 0.17688316963519082, -0.49340703388266682, 0.72578349898044092, -0.023607096501574151, 1.7315960703588795, 2.2334105499019046, 2.1658041823604322, 0.67583720185832141, 0.061380249620329064, 0.87664183209870872, -2.8628962346767408, 0.4209548574915572, 0.046634622615141327, -1.6393007306999556, 0.65025043431383445, 0.50802141302695369, -0.068504647941647845, 0.51855092315186113, -0.98057929368147057, -1.2925955094882546, 0.30665169366707518, 3.9705679716456634, -0.8763976476322699, 3.7118525914263776, 4.8233879396582111, -0.31214242438772705, 3.5201069577584692, 5.6055295794952924, 1.9006670978622411, 0.40617531895307485, -0.13633825788919066, -0.38423492006819598, -0.76149089771668665, 0.22253902629934941, -0.1985744186572119, 1.4828287822897714, 0.16310476776122626, 0.55773229035800354, 0.8161681385562749, 0.5383981504615758, -1.2876141106871739, -1.6351053618238793, 2.7981144693643794, -1.9147895569711246, -1.3879170617746619, 0.26515618204121727, 0.61738709055352903, 0.051434151913562459, 0.22253376417909698, -0.19710411955257243, -0.11553928672311804, 0.062580928735678887, -1.0348891792697743, -0.71404381047787879, 6.7280927719716743, 5.3082712246609018, -2.2815521755579335, 8.9643314564797052, -1.1231676638158536, 2.0374388890599802, 2.2491343600114058, -0.51322827606545429, -2.0760623026361911, -0.86546596809253695, 1.1132083022635748, 0.016166881608109234, -0.28532586796592802, 0.062695571319927382, 0.37394823077908801, -1.2123284995709924, 0.92820589700907918, 0.61651842130949663, -1.2113263922466326, 1.4993887570975342, -0.42592408743381316, -0.82374133978448039, -0.38077834891929335, -0.12924440993745251, 0.35613651800395341, 0.28861628176844567, -0.11411070867346547, -0.064107064384899673, 0.16318694006603501, -0.63280527166495915, 0.13950893398738348, 3.0206322635570557, -0.61887776540410167, 2.1073345817545266, 15.134863386021769, -9.0685889178216552, 2.5516179078607184, 0.15987777595415892, 0.75165898775916729, 2.0096273906801727, 0.31290252683747422, -0.74077897497792289, -0.69822150614317713, 0.39526560004564548, 0.069642667350159129, -0.1777894463227658, -0.37457806876122451, -0.55610134656922283, 0.40792084439497267, 1.0440547633891391, -0.23916839371037832, 0.2750333919575636, 0.62135646441400449, -0.21110858701983135, -0.81615985313544015, 0.14589390394899499, 0.32406742573949032, 0.74952192547288177, -0.32511669967392071, -0.48825453192442569, 0.36648156701751228, 1.0443697855595189, -0.22841081726546683, -1.4950174056034862, 6.4644843028741308, 2.9904131431626397, -13.820343051841599, 1.9854594697574315, -13.304182061875386, -6.3352095159572039, 0.3195679261341049, 0.22665765093840967, 0.19533791786523994, 0.21778449617622839, 0.69288180199640803, 0.084400039832664031, -0.31425797573231284, -0.31479155143425158, 0.078939183973069621, -0.58294801786464789, 0.46161406526582016, 0.41846754429722727, 0.79801858694486438, 0.43858849762191948, 0.23788459440435036, -1.2725586605629382, -0.75720231383362191, -0.29841298969258917, 0.14587335963051393, -0.16753374785242225, -0.21612918483653495, 0.53597221218340851, 0.69495683349647419, -1.0539667118389073, 0.87617222540110107, 4.3629732153958827, -8.0952123464619206, -7.414834109374171, 7.5311386138631651, -44.041788084316849, 22.050605310259897, 5.1510032561702142, -5.6601916863792514, 8.4367427775736488, 1.5703737430868991, -0.83895281997413862, 0.19212817740850727, 0.39792121836056477, -0.14922819541222082, -0.047770712409500753, -0.2908510034609289, -0.015061212014133111, 0.32646574432385927, 0.77395352504545112, -0.16614591312540627, 0.36806371804963284, -0.097634295479077288, 0.091330331747514912, -0.24450075339721231, -0.029095718259234932, 0.16613612027343472, 0.28240974426972948, -0.18044316667269469, -0.48074766055651602, -0.36626836712779753, 3.4507560855810189, -1.9317197634824488, -11.789513877445398, 17.692027714058376, 32.190550839656112, -28.446155418037584, 65.634374404237818, -24.878800155519698, -2.0570987009734387, -3.2997425925449106, -11.516126179313863, 12.372184270457085, 4.9611285532463585, 0.86391702025516592, 0.16530865667454706, -0.46079094226119116, -0.1732663636027687, -0.25470104821282824, -0.43031399471588622, -0.041501479859297648, -0.54386217024143224, 0.81683568275167029, 0.097089152898783726, -0.13744024889929929, -0.095619359707603865, 0.098626184449285684, -0.63036999033225893, -0.18311714867083492, -0.07372642556981146, -0.19104942819406445, 0.075862266735016198, 3.0325028906240856, -9.0326984830007238, -11.815798616251362, 36.620593610799446, 10.636065931319884, -38.68839724466217, 45.716174186409333, -314.74785574475044, 197.27075321520152, 337.61540934331566, 21.930976284520245, -28.837963587037731, -13.475211488788421, 9.5917712473092944, 1.5250850436867665, -1.5545017016282761, -0.64667209976974838, 0.44513357712322837, 0.056507066939540815, -0.23461588343644407, -0.26011219704759359, 0.8042712968338912, 0.30779007494077798, 0.77483290182744469, -0.65133332546861145, -0.18908937081392915, -0.50446476014305819, -0.0074294169071514489, -0.43833208591156614, 0.3383874374890965, 1.0227323524080993, -0.18896973496668346, -8.9206630611282982, -3.6862817789376785, 19.35920062861366, -44.579795546563581, 57.025448777424586, 360.31891091191056, 8.8001261891013822, 1526.2181503116453, 45.053807917762221, -140.68826246910882, 254.89688572081207, -61.967816961200398, -4.5083476182968329, 11.964107143689583, 3.7790359077733431, -1.9045345605049631, -1.7624207728132955, -0.01261576384946491, 0.19558932994062728, -0.30219131214854072, 0.4699644624025669, -0.91230383136372128, 0.36883118795348824, -0.13682839189736087, 0.66713893962058779, -0.25989055470659439, -0.44968314290067052, -1.2882353738829488, -0.76755040332110314, 0.21593130161202181, 1.7124190510555817, 0.6346191100738432, -2.3593378023079388, -10.295701682078779, -39.603849315110132, 54.052681314235315, 182.3786468306393, -282.18880697804133, 735.50774046161428, -423.76919790180091, 46.72930747865378, 744.09540667092074, 65.421023262373566, -26.998515460375824, -110.68919188818332, 1.7026644231740455, 8.6847068298461902, -3.6812627646537122, -1.4462870038602713, 0.66403014974352648, 0.98268640942926089, -0.10353485266764806, -1.1704253870693322, 0.47609558693405896, -0.63809937787576798, 1.9145243520823476, 0.11088180406502474, 0.082864627703299776, -0.36254455317814699, -0.74689297610786809, -0.69551673309504447, -0.24508893173895085, 4.773352510756971, -0.034376983736587929, -18.791248861451901, 0.26732768536914786, 52.084914641107339, -48.782690015656009, -267.77827954485792, 730.15551768721207, 777.49072200787191, 9988.2725309741272, 2608.4519239039569, -953.38531885843202, 570.34935164465708, -262.60583525697274, -86.61832325668658, -42.569555354666946, 2.6532766677526505, 7.1796038797667014, -2.7868839636562561, -0.37842412015855753, 2.0950938638350354, 0.042260514128576405, -0.56850457149086808, -0.90990468751900622, 0.4779279337996068, -1.7872556824974217, 2.239357916267509, 1.748611490859272, 1.4553261209412682, -0.72663987403827102, -2.6646257572640879, 0.50817475490745234, 1.8456273678139588, -1.3367261976572486, 1.0587560944122603, 22.259718007212488, -10.499004391497355, -376.50689706328382, 153.72085790515695, 213.86760970710961, 5000.8757444384837, 12998.804313286144, 3077.5993672243935, -814.38538391702389, -589.84188198577237, 52.443377241039045, -203.58844824671809, -68.764375920932238, 24.893726268864992, 6.7517210150420599, -0.13350548988021724, -0.12421201224142447, -0.33273215463053935, -0.74767454410310241, -2.6325944160953538, 0.19923279402974362, -1.8330278968089646, 1.4063404110660558, 0.33462283171345686, 1.8114765667849764, -0.030361957750053889, -0.81638586337482577, 0.82869028871127859, -0.22176027695649836, 1.260192177948489, -13.167070698799225, -23.742310304940538, 82.499903393484416, 67.213502175129648, -232.07891937634469, -387.93265499317204, 1281.4742181751474, 7140.8743305075477, 19170.83401144094, 6565.2013915603166, -266.59769699529113, 524.55810593663034, -105.08267177765569, 68.939947660481323, -65.513717323045299, -7.7366224074036598, 11.686157623491809, -6.0715674792925807, -4.7051607105170206, 2.1433748844125784, -2.5722659267438033, -2.5332827335358727, -1.5955119590990279, 0.93402216187716958, -2.1983982122300714, -1.3910769799127845, 2.875563242016451, 0.39274625271232855, -1.9143589532041787, -1.9356332468609148, 4.6285618656089529, 1.3770831994437265, -19.219741943874194, 21.574731283989856, 129.03232713044289, 65.73387671644744, 79.985389317629867, 2188.2624437143977, 1562.286524069611, 3837.2504381898625]}};

/**
 * Numeric Javascript
 * Copyright (C) 2011 by Sébastien Loisel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

"use strict";

var numeric = (typeof exports === "undefined")?(function numeric() {}):(exports);
if(typeof global !== "undefined") { global.numeric = numeric; }

numeric.version = "1.2.6";

// 1. Utility functions
numeric.bench = function bench (f,interval) {
    var t1,t2,n,i;
    if(typeof interval === "undefined") { interval = 15; }
    n = 0.5;
    t1 = new Date();
    while(1) {
        n*=2;
        for(i=n;i>3;i-=4) { f(); f(); f(); f(); }
        while(i>0) { f(); i--; }
        t2 = new Date();
        if(t2-t1 > interval) break;
    }
    for(i=n;i>3;i-=4) { f(); f(); f(); f(); }
    while(i>0) { f(); i--; }
    t2 = new Date();
    return 1000*(3*n-1)/(t2-t1);
}

numeric._myIndexOf = (function _myIndexOf(w) {
    var n = this.length,k;
    for(k=0;k<n;++k) if(this[k]===w) return k;
    return -1;
});
numeric.myIndexOf = (Array.prototype.indexOf)?Array.prototype.indexOf:numeric._myIndexOf;

numeric.Function = Function;
numeric.precision = 4;
numeric.largeArray = 50;

numeric.prettyPrint = function prettyPrint(x) {
    function fmtnum(x) {
        if(x === 0) { return '0'; }
        if(isNaN(x)) { return 'NaN'; }
        if(x<0) { return '-'+fmtnum(-x); }
        if(isFinite(x)) {
            var scale = Math.floor(Math.log(x) / Math.log(10));
            var normalized = x / Math.pow(10,scale);
            var basic = normalized.toPrecision(numeric.precision);
            if(parseFloat(basic) === 10) { scale++; normalized = 1; basic = normalized.toPrecision(numeric.precision); }
            return parseFloat(basic).toString()+'e'+scale.toString();
        }
        return 'Infinity';
    }
    var ret = [];
    function foo(x) {
        var k;
        if(typeof x === "undefined") { ret.push(Array(numeric.precision+8).join(' ')); return false; }
        if(typeof x === "string") { ret.push('"'+x+'"'); return false; }
        if(typeof x === "boolean") { ret.push(x.toString()); return false; }
        if(typeof x === "number") {
            var a = fmtnum(x);
            var b = x.toPrecision(numeric.precision);
            var c = parseFloat(x.toString()).toString();
            var d = [a,b,c,parseFloat(b).toString(),parseFloat(c).toString()];
            for(k=1;k<d.length;k++) { if(d[k].length < a.length) a = d[k]; }
            ret.push(Array(numeric.precision+8-a.length).join(' ')+a);
            return false;
        }
        if(x === null) { ret.push("null"); return false; }
        if(typeof x === "function") { 
            ret.push(x.toString());
            var flag = false;
            for(k in x) { if(x.hasOwnProperty(k)) { 
                if(flag) ret.push(',\n');
                else ret.push('\n{');
                flag = true; 
                ret.push(k); 
                ret.push(': \n'); 
                foo(x[k]); 
            } }
            if(flag) ret.push('}\n');
            return true;
        }
        if(x instanceof Array) {
            if(x.length > numeric.largeArray) { ret.push('...Large Array...'); return true; }
            var flag = false;
            ret.push('[');
            for(k=0;k<x.length;k++) { if(k>0) { ret.push(','); if(flag) ret.push('\n '); } flag = foo(x[k]); }
            ret.push(']');
            return true;
        }
        ret.push('{');
        var flag = false;
        for(k in x) { if(x.hasOwnProperty(k)) { if(flag) ret.push(',\n'); flag = true; ret.push(k); ret.push(': \n'); foo(x[k]); } }
        ret.push('}');
        return true;
    }
    foo(x);
    return ret.join('');
}

numeric.parseDate = function parseDate(d) {
    function foo(d) {
        if(typeof d === 'string') { return Date.parse(d.replace(/-/g,'/')); }
        if(!(d instanceof Array)) { throw new Error("parseDate: parameter must be arrays of strings"); }
        var ret = [],k;
        for(k=0;k<d.length;k++) { ret[k] = foo(d[k]); }
        return ret;
    }
    return foo(d);
}

numeric.parseFloat = function parseFloat_(d) {
    function foo(d) {
        if(typeof d === 'string') { return parseFloat(d); }
        if(!(d instanceof Array)) { throw new Error("parseFloat: parameter must be arrays of strings"); }
        var ret = [],k;
        for(k=0;k<d.length;k++) { ret[k] = foo(d[k]); }
        return ret;
    }
    return foo(d);
}

numeric.parseCSV = function parseCSV(t) {
    var foo = t.split('\n');
    var j,k;
    var ret = [];
    var pat = /(([^'",]*)|('[^']*')|("[^"]*")),/g;
    var patnum = /^\s*(([+-]?[0-9]+(\.[0-9]*)?(e[+-]?[0-9]+)?)|([+-]?[0-9]*(\.[0-9]+)?(e[+-]?[0-9]+)?))\s*$/;
    var stripper = function(n) { return n.substr(0,n.length-1); }
    var count = 0;
    for(k=0;k<foo.length;k++) {
      var bar = (foo[k]+",").match(pat),baz;
      if(bar.length>0) {
          ret[count] = [];
          for(j=0;j<bar.length;j++) {
              baz = stripper(bar[j]);
              if(patnum.test(baz)) { ret[count][j] = parseFloat(baz); }
              else ret[count][j] = baz;
          }
          count++;
      }
    }
    return ret;
}

numeric.toCSV = function toCSV(A) {
    var s = numeric.dim(A);
    var i,j,m,n,row,ret;
    m = s[0];
    n = s[1];
    ret = [];
    for(i=0;i<m;i++) {
        row = [];
        for(j=0;j<m;j++) { row[j] = A[i][j].toString(); }
        ret[i] = row.join(', ');
    }
    return ret.join('\n')+'\n';
}

numeric.getURL = function getURL(url) {
    var client = new XMLHttpRequest();
    client.open("GET",url,false);
    client.send();
    return client;
}

numeric.imageURL = function imageURL(img) {
    function base64(A) {
        var n = A.length, i,x,y,z,p,q,r,s;
        var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var ret = "";
        for(i=0;i<n;i+=3) {
            x = A[i];
            y = A[i+1];
            z = A[i+2];
            p = x >> 2;
            q = ((x & 3) << 4) + (y >> 4);
            r = ((y & 15) << 2) + (z >> 6);
            s = z & 63;
            if(i+1>=n) { r = s = 64; }
            else if(i+2>=n) { s = 64; }
            ret += key.charAt(p) + key.charAt(q) + key.charAt(r) + key.charAt(s);
            }
        return ret;
    }
    function crc32Array (a,from,to) {
        if(typeof from === "undefined") { from = 0; }
        if(typeof to === "undefined") { to = a.length; }
        var table = [0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3,
                     0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988, 0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91, 
                     0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE, 0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7,
                     0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5, 
                     0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172, 0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B, 
                     0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940, 0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59, 
                     0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F,
                     0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924, 0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D,
                     0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A, 0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433,
                     0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818, 0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01, 
                     0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E, 0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457, 
                     0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65, 
                     0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2, 0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB, 
                     0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0, 0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9, 
                     0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F, 
                     0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD, 
                     0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A, 0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683, 
                     0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8, 0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1, 
                     0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7, 
                     0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC, 0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5, 
                     0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B, 
                     0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79, 
                     0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236, 0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F, 
                     0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D, 
                     0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A, 0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713, 
                     0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38, 0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21, 
                     0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777, 
                     0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C, 0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45, 
                     0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2, 0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB, 
                     0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9, 
                     0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF, 
                     0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94, 0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D];
     
        var crc = -1, y = 0, n = a.length,i;

        for (i = from; i < to; i++) {
            y = (crc ^ a[i]) & 0xFF;
            crc = (crc >>> 8) ^ table[y];
        }
     
        return crc ^ (-1);
    }

    var h = img[0].length, w = img[0][0].length, s1, s2, next,k,length,a,b,i,j,adler32,crc32;
    var stream = [
                  137, 80, 78, 71, 13, 10, 26, 10,                           //  0: PNG signature
                  0,0,0,13,                                                  //  8: IHDR Chunk length
                  73, 72, 68, 82,                                            // 12: "IHDR" 
                  (w >> 24) & 255, (w >> 16) & 255, (w >> 8) & 255, w&255,   // 16: Width
                  (h >> 24) & 255, (h >> 16) & 255, (h >> 8) & 255, h&255,   // 20: Height
                  8,                                                         // 24: bit depth
                  2,                                                         // 25: RGB
                  0,                                                         // 26: deflate
                  0,                                                         // 27: no filter
                  0,                                                         // 28: no interlace
                  -1,-2,-3,-4,                                               // 29: CRC
                  -5,-6,-7,-8,                                               // 33: IDAT Chunk length
                  73, 68, 65, 84,                                            // 37: "IDAT"
                  // RFC 1950 header starts here
                  8,                                                         // 41: RFC1950 CMF
                  29                                                         // 42: RFC1950 FLG
                  ];
    crc32 = crc32Array(stream,12,29);
    stream[29] = (crc32>>24)&255;
    stream[30] = (crc32>>16)&255;
    stream[31] = (crc32>>8)&255;
    stream[32] = (crc32)&255;
    s1 = 1;
    s2 = 0;
    for(i=0;i<h;i++) {
        if(i<h-1) { stream.push(0); }
        else { stream.push(1); }
        a = (3*w+1+(i===0))&255; b = ((3*w+1+(i===0))>>8)&255;
        stream.push(a); stream.push(b);
        stream.push((~a)&255); stream.push((~b)&255);
        if(i===0) stream.push(0);
        for(j=0;j<w;j++) {
            for(k=0;k<3;k++) {
                a = img[k][i][j];
                if(a>255) a = 255;
                else if(a<0) a=0;
                else a = Math.round(a);
                s1 = (s1 + a )%65521;
                s2 = (s2 + s1)%65521;
                stream.push(a);
            }
        }
        stream.push(0);
    }
    adler32 = (s2<<16)+s1;
    stream.push((adler32>>24)&255);
    stream.push((adler32>>16)&255);
    stream.push((adler32>>8)&255);
    stream.push((adler32)&255);
    length = stream.length - 41;
    stream[33] = (length>>24)&255;
    stream[34] = (length>>16)&255;
    stream[35] = (length>>8)&255;
    stream[36] = (length)&255;
    crc32 = crc32Array(stream,37);
    stream.push((crc32>>24)&255);
    stream.push((crc32>>16)&255);
    stream.push((crc32>>8)&255);
    stream.push((crc32)&255);
    stream.push(0);
    stream.push(0);
    stream.push(0);
    stream.push(0);
//    a = stream.length;
    stream.push(73);  // I
    stream.push(69);  // E
    stream.push(78);  // N
    stream.push(68);  // D
    stream.push(174); // CRC1
    stream.push(66);  // CRC2
    stream.push(96);  // CRC3
    stream.push(130); // CRC4
    return 'data:image/png;base64,'+base64(stream);
}

// 2. Linear algebra with Arrays.
numeric._dim = function _dim(x) {
    var ret = [];
    while(typeof x === "object") { ret.push(x.length); x = x[0]; }
    return ret;
}

numeric.dim = function dim(x) {
    var y,z;
    if(typeof x === "object") {
        y = x[0];
        if(typeof y === "object") {
            z = y[0];
            if(typeof z === "object") {
                return numeric._dim(x);
            }
            return [x.length,y.length];
        }
        return [x.length];
    }
    return [];
}

numeric.mapreduce = function mapreduce(body,init) {
    return Function('x','accum','_s','_k',
            'if(typeof accum === "undefined") accum = '+init+';\n'+
            'if(typeof x === "number") { var xi = x; '+body+'; return accum; }\n'+
            'if(typeof _s === "undefined") _s = numeric.dim(x);\n'+
            'if(typeof _k === "undefined") _k = 0;\n'+
            'var _n = _s[_k];\n'+
            'var i,xi;\n'+
            'if(_k < _s.length-1) {\n'+
            '    for(i=_n-1;i>=0;i--) {\n'+
            '        accum = arguments.callee(x[i],accum,_s,_k+1);\n'+
            '    }'+
            '    return accum;\n'+
            '}\n'+
            'for(i=_n-1;i>=1;i-=2) { \n'+
            '    xi = x[i];\n'+
            '    '+body+';\n'+
            '    xi = x[i-1];\n'+
            '    '+body+';\n'+
            '}\n'+
            'if(i === 0) {\n'+
            '    xi = x[i];\n'+
            '    '+body+'\n'+
            '}\n'+
            'return accum;'
            );
}
numeric.mapreduce2 = function mapreduce2(body,setup) {
    return Function('x',
            'var n = x.length;\n'+
            'var i,xi;\n'+setup+';\n'+
            'for(i=n-1;i!==-1;--i) { \n'+
            '    xi = x[i];\n'+
            '    '+body+';\n'+
            '}\n'+
            'return accum;'
            );
}


numeric.same = function same(x,y) {
    var i,n;
    if(!(x instanceof Array) || !(y instanceof Array)) { return false; }
    n = x.length;
    if(n !== y.length) { return false; }
    for(i=0;i<n;i++) {
        if(x[i] === y[i]) { continue; }
        if(typeof x[i] === "object") { if(!same(x[i],y[i])) return false; }
        else { return false; }
    }
    return true;
}

numeric.rep = function rep(s,v,k) {
    if(typeof k === "undefined") { k=0; }
    var n = s[k], ret = Array(n), i;
    if(k === s.length-1) {
        for(i=n-2;i>=0;i-=2) { ret[i+1] = v; ret[i] = v; }
        if(i===-1) { ret[0] = v; }
        return ret;
    }
    for(i=n-1;i>=0;i--) { ret[i] = numeric.rep(s,v,k+1); }
    return ret;
}


numeric.dotMMsmall = function dotMMsmall(x,y) {
    var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0;
    p = x.length; q = y.length; r = y[0].length;
    ret = Array(p);
    for(i=p-1;i>=0;i--) {
        foo = Array(r);
        bar = x[i];
        for(k=r-1;k>=0;k--) {
            woo = bar[q-1]*y[q-1][k];
            for(j=q-2;j>=1;j-=2) {
                i0 = j-1;
                woo += bar[j]*y[j][k] + bar[i0]*y[i0][k];
            }
            if(j===0) { woo += bar[0]*y[0][k]; }
            foo[k] = woo;
        }
        ret[i] = foo;
    }
    return ret;
}
numeric._getCol = function _getCol(A,j,x) {
    var n = A.length, i;
    for(i=n-1;i>0;--i) {
        x[i] = A[i][j];
        --i;
        x[i] = A[i][j];
    }
    if(i===0) x[0] = A[0][j];
}
numeric.dotMMbig = function dotMMbig(x,y){
    var gc = numeric._getCol, p = y.length, v = Array(p);
    var m = x.length, n = y[0].length, A = new Array(m), xj;
    var VV = numeric.dotVV;
    var i,j,k,z;
    --p;
    --m;
    for(i=m;i!==-1;--i) A[i] = Array(n);
    --n;
    for(i=n;i!==-1;--i) {
        gc(y,i,v);
        for(j=m;j!==-1;--j) {
            z=0;
            xj = x[j];
            A[j][i] = VV(xj,v);
        }
    }
    return A;
}

numeric.dotMV = function dotMV(x,y) {
    var p = x.length, q = y.length,i;
    var ret = Array(p), dotVV = numeric.dotVV;
    for(i=p-1;i>=0;i--) { ret[i] = dotVV(x[i],y); }
    return ret;
}

numeric.dotVM = function dotVM(x,y) {
    var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0,s1,s2,s3,baz,accum;
    p = x.length; q = y[0].length;
    ret = Array(q);
    for(k=q-1;k>=0;k--) {
        woo = x[p-1]*y[p-1][k];
        for(j=p-2;j>=1;j-=2) {
            i0 = j-1;
            woo += x[j]*y[j][k] + x[i0]*y[i0][k];
        }
        if(j===0) { woo += x[0]*y[0][k]; }
        ret[k] = woo;
    }
    return ret;
}

numeric.dotVV = function dotVV(x,y) {
    var i,n=x.length,i1,ret = x[n-1]*y[n-1];
    for(i=n-2;i>=1;i-=2) {
        i1 = i-1;
        ret += x[i]*y[i] + x[i1]*y[i1];
    }
    if(i===0) { ret += x[0]*y[0]; }
    return ret;
}

numeric.dot = function dot(x,y) {
    var d = numeric.dim;
    switch(d(x).length*1000+d(y).length) {
    case 2002:
        if(y.length < 10) return numeric.dotMMsmall(x,y);
        else return numeric.dotMMbig(x,y);
    case 2001: return numeric.dotMV(x,y);
    case 1002: return numeric.dotVM(x,y);
    case 1001: return numeric.dotVV(x,y);
    case 1000: return numeric.mulVS(x,y);
    case 1: return numeric.mulSV(x,y);
    case 0: return x*y;
    default: throw new Error('numeric.dot only works on vectors and matrices');
    }
}

numeric.diag = function diag(d) {
    var i,i1,j,n = d.length, A = Array(n), Ai;
    for(i=n-1;i>=0;i--) {
        Ai = Array(n);
        i1 = i+2;
        for(j=n-1;j>=i1;j-=2) {
            Ai[j] = 0;
            Ai[j-1] = 0;
        }
        if(j>i) { Ai[j] = 0; }
        Ai[i] = d[i];
        for(j=i-1;j>=1;j-=2) {
            Ai[j] = 0;
            Ai[j-1] = 0;
        }
        if(j===0) { Ai[0] = 0; }
        A[i] = Ai;
    }
    return A;
}
numeric.getDiag = function(A) {
    var n = Math.min(A.length,A[0].length),i,ret = Array(n);
    for(i=n-1;i>=1;--i) {
        ret[i] = A[i][i];
        --i;
        ret[i] = A[i][i];
    }
    if(i===0) {
        ret[0] = A[0][0];
    }
    return ret;
}

numeric.identity = function identity(n) { return numeric.diag(numeric.rep([n],1)); }
numeric.pointwise = function pointwise(params,body,setup) {
    if(typeof setup === "undefined") { setup = ""; }
    var fun = [];
    var k;
    var avec = /\[i\]$/,p,thevec = '';
    var haveret = false;
    for(k=0;k<params.length;k++) {
        if(avec.test(params[k])) {
            p = params[k].substring(0,params[k].length-3);
            thevec = p;
        } else { p = params[k]; }
        if(p==='ret') haveret = true;
        fun.push(p);
    }
    fun[params.length] = '_s';
    fun[params.length+1] = '_k';
    fun[params.length+2] = (
            'if(typeof _s === "undefined") _s = numeric.dim('+thevec+');\n'+
            'if(typeof _k === "undefined") _k = 0;\n'+
            'var _n = _s[_k];\n'+
            'var i'+(haveret?'':', ret = Array(_n)')+';\n'+
            'if(_k < _s.length-1) {\n'+
            '    for(i=_n-1;i>=0;i--) ret[i] = arguments.callee('+params.join(',')+',_s,_k+1);\n'+
            '    return ret;\n'+
            '}\n'+
            setup+'\n'+
            'for(i=_n-1;i!==-1;--i) {\n'+
            '    '+body+'\n'+
            '}\n'+
            'return ret;'
            );
    return Function.apply(null,fun);
}
numeric.pointwise2 = function pointwise2(params,body,setup) {
    if(typeof setup === "undefined") { setup = ""; }
    var fun = [];
    var k;
    var avec = /\[i\]$/,p,thevec = '';
    var haveret = false;
    for(k=0;k<params.length;k++) {
        if(avec.test(params[k])) {
            p = params[k].substring(0,params[k].length-3);
            thevec = p;
        } else { p = params[k]; }
        if(p==='ret') haveret = true;
        fun.push(p);
    }
    fun[params.length] = (
            'var _n = '+thevec+'.length;\n'+
            'var i'+(haveret?'':', ret = Array(_n)')+';\n'+
            setup+'\n'+
            'for(i=_n-1;i!==-1;--i) {\n'+
            body+'\n'+
            '}\n'+
            'return ret;'
            );
    return Function.apply(null,fun);
}
numeric._biforeach = (function _biforeach(x,y,s,k,f) {
    if(k === s.length-1) { f(x,y); return; }
    var i,n=s[k];
    for(i=n-1;i>=0;i--) { _biforeach(typeof x==="object"?x[i]:x,typeof y==="object"?y[i]:y,s,k+1,f); }
});
numeric._biforeach2 = (function _biforeach2(x,y,s,k,f) {
    if(k === s.length-1) { return f(x,y); }
    var i,n=s[k],ret = Array(n);
    for(i=n-1;i>=0;--i) { ret[i] = _biforeach2(typeof x==="object"?x[i]:x,typeof y==="object"?y[i]:y,s,k+1,f); }
    return ret;
});
numeric._foreach = (function _foreach(x,s,k,f) {
    if(k === s.length-1) { f(x); return; }
    var i,n=s[k];
    for(i=n-1;i>=0;i--) { _foreach(x[i],s,k+1,f); }
});
numeric._foreach2 = (function _foreach2(x,s,k,f) {
    if(k === s.length-1) { return f(x); }
    var i,n=s[k], ret = Array(n);
    for(i=n-1;i>=0;i--) { ret[i] = _foreach2(x[i],s,k+1,f); }
    return ret;
});

/*numeric.anyV = numeric.mapreduce('if(xi) return true;','false');
numeric.allV = numeric.mapreduce('if(!xi) return false;','true');
numeric.any = function(x) { if(typeof x.length === "undefined") return x; return numeric.anyV(x); }
numeric.all = function(x) { if(typeof x.length === "undefined") return x; return numeric.allV(x); }*/

numeric.ops2 = {
        add: '+',
        sub: '-',
        mul: '*',
        div: '/',
        mod: '%',
        and: '&&',
        or:  '||',
        eq:  '===',
        neq: '!==',
        lt:  '<',
        gt:  '>',
        leq: '<=',
        geq: '>=',
        band: '&',
        bor: '|',
        bxor: '^',
        lshift: '<<',
        rshift: '>>',
        rrshift: '>>>'
};
numeric.opseq = {
        addeq: '+=',
        subeq: '-=',
        muleq: '*=',
        diveq: '/=',
        modeq: '%=',
        lshifteq: '<<=',
        rshifteq: '>>=',
        rrshifteq: '>>>=',
        bandeq: '&=',
        boreq: '|=',
        bxoreq: '^='
};
numeric.mathfuns = ['abs','acos','asin','atan','ceil','cos',
                    'exp','floor','log','round','sin','sqrt','tan',
                    'isNaN','isFinite'];
numeric.mathfuns2 = ['atan2','pow','max','min'];
numeric.ops1 = {
        neg: '-',
        not: '!',
        bnot: '~',
        clone: ''
};
numeric.mapreducers = {
        any: ['if(xi) return true;','var accum = false;'],
        all: ['if(!xi) return false;','var accum = true;'],
        sum: ['accum += xi;','var accum = 0;'],
        prod: ['accum *= xi;','var accum = 1;'],
        norm2Squared: ['accum += xi*xi;','var accum = 0;'],
        norminf: ['accum = max(accum,abs(xi));','var accum = 0, max = Math.max, abs = Math.abs;'],
        norm1: ['accum += abs(xi)','var accum = 0, abs = Math.abs;'],
        sup: ['accum = max(accum,xi);','var accum = -Infinity, max = Math.max;'],
        inf: ['accum = min(accum,xi);','var accum = Infinity, min = Math.min;']
};

(function () {
    var i,o;
    for(i=0;i<numeric.mathfuns2.length;++i) {
        o = numeric.mathfuns2[i];
        numeric.ops2[o] = o;
    }
    for(i in numeric.ops2) {
        if(numeric.ops2.hasOwnProperty(i)) {
            o = numeric.ops2[i];
            var code, codeeq, setup = '';
            if(numeric.myIndexOf.call(numeric.mathfuns2,i)!==-1) {
                setup = 'var '+o+' = Math.'+o+';\n';
                code = function(r,x,y) { return r+' = '+o+'('+x+','+y+')'; };
                codeeq = function(x,y) { return x+' = '+o+'('+x+','+y+')'; };
            } else {
                code = function(r,x,y) { return r+' = '+x+' '+o+' '+y; };
                if(numeric.opseq.hasOwnProperty(i+'eq')) {
                    codeeq = function(x,y) { return x+' '+o+'= '+y; };
                } else {
                    codeeq = function(x,y) { return x+' = '+x+' '+o+' '+y; };                    
                }
            }
            numeric[i+'VV'] = numeric.pointwise2(['x[i]','y[i]'],code('ret[i]','x[i]','y[i]'),setup);
            numeric[i+'SV'] = numeric.pointwise2(['x','y[i]'],code('ret[i]','x','y[i]'),setup);
            numeric[i+'VS'] = numeric.pointwise2(['x[i]','y'],code('ret[i]','x[i]','y'),setup);
            numeric[i] = Function(
                    'var n = arguments.length, i, x = arguments[0], y;\n'+
                    'var VV = numeric.'+i+'VV, VS = numeric.'+i+'VS, SV = numeric.'+i+'SV;\n'+
                    'var dim = numeric.dim;\n'+
                    'for(i=1;i!==n;++i) { \n'+
                    '  y = arguments[i];\n'+
                    '  if(typeof x === "object") {\n'+
                    '      if(typeof y === "object") x = numeric._biforeach2(x,y,dim(x),0,VV);\n'+
                    '      else x = numeric._biforeach2(x,y,dim(x),0,VS);\n'+
                    '  } else if(typeof y === "object") x = numeric._biforeach2(x,y,dim(y),0,SV);\n'+
                    '  else '+codeeq('x','y')+'\n'+
                    '}\nreturn x;\n');
            numeric[o] = numeric[i];
            numeric[i+'eqV'] = numeric.pointwise2(['ret[i]','x[i]'], codeeq('ret[i]','x[i]'),setup);
            numeric[i+'eqS'] = numeric.pointwise2(['ret[i]','x'], codeeq('ret[i]','x'),setup);
            numeric[i+'eq'] = Function(
                    'var n = arguments.length, i, x = arguments[0], y;\n'+
                    'var V = numeric.'+i+'eqV, S = numeric.'+i+'eqS\n'+
                    'var s = numeric.dim(x);\n'+
                    'for(i=1;i!==n;++i) { \n'+
                    '  y = arguments[i];\n'+
                    '  if(typeof y === "object") numeric._biforeach(x,y,s,0,V);\n'+
                    '  else numeric._biforeach(x,y,s,0,S);\n'+
                    '}\nreturn x;\n');
        }
    }
    for(i=0;i<numeric.mathfuns2.length;++i) {
        o = numeric.mathfuns2[i];
        delete numeric.ops2[o];
    }
    for(i=0;i<numeric.mathfuns.length;++i) {
        o = numeric.mathfuns[i];
        numeric.ops1[o] = o;
    }
    for(i in numeric.ops1) {
        if(numeric.ops1.hasOwnProperty(i)) {
            setup = '';
            o = numeric.ops1[i];
            if(numeric.myIndexOf.call(numeric.mathfuns,i)!==-1) {
                if(Math.hasOwnProperty(o)) setup = 'var '+o+' = Math.'+o+';\n';
            }
            numeric[i+'eqV'] = numeric.pointwise2(['ret[i]'],'ret[i] = '+o+'(ret[i]);',setup);
            numeric[i+'eq'] = Function('x',
                    'if(typeof x !== "object") return '+o+'x\n'+
                    'var i;\n'+
                    'var V = numeric.'+i+'eqV;\n'+
                    'var s = numeric.dim(x);\n'+
                    'numeric._foreach(x,s,0,V);\n'+
                    'return x;\n');
            numeric[i+'V'] = numeric.pointwise2(['x[i]'],'ret[i] = '+o+'(x[i]);',setup);
            numeric[i] = Function('x',
                    'if(typeof x !== "object") return '+o+'(x)\n'+
                    'var i;\n'+
                    'var V = numeric.'+i+'V;\n'+
                    'var s = numeric.dim(x);\n'+
                    'return numeric._foreach2(x,s,0,V);\n');
        }
    }
    for(i=0;i<numeric.mathfuns.length;++i) {
        o = numeric.mathfuns[i];
        delete numeric.ops1[o];
    }
    for(i in numeric.mapreducers) {
        if(numeric.mapreducers.hasOwnProperty(i)) {
            o = numeric.mapreducers[i];
            numeric[i+'V'] = numeric.mapreduce2(o[0],o[1]);
            numeric[i] = Function('x','s','k',
                    o[1]+
                    'if(typeof x !== "object") {'+
                    '    xi = x;\n'+
                    o[0]+';\n'+
                    '    return accum;\n'+
                    '}'+
                    'if(typeof s === "undefined") s = numeric.dim(x);\n'+
                    'if(typeof k === "undefined") k = 0;\n'+
                    'if(k === s.length-1) return numeric.'+i+'V(x);\n'+
                    'var xi;\n'+
                    'var n = x.length, i;\n'+
                    'for(i=n-1;i!==-1;--i) {\n'+
                    '   xi = arguments.callee(x[i]);\n'+
                    o[0]+';\n'+
                    '}\n'+
                    'return accum;\n');
        }
    }
}());

numeric.truncVV = numeric.pointwise(['x[i]','y[i]'],'ret[i] = round(x[i]/y[i])*y[i];','var round = Math.round;');
numeric.truncVS = numeric.pointwise(['x[i]','y'],'ret[i] = round(x[i]/y)*y;','var round = Math.round;');
numeric.truncSV = numeric.pointwise(['x','y[i]'],'ret[i] = round(x/y[i])*y[i];','var round = Math.round;');
numeric.trunc = function trunc(x,y) {
    if(typeof x === "object") {
        if(typeof y === "object") return numeric.truncVV(x,y);
        return numeric.truncVS(x,y);
    }
    if (typeof y === "object") return numeric.truncSV(x,y);
    return Math.round(x/y)*y;
}

numeric.inv = function inv(x) {
    var s = numeric.dim(x), abs = Math.abs, m = s[0], n = s[1];
    var A = numeric.clone(x), Ai, Aj;
    var I = numeric.identity(m), Ii, Ij;
    var i,j,k,x;
    for(j=0;j<n;++j) {
        var i0 = -1;
        var v0 = -1;
        for(i=j;i!==m;++i) { k = abs(A[i][j]); if(k>v0) { i0 = i; v0 = k; } }
        Aj = A[i0]; A[i0] = A[j]; A[j] = Aj;
        Ij = I[i0]; I[i0] = I[j]; I[j] = Ij;
        x = Aj[j];
        for(k=j;k!==n;++k)    Aj[k] /= x; 
        for(k=n-1;k!==-1;--k) Ij[k] /= x;
        for(i=m-1;i!==-1;--i) {
            if(i!==j) {
                Ai = A[i];
                Ii = I[i];
                x = Ai[j];
                for(k=j+1;k!==n;++k)  Ai[k] -= Aj[k]*x;
                for(k=n-1;k>0;--k) { Ii[k] -= Ij[k]*x; --k; Ii[k] -= Ij[k]*x; }
                if(k===0) Ii[0] -= Ij[0]*x;
            }
        }
    }
    return I;
}

numeric.det = function det(x) {
    var s = numeric.dim(x);
    if(s.length !== 2 || s[0] !== s[1]) { throw new Error('numeric: det() only works on square matrices'); }
    var n = s[0], ret = 1,i,j,k,A = numeric.clone(x),Aj,Ai,alpha,temp,k1,k2,k3;
    for(j=0;j<n-1;j++) {
        k=j;
        for(i=j+1;i<n;i++) { if(Math.abs(A[i][j]) > Math.abs(A[k][j])) { k = i; } }
        if(k !== j) {
            temp = A[k]; A[k] = A[j]; A[j] = temp;
            ret *= -1;
        }
        Aj = A[j];
        for(i=j+1;i<n;i++) {
            Ai = A[i];
            alpha = Ai[j]/Aj[j];
            for(k=j+1;k<n-1;k+=2) {
                k1 = k+1;
                Ai[k] -= Aj[k]*alpha;
                Ai[k1] -= Aj[k1]*alpha;
            }
            if(k!==n) { Ai[k] -= Aj[k]*alpha; }
        }
        if(Aj[j] === 0) { return 0; }
        ret *= Aj[j];
    }
    return ret*A[j][j];
}

numeric.transpose = function transpose(x) {
    var i,j,m = x.length,n = x[0].length, ret=Array(n),A0,A1,Bj;
    for(j=0;j<n;j++) ret[j] = Array(m);
    for(i=m-1;i>=1;i-=2) {
        A1 = x[i];
        A0 = x[i-1];
        for(j=n-1;j>=1;--j) {
            Bj = ret[j]; Bj[i] = A1[j]; Bj[i-1] = A0[j];
            --j;
            Bj = ret[j]; Bj[i] = A1[j]; Bj[i-1] = A0[j];
        }
        if(j===0) {
            Bj = ret[0]; Bj[i] = A1[0]; Bj[i-1] = A0[0];
        }
    }
    if(i===0) {
        A0 = x[0];
        for(j=n-1;j>=1;--j) {
            ret[j][0] = A0[j];
            --j;
            ret[j][0] = A0[j];
        }
        if(j===0) { ret[0][0] = A0[0]; }
    }
    return ret;
}
numeric.negtranspose = function negtranspose(x) {
    var i,j,m = x.length,n = x[0].length, ret=Array(n),A0,A1,Bj;
    for(j=0;j<n;j++) ret[j] = Array(m);
    for(i=m-1;i>=1;i-=2) {
        A1 = x[i];
        A0 = x[i-1];
        for(j=n-1;j>=1;--j) {
            Bj = ret[j]; Bj[i] = -A1[j]; Bj[i-1] = -A0[j];
            --j;
            Bj = ret[j]; Bj[i] = -A1[j]; Bj[i-1] = -A0[j];
        }
        if(j===0) {
            Bj = ret[0]; Bj[i] = -A1[0]; Bj[i-1] = -A0[0];
        }
    }
    if(i===0) {
        A0 = x[0];
        for(j=n-1;j>=1;--j) {
            ret[j][0] = -A0[j];
            --j;
            ret[j][0] = -A0[j];
        }
        if(j===0) { ret[0][0] = -A0[0]; }
    }
    return ret;
}

numeric._random = function _random(s,k) {
    var i,n=s[k],ret=Array(n), rnd;
    if(k === s.length-1) {
        rnd = Math.random;
        for(i=n-1;i>=1;i-=2) {
            ret[i] = rnd();
            ret[i-1] = rnd();
        }
        if(i===0) { ret[0] = rnd(); }
        return ret;
    }
    for(i=n-1;i>=0;i--) ret[i] = _random(s,k+1);
    return ret;
}
numeric.random = function random(s) { return numeric._random(s,0); }

numeric.norm2 = function norm2(x) { return Math.sqrt(numeric.norm2Squared(x)); }

numeric.linspace = function linspace(a,b,n) {
    if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
    if(n<2) { return n===1?[a]:[]; }
    var i,ret = Array(n);
    n--;
    for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
    return ret;
}

numeric.getBlock = function getBlock(x,from,to) {
    var s = numeric.dim(x);
    function foo(x,k) {
        var i,a = from[k], n = to[k]-a, ret = Array(n);
        if(k === s.length-1) {
            for(i=n;i>=0;i--) { ret[i] = x[i+a]; }
            return ret;
        }
        for(i=n;i>=0;i--) { ret[i] = foo(x[i+a],k+1); }
        return ret;
    }
    return foo(x,0);
}

numeric.setBlock = function setBlock(x,from,to,B) {
    var s = numeric.dim(x);
    function foo(x,y,k) {
        var i,a = from[k], n = to[k]-a;
        if(k === s.length-1) { for(i=n;i>=0;i--) { x[i+a] = y[i]; } }
        for(i=n;i>=0;i--) { foo(x[i+a],y[i],k+1); }
    }
    foo(x,B,0);
    return x;
}

numeric.getRange = function getRange(A,I,J) {
    var m = I.length, n = J.length;
    var i,j;
    var B = Array(m), Bi, AI;
    for(i=m-1;i!==-1;--i) {
        B[i] = Array(n);
        Bi = B[i];
        AI = A[I[i]];
        for(j=n-1;j!==-1;--j) Bi[j] = AI[J[j]];
    }
    return B;
}

numeric.blockMatrix = function blockMatrix(X) {
    var s = numeric.dim(X);
    if(s.length<4) return numeric.blockMatrix([X]);
    var m=s[0],n=s[1],M,N,i,j,Xij;
    M = 0; N = 0;
    for(i=0;i<m;++i) M+=X[i][0].length;
    for(j=0;j<n;++j) N+=X[0][j][0].length;
    var Z = Array(M);
    for(i=0;i<M;++i) Z[i] = Array(N);
    var I=0,J,ZI,k,l,Xijk;
    for(i=0;i<m;++i) {
        J=N;
        for(j=n-1;j!==-1;--j) {
            Xij = X[i][j];
            J -= Xij[0].length;
            for(k=Xij.length-1;k!==-1;--k) {
                Xijk = Xij[k];
                ZI = Z[I+k];
                for(l = Xijk.length-1;l!==-1;--l) ZI[J+l] = Xijk[l];
            }
        }
        I += X[i][0].length;
    }
    return Z;
}

numeric.tensor = function tensor(x,y) {
    if(typeof x === "number" || typeof y === "number") return numeric.mul(x,y);
    var s1 = numeric.dim(x), s2 = numeric.dim(y);
    if(s1.length !== 1 || s2.length !== 1) {
        throw new Error('numeric: tensor product is only defined for vectors');
    }
    var m = s1[0], n = s2[0], A = Array(m), Ai, i,j,xi;
    for(i=m-1;i>=0;i--) {
        Ai = Array(n);
        xi = x[i];
        for(j=n-1;j>=3;--j) {
            Ai[j] = xi * y[j];
            --j;
            Ai[j] = xi * y[j];
            --j;
            Ai[j] = xi * y[j];
            --j;
            Ai[j] = xi * y[j];
        }
        while(j>=0) { Ai[j] = xi * y[j]; --j; }
        A[i] = Ai;
    }
    return A;
}

// 3. The Tensor type T
numeric.T = function T(x,y) { this.x = x; this.y = y; }
numeric.t = function t(x,y) { return new numeric.T(x,y); }

numeric.Tbinop = function Tbinop(rr,rc,cr,cc,setup) {
    var io = numeric.indexOf;
    if(typeof setup !== "string") {
        var k;
        setup = '';
        for(k in numeric) {
            if(numeric.hasOwnProperty(k) && (rr.indexOf(k)>=0 || rc.indexOf(k)>=0 || cr.indexOf(k)>=0 || cc.indexOf(k)>=0) && k.length>1) {
                setup += 'var '+k+' = numeric.'+k+';\n';
            }
        }
    }
    return Function(['y'],
            'var x = this;\n'+
            'if(!(y instanceof numeric.T)) { y = new numeric.T(y); }\n'+
            setup+'\n'+
            'if(x.y) {'+
            '  if(y.y) {'+
            '    return new numeric.T('+cc+');\n'+
            '  }\n'+
            '  return new numeric.T('+cr+');\n'+
            '}\n'+
            'if(y.y) {\n'+
            '  return new numeric.T('+rc+');\n'+
            '}\n'+
            'return new numeric.T('+rr+');\n'
    );
}

numeric.T.prototype.add = numeric.Tbinop(
        'add(x.x,y.x)',
        'add(x.x,y.x),y.y',
        'add(x.x,y.x),x.y',
        'add(x.x,y.x),add(x.y,y.y)');
numeric.T.prototype.sub = numeric.Tbinop(
        'sub(x.x,y.x)',
        'sub(x.x,y.x),neg(y.y)',
        'sub(x.x,y.x),x.y',
        'sub(x.x,y.x),sub(x.y,y.y)');
numeric.T.prototype.mul = numeric.Tbinop(
        'mul(x.x,y.x)',
        'mul(x.x,y.x),mul(x.x,y.y)',
        'mul(x.x,y.x),mul(x.y,y.x)',
        'sub(mul(x.x,y.x),mul(x.y,y.y)),add(mul(x.x,y.y),mul(x.y,y.x))');

numeric.T.prototype.reciprocal = function reciprocal() {
    var mul = numeric.mul, div = numeric.div;
    if(this.y) {
        var d = numeric.add(mul(this.x,this.x),mul(this.y,this.y));
        return new numeric.T(div(this.x,d),div(numeric.neg(this.y),d));
    }
    return new T(div(1,this.x));
}
numeric.T.prototype.div = function div(y) {
    if(!(y instanceof numeric.T)) y = new numeric.T(y);
    if(y.y) { return this.mul(y.reciprocal()); }
    var div = numeric.div;
    if(this.y) { return new numeric.T(div(this.x,y.x),div(this.y,y.x)); }
    return new numeric.T(div(this.x,y.x));
}
numeric.T.prototype.dot = numeric.Tbinop(
        'dot(x.x,y.x)',
        'dot(x.x,y.x),dot(x.x,y.y)',
        'dot(x.x,y.x),dot(x.y,y.x)',
        'sub(dot(x.x,y.x),dot(x.y,y.y)),add(dot(x.x,y.y),dot(x.y,y.x))'
        );
numeric.T.prototype.transpose = function transpose() {
    var t = numeric.transpose, x = this.x, y = this.y;
    if(y) { return new numeric.T(t(x),t(y)); }
    return new numeric.T(t(x));
}
numeric.T.prototype.transjugate = function transjugate() {
    var t = numeric.transpose, x = this.x, y = this.y;
    if(y) { return new numeric.T(t(x),numeric.negtranspose(y)); }
    return new numeric.T(t(x));
}
numeric.Tunop = function Tunop(r,c,s) {
    if(typeof s !== "string") { s = ''; }
    return Function(
            'var x = this;\n'+
            s+'\n'+
            'if(x.y) {'+
            '  '+c+';\n'+
            '}\n'+
            r+';\n'
    );
}

numeric.T.prototype.exp = numeric.Tunop(
        'return new numeric.T(ex)',
        'return new numeric.T(mul(cos(x.y),ex),mul(sin(x.y),ex))',
        'var ex = numeric.exp(x.x), cos = numeric.cos, sin = numeric.sin, mul = numeric.mul;');
numeric.T.prototype.conj = numeric.Tunop(
        'return new numeric.T(x.x);',
        'return new numeric.T(x.x,numeric.neg(x.y));');
numeric.T.prototype.neg = numeric.Tunop(
        'return new numeric.T(neg(x.x));',
        'return new numeric.T(neg(x.x),neg(x.y));',
        'var neg = numeric.neg;');
numeric.T.prototype.sin = numeric.Tunop(
        'return new numeric.T(numeric.sin(x.x))',
        'return x.exp().sub(x.neg().exp()).div(new numeric.T(0,2));');
numeric.T.prototype.cos = numeric.Tunop(
        'return new numeric.T(numeric.cos(x.x))',
        'return x.exp().add(x.neg().exp()).div(2);');
numeric.T.prototype.abs = numeric.Tunop(
        'return new numeric.T(numeric.abs(x.x));',
        'return new numeric.T(numeric.sqrt(numeric.add(mul(x.x,x.x),mul(x.y,x.y))));',
        'var mul = numeric.mul;');
numeric.T.prototype.log = numeric.Tunop(
        'return new numeric.T(numeric.log(x.x));',
        'var theta = new numeric.T(numeric.atan2(x.y,x.x)), r = x.abs();\n'+
        'return new numeric.T(numeric.log(r.x),theta.x);');
numeric.T.prototype.norm2 = numeric.Tunop(
        'return numeric.norm2(x.x);',
        'var f = numeric.norm2Squared;\n'+
        'return Math.sqrt(f(x.x)+f(x.y));');
numeric.T.prototype.inv = function inv() {
    var A = this;
    if(typeof A.y === "undefined") { return new numeric.T(numeric.inv(A.x)); }
    var n = A.x.length, i, j, k;
    var Rx = numeric.identity(n),Ry = numeric.rep([n,n],0);
    var Ax = numeric.clone(A.x), Ay = numeric.clone(A.y);
    var Aix, Aiy, Ajx, Ajy, Rix, Riy, Rjx, Rjy;
    var i,j,k,d,d1,ax,ay,bx,by,temp;
    for(i=0;i<n;i++) {
        ax = Ax[i][i]; ay = Ay[i][i];
        d = ax*ax+ay*ay;
        k = i;
        for(j=i+1;j<n;j++) {
            ax = Ax[j][i]; ay = Ay[j][i];
            d1 = ax*ax+ay*ay;
            if(d1 > d) { k=j; d = d1; }
        }
        if(k!==i) {
            temp = Ax[i]; Ax[i] = Ax[k]; Ax[k] = temp;
            temp = Ay[i]; Ay[i] = Ay[k]; Ay[k] = temp;
            temp = Rx[i]; Rx[i] = Rx[k]; Rx[k] = temp;
            temp = Ry[i]; Ry[i] = Ry[k]; Ry[k] = temp;
        }
        Aix = Ax[i]; Aiy = Ay[i];
        Rix = Rx[i]; Riy = Ry[i];
        ax = Aix[i]; ay = Aiy[i];
        for(j=i+1;j<n;j++) {
            bx = Aix[j]; by = Aiy[j];
            Aix[j] = (bx*ax+by*ay)/d;
            Aiy[j] = (by*ax-bx*ay)/d;
        }
        for(j=0;j<n;j++) {
            bx = Rix[j]; by = Riy[j];
            Rix[j] = (bx*ax+by*ay)/d;
            Riy[j] = (by*ax-bx*ay)/d;
        }
        for(j=i+1;j<n;j++) {
            Ajx = Ax[j]; Ajy = Ay[j];
            Rjx = Rx[j]; Rjy = Ry[j];
            ax = Ajx[i]; ay = Ajy[i];
            for(k=i+1;k<n;k++) {
                bx = Aix[k]; by = Aiy[k];
                Ajx[k] -= bx*ax-by*ay;
                Ajy[k] -= by*ax+bx*ay;
            }
            for(k=0;k<n;k++) {
                bx = Rix[k]; by = Riy[k];
                Rjx[k] -= bx*ax-by*ay;
                Rjy[k] -= by*ax+bx*ay;
            }
        }
    }
    for(i=n-1;i>0;i--) {
        Rix = Rx[i]; Riy = Ry[i];
        for(j=i-1;j>=0;j--) {
            Rjx = Rx[j]; Rjy = Ry[j];
            ax = Ax[j][i]; ay = Ay[j][i];
            for(k=n-1;k>=0;k--) {
                bx = Rix[k]; by = Riy[k];
                Rjx[k] -= ax*bx - ay*by;
                Rjy[k] -= ax*by + ay*bx;
            }
        }
    }
    return new numeric.T(Rx,Ry);
}
numeric.T.prototype.get = function get(i) {
    var x = this.x, y = this.y, k = 0, ik, n = i.length;
    if(y) {
        while(k<n) {
            ik = i[k];
            x = x[ik];
            y = y[ik];
            k++;
        }
        return new numeric.T(x,y);
    }
    while(k<n) {
        ik = i[k];
        x = x[ik];
        k++;
    }
    return new numeric.T(x);
}
numeric.T.prototype.set = function set(i,v) {
    var x = this.x, y = this.y, k = 0, ik, n = i.length, vx = v.x, vy = v.y;
    if(n===0) {
        if(vy) { this.y = vy; }
        else if(y) { this.y = undefined; }
        this.x = x;
        return this;
    }
    if(vy) {
        if(y) { /* ok */ }
        else {
            y = numeric.rep(numeric.dim(x),0);
            this.y = y;
        }
        while(k<n-1) {
            ik = i[k];
            x = x[ik];
            y = y[ik];
            k++;
        }
        ik = i[k];
        x[ik] = vx;
        y[ik] = vy;
        return this;
    }
    if(y) {
        while(k<n-1) {
            ik = i[k];
            x = x[ik];
            y = y[ik];
            k++;
        }
        ik = i[k];
        x[ik] = vx;
        if(vx instanceof Array) y[ik] = numeric.rep(numeric.dim(vx),0);
        else y[ik] = 0;
        return this;
    }
    while(k<n-1) {
        ik = i[k];
        x = x[ik];
        k++;
    }
    ik = i[k];
    x[ik] = vx;
    return this;
}
numeric.T.prototype.getRows = function getRows(i0,i1) {
    var n = i1-i0+1, j;
    var rx = Array(n), ry, x = this.x, y = this.y;
    for(j=i0;j<=i1;j++) { rx[j-i0] = x[j]; }
    if(y) {
        ry = Array(n);
        for(j=i0;j<=i1;j++) { ry[j-i0] = y[j]; }
        return new numeric.T(rx,ry);
    }
    return new numeric.T(rx);
}
numeric.T.prototype.setRows = function setRows(i0,i1,A) {
    var j;
    var rx = this.x, ry = this.y, x = A.x, y = A.y;
    for(j=i0;j<=i1;j++) { rx[j] = x[j-i0]; }
    if(y) {
        if(!ry) { ry = numeric.rep(numeric.dim(rx),0); this.y = ry; }
        for(j=i0;j<=i1;j++) { ry[j] = y[j-i0]; }
    } else if(ry) {
        for(j=i0;j<=i1;j++) { ry[j] = numeric.rep([x[j-i0].length],0); }
    }
    return this;
}
numeric.T.prototype.getRow = function getRow(k) {
    var x = this.x, y = this.y;
    if(y) { return new numeric.T(x[k],y[k]); }
    return new numeric.T(x[k]);
}
numeric.T.prototype.setRow = function setRow(i,v) {
    var rx = this.x, ry = this.y, x = v.x, y = v.y;
    rx[i] = x;
    if(y) {
        if(!ry) { ry = numeric.rep(numeric.dim(rx),0); this.y = ry; }
        ry[i] = y;
    } else if(ry) {
        ry = numeric.rep([x.length],0);
    }
    return this;
}

numeric.T.prototype.getBlock = function getBlock(from,to) {
    var x = this.x, y = this.y, b = numeric.getBlock;
    if(y) { return new numeric.T(b(x,from,to),b(y,from,to)); }
    return new numeric.T(b(x,from,to));
}
numeric.T.prototype.setBlock = function setBlock(from,to,A) {
    if(!(A instanceof numeric.T)) A = new numeric.T(A);
    var x = this.x, y = this.y, b = numeric.setBlock, Ax = A.x, Ay = A.y;
    if(Ay) {
        if(!y) { this.y = numeric.rep(numeric.dim(this),0); y = this.y; }
        b(x,from,to,Ax);
        b(y,from,to,Ay);
        return this;
    }
    b(x,from,to,Ax);
    if(y) b(y,from,to,numeric.rep(numeric.dim(Ax),0));
}
numeric.T.rep = function rep(s,v) {
    var T = numeric.T;
    if(!(v instanceof T)) v = new T(v);
    var x = v.x, y = v.y, r = numeric.rep;
    if(y) return new T(r(s,x),r(s,y));
    return new T(r(s,x));
}
numeric.T.diag = function diag(d) {
    if(!(d instanceof numeric.T)) d = new numeric.T(d);
    var x = d.x, y = d.y, diag = numeric.diag;
    if(y) return new numeric.T(diag(x),diag(y));
    return new numeric.T(diag(x));
}
numeric.T.eig = function eig() {
    if(this.y) { throw new Error('eig: not implemented for complex matrices.'); }
    return numeric.eig(this.x);
}
numeric.T.identity = function identity(n) { return new numeric.T(numeric.identity(n)); }
numeric.T.prototype.getDiag = function getDiag() {
    var n = numeric;
    var x = this.x, y = this.y;
    if(y) { return new n.T(n.getDiag(x),n.getDiag(y)); }
    return new n.T(n.getDiag(x));
}

// 4. Eigenvalues of real matrices

numeric.house = function house(x) {
    var v = numeric.clone(x);
    var s = x[0] >= 0 ? 1 : -1;
    var alpha = s*numeric.norm2(x);
    v[0] += alpha;
    var foo = numeric.norm2(v);
    if(foo === 0) { /* this should not happen */ throw new Error('eig: internal error'); }
    return numeric.div(v,foo);
}

numeric.toUpperHessenberg = function toUpperHessenberg(me) {
    var s = numeric.dim(me);
    if(s.length !== 2 || s[0] !== s[1]) { throw new Error('numeric: toUpperHessenberg() only works on square matrices'); }
    var m = s[0], i,j,k,x,v,A = numeric.clone(me),B,C,Ai,Ci,Q = numeric.identity(m),Qi;
    for(j=0;j<m-2;j++) {
        x = Array(m-j-1);
        for(i=j+1;i<m;i++) { x[i-j-1] = A[i][j]; }
        if(numeric.norm2(x)>0) {
            v = numeric.house(x);
            B = numeric.getBlock(A,[j+1,j],[m-1,m-1]);
            C = numeric.tensor(v,numeric.dot(v,B));
            for(i=j+1;i<m;i++) { Ai = A[i]; Ci = C[i-j-1]; for(k=j;k<m;k++) Ai[k] -= 2*Ci[k-j]; }
            B = numeric.getBlock(A,[0,j+1],[m-1,m-1]);
            C = numeric.tensor(numeric.dot(B,v),v);
            for(i=0;i<m;i++) { Ai = A[i]; Ci = C[i]; for(k=j+1;k<m;k++) Ai[k] -= 2*Ci[k-j-1]; }
            B = Array(m-j-1);
            for(i=j+1;i<m;i++) B[i-j-1] = Q[i];
            C = numeric.tensor(v,numeric.dot(v,B));
            for(i=j+1;i<m;i++) { Qi = Q[i]; Ci = C[i-j-1]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
        }
    }
    return {H:A, Q:Q};
}

numeric.epsilon = 2.220446049250313e-16;

numeric.QRFrancis = function(H,maxiter) {
    if(typeof maxiter === "undefined") { maxiter = 10000; }
    H = numeric.clone(H);
    var H0 = numeric.clone(H);
    var s = numeric.dim(H),m=s[0],x,v,a,b,c,d,det,tr, Hloc, Q = numeric.identity(m), Qi, Hi, B, C, Ci,i,j,k,iter;
    if(m<3) { return {Q:Q, B:[ [0,m-1] ]}; }
    var epsilon = numeric.epsilon;
    for(iter=0;iter<maxiter;iter++) {
        for(j=0;j<m-1;j++) {
            if(Math.abs(H[j+1][j]) < epsilon*(Math.abs(H[j][j])+Math.abs(H[j+1][j+1]))) {
                var QH1 = numeric.QRFrancis(numeric.getBlock(H,[0,0],[j,j]),maxiter);
                var QH2 = numeric.QRFrancis(numeric.getBlock(H,[j+1,j+1],[m-1,m-1]),maxiter);
                B = Array(j+1);
                for(i=0;i<=j;i++) { B[i] = Q[i]; }
                C = numeric.dot(QH1.Q,B);
                for(i=0;i<=j;i++) { Q[i] = C[i]; }
                B = Array(m-j-1);
                for(i=j+1;i<m;i++) { B[i-j-1] = Q[i]; }
                C = numeric.dot(QH2.Q,B);
                for(i=j+1;i<m;i++) { Q[i] = C[i-j-1]; }
                return {Q:Q,B:QH1.B.concat(numeric.add(QH2.B,j+1))};
            }
        }
        a = H[m-2][m-2]; b = H[m-2][m-1];
        c = H[m-1][m-2]; d = H[m-1][m-1];
        tr = a+d;
        det = (a*d-b*c);
        Hloc = numeric.getBlock(H, [0,0], [2,2]);
        if(tr*tr>=4*det) {
            var s1,s2;
            s1 = 0.5*(tr+Math.sqrt(tr*tr-4*det));
            s2 = 0.5*(tr-Math.sqrt(tr*tr-4*det));
            Hloc = numeric.add(numeric.sub(numeric.dot(Hloc,Hloc),
                                           numeric.mul(Hloc,s1+s2)),
                               numeric.diag(numeric.rep([3],s1*s2)));
        } else {
            Hloc = numeric.add(numeric.sub(numeric.dot(Hloc,Hloc),
                                           numeric.mul(Hloc,tr)),
                               numeric.diag(numeric.rep([3],det)));
        }
        x = [Hloc[0][0],Hloc[1][0],Hloc[2][0]];
        v = numeric.house(x);
        B = [H[0],H[1],H[2]];
        C = numeric.tensor(v,numeric.dot(v,B));
        for(i=0;i<3;i++) { Hi = H[i]; Ci = C[i]; for(k=0;k<m;k++) Hi[k] -= 2*Ci[k]; }
        B = numeric.getBlock(H, [0,0],[m-1,2]);
        C = numeric.tensor(numeric.dot(B,v),v);
        for(i=0;i<m;i++) { Hi = H[i]; Ci = C[i]; for(k=0;k<3;k++) Hi[k] -= 2*Ci[k]; }
        B = [Q[0],Q[1],Q[2]];
        C = numeric.tensor(v,numeric.dot(v,B));
        for(i=0;i<3;i++) { Qi = Q[i]; Ci = C[i]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
        var J;
        for(j=0;j<m-2;j++) {
            for(k=j;k<=j+1;k++) {
                if(Math.abs(H[k+1][k]) < epsilon*(Math.abs(H[k][k])+Math.abs(H[k+1][k+1]))) {
                    var QH1 = numeric.QRFrancis(numeric.getBlock(H,[0,0],[k,k]),maxiter);
                    var QH2 = numeric.QRFrancis(numeric.getBlock(H,[k+1,k+1],[m-1,m-1]),maxiter);
                    B = Array(k+1);
                    for(i=0;i<=k;i++) { B[i] = Q[i]; }
                    C = numeric.dot(QH1.Q,B);
                    for(i=0;i<=k;i++) { Q[i] = C[i]; }
                    B = Array(m-k-1);
                    for(i=k+1;i<m;i++) { B[i-k-1] = Q[i]; }
                    C = numeric.dot(QH2.Q,B);
                    for(i=k+1;i<m;i++) { Q[i] = C[i-k-1]; }
                    return {Q:Q,B:QH1.B.concat(numeric.add(QH2.B,k+1))};
                }
            }
            J = Math.min(m-1,j+3);
            x = Array(J-j);
            for(i=j+1;i<=J;i++) { x[i-j-1] = H[i][j]; }
            v = numeric.house(x);
            B = numeric.getBlock(H, [j+1,j],[J,m-1]);
            C = numeric.tensor(v,numeric.dot(v,B));
            for(i=j+1;i<=J;i++) { Hi = H[i]; Ci = C[i-j-1]; for(k=j;k<m;k++) Hi[k] -= 2*Ci[k-j]; }
            B = numeric.getBlock(H, [0,j+1],[m-1,J]);
            C = numeric.tensor(numeric.dot(B,v),v);
            for(i=0;i<m;i++) { Hi = H[i]; Ci = C[i]; for(k=j+1;k<=J;k++) Hi[k] -= 2*Ci[k-j-1]; }
            B = Array(J-j);
            for(i=j+1;i<=J;i++) B[i-j-1] = Q[i];
            C = numeric.tensor(v,numeric.dot(v,B));
            for(i=j+1;i<=J;i++) { Qi = Q[i]; Ci = C[i-j-1]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
        }
    }
    throw new Error('numeric: eigenvalue iteration does not converge -- increase maxiter?');
}

numeric.eig = function eig(A,maxiter) {
    var QH = numeric.toUpperHessenberg(A);
    var QB = numeric.QRFrancis(QH.H,maxiter);
    var T = numeric.T;
    var n = A.length,i,k,flag = false,B = QB.B,H = numeric.dot(QB.Q,numeric.dot(QH.H,numeric.transpose(QB.Q)));
    var Q = new T(numeric.dot(QB.Q,QH.Q)),Q0;
    var m = B.length,j;
    var a,b,c,d,p1,p2,disc,x,y,p,q,n1,n2;
    var sqrt = Math.sqrt;
    for(k=0;k<m;k++) {
        i = B[k][0];
        if(i === B[k][1]) {
            // nothing
        } else {
            j = i+1;
            a = H[i][i];
            b = H[i][j];
            c = H[j][i];
            d = H[j][j];
            if(b === 0 && c === 0) continue;
            p1 = -a-d;
            p2 = a*d-b*c;
            disc = p1*p1-4*p2;
            if(disc>=0) {
                if(p1<0) x = -0.5*(p1-sqrt(disc));
                else     x = -0.5*(p1+sqrt(disc));
                n1 = (a-x)*(a-x)+b*b;
                n2 = c*c+(d-x)*(d-x);
                if(n1>n2) {
                    n1 = sqrt(n1);
                    p = (a-x)/n1;
                    q = b/n1;
                } else {
                    n2 = sqrt(n2);
                    p = c/n2;
                    q = (d-x)/n2;
                }
                Q0 = new T([[q,-p],[p,q]]);
                Q.setRows(i,j,Q0.dot(Q.getRows(i,j)));
            } else {
                x = -0.5*p1;
                y = 0.5*sqrt(-disc);
                n1 = (a-x)*(a-x)+b*b;
                n2 = c*c+(d-x)*(d-x);
                if(n1>n2) {
                    n1 = sqrt(n1+y*y);
                    p = (a-x)/n1;
                    q = b/n1;
                    x = 0;
                    y /= n1;
                } else {
                    n2 = sqrt(n2+y*y);
                    p = c/n2;
                    q = (d-x)/n2;
                    x = y/n2;
                    y = 0;
                }
                Q0 = new T([[q,-p],[p,q]],[[x,y],[y,-x]]);
                Q.setRows(i,j,Q0.dot(Q.getRows(i,j)));
            }
        }
    }
    var R = Q.dot(A).dot(Q.transjugate()), n = A.length, E = numeric.T.identity(n);
    for(j=0;j<n;j++) {
        if(j>0) {
            for(k=j-1;k>=0;k--) {
                var Rk = R.get([k,k]), Rj = R.get([j,j]);
                if(numeric.neq(Rk.x,Rj.x) || numeric.neq(Rk.y,Rj.y)) {
                    x = R.getRow(k).getBlock([k],[j-1]);
                    y = E.getRow(j).getBlock([k],[j-1]);
                    E.set([j,k],(R.get([k,j]).neg().sub(x.dot(y))).div(Rk.sub(Rj)));
                } else {
                    E.setRow(j,E.getRow(k));
                    continue;
                }
            }
        }
    }
    for(j=0;j<n;j++) {
        x = E.getRow(j);
        E.setRow(j,x.div(x.norm2()));
    }
    E = E.transpose();
    E = Q.transjugate().dot(E);
    return { lambda:R.getDiag(), E:E };
};

// 5. Compressed Column Storage matrices
numeric.ccsSparse = function ccsSparse(A) {
    var m = A.length,n,foo, i,j, counts = [];
    for(i=m-1;i!==-1;--i) {
        foo = A[i];
        for(j in foo) {
            j = parseInt(j);
            while(j>=counts.length) counts[counts.length] = 0;
            if(foo[j]!==0) counts[j]++;
        }
    }
    var n = counts.length;
    var Ai = Array(n+1);
    Ai[0] = 0;
    for(i=0;i<n;++i) Ai[i+1] = Ai[i] + counts[i];
    var Aj = Array(Ai[n]), Av = Array(Ai[n]);
    for(i=m-1;i!==-1;--i) {
        foo = A[i];
        for(j in foo) {
            if(foo[j]!==0) {
                counts[j]--;
                Aj[Ai[j]+counts[j]] = i;
                Av[Ai[j]+counts[j]] = foo[j];
            }
        }
    }
    return [Ai,Aj,Av];
}
numeric.ccsFull = function ccsFull(A) {
    var Ai = A[0], Aj = A[1], Av = A[2], s = numeric.ccsDim(A), m = s[0], n = s[1], i,j,j0,j1,k;
    var B = numeric.rep([m,n],0);
    for(i=0;i<n;i++) {
        j0 = Ai[i];
        j1 = Ai[i+1];
        for(j=j0;j<j1;++j) { B[Aj[j]][i] = Av[j]; }
    }
    return B;
}
numeric.ccsTSolve = function ccsTSolve(A,b,x,bj,xj) {
    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, max = Math.max,n=0;
    if(typeof bj === "undefined") x = numeric.rep([m],0);
    if(typeof bj === "undefined") bj = numeric.linspace(0,x.length-1);
    if(typeof xj === "undefined") xj = [];
    function dfs(j) {
        var k;
        if(x[j] !== 0) return;
        x[j] = 1;
        for(k=Ai[j];k<Ai[j+1];++k) dfs(Aj[k]);
        xj[n] = j;
        ++n;
    }
    var i,j,j0,j1,k,l,l0,l1,a;
    for(i=bj.length-1;i!==-1;--i) { dfs(bj[i]); }
    xj.length = n;
    for(i=xj.length-1;i!==-1;--i) { x[xj[i]] = 0; }
    for(i=bj.length-1;i!==-1;--i) { j = bj[i]; x[j] = b[j]; }
    for(i=xj.length-1;i!==-1;--i) {
        j = xj[i];
        j0 = Ai[j];
        j1 = max(Ai[j+1],j0);
        for(k=j0;k!==j1;++k) { if(Aj[k] === j) { x[j] /= Av[k]; break; } }
        a = x[j];
        for(k=j0;k!==j1;++k) {
            l = Aj[k];
            if(l !== j) x[l] -= a*Av[k];
        }
    }
    return x;
}
numeric.ccsDFS = function ccsDFS(n) {
    this.k = Array(n);
    this.k1 = Array(n);
    this.j = Array(n);
}
numeric.ccsDFS.prototype.dfs = function dfs(J,Ai,Aj,x,xj,Pinv) {
    var m = 0,foo,n=xj.length;
    var k = this.k, k1 = this.k1, j = this.j,km,k11;
    if(x[J]!==0) return;
    x[J] = 1;
    j[0] = J;
    k[0] = km = Ai[J];
    k1[0] = k11 = Ai[J+1];
    while(1) {
        if(km >= k11) {
            xj[n] = j[m];
            if(m===0) return;
            ++n;
            --m;
            km = k[m];
            k11 = k1[m];
        } else {
            foo = Pinv[Aj[km]];
            if(x[foo] === 0) {
                x[foo] = 1;
                k[m] = km;
                ++m;
                j[m] = foo;
                km = Ai[foo];
                k1[m] = k11 = Ai[foo+1];
            } else ++km;
        }
    }
}
numeric.ccsLPSolve = function ccsLPSolve(A,B,x,xj,I,Pinv,dfs) {
    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, n=0;
    var Bi = B[0], Bj = B[1], Bv = B[2];
    
    var i,i0,i1,j,J,j0,j1,k,l,l0,l1,a;
    i0 = Bi[I];
    i1 = Bi[I+1];
    xj.length = 0;
    for(i=i0;i<i1;++i) { dfs.dfs(Pinv[Bj[i]],Ai,Aj,x,xj,Pinv); }
    for(i=xj.length-1;i!==-1;--i) { x[xj[i]] = 0; }
    for(i=i0;i!==i1;++i) { j = Pinv[Bj[i]]; x[j] = Bv[i]; }
    for(i=xj.length-1;i!==-1;--i) {
        j = xj[i];
        j0 = Ai[j];
        j1 = Ai[j+1];
        for(k=j0;k<j1;++k) { if(Pinv[Aj[k]] === j) { x[j] /= Av[k]; break; } }
        a = x[j];
        for(k=j0;k<j1;++k) {
            l = Pinv[Aj[k]];
            if(l !== j) x[l] -= a*Av[k];
        }
    }
    return x;
}
numeric.ccsLUP1 = function ccsLUP1(A,threshold) {
    var m = A[0].length-1;
    var L = [numeric.rep([m+1],0),[],[]], U = [numeric.rep([m+1], 0),[],[]];
    var Li = L[0], Lj = L[1], Lv = L[2], Ui = U[0], Uj = U[1], Uv = U[2];
    var x = numeric.rep([m],0), xj = numeric.rep([m],0);
    var i,j,k,j0,j1,a,e,c,d,K;
    var sol = numeric.ccsLPSolve, max = Math.max, abs = Math.abs;
    var P = numeric.linspace(0,m-1),Pinv = numeric.linspace(0,m-1);
    var dfs = new numeric.ccsDFS(m);
    if(typeof threshold === "undefined") { threshold = 1; }
    for(i=0;i<m;++i) {
        sol(L,A,x,xj,i,Pinv,dfs);
        a = -1;
        e = -1;
        for(j=xj.length-1;j!==-1;--j) {
            k = xj[j];
            if(k <= i) continue;
            c = abs(x[k]);
            if(c > a) { e = k; a = c; }
        }
        if(abs(x[i])<threshold*a) {
            j = P[i];
            a = P[e];
            P[i] = a; Pinv[a] = i;
            P[e] = j; Pinv[j] = e;
            a = x[i]; x[i] = x[e]; x[e] = a;
        }
        a = Li[i];
        e = Ui[i];
        d = x[i];
        Lj[a] = P[i];
        Lv[a] = 1;
        ++a;
        for(j=xj.length-1;j!==-1;--j) {
            k = xj[j];
            c = x[k];
            xj[j] = 0;
            x[k] = 0;
            if(k<=i) { Uj[e] = k; Uv[e] = c;   ++e; }
            else     { Lj[a] = P[k]; Lv[a] = c/d; ++a; }
        }
        Li[i+1] = a;
        Ui[i+1] = e;
    }
    for(j=Lj.length-1;j!==-1;--j) { Lj[j] = Pinv[Lj[j]]; }
    return {L:L, U:U, P:P, Pinv:Pinv};
}
numeric.ccsDFS0 = function ccsDFS0(n) {
    this.k = Array(n);
    this.k1 = Array(n);
    this.j = Array(n);
}
numeric.ccsDFS0.prototype.dfs = function dfs(J,Ai,Aj,x,xj,Pinv,P) {
    var m = 0,foo,n=xj.length;
    var k = this.k, k1 = this.k1, j = this.j,km,k11;
    if(x[J]!==0) return;
    x[J] = 1;
    j[0] = J;
    k[0] = km = Ai[Pinv[J]];
    k1[0] = k11 = Ai[Pinv[J]+1];
    while(1) {
        if(isNaN(km)) throw new Error("Ow!");
        if(km >= k11) {
            xj[n] = Pinv[j[m]];
            if(m===0) return;
            ++n;
            --m;
            km = k[m];
            k11 = k1[m];
        } else {
            foo = Aj[km];
            if(x[foo] === 0) {
                x[foo] = 1;
                k[m] = km;
                ++m;
                j[m] = foo;
                foo = Pinv[foo];
                km = Ai[foo];
                k1[m] = k11 = Ai[foo+1];
            } else ++km;
        }
    }
}
numeric.ccsLPSolve0 = function ccsLPSolve0(A,B,y,xj,I,Pinv,P,dfs) {
    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, n=0;
    var Bi = B[0], Bj = B[1], Bv = B[2];
    
    var i,i0,i1,j,J,j0,j1,k,l,l0,l1,a;
    i0 = Bi[I];
    i1 = Bi[I+1];
    xj.length = 0;
    for(i=i0;i<i1;++i) { dfs.dfs(Bj[i],Ai,Aj,y,xj,Pinv,P); }
    for(i=xj.length-1;i!==-1;--i) { j = xj[i]; y[P[j]] = 0; }
    for(i=i0;i!==i1;++i) { j = Bj[i]; y[j] = Bv[i]; }
    for(i=xj.length-1;i!==-1;--i) {
        j = xj[i];
        l = P[j];
        j0 = Ai[j];
        j1 = Ai[j+1];
        for(k=j0;k<j1;++k) { if(Aj[k] === l) { y[l] /= Av[k]; break; } }
        a = y[l];
        for(k=j0;k<j1;++k) y[Aj[k]] -= a*Av[k];
        y[l] = a;
    }
}
numeric.ccsLUP0 = function ccsLUP0(A,threshold) {
    var m = A[0].length-1;
    var L = [numeric.rep([m+1],0),[],[]], U = [numeric.rep([m+1], 0),[],[]];
    var Li = L[0], Lj = L[1], Lv = L[2], Ui = U[0], Uj = U[1], Uv = U[2];
    var y = numeric.rep([m],0), xj = numeric.rep([m],0);
    var i,j,k,j0,j1,a,e,c,d,K;
    var sol = numeric.ccsLPSolve0, max = Math.max, abs = Math.abs;
    var P = numeric.linspace(0,m-1),Pinv = numeric.linspace(0,m-1);
    var dfs = new numeric.ccsDFS0(m);
    if(typeof threshold === "undefined") { threshold = 1; }
    for(i=0;i<m;++i) {
        sol(L,A,y,xj,i,Pinv,P,dfs);
        a = -1;
        e = -1;
        for(j=xj.length-1;j!==-1;--j) {
            k = xj[j];
            if(k <= i) continue;
            c = abs(y[P[k]]);
            if(c > a) { e = k; a = c; }
        }
        if(abs(y[P[i]])<threshold*a) {
            j = P[i];
            a = P[e];
            P[i] = a; Pinv[a] = i;
            P[e] = j; Pinv[j] = e;
        }
        a = Li[i];
        e = Ui[i];
        d = y[P[i]];
        Lj[a] = P[i];
        Lv[a] = 1;
        ++a;
        for(j=xj.length-1;j!==-1;--j) {
            k = xj[j];
            c = y[P[k]];
            xj[j] = 0;
            y[P[k]] = 0;
            if(k<=i) { Uj[e] = k; Uv[e] = c;   ++e; }
            else     { Lj[a] = P[k]; Lv[a] = c/d; ++a; }
        }
        Li[i+1] = a;
        Ui[i+1] = e;
    }
    for(j=Lj.length-1;j!==-1;--j) { Lj[j] = Pinv[Lj[j]]; }
    return {L:L, U:U, P:P, Pinv:Pinv};
}
numeric.ccsLUP = numeric.ccsLUP0;

numeric.ccsDim = function ccsDim(A) { return [numeric.sup(A[1])+1,A[0].length-1]; }
numeric.ccsGetBlock = function ccsGetBlock(A,i,j) {
    var s = numeric.ccsDim(A),m=s[0],n=s[1];
    if(typeof i === "undefined") { i = numeric.linspace(0,m-1); }
    else if(typeof i === "number") { i = [i]; }
    if(typeof j === "undefined") { j = numeric.linspace(0,n-1); }
    else if(typeof j === "number") { j = [j]; }
    var p,p0,p1,P = i.length,q,Q = j.length,r,jq,ip;
    var Bi = numeric.rep([n],0), Bj=[], Bv=[], B = [Bi,Bj,Bv];
    var Ai = A[0], Aj = A[1], Av = A[2];
    var x = numeric.rep([m],0),count=0,flags = numeric.rep([m],0);
    for(q=0;q<Q;++q) {
        jq = j[q];
        var q0 = Ai[jq];
        var q1 = Ai[jq+1];
        for(p=q0;p<q1;++p) {
            r = Aj[p];
            flags[r] = 1;
            x[r] = Av[p];
        }
        for(p=0;p<P;++p) {
            ip = i[p];
            if(flags[ip]) {
                Bj[count] = p;
                Bv[count] = x[i[p]];
                ++count;
            }
        }
        for(p=q0;p<q1;++p) {
            r = Aj[p];
            flags[r] = 0;
        }
        Bi[q+1] = count;
    }
    return B;
}

numeric.ccsDot = function ccsDot(A,B) {
    var Ai = A[0], Aj = A[1], Av = A[2];
    var Bi = B[0], Bj = B[1], Bv = B[2];
    var sA = numeric.ccsDim(A), sB = numeric.ccsDim(B);
    var m = sA[0], n = sA[1], o = sB[1];
    var x = numeric.rep([m],0), flags = numeric.rep([m],0), xj = Array(m);
    var Ci = numeric.rep([o],0), Cj = [], Cv = [], C = [Ci,Cj,Cv];
    var i,j,k,j0,j1,i0,i1,l,p,a,b;
    for(k=0;k!==o;++k) {
        j0 = Bi[k];
        j1 = Bi[k+1];
        p = 0;
        for(j=j0;j<j1;++j) {
            a = Bj[j];
            b = Bv[j];
            i0 = Ai[a];
            i1 = Ai[a+1];
            for(i=i0;i<i1;++i) {
                l = Aj[i];
                if(flags[l]===0) {
                    xj[p] = l;
                    flags[l] = 1;
                    p = p+1;
                }
                x[l] = x[l] + Av[i]*b;
            }
        }
        j0 = Ci[k];
        j1 = j0+p;
        Ci[k+1] = j1;
        for(j=p-1;j!==-1;--j) {
            b = j0+j;
            i = xj[j];
            Cj[b] = i;
            Cv[b] = x[i];
            flags[i] = 0;
            x[i] = 0;
        }
        Ci[k+1] = Ci[k]+p;
    }
    return C;
}

numeric.ccsLUPSolve = function ccsLUPSolve(LUP,B) {
    var L = LUP.L, U = LUP.U, P = LUP.P;
    var Bi = B[0];
    var flag = false;
    if(typeof Bi !== "object") { B = [[0,B.length],numeric.linspace(0,B.length-1),B]; Bi = B[0]; flag = true; }
    var Bj = B[1], Bv = B[2];
    var n = L[0].length-1, m = Bi.length-1;
    var x = numeric.rep([n],0), xj = Array(n);
    var b = numeric.rep([n],0), bj = Array(n);
    var Xi = numeric.rep([m+1],0), Xj = [], Xv = [];
    var sol = numeric.ccsTSolve;
    var i,j,j0,j1,k,J,N=0;
    for(i=0;i<m;++i) {
        k = 0;
        j0 = Bi[i];
        j1 = Bi[i+1];
        for(j=j0;j<j1;++j) { 
            J = LUP.Pinv[Bj[j]];
            bj[k] = J;
            b[J] = Bv[j];
            ++k;
        }
        bj.length = k;
        sol(L,b,x,bj,xj);
        for(j=bj.length-1;j!==-1;--j) b[bj[j]] = 0;
        sol(U,x,b,xj,bj);
        if(flag) return b;
        for(j=xj.length-1;j!==-1;--j) x[xj[j]] = 0;
        for(j=bj.length-1;j!==-1;--j) {
            J = bj[j];
            Xj[N] = J;
            Xv[N] = b[J];
            b[J] = 0;
            ++N;
        }
        Xi[i+1] = N;
    }
    return [Xi,Xj,Xv];
}

numeric.ccsbinop = function ccsbinop(body,setup) {
    if(typeof setup === "undefined") setup='';
    return Function('X','Y',
            'var Xi = X[0], Xj = X[1], Xv = X[2];\n'+
            'var Yi = Y[0], Yj = Y[1], Yv = Y[2];\n'+
            'var n = Xi.length-1,m = Math.max(numeric.sup(Xj),numeric.sup(Yj))+1;\n'+
            'var Zi = numeric.rep([n+1],0), Zj = [], Zv = [];\n'+
            'var x = numeric.rep([m],0),y = numeric.rep([m],0);\n'+
            'var xk,yk,zk;\n'+
            'var i,j,j0,j1,k,p=0;\n'+
            setup+
            'for(i=0;i<n;++i) {\n'+
            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
            '  for(j=j0;j!==j1;++j) {\n'+
            '    k = Xj[j];\n'+
            '    x[k] = 1;\n'+
            '    Zj[p] = k;\n'+
            '    ++p;\n'+
            '  }\n'+
            '  j0 = Yi[i]; j1 = Yi[i+1];\n'+
            '  for(j=j0;j!==j1;++j) {\n'+
            '    k = Yj[j];\n'+
            '    y[k] = Yv[j];\n'+
            '    if(x[k] === 0) {\n'+
            '      Zj[p] = k;\n'+
            '      ++p;\n'+
            '    }\n'+
            '  }\n'+
            '  Zi[i+1] = p;\n'+
            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
            '  for(j=j0;j!==j1;++j) x[Xj[j]] = Xv[j];\n'+
            '  j0 = Zi[i]; j1 = Zi[i+1];\n'+
            '  for(j=j0;j!==j1;++j) {\n'+
            '    k = Zj[j];\n'+
            '    xk = x[k];\n'+
            '    yk = y[k];\n'+
            body+'\n'+
            '    Zv[j] = zk;\n'+
            '  }\n'+
            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
            '  for(j=j0;j!==j1;++j) x[Xj[j]] = 0;\n'+
            '  j0 = Yi[i]; j1 = Yi[i+1];\n'+
            '  for(j=j0;j!==j1;++j) y[Yj[j]] = 0;\n'+
            '}\n'+
            'return [Zi,Zj,Zv];'
            );
};

(function() {
    var k,A,B,C;
    for(k in numeric.ops2) {
        if(isFinite(eval('1'+numeric.ops2[k]+'0'))) A = '[Y[0],Y[1],numeric.'+k+'(X,Y[2])]';
        else A = 'NaN';
        if(isFinite(eval('0'+numeric.ops2[k]+'1'))) B = '[X[0],X[1],numeric.'+k+'(X[2],Y)]';
        else B = 'NaN';
        if(isFinite(eval('1'+numeric.ops2[k]+'0')) && isFinite(eval('0'+numeric.ops2[k]+'1'))) C = 'numeric.ccs'+k+'MM(X,Y)';
        else C = 'NaN';
        numeric['ccs'+k+'MM'] = numeric.ccsbinop('zk = xk '+numeric.ops2[k]+'yk;');
        numeric['ccs'+k] = Function('X','Y',
                'if(typeof X === "number") return '+A+';\n'+
                'if(typeof Y === "number") return '+B+';\n'+
                'return '+C+';\n'
                );
    }
}());

numeric.ccsScatter = function ccsScatter(A) {
    var Ai = A[0], Aj = A[1], Av = A[2];
    var n = numeric.sup(Aj)+1,m=Ai.length;
    var Ri = numeric.rep([n],0),Rj=Array(m), Rv = Array(m);
    var counts = numeric.rep([n],0),i;
    for(i=0;i<m;++i) counts[Aj[i]]++;
    for(i=0;i<n;++i) Ri[i+1] = Ri[i] + counts[i];
    var ptr = Ri.slice(0),k,Aii;
    for(i=0;i<m;++i) {
        Aii = Aj[i];
        k = ptr[Aii];
        Rj[k] = Ai[i];
        Rv[k] = Av[i];
        ptr[Aii]=ptr[Aii]+1;
    }
    return [Ri,Rj,Rv];
}

numeric.ccsGather = function ccsGather(A) {
    var Ai = A[0], Aj = A[1], Av = A[2];
    var n = Ai.length-1,m = Aj.length;
    var Ri = Array(m), Rj = Array(m), Rv = Array(m);
    var i,j,j0,j1,p;
    p=0;
    for(i=0;i<n;++i) {
        j0 = Ai[i];
        j1 = Ai[i+1];
        for(j=j0;j!==j1;++j) {
            Rj[p] = i;
            Ri[p] = Aj[j];
            Rv[p] = Av[j];
            ++p;
        }
    }
    return [Ri,Rj,Rv];
}

// The following sparse linear algebra routines are deprecated.

numeric.sdim = function dim(A,ret,k) {
    if(typeof ret === "undefined") { ret = []; }
    if(typeof A !== "object") return ret;
    if(typeof k === "undefined") { k=0; }
    if(!(k in ret)) { ret[k] = 0; }
    if(A.length > ret[k]) ret[k] = A.length;
    var i;
    for(i in A) {
        if(A.hasOwnProperty(i)) dim(A[i],ret,k+1);
    }
    return ret;
};

numeric.sclone = function clone(A,k,n) {
    if(typeof k === "undefined") { k=0; }
    if(typeof n === "undefined") { n = numeric.sdim(A).length; }
    var i,ret = Array(A.length);
    if(k === n-1) {
        for(i in A) { if(A.hasOwnProperty(i)) ret[i] = A[i]; }
        return ret;
    }
    for(i in A) {
        if(A.hasOwnProperty(i)) ret[i] = clone(A[i],k+1,n);
    }
    return ret;
}

numeric.sdiag = function diag(d) {
    var n = d.length,i,ret = Array(n),i1,i2,i3;
    for(i=n-1;i>=1;i-=2) {
        i1 = i-1;
        ret[i] = []; ret[i][i] = d[i];
        ret[i1] = []; ret[i1][i1] = d[i1];
    }
    if(i===0) { ret[0] = []; ret[0][0] = d[i]; }
    return ret;
}

numeric.sidentity = function identity(n) { return numeric.sdiag(numeric.rep([n],1)); }

numeric.stranspose = function transpose(A) {
    var ret = [], n = A.length, i,j,Ai;
    for(i in A) {
        if(!(A.hasOwnProperty(i))) continue;
        Ai = A[i];
        for(j in Ai) {
            if(!(Ai.hasOwnProperty(j))) continue;
            if(typeof ret[j] !== "object") { ret[j] = []; }
            ret[j][i] = Ai[j];
        }
    }
    return ret;
}

numeric.sLUP = function LUP(A,tol) {
    throw new Error("The function numeric.sLUP had a bug in it and has been removed. Please use the new numeric.ccsLUP function instead.");
};

numeric.sdotMM = function dotMM(A,B) {
    var p = A.length, q = B.length, BT = numeric.stranspose(B), r = BT.length, Ai, BTk;
    var i,j,k,accum;
    var ret = Array(p),reti;
    for(i=p-1;i>=0;i--) {
        reti = [];
        Ai = A[i];
        for(k=r-1;k>=0;k--) {
            accum = 0;
            BTk = BT[k];
            for(j in Ai) {
                if(!(Ai.hasOwnProperty(j))) continue;
                if(j in BTk) { accum += Ai[j]*BTk[j]; }
            }
            if(accum) reti[k] = accum;
        }
        ret[i] = reti;
    }
    return ret;
}

numeric.sdotMV = function dotMV(A,x) {
    var p = A.length, Ai, i,j;
    var ret = Array(p), accum;
    for(i=p-1;i>=0;i--) {
        Ai = A[i];
        accum = 0;
        for(j in Ai) {
            if(!(Ai.hasOwnProperty(j))) continue;
            if(x[j]) accum += Ai[j]*x[j];
        }
        if(accum) ret[i] = accum;
    }
    return ret;
}

numeric.sdotVM = function dotMV(x,A) {
    var i,j,Ai,alpha;
    var ret = [], accum;
    for(i in x) {
        if(!x.hasOwnProperty(i)) continue;
        Ai = A[i];
        alpha = x[i];
        for(j in Ai) {
            if(!Ai.hasOwnProperty(j)) continue;
            if(!ret[j]) { ret[j] = 0; }
            ret[j] += alpha*Ai[j];
        }
    }
    return ret;
}

numeric.sdotVV = function dotVV(x,y) {
    var i,ret=0;
    for(i in x) { if(x[i] && y[i]) ret+= x[i]*y[i]; }
    return ret;
}

numeric.sdot = function dot(A,B) {
    var m = numeric.sdim(A).length, n = numeric.sdim(B).length;
    var k = m*1000+n;
    switch(k) {
    case 0: return A*B;
    case 1001: return numeric.sdotVV(A,B);
    case 2001: return numeric.sdotMV(A,B);
    case 1002: return numeric.sdotVM(A,B);
    case 2002: return numeric.sdotMM(A,B);
    default: throw new Error('numeric.sdot not implemented for tensors of order '+m+' and '+n);
    }
}

numeric.sscatter = function scatter(V) {
    var n = V[0].length, Vij, i, j, m = V.length, A = [], Aj;
    for(i=n-1;i>=0;--i) {
        if(!V[m-1][i]) continue;
        Aj = A;
        for(j=0;j<m-2;j++) {
            Vij = V[j][i];
            if(!Aj[Vij]) Aj[Vij] = [];
            Aj = Aj[Vij];
        }
        Aj[V[j][i]] = V[j+1][i];
    }
    return A;
}

numeric.sgather = function gather(A,ret,k) {
    if(typeof ret === "undefined") ret = [];
    if(typeof k === "undefined") k = [];
    var n,i,Ai;
    n = k.length;
    for(i in A) {
        if(A.hasOwnProperty(i)) {
            k[n] = parseInt(i);
            Ai = A[i];
            if(typeof Ai === "number") {
                if(Ai) {
                    if(ret.length === 0) {
                        for(i=n+1;i>=0;--i) ret[i] = [];
                    }
                    for(i=n;i>=0;--i) ret[i].push(k[i]);
                    ret[n+1].push(Ai);
                }
            } else gather(Ai,ret,k);
        }
    }
    if(k.length>n) k.pop();
    return ret;
}

// 6. Coordinate matrices
numeric.cLU = function LU(A) {
    var I = A[0], J = A[1], V = A[2];
    var p = I.length, m=0, i,j,k,a,b,c;
    for(i=0;i<p;i++) if(I[i]>m) m=I[i];
    m++;
    var L = Array(m), U = Array(m), left = numeric.rep([m],Infinity), right = numeric.rep([m],-Infinity);
    var Ui, Uj,alpha;
    for(k=0;k<p;k++) {
        i = I[k];
        j = J[k];
        if(j<left[i]) left[i] = j;
        if(j>right[i]) right[i] = j;
    }
    for(i=0;i<m-1;i++) { if(right[i] > right[i+1]) right[i+1] = right[i]; }
    for(i=m-1;i>=1;i--) { if(left[i]<left[i-1]) left[i-1] = left[i]; }
    var countL = 0, countU = 0;
    for(i=0;i<m;i++) {
        U[i] = numeric.rep([right[i]-left[i]+1],0);
        L[i] = numeric.rep([i-left[i]],0);
        countL += i-left[i]+1;
        countU += right[i]-i+1;
    }
    for(k=0;k<p;k++) { i = I[k]; U[i][J[k]-left[i]] = V[k]; }
    for(i=0;i<m-1;i++) {
        a = i-left[i];
        Ui = U[i];
        for(j=i+1;left[j]<=i && j<m;j++) {
            b = i-left[j];
            c = right[i]-i;
            Uj = U[j];
            alpha = Uj[b]/Ui[a];
            if(alpha) {
                for(k=1;k<=c;k++) { Uj[k+b] -= alpha*Ui[k+a]; }
                L[j][i-left[j]] = alpha;
            }
        }
    }
    var Ui = [], Uj = [], Uv = [], Li = [], Lj = [], Lv = [];
    var p,q,foo;
    p=0; q=0;
    for(i=0;i<m;i++) {
        a = left[i];
        b = right[i];
        foo = U[i];
        for(j=i;j<=b;j++) {
            if(foo[j-a]) {
                Ui[p] = i;
                Uj[p] = j;
                Uv[p] = foo[j-a];
                p++;
            }
        }
        foo = L[i];
        for(j=a;j<i;j++) {
            if(foo[j-a]) {
                Li[q] = i;
                Lj[q] = j;
                Lv[q] = foo[j-a];
                q++;
            }
        }
        Li[q] = i;
        Lj[q] = i;
        Lv[q] = 1;
        q++;
    }
    return {U:[Ui,Uj,Uv], L:[Li,Lj,Lv]};
};

numeric.cLUsolve = function LUsolve(lu,b) {
    var L = lu.L, U = lu.U, ret = numeric.clone(b);
    var Li = L[0], Lj = L[1], Lv = L[2];
    var Ui = U[0], Uj = U[1], Uv = U[2];
    var p = Ui.length, q = Li.length;
    var m = ret.length,i,j,k;
    k = 0;
    for(i=0;i<m;i++) {
        while(Lj[k] < i) {
            ret[i] -= Lv[k]*ret[Lj[k]];
            k++;
        }
        k++;
    }
    k = p-1;
    for(i=m-1;i>=0;i--) {
        while(Uj[k] > i) {
            ret[i] -= Uv[k]*ret[Uj[k]];
            k--;
        }
        ret[i] /= Uv[k];
        k--;
    }
    return ret;
};

numeric.cgrid = function grid(n,shape) {
    if(typeof n === "number") n = [n,n];
    var ret = numeric.rep(n,-1);
    var i,j,count;
    if(typeof shape !== "function") {
        switch(shape) {
        case 'L':
            shape = function(i,j) { return (i>=n[0]/2 || j<n[1]/2); }
            break;
        default:
            shape = function(i,j) { return true; };
            break;
        }
    }
    count=0;
    for(i=1;i<n[0]-1;i++) for(j=1;j<n[1]-1;j++) 
        if(shape(i,j)) {
            ret[i][j] = count;
            count++;
        }
    return ret;
}

numeric.cdelsq = function delsq(g) {
    var dir = [[-1,0],[0,-1],[0,1],[1,0]];
    var s = numeric.dim(g), m = s[0], n = s[1], i,j,k,p,q;
    var Li = [], Lj = [], Lv = [];
    for(i=1;i<m-1;i++) for(j=1;j<n-1;j++) {
        if(g[i][j]<0) continue;
        for(k=0;k<4;k++) {
            p = i+dir[k][0];
            q = j+dir[k][1];
            if(g[p][q]<0) continue;
            Li.push(g[i][j]);
            Lj.push(g[p][q]);
            Lv.push(-1);
        }
        Li.push(g[i][j]);
        Lj.push(g[i][j]);
        Lv.push(4);
    }
    return [Li,Lj,Lv];
}

numeric.cdotMV = function dotMV(A,x) {
    var ret, Ai = A[0], Aj = A[1], Av = A[2],k,p=Ai.length,N;
    N=0;
    for(k=0;k<p;k++) { if(Ai[k]>N) N = Ai[k]; }
    N++;
    ret = numeric.rep([N],0);
    for(k=0;k<p;k++) { ret[Ai[k]]+=Av[k]*x[Aj[k]]; }
    return ret;
}

// 7. Splines

numeric.Spline = function Spline(x,yl,yr,kl,kr) { this.x = x; this.yl = yl; this.yr = yr; this.kl = kl; this.kr = kr; }
numeric.Spline.prototype._at = function _at(x1,p) {
    var x = this.x;
    var yl = this.yl;
    var yr = this.yr;
    var kl = this.kl;
    var kr = this.kr;
    var x1,a,b,t;
    var add = numeric.add, sub = numeric.sub, mul = numeric.mul;
    a = sub(mul(kl[p],x[p+1]-x[p]),sub(yr[p+1],yl[p]));
    b = add(mul(kr[p+1],x[p]-x[p+1]),sub(yr[p+1],yl[p]));
    t = (x1-x[p])/(x[p+1]-x[p]);
    var s = t*(1-t);
    return add(add(add(mul(1-t,yl[p]),mul(t,yr[p+1])),mul(a,s*(1-t))),mul(b,s*t));
}
numeric.Spline.prototype.at = function at(x0) {
    if(typeof x0 === "number") {
        var x = this.x;
        var n = x.length;
        var p,q,mid,floor = Math.floor,a,b,t;
        p = 0;
        q = n-1;
        while(q-p>1) {
            mid = floor((p+q)/2);
            if(x[mid] <= x0) p = mid;
            else q = mid;
        }
        return this._at(x0,p);
    }
    var n = x0.length, i, ret = Array(n);
    for(i=n-1;i!==-1;--i) ret[i] = this.at(x0[i]);
    return ret;
}
numeric.Spline.prototype.diff = function diff() {
    var x = this.x;
    var yl = this.yl;
    var yr = this.yr;
    var kl = this.kl;
    var kr = this.kr;
    var n = yl.length;
    var i,dx,dy;
    var zl = kl, zr = kr, pl = Array(n), pr = Array(n);
    var add = numeric.add, mul = numeric.mul, div = numeric.div, sub = numeric.sub;
    for(i=n-1;i!==-1;--i) {
        dx = x[i+1]-x[i];
        dy = sub(yr[i+1],yl[i]);
        pl[i] = div(add(mul(dy, 6),mul(kl[i],-4*dx),mul(kr[i+1],-2*dx)),dx*dx);
        pr[i+1] = div(add(mul(dy,-6),mul(kl[i], 2*dx),mul(kr[i+1], 4*dx)),dx*dx);
    }
    return new numeric.Spline(x,zl,zr,pl,pr);
}
numeric.Spline.prototype.roots = function roots() {
    function sqr(x) { return x*x; }
    function heval(y0,y1,k0,k1,x) {
        var A = k0*2-(y1-y0);
        var B = -k1*2+(y1-y0);
        var t = (x+1)*0.5;
        var s = t*(1-t);
        return (1-t)*y0+t*y1+A*s*(1-t)+B*s*t;
    }
    var ret = [];
    var x = this.x, yl = this.yl, yr = this.yr, kl = this.kl, kr = this.kr;
    if(typeof yl[0] === "number") {
        yl = [yl];
        yr = [yr];
        kl = [kl];
        kr = [kr];
    }
    var m = yl.length,n=x.length-1,i,j,k,y,s,t;
    var ai,bi,ci,di, ret = Array(m),ri,k0,k1,y0,y1,A,B,D,dx,cx,stops,z0,z1,zm,t0,t1,tm;
    var sqrt = Math.sqrt;
    for(i=0;i!==m;++i) {
        ai = yl[i];
        bi = yr[i];
        ci = kl[i];
        di = kr[i];
        ri = [];
        for(j=0;j!==n;j++) {
            if(j>0 && bi[j]*ai[j]<0) ri.push(x[j]);
            dx = (x[j+1]-x[j]);
            cx = x[j];
            y0 = ai[j];
            y1 = bi[j+1];
            k0 = ci[j]/dx;
            k1 = di[j+1]/dx;
            D = sqr(k0-k1+3*(y0-y1)) + 12*k1*y0;
            A = k1+3*y0+2*k0-3*y1;
            B = 3*(k1+k0+2*(y0-y1));
            if(D<=0) {
                z0 = A/B;
                if(z0>x[j] && z0<x[j+1]) stops = [x[j],z0,x[j+1]];
                else stops = [x[j],x[j+1]];
            } else {
                z0 = (A-sqrt(D))/B;
                z1 = (A+sqrt(D))/B;
                stops = [x[j]];
                if(z0>x[j] && z0<x[j+1]) stops.push(z0);
                if(z1>x[j] && z1<x[j+1]) stops.push(z1);
                stops.push(x[j+1]);
            }
            t0 = stops[0];
            z0 = this._at(t0,j);
            for(k=0;k<stops.length-1;k++) {
                t1 = stops[k+1];
                z1 = this._at(t1,j);
                if(z0 === 0) {
                    ri.push(t0); 
                    t0 = t1;
                    z0 = z1;
                    continue;
                }
                if(z1 === 0 || z0*z1>0) {
                    t0 = t1;
                    z0 = z1;
                    continue;
                }
                var side = 0;
                while(1) {
                    tm = (z0*t1-z1*t0)/(z0-z1);
                    if(tm <= t0 || tm >= t1) { break; }
                    zm = this._at(tm,j);
                    if(zm*z1>0) {
                        t1 = tm;
                        z1 = zm;
                        if(side === -1) z0*=0.5;
                        side = -1;
                    } else if(zm*z0>0) {
                        t0 = tm;
                        z0 = zm;
                        if(side === 1) z1*=0.5;
                        side = 1;
                    } else break;
                }
                ri.push(tm);
                t0 = stops[k+1];
                z0 = this._at(t0, j);
            }
            if(z1 === 0) ri.push(t1);
        }
        ret[i] = ri;
    }
    if(typeof this.yl[0] === "number") return ret[0];
    return ret;
}
numeric.spline = function spline(x,y,k1,kn) {
    var n = x.length, b = [], dx = [], dy = [];
    var i;
    var sub = numeric.sub,mul = numeric.mul,add = numeric.add;
    for(i=n-2;i>=0;i--) { dx[i] = x[i+1]-x[i]; dy[i] = sub(y[i+1],y[i]); }
    if(typeof k1 === "string" || typeof kn === "string") { 
        k1 = kn = "periodic";
    }
    // Build sparse tridiagonal system
    var T = [[],[],[]];
    switch(typeof k1) {
    case "undefined":
        b[0] = mul(3/(dx[0]*dx[0]),dy[0]);
        T[0].push(0,0);
        T[1].push(0,1);
        T[2].push(2/dx[0],1/dx[0]);
        break;
    case "string":
        b[0] = add(mul(3/(dx[n-2]*dx[n-2]),dy[n-2]),mul(3/(dx[0]*dx[0]),dy[0]));
        T[0].push(0,0,0);
        T[1].push(n-2,0,1);
        T[2].push(1/dx[n-2],2/dx[n-2]+2/dx[0],1/dx[0]);
        break;
    default:
        b[0] = k1;
        T[0].push(0);
        T[1].push(0);
        T[2].push(1);
        break;
    }
    for(i=1;i<n-1;i++) {
        b[i] = add(mul(3/(dx[i-1]*dx[i-1]),dy[i-1]),mul(3/(dx[i]*dx[i]),dy[i]));
        T[0].push(i,i,i);
        T[1].push(i-1,i,i+1);
        T[2].push(1/dx[i-1],2/dx[i-1]+2/dx[i],1/dx[i]);
    }
    switch(typeof kn) {
    case "undefined":
        b[n-1] = mul(3/(dx[n-2]*dx[n-2]),dy[n-2]);
        T[0].push(n-1,n-1);
        T[1].push(n-2,n-1);
        T[2].push(1/dx[n-2],2/dx[n-2]);
        break;
    case "string":
        T[1][T[1].length-1] = 0;
        break;
    default:
        b[n-1] = kn;
        T[0].push(n-1);
        T[1].push(n-1);
        T[2].push(1);
        break;
    }
    if(typeof b[0] !== "number") b = numeric.transpose(b);
    else b = [b];
    var k = Array(b.length);
    if(typeof k1 === "string") {
        for(i=k.length-1;i!==-1;--i) {
            k[i] = numeric.ccsLUPSolve(numeric.ccsLUP(numeric.ccsScatter(T)),b[i]);
            k[i][n-1] = k[i][0];
        }
    } else {
        for(i=k.length-1;i!==-1;--i) {
            k[i] = numeric.cLUsolve(numeric.cLU(T),b[i]);
        }
    }
    if(typeof y[0] === "number") k = k[0];
    else k = numeric.transpose(k);
    return new numeric.Spline(x,y,y,k,k);
}

// 8. FFT
numeric.fftpow2 = function fftpow2(x,y) {
    var n = x.length;
    if(n === 1) return;
    var cos = Math.cos, sin = Math.sin, i,j;
    var xe = Array(n/2), ye = Array(n/2), xo = Array(n/2), yo = Array(n/2);
    j = n/2;
    for(i=n-1;i!==-1;--i) {
        --j;
        xo[j] = x[i];
        yo[j] = y[i];
        --i;
        xe[j] = x[i];
        ye[j] = y[i];
    }
    fftpow2(xe,ye);
    fftpow2(xo,yo);
    j = n/2;
    var t,k = (-6.2831853071795864769252867665590057683943387987502116419/n),ci,si;
    for(i=n-1;i!==-1;--i) {
        --j;
        if(j === -1) j = n/2-1;
        t = k*i;
        ci = cos(t);
        si = sin(t);
        x[i] = xe[j] + ci*xo[j] - si*yo[j];
        y[i] = ye[j] + ci*yo[j] + si*xo[j];
    }
}
numeric._ifftpow2 = function _ifftpow2(x,y) {
    var n = x.length;
    if(n === 1) return;
    var cos = Math.cos, sin = Math.sin, i,j;
    var xe = Array(n/2), ye = Array(n/2), xo = Array(n/2), yo = Array(n/2);
    j = n/2;
    for(i=n-1;i!==-1;--i) {
        --j;
        xo[j] = x[i];
        yo[j] = y[i];
        --i;
        xe[j] = x[i];
        ye[j] = y[i];
    }
    _ifftpow2(xe,ye);
    _ifftpow2(xo,yo);
    j = n/2;
    var t,k = (6.2831853071795864769252867665590057683943387987502116419/n),ci,si;
    for(i=n-1;i!==-1;--i) {
        --j;
        if(j === -1) j = n/2-1;
        t = k*i;
        ci = cos(t);
        si = sin(t);
        x[i] = xe[j] + ci*xo[j] - si*yo[j];
        y[i] = ye[j] + ci*yo[j] + si*xo[j];
    }
}
numeric.ifftpow2 = function ifftpow2(x,y) {
    numeric._ifftpow2(x,y);
    numeric.diveq(x,x.length);
    numeric.diveq(y,y.length);
}
numeric.convpow2 = function convpow2(ax,ay,bx,by) {
    numeric.fftpow2(ax,ay);
    numeric.fftpow2(bx,by);
    var i,n = ax.length,axi,bxi,ayi,byi;
    for(i=n-1;i!==-1;--i) {
        axi = ax[i]; ayi = ay[i]; bxi = bx[i]; byi = by[i];
        ax[i] = axi*bxi-ayi*byi;
        ay[i] = axi*byi+ayi*bxi;
    }
    numeric.ifftpow2(ax,ay);
}
numeric.T.prototype.fft = function fft() {
    var x = this.x, y = this.y;
    var n = x.length, log = Math.log, log2 = log(2),
        p = Math.ceil(log(2*n-1)/log2), m = Math.pow(2,p);
    var cx = numeric.rep([m],0), cy = numeric.rep([m],0), cos = Math.cos, sin = Math.sin;
    var k, c = (-3.141592653589793238462643383279502884197169399375105820/n),t;
    var a = numeric.rep([m],0), b = numeric.rep([m],0),nhalf = Math.floor(n/2);
    for(k=0;k<n;k++) a[k] = x[k];
    if(typeof y !== "undefined") for(k=0;k<n;k++) b[k] = y[k];
    cx[0] = 1;
    for(k=1;k<=m/2;k++) {
        t = c*k*k;
        cx[k] = cos(t);
        cy[k] = sin(t);
        cx[m-k] = cos(t);
        cy[m-k] = sin(t)
    }
    var X = new numeric.T(a,b), Y = new numeric.T(cx,cy);
    X = X.mul(Y);
    numeric.convpow2(X.x,X.y,numeric.clone(Y.x),numeric.neg(Y.y));
    X = X.mul(Y);
    X.x.length = n;
    X.y.length = n;
    return X;
}
numeric.T.prototype.ifft = function ifft() {
    var x = this.x, y = this.y;
    var n = x.length, log = Math.log, log2 = log(2),
        p = Math.ceil(log(2*n-1)/log2), m = Math.pow(2,p);
    var cx = numeric.rep([m],0), cy = numeric.rep([m],0), cos = Math.cos, sin = Math.sin;
    var k, c = (3.141592653589793238462643383279502884197169399375105820/n),t;
    var a = numeric.rep([m],0), b = numeric.rep([m],0),nhalf = Math.floor(n/2);
    for(k=0;k<n;k++) a[k] = x[k];
    if(typeof y !== "undefined") for(k=0;k<n;k++) b[k] = y[k];
    cx[0] = 1;
    for(k=1;k<=m/2;k++) {
        t = c*k*k;
        cx[k] = cos(t);
        cy[k] = sin(t);
        cx[m-k] = cos(t);
        cy[m-k] = sin(t)
    }
    var X = new numeric.T(a,b), Y = new numeric.T(cx,cy);
    X = X.mul(Y);
    numeric.convpow2(X.x,X.y,numeric.clone(Y.x),numeric.neg(Y.y));
    X = X.mul(Y);
    X.x.length = n;
    X.y.length = n;
    return X.div(n);
}

//9. Unconstrained optimization
numeric.gradient = function gradient(f,x) {
    var n = x.length;
    var f0 = f(x);
    if(isNaN(f0)) throw new Error('gradient: f(x) is a NaN!');
    var max = Math.max;
    var i,x0 = numeric.clone(x),f1,f2, J = Array(n);
    var div = numeric.div, sub = numeric.sub,errest,roundoff,max = Math.max,eps = 1e-3,abs = Math.abs, min = Math.min;
    var t0,t1,t2,it=0,d1,d2,N;
    for(i=0;i<n;i++) {
        var h = max(1e-6*f0,1e-8);
        while(1) {
            ++it;
            if(it>20) { throw new Error("Numerical gradient fails"); }
            x0[i] = x[i]+h;
            f1 = f(x0);
            x0[i] = x[i]-h;
            f2 = f(x0);
            x0[i] = x[i];
            if(isNaN(f1) || isNaN(f2)) { h/=16; continue; }
            J[i] = (f1-f2)/(2*h);
            t0 = x[i]-h;
            t1 = x[i];
            t2 = x[i]+h;
            d1 = (f1-f0)/h;
            d2 = (f0-f2)/h;
            N = max(abs(J[i]),abs(f0),abs(f1),abs(f2),abs(t0),abs(t1),abs(t2),1e-8);
            errest = min(max(abs(d1-J[i]),abs(d2-J[i]),abs(d1-d2))/N,h/N);
            if(errest>eps) { h/=16; }
            else break;
            }
    }
    return J;
}

numeric.uncmin = function uncmin(f,x0,tol,gradient,maxit,callback,options) {
    var grad = numeric.gradient;
    if(typeof options === "undefined") { options = {}; }
    if(typeof tol === "undefined") { tol = 1e-8; }
    if(typeof gradient === "undefined") { gradient = function(x) { return grad(f,x); }; }
    if(typeof maxit === "undefined") maxit = 1000;
    x0 = numeric.clone(x0);
    var n = x0.length;
    var f0 = f(x0),f1,df0;
    if(isNaN(f0)) throw new Error('uncmin: f(x0) is a NaN!');
    var max = Math.max, norm2 = numeric.norm2;
    tol = max(tol,numeric.epsilon);
    var step,g0,g1,H1 = options.Hinv || numeric.identity(n);
    var dot = numeric.dot, inv = numeric.inv, sub = numeric.sub, add = numeric.add, ten = numeric.tensor, div = numeric.div, mul = numeric.mul;
    var all = numeric.all, isfinite = numeric.isFinite, neg = numeric.neg;
    var it=0,i,s,x1,y,Hy,Hs,ys,i0,t,nstep,t1,t2;
    var msg = "";
    g0 = gradient(x0);
    while(it<maxit) {
        if(typeof callback === "function") { if(callback(it,x0,f0,g0,H1)) { msg = "Callback returned true"; break; } }
        if(!all(isfinite(g0))) { msg = "Gradient has Infinity or NaN"; break; }
        step = neg(dot(H1,g0));
        if(!all(isfinite(step))) { msg = "Search direction has Infinity or NaN"; break; }
        nstep = norm2(step);
        if(nstep < tol) { msg="Newton step smaller than tol"; break; }
        t = 1;
        df0 = dot(g0,step);
        // line search
        x1 = x0;
        while(it < maxit) {
            if(t*nstep < tol) { break; }
            s = mul(step,t);
            x1 = add(x0,s);
            f1 = f(x1);
            if(f1-f0 >= 0.1*t*df0 || isNaN(f1)) {
                t *= 0.5;
                ++it;
                continue;
            }
            break;
        }
        if(t*nstep < tol) { msg = "Line search step size smaller than tol"; break; }
        if(it === maxit) { msg = "maxit reached during line search"; break; }
        g1 = gradient(x1);
        y = sub(g1,g0);
        ys = dot(y,s);
        Hy = dot(H1,y);
        H1 = sub(add(H1,
                mul(
                        (ys+dot(y,Hy))/(ys*ys),
                        ten(s,s)    )),
                div(add(ten(Hy,s),ten(s,Hy)),ys));
        x0 = x1;
        f0 = f1;
        g0 = g1;
        ++it;
    }
    return {solution: x0, f: f0, gradient: g0, invHessian: H1, iterations:it, message: msg};
}

// 10. Ode solver (Dormand-Prince)
numeric.Dopri = function Dopri(x,y,f,ymid,iterations,msg,events) {
    this.x = x;
    this.y = y;
    this.f = f;
    this.ymid = ymid;
    this.iterations = iterations;
    this.events = events;
    this.message = msg;
}
numeric.Dopri.prototype._at = function _at(xi,j) {
    function sqr(x) { return x*x; }
    var sol = this;
    var xs = sol.x;
    var ys = sol.y;
    var k1 = sol.f;
    var ymid = sol.ymid;
    var n = xs.length;
    var x0,x1,xh,y0,y1,yh,xi;
    var floor = Math.floor,h;
    var c = 0.5;
    var add = numeric.add, mul = numeric.mul,sub = numeric.sub, p,q,w;
    x0 = xs[j];
    x1 = xs[j+1];
    y0 = ys[j];
    y1 = ys[j+1];
    h  = x1-x0;
    xh = x0+c*h;
    yh = ymid[j];
    p = sub(k1[j  ],mul(y0,1/(x0-xh)+2/(x0-x1)));
    q = sub(k1[j+1],mul(y1,1/(x1-xh)+2/(x1-x0)));
    w = [sqr(xi - x1) * (xi - xh) / sqr(x0 - x1) / (x0 - xh),
         sqr(xi - x0) * sqr(xi - x1) / sqr(x0 - xh) / sqr(x1 - xh),
         sqr(xi - x0) * (xi - xh) / sqr(x1 - x0) / (x1 - xh),
         (xi - x0) * sqr(xi - x1) * (xi - xh) / sqr(x0-x1) / (x0 - xh),
         (xi - x1) * sqr(xi - x0) * (xi - xh) / sqr(x0-x1) / (x1 - xh)];
    return add(add(add(add(mul(y0,w[0]),
                           mul(yh,w[1])),
                           mul(y1,w[2])),
                           mul( p,w[3])),
                           mul( q,w[4]));
}
numeric.Dopri.prototype.at = function at(x) {
    var i,j,k,floor = Math.floor;
    if(typeof x !== "number") {
        var n = x.length, ret = Array(n);
        for(i=n-1;i!==-1;--i) {
            ret[i] = this.at(x[i]);
        }
        return ret;
    }
    var x0 = this.x;
    i = 0; j = x0.length-1;
    while(j-i>1) {
        k = floor(0.5*(i+j));
        if(x0[k] <= x) i = k;
        else j = k;
    }
    return this._at(x,i);
}

numeric.dopri = function dopri(x0,x1,y0,f,tol,maxit,event) {
    if(typeof tol === "undefined") { tol = 1e-6; }
    if(typeof maxit === "undefined") { maxit = 1000; }
    var xs = [x0], ys = [y0], k1 = [f(x0,y0)], k2,k3,k4,k5,k6,k7, ymid = [];
    var A2 = 1/5;
    var A3 = [3/40,9/40];
    var A4 = [44/45,-56/15,32/9];
    var A5 = [19372/6561,-25360/2187,64448/6561,-212/729];
    var A6 = [9017/3168,-355/33,46732/5247,49/176,-5103/18656];
    var b = [35/384,0,500/1113,125/192,-2187/6784,11/84];
    var bm = [0.5*6025192743/30085553152,
              0,
              0.5*51252292925/65400821598,
              0.5*-2691868925/45128329728,
              0.5*187940372067/1594534317056,
              0.5*-1776094331/19743644256,
              0.5*11237099/235043384];
    var c = [1/5,3/10,4/5,8/9,1,1];
    var e = [-71/57600,0,71/16695,-71/1920,17253/339200,-22/525,1/40];
    var i = 0,er,j;
    var h = (x1-x0)/10;
    var it = 0;
    var add = numeric.add, mul = numeric.mul, y1,erinf;
    var max = Math.max, min = Math.min, abs = Math.abs, norminf = numeric.norminf,pow = Math.pow;
    var any = numeric.any, lt = numeric.lt, and = numeric.and, sub = numeric.sub;
    var e0, e1, ev;
    var ret = new numeric.Dopri(xs,ys,k1,ymid,-1,"");
    if(typeof event === "function") e0 = event(x0,y0);
    while(x0<x1 && it<maxit) {
        ++it;
        if(x0+h>x1) h = x1-x0;
        k2 = f(x0+c[0]*h,                add(y0,mul(   A2*h,k1[i])));
        k3 = f(x0+c[1]*h,            add(add(y0,mul(A3[0]*h,k1[i])),mul(A3[1]*h,k2)));
        k4 = f(x0+c[2]*h,        add(add(add(y0,mul(A4[0]*h,k1[i])),mul(A4[1]*h,k2)),mul(A4[2]*h,k3)));
        k5 = f(x0+c[3]*h,    add(add(add(add(y0,mul(A5[0]*h,k1[i])),mul(A5[1]*h,k2)),mul(A5[2]*h,k3)),mul(A5[3]*h,k4)));
        k6 = f(x0+c[4]*h,add(add(add(add(add(y0,mul(A6[0]*h,k1[i])),mul(A6[1]*h,k2)),mul(A6[2]*h,k3)),mul(A6[3]*h,k4)),mul(A6[4]*h,k5)));
        y1 = add(add(add(add(add(y0,mul(k1[i],h*b[0])),mul(k3,h*b[2])),mul(k4,h*b[3])),mul(k5,h*b[4])),mul(k6,h*b[5]));
        k7 = f(x0+h,y1);
        er = add(add(add(add(add(mul(k1[i],h*e[0]),mul(k3,h*e[2])),mul(k4,h*e[3])),mul(k5,h*e[4])),mul(k6,h*e[5])),mul(k7,h*e[6]));
        if(typeof er === "number") erinf = abs(er);
        else erinf = norminf(er);
        if(erinf > tol) { // reject
            h = 0.2*h*pow(tol/erinf,0.25);
            if(x0+h === x0) {
                ret.msg = "Step size became too small";
                break;
            }
            continue;
        }
        ymid[i] = add(add(add(add(add(add(y0,
                mul(k1[i],h*bm[0])),
                mul(k3   ,h*bm[2])),
                mul(k4   ,h*bm[3])),
                mul(k5   ,h*bm[4])),
                mul(k6   ,h*bm[5])),
                mul(k7   ,h*bm[6]));
        ++i;
        xs[i] = x0+h;
        ys[i] = y1;
        k1[i] = k7;
        if(typeof event === "function") {
            var yi,xl = x0,xr = x0+0.5*h,xi;
            e1 = event(xr,ymid[i-1]);
            ev = and(lt(e0,0),lt(0,e1));
            if(!any(ev)) { xl = xr; xr = x0+h; e0 = e1; e1 = event(xr,y1); ev = and(lt(e0,0),lt(0,e1)); }
            if(any(ev)) {
                var xc, yc, en,ei;
                var side=0, sl = 1.0, sr = 1.0;
                while(1) {
                    if(typeof e0 === "number") xi = (sr*e1*xl-sl*e0*xr)/(sr*e1-sl*e0);
                    else {
                        xi = xr;
                        for(j=e0.length-1;j!==-1;--j) {
                            if(e0[j]<0 && e1[j]>0) xi = min(xi,(sr*e1[j]*xl-sl*e0[j]*xr)/(sr*e1[j]-sl*e0[j]));
                        }
                    }
                    if(xi <= xl || xi >= xr) break;
                    yi = ret._at(xi, i-1);
                    ei = event(xi,yi);
                    en = and(lt(e0,0),lt(0,ei));
                    if(any(en)) {
                        xr = xi;
                        e1 = ei;
                        ev = en;
                        sr = 1.0;
                        if(side === -1) sl *= 0.5;
                        else sl = 1.0;
                        side = -1;
                    } else {
                        xl = xi;
                        e0 = ei;
                        sl = 1.0;
                        if(side === 1) sr *= 0.5;
                        else sr = 1.0;
                        side = 1;
                    }
                }
                y1 = ret._at(0.5*(x0+xi),i-1);
                ret.f[i] = f(xi,yi);
                ret.x[i] = xi;
                ret.y[i] = yi;
                ret.ymid[i-1] = y1;
                ret.events = ev;
                ret.iterations = it;
                return ret;
            }
        }
        x0 += h;
        y0 = y1;
        e0 = e1;
        h = min(0.8*h*pow(tol/erinf,0.25),4*h);
    }
    ret.iterations = it;
    return ret;
}

// 11. Ax = b
numeric.LU = function(A, fast) {
  fast = fast || false;

  var abs = Math.abs;
  var i, j, k, absAjk, Akk, Ak, Pk, Ai;
  var max;
  var n = A.length, n1 = n-1;
  var P = new Array(n);
  if(!fast) A = numeric.clone(A);

  for (k = 0; k < n; ++k) {
    Pk = k;
    Ak = A[k];
    max = abs(Ak[k]);
    for (j = k + 1; j < n; ++j) {
      absAjk = abs(A[j][k]);
      if (max < absAjk) {
        max = absAjk;
        Pk = j;
      }
    }
    P[k] = Pk;

    if (Pk != k) {
      A[k] = A[Pk];
      A[Pk] = Ak;
      Ak = A[k];
    }

    Akk = Ak[k];

    for (i = k + 1; i < n; ++i) {
      A[i][k] /= Akk;
    }

    for (i = k + 1; i < n; ++i) {
      Ai = A[i];
      for (j = k + 1; j < n1; ++j) {
        Ai[j] -= Ai[k] * Ak[j];
        ++j;
        Ai[j] -= Ai[k] * Ak[j];
      }
      if(j===n1) Ai[j] -= Ai[k] * Ak[j];
    }
  }

  return {
    LU: A,
    P:  P
  };
}

numeric.LUsolve = function LUsolve(LUP, b) {
  var i, j;
  var LU = LUP.LU;
  var n   = LU.length;
  var x = numeric.clone(b);
  var P   = LUP.P;
  var Pi, LUi, LUii, tmp;

  for (i=n-1;i!==-1;--i) x[i] = b[i];
  for (i = 0; i < n; ++i) {
    Pi = P[i];
    if (P[i] !== i) {
      tmp = x[i];
      x[i] = x[Pi];
      x[Pi] = tmp;
    }

    LUi = LU[i];
    for (j = 0; j < i; ++j) {
      x[i] -= x[j] * LUi[j];
    }
  }

  for (i = n - 1; i >= 0; --i) {
    LUi = LU[i];
    for (j = i + 1; j < n; ++j) {
      x[i] -= x[j] * LUi[j];
    }

    x[i] /= LUi[i];
  }

  return x;
}

numeric.solve = function solve(A,b,fast) { return numeric.LUsolve(numeric.LU(A,fast), b); }

// 12. Linear programming
numeric.echelonize = function echelonize(A) {
    var s = numeric.dim(A), m = s[0], n = s[1];
    var I = numeric.identity(m);
    var P = Array(m);
    var i,j,k,l,Ai,Ii,Z,a;
    var abs = Math.abs;
    var diveq = numeric.diveq;
    A = numeric.clone(A);
    for(i=0;i<m;++i) {
        k = 0;
        Ai = A[i];
        Ii = I[i];
        for(j=1;j<n;++j) if(abs(Ai[k])<abs(Ai[j])) k=j;
        P[i] = k;
        diveq(Ii,Ai[k]);
        diveq(Ai,Ai[k]);
        for(j=0;j<m;++j) if(j!==i) {
            Z = A[j]; a = Z[k];
            for(l=n-1;l!==-1;--l) Z[l] -= Ai[l]*a;
            Z = I[j];
            for(l=m-1;l!==-1;--l) Z[l] -= Ii[l]*a;
        }
    }
    return {I:I, A:A, P:P};
}

numeric.__solveLP = function __solveLP(c,A,b,tol,maxit,x,flag) {
    var sum = numeric.sum, log = numeric.log, mul = numeric.mul, sub = numeric.sub, dot = numeric.dot, div = numeric.div, add = numeric.add;
    var m = c.length, n = b.length,y;
    var unbounded = false, cb,i0=0;
    var alpha = 1.0;
    var f0,df0,AT = numeric.transpose(A), svd = numeric.svd,transpose = numeric.transpose,leq = numeric.leq, sqrt = Math.sqrt, abs = Math.abs;
    var muleq = numeric.muleq;
    var norm = numeric.norminf, any = numeric.any,min = Math.min;
    var all = numeric.all, gt = numeric.gt;
    var p = Array(m), A0 = Array(n),e=numeric.rep([n],1), H;
    var solve = numeric.solve, z = sub(b,dot(A,x)),count;
    var dotcc = dot(c,c);
    var g;
    for(count=i0;count<maxit;++count) {
        var i,j,d;
        for(i=n-1;i!==-1;--i) A0[i] = div(A[i],z[i]);
        var A1 = transpose(A0);
        for(i=m-1;i!==-1;--i) p[i] = (/*x[i]+*/sum(A1[i]));
        alpha = 0.25*abs(dotcc/dot(c,p));
        var a1 = 100*sqrt(dotcc/dot(p,p));
        if(!isFinite(alpha) || alpha>a1) alpha = a1;
        g = add(c,mul(alpha,p));
        H = dot(A1,A0);
        for(i=m-1;i!==-1;--i) H[i][i] += 1;
        d = solve(H,div(g,alpha),true);
        var t0 = div(z,dot(A,d));
        var t = 1.0;
        for(i=n-1;i!==-1;--i) if(t0[i]<0) t = min(t,-0.999*t0[i]);
        y = sub(x,mul(d,t));
        z = sub(b,dot(A,y));
        if(!all(gt(z,0))) return { solution: x, message: "", iterations: count };
        x = y;
        if(alpha<tol) return { solution: y, message: "", iterations: count };
        if(flag) {
            var s = dot(c,g), Ag = dot(A,g);
            unbounded = true;
            for(i=n-1;i!==-1;--i) if(s*Ag[i]<0) { unbounded = false; break; }
        } else {
            if(x[m-1]>=0) unbounded = false;
            else unbounded = true;
        }
        if(unbounded) return { solution: y, message: "Unbounded", iterations: count };
    }
    return { solution: x, message: "maximum iteration count exceeded", iterations:count };
}

numeric._solveLP = function _solveLP(c,A,b,tol,maxit) {
    var m = c.length, n = b.length,y;
    var sum = numeric.sum, log = numeric.log, mul = numeric.mul, sub = numeric.sub, dot = numeric.dot, div = numeric.div, add = numeric.add;
    var c0 = numeric.rep([m],0).concat([1]);
    var J = numeric.rep([n,1],-1);
    var A0 = numeric.blockMatrix([[A                   ,   J  ]]);
    var b0 = b;
    var y = numeric.rep([m],0).concat(Math.max(0,numeric.sup(numeric.neg(b)))+1);
    var x0 = numeric.__solveLP(c0,A0,b0,tol,maxit,y,false);
    var x = numeric.clone(x0.solution);
    x.length = m;
    var foo = numeric.inf(sub(b,dot(A,x)));
    if(foo<0) { return { solution: NaN, message: "Infeasible", iterations: x0.iterations }; }
    var ret = numeric.__solveLP(c, A, b, tol, maxit-x0.iterations, x, true);
    ret.iterations += x0.iterations;
    return ret;
};

numeric.solveLP = function solveLP(c,A,b,Aeq,beq,tol,maxit) {
    if(typeof maxit === "undefined") maxit = 1000;
    if(typeof tol === "undefined") tol = numeric.epsilon;
    if(typeof Aeq === "undefined") return numeric._solveLP(c,A,b,tol,maxit);
    var m = Aeq.length, n = Aeq[0].length, o = A.length;
    var B = numeric.echelonize(Aeq);
    var flags = numeric.rep([n],0);
    var P = B.P;
    var Q = [];
    var i;
    for(i=P.length-1;i!==-1;--i) flags[P[i]] = 1;
    for(i=n-1;i!==-1;--i) if(flags[i]===0) Q.push(i);
    var g = numeric.getRange;
    var I = numeric.linspace(0,m-1), J = numeric.linspace(0,o-1);
    var Aeq2 = g(Aeq,I,Q), A1 = g(A,J,P), A2 = g(A,J,Q), dot = numeric.dot, sub = numeric.sub;
    var A3 = dot(A1,B.I);
    var A4 = sub(A2,dot(A3,Aeq2)), b4 = sub(b,dot(A3,beq));
    var c1 = Array(P.length), c2 = Array(Q.length);
    for(i=P.length-1;i!==-1;--i) c1[i] = c[P[i]];
    for(i=Q.length-1;i!==-1;--i) c2[i] = c[Q[i]];
    var c4 = sub(c2,dot(c1,dot(B.I,Aeq2)));
    var S = numeric._solveLP(c4,A4,b4,tol,maxit);
    var x2 = S.solution;
    if(x2!==x2) return S;
    var x1 = dot(B.I,sub(beq,dot(Aeq2,x2)));
    var x = Array(c.length);
    for(i=P.length-1;i!==-1;--i) x[P[i]] = x1[i];
    for(i=Q.length-1;i!==-1;--i) x[Q[i]] = x2[i];
    return { solution: x, message:S.message, iterations: S.iterations };
}

numeric.MPStoLP = function MPStoLP(MPS) {
    if(MPS instanceof String) { MPS.split('\n'); }
    var state = 0;
    var states = ['Initial state','NAME','ROWS','COLUMNS','RHS','BOUNDS','ENDATA'];
    var n = MPS.length;
    var i,j,z,N=0,rows = {}, sign = [], rl = 0, vars = {}, nv = 0;
    var name;
    var c = [], A = [], b = [];
    function err(e) { throw new Error('MPStoLP: '+e+'\nLine '+i+': '+MPS[i]+'\nCurrent state: '+states[state]+'\n'); }
    for(i=0;i<n;++i) {
        z = MPS[i];
        var w0 = z.match(/\S*/g);
        var w = [];
        for(j=0;j<w0.length;++j) if(w0[j]!=="") w.push(w0[j]);
        if(w.length === 0) continue;
        for(j=0;j<states.length;++j) if(z.substr(0,states[j].length) === states[j]) break;
        if(j<states.length) {
            state = j;
            if(j===1) { name = w[1]; }
            if(j===6) return { name:name, c:c, A:numeric.transpose(A), b:b, rows:rows, vars:vars };
            continue;
        }
        switch(state) {
        case 0: case 1: err('Unexpected line');
        case 2: 
            switch(w[0]) {
            case 'N': if(N===0) N = w[1]; else err('Two or more N rows'); break;
            case 'L': rows[w[1]] = rl; sign[rl] = 1; b[rl] = 0; ++rl; break;
            case 'G': rows[w[1]] = rl; sign[rl] = -1;b[rl] = 0; ++rl; break;
            case 'E': rows[w[1]] = rl; sign[rl] = 0;b[rl] = 0; ++rl; break;
            default: err('Parse error '+numeric.prettyPrint(w));
            }
            break;
        case 3:
            if(!vars.hasOwnProperty(w[0])) { vars[w[0]] = nv; c[nv] = 0; A[nv] = numeric.rep([rl],0); ++nv; }
            var p = vars[w[0]];
            for(j=1;j<w.length;j+=2) {
                if(w[j] === N) { c[p] = parseFloat(w[j+1]); continue; }
                var q = rows[w[j]];
                A[p][q] = (sign[q]<0?-1:1)*parseFloat(w[j+1]);
            }
            break;
        case 4:
            for(j=1;j<w.length;j+=2) b[rows[w[j]]] = (sign[rows[w[j]]]<0?-1:1)*parseFloat(w[j+1]);
            break;
        case 5: /*FIXME*/ break;
        case 6: err('Internal error');
        }
    }
    err('Reached end of file without ENDATA');
}
// seedrandom.js version 2.0.
// Author: David Bau 4/2/2011
//
// Defines a method Math.seedrandom() that, when called, substitutes
// an explicitly seeded RC4-based algorithm for Math.random().  Also
// supports automatic seeding from local or network sources of entropy.
//
// Usage:
//
//   <script src=http://davidbau.com/encode/seedrandom-min.js></script>
//
//   Math.seedrandom('yipee'); Sets Math.random to a function that is
//                             initialized using the given explicit seed.
//
//   Math.seedrandom();        Sets Math.random to a function that is
//                             seeded using the current time, dom state,
//                             and other accumulated local entropy.
//                             The generated seed string is returned.
//
//   Math.seedrandom('yowza', true);
//                             Seeds using the given explicit seed mixed
//                             together with accumulated entropy.
//
//   <script src="http://bit.ly/srandom-512"></script>
//                             Seeds using physical random bits downloaded
//                             from random.org.
//
//   <script src="https://jsonlib.appspot.com/urandom?callback=Math.seedrandom">
//   </script>                 Seeds using urandom bits from call.jsonlib.com,
//                             which is faster than random.org.
//
// Examples:
//
//   Math.seedrandom("hello");            // Use "hello" as the seed.
//   document.write(Math.random());       // Always 0.5463663768140734
//   document.write(Math.random());       // Always 0.43973793770592234
//   var rng1 = Math.random;              // Remember the current prng.
//
//   var autoseed = Math.seedrandom();    // New prng with an automatic seed.
//   document.write(Math.random());       // Pretty much unpredictable.
//
//   Math.random = rng1;                  // Continue "hello" prng sequence.
//   document.write(Math.random());       // Always 0.554769432473455
//
//   Math.seedrandom(autoseed);           // Restart at the previous seed.
//   document.write(Math.random());       // Repeat the 'unpredictable' value.
//
// Notes:
//
// Each time seedrandom('arg') is called, entropy from the passed seed
// is accumulated in a pool to help generate future seeds for the
// zero-argument form of Math.seedrandom, so entropy can be injected over
// time by calling seedrandom with explicit data repeatedly.
//
// On speed - This javascript implementation of Math.random() is about
// 3-10x slower than the built-in Math.random() because it is not native
// code, but this is typically fast enough anyway.  Seeding is more expensive,
// especially if you use auto-seeding.  Some details (timings on Chrome 4):
//
// Our Math.random()            - avg less than 0.002 milliseconds per call
// seedrandom('explicit')       - avg less than 0.5 milliseconds per call
// seedrandom('explicit', true) - avg less than 2 milliseconds per call
// seedrandom()                 - avg about 38 milliseconds per call
//
// LICENSE (BSD):
//
// Copyright 2010 David Bau, all rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
// 
//   1. Redistributions of source code must retain the above copyright
//      notice, this list of conditions and the following disclaimer.
//
//   2. Redistributions in binary form must reproduce the above copyright
//      notice, this list of conditions and the following disclaimer in the
//      documentation and/or other materials provided with the distribution.
// 
//   3. Neither the name of this module nor the names of its contributors may
//      be used to endorse or promote products derived from this software
//      without specific prior written permission.
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
/**
 * All code is in an anonymous closure to keep the global namespace clean.
 *
 * @param {number=} overflow 
 * @param {number=} startdenom
 */

// Patched by Seb so that seedrandom.js does not pollute the Math object.
// My tests suggest that doing Math.trouble = 1 makes Math lookups about 5%
// slower.
numeric.seedrandom = { pow:Math.pow, random:Math.random };

(function (pool, math, width, chunks, significance, overflow, startdenom) {


//
// seedrandom()
// This is the seedrandom function described above.
//
math['seedrandom'] = function seedrandom(seed, use_entropy) {
  var key = [];
  var arc4;

  // Flatten the seed string or build one from local entropy if needed.
  seed = mixkey(flatten(
    use_entropy ? [seed, pool] :
    arguments.length ? seed :
    [new Date().getTime(), pool, window], 3), key);

  // Use the seed to initialize an ARC4 generator.
  arc4 = new ARC4(key);

  // Mix the randomness into accumulated entropy.
  mixkey(arc4.S, pool);

  // Override Math.random

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.

  math['random'] = function random() {  // Closure to return a random double:
    var n = arc4.g(chunks);             // Start with a numerator n < 2 ^ 48
    var d = startdenom;                 //   and denominator d = 2 ^ 48.
    var x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  // Return the seed that was used
  return seed;
};

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
/** @constructor */
function ARC4(key) {
  var t, u, me = this, keylen = key.length;
  var i = 0, j = me.i = me.j = me.m = 0;
  me.S = [];
  me.c = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) { me.S[i] = i++; }
  for (i = 0; i < width; i++) {
    t = me.S[i];
    j = lowbits(j + t + key[i % keylen]);
    u = me.S[j];
    me.S[i] = u;
    me.S[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  me.g = function getnext(count) {
    var s = me.S;
    var i = lowbits(me.i + 1); var t = s[i];
    var j = lowbits(me.j + t); var u = s[j];
    s[i] = u;
    s[j] = t;
    var r = s[lowbits(t + u)];
    while (--count) {
      i = lowbits(i + 1); t = s[i];
      j = lowbits(j + t); u = s[j];
      s[i] = u;
      s[j] = t;
      r = r * width + s[lowbits(t + u)];
    }
    me.i = i;
    me.j = j;
    return r;
  };
  // For robust unpredictability discard an initial batch of values.
  // See http://www.rsa.com/rsalabs/node.asp?id=2009
  me.g(width);
}

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
/** @param {Object=} result 
  * @param {string=} prop
  * @param {string=} typ */
function flatten(obj, depth, result, prop, typ) {
  result = [];
  typ = typeof(obj);
  if (depth && typ == 'object') {
    for (prop in obj) {
      if (prop.indexOf('S') < 5) {    // Avoid FF3 bug (local/sessionStorage)
        try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
      }
    }
  }
  return (result.length ? result : obj + (typ != 'string' ? '\0' : ''));
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
/** @param {number=} smear 
  * @param {number=} j */
function mixkey(seed, key, smear, j) {
  seed += '';                         // Ensure the seed is a string
  smear = 0;
  for (j = 0; j < seed.length; j++) {
    key[lowbits(j)] =
      lowbits((smear ^= key[lowbits(j)] * 19) + seed.charCodeAt(j));
  }
  seed = '';
  for (j in key) { seed += String.fromCharCode(key[j]); }
  return seed;
}

//
// lowbits()
// A quick "n mod width" for width a power of 2.
//
function lowbits(n) { return n & (width - 1); }

//
// The following constants are related to IEEE 754 limits.
//
startdenom = math.pow(width, chunks);
significance = math.pow(2, significance);
overflow = significance * 2;

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to intefere with determinstic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

// End anonymous scope, and pass initial values.
}(
  [],   // pool: entropy pool starts empty
  numeric.seedrandom, // math: package containing random, pow, and seedrandom
  256,  // width: each RC4 output is 0 <= x < 256
  6,    // chunks: at least six RC4 outputs for each double
  52    // significance: there are 52 significant digits in a double
  ));
/* This file is a slightly modified version of quadprog.js from Alberto Santini.
 * It has been slightly modified by SÃ©bastien Loisel to make sure that it handles
 * 0-based Arrays instead of 1-based Arrays.
 * License is in resources/LICENSE.quadprog */
(function(exports) {

function base0to1(A) {
    if(typeof A !== "object") { return A; }
    var ret = [], i,n=A.length;
    for(i=0;i<n;i++) ret[i+1] = base0to1(A[i]);
    return ret;
}
function base1to0(A) {
    if(typeof A !== "object") { return A; }
    var ret = [], i,n=A.length;
    for(i=1;i<n;i++) ret[i-1] = base1to0(A[i]);
    return ret;
}

function dpori(a, lda, n) {
    var i, j, k, kp1, t;

    for (k = 1; k <= n; k = k + 1) {
        a[k][k] = 1 / a[k][k];
        t = -a[k][k];
        //~ dscal(k - 1, t, a[1][k], 1);
        for (i = 1; i < k; i = i + 1) {
            a[i][k] = t * a[i][k];
        }

        kp1 = k + 1;
        if (n < kp1) {
            break;
        }
        for (j = kp1; j <= n; j = j + 1) {
            t = a[k][j];
            a[k][j] = 0;
            //~ daxpy(k, t, a[1][k], 1, a[1][j], 1);
            for (i = 1; i <= k; i = i + 1) {
                a[i][j] = a[i][j] + (t * a[i][k]);
            }
        }
    }

}

function dposl(a, lda, n, b) {
    var i, k, kb, t;

    for (k = 1; k <= n; k = k + 1) {
        //~ t = ddot(k - 1, a[1][k], 1, b[1], 1);
        t = 0;
        for (i = 1; i < k; i = i + 1) {
            t = t + (a[i][k] * b[i]);
        }

        b[k] = (b[k] - t) / a[k][k];
    }

    for (kb = 1; kb <= n; kb = kb + 1) {
        k = n + 1 - kb;
        b[k] = b[k] / a[k][k];
        t = -b[k];
        //~ daxpy(k - 1, t, a[1][k], 1, b[1], 1);
        for (i = 1; i < k; i = i + 1) {
            b[i] = b[i] + (t * a[i][k]);
        }
    }
}

function dpofa(a, lda, n, info) {
    var i, j, jm1, k, t, s;

    for (j = 1; j <= n; j = j + 1) {
        info[1] = j;
        s = 0;
        jm1 = j - 1;
        if (jm1 < 1) {
            s = a[j][j] - s;
            if (s <= 0) {
                break;
            }
            a[j][j] = Math.sqrt(s);
        } else {
            for (k = 1; k <= jm1; k = k + 1) {
                //~ t = a[k][j] - ddot(k - 1, a[1][k], 1, a[1][j], 1);
                t = a[k][j];
                for (i = 1; i < k; i = i + 1) {
                    t = t - (a[i][j] * a[i][k]);
                }
                t = t / a[k][k];
                a[k][j] = t;
                s = s + t * t;
            }
            s = a[j][j] - s;
            if (s <= 0) {
                break;
            }
            a[j][j] = Math.sqrt(s);
        }
        info[1] = 0;
    }
}

function qpgen2(dmat, dvec, fddmat, n, sol, crval, amat,
    bvec, fdamat, q, meq, iact, nact, iter, work, ierr) {

    var i, j, l, l1, info, it1, iwzv, iwrv, iwrm, iwsv, iwuv, nvl, r, iwnbv,
        temp, sum, t1, tt, gc, gs, nu,
        t1inf, t2min,
        vsmall, tmpa, tmpb,
        go;

    r = Math.min(n, q);
    l = 2 * n + (r * (r + 5)) / 2 + 2 * q + 1;

    vsmall = 1.0e-60;
    do {
        vsmall = vsmall + vsmall;
        tmpa = 1 + 0.1 * vsmall;
        tmpb = 1 + 0.2 * vsmall;
    } while (tmpa <= 1 || tmpb <= 1);

    for (i = 1; i <= n; i = i + 1) {
        work[i] = dvec[i];
    }
    for (i = n + 1; i <= l; i = i + 1) {
        work[i] = 0;
    }
    for (i = 1; i <= q; i = i + 1) {
        iact[i] = 0;
    }

    info = [];

    if (ierr[1] === 0) {
        dpofa(dmat, fddmat, n, info);
        if (info[1] !== 0) {
            ierr[1] = 2;
            return;
        }
        dposl(dmat, fddmat, n, dvec);
        dpori(dmat, fddmat, n);
    } else {
        for (j = 1; j <= n; j = j + 1) {
            sol[j] = 0;
            for (i = 1; i <= j; i = i + 1) {
                sol[j] = sol[j] + dmat[i][j] * dvec[i];
            }
        }
        for (j = 1; j <= n; j = j + 1) {
            dvec[j] = 0;
            for (i = j; i <= n; i = i + 1) {
                dvec[j] = dvec[j] + dmat[j][i] * sol[i];
            }
        }
    }

    crval[1] = 0;
    for (j = 1; j <= n; j = j + 1) {
        sol[j] = dvec[j];
        crval[1] = crval[1] + work[j] * sol[j];
        work[j] = 0;
        for (i = j + 1; i <= n; i = i + 1) {
            dmat[i][j] = 0;
        }
    }
    crval[1] = -crval[1] / 2;
    ierr[1] = 0;

    iwzv = n;
    iwrv = iwzv + n;
    iwuv = iwrv + r;
    iwrm = iwuv + r + 1;
    iwsv = iwrm + (r * (r + 1)) / 2;
    iwnbv = iwsv + q;

    for (i = 1; i <= q; i = i + 1) {
        sum = 0;
        for (j = 1; j <= n; j = j + 1) {
            sum = sum + amat[j][i] * amat[j][i];
        }
        work[iwnbv + i] = Math.sqrt(sum);
    }
    nact = 0;
    iter[1] = 0;
    iter[2] = 0;

    function fn_goto_50() {
        iter[1] = iter[1] + 1;

        l = iwsv;
        for (i = 1; i <= q; i = i + 1) {
            l = l + 1;
            sum = -bvec[i];
            for (j = 1; j <= n; j = j + 1) {
                sum = sum + amat[j][i] * sol[j];
            }
            if (Math.abs(sum) < vsmall) {
                sum = 0;
            }
            if (i > meq) {
                work[l] = sum;
            } else {
                work[l] = -Math.abs(sum);
                if (sum > 0) {
                    for (j = 1; j <= n; j = j + 1) {
                        amat[j][i] = -amat[j][i];
                    }
                    bvec[i] = -bvec[i];
                }
            }
        }

        for (i = 1; i <= nact; i = i + 1) {
            work[iwsv + iact[i]] = 0;
        }

        nvl = 0;
        temp = 0;
        for (i = 1; i <= q; i = i + 1) {
            if (work[iwsv + i] < temp * work[iwnbv + i]) {
                nvl = i;
                temp = work[iwsv + i] / work[iwnbv + i];
            }
        }
        if (nvl === 0) {
            return 999;
        }

        return 0;
    }

    function fn_goto_55() {
        for (i = 1; i <= n; i = i + 1) {
            sum = 0;
            for (j = 1; j <= n; j = j + 1) {
                sum = sum + dmat[j][i] * amat[j][nvl];
            }
            work[i] = sum;
        }

        l1 = iwzv;
        for (i = 1; i <= n; i = i + 1) {
            work[l1 + i] = 0;
        }
        for (j = nact + 1; j <= n; j = j + 1) {
            for (i = 1; i <= n; i = i + 1) {
                work[l1 + i] = work[l1 + i] + dmat[i][j] * work[j];
            }
        }

        t1inf = true;
        for (i = nact; i >= 1; i = i - 1) {
            sum = work[i];
            l = iwrm + (i * (i + 3)) / 2;
            l1 = l - i;
            for (j = i + 1; j <= nact; j = j + 1) {
                sum = sum - work[l] * work[iwrv + j];
                l = l + j;
            }
            sum = sum / work[l1];
            work[iwrv + i] = sum;
            if (iact[i] < meq) {
                // continue;
                break;
            }
            if (sum < 0) {
                // continue;
                break;
            }
            t1inf = false;
            it1 = i;
        }

        if (!t1inf) {
            t1 = work[iwuv + it1] / work[iwrv + it1];
            for (i = 1; i <= nact; i = i + 1) {
                if (iact[i] < meq) {
                    // continue;
                    break;
                }
                if (work[iwrv + i] < 0) {
                    // continue;
                    break;
                }
                temp = work[iwuv + i] / work[iwrv + i];
                if (temp < t1) {
                    t1 = temp;
                    it1 = i;
                }
            }
        }

        sum = 0;
        for (i = iwzv + 1; i <= iwzv + n; i = i + 1) {
            sum = sum + work[i] * work[i];
        }
        if (Math.abs(sum) <= vsmall) {
            if (t1inf) {
                ierr[1] = 1;
                // GOTO 999
                return 999;
            } else {
                for (i = 1; i <= nact; i = i + 1) {
                    work[iwuv + i] = work[iwuv + i] - t1 * work[iwrv + i];
                }
                work[iwuv + nact + 1] = work[iwuv + nact + 1] + t1;
                // GOTO 700
                return 700;
            }
        } else {
            sum = 0;
            for (i = 1; i <= n; i = i + 1) {
                sum = sum + work[iwzv + i] * amat[i][nvl];
            }
            tt = -work[iwsv + nvl] / sum;
            t2min = true;
            if (!t1inf) {
                if (t1 < tt) {
                    tt = t1;
                    t2min = false;
                }
            }

            for (i = 1; i <= n; i = i + 1) {
                sol[i] = sol[i] + tt * work[iwzv + i];
                if (Math.abs(sol[i]) < vsmall) {
                    sol[i] = 0;
                }
            }

            crval[1] = crval[1] + tt * sum * (tt / 2 + work[iwuv + nact + 1]);
            for (i = 1; i <= nact; i = i + 1) {
                work[iwuv + i] = work[iwuv + i] - tt * work[iwrv + i];
            }
            work[iwuv + nact + 1] = work[iwuv + nact + 1] + tt;

            if (t2min) {
                nact = nact + 1;
                iact[nact] = nvl;

                l = iwrm + ((nact - 1) * nact) / 2 + 1;
                for (i = 1; i <= nact - 1; i = i + 1) {
                    work[l] = work[i];
                    l = l + 1;
                }

                if (nact === n) {
                    work[l] = work[n];
                } else {
                    for (i = n; i >= nact + 1; i = i - 1) {
                        if (work[i] === 0) {
                            // continue;
                            break;
                        }
                        gc = Math.max(Math.abs(work[i - 1]), Math.abs(work[i]));
                        gs = Math.min(Math.abs(work[i - 1]), Math.abs(work[i]));
                        if (work[i - 1] >= 0) {
                            temp = Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
                        } else {
                            temp = -Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
                        }
                        gc = work[i - 1] / temp;
                        gs = work[i] / temp;

                        if (gc === 1) {
                            // continue;
                            break;
                        }
                        if (gc === 0) {
                            work[i - 1] = gs * temp;
                            for (j = 1; j <= n; j = j + 1) {
                                temp = dmat[j][i - 1];
                                dmat[j][i - 1] = dmat[j][i];
                                dmat[j][i] = temp;
                            }
                        } else {
                            work[i - 1] = temp;
                            nu = gs / (1 + gc);
                            for (j = 1; j <= n; j = j + 1) {
                                temp = gc * dmat[j][i - 1] + gs * dmat[j][i];
                                dmat[j][i] = nu * (dmat[j][i - 1] + temp) - dmat[j][i];
                                dmat[j][i - 1] = temp;

                            }
                        }
                    }
                    work[l] = work[nact];
                }
            } else {
                sum = -bvec[nvl];
                for (j = 1; j <= n; j = j + 1) {
                    sum = sum + sol[j] * amat[j][nvl];
                }
                if (nvl > meq) {
                    work[iwsv + nvl] = sum;
                } else {
                    work[iwsv + nvl] = -Math.abs(sum);
                    if (sum > 0) {
                        for (j = 1; j <= n; j = j + 1) {
                            amat[j][nvl] = -amat[j][nvl];
                        }
                        bvec[nvl] = -bvec[nvl];
                    }
                }
                // GOTO 700
                return 700;
            }
        }

        return 0;
    }

    function fn_goto_797() {
        l = iwrm + (it1 * (it1 + 1)) / 2 + 1;
        l1 = l + it1;
        if (work[l1] === 0) {
            // GOTO 798
            return 798;
        }
        gc = Math.max(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
        gs = Math.min(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
        if (work[l1 - 1] >= 0) {
            temp = Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
        } else {
            temp = -Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
        }
        gc = work[l1 - 1] / temp;
        gs = work[l1] / temp;

        if (gc === 1) {
            // GOTO 798
            return 798;
        }
        if (gc === 0) {
            for (i = it1 + 1; i <= nact; i = i + 1) {
                temp = work[l1 - 1];
                work[l1 - 1] = work[l1];
                work[l1] = temp;
                l1 = l1 + i;
            }
            for (i = 1; i <= n; i = i + 1) {
                temp = dmat[i][it1];
                dmat[i][it1] = dmat[i][it1 + 1];
                dmat[i][it1 + 1] = temp;
            }
        } else {
            nu = gs / (1 + gc);
            for (i = it1 + 1; i <= nact; i = i + 1) {
                temp = gc * work[l1 - 1] + gs * work[l1];
                work[l1] = nu * (work[l1 - 1] + temp) - work[l1];
                work[l1 - 1] = temp;
                l1 = l1 + i;
            }
            for (i = 1; i <= n; i = i + 1) {
                temp = gc * dmat[i][it1] + gs * dmat[i][it1 + 1];
                dmat[i][it1 + 1] = nu * (dmat[i][it1] + temp) - dmat[i][it1 + 1];
                dmat[i][it1] = temp;
            }
        }

        return 0;
    }

    function fn_goto_798() {
        l1 = l - it1;
        for (i = 1; i <= it1; i = i + 1) {
            work[l1] = work[l];
            l = l + 1;
            l1 = l1 + 1;
        }

        work[iwuv + it1] = work[iwuv + it1 + 1];
        iact[it1] = iact[it1 + 1];
        it1 = it1 + 1;
        if (it1 < nact) {
            // GOTO 797
            return 797;
        }

        return 0;
    }

    function fn_goto_799() {
        work[iwuv + nact] = work[iwuv + nact + 1];
        work[iwuv + nact + 1] = 0;
        iact[nact] = 0;
        nact = nact - 1;
        iter[2] = iter[2] + 1;

        return 0;
    }

    go = 0;
    while (true) {
        go = fn_goto_50();
        if (go === 999) {
            return;
        }
        while (true) {
            go = fn_goto_55();
            if (go === 0) {
                break;
            }
            if (go === 999) {
                return;
            }
            if (go === 700) {
                if (it1 === nact) {
                    fn_goto_799();
                } else {
                    while (true) {
                        fn_goto_797();
                        go = fn_goto_798();
                        if (go !== 797) {
                            break;
                        }
                    }
                    fn_goto_799();
                }
            }
        }
    }

}

function solveQP(Dmat, dvec, Amat, bvec, meq, factorized) {
    Dmat = base0to1(Dmat);
    dvec = base0to1(dvec);
    Amat = base0to1(Amat);
    var i, n, q,
        nact, r,
        crval = [], iact = [], sol = [], work = [], iter = [],
        message;

    meq = meq || 0;
    factorized = factorized ? base0to1(factorized) : [undefined, 0];
    bvec = bvec ? base0to1(bvec) : [];

    // In Fortran the array index starts from 1
    n = Dmat.length - 1;
    q = Amat[1].length - 1;

    if (!bvec) {
        for (i = 1; i <= q; i = i + 1) {
            bvec[i] = 0;
        }
    }
    for (i = 1; i <= q; i = i + 1) {
        iact[i] = 0;
    }
    nact = 0;
    r = Math.min(n, q);
    for (i = 1; i <= n; i = i + 1) {
        sol[i] = 0;
    }
    crval[1] = 0;
    for (i = 1; i <= (2 * n + (r * (r + 5)) / 2 + 2 * q + 1); i = i + 1) {
        work[i] = 0;
    }
    for (i = 1; i <= 2; i = i + 1) {
        iter[i] = 0;
    }

    qpgen2(Dmat, dvec, n, n, sol, crval, Amat,
        bvec, n, q, meq, iact, nact, iter, work, factorized);

    message = "";
    if (factorized[1] === 1) {
        message = "constraints are inconsistent, no solution!";
    }
    if (factorized[1] === 2) {
        message = "matrix D in quadratic function is not positive definite!";
    }

    return {
        solution: base1to0(sol),
        value: base1to0(crval),
        unconstrained_solution: base1to0(dvec),
        iterations: base1to0(iter),
        iact: base1to0(iact),
        message: message
    };
}
exports.solveQP = solveQP;
}(numeric));
/*
Shanti Rao sent me this routine by private email. I had to modify it
slightly to work on Arrays instead of using a Matrix object.
It is apparently translated from http://stitchpanorama.sourceforge.net/Python/svd.py
*/

numeric.svd= function svd(A) {
    var temp;
//Compute the thin SVD from G. H. Golub and C. Reinsch, Numer. Math. 14, 403-420 (1970)
	var prec= numeric.epsilon; //Math.pow(2,-52) // assumes double prec
	var tolerance= 1.e-64/prec;
	var itmax= 50;
	var c=0;
	var i=0;
	var j=0;
	var k=0;
	var l=0;
	
	var u= numeric.clone(A);
	var m= u.length;
	
	var n= u[0].length;
	
	if (m < n) throw "Need more rows than columns"
	
	var e = new Array(n);
	var q = new Array(n);
	for (i=0; i<n; i++) e[i] = q[i] = 0.0;
	var v = numeric.rep([n,n],0);
//	v.zero();
	
 	function pythag(a,b)
 	{
		a = Math.abs(a)
		b = Math.abs(b)
		if (a > b)
			return a*Math.sqrt(1.0+(b*b/a/a))
		else if (b == 0.0) 
			return a
		return b*Math.sqrt(1.0+(a*a/b/b))
	}

	//Householder's reduction to bidiagonal form

	var f= 0.0;
	var g= 0.0;
	var h= 0.0;
	var x= 0.0;
	var y= 0.0;
	var z= 0.0;
	var s= 0.0;
	
	for (i=0; i < n; i++)
	{	
		e[i]= g;
		s= 0.0;
		l= i+1;
		for (j=i; j < m; j++) 
			s += (u[j][i]*u[j][i]);
		if (s <= tolerance)
			g= 0.0;
		else
		{	
			f= u[i][i];
			g= Math.sqrt(s);
			if (f >= 0.0) g= -g;
			h= f*g-s
			u[i][i]=f-g;
			for (j=l; j < n; j++)
			{
				s= 0.0
				for (k=i; k < m; k++) 
					s += u[k][i]*u[k][j]
				f= s/h
				for (k=i; k < m; k++) 
					u[k][j]+=f*u[k][i]
			}
		}
		q[i]= g
		s= 0.0
		for (j=l; j < n; j++) 
			s= s + u[i][j]*u[i][j]
		if (s <= tolerance)
			g= 0.0
		else
		{	
			f= u[i][i+1]
			g= Math.sqrt(s)
			if (f >= 0.0) g= -g
			h= f*g - s
			u[i][i+1] = f-g;
			for (j=l; j < n; j++) e[j]= u[i][j]/h
			for (j=l; j < m; j++)
			{	
				s=0.0
				for (k=l; k < n; k++) 
					s += (u[j][k]*u[i][k])
				for (k=l; k < n; k++) 
					u[j][k]+=s*e[k]
			}	
		}
		y= Math.abs(q[i])+Math.abs(e[i])
		if (y>x) 
			x=y
	}
	
	// accumulation of right hand gtransformations
	for (i=n-1; i != -1; i+= -1)
	{	
		if (g != 0.0)
		{
		 	h= g*u[i][i+1]
			for (j=l; j < n; j++) 
				v[j][i]=u[i][j]/h
			for (j=l; j < n; j++)
			{	
				s=0.0
				for (k=l; k < n; k++) 
					s += u[i][k]*v[k][j]
				for (k=l; k < n; k++) 
					v[k][j]+=(s*v[k][i])
			}	
		}
		for (j=l; j < n; j++)
		{
			v[i][j] = 0;
			v[j][i] = 0;
		}
		v[i][i] = 1;
		g= e[i]
		l= i
	}
	
	// accumulation of left hand transformations
	for (i=n-1; i != -1; i+= -1)
	{	
		l= i+1
		g= q[i]
		for (j=l; j < n; j++) 
			u[i][j] = 0;
		if (g != 0.0)
		{
			h= u[i][i]*g
			for (j=l; j < n; j++)
			{
				s=0.0
				for (k=l; k < m; k++) s += u[k][i]*u[k][j];
				f= s/h
				for (k=i; k < m; k++) u[k][j]+=f*u[k][i];
			}
			for (j=i; j < m; j++) u[j][i] = u[j][i]/g;
		}
		else
			for (j=i; j < m; j++) u[j][i] = 0;
		u[i][i] += 1;
	}
	
	// diagonalization of the bidiagonal form
	prec= prec*x
	for (k=n-1; k != -1; k+= -1)
	{
		for (var iteration=0; iteration < itmax; iteration++)
		{	// test f splitting
			var test_convergence = false
			for (l=k; l != -1; l+= -1)
			{	
				if (Math.abs(e[l]) <= prec)
				{	test_convergence= true
					break 
				}
				if (Math.abs(q[l-1]) <= prec)
					break 
			}
			if (!test_convergence)
			{	// cancellation of e[l] if l>0
				c= 0.0
				s= 1.0
				var l1= l-1
				for (i =l; i<k+1; i++)
				{	
					f= s*e[i]
					e[i]= c*e[i]
					if (Math.abs(f) <= prec)
						break
					g= q[i]
					h= pythag(f,g)
					q[i]= h
					c= g/h
					s= -f/h
					for (j=0; j < m; j++)
					{	
						y= u[j][l1]
						z= u[j][i]
						u[j][l1] =  y*c+(z*s)
						u[j][i] = -y*s+(z*c)
					} 
				}	
			}
			// test f convergence
			z= q[k]
			if (l== k)
			{	//convergence
				if (z<0.0)
				{	//q[k] is made non-negative
					q[k]= -z
					for (j=0; j < n; j++)
						v[j][k] = -v[j][k]
				}
				break  //break out of iteration loop and move on to next k value
			}
			if (iteration >= itmax-1)
				throw 'Error: no convergence.'
			// shift from bottom 2x2 minor
			x= q[l]
			y= q[k-1]
			g= e[k-1]
			h= e[k]
			f= ((y-z)*(y+z)+(g-h)*(g+h))/(2.0*h*y)
			g= pythag(f,1.0)
			if (f < 0.0)
				f= ((x-z)*(x+z)+h*(y/(f-g)-h))/x
			else
				f= ((x-z)*(x+z)+h*(y/(f+g)-h))/x
			// next QR transformation
			c= 1.0
			s= 1.0
			for (i=l+1; i< k+1; i++)
			{	
				g= e[i]
				y= q[i]
				h= s*g
				g= c*g
				z= pythag(f,h)
				e[i-1]= z
				c= f/z
				s= h/z
				f= x*c+g*s
				g= -x*s+g*c
				h= y*s
				y= y*c
				for (j=0; j < n; j++)
				{	
					x= v[j][i-1]
					z= v[j][i]
					v[j][i-1] = x*c+z*s
					v[j][i] = -x*s+z*c
				}
				z= pythag(f,h)
				q[i-1]= z
				c= f/z
				s= h/z
				f= c*g+s*y
				x= -s*g+c*y
				for (j=0; j < m; j++)
				{
					y= u[j][i-1]
					z= u[j][i]
					u[j][i-1] = y*c+z*s
					u[j][i] = -y*s+z*c
				}
			}
			e[l]= 0.0
			e[k]= f
			q[k]= x
		} 
	}
		
	//vt= transpose(v)
	//return (u,q,vt)
	for (i=0;i<q.length; i++) 
	  if (q[i] < prec) q[i] = 0
	  
	//sort eigenvalues	
	for (i=0; i< n; i++)
	{	 
	//writeln(q)
	 for (j=i-1; j >= 0; j--)
	 {
	  if (q[j] < q[i])
	  {
	//  writeln(i,'-',j)
	   c = q[j]
	   q[j] = q[i]
	   q[i] = c
	   for(k=0;k<u.length;k++) { temp = u[k][i]; u[k][i] = u[k][j]; u[k][j] = temp; }
	   for(k=0;k<v.length;k++) { temp = v[k][i]; v[k][i] = v[k][j]; v[k][j] = temp; }
//	   u.swapCols(i,j)
//	   v.swapCols(i,j)
	   i = j	   
	  }
	 }	
	}
	
	return {U:u,S:q,V:v}
};

var jsfeat=jsfeat||{REVISION:"ALPHA"};(function(r){var o=1.192092896e-7;var l=1e-37;var m=256,i=512,h=1024,x=2048,w=4096;var A=1,n=2,b=3,p=4;var z=new Int32Array([-1,1,4,-1,4,-1,-1,-1,8,-1,-1,-1,-1,-1,-1,-1,8]);var y=(function(){return function(B){return(B&65280)}})();var k=(function(){return function(B){return(B&255)}})();var c=(function(){return function(B){return z[(B&65280)>>8]}})();var a=0;var f=1;var e=2;var u=3;var d=1;var s=1;var g=2;var v=(function(){function B(D,C){this.size=((D+7)|0)&-8;if(typeof C==="undefined"){this.buffer=new ArrayBuffer(this.size)}else{this.buffer=C;this.size=C.length}this.u8=new Uint8Array(this.buffer);this.i32=new Int32Array(this.buffer);this.f32=new Float32Array(this.buffer);this.f64=new Float64Array(this.buffer)}return B})();var q=(function(){function B(F,D,E,C){this.type=y(E)|0;this.channel=k(E)|0;this.cols=F|0;this.rows=D|0;if(typeof C==="undefined"){this.allocate()}else{this.buffer=C;this.data=this.type&m?this.buffer.u8:(this.type&i?this.buffer.i32:(this.type&h?this.buffer.f32:this.buffer.f64))}}B.prototype.allocate=function(){delete this.data;delete this.buffer;this.buffer=new v((this.cols*c(this.type)*this.channel)*this.rows);this.data=this.type&m?this.buffer.u8:(this.type&i?this.buffer.i32:(this.type&h?this.buffer.f32:this.buffer.f64))};B.prototype.copy_to=function(D){var C=D.data,G=this.data;var E=0,F=(this.cols*this.rows*this.channel)|0;for(;E<F-4;E+=4){C[E]=G[E];C[E+1]=G[E+1];C[E+2]=G[E+2];C[E+3]=G[E+3]}for(;E<F;++E){C[E]=G[E]}};B.prototype.resize=function(F,D,C){if(typeof C==="undefined"){C=this.channel}var E=(F*c(this.type)*C)*D;if(E>this.buffer.size){this.cols=F;this.rows=D;this.channel=C;this.allocate()}else{this.cols=F;this.rows=D;this.channel=C}};return B})();var t=(function(){function B(C){this.levels=C|0;this.data=new Array(C);this.pyrdown=jsfeat.imgproc.pyrdown}B.prototype.allocate=function(C,E,F){var D=this.levels;while(--D>=0){this.data[D]=new q(C>>D,E>>D,F)}};B.prototype.build=function(F,E){if(typeof E==="undefined"){E=true}var H=2,D=F,C=this.data[0];if(!E){var G=F.cols*F.rows;while(--G>=0){C.data[G]=F.data[G]}}C=this.data[1];this.pyrdown(D,C);for(;H<this.levels;++H){D=C;C=this.data[H];this.pyrdown(D,C)}};return B})();var j=(function(){function B(C,G,E,F,D){if(typeof C==="undefined"){C=0}if(typeof G==="undefined"){G=0}if(typeof E==="undefined"){E=0}if(typeof F==="undefined"){F=0}if(typeof D==="undefined"){D=-1}this.x=C;this.y=G;this.score=E;this.level=F;this.angle=D}return B})();r.U8_t=m;r.S32_t=i;r.F32_t=h;r.S64_t=x;r.F64_t=w;r.C1_t=A;r.C2_t=n;r.C3_t=b;r.C4_t=p;r.U8C1_t=m|A;r.U8C3_t=m|b;r.U8C4_t=m|p;r.F32C1_t=h|A;r.F32C2_t=h|n;r.S32C1_t=i|A;r.S32C2_t=i|n;r.EPSILON=o;r.FLT_MIN=l;r.COLOR_RGBA2GRAY=a;r.COLOR_RGB2GRAY=f;r.COLOR_BGRA2GRAY=e;r.COLOR_BGR2GRAY=u;r.BOX_BLUR_NOSCALE=d;r.SVD_U_T=s;r.SVD_V_T=g;r.get_data_type=y;r.get_channel=k;r.get_data_type_size=c;r.data_t=v;r.matrix_t=q;r.pyramid_t=t;r.keypoint_t=j})(jsfeat);(function(b){var a=(function(){var f=(function(){function g(h){this.next=null;this.data=new jsfeat.data_t(h);this.size=this.data.size;this.buffer=this.data.buffer;this.u8=this.data.u8;this.i32=this.data.i32;this.f32=this.data.f32;this.f64=this.data.f64}g.prototype.resize=function(h){delete this.data;this.data=new jsfeat.data_t(h);this.size=this.data.size;this.buffer=this.data.buffer;this.u8=this.data.u8;this.i32=this.data.i32;this.f32=this.data.f32;this.f64=this.data.f64};return g})();var e,c;var d=0;return{allocate:function(g,k){e=c=new f(k);for(var h=0;h<g;++h){var j=new f(k);c=c.next=j;d++}},get_buffer:function(g){var h=e;e=e.next;d--;if(g>h.size){h.resize(g)}return h},put_buffer:function(g){c=c.next=g;d++}}})();b.cache=a;a.allocate(30,640*4)})(jsfeat);(function(b){var a=(function(){var c=new Int32Array(48*2);return{get_gaussian_kernel:function(p,m,e,l){var f=0,j=0,o=0,n=0,d=0;var g=0;var h=jsfeat.cache.get_buffer(p<<2);var k=h.f32;if((p&1)==1&&p<=7&&m<=0){switch(p>>1){case 0:k[0]=1;g=1;break;case 1:k[0]=0.25,k[1]=0.5,k[2]=0.25;g=0.25+0.5+0.25;break;case 2:k[0]=0.0625,k[1]=0.25,k[2]=0.375,k[3]=0.25,k[4]=0.0625;g=0.0625+0.25+0.375+0.25+0.0625;break;case 3:k[0]=0.03125,k[1]=0.109375,k[2]=0.21875,k[3]=0.28125,k[4]=0.21875,k[5]=0.109375,k[6]=0.03125;g=0.03125+0.109375+0.21875+0.28125+0.21875+0.109375+0.03125;break}}else{n=m>0?m:((p-1)*0.5-1)*0.3+0.8;d=-0.5/(n*n);for(;f<p;++f){j=f-(p-1)*0.5;o=Math.exp(d*j*j);k[f]=o;g+=o}}if(l&jsfeat.U8_t){g=256/g;for(f=0;f<p;++f){e[f]=(k[f]*g+0.5)|0}}else{g=1/g;for(f=0;f<p;++f){e[f]=k[f]*g}}jsfeat.cache.put_buffer(h)},perspective_4point_transform:function(x,B,r,w,g,A,q,v,f,z,p,u,e,y,o,t,d){var Y=B;var X=z;var W=q;var V=Y*X*W;var U=o;var T=Y*U;var S=X*T;var R=p;var n=Y*R;var m=A;var k=r;var j=y;var i=k*j;var h=i*m;var ax=j*m*R;var aw=j*W;var aq=j*R;var ao=X*W;var am=U*X;var aj=U*m;var ag=R*m;var Q=1/(aw-aq-ao+am-aj+ag);var O=Y*j;var N=k*m;var M=W*Y;var L=U*M;var K=k*X;var I=i*R;var G=k*R*m;var D=W*U*X;var C=U*k;var av=-(S-V+n*m-m*T-i*X+h-ax+aw*X)*Q;var au=(V-S-O*W+O*R+h-X*N+aj*X-ax)*Q;var ar=Y;var ap=(-R*T+L+K*W-i*W+I-G+aj*R-D)*Q;var an=(-L+M*R-C*X+I-G+C*m+D-aw*R)*Q;var al=k;var ai=(-n+M+K-N+aq-aw-am+aj)*Q;var af=(-T+n+i-K+aj-ag-aw+ao)*Q;Y=w;X=u;W=f;V=Y*X*W;U=d;T=Y*U;S=X*T;R=e;n=Y*R;m=v;k=g;j=t;i=k*j;h=i*m;ax=j*m*R;aw=j*W;aq=j*R;ao=X*W;am=U*X;aj=U*m;ag=R*m;Q=1/(aw-aq-ao+am-aj+ag);O=Y*j;N=k*m;M=W*Y;L=U*M;K=k*X;I=i*R;G=k*R*m;D=W*U*X;C=U*k;var ak=-(S-V+n*m-m*T-i*X+h-ax+aw*X)*Q;var ah=(V-S-O*W+O*R+h-X*N+aj*X-ax)*Q;var ae=Y;var ad=(-R*T+L+K*W-i*W+I-G+aj*R-D)*Q;var ac=(-L+M*R-C*X+I-G+C*m+D-aw*R)*Q;var ab=k;var aa=(-n+M+K-N+aq-aw-am+aj)*Q;var Z=(-T+n+i-K+aj-ag-aw+ao)*Q;X=an-af*al;W=av*an;V=av*al;T=ap*au;S=ar*ap;n=au*ai;var l=ar*ai;j=1/(W-V*af-T+S*af+n*al-l*an);h=-ap+al*ai;var at=-ap*af+an*ai;ag=-au+ar*af;var P=av-l;N=av*af-n;M=-au*al+ar*an;var J=V-S;var H=W-T;G=X*j;var F=ag*j;var E=M*j;var s=x.data;s[0]=ak*G+ah*(h*j)-ae*(at*j);s[1]=ak*F+ah*(P*j)-ae*(N*j);s[2]=-ak*E-ah*(J*j)+ae*(H*j);s[3]=ad*G+ac*(h*j)-ab*(at*j);s[4]=ad*F+ac*(P*j)-ab*(N*j);s[5]=-ad*E-ac*(J*j)+ab*(H*j);s[6]=aa*G+Z*(h*j)-at*j;s[7]=aa*F+Z*(P*j)-N*j;s[8]=-aa*E-Z*(J*j)+H*j},qsort:function(o,J,s,u){var D=7;var v,r,q,p;var C=0,j=0,G=0,B=0,z=0,A=0,e=0,y=0,E=0;var x=0,w=0,h=0,g=0,l=0,I=0,H=0,F=0,f=0;var k=c;if((s-J+1)<=1){return}k[0]=J;k[1]=s;while(C>=0){j=k[C<<1];G=k[(C<<1)+1];C--;for(;;){z=(G-j)+1;if(z<=D){for(e=j+1;e<=G;e++){for(y=e;y>j&&u(o[y],o[y-1]);y--){v=o[y];o[y]=o[y-1];o[y-1]=v}}break}else{f=0;x=j;h=G;l=j+(z>>1);if(z>40){E=z>>3;I=j,H=j+E,F=j+(E<<1);r=o[I],q=o[H],p=o[F];j=u(r,q)?(u(q,p)?H:(u(r,p)?F:I)):(u(p,q)?H:(u(r,p)?I:F));I=l-E,H=l,F=l+E;r=o[I],q=o[H],p=o[F];l=u(r,q)?(u(q,p)?H:(u(r,p)?F:I)):(u(p,q)?H:(u(r,p)?I:F));I=G-(E<<1),H=G-E,F=G;r=o[I],q=o[H],p=o[F];G=u(r,q)?(u(q,p)?H:(u(r,p)?F:I)):(u(p,q)?H:(u(r,p)?I:F))}I=j,H=l,F=G;r=o[I],q=o[H],p=o[F];l=u(r,q)?(u(q,p)?H:(u(r,p)?F:I)):(u(p,q)?H:(u(r,p)?I:F));if(l!=x){v=o[l];o[l]=o[x];o[x]=v;l=x}j=w=x+1;G=g=h;r=o[l];for(;;){while(j<=G&&!u(r,o[j])){if(!u(o[j],r)){if(j>w){v=o[w];o[w]=o[j];o[j]=v}f=1;w++}j++}while(j<=G&&!u(o[G],r)){if(!u(r,o[G])){if(G<g){v=o[g];o[g]=o[G];o[G]=v}f=1;g--}G--}if(j>G){break}v=o[j];o[j]=o[G];o[G]=v;f=1;j++;G--}if(f==0){j=x,G=h;for(e=j+1;e<=G;e++){for(y=e;y>j&&u(o[y],o[y-1]);y--){v=o[y];o[y]=o[y-1];o[y-1]=v}}break}z=Math.min((w-x),(j-w));A=(j-z)|0;for(B=0;B<z;++B,++A){v=o[x+B];o[x+B]=o[A];o[A]=v}z=Math.min((h-g),(g-G));A=(h-z+1)|0;for(B=0;B<z;++B,++A){v=o[j+B];o[j+B]=o[A];o[A]=v}z=(j-w);A=(g-G);if(z>1){if(A>1){if(z>A){++C;k[C<<1]=x;k[(C<<1)+1]=x+z-1;j=h-A+1,G=h}else{++C;k[C<<1]=h-A+1;k[(C<<1)+1]=h;j=x,G=x+z-1}}else{j=x,G=x+z-1}}else{if(A>1){j=h-A+1,G=h}else{break}}}}}},median:function(k,d,i){var e;var f=0,j=0,g=0,h=(d+i)>>1;for(;;){if(i<=d){return k[h]}if(i==(d+1)){if(k[d]>k[i]){e=k[d];k[d]=k[i];k[i]=e}return k[h]}f=((d+i)>>1);if(k[f]>k[i]){e=k[f];k[f]=k[i];k[i]=e}if(k[d]>k[i]){e=k[d];k[d]=k[i];k[i]=e}if(k[f]>k[d]){e=k[f];k[f]=k[d];k[d]=e}j=(d+1);e=k[f];k[f]=k[j];k[j]=e;g=i;for(;;){do{++j}while(k[d]>k[j]);do{--g}while(k[g]>k[d]);if(g<j){break}e=k[j];k[j]=k[g];k[g]=e}e=k[d];k[d]=k[g];k[g]=e;if(g<=h){d=j}else{if(g>=h){i=(g-1)}}}return 0}}})();b.math=a})(jsfeat);(function(b){var a=(function(){return{identity:function(j,g){if(typeof g==="undefined"){g=1}var i=j.data;var f=j.rows,h=j.cols,e=(h+1)|0;var c=f*h;var d=c;while(--c>=0){i[c]=0}c=d;d=0;while(d<c){i[d]=g;d=d+e}},transpose:function(f,d){var l=0,h=0,k=d.rows,c=d.cols;var n=0,e=0,m=0;var o=d.data,g=f.data;for(;l<k;e+=1,n+=c,l++){m=e;for(h=0;h<c;m+=k,h++){g[m]=o[n+h]}}},multiply:function(l,n,m){var u=0,s=0,o=0;var r=0,t=0,q=0,w=0,g=0;var f=n.cols,e=n.rows,p=m.cols;var v=n.data,d=m.data,h=l.data;var c=0;for(;u<e;r+=f,u++){for(w=0,s=0;s<p;g++,w++,s++){q=w;t=r;c=0;for(o=0;o<f;t++,q+=p,o++){c+=v[t]*d[q]}h[g]=c}}},multiply_ABt:function(c,g,d){var p=0,n=0,m=0;var r=0,l=0,f=0,u=0;var e=g.cols,o=g.rows,q=d.rows;var v=g.data,t=d.data,h=c.data;var s=0;for(;p<o;r+=e,p++){for(f=0,n=0;n<q;u++,n++){l=r;s=0;for(m=0;m<e;l++,f++,m++){s+=v[l]*t[f]}h[u]=s}}},multiply_AtB:function(l,n,m){var u=0,s=0,o=0;var r=0,t=0,q=0,w=0,g=0;var f=n.cols,e=n.rows,p=m.cols;var v=n.data,d=m.data,h=l.data;var c=0;for(;u<f;r++,u++){for(w=0,s=0;s<p;g++,w++,s++){q=w;t=r;c=0;for(o=0;o<e;t+=f,q+=p,o++){c+=v[t]*d[q]}h[g]=c}}},multiply_AAt:function(d,h){var q=0,o=0,n=0;var c=0,r=0,m=0,g=0,e=0,u=0;var f=h.cols,p=h.rows;var t=h.data,l=d.data;var s=0;for(;q<p;c+=p+1,r=m,q++){e=c;u=c;g=r;for(o=q;o<p;e++,u+=p,o++){m=r;s=0;for(n=0;n<f;n++){s+=t[m++]*t[g++]}l[e]=s;l[u]=s}}},multiply_AtA:function(c,g){var r=0,p=0,n=0;var s=0,m=0,f=0,o=0,d=0,l=0;var e=g.cols,q=g.rows;var u=g.data,h=c.data;var t=0;for(;r<e;o+=e,r++){s=r;l=o+r;d=l;for(p=r;p<e;d++,l+=e,p++){m=s;f=p;t=0;for(n=0;n<q;m+=e,f+=e,n++){t+=u[m]*u[f]}h[d]=t;h[l]=t}}},identity_3x3:function(e,d){if(typeof d==="undefined"){d=1}var c=e.data;c[0]=c[4]=c[8]=d;c[1]=c[2]=c[3]=0;c[5]=c[6]=c[7]=0},invert_3x3:function(s,e){var o=s.data,h=e.data;var n=o[4];var m=o[8];var l=o[5];var k=o[7];var j=o[0];var i=j*n;var v=j*l;var u=o[3];var t=o[1];var r=u*t;var q=o[2];var p=u*q;var g=o[6];var f=g*t;var d=g*q;var c=1/(i*m-v*k-r*m+p*k+f*l-d*n);h[0]=(n*m-l*k)*c;h[1]=-(t*m-q*k)*c;h[2]=-(-t*l+q*n)*c;h[3]=-(u*m-l*g)*c;h[4]=(j*m-d)*c;h[5]=-(v-p)*c;h[6]=-(-u*k+n*g)*c;h[7]=-(j*k-f)*c;h[8]=(i-r)*c},multiply_3x3:function(r,v,t){var y=r.data,z=v.data,l=t.data;var x=z[0],w=z[1],u=z[2];var s=z[3],q=z[4],p=z[5];var o=z[6],n=z[7],m=z[8];var k=l[0],j=l[1],i=l[2];var h=l[3],g=l[4],f=l[5];var e=l[6],d=l[7],c=l[8];y[0]=x*k+w*h+u*e;y[1]=x*j+w*g+u*d;y[2]=x*i+w*f+u*c;y[3]=s*k+q*h+p*e;y[4]=s*j+q*g+p*d;y[5]=s*i+q*f+p*c;y[6]=o*k+n*h+m*e;y[7]=o*j+n*g+m*d;y[8]=o*i+n*f+m*c},mat3x3_determinant:function(d){var c=d.data;return c[0]*c[4]*c[8]-c[0]*c[5]*c[7]-c[3]*c[1]*c[8]+c[3]*c[2]*c[7]+c[6]*c[1]*c[5]-c[6]*c[2]*c[4]},determinant_3x3:function(h,g,f,e,d,c,k,j,i){return h*d*i-h*c*j-e*g*i+e*f*j+k*g*c-k*f*d}}})();b.matmath=a})(jsfeat);(function(b){var a=(function(){var f=function(g,j,i,h){h=g[j];g[j]=g[i];g[i]=h};var d=function(h,g){h=Math.abs(h);g=Math.abs(g);if(h>g){g/=h;return h*Math.sqrt(1+g*g)}if(g>0){h/=g;return g*Math.sqrt(1+h*h)}return 0};var c=function(H,o,q,r,h,I){var C=jsfeat.EPSILON;var N=0,M=0,L=0,J=0,K=0,D=0,R=0,G=0;var u=0,v=I*I*30;var E=0,U=0,F=0,x=0,z=0,B=0,Q=0,T=0,w=0;var P=jsfeat.cache.get_buffer(I<<2);var S=jsfeat.cache.get_buffer(I<<2);var O=P.i32;var g=S.i32;if(r){for(;N<I;N++){L=N*h;for(M=0;M<I;M++){r[L+M]=0}r[L+N]=1}}for(L=0;L<I;L++){q[L]=H[(o+1)*L];if(L<I-1){for(J=L+1,E=Math.abs(H[o*L+J]),N=L+2;N<I;N++){U=Math.abs(H[o*L+N]);if(E<U){E=U,J=N}}O[L]=J}if(L>0){for(J=0,E=Math.abs(H[L]),N=1;N<L;N++){U=Math.abs(H[o*N+L]);if(E<U){E=U,J=N}}g[L]=J}}if(I>1){for(;u<v;u++){for(L=0,E=Math.abs(H[O[0]]),N=1;N<I-1;N++){U=Math.abs(H[o*N+O[N]]);if(E<U){E=U,L=N}}K=O[L];for(N=1;N<I;N++){U=Math.abs(H[o*g[N]+N]);if(E<U){E=U,L=g[N],K=N}}F=H[o*L+K];if(Math.abs(F)<=C){break}x=(q[K]-q[L])*0.5;z=Math.abs(x)+d(F,x);B=d(F,z);Q=z/B;B=F/B;z=(F/z)*F;if(x<0){B=-B,z=-z}H[o*L+K]=0;q[L]-=z;q[K]+=z;for(N=0;N<L;N++){R=(o*N+L);G=(o*N+K);T=H[R];w=H[G];H[R]=T*Q-w*B;H[G]=T*B+w*Q}for(N=(L+1);N<K;N++){R=(o*L+N);G=(o*N+K);T=H[R];w=H[G];H[R]=T*Q-w*B;H[G]=T*B+w*Q}N=K+1;R=(o*L+N);G=(o*K+N);for(;N<I;N++,R++,G++){T=H[R];w=H[G];H[R]=T*Q-w*B;H[G]=T*B+w*Q}if(r){R=h*L;G=h*K;for(N=0;N<I;N++,R++,G++){T=r[R];w=r[G];r[R]=T*Q-w*B;r[G]=T*B+w*Q}}for(M=0;M<2;M++){D=M==0?L:K;if(D<I-1){for(J=D+1,E=Math.abs(H[o*D+J]),N=D+2;N<I;N++){U=Math.abs(H[o*D+N]);if(E<U){E=U,J=N}}O[D]=J}if(D>0){for(J=0,E=Math.abs(H[D]),N=1;N<D;N++){U=Math.abs(H[o*N+D]);if(E<U){E=U,J=N}}g[D]=J}}}}for(L=0;L<I-1;L++){J=L;for(N=L+1;N<I;N++){if(q[J]<q[N]){J=N}}if(L!=J){f(q,J,L,E);if(r){for(N=0;N<I;N++){f(r,h*J+N,h*L+N,E)}}}}jsfeat.cache.put_buffer(P);jsfeat.cache.put_buffer(S)};var e=function(D,l,h,M,v,T,S,E){var C=jsfeat.EPSILON*2;var q=jsfeat.FLT_MIN;var X=0,V=0,U=0,A=0,u=Math.max(T,30);var K=0,J=0,R=0,Q=0,F=0;var Y=0,O=0,N=0;var H=0,G=0,x=0,I=0,w=0,L=0,aa=0,P=0,Z=0;var z=4660;var B=0,y=0,o=0;var r=jsfeat.cache.get_buffer(S<<3);var g=r.f64;for(;X<S;X++){for(U=0,x=0;U<T;U++){N=D[X*l+U];x+=N*N}g[X]=x;if(M){for(U=0;U<S;U++){M[X*v+U]=0}M[X*v+X]=1}}for(;A<u;A++){F=0;for(X=0;X<S-1;X++){for(V=X+1;V<S;V++){K=(X*l)|0,J=(V*l)|0;aa=g[X],P=0,Z=g[V];U=2;P+=D[K]*D[J];P+=D[K+1]*D[J+1];for(;U<T;U++){P+=D[K+U]*D[J+U]}if(Math.abs(P)<=C*Math.sqrt(aa*Z)){continue}P*=2;I=aa-Z,w=d(P,I);if(I<0){L=(w-I)*0.5;O=Math.sqrt(L/w);Y=(P/(w*O*2))}else{Y=Math.sqrt((w+I)/(w*2));O=(P/(w*Y*2))}aa=0,Z=0;U=2;H=Y*D[K]+O*D[J];G=-O*D[K]+Y*D[J];D[K]=H;D[J]=G;aa+=H*H;Z+=G*G;H=Y*D[K+1]+O*D[J+1];G=-O*D[K+1]+Y*D[J+1];D[K+1]=H;D[J+1]=G;aa+=H*H;Z+=G*G;for(;U<T;U++){H=Y*D[K+U]+O*D[J+U];G=-O*D[K+U]+Y*D[J+U];D[K+U]=H;D[J+U]=G;aa+=H*H;Z+=G*G}g[X]=aa;g[V]=Z;F=1;if(M){R=(X*v)|0,Q=(V*v)|0;U=2;H=Y*M[R]+O*M[Q];G=-O*M[R]+Y*M[Q];M[R]=H;M[Q]=G;H=Y*M[R+1]+O*M[Q+1];G=-O*M[R+1]+Y*M[Q+1];M[R+1]=H;M[Q+1]=G;for(;U<S;U++){H=Y*M[R+U]+O*M[Q+U];G=-O*M[R+U]+Y*M[Q+U];M[R+U]=H;M[Q+U]=G}}}}if(F==0){break}}for(X=0;X<S;X++){for(U=0,x=0;U<T;U++){N=D[X*l+U];x+=N*N}g[X]=Math.sqrt(x)}for(X=0;X<S-1;X++){V=X;for(U=X+1;U<S;U++){if(g[V]<g[U]){V=U}}if(X!=V){f(g,X,V,x);if(M){for(U=0;U<T;U++){f(D,X*l+U,V*l+U,N)}for(U=0;U<S;U++){f(M,X*v+U,V*v+U,N)}}}}for(X=0;X<S;X++){h[X]=g[X]}if(!M){jsfeat.cache.put_buffer(r);return}for(X=0;X<E;X++){x=X<S?g[X]:0;while(x<=q){y=(1/T);for(U=0;U<T;U++){z=(z*214013+2531011);B=(((z>>16)&32767)&256)!=0?y:-y;D[X*l+U]=B}for(A=0;A<2;A++){for(V=0;V<X;V++){x=0;for(U=0;U<T;U++){x+=D[X*l+U]*D[V*l+U]}o=0;for(U=0;U<T;U++){N=(D[X*l+U]-x*D[V*l+U]);D[X*l+U]=N;o+=Math.abs(N)}o=o?1/o:0;for(U=0;U<T;U++){D[X*l+U]*=o}}}x=0;for(U=0;U<T;U++){N=D[X*l+U];x+=N*N}x=Math.sqrt(x)}O=(1/x);for(U=0;U<T;U++){D[X*l+U]*=O}}jsfeat.cache.put_buffer(r)};return{lu_solve:function(l,g){var q=0,o=0,n=0,h=1,v=l.cols;var w=l.data,r=g.data;var x,m,u,y;for(q=0;q<v;q++){n=q;for(o=q+1;o<v;o++){if(Math.abs(w[o*v+q])>Math.abs(w[n*v+q])){n=o}}if(Math.abs(w[n*v+q])<jsfeat.EPSILON){return 0}if(n!=q){for(o=q;o<v;o++){f(w,q*v+o,n*v+o,x)}f(r,q,n,x);h=-h}u=-1/w[q*v+q];for(o=q+1;o<v;o++){m=w[o*v+q]*u;for(n=q+1;n<v;n++){w[o*v+n]+=m*w[q*v+n]}r[o]+=m*r[q]}w[q*v+q]=-u}for(q=v-1;q>=0;q--){y=r[q];for(n=q+1;n<v;n++){y-=w[q*v+n]*r[n]}r[q]=y*w[q*v+q]}return 1},cholesky_solve:function(h,g){var l=0,v=0,r=0,s=0,n=0,p=0,o=0;var u=h.cols;var t=h.data,q=g.data;var k,m;for(l=0;l<u;l++){m=1;s=(l*u);n=s;for(v=l;v<u;v++){k=t[(n+l)];for(r=0;r<l;r++){k-=t[(r*u+l)]*t[(n+r)]}if(v==l){t[(n+l)]=k;if(k==0){return 0}m=1/k}else{t[(s+v)]=k;t[(n+l)]=k*m}n=(n+u)}}s=0;for(p=0;p<u;p++){k=q[p];for(o=0;o<p;o++){k-=t[(s+o)]*q[o]}q[p]=k;s=(s+u)}s=0;for(p=0;p<u;p++){q[p]/=t[(s+p)];s=(s+u)}p=(u-1);for(;p>=0;p--){k=q[p];o=(p+1);s=(o*u);for(;o<u;o++){k-=t[(s+p)]*q[o];s=(s+u)}q[p]=k}return 1},svd_decompose:function(t,k,p,l,o){if(typeof o==="undefined"){o=0}var r=0,z=0,x=0,g=t.rows,D=t.cols,w=g,v=D;var s=t.type|jsfeat.C1_t;if(w<v){r=1;z=w;w=v;v=z}var q=jsfeat.cache.get_buffer((w*w)<<3);var h=jsfeat.cache.get_buffer(v<<3);var C=jsfeat.cache.get_buffer((v*v)<<3);var u=new jsfeat.matrix_t(w,w,s,q.data);var B=new jsfeat.matrix_t(1,v,s,h.data);var y=new jsfeat.matrix_t(v,v,s,C.data);if(r==0){jsfeat.matmath.transpose(u,t)}else{for(z=0;z<D*g;z++){u.data[z]=t.data[z]}for(;z<v*w;z++){u.data[z]=0}}e(u.data,w,B.data,y.data,v,w,v,w);if(k){for(z=0;z<v;z++){k.data[z]=B.data[z]}for(;z<D;z++){k.data[z]=0}}if(r==0){if(p&&(o&jsfeat.SVD_U_T)){z=w*w;while(--z>=0){p.data[z]=u.data[z]}}else{if(p){jsfeat.matmath.transpose(p,u)}}if(l&&(o&jsfeat.SVD_V_T)){z=v*v;while(--z>=0){l.data[z]=y.data[z]}}else{if(l){jsfeat.matmath.transpose(l,y)}}}else{if(p&&(o&jsfeat.SVD_U_T)){z=v*v;while(--z>=0){p.data[z]=y.data[z]}}else{if(p){jsfeat.matmath.transpose(p,y)}}if(l&&(o&jsfeat.SVD_V_T)){z=w*w;while(--z>=0){l.data[z]=u.data[z]}}else{if(l){jsfeat.matmath.transpose(l,u)}}}jsfeat.cache.put_buffer(q);jsfeat.cache.put_buffer(h);jsfeat.cache.put_buffer(C)},svd_solve:function(v,l,s){var E=0,C=0,z=0;var w=0,u=0;var o=v.rows,p=v.cols;var h=0,I=0,x=0;var r=v.type|jsfeat.C1_t;var F=jsfeat.cache.get_buffer((o*o)<<3);var m=jsfeat.cache.get_buffer(p<<3);var H=jsfeat.cache.get_buffer((p*p)<<3);var t=new jsfeat.matrix_t(o,o,r,F.data);var G=new jsfeat.matrix_t(1,p,r,m.data);var D=new jsfeat.matrix_t(p,p,r,H.data);var n=s.data,y=t.data,q=G.data,g=D.data;this.svd_decompose(v,G,t,D,0);x=jsfeat.EPSILON*q[0]*p;for(;E<p;E++,u+=p){I=0;for(C=0;C<p;C++){if(q[C]>x){for(z=0,h=0,w=0;z<o;z++,w+=p){h+=y[w+C]*n[z]}I+=h*g[u+C]/q[C]}}l.data[E]=I}jsfeat.cache.put_buffer(F);jsfeat.cache.put_buffer(m);jsfeat.cache.put_buffer(H)},svd_invert:function(E,t){var C=0,z=0,y=0;var v=0,s=0,h=0;var n=t.rows,o=t.cols;var l=0,w=0;var q=t.type|jsfeat.C1_t;var D=jsfeat.cache.get_buffer((n*n)<<3);var m=jsfeat.cache.get_buffer(o<<3);var G=jsfeat.cache.get_buffer((o*o)<<3);var u=new jsfeat.matrix_t(n,n,q,D.data);var F=new jsfeat.matrix_t(1,o,q,m.data);var B=new jsfeat.matrix_t(o,o,q,G.data);var r=E.data,x=u.data,p=F.data,g=B.data;this.svd_decompose(t,F,u,B,0);w=jsfeat.EPSILON*p[0]*o;for(;C<o;C++,s+=o){for(z=0,v=0;z<n;z++,h++){for(y=0,l=0;y<o;y++,v++){if(p[y]>w){l+=g[s+y]*x[v]/p[y]}}r[h]=l}}jsfeat.cache.put_buffer(D);jsfeat.cache.put_buffer(m);jsfeat.cache.put_buffer(G)},eigenVV:function(j,p,r){var k=j.cols,m=k*k;var g=j.type|jsfeat.C1_t;var o=jsfeat.cache.get_buffer((k*k)<<3);var h=jsfeat.cache.get_buffer(k<<3);var l=new jsfeat.matrix_t(k,k,g,o.data);var q=new jsfeat.matrix_t(1,k,g,h.data);while(--m>=0){l.data[m]=j.data[m]}c(l.data,k,q.data,p?p.data:null,k,k);if(r){while(--k>=0){r.data[k]=q.data[k]}}jsfeat.cache.put_buffer(o);jsfeat.cache.put_buffer(h)}}})();b.linalg=a})(jsfeat);(function(a){var c=(function(){var m=function(p){return p*p};var e=function(z,A,x,w,u){var t=0;var y=0,s=0,q=0,C=0;var v=0,r=0,p=0,B=0;var E=0,D=0;for(;t<u;++t){y+=z[t].x;s+=z[t].y;v+=A[t].x;r+=A[t].y}y/=u;s/=u;v/=u;r/=u;for(t=0;t<u;++t){E=z[t].x-y;D=z[t].y-s;q+=Math.sqrt(E*E+D*D);E=A[t].x-v;D=A[t].y-r;p+=Math.sqrt(E*E+D*D)}q/=u;p/=u;C=Math.SQRT2/q;B=Math.SQRT2/p;x[0]=x[4]=C;x[2]=-y*C;x[5]=-s*C;x[1]=x[3]=x[6]=x[7]=0;x[8]=1;w[0]=w[4]=B;w[2]=-v*B;w[5]=-r*B;w[1]=w[3]=w[6]=w[7]=0;w[8]=1};var h=function(x,u){var q=0,p=0,r=(u-1)|0;var w=0,t=0,v=0,s=0;for(;q<r;++q){w=x[q].x-x[r].x;t=x[q].y-x[r].y;for(p=0;p<q;++p){v=x[p].x-x[r].x;s=x[p].y-x[r].y;if(Math.abs(v*t-s*w)<=jsfeat.EPSILON*(Math.abs(w)+Math.abs(t)+Math.abs(v)+Math.abs(s))){return true}}}return false};var k=new jsfeat.matrix_t(3,3,jsfeat.F32_t|jsfeat.C1_t);var i=new jsfeat.matrix_t(3,3,jsfeat.F32_t|jsfeat.C1_t);var o=new jsfeat.matrix_t(6,6,jsfeat.F32_t|jsfeat.C1_t);var n=new jsfeat.matrix_t(6,1,jsfeat.F32_t|jsfeat.C1_t);var j=(function(){function p(){}p.prototype.run=function(D,q,r,t){var G=0,F=0;var B=r.type|jsfeat.C1_t;var J=r.data,v=k.data,E=i.data;var x,w,A=0,z=0;e(D,q,v,E,t);var u=jsfeat.cache.get_buffer((2*t*6)<<3);var y=jsfeat.cache.get_buffer((2*t)<<3);var C=new jsfeat.matrix_t(6,2*t,B,u.data);var H=new jsfeat.matrix_t(1,2*t,B,y.data);var I=C.data,s=H.data;for(;G<t;++G){x=D[G];w=q[G];A=v[0]*x.x+v[1]*x.y+v[2];z=v[3]*x.x+v[4]*x.y+v[5];F=G*2*6;I[F]=A,I[F+1]=z,I[F+2]=1,I[F+3]=0,I[F+4]=0,I[F+5]=0;F+=6;I[F]=0,I[F+1]=0,I[F+2]=0,I[F+3]=A,I[F+4]=z,I[F+5]=1;s[G<<1]=E[0]*w.x+E[1]*w.y+E[2];s[(G<<1)+1]=E[3]*w.x+E[4]*w.y+E[5]}jsfeat.matmath.multiply_AtA(o,C);jsfeat.matmath.multiply_AtB(n,C,H);jsfeat.linalg.lu_solve(o,n);J[0]=n.data[0],J[1]=n.data[1],J[2]=n.data[2];J[3]=n.data[3],J[4]=n.data[4],J[5]=n.data[5];J[6]=0,J[7]=0,J[8]=1;jsfeat.matmath.invert_3x3(i,i);jsfeat.matmath.multiply_3x3(r,i,r);jsfeat.matmath.multiply_3x3(r,r,k);jsfeat.cache.put_buffer(u);jsfeat.cache.put_buffer(y);return 1};p.prototype.error=function(v,w,t,r,u){var s=0;var y,x;var q=t.data;for(;s<u;++s){y=v[s];x=w[s];r[s]=m(x.x-q[0]*y.x-q[1]*y.y-q[2])+m(x.y-q[3]*y.x-q[4]*y.y-q[5])}};p.prototype.check_subset=function(s,r,q){return true};return p})();var g=new jsfeat.matrix_t(9,9,jsfeat.F32_t|jsfeat.C1_t);var f=new jsfeat.matrix_t(9,9,jsfeat.F32_t|jsfeat.C1_t);var l=(function(){function p(){}p.prototype.run=function(I,r,v,C){var L=0,K=0;var O=v.data,D=k.data,J=i.data;var M=g.data,N=f.data;var H=0,G=0,s=0,q=0;var u=0,t=0,B=0,A=0,z=0,w=0,F=0,E=0;for(;L<C;++L){B+=r[L].x;A+=r[L].y;F+=I[L].x;E+=I[L].y}B/=C;A/=C;F/=C;E/=C;for(L=0;L<C;++L){u+=Math.abs(r[L].x-B);t+=Math.abs(r[L].y-A);z+=Math.abs(I[L].x-F);w+=Math.abs(I[L].y-E)}if(Math.abs(u)<jsfeat.EPSILON||Math.abs(t)<jsfeat.EPSILON||Math.abs(z)<jsfeat.EPSILON||Math.abs(w)<jsfeat.EPSILON){return 0}u=C/u;t=C/t;z=C/z;w=C/w;D[0]=z;D[1]=0;D[2]=-F*z;D[3]=0;D[4]=w;D[5]=-E*w;D[6]=0;D[7]=0;D[8]=1;J[0]=1/u;J[1]=0;J[2]=B;J[3]=0;J[4]=1/t;J[5]=A;J[6]=0;J[7]=0;J[8]=1;L=81;while(--L>=0){M[L]=0}for(L=0;L<C;++L){H=(r[L].x-B)*u;G=(r[L].y-A)*t;s=(I[L].x-F)*z;q=(I[L].y-E)*w;M[0]+=s*s;M[1]+=s*q;M[2]+=s;M[6]+=s*-H*s;M[7]+=s*-H*q;M[8]+=s*-H;M[10]+=q*q;M[11]+=q;M[15]+=q*-H*s;M[16]+=q*-H*q;M[17]+=q*-H;M[20]+=1;M[24]+=-H*s;M[25]+=-H*q;M[26]+=-H;M[30]+=s*s;M[31]+=s*q;M[32]+=s;M[33]+=s*-G*s;M[34]+=s*-G*q;M[35]+=s*-G;M[40]+=q*q;M[41]+=q;M[42]+=q*-G*s;M[43]+=q*-G*q;M[44]+=q*-G;M[50]+=1;M[51]+=-G*s;M[52]+=-G*q;M[53]+=-G;M[60]+=-H*s*-H*s+-G*s*-G*s;M[61]+=-H*s*-H*q+-G*s*-G*q;M[62]+=-H*s*-H+-G*s*-G;M[70]+=-H*q*-H*q+-G*q*-G*q;M[71]+=-H*q*-H+-G*q*-G;M[80]+=-H*-H+-G*-G}for(L=0;L<9;++L){for(K=0;K<L;++K){M[L*9+K]=M[K*9+L]}}jsfeat.linalg.eigenVV(g,f);O[0]=N[72],O[1]=N[73],O[2]=N[74];O[3]=N[75],O[4]=N[76],O[5]=N[77];O[6]=N[78],O[7]=N[79],O[8]=N[80];jsfeat.matmath.multiply_3x3(v,i,v);jsfeat.matmath.multiply_3x3(v,v,k);H=1/O[8];O[0]*=H;O[1]*=H;O[2]*=H;O[3]*=H;O[4]*=H;O[5]*=H;O[6]*=H;O[7]*=H;O[8]=1;return 1};p.prototype.error=function(w,x,u,r,v){var t=0;var z,y,s=0,B=0,A=0;var q=u.data;for(;t<v;++t){z=w[t];y=x[t];s=1/(q[6]*z.x+q[7]*z.y+1);B=(q[0]*z.x+q[1]*z.y+q[2])*s-y.x;A=(q[3]*z.x+q[4]*z.y+q[5])*s-y.y;r[t]=(B*B+A*A)}};p.prototype.check_subset=function(M,s,B){if(B==4){var N=0;var I=M[0],H=M[1],G=M[2],E=M[3];var A=s[0],y=s[1],w=s[2],u=s[3];var L=I.x,K=I.y,J=1;var V=H.x,U=H.y,T=1;var z=G.x,x=G.y,v=1;var t=A.x,r=A.y,q=1;var F=y.x,D=y.y,C=1;var Q=w.x,P=w.y,O=1;var S=jsfeat.matmath.determinant_3x3(L,K,J,V,U,T,z,x,v);var R=jsfeat.matmath.determinant_3x3(t,r,q,F,D,C,Q,P,O);if(S*R<0){N++}L=H.x,K=H.y;V=G.x,U=G.y;z=E.x,x=E.y;t=y.x,r=y.y;F=w.x,D=w.y;Q=u.x,P=u.y;S=jsfeat.matmath.determinant_3x3(L,K,J,V,U,T,z,x,v);R=jsfeat.matmath.determinant_3x3(t,r,q,F,D,C,Q,P,O);if(S*R<0){N++}L=I.x,K=I.y;V=G.x,U=G.y;z=E.x,x=E.y;t=A.x,r=A.y;F=w.x,D=w.y;Q=u.x,P=u.y;S=jsfeat.matmath.determinant_3x3(L,K,J,V,U,T,z,x,v);R=jsfeat.matmath.determinant_3x3(t,r,q,F,D,C,Q,P,O);if(S*R<0){N++}L=I.x,K=I.y;V=H.x,U=H.y;z=E.x,x=E.y;t=A.x,r=A.y;F=y.x,D=y.y;Q=u.x,P=u.y;S=jsfeat.matmath.determinant_3x3(L,K,J,V,U,T,z,x,v);R=jsfeat.matmath.determinant_3x3(t,r,q,F,D,C,Q,P,O);if(S*R<0){N++}if(N!=0&&N!=4){return false}}return true};return p})();return{affine2d:j,homography2d:l}})();var b=(function(){function e(h,i,f,g){if(typeof h==="undefined"){h=0}if(typeof i==="undefined"){i=0.5}if(typeof f==="undefined"){f=0.5}if(typeof g==="undefined"){g=0.99}this.size=h;this.thresh=i;this.eps=f;this.prob=g}e.prototype.update_iters=function(g,i){var h=Math.log(1-this.prob);var f=Math.log(1-Math.pow(1-g,this.size));return(f>=0||-h>=i*(-f)?i:Math.round(h/f))|0};return e})();var d=(function(){var e=function(l,q,r,p,t,m,g){var v=1000;var s=[];var n=0,k=0,u=0,h=0,o=false;for(;u<v;++u){n=0;for(;n<p&&u<v;){o=false;h=0;while(!o){o=true;h=s[n]=Math.floor(Math.random()*t)|0;for(k=0;k<n;++k){if(h==s[k]){o=false;break}}}m[n]=q[h];g[n]=r[h];if(!l.check_subset(m,g,n+1)){u++;continue}++n}break}return(n==p&&u<v)};var f=function(k,m,p,q,o,g,h,s){var j=0,l=0,n=0;var r=g*g;k.error(p,q,m,h,o);for(;l<o;++l){n=h[l]<=r;s[l]=n;j+=n}return j};return{ransac:function(E,m,x,i,l,j,y,g){if(typeof g==="undefined"){g=1000}if(l<E.size){return false}var v=E.size;var A=g,z=0;var q=false;var D=[];var C=[];var r=false;var G=j.cols,w=j.rows;var u=j.type|jsfeat.C1_t;var B=jsfeat.cache.get_buffer((G*w)<<3);var h=jsfeat.cache.get_buffer(l);var t=jsfeat.cache.get_buffer(l<<2);var o=new jsfeat.matrix_t(G,w,u,B.data);var s=new jsfeat.matrix_t(l,1,jsfeat.U8C1_t,h.data);var F=-1,p=0;var n=0;var k=t.f32;if(l==v){if(m.run(x,i,o,l)<=0){jsfeat.cache.put_buffer(B);jsfeat.cache.put_buffer(h);jsfeat.cache.put_buffer(t);return false}o.copy_to(j);if(y){while(--l>=0){y.data[l]=1}}jsfeat.cache.put_buffer(B);jsfeat.cache.put_buffer(h);jsfeat.cache.put_buffer(t);return true}for(;z<A;++z){r=e(m,x,i,v,l,D,C);if(!r){if(z==0){jsfeat.cache.put_buffer(B);jsfeat.cache.put_buffer(h);jsfeat.cache.put_buffer(t);return false}break}n=m.run(D,C,o,v);if(n<=0){continue}p=f(m,o,x,i,l,E.thresh,k,s.data);if(p>Math.max(F,v-1)){o.copy_to(j);F=p;if(y){s.copy_to(y)}A=E.update_iters((l-p)/l,A);q=true}}jsfeat.cache.put_buffer(B);jsfeat.cache.put_buffer(h);jsfeat.cache.put_buffer(t);return q},lmeds:function(H,n,z,i,l,j,B,g){if(typeof g==="undefined"){g=1000}if(l<H.size){return false}var w=H.size;var D=g,C=0;var r=false;var G=[];var F=[];var s=false;var I=j.cols,y=j.rows;var v=j.type|jsfeat.C1_t;var E=jsfeat.cache.get_buffer((I*y)<<3);var h=jsfeat.cache.get_buffer(l);var u=jsfeat.cache.get_buffer(l<<2);var p=new jsfeat.matrix_t(I,y,v,E.data);var t=new jsfeat.matrix_t(l,1,jsfeat.U8_t|jsfeat.C1_t,h.data);var q=0;var o=0;var k=u.f32;var A=1000000000,x=0,m=0;H.eps=0.45;D=H.update_iters(H.eps,D);if(l==w){if(n.run(z,i,p,l)<=0){jsfeat.cache.put_buffer(E);jsfeat.cache.put_buffer(h);jsfeat.cache.put_buffer(u);return false}p.copy_to(j);if(B){while(--l>=0){B.data[l]=1}}jsfeat.cache.put_buffer(E);jsfeat.cache.put_buffer(h);jsfeat.cache.put_buffer(u);return true}for(;C<D;++C){s=e(n,z,i,w,l,G,F);if(!s){if(C==0){jsfeat.cache.put_buffer(E);jsfeat.cache.put_buffer(h);jsfeat.cache.put_buffer(u);return false}break}o=n.run(G,F,p,w);if(o<=0){continue}n.error(z,i,p,k,l);m=jsfeat.math.median(k,0,l-1);if(m<A){A=m;p.copy_to(j);r=true}}if(r){x=2.5*1.4826*(1+5/(l-w))*Math.sqrt(A);x=Math.max(x,0.001);q=f(n,j,z,i,l,x,k,t.data);if(B){t.copy_to(B)}r=q>=w}jsfeat.cache.put_buffer(E);jsfeat.cache.put_buffer(h);jsfeat.cache.put_buffer(u);return r}}})();a.ransac_params_t=b;a.motion_model=c;a.motion_estimator=d})(jsfeat);(function(b){var a=(function(){var c=function(q,S,O,p){var r=0;var y=q.channel,v=q.cols,J=q.rows;var P=q.data,m=S.data;var I=v/O,H=J/p;var n=(I*H*65536)|0;var x=0,u=0,C=0,A=0,t=0,s=0,G=0,F=0,D=0,B=0;var Q=0,N=0,K=0,o=0,M=0,E=0;var l=jsfeat.cache.get_buffer((O*y)<<2);var g=jsfeat.cache.get_buffer((O*y)<<2);var R=jsfeat.cache.get_buffer((v*2*3)<<2);var L=l.i32;var j=g.i32;var z=R.i32;for(;x<O;x++){D=x*I,B=D+I;t=(D+1-0.000001)|0,s=B|0;t=Math.min(t,v-1);s=Math.min(s,v-1);if(t>D){z[F++]=(x*y)|0;z[F++]=((t-1)*y)|0;z[F++]=((t-D)*256)|0;r++}for(C=t;C<s;C++){r++;z[F++]=(x*y)|0;z[F++]=(C*y)|0;z[F++]=256}if(B-s>0.001){r++;z[F++]=(x*y)|0;z[F++]=(s*y)|0;z[F++]=((B-s)*256)|0}}for(x=0;x<O*y;x++){L[x]=j[x]=0}u=0;for(A=0;A<J;A++){Q=v*A;for(F=0;F<r;F++){K=z[F*3];t=z[F*3+1];o=z[F*3+2];for(G=0;G<y;G++){L[K+G]+=P[Q+t+G]*o}}if((u+1)*H<=A+1||A==J-1){M=(Math.max(A+1-(u+1)*H,0)*256)|0;E=256-M;N=O*u;if(M<=0){for(x=0;x<O*y;x++){m[N+x]=Math.min(Math.max((j[x]+L[x]*256)/n,0),255);j[x]=L[x]=0}}else{for(x=0;x<O*y;x++){m[N+x]=Math.min(Math.max((j[x]+L[x]*E)/n,0),255);j[x]=L[x]*M;L[x]=0}}u++}else{for(x=0;x<O*y;x++){j[x]+=L[x]*256;L[x]=0}}}jsfeat.cache.put_buffer(g);jsfeat.cache.put_buffer(l);jsfeat.cache.put_buffer(R)};var f=function(p,S,N,o){var q=0;var x=p.channel,u=p.cols,I=p.rows;var O=p.data,m=S.data;var H=u/N,G=I/o;var Q=1/(H*G);var v=0,t=0,B=0,z=0,s=0,r=0,F=0,E=0,C=0,A=0;var P=0,M=0,J=0,n=0,L=0,D=0;var l=jsfeat.cache.get_buffer((N*x)<<2);var g=jsfeat.cache.get_buffer((N*x)<<2);var R=jsfeat.cache.get_buffer((u*2*3)<<2);var K=l.f32;var j=g.f32;var y=R.f32;for(;v<N;v++){C=v*H,A=C+H;s=(C+1-0.000001)|0,r=A|0;s=Math.min(s,u-1);r=Math.min(r,u-1);if(s>C){q++;y[E++]=((s-1)*x)|0;y[E++]=(v*x)|0;y[E++]=(s-C)*Q}for(B=s;B<r;B++){q++;y[E++]=(B*x)|0;y[E++]=(v*x)|0;y[E++]=Q}if(A-r>0.001){q++;y[E++]=(r*x)|0;y[E++]=(v*x)|0;y[E++]=(A-r)*Q}}for(v=0;v<N*x;v++){K[v]=j[v]=0}t=0;for(z=0;z<I;z++){P=u*z;for(E=0;E<q;E++){s=y[E*3]|0;J=y[E*3+1]|0;n=y[E*3+2];for(F=0;F<x;F++){K[J+F]+=O[P+s+F]*n}}if((t+1)*G<=z+1||z==I-1){L=Math.max(z+1-(t+1)*G,0);D=1-L;M=N*t;if(Math.abs(L)<0.001){for(v=0;v<N*x;v++){m[M+v]=j[v]+K[v];j[v]=K[v]=0}}else{for(v=0;v<N*x;v++){m[M+v]=j[v]+K[v]*D;j[v]=K[v]*L;K[v]=0}}t++}else{for(v=0;v<N*x;v++){j[v]+=K[v];K[v]=0}}}jsfeat.cache.put_buffer(g);jsfeat.cache.put_buffer(l);jsfeat.cache.put_buffer(R)};var e=function(D,F,m,s,B,t,g,n){var z=0,y=0,x=0,A=0,u=0,l=0,G=0,E=0,C=0,v=t[0],r=0;var q=s<<1,p=s*3,o=s<<2;for(;z<B;++z){l=F[A];for(y=0;y<n;++y){D[y]=l}for(y=0;y<=s-2;y+=2){D[y+n]=F[A+y];D[y+n+1]=F[A+y+1]}for(;y<s;++y){D[y+n]=F[A+y]}l=F[A+s-1];for(y=s;y<n+s;++y){D[y+n]=l}for(y=0;y<=s-4;y+=4){l=D[y]*v,G=D[y+1]*v,E=D[y+2]*v,C=D[y+3]*v;for(x=1;x<g;++x){r=t[x];l+=D[x+y]*r;G+=D[x+y+1]*r;E+=D[x+y+2]*r;C+=D[x+y+3]*r}m[u+y]=Math.min(l>>8,255);m[u+y+1]=Math.min(G>>8,255);m[u+y+2]=Math.min(E>>8,255);m[u+y+3]=Math.min(C>>8,255)}for(;y<s;++y){l=D[y]*v;for(x=1;x<g;++x){l+=D[x+y]*t[x]}m[u+y]=Math.min(l>>8,255)}A+=s;u+=s}for(z=0;z<s;++z){l=m[z];for(y=0;y<n;++y){D[y]=l}x=z;for(y=0;y<=B-2;y+=2,x+=q){D[y+n]=m[x];D[y+n+1]=m[x+s]}for(;y<B;++y,x+=s){D[y+n]=m[x]}l=m[(B-1)*s+z];for(y=B;y<n+B;++y){D[y+n]=l}u=z;for(y=0;y<=B-4;y+=4,u+=o){l=D[y]*v,G=D[y+1]*v,E=D[y+2]*v,C=D[y+3]*v;for(x=1;x<g;++x){r=t[x];l+=D[x+y]*r;G+=D[x+y+1]*r;E+=D[x+y+2]*r;C+=D[x+y+3]*r}m[u]=Math.min(l>>8,255);m[u+s]=Math.min(G>>8,255);m[u+q]=Math.min(E>>8,255);m[u+p]=Math.min(C>>8,255)}for(;y<B;++y,u+=s){l=D[y]*v;for(x=1;x<g;++x){l+=D[x+y]*t[x]}m[u]=Math.min(l>>8,255)}}};var d=function(D,F,m,s,B,t,g,n){var z=0,y=0,x=0,A=0,u=0,l=0,G=0,E=0,C=0,v=t[0],r=0;var q=s<<1,p=s*3,o=s<<2;for(;z<B;++z){l=F[A];for(y=0;y<n;++y){D[y]=l}for(y=0;y<=s-2;y+=2){D[y+n]=F[A+y];D[y+n+1]=F[A+y+1]}for(;y<s;++y){D[y+n]=F[A+y]}l=F[A+s-1];for(y=s;y<n+s;++y){D[y+n]=l}for(y=0;y<=s-4;y+=4){l=D[y]*v,G=D[y+1]*v,E=D[y+2]*v,C=D[y+3]*v;for(x=1;x<g;++x){r=t[x];l+=D[x+y]*r;G+=D[x+y+1]*r;E+=D[x+y+2]*r;C+=D[x+y+3]*r}m[u+y]=l;m[u+y+1]=G;m[u+y+2]=E;m[u+y+3]=C}for(;y<s;++y){l=D[y]*v;for(x=1;x<g;++x){l+=D[x+y]*t[x]}m[u+y]=l}A+=s;u+=s}for(z=0;z<s;++z){l=m[z];for(y=0;y<n;++y){D[y]=l}x=z;for(y=0;y<=B-2;y+=2,x+=q){D[y+n]=m[x];D[y+n+1]=m[x+s]}for(;y<B;++y,x+=s){D[y+n]=m[x]}l=m[(B-1)*s+z];for(y=B;y<n+B;++y){D[y+n]=l}u=z;for(y=0;y<=B-4;y+=4,u+=o){l=D[y]*v,G=D[y+1]*v,E=D[y+2]*v,C=D[y+3]*v;for(x=1;x<g;++x){r=t[x];l+=D[x+y]*r;G+=D[x+y+1]*r;E+=D[x+y+2]*r;C+=D[x+y+3]*r}m[u]=l;m[u+s]=G;m[u+q]=E;m[u+p]=C}for(;y<B;++y,u+=s){l=D[y]*v;for(x=1;x<g;++x){l+=D[x+y]*t[x]}m[u]=l}}};return{grayscale:function(n,r,A,D,g){if(typeof g==="undefined"){g=jsfeat.COLOR_RGBA2GRAY}var q=0,p=0,z=0,v=0,m=0,u=0;var s=4899,B=9617,C=1868,o=4;if(g==jsfeat.COLOR_BGRA2GRAY||g==jsfeat.COLOR_BGR2GRAY){s=1868;C=4899}if(g==jsfeat.COLOR_RGB2GRAY||g==jsfeat.COLOR_BGR2GRAY){o=3}var l=o<<1,k=(o*3)|0;D.resize(r,A,1);var t=D.data;for(p=0;p<A;++p,v+=r,z+=r*o){for(q=0,m=z,u=v;q<=r-4;q+=4,m+=o<<2,u+=4){t[u]=(n[m]*s+n[m+1]*B+n[m+2]*C+8192)>>14;t[u+1]=(n[m+o]*s+n[m+o+1]*B+n[m+o+2]*C+8192)>>14;t[u+2]=(n[m+l]*s+n[m+l+1]*B+n[m+l+2]*C+8192)>>14;t[u+3]=(n[m+k]*s+n[m+k+1]*B+n[m+k+2]*C+8192)>>14}for(;q<r;++q,++u,m+=o){t[u]=(n[m]*s+n[m+1]*B+n[m+2]*C+8192)>>14}}},resample:function(l,m,i,k){var j=l.rows,g=l.cols;if(j>k&&g>i){m.resize(i,k,l.channel);if(l.type&jsfeat.U8_t&&m.type&jsfeat.U8_t&&j*g/(k*i)<256){c(l,m,i,k)}else{f(l,m,i,k)}}},box_blur_gray:function(r,J,n,l){if(typeof l==="undefined"){l=0}var z=r.cols,E=r.rows,s=E<<1,v=z<<1;var D=0,u=0,t=0,m=0;var B=((n<<1)+1)|0;var p=(n+1)|0,H=(p+1)|0;var I=l&jsfeat.BOX_BLUR_NOSCALE?1:(1/(B*B));var C=jsfeat.cache.get_buffer((z*E)<<2);var j=0,G=0,o=0,q=0,k=0;var F=C.i32;var g=r.data;var A=0;J.resize(z,E,r.channel);for(t=0;t<E;++t){G=t;j=p*g[o];for(D=(o+1)|0,m=(o+n)|0;D<=m;++D){j+=g[D]}q=(o+p)|0;k=o;A=g[k];for(u=0;u<n;++u,G+=E){F[G]=j;j+=g[q]-A;q++}for(;u<z-H;u+=2,G+=s){F[G]=j;j+=g[q]-g[k];F[G+E]=j;j+=g[q+1]-g[k+1];q+=2;k+=2}for(;u<z-p;++u,G+=E){F[G]=j;j+=g[q]-g[k];q++;k++}A=g[q-1];for(;u<z;++u,G+=E){F[G]=j;j+=A-g[k];k++}o+=z}o=0;g=J.data;if(I==1){for(t=0;t<z;++t){G=t;j=p*F[o];for(D=(o+1)|0,m=(o+n)|0;D<=m;++D){j+=F[D]}q=o+p;k=o;A=F[k];for(u=0;u<n;++u,G+=z){g[G]=j;j+=F[q]-A;q++}for(;u<E-H;u+=2,G+=v){g[G]=j;j+=F[q]-F[k];g[G+z]=j;j+=F[q+1]-F[k+1];q+=2;k+=2}for(;u<E-p;++u,G+=z){g[G]=j;j+=F[q]-F[k];q++;k++}A=F[q-1];for(;u<E;++u,G+=z){g[G]=j;j+=A-F[k];k++}o+=E}}else{for(t=0;t<z;++t){G=t;j=p*F[o];for(D=(o+1)|0,m=(o+n)|0;D<=m;++D){j+=F[D]}q=o+p;k=o;A=F[k];for(u=0;u<n;++u,G+=z){g[G]=j*I;j+=F[q]-A;q++}for(;u<E-H;u+=2,G+=v){g[G]=j*I;j+=F[q]-F[k];g[G+z]=j*I;j+=F[q+1]-F[k+1];q+=2;k+=2}for(;u<E-p;++u,G+=z){g[G]=j*I;j+=F[q]-F[k];q++;k++}A=F[q-1];for(;u<E;++u,G+=z){g[G]=j*I;j+=A-F[k];k++}o+=E}}jsfeat.cache.put_buffer(C)},gaussian_blur:function(g,s,r,v){if(typeof v==="undefined"){v=0}if(typeof r==="undefined"){r=0}r=r==0?(Math.max(1,(4*v+1-1e-8))*2+1)|0:r;var x=r>>1;var t=g.cols,p=g.rows;var u=g.type,n=u&jsfeat.U8_t;s.resize(t,p,g.channel);var m=g.data,j=s.data;var k,i,q=(r+Math.max(p,t))|0;var l=jsfeat.cache.get_buffer(q<<2);var o=jsfeat.cache.get_buffer(r<<2);if(n){k=l.i32;i=o.i32}else{if(u&jsfeat.S32_t){k=l.i32;i=o.f32}else{k=l.f32;i=o.f32}}jsfeat.math.get_gaussian_kernel(r,v,i,u);if(n){e(k,m,j,t,p,i,r,x)}else{d(k,m,j,t,p,i,r,x)}jsfeat.cache.put_buffer(l);jsfeat.cache.put_buffer(o)},pyrdown:function(k,A,s,r){if(typeof s==="undefined"){s=0}if(typeof r==="undefined"){r=0}var q=k.cols,t=k.rows;var p=q>>1,l=t>>1;var B=p-(s<<1),u=l-(r<<1);var o=0,n=0,g=s+r*q,m=0,v=0,i=0;A.resize(p,l,k.channel);var z=k.data,j=A.data;for(n=0;n<u;++n){m=g;i=v;for(o=0;o<=B-2;o+=2,i+=2,m+=4){j[i]=(z[m]+z[m+1]+z[m+q]+z[m+q+1]+2)>>2;j[i+1]=(z[m+2]+z[m+3]+z[m+q+2]+z[m+q+3]+2)>>2}for(;o<B;++o,++i,m+=2){j[i]=(z[m]+z[m+1]+z[m+q]+z[m+q+1]+2)>>2}g+=q<<1;v+=p}},scharr_derivatives:function(j,G){var p=j.cols,s=j.rows;var H=p<<1,o=0,m=0,u=0,E,D,C,B,A,z;var v=0,t=0,r=0,i=0;var n,l;G.resize(p,s,2);var F=j.data,g=G.data;var k=jsfeat.cache.get_buffer((p+2)<<2);var q=jsfeat.cache.get_buffer((p+2)<<2);if(j.type&jsfeat.U8_t||j.type&jsfeat.S32_t){n=k.i32;l=q.i32}else{n=k.f32;l=q.f32}for(;m<s;++m,t+=p){v=((m>0?m-1:1)*p)|0;r=((m<s-1?m+1:s-2)*p)|0;i=(m*H)|0;for(o=0,u=1;o<=p-2;o+=2,u+=2){E=F[v+o],D=F[r+o];n[u]=((E+D)*3+(F[t+o])*10);l[u]=(D-E);E=F[v+o+1],D=F[r+o+1];n[u+1]=((E+D)*3+(F[t+o+1])*10);l[u+1]=(D-E)}for(;o<p;++o,++u){E=F[v+o],D=F[r+o];n[u]=((E+D)*3+(F[t+o])*10);l[u]=(D-E)}o=(p+1)|0;n[0]=n[1];n[o]=n[p];l[0]=l[1];l[o]=l[p];for(o=0;o<=p-4;o+=4){E=l[o+2],D=l[o+1],C=l[o+3],B=l[o+4],A=n[o+2],z=n[o+3];g[i++]=(A-n[o]);g[i++]=((E+l[o])*3+D*10);g[i++]=(z-n[o+1]);g[i++]=((C+D)*3+E*10);g[i++]=((n[o+4]-A));g[i++]=(((B+E)*3+C*10));g[i++]=((n[o+5]-z));g[i++]=(((l[o+5]+C)*3+B*10))}for(;o<p;++o){g[i++]=((n[o+2]-n[o]));g[i++]=(((l[o+2]+l[o])*3+l[o+1]*10))}}jsfeat.cache.put_buffer(k);jsfeat.cache.put_buffer(q)},sobel_derivatives:function(j,G){var p=j.cols,s=j.rows;var H=p<<1,o=0,m=0,u=0,E,D,C,B,A,z;var v=0,t=0,r=0,i=0;var n,l;G.resize(p,s,2);var F=j.data,g=G.data;var k=jsfeat.cache.get_buffer((p+2)<<2);var q=jsfeat.cache.get_buffer((p+2)<<2);if(j.type&jsfeat.U8_t||j.type&jsfeat.S32_t){n=k.i32;l=q.i32}else{n=k.f32;l=q.f32}for(;m<s;++m,t+=p){v=((m>0?m-1:1)*p)|0;r=((m<s-1?m+1:s-2)*p)|0;i=(m*H)|0;for(o=0,u=1;o<=p-2;o+=2,u+=2){E=F[v+o],D=F[r+o];n[u]=((E+D)+(F[t+o]*2));l[u]=(D-E);E=F[v+o+1],D=F[r+o+1];n[u+1]=((E+D)+(F[t+o+1]*2));l[u+1]=(D-E)}for(;o<p;++o,++u){E=F[v+o],D=F[r+o];n[u]=((E+D)+(F[t+o]*2));l[u]=(D-E)}o=(p+1)|0;n[0]=n[1];n[o]=n[p];l[0]=l[1];l[o]=l[p];for(o=0;o<=p-4;o+=4){E=l[o+2],D=l[o+1],C=l[o+3],B=l[o+4],A=n[o+2],z=n[o+3];g[i++]=(A-n[o]);g[i++]=(E+l[o]+D*2);g[i++]=(z-n[o+1]);g[i++]=(C+D+E*2);g[i++]=(n[o+4]-A);g[i++]=(B+E+C*2);g[i++]=(n[o+5]-z);g[i++]=(l[o+5]+C+B*2)}for(;o<p;++o){g[i++]=(n[o+2]-n[o]);g[i++]=(l[o+2]+l[o]+l[o+1]*2)}}jsfeat.cache.put_buffer(k);jsfeat.cache.put_buffer(q)},compute_integral_image:function(g,l,y,u){var t=g.cols|0,w=g.rows|0,o=g.data;var r=(t+1)|0;var B=0,z=0,h=0,x=0,q=0,n=0,A=0,m=0;if(l&&y){for(;q<r;++q){l[q]=0,y[q]=0}h=(r+1)|0,x=1;for(q=0,m=0;q<w;++q,++h,++x){B=z=0;for(n=0;n<=t-2;n+=2,m+=2,h+=2,x+=2){A=o[m];B+=A,z+=A*A;l[h]=l[x]+B;y[h]=y[x]+z;A=o[m+1];B+=A,z+=A*A;l[h+1]=l[x+1]+B;y[h+1]=y[x+1]+z}for(;n<t;++n,++m,++h,++x){A=o[m];B+=A,z+=A*A;l[h]=l[x]+B;y[h]=y[x]+z}}}else{if(l){for(;q<r;++q){l[q]=0}h=(r+1)|0,x=1;for(q=0,m=0;q<w;++q,++h,++x){B=0;for(n=0;n<=t-2;n+=2,m+=2,h+=2,x+=2){B+=o[m];l[h]=l[x]+B;B+=o[m+1];l[h+1]=l[x+1]+B}for(;n<t;++n,++m,++h,++x){B+=o[m];l[h]=l[x]+B}}}else{if(y){for(;q<r;++q){y[q]=0}h=(r+1)|0,x=1;for(q=0,m=0;q<w;++q,++h,++x){z=0;for(n=0;n<=t-2;n+=2,m+=2,h+=2,x+=2){A=o[m];z+=A*A;y[h]=y[x]+z;A=o[m+1];z+=A*A;y[h+1]=y[x+1]+z}for(;n<t;++n,++m,++h,++x){A=o[m];z+=A*A;y[h]=y[x]+z}}}}}if(u){for(q=0;q<r;++q){u[q]=0}h=(r+1)|0,x=0;for(q=0,m=0;q<w;++q,++h,++x){for(n=0;n<=t-2;n+=2,m+=2,h+=2,x+=2){u[h]=o[m]+u[x];u[h+1]=o[m+1]+u[x+1]}for(;n<t;++n,++m,++h,++x){u[h]=o[m]+u[x]}}h=(r+t)|0,x=t;for(q=0;q<w;++q,h+=r,x+=r){u[h]+=u[x]}for(n=t-1;n>0;--n){h=n+w*r,x=h-r;for(q=w;q>0;--q,h-=r,x-=r){u[h]+=u[x]+u[x+1]}}}},equalize_histogram:function(j,r){var s=j.cols,q=j.rows,o=j.data;r.resize(s,q,j.channel);var l=r.data,t=s*q;var p=0,n=0,k,g;var m=jsfeat.cache.get_buffer(256<<2);k=m.i32;for(;p<256;++p){k[p]=0}for(p=0;p<t;++p){++k[o[p]]}n=k[0];for(p=1;p<256;++p){n=k[p]+=n}g=255/t;for(p=0;p<t;++p){l[p]=(k[o[p]]*g+0.5)|0}jsfeat.cache.put_buffer(m)},canny:function(u,V,E,k){var C=u.cols,L=u.rows,S=u.data;V.resize(C,L,u.channel);var o=V.data;var K=0,H=0,q=0,A=C<<1,R=0,J=0,N=0,z=0,v=0,D=0;var g=0,U=0;var p=jsfeat.cache.get_buffer((L*A)<<2);var m=jsfeat.cache.get_buffer((3*(C+2))<<2);var n=jsfeat.cache.get_buffer(((L+2)*(C+2))<<2);var t=jsfeat.cache.get_buffer((L*C)<<2);var Q=m.i32;var T=n.i32;var r=t.i32;var G=p.i32;var l=new jsfeat.matrix_t(C,L,jsfeat.S32C2_t,p.data);var P=1,O=(C+2+1)|0,M=(2*(C+2)+1)|0,B=(C+2)|0,I=(B+1)|0,F=0;this.sobel_derivatives(u,l);if(E>k){K=E;E=k;k=K}K=(3*(C+2))|0;while(--K>=0){Q[K]=0}K=((L+2)*(C+2))|0;while(--K>=0){T[K]=0}for(;H<C;++H,q+=2){z=G[q],v=G[q+1];Q[O+H]=((z^(z>>31))-(z>>31))+((v^(v>>31))-(v>>31))}for(K=1;K<=L;++K,q+=A){if(K==L){H=M+C;while(--H>=M){Q[H]=0}}else{for(H=0;H<C;H++){z=G[q+(H<<1)],v=G[q+(H<<1)+1];Q[M+H]=((z^(z>>31))-(z>>31))+((v^(v>>31))-(v>>31))}}R=(q-A)|0;T[I-1]=0;J=0;for(H=0;H<C;++H,R+=2){N=Q[O+H];if(N>E){z=G[R];v=G[R+1];D=z^v;z=((z^(z>>31))-(z>>31))|0;v=((v^(v>>31))-(v>>31))|0;g=z*13573;U=g+((z+z)<<15);v<<=15;if(v<g){if(N>Q[O+H-1]&&N>=Q[O+H+1]){if(N>k&&!J&&T[I+H-B]!=2){T[I+H]=2;J=1;r[F++]=I+H}else{T[I+H]=1}continue}}else{if(v>U){if(N>Q[P+H]&&N>=Q[M+H]){if(N>k&&!J&&T[I+H-B]!=2){T[I+H]=2;J=1;r[F++]=I+H}else{T[I+H]=1}continue}}else{D=D<0?-1:1;if(N>Q[P+H-D]&&N>Q[M+H+D]){if(N>k&&!J&&T[I+H-B]!=2){T[I+H]=2;J=1;r[F++]=I+H}else{T[I+H]=1}continue}}}}T[I+H]=0;J=0}T[I+C]=0;I+=B;H=P;P=O;O=M;M=H}H=I-B-1;for(K=0;K<B;++K,++H){T[H]=0}while(F>0){I=r[--F];I-=B+1;if(T[I]==1){T[I]=2,r[F++]=I}I+=1;if(T[I]==1){T[I]=2,r[F++]=I}I+=1;if(T[I]==1){T[I]=2,r[F++]=I}I+=B;if(T[I]==1){T[I]=2,r[F++]=I}I-=2;if(T[I]==1){T[I]=2,r[F++]=I}I+=B;if(T[I]==1){T[I]=2,r[F++]=I}I+=1;if(T[I]==1){T[I]=2,r[F++]=I}I+=1;if(T[I]==1){T[I]=2,r[F++]=I}}I=B+1;P=0;for(K=0;K<L;++K,I+=B){for(H=0;H<C;++H){o[P++]=(T[I+H]==2)*255}}jsfeat.cache.put_buffer(p);jsfeat.cache.put_buffer(m);jsfeat.cache.put_buffer(n);jsfeat.cache.put_buffer(t)},warp_perspective:function(t,D,A,r){if(typeof r==="undefined"){r=0}var l=t.cols|0,v=t.rows|0,L=D.cols|0,j=D.rows|0;var H=t.data,q=D.data;var F=0,E=0,G=0,u=0,k=0,C=0,p=0,h=0,O=0,P=0,s=0,R=0,Q=0,N=0,M=0;var i=A.data;var o=i[0],n=i[1],m=i[2],K=i[3],J=i[4],I=i[5],B=i[6],z=i[7],w=i[8];for(var g=0;E<j;++E){h=n*E+m,O=J*E+I,P=z*E+w;for(F=0;F<L;++F,++g,h+=o,O+=K,P+=B){s=1/P;C=h*s,p=O*s;u=C|0,k=p|0;if(C>0&&p>0&&u<(l-1)&&k<(v-1)){R=Math.max(C-u,0);Q=Math.max(p-k,0);G=(l*k+u)|0;N=H[G]+R*(H[G+1]-H[G]);M=H[G+l]+R*(H[G+l+1]-H[G+l]);q[g]=N+Q*(M-N)}else{q[g]=r}}}},warp_affine:function(k,K,p,J){if(typeof J==="undefined"){J=0}var u=k.cols,z=k.rows,j=K.cols,v=K.rows;var E=k.data,i=K.data;var o=0,n=0,I=0,q=0,A=0,m=0,w=0,G=0,D=0,h=0,g=0;var l=p.data;var t=l[0],s=l[1],r=l[2],H=l[3],F=l[4],C=l[5];for(var B=0;n<v;++n){m=s*n+r;w=F*n+C;for(o=0;o<j;++o,++B,m+=t,w+=H){q=m|0;A=w|0;if(q>=0&&A>=0&&q<(u-1)&&A<(z-1)){G=m-q;D=w-A;I=u*A+q;h=E[I]+G*(E[I+1]-E[I]);g=E[I+u]+G*(E[I+u+1]-E[I+u]);i[B]=h+D*(g-h)}else{i[B]=J}}}},skindetector:function(o,p){var n,m,h,k;var l=o.width*o.height;while(l--){k=l*4;n=o.data[k];m=o.data[k+1];h=o.data[k+2];if((n>95)&&(m>40)&&(h>20)&&(n>m)&&(n>h)&&(n-Math.min(m,h)>15)&&(Math.abs(n-m)>15)){p[l]=255}else{p[l]=0}}}}})();b.imgproc=a})(jsfeat);(function(a){var b=(function(){var h=new Int32Array([0,3,1,3,2,2,3,1,3,0,3,-1,2,-2,1,-3,0,-3,-1,-3,-2,-2,-3,-1,-3,0,-3,1,-2,2,-1,3]);var f=new Uint8Array(512);var e=new Int32Array(25);var i=new Int32Array(25);var d=function(l,n,o){var j=0;var m=h;for(;j<o;++j){l[j]=m[j<<1]+m[(j<<1)+1]*n}for(;j<25;++j){l[j]=l[j-o]}},g=function(j,n,l,r,p){var q=25,o=0,w=j[n];var m=p,t=0,u=0,s=0;for(;o<q;++o){r[o]=w-j[n+l[o]]}for(o=0;o<16;o+=2){t=Math.min(r[o+1],r[o+2]);t=Math.min(t,r[o+3]);if(t<=m){continue}t=Math.min(t,r[o+4]);t=Math.min(t,r[o+5]);t=Math.min(t,r[o+6]);t=Math.min(t,r[o+7]);t=Math.min(t,r[o+8]);m=Math.max(m,Math.min(t,r[o]));m=Math.max(m,Math.min(t,r[o+9]))}u=-m;for(o=0;o<16;o+=2){s=Math.max(r[o+1],r[o+2]);s=Math.max(s,r[o+3]);s=Math.max(s,r[o+4]);s=Math.max(s,r[o+5]);if(s>=u){continue}s=Math.max(s,r[o+6]);s=Math.max(s,r[o+7]);s=Math.max(s,r[o+8]);u=Math.min(u,Math.max(s,r[o]));u=Math.min(u,Math.max(s,r[o+9]))}return -u-1};var c=20;return{set_threshold:function(j){c=Math.min(Math.max(j,0),255);for(var k=-255;k<=255;++k){f[(k+255)]=(k<-c?1:(k>c?2:0))}return c},detect:function(L,H,D){if(typeof D==="undefined"){D=3}var A=8,t=25;var u=L.data,X=L.cols,ar=L.rows;var ap=0,an=0,al=0,E=0,W=0,aq=0;var B=jsfeat.cache.get_buffer(3*X);var O=jsfeat.cache.get_buffer(((X+1)*3)<<2);var I=B.u8;var F=O.i32;var M=e;var J=i;var y=Math.max(3,D);var Z=Math.min((ar-2),(ar-D));var z=Math.max(3,D);var aa=Math.min((X-3),(X-D));var ah=0,P=0,C;var Q=g;var G=f;var p=c;var Y=0,ao=0,au=0,aw=0,U=0,V=0,av=0,R=0,at=0;var T=0,S=0,o=0;d(M,X,16);var am=M[0];var ak=M[1];var aj=M[2];var ai=M[3];var ag=M[4];var af=M[5];var ae=M[6];var ad=M[7];var ac=M[8];var ab=M[9];var s=M[10];var r=M[11];var q=M[12];var n=M[13];var m=M[14];var l=M[15];for(ap=0;ap<X*3;++ap){I[ap]=0}for(ap=y;ap<Z;++ap){av=((ap*X)+z)|0;aq=(ap-3)%3;V=(aq*X)|0;U=(aq*(X+1))|0;for(an=0;an<X;++an){I[V+an]=0}aw=0;if(ap<(Z-1)){an=z;for(;an<aa;++an,++av){Y=u[av];ao=(-Y+255);au=(G[ao+u[av+am]]|G[ao+u[av+ac]]);if(au==0){continue}au&=(G[ao+u[av+aj]]|G[ao+u[av+s]]);au&=(G[ao+u[av+ag]]|G[ao+u[av+q]]);au&=(G[ao+u[av+ae]]|G[ao+u[av+m]]);if(au==0){continue}au&=(G[ao+u[av+ak]]|G[ao+u[av+ab]]);au&=(G[ao+u[av+ai]]|G[ao+u[av+r]]);au&=(G[ao+u[av+af]]|G[ao+u[av+n]]);au&=(G[ao+u[av+ad]]|G[ao+u[av+l]]);if(au&1){E=(Y-p);ah=0;for(al=0;al<t;++al){W=u[(av+M[al])];if(W<E){++ah;if(ah>A){++aw;F[U+aw]=an;I[V+an]=Q(u,av,M,J,p);break}}else{ah=0}}}if(au&2){E=(Y+p);ah=0;for(al=0;al<t;++al){W=u[(av+M[al])];if(W>E){++ah;if(ah>A){++aw;F[U+aw]=an;I[V+an]=Q(u,av,M,J,p);break}}else{ah=0}}}}}F[U+X]=aw;if(ap==y){continue}aq=(ap-4+3)%3;R=(aq*X)|0;U=(aq*(X+1))|0;aq=(ap-5+3)%3;at=(aq*X)|0;aw=F[U+X];for(al=0;al<aw;++al){an=F[U+al];T=(an+1)|0;S=(an-1)|0;o=I[R+an];if((o>I[R+T]&&o>I[R+S]&&o>I[at+S]&&o>I[at+an]&&o>I[at+T]&&o>I[V+S]&&o>I[V+an]&&o>I[V+T])){C=H[P];C.x=an,C.y=(ap-1),C.score=o;P++}}}jsfeat.cache.put_buffer(B);jsfeat.cache.put_buffer(O);return P}}})();a.fast_corners=b;b.set_threshold(20)})(jsfeat);(function(b){var a=(function(){var d=function(e,l,q,i,r,g,p,n,k,j){var m=0,o=0,f=(n*q+p)|0,s=f;for(m=n;m<j;++m,f+=q,s=f){for(o=p;o<k;++o,++s){l[s]=-4*e[s]+e[s+r]+e[s-r]+e[s+g]+e[s-g]}}};var c=function(e,f,k,m,g,l,h){var o=-2*e[f]+e[f+m]+e[f-m];var i=-2*e[f]+e[f+g]+e[f-g];var n=e[f+l]+e[f-l]-e[f+h]-e[f-h];var j=(Math.sqrt(((o-i)*(o-i)+4*n*n)))|0;return Math.min(Math.abs(k-j),Math.abs(-(k+j)))};return{laplacian_threshold:30,min_eigen_value_threshold:25,detect:function(l,A,z){if(typeof z==="undefined"){z=5}var o=0,n=0;var p=l.cols,B=l.rows,q=l.data;var H=5,f=(5*p)|0;var G=(3+3*p)|0,g=(3-3*p)|0;var e=jsfeat.cache.get_buffer((p*B)<<2);var j=e.i32;var i=0,k=0,m=0,r=0,v;var u=0;var F=this.laplacian_threshold;var D=this.min_eigen_value_threshold;var t=Math.max(5,z)|0;var s=Math.max(3,z)|0;var E=Math.min(p-5,p-z)|0;var C=Math.min(B-3,B-z)|0;o=p*B;while(--o>=0){j[o]=0}d(q,j,p,B,H,f,t,s,E,C);k=(s*p+t)|0;for(n=s;n<C;++n,k+=p){for(o=t,m=k;o<E;++o,++m){i=j[m];if((i<-F&&i<j[m-1]&&i<j[m+1]&&i<j[m-p]&&i<j[m+p]&&i<j[m-p-1]&&i<j[m+p-1]&&i<j[m-p+1]&&i<j[m+p+1])||(i>F&&i>j[m-1]&&i>j[m+1]&&i>j[m-p]&&i>j[m+p]&&i>j[m-p-1]&&i>j[m+p-1]&&i>j[m-p+1]&&i>j[m+p+1])){r=c(q,m,i,H,f,G,g);if(r>D){v=A[u];v.x=o,v.y=n,v.score=r;++u;++o,++m}}}}jsfeat.cache.put_buffer(e);return u}}})();b.yape06=a})(jsfeat);(function(a){var b=(function(){var d=function(l,m,k){var j=0;var h,n;h=k;for(n=0;n<h;n++,j++){h=(Math.sqrt((k*k-n*n))+0.5)|0;m[j]=(h+l*n)}for(h--;h<n&&h>=0;h--,j++){n=(Math.sqrt((k*k-h*h))+0.5)|0;m[j]=(h+l*n)}for(;-h<n;h--,j++){n=(Math.sqrt((k*k-h*h))+0.5)|0;m[j]=(h+l*n)}for(n--;n>=0;n--,j++){h=(-Math.sqrt((k*k-n*n))-0.5)|0;m[j]=(h+l*n)}for(;n>h;n--,j++){h=(-Math.sqrt((k*k-n*n))-0.5)|0;m[j]=(h+l*n)}for(h++;h<=0;h++,j++){n=(-Math.sqrt((k*k-h*h))-0.5)|0;m[j]=(h+l*n)}for(;h<-n;h++,j++){n=(-Math.sqrt((k*k-h*h))-0.5)|0;m[j]=(h+l*n)}for(n++;n<0;n++,j++){h=(Math.sqrt((k*k-n*n))+0.5)|0;m[j]=(h+l*n)}m[j]=m[0];m[j+1]=m[1];return j};var g=function(h,j,i){var k=0;if(h[j+1]!=0){k++}if(h[j-1]!=0){k++}if(h[j+i]!=0){k++}if(h[j+i+1]!=0){k++}if(h[j+i-1]!=0){k++}if(h[j-i]!=0){k++}if(h[j-i+1]!=0){k++}if(h[j-i-1]!=0){k++}return k};var c=function(l,m,i,k,j){var h,n;if(i>0){m-=k*j;for(n=-j;n<=j;++n){for(h=-j;h<=j;++h){if(l[m+h]>i){return false}}m+=k}}else{m-=k*j;for(n=-j;n<=j;++n){for(h=-j;h<=j;++h){if(l[m+h]<i){return false}}m+=k}}return true};var e=function(s,r,m,u,p,i,l,n){var k=0;var q=0,o=(l-1)|0;var j=0,w=0,v=0,t=0;var h=0;j=s[r+i[q]];if((j<=p)){if((j>=u)){w=s[r+i[o]];if((w<=p)){if((w>=u)){m[r]=0;return}else{o++;v=s[r+i[o]];if((v>p)){o++;t=s[r+i[o]];if((t>p)){h=3}else{if((t<u)){h=6}else{m[r]=0;return}}}else{o++;t=s[r+i[o]];if((t>p)){h=7}else{if((t<u)){h=2}else{m[r]=0;return}}}}}else{o++;v=s[r+i[o]];if((v>p)){o++;t=s[r+i[o]];if((t>p)){h=3}else{if((t<u)){h=6}else{m[r]=0;return}}}else{if((v<u)){o++;t=s[r+i[o]];if((t>p)){h=7}else{if((t<u)){h=2}else{m[r]=0;return}}}else{m[r]=0;return}}}}else{w=s[r+i[o]];if((w>p)){m[r]=0;return}o++;v=s[r+i[o]];if((v>p)){m[r]=0;return}o++;t=s[r+i[o]];if((t>p)){m[r]=0;return}h=1}}else{w=s[r+i[o]];if((w<u)){m[r]=0;return}o++;v=s[r+i[o]];if((v<u)){m[r]=0;return}o++;t=s[r+i[o]];if((t<u)){m[r]=0;return}h=0}for(q=1;q<=l;q++){j=s[r+i[q]];switch(h){case 0:if((j>p)){v=t;o++;t=s[r+i[o]];if((t<u)){m[r]=0;return}k-=j+v;h=0;break}if((j<u)){if((v>p)){m[r]=0;return}if((t>p)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((t>p)){m[r]=0;return}k-=j+v;h=8;break}if((v<=p)){m[r]=0;return}if((t<=p)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((t>p)){k-=j+v;h=3;break}if((t<u)){k-=j+v;h=6;break}m[r]=0;return;case 1:if((j<u)){v=t;o++;t=s[r+i[o]];if((t>p)){m[r]=0;return}k-=j+v;h=1;break}if((j>p)){if((v<u)){m[r]=0;return}if((t<u)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((t<u)){m[r]=0;return}k-=j+v;h=9;break}if((v>=u)){m[r]=0;return}if((t>=u)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((t<u)){k-=j+v;h=2;break}if((t>p)){k-=j+v;h=7;break}m[r]=0;return;case 2:if((j>p)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((j<u)){if((t>p)){m[r]=0;return}k-=j+v;h=4;break}if((t>p)){k-=j+v;h=7;break}if((t<u)){k-=j+v;h=2;break}m[r]=0;return;case 3:if((j<u)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((j>p)){if((t<u)){m[r]=0;return}k-=j+v;h=5;break}if((t>p)){k-=j+v;h=3;break}if((t<u)){k-=j+v;h=6;break}m[r]=0;return;case 4:if((j>p)){m[r]=0;return}if((j<u)){v=t;o++;t=s[r+i[o]];if((t>p)){m[r]=0;return}k-=j+v;h=1;break}if((t>=u)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((t<u)){k-=j+v;h=2;break}if((t>p)){k-=j+v;h=7;break}m[r]=0;return;case 5:if((j<u)){m[r]=0;return}if((j>p)){v=t;o++;t=s[r+i[o]];if((t<u)){m[r]=0;return}k-=j+v;h=0;break}if((t<=p)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((t>p)){k-=j+v;h=3;break}if((t<u)){k-=j+v;h=6;break}m[r]=0;return;case 7:if((j>p)){m[r]=0;return}if((j<u)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((t>p)){k-=j+v;h=3;break}if((t<u)){k-=j+v;h=6;break}m[r]=0;return;case 6:if((j>p)){m[r]=0;return}if((j<u)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((t<u)){k-=j+v;h=2;break}if((t>p)){k-=j+v;h=7;break}m[r]=0;return;case 8:if((j>p)){if((t<u)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((t<u)){m[r]=0;return}k-=j+v;h=9;break}if((j<u)){v=t;o++;t=s[r+i[o]];if((t>p)){m[r]=0;return}k-=j+v;h=1;break}m[r]=0;return;case 9:if((j<u)){if((t>p)){m[r]=0;return}v=t;o++;t=s[r+i[o]];if((t>p)){m[r]=0;return}k-=j+v;h=8;break}if((j>p)){v=t;o++;t=s[r+i[o]];if((t<u)){m[r]=0;return}k-=j+v;h=0;break}m[r]=0;return;default:break}}m[r]=(k+n*s[r])};var f=(function(){function h(i,j,k){this.dirs=new Int32Array(1024);this.dirs_count=d(i,this.dirs,k)|0;this.scores=new Int32Array(i*j);this.radius=k|0}return h})();return{level_tables:[],tau:7,init:function(m,j,h,l){if(typeof l==="undefined"){l=1}var k;h=Math.min(h,7);h=Math.max(h,3);for(k=0;k<l;++k){this.level_tables[k]=new f(m>>k,j>>k,h)}},detect:function(k,J,G){if(typeof G==="undefined"){G=4}var A=this.level_tables[0];var i=A.radius|0,q=(i-1)|0;var m=A.dirs;var n=A.dirs_count|0;var v=n>>1;var O=k.data,u=k.cols|0,K=k.rows|0,N=u>>1;var H=A.scores;var s=0,r=0,j=0,l=0,o=0,p=0,z=0,I=0;var F=this.tau|0;var D=0,E;var C=Math.max(i+1,G)|0;var B=Math.max(i+1,G)|0;var M=Math.min(u-i-2,u-G)|0;var L=Math.min(K-i-2,K-G)|0;j=(B*u+C)|0;for(r=B;r<L;++r,j+=u){for(s=C,l=j;s<M;++s,++l){o=O[l]+F,p=O[l]-F;if(p<O[l+i]&&O[l+i]<o&&p<O[l-i]&&O[l-i]<o){H[l]=0}else{e(O,l,H,p,o,m,v,n)}}}j=(B*u+C)|0;for(r=B;r<L;++r,j+=u){for(s=C,l=j;s<M;++s,++l){I=H[l];z=Math.abs(I);if(z<5){++s,++l}else{if(g(H,l,u)>=3&&c(H,l,I,N,i)){E=J[D];E.x=s,E.y=r,E.score=z;++D;s+=q,l+=q}}}}return D}}})();a.yape=b})(jsfeat);(function(b){var a=(function(){var d=new Int32Array([8,-3,9,5,4,2,7,-12,-11,9,-8,2,7,-12,12,-13,2,-13,2,12,1,-7,1,6,-2,-10,-2,-4,-13,-13,-11,-8,-13,-3,-12,-9,10,4,11,9,-13,-8,-8,-9,-11,7,-9,12,7,7,12,6,-4,-5,-3,0,-13,2,-12,-3,-9,0,-7,5,12,-6,12,-1,-3,6,-2,12,-6,-13,-4,-8,11,-13,12,-8,4,7,5,1,5,-3,10,-3,3,-7,6,12,-8,-7,-6,-2,-2,11,-1,-10,-13,12,-8,10,-7,3,-5,-3,-4,2,-3,7,-10,-12,-6,11,5,-12,6,-7,5,-6,7,-1,1,0,4,-5,9,11,11,-13,4,7,4,12,2,-1,4,4,-4,-12,-2,7,-8,-5,-7,-10,4,11,9,12,0,-8,1,-13,-13,-2,-8,2,-3,-2,-2,3,-6,9,-4,-9,8,12,10,7,0,9,1,3,7,-5,11,-10,-13,-6,-11,0,10,7,12,1,-6,-3,-6,12,10,-9,12,-4,-13,8,-8,-12,-13,0,-8,-4,3,3,7,8,5,7,10,-7,-1,7,1,-12,3,-10,5,6,2,-4,3,-10,-13,0,-13,5,-13,-7,-12,12,-13,3,-11,8,-7,12,-4,7,6,-10,12,8,-9,-1,-7,-6,-2,-5,0,12,-12,5,-7,5,3,-10,8,-13,-7,-7,-4,5,-3,-2,-1,-7,2,9,5,-11,-11,-13,-5,-13,-1,6,0,-1,5,-3,5,2,-4,-13,-4,12,-9,-6,-9,6,-12,-10,-8,-4,10,2,12,-3,7,12,12,12,-7,-13,-6,5,-4,9,-3,4,7,-1,12,2,-7,6,-5,1,-13,11,-12,5,-3,7,-2,-6,7,-8,12,-7,-13,-7,-11,-12,1,-3,12,12,2,-6,3,0,-4,3,-2,-13,-1,-13,1,9,7,1,8,-6,1,-1,3,12,9,1,12,6,-1,-9,-1,3,-13,-13,-10,5,7,7,10,12,12,-5,12,9,6,3,7,11,5,-13,6,10,2,-12,2,3,3,8,4,-6,2,6,12,-13,9,-12,10,3,-8,4,-7,9,-11,12,-4,-6,1,12,2,-8,6,-9,7,-4,2,3,3,-2,6,3,11,0,3,-3,8,-8,7,8,9,3,-11,-5,-6,-4,-10,11,-5,10,-5,-8,-3,12,-10,5,-9,0,8,-1,12,-6,4,-6,6,-11,-10,12,-8,7,4,-2,6,7,-2,0,-2,12,-5,-8,-5,2,7,-6,10,12,-9,-13,-8,-8,-5,-13,-5,-2,8,-8,9,-13,-9,-11,-9,0,1,-8,1,-2,7,-4,9,1,-2,1,-1,-4,11,-6,12,-11,-12,-9,-6,4,3,7,7,12,5,5,10,8,0,-4,2,8,-9,12,-5,-13,0,7,2,12,-1,2,1,7,5,11,7,-9,3,5,6,-8,-13,-4,-8,9,-5,9,-3,-3,-4,-7,-3,-12,6,5,8,0,-7,6,-6,12,-13,6,-5,-2,1,-10,3,10,4,1,8,-4,-2,-2,2,-13,2,-12,12,12,-2,-13,0,-6,4,1,9,3,-6,-10,-3,-5,-3,-13,-1,1,7,5,12,-11,4,-2,5,-7,-13,9,-9,-5,7,1,8,6,7,-8,7,6,-7,-4,-7,1,-8,11,-7,-8,-13,6,-12,-8,2,4,3,9,10,-5,12,3,-6,-5,-6,7,8,-3,9,-8,2,-12,2,8,-11,-2,-10,3,-12,-13,-7,-9,-11,0,-10,-5,5,-3,11,8,-2,-13,-1,12,-1,-8,0,9,-13,-11,-12,-5,-10,-2,-10,11,-3,9,-2,-13,2,-3,3,2,-9,-13,-4,0,-4,6,-3,-10,-4,12,-2,-7,-6,-11,-4,9,6,-3,6,11,-13,11,-5,5,11,11,12,6,7,-5,12,-2,-1,12,0,7,-4,-8,-3,-2,-7,1,-6,7,-13,-12,-8,-13,-7,-2,-6,-8,-8,5,-6,-9,-5,-1,-4,5,-13,7,-8,10,1,5,5,-13,1,0,10,-13,9,12,10,-1,5,-8,10,-9,-1,11,1,-13,-9,-3,-6,2,-1,-10,1,12,-13,1,-8,-10,8,-11,10,-6,2,-13,3,-6,7,-13,12,-9,-10,-10,-5,-7,-10,-8,-8,-13,4,-6,8,5,3,12,8,-13,-4,2,-3,-3,5,-13,10,-12,4,-13,5,-1,-9,9,-4,3,0,3,3,-9,-12,1,-6,1,3,2,4,-8,-10,-10,-10,9,8,-13,12,12,-8,-12,-6,-5,2,2,3,7,10,6,11,-8,6,8,8,-12,-7,10,-6,5,-3,-9,-3,9,-1,-13,-1,5,-3,-7,-3,4,-8,-2,-8,3,4,2,12,12,2,-5,3,11,6,-9,11,-13,3,-1,7,12,11,-1,12,4,-3,0,-3,6,4,-11,4,12,2,-4,2,1,-10,-6,-8,1,-13,7,-11,1,-13,12,-11,-13,6,0,11,-13,0,-1,1,4,-13,3,-9,-2,-9,8,-6,-3,-13,-6,-8,-2,5,-9,8,10,2,7,3,-9,-1,-6,-1,-1,9,5,11,-2,11,-3,12,-8,3,0,3,5,-1,4,0,10,3,-6,4,5,-13,0,-10,5,5,8,12,11,8,9,9,-6,7,-4,8,-12,-10,4,-10,9,7,3,12,4,9,-7,10,-2,7,0,12,-2,-1,-6,0,-11]);var c=new jsfeat.matrix_t(3,3,jsfeat.F32_t|jsfeat.C1_t);var f=new jsfeat.matrix_t(32,32,jsfeat.U8_t|jsfeat.C1_t);var e=function(l,n,k,i,h,j){var m=Math.cos(k);var g=Math.sin(k);c.data[0]=m,c.data[1]=-g,c.data[2]=(-m+g)*j*0.5+i,c.data[3]=g,c.data[4]=m,c.data[5]=(-g-m)*j*0.5+h;jsfeat.imgproc.warp_affine(l,n,c,128)};return{describe:function(j,u,g,B){var r=32;var x=0,A=0,q=0,p=0,z=0;var o=0,m=0,D=0;var C=j.data,n=j.cols,y=j.rows;var t=f.data;var v=16*32+16;var k=0;if(!(B.type&jsfeat.U8_t)){B.type=jsfeat.U8_t;B.cols=r;B.rows=g;B.channel=1;B.allocate()}else{B.resize(r,g,1)}var l=B.data;var s=0;for(x=0;x<g;++x){q=u[x].x;p=u[x].y;z=u[x].angle;e(j,f,z,q,p,32);k=0;for(A=0;A<r;++A){o=t[v+d[k+1]*32+d[k]];k+=2;m=t[v+d[k+1]*32+d[k]];k+=2;D=(o<m)|0;o=t[v+d[k+1]*32+d[k]];k+=2;m=t[v+d[k+1]*32+d[k]];k+=2;D|=(o<m)<<1;o=t[v+d[k+1]*32+d[k]];k+=2;m=t[v+d[k+1]*32+d[k]];k+=2;D|=(o<m)<<2;o=t[v+d[k+1]*32+d[k]];k+=2;m=t[v+d[k+1]*32+d[k]];k+=2;D|=(o<m)<<3;o=t[v+d[k+1]*32+d[k]];k+=2;m=t[v+d[k+1]*32+d[k]];k+=2;D|=(o<m)<<4;o=t[v+d[k+1]*32+d[k]];k+=2;m=t[v+d[k+1]*32+d[k]];k+=2;D|=(o<m)<<5;o=t[v+d[k+1]*32+d[k]];k+=2;m=t[v+d[k+1]*32+d[k]];k+=2;D|=(o<m)<<6;o=t[v+d[k+1]*32+d[k]];k+=2;m=t[v+d[k+1]*32+d[k]];k+=2;D|=(o<m)<<7;l[s+A]=D}s+=r}}}})();b.orb=a})(jsfeat);(function(b){var a=(function(){var c=jsfeat.imgproc.scharr_derivatives;return{track:function(n,u,ap,aL,k,N,R,K,f,q){if(typeof R==="undefined"){R=30}if(typeof K==="undefined"){K=new Uint8Array(k)}if(typeof f==="undefined"){f=0.01}if(typeof q==="undefined"){q=0.0001}var e=(N-1)*0.5;var h=(N*N)|0;var aa=h<<1;var r=n.data,S=u.data;var g=r[0].data,F=S[0].data;var M=r[0].cols,aB=r[0].rows,ay=0,aH=0;var az=jsfeat.cache.get_buffer(h<<2);var s=jsfeat.cache.get_buffer(aa<<2);var t=jsfeat.cache.get_buffer((aB*(M<<1))<<2);var V=new jsfeat.matrix_t(M,aB,jsfeat.S32C2_t,t.data);var w=az.i32;var ac=s.i32;var aA=t.i32;var ab=0,I=0,aM=0,at=0,aI=0,au=0;var am=0,aF=0,aD=0,af=0,ae=0;var E=0,z=0,Y=0,W=0;var p=0,o=0,aE=0,aC=0;var Q=0,P=0,J=0,H=0,ai=0,ak=0,l=0;var d=0,A=0,O=0;var U=0,T=0,aw=0,av=0;var ah=14;var C=14;var Z=C-5;var ax=(1<<((Z)-1));var ad=(1<<ah);var m=(1<<((C)-1));var X=1/(1<<20);var aK=0,aJ=0,ar=0,aq=0,al=0,v=0,B=0;var ao=0,an=0,ag=0,aj=0,aG=0;var G=1.1920929e-7;f*=f;for(;Q<k;++Q){K[Q]=1}var L=(n.levels-1)|0;ai=L;for(;ai>=0;--ai){am=(1/(1<<ai));ay=M>>ai;aH=aB>>ai;ab=ay<<1;g=r[ai].data;F=S[ai].data;A=(ay-N)|0;O=(aH-N)|0;c(r[ai],V);for(ak=0;ak<k;++ak){Q=ak<<1;P=Q+1;aF=ap[Q]*am;aD=ap[P]*am;if(ai==L){af=aF;ae=aD}else{af=aL[Q]*2;ae=aL[P]*2}aL[Q]=af;aL[P]=ae;aF-=e;aD-=e;p=aF|0;o=aD|0;J=(p<=d)|(p>=A)|(o<=d)|(o>=O);if(J!=0){if(ai==0){K[ak]=0}continue}U=aF-p;T=aD-o;aK=(((1-U)*(1-T)*ad)+0.5)|0;aJ=((U*(1-T)*ad)+0.5)|0;ar=(((1-U)*T*ad)+0.5)|0;aq=(ad-aK-aJ-ar);ao=0,an=0,ag=0;for(H=0;H<N;++H){I=((H+o)*ay+p)|0;aM=I<<1;at=(H*N)|0;aI=at<<1;for(J=0;J<N;++J,++I,++at,aM+=2){al=((g[I])*aK+(g[I+1])*aJ+(g[I+ay])*ar+(g[I+ay+1])*aq);al=(((al)+ax)>>(Z));v=(aA[aM]*aK+aA[aM+2]*aJ+aA[aM+ab]*ar+aA[aM+ab+2]*aq);v=(((v)+m)>>(C));B=(aA[aM+1]*aK+aA[aM+3]*aJ+aA[aM+ab+1]*ar+aA[aM+ab+3]*aq);B=(((B)+m)>>(C));w[at]=al;ac[aI++]=v;ac[aI++]=B;ao+=v*v;an+=v*B;ag+=B*B}}ao*=X;an*=X;ag*=X;aj=ao*ag-an*an;aG=(ag+ao-Math.sqrt((ao-ag)*(ao-ag)+4*an*an))/aa;if(aG<q||aj<G){if(ai==0){K[ak]=0}continue}aj=1/aj;af-=e;ae-=e;E=0;z=0;for(l=0;l<R;++l){aE=af|0;aC=ae|0;J=(aE<=d)|(aE>=A)|(aC<=d)|(aC>=O);if(J!=0){if(ai==0){K[ak]=0}break}U=af-aE;T=ae-aC;aK=(((1-U)*(1-T)*ad)+0.5)|0;aJ=((U*(1-T)*ad)+0.5)|0;ar=(((1-U)*T*ad)+0.5)|0;aq=(ad-aK-aJ-ar);aw=0,av=0;for(H=0;H<N;++H){au=((H+aC)*ay+aE)|0;at=(H*N)|0;aI=at<<1;for(J=0;J<N;++J,++au,++at){al=((F[au])*aK+(F[au+1])*aJ+(F[au+ay])*ar+(F[au+ay+1])*aq);al=(((al)+ax)>>(Z));al=(al-w[at]);aw+=al*ac[aI++];av+=al*ac[aI++]}}aw*=X;av*=X;Y=((an*av-ag*aw)*aj);W=((an*aw-ao*av)*aj);af+=Y;ae+=W;aL[Q]=af+e;aL[P]=ae+e;if(Y*Y+W*W<=f){break}if(l>0&&Math.abs(Y+E)<0.01&&Math.abs(W+z)<0.01){aL[Q]-=Y*0.5;aL[P]-=W*0.5;break}E=Y;z=W}}}jsfeat.cache.put_buffer(az);jsfeat.cache.put_buffer(s);jsfeat.cache.put_buffer(t)}}})();b.optical_flow_lk=a})(jsfeat);(function(b){var a=(function(){var c=function(e,d){var f=(e.width*0.25+0.5)|0;return d.x<=e.x+f&&d.x>=e.x-f&&d.y<=e.y+f&&d.y>=e.y-f&&d.width<=(e.width*1.5+0.5)|0&&(d.width*1.5+0.5)|0>=e.width};return{edges_density:0.07,detect_single_scale:function(E,ad,af,q,d,f,D,B){var z=(B.size[0]*D)|0,N=(B.size[1]*D)|0,V=(0.5*D+1.5)|0,U=V;var Z,X,W,Q,O,T=(d-z)|0,R=(f-N)|0;var H=(d+1)|0,w,p,r,S;var e=1/(z*N);var t,o,l,u,s,ae,A,g=true,L,h,n,G,m;var M,K,J,I,v,C;var ac=0,ab=z,aa=N*H,Y=aa+z;var F=((z*N)*255*this.edges_density)|0;var P=[];for(O=0;O<R;O+=U){ac=O*H;for(Q=0;Q<T;Q+=V,ac+=V){p=E[ac]-E[ac+ab]-E[ac+aa]+E[ac+Y];if(q){w=(q[ac]-q[ac+ab]-q[ac+aa]+q[ac+Y]);if(w<F||p<20){Q+=V,ac+=V;continue}}p*=e;r=(ad[ac]-ad[ac+ab]-ad[ac+aa]+ad[ac+Y])*e-p*p;S=r>0?Math.sqrt(r):1;t=B.complexClassifiers;s=t.length;g=true;for(Z=0;Z<s;++Z){o=t[Z];L=o.threshold;l=o.simpleClassifiers;ae=l.length;h=0;for(X=0;X<ae;++X){u=l[X];n=0;m=u.features;A=m.length;if(u.tilted===1){for(W=0;W<A;++W){G=m[W];M=~~(Q+G[0]*D)+~~(O+G[1]*D)*H;v=~~(G[2]*D);C=~~(G[3]*D);K=v*H;J=C*H;n+=(af[M]-af[M+v+K]-af[M-C+J]+af[M+v-C+K+J])*G[4]}}else{for(W=0;W<A;++W){G=m[W];M=~~(Q+G[0]*D)+~~(O+G[1]*D)*H;v=~~(G[2]*D);C=~~(G[3]*D);J=C*H;n+=(E[M]-E[M+v]-E[M+J]+E[M+J+v])*G[4]}}h+=(n*e<u.threshold*S)?u.left_val:u.right_val}if(h<L){g=false;break}}if(g){P.push({x:Q,y:O,width:z,height:N,neighbor:1,confidence:h});Q+=V,ac+=V}}}return P},detect_multi_scale:function(e,m,f,h,d,n,i,g,k){if(typeof g==="undefined"){g=1.2}if(typeof k==="undefined"){k=1}var o=i.size[0];var j=i.size[1];var l=[];while(k*o<d&&k*j<n){l=l.concat(this.detect_single_scale(e,m,f,h,d,n,k,i));k*=g}return l},group_rectangles:function(g,l){if(typeof l==="undefined"){l=1}var y,v,q=g.length;var r=[];for(y=0;y<q;++y){r[y]={parent:-1,element:g[y],rank:0}}for(y=0;y<q;++y){if(!r[y].element){continue}var t=y;while(r[t].parent!=-1){t=r[t].parent}for(v=0;v<q;++v){if(y!=v&&r[v].element&&c(r[y].element,r[v].element)){var s=v;while(r[s].parent!=-1){s=r[s].parent}if(s!=t){if(r[t].rank>r[s].rank){r[s].parent=t}else{r[t].parent=s;if(r[t].rank==r[s].rank){r[s].rank++}t=s}var A,d=v;while(r[d].parent!=-1){A=d;d=r[d].parent;r[A].parent=t}d=y;while(r[d].parent!=-1){A=d;d=r[d].parent;r[A].parent=t}}}}}var w=[];var o=0;for(y=0;y<q;y++){v=-1;var e=y;if(r[e].element){while(r[e].parent!=-1){e=r[e].parent}if(r[e].rank>=0){r[e].rank=~o++}v=~r[e].rank}w[y]=v}var m=[];for(y=0;y<o+1;++y){m[y]={neighbors:0,x:0,y:0,width:0,height:0,confidence:0}}for(y=0;y<q;++y){var z=g[y];var k=w[y];if(m[k].neighbors==0){m[k].confidence=z.confidence}++m[k].neighbors;m[k].x+=z.x;m[k].y+=z.y;m[k].width+=z.width;m[k].height+=z.height;m[k].confidence=Math.max(m[k].confidence,z.confidence)}var h=[];for(y=0;y<o;++y){q=m[y].neighbors;if(q>=l){h.push({x:(m[y].x*2+q)/(2*q),y:(m[y].y*2+q)/(2*q),width:(m[y].width*2+q)/(2*q),height:(m[y].height*2+q)/(2*q),neighbors:m[y].neighbors,confidence:m[y].confidence})}}var p=[];q=h.length;for(y=0;y<q;++y){var z=h[y];var x=true;for(v=0;v<q;++v){var u=h[v];var f=(u.width*0.25+0.5)|0;if(y!=v&&z.x>=u.x-f&&z.y>=u.y-f&&z.x+z.width<=u.x+u.width+f&&z.y+z.height<=u.y+u.height+f&&(u.neighbors>Math.max(3,z.neighbors)||z.neighbors<3)){x=false;break}}if(x){p.push(z)}}return p}}})();b.haar=a})(jsfeat);(function(a){var b=(function(){var c=function(f,e){var g=(f.width*0.25+0.5)|0;return e.x<=f.x+g&&e.x>=f.x-g&&e.y<=f.y+g&&e.y>=f.y-g&&e.width<=(f.width*1.5+0.5)|0&&(e.width*1.5+0.5)|0>=f.width};var d=new jsfeat.pyramid_t(1);return{interval:4,scale:1.1486,next:5,scale_to:1,prepare_cascade:function(g){var m=g.stage_classifier.length;for(var h=0;h<m;h++){var l=g.stage_classifier[h].feature;var e=g.stage_classifier[h].count;var i=g.stage_classifier[h]._feature=new Array(e);for(var f=0;f<e;f++){i[f]={size:l[f].size,px:new Array(l[f].size),pz:new Array(l[f].size),nx:new Array(l[f].size),nz:new Array(l[f].size)}}}},build_pyramid:function(e,k,s,f){if(typeof f==="undefined"){f=4}var q=e.cols,m=e.rows;var l=0,n=0,h=0;var p=false;var j=e,g=e;var r=jsfeat.U8_t|jsfeat.C1_t;this.interval=f;this.scale=Math.pow(2,1/(this.interval+1));this.next=(this.interval+1)|0;this.scale_to=(Math.log(Math.min(q/k,m/s))/Math.log(this.scale))|0;var o=((this.scale_to+this.next*2)*4)|0;if(d.levels!=o){d.levels=o;d.data=new Array(o);p=true;d.data[0]=e}for(l=1;l<=this.interval;++l){n=(q/Math.pow(this.scale,l))|0;h=(m/Math.pow(this.scale,l))|0;j=d.data[l<<2];if(p||n!=j.cols||h!=j.rows){d.data[l<<2]=new jsfeat.matrix_t(n,h,r);j=d.data[l<<2]}jsfeat.imgproc.resample(e,j,n,h)}for(l=this.next;l<this.scale_to+this.next*2;++l){g=d.data[(l<<2)-(this.next<<2)];j=d.data[l<<2];n=g.cols>>1;h=g.rows>>1;if(p||n!=j.cols||h!=j.rows){d.data[l<<2]=new jsfeat.matrix_t(n,h,r);j=d.data[l<<2]}jsfeat.imgproc.pyrdown(g,j)}for(l=this.next*2;l<this.scale_to+this.next*2;++l){g=d.data[(l<<2)-(this.next<<2)];n=g.cols>>1;h=g.rows>>1;j=d.data[(l<<2)+1];if(p||n!=j.cols||h!=j.rows){d.data[(l<<2)+1]=new jsfeat.matrix_t(n,h,r);j=d.data[(l<<2)+1]}jsfeat.imgproc.pyrdown(g,j,1,0);j=d.data[(l<<2)+2];if(p||n!=j.cols||h!=j.rows){d.data[(l<<2)+2]=new jsfeat.matrix_t(n,h,r);j=d.data[(l<<2)+2]}jsfeat.imgproc.pyrdown(g,j,0,1);j=d.data[(l<<2)+3];if(p||n!=j.cols||h!=j.rows){d.data[(l<<2)+3]=new jsfeat.matrix_t(n,h,r);j=d.data[(l<<2)+3]}jsfeat.imgproc.pyrdown(g,j,1,1)}return d},detect:function(G,L){var h=this.interval;var N=this.scale;var m=this.next;var l=this.scale_to;var ab=0,aa=0,Z=0,W=0,S=0,R=0,U=0,B=0,J=0,I=0,V=0,ae=0,M=0,ad=0,w=0,Y=0,g=0;var E=0,X,Q,D,H,F,O=true,o=true;var z=1,v=1;var s=[0,1,0,1];var r=[0,0,1,1];var K=[];var C=G.data,ac=1,u=2,t=4;var A=[],e=[0,0,0];var P=[0,0,0];var T=[0,0,0];for(ab=0;ab<l;ab++){w=(ab<<2);Y=C[w+(m<<3)].cols-(L.width>>2);g=C[w+(m<<3)].rows-(L.height>>2);P[0]=C[w].cols*ac;P[1]=C[w+(m<<2)].cols*ac;P[2]=C[w+(m<<3)].cols*ac;T[0]=(C[w].cols*t)-(Y*t);T[1]=(C[w+(m<<2)].cols*u)-(Y*u);T[2]=(C[w+(m<<3)].cols*ac)-(Y*ac);B=L.stage_classifier.length;for(aa=0;aa<B;aa++){D=L.stage_classifier[aa].feature;Q=L.stage_classifier[aa]._feature;J=L.stage_classifier[aa].count;for(Z=0;Z<J;Z++){H=Q[Z];F=D[Z];I=F.size|0;for(U=0;U<I;U++){H.px[U]=(F.px[U]*ac)+F.py[U]*P[F.pz[U]];H.pz[U]=F.pz[U];H.nx[U]=(F.nx[U]*ac)+F.ny[U]*P[F.nz[U]];H.nz[U]=F.nz[U]}}}A[0]=C[w].data;A[1]=C[w+(m<<2)].data;for(U=0;U<4;U++){A[2]=C[w+(m<<3)+U].data;e[0]=(s[U]*u)+r[U]*(C[w].cols*u);e[1]=(s[U]*ac)+r[U]*(C[w+(m<<2)].cols*ac);e[2]=0;for(R=0;R<g;R++){for(S=0;S<Y;S++){E=0;O=true;B=L.stage_classifier.length;for(aa=0;aa<B;aa++){E=0;X=L.stage_classifier[aa].alpha;Q=L.stage_classifier[aa]._feature;J=L.stage_classifier[aa].count;for(Z=0;Z<J;Z++){H=Q[Z];ae=A[H.pz[0]][e[H.pz[0]]+H.px[0]];M=A[H.nz[0]][e[H.nz[0]]+H.nx[0]];if(ae<=M){E+=X[Z<<1]}else{o=true;I=H.size;for(ad=1;ad<I;ad++){if(H.pz[ad]>=0){V=A[H.pz[ad]][e[H.pz[ad]]+H.px[ad]];if(V<ae){if(V<=M){o=false;break}ae=V}}if(H.nz[ad]>=0){W=A[H.nz[ad]][e[H.nz[ad]]+H.nx[ad]];if(W>M){if(ae<=W){o=false;break}M=W}}}E+=(o)?X[(Z<<1)+1]:X[Z<<1]}}if(E<L.stage_classifier[aa].threshold){O=false;break}}if(O){K.push({x:(S*4+s[U]*2)*z,y:(R*4+r[U]*2)*v,width:L.width*z,height:L.height*v,neighbor:1,confidence:E});++S;e[0]+=t;e[1]+=u;e[2]+=ac}e[0]+=t;e[1]+=u;e[2]+=ac}e[0]+=T[0];e[1]+=T[1];e[2]+=T[2]}}z*=N;v*=N}return K},group_rectangles:function(h,m){if(typeof m==="undefined"){m=1}var z,w,r=h.length;var s=[];for(z=0;z<r;++z){s[z]={parent:-1,element:h[z],rank:0}}for(z=0;z<r;++z){if(!s[z].element){continue}var u=z;while(s[u].parent!=-1){u=s[u].parent}for(w=0;w<r;++w){if(z!=w&&s[w].element&&c(s[z].element,s[w].element)){var t=w;while(s[t].parent!=-1){t=s[t].parent}if(t!=u){if(s[u].rank>s[t].rank){s[t].parent=u}else{s[u].parent=t;if(s[u].rank==s[t].rank){s[t].rank++}u=t}var B,e=w;while(s[e].parent!=-1){B=e;e=s[e].parent;s[B].parent=u}e=z;while(s[e].parent!=-1){B=e;e=s[e].parent;s[B].parent=u}}}}}var x=[];var p=0;for(z=0;z<r;z++){w=-1;var f=z;if(s[f].element){while(s[f].parent!=-1){f=s[f].parent}if(s[f].rank>=0){s[f].rank=~p++}w=~s[f].rank}x[z]=w}var o=[];for(z=0;z<p+1;++z){o[z]={neighbors:0,x:0,y:0,width:0,height:0,confidence:0}}for(z=0;z<r;++z){var A=h[z];var l=x[z];if(o[l].neighbors==0){o[l].confidence=A.confidence}++o[l].neighbors;o[l].x+=A.x;o[l].y+=A.y;o[l].width+=A.width;o[l].height+=A.height;o[l].confidence=Math.max(o[l].confidence,A.confidence)}var k=[];for(z=0;z<p;++z){r=o[z].neighbors;if(r>=m){k.push({x:(o[z].x*2+r)/(2*r),y:(o[z].y*2+r)/(2*r),width:(o[z].width*2+r)/(2*r),height:(o[z].height*2+r)/(2*r),neighbors:o[z].neighbors,confidence:o[z].confidence})}}var q=[];r=k.length;for(z=0;z<r;++z){var A=k[z];var y=true;for(w=0;w<r;++w){var v=k[w];var g=(v.width*0.25+0.5)|0;if(z!=w&&A.x>=v.x-g&&A.y>=v.y-g&&A.x+A.width<=v.x+v.width+g&&A.y+A.height<=v.y+v.height+g&&(v.neighbors>Math.max(3,A.neighbors)||A.neighbors<3)){y=false;break}}if(y){q.push(A)}}return q}}})();a.bbf=b})(jsfeat);(function(a){if(typeof module==="undefined"||typeof module.exports==="undefined"){window.jsfeat=a}else{module.exports=a}})(jsfeat);
/**
 * this cascade is derived from https://github.com/mtschirs/js-objectdetect implementation
 * @author Martin Tschirsich / http://www.tu-darmstadt.de/~m_t
 */
(function(global) {
	global.frontalface = {complexClassifiers:[{simpleClassifiers:[{features:[[3,7,14,4,-1.],[3,9,14,2,2.]],threshold:4.0141958743333817e-003,right_val:0.8378106951713562,left_val:0.0337941907346249},{features:[[1,2,18,4,-1.],[7,2,6,4,3.]],threshold:0.0151513395830989,right_val:0.7488812208175659,left_val:0.1514132022857666},{features:[[1,7,15,9,-1.],[1,10,15,3,3.]],threshold:4.2109931819140911e-003,right_val:0.6374819874763489,left_val:0.0900492817163467}],threshold:0.8226894140243530},{simpleClassifiers:[{features:[[5,6,2,6,-1.],[5,9,2,3,2.]],threshold:1.6227109590545297e-003,right_val:0.7110946178436279,left_val:0.0693085864186287},{features:[[7,5,6,3,-1.],[9,5,2,3,3.]],threshold:2.2906649392098188e-003,right_val:0.6668692231178284,left_val:0.1795803010463715},{features:[[4,0,12,9,-1.],[4,3,12,3,3.]],threshold:5.0025708042085171e-003,right_val:0.6554006934165955,left_val:0.1693672984838486},{features:[[6,9,10,8,-1.],[6,13,10,4,2.]],threshold:7.9659894108772278e-003,right_val:0.0914145186543465,left_val:0.5866332054138184},{features:[[3,6,14,8,-1.],[3,10,14,4,2.]],threshold:-3.5227010957896709e-003,right_val:0.6031895875930786,left_val:0.1413166970014572},{features:[[14,1,6,10,-1.],[14,1,3,10,2.]],threshold:0.0366676896810532,right_val:0.7920318245887756,left_val:0.3675672113895416},{features:[[7,8,5,12,-1.],[7,12,5,4,3.]],threshold:9.3361474573612213e-003,right_val:0.2088509947061539,left_val:0.6161385774612427},{features:[[1,1,18,3,-1.],[7,1,6,3,3.]],threshold:8.6961314082145691e-003,right_val:0.6360273957252502,left_val:0.2836230993270874},{features:[[1,8,17,2,-1.],[1,9,17,1,2.]],threshold:1.1488880263641477e-003,right_val:0.5800700783729553,left_val:0.2223580926656723},{features:[[16,6,4,2,-1.],[16,7,4,1,2.]],threshold:-2.1484689787030220e-003,right_val:0.5787054896354675,left_val:0.2406464070081711},{features:[[5,17,2,2,-1.],[5,18,2,1,2.]],threshold:2.1219060290604830e-003,right_val:0.1362237036228180,left_val:0.5559654831886292},{features:[[14,2,6,12,-1.],[14,2,3,12,2.]],threshold:-0.0939491465687752,right_val:0.4717740118503571,left_val:0.8502737283706665},{features:[[4,0,4,12,-1.],[4,0,2,6,2.],[6,6,2,6,2.]],threshold:1.3777789426967502e-003,right_val:0.2834529876708984,left_val:0.5993673801422119},{features:[[2,11,18,8,-1.],[8,11,6,8,3.]],threshold:0.0730631574988365,right_val:0.7060034275054932,left_val:0.4341886043548584},{features:[[5,7,10,2,-1.],[5,8,10,1,2.]],threshold:3.6767389974556863e-004,right_val:0.6051574945449829,left_val:0.3027887940406799},{features:[[15,11,5,3,-1.],[15,12,5,1,3.]],threshold:-6.0479710809886456e-003,right_val:0.5675256848335266,left_val:0.1798433959484100}],threshold:6.9566087722778320},{simpleClassifiers:[{features:[[5,3,10,9,-1.],[5,6,10,3,3.]],threshold:-0.0165106896311045,right_val:0.1424857974052429,left_val:0.6644225120544434},{features:[[9,4,2,14,-1.],[9,11,2,7,2.]],threshold:2.7052499353885651e-003,right_val:0.1288477033376694,left_val:0.6325352191925049},{features:[[3,5,4,12,-1.],[3,9,4,4,3.]],threshold:2.8069869149476290e-003,right_val:0.6193193197250366,left_val:0.1240288019180298},{features:[[4,5,12,5,-1.],[8,5,4,5,3.]],threshold:-1.5402400167658925e-003,right_val:0.5670015811920166,left_val:0.1432143002748489},{features:[[5,6,10,8,-1.],[5,10,10,4,2.]],threshold:-5.6386279175058007e-004,right_val:0.5905207991600037,left_val:0.1657433062791824},{features:[[8,0,6,9,-1.],[8,3,6,3,3.]],threshold:1.9253729842603207e-003,right_val:0.5738824009895325,left_val:0.2695507109165192},{features:[[9,12,1,8,-1.],[9,16,1,4,2.]],threshold:-5.0214841030538082e-003,right_val:0.5782774090766907,left_val:0.1893538981676102},{features:[[0,7,20,6,-1.],[0,9,20,2,3.]],threshold:2.6365420781075954e-003,right_val:0.5695425868034363,left_val:0.2309329062700272},{features:[[7,0,6,17,-1.],[9,0,2,17,3.]],threshold:-1.5127769438549876e-003,right_val:0.5956642031669617,left_val:0.2759602069854736},{features:[[9,0,6,4,-1.],[11,0,2,4,3.]],threshold:-0.0101574398577213,right_val:0.5522047281265259,left_val:0.1732538044452667},{features:[[5,1,6,4,-1.],[7,1,2,4,3.]],threshold:-0.0119536602869630,right_val:0.5559014081954956,left_val:0.1339409947395325},{features:[[12,1,6,16,-1.],[14,1,2,16,3.]],threshold:4.8859491944313049e-003,right_val:0.6188849210739136,left_val:0.3628703951835632},{features:[[0,5,18,8,-1.],[0,5,9,4,2.],[9,9,9,4,2.]],threshold:-0.0801329165697098,right_val:0.5475944876670837,left_val:0.0912110507488251},{features:[[8,15,10,4,-1.],[13,15,5,2,2.],[8,17,5,2,2.]],threshold:1.0643280111253262e-003,right_val:0.5711399912834168,left_val:0.3715142905712128},{features:[[3,1,4,8,-1.],[3,1,2,4,2.],[5,5,2,4,2.]],threshold:-1.3419450260698795e-003,right_val:0.3318097889423370,left_val:0.5953313708305359},{features:[[3,6,14,10,-1.],[10,6,7,5,2.],[3,11,7,5,2.]],threshold:-0.0546011403203011,right_val:0.5602846145629883,left_val:0.1844065934419632},{features:[[2,1,6,16,-1.],[4,1,2,16,3.]],threshold:2.9071690514683723e-003,right_val:0.6131715178489685,left_val:0.3594244122505188},{features:[[0,18,20,2,-1.],[0,19,20,1,2.]],threshold:7.4718717951327562e-004,right_val:0.3459562957286835,left_val:0.5994353294372559},{features:[[8,13,4,3,-1.],[8,14,4,1,3.]],threshold:4.3013808317482471e-003,right_val:0.6990845203399658,left_val:0.4172652065753937},{features:[[9,14,2,3,-1.],[9,15,2,1,3.]],threshold:4.5017572119832039e-003,right_val:0.7801457047462463,left_val:0.4509715139865875},{features:[[0,12,9,6,-1.],[0,14,9,2,3.]],threshold:0.0241385009139776,right_val:0.1319826990365982,left_val:0.5438212752342224}],threshold:9.4985427856445313},{simpleClassifiers:[{features:[[5,7,3,4,-1.],[5,9,3,2,2.]],threshold:1.9212230108678341e-003,right_val:0.6199870705604553,left_val:0.1415266990661621},{features:[[9,3,2,16,-1.],[9,11,2,8,2.]],threshold:-1.2748669541906565e-004,right_val:0.1884928941726685,left_val:0.6191074252128601},{features:[[3,6,13,8,-1.],[3,10,13,4,2.]],threshold:5.1409931620582938e-004,right_val:0.5857927799224854,left_val:0.1487396955490112},{features:[[12,3,8,2,-1.],[12,3,4,2,2.]],threshold:4.1878609918057919e-003,right_val:0.6359239816665649,left_val:0.2746909856796265},{features:[[8,8,4,12,-1.],[8,12,4,4,3.]],threshold:5.1015717908740044e-003,right_val:0.2175628989934921,left_val:0.5870851278305054},{features:[[11,3,8,6,-1.],[15,3,4,3,2.],[11,6,4,3,2.]],threshold:-2.1448440384119749e-003,right_val:0.2979590892791748,left_val:0.5880944728851318},{features:[[7,1,6,19,-1.],[9,1,2,19,3.]],threshold:-2.8977119363844395e-003,right_val:0.5876647233963013,left_val:0.2373327016830444},{features:[[9,0,6,4,-1.],[11,0,2,4,3.]],threshold:-0.0216106791049242,right_val:0.5194202065467835,left_val:0.1220654994249344},{features:[[3,1,9,3,-1.],[6,1,3,3,3.]],threshold:-4.6299318782985210e-003,right_val:0.5817409157752991,left_val:0.2631230950355530},{features:[[8,15,10,4,-1.],[13,15,5,2,2.],[8,17,5,2,2.]],threshold:5.9393711853772402e-004,right_val:0.5698544979095459,left_val:0.3638620078563690},{features:[[0,3,6,10,-1.],[3,3,3,10,2.]],threshold:0.0538786612451077,right_val:0.7559366226196289,left_val:0.4303531050682068},{features:[[3,4,15,15,-1.],[3,9,15,5,3.]],threshold:1.8887349870055914e-003,right_val:0.5613427162170410,left_val:0.2122603058815002},{features:[[6,5,8,6,-1.],[6,7,8,2,3.]],threshold:-2.3635339457541704e-003,right_val:0.2642767131328583,left_val:0.5631849169731140},{features:[[4,4,12,10,-1.],[10,4,6,5,2.],[4,9,6,5,2.]],threshold:0.0240177996456623,right_val:0.2751705944538117,left_val:0.5797107815742493},{features:[[6,4,4,4,-1.],[8,4,2,4,2.]],threshold:2.0543030404951423e-004,right_val:0.5752568840980530,left_val:0.2705242037773132},{features:[[15,11,1,2,-1.],[15,12,1,1,2.]],threshold:8.4790197433903813e-004,right_val:0.2334876954555512,left_val:0.5435624718666077},{features:[[3,11,2,2,-1.],[3,12,2,1,2.]],threshold:1.4091329649090767e-003,right_val:0.2063155025243759,left_val:0.5319424867630005},{features:[[16,11,1,3,-1.],[16,12,1,1,3.]],threshold:1.4642629539594054e-003,right_val:0.3068861067295075,left_val:0.5418980717658997},{features:[[3,15,6,4,-1.],[3,15,3,2,2.],[6,17,3,2,2.]],threshold:1.6352549428120255e-003,right_val:0.6112868189811707,left_val:0.3695372939109802},{features:[[6,7,8,2,-1.],[6,8,8,1,2.]],threshold:8.3172752056270838e-004,right_val:0.6025236248970032,left_val:0.3565036952495575},{features:[[3,11,1,3,-1.],[3,12,1,1,3.]],threshold:-2.0998890977352858e-003,right_val:0.5362827181816101,left_val:0.1913982033729553},{features:[[6,0,12,2,-1.],[6,1,12,1,2.]],threshold:-7.4213981861248612e-004,right_val:0.5529310107231140,left_val:0.3835555016994476},{features:[[9,14,2,3,-1.],[9,15,2,1,3.]],threshold:3.2655049581080675e-003,right_val:0.7101895809173584,left_val:0.4312896132469177},{features:[[7,15,6,2,-1.],[7,16,6,1,2.]],threshold:8.9134991867467761e-004,right_val:0.6391963958740234,left_val:0.3984830975532532},{features:[[0,5,4,6,-1.],[0,7,4,2,3.]],threshold:-0.0152841797098517,right_val:0.5433713793754578,left_val:0.2366732954978943},{features:[[4,12,12,2,-1.],[8,12,4,2,3.]],threshold:4.8381411470472813e-003,right_val:0.3239189088344574,left_val:0.5817500948905945},{features:[[6,3,1,9,-1.],[6,6,1,3,3.]],threshold:-9.1093179071322083e-004,right_val:0.2911868989467621,left_val:0.5540593862533569},{features:[[10,17,3,2,-1.],[11,17,1,2,3.]],threshold:-6.1275060288608074e-003,right_val:0.5196629166603088,left_val:0.1775255054235458},{features:[[9,9,2,2,-1.],[9,10,2,1,2.]],threshold:-4.4576259097084403e-004,right_val:0.5533593893051148,left_val:0.3024170100688934},{features:[[7,6,6,4,-1.],[9,6,2,4,3.]],threshold:0.0226465407758951,right_val:0.6975377202033997,left_val:0.4414930939674377},{features:[[7,17,3,2,-1.],[8,17,1,2,3.]],threshold:-1.8804960418492556e-003,right_val:0.5497952103614807,left_val:0.2791394889354706},{features:[[10,17,3,3,-1.],[11,17,1,3,3.]],threshold:7.0889107882976532e-003,right_val:0.2385547012090683,left_val:0.5263199210166931},{features:[[8,12,3,2,-1.],[8,13,3,1,2.]],threshold:1.7318050377070904e-003,right_val:0.6983600854873657,left_val:0.4319379031658173},{features:[[9,3,6,2,-1.],[11,3,2,2,3.]],threshold:-6.8482700735330582e-003,right_val:0.5390920042991638,left_val:0.3082042932510376},{features:[[3,11,14,4,-1.],[3,13,14,2,2.]],threshold:-1.5062530110299122e-005,right_val:0.3120366036891937,left_val:0.5521922111511231},{features:[[1,10,18,4,-1.],[10,10,9,2,2.],[1,12,9,2,2.]],threshold:0.0294755697250366,right_val:0.1770603060722351,left_val:0.5401322841644287},{features:[[0,10,3,3,-1.],[0,11,3,1,3.]],threshold:8.1387329846620560e-003,right_val:0.1211019009351730,left_val:0.5178617835044861},{features:[[9,1,6,6,-1.],[11,1,2,6,3.]],threshold:0.0209429506212473,right_val:0.3311221897602081,left_val:0.5290294289588928},{features:[[8,7,3,6,-1.],[9,7,1,6,3.]],threshold:-9.5665529370307922e-003,right_val:0.4451968967914581,left_val:0.7471994161605835}],threshold:18.4129695892333980},{simpleClassifiers:[{features:[[1,0,18,9,-1.],[1,3,18,3,3.]],threshold:-2.8206960996612906e-004,right_val:0.6076732277870178,left_val:0.2064086049795151},{features:[[12,10,2,6,-1.],[12,13,2,3,2.]],threshold:1.6790600493550301e-003,right_val:0.1255383938550949,left_val:0.5851997137069702},{features:[[0,5,19,8,-1.],[0,9,19,4,2.]],threshold:6.9827912375330925e-004,right_val:0.5728961229324341,left_val:0.0940184295177460},{features:[[7,0,6,9,-1.],[9,0,2,9,3.]],threshold:7.8959012171253562e-004,right_val:0.5694308876991272,left_val:0.1781987994909287},{features:[[5,3,6,1,-1.],[7,3,2,1,3.]],threshold:-2.8560499195009470e-003,right_val:0.5788664817810059,left_val:0.1638399064540863},{features:[[11,3,6,1,-1.],[13,3,2,1,3.]],threshold:-3.8122469559311867e-003,right_val:0.5508564710617065,left_val:0.2085440009832382},{features:[[5,10,4,6,-1.],[5,13,4,3,2.]],threshold:1.5896620461717248e-003,right_val:0.1857215017080307,left_val:0.5702760815620422},{features:[[11,3,6,1,-1.],[13,3,2,1,3.]],threshold:0.0100783398374915,right_val:0.2189770042896271,left_val:0.5116943120956421},{features:[[4,4,12,6,-1.],[4,6,12,2,3.]],threshold:-0.0635263025760651,right_val:0.4043813049793243,left_val:0.7131379842758179},{features:[[15,12,2,6,-1.],[15,14,2,2,3.]],threshold:-9.1031491756439209e-003,right_val:0.5463973283767700,left_val:0.2567181885242462},{features:[[9,3,2,2,-1.],[10,3,1,2,2.]],threshold:-2.4035000242292881e-003,right_val:0.5590974092483521,left_val:0.1700665950775147},{features:[[9,3,3,1,-1.],[10,3,1,1,3.]],threshold:1.5226360410451889e-003,right_val:0.2619054019451141,left_val:0.5410556793212891},{features:[[1,1,4,14,-1.],[3,1,2,14,2.]],threshold:0.0179974399507046,right_val:0.6535220742225647,left_val:0.3732436895370483},{features:[[9,0,4,4,-1.],[11,0,2,2,2.],[9,2,2,2,2.]],threshold:-6.4538191072642803e-003,right_val:0.5537446141242981,left_val:0.2626481950283051},{features:[[7,5,1,14,-1.],[7,12,1,7,2.]],threshold:-0.0118807600811124,right_val:0.5544745922088623,left_val:0.2003753930330277},{features:[[19,0,1,4,-1.],[19,2,1,2,2.]],threshold:1.2713660253211856e-003,right_val:0.3031975924968720,left_val:0.5591902732849121},{features:[[5,5,6,4,-1.],[8,5,3,4,2.]],threshold:1.1376109905540943e-003,right_val:0.5646508932113648,left_val:0.2730407118797302},{features:[[9,18,3,2,-1.],[10,18,1,2,3.]],threshold:-4.2651998810470104e-003,right_val:0.5461820960044861,left_val:0.1405909061431885},{features:[[8,18,3,2,-1.],[9,18,1,2,3.]],threshold:-2.9602861031889915e-003,right_val:0.5459290146827698,left_val:0.1795035004615784},{features:[[4,5,12,6,-1.],[4,7,12,2,3.]],threshold:-8.8448226451873779e-003,right_val:0.2809219956398010,left_val:0.5736783146858215},{features:[[3,12,2,6,-1.],[3,14,2,2,3.]],threshold:-6.6430689767003059e-003,right_val:0.5503826141357422,left_val:0.2370675951242447},{features:[[10,8,2,12,-1.],[10,12,2,4,3.]],threshold:3.9997808635234833e-003,right_val:0.3304282128810883,left_val:0.5608199834823608},{features:[[7,18,3,2,-1.],[8,18,1,2,3.]],threshold:-4.1221720166504383e-003,right_val:0.5378993153572083,left_val:0.1640105992555618},{features:[[9,0,6,2,-1.],[11,0,2,2,3.]],threshold:0.0156249096617103,right_val:0.2288603931665421,left_val:0.5227649211883545},{features:[[5,11,9,3,-1.],[5,12,9,1,3.]],threshold:-0.0103564197197557,right_val:0.4252927899360657,left_val:0.7016193866729736},{features:[[9,0,6,2,-1.],[11,0,2,2,3.]],threshold:-8.7960809469223022e-003,right_val:0.5355830192565918,left_val:0.2767347097396851},{features:[[1,1,18,5,-1.],[7,1,6,5,3.]],threshold:0.1622693985700607,right_val:0.7442579269409180,left_val:0.4342240095138550},{features:[[8,0,4,4,-1.],[10,0,2,2,2.],[8,2,2,2,2.]],threshold:4.5542530715465546e-003,right_val:0.2582125067710877,left_val:0.5726485848426819},{features:[[3,12,1,3,-1.],[3,13,1,1,3.]],threshold:-2.1309209987521172e-003,right_val:0.5361018776893616,left_val:0.2106848061084747},{features:[[8,14,5,3,-1.],[8,15,5,1,3.]],threshold:-0.0132084200158715,right_val:0.4552468061447144,left_val:0.7593790888786316},{features:[[5,4,10,12,-1.],[5,4,5,6,2.],[10,10,5,6,2.]],threshold:-0.0659966766834259,right_val:0.5344039797782898,left_val:0.1252475976943970},{features:[[9,6,9,12,-1.],[9,10,9,4,3.]],threshold:7.9142656177282333e-003,right_val:0.5601043105125427,left_val:0.3315384089946747},{features:[[2,2,12,14,-1.],[2,2,6,7,2.],[8,9,6,7,2.]],threshold:0.0208942797034979,right_val:0.2768838107585907,left_val:0.5506049990653992}],threshold:15.3241395950317380},{simpleClassifiers:[{features:[[4,7,12,2,-1.],[8,7,4,2,3.]],threshold:1.1961159761995077e-003,right_val:0.6156241297721863,left_val:0.1762690991163254},{features:[[7,4,6,4,-1.],[7,6,6,2,2.]],threshold:-1.8679830245673656e-003,right_val:0.1832399964332581,left_val:0.6118106842041016},{features:[[4,5,11,8,-1.],[4,9,11,4,2.]],threshold:-1.9579799845814705e-004,right_val:0.5723816156387329,left_val:0.0990442633628845},{features:[[3,10,16,4,-1.],[3,12,16,2,2.]],threshold:-8.0255657667294145e-004,right_val:0.2377282977104187,left_val:0.5579879879951477},{features:[[0,0,16,2,-1.],[0,1,16,1,2.]],threshold:-2.4510810617357492e-003,right_val:0.5858935117721558,left_val:0.2231457978487015},{features:[[7,5,6,2,-1.],[9,5,2,2,3.]],threshold:5.0361850298941135e-004,right_val:0.5794103741645813,left_val:0.2653993964195252},{features:[[3,2,6,10,-1.],[3,2,3,5,2.],[6,7,3,5,2.]],threshold:4.0293349884450436e-003,right_val:0.2484865039587021,left_val:0.5803827047348023},{features:[[10,5,8,15,-1.],[10,10,8,5,3.]],threshold:-0.0144517095759511,right_val:0.5484204888343811,left_val:0.1830351948738098},{features:[[3,14,8,6,-1.],[3,14,4,3,2.],[7,17,4,3,2.]],threshold:2.0380979403853416e-003,right_val:0.6051092743873596,left_val:0.3363558948040009},{features:[[14,2,2,2,-1.],[14,3,2,1,2.]],threshold:-1.6155190533027053e-003,right_val:0.5441246032714844,left_val:0.2286642044782639},{features:[[1,10,7,6,-1.],[1,13,7,3,2.]],threshold:3.3458340913057327e-003,right_val:0.2392338067293167,left_val:0.5625913143157959},{features:[[15,4,4,3,-1.],[15,4,2,3,2.]],threshold:1.6379579901695251e-003,right_val:0.5964621901512146,left_val:0.3906993865966797},{features:[[2,9,14,6,-1.],[2,9,7,3,2.],[9,12,7,3,2.]],threshold:0.0302512105554342,right_val:0.1575746983289719,left_val:0.5248482227325440},{features:[[5,7,10,4,-1.],[5,9,10,2,2.]],threshold:0.0372519902884960,right_val:0.6748418807983398,left_val:0.4194310903549194},{features:[[6,9,8,8,-1.],[6,9,4,4,2.],[10,13,4,4,2.]],threshold:-0.0251097902655602,right_val:0.5473451018333435,left_val:0.1882549971342087},{features:[[14,1,3,2,-1.],[14,2,3,1,2.]],threshold:-5.3099058568477631e-003,right_val:0.5227110981941223,left_val:0.1339973062276840},{features:[[1,4,4,2,-1.],[3,4,2,2,2.]],threshold:1.2086479691788554e-003,right_val:0.6109635829925537,left_val:0.3762088119983673},{features:[[11,10,2,8,-1.],[11,14,2,4,2.]],threshold:-0.0219076797366142,right_val:0.5404006838798523,left_val:0.2663142979145050},{features:[[0,0,5,3,-1.],[0,1,5,1,3.]],threshold:5.4116579703986645e-003,right_val:0.2232273072004318,left_val:0.5363578796386719},{features:[[2,5,18,8,-1.],[11,5,9,4,2.],[2,9,9,4,2.]],threshold:0.0699463263154030,right_val:0.2453698068857193,left_val:0.5358232855796814},{features:[[6,6,1,6,-1.],[6,9,1,3,2.]],threshold:3.4520021290518343e-004,right_val:0.5376930236816406,left_val:0.2409671992063522},{features:[[19,1,1,3,-1.],[19,2,1,1,3.]],threshold:1.2627709656953812e-003,right_val:0.3155693113803864,left_val:0.5425856709480286},{features:[[7,6,6,6,-1.],[9,6,2,6,3.]],threshold:0.0227195098996162,right_val:0.6597865223884583,left_val:0.4158405959606171},{features:[[19,1,1,3,-1.],[19,2,1,1,3.]],threshold:-1.8111000536009669e-003,right_val:0.5505244731903076,left_val:0.2811253070831299},{features:[[3,13,2,3,-1.],[3,14,2,1,3.]],threshold:3.3469670452177525e-003,right_val:0.1891465038061142,left_val:0.5260028243064880},{features:[[8,4,8,12,-1.],[12,4,4,6,2.],[8,10,4,6,2.]],threshold:4.0791751234792173e-004,right_val:0.3344210088253021,left_val:0.5673509240150452},{features:[[5,2,6,3,-1.],[7,2,2,3,3.]],threshold:0.0127347996458411,right_val:0.2395612001419067,left_val:0.5343592166900635},{features:[[6,1,9,10,-1.],[6,6,9,5,2.]],threshold:-7.3119727894663811e-003,right_val:0.4022207856178284,left_val:0.6010890007019043},{features:[[0,4,6,12,-1.],[2,4,2,12,3.]],threshold:-0.0569487512111664,right_val:0.4543190896511078,left_val:0.8199151158332825},{features:[[15,13,2,3,-1.],[15,14,2,1,3.]],threshold:-5.0116591155529022e-003,right_val:0.5357710719108582,left_val:0.2200281023979187},{features:[[7,14,5,3,-1.],[7,15,5,1,3.]],threshold:6.0334368608891964e-003,right_val:0.7181751132011414,left_val:0.4413081109523773},{features:[[15,13,3,3,-1.],[15,14,3,1,3.]],threshold:3.9437441155314445e-003,right_val:0.2791733145713806,left_val:0.5478860735893250},{features:[[6,14,8,3,-1.],[6,15,8,1,3.]],threshold:-3.6591119132936001e-003,right_val:0.3989723920822144,left_val:0.6357867717742920},{features:[[15,13,3,3,-1.],[15,14,3,1,3.]],threshold:-3.8456181064248085e-003,right_val:0.5300664901733398,left_val:0.3493686020374298},{features:[[2,13,3,3,-1.],[2,14,3,1,3.]],threshold:-7.1926261298358440e-003,right_val:0.5229672789573669,left_val:0.1119614988565445},{features:[[4,7,12,12,-1.],[10,7,6,6,2.],[4,13,6,6,2.]],threshold:-0.0527989417314529,right_val:0.5453451275825501,left_val:0.2387102991342545},{features:[[9,7,2,6,-1.],[10,7,1,6,2.]],threshold:-7.9537667334079742e-003,right_val:0.4439376890659332,left_val:0.7586917877197266},{features:[[8,9,5,2,-1.],[8,10,5,1,2.]],threshold:-2.7344180271029472e-003,right_val:0.5489321947097778,left_val:0.2565476894378662},{features:[[8,6,3,4,-1.],[9,6,1,4,3.]],threshold:-1.8507939530536532e-003,right_val:0.4252474904060364,left_val:0.6734347939491272},{features:[[9,6,2,8,-1.],[9,10,2,4,2.]],threshold:0.0159189198166132,right_val:0.2292661964893341,left_val:0.5488352775573731},{features:[[7,7,3,6,-1.],[8,7,1,6,3.]],threshold:-1.2687679845839739e-003,right_val:0.4022389948368073,left_val:0.6104331016540527},{features:[[11,3,3,3,-1.],[12,3,1,3,3.]],threshold:6.2883910723030567e-003,right_val:0.1536193042993546,left_val:0.5310853123664856},{features:[[5,4,6,1,-1.],[7,4,2,1,3.]],threshold:-6.2259892001748085e-003,right_val:0.5241606235504150,left_val:0.1729111969470978},{features:[[5,6,10,3,-1.],[5,7,10,1,3.]],threshold:-0.0121325999498367,right_val:0.4325182139873505,left_val:0.6597759723663330}],threshold:21.0106391906738280},{simpleClassifiers:[{features:[[7,3,6,9,-1.],[7,6,6,3,3.]],threshold:-3.9184908382594585e-003,right_val:0.1469330936670303,left_val:0.6103435158729553},{features:[[6,7,9,1,-1.],[9,7,3,1,3.]],threshold:1.5971299726516008e-003,right_val:0.5896466970443726,left_val:0.2632363140583038},{features:[[2,8,16,8,-1.],[2,12,16,4,2.]],threshold:0.0177801102399826,right_val:0.1760361939668655,left_val:0.5872874259948731},{features:[[14,6,2,6,-1.],[14,9,2,3,2.]],threshold:6.5334769897162914e-004,right_val:0.5596066117286682,left_val:0.1567801982164383},{features:[[1,5,6,15,-1.],[1,10,6,5,3.]],threshold:-2.8353091329336166e-004,right_val:0.5732036232948303,left_val:0.1913153976202011},{features:[[10,0,6,9,-1.],[10,3,6,3,3.]],threshold:1.6104689566418529e-003,right_val:0.5623080730438232,left_val:0.2914913892745972},{features:[[6,6,7,14,-1.],[6,13,7,7,2.]],threshold:-0.0977506190538406,right_val:0.5648233294487000,left_val:0.1943476945161820},{features:[[13,7,3,6,-1.],[13,9,3,2,3.]],threshold:5.5182358482852578e-004,right_val:0.5504639744758606,left_val:0.3134616911411285},{features:[[1,8,15,4,-1.],[6,8,5,4,3.]],threshold:-0.0128582203760743,right_val:0.5760142803192139,left_val:0.2536481916904450},{features:[[11,2,3,10,-1.],[11,7,3,5,2.]],threshold:4.1530239395797253e-003,right_val:0.3659774065017700,left_val:0.5767722129821777},{features:[[3,7,4,6,-1.],[3,9,4,2,3.]],threshold:1.7092459602281451e-003,right_val:0.5918939113616943,left_val:0.2843191027641296},{features:[[13,3,6,10,-1.],[15,3,2,10,3.]],threshold:7.5217359699308872e-003,right_val:0.6183109283447266,left_val:0.4052427113056183},{features:[[5,7,8,10,-1.],[5,7,4,5,2.],[9,12,4,5,2.]],threshold:2.2479810286313295e-003,right_val:0.3135401010513306,left_val:0.5783755183219910},{features:[[4,4,12,12,-1.],[10,4,6,6,2.],[4,10,6,6,2.]],threshold:0.0520062111318111,right_val:0.1916636973619461,left_val:0.5541312098503113},{features:[[1,4,6,9,-1.],[3,4,2,9,3.]],threshold:0.0120855299755931,right_val:0.6644591093063355,left_val:0.4032655954360962},{features:[[11,3,2,5,-1.],[11,3,1,5,2.]],threshold:1.4687820112158079e-005,right_val:0.5709382891654968,left_val:0.3535977900028229},{features:[[7,3,2,5,-1.],[8,3,1,5,2.]],threshold:7.1395188570022583e-006,right_val:0.5610269904136658,left_val:0.3037444949150085},{features:[[10,14,2,3,-1.],[10,15,2,1,3.]],threshold:-4.6001640148460865e-003,right_val:0.4580326080322266,left_val:0.7181087136268616},{features:[[5,12,6,2,-1.],[8,12,3,2,2.]],threshold:2.0058949012309313e-003,right_val:0.2953684031963348,left_val:0.5621951818466187},{features:[[9,14,2,3,-1.],[9,15,2,1,3.]],threshold:4.5050270855426788e-003,right_val:0.7619017958641052,left_val:0.4615387916564941},{features:[[4,11,12,6,-1.],[4,14,12,3,2.]],threshold:0.0117468303069472,right_val:0.1772529035806656,left_val:0.5343837141990662},{features:[[11,11,5,9,-1.],[11,14,5,3,3.]],threshold:-0.0583163388073444,right_val:0.5340772271156311,left_val:0.1686245948076248},{features:[[6,15,3,2,-1.],[6,16,3,1,2.]],threshold:2.3629379575140774e-004,right_val:0.6026803851127625,left_val:0.3792056143283844},{features:[[11,0,3,5,-1.],[12,0,1,5,3.]],threshold:-7.8156180679798126e-003,right_val:0.5324323773384094,left_val:0.1512867063283920},{features:[[5,5,6,7,-1.],[8,5,3,7,2.]],threshold:-0.0108761601150036,right_val:0.5319945216178894,left_val:0.2081822007894516},{features:[[13,0,1,9,-1.],[13,3,1,3,3.]],threshold:-2.7745519764721394e-003,right_val:0.5210328102111816,left_val:0.4098246991634369},{features:[[3,2,4,8,-1.],[3,2,2,4,2.],[5,6,2,4,2.]],threshold:-7.8276381827890873e-004,right_val:0.3478842079639435,left_val:0.5693274140357971},{features:[[13,12,4,6,-1.],[13,14,4,2,3.]],threshold:0.0138704096898437,right_val:0.2257698029279709,left_val:0.5326750874519348},{features:[[3,12,4,6,-1.],[3,14,4,2,3.]],threshold:-0.0236749108880758,right_val:0.5200707912445068,left_val:0.1551305055618286},{features:[[13,11,3,4,-1.],[13,13,3,2,2.]],threshold:-1.4879409718560055e-005,right_val:0.3820176124572754,left_val:0.5500566959381104},{features:[[4,4,4,3,-1.],[4,5,4,1,3.]],threshold:3.6190641112625599e-003,right_val:0.6639748215675354,left_val:0.4238683879375458},{features:[[7,5,11,8,-1.],[7,9,11,4,2.]],threshold:-0.0198171101510525,right_val:0.5382357835769653,left_val:0.2150038033723831},{features:[[7,8,3,4,-1.],[8,8,1,4,3.]],threshold:-3.8154039066284895e-003,right_val:0.4215297102928162,left_val:0.6675711274147034},{features:[[9,1,6,1,-1.],[11,1,2,1,3.]],threshold:-4.9775829538702965e-003,right_val:0.5386328101158142,left_val:0.2267289012670517},{features:[[5,5,3,3,-1.],[5,6,3,1,3.]],threshold:2.2441020701080561e-003,right_val:0.6855735778808594,left_val:0.4308691024780273},{features:[[0,9,20,6,-1.],[10,9,10,3,2.],[0,12,10,3,2.]],threshold:0.0122824599966407,right_val:0.3467479050159454,left_val:0.5836614966392517},{features:[[8,6,3,5,-1.],[9,6,1,5,3.]],threshold:-2.8548699337989092e-003,right_val:0.4311453998088837,left_val:0.7016944885253906},{features:[[11,0,1,3,-1.],[11,1,1,1,3.]],threshold:-3.7875669077038765e-003,right_val:0.5224946141242981,left_val:0.2895345091819763},{features:[[4,2,4,2,-1.],[4,3,4,1,2.]],threshold:-1.2201230274513364e-003,right_val:0.5481644868850708,left_val:0.2975570857524872},{features:[[12,6,4,3,-1.],[12,7,4,1,3.]],threshold:0.0101605998352170,right_val:0.8182697892189026,left_val:0.4888817965984345},{features:[[5,0,6,4,-1.],[7,0,2,4,3.]],threshold:-0.0161745697259903,right_val:0.5239992737770081,left_val:0.1481492966413498},{features:[[9,7,3,8,-1.],[10,7,1,8,3.]],threshold:0.0192924607545137,right_val:0.7378190755844116,left_val:0.4786309897899628},{features:[[9,7,2,2,-1.],[10,7,1,2,2.]],threshold:-3.2479539513587952e-003,right_val:0.4470643997192383,left_val:0.7374222874641419},{features:[[6,7,14,4,-1.],[13,7,7,2,2.],[6,9,7,2,2.]],threshold:-9.3803480267524719e-003,right_val:0.5537996292114258,left_val:0.3489154875278473},{features:[[0,5,3,6,-1.],[0,7,3,2,3.]],threshold:-0.0126061299815774,right_val:0.5315443277359009,left_val:0.2379686981439591},{features:[[13,11,3,4,-1.],[13,13,3,2,2.]],threshold:-0.0256219301372766,right_val:0.5138769745826721,left_val:0.1964688003063202},{features:[[4,11,3,4,-1.],[4,13,3,2,2.]],threshold:-7.5741496402770281e-005,right_val:0.3365853130817413,left_val:0.5590522885322571},{features:[[5,9,12,8,-1.],[11,9,6,4,2.],[5,13,6,4,2.]],threshold:-0.0892108827829361,right_val:0.5162634849548340,left_val:0.0634046569466591},{features:[[9,12,1,3,-1.],[9,13,1,1,3.]],threshold:-2.7670480776578188e-003,right_val:0.4490706026554108,left_val:0.7323467731475830},{features:[[10,15,2,4,-1.],[10,17,2,2,2.]],threshold:2.7152578695677221e-004,right_val:0.5985518097877502,left_val:0.4114834964275360}],threshold:23.9187908172607420},{simpleClassifiers:[{features:[[7,7,6,1,-1.],[9,7,2,1,3.]],threshold:1.4786219689995050e-003,right_val:0.6643316745758057,left_val:0.2663545012474060},{features:[[12,3,6,6,-1.],[15,3,3,3,2.],[12,6,3,3,2.]],threshold:-1.8741659587249160e-003,right_val:0.2518512904644013,left_val:0.6143848896026611},{features:[[0,4,10,6,-1.],[0,6,10,2,3.]],threshold:-1.7151009524241090e-003,right_val:0.2397463023662567,left_val:0.5766341090202332},{features:[[8,3,8,14,-1.],[12,3,4,7,2.],[8,10,4,7,2.]],threshold:-1.8939269939437509e-003,right_val:0.2529144883155823,left_val:0.5682045817375183},{features:[[4,4,7,15,-1.],[4,9,7,5,3.]],threshold:-5.3006052039563656e-003,right_val:0.5556079745292664,left_val:0.1640675961971283},{features:[[12,2,6,8,-1.],[15,2,3,4,2.],[12,6,3,4,2.]],threshold:-0.0466625317931175,right_val:0.4762830138206482,left_val:0.6123154163360596},{features:[[2,2,6,8,-1.],[2,2,3,4,2.],[5,6,3,4,2.]],threshold:-7.9431332414969802e-004,right_val:0.2839404046535492,left_val:0.5707858800888062},{features:[[2,13,18,7,-1.],[8,13,6,7,3.]],threshold:0.0148916700854898,right_val:0.6006367206573486,left_val:0.4089672863483429},{features:[[4,3,8,14,-1.],[4,3,4,7,2.],[8,10,4,7,2.]],threshold:-1.2046529445797205e-003,right_val:0.2705289125442505,left_val:0.5712450742721558},{features:[[18,1,2,6,-1.],[18,3,2,2,3.]],threshold:6.0619381256401539e-003,right_val:0.3262225985527039,left_val:0.5262504220008850},{features:[[9,11,2,3,-1.],[9,12,2,1,3.]],threshold:-2.5286648888140917e-003,right_val:0.4199256896972656,left_val:0.6853830814361572},{features:[[18,1,2,6,-1.],[18,3,2,2,3.]],threshold:-5.9010218828916550e-003,right_val:0.5434812903404236,left_val:0.3266282081604004},{features:[[0,1,2,6,-1.],[0,3,2,2,3.]],threshold:5.6702760048210621e-003,right_val:0.2319003939628601,left_val:0.5468410849571228},{features:[[1,5,18,6,-1.],[1,7,18,2,3.]],threshold:-3.0304100364446640e-003,right_val:0.2708238065242767,left_val:0.5570667982101440},{features:[[0,2,6,7,-1.],[3,2,3,7,2.]],threshold:2.9803649522364140e-003,right_val:0.5890625715255737,left_val:0.3700568974018097},{features:[[7,3,6,14,-1.],[7,10,6,7,2.]],threshold:-0.0758405104279518,right_val:0.5419948101043701,left_val:0.2140070050954819},{features:[[3,7,13,10,-1.],[3,12,13,5,2.]],threshold:0.0192625392228365,right_val:0.2726590037345886,left_val:0.5526772141456604},{features:[[11,15,2,2,-1.],[11,16,2,1,2.]],threshold:1.8888259364757687e-004,right_val:0.6017209887504578,left_val:0.3958011865615845},{features:[[2,11,16,4,-1.],[2,11,8,2,2.],[10,13,8,2,2.]],threshold:0.0293695498257875,right_val:0.1435758024454117,left_val:0.5241373777389526},{features:[[13,7,6,4,-1.],[16,7,3,2,2.],[13,9,3,2,2.]],threshold:1.0417619487270713e-003,right_val:0.5929983258247376,left_val:0.3385409116744995},{features:[[6,10,3,9,-1.],[6,13,3,3,3.]],threshold:2.6125640142709017e-003,right_val:0.3021597862243652,left_val:0.5485377907752991},{features:[[14,6,1,6,-1.],[14,9,1,3,2.]],threshold:9.6977467183023691e-004,right_val:0.5532032847404480,left_val:0.3375276029109955},{features:[[5,10,4,1,-1.],[7,10,2,1,2.]],threshold:5.9512659208849072e-004,right_val:0.3359399139881134,left_val:0.5631743073463440},{features:[[3,8,15,5,-1.],[8,8,5,5,3.]],threshold:-0.1015655994415283,right_val:0.5230425000190735,left_val:0.0637350380420685},{features:[[1,6,5,4,-1.],[1,8,5,2,2.]],threshold:0.0361566990613937,right_val:0.1029528975486755,left_val:0.5136963129043579},{features:[[3,1,17,6,-1.],[3,3,17,2,3.]],threshold:3.4624140243977308e-003,right_val:0.5558289289474487,left_val:0.3879320025444031},{features:[[6,7,8,2,-1.],[10,7,4,2,2.]],threshold:0.0195549800992012,right_val:0.1875859946012497,left_val:0.5250086784362793},{features:[[9,7,3,2,-1.],[10,7,1,2,3.]],threshold:-2.3121440317481756e-003,right_val:0.4679641127586365,left_val:0.6672028899192810},{features:[[8,7,3,2,-1.],[9,7,1,2,3.]],threshold:-1.8605289515107870e-003,right_val:0.4334670901298523,left_val:0.7163379192352295},{features:[[8,9,4,2,-1.],[8,10,4,1,2.]],threshold:-9.4026362057775259e-004,right_val:0.5650203227996826,left_val:0.3021360933780670},{features:[[8,8,4,3,-1.],[8,9,4,1,3.]],threshold:-5.2418331615626812e-003,right_val:0.5250256061553955,left_val:0.1820009052753449},{features:[[9,5,6,4,-1.],[9,5,3,4,2.]],threshold:1.1729019752237946e-004,right_val:0.5445973277091980,left_val:0.3389188051223755},{features:[[8,13,4,3,-1.],[8,14,4,1,3.]],threshold:1.1878840159624815e-003,right_val:0.6253563165664673,left_val:0.4085349142551422},{features:[[4,7,12,6,-1.],[10,7,6,3,2.],[4,10,6,3,2.]],threshold:-0.0108813596889377,right_val:0.5700082778930664,left_val:0.3378399014472961},{features:[[8,14,4,3,-1.],[8,15,4,1,3.]],threshold:1.7354859737679362e-003,right_val:0.6523038744926453,left_val:0.4204635918140411},{features:[[9,7,3,3,-1.],[9,8,3,1,3.]],threshold:-6.5119052305817604e-003,right_val:0.5428143739700317,left_val:0.2595216035842896},{features:[[7,4,3,8,-1.],[8,4,1,8,3.]],threshold:-1.2136430013924837e-003,right_val:0.3977893888950348,left_val:0.6165143847465515},{features:[[10,0,3,6,-1.],[11,0,1,6,3.]],threshold:-0.0103542404249310,right_val:0.5219504833221436,left_val:0.1628028005361557},{features:[[6,3,4,8,-1.],[8,3,2,8,2.]],threshold:5.5858830455690622e-004,right_val:0.5503574013710022,left_val:0.3199650943279266},{features:[[14,3,6,13,-1.],[14,3,3,13,2.]],threshold:0.0152996499091387,right_val:0.6122388243675232,left_val:0.4103994071483612},{features:[[8,13,3,6,-1.],[8,16,3,3,2.]],threshold:-0.0215882100164890,right_val:0.5197384953498840,left_val:0.1034912988543510},{features:[[14,3,6,13,-1.],[14,3,3,13,2.]],threshold:-0.1283462941646576,right_val:0.4893102943897247,left_val:0.8493865132331848},{features:[[0,7,10,4,-1.],[0,7,5,2,2.],[5,9,5,2,2.]],threshold:-2.2927189711481333e-003,right_val:0.5471575260162354,left_val:0.3130157887935638},{features:[[14,3,6,13,-1.],[14,3,3,13,2.]],threshold:0.0799151062965393,right_val:0.6073989272117615,left_val:0.4856320917606354},{features:[[0,3,6,13,-1.],[3,3,3,13,2.]],threshold:-0.0794410929083824,right_val:0.4624533057212830,left_val:0.8394674062728882},{features:[[9,1,4,1,-1.],[9,1,2,1,2.]],threshold:-5.2800010889768600e-003,right_val:0.5306698083877564,left_val:0.1881695985794067},{features:[[8,0,2,1,-1.],[9,0,1,1,2.]],threshold:1.0463109938427806e-003,right_val:0.2583065927028656,left_val:0.5271229147911072},{features:[[10,16,4,4,-1.],[12,16,2,2,2.],[10,18,2,2,2.]],threshold:2.6317298761568964e-004,right_val:0.5735440850257874,left_val:0.4235304892063141},{features:[[9,6,2,3,-1.],[10,6,1,3,2.]],threshold:-3.6173160187900066e-003,right_val:0.4495444893836975,left_val:0.6934396028518677},{features:[[4,5,12,2,-1.],[8,5,4,2,3.]],threshold:0.0114218797534704,right_val:0.4138193130493164,left_val:0.5900921225547791},{features:[[8,7,3,5,-1.],[9,7,1,5,3.]],threshold:-1.9963278900831938e-003,right_val:0.4327239990234375,left_val:0.6466382741928101}],threshold:24.5278797149658200},{simpleClassifiers:[{features:[[6,4,8,6,-1.],[6,6,8,2,3.]],threshold:-9.9691245704889297e-003,right_val:0.2482212036848068,left_val:0.6142324209213257},{features:[[9,5,2,12,-1.],[9,11,2,6,2.]],threshold:7.3073059320449829e-004,right_val:0.2321965992450714,left_val:0.5704951882362366},{features:[[4,6,6,8,-1.],[4,10,6,4,2.]],threshold:6.4045301405712962e-004,right_val:0.5814933180809021,left_val:0.2112251967191696},{features:[[12,2,8,5,-1.],[12,2,4,5,2.]],threshold:4.5424019917845726e-003,right_val:0.5866311788558960,left_val:0.2950482070446014},{features:[[0,8,18,3,-1.],[0,9,18,1,3.]],threshold:9.2477443104144186e-005,right_val:0.5791326761245728,left_val:0.2990990877151489},{features:[[8,12,4,8,-1.],[8,16,4,4,2.]],threshold:-8.6603146046400070e-003,right_val:0.5635542273521423,left_val:0.2813029885292053},{features:[[0,2,8,5,-1.],[4,2,4,5,2.]],threshold:8.0515816807746887e-003,right_val:0.6054757237434387,left_val:0.3535369038581848},{features:[[13,11,3,4,-1.],[13,13,3,2,2.]],threshold:4.3835240649059415e-004,right_val:0.2731510996818543,left_val:0.5596532225608826},{features:[[5,11,6,1,-1.],[7,11,2,1,3.]],threshold:-9.8168973636347800e-005,right_val:0.3638561069965363,left_val:0.5978031754493713},{features:[[11,3,3,1,-1.],[12,3,1,1,3.]],threshold:-1.1298790341243148e-003,right_val:0.5432729125022888,left_val:0.2755252122879028},{features:[[7,13,5,3,-1.],[7,14,5,1,3.]],threshold:6.4356150105595589e-003,right_val:0.7069833278656006,left_val:0.4305641949176788},{features:[[11,11,7,6,-1.],[11,14,7,3,2.]],threshold:-0.0568293295800686,right_val:0.5294997096061707,left_val:0.2495242953300476},{features:[[2,11,7,6,-1.],[2,14,7,3,2.]],threshold:4.0668169967830181e-003,right_val:0.2497723996639252,left_val:0.5478553175926209},{features:[[12,14,2,6,-1.],[12,16,2,2,3.]],threshold:4.8164798499783501e-005,right_val:0.5706356167793274,left_val:0.3938601016998291},{features:[[8,14,3,3,-1.],[8,15,3,1,3.]],threshold:6.1795017682015896e-003,right_val:0.7394766807556152,left_val:0.4407606124877930},{features:[[11,0,3,5,-1.],[12,0,1,5,3.]],threshold:6.4985752105712891e-003,right_val:0.2479152977466583,left_val:0.5445243120193481},{features:[[6,1,4,9,-1.],[8,1,2,9,2.]],threshold:-1.0211090557277203e-003,right_val:0.5338971018791199,left_val:0.2544766962528229},{features:[[10,3,6,1,-1.],[12,3,2,1,3.]],threshold:-5.4247528314590454e-003,right_val:0.5324069261550903,left_val:0.2718858122825623},{features:[[8,8,3,4,-1.],[8,10,3,2,2.]],threshold:-1.0559899965301156e-003,right_val:0.5534508824348450,left_val:0.3178288042545319},{features:[[8,12,4,2,-1.],[8,13,4,1,2.]],threshold:6.6465808777138591e-004,right_val:0.6558194160461426,left_val:0.4284219145774841},{features:[[5,18,4,2,-1.],[5,19,4,1,2.]],threshold:-2.7524109464138746e-004,right_val:0.3810262978076935,left_val:0.5902860760688782},{features:[[2,1,18,6,-1.],[2,3,18,2,3.]],threshold:4.2293202131986618e-003,right_val:0.5709385871887207,left_val:0.3816489875316620},{features:[[6,0,3,2,-1.],[7,0,1,2,3.]],threshold:-3.2868210691958666e-003,right_val:0.5259544253349304,left_val:0.1747743934392929},{features:[[13,8,6,2,-1.],[16,8,3,1,2.],[13,9,3,1,2.]],threshold:1.5611879643984139e-004,right_val:0.5725612044334412,left_val:0.3601722121238709},{features:[[6,10,3,6,-1.],[6,13,3,3,2.]],threshold:-7.3621381488919724e-006,right_val:0.3044497072696686,left_val:0.5401858091354370},{features:[[0,13,20,4,-1.],[10,13,10,2,2.],[0,15,10,2,2.]],threshold:-0.0147672500461340,right_val:0.5573434829711914,left_val:0.3220770061016083},{features:[[7,7,6,5,-1.],[9,7,2,5,3.]],threshold:0.0244895908981562,right_val:0.6518812775611877,left_val:0.4301528036594391},{features:[[11,0,2,2,-1.],[11,1,2,1,2.]],threshold:-3.7652091123163700e-004,right_val:0.5598236918449402,left_val:0.3564583063125610},{features:[[1,8,6,2,-1.],[1,8,3,1,2.],[4,9,3,1,2.]],threshold:7.3657688517414499e-006,right_val:0.5561897754669190,left_val:0.3490782976150513},{features:[[0,2,20,2,-1.],[10,2,10,1,2.],[0,3,10,1,2.]],threshold:-0.0150999398902059,right_val:0.5335299968719482,left_val:0.1776272058486939},{features:[[7,14,5,3,-1.],[7,15,5,1,3.]],threshold:-3.8316650316119194e-003,right_val:0.4221394062042236,left_val:0.6149687767028809},{features:[[7,13,6,6,-1.],[10,13,3,3,2.],[7,16,3,3,2.]],threshold:0.0169254001230001,right_val:0.2166585028171539,left_val:0.5413014888763428},{features:[[9,12,2,3,-1.],[9,13,2,1,3.]],threshold:-3.0477850232273340e-003,right_val:0.4354617893695831,left_val:0.6449490785598755},{features:[[16,11,1,6,-1.],[16,13,1,2,3.]],threshold:3.2140589319169521e-003,right_val:0.3523217141628265,left_val:0.5400155186653137},{features:[[3,11,1,6,-1.],[3,13,1,2,3.]],threshold:-4.0023201145231724e-003,right_val:0.5338417291641235,left_val:0.2774524092674255},{features:[[4,4,14,12,-1.],[11,4,7,6,2.],[4,10,7,6,2.]],threshold:7.4182129465043545e-003,right_val:0.3702817857265472,left_val:0.5676739215850830},{features:[[5,4,3,3,-1.],[5,5,3,1,3.]],threshold:-8.8764587417244911e-003,right_val:0.4583688974380493,left_val:0.7749221920967102},{features:[[12,3,3,3,-1.],[13,3,1,3,3.]],threshold:2.7311739977449179e-003,right_val:0.3996661007404327,left_val:0.5338721871376038},{features:[[6,6,8,3,-1.],[6,7,8,1,3.]],threshold:-2.5082379579544067e-003,right_val:0.3777498900890350,left_val:0.5611963272094727},{features:[[12,3,3,3,-1.],[13,3,1,3,3.]],threshold:-8.0541074275970459e-003,right_val:0.5179182887077332,left_val:0.2915228903293610},{features:[[3,1,4,10,-1.],[3,1,2,5,2.],[5,6,2,5,2.]],threshold:-9.7938813269138336e-004,right_val:0.3700192868709564,left_val:0.5536432862281799},{features:[[5,7,10,2,-1.],[5,7,5,2,2.]],threshold:-5.8745909482240677e-003,right_val:0.5679376125335693,left_val:0.3754391074180603},{features:[[8,7,3,3,-1.],[9,7,1,3,3.]],threshold:-4.4936719350516796e-003,right_val:0.4480949938297272,left_val:0.7019699215888977},{features:[[15,12,2,3,-1.],[15,13,2,1,3.]],threshold:-5.4389229044318199e-003,right_val:0.5313386917114258,left_val:0.2310364991426468},{features:[[7,8,3,4,-1.],[8,8,1,4,3.]],threshold:-7.5094640487805009e-004,right_val:0.4129343032836914,left_val:0.5864868760108948},{features:[[13,4,1,12,-1.],[13,10,1,6,2.]],threshold:1.4528800420521293e-005,right_val:0.5619621276855469,left_val:0.3732407093048096},{features:[[4,5,12,12,-1.],[4,5,6,6,2.],[10,11,6,6,2.]],threshold:0.0407580696046352,right_val:0.2720521986484528,left_val:0.5312091112136841},{features:[[7,14,7,3,-1.],[7,15,7,1,3.]],threshold:6.6505931317806244e-003,right_val:0.6693493723869324,left_val:0.4710015952587128},{features:[[3,12,2,3,-1.],[3,13,2,1,3.]],threshold:4.5759351924061775e-003,right_val:0.1637275964021683,left_val:0.5167819261550903},{features:[[3,2,14,2,-1.],[10,2,7,1,2.],[3,3,7,1,2.]],threshold:6.5269311890006065e-003,right_val:0.2938531935214996,left_val:0.5397608876228333},{features:[[0,1,3,10,-1.],[1,1,1,10,3.]],threshold:-0.0136603796854615,right_val:0.4532200098037720,left_val:0.7086488008499146},{features:[[9,0,6,5,-1.],[11,0,2,5,3.]],threshold:0.0273588690906763,right_val:0.3589231967926025,left_val:0.5206481218338013},{features:[[5,7,6,2,-1.],[8,7,3,2,2.]],threshold:6.2197551596909761e-004,right_val:0.5441123247146606,left_val:0.3507075905799866},{features:[[7,1,6,10,-1.],[7,6,6,5,2.]],threshold:-3.3077080734074116e-003,right_val:0.4024891853332520,left_val:0.5859522819519043},{features:[[1,1,18,3,-1.],[7,1,6,3,3.]],threshold:-0.0106311095878482,right_val:0.4422602951526642,left_val:0.6743267178535461},{features:[[16,3,3,6,-1.],[16,5,3,2,3.]],threshold:0.0194416493177414,right_val:0.1797904968261719,left_val:0.5282716155052185}],threshold:27.1533508300781250},{simpleClassifiers:[{features:[[6,3,7,6,-1.],[6,6,7,3,2.]],threshold:-5.5052167735993862e-003,right_val:0.2626559138298035,left_val:0.5914731025695801},{features:[[4,7,12,2,-1.],[8,7,4,2,3.]],threshold:1.9562279339879751e-003,right_val:0.5741627216339111,left_val:0.2312581986188889},{features:[[0,4,17,10,-1.],[0,9,17,5,2.]],threshold:-8.8924784213304520e-003,right_val:0.5626654028892517,left_val:0.1656530052423477},{features:[[3,4,15,16,-1.],[3,12,15,8,2.]],threshold:0.0836383774876595,right_val:0.1957294940948486,left_val:0.5423449873924255},{features:[[7,15,6,4,-1.],[7,17,6,2,2.]],threshold:1.2282270472496748e-003,right_val:0.5992503762245178,left_val:0.3417904078960419},{features:[[15,2,4,9,-1.],[15,2,2,9,2.]],threshold:5.7629169896245003e-003,right_val:0.6079903841018677,left_val:0.3719581961631775},{features:[[2,3,3,2,-1.],[2,4,3,1,2.]],threshold:-1.6417410224676132e-003,right_val:0.5576915740966797,left_val:0.2577486038208008},{features:[[13,6,7,9,-1.],[13,9,7,3,3.]],threshold:3.4113149158656597e-003,right_val:0.5514171719551086,left_val:0.2950749099254608},{features:[[8,11,4,3,-1.],[8,12,4,1,3.]],threshold:-0.0110693201422691,right_val:0.4477078914642334,left_val:0.7569358944892883},{features:[[0,2,20,6,-1.],[10,2,10,3,2.],[0,5,10,3,2.]],threshold:0.0348659716546535,right_val:0.2669621109962463,left_val:0.5583708882331848},{features:[[3,2,6,10,-1.],[3,2,3,5,2.],[6,7,3,5,2.]],threshold:6.5701099811121821e-004,right_val:0.2988890111446381,left_val:0.5627313256263733},{features:[[13,10,3,4,-1.],[13,12,3,2,2.]],threshold:-0.0243391301482916,right_val:0.5108863115310669,left_val:0.2771185040473938},{features:[[4,10,3,4,-1.],[4,12,3,2,2.]],threshold:5.9435202274471521e-004,right_val:0.3120341897010803,left_val:0.5580651760101318},{features:[[7,5,6,3,-1.],[9,5,2,3,3.]],threshold:2.2971509024500847e-003,right_val:0.5679075717926025,left_val:0.3330250084400177},{features:[[7,6,6,8,-1.],[7,10,6,4,2.]],threshold:-3.7801829166710377e-003,right_val:0.5344808101654053,left_val:0.2990534901618958},{features:[[0,11,20,6,-1.],[0,14,20,3,2.]],threshold:-0.1342066973447800,right_val:0.5392568111419678,left_val:0.1463858932256699},{features:[[4,13,4,6,-1.],[4,13,2,3,2.],[6,16,2,3,2.]],threshold:7.5224548345431685e-004,right_val:0.5692734718322754,left_val:0.3746953904628754},{features:[[6,0,8,12,-1.],[10,0,4,6,2.],[6,6,4,6,2.]],threshold:-0.0405455417931080,right_val:0.5484297871589661,left_val:0.2754747867584229},{features:[[2,0,15,2,-1.],[2,1,15,1,2.]],threshold:1.2572970008477569e-003,right_val:0.5756075978279114,left_val:0.3744584023952484},{features:[[9,12,2,3,-1.],[9,13,2,1,3.]],threshold:-7.4249948374927044e-003,right_val:0.4728231132030487,left_val:0.7513859272003174},{features:[[3,12,1,2,-1.],[3,13,1,1,2.]],threshold:5.0908129196614027e-004,right_val:0.2932321131229401,left_val:0.5404896736145020},{features:[[9,11,2,3,-1.],[9,12,2,1,3.]],threshold:-1.2808450264856219e-003,right_val:0.4273349046707153,left_val:0.6169779896736145},{features:[[7,3,3,1,-1.],[8,3,1,1,3.]],threshold:-1.8348860321566463e-003,right_val:0.5206472277641296,left_val:0.2048496007919312},{features:[[17,7,3,6,-1.],[17,9,3,2,3.]],threshold:0.0274848695844412,right_val:0.1675522029399872,left_val:0.5252984762191773},{features:[[7,2,3,2,-1.],[8,2,1,2,3.]],threshold:2.2372419480234385e-003,right_val:0.2777658104896545,left_val:0.5267782807350159},{features:[[11,4,5,3,-1.],[11,5,5,1,3.]],threshold:-8.8635291904211044e-003,right_val:0.4812048971652985,left_val:0.6954557895660400},{features:[[4,4,5,3,-1.],[4,5,5,1,3.]],threshold:4.1753971017897129e-003,right_val:0.6349195837974548,left_val:0.4291887879371643},{features:[[19,3,1,2,-1.],[19,4,1,1,2.]],threshold:-1.7098189564421773e-003,right_val:0.5361248850822449,left_val:0.2930536866188049},{features:[[5,5,4,3,-1.],[5,6,4,1,3.]],threshold:6.5328548662364483e-003,right_val:0.7409694194793701,left_val:0.4495325088500977},{features:[[17,7,3,6,-1.],[17,9,3,2,3.]],threshold:-9.5372907817363739e-003,right_val:0.5416501760482788,left_val:0.3149119913578033},{features:[[0,7,3,6,-1.],[0,9,3,2,3.]],threshold:0.0253109894692898,right_val:0.1311707943677902,left_val:0.5121892094612122},{features:[[14,2,6,9,-1.],[14,5,6,3,3.]],threshold:0.0364609695971012,right_val:0.2591339945793152,left_val:0.5175911784172058},{features:[[0,4,5,6,-1.],[0,6,5,2,3.]],threshold:0.0208543296903372,right_val:0.1582316011190414,left_val:0.5137140154838562},{features:[[10,5,6,2,-1.],[12,5,2,2,3.]],threshold:-8.7207747856155038e-004,right_val:0.4398978948593140,left_val:0.5574309825897217},{features:[[4,5,6,2,-1.],[6,5,2,2,3.]],threshold:-1.5227000403683633e-005,right_val:0.3708069920539856,left_val:0.5548940896987915},{features:[[8,1,4,6,-1.],[8,3,4,2,3.]],threshold:-8.4316509310156107e-004,right_val:0.5554211139678955,left_val:0.3387419879436493},{features:[[0,2,3,6,-1.],[0,4,3,2,3.]],threshold:3.6037859972566366e-003,right_val:0.3411171138286591,left_val:0.5358061790466309},{features:[[6,6,8,3,-1.],[6,7,8,1,3.]],threshold:-6.8057891912758350e-003,right_val:0.4345862865447998,left_val:0.6125202775001526},{features:[[0,1,5,9,-1.],[0,4,5,3,3.]],threshold:-0.0470216609537601,right_val:0.5193738937377930,left_val:0.2358165979385376},{features:[[16,0,4,15,-1.],[16,0,2,15,2.]],threshold:-0.0369541086256504,right_val:0.4760943949222565,left_val:0.7323111295700073},{features:[[1,10,3,2,-1.],[1,11,3,1,2.]],threshold:1.0439479956403375e-003,right_val:0.3411330878734589,left_val:0.5419455170631409},{features:[[14,4,1,10,-1.],[14,9,1,5,2.]],threshold:-2.1050689974799752e-004,right_val:0.5554947257041931,left_val:0.2821694016456604},{features:[[0,1,4,12,-1.],[2,1,2,12,2.]],threshold:-0.0808315873146057,right_val:0.4697434902191162,left_val:0.9129930138587952},{features:[[11,11,4,2,-1.],[11,11,2,2,2.]],threshold:-3.6579059087671340e-004,right_val:0.3978292942047119,left_val:0.6022670269012451},{features:[[5,11,4,2,-1.],[7,11,2,2,2.]],threshold:-1.2545920617412776e-004,right_val:0.3845539987087250,left_val:0.5613213181495667},{features:[[3,8,15,5,-1.],[8,8,5,5,3.]],threshold:-0.0687864869832993,right_val:0.5300496816635132,left_val:0.2261611968278885},{features:[[0,0,6,10,-1.],[3,0,3,10,2.]],threshold:0.0124157899990678,right_val:0.5828812122344971,left_val:0.4075691998004913},{features:[[11,4,3,2,-1.],[12,4,1,2,3.]],threshold:-4.7174817882478237e-003,right_val:0.5267757773399353,left_val:0.2827253937721252},{features:[[8,12,3,8,-1.],[8,16,3,4,2.]],threshold:0.0381368584930897,right_val:0.1023615971207619,left_val:0.5074741244316101},{features:[[8,14,5,3,-1.],[8,15,5,1,3.]],threshold:-2.8168049175292253e-003,right_val:0.4359692931175232,left_val:0.6169006824493408},{features:[[7,14,4,3,-1.],[7,15,4,1,3.]],threshold:8.1303603947162628e-003,right_val:0.7606095075607300,left_val:0.4524433016777039},{features:[[11,4,3,2,-1.],[12,4,1,2,3.]],threshold:6.0056019574403763e-003,right_val:0.1859712004661560,left_val:0.5240408778190613},{features:[[3,15,14,4,-1.],[3,15,7,2,2.],[10,17,7,2,2.]],threshold:0.0191393196582794,right_val:0.2332071959972382,left_val:0.5209379196166992},{features:[[2,2,16,4,-1.],[10,2,8,2,2.],[2,4,8,2,2.]],threshold:0.0164457596838474,right_val:0.3264234960079193,left_val:0.5450702905654907},{features:[[0,8,6,12,-1.],[3,8,3,12,2.]],threshold:-0.0373568907380104,right_val:0.4533241987228394,left_val:0.6999046802520752},{features:[[5,7,10,2,-1.],[5,7,5,2,2.]],threshold:-0.0197279006242752,right_val:0.5412809848785400,left_val:0.2653664946556091},{features:[[9,7,2,5,-1.],[10,7,1,5,2.]],threshold:6.6972579807043076e-003,right_val:0.7138652205467224,left_val:0.4480566084384918},{features:[[13,7,6,4,-1.],[16,7,3,2,2.],[13,9,3,2,2.]],threshold:7.4457528535276651e-004,right_val:0.5471320152282715,left_val:0.4231350123882294},{features:[[0,13,8,2,-1.],[0,14,8,1,2.]],threshold:1.1790640419349074e-003,right_val:0.3130455017089844,left_val:0.5341702103614807},{features:[[13,7,6,4,-1.],[16,7,3,2,2.],[13,9,3,2,2.]],threshold:0.0349806100130081,right_val:0.3430530130863190,left_val:0.5118659734725952},{features:[[1,7,6,4,-1.],[1,7,3,2,2.],[4,9,3,2,2.]],threshold:5.6859792675822973e-004,right_val:0.5468639731407166,left_val:0.3532187044620514},{features:[[12,6,1,12,-1.],[12,12,1,6,2.]],threshold:-0.0113406497985125,right_val:0.5348700881004334,left_val:0.2842353880405426},{features:[[9,5,2,6,-1.],[10,5,1,6,2.]],threshold:-6.6228108480572701e-003,right_val:0.4492664933204651,left_val:0.6883640289306641},{features:[[14,12,2,3,-1.],[14,13,2,1,3.]],threshold:-8.0160330981016159e-003,right_val:0.5224308967590332,left_val:0.1709893941879273},{features:[[4,12,2,3,-1.],[4,13,2,1,3.]],threshold:1.4206819469109178e-003,right_val:0.2993383109569550,left_val:0.5290846228599548},{features:[[8,12,4,3,-1.],[8,13,4,1,3.]],threshold:-2.7801711112260818e-003,right_val:0.4460499882698059,left_val:0.6498854160308838},{features:[[5,2,2,4,-1.],[5,2,1,2,2.],[6,4,1,2,2.]],threshold:-1.4747589593753219e-003,right_val:0.5388113260269165,left_val:0.3260438144207001},{features:[[5,5,11,3,-1.],[5,6,11,1,3.]],threshold:-0.0238303393125534,right_val:0.4801219999790192,left_val:0.7528941035270691},{features:[[7,6,4,12,-1.],[7,12,4,6,2.]],threshold:6.9369790144264698e-003,right_val:0.3261427879333496,left_val:0.5335165858268738},{features:[[12,13,8,5,-1.],[12,13,4,5,2.]],threshold:8.2806255668401718e-003,right_val:0.5737829804420471,left_val:0.4580394029617310},{features:[[7,6,1,12,-1.],[7,12,1,6,2.]],threshold:-0.0104395002126694,right_val:0.5233827829360962,left_val:0.2592320144176483}],threshold:34.5541114807128910},{simpleClassifiers:[{features:[[1,2,6,3,-1.],[4,2,3,3,2.]],threshold:7.2006587870419025e-003,right_val:0.6849808096885681,left_val:0.3258886039257050},{features:[[9,5,6,10,-1.],[12,5,3,5,2.],[9,10,3,5,2.]],threshold:-2.8593589086085558e-003,right_val:0.2537829875946045,left_val:0.5838881134986877},{features:[[5,5,8,12,-1.],[5,5,4,6,2.],[9,11,4,6,2.]],threshold:6.8580528022721410e-004,right_val:0.2812424004077911,left_val:0.5708081722259522},{features:[[0,7,20,6,-1.],[0,9,20,2,3.]],threshold:7.9580191522836685e-003,right_val:0.5544260740280151,left_val:0.2501051127910614},{features:[[4,2,2,2,-1.],[4,3,2,1,2.]],threshold:-1.2124150525778532e-003,right_val:0.5433350205421448,left_val:0.2385368049144745},{features:[[4,18,12,2,-1.],[8,18,4,2,3.]],threshold:7.9426132142543793e-003,right_val:0.6220757961273193,left_val:0.3955070972442627},{features:[[7,4,4,16,-1.],[7,12,4,8,2.]],threshold:2.4630590341985226e-003,right_val:0.2992357909679413,left_val:0.5639708042144775},{features:[[7,6,7,8,-1.],[7,10,7,4,2.]],threshold:-6.0396599583327770e-003,right_val:0.5411676764488220,left_val:0.2186512947082520},{features:[[6,3,3,1,-1.],[7,3,1,1,3.]],threshold:-1.2988339876756072e-003,right_val:0.5364584922790527,left_val:0.2350706011056900},{features:[[11,15,2,4,-1.],[11,17,2,2,2.]],threshold:2.2299369447864592e-004,right_val:0.5729606151580811,left_val:0.3804112970829010},{features:[[3,5,4,8,-1.],[3,9,4,4,2.]],threshold:1.4654280385002494e-003,right_val:0.5258268713951111,left_val:0.2510167956352234},{features:[[7,1,6,12,-1.],[7,7,6,6,2.]],threshold:-8.1210042117163539e-004,right_val:0.3851158916950226,left_val:0.5992823839187622},{features:[[4,6,6,2,-1.],[6,6,2,2,3.]],threshold:-1.3836020370945334e-003,right_val:0.3636586964130402,left_val:0.5681396126747131},{features:[[16,4,4,6,-1.],[16,6,4,2,3.]],threshold:-0.0279364492744207,right_val:0.5377560257911682,left_val:0.1491317003965378},{features:[[3,3,5,2,-1.],[3,4,5,1,2.]],threshold:-4.6919551095925272e-004,right_val:0.5572484731674194,left_val:0.3692429959774017},{features:[[9,11,2,3,-1.],[9,12,2,1,3.]],threshold:-4.9829659983515739e-003,right_val:0.4532504081726074,left_val:0.6758509278297424},{features:[[2,16,4,2,-1.],[2,17,4,1,2.]],threshold:1.8815309740602970e-003,right_val:0.2932539880275726,left_val:0.5368022918701172},{features:[[7,13,6,6,-1.],[10,13,3,3,2.],[7,16,3,3,2.]],threshold:-0.0190675500780344,right_val:0.5330067276954651,left_val:0.1649377048015595},{features:[[7,0,3,4,-1.],[8,0,1,4,3.]],threshold:-4.6906559728085995e-003,right_val:0.5119361877441406,left_val:0.1963925957679749},{features:[[8,15,4,3,-1.],[8,16,4,1,3.]],threshold:5.9777139686048031e-003,right_val:0.7008398175239563,left_val:0.4671171903610230},{features:[[0,4,4,6,-1.],[0,6,4,2,3.]],threshold:-0.0333031304180622,right_val:0.5104162096977234,left_val:0.1155416965484619},{features:[[5,6,12,3,-1.],[9,6,4,3,3.]],threshold:0.0907441079616547,right_val:0.1306173056364059,left_val:0.5149660110473633},{features:[[7,6,6,14,-1.],[9,6,2,14,3.]],threshold:9.3555898638442159e-004,right_val:0.5439859032630920,left_val:0.3605481088161469},{features:[[9,7,3,3,-1.],[10,7,1,3,3.]],threshold:0.0149016501381993,right_val:0.7687569856643677,left_val:0.4886212050914764},{features:[[6,12,2,4,-1.],[6,14,2,2,2.]],threshold:6.1594118596985936e-004,right_val:0.3240939080715179,left_val:0.5356813073158264},{features:[[10,12,7,6,-1.],[10,14,7,2,3.]],threshold:-0.0506709888577461,right_val:0.5230404138565064,left_val:0.1848621964454651},{features:[[1,0,15,2,-1.],[1,1,15,1,2.]],threshold:6.8665749859064817e-004,right_val:0.5517945885658264,left_val:0.3840579986572266},{features:[[14,0,6,6,-1.],[14,0,3,6,2.]],threshold:8.3712432533502579e-003,right_val:0.6131753921508789,left_val:0.4288564026355743},{features:[[5,3,3,1,-1.],[6,3,1,1,3.]],threshold:-1.2953069526702166e-003,right_val:0.5280737876892090,left_val:0.2913674116134644},{features:[[14,0,6,6,-1.],[14,0,3,6,2.]],threshold:-0.0419416800141335,right_val:0.4856030941009522,left_val:0.7554799914360046},{features:[[0,3,20,10,-1.],[0,8,20,5,2.]],threshold:-0.0235293805599213,right_val:0.5256081223487854,left_val:0.2838279902935028},{features:[[14,0,6,6,-1.],[14,0,3,6,2.]],threshold:0.0408574491739273,right_val:0.6277297139167786,left_val:0.4870935082435608},{features:[[0,0,6,6,-1.],[3,0,3,6,2.]],threshold:-0.0254068691283464,right_val:0.4575029015541077,left_val:0.7099707722663879},{features:[[19,15,1,2,-1.],[19,16,1,1,2.]],threshold:-4.1415440500713885e-004,right_val:0.5469412207603455,left_val:0.4030886888504028},{features:[[0,2,4,8,-1.],[2,2,2,8,2.]],threshold:0.0218241196125746,right_val:0.6768701076507568,left_val:0.4502024054527283},{features:[[2,1,18,4,-1.],[11,1,9,2,2.],[2,3,9,2,2.]],threshold:0.0141140399500728,right_val:0.3791700005531311,left_val:0.5442860722541809},{features:[[8,12,1,2,-1.],[8,13,1,1,2.]],threshold:6.7214590671937913e-005,right_val:0.5873476266860962,left_val:0.4200463891029358},{features:[[5,2,10,6,-1.],[10,2,5,3,2.],[5,5,5,3,2.]],threshold:-7.9417638480663300e-003,right_val:0.5585265755653381,left_val:0.3792561888694763},{features:[[9,7,2,4,-1.],[10,7,1,4,2.]],threshold:-7.2144409641623497e-003,right_val:0.4603548943996429,left_val:0.7253103852272034},{features:[[9,7,3,3,-1.],[10,7,1,3,3.]],threshold:2.5817339774221182e-003,right_val:0.5900238752365112,left_val:0.4693301916122437},{features:[[4,5,12,8,-1.],[8,5,4,8,3.]],threshold:0.1340931951999664,right_val:0.1808844953775406,left_val:0.5149213075637817},{features:[[15,15,4,3,-1.],[15,16,4,1,3.]],threshold:2.2962710354477167e-003,right_val:0.3717867136001587,left_val:0.5399743914604187},{features:[[8,18,3,1,-1.],[9,18,1,1,3.]],threshold:-2.1575849968940020e-003,right_val:0.5148863792419434,left_val:0.2408495992422104},{features:[[9,13,4,3,-1.],[9,14,4,1,3.]],threshold:-4.9196188338100910e-003,right_val:0.4738740026950836,left_val:0.6573588252067566},{features:[[7,13,4,3,-1.],[7,14,4,1,3.]],threshold:1.6267469618469477e-003,right_val:0.6303114295005798,left_val:0.4192821979522705},{features:[[19,15,1,2,-1.],[19,16,1,1,2.]],threshold:3.3413388882763684e-004,right_val:0.3702101111412048,left_val:0.5540298223495483},{features:[[0,15,8,4,-1.],[0,17,8,2,2.]],threshold:-0.0266980808228254,right_val:0.5101410746574402,left_val:0.1710917949676514},{features:[[9,3,6,4,-1.],[11,3,2,4,3.]],threshold:-0.0305618792772293,right_val:0.5168793797492981,left_val:0.1904218047857285},{features:[[8,14,4,3,-1.],[8,15,4,1,3.]],threshold:2.8511548880487680e-003,right_val:0.6313853859901428,left_val:0.4447506964206696},{features:[[3,14,14,6,-1.],[3,16,14,2,3.]],threshold:-0.0362114794552326,right_val:0.5377349257469177,left_val:0.2490727007389069},{features:[[6,3,6,6,-1.],[6,6,6,3,2.]],threshold:-2.4115189444273710e-003,right_val:0.3664236962795258,left_val:0.5381243228912354},{features:[[5,11,10,6,-1.],[5,14,10,3,2.]],threshold:-7.7253201743587852e-004,right_val:0.3541550040245056,left_val:0.5530232191085815},{features:[[3,10,3,4,-1.],[4,10,1,4,3.]],threshold:2.9481729143299162e-004,right_val:0.5667243003845215,left_val:0.4132699072360992},{features:[[13,9,2,2,-1.],[13,9,1,2,2.]],threshold:-6.2334560789167881e-003,right_val:0.5198668837547302,left_val:0.0987872332334518},{features:[[5,3,6,4,-1.],[7,3,2,4,3.]],threshold:-0.0262747295200825,right_val:0.5028107166290283,left_val:0.0911274924874306},{features:[[9,7,3,3,-1.],[10,7,1,3,3.]],threshold:5.3212260827422142e-003,right_val:0.6222720742225647,left_val:0.4726648926734924},{features:[[2,12,2,3,-1.],[2,13,2,1,3.]],threshold:-4.1129058226943016e-003,right_val:0.5137804746627808,left_val:0.2157457023859024},{features:[[9,8,3,12,-1.],[9,12,3,4,3.]],threshold:3.2457809429615736e-003,right_val:0.3721776902675629,left_val:0.5410770773887634},{features:[[3,14,4,6,-1.],[3,14,2,3,2.],[5,17,2,3,2.]],threshold:-0.0163597092032433,right_val:0.4685291945934296,left_val:0.7787874937057495},{features:[[16,15,2,2,-1.],[16,16,2,1,2.]],threshold:3.2166109303943813e-004,right_val:0.4240373969078064,left_val:0.5478987097740173},{features:[[2,15,2,2,-1.],[2,16,2,1,2.]],threshold:6.4452440710738301e-004,right_val:0.3501324951648712,left_val:0.5330560803413391},{features:[[8,12,4,3,-1.],[8,13,4,1,3.]],threshold:-7.8909732401371002e-003,right_val:0.4726569056510925,left_val:0.6923521161079407},{features:[[0,7,20,1,-1.],[10,7,10,1,2.]],threshold:0.0483362115919590,right_val:0.0757492035627365,left_val:0.5055900216102600},{features:[[7,6,8,3,-1.],[7,6,4,3,2.]],threshold:-7.5178127735853195e-004,right_val:0.5538573861122131,left_val:0.3783741891384125},{features:[[5,7,8,2,-1.],[9,7,4,2,2.]],threshold:-2.4953910615295172e-003,right_val:0.5359612107276917,left_val:0.3081651031970978},{features:[[9,7,3,5,-1.],[10,7,1,5,3.]],threshold:-2.2385010961443186e-003,right_val:0.4649342894554138,left_val:0.6633958816528320},{features:[[8,7,3,5,-1.],[9,7,1,5,3.]],threshold:-1.7988430336117744e-003,right_val:0.4347187876701355,left_val:0.6596844792366028},{features:[[11,1,3,5,-1.],[12,1,1,5,3.]],threshold:8.7860915809869766e-003,right_val:0.2315579950809479,left_val:0.5231832861900330},{features:[[6,2,3,6,-1.],[7,2,1,6,3.]],threshold:3.6715380847454071e-003,right_val:0.2977376878261566,left_val:0.5204250216484070},{features:[[14,14,6,5,-1.],[14,14,3,5,2.]],threshold:-0.0353364497423172,right_val:0.4861505031585693,left_val:0.7238878011703491},{features:[[9,8,2,2,-1.],[9,9,2,1,2.]],threshold:-6.9189240457490087e-004,right_val:0.5229824781417847,left_val:0.3105022013187408},{features:[[10,7,1,3,-1.],[10,8,1,1,3.]],threshold:-3.3946109469980001e-003,right_val:0.5210173726081848,left_val:0.3138968050479889},{features:[[6,6,2,2,-1.],[6,6,1,1,2.],[7,7,1,1,2.]],threshold:9.8569283727556467e-004,right_val:0.6585097908973694,left_val:0.4536580145359039},{features:[[2,11,18,4,-1.],[11,11,9,2,2.],[2,13,9,2,2.]],threshold:-0.0501631014049053,right_val:0.5198916792869568,left_val:0.1804454028606415},{features:[[6,6,2,2,-1.],[6,6,1,1,2.],[7,7,1,1,2.]],threshold:-2.2367259953171015e-003,right_val:0.4651359021663666,left_val:0.7255702018737793},{features:[[0,15,20,2,-1.],[0,16,20,1,2.]],threshold:7.4326287722215056e-004,right_val:0.5898545980453491,left_val:0.4412921071052551},{features:[[4,14,2,3,-1.],[4,15,2,1,3.]],threshold:-9.3485182151198387e-004,right_val:0.5366017818450928,left_val:0.3500052988529205},{features:[[8,14,4,3,-1.],[8,15,4,1,3.]],threshold:0.0174979399889708,right_val:0.8315284848213196,left_val:0.4912194907665253},{features:[[8,7,2,3,-1.],[8,8,2,1,3.]],threshold:-1.5200000489130616e-003,right_val:0.5370560288429260,left_val:0.3570275902748108},{features:[[9,10,2,3,-1.],[9,11,2,1,3.]],threshold:7.8003940870985389e-004,right_val:0.5967335104942322,left_val:0.4353772103786469}],threshold:39.1072883605957030},{simpleClassifiers:[{features:[[5,4,10,4,-1.],[5,6,10,2,2.]],threshold:-9.9945552647113800e-003,right_val:0.3054533004760742,left_val:0.6162583231925964},{features:[[9,7,6,4,-1.],[12,7,3,2,2.],[9,9,3,2,2.]],threshold:-1.1085229925811291e-003,right_val:0.3155578076839447,left_val:0.5818294882774353},{features:[[4,7,3,6,-1.],[4,9,3,2,3.]],threshold:1.0364380432292819e-003,right_val:0.5692911744117737,left_val:0.2552052140235901},{features:[[11,15,4,4,-1.],[13,15,2,2,2.],[11,17,2,2,2.]],threshold:6.8211311008781195e-004,right_val:0.5934931039810181,left_val:0.3685089945793152},{features:[[7,8,4,2,-1.],[7,9,4,1,2.]],threshold:-6.8057340104132891e-004,right_val:0.5474792122840881,left_val:0.2332392036914825},{features:[[13,1,4,3,-1.],[13,1,2,3,2.]],threshold:2.6068789884448051e-004,right_val:0.5667545795440674,left_val:0.3257457017898560},{features:[[5,15,4,4,-1.],[5,15,2,2,2.],[7,17,2,2,2.]],threshold:5.1607372006401420e-004,right_val:0.5845472812652588,left_val:0.3744716942310333},{features:[[9,5,4,7,-1.],[9,5,2,7,2.]],threshold:8.5007521556690335e-004,right_val:0.5522807240486145,left_val:0.3420371115207672},{features:[[5,6,8,3,-1.],[9,6,4,3,2.]],threshold:-1.8607829697430134e-003,right_val:0.5375424027442932,left_val:0.2804419994354248},{features:[[9,9,2,2,-1.],[9,10,2,1,2.]],threshold:-1.5033970121294260e-003,right_val:0.5498952269554138,left_val:0.2579050958156586},{features:[[7,15,5,3,-1.],[7,16,5,1,3.]],threshold:2.3478909861296415e-003,right_val:0.6313710808753967,left_val:0.4175156056880951},{features:[[11,10,4,3,-1.],[11,10,2,3,2.]],threshold:-2.8880240279249847e-004,right_val:0.4052666127681732,left_val:0.5865169763565064},{features:[[6,9,8,10,-1.],[6,14,8,5,2.]],threshold:8.9405477046966553e-003,right_val:0.2318654060363770,left_val:0.5211141109466553},{features:[[10,11,6,2,-1.],[10,11,3,2,2.]],threshold:-0.0193277392536402,right_val:0.5241525769233704,left_val:0.2753432989120483},{features:[[4,11,6,2,-1.],[7,11,3,2,2.]],threshold:-2.0202060113660991e-004,right_val:0.3677195906639099,left_val:0.5722978711128235},{features:[[11,3,8,1,-1.],[11,3,4,1,2.]],threshold:2.1179069299250841e-003,right_val:0.5542430877685547,left_val:0.4466108083724976},{features:[[6,3,3,2,-1.],[7,3,1,2,3.]],threshold:-1.7743760254234076e-003,right_val:0.5300959944725037,left_val:0.2813253104686737},{features:[[14,5,6,5,-1.],[14,5,3,5,2.]],threshold:4.2234458960592747e-003,right_val:0.5795428156852722,left_val:0.4399709999561310},{features:[[7,5,2,12,-1.],[7,11,2,6,2.]],threshold:-0.0143752200528979,right_val:0.5292059183120728,left_val:0.2981117963790894},{features:[[8,11,4,3,-1.],[8,12,4,1,3.]],threshold:-0.0153491804376245,right_val:0.4748171865940094,left_val:0.7705215215682983},{features:[[4,1,2,3,-1.],[5,1,1,3,2.]],threshold:1.5152279956964776e-005,right_val:0.5576897263526917,left_val:0.3718844056129456},{features:[[18,3,2,6,-1.],[18,5,2,2,3.]],threshold:-9.1293919831514359e-003,right_val:0.5286766886711121,left_val:0.3615196049213409},{features:[[0,3,2,6,-1.],[0,5,2,2,3.]],threshold:2.2512159775942564e-003,right_val:0.3486298024654388,left_val:0.5364704728126526},{features:[[9,12,2,3,-1.],[9,13,2,1,3.]],threshold:-4.9696918576955795e-003,right_val:0.4676836133003235,left_val:0.6927651762962341},{features:[[7,13,4,3,-1.],[7,14,4,1,3.]],threshold:-0.0128290103748441,right_val:0.4660735130310059,left_val:0.7712153792381287},{features:[[18,0,2,6,-1.],[18,2,2,2,3.]],threshold:-9.3660065904259682e-003,right_val:0.5351287722587585,left_val:0.3374983966350555},{features:[[0,0,2,6,-1.],[0,2,2,2,3.]],threshold:3.2452319283038378e-003,right_val:0.3289610147476196,left_val:0.5325189828872681},{features:[[8,14,6,3,-1.],[8,15,6,1,3.]],threshold:-0.0117235602810979,right_val:0.4754300117492676,left_val:0.6837652921676636},{features:[[7,4,2,4,-1.],[8,4,1,4,2.]],threshold:2.9257940695970319e-005,right_val:0.5360502004623413,left_val:0.3572087883949280},{features:[[8,5,4,6,-1.],[8,7,4,2,3.]],threshold:-2.2244219508138485e-005,right_val:0.3552064001560211,left_val:0.5541427135467529},{features:[[6,4,2,2,-1.],[7,4,1,2,2.]],threshold:5.0881509669125080e-003,right_val:0.1256462037563324,left_val:0.5070844292640686},{features:[[3,14,14,4,-1.],[10,14,7,2,2.],[3,16,7,2,2.]],threshold:0.0274296794086695,right_val:0.1625818014144898,left_val:0.5269560217857361},{features:[[6,15,6,2,-1.],[6,15,3,1,2.],[9,16,3,1,2.]],threshold:-6.4142867922782898e-003,right_val:0.4584197103977203,left_val:0.7145588994026184},{features:[[14,15,6,2,-1.],[14,16,6,1,2.]],threshold:3.3479959238320589e-003,right_val:0.3494696915149689,left_val:0.5398612022399902},{features:[[2,12,12,8,-1.],[2,16,12,4,2.]],threshold:-0.0826354920864105,right_val:0.5160226225852966,left_val:0.2439192980527878},{features:[[7,7,7,2,-1.],[7,8,7,1,2.]],threshold:1.0261740535497665e-003,right_val:0.5767908096313477,left_val:0.3886891901493073},{features:[[0,2,18,2,-1.],[0,3,18,1,2.]],threshold:-1.6307090409100056e-003,right_val:0.5347700715065002,left_val:0.3389458060264587},{features:[[9,6,2,5,-1.],[9,6,1,5,2.]],threshold:2.4546680506318808e-003,right_val:0.6387246847152710,left_val:0.4601413905620575},{features:[[7,5,3,8,-1.],[8,5,1,8,3.]],threshold:-9.9476519972085953e-004,right_val:0.4120396077632904,left_val:0.5769879221916199},{features:[[9,6,3,4,-1.],[10,6,1,4,3.]],threshold:0.0154091902077198,right_val:0.7089822292327881,left_val:0.4878709018230438},{features:[[4,13,3,2,-1.],[4,14,3,1,2.]],threshold:1.1784400558099151e-003,right_val:0.2895244956016541,left_val:0.5263553261756897},{features:[[9,4,6,3,-1.],[11,4,2,3,3.]],threshold:-0.0277019198983908,right_val:0.5219606757164002,left_val:0.1498828977346420},{features:[[5,4,6,3,-1.],[7,4,2,3,3.]],threshold:-0.0295053999871016,right_val:0.4999816119670868,left_val:0.0248933192342520},{features:[[14,11,5,2,-1.],[14,12,5,1,2.]],threshold:4.5159430010244250e-004,right_val:0.4029662907123566,left_val:0.5464622974395752},{features:[[1,2,6,9,-1.],[3,2,2,9,3.]],threshold:7.1772639639675617e-003,right_val:0.5866296887397766,left_val:0.4271056950092316},{features:[[14,6,6,13,-1.],[14,6,3,13,2.]],threshold:-0.0741820484399796,right_val:0.4919027984142304,left_val:0.6874179244041443},{features:[[3,6,14,8,-1.],[3,6,7,4,2.],[10,10,7,4,2.]],threshold:-0.0172541607171297,right_val:0.5348739027976990,left_val:0.3370676040649414},{features:[[16,0,4,11,-1.],[16,0,2,11,2.]],threshold:0.0148515598848462,right_val:0.6129904985427856,left_val:0.4626792967319489},{features:[[3,4,12,12,-1.],[3,4,6,6,2.],[9,10,6,6,2.]],threshold:0.0100020002573729,right_val:0.3423453867435455,left_val:0.5346122980117798},{features:[[11,4,5,3,-1.],[11,5,5,1,3.]],threshold:2.0138120744377375e-003,right_val:0.5824304223060608,left_val:0.4643830060958862},{features:[[4,11,4,2,-1.],[4,12,4,1,2.]],threshold:1.5135470312088728e-003,right_val:0.2856149971485138,left_val:0.5196396112442017},{features:[[10,7,2,2,-1.],[10,7,1,2,2.]],threshold:3.1381431035697460e-003,right_val:0.5958529710769653,left_val:0.4838162958621979},{features:[[8,7,2,2,-1.],[9,7,1,2,2.]],threshold:-5.1450440660119057e-003,right_val:0.4741412103176117,left_val:0.8920302987098694},{features:[[9,17,3,2,-1.],[10,17,1,2,3.]],threshold:-4.4736708514392376e-003,right_val:0.5337278842926025,left_val:0.2033942937850952},{features:[[5,6,3,3,-1.],[5,7,3,1,3.]],threshold:1.9628470763564110e-003,right_val:0.6725863218307495,left_val:0.4571633934974670},{features:[[10,0,3,3,-1.],[11,0,1,3,3.]],threshold:5.4260450415313244e-003,right_val:0.2845670878887177,left_val:0.5271108150482178},{features:[[5,6,6,2,-1.],[5,6,3,1,2.],[8,7,3,1,2.]],threshold:4.9611460417509079e-004,right_val:0.5718597769737244,left_val:0.4138312935829163},{features:[[12,16,4,3,-1.],[12,17,4,1,3.]],threshold:9.3728788197040558e-003,right_val:0.2804847061634064,left_val:0.5225151181221008},{features:[[3,12,3,2,-1.],[3,13,3,1,2.]],threshold:6.0500897234305739e-004,right_val:0.3314523994922638,left_val:0.5236768722534180},{features:[[9,12,3,2,-1.],[9,13,3,1,2.]],threshold:5.6792551185935736e-004,right_val:0.6276971101760864,left_val:0.4531059861183167},{features:[[1,11,16,4,-1.],[1,11,8,2,2.],[9,13,8,2,2.]],threshold:0.0246443394571543,right_val:0.2017143964767456,left_val:0.5130851864814758},{features:[[12,4,3,3,-1.],[12,5,3,1,3.]],threshold:-0.0102904504165053,right_val:0.4876641035079956,left_val:0.7786595225334168},{features:[[4,4,5,3,-1.],[4,5,5,1,3.]],threshold:2.0629419013857841e-003,right_val:0.5881264209747315,left_val:0.4288598895072937},{features:[[12,16,4,3,-1.],[12,17,4,1,3.]],threshold:-5.0519481301307678e-003,right_val:0.5286008715629578,left_val:0.3523977994918823},{features:[[5,4,3,3,-1.],[5,5,3,1,3.]],threshold:-5.7692620903253555e-003,right_val:0.4588094055652618,left_val:0.6841086149215698},{features:[[9,0,2,2,-1.],[9,1,2,1,2.]],threshold:-4.5789941214025021e-004,right_val:0.5485978126525879,left_val:0.3565520048141480},{features:[[8,9,4,2,-1.],[8,10,4,1,2.]],threshold:-7.5918837683275342e-004,right_val:0.5254197120666504,left_val:0.3368793129920960},{features:[[8,8,4,3,-1.],[8,9,4,1,3.]],threshold:-1.7737259622663260e-003,right_val:0.5454015135765076,left_val:0.3422161042690277},{features:[[0,13,6,3,-1.],[2,13,2,3,3.]],threshold:-8.5610467940568924e-003,right_val:0.4485856890678406,left_val:0.6533612012863159},{features:[[16,14,3,2,-1.],[16,15,3,1,2.]],threshold:1.7277270089834929e-003,right_val:0.3925352990627289,left_val:0.5307580232620239},{features:[[1,18,18,2,-1.],[7,18,6,2,3.]],threshold:-0.0281996093690395,right_val:0.4588584005832672,left_val:0.6857458949089050},{features:[[16,14,3,2,-1.],[16,15,3,1,2.]],threshold:-1.7781109781935811e-003,right_val:0.5369856953620911,left_val:0.4037851095199585},{features:[[1,14,3,2,-1.],[1,15,3,1,2.]],threshold:3.3177141449414194e-004,right_val:0.3705750107765198,left_val:0.5399798750877380},{features:[[7,14,6,3,-1.],[7,15,6,1,3.]],threshold:2.6385399978607893e-003,right_val:0.6452730894088745,left_val:0.4665437042713165},{features:[[5,14,8,3,-1.],[5,15,8,1,3.]],threshold:-2.1183069329708815e-003,right_val:0.4064677059650421,left_val:0.5914781093597412},{features:[[10,6,4,14,-1.],[10,6,2,14,2.]],threshold:-0.0147732896730304,right_val:0.5294762849807739,left_val:0.3642038106918335},{features:[[6,6,4,14,-1.],[8,6,2,14,2.]],threshold:-0.0168154407292604,right_val:0.5144972801208496,left_val:0.2664231956005096},{features:[[13,5,2,3,-1.],[13,6,2,1,3.]],threshold:-6.3370140269398689e-003,right_val:0.4852097928524017,left_val:0.6779531240463257},{features:[[7,16,6,1,-1.],[9,16,2,1,3.]],threshold:-4.4560048991115764e-005,right_val:0.4153054058551788,left_val:0.5613964796066284},{features:[[9,12,3,3,-1.],[9,13,3,1,3.]],threshold:-1.0240620467811823e-003,right_val:0.4566304087638855,left_val:0.5964478254318237},{features:[[7,0,3,3,-1.],[8,0,1,3,3.]],threshold:-2.3161689750850201e-003,right_val:0.5188159942626953,left_val:0.2976115047931671},{features:[[4,0,16,18,-1.],[4,9,16,9,2.]],threshold:0.5321757197380066,right_val:0.2202631980180740,left_val:0.5187839269638062},{features:[[1,1,16,14,-1.],[1,8,16,7,2.]],threshold:-0.1664305031299591,right_val:0.5060343146324158,left_val:0.1866022944450378},{features:[[3,9,15,4,-1.],[8,9,5,4,3.]],threshold:0.1125352978706360,right_val:0.1185022965073586,left_val:0.5212125182151794},{features:[[6,12,7,3,-1.],[6,13,7,1,3.]],threshold:9.3046864494681358e-003,right_val:0.6826149225234985,left_val:0.4589937031269074},{features:[[14,15,2,3,-1.],[14,16,2,1,3.]],threshold:-4.6255099587142467e-003,right_val:0.5225008726119995,left_val:0.3079940974712372},{features:[[2,3,16,14,-1.],[2,3,8,7,2.],[10,10,8,7,2.]],threshold:-0.1111646965146065,right_val:0.5080801844596863,left_val:0.2101044058799744},{features:[[16,2,4,18,-1.],[18,2,2,9,2.],[16,11,2,9,2.]],threshold:-0.0108884396031499,right_val:0.4790464043617249,left_val:0.5765355229377747},{features:[[4,15,2,3,-1.],[4,16,2,1,3.]],threshold:5.8564301580190659e-003,right_val:0.1563598960638046,left_val:0.5065100193023682},{features:[[16,2,4,18,-1.],[18,2,2,9,2.],[16,11,2,9,2.]],threshold:0.0548543892800808,right_val:0.7230510711669922,left_val:0.4966914951801300},{features:[[1,1,8,3,-1.],[1,2,8,1,3.]],threshold:-0.0111973397433758,right_val:0.5098798274993897,left_val:0.2194979041814804},{features:[[8,11,4,3,-1.],[8,12,4,1,3.]],threshold:4.4069071300327778e-003,right_val:0.6770902872085571,left_val:0.4778401851654053},{features:[[5,11,5,9,-1.],[5,14,5,3,3.]],threshold:-0.0636652931571007,right_val:0.5081024169921875,left_val:0.1936362981796265},{features:[[16,0,4,11,-1.],[16,0,2,11,2.]],threshold:-9.8081491887569427e-003,right_val:0.4810341000556946,left_val:0.5999063253402710},{features:[[7,0,6,1,-1.],[9,0,2,1,3.]],threshold:-2.1717099007219076e-003,right_val:0.5235472917556763,left_val:0.3338333964347839},{features:[[16,3,3,7,-1.],[17,3,1,7,3.]],threshold:-0.0133155202493072,right_val:0.4919213056564331,left_val:0.6617069840431213},{features:[[1,3,3,7,-1.],[2,3,1,7,3.]],threshold:2.5442079640924931e-003,right_val:0.6082184910774231,left_val:0.4488744139671326},{features:[[7,8,6,12,-1.],[7,12,6,4,3.]],threshold:0.0120378397405148,right_val:0.3292432129383087,left_val:0.5409392118453980},{features:[[0,0,4,11,-1.],[2,0,2,11,2.]],threshold:-0.0207010507583618,right_val:0.4594995975494385,left_val:0.6819120049476624},{features:[[14,0,6,20,-1.],[14,0,3,20,2.]],threshold:0.0276082791388035,right_val:0.5767282843589783,left_val:0.4630792140960693},{features:[[0,3,1,2,-1.],[0,4,1,1,2.]],threshold:1.2370620388537645e-003,right_val:0.2635016143321991,left_val:0.5165379047393799},{features:[[5,5,10,8,-1.],[10,5,5,4,2.],[5,9,5,4,2.]],threshold:-0.0376693382859230,right_val:0.5278980135917664,left_val:0.2536393105983734},{features:[[4,7,12,4,-1.],[4,7,6,2,2.],[10,9,6,2,2.]],threshold:-1.8057259730994701e-003,right_val:0.5517500042915344,left_val:0.3985156118869782}],threshold:50.6104812622070310},{simpleClassifiers:[{features:[[2,1,6,4,-1.],[5,1,3,4,2.]],threshold:4.4299028813838959e-003,right_val:0.6335226297378540,left_val:0.2891018092632294},{features:[[9,7,6,4,-1.],[12,7,3,2,2.],[9,9,3,2,2.]],threshold:-2.3813319858163595e-003,right_val:0.3477487862110138,left_val:0.6211789250373840},{features:[[5,6,2,6,-1.],[5,9,2,3,2.]],threshold:2.2915711160749197e-003,right_val:0.5582118034362793,left_val:0.2254412025213242},{features:[[9,16,6,4,-1.],[12,16,3,2,2.],[9,18,3,2,2.]],threshold:9.9457940086722374e-004,right_val:0.5930070877075195,left_val:0.3711710870265961},{features:[[9,4,2,12,-1.],[9,10,2,6,2.]],threshold:7.7164667891338468e-004,right_val:0.3347995877265930,left_val:0.5651720166206360},{features:[[7,1,6,18,-1.],[9,1,2,18,3.]],threshold:-1.1386410333216190e-003,right_val:0.5508630871772766,left_val:0.3069126009941101},{features:[[4,12,12,2,-1.],[8,12,4,2,3.]],threshold:-1.6403039626311511e-004,right_val:0.3699047863483429,left_val:0.5762827992439270},{features:[[8,8,6,2,-1.],[8,9,6,1,2.]],threshold:2.9793529392918572e-005,right_val:0.5437911152839661,left_val:0.2644244134426117},{features:[[8,0,3,6,-1.],[9,0,1,6,3.]],threshold:8.5774902254343033e-003,right_val:0.1795724928379059,left_val:0.5051138997077942},{features:[[11,18,3,2,-1.],[11,19,3,1,2.]],threshold:-2.6032689493149519e-004,right_val:0.4446826875209808,left_val:0.5826969146728516},{features:[[1,1,17,4,-1.],[1,3,17,2,2.]],threshold:-6.1404630541801453e-003,right_val:0.5346971750259399,left_val:0.3113852143287659},{features:[[11,8,4,12,-1.],[11,8,2,12,2.]],threshold:-0.0230869501829147,right_val:0.5331197977066040,left_val:0.3277946114540100},{features:[[8,14,4,3,-1.],[8,15,4,1,3.]],threshold:-0.0142436502501369,right_val:0.4588063061237335,left_val:0.7381709814071655},{features:[[12,3,2,17,-1.],[12,3,1,17,2.]],threshold:0.0194871295243502,right_val:0.2274471968412399,left_val:0.5256630778312683},{features:[[4,7,6,1,-1.],[6,7,2,1,3.]],threshold:-9.6681108698248863e-004,right_val:0.3815006911754608,left_val:0.5511230826377869},{features:[[18,3,2,3,-1.],[18,4,2,1,3.]],threshold:3.1474709976464510e-003,right_val:0.2543726861476898,left_val:0.5425636768341065},{features:[[8,4,3,4,-1.],[8,6,3,2,2.]],threshold:-1.8026070029009134e-004,right_val:0.3406304121017456,left_val:0.5380191802978516},{features:[[4,5,12,10,-1.],[4,10,12,5,2.]],threshold:-6.0266260989010334e-003,right_val:0.5420572161674500,left_val:0.3035801947116852},{features:[[5,18,4,2,-1.],[7,18,2,2,2.]],threshold:4.4462960795499384e-004,right_val:0.5660110116004944,left_val:0.3990997076034546},{features:[[17,2,3,6,-1.],[17,4,3,2,3.]],threshold:2.2609760053455830e-003,right_val:0.3940688073635101,left_val:0.5562806725502014},{features:[[7,7,6,6,-1.],[9,7,2,6,3.]],threshold:0.0511330589652061,right_val:0.7118561863899231,left_val:0.4609653949737549},{features:[[17,2,3,6,-1.],[17,4,3,2,3.]],threshold:-0.0177863091230392,right_val:0.5322144031524658,left_val:0.2316166013479233},{features:[[8,0,3,4,-1.],[9,0,1,4,3.]],threshold:-4.9679628573358059e-003,right_val:0.5122029185295105,left_val:0.2330771982669830},{features:[[9,14,2,3,-1.],[9,15,2,1,3.]],threshold:2.0667689386755228e-003,right_val:0.6455488204956055,left_val:0.4657444059848785},{features:[[0,12,6,3,-1.],[0,13,6,1,3.]],threshold:7.4413768015801907e-003,right_val:0.2361633926630020,left_val:0.5154392123222351},{features:[[8,14,4,3,-1.],[8,15,4,1,3.]],threshold:-3.6277279723435640e-003,right_val:0.4476661086082459,left_val:0.6219773292541504},{features:[[3,12,2,3,-1.],[3,13,2,1,3.]],threshold:-5.3530759178102016e-003,right_val:0.5102208256721497,left_val:0.1837355047464371},{features:[[5,6,12,7,-1.],[9,6,4,7,3.]],threshold:0.1453091949224472,right_val:0.1535930931568146,left_val:0.5145987272262573},{features:[[0,2,3,6,-1.],[0,4,3,2,3.]],threshold:2.4394490756094456e-003,right_val:0.3624661862850189,left_val:0.5343660116195679},{features:[[14,6,1,3,-1.],[14,7,1,1,3.]],threshold:-3.1283390708267689e-003,right_val:0.4845592081546783,left_val:0.6215007901191711},{features:[[2,0,3,14,-1.],[3,0,1,14,3.]],threshold:1.7940260004252195e-003,right_val:0.5824198126792908,left_val:0.4299261868000031},{features:[[12,14,5,6,-1.],[12,16,5,2,3.]],threshold:0.0362538211047649,right_val:0.1439467966556549,left_val:0.5260334014892578},{features:[[4,14,5,6,-1.],[4,16,5,2,3.]],threshold:-5.1746722310781479e-003,right_val:0.5287045240402222,left_val:0.3506538867950440},{features:[[11,10,2,2,-1.],[12,10,1,1,2.],[11,11,1,1,2.]],threshold:6.5383297624066472e-004,right_val:0.6122040152549744,left_val:0.4809640944004059},{features:[[5,0,3,14,-1.],[6,0,1,14,3.]],threshold:-0.0264802295714617,right_val:0.5045586228370667,left_val:0.1139362007379532},{features:[[10,15,2,3,-1.],[10,16,2,1,3.]],threshold:-3.0440660193562508e-003,right_val:0.4794734120368958,left_val:0.6352095007896423},{features:[[0,2,2,3,-1.],[0,3,2,1,3.]],threshold:3.6993520334362984e-003,right_val:0.2498510926961899,left_val:0.5131118297576904},{features:[[5,11,12,6,-1.],[5,14,12,3,2.]],threshold:-3.6762931267730892e-004,right_val:0.3709532022476196,left_val:0.5421394705772400},{features:[[6,11,3,9,-1.],[6,14,3,3,3.]],threshold:-0.0413822606205940,right_val:0.5081691741943359,left_val:0.1894959956407547},{features:[[11,10,2,2,-1.],[12,10,1,1,2.],[11,11,1,1,2.]],threshold:-1.0532729793339968e-003,right_val:0.4783608913421631,left_val:0.6454367041587830},{features:[[5,6,1,3,-1.],[5,7,1,1,3.]],threshold:-2.1648600231856108e-003,right_val:0.4499826133251190,left_val:0.6215031147003174},{features:[[4,9,13,3,-1.],[4,10,13,1,3.]],threshold:-5.6747748749330640e-004,right_val:0.5419334769248962,left_val:0.3712610900402069},{features:[[1,7,15,6,-1.],[6,7,5,6,3.]],threshold:0.1737584024667740,right_val:0.1215742006897926,left_val:0.5023643970489502},{features:[[4,5,12,6,-1.],[8,5,4,6,3.]],threshold:-2.9049699660390615e-003,right_val:0.5381883978843689,left_val:0.3240267932415009},{features:[[8,10,4,3,-1.],[8,11,4,1,3.]],threshold:1.2299539521336555e-003,right_val:0.5703486204147339,left_val:0.4165507853031158},{features:[[15,14,1,3,-1.],[15,15,1,1,3.]],threshold:-5.4329237900674343e-004,right_val:0.5547549128532410,left_val:0.3854042887687683},{features:[[1,11,5,3,-1.],[1,12,5,1,3.]],threshold:-8.3297258242964745e-003,right_val:0.5097082853317261,left_val:0.2204494029283524},{features:[[7,1,7,12,-1.],[7,7,7,6,2.]],threshold:-1.0417630255687982e-004,right_val:0.4303036034107208,left_val:0.5607066154479981},{features:[[0,1,6,10,-1.],[0,1,3,5,2.],[3,6,3,5,2.]],threshold:0.0312047004699707,right_val:0.6982004046440125,left_val:0.4621657133102417},{features:[[16,1,4,3,-1.],[16,2,4,1,3.]],threshold:7.8943502157926559e-003,right_val:0.2269068062305450,left_val:0.5269594192504883},{features:[[5,5,2,3,-1.],[5,6,2,1,3.]],threshold:-4.3645310215651989e-003,right_val:0.4537956118583679,left_val:0.6359223127365112},{features:[[12,2,3,5,-1.],[13,2,1,5,3.]],threshold:7.6793059706687927e-003,right_val:0.2740483880043030,left_val:0.5274767875671387},{features:[[0,3,4,6,-1.],[0,5,4,2,3.]],threshold:-0.0254311393946409,right_val:0.5071732997894287,left_val:0.2038519978523254},{features:[[8,12,4,2,-1.],[8,13,4,1,2.]],threshold:8.2000601105391979e-004,right_val:0.6119868159294128,left_val:0.4587455093860626},{features:[[8,18,3,1,-1.],[9,18,1,1,3.]],threshold:2.9284600168466568e-003,right_val:0.2028204947710037,left_val:0.5071274042129517},{features:[[11,10,2,2,-1.],[12,10,1,1,2.],[11,11,1,1,2.]],threshold:4.5256470912136137e-005,right_val:0.5430821776390076,left_val:0.4812104105949402},{features:[[7,10,2,2,-1.],[7,10,1,1,2.],[8,11,1,1,2.]],threshold:1.3158309739083052e-003,right_val:0.6779323220252991,left_val:0.4625813961029053},{features:[[11,11,4,4,-1.],[11,13,4,2,2.]],threshold:1.5870389761403203e-003,right_val:0.3431465029716492,left_val:0.5386291742324829},{features:[[8,12,3,8,-1.],[9,12,1,8,3.]],threshold:-0.0215396601706743,right_val:0.5003222823143005,left_val:0.0259425006806850},{features:[[13,0,6,3,-1.],[13,1,6,1,3.]],threshold:0.0143344802781940,right_val:0.1590632945299149,left_val:0.5202844738960266},{features:[[8,8,3,4,-1.],[9,8,1,4,3.]],threshold:-8.3881383761763573e-003,right_val:0.4648044109344482,left_val:0.7282481193542481},{features:[[5,7,10,10,-1.],[10,7,5,5,2.],[5,12,5,5,2.]],threshold:9.1906841844320297e-003,right_val:0.3923191130161285,left_val:0.5562356710433960},{features:[[3,18,8,2,-1.],[3,18,4,1,2.],[7,19,4,1,2.]],threshold:-5.8453059755265713e-003,right_val:0.4629127979278565,left_val:0.6803392767906189},{features:[[10,2,6,8,-1.],[12,2,2,8,3.]],threshold:-0.0547077991068363,right_val:0.5206125974655151,left_val:0.2561671137809753},{features:[[4,2,6,8,-1.],[6,2,2,8,3.]],threshold:9.1142775490880013e-003,right_val:0.3053877055644989,left_val:0.5189620256423950},{features:[[11,0,3,7,-1.],[12,0,1,7,3.]],threshold:-0.0155750000849366,right_val:0.5169094800949097,left_val:0.1295074969530106},{features:[[7,11,2,1,-1.],[8,11,1,1,2.]],threshold:-1.2050600344082341e-004,right_val:0.4230825006961823,left_val:0.5735098123550415},{features:[[15,14,1,3,-1.],[15,15,1,1,3.]],threshold:1.2273970060050488e-003,right_val:0.4079791903495789,left_val:0.5289878249168396},{features:[[7,15,2,2,-1.],[7,15,1,1,2.],[8,16,1,1,2.]],threshold:-1.2186600361019373e-003,right_val:0.4574409127235413,left_val:0.6575639843940735},{features:[[15,14,1,3,-1.],[15,15,1,1,3.]],threshold:-3.3256649039685726e-003,right_val:0.5195019841194153,left_val:0.3628047108650208},{features:[[6,0,3,7,-1.],[7,0,1,7,3.]],threshold:-0.0132883097976446,right_val:0.5043488740921021,left_val:0.1284265965223312},{features:[[18,1,2,7,-1.],[18,1,1,7,2.]],threshold:-3.3839771058410406e-003,right_val:0.4757505953311920,left_val:0.6292240023612976},{features:[[2,0,8,20,-1.],[2,10,8,10,2.]],threshold:-0.2195422053337097,right_val:0.5065013766288757,left_val:0.1487731933593750},{features:[[3,0,15,6,-1.],[3,2,15,2,3.]],threshold:4.9111708067357540e-003,right_val:0.5665838718414307,left_val:0.4256102144718170},{features:[[4,3,12,2,-1.],[4,4,12,1,2.]],threshold:-1.8744950648397207e-004,right_val:0.5586857199668884,left_val:0.4004144072532654},{features:[[16,0,4,5,-1.],[16,0,2,5,2.]],threshold:-5.2178641781210899e-003,right_val:0.4812706112861633,left_val:0.6009116172790527},{features:[[7,0,3,4,-1.],[8,0,1,4,3.]],threshold:-1.1111519997939467e-003,right_val:0.5287089943885803,left_val:0.3514933884143829},{features:[[16,0,4,5,-1.],[16,0,2,5,2.]],threshold:4.4036400504410267e-003,right_val:0.5924085974693298,left_val:0.4642275869846344},{features:[[1,7,6,13,-1.],[3,7,2,13,3.]],threshold:0.1229949966073036,right_val:0.0691524818539619,left_val:0.5025529265403748},{features:[[16,0,4,5,-1.],[16,0,2,5,2.]],threshold:-0.0123135102912784,right_val:0.4934012889862061,left_val:0.5884591937065125},{features:[[0,0,4,5,-1.],[2,0,2,5,2.]],threshold:4.1471039876341820e-003,right_val:0.5893477797508240,left_val:0.4372239112854004},{features:[[14,12,3,6,-1.],[14,14,3,2,3.]],threshold:-3.5502649843692780e-003,right_val:0.5396270155906677,left_val:0.4327551126480103},{features:[[3,12,3,6,-1.],[3,14,3,2,3.]],threshold:-0.0192242693156004,right_val:0.5068330764770508,left_val:0.1913134008646011},{features:[[16,1,4,3,-1.],[16,2,4,1,3.]],threshold:1.4395059552043676e-003,right_val:0.4243533015251160,left_val:0.5308178067207336},{features:[[8,7,2,10,-1.],[8,7,1,5,2.],[9,12,1,5,2.]],threshold:-6.7751999013125896e-003,right_val:0.4540086090564728,left_val:0.6365395784378052},{features:[[11,11,4,4,-1.],[11,13,4,2,2.]],threshold:7.0119630545377731e-003,right_val:0.3026199936866760,left_val:0.5189834237098694},{features:[[0,1,4,3,-1.],[0,2,4,1,3.]],threshold:5.4014651104807854e-003,right_val:0.2557682991027832,left_val:0.5105062127113342},{features:[[13,4,1,3,-1.],[13,5,1,1,3.]],threshold:9.0274988906458020e-004,right_val:0.5861827731132507,left_val:0.4696914851665497},{features:[[7,15,3,5,-1.],[8,15,1,5,3.]],threshold:0.0114744501188397,right_val:0.1527177989482880,left_val:0.5053645968437195},{features:[[9,7,3,5,-1.],[10,7,1,5,3.]],threshold:-6.7023430019617081e-003,right_val:0.4890604019165039,left_val:0.6508980989456177},{features:[[8,7,3,5,-1.],[9,7,1,5,3.]],threshold:-2.0462959073483944e-003,right_val:0.4514600038528442,left_val:0.6241816878318787},{features:[[10,6,4,14,-1.],[10,6,2,14,2.]],threshold:-9.9951568990945816e-003,right_val:0.5400953888893127,left_val:0.3432781100273132},{features:[[0,5,5,6,-1.],[0,7,5,2,3.]],threshold:-0.0357007086277008,right_val:0.5074077844619751,left_val:0.1878059059381485},{features:[[9,5,6,4,-1.],[9,5,3,4,2.]],threshold:4.5584561303257942e-004,right_val:0.5402569770812988,left_val:0.3805277049541473},{features:[[0,0,18,10,-1.],[6,0,6,10,3.]],threshold:-0.0542606003582478,right_val:0.4595097005367279,left_val:0.6843714714050293},{features:[[10,6,4,14,-1.],[10,6,2,14,2.]],threshold:6.0600461438298225e-003,right_val:0.4500527977943420,left_val:0.5502905249595642},{features:[[6,6,4,14,-1.],[8,6,2,14,2.]],threshold:-6.4791832119226456e-003,right_val:0.5310757160186768,left_val:0.3368858098983765},{features:[[13,4,1,3,-1.],[13,5,1,1,3.]],threshold:-1.4939469983801246e-003,right_val:0.4756175875663757,left_val:0.6487640142440796},{features:[[5,1,2,3,-1.],[6,1,1,3,2.]],threshold:1.4610530342906713e-005,right_val:0.5451064109802246,left_val:0.4034579098224640},{features:[[18,1,2,18,-1.],[19,1,1,9,2.],[18,10,1,9,2.]],threshold:-7.2321938350796700e-003,right_val:0.4824739992618561,left_val:0.6386873722076416},{features:[[2,1,4,3,-1.],[2,2,4,1,3.]],threshold:-4.0645818226039410e-003,right_val:0.5157335996627808,left_val:0.2986421883106232},{features:[[18,1,2,18,-1.],[19,1,1,9,2.],[18,10,1,9,2.]],threshold:0.0304630808532238,right_val:0.7159956097602844,left_val:0.5022199749946594},{features:[[1,14,4,6,-1.],[1,14,2,3,2.],[3,17,2,3,2.]],threshold:-8.0544911324977875e-003,right_val:0.4619275033473969,left_val:0.6492452025413513},{features:[[10,11,7,6,-1.],[10,13,7,2,3.]],threshold:0.0395051389932632,right_val:0.2450613975524902,left_val:0.5150570869445801},{features:[[0,10,6,10,-1.],[0,10,3,5,2.],[3,15,3,5,2.]],threshold:8.4530208259820938e-003,right_val:0.6394037008285523,left_val:0.4573669135570526},{features:[[11,0,3,4,-1.],[12,0,1,4,3.]],threshold:-1.1688120430335402e-003,right_val:0.5483661293983460,left_val:0.3865512013435364},{features:[[5,10,5,6,-1.],[5,13,5,3,2.]],threshold:2.8070670086890459e-003,right_val:0.2701480090618134,left_val:0.5128579139709473},{features:[[14,6,1,8,-1.],[14,10,1,4,2.]],threshold:4.7365209320560098e-004,right_val:0.5387461185455322,left_val:0.4051581919193268},{features:[[1,7,18,6,-1.],[1,7,9,3,2.],[10,10,9,3,2.]],threshold:0.0117410803213716,right_val:0.3719413876533508,left_val:0.5295950174331665},{features:[[9,7,2,2,-1.],[9,7,1,2,2.]],threshold:3.1833238899707794e-003,right_val:0.6895126104354858,left_val:0.4789406955242157},{features:[[5,9,4,5,-1.],[7,9,2,5,2.]],threshold:7.0241501089185476e-004,right_val:0.3918080925941467,left_val:0.5384489297866821}],threshold:54.6200714111328130},{simpleClassifiers:[{features:[[7,6,6,3,-1.],[9,6,2,3,3.]],threshold:0.0170599296689034,right_val:0.7142534852027893,left_val:0.3948527872562408},{features:[[1,0,18,4,-1.],[7,0,6,4,3.]],threshold:0.0218408405780792,right_val:0.6090016961097717,left_val:0.3370316028594971},{features:[[7,15,2,4,-1.],[7,17,2,2,2.]],threshold:2.4520049919374287e-004,right_val:0.5987902283668518,left_val:0.3500576019287109},{features:[[1,0,19,9,-1.],[1,3,19,3,3.]],threshold:8.3272606134414673e-003,right_val:0.5697240829467773,left_val:0.3267528116703033},{features:[[3,7,3,6,-1.],[3,9,3,2,3.]],threshold:5.7148298947140574e-004,right_val:0.5531656742095947,left_val:0.3044599890708923},{features:[[13,7,4,4,-1.],[15,7,2,2,2.],[13,9,2,2,2.]],threshold:6.7373987985774875e-004,right_val:0.5672631263732910,left_val:0.3650012016296387},{features:[[3,7,4,4,-1.],[3,7,2,2,2.],[5,9,2,2,2.]],threshold:3.4681590477703139e-005,right_val:0.5388727188110352,left_val:0.3313541114330292},{features:[[9,6,10,8,-1.],[9,10,10,4,2.]],threshold:-5.8563398197293282e-003,right_val:0.5498778820037842,left_val:0.2697942852973938},{features:[[3,8,14,12,-1.],[3,14,14,6,2.]],threshold:8.5102273151278496e-003,right_val:0.2762879133224487,left_val:0.5269358158111572},{features:[[6,5,10,12,-1.],[11,5,5,6,2.],[6,11,5,6,2.]],threshold:-0.0698172077536583,right_val:0.5259246826171875,left_val:0.2909603118896484},{features:[[9,11,2,3,-1.],[9,12,2,1,3.]],threshold:-8.6113670840859413e-004,right_val:0.4073697924613953,left_val:0.5892577171325684},{features:[[9,5,6,5,-1.],[9,5,3,5,2.]],threshold:9.7149249631911516e-004,right_val:0.5415862202644348,left_val:0.3523564040660858},{features:[[9,4,2,4,-1.],[9,6,2,2,2.]],threshold:-1.4727490452060010e-005,right_val:0.3503156006336212,left_val:0.5423017740249634},{features:[[9,5,6,5,-1.],[9,5,3,5,2.]],threshold:0.0484202913939953,right_val:0.3411195874214172,left_val:0.5193945765495300},{features:[[5,5,6,5,-1.],[8,5,3,5,2.]],threshold:1.3257140526548028e-003,right_val:0.5335376262664795,left_val:0.3157769143581390},{features:[[11,2,6,1,-1.],[13,2,2,1,3.]],threshold:1.4922149603080470e-005,right_val:0.5536553859710693,left_val:0.4451299905776978},{features:[[3,2,6,1,-1.],[5,2,2,1,3.]],threshold:-2.7173398993909359e-003,right_val:0.5248088836669922,left_val:0.3031741976737976},{features:[[13,5,2,3,-1.],[13,6,2,1,3.]],threshold:2.9219500720500946e-003,right_val:0.6606041789054871,left_val:0.4781453013420105},{features:[[0,10,1,4,-1.],[0,12,1,2,2.]],threshold:-1.9804988987743855e-003,right_val:0.5287625193595886,left_val:0.3186308145523071},{features:[[13,5,2,3,-1.],[13,6,2,1,3.]],threshold:-4.0012109093368053e-003,right_val:0.4749928116798401,left_val:0.6413596868515015},{features:[[8,18,3,2,-1.],[9,18,1,2,3.]],threshold:-4.3491991236805916e-003,right_val:0.5098996758460999,left_val:0.1507498025894165},{features:[[6,15,9,2,-1.],[6,16,9,1,2.]],threshold:1.3490889687091112e-003,right_val:0.5881167054176331,left_val:0.4316158890724182},{features:[[8,14,4,3,-1.],[8,15,4,1,3.]],threshold:0.0185970701277256,right_val:0.9089794158935547,left_val:0.4735553860664368},{features:[[18,4,2,4,-1.],[18,6,2,2,2.]],threshold:-1.8562379991635680e-003,right_val:0.5577837228775024,left_val:0.3553189039230347},{features:[[5,5,2,3,-1.],[5,6,2,1,3.]],threshold:2.2940430790185928e-003,right_val:0.6580877900123596,left_val:0.4500094950199127},{features:[[15,16,3,2,-1.],[15,17,3,1,2.]],threshold:2.9982850537635386e-004,right_val:0.3975878953933716,left_val:0.5629242062568665},{features:[[0,0,3,9,-1.],[0,3,3,3,3.]],threshold:3.5455459728837013e-003,right_val:0.3605485856533051,left_val:0.5381547212600708},{features:[[9,7,3,3,-1.],[9,8,3,1,3.]],threshold:9.6104722470045090e-003,right_val:0.1796745955944061,left_val:0.5255997180938721},{features:[[8,7,3,3,-1.],[8,8,3,1,3.]],threshold:-6.2783220782876015e-003,right_val:0.5114030241966248,left_val:0.2272856980562210},{features:[[9,5,2,6,-1.],[9,5,1,6,2.]],threshold:3.4598479978740215e-003,right_val:0.6608219146728516,left_val:0.4626308083534241},{features:[[8,6,3,4,-1.],[9,6,1,4,3.]],threshold:-1.3112019514665008e-003,right_val:0.4436857998371124,left_val:0.6317539811134338},{features:[[7,6,8,12,-1.],[11,6,4,6,2.],[7,12,4,6,2.]],threshold:2.6876179035753012e-003,right_val:0.4054022133350372,left_val:0.5421109795570374},{features:[[5,6,8,12,-1.],[5,6,4,6,2.],[9,12,4,6,2.]],threshold:3.9118169806897640e-003,right_val:0.3273454904556274,left_val:0.5358477830886841},{features:[[12,4,3,3,-1.],[12,5,3,1,3.]],threshold:-0.0142064504325390,right_val:0.4975781142711639,left_val:0.7793576717376709},{features:[[2,16,3,2,-1.],[2,17,3,1,2.]],threshold:7.1705528534948826e-004,right_val:0.3560903966426849,left_val:0.5297319889068604},{features:[[12,4,3,3,-1.],[12,5,3,1,3.]],threshold:1.6635019565001130e-003,right_val:0.5816481709480286,left_val:0.4678094089031220},{features:[[2,12,6,6,-1.],[2,14,6,2,3.]],threshold:3.3686188980937004e-003,right_val:0.3446420133113861,left_val:0.5276734232902527},{features:[[7,13,6,3,-1.],[7,14,6,1,3.]],threshold:0.0127995302900672,right_val:0.7472159266471863,left_val:0.4834679961204529},{features:[[6,14,6,3,-1.],[6,15,6,1,3.]],threshold:3.3901201095432043e-003,right_val:0.6401721239089966,left_val:0.4511859118938446},{features:[[14,15,5,3,-1.],[14,16,5,1,3.]],threshold:4.7070779837667942e-003,right_val:0.3555220961570740,left_val:0.5335658788681030},{features:[[5,4,3,3,-1.],[5,5,3,1,3.]],threshold:1.4819339849054813e-003,right_val:0.5772724151611328,left_val:0.4250707030296326},{features:[[14,15,5,3,-1.],[14,16,5,1,3.]],threshold:-6.9995759986341000e-003,right_val:0.5292900204658508,left_val:0.3003320097923279},{features:[[5,3,6,2,-1.],[7,3,2,2,3.]],threshold:0.0159390103071928,right_val:0.1675581932067871,left_val:0.5067319273948669},{features:[[8,15,4,3,-1.],[8,16,4,1,3.]],threshold:7.6377349905669689e-003,right_val:0.7085601091384888,left_val:0.4795069992542267},{features:[[1,15,5,3,-1.],[1,16,5,1,3.]],threshold:6.7334040068089962e-003,right_val:0.2162470072507858,left_val:0.5133113265037537},{features:[[8,13,4,6,-1.],[10,13,2,3,2.],[8,16,2,3,2.]],threshold:-0.0128588099032640,right_val:0.5251371860504150,left_val:0.1938841938972473},{features:[[7,8,3,3,-1.],[8,8,1,3,3.]],threshold:-6.2270800117403269e-004,right_val:0.4197868108749390,left_val:0.5686538219451904},{features:[[12,0,5,4,-1.],[12,2,5,2,2.]],threshold:-5.2651681471616030e-004,right_val:0.5429695844650269,left_val:0.4224168956279755},{features:[[0,2,20,2,-1.],[0,2,10,1,2.],[10,3,10,1,2.]],threshold:0.0110750999301672,right_val:0.2514517903327942,left_val:0.5113775134086609},{features:[[1,0,18,4,-1.],[7,0,6,4,3.]],threshold:-0.0367282517254353,right_val:0.4849618971347809,left_val:0.7194662094116211},{features:[[4,3,6,1,-1.],[6,3,2,1,3.]],threshold:-2.8207109426148236e-004,right_val:0.5394446253776550,left_val:0.3840261995792389},{features:[[4,18,13,2,-1.],[4,19,13,1,2.]],threshold:-2.7489690110087395e-003,right_val:0.4569182097911835,left_val:0.5937088727951050},{features:[[2,10,3,6,-1.],[2,12,3,2,3.]],threshold:0.0100475195795298,right_val:0.2802298069000244,left_val:0.5138576030731201},{features:[[14,12,6,8,-1.],[17,12,3,4,2.],[14,16,3,4,2.]],threshold:-8.1497840583324432e-003,right_val:0.4636121094226837,left_val:0.6090037226676941},{features:[[4,13,10,6,-1.],[4,13,5,3,2.],[9,16,5,3,2.]],threshold:-6.8833888508379459e-003,right_val:0.5254660248756409,left_val:0.3458611071109772},{features:[[14,12,1,2,-1.],[14,13,1,1,2.]],threshold:-1.4039360394235700e-005,right_val:0.4082083106040955,left_val:0.5693104267120361},{features:[[8,13,4,3,-1.],[8,14,4,1,3.]],threshold:1.5498419525101781e-003,right_val:0.5806517004966736,left_val:0.4350537061691284},{features:[[14,12,2,2,-1.],[14,13,2,1,2.]],threshold:-6.7841499112546444e-003,right_val:0.5182775259017944,left_val:0.1468873023986816},{features:[[4,12,2,2,-1.],[4,13,2,1,2.]],threshold:2.1705629478674382e-004,right_val:0.3456174135208130,left_val:0.5293524265289307},{features:[[8,12,9,2,-1.],[8,13,9,1,2.]],threshold:3.1198898795992136e-004,right_val:0.5942413806915283,left_val:0.4652450978755951},{features:[[9,14,2,3,-1.],[9,15,2,1,3.]],threshold:5.4507530294358730e-003,right_val:0.7024846076965332,left_val:0.4653508961200714},{features:[[11,10,3,6,-1.],[11,13,3,3,2.]],threshold:-2.5818689027801156e-004,right_val:0.3768967092037201,left_val:0.5497295260429382},{features:[[5,6,9,12,-1.],[5,12,9,6,2.]],threshold:-0.0174425393342972,right_val:0.5457497835159302,left_val:0.3919087946414948},{features:[[11,10,3,6,-1.],[11,13,3,3,2.]],threshold:-0.0453435294330120,right_val:0.5154908895492554,left_val:0.1631357073783875},{features:[[6,10,3,6,-1.],[6,13,3,3,2.]],threshold:1.9190689781680703e-003,right_val:0.2791895866394043,left_val:0.5145897865295410},{features:[[5,4,11,3,-1.],[5,5,11,1,3.]],threshold:-6.0177869163453579e-003,right_val:0.4756332933902741,left_val:0.6517636179924011},{features:[[7,1,5,10,-1.],[7,6,5,5,2.]],threshold:-4.0720738470554352e-003,right_val:0.4092685878276825,left_val:0.5514652729034424},{features:[[2,8,18,2,-1.],[2,9,18,1,2.]],threshold:3.9855059003457427e-004,right_val:0.5285550951957703,left_val:0.3165240883827210},{features:[[7,17,5,3,-1.],[7,18,5,1,3.]],threshold:-6.5418570302426815e-003,right_val:0.4652808904647827,left_val:0.6853377819061279},{features:[[5,9,12,1,-1.],[9,9,4,1,3.]],threshold:3.4845089539885521e-003,right_val:0.4502759873867035,left_val:0.5484588146209717},{features:[[0,14,6,6,-1.],[0,14,3,3,2.],[3,17,3,3,2.]],threshold:-0.0136967804282904,right_val:0.4572555124759674,left_val:0.6395779848098755},{features:[[5,9,12,1,-1.],[9,9,4,1,3.]],threshold:-0.0173471402376890,right_val:0.5181614756584168,left_val:0.2751072943210602},{features:[[3,9,12,1,-1.],[7,9,4,1,3.]],threshold:-4.0885428898036480e-003,right_val:0.5194984078407288,left_val:0.3325636088848114},{features:[[14,10,6,7,-1.],[14,10,3,7,2.]],threshold:-9.4687901437282562e-003,right_val:0.4851819872856140,left_val:0.5942280888557434},{features:[[1,0,16,2,-1.],[1,1,16,1,2.]],threshold:1.7084840219467878e-003,right_val:0.5519806146621704,left_val:0.4167110919952393},{features:[[10,9,10,9,-1.],[10,12,10,3,3.]],threshold:9.4809094443917274e-003,right_val:0.4208514988422394,left_val:0.5433894991874695},{features:[[0,1,10,2,-1.],[5,1,5,2,2.]],threshold:-4.7389650717377663e-003,right_val:0.4560655057430267,left_val:0.6407189965248108},{features:[[17,3,2,3,-1.],[17,4,2,1,3.]],threshold:6.5761050209403038e-003,right_val:0.2258227020502091,left_val:0.5214555263519287},{features:[[1,3,2,3,-1.],[1,4,2,1,3.]],threshold:-2.1690549328923225e-003,right_val:0.5156704783439636,left_val:0.3151527941226959},{features:[[9,7,3,6,-1.],[10,7,1,6,3.]],threshold:0.0146601703017950,right_val:0.6689941287040710,left_val:0.4870837032794952},{features:[[6,5,4,3,-1.],[8,5,2,3,2.]],threshold:1.7231999663636088e-004,right_val:0.5251078009605408,left_val:0.3569748997688294},{features:[[7,5,6,6,-1.],[9,5,2,6,3.]],threshold:-0.0218037609010935,right_val:0.4966329932212830,left_val:0.8825920820236206},{features:[[3,4,12,12,-1.],[3,4,6,6,2.],[9,10,6,6,2.]],threshold:-0.0947361066937447,right_val:0.5061113834381104,left_val:0.1446162015199661},{features:[[9,2,6,15,-1.],[11,2,2,15,3.]],threshold:5.5825551971793175e-003,right_val:0.4238066077232361,left_val:0.5396478772163391},{features:[[2,2,6,17,-1.],[4,2,2,17,3.]],threshold:1.9517090404406190e-003,right_val:0.5497786998748779,left_val:0.4170410931110382},{features:[[14,10,6,7,-1.],[14,10,3,7,2.]],threshold:0.0121499001979828,right_val:0.5664274096488953,left_val:0.4698367118835449},{features:[[0,10,6,7,-1.],[3,10,3,7,2.]],threshold:-7.5169620104134083e-003,right_val:0.4463135898113251,left_val:0.6267772912979126},{features:[[9,2,6,15,-1.],[11,2,2,15,3.]],threshold:-0.0716679096221924,right_val:0.5221003293991089,left_val:0.3097011148929596},{features:[[5,2,6,15,-1.],[7,2,2,15,3.]],threshold:-0.0882924199104309,right_val:0.5006365180015564,left_val:0.0811238884925842},{features:[[17,9,3,6,-1.],[17,11,3,2,3.]],threshold:0.0310630798339844,right_val:0.1282255947589874,left_val:0.5155503749847412},{features:[[6,7,6,6,-1.],[8,7,2,6,3.]],threshold:0.0466218404471874,right_val:0.7363960742950440,left_val:0.4699777960777283},{features:[[1,10,18,6,-1.],[10,10,9,3,2.],[1,13,9,3,2.]],threshold:-0.0121894897893071,right_val:0.5518996715545654,left_val:0.3920530080795288},{features:[[0,9,10,9,-1.],[0,12,10,3,3.]],threshold:0.0130161102861166,right_val:0.3685136139392853,left_val:0.5260658264160156},{features:[[8,15,4,3,-1.],[8,16,4,1,3.]],threshold:-3.4952899441123009e-003,right_val:0.4716280996799469,left_val:0.6339294910430908},{features:[[5,12,3,4,-1.],[5,14,3,2,2.]],threshold:-4.4015039748046547e-005,right_val:0.3776184916496277,left_val:0.5333027243614197},{features:[[3,3,16,12,-1.],[3,9,16,6,2.]],threshold:-0.1096649020910263,right_val:0.5198346972465515,left_val:0.1765342056751251},{features:[[1,1,12,12,-1.],[1,1,6,6,2.],[7,7,6,6,2.]],threshold:-9.0279558207839727e-004,right_val:0.3838908076286316,left_val:0.5324159860610962},{features:[[10,4,2,4,-1.],[11,4,1,2,2.],[10,6,1,2,2.]],threshold:7.1126641705632210e-004,right_val:0.5755224227905273,left_val:0.4647929966449738},{features:[[0,9,10,2,-1.],[0,9,5,1,2.],[5,10,5,1,2.]],threshold:-3.1250279862433672e-003,right_val:0.5166770815849304,left_val:0.3236708939075470},{features:[[9,11,3,3,-1.],[9,12,3,1,3.]],threshold:2.4144679773598909e-003,right_val:0.6459717750549316,left_val:0.4787439107894898},{features:[[3,12,9,2,-1.],[3,13,9,1,2.]],threshold:4.4391240226104856e-004,right_val:0.6010255813598633,left_val:0.4409308135509491},{features:[[9,9,2,2,-1.],[9,10,2,1,2.]],threshold:-2.2611189342569560e-004,right_val:0.5493255853652954,left_val:0.4038113951683044}],threshold:50.1697311401367190},{simpleClassifiers:[{features:[[3,4,13,6,-1.],[3,6,13,2,3.]],threshold:-0.0469012893736362,right_val:0.3743801116943359,left_val:0.6600171923637390},{features:[[9,7,6,4,-1.],[12,7,3,2,2.],[9,9,3,2,2.]],threshold:-1.4568349579349160e-003,right_val:0.3437797129154205,left_val:0.5783991217613220},{features:[[1,0,6,8,-1.],[4,0,3,8,2.]],threshold:5.5598369799554348e-003,right_val:0.5908216238021851,left_val:0.3622266948223114},{features:[[9,5,2,12,-1.],[9,11,2,6,2.]],threshold:7.3170487303286791e-004,right_val:0.2873558104038239,left_val:0.5500419139862061},{features:[[4,4,3,10,-1.],[4,9,3,5,2.]],threshold:1.3318009441718459e-003,right_val:0.5431019067764282,left_val:0.2673169970512390},{features:[[6,17,8,3,-1.],[6,18,8,1,3.]],threshold:2.4347059661522508e-004,right_val:0.5741388797760010,left_val:0.3855027854442596},{features:[[0,5,10,6,-1.],[0,7,10,2,3.]],threshold:-3.0512469820678234e-003,right_val:0.3462845087051392,left_val:0.5503209829330444},{features:[[13,2,3,2,-1.],[13,3,3,1,2.]],threshold:-6.8657199153676629e-004,right_val:0.5429509282112122,left_val:0.3291221857070923},{features:[[7,5,4,5,-1.],[9,5,2,5,2.]],threshold:1.4668200165033340e-003,right_val:0.5351811051368713,left_val:0.3588382005691528},{features:[[12,14,3,6,-1.],[12,16,3,2,3.]],threshold:3.2021870720200241e-004,right_val:0.5700234174728394,left_val:0.4296841919422150},{features:[[1,11,8,2,-1.],[1,12,8,1,2.]],threshold:7.4122188379988074e-004,right_val:0.3366870880126953,left_val:0.5282164812088013},{features:[[7,13,6,3,-1.],[7,14,6,1,3.]],threshold:3.8330298848450184e-003,right_val:0.6257336139678955,left_val:0.4559567868709564},{features:[[0,5,3,6,-1.],[0,7,3,2,3.]],threshold:-0.0154564399272203,right_val:0.5129452943801880,left_val:0.2350116968154907},{features:[[13,2,3,2,-1.],[13,3,3,1,2.]],threshold:2.6796779129654169e-003,right_val:0.4155062139034271,left_val:0.5329415202140808},{features:[[4,14,4,6,-1.],[4,14,2,3,2.],[6,17,2,3,2.]],threshold:2.8296569362282753e-003,right_val:0.5804538130760193,left_val:0.4273087978363037},{features:[[13,2,3,2,-1.],[13,3,3,1,2.]],threshold:-3.9444249123334885e-003,right_val:0.5202686190605164,left_val:0.2912611961364746},{features:[[8,2,4,12,-1.],[8,6,4,4,3.]],threshold:2.7179559692740440e-003,right_val:0.3585677146911621,left_val:0.5307688117027283},{features:[[14,0,6,8,-1.],[17,0,3,4,2.],[14,4,3,4,2.]],threshold:5.9077627956867218e-003,right_val:0.5941585898399353,left_val:0.4703775048255920},{features:[[7,17,3,2,-1.],[8,17,1,2,3.]],threshold:-4.2240349575877190e-003,right_val:0.5088796019554138,left_val:0.2141567021608353},{features:[[8,12,4,2,-1.],[8,13,4,1,2.]],threshold:4.0725888684391975e-003,right_val:0.6841061115264893,left_val:0.4766413867473602},{features:[[6,0,8,12,-1.],[6,0,4,6,2.],[10,6,4,6,2.]],threshold:0.0101495301350951,right_val:0.3748497068881989,left_val:0.5360798835754395},{features:[[14,0,2,10,-1.],[15,0,1,5,2.],[14,5,1,5,2.]],threshold:-1.8864999583456665e-004,right_val:0.3853805065155029,left_val:0.5720130205154419},{features:[[5,3,8,6,-1.],[5,3,4,3,2.],[9,6,4,3,2.]],threshold:-4.8864358104765415e-003,right_val:0.5340958833694458,left_val:0.3693122863769531},{features:[[14,0,6,10,-1.],[17,0,3,5,2.],[14,5,3,5,2.]],threshold:0.0261584799736738,right_val:0.6059989929199219,left_val:0.4962374866008759},{features:[[9,14,1,2,-1.],[9,15,1,1,2.]],threshold:4.8560759751126170e-004,right_val:0.6012468934059143,left_val:0.4438945949077606},{features:[[15,10,4,3,-1.],[15,11,4,1,3.]],threshold:0.0112687097862363,right_val:0.1840388029813767,left_val:0.5244250297546387},{features:[[8,14,2,3,-1.],[8,15,2,1,3.]],threshold:-2.8114619199186563e-003,right_val:0.4409897029399872,left_val:0.6060283780097961},{features:[[3,13,14,4,-1.],[10,13,7,2,2.],[3,15,7,2,2.]],threshold:-5.6112729944288731e-003,right_val:0.5589237213134766,left_val:0.3891170918941498},{features:[[1,10,4,3,-1.],[1,11,4,1,3.]],threshold:8.5680093616247177e-003,right_val:0.2062619030475617,left_val:0.5069345831871033},{features:[[9,11,6,1,-1.],[11,11,2,1,3.]],threshold:-3.8172779022715986e-004,right_val:0.4192610979080200,left_val:0.5882201790809631},{features:[[5,11,6,1,-1.],[7,11,2,1,3.]],threshold:-1.7680290329735726e-004,right_val:0.4003368914127350,left_val:0.5533605813980103},{features:[[3,5,16,15,-1.],[3,10,16,5,3.]],threshold:6.5112537704408169e-003,right_val:0.5444191098213196,left_val:0.3310146927833557},{features:[[6,12,4,2,-1.],[8,12,2,2,2.]],threshold:-6.5948683186434209e-005,right_val:0.3944905996322632,left_val:0.5433831810951233},{features:[[4,4,12,10,-1.],[10,4,6,5,2.],[4,9,6,5,2.]],threshold:6.9939051754772663e-003,right_val:0.4192714095115662,left_val:0.5600358247756958},{features:[[8,6,3,4,-1.],[9,6,1,4,3.]],threshold:-4.6744439750909805e-003,right_val:0.4604960978031158,left_val:0.6685466766357422},{features:[[8,12,4,8,-1.],[10,12,2,4,2.],[8,16,2,4,2.]],threshold:0.0115898502990603,right_val:0.2926830053329468,left_val:0.5357121229171753},{features:[[8,14,4,3,-1.],[8,15,4,1,3.]],threshold:0.0130078401416540,right_val:0.7307463288307190,left_val:0.4679817855358124},{features:[[12,2,3,2,-1.],[13,2,1,2,3.]],threshold:-1.1008579749614000e-003,right_val:0.5415065288543701,left_val:0.3937501013278961},{features:[[8,15,3,2,-1.],[8,16,3,1,2.]],threshold:6.0472649056464434e-004,right_val:0.5604041218757629,left_val:0.4242376089096069},{features:[[6,0,9,14,-1.],[9,0,3,14,3.]],threshold:-0.0144948400557041,right_val:0.5293182730674744,left_val:0.3631210029125214},{features:[[9,6,2,3,-1.],[10,6,1,3,2.]],threshold:-5.3056948818266392e-003,right_val:0.4621821045875549,left_val:0.6860452294349670},{features:[[10,8,2,3,-1.],[10,9,2,1,3.]],threshold:-8.1829127157106996e-004,right_val:0.5420439243316650,left_val:0.3944096863269806},{features:[[0,9,4,6,-1.],[0,11,4,2,3.]],threshold:-0.0190775208175182,right_val:0.5037891864776611,left_val:0.1962621957063675},{features:[[6,0,8,2,-1.],[6,1,8,1,2.]],threshold:3.5549470339901745e-004,right_val:0.5613973140716553,left_val:0.4086259007453919},{features:[[6,14,7,3,-1.],[6,15,7,1,3.]],threshold:1.9679730758070946e-003,right_val:0.5926123261451721,left_val:0.4489121139049530},{features:[[8,10,8,9,-1.],[8,13,8,3,3.]],threshold:6.9189141504466534e-003,right_val:0.3728385865688324,left_val:0.5335925817489624},{features:[[5,2,3,2,-1.],[6,2,1,2,3.]],threshold:2.9872779268771410e-003,right_val:0.2975643873214722,left_val:0.5111321210861206},{features:[[14,1,6,8,-1.],[17,1,3,4,2.],[14,5,3,4,2.]],threshold:-6.2264618463814259e-003,right_val:0.4824537932872772,left_val:0.5541489720344544},{features:[[0,1,6,8,-1.],[0,1,3,4,2.],[3,5,3,4,2.]],threshold:0.0133533002808690,right_val:0.6414797902107239,left_val:0.4586423933506012},{features:[[1,2,18,6,-1.],[10,2,9,3,2.],[1,5,9,3,2.]],threshold:0.0335052385926247,right_val:0.3429994881153107,left_val:0.5392425060272217},{features:[[9,3,2,1,-1.],[10,3,1,1,2.]],threshold:-2.5294460356235504e-003,right_val:0.5013315081596375,left_val:0.1703713983297348},{features:[[13,2,4,6,-1.],[15,2,2,3,2.],[13,5,2,3,2.]],threshold:-1.2801629491150379e-003,right_val:0.4697405099868774,left_val:0.5305461883544922},{features:[[5,4,3,3,-1.],[5,5,3,1,3.]],threshold:7.0687388069927692e-003,right_val:0.6436504721641541,left_val:0.4615545868873596},{features:[[13,5,1,3,-1.],[13,6,1,1,3.]],threshold:9.6880499040707946e-004,right_val:0.6043894290924072,left_val:0.4833599030971527},{features:[[2,16,5,3,-1.],[2,17,5,1,3.]],threshold:3.9647659286856651e-003,right_val:0.3231816887855530,left_val:0.5187637209892273},{features:[[13,2,4,6,-1.],[15,2,2,3,2.],[13,5,2,3,2.]],threshold:-0.0220577307045460,right_val:0.5200980901718140,left_val:0.4079256951808929},{features:[[3,2,4,6,-1.],[3,2,2,3,2.],[5,5,2,3,2.]],threshold:-6.6906312713399529e-004,right_val:0.3815600872039795,left_val:0.5331609249114990},{features:[[13,5,1,2,-1.],[13,6,1,1,2.]],threshold:-6.7009328631684184e-004,right_val:0.4688901901245117,left_val:0.5655422210693359},{features:[[5,5,2,2,-1.],[5,6,2,1,2.]],threshold:7.4284552829340100e-004,right_val:0.6287400126457214,left_val:0.4534381031990051},{features:[[13,9,2,2,-1.],[13,9,1,2,2.]],threshold:2.2227810695767403e-003,right_val:0.3303655982017517,left_val:0.5350633263587952},{features:[[5,9,2,2,-1.],[6,9,1,2,2.]],threshold:-5.4130521602928638e-003,right_val:0.5005434751510620,left_val:0.1113687008619309},{features:[[13,17,3,2,-1.],[13,18,3,1,2.]],threshold:-1.4520040167553816e-005,right_val:0.4325133860111237,left_val:0.5628737807273865},{features:[[6,16,4,4,-1.],[6,16,2,2,2.],[8,18,2,2,2.]],threshold:2.3369169502984732e-004,right_val:0.5447791218757629,left_val:0.4165835082530975},{features:[[9,16,2,3,-1.],[9,17,2,1,3.]],threshold:4.2894547805190086e-003,right_val:0.6778649091720581,left_val:0.4860391020774841},{features:[[0,13,9,6,-1.],[0,15,9,2,3.]],threshold:5.9103150852024555e-003,right_val:0.3612113893032074,left_val:0.5262305140495300},{features:[[9,14,2,6,-1.],[9,17,2,3,2.]],threshold:0.0129005396738648,right_val:0.3250288069248200,left_val:0.5319377183914185},{features:[[9,15,2,3,-1.],[9,16,2,1,3.]],threshold:4.6982979401946068e-003,right_val:0.6665925979614258,left_val:0.4618245065212250},{features:[[1,10,18,6,-1.],[1,12,18,2,3.]],threshold:0.0104398597031832,right_val:0.3883604109287262,left_val:0.5505670905113220},{features:[[8,11,4,2,-1.],[8,12,4,1,2.]],threshold:3.0443191062659025e-003,right_val:0.7301844954490662,left_val:0.4697853028774262},{features:[[7,9,6,2,-1.],[7,10,6,1,2.]],threshold:-6.1593751888722181e-004,right_val:0.5464984178543091,left_val:0.3830839097499847},{features:[[8,8,2,3,-1.],[8,9,2,1,3.]],threshold:-3.4247159492224455e-003,right_val:0.5089530944824219,left_val:0.2566300034523010},{features:[[17,5,3,4,-1.],[18,5,1,4,3.]],threshold:-9.3538565561175346e-003,right_val:0.4940795898437500,left_val:0.6469966173171997},{features:[[1,19,18,1,-1.],[7,19,6,1,3.]],threshold:0.0523389987647533,right_val:0.7878770828247070,left_val:0.4745982885360718},{features:[[9,0,3,2,-1.],[10,0,1,2,3.]],threshold:3.5765620414167643e-003,right_val:0.2748498022556305,left_val:0.5306664705276489},{features:[[1,8,1,6,-1.],[1,10,1,2,3.]],threshold:7.1555317845195532e-004,right_val:0.4041908979415894,left_val:0.5413125753402710},{features:[[12,17,8,3,-1.],[12,17,4,3,2.]],threshold:-0.0105166798457503,right_val:0.4815283119678497,left_val:0.6158512234687805},{features:[[0,5,3,4,-1.],[1,5,1,4,3.]],threshold:7.7347927726805210e-003,right_val:0.7028980851173401,left_val:0.4695805907249451},{features:[[9,7,2,3,-1.],[9,8,2,1,3.]],threshold:-4.3226778507232666e-003,right_val:0.5304684042930603,left_val:0.2849566042423248},{features:[[7,11,2,2,-1.],[7,11,1,1,2.],[8,12,1,1,2.]],threshold:-2.5534399319440126e-003,right_val:0.4688892066478729,left_val:0.7056984901428223},{features:[[11,3,2,5,-1.],[11,3,1,5,2.]],threshold:1.0268510231981054e-004,right_val:0.5573464035987854,left_val:0.3902932107448578},{features:[[7,3,2,5,-1.],[8,3,1,5,2.]],threshold:7.1395188570022583e-006,right_val:0.5263987779617310,left_val:0.3684231936931610},{features:[[15,13,2,3,-1.],[15,14,2,1,3.]],threshold:-1.6711989883333445e-003,right_val:0.5387271046638489,left_val:0.3849175870418549},{features:[[5,6,2,3,-1.],[5,7,2,1,3.]],threshold:4.9260449595749378e-003,right_val:0.7447251081466675,left_val:0.4729771912097931},{features:[[4,19,15,1,-1.],[9,19,5,1,3.]],threshold:4.3908702209591866e-003,right_val:0.5591921806335449,left_val:0.4809181094169617},{features:[[1,19,15,1,-1.],[6,19,5,1,3.]],threshold:-0.0177936293184757,right_val:0.4676927030086517,left_val:0.6903678178787231},{features:[[15,13,2,3,-1.],[15,14,2,1,3.]],threshold:2.0469669252634048e-003,right_val:0.3308162093162537,left_val:0.5370690226554871},{features:[[5,0,4,15,-1.],[7,0,2,15,2.]],threshold:0.0298914890736341,right_val:0.3309059143066406,left_val:0.5139865279197693},{features:[[9,6,2,5,-1.],[9,6,1,5,2.]],threshold:1.5494900289922953e-003,right_val:0.6078342795372009,left_val:0.4660237133502960},{features:[[9,5,2,7,-1.],[10,5,1,7,2.]],threshold:1.4956969534978271e-003,right_val:0.5863919854164124,left_val:0.4404835999011993},{features:[[16,11,3,3,-1.],[16,12,3,1,3.]],threshold:9.5885928021743894e-004,right_val:0.4208523035049439,left_val:0.5435971021652222},{features:[[1,11,3,3,-1.],[1,12,3,1,3.]],threshold:4.9643701640889049e-004,right_val:0.4000622034072876,left_val:0.5370578169822693},{features:[[6,6,8,3,-1.],[6,7,8,1,3.]],threshold:-2.7280810754746199e-003,right_val:0.4259642958641052,left_val:0.5659412741661072},{features:[[0,15,6,2,-1.],[0,16,6,1,2.]],threshold:2.3026480339467525e-003,right_val:0.3350869119167328,left_val:0.5161657929420471},{features:[[1,0,18,6,-1.],[7,0,6,6,3.]],threshold:0.2515163123607636,right_val:0.7147309780120850,left_val:0.4869661927223206},{features:[[6,0,3,4,-1.],[7,0,1,4,3.]],threshold:-4.6328022144734859e-003,right_val:0.5083789825439453,left_val:0.2727448940277100},{features:[[14,10,4,10,-1.],[16,10,2,5,2.],[14,15,2,5,2.]],threshold:-0.0404344908893108,right_val:0.5021767020225525,left_val:0.6851438879966736},{features:[[3,2,3,2,-1.],[4,2,1,2,3.]],threshold:1.4972220014897175e-005,right_val:0.5522555112838745,left_val:0.4284465014934540},{features:[[11,2,2,2,-1.],[11,3,2,1,2.]],threshold:-2.4050309730228037e-004,right_val:0.5390074849128723,left_val:0.4226118922233582},{features:[[2,10,4,10,-1.],[2,10,2,5,2.],[4,15,2,5,2.]],threshold:0.0236578397452831,right_val:0.7504366040229797,left_val:0.4744631946086884},{features:[[0,13,20,6,-1.],[10,13,10,3,2.],[0,16,10,3,2.]],threshold:-8.1449104472994804e-003,right_val:0.5538362860679627,left_val:0.4245058894157410},{features:[[0,5,2,15,-1.],[1,5,1,15,2.]],threshold:-3.6992130335420370e-003,right_val:0.4529713094234467,left_val:0.5952357053756714},{features:[[1,7,18,4,-1.],[10,7,9,2,2.],[1,9,9,2,2.]],threshold:-6.7718601785600185e-003,right_val:0.5473399758338928,left_val:0.4137794077396393},{features:[[0,0,2,17,-1.],[1,0,1,17,2.]],threshold:4.2669530957937241e-003,right_val:0.5797994136810303,left_val:0.4484114944934845},{features:[[2,6,16,6,-1.],[10,6,8,3,2.],[2,9,8,3,2.]],threshold:1.7791989957913756e-003,right_val:0.4432444870471954,left_val:0.5624858736991882},{features:[[8,14,1,3,-1.],[8,15,1,1,3.]],threshold:1.6774770338088274e-003,right_val:0.6364241838455200,left_val:0.4637751877307892},{features:[[8,15,4,2,-1.],[8,16,4,1,2.]],threshold:1.1732629500329494e-003,right_val:0.5914415717124939,left_val:0.4544503092765808},{features:[[5,2,8,2,-1.],[5,2,4,1,2.],[9,3,4,1,2.]],threshold:8.6998171173036098e-004,right_val:0.3885917961597443,left_val:0.5334752798080444},{features:[[6,11,8,6,-1.],[6,14,8,3,2.]],threshold:7.6378340600058436e-004,right_val:0.3744941949844360,left_val:0.5398585200309753},{features:[[9,13,2,2,-1.],[9,14,2,1,2.]],threshold:1.5684569370932877e-004,right_val:0.5614616274833679,left_val:0.4317873120307922},{features:[[18,4,2,6,-1.],[18,6,2,2,3.]],threshold:-0.0215113703161478,right_val:0.5185542702674866,left_val:0.1785925030708313},{features:[[9,12,2,2,-1.],[9,13,2,1,2.]],threshold:1.3081369979772717e-004,right_val:0.5682849884033203,left_val:0.4342499077320099},{features:[[18,4,2,6,-1.],[18,6,2,2,3.]],threshold:0.0219920407980680,right_val:0.2379394024610519,left_val:0.5161716938018799},{features:[[9,13,1,3,-1.],[9,14,1,1,3.]],threshold:-8.0136500764638186e-004,right_val:0.4466426968574524,left_val:0.5986763238906860},{features:[[18,4,2,6,-1.],[18,6,2,2,3.]],threshold:-8.2736099138855934e-003,right_val:0.5251057147979736,left_val:0.4108217954635620},{features:[[0,4,2,6,-1.],[0,6,2,2,3.]],threshold:3.6831789184361696e-003,right_val:0.3397518098354340,left_val:0.5173814296722412},{features:[[9,12,3,3,-1.],[9,13,3,1,3.]],threshold:-7.9525681212544441e-003,right_val:0.4845924079418182,left_val:0.6888983249664307},{features:[[3,13,2,3,-1.],[3,14,2,1,3.]],threshold:1.5382299898192286e-003,right_val:0.3454113900661469,left_val:0.5178567171096802},{features:[[13,13,4,3,-1.],[13,14,4,1,3.]],threshold:-0.0140435304492712,right_val:0.5188667774200440,left_val:0.1678421050310135},{features:[[5,4,3,3,-1.],[5,5,3,1,3.]],threshold:1.4315890148282051e-003,right_val:0.5655773878097534,left_val:0.4368256926536560},{features:[[5,2,10,6,-1.],[5,4,10,2,3.]],threshold:-0.0340142287313938,right_val:0.4959217011928558,left_val:0.7802296280860901},{features:[[3,13,4,3,-1.],[3,14,4,1,3.]],threshold:-0.0120272999629378,right_val:0.5032231807708740,left_val:0.1585101038217545},{features:[[3,7,15,5,-1.],[8,7,5,5,3.]],threshold:0.1331661939620972,right_val:0.2755128145217896,left_val:0.5163304805755615},{features:[[3,7,12,2,-1.],[7,7,4,2,3.]],threshold:-1.5221949433907866e-003,right_val:0.5214552283287048,left_val:0.3728317916393280},{features:[[10,3,3,9,-1.],[11,3,1,9,3.]],threshold:-9.3929271679371595e-004,right_val:0.4511165022850037,left_val:0.5838379263877869},{features:[[8,6,4,6,-1.],[10,6,2,6,2.]],threshold:0.0277197398245335,right_val:0.7331544756889343,left_val:0.4728286862373352},{features:[[9,7,4,3,-1.],[9,8,4,1,3.]],threshold:3.1030150130391121e-003,right_val:0.4101563096046448,left_val:0.5302202105522156},{features:[[0,9,4,9,-1.],[2,9,2,9,2.]],threshold:0.0778612196445465,right_val:0.1272961944341660,left_val:0.4998334050178528},{features:[[9,13,3,5,-1.],[10,13,1,5,3.]],threshold:-0.0158549398183823,right_val:0.5165656208992004,left_val:0.0508333593606949},{features:[[7,7,6,3,-1.],[9,7,2,3,3.]],threshold:-4.9725300632417202e-003,right_val:0.4684231877326965,left_val:0.6798133850097656},{features:[[9,7,3,5,-1.],[10,7,1,5,3.]],threshold:-9.7676506265997887e-004,right_val:0.4788931906223297,left_val:0.6010771989822388},{features:[[5,7,8,2,-1.],[9,7,4,2,2.]],threshold:-2.4647710379213095e-003,right_val:0.5220503807067871,left_val:0.3393397927284241},{features:[[5,9,12,2,-1.],[9,9,4,2,3.]],threshold:-6.7937700077891350e-003,right_val:0.5239663124084473,left_val:0.4365136921405792},{features:[[5,6,10,3,-1.],[10,6,5,3,2.]],threshold:0.0326080210506916,right_val:0.2425214946269989,left_val:0.5052723884582520},{features:[[10,12,3,1,-1.],[11,12,1,1,3.]],threshold:-5.8514421107247472e-004,right_val:0.4758574068546295,left_val:0.5733973979949951},{features:[[0,1,11,15,-1.],[0,6,11,5,3.]],threshold:-0.0296326000243425,right_val:0.5263597965240479,left_val:0.3892289102077484}],threshold:66.6691207885742190},{simpleClassifiers:[{features:[[1,0,18,6,-1.],[7,0,6,6,3.]],threshold:0.0465508513152599,right_val:0.6240522861480713,left_val:0.3276950120925903},{features:[[7,7,6,1,-1.],[9,7,2,1,3.]],threshold:7.9537127166986465e-003,right_val:0.6942939162254334,left_val:0.4256485104560852},{features:[[5,16,6,4,-1.],[5,16,3,2,2.],[8,18,3,2,2.]],threshold:6.8221561377868056e-004,right_val:0.5900732874870300,left_val:0.3711487054824829},{features:[[6,5,9,8,-1.],[6,9,9,4,2.]],threshold:-1.9348249770700932e-004,right_val:0.5300545096397400,left_val:0.2041133940219879},{features:[[5,10,2,6,-1.],[5,13,2,3,2.]],threshold:-2.6710508973337710e-004,right_val:0.3103179037570953,left_val:0.5416126251220703},{features:[[7,6,8,10,-1.],[11,6,4,5,2.],[7,11,4,5,2.]],threshold:2.7818060480058193e-003,right_val:0.3467069864273071,left_val:0.5277832746505737},{features:[[5,6,8,10,-1.],[5,6,4,5,2.],[9,11,4,5,2.]],threshold:-4.6779078547842801e-004,right_val:0.3294492065906525,left_val:0.5308231115341187},{features:[[9,5,2,2,-1.],[9,6,2,1,2.]],threshold:-3.0335160772665404e-005,right_val:0.3852097094058991,left_val:0.5773872733116150},{features:[[5,12,8,2,-1.],[5,13,8,1,2.]],threshold:7.8038009814918041e-004,right_val:0.6150057911872864,left_val:0.4317438900470734},{features:[[10,2,8,2,-1.],[10,3,8,1,2.]],threshold:-4.2553851380944252e-003,right_val:0.5324292778968811,left_val:0.2933903932571411},{features:[[4,0,2,10,-1.],[4,0,1,5,2.],[5,5,1,5,2.]],threshold:-2.4735610350035131e-004,right_val:0.3843030035495758,left_val:0.5468844771385193},{features:[[9,10,2,2,-1.],[9,11,2,1,2.]],threshold:-1.4724259381182492e-004,right_val:0.5755587220191956,left_val:0.4281542897224426},{features:[[2,8,15,3,-1.],[2,9,15,1,3.]],threshold:1.1864770203828812e-003,right_val:0.5471466183662415,left_val:0.3747301101684570},{features:[[8,13,4,3,-1.],[8,14,4,1,3.]],threshold:2.3936580400913954e-003,right_val:0.6111528873443604,left_val:0.4537783861160278},{features:[[7,2,3,2,-1.],[8,2,1,2,3.]],threshold:-1.5390539774671197e-003,right_val:0.5189538002014160,left_val:0.2971341907978058},{features:[[7,13,6,3,-1.],[7,14,6,1,3.]],threshold:-7.1968790143728256e-003,right_val:0.4726476967334747,left_val:0.6699066758155823},{features:[[9,9,2,2,-1.],[9,10,2,1,2.]],threshold:-4.1499789222143590e-004,right_val:0.5260317921638489,left_val:0.3384954035282135},{features:[[17,2,3,6,-1.],[17,4,3,2,3.]],threshold:4.4359830208122730e-003,right_val:0.3920140862464905,left_val:0.5399122238159180},{features:[[1,5,3,4,-1.],[2,5,1,4,3.]],threshold:2.6606200262904167e-003,right_val:0.6119617819786072,left_val:0.4482578039169312},{features:[[14,8,4,6,-1.],[14,10,4,2,3.]],threshold:-1.5287200221791863e-003,right_val:0.5340266227722168,left_val:0.3711237907409668},{features:[[1,4,3,8,-1.],[2,4,1,8,3.]],threshold:-4.7397250309586525e-003,right_val:0.4455145001411438,left_val:0.6031088232994080},{features:[[8,13,4,6,-1.],[8,16,4,3,2.]],threshold:-0.0148291299119592,right_val:0.5341861844062805,left_val:0.2838754057884216},{features:[[3,14,2,2,-1.],[3,15,2,1,2.]],threshold:9.2275557108223438e-004,right_val:0.3361653983592987,left_val:0.5209547281265259},{features:[[14,8,4,6,-1.],[14,10,4,2,3.]],threshold:0.0835298076272011,right_val:0.0811644494533539,left_val:0.5119969844818115},{features:[[2,8,4,6,-1.],[2,10,4,2,3.]],threshold:-7.5633148662745953e-004,right_val:0.5189831256866455,left_val:0.3317120075225830},{features:[[10,14,1,6,-1.],[10,17,1,3,2.]],threshold:9.8403859883546829e-003,right_val:0.2334959059953690,left_val:0.5247598290443420},{features:[[7,5,3,6,-1.],[8,5,1,6,3.]],threshold:-1.5953830443322659e-003,right_val:0.4295622110366821,left_val:0.5750094056129456},{features:[[11,2,2,6,-1.],[12,2,1,3,2.],[11,5,1,3,2.]],threshold:3.4766020689858124e-005,right_val:0.5564029216766357,left_val:0.4342445135116577},{features:[[6,6,6,5,-1.],[8,6,2,5,3.]],threshold:0.0298629105091095,right_val:0.6579188108444214,left_val:0.4579147100448608},{features:[[17,1,3,6,-1.],[17,3,3,2,3.]],threshold:0.0113255903124809,right_val:0.3673888146877289,left_val:0.5274311900138855},{features:[[8,7,3,5,-1.],[9,7,1,5,3.]],threshold:-8.7828645482659340e-003,right_val:0.4642167091369629,left_val:0.7100368738174439},{features:[[9,18,3,2,-1.],[10,18,1,2,3.]],threshold:4.3639959767460823e-003,right_val:0.2705877125263214,left_val:0.5279216170310974},{features:[[8,18,3,2,-1.],[9,18,1,2,3.]],threshold:4.1804728098213673e-003,right_val:0.2449083030223846,left_val:0.5072525143623352},{features:[[12,3,5,2,-1.],[12,4,5,1,2.]],threshold:-4.5668511302210391e-004,right_val:0.5548691153526306,left_val:0.4283105134963989},{features:[[7,1,5,12,-1.],[7,7,5,6,2.]],threshold:-3.7140368949621916e-003,right_val:0.4103653132915497,left_val:0.5519387722015381},{features:[[1,0,18,4,-1.],[7,0,6,4,3.]],threshold:-0.0253042895346880,right_val:0.4869889020919800,left_val:0.6867002248764038},{features:[[4,2,2,2,-1.],[4,3,2,1,2.]],threshold:-3.4454080741852522e-004,right_val:0.5287693142890930,left_val:0.3728874027729034},{features:[[11,14,4,2,-1.],[13,14,2,1,2.],[11,15,2,1,2.]],threshold:-8.3935231668874621e-004,right_val:0.4616062045097351,left_val:0.6060152053833008},{features:[[0,2,3,6,-1.],[0,4,3,2,3.]],threshold:0.0172800496220589,right_val:0.1819823980331421,left_val:0.5049635767936707},{features:[[9,7,2,3,-1.],[9,8,2,1,3.]],threshold:-6.3595077954232693e-003,right_val:0.5232778787612915,left_val:0.1631239950656891},{features:[[5,5,1,3,-1.],[5,6,1,1,3.]],threshold:1.0298109846189618e-003,right_val:0.6176549196243286,left_val:0.4463278055191040},{features:[[10,10,6,1,-1.],[10,10,3,1,2.]],threshold:1.0117109632119536e-003,right_val:0.4300698935985565,left_val:0.5473384857177734},{features:[[4,10,6,1,-1.],[7,10,3,1,2.]],threshold:-0.0103088002651930,right_val:0.5000867247581482,left_val:0.1166985034942627},{features:[[9,17,3,3,-1.],[9,18,3,1,3.]],threshold:5.4682018235325813e-003,right_val:0.6719213724136353,left_val:0.4769287109375000},{features:[[4,14,1,3,-1.],[4,15,1,1,3.]],threshold:-9.1696460731327534e-004,right_val:0.5178164839744568,left_val:0.3471089899539948},{features:[[12,5,3,3,-1.],[12,6,3,1,3.]],threshold:2.3922820109874010e-003,right_val:0.6216310858726502,left_val:0.4785236120223999},{features:[[4,5,12,3,-1.],[4,6,12,1,3.]],threshold:-7.5573818758130074e-003,right_val:0.4410085082054138,left_val:0.5814796090126038},{features:[[9,8,2,3,-1.],[9,9,2,1,3.]],threshold:-7.7024032361805439e-004,right_val:0.5465722084045410,left_val:0.3878000080585480},{features:[[4,9,3,3,-1.],[5,9,1,3,3.]],threshold:-8.7125990539789200e-003,right_val:0.4995836019515991,left_val:0.1660051047801971},{features:[[6,0,9,17,-1.],[9,0,3,17,3.]],threshold:-0.0103063201531768,right_val:0.5274233818054199,left_val:0.4093391001224518},{features:[[9,12,1,3,-1.],[9,13,1,1,3.]],threshold:-2.0940979011356831e-003,right_val:0.4572280049324036,left_val:0.6206194758415222},{features:[[9,5,2,15,-1.],[9,10,2,5,3.]],threshold:6.8099051713943481e-003,right_val:0.4155600070953369,left_val:0.5567759275436401},{features:[[8,14,2,3,-1.],[8,15,2,1,3.]],threshold:-1.0746059706434608e-003,right_val:0.4353024959564209,left_val:0.5638927817344666},{features:[[10,14,1,3,-1.],[10,15,1,1,3.]],threshold:2.1550289820879698e-003,right_val:0.6749758124351502,left_val:0.4826265871524811},{features:[[7,1,6,5,-1.],[9,1,2,5,3.]],threshold:0.0317423194646835,right_val:0.1883248984813690,left_val:0.5048379898071289},{features:[[0,0,20,2,-1.],[0,0,10,2,2.]],threshold:-0.0783827230334282,right_val:0.5260158181190491,left_val:0.2369548976421356},{features:[[2,13,5,3,-1.],[2,14,5,1,3.]],threshold:5.7415119372308254e-003,right_val:0.2776469886302948,left_val:0.5048828721046448},{features:[[9,11,2,3,-1.],[9,12,2,1,3.]],threshold:-2.9014600440859795e-003,right_val:0.4693317115306854,left_val:0.6238604784011841},{features:[[2,5,9,15,-1.],[2,10,9,5,3.]],threshold:-2.6427931152284145e-003,right_val:0.5169777274131775,left_val:0.3314141929149628},{features:[[5,0,12,10,-1.],[11,0,6,5,2.],[5,5,6,5,2.]],threshold:-0.1094966009259224,right_val:0.5183441042900085,left_val:0.2380045056343079},{features:[[5,1,2,3,-1.],[6,1,1,3,2.]],threshold:7.4075913289561868e-005,right_val:0.5362150073051453,left_val:0.4069635868072510},{features:[[10,7,6,1,-1.],[12,7,2,1,3.]],threshold:-5.0593802006915212e-004,right_val:0.4374594092369080,left_val:0.5506706237792969},{features:[[3,1,2,10,-1.],[3,1,1,5,2.],[4,6,1,5,2.]],threshold:-8.2131777890026569e-004,right_val:0.4209375977516174,left_val:0.5525709986686707},{features:[[13,7,2,1,-1.],[13,7,1,1,2.]],threshold:-6.0276539443293586e-005,right_val:0.4748266041278839,left_val:0.5455474853515625},{features:[[4,13,4,6,-1.],[4,15,4,2,3.]],threshold:6.8065142259001732e-003,right_val:0.3424577116966248,left_val:0.5157995820045471},{features:[[13,7,2,1,-1.],[13,7,1,1,2.]],threshold:1.7202789895236492e-003,right_val:0.6331263780593872,left_val:0.5013207793235779},{features:[[5,7,2,1,-1.],[6,7,1,1,2.]],threshold:-1.3016929733566940e-004,right_val:0.4226869940757752,left_val:0.5539718270301819},{features:[[2,12,18,4,-1.],[11,12,9,2,2.],[2,14,9,2,2.]],threshold:-4.8016388900578022e-003,right_val:0.5430780053138733,left_val:0.4425095021724701},{features:[[5,7,2,2,-1.],[5,7,1,1,2.],[6,8,1,1,2.]],threshold:-2.5399310979992151e-003,right_val:0.4697605073451996,left_val:0.7145782113075256},{features:[[16,3,4,2,-1.],[16,4,4,1,2.]],threshold:-1.4278929447755218e-003,right_val:0.5399605035781860,left_val:0.4070445001125336},{features:[[0,2,2,18,-1.],[0,2,1,9,2.],[1,11,1,9,2.]],threshold:-0.0251425504684448,right_val:0.4747352004051209,left_val:0.7884690761566162},{features:[[1,2,18,4,-1.],[10,2,9,2,2.],[1,4,9,2,2.]],threshold:-3.8899609353393316e-003,right_val:0.5577110052108765,left_val:0.4296191930770874},{features:[[9,14,1,3,-1.],[9,15,1,1,3.]],threshold:4.3947459198534489e-003,right_val:0.7023944258689880,left_val:0.4693162143230438},{features:[[2,12,18,4,-1.],[11,12,9,2,2.],[2,14,9,2,2.]],threshold:0.0246784202754498,right_val:0.3812510073184967,left_val:0.5242322087287903},{features:[[0,12,18,4,-1.],[0,12,9,2,2.],[9,14,9,2,2.]],threshold:0.0380476787686348,right_val:0.1687828004360199,left_val:0.5011739730834961},{features:[[11,4,5,3,-1.],[11,5,5,1,3.]],threshold:7.9424865543842316e-003,right_val:0.6369568109512329,left_val:0.4828582108020783},{features:[[6,4,7,3,-1.],[6,5,7,1,3.]],threshold:-1.5110049862414598e-003,right_val:0.4487667977809906,left_val:0.5906485915184021},{features:[[13,17,3,3,-1.],[13,18,3,1,3.]],threshold:6.4201741479337215e-003,right_val:0.2990570068359375,left_val:0.5241097807884216},{features:[[8,1,3,4,-1.],[9,1,1,4,3.]],threshold:-2.9802159406244755e-003,right_val:0.5078489780426025,left_val:0.3041465878486633},{features:[[11,4,2,4,-1.],[11,4,1,4,2.]],threshold:-7.4580078944563866e-004,right_val:0.5256826281547546,left_val:0.4128139019012451},{features:[[0,17,9,3,-1.],[3,17,3,3,3.]],threshold:-0.0104709500446916,right_val:0.4494296014308929,left_val:0.5808395147323608},{features:[[11,0,2,8,-1.],[12,0,1,4,2.],[11,4,1,4,2.]],threshold:9.3369204550981522e-003,right_val:0.2658948898315430,left_val:0.5246552824974060},{features:[[0,8,6,12,-1.],[0,8,3,6,2.],[3,14,3,6,2.]],threshold:0.0279369000345469,right_val:0.7087256908416748,left_val:0.4674955010414124},{features:[[10,7,4,12,-1.],[10,13,4,6,2.]],threshold:7.4277678504586220e-003,right_val:0.3758518099784851,left_val:0.5409486889839172},{features:[[5,3,8,14,-1.],[5,10,8,7,2.]],threshold:-0.0235845092684031,right_val:0.5238550901412964,left_val:0.3758639991283417},{features:[[14,10,6,1,-1.],[14,10,3,1,2.]],threshold:1.1452640173956752e-003,right_val:0.5804247260093689,left_val:0.4329578876495361},{features:[[0,4,10,4,-1.],[0,6,10,2,2.]],threshold:-4.3468660442158580e-004,right_val:0.3873069882392883,left_val:0.5280618071556091},{features:[[10,0,5,8,-1.],[10,4,5,4,2.]],threshold:0.0106485402211547,right_val:0.5681251883506775,left_val:0.4902113080024719},{features:[[8,1,4,8,-1.],[8,1,2,4,2.],[10,5,2,4,2.]],threshold:-3.9418050437234342e-004,right_val:0.4318251013755798,left_val:0.5570880174636841},{features:[[9,11,6,1,-1.],[11,11,2,1,3.]],threshold:-1.3270479394122958e-004,right_val:0.4343554973602295,left_val:0.5658439993858337},{features:[[8,9,3,4,-1.],[9,9,1,4,3.]],threshold:-2.0125510636717081e-003,right_val:0.4537523984909058,left_val:0.6056739091873169},{features:[[18,4,2,6,-1.],[18,6,2,2,3.]],threshold:2.4854319635778666e-003,right_val:0.4138010144233704,left_val:0.5390477180480957},{features:[[8,8,3,4,-1.],[9,8,1,4,3.]],threshold:1.8237880431115627e-003,right_val:0.5717188715934753,left_val:0.4354828894138336},{features:[[7,1,13,3,-1.],[7,2,13,1,3.]],threshold:-0.0166566595435143,right_val:0.5216122865676880,left_val:0.3010913133621216},{features:[[7,13,6,1,-1.],[9,13,2,1,3.]],threshold:8.0349558265879750e-004,right_val:0.3818396925926209,left_val:0.5300151109695435},{features:[[12,11,3,6,-1.],[12,13,3,2,3.]],threshold:3.4170378930866718e-003,right_val:0.4241400063037872,left_val:0.5328028798103333},{features:[[5,11,6,1,-1.],[7,11,2,1,3.]],threshold:-3.6222729249857366e-004,right_val:0.4186977148056030,left_val:0.5491728186607361},{features:[[1,4,18,10,-1.],[10,4,9,5,2.],[1,9,9,5,2.]],threshold:-0.1163002029061317,right_val:0.5226451158523560,left_val:0.1440722048282623},{features:[[8,6,4,9,-1.],[8,9,4,3,3.]],threshold:-0.0146950101479888,right_val:0.4715717136859894,left_val:0.7747725248336792},{features:[[8,6,4,3,-1.],[8,7,4,1,3.]],threshold:2.1972130052745342e-003,right_val:0.3315644860267639,left_val:0.5355433821678162},{features:[[8,7,3,3,-1.],[9,7,1,3,3.]],threshold:-4.6965209185145795e-004,right_val:0.4458136856555939,left_val:0.5767235159873962},{features:[[14,15,4,3,-1.],[14,16,4,1,3.]],threshold:6.5144998952746391e-003,right_val:0.3647888898849487,left_val:0.5215674042701721},{features:[[5,10,3,10,-1.],[6,10,1,10,3.]],threshold:0.0213000606745481,right_val:0.1567950993776321,left_val:0.4994204938411713},{features:[[8,15,4,3,-1.],[8,16,4,1,3.]],threshold:3.1881409231573343e-003,right_val:0.6287270188331604,left_val:0.4742200076580048},{features:[[0,8,1,6,-1.],[0,10,1,2,3.]],threshold:9.0019777417182922e-004,right_val:0.3943752050399780,left_val:0.5347954034805298},{features:[[10,15,1,3,-1.],[10,16,1,1,3.]],threshold:-5.1772277802228928e-003,right_val:0.5013138055801392,left_val:0.6727191805839539},{features:[[2,15,4,3,-1.],[2,16,4,1,3.]],threshold:-4.3764649890363216e-003,right_val:0.5128793120384216,left_val:0.3106675148010254},{features:[[18,3,2,8,-1.],[19,3,1,4,2.],[18,7,1,4,2.]],threshold:2.6299960445612669e-003,right_val:0.5755215883255005,left_val:0.4886310100555420},{features:[[0,3,2,8,-1.],[0,3,1,4,2.],[1,7,1,4,2.]],threshold:-2.0458688959479332e-003,right_val:0.4558076858520508,left_val:0.6025794148445129},{features:[[3,7,14,10,-1.],[10,7,7,5,2.],[3,12,7,5,2.]],threshold:0.0694827064871788,right_val:0.2185259014368057,left_val:0.5240747928619385},{features:[[0,7,19,3,-1.],[0,8,19,1,3.]],threshold:0.0240489393472672,right_val:0.2090622037649155,left_val:0.5011867284774780},{features:[[12,6,3,3,-1.],[12,7,3,1,3.]],threshold:3.1095340382307768e-003,right_val:0.7108548283576965,left_val:0.4866712093353272},{features:[[0,6,1,3,-1.],[0,7,1,1,3.]],threshold:-1.2503260513767600e-003,right_val:0.5156195163726807,left_val:0.3407891094684601},{features:[[12,6,3,3,-1.],[12,7,3,1,3.]],threshold:-1.0281190043315291e-003,right_val:0.4439432024955750,left_val:0.5575572252273560},{features:[[5,6,3,3,-1.],[5,7,3,1,3.]],threshold:-8.8893622159957886e-003,right_val:0.4620442092418671,left_val:0.6402000784873962},{features:[[8,2,4,2,-1.],[8,3,4,1,2.]],threshold:-6.1094801640138030e-004,right_val:0.5448899865150452,left_val:0.3766441941261292},{features:[[6,3,4,12,-1.],[8,3,2,12,2.]],threshold:-5.7686357758939266e-003,right_val:0.5133677124977112,left_val:0.3318648934364319},{features:[[13,6,2,3,-1.],[13,7,2,1,3.]],threshold:1.8506490159779787e-003,right_val:0.6406934857368469,left_val:0.4903570115566254},{features:[[0,10,20,4,-1.],[0,12,20,2,2.]],threshold:-0.0997994691133499,right_val:0.5015562176704407,left_val:0.1536051034927368},{features:[[2,0,17,14,-1.],[2,7,17,7,2.]],threshold:-0.3512834906578064,right_val:0.5174378752708435,left_val:0.0588231310248375},{features:[[0,0,6,10,-1.],[0,0,3,5,2.],[3,5,3,5,2.]],threshold:-0.0452445708215237,right_val:0.4677872955799103,left_val:0.6961488723754883},{features:[[14,6,6,4,-1.],[14,6,3,4,2.]],threshold:0.0714815780520439,right_val:0.1038092970848084,left_val:0.5167986154556274},{features:[[0,6,6,4,-1.],[3,6,3,4,2.]],threshold:2.1895780228078365e-003,right_val:0.5532060861587524,left_val:0.4273078143596649},{features:[[13,2,7,2,-1.],[13,3,7,1,2.]],threshold:-5.9242651332169771e-004,right_val:0.5276389122009277,left_val:0.4638943970203400},{features:[[0,2,7,2,-1.],[0,3,7,1,2.]],threshold:1.6788389766588807e-003,right_val:0.3932034969329834,left_val:0.5301648974418640},{features:[[6,11,14,2,-1.],[13,11,7,1,2.],[6,12,7,1,2.]],threshold:-2.2163488902151585e-003,right_val:0.4757033884525299,left_val:0.5630694031715393},{features:[[8,5,2,2,-1.],[8,5,1,1,2.],[9,6,1,1,2.]],threshold:1.1568699846975505e-004,right_val:0.5535702705383301,left_val:0.4307535886764526},{features:[[13,9,2,3,-1.],[13,9,1,3,2.]],threshold:-7.2017288766801357e-003,right_val:0.5193064212799072,left_val:0.1444882005453110},{features:[[1,1,3,12,-1.],[2,1,1,12,3.]],threshold:8.9081272017210722e-004,right_val:0.5593621134757996,left_val:0.4384432137012482},{features:[[17,4,1,3,-1.],[17,5,1,1,3.]],threshold:1.9605009583756328e-004,right_val:0.4705956876277924,left_val:0.5340415835380554},{features:[[2,4,1,3,-1.],[2,5,1,1,3.]],threshold:5.2022142335772514e-004,right_val:0.3810079097747803,left_val:0.5213856101036072},{features:[[14,5,1,3,-1.],[14,6,1,1,3.]],threshold:9.4588572392240167e-004,right_val:0.6130738854408264,left_val:0.4769414961338043},{features:[[7,16,2,3,-1.],[7,17,2,1,3.]],threshold:9.1698471806012094e-005,right_val:0.5429363250732422,left_val:0.4245009124279022},{features:[[8,13,4,6,-1.],[10,13,2,3,2.],[8,16,2,3,2.]],threshold:2.1833200007677078e-003,right_val:0.4191075861454010,left_val:0.5457730889320374},{features:[[5,5,1,3,-1.],[5,6,1,1,3.]],threshold:-8.6039671441540122e-004,right_val:0.4471659958362579,left_val:0.5764588713645935},{features:[[16,0,4,20,-1.],[16,0,2,20,2.]],threshold:-0.0132362395524979,right_val:0.4695009887218475,left_val:0.6372823119163513},{features:[[5,1,2,6,-1.],[5,1,1,3,2.],[6,4,1,3,2.]],threshold:4.3376701069064438e-004,right_val:0.3945829868316650,left_val:0.5317873954772949}],threshold:67.6989212036132810},{simpleClassifiers:[{features:[[5,4,10,4,-1.],[5,6,10,2,2.]],threshold:-0.0248471498489380,right_val:0.3873311877250671,left_val:0.6555516719818115},{features:[[15,2,4,12,-1.],[15,2,2,12,2.]],threshold:6.1348611488938332e-003,right_val:0.5973997712135315,left_val:0.3748072087764740},{features:[[7,6,4,12,-1.],[7,12,4,6,2.]],threshold:6.4498498104512691e-003,right_val:0.2548811137676239,left_val:0.5425491929054260},{features:[[14,5,1,8,-1.],[14,9,1,4,2.]],threshold:6.3491211039945483e-004,right_val:0.5387253761291504,left_val:0.2462442070245743},{features:[[1,4,14,10,-1.],[1,4,7,5,2.],[8,9,7,5,2.]],threshold:1.4023890253156424e-003,right_val:0.3528657853603363,left_val:0.5594322085380554},{features:[[11,6,6,14,-1.],[14,6,3,7,2.],[11,13,3,7,2.]],threshold:3.0044000595808029e-004,right_val:0.5765938162803650,left_val:0.3958503901958466},{features:[[3,6,6,14,-1.],[3,6,3,7,2.],[6,13,3,7,2.]],threshold:1.0042409849120304e-004,right_val:0.5534998178482056,left_val:0.3698996901512146},{features:[[4,9,15,2,-1.],[9,9,5,2,3.]],threshold:-5.0841490738093853e-003,right_val:0.5547800064086914,left_val:0.3711090981960297},{features:[[7,14,6,3,-1.],[7,15,6,1,3.]],threshold:-0.0195372607558966,right_val:0.4579297006130219,left_val:0.7492755055427551},{features:[[6,3,14,4,-1.],[13,3,7,2,2.],[6,5,7,2,2.]],threshold:-7.4532740654831287e-006,right_val:0.3904069960117340,left_val:0.5649787187576294},{features:[[1,9,15,2,-1.],[6,9,5,2,3.]],threshold:-3.6079459823668003e-003,right_val:0.5267801284790039,left_val:0.3381088078022003},{features:[[6,11,8,9,-1.],[6,14,8,3,3.]],threshold:2.0697501022368670e-003,right_val:0.3714388906955719,left_val:0.5519291162490845},{features:[[7,4,3,8,-1.],[8,4,1,8,3.]],threshold:-4.6463840408250690e-004,right_val:0.4113566875457764,left_val:0.5608214735984802},{features:[[14,6,2,6,-1.],[14,9,2,3,2.]],threshold:7.5490452582016587e-004,right_val:0.5329356193542481,left_val:0.3559206128120422},{features:[[5,7,6,4,-1.],[5,7,3,2,2.],[8,9,3,2,2.]],threshold:-9.8322238773107529e-004,right_val:0.3763205111026764,left_val:0.5414795875549316},{features:[[1,1,18,19,-1.],[7,1,6,19,3.]],threshold:-0.0199406407773495,right_val:0.4705299139022827,left_val:0.6347903013229370},{features:[[1,2,6,5,-1.],[4,2,3,5,2.]],threshold:3.7680300883948803e-003,right_val:0.5563716292381287,left_val:0.3913489878177643},{features:[[12,17,6,2,-1.],[12,18,6,1,2.]],threshold:-9.4528505578637123e-003,right_val:0.5215116739273071,left_val:0.2554892897605896},{features:[[2,17,6,2,-1.],[2,18,6,1,2.]],threshold:2.9560849070549011e-003,right_val:0.3063920140266419,left_val:0.5174679160118103},{features:[[17,3,3,6,-1.],[17,5,3,2,3.]],threshold:9.1078737750649452e-003,right_val:0.2885963022708893,left_val:0.5388448238372803},{features:[[8,17,3,3,-1.],[8,18,3,1,3.]],threshold:1.8219229532405734e-003,right_val:0.5852196812629700,left_val:0.4336043000221252},{features:[[10,13,2,6,-1.],[10,16,2,3,2.]],threshold:0.0146887395530939,right_val:0.2870005965232849,left_val:0.5287361741065979},{features:[[7,13,6,3,-1.],[7,14,6,1,3.]],threshold:-0.0143879903480411,right_val:0.4647370874881744,left_val:0.7019448876380920},{features:[[17,3,3,6,-1.],[17,5,3,2,3.]],threshold:-0.0189866498112679,right_val:0.5247011780738831,left_val:0.2986552119255066},{features:[[8,13,2,3,-1.],[8,14,2,1,3.]],threshold:1.1527639580890536e-003,right_val:0.5931661725044251,left_val:0.4323473870754242},{features:[[9,3,6,2,-1.],[11,3,2,2,3.]],threshold:0.0109336702153087,right_val:0.3130319118499756,left_val:0.5286864042282105},{features:[[0,3,3,6,-1.],[0,5,3,2,3.]],threshold:-0.0149327302351594,right_val:0.5084077119827271,left_val:0.2658419013023377},{features:[[8,5,4,6,-1.],[8,7,4,2,3.]],threshold:-2.9970539617352188e-004,right_val:0.3740724027156830,left_val:0.5463526844978333},{features:[[5,5,3,2,-1.],[5,6,3,1,2.]],threshold:4.1677621193230152e-003,right_val:0.7435721755027771,left_val:0.4703496992588043},{features:[[10,1,3,4,-1.],[11,1,1,4,3.]],threshold:-6.3905320130288601e-003,right_val:0.5280538201332092,left_val:0.2069258987903595},{features:[[1,2,5,9,-1.],[1,5,5,3,3.]],threshold:4.5029609464108944e-003,right_val:0.3483543097972870,left_val:0.5182648897171021},{features:[[13,6,2,3,-1.],[13,7,2,1,3.]],threshold:-9.2040365561842918e-003,right_val:0.4932360053062439,left_val:0.6803777217864990},{features:[[0,6,14,3,-1.],[7,6,7,3,2.]],threshold:0.0813272595405579,right_val:0.2253051996231079,left_val:0.5058398842811585},{features:[[2,11,18,8,-1.],[2,15,18,4,2.]],threshold:-0.1507928073406220,right_val:0.5264679789543152,left_val:0.2963424921035767},{features:[[5,6,2,3,-1.],[5,7,2,1,3.]],threshold:3.3179009333252907e-003,right_val:0.7072932124137878,left_val:0.4655495882034302},{features:[[10,6,4,2,-1.],[12,6,2,1,2.],[10,7,2,1,2.]],threshold:7.7402801252901554e-004,right_val:0.5668237805366516,left_val:0.4780347943305969},{features:[[6,6,4,2,-1.],[6,6,2,1,2.],[8,7,2,1,2.]],threshold:6.8199541419744492e-004,right_val:0.5722156763076782,left_val:0.4286996126174927},{features:[[10,1,3,4,-1.],[11,1,1,4,3.]],threshold:5.3671570494771004e-003,right_val:0.3114621937274933,left_val:0.5299307107925415},{features:[[7,1,2,7,-1.],[8,1,1,7,2.]],threshold:9.7018666565418243e-005,right_val:0.5269461870193481,left_val:0.3674638867378235},{features:[[4,2,15,14,-1.],[4,9,15,7,2.]],threshold:-0.1253408938646317,right_val:0.5245791077613831,left_val:0.2351492047309876},{features:[[8,7,3,2,-1.],[9,7,1,2,3.]],threshold:-5.2516269497573376e-003,right_val:0.4693767130374908,left_val:0.7115936875343323},{features:[[2,3,18,4,-1.],[11,3,9,2,2.],[2,5,9,2,2.]],threshold:-7.8342109918594360e-003,right_val:0.5409085750579834,left_val:0.4462651014328003},{features:[[9,7,2,2,-1.],[10,7,1,2,2.]],threshold:-1.1310069821774960e-003,right_val:0.4417662024497986,left_val:0.5945618748664856},{features:[[13,9,2,3,-1.],[13,9,1,3,2.]],threshold:1.7601120052859187e-003,right_val:0.3973453044891357,left_val:0.5353249907493591},{features:[[5,2,6,2,-1.],[7,2,2,2,3.]],threshold:-8.1581249833106995e-004,right_val:0.5264726877212524,left_val:0.3760268092155457},{features:[[9,5,2,7,-1.],[9,5,1,7,2.]],threshold:-3.8687589112669230e-003,right_val:0.4749819934368134,left_val:0.6309912800788879},{features:[[5,9,2,3,-1.],[6,9,1,3,2.]],threshold:1.5207129763439298e-003,right_val:0.3361223936080933,left_val:0.5230181813240051},{features:[[6,0,14,18,-1.],[6,9,14,9,2.]],threshold:0.5458673834800720,right_val:0.1172635033726692,left_val:0.5167139768600464},{features:[[2,16,6,3,-1.],[2,17,6,1,3.]],threshold:0.0156501904129982,right_val:0.1393294930458069,left_val:0.4979439079761505},{features:[[9,7,3,6,-1.],[10,7,1,6,3.]],threshold:-0.0117318602278829,right_val:0.4921196103096008,left_val:0.7129650712013245},{features:[[7,8,4,3,-1.],[7,9,4,1,3.]],threshold:-6.1765122227370739e-003,right_val:0.5049701929092407,left_val:0.2288102954626083},{features:[[7,12,6,3,-1.],[7,13,6,1,3.]],threshold:2.2457661107182503e-003,right_val:0.6048725843429565,left_val:0.4632433950901032},{features:[[9,12,2,3,-1.],[9,13,2,1,3.]],threshold:-5.1915869116783142e-003,right_val:0.4602192938327789,left_val:0.6467421054840088},{features:[[7,12,6,2,-1.],[9,12,2,2,3.]],threshold:-0.0238278806209564,right_val:0.5226079225540161,left_val:0.1482000946998596},{features:[[5,11,4,6,-1.],[5,14,4,3,2.]],threshold:1.0284580057486892e-003,right_val:0.3375957012176514,left_val:0.5135489106178284},{features:[[11,12,7,2,-1.],[11,13,7,1,2.]],threshold:-0.0100788502022624,right_val:0.5303567051887512,left_val:0.2740561068058014},{features:[[6,10,8,6,-1.],[6,10,4,3,2.],[10,13,4,3,2.]],threshold:2.6168930344283581e-003,right_val:0.3972454071044922,left_val:0.5332670807838440},{features:[[11,10,3,4,-1.],[11,12,3,2,2.]],threshold:5.4385367548093200e-004,right_val:0.4063411951065064,left_val:0.5365604162216187},{features:[[9,16,2,3,-1.],[9,17,2,1,3.]],threshold:5.3510512225329876e-003,right_val:0.6889045834541321,left_val:0.4653759002685547},{features:[[13,3,1,9,-1.],[13,6,1,3,3.]],threshold:-1.5274790348485112e-003,right_val:0.3624723851680756,left_val:0.5449501276016235},{features:[[1,13,14,6,-1.],[1,15,14,2,3.]],threshold:-0.0806244164705276,right_val:0.5000287294387817,left_val:0.1656087040901184},{features:[[13,6,1,6,-1.],[13,9,1,3,2.]],threshold:0.0221920292824507,right_val:0.2002808004617691,left_val:0.5132731199264526},{features:[[0,4,3,8,-1.],[1,4,1,8,3.]],threshold:7.3100631125271320e-003,right_val:0.6366536021232605,left_val:0.4617947936058044},{features:[[18,0,2,18,-1.],[18,0,1,18,2.]],threshold:-6.4063072204589844e-003,right_val:0.4867860972881317,left_val:0.5916250944137573},{features:[[2,3,6,2,-1.],[2,4,6,1,2.]],threshold:-7.6415040530264378e-004,right_val:0.5315797924995422,left_val:0.3888409137725830},{features:[[9,0,8,6,-1.],[9,2,8,2,3.]],threshold:7.6734489994123578e-004,right_val:0.5605279803276062,left_val:0.4159064888954163},{features:[[6,6,1,6,-1.],[6,9,1,3,2.]],threshold:6.1474501853808761e-004,right_val:0.5120148062705994,left_val:0.3089022040367127},{features:[[14,8,6,3,-1.],[14,9,6,1,3.]],threshold:-5.0105270929634571e-003,right_val:0.5207306146621704,left_val:0.3972199857234955},{features:[[0,0,2,18,-1.],[1,0,1,18,2.]],threshold:-8.6909132078289986e-003,right_val:0.4608575999736786,left_val:0.6257408261299133},{features:[[1,18,18,2,-1.],[10,18,9,1,2.],[1,19,9,1,2.]],threshold:-0.0163914598524570,right_val:0.5242266058921814,left_val:0.2085209935903549},{features:[[3,15,2,2,-1.],[3,16,2,1,2.]],threshold:4.0973909199237823e-004,right_val:0.3780320882797241,left_val:0.5222427248954773},{features:[[8,14,5,3,-1.],[8,15,5,1,3.]],threshold:-2.5242289993911982e-003,right_val:0.4611890017986298,left_val:0.5803927183151245},{features:[[8,14,2,3,-1.],[8,15,2,1,3.]],threshold:5.0945312250405550e-004,right_val:0.5846015810966492,left_val:0.4401271939277649},{features:[[12,3,3,3,-1.],[13,3,1,3,3.]],threshold:1.9656419754028320e-003,right_val:0.4184590876102448,left_val:0.5322325229644775},{features:[[7,5,6,2,-1.],[9,5,2,2,3.]],threshold:5.6298897834494710e-004,right_val:0.5234565734863281,left_val:0.3741844892501831},{features:[[15,5,5,2,-1.],[15,6,5,1,2.]],threshold:-6.7946797935292125e-004,right_val:0.5356478095054627,left_val:0.4631041884422302},{features:[[0,5,5,2,-1.],[0,6,5,1,2.]],threshold:7.2856349870562553e-003,right_val:0.2377564013004303,left_val:0.5044670104980469},{features:[[17,14,1,6,-1.],[17,17,1,3,2.]],threshold:-0.0174594894051552,right_val:0.5050435066223145,left_val:0.7289121150970459},{features:[[2,9,9,3,-1.],[5,9,3,3,3.]],threshold:-0.0254217498004436,right_val:0.4678100049495697,left_val:0.6667134761810303},{features:[[12,3,3,3,-1.],[13,3,1,3,3.]],threshold:-1.5647639520466328e-003,right_val:0.5323626995086670,left_val:0.4391759037971497},{features:[[0,0,4,18,-1.],[2,0,2,18,2.]],threshold:0.0114443600177765,right_val:0.5680012106895447,left_val:0.4346440136432648},{features:[[17,6,1,3,-1.],[17,7,1,1,3.]],threshold:-6.7352550104260445e-004,right_val:0.5296812057495117,left_val:0.4477140903472900},{features:[[2,14,1,6,-1.],[2,17,1,3,2.]],threshold:9.3194209039211273e-003,right_val:0.7462607026100159,left_val:0.4740200042724609},{features:[[19,8,1,2,-1.],[19,9,1,1,2.]],threshold:1.3328490604180843e-004,right_val:0.4752134978771210,left_val:0.5365061759948731},{features:[[5,3,3,3,-1.],[6,3,1,3,3.]],threshold:-7.8815799206495285e-003,right_val:0.5015255212783814,left_val:0.1752219051122665},{features:[[9,16,2,3,-1.],[9,17,2,1,3.]],threshold:-5.7985680177807808e-003,right_val:0.4896200895309448,left_val:0.7271236777305603},{features:[[2,6,1,3,-1.],[2,7,1,1,3.]],threshold:-3.8922499516047537e-004,right_val:0.5344941020011902,left_val:0.4003908932209015},{features:[[12,4,8,2,-1.],[16,4,4,1,2.],[12,5,4,1,2.]],threshold:-1.9288610201328993e-003,right_val:0.4803955852985382,left_val:0.5605612993240356},{features:[[0,4,8,2,-1.],[0,4,4,1,2.],[4,5,4,1,2.]],threshold:8.4214154630899429e-003,right_val:0.7623608708381653,left_val:0.4753246903419495},{features:[[2,16,18,4,-1.],[2,18,18,2,2.]],threshold:8.1655876711010933e-003,right_val:0.4191643893718720,left_val:0.5393261909484863},{features:[[7,15,2,4,-1.],[7,17,2,2,2.]],threshold:4.8280550981871784e-004,right_val:0.5399821996688843,left_val:0.4240800142288208},{features:[[4,0,14,3,-1.],[4,1,14,1,3.]],threshold:-2.7186630759388208e-003,right_val:0.5424923896789551,left_val:0.4244599938392639},{features:[[0,0,4,20,-1.],[2,0,2,20,2.]],threshold:-0.0125072300434113,right_val:0.4550411105155945,left_val:0.5895841717720032},{features:[[12,4,4,8,-1.],[14,4,2,4,2.],[12,8,2,4,2.]],threshold:-0.0242865197360516,right_val:0.5189179778099060,left_val:0.2647134959697723},{features:[[6,7,2,2,-1.],[6,7,1,1,2.],[7,8,1,1,2.]],threshold:-2.9676330741494894e-003,right_val:0.4749749898910523,left_val:0.7347682714462280},{features:[[10,6,2,3,-1.],[10,7,2,1,3.]],threshold:-0.0125289997085929,right_val:0.5177599787712097,left_val:0.2756049931049347},{features:[[8,7,3,2,-1.],[8,8,3,1,2.]],threshold:-1.0104000102728605e-003,right_val:0.5144724249839783,left_val:0.3510560989379883},{features:[[8,2,6,12,-1.],[8,8,6,6,2.]],threshold:-2.1348530426621437e-003,right_val:0.4667319953441620,left_val:0.5637925863265991},{features:[[4,0,11,12,-1.],[4,4,11,4,3.]],threshold:0.0195642597973347,right_val:0.6137639880180359,left_val:0.4614573121070862},{features:[[14,9,6,11,-1.],[16,9,2,11,3.]],threshold:-0.0971463471651077,right_val:0.5193555951118469,left_val:0.2998378872871399},{features:[[0,14,4,3,-1.],[0,15,4,1,3.]],threshold:4.5014568604528904e-003,right_val:0.3045755922794342,left_val:0.5077884793281555},{features:[[9,10,2,3,-1.],[9,11,2,1,3.]],threshold:6.3706971704959869e-003,right_val:0.6887500882148743,left_val:0.4861018955707550},{features:[[5,11,3,2,-1.],[5,12,3,1,2.]],threshold:-9.0721528977155685e-003,right_val:0.5017563104629517,left_val:0.1673395931720734},{features:[[9,15,3,3,-1.],[10,15,1,3,3.]],threshold:-5.3537208586931229e-003,right_val:0.5242633223533630,left_val:0.2692756950855255},{features:[[8,8,3,4,-1.],[9,8,1,4,3.]],threshold:-0.0109328404068947,right_val:0.4736028909683228,left_val:0.7183864116668701},{features:[[9,15,3,3,-1.],[10,15,1,3,3.]],threshold:8.2356072962284088e-003,right_val:0.2389862984418869,left_val:0.5223966836929321},{features:[[7,7,3,2,-1.],[8,7,1,2,3.]],threshold:-1.0038160253316164e-003,right_val:0.4433943033218384,left_val:0.5719355940818787},{features:[[2,10,16,4,-1.],[10,10,8,2,2.],[2,12,8,2,2.]],threshold:4.0859128348529339e-003,right_val:0.4148836135864258,left_val:0.5472841858863831},{features:[[2,3,4,17,-1.],[4,3,2,17,2.]],threshold:0.1548541933298111,right_val:0.0610615983605385,left_val:0.4973812103271484},{features:[[15,13,2,7,-1.],[15,13,1,7,2.]],threshold:2.0897459762636572e-004,right_val:0.5423889160156250,left_val:0.4709174036979675},{features:[[2,2,6,1,-1.],[5,2,3,1,2.]],threshold:3.3316991175524890e-004,right_val:0.5300992131233215,left_val:0.4089626967906952},{features:[[5,2,12,4,-1.],[9,2,4,4,3.]],threshold:-0.0108134001493454,right_val:0.4957334101200104,left_val:0.6104369759559631},{features:[[6,0,8,12,-1.],[6,0,4,6,2.],[10,6,4,6,2.]],threshold:0.0456560105085373,right_val:0.2866660058498383,left_val:0.5069689154624939},{features:[[13,7,2,2,-1.],[14,7,1,1,2.],[13,8,1,1,2.]],threshold:1.2569549726322293e-003,right_val:0.6318171024322510,left_val:0.4846917092800140},{features:[[0,12,20,6,-1.],[0,14,20,2,3.]],threshold:-0.1201507002115250,right_val:0.4980959892272949,left_val:0.0605261400341988},{features:[[14,7,2,3,-1.],[14,7,1,3,2.]],threshold:-1.0533799650147557e-004,right_val:0.4708042144775391,left_val:0.5363109707832336},{features:[[0,8,9,12,-1.],[3,8,3,12,3.]],threshold:-0.2070319056510925,right_val:0.4979098141193390,left_val:0.0596603304147720},{features:[[3,0,16,2,-1.],[3,0,8,2,2.]],threshold:1.2909180077258497e-004,right_val:0.5377997756004334,left_val:0.4712977111339569},{features:[[6,15,3,3,-1.],[6,16,3,1,3.]],threshold:3.8818528992123902e-004,right_val:0.5534191131591797,left_val:0.4363538026809692},{features:[[8,15,6,3,-1.],[8,16,6,1,3.]],threshold:-2.9243610333651304e-003,right_val:0.4825215935707092,left_val:0.5811185836791992},{features:[[0,10,1,6,-1.],[0,12,1,2,3.]],threshold:8.3882332546636462e-004,right_val:0.4038138985633850,left_val:0.5311700105667114},{features:[[10,9,4,3,-1.],[10,10,4,1,3.]],threshold:-1.9061550265178084e-003,right_val:0.5260015130043030,left_val:0.3770701885223389},{features:[[9,15,2,3,-1.],[9,16,2,1,3.]],threshold:8.9514348655939102e-003,right_val:0.7682183980941773,left_val:0.4766167998313904},{features:[[5,7,10,1,-1.],[5,7,5,1,2.]],threshold:0.0130834598094225,right_val:0.3062222003936768,left_val:0.5264462828636169},{features:[[4,0,12,19,-1.],[10,0,6,19,2.]],threshold:-0.2115933001041412,right_val:0.4695810079574585,left_val:0.6737198233604431},{features:[[0,6,20,6,-1.],[10,6,10,3,2.],[0,9,10,3,2.]],threshold:3.1493250280618668e-003,right_val:0.4386953115463257,left_val:0.5644835233688355},{features:[[3,6,2,2,-1.],[3,6,1,1,2.],[4,7,1,1,2.]],threshold:3.9754100725986063e-004,right_val:0.5895630121231079,left_val:0.4526061117649078},{features:[[15,6,2,2,-1.],[16,6,1,1,2.],[15,7,1,1,2.]],threshold:-1.3814480043947697e-003,right_val:0.4942413866519928,left_val:0.6070582270622253},{features:[[3,6,2,2,-1.],[3,6,1,1,2.],[4,7,1,1,2.]],threshold:-5.8122188784182072e-004,right_val:0.4508252143859863,left_val:0.5998213291168213},{features:[[14,4,1,12,-1.],[14,10,1,6,2.]],threshold:-2.3905329871922731e-003,right_val:0.5223848223686218,left_val:0.4205588996410370},{features:[[2,5,16,10,-1.],[2,5,8,5,2.],[10,10,8,5,2.]],threshold:0.0272689294070005,right_val:0.3563301861286163,left_val:0.5206447243690491},{features:[[9,17,3,2,-1.],[10,17,1,2,3.]],threshold:-3.7658358924090862e-003,right_val:0.5218814015388489,left_val:0.3144704103469849},{features:[[1,4,2,2,-1.],[1,5,2,1,2.]],threshold:-1.4903489500284195e-003,right_val:0.5124437212944031,left_val:0.3380196094512940},{features:[[5,0,15,5,-1.],[10,0,5,5,3.]],threshold:-0.0174282304942608,right_val:0.4919725954532623,left_val:0.5829960703849793},{features:[[0,0,15,5,-1.],[5,0,5,5,3.]],threshold:-0.0152780301868916,right_val:0.4617887139320374,left_val:0.6163144707679749},{features:[[11,2,2,17,-1.],[11,2,1,17,2.]],threshold:0.0319956094026566,right_val:0.1712764054536820,left_val:0.5166357159614563},{features:[[7,2,2,17,-1.],[8,2,1,17,2.]],threshold:-3.8256710395216942e-003,right_val:0.5131387710571289,left_val:0.3408012092113495},{features:[[15,11,2,9,-1.],[15,11,1,9,2.]],threshold:-8.5186436772346497e-003,right_val:0.4997941851615906,left_val:0.6105518937110901},{features:[[3,11,2,9,-1.],[4,11,1,9,2.]],threshold:9.0641621500253677e-004,right_val:0.5582311153411865,left_val:0.4327270984649658},{features:[[5,16,14,4,-1.],[5,16,7,4,2.]],threshold:0.0103448498994112,right_val:0.5452420115470886,left_val:0.4855653047561646}],threshold:69.2298736572265630},{simpleClassifiers:[{features:[[1,4,18,1,-1.],[7,4,6,1,3.]],threshold:7.8981826081871986e-003,right_val:0.5946462154388428,left_val:0.3332524895668030},{features:[[13,7,6,4,-1.],[16,7,3,2,2.],[13,9,3,2,2.]],threshold:1.6170160379260778e-003,right_val:0.5577868819236755,left_val:0.3490641117095947},{features:[[9,8,2,12,-1.],[9,12,2,4,3.]],threshold:-5.5449741194024682e-004,right_val:0.3291530013084412,left_val:0.5542566180229187},{features:[[12,1,6,6,-1.],[12,3,6,2,3.]],threshold:1.5428980113938451e-003,right_val:0.5545979142189026,left_val:0.3612579107284546},{features:[[5,2,6,6,-1.],[5,2,3,3,2.],[8,5,3,3,2.]],threshold:-1.0329450014978647e-003,right_val:0.5576140284538269,left_val:0.3530139029026032},{features:[[9,16,6,4,-1.],[12,16,3,2,2.],[9,18,3,2,2.]],threshold:7.7698158565908670e-004,right_val:0.5645321011543274,left_val:0.3916778862476349},{features:[[1,2,18,3,-1.],[7,2,6,3,3.]],threshold:0.1432030051946640,right_val:0.7023633122444153,left_val:0.4667482078075409},{features:[[7,4,9,10,-1.],[7,9,9,5,2.]],threshold:-7.3866490274667740e-003,right_val:0.5289257764816284,left_val:0.3073684871196747},{features:[[5,9,4,4,-1.],[7,9,2,4,2.]],threshold:-6.2936742324382067e-004,right_val:0.4037049114704132,left_val:0.5622118115425110},{features:[[11,10,3,6,-1.],[11,13,3,3,2.]],threshold:7.8893528552725911e-004,right_val:0.3557874858379364,left_val:0.5267661213874817},{features:[[7,11,5,3,-1.],[7,12,5,1,3.]],threshold:-0.0122280502691865,right_val:0.4625549912452698,left_val:0.6668320894241333},{features:[[7,11,6,6,-1.],[10,11,3,3,2.],[7,14,3,3,2.]],threshold:3.5420239437371492e-003,right_val:0.3869673013687134,left_val:0.5521438121795654},{features:[[0,0,10,9,-1.],[0,3,10,3,3.]],threshold:-1.0585320414975286e-003,right_val:0.5320926904678345,left_val:0.3628678023815155},{features:[[13,14,1,6,-1.],[13,16,1,2,3.]],threshold:1.4935660146875307e-005,right_val:0.5363323092460632,left_val:0.4632444977760315},{features:[[0,2,3,6,-1.],[0,4,3,2,3.]],threshold:5.2537708543241024e-003,right_val:0.3265708982944489,left_val:0.5132231712341309},{features:[[8,14,4,3,-1.],[8,15,4,1,3.]],threshold:-8.2338023930788040e-003,right_val:0.4774140119552612,left_val:0.6693689823150635},{features:[[6,14,1,6,-1.],[6,16,1,2,3.]],threshold:2.1866810129722580e-005,right_val:0.5457931160926819,left_val:0.4053862094879150},{features:[[9,15,2,3,-1.],[9,16,2,1,3.]],threshold:-3.8150229956954718e-003,right_val:0.4793178141117096,left_val:0.6454995870590210},{features:[[6,4,3,3,-1.],[7,4,1,3,3.]],threshold:1.1105879675596952e-003,right_val:0.3529678881168366,left_val:0.5270407199859619},{features:[[9,0,11,3,-1.],[9,1,11,1,3.]],threshold:-5.7707689702510834e-003,right_val:0.5352957844734192,left_val:0.3803547024726868},{features:[[0,6,20,3,-1.],[0,7,20,1,3.]],threshold:-3.0158339068293571e-003,right_val:0.3887133002281189,left_val:0.5339403152465820},{features:[[10,1,1,2,-1.],[10,2,1,1,2.]],threshold:-8.5453689098358154e-004,right_val:0.5273603796958923,left_val:0.3564616143703461},{features:[[9,6,2,6,-1.],[10,6,1,6,2.]],threshold:0.0110505102202296,right_val:0.6849737763404846,left_val:0.4671907126903534},{features:[[5,8,12,1,-1.],[9,8,4,1,3.]],threshold:0.0426058396697044,right_val:0.0702200904488564,left_val:0.5151473283767700},{features:[[3,8,12,1,-1.],[7,8,4,1,3.]],threshold:-3.0781750101596117e-003,right_val:0.5152602195739746,left_val:0.3041661083698273},{features:[[9,7,3,5,-1.],[10,7,1,5,3.]],threshold:-5.4815728217363358e-003,right_val:0.4897229969501495,left_val:0.6430295705795288},{features:[[3,9,6,2,-1.],[6,9,3,2,2.]],threshold:3.1881860923022032e-003,right_val:0.3826209902763367,left_val:0.5307493209838867},{features:[[12,9,3,3,-1.],[12,10,3,1,3.]],threshold:3.5947180003859103e-004,right_val:0.5421904921531677,left_val:0.4650047123432159},{features:[[7,0,6,1,-1.],[9,0,2,1,3.]],threshold:-4.0705031715333462e-003,right_val:0.5079116225242615,left_val:0.2849679887294769},{features:[[12,9,3,3,-1.],[12,10,3,1,3.]],threshold:-0.0145941702648997,right_val:0.5128461718559265,left_val:0.2971645891666412},{features:[[7,10,2,1,-1.],[8,10,1,1,2.]],threshold:-1.1947689927183092e-004,right_val:0.4343082010746002,left_val:0.5631098151206970},{features:[[6,4,9,13,-1.],[9,4,3,13,3.]],threshold:-6.9344649091362953e-004,right_val:0.5359959006309509,left_val:0.4403578042984009},{features:[[6,8,4,2,-1.],[6,9,4,1,2.]],threshold:1.4834799912932795e-005,right_val:0.5164697766304016,left_val:0.3421008884906769},{features:[[16,2,4,6,-1.],[16,2,2,6,2.]],threshold:9.0296985581517220e-003,right_val:0.6114075183868408,left_val:0.4639343023300171},{features:[[0,17,6,3,-1.],[0,18,6,1,3.]],threshold:-8.0640818923711777e-003,right_val:0.5075494050979614,left_val:0.2820158898830414},{features:[[10,10,3,10,-1.],[10,15,3,5,2.]],threshold:0.0260621197521687,right_val:0.2688778042793274,left_val:0.5208905935287476},{features:[[8,7,3,5,-1.],[9,7,1,5,3.]],threshold:0.0173146594315767,right_val:0.6738539934158325,left_val:0.4663713872432709},{features:[[10,4,4,3,-1.],[10,4,2,3,2.]],threshold:0.0226666405797005,right_val:0.2212723940610886,left_val:0.5209349989891052},{features:[[8,4,3,8,-1.],[9,4,1,8,3.]],threshold:-2.1965929772704840e-003,right_val:0.4538190066814423,left_val:0.6063101291656494},{features:[[6,6,9,13,-1.],[9,6,3,13,3.]],threshold:-9.5282476395368576e-003,right_val:0.5247430801391602,left_val:0.4635204970836639},{features:[[6,0,8,12,-1.],[6,0,4,6,2.],[10,6,4,6,2.]],threshold:8.0943619832396507e-003,right_val:0.3913882076740265,left_val:0.5289440155029297},{features:[[14,2,6,8,-1.],[16,2,2,8,3.]],threshold:-0.0728773325681686,right_val:0.4990234971046448,left_val:0.7752001881599426},{features:[[6,0,3,6,-1.],[7,0,1,6,3.]],threshold:-6.9009521976113319e-003,right_val:0.5048090219497681,left_val:0.2428039014339447},{features:[[14,2,6,8,-1.],[16,2,2,8,3.]],threshold:-0.0113082397729158,right_val:0.4842376112937927,left_val:0.5734364986419678},{features:[[0,5,6,6,-1.],[0,8,6,3,2.]],threshold:0.0596132017672062,right_val:0.2524977028369904,left_val:0.5029836297035217},{features:[[9,12,6,2,-1.],[12,12,3,1,2.],[9,13,3,1,2.]],threshold:-2.8624620754271746e-003,right_val:0.4898459911346436,left_val:0.6073045134544373},{features:[[8,17,3,2,-1.],[9,17,1,2,3.]],threshold:4.4781449250876904e-003,right_val:0.2220316976308823,left_val:0.5015289187431335},{features:[[11,6,2,2,-1.],[12,6,1,1,2.],[11,7,1,1,2.]],threshold:-1.7513240454718471e-003,right_val:0.4933868944644928,left_val:0.6614428758621216},{features:[[1,9,18,2,-1.],[7,9,6,2,3.]],threshold:0.0401634201407433,right_val:0.3741044998168945,left_val:0.5180878043174744},{features:[[11,6,2,2,-1.],[12,6,1,1,2.],[11,7,1,1,2.]],threshold:3.4768949262797832e-004,right_val:0.5818032026290894,left_val:0.4720416963100433},{features:[[3,4,12,8,-1.],[7,4,4,8,3.]],threshold:2.6551650371402502e-003,right_val:0.5221335887908936,left_val:0.3805010914802551},{features:[[13,11,5,3,-1.],[13,12,5,1,3.]],threshold:-8.7706279009580612e-003,right_val:0.5231295228004456,left_val:0.2944166064262390},{features:[[9,10,2,3,-1.],[9,11,2,1,3.]],threshold:-5.5122091434895992e-003,right_val:0.4722816944122315,left_val:0.7346177101135254},{features:[[14,7,2,3,-1.],[14,7,1,3,2.]],threshold:6.8672042107209563e-004,right_val:0.4242413043975830,left_val:0.5452876091003418},{features:[[5,4,1,3,-1.],[5,5,1,1,3.]],threshold:5.6019669864326715e-004,right_val:0.5601285099983215,left_val:0.4398862123489380},{features:[[13,4,2,3,-1.],[13,5,2,1,3.]],threshold:2.4143769405782223e-003,right_val:0.6136621832847595,left_val:0.4741686880588532},{features:[[5,4,2,3,-1.],[5,5,2,1,3.]],threshold:-1.5680900542065501e-003,right_val:0.4516409933567047,left_val:0.6044552922248840},{features:[[9,8,2,3,-1.],[9,9,2,1,3.]],threshold:-3.6827491130679846e-003,right_val:0.5294982194900513,left_val:0.2452459037303925},{features:[[8,9,2,2,-1.],[8,10,2,1,2.]],threshold:-2.9409190756268799e-004,right_val:0.5251451134681702,left_val:0.3732838034629822},{features:[[15,14,1,4,-1.],[15,16,1,2,2.]],threshold:4.2847759323194623e-004,right_val:0.4065535068511963,left_val:0.5498809814453125},{features:[[3,12,2,2,-1.],[3,13,2,1,2.]],threshold:-4.8817070201039314e-003,right_val:0.4999957084655762,left_val:0.2139908969402313},{features:[[12,15,2,2,-1.],[13,15,1,1,2.],[12,16,1,1,2.]],threshold:2.7272020815871656e-004,right_val:0.5813428759574890,left_val:0.4650287032127380},{features:[[9,13,2,2,-1.],[9,14,2,1,2.]],threshold:2.0947199664078653e-004,right_val:0.5572792887687683,left_val:0.4387486875057221},{features:[[4,11,14,9,-1.],[4,14,14,3,3.]],threshold:0.0485011897981167,right_val:0.3212889134883881,left_val:0.5244972705841065},{features:[[7,13,4,3,-1.],[7,14,4,1,3.]],threshold:-4.5166411437094212e-003,right_val:0.4545882046222687,left_val:0.6056813001632690},{features:[[15,14,1,4,-1.],[15,16,1,2,2.]],threshold:-0.0122916800901294,right_val:0.5152214169502258,left_val:0.2040929049253464},{features:[[4,14,1,4,-1.],[4,16,1,2,2.]],threshold:4.8549679922871292e-004,right_val:0.3739503026008606,left_val:0.5237604975700378},{features:[[14,0,6,13,-1.],[16,0,2,13,3.]],threshold:0.0305560491979122,right_val:0.5938246250152588,left_val:0.4960533976554871},{features:[[4,1,2,12,-1.],[4,1,1,6,2.],[5,7,1,6,2.]],threshold:-1.5105320198927075e-004,right_val:0.4145204126834869,left_val:0.5351303815841675},{features:[[11,14,6,6,-1.],[14,14,3,3,2.],[11,17,3,3,2.]],threshold:2.4937440175563097e-003,right_val:0.5514941215515137,left_val:0.4693366885185242},{features:[[3,14,6,6,-1.],[3,14,3,3,2.],[6,17,3,3,2.]],threshold:-0.0123821301385760,right_val:0.4681667983531952,left_val:0.6791396737098694},{features:[[14,17,3,2,-1.],[14,18,3,1,2.]],threshold:-5.1333461888134480e-003,right_val:0.5229160189628601,left_val:0.3608739078044891},{features:[[3,17,3,2,-1.],[3,18,3,1,2.]],threshold:5.1919277757406235e-004,right_val:0.3633613884449005,left_val:0.5300073027610779},{features:[[14,0,6,13,-1.],[16,0,2,13,3.]],threshold:0.1506042033433914,right_val:0.2211782038211823,left_val:0.5157316923141480},{features:[[0,0,6,13,-1.],[2,0,2,13,3.]],threshold:7.7144149690866470e-003,right_val:0.5776609182357788,left_val:0.4410496950149536},{features:[[10,10,7,6,-1.],[10,12,7,2,3.]],threshold:9.4443522393703461e-003,right_val:0.3756650090217590,left_val:0.5401855111122131},{features:[[6,15,2,2,-1.],[6,15,1,1,2.],[7,16,1,1,2.]],threshold:2.5006249779835343e-004,right_val:0.5607374906539917,left_val:0.4368270933628082},{features:[[6,11,8,6,-1.],[10,11,4,3,2.],[6,14,4,3,2.]],threshold:-3.3077150583267212e-003,right_val:0.5518230795860291,left_val:0.4244799017906189},{features:[[7,6,2,2,-1.],[7,6,1,1,2.],[8,7,1,1,2.]],threshold:7.4048910755664110e-004,right_val:0.5900576710700989,left_val:0.4496962130069733},{features:[[2,2,16,6,-1.],[10,2,8,3,2.],[2,5,8,3,2.]],threshold:0.0440920516848564,right_val:0.3156355023384094,left_val:0.5293493270874023},{features:[[5,4,3,3,-1.],[5,5,3,1,3.]],threshold:3.3639909233897924e-003,right_val:0.5848662257194519,left_val:0.4483296871185303},{features:[[11,7,3,10,-1.],[11,12,3,5,2.]],threshold:-3.9760079234838486e-003,right_val:0.5483639240264893,left_val:0.4559507071971893},{features:[[6,7,3,10,-1.],[6,12,3,5,2.]],threshold:2.7716930489987135e-003,right_val:0.3792484104633331,left_val:0.5341786146163940},{features:[[10,7,3,2,-1.],[11,7,1,2,3.]],threshold:-2.4123019829858094e-004,right_val:0.4576973021030426,left_val:0.5667188763618469},{features:[[8,12,4,2,-1.],[8,13,4,1,2.]],threshold:4.9425667384639382e-004,right_val:0.5628787279129028,left_val:0.4421244859695435},{features:[[10,1,1,3,-1.],[10,2,1,1,3.]],threshold:-3.8876468897797167e-004,right_val:0.5391063094139099,left_val:0.4288370907306671},{features:[[1,2,4,18,-1.],[1,2,2,9,2.],[3,11,2,9,2.]],threshold:-0.0500488989055157,right_val:0.4703742861747742,left_val:0.6899513006210327},{features:[[12,4,4,12,-1.],[12,10,4,6,2.]],threshold:-0.0366354808211327,right_val:0.5191826224327087,left_val:0.2217779010534287},{features:[[0,0,1,6,-1.],[0,2,1,2,3.]],threshold:2.4273579474538565e-003,right_val:0.3497397899627686,left_val:0.5136224031448364},{features:[[9,11,2,3,-1.],[9,12,2,1,3.]],threshold:1.9558030180633068e-003,right_val:0.6408380866050720,left_val:0.4826192855834961},{features:[[8,7,4,3,-1.],[8,8,4,1,3.]],threshold:-1.7494610510766506e-003,right_val:0.5272685289382935,left_val:0.3922835886478424},{features:[[10,7,3,2,-1.],[11,7,1,2,3.]],threshold:0.0139550799503922,right_val:0.8416504859924316,left_val:0.5078201889991760},{features:[[7,7,3,2,-1.],[8,7,1,2,3.]],threshold:-2.1896739781368524e-004,right_val:0.4314234852790833,left_val:0.5520489811897278},{features:[[9,4,6,1,-1.],[11,4,2,1,3.]],threshold:-1.5131309628486633e-003,right_val:0.5382571220397949,left_val:0.3934605121612549},{features:[[8,7,2,3,-1.],[9,7,1,3,2.]],threshold:-4.3622800149023533e-003,right_val:0.4736475944519043,left_val:0.7370628714561462},{features:[[12,7,8,6,-1.],[16,7,4,3,2.],[12,10,4,3,2.]],threshold:0.0651605874300003,right_val:0.3281595110893250,left_val:0.5159279704093933},{features:[[0,7,8,6,-1.],[0,7,4,3,2.],[4,10,4,3,2.]],threshold:-2.3567399475723505e-003,right_val:0.5172886252403259,left_val:0.3672826886177063},{features:[[18,2,2,10,-1.],[19,2,1,5,2.],[18,7,1,5,2.]],threshold:0.0151466596871614,right_val:0.6687604188919067,left_val:0.5031493902206421},{features:[[0,2,6,4,-1.],[3,2,3,4,2.]],threshold:-0.0228509604930878,right_val:0.4709596931934357,left_val:0.6767519712448120},{features:[[9,4,6,1,-1.],[11,4,2,1,3.]],threshold:4.8867650330066681e-003,right_val:0.4059878885746002,left_val:0.5257998108863831},{features:[[7,15,2,2,-1.],[7,15,1,1,2.],[8,16,1,1,2.]],threshold:1.7619599821045995e-003,right_val:0.6688278913497925,left_val:0.4696272909641266},{features:[[11,13,1,6,-1.],[11,16,1,3,2.]],threshold:-1.2942519970238209e-003,right_val:0.5344281792640686,left_val:0.4320712983608246},{features:[[8,13,1,6,-1.],[8,16,1,3,2.]],threshold:0.0109299495816231,right_val:0.1637486070394516,left_val:0.4997706115245819},{features:[[14,3,2,1,-1.],[14,3,1,1,2.]],threshold:2.9958489903947338e-005,right_val:0.5633224248886108,left_val:0.4282417893409729},{features:[[8,15,2,3,-1.],[8,16,2,1,3.]],threshold:-6.5884361974895000e-003,right_val:0.4700526893138886,left_val:0.6772121191024780},{features:[[12,15,7,4,-1.],[12,17,7,2,2.]],threshold:3.2527779694646597e-003,right_val:0.4536148905754089,left_val:0.5313397049903870},{features:[[4,14,12,3,-1.],[4,15,12,1,3.]],threshold:-4.0435739792883396e-003,right_val:0.4413388967514038,left_val:0.5660061836242676},{features:[[10,3,3,2,-1.],[11,3,1,2,3.]],threshold:-1.2523540062829852e-003,right_val:0.5356451869010925,left_val:0.3731913864612579},{features:[[4,12,2,2,-1.],[4,13,2,1,2.]],threshold:1.9246719602961093e-004,right_val:0.3738811016082764,left_val:0.5189986228942871},{features:[[10,11,4,6,-1.],[10,14,4,3,2.]],threshold:-0.0385896712541580,right_val:0.5188810825347900,left_val:0.2956373989582062},{features:[[7,13,2,2,-1.],[7,13,1,1,2.],[8,14,1,1,2.]],threshold:1.5489870565943420e-004,right_val:0.5509533286094666,left_val:0.4347135126590729},{features:[[4,11,14,4,-1.],[11,11,7,2,2.],[4,13,7,2,2.]],threshold:-0.0337638482451439,right_val:0.5195475816726685,left_val:0.3230330049991608},{features:[[1,18,18,2,-1.],[7,18,6,2,3.]],threshold:-8.2657067105174065e-003,right_val:0.4552114009857178,left_val:0.5975489020347595},{features:[[11,18,2,2,-1.],[12,18,1,1,2.],[11,19,1,1,2.]],threshold:1.4481440302915871e-005,right_val:0.5497426986694336,left_val:0.4745678007602692},{features:[[7,18,2,2,-1.],[7,18,1,1,2.],[8,19,1,1,2.]],threshold:1.4951299817766994e-005,right_val:0.5480644106864929,left_val:0.4324473142623901},{features:[[12,18,8,2,-1.],[12,19,8,1,2.]],threshold:-0.0187417995184660,right_val:0.5178533196449280,left_val:0.1580052971839905},{features:[[7,14,6,2,-1.],[7,15,6,1,2.]],threshold:1.7572239739820361e-003,right_val:0.5773764252662659,left_val:0.4517636895179749},{features:[[8,12,4,8,-1.],[10,12,2,4,2.],[8,16,2,4,2.]],threshold:-3.1391119118779898e-003,right_val:0.5460842251777649,left_val:0.4149647951126099},{features:[[4,9,3,3,-1.],[4,10,3,1,3.]],threshold:6.6656779381446540e-005,right_val:0.5293084979057312,left_val:0.4039090871810913},{features:[[7,10,6,2,-1.],[9,10,2,2,3.]],threshold:6.7743421532213688e-003,right_val:0.6121956110000610,left_val:0.4767651855945587},{features:[[5,0,4,15,-1.],[7,0,2,15,2.]],threshold:-7.3868161998689175e-003,right_val:0.5187280774116516,left_val:0.3586258888244629},{features:[[8,6,12,14,-1.],[12,6,4,14,3.]],threshold:0.0140409301966429,right_val:0.5576155781745911,left_val:0.4712139964103699},{features:[[5,16,3,3,-1.],[5,17,3,1,3.]],threshold:-5.5258329957723618e-003,right_val:0.5039281249046326,left_val:0.2661027014255524},{features:[[8,1,12,19,-1.],[12,1,4,19,3.]],threshold:0.3868423998355866,right_val:0.2525899112224579,left_val:0.5144339799880981},{features:[[3,0,3,2,-1.],[3,1,3,1,2.]],threshold:1.1459240340627730e-004,right_val:0.5423371195793152,left_val:0.4284994900226593},{features:[[10,12,4,5,-1.],[10,12,2,5,2.]],threshold:-0.0184675697237253,right_val:0.5213062167167664,left_val:0.3885835111141205},{features:[[6,12,4,5,-1.],[8,12,2,5,2.]],threshold:-4.5907011372037232e-004,right_val:0.4235909879207611,left_val:0.5412563085556030},{features:[[11,11,2,2,-1.],[12,11,1,1,2.],[11,12,1,1,2.]],threshold:1.2527540093287826e-003,right_val:0.6624091267585754,left_val:0.4899305105209351},{features:[[0,2,3,6,-1.],[0,4,3,2,3.]],threshold:1.4910609461367130e-003,right_val:0.4040051996707916,left_val:0.5286778211593628},{features:[[11,11,2,2,-1.],[12,11,1,1,2.],[11,12,1,1,2.]],threshold:-7.5435562757775187e-004,right_val:0.4795120060443878,left_val:0.6032990217208862},{features:[[7,6,4,10,-1.],[7,11,4,5,2.]],threshold:-6.9478838704526424e-003,right_val:0.5373504161834717,left_val:0.4084401130676270},{features:[[11,11,2,2,-1.],[12,11,1,1,2.],[11,12,1,1,2.]],threshold:2.8092920547351241e-004,right_val:0.5759382247924805,left_val:0.4846062958240509},{features:[[2,13,5,2,-1.],[2,14,5,1,2.]],threshold:9.6073717577382922e-004,right_val:0.3554979860782623,left_val:0.5164741277694702},{features:[[11,11,2,2,-1.],[12,11,1,1,2.],[11,12,1,1,2.]],threshold:-2.6883929967880249e-004,right_val:0.4731765985488892,left_val:0.5677582025527954},{features:[[7,11,2,2,-1.],[7,11,1,1,2.],[8,12,1,1,2.]],threshold:2.1599370520561934e-003,right_val:0.7070567011833191,left_val:0.4731487035751343},{features:[[14,13,3,3,-1.],[14,14,3,1,3.]],threshold:5.6235301308333874e-003,right_val:0.2781791985034943,left_val:0.5240243077278137},{features:[[3,13,3,3,-1.],[3,14,3,1,3.]],threshold:-5.0243991427123547e-003,right_val:0.5062304139137268,left_val:0.2837013900279999},{features:[[9,14,2,3,-1.],[9,15,2,1,3.]],threshold:-9.7611639648675919e-003,right_val:0.4934569001197815,left_val:0.7400717735290527},{features:[[8,7,3,3,-1.],[8,8,3,1,3.]],threshold:4.1515100747346878e-003,right_val:0.3407008051872253,left_val:0.5119131207466126},{features:[[13,5,3,3,-1.],[13,6,3,1,3.]],threshold:6.2465080991387367e-003,right_val:0.6579058766365051,left_val:0.4923788011074066},{features:[[0,9,5,3,-1.],[0,10,5,1,3.]],threshold:-7.0597478188574314e-003,right_val:0.5032842159271240,left_val:0.2434711009263992},{features:[[13,5,3,3,-1.],[13,6,3,1,3.]],threshold:-2.0587709732353687e-003,right_val:0.4695087075233460,left_val:0.5900310873985291},{features:[[9,12,2,8,-1.],[9,12,1,4,2.],[10,16,1,4,2.]],threshold:-2.4146060459315777e-003,right_val:0.5189201831817627,left_val:0.3647317886352539},{features:[[11,7,2,2,-1.],[12,7,1,1,2.],[11,8,1,1,2.]],threshold:-1.4817609917372465e-003,right_val:0.4940128028392792,left_val:0.6034948229789734},{features:[[0,16,6,4,-1.],[3,16,3,4,2.]],threshold:-6.3016400672495365e-003,right_val:0.4560427963733673,left_val:0.5818989872932434},{features:[[10,6,2,3,-1.],[10,7,2,1,3.]],threshold:3.4763428848236799e-003,right_val:0.3483993113040924,left_val:0.5217475891113281},{features:[[9,5,2,6,-1.],[9,7,2,2,3.]],threshold:-0.0222508702427149,right_val:0.5032082796096802,left_val:0.2360700070858002},{features:[[12,15,8,4,-1.],[12,15,4,4,2.]],threshold:-0.0306125506758690,right_val:0.4914919137954712,left_val:0.6499186754226685},{features:[[0,14,8,6,-1.],[4,14,4,6,2.]],threshold:0.0130574796348810,right_val:0.5683764219284058,left_val:0.4413323104381561},{features:[[9,0,3,2,-1.],[10,0,1,2,3.]],threshold:-6.0095742810517550e-004,right_val:0.5333483219146729,left_val:0.4359731078147888},{features:[[4,15,4,2,-1.],[6,15,2,2,2.]],threshold:-4.1514250915497541e-004,right_val:0.4326060116291046,left_val:0.5504062771797180},{features:[[12,7,3,13,-1.],[13,7,1,13,3.]],threshold:-0.0137762902304530,right_val:0.5201548933982849,left_val:0.4064112901687622},{features:[[5,7,3,13,-1.],[6,7,1,13,3.]],threshold:-0.0322965085506439,right_val:0.4977194964885712,left_val:0.0473519712686539},{features:[[9,6,3,9,-1.],[9,9,3,3,3.]],threshold:0.0535569787025452,right_val:0.6666939258575440,left_val:0.4881733059883118},{features:[[4,4,7,12,-1.],[4,10,7,6,2.]],threshold:8.1889545544981956e-003,right_val:0.4240820109844208,left_val:0.5400037169456482},{features:[[12,12,2,2,-1.],[13,12,1,1,2.],[12,13,1,1,2.]],threshold:2.1055320394225419e-004,right_val:0.5563852787017822,left_val:0.4802047908306122},{features:[[6,12,2,2,-1.],[6,12,1,1,2.],[7,13,1,1,2.]],threshold:-2.4382730480283499e-003,right_val:0.4773685038089752,left_val:0.7387793064117432},{features:[[8,9,4,2,-1.],[10,9,2,1,2.],[8,10,2,1,2.]],threshold:3.2835570164024830e-003,right_val:0.3171291947364807,left_val:0.5288546085357666},{features:[[3,6,2,2,-1.],[3,6,1,1,2.],[4,7,1,1,2.]],threshold:2.3729570675641298e-003,right_val:0.7060170769691467,left_val:0.4750812947750092},{features:[[16,6,3,2,-1.],[16,7,3,1,2.]],threshold:-1.4541699783876538e-003,right_val:0.5330739021301270,left_val:0.3811730146408081}],threshold:79.2490768432617190},{simpleClassifiers:[{features:[[0,7,19,4,-1.],[0,9,19,2,2.]],threshold:0.0557552389800549,right_val:0.6806036829948425,left_val:0.4019156992435455},{features:[[10,2,10,1,-1.],[10,2,5,1,2.]],threshold:2.4730248842388391e-003,right_val:0.5965719819068909,left_val:0.3351148962974548},{features:[[9,4,2,12,-1.],[9,10,2,6,2.]],threshold:-3.5031698644161224e-004,right_val:0.3482286930084229,left_val:0.5557708144187927},{features:[[12,18,4,1,-1.],[12,18,2,1,2.]],threshold:5.4167630150914192e-004,right_val:0.5693380832672119,left_val:0.4260858893394470},{features:[[1,7,6,4,-1.],[1,7,3,2,2.],[4,9,3,2,2.]],threshold:7.7193678589537740e-004,right_val:0.5433688759803772,left_val:0.3494240045547485},{features:[[12,0,6,13,-1.],[14,0,2,13,3.]],threshold:-1.5999219613149762e-003,right_val:0.5484359264373779,left_val:0.4028499126434326},{features:[[2,0,6,13,-1.],[4,0,2,13,3.]],threshold:-1.1832080053864047e-004,right_val:0.5425465106964111,left_val:0.3806901872158051},{features:[[10,5,8,8,-1.],[10,9,8,4,2.]],threshold:3.2909031142480671e-004,right_val:0.5429521799087524,left_val:0.2620100080966950},{features:[[8,3,2,5,-1.],[9,3,1,5,2.]],threshold:2.9518108931370080e-004,right_val:0.5399264097213745,left_val:0.3799768984317780},{features:[[8,4,9,1,-1.],[11,4,3,1,3.]],threshold:9.0466710389591753e-005,right_val:0.5440226197242737,left_val:0.4433645009994507},{features:[[3,4,9,1,-1.],[6,4,3,1,3.]],threshold:1.5007190086180344e-005,right_val:0.5409119725227356,left_val:0.3719654977321625},{features:[[1,0,18,10,-1.],[7,0,6,10,3.]],threshold:0.1393561065196991,right_val:0.4479042887687683,left_val:0.5525395870208740},{features:[[7,17,5,3,-1.],[7,18,5,1,3.]],threshold:1.6461990308016539e-003,right_val:0.5772169828414917,left_val:0.4264501035213471},{features:[[7,11,6,1,-1.],[9,11,2,1,3.]],threshold:4.9984431825578213e-004,right_val:0.5685871243476868,left_val:0.4359526038169861},{features:[[2,2,3,2,-1.],[2,3,3,1,2.]],threshold:-1.0971280280500650e-003,right_val:0.5205408930778503,left_val:0.3390136957168579},{features:[[8,12,4,2,-1.],[8,13,4,1,2.]],threshold:6.6919892560690641e-004,right_val:0.5980659723281860,left_val:0.4557456076145172},{features:[[6,10,3,6,-1.],[6,13,3,3,2.]],threshold:8.6471042595803738e-004,right_val:0.2944033145904541,left_val:0.5134841203689575},{features:[[11,4,2,4,-1.],[11,4,1,4,2.]],threshold:-2.7182599296793342e-004,right_val:0.5377181172370911,left_val:0.3906578123569489},{features:[[7,4,2,4,-1.],[8,4,1,4,2.]],threshold:3.0249499104684219e-005,right_val:0.5225688815116882,left_val:0.3679609894752502},{features:[[9,6,2,4,-1.],[9,6,1,4,2.]],threshold:-8.5225896909832954e-003,right_val:0.4892365038394928,left_val:0.7293102145195007},{features:[[6,13,8,3,-1.],[6,14,8,1,3.]],threshold:1.6705560265108943e-003,right_val:0.5696138143539429,left_val:0.4345324933528900},{features:[[9,15,3,4,-1.],[10,15,1,4,3.]],threshold:-7.1433838456869125e-003,right_val:0.5225623846054077,left_val:0.2591280043125153},{features:[[9,2,2,17,-1.],[10,2,1,17,2.]],threshold:-0.0163193698972464,right_val:0.4651575982570648,left_val:0.6922279000282288},{features:[[7,0,6,1,-1.],[9,0,2,1,3.]],threshold:4.8034260980784893e-003,right_val:0.3286302983760834,left_val:0.5352262854576111},{features:[[8,15,3,4,-1.],[9,15,1,4,3.]],threshold:-7.5421929359436035e-003,right_val:0.5034546256065369,left_val:0.2040544003248215},{features:[[7,13,7,3,-1.],[7,14,7,1,3.]],threshold:-0.0143631100654602,right_val:0.4889059066772461,left_val:0.6804888844490051},{features:[[8,16,3,3,-1.],[9,16,1,3,3.]],threshold:8.9063588529825211e-004,right_val:0.3895480930805206,left_val:0.5310695767402649},{features:[[6,2,8,10,-1.],[6,7,8,5,2.]],threshold:-4.4060191139578819e-003,right_val:0.4372426867485046,left_val:0.5741562843322754},{features:[[2,5,8,8,-1.],[2,9,8,4,2.]],threshold:-1.8862540309783071e-004,right_val:0.5098205208778381,left_val:0.2831785976886749},{features:[[14,16,2,2,-1.],[14,17,2,1,2.]],threshold:-3.7979281041771173e-003,right_val:0.5246580243110657,left_val:0.3372507989406586},{features:[[4,16,2,2,-1.],[4,17,2,1,2.]],threshold:1.4627049677073956e-004,right_val:0.3911710083484650,left_val:0.5306674242019653},{features:[[10,11,4,6,-1.],[10,14,4,3,2.]],threshold:-4.9164638767251745e-005,right_val:0.3942720890045166,left_val:0.5462496280670166},{features:[[6,11,4,6,-1.],[6,14,4,3,2.]],threshold:-0.0335825011134148,right_val:0.5048211812973023,left_val:0.2157824039459229},{features:[[10,14,1,3,-1.],[10,15,1,1,3.]],threshold:-3.5339309833943844e-003,right_val:0.4872696995735169,left_val:0.6465312242507935},{features:[[8,14,4,3,-1.],[8,15,4,1,3.]],threshold:5.0144111737608910e-003,right_val:0.6248074769973755,left_val:0.4617668092250824},{features:[[10,0,4,6,-1.],[12,0,2,3,2.],[10,3,2,3,2.]],threshold:0.0188173707574606,right_val:0.2000052034854889,left_val:0.5220689177513123},{features:[[0,3,20,2,-1.],[0,4,20,1,2.]],threshold:-1.3434339780360460e-003,right_val:0.5301619768142700,left_val:0.4014537930488586},{features:[[12,0,8,2,-1.],[16,0,4,1,2.],[12,1,4,1,2.]],threshold:1.7557960236445069e-003,right_val:0.5653169751167297,left_val:0.4794039130210877},{features:[[2,12,10,8,-1.],[2,16,10,4,2.]],threshold:-0.0956374630331993,right_val:0.5006706714630127,left_val:0.2034195065498352},{features:[[17,7,2,10,-1.],[18,7,1,5,2.],[17,12,1,5,2.]],threshold:-0.0222412291914225,right_val:0.5046340227127075,left_val:0.7672473192214966},{features:[[1,7,2,10,-1.],[1,7,1,5,2.],[2,12,1,5,2.]],threshold:-0.0155758196488023,right_val:0.4755851030349731,left_val:0.7490342259407044},{features:[[15,10,3,6,-1.],[15,12,3,2,3.]],threshold:5.3599118255078793e-003,right_val:0.4004670977592468,left_val:0.5365303754806519},{features:[[4,4,6,2,-1.],[6,4,2,2,3.]],threshold:-0.0217634998261929,right_val:0.4964174926280975,left_val:0.0740154981613159},{features:[[0,5,20,6,-1.],[0,7,20,2,3.]],threshold:-0.1656159013509750,right_val:0.5218086242675781,left_val:0.2859103083610535},{features:[[0,0,8,2,-1.],[0,0,4,1,2.],[4,1,4,1,2.]],threshold:1.6461320046801120e-004,right_val:0.5380793213844299,left_val:0.4191615879535675},{features:[[1,0,18,4,-1.],[7,0,6,4,3.]],threshold:-8.9077502489089966e-003,right_val:0.4877404868602753,left_val:0.6273192763328552},{features:[[1,13,6,2,-1.],[1,14,6,1,2.]],threshold:8.6346449097618461e-004,right_val:0.3671025931835175,left_val:0.5159940719604492},{features:[[10,8,3,4,-1.],[11,8,1,4,3.]],threshold:-1.3751760125160217e-003,right_val:0.4579083919525147,left_val:0.5884376764297485},{features:[[6,1,6,1,-1.],[8,1,2,1,3.]],threshold:-1.4081239933148026e-003,right_val:0.5139945149421692,left_val:0.3560509979724884},{features:[[8,14,4,3,-1.],[8,15,4,1,3.]],threshold:-3.9342888630926609e-003,right_val:0.4664272069931030,left_val:0.5994288921356201},{features:[[1,6,18,2,-1.],[10,6,9,2,2.]],threshold:-0.0319669283926487,right_val:0.5144183039665222,left_val:0.3345462083816528},{features:[[15,11,1,2,-1.],[15,12,1,1,2.]],threshold:-1.5089280168467667e-005,right_val:0.4414057135581970,left_val:0.5582656264305115},{features:[[6,5,1,2,-1.],[6,6,1,1,2.]],threshold:5.1994470413774252e-004,right_val:0.6168993711471558,left_val:0.4623680114746094},{features:[[13,4,1,3,-1.],[13,5,1,1,3.]],threshold:-3.4220460802316666e-003,right_val:0.4974805116653442,left_val:0.6557074785232544},{features:[[2,15,1,2,-1.],[2,16,1,1,2.]],threshold:1.7723299970384687e-004,right_val:0.3901908099651337,left_val:0.5269501805305481},{features:[[12,4,4,3,-1.],[12,5,4,1,3.]],threshold:1.5716759953647852e-003,right_val:0.5790457725524902,left_val:0.4633373022079468},{features:[[0,0,7,3,-1.],[0,1,7,1,3.]],threshold:-8.9041329920291901e-003,right_val:0.5053591132164002,left_val:0.2689608037471771},{features:[[9,12,6,2,-1.],[9,12,3,2,2.]],threshold:4.0677518700249493e-004,right_val:0.4329898953437805,left_val:0.5456603169441223},{features:[[5,4,2,3,-1.],[5,5,2,1,3.]],threshold:6.7604780197143555e-003,right_val:0.6689761877059937,left_val:0.4648993909358978},{features:[[18,4,2,3,-1.],[18,5,2,1,3.]],threshold:2.9100088868290186e-003,right_val:0.3377839922904968,left_val:0.5309703946113586},{features:[[3,0,8,6,-1.],[3,2,8,2,3.]],threshold:1.3885459629818797e-003,right_val:0.5349133014678955,left_val:0.4074738919734955},{features:[[0,2,20,6,-1.],[10,2,10,3,2.],[0,5,10,3,2.]],threshold:-0.0767642632126808,right_val:0.5228242278099060,left_val:0.1992176026105881},{features:[[4,7,2,4,-1.],[5,7,1,4,2.]],threshold:-2.2688310127705336e-004,right_val:0.4253072142601013,left_val:0.5438501834869385},{features:[[3,10,15,2,-1.],[8,10,5,2,3.]],threshold:-6.3094152137637138e-003,right_val:0.5378909707069397,left_val:0.4259178936481476},{features:[[3,0,12,11,-1.],[9,0,6,11,2.]],threshold:-0.1100727990269661,right_val:0.4721749126911163,left_val:0.6904156804084778},{features:[[13,0,2,6,-1.],[13,0,1,6,2.]],threshold:2.8619659133255482e-004,right_val:0.5548306107521057,left_val:0.4524914920330048},{features:[[0,19,2,1,-1.],[1,19,1,1,2.]],threshold:2.9425329557852820e-005,right_val:0.4236463904380798,left_val:0.5370373725891113},{features:[[16,10,4,10,-1.],[18,10,2,5,2.],[16,15,2,5,2.]],threshold:-0.0248865708708763,right_val:0.4969303905963898,left_val:0.6423557996749878},{features:[[4,8,10,3,-1.],[4,9,10,1,3.]],threshold:0.0331488512456417,right_val:0.1613811999559403,left_val:0.4988475143909454},{features:[[14,12,3,3,-1.],[14,13,3,1,3.]],threshold:7.8491691965609789e-004,right_val:0.4223009049892426,left_val:0.5416026115417481},{features:[[0,10,4,10,-1.],[0,10,2,5,2.],[2,15,2,5,2.]],threshold:4.7087189741432667e-003,right_val:0.6027557849884033,left_val:0.4576328992843628},{features:[[18,3,2,6,-1.],[18,5,2,2,3.]],threshold:2.4144479539245367e-003,right_val:0.4422498941421509,left_val:0.5308973193168640},{features:[[6,6,1,3,-1.],[6,7,1,1,3.]],threshold:1.9523180089890957e-003,right_val:0.6663324832916260,left_val:0.4705634117126465},{features:[[7,7,7,2,-1.],[7,8,7,1,2.]],threshold:1.3031980488449335e-003,right_val:0.5526962280273438,left_val:0.4406126141548157},{features:[[0,3,2,6,-1.],[0,5,2,2,3.]],threshold:4.4735497795045376e-003,right_val:0.3301498889923096,left_val:0.5129023790359497},{features:[[11,1,3,1,-1.],[12,1,1,1,3.]],threshold:-2.6652868837118149e-003,right_val:0.5175036191940308,left_val:0.3135471045970917},{features:[[5,0,2,6,-1.],[6,0,1,6,2.]],threshold:1.3666770246345550e-004,right_val:0.5306876897811890,left_val:0.4119370877742767},{features:[[1,1,18,14,-1.],[7,1,6,14,3.]],threshold:-0.0171264503151178,right_val:0.4836578965187073,left_val:0.6177806258201599},{features:[[4,6,8,3,-1.],[8,6,4,3,2.]],threshold:-2.6601430727168918e-004,right_val:0.5169736742973328,left_val:0.3654330968856812},{features:[[9,12,6,2,-1.],[9,12,3,2,2.]],threshold:-0.0229323804378510,right_val:0.5163992047309876,left_val:0.3490915000438690},{features:[[5,12,6,2,-1.],[8,12,3,2,2.]],threshold:2.3316550068557262e-003,right_val:0.3709389865398407,left_val:0.5166299939155579},{features:[[10,7,3,5,-1.],[11,7,1,5,3.]],threshold:0.0169256608933210,right_val:0.8053988218307495,left_val:0.5014736056327820},{features:[[7,7,3,5,-1.],[8,7,1,5,3.]],threshold:-8.9858826249837875e-003,right_val:0.4657020866870880,left_val:0.6470788717269898},{features:[[13,0,3,10,-1.],[14,0,1,10,3.]],threshold:-0.0118746999651194,right_val:0.5258755087852478,left_val:0.3246378898620606},{features:[[4,11,3,2,-1.],[4,12,3,1,2.]],threshold:1.9350569345988333e-004,right_val:0.3839643895626068,left_val:0.5191941857337952},{features:[[17,3,3,6,-1.],[18,3,1,6,3.]],threshold:5.8713490143418312e-003,right_val:0.6187043190002441,left_val:0.4918133914470673},{features:[[1,8,18,10,-1.],[1,13,18,5,2.]],threshold:-0.2483879029750824,right_val:0.4988150000572205,left_val:0.1836802959442139},{features:[[13,0,3,10,-1.],[14,0,1,10,3.]],threshold:0.0122560001909733,right_val:0.3632029891014099,left_val:0.5227053761482239},{features:[[9,14,2,3,-1.],[9,15,2,1,3.]],threshold:8.3990179700776935e-004,right_val:0.5774148106575012,left_val:0.4490250051021576},{features:[[16,3,3,7,-1.],[17,3,1,7,3.]],threshold:2.5407369248569012e-003,right_val:0.5858299136161804,left_val:0.4804787039756775},{features:[[4,0,3,10,-1.],[5,0,1,10,3.]],threshold:-0.0148224299773574,right_val:0.5023537278175354,left_val:0.2521049976348877},{features:[[16,3,3,7,-1.],[17,3,1,7,3.]],threshold:-5.7973959483206272e-003,right_val:0.4853715002536774,left_val:0.5996695756912231},{features:[[0,9,1,2,-1.],[0,10,1,1,2.]],threshold:7.2662148158997297e-004,right_val:0.3671779930591583,left_val:0.5153716802597046},{features:[[18,1,2,10,-1.],[18,1,1,10,2.]],threshold:-0.0172325801104307,right_val:0.4994656145572662,left_val:0.6621719002723694},{features:[[0,1,2,10,-1.],[1,1,1,10,2.]],threshold:7.8624086454510689e-003,right_val:0.6256101727485657,left_val:0.4633395075798035},{features:[[10,16,3,4,-1.],[11,16,1,4,3.]],threshold:-4.7343620099127293e-003,right_val:0.5281885266304016,left_val:0.3615573048591614},{features:[[2,8,3,3,-1.],[3,8,1,3,3.]],threshold:8.3048478700220585e-004,right_val:0.5550957918167114,left_val:0.4442889094352722},{features:[[11,0,2,6,-1.],[12,0,1,3,2.],[11,3,1,3,2.]],threshold:7.6602199114859104e-003,right_val:0.2613354921340942,left_val:0.5162935256958008},{features:[[7,0,2,6,-1.],[7,0,1,3,2.],[8,3,1,3,2.]],threshold:-4.1048377752304077e-003,right_val:0.5019031763076782,left_val:0.2789632081985474},{features:[[16,3,3,7,-1.],[17,3,1,7,3.]],threshold:4.8512578941881657e-003,right_val:0.5661668181419373,left_val:0.4968984127044678},{features:[[1,3,3,7,-1.],[2,3,1,7,3.]],threshold:9.9896453320980072e-004,right_val:0.5551813244819641,left_val:0.4445607960224152},{features:[[14,1,6,16,-1.],[16,1,2,16,3.]],threshold:-0.2702363133430481,right_val:0.5151314139366150,left_val:0.0293882098048925},{features:[[0,1,6,16,-1.],[2,1,2,16,3.]],threshold:-0.0130906803533435,right_val:0.4447459876537323,left_val:0.5699399709701538},{features:[[2,0,16,8,-1.],[10,0,8,4,2.],[2,4,8,4,2.]],threshold:-9.4342790544033051e-003,right_val:0.5487895011901856,left_val:0.4305466115474701},{features:[[6,8,5,3,-1.],[6,9,5,1,3.]],threshold:-1.5482039889320731e-003,right_val:0.5128080844879150,left_val:0.3680317103862763},{features:[[9,7,3,3,-1.],[10,7,1,3,3.]],threshold:5.3746132180094719e-003,right_val:0.6101555824279785,left_val:0.4838916957378388},{features:[[8,8,4,3,-1.],[8,9,4,1,3.]],threshold:1.5786769799888134e-003,right_val:0.4118548035621643,left_val:0.5325223207473755},{features:[[9,6,2,4,-1.],[9,6,1,4,2.]],threshold:3.6856050137430429e-003,right_val:0.6252303123474121,left_val:0.4810948073863983},{features:[[0,7,15,1,-1.],[5,7,5,1,3.]],threshold:9.3887019902467728e-003,right_val:0.3629410862922669,left_val:0.5200229883193970},{features:[[8,2,7,9,-1.],[8,5,7,3,3.]],threshold:0.0127926301211119,right_val:0.6738016009330750,left_val:0.4961709976196289},{features:[[1,7,16,4,-1.],[1,7,8,2,2.],[9,9,8,2,2.]],threshold:-3.3661040943115950e-003,right_val:0.5283598899841309,left_val:0.4060279130935669},{features:[[6,12,8,2,-1.],[6,13,8,1,2.]],threshold:3.9771420415490866e-004,right_val:0.5900775194168091,left_val:0.4674113988876343},{features:[[8,11,3,3,-1.],[8,12,3,1,3.]],threshold:1.4868030557408929e-003,right_val:0.6082053780555725,left_val:0.4519116878509522},{features:[[4,5,14,10,-1.],[11,5,7,5,2.],[4,10,7,5,2.]],threshold:-0.0886867493391037,right_val:0.5180991888046265,left_val:0.2807899117469788},{features:[[4,12,3,2,-1.],[4,13,3,1,2.]],threshold:-7.4296112870797515e-005,right_val:0.4087625145912170,left_val:0.5295584201812744},{features:[[9,11,6,1,-1.],[11,11,2,1,3.]],threshold:-1.4932939848222304e-005,right_val:0.4538542926311493,left_val:0.5461400151252747},{features:[[4,9,7,6,-1.],[4,11,7,2,3.]],threshold:5.9162238612771034e-003,right_val:0.4192134141921997,left_val:0.5329161286354065},{features:[[7,10,6,3,-1.],[7,11,6,1,3.]],threshold:1.1141640134155750e-003,right_val:0.5706217288970947,left_val:0.4512017965316773},{features:[[9,11,2,2,-1.],[9,12,2,1,2.]],threshold:8.9249362645205110e-005,right_val:0.5897638201713562,left_val:0.4577805995941162},{features:[[0,5,20,6,-1.],[0,7,20,2,3.]],threshold:2.5319510605186224e-003,right_val:0.3357639014720917,left_val:0.5299603939056397},{features:[[6,4,6,1,-1.],[8,4,2,1,3.]],threshold:0.0124262003228068,right_val:0.1346601992845535,left_val:0.4959059059619904},{features:[[9,11,6,1,-1.],[11,11,2,1,3.]],threshold:0.0283357501029968,right_val:6.1043637106195092e-004,left_val:0.5117079019546509},{features:[[5,11,6,1,-1.],[7,11,2,1,3.]],threshold:6.6165882162749767e-003,right_val:0.7011628150939941,left_val:0.4736349880695343},{features:[[10,16,3,4,-1.],[11,16,1,4,3.]],threshold:8.0468766391277313e-003,right_val:0.3282819986343384,left_val:0.5216417908668518},{features:[[8,7,3,3,-1.],[9,7,1,3,3.]],threshold:-1.1193980462849140e-003,right_val:0.4563739001750946,left_val:0.5809860825538635},{features:[[2,12,16,8,-1.],[2,16,16,4,2.]],threshold:0.0132775902748108,right_val:0.4103901088237763,left_val:0.5398362278938294},{features:[[0,15,15,2,-1.],[0,16,15,1,2.]],threshold:4.8794739996083081e-004,right_val:0.5410590767860413,left_val:0.4249286055564880},{features:[[15,4,5,6,-1.],[15,6,5,2,3.]],threshold:0.0112431701272726,right_val:0.3438215851783752,left_val:0.5269963741302490},{features:[[9,5,2,4,-1.],[10,5,1,4,2.]],threshold:-8.9896668214350939e-004,right_val:0.4456613063812256,left_val:0.5633075833320618},{features:[[8,10,9,6,-1.],[8,12,9,2,3.]],threshold:6.6677159629762173e-003,right_val:0.4362679123878479,left_val:0.5312889218330383},{features:[[2,19,15,1,-1.],[7,19,5,1,3.]],threshold:0.0289472993463278,right_val:0.6575797796249390,left_val:0.4701794981956482},{features:[[10,16,3,4,-1.],[11,16,1,4,3.]],threshold:-0.0234000496566296,right_val:0.5137398838996887,left_val:0.},{features:[[0,15,20,4,-1.],[0,17,20,2,2.]],threshold:-0.0891170501708984,right_val:0.4942430853843689,left_val:0.0237452797591686},{features:[[10,16,3,4,-1.],[11,16,1,4,3.]],threshold:-0.0140546001493931,right_val:0.5117511153221130,left_val:0.3127323091030121},{features:[[7,16,3,4,-1.],[8,16,1,4,3.]],threshold:8.1239398568868637e-003,right_val:0.2520025968551636,left_val:0.5009049177169800},{features:[[9,16,3,3,-1.],[9,17,3,1,3.]],threshold:-4.9964650534093380e-003,right_val:0.4927811920642853,left_val:0.6387143731117249},{features:[[8,11,4,6,-1.],[8,14,4,3,2.]],threshold:3.1253970228135586e-003,right_val:0.3680452108383179,left_val:0.5136849880218506},{features:[[9,6,2,12,-1.],[9,10,2,4,3.]],threshold:6.7669642157852650e-003,right_val:0.4363631904125214,left_val:0.5509843826293945},{features:[[8,17,4,3,-1.],[8,18,4,1,3.]],threshold:-2.3711440153419971e-003,right_val:0.4586946964263916,left_val:0.6162335276603699},{features:[[9,18,8,2,-1.],[13,18,4,1,2.],[9,19,4,1,2.]],threshold:-5.3522791713476181e-003,right_val:0.4920490980148315,left_val:0.6185457706451416},{features:[[1,18,8,2,-1.],[1,19,8,1,2.]],threshold:-0.0159688591957092,right_val:0.4983252882957459,left_val:0.1382617950439453},{features:[[13,5,6,15,-1.],[15,5,2,15,3.]],threshold:4.7676060348749161e-003,right_val:0.5490046143531799,left_val:0.4688057899475098},{features:[[9,8,2,2,-1.],[9,9,2,1,2.]],threshold:-2.4714691098779440e-003,right_val:0.5003952980041504,left_val:0.2368514984846115},{features:[[9,5,2,3,-1.],[9,5,1,3,2.]],threshold:-7.1033788844943047e-004,right_val:0.4721533060073853,left_val:0.5856394171714783},{features:[[1,5,6,15,-1.],[3,5,2,15,3.]],threshold:-0.1411755979061127,right_val:0.4961591064929962,left_val:0.0869000628590584},{features:[[4,1,14,8,-1.],[11,1,7,4,2.],[4,5,7,4,2.]],threshold:0.1065180972218514,right_val:0.1741005033254623,left_val:0.5138837099075317},{features:[[2,4,4,16,-1.],[2,4,2,8,2.],[4,12,2,8,2.]],threshold:-0.0527447499334812,right_val:0.4772881865501404,left_val:0.7353636026382446},{features:[[12,4,3,12,-1.],[12,10,3,6,2.]],threshold:-4.7431760467588902e-003,right_val:0.5292701721191406,left_val:0.3884406089782715},{features:[[4,5,10,12,-1.],[4,5,5,6,2.],[9,11,5,6,2.]],threshold:9.9676765967160463e-004,right_val:0.4003424048423767,left_val:0.5223492980003357},{features:[[9,14,2,3,-1.],[9,15,2,1,3.]],threshold:8.0284131690859795e-003,right_val:0.7212964296340942,left_val:0.4959106147289276},{features:[[5,4,2,3,-1.],[5,5,2,1,3.]],threshold:8.6025858763605356e-004,right_val:0.5538476109504700,left_val:0.4444884061813355},{features:[[12,2,4,10,-1.],[14,2,2,5,2.],[12,7,2,5,2.]],threshold:9.3191501218825579e-004,right_val:0.4163244068622589,left_val:0.5398371219635010},{features:[[6,4,7,3,-1.],[6,5,7,1,3.]],threshold:-2.5082060601562262e-003,right_val:0.4562500119209290,left_val:0.5854265093803406},{features:[[2,0,18,2,-1.],[11,0,9,1,2.],[2,1,9,1,2.]],threshold:-2.1378761157393456e-003,right_val:0.5280259251594544,left_val:0.4608069062232971},{features:[[0,0,18,2,-1.],[0,0,9,1,2.],[9,1,9,1,2.]],threshold:-2.1546049974858761e-003,right_val:0.5255997180938721,left_val:0.3791126906871796},{features:[[13,13,4,6,-1.],[15,13,2,3,2.],[13,16,2,3,2.]],threshold:-7.6214009895920753e-003,right_val:0.4952073991298676,left_val:0.5998609066009522},{features:[[3,13,4,6,-1.],[3,13,2,3,2.],[5,16,2,3,2.]],threshold:2.2055360022932291e-003,right_val:0.5588530898094177,left_val:0.4484206140041351},{features:[[10,12,2,6,-1.],[10,15,2,3,2.]],threshold:1.2586950324475765e-003,right_val:0.4423840939998627,left_val:0.5450747013092041},{features:[[5,9,10,10,-1.],[5,9,5,5,2.],[10,14,5,5,2.]],threshold:-5.0926720723509789e-003,right_val:0.5263035893440247,left_val:0.4118275046348572},{features:[[11,4,4,2,-1.],[13,4,2,1,2.],[11,5,2,1,2.]],threshold:-2.5095739401876926e-003,right_val:0.4998494982719421,left_val:0.5787907838821411},{features:[[7,12,6,8,-1.],[10,12,3,8,2.]],threshold:-0.0773275569081306,right_val:0.4811120033264160,left_val:0.8397865891456604},{features:[[12,2,4,10,-1.],[14,2,2,5,2.],[12,7,2,5,2.]],threshold:-0.0414858199656010,right_val:0.5176993012428284,left_val:0.2408611029386520},{features:[[8,11,2,1,-1.],[9,11,1,1,2.]],threshold:1.0355669655837119e-004,right_val:0.5417054295539856,left_val:0.4355360865592957},{features:[[10,5,1,12,-1.],[10,9,1,4,3.]],threshold:1.3255809899419546e-003,right_val:0.4894095063209534,left_val:0.5453971028327942},{features:[[0,11,6,9,-1.],[3,11,3,9,2.]],threshold:-8.0598732456564903e-003,right_val:0.4577918946743012,left_val:0.5771024227142334},{features:[[12,2,4,10,-1.],[14,2,2,5,2.],[12,7,2,5,2.]],threshold:0.0190586205571890,right_val:0.3400475084781647,left_val:0.5169867873191834},{features:[[4,2,4,10,-1.],[4,2,2,5,2.],[6,7,2,5,2.]],threshold:-0.0350578911602497,right_val:0.5000503063201904,left_val:0.2203243970870972},{features:[[11,4,4,2,-1.],[13,4,2,1,2.],[11,5,2,1,2.]],threshold:5.7296059094369411e-003,right_val:0.6597570776939392,left_val:0.5043408274650574},{features:[[0,14,6,3,-1.],[0,15,6,1,3.]],threshold:-0.0116483299061656,right_val:0.4996652901172638,left_val:0.2186284959316254},{features:[[11,4,4,2,-1.],[13,4,2,1,2.],[11,5,2,1,2.]],threshold:1.4544479781761765e-003,right_val:0.5503727793693543,left_val:0.5007681846618652},{features:[[6,1,3,2,-1.],[7,1,1,2,3.]],threshold:-2.5030909455381334e-004,right_val:0.5241670012474060,left_val:0.4129841029644013},{features:[[11,4,4,2,-1.],[13,4,2,1,2.],[11,5,2,1,2.]],threshold:-8.2907272735610604e-004,right_val:0.4974496066570282,left_val:0.5412868261337280},{features:[[5,4,4,2,-1.],[5,4,2,1,2.],[7,5,2,1,2.]],threshold:1.0862209601327777e-003,right_val:0.5879228711128235,left_val:0.4605529904365540},{features:[[13,0,2,12,-1.],[14,0,1,6,2.],[13,6,1,6,2.]],threshold:2.0000500080641359e-004,right_val:0.4705209136009216,left_val:0.5278854966163635},{features:[[6,0,3,10,-1.],[7,0,1,10,3.]],threshold:2.9212920926511288e-003,right_val:0.3755536973476410,left_val:0.5129609704017639},{features:[[3,0,17,8,-1.],[3,4,17,4,2.]],threshold:0.0253874007612467,right_val:0.5790768265724182,left_val:0.4822691977024078},{features:[[0,4,20,4,-1.],[0,6,20,2,2.]],threshold:-3.1968469265848398e-003,right_val:0.3962840139865875,left_val:0.5248395204544067}],threshold:87.6960296630859380},{simpleClassifiers:[{features:[[0,3,8,2,-1.],[4,3,4,2,2.]],threshold:5.8031738735735416e-003,right_val:0.5961983203887940,left_val:0.3498983979225159},{features:[[8,11,4,3,-1.],[8,12,4,1,3.]],threshold:-9.0003069490194321e-003,right_val:0.4478552043437958,left_val:0.6816636919975281},{features:[[5,7,6,4,-1.],[5,7,3,2,2.],[8,9,3,2,2.]],threshold:-1.1549659539014101e-003,right_val:0.3578251004219055,left_val:0.5585706233978272},{features:[[8,3,4,9,-1.],[8,6,4,3,3.]],threshold:-1.1069850297644734e-003,right_val:0.3050428032875061,left_val:0.5365036129951477},{features:[[8,15,1,4,-1.],[8,17,1,2,2.]],threshold:1.0308309720130637e-004,right_val:0.5344635844230652,left_val:0.3639095127582550},{features:[[4,5,12,7,-1.],[8,5,4,7,3.]],threshold:-5.0984839908778667e-003,right_val:0.5504264831542969,left_val:0.2859157025814056},{features:[[4,2,4,10,-1.],[4,2,2,5,2.],[6,7,2,5,2.]],threshold:8.2572200335562229e-004,right_val:0.3476041853427887,left_val:0.5236523747444153},{features:[[3,0,17,2,-1.],[3,1,17,1,2.]],threshold:9.9783325567841530e-003,right_val:0.6219646930694580,left_val:0.4750322103500366},{features:[[2,2,16,15,-1.],[2,7,16,5,3.]],threshold:-0.0374025292694569,right_val:0.5278062820434570,left_val:0.3343375921249390},{features:[[15,2,5,2,-1.],[15,3,5,1,2.]],threshold:4.8548257909715176e-003,right_val:0.3700444102287293,left_val:0.5192180871963501},{features:[[9,3,2,2,-1.],[10,3,1,2,2.]],threshold:-1.8664470408111811e-003,right_val:0.5091944932937622,left_val:0.2929843962192535},{features:[[4,5,16,15,-1.],[4,10,16,5,3.]],threshold:0.0168888904154301,right_val:0.5431225895881653,left_val:0.3686845898628235},{features:[[7,13,5,6,-1.],[7,16,5,3,2.]],threshold:-5.8372621424496174e-003,right_val:0.5221335887908936,left_val:0.3632183969020844},{features:[[10,7,3,2,-1.],[11,7,1,2,3.]],threshold:-1.4713739510625601e-003,right_val:0.4700650870800018,left_val:0.5870683789253235},{features:[[8,3,3,1,-1.],[9,3,1,1,3.]],threshold:-1.1522950371727347e-003,right_val:0.5140954256057739,left_val:0.3195894956588745},{features:[[9,16,3,3,-1.],[9,17,3,1,3.]],threshold:-4.2560300789773464e-003,right_val:0.4814921021461487,left_val:0.6301859021186829},{features:[[0,2,5,2,-1.],[0,3,5,1,2.]],threshold:-6.7378291860222816e-003,right_val:0.5025808215141296,left_val:0.1977048069238663},{features:[[12,5,4,3,-1.],[12,6,4,1,3.]],threshold:0.0113826701417565,right_val:0.6867045760154724,left_val:0.4954132139682770},{features:[[1,7,12,1,-1.],[5,7,4,1,3.]],threshold:5.1794708706438541e-003,right_val:0.3350647985935211,left_val:0.5164427757263184},{features:[[7,5,6,14,-1.],[7,12,6,7,2.]],threshold:-0.1174378991127014,right_val:0.5234413743019104,left_val:0.2315246015787125},{features:[[0,0,8,10,-1.],[0,0,4,5,2.],[4,5,4,5,2.]],threshold:0.0287034492939711,right_val:0.6722521185874939,left_val:0.4664297103881836},{features:[[9,1,3,2,-1.],[10,1,1,2,3.]],threshold:4.8231030814349651e-003,right_val:0.2723532915115356,left_val:0.5220875144004822},{features:[[8,1,3,2,-1.],[9,1,1,2,3.]],threshold:2.6798530016094446e-003,right_val:0.2906948924064636,left_val:0.5079277157783508},{features:[[12,4,3,3,-1.],[12,5,3,1,3.]],threshold:8.0504082143306732e-003,right_val:0.6395021080970764,left_val:0.4885950982570648},{features:[[7,4,6,16,-1.],[7,12,6,8,2.]],threshold:4.8054959625005722e-003,right_val:0.3656663894653320,left_val:0.5197256803512573},{features:[[12,4,3,3,-1.],[12,5,3,1,3.]],threshold:-2.2420159075409174e-003,right_val:0.4763701856136322,left_val:0.6153467893600464},{features:[[2,3,2,6,-1.],[2,5,2,2,3.]],threshold:-0.0137577103450894,right_val:0.5030903220176697,left_val:0.2637344896793366},{features:[[14,2,6,9,-1.],[14,5,6,3,3.]],threshold:-0.1033829972147942,right_val:0.5182461142539978,left_val:0.2287521958351135},{features:[[5,4,3,3,-1.],[5,5,3,1,3.]],threshold:-9.4432085752487183e-003,right_val:0.4694949090480804,left_val:0.6953303813934326},{features:[[9,17,3,2,-1.],[10,17,1,2,3.]],threshold:8.0271181650459766e-004,right_val:0.4268783926963806,left_val:0.5450655221939087},{features:[[5,5,2,3,-1.],[5,6,2,1,3.]],threshold:-4.1945669800043106e-003,right_val:0.4571642875671387,left_val:0.6091387867927551},{features:[[13,11,3,6,-1.],[13,13,3,2,3.]],threshold:0.0109422104433179,right_val:0.3284547030925751,left_val:0.5241063237190247},{features:[[3,14,2,6,-1.],[3,17,2,3,2.]],threshold:-5.7841069065034389e-004,right_val:0.4179368913173676,left_val:0.5387929081916809},{features:[[14,3,6,2,-1.],[14,4,6,1,2.]],threshold:-2.0888620056211948e-003,right_val:0.5301715731620789,left_val:0.4292691051959992},{features:[[0,8,16,2,-1.],[0,9,16,1,2.]],threshold:3.2383969519287348e-003,right_val:0.5220744013786316,left_val:0.3792347908020020},{features:[[14,3,6,2,-1.],[14,4,6,1,2.]],threshold:4.9075027927756310e-003,right_val:0.4126757979393005,left_val:0.5237283110618591},{features:[[0,0,5,6,-1.],[0,2,5,2,3.]],threshold:-0.0322779417037964,right_val:0.4994502067565918,left_val:0.1947655975818634},{features:[[12,5,4,3,-1.],[12,6,4,1,3.]],threshold:-8.9711230248212814e-003,right_val:0.4929032027721405,left_val:0.6011285185813904},{features:[[4,11,3,6,-1.],[4,13,3,2,3.]],threshold:0.0153210898861289,right_val:0.2039822041988373,left_val:0.5009753704071045},{features:[[12,5,4,3,-1.],[12,6,4,1,3.]],threshold:2.0855569746345282e-003,right_val:0.5721694827079773,left_val:0.4862189888954163},{features:[[9,5,1,3,-1.],[9,6,1,1,3.]],threshold:5.0615021027624607e-003,right_val:0.1801805943250656,left_val:0.5000218749046326},{features:[[12,5,4,3,-1.],[12,6,4,1,3.]],threshold:-3.7174751050770283e-003,right_val:0.4897592961788178,left_val:0.5530117154121399},{features:[[6,6,8,12,-1.],[6,12,8,6,2.]],threshold:-0.0121705001220107,right_val:0.5383723974227905,left_val:0.4178605973720551},{features:[[12,5,4,3,-1.],[12,6,4,1,3.]],threshold:4.6248398721218109e-003,right_val:0.5761327147483826,left_val:0.4997169971466065},{features:[[5,12,9,2,-1.],[8,12,3,2,3.]],threshold:-2.1040429419372231e-004,right_val:0.4097681045532227,left_val:0.5331807136535645},{features:[[12,5,4,3,-1.],[12,6,4,1,3.]],threshold:-0.0146417804062366,right_val:0.5051776170730591,left_val:0.5755925178527832},{features:[[4,5,4,3,-1.],[4,6,4,1,3.]],threshold:3.3199489116668701e-003,right_val:0.6031805872917175,left_val:0.4576976895332336},{features:[[6,6,9,2,-1.],[9,6,3,2,3.]],threshold:3.7236879579722881e-003,right_val:0.5415883064270020,left_val:0.4380396902561188},{features:[[4,11,1,3,-1.],[4,12,1,1,3.]],threshold:8.2951161311939359e-004,right_val:0.3702219128608704,left_val:0.5163031816482544},{features:[[14,12,6,6,-1.],[14,12,3,6,2.]],threshold:-0.0114084901288152,right_val:0.4862565100193024,left_val:0.6072946786880493},{features:[[7,0,3,7,-1.],[8,0,1,7,3.]],threshold:-4.5320121571421623e-003,right_val:0.5088962912559509,left_val:0.3292475938796997},{features:[[9,8,3,3,-1.],[10,8,1,3,3.]],threshold:5.1276017911732197e-003,right_val:0.6122708916664124,left_val:0.4829767942428589},{features:[[8,8,3,3,-1.],[9,8,1,3,3.]],threshold:9.8583158105611801e-003,right_val:0.6556177139282227,left_val:0.4660679996013641},{features:[[5,10,11,3,-1.],[5,11,11,1,3.]],threshold:0.0369859188795090,right_val:0.1690472066402435,left_val:0.5204849243164063},{features:[[5,7,10,1,-1.],[10,7,5,1,2.]],threshold:4.6491161920130253e-003,right_val:0.3725225031375885,left_val:0.5167322158813477},{features:[[9,7,3,2,-1.],[10,7,1,2,3.]],threshold:-4.2664702050387859e-003,right_val:0.4987342953681946,left_val:0.6406493186950684},{features:[[8,7,3,2,-1.],[9,7,1,2,3.]],threshold:-4.7956590424291790e-004,right_val:0.4464873969554901,left_val:0.5897293090820313},{features:[[11,9,4,2,-1.],[11,9,2,2,2.]],threshold:3.6827160511165857e-003,right_val:0.3472662866115570,left_val:0.5441560745239258},{features:[[5,9,4,2,-1.],[7,9,2,2,2.]],threshold:-0.0100598800927401,right_val:0.5004829764366150,left_val:0.2143162935972214},{features:[[14,10,2,4,-1.],[14,12,2,2,2.]],threshold:-3.0361840617842972e-004,right_val:0.4590323865413666,left_val:0.5386424064636231},{features:[[7,7,3,2,-1.],[8,7,1,2,3.]],threshold:-1.4545479789376259e-003,right_val:0.4497095048427582,left_val:0.5751184225082398},{features:[[14,17,6,3,-1.],[14,18,6,1,3.]],threshold:1.6515209572389722e-003,right_val:0.4238520860671997,left_val:0.5421937704086304},{features:[[4,5,12,12,-1.],[4,5,6,6,2.],[10,11,6,6,2.]],threshold:-7.8468639403581619e-003,right_val:0.5258157253265381,left_val:0.4077920913696289},{features:[[6,9,8,8,-1.],[10,9,4,4,2.],[6,13,4,4,2.]],threshold:-5.1259850151836872e-003,right_val:0.5479453206062317,left_val:0.4229275882244110},{features:[[0,4,15,4,-1.],[5,4,5,4,3.]],threshold:-0.0368909612298012,right_val:0.4674678146839142,left_val:0.6596375703811646},{features:[[13,2,4,1,-1.],[13,2,2,1,2.]],threshold:2.4035639944486320e-004,right_val:0.5573202967643738,left_val:0.4251135885715485},{features:[[4,12,2,2,-1.],[4,13,2,1,2.]],threshold:-1.5150169929256663e-005,right_val:0.4074114859104157,left_val:0.5259246826171875},{features:[[8,13,4,3,-1.],[8,14,4,1,3.]],threshold:2.2108471021056175e-003,right_val:0.5886352062225342,left_val:0.4671722948551178},{features:[[9,13,2,3,-1.],[9,14,2,1,3.]],threshold:-1.1568620102480054e-003,right_val:0.4487161934375763,left_val:0.5711066126823425},{features:[[13,11,2,3,-1.],[13,12,2,1,3.]],threshold:4.9996292218565941e-003,right_val:0.2898327112197876,left_val:0.5264198184013367},{features:[[7,12,4,4,-1.],[7,12,2,2,2.],[9,14,2,2,2.]],threshold:-1.4656189596280456e-003,right_val:0.5197871923446655,left_val:0.3891738057136536},{features:[[10,11,2,2,-1.],[11,11,1,1,2.],[10,12,1,1,2.]],threshold:-1.1975039960816503e-003,right_val:0.4927955865859985,left_val:0.5795872807502747},{features:[[8,17,3,2,-1.],[9,17,1,2,3.]],threshold:-4.4954330660402775e-003,right_val:0.5012555122375488,left_val:0.2377603054046631},{features:[[10,11,2,2,-1.],[11,11,1,1,2.],[10,12,1,1,2.]],threshold:1.4997160178609192e-004,right_val:0.5617607831954956,left_val:0.4876626133918762},{features:[[0,17,6,3,-1.],[0,18,6,1,3.]],threshold:2.6391509454697371e-003,right_val:0.3765509128570557,left_val:0.5168088078498840},{features:[[10,11,2,2,-1.],[11,11,1,1,2.],[10,12,1,1,2.]],threshold:-2.9368131072260439e-004,right_val:0.4874630868434906,left_val:0.5446649193763733},{features:[[8,11,2,2,-1.],[8,11,1,1,2.],[9,12,1,1,2.]],threshold:1.4211760135367513e-003,right_val:0.6691331863403320,left_val:0.4687897861003876},{features:[[12,5,8,4,-1.],[12,5,4,4,2.]],threshold:0.0794276371598244,right_val:0.2732945978641510,left_val:0.5193443894386292},{features:[[0,5,8,4,-1.],[4,5,4,4,2.]],threshold:0.0799375027418137,right_val:0.1782083958387375,left_val:0.4971731007099152},{features:[[13,2,4,1,-1.],[13,2,2,1,2.]],threshold:0.0110892597585917,right_val:0.3209475874900818,left_val:0.5165994763374329},{features:[[3,2,4,1,-1.],[5,2,2,1,2.]],threshold:1.6560709627810866e-004,right_val:0.5307276248931885,left_val:0.4058471918106079},{features:[[10,0,4,2,-1.],[12,0,2,1,2.],[10,1,2,1,2.]],threshold:-5.3354292176663876e-003,right_val:0.5158129930496216,left_val:0.3445056974887848},{features:[[7,12,3,1,-1.],[8,12,1,1,3.]],threshold:1.1287260567769408e-003,right_val:0.6075533032417297,left_val:0.4594863057136536},{features:[[8,11,4,8,-1.],[10,11,2,4,2.],[8,15,2,4,2.]],threshold:-0.0219692196696997,right_val:0.5228595733642578,left_val:0.1680400967597961},{features:[[9,9,2,2,-1.],[9,10,2,1,2.]],threshold:-2.1775320055894554e-004,right_val:0.5215672850608826,left_val:0.3861596882343292},{features:[[3,18,15,2,-1.],[3,19,15,1,2.]],threshold:2.0200149447191507e-004,right_val:0.4363039135932922,left_val:0.5517979264259338},{features:[[2,6,2,12,-1.],[2,6,1,6,2.],[3,12,1,6,2.]],threshold:-0.0217331498861313,right_val:0.4789851009845734,left_val:0.7999460101127625},{features:[[9,8,2,3,-1.],[9,9,2,1,3.]],threshold:-8.4399932529777288e-004,right_val:0.5374773144721985,left_val:0.4085975885391235},{features:[[7,10,3,2,-1.],[8,10,1,2,3.]],threshold:-4.3895249837078154e-004,right_val:0.4366143047809601,left_val:0.5470405220985413},{features:[[11,11,3,1,-1.],[12,11,1,1,3.]],threshold:1.5092400135472417e-003,right_val:0.5842149257659912,left_val:0.4988996982574463},{features:[[6,11,3,1,-1.],[7,11,1,1,3.]],threshold:-3.5547839943319559e-003,right_val:0.4721005856990814,left_val:0.6753690242767334},{features:[[9,2,4,2,-1.],[11,2,2,1,2.],[9,3,2,1,2.]],threshold:4.8191400128416717e-004,right_val:0.4357109069824219,left_val:0.5415853857994080},{features:[[4,12,2,3,-1.],[4,13,2,1,3.]],threshold:-6.0264398343861103e-003,right_val:0.4991880953311920,left_val:0.2258509993553162},{features:[[2,1,18,3,-1.],[8,1,6,3,3.]],threshold:-0.0116681400686502,right_val:0.4927498996257782,left_val:0.6256554722785950},{features:[[5,1,4,14,-1.],[7,1,2,14,2.]],threshold:-2.8718370012938976e-003,right_val:0.5245801806449890,left_val:0.3947784900665283},{features:[[8,16,12,3,-1.],[8,16,6,3,2.]],threshold:0.0170511696487665,right_val:0.5794224143028259,left_val:0.4752511084079742},{features:[[1,17,18,3,-1.],[7,17,6,3,3.]],threshold:-0.0133520802482963,right_val:0.4544535875320435,left_val:0.6041104793548584},{features:[[9,14,2,6,-1.],[9,17,2,3,2.]],threshold:-3.9301801007241011e-004,right_val:0.5544905066490173,left_val:0.4258275926113129},{features:[[9,12,1,8,-1.],[9,16,1,4,2.]],threshold:3.0483349692076445e-003,right_val:0.3780272901058197,left_val:0.5233420133590698},{features:[[9,14,2,3,-1.],[9,15,2,1,3.]],threshold:-4.3579288758337498e-003,right_val:0.4838674068450928,left_val:0.6371889114379883},{features:[[9,6,2,12,-1.],[9,10,2,4,3.]],threshold:5.6661018170416355e-003,right_val:0.4163666069507599,left_val:0.5374705791473389},{features:[[12,9,3,3,-1.],[12,10,3,1,3.]],threshold:6.0677339206449687e-005,right_val:0.5311625003814697,left_val:0.4638795852661133},{features:[[0,1,4,8,-1.],[2,1,2,8,2.]],threshold:0.0367381609976292,right_val:0.6466524004936218,left_val:0.4688656032085419},{features:[[9,1,6,2,-1.],[12,1,3,1,2.],[9,2,3,1,2.]],threshold:8.6528137326240540e-003,right_val:0.2188657969236374,left_val:0.5204318761825562},{features:[[1,3,12,14,-1.],[1,10,12,7,2.]],threshold:-0.1537135988473892,right_val:0.4958840012550354,left_val:0.1630371958017349},{features:[[8,12,4,2,-1.],[10,12,2,1,2.],[8,13,2,1,2.]],threshold:-4.1560421232134104e-004,right_val:0.4696458876132965,left_val:0.5774459242820740},{features:[[1,9,10,2,-1.],[1,9,5,1,2.],[6,10,5,1,2.]],threshold:-1.2640169588848948e-003,right_val:0.5217198133468628,left_val:0.3977175951004028},{features:[[8,15,4,3,-1.],[8,16,4,1,3.]],threshold:-3.5473341122269630e-003,right_val:0.4808315038681030,left_val:0.6046528220176697},{features:[[6,8,8,3,-1.],[6,9,8,1,3.]],threshold:3.0019069527043030e-005,right_val:0.5228201150894165,left_val:0.3996723890304565},{features:[[9,15,5,3,-1.],[9,16,5,1,3.]],threshold:1.3113019522279501e-003,right_val:0.5765997767448425,left_val:0.4712158143520355},{features:[[8,7,4,3,-1.],[8,8,4,1,3.]],threshold:-1.3374709524214268e-003,right_val:0.5253170132637024,left_val:0.4109584987163544},{features:[[7,7,6,2,-1.],[7,8,6,1,2.]],threshold:0.0208767093718052,right_val:0.1757981926202774,left_val:0.5202993750572205},{features:[[5,7,8,2,-1.],[5,7,4,1,2.],[9,8,4,1,2.]],threshold:-7.5497948564589024e-003,right_val:0.4694975018501282,left_val:0.6566609740257263},{features:[[12,9,3,3,-1.],[12,10,3,1,3.]],threshold:0.0241885501891375,right_val:0.3370220959186554,left_val:0.5128673911094666},{features:[[4,7,4,2,-1.],[4,8,4,1,2.]],threshold:-2.9358828905969858e-003,right_val:0.4694541096687317,left_val:0.6580786705017090},{features:[[14,2,6,9,-1.],[14,5,6,3,3.]],threshold:0.0575579293072224,right_val:0.2775259912014008,left_val:0.5146445035934448},{features:[[4,9,3,3,-1.],[5,9,1,3,3.]],threshold:-1.1343370424583554e-003,right_val:0.5192667245864868,left_val:0.3836601972579956},{features:[[12,9,3,3,-1.],[12,10,3,1,3.]],threshold:0.0168169997632504,right_val:0.6177260875701904,left_val:0.5085592865943909},{features:[[0,2,6,9,-1.],[0,5,6,3,3.]],threshold:5.0535178743302822e-003,right_val:0.3684791922569275,left_val:0.5138763189315796},{features:[[17,3,3,6,-1.],[18,3,1,6,3.]],threshold:-4.5874710194766521e-003,right_val:0.4835202097892761,left_val:0.5989655256271362},{features:[[0,3,3,6,-1.],[1,3,1,6,3.]],threshold:1.6882460331544280e-003,right_val:0.5723056793212891,left_val:0.4509486854076386},{features:[[17,14,1,2,-1.],[17,15,1,1,2.]],threshold:-1.6554000321775675e-003,right_val:0.5243319272994995,left_val:0.3496770858764648},{features:[[4,9,4,3,-1.],[6,9,2,3,2.]],threshold:-0.0193738006055355,right_val:0.4968712925910950,left_val:0.1120536997914314},{features:[[12,9,3,3,-1.],[12,10,3,1,3.]],threshold:0.0103744501248002,right_val:0.4395213127136231,left_val:0.5148196816444397},{features:[[5,9,3,3,-1.],[5,10,3,1,3.]],threshold:1.4973050565458834e-004,right_val:0.5269886851310730,left_val:0.4084999859333038},{features:[[9,5,6,8,-1.],[12,5,3,4,2.],[9,9,3,4,2.]],threshold:-0.0429819300770760,right_val:0.5018504261970520,left_val:0.6394104957580566},{features:[[5,5,6,8,-1.],[5,5,3,4,2.],[8,9,3,4,2.]],threshold:8.3065936341881752e-003,right_val:0.6698353290557861,left_val:0.4707553982734680},{features:[[16,1,4,6,-1.],[16,4,4,3,2.]],threshold:-4.1285790503025055e-003,right_val:0.5323647260665894,left_val:0.4541369080543518},{features:[[1,0,6,20,-1.],[3,0,2,20,3.]],threshold:1.7399420030415058e-003,right_val:0.5439866185188294,left_val:0.4333961904048920},{features:[[12,11,3,2,-1.],[13,11,1,2,3.]],threshold:1.1739750334527344e-004,right_val:0.5543426275253296,left_val:0.4579687118530273},{features:[[5,11,3,2,-1.],[6,11,1,2,3.]],threshold:1.8585780344437808e-004,right_val:0.5426754951477051,left_val:0.4324643909931183},{features:[[9,4,6,1,-1.],[11,4,2,1,3.]],threshold:5.5587692186236382e-003,right_val:0.3550611138343811,left_val:0.5257220864295960},{features:[[0,0,8,3,-1.],[4,0,4,3,2.]],threshold:-7.9851560294628143e-003,right_val:0.4630635976791382,left_val:0.6043018102645874},{features:[[15,0,2,5,-1.],[15,0,1,5,2.]],threshold:6.0594122624024749e-004,right_val:0.5533195137977600,left_val:0.4598254859447479},{features:[[4,1,3,2,-1.],[5,1,1,2,3.]],threshold:-2.2983040253166109e-004,right_val:0.5322461128234863,left_val:0.4130752086639404},{features:[[7,0,6,15,-1.],[9,0,2,15,3.]],threshold:4.3740210821852088e-004,right_val:0.5409289002418518,left_val:0.4043039977550507},{features:[[6,11,3,1,-1.],[7,11,1,1,3.]],threshold:2.9482020181603730e-004,right_val:0.5628852248191834,left_val:0.4494963884353638},{features:[[12,0,3,4,-1.],[13,0,1,4,3.]],threshold:0.0103126596659422,right_val:0.2704316973686218,left_val:0.5177510976791382},{features:[[5,4,6,1,-1.],[7,4,2,1,3.]],threshold:-7.7241109684109688e-003,right_val:0.4980553984642029,left_val:0.1988019049167633},{features:[[12,7,3,2,-1.],[12,8,3,1,2.]],threshold:-4.6797208487987518e-003,right_val:0.5018296241760254,left_val:0.6644750237464905},{features:[[0,1,4,6,-1.],[0,4,4,3,2.]],threshold:-5.0755459815263748e-003,right_val:0.5185269117355347,left_val:0.3898304998874664},{features:[[12,7,3,2,-1.],[12,8,3,1,2.]],threshold:2.2479740437120199e-003,right_val:0.5660336017608643,left_val:0.4801808893680573},{features:[[2,16,3,3,-1.],[2,17,3,1,3.]],threshold:8.3327008178457618e-004,right_val:0.3957188129425049,left_val:0.5210919976234436},{features:[[13,8,6,10,-1.],[16,8,3,5,2.],[13,13,3,5,2.]],threshold:-0.0412793308496475,right_val:0.5007054209709168,left_val:0.6154541969299316},{features:[[0,9,5,2,-1.],[0,10,5,1,2.]],threshold:-5.0930189900100231e-004,right_val:0.5228403806686401,left_val:0.3975942134857178},{features:[[12,11,2,2,-1.],[13,11,1,1,2.],[12,12,1,1,2.]],threshold:1.2568780221045017e-003,right_val:0.5939183235168457,left_val:0.4979138076305389},{features:[[3,15,3,3,-1.],[3,16,3,1,3.]],threshold:8.0048497766256332e-003,right_val:0.1633366048336029,left_val:0.4984497129917145},{features:[[12,7,3,2,-1.],[12,8,3,1,2.]],threshold:-1.1879300000146031e-003,right_val:0.4942624866962433,left_val:0.5904964804649353},{features:[[5,7,3,2,-1.],[5,8,3,1,2.]],threshold:6.1948952497914433e-004,right_val:0.5328726172447205,left_val:0.4199557900428772},{features:[[9,5,9,9,-1.],[9,8,9,3,3.]],threshold:6.6829859279096127e-003,right_val:0.4905889034271240,left_val:0.5418602824211121},{features:[[5,0,3,7,-1.],[6,0,1,7,3.]],threshold:-3.7062340416014194e-003,right_val:0.5138000249862671,left_val:0.3725939095020294},{features:[[5,2,12,5,-1.],[9,2,4,5,3.]],threshold:-0.0397394113242626,right_val:0.5050346851348877,left_val:0.6478961110115051},{features:[[6,11,2,2,-1.],[6,11,1,1,2.],[7,12,1,1,2.]],threshold:1.4085009461268783e-003,right_val:0.6377884149551392,left_val:0.4682339131832123},{features:[[15,15,3,2,-1.],[15,16,3,1,2.]],threshold:3.9322688826359808e-004,right_val:0.4150482118129730,left_val:0.5458530187606812},{features:[[2,15,3,2,-1.],[2,16,3,1,2.]],threshold:-1.8979819724336267e-003,right_val:0.5149704217910767,left_val:0.3690159916877747},{features:[[14,12,6,8,-1.],[17,12,3,4,2.],[14,16,3,4,2.]],threshold:-0.0139704402536154,right_val:0.4811357855796814,left_val:0.6050562858581543},{features:[[2,8,15,6,-1.],[7,8,5,6,3.]],threshold:-0.1010081991553307,right_val:0.4992361962795258,left_val:0.2017080038785934},{features:[[2,2,18,17,-1.],[8,2,6,17,3.]],threshold:-0.0173469204455614,right_val:0.4899486005306244,left_val:0.5713148713111877},{features:[[5,1,4,1,-1.],[7,1,2,1,2.]],threshold:1.5619759506080300e-004,right_val:0.5392642021179199,left_val:0.4215388894081116},{features:[[5,2,12,5,-1.],[9,2,4,5,3.]],threshold:0.1343892961740494,right_val:0.3767612874507904,left_val:0.5136151909828186},{features:[[3,2,12,5,-1.],[7,2,4,5,3.]],threshold:-0.0245822407305241,right_val:0.4747906923294067,left_val:0.7027357816696167},{features:[[4,9,12,4,-1.],[10,9,6,2,2.],[4,11,6,2,2.]],threshold:-3.8553720805794001e-003,right_val:0.5427716970443726,left_val:0.4317409098148346},{features:[[5,15,6,2,-1.],[5,15,3,1,2.],[8,16,3,1,2.]],threshold:-2.3165249731391668e-003,right_val:0.4618647992610931,left_val:0.5942698717117310},{features:[[10,14,2,3,-1.],[10,15,2,1,3.]],threshold:-4.8518120311200619e-003,right_val:0.4884895086288452,left_val:0.6191568970680237},{features:[[0,13,20,2,-1.],[0,13,10,1,2.],[10,14,10,1,2.]],threshold:2.4699938949197531e-003,right_val:0.4017199873924255,left_val:0.5256664752960205},{features:[[4,9,12,8,-1.],[10,9,6,4,2.],[4,13,6,4,2.]],threshold:0.0454969592392445,right_val:0.2685773968696594,left_val:0.5237867832183838},{features:[[8,13,3,6,-1.],[8,16,3,3,2.]],threshold:-0.0203195996582508,right_val:0.4979738891124725,left_val:0.2130445986986160},{features:[[10,12,2,2,-1.],[10,13,2,1,2.]],threshold:2.6994998916052282e-004,right_val:0.5543122291564941,left_val:0.4814041852951050},{features:[[9,12,2,2,-1.],[9,12,1,1,2.],[10,13,1,1,2.]],threshold:-1.8232699949294329e-003,right_val:0.4709989130496979,left_val:0.6482579708099365},{features:[[4,11,14,4,-1.],[11,11,7,2,2.],[4,13,7,2,2.]],threshold:-6.3015790656208992e-003,right_val:0.5306236147880554,left_val:0.4581927955150604},{features:[[8,5,4,2,-1.],[8,6,4,1,2.]],threshold:-2.4139499873854220e-004,right_val:0.4051763117313385,left_val:0.5232086777687073},{features:[[10,10,6,3,-1.],[12,10,2,3,3.]],threshold:-1.0330369696021080e-003,right_val:0.4789193868637085,left_val:0.5556201934814453},{features:[[2,14,1,2,-1.],[2,15,1,1,2.]],threshold:1.8041160365100950e-004,right_val:0.4011810123920441,left_val:0.5229442715644836},{features:[[13,8,6,12,-1.],[16,8,3,6,2.],[13,14,3,6,2.]],threshold:-0.0614078603684902,right_val:0.5010703206062317,left_val:0.6298682093620300},{features:[[1,8,6,12,-1.],[1,8,3,6,2.],[4,14,3,6,2.]],threshold:-0.0695439130067825,right_val:0.4773184061050415,left_val:0.7228280901908875},{features:[[10,0,6,10,-1.],[12,0,2,10,3.]],threshold:-0.0705426633358002,right_val:0.5182529091835022,left_val:0.2269513010978699},{features:[[5,11,8,4,-1.],[5,11,4,2,2.],[9,13,4,2,2.]],threshold:2.4423799477517605e-003,right_val:0.4098151028156281,left_val:0.5237097144126892},{features:[[10,16,8,4,-1.],[14,16,4,2,2.],[10,18,4,2,2.]],threshold:1.5494349645450711e-003,right_val:0.5468043088912964,left_val:0.4773750901222229},{features:[[7,7,6,6,-1.],[9,7,2,6,3.]],threshold:-0.0239142198115587,right_val:0.4783824980258942,left_val:0.7146975994110107},{features:[[10,2,4,10,-1.],[10,2,2,10,2.]],threshold:-0.0124536901712418,right_val:0.5241122841835022,left_val:0.2635296881198883},{features:[[6,1,4,9,-1.],[8,1,2,9,2.]],threshold:-2.0760179904755205e-004,right_val:0.5113608837127686,left_val:0.3623757064342499},{features:[[12,19,2,1,-1.],[12,19,1,1,2.]],threshold:2.9781080229440704e-005,right_val:0.5432801842689514,left_val:0.4705932140350342}],threshold:90.2533493041992190},{simpleClassifiers:[{features:[[1,2,4,9,-1.],[3,2,2,9,2.]],threshold:0.0117727499455214,right_val:0.6421167254447937,left_val:0.3860518932342529},{features:[[7,5,6,4,-1.],[9,5,2,4,3.]],threshold:0.0270375702530146,right_val:0.6754038929939270,left_val:0.4385654926300049},{features:[[9,4,2,4,-1.],[9,6,2,2,2.]],threshold:-3.6419500247575343e-005,right_val:0.3423315882682800,left_val:0.5487101078033447},{features:[[14,5,2,8,-1.],[14,9,2,4,2.]],threshold:1.9995409529656172e-003,right_val:0.5400317907333374,left_val:0.3230532109737396},{features:[[7,6,5,12,-1.],[7,12,5,6,2.]],threshold:4.5278300531208515e-003,right_val:0.2935043871402741,left_val:0.5091639757156372},{features:[[14,6,2,6,-1.],[14,9,2,3,2.]],threshold:4.7890920541249216e-004,right_val:0.5344064235687256,left_val:0.4178153872489929},{features:[[4,6,2,6,-1.],[4,9,2,3,2.]],threshold:1.1720920447260141e-003,right_val:0.5132070779800415,left_val:0.2899182140827179},{features:[[8,15,10,4,-1.],[13,15,5,2,2.],[8,17,5,2,2.]],threshold:9.5305702416226268e-004,right_val:0.5560845136642456,left_val:0.4280124902725220},{features:[[6,18,2,2,-1.],[7,18,1,2,2.]],threshold:1.5099150004971307e-005,right_val:0.5404760241508484,left_val:0.4044871926307678},{features:[[11,3,6,2,-1.],[11,4,6,1,2.]],threshold:-6.0817901976406574e-004,right_val:0.5503466129302979,left_val:0.4271768927574158},{features:[[2,0,16,6,-1.],[2,2,16,2,3.]],threshold:3.3224520739167929e-003,right_val:0.5369734764099121,left_val:0.3962723910808563},{features:[[11,3,6,2,-1.],[11,4,6,1,2.]],threshold:-1.1037490330636501e-003,right_val:0.5237749814987183,left_val:0.4727177917957306},{features:[[4,11,10,3,-1.],[4,12,10,1,3.]],threshold:-1.4350269921123981e-003,right_val:0.4223509132862091,left_val:0.5603008270263672},{features:[[11,3,6,2,-1.],[11,4,6,1,2.]],threshold:2.0767399109899998e-003,right_val:0.4732725918292999,left_val:0.5225917100906372},{features:[[3,3,6,2,-1.],[3,4,6,1,2.]],threshold:-1.6412809782195836e-004,right_val:0.5432739853858948,left_val:0.3999075889587402},{features:[[16,0,4,7,-1.],[16,0,2,7,2.]],threshold:8.8302437216043472e-003,right_val:0.6027327179908752,left_val:0.4678385853767395},{features:[[0,14,9,6,-1.],[0,16,9,2,3.]],threshold:-0.0105520701035857,right_val:0.5213974714279175,left_val:0.3493967056274414},{features:[[9,16,3,3,-1.],[9,17,3,1,3.]],threshold:-2.2731600329279900e-003,right_val:0.4749062955379486,left_val:0.6185818910598755},{features:[[4,6,6,2,-1.],[6,6,2,2,3.]],threshold:-8.4786332445219159e-004,right_val:0.3843482136726379,left_val:0.5285341143608093},{features:[[15,11,1,3,-1.],[15,12,1,1,3.]],threshold:1.2081359745934606e-003,right_val:0.3447335958480835,left_val:0.5360640883445740},{features:[[5,5,2,3,-1.],[5,6,2,1,3.]],threshold:2.6512730401009321e-003,right_val:0.6193962097167969,left_val:0.4558292031288147},{features:[[10,9,2,2,-1.],[10,10,2,1,2.]],threshold:-1.1012479662895203e-003,right_val:0.5327628254890442,left_val:0.3680230081081390},{features:[[3,1,4,3,-1.],[5,1,2,3,2.]],threshold:4.9561518244445324e-004,right_val:0.5274940729141235,left_val:0.3960595130920410},{features:[[16,0,4,7,-1.],[16,0,2,7,2.]],threshold:-0.0439017713069916,right_val:0.4992839097976685,left_val:0.7020444869995117},{features:[[0,0,20,1,-1.],[10,0,10,1,2.]],threshold:0.0346903502941132,right_val:0.2766602933406830,left_val:0.5049164295196533},{features:[[15,11,1,3,-1.],[15,12,1,1,3.]],threshold:-2.7442190330475569e-003,right_val:0.5274971127510071,left_val:0.2672632932662964},{features:[[0,4,3,4,-1.],[1,4,1,4,3.]],threshold:3.3316588960587978e-003,right_val:0.6001101732254028,left_val:0.4579482972621918},{features:[[16,3,3,6,-1.],[16,5,3,2,3.]],threshold:-0.0200445707887411,right_val:0.5235717892646790,left_val:0.3171594142913818},{features:[[1,3,3,6,-1.],[1,5,3,2,3.]],threshold:1.3492030557245016e-003,right_val:0.4034324884414673,left_val:0.5265362858772278},{features:[[6,2,12,6,-1.],[12,2,6,3,2.],[6,5,6,3,2.]],threshold:2.9702018946409225e-003,right_val:0.4571984112262726,left_val:0.5332456827163696},{features:[[8,10,4,3,-1.],[8,11,4,1,3.]],threshold:6.3039981760084629e-003,right_val:0.6034635901451111,left_val:0.4593310952186585},{features:[[4,2,14,6,-1.],[11,2,7,3,2.],[4,5,7,3,2.]],threshold:-0.0129365902394056,right_val:0.5372971296310425,left_val:0.4437963962554932},{features:[[9,11,2,3,-1.],[9,12,2,1,3.]],threshold:4.0148729458451271e-003,right_val:0.6437833905220032,left_val:0.4680323898792267},{features:[[15,13,2,3,-1.],[15,14,2,1,3.]],threshold:-2.6401679497212172e-003,right_val:0.5314332842826843,left_val:0.3709631860256195},{features:[[8,12,4,3,-1.],[8,13,4,1,3.]],threshold:0.0139184398576617,right_val:0.7130808830261231,left_val:0.4723555147647858},{features:[[15,11,1,3,-1.],[15,12,1,1,3.]],threshold:-4.5087869511917233e-004,right_val:0.5370404124259949,left_val:0.4492394030094147},{features:[[7,13,5,2,-1.],[7,14,5,1,2.]],threshold:2.5384349282830954e-004,right_val:0.5514402985572815,left_val:0.4406864047050476},{features:[[7,12,6,3,-1.],[7,13,6,1,3.]],threshold:2.2710000630468130e-003,right_val:0.5967984199523926,left_val:0.4682416915893555},{features:[[5,11,4,4,-1.],[5,13,4,2,2.]],threshold:2.4120779708027840e-003,right_val:0.3018598854541779,left_val:0.5079392194747925},{features:[[11,4,3,3,-1.],[12,4,1,3,3.]],threshold:-3.6025670851813629e-005,right_val:0.4471096992492676,left_val:0.5601037144660950},{features:[[6,4,3,3,-1.],[7,4,1,3,3.]],threshold:-7.4905529618263245e-003,right_val:0.4989944100379944,left_val:0.2207535058259964},{features:[[16,5,3,6,-1.],[17,5,1,6,3.]],threshold:-0.0175131205469370,right_val:0.5017648935317993,left_val:0.6531215906143189},{features:[[3,6,12,7,-1.],[7,6,4,7,3.]],threshold:0.1428163051605225,right_val:0.1482062041759491,left_val:0.4967963099479675},{features:[[16,5,3,6,-1.],[17,5,1,6,3.]],threshold:5.5345268920063972e-003,right_val:0.5954223871231079,left_val:0.4898946881294251},{features:[[3,13,2,3,-1.],[3,14,2,1,3.]],threshold:-9.6323591424152255e-004,right_val:0.5196074247360230,left_val:0.3927116990089417},{features:[[16,5,3,6,-1.],[17,5,1,6,3.]],threshold:-2.0370010752230883e-003,right_val:0.4884858131408691,left_val:0.5613325238227844},{features:[[1,5,3,6,-1.],[2,5,1,6,3.]],threshold:1.6614829655736685e-003,right_val:0.5578880906105042,left_val:0.4472880065441132},{features:[[1,9,18,1,-1.],[7,9,6,1,3.]],threshold:-3.1188090797513723e-003,right_val:0.5397477746009827,left_val:0.3840532898902893},{features:[[0,9,8,7,-1.],[4,9,4,7,2.]],threshold:-6.4000617712736130e-003,right_val:0.4533218145370483,left_val:0.5843983888626099},{features:[[12,11,8,2,-1.],[12,12,8,1,2.]],threshold:3.1319601112045348e-004,right_val:0.4234727919101715,left_val:0.5439221858978272},{features:[[0,11,8,2,-1.],[0,12,8,1,2.]],threshold:-0.0182220991700888,right_val:0.4958404898643494,left_val:0.1288464963436127},{features:[[9,13,2,3,-1.],[9,14,2,1,3.]],threshold:8.7969247251749039e-003,right_val:0.7153480052947998,left_val:0.4951297938823700},{features:[[4,10,12,4,-1.],[4,10,6,2,2.],[10,12,6,2,2.]],threshold:-4.2395070195198059e-003,right_val:0.5194936990737915,left_val:0.3946599960327148},{features:[[9,3,3,7,-1.],[10,3,1,7,3.]],threshold:9.7086271271109581e-003,right_val:0.6064900159835815,left_val:0.4897503852844238},{features:[[7,2,3,5,-1.],[8,2,1,5,3.]],threshold:-3.9934171363711357e-003,right_val:0.5060828924179077,left_val:0.3245440125465393},{features:[[9,12,4,6,-1.],[11,12,2,3,2.],[9,15,2,3,2.]],threshold:-0.0167850591242313,right_val:0.5203778743743897,left_val:0.1581953018903732},{features:[[8,7,3,6,-1.],[9,7,1,6,3.]],threshold:0.0182720907032490,right_val:0.6626979112625122,left_val:0.4680935144424439},{features:[[15,4,4,2,-1.],[15,5,4,1,2.]],threshold:5.6872838176786900e-003,right_val:0.3512184917926788,left_val:0.5211697816848755},{features:[[8,7,3,3,-1.],[9,7,1,3,3.]],threshold:-1.0739039862528443e-003,right_val:0.4529845118522644,left_val:0.5768386125564575},{features:[[14,2,6,4,-1.],[14,4,6,2,2.]],threshold:-3.7093870341777802e-003,right_val:0.5313581228256226,left_val:0.4507763087749481},{features:[[7,16,6,1,-1.],[9,16,2,1,3.]],threshold:-2.1110709349159151e-004,right_val:0.4333376884460449,left_val:0.5460820198059082},{features:[[15,13,2,3,-1.],[15,14,2,1,3.]],threshold:1.0670139454305172e-003,right_val:0.4078390896320343,left_val:0.5371856093406677},{features:[[8,7,3,10,-1.],[9,7,1,10,3.]],threshold:3.5943021066486835e-003,right_val:0.5643836259841919,left_val:0.4471287131309509},{features:[[11,10,2,6,-1.],[11,12,2,2,3.]],threshold:-5.1776031032204628e-003,right_val:0.5280330181121826,left_val:0.4499393105506897},{features:[[6,10,4,1,-1.],[8,10,2,1,2.]],threshold:-2.5414369883947074e-004,right_val:0.4407708048820496,left_val:0.5516173243522644},{features:[[10,9,2,2,-1.],[10,10,2,1,2.]],threshold:6.3522560521960258e-003,right_val:0.2465227991342545,left_val:0.5194190144538879},{features:[[8,9,2,2,-1.],[8,10,2,1,2.]],threshold:-4.4205080484971404e-004,right_val:0.5139682292938232,left_val:0.3830705881118774},{features:[[12,7,2,2,-1.],[13,7,1,1,2.],[12,8,1,1,2.]],threshold:7.4488727841526270e-004,right_val:0.5974786877632141,left_val:0.4891090989112854},{features:[[5,7,2,2,-1.],[5,7,1,1,2.],[6,8,1,1,2.]],threshold:-3.5116379149258137e-003,right_val:0.4768764972686768,left_val:0.7413681745529175},{features:[[13,0,3,14,-1.],[14,0,1,14,3.]],threshold:-0.0125409103929996,right_val:0.5252826809883118,left_val:0.3648819029331207},{features:[[4,0,3,14,-1.],[5,0,1,14,3.]],threshold:9.4931852072477341e-003,right_val:0.3629586994647980,left_val:0.5100492835044861},{features:[[13,4,3,14,-1.],[14,4,1,14,3.]],threshold:0.0129611501470208,right_val:0.4333561062812805,left_val:0.5232442021369934},{features:[[9,14,2,3,-1.],[9,15,2,1,3.]],threshold:4.7209449112415314e-003,right_val:0.6331052780151367,left_val:0.4648149013519287},{features:[[8,14,4,3,-1.],[8,15,4,1,3.]],threshold:-2.3119079414755106e-003,right_val:0.4531058073043823,left_val:0.5930309891700745},{features:[[4,2,3,16,-1.],[5,2,1,16,3.]],threshold:-2.8262299019843340e-003,right_val:0.5257101058959961,left_val:0.3870477974414825},{features:[[7,2,8,10,-1.],[7,7,8,5,2.]],threshold:-1.4311339473351836e-003,right_val:0.4561854898929596,left_val:0.5522503256797791},{features:[[6,14,7,3,-1.],[6,15,7,1,3.]],threshold:1.9378310535103083e-003,right_val:0.5736966729164124,left_val:0.4546220898628235},{features:[[9,2,10,12,-1.],[14,2,5,6,2.],[9,8,5,6,2.]],threshold:2.6343559147790074e-004,right_val:0.4571875035762787,left_val:0.5345739126205444},{features:[[6,7,8,2,-1.],[6,8,8,1,2.]],threshold:7.8257522545754910e-004,right_val:0.5220187902450562,left_val:0.3967815935611725},{features:[[8,13,4,6,-1.],[8,16,4,3,2.]],threshold:-0.0195504408329725,right_val:0.5243508219718933,left_val:0.2829642891883850},{features:[[6,6,1,3,-1.],[6,7,1,1,3.]],threshold:4.3914958951063454e-004,right_val:0.5899090170860291,left_val:0.4590066969394684},{features:[[16,2,4,6,-1.],[16,4,4,2,3.]],threshold:0.0214520003646612,right_val:0.2855378985404968,left_val:0.5231410861015320},{features:[[6,6,4,2,-1.],[6,6,2,1,2.],[8,7,2,1,2.]],threshold:5.8973580598831177e-004,right_val:0.5506421923637390,left_val:0.4397256970405579},{features:[[16,2,4,6,-1.],[16,4,4,2,3.]],threshold:-0.0261576101183891,right_val:0.5189175009727478,left_val:0.3135079145431519},{features:[[0,2,4,6,-1.],[0,4,4,2,3.]],threshold:-0.0139598604291677,right_val:0.5040717720985413,left_val:0.3213272988796234},{features:[[9,6,2,6,-1.],[9,6,1,6,2.]],threshold:-6.3699018210172653e-003,right_val:0.4849506914615631,left_val:0.6387544870376587},{features:[[3,4,6,10,-1.],[3,9,6,5,2.]],threshold:-8.5613820701837540e-003,right_val:0.5032019019126892,left_val:0.2759132087230682},{features:[[9,5,2,6,-1.],[9,5,1,6,2.]],threshold:9.6622901037335396e-004,right_val:0.5834879279136658,left_val:0.4685640931129456},{features:[[3,13,2,3,-1.],[3,14,2,1,3.]],threshold:7.6550268568098545e-004,right_val:0.3896422088146210,left_val:0.5175207257270813},{features:[[13,13,3,2,-1.],[13,14,3,1,2.]],threshold:-8.1833340227603912e-003,right_val:0.5208122134208679,left_val:0.2069136947393417},{features:[[2,16,10,4,-1.],[2,16,5,2,2.],[7,18,5,2,2.]],threshold:-9.3976939097046852e-003,right_val:0.4641222953796387,left_val:0.6134091019630432},{features:[[5,6,10,6,-1.],[10,6,5,3,2.],[5,9,5,3,2.]],threshold:4.8028980381786823e-003,right_val:0.4395219981670380,left_val:0.5454108119010925},{features:[[7,14,1,3,-1.],[7,15,1,1,3.]],threshold:-3.5680569708347321e-003,right_val:0.4681093990802765,left_val:0.6344485282897949},{features:[[14,16,6,3,-1.],[14,17,6,1,3.]],threshold:4.0733120404183865e-003,right_val:0.4015620052814484,left_val:0.5292683243751526},{features:[[5,4,3,3,-1.],[5,5,3,1,3.]],threshold:1.2568129459396005e-003,right_val:0.5452824831008911,left_val:0.4392988085746765},{features:[[7,4,10,3,-1.],[7,5,10,1,3.]],threshold:-2.9065010603517294e-003,right_val:0.4863379895687103,left_val:0.5898832082748413},{features:[[0,4,5,4,-1.],[0,6,5,2,2.]],threshold:-2.4409340694546700e-003,right_val:0.5247421860694885,left_val:0.4069364964962006},{features:[[13,11,3,9,-1.],[13,14,3,3,3.]],threshold:0.0248307008296251,right_val:0.3682524859905243,left_val:0.5182725787162781},{features:[[4,11,3,9,-1.],[4,14,3,3,3.]],threshold:-0.0488540083169937,right_val:0.4961281120777130,left_val:0.1307577937841415},{features:[[9,7,2,1,-1.],[9,7,1,1,2.]],threshold:-1.6110379947349429e-003,right_val:0.4872662127017975,left_val:0.6421005725860596},{features:[[5,0,6,17,-1.],[7,0,2,17,3.]],threshold:-0.0970094799995422,right_val:0.4950988888740540,left_val:0.0477693490684032},{features:[[10,3,6,3,-1.],[10,3,3,3,2.]],threshold:1.1209240183234215e-003,right_val:0.5354745984077454,left_val:0.4616267085075378},{features:[[2,2,15,4,-1.],[7,2,5,4,3.]],threshold:-1.3064090162515640e-003,right_val:0.4638805985450745,left_val:0.6261854171752930},{features:[[8,2,8,2,-1.],[12,2,4,1,2.],[8,3,4,1,2.]],threshold:4.5771620352752507e-004,right_val:0.4646640121936798,left_val:0.5384417772293091},{features:[[8,1,3,6,-1.],[8,3,3,2,3.]],threshold:-6.3149951165542006e-004,right_val:0.5130257010459900,left_val:0.3804047107696533},{features:[[9,17,2,2,-1.],[9,18,2,1,2.]],threshold:1.4505970466416329e-004,right_val:0.5664461851119995,left_val:0.4554310142993927},{features:[[0,0,2,14,-1.],[1,0,1,14,2.]],threshold:-0.0164745505899191,right_val:0.4715859889984131,left_val:0.6596958041191101},{features:[[12,0,7,3,-1.],[12,1,7,1,3.]],threshold:0.0133695797994733,right_val:0.3035964965820313,left_val:0.5195466279983521},{features:[[1,14,1,2,-1.],[1,15,1,1,2.]],threshold:1.0271780047332868e-004,right_val:0.4107066094875336,left_val:0.5229176282882690},{features:[[14,12,2,8,-1.],[15,12,1,4,2.],[14,16,1,4,2.]],threshold:-5.5311559699475765e-003,right_val:0.4960907101631165,left_val:0.6352887749671936},{features:[[1,0,7,3,-1.],[1,1,7,1,3.]],threshold:-2.6187049224972725e-003,right_val:0.5140984058380127,left_val:0.3824546039104462},{features:[[14,12,2,8,-1.],[15,12,1,4,2.],[14,16,1,4,2.]],threshold:5.0834268331527710e-003,right_val:0.6220818758010864,left_val:0.4950439929962158},{features:[[6,0,8,12,-1.],[6,0,4,6,2.],[10,6,4,6,2.]],threshold:0.0798181593418121,right_val:0.1322475969791412,left_val:0.4952335953712463},{features:[[6,1,8,9,-1.],[6,4,8,3,3.]],threshold:-0.0992265865206718,right_val:0.5008416771888733,left_val:0.7542728781700134},{features:[[5,2,2,2,-1.],[5,3,2,1,2.]],threshold:-6.5174017800018191e-004,right_val:0.5130121111869812,left_val:0.3699302971363068},{features:[[13,14,6,6,-1.],[16,14,3,3,2.],[13,17,3,3,2.]],threshold:-0.0189968496561050,right_val:0.4921202957630158,left_val:0.6689178943634033},{features:[[0,17,20,2,-1.],[0,17,10,1,2.],[10,18,10,1,2.]],threshold:0.0173468999564648,right_val:0.1859198063611984,left_val:0.4983300864696503},{features:[[10,3,2,6,-1.],[11,3,1,3,2.],[10,6,1,3,2.]],threshold:5.5082101607695222e-004,right_val:0.5522121787071228,left_val:0.4574424028396606},{features:[[5,12,6,2,-1.],[8,12,3,2,2.]],threshold:2.0056050270795822e-003,right_val:0.3856469988822937,left_val:0.5131744742393494},{features:[[10,7,6,13,-1.],[10,7,3,13,2.]],threshold:-7.7688191086053848e-003,right_val:0.5434309244155884,left_val:0.4361700117588043},{features:[[5,15,10,5,-1.],[10,15,5,5,2.]],threshold:0.0508782789111137,right_val:0.6840639710426331,left_val:0.4682720899581909},{features:[[10,4,4,10,-1.],[10,4,2,10,2.]],threshold:-2.2901780903339386e-003,right_val:0.5306099057197571,left_val:0.4329245090484619},{features:[[5,7,2,1,-1.],[6,7,1,1,2.]],threshold:-1.5715380141045898e-004,right_val:0.4378164112567902,left_val:0.5370057225227356},{features:[[10,3,6,7,-1.],[10,3,3,7,2.]],threshold:0.1051924005150795,right_val:0.0673614665865898,left_val:0.5137274265289307},{features:[[4,3,6,7,-1.],[7,3,3,7,2.]],threshold:2.7198919560760260e-003,right_val:0.5255665183067322,left_val:0.4112060964107513},{features:[[1,7,18,5,-1.],[7,7,6,5,3.]],threshold:0.0483377799391747,right_val:0.4438967108726502,left_val:0.5404623746871948},{features:[[3,17,4,3,-1.],[5,17,2,3,2.]],threshold:9.5703761326149106e-004,right_val:0.5399510860443115,left_val:0.4355969130992889},{features:[[8,14,12,6,-1.],[14,14,6,3,2.],[8,17,6,3,2.]],threshold:-0.0253712590783834,right_val:0.5031024813652039,left_val:0.5995175242424011},{features:[[0,13,20,4,-1.],[0,13,10,2,2.],[10,15,10,2,2.]],threshold:0.0524579510092735,right_val:0.1398351043462753,left_val:0.4950287938117981},{features:[[4,5,14,2,-1.],[11,5,7,1,2.],[4,6,7,1,2.]],threshold:-0.0123656298965216,right_val:0.4964106082916260,left_val:0.6397299170494080},{features:[[1,2,10,12,-1.],[1,2,5,6,2.],[6,8,5,6,2.]],threshold:-0.1458971947431564,right_val:0.4946322143077850,left_val:0.1001669988036156},{features:[[6,1,14,3,-1.],[6,2,14,1,3.]],threshold:-0.0159086007624865,right_val:0.5208340883255005,left_val:0.3312329947948456},{features:[[8,16,2,3,-1.],[8,17,2,1,3.]],threshold:3.9486068999394774e-004,right_val:0.5426102876663208,left_val:0.4406363964080811},{features:[[9,17,3,2,-1.],[10,17,1,2,3.]],threshold:-5.2454001270234585e-003,right_val:0.5189967155456543,left_val:0.2799589931964874},{features:[[5,15,4,2,-1.],[5,15,2,1,2.],[7,16,2,1,2.]],threshold:-5.0421799533069134e-003,right_val:0.4752142131328583,left_val:0.6987580060958862},{features:[[10,15,1,3,-1.],[10,16,1,1,3.]],threshold:2.9812189750373363e-003,right_val:0.6307479739189148,left_val:0.4983288943767548},{features:[[8,16,4,4,-1.],[8,16,2,2,2.],[10,18,2,2,2.]],threshold:-7.2884308174252510e-003,right_val:0.5026869773864746,left_val:0.2982333004474640},{features:[[6,11,8,6,-1.],[6,14,8,3,2.]],threshold:1.5094350092113018e-003,right_val:0.3832970857620239,left_val:0.5308442115783691},{features:[[2,13,5,2,-1.],[2,14,5,1,2.]],threshold:-9.3340799212455750e-003,right_val:0.4969817101955414,left_val:0.2037964016199112},{features:[[13,14,6,6,-1.],[16,14,3,3,2.],[13,17,3,3,2.]],threshold:0.0286671407520771,right_val:0.6928027272224426,left_val:0.5025696754455566},{features:[[1,9,18,4,-1.],[7,9,6,4,3.]],threshold:0.1701968014240265,right_val:0.1476442962884903,left_val:0.4960052967071533},{features:[[13,14,6,6,-1.],[16,14,3,3,2.],[13,17,3,3,2.]],threshold:-3.2614478841423988e-003,right_val:0.4826056063175201,left_val:0.5603063702583313},{features:[[0,2,1,6,-1.],[0,4,1,2,3.]],threshold:5.5769277969375253e-004,right_val:0.4129633009433746,left_val:0.5205562114715576},{features:[[5,0,15,20,-1.],[5,10,15,10,2.]],threshold:0.3625833988189697,right_val:0.3768612146377564,left_val:0.5221652984619141},{features:[[1,14,6,6,-1.],[1,14,3,3,2.],[4,17,3,3,2.]],threshold:-0.0116151301190257,right_val:0.4637489914894104,left_val:0.6022682785987854},{features:[[8,14,4,6,-1.],[10,14,2,3,2.],[8,17,2,3,2.]],threshold:-4.0795197710394859e-003,right_val:0.5337479114532471,left_val:0.4070447087287903},{features:[[7,11,2,1,-1.],[8,11,1,1,2.]],threshold:5.7204300537705421e-004,right_val:0.5900393128395081,left_val:0.4601835012435913},{features:[[9,17,3,2,-1.],[10,17,1,2,3.]],threshold:6.7543348995968699e-004,right_val:0.4345428943634033,left_val:0.5398252010345459},{features:[[8,17,3,2,-1.],[9,17,1,2,3.]],threshold:6.3295697327703238e-004,right_val:0.4051358997821808,left_val:0.5201563239097595},{features:[[12,14,4,6,-1.],[14,14,2,3,2.],[12,17,2,3,2.]],threshold:1.2435320531949401e-003,right_val:0.5547441244125366,left_val:0.4642387926578522},{features:[[4,14,4,6,-1.],[4,14,2,3,2.],[6,17,2,3,2.]],threshold:-4.7363857738673687e-003,right_val:0.4672552049160004,left_val:0.6198567152023315},{features:[[13,14,2,6,-1.],[14,14,1,3,2.],[13,17,1,3,2.]],threshold:-6.4658462069928646e-003,right_val:0.5019000768661499,left_val:0.6837332844734192},{features:[[5,14,2,6,-1.],[5,14,1,3,2.],[6,17,1,3,2.]],threshold:3.5017321351915598e-004,right_val:0.5363622903823853,left_val:0.4344803094863892},{features:[[7,0,6,12,-1.],[7,4,6,4,3.]],threshold:1.5754920605104417e-004,right_val:0.5732020735740662,left_val:0.4760079085826874},{features:[[0,7,12,2,-1.],[4,7,4,2,3.]],threshold:9.9774366244673729e-003,right_val:0.3635039925575256,left_val:0.5090985894203186},{features:[[10,3,3,13,-1.],[11,3,1,13,3.]],threshold:-4.1464529931545258e-004,right_val:0.4593802094459534,left_val:0.5570064783096314},{features:[[7,3,3,13,-1.],[8,3,1,13,3.]],threshold:-3.5888899583369493e-004,right_val:0.4339134991168976,left_val:0.5356845855712891},{features:[[10,8,6,3,-1.],[10,9,6,1,3.]],threshold:4.0463250479660928e-004,right_val:0.5436776876449585,left_val:0.4439803063869476},{features:[[3,11,3,2,-1.],[4,11,1,2,3.]],threshold:-8.2184787606820464e-004,right_val:0.5176299214363098,left_val:0.4042294919490814},{features:[[13,12,6,8,-1.],[16,12,3,4,2.],[13,16,3,4,2.]],threshold:5.9467419050633907e-003,right_val:0.5633779764175415,left_val:0.4927651882171631},{features:[[7,6,6,5,-1.],[9,6,2,5,3.]],threshold:-0.0217533893883228,right_val:0.4800840914249420,left_val:0.8006293773651123},{features:[[17,11,2,7,-1.],[17,11,1,7,2.]],threshold:-0.0145403798669577,right_val:0.5182222723960877,left_val:0.3946054875850678},{features:[[3,13,8,2,-1.],[7,13,4,2,2.]],threshold:-0.0405107699334621,right_val:0.4935792982578278,left_val:0.0213249903172255},{features:[[6,9,8,3,-1.],[6,10,8,1,3.]],threshold:-5.8458268176764250e-004,right_val:0.5314025282859802,left_val:0.4012795984745026},{features:[[4,3,4,3,-1.],[4,4,4,1,3.]],threshold:5.5151800625026226e-003,right_val:0.5896260738372803,left_val:0.4642418920993805},{features:[[11,3,4,3,-1.],[11,4,4,1,3.]],threshold:-6.0626221820712090e-003,right_val:0.5016477704048157,left_val:0.6502159237861633},{features:[[1,4,17,12,-1.],[1,8,17,4,3.]],threshold:0.0945358425378799,right_val:0.4126827120780945,left_val:0.5264708995819092},{features:[[11,3,4,3,-1.],[11,4,4,1,3.]],threshold:4.7315051779150963e-003,right_val:0.5892447829246521,left_val:0.4879199862480164},{features:[[4,8,6,3,-1.],[4,9,6,1,3.]],threshold:-5.2571471314877272e-004,right_val:0.5189412832260132,left_val:0.3917280137538910},{features:[[12,3,5,3,-1.],[12,4,5,1,3.]],threshold:-2.5464049540460110e-003,right_val:0.4985705912113190,left_val:0.5837599039077759},{features:[[1,11,2,7,-1.],[2,11,1,7,2.]],threshold:-0.0260756891220808,right_val:0.4955821931362152,left_val:0.1261983960866928},{features:[[15,12,2,8,-1.],[16,12,1,4,2.],[15,16,1,4,2.]],threshold:-5.4779709316790104e-003,right_val:0.5010265707969666,left_val:0.5722513794898987},{features:[[4,8,11,3,-1.],[4,9,11,1,3.]],threshold:5.1337741315364838e-003,right_val:0.4226376116275787,left_val:0.5273262262344360},{features:[[9,13,6,2,-1.],[12,13,3,1,2.],[9,14,3,1,2.]],threshold:4.7944980906322598e-004,right_val:0.5819587111473084,left_val:0.4450066983699799},{features:[[6,13,4,3,-1.],[6,14,4,1,3.]],threshold:-2.1114079281687737e-003,right_val:0.4511714875698090,left_val:0.5757653117179871},{features:[[9,12,3,3,-1.],[10,12,1,3,3.]],threshold:-0.0131799904629588,right_val:0.5160734057426453,left_val:0.1884381026029587},{features:[[5,3,3,3,-1.],[5,4,3,1,3.]],threshold:-4.7968099825084209e-003,right_val:0.4736118912696838,left_val:0.6589789986610413},{features:[[9,4,2,3,-1.],[9,5,2,1,3.]],threshold:6.7483168095350266e-003,right_val:0.3356395065784454,left_val:0.5259429812431335},{features:[[0,2,16,3,-1.],[0,3,16,1,3.]],threshold:1.4623369788751006e-003,right_val:0.4264092147350311,left_val:0.5355271100997925},{features:[[15,12,2,8,-1.],[16,12,1,4,2.],[15,16,1,4,2.]],threshold:4.7645159065723419e-003,right_val:0.5786827802658081,left_val:0.5034406781196594},{features:[[3,12,2,8,-1.],[3,12,1,4,2.],[4,16,1,4,2.]],threshold:6.8066660314798355e-003,right_val:0.6677829027175903,left_val:0.4756605029106140},{features:[[14,13,3,6,-1.],[14,15,3,2,3.]],threshold:3.6608621012419462e-003,right_val:0.4311546981334686,left_val:0.5369611978530884},{features:[[3,13,3,6,-1.],[3,15,3,2,3.]],threshold:0.0214496403932571,right_val:0.1888816058635712,left_val:0.4968641996383667},{features:[[6,5,10,2,-1.],[11,5,5,1,2.],[6,6,5,1,2.]],threshold:4.1678901761770248e-003,right_val:0.5815368890762329,left_val:0.4930733144283295},{features:[[2,14,14,6,-1.],[2,17,14,3,2.]],threshold:8.6467564105987549e-003,right_val:0.4132595062255859,left_val:0.5205205082893372},{features:[[10,14,1,3,-1.],[10,15,1,1,3.]],threshold:-3.6114078829996288e-004,right_val:0.4800927937030792,left_val:0.5483555197715759},{features:[[4,16,2,2,-1.],[4,16,1,1,2.],[5,17,1,1,2.]],threshold:1.0808729566633701e-003,right_val:0.6041421294212341,left_val:0.4689902067184448},{features:[[10,6,2,3,-1.],[10,7,2,1,3.]],threshold:5.7719959877431393e-003,right_val:0.3053277134895325,left_val:0.5171142220497131},{features:[[0,17,20,2,-1.],[0,17,10,1,2.],[10,18,10,1,2.]],threshold:1.5720770461484790e-003,right_val:0.4178803861141205,left_val:0.5219978094100952},{features:[[13,6,1,3,-1.],[13,7,1,1,3.]],threshold:-1.9307859474793077e-003,right_val:0.4812920093536377,left_val:0.5860369801521301},{features:[[8,13,3,2,-1.],[9,13,1,2,3.]],threshold:-7.8926272690296173e-003,right_val:0.4971733987331390,left_val:0.1749276965856552},{features:[[12,2,3,3,-1.],[13,2,1,3,3.]],threshold:-2.2224679123610258e-003,right_val:0.5212848186492920,left_val:0.4342589080333710},{features:[[3,18,2,2,-1.],[3,18,1,1,2.],[4,19,1,1,2.]],threshold:1.9011989934369922e-003,right_val:0.6892055273056030,left_val:0.4765186905860901},{features:[[9,16,3,4,-1.],[10,16,1,4,3.]],threshold:2.7576119173318148e-003,right_val:0.4337486028671265,left_val:0.5262191295623779},{features:[[6,6,1,3,-1.],[6,7,1,1,3.]],threshold:5.1787449046969414e-003,right_val:0.7843729257583618,left_val:0.4804069101810455},{features:[[13,1,5,2,-1.],[13,2,5,1,2.]],threshold:-9.0273341629654169e-004,right_val:0.5353423953056335,left_val:0.4120846986770630},{features:[[7,14,6,2,-1.],[7,14,3,1,2.],[10,15,3,1,2.]],threshold:5.1797959022223949e-003,right_val:0.6425960063934326,left_val:0.4740372896194458},{features:[[11,3,3,4,-1.],[12,3,1,4,3.]],threshold:-0.0101140001788735,right_val:0.5175017714500427,left_val:0.2468792051076889},{features:[[1,13,12,6,-1.],[5,13,4,6,3.]],threshold:-0.0186170600354671,right_val:0.4628978967666626,left_val:0.5756294131278992},{features:[[14,11,5,2,-1.],[14,12,5,1,2.]],threshold:5.9225959703326225e-003,right_val:0.3214271068572998,left_val:0.5169625878334045},{features:[[2,15,14,4,-1.],[2,15,7,2,2.],[9,17,7,2,2.]],threshold:-6.2945079989731312e-003,right_val:0.5141636729240418,left_val:0.3872014880180359},{features:[[3,7,14,2,-1.],[10,7,7,1,2.],[3,8,7,1,2.]],threshold:6.5353019163012505e-003,right_val:0.6310489773750305,left_val:0.4853048920631409},{features:[[1,11,4,2,-1.],[1,12,4,1,2.]],threshold:1.0878399480134249e-003,right_val:0.3723258972167969,left_val:0.5117315053939819},{features:[[14,0,6,14,-1.],[16,0,2,14,3.]],threshold:-0.0225422400981188,right_val:0.4887112975120544,left_val:0.5692740082740784},{features:[[4,11,1,3,-1.],[4,12,1,1,3.]],threshold:-3.0065660830587149e-003,right_val:0.5003992915153503,left_val:0.2556012868881226},{features:[[14,0,6,14,-1.],[16,0,2,14,3.]],threshold:7.4741272255778313e-003,right_val:0.5675926804542542,left_val:0.4810872972011566},{features:[[1,10,3,7,-1.],[2,10,1,7,3.]],threshold:0.0261623207479715,right_val:0.1777237057685852,left_val:0.4971194863319397},{features:[[8,12,9,2,-1.],[8,13,9,1,2.]],threshold:9.4352738233283162e-004,right_val:0.5491250753402710,left_val:0.4940010905265808},{features:[[0,6,20,1,-1.],[10,6,10,1,2.]],threshold:0.0333632417023182,right_val:0.2790724039077759,left_val:0.5007612109184265},{features:[[8,4,4,4,-1.],[8,4,2,4,2.]],threshold:-0.0151186501607299,right_val:0.4973031878471375,left_val:0.7059578895568848},{features:[[0,0,2,2,-1.],[0,1,2,1,2.]],threshold:9.8648946732282639e-004,right_val:0.3776761889457703,left_val:0.5128620266914368}],threshold:104.7491989135742200},{simpleClassifiers:[{features:[[5,3,10,9,-1.],[5,6,10,3,3.]],threshold:-0.0951507985591888,right_val:0.4017286896705627,left_val:0.6470757126808167},{features:[[15,2,4,10,-1.],[15,2,2,10,2.]],threshold:6.2702340073883533e-003,right_val:0.5746449232101440,left_val:0.3999822139739990},{features:[[8,2,2,7,-1.],[9,2,1,7,2.]],threshold:3.0018089455552399e-004,right_val:0.5538809895515442,left_val:0.3558770120143890},{features:[[7,4,12,1,-1.],[11,4,4,1,3.]],threshold:1.1757409665733576e-003,right_val:0.5382617712020874,left_val:0.4256534874439240},{features:[[3,4,9,1,-1.],[6,4,3,1,3.]],threshold:4.4235268433112651e-005,right_val:0.5589926838874817,left_val:0.3682908117771149},{features:[[15,10,1,4,-1.],[15,12,1,2,2.]],threshold:-2.9936920327600092e-005,right_val:0.4020367860794067,left_val:0.5452470183372498},{features:[[4,10,6,4,-1.],[7,10,3,4,2.]],threshold:3.0073199886828661e-003,right_val:0.3317843973636627,left_val:0.5239058136940002},{features:[[15,9,1,6,-1.],[15,12,1,3,2.]],threshold:-0.0105138896033168,right_val:0.5307983756065369,left_val:0.4320689141750336},{features:[[7,17,6,3,-1.],[7,18,6,1,3.]],threshold:8.3476826548576355e-003,right_val:0.6453298926353455,left_val:0.4504637122154236},{features:[[14,3,2,16,-1.],[15,3,1,8,2.],[14,11,1,8,2.]],threshold:-3.1492270063608885e-003,right_val:0.5370525121688843,left_val:0.4313425123691559},{features:[[4,9,1,6,-1.],[4,12,1,3,2.]],threshold:-1.4435649973165710e-005,right_val:0.3817971944808960,left_val:0.5326603055000305},{features:[[12,1,5,2,-1.],[12,2,5,1,2.]],threshold:-4.2855090578086674e-004,right_val:0.5382009744644165,left_val:0.4305163919925690},{features:[[6,18,4,2,-1.],[6,18,2,1,2.],[8,19,2,1,2.]],threshold:1.5062429883982986e-004,right_val:0.5544965267181397,left_val:0.4235970973968506},{features:[[2,4,16,10,-1.],[10,4,8,5,2.],[2,9,8,5,2.]],threshold:0.0715598315000534,right_val:0.2678802907466888,left_val:0.5303059816360474},{features:[[6,5,1,10,-1.],[6,10,1,5,2.]],threshold:8.4095180500298738e-004,right_val:0.5205433964729309,left_val:0.3557108938694000},{features:[[4,8,15,2,-1.],[9,8,5,2,3.]],threshold:0.0629865005612373,right_val:0.2861376106739044,left_val:0.5225362777709961},{features:[[1,8,15,2,-1.],[6,8,5,2,3.]],threshold:-3.3798629883676767e-003,right_val:0.5201697945594788,left_val:0.3624185919761658},{features:[[9,5,3,6,-1.],[9,7,3,2,3.]],threshold:-1.1810739670181647e-004,right_val:0.3959893882274628,left_val:0.5474476814270020},{features:[[5,7,8,2,-1.],[9,7,4,2,2.]],threshold:-5.4505601292476058e-004,right_val:0.5215715765953064,left_val:0.3740422129631043},{features:[[9,11,2,3,-1.],[9,12,2,1,3.]],threshold:-1.8454910023137927e-003,right_val:0.4584448933601379,left_val:0.5893052220344544},{features:[[1,0,16,3,-1.],[1,1,16,1,3.]],threshold:-4.3832371011376381e-004,right_val:0.5385351181030273,left_val:0.4084582030773163},{features:[[11,2,7,2,-1.],[11,3,7,1,2.]],threshold:-2.4000830017030239e-003,right_val:0.5293580293655396,left_val:0.3777455091476440},{features:[[5,1,10,18,-1.],[5,7,10,6,3.]],threshold:-0.0987957417964935,right_val:0.5070089101791382,left_val:0.2963612079620361},{features:[[17,4,3,2,-1.],[18,4,1,2,3.]],threshold:3.1798239797353745e-003,right_val:0.6726443767547607,left_val:0.4877632856369019},{features:[[8,13,1,3,-1.],[8,14,1,1,3.]],threshold:3.2406419632025063e-004,right_val:0.5561109781265259,left_val:0.4366911053657532},{features:[[3,14,14,6,-1.],[3,16,14,2,3.]],threshold:-0.0325472503900528,right_val:0.5308616161346436,left_val:0.3128157854080200},{features:[[0,2,3,4,-1.],[1,2,1,4,3.]],threshold:-7.7561130747199059e-003,right_val:0.4639872014522553,left_val:0.6560224890708923},{features:[[12,1,5,2,-1.],[12,2,5,1,2.]],threshold:0.0160272493958473,right_val:0.3141897916793823,left_val:0.5172680020332336},{features:[[3,1,5,2,-1.],[3,2,5,1,2.]],threshold:7.1002350523485802e-006,right_val:0.5336294770240784,left_val:0.4084446132183075},{features:[[10,13,2,3,-1.],[10,14,2,1,3.]],threshold:7.3422808200120926e-003,right_val:0.6603465080261231,left_val:0.4966922104358673},{features:[[8,13,2,3,-1.],[8,14,2,1,3.]],threshold:-1.6970280557870865e-003,right_val:0.4500182867050171,left_val:0.5908237099647522},{features:[[14,12,2,3,-1.],[14,13,2,1,3.]],threshold:2.4118260480463505e-003,right_val:0.3599720895290375,left_val:0.5315160751342773},{features:[[7,2,2,3,-1.],[7,3,2,1,3.]],threshold:-5.5300937965512276e-003,right_val:0.4996814131736755,left_val:0.2334040999412537},{features:[[5,6,10,4,-1.],[10,6,5,2,2.],[5,8,5,2,2.]],threshold:-2.6478730142116547e-003,right_val:0.4684734046459198,left_val:0.5880935788154602},{features:[[9,13,1,6,-1.],[9,16,1,3,2.]],threshold:0.0112956296652555,right_val:0.1884590983390808,left_val:0.4983777105808258},{features:[[10,12,2,2,-1.],[11,12,1,1,2.],[10,13,1,1,2.]],threshold:-6.6952878842130303e-004,right_val:0.4799019992351532,left_val:0.5872138142585754},{features:[[4,12,2,3,-1.],[4,13,2,1,3.]],threshold:1.4410680159926414e-003,right_val:0.3501011133193970,left_val:0.5131189227104187},{features:[[14,4,6,6,-1.],[14,6,6,2,3.]],threshold:2.4637870956212282e-003,right_val:0.4117639064788818,left_val:0.5339372158050537},{features:[[8,17,2,3,-1.],[8,18,2,1,3.]],threshold:3.3114518737420440e-004,right_val:0.5398246049880981,left_val:0.4313383102416992},{features:[[16,4,4,6,-1.],[16,6,4,2,3.]],threshold:-0.0335572697222233,right_val:0.5179154872894287,left_val:0.2675336897373200},{features:[[0,4,4,6,-1.],[0,6,4,2,3.]],threshold:0.0185394193977118,right_val:0.2317177057266235,left_val:0.4973869919776917},{features:[[14,6,2,3,-1.],[14,6,1,3,2.]],threshold:-2.9698139405809343e-004,right_val:0.4643664062023163,left_val:0.5529708266258240},{features:[[4,9,8,1,-1.],[8,9,4,1,2.]],threshold:-4.5577259152196348e-004,right_val:0.4469191133975983,left_val:0.5629584193229675},{features:[[8,12,4,3,-1.],[8,13,4,1,3.]],threshold:-0.0101589802652597,right_val:0.4925918877124786,left_val:0.6706212759017944},{features:[[5,12,10,6,-1.],[5,14,10,2,3.]],threshold:-2.2413829356082715e-005,right_val:0.3912901878356934,left_val:0.5239421725273132},{features:[[11,12,1,2,-1.],[11,13,1,1,2.]],threshold:7.2034963523037732e-005,right_val:0.5501788854598999,left_val:0.4799438118934631},{features:[[8,15,4,2,-1.],[8,16,4,1,2.]],threshold:-6.9267209619283676e-003,right_val:0.4698084890842438,left_val:0.6930009722709656},{features:[[6,9,8,8,-1.],[10,9,4,4,2.],[6,13,4,4,2.]],threshold:-7.6997838914394379e-003,right_val:0.5480883121490479,left_val:0.4099623858928680},{features:[[7,12,4,6,-1.],[7,12,2,3,2.],[9,15,2,3,2.]],threshold:-7.3130549862980843e-003,right_val:0.5057886242866516,left_val:0.3283475935459137},{features:[[10,11,3,1,-1.],[11,11,1,1,3.]],threshold:1.9650589674711227e-003,right_val:0.6398249864578247,left_val:0.4978047013282776},{features:[[9,7,2,10,-1.],[9,7,1,5,2.],[10,12,1,5,2.]],threshold:7.1647600270807743e-003,right_val:0.6222137212753296,left_val:0.4661160111427307},{features:[[8,0,6,6,-1.],[10,0,2,6,3.]],threshold:-0.0240786392241716,right_val:0.5222162008285523,left_val:0.2334644943475723},{features:[[3,11,2,6,-1.],[3,13,2,2,3.]],threshold:-0.0210279691964388,right_val:0.4938226044178009,left_val:0.1183653995394707},{features:[[16,12,1,2,-1.],[16,13,1,1,2.]],threshold:3.6017020465806127e-004,right_val:0.4116711020469666,left_val:0.5325019955635071},{features:[[1,14,6,6,-1.],[1,14,3,3,2.],[4,17,3,3,2.]],threshold:-0.0172197297215462,right_val:0.4664269089698792,left_val:0.6278762221336365},{features:[[13,1,3,6,-1.],[14,1,1,6,3.]],threshold:-7.8672142699360847e-003,right_val:0.5249736905097961,left_val:0.3403415083885193},{features:[[8,8,2,2,-1.],[8,9,2,1,2.]],threshold:-4.4777389848604798e-004,right_val:0.5086259245872498,left_val:0.3610411882400513},{features:[[9,9,3,3,-1.],[10,9,1,3,3.]],threshold:5.5486010387539864e-003,right_val:0.6203498244285584,left_val:0.4884265959262848},{features:[[8,7,3,3,-1.],[8,8,3,1,3.]],threshold:-6.9461148232221603e-003,right_val:0.5011097192764282,left_val:0.2625930011272430},{features:[[14,0,2,3,-1.],[14,0,1,3,2.]],threshold:1.3569870498031378e-004,right_val:0.5628312230110169,left_val:0.4340794980525971},{features:[[1,0,18,9,-1.],[7,0,6,9,3.]],threshold:-0.0458802506327629,right_val:0.4696274995803833,left_val:0.6507998704910278},{features:[[11,5,4,15,-1.],[11,5,2,15,2.]],threshold:-0.0215825606137514,right_val:0.5287616848945618,left_val:0.3826502859592438},{features:[[5,5,4,15,-1.],[7,5,2,15,2.]],threshold:-0.0202095396816731,right_val:0.5074477195739746,left_val:0.3233368098735809},{features:[[14,0,2,3,-1.],[14,0,1,3,2.]],threshold:5.8496710844337940e-003,right_val:0.4489670991897583,left_val:0.5177603960037231},{features:[[4,0,2,3,-1.],[5,0,1,3,2.]],threshold:-5.7476379879517481e-005,right_val:0.5246363878250122,left_val:0.4020850956439972},{features:[[11,12,2,2,-1.],[12,12,1,1,2.],[11,13,1,1,2.]],threshold:-1.1513100471347570e-003,right_val:0.4905154109001160,left_val:0.6315072178840637},{features:[[7,12,2,2,-1.],[7,12,1,1,2.],[8,13,1,1,2.]],threshold:1.9862831104546785e-003,right_val:0.6497151255607605,left_val:0.4702459871768951},{features:[[12,0,3,4,-1.],[13,0,1,4,3.]],threshold:-5.2719512023031712e-003,right_val:0.5227652788162231,left_val:0.3650383949279785},{features:[[4,11,3,3,-1.],[4,12,3,1,3.]],threshold:1.2662699446082115e-003,right_val:0.3877618014812470,left_val:0.5166100859642029},{features:[[12,7,4,2,-1.],[12,8,4,1,2.]],threshold:-6.2919440679252148e-003,right_val:0.5023847818374634,left_val:0.7375894188880920},{features:[[8,10,3,2,-1.],[9,10,1,2,3.]],threshold:6.7360111279413104e-004,right_val:0.5495585799217224,left_val:0.4423226118087769},{features:[[9,9,3,2,-1.],[10,9,1,2,3.]],threshold:-1.0523450328037143e-003,right_val:0.4859583079814911,left_val:0.5976396203041077},{features:[[8,9,3,2,-1.],[9,9,1,2,3.]],threshold:-4.4216238893568516e-004,right_val:0.4398930966854096,left_val:0.5955939292907715},{features:[[12,0,3,4,-1.],[13,0,1,4,3.]],threshold:1.1747940443456173e-003,right_val:0.4605058133602142,left_val:0.5349888205528259},{features:[[5,0,3,4,-1.],[6,0,1,4,3.]],threshold:5.2457437850534916e-003,right_val:0.2941577136516571,left_val:0.5049191117286682},{features:[[4,14,12,4,-1.],[10,14,6,2,2.],[4,16,6,2,2.]],threshold:-0.0245397202670574,right_val:0.5218586921691895,left_val:0.2550177872180939},{features:[[8,13,2,3,-1.],[8,14,2,1,3.]],threshold:7.3793041519820690e-004,right_val:0.5490816235542297,left_val:0.4424861073493958},{features:[[10,10,3,8,-1.],[10,14,3,4,2.]],threshold:1.4233799884095788e-003,right_val:0.4081355929374695,left_val:0.5319514274597168},{features:[[8,10,4,8,-1.],[8,10,2,4,2.],[10,14,2,4,2.]],threshold:-2.4149110540747643e-003,right_val:0.5238950252532959,left_val:0.4087659120559692},{features:[[10,8,3,1,-1.],[11,8,1,1,3.]],threshold:-1.2165299849584699e-003,right_val:0.4908052980899811,left_val:0.5674579143524170},{features:[[9,12,1,6,-1.],[9,15,1,3,2.]],threshold:-1.2438809499144554e-003,right_val:0.5256118178367615,left_val:0.4129425883293152},{features:[[10,8,3,1,-1.],[11,8,1,1,3.]],threshold:6.1942739412188530e-003,right_val:0.7313653230667114,left_val:0.5060194134712219},{features:[[7,8,3,1,-1.],[8,8,1,1,3.]],threshold:-1.6607169527560472e-003,right_val:0.4596369862556458,left_val:0.5979632139205933},{features:[[5,2,15,14,-1.],[5,9,15,7,2.]],threshold:-0.0273162592202425,right_val:0.5308842062950134,left_val:0.4174365103244782},{features:[[2,1,2,10,-1.],[2,1,1,5,2.],[3,6,1,5,2.]],threshold:-1.5845570014789701e-003,right_val:0.4519486129283905,left_val:0.5615804791450501},{features:[[14,14,2,3,-1.],[14,15,2,1,3.]],threshold:-1.5514739789068699e-003,right_val:0.5360785126686096,left_val:0.4076187014579773},{features:[[2,7,3,3,-1.],[3,7,1,3,3.]],threshold:3.8446558755822480e-004,right_val:0.5430442094802856,left_val:0.4347293972969055},{features:[[17,4,3,3,-1.],[17,5,3,1,3.]],threshold:-0.0146722598001361,right_val:0.5146093964576721,left_val:0.1659304946660996},{features:[[0,4,3,3,-1.],[0,5,3,1,3.]],threshold:8.1608882173895836e-003,right_val:0.1884745955467224,left_val:0.4961819052696228},{features:[[13,5,6,2,-1.],[16,5,3,1,2.],[13,6,3,1,2.]],threshold:1.1121659772470593e-003,right_val:0.6093816161155701,left_val:0.4868263900279999},{features:[[4,19,12,1,-1.],[8,19,4,1,3.]],threshold:-7.2603770531713963e-003,right_val:0.4690375924110413,left_val:0.6284325122833252},{features:[[12,12,2,4,-1.],[12,14,2,2,2.]],threshold:-2.4046430189628154e-004,right_val:0.4046044051647186,left_val:0.5575000047683716},{features:[[3,15,1,3,-1.],[3,16,1,1,3.]],threshold:-2.3348190006799996e-004,right_val:0.5252848267555237,left_val:0.4115762114524841},{features:[[11,16,6,4,-1.],[11,16,3,4,2.]],threshold:5.5736480280756950e-003,right_val:0.5690100789070129,left_val:0.4730072915554047},{features:[[2,10,3,10,-1.],[3,10,1,10,3.]],threshold:0.0306237693876028,right_val:0.1740095019340515,left_val:0.4971886873245239},{features:[[12,8,2,4,-1.],[12,8,1,4,2.]],threshold:9.2074798885732889e-004,right_val:0.4354872107505798,left_val:0.5372117757797241},{features:[[6,8,2,4,-1.],[7,8,1,4,2.]],threshold:-4.3550739064812660e-005,right_val:0.4347316920757294,left_val:0.5366883873939514},{features:[[10,14,2,3,-1.],[10,14,1,3,2.]],threshold:-6.6452710889279842e-003,right_val:0.5160533189773560,left_val:0.3435518145561218},{features:[[5,1,10,3,-1.],[10,1,5,3,2.]],threshold:0.0432219989597797,right_val:0.7293652892112732,left_val:0.4766792058944702},{features:[[10,7,3,2,-1.],[11,7,1,2,3.]],threshold:2.2331769578158855e-003,right_val:0.5633171200752258,left_val:0.5029315948486328},{features:[[5,6,9,2,-1.],[8,6,3,2,3.]],threshold:3.1829739455133677e-003,right_val:0.5192136764526367,left_val:0.4016092121601105},{features:[[9,8,2,2,-1.],[9,9,2,1,2.]],threshold:-1.8027749320026487e-004,right_val:0.5417919754981995,left_val:0.4088315963745117},{features:[[2,11,16,6,-1.],[2,11,8,3,2.],[10,14,8,3,2.]],threshold:-5.2934689447283745e-003,right_val:0.5243561863899231,left_val:0.4075677096843720},{features:[[12,7,2,2,-1.],[13,7,1,1,2.],[12,8,1,1,2.]],threshold:1.2750959722325206e-003,right_val:0.6387010812759399,left_val:0.4913282990455627},{features:[[9,5,2,3,-1.],[9,6,2,1,3.]],threshold:4.3385322205722332e-003,right_val:0.2947346866130829,left_val:0.5031672120094299},{features:[[9,7,3,2,-1.],[10,7,1,2,3.]],threshold:8.5250744596123695e-003,right_val:0.6308869123458862,left_val:0.4949789047241211},{features:[[5,1,8,12,-1.],[5,7,8,6,2.]],threshold:-9.4266352243721485e-004,right_val:0.4285649955272675,left_val:0.5328366756439209},{features:[[13,5,2,2,-1.],[13,6,2,1,2.]],threshold:1.3609660090878606e-003,right_val:0.5941501259803772,left_val:0.4991525113582611},{features:[[5,5,2,2,-1.],[5,6,2,1,2.]],threshold:4.4782509212382138e-004,right_val:0.5854480862617493,left_val:0.4573504030704498},{features:[[12,4,3,3,-1.],[12,5,3,1,3.]],threshold:1.3360050506889820e-003,right_val:0.5849052071571350,left_val:0.4604358971118927},{features:[[4,14,2,3,-1.],[4,15,2,1,3.]],threshold:-6.0967548051849008e-004,right_val:0.5229423046112061,left_val:0.3969388902187347},{features:[[12,4,3,3,-1.],[12,5,3,1,3.]],threshold:-2.3656780831515789e-003,right_val:0.4898357093334198,left_val:0.5808320045471191},{features:[[5,4,3,3,-1.],[5,5,3,1,3.]],threshold:1.0734340175986290e-003,right_val:0.5470039248466492,left_val:0.4351210892200470},{features:[[9,14,2,6,-1.],[10,14,1,3,2.],[9,17,1,3,2.]],threshold:2.1923359017819166e-003,right_val:0.3842903971672058,left_val:0.5355060100555420},{features:[[8,14,3,2,-1.],[9,14,1,2,3.]],threshold:5.4968618787825108e-003,right_val:0.2827191948890686,left_val:0.5018138885498047},{features:[[9,5,6,6,-1.],[11,5,2,6,3.]],threshold:-0.0753688216209412,right_val:0.5148826837539673,left_val:0.1225076019763947},{features:[[5,5,6,6,-1.],[7,5,2,6,3.]],threshold:0.0251344703137875,right_val:0.7025446295738220,left_val:0.4731766879558563},{features:[[13,13,1,2,-1.],[13,14,1,1,2.]],threshold:-2.9358599931583740e-005,right_val:0.4656086862087250,left_val:0.5430532097816467},{features:[[0,2,10,2,-1.],[0,3,10,1,2.]],threshold:-5.8355910005047917e-004,right_val:0.5190119743347168,left_val:0.4031040072441101},{features:[[13,13,1,2,-1.],[13,14,1,1,2.]],threshold:-2.6639450807124376e-003,right_val:0.5161771178245544,left_val:0.4308126866817474},{features:[[5,7,2,2,-1.],[5,7,1,1,2.],[6,8,1,1,2.]],threshold:-1.3804089976474643e-003,right_val:0.4695515930652618,left_val:0.6219829916954041},{features:[[13,5,2,7,-1.],[13,5,1,7,2.]],threshold:1.2313219485804439e-003,right_val:0.4425831139087677,left_val:0.5379363894462585},{features:[[6,13,1,2,-1.],[6,14,1,1,2.]],threshold:-1.4644179827882908e-005,right_val:0.4222503006458283,left_val:0.5281640291213989},{features:[[11,0,3,7,-1.],[12,0,1,7,3.]],threshold:-0.0128188095986843,right_val:0.5179932713508606,left_val:0.2582092881202698},{features:[[0,3,2,16,-1.],[0,3,1,8,2.],[1,11,1,8,2.]],threshold:0.0228521898388863,right_val:0.7609264254570007,left_val:0.4778693020343781},{features:[[11,0,3,7,-1.],[12,0,1,7,3.]],threshold:8.2305970136076212e-004,right_val:0.4671724140644074,left_val:0.5340992212295532},{features:[[6,0,3,7,-1.],[7,0,1,7,3.]],threshold:0.0127701200544834,right_val:0.1472366005182266,left_val:0.4965761005878449},{features:[[11,16,8,4,-1.],[11,16,4,4,2.]],threshold:-0.0500515103340149,right_val:0.5016592144966126,left_val:0.6414994001388550},{features:[[1,16,8,4,-1.],[5,16,4,4,2.]],threshold:0.0157752707600594,right_val:0.5685362219810486,left_val:0.4522320032119751},{features:[[13,5,2,7,-1.],[13,5,1,7,2.]],threshold:-0.0185016207396984,right_val:0.5137959122657776,left_val:0.2764748930931091},{features:[[5,5,2,7,-1.],[6,5,1,7,2.]],threshold:2.4626250378787518e-003,right_val:0.3795408010482788,left_val:0.5141941905021668},{features:[[18,6,2,14,-1.],[18,13,2,7,2.]],threshold:0.0629161670804024,right_val:0.6580433845520020,left_val:0.5060648918151856},{features:[[6,10,3,4,-1.],[6,12,3,2,2.]],threshold:-2.1648500478477217e-005,right_val:0.4019886851310730,left_val:0.5195388197898865},{features:[[14,7,1,2,-1.],[14,8,1,1,2.]],threshold:2.1180990152060986e-003,right_val:0.5954458713531494,left_val:0.4962365031242371},{features:[[0,1,18,6,-1.],[0,1,9,3,2.],[9,4,9,3,2.]],threshold:-0.0166348908096552,right_val:0.5175446867942810,left_val:0.3757933080196381},{features:[[14,7,1,2,-1.],[14,8,1,1,2.]],threshold:-2.8899470344185829e-003,right_val:0.5057178735733032,left_val:0.6624013781547546},{features:[[0,6,2,14,-1.],[0,13,2,7,2.]],threshold:0.0767832621932030,right_val:0.8047714829444885,left_val:0.4795796871185303},{features:[[17,0,3,12,-1.],[18,0,1,12,3.]],threshold:3.9170677773654461e-003,right_val:0.5719941854476929,left_val:0.4937882125377655},{features:[[0,6,18,3,-1.],[0,7,18,1,3.]],threshold:-0.0726706013083458,right_val:0.4943903982639313,left_val:0.0538945607841015},{features:[[6,0,14,16,-1.],[6,8,14,8,2.]],threshold:0.5403950214385986,right_val:0.1143338978290558,left_val:0.5129774212837219},{features:[[0,0,3,12,-1.],[1,0,1,12,3.]],threshold:2.9510019812732935e-003,right_val:0.5698574185371399,left_val:0.4528343975543976},{features:[[13,0,3,7,-1.],[14,0,1,7,3.]],threshold:3.4508369863033295e-003,right_val:0.4218730926513672,left_val:0.5357726812362671},{features:[[5,7,1,2,-1.],[5,8,1,1,2.]],threshold:-4.2077939724549651e-004,right_val:0.4637925922870636,left_val:0.5916172862052918},{features:[[14,4,6,6,-1.],[14,6,6,2,3.]],threshold:3.3051050268113613e-003,right_val:0.4382042884826660,left_val:0.5273385047912598},{features:[[5,7,7,2,-1.],[5,8,7,1,2.]],threshold:4.7735060798004270e-004,right_val:0.5181884765625000,left_val:0.4046528041362763},{features:[[8,6,6,9,-1.],[8,9,6,3,3.]],threshold:-0.0259285103529692,right_val:0.5089386105537415,left_val:0.7452235817909241},{features:[[5,4,6,1,-1.],[7,4,2,1,3.]],threshold:-2.9729790985584259e-003,right_val:0.5058795213699341,left_val:0.3295435905456543},{features:[[13,0,6,4,-1.],[16,0,3,2,2.],[13,2,3,2,2.]],threshold:5.8508329093456268e-003,right_val:0.5793024897575378,left_val:0.4857144057750702},{features:[[1,2,18,12,-1.],[1,6,18,4,3.]],threshold:-0.0459675192832947,right_val:0.5380653142929077,left_val:0.4312731027603149},{features:[[3,2,17,12,-1.],[3,6,17,4,3.]],threshold:0.1558596044778824,right_val:0.1684713959693909,left_val:0.5196170210838318},{features:[[5,14,7,3,-1.],[5,15,7,1,3.]],threshold:0.0151648297905922,right_val:0.6735026836395264,left_val:0.4735757112503052},{features:[[10,14,1,3,-1.],[10,15,1,1,3.]],threshold:-1.0604249546304345e-003,right_val:0.4775702953338623,left_val:0.5822926759719849},{features:[[3,14,3,3,-1.],[3,15,3,1,3.]],threshold:6.6476291976869106e-003,right_val:0.2319535017013550,left_val:0.4999198913574219},{features:[[14,4,6,6,-1.],[14,6,6,2,3.]],threshold:-0.0122311301529408,right_val:0.5262982249259949,left_val:0.4750893115997315},{features:[[0,4,6,6,-1.],[0,6,6,2,3.]],threshold:5.6528882123529911e-003,right_val:0.3561818897724152,left_val:0.5069767832756043},{features:[[12,5,4,3,-1.],[12,6,4,1,3.]],threshold:1.2977829901501536e-003,right_val:0.5619062781333923,left_val:0.4875693917274475},{features:[[4,5,4,3,-1.],[4,6,4,1,3.]],threshold:0.0107815898954868,right_val:0.6782308220863342,left_val:0.4750770032405853},{features:[[18,0,2,6,-1.],[18,2,2,2,3.]],threshold:2.8654779307544231e-003,right_val:0.4290736019611359,left_val:0.5305461883544922},{features:[[8,1,4,9,-1.],[10,1,2,9,2.]],threshold:2.8663428965955973e-003,right_val:0.5539351105690002,left_val:0.4518479108810425},{features:[[6,6,8,2,-1.],[6,6,4,2,2.]],threshold:-5.1983320154249668e-003,right_val:0.5434188842773438,left_val:0.4149119853973389},{features:[[6,5,4,2,-1.],[6,5,2,1,2.],[8,6,2,1,2.]],threshold:5.3739990107715130e-003,right_val:0.6507657170295715,left_val:0.4717896878719330},{features:[[10,5,2,3,-1.],[10,6,2,1,3.]],threshold:-0.0146415298804641,right_val:0.5161777138710022,left_val:0.2172164022922516},{features:[[9,5,1,3,-1.],[9,6,1,1,3.]],threshold:-1.5042580344015732e-005,right_val:0.4298836886882782,left_val:0.5337383747100830},{features:[[9,10,2,2,-1.],[9,11,2,1,2.]],threshold:-1.1875660129589960e-004,right_val:0.5582447052001953,left_val:0.4604594111442566},{features:[[0,8,4,3,-1.],[0,9,4,1,3.]],threshold:0.0169955305755138,right_val:0.0738800764083862,left_val:0.4945895075798035},{features:[[6,0,8,6,-1.],[6,3,8,3,2.]],threshold:-0.0350959412753582,right_val:0.4977591037750244,left_val:0.7005509138107300},{features:[[1,0,6,4,-1.],[1,0,3,2,2.],[4,2,3,2,2.]],threshold:2.4217350874096155e-003,right_val:0.5477694272994995,left_val:0.4466265141963959},{features:[[13,0,3,7,-1.],[14,0,1,7,3.]],threshold:-9.6340337768197060e-004,right_val:0.5313338041305542,left_val:0.4714098870754242},{features:[[9,16,2,2,-1.],[9,17,2,1,2.]],threshold:1.6391130338888615e-004,right_val:0.5342242121696472,left_val:0.4331546127796173},{features:[[11,4,6,10,-1.],[11,9,6,5,2.]],threshold:-0.0211414601653814,right_val:0.5204498767852783,left_val:0.2644700109958649},{features:[[0,10,19,2,-1.],[0,11,19,1,2.]],threshold:8.7775202700868249e-004,right_val:0.4152742922306061,left_val:0.5208349823951721},{features:[[9,5,8,9,-1.],[9,8,8,3,3.]],threshold:-0.0279439203441143,right_val:0.5018811821937561,left_val:0.6344125270843506},{features:[[4,0,3,7,-1.],[5,0,1,7,3.]],threshold:6.7297378554940224e-003,right_val:0.3500863909721375,left_val:0.5050438046455383},{features:[[8,6,4,12,-1.],[10,6,2,6,2.],[8,12,2,6,2.]],threshold:0.0232810396701097,right_val:0.6968677043914795,left_val:0.4966318011283875},{features:[[0,2,6,4,-1.],[0,4,6,2,2.]],threshold:-0.0116449799388647,right_val:0.5049629807472229,left_val:0.3300260007381439},{features:[[8,15,4,3,-1.],[8,16,4,1,3.]],threshold:0.0157643090933561,right_val:0.7321153879165649,left_val:0.4991598129272461},{features:[[8,0,3,7,-1.],[9,0,1,7,3.]],threshold:-1.3611479662358761e-003,right_val:0.5160670876502991,left_val:0.3911735117435455},{features:[[9,5,3,4,-1.],[10,5,1,4,3.]],threshold:-8.1522337859496474e-004,right_val:0.4949719011783600,left_val:0.5628911256790161},{features:[[8,5,3,4,-1.],[9,5,1,4,3.]],threshold:-6.0066272271797061e-004,right_val:0.4550595879554749,left_val:0.5853595137596130},{features:[[7,6,6,1,-1.],[9,6,2,1,3.]],threshold:4.9715518252924085e-004,right_val:0.5443599224090576,left_val:0.4271470010280609},{features:[[7,14,4,4,-1.],[7,14,2,2,2.],[9,16,2,2,2.]],threshold:2.3475370835512877e-003,right_val:0.3887656927108765,left_val:0.5143110752105713},{features:[[13,14,4,6,-1.],[15,14,2,3,2.],[13,17,2,3,2.]],threshold:-8.9261569082736969e-003,right_val:0.4971720874309540,left_val:0.6044502258300781},{features:[[7,8,1,8,-1.],[7,12,1,4,2.]],threshold:-0.0139199104160070,right_val:0.5000367760658264,left_val:0.2583160996437073},{features:[[16,0,2,8,-1.],[17,0,1,4,2.],[16,4,1,4,2.]],threshold:1.0209949687123299e-003,right_val:0.5560358166694641,left_val:0.4857374131679535},{features:[[2,0,2,8,-1.],[2,0,1,4,2.],[3,4,1,4,2.]],threshold:-2.7441629208624363e-003,right_val:0.4645777046680450,left_val:0.5936884880065918},{features:[[6,1,14,3,-1.],[6,2,14,1,3.]],threshold:-0.0162001308053732,right_val:0.5193495154380798,left_val:0.3163014948368073},{features:[[7,9,3,10,-1.],[7,14,3,5,2.]],threshold:4.3331980705261230e-003,right_val:0.3458878993988037,left_val:0.5061224102973938},{features:[[9,14,2,2,-1.],[9,15,2,1,2.]],threshold:5.8497930876910686e-004,right_val:0.5870177745819092,left_val:0.4779017865657806},{features:[[7,7,6,8,-1.],[7,11,6,4,2.]],threshold:-2.2466450463980436e-003,right_val:0.5374773144721985,left_val:0.4297851026058197},{features:[[9,7,3,6,-1.],[9,10,3,3,2.]],threshold:2.3146099410951138e-003,right_val:0.4640969932079315,left_val:0.5438671708106995},{features:[[7,13,3,3,-1.],[7,14,3,1,3.]],threshold:8.7679121643304825e-003,right_val:0.6771789789199829,left_val:0.4726893007755280},{features:[[9,9,2,2,-1.],[9,10,2,1,2.]],threshold:-2.2448020172305405e-004,right_val:0.5428048968315125,left_val:0.4229173064231873},{features:[[0,1,18,2,-1.],[6,1,6,2,3.]],threshold:-7.4336021207273006e-003,right_val:0.4683673977851868,left_val:0.6098880767822266},{features:[[7,1,6,14,-1.],[7,8,6,7,2.]],threshold:-2.3189240600913763e-003,right_val:0.4424242079257965,left_val:0.5689436793327332},{features:[[1,9,18,1,-1.],[7,9,6,1,3.]],threshold:-2.1042178850620985e-003,right_val:0.5187087059020996,left_val:0.3762221038341522},{features:[[9,7,2,2,-1.],[9,7,1,2,2.]],threshold:4.6034841216169298e-004,right_val:0.5771207213401794,left_val:0.4699405133724213},{features:[[9,3,2,9,-1.],[10,3,1,9,2.]],threshold:1.0547629790380597e-003,right_val:0.5601701736450195,left_val:0.4465216994285584},{features:[[18,14,2,3,-1.],[18,15,2,1,3.]],threshold:8.7148818420246243e-004,right_val:0.3914709091186523,left_val:0.5449805259704590},{features:[[7,11,3,1,-1.],[8,11,1,1,3.]],threshold:3.3364820410497487e-004,right_val:0.5645738840103149,left_val:0.4564009010791779},{features:[[10,8,3,4,-1.],[11,8,1,4,3.]],threshold:-1.4853250468149781e-003,right_val:0.4692778885364533,left_val:0.5747377872467041},{features:[[7,14,3,6,-1.],[8,14,1,6,3.]],threshold:3.0251620337367058e-003,right_val:0.3762814104557037,left_val:0.5166196823120117},{features:[[10,8,3,4,-1.],[11,8,1,4,3.]],threshold:5.0280741415917873e-003,right_val:0.6151527166366577,left_val:0.5002111792564392},{features:[[7,8,3,4,-1.],[8,8,1,4,3.]],threshold:-5.8164511574432254e-004,right_val:0.4390751123428345,left_val:0.5394598245620728},{features:[[7,9,6,9,-1.],[7,12,6,3,3.]],threshold:0.0451415292918682,right_val:0.2063035964965820,left_val:0.5188326835632324},{features:[[0,14,2,3,-1.],[0,15,2,1,3.]],threshold:-1.0795620037242770e-003,right_val:0.5137907266616821,left_val:0.3904685080051422},{features:[[11,12,1,2,-1.],[11,13,1,1,2.]],threshold:1.5995999274309725e-004,right_val:0.5427504181861877,left_val:0.4895322918891907},{features:[[4,3,8,3,-1.],[8,3,4,3,2.]],threshold:-0.0193592701107264,right_val:0.4773507118225098,left_val:0.6975228786468506},{features:[[0,4,20,6,-1.],[0,4,10,6,2.]],threshold:0.2072550952434540,right_val:0.3034991919994354,left_val:0.5233635902404785},{features:[[9,14,1,3,-1.],[9,15,1,1,3.]],threshold:-4.1953290929086506e-004,right_val:0.4460186064243317,left_val:0.5419396758079529},{features:[[8,14,4,3,-1.],[8,15,4,1,3.]],threshold:2.2582069505006075e-003,right_val:0.6027408838272095,left_val:0.4815764129161835},{features:[[0,15,14,4,-1.],[0,17,14,2,2.]],threshold:-6.7811207845807076e-003,right_val:0.5183305740356445,left_val:0.3980278968811035},{features:[[1,14,18,6,-1.],[1,17,18,3,2.]],threshold:0.0111543098464608,right_val:0.4188759922981262,left_val:0.5431231856346130},{features:[[0,0,10,6,-1.],[0,0,5,3,2.],[5,3,5,3,2.]],threshold:0.0431624315679073,right_val:0.6522961258888245,left_val:0.4738228023052216}],threshold:105.7611007690429700}],size:[20,20],tilted:false};
})(jsfeat.haar);
var jsfeat_face = function(video, maxWorkSize) {
  var videoWidth = video.width;
  var videoHeight = video.height;

  var classifier = jsfeat.haar.frontalface;

  // scale down canvas we do detection on (to reduce noisy detections)
  var scale = Math.min(maxWorkSize/videoWidth, maxWorkSize/videoHeight);
  var w = (videoWidth*scale)|0;
  var h = (videoHeight*scale)|0;

  var img_u8 = new jsfeat.matrix_t(w, h, jsfeat.U8_t | jsfeat.C1_t);
  var edg = new jsfeat.matrix_t(w, h, jsfeat.U8_t | jsfeat.C1_t);
  var work_canvas = document.createElement('canvas');
  work_canvas.width = w;
  work_canvas.height = h;
  var work_ctx = work_canvas.getContext('2d');
  var ii_sum = new Int32Array((w+1)*(h+1));
  var ii_sqsum = new Int32Array((w+1)*(h+1));
  var ii_tilted = new Int32Array((w+1)*(h+1));
  var ii_canny = new Int32Array((w+1)*(h+1));

  this.findFace = function (params) {
    work_ctx.drawImage(video, 0, 0, work_canvas.width, work_canvas.height);
    var imageData = work_ctx.getImageData(0, 0, work_canvas.width, work_canvas.height);

    jsfeat.imgproc.grayscale(imageData.data, work_canvas.width, work_canvas.height, img_u8);

    // possible params
    if(params.equalizeHistogram) {
      jsfeat.imgproc.equalize_histogram(img_u8, img_u8);
    }
    //jsfeat.imgproc.gaussian_blur(img_u8, img_u8, 3);

    jsfeat.imgproc.compute_integral_image(img_u8, ii_sum, ii_sqsum, classifier.tilted ? ii_tilted : null);

    if(params.useCanny) {
      jsfeat.imgproc.canny(img_u8, edg, 10, 50);
      jsfeat.imgproc.compute_integral_image(edg, ii_canny, null, null);
    }

    jsfeat.haar.edgesDensity = params.edgesDensity;
    var rects = jsfeat.haar.detect_multi_scale(ii_sum, ii_sqsum, ii_tilted, params.useCanny? ii_canny : null, img_u8.cols, img_u8.rows, classifier, params.scaleFactor, params.minScale);
    rects = jsfeat.haar.group_rectangles(rects, 1);

    var rl = rects.length;

    if(rl == 0) {
      return false;
    }

    var best = rects[0];
    for (var i = 1; i < rl; i++) {
      if (rects[i].neighbors > best.neighbors) {
        best = rects[i]
      } else if (rects[i].neighbors == best.neighbors) {
        // if (rects[i].width > best.width) best = rects[i]; // use biggest rect
        if (rects[i].confidence > best.confidence) best = rects[i]; // use most confident rect
      }
    }

    var sc = videoWidth / img_u8.cols;
    best.x = (best.x*sc)|0;
    best.y = (best.y*sc)|0;
    best.width = (best.width*sc)|0;
    best.height = (best.height*sc)|0;

    return best;
  }
}
"use strict";
/*
 * MOSSE correlation filter
 *
 * Optional parameters to constructor:
 *   drawResponse {canvasElement} : draws the correlation filter output on the given canvas element (default is none)
 *   psrThreshold {number} : peak-to-sidelobe-ratio threshold to use when updating filter while tracking (default is 10)
 *   eta {number} : adjusts how much new input affects the mosse filter, when updating filter while tracking
 *     number should be between 0 and 1 (default is 0.1)
 *   convertToGrayscale {boolean} : whether to convert canvas output to grayscale (default is true)
 *     if this is set to false, we assume all channels are equal and only grab values from red channel
 *
 * @author auduno / github.com/auduno
 */ 

function mosseFilter(params) {
    
    var _filter, _top, _bottom;
    var _fft;
    var _w,_h;
    var _im_part;
    var _arrlen;
    var _cc;
    var _image_array;
    
    this.psr_prev = undefined;
    this.peak_prev = undefined;
    var peak = 0.0;
    var updateable = false;
    
    if (!params) params = {};
    // setup of canvas for drawing responses, if given
    if (params.drawResponse === undefined) {
        params.drawResponse = false;
    } else {
        if (params.drawResponse.tagName != 'CANVAS') {
            params.drawResponse = false;
        } else {
            var responseContext = params.drawResponse.getContext('2d');
        }
    }
    if (params.psrThreshold === undefined) params.psrThreshold = 10;
    if (params.eta === undefined) params.eta = 0.10;
    if (params.convertToGrayscale === undefined) params.convertToGrayscale = true;
    
    this.load = function(filter) {
        // initialize filter width and height
        _w = filter.width;
        _h = filter.height;
        _arrlen = _w*_h;
        _filter = [filter.real, filter.imag];
        // handling top and bottom when they're not present
        if (filter.top && filter.bottom) {
          updateable = true;
          _top = [filter.top.real, filter.top.imag];
          _bottom = [filter.bottom.real, filter.bottom.imag];
        }
        
        // initialize fft to given width
        _fft = new FFT();
        _fft.init(filter.width);
        
        // set up temporary variables
        if(typeof Float64Array !== 'undefined') {
            _im_part = new Float64Array(_arrlen);
            _image_array = new Float64Array(_arrlen);
        } else {
            _im_part = new Array(_arrlen);
            _image_array = new Array(_arrlen);
        }
        var canvas = document.createElement("canvas");
        canvas.setAttribute('width', _w);
        canvas.setAttribute('height', _h);
        _cc = canvas.getContext('2d');
    }
    
    this.init = function(w,h) {
        // initialize filter width and height for a blank filter
        _w = w;
        _h = h;
        _arrlen = _w*_h;
        
        _filter = [[],[]];
        _top = [[],[]];
        _bottom = [[],[]];
        for (var i = 0;i < _arrlen;i++) {
            _filter[0][i] = 0;
            _filter[1][i] = 0;
            _top[0][i] = 0;
            _top[1][i] = 0;
            _bottom[0][i] = 0;
            _bottom[1][i] = 0;
        }
        updateable = true;
        
        // initialize fft to given width
        _fft = new FFT();
        _fft.init(w);
        
        // set up temporary variables
        if(typeof Float64Array !== 'undefined') {
            _im_part = new Float64Array(_arrlen);
        } else {
            _im_part = new Array(_arrlen);
        }
        var canvas = document.createElement("canvas");
        canvas.setAttribute('width', _w);
        canvas.setAttribute('height', _h);
        _cc = canvas.getContext('2d');
    }
    
    // fft function
    this.fft = function(array) {
        // not in-place
        
        var cn = new Array(_arrlen);
        for (var i = 0;i < _arrlen;i++) {
          cn[i] = 0.0;
        }
        
        _fft.fft2d(array,cn)
        return [array, cn];
    }
    
    // fft function
    this.fft_inplace = function(array) {
        // in-place
        
        for (var i = 0;i < _arrlen;i++) {
          _im_part[i] = 0.0;
        }
        
        _fft.fft2d(array,_im_part)
        return [array, _im_part];
    }
    
    this.ifft = function(rn, cn) {
        // in-place
        _fft.ifft2d(rn, cn);
        return rn;
    }

    // peak to sidelobe ratio function (optional)
    this.psr = function(array) {
        // proper
        var sum = 0;
        var max = 0;
        var maxpos = [];
        var sdo = 0;
        var val;
        for (var x = 0;x < _w;x++) {
            for (var y = 0;y < _h;y++) {
                val = array[(y*_w)+x];
                sum += val;
                sdo += (val*val);
                if (max < val) {
                    max = val;
                    maxpos = [x,y];
                }
            }
        }
        
        // subtract values around peak
        for (var x = -5;x < 6;x++) {
            for (var y = -5;y < 6;y++) {
                if (Math.sqrt(x*x+y*y) < 5) {
                    val = array[((maxpos[1]+y)*_w)+(maxpos[0]+x)]
                    sdo -= (val*val);
                    sum -= val;
                }
            }
        }
        
        var mean = sum/array.length;
        var sd = Math.sqrt((sdo/array.length)-(mean*mean));
        
        // get mean/variance of output around peak
        var psr = (max-mean)/sd;
        return psr;
    }
    
    this.getResponse = function(imageData) {
        // in-place
        
        // preprocess
        var prepImage = preprocess(imageData);
        prepImage = cosine_window(prepImage);
        
        // filter
        var res = this.fft_inplace(prepImage);
        
        // elementwise multiplication with filter
        complex_mult_inplace(res, _filter);
        
        // do inverse 2d fft
        var filtered = this.ifft(res[0],res[1]);
        return filtered;
    }
    
    this.track = function(input, left, top, width, height, updateFilter, gaussianPrior, calcPSR) {
        // finds position of filter in input image
        
        if (!_filter) {
            console.log("Mosse-filter needs to be initialized or trained before starting tracking.");
            return false;
        }
        
        if (input.tagName == "VIDEO" || input.tagName == "IMG") {
            // scale selection according to original source image
            var videoLeft = Math.round((left/input.width)*input.videoWidth);
            var videoTop = Math.round((top/input.height)*input.videoHeight);
            var videoWidth = Math.round((width/input.width)*input.videoWidth);
            var videoHeight = Math.round((height/input.height)*input.videoHeight);
            _cc.drawImage(input, videoLeft, videoTop, videoWidth, videoHeight, 0, 0, _w, _h);
        } else if (input.tagName == "CANVAS") {
            _cc.drawImage(input, left, top, width, height, 0, 0, _w, _h);
        }
        
        var image = _cc.getImageData(0,0,_w,_h);
        var id = image.data;
        
        if (params.convertToGrayscale) {
            // convert to grayscale
            for (var i = 0;i < _arrlen;i++) {
                _image_array[i] = id[(4*i)]*0.3;
                _image_array[i] += id[(4*i)+1]*0.59;
                _image_array[i] += id[(4*i)+2]*0.11;
            } 
        } else {
            // use only one channel
            for (var i = 0;i < _arrlen;i++) {
                _image_array[i] = id[(4*i)];
            } 
        }
        
        // preprocess
        var prepImage = preprocess(_image_array);
        prepImage = cosine_window(prepImage);
        
        // filter
        var res = this.fft_inplace(prepImage);
        // elementwise multiplication with filter
        var nures = complex_mult(res, _filter);
        // do inverse 2d fft
        var filtered = this.ifft(nures[0],nures[1]);
        
        // find max and min
        var max = 0;
        var min = 0;
        var maxpos = [];
        
        //method using centered gaussian prior
        if (gaussianPrior) {
            var prior, dx, dy;
            var variance = 128;
            for (var x = 0;x < _w;x++) {
                for (var y = 0;y < _h;y++) {
                    dx = x - _w/2;
                    dy = y - _h/2;
                    prior = Math.exp(-0.5*((dx*dx)+(dy*dy))/variance)
                    if ((filtered[(y*_w)+x]*prior) > max) {
                        max = filtered[(y*_w)+x]*prior;
                        maxpos = [x,y];
                    }
                    if (filtered[(y*_w)+x] < min) {
                        min = filtered[(y*_w)+x];
                    }
                }
            }
        } else {
            for (var x = 0;x < _w;x++) {
                for (var y = 0;y < _h;y++) {
                    if (filtered[(y*_w)+x] > max) {
                        max = filtered[(y*_w)+x];
                        maxpos = [x,y];
                    }
                    if (filtered[(y*_w)+x] < min) {
                        min = filtered[(y*_w)+x];
                    }
                }
            }
        }
        this.peak_prev = max;
        
        if (params.drawResponse) {
            // draw response
            var diff = max-min;
            var dc = document.createElement('canvas');
            dc.setAttribute('width', 32);
            dc.setAttribute('height', 32);
            var dcc = dc.getContext('2d');
            var psci = dcc.createImageData(32, 32);
            var pscidata = psci.data;
            for (var j = 0;j < 32*32;j++) {
                //draw with priors
                //var val = filtered[j]*Math.exp(-0.5*(((j%_w - _w/2)*(j%_w -_w/2))+((Math.floor(j/_h)-(_h/2))*(Math.floor(j/_h)-(_h/2))))/128);
                var val = filtered[j];
                val = Math.round((val+Math.abs(min))*(255/diff));
                pscidata[j*4] = val;
                pscidata[(j*4)+1] = val;
                pscidata[(j*4)+2] = val;
                pscidata[(j*4)+3] = 255;
            }
            dcc.putImageData(psci, 0, 0);
            responseContext.drawImage(dc, left, top, width, width);
        }
        
        if (calcPSR) {
          this.psr_prev = this.psr(filtered);
        }
        
        if (updateFilter) {
            if (!updateable) {
                console.log("The loaded filter does not support updating. Ignoring parameter 'updateFilter'.");
            } else {
                if (calcPSR) {
                  var psr = this.psr_prev;
                } else {
                  var psr = this.psr(filtered);
                }
                
                if (psr > params.psrThreshold) {
                    // create target
                    var target = [];
                    var nux = maxpos[0];
                    var nuy = maxpos[1];
                    for (var x = 0;x < _w;x++) {
                        for (var y = 0;y < _h;y++) {
                            target[(y*_w)+x] = Math.exp(-(((x-nux)*(x-nux))+((y-nuy)*(y-nuy)))/(2*2));
                        }
                    }
                    
                    //fft target
                    target = this.fft(target);
                    
                    // create filter
                    var res_conj = complex_conj(res);
                    var fuTop = complex_mult(target,res_conj);
                    var fuBottom = complex_mult(res,res_conj);
                    
                    // add up
                    var eta = params.eta;
                    for (var i = 0;i < _arrlen;i++) {
                        _top[0][i] = eta*fuTop[0][i] + (1-eta)*_top[0][i];
                        _top[1][i] = eta*fuTop[1][i] + (1-eta)*_top[1][i];
                        _bottom[0][i] = eta*fuBottom[0][i] + (1-eta)*_bottom[0][i];
                        _bottom[1][i] = eta*fuBottom[1][i] + (1-eta)*_bottom[1][i];
                    }
                    
                    _filter = complex_div(_top,_bottom);
                }
            }
        }
        
        /*if (psr < 5) {
          maxpos = [_w/2,_h/2]; 
        }*/
        
        maxpos[0] = maxpos[0]*(width/_w);
        maxpos[1] = maxpos[1]*(width/_h);
        
        // check if output is strong enough
        // if not, return false?
        if (max < 0) {
          return false;
        } else {
          return maxpos;
        }
    }
    
    this.train = function(input, left, top, width, height) {
        
        if (!updateable) {
          console.log("The loaded filter does not support updating. Unable to do training.");
          return false;
        }
        
        if (input.tagName == "VIDEO" || input.tagName == "IMG") {
            // scale selection according to original source image
            var videoLeft = Math.round((left/input.width)*input.videoWidth);
            var videoTop = Math.round((top/input.height)*input.videoHeight);
            var videoWidth = Math.round((width/input.width)*input.videoWidth);
            var videoHeight = Math.round((height/input.height)*input.videoHeight);
            _cc.drawImage(input, videoLeft, videoTop, videoWidth, videoHeight, 0, 0, _w, _h);
        } else if (input.tagName == "CANVAS") {
            _cc.drawImage(input, left, top, width, height, 0, 0, _w, _h);
        }
        
        var image = _cc.getImageData(0,0,_w,_h);
        var id = image.data;
         
        // convert to grayscale
        for (var i = 0;i < _arrlen;i++) {
            _image_array[i] = id[(4*i)]*0.3;
            _image_array[i] += id[(4*i)+1]*0.59;
            _image_array[i] += id[(4*i)+2]*0.11;
        }
        
        // preprocess
        var prepImage = preprocess(_image_array);
        prepImage = cosine_window(prepImage);
        
        // create target
        var target = [];
        var nux = _w/2;
        var nuy = _h/2;
        for (var x = 0;x < _w;x++) {
            for (var y = 0;y < _h;y++) {
                target[(y*_w)+x] = Math.exp(-(((x-nux)*(x-nux))+((y-nuy)*(y-nuy)))/(2*2));
            }
        }
        
        //fft target
        target = this.fft(target);
        
        // filter
        var res = this.fft(prepImage);
        // create filter
        var res_conj = complex_conj(res);
        var fuTop = complex_mult(target,res_conj);
        var fuBottom = complex_mult(res,res_conj);
        
        // add up
        var eta = params.eta;
        for (var i = 0;i < _arrlen;i++) {
            _top[0][i] = eta*fuTop[0][i] + (1-eta)*_top[0][i];
            _top[1][i] = eta*fuTop[1][i] + (1-eta)*_top[1][i];
            _bottom[0][i] = eta*fuBottom[0][i] + (1-eta)*_bottom[0][i];
            _bottom[1][i] = eta*fuBottom[1][i] + (1-eta)*_bottom[1][i];
        }
        
        _filter = complex_div(_top,_bottom);
        
        return true;
    }
    
    var preprocess = function(array) {
        // in-place
        
        // log adjusting
        for (var i = 0;i < _arrlen;i++) {
          array[i] = Math.log(array[i]+1);
        }
        
        // normalize to mean 0 and norm 1
        var mean = 0;
        for (var i = 0;i < _arrlen;i++) {
          mean += array[i];
        }
        mean /= _arrlen;
        
        for (var i = 0;i < _arrlen;i++) {
          array[i] -= mean;
        }
        var norm = 0.0;
        for (var i = 0;i < _arrlen;i++) {
          norm += (array[i]*array[i]);
        }
        norm = Math.sqrt(norm);
        for (var i = 0;i < _arrlen;i++) {
          array[i] /= norm;
        }
        
        return array;
    }
    
    var cosine_window = function(array) {
        // calculate rect cosine window (in-place)
        var pos = 0;
        for (var i = 0;i < _w;i++) {
            for (var j = 0;j < _h;j++) {
                //pos = (i%_w)+(j*_w);
                var cww = Math.sin((Math.PI*i)/(_w-1))
                var cwh = Math.sin((Math.PI*j)/(_h-1))
                array[pos] = Math.min(cww,cwh)*array[pos];
                pos++;
            }
        }
        
        return array;
    }
    
    var complex_mult = function(cn1, cn2) {
        // not in-place
        var re_part = new Array(_w);
        var im_part = new Array(_w);
        var nucn = [re_part, im_part];
        for (var r = 0;r < _arrlen;r++) {
            nucn[0][r] = (cn1[0][r]*cn2[0][r]) - (cn1[1][r]*cn2[1][r]);
            nucn[1][r] = (cn1[0][r]*cn2[1][r]) + (cn1[1][r]*cn2[0][r]);
        }
        return nucn;
    }
    
    var complex_mult_inplace = function(cn1, cn2) {
        // in-place
        var temp1, temp2;
        for (var r = 0;r < _arrlen;r++) {
            temp1 = (cn1[0][r]*cn2[0][r]) - (cn1[1][r]*cn2[1][r]);
            temp2 = (cn1[0][r]*cn2[1][r]) + (cn1[1][r]*cn2[0][r]);
            cn1[0][r] = temp1;
            cn1[1][r] = temp2;
        }
    }
    
    var complex_conj = function(cn) {
        // not in-place (TODO)
        var nucn = [[],[]];
        for (var i = 0;i < _arrlen;i++) {
            nucn[0][i] = cn[0][i]
            nucn[1][i] = -cn[1][i];
        }
        return nucn;
    }
    
    var complex_div = function(cn1, cn2) {
        // not in-place (TODO)
        var nucn = [[],[]];
        for (var r = 0;r < _arrlen;r++) {
            nucn[0][r] = ((cn1[0][r]*cn2[0][r])+(cn1[1][r]*cn2[1][r])) / ((cn2[0][r]*cn2[0][r]) + (cn2[1][r]*cn2[1][r]));
            nucn[1][r] = ((cn1[1][r]*cn2[0][r])-(cn1[0][r]*cn2[1][r])) / ((cn2[0][r]*cn2[0][r]) + (cn2[1][r]*cn2[1][r]));
        }
        return nucn;
    }
}

/**
 * Fast Fourier Transform
 * 1D-FFT/IFFT, 2D-FFT/IFFT (radix-2)
 * 
 * @author ryo / github.com/wellflat
 * Based on https://github.com/wellflat/jslib with some tiny optimizations
 */

function FFT() {
  
  var _n = 0,          // order
      _bitrev = null,  // bit reversal table
      _cstb = null;    // sin/cos table
  var _tre, _tim;
  
  this.init = function (n) {
    if(n !== 0 && (n & (n - 1)) === 0) {
      _n = n;
      _setVariables();
      _makeBitReversal();
      _makeCosSinTable();
    } else {
      throw new Error("init: radix-2 required");
    }
  }
    
  // 1D-FFT
  this.fft1d = function (re, im) {
    fft(re, im, 1);
  }
    
  // 1D-IFFT
  this.ifft1d = function (re, im) {
    var n = 1/_n;
    fft(re, im, -1);
    for(var i=0; i<_n; i++) {
      re[i] *= n;
      im[i] *= n;
    }
  }
  
  // 2D-FFT
  this.fft2d = function (re, im) {
    var i = 0;
    // x-axis
    for(var y=0; y<_n; y++) {
      i = y*_n;
      for(var x1=0; x1<_n; x1++) {
        _tre[x1] = re[x1 + i];
        _tim[x1] = im[x1 + i];
      }
      this.fft1d(_tre, _tim);
      for(var x2=0; x2<_n; x2++) {
        re[x2 + i] = _tre[x2];
        im[x2 + i] = _tim[x2];
      }
    }
    // y-axis
    for(var x=0; x<_n; x++) {
      for(var y1=0; y1<_n; y1++) {
        i = x + y1*_n;
        _tre[y1] = re[i];
        _tim[y1] = im[i];
      }
      this.fft1d(_tre, _tim);
      for(var y2=0; y2<_n; y2++) {
        i = x + y2*_n;
        re[i] = _tre[y2];
        im[i] = _tim[y2];
      }
    }
  }
  
  // 2D-IFFT
  this.ifft2d = function (re, im) {
    var i = 0;
    // x-axis
    for(var y=0; y<_n; y++) {
      i = y*_n;
      for(var x1=0; x1<_n; x1++) {
        _tre[x1] = re[x1 + i];
        _tim[x1] = im[x1 + i];
      }
      this.ifft1d(_tre, _tim);
      for(var x2=0; x2<_n; x2++) {
        re[x2 + i] = _tre[x2];
        im[x2 + i] = _tim[x2];
      }
    }
    // y-axis
    for(var x=0; x<_n; x++) {
      for(var y1=0; y1<_n; y1++) {
        i = x + y1*_n;
        _tre[y1] = re[i];
        _tim[y1] = im[i];
      }
      this.ifft1d(_tre, _tim);
      for(var y2=0; y2<_n; y2++) {
        i = x + y2*_n;
        re[i] = _tre[y2];
        im[i] = _tim[y2];
      }
    }
  }
  
  // core operation of FFT
  function fft(re, im, inv) {
    var d, h, ik, m, tmp, wr, wi, xr, xi,
        n4 = _n >> 2;
    // bit reversal
    for(var l=0; l<_n; l++) {
      m = _bitrev[l];
      if(l < m) {
        tmp = re[l];
        re[l] = re[m];
        re[m] = tmp;
        tmp = im[l];
        im[l] = im[m];
        im[m] = tmp;
      }
    }
    // butterfly operation
    for(var k=1; k<_n; k<<=1) {
      h = 0;
      d = _n/(k << 1);
      for(var j=0; j<k; j++) {
        wr = _cstb[h + n4];
        wi = inv*_cstb[h];
        for(var i=j; i<_n; i+=(k<<1)) {
          ik = i + k;
          xr = wr*re[ik] + wi*im[ik];
          xi = wr*im[ik] - wi*re[ik];
          re[ik] = re[i] - xr;
          re[i] += xr;
          im[ik] = im[i] - xi;
          im[i] += xi;
        }
        h += d;
      }
    }
  }
  
  // set variables
  function _setVariables() {
    if(typeof Uint8Array !== 'undefined') {
      _bitrev = new Uint8Array(_n);
    } else {
      _bitrev = new Array(_n);
    }
    if(typeof Float64Array !== 'undefined') {
      _cstb = new Float64Array(_n*1.25);
      _tre = new Float64Array(_n*_n);
      _tim = new Float64Array(_n*_n);
    } else {
      _cstb = new Array(_n*1.25);
      _tre = new Array(_n*_n);
      _tim = new Array(_n*_n);
    }
  }
  
  // make bit reversal table
  function _makeBitReversal() {
    var i = 0,
        j = 0,
        k = 0;
    _bitrev[0] = 0;
    while(++i < _n) {
      k = _n >> 1;
      while(k <= j) {
        j -= k;
        k >>= 1;
      }
      j += k;
      _bitrev[i] = j;
    }
  }
  
  // make trigonometric function table
  function _makeCosSinTable() {
    var n2 = _n >> 1,
        n4 = _n >> 2,
        n8 = _n >> 3,
        n2p4 = n2 + n4,
        t = Math.sin(Math.PI/_n),
        dc = 2*t*t,
        ds = Math.sqrt(dc*(2 - dc)),
        c = _cstb[n4] = 1,
        s = _cstb[0] = 0;
    t = 2*dc;
    for(var i=1; i<n8; i++) {
      c -= dc;
      dc += t*c;
      s += ds;
      ds -= t*s;
      _cstb[i] = s;
      _cstb[n4 - i] = c;
    }
    if(n8 !== 0) {
      _cstb[n8] = Math.sqrt(0.5);
    }
    for(var j=0; j<n4; j++) {
      _cstb[n2 - j]  = _cstb[j];
    }
    for(var k=0; k<n2p4; k++) {
      _cstb[k + n2] = -_cstb[k];
    }
  }
}
