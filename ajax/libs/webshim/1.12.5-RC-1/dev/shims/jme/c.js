webshims.register('mediacontrols', function($, webshims, window, doc, undefined, options){
	"use strict";
	var pseudoClasses = 'pseudoClasses';
	var baseSelector = webshims.cfg.mediaelement.jme.selector;

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

	var btnStructure = '<button class="{%class%}" type="button" aria-label="{%text%}"></button>';
	var defaultStructure = '<div  class="{%class%}"></div>';
	var slideStructure = '<div class="{%class%}"></div>';
	var ns = $.jme.classNS;



	$.jme.defineProp('controlbar', {
		set: function(elem, value){
			value = !!value;
			var data = $.jme.data(elem);
			var controlBar = $('div.jme-mediaoverlay, div.jme-controlbar', data.player);
			var mediaControls = $.jme.plugins["media-controls"] ;
			var structure = '';
			var controls;
			if(value && !controlBar[0]){
				if(data._controlbar){
					data._controlbar.appendTo(data.player);
				} else {
					data.media.prop('controls', false);
					$.each(mediaControls.pluginOrder, function(i, name){
						var plugin = $.jme.plugins[name];
						if(plugin && plugin.structure){
							structure += plugin.structure.replace('{%class%}', ns+name).replace('{%text%}', plugin.text || '');
						} else if(name){
							structure += name;
						}
					});
					data._controlbar = $( mediaControls.barStructure );
					controlBar = data._controlbar.find('div.jme-cb-box').addClass(ns+'media-controls');
					controls = data._controlbar.filter('.jme-media-overlay').addClass(ns+'play-pause');
					controls =  controls.add( controlBar );
					controls = controls.add( $(structure).appendTo(controlBar) );
					data._controlbar.appendTo(data.player);
					data.player.jmeFn('addControls', controls);
				}

			} else if(!value) {
				controlBar.detach();
			}
			controlBar = null;
			controls = null;
			return value;
		}
	});

	$.jme.defineMethod('updateControlbar', function(){
		var timeSlider = $('.'+ $.jme.classNS +'time-slider', this);
		if(timeSlider[0] && timeSlider.css('position') !== 'absolute'){
			var width;
			var elemWidths = 0;

			width = Math.floor(timeSlider.parent().width()) - 0.2;
			timeSlider
				.siblings()
				.each(function(){
					if(this !== timeSlider[0] && $.css(this, 'position') !== 'absolute' && $.css(this, 'display') !== 'none'){
						elemWidths += Math.ceil($(this).outerWidth(true)) + 0.1;
					}
				})
			;
			timeSlider.width(Math.floor(width - elemWidths - Math.ceil(timeSlider.outerWidth(true) - timeSlider.width()) - 0.3));
		}
	});

	$.jme.registerPlugin('media-controls', {
		options: {
			calculateTimerange: false
		},
		pluginOrder: ['<div class="play-pause-container">', 'play-pause', '</div>', '<div class="currenttime-container">', 'currenttime-display', '</div>', '<div class="progress-container">', 'time-slider', '</div>', '<div class="duration-container">', 'duration-display', '</div>', '<div class="mute-container">', 'mute-unmute', '</div>', '<div class="volume-container">', 'volume-slider', '</div>', '<div class="subtitle-container">', '<div class="subtitle-controls">', 'captions', '</div>', '</div>', '<div class="fullscreen-container">', 'fullscreen', '</div>'],
		barStructure: '<div class="jme-media-overlay"></div><div class="jme-controlbar" tabindex="-1"><div class="jme-cb-box"></div></div>',
		_create: function(control, media, base, options){
			var timer;
			var update = function(){
				clearTimeout(timer);
				control.jmeFn('updateControlbar');
				timer = setTimeout(function(){
					control.jmeFn('updateControlbar');
				}, 9);
			};
			if(options.calculateTimerange){
				setTimeout(function(){
					media.on('loadedmetadata volumechange play pause ended emptied', update);
					base.on('updatetimeformat controlsadded controlschanged playerdimensionchange', update);
					$(window).on('resize emchange', update);
				}, 1);
				update();
			}
		}
	});

	$.jme.registerPlugin('play-pause', {
		pseudoClasses: {
			play: 'state-paused',
			pause: 'state-playing'
		},
		structure: btnStructure,
		text: 'play / pause',
		_create: function(control, media, base){
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
	});

	$.jme.registerPlugin('mute-unmute', {
		pseudoClasses: {
			mute: 'state-mute',
			unmute: 'state-unmute'
		},
		structure: btnStructure,
		text: 'mute / unmute',
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
	});

	function createGetSetHandler(get, set){
		var throttleTimer;
		var blockedTimer;
		var blocked;
		return {
			get: function(){
				if(blocked){return;}
				return get.apply(this, arguments);
			},
			set: function(){
				clearTimeout(throttleTimer);
				clearTimeout(blockedTimer);

				var that = this;
				var args = arguments;
				blocked = true;
				throttleTimer = setTimeout(function(){
					set.apply(that, args);
					blockedTimer = setTimeout(function(){
						blocked = false;
					}, 30);
				}, 0);
			}
		};
	}

	$.jme.registerPlugin('volume-slider', {
		structure: slideStructure,

		_create: function(control, media, base){
			loadRange();

			var createFn = function(){
				var api, volume;

				volume = createGetSetHandler(
					function(){
						var volume = media.prop('volume');
						if(volume !== undefined){
							api.value(volume);
						}
					},
					function(value){
						media.prop({
							muted: false,
							volume: api.options.value
						});
					}
				);

				api = control
					.rangeUI({
						min: 0,
						max: 1,
						//animate: true,
						step: 'any',
						input: function(){
							volume.set();
						},
						baseClass: 'media-range'
					})
					.data('rangeUi')
				;
				media.on('volumechange', volume.get);
			};

			onSliderReady(createFn);
		}
	});

	$.jme.registerPlugin('time-slider', {
		structure: slideStructure,
		pseudoClasses: {
			no: 'no-duration'
		},
		options: {
			format: ['mm', 'ss']
		},
		_create: function(control, media, base){
			loadRange();

			var module = this;

			var createFn = function(){
				var time, durationChange, api, timeShow;
				var hasDuration = $.jme.classNS+'has-duration';
				var duration = media.prop('duration');

				time = createGetSetHandler(
					function(){
						var time = media.prop('currentTime');
						if(!isNaN(time)){
							try {
								api.value(time);
							} catch(er){}
						}

					},
					function(){
						try {
							media.prop('currentTime', api.options.value).triggerHandler('timechanged', [api.options.value]);
						} catch(er){}
					}
				);

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
						//animate: true,
						step: 'any',
						input: function(){
							time.set();
						},
						textValue: function(val){
							return media.jmeFn('formatTime', val);
						},
						baseClass: 'media-range'
					})
					.data('rangeUi')
				;

				timeShow = $('<span class="'+ $.jme.classNS +'time-select" />').appendTo(control);

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

								posLeft(e.pageX);
								timeShow.addClass($.jme.classNS +'show-time-select');
								control
									.off('.jmetimeselect')
									.on('mousemove.jmetimeselect', function(e){
										posLeft(e.pageX);
									})
								;
							}
						},
						mouseleave: function(){
							timeShow.removeClass($.jme.classNS +'show-time-select');
							control.off('.jmetimeselect');
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

				base.jmeFn('addControls', $('<div class="'+ $.jme.classNS +'buffer-progress" />').prependTo(control) );
				durationChange();
			};

			onSliderReady(createFn);
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

	$.jme.registerPlugin('buffer-progress', {
		_create: function(control, media, base, options){
			var indicator = $('<div class="'+ $.jme.classNS +'buffer-progress-indicator" />').appendTo(control);
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

	$.jme.defineProp('format', {
		set: function(elem, format){
			if(!$.isArray(format)){
				format = format.split(':');
			}
			var data = $.jme.data(elem);
			data.format = format;
			$(elem).triggerHandler('updatetimeformat');
			data.player.triggerHandler('updatetimeformat');
			return 'noDataSet';
		}
	});

	$.jme.registerPlugin('duration-display', {
		structure: defaultStructure,
		options: {
			format: "mm:ss"
		},
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
	});

	$.jme.defineProp('countdown', {
		set: function(elem, value){

			var data = $.jme.data(elem);
			data.countdown = !!value;
			$(elem).triggerHandler('updatetimeformat');
			data.player.triggerHandler('updatetimeformat');
			return 'noDataSet';
		}
	});

	$.jme.registerPlugin('currenttime-display', {
		structure: defaultStructure,
		options: {
			format: "mm:ss",
			countdown: false
		},
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
	});


	/**
	 * Added Poster Plugin
	 * @author mderting
	 */

	/*
	 * the old technique wasn't fully bullet proof
	 * beside this, jme2 adovactes to use the new improved state-classes to handle visual effect on specific state (see CSS change)
	 */
	$.jme.registerPlugin('poster-display', {
		structure: '<div />',
		options: {
		},
		_create: function(control, media, base, options){

			/* Empty span element used for vertical centering in IE7 - thanks to Bruno Fassino.
			 * @see http://www.brunildo.org/test/img_center.html
			 */
			var updatePoster = function(){
				var poster = media.prop('poster');
				if(poster){
					control.html('<span></span><img src="'+ poster +'" class="'+ $.jme.classNS +'poster-image" />');
				} else {
					control.empty();
				}
			};
			media.on('emptied', updatePoster);
			updatePoster();
		}
	});

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

		if(!window.Modernizr || !('fullscreen' in Modernizr)){
			$('html').addClass(fullScreenApi.supportsFullScreen ? 'fullscreen' : 'no-fullscreen');
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

			if((!data || !data.player) && !$(elem).hasClass($.jme.classNS+'player-fullscreen')){return 'noDataSet';}
			if(value){
				if(data.player.hasClass($.jme.classNS+'player-fullscreen')){return 'noDataSet';}

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


				$('html').addClass($.jme.classNS+'has-media-fullscreen');

				data.player.addClass($.jme.classNS+'player-fullscreen');

				data.media.addClass($.jme.classNS+'media-fullscreen');

				$('button.play-pause', data.player).focus();

				if($.jme.fullscreen.supportsFullScreen){
					$(document)
						.on($.jme.fullscreen.eventName+'.jmefullscreen', function(e){
							var fullScreenElem = $.jme.fullscreen.isFullScreen();
							if(fullScreenElem && elem == fullScreenElem){
								$(elem).triggerHandler('playerdimensionchange', ['fullscreen']);
							} else {
								data.player.jmeProp('fullscreen', false);
							}
						})
					;

				}
				data.player.triggerHandler('playerdimensionchange', ['fullwindow']);

			} else {
				if(data.player && !data.player.hasClass($.jme.classNS+'player-fullscreen')){return 'noDataSet';}
				$(document).off('.jmefullscreen');
				$('html').removeClass($.jme.classNS+'has-media-fullscreen');
				if(data.player && data.media){
					data.player.removeClass($.jme.classNS+'player-fullscreen');
					data.media.removeClass($.jme.classNS+'media-fullscreen');
				}
				if($.jme.fullscreen.isFullScreen()){
					try {
						$.jme.fullscreen.cancelFullScreen();
					} catch(er){}
				} else {
					$.jme.fullscreen.cancelFullWindow();
				}

				if(data.player){
					data.player.triggerHandler('playerdimensionchange');
				}
				if(data.scrollPos){
					$(window).scrollTop(data.scrollPos.top);
					$(window).scrollLeft(data.scrollPos.left);
					delete data.scrollPos;
				}
			}
			return 'noDataSet';
		},
		get: function(elem){
			var data = $.jme.data(elem);
			if(!data || !data.player){return;}
			var fs = data.player.hasClass($.jme.classNS+'player-fullscreen');
			if(!fs){return false;}
			return $.jme.fullscreen.isFullScreen() || 'fullwindow';
		}
	});

	$.jme.defineProp('autoplayfs');

	$.jme.registerPlugin('fullscreen', {
		pseudoClasses: {
			enter: 'state-enterfullscreen',
			exit: 'state-exitfullscreen'
		},
		options: {
			fullscreen: true,
			autoplayfs: false
		},
		structure: btnStructure,
		text: 'enter fullscreen / exit fullscreen',
		_create: function(control, media, base){
			var textFn = $.jme.getButtonText(control, [this[pseudoClasses].enter, this[pseudoClasses].exit]);
			var updateControl = function(){
				textFn(base.hasClass($.jme.classNS+'player-fullscreen') ? 1 : 0);
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
				var value = base.hasClass($.jme.classNS+'player-fullscreen') ? false : options.fullscreen;
				base.jmeProp('fullscreen', value);
				if(value && options.autoplayfs){
					media.jmeFn('play');
				}
			});
			addDoubbleClick();
			updateControl();
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


	$.jme.registerPlugin('captions', {
		pseudoClasses: {
			menu: 'subtitle-menu'
		},
		structure: btnStructure,
		text: 'subtitles',
		_create: function(control, media, base, options){
			var that = this;

			var trackElems = media.find('track');
			var checkbox = $(control).clone().attr({role: 'checkbox'}).insertBefore(control);

			base.attr('data-tracks', trackElems.length > 1 ? 'many' : trackElems.length);
			control.attr('aria-haspopup', 'true');

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

						$('span.jme-text, +label span.jme-text', checkbox).text((tracks[0].label || ' ') + (tracks[0].lang || ''));

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
	});

	$('.mediaplayer').each(function(){
		if(($.data(this, 'jme')|| {}).controlbar){
			$(this).jmeProp('controlbar', true);
		}
	});

	webshims.ready('mediaelement', function(){
		webshims.addReady(function(context, insertedElement){
			$(baseSelector, context).add(insertedElement.filter(baseSelector)).jmeProp('controlbar', true);
		});
	});
});
