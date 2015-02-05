webshims.register('mediacontrols', function($, webshims, window){
	"use strict";
	var pseudoClasses = 'pseudoClasses';

	var options = webshims.cfg.mediaelement.jme;
	var baseSelector = options.selector;
	var jme = $.jme;
	var unknowStructure = '<div class="{%class%}"></div>'
	var btnStructure = '<button class="{%class%}" type="button" aria-label="{%text%}"></button>';
	var slideStructure = '<div class="{%class%} media-range"></div>';
	var timeStructure = '<div  class="{%class%}">00:00</div>';

	var noVolumeClass = (function(){
		var audio;
		var ret = '';

		if(window.Audio){
			try {
				audio = new Audio();
				audio.volume = 0.55;
				ret = ﻿((Math.round(audio.volume * 100) / 100) == 0.55) ? '' : ' no-volume-api';
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
							plugin.structure = unknowStructure;
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
						var lastSize;
						var sizes = [
							{size: 290, name: 'xx-small'},
							{size: 380, name: 'x-small'},
							{size: 490, name: 'small'},
							{size: 756, name: 'medium'},
							{size: 1024, name: 'large'}
						];

						var len = sizes.length;
						return function(){
							var size = 'x-large';
							var i = 0;
							var width = data.player.outerWidth();
							var fSize = Math.max(parseInt(data.player.css('fontSize'), 10) || 16, 13);

							width = width *  (16 / fSize);
							for(; i < len; i++){
								if(sizes[i].size >= width){
									size = sizes[i].name;
									break;
								}
							}

							if(lastSize != size){
								lastSize = size;
								data.player.attr('data-playersize', size);
							}
						};
					})();
					var posterState = (function(){
						var lastPosterState, lastYoutubeState;
						var hasFlash = window.swfmini && swfmini.hasFlashPlayerVersion('10.0.3');
						var regYt = /youtube\.com\/[watch\?|v\/]+/i;
						return function(){
							var hasPoster = !!data.media.attr('poster');
							var hasYt = (hasFlash && hasPoster) ? false : regYt.test(data.media.prop('currentSrc') || '');
							if(lastPosterState !== hasPoster){
								lastPosterState = hasPoster;
								data.player[hasPoster ? 'removeClass' : 'addClass']('no-poster');
							}

							if(lastYoutubeState !== hasYt){
								lastYoutubeState = hasYt;
								data.player[hasYt ? 'addClass' : 'removeClass']('has-ytposter');
							}
						};
					})();


					userActivity._create(data.player, data.media, data.player);

					data.media.on('emptied', posterState);

					playerSize();
					posterState();
					webshims.ready('dom-support', function(){
						data.player.onWSOff('updateshadowdom', playerSize);
						controls.add(data._controlbar).addClass(webshims.shadowClass);
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

		_create: lazyLoadPlugin()
	});

	jme.registerPlugin('time-slider', {
		structure: slideStructure,

		options: {
			format: ['mm', 'ss']
		},
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


	jme.registerPlugin('captions', {
		structure: btnStructure,
		text: 'subtitles',
		_create: function(control, media, base){
			var trackElems = media.find('track');
			control.wsclonedcheckbox = $(control).clone().attr({role: 'checkbox'}).insertBefore(control);
			base.attr('data-tracks', trackElems.length > 1 ? 'many' : trackElems.length);
			control.attr('aria-haspopup', 'true');
			lazyLoadPlugin().apply(this, arguments);
		}
	});

	webshims.ready(webshims.cfg.mediaelement.plugins.concat(['mediaelement']), function(){
		if(!options.barTemplate){
			options.barTemplate = '<div class="play-pause-container">{{play-pause}}</div><div class="playlist-container"><div class="playlist-box">{{playlist-prev}}{{playlist-next}}</div></div><div class="currenttime-container">{{currenttime-display}}</div><div class="progress-container">{{time-slider}}</div><div class="duration-container">{{duration-display}}</div><div class="mute-container">{{mute-unmute}}</div><div class="volume-container">{{volume-slider}}</div><div class="subtitle-container"><div class="subtitle-controls">{{captions}}</div></div><div class="fullscreen-container">{{fullscreen}}</div>';
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
