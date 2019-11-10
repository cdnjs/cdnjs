
/*
	Captionator 0.6 [CaptionPlanet]
	Christopher Giffard, 2011
	Share and enjoy

	https://github.com/cgiffard/Captionator
*/
/*global HTMLVideoElement: true, NodeList: true, Audio: true, HTMLElement: true, document:true, window:true, XMLHttpRequest:true, navigator:true, VirtualMediaContainer:true */
/*jshint strict:true */
/*Tab indented, tab = 4 spaces*/


/* Build date: Fri Jan 25 2013 15:37:24 GMT+1100 (EST) */

;(function(){
	"use strict";

	//	Variables you might want to tweak
	var minimumFontSize = 10;				//	We don't want the type getting any smaller than this.
	var minimumLineHeight = 16;				//	As above, in points
	var fontSizeVerticalPercentage = 4.5;	//	Caption font size is 4.5% of the video height
	var lineHeightRatio = 1.5;				//	Caption line height is 1.3 times the font size
	var cueBackgroundColour	= [0,0,0,0.5];	//	R,G,B,A
	var objectsCreated = false;				//	We don't want to create objects twice, or instanceof won't work
	
	var captionator = {};
	window.captionator = captionator;

	
	
	// Captionator internal cue structure object
	/**
	* @constructor
	*/
	captionator.CaptionatorCueStructure = function CaptionatorCueStructure(cueSource,options) {
		var cueStructureObject = this;
		this.isTimeDependent = false;
		this.cueSource = cueSource;
		this.options = options;
		this.processedCue = null;
		this.toString = function toString(currentTimestamp) {
			if (options.processCueHTML !== false) {
				var processLayer = function(layerObject,depth) {
					if (cueStructureObject.processedCue === null) {
						var compositeHTML = "", itemIndex, cueChunk;
						for (itemIndex in layerObject) {
							if (itemIndex.match(/^\d+$/) && layerObject.hasOwnProperty(itemIndex)) {
								// We're not a prototype function or local property, and we're in range
								cueChunk = layerObject[itemIndex];
								// Don't generate text from the token if it has no contents
								if (cueChunk instanceof Object && cueChunk.children && cueChunk.children.length) {
									if (cueChunk.token === "v") {
										compositeHTML +="<q data-voice=\"" + cueChunk.voice.replace(/[\"]/g,"") + "\" class='voice " +
														"speaker-" + cueChunk.voice.replace(/[^a-z0-9]+/ig,"-").toLowerCase() + " webvtt-span' " + 
														"title=\"" + cueChunk.voice.replace(/[\"]/g,"") + "\">" +
														processLayer(cueChunk.children,depth+1) +
														"</q>";
									} else if(cueChunk.token === "c") {
										compositeHTML +="<span class='webvtt-span webvtt-class-span " + cueChunk.classes.join(" ") + "'>" +
														processLayer(cueChunk.children,depth+1) +
														"</span>";
									} else if(cueChunk.timeIn > 0) {
										// If a timestamp is unspecified, or the timestamp suggests this token is valid to display, return it
										if ((currentTimestamp === null || currentTimestamp === undefined) ||
											(currentTimestamp > 0 && currentTimestamp >= cueChunk.timeIn)) {
									
											compositeHTML +="<span class='webvtt-span webvtt-timestamp-span' " +
															"data-timestamp='" + cueChunk.token + "' data-timestamp-seconds='" + cueChunk.timeIn + "'>" +
															processLayer(cueChunk.children,depth+1) +
															"</span>";
											
										} else if (currentTimestamp < cueChunk.timeIn) {
											// Deliver tag hidden, with future class
											compositeHTML +="<span class='webvtt-span webvtt-timestamp-span webvtt-cue-future' aria-hidden='true' style='opacity: 0;' " +
															"data-timestamp='" + cueChunk.token + "' data-timestamp-seconds='" + cueChunk.timeIn + "'>" +
															processLayer(cueChunk.children,depth+1) +
															"</span>";
										}
									} else {
										compositeHTML +=cueChunk.rawToken +
														processLayer(cueChunk.children,depth+1) +
														"</" + cueChunk.token + ">";
									}
								} else if (cueChunk instanceof String || typeof(cueChunk) === "string" || typeof(cueChunk) === "number") {
									compositeHTML += cueChunk;
								} else {
									// Didn't match - file a bug!
								}
							}
						}
						
						if (!cueStructureObject.isTimeDependent && depth === 0) {
							cueStructureObject.processedCue = compositeHTML;
						}
					
						return compositeHTML;
					} else {
						return cueStructureObject.processedCue;
					}
				};
				return processLayer(this,0);
			} else {
				return cueSource;
			}
		};
		
		// Now you can get the plain text out of CaptionatorCueStructure.
		// Runs through the parse tree, ignoring tags and just returning the inner text.
		// If you've got processCueHTML explicitly set to false, then it removes HTML tags from the
		// result using a regex.
		
		this.getPlain = function(currentTimestamp) {
			if (options.processCueHTML !== false) {
				var processLayer = function(layerObject,depth) {
					var compositePlain = "", itemIndex, cueChunk;
					for (itemIndex in layerObject) {
						if (itemIndex.match(/^\d+$/) && layerObject.hasOwnProperty(itemIndex)) {
							// We're not a prototype function or local property, and we're in range
							cueChunk = layerObject[itemIndex];
							// Don't generate text from the token if it has no contents
							if (cueChunk instanceof Object && cueChunk.children && cueChunk.children.length) {
								if (cueChunk.timeIn > 0) {
									// If a timestamp is unspecified, or the timestamp suggests this token is valid to display, return it
									if ((currentTimestamp === null || currentTimestamp === undefined) ||
										(currentTimestamp > 0 && currentTimestamp >= cueChunk.timeIn)) {
									
										compositePlain += processLayer(cueChunk.children,depth+1);
									}
								} else {
									compositePlain += processLayer(cueChunk.children,depth+1);
								}
							} else if (cueChunk instanceof String || typeof(cueChunk) === "string" || typeof(cueChunk) === "number") {
								compositePlain += cueChunk;
							}
						}
					}
					
					return compositePlain;
				};
				return processLayer(this,0);
			} else {
				return cueSource.replace(/<[^>]*>/ig,"");
			}
		};
	};
	captionator.CaptionatorCueStructure.prototype = [];
	
	

	
	
	// Set up objects & types
	// As defined by http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html
	/**
	* @constructor
	*/
	captionator.TextTrack = function TextTrack(id,kind,label,language,trackSource,isDefault) {
	
		this.onload = function () {};
		this.onerror = function() {};
		this.oncuechange = function() {};
	
		this.id = id || "";
		this.internalMode = captionator.TextTrack.OFF;
		this.cues = new captionator.TextTrackCueList(this);
		this.activeCues = new captionator.ActiveTextTrackCueList(this.cues,this);
		this.kind = kind || "subtitles";
		this.label = label || "";
		this.language = language || "";
		this.src = trackSource || "";
		this.readyState = captionator.TextTrack.NONE;
		this.internalDefault = isDefault || false;
		
		// Create getters and setters for mode
		this.getMode = function() {
			return this.internalMode;
		};
		
		this.setMode = function(value) {
			var allowedModes = [captionator.TextTrack.OFF,captionator.TextTrack.HIDDEN,captionator.TextTrack.SHOWING], containerID, container;
			if (allowedModes.indexOf(value) !== -1) {
				if (value !== this.internalMode) {
					this.internalMode = value;
			
					if (this.readyState === captionator.TextTrack.NONE && this.src.length > 0 && value > captionator.TextTrack.OFF) {
						this.loadTrack(this.src,null);
					}
					
					// Refresh all captions on video
					this.videoNode._captionator_dirtyBit = true;
					captionator.rebuildCaptions(this.videoNode);
				
					if (value === captionator.TextTrack.OFF) {
						// make sure the resource is reloaded next time (Is this correct behaviour?)
						this.cues.length = 0; // Destroy existing cue data (bugfix)
						this.readyState = captionator.TextTrack.NONE;
					}
				}
			} else {
				throw new Error("Illegal mode value for track: " + value);
			}
		};
	
		// Create getter for default
		this.getDefault = function() {
			return this.internalDefault;
		};
	
		if (Object.prototype.__defineGetter__) {
			this.__defineGetter__("mode", this.getMode);
			this.__defineSetter__("mode", this.setMode);
			this.__defineGetter__("default", this.getDefault);
		} else if (Object.defineProperty) {
			Object.defineProperty(this,"mode",
				{get: this.getMode, set: this.setMode}
			);
			Object.defineProperty(this,"default",
				{get: this.getDefault}
			);
		}
	
		this.loadTrack = function(source, callback) {
			var captionData, ajaxObject = new XMLHttpRequest();
			if (this.readyState === captionator.TextTrack.LOADED) {
				if (callback instanceof Function) {
					callback(captionData);
				}
			} else {
				this.src = source;
				this.readyState = captionator.TextTrack.LOADING;
			
				var currentTrackElement = this;
				ajaxObject.open('GET', source, true);
				ajaxObject.onreadystatechange = function (eventData) {
					if (ajaxObject.readyState === 4) {
						if(ajaxObject.status === 200) {
							var TrackProcessingOptions = currentTrackElement.videoNode._captionatorOptions || {};
							if (currentTrackElement.kind === "metadata") {
								// People can load whatever data they please into metadata tracks.
								// Don't process it.
								TrackProcessingOptions.processCueHTML = false;
								TrackProcessingOptions.sanitiseCueHTML = false;
							}
							
							captionData = captionator.parseCaptions(ajaxObject.responseText,TrackProcessingOptions);
							currentTrackElement.readyState = captionator.TextTrack.LOADED;
							currentTrackElement.cues.loadCues(captionData);
							currentTrackElement.activeCues.refreshCues.apply(currentTrackElement.activeCues);
							currentTrackElement.videoNode._captionator_dirtyBit = true;
							captionator.rebuildCaptions(currentTrackElement.videoNode);
							currentTrackElement.onload.call(this);
						
							if (callback instanceof Function) {
								callback.call(currentTrackElement,captionData);
							}
						} else {
							// Throw error handler, if defined
							currentTrackElement.readyState = captionator.TextTrack.ERROR;
							currentTrackElement.onerror();
						}
					}
				};
				try {
					ajaxObject.send(null);
				} catch(Error) {
					// Throw error handler, if defined
					currentTrackElement.readyState = captionator.TextTrack.ERROR;
					currentTrackElement.onerror(Error);
				}
			}
		};
	
		// mutableTextTrack.addCue(cue)
		// Adds the given cue to mutableTextTrack's text track list of cues.
		// Raises an exception if the argument is null, associated with another text track, or already in the list of cues.
	
		this.addCue = function(cue) {
			if (cue && cue instanceof captionator.TextTrackCue) {
				this.cues.addCue(cue);
			} else {
				throw new Error("The argument is null or not an instance of TextTrackCue.");
			}
		};
	
		// mutableTextTrack.removeCue(cue)
		// Removes the given cue from mutableTextTrack's text track list of cues.
		// Raises an exception if the argument is null, associated with another text track, or not in the list of cues.
	
		this.removeCue = function() {
		
		};
	};
	
	// Define constants for TextTrack.readyState
	captionator.TextTrack.NONE = 0;
	captionator.TextTrack.LOADING = 1;
	captionator.TextTrack.LOADED = 2;
	captionator.TextTrack.ERROR = 3;
	// Define constants for TextTrack.mode
	captionator.TextTrack.OFF = 0;
	captionator.TextTrack.HIDDEN = 1;
	captionator.TextTrack.SHOWING = 2;
	
	

	
	
	/**
	* @constructor
	*/
	captionator.TextTrackCue = function TextTrackCue(id, startTime, endTime, text, settings, pauseOnExit, track) {
		// Set up internal data store
		this.id = id;
		this.track = track instanceof captionator.TextTrack ? track : null;
		this.startTime = parseFloat(startTime);
		this.endTime = parseFloat(endTime) >= this.startTime ? parseFloat(endTime) : this.startTime;
		this.text = typeof(text) === "string" || text instanceof captionator.CaptionatorCueStructure ? text : "";
		this.settings = typeof(settings) === "string" ? settings : "";
		this.intSettings = {};
		this.pauseOnExit = !!pauseOnExit;
		this.wasActive = false;
	
		// Parse settings & set up cue defaults
	
		// A writing direction, either horizontal (a line extends horizontally and is positioned vertically,
		// with consecutive lines displayed below each other), vertical growing left (a line extends vertically
		// and is positioned horizontally, with consecutive lines displayed to the left of each other), or
		// vertical growing right (a line extends vertically and is positioned horizontally, with consecutive
		// lines displayed to the right of each other).
		// Values:
		// horizontal, vertical, vertical-lr
		this.direction = "horizontal";
	
		// A boolean indicating whether the line's position is a line position (positioned to a multiple of the
		// line dimensions of the first line of the cue), or whether it is a percentage of the dimension of the video.
		this.snapToLines = true;
	
		// Either a number giving the position of the lines of the cue, to be interpreted as defined by the
		// writing direction and snap-to-lines flag of the cue, or the special value auto, which means the
		// position is to depend on the other active tracks.
		this.linePosition = "auto";
	
		// A number giving the position of the text of the cue within each line, to be interpreted as a percentage
		// of the video, as defined by the writing direction.
		this.textPosition = 50;
	
		// A number giving the size of the box within which the text of each line of the cue is to be aligned, to
		// be interpreted as a percentage of the video, as defined by the writing direction.
		this.size = 0;
	
		// An alignment for the text of each line of the cue, either start alignment (the text is aligned towards its
		// start side), middle alignment (the text is aligned centered between its start and end sides), end alignment
		// (the text is aligned towards its end side). Which sides are the start and end sides depends on the
		// Unicode bidirectional algorithm and the writing direction. [BIDI]
		// Values:
		// start, middle, end
		this.alignment = "middle";
	
		// Parse VTT Settings...
		if (this.settings.length) {
			var intSettings = this.intSettings;
			var currentCue = this;
			settings = settings.split(/\s+/).filter(function(settingItem) { return settingItem.length > 0;});
			if (settings instanceof Array) {
				settings.forEach(function(cueItem) {
					var settingMap = {"D":"direction","L":"linePosition","T":"textPosition","A":"alignment","S":"size"};
					cueItem = cueItem.split(":");
					if (settingMap[cueItem[0]]) {
						intSettings[settingMap[cueItem[0]]] = cueItem[1];
					}
				
					if (settingMap[cueItem[0]] in currentCue) {
						currentCue[settingMap[cueItem[0]]] = cueItem[1];
					}
				});
			}
		}
		
		if (this.linePosition.match(/\%/)) {
			this.snapToLines = false;
		}
	
		// Functions defined by spec (getters, kindof)
		this.getCueAsSource = function getCueAsSource() {
			// Choosing the below line instead will mean that the raw, unprocessed source will be returned instead.
			// Not really sure which is the correct behaviour.
			// return this.text instanceof captionator.CaptionatorCueStructure? this.text.cueSource : this.text;
			return String(this.text);
		};
	
		this.getCueAsHTML = function getCueAsHTML() {
			var DOMFragment = document.createDocumentFragment();
			var DOMNode = document.createElement("div");
			DOMNode.innerHTML = String(this.text);
			
			Array.prototype.forEach.call(DOMNode.childNodes,function(child) {
				DOMFragment.appendChild(child.cloneNode(true));
			});
		
			return DOMFragment;
		};
	
		this.isActive = function() {
			var currentTime = 0;
			if (this.track instanceof captionator.TextTrack) {
				if ((this.track.mode === captionator.TextTrack.SHOWING || this.track.mode === captionator.TextTrack.HIDDEN) && this.track.readyState === captionator.TextTrack.LOADED) {
					try {
						currentTime = this.track.videoNode.currentTime;
						
						if (this.startTime <= currentTime && this.endTime >= currentTime) {
							// Fire enter event if we were not active and now are
							if (!this.wasActive) {
								this.wasActive = true;
								this.onenter();
							}
	
							return true;
						}
					} catch(Error) {
						return false;
					}
				}
			}
			
			// Fire exit event if we were active and now are not
			if (this.wasActive) {
				this.wasActive = false;
				this.onexit();
			}
	
			return false;
		};
	
		if (Object.prototype.__defineGetter__) {
			this.__defineGetter__("active", this.isActive);
		} else if (Object.defineProperty) {
			Object.defineProperty(this,"active",
				{get: this.isActive}
			);
		}
		
		this.toString = function toString() {
			return "TextTrackCue:" + this.id + "\n" + String(this.text);
		};
		
		// Events defined by spec
		this.onenter = function() {};
		this.onexit = function() {};
	};
	
	

	/**
	* @constructor
	*/
	captionator.TextTrackCueList = function TextTrackCueList(track) {
		this.track = track instanceof captionator.TextTrack ? track : null;
	
		this.getCueById = function(cueID) {
			return this.filter(function(currentCue) {
				return currentCue.id === cueID;
			})[0];
		};
	
		this.loadCues = function(cueData) {
			for (var cueIndex = 0; cueIndex < cueData.length; cueIndex ++) {
				cueData[cueIndex].track = this.track;
				Array.prototype.push.call(this,cueData[cueIndex]);
			}
		};
	
		this.addCue = function(cue) {
			if (cue && cue instanceof captionator.TextTrackCue) {
				if (cue.track === this.track || !cue.track) {
					// TODO: Check whether cue is already in list of cues.
					// TODO: Sort cue list based on TextTrackCue.startTime.
					Array.prototype.push.call(this,cue);
				} else {
					throw new Error("This cue is associated with a different track!");
				}
			} else {
				throw new Error("The argument is null or not an instance of TextTrackCue.");
			}
		};
	
		this.toString = function() {
			return "[TextTrackCueList]";
		};
	};
	captionator.TextTrackCueList.prototype = [];
	
	/**
	* @constructor
	*/
	captionator.ActiveTextTrackCueList = function ActiveTextTrackCueList(textTrackCueList,textTrack) {
		// Among active cues:
	
		// The text track cues of a media element's text tracks are ordered relative to each
		// other in the text track cue order, which is determined as follows: first group the
		// cues by their text track, with the groups being sorted in the same order as their
		// text tracks appear in the media element's list of text tracks; then, within each
		// group, cues must be sorted by their start time, earliest first; then, any cues with
		// the same start time must be sorted by their end time, earliest first; and finally,
		// any cues with identical end times must be sorted in the order they were created (so
		// e.g. for cues from a WebVTT file, that would be the order in which the cues were
		// listed in the file).
	
		this.refreshCues = function() {
			if (textTrackCueList.length) {
				var cueList = this;
				var cueListChanged = false;
				var oldCueList = [].slice.call(this,0);
				this.length = 0;
				
				textTrackCueList.forEach(function(cue) {
					if (cue.active) {
						cueList.push(cue);
	
						if (cueList[cueList.length-1] !== oldCueList[cueList.length-1]) {
							cueListChanged = true;
						}
					}
				});
	
				if (cueListChanged) {
					try {
						textTrack.oncuechange();
					} catch(error){}
				}
			}
		};
	
		this.toString = function() {
			return "[ActiveTextTrackCueList]";
		};
	
		this.refreshCues();
	};
	captionator.ActiveTextTrackCueList.prototype = new captionator.TextTrackCueList(null);

	/**
	* @constructor
	*/
	var VirtualMediaContainer = function(targetObject) {
		this.targetObject = targetObject;
		this.currentTime = 0;
		var timeupdateEventHandler = function() {};
	
		this.addEventListener = function(event,handler,ignore) {
			if (event === "timeupdate" && handler instanceof Function) {
				this.timeupdateEventHandler = handler;
			}
		};
	
		this.attachEvent = function(event,handler) {
			if (event === "timeupdate" && handler instanceof Function) {
				this.timeupdateEventHandler = handler;
			}
		};
	
		this.updateTime = function(newTime) {
			if (!isNaN(newTime)) {
				this.currentTime = newTime;
				timeupdateEventHandler();
			}
		};
		
		
	};

	/*
		captionator.rebuildCaptions(HTMLVideoElement videoElement)
	
		Loops through all the TextTracks for a given element and manages their display (including generation of container elements.)
	
		First parameter: HTMLVideoElement object with associated TextTracks
	
		RETURNS:
	
		Nothing.
	
	*/
	captionator.rebuildCaptions = function(videoElement) {
		var trackList = videoElement.textTracks || [];
		var options = videoElement._captionatorOptions instanceof Object ? videoElement._captionatorOptions : {};
		var currentTime = videoElement.currentTime;
		var compositeActiveCues = [];
		var cuesChanged = false;
		var activeCueIDs = [];
		var cueSortArray = [];
	
		// Work out what cues are showing...
		trackList.forEach(function(track,trackIndex) {
			if (track.mode === captionator.TextTrack.SHOWING && track.readyState === captionator.TextTrack.LOADED) {
				cueSortArray = [].slice.call(track.activeCues,0);
				
				// Do a reverse sort
				// Since the available cue render area is a square which decreases in size
				// (away from each side of the video) with each successive cue added,
				// and we want cues which are older to be displayed above cues which are newer,
				// we sort active cues within each track so that older ones are rendered first.
				
				cueSortArray = cueSortArray.sort(function(cueA, cueB) {
					if (cueA.startTime > cueB.startTime) {
						return -1;
					} else {
						return 1;
					}
				});
				
				compositeActiveCues = compositeActiveCues.concat(cueSortArray);
			}
		});
	
		// Determine whether cues have changed - we generate an ID based on track ID, cue ID, and text length
		activeCueIDs = compositeActiveCues.map(function(cue) {return cue.track.id + "." + cue.id + ":" + cue.text.toString(currentTime).length;});
		cuesChanged = !captionator.compareArray(activeCueIDs,videoElement._captionator_previousActiveCues);
		
		// If they've changed, we re-render our cue canvas.
		if (cuesChanged || videoElement._captionator_dirtyBit) {
			// If dirty bit was set, it certainly isn't now.
			videoElement._captionator_dirtyBit = false;
	
			// Destroy internal tracking variable (which is used for caption rendering)
			videoElement._captionator_availableCueArea = null;
			
			// Internal tracking variable to determine whether our composite active cue list for the video has changed
			videoElement._captionator_previousActiveCues = activeCueIDs;
			
			// Get the canvas ready if it isn't already
			captionator.styleCueCanvas(videoElement);
			
			// Clear old nodes from canvas
			var oldNodes =
				[].slice.call(videoElement._descriptionContainerObject.getElementsByTagName("div"),0)
				.concat([].slice.call(videoElement._containerObject.getElementsByTagName("div"),0));
			
			oldNodes.forEach(function(node) {
				// If the cue doesn't think it's active...
				if (node.cueObject && !node.cueObject.active) {
					
					// Mark cue as not rendered
					node.cueObject.rendered = false;
					
					// Delete node reference
					node.cueObject.domNode = null;
					
					// Delete node
					node.parentElement.removeChild(node);
				}
			});
		
			// Now we render the cues
			compositeActiveCues.forEach(function(cue) {
				var cueNode, cueInner;
				
				if (cue.track.kind !== "metadata" && cue.mode !== captionator.TextTrack.HIDDEN) {
				
					if (!cue.rendered) {
						// Create, ID, and Class all the bits
						cueNode = document.createElement("div");
						cueInner = document.createElement("span");
						cueInner.className = "captionator-cue-inner";
						cueNode.id = String(cue.id).length ? cue.id : captionator.generateID();
						cueNode.className = "captionator-cue";
						cueNode.appendChild(cueInner);
						cueNode.cueObject = cue;
						cue.domNode = cueNode;
					
						// Set the language
						// Will eventually move to a cue-granular method of specifying language
						cueNode.setAttribute("lang",cue.track.language);
					
						// Plonk the cue contents in
						cueNode.currentText = cue.text.toString(currentTime);
						cueInner.innerHTML = cueNode.currentText;
					
						// Mark cue as rendered
						cue.rendered = true;
				
						if (cue.track.kind === "descriptions") {
							// Append descriptions to the hidden descriptive canvas instead
							// No styling required for these.
							videoElement._descriptionContainerObject.appendChild(cueNode);
						} else {
							// Append everything else to the main cue canvas.
							videoElement._containerObject.appendChild(cueNode);
						}
					
					} else {
					
						// If the cue is already rendered, get the node out
						cueNode = cue.domNode;
						cueInner = cueNode.getElementsByClassName("captionator-cue-inner")[0];
					
						// But first check it to determine whether its own content has changed
						if (cue.text.toString(currentTime) !== cueNode.currentText) {
							cueNode.currentText = cue.text.toString(currentTime); 
							cueInner.innerHTML = cueNode.currentText;
						
							// Reset spanning pointer to maintain our layout
							cueInner.spanified = false;
						}
					}
				
					if (cue.track.kind !== "descriptions") {
						// Re-style cue...
						captionator.styleCue(cueNode,cue,videoElement);
					}
				}
			});
		}
	};

	/*
		captionator.captionify([selector string array | DOMElement array | selector string | singular dom element ],
								[defaultLanguage - string in BCP47],
								[options - JS Object])
	
		Adds closed captions to video elements. The first, second and third parameter are both optional.
	
		First parameter: Use an array of either DOMElements or selector strings (compatible with querySelectorAll.)
		All of these elements will be captioned if tracks are available. If this parameter is omitted, all video elements
		present in the DOM will be captioned if tracks are available.
	
		Second parameter: BCP-47 string for default language. If this parameter is omitted, the User Agent's language
		will be used to choose a track.
	
		Third parameter: as yet unused - will implement animation settings and some other global options with this
		parameter later.
	
	
		RETURNS:
	
		False on immediate failure due to input being malformed, otherwise true (even if the process fails later.)
		Because of the asynchronous download requirements, this function can't really return anything meaningful.
	
	
	*/
	captionator.captionify = function(element,defaultLanguage,options) {
		var videoElements = [], elementIndex = 0;
		options = options instanceof Object? options : {};
	
		// Override defaults if options are present...
		if (options.minimumFontSize && typeof(options.minimumFontSize) === "number") {
			minimumFontSize = options.minimumFontSize;
		}
	
		if (options.minimumLineHeight && typeof(options.minimumLineHeight) === "number") {
			minimumLineHeight = options.minimumLineHeight;
		}
		
		if (options.fontSizeVerticalPercentage && typeof(options.fontSizeVerticalPercentage) === "number") {
			fontSizeVerticalPercentage = options.fontSizeVerticalPercentage;
		}
		
		if (options.lineHeightRatio && typeof(options.lineHeightRatio) !== "number") {
			lineHeightRatio = options.lineHeightRatio;
		}
	
		if (options.cueBackgroundColour && options.cueBackgroundColour instanceof Array) {
			cueBackgroundColour = options.cueBackgroundColour;
		}
		
		/* Feature detection block */
		// VirtualMediaContainer is an element designed to provide a media interface to Captionator
		// where the browser doesn't support native HTML5 video (it might wrap a flash movie, for example)
		if (!HTMLVideoElement && !(element instanceof VirtualMediaContainer) && !options.forceCaptionify) {
			// Browser doesn't support HTML5 video - die here.
			return false;
		}
		
		// Browser supports native track API
		// This should catch Chrome latest and IE10.
		if ((typeof(document.createElement("video").addTextTrack) === "function" || typeof(document.createElement("video").addTrack) === "function") && !options.forceCaptionify) {
			return false;
		}
		
		// if requested by options, export the object types
		if (!objectsCreated && options.exportObjects) {
			window.TextTrack = captionator.TextTrack;
			window.TextTrackCueList = captionator.TextTrackCueList;
			window.ActiveTextTrackCueList = captionator.ActiveTextTrackCueList;
			window.TextTrackCue = captionator.TextTrackCue;
			
			// Next time captionator.captionify() is called, the objects are already available to us.
			objectsCreated = true;
		}
	
		if (!element || element === false || element === undefined || element === null) {
			videoElements = [].slice.call(document.getElementsByTagName("video"),0); // select and convert to array
		} else {
			if (element instanceof Array) {
				for (elementIndex = 0; elementIndex < element.length; elementIndex ++) {
					if (typeof(element[elementIndex]) === "string") {
						videoElements = videoElements.concat([].slice.call(document.querySelectorAll(element[elementIndex]),0)); // select and convert to array
					} else if (element[elementIndex].constructor === HTMLVideoElement) {
						videoElements.push(element[elementIndex]);
					}
				}
			} else if (typeof(element) === "string") {
				videoElements = [].slice.call(document.querySelectorAll(element),0); // select and convert to array
			} else if (element.constructor === HTMLVideoElement) {
				videoElements.push(element);
			}
		}
		
		if (videoElements.length) {
			videoElements.forEach(function(videoElement) {
				videoElement.addTextTrack = function(id,kind,label,language,src,type,isDefault) {
					var allowedKinds = ["subtitles","captions","descriptions","captions","metadata","chapters"]; // WHATWG SPEC
					
					var textKinds = allowedKinds.slice(0,7);
					var newTrack;
					id = typeof(id) === "string" ? id : "";
					label = typeof(label) === "string" ? label : "";
					language = typeof(language) === "string" ? language : "";
					isDefault = typeof(isDefault) === "boolean" ? isDefault : false; // Is this track set as the default?
	
					// If the kind isn't known, throw DOM syntax error exception
					if (!allowedKinds.filter(function (currentKind){
							return kind === currentKind ? true : false;
						}).length) {
						throw captionator.createDOMException(12,"DOMException 12: SYNTAX_ERR: You must use a valid kind when creating a TimedTextTrack.","SYNTAX_ERR");
	
					} else {
						newTrack = new captionator.TextTrack(id,kind,label,language,src,null);
						if (newTrack) {
							if (!(videoElement.textTracks instanceof Array)) {
								videoElement.textTracks = [];
							}
	
							videoElement.textTracks.push(newTrack);
							return newTrack;
						} else {
							return false;
						}
					}
				};
	
				captionator.processVideoElement(videoElements[elementIndex],defaultLanguage,options);
			});
	
			return true;
		} else {
			return false;
		}
	};

	/*
		captionator.parseCaptions(string captionData, object options)
	
		Accepts and parses SRT caption/subtitle data. Will extend for WebVTT shortly. Perhaps non-JSON WebVTT will work already?
		This function has been intended from the start to (hopefully) loosely parse both. I'll patch it as required.
	
		First parameter: Entire text data (UTF-8) of the retrieved SRT/WebVTT file. This parameter is mandatory. (really - what did
		you expect it was going to do without it!)
	
		Second parameter: Captionator internal options object. See the documentation for allowed values.
	
		RETURNS:
	
		An array of TextTrackCue Objects in initial state.
	*/
	
	
	
	
	captionator.parseCaptions = function(captionData, options) {
		// Be liberal in what you accept from others...
		options = options instanceof Object ? options : {};
		var fileType = "", subtitles = [];
		var cueStyles = "";
		var cueDefaults = [];
	
		// Set up timestamp parsers - SRT does WebVTT timestamps as well.
		var SUBTimestampParser			= /^(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\,(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s*(.*)/;
		var SBVTimestampParser			= /^(\d+)?:?(\d{2}):(\d{2})\.(\d+)\,(\d+)?:?(\d{2}):(\d{2})\.(\d+)\s*(.*)/;
		var SRTTimestampParser			= /^(\d{2})?:?(\d{2}):(\d{2})[\.\,](\d+)\s+\-\-\>\s+(\d{2})?:?(\d{2}):(\d{2})[\.\,](\d+)\s*(.*)/;
		var SRTChunkTimestampParser		= /(\d{2})?:?(\d{2}):(\d{2})[\.\,](\d+)/;
		var GoogleTimestampParser		= /^([\d\.]+)\s+\+([\d\.]+)\s*(.*)/;
		var LRCTimestampParser			= /^\[(\d{2})?:?(\d{2})\:(\d{2})\.(\d{2,3})\]\s*(.*?)$/;
		var WebVTTDEFAULTSCueParser		= /^(DEFAULTS|DEFAULT)\s+\-\-\>\s+(.*)/g;
		var WebVTTSTYLECueParser		= /^(STYLE|STYLES)\s+\-\-\>\s*\n([\s\S]*)/g;
		var WebVTTCOMMENTCueParser		= /^(COMMENT|COMMENTS)\s+\-\-\>\s+(.*)/g;
		var TTMLCheck					= /<tt\s+xml/ig;
		var TTMLTimestampParserAdv		= /^(\d{2})?:?(\d{2}):(\d{2})\.(\d+)/;
		var TTMLTimestampParserHuman	= /^([\d\.]+)[smhdwy]/ig; // Under development, will need to study TTML spec more. :)
		
		if (captionData) {
			// This function parses and validates cue HTML/VTT tokens, and converts them into something understandable to the renderer.
			var processCaptionHTML = function processCaptionHTML(inputHTML) {
				var cueStructure = new captionator.CaptionatorCueStructure(inputHTML,options),
					cueSplit = [],
					splitIndex,
					currentToken,
					currentContext,
					stack = [],
					stackIndex = 0,
					chunkTimestamp,
					timeData,
					lastCueTime; // Useful for LRC, which does not specify an end time
				
				var hasRealTextContent = function(textInput) {
					return !!textInput.replace(/[^a-z0-9]+/ig,"").length;
				};
				
				// Process out special cue spans
				cueSplit = inputHTML.split(/(<\/?[^>]+>)/ig);
				
				currentContext = cueStructure;
				for (splitIndex in cueSplit) {
					if (cueSplit.hasOwnProperty(splitIndex)) {
						currentToken = cueSplit[splitIndex];
						
						if (currentToken.substr(0,1) === "<") {
							if (currentToken.substr(1,1) === "/") {
								// Closing tag
								var TagName = currentToken.substr(2).split(/[\s>]+/g)[0];
								if (stack.length > 0) {
									// Scan backwards through the stack to determine whether we've got an open tag somewhere to close.
									var stackScanDepth = 0;
									for (stackIndex = stack.length-1; stackIndex >= 0; stackIndex --) {
										var parentContext = stack[stackIndex][stack[stackIndex].length-1];
										stackScanDepth = stackIndex;
										if (parentContext.token === TagName) { break; }
									}
								
									currentContext = stack[stackScanDepth];
									stack = stack.slice(0,stackScanDepth);
								} else {
									// Tag mismatch!
								}
							} else {
								// Opening Tag
								// Check whether the tag is valid according to the WebVTT specification
								// If not, don't allow it (unless the sanitiseCueHTML option is explicitly set to false)
							
								if ((	currentToken.substr(1).match(SRTChunkTimestampParser)	||
										currentToken.match(/^<v\s+[^>]+>/i)						||
										currentToken.match(/^<c[a-z0-9\-\_\.]+>/)				||
										currentToken.match(/^<(b|i|u|ruby|rt)>/))				||
									options.sanitiseCueHTML !== false) {
									
									var tmpObject = {
										"token":	currentToken.replace(/[<\/>]+/ig,"").split(/[\s\.]+/)[0],
										"rawToken":	currentToken,
										"children":	[]
									};
									
									if (tmpObject.token === "v") {
										tmpObject.voice = currentToken.match(/^<v\s*([^>]+)>/i)[1];
									} else if (tmpObject.token === "c") {
										tmpObject.classes = currentToken
																.replace(/[<\/>\s]+/ig,"")
																.split(/[\.]+/ig)
																.slice(1)
																.filter(hasRealTextContent);
									} else if (!!(chunkTimestamp = tmpObject.rawToken.match(SRTChunkTimestampParser))) {
										cueStructure.isTimeDependent = true;
										timeData = chunkTimestamp.slice(1);
										tmpObject.timeIn =	parseInt((timeData[0]||0) * 60 * 60,10) +	// Hours
															parseInt((timeData[1]||0) * 60,10) +		// Minutes
															parseInt((timeData[2]||0),10) +				// Seconds
															parseFloat("0." + (timeData[3]||0));		// MS
									}
								
									currentContext.push(tmpObject);
									stack.push(currentContext);
									currentContext = tmpObject.children;
								}
							}
						} else {
							// Text string
							if (options.sanitiseCueHTML !== false) {
								currentToken = currentToken
												.replace(/</g,"&lt;")
												.replace(/>/g,"&gt;")
												.replace(/\&/g,"&amp;");
								
								if (!options.ignoreWhitespace) {
									currentToken = currentToken.replace(/\n+/g,"<br />");
								}
							}
						
							currentContext.push(currentToken);
						}
					}
				}
	
				return cueStructure;
			};
			
			// This function takes chunks of text representing cues, and converts them into cue objects.
			var parseCaptionChunk = function parseCaptionChunk(subtitleElement,objectCount) {
				var subtitleParts, timeIn, timeOut, html, timeData, subtitlePartIndex, cueSettings = "", id, specialCueData;
				var timestampMatch, tmpCue;
	
				// WebVTT Special Cue Logic
				if ((specialCueData = WebVTTDEFAULTSCueParser.exec(subtitleElement))) {
					cueDefaults = specialCueData.slice(2).join("");
					cueDefaults = cueDefaults.split(/\s+/g).filter(function(def) { return def && !!def.length; });
					return null;
				} else if ((specialCueData = WebVTTSTYLECueParser.exec(subtitleElement))) {
					cueStyles += specialCueData[specialCueData.length-1];
					return null;
				} else if ((specialCueData = WebVTTCOMMENTCueParser.exec(subtitleElement))) {
					return null; // At this stage, we don't want to do anything with these.
				}
	
				if (fileType === "LRC") {
					subtitleParts = [
						subtitleElement.substr(0,subtitleElement.indexOf("]")+1),
						subtitleElement.substr(subtitleElement.indexOf("]")+1)
					];
				} else {
					subtitleParts = subtitleElement.split(/\n/g);
				}
			
				// Trim off any blank lines (logically, should only be max. one, but loop to be sure)
				while (!subtitleParts[0].replace(/\s+/ig,"").length && subtitleParts.length > 0) {
					subtitleParts.shift();
				}
			
				if (subtitleParts[0].match(/^\s*[a-z0-9\-]+\s*$/ig)) {
					// The identifier becomes the cue ID (when *we* load the cues from file. Programatically created cues can have an ID of whatever.)
					id = String(subtitleParts.shift().replace(/\s*/ig,""));
				} else {
					// We're not parsing a format with an ID prior to each caption like SRT or WebVTT
					id = objectCount;
				}
			
				for (subtitlePartIndex = 0; subtitlePartIndex < subtitleParts.length; subtitlePartIndex ++) {
					var timestamp = subtitleParts[subtitlePartIndex];
					
					if ((timestampMatch = SRTTimestampParser.exec(timestamp)) ||
						(timestampMatch = SUBTimestampParser.exec(timestamp)) ||
						(timestampMatch = SBVTimestampParser.exec(timestamp))) {
						
						// WebVTT / SRT / SUB (VOBSub) / YouTube SBV style timestamp
						
						timeData = timestampMatch.slice(1);
						
						timeIn =	parseInt((timeData[0]||0) * 60 * 60,10) +	// Hours
									parseInt((timeData[1]||0) * 60,10) +		// Minutes
									parseInt((timeData[2]||0),10) +				// Seconds
									parseFloat("0." + (timeData[3]||0));		// MS
						
						timeOut =	parseInt((timeData[4]||0) * 60 * 60,10) +	// Hours
									parseInt((timeData[5]||0) * 60,10) +		// Minutes
									parseInt((timeData[6]||0),10) +				// Seconds
									parseFloat("0." + (timeData[7]||0));		// MS
						
						if (timeData[8]) {
							cueSettings = timeData[8];
						}
				
					} else if (!!(timestampMatch = GoogleTimestampParser.exec(timestamp))) {
						
						// Google's proposed WebVTT timestamp style
						timeData = timestampMatch.slice(1);
						
						timeIn = parseFloat(timeData[0]);
						timeOut = timeIn + parseFloat(timeData[1]);
	
						if (timeData[2]) {
							cueSettings = timeData[2];
						}
	
					} else if (!!(timestampMatch = LRCTimestampParser.exec(timestamp))) {
						timeData = timestampMatch.slice(1,timestampMatch.length-1);
	
						timeIn =	parseInt((timeData[0]||0) * 60 * 60,10) +	// Hours
									parseInt((timeData[1]||0) * 60,10) +		// Minutes
									parseInt((timeData[2]||0),10) +				// Seconds
									parseFloat("0." + (timeData[3]||0));		// MS
						
						timeOut = timeIn;
					}
					
					// We've got the timestamp - return all the other unmatched lines as the raw subtitle data
					subtitleParts = subtitleParts.slice(0,subtitlePartIndex).concat(subtitleParts.slice(subtitlePartIndex+1));
					break;
				}
	
				if (!timeIn && !timeOut) {
					// We didn't extract any time information. Assume the cue is invalid!
					return null;
				}
	
				// Consolidate cue settings, convert defaults to object
				var compositeCueSettings =
					cueDefaults
						.reduce(function(previous,current,index,array){
							previous[current.split(":")[0]] = current.split(":")[1];
							return previous;
						},{});
				
				// Loop through cue settings, replace defaults with cue specific settings if they exist
				compositeCueSettings =
					cueSettings
						.split(/\s+/g)
						.filter(function(set) { return set && !!set.length; })
						// Convert array to a key/val object
						.reduce(function(previous,current,index,array){
							previous[current.split(":")[0]] = current.split(":")[1];
							return previous;
						},compositeCueSettings);
				
				// Turn back into string like the TextTrackCue constructor expects
				cueSettings = "";
				for (var key in compositeCueSettings) {
					if (compositeCueSettings.hasOwnProperty(key)) {
						cueSettings += !!cueSettings.length ? " " : "";
						cueSettings += key + ":" + compositeCueSettings[key];
					}
				}
				
				// The remaining lines are the subtitle payload itself (after removing an ID if present, and the time);
				html = options.processCueHTML === false ? subtitleParts.join("\n") : processCaptionHTML(subtitleParts.join("\n"));
				tmpCue = new captionator.TextTrackCue(id, timeIn, timeOut, html, cueSettings, false, null);
				tmpCue.styleData = cueStyles;
				return tmpCue;
			};
			
			var processTTMLTimestamp = function processTTMLTimestamp(timestamp)  {
				var timeData, timeValue = 0;
				if (typeof(timestamp) !== "string") return 0;
	
				if ((timeData = TTMLTimestampParserAdv.exec(timestamp))) {
					timeData = timeData.slice(1);
					timeValue =	parseInt((timeData[0]||0) * 60 * 60,10) +	// Hours
								parseInt((timeData[1]||0) * 60,10) +		// Minutes
								parseInt((timeData[2]||0),10) +				// Seconds
								parseFloat("0." + (timeData[3]||0));		// MS
				}
	
				return timeValue;
			};
	
			var parseXMLChunk = function parseXMLChunk(xmlNode,index) {
				var timeDataIn, timeDataOut, html, tmpCue, timeIn = 0, timeOut = 0;
				var timestampIn = String(xmlNode.getAttribute("begin"));
				var timestampOut = String(xmlNode.getAttribute("end"));
				var id = xmlNode.getAttribute("id") || index;
	
				timeIn = processTTMLTimestamp(timestampIn);
				timeOut = processTTMLTimestamp(timestampOut);
	
				html = options.processCueHTML === false ? xmlNode.innerHTML : processCaptionHTML(xmlNode.innerHTML);
				return new captionator.TextTrackCue(id, timeIn, timeOut, html, {}, false, null);
			};
	
			// Begin parsing --------------------
			subtitles = captionData
							.replace(/\r\n/g,"\n")
							.replace(/\r/g,"\n");
			
			if (TTMLCheck.exec(captionData)) {
				// We're dealing with TTML
				// Simple, ugly way of getting QSA on our data.
				var TTMLElement = document.createElement("ttml");
				TTMLElement.innerHTML = captionData;
	
				var captionElements = [].slice.call(TTMLElement.querySelectorAll("[begin],[end]"),0);
				var captions = captionElements.map(parseXMLChunk);
				
				return captions;
			} else {
				// We're dealing with a line-based format
				// Check whether any of the lines match an LRC format
	
				if (captionData.split(/\n+/g).reduce(function(prev,current,index,array) {
						return prev || !!LRCTimestampParser.exec(current);
					},false)) {
					
					// LRC file... split by single line
					subtitles = subtitles.split(/\n+/g);
					fileType = "LRC";
				} else {
					subtitles = subtitles.split(/\n\n+/g);
				}
				
				subtitles = subtitles.filter(function(lineGroup) {
									if (lineGroup.match(/^WEBVTT(\s*FILE)?/ig)) {
										fileType = "WebVTT";
										return false;
									} else {
										if (lineGroup.replace(/\s*/ig,"").length) {
											return true;
										}
										return false;
									}
								})
								.map(parseCaptionChunk)
								.filter(function(cue) {
									// In the parseCaptionChunk function, we return null for special and malformed cues,
									// and cues we want to ignore, rather than expose to JS. Filter these out now.
									if (cue !== null) {
										return true;
									}
	
									return false;
								});
				
				if (fileType === "LRC") {
					// Post-process to get appropriate end-times for LRC cues
					// LRC cue end times are not explicitly set, they are
					// implicit based on the start time of the next cue.
					// We also then do a pass to strip blank cues.
	
					subtitles
						.forEach(function(cue,index) {
							var thisCueStartTime = 0, lastCue;
							if (index > 0) {
								thisCueStartTime = cue.startTime;
								lastCue = subtitles[--index];
	
								if (lastCue.endTime < thisCueStartTime) {
									lastCue.endTime = thisCueStartTime;
								}
							}
						});
					
					subtitles = subtitles.filter(function(cue) {
							if (cue.text.toString().replace(/\s*/,"").length > 0) {
								return true;
							}
	
							return false;
						});
				}
	
				return subtitles;
			}
	
			return [];
		} else {
			throw new Error("Required parameter captionData not supplied.");
		}
	};

	/*
		captionator.processVideoElement(videoElement <HTMLVideoElement>,
								[defaultLanguage - string in BCP47],
								[options - JS Object])
	
		Processes track items within an HTMLVideoElement. The second and third parameter are both optional.
	
		First parameter: Mandatory HTMLVideoElement object.
	
		Second parameter: BCP-47 string for default language. If this parameter is omitted, the User Agent's language
		will be used to choose a track.
	
		Third parameter: as yet unused - will implement animation settings and some other global options with this
		parameter later.
	
		RETURNS:
	
		Reference to the HTMLVideoElement.
	
	
	*/
	
	captionator.processVideoElement = function(videoElement,defaultLanguage,options) {
		var trackList = [];
		var language = navigator.language || navigator.userLanguage;
		var globalLanguage = defaultLanguage || language.split("-")[0];
		options = options instanceof Object? options : {};
	
		if (!videoElement.captioned) {
			videoElement._captionatorOptions = options;
			videoElement.className += (videoElement.className.length ? " " : "") + "captioned";
			videoElement.captioned = true;
		
			// Check whether video element has an ID. If not, create one
			if (videoElement.id.length === 0) {
				videoElement.id = captionator.generateID();
			}
		
			var enabledDefaultTrack = false;
			[].slice.call(videoElement.querySelectorAll("track"),0).forEach(function(trackElement) {
				var sources = null;
				if (trackElement.querySelectorAll("source").length > 0) {
					sources = trackElement.querySelectorAll("source");
				} else {
					sources = trackElement.getAttribute("src");
				}
			
				var trackObject = videoElement.addTextTrack(
										(trackElement.getAttribute("id")||captionator.generateID()),
										trackElement.getAttribute("kind"),
										trackElement.getAttribute("label"),
										trackElement.getAttribute("srclang").split("-")[0],
										sources,
										trackElement.getAttribute("type"),
										trackElement.hasAttribute("default")); // (Christopher) I think we can get away with this given it's a boolean attribute anyway
			
				trackElement.track = trackObject;
				trackObject.trackNode = trackElement;
				trackObject.videoNode = videoElement;
				trackList.push(trackObject);
			
				// Now determine whether the track is visible by default.
				// The comments in this section come straight from the spec...
				var trackEnabled = false;
				
				// If the text track kind is subtitles or captions and the user has indicated an interest in having a track
				// with this text track kind, text track language, and text track label enabled, and there is no other text track
				// in the media element's list of text tracks with a text track kind of either subtitles or captions whose text track mode is showing
				// ---> Let the text track mode be showing.
				
				if ((trackObject.kind === "subtitles" || trackObject.kind === "captions") &&
					(defaultLanguage === trackObject.language && options.enableCaptionsByDefault)) {
					if (!trackList.filter(function(trackObject) {
							if ((trackObject.kind === "captions" || trackObject.kind === "subtitles") && defaultLanguage === trackObject.language && trackObject.mode === captionator.TextTrack.SHOWING) {
								return true;
							} else {
								return false;
							}
						}).length) {
						trackEnabled = true;
					}
				}
				
				// If the text track kind is chapters and the text track language is one that the user agent has reason to believe is
				// appropriate for the user, and there is no other text track in the media element's list of text tracks with a text track
				// kind of chapters whose text track mode is showing
				// ---> Let the text track mode be showing.
				
				if (trackObject.kind === "chapters" && (defaultLanguage === trackObject.language)) {
					if (!trackList.filter(function(trackObject) {
							if (trackObject.kind === "chapters" && trackObject.mode === captionator.TextTrack.SHOWING) {
								return true;
							} else {
								return false;
							}
						}).length) {
						trackEnabled = true;
					}
				}
				
				// If the text track kind is descriptions and the user has indicated an interest in having text descriptions
				// with this text track language and text track label enabled, and there is no other text track in the media element's
				// list of text tracks with a text track kind of descriptions whose text track mode is showing
				
				if (trackObject.kind === "descriptions" && (options.enableDescriptionsByDefault === true) && (defaultLanguage === trackObject.language)) {
					if (!trackList.filter(function(trackObject) {
							if (trackObject.kind === "descriptions" && trackObject.mode === captionator.TextTrack.SHOWING) {
								return true;
							} else {
								return false;
							}
						}).length) {
						trackEnabled = true;
					}
				}
				
				// If there is a text track in the media element's list of text tracks whose text track mode is showing by default,
				// the user agent must furthermore change that text track's text track mode to hidden.
				
				if (trackEnabled === true) {
					trackList.forEach(function(trackObject) {
						if(trackObject.trackNode.hasAttribute("default") && trackObject.mode === captionator.TextTrack.SHOWING) {
							trackObject.mode = captionator.TextTrack.HIDDEN;
						}
					});
				}
			
				// If the track element has a default attribute specified, and there is no other text track in the media element's
				// list of text tracks whose text track mode is showing or showing by default
				// Let the text track mode be showing by default.
			
				if (trackElement.hasAttribute("default")) {
					if (!trackList.filter(function(trackObject) {
							if (trackObject.trackNode.hasAttribute("default") && trackObject.trackNode !== trackElement) {
								return true;
							} else {
								return false;
							}
						}).length) {
						trackEnabled = true;
						trackObject.internalDefault = true;
					}
				}
			
				// Otherwise
				// Let the text track mode be disabled.
			
				if (trackEnabled === true) {
					trackObject.mode = captionator.TextTrack.SHOWING;
				}
			});
			
			videoElement.addEventListener("timeupdate", function(eventData){
				var videoElement = eventData.target;
				// update active cues
				try {
					videoElement.textTracks.forEach(function(track) {
						track.activeCues.refreshCues.apply(track.activeCues);
					});
				} catch(error) {}
			
				// External renderer?
				if (options.renderer instanceof Function) {
					options.renderer.call(captionator,videoElement);
				} else {
					captionator.rebuildCaptions(videoElement);
				}
			}, false);
			
			window.addEventListener("resize", function(eventData) {
				videoElement._captionator_dirtyBit = true; // mark video as dirty, force captionator to rerender captions
				captionator.rebuildCaptions(videoElement);
			},false);
	
			// Hires mode
			if (options.enableHighResolution === true) {
				window.setInterval(function captionatorHighResProcessor() {
					try {
						videoElement.textTracks.forEach(function(track) {
							track.activeCues.refreshCues.apply(track.activeCues);
						});
					} catch(error) {}
				
					// External renderer?
					if (options.renderer instanceof Function) {
						options.renderer.call(captionator,videoElement);
					} else {
						captionator.rebuildCaptions(videoElement);
					}
				},20);
			}
		}
	
		return videoElement;
	};

	/*
		captionator.getNodeMetrics(DOMNode)
	
		Calculates and returns a number of sizing and position metrics from a DOMNode of any variety (though this function is intended
		to be used with HTMLVideoElements.) Returns the height of the default controls on a video based on user agent detection
		(As far as I know, there's no way to dynamically calculate the height of browser UI controls on a video.)
	
		First parameter: DOMNode from which to calculate sizing metrics. This parameter is mandatory.
	
		RETURNS:
	
		An object with the following properties:
			left: The calculated left offset of the node
			top: The calculated top offset of the node
			height: The calculated height of the node
			width: The calculated with of the node
			controlHeight: If the node is a video and has the `controls` attribute present, the height of the UI controls for the video. Otherwise, zero.
	
	*/
	
	captionator.getNodeMetrics = function(DOMNode) {
		var nodeComputedStyle = window.getComputedStyle(DOMNode,null);
		var offsetObject = DOMNode;
		var offsetTop = DOMNode.offsetTop, offsetLeft = DOMNode.offsetLeft;
		var width = DOMNode, height = 0;
		var controlHeight = 0;
		
		width = parseInt(nodeComputedStyle.getPropertyValue("width"),10);
		height = parseInt(nodeComputedStyle.getPropertyValue("height"),10);
		
		// Slightly verbose expression in order to pass JSHint
		while (!!(offsetObject = offsetObject.offsetParent)) {
			offsetTop += offsetObject.offsetTop;
			offsetLeft += offsetObject.offsetLeft;
		}
	
		if (DOMNode.hasAttribute("controls")) {
			// Get heights of default control strip in various browsers
			// There could be a way to measure this live but I haven't thought/heard of it yet...
			var UA = navigator.userAgent.toLowerCase();
			if (UA.indexOf("chrome") !== -1) {
				controlHeight = 32;
			} else if (UA.indexOf("opera") !== -1) {
				controlHeight = 25;
			} else if (UA.indexOf("firefox") !== -1) {
				controlHeight = 28;
			} else if (UA.indexOf("ie 9") !== -1 || UA.indexOf("ipad") !== -1) {
				controlHeight = 44;
			} else if (UA.indexOf("safari") !== -1) {
				controlHeight = 25;
			}
		} else if (DOMNode._captionatorOptions) {
			var tmpCaptionatorOptions = DOMNode._captionatorOptions;
			if (tmpCaptionatorOptions.controlHeight) {
				controlHeight = parseInt(tmpCaptionatorOptions.controlHeight,10);
			}
		}
	
		return {
			left: offsetLeft,
			top: offsetTop,
			width: width,
			height: height,
			controlHeight: controlHeight
		};
	};
	
	/*
		captionator.applyStyles(DOMNode, Style Object)
	
		A fast way to apply multiple CSS styles to a DOMNode.
	
		First parameter: DOMNode to style. This parameter is mandatory.
	
		Second parameter: A key/value object where the keys are camel-cased variants of CSS property names to apply,
		and the object values are CSS property values as per the spec. This parameter is mandatory.
	
		RETURNS:
	
		Nothing.
	
	*/
	
	captionator.applyStyles = function(StyleNode, styleObject) {
		for (var styleName in styleObject) {
			if ({}.hasOwnProperty.call(styleObject, styleName)) {
				StyleNode.style[styleName] = styleObject[styleName];
			}
		}
	};
	
	/*
		captionator.checkDirection(text)
	
		Determines whether the text string passed into the function is an RTL (right to left) or LTR (left to right) string.
	
		First parameter: Text string to check. This parameter is mandatory.
	
		RETURNS:
	
		The text string 'rtl' if the text is a right to left string, 'ltr' if the text is a left to right string, or an empty string
		if the direction could not be determined.
	
	*/
	captionator.checkDirection = function(text) {
		// Inspired by http://www.frequency-decoder.com/2008/12/12/automatically-detect-rtl-text
		// Thanks guys!
		var ltrChars            = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'+'\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
			rtlChars            = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
			ltrDirCheckRe       = new RegExp('^[^'+rtlChars+']*['+ltrChars+']'),
			rtlDirCheckRe       = new RegExp('^[^'+ltrChars+']*['+rtlChars+']');
	
		return !!rtlDirCheckRe.test(text) ? 'rtl' : (!!ltrDirCheckRe.test(text) ? 'ltr' : '');
	};
	
	/*
		captionator.styleCue(DOMNode, cueObject, videoNode)
	
		Styles and positions cue nodes according to the WebVTT specification.
	
		First parameter: The DOMNode representing the cue to style. This parameter is mandatory.
	
		Second parameter: The TextTrackCue itself.
	
		Third Parameter: The HTMLVideoElement with which the cue is associated. This parameter is mandatory.
	
		RETURNS:
	
		Nothing.
	
	*/
	captionator.styleCue = function(DOMNode, cueObject, videoElement) {
		// Variables for maintaining render calculations
		var cueX = 0, cueY = 0, cueWidth = 0, cueHeight = 0, cueSize, cueAlignment, cuePaddingLR = 0, cuePaddingTB = 0;
		var baseFontSize, basePixelFontSize, baseLineHeight, tmpHeightExclusions;
		var videoHeightInLines, videoWidthInLines, pixelLineHeight, verticalPixelLineHeight, charactersPerLine = 0, characterCount = 0;
		var characters = 0, lineCount = 0, finalLineCharacterCount = 0, finalLineCharacterHeight = 0, currentLine = 0;
		var characterX, characterY, characterPosition = 0;
		var options = videoElement._captionatorOptions || {};
		var videoMetrics;
		var maxCueSize = 100, internalTextPosition = 50, textBoundingBoxWidth = 0, textBoundingBoxPercentage = 0, autoSize = true;
		var plainCueText = "", plainCueTextContainer;
		
		// In future, support cue-granular language detection method
		var cueLanguage = cueObject.track.language;
		
		// Function to facilitate vertical text alignments in browsers which do not support writing-mode
		// (sadly, all the good ones!)
		var spanify = function(DOMNode) {
			if (DOMNode.spanified) return DOMNode.characterCount;
			
			var stringHasLength = function(textString) { return !!textString.length; };
			var spanCode = "<span class='captionator-cue-character'>";
			var nodeIndex, currentNode, currentNodeValue, replacementFragment, characterCount = 0;
			var styleSpan = function(span) {
				characterCount ++;
				captionator.applyStyles(span,{
					"display":		"block",
					"lineHeight":	"auto",
					"height":		basePixelFontSize + "px",
					"width":		verticalPixelLineHeight + "px",
					"textAlign":	"center"
				});
			};
			
			for (nodeIndex in DOMNode.childNodes) {
				if (DOMNode.childNodes.hasOwnProperty(nodeIndex) && !DOMNode.childNodes[nodeIndex].nospan) {
					currentNode = DOMNode.childNodes[nodeIndex];
					if (currentNode.nodeType === 3) {
						replacementFragment = document.createDocumentFragment();
						currentNodeValue = currentNode.nodeValue;
						
						replacementFragment.appendChild(document.createElement("span"));
						
						replacementFragment.childNodes[0].innerHTML =
								spanCode +
								currentNodeValue
									.split(/(.)/)
									.filter(stringHasLength)
									.join("</span>" + spanCode) +
								"</span>";
						
						[].slice.call(replacementFragment.querySelectorAll("span.captionator-cue-character"),0).forEach(styleSpan);
						
						currentNode.parentNode.replaceChild(replacementFragment,currentNode);
					} else if (DOMNode.childNodes[nodeIndex].nodeType === 1) {
						characterCount += spanify(DOMNode.childNodes[nodeIndex]);
					}
				}
			}
			
			// We have to know when we've already split this thing up into spans,
			// so we don't end up creating more and more sub-spans when we restyle the node
			DOMNode.characterCount = characterCount;
			DOMNode.spanified = true;
			
			return characterCount;
		};
	
		// Set up the cue canvas
		videoMetrics = captionator.getNodeMetrics(videoElement);
		
		// Define storage for the available cue area, diminished as further cues are added
		// Cues occupy the largest possible area they can, either by width or height
		// (depending on whether the `direction` of the cue is vertical or horizontal)
		// Cues which have an explicit position set do not detract from this area.
		// It is the subtitle author's responsibility to ensure they don't overlap if
		// they decide to override default positioning!
		
		if (!videoElement._captionator_availableCueArea) {
			videoElement._captionator_availableCueArea = {
				"bottom": (videoMetrics.height-videoMetrics.controlHeight),
				"right": videoMetrics.width,
				"top": 0,
				"left": 0,
				"height": (videoMetrics.height-videoMetrics.controlHeight),
				"width": videoMetrics.width
			};
		}
	
		if (cueObject.direction === "horizontal") {
			// Calculate text bounding box
			// (isn't useful for vertical cues, because we're doing all glyph positioning ourselves.)
			captionator.applyStyles(DOMNode,{
				"width": "auto",
				"position": "static",
				"display": "inline-block",
				"padding": "1em"
			});
	
			textBoundingBoxWidth = parseInt(DOMNode.offsetWidth,10);
			textBoundingBoxPercentage = Math.floor((textBoundingBoxWidth / videoElement._captionator_availableCueArea.width) * 100);
			textBoundingBoxPercentage = textBoundingBoxPercentage <= 100 ? textBoundingBoxPercentage : 100;
		}
	
		// Calculate font metrics
		baseFontSize = ((videoMetrics.height * (fontSizeVerticalPercentage/100))/96)*72;
		baseFontSize = baseFontSize >= minimumFontSize ? baseFontSize : minimumFontSize;
		basePixelFontSize = Math.floor((baseFontSize/72)*96);
		baseLineHeight = Math.floor(baseFontSize * lineHeightRatio);
		baseLineHeight = baseLineHeight > minimumLineHeight ? baseLineHeight : minimumLineHeight;
		pixelLineHeight = Math.ceil((baseLineHeight/72)*96);
		verticalPixelLineHeight	= pixelLineHeight;
		
		if (pixelLineHeight * Math.floor(videoMetrics.height / pixelLineHeight) < videoMetrics.height) {
			pixelLineHeight = Math.floor(videoMetrics.height / Math.floor(videoMetrics.height / pixelLineHeight));
			baseLineHeight = Math.ceil((pixelLineHeight/96)*72);
		}
		
		if (pixelLineHeight * Math.floor(videoMetrics.width / pixelLineHeight) < videoMetrics.width) {
			verticalPixelLineHeight = Math.ceil(videoMetrics.width / Math.floor(videoMetrics.width / pixelLineHeight));
		}
		
		// Calculate render area height & width in lines
		videoHeightInLines = Math.floor(videoElement._captionator_availableCueArea.height / pixelLineHeight);
		videoWidthInLines = Math.floor(videoElement._captionator_availableCueArea.width / verticalPixelLineHeight);
		
		// Calculate cue size and padding
		if (parseFloat(String(cueObject.size).replace(/[^\d\.]/ig,"")) === 0) {
			// We assume (given a size of 0) that no explicit size was set.
			// Depending on settings, we either use the WebVTT default size of 100% (the Captionator.js default behaviour),
			// or the proportion of the video the text bounding box takes up (widthwise) as a percentage (proposed behaviour, LeanBack's default)
			if (options.sizeCuesByTextBoundingBox === true) {
				cueSize = textBoundingBoxPercentage;
			} else {
				cueSize = 100;
				autoSize = false;
			}
		} else {
			autoSize = false;
			cueSize = parseFloat(String(cueObject.size).replace(/[^\d\.]/ig,""));
			cueSize = cueSize <= 100 ? cueSize : 100;
		}
		
		cuePaddingLR = cueObject.direction === "horizontal" ? Math.floor(videoMetrics.width * 0.01) : 0;
		cuePaddingTB = cueObject.direction === "horizontal" ? 0 : Math.floor(videoMetrics.height * 0.01);
		
		if (cueObject.linePosition === "auto") {
			cueObject.linePosition = cueObject.direction === "horizontal" ? videoHeightInLines : videoWidthInLines;
		} else if (String(cueObject.linePosition).match(/\%/)) {
			cueObject.snapToLines = false;
			cueObject.linePosition = parseFloat(String(cueObject.linePosition).replace(/\%/ig,""));
		}
		
		if (cueObject.direction === "horizontal") {
			cueHeight = pixelLineHeight;
	
			if (cueObject.textPosition !== "auto" && autoSize) {
				internalTextPosition = parseFloat(String(cueObject.textPosition).replace(/[^\d\.]/ig,""));
				
				// Don't squish the text
				if (cueSize - internalTextPosition > textBoundingBoxPercentage) {
					cueSize -= internalTextPosition;
				} else {
					cueSize = textBoundingBoxPercentage;
				}
			}
	
			if (cueObject.snapToLines === true) {
				cueWidth = videoElement._captionator_availableCueArea.width * (cueSize/100);
			} else {
				cueWidth = videoMetrics.width * (cueSize/100);
			}
	
			if (cueObject.textPosition === "auto") {
				cueX = ((videoElement._captionator_availableCueArea.right - cueWidth) / 2) + videoElement._captionator_availableCueArea.left;
			} else {
				internalTextPosition = parseFloat(String(cueObject.textPosition).replace(/[^\d\.]/ig,""));
				cueX = ((videoElement._captionator_availableCueArea.right - cueWidth) * (internalTextPosition/100)) + videoElement._captionator_availableCueArea.left;
			}
			
			if (cueObject.snapToLines === true) {
				cueY = ((videoHeightInLines-1) * pixelLineHeight) + videoElement._captionator_availableCueArea.top;
			} else {
				tmpHeightExclusions = videoMetrics.controlHeight + pixelLineHeight + (cuePaddingTB*2);
				cueY = (videoMetrics.height - tmpHeightExclusions) * (cueObject.linePosition/100);
			}
			
		} else {
			// Basic positioning
			cueY = videoElement._captionator_availableCueArea.top;
			cueX = videoElement._captionator_availableCueArea.right - verticalPixelLineHeight;
			cueWidth = verticalPixelLineHeight;
			cueHeight = videoElement._captionator_availableCueArea.height * (cueSize/100);
			
			// Split into characters, and continue calculating width & positioning with new info
			characterCount = spanify(DOMNode);
			characters = [].slice.call(DOMNode.querySelectorAll("span.captionator-cue-character"),0);
			charactersPerLine = Math.floor((cueHeight-cuePaddingTB*2)/basePixelFontSize);
			cueWidth = Math.ceil(characterCount/charactersPerLine) * verticalPixelLineHeight;
			lineCount = Math.ceil(characterCount/charactersPerLine);
			finalLineCharacterCount = characterCount - (charactersPerLine * (lineCount - 1));
			finalLineCharacterHeight = finalLineCharacterCount * basePixelFontSize;
			
			// Work out CueX taking into account linePosition...
			if (cueObject.snapToLines === true) {
				cueX = cueObject.direction === "vertical-lr" ? videoElement._captionator_availableCueArea.left : videoElement._captionator_availableCueArea.right - cueWidth;
			} else {
				var temporaryWidthExclusions = cueWidth + (cuePaddingLR * 2);
				if (cueObject.direction === "vertical-lr") {
					cueX = (videoMetrics.width - temporaryWidthExclusions) * (cueObject.linePosition/100);
				} else {
					cueX = (videoMetrics.width-temporaryWidthExclusions) - ((videoMetrics.width - temporaryWidthExclusions) * (cueObject.linePosition/100));
				}
			}
			
			// Work out CueY taking into account textPosition...
			if (cueObject.textPosition === "auto") {
				cueY = ((videoElement._captionator_availableCueArea.bottom - cueHeight) / 2) + videoElement._captionator_availableCueArea.top;
			} else {
				cueObject.textPosition = parseFloat(String(cueObject.textPosition).replace(/[^\d\.]/ig,""));
				cueY = ((videoElement._captionator_availableCueArea.bottom - cueHeight) * (cueObject.textPosition/100)) + 
						videoElement._captionator_availableCueArea.top;
			}
			
			// Iterate through the characters and position them accordingly...
			currentLine = 0;
			characterPosition = 0;
			characterX = 0;
			characterY = 0;
			
			characters.forEach(function(characterSpan,characterCount) {
				if (cueObject.direction === "vertical-lr") {
					characterX = verticalPixelLineHeight * currentLine;
				} else {
					characterX = cueWidth - (verticalPixelLineHeight * (currentLine+1));
				}
				
				if (cueObject.alignment === "start" || (cueObject.alignment !== "start" && currentLine < lineCount-1)) {
					characterY = (characterPosition * basePixelFontSize) + cuePaddingTB;
				} else if (cueObject.alignment === "end") {
					characterY = ((characterPosition * basePixelFontSize)-basePixelFontSize) + ((cueHeight+(cuePaddingTB*2))-finalLineCharacterHeight);
				} else if (cueObject.alignment === "middle") {
					characterY = (((cueHeight - (cuePaddingTB*2))-finalLineCharacterHeight)/2) + (characterPosition * basePixelFontSize);
				}
				
				// Because these are positioned absolutely, screen readers don't read them properly.
				// Each of the characters is set to be ignored, and the entire text is duplicated in a hidden element to ensure
				// it is read correctly.
				characterSpan.setAttribute("aria-hidden","true");
	
				captionator.applyStyles(characterSpan,{
					"position": "absolute",
					"top": characterY + "px",
					"left": characterX + "px"
				});
				
				if (characterPosition >= charactersPerLine-1) {
					characterPosition = 0;
					currentLine ++;
				} else {
					characterPosition ++;
				}
			});
			
			// Get the plain cue text
			if (!DOMNode.accessified) {
				plainCueText = cueObject.text.getPlain(videoElement.currentTime);
				plainCueTextContainer = document.createElement("div");
				plainCueTextContainer.innerHTML = plainCueText;
				plainCueTextContainer.nospan = true;
				DOMNode.appendChild(plainCueTextContainer);
				DOMNode.accessified = true;
			
				// Now hide it. Don't want it interfering with cue display
				captionator.applyStyles(plainCueTextContainer,{
					"position": "absolute",
					"overflow": "hidden",
					"width": "1px",
					"height": "1px",
					"opacity": "0",
					"textIndent": "-999em"
				});
			}
		}
		
		if (cueObject.direction === "horizontal") {
			if (captionator.checkDirection(String(cueObject.text)) === "rtl") {
				cueAlignment = {"start":"right","middle":"center","end":"left"}[cueObject.alignment];
			} else {	
				cueAlignment = {"start":"left","middle":"center","end":"right"}[cueObject.alignment];
			}
		}
	
		captionator.applyStyles(DOMNode,{
			"position": "absolute",
			"overflow": "hidden",
			"width": cueWidth + "px",
			"height": cueHeight + "px",
			"top": cueY + "px",
			"left": cueX + "px",
			"padding": cuePaddingTB + "px " + cuePaddingLR + "px",
			"textAlign": cueAlignment,
			"backgroundColor": "rgba(" + cueBackgroundColour.join(",") + ")",
			"direction": captionator.checkDirection(String(cueObject.text)),
			"lineHeight": baseLineHeight + "pt",
			"boxSizing": "border-box"
		});
		
		if (cueObject.direction === "vertical" || cueObject.direction === "vertical-lr") {
			// Work out how to shrink the available render area
			// If subtracting from the right works out to a larger area, subtract from the right.
			// Otherwise, subtract from the left.	
			if (((cueX - videoElement._captionator_availableCueArea.left) - videoElement._captionator_availableCueArea.left) >=
				(videoElement._captionator_availableCueArea.right - (cueX + cueWidth))) {
				
				videoElement._captionator_availableCueArea.right = cueX;
			} else {
				videoElement._captionator_availableCueArea.left = cueX + cueWidth;
			}
			
			videoElement._captionator_availableCueArea.width =
				videoElement._captionator_availableCueArea.right - 
				videoElement._captionator_availableCueArea.left;
			
		} else {
			// Now shift cue up if required to ensure it's all visible
			if (DOMNode.scrollHeight > DOMNode.offsetHeight * 1.2) {
				if (cueObject.snapToLines) {
					var upwardAjustmentInLines = 0;
					while (DOMNode.scrollHeight > DOMNode.offsetHeight * 1.2) {
						cueHeight += pixelLineHeight;
						DOMNode.style.height = cueHeight + "px";
						upwardAjustmentInLines ++;
					}
					
					cueY = cueY - (upwardAjustmentInLines*pixelLineHeight);
					DOMNode.style.top = cueY + "px";
				} else {
					// Not working by lines, so instead of shifting up, simply throw out old cueY calculation
					// and completely recalculate its value
					var upwardAjustment = (DOMNode.scrollHeight - cueHeight);
					cueHeight = (DOMNode.scrollHeight + cuePaddingTB);
					tmpHeightExclusions = videoMetrics.controlHeight + cueHeight + (cuePaddingTB*2);
					cueY = (videoMetrics.height - tmpHeightExclusions) * (cueObject.linePosition/100);
					
					DOMNode.style.height = cueHeight + "px";
					DOMNode.style.top = cueY + "px";
				}
			}
						
			// Work out how to shrink the available render area
			// If subtracting from the bottom works out to a larger area, subtract from the bottom.
			// Otherwise, subtract from the top.
			if (((cueY - videoElement._captionator_availableCueArea.top) - videoElement._captionator_availableCueArea.top) >=
				(videoElement._captionator_availableCueArea.bottom - (cueY + cueHeight)) &&
				videoElement._captionator_availableCueArea.bottom > cueY) {
				
				videoElement._captionator_availableCueArea.bottom = cueY;
			} else {
				if (videoElement._captionator_availableCueArea.top < cueY + cueHeight) {
					videoElement._captionator_availableCueArea.top = cueY + cueHeight;
				}
			}
			
			videoElement._captionator_availableCueArea.height =
				videoElement._captionator_availableCueArea.bottom - 
				videoElement._captionator_availableCueArea.top;
		}
		
		// DEBUG->
	
		// DEBUG FUNCTIONS
		// This function can be used for debugging WebVTT captions. It will not be
		// included in production versions of Captionator.
		// -----------------------------------------------------------------------
		if (options.debugMode) {
			var debugCanvas, debugContext;
			var generateDebugCanvas = function() {
				if (!debugCanvas) {
					if (videoElement._captionatorDebugCanvas) {
						debugCanvas = videoElement._captionatorDebugCanvas;
						debugContext = videoElement._captionatorDebugContext;
					} else {
						debugCanvas = document.createElement("canvas");
						debugCanvas.setAttribute("width",videoMetrics.width);
						debugCanvas.setAttribute("height",videoMetrics.height - videoMetrics.controlHeight);
						document.body.appendChild(debugCanvas);
						captionator.applyStyles(debugCanvas,{
							"position": "absolute",
							"top": videoMetrics.top + "px",
							"left": videoMetrics.left + "px",
							"width": videoMetrics.width + "px",
							"height": (videoMetrics.height - videoMetrics.controlHeight) + "px",
							"zIndex": 3000
						});
				
						debugContext = debugCanvas.getContext("2d");
						videoElement._captionatorDebugCanvas = debugCanvas;
						videoElement._captionatorDebugContext = debugContext;
					}
				}
			};
			
			var clearDebugCanvas = function() {
				generateDebugCanvas();
				debugCanvas.setAttribute("width",videoMetrics.width);
			};
			
			var drawLines = function() {
				var lineIndex;
				
				// Set up canvas for drawing debug information
				generateDebugCanvas();
				
				debugContext.strokeStyle = "rgba(255,0,0,0.5)";
				debugContext.lineWidth = 1;
				
				// Draw horizontal line dividers
				debugContext.beginPath();
				for (lineIndex = 0; lineIndex < videoHeightInLines; lineIndex ++) {
					debugContext.moveTo(0.5,(lineIndex*pixelLineHeight)+0.5);
					debugContext.lineTo(videoMetrics.width,(lineIndex*pixelLineHeight)+0.5);
				}
				
				debugContext.closePath();
				debugContext.stroke();
				debugContext.beginPath();
				debugContext.strokeStyle = "rgba(0,255,0,0.5)";
				
				// Draw vertical line dividers
				// Right to left, vertical
				for (lineIndex = videoWidthInLines; lineIndex >= 0; lineIndex --) {
					debugContext.moveTo((videoMetrics.width-(lineIndex*verticalPixelLineHeight))-0.5,-0.5);
					debugContext.lineTo((videoMetrics.width-(lineIndex*verticalPixelLineHeight))-0.5,videoMetrics.height);
				}
				
				debugContext.closePath();
				debugContext.stroke();
				debugContext.beginPath();
				debugContext.strokeStyle = "rgba(255,255,0,0.5)";
				
				// Draw vertical line dividers
				// Left to right, vertical
				for (lineIndex = 0; lineIndex <= videoWidthInLines; lineIndex ++) {
					debugContext.moveTo((lineIndex*verticalPixelLineHeight)+0.5,-0.5);
					debugContext.lineTo((lineIndex*verticalPixelLineHeight)+0.5,videoMetrics.height);
				}
				
				debugContext.stroke();
				
				videoElement.linesDrawn = true;
			};
			
			var drawAvailableArea = function() {
				generateDebugCanvas();
				
				debugContext.fillStyle = "rgba(100,100,255,0.5)";
				
				debugContext.fillRect(
						videoElement._captionator_availableCueArea.left,
						videoElement._captionator_availableCueArea.top,
						videoElement._captionator_availableCueArea.right,
						videoElement._captionator_availableCueArea.bottom);
				debugContext.stroke();
				
			};
			
			clearDebugCanvas();
			drawAvailableArea();
			drawLines();
		}
		// END DEBUG FUNCTIONS
		// <-DEBUG
	};
	
	/*
		captionator.styleCueCanvas(VideoNode)
	
		Styles and positions a canvas (not a <canvas> object - just a div) for displaying cues on a video.
		If the HTMLVideoElement in question does not have a canvas, one is created for it.
	
		First parameter: The HTMLVideoElement for which the cue canvas will be styled/created. This parameter is mandatory.
	
		RETURNS:
	
		Nothing.
	
	*/
	captionator.styleCueCanvas = function(videoElement) {
		var baseFontSize, baseLineHeight;
		var containerObject, descriptionContainerObject;
		var containerID, descriptionContainerID;
		var options = videoElement._captionatorOptions instanceof Object ? videoElement._captionatorOptions : {};
	
		if (!(videoElement instanceof HTMLVideoElement)) {
			throw new Error("Cannot style a cue canvas for a non-video node!");
		}
		
		if (videoElement._containerObject) {
			containerObject = videoElement._containerObject;
			containerID = containerObject.id;
		}
		
		if (videoElement._descriptionContainerObject) {
			descriptionContainerObject = videoElement._descriptionContainerObject;
			descriptionContainerID = descriptionContainerObject.id;
		}
		
		if (!descriptionContainerObject) {
			// Contain hidden descriptive captions
			descriptionContainerObject = document.createElement("div");
			descriptionContainerObject.className = "captionator-cue-descriptive-container";
			descriptionContainerID = captionator.generateID();
			descriptionContainerObject.id = descriptionContainerID;
			videoElement._descriptionContainerObject = descriptionContainerObject;
			
			// ARIA LIVE for descriptive text
			descriptionContainerObject.setAttribute("aria-live","polite");
			descriptionContainerObject.setAttribute("aria-atomic","true");
			descriptionContainerObject.setAttribute("role","region");
			
			// Stick it in the body
			document.body.appendChild(descriptionContainerObject);
			
			// Hide the descriptive canvas...
			captionator.applyStyles(descriptionContainerObject,{
				"position": "absolute",
				"overflow": "hidden",
				"width": "1px",
				"height": "1px",
				"opacity": "0",
				"textIndent": "-999em"
			});
		} else if (!descriptionContainerObject.parentNode) {
			document.body.appendChild(descriptionContainerObject);
		}
	
		if (!containerObject) {
			// visually display captions
			containerObject = document.createElement("div");
			containerObject.className = "captionator-cue-canvas";
			containerID = captionator.generateID();
			containerObject.id = containerID;
			
			// We can choose to append the canvas to an element other than the body.
			// If this option is specified, we no longer use the offsetTop/offsetLeft of the video
			// to define the position, we just inherit it.
			//
			// options.appendCueCanvasTo can be an HTMLElement, or a DOM query.
			// If the query fails, the canvas will be appended to the body as normal.
			// If the query is successful, the canvas will be appended to the first matched element.
	
			if (options.appendCueCanvasTo) {
				var canvasParentNode = null;
	
				if (options.appendCueCanvasTo instanceof HTMLElement) {
					canvasParentNode = options.appendCueCanvasTo;
				} else if (typeof(options.appendCueCanvasTo) === "string") {
					try {
						var canvasSearchResult = document.querySelectorAll(options.appendCueCanvasTo);
						if (canvasSearchResult.length > 0) {
							canvasParentNode = canvasSearchResult[0];
						} else { throw null; /* Bounce to catch */ }
					} catch(error) {
						canvasParentNode = document.body;
						options.appendCueCanvasTo = false;
					}
				} else {
					canvasParentNode = document.body;
					options.appendCueCanvasTo = false;
				}
	
				canvasParentNode.appendChild(containerObject);
			} else {
				document.body.appendChild(containerObject);
			}
	
			videoElement._containerObject = containerObject;
			
			// No aria live, as descriptions aren't placed in this container.
			// containerObject.setAttribute("role","region");
			
		} else if (!containerObject.parentNode) {
			document.body.appendChild(containerObject);
		}
	
		// Set up the cue canvas
		var videoMetrics = captionator.getNodeMetrics(videoElement);
	
		// Set up font metrics
		baseFontSize = ((videoMetrics.height * (fontSizeVerticalPercentage/100))/96)*72;
		baseFontSize = baseFontSize >= minimumFontSize ? baseFontSize : minimumFontSize;
		baseLineHeight = Math.floor(baseFontSize * lineHeightRatio);
		baseLineHeight = baseLineHeight > minimumLineHeight ? baseLineHeight : minimumLineHeight;
	
		// Style node!
		captionator.applyStyles(containerObject,{
			"position": "absolute",
			"overflow": "hidden",
			"zIndex": 100,
			"height": (videoMetrics.height - videoMetrics.controlHeight) + "px",
			"width": videoMetrics.width + "px",
			"top": (options.appendCueCanvasTo ? 0 : videoMetrics.top) + "px",
			"left": (options.appendCueCanvasTo ? 0 : videoMetrics.left) + "px",
			"color": "white",
			"fontFamily": "Verdana, Helvetica, Arial, sans-serif",
			"fontSize": baseFontSize + "pt",
			"lineHeight": baseLineHeight + "pt",
			"boxSizing": "border-box"
		});
	};

	/*
		Subclassing DOMException so we can reliably throw it without browser intervention. This is quite hacky. See SO post:
		http://stackoverflow.com/questions/5136727/manually-artificially-throwing-a-domexception-with-javascript
	*/
	captionator.createDOMException = function(code,message,name) {
		try {
			//	Deliberately cause a DOMException error
			document.querySelectorAll("div/[]");
		} catch(Error) {
			//	Catch it and subclass it
			/**
			* @constructor
			*/
			var CustomDOMException = function CustomDOMException(code,message,name){ this.code = code; this.message = message; this.name = name; };
			CustomDOMException.prototype = Error;
			return new CustomDOMException(code,message,name);
		}
	};
	
	/*
		captionator.compareArray(array1, array2)
	
		Rough and ready array comparison function we can use to easily determine
		whether cues have changed or not.
	
		First parameter: The first aray to compare
	
		Second parameter: The second array to compare
		
		RETURNS:
	
		True if the arrays are the same length and all elements in each array are the strictly equal (index for index.)
		False in all other circumstances.
		Returns false if either parameter is not an instance of Array().
	
	*/
	captionator.compareArray = function compareArray(array1,array2) {
		//	If either of these arguments aren't arrays, we consider them unequal
		if (!(array1 instanceof Array) || !(array2 instanceof Array)) { return false; }
		//	If the lengths are different, we consider then unequal
		if (array1.length !== array2.length) { return false; }
		//	Loop through, break at first value inequality
		for (var index in array1) {
			if (array1.hasOwnProperty(index)) {
				if (array1[index] !== array2[index]) { return false; }
			}
		}
		//	If we haven't broken, they're the same!
		return true;
	};
	
	/*
		captionator.generateID([number ID length])
	
		Generates a randomised string prefixed with the word captionator. This function is used internally to keep track of
		objects and nodes in the DOM.
	
		First parameter: A number of random characters/numbers to generate. This defaults to 10.
	
		RETURNS:
	
		The generated ID string.
	
	*/
	captionator.generateID = function(stringLength) {
		var idComposite = "";
		stringLength = stringLength ? stringLength : 10;
		while (idComposite.length < stringLength) {
			idComposite += String.fromCharCode(65 + Math.floor(Math.random()*26));
		}
	
		return "captionator" + idComposite;
	};

})();
