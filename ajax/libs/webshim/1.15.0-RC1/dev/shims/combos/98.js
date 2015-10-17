webshims.register('jmebase', function($, webshims, window, doc, undefined){
	"use strict";
	var props = {};
	var fns = {};
	var slice = Array.prototype.slice;
	var readyLength = 0;
	var options = $.extend({selector: '.mediaplayer'}, webshims.cfg.mediaelement.jme);
	var baseSelector = options.selector;
	
	webshims.cfg.mediaelement.jme = options;

	if(!$.jme){
		$.jme = {};
	}

	$.extend($.jme, {
		pluginsClasses: [],
		pluginsSel: '',
		plugins: {},
		props: props,
		fns: fns,
		data: function(elem, name, value){
			var data = $(elem).data('jme') || $.data(elem, 'jme', {});
			if(value === undefined){
				return (name) ? data[name] : data;
			} else {
				data[name] = value;
			}
		},
		runPlugin: function(sel){
			if(readyLength){
				$(document.querySelectorAll(baseSelector)).each(function(){
					var controls = this.querySelectorAll(sel);
					if(controls.length){
						$(this).jmeFn('addControls', controls);
					}
				});
			}
		},
		registerPlugin: function(name, plugin){
			this.plugins[name] = plugin;
			if(!plugin.nodeName){
				plugin.nodeName = '';
			}
			if(!plugin.className){
				plugin.className = name;
			}

			this.pluginsClasses.push('.'+plugin.className);

			this.pluginsSel = this.pluginsClasses.join(', ');

			options[name] = $.extend(plugin.options || {}, options[name]);

			if(options[name] && options[name].text){
				plugin.text = options[name].text;
			} else if(options.i18n && options.i18n[name]){
				plugin.text = options.i18n[name];
			}
			this.runPlugin('.'+plugin.className);
		},
		configmenuPlugins: {},
		addToConfigmenu: function(name, create){
			this.configmenuPlugins[name] = create;
		},
		defineMethod: function(name, fn){
			fns[name] = fn;
		},
		defineProp: function(name, desc){
			if(!desc){
				desc = {};
			}
			if(!desc.set){
				if(desc.readonly){
					desc.set = function(){
						throw(name +' is readonly');
					};
				} else {
					desc.set = $.noop;
				}
			}
			if(!desc.get){
				desc.get = function(elem){
					return $.jme.data(elem, name);
				};
			}
			props[name] = desc;
		},
		prop: function(elem, name, value){
			if(!props[name]){
				return $.prop(elem, name, value);
			}
			if(value === undefined){
				return props[name].get( elem );
			} else {
				var setValue = props[name].set(elem, value);
				if(setValue === undefined){
					setValue = value;
				}
				if(setValue != 'noDataSet'){
					$.jme.data(elem, name, setValue);
				}
			}
		}
	});

	$.fn.jmeProp = function(name, value){
		return $.access( this, $.jme.prop, name, value, arguments.length > 1 );
	};

	$.fn.jmeFn = function(fn){
		var args = slice.call( arguments, 1 );
		var ret;
		this.each(function(){
			if(!$.jme.data(this).media){
				$(this).closest(baseSelector).jmePlayer();
				webshims.warn('jmeFn called to early or on wrong element!');
			}
			ret = (fns[fn] || $.prop(this, fn)).apply(this, args);
			if(ret !== undefined){
				return false;
			}
		});
		return (ret !== undefined) ? ret : this;
	};
	var idlStates = {
		emptied: 1,
		pause: 1
	};
	var unwaitingEvents = {
		canplay: 1, canplaythrough: 1
	};


	$.jme.initJME = function(context, insertedElement){
		readyLength += $(context.querySelectorAll(baseSelector)).add(insertedElement.filter(baseSelector)).jmePlayer().length;
	};


	$.jme.getDOMList = function(attr){
		var list = [];
		if(!attr){
			attr = [];
		}
		if(typeof attr == 'string'){
			attr = attr.split(' ');
		}
		$.each(attr, function(i, id){
			if(id){
				id = document.getElementById(id);
				if(id){
					list.push(id);
				}
			}
		});
		return list;
	};


	$.jme.getButtonText = function(button, classes){
		var isCheckbox;
		var lastState;
		var txtChangeFn = function(state){
			if(lastState === state){return;}
			lastState = state;


			button
				.removeClass(classes[(state) ? 0 : 1])
				.addClass(classes[state])
			;

			if(isCheckbox){
				button.prop('checked', !!state);
				(button.data('checkboxradio') || {refresh: $.noop}).refresh();
			}
		};

		if (button.is('[type="checkbox"], [type="radio"]')){
			button.prop('checked', function(){
				return this.defaultChecked;
			});
			isCheckbox = true;
		} else if(button.is('a')){
			button.on('click', function(e){
				e.preventDefault();
			});
		}

		return txtChangeFn;
	};

	$.fn.jmePlayer = function(opts){

		return this.each(function(){


			var mediaUpdateFn, canPlay, removeCanPlay, canplayTimer, lastState, stopEmptiedEvent, forceRender;
			var media = $('audio, video', this).eq(0);
			var base = $(this);

			var jmeData = $.jme.data(this);
			var mediaData = $.jme.data(media[0]);


			base.addClass(media.prop('nodeName').toLowerCase()+'player');
			mediaData.player = base;
			mediaData.media = media;
			if(!jmeData.media){
				forceRender = function(){
					base[0].className = base[0].className;
				};
				removeCanPlay = function(){
					media.off('canplay', canPlay);
					clearTimeout(canplayTimer);
				};
				canPlay = function(){
					var state = (media.prop('paused')) ? 'idle' : 'playing';
					base.attr('data-state', state);
				};
				mediaUpdateFn = function(e){
					var state = e.type;
					var readyState;
					var paused;
					removeCanPlay();

					if(unwaitingEvents[state] && lastState != 'waiting'){
						return;
					}

					if(stopEmptiedEvent && state == 'emptied'){
						return;
					}

					if(state == 'ended' || $.prop(this, 'ended')){
						state = 'ended';
					} else if(state == 'waiting'){

						if($.prop(this, 'readyState') > 2){
							state = '';
						} else {
							canplayTimer = setTimeout(function(){
								if(media.prop('readyState') > 2){
									canPlay();
								}
							}, 9);
							media.on('canPlay', canPlay);
						}

					} else if(idlStates[state]){
						state = 'idle';
					} else {
						readyState = $.prop(this, 'readyState');
						paused = $.prop(this, 'paused');
						if(!paused && readyState < 3){
							state = 'waiting';
						} else if(!paused && readyState > 2){
							state = 'playing';
						} else {
							state = 'idle';
						}
					}

					if(state == 'idle' && base._seekpause){
						state = false;
					}

					if(state){
						lastState = state;
						base.attr('data-state', state);
						setTimeout(forceRender);
					}
				};


				jmeData.media = media;
				jmeData.player = base;
				media
					.on('emptied waiting canplay canplaythrough playing ended pause mediaerror', mediaUpdateFn)
					.on('volumechange updateJMEState', function(){
						var volume = $.prop(this, 'volume');
						base[!volume || $.prop(this, 'muted') ? 'addClass' : 'removeClass']('state-muted');

						if(volume < 0.01){
							volume = 'no';
						} else if(volume < 0.36){
							volume = 'low';
						} else if(volume < 0.7){
							volume = 'medium';
						} else {
							volume = 'high';
						}
						base.attr('data-volume', volume);
					})
				;
				if($.jme.pluginsSel){
					base.jmeFn('addControls', $(base[0].querySelectorAll($.jme.pluginsSel)));
				}
				if(mediaUpdateFn){
					media.on('updateJMEState', mediaUpdateFn).triggerHandler('updateJMEState');
				}
			}
		});
	};


	$.jme.defineProp('isPlaying', {
		get: function(elem){
			return (!$.prop(elem, 'ended') && !$.prop(elem, 'paused') && $.prop(elem, 'readyState') > 1 && !$.data(elem, 'mediaerror'));
		},
		readonly: true
	});

	$.jme.defineProp('player', {
		readonly: true
	});

	$.jme.defineProp('media', {
		readonly: true
	});

	$.jme.defineProp('srces', {
		get: function(elem){
			var srces;
			var data = $.jme.data(elem);
			var src = data.media.prop('src');
			if(src){
				return [{src: src}];
			}
			srces = $.map($('source', data.media).get(), function(source){
				var i, len;
				var src = {
					src: $.prop(source, 'src')
				};
				var attributes = source.attributes;

				for(i = 0, len = attributes.length; i < len; i++){
					if(!('specified' in attributes[i]) || attributes[i].specified){
						src[attributes[i].nodeName] = attributes[i].nodeValue;
					}
				}
				return src;
			});
			return srces;
		},
		set: function(elem, srces){
			var data = $.jme.data(elem);

			var setSrc = function(i, src){
				if(typeof src == 'string'){
					src = {src: src};
				}
				$(document.createElement('source')).attr(src).appendTo(data.media);
			};
			data.media.removeAttr('src').find('source').remove();
			if($.isArray(srces)){
				$.each(srces, setSrc);
			} else {
				setSrc(0, srces);
			}
			data.media.jmeFn('load');
			return 'noDataSet';
		}
	});

	$.jme.defineMethod('togglePlay', function(){
		$(this).jmeFn( ( props.isPlaying.get(this) ) ? 'pause' : 'play' );
	});


	$.jme.defineMethod('addControls', function(controls){
		var data = $.jme.data(this) || {};

		if(!data.media){return;}
		var oldControls = $.jme.data(data.player[0], 'controlElements') || $([]);
		controls = $(controls);
		if($.jme.pluginsSel){
			controls = controls.find($.jme.pluginsSel).add(controls.filter($.jme.pluginsSel));
		}
		if(controls.length){
			$.each($.jme.plugins, function(name, plugin){
				var control, options, i, opt;
				var pluginControls = controls.filter('.'+plugin.className);

				for(i = 0; i < pluginControls.length; i++){
					control = $(pluginControls[i]);
					options = $.jme.data(pluginControls[i]);
					options.player = data.player;
					options.media = data.media;
					if(!options._rendered){
						options._rendered = true;

						if(plugin.options){
							for(opt in plugin.options){
								if(!(opt in options)){
									options[opt] = plugin.options[opt];
								}
							}
						}

						plugin._create(control, data.media, data.player, options);
					}
				}

			});

			$.jme.data(data.player[0], 'controlElements', oldControls.add(controls));

			data.player.triggerHandler('controlsadded');
		}
	});

	webshims.ready('DOM mediaelement', function(){
		webshims.isReady('jme', true);
		webshims.addReady($.jme.initJME);
		webshims.isReady('jme-base', true);

		if(webshims.cfg.debug !== false && document.getElementsByTagName('video').length && !document.querySelector(baseSelector)){
			webshims.warn("found video element but video wasn't wrapped inside a ."+ baseSelector +" element. Will not add control UI");
		}
	});

});
;webshims.register('mediacontrols', function($, webshims, window){
	"use strict";
	var pseudoClasses = 'pseudoClasses';

	var options = webshims.cfg.mediaelement.jme;
	var baseSelector = options.selector;
	var jme = $.jme;
	var unknownStructure = '<div class="{%class%}"></div>';
	var btnStructure = '<button class="{%class%}" type="button" aria-label="{%text%}"></button>';
	var slideStructure = '<div class="{%class%} media-range" aria-label="{%text%}"></div>';
	var timeStructure = '<div  class="{%class%}">00:00</div>';

	var noVolumeClass = (function(){
		var audio;
		var ret = '';

		if(window.Audio){
			try {
				audio = new Audio();
				audio.volume = 0.55;
				ret = ((Math.round(audio.volume * 100) / 100) == 0.55) ? '' : ' no-volume-api';
			} catch(e){}

		}
		return ret;
	})();

	var getBarHtml = (function(){
		var cache = {};
		var regTemplate = /\{\{(.+?)\}\}/igm;

		return function(template, invalidCache){
			if(!template){
				template = options.barTemplate;
			}
			if(!cache[template] || invalidCache){
				cache[template] = template.replace(regTemplate, function(match, matchName){
					var plugin = jme.plugins[matchName];
					if(plugin){
						if(!plugin.structure){
							webshims.warn('no structure option provided for plugin: '+ matchName +'. Fallback to standard div');
							plugin.structure = unknownStructure;
						}
						return plugin.structure.replace('{%class%}', matchName).replace('{%text%}', plugin.text || '');
					}
					return match;
				});
			}

			return cache[template] || '';
		};
	})();
	var ios = /iP(hone|od|ad)/i.test(navigator.platform);
	var ios6 = ios && parseInt(((navigator.appVersion).match(/OS (\d+)_\d+/) || ['','8'])[1], 10) < 7;
	var hasYtBug = (!window.Modernizr || !Modernizr.videoautoplay) && (ios || /android/i.test(navigator.userAgent));
	var loadLazy = function(){
		if(!loadLazy.loaded){
			loadLazy.loaded = true;
			webshims.loader.loadList(['mediacontrols-lazy', 'range-ui']);
		}
	};
	var lazyLoadPlugin = function(fn){
		if(!fn){
			fn = '_create';
		}
		var rfn = function(c, media){
			var obj = this;
			var args = arguments;
			loadLazy();
			webshims.ready('mediacontrols-lazy', function(){
				if(rfn != obj[fn] && $.data(media[0])){
					return obj[fn].apply(obj, args);
				} else {
					webshims.error('stop too much recursion');
				}
			});
		};
		return rfn;
	};

	webshims.loader.addModule('mediacontrols-lazy', {
		src: 'jme/mediacontrols-lazy',
		d: ['dom-support']
	});

	var userActivity = {
		_create: lazyLoadPlugin()
	};
	jme.plugins.useractivity = userActivity;

	jme.defineProp('controlbar', {
		set: function(elem, value){
			value = !!value;
			var controls, playerSize;
			var data = jme.data(elem);
			var controlBar = $('div.jme-mediaoverlay, div.jme-controlbar', data.player);
			var structure = '';
			if(value && !controlBar[0]){
				if(data._controlbar){
					data._controlbar.appendTo(data.player);
				} else {
					if(ios6){
						data.media.removeAttr('controls');
						data.media.mediaLoad();
					}

					if(hasYtBug){
						data.player.addClass('has-yt-bug');
					}

					data.media.prop('controls', false);
					structure = getBarHtml();
					data._controlbar = $( options.barStructure );
					controlBar = data._controlbar.find('div.jme-cb-box').addClass('media-controls');
					controls = data._controlbar.filter('.jme-media-overlay');
					controls =  controls.add( controlBar );
					$(structure).appendTo(controlBar);
					data._controlbar.appendTo(data.player);
					data.player.jmeFn('addControls', controls);

					playerSize = (function(){
						var lastSize = {};
						var sizes = [
							{size: 290, name: 'xx-small', names: 's xs xxs'},
							{size: 380, name: 'x-small', names: 's xs'},
							{size: 478, name: 'small', names: 's'},
							{size: 756, name: 'medium', names: 'm'},
							{size: 1024, name: 'large', names: 'l'},
							{size: Number.MAX_VALUE, name: 'x-large', names: 'l xl'}
						];


						var len = sizes.length;
						return function(){
							var size;
							var i = 0;
							var width = data.player.outerWidth();
							var fSize = Math.max(parseInt(data.player.css('fontSize'), 10) || 16, 13);

							width = width *  (16 / fSize);
							for(; i < len; i++){
								if(sizes[i].size >= width){
									size = sizes[i];
									break;
								}
							}

							if(lastSize.name != size.name){
								lastSize = size;
								data.player.attr('data-playersize', size.name);
								data.player.attr('data-playersizes', size.names);
							}
						};
					})();
					var $poster = $('<div class="ws-poster" />').insertAfter(data.media);
					var posterState = (function(){
						var lastPosterState, lastYoutubeState, lastPoster, isYt;
						var hasFlash = window.swfmini && swfmini.hasFlashPlayerVersion('10.0.3');
						var regYt = /youtube\.com\/[watch\?|v\/]+/i;

						var isInitial = data.media.prop('paused');
						var isEnded = data.media.prop('ended');
						if(isInitial){
							data.player.addClass('initial-state');
						}
						if(isEnded){
							data.player.addClass('ended-state');
						}
						if(!('backgroundSize' in $poster[0].style)){
							data.player.addClass('no-backgroundsize');
						}
						data.media.on('play playing waiting seeked seeking', function(e){
							if(!e){
								e.type = 'playing';
							}

							if(isInitial && (!isYt || !hasYtBug || e.type == 'playing' || data.media.prop('readyState') > 1)){
								isInitial = false;
								data.player.removeClass('initial-state');
							}

							if(isEnded){
								isEnded = false;
								data.player.removeClass('ended-state');
							}
						});
						data.media.on('ended', function(){
							if(!isEnded && !data.media.prop('loop') && data.media.prop('ended')){
								isEnded = true;
								data.player.addClass('ended-state');
							}
						});

						return function(){
							var hasYt;
							var poster = data.media.attr('poster');
							var hasPoster = !!poster;
							var currentSrc = data.media.prop('currentSrc') || '';

							isYt = regYt.test(currentSrc);

							hasYt = (hasFlash && hasPoster) ? false : isYt;

							if(!hasPoster && isYt){
								poster =  currentSrc.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i) || '';
								if(poster){
									poster = 'https://img.youtube.com/vi/'+ poster[1] +'/0.jpg';
									hasPoster = !!poster;
								}
							}

							if(lastPoster !== poster){
								lastPoster = poster;
								$poster[0].style.backgroundImage = poster ? 'url('+poster+')' : '';
							}

							if(lastPosterState !== hasPoster){
								lastPosterState = hasPoster;
								data.player[hasPoster ? 'removeClass' : 'addClass']('no-poster');
							}

							if(data.media.prop('paused')){
								data.player.addClass('initial-state');
								isInitial = true;
							}

							if(isEnded){
								isEnded = false;
								data.player.removeClass('ended-state');
							}

							//https://code.google.com/p/gdata-issues/issues/detail?id=5415
							data.player[isYt ? 'addClass' : 'removeClass']('yt-video');

							if(lastYoutubeState !== hasYt){
								lastYoutubeState = hasYt;
								data.player[hasYt ? 'addClass' : 'removeClass']('has-ytposter');
							}
						};
					})();


					userActivity._create(data.player, data.media, data.player);

					data.media.on('emptied loadstart', function(){
						setTimeout(posterState);
					});

					playerSize();
					posterState();
					webshims.ready('dom-support', function(){
						data.player.onWSOff('updateshadowdom', playerSize);
						controls.add(data._controlbar).add($poster).addClass(webshims.shadowClass);
						webshims.addShadowDom();
					});
				}

			} else if(!value) {
				controlBar.detach();
			}
			return value;
		}
	});

	jme.registerPlugin('play-pause', {
		structure: btnStructure,
		text: 'play / pause',
		_create: lazyLoadPlugin()
	});

	jme.registerPlugin('mute-unmute', {
		structure: btnStructure,
		text: 'mute / unmute',
		_create: lazyLoadPlugin()
	});

	jme.registerPlugin('jme-media-overlay', {
		_create: lazyLoadPlugin()
	});




	jme.registerPlugin('volume-slider', {
		structure: slideStructure,
		text: 'volume level',
		_create: lazyLoadPlugin()
	});

	jme.registerPlugin('time-slider', {
		structure: slideStructure,

		options: {
			format: ['mm', 'ss']
		},
		text: 'time position',
		_create: lazyLoadPlugin()
	});


	jme.defineProp('format', {
		set: function(elem, format){
			if(!$.isArray(format)){
				format = format.split(':');
			}
			var data = jme.data(elem);
			data.format = format;
			$(elem).triggerHandler('updatetimeformat');
			data.player.triggerHandler('updatetimeformat');
			return 'noDataSet';
		}
	});

	jme.registerPlugin('duration-display', {
		structure: timeStructure,
		options: {
			format: "mm:ss"
		},
		_create: lazyLoadPlugin()
	});

	jme.defineProp('countdown', {
		set: function(elem, value){

			var data = jme.data(elem);
			data.countdown = !!value;
			$(elem).triggerHandler('updatetimeformat');
			data.player.triggerHandler('updatetimeformat');
			return 'noDataSet';
		}
	});

	jme.registerPlugin('currenttime-display', {
		structure: timeStructure,
		options: {
			format: "mm:ss",
			countdown: false
		},
		_create: lazyLoadPlugin()
	});


	/**
	 * Added Poster Plugin
	 * @author mderting
	 */

	/*
	 * the old technique wasn't fully bullet proof
	 * beside this, jme2 adovactes to use the new improved state-classes to handle visual effect on specific state (see CSS change)
	 */
	jme.registerPlugin('poster-display', {
		structure: '<div />',
		options: {
		},
		_create: lazyLoadPlugin()
	});


	jme.registerPlugin('fullscreen', {

		options: {
			fullscreen: true,
			autoplayfs: false
		},
		structure: btnStructure,
		text: 'enter fullscreen / exit fullscreen',
		_create: lazyLoadPlugin()
	});

	jme.registerPlugin('mediaconfigmenu', {
		structure: btnStructure,
		text: 'configuration',
		_create: lazyLoadPlugin()
	});


	jme.registerPlugin('captions', {
		structure: btnStructure,
		text: 'subtitles',
		_create: function(control, media, base){
			var trackElems = media.find('track').filter(':not([kind]), [kind="subtitles"], [data-kind="subtitles"], [kind="captions"], [data-kind="captions"]');
			control.wsclonedcheckbox = $(control).clone().attr({role: 'checkbox'}).insertBefore(control);
			base.attr('data-tracks', trackElems.length > 1 ? 'many' : trackElems.length);
			control.attr('aria-haspopup', 'true');
			lazyLoadPlugin().apply(this, arguments);
		}
	});


	jme.registerPlugin('chapters', {
		structure: btnStructure,
		text: 'chapters',
		_create: function(control, media, base){
			var trackElems = media.find('track').filter('[kind="chapters"], [data-kind="chapters"]');
			control.attr('aria-haspopup', 'true');
			if(trackElems.length){
				webshims._polyfill(['track']);
				base.addClass('has-chapter-tracks');
			}
			lazyLoadPlugin().apply(this, arguments);
		}
	});



	webshims.ready(webshims.cfg.mediaelement.plugins.concat(['mediaelement', 'jme-base']), function(){
		if(!options.barTemplate){
			options.barTemplate = '<div class="play-pause-container">{{play-pause}}</div><div class="playlist-container"><div class="playlist-box"><div class="playlist-button-container">{{playlist-prev}}</div><div class="playlist-button-container">{{playlist-next}}</div></div></div><div class="currenttime-container">{{currenttime-display}}</div><div class="progress-container">{{time-slider}}</div><div class="duration-container">{{duration-display}}</div><div class="mute-container">{{mute-unmute}}</div><div class="volume-container">{{volume-slider}}</div><div class="chapters-container"><div class="chapters-controls mediamenu-wrapper">{{chapters}}</div></div><div class="subtitle-container mediamenu-wrapper"><div class="subtitle-controls">{{captions}}</div></div><div class="mediaconfig-container"><div class="mediaconfig-controls mediamenu-wrapper">{{mediaconfigmenu}}</div></div><div class="fullscreen-container">{{fullscreen}}</div>';
		}
		if(!options.barStructure){
			options.barStructure = '<div class="jme-media-overlay"></div><div class="jme-controlbar'+ noVolumeClass +'" tabindex="-1"><div class="jme-cb-box"></div></div>';
		}

		webshims.addReady(function(context, insertedElement){
			$(baseSelector, context).add(insertedElement.filter(baseSelector)).jmeProp('controlbar', true);
		});
	});
	webshims.ready('WINDOWLOAD', loadLazy);
});
;webshims.ready('jme-base DOM', function(){
	"use strict";
	var webshims = window.webshims;
	var $ = webshims.$;
	var jme = $.jme;
	var listId = 0;
	var btnStructure = '<button class="{%class%}" type="button" aria-label="{%text%}"></button>';

	function PlaylistList(data){
		this._data = data;
		this.lists = {};

		this.on('showcontrolschange', this._updateControlsClass);
	}

	$.extend(PlaylistList.prototype, {
		on: function(){
			$.fn.on.apply($(this), arguments);
		},
		off: function(){
			$.fn.off.apply($(this), arguments);
		},
		_getListId: function(list){
			var id;
			if(typeof list == 'string'){
				id = list;
			} else {
				id = list.id;
			}
			return id;
		},
		_updateControlsClass: function(){
			this._data.player[this.getShowcontrolsList() ? 'addClass' : 'removeClass']('has-playlist');
		},
		add: function(list, opts){

			list = new Playlist(list, this, opts);
			if(!list.id){
				listId++;
				list.id = 'list-'+listId;
			}
			this.lists[list.id] = list;

			if(list.options.showcontrols){
				this._data.player.addClass('has-playlist');
			}

			return list;
		},
		remove: function(list){
			var id = this._getListId(list);
			if(this.lists[id]){
				this.lists[id]._remove();
				delete this.lists[id];
			}
			if(!this.getShowcontrolsList()){
				this._data.player.removeClass('has-playlist');
			}
		},
		getAutoplayList: function(){
			var clist = null;
			$.each(this.lists, function(id, list){
				if(list.options.autoplay){
					clist = list;
					return false;
				}
			});
			return clist;
		},
		getShowcontrolsList: function(){
			var clist = null;
			$.each(this.lists, function(id, list){
				if(list.options.showcontrols){
					clist = list;
					return false;
				}
			});
			return clist;
		}

	});

	function Playlist(list, parent, opts){
		this.list = list || [];
		this.playlists = parent;
		this.media = parent._data.media;
		this.player = parent._data.player;
		this.options = $.extend(true, {}, Playlist.defaults, opts);
		this.options.itemTmpl  = this.options.itemTmpl.trim();

		this.deferred = $.Deferred();
		this._selectedIndex = -1;
		this._selectedItem = null;
		this.$rendered = null;

		this._detectListType();

		this.autoplay(this.options.autoplay);

		this.deferred.done(function(){
			this._addEvents(this);
			if(this.options.defaultSelected == 'auto' && !this.media.jmeProp('srces').length){
				this.options.defaultSelected = 0;
			}
			if(this.list[this.options.defaultSelected]){
				this.selectedIndex(this.options.defaultSelected);
			}
			this._fire('addlist');
		});
	}

	Playlist.getText = function($elem){
		return $elem.attr('content') || ($elem.text() || '').trim();
	};
	Playlist.getUrl = function($elem){
		return $elem.attr('content') || $elem.attr('url') || $elem.attr('href') || $elem.attr('src') || ($elem.text() || '').trim();
	};

	Playlist.defaults = {
		loop: false,
		autoplay: false,
		defaultSelected: 'auto',
		addItemEvents: true,
		showcontrols: true,
		ajax: {},
		itemTmpl: '<li class="list-item">' +
			'<% if(typeof poster == "string" && poster) {%><img src="<%=poster%>" /><% }%>' +
			'<h3><%=title%></h3>' +
			'<% if(typeof description == "string" && description) {%><div class="item-description"><%=description%></div><% }%>' +
		'</li>',
		renderer: function(item, template){
			return $.jme.tmpl(template, item);
		},
		mapDom: function(element){

			return {
				title: Playlist.getText($('[itemprop="name"], h1, h2, h3, h4, h5, h6, a', element)),
				srces: $('[itemprop="contentUrl"], a[type^="video"], a[type^="audio"]', element).map(function(){
					var tmp;
					var src =  {src: Playlist.getUrl($(this))};
					if(this.nodeName.toLowerCase() == 'a'){
						tmp = $.prop(this, 'type');
					} else {
						tmp = Playlist.getText($('[itemprop="encodingFormat"]', element));
					}
					if(tmp){
						src.type = tmp;
					}
					tmp = $.attr(this, 'data-media');
					if(tmp){
						src.media = tmp;
					}
					return src;
				}).get(),
				tracks: $('a[type="text/vtt"]').map(mapTrackUrl).get(),
				poster: Playlist.getUrl($('[itemprop="thumbnailUrl"], a[type^="image"], img', element)) || null,
				description:  Playlist.getText($('[itemprop="description"], .item-description, p', element)) || null
			};
		},
		mapUrl: function(opts, callback){
			$.ajax($.extend(opts, {
				success: function(data){
					var list;
					if($.isArray(data)){
						list = data;
					} else if(data.responseData && data.responseData.feed){
						data = data.responseData.feed;
						list = (data.entries || []).map(mapJsonFeed);
					} else {
						list = [];
						$('item', data).each(function(){
							var srces =  $('enclosure, media\\:content', this)
								.filter('[type^="video"], [type^="audio"]')
								.map(mapUrl)
								.get()
							;
							if(srces.length){
								list.push({
									title: $('title', this).html(),
									srces: srces,
									publishedDate: $('pubDate', this).html() || null,
									description: $('description', this).text() || null,
									poster: Playlist.getUrl($('itunes\\:image, media\\:thumbnail, enclosure[type^="image"], media\\:content[type^="image"]', this)) || null,
									author: $('itunes\\:author', this).html() || null,
									duration: $('itunes\\:duration', this).html() || null,
									tracks: $('media\\:subTitle', this).map(mapTrackUrl).get() || null
								});
							}
						});
					}
					if(list != data){
						list.fullData = data;
					}
					callback(list);
				}
			}));
		}
	};

	function mapJsonFeed(item){
		item.description = item.description || item.content;
		item.srces = [];
		(item.mediaGroups || []).forEach(function(mediagroup){
			(mediagroup.contents || []).forEach(function(itemSrc){
				itemSrc.src = itemSrc.src || itemSrc.url;
				item.srces.push(itemSrc);
			});
		});
		return item;
	}

	function mapTrackUrl(){
		return {
			src: $.attr(this, 'href'),
			srclang: $.attr(this, 'lang'),
			label: $.attr(this, 'data-label')
		};
	}

	function mapUrl(){
		return {
			src: $.attr(this, 'url') || $.attr(this, 'href'),
			type: $.attr(this, 'type')
		};
	}

	function filterNode(){
		return this.nodeType == 1;
	}

	$.extend(Playlist.prototype, {
		on: function(){
			$.fn.on.apply($(this), arguments);
		},
		off: function(){
			$.fn.off.apply($(this), arguments);
		},
		_detectListType: function(){
			var fullData;
			if(typeof this.list == 'string'){
				this._createListFromUrl();
				return;
			}
			if(this.list.nodeName || (this.list.length > 0 && this.list[0].nodeName)){
				this._createListFromDom();
			} else if(this.list.responseData && this.list.responseData.feed){
				fullData = this.list.responseData.feed;
				this.list = (fullData.entries || []).map(mapJsonFeed);
				this.list.fullData = fullData;
			}
			this.deferred.resolveWith(this);

		},
		_createListFromUrl: function(){
			var that = this;
			this.options.ajax.url = this.list;
			this.options.mapUrl(this.options.ajax, function(list){
				that.list = list;
				that.deferred.resolveWith(that);
			});
		},
		_createListFromDom: function(){
			var that = this;

			this.$rendered = $(this.list).eq(0);
			this.list = [];

			if(this.$rendered){
				this._addDomList();
				this.list = this.$rendered.children().map(function(){
					return that._createItemFromDom(this);
				}).get();
			}
		},
		_createItemFromDom: function(dom){
			var item = this.options.mapDom(dom);
			this._addItemData(item, dom);
			return item;
		},
		_fire: function(evt, extra){
			var evt = $.Event(evt);
			$(this).triggerHandler(evt, extra);
			$(this.playlists).triggerHandler(evt, $.merge([{list: this}], extra || []));
			if(this.$rendered){
				this.$rendered.triggerHandler(evt, extra);
			}
		},
		_addDomList: function(){
			this.$rendered
				.attr({
					'data-autoplay': this.options.autoplay,
					'data-loop': this.options.loop
				})
				.addClass('media-playlist')
				.data('playlist', this)
			;
		},
		_addItemData: function(item, dom){
			var that = this;
			item.$item = $(dom).data('itemData', item);

			if(item == this._selectedItem){
				item.$item.addClass('selected-item');
			}
			if(this.options.addItemEvents){
				item.$item.on('click.playlist', function(e){
					if(that.options.addItemEvents){
						that.playItem(item, e);
						return false;
					}
				});
			}
		},
		_addEvents: function(that){
			var o = that.options;
			var onEnded = function(e){
				if(o.autoplay){
					that.playNext(e);
				}
			};
			this.media.on('ended', onEnded);
			this._remove = function(){
				that.media.off('ended', onEnded);
				that.autoplay(false);

				if(that.$rendered){
					that.$rendered.remove();
				}

				that._fire('removelist');
			};
		},
		_remove: function(){
			this._fire('removelist');
		},
		render: function(callback){
			if(this.$rendered){
				callback(this.$rendered, this.player, this);
			} else {
				this.deferred.done(function(){
					var nodeName;
					var that = this;
					var items = [];
					if(!this.$rendered){
						$.each(this.list, function(i, item){
							var domItem = $($.parseHTML(that.options.renderer(item, that.options.itemTmpl))).filter(filterNode)[0];
							that._addItemData(item, domItem);
							items.push(domItem);
						});
						nodeName = (items[0] && items[0].nodeName || '').toLowerCase();

						switch (nodeName){
							case 'li':
								this.$rendered = $.parseHTML('<ul />');
								break;
							case 'option':
								this.$rendered = $.parseHTML('<select />');
								break;
							default:
								this.$rendered = $.parseHTML('<div />');
								break;
						}
						this.$rendered = $(this.$rendered).html(items);
						this._addDomList();
					}
					callback(this.$rendered, this.player, this);
				});
			}
		},
		/*

		addItem: function(item, pos){

		},
		removeItem: function(item){

		},
		*/
		_loadItem: function(item){
			var media = this.media;
			media.attr('poster', item.poster || '');

			$('track', media).remove();

			$.each(item.tracks || [], function(i, track){
				$('<track />').attr(track).appendTo(media);
			});
			if(!item.srces){
				item.srces = item;
			}
			media.jmeProp('srces', item.srces);
		},
		_getItem: function(item){
			if(item && (item.nodeName || item.jquery || typeof item == 'string')){
				item = $(item).data('itemData');
			}
			return item;
		},
		playItem: function(item, e){
			var media;
			this.selectedItem(item, e);
			if(item){
				media = this.media.play();
				setTimeout(function(){
					media.play();
				}, 9);
			}
		},
		selectedIndex: function(index, e){
			if(arguments.length){
				this.selectedItem(this.list[index], e);
			} else {
				return this._selectedIndex;
			}
		},

		selectedItem: function(item, e){
			var oldItem, found;

			if(arguments.length){
				found = -1;
				item = this._getItem(item);
				if(item){
					$.each(this.list, function(i){
						if(item == this){
							found = i;
							return false;
						}
					});
				}

				if(found >= 0){
					this._loadItem(this.list[found]);
				}

				if(found != this._selectedIndex){
					oldItem = this._selectedItem || null;
					if(oldItem && oldItem.$item){
						oldItem.$item.removeClass('selected-item');
					}
					this._selectedItem = this.list[found] || null;
					this._selectedIndex = found;
					if(this._selectedItem && this._selectedItem.$item){
						this._selectedItem.$item.addClass('selected-item');
					}
					if(oldItem !== this._selectedItem){
						this._fire('itemchange', [{oldItem: oldItem, from: e || null}]);
					}
				}

			} else {
				return this._selectedItem;
			}
		},
		playNext: function(){
			var item = this.getNext();
			if(item){
				this.playItem(item);
			}
		},
		playPrev: function(){
			var item = this.getPrev();
			if(item){
				this.playItem(item);
			}
		},
		getNext: function(){
			var index = this._selectedIndex + 1;
			return this.list[index] || (this.options.loop ? this.list[0] : null);
		},
		getPrev: function(){
			var index = this._selectedIndex - 1;
			return this.list[index] || (this.options.loop ? this.list[this.list.length - 1] : null);
		}
	});

	[{name: 'autoplay', fn: 'getAutoplayList'}, {name: 'showcontrols', fn: 'getShowcontrolsList'}, {name: 'loop'}].forEach(function(desc){
		Playlist.prototype[desc.name] = function(value){
			var curList;
			if(arguments.length){
				value = !!value;

				if(value && desc.fn){
					curList = this.playlists[desc.fn]();
					if(curList && curList != this){
						curList[desc.name](false);
					}
				}

				if(this.options[desc.name] != value){
					this.options[desc.name] = value;
					if(this.$rendered){
						this.$rendered.attr('data-'+desc.name, value);
					}
					this._fire(desc.name+'change');
				}
			} else {
				return this.options[desc.name];
			}
		}
	});

	jme.defineProp('playlists', {
		writable: false,
		get: function(elem){
			var data = $.jme.data(elem);

			if(elem != data.player[0]){return null;}
			if(!data.playlists){
				data.playlists = new PlaylistList(data);
			}
			return data.playlists;
		}
	});

	jme.defineMethod('addPlaylist', function(list, options){
		var playlists = $.jme.prop(this, 'playlists');
		if(playlists && playlists.add){
			return playlists.add(list, options);
		}
		return null;
	});

	[
		{name: 'playlist-prev', text: 'previous', get: 'getPrev', play: 'playPrev'},
		{name: 'playlist-next', text: 'next', get: 'getNext', play: 'playNext'}
	]
		.forEach(function(desc){
			$.jme.registerPlugin(desc.name, {
				structure: btnStructure,
				text: desc.text,
				_create: function(control, media, base){
					var cList;
					var playlists = base.jmeProp('playlists');

					function itemChange(){
						var item = cList[desc.get]();
						if(item){
							control.prop({'disabled': false, title: item.title});
						} else {
							control.prop({'disabled': true, title: ''});
						}
					}

					function listchange(){
						var newClist = playlists.getShowcontrolsList();
						if(newClist != cList){
							if(cList){
								cList.off('itemchange', itemChange);
							}
							cList = newClist;
							if(cList){
								cList.on('itemchange', itemChange);
								itemChange();
							}
						}
					}

					control.on('click', function(){
						if(cList){
							cList[desc.play]();
						}
					});

					playlists.on({
						'addlist removelist showcontrolschange':listchange
					});
					listchange();
				}
			});
		})
	;


	// Simple JavaScript Templating
	(function() {
		var cache = {};
		$.jme.tmpl = function tmpl(str, data) {
			// Figure out if we're getting a template, or if we need to
			// load the template - and be sure to cache the result.
			if(!cache[str]){
				cache[str] = new Function("obj",
						"var p=[],print=function(){p.push.apply(p,arguments);};" +

							// Introduce the data as local variables using with(){}
							"with(obj){p.push('" +

							// Convert the template into pure JavaScript
							str.replace(/[\r\t\n]/g, " ")
								.replace(/'(?=[^%]*%>)/g,"\t")
								.split("'").join("\\'")
								.split("\t").join("'")
								.replace(/<%=(.+?)%>/g, "',$1,'")
								.split("<%").join("');")
								.split("%>").join("p.push('")
							+ "');}return p.join('');");
			}

			// Provide some basic currying to the user
			return data ? cache[str](data) : cache[str];
		};
	})();
	$.jme.Playlist = Playlist;
	webshims.isReady('playlist', true);
});
