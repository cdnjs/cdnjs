webshims.register('mediacontrols', function($, webshims, window){
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
