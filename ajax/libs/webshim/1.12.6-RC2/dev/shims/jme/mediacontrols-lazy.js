webshims.register('jme', function($, webshims, window, doc, undefined){
	"use strict";
	var plugins = $.jme.plugins;
	var pseudoClasses = 'pseudoClasses';
	var playStates = {
		play: 1,
		playing: 1
	};
	var pauseStates = {
		pause: 1,
		ended: 1
	};

	var loadRange = function(){
		webshims.loader.loadList(['range-ui']);
	};
	var onSliderReady = function(fn){
		loadRange();
		webshims.ready('range-ui', fn);
	};
	var showKinds = {subtitles: 1, caption: 1};
	var getTrackMenu = function(tracks){
		var items = $.map(tracks, function(track){
				var className = (track.kind == 'caption') ? 'caption-type' : 'subtitle-type';
				var lang = track.language;
				lang = (lang) ? ' <span class="track-lang">'+ lang +'</span>' : '';
				return '<li class="'+ className +'" role="presentation"><button role="menuitemcheckbox">'+ track.label + lang +'</button></li>';
			})
			;
		return '<div><ul>' + items.join('') +'</ul></div>';
	};


	function createGetSetHandler(fns){
		var throttleTimer;
		var blocked;

		if(fns.release === true){
			fns.release = fns.set;
		}
		var getSetHelper = {
			start: function(){
				if(!blocked){
					blocked = true;
					if(fns.start){
						fns.start();
					}
				}
			},
			release: function(){
				if(blocked){
					blocked = false;

					if(fns.release){
						fns.release();
					}
				}
			},
			get: function(){
				if(blocked){return;}
				return fns.get.apply(this, arguments);
			},
			set: function(){

				var that = this;
				var args = arguments;
				getSetHelper.start();
				clearTimeout(throttleTimer);
				throttleTimer = setTimeout(function(){
					fns.set.apply(that, args);
				}, 33);
			}
		};
		getSetHelper.fns = fns;
		return getSetHelper;
	}

	$.extend(true, plugins, {
		useractivity: {
			_create: function(empty1, empty2, base){
				base
					.on({
						useractive: function(){
							base.attr('data-useractivity', 'true');
						}
					})
					.on('userinactive', {idletime: 3500}, function(){
						base.attr('data-useractivity', 'false');
					})
					.triggerHandler('userinactive')
				;
			}
		},
		'play-pause': {
			pseudoClasses: {
				play: 'state-paused',
				pause: 'state-playing'
			},
			_create: function(control, media){
				var textFn = $.jme.getButtonText(control, [this[pseudoClasses].play, this[pseudoClasses].pause]);

				media
					.on('play playing ended pause updateJMEState', function(e){
						var state = e.type;
						if(playStates[state]){
							state = 1;
						} else if(pauseStates[state]) {
							state = 0;
						} else {
							state = (media.jmeProp('isPlaying') )? 1 : 0;
						}
						textFn(state);
					})
					.triggerHandler('updateJMEState')
				;
				control.on((control.is('select')) ? 'change' : 'click', function(e){
					media.jmeFn('togglePlay');
					e.stopPropagation();
				});

			}
		},
		'mute-unmute': {
			pseudoClasses: {
				mute: 'state-mute',
				unmute: 'state-unmute'
			},
			_create: function(control, media, base){
				var textFn = $.jme.getButtonText(control, [this[pseudoClasses].mute, this[pseudoClasses].unmute]);
				media
					.on('volumechange updateJMEState', function(e){
						textFn(media.prop('muted') ? 1 : 0);
					})
					.triggerHandler('updateJMEState')
				;

				control.on((control.is('select')) ? 'change' : 'click', function(e){
					media.prop('muted', !media.prop('muted'));
					e.stopPropagation();
				});

			}
		},
		'volume-slider': {
			_create: function(control, media){

				var createFn = function(){
					var api, volume;

					volume = createGetSetHandler({
						get: function(){
							var volume = media.prop('volume');
							if(volume !== undefined){
								api.value(volume);
							}
						},
						set: function(){
							media.prop({
								muted: false,
								volume: api.options.value
							});
						},
						release: true
					});

					api = control
						.rangeUI({
							min: 0,
							max: 1,
							//animate: true,
							step: 'any',
							input: volume.set,
							change: volume.release,
							baseClass: 'media-range'
						})
						.data('rangeUi')
					;
					media.on('volumechange', volume.get);
				};

				onSliderReady(createFn);
			}
		},
		'time-slider': {
			pseudoClasses: {
				no: 'no-duration'
			},
			_create: function(control, media, base){

				var module = this;

				var createFn = function(){
					var time, durationChange, api, timeShow, wasPaused;
					var hasDuration = 'has-duration';
					var duration = media.prop('duration');

					time = createGetSetHandler({
						get: function(){
							var time = media.prop('currentTime');
							if(!isNaN(time)){
								try {
									api.value(time);
								} catch(er){}
							}

						},
						set: function(){
							try {
								media.prop('currentTime', api.options.value).triggerHandler('timechanged', [api.options.value]);
							} catch(er){}
						},
						start: function(){
							if(wasPaused == null){
								wasPaused = media.prop('paused');
								if(!wasPaused){
									base._seekpause = true;
									media.pause();
								} else {
									base._seekpause = false;
								}
							}
						},
						release: function(){
							time.fns.set();
							if(wasPaused === false){
								media.play();
							}
							if('_seekpause' in base){
								delete base._seekpause;
							}
							wasPaused = null;
						}
					});

					durationChange = function(){
						duration = media.prop('duration');
						hasDuration = duration && isFinite(duration) && !isNaN(duration);
						if(hasDuration){
							api.disabled(false);
							api.max(duration);

							base.removeClass(module[pseudoClasses].no);
						} else {
							api.disabled(true);
							api.max(Number.MAX_VALUE);
							base.addClass(module[pseudoClasses].no);
						}
					};

					api = control
						.rangeUI({
							min: 0,
							value: media.prop('currentTime') || 0,
							step: 'any',
							input: time.set,
							change: time.release,
							textValue: function(val){
								return media.jmeFn('formatTime', val);
							},
							baseClass: 'media-range'
						})
						.data('rangeUi')
					;

					timeShow = $('<span class="time-select" />').appendTo(control);

					control
						.on({
							'mouseenter': function(e){
								if(hasDuration){
									var widgetLeft = (control.offset() || {left: 0}).left;
									var widgetWidth = control.innerWidth();
									var posLeft = function(x){
										var perc = (x - widgetLeft) / widgetWidth * 100;
										timeShow
											.html(media.jmeFn('formatTime', duration * perc / 100))
											.css({left: perc+'%'})
										;
									};

									setTimeout(function(){
										posLeft(e.pageX);
										timeShow.addClass('show-time-select');
									});
									control
										.off('.jmetimeselect')
										.on('mousemove.jmetimeselect', function(e){
											posLeft(e.pageX);
										})
									;
								}
							},
							mouseleave: function(){
								setTimeout(function(){
									timeShow.removeClass('show-time-select');
									control.off('.jmetimeselect');
								});
							}
						})
					;


					media.on({
						timeupdate: time.get,
						emptied: function(){
							durationChange();
							api.value(0);
						},
						durationchange: durationChange
					});

					base.jmeFn('addControls', $('<div class="buffer-progress" />').prependTo(control) );
					durationChange();
				};

				onSliderReady(createFn);
			}
		},
		'duration-display': {
			_create: function(control, media, base, options){
				if(typeof options.format == 'string'){
					options.format = options.format.split(':');
				}
				var showDuration = function(){
					control.html(formatTime(media.prop('duration'), options.format));
				};
				media.on('durationchange emptied', showDuration);

				control
					.on('updatetimeformat', showDuration)
					.jmeProp('format', options.format)
				;
			}
		},
		'currenttime-display': {
			_create: function(control, media, base, options){
				if(typeof options.format == 'string'){
					options.format = options.format.split(':');
				}

				var showTime = function(e){
					var currentTime = media.prop('currentTime');
					if(options.countdown){
						currentTime = (media.prop('duration') || 0) - currentTime;
						if(currentTime < 0.7){
							currentTime = 0;
						}
					}
					control.html(formatTime(currentTime, options.format));
				};
				media.on('timeupdate emptied durationchange', showTime);

				control
					.on('updatetimeformat', showTime)
					.jmeProp('format', options.format)
				;
			}
		},
		'poster-display': {
			_create: function(control, media){

				/* Empty span element used for vertical centering in IE7 - thanks to Bruno Fassino.
				 * @see http://www.brunildo.org/test/img_center.html
				 */
				var updatePoster = function(){
					var poster = media.prop('poster');
					if(poster){
						control.html('<span></span><img src="'+ poster +'" class="poster-image" />');
					} else {
						control.empty();
					}
				};
				media.on('emptied', updatePoster);
				updatePoster();
			}
		},
		fullscreen: {
			pseudoClasses: {
				enter: 'state-enterfullscreen',
				exit: 'state-exitfullscreen'
			},
			_create: function(control, media, base){
				var textFn = $.jme.getButtonText(control, [this[pseudoClasses].enter, this[pseudoClasses].exit]);
				var updateControl = function(){
					textFn(base.hasClass('player-fullscreen') ? 1 : 0);
				};
				var options = this.options;
				var addDoubbleClick = function(){
					$(base.data('jme').controlElements)
						.filter('.jme-media-overlay')
						.off('.dblfullscreen')
						.on('dblclick.dblfullscreen', function(e){
							base.jmeProp('fullscreen', !base.jmeProp('fullscreen'));
						})
					;
				};

				base.on('controlsadded', addDoubbleClick);

				base.on('playerdimensionchange', updateControl);

				control.on((control.is('select')) ? 'change' : 'click', function(){
					var value = base.hasClass('player-fullscreen') ? false : options.fullscreen;
					base.jmeProp('fullscreen', value);
					if(value && options.autoplayfs){
						media.jmeFn('play');
					}
				});
				addDoubbleClick();
				updateControl();
			}
		},
		captions: {
			pseudoClasses: {
				menu: 'subtitle-menu'
			},
			_create: function(control, media, base){
				var trackElems;
				var that = this;
				var checkbox = control.wsclonedcheckbox;
				if(!checkbox){
					trackElems = media.find('track');
					checkbox = $(control).clone().attr({role: 'checkbox'}).insertBefore(control);

					base.attr('data-tracks', trackElems.length > 1 ? 'many' : trackElems.length);
					control.attr('aria-haspopup', 'true');
				}

				webshims.ready('track', function(){
					var menuObj, throttledUpdateMode;
					var tracks = [];
					var textTracks = media.prop('textTracks');

					var throttledUpdate = (function(){
						var timer;
						var triggerTimer;
						return function(e){
							clearTimeout(timer);
							clearTimeout(triggerTimer);
							if(e.type == 'updatesubtitlestate'){
								triggerTimer = setTimeout(function(){
									media.trigger('updatetracklist');
								}, 0);
							}
							timer = setTimeout(updateTrackMenu, 19);
						};
					})();

					function createSubtitleMenu(menu){
						var menuClick;

						if(!menuObj){
							menuClick = function(index, button){
								if($.attr(button, 'aria-checked') == 'true'){
									tracks[index].mode = 'disabled';
								} else {
									$.each(tracks, function(i, track){
										track.mode = (i == index) ? 'showing' : 'disabled';
									});
								}
								media.prop('textTracks');
								updateMode();
							};

							menuObj = new $.jme.ButtonMenu(control, menu, menuClick);
							checkbox.on('click', function(){
								menuClick(0, this);
								return false;
							});
						} else {
							menuObj.addMenu(menu);
						}

						updateMode();
					}

					function updateMode(){
						$('button', menuObj.menu).each(function(i){
							var checked = (tracks[i].mode == 'showing') ? 'true' : 'false';
							if(!i){
								checkbox.attr('aria-checked', checked);
							}
							$.attr(this, 'aria-checked', checked);
						});
					}

					function updateTrackMenu(){
						tracks = [];
						$.each(textTracks, function(i, track){
							if(showKinds[track.kind] && track.readyState != 3){
								tracks.push(track);
							}
						});

						base.attr('data-tracks', tracks.length > 1 ? 'many' : tracks.length);

						if(tracks.length){
							createSubtitleMenu('<div class="'+that[pseudoClasses].menu +'" >'+ (getTrackMenu(tracks)) +'</div>');

							$('span.jme-text, label span.jme-text', checkbox).text((tracks[0].label || ' ') + (tracks[0].lang || ''));

							if(!base.hasClass(that[pseudoClasses].hasTrack) || base.hasClass(that[pseudoClasses].noTrack)){
								control.prop('disabled', false);
								base.triggerHandler('controlschanged');
							}

						} else if(!base.hasClass(that[pseudoClasses].noTrack) || base.hasClass(that[pseudoClasses].hasTrack)){
							control.prop('disabled', true);
							base
								.triggerHandler('controlschanged')
							;
						}
					}

					if(!textTracks){
						textTracks = [];
						updateTrackMenu();
					} else {
						throttledUpdateMode = (function(){
							var timer;
							return function(){
								clearTimeout(timer);
								timer = setTimeout(updateMode, 20);
							};
						})();

						updateTrackMenu();

						$([textTracks])
							.on('addtrack removetrack', throttledUpdate)
							.on('change', throttledUpdateMode)
						;

						base.on('updatesubtitlestate', throttledUpdate);
						media.on('updatetrackdisplay', throttledUpdateMode);
					}

				});
			}
		}
	});


	$.jme.defineMethod('concerningRange', function(type, time){
		var elem = this;
		var ret = {start: 0, end: 0};
		if(!type){
			type = 'buffered';
		}
		type = $.prop(elem, type);

		if(time == null){
			time = $.prop(elem, 'currentTime');
		}
		if(!type || !('length' in type)){return ret;}
		for(var i = 0, len = type.length; i < len; i++){
			ret.start = type.start(i);
			ret.end = type.end(i);
			if(ret.start <= time && ret.end >= time){
				break;
			}
		}
		return ret;
	});

	$.jme.defineProp('progress', {
		get: function(elem){
			var data = $.jme.data(elem);
			if(!data.media){return 0;}
			var progress = data.media.jmeFn('concerningRange').end / data.media.prop('duration') * 100;
			if(progress > 99.4){
				progress = 100;
			}
			return progress || 0;
		},
		readonly: true
	});


	var times = {
		hh: 60000,
		mm: 60,
		ss: 1,
		ms: 1/1000
	};
	var formatTime = function(sec, format){
		var data;
		if(!format){
			format = ['mm', 'ss'];
		}
		if(sec == null){
			data = $.jme.data(this);
			sec = $.prop(data.media, 'duration');
		}
		if(!sec){
			sec = 0;
		}
		var formated = [];
		var frac;
		for(var i = 0, len = format.length; i < len; i++){
			if(format[i] == 'ms' && i == len -1 ){
				frac = Math.round( (sec / times[format[i]]) / 10);
			} else {
				frac = parseInt(sec / times[format[i]], 10);
				sec = sec % times[format[i]];
			}
			if(frac < 10){
				frac = '0'+frac;
			}
			formated.push( frac );
		}

		return formated.join(':');
	};
	$.jme.defineMethod('formatTime', formatTime);

	//taken from http://johndyer.name/native-fullscreen-javascript-api-plus-jquery-plugin/
	$.jme.fullscreen = (function() {
		var parentData;
		var frameData;
		var doc = document.documentElement;

		var fullScreenApi = {
			supportsFullScreen: Modernizr.prefixed('fullscreenEnabled', document, false) || Modernizr.prefixed('fullScreenEnabled', document, false),
			isFullScreen: function() { return false; },
			requestFullScreen: function(elem){
				var tmpData;
				parentData = [];
				$(elem).parentsUntil('body').each(function(){
					var pos =  $.css(this, 'position');
					var left = this.scrollLeft;
					var top = this.scrollTop;
					var changed;
					tmpData = {elemStyle: this.style, elem: this};
					if(pos !== 'static'){
						changed = true;
						tmpData.pos = tmpData.elemStyle.position;
						this.style.position = 'static';
					}
					if(left){
						changed = true;
						tmpData.left = left;
					}
					if(top){
						changed = true;
						tmpData.top = top;
					}
					if(changed){
						parentData.push(tmpData);
					}
				});
				frameData = false;
				try {
					frameData = {elemStyle: frameElement.style, elem: frameElement, css: {}};
					frameData.css.position = frameData.elemStyle.position;
					frameData.elemStyle.position = 'fixed';
					$.each(['top', 'left', 'right', 'bottom'], function(i, name){
						frameData.css[name] = frameData.elemStyle[name];
						frameData.elemStyle[name] = '0px';
					});
					$.each(['height', 'width'], function(i, name){
						frameData.css[name] = frameData.elemStyle[name];
						frameData.elemStyle[name] = '100%';
					});
				} catch(er){
					frameData = false;
				}

				tmpData = null;
			},
			cancelFullScreen: function(){
				if(parentData){
					$.each(parentData, function(i, data){
						if('pos' in data){
							data.elemStyle.position = data.pos;
						}
						if(data.left){
							data.elem.scrollLeft = data.left;
						}
						if(data.top){
							data.elem.scrollTop = data.top;
						}
						data = null;
					});
					parentData = [];
				}
				if(frameData){
					$.each(frameData.css, function(name, value){
						frameData.elemStyle[name] = value;
					});
					frameData = false;
				}
			},
			eventName: 'fullscreenchange',
			exitName: 'exitFullscreen',
			requestName: 'requestFullscreen',
			elementName: 'fullscreenElement',
			enabledName: ''
		};

		fullScreenApi.cancelFullWindow = fullScreenApi.cancelFullScreen;
		fullScreenApi.requestFullWindow = fullScreenApi.requestFullScreen;

		// update methods to do something useful
		if (fullScreenApi.supportsFullScreen) {
			fullScreenApi.enabledName = fullScreenApi.supportsFullScreen;
			fullScreenApi.exitName = Modernizr.prefixed("exitFullscreen", document, false) || Modernizr.prefixed("cancelFullScreen", document, false);
			fullScreenApi.elementName = Modernizr.prefixed("fullscreenElement", document, false) || Modernizr.prefixed("fullScreenElement", document, false);
			fullScreenApi.supportsFullScreen = !!fullScreenApi.supportsFullScreen;
			if(fullScreenApi.elementName != 'fullscreenElement' || fullScreenApi.exitName != 'exitFullscreen' || fullScreenApi.enabledName != 'fullscreenEnabled'){
				$.each(Modernizr._domPrefixes, function(i, prefix){
					var requestName = prefix+'RequestFullscreen';
					if((requestName in doc) || ((requestName = prefix+'RequestFullScreen') && (requestName in doc))){
						fullScreenApi.eventName = prefix + 'fullscreenchange';
						fullScreenApi.requestName = requestName;
						return false;
					}
				});
			}

			fullScreenApi.isFullScreen = function() {
				return document[fullScreenApi.elementName];
			};
			fullScreenApi.requestFullScreen = function(el) {
				return el[fullScreenApi.requestName]();
			};
			fullScreenApi.cancelFullScreen = function() {
				return document[fullScreenApi.exitName]();
			};
		}


		if(window.parent != window){
			(function(){
				try{
					var frame = window.frameElement;
					if (fullScreenApi.supportsFullScreen) {
						if('allowfullscreen' in frame && !frame.allowfullscreen) {
							frame.allowfullscreen = true;
						} else {
							if(frame.getAttribute('webkitallowfullscreen') == null){
								frame.setAttribute('webkitallowfullscreen', '');
							}
							if(frame.getAttribute('allowfullscreen') == null){
								frame.setAttribute('allowfullscreen', 'allowfullscreen');
							}
						}
					}
				} catch(er){
					if(!fullScreenApi.supportsFullScreen){
						$('html').addClass('no-fullwindow');
					}
				}
			})();

		}


		return fullScreenApi;
	})();

	$.jme.defineProp('fullscreen', {
		set: function(elem, value){
			var data = $.jme.data(elem);

			if((!data || !data.player) && !$(elem).hasClass('player-fullscreen')){return 'noDataSet';}
			if(value){
				if(data.player.hasClass('player-fullscreen')){return 'noDataSet';}

				data.scrollPos = {
					top: $(window).scrollTop(),
					left: $(window).scrollLeft()
				};

				$(document)
					.off('.jmefullscreen')
					.on('keydown.jmefullscreen', function(e){
						if(e.keyCode == 27){
							data.player.jmeProp('fullscreen', false);
							return false;
						}
						if(e.keyCode === 32 && !('form' in e.target)){
							data.media.jmeFn('togglePlay');
							return false;
						}
					})
				;


				if(value == 'fullwindow'){
					$.jme.fullscreen.requestFullWindow(data.player[0]);
				} else {
					try {
						$.jme.fullscreen.requestFullScreen(data.player[0]);
					} catch(er){}
				}


				$('html').addClass('has-media-fullscreen');

				data.player.addClass('player-fullscreen');

				data.media.addClass('media-fullscreen');

				$('button.play-pause', data.player).trigger('focus');

				if($.jme.fullscreen.supportsFullScreen){
					$(document)
						.on($.jme.fullscreen.eventName+'.jmefullscreen', function(e){
							var fullScreenElem = $.jme.fullscreen.isFullScreen();
							if(fullScreenElem && elem == fullScreenElem){
								data.media.trigger('playerdimensionchange', ['fullscreen']);
							} else {
								data.player.jmeProp('fullscreen', false);
							}
						})
					;

				}
				data.media.trigger('playerdimensionchange', ['fullwindow']);

			} else {
				if(data.player && !data.player.hasClass('player-fullscreen')){return 'noDataSet';}
				$(document).off('.jmefullscreen');
				$('html').removeClass('has-media-fullscreen');
				if(data.player && data.media){
					data.player.removeClass('player-fullscreen');
					data.media.removeClass('media-fullscreen');
				}
				if($.jme.fullscreen.isFullScreen()){
					try {
						$.jme.fullscreen.cancelFullScreen();
					} catch(er){}
				} else {
					$.jme.fullscreen.cancelFullWindow();
				}

				if(data.scrollPos){
					$(window).scrollTop(data.scrollPos.top);
					$(window).scrollLeft(data.scrollPos.left);
					delete data.scrollPos;
				}
				if(data.media){
					data.media.trigger('playerdimensionchange');
				}
			}
			return 'noDataSet';
		},
		get: function(elem){
			var data = $.jme.data(elem);
			if(!data || !data.player){return;}
			var fs = data.player.hasClass('player-fullscreen');
			if(!fs){return false;}
			return $.jme.fullscreen.isFullScreen() || 'fullwindow';
		}
	});

	$.jme.defineProp('autoplayfs');

	$.jme.registerPlugin('buffer-progress', {
		_create: function(control, media, base, options){
			var indicator = $('<div class="buffer-progress-indicator" />').appendTo(control);
			var drawBufferProgress = function(){
				var progress = media.jmeProp('progress');


				if(options.progress !== progress){
					options.progress = progress;
					indicator.css('width', progress +'%');
				}
			};
			media.on({
				progress: drawBufferProgress,
				emptied: function(){
					indicator.css('width', 0);
					options.progress = 0;
				},
				playing: drawBufferProgress
			});
			drawBufferProgress();
		}
	});



	$.jme.ButtonMenu = function(button, menu, clickHandler){

		this.button = $(button).attr({'aria-haspopup': 'true'});

		this.clickHandler = clickHandler;

		this.toggle = $.proxy(this, 'toggle');
		this.keyIndex = $.proxy(this, 'keyIndex');
		this._buttonClick = $.proxy(this, '_buttonClick');


		this.addMenu(menu);
		this._closeFocusOut();
		this.button.on('click', this.toggle);
	};

	$.jme.ButtonMenu.prototype = {
		addMenu: function(menu){
			if(this.menu){
				this.menu.remove();
			}
			this.menu = $(menu);
			this.buttons = $('button', this.menu);
			this.menu.insertAfter(this.button);
			this.menu
				.on('keydown', this.keyIndex)
				.delegate('button', 'click', this._buttonClick)
			;
		},
		_closeFocusOut: function(){
			var that  = this;
			var timer;
			var stopFocusOut = function(){
				clearTimeout(timer);
				setTimeout(function(){
					clearTimeout(timer);
				}, 9);
			};
			this.menu
				.parent()
				.on('focusin', stopFocusOut)
				.on('mousedown', stopFocusOut)
				.on('focusout', function(e){
					timer = setTimeout(function(){
						that.hide();
					}, 40);
				})
			;
		},
		_buttonClick: function(e){
			this.clickHandler(this.buttons.index(e.currentTarget), e.currentTarget);
			this.hide();
		},
		keyIndex: function(e){
			var dir = (e.keyCode == 40) ? 1 : (e.keyCode == 38) ? -1 : 0;
			if(dir){
				var buttons = this.buttons.not(':disabled');
				var activeButton = buttons.filter(':focus');

				activeButton = buttons[buttons.index(activeButton) + dir] || buttons.filter(dir > 0 ? ':first' : ':last');
				activeButton.focus();
				e.preventDefault();
			}
		},
		show: function(){
			if(this.isVisible){return;}
			var buttons = this.buttons.not(':disabled');
			this.isVisible = true;
			this.menu.addClass('visible-menu');
			try {
				this.activeElement = document.activeElement || this.button[0];
			} catch(er){
				this.activeElement = this.button[0];
			}

			setTimeout(function(){
				$(buttons.filter('[aria-checked="true"]')[0] || buttons[0]).focus();
			}, 60);
		},
		toggle: function(){
			this[this.isVisible ? 'hide' : 'show']();
		},
		hide: function(){
			if(!this.isVisible){return;}
			this.isVisible = false;
			this.menu.removeClass('visible-menu');
			if(this.activeElement){
				try {
					this.activeElement.focus();
				} catch(er){}
			}
			this.activeElement = false;
		}
	};

	(function(){
		var activity = {
			add: function(elem, cfg, name){
				var data 		= $.data(elem, 'jmeuseractivity') || $.data(elem, 'jmeuseractivity', {idletime: 2500, idle: true, trigger: {}}),
					jElm 		= $(elem),
					setInactive = function(){
						if(!data.idle){
							data.idle = true;
							if ( data.trigger.userinactive ) {
								jElm.trigger('userinactive');
							}
						}
					},
					x, y,
					setActive 	= function(e){
						if(!e || (e.type === 'mousemove' && e.pageX === x && e.pageY === y)){return;}
						if(e.type === 'mousemove'){
							x = e.pageX;
							y = e.pageY;
						}
						if(data.idleTimer){
							clearTimeout(data.idleTimer);
						}
						data.idleTimer = setTimeout(setInactive, data.idletime);
						if(data.idle){
							data.idle = false;
							if( data.trigger.useractive ){
								jElm.trigger('useractive');
							}
						}
					}
					;

				data.idletime = (cfg || {}).idletime || data.idletime;
				if(cfg && 'idle' in cfg){
					data.idle = cfg.idle;
				}
				data.trigger[name] = true;

				if(!data.bound){
					jElm
						.on('mouseleave.jmeuseractivity', setInactive)
						.on('mousemove.jmeuseractivity focusin.jmeuseractivity mouseenter.jmeuseractivity keydown.jmeuseractivity keyup.jmeuseractivity mousedown.jmeuseractivity', setActive)
					;
					data.bound = true;
				}
				if(!data.idle){
					setActive({type: 'initunidled'});
				}
			},
			remove: function(elem, name){
				var data = $.data(elem, 'jmeuseractivity') || $.data(elem, 'jmeuseractivity', {idletime: 2500, idle: true, trigger: {}});
				data.trigger[name] = false;
				if(!data.trigger.useractive && !data.trigger.userinactive){
					$(elem).off('.jmeuseractivity');
					data.bound = false;
				}
			}
		};
		$.each(['useractive', 'userinactive'], function(i, name){
			$.event.special[name] = {
				setup: function(cfg){
					activity.add(this, cfg, name);
				},
				teardown: function(){
					activity.remove(this, name);
				}
			};
		});
	})();
});
