webshims.register('track', function($, webshims, window, document, undefined){
	"use strict";
	var mediaelement = webshims.mediaelement;
	var id = new Date().getTime();
	//descriptions are not really shown, but they are inserted into the dom
	var showTracks = {subtitles: 1, captions: 1, descriptions: 1};
	var dummyTrack = $('<track />');
	var support = webshims.support;
	var supportTrackMod = support.ES5 && support.objectAccessor;
	var createEventTarget = function(obj){
		var eventList = {};
		obj.addEventListener = function(name, fn){
			if(eventList[name]){
				webshims.error('always use $.on to the shimed event: '+ name +' already bound fn was: '+ eventList[name] +' your fn was: '+ fn);
			}
			eventList[name] = fn;
			
		};
		obj.removeEventListener = function(name, fn){
			if(eventList[name] && eventList[name] != fn){
				webshims.error('always use $.on/$.off to the shimed event: '+ name +' already bound fn was: '+ eventList[name] +' your fn was: '+ fn);
			}
			if(eventList[name]){
				delete eventList[name];
			}
		};
		return obj;
	};
	
	var cueListProto = {
		getCueById: function(id){
			var cue = null;
			for(var i = 0, len = this.length; i < len; i++){
				if(this[i].id === id){
					cue = this[i];
					break;
				}
			}
			return cue;
		}
	};
	var numericModes = {
		0: 'disabled',
		1: 'hidden',
		2: 'showing'
	};
	
	var textTrackProto = {
		shimActiveCues: null,
		_shimActiveCues: null,
		activeCues: null,
		cues: null,
		kind: 'subtitles',
		label: '',
		language: '',
		id: '',
		mode: 'disabled',
		oncuechange: null,
		toString: function() {
			return "[object TextTrack]";
		},
		addCue: function(cue){
			if(!this.cues){
				this.cues = mediaelement.createCueList();
			} else {
				var lastCue = this.cues[this.cues.length-1];
				if(lastCue && lastCue.startTime > cue.startTime){
					webshims.error("cue startTime higher than previous cue's startTime");
				}
			}
			if(cue.track && cue.track.removeCue){
				cue.track.removeCue(cue);
			}
			cue.track = this;
			this.cues.push(cue);
		},
		//ToDo: make it more dynamic
		removeCue: function(cue){
			var cues = this.cues || [];
			var i = 0;
			var len = cues.length;
			if(cue.track != this){
				webshims.error("cue not part of track");
				return;
			}
			for(; i < len; i++){
				if(cues[i] === cue){
					cues.splice(i, 1);
					cue.track = null;
					break;
				}
			}
			if(cue.track){
				webshims.error("cue not part of track");
				return;
			}
		}/*,
		DISABLED: 'disabled',
		OFF: 'disabled',
		HIDDEN: 'hidden',
		SHOWING: 'showing',
		ERROR: 3,
		LOADED: 2,
		LOADING: 1,
		NONE: 0*/
	};
	var copyProps = ['kind', 'label', 'srclang'];
	var copyName = {srclang: 'language'};

	var updateMediaTrackList = function(baseData, trackList){
		var removed = [];
		var added = [];
		var newTracks = [];
		var i, len;
		if(!baseData){
			baseData =  webshims.data(this, 'mediaelementBase') || webshims.data(this, 'mediaelementBase', {});
		}
		
		if(!trackList){
			baseData.blockTrackListUpdate = true;
			trackList = $.prop(this, 'textTracks');
			baseData.blockTrackListUpdate = false;
		}
		
		clearTimeout(baseData.updateTrackListTimer);
		
		$('track', this).each(function(){
			var track = $.prop(this, 'track');
			newTracks.push(track);
			if(trackList.indexOf(track) == -1){
				added.push(track);
			}
		});
		
		if(baseData.scriptedTextTracks){
			for(i = 0, len = baseData.scriptedTextTracks.length; i < len; i++){
				newTracks.push(baseData.scriptedTextTracks[i]);
				if(trackList.indexOf(baseData.scriptedTextTracks[i]) == -1){
					added.push(baseData.scriptedTextTracks[i]);
				}
			}
		}
		
		for(i = 0, len = trackList.length; i < len; i++){
			if(newTracks.indexOf(trackList[i]) == -1){
				removed.push(trackList[i]);
			}
		}
		
		if(removed.length || added.length){
			trackList.splice(0);
			
			for(i = 0, len = newTracks.length; i < len; i++){
				trackList.push(newTracks[i]);
			}
			for(i = 0, len = removed.length; i < len; i++){
				$([trackList]).triggerHandler($.Event({type: 'removetrack', track: removed[i]}));
			}
			for(i = 0, len = added.length; i < len; i++){
				$([trackList]).triggerHandler($.Event({type: 'addtrack', track: added[i]}));
			}
			if(baseData.scriptedTextTracks || removed.length){
				$(this).triggerHandler('updatetrackdisplay');
			}
		}
	};
	
	var refreshTrack = function(track, trackData){
		if(!trackData){
			trackData = webshims.data(track, 'trackData');
		}
		
		if(trackData && !trackData.isTriggering){
			trackData.isTriggering = true;
			setTimeout(function(){
				$(track).closest('audio, video').triggerHandler('updatetrackdisplay');
				trackData.isTriggering = false;
			}, 1);
		}
	};
	var isDefaultTrack = (function(){
		var defaultKinds = {
			subtitles: {
				subtitles: 1,
				captions: 1
			},
			descriptions: {descriptions: 1},
			chapters: {chapters: 1}
		};
		defaultKinds.captions = defaultKinds.subtitles;
		
		return function(track){
			var kind, firstDefaultTrack;
			var isDefault = $.prop(track, 'default');
			if(isDefault && (kind = $.prop(track, 'kind')) != 'metadata'){
				firstDefaultTrack = $(track)
					.parent()
					.find('track[default]')
					.filter(function(){
						return !!(defaultKinds[kind][$.prop(this, 'kind')]);
					})[0]
				;
				if(firstDefaultTrack != track){
					isDefault = false;
					webshims.error('more than one default track of a specific kind detected. Fall back to default = false');
				}
			}
			return isDefault;
		};
	})();
	var emptyDiv = $('<div />')[0];

	function VTTCue(startTime, endTime, text){
		if(arguments.length != 3){
			webshims.error("wrong arguments.length for VTTCue.constructor");
		}

		this.startTime = startTime;
		this.endTime = endTime;
		this.text = text;
		this.onenter = null;
		this.onexit = null;
		this.pauseOnExit = false;
		this.track = null;
		this.id = null;
		this.getCueAsHTML = (function(){
			var lastText = "";
			var parsedText = "";
			var fragment;

			return function(){
				var i, len;
				if(!fragment){
					fragment = document.createDocumentFragment();
				}
				if(lastText != this.text){
					lastText = this.text;
					parsedText = mediaelement.parseCueTextToHTML(lastText);
					emptyDiv.innerHTML = parsedText;

					for(i = 0, len = emptyDiv.childNodes.length; i < len; i++){
						fragment.appendChild(emptyDiv.childNodes[i].cloneNode(true));
					}
				}
				return fragment.cloneNode(true);
			};

		})();
	}
	
	window.VTTCue = VTTCue;
	window.TextTrackCue = function(){
		webshims.error("Use VTTCue constructor instead of abstract TextTrackCue constructor.");
		VTTCue.apply(this, arguments);
	};

	window.TextTrackCue.prototype = VTTCue.prototype;

	mediaelement.createCueList = function(){
		return $.extend([], cueListProto);
	};
	
	mediaelement.parseCueTextToHTML = (function(){
		var tagSplits = /(<\/?[^>]+>)/ig;
		var allowedTags = /^(?:c|v|ruby|rt|b|i|u)/;
		var regEnd = /\<\s*\//;
		var addToTemplate = function(localName, attribute, tag, html){
			var ret;
			if(regEnd.test(html)){
				ret = '</'+ localName +'>';
			} else {
				tag.splice(0, 1);
				ret =  '<'+ localName +' '+ attribute +'="'+ (tag.join(' ').replace(/\"/g, '&#34;')) +'">';
			}
			return ret;
		};
		var replacer = function(html){
			var tag = html.replace(/[<\/>]+/ig,"").split(/[\s\.]+/);
			if(tag[0]){
				tag[0] = tag[0].toLowerCase();
				if(allowedTags.test(tag[0])){
					if(tag[0] == 'c'){
						html = addToTemplate('span', 'class', tag, html);
					} else if(tag[0] == 'v'){
						html = addToTemplate('q', 'title', tag, html);
					}
				} else {
					html = "";
				}
			}
			return html;
		};
		
		return function(cueText){
			return cueText.replace(tagSplits, replacer);
		};
	})();
	var mapTtmlToVtt = function(i){
		var content = i+'';
		var begin = this.getAttribute('begin') || '';
		var end = this.getAttribute('end') || '';
		var text = $.trim($.text(this));
		if(!/\./.test(begin)){
			begin += '.000';
		}
		if(!/\./.test(end)){
			end += '.000';
		}
		content += '\n';
		content += begin +' --> '+end+'\n';
		content += text;
		return content;
	};
	var ttmlTextToVTT = function(ttml){
		ttml = $.parseXML(ttml) || [];
		return $(ttml).find('[begin][end]').map(mapTtmlToVtt).get().join('\n\n') || '';
	};
	var loadingTracks = 0;

	mediaelement.loadTextTrack = function(mediaelem, track, trackData, _default){
		var loadEvents = 'play playing loadedmetadata loadstart';
		var obj = trackData.track;
		var load = function(){
			var error, ajax, createAjax;
			var isDisabled = obj.mode == 'disabled';
			var videoState = !!($.prop(mediaelem, 'readyState') > 0 || $.prop(mediaelem, 'networkState') == 2 || !$.prop(mediaelem, 'paused'));
			var src = (!isDisabled || videoState) && ($.attr(track, 'src') && $.prop(track, 'src'));

			if(src){
				$(mediaelem).off(loadEvents, load).off('updatetrackdisplay', load);

				if(!trackData.readyState){
					error = function(){
						loadingTracks--;
						trackData.readyState = 3;
						obj.cues = null;
						obj.activeCues = obj.shimActiveCues = obj._shimActiveCues = null;
						$(track).triggerHandler('error');
					};
					trackData.readyState = 1;
					try {
						obj.cues = mediaelement.createCueList();
						obj.activeCues = obj.shimActiveCues = obj._shimActiveCues = mediaelement.createCueList();
						loadingTracks++;
						createAjax = function(){
							ajax = $.ajax({
								dataType: 'text',
								url: src,
								success: function(text){
									loadingTracks--;
									var contentType = ajax.getResponseHeader('content-type') || '';

									if(!contentType.indexOf('application/xml')){
										text = ttmlTextToVTT(text);
									} else if(contentType.indexOf('text/vtt')){
										webshims.error('set the mime-type of your WebVTT files to text/vtt. see: http://dev.w3.org/html5/webvtt/#text/vtt');
									}
									mediaelement.parseCaptions(text, obj, function(cues){
										if(cues && 'length' in cues){
											trackData.readyState = 2;
											$(track).triggerHandler('load');
											$(mediaelem).triggerHandler('updatetrackdisplay');
										} else {
											error();
										}
									});
								},
								error: error
							});
						};
						if(isDisabled){
							setTimeout(createAjax, loadingTracks * 2);
						} else {
							createAjax();
						}
					} catch(er){
						error();
						webshims.error(er);
					}
				}
			}
		};
		trackData.readyState = 0;
		obj.shimActiveCues = null;
		obj._shimActiveCues = null;
		obj.activeCues = null;
		obj.cues = null;

		$(mediaelem).on(loadEvents, load);

		if(_default){
			obj.mode = showTracks[obj.kind] ? 'showing' : 'hidden';
			load();
		} else {
			$(mediaelem).on('updatetrackdisplay', load);
		}
	};
	
	mediaelement.createTextTrack = function(mediaelem, track){
		var obj, trackData;
		if(track.nodeName){
			trackData = webshims.data(track, 'trackData');
			
			if(trackData){
				refreshTrack(track, trackData);
				obj = trackData.track;
			}
		}
		
		if(!obj){
			obj = createEventTarget(webshims.objectCreate(textTrackProto));
			
			if(!supportTrackMod){
				copyProps.forEach(function(copyProp){
					var prop = $.prop(track, copyProp);
					if(prop){
						obj[copyName[copyProp] || copyProp] = prop;
					}
				});
			}
			
			
			if(track.nodeName){
				if(supportTrackMod){
					copyProps.forEach(function(copyProp){
						webshims.defineProperty(obj, copyName[copyProp] || copyProp, {
							get: function(){
								return $.prop(track, copyProp);
							}
						});
					});
				}
				obj.id = $(track).prop('id');
				trackData = webshims.data(track, 'trackData', {track: obj});
				mediaelement.loadTextTrack(mediaelem, track, trackData, isDefaultTrack(track));
			} else {
				if(supportTrackMod){
					copyProps.forEach(function(copyProp){
						webshims.defineProperty(obj, copyName[copyProp] || copyProp, {
							value: track[copyProp],
							writeable: false
						});
					});
				}
				obj.cues = mediaelement.createCueList();
				obj.activeCues = obj._shimActiveCues = obj.shimActiveCues = mediaelement.createCueList();
				obj.mode = 'hidden';
				obj.readyState = 2;
			}
			if(obj.kind == 'subtitles' && !obj.language){
				webshims.error('you must provide a language for track in subtitles state');
			}
			obj.__wsmode = obj.mode;

			webshims.defineProperty(obj, '_wsUpdateMode', {
				value: function(){
					$(mediaelem).triggerHandler('updatetrackdisplay');
				},
				enumerable: false
			});
		}
		
		return obj;
	};

	if(!$.propHooks.mode){
		$.propHooks.mode = {
			set: function(obj, value){
				obj.mode = value;
				if(obj._wsUpdateMode && obj._wsUpdateMode.call){
					obj._wsUpdateMode();
				}
				return obj.mode;
			}
		};
	}

/*
taken from:
Captionator 0.5.1 [CaptionCrunch]
Christopher Giffard, 2011
Share and enjoy

https://github.com/cgiffard/Captionator

modified for webshims
*/
	mediaelement.parseCaptionChunk = (function(){
		// Set up timestamp parsers
		var WebVTTTimestampParser		= /^(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s+\-\-\>\s+(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s*(.*)/;
		var WebVTTDEFAULTSCueParser		= /^(DEFAULTS|DEFAULT)\s+\-\-\>\s+(.*)/g;
		var WebVTTSTYLECueParser		= /^(STYLE|STYLES)\s+\-\-\>\s*\n([\s\S]*)/g;
		var WebVTTCOMMENTCueParser		= /^(COMMENT|COMMENTS)\s+\-\-\>\s+(.*)/g;
		var SRTTimestampParser			= /^(\d{2})?:?(\d{2}):(\d{2})[\.\,](\d+)\s+\-\-\>\s+(\d{2})?:?(\d{2}):(\d{2})[\.\,](\d+)\s*(.*)/;

		return function(subtitleElement,objectCount){

			var subtitleParts, timeIn, timeOut, html, timeData, subtitlePartIndex, id;
			var timestampMatch, tmpCue;

			// WebVTT Special Cue Logic
			if (WebVTTDEFAULTSCueParser.exec(subtitleElement) || WebVTTCOMMENTCueParser.exec(subtitleElement) || WebVTTSTYLECueParser.exec(subtitleElement)) {
				return null;
			}

			subtitleParts = subtitleElement.split(/\n/g);

			// Trim off any blank lines (logically, should only be max. one, but loop to be sure)
			while (!subtitleParts[0].replace(/\s+/ig,"").length && subtitleParts.length > 0) {
				subtitleParts.shift();
			}

			if (subtitleParts[0].match(/^\s*[a-z0-9-\_]+\s*$/ig)) {
				// The identifier becomes the cue ID (when *we* load the cues from file. Programatically created cues can have an ID of whatever.)
				id = String(subtitleParts.shift().replace(/\s*/ig,""));
			}

			for (subtitlePartIndex = 0; subtitlePartIndex < subtitleParts.length; subtitlePartIndex ++) {
				var timestamp = subtitleParts[subtitlePartIndex];

				if ((timestampMatch = WebVTTTimestampParser.exec(timestamp)) || (timestampMatch = SRTTimestampParser.exec(timestamp))) {

					// WebVTT

					timeData = timestampMatch.slice(1);

					timeIn =	parseInt((timeData[0]||0) * 60 * 60,10) +	// Hours
								parseInt((timeData[1]||0) * 60,10) +		// Minutes
								parseInt((timeData[2]||0),10) +				// Seconds
								parseFloat("0." + (timeData[3]||0));		// MS

					timeOut =	parseInt((timeData[4]||0) * 60 * 60,10) +	// Hours
								parseInt((timeData[5]||0) * 60,10) +		// Minutes
								parseInt((timeData[6]||0),10) +				// Seconds
								parseFloat("0." + (timeData[7]||0));		// MS
/*
					if (timeData[8]) {
						cueSettings = timeData[8];
					}
*/
				}

				// We've got the timestamp - return all the other unmatched lines as the raw subtitle data
				subtitleParts = subtitleParts.slice(0,subtitlePartIndex).concat(subtitleParts.slice(subtitlePartIndex+1));
				break;
			}

			if (!timeIn && !timeOut) {
				// We didn't extract any time information. Assume the cue is invalid!
				webshims.warn("couldn't extract time information: "+[timeIn, timeOut, subtitleParts.join("\n"), id].join(' ; '));
				return null;
			}
/*
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

			// Turn back into string like the VTTCue constructor expects
			cueSettings = "";
			for (var key in compositeCueSettings) {
				if (compositeCueSettings.hasOwnProperty(key)) {
					cueSettings += !!cueSettings.length ? " " : "";
					cueSettings += key + ":" + compositeCueSettings[key];
				}
			}
*/
			// The remaining lines are the subtitle payload itself (after removing an ID if present, and the time);
			html = subtitleParts.join("\n");
			tmpCue = new VTTCue(timeIn, timeOut, html);
			if(id){
				tmpCue.id = id;
			}
			return tmpCue;
		};
	})();

	mediaelement.parseCaptions = function(captionData, track, complete) {

		var cue, lazyProcess, regWevVTT, startDate, isWEBVTT;

		mediaelement.createCueList();
		if (captionData) {

			regWevVTT = /^WEBVTT(\s*FILE)?/ig;

			lazyProcess = function(i, len){

				for(; i < len; i++){
					cue = captionData[i];
					if(regWevVTT.test(cue)){
						isWEBVTT = true;
					} else if(cue.replace(/\s*/ig,"").length){
						cue = mediaelement.parseCaptionChunk(cue, i);
						if(cue){
							track.addCue(cue);
						}
					}
					if(startDate < (new Date().getTime()) - 30){
						i++;
						setTimeout(function(){
							startDate = new Date().getTime();
							lazyProcess(i, len);
						}, 90);

						break;
					}
				}
				if(i >= len){
					if(!isWEBVTT){
						webshims.error('please use WebVTT format. This is the standard');
					}
					complete(track.cues);
				}
			};

			captionData = captionData.replace(/\r\n/g,"\n");

			setTimeout(function(){
				captionData = captionData.replace(/\r/g,"\n");
				setTimeout(function(){
					startDate = new Date().getTime();
					captionData = captionData.split(/\n\n+/g);
					lazyProcess(0, captionData.length);
				}, 9);
			}, 9);

		} else {
			webshims.error("Required parameter captionData not supplied.");
		}
	};

	
	mediaelement.createTrackList = function(mediaelem, baseData){
		baseData = baseData || webshims.data(mediaelem, 'mediaelementBase') || webshims.data(mediaelem, 'mediaelementBase', {});
		if(!baseData.textTracks){
			baseData.textTracks = [];
			webshims.defineProperties(baseData.textTracks, {
				onaddtrack: {value: null},
				onremovetrack: {value: null},
				onchange: {value: null},
				getTrackById: {
					value: function(id){
						var track = null;
						for(var i = 0; i < baseData.textTracks.length; i++){
							if(id == baseData.textTracks[i].id){
								track = baseData.textTracks[i];
								break;
							}
						}
						return track;
					}
				}
			});
			createEventTarget(baseData.textTracks);
			$(mediaelem).on('updatetrackdisplay', function(){
				var track;
				for(var i = 0; i < baseData.textTracks.length; i++){
					track = baseData.textTracks[i];
					if(track.__wsmode != track.mode){
						track.__wsmode = track.mode;
						$([ baseData.textTracks ]).triggerHandler('change');
					}
				}
			});
			
		}
		return baseData.textTracks;
	};
	
	if(!support.track){
		webshims.defineNodeNamesBooleanProperty(['track'], 'default');
		webshims.reflectProperties(['track'], ['srclang', 'label']);
		
		webshims.defineNodeNameProperties('track', {
			src: {
				//attr: {},
				reflect: true,
				propType: 'src'
			}
		});
	}
	
	webshims.defineNodeNameProperties('track', {
		kind: {
			attr: support.track ? {
				set: function(value){
					var trackData = webshims.data(this, 'trackData');
					this.setAttribute('data-kind', value);
					if(trackData){
						trackData.attrKind = value;
					}
				},
				get: function(){
					var trackData = webshims.data(this, 'trackData');
					if(trackData && ('attrKind' in trackData)){
						return trackData.attrKind;
					}
					return this.getAttribute('kind');
				}
			} : {},
			reflect: true,
			propType: 'enumarated',
			defaultValue: 'subtitles',
			limitedTo: ['subtitles', 'captions', 'descriptions', 'chapters', 'metadata']
		}
	});
	
	$.each(copyProps, function(i, copyProp){
		var name = copyName[copyProp] || copyProp;
		webshims.onNodeNamesPropertyModify('track', copyProp, function(){
			var trackData = webshims.data(this, 'trackData');

			if(trackData){
				if(copyProp == 'kind'){
					refreshTrack(this, trackData);
				}
				if(!supportTrackMod){
					trackData.track[name] = $.prop(this, copyProp);
				}
			}
		});
	});		
	
	
	webshims.onNodeNamesPropertyModify('track', 'src', function(val){
		if(val){
			var data = webshims.data(this, 'trackData');
			var media;
			if(data){
				media = $(this).closest('video, audio');
				if(media[0]){
					mediaelement.loadTextTrack(media, this, data);
				}
			}
		}
		
	});
	
	//
	webshims.defineNodeNamesProperties(['track'], {
		ERROR: {
			value: 3
		},
		LOADED: {
			value: 2
		},
		LOADING: {
			value: 1
		},
		NONE: {
			value: 0
		},
		readyState: {
			get: function(){
				return (webshims.data(this, 'trackData') || {readyState: 0}).readyState;
			},
			writeable: false
		},
		track: {
			get: function(){
				return mediaelement.createTextTrack($(this).closest('audio, video')[0], this);
			},
			writeable: false
		}
	}, 'prop');
	
	webshims.defineNodeNamesProperties(['audio', 'video'], {
		textTracks: {
			get: function(){
				var media = this;
				var baseData = webshims.data(media, 'mediaelementBase') || webshims.data(media, 'mediaelementBase', {});
				var tracks = mediaelement.createTrackList(media, baseData);
				if(!baseData.blockTrackListUpdate){
					updateMediaTrackList.call(media, baseData, tracks);
				}
				return tracks;
			},
			writeable: false
		},
		addTextTrack: {
			value: function(kind, label, lang){
				var textTrack = mediaelement.createTextTrack(this, {
					kind: dummyTrack.prop('kind', kind || '').prop('kind'),
					label: label || '',
					srclang: lang || ''
				});
				var baseData = webshims.data(this, 'mediaelementBase') || webshims.data(this, 'mediaelementBase', {});
				if (!baseData.scriptedTextTracks) {
					baseData.scriptedTextTracks = [];
				}
				baseData.scriptedTextTracks.push(textTrack);
				updateMediaTrackList.call(this);
				return textTrack;
			}
		}
	}, 'prop');

	//wsmediareload
	var thUpdateList = function(e){
		if($(e.target).is('audio, video')){
			var baseData = webshims.data(e.target, 'mediaelementBase');
			if(baseData){
				clearTimeout(baseData.updateTrackListTimer);
				baseData.updateTrackListTimer = setTimeout(function(){
					updateMediaTrackList.call(e.target, baseData);
				}, 0);
			}
		}
	};
	
	var getNativeReadyState = function(trackElem, textTrack){
		return textTrack.readyState || trackElem.readyState;
	};
	var stopOriginalEvent = function(e){
		if(e.originalEvent){
			e.stopImmediatePropagation();
		}
	};
	var hideNativeTracks = function(){
		if(webshims.implement(this, 'track')){
			var kind;
			var origTrack = this.track;
			if(origTrack){

				if (!webshims.bugs.track && (origTrack.mode || getNativeReadyState(this, origTrack))) {
					$.prop(this, 'track').mode = numericModes[origTrack.mode] || origTrack.mode;
				}
				//disable track from showing + remove UI
				kind = $.prop(this, 'kind');
				origTrack.mode = (typeof origTrack.mode == 'string') ? 'disabled' : 0;
				this.kind = 'metadata';

				$(this).attr({kind: kind});
				
			}
			$(this).on('load error', stopOriginalEvent);
		}
	};

	webshims.addReady(function(context, insertedElement){
		var insertedMedia = insertedElement.filter('video, audio, track').closest('audio, video');
		$('video, audio', context)
			.add(insertedMedia)
			.each(function(){
				updateMediaTrackList.call(this);
			})
			.on('emptied updatetracklist wsmediareload', thUpdateList)
			.each(function(){
				if(support.track){
					var shimedTextTracks = $.prop(this, 'textTracks');
					var origTextTracks = this.textTracks;

					if(shimedTextTracks.length != origTextTracks.length){
						webshims.warn("textTracks couldn't be copied");
					}
					
					$('track', this).each(hideNativeTracks);
				}
			})
		;

		insertedMedia.each(function(){
			var media = this;
			var baseData = webshims.data(media, 'mediaelementBase');
			if(baseData){
				clearTimeout(baseData.updateTrackListTimer);
				baseData.updateTrackListTimer = setTimeout(function(){
					updateMediaTrackList.call(media, baseData);
				}, 9);
			}
		});
	});
	
	if(support.texttrackapi){
		$('video, audio').trigger('trackapichange');
	}
});
