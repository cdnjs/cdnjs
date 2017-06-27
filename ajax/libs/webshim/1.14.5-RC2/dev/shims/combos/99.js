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
	var ios6 = /iP(hone|od|ad)/i.test(navigator.platform) && parseInt(((navigator.appVersion).match(/OS (\d+)_\d+/) || ['','8'])[1], 10) < 7;
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
		src: 'jme/mediacontrols-lazy'
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
						var lastPosterState, lastYoutubeState, lastPoster;
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
						data.media.on('play playing waiting seeked seeking timeupdate', function(){
							if(isInitial){
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
							var poster = data.media.attr('poster');
							var hasPoster = !!poster;
							var currentSrc = data.media.prop('currentSrc') || '';
							var isYt = regYt.test(currentSrc);
							var hasYt = (hasFlash && hasPoster) ? false : isYt;

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
