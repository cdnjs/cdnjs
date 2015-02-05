webshims.ready('jme-base DOM', function(){
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
