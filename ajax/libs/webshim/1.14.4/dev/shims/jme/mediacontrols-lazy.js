webshims.register('mediacontrols-lazy', function($, webshims, window, doc, undefined){
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
				return '<li class="'+ className +'" role="presentation"><button role="menuitemcheckbox" type="button" tabindex="-1">'+ track.label + lang +'</button></li>';
			})
			;
		return '<div><ul role="presentation">' + items.join('') +'</ul></div>';
	};


	if(!$.fn.wsTouchClick){

		$.fn.wsTouchClick = (function(){
			var supportsTouchaction = ('touchAction' in document.documentElement.style);
			var addTouch = !supportsTouchaction && ('ontouchstart' in window) && document.addEventListener;
			return function(target, handler){
				var touchData, touchEnd, touchStart, stopClick, allowClick;
				var runHandler = function(){
					if(!stopClick){
						return handler.apply(this, arguments);
					}
				};
				if(addTouch){
					allowClick = function(){
						stopClick = false;
					};
					touchEnd = function(e){
						var ret, touch;
						e = e.originalEvent || {};
						$(this).off('touchend touchcancel', touchEnd);
						var changedTouches = e.changedTouches || e.touches;
						if(e.type == 'touchcancel' || !touchData || !changedTouches || changedTouches.length != 1){
							return;
						}

						touch = changedTouches[0];
						if(Math.abs(touchData.x - touch.pageX) > 40 || Math.abs(touchData.y - touch.pageY) > 40 || Date.now() - touchData.now > 300){
							return;
						}

						e.preventDefault();
						stopClick = true;
						setTimeout(allowClick, 400);

						ret = handler.apply(this, arguments);

						return ret;
					};

					touchStart = function(e){
						var touch, elemTarget;
						if((!e || e.touches.length != 1)){
							return;
						}
						touch = e.touches[0];
						elemTarget = target ? $(touch.target).closest(target) : $(this);
						if(!elemTarget.length){
							return;
						}
						touchData = {
							x: touch.pageX,
							y: touch.pageY,
							now: Date.now()
						};
						elemTarget.on('touchend touchcancel', touchEnd);
					};

					this.each(function(){
						this.addEventListener('touchstart', touchStart, true);
					});
				} else if(supportsTouchaction){
					this.css('touch-action', 'manipulation');
				}

				if($.isFunction(target)){
					handler = target;
					target = false;
					this.on('click', runHandler);
				} else {
					this.on('click', target, runHandler);
				}
				return this;
			};
		})();
	}


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
				control.wsTouchClick(function(e){
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

				control.wsTouchClick(function(e){
					media.prop('muted', !media.prop('muted'));
					e.stopPropagation();
				});

			}
		},
		'jme-media-overlay': {
			_create: function(control, media, base){
				var stopFocus, focusTimer, markedFocus;
				var specialUnStop = {
					touchend: 1,
					click: 1
				};
				var unStop = function(){
					stopFocus = false;
				};
				control.wsTouchClick(function(e){
					if(media.jmeProp('isPlaying') && base.attr('data-useractivity') != 'false'){
						media.pause();
					} else {
						media.play();
					}
				});

				base.on({
					'touchstart touchend mousedown click mouseover': function(e){
						var delay = 500;
						stopFocus = true;
						clearTimeout(focusTimer);
						if(markedFocus && specialUnStop[e.type] && e.target.className.indexOf('ws-a11y-focus') != -1){
							delay = 1;
						}
						focusTimer = setTimeout(unStop, delay);
					},
					focusin: function(e){
						if(!stopFocus && e.originalEvent && ($.prop(e.target, 'tabIndex') > -1 || $.attr(e.target, 'role'))){
							setTimeout(function(){
								if(!stopFocus){
									markedFocus = true;
									$(e.target).addClass('ws-a11y-focus');
								}
							}, 20);
						}
					},
					focusout: function(e){
						if(markedFocus){
							markedFocus = false;
							$(e.target).removeClass('ws-a11y-focus');
						}
					}
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
					var time, durationChange, api, timeShow, wasPaused, hideTime;
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
					hideTime = function(){
						setTimeout(function(){
							timeShow.removeClass('show-time-select');
							control.off('.jmetimeselect');
							if(document.removeEventListener){
								document.removeEventListener('touchend', hideTime, true);
							}
						});
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
							'mouseenter touchstart': function(e){
								if(hasDuration && e.type != 'touchstart' || (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length == 1)){

									var widgetLeft = (control.offset() || {left: 0}).left;
									var widgetWidth = control.innerWidth();
									var posLeft = function(x){
										var perc = ((x - widgetLeft) / widgetWidth * 100);
										var marginLeft =  -(timeShow.outerWidth() / 2);
										timeShow[0].innerHTML = media.jmeFn('formatTime', duration * perc / 100);

										timeShow[0].style.left = perc+'%';
										timeShow[0].style.marginLeft = marginLeft+'px';
									};

									$.fn.rangeUI.normalizeTouch(e);
									setTimeout(function(){
										timeShow.addClass('show-time-select');
										posLeft(e.pageX);
									});
									if(document.addEventListener){
										document.addEventListener('touchend', hideTime, true);
									}
									control
										.off('.jmetimeselect')
										.on('mousemove.jmetimeselect touchmove.jmetimeselect', function(e){
											$.fn.rangeUI.normalizeTouch(e);
											posLeft(e.pageX);
										})
									;
								}
							},
							'mouseleave touchend': hideTime
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

				control.wsTouchClick(function(){
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
		chapters: {
			_create: function(control, media, base){
				var plugin = this;
				webshims.ready('track', function(){
					var menuObj, wasPlayed, hasTrack, preloadTimer, $bar;
					var timedPreload = function(){
						clearTimeout(preloadTimer);
						preloadTimer = setTimeout(setPreload, 999);
					};
					var setPreload = function(){
						var preload;
						if(hasTrack && !media.prop('readyState')){
							preload = media.attr('preload');
							if(preload != 'auto'){
								preload = 'auto';
								media.prop('preload', preload);
							}
						}
					};
					var createMenuButton = function(){
						if(menuObj){return;}
						menuObj = new $.jme.ButtonMenu(control, '<div class="mediamenu chapter-menu" />', function(e, button){
							var paused = media.prop('paused');
							var readyState = media.prop('readyState');
							if(!wasPlayed || readyState < 2){
								media.play();
								if(paused){
									media.pause();
								}
							}
							if(readyState < 2){
								setTimeout(function(){
									media.prop('currentTime', $(button).data('starttime'));
								}, 99);
							}

							if(readyState){
								media.prop('currentTime', $(button).data('starttime'));
							}

						});
					};

					var buildMenu = function(currentTrack, chapterList){

						if($bar){
							$bar.remove();
							$bar = null;
						}

						if(currentTrack && chapterList.length){
							var chapters = chapterList.map(createChapterList, {
								html: '<button type="button" data-starttime="{{startTime}}" data-endtime="{{endTime}}" role="menuitem" tabindex="-1">{{title}}</button>'
							});
							var text = currentTrack.label || plugin.text;

							//$bar = chapterList.map(createChapterBar);

							//$('.time-slider', base).append('<ul role="presentation" class="mediachapter-bar">'+ $bar.join('\n') + '</ul>');

							hasTrack = true;
							base.addClass('has-chapter-tracks');
							createMenuButton();
							control.attr('aria-label', text);
							menuObj.addMenu('<div class="mediamenu chapter-menu" aria-label="'+ text +'"><div><h5>'+ text +'</h5><ul role="presentation">'+ chapters.join('\n') +'</div></ul></div>')
						} else {
							hasTrack = false;
							control.attr('aria-label', plugin.text);
							base.removeClass('has-chapter-tracks');
						}

					};

					media.on({
						play: function(){
							wasPlayed = true;
						},
						'emptied loadstart': function(){
							wasPlayed = false;
							timedPreload();
						}
					});
					webshims.ready('WINDOWLOAD', timedPreload);
					base.jmeFn('getMediaChapters', buildMenu);

				});
			}
		},
		mediaconfigmenu: {
			_create: function(control, media, base){
				var timer;
				var menu = new $.jme.ButtonMenu(control, '<div class="mediamenu" ><div /></div>');
				var innerMenu = menu.menu.find('div');
				var enableDisable = function(){
					base[innerMenu[0].getElementsByTagName('*').length ? 'addClass' : 'removeClass']('has-config-menu');
				};
				var timedEnable = function(){
					clearTimeout(timer);
					timer = setTimeout(enableDisable);
				};
				$.each($.jme.configmenuPlugins, function(name, create){
					create(innerMenu, media, base, menu);
				});

				enableDisable();
				media.on('loadstart emptied loadedmetadata', timedEnable);
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
							checkbox.wsTouchClick(function(){
								menuClick(0, this);
								return false;
							});
						} else {
							menuObj.addMenu(menu);
						}

						updateMode();
					}

					function updateMode(){
						if(!menuObj || !menuObj.menu || !menuObj.menu.length){return;}
						$('button', menuObj.menu).each(function(i){
							if(!tracks[i]){return false;}
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
							createSubtitleMenu('<div class="mediamenu '+that[pseudoClasses].menu +'" >'+ (getTrackMenu(tracks)) +'</div>');

							$('span.jme-text, label span.jme-text', checkbox).text((tracks[0].label || ' ') + (tracks[0].lang || ''));

							if(!base.hasClass(that[pseudoClasses].hasTrack) || base.hasClass(that[pseudoClasses].noTrack)){
								control.prop('disabled', false);
							}

						} else if(!base.hasClass(that[pseudoClasses].noTrack) || base.hasClass(that[pseudoClasses].hasTrack)){
							control.prop('disabled', true);
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

	var trackFilters = {
		chapters: function(track){
			return track.kind == 'chapters';
		},
		notDisabled: function(track){
			return track.mode != 'disabled';
		},
		activeLang: function(track){
			return track.language == webshims.activeLang();
		},
		activePartialLang: function(track){
			return track.language == webshims.activeLang().split('-')[0];
		}
	};

	function getBestChapterTrack(tracks){
		var ret = $.grep(tracks, trackFilters.chapters);
		var last = ret;
		if(ret.length > 1){
			ret = $.grep(ret, trackFilters.chapters);
		}

		if(!ret.length){
			ret = last;
		} else if(ret.length > 1){
			ret = $.grep(ret, trackFilters.notDisabled);
		}

		if(!ret.length){
			ret = last;
		} else if(ret.length > 1){
			ret = $.grep(ret, trackFilters.activeLang);
		}

		if(!ret.length){
			ret = last;
		} else if(ret.length > 1){
			ret = $.grep(ret, trackFilters.activePartialLang);
		}

		return ret[0] || last[0] || null;
	}

	var showMode = {
		captions: 'showing',
		subtitles: 'showing'
	};

	$.jme.defineMethod('activateTrack', function(track, success){
		var data = $.jme.data(this);
		if(!data.media){return;}
		var textTrack, timer;
		var callIndex = 0;
		var checkTrackState = function(){
			clearTimeout(timer);
			if(textTrack && textTrack.cues && textTrack.cues.length){
				success(textTrack);
				success = $.noop;
				data.media.find('track').off('load', checkTrackState);
			} else if(callIndex < 9){
				timer = setTimeout(checkTrackState, 100 * callIndex);
				callIndex++;
			}
		};
		if(track.jquery){
			track = track[0];
		}
		if(track.nodeName){
			textTrack = $.prop(track, 'track');
		} else {
			textTrack = track;
		}

		if($.prop(textTrack, 'mode') == 'disabled'){
			$.prop(textTrack, 'mode', showMode[$.prop(textTrack, 'mode')] || 'hidden');
		}
		data.media.prop('textTracks');
		data.media.find('track').on('load', checkTrackState);
		setTimeout(checkTrackState);
	});

	$.jme.defineMethod('getMediaChapters', function(success){
		var data = $.jme.data(this);
		if(!data.media){return;}
		var currentChapterTrack;
		var textTracks = data.media.prop('textTracks');

		var updateChapterTrack = (function(){
			var timer;

			var update = function(){
				var oldChapterTrack;
				var selectedChapterTrack = getBestChapterTrack(textTracks);
				if(currentChapterTrack === selectedChapterTrack){return;}
				oldChapterTrack = currentChapterTrack;
				currentChapterTrack = selectedChapterTrack;
				if(selectedChapterTrack){
					data.media.jmeFn('activateTrack', currentChapterTrack, function(){
						var chapterTree = getChapterTree(currentChapterTrack);
						success(currentChapterTrack, chapterTree, oldChapterTrack);

					});
				} else {
					success(currentChapterTrack, [], oldChapterTrack);
				}

			};
			return function(){
				clearTimeout(timer);
				timer = setTimeout(update);
			};
		})();

		updateChapterTrack();
		$([textTracks]).on('addtrack removetrack change', updateChapterTrack);
		data.player.on('updatesubtitlestate', updateChapterTrack);
		data.media.on('updatetrackdisplay emptied', updateChapterTrack);
	});

	function createChapterList(chapter){
		var item = '<li role="presentation">'+ (this.html.replace('{{startTime}}', chapter.startTime).replace('{{endTime}}', chapter.endTime).replace('{{title}}', chapter.title));
		if(chapter.list && chapter.list.length){
			item += '\n<ul role="presentation">'+ chapter.list.map(createChapterList, this).join('\n\t') +'</ul>\n';
		}
		item += '</li>';
		return item;
	}

	function createChapterBar(chapter){
		var item = '<li role="presentation" style="'+ chapter.style +'" data-start="'+chapter.startTime+'" data-end="'+chapter.endTime+'"><span>'+chapter.title+'</span>';
		if(chapter.list && chapter.list.length){
			item += '\n<ul role="presentation">'+ chapter.list.map(createChapterBar).join('\n\t') +'</ul>\n';
		}
		item += '</li>';
		return item;
	}

	function addChapterRelatives(chapterList){
		var i, start, end, multi;
		if(chapterList.length){
			start = chapterList[0].startTime;
			end = chapterList[chapterList.length - 1].endTime;
			multi =  100 / (end - start);
			for(i = 0; i < chapterList.length; i++){
				chapterList[i].rel = (chapterList[i].endTime - chapterList[i].startTime) * multi;
				if(i == chapterList.length - 1){
					chapterList[i].last = true;
					chapterList[i].style = 'overflow: hidden;';
				} else {
					chapterList[i].style = 'float: left; width: '+chapterList[i].rel+'%;';
				}
				addChapterRelatives(chapterList[i].list);
			}
		}
	}

	function getChapterTree(track){
		var name ='__chaptertree'+track.cues.length;
		if(track[name]){return track[name];}
		var cue, i, chapter, start, end;
		var chapterList = [];
		var currentChapter = null;
		for(i = 0; i < track.cues.length; i++){
			cue = track.cues[i];
			if(currentChapter && currentChapter.startTime > cue.startTime){
				continue;
			}
			if(currentChapter && cue.startTime >= currentChapter.endTime){
				currentChapter = currentChapter.parent;
			}

			if(currentChapter && cue.endTime > currentChapter.endTime){
				continue;
			}
			chapter = {
				startTime: cue.startTime,
				endTime: cue.endTime,
				parent: currentChapter,
				list: [],
				title: cue.text,
				cue: cue
			};
			if(currentChapter){
				currentChapter.list.push(chapter);
			} else {
				currentChapter = chapter;
				chapterList.push(chapter);
			}
		}

		addChapterRelatives(chapterList);
		track[name] = chapterList;
		return chapterList;
	}

	var domPrefixes = ["webkit", "moz", "o", "ms"];

	function prefixed(prop, obj){
		var i, testProp;
		var ret = false;
		if(obj[prop]){
			ret = prop;
		}
		if(!ret){
			prop = prop.charAt(0).toUpperCase() + prop.slice(1);
			for(i = 0; i < domPrefixes.length; i++){
				testProp = domPrefixes[i]+prop;
				if(testProp in obj){
					ret = testProp;
					break;
				}
			}
		}
		return ret;
	}

	$.jme.defineMethod('getChapterTree', getChapterTree);

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
			supportsFullScreen: prefixed('fullscreenEnabled', document) || prefixed('fullScreenEnabled', document),
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
			fullScreenApi.exitName = prefixed("exitFullscreen", document) || prefixed("cancelFullScreen", document);
			fullScreenApi.elementName = prefixed("fullscreenElement", document) || prefixed("fullScreenElement", document);
			fullScreenApi.supportsFullScreen = !!fullScreenApi.supportsFullScreen;
			if(fullScreenApi.elementName != 'fullscreenElement' || fullScreenApi.exitName != 'exitFullscreen' || fullScreenApi.enabledName != 'fullscreenEnabled'){
				$.each(domPrefixes, function(i, prefix){
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
		var that = this;
		this.button = $(button).attr({'aria-haspopup': 'true'});

		this.clickHandler = clickHandler;

		this.toggle = $.proxy(this, 'toggle');
		this.keyIndex = $.proxy(this, 'keyIndex');
		this._buttonClick = $.proxy(this, '_buttonClick');


		this.addMenu(menu);
		this._closeFocusOut();

		this.button
			.wsTouchClick(this.toggle)
			.on('keydown', function(e){
				if(!that.isVisible && (e.keyCode == 38 || e.keyCode == 40)){
					that.show();
					return false;
				}
			})
		;
	};

	$.jme.ButtonMenu.prototype = {
		addMenu: function(menu){
			if(this.menu){
				this.menu.remove();
			}
			this.menu = $(menu);

			this.menu.insertAfter(this.button);
			if(this.clickHandler){
				this.buttons = $('button', this.menu);
				this.menu
					.attr('role', 'menu')
					.on('keydown', this.keyIndex)
					.wsTouchClick('button', this._buttonClick)
				;

			}
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
				.on('focusin mousedown click touchend', stopFocusOut)
				.on('focusout', function(e){
					timer = setTimeout(function(){
						that.activeElement = false;
						that.hide();
					}, 40);
				})
			;
		},
		_buttonClick: function(e){
			if(this.clickHandler){
				this.clickHandler(this.buttons.index(e.currentTarget), e.currentTarget);
				this.hide();
			}
		},
		keyIndex: function(e){
			var dir = (e.keyCode == 40) ? 1 : (e.keyCode == 38) ? -1 : 0;
			if(e.keyCode == 27){
				this.hide();
			}
			if(dir){
				var buttons = this.buttons.not(':disabled');
				var activeButton = buttons.filter(':focus');

				activeButton = buttons[buttons.index(activeButton) + dir] || buttons.filter(dir > 0 ? ':first' : ':last');
				activeButton.trigger('focus');
				e.preventDefault();
			}
		},
		show: function(){
			if(this.isVisible){return;}
			var buttons = $('button, select, input, textarea', this.menu).not(':disabled, [aria-diabled="true"]');
			this.isVisible = true;
			this.menu.addClass('visible-menu');
			try {
				this.activeElement = document.activeElement || this.button[0];
			} catch(er){
				this.activeElement = this.button[0];
			}

			setTimeout(function(){
				$(buttons.filter('[aria-checked="true"]').last()[0] || buttons[0]).trigger('focus');
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
						.on('touchend.jmeuseractivity setuseractive.jmeuseractivity mousemove.jmeuseractivity focusin.jmeuseractivity mouseenter.jmeuseractivity keydown.jmeuseractivity keyup.jmeuseractivity mousedown.jmeuseractivity', setActive)
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
