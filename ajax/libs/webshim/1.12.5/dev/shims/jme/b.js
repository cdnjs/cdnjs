webshims.register('jme', function($, webshims, window, doc, undefined, options){
	"use strict";
	var props = {};

	var fns = {};
	var allowPreload = false;
	$(window).on('load', function(){
		allowPreload = true;
		var scrollTimer;
		var allow = function(){
			allowPreload = true;
		};
		$(window).on('scroll', function(){
			allowPreload = false;
			clearTimeout(scrollTimer);
			scrollTimer = setTimeout(allow, 999);
		});
	});



	$.jme = {
		version: '2.0.9',
		classNS: '',
		options: {},
		plugins: {},
		data: function(elem, name, value){
			var data = $(elem).data(ns+'jme') || $.data(elem, ns+'jme', {});
			if(value === undefined){
				return (name) ? data[name] : data;
			} else {
				data[name] = value;
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
		},
		setText: function(name, text){
			var obj = name;
			if(name && text){
				obj = {};
				obj[name] = text;
			}
			$.each(obj, function(name, text){
				if($.jme.plugins[name]){
					$.jme.plugins[name].text = text;
				}
			});
		}
	};

	$.fn.jmeProp = function(name, value){
		return $.access( this, $.jme.prop, name, value, arguments.length > 1 );
	};

	$.fn.jmeFn = function(fn){
		var args = Array.prototype.slice.call( arguments, 1 );
		var ret;
		this.each(function(){
			ret = (fns[fn] || $.prop(this, fn)).apply(this, args);
			if(ret !== undefined){
				return false;
			}
		});
		return (ret !== undefined) ? ret : this;
	};


	options = $.extend({selector: '.mediaplayer'}, webshims.cfg.mediaelement.jme);
	webshims.cfg.mediaelement.jme = options;
	var baseSelector = options.selector;
	var pluginSelectors = [];
	var ns = '';


	$.jme.initJME = function(context, insertedElement){
		$(baseSelector, context).add(insertedElement.filter(baseSelector)).jmePlayer();
	};

	var idlStates = {
		emptied: 1,
		pause: 1
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

	webshims.ready('dom-support', function(){
		if($('<input />').prop('labels')){return;}
		webshims.defineNodeNamesProperty('button, input, keygen, meter, output, progress, select, textarea', 'labels', {
			prop: {
				get: function(){
					var labels = [];
					var id = this.id;
					if(id){
						labels = $('label[for="'+ id +'"]');
					}
					if(!labels[0]) {
						labels = $(this).closest('label', this.form);
					}
					return labels.get();
				},
				writeable: false
			}
		});
	});


	$.jme.getButtonText = function(button, classes){

		var btnTextElem = $('span.jme-text, +label span.jme-text', button);
		var btnLabelElem = button.prop('labels');

		btnLabelElem = (btnLabelElem && btnLabelElem[0]) ? $(btnLabelElem).eq(0) : false;

		if(!btnTextElem[0]){
			btnTextElem = btnLabelElem || button;
		}

		var txt = btnTextElem.text().split('/');
		var title = button.prop('title').split('/');

		var isCheckbox;
		var doText;
		var doTitle;
		var lastState;
		var txtChangeFn = function(state){
			if(lastState === state){return;}
			lastState = state;
			if(doText){
				btnTextElem.text(txt[state || 0]);
			}
			if(doTitle){
				button.prop('title', txt[state || 0]);
				if (btnLabelElem) {
					btnLabelElem.prop('title', txt[state || 0]);
				}
			}

			if(classes){
				button
					.removeClass(classes[(state) ? 0 : 1])
					.addClass(classes[state])
				;
			}
			if(isCheckbox){
				button.prop('checked', !!state);
				(button.data('checkboxradio') || {refresh: $.noop}).refresh();
			}
		};

		if(txt.length == 2){
			txt[0] = txt[0].trim();
			txt[1] = txt[1].trim();
			doText = true;
		}
		if(title.length == 2){
			title[0] = title[0].trim();
			title[1] = title[1].trim();
			doTitle = true;
		}

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
			if(opts){
				$.jme.data(this, $.extend(true, {}, opts));
			}

			var mediaUpdateFn, init, canPlay, removeCanPlay, canplayTimer, needPreload, playerSize;
			var media = $('audio, video', this).filter(':first');
			var base = $(this);

			var jmeData = $.jme.data(this);
			var mediaData = $.jme.data(media[0]);


			base.addClass(media.prop('nodeName').toLowerCase()+'player');
			mediaData.player = base;
			mediaData.media = media;
			if(!jmeData.media){
				init = true;
				needPreload = !media.prop('autoplay');

				removeCanPlay = function(){
					media.off('canplay', canPlay);
					clearTimeout(canplayTimer);
				};
				canPlay = function(){
					var state = ($.prop(this, 'paused')) ? 'idle' : 'playing';
					base.attr('data-state', state);
				};
				mediaUpdateFn = function(e){
					var state = e.type;
					var readyState;
					var paused;

					removeCanPlay();

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
						base.attr('data-state', state);
					}
				};

				playerSize = (function(){
					var lastSize;
					var sizes = [
						{size: 380, name: 'x-small'},
						{size: 490, name: 'small'},
						{size: 756, name: 'medium'},
						{size: 1024, name: 'large'}
					];

					var len = sizes.length;
					return function(){
						var size = 'x-large';
						var i = 0;
						var width = base.outerWidth();
						for(; i < len; i++){
							if(sizes[i].size >= width){
								size = sizes[i].name;
								break;
							}
						}
						if(lastSize != size){
							lastSize = size;
							base.attr('data-playersize', size);
						}
					};
				})();
				jmeData.media = media;
				jmeData.player = base;
				media
					.on('ended', function(){
						removeCanPlay();
						media.jmeFn('pause');
						if(!media.prop('autoplay') && !media.prop('loop') && !media.hasClass('no-reload')){
							media.jmeFn('load');
						}
					})
					.on('emptied waiting canplay canplaythrough playing ended pause mediaerror', mediaUpdateFn)
					.on('volumechange updateJMEState', function(){
						var volume = $.prop(this, 'volume');
						base[!volume || $.prop(this, 'muted') ? 'addClass' : 'removeClass'](ns +'state-muted');

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
					.on('emptied', function(e){
						if(e.type == 'emptied'){
							needPreload = !media.prop('autoplay');
						}
					})
				;

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

				playerSize();
				webshims.ready('dom-support', function(){
					base.onWSOff('updateshadowdom', playerSize);
					webshims.addShadowDom();
				});
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
				var src = {
					src: $.prop(source, 'src')
				};
				var tmp = $.attr(source, 'media');
				if(tmp){
					src.media = tmp;
				}
				tmp = $.attr(source, 'type');
				if(tmp){
					src.type = tmp;
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
		$.each($.jme.plugins, function(name, plugin){
			controls
				.filter('.'+plugin.className)
				.add(controls.find('.'+plugin.className))
				.each(function(){
					var control = $(this);
					var options = $.jme.data(this);
					options.player = data.player;
					options.media = data.media;
					if(options.rendered){return;}
					options.rendered = true;
					if(plugin.options){
						$.each(plugin.options, function(option, value){
							if(!(option in options)){
								options[option] = value;
							}
						});
					}
					plugin._create(control, data.media, data.player, options);
					control = null;
				})
			;
		});

		$.jme.data(data.player[0], 'controlElements', oldControls.add(controls));

		data.player.triggerHandler('controlsadded');
	});




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


	webshims.ready('mediaelement', function(){
		webshims.addReady($.jme.initJME);
	});
});



