webshims.register('jme', function($, webshims, window, doc, undefined){
	"use strict";
	var props = {};
	var fns = {};
	var slice = Array.prototype.slice;
	var readyLength = 0;
	var options = $.extend({selector: '.mediaplayer'}, webshims.cfg.mediaelement.jme);
	var baseSelector = options.selector;
	
	webshims.cfg.mediaelement.jme = options;


	$.jme = {
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
	};

	$.fn.jmeProp = function(name, value){
		return $.access( this, $.jme.prop, name, value, arguments.length > 1 );
	};

	$.fn.jmeFn = function(fn){
		var args = slice.call( arguments, 1 );
		var ret;
		this.each(function(){
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
			if(opts){
				$.jme.data(this, $.extend(true, {}, opts));
			}

			var mediaUpdateFn, canPlay, removeCanPlay, canplayTimer, lastState, stopEmptiedEvent;
			var media = $('audio, video', this).eq(0);
			var base = $(this);

			var jmeData = $.jme.data(this);
			var mediaData = $.jme.data(media[0]);


			base.addClass(media.prop('nodeName').toLowerCase()+'player');
			mediaData.player = base;
			mediaData.media = media;
			if(!jmeData.media){

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
					}
				};


				jmeData.media = media;
				jmeData.player = base;
				media
					.on('ended emptied play', (function(){
						var timer;
						var releaseEmptied = function(){
							stopEmptiedEvent = false;
						};
						var ended = function(){
							removeCanPlay();
							media.jmeFn('pause');
							if(!options.noReload && media.prop('ended') && media.prop('paused') && !media.prop('autoplay') && !media.prop('loop') && !media.hasClass('no-reload')){
								stopEmptiedEvent = true;
								media.jmeFn('load');
								base.attr('data-state', 'ended');
								setTimeout(releaseEmptied);

							}
						};
						return function(e){

							clearTimeout(timer);
							if(e.type == 'ended' && !options.noReload && !media.prop('autoplay') && !media.prop('loop') && !media.hasClass('no-reload')){
								timer = setTimeout(ended);
							}
						};
					})())
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
	webshims.isReady('jme', true);
	webshims.addReady($.jme.initJME);
	webshims._polyfill(['mediaelement']);
	webshims.isReady('jme-base', true);

	if(webshims.cfg.debug !== false){
		$(function(){
			if(document.getElementsByTagName('video').length && !document.querySelector(baseSelector)){
				webshims.warn("found video element but video wasn't wrapped inside a ."+ baseSelector +" element. Will not add control UI");
			}
		});
	}
});
;webshims.ready('jme DOM', function(){
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
