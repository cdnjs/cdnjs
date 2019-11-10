/* 
	Captionator 0.4 [Stable]
	Christopher Giffard, 2011
	Share and enjoy

	https://github.com/cgiffard/Captionator
*/
/*global HTMLVideoElement: true, NodeList: true, Audio: true, HTMLElement: true */
/*jshint strict:true */
/*Tab indented, tab = 4 spaces*/

var captionator = {
	/*
		Subclassing DOMException so we can reliably throw it without browser intervention. This is quite hacky. See SO post:
		http://stackoverflow.com/questions/5136727/manually-artificially-throwing-a-domexception-with-javascript
	*/
	"createDOMException": function(code,message,name) {
		"use strict";
		try {
			// Deliberately cause a DOMException error
			document.querySelectorAll("div/[]");
		} catch(Error) {
			// Catch it and subclass it
			/**
			 * @constructor
			 */
			var CustomDOMException = function CustomDOMException(code,message,name){ this.code = code; this.message = message; this.name = name; };
			CustomDOMException.prototype = Error;
			return new CustomDOMException(code,message,name);
		}
	},
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
	"captionify": function(element,defaultLanguage,options) {
		"use strict";
		var videoElements = [], elementIndex = 0;
		options = options instanceof Object? options : {};
		
		/* Feature detection block */
		if (!HTMLVideoElement) {
			// Browser doesn't support HTML5 video - die here.
			return false;
		} else {
			// Browser supports native track API
			if (typeof(document.createElement("video").addTrack) === "function") {
				return false;
			}
		}
		
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
			this.activeCues = new captionator.ActiveTextTrackCueList(this.cues);
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
						
						if (this.readyState === captionator.TextTrack.LOADED) {
							// make sure we are actually showing current captions
							captionator.rebuildCaptions(this.videoNode);
						}
					
						if (value === captionator.TextTrack.OFF || value === captionator.TextTrack.HIDDEN) {
							// actually hide the captions
							containerID = "captionator-" + this.videoNode.id + "-" + this.kind + "-" + this.language;
							container = document.getElementById(containerID);
							if (container) {
								container.parentNode.removeChild(container);
							}
						}
						
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
								captionData = captionator.parseCaptions(ajaxObject.responseText);
								currentTrackElement.readyState = captionator.TextTrack.LOADED;
								captionator.rebuildCaptions(currentTrackElement.videoNode);
								currentTrackElement.cues.loadCues(captionData);
								currentTrackElement.onload();
								
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
					ajaxObject.send(null);
				}
			};
			
			// mutableTextTrack.addCue(cue)
			// Adds the given cue to mutableTextTrack's text track list of cues.
			// Raises an exception if the argument is null, associated with another text track, or already in the list of cues.
			
			this.addCue = function() {
				
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
		
		// Define read-only properties
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
			
			this.toString = function() {
				return "[TextTrackCueList]";
			};
		};
		captionator.TextTrackCueList.prototype = [];
		
		/**
		 * @constructor
		 */
		captionator.ActiveTextTrackCueList = function ActiveTextTrackCueList(textTrackCueList) {
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
				var cueList = this;
				this.length = 0;
				textTrackCueList.forEach(function(cue) {
					if (cue.active) {
						cueList.push(cue);
					}
				});
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
		captionator.TextTrackCue = function TextTrackCue(id, startTime, endTime, text, settings, pauseOnExit, track) {
			// Set up internal data store
			this.id = id;
			this.track = track instanceof captionator.TextTrack ? track : null;
			this.startTime = parseFloat(startTime);
			this.endTime = parseFloat(endTime);
			this.text = typeof(text) === "string" ? text : "";
			this.settings = typeof(settings) === "string" ? settings : "";
			this.intSettings = {};
			this.pauseOnExit = !!pauseOnExit;
			
			// Parse settings & set up cue defaults
			
			// A writing direction, either horizontal (a line extends horizontally and is positioned vertically,
			// with consecutive lines displayed below each other), vertical growing left (a line extends vertically
			// and is positioned horizontally, with consecutive lines displayed to the left of each other), or
			// vertical growing right (a line extends vertically and is positioned horizontally, with consecutive
			// lines displayed to the right of each other).
			this.direction = "horizontal";
			
			// A boolean indicating whether the line's position is a line position (positioned to a multiple of the
			// line dimensions of the first line of the cue), or whether it is a percentage of the dimension of the video.
			this.snapToLines = false;
			
			// Either a number giving the position of the lines of the cue, to be interpreted as defined by the
			// writing direction and snap-to-lines flag of the cue, or the special value auto, which means the
			// position is to depend on the other active tracks.
			this.linePosition = "auto";
			
			// A number giving the position of the text of the cue within each line, to be interpreted as a percentage
			// of the video, as defined by the writing direction.
			this.textPosition = 0;
			
			// A number giving the size of the box within which the text of each line of the cue is to be aligned, to
			// be interpreted as a percentage of the video, as defined by the writing direction.
			this.size = 0;
			
			// An alignment for the text of each line of the cue, either start alignment (the text is aligned towards its
			// start side), middle alignment (the text is aligned centered between its start and end sides), end alignment
			// (the text is aligned towards its end side). Which sides are the start and end sides depends on the
			// Unicode bidirectional algorithm and the writing direction. [BIDI]
			this.alignment = "";
			
			// Parse VTT Settings...
			if (this.settings.length) {
				var intSettings = this.intSettings;
				settings = settings.split(/\s+/).filter(function(settingItem) { return settingItem.length > 0;});
				if (settings instanceof Array) {
					settings.forEach(function(cueItem) {
						var settingMap = {"D":"verticalText","L":"linePosition","T":"textPosition","A":"textAlignment","S":"textSize"};
						cueItem = cueItem.split(":");
						if (settingMap[cueItem[0]]) {
							intSettings[settingMap[cueItem[0]]] = cueItem[1];
						}
					});
				}
			}
			
			// Functions defined by spec (getters, kindof)
			this.getCueAsSource = function getCueAsSource() {
				return this.text;
			};
			
			this.getCueAsHTML = function getCueAsHTML() {
				var DOMFragment = document.createDocumentFragment();
				var DOMNode = document.createElement("div");
				DOMNode.innerHTML = this.text;
				
				Array.prototype.forEach.call(DOMNode.childNodes,function(child) {
					DOMFragment.appendChild(child.cloneNode(true));
				});
				
				return DOMFragment;
			};
			
			this.isActive = function() {
				var currentTime = 0;
				if (this.track instanceof captionator.TextTrack) {
					if (this.track.mode === captionator.TextTrack.SHOWING && this.track.readyState === captionator.TextTrack.LOADED) {
						try {
							currentTime = this.track.videoNode.currentTime;
							if (this.startTime <= currentTime && this.endTime >= currentTime) {
								return true;
							}
						} catch(Error) {
							return false;
						}
					}
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
			
			// Events defined by spec
			this.onenter = function() {};
			this.onexit = function() {};
		};
		
		// Captionator media extensions
		/**
		 * @constructor
		 */
		captionator.MediaTrack = function MediaTrack(id,kind,label,language,src,type,isDefault) {
			// This function is under construction!
			// Eventually, the idea is that captionator will support timed video and audio tracks in addition to text subtitles
			
			var getSupportedMediaSource = function(sources) {
				// Thanks Mr Pilgrim! :)
				var supportedSource = sources
					.filter(function(source,index) {
						try {
							var mediaElement = document.createElement(source.getAttribute("type").split("/").shift());
							return !!(mediaElement.canPlayType && mediaElement.canPlayType(source.getAttribute("type")).replace(/no/, ''));
						} catch(Error) {
							// (The type fragment before the / probably didn't match to 'video' or 'audio'. So... we don't support it.)
							return false;
						}
					})
					.shift()
					.getAttribute("src");
				
				return supportedSource;
			};
			
			this.onload = function () {};
			this.onerror = function() {};
			
			this.id = id || "";
			this.internalMode = captionator.TextTrack.OFF;
			this.internalMode = captionator.TextTrack.OFF;
			this.mediaElement = null;
			this.kind = kind || "audiodescription";
			this.label = label || "";
			this.language = language || "";
			this.readyState = captionator.TextTrack.NONE;
			this.type = type || "x/unknown"; // MIME type
			this.mediaType = null;
			this.src = "";
			
			if (typeof(src) === "string") {
				this.src = src;
			} else if (src instanceof NodeList) {
				this.src = getSupportedMediaSource(src);
			}
			
			if (this.type.match(/^video\//)) {
				this.mediaType = "video";
			} else if (this.type.match(/^audio\//)) {
				this.mediaType = "audio";
			}
			
			// Create getters and setters for mode
			this.getMode = function() {
				return this.internalMode;
			};
			
			this.setMode = function(value) {
				var allowedModes = [captionator.TextTrack.OFF,captionator.TextTrack.HIDDEN,captionator.TextTrack.SHOWING], containerID, container;
				if (allowedModes.indexOf(value) !== -1) {
					if (value !== this.internalMode) {
						this.internalMode = value;
						if (value === captionator.TextTrack.HIDDEN && !this.mediaElement) {
							this.buildMediaElement();
						}
						
						if (value === captionator.TextTrack.SHOWING) {
							this.showMediaElement();
						}
						
						if (value === captionator.TextTrack.OFF || value === captionator.TextTrack.HIDDEN) {
							this.hideMediaElement();
						}
					}
				} else {
					throw new Error("Illegal mode value for track.");
				}
			};
			
			if (Object.prototype.__defineGetter__) {
				this.__defineGetter__("mode", this.getMode);
				this.__defineSetter__("mode", this.setMode);
			} else if (Object.defineProperty) {
				Object.defineProperty(this,"mode",
					{get: this.getMode, set: this.setMode}
				);
			}
			
			this.hideMediaElement = function() {
				if (this.mediaElement) {
					if (!this.mediaElement.paused) {
						this.mediaElement.pause();
					}
					
					if (this.mediaElement instanceof HTMLVideoElement) {
						this.mediaElement.style.display = "none";
					}
				}
			};
			
			this.showMediaElement = function() {
				if (!this.mediaElement) {
					this.buildMediaElement();
					document.body.appendChild(this.mediaElement);
				} else {
					if (!this.mediaElement.parentNode) {
						document.body.appendChild(this.mediaElement);
					}
					
					if (this.mediaElement instanceof HTMLVideoElement) {
						this.mediaElement.style.display = "block";
					}
				}
			};
			
			this.buildMediaElement = function() {
				try {
					if (this.type.match(/^video\//)) {
						this.mediaElement = document.createElement("video");
						this.mediaElement.className = "captionator-mediaElement-" + this.kind;
						captionator.styleNode(this.mediaElement,this.kind,this.videoNode);
						
					} else if (this.type.match(/^audio\//)) {
						this.mediaElement = new Audio();
					}
					
					this.mediaElement.type = this.type;
					this.mediaElement.src = this.src;
					this.mediaElement.load();
					this.mediaElement.trackObject = this;
					this.readyState = captionator.TextTrack.LOADING;
					var mediaElement = this.mediaElement;
					
					this.mediaElement.addEventListener("progress",function(eventData) {
						mediaElement.trackObject.readyState = captionator.TextTrack.LOADING;
					},false);
					
					this.mediaElement.addEventListener("canplaythrough",function(eventData) {
						mediaElement.trackObject.readyState = captionator.TextTrack.LOADED;
						mediaElement.trackObject.onload.call(mediaElement.trackObject);
					},false);
					
					this.mediaElement.addEventListener("error",function(eventData) {
						mediaElement.trackObject.readyState = captionator.TextTrack.ERROR;
						mediaElement.trackObject.mode = captionator.TextTrack.OFF;
						mediaElement.trackObject.mediaElement = null;
						mediaElement.trackObject.onerror.call(mediaElement.trackObject,eventData);
					},false);
					
				} catch(Error) {
					this.readyState = captionator.TextTrack.ERROR;
					this.mode = captionator.TextTrack.OFF;
					this.mediaElement = null;
					this.onerror.call(this,Error);
				}
			};
		};
		
		// if requested by options, export the object types
		if (options.exportObjects) {
			window.TextTrack = captionator.TextTrack;
			window.TextTrackCueList = captionator.TextTrackCueList;
			window.ActiveTextTrackCueList = captionator.ActiveTextTrackCueList;
			window.TextTrackCue = captionator.TextTrackCue;
			window.MediaTrack = captionator.MediaTrack;
		}
		
		[].slice.call(document.getElementsByTagName("video"),0).forEach(function(videoElement) {
			videoElement.addTrack = function(id,kind,label,language,src,type,isDefault) {
				var allowedKinds = ["subtitles","captions","descriptions","captions","metadata", // WHATWG SPEC
									"karaoke","lyrics","tickertext", // CAPTIONATOR TEXT EXTENSIONS
									"audiodescription","commentary", // CAPTIONATOR AUDIO EXTENSIONS
									"alternate","signlanguage"]; // CAPTIONATOR VIDEO EXTENSIONS
				
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
				}

				if (textKinds.filter(function (currentKind){
						return kind === currentKind ? true : false;
					}).length) {
					newTrack = new captionator.TextTrack(id,kind,label,language,src);
					if (newTrack) {
						if (!(videoElement.tracks instanceof Array)) {
							videoElement.tracks = [];
						}

						videoElement.tracks.push(newTrack);
						return newTrack;
					} else {
						return false;
					}
				} else {
					newTrack = new captionator.MediaTrack(id,kind,label,language,src,type,isDefault);
					if (newTrack) {
						if (!(videoElement.mediaTracks instanceof Array)) {
							videoElement.mediaTracks = [];
						}

						videoElement.mediaTracks.push(newTrack);
						return newTrack;
					} else {
						return false;
					}
				}
			};
		});
		
		
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
			for (elementIndex = 0; elementIndex < videoElements.length; elementIndex ++) {
				captionator.processVideoElement(videoElements[elementIndex],defaultLanguage,options);
			}
			return true;
		} else {
			return false;
		}
	},
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
	"processVideoElement": function(videoElement,defaultLanguage,options) {
		"use strict";
		var trackList = [];
		var language = navigator.language || navigator.userLanguage;
		var globalLanguage = defaultLanguage || language.split("-")[0];
		options = options instanceof Object? options : {};
		
		if (!videoElement.captioned) {
			videoElement.captionatorOptions = options;
			videoElement.className += (videoElement.className.length ? " " : "") + "captioned";
			videoElement.captioned = true;
			
			// Check whether video element has an ID. If not, create one
			if (videoElement.id.length === 0) {
				var idComposite = "";
				while (idComposite.length < 10) {
					idComposite += String.fromCharCode(65 + Math.floor(Math.random()*26));
				}
				
				videoElement.id = "captionator" + idComposite;
			}
			
			var enabledDefaultTrack = false;
			[].slice.call(videoElement.querySelectorAll("track"),0).forEach(function(trackElement) {
				var sources = null;
				if (trackElement.querySelectorAll("source").length > 0) {
					sources = trackElement.querySelectorAll("source");
				} else {
					sources = trackElement.getAttribute("src");
				}
				
				var trackObject = videoElement.addTrack(
										trackElement.getAttribute("id"),
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
					videoElement.tracks.forEach(function(track) {
						track.activeCues.refreshCues();
					});
				} catch(error) {}
				
				// External renderer?
				if (options.renderer instanceof Function) {
					options.renderer.call(captionator,videoElement);
				} else {
					captionator.rebuildCaptions(videoElement);
				}
				
				captionator.synchroniseMediaElements(videoElement);
			}, false);
			
			videoElement.addEventListener("play", function(eventData){
				captionator.synchroniseMediaElements(videoElement);	
			},false);
			
			videoElement.addEventListener("pause", function(eventData){
				captionator.synchroniseMediaElements(videoElement);	
			},false);
		}
		
		return videoElement;
	},
	/*
		captionator.rebuildCaptions(HTMLVideoElement videoElement)
		
		Loops through all the TextTracks for a given element and manages their display (including generation of container elements.)
		
		First parameter: HTMLVideoElement object with associated TextTracks
		
		RETURNS:
		
		Nothing.
		
	*/
	"rebuildCaptions": function(videoElement) {
		"use strict";
		var trackList = videoElement.tracks || [];
		var options = videoElement.captionatorOptions instanceof Object ? videoElement.captionatorOptions : {};
		var currentTime = videoElement.currentTime;
		var containerID = "captionator-unset"; // Hopefully you don't actually see this in your id attribute!
		var containerObject = null;
		var compositeCueHTML = "";
		var cuesChanged = false;
		
		// Work out what cues are showing...
		trackList.forEach(function(track,trackIndex) {
			if (track.mode === captionator.TextTrack.SHOWING && track.readyState === captionator.TextTrack.LOADED) {
				containerID = "captionator-" + videoElement.id + "-" + track.kind + "-" + track.language;
				if (track.containerObject) {
					containerObject = track.containerObject;
				} else {
					containerObject = document.getElementById(containerID);
				}

				if (!containerObject) {
					// visually display captions
					containerObject = document.createElement("div");
					containerObject.id = containerID;
					document.body.appendChild(containerObject);
					track.containerObject = containerObject;
					// TODO(silvia): we should only do aria-live on descriptions and that doesn't need visual display
					containerObject.setAttribute("aria-live","polite");
					containerObject.setAttribute("aria-atomic","true");
					captionator.styleNode(containerObject,track.kind,track.videoNode);
				} else if (!containerObject.parentNode) {
					document.body.appendChild(containerObject);
				}
				
				// TODO(silvia): we should not really muck with the aria-describedby attribute of the video
				if (String(videoElement.getAttribute("aria-describedby")).indexOf(containerID) === -1) {
					var existingValue = videoElement.hasAttribute("aria-describedby") ? videoElement.getAttribute("aria-describedby") + " " : "";
					videoElement.setAttribute("aria-describedby",existingValue + containerID);
				}
				
				compositeCueHTML = "";
				track.activeCues.forEach(function(cue) {
					compositeCueHTML += "<div class=\"captionator-cue\">" + cue.getCueAsSource() + "</div>";
				});
				
				cuesChanged = false;
				if (String(containerObject.innerHTML) !== compositeCueHTML) {
					containerObject.innerHTML = compositeCueHTML;
					cuesChanged = true;
				}
				
				if (compositeCueHTML.length) {
					// Defeat a horrid Chrome 10 video bug
					// http://stackoverflow.com/questions/5289854/chrome-10-custom-video-interface-problem/5400438#5400438
					if (cuesChanged || containerObject.style.display === "none") {
						containerObject.style.display = "block";

						// Refresh font sizing etc
						captionator.styleNode(containerObject,track.kind,track.videoNode);
						
						if (window.navigator.userAgent.toLowerCase().indexOf("chrome/10") > -1) {	
							containerObject.style.backgroundColor = "rgba(0,0,0,0.5" + Math.random().toString().replace(".","") + ")";
						}
					}
				} else {
					containerObject.style.display = "none";
				}
			}
		});
	},
	/*
		captionator.synchroniseMediaElements(HTMLVideoElement videoElement)
		
		Loops through all the MediaTracks for a given element and manages their display/audibility, synchronising them to the playback of the
		master video element.
		
		This function also synchronises regular HTML5 media elements with a property of syncMaster with a value equal to the ID of the current video
		element.
		
		First parameter: HTMLVideoElement object with associated MediaTracks
		
		RETURNS:
		
		Nothing.

	*/
	"synchroniseMediaElements": function(videoElement) {
		"use strict";
		var trackList = videoElement.mediaTracks || [];
		var options = videoElement.captionatorOptions instanceof Object ? videoElement.captionatorOptions : {};
		var currentTime = videoElement.currentTime;
		var synchronisationThreshold = 0.5; // How many seconds of drift will be tolerated before resynchronisation?
		
		var synchroniseElement = function(slave,master) {
			try {
				if (master.seeking) {
					slave.pause();
				}
			
				if (slave.currentTime < master.currentTime - synchronisationThreshold || slave.currentTime > master.currentTime + synchronisationThreshold) {
					slave.currentTime = master.currentTime;
				}
			
				if (slave.paused && !master.paused) {
					slave.play();
				} else if (!slave.paused && master.paused) {
					slave.pause();
				}
			} catch(Error) {
				// Probably tried to seek to an unavailable chunk of video
			}
		};
		
		// Work out what cues are showing...
		trackList.forEach(function(track,trackIndex) {
			if (track.mode === captionator.TextTrack.SHOWING && track.readyState >= captionator.TextTrack.LOADING) {
				synchroniseElement(track.mediaElement,videoElement);
			}
		});
		
		if (videoElement.id) {
			[].slice.call(document.body.querySelectorAll("*[syncMaster=" + videoElement.id + "]"),0).forEach(function(mediaElement,index) {
				if (mediaElement.tagName.toLowerCase() === "video" || mediaElement.tagName.toLowerCase() === "audio") {
					synchroniseElement(mediaElement,videoElement);
				}
			});
		}
	},
	/*
		captionator.styleNode(DOMNode, kind / role, videoElement, [boolean applyClassesOnly])
		
		Styles autogenerated caption containers and media elements according to the kind or 'role' (in the W3 spec) of the track.
		This function is not intended to allow easy application of arbitrary styles, but rather centralise all styling within
		the script (enabling easy removal of styles for replacement with CSS classes if desired.)
		
		First parameter: DOMNode to style. This parameter is mandatory.
		
		Second parameter: Role of the DOMNode. This parameter is mandatory.
		
		Third parameter: HTMLVideoElement to which the caption is attached. This is used to position the caption container appropriately.
		
		Fourth parameter: Optional boolean specifying whether to apply styles or just classes (classes are applied in both circumstances.)
		A false value will style the element - true values will only apply classes.
		
		RETURNS:
		
		Nothing.
		
	*/
	"styleNode": function(DOMNode, kind, videoElement, applyClassesOnly) {
		"use strict";
		var applyStyles = function(StyleNode, styleObject) {
			for (var styleName in styleObject) {
				if ({}.hasOwnProperty.call(styleObject, styleName)) {
					StyleNode.style[styleName] = styleObject[styleName];
				}
			}
		};
		
		var getVideoMetrics = function(DOMNode) {
			var videoComputedStyle = window.getComputedStyle(DOMNode,null);
			var offsetObject = DOMNode;
			var offsetTop = DOMNode.offsetTop, offsetLeft = DOMNode.offsetLeft;
			var width = DOMNode, height = 0;
			var controlHeight = 0;
			
			width = parseInt(videoComputedStyle.getPropertyValue("width"),10);
			height = parseInt(videoComputedStyle.getPropertyValue("height"),10);
			
			while (offsetObject = offsetObject.offsetParent) {
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
			}
			
			return {
				left: offsetLeft,
				top: offsetTop,
				width: width,
				height: height,
				controlHeight: controlHeight
			};
		};
		
		var nodeStyleHelper = function(DOMNode,position) {
			var captionHeight = 0, captionLength = 0, videoMetrics, baseFontSize, baseLineHeight, captionTop;
			var minimumFontSize = 11;				// We don't want the type getting any smaller than this.
			var minimumLineHeight = 14;				// As above, in points
			var fontSizeVerticalPercentage = 4.5;	// Caption font size is 4.5% of the video height
			var captionHeightPercentage = 13;		// Caption height defaults to 10% of video height
			var captionHeightMaxPercentage = 33;	// Captions will not occupy more than a third of the video (vertically)
			try {
				var styleHelper = function nodeStyleHelper(EventData) {
					videoMetrics = getVideoMetrics(videoElement);
					baseFontSize = ((videoMetrics.height * (fontSizeVerticalPercentage/100))/96)*72;
					baseFontSize = baseFontSize >= minimumFontSize ? baseFontSize : minimumFontSize;
					baseLineHeight = Math.floor(baseFontSize * 1.3);
					baseLineHeight = baseLineHeight > minimumLineHeight ? baseLineHeight : minimumLineHeight;
					captionHeight = Math.ceil(videoMetrics.height * (captionHeightPercentage/100));

					// Get the combined length of all caption text in the container
					if (DOMNode.textContent) {
						captionLength = DOMNode.textContent.replace(/\s\s+/ig," ").length;
					} else if (DOMNode.innerText) {
						captionLength = DOMNode.innerText.replace(/\s\s+/ig," ").length;
					}

					captionHeight = Math.ceil(videoMetrics.height * (captionHeightPercentage/100));
					captionTop = videoMetrics.top + videoMetrics.height;
					captionTop = position === "bottom" ? captionTop - (captionHeight + videoMetrics.controlHeight) : videoMetrics.top;

					applyStyles(DOMNode,{
						"width":			(videoMetrics.width - 40) + "px",
						"height":			captionHeight + "px",
						"left":				videoMetrics.left + "px",
						"top":				captionTop + "px",
						"fontSize":			baseFontSize + "pt",
						"lineHeight":		baseLineHeight + "pt"
					});

					// Clean up - set line height to caption height in the case of a single line,
					// or increase caption height to accommodate larger captions

					// This post-style restyle is somewhat hacky, and I'd prefer to calculate whether overflow is going to occur
					// before styling the first time - but this renderer is going to be replaced shortly so it's not really worth
					// spending huge amounts of time on...
					if (DOMNode.scrollHeight > captionHeight) {
						var tempMaxCaptionHeight = Math.ceil((captionHeightMaxPercentage/100)*videoMetrics.height);
						captionHeight = DOMNode.scrollHeight <= tempMaxCaptionHeight ? DOMNode.scrollHeight : tempMaxCaptionHeight;
						captionTop = videoMetrics.top + videoMetrics.height;
						captionTop = position === "bottom" ? captionTop - (captionHeight + videoMetrics.controlHeight) : videoMetrics.top;
						applyStyles(DOMNode,{
							"height":	captionHeight + "px",
							"top":		captionTop + "px"
						});
					} else {
						// Calculate the height of all the cues inside the container - and stretch out the line height to position
						// them all equally in vertical space
						var compositeHeight = 0;
						Array.prototype.slice.call(DOMNode.childNodes,0).forEach(function(node) {
							compositeHeight += node.offsetHeight;
						});

						if (compositeHeight < (captionHeight * 0.9)) {
							baseLineHeight = baseLineHeight + (((captionHeight-compositeHeight)/96)*72);
							applyStyles(DOMNode,{
								"lineHeight":	baseLineHeight + "pt"
							});
						}
					}

				};

				if (!DOMNode.resizeHelper) {
					DOMNode.resizeHelper = window.addEventListener("resize",styleHelper,false);
				}

				styleHelper();
			} catch(Error) {}
		};
		
		if (DOMNode instanceof HTMLElement && videoElement instanceof HTMLVideoElement) {
			var videoMetrics = getVideoMetrics(videoElement);
			var captionHeight = 0;
			switch (kind) {
				case "caption":
				case "captions":
				case "subtitle":
				case "subtitles":
					// Simple display, darkened rectangle, white or light text, down the bottom of the video container.
					// This is basically the default style.
					captionHeight = Math.ceil(videoMetrics.height * 0.15 < 30 ? 30 : videoMetrics.height * 0.15);
					applyStyles(DOMNode,{
						"display":			"block",
						"position":			"absolute",
						"width":			(videoMetrics.width - 40) + "px",
						"height":			captionHeight + "px",
						"backgroundColor":	"rgba(0,0,0,0.5)",
						"left":				videoMetrics.left + "px",
						"top":				(videoMetrics.top + videoMetrics.height) - (captionHeight + videoMetrics.controlHeight) + "px",
						"color":			"white",
						"textShadow":		"black 0px 0px 5px",
						"fontFamily":		"Helvetica, Arial, sans-serif",
						"fontWeight":		"bold",
						"textAlign":		"center",
						"paddingLeft":		"20px",
						"paddingRight":		"20px",
						"overflow":			"hidden",
						"zIndex":			20
					});
					
					nodeStyleHelper(DOMNode,"bottom");
					
				break;
				case "textaudiodesc":
				case "descriptions":
					// No idea what this is supposed to look like...
					// No visual display - only read out to screen reader
					
					// For the time being, using lyrics display.
					
				case "karaoke":
				case "lyrics":
					// Decided to put both of these together (they're basically the same thing, save for the bouncing ball!)
				
					captionHeight = (videoMetrics.height * 0.1 < 20 ? 20 : videoMetrics.height * 0.1);
					applyStyles(DOMNode,{
						"display":			"block",
						"position":			"absolute",
						"width":			(videoMetrics.width - 40) + "px",
						"minHeight":		captionHeight + "px",
						"backgroundColor":	"rgba(0,0,0,0.5)",
						"left":				videoMetrics.left + "px",
						"top":				videoMetrics.top + "px",
						"color":			"gold",
						"fontStyle":		"oblique",
						"textShadow":		"black 0px 0px 5px",
						"fontFamily":		"Helvetica, Arial, sans-serif",
						"fontWeight":		"lighter",
						"textAlign":		"center",
						"paddingLeft":		"20px",
						"paddingRight":		"20px",
						"overflow":			"hidden"
					});
					
					nodeStyleHelper(DOMNode,"top");
					
				break;
				case "chapters":
				
				break;
				case "tickertext":
					// Stock ticker style, smaller than regular subtitles to fit more in.
				
				break;
				case "toolbar":
					// Non-standard extension for multi-track media selection toolbars
				
				case "alternate":
					// Alternate video angles
					// This is a very crude way of keeping the controls visible indeed.
					// Should perhaps switch the alternate video to be the controlling one when it's visible?
					applyStyles(DOMNode,{
						"display":			"block",
						"position":			"absolute",
						"width":			videoMetrics.width + "px",
						"height":			(videoMetrics.height - videoMetrics.controlHeight) + "px",
						"backgroundColor":	"black",
						"left":				videoMetrics.left + "px",
						"top":				videoMetrics.top + "px"
					});
					
				break;
				case "signlanguage":
					applyStyles(DOMNode,{
						"display":			"block",
						"position":			"absolute",
						"maxWidth":			((videoMetrics.width/20)*6) + "px",
						"maxHeight":		(((videoMetrics.height - videoMetrics.controlHeight)/20)*8) + "px",
						"backgroundColor":	"black",
						"left":				((videoMetrics.left + videoMetrics.width) - ((videoMetrics.width/20)*7)) + "px",
						"top":				((videoMetrics.top + videoMetrics.height) - ((videoMetrics.height/20)*11)) + "px",
						"border":			"solid white 2px"
					});
					
				break;
				default:
					// Whoah, we didn't prepare for this one. Just class it with the requested name and move on.
					// this should be "subtitles"
			}
			
			if (DOMNode.className.indexOf("captionator-kind") === -1) {
				DOMNode.className += (DOMNode.className.length ? " " : "") + "captionator-kind-" + kind;
			}
		}
	},
	/*
		captionator.parseCaptions(string captionData)
		
		Accepts and parses SRT caption/subtitle data. Will extend for WebVTT shortly. Perhaps non-JSON WebVTT will work already?
		This function has been intended from the start to (hopefully) loosely parse both. I'll patch it as required.
		
		First parameter: Entire text data (UTF-8) of the retrieved SRT/WebVTT file. This parameter is mandatory. (really - what did
		you expect it was going to do without it!)
		
		RETURNS:
		
		An array of TextTrackCue Objects in initial state.
		
	*/
	"parseCaptions": function(captionData) {
		"use strict";
		// Be liberal in what you accept from others...
		var fileType = "";
		if (captionData) {
			var parseCaptionChunk = function parseCaptionChunk(subtitleElement,objectCount) {
				var subtitleParts = subtitleElement.split(/\n/g);
				var timeIn, timeOut, html, timeData, subtitlePartIndex, cueSettings, id;
				var timestampMatch;

				var SUBTimestampParser		= /^(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\,(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s*(.*)/;
				var SBVTimestampParser		= /^(\d+)?:?(\d{2}):(\d{2})\.(\d+)\,(\d+)?:?(\d{2}):(\d{2})\.(\d+)\s*(.*)/;
				var SRTTimestampParser		= /^(\d{2})?:?(\d{2}):(\d{2})[\.\,](\d+)\s+\-\-\>\s+(\d{2})?:?(\d{2}):(\d{2})[\.\,](\d+)\s*(.*)/;
				var GoogleTimestampParser	= /^([\d\.]+)\s+\+([\d\.]+)\s*(.*)/;

				// Trim off any blank lines (logically, should only be max. one, but loop to be sure)
				while (!subtitleParts[0].replace(/\s+/ig,"").length && subtitleParts.length > 0) {
					subtitleParts.shift();
				}

				if (subtitleParts[0].match(/^\s*\d+\s*$/ig)) {
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
						
						timeIn = 	parseInt((timeData[0]||0) * 60 * 60,10) +	// Hours
									parseInt((timeData[1]||0) * 60,10) +		// Minutes
									parseInt((timeData[2]||0),10) +				// Seconds
									parseFloat("0." + (timeData[3]||0),10);		// MS
						
						timeOut = 	parseInt((timeData[4]||0) * 60 * 60,10) +	// Hours
									parseInt((timeData[5]||0) * 60,10) +		// Minutes
									parseInt((timeData[6]||0),10) +				// Seconds
									parseFloat("0." + (timeData[7]||0),10);		// MS
						
						if (timeData[8]) {
							cueSettings = timeData[8];
						}
					
					} else if (timestampMatch = GoogleTimestampParser.exec(timestamp)) {

						// Google's proposed WebVTT timestamp style
						timeData = timestampMatch.slice(1);
						
						timeIn = parseFloat(timeData[0],10);
						timeOut = timeIn + parseFloat(timeData[1],10);

						if (timeData[2]) {
							cueSettings = timeData[2];
						}

					}
					
					// We've got the timestamp - return all the other unmatched lines as the raw subtitle data
					subtitleParts = subtitleParts.slice(0,subtitlePartIndex).concat(subtitleParts.slice(subtitlePartIndex+1));
					break;
				}
				
				// The remaining lines are the subtitle payload itself (after removing an ID if present, and the time);
				html = subtitleParts.join("\n");
				return new captionator.TextTrackCue(id, timeIn, timeOut, html, cueSettings, false, null);
			};

			// Begin parsing --------------------
			var subtitles = captionData
							.replace(/\r\n/g,"\n")
							.replace(/\r/g,"\n")
							.split(/\n\n+/g)
							.filter(function(lineGroup) {
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
							.map(parseCaptionChunk);
			
			return subtitles;
		} else {
			throw new Error("Required parameter captionData not supplied.");
		}
	}
};