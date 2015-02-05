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
