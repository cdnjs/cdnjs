/*!
 * elFinder - file manager for web
 * Version 2.1.12 (2016-05-30)
 * http://elfinder.org
 * 
 * Copyright 2009-2016, Studio 42
 * Licensed under a 3-clauses BSD license
 */
(function($) {


/*
 * File: /js/elFinder.js
 */

/**
 * @class elFinder - file manager for web
 *
 * @author Dmitry (dio) Levashov
 **/
window.elFinder = function(node, opts) {
	//this.time('load');
	
	var self = this,
		
		/**
		 * Node on which elfinder creating
		 *
		 * @type jQuery
		 **/
		node = $(node),
		
		/**
		 * Store node contents.
		 *
		 * @see this.destroy
		 * @type jQuery
		 **/
		prevContent = $('<div/>').append(node.contents()),
		
		/**
		 * Store node inline styles
		 *
		 * @see this.destroy
		 * @type String
		 **/
		prevStyle = node.attr('style'),
		
		/**
		 * Instance ID. Required to get/set cookie
		 *
		 * @type String
		 **/
		id = node.attr('id') || '',
		
		/**
		 * Events namespace
		 *
		 * @type String
		 **/
		namespace = 'elfinder-'+(id || Math.random().toString().substr(2, 7)),
		
		/**
		 * Mousedown event
		 *
		 * @type String
		 **/
		mousedown = 'mousedown.'+namespace,
		
		/**
		 * Keydown event
		 *
		 * @type String
		 **/
		keydown = 'keydown.'+namespace,
		
		/**
		 * Keypress event
		 *
		 * @type String
		 **/
		keypress = 'keypress.'+namespace,
		
		/**
		 * Is shortcuts/commands enabled
		 *
		 * @type Boolean
		 **/
		enabled = true,
		
		/**
		 * Store enabled value before ajax requiest
		 *
		 * @type Boolean
		 **/
		prevEnabled = true,
		
		/**
		 * List of build-in events which mapped into methods with same names
		 *
		 * @type Array
		 **/
		events = ['enable', 'disable', 'load', 'open', 'reload', 'select',  'add', 'remove', 'change', 'dblclick', 'getfile', 'lockfiles', 'unlockfiles', 'dragstart', 'dragstop'],
		
		/**
		 * Rules to validate data from backend
		 *
		 * @type Object
		 **/
		rules = {},
		
		/**
		 * Current working directory hash
		 *
		 * @type String
		 **/
		cwd = '',
		
		/**
		 * Current working directory options
		 *
		 * @type Object
		 **/
		cwdOptions = {
			path          : '',
			url           : '',
			tmbUrl        : '',
			disabled      : [],
			separator     : '/',
			archives      : [],
			extract       : [],
			copyOverwrite : true,
			uploadOverwrite : true,
			uploadMaxSize : 0,
			jpgQuality    : 100,
			tmb           : false // old API
		},
		
		/**
		 * Files/dirs cache
		 *
		 * @type Object
		 **/
		files = {},
		
		/**
		 * Selected files hashes
		 *
		 * @type Array
		 **/
		selected = [],
		
		/**
		 * Events listeners
		 *
		 * @type Object
		 **/
		listeners = {},
		
		/**
		 * Shortcuts
		 *
		 * @type Object
		 **/
		shortcuts = {},
		
		/**
		 * Buffer for copied files
		 *
		 * @type Array
		 **/
		clipboard = [],
		
		/**
		 * Copied/cuted files hashes
		 * Prevent from remove its from cache.
		 * Required for dispaly correct files names in error messages
		 *
		 * @type Array
		 **/
		remember = [],
		
		/**
		 * Queue for 'open' requests
		 *
		 * @type Array
		 **/
		queue = [],
		
		/**
		 * Commands prototype
		 *
		 * @type Object
		 **/
		base = new self.command(self),
		
		/**
		 * elFinder node width
		 *
		 * @type String
		 * @default "auto"
		 **/
		width  = 'auto',
		
		/**
		 * elFinder node height
		 *
		 * @type Number
		 * @default 400
		 **/
		height = 400,
		
		/**
		 * elfinder path for sound played on remove
		 * @type String
		 * @default ./sounds/
		 **/
		soundPath = './sounds/',
				
		beeper = $(document.createElement('audio')).hide().appendTo('body')[0],
			
		syncInterval,
		
		uiCmdMapPrev = '',
		
		open = function(data) {
			var volumeid, contextmenu, emptyDirs = {}, stayDirs = {};
			
			if (self.api >= 2.1) {
				self.commandMap = (data.options.uiCmdMap && Object.keys(data.options.uiCmdMap).length)? data.options.uiCmdMap : {};
				
				// support volume driver option `uiCmdMap`
				if (uiCmdMapPrev !== JSON.stringify(self.commandMap)) {
					uiCmdMapPrev = JSON.stringify(self.commandMap);
					if (Object.keys(self.commandMap).length) {
						// for contextmenu
						contextmenu = self.getUI('contextmenu');
						if (!contextmenu.data('cmdMaps')) {
							contextmenu.data('cmdMaps', {});
						}
						volumeid = data.cwd? data.cwd.volumeid : null;
						if (volumeid && !contextmenu.data('cmdMaps')[volumeid]) {
							contextmenu.data('cmdMaps')[volumeid] = self.commandMap;
						}
					}
				}
			} else {
				self.options.sync = 0;
			}
			
			if (data.init) {
				// init - reset cache
				files = {};
			} else {
				// remove only files from prev cwd
				// and collapsed directory (included 100+ directories) to empty for perfomance tune in DnD
				$.each(Object.keys(files), function(n, i) {
					var isDir = (files[i].mime === 'directory'),
						phash = files[i].phash,
						collapsed = self.res('class', 'navcollapse'),
						pnav;
					if (
						(!isDir
							|| emptyDirs[phash]
							|| (!stayDirs[phash]
								&& $('#'+self.navHash2Id(files[i].hash)).is(':hidden')
								&& $('#'+self.navHash2Id(phash)).next('.elfinder-navbar-subtree').children().length > 100
							)
						)
						&& (isDir || phash === cwd)
						&& $.inArray(i, remember) === -1
					) {
						if (isDir && !emptyDirs[phash]) {
							emptyDirs[phash] = true;
						}
						delete files[i];
					} else if (isDir) {
						stayDirs[phash] = true;
					}
				});
				$.each(Object.keys(emptyDirs), function(n, i) {
					var rmClass = 'elfinder-subtree-loaded ' + self.res('class', 'navexpand');
					$('#'+self.navHash2Id(i))
					 .removeClass(rmClass)
					 .next('.elfinder-navbar-subtree').empty();
				});
			}

			cwd = data.cwd.hash;
			cache(data.files);
			if (!files[cwd]) {
				cache([data.cwd]);
			}
			self.lastDir(cwd);
			
			self.autoSync();
		},
		
		/**
		 * Store info about files/dirs in "files" object.
		 *
		 * @param  Array  files
		 * @return void
		 **/
		cache = function(data) {
			var l = data.length, f, i;

			for (i = 0; i < l; i++) {
				f = data[i];
				if (f.name && f.hash && f.mime) {
					if (!f.phash) {
						var name = 'volume_'+f.name,
							i18 = self.i18n(name);

						if (name != i18) {
							f.i18 = i18;
						}
						
						// set disabledCmds, tmbUrls for each volume
						if (f.volumeid) {
							f.disabled && (self.disabledCmds[f.volumeid] = f.disabled);
							if (f.tmbUrl) {
								self.tmbUrls[f.volumeid] = f.tmbUrl;
							}
							self.roots[f.volumeid] = f.hash;
						}
					}
					files[f.hash] = f;
				} 
			}
		},
		
		/**
		 * Exec shortcut
		 *
		 * @param  jQuery.Event  keydown/keypress event
		 * @return void
		 */
		execShortcut = function(e) {
			var code    = e.keyCode,
				ctrlKey = !!(e.ctrlKey || e.metaKey);

			if (enabled) {

				$.each(shortcuts, function(i, shortcut) {
					if (shortcut.type    == e.type 
					&& shortcut.keyCode  == code 
					&& shortcut.shiftKey == e.shiftKey 
					&& shortcut.ctrlKey  == ctrlKey 
					&& shortcut.altKey   == e.altKey) {
						e.preventDefault()
						e.stopPropagation();
						shortcut.callback(e, self);
						self.debug('shortcut-exec', i+' : '+shortcut.description);
					}
				});
				
				// prevent tab out of elfinder
				if (code == 9 && !$(e.target).is(':input')) {
					e.preventDefault();
				}
				
				// cancel copy or cut by [Esc] key
				if (code == 27 && self.clipboard().length) {
					self.clipboard([]);
				}

			}
		},
		date = new Date(),
		utc,
		i18n
		;


	/**
	 * Protocol version
	 *
	 * @type String
	 **/
	this.api = null;
	
	/**
	 * elFinder use new api
	 *
	 * @type Boolean
	 **/
	this.newAPI = false;
	
	/**
	 * elFinder use old api
	 *
	 * @type Boolean
	 **/
	this.oldAPI = false;
	
	/**
	 * Net drivers names
	 *
	 * @type Array
	 **/
	this.netDrivers = [];
	/**
	 * User os. Required to bind native shortcuts for open/rename
	 *
	 * @type String
	 **/
	this.OS = navigator.userAgent.indexOf('Mac') !== -1 ? 'mac' : navigator.userAgent.indexOf('Win') !== -1  ? 'win' : 'other';
	
	/**
	 * User browser UA.
	 * jQuery.browser: version deprecated: 1.3, removed: 1.9
	 *
	 * @type Object
	 **/
	this.UA = (function(){
		var webkit = !document.uniqueID && !window.opera && !window.sidebar && window.localStorage && typeof window.orientation == "undefined";
		return {
			// Browser IE <= IE 6
			ltIE6:typeof window.addEventListener == "undefined" && typeof document.documentElement.style.maxHeight == "undefined",
			// Browser IE <= IE 7
			ltIE7:typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined",
			// Browser IE <= IE 8
			ltIE8:typeof window.addEventListener == "undefined" && typeof document.getElementsByClassName == "undefined",
			IE:document.uniqueID,
			Firefox:window.sidebar,
			Opera:window.opera,
			Webkit:webkit,
			Chrome:webkit && window.chrome,
			Safari:webkit && !window.chrome,
			Mobile:typeof window.orientation != "undefined",
			Touch:typeof window.ontouchstart != "undefined",
			iOS: navigator.platform.match(/^iP(?:[ao]d|hone)/)
		};
	})();
	
	/**
	 * Configuration options
	 *
	 * @type Object
	 **/
	this.options = $.extend(true, {}, this._options, opts||{});
	
	if (opts.ui) {
		this.options.ui = opts.ui;
	}
	
	if (opts.commands) {
		this.options.commands = opts.commands;
	}
	
	if (opts.uiOptions && opts.uiOptions.toolbar) {
		this.options.uiOptions.toolbar = opts.uiOptions.toolbar;
	}

	if (opts.uiOptions && opts.uiOptions.cwd && opts.uiOptions.cwd.listView && opts.uiOptions.cwd.listView.columns) {
		this.options.uiOptions.cwd.listView.columns = opts.uiOptions.cwd.listView.columns;
	}
	if (opts.uiOptions && opts.uiOptions.cwd && opts.uiOptions.cwd.listView && opts.uiOptions.cwd.listView.columnsCustomName) {
		this.options.uiOptions.cwd.listView.columnsCustomName = opts.uiOptions.cwd.listView.columnsCustomName;
	}

	if (! this.options.enableAlways && $('body').children().length === 2) { // only node and beeper
		this.options.enableAlways = true;
	}

	// configure for CORS
	(function(){
		var parseUrl = document.createElement('a'),
			parseUploadUrl;
		parseUrl.href = opts.url;
		if (opts.urlUpload && (opts.urlUpload !== opts.url)) {
			parseUploadUrl = document.createElement('a');
			parseUploadUrl.href = opts.urlUpload;
		}
		if (window.location.host !== parseUrl.host || (parseUploadUrl && (window.location.host !== parseUploadUrl.host))) {
			if (!$.isPlainObject(self.options.customHeaders)) {
				self.options.customHeaders = {};
			}
			if (!$.isPlainObject(self.options.xhrFields)) {
				self.options.xhrFields = {};
			}
			self.options.requestType = 'post';
			self.options.customHeaders['X-Requested-With'] = 'XMLHttpRequest';
			self.options.xhrFields['withCredentials'] = true;
		}
	})();

	$.extend(this.options.contextmenu, opts.contextmenu);
	
	/**
	 * Ajax request type
	 *
	 * @type String
	 * @default "get"
	 **/
	this.requestType = /^(get|post)$/i.test(this.options.requestType) ? this.options.requestType.toLowerCase() : 'get',
	
	/**
	 * Any data to send across every ajax request
	 *
	 * @type Object
	 * @default {}
	 **/
	this.customData = $.isPlainObject(this.options.customData) ? this.options.customData : {};

	/**
	 * Any custom headers to send across every ajax request
	 *
	 * @type Object
	 * @default {}
	*/
	this.customHeaders = $.isPlainObject(this.options.customHeaders) ? this.options.customHeaders : {};

	/**
	 * Any custom xhrFields to send across every ajax request
	 *
	 * @type Object
	 * @default {}
	 */
	this.xhrFields = $.isPlainObject(this.options.xhrFields) ? this.options.xhrFields : {};

	/**
	 * ID. Required to create unique cookie name
	 *
	 * @type String
	 **/
	this.id = id;
	
	/**
	 * ui.nav id prefix
	 * 
	 * @type String
	 */
	this.navPrefix = 'nav' + (elFinder.prototype.uniqueid? elFinder.prototype.uniqueid : '') + '-';
	
	/**
	 * ui.cwd id prefix
	 * 
	 * @type String
	 */
	this.cwdPrefix = elFinder.prototype.uniqueid? ('cwd' + elFinder.prototype.uniqueid + '-') : '';
	
	// Increment elFinder.prototype.uniqueid
	++elFinder.prototype.uniqueid;
	
	/**
	 * URL to upload files
	 *
	 * @type String
	 **/
	this.uploadURL = opts.urlUpload || opts.url;
	
	/**
	 * Events namespace
	 *
	 * @type String
	 **/
	this.namespace = namespace;

	/**
	 * Interface language
	 *
	 * @type String
	 * @default "en"
	 **/
	this.lang = this.i18[this.options.lang] && this.i18[this.options.lang].messages ? this.options.lang : 'en';
	
	i18n = this.lang == 'en' 
		? this.i18['en'] 
		: $.extend(true, {}, this.i18['en'], this.i18[this.lang]);
	
	/**
	 * Interface direction
	 *
	 * @type String
	 * @default "ltr"
	 **/
	this.direction = i18n.direction;
	
	/**
	 * i18 messages
	 *
	 * @type Object
	 **/
	this.messages = i18n.messages;
	
	/**
	 * Date/time format
	 *
	 * @type String
	 * @default "m.d.Y"
	 **/
	this.dateFormat = this.options.dateFormat || i18n.dateFormat;
	
	/**
	 * Date format like "Yesterday 10:20:12"
	 *
	 * @type String
	 * @default "{day} {time}"
	 **/
	this.fancyFormat = this.options.fancyDateFormat || i18n.fancyDateFormat;

	/**
	 * Today timestamp
	 *
	 * @type Number
	 **/
	this.today = (new Date(date.getFullYear(), date.getMonth(), date.getDate())).getTime()/1000;
	
	/**
	 * Yesterday timestamp
	 *
	 * @type Number
	 **/
	this.yesterday = this.today - 86400;
	
	utc = this.options.UTCDate ? 'UTC' : '';
	
	this.getHours    = 'get'+utc+'Hours';
	this.getMinutes  = 'get'+utc+'Minutes';
	this.getSeconds  = 'get'+utc+'Seconds';
	this.getDate     = 'get'+utc+'Date';
	this.getDay      = 'get'+utc+'Day';
	this.getMonth    = 'get'+utc+'Month';
	this.getFullYear = 'get'+utc+'FullYear';
	
	/**
	 * Css classes 
	 *
	 * @type String
	 **/
	this.cssClass = 'ui-helper-reset ui-helper-clearfix ui-widget ui-widget-content ui-corner-all elfinder elfinder-'
			+(this.direction == 'rtl' ? 'rtl' : 'ltr')
			+(this.UA.Touch? ' elfinder-touch' : '')
			+(this.UA.Mobile? ' elfinder-mobile' : '')
			+' '+this.options.cssClass;

	/**
	 * elFinder node z-index (auto detect on elFinder load)
	 *
	 * @type null | Number
	 **/
	this.zIndex;

	/**
	 * Current search status
	 * 
	 * @type Object
	 */
	this.searchStatus = {
		state  : 0, // 0: search ended, 1: search started, 2: in search result
		query  : '',
		target : '',
		mime   : ''
	};

	/**
	 * Method to store/fetch data
	 *
	 * @type Function
	 **/
	this.storage = (function() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null ? self.localStorage : self.cookie;
		} catch (e) {
			return self.cookie;
		}
	})();

	this.viewType = this.storage('view') || this.options.defaultView || 'icons';

	this.sortType = this.storage('sortType') || this.options.sortType || 'name';
	
	this.sortOrder = this.storage('sortOrder') || this.options.sortOrder || 'asc';

	this.sortStickFolders = this.storage('sortStickFolders');

	if (this.sortStickFolders === null) {
		this.sortStickFolders = !!this.options.sortStickFolders;
	} else {
		this.sortStickFolders = !!this.sortStickFolders
	}

	this.sortRules = $.extend(true, {}, this._sortRules, this.options.sortRules);
	
	$.each(this.sortRules, function(name, method) {
		if (typeof method != 'function') {
			delete self.sortRules[name];
		} 
	});
	
	this.compare = $.proxy(this.compare, this);
	
	/**
	 * Delay in ms before open notification dialog
	 *
	 * @type Number
	 * @default 500
	 **/
	this.notifyDelay = this.options.notifyDelay > 0 ? parseInt(this.options.notifyDelay) : 500;
	
	/**
	 * Dragging UI Helper object
	 *
	 * @type jQuery | null
	 **/
	this.draggingUiHelper = null,
	
	/**
	 * Base draggable options
	 *
	 * @type Object
	 **/
	this.draggable = {
		appendTo   : 'body',
		addClasses : true,
		distance   : 4,
		revert     : true,
		refreshPositions : false,
		cursor     : 'crosshair',
		cursorAt   : {left : 50, top : 47},
		scroll     : false,
		start      : function(e, ui) {
			var helper   = ui.helper,
				targets  = $.map(helper.data('files')||[], function(h) { return h || null ;}),
				locked   = false,
				navbar   = self.getUI('navbar'),
				cwd      = self.getUI('cwd').parent(),
				autoScr  = {
					navbarUp   : function() {
						navbar.scrollTop(Math.max(0, navbar.scrollTop() - helper.data('autoScrVal')));
					},
					navbarDown : function() {
						navbar.scrollTop(navbar.scrollTop() + helper.data('autoScrVal'));
					},
					cwdUp     : function() {
						cwd.scrollTop(Math.max(0, cwd.scrollTop() - helper.data('autoScrVal')));
					},
					cwdDown   : function() {
						cwd.scrollTop(cwd.scrollTop() + helper.data('autoScrVal'));
					}
				},
				cnt, h, wz, cwdOffset, wzOffset;
			
			self.draggingUiHelper = helper;
			cnt = targets.length;
			while (cnt--) {
				h = targets[cnt];
				if (files[h].locked) {
					locked = true;
					helper.data('locked', true);
					break;
				}
			}
			!locked && self.trigger('lockfiles', {files : targets});

			cwdOffset = cwd.offset();
			wz = self.getUI('workzone');
			wzOffset = wz.offset();
			helper.data('wzpos', {
				ltr : self.direction === 'ltr',
				cwdEdge : (self.direction === 'ltr')? cwdOffset.left : cwdOffset.left + cwd.width(),
				wzTop : wzOffset.top,
				wzBottom : wzOffset.top + wz.height()
			});
			helper.data('autoScrTm', setInterval(function() {
				if (helper.data('autoScr')) {
					autoScr[helper.data('autoScr')]();
				}
			}, 50));
		},
		drag       : function(e, ui) {
			var helper = ui.helper,
				wzpos  = helper.data('wzpos'),
				autoUp;
			
			if ((autoUp = wzpos.wzTop > e.pageY) || wzpos.wzBottom < e.pageY) {
				if (wzpos.cwdEdge > e.pageX) {
					helper.data('autoScr', (wzpos.ltr? 'navbar' : 'cwd') + (autoUp? 'Up' : 'Down'));
				} else {
					helper.data('autoScr', (wzpos.ltr? 'cwd' : 'navbar') + (autoUp? 'Up' : 'Down'));
				}
				helper.data('autoScrVal', Math.pow((autoUp? wzpos.wzTop - e.pageY : e.pageY - wzpos.wzBottom), 1.3));
			} else {
				if (helper.data('autoScr')) {
					helper.data('refreshPositions', 1).data('autoScr', null);
				}
			}
			if (helper.data('refreshPositions') && $(this).elfUiWidgetInstance('draggable')) {
				if (helper.data('refreshPositions') > 0) {
					$(this).draggable('option', { refreshPositions : true, elfRefresh : true });
					helper.data('refreshPositions', -1);
				} else {
					$(this).draggable('option', { refreshPositions : false, elfRefresh : false });
					helper.data('refreshPositions', null);
				}
			}
		},
		stop       : function(e, ui) {
			var helper = ui.helper,
				files;
			
			$(this).elfUiWidgetInstance('draggable') && $(this).draggable('option', { refreshPositions : false });
			self.draggingUiHelper = null;
			self.trigger('focus').trigger('dragstop');
			if (! helper.data('droped')) {
				files = $.map(helper.data('files')||[], function(h) { return h || null ;});
				self.trigger('unlockfiles', {files : files});
				self.trigger('selectfiles', {files : files});
			}
			self.enable();
			
			helper.data('autoScrTm') && clearInterval(helper.data('autoScrTm'));
		},
		helper     : function(e, ui) {
			var element = this.id ? $(this) : $(this).parents('[id]:first'),
				helper  = $('<div class="elfinder-drag-helper"><span class="elfinder-drag-helper-icon-status"/></div>'),
				icon    = function(f) {
					var mime = f.mime, i, tmb = self.tmb(f);
					i = '<div class="elfinder-cwd-icon '+self.mime2class(mime)+' ui-corner-all"/>';
					if (tmb) {
						i = $(i).addClass(tmb.className).css('background-image', "url('"+tmb.url+"')").get(0).outerHTML;
					}
					return i;
				},
				hashes, l, ctr;
			
			self.draggingUiHelper && self.draggingUiHelper.stop(true, true);
			
			self.trigger('dragstart', {target : element[0], originalEvent : e});
			
			hashes = element.hasClass(self.res('class', 'cwdfile')) 
				? self.selected() 
				: [self.navId2Hash(element.attr('id'))];
			
			helper.append(icon(files[hashes[0]])).data('files', hashes).data('locked', false).data('droped', false).data('namespace', namespace).data('dropover', 0);

			if ((l = hashes.length) > 1) {
				helper.append(icon(files[hashes[l-1]]) + '<span class="elfinder-drag-num">'+l+'</span>');
			}
			
			$(document).on(keydown + ' keyup.' + namespace, function(e){
				var chk = (e.shiftKey||e.ctrlKey||e.metaKey);
				if (ctr !== chk) {
					ctr = chk;
					if (helper.is(':visible') && helper.data('dropover') && ! helper.data('droped')) {
						helper.toggleClass('elfinder-drag-helper-plus', helper.data('locked')? true : ctr);
						self.trigger(ctr? 'unlockfiles' : 'lockfiles', {files : hashes, helper: helper});
					}
				}
			});
			
			return helper;
		}
	};
	
	/**
	 * Base droppable options
	 *
	 * @type Object
	 **/
	this.droppable = {
			greedy     : true,
			tolerance  : 'pointer',
			accept     : '.elfinder-cwd-file-wrapper,.elfinder-navbar-dir,.elfinder-cwd-file,.elfinder-cwd-filename',
			hoverClass : this.res('class', 'adroppable'),
			classes    : { // Deprecated hoverClass jQueryUI>=1.12.0
				'ui-droppable-hover': this.res('class', 'adroppable')
			},
			autoDisable: true, // elFinder original, see jquery.elfinder.js
			drop : function(e, ui) {
				var dst     = $(this),
					targets = $.map(ui.helper.data('files')||[], function(h) { return h || null }),
					result  = [],
					dups    = [],
					faults  = [],
					isCopy  = ui.helper.hasClass('elfinder-drag-helper-plus'),
					c       = 'class',
					cnt, hash, i, h;
				
				if (ui.helper.data('namespace') !== namespace || ! self.insideWorkzone(e.pageX, e.pageY)) {
					return false;
				}
				if (dst.hasClass(self.res(c, 'cwdfile'))) {
					hash = self.cwdId2Hash(dst.attr('id'));
				} else if (dst.hasClass(self.res(c, 'navdir'))) {
					hash = self.navId2Hash(dst.attr('id'));
				} else {
					hash = cwd;
				}

				cnt = targets.length;
				
				while (cnt--) {
					h = targets[cnt];
					// ignore drop into itself or in own location
					if (h != hash && files[h].phash != hash) {
						result.push(h);
					} else {
						((isCopy && h !== hash && files[hash].write)? dups : faults).push(h);
					}
				}
				
				if (faults.length) {
					return false;
				}
				
				ui.helper.data('droped', true);
				
				if (dups.length) {
					ui.helper.hide();
					self.exec('duplicate', dups);
				}
				
				if (result.length) {
					ui.helper.hide();
					self.clipboard(result, !isCopy);
					self.exec('paste', hash, void 0, hash).always(function(){
						self.trigger('unlockfiles', {files : targets});
					});
					self.trigger('drop', {files : targets});
				}
			}
		};
	
	/**
	 * Return true if filemanager is active
	 *
	 * @return Boolean
	 **/
	this.enabled = function() {
		return node.is(':visible') && enabled;
	}
	
	/**
	 * Return true if filemanager is visible
	 *
	 * @return Boolean
	 **/
	this.visible = function() {
		return node.is(':visible');
	}
	
	/**
	 * Return root dir hash for current working directory
	 * 
	 * @return String
	 */
	this.root = function(hash) {
		hash = hash || cwd;
		var dir = files[hash], i;
		
		while (dir && dir.phash) {
			dir = files[dir.phash]
		}
		if (dir) {
			return dir.hash;
		}
		
		$.each(self.roots, function(id, rhash) {
			if (hash.indexOf(id) === 0) {
				dir = rhash;
				return false;
			}
		});
		if (dir) {
			return dir;
		}
		
		while (i in files && files.hasOwnProperty(i)) {
			dir = files[i]
			if (!dir.phash && !dir.mime == 'directory' && dir.read) {
				return dir.hash;
			}
		}
		
		return '';
	}
	
	/**
	 * Return current working directory info
	 * 
	 * @return Object
	 */
	this.cwd = function() {
		return files[cwd] || {};
	}
	
	/**
	 * Return required cwd option
	 * 
	 * @param  String  option name
	 * @return mixed
	 */
	this.option = function(name) {
		return cwdOptions[name]||'';
	}
	
	/**
	 * Return file data from current dir or tree by it's hash
	 * 
	 * @param  String  file hash
	 * @return Object
	 */
	this.file = function(hash) { 
		return files[hash]; 
	};
	
	/**
	 * Return all cached files
	 * 
	 * @return Array
	 */
	this.files = function() {
		return $.extend(true, {}, files);
	}
	
	/**
	 * Return list of file parents hashes include file hash
	 * 
	 * @param  String  file hash
	 * @return Array
	 */
	this.parents = function(hash) {
		var parents = [],
			dir;
		
		while ((dir = this.file(hash))) {
			parents.unshift(dir.hash);
			hash = dir.phash;
		}
		return parents;
	}
	
	this.path2array = function(hash, i18) {
		var file, 
			path = [];
			
		while (hash && (file = files[hash]) && file.hash) {
			path.unshift(i18 && file.i18 ? file.i18 : file.name);
			hash = file.phash;
		}
			
		return path;
	}
	
	/**
	 * Return file path
	 * 
	 * @param  Object  file
	 * @return String
	 */
	this.path = function(hash, i18) { 
		return files[hash] && files[hash].path
			? files[hash].path
			: this.path2array(hash, i18).join(cwdOptions.separator);
	}
	
	/**
	 * Return file url if set
	 * 
	 * @param  String  file hash
	 * @return String
	 */
	this.url = function(hash) {
		var file = files[hash];
		
		if (!file || !file.read) {
			return '';
		}
		
		if (file.url == '1') {
			this.request({
				data : {cmd : 'url', target : hash},
				preventFail : true,
				options: {async: false}
			})
			.done(function(data) {
				file.url = data.url || '';
			})
			.fail(function() {
				file.url = '';
			});
		}
		
		if (file.url) {
			return file.url;
		}
		
		if (cwdOptions.url && file.hash.indexOf(self.cwd().volumeid) === 0) {
			return cwdOptions.url + $.map(this.path2array(hash), function(n) { return encodeURIComponent(n); }).slice(1).join('/')
		}

		var params = $.extend({}, this.customData, {
			cmd: 'file',
			target: file.hash
		});
		if (this.oldAPI) {
			params.cmd = 'open';
			params.current = file.phash;
		}
		return this.options.url + (this.options.url.indexOf('?') === -1 ? '?' : '&') + $.param(params, true);
	}
	
	/**
	 * Convert from relative URL to abstract URL based on current URL
	 * 
	 * @param  String  URL
	 * @return String
	 */
	this.convAbsUrl = function(url) {
		if (url.match(/^http/i)) {
			return url;
		}
		var root = window.location.protocol + '//' + window.location.host,
			reg  = /[^\/]+\/\.\.\//,
			ret;
		if (url.substr(0, 1) === '/') {
			ret = root + url;
		} else {
			ret = root + window.location.pathname + url;
		}
		ret = ret.replace('/./', '/');
		while(reg.test(ret)) {
			ret = ret.replace(reg, '');
		}
		return ret;
	}
	
	/**
	 * Return file url for open in elFinder
	 * 
	 * @param  String  file hash
	 * @param  Boolean for download link
	 * @return String
	 */
	this.openUrl = function(hash, download) {
		var file = files[hash],
			url  = '';
		
		if (!file || !file.read) {
			return '';
		}
		
		if (!download) {
			if (file.url) {
				if (file.url != 1) {
					return file.url;
				}
			} else if (cwdOptions.url && file.hash.indexOf(self.cwd().volumeid) === 0) {
				return cwdOptions.url + $.map(this.path2array(hash), function(n) { return encodeURIComponent(n); }).slice(1).join('/');
			}
		}
		
		url = this.options.url;
		url = url + (url.indexOf('?') === -1 ? '?' : '&')
			+ (this.oldAPI ? 'cmd=open&current='+file.phash : 'cmd=file')
			+ '&target=' + file.hash;
		
		if (download) {
			url += '&download=1';
		}
		
		$.each(this.options.customData, function(key, val) {
			url += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(val);
		});
		
		return url;
	}
	
	/**
	 * Return thumbnail url
	 * 
	 * @param  Object  file object
	 * @return String
	 */
	this.tmb = function(file) {
		var geturl = function(hash){
				var turl = '';
				$.each(self.tmbUrls, function(i, u){
					if (hash.indexOf(i) === 0) {
						turl = self.tmbUrls[i];
						return false;
					}
				});
				return turl;
			},
			tmbUrl = (self.searchStatus.state && file.hash.indexOf(self.cwd().volumeid) !== 0)? geturl(file.hash) : cwdOptions['tmbUrl'],
			cls    = 'elfinder-cwd-bgurl',
			url    = '';

		if ($.isPlainObject(file)) {
			if (tmbUrl === 'self' && file.mime.indexOf('image/') === 0) {
				url = self.openUrl(file.hash);
				cls += ' elfinder-cwd-bgself';
			} else if (tmbUrl && file && file.tmb && file.tmb != 1) {
				url = tmbUrl + file.tmb;
			}
			if (url) {
				return { url: url, className: cls };
			}
		}
		
		return false;
	}
	
	/**
	 * Return selected files hashes
	 *
	 * @return Array
	 **/
	this.selected = function() {
		return selected.slice(0);
	}
	
	/**
	 * Return selected files info
	 * 
	 * @return Array
	 */
	this.selectedFiles = function() {
		return $.map(selected, function(hash) { return files[hash] ? $.extend({}, files[hash]) : null });
	};
	
	/**
	 * Return true if file with required name existsin required folder
	 * 
	 * @param  String  file name
	 * @param  String  parent folder hash
	 * @return Boolean
	 */
	this.fileByName = function(name, phash) {
		var hash;
	
		for (hash in files) {
			if (files.hasOwnProperty(hash) && files[hash].phash == phash && files[hash].name == name) {
				return files[hash];
			}
		}
	};
	
	/**
	 * Valid data for required command based on rules
	 * 
	 * @param  String  command name
	 * @param  Object  cammand's data
	 * @return Boolean
	 */
	this.validResponse = function(cmd, data) {
		return data.error || this.rules[this.rules[cmd] ? cmd : 'defaults'](data);
	}
	
	/**
	 * Return bytes from ini formated size
	 * 
	 * @param  String  ini formated size
	 * @return Integer
	 */
	this.returnBytes = function(val) {
		var last;
		if (isNaN(val)) {
			if (! val) {
				val = '';
			}
			// for ex. 1mb, 1KB
			val = val.replace(/b$/i, '');
			last = val.charAt(val.length - 1).toLowerCase();
			val = val.replace(/[tgmk]$/i, '');
			if (last == 't') {
				val = val * 1024 * 1024 * 1024 * 1024;
			} else if (last == 'g') {
				val = val * 1024 * 1024 * 1024;
			} else if (last == 'm') {
				val = val * 1024 * 1024;
			} else if (last == 'k') {
				val = val * 1024;
			}
			val = isNaN(val)? 0 : parseInt(val);
		} else {
			val = parseInt(val);
			if (val < 1) val = 0;
		}
		return val;
	};
	
	/**
	 * Proccess ajax request.
	 * Fired events :
	 * @todo
	 * @example
	 * @todo
	 * @return $.Deferred
	 */
	this.request = function(options) { 
		var self     = this,
			o        = this.options,
			dfrd     = $.Deferred(),
			// request data
			data     = $.extend({}, o.customData, {mimes : o.onlyMimes}, options.data || options),
			// command name
			cmd      = data.cmd,
			// call default fail callback (display error dialog) ?
			deffail  = !(options.preventDefault || options.preventFail),
			// call default success callback ?
			defdone  = !(options.preventDefault || options.preventDone),
			// options for notify dialog
			notify   = $.extend({}, options.notify),
			// make cancel button
			cancel   = !!options.cancel,
			// do not normalize data - return as is
			raw      = !!options.raw,
			// sync files on request fail
			syncOnFail = options.syncOnFail,
			// open notify dialog timeout
			timeout,
			// request options
			options = $.extend({
				url      : o.url,
				async    : true,
				type     : this.requestType,
				dataType : 'json',
				cache    : false,
				// timeout  : 100,
				data     : data,
				headers  : this.customHeaders,
				xhrFields: this.xhrFields
			}, options.options || {}),
			/**
			 * Default success handler. 
			 * Call default data handlers and fire event with command name.
			 *
			 * @param Object  normalized response data
			 * @return void
			 **/
			done = function(data) {
				data.warning && self.error(data.warning);
				
				cmd == 'open' && open($.extend(true, {}, data));

				// fire some event to update cache/ui
				data.removed && data.removed.length && self.remove(data);
				data.added   && data.added.length   && self.add(data);
				data.changed && data.changed.length && self.change(data);
				
				// fire event with command name
				self.trigger(cmd, data);
				
				// force update content
				data.sync && self.sync();
			},
			/**
			 * Request error handler. Reject dfrd with correct error message.
			 *
			 * @param jqxhr  request object
			 * @param String request status
			 * @return void
			 **/
			error = function(xhr, status) {
				var error;
				
				switch (status) {
					case 'abort':
						error = xhr.quiet ? '' : ['errConnect', 'errAbort'];
						break;
					case 'timeout':	    
						error = ['errConnect', 'errTimeout'];
						break;
					case 'parsererror': 
						error = ['errResponse', 'errDataNotJSON'];
						break;
					default:
						if (xhr.status == 403) {
							error = ['errConnect', 'errAccess'];
						} else if (xhr.status == 404) {
							error = ['errConnect', 'errNotFound'];
						} else {
							error = 'errConnect';
						} 
				}
				
				dfrd.reject(error, xhr, status);
			},
			/**
			 * Request success handler. Valid response data and reject/resolve dfrd.
			 *
			 * @param Object  response data
			 * @param String request status
			 * @return void
			 **/
			success = function(response) {
				// Set currrent request command name
				self.currentReqCmd = cmd;
				
				if (raw) {
					return dfrd.resolve(response);
				}
				
				if (!response) {
					return dfrd.reject(['errResponse', 'errDataEmpty'], xhr);
				} else if (!$.isPlainObject(response)) {
					return dfrd.reject(['errResponse', 'errDataNotJSON'], xhr);
				} else if (response.error) {
					return dfrd.reject(response.error, xhr);
				} else if (!self.validResponse(cmd, response)) {
					return dfrd.reject('errResponse', xhr);
				}

				response = self.normalize(response);

				if (!self.api) {
					self.api    = response.api || 1;
					if (self.api == '2.0' && typeof response.options.uploadMaxSize !== 'undefined') {
						self.api = '2.1';
					}
					self.newAPI = self.api >= 2;
					self.oldAPI = !self.newAPI;
				}
				
				if (response.options) {
					cwdOptions = $.extend({}, cwdOptions, response.options);
				}

				if (response.netDrivers) {
					self.netDrivers = response.netDrivers;
				}

				if (cmd == 'open' && !!data.init) {
					self.uplMaxSize = self.returnBytes(response.uplMaxSize);
					self.uplMaxFile = !!response.uplMaxFile? parseInt(response.uplMaxFile) : 20;
				}

				dfrd.resolve(response);
				response.debug && self.debug('backend-debug', response.debug);
			},
			xhr, _xhr,
			abort = function(e){
				if (e.type == 'autosync') {
					if (e.data.action != 'stop') return;
				} else {
					if (!e.data.added || !e.data.added.length) {
						return;
					}
				}
				if (xhr.state() == 'pending') {
					xhr.quiet = true;
					xhr.abort();
					if (e.type != 'unload' && e.type != 'destroy') {
						self.autoSync();
					}
				}
			};

		defdone && dfrd.done(done);
		dfrd.fail(function(error) {
			if (error) {
				deffail ? self.error(error) : self.debug('error', self.i18n(error));
			}
		})
		
		if (!cmd) {
			return dfrd.reject('errCmdReq');
		}	

		if (syncOnFail) {
			dfrd.fail(function(error) {
				error && self.sync();
			});
		}

		if (notify.type && notify.cnt) {
			if (cancel) {
				notify.cancel = dfrd;
			}
			timeout = setTimeout(function() {
				self.notify(notify);
				dfrd.always(function() {
					notify.cnt = -(parseInt(notify.cnt)||0);
					self.notify(notify);
				})
			}, self.notifyDelay)
			
			dfrd.always(function() {
				clearTimeout(timeout);
			});
		}
		
		// quiet abort not completed "open" requests
		if (cmd == 'open') {
			while ((_xhr = queue.pop())) {
				if (_xhr.state() == 'pending') {
					_xhr.quiet = true;
					_xhr.abort();
				}
			}
		}

		delete options.preventFail

		dfrd.xhr = xhr = this.transport.send(options).fail(error).done(success);
		
		// add "open" xhr into queue
		if (cmd == 'open' || (cmd == 'info' && data.compare)) {
			queue.unshift(xhr);
			self.bind(self.cmdsToAdd + ' autosync', abort);
			dfrd.always(function() {
				var ndx = $.inArray(xhr, queue);
				self.unbind(self.cmdsToAdd + ' autosync', abort);
				ndx !== -1 && queue.splice(ndx, 1);
			});
		}
		
		// abort pending xhr on window unload or elFinder destroy
		self.bind('unload destroy', abort);
		dfrd.always(function() {
			self.unbind('unload destroy', abort);
		});
		
		return dfrd;
	};
	
	/**
	 * Compare current files cache with new files and return diff
	 * 
	 * @param  Array  new files
	 * @return Object
	 */
	this.diff = function(incoming, onlydir) {
		var raw       = {},
			added     = [],
			removed   = [],
			changed   = [],
			isChanged = function(hash) {
				var l = changed.length;

				while (l--) {
					if (changed[l].hash == hash) {
						return true;
					}
				}
			};
			
		$.each(incoming, function(i, f) {
			raw[f.hash] = f;
		});
			
		// find removed
		$.each(files, function(hash, f) {
			if (!onlydir || f.phash === onlydir) {
				!raw[hash] && removed.push(hash);
			}
		});
		
		// compare files
		$.each(raw, function(hash, file) {
			var origin = files[hash];

			if (!origin) {
				added.push(file);
			} else {
				$.each(file, function(prop) {
					if (file[prop] != origin[prop]) {
						changed.push(file)
						return false;
					}
				});
			}
		});
		
		// parents of removed dirs mark as changed (required for tree correct work)
		$.each(removed, function(i, hash) {
			var file  = files[hash], 
				phash = file.phash;

			if (phash 
			&& file.mime == 'directory' 
			&& $.inArray(phash, removed) === -1 
			&& raw[phash] 
			&& !isChanged(phash)) {
				changed.push(raw[phash]);
			}
		});
		
		return {
			added   : added,
			removed : removed,
			changed : changed
		};
	}
	
	/**
	 * Sync content
	 * 
	 * @return jQuery.Deferred
	 */
	this.sync = function(onlydir, polling) {
		this.autoSync('stop');
		var self  = this,
			compare = function(){
				var c = '', cnt = 0, mtime = 0;
				if (onlydir && polling) {
					$.each(files, function(h, f) {
						if (f.phash && f.phash === onlydir) {
							++cnt;
							mtime = Math.max(mtime, f.ts);
						}
						c = cnt+':'+mtime;
					});
				}
				return c;
			},
			comp  = compare(),
			dfrd  = $.Deferred().done(function() { self.trigger('sync'); }),
			opts1 = {
				data           : {cmd : 'open', reload : 1, target : cwd, tree : (! onlydir && this.ui.tree) ? 1 : 0, compare : comp},
				preventDefault : true
			},
			opts2 = {
				data           : {cmd : 'parents', target : cwd},
				preventDefault : true
			};
		
		$.when(
			this.request(opts1),
			onlydir? null : this.request(opts2)
		)
		.fail(function(error) {
			if (! polling) {
				dfrd.reject(error);
				error && self.request({
					data   : {cmd : 'open', target : (self.lastDir('') || self.root()), tree : 1, init : 1},
					notify : {type : 'open', cnt : 1, hideCnt : true}
				});
			} else {
				dfrd.reject();
			}
		})
		.done(function(odata, pdata) {
			if (odata.cwd.compare) {
				if (comp === odata.cwd.compare) {
					return dfrd.reject();
				}
			}
			
			if (self.api < 2.1) {
				pdata.tree = (pdata.tree || []).concat([odata.cwd]);
			}
			
			var diff = self.diff(odata.files.concat(pdata && pdata.tree ? pdata.tree : []), onlydir);

			diff.added.push(odata.cwd)
			diff.removed.length && self.remove(diff);
			diff.added.length   && self.add(diff);
			diff.changed.length && self.change(diff);
			return dfrd.resolve(diff);
		})
		.always(function() {
			self.autoSync();
		});
		
		return dfrd;
	}
	
	this.upload = function(files) {
			return this.transport.upload(files, this);
		}
	
	/**
	 * Attach listener to events
	 * To bind to multiply events at once, separate events names by space
	 * 
	 * @param  String  event(s) name(s)
	 * @param  Object  event handler
	 * @return elFinder
	 */
	this.bind = function(event, callback) {
		var i;
		
		if (typeof(callback) == 'function') {
			event = ('' + event).toLowerCase().split(/\s+/);
			
			for (i = 0; i < event.length; i++) {
				if (listeners[event[i]] === void(0)) {
					listeners[event[i]] = [];
				}
				listeners[event[i]].push(callback);
			}
		}
		return this;
	};
	
	/**
	 * Remove event listener if exists
	 * To un-bind to multiply events at once, separate events names by space
	 *
	 * @param  String    event(s) name(s)
	 * @param  Function  callback
	 * @return elFinder
	 */
	this.unbind = function(event, callback) {
		var i, l, ci;
		
		event = ('' + event).toLowerCase().split(/\s+/);
		
		for (i = 0; i < event.length; i++) {
			l = listeners[event[i]] || [];
			ci = $.inArray(callback, l);
			ci > -1 && l.splice(ci, 1);
		}
		
		callback = null
		return this;
	};
	
	/**
	 * Fire event - send notification to all event listeners
	 *
	 * @param  String   event type
	 * @param  Object   data to send across event
	 * @param  Boolean  allow modify data (call by reference of data)
	 * @return elFinder
	 */
	this.trigger = function(event, data, allowModify) {
		var event    = event.toLowerCase(),
			isopen   = (event === 'open'),
			handlers = listeners[event] || [], i, l, jst;
		
		this.debug('event-'+event, data);
		
		if (isopen && !allowModify) {
			// for performance tuning
			jst = JSON.stringify(data);
		}
		if (handlers.length) {
			event = $.Event(event);
			if (allowModify) {
				event.data = data;
			}

			l = handlers.length;
			for (i = 0; i < l; i++) {
				// only callback has argument
				if (handlers[i].length) {
					if (!allowModify) {
						// to avoid data modifications. remember about "sharing" passing arguments in js :) 
						event.data = isopen? JSON.parse(jst) : $.extend(true, {}, data);
					}
				}

				try {
					if (handlers[i](event, this) === false 
					|| event.isDefaultPrevented()) {
						this.debug('event-stoped', event.type);
						break;
					}
				} catch (ex) {
					window.console && window.console.log && window.console.log(ex);
				}
				
			}
		}
		return this;
	};
	
	/**
	 * Get event listeners
	 *
	 * @param  String   event type
	 * @return Array    listed event functions
	 */
	this.getListeners = function(event) {
		return event? listeners[event.toLowerCase()] : listeners;
	};
	
	/**
	 * Bind keybord shortcut to keydown event
	 *
	 * @example
	 *    elfinder.shortcut({ 
	 *       pattern : 'ctrl+a', 
	 *       description : 'Select all files', 
	 *       callback : function(e) { ... }, 
	 *       keypress : true|false (bind to keypress instead of keydown) 
	 *    })
	 *
	 * @param  Object  shortcut config
	 * @return elFinder
	 */
	this.shortcut = function(s) {
		var patterns, pattern, code, i, parts;
		
		if (this.options.allowShortcuts && s.pattern && $.isFunction(s.callback)) {
			patterns = s.pattern.toUpperCase().split(/\s+/);
			
			for (i= 0; i < patterns.length; i++) {
				pattern = patterns[i]
				parts   = pattern.split('+');
				code    = (code = parts.pop()).length == 1 
					? code > 0 ? code : code.charCodeAt(0) 
					: $.ui.keyCode[code];

				if (code && !shortcuts[pattern]) {
					shortcuts[pattern] = {
						keyCode     : code,
						altKey      : $.inArray('ALT', parts)   != -1,
						ctrlKey     : $.inArray('CTRL', parts)  != -1,
						shiftKey    : $.inArray('SHIFT', parts) != -1,
						type        : s.type || 'keydown',
						callback    : s.callback,
						description : s.description,
						pattern     : pattern
					};
				}
			}
		}
		return this;
	}
	
	/**
	 * Registered shortcuts
	 *
	 * @type Object
	 **/
	this.shortcuts = function() {
		var ret = [];
		
		$.each(shortcuts, function(i, s) {
			ret.push([s.pattern, self.i18n(s.description)]);
		});
		return ret;
	};
	
	/**
	 * Get/set clipboard content.
	 * Return new clipboard content.
	 *
	 * @example
	 *   this.clipboard([]) - clean clipboard
	 *   this.clipboard([{...}, {...}], true) - put 2 files in clipboard and mark it as cutted
	 * 
	 * @param  Array    new files hashes
	 * @param  Boolean  cut files?
	 * @return Array
	 */
	this.clipboard = function(hashes, cut) {
		var map = function() { return $.map(clipboard, function(f) { return f.hash }); }

		if (hashes !== void(0)) {
			clipboard.length && this.trigger('unlockfiles', {files : map()});
			remember = [];
			
			clipboard = $.map(hashes||[], function(hash) {
				var file = files[hash];
				if (file) {
					
					remember.push(hash);
					
					return {
						hash   : hash,
						phash  : file.phash,
						name   : file.name,
						mime   : file.mime,
						read   : file.read,
						locked : file.locked,
						cut    : !!cut
					}
				}
				return null;
			});
			this.trigger('changeclipboard', {clipboard : clipboard.slice(0, clipboard.length)});
			cut && this.trigger('lockfiles', {files : map()});
		}

		// return copy of clipboard instead of refrence
		return clipboard.slice(0, clipboard.length);
	}
	
	/**
	 * Return true if command enabled
	 * 
	 * @param  String       command name
	 * @param  String|void  hash for check of own volume's disabled cmds
	 * @return Boolean
	 */
	this.isCommandEnabled = function(name, dstHash) {
		var disabled,
			cvid = self.cwd().volumeid || '';
		if (cvid && dstHash && dstHash.indexOf(cvid) !== 0) {
			disabled = [];
			$.each(self.disabledCmds, function(i, v){
				if (dstHash.indexOf(i) === 0) {
					disabled = v;
					return false;
				}
			});
		} else {
			disabled = cwdOptions.disabled;
		}
		return this._commands[name] ? $.inArray(name, disabled) === -1 : false;
	}
	
	/**
	 * Exec command and return result;
	 *
	 * @param  String         command name
	 * @param  String|Array   usualy files hashes
	 * @param  String|Array   command options
	 * @param  String|void    hash for enabled check of own volume's disabled cmds
	 * @return $.Deferred
	 */		
	this.exec = function(cmd, files, opts, dstHash) {
		if (cmd === 'open') {
			this.autoSync('stop');
		}
		return this._commands[cmd] && this.isCommandEnabled(cmd, dstHash) 
			? this._commands[cmd].exec(files, opts) 
			: $.Deferred().reject('No such command');
	}
	
	/**
	 * Create and return dialog.
	 *
	 * @param  String|DOMElement  dialog content
	 * @param  Object             dialog options
	 * @return jQuery
	 */
	this.dialog = function(content, options) {
		var dialog = $('<div/>').append(content).appendTo(node).elfinderdialog(options);
		this.bind('resize', function(){
			dialog.elfinderdialog('posInit');
		});
		return dialog;
	}
	
	/**
	 * Return UI widget or node
	 *
	 * @param  String  ui name
	 * @return jQuery
	 */
	this.getUI = function(ui) {
		return this.ui[ui] || node;
	}
	
	this.command = function(name) {
		return name === void(0) ? this._commands : this._commands[name];
	}
	
	/**
	 * Resize elfinder node
	 * 
	 * @param  String|Number  width
	 * @param  Number         height
	 * @return void
	 */
	this.resize = function(w, h) {
		node.css('width', w).height(h).trigger('resize');
		this.trigger('resize', {width : node.width(), height : node.height()});
	}
	
	/**
	 * Restore elfinder node size
	 * 
	 * @return elFinder
	 */
	this.restoreSize = function() {
		this.resize(width, height);
	}
	
	this.show = function() {
		node.show();
		this.enable().trigger('show');
	}
	
	this.hide = function() {
		this.disable().trigger('hide');
		node.hide();
	}
	
	/**
	 * Destroy this elFinder instance
	 *
	 * @return void
	 **/
	this.destroy = function() {
		if (node && node[0].elfinder) {
			this.options.syncStart = false;
			this.autoSync('stop');
			this.trigger('destroy').disable();
			listeners = {};
			shortcuts = {};
			$(window).off('.' + namespace);
			$(document).add(node).off('.' + namespace);
			self.trigger = function() { }
			beeper.remove();
			node.children().remove();
			node.off();
			node.append(prevContent.contents()).removeClass(this.cssClass).attr('style', prevStyle);
			node[0].elfinder = null;
		}
	}
	
	/**
	 * Start or stop auto sync
	 * 
	 * @param  String|Bool  stop
	 * @return void
	 */
	this.autoSync = function(stop) {
		var sync;
		if (self.options.sync >= 1000) {
			if (syncInterval) {
				clearTimeout(syncInterval);
				syncInterval = null;
				self.trigger('autosync', {action : 'stop'});
			}
			if (stop || !self.options.syncStart) {
				return;
			}
			// run interval sync
			sync = function(start){
				var timeout;
				if (cwdOptions.syncMinMs && (start || syncInterval)) {
					start && self.trigger('autosync', {action : 'start'});
					timeout = Math.max(self.options.sync, cwdOptions.syncMinMs);
					syncInterval && clearTimeout(syncInterval);
					syncInterval = setTimeout(function() {
						var dosync = true, hash = cwd, cts;
						if (cwdOptions.syncChkAsTs && (cts = files[hash].ts)) {
							self.request({
								data           : {cmd : 'info', targets : [hash], compare : cts, reload : 1},
								preventDefault : true
							})
							.done(function(data){
								var ts;
								dosync = true;
								if (data.compare) {
									ts = data.compare;
									if (ts == cts) {
										dosync = false;
									}
								}
								if (dosync) {
									self.sync(hash).always(function(){
										if (ts) {
											// update ts for cache clear etc.
											files[hash].ts = ts;
										}
										sync();
									});
								} else {
									sync();
								}
							})
							.fail(function(error){
								if (error && error != 'errConnect') {
									self.error(error);
								} else {
									syncInterval = setTimeout(function() {
										sync();
									}, timeout);
								}
							});
						} else {
							self.sync(cwd, true).always(function(){
								sync();
							});
						}
					}, timeout);
				}
			};
			sync(true);
		}
	};
	
	/**
	 * Return bool is inside work zone of specific point
	 * 
	 * @param  Number event.pageX
	 * @param  Number event.pageY
	 * @return Bool
	 */
	this.insideWorkzone = function(x, y, margin) {
		var rectangle = this.getUI('workzone').data('rectangle');
		
		margin = margin || 1;
		if (x < rectangle.left + margin
		|| x > rectangle.left + rectangle.width + margin
		|| y < rectangle.top + margin
		|| y > rectangle.top + rectangle.height + margin) {
			return false;
		}
		return true;
	}
	
	/*************  init stuffs  ****************/
	
	// check jquery ui
	if (!($.fn.selectable && $.fn.draggable && $.fn.droppable)) {
		return alert(this.i18n('errJqui'));
	}

	// check node
	if (!node.length) {
		return alert(this.i18n('errNode'));
	}
	// check connector url
	if (!this.options.url) {
		return alert(this.i18n('errURL'));
	}

	$.extend($.ui.keyCode, {
		'F1' : 112,
		'F2' : 113,
		'F3' : 114,
		'F4' : 115,
		'F5' : 116,
		'F6' : 117,
		'F7' : 118,
		'F8' : 119,
		'F9' : 120
	});
	
	this.dragUpload = false;
	this.xhrUpload  = (typeof XMLHttpRequestUpload != 'undefined' || typeof XMLHttpRequestEventTarget != 'undefined') && typeof File != 'undefined' && typeof FormData != 'undefined';
	
	// configure transport object
	this.transport = {}

	if (typeof(this.options.transport) == 'object') {
		this.transport = this.options.transport;
		if (typeof(this.transport.init) == 'function') {
			this.transport.init(this)
		}
	}
	
	if (typeof(this.transport.send) != 'function') {
		this.transport.send = function(opts) { return $.ajax(opts); }
	}
	
	if (this.transport.upload == 'iframe') {
		this.transport.upload = $.proxy(this.uploads.iframe, this);
	} else if (typeof(this.transport.upload) == 'function') {
		this.dragUpload = !!this.options.dragUploadAllow;
	} else if (this.xhrUpload && !!this.options.dragUploadAllow) {
		this.transport.upload = $.proxy(this.uploads.xhr, this);
		this.dragUpload = true;
	} else {
		this.transport.upload = $.proxy(this.uploads.iframe, this);
	}

	/**
	 * Alias for this.trigger('error', {error : 'message'})
	 *
	 * @param  String  error message
	 * @return elFinder
	 **/
	this.error = function() {
		var arg = arguments[0],
			opts = arguments[1] || null;
		return arguments.length == 1 && typeof(arg) == 'function'
			? self.bind('error', arg)
			: self.trigger('error', {error : arg, opts : opts});
	}
	
	// create bind/trigger aliases for build-in events
	$.each(['enable', 'disable', 'load', 'open', 'reload', 'select',  'add', 'remove', 'change', 'dblclick', 'getfile', 'lockfiles', 'unlockfiles', 'selectfiles', 'unselectfiles', 'dragstart', 'dragstop', 'search', 'searchend', 'viewchange'], function(i, name) {
		self[name] = function() {
			var arg = arguments[0];
			return arguments.length == 1 && typeof(arg) == 'function'
				? self.bind(name, arg)
				: self.trigger(name, $.isPlainObject(arg) ? arg : {});
		}
	});
	
	// bind core event handlers
	this
		.enable(function() {
			if (!enabled && self.visible() && self.ui.overlay.is(':hidden')) {
				enabled = true;
				document.activeElement && document.activeElement.blur();
				node.removeClass('elfinder-disabled');
			}
		})
		.disable(function() {
			prevEnabled = enabled;
			enabled = false;
			node.addClass('elfinder-disabled');
		})
		.open(function() {
			selected = [];
		})
		.select(function(e) {
			selected = $.map(e.data.selected || e.data.value|| [], function(hash) { return files[hash] ? hash : null; });
		})
		.error(function(e) { 
			var opts  = {
					cssClass  : 'elfinder-dialog-error',
					title     : self.i18n(self.i18n('error')),
					resizable : false,
					destroyOnClose : true,
					buttons   : {}
			};
			
			opts.buttons[self.i18n(self.i18n('btnClose'))] = function() { $(this).elfinderdialog('close'); };

			if (e.data.opts && $.isPlainObject(e.data.opts)) {
				$.extend(opts, e.data.opts);
			}

			self.dialog('<span class="elfinder-dialog-icon elfinder-dialog-icon-error"/>'+self.i18n(e.data.error), opts);
		})
		.bind('tree parents', function(e) {
			cache(e.data.tree || []);
		})
		.bind('tmb', function(e) {
			$.each(e.data.images||[], function(hash, tmb) {
				if (files[hash]) {
					files[hash].tmb = tmb;
				}
			})
		})
		.add(function(e) {
			cache(e.data.added||[]);
		})
		.change(function(e) {
			$.each(e.data.changed||[], function(i, file) {
				var hash = file.hash;
				if (files[hash]) {
					$.each(['locked', 'hidden', 'width', 'height'], function(i, v){
						if (files[hash][v] && !file[v]) {
							delete files[hash][v];
						}
					});
				}
				files[hash] = files[hash] ? $.extend(files[hash], file) : file;
			});
		})
		.remove(function(e) {
			var removed = e.data.removed||[],
				l       = removed.length,
				roots   = {},
				rm      = function(hash) {
					var file = files[hash], i;
					if (file) {
						if (file.mime === 'directory') {
							if (roots[hash]) {
								delete self.roots[roots[hash]];
							}
							$.each(files, function(h, f) {
								f.phash == hash && rm(h);
							});
						}
						delete files[hash];
					}
				};
		
			$.each(self.roots, function(k, v) {
				roots[v] = k;
			});
			while (l--) {
				rm(removed[l]);
			}
			
		})
		.bind('searchstart', function(e) {
			$.extend(self.searchStatus, e.data);
			self.searchStatus.state = 1;
		})
		.bind('search', function(e) {
			self.searchStatus.state = 2;
			cache(e.data.files);
		})
		.bind('searchend', function() {
			self.searchStatus.state = 0;
		})
		.bind('rm', function(e) {
			var play  = beeper.canPlayType && beeper.canPlayType('audio/wav; codecs="1"');
		
			play && play != '' && play != 'no' && $(beeper).html('<source src="' + soundPath + 'rm.wav" type="audio/wav">')[0].play()
		})
		
		;

	// bind external event handlers
	$.each(this.options.handlers, function(event, callback) {
		self.bind(event, callback);
	});

	/**
	 * History object. Store visited folders
	 *
	 * @type Object
	 **/
	this.history = new this.history(this);
	
	// in getFileCallback set - change default actions on double click/enter/ctrl+enter
	if (this.commands.getfile) {
		if (typeof(this.options.getFileCallback) == 'function') {
			this.bind('dblclick', function(e) {
				e.preventDefault();
				self.exec('getfile').fail(function() {
					self.exec('open');
				});
			});
			this.shortcut({
				pattern     : 'enter',
				description : this.i18n('cmdgetfile'),
				callback    : function() { self.exec('getfile').fail(function() { self.exec(self.OS == 'mac' ? 'rename' : 'open') }) }
			})
			.shortcut({
				pattern     : 'ctrl+enter',
				description : this.i18n(this.OS == 'mac' ? 'cmdrename' : 'cmdopen'),
				callback    : function() { self.exec(self.OS == 'mac' ? 'rename' : 'open') }
			});
		} else {
			delete this.commands.getfile;
		}
	}

	/**
	 * Root hashed
	 * 
	 * @type Object
	 */
	this.roots = {},
	
	/**
	 * Loaded commands
	 *
	 * @type Object
	 **/
	this._commands = {};
	
	if (!$.isArray(this.options.commands)) {
		this.options.commands = [];
	}
	// check required commands
	$.each(['open', 'reload', 'back', 'forward', 'up', 'home', 'info', 'quicklook', 'getfile', 'help'], function(i, cmd) {
		$.inArray(cmd, self.options.commands) === -1 && self.options.commands.push(cmd);
	});

	// load commands
	$.each(this.options.commands, function(i, name) {
		var cmd = self.commands[name];
		if ($.isFunction(cmd) && !self._commands[name]) {
			cmd.prototype = base;
			self._commands[name] = new cmd();
			self._commands[name].setup(name, self.options.commandsOptions[name]||{});
			// setup linked commands
			if (self._commands[name].linkedCmds.length) {
				$.each(self._commands[name].linkedCmds, function(i, n) {
					var lcmd = self.commands[n];
					if ($.isFunction(lcmd) && !self._commands[n]) {
						lcmd.prototype = base;
						self._commands[n] = new lcmd();
						self._commands[n].setup(n, self.options.commandsOptions[n]||{});
					}
				});
			}
		}
	});
	
	/**
	 * UI command map of cwd volume ( That volume driver option `uiCmdMap` )
	 *
	 * @type Object
	 **/
	this.commandMap = {};
	
	/**
	 * Disabled commands Array of each volume
	 * 
	 * @type Object
	 */
	this.disabledCmds = {};
	
	/**
	 * tmbUrls Array of each volume
	 * 
	 * @type Object
	 */
	this.tmbUrls = {};
	
	// prepare node
	node.addClass(this.cssClass)
		.on(mousedown, function() {
			!enabled && self.enable();
		});
	
	/**
	 * UI nodes
	 *
	 * @type Object
	 **/
	this.ui = {
		// container for nav panel and current folder container
		workzone : $('<div/>').appendTo(node).elfinderworkzone(this),
		// container for folders tree / places
		navbar : $('<div/>').appendTo(node).elfindernavbar(this, this.options.uiOptions.navbar || {}),
		// contextmenu
		contextmenu : $('<div/>').appendTo(node).elfindercontextmenu(this),
		// overlay
		overlay : $('<div/>').appendTo(node).elfinderoverlay({
			show : function() { self.disable(); },
			hide : function() { prevEnabled && self.enable(); }
		}),
		// current folder container
		cwd : $('<div/>').appendTo(node).elfindercwd(this, this.options.uiOptions.cwd || {}),
		// notification dialog window
		notify : this.dialog('', {
			cssClass      : 'elfinder-dialog-notify',
			position      : this.options.notifyDialog.position,
			resizable     : false,
			autoOpen      : false,
			closeOnEscape : false,
			title         : '&nbsp;',
			width         : parseInt(this.options.notifyDialog.width)
		}),
		statusbar : $('<div class="ui-widget-header ui-helper-clearfix ui-corner-bottom elfinder-statusbar"/>').hide().appendTo(node)
	}
	
	// load required ui
	$.each(this.options.ui || [], function(i, ui) {
		var name = 'elfinder'+ui,
			opts = self.options.uiOptions[ui] || {};

		if (!self.ui[ui] && $.fn[name]) {
			self.ui[ui] = $('<'+(opts.tag || 'div')+'/>').appendTo(node)[name](self, opts);
		}
	});
	


	// store instance in node
	node[0].elfinder = this;
	
	// make node resizable
	this.options.resizable 
	&& !this.UA.Touch 
	&& $.fn.resizable 
	&& node.resizable({
		handles   : 'se',
		minWidth  : 300,
		minHeight : 200
	});

	if (this.options.width) {
		width = this.options.width;
	}
	
	if (this.options.height) {
		height = parseInt(this.options.height);
	}
	
	if (this.options.soundPath) {
		soundPath = this.options.soundPath.replace(/\/+$/, '') + '/';
	}
	
	// update size	
	self.resize(width, height);
	
	// attach events to document
	$(document)
		// disable elfinder on click outside elfinder
		.on('click.'+namespace, function(e) { enabled && !$(e.target).closest(node).length && self.disable(); })
		// exec shortcuts
		.on(keydown+' '+keypress, execShortcut);
	
	// attach events to window
	self.options.useBrowserHistory && $(window)
		.on('popstate.' + namespace, function(ev) {
			var target = ev.originalEvent.state && ev.originalEvent.state.thash;
			target && !$.isEmptyObject(self.files()) && self.request({
				data   : {cmd  : 'open', target : target, onhistory : 1},
				notify : {type : 'open', cnt : 1, hideCnt : true},
				syncOnFail : true
			});
		});
	
	// send initial request and start to pray >_<
	this.trigger('init')
		.request({
			data        : {cmd : 'open', target : self.startDir(), init : 1, tree : this.ui.tree ? 1 : 0}, 
			preventDone : true,
			notify      : {type : 'open', cnt : 1, hideCnt : true},
			freeze      : true
		})
		.fail(function() {
			self.trigger('fail').disable().lastDir('');
			listeners = {};
			shortcuts = {};
			$(document).add(node).off('.'+namespace);
			self.trigger = function() { };
		})
		.done(function(data) {
			// detect elFinder node z-index
			var ni = node.css('z-index');
			if (ni && ni !== 'auto' && ni !== 'inherit') {
				self.zIndex = ni;
			} else {
				node.parents().each(function(i, n) {
					var z = $(n).css('z-index');
					if (z !== 'auto' && z !== 'inherit' && (z = parseInt(z))) {
						self.zIndex = z;
						return false;
					}
				});
			}
			
			self.load().debug('api', self.api);
			data = $.extend(true, {}, data);
			open(data);
			self.trigger('open', data);
		});
	
	// update ui's size after init
	this.one('load', function() {
		node.trigger('resize');
	});

	(function(){
		var tm;
		$(window).on('resize.' + namespace, function(){
			tm && clearTimeout(tm);
			tm = setTimeout(function() {
				self.trigger('resize', {width : node.width(), height : node.height()});
			}, 200);
		})
		.on('beforeunload.' + namespace,function(){
			if (self.ui.notify.children().length) {
				return self.i18n('ntfsmth');
			}
			self.trigger('unload');
		});
	})();

	// bind window onmessage for CORS
	$(window).on('message.' + namespace, function(e){
		var res = e.originalEvent || null,
			obj, data;
		if (res && self.uploadURL.indexOf(res.origin) === 0) {
			try {
				obj = JSON.parse(res.data);
				data = obj.data || null;
				if (data) {
					if (data.error) {
						self.error(data.error);
					} else {
						data.warning && self.error(data.warning);
						data.removed && data.removed.length && self.remove(data);
						data.added   && data.added.length   && self.add(data);
						data.changed && data.changed.length && self.change(data);
						if (obj.bind) {
							self.trigger(obj.bind, data);
						}
						data.sync && self.sync();
					}
				}
			} catch (e) {
				self.sync();
			}
		}
	});

	// elFinder enable always
	if (self.options.enableAlways) {
		$(window).on('focus.' + namespace, function(e){
			(e.target === this) && self.enable();
		});
	}

	if (self.dragUpload) {
		(function(){
			var isin = function(e) {
				return (e.target.nodeName !== 'TEXTAREA' && e.target.nodeName !== 'INPUT' && $(e.target).closest('div.ui-dialog-content').length === 0);
			},
			enter = function(e) {
				if (isin(e)) {
					e.preventDefault();
					e.stopPropagation();
				}
			},
			leave = function(e) {
				if (isin(e)) {
					e.preventDefault();
					e.stopPropagation();
				}
			},
			over = function(e) {
				if (isin(e)) {
					e.preventDefault();
					e.stopPropagation();
					e.dataTransfer.dropEffect = 'none';
				}
			},
			drop =function(e) {
				if (isin(e)) {
					e.stopPropagation();
					e.preventDefault();
				}
			};
			node[0].addEventListener('dragenter', enter, false);
			node[0].addEventListener('dragleave', leave, false);
			node[0].addEventListener('dragover', over, false);
			node[0].addEventListener('drop', drop, false);
			self.bind('destroy', function() {
				node[0].removeEventListener('dragenter', enter, false);
				node[0].removeEventListener('dragleave', leave, false);
				node[0].removeEventListener('dragover', over, false);
				node[0].removeEventListener('drop', drop, false);
			});
		})();

		// add event listener for HTML5 DnD upload
		(function() {
			var ent   = 'native-drag-enter',
			disable   = 'native-drag-disable',
			c         = 'class',
			navdir    = self.res(c, 'navdir'),
			droppable = self.res(c, 'droppable'),
			collapsed = self.res(c, 'navcollapse'),
			expanded  = self.res(c, 'navexpand'),
			dropover  = self.res(c, 'adroppable'),
			arrow     = self.res(c, 'navarrow'),
			clDropActive = self.res(c, 'adroppable');
			node.on('dragenter', '.native-droppable', function(e){
				if (e.originalEvent.dataTransfer) {
					var $elm = $(e.currentTarget),
						id   = e.currentTarget.id || null,
						cwd  = null,
						elfFrom;
					if (!id) { // target is cwd
						cwd = self.cwd();
						$elm.data(disable, false);
						try {
							$.each(e.originalEvent.dataTransfer.types, function(i, v){
								if (v.substr(0, 13) === 'elfinderfrom:') {
									elfFrom = v.substr(13).toLowerCase();
								}
							});
						} catch(e) {}
					} else {
						if (!$elm.data(ent) && $elm.hasClass(navdir) && $elm.is('.'+collapsed+':not(.'+expanded+')')) {
							setTimeout(function() {
								$elm.is('.'+collapsed+'.'+dropover) && $elm.children('.'+arrow).click();
							}, 500);
						}
					}
					if (!cwd || (cwd.write && (!elfFrom || elfFrom !== (window.location.href + cwd.hash).toLowerCase()))) {
						e.preventDefault();
						e.stopPropagation();
						$elm.data(ent, true);
						$elm.addClass(clDropActive);
					} else {
						$elm.data(disable, true);
					}
				}
			})
			.on('dragleave', '.native-droppable', function(e){
				if (e.originalEvent.dataTransfer) {
					var $elm = $(e.currentTarget);
					e.preventDefault();
					e.stopPropagation();
					if ($elm.data(ent)) {
						$elm.data(ent, false);
					} else {
						$elm.removeClass(clDropActive);
					}
				}
			})
			.on('dragover', '.native-droppable', function(e){
				if (e.originalEvent.dataTransfer) {
					var $elm = $(e.currentTarget);
					e.preventDefault();
					e.stopPropagation();
					e.originalEvent.dataTransfer.dropEffect = $elm.data(disable)? 'none' : 'copy';
					$elm.data(ent, false);
				}
			})
			.on('drop', '.native-droppable', function(e){
				if (e.originalEvent.dataTransfer) {
					var $elm = $(e.currentTarget)
						id;
					e.preventDefault();
					e.stopPropagation();
					$elm.removeClass(clDropActive);
					if (e.currentTarget.id) {
						id = $elm.hasClass(navdir)? self.navId2Hash(e.currentTarget.id) : self.cwdId2Hash(e.currentTarget.id);
					} else {
						id = self.cwd().hash;
					}
					e.originalEvent._target = id;
					self.directUploadTarget = id;
					self.exec('upload', {dropEvt: e.originalEvent, target: id});
					self.directUploadTarget = null;
				}
			});
		})();
	}

	// Swipe on the touch devices to show/hide of toolbar or navbar
	if (self.UA.Touch) {
		(function() {
			var lastX, lastY, nodeOffset, nodeTop, toolbarH,
				navbar = self.getUI('navbar'),
				toolbar = self.getUI('toolbar'),
				moveOn  = function(e) {
					e.preventDefault();
				},
				moveOff = function() {
					$(document).off('touchmove', moveOn);
				},
				handleW, handleH = 50;

			node.on('touchstart touchmove touchend', function(e) {
				if (e.type === 'touchend') {
					lastX = false;
					lastY = false;
					moveOff();
					return;
				}
				
				var touches = e.originalEvent.touches || [{}],
					x = touches[0].pageX || null,
					y = touches[0].pageY || null,
					navbarMode;
				
				if (x === null || y === null || (e.type === 'touchstart' && touches.length > 1)) {
					return;
				}
				
				if (e.type === 'touchstart') {
					nodeOffset = node.offset();
					if (navbar) {
						lastX = false;
						if (navbar.is(':hidden')) {
							if (! handleW) {
								handleW = Math.max(50, node.width() / 10)
							}
							if ((self.direction === 'ltr'? (x - nodeOffset.left) : (node.width() + nodeOffset.left - x)) < handleW) {
								lastX = x;
							}
						} else {
							handleW = Math.max(50, node.width() / 10);
							lastX = x;
						}
					}
					if (toolbar) {
						toolbarH = toolbar.height();
						nodeTop = nodeOffset.top;
						if (y - nodeTop < (toolbar.is(':hidden')? handleH : (toolbarH + 30))) {
							lastY = y;
							$(document).on('touchmove.' + namespace, moveOn);
							setTimeout(function() {
								moveOff();
							}, 500);
						} else {
							lastY = false;
						}
					}
				} else {
					if (navbar && lastX !== false) {
						navbarMode = (self.direction === 'ltr'? (lastX > x) : (lastX < x))? 'navhide' : 'navshow';
						if (Math.abs(lastX - x) > Math.min((navbarMode === 'navhide'? 200 : 45), (node.width() * .5))) {
							self.getUI('navbar').trigger(navbarMode, {handleW: handleW});
							lastX = false;
						}
					}
					if (toolbar && lastY !== false ) {
						if (Math.abs(lastY - y) > toolbarH / 3) {
							var mode = (lastY > y)? 'slideUp' : 'slideDown';
							
							if (toolbar.is(mode === 'slideDown' ? ':hidden' : ':visible')) {
								toolbar.stop(true, true).trigger('toggle', {duration: 100, handleH: handleH});
								moveOff();
							}
							lastY = false;
						}
					}
				}
			});
		})();
	}
	
	// self.timeEnd('load'); 

}

/**
 * Prototype
 * 
 * @type  Object
 */
elFinder.prototype = {
	
	uniqueid : 0,
	
	res : function(type, id) {
		return this.resources[type] && this.resources[type][id];
	}, 
	
	/**
	 * Current request command
	 * 
	 * @type  String
	 */
	currentReqCmd : '',
	
	/**
	 * Internationalization object
	 * 
	 * @type  Object
	 */
	i18 : {
		en : {
			translator      : '',
			language        : 'English',
			direction       : 'ltr',
			dateFormat      : 'd.m.Y H:i',
			fancyDateFormat : '$1 H:i',
			messages        : {}
		},
		months : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		monthsShort : ['msJan', 'msFeb', 'msMar', 'msApr', 'msMay', 'msJun', 'msJul', 'msAug', 'msSep', 'msOct', 'msNov', 'msDec'],

		days : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		daysShort : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	},
	
	/**
	 * File mimetype to kind mapping
	 * 
	 * @type  Object
	 */
	kinds : 	{
			'unknown'                       : 'Unknown',
			'directory'                     : 'Folder',
			'symlink'                       : 'Alias',
			'symlink-broken'                : 'AliasBroken',
			'application/x-empty'           : 'TextPlain',
			'application/postscript'        : 'Postscript',
			'application/vnd.ms-office'     : 'MsOffice',
			'application/msword'            : 'MsWord',
			'application/vnd.ms-word'       : 'MsWord',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'MsWord',
			'application/vnd.ms-word.document.macroEnabled.12'                        : 'MsWord',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.template' : 'MsWord',
			'application/vnd.ms-word.template.macroEnabled.12'                        : 'MsWord',
			'application/vnd.ms-excel'      : 'MsExcel',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'       : 'MsExcel',
			'application/vnd.ms-excel.sheet.macroEnabled.12'                          : 'MsExcel',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.template'    : 'MsExcel',
			'application/vnd.ms-excel.template.macroEnabled.12'                       : 'MsExcel',
			'application/vnd.ms-excel.sheet.binary.macroEnabled.12'                   : 'MsExcel',
			'application/vnd.ms-excel.addin.macroEnabled.12'                          : 'MsExcel',
			'application/vnd.ms-powerpoint' : 'MsPP',
			'application/vnd.openxmlformats-officedocument.presentationml.presentation' : 'MsPP',
			'application/vnd.ms-powerpoint.presentation.macroEnabled.12'              : 'MsPP',
			'application/vnd.openxmlformats-officedocument.presentationml.slideshow'  : 'MsPP',
			'application/vnd.ms-powerpoint.slideshow.macroEnabled.12'                 : 'MsPP',
			'application/vnd.openxmlformats-officedocument.presentationml.template'   : 'MsPP',
			'application/vnd.ms-powerpoint.template.macroEnabled.12'                  : 'MsPP',
			'application/vnd.ms-powerpoint.addin.macroEnabled.12'                     : 'MsPP',
			'application/vnd.openxmlformats-officedocument.presentationml.slide'      : 'MsPP',
			'application/vnd.ms-powerpoint.slide.macroEnabled.12'                     : 'MsPP',
			'application/pdf'               : 'PDF',
			'application/xml'               : 'XML',
			'application/vnd.oasis.opendocument.text' : 'OO',
			'application/vnd.oasis.opendocument.text-template'         : 'OO',
			'application/vnd.oasis.opendocument.text-web'              : 'OO',
			'application/vnd.oasis.opendocument.text-master'           : 'OO',
			'application/vnd.oasis.opendocument.graphics'              : 'OO',
			'application/vnd.oasis.opendocument.graphics-template'     : 'OO',
			'application/vnd.oasis.opendocument.presentation'          : 'OO',
			'application/vnd.oasis.opendocument.presentation-template' : 'OO',
			'application/vnd.oasis.opendocument.spreadsheet'           : 'OO',
			'application/vnd.oasis.opendocument.spreadsheet-template'  : 'OO',
			'application/vnd.oasis.opendocument.chart'                 : 'OO',
			'application/vnd.oasis.opendocument.formula'               : 'OO',
			'application/vnd.oasis.opendocument.database'              : 'OO',
			'application/vnd.oasis.opendocument.image'                 : 'OO',
			'application/vnd.openofficeorg.extension'                  : 'OO',
			'application/x-shockwave-flash' : 'AppFlash',
			'application/flash-video'       : 'Flash video',
			'application/x-bittorrent'      : 'Torrent',
			'application/javascript'        : 'JS',
			'application/rtf'               : 'RTF',
			'application/rtfd'              : 'RTF',
			'application/x-font-ttf'        : 'TTF',
			'application/x-font-otf'        : 'OTF',
			'application/x-rpm'             : 'RPM',
			'application/x-web-config'      : 'TextPlain',
			'application/xhtml+xml'         : 'HTML',
			'application/docbook+xml'       : 'DOCBOOK',
			'application/x-awk'             : 'AWK',
			'application/x-gzip'            : 'GZIP',
			'application/x-bzip2'           : 'BZIP',
			'application/x-xz'              : 'XZ',
			'application/zip'               : 'ZIP',
			'application/x-zip'               : 'ZIP',
			'application/x-rar'             : 'RAR',
			'application/x-tar'             : 'TAR',
			'application/x-7z-compressed'   : '7z',
			'application/x-jar'             : 'JAR',
			'text/plain'                    : 'TextPlain',
			'text/x-php'                    : 'PHP',
			'text/html'                     : 'HTML',
			'text/javascript'               : 'JS',
			'text/css'                      : 'CSS',
			'text/rtf'                      : 'RTF',
			'text/rtfd'                     : 'RTF',
			'text/x-c'                      : 'C',
			'text/x-csrc'                   : 'C',
			'text/x-chdr'                   : 'CHeader',
			'text/x-c++'                    : 'CPP',
			'text/x-c++src'                 : 'CPP',
			'text/x-c++hdr'                 : 'CPPHeader',
			'text/x-shellscript'            : 'Shell',
			'application/x-csh'             : 'Shell',
			'text/x-python'                 : 'Python',
			'text/x-java'                   : 'Java',
			'text/x-java-source'            : 'Java',
			'text/x-ruby'                   : 'Ruby',
			'text/x-perl'                   : 'Perl',
			'text/x-sql'                    : 'SQL',
			'text/xml'                      : 'XML',
			'text/x-comma-separated-values' : 'CSV',
			'text/x-markdown'               : 'Markdown',
			'image/x-ms-bmp'                : 'BMP',
			'image/jpeg'                    : 'JPEG',
			'image/gif'                     : 'GIF',
			'image/png'                     : 'PNG',
			'image/tiff'                    : 'TIFF',
			'image/x-targa'                 : 'TGA',
			'image/vnd.adobe.photoshop'     : 'PSD',
			'image/xbm'                     : 'XBITMAP',
			'image/pxm'                     : 'PXM',
			'audio/mpeg'                    : 'AudioMPEG',
			'audio/midi'                    : 'AudioMIDI',
			'audio/ogg'                     : 'AudioOGG',
			'audio/mp4'                     : 'AudioMPEG4',
			'audio/x-m4a'                   : 'AudioMPEG4',
			'audio/wav'                     : 'AudioWAV',
			'audio/x-mp3-playlist'          : 'AudioPlaylist',
			'video/x-dv'                    : 'VideoDV',
			'video/mp4'                     : 'VideoMPEG4',
			'video/mpeg'                    : 'VideoMPEG',
			'video/x-msvideo'               : 'VideoAVI',
			'video/quicktime'               : 'VideoMOV',
			'video/x-ms-wmv'                : 'VideoWM',
			'video/x-flv'                   : 'VideoFlash',
			'video/x-matroska'              : 'VideoMKV',
			'video/ogg'                     : 'VideoOGG'
		},
	
	/**
	 * Ajax request data validation rules
	 * 
	 * @type  Object
	 */
	rules : {
		defaults : function(data) {
			if (!data
			|| (data.added && !$.isArray(data.added))
			||  (data.removed && !$.isArray(data.removed))
			||  (data.changed && !$.isArray(data.changed))) {
				return false;
			}
			return true;
		},
		open    : function(data) { return data && data.cwd && data.files && $.isPlainObject(data.cwd) && $.isArray(data.files); },
		tree    : function(data) { return data && data.tree && $.isArray(data.tree); },
		parents : function(data) { return data && data.tree && $.isArray(data.tree); },
		tmb     : function(data) { return data && data.images && ($.isPlainObject(data.images) || $.isArray(data.images)); },
		upload  : function(data) { return data && ($.isPlainObject(data.added) || $.isArray(data.added));},
		search  : function(data) { return data && data.files && $.isArray(data.files)}
	},
	
	/**
	 * Commands costructors
	 *
	 * @type Object
	 */
	commands : {},
	
	/**
	 * Commands to add the item (space delimited)
	 * 
	 * @type String
	 */
	cmdsToAdd : 'archive duplicate extract mkdir mkfile paste rm upload',
	
	parseUploadData : function(text) {
		var data;
		
		if (!$.trim(text)) {
			return {error : ['errResponse', 'errDataEmpty']};
		}
		
		try {
			data = $.parseJSON(text);
		} catch (e) {
			return {error : ['errResponse', 'errDataNotJSON']};
		}
		
		if (!this.validResponse('upload', data)) {
			return {error : ['errResponse']};
		}
		data = this.normalize(data);
		data.removed = $.merge((data.removed || []), $.map(data.added||[], function(f) { return f.hash; }));
		return data;
		
	},
	
	iframeCnt : 0,
	
	uploads : {
		// xhr muiti uploading flag
		xhrUploading: false,
		
		// check file/dir exists
		checkExists: function(files, target, fm) {
			var dfrd = $.Deferred(),
				names, name,
				cancel = function() {
					var i = files.length;
					while (--i > -1) {
						files[i]._remove = true;
					}
				},
				check = function() {
					var renames = [], hashes = {}, existed = [], exists = [], i, c;
					
					var confirm = function(ndx) {
						var last = ndx == exists.length-1,
						opts = {
							title  : fm.i18n('cmdupload'),
							text   : ['errExists', exists[ndx].name, 'confirmRepl'], 
							all    : !last,
							accept : {
								label    : 'btnYes',
								callback : function(all) {
									!last && !all
										? confirm(++ndx)
										: dfrd.resolve(renames, hashes);
								}
							},
							reject : {
								label    : 'btnNo',
								callback : function(all) {
									var i;
	
									if (all) {
										i = exists.length;
										while (ndx < i--) {
											files[exists[i].i]._remove = true;
										}
									} else {
										files[exists[ndx].i]._remove = true;
									}
	
									!last && !all
										? confirm(++ndx)
										: dfrd.resolve(renames, hashes);
								}
							},
							cancel : {
								label    : 'btnCancel',
								callback : function() {
									cancel();
									dfrd.resolve(renames, hashes);
								}
							},
							buttons : [
								{
									label : 'btnBackup',
									callback : function(all) {
										var i;
										if (all) {
											i = exists.length;
											while (ndx < i--) {
												renames.push(exists[i].name);
											}
										} else {
											renames.push(exists[ndx].name);
										}
										!last && !all
											? confirm(++ndx)
											: dfrd.resolve(renames, hashes);
									}
								}
							]
						};
						if (fm.iframeCnt > 0) {
							delete opts.reject;
						}
						fm.confirm(opts);
					};
					
					names = $.map(files, function(file, i) { return file.name? {i: i, name: file.name} : null ;});
					
					name = $.map(names, function(item) { return item.name;});
					fm.request({
						data : {cmd : 'ls', target : target, intersect : name},
						notify : {type : 'preupload', cnt : 1, hideCnt : true},
						preventFail : true
					})
					.done(function(data) {
						var existedArr, cwdItems;
						if (data) {
							if (data.error) {
								cancel();
							} else {
								if (fm.option('uploadOverwrite') && ! fm.UA.iOS) {
									if (data.list) {
										if ($.isArray(data.list)) {
											existed = data.list || [];
										} else {
											existedArr = [];
											existed = $.map(data.list, function(n) {
												if (typeof n === 'string') {
													return n;
												} else {
													// support to >=2.1.11 plugin Normalizer, Sanitizer
													existedArr = existedArr.concat(n);
													return null;
												}
											});
											if (existedArr.length) {
												existed = existed.concat(existedArr);
											}
											hashes = data.list;
										}
										exists = $.map(names, function(name){
											return $.inArray(name.name, existed) !== -1 ? name : null ;
										});
										if (existed.length && target == fm.cwd().hash) {
											cwdItems = $.map(fm.files(), function(file) { return (file.phash == target) ? file.name : null; } );
											if ($.map(existed, function(n) { 
												return cwdItems.indexOf(n) === -1? true : null;
											}).length){
												fm.sync();
											}
										}
									}
								}
							}
						}
						if (exists.length > 0) {
							confirm(0);
						} else {
							dfrd.resolve([]);
						}
					})
					.fail(function(error) {
						cancel();
						dfrd.resolve([]);
						error && fm.error(error);
					});
				};
			if (fm.api >= 2.1 && typeof files[0] == 'object') {
				check();
				return dfrd;
			} else {
				return dfrd.resolve([]);
			}
		},
		
		// check droped contents
		checkFile : function(data, fm, target) {
			if (!!data.checked || data.type == 'files') {
				return data.files;
			} else if (data.type == 'data') {
				var dfrd = $.Deferred(),
				files = [],
				paths = [],
				dirctorys = [],
				entries = [],
				processing = 0,
				items,
				mkdirs = [],
				
				readEntries = function(dirReader) {
					var toArray = function(list) {
						return Array.prototype.slice.call(list || []);
					};
				},
				
				doScan = function(items) {
					var dirReader, entry,
					entries = [],
					toArray = function(list) {
						return Array.prototype.slice.call(list || [], 0);
					};
					var length = items.length;
					for (var i = 0; i < length; i++) {
						entry = items[i];
						if (entry) {
							if (entry.isFile) {
								processing++;
								entry.file(function (file) {
									if (! (fm.OS == 'win' && file.name.match(/^(?:desktop\.ini|thumbs\.db)$/i))
											&&
										! (fm.OS == 'mac' && file.name.match(/^\.ds_store$/i))) {
										paths.push(entry.fullPath || '');
										files.push(file);
									}
									processing--;
								});
							} else if (entry.isDirectory) {
								if (fm.api >= 2.1) {
									processing++;
									mkdirs.push(entry.fullPath);
									dirReader = entry.createReader();
									var entries = [];
									// Call the reader.readEntries() until no more results are returned.
									var readEntries = function() {
										 dirReader.readEntries (function(results) {
											if (!results.length) {
												for (var i = 0; i < entries.length; i++) {
													doScan([entries[i]]);
												}
												processing--;
											} else {
												entries = entries.concat(toArray(results));
												readEntries();
											}
										}, function(){
											processing--;
										});
									};
									readEntries(); // Start reading dirs.
								}
							}
						}
					}
				};
				
				items = $.map(data.files.items, function(item){
					return item.getAsEntry? item.getAsEntry() : item.webkitGetAsEntry();
				});
				if (items.length > 0) {
					fm.uploads.checkExists(items, target, fm).done(function(renames, hashes){
						var notifyto, dfds = [];
						if (fm.option('uploadOverwrite') && ! fm.UA.iOS) {
							items = $.map(items, function(item){
								var i, bak, hash, dfd, hi;
								if (item.isDirectory) {
									i = $.inArray(item.name, renames);
									if (i !== -1) {
										renames.splice(i, 1);
										bak = fm.uniqueName(item.name + fm.options.backupSuffix , null, '');
										$.each(hashes, function(h, name) {
											if (item.name == name) {
												hash = h;
												return false;
											}
										});
										if (! hash) {
											hash = fm.fileByName(item.name, target).hash;
										}
										fm.lockfiles({files : [hash]});
										dfd = fm.request({
											data   : {cmd : 'rename', target : hash, name : bak},
											notify : {type : 'rename', cnt : 1}
										})
										.fail(function(error) {
											item._remove = true;
											fm.sync();
										})
										.always(function() {
											fm.unlockfiles({files : [hash]})
										});
										dfds.push(dfd);
									}
								}
								return !item._remove? item : null;
							});
						}
						$.when.apply($, dfds).done(function(){
							if (items.length > 0) {
								notifyto = setTimeout(function() {
									fm.notify({type : 'readdir', cnt : 1, hideCnt: true});
								}, fm.options.notifyDelay);
								doScan(items);
								setTimeout(function wait() {
									if (processing > 0) {
										setTimeout(wait, 10);
									} else {
										notifyto && clearTimeout(notifyto);
										fm.notify({type : 'readdir', cnt : -1});
										dfrd.resolve([files, paths, renames, hashes, mkdirs]);
									}
								}, 10);
							} else {
								dfrd.reject();
							}
						});
					});
					return dfrd.promise();
				} else {
					return dfrd.reject();
				}
			} else {
				var ret = [];
				var check = [];
				var str = data.files[0];
				if (data.type == 'html') {
					var tmp = $("<html/>").append($.parseHTML(str)),
						atag;
					$('img[src]', tmp).each(function(){
						var url, purl,
						self = $(this),
						pa = self.closest('a');
						if (pa && pa.attr('href') && pa.attr('href').match(/\.(?:jpe?g|gif|bmp|png)/i)) {
							purl = pa.attr('href');
						}
						url = self.attr('src');
						if (url) {
							if (purl) {
								$.inArray(purl, ret) == -1 && ret.push(purl);
								$.inArray(url, check) == -1 &&  check.push(url);
							} else {
								$.inArray(url, ret) == -1 && ret.push(url);
							}
						}
					});
					atag = $('a[href]', tmp);
					atag.each(function(){
						var loc,
							parseUrl = function(url) {
							    var a = document.createElement('a');
							    a.href = url;
							    return a;
							};
						if ($(this).text()) {
							loc = parseUrl($(this).attr('href'));
							if (loc.href && (atag.length === 1 || ! loc.pathname.match(/(?:\.html?|\/[^\/.]*)$/i))) {
								if ($.inArray(loc.href, ret) == -1 && $.inArray(loc.href, check) == -1) ret.push(loc.href);
							}
						}
					});
				} else {
					var regex, m, url;
					regex = /(http[^<>"{}|\\^\[\]`\s]+)/ig;
					while (m = regex.exec(str)) {
						url = m[1].replace(/&amp;/g, '&');
						if ($.inArray(url, ret) == -1) ret.push(url);
					}
				}
				return ret;
			}
		},

		// upload transport using XMLHttpRequest
		xhr : function(data, fm) { 
			var self   = fm ? fm : this,
				node        = self.getUI(),
				xhr         = new XMLHttpRequest(),
				notifyto    = null, notifyto2 = null,
				dataChecked = data.checked,
				isDataType  = (data.isDataType || data.type == 'data'),
				chunkEnable = (self.option('uploadMaxConn') != -1),
				multiMax    = Math.min(5, Math.max(1, self.option('uploadMaxConn'))),
				retry       = 0,
				dfrd   = $.Deferred()
					.fail(function(error) {
						if (self.uploads.xhrUploading) {
							setTimeout(function() { self.sync(); }, 5000);
							self.uploads.xhrUploading = false;
							var file = files.length? (isDataType? files[0][0] : files[0]) : {};
							if (file._cid) {
								formData = new FormData();
								files = [{_chunkfail: true}];
								formData.append('chunk', file._chunk);
								formData.append('cid'  , file._cid);
								isDataType = false;
								send(files);
							}
						}
						files = null;
						error && self.error(error);
					})
					.done(function(data) {
						xhr = null;
						files = null;
						if (data) {
							data.warning && self.error(data.warning);
							data.removed && self.remove(data);
							data.added   && self.add(data);
							data.changed && self.change(data);
		 					self.trigger('upload', data);
							data.sync && self.sync();
						}
					})
					.always(function() {
						// unregist fnAbort function
						node.off('uploadabort', fnAbort);
						$(window).off('unload', fnAbort);
						notifyto && clearTimeout(notifyto);
						notifyto2 && clearTimeout(notifyto2);
						dataChecked && !data.multiupload && checkNotify() && self.notify({type : 'upload', cnt : -cnt, progress : 0, size : 0});
						chunkMerge && self.ui.notify.children('.elfinder-notify-chunkmerge').length && self.notify({type : 'chunkmerge', cnt : -1});
					}),
				formData    = new FormData(),
				target      = (data.target || self.cwd().hash),
				files       = data.input ? data.input.files : self.uploads.checkFile(data, self, target), 
				cnt         = data.checked? (isDataType? files[0].length : files.length) : files.length,
				loaded      = 0, prev,
				filesize    = 0,
				notify      = false,
				abort       = false,
				checkNotify = function() {
					return notify = (notify || self.ui.notify.children('.elfinder-notify-upload').length);
				},
				fnAbort     = function() {
					abort = true;
					if (xhr) {
						xhr.quiet = true;
						xhr.abort();
					}
				},
				startNotify = function(size) {
					if (!size) size = filesize;
					return setTimeout(function() {
						notify = true;
						self.notify({type : 'upload', cnt : cnt, progress : loaded - prev, size : size,
							cancel: function() {
								node.trigger('uploadabort');
							}
						});
						prev = loaded;
					}, self.options.notifyDelay);
				},
				renames = (data.renames || null),
				hashes = (data.hashes || null),
				chunkMerge = false;
			
			// regist fnAbort function
			node.one('uploadabort', fnAbort);
			$(window).one('unload.' + fm.namespace, fnAbort);
			
			!chunkMerge && (prev = loaded);
			
			if (!isDataType && !cnt) {
				return dfrd.reject(['errUploadNoFiles']);
			}
			
			xhr.addEventListener('error', function() {
				dfrd.reject('errConnect');
			}, false);
			
			xhr.addEventListener('abort', function() {
				dfrd.reject(['errConnect', 'errAbort']);
			}, false);
			
			xhr.addEventListener('load', function(e) {
				var status = xhr.status, res, curr = 0, error = '';
				
				if (status >= 400) {
					if (status > 500) {
						error = 'errResponse';
					} else {
						error = 'errConnect';
					}
				} else {
					if (xhr.readyState != 4) {
						error = ['errConnect', 'errTimeout']; // am i right?
					}
					if (!xhr.responseText) {
						error = ['errResponse', 'errDataEmpty'];
					}
				}
				
				if (error) {
					if (chunkMerge || retry++ > 3) {
						var file = isDataType? files[0][0] : files[0];
						return dfrd.reject(file._cid? null : error);
					} else {
						// do retry
						filesize = 0;
						xhr.open('POST', self.uploadURL, true);
						xhr.send(formData);
						return;
					}
				}
				
				loaded = filesize;
				
				if (checkNotify() && (curr = loaded - prev)) {
					self.notify({type : 'upload', cnt : 0, progress : curr, size : 0});
				}

				res = self.parseUploadData(xhr.responseText);
				
				// chunked upload commit
				if (res._chunkmerged) {
					formData = new FormData();
					var _file = [{_chunkmerged: res._chunkmerged, _name: res._name, _mtime: res._mtime}];
					chunkMerge = true;
					notifyto2 = setTimeout(function() {
						self.notify({type : 'chunkmerge', cnt : 1});
					}, self.options.notifyDelay);
					isDataType? send(_file, files[1]) : send(_file);
					return;
				}
				
				res._multiupload = data.multiupload? true : false;
				if (res.error) {
					if (res._chunkfailure) {
						abort = true;
						self.uploads.xhrUploading = false;
						notifyto && clearTimeout(notifyto);
						if (self.ui.notify.children('.elfinder-notify-upload').length) {
							self.notify({type : 'upload', cnt : -cnt, progress : 0, size : 0});
							dfrd.reject(res.error);
						} else {
							// for multi connection
							dfrd.reject();
						}
					} else {
						dfrd.reject(res.error);
					}
				} else {
					dfrd.resolve(res);
				}
			}, false);
			
			xhr.upload.addEventListener('loadstart', function(e) {
				if (!chunkMerge && e.lengthComputable) {
					loaded = e.loaded;
					retry && (loaded = 0);
					filesize = e.total;
					if (!loaded) {
						loaded = parseInt(filesize * 0.05);
					}
					if (checkNotify()) {
						self.notify({type : 'upload', cnt : 0, progress : loaded - prev, size : data.multiupload? 0 : filesize});
						prev = loaded;
					}
				}
			}, false);
			
			xhr.upload.addEventListener('progress', function(e) {
				var curr;

				if (e.lengthComputable && !chunkMerge) {
					
					loaded = e.loaded;

					// to avoid strange bug in safari (not in chrome) with drag&drop.
					// bug: macos finder opened in any folder,
					// reset safari cache (option+command+e), reload elfinder page,
					// drop file from finder
					// on first attempt request starts (progress callback called ones) but never ends.
					// any next drop - successfull.
					if (!data.checked && loaded > 0 && !notifyto) {
						notifyto = startNotify(xhr._totalSize - loaded);
					}
					
					if (!filesize) {
						retry && (loaded = 0);
						filesize = e.total;
						if (!loaded) {
							loaded = parseInt(filesize * 0.05);
						}
					}
					
					curr = loaded - prev;
					if (checkNotify() && (curr/e.total) >= 0.05) {
						self.notify({type : 'upload', cnt : 0, progress : curr, size : 0});
						prev = loaded;
					}
				}
			}, false);
			
			var send = function(files, paths){
				var size = 0,
				fcnt = 1,
				sfiles = [],
				c = 0,
				total = cnt,
				maxFileSize,
				totalSize = 0,
				chunked = [],
				chunkID = new Date().getTime().toString().substr(-9), // for take care of the 32bit backend system
				BYTES_PER_CHUNK = Math.min((fm.uplMaxSize? fm.uplMaxSize : 2097152) - 8190, fm.options.uploadMaxChunkSize), // uplMaxSize margin 8kb or options.uploadMaxChunkSize
				blobSlice = chunkEnable? false : '',
				blobSize, i, start, end, chunks, blob, chunk, added, done, last, failChunk,
				multi = function(files, num){
					var sfiles = [], cid;
					if (!abort) {
						while(files.length && sfiles.length < num) {
							sfiles.push(files.shift());
						}
						if (sfiles.length) {
							for (var i=0; i < sfiles.length; i++) {
								if (abort) {
									break;
								}
								cid = isDataType? (sfiles[i][0][0]._cid || null) : (sfiles[i][0]._cid || null);
								if (!!failChunk[cid]) {
									last--;
									continue;
								}
								fm.exec('upload', {
									type: data.type,
									isDataType: isDataType,
									files: sfiles[i],
									checked: true,
									target: target,
									renames: renames,
									hashes: hashes,
									multiupload: true})
								.fail(function(error) {
									if (cid) {	
										failChunk[cid] = true;
									}
								})
								.always(function(e) {
									if (e && e.added) added = $.merge(added, e.added);
									if (last <= ++done) {
										fm.trigger('multiupload', {added: added});
										notifyto && clearTimeout(notifyto);
										if (checkNotify()) {
											self.notify({type : 'upload', cnt : -cnt, progress : 0, size : 0});
										}
									}
									multi(files, 1); // Next one
								});
							}
						}
					}
					if (sfiles.length < 1 || abort) {
						if (abort) {
							notifyto && clearTimeout(notifyto);
							if (cid) {
								failChunk[cid] = true;
							}
							dfrd.reject();
						} else {
							dfrd.resolve();
							self.uploads.xhrUploading = false;
						}
					}
				},
				check = function(){
					if (!self.uploads.xhrUploading) {
						self.uploads.xhrUploading = true;
						multi(sfiles, multiMax); // Max connection: 3
					} else {
						setTimeout(function(){ check(); }, 100);
					}
				};

				if (! dataChecked && (isDataType || data.type == 'files')) {
					maxFileSize = fm.option('uploadMaxSize')? fm.option('uploadMaxSize') : 0;
					for (i=0; i < files.length; i++) {
						blob = files[i];
						blobSize = blob.size;
						if (blobSlice === false) {
							blobSlice = '';
							if (self.api >= 2.1) {
								if ('slice' in blob) {
									blobSlice = 'slice';
								} else if ('mozSlice' in blob) {
									blobSlice = 'mozSlice';
								} else if ('webkitSlice' in blob) {
									blobSlice = 'webkitSlice';
								}
							}
						}
						
						if ((maxFileSize && blobSize > maxFileSize) || (!blobSlice && fm.uplMaxSize && blobSize > fm.uplMaxSize)) {
							self.error(self.i18n('errUploadFile', blob.name) + ' ' + self.i18n('errUploadFileSize'));
							cnt--;
							total--;
							continue;
						}
						
						if (blobSlice && blobSize > BYTES_PER_CHUNK) {
							start = 0;
							end = BYTES_PER_CHUNK;
							chunks = -1;
							total = Math.floor(blobSize / BYTES_PER_CHUNK);

							totalSize += blobSize;
							chunked[chunkID] = 0;
							while(start <= blobSize) {
								chunk = blob[blobSlice](start, end);
								chunk._chunk = blob.name + '.' + (++chunks) + '_' + total + '.part';
								chunk._cid   = chunkID;
								chunk._range = start + ',' + chunk.size + ',' + blobSize;
								chunked[chunkID]++;
								
								if (size) {
									c++;
								}
								if (typeof sfiles[c] == 'undefined') {
									sfiles[c] = [];
									if (isDataType) {
										sfiles[c][0] = [];
										sfiles[c][1] = [];
									}
								}
								size = BYTES_PER_CHUNK;
								fcnt = 1;
								if (isDataType) {
									sfiles[c][0].push(chunk);
									sfiles[c][1].push(paths[i]);
								} else {
									sfiles[c].push(chunk);
								}

								start = end;
								end = start + BYTES_PER_CHUNK;
							}
							if (chunk == null) {
								self.error(self.i18n('errUploadFile', blob.name) + ' ' + self.i18n('errUploadFileSize'));
								cnt--;
								total--;
							} else {
								total += chunks;
							}
							continue;
						}
						if ((fm.uplMaxSize && size + blobSize >= fm.uplMaxSize) || fcnt > fm.uplMaxFile) {
							size = 0;
							fcnt = 1;
							c++;
						}
						if (typeof sfiles[c] == 'undefined') {
							sfiles[c] = [];
							if (isDataType) {
								sfiles[c][0] = [];
								sfiles[c][1] = [];
							}
						}
						if (isDataType) {
							sfiles[c][0].push(blob);
							sfiles[c][1].push(paths[i]);
						} else {
							sfiles[c].push(blob);
						}
						size += blobSize;
						totalSize += blobSize;
						fcnt++;
					}
					
					if (sfiles.length == 0) {
						// no data
						data.checked = true;
						return false;
					}
					
					if (sfiles.length > 1) {
						// multi upload
						notifyto = startNotify(totalSize);
						added = [];
						done = 0;
						last = sfiles.length;
						failChunk = [];
						check();
						return true;
					}
					
					// single upload
					if (isDataType) {
						files = sfiles[0][0];
						paths = sfiles[0][1];
					} else {
						files = sfiles[0];
					}
				}
				
				if (!dataChecked) {
					if (!fm.UA.Safari || !data.files) {
						notifyto = startNotify(totalSize);
					} else {
						xhr._totalSize = totalSize;
					}
				}
				
				dataChecked = true;
				
				if (! files.length) {
					dfrd.reject(['errUploadNoFiles']);
				}
				
				xhr.open('POST', self.uploadURL, true);
				
				// set request headers
				if (fm.customHeaders) {
					$.each(fm.customHeaders, function(key) {
						xhr.setRequestHeader(key, this);
					});
				}
				
				// set xhrFields
				if (fm.xhrFields) {
					$.each(fm.xhrFields, function(key) {
						if (key in xhr) {
							xhr[key] = this;
						}
					});
				}

				formData.append('cmd', 'upload');
				formData.append(self.newAPI ? 'target' : 'current', target);
				if (renames && renames.length) {
					$.each(renames, function(i, v) {
						formData.append('renames[]', v);
					});
					formData.append('suffix', fm.options.backupSuffix);
				}
				if (hashes) {
					$.each(hashes, function(i, v) {
						formData.append('hashes['+ i +']', v);
					});
				}
				$.each(self.options.customData, function(key, val) {
					formData.append(key, val);
				});
				$.each(self.options.onlyMimes, function(i, mime) {
					formData.append('mimes['+i+']', mime);
				});
				
				$.each(files, function(i, file) {
					if (file._chunkmerged) {
						formData.append('chunk', file._chunkmerged);
						formData.append('upload[]', file._name);
						formData.append('mtime[]', file._mtime);
					} else {
						if (file._chunkfail) {
							formData.append('upload[]', 'chunkfail');
							formData.append('mimes', 'chunkfail');
						} else {
							formData.append('upload[]', file);
						}
						if (file._chunk) {
							formData.append('chunk', file._chunk);
							formData.append('cid'  , file._cid);
							formData.append('range', file._range);
						}
						formData.append('mtime[]', file.lastModified? Math.round(file.lastModified/1000) : 0);
					}
					if (fm.UA.iOS) {
						formData.append('overwrite', 0);
					}
				});
				
				if (isDataType) {
					$.each(paths, function(i, path) {
						formData.append('upload_path[]', path);
					});
				}
				
				
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4 && xhr.status == 0) {
						if (abort) {
							dfrd.reject();
						} else {
							var errors = ['errAbort'];
							// ff bug while send zero sized file
							// for safari - send directory
							if (!isDataType && data.files && $.map(data.files, function(f){return f.size === 0? f : null;}).length) {
								errors.push('errFolderUpload');
							}
							dfrd.reject(errors);
						}
					}
				};
				
				xhr.send(formData);
				
				return true;
			};
			
			if (! isDataType) {
				if (files.length > 0) {
					if (renames == null) {
						renames = [];
						hashes = {};
						self.uploads.checkExists(files, target, fm).done(
							function(res, res2){
								if (fm.option('uploadOverwrite') && ! fm.UA.iOS) {
									renames = res;
									hashes = res2;
									files = $.map(files, function(file){return !file._remove? file : null ;});
								}
								cnt = files.length;
								if (cnt > 0) {
									if (! send(files)) {
										dfrd.reject();
									}
								} else {
									dfrd.reject();
								}
							}
						);
					} else {
						if (! send(files)) {
							dfrd.reject();
						}
					}
				} else {
					dfrd.reject();
				}
			} else {
				if (dataChecked) {
					send(files[0], files[1]);
				} else {
					files.done(function(result) { // result: [files, paths, renames, hashes, mkdirs]
						renames = [];
						cnt = result[0].length;
						if (cnt) {
							if (result[4] && result[4].length) {
								// ensure directories
								fm.request({
									data   : {cmd : 'mkdir', target : target, dirs : result[4]},
									notify : {type : 'mkdir', cnt : result[4].length}
								})
								.fail(function(error) {
									error = error || ['errUnknown'];
									if (error[0] === 'errCmdParams') {
										multiMax = 1;
									} else {
										multiMax = 0;
										dfrd.reject(error);
									}
								})
								.done(function(data) {
									if (data.hashes) {
										result[1] = $.map(result[1], function(p) {
											p = p.replace(/\/[^\/]*$/, '');
											if (p === '') {
												return target;
											} else {
												return data.hashes[p];
											}
										});
									}
								})
								.always(function(data) {
									if (multiMax) {
										renames = result[2];
										hashes = result[3];
										send(result[0], result[1]);
									}
								});
								return;
							} else {
								result[1] = $.map(result[1], function() { return target; });
							}
							renames = result[2];
							hashes = result[3];
							send(result[0], result[1]);
						} else {
							dfrd.reject(['errUploadNoFiles']);
						}
					}).fail(function(){
						dfrd.reject();
					});
				}
			}

			return dfrd;
		},
		
		// upload transport using iframe
		iframe : function(data, fm) { 
			var self   = fm ? fm : this,
				input  = data.input? data.input : false,
				files  = !input ? self.uploads.checkFile(data, self) : false,
				dfrd   = $.Deferred()
					.fail(function(error) {
						error && self.error(error);
					})
					.done(function(data) {
						data.warning && self.error(data.warning);
						data.removed && self.remove(data);
						data.added   && self.add(data);
						data.changed && self.change(data);
						self.trigger('upload', data);
						data.sync && self.sync();
					}),
				name = 'iframe-'+namespace+(++self.iframeCnt),
				form = $('<form action="'+self.uploadURL+'" method="post" enctype="multipart/form-data" encoding="multipart/form-data" target="'+name+'" style="display:none"><input type="hidden" name="cmd" value="upload" /></form>'),
				msie = this.UA.IE,
				// clear timeouts, close notification dialog, remove form/iframe
				onload = function() {
					abortto  && clearTimeout(abortto);
					notifyto && clearTimeout(notifyto);
					notify   && self.notify({type : 'upload', cnt : -cnt});
					
					setTimeout(function() {
						msie && $('<iframe src="javascript:false;"/>').appendTo(form);
						form.remove();
						iframe.remove();
					}, 100);
				},
				iframe = $('<iframe src="'+(msie ? 'javascript:false;' : 'about:blank')+'" name="'+name+'" style="position:absolute;left:-1000px;top:-1000px" />')
					.on('load', function() {
						iframe.off('load')
							.on('load', function() {
								//var data = self.parseUploadData(iframe.contents().text());
								
								onload();
								dfrd.reject();
								//data.error ? dfrd.reject(data.error) : dfrd.resolve(data);
							});
							
							// notify dialog
							notifyto = setTimeout(function() {
								notify = true;
								self.notify({type : 'upload', cnt : cnt});
							}, self.options.notifyDelay);
							
							// emulate abort on timeout
							if (self.options.iframeTimeout > 0) {
								abortto = setTimeout(function() {
									onload();
									dfrd.reject([errors.connect, errors.timeout]);
								}, self.options.iframeTimeout);
							}
							
							form.submit();
					}),
				target  = (data.target || self.cwd().hash),
				names   = [],
				dfds    = [],
				renames = [],
				hashes  = {},
				cnt, notify, notifyto, abortto;

			if (files && files.length) {
				$.each(files, function(i, val) {
					form.append('<input type="hidden" name="upload[]" value="'+val+'"/>');
				});
				cnt = 1;
			} else if (input && $(input).is(':file') && $(input).val()) {
				if (fm.option('uploadOverwrite') && ! fm.UA.iOS) {
					names = input.files? input.files : [{ name: $(input).val().replace(/^(?:.+[\\\/])?([^\\\/]+)$/, '$1') }];
					//names = $.map(names, function(file){return file.name? { name: file.name } : null ;});
					dfds.push(self.uploads.checkExists(names, target, self).done(
						function(res, res2){
							renames = res;
							hashes = res2;
							cnt = $.map(names, function(file){return !file._remove? file : null ;}).length;
							if (cnt != names.length) {
								cnt = 0;
							}
						}
					));
				}
				cnt = input.files ? input.files.length : 1;
				form.append(input);
			} else {
				return dfrd.reject();
			}
			
			$.when.apply($, dfds).done(function() {
				if (cnt < 1) {
					return dfrd.reject();
				}
				form.append('<input type="hidden" name="'+(self.newAPI ? 'target' : 'current')+'" value="'+target+'"/>')
					.append('<input type="hidden" name="html" value="1"/>')
					.append('<input type="hidden" name="node" value="'+self.id+'"/>')
					.append($(input).attr('name', 'upload[]'));
				
				if (renames.length > 0) {
					$.each(renames, function(i, rename) {
						form.append('<input type="hidden" name="renames[]" value="'+self.escape(rename)+'"/>');
					});
					form.append('<input type="hidden" name="suffix" value="'+fm.options.backupSuffix+'"/>');
				}
				if (hashes) {
					$.each(renames, function(i, v) {
						form.append('<input type="hidden" name="['+i+']" value="'+self.escape(v)+'"/>');
					});
				}
				
				$.each(self.options.onlyMimes||[], function(i, mime) {
					form.append('<input type="hidden" name="mimes[]" value="'+self.escape(mime)+'"/>');
				});
				
				$.each(self.options.customData, function(key, val) {
					form.append('<input type="hidden" name="'+key+'" value="'+self.escape(val)+'"/>');
				});
				
				form.appendTo('body');
				iframe.appendTo('body');
			});
			
			return dfrd;
		}
	},
	
	
	/**
	 * Bind callback to event(s) The callback is executed at most once per event.
	 * To bind to multiply events at once, separate events names by space
	 *
	 * @param  String    event name
	 * @param  Function  callback
	 * @return elFinder
	 */
	one : function(event, callback) {
		var self = this,
			h    = function(e, f) {
				setTimeout(function() {self.unbind(event, h);}, 3);
				return callback.apply(self.getListeners(e.type), arguments);
			};
		return this.bind(event, h);
	},
	
	/**
	 * Set/get data into/from localStorage
	 *
	 * @param  String       key
	 * @param  String|void  value
	 * @return String
	 */
	localStorage : function(key, val) {
		var s      = window.localStorage,
			oldkey = 'elfinder-'+key+this.id, // old key of elFinder < 2.1.6
			retval, oldval;

		// new key of elFinder >= 2.1.6
		key = window.location.pathname+'-elfinder-'+key+this.id;
		
		if (val === null) {
			return s.removeItem(key);
		}
		
		if (val === void(0) && !(retval = s.getItem(key)) && (oldval = s.getItem(oldkey))) {
			val = oldval;
			s.removeItem(oldkey);
		}
		
		if (val !== void(0)) {
			try {
				s.setItem(key, val);
			} catch (e) {
				s.clear();
				s.setItem(key, val);
			}
			retval = s.getItem(key);
		}

		return retval;
	},
	
	/**
	 * Get/set cookie
	 *
	 * @param  String       cookie name
	 * @param  String|void  cookie value
	 * @return String
	 */
	cookie : function(name, value) {
		var d, o, c, i;

		name = 'elfinder-'+name+this.id;

		if (value === void(0)) {
			if (document.cookie && document.cookie != '') {
				c = document.cookie.split(';');
				name += '=';
				for (i=0; i<c.length; i++) {
					c[i] = $.trim(c[i]);
					if (c[i].substring(0, name.length) == name) {
						return decodeURIComponent(c[i].substring(name.length));
					}
				}
			}
			return '';
		}

		o = $.extend({}, this.options.cookie);
		if (value === null) {
			value = '';
			o.expires = -1;
		}
		if (typeof(o.expires) == 'number') {
			d = new Date();
			d.setTime(d.getTime()+(o.expires * 86400000));
			o.expires = d;
		}
		document.cookie = name+'='+encodeURIComponent(value)+'; expires='+o.expires.toUTCString()+(o.path ? '; path='+o.path : '')+(o.domain ? '; domain='+o.domain : '')+(o.secure ? '; secure' : '');
		return value;
	},
	
	/**
	 * Get start directory (by location.hash or last opened directory)
	 * 
	 * @return String
	 */
	startDir : function() {
		var locHash = window.location.hash;
		if (locHash && locHash.match(/^#elf_/)) {
			return locHash.replace(/^#elf_/, '');
		} else if (this.options.startPathHash) {
			return this.options.startPathHash;
		} else {
			return this.lastDir();
		}
	},
	
	/**
	 * Get/set last opened directory
	 * 
	 * @param  String|undefined  dir hash
	 * @return String
	 */
	lastDir : function(hash) { 
		return this.options.rememberLastDir ? this.storage('lastdir', hash) : '';
	},
	
	/**
	 * Node for escape html entities in texts
	 * 
	 * @type jQuery
	 */
	_node : $('<span/>'),
	
	/**
	 * Replace not html-safe symbols to html entities
	 * 
	 * @param  String  text to escape
	 * @return String
	 */
	escape : function(name) {
		return this._node.text(name).html().replace(/"/g, '&quot;').replace(/'/g, '&#039;');
	},
	
	/**
	 * Cleanup ajax data.
	 * For old api convert data into new api format
	 * 
	 * @param  String  command name
	 * @param  Object  data from backend
	 * @return Object
	 */
	normalize : function(data) {
		var filter = function(file) { 
		
			if (file && file.hash && file.name && file.mime) {
				if (file.mime == 'application/x-empty') {
					file.mime = 'text/plain';
				}
				return file;
			}
			return null;
		};
		

		if (data.files) {
			data.files = $.map(data.files, filter);
		} 
		if (data.tree) {
			data.tree = $.map(data.tree, filter);
		}
		if (data.added) {
			data.added = $.map(data.added, filter);
		}
		if (data.changed) {
			data.changed = $.map(data.changed, filter);
		}
		if (data.api) {
			data.init = true;
		}
		return data;
	},
	
	/**
	 * Update sort options
	 *
	 * @param {String} sort type
	 * @param {String} sort order
	 * @param {Boolean} show folder first
	 */
	setSort : function(type, order, stickFolders) {
		this.storage('sortType', (this.sortType = this.sortRules[type] ? type : 'name'));
		this.storage('sortOrder', (this.sortOrder = /asc|desc/.test(order) ? order : 'asc'));
		this.storage('sortStickFolders', (this.sortStickFolders = !!stickFolders) ? 1 : '');
		this.trigger('sortchange');
	},
	
	_sortRules : {
		name : function(file1, file2) {
			var n1 = file1.name.toLowerCase(),
			    n2 = file2.name.toLowerCase(),
			    e1 = '',
			    e2 = '',
			    so = elFinder.prototype.naturalCompare,
			    m, ret;
			if (m = n1.match(/^(.+)(\.[0-9a-z.]+)$/)) {
				n1 = m[1];
				e1 = m[2];
			}
			if (m = n2.match(/^(.+)(\.[0-9a-z.]+)$/)) {
				n2 = m[1];
				e2 = m[2];
			}
			ret = so(n1, n2);
			if (ret == 0 && (e1 || e2) && e1 != e2) {
				ret = so(e1, e2);
			}
			return ret;
		},
		size : function(file1, file2) { 
			var size1 = parseInt(file1.size) || 0,
				size2 = parseInt(file2.size) || 0;
				
			return size1 == size2 ? 0 : size1 > size2 ? 1 : -1;
		},
		kind : function(file1, file2) {
			return elFinder.prototype.naturalCompare(file1.mime, file2.mime);
		},
		date : function(file1, file2) { 
			var date1 = file1.ts || file1.date,
				date2 = file2.ts || file2.date;

			return date1 == date2 ? 0 : date1 > date2 ? 1 : -1
		}
	},
	
	/**
	 * Compare strings for natural sort
	 *
	 * @param  String
	 * @param  String
	 * @return Number
	 */
	naturalCompare : function(a, b) {
		var self = elFinder.prototype.naturalCompare;
		if (typeof self.loc == 'undefined') {
			self.loc = (navigator.userLanguage || navigator.browserLanguage || navigator.language || 'en-US');
		}
		if (typeof self.sort == 'undefined') {
			if ('11'.localeCompare('2', self.loc, {numeric: true}) > 0) {
				// Native support
				if (window.Intl && window.Intl.Collator) {
					self.sort = new Intl.Collator(self.loc, {numeric: true}).compare;
				} else {
					self.sort = function(a, b) {
						return a.localeCompare(b, self.loc, {numeric: true});
					};
				}
			} else {
				/*
				 * Edited for elFinder (emulates localeCompare() by numeric) by Naoki Sawada aka nao-pon
				 */
				/*
				 * Huddle/javascript-natural-sort (https://github.com/Huddle/javascript-natural-sort)
				 */
				/*
				 * Natural Sort algorithm for Javascript - Version 0.7 - Released under MIT license
				 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
				 * http://opensource.org/licenses/mit-license.php
				 */
				self.sort = function(a, b) {
					var re = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
					sre = /(^[ ]*|[ ]*$)/g,
					dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
					hre = /^0x[0-9a-f]+$/i,
					ore = /^0/,
					syre = /^[\x01\x21-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e]/, // symbol first - (Naoki Sawada)
					i = function(s) { return self.sort.insensitive && (''+s).toLowerCase() || ''+s },
					// convert all to strings strip whitespace
					// first character is "_", it's smallest - (Naoki Sawada)
					x = i(a).replace(sre, '').replace(/^_/, "\x01") || '',
					y = i(b).replace(sre, '').replace(/^_/, "\x01") || '',
					// chunk/tokenize
					xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
					yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
					// numeric, hex or date detection
					xD = parseInt(x.match(hre)) || (xN.length != 1 && x.match(dre) && Date.parse(x)),
					yD = parseInt(y.match(hre)) || xD && y.match(dre) && Date.parse(y) || null,
					oFxNcL, oFyNcL,
					locRes = 0;

					// first try and sort Hex codes or Dates
					if (yD) {
						if ( xD < yD ) return -1;
						else if ( xD > yD ) return 1;
					}
					// natural sorting through split numeric strings and default strings
					for(var cLoc=0, numS=Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {

						// find floats not starting with '0', string or 0 if not defined (Clint Priest)
						oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
						oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;

						// handle numeric vs string comparison - number < string - (Kyle Adams)
						// but symbol first < number - (Naoki Sawada)
						if (isNaN(oFxNcL) !== isNaN(oFyNcL)) {
							if (isNaN(oFxNcL) && (typeof oFxNcL !== 'string' || ! oFxNcL.match(syre))) {
								return 1;
							} else if (typeof oFyNcL !== 'string' || ! oFyNcL.match(syre)) {
								return -1;
							}
						}

						// use decimal number comparison if either value is string zero
						if (parseInt(oFxNcL, 10) === 0) oFxNcL = 0;
						if (parseInt(oFyNcL, 10) === 0) oFyNcL = 0;

						// rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
						if (typeof oFxNcL !== typeof oFyNcL) {
							oFxNcL += '';
							oFyNcL += '';
						}

						// use locale sensitive sort for strings when case insensitive
						// note: localeCompare interleaves uppercase with lowercase (e.g. A,a,B,b)
						if (self.sort.insensitive && typeof oFxNcL === 'string' && typeof oFyNcL === 'string') {
							locRes = oFxNcL.localeCompare(oFyNcL, self.loc);
							if (locRes !== 0) return locRes;
						}

						if (oFxNcL < oFyNcL) return -1;
						if (oFxNcL > oFyNcL) return 1;
					}
					return 0;
				};
				self.sort.insensitive = true;
			}
		}
		return self.sort(a, b);
	},
	
	/**
	 * Compare files based on elFinder.sort
	 *
	 * @param  Object  file
	 * @param  Object  file
	 * @return Number
	 */
	compare : function(file1, file2) {
		var self  = this,
			type  = self.sortType,
			asc   = self.sortOrder == 'asc',
			stick = self.sortStickFolders,
			rules = self.sortRules,
			sort  = rules[type],
			d1    = file1.mime == 'directory',
			d2    = file2.mime == 'directory',
			res;
			
		if (stick) {
			if (d1 && !d2) {
				return -1;
			} else if (!d1 && d2) {
				return 1;
			}
		}
		
		res = asc ? sort(file1, file2) : sort(file2, file1);
		
		return type != 'name' && res == 0
			? res = asc ? rules.name(file1, file2) : rules.name(file2, file1)
			: res;
	},
	
	/**
	 * Sort files based on config
	 *
	 * @param  Array  files
	 * @return Array
	 */
	sortFiles : function(files) {
		return files.sort(this.compare);
	},
	
	/**
	 * Open notification dialog 
	 * and append/update message for required notification type.
	 *
	 * @param  Object  options
	 * @example  
	 * this.notify({
	 *    type : 'copy',
	 *    msg : 'Copy files', // not required for known types @see this.notifyType
	 *    cnt : 3,
	 *    hideCnt  : false,   // true for not show count
	 *    progress : 10,      // progress bar percents (use cnt : 0 to update progress bar)
	 *    cancel   : callback // callback function for cancel button
	 * })
	 * @return elFinder
	 */
	notify : function(opts) {
		var type     = opts.type,
			msg      = this.messages['ntf'+type] ? this.i18n('ntf'+type) : this.i18n('ntfsmth'),
			ndialog  = this.ui.notify,
			notify   = ndialog.children('.elfinder-notify-'+type),
			button   = notify.children('div.elfinder-notify-cancel').children('button'),
			ntpl     = '<div class="elfinder-notify elfinder-notify-{type}"><span class="elfinder-dialog-icon elfinder-dialog-icon-{type}"/><span class="elfinder-notify-msg">{msg}</span> <span class="elfinder-notify-cnt"/><div class="elfinder-notify-progressbar"><div class="elfinder-notify-progress"/></div><div class="elfinder-notify-cancel"/></div>',
			delta    = opts.cnt,
			size     = (typeof opts.size != 'undefined')? parseInt(opts.size) : null,
			progress = (typeof opts.progress != 'undefined' && opts.progress >= 0) ? opts.progress : null,
			cancel   = opts.cancel,
			clhover  = 'ui-state-hover',
			close    = function() {
				notify._esc && $(document).off('keydown', notify._esc);
				notify.remove();
				!ndialog.children().length && ndialog.elfinderdialog('close');
			},
			cnt, total, prc;

		if (!type) {
			return this;
		}
		
		if (!notify.length) {
			notify = $(ntpl.replace(/\{type\}/g, type).replace(/\{msg\}/g, msg))
				.appendTo(ndialog)
				.data('cnt', 0);

			if (progress != null) {
				notify.data({progress : 0, total : 0});
			}

			if (cancel) {
				button = $('<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"><span class="ui-button-text">'+this.i18n('btnCancel')+'</span></button>')
					.hover(function(e) { 
						$(this).toggleClass(clhover, e.type == 'mouseenter');
					});
				notify.children('div.elfinder-notify-cancel').append(button);
			}
		}

		cnt = delta + parseInt(notify.data('cnt'));
		
		if (cnt > 0) {
			if (cancel && button.length) {
				if ($.isFunction(cancel) || (typeof cancel === 'object' && cancel.promise)) {
					notify._esc = function(e) {
						if (e.type == 'keydown' && e.keyCode != $.ui.keyCode.ESCAPE) {
							return;
						}
						e.preventDefault();
						e.stopPropagation();
						close();
						if (cancel.promise) {
							if (cancel.xhr) {
								cancel.xhr.quiet = true;
								cancel.xhr.abort();
							}
							cancel.reject();
						} else {
							cancel(e);
						}
					};
					button.on('click', function(e) {
						notify._esc(e);
					});
					$(document).on('keydown.' + this.namespace, notify._esc);
				}
			}
			
			!opts.hideCnt && notify.children('.elfinder-notify-cnt').text('('+cnt+')');
			ndialog.is(':hidden') && ndialog.elfinderdialog('open');
			notify.data('cnt', cnt);
			
			if ((progress != null)
			&& (total = notify.data('total')) >= 0
			&& (prc = notify.data('progress')) >= 0) {

				total += size != null? size : delta;
				prc   += progress;
				(size == null && delta < 0) && (prc += delta * 100);
				notify.data({progress : prc, total : total});
				if (size != null) {
					prc *= 100;
					total = Math.max(1, total);
				}
				progress = parseInt(prc/total);
				
				notify.find('.elfinder-notify-progress')
					.animate({
						width : (progress < 100 ? progress : 100)+'%'
					}, 20);
			}
			
		} else {
			close();
		}
		
		return this;
	},
	
	/**
	 * Open confirmation dialog 
	 *
	 * @param  Object  options
	 * @example  
	 * this.confirm({
	 *    title : 'Remove files',
	 *    text  : 'Here is question text',
	 *    accept : {  // accept callback - required
	 *      label : 'Continue',
	 *      callback : function(applyToAll) { fm.log('Ok') }
	 *    },
	 *    cancel : { // cancel callback - required
	 *      label : 'Cancel',
	 *      callback : function() { fm.log('Cancel')}
	 *    },
	 *    reject : { // reject callback - optionally
	 *      label : 'No',
	 *      callback : function(applyToAll) { fm.log('No')}
	 *    },
	 *    buttons : [ // additional buttons callback - optionally
	 *      {
	 *        label : 'Btn1',
	 *        callback : function(applyToAll) { fm.log('Btn1')}
	 *      }
	 *    ],
	 *    all : true  // display checkbox "Apply to all"
	 * })
	 * @return elFinder
	 */
	confirm : function(opts) {
		var self     = this,
			complete = false,
			options = {
				cssClass  : 'elfinder-dialog-confirm',
				modal     : true,
				resizable : false,
				title     : this.i18n(opts.title || 'confirmReq'),
				buttons   : {},
				close     : function() { 
					!complete && opts.cancel.callback();
					$(this).elfinderdialog('destroy');
				}
			},
			apply = this.i18n('apllyAll'),
			label, checkbox;

		
		options.buttons[this.i18n(opts.accept.label)] = function() {
			opts.accept.callback(!!(checkbox && checkbox.prop('checked')))
			complete = true;
			$(this).elfinderdialog('close');
		};
		
		if (opts.reject) {
			options.buttons[this.i18n(opts.reject.label)] = function() {
				opts.reject.callback(!!(checkbox && checkbox.prop('checked')))
				complete = true;
				$(this).elfinderdialog('close');
			};
		}
		
		if (opts.buttons && opts.buttons.length > 0) {
			$.each(opts.buttons, function(i, v){
				options.buttons[self.i18n(v.label)] = function() {
					v.callback(!!(checkbox && checkbox.prop('checked')))
					complete = true;
					$(this).elfinderdialog('close');
				};
			});
		}
		
		options.buttons[this.i18n(opts.cancel.label)] = function() {
			$(this).elfinderdialog('close');
		};
		
		if (opts.all) {
			options.create = function() {
				var base = $('<div class="elfinder-dialog-confirm-applyall"/>');
				checkbox = $('<input type="checkbox" />');
				$(this).next().find('.ui-dialog-buttonset')
					.prepend(base.append($('<label>'+apply+'</label>').prepend(checkbox)));
			}
		}
		
		return this.dialog('<span class="elfinder-dialog-icon elfinder-dialog-icon-confirm"/>' + this.i18n(opts.text), options);
	},
	
	/**
	 * Create unique file name in required dir
	 * 
	 * @param  String  file name
	 * @param  String  parent dir hash
	 * @param  String  glue
	 * @return String
	 */
	uniqueName : function(prefix, phash, glue) {
		var i = 0, ext = '', p, name;
		
		prefix = this.i18n(prefix); 
		phash = phash || this.cwd().hash;
		glue = (typeof glue === 'undefined')? ' ' : glue;

		if (p = prefix.match(/^(.+)(\.[^.]+)$/)) {
			ext    = p[2];
			prefix = p[1];
		}
		
		name   = prefix+ext;
		
		if (!this.fileByName(name, phash)) {
			return name;
		}
		while (i < 10000) {
			name = prefix + glue + (++i) + ext;
			if (!this.fileByName(name, phash)) {
				return name;
			}
		}
		return prefix + Math.random() + ext;
	},
	
	/**
	 * Return message translated onto current language
	 * Allowed accept HTML element that was wrapped in jQuery object
	 * To be careful to XSS vulnerability of HTML element Ex. You should use `fm.escape(file.name)`
	 *
	 * @param  String|Array  message[s]|Object jQuery
	 * @return String
	 **/
	i18n : function() {
		var self = this,
			messages = this.messages, 
			input    = [],
			ignore   = [], 
			message = function(m) {
				var file;
				if (m.indexOf('#') === 0) {
					if ((file = self.file(m.substr(1)))) {
						return file.name;
					}
				}
				return m;
			},
			i, j, m;
			
		for (i = 0; i< arguments.length; i++) {
			m = arguments[i];
			
			if (typeof m == 'string') {
				input.push(message(m));
			} else if ($.isArray(m)) {
				for (j = 0; j < m.length; j++) {
					if (typeof m[j] == 'string') {
						input.push(message(m[j]));
					} else if (m[j] instanceof jQuery) {
						// jQuery object is HTML element
						input.push(m[j]);
					}
				}
			} else if (m instanceof jQuery) {
				// jQuery object is HTML element
				input.push(m[j]);
			}
		}
		
		for (i = 0; i < input.length; i++) {
			// dont translate placeholders
			if ($.inArray(i, ignore) !== -1) {
				continue;
			}
			m = input[i];
			if (typeof m == 'string') {
				// translate message
				m = messages[m] || self.escape(m);
				// replace placeholders in message
				m = m.replace(/\$(\d+)/g, function(match, placeholder) {
					placeholder = i + parseInt(placeholder);
					if (placeholder > 0 && input[placeholder]) {
						ignore.push(placeholder)
					}
					return self.escape(input[placeholder]) || '';
				});
			} else {
				// get HTML from jQuery object
				m = m.get(0).outerHTML;
			}

			input[i] = m;
		}

		return $.map(input, function(m, i) { return $.inArray(i, ignore) === -1 ? m : null; }).join('<br>');
	},
	
	/**
	 * Convert mimetype into css classes
	 * 
	 * @param  String  file mimetype
	 * @return String
	 */
	mime2class : function(mime) {
		var prefix = 'elfinder-cwd-icon-';
		
		mime = mime.split('/');
		
		return prefix+mime[0]+(mime[0] != 'image' && mime[1] ? ' '+prefix+mime[1].replace(/(\.|\+)/g, '-') : '');
	},
	
	/**
	 * Return localized kind of file
	 * 
	 * @param  Object|String  file or file mimetype
	 * @return String
	 */
	mime2kind : function(f) {
		var mime = typeof(f) == 'object' ? f.mime : f, kind;
		
		if (f.alias && f.mime != 'symlink-broken') {
			kind = 'Alias';
		} else if (this.kinds[mime]) {
			kind = this.kinds[mime];
		} else {
			if (mime.indexOf('text') === 0) {
				kind = 'Text';
			} else if (mime.indexOf('image') === 0) {
				kind = 'Image';
			} else if (mime.indexOf('audio') === 0) {
				kind = 'Audio';
			} else if (mime.indexOf('video') === 0) {
				kind = 'Video';
			} else if (mime.indexOf('application') === 0) {
				kind = 'App';
			} else {
				kind = mime;
			}
		}
		
		return this.messages['kind'+kind] ? this.i18n('kind'+kind) : mime;
	},
	
	/**
	 * Return localized date
	 * 
	 * @param  Object  file object
	 * @return String
	 */
	formatDate : function(file, ts) {
		var self = this, 
			ts   = ts || file.ts, 
			i18  = self.i18,
			date, format, output, d, dw, m, y, h, g, i, s;

		if (self.options.clientFormatDate && ts > 0) {

			date = new Date(ts*1000);
			
			h  = date[self.getHours]();
			g  = h > 12 ? h - 12 : h;
			i  = date[self.getMinutes]();
			s  = date[self.getSeconds]();
			d  = date[self.getDate]();
			dw = date[self.getDay]();
			m  = date[self.getMonth]() + 1;
			y  = date[self.getFullYear]();
			
			format = ts >= this.yesterday 
				? this.fancyFormat 
				: this.dateFormat;

			output = format.replace(/[a-z]/gi, function(val) {
				switch (val) {
					case 'd': return d > 9 ? d : '0'+d;
					case 'j': return d;
					case 'D': return self.i18n(i18.daysShort[dw]);
					case 'l': return self.i18n(i18.days[dw]);
					case 'm': return m > 9 ? m : '0'+m;
					case 'n': return m;
					case 'M': return self.i18n(i18.monthsShort[m-1]);
					case 'F': return self.i18n(i18.months[m-1]);
					case 'Y': return y;
					case 'y': return (''+y).substr(2);
					case 'H': return h > 9 ? h : '0'+h;
					case 'G': return h;
					case 'g': return g;
					case 'h': return g > 9 ? g : '0'+g;
					case 'a': return h >= 12 ? 'pm' : 'am';
					case 'A': return h >= 12 ? 'PM' : 'AM';
					case 'i': return i > 9 ? i : '0'+i;
					case 's': return s > 9 ? s : '0'+s;
				}
				return val;
			});
			
			return ts >= this.yesterday
				? output.replace('$1', this.i18n(ts >= this.today ? 'Today' : 'Yesterday'))
				: output;
		} else if (file.date) {
			return file.date.replace(/([a-z]+)\s/i, function(a1, a2) { return self.i18n(a2)+' '; });
		}
		
		return self.i18n('dateUnknown');
	},
	
	/**
	 * Return css class marks file permissions
	 * 
	 * @param  Object  file 
	 * @return String
	 */
	perms2class : function(o) {
		var c = '';
		
		if (!o.read && !o.write) {
			c = 'elfinder-na';
		} else if (!o.read) {
			c = 'elfinder-wo';
		} else if (!o.write) {
			c = 'elfinder-ro';
		}
		return c;
	},
	
	/**
	 * Return localized string with file permissions
	 * 
	 * @param  Object  file
	 * @return String
	 */
	formatPermissions : function(f) {
		var p  = [];
			
		f.read && p.push(this.i18n('read'));
		f.write && p.push(this.i18n('write'));	

		return p.length ? p.join(' '+this.i18n('and')+' ') : this.i18n('noaccess');
	},
	
	/**
	 * Return formated file size
	 * 
	 * @param  Number  file size
	 * @return String
	 */
	formatSize : function(s) {
		var n = 1, u = 'b';
		
		if (s == 'unknown') {
			return this.i18n('unknown');
		}
		
		if (s > 1073741824) {
			n = 1073741824;
			u = 'GB';
		} else if (s > 1048576) {
			n = 1048576;
			u = 'MB';
		} else if (s > 1024) {
			n = 1024;
			u = 'KB';
		}
		s = s/n;
		return (s > 0 ? n >= 1048576 ? s.toFixed(2) : Math.round(s) : 0) +' '+u;
	},
	
	/**
	 * Return formated file mode by options.fileModeStyle
	 * 
	 * @param  String  file mode
	 * @param  String  format style
	 * @return String
	 */
	formatFileMode : function(p, style) {
		var i, o, s, b, sticy, suid, sgid, str, oct;
		
		if (!style) {
			style = this.options.fileModeStyle.toLowerCase();
		}
		p = $.trim(p);
		if (p.match(/[rwxs-]{9}$/i)) {
			str = p = p.substr(-9);
			if (style == 'string') {
				return str;;
			}
			oct = '';
			s = 0;
			for (i=0; i<7; i=i+3) {
				o = p.substr(i, 3);
				b = 0;
				if (o.match(/[r]/i)) {
					b += 4;
				}
				if (o.match(/[w]/i)) {
					b += 2;
				}
				if (o.match(/[xs]/i)) {
					if (o.match(/[xs]/)) {
						b += 1;
					}
					if (o.match(/[s]/i)) {
						if (i == 0) {
							s += 4;
						} else if (i == 3) {
							s += 2;
						}
					}
				}
				oct += b.toString(8);
			}
			if (s) {
				oct = s.toString(8) + oct;
			}
		} else {
			p = parseInt(p, 8);
			oct = p? p.toString(8) : '';
			if (!p || style == 'octal') {
				return oct;
			}
			o = p.toString(8);
			s = 0;
			if (o.length > 3) {
				o = o.substr(-4);
				s = parseInt(o.substr(0, 1), 8);
				o = o.substr(1);
			}
			sticy = ((s & 1) == 1); // not support
			sgid = ((s & 2) == 2);
			suid = ((s & 4) == 4);
			str = '';
			for(i=0; i<3; i++) {
				if ((parseInt(o.substr(i, 1), 8) & 4) == 4) {
					str += 'r';
				} else {
					str += '-';
				}
				if ((parseInt(o.substr(i, 1), 8) & 2) == 2) {
					str += 'w';
				} else {
					str += '-';
				}
				if ((parseInt(o.substr(i, 1), 8) & 1) == 1) {
					str += ((i==0 && suid)||(i==1 && sgid))? 's' : 'x';
				} else {
					str += '-';
				}
			}
		}
		if (style == 'both') {
			return str + ' (' + oct + ')';
		} else if (style == 'string') {
			return str;
		} else {
			return oct;
		}
	},
	
	navHash2Id : function(hash) {
		return this.navPrefix + hash;
	},
	
	navId2Hash : function(id) {
		return typeof(id) == 'string' ? id.substr(this.navPrefix.length) : false;
	},
	
	cwdHash2Id : function(hash) {
		return this.cwdPrefix + hash;
	},
	
	cwdId2Hash : function(id) {
		return typeof(id) == 'string' ? id.substr(this.cwdPrefix.length) : false;
	},
	
	log : function(m) { window.console && window.console.log && window.console.log(m); return this; },
	
	debug : function(type, m) {
		var d = this.options.debug;

		if (d == 'all' || d === true || ($.isArray(d) && $.inArray(type, d) != -1)) {
			window.console && window.console.log && window.console.log('elfinder debug: ['+type+'] ['+this.id+']', m);
		} 
		return this;
	},
	time : function(l) { window.console && window.console.time && window.console.time(l); },
	timeEnd : function(l) { window.console && window.console.timeEnd && window.console.timeEnd(l); }
	

}

/**
 * for conpat ex. ie8...
 *
 * Object.keys() - JavaScript | MDN
 * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
 */
if (!Object.keys) {
	Object.keys = (function () {
		var hasOwnProperty = Object.prototype.hasOwnProperty,
				hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
				dontEnums = [
					'toString',
					'toLocaleString',
					'valueOf',
					'hasOwnProperty',
					'isPrototypeOf',
					'propertyIsEnumerable',
					'constructor'
				],
				dontEnumsLength = dontEnums.length

		return function (obj) {
			if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object')

			var result = []

			for (var prop in obj) {
				if (hasOwnProperty.call(obj, prop)) result.push(prop)
			}

			if (hasDontEnumBug) {
				for (var i=0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i])
				}
			}
			return result
		}
	})()
};


/*
 * File: /js/elFinder.version.js
 */

/**
 * Application version
 *
 * @type String
 **/
elFinder.prototype.version = '2.1.12';



/*
 * File: /js/jquery.elfinder.js
 */

/*** jQuery UI droppable performance tune for elFinder ***/
(function(){
if ($.ui && $.ui.ddmanager) {
	var origin = $.ui.ddmanager.prepareOffsets;
	$.ui.ddmanager.prepareOffsets = function( t, event ) {
		var isOutView = function(elem) {
			if (elem.is(':hidden')) {
				return true;
			}
			var rect = elem[0].getBoundingClientRect();
			return document.elementFromPoint(rect.left, rect.top)? false : true;
		}
		
		if (event.type === 'mousedown' || t.options.elfRefresh) {
			var i, d,
			m = $.ui.ddmanager.droppables[ t.options.scope ] || [],
			l = m.length;
			for ( i = 0; i < l; i++ ) {
				d = m[ i ];
				if (d.options.autoDisable && (!d.options.disabled || d.options.autoDisable > 1)) {
					d.options.disabled = isOutView(d.element);
					d.options.autoDisable = d.options.disabled? 2 : 1;
				}
			}
		}
		
		// call origin function
		return origin( t, event );
	};
}
})();

/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *	jquery.ui.widget.js
 *	jquery.ui.mouse.js
 */
(function ($) {

  // Detect touch support
  $.support.touch = 'ontouchend' in document;

  // Ignore browsers without touch support
  if (!$.support.touch) {
	return;
  }

  var mouseProto = $.ui.mouse.prototype,
	  _mouseInit = mouseProto._mouseInit,
	  _mouseDestroy = mouseProto._mouseDestroy,
	  touchHandled;

  /**
   * Simulate a mouse event based on a corresponding touch event
   * @param {Object} event A touch event
   * @param {String} simulatedType The corresponding mouse event
   */
  function simulateMouseEvent (event, simulatedType) {

	// Ignore multi-touch events
	if (event.originalEvent.touches.length > 1) {
	  return;
	}

	event.preventDefault();

	var touch = event.originalEvent.changedTouches[0],
		simulatedEvent = document.createEvent('MouseEvents');
	
	// Initialize the simulated mouse event using the touch event's coordinates
	simulatedEvent.initMouseEvent(
	  simulatedType,	// type
	  true,				// bubbles					  
	  true,				// cancelable				  
	  window,			// view						  
	  1,				// detail					  
	  touch.screenX,	// screenX					  
	  touch.screenY,	// screenY					  
	  touch.clientX,	// clientX					  
	  touch.clientY,	// clientY					  
	  false,			// ctrlKey					  
	  false,			// altKey					  
	  false,			// shiftKey					  
	  false,			// metaKey					  
	  0,				// button					  
	  null				// relatedTarget			  
	);

	// Dispatch the simulated event to the target element
	event.target.dispatchEvent(simulatedEvent);
  }

  /**
   * Handle the jQuery UI widget's touchstart events
   * @param {Object} event The widget element's touchstart event
   */
  mouseProto._touchStart = function (event) {

	var self = this;

	// Ignore the event if another widget is already being handled
	if (touchHandled || !self._mouseCapture(event.originalEvent.changedTouches[0])) {
	  return;
	}

	// Set the flag to prevent other widgets from inheriting the touch event
	touchHandled = true;

	// Track movement to determine if interaction was a click
	self._touchMoved = false;

	// Simulate the mouseover event
	simulateMouseEvent(event, 'mouseover');

	// Simulate the mousemove event
	simulateMouseEvent(event, 'mousemove');

	// Simulate the mousedown event
	simulateMouseEvent(event, 'mousedown');
  };

  /**
   * Handle the jQuery UI widget's touchmove events
   * @param {Object} event The document's touchmove event
   */
  mouseProto._touchMove = function (event) {

	// Ignore event if not handled
	if (!touchHandled) {
	  return;
	}

	// Interaction was not a click
	this._touchMoved = true;

	// Simulate the mousemove event
	simulateMouseEvent(event, 'mousemove');
  };

  /**
   * Handle the jQuery UI widget's touchend events
   * @param {Object} event The document's touchend event
   */
  mouseProto._touchEnd = function (event) {

	// Ignore event if not handled
	if (!touchHandled) {
	  return;
	}

	// Simulate the mouseup event
	simulateMouseEvent(event, 'mouseup');

	// Simulate the mouseout event
	simulateMouseEvent(event, 'mouseout');

	// If the touch interaction did not move, it should trigger a click
	if (!this._touchMoved) {

	  // Simulate the click event
	  simulateMouseEvent(event, 'click');
	}

	// Unset the flag to allow other widgets to inherit the touch event
	touchHandled = false;
  };

  /**
   * A duck punch of the $.ui.mouse _mouseInit method to support touch events.
   * This method extends the widget with bound touch event handlers that
   * translate touch events to mouse events and pass them to the widget's
   * original mouse event handling methods.
   */
  mouseProto._mouseInit = function () {
	
	var self = this;

	if (self.element.hasClass('touch-punch')) {
		// Delegate the touch handlers to the widget's element
		self.element.bind({
		  touchstart: $.proxy(self, '_touchStart'),
		  touchmove: $.proxy(self, '_touchMove'),
		  touchend: $.proxy(self, '_touchEnd')
		});
	}

	// Call the original $.ui.mouse init method
	_mouseInit.call(self);
  };

  /**
   * Remove the touch event handlers
   */
  mouseProto._mouseDestroy = function () {
	
	var self = this;

	if (self.element.hasClass('touch-punch')) {
		// Delegate the touch handlers to the widget's element
		self.element.unbind({
		  touchstart: $.proxy(self, '_touchStart'),
		  touchmove: $.proxy(self, '_touchMove'),
		  touchend: $.proxy(self, '_touchEnd')
		});
	}

	// Call the original $.ui.mouse destroy method
	_mouseDestroy.call(self);
  };

})(jQuery);

$.fn.elfinder = function(o) {
	
	if (o == 'instance') {
		return this.getElFinder();
	}
	
	return this.each(function() {
		
		var cmd = typeof(o) == 'string' ? o : '';
		if (!this.elfinder) {
			new elFinder(this, typeof(o) == 'object' ? o : {})
		}
		
		switch(cmd) {
			case 'close':
			case 'hide':
				this.elfinder.hide();
				break;
				
			case 'open':
			case 'show':
				this.elfinder.show();
				break;
				
			case'destroy':
				this.elfinder.destroy();
				break;
		}
		
	})
};

$.fn.getElFinder = function() {
	var instance;
	
	this.each(function() {
		if (this.elfinder) {
			instance = this.elfinder;
			return false;
		}
	});
	
	return instance;
};

$.fn.elfUiWidgetInstance = function(name) {
	try {
		return this[name]('instance');
	} catch(e) {
		// fallback for jQuery UI < 1.11
		var data = this.data('ui-' + name);
		if (data && typeof data === 'object' && data.widgetFullName === 'ui-' + name) {
			return data;
		}
		return null;
	}
}


/*
 * File: /js/elFinder.options.js
 */

/**
 * Default elFinder config
 *
 * @type  Object
 * @autor Dmitry (dio) Levashov
 */
elFinder.prototype._options = {
	/**
	 * Connector url. Required!
	 *
	 * @type String
	 */
	url : '',

	/**
	 * Ajax request type.
	 *
	 * @type String
	 * @default "get"
	 */
	requestType : 'get',

	/**
	 * Transport to send request to backend.
	 * Required for future extensions using websockets/webdav etc.
	 * Must be an object with "send" method.
	 * transport.send must return $.Deferred() object
	 *
	 * @type Object
	 * @default null
	 * @example
	 *  transport : {
	 *    init : function(elfinderInstance) { },
	 *    send : function(options) {
	 *      var dfrd = $.Deferred();
	 *      // connect to backend ...
	 *      return dfrd;
	 *    },
	 *    upload : function(data) {
	 *      var dfrd = $.Deferred();
	 *      // upload ...
	 *      return dfrd;
	 *    }
	 *    
	 *  }
	 **/
	transport : {},

	/**
	 * URL to upload file to.
	 * If not set - connector URL will be used
	 *
	 * @type String
	 * @default  ''
	 */
	urlUpload : '',

	/**
	 * Allow to drag and drop to upload files
	 *
	 * @type Boolean|String
	 * @default  'auto'
	 */
	dragUploadAllow : 'auto',
	
	/**
	 * Max size of chunked data of file upload
	 * 
	 * @type Number
	 * @default  10485760(10MB)
	 */
	uploadMaxChunkSize : 10485760,
	
	/**
	 * Timeout for upload using iframe
	 *
	 * @type Number
	 * @default  0 - no timeout
	 */
	iframeTimeout : 0,
	
	/**
	 * Data to append to all requests and to upload files
	 *
	 * @type Object
	 * @default  {}
	 */
	customData : {},
	
	/**
	 * Event listeners to bind on elFinder init
	 *
	 * @type Object
	 * @default  {}
	 */
	handlers : {},

	/**
	 * Any custom headers to send across every ajax request
	 *
	 * @type Object
	 * @default {}
	 */
	customHeaders : {},

	/**
	 * Any custom xhrFields to send across every ajax request
	 *
	 * @type Object
	 * @default {}
	 */
	xhrFields : {},

	/**
	 * Interface language
	 *
	 * @type String
	 * @default "en"
	 */
	lang : 'en',

	/**
	 * Additional css class for filemanager node.
	 *
	 * @type String
	 */
	cssClass : '',

	/**
	 * Active commands list
	 * If some required commands will be missed here, elFinder will add its
	 *
	 * @type Array
	 */
	commands : [
		'open', 'opendir', 'reload', 'home', 'up', 'back', 'forward', 'getfile', 'quicklook', 
		'download', 'rm', 'duplicate', 'rename', 'mkdir', 'mkfile', 'upload', 'copy', 
		'cut', 'paste', 'edit', 'extract', 'archive', 'search', 'info', 'view', 'help',
		'resize', 'sort', 'netmount', 'netunmount', 'places', 'chmod'
	],
	
	/**
	 * Commands options.
	 *
	 * @type Object
	 **/
	commandsOptions : {
		// // configure shortcuts of any command
		// // add `shortcuts` property into each command
		// any_command_name : {
		// 	shortcuts : [] // for disable this command's shortcuts
		// },
		// any_command_name : {
		// 	shortcuts : function(fm, shortcuts) {
		// 		// for add `CTRL + E` for this command action
		// 		shortcuts[0]['pattern'] += ' ctrl+e';
		// 		return shortcuts;
		// 	}
		// },
		// any_command_name : {
		// 	shortcuts : function(fm, shortcuts) {
		// 		// for full customize of this command's shortcuts
		// 		return [ { pattern: 'ctrl+e ctrl+down numpad_enter' + (fm.OS != 'mac' && ' enter') } ];
		// 	}
		// },
		// "getfile" command options.
		getfile : {
			onlyURL  : false,
			// allow to return multiple files info
			multiple : false,
			// allow to return filers info
			folders  : false,
			// action after callback (""/"close"/"destroy")
			oncomplete : '',
			// get image sizes before callback call
			getImgSize : false
		},
		// "upload" command options.
		upload : {
			// Open system OS upload dialog: 'button' OR Open elFinder upload dialog: 'uploadbutton'
			ui : 'button'
		},
		// "download" command options.
		download : {
			maxRequests : 10
		},
		// "quicklook" command options.
		quicklook : {
			autoplay : true,
			jplayer  : 'extensions/jplayer',
			// MIME types to use Google Docs online viewer
			// Example ['application/pdf', 'image/tiff', 'application/vnd.ms-office', 'application/msword', 'application/vnd.ms-word', 'application/vnd.ms-excel', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
			googleDocsMimes : []
		},
		// "quicklook" command options.
		edit : {
			// list of allowed mimetypes to edit
			// if empty - any text files can be edited
			mimes : [],
			// edit files in wysisyg's
			editors : [
				// {
				// 	/**
				// 	 * files mimetypes allowed to edit in current wysisyg
				// 	 * @type  Array
				// 	 */
				// 	mimes : ['text/html'], 
				// 	/**
				// 	 * Called when "edit" dialog loaded.
				// 	 * Place to init wysisyg.
				// 	 * Can return wysisyg instance
				// 	 *
				// 	 * @param  DOMElement  textarea node
				// 	 * @return Object
				// 	 */
				// 	load : function(textarea) { },
				// 	/**
				// 	 * Called before "edit" dialog closed.
				// 	 * Place to destroy wysisyg instance.
				// 	 *
				// 	 * @param  DOMElement  textarea node
				// 	 * @param  Object      wysisyg instance (if was returned by "load" callback)
				// 	 * @return void
				// 	 */
				// 	close : function(textarea, instance) { },
				// 	/**
				// 	 * Called before file content send to backend.
				// 	 * Place to update textarea content if needed.
				// 	 *
				// 	 * @param  DOMElement  textarea node
				// 	 * @param  Object      wysisyg instance (if was returned by "load" callback)
				// 	 * @return void
				// 	 */
				// 	save : function(textarea, instance) {},
				// 	/**
				// 	 * Called after load() or save().
				// 	 * Set focus to wysisyg editor.
				// 	 *
				// 	 * @param  DOMElement  textarea node
				// 	 * @param  Object      wysisyg instance (if was returned by "load" callback)
				// 	 * @return void
				// 	 */
				// 	focus : function(textarea, instance) {}
				// 
				// }
			]
		},
		// "info" command options.
		info : {
			nullUrlDirLinkSelf : true,
			custom : {
				// /**
				//  * Example of custom info `desc`
				//  */
				// desc : {
				// 	/**
				// 	 * Lable (require)
				// 	 * It is filtered by the `fm.i18n()`
				// 	 * 
				// 	 * @type String
				// 	 */
				// 	label : 'Description',
				// 	
				// 	/**
				// 	 * Template (require)
				// 	 * `{id}` is replaced in dialog.id
				// 	 * 
				// 	 * @type String
				// 	 */
				// 	tpl : '<div class="elfinder-info-desc"><span class="elfinder-info-spinner"></span></div>',
				// 	
				// 	/**
				// 	 * Restricts to mimetypes (optional)
				// 	 * Exact match or category match
				// 	 * 
				// 	 * @type Array
				// 	 */
				// 	mimes : ['text', 'image/jpeg', 'directory'],
				// 	
				// 	/**
				// 	 * Restricts to file.hash (optional)
				// 	 * 
				// 	 * @ type Regex
				// 	 */
				// 	hashRegex : /^l\d+_/,
				// 
				// 	/**
				// 	 * Request that asks for the description and sets the field (optional)
				// 	 * 
				// 	 * @type Function
				// 	 */
				// 	action : function(file, fm, dialog) {
				// 		fm.request({
				// 		data : { cmd : 'desc', target: file.hash },
				// 			preventDefault: true,
				// 		})
				// 		.fail(function() {
				// 			dialog.find('div.elfinder-info-desc').html(fm.i18n('unknown'));
				// 		})
				// 		.done(function(data) {
				// 			dialog.find('div.elfinder-info-desc').html(data.desc);
				// 		});
				// 	}
				// }
			}
		},
		mkdir: {
			// Enable automatic switching function ["New Folder" / "Into New Folder"] of toolbar buttton
			intoNewFolderToolbtn: false,
		},
		netmount: {
			ftp: {
				name : 'FTP',
				inputs: {
					host     : $('<input type="text"/>'),
					port     : $('<input type="text" placeholder="21"/>'),
					path     : $('<input type="text" value="/"/>'),
					user     : $('<input type="text"/>'),
					pass     : $('<input type="password"/>'),
					encoding : $('<input type="text" placeholder="Optional"/>'),
					locale   : $('<input type="text" placeholder="Optional"/>')
				}
			},
			dropbox: {
				name : 'Dropbox.com',
				inputs: {
					host     : $('<span><span class="elfinder-info-spinner"/></span></span><input type="hidden"/>'),
					path     : $('<input type="text" value="/"/>'),
					user     : $('<input type="hidden"/>'),
					pass     : $('<input type="hidden"/>')
				},
				select: function(fm){
					var self = this;
					if (self.inputs.host.find('span').length) {
						fm.request({
							data : {cmd : 'netmount', protocol: 'dropbox', host: 'dropbox.com', user: 'init', pass: 'init', options: {url: fm.uploadURL, id: fm.id}},
							preventDefault : true
						}).done(function(data){
							self.inputs.host.find('span').removeClass("elfinder-info-spinner");
							self.inputs.host.find('span').html(data.body.replace(/\{msg:([^}]+)\}/g, function(whole,s1){return fm.i18n(s1,'Dropbox.com');}));
						}).fail(function(){});
					}					
				},
				done: function(fm, data){
					var self = this;
					if (data.mode == 'makebtn') {
						self.inputs.host.find('span').removeClass("elfinder-info-spinner");
						self.inputs.host.find('input').hover(function(){$(this).toggleClass("ui-state-hover");});
						self.inputs.host[1].value = "";
					} else {
						self.inputs.host.find('span').removeClass("elfinder-info-spinner");
						self.inputs.host.find('span').html("Dropbox.com");
						self.inputs.host[1].value = "dropbox";
						self.inputs.user.val("done");
						self.inputs.pass.val("done");
					}
				}
			},
			googledrive: {
				name : 'GoogleDrive',
				inputs: {
					offline  : $('<input type="checkbox"/>').on('change', function() {
						$(this).parents('table.elfinder-netmount-tb').find('select:first').trigger('change', 'reset');
					}),
					host     : $('<span><span class="elfinder-info-spinner"/></span><input type="hidden"/>'),
					path     : $('<input type="text" value="root"/>'),
					user     : $('<input type="hidden"/>'),
					pass     : $('<input type="hidden"/>')
				},
				select: function(fm, ev, data){
					var f = this.inputs, oline = f.offline,
						data = data || null;
					if ($(f.host[0]).find('span.elfinder-info-spinner').length || data === 'reset') {
						if (oline.parent().children().length === 1) {
							f.path.parent().prev().html(fm.i18n('folderId'));
							oline.attr('title', fm.i18n('offlineAccess'));
							oline.uniqueId().after($('<label/>').attr('for', oline.attr('id')).html(' '+fm.i18n('offlineAccess')));
						}
						$(f.host[0]).empty().addClass('elfinder-info-spinner')
							.parent().find('span.elfinder-button-icon').remove();
						fm.request({
							data : {cmd : 'netmount', protocol: 'googledrive', host: 'google.com', user: 'init', options: {id: fm.id, offline: oline.prop('checked')? 1:0, pass: f.host[1].value}},
							preventDefault : true
						}).done(function(data){
							$(f.host[0]).removeClass("elfinder-info-spinner").html(data.body.replace(/\{msg:([^}]+)\}/g, function(whole,s1){return fm.i18n(s1,'Google.com');}));
						}).fail(function(){});
					} else {
						oline.parent().parent()[f.user.val()? 'hide':'show']();
					}
				},
				done: function(fm, data){
					var f = this.inputs, p = this.protocol;
					if (data.mode == 'makebtn') {
						$(f.host[0]).removeClass('elfinder-info-spinner');
						f.host.find('input').hover(function(){$(this).toggleClass('ui-state-hover');});
						$(f.host[1]).val('');
						f.path.val('root').next().remove();
						f.user.val('');
						f.pass.val('');
						f.offline.parent().parent().show();
					} else {
						$(f.host[0]).html('Google.com&nbsp;').removeClass('elfinder-info-spinner');
						if (data.reset) {
							p.trigger('change', 'reset');
							return;
						}
						$(f.host[0]).parent().append($('<span class="elfinder-button-icon elfinder-button-icon-reload" title="'+fm.i18n('reAuth')+'">')
							.on('click', function() {
								$(f.host[1]).val('reauth');
								p.trigger('change', 'reset');
							}));
						$(f.host[1]).val('googledrive');
						if (data.folders) {
							f.path.next().remove().end().after(
								$('<div/>').append(
									$('<select class="ui-corner-all" style="max-width:200px;">').append(
										$($.map(data.folders, function(n,i){return '<option value="'+i+'">'+fm.escape(n)+'</option>'}).join(''))
									).on('change', function(){f.path.val($(this).val());})
								)
							);
						}
						f.user.val('done');
						f.pass.val('done');
						f.offline.parent().parent().hide();
					}
				},
				fail: function(fm, err){
					this.protocol.trigger('change', 'reset');
				}
			}
		},

		help : {view : ['about', 'shortcuts', 'help', 'debug']}
	},
	
	/**
	 * Callback for "getfile" commands.
	 * Required to use elFinder with WYSIWYG editors etc..
	 *
	 * @type Function
	 * @default null (command not active)
	 */
	getFileCallback : null,
	
	/**
	 * Default directory view. icons/list
	 *
	 * @type String
	 * @default "icons"
	 */
	defaultView : 'icons',
	
	/**
	 * Hash of default directory path to open
	 * 
	 * @type String
	 * @default ""
	 */
	startPathHash : '',
	
	/**
	 * UI plugins to load.
	 * Current dir ui and dialogs loads always.
	 * Here set not required plugins as folders tree/toolbar/statusbar etc.
	 *
	 * @type Array
	 * @default ['toolbar', 'tree', 'path', 'stat']
	 * @full ['toolbar', 'places', 'tree', 'path', 'stat']
	 */
	ui : ['toolbar', 'tree', 'path', 'stat'],
	
	/**
	 * Some UI plugins options.
	 * @type Object
	 */
	uiOptions : {
		// toolbar configuration
		toolbar : [
			['back', 'forward'],
			['netmount'],
			// ['reload'],
			// ['home', 'up'],
			['mkdir', 'mkfile', 'upload'],
			['open', 'download', 'getfile'],
			['info', 'chmod'],
			['quicklook'],
			['copy', 'cut', 'paste'],
			['rm'],
			['duplicate', 'rename', 'edit', 'resize'],
			['extract', 'archive'],
			['search'],
			['view', 'sort'],
			['help'],
			// extra options
			{
				// auto hide on initial open
				autoHideUA: ['Mobile']
			}
		],
		// directories tree options
		tree : {
			// expand current root on init
			openRootOnLoad : true,
			// expand current work directory on open
			openCwdOnOpen  : true,
			// auto load current dir parents
			syncTree : true
			// ,
			// /**
			//  * Add CSS class name to navbar directories (optional)
			//  * see: https://github.com/Studio-42/elFinder/pull/1061,
			//  *      https://github.com/Studio-42/elFinder/issues/1231
			//  * 
			//  * @type Function
			//  */
			// getClass: function(dir) {
			// 	// e.g. This adds the directory's name (lowercase) with prefix as a CSS class
			// 	return 'elfinder-tree-' + dir.name.replace(/[ "]/g, '').toLowerCase();
			// }
		},
		// navbar options
		navbar : {
			minWidth : 150,
			maxWidth : 500,
			// auto hide on initial open
			autoHideUA: [] // e.g. ['Mobile']
		},
		cwd : {
			// display parent folder with ".." name :)
			oldSchool : false,
			
			// fm.UA types array to show item select checkboxes e.g. ['All'] or ['Mobile'] etc. default: ['Touch']
			showSelectCheckboxUA : ['Touch'],
			
			// file info columns displayed
			listView : {
				// name is always displayed, cols are ordered
				// e.g. ['perm', 'date', 'size', 'kind', 'owner', 'group', 'mode']
				// mode: 'mode'(by `fileModeStyle` setting), 'modestr'(rwxr-xr-x) , 'modeoct'(755), 'modeboth'(rwxr-xr-x (755))
				// 'owner', 'group' and 'mode', It's necessary set volume driver option "statOwner" to `true`
				columns : ['perm', 'date', 'size', 'kind'],
				// override this if you want custom columns name
				// example
				// columnsCustomName : {
				//		date : 'Last modification',
				// 		kind : 'Mime type'
				// }
				columnsCustomName : {},
				// fixed list header colmun
				fixedHeader : true
			}
			// ,
			// /**
			//  * Add CSS class name to cwd directories (optional)
			//  * see: https://github.com/Studio-42/elFinder/pull/1061,
			//  *      https://github.com/Studio-42/elFinder/issues/1231
			//  * 
			//  * @type Function
			//  */
			// getClass: function(file) {
			// 	// e.g. This adds the directory's name (lowercase) with prefix as a CSS class
			// 	return 'elfinder-cwd-' + file.name.replace(/[ "]/g, '').toLowerCase();
			// }
		}
	},

	/**
	 * Display only required files by types
	 *
	 * @type Array
	 * @default []
	 * @example
	 *  onlyMimes : ["image"] - display all images
	 *  onlyMimes : ["image/png", "application/x-shockwave-flash"] - display png and flash
	 */
	onlyMimes : [],

	/**
	 * Custom files sort rules.
	 * All default rules (name/size/kind/date) set in elFinder._sortRules
	 *
	 * @type {Object}
	 * @example
	 * sortRules : {
	 *   name : function(file1, file2) { return file1.name.toLowerCase().localeCompare(file2.name.toLowerCase()); }
	 * }
	 */
	sortRules : {},

	/**
	 * Default sort type.
	 *
	 * @type {String}
	 */
	sortType : 'name',
	
	/**
	 * Default sort order.
	 *
	 * @type {String}
	 * @default "asc"
	 */
	sortOrder : 'asc',
	
	/**
	 * Display folders first?
	 *
	 * @type {Boolean}
	 * @default true
	 */
	sortStickFolders : true,
	
	/**
	 * If true - elFinder will formating dates itself, 
	 * otherwise - backend date will be used.
	 *
	 * @type Boolean
	 */
	clientFormatDate : true,
	
	/**
	 * Show UTC dates.
	 * Required set clientFormatDate to true
	 *
	 * @type Boolean
	 */
	UTCDate : false,
	
	/**
	 * File modification datetime format.
	 * Value from selected language data  is used by default.
	 * Set format here to overwrite it.
	 *
	 * @type String
	 * @default  ""
	 */
	dateFormat : '',
	
	/**
	 * File modification datetime format in form "Yesterday 12:23:01".
	 * Value from selected language data is used by default.
	 * Set format here to overwrite it.
	 * Use $1 for "Today"/"Yesterday" placeholder
	 *
	 * @type String
	 * @default  ""
	 * @example "$1 H:m:i"
	 */
	fancyDateFormat : '',
	
	/**
	 * Style of file mode at cwd-list, info dialog
	 * 'string' (ex. rwxr-xr-x) or 'octal' (ex. 755) or 'both' (ex. rwxr-xr-x (755))
	 * 
	 * @type {String}
	 * @default 'both'
	 */
	fileModeStyle : 'both',
	
	/**
	 * elFinder width
	 *
	 * @type String|Number
	 * @default  "auto"
	 */
	width : 'auto',
	
	/**
	 * elFinder height
	 *
	 * @type Number
	 * @default  "auto"
	 */
	height : 400,
	
	/**
	 * Make elFinder resizable if jquery ui resizable available
	 *
	 * @type Boolean
	 * @default  true
	 */
	resizable : true,
	
	/**
	 * Timeout before open notifications dialogs
	 *
	 * @type Number
	 * @default  500 (.5 sec)
	 */
	notifyDelay : 500,
	
	/**
	 * Position CSS, Width of notifications dialogs
	 *
	 * @type Object
	 * @default {position: {top : '12px', right : '12px'}, width : 280}
	 * position: CSS object | null (null: position center & middle)
	 */
	notifyDialog : {position: {top : '12px', right : '12px'}, width : 280},
	
	/**
	 * Allow shortcuts
	 *
	 * @type Boolean
	 * @default  true
	 */
	allowShortcuts : true,
	
	/**
	 * Remeber last opened dir to open it after reload or in next session
	 *
	 * @type Boolean
	 * @default  true
	 */
	rememberLastDir : true,
	
	/**
	 * Clear historys(elFinder) on reload(not browser) function
	 * Historys was cleared on Reload function on elFinder 2.0 (value is true)
	 * 
	 * @type Boolean
	 * @default  false
	 */
	reloadClearHistory : false,
	
	/**
	 * Use browser native history with supported browsers
	 *
	 * @type Boolean
	 * @default  true
	 */
	useBrowserHistory : true,
	
	/**
	 * Lazy load config.
	 * How many files display at once?
	 *
	 * @type Number
	 * @default  50
	 */
	showFiles : 50,
	
	/**
	 * Lazy load config.
	 * Distance in px to cwd bottom edge to start display files
	 *
	 * @type Number
	 * @default  50
	 */
	showThreshold : 50,
	
	/**
	 * Additional rule to valid new file name.
	 * By default not allowed empty names or '..'
	 * This setting does not have a sense of security.
	 *
	 * @type false|RegExp|function
	 * @default  false
	 * @example
	 *  disable names with spaces:
	 *  validName : /^[^\s]+$/,
	 */
	validName : false,
	
	/**
	 * Backup name suffix.
	 *
	 * @type String
	 * @default  "~"
	 */
	backupSuffix : '~',
	
	/**
	 * Sync content interval
	 *
	 * @type Number
	 * @default  0 (do not sync)
	 */
	sync : 0,
	
	/**
	 * Sync start on load if sync value >= 1000
	 *
	 * @type     Bool
	 * @default  true
	 */
	syncStart : true,
	
	/**
	 * How many thumbnails create in one request
	 *
	 * @type Number
	 * @default  5
	 */
	loadTmbs : 5,
	
	/**
	 * Cookie option for browsersdoes not suppot localStorage
	 *
	 * @type Object
	 */
	cookie         : {
		expires : 30,
		domain  : '',
		path    : '/',
		secure  : false
	},
	
	/**
	 * Contextmenu config
	 *
	 * @type Object
	 */
	contextmenu : {
		// navbarfolder menu
		navbar : ['open', 'download', '|', 'upload', '|', 'copy', 'cut', 'paste', 'duplicate', '|', 'rm', '|', 'rename', '|', 'archive', '|', 'places', 'info', 'chmod', 'netunmount'],
		// current directory menu
		cwd    : ['reload', 'back', '|', 'upload', 'mkdir', 'mkfile', 'paste', '|', 'sort', '|', 'info'],
		// current directory file menu
		files  : ['getfile', '|' ,'open', 'download', 'opendir', 'quicklook', '|', 'upload', 'mkdir', '|', 'copy', 'cut', 'paste', 'duplicate', '|', 'rm', '|', 'edit', 'rename', 'resize', '|', 'archive', 'extract', '|', 'places', 'info', 'chmod']
	},

	/**
	 * elFinder node enable always
	 * This value will set to `true` if <body> has elFinder node only
	 * 
	 * @type     Bool
	 * @default  false
	 */
	enableAlways : false,

	/**
	 * Debug config
	 *
	 * @type Array|Boolean
	 */
	// debug : true
	debug : ['error', 'warning', 'event-destroy']
};


/*
 * File: /js/elFinder.history.js
 */

/**
 * @class elFinder.history
 * Store visited folders
 * and provide "back" and "forward" methods
 *
 * @author Dmitry (dio) Levashov
 */
elFinder.prototype.history = function(fm) {
	var self = this,
		/**
		 * Update history on "open" event?
		 *
		 * @type Boolean
		 */
		update = true,
		/**
		 * Directories hashes storage
		 *
		 * @type Array
		 */
		history = [],
		/**
		 * Current directory index in history
		 *
		 * @type Number
		 */
		current,
		/**
		 * Clear history
		 *
		 * @return void
		 */
		reset = function() {
			history = [fm.cwd().hash];
			current = 0;
			update  = true;
		},
		/**
		 * Browser native history object
		 */
		nativeHistory = (fm.options.useBrowserHistory && window.history && window.history.pushState)? window.history : null,
		/**
		 * Open prev/next folder
		 *
		 * @Boolen  open next folder?
		 * @return jQuery.Deferred
		 */
		go = function(fwd) {
			if ((fwd && self.canForward()) || (!fwd && self.canBack())) {
				update = false;
				return fm.exec('open', history[fwd ? ++current : --current]).fail(reset);
			}
			return $.Deferred().reject();
		};
	
	/**
	 * Return true if there is previous visited directories
	 *
	 * @return Boolen
	 */
	this.canBack = function() {
		return current > 0;
	}
	
	/**
	 * Return true if can go forward
	 *
	 * @return Boolen
	 */
	this.canForward = function() {
		return current < history.length - 1;
	}
	
	/**
	 * Go back
	 *
	 * @return void
	 */
	this.back = go;
	
	/**
	 * Go forward
	 *
	 * @return void
	 */
	this.forward = function() {
		return go(true);
	}
	
	// bind to elfinder events
	fm.open(function() {
		var l = history.length,
			cwd = fm.cwd().hash;

		if (update) {
			current >= 0 && l > current + 1 && history.splice(current+1);
			history[history.length-1] != cwd && history.push(cwd);
			current = history.length - 1;
		}
		update = true;

		if (nativeHistory) {
			if (! nativeHistory.state) {
				nativeHistory.replaceState({thash: cwd}, null, location.pathname + location.search + '#elf_' + cwd);
			} else {
				nativeHistory.state.thash != cwd && nativeHistory.pushState({thash: cwd}, null, location.pathname + location.search + '#elf_' + cwd);
			}
		}
	})
	.reload(fm.options.reloadClearHistory && reset);
	
};


/*
 * File: /js/elFinder.command.js
 */

/**
 * elFinder command prototype
 *
 * @type  elFinder.command
 * @author  Dmitry (dio) Levashov
 */
elFinder.prototype.command = function(fm) {

	/**
	 * elFinder instance
	 *
	 * @type  elFinder
	 */
	this.fm = fm;
	
	/**
	 * Command name, same as class name
	 *
	 * @type  String
	 */
	this.name = '';
	
	/**
	 * Short command description
	 *
	 * @type  String
	 */
	this.title = '';
	
	/**
	 * Linked(Child) commands name
	 * They are loaded together when tthis command is loaded.
	 * 
	 * @type  Array
	 */
	this.linkedCmds = [];
	
	/**
	 * Current command state
	 *
	 * @example
	 * this.state = -1; // command disabled
	 * this.state = 0;  // command enabled
	 * this.state = 1;  // command active (for example "fullscreen" command while elfinder in fullscreen mode)
	 * @default -1
	 * @type  Number
	 */
	this.state = -1;
	
	/**
	 * If true, command can not be disabled by connector.
	 * @see this.update()
	 *
	 * @type  Boolen
	 */
	this.alwaysEnabled = false;
	
	/**
	 * If true, this means command was disabled by connector.
	 * @see this.update()
	 *
	 * @type  Boolen
	 */
	this._disabled = false;
	
	this.disableOnSearch = false;
	
	this.updateOnSelect = true;
	
	/**
	 * elFinder events defaults handlers.
	 * Inside handlers "this" is current command object
	 *
	 * @type  Object
	 */
	this._handlers = {
		enable  : function() { this.update(void(0), this.value); },
		disable : function() { this.update(-1, this.value); },
		'open reload load'    : function() { 
			this._disabled = !(this.alwaysEnabled || this.fm.isCommandEnabled(this.name));
			this.update(void(0), this.value)
			this.change(); 
		}
	};
	
	/**
	 * elFinder events handlers.
	 * Inside handlers "this" is current command object
	 *
	 * @type  Object
	 */
	this.handlers = {}
	
	/**
	 * Shortcuts
	 *
	 * @type  Array
	 */
	this.shortcuts = [];
	
	/**
	 * Command options
	 *
	 * @type  Object
	 */
	this.options = {ui : 'button'};
	
	/**
	 * Prepare object -
	 * bind events and shortcuts
	 *
	 * @return void
	 */
	this.setup = function(name, opts) {
		var self = this,
			fm   = this.fm, i, s, sc;

		this.name      = name;
		this.title     = fm.messages['cmd'+name] ? fm.i18n('cmd'+name) : name, 
		this.options   = $.extend({}, this.options, opts);
		this.listeners = [];

		if (opts.shortcuts) {
			if (typeof opts.shortcuts === 'function') {
				sc = opts.shortcuts(this.fm, this.shortcuts);
			} else if ($.isArray(opts.shortcuts)) {
				sc = opts.shortcuts;
			}
			this.shortcuts = sc || [];
		}

		if (this.updateOnSelect) {
			this._handlers.select = function() { this.update(void(0), this.value); }
		}

		$.each($.extend({}, self._handlers, self.handlers), function(cmd, handler) {
			fm.bind(cmd, $.proxy(handler, self));
		});

		for (i = 0; i < this.shortcuts.length; i++) {
			s = this.shortcuts[i];
			s.callback = $.proxy(s.callback || function() { this.exec() }, this);
			!s.description && (s.description = this.title);
			fm.shortcut(s);
		}

		if (this.disableOnSearch) {
			fm.bind('search searchend', function(e) {
				self._disabled = e.type == 'search';
				self.update(void(0), self.value);
			});
		}

		this.init();
	}

	/**
	 * Command specific init stuffs
	 *
	 * @return void
	 */
	this.init = function() { }

	/**
	 * Exec command
	 *
	 * @param  Array         target files hashes
	 * @param  Array|Object  command value
	 * @return $.Deferred
	 */
	this.exec = function(files, opts) { 
		return $.Deferred().reject(); 
	}
	
	/**
	 * Return true if command disabled.
	 *
	 * @return Boolen
	 */
	this.disabled = function() {
		return this.state < 0;
	}
	
	/**
	 * Return true if command enabled.
	 *
	 * @return Boolen
	 */
	this.enabled = function() {
		return this.state > -1;
	}
	
	/**
	 * Return true if command active.
	 *
	 * @return Boolen
	 */
	this.active = function() {
		return this.state > 0;
	}
	
	/**
	 * Return current command state.
	 * Must be overloaded in most commands
	 *
	 * @return Number
	 */
	this.getstate = function() {
		return -1;
	}
	
	/**
	 * Update command state/value
	 * and rize 'change' event if smth changed
	 *
	 * @param  Number  new state or undefined to auto update state
	 * @param  mixed   new value
	 * @return void
	 */
	this.update = function(s, v) {
		var state = this.state,
			value = this.value;

		if (this._disabled) {
			this.state = -1;
		} else {
			this.state = s !== void(0) ? s : this.getstate();
		}

		this.value = v;
		
		if (state != this.state || value != this.value) {
			this.change();
		}
	}
	
	/**
	 * Bind handler / fire 'change' event.
	 *
	 * @param  Function|undefined  event callback
	 * @return void
	 */
	this.change = function(c) {
		var cmd, i;
		
		if (typeof(c) === 'function') {
			this.listeners.push(c);			
		} else {
			for (i = 0; i < this.listeners.length; i++) {
				cmd = this.listeners[i];
				try {
					cmd(this.state, this.value);
				} catch (e) {
					this.fm.debug('error', e)
				}
			}
		}
		return this;
	}
	

	/**
	 * With argument check given files hashes and return list of existed files hashes.
	 * Without argument return selected files hashes.
	 *
	 * @param  Array|String|void  hashes
	 * @return Array
	 */
	this.hashes = function(hashes) {
		return hashes
			? $.map($.isArray(hashes) ? hashes : [hashes], function(hash) { return fm.file(hash) ? hash : null; })
			: fm.selected();
	}
	
	/**
	 * Return only existed files from given fils hashes | selected files
	 *
	 * @param  Array|String|void  hashes
	 * @return Array
	 */
	this.files = function(hashes) {
		var fm = this.fm;
		
		return hashes
			? $.map($.isArray(hashes) ? hashes : [hashes], function(hash) { return fm.file(hash) || null })
			: fm.selectedFiles();
	}
};


/*
 * File: /js/elFinder.resources.js
 */

/**
 * elFinder resources registry.
 * Store shared data
 *
 * @type Object
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.resources = {
	'class' : {
		hover       : 'ui-state-hover',
		active      : 'ui-state-active',
		disabled    : 'ui-state-disabled',
		draggable   : 'ui-draggable',
		droppable   : 'ui-droppable',
		adroppable  : 'elfinder-droppable-active',
		cwdfile     : 'elfinder-cwd-file',
		cwd         : 'elfinder-cwd',
		tree        : 'elfinder-tree',
		treeroot    : 'elfinder-navbar-root',
		navdir      : 'elfinder-navbar-dir',
		navdirwrap  : 'elfinder-navbar-dir-wrapper',
		navarrow    : 'elfinder-navbar-arrow',
		navsubtree  : 'elfinder-navbar-subtree',
		navcollapse : 'elfinder-navbar-collapsed',
		navexpand   : 'elfinder-navbar-expanded',
		treedir     : 'elfinder-tree-dir',
		placedir    : 'elfinder-place-dir',
		searchbtn   : 'elfinder-button-search'
	},
	tpl : {
		perms      : '<span class="elfinder-perms"/>',
		lock       : '<span class="elfinder-lock"/>',
		symlink    : '<span class="elfinder-symlink"/>',
		navicon    : '<span class="elfinder-nav-icon"/>',
		navspinner : '<span class="elfinder-navbar-spinner"/>',
		navdir     : '<div class="elfinder-navbar-wrapper"><span id="{id}" class="ui-corner-all elfinder-navbar-dir {cssclass}"><span class="elfinder-navbar-arrow"/><span class="elfinder-navbar-icon" {style}/>{symlink}{permissions}{name}</span><div class="elfinder-navbar-subtree"/></div>',
		placedir   : '<div class="elfinder-navbar-wrapper"><span id="{id}" class="ui-corner-all elfinder-navbar-dir {cssclass}" title="{title}"><span class="elfinder-navbar-arrow"/><span class="elfinder-navbar-icon" {style}/>{symlink}{permissions}{name}</span><div class="elfinder-navbar-subtree"/></div>'
		
	},
	
	mimes : {
		text : [
			'application/x-empty',
			'application/javascript', 
			'application/xhtml+xml', 
			'audio/x-mp3-playlist', 
			'application/x-web-config',
			'application/docbook+xml',
			'application/x-php',
			'application/x-perl',
			'application/x-awk',
			'application/x-config',
			'application/x-csh',
			'application/xml'
		]
	},
	
	mixin : {
		make : function() {
			var fm   = this.fm,
				cmd  = this.name,
				wz   = fm.getUI('workzone'),
				cwd  = fm.getUI('cwd'),
				tarea= (fm.storage('view') != 'list'),
				sel  = fm.selected(),
				move = this.move || false,
				empty= wz.hasClass('elfinder-cwd-wrapper-empty'),
				rest = function(){
					if (!overlay.is(':hidden')) {
						overlay.addClass('ui-front')
							.elfinderoverlay('hide')
							.off('click', cancel);
					}
					node.removeClass('ui-front').css('position', '');
					if (tarea) {
						nnode.css('max-height', '');
					} else {
						pnode.css('width', '')
							.parent('td').css('overflow', '');
					}
				}, colwidth,
				dfrd = $.Deferred()
					.fail(function(error) {
						empty && wz.addClass('elfinder-cwd-wrapper-empty');
						if (sel) {
							move && fm.trigger('unlockfiles', {files: sel});
							fm.clipboard([]);
							fm.trigger('selectfiles', { files: sel })
						}
						error && fm.error(error);
					})
					.always(function() {
						rest();
						input.remove();
						node.remove();
						fm.enable();
					}),
				id    = 'tmp_'+parseInt(Math.random()*100000),
				phash = fm.cwd().hash,
				date = new Date(),
				file   = {
					hash  : id,
					name  : fm.uniqueName(this.prefix),
					mime  : this.mime,
					read  : true,
					write : true,
					date  : 'Today '+date.getHours()+':'+date.getMinutes(),
					move  : move
				},
				data = this.data || {},
				node = cwd.trigger('create.'+fm.namespace, file).find('#'+fm.cwdHash2Id(id))
					.on('unselect.'+fm.namespace, function() {
						setTimeout(function() {
							input && input.blur();
						}, 50);
					}),
				nnode, pnode,
				overlay = fm.getUI().children('.elfinder-overlay'),
				cancel = function(e) { 
					if (! inError) {
						input.remove();
						node.remove();
						e.stopPropagation();
						dfrd.reject();
					}
				},
				input = $(tarea? '<textarea/>' : '<input type="text"/>')
					.on('keyup text', function(){
						if (tarea) {
							this.style.height = '1px';
							this.style.height = this.scrollHeight + 'px';
						} else if (colwidth) {
							this.style.width = colwidth + 'px';
							if (this.scrollWidth > colwidth) {
								this.style.width = this.scrollWidth + 10 + 'px';
							}
						}
					})
					.keydown(function(e) {
						e.stopImmediatePropagation();
						if (e.keyCode == $.ui.keyCode.ESCAPE) {
							dfrd.reject();
						} else if (e.keyCode == $.ui.keyCode.ENTER) {
							input.blur();
						}
					})
					.mousedown(function(e) {
						e.stopPropagation();
					})
					.blur(function() {
						var name   = $.trim(input.val()),
							parent = input.parent(),
							valid  = true,
							cut;

						if (!inError && parent.length) {

							if (fm.options.validName && fm.options.validName.test) {
								try {
									valid = fm.options.validName.test(name);
								} catch(e) {
									valid = false;
								}
							}
							if (!name || name === '..' || !valid) {
								inError = true;
								fm.error('errInvName', {modal: true, close: select});
								return false;
							}
							if (fm.fileByName(name, phash)) {
								inError = true;
								fm.error(['errExists', name], {modal: true, close: select});
								return false;
							}

							cut = (sel && move)? fm.exec('cut', sel) : null;

							$.when(cut)
							.done(function() {
								rest();
								parent.html(fm.escape(name));

								fm.lockfiles({files : [id]});

								fm.request({
										data        : $.extend({cmd : cmd, name : name, target : phash}, data || {}), 
										notify      : {type : cmd, cnt : 1},
										preventFail : true,
										syncOnFail  : true
									})
									.fail(function(error) {
										dfrd.reject(error);
									})
									.done(function(data) {
										dfrd.resolve(data);
										if (data.added && data.added[0]) {
											var dirhash = data.added[0].hash,
												newItem = cwd.find('#'+fm.cwdHash2Id(dirhash));
											if (sel && move) {
												fm.exec('paste', dirhash).done(function() {
													fm.trigger('selectfiles', { files: [dirhash] });
												});
											}
											if (newItem.length) {
												newItem.trigger('scrolltoview');
											}
										}
									});
							})
							.fail(function() {
								dfrd.reject();
							});
						}
					}),
				select = function() {
					var name = input.val().replace(/\.((tar\.(gz|bz|bz2|z|lzo))|cpio\.gz|ps\.gz|xcf\.(gz|bz2)|[a-z0-9]{1,4})$/ig, '');
					inError = false;
					if (fm.UA.Mobile) {
						overlay.on('click', cancel)
							.removeClass('ui-front').elfinderoverlay('show');
					}
					input.select().focus();
					input[0].setSelectionRange && input[0].setSelectionRange(0, name.length);
				},
				inError = false;

			if (this.disabled() || !node.length) {
				return dfrd.reject();
			}

			empty && wz.removeClass('elfinder-cwd-wrapper-empty');
			nnode = node.find('.elfinder-cwd-filename');
			pnode = nnode.parent();
			node.css('position', 'relative').addClass('ui-front');
			if (tarea) {
				nnode.css('max-height', 'none');
			} else {
				colwidth = pnode.width();
				pnode.width(colwidth - 15)
					.parent('td').css('overflow', 'visible');
			}
			nnode.empty('').append(input.val(file.name));
			
			input.trigger('keyup');
			select();

			return dfrd;

		}
	},
	blink: function(elm, mode) {
		mode = mode || 'slowonce';
		if (mode === 'slowonce') {
			elm.stop(true, true).delay(250).fadeIn(750).delay(500).fadeOut(3500);
		}
	}
};


/*
 * File: /js/jquery.dialogelfinder.js
 */

/**
 * @class dialogelfinder - open elFinder in dialog window
 *
 * @param  Object  elFinder options with dialog options
 * @example
 * $(selector).dialogelfinder({
 *     // some elfinder options
 *     title          : 'My files', // dialog title, default = "Files"
 *     width          : 850,        // dialog width, default 840
 *     autoOpen       : false,      // if false - dialog will not be opened after init, default = true
 *     destroyOnClose : true        // destroy elFinder on close dialog, default = false
 * })
 * @author Dmitry (dio) Levashov
 **/
$.fn.dialogelfinder = function(opts) {
	var position = 'elfinderPosition',
		destroy  = 'elfinderDestroyOnClose';
	
	this.not('.elfinder').each(function() {

		
		var doc     = $(document),
			toolbar = $('<div class="ui-widget-header dialogelfinder-drag ui-corner-top">'+(opts.title || 'Files')+'</div>'),
			button  = $('<a href="#" class="dialogelfinder-drag-close ui-corner-all"><span class="ui-icon ui-icon-closethick"> </span></a>')
				.appendTo(toolbar)
				.click(function(e) {
					e.preventDefault();
					
					node.dialogelfinder('close');
				}),
			node    = $(this).addClass('dialogelfinder')
				.css('position', 'absolute')
				.hide()
				.appendTo('body')
				.draggable({ handle : '.dialogelfinder-drag',
					     containment : 'window' })
				.elfinder(opts)
				.prepend(toolbar),
			elfinder = node.elfinder('instance');
		
		
		node.width(parseInt(node.width()) || 840) // fix width if set to "auto"
			.data(destroy, !!opts.destroyOnClose)
			.find('.elfinder-toolbar').removeClass('ui-corner-top');
		
		opts.position && node.data(position, opts.position);
		
		opts.autoOpen !== false && $(this).dialogelfinder('open');

	});
	
	if (opts == 'open') {
		var node = $(this),
			pos  = node.data(position) || {
				top  : parseInt($(document).scrollTop() + ($(window).height() < node.height() ? 2 : ($(window).height() - node.height())/2)),
				left : parseInt($(document).scrollLeft() + ($(window).width() < node.width()  ? 2 : ($(window).width()  - node.width())/2))
			};

		if (node.is(':hidden')) {
			node.addClass('ui-front').css(pos).show().trigger('resize');

			setTimeout(function() {
				// fix resize icon position and make elfinder active
				node.trigger('resize').mousedown();
			}, 200);
		}
	} else if (opts == 'close') {
		var node = $(this).removeClass('ui-front');
			
		if (node.is(':visible')) {
			!!node.data(destroy)
				? node.elfinder('destroy').remove()
				: node.elfinder('close');
		}
	} else if (opts == 'instance') {
		return $(this).getElFinder();
	}

	return this;
};


/*
 * File: /js/i18n/elfinder.en.js
 */

/**
 * English translation
 * @author Troex Nevelin <troex@fury.scancode.ru>
 * @version 2016-05-16
 */
if (elFinder && elFinder.prototype && typeof(elFinder.prototype.i18) == 'object') {
	elFinder.prototype.i18.en = {
		translator : 'Troex Nevelin &lt;troex@fury.scancode.ru&gt;',
		language   : 'English',
		direction  : 'ltr',
		dateFormat : 'M d, Y h:i A', // Mar 13, 2012 05:27 PM
		fancyDateFormat : '$1 h:i A', // will produce smth like: Today 12:25 PM
		messages   : {

			/********************************** errors **********************************/
			'error'                : 'Error',
			'errUnknown'           : 'Unknown error.',
			'errUnknownCmd'        : 'Unknown command.',
			'errJqui'              : 'Invalid jQuery UI configuration. Selectable, draggable and droppable components must be included.',
			'errNode'              : 'elFinder requires DOM Element to be created.',
			'errURL'               : 'Invalid elFinder configuration! URL option is not set.',
			'errAccess'            : 'Access denied.',
			'errConnect'           : 'Unable to connect to backend.',
			'errAbort'             : 'Connection aborted.',
			'errTimeout'           : 'Connection timeout.',
			'errNotFound'          : 'Backend not found.',
			'errResponse'          : 'Invalid backend response.',
			'errConf'              : 'Invalid backend configuration.',
			'errJSON'              : 'PHP JSON module not installed.',
			'errNoVolumes'         : 'Readable volumes not available.',
			'errCmdParams'         : 'Invalid parameters for command "$1".',
			'errDataNotJSON'       : 'Data is not JSON.',
			'errDataEmpty'         : 'Data is empty.',
			'errCmdReq'            : 'Backend request requires command name.',
			'errOpen'              : 'Unable to open "$1".',
			'errNotFolder'         : 'Object is not a folder.',
			'errNotFile'           : 'Object is not a file.',
			'errRead'              : 'Unable to read "$1".',
			'errWrite'             : 'Unable to write into "$1".',
			'errPerm'              : 'Permission denied.',
			'errLocked'            : '"$1" is locked and can not be renamed, moved or removed.',
			'errExists'            : 'File named "$1" already exists.',
			'errInvName'           : 'Invalid file name.',
			'errFolderNotFound'    : 'Folder not found.',
			'errFileNotFound'      : 'File not found.',
			'errTrgFolderNotFound' : 'Target folder "$1" not found.',
			'errPopup'             : 'Browser prevented opening popup window. To open file enable it in browser options.',
			'errMkdir'             : 'Unable to create folder "$1".',
			'errMkfile'            : 'Unable to create file "$1".',
			'errRename'            : 'Unable to rename "$1".',
			'errCopyFrom'          : 'Copying files from volume "$1" not allowed.',
			'errCopyTo'            : 'Copying files to volume "$1" not allowed.',
			'errMkOutLink'         : 'Unable to create a link to outside the volume root.', // from v2.1 added 03.10.2015
			'errUpload'            : 'Upload error.',  // old name - errUploadCommon
			'errUploadFile'        : 'Unable to upload "$1".', // old name - errUpload
			'errUploadNoFiles'     : 'No files found for upload.',
			'errUploadTotalSize'   : 'Data exceeds the maximum allowed size.', // old name - errMaxSize
			'errUploadFileSize'    : 'File exceeds maximum allowed size.', //  old name - errFileMaxSize
			'errUploadMime'        : 'File type not allowed.',
			'errUploadTransfer'    : '"$1" transfer error.',
			'errUploadTemp'        : 'Unable to make temporary file for upload.', // from v2.1 added 26.09.2015
			'errNotReplace'        : 'Object "$1" already exists at this location and can not be replaced by object with another type.', // new
			'errReplace'           : 'Unable to replace "$1".',
			'errSave'              : 'Unable to save "$1".',
			'errCopy'              : 'Unable to copy "$1".',
			'errMove'              : 'Unable to move "$1".',
			'errCopyInItself'      : 'Unable to copy "$1" into itself.',
			'errRm'                : 'Unable to remove "$1".',
			'errRmSrc'             : 'Unable remove source file(s).',
			'errExtract'           : 'Unable to extract files from "$1".',
			'errArchive'           : 'Unable to create archive.',
			'errArcType'           : 'Unsupported archive type.',
			'errNoArchive'         : 'File is not archive or has unsupported archive type.',
			'errCmdNoSupport'      : 'Backend does not support this command.',
			'errReplByChild'       : 'The folder "$1" can\'t be replaced by an item it contains.',
			'errArcSymlinks'       : 'For security reason denied to unpack archives contains symlinks or files with not allowed names.', // edited 24.06.2012
			'errArcMaxSize'        : 'Archive files exceeds maximum allowed size.',
			'errResize'            : 'Unable to resize "$1".',
			'errResizeDegree'      : 'Invalid rotate degree.',  // added 7.3.2013
			'errResizeRotate'      : 'Unable to rotate image.',  // added 7.3.2013
			'errResizeSize'        : 'Invalid image size.',  // added 7.3.2013
			'errResizeNoChange'    : 'Image size not changed.',  // added 7.3.2013
			'errUsupportType'      : 'Unsupported file type.',
			'errNotUTF8Content'    : 'File "$1" is not in UTF-8 and cannot be edited.',  // added 9.11.2011
			'errNetMount'          : 'Unable to mount "$1".', // added 17.04.2012
			'errNetMountNoDriver'  : 'Unsupported protocol.',     // added 17.04.2012
			'errNetMountFailed'    : 'Mount failed.',         // added 17.04.2012
			'errNetMountHostReq'   : 'Host required.', // added 18.04.2012
			'errSessionExpires'    : 'Your session has expired due to inactivity.',
			'errCreatingTempDir'   : 'Unable to create temporary directory: "$1"',
			'errFtpDownloadFile'   : 'Unable to download file from FTP: "$1"',
			'errFtpUploadFile'     : 'Unable to upload file to FTP: "$1"',
			'errFtpMkdir'          : 'Unable to create remote directory on FTP: "$1"',
			'errArchiveExec'       : 'Error while archiving files: "$1"',
			'errExtractExec'       : 'Error while extracting files: "$1"',
			'errNetUnMount'        : 'Unable to unmount', // from v2.1 added 30.04.2012
			'errConvUTF8'          : 'Not convertible to UTF-8', // from v2.1 added 08.04.2014
			'errFolderUpload'      : 'Try Google Chrome, If you\'d like to upload the folder.', // from v2.1 added 26.6.2015
			'errSearchTimeout'     : 'Timed out while searching "$1". Search result is partial.', // from v2.1 added 12.1.2016
			'errReauthRequire'     : 'Re-authorization is required.', // from v2.1.10 added 3.24.2016

			/******************************* commands names ********************************/
			'cmdarchive'   : 'Create archive',
			'cmdback'      : 'Back',
			'cmdcopy'      : 'Copy',
			'cmdcut'       : 'Cut',
			'cmddownload'  : 'Download',
			'cmdduplicate' : 'Duplicate',
			'cmdedit'      : 'Edit file',
			'cmdextract'   : 'Extract files from archive',
			'cmdforward'   : 'Forward',
			'cmdgetfile'   : 'Select files',
			'cmdhelp'      : 'About this software',
			'cmdhome'      : 'Home',
			'cmdinfo'      : 'Get info',
			'cmdmkdir'     : 'New folder',
			'cmdmkdirin'   : 'Into New Folder', // from v2.1.7 added 19.2.2016
			'cmdmkfile'    : 'New text file',
			'cmdopen'      : 'Open',
			'cmdpaste'     : 'Paste',
			'cmdquicklook' : 'Preview',
			'cmdreload'    : 'Reload',
			'cmdrename'    : 'Rename',
			'cmdrm'        : 'Delete',
			'cmdsearch'    : 'Find files',
			'cmdup'        : 'Go to parent directory',
			'cmdupload'    : 'Upload files',
			'cmdview'      : 'View',
			'cmdresize'    : 'Resize & Rotate',
			'cmdsort'      : 'Sort',
			'cmdnetmount'  : 'Mount network volume', // added 18.04.2012
			'cmdnetunmount': 'Unmount', // from v2.1 added 30.04.2012
			'cmdplaces'    : 'To Places', // added 28.12.2014
			'cmdchmod'     : 'Change mode', // from v2.1 added 20.6.2015
			'cmdopendir'   : 'Open a folder', // from v2.1 added 13.1.2016

			/*********************************** buttons ***********************************/
			'btnClose'  : 'Close',
			'btnSave'   : 'Save',
			'btnRm'     : 'Remove',
			'btnApply'  : 'Apply',
			'btnCancel' : 'Cancel',
			'btnNo'     : 'No',
			'btnYes'    : 'Yes',
			'btnMount'  : 'Mount',  // added 18.04.2012
			'btnApprove': 'Goto $1 & approve', // from v2.1 added 26.04.2012
			'btnUnmount': 'Unmount', // from v2.1 added 30.04.2012
			'btnConv'   : 'Convert', // from v2.1 added 08.04.2014
			'btnCwd'    : 'Here',      // from v2.1 added 22.5.2015
			'btnVolume' : 'Volume',    // from v2.1 added 22.5.2015
			'btnAll'    : 'All',       // from v2.1 added 22.5.2015
			'btnMime'   : 'MIME Type', // from v2.1 added 22.5.2015
			'btnFileName':'Filename',  // from v2.1 added 22.5.2015
			'btnSaveClose': 'Save & Close', // from v2.1 added 12.6.2015
			'btnBackup' : 'Backup', // fromv2.1 added 28.11.2015

			/******************************** notifications ********************************/
			'ntfopen'     : 'Open folder',
			'ntffile'     : 'Open file',
			'ntfreload'   : 'Reload folder content',
			'ntfmkdir'    : 'Creating directory',
			'ntfmkfile'   : 'Creating files',
			'ntfrm'       : 'Delete files',
			'ntfcopy'     : 'Copy files',
			'ntfmove'     : 'Move files',
			'ntfprepare'  : 'Prepare to copy files',
			'ntfrename'   : 'Rename files',
			'ntfupload'   : 'Uploading files',
			'ntfdownload' : 'Downloading files',
			'ntfsave'     : 'Save files',
			'ntfarchive'  : 'Creating archive',
			'ntfextract'  : 'Extracting files from archive',
			'ntfsearch'   : 'Searching files',
			'ntfresize'   : 'Resizing images',
			'ntfsmth'     : 'Doing something',
			'ntfloadimg'  : 'Loading image',
			'ntfnetmount' : 'Mounting network volume', // added 18.04.2012
			'ntfnetunmount': 'Unmounting network volume', // from v2.1 added 30.04.2012
			'ntfdim'      : 'Acquiring image dimension', // added 20.05.2013
			'ntfreaddir'  : 'Reading folder infomation', // from v2.1 added 01.07.2013
			'ntfurl'      : 'Getting URL of link', // from v2.1 added 11.03.2014
			'ntfchmod'    : 'Changing file mode', // from v2.1 added 20.6.2015
			'ntfpreupload': 'Verifying upload file name', // from v2.1 added 31.11.2015
			'ntfzipdl'    : 'Creating a file for download', // from v2.1.7 added 23.1.2016

			/************************************ dates **********************************/
			'dateUnknown' : 'unknown',
			'Today'       : 'Today',
			'Yesterday'   : 'Yesterday',
			'msJan'       : 'Jan',
			'msFeb'       : 'Feb',
			'msMar'       : 'Mar',
			'msApr'       : 'Apr',
			'msMay'       : 'May',
			'msJun'       : 'Jun',
			'msJul'       : 'Jul',
			'msAug'       : 'Aug',
			'msSep'       : 'Sep',
			'msOct'       : 'Oct',
			'msNov'       : 'Nov',
			'msDec'       : 'Dec',
			'January'     : 'January',
			'February'    : 'February',
			'March'       : 'March',
			'April'       : 'April',
			'May'         : 'May',
			'June'        : 'June',
			'July'        : 'July',
			'August'      : 'August',
			'September'   : 'September',
			'October'     : 'October',
			'November'    : 'November',
			'December'    : 'December',
			'Sunday'      : 'Sunday',
			'Monday'      : 'Monday',
			'Tuesday'     : 'Tuesday',
			'Wednesday'   : 'Wednesday',
			'Thursday'    : 'Thursday',
			'Friday'      : 'Friday',
			'Saturday'    : 'Saturday',
			'Sun'         : 'Sun',
			'Mon'         : 'Mon',
			'Tue'         : 'Tue',
			'Wed'         : 'Wed',
			'Thu'         : 'Thu',
			'Fri'         : 'Fri',
			'Sat'         : 'Sat',

			/******************************** sort variants ********************************/
			'sortname'          : 'by name',
			'sortkind'          : 'by kind',
			'sortsize'          : 'by size',
			'sortdate'          : 'by date',
			'sortFoldersFirst'  : 'Folders first',

			/********************************** new items **********************************/
			'untitled file.txt' : 'NewFile.txt', // added 10.11.2015
			'untitled folder'   : 'NewFolder',   // added 10.11.2015
			'Archive'           : 'NewArchive',  // from v2.1 added 10.11.2015

			/********************************** messages **********************************/
			'confirmReq'      : 'Confirmation required',
			'confirmRm'       : 'Are you sure you want to remove files?<br/>This cannot be undone!',
			'confirmRepl'     : 'Replace old file with new one?',
			'confirmConvUTF8' : 'Not in UTF-8<br/>Convert to UTF-8?<br/>Contents become UTF-8 by saving after conversion.', // from v2.1 added 08.04.2014
			'confirmNotSave'  : 'It has been modified.<br/>Losing work if you do not save changes.', // from v2.1 added 15.7.2015
			'apllyAll'        : 'Apply to all',
			'name'            : 'Name',
			'size'            : 'Size',
			'perms'           : 'Permissions',
			'modify'          : 'Modified',
			'kind'            : 'Kind',
			'read'            : 'read',
			'write'           : 'write',
			'noaccess'        : 'no access',
			'and'             : 'and',
			'unknown'         : 'unknown',
			'selectall'       : 'Select all files',
			'selectfiles'     : 'Select file(s)',
			'selectffile'     : 'Select first file',
			'selectlfile'     : 'Select last file',
			'viewlist'        : 'List view',
			'viewicons'       : 'Icons view',
			'places'          : 'Places',
			'calc'            : 'Calculate',
			'path'            : 'Path',
			'aliasfor'        : 'Alias for',
			'locked'          : 'Locked',
			'dim'             : 'Dimensions',
			'files'           : 'Files',
			'folders'         : 'Folders',
			'items'           : 'Items',
			'yes'             : 'yes',
			'no'              : 'no',
			'link'            : 'Link',
			'searcresult'     : 'Search results',
			'selected'        : 'selected items',
			'about'           : 'About',
			'shortcuts'       : 'Shortcuts',
			'help'            : 'Help',
			'webfm'           : 'Web file manager',
			'ver'             : 'Version',
			'protocolver'     : 'protocol version',
			'homepage'        : 'Project home',
			'docs'            : 'Documentation',
			'github'          : 'Fork us on Github',
			'twitter'         : 'Follow us on twitter',
			'facebook'        : 'Join us on facebook',
			'team'            : 'Team',
			'chiefdev'        : 'chief developer',
			'developer'       : 'developer',
			'contributor'     : 'contributor',
			'maintainer'      : 'maintainer',
			'translator'      : 'translator',
			'icons'           : 'Icons',
			'dontforget'      : 'and don\'t forget to take your towel',
			'shortcutsof'     : 'Shortcuts disabled',
			'dropFiles'       : 'Drop files here',
			'or'              : 'or',
			'selectForUpload' : 'Select files to upload',
			'moveFiles'       : 'Move files',
			'copyFiles'       : 'Copy files',
			'rmFromPlaces'    : 'Remove from places',
			'aspectRatio'     : 'Aspect ratio',
			'scale'           : 'Scale',
			'width'           : 'Width',
			'height'          : 'Height',
			'resize'          : 'Resize',
			'crop'            : 'Crop',
			'rotate'          : 'Rotate',
			'rotate-cw'       : 'Rotate 90 degrees CW',
			'rotate-ccw'      : 'Rotate 90 degrees CCW',
			'degree'          : '°',
			'netMountDialogTitle' : 'Mount network volume', // added 18.04.2012
			'protocol'            : 'Protocol', // added 18.04.2012
			'host'                : 'Host', // added 18.04.2012
			'port'                : 'Port', // added 18.04.2012
			'user'                : 'User', // added 18.04.2012
			'pass'                : 'Password', // added 18.04.2012
			'confirmUnmount'      : 'Are you unmount $1?',  // from v2.1 added 30.04.2012
			'dropFilesBrowser': 'Drop or Paste files from browser', // from v2.1 added 30.05.2012
			'dropPasteFiles'  : 'Drop or Paste files here', // from v2.1 added 07.04.2014
			'encoding'        : 'Encoding', // from v2.1 added 19.12.2014
			'locale'          : 'Locale',   // from v2.1 added 19.12.2014
			'searchTarget'    : 'Target: $1',                // from v2.1 added 22.5.2015
			'searchMime'      : 'Search by input MIME Type', // from v2.1 added 22.5.2015
			'owner'           : 'Owner', // from v2.1 added 20.6.2015
			'group'           : 'Group', // from v2.1 added 20.6.2015
			'other'           : 'Other', // from v2.1 added 20.6.2015
			'execute'         : 'Execute', // from v2.1 added 20.6.2015
			'perm'            : 'Permission', // from v2.1 added 20.6.2015
			'mode'            : 'Mode', // from v2.1 added 20.6.2015
			'emptyFolder'     : 'Folder is empty', // from v2.1.6 added 30.12.2015
			'emptyFolderDrop' : 'Folder is empty\\A Drop to add items', // from v2.1.6 added 30.12.2015
			'emptyFolderLTap' : 'Folder is empty\\A Long tap to add items', // from v2.1.6 added 30.12.2015
			'quality'         : 'Quality', // from v2.1.6 added 5.1.2016
			'autoSync'        : 'Auto sync',  // from v2.1.6 added 10.1.2016
			'moveUp'          : 'Move up',  // from v2.1.6 added 18.1.2016
			'getLink'         : 'Get URL link', // from v2.1.7 added 9.2.2016
			'selectedItems'   : 'Selected items ($1)', // from v2.1.7 added 2.19.2016
			'folderId'        : 'Folder ID', // from v2.1.10 added 3.25.2016
			'offlineAccess'   : 'Allow offline access', // from v2.1.10 added 3.25.2016
			'reAuth'          : 'To re-authenticate', // from v2.1.10 added 3.25.2016
			'nowLoading'      : 'Now loading...', // from v2.1.12 added 4.26.2016
			'openMulti'       : 'Open multiple files', // from v2.1.12 added 5.14.2016
			'openMultiConfirm': 'You are trying to open the $1 files. Are you sure you want to open in browser?', // from v2.1.12 added 5.14.2016
			'emptySearch'     : 'Search results is empty', // from v2.1.12 added 5.16.2016

			/********************************** mimetypes **********************************/
			'kindUnknown'     : 'Unknown',
			'kindFolder'      : 'Folder',
			'kindAlias'       : 'Alias',
			'kindAliasBroken' : 'Broken alias',
			// applications
			'kindApp'         : 'Application',
			'kindPostscript'  : 'Postscript document',
			'kindMsOffice'    : 'Microsoft Office document',
			'kindMsWord'      : 'Microsoft Word document',
			'kindMsExcel'     : 'Microsoft Excel document',
			'kindMsPP'        : 'Microsoft Powerpoint presentation',
			'kindOO'          : 'Open Office document',
			'kindAppFlash'    : 'Flash application',
			'kindPDF'         : 'Portable Document Format (PDF)',
			'kindTorrent'     : 'Bittorrent file',
			'kind7z'          : '7z archive',
			'kindTAR'         : 'TAR archive',
			'kindGZIP'        : 'GZIP archive',
			'kindBZIP'        : 'BZIP archive',
			'kindXZ'          : 'XZ archive',
			'kindZIP'         : 'ZIP archive',
			'kindRAR'         : 'RAR archive',
			'kindJAR'         : 'Java JAR file',
			'kindTTF'         : 'True Type font',
			'kindOTF'         : 'Open Type font',
			'kindRPM'         : 'RPM package',
			// texts
			'kindText'        : 'Text document',
			'kindTextPlain'   : 'Plain text',
			'kindPHP'         : 'PHP source',
			'kindCSS'         : 'Cascading style sheet',
			'kindHTML'        : 'HTML document',
			'kindJS'          : 'Javascript source',
			'kindRTF'         : 'Rich Text Format',
			'kindC'           : 'C source',
			'kindCHeader'     : 'C header source',
			'kindCPP'         : 'C++ source',
			'kindCPPHeader'   : 'C++ header source',
			'kindShell'       : 'Unix shell script',
			'kindPython'      : 'Python source',
			'kindJava'        : 'Java source',
			'kindRuby'        : 'Ruby source',
			'kindPerl'        : 'Perl script',
			'kindSQL'         : 'SQL source',
			'kindXML'         : 'XML document',
			'kindAWK'         : 'AWK source',
			'kindCSV'         : 'Comma separated values',
			'kindDOCBOOK'     : 'Docbook XML document',
			'kindMarkdown'    : 'Markdown text', // added 20.7.2015
			// images
			'kindImage'       : 'Image',
			'kindBMP'         : 'BMP image',
			'kindJPEG'        : 'JPEG image',
			'kindGIF'         : 'GIF Image',
			'kindPNG'         : 'PNG Image',
			'kindTIFF'        : 'TIFF image',
			'kindTGA'         : 'TGA image',
			'kindPSD'         : 'Adobe Photoshop image',
			'kindXBITMAP'     : 'X bitmap image',
			'kindPXM'         : 'Pixelmator image',
			// media
			'kindAudio'       : 'Audio media',
			'kindAudioMPEG'   : 'MPEG audio',
			'kindAudioMPEG4'  : 'MPEG-4 audio',
			'kindAudioMIDI'   : 'MIDI audio',
			'kindAudioOGG'    : 'Ogg Vorbis audio',
			'kindAudioWAV'    : 'WAV audio',
			'AudioPlaylist'   : 'MP3 playlist',
			'kindVideo'       : 'Video media',
			'kindVideoDV'     : 'DV movie',
			'kindVideoMPEG'   : 'MPEG movie',
			'kindVideoMPEG4'  : 'MPEG-4 movie',
			'kindVideoAVI'    : 'AVI movie',
			'kindVideoMOV'    : 'Quick Time movie',
			'kindVideoWM'     : 'Windows Media movie',
			'kindVideoFlash'  : 'Flash movie',
			'kindVideoMKV'    : 'Matroska movie',
			'kindVideoOGG'    : 'Ogg movie'
		}
	};
}



/*
 * File: /js/ui/button.js
 */

/**
 * @class  elFinder toolbar button widget.
 * If command has variants - create menu
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfinderbutton = function(cmd) {
	return this.each(function() {
		
		var c        = 'class',
			fm       = cmd.fm,
			disabled = fm.res(c, 'disabled'),
			active   = fm.res(c, 'active'),
			hover    = fm.res(c, 'hover'),
			item     = 'elfinder-button-menu-item',
			selected = 'elfinder-button-menu-item-selected',
			menu,
			button   = $(this).addClass('ui-state-default elfinder-button')
				.attr('title', cmd.title)
				.append('<span class="elfinder-button-icon elfinder-button-icon-'+cmd.name+'"/>')
				.hover(function(e) { !button.hasClass(disabled) && button[e.type == 'mouseleave' ? 'removeClass' : 'addClass'](hover) /**button.toggleClass(hover);*/ })
				.click(function(e) { 
					if (!button.hasClass(disabled)) {
						if (menu && cmd.variants.length > 1) {
							// close other menus
							menu.is(':hidden') && cmd.fm.getUI().click();
							e.stopPropagation();
							menu.slideToggle(100);
						} else {
							cmd.exec();
						}
						
					}
				}),
			hideMenu = function() {
				menu.hide();
			};
			
		// if command has variants create menu
		if ($.isArray(cmd.variants)) {
			button.addClass('elfinder-menubutton');
			
			menu = $('<div class="ui-front ui-widget ui-widget-content elfinder-button-menu ui-corner-all"/>')
				.hide()
				.appendTo(button)
				.on('mouseenter mouseleave', '.'+item, function() { $(this).toggleClass(hover) })
				.on('click', '.'+item, function(e) {
					e.preventDefault();
					e.stopPropagation();
					button.removeClass(hover);
					menu.hide();
					cmd.exec(cmd.fm.selected(), $(this).data('value'));
				});

			cmd.fm.bind('disable select', hideMenu).getUI().click(hideMenu);
			
			cmd.change(function() {
				menu.html('');
				$.each(cmd.variants, function(i, variant) {
					menu.append($('<div class="'+item+'">'+variant[1]+'</div>').data('value', variant[0]).addClass(variant[0] == cmd.value ? selected : ''));
				});
			});
		}	
			
		cmd.change(function() {
			if (cmd.disabled()) {
				button.removeClass(active+' '+hover).addClass(disabled);
			} else {
				button.removeClass(disabled);
				button[cmd.active() ? 'addClass' : 'removeClass'](active);
			}
		})
		.change();
	});
};


/*
 * File: /js/ui/contextmenu.js
 */

/**
 * @class  elFinder contextmenu
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfindercontextmenu = function(fm) {
	
	return this.each(function() {
		var self   = $(this),
			cmItem = 'elfinder-contextmenu-item',
			smItem = 'elfinder-contextsubmenu-item',
			exIcon = 'elfinder-contextmenu-extra-icon',
			menu = self.addClass('ui-helper-reset ui-front ui-widget ui-state-default ui-corner-all elfinder-contextmenu elfinder-contextmenu-'+fm.direction)
				.hide()
				.on('mouseenter mouseleave', '.'+cmItem, function(e) {
					$(this).toggleClass('ui-state-hover', e.type === 'mouseenter');
				})
				.on('mouseenter mouseleave', '.'+exIcon, function(e) {
					$(this).parent().toggleClass('ui-state-hover', e.type === 'mouseleave');
				})
				.on('contextmenu', function(){return false;}),
			subpos  = fm.direction == 'ltr' ? 'left' : 'right',
			types = $.extend({}, fm.options.contextmenu),
			tpl     = '<div class="'+cmItem+'"><span class="elfinder-button-icon {icon} elfinder-contextmenu-icon"/><span>{label}</span></div>',
			item = function(label, icon, callback) {
				return $(tpl.replace('{icon}', icon ? 'elfinder-button-icon-'+icon : '').replace('{label}', label))
					.click(function(e) {
						e.stopPropagation();
						e.preventDefault();
						callback();
					});
			},
			base, cwd,

			autoToggle = function() {
				var evTouchStart = 'touchstart.contextmenuAutoToggle';
				menu.data('hideTm') && clearTimeout(menu.data('hideTm'));
				if (menu.is(':visible')) {
					menu.on('touchstart', function(e) {
						if (e.originalEvent.touches.length > 1) {
							return;
						}
						menu.stop().show();
						menu.data('hideTm') && clearTimeout(menu.data('hideTm'));
					})
					.data('hideTm', setTimeout(function() {
						cwd.find('.elfinder-cwd-file').off(evTouchStart);
						cwd.find('.elfinder-cwd-file.ui-selected')
						.one(evTouchStart, function(e) {
							if (e.originalEvent.touches.length > 1) {
								return;
							}
							var tgt = $(e.target);
							if (menu.first().length && !tgt.is('input:checkbox') && !tgt.hasClass('elfinder-cwd-select')) {
								open(e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
								return false;
							}
							cwd.find('.elfinder-cwd-file').off(evTouchStart);
						})
						.one('unselect.'+fm.namespace, function() {
							cwd.find('.elfinder-cwd-file').off(evTouchStart);
						});
						menu.fadeOut({
							duration: 300,
							fail: function() {
								menu.css('opacity', '1').show();
							}
						});
					}, 4500));
				}
			},
			
			open = function(x, y) {
				var width      = menu.outerWidth(),
					height     = menu.outerHeight(),
					bpos       = base.offset(),
					bwidth     = base.width(),
					bheight    = base.height(),
					mw         = fm.UA.Mobile? 40 : 2,
					mh         = fm.UA.Mobile? 20 : 2,
					body       = $('body'),
					x          = x - (bpos? bpos.left : 0),
					y          = y - (bpos? bpos.top : 0),
					css        = {
						top  : Math.max(0, y + mh + height < bheight ? y + mh : y - (y + height - bheight)),
						left : Math.max(0, (x < width + mw || x + mw + width < bwidth)? x + mw : x - mw - width),
						opacity : '1'
					};

				menu.stop().css(css).show();
				
				css[subpos] = parseInt(menu.width());
				menu.find('.elfinder-contextmenu-sub').css(css);
				if (fm.UA.iOS) {
					$('div.elfinder div.overflow-scrolling-touch').css('-webkit-overflow-scrolling', 'auto');
				}
				fm.UA.Mobile && autoToggle();
			},
			
			close = function() {
				menu.hide().empty();
				fm.trigger('closecontextmenu');
				if (fm.UA.iOS) {
					$('div.elfinder div.overflow-scrolling-touch').css('-webkit-overflow-scrolling', 'touch');
				}
			},
			
			create = function(type, targets) {
				var sep = false,
				cmdMap = {}, disabled = [], isCwd = (targets[0].indexOf(fm.cwd().volumeid, 0) === 0),
				selcnt = 0;

				if (self.data('cmdMaps')) {
					$.each(self.data('cmdMaps'), function(i, v){
						if (targets[0].indexOf(i, 0) == 0) {
							cmdMap = v;
							return false;
						}
					});
				}
				if (!isCwd) {
					if (fm.disabledCmds) {
						$.each(fm.disabledCmds, function(i, v){
							if (targets[0].indexOf(i, 0) == 0) {
								disabled = v;
								return false;
							}
						});
					}
				}
				if (type === 'navbar') {
					fm.select({selected: targets});
				}

				selcnt = fm.selected().length;
				if (selcnt > 1) {
					menu.append('<div class="ui-corner-top ui-widget-header elfinder-contextmenu-header"><span>'
					 + fm.i18n('selectedItems', ''+selcnt)
					 + '</span></div>');
				}
				$.each(types[type]||[], function(i, name) {
					var cmd, node, submenu, hover;
					
					if (name == '|' && sep) {
						menu.append('<div class="elfinder-contextmenu-separator"/>');
						sep = false;
						return;
					}
					
					if (cmdMap[name]) {
						name = cmdMap[name];
					}
					cmd = fm.command(name);

					if (cmd && !isCwd && (!fm.searchStatus.state || !cmd.disableOnSearch)) {
						cmd.__disabled = cmd._disabled;
						cmd._disabled = !(cmd.alwaysEnabled || (fm._commands[name] ? $.inArray(name, disabled) === -1 : false));
						$.each(cmd.linkedCmds, function(i, n) {
							var c;
							if (c = fm.command(n)) {
								c.__disabled = c._disabled;
								c._disabled = !(c.alwaysEnabled || (fm._commands[n] ? $.inArray(n, disabled) === -1 : false));
							}
						});
					}

					if (cmd && cmd.getstate(targets) != -1) {
						if (cmd.variants) {
							if (!cmd.variants.length) {
								return;
							}
							node = item(cmd.title, cmd.name, function(){})
							.on('touchend', function(e){
								node.data('touching', true);
								setTimeout(function(){node.data('touching', false);}, 50);
							})
							.on('click touchend', '.'+smItem, function(e){
								var opts;
								e.stopPropagation();
								if (node.data('touching')) {
									node.data('touching', false);
									$(this).removeClass('ui-state-hover');
									e.preventDefault();
								} else if (e.type == 'click') {
									menu.hide();
									opts = $(this).data('exec');
									if ($.isPlainObject(opts)) {
										opts._currentType = type;
									}
									cmd.exec(targets, opts);
								}
							});
							
							submenu = $('<div class="ui-front ui-corner-all elfinder-contextmenu-sub"/>')
								.appendTo(node.append('<span class="elfinder-contextmenu-arrow"/>'));
							
							hover = function(show){
								submenu.css({ left: 'auto', right: 'auto' });
								var nodeOffset = node.offset(),
									baseleft   = nodeOffset.left,
									basetop    = nodeOffset.top,
									basewidth  = node.outerWidth(),
									width      = submenu.outerWidth(),
									height     = submenu.outerHeight(),
									baseOffset = base.offset(),
									wwidth     = baseOffset.left + base.width(),
									wheight    = baseOffset.top + base.height(),
									x, y, over;

								over = (baseleft + basewidth + width) - wwidth;
								x = (baseleft > width && over > 0)? (fm.UA.Mobile? 10 - width : basewidth - over) : basewidth;
								if (subpos === 'right' && baseleft < width) {
									x = fm.UA.Mobile? 30 - basewidth : basewidth - (width - baseleft);
								}
								over = (basetop + 5 + height) - wheight;
								y = (over > 0 && basetop < wheight)? 10 - over : (over > 0? 30 - height : 5);

								submenu.css({ top : y }).css(subpos, x).toggle(show);
							};
							
							node.addClass('elfinder-contextmenu-group').hover(function(e){
								if (fm.UA.Mobile) {
									hover(e.type === 'mouseenter');
								} else {
									if (e.type === 'mouseleave') {
										node.data('timer', setTimeout(function() {
											node.data('timer', null);
											hover(false);
										}, 250));
									} else {
										if (node.data('timer')) {
											clearTimeout(node.data('timer'));
											node.data('timer', null);
										}
										hover(true);
									}
								}
							});
							
							$.each(cmd.variants, function(i, variant) {
								submenu.append(
									variant === '|' ? '<div class="elfinder-contextmenu-separator"/>' :
									$('<div class="'+cmItem+' '+smItem+'"><span>'+variant[1]+'</span></div>').data('exec', variant[0])
								);
							});
								
						} else {
							node = item(cmd.title, cmd.name, function() {
								close();
								cmd.exec(targets, {_currentType: type});
							});
							if (cmd.extra && cmd.extra.node) {
								$('<span class="elfinder-button-icon elfinder-button-icon-'+(cmd.extra.icon || '')+' elfinder-contextmenu-extra-icon"/>')
									.append(cmd.extra.node).appendTo(node);
								$(cmd.extra.node).trigger('ready');
							} else {
								node.remove('.elfinder-contextmenu-extra-icon');
							}
						}
						
						menu.append(node)
						sep = true;
					}
					
					if (cmd && typeof cmd.__disabled !== 'undefined') {
						cmd._disabled = cmd.__disabled;
						delete cmd.__disabled;
						$.each(cmd.linkedCmds, function(i, n) {
							var c;
							if (c = fm.command(n)) {
								c._disabled = c.__disabled;
								delete c.__disabled;
							}
						});
					}
				});
			},
			
			createFromRaw = function(raw) {
				$.each(raw, function(i, data) {
					var node;
					
					if (data === '|') {
						menu.append('<div class="elfinder-contextmenu-separator"/>');
					} else if (data.label && typeof data.callback == 'function') {
						node = item(data.label, data.icon, function() {
							!data.remain && close();
							data.callback();
						});
						menu.append(node);
					}
				});
			};
		
		fm.one('load', function() {
			base = fm.getUI();
			cwd = fm.getUI('cwd');
			fm.bind('contextmenu', function(e) {
				var data = e.data;

				if (!data.type || data.type !== 'files') {
					cwd.trigger('unselectall');
				}
				close();

				if (data.type && data.targets) {
					create(data.type, data.targets);
				} else if (data.raw) {
					createFromRaw(data.raw);
				}

				menu.children().length && open(data.x, data.y);
			})
			.one('destroy', function() { menu.remove(); })
			.bind('disable select', function(){
				// 'mouseEvInternal' for Firefox's bug (maybe)
				!self.data('mouseEvInternal') && close();
				self.data('mouseEvInternal', false);
			})
			.getUI().click(close);
		});
		
	});
	
};


/*
 * File: /js/ui/cwd.js
 */

/**
 * elFinder current working directory ui.
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfindercwd = function(fm, options) {
	
	this.not('.elfinder-cwd').each(function() {
		// fm.time('cwdLoad');
		
		var mobile = fm.UA.Mobile,
			list = fm.viewType == 'list',

			undef = 'undefined',
			/**
			 * Select event full name
			 *
			 * @type String
			 **/
			evtSelect = 'select.'+fm.namespace,
			
			/**
			 * Unselect event full name
			 *
			 * @type String
			 **/
			evtUnselect = 'unselect.'+fm.namespace,
			
			/**
			 * Disable event full name
			 *
			 * @type String
			 **/
			evtDisable = 'disable.'+fm.namespace,
			
			/**
			 * Disable event full name
			 *
			 * @type String
			 **/
			evtEnable = 'enable.'+fm.namespace,
			
			c = 'class',
			/**
			 * File css class
			 *
			 * @type String
			 **/
			clFile       = fm.res(c, 'cwdfile'),
			
			/**
			 * Selected css class
			 *
			 * @type String
			 **/
			fileSelector = '.'+clFile,
			
			/**
			 * Selected css class
			 *
			 * @type String
			 **/
			clSelected = 'ui-selected',
			
			/**
			 * Disabled css class
			 *
			 * @type String
			 **/
			clDisabled = fm.res(c, 'disabled'),
			
			/**
			 * Draggable css class
			 *
			 * @type String
			 **/
			clDraggable = fm.res(c, 'draggable'),
			
			/**
			 * Droppable css class
			 *
			 * @type String
			 **/
			clDroppable = fm.res(c, 'droppable'),
			
			/**
			 * Hover css class
			 *
			 * @type String
			 **/
			clHover     = fm.res(c, 'hover'), 

			/**
			 * Hover css class
			 *
			 * @type String
			 **/
			clDropActive = fm.res(c, 'adroppable'),

			/**
			 * Css class for temporary nodes (for mkdir/mkfile) commands
			 *
			 * @type String
			 **/
			clTmp = clFile+'-tmp',

			/**
			 * Number of thumbnails to load in one request (new api only)
			 *
			 * @type Number
			 **/
			tmbNum = fm.options.loadTmbs > 0 ? fm.options.loadTmbs : 5,
			
			/**
			 * Current search query.
			 *
			 * @type String
			 */
			query = '',

			lastSearch = [],

			/**
			 * Currect clipboard(cut) hashes as object key
			 * 
			 * @type Object
			 */
			clipCuts = {},

			/**
			 * Parents hashes of cwd
			 *
			 * @type Array
			 */
			cwdParents = [],

			customColsBuild = function() {
				var customCols = '';
				var columns = options.listView.columns;
				for (var i = 0; i < columns.length; i++) {
					customCols += '<td>{' + columns[i] + '}</td>';
				}
				return customCols;
			},
			
			selectCheckbox = ($.map(options.showSelectCheckboxUA, function(t) {return (fm.UA[t] || t.match(/^all$/i))? true : null;}).length)? '<div class="elfinder-cwd-select"><input type="checkbox"></div>' : '',

			/**
			 * File templates
			 *
			 * @type Object
			 **/
			templates = {
				icon : '<div id="{id}" class="'+clFile+' {permsclass} {dirclass} ui-corner-all" title="{tooltip}"><div class="elfinder-cwd-file-wrapper ui-corner-all"><div class="elfinder-cwd-icon {mime} ui-corner-all" unselectable="on"{style}/>{marker}</div><div class="elfinder-cwd-filename" title="{nametitle}">{name}</div>'+selectCheckbox+'</div>',
				row  : '<tr id="{id}" class="'+clFile+' {permsclass} {dirclass}" title="{tooltip}"{css}><td><div class="elfinder-cwd-file-wrapper"><span class="elfinder-cwd-icon {mime}"{style}/>{marker}<span class="elfinder-cwd-filename">{name}</span></div>'+selectCheckbox+'</td>'+customColsBuild()+'</tr>',
			},
			
			permsTpl = fm.res('tpl', 'perms'),
			
			lockTpl = fm.res('tpl', 'lock'),
			
			symlinkTpl = fm.res('tpl', 'symlink'),
			
			/**
			 * Template placeholders replacement rules
			 *
			 * @type Object
			 **/
			replacement = {
				id : function(f) {
					return fm.cwdHash2Id(f.hash);
				},
				name : function(f) {
					var name = fm.escape(f.name);
					!list && (name = name.replace(/([_.])/g, '&#8203;$1'));
					return name;
				},
				nametitle : function(f) {
					return fm.escape(f.name);
				},
				permsclass : function(f) {
					return fm.perms2class(f);
				},
				perm : function(f) {
					return fm.formatPermissions(f);
				},
				dirclass : function(f) {
					var cName = f.mime == 'directory' ? 'directory' : '';
					options.getClass && (cName += ' ' + options.getClass(f));
					return cName;
				},
				style : function(f) {
					return f.icon? 'style="background:url(\''+fm.escape(f.icon)+'\') 0 0 no-repeat;background-size:contain;"' : '';
				},
				mime : function(f) {
					return fm.mime2class(f.mime);
				},
				size : function(f) {
					return (f.mime === 'directory' && !f.size)? '-' : fm.formatSize(f.size);
				},
				date : function(f) {
					return fm.formatDate(f);
				},
				kind : function(f) {
					return fm.mime2kind(f);
				},
				mode : function(f) {
					return f.perm? fm.formatFileMode(f.perm) : '';
				},
				modestr : function(f) {
					return f.perm? fm.formatFileMode(f.perm, 'string') : '';
				},
				modeoct : function(f) {
					return f.perm? fm.formatFileMode(f.perm, 'octal') : '';
				},
				modeboth : function(f) {
					return f.perm? fm.formatFileMode(f.perm, 'both') : '';
				},
				marker : function(f) {
					return (f.alias || f.mime == 'symlink-broken' ? symlinkTpl : '')+(!f.read || !f.write ? permsTpl : '')+(f.locked ? lockTpl : '');
				},
				tooltip : function(f) {
					var title = fm.formatDate(f) + (f.size > 0 ? ' ('+fm.formatSize(f.size)+')' : ''),
						info  = '';
					if (query && f.path) {
						info = fm.escape(f.path.replace(/\/[^\/]*$/, ''));
					} else {
						info = f.tooltip? fm.escape(f.tooltip).replace(/\r/g, '&#13;') : '';
					}
					return info? info + '&#13;' + title : title;
				}
			},
			
			/**
			 * Return file html
			 *
			 * @param  Object  file info
			 * @return String
			 **/
			itemhtml = function(f) {
				return templates[list ? 'row' : 'icon']
						.replace(/\{([a-z]+)\}/g, function(s, e) { 
							return replacement[e] ? replacement[e](f) : (f[e] ? f[e] : ''); 
						});
			},
			
			/**
			 * Flag. Required for msie to avoid unselect files on dragstart
			 *
			 * @type Boolean
			 **/
			selectLock = false,
			
			/**
			 * Move selection to prev/next file
			 *
			 * @param String  move direction
			 * @param Boolean append to current selection
			 * @return void
			 * @rise select			
			 */
			select = function(keyCode, append) {
				var code     = $.ui.keyCode,
					prev     = keyCode == code.LEFT || keyCode == code.UP,
					sel      = cwd.find('[id].'+clSelected),
					selector = prev ? 'first:' : 'last',
					s, n, sib, top, left;

				function sibling(n, direction) {
					return n[direction+'All']('[id]:not(.'+clDisabled+'):not(.elfinder-cwd-parent):first');
				}
				
				if (sel.length) {
					s = sel.filter(prev ? ':first' : ':last');
					sib = sibling(s, prev ? 'prev' : 'next');
					
					if (!sib.length) {
						// there is no sibling on required side - do not move selection
						n = s;
					} else if (list || keyCode == code.LEFT || keyCode == code.RIGHT) {
						// find real prevoius file
						n = sib;
					} else {
						// find up/down side file in icons view
						top = s.position().top;
						left = s.position().left;

						n = s;
						if (prev) {
							do {
								n = n.prev('[id]');
							} while (n.length && !(n.position().top < top && n.position().left <= left));

							if (n.hasClass(clDisabled)) {
								n = sibling(n, 'next');
							}
						} else {
							do {
								n = n.next('[id]');
							} while (n.length && !(n.position().top > top && n.position().left >= left));
							
							if (n.hasClass(clDisabled)) {
								n = sibling(n, 'prev');
							}
							// there is row before last one - select last file
							if (!n.length) {
								sib = cwd.find('[id]:not(.'+clDisabled+'):last');
								if (sib.position().top > top) {
									n = sib;
								}
							}
						}
					}
					// !append && unselectAll();
				} else {
					// there are no selected file - select first/last one
					n = cwd.find('[id]:not(.'+clDisabled+'):not(.elfinder-cwd-parent):'+(prev ? 'last' : 'first'));
				}
				
				if (n && n.length && !n.hasClass('elfinder-cwd-parent')) {
					if (append) {
						// append new files to selected
						n = s.add(s[prev ? 'prevUntil' : 'nextUntil']('#'+n.attr('id'))).add(n);
					} else {
						// unselect selected files
						sel.trigger(evtUnselect);
					}
					// select file(s)
					n.trigger(evtSelect);
					// set its visible
					scrollToView(n.filter(prev ? ':first' : ':last'));
					// update cache/view
					trigger();
				}
			},
			
			selectedFiles = [],
			
			selectFile = function(hash) {
				$('#'+fm.cwdHash2Id(hash)).trigger(evtSelect);
			},
			
			selectAll = function() {
				var phash = fm.cwd().hash;

				selectCheckbox && selectAllCheckbox.find('input').prop('checked', true);
				cwd.find('[id]:not(.'+clSelected+'):not(.elfinder-cwd-parent)').trigger(evtSelect);
				if (lastSearch.length) {
					selectedFiles = $.map(lastSearch, function(f) { return f.hash; });
				} else {
					selectedFiles = $.map(fm.files(), function(f) { return f.phash == phash ? f.hash : null ;});
				}
				trigger();
				selectCheckbox && selectAllCheckbox.data('pending', false);
				cwd.addClass('elfinder-cwd-allselected');
			},
			
			/**
			 * Unselect all files
			 *
			 * @return void
			 */
			unselectAll = function() {
				selectCheckbox && selectAllCheckbox.find('input').prop('checked', false);
				if (selectedFiles.length) {
					selectLock = false;
					selectedFiles = [];
					cwd.find('[id].'+clSelected).trigger(evtUnselect);
					selectCheckbox && cwd.find('input:checkbox').prop('checked', false);
				} else {
					fm.select({selected: []});
				}
				trigger();
				selectCheckbox && selectAllCheckbox.data('pending', false);
				cwd.removeClass('elfinder-cwd-allselected');
			},
			
			/**
			 * Return selected files hashes list
			 *
			 * @return Array
			 */
			selected = function() {
				return selectedFiles;
			},
			
			/**
			 * Fire elfinder "select" event and pass selected files to it
			 *
			 * @return void
			 */
			trigger = function() {
				fm.trigger('select', {selected : selectedFiles});
			},
			
			/**
			 * Scroll file to set it visible
			 *
			 * @param DOMElement  file/dir node
			 * @return void
			 */
			scrollToView = function(o) {
				var ftop    = o.position().top,
					fheight = o.outerHeight(true),
					wtop    = wrapper.scrollTop(),
					wheight = wrapper.get(0).clientHeight,
					thheight = tableHeader? tableHeader.outerHeight(true) : 0;

				if (ftop + thheight + fheight > wtop + wheight) {
					wrapper.scrollTop(parseInt(ftop + thheight + fheight - wheight));
				} else if (ftop < wtop) {
					wrapper.scrollTop(ftop);
				}
				list && wrapper.scrollLeft(0);
			},
			
			/**
			 * Files we get from server but not show yet
			 *
			 * @type Array
			 **/
			buffer = [],
			
			/**
			 * Extra data of buffer
			 *
			 * @type Object
			 **/
			bufferExt = {},
			
			/**
			 * Return index of elements with required hash in buffer 
			 *
			 * @param String  file hash
			 * @return Number
			 */
			index = function(hash) {
				var l = buffer.length;
				
				while (l--) {
					if (buffer[l].hash == hash) {
						return l;
					}
				}
				return -1;
			},
			
			/**
			 * Scroll event name
			 *
			 * @type String
			 **/
			scrollEvent = 'scroll.'+fm.namespace,
			
			/**
			 * jQuery UI selectable option
			 * 
			 * @type Object
			 */
			selectableOption = {
				filter     : fileSelector,
				stop       : trigger,
				delay      : 250,
				selected   : function(e, ui) { $(ui.selected).trigger(evtSelect); },
				unselected : function(e, ui) { $(ui.unselected).trigger(evtUnselect); }
			},
			
			/**
			 * Cwd scroll event handler.
			 * Lazy load - append to cwd not shown files
			 *
			 * @return void
			 */
			render = function() {
				var place = (list ? cwd.children('table').children('tbody') : cwd),
					last  = cwd.find('[id]:last'),
					go    = function(){
						var html  = [],
							dirs  = false,
							ltmb  = [],
							atmb  = {},
							stmb  = (fm.option('tmbUrl') === 'self'),
							top   = !last.length,
							chk, files, locks;
	
						// check draging scroll bar
						top && (wrapper._top = 0);
						if (!!wrapper._mousedown && wrapper._top != wrapper.scrollTop()) {
							wrapper._top = wrapper.scrollTop();
							setTimeout(function(){
								go();
							}, 50);
							return;
						}
						
						delete bufferExt.timer;
	
						if (!buffer.length) {
							bottomMarker.hide();
							return wrapper.off(scrollEvent);
						}
	
						//progress.show();
						while ((!last.length || (chk = last.position().top - (wrapper.height() + wrapper.scrollTop() + fm.options.showThreshold)) <= 0)
							&& (files = buffer.splice(0, fm.options.showFiles - (chk || 0) / (bufferExt.hpi || 1))).length) {
	
							locks = [];
							html = $.map(files, function(f) {
								if (f.hash && f.name) {
									if (f.mime == 'directory') {
										dirs = true;
									}
									if (f.tmb || (stmb && f.mime.indexOf('image/') === 0)) {
										f.tmb === 1 ? ltmb.push(f.hash) : (atmb[f.hash] = f.tmb);
									}
									clipCuts[f.hash] && locks.push(f.hash);
									return itemhtml(f);
								}
								return null;
							});
	
							(top || !buffer.length) && bottomMarker.hide();
							place.append(html.join(''));
							locks.length && fm.trigger('lockfiles', {files: locks});
							last = cwd.find('[id]:last');
							// scroll top on dir load to avoid scroll after page reload
							top && wrapper.scrollTop(0);
							(top || !bufferExt.hpi) && bottomMarkerShow(place, files.length);
							if (top) { break; }
						}
	
						// fixed table header
						list && fixTableHeader();
	
						// load/attach thumbnails
						attachThumbnails(atmb);
						ltmb.length && loadThumbnails(ltmb);
	
						// make directory droppable
						dirs && !mobile && makeDroppable();
						
						if (selectedFiles.length) {
							place.find('[id]:not(.'+clSelected+'):not(.elfinder-cwd-parent)').each(function() {
								var id = fm.cwdId2Hash(this.id);
								
								$.inArray(id, selectedFiles) !== -1 && $(this).trigger(evtSelect);
							});
						}
					};
				
				// stop while scrolling
				bufferExt.timer && clearTimeout(bufferExt.timer);
				// first time to go()
				!bufferExt.timer && go();
				// regist next go()
				bufferExt.timer = setTimeout(function(){
					go();
				}, 100);
			},
			
			// fixed table header jQuery object
			tableHeader = null,
			
			// To fixed table header colmun
			fixTableHeader = function() {
				if (! options.listView.fixedHeader) {
					return;
				}
				var setPos = function() {
					var val, pos;
					
					if (fm.direction === 'ltr') {
						val = wrapper.scrollLeft() * -1;
						pos = 'left';
					} else {
						val = wrapper.scrollLeft();
						pos = 'right';
					}
					if (base.css(pos) !== val) {
						base.css(pos, val);
					}
				},
				cnt, base, table, thead, tbody, hheight, htr, btr, htd, btd, init, delta;
				
				tbody = cwd.find('tbody');
				btr = tbody.children('tr:first');
				if (btr.length) {
					table = tbody.parent();
					if (! tableHeader) {
						init = true;
						tbody.addClass('elfinder-cwd-fixheader');
						thead = cwd.find('thead').attr('id', fm.namespace+'-cwd-thead');
						htr = thead.children('tr:first');
						hheight = htr.outerHeight(true);
						cwd.css('margin-top', hheight - parseInt(table.css('padding-top')));
						base = $('<div/>').addClass(cwd.attr('class')).append($('<table/>').append(thead));
						tableHeader = $('<div/>').addClass(wrapper.attr('class') + ' elfinder-cwd-fixheader')
							.removeClass('ui-droppable native-droppable')
							.css(wrapper.position())
							.css('height', hheight)
							.append(base);
						if (fm.direction === 'rtl') {
							tableHeader.css('right', (fm.getUI().width() - wrapper.width()) + 'px');
						}
						setPos();
						wrapper.after(tableHeader)
							.on('scroll.fixheader resize.fixheader', function(e) {
								setPos();
								if (e.type === 'resize') {
									e.stopPropagation();
									fixTableHeader();
								}
							});
					} else {
						thead = $('#'+fm.namespace+'-cwd-thead');
						htr = thead.children('tr:first');
					}
					
					if (init || Math.abs(btr.outerWidth() - htr.outerWidth()) > 2) {
						cnt = options.listView.columns.length + 1;
						for (var i = 0; i < cnt; i++) {
							htd = htr.children('td:eq('+i+')');
							btd = btr.children('td:eq('+i+')');
							delta = (htd.outerWidth() - htd.width()) - (btd.outerWidth() - btd.width());
							htd.css('width', (btd.width() - delta) + 'px');
						}
					}
					
					tableHeader.data('widthTimer') && clearTimeout(tableHeader.data('widthTimer'));
					tableHeader.data('widthTimer', setTimeout(function() {
						if (fm.direction === 'rtl') {
							tableHeader.css('right', (fm.getUI().width() - wrapper.width()) + 'px');
						}
						tableHeader.css(wrapper.position()).css('width', cwd.outerWidth() + 'px');
					}, 10));
				}
			},
			
			/**
			 * Droppable options for cwd.
			 * Drop target is `wrapper`
			 * Do not add class on childs file over
			 *
			 * @type Object
			 */
			droppable = $.extend({}, fm.droppable, {
				over : function(e, ui) {
					var dst    = $(this),
						helper = ui.helper,
						ctr    = (e.shiftKey || e.ctrlKey || e.metaKey),
						hash, status, inParent;
					e.stopPropagation();
					helper.data('dropover', helper.data('dropover') + 1);
					dst.data('dropover', true);
					if (helper.data('namespace') !== fm.namespace || ! fm.insideWorkzone(e.pageX, e.pageY)) {
						dst.removeClass(clDropActive);
						helper.removeClass('elfinder-drag-helper-move elfinder-drag-helper-plus');
						return;
					}
					if (dst.hasClass(fm.res(c, 'cwdfile'))) {
						hash = fm.cwdId2Hash(dst.attr('id'));
						dst.data('dropover', hash);
					} else {
						hash = fm.cwd().hash;
						fm.cwd().write && dst.data('dropover', hash);
					}
					inParent = (fm.file(helper.data('files')[0]).phash === hash);
					if (dst.data('dropover') === hash) {
						$.each(helper.data('files'), function(i, h) {
							if (h === hash || (inParent && !ctr && !helper.hasClass('elfinder-drag-helper-plus'))) {
								dst.removeClass(clDropActive);
								return false; // break $.each
							}
						});
					} else {
						dst.removeClass(clDropActive);
					}
					if (helper.data('locked') || inParent) {
						status = 'elfinder-drag-helper-plus';
					} else {
						status = 'elfinder-drag-helper-move';
						if (ctr) {
							status += ' elfinder-drag-helper-plus';
						}
					}
					dst.hasClass(clDropActive) && helper.addClass(status);
					setTimeout(function(){ dst.hasClass(clDropActive) && helper.addClass(status); }, 20);
				},
				out : function(e, ui) {
					var helper = ui.helper;
					e.stopPropagation();
					helper.removeClass('elfinder-drag-helper-move elfinder-drag-helper-plus').data('dropover', Math.max(helper.data('dropover') - 1, 0));
					$(this).removeData('dropover')
					       .removeClass(clDropActive);
				},
				deactivate : function() {
					$(this).removeData('dropover')
					       .removeClass(clDropActive);
				},
				drop : function(e, ui) {
					unselectAll();
					fm.droppable.drop.call(this, e, ui);
				}
			}),
			
			/**
			 * Make directory droppable
			 *
			 * @return void
			 */
			makeDroppable = function() {
				var targets = cwd.find('.directory:not(.'+clDroppable+',.elfinder-na,.elfinder-ro)');
				if (fm.isCommandEnabled('paste')) {
					targets.droppable(droppable);
				}
				if (fm.isCommandEnabled('upload')) {
					targets.addClass('native-droppable');
				}
			},
			
			/**
			 * Preload required thumbnails and on load add css to files.
			 * Return false if required file is not visible yet (in buffer) -
			 * required for old api to stop loading thumbnails.
			 *
			 * @param  Object  file hash -> thumbnail map
			 * @return Boolean
			 */
			attachThumbnails = function(images) {
				var url = fm.option('tmbUrl'),
					ret = true, 
					ndx;
				
				$.each(images, function(hash, tmb) {
					var node = $('#'+fm.cwdHash2Id(hash));

					if (node.length) {
						(function(node, tmb) {
							$('<img/>')
								.load(function() { node.find('.elfinder-cwd-icon').addClass(tmb.className).css('background-image', "url('"+tmb.url+"')"); })
								.attr('src', tmb.url);
						})(node, fm.tmb(fm.file(hash)));
					} else {
						ret = false;
						if ((ndx = index(hash)) != -1) {
							buffer[ndx].tmb = tmb;
						}
					}
				});
				return ret;
			},
			
			/**
			 * Load thumbnails from backend.
			 *
			 * @param  Array|Boolean  files hashes list for new api | true for old api
			 * @return void
			 */
			loadThumbnails = function(files) {
				var tmbs = [];
				
				if (fm.oldAPI) {
					fm.request({
						data : {cmd : 'tmb', current : fm.cwd().hash},
						preventFail : true
						})
						.done(function(data) {
							if (attachThumbnails(data.images||[]) && data.tmb) {
								loadThumbnails();
							}
						});
					return;
				} 

				tmbs = tmbs = files.splice(0, tmbNum);
				if (tmbs.length) {
					fm.request({
						data : {cmd : 'tmb', targets : tmbs},
						preventFail : true
					})
					.done(function(data) {
						if (attachThumbnails(data.images||[])) {
							loadThumbnails(files);
						}
					});
				}
			},
			
			/**
			 * Add new files to cwd/buffer
			 *
			 * @param  Array  new files
			 * @return void
			 */
			add = function(files) {
				var place    = list ? cwd.find('tbody') : cwd,
					l        = files.length, 
					ltmb     = [],
					atmb     = {},
					dirs     = false,
					findNode = function(file) {
						var pointer = cwd.find('[id]:first'), file2;

						while (pointer.length) {
							file2 = fm.file(fm.cwdId2Hash(pointer.attr('id')));
							if (!pointer.hasClass('elfinder-cwd-parent') && file2 && fm.compare(file, file2) < 0) {
								return pointer;
							}
							pointer = pointer.next('[id]');
						}
					},
					findIndex = function(file) {
						var l = buffer.length, i;
						
						for (i =0; i < l; i++) {
							if (fm.compare(file, buffer[i]) < 0) {
								return i;
							}
						}
						return l || -1;
					},
					file, hash, node, ndx;

				l && wz.removeClass('elfinder-cwd-wrapper-empty');
				
				while (l--) {
					file = files[l];
					hash = file.hash;
					
					if ($('#'+fm.cwdHash2Id(hash)).length) {
						continue;
					}
					
					if ((node = findNode(file)) && node.length) {
						node.before(itemhtml(file)); 
					} else if ((ndx = findIndex(file)) >= 0) {
						buffer.splice(ndx, 0, file);
					} else {
						place.append(itemhtml(file));
					}
					
					if ($('#'+fm.cwdHash2Id(hash)).length) {
						if (file.mime == 'directory') {
							dirs = true;
						} else if (file.tmb) {
							file.tmb === 1 ? ltmb.push(hash) : (atmb[hash] = file.tmb);
						}
					}
				}
				
				bottomMarkerShow(place);
				attachThumbnails(atmb);
				ltmb.length && loadThumbnails(ltmb);
				dirs && !mobile && makeDroppable();
			},
			
			/**
			 * Remove files from cwd/buffer
			 *
			 * @param  Array  files hashes
			 * @return void
			 */
			remove = function(files) {
				var l = files.length, hash, n, ndx;

				// removed cwd
				if (!fm.cwd().hash && fm.currentReqCmd !== 'open') {
					$.each(cwdParents.reverse(), function(i, h) {
						if (fm.files()[h]) {
							fm.one(fm.currentReqCmd, function(e, fm) {
								!fm.cwd().hash && fm.exec('open', h);
							});
							return false;
						}
					});
					return;
				}
				
				while (l--) {
					hash = files[l];
					if ((n = $('#'+fm.cwdHash2Id(hash))).length) {
						try {
							n.remove();
						} catch(e) {
							fm.debug('error', e);
						}
					} else if ((ndx = index(hash)) != -1) {
						buffer.splice(ndx, 1);
					}
				}
			},
			
			msg = {
				name : fm.i18n('name'),
				perm : fm.i18n('perms'),
				date : fm.i18n('modify'),
				size : fm.i18n('size'),
				kind : fm.i18n('kind'),
				modestr : fm.i18n('mode'),
				modeoct : fm.i18n('mode'),
				modeboth : fm.i18n('mode'),
			},
			
			customColsNameBuild = function() {
				var name = '',
				customColsName = '',
				columns = options.listView.columns,
				names = $.extend({}, msg, options.listView.columnsCustomName);
				for (var i = 0; i < columns.length; i++) {
					if (typeof names[columns[i]] !== 'undefined') {
						name = names[columns[i]];
					} else {
						name = fm.i18n(columns[i]);
					}
					customColsName +='<td class="elfinder-cwd-view-th-'+columns[i]+'">'+name+'</td>';
				}
				return customColsName;
			},
			
			bottomMarkerShow = function(place, cnt) {
				var ph;
				place = place || (list ? cwd.find('tbody') : cwd);

				if (buffer.length > 0) {
					place.css({height: 'auto'});
					ph = place.height();
					cnt && (bufferExt.hpi = ph / cnt);
					bottomMarker.css({top: (bufferExt.hpi * buffer.length + ph) + 'px'}).show();
				}
			},
			
			wrapperContextMenu = {
				contextmenu : function(e) {
					e.preventDefault();
					fm.trigger('contextmenu', {
						'type'    : 'cwd',
						'targets' : [fm.cwd().hash],
						'x'       : e.pageX,
						'y'       : e.pageY
					});
				},
				touchstart : function(e) {
					if (e.originalEvent.touches.length > 1) {
						return;
					}
					cwd.data('longtap', null);
					wrapper.data('touching', {x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY});
					if (e.target === this || e.target === cwd.get(0)) {
						cwd.data('tmlongtap', setTimeout(function(){
							//if (wrapper.data('touching')) {
								// long tap
								cwd.data('longtap', true);
								fm.trigger('contextmenu', {
									'type'    : 'cwd',
									'targets' : [fm.cwd().hash],
									'x'       : wrapper.data('touching').x,
									'y'       : wrapper.data('touching').y
								});
							//}
						}, 500));
					}
				},
				touchend : function(e) {
					if (e.type === 'touchmove') {
						if (! wrapper.data('touching') ||
								( Math.abs(wrapper.data('touching').x - e.originalEvent.touches[0].pageX)
								+ Math.abs(wrapper.data('touching').y - e.originalEvent.touches[0].pageY)) > 4) {
							wrapper.data('touching', null);
						}
					}
					clearTimeout(cwd.data('tmlongtap'));
				},
				click : function(e) {
					if (cwd.data('longtap')) {
						e.preventDefault();
						e.stopPropagation();
					}
				}
			},
			
			/**
			 * Update directory content
			 *
			 * @param  Array  files
			 * @return void
			 */
			content = function(files, any) {
				var phash = fm.cwd().hash,
					emptyMethod;

				cwdParents = fm.parents(phash);

				unselectAll();
				
				wz.append(selectAllCheckbox);
				
				try {
					// to avoid problem with draggable
					cwd.empty();
				} catch (e) {
					cwd.html('');
				}
				
				if (tableHeader) {
					wrapper.off('scroll.fixheader resize.fixheader');
					tableHeader.remove();
					tableHeader = null;
				}

				cwd.removeClass('elfinder-cwd-view-icons elfinder-cwd-view-list')
					.addClass('elfinder-cwd-view-'+(list ? 'list' :'icons'))
					.attr('style', '')
					.css('height', 'auto');
				bottomMarker.hide();

				wrapper[list ? 'addClass' : 'removeClass']('elfinder-cwd-wrapper-list')
					._padding = parseInt(wrapper.css('padding-top')) + parseInt(wrapper.css('padding-bottom'));
				if (fm.UA.iOS) {
					wrapper.removeClass('overflow-scrolling-touch').addClass('overflow-scrolling-touch');
				}

				if (list) {
					cwd.html('<table><thead/><tbody/></table>');
					cwd.find('thead').append(
						$('<tr class="ui-state-default'+'"><td class="elfinder-cwd-view-th-name">'+msg.name+'</td>'+customColsNameBuild()+'</tr>')
						.on('contextmenu.'+fm.namespace, wrapperContextMenu.contextmenu)
						.on('touchstart.'+fm.namespace, 'td', wrapperContextMenu.touchstart)
						.on('touchmove.'+fm.namespace+' touchend.'+fm.namespace, 'td', wrapperContextMenu.touchend)
						.on('click.'+fm.namespace,'td', wrapperContextMenu.click)
					).find('td:first').append(selectAllCheckbox);
				}
		
				buffer = $.map(files, function(f) { return any || f.phash == phash ? f : null; });
				
				buffer = fm.sortFiles(buffer);
				bufferExt = {};
		
				wz[(buffer.length < 1) ? 'addClass' : 'removeClass']('elfinder-cwd-wrapper-empty');
				wrapper.on(scrollEvent, render).trigger(scrollEvent);
		
				phash = fm.cwd().phash;
				
				if (options.oldSchool && phash && !query) {
					var parent = $.extend(true, {}, fm.file(phash), {name : '..', mime : 'directory'});
					parent = $(itemhtml(parent))
						.addClass('elfinder-cwd-parent')
						.bind('mousedown click mouseup touchstart touchmove touchend dblclick mouseenter', function(e) {
							e.preventDefault();
							e.stopPropagation();
						})
						.dblclick(function() {
							fm.exec('open', fm.cwdId2Hash(this.id));
						});

					(list ? cwd.find('tbody') : cwd).prepend(parent);
				}
				
				// set droppable
				if (any || !fm.cwd().write) {
					wrapper.removeClass('native-droppable')
					       .droppable('disable');
				} else {
					wrapper[fm.isCommandEnabled('upload')? 'addClass' : 'removeClass']('native-droppable');
					wrapper.droppable('enable');
				}
			},
			
			/**
			 * CWD node itself
			 *
			 * @type JQuery
			 **/
			cwd = $(this)
				.addClass('ui-helper-clearfix elfinder-cwd')
				.attr('unselectable', 'on')
				// fix ui.selectable bugs and add shift+click support 
				.on('click.'+fm.namespace, fileSelector, function(e) {
					var p    = this.id ? $(this) : $(this).parents('[id]:first'),
						tgt  = $(e.target),
						prev,
						next,
						pl,
						nl,
						sib;

					if (selectCheckbox && (tgt.is('input:checkbox') || tgt.hasClass('elfinder-cwd-select'))) {
						e.stopPropagation();
						e.preventDefault();
						if (! wrapper.data('touching')) {
							p.trigger(p.hasClass(clSelected) ? evtUnselect : evtSelect);
							trigger();
						}
						setTimeout(function() {
							tgt.prop('checked', p.hasClass(clSelected));
						}, 10);
						
						return false;
					}
					
					if (cwd.data('longtap')) {
						e.stopPropagation();
						return;
					}

					e.stopImmediatePropagation();

					if (e.shiftKey) {
						prev = p.prevAll('.'+clSelected+':first');
						next = p.nextAll('.'+clSelected+':first');
						pl   = prev.length;
						nl   = next.length;
					}
					if (e.shiftKey && (pl || nl)) {
						sib = pl ? p.prevUntil('#'+prev.attr('id')) : p.nextUntil('#'+next.attr('id'));
						sib.add(p).trigger(evtSelect);
					} else if (e.ctrlKey || e.metaKey) {
						p.trigger(p.hasClass(clSelected) ? evtUnselect : evtSelect);
					} else {
						if (wrapper.data('touching') && p.hasClass(clSelected)) {
							wrapper.data('touching', null);
							fm.dblclick({file : fm.cwdId2Hash(this.id)});
							return;
						} else {
							unselectAll();
							p.trigger(evtSelect);
						}
					}

					trigger();
				})
				// call fm.open()
				.on('dblclick.'+fm.namespace, fileSelector, function(e) {
					fm.dblclick({file : fm.cwdId2Hash(this.id)});
				})
				// for touch device
				.on('touchstart.'+fm.namespace, fileSelector, function(e) {
					if (e.originalEvent.touches.length > 1) {
						return;
					}
					var p   = this.id ? $(this) : $(this).parents('[id]:first'),
						tgt = $(e.target),
						sel;
					
					wrapper.data('touching', {x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY});
					if (selectCheckbox && (tgt.is('input:checkbox') || tgt.hasClass('elfinder-cwd-select'))) {
						setTimeout(function() {
							if (wrapper.data('touching')) {
								p.trigger(p.hasClass(clSelected) ? evtUnselect : evtSelect);
								trigger();
							}
						}, 150);
						return;
					}

					if (e.target.nodeName == 'INPUT' || e.target.nodeName == 'TEXTAREA') {
						return;
					}
					
					sel = p.prevAll('.'+clSelected+':first').length +
					      p.nextAll('.'+clSelected+':first').length;
					cwd.data('longtap', null);
					p.addClass(clHover)
					 .data('tmlongtap', setTimeout(function(){
						// long tap
						cwd.data('longtap', true);
						if (e.target.nodeName != 'TD' || fm.selected().length > 0) {
							p.trigger(evtSelect);
							trigger();
							fm.trigger('contextmenu', {
								'type'    : 'files',
								'targets' : fm.selected(),
								'x'       : e.originalEvent.touches[0].pageX,
								'y'       : e.originalEvent.touches[0].pageY
							});
						}
					}, 500));
				})
				.on('touchmove.'+fm.namespace+' touchend.'+fm.namespace, fileSelector, function(e) {
					if (e.target.nodeName == 'INPUT' || e.target.nodeName == 'TEXTAREA' || $(e.target).hasClass('elfinder-cwd-select')) {
						return;
					}
					var p = this.id ? $(this) : $(this).parents('[id]:first');
					clearTimeout(p.data('tmlongtap'));
					if (e.type === 'touchmove') {
						wrapper.data('touching', null);
						p.removeClass(clHover);
					} else if (wrapper.data('touching') && !cwd.data('longtap') && p.hasClass(clSelected)) {
						e.preventDefault();
						wrapper.data('touching', null);
						fm.dblclick({file : fm.cwdId2Hash(this.id)});
					}
				})
				// attach draggable
				.on('mouseenter.'+fm.namespace, fileSelector, function(e) {
					var $this = $(this), helper = null,
						target = list ? $this : $this.children('div.elfinder-cwd-file-wrapper,div.elfinder-cwd-filename');

					if (!mobile && !$this.hasClass(clTmp) && !target.hasClass(clDraggable) && !target.hasClass(clDisabled)) {
						target.on('mousedown', function(e) {
							// shiftKey + drag start for HTML5 native drag function
							if (e.shiftKey && !fm.UA.IE && cwd.data('selectable')) {
								// destroy jQuery-ui selectable while trigger native drag
								cwd.selectable('destroy').data('selectable', false);
								setTimeout(function(){
									cwd.selectable(selectableOption).data('selectable', true);
								}, 10);
							}
							target.draggable('option', 'disabled', e.shiftKey);
							if (e.shiftKey) {
								target.attr('draggable', 'true');
							} else {
								target.attr('draggable', 'false')
								      .draggable('option', 'cursorAt', {left: 50 - parseInt($(e.currentTarget).css('margin-left')), top: 47});
							}
						})
						.on('dragstart', function(e) {
							var dt = e.dataTransfer || e.originalEvent.dataTransfer || null;
							helper = null;
							if (dt && !fm.UA.IE) {
								var p = this.id ? $(this) : $(this).parents('[id]:first'),
									elm   = $('<span>'),
									url   = '',
									durl  = null,
									murl  = null,
									files = [],
									icon  = function(f) {
										var mime = f.mime, i, tmb = fm.tmb(f);
										i = '<div class="elfinder-cwd-icon '+fm.mime2class(mime)+' ui-corner-all"/>';
										if (tmb) {
											i = $(i).addClass(tmb.className).css('background-image', "url('"+tmb.url+"')").get(0).outerHTML;
										}
										return i;
									}, l, geturl = [];
								p.trigger(evtSelect);
								trigger();
								$.each(selectedFiles, function(i, v){
									var file = fm.file(v),
										furl = file.url;
									if (file && file.mime !== 'directory') {
										if (!furl) {
											furl = fm.url(file.hash);
										} else if (furl == '1') {
											geturl.push(v);
											return true;
										}
										if (furl) {
											furl = fm.convAbsUrl(furl);
											files.push(v);
											$('<a>').attr('href', furl).text(furl).appendTo(elm);
											url += furl + "\n";
											if (!durl) {
												durl = file.mime + ':' + file.name + ':' + furl;
											}
											if (!murl) {
												murl = furl + "\n" + file.name;
											}
										}
									}
								});
								if (geturl.length) {
									$.each(geturl, function(i, v){
										var rfile = fm.file(v);
										rfile.url = '';
										fm.request({
											data : {cmd : 'url', target : v},
											notify : {type : 'url', cnt : 1},
											preventDefault : true
										})
										.always(function(data) {
											rfile.url = data.url? data.url : '1';
										});
									});
									return false;
								} else if (url) {
									if (dt.setDragImage) {
										helper = $('<div class="elfinder-drag-helper html5-native"></div>').append(icon(fm.file(files[0]))).appendTo($(document.body));
										if ((l = files.length) > 1) {
											helper.append(icon(fm.file(files[l-1])) + '<span class="elfinder-drag-num">'+l+'</span>');
										}
										dt.setDragImage(helper.get(0), 50, 47);
									}
									dt.effectAllowed = 'copyLink';
									dt.setData('DownloadURL', durl);
									dt.setData('text/x-moz-url', murl);
									dt.setData('text/uri-list', url);
									dt.setData('text/plain', url);
									dt.setData('text/html', elm.html());
									dt.setData('elfinderfrom', window.location.href + fm.cwd().hash);
									dt.setData('elfinderfrom:' + dt.getData('elfinderfrom'), '');
								} else {
									return false;
								}
							}
						})
						.on('dragend', function(e){
							unselectAll();
							helper && helper.remove();
						})
						.draggable(fm.draggable);
					}
				})
				// add hover class to selected file
				.on(evtSelect, fileSelector, function(e) {
					var $this = $(this), 
						id    = fm.cwdId2Hash($this.attr('id')),
						phash;
					
					if (!selectLock && !$this.hasClass(clDisabled)) {
						$this.addClass(clSelected).children().addClass(clHover).find('input:checkbox').prop('checked', true);;
						if ($.inArray(id, selectedFiles) === -1) {
							selectedFiles.push(id);
						}
						if (selectCheckbox && selectCheckbox && ! selectAllCheckbox.find('input').prop('checked')) {
							phash = fm.cwd().hash;
							if (selectedFiles.length === (lastSearch.length? lastSearch : $.map(fm.files(), function(f) { return f.phash == phash ? f.hash : null ;})).length) {
								selectCheckbox && selectAllCheckbox.find('input').prop('checked', true);
								cwd.addClass('elfinder-cwd-allselected');
							}
						}
					}
				})
				// remove hover class from unselected file
				.on(evtUnselect, fileSelector, function(e) {
					var $this = $(this), 
						id    = fm.cwdId2Hash($this.attr('id')),
						ndx;
					
					if (!selectLock) {
						$this.removeClass(clSelected).children().removeClass(clHover).find('input:checkbox').prop('checked', false);
						ndx = $.inArray(id, selectedFiles);
						if (ndx !== -1) {
							selectedFiles.splice(ndx, 1);
							if (cwd.hasClass('elfinder-cwd-allselected')) {
								selectCheckbox && selectAllCheckbox.children('input').prop('checked', false);
								cwd.removeClass('elfinder-cwd-allselected');
							}
						}
					}
					
				})
				// disable files wich removing or moving
				.on(evtDisable, fileSelector, function() {
					var $this  = $(this).removeClass(clHover+' '+clSelected).addClass(clDisabled), 
						child  = $this.children(),
						target = (list ? $this : child.find('div.elfinder-cwd-file-wrapper,div.elfinder-cwd-filename'));
					
					child.removeClass(clHover+' '+clSelected);
					
					$this.hasClass(clDroppable) && $this.droppable('disable');
					target.hasClass(clDraggable) && target.draggable('disable');
				})
				// if any files was not removed/moved - unlock its
				.on(evtEnable, fileSelector, function() {
					var $this  = $(this).removeClass(clDisabled), 
						target = list ? $this : $this.children('div.elfinder-cwd-file-wrapper,div.elfinder-cwd-filename');
					
					$this.hasClass(clDroppable) && $this.droppable('enable');	
					target.hasClass(clDraggable) && target.draggable('enable');
				})
				.on('scrolltoview', fileSelector, function() {
					scrollToView($(this));
				})
				.on('mouseenter.'+fm.namespace+' mouseleave.'+fm.namespace, fileSelector, function(e) {
					fm.trigger('hover', {hash : fm.cwdId2Hash($(this).attr('id')), type : e.type});
					$(this).toggleClass(clHover, (e.type == 'mouseenter'));
				})
				.on('contextmenu.'+fm.namespace, function(e) {
					var file = $(e.target).closest('.'+clFile);
					
					if (file.length && (e.target.nodeName != 'TD' || $.inArray(fm.cwdId2Hash(file.get(0).id), fm.selected()) > -1)) {
						e.stopPropagation();
						e.preventDefault();
						if (!file.hasClass(clDisabled) && !wrapper.data('touching')) {
							if (!file.hasClass(clSelected)) {
								unselectAll();
								file.trigger(evtSelect);
								trigger();
							}
							fm.trigger('contextmenu', {
								'type'    : 'files',
								'targets' : fm.selected(),
								'x'       : e.pageX,
								'y'       : e.pageY
							});

						}
						
					}
				})
				// unselect all on cwd click
				.on('click.'+fm.namespace, function(e) {
					if (cwd.data('longtap')) {
						e.stopPropagation();
						return;
					}
					!e.shiftKey && !e.ctrlKey && !e.metaKey && unselectAll();
				})
				// prepend fake file/dir
				.on('create.'+fm.namespace, function(e, file) {
					var parent = list ? cwd.find('tbody') : cwd,
						p = parent.find('.elfinder-cwd-parent'),
						lock = file.move || false,
						file = $(itemhtml(file)).addClass(clTmp),
						selected = fm.selected();
						
					if (selected.length) {
						lock && fm.trigger('lockfiles', {files: selected});
					} else {
						unselectAll();
					}

					if (p.length) {
						p.after(file);
					} else {
						parent.prepend(file);
					}
					
					wrapper.scrollTop(0).scrollLeft(0);
				})
				// unselect all selected files
				.on('unselectall', unselectAll)
				.on('selectfile', function(e, id) {
					$('#'+fm.cwdHash2Id(id)).trigger(evtSelect);
					trigger();
				}),
			wrapper = $('<div class="elfinder-cwd-wrapper"/>')
				// make cwd itself droppable for folders from nav panel
				.droppable($.extend({}, droppable, {autoDisable: false}))
				.on('contextmenu.'+fm.namespace, wrapperContextMenu.contextmenu)
				.on('touchstart.'+fm.namespace, wrapperContextMenu.touchstart)
				.on('touchmove.'+fm.namespace+' touchend.'+fm.namespace, wrapperContextMenu.touchend)
				.on('click.'+fm.namespace, wrapperContextMenu.click)
				.on('mousedown', function(){wrapper._mousedown = true;})
				.on('mouseup', function(){wrapper._mousedown = false;}),
			
			bottomMarker = $('<div>&nbsp;</div>')
				.css({position: 'absolute', width: '1px', height: '1px'})
				.hide(),
			
			selectAllCheckbox = selectCheckbox? $('<div class="elfinder-cwd-selectall"><input type="checkbox"/></div>')
				.attr('title', fm.i18n('selectall'))
				.on('touchstart mousedown click', function(e) {
					e.stopPropagation();
					e.preventDefault();
					if ($(this).data('pending') || e.type === 'click') {
						return false;
					}
					selectAllCheckbox.data('pending', true);
					if (cwd.hasClass('elfinder-cwd-allselected')) {
						selectAllCheckbox.find('input').prop('checked', false);
						setTimeout(function() {
							unselectAll();
						}, 10);
					} else {
						selectAllCheckbox.find('input').prop('checked', true);
						setTimeout(function() {
							selectAll();
						}, 10);
					}
				}) : $(),
			
			restm = null,
			resize = function(init) {
				var initHeight = function() {
					var h = 0;
					wrapper.siblings('div.elfinder-panel:visible').each(function() {
						h += $(this).outerHeight(true);
					});
					wrapper.height(wz.height() - h - wrapper._padding);
				};
				
				init && initHeight();
				
				restm && clearTimeout(restm);
				restm = setTimeout(function(){
					!init && initHeight();
					var wph, cwdoh;
					// fix cwd height if it less then wrapper
					cwd.css('height', 'auto');
					wph = wrapper[0].clientHeight - parseInt(wrapper.css('padding-top')) - parseInt(wrapper.css('padding-bottom')) - parseInt(cwd.css('margin-top')),
					cwdoh = cwd.outerHeight(true);
					if (cwdoh < wph) {
						cwd.height(wph);
					}
				}, 20);
				
				list && fixTableHeader();
			},
			
			// elfinder node
			parent = $(this).parent().resize(resize),
			
			// workzone node 
			wz = parent.children('.elfinder-workzone').append(wrapper.append(this).append(bottomMarker))
			;

		if (mobile) {
			// for iOS5 bug
			$('body').on('touchstart touchmove touchend', function(e){});
		} else {
			// make files selectable
			cwd
				.selectable(selectableOption)
				.data('selectable', true);
		}
		
		selectCheckbox && cwd.addClass('elfinder-has-checkbox');
		
		fm
			.one('init', function(){
				var style = document.createElement('style'),
				sheet;
				document.head.appendChild(style);
				sheet = style.sheet;
				sheet.insertRule('.elfinder-cwd-wrapper-empty .elfinder-cwd:after{ content:"'+fm.i18n('emptyFolder')+'" }', 0);
				sheet.insertRule('.elfinder-cwd-wrapper-empty .ui-droppable .elfinder-cwd:after{ content:"'+fm.i18n('emptyFolder'+(mobile? 'LTap' : 'Drop'))+'" }', 1);
				sheet.insertRule('.elfinder-cwd-wrapper-empty .ui-droppable-disabled .elfinder-cwd:after{ content:"'+fm.i18n('emptyFolder')+'" }', 2);
				sheet.insertRule('.elfinder-cwd-wrapper-empty.elfinder-search-result .elfinder-cwd:after{ content:"'+fm.i18n('emptySearch')+'" }', 3);
			})
			.bind('open', function(e) {
				content(e.data.files);
				resize();
			})
			.bind('search', function(e) {
				lastSearch = e.data.files;
				content(lastSearch, true);
				wz.addClass('elfinder-search-result');
				fm.autoSync('stop');
				resize();
			})
			.bind('searchend', function(e) {
				lastSearch = [];
				wz.removeClass('elfinder-search-result elfinder-cwd-wrapper-empty');
				if (query) {
					query = '';
					if (!e.data || !e.data.noupdate) {
						content(fm.files());
					}
				}
				fm.autoSync();
				resize();
			})
			.bind('searchstart', function(e) {
				query = e.data.query;
			})
			.bind('sortchange', function() {
				var lastScrollLeft = wrapper.scrollLeft();
				content(query ? lastSearch : fm.files(), !!query);
				wrapper.scrollLeft(lastScrollLeft);
				resize();
			})
			.bind('viewchange', function() {
				var sel = fm.selected(),
					l   = fm.storage('view') == 'list',
					allsel = cwd.hasClass('elfinder-cwd-allselected');
				
				if (l != list) {
					list = l;
					content(query ? lastSearch : fm.files(), !!query);

					if (allsel) {
						cwd.addClass('elfinder-cwd-allselected');
						selectAllCheckbox.find('input').prop('checked', true);
					}
					$.each(sel, function(i, h) {
						selectFile(h);
					});
					trigger();
				}
				resize();
			})
			.bind('resize', function() {
				var place = list ? cwd.find('tbody') : cwd;
				resize(true);
				bottomMarkerShow(place, place.find('[id]').length);
				wz.data('rectangle', $.extend({}, {width: wz.width(), height: wz.height()}, wz.offset()));
			})
			.bind('add', function() {
				resize();
			})
			.bind('changeclipboard', function(e) {
				clipCuts = {};
				if (e.data && e.data.clipboard && e.data.clipboard.length) {
					$.each(e.data.clipboard, function(i, f) {
						if (f.cut) {
							clipCuts[f.hash] = true;
						}
					});
				}
			})
			.add(function(e) {
				var phash = fm.cwd().hash,
					files = query
						? $.map(e.data.added || [], function(f) { return f.name.indexOf(query) === -1 ? null : f ;})
						: $.map(e.data.added || [], function(f) { return f.phash == phash ? f : null; })
						;
				add(files);
			})
			.change(function(e) {
				var phash = fm.cwd().hash,
					sel   = fm.selected(),
					files;

				if (query) {
					$.each(e.data.changed || [], function(i, file) {
						remove([file.hash]);
						if (file.name.indexOf(query) !== -1) {
							add([file]);
							$.inArray(file.hash, sel) !== -1 && selectFile(file.hash);
						}
					});
				} else {
					$.each($.map(e.data.changed || [], function(f) { return f.phash == phash ? f : null; }), function(i, file) {
						remove([file.hash]);
						add([file]);
						$.inArray(file.hash, sel) !== -1 && selectFile(file.hash);
					});
				}
				
				trigger();
			})
			.remove(function(e) {
				remove(e.data.removed || []);
				trigger();
				if (buffer.length < 1 && (list ? cwd.find('tbody') : cwd).children().length < 1) {
					wz.addClass('elfinder-cwd-wrapper-empty');
					selectCheckbox && selectAllCheckbox.find('input').prop('checked', false);
				}
			})
			// select dragged file if no selected, disable selectable
			.dragstart(function(e) {
				var target = $(e.data.target),
					oe     = e.data.originalEvent;

				wz.data('rectangle', $.extend({}, {width: wz.width(), height: wz.height()}, wz.offset()));
				if (target.hasClass(fileSelector.substr(1))) {
					
					if (!target.hasClass(clSelected)) {
						!(oe.ctrlKey || oe.metaKey || oe.shiftKey) && unselectAll();
						target.trigger(evtSelect);
						trigger();
					}
				}
				
				cwd.selectable('disable').removeClass(clDisabled);
				selectLock = true;
			})
			// enable selectable
			.dragstop(function() {
				cwd.selectable('enable');
				selectLock = false;
			})
			.bind('lockfiles unlockfiles selectfiles unselectfiles', function(e) {
				var events = {
						lockfiles     : evtDisable ,
						unlockfiles   : evtEnable ,
						selectfiles   : evtSelect,
						unselectfiles : evtUnselect },
					event  = events[e.type],
					files  = e.data.files || [],
					l      = files.length,
					helper = e.data.helper || $(),
					parents, ctr;

				if (l > 0) {
					parents = fm.parents(files[0]);
				}
				if (!helper.data('locked')) {
					while (l--) {
						$('#'+fm.cwdHash2Id(files[l])).trigger(event);
					}
					trigger();
				}
				if (wrapper.data('dropover') && parents.indexOf(wrapper.data('dropover')) !== -1) {
					ctr = e.type !== 'lockfiles';
					helper.toggleClass('elfinder-drag-helper-plus', ctr);
					wrapper.toggleClass(clDropActive, ctr);
				}
			})
			// select new files after some actions
			.bind('mkdir mkfile duplicate upload rename archive extract paste multiupload', function(e) {
				if (e.type == 'upload' && e.data._multiupload) return;
				var phash = fm.cwd().hash, files;
				
				unselectAll();

				$.each((e.data.added || []).concat(e.data.changed || []), function(i, file) { 
					file && file.phash == phash && selectFile(file.hash);
				});
				trigger();
			})
			.shortcut({
				pattern     :'ctrl+a', 
				description : 'selectall',
				callback    : selectAll
			})
			.shortcut({
				pattern     : 'left right up down shift+left shift+right shift+up shift+down',
				description : 'selectfiles',
				type        : 'keydown' , //fm.UA.Firefox || fm.UA.Opera ? 'keypress' : 'keydown',
				callback    : function(e) { select(e.keyCode, e.shiftKey); }
			})
			.shortcut({
				pattern     : 'home',
				description : 'selectffile',
				callback    : function(e) { 
					unselectAll();
					scrollToView(cwd.find('[id]:first').trigger(evtSelect));
					trigger();
				}
			})
			.shortcut({
				pattern     : 'end',
				description : 'selectlfile',
				callback    : function(e) { 
					unselectAll();
					scrollToView(cwd.find('[id]:last').trigger(evtSelect)) ;
					trigger();
				}
			});
		
	});
	
	// fm.timeEnd('cwdLoad')
	
	return this;
};


/*
 * File: /js/ui/dialog.js
 */

/**
 * @class  elFinder dialog
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfinderdialog = function(opts) {
	var dialog;
	
	if (typeof(opts) == 'string' && (dialog = this.closest('.ui-dialog')).length) {
		if (opts == 'open') {
			dialog.css('display') == 'none' && dialog.fadeIn(120, function() {
				dialog.trigger('open');
			});
		} else if (opts == 'close') {
			dialog.stop(true);
			dialog.css('display') != 'none' && dialog.hide().trigger('close');
		} else if (opts == 'destroy') {
			dialog.hide().remove();
		} else if (opts == 'toTop') {
			dialog.trigger('totop');
		} else if (opts == 'posInit') {
			dialog.trigger('posinit');
		}
	}
	
	opts = $.extend({}, $.fn.elfinderdialog.defaults, opts);

	this.filter(':not(.ui-dialog-content)').each(function() {
		var self       = $(this).addClass('ui-dialog-content ui-widget-content'),
			parent     = self.parent(),
			clactive   = 'elfinder-dialog-active',
			cldialog   = 'elfinder-dialog',
			clnotify   = 'elfinder-dialog-notify',
			clhover    = 'ui-state-hover',
			id         = parseInt(Math.random()*1000000),
			overlay    = parent.children('.elfinder-overlay'),
			buttonset  = $('<div class="ui-dialog-buttonset"/>'),
			buttonpane = $('<div class=" ui-helper-clearfix ui-dialog-buttonpane ui-widget-content"/>')
				.append(buttonset),
			btnWidth   = 0,
			platformWin = (window.navigator.platform.indexOf('Win') != -1),
			
			dialog = $('<div class="ui-front ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable std42-dialog  '+cldialog+' '+opts.cssClass+'"/>')
				.hide()
				.append(self)
				.appendTo(parent)
				.draggable({
					handle : '.ui-dialog-titlebar',
					containment : 'document',
					stop : function(e, ui){
						dialog.css({height : opts.height});
					}
				})
				.css({
					width  : opts.width,
					height : opts.height
				})
				.mousedown(function(e) {
					setTimeout(function() {
						dialog.is(':visible') && dialog.trigger('totop');
					}, 10);
				})
				.on('open', function() {
					var d = $(this),
					maxWinWidth = (d.outerWidth() > parent.width()-10)? parent.width()-10 : null;
					
					maxWinWidth && d.css({width: maxWinWidth, left: '5px'});

					if (!dialog.hasClass(clnotify)) {
						
						parent.find('.'+cldialog+':visible').not('.'+clnotify).each(function() {
							var d     = $(this),
								top   = parseInt(d.css('top')),
								left  = parseInt(d.css('left')),
								_top  = parseInt(dialog.css('top')),
								_left = parseInt(dialog.css('left'))
								;

							if (d[0] != dialog[0] && (top == _top || left == _left)) {
								dialog.css({
									top  : (top+(maxWinWidth? 15 : 10))+'px',
									left : (maxWinWidth? 5 : left+10)+'px'
								});
							}
						});
					} 
					
					dialog.trigger('totop');
					
					dialog.data('modal') && overlay.elfinderoverlay('show');
					
					typeof(opts.open) == 'function' && $.proxy(opts.open, self[0])();
				})
				.on('close', function() {
					var dialogs;

					dialog.data('modal') && overlay.elfinderoverlay('hide');

					if (typeof(opts.close) == 'function') {
						$.proxy(opts.close, self[0])();
					} else if (opts.destroyOnClose) {
						dialog.hide().remove();
					}
					
					// get focus to next dialog
					dialogs = parent.find('.elfinder-dialog:visible');
					if (dialogs.length) {
						dialogs.find(':last').trigger('totop');
					} else {
						setTimeout(function() {
							// return focus to parent
							parent.mousedown().click();
						}, 20);
					}
				})
				.on('totop', function() {
					parent.find('.'+cldialog+':visible').removeClass(clactive+' ui-front');
					dialog.addClass(clactive+' ui-front');

					if (!dialog.find('input,textarea').length) {
						dialog.find('.ui-button:'+(platformWin? 'first':'last')).focus().end().find(':text:first').focus();
					}
				})
				.on('posinit', function() {
					var css = opts.position;
					if (!css) {
						css = {
							top  : Math.max(0, parseInt((parent.height() - dialog.outerHeight())/2 - 42))+'px',
							left : Math.max(0, parseInt((parent.width() - dialog.outerWidth())/2))+'px'
						};
					}
					dialog.css(css);
				})
				.data({modal: opts.modal})
			;
		
		dialog.trigger('posinit');

		if (opts.closeOnEscape) {
			$(document).on('keyup.'+id, function(e) {
				if (e.keyCode == $.ui.keyCode.ESCAPE && dialog.hasClass(clactive)) {
					self.elfinderdialog('close');
					$(document).off('keyup.'+id);
				}
			})
		}
		dialog.prepend(
			$('<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">'+opts.title+'</div>')
				.prepend($('<a href="#" class="ui-dialog-titlebar-close ui-corner-all"><span class="ui-icon ui-icon-closethick"/></a>')
					.mousedown(function(e) {
						e.preventDefault();
						self.elfinderdialog('close');
					}))

		);
		
		$.each(opts.buttons, function(name, cb) {
			var button = $('<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"><span class="ui-button-text">'+name+'</span></button>')
				.click($.proxy(cb, self[0]))
				.hover(function(e) { 
					if (opts.btnHoverFocus) {
						$(this)[e.type == 'mouseenter' ? 'focus' : 'blur']();
					} else {
						$(this).toggleClass(clhover, e.type == 'mouseenter');
					}
				})
				.focus(function() { $(this).addClass(clhover) })
				.blur(function() { $(this).removeClass(clhover) })
				.keydown(function(e) { 
					var next;
					e.stopPropagation();
					if (e.keyCode == $.ui.keyCode.ENTER) {
						e.preventDefault();
						$(this).click();
					}  else if (e.keyCode == $.ui.keyCode.TAB || e.keyCode == $.ui.keyCode.RIGHT) {
						e.preventDefault();
						next = $(this).next('.ui-button');
						next.length ? next.focus() : $(this).parent().children('.ui-button:first').focus();
					}  else if (e.keyCode == $.ui.keyCode.LEFT) {
						e.preventDefault();
						next = $(this).prev('.ui-button');
						next.length ? next.focus() : $(this).parent().children('.ui-button:last').focus()
					}
				})
			if (platformWin) {
				buttonset.append(button);
			} else {
				buttonset.prepend(button);
			}
		});
		
		if (buttonset.children().length) {
			dialog.append(buttonpane);
			
			dialog.show();
			buttonpane.find('button').each(function(i, btn) {
				btnWidth += $(btn).outerWidth(true);
			});
			dialog.hide();
			btnWidth += 20;
			
			if (dialog.width() < btnWidth) {
				dialog.width(btnWidth);
			}
		}
		
		if (opts.resizable && $.fn.resizable) {
			dialog.resizable({
					minWidth   : opts.minWidth,
					minHeight  : opts.minHeight,
					alsoResize : this
				});
		} 
			
		typeof(opts.create) == 'function' && $.proxy(opts.create, this)();
			
		opts.autoOpen && self.elfinderdialog('open');

	});
	
	return this;
};

$.fn.elfinderdialog.defaults = {
	cssClass  : '',
	title     : '',
	modal     : false,
	resizable : true,
	autoOpen  : true,
	closeOnEscape : true,
	destroyOnClose : false,
	buttons   : {},
	btnHoverFocus : true,
	position  : null,
	width     : 320,
	height    : 'auto',
	minWidth  : 200,
	minHeight : 110
};


/*
 * File: /js/ui/mkdirbutton.js
 */

/**
 * @class  elFinder toolbar button to switch mkdir mode.
 *
 * @author Naoki Sawada
 **/
$.fn.elfindermkdirbutton = function(cmd) {
	return this.each(function() {
		var button = $(this).elfinderbutton(cmd);

		cmd.change(function() {
			button.attr('title', cmd.value);
		});
	});
};


/*
 * File: /js/ui/navbar.js
 */

/**
 * @class elfindernav - elFinder container for diretories tree and places
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfindernavbar = function(fm, opts) {

	this.not('.elfinder-navbar').each(function() {
		var nav    = $(this).addClass('ui-state-default elfinder-navbar'),
			parent = nav.parent(),
			wz     = parent.children('.elfinder-workzone').append(nav),
			delta  = nav.outerHeight() - nav.height(),
			ltr    = fm.direction == 'ltr',
			handle, swipeHandle;

		fm.bind('resize', function() {
			nav.height(wz.height() - delta);
		});
		
		if (fm.UA.Touch) {
			fm.bind('load', function() {
				swipeHandle = $('<div class="elfinder-navbar-swipe-handle"/>').appendTo(wz);
				if (swipeHandle.css('pointer-events') !== 'none') {
					swipeHandle.remove();
					swipeHandle = null;
				}
			});
			
			nav.on('navshow navhide', function(e, data) {
				var mode     = (e.type === 'navshow')? 'show' : 'hide',
					duration = (data && data.duration)? data.duration : 'fast',
					handleW = (data && data.handleW)? data.handleW : Math.max(50, fm.getUI().width() / 10);
				nav.stop(true, true)[mode](duration, function() {
					if (mode === 'show') {
						swipeHandle && swipeHandle.stop(true, true).hide();
					} else {
						if (swipeHandle) {
							swipeHandle.width(handleW? handleW : '');
							fm.resources.blink(swipeHandle, 'slowonce');
						}
					}
					fm.trigger('navbar'+ mode);
					fm.getUI('cwd').trigger('resize');
				});
			});
			
			if (opts.autoHideUA && opts.autoHideUA.length > 0) {
				fm.one('open', function() {
					if ($.map(opts.autoHideUA, function(v){ return fm.UA[v]? true : null; }).length) {
						setTimeout(function() {
							nav.trigger('navhide', {duration: 'slow'});
						}, 500);
					}
				});
			}
		}
		
		if ($.fn.resizable && ! fm.UA.Mobile) {
			handle = nav.resizable({
					handles : ltr ? 'e' : 'w',
					minWidth : opts.minWidth || 150,
					maxWidth : opts.maxWidth || 500
				})
				.on('resize scroll', function(e) {
					clearTimeout($(this).data('posinit'));
					$(this).data('posinit', setTimeout(function() {
						var offset = (fm.UA.Opera && nav.scrollLeft())? 20 : 2;
						handle.css({
							top  : parseInt(nav.scrollTop())+'px',
							left : ltr ? 'auto' : parseInt(nav.scrollLeft() + offset),
							right: ltr ? parseInt(nav.scrollLeft() - offset) * -1 : 'auto'
						});
						if (e.type === 'resize') {
							fm.getUI('cwd').trigger('resize');
						}
					}, 50));
				})
				.find('.ui-resizable-handle').addClass('ui-front');

			fm.one('open', function() {
				setTimeout(function() {
					nav.trigger('resize');
				}, 150);
			});
		}

		if (fm.UA.Mobile) {
			nav.data('defWidth', nav.width());
			$(window).on('resize', function(e){
				var hw = nav.parent().width() / 2;
				if (nav.data('defWidth') > hw) {
					nav.width(hw);
				} else {
					nav.width(nav.data('defWidth'));
				}
				nav.data('width', nav.width());
			});
		}

	});
	
	return this;
};


/*
 * File: /js/ui/overlay.js
 */


$.fn.elfinderoverlay = function(opts) {
	
	this.filter(':not(.elfinder-overlay)').each(function() {
		opts = $.extend({}, opts);
		$(this).addClass('ui-front ui-widget-overlay elfinder-overlay')
			.hide()
			.mousedown(function(e) {
				e.preventDefault();
				e.stopPropagation();
			})
			.data({
				cnt  : 0,
				show : typeof(opts.show) == 'function' ? opts.show : function() { },
				hide : typeof(opts.hide) == 'function' ? opts.hide : function() { }
			});
	});
	
	if (opts == 'show') {
		var o    = this.eq(0),
			cnt  = o.data('cnt') + 1,
			show = o.data('show');

		o.data('cnt', cnt);

		if (o.is(':hidden')) {
			o.show();
			show();
		}
	} 
	
	if (opts == 'hide') {
		var o    = this.eq(0),
			cnt  = o.data('cnt') - 1,
			hide = o.data('hide');
		
		o.data('cnt', cnt);
			
		if (cnt <= 0) {
			o.hide();
			hide();
		}
	}
	
	return this;
};


/*
 * File: /js/ui/panel.js
 */

$.fn.elfinderpanel = function(fm) {
	
	return this.each(function() {
		var panel = $(this).addClass('elfinder-panel ui-state-default ui-corner-all'),
			margin = 'margin-'+(fm.direction == 'ltr' ? 'left' : 'right');
		
		fm.one('load', function(e) {
			var navbar = fm.getUI('navbar');
			
			panel.css(margin, parseInt(navbar.outerWidth(true)));
			navbar.on('resize', function() {
				panel.is(':visible') && panel.css(margin, parseInt(navbar.outerWidth(true)))
			})
		})
	})
};


/*
 * File: /js/ui/path.js
 */

/**
 * @class elFinder ui
 * Display current folder path in statusbar.
 * Click on folder name in path - open folder
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfinderpath = function(fm) {
	return this.each(function() {
		var query  = '',
			target = '',
			mimes  = [],
			place  = 'statusbar',
			clHover= fm.res('class', 'hover'),
			prefix = 'path' + (elFinder.prototype.uniqueid? elFinder.prototype.uniqueid : '') + '-',
			wzbase = $('<div class="ui-widget-header ui-helper-clearfix elfinder-workzone-path"/>'),
			path   = $(this).addClass('elfinder-path').html('&nbsp;')
				.on('mousedown', 'span.elfinder-path-dir', function(e) {
					var hash = $(this).attr('id').substr(prefix.length);
					e.preventDefault();
					if (hash != fm.cwd().hash) {
						$(this).addClass(clHover);
						if (query) {
							fm.exec('search', query, { target: hash, mime: mimes.join(' ') });
						} else {
							fm.exec('open', hash);
						}
					}
				})
				.prependTo(fm.getUI('statusbar').show()),
			roots = $('<div class="elfinder-path-roots"/>').on('click', function(e) {
				e.stopPropagation();
				e.preventDefault();
				
				var roots = $.map(fm.roots, function(h) { return fm.file(h)}),
				raw = [];

				$.each(roots, function(i, f) {
					if (fm.root(fm.cwd().hash) !== f.hash) {
						raw.push({
							label    : f.name,
							icon     : 'home',
							remain   : true,
							callback : function() { fm.exec('open', f.hash); }
						});
					}
				});
				fm.trigger('contextmenu', {
					raw: raw,
					x: e.pageX,
					y: e.pageY
				});
			}).append('<span class="elfinder-button-icon elfinder-button-icon-menu" />').appendTo(wzbase),
			render = function(cwd) {
				var dirs = [];
				$.each(fm.parents(cwd), function(i, hash) {
					var c = (cwd === hash)? 'elfinder-path-dir elfinder-path-cwd' : 'elfinder-path-dir',
						name = fm.escape(fm.file(hash).name);
					dirs.push('<span id="'+prefix+hash+'" class="'+c+'" title="'+name+'">'+name+'</span>');
				});
				return dirs.join('<span class="elfinder-path-other">'+fm.option('separator')+'</span>');
			},
			toWorkzone = function() {
				var prev;
				path.children('span.elfinder-path-dir').attr('style', '');
				prev = fm.direction === 'ltr'? $('#'+prefix + fm.cwd().hash).prevAll('span.elfinder-path-dir:first') : $();
				path.scrollLeft(prev.length? prev.position().left : 0);
			},
			fit = function() {
				var dirs = path.children('span.elfinder-path-dir'),
					cnt  = dirs.length,
					m, bg = 0, ids;
				
				if (place === 'workzone' || cnt < 2) {
					dirs.attr('style', '');
					return;
				}
				path.width(path.css('max-width'));
				dirs.css({maxWidth: (100/cnt)+'%', display: 'inline-block'});
				m = path.width() - 9;
				path.children('span.elfinder-path-other').each(function() {
					m -= $(this).width();
				});
				ids = [];
				dirs.each(function(i) {
					var dir = $(this),
						w   = dir.width();
					m -= w;
					if (w < this.scrollWidth) {
						ids.push(i);
					}
				});
				path.width('');
				if (ids.length) {
					if (m > 0) {
						m = m / ids.length;
						$.each(ids, function(i, k) {
							var d = $(dirs[k]);
							d.css('max-width', d.width() + m);
						});
					}
					dirs.last().attr('style', '');
				} else {
					dirs.attr('style', '');
				}
			};

			fm.bind('open searchend parents', function() {
				var dirs = [];

				query  = '';
				target = '';
				mimes  = [];
				
				path.html(render(fm.cwd().hash));
				if (Object.keys(fm.roots).length > 1) {
					path.css('margin', '');
					roots.show();
				} else {
					path.css('margin', 0);
					roots.hide();
				}
				fit();
			})
			.bind('searchstart', function(e) {
				if (e.data) {
					query  = e.data.query || '';
					target = e.data.target || '';
					mimes  = e.data.mimes || []
				}
			})
			.bind('search', function(e) {
				var dirs = [],
					html = '';
				if (target) {
					html = render(target);
				} else {
					html = fm.i18n('btnAll');
				}
				path.html('<span class="elfinder-path-other">'+fm.i18n('searcresult') + ': </span>' + html);
				fit();
			})
			// on swipe to navbar show/hide
			.bind('navbarshow navbarhide', function(e) {
				var wz = fm.getUI('workzone');
				if (e.type === 'navbarshow') {
					wz.height(wz.height() + wzbase.outerHeight());
					path.prependTo(fm.getUI('statusbar'));
					wzbase.detach();
					place = 'statusbar';
					fm.unbind('open', toWorkzone);
				} else {
					wzbase.append(path).insertBefore(wz);
					wz.height(wz.height() - wzbase.outerHeight());
					place = 'workzone';
					toWorkzone();
					fm.bind('open', toWorkzone);
				}
				setTimeout(function() { fm.trigger('resize'); }, 0);
			})
			.bind('resize', fit);
	});
};


/*
 * File: /js/ui/places.js
 */

/**
 * @class elFinder places/favorites ui
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfinderplaces = function(fm, opts) {
	return this.each(function() {
		var dirs      = {},
			c         = 'class',
			navdir    = fm.res(c, 'navdir'),
			collapsed = fm.res(c, 'navcollapse'),
			expanded  = fm.res(c, 'navexpand'),
			hover     = fm.res(c, 'hover'),
			clroot    = fm.res(c, 'treeroot'),
			dropover  = fm.res(c, 'adroppable'),
			tpl       = fm.res('tpl', 'placedir'),
			ptpl      = fm.res('tpl', 'perms'),
			spinner   = $(fm.res('tpl', 'navspinner')),
			key       = 'places'+(opts.suffix? opts.suffix : ''),
			menuTimer = null,
			/**
			 * Convert places dir node into dir hash
			 *
			 * @param  String  directory id
			 * @return String
			 **/
			id2hash   = function(id) { return id.substr(6);	},
			/**
			 * Convert places dir node into dir hash
			 *
			 * @param  String  directory id
			 * @return String
			 **/
			hash2id   = function(hash) { return 'place-'+hash; },
			
			/**
			 * Save current places state
			 *
			 * @return void
			 **/
			save      = function() {
				var hashes = [], data = [];
				
				hashes = $.map(subtree.children().find('[id]'), function(n) {
					return id2hash(n.id);
				});
				$.each(hashes.reverse(), function(i, h) {
					data.push(h + '#' + dirs[h].name);
				});
				
				
				fm.storage(key, data.join(','));
			},
			/**
			 * Return node for given dir object
			 *
			 * @param  Object  directory object
			 * @return jQuery
			 **/
			create    = function(dir, hash) {
				return $(tpl.replace(/\{id\}/, hash2id(dir? dir.hash : hash))
						.replace(/\{name\}/, fm.escape(dir? dir.name : hash))
						.replace(/\{cssclass\}/, dir? fm.perms2class(dir) : '')
						.replace(/\{permissions\}/, (dir && (!dir.read || !dir.write))? ptpl : '')
						.replace(/\{title\}/, (dir && dir.path)? fm.escape(dir.path) : '')
						.replace(/\{symlink\}/, '')
						.replace(/\{style\}/, ''));
			},
			/**
			 * Add new node into places
			 *
			 * @param  Object  directory object
			 * @return void
			 **/
			add = function(dir) {
				var node, hash;

				if (dir.mime !== 'directory') {
					return false;
				}
				hash = dir.hash;
				if (!fm.files().hasOwnProperty(hash)) {
					// update cache
					fm.trigger('tree', {tree: [dir]});
				}
				
				node = create(dir, hash);
				if (dir.notfound) {
					node.addClass('ui-state-disabled');
				}
				
				dirs[hash] = dir;
				subtree.prepend(node);
				root.addClass(collapsed);
				
				return true;
			},
			/**
			 * Remove dir from places
			 *
			 * @param  String  directory hash
			 * @return String  removed name
			 **/
			remove = function(hash) {
				var name = null, tgt;

				if (dirs[hash]) {
					delete dirs[hash];
					tgt = $('#'+hash2id(hash));
					if (tgt.length) {
						name = tgt.text();
						tgt.parent().remove();
						if (!subtree.children().length) {
							root.removeClass(collapsed);
							places.removeClass(expanded);
							subtree.slideToggle(false);
						}
					}
				}
				
				return name;
			},
			/**
			 * Move up dir on places
			 *
			 * @param  String  directory hash
			 * @return void
			 **/
			moveup = function(hash) {
				var self = $('#'+hash2id(hash)),
					tgt  = self.parent(),
					prev = tgt.prev('div'),
					cls  = 'ui-state-hover',
					ctm  = fm.getUI('contextmenu');
				
				menuTimer && clearTimeout(menuTimer);
				
				if (prev.length) {
					ctm.find(':first').data('placesHash', hash);
					self.addClass(cls);
					tgt.insertBefore(prev);
					prev = tgt.prev('div');
					menuTimer = setTimeout(function() {
						self.removeClass(cls);
						if (ctm.find(':first').data('placesHash') === hash) {
							ctm.hide().empty();
						}
					}, 1500);
				}
				
				if(!prev.length) {
					self.removeClass(cls);
					ctm.hide().empty();
				}
			},
			/**
			 * Update dir at places
			 *
			 * @param  Object   directory
			 * @param  String   previous hash
			 * @return Boolean
			 **/
			update = function(dir, preHash) {
				var hash = dir.hash,
					tgt  = $('#'+hash2id(preHash || hash)),
					node = create(dir, hash);

				if (tgt.length > 0) {
					if (dir.notfound) {
						node.addClass('ui-state-disabled');
					}
					tgt.parent().replaceWith(node);
					dirs[hash] = dir;
					return true
				} else {
					return false;
				}
			},
			/**
			 * Remove all dir from places
			 *
			 * @return void
			 **/
			clear = function() {
				subtree.empty();
				root.removeClass(collapsed);
				places.removeClass(expanded);
				subtree.slideToggle(false);
			},
			/**
			 * Sort places dirs A-Z
			 *
			 * @return void
			 **/
			sort = function() {
				$.each(dirs, function(h, f) {
					var dir = fm.file(h) || f,
						node = create(dir, h),
						ret = null;
					if (!dir) {
						node.hide();
					}
					if (subtree.children().length) {
						$.each(subtree.children(), function() {
							var current =  $(this);
							if (dir.name.localeCompare(current.children('.'+navdir).text()) < 0) {
								ret = !node.insertBefore(current);
								return ret;
							}
						});
						if (ret !== null) {
							return true;
						}
					}
					!$('#'+hash2id(h)).length && subtree.append(node);
				});
				save();
			},
			/**
			 * Node - wrapper for places root
			 *
			 * @type jQuery
			 **/
			wrapper = create({
					hash  : 'root-'+fm.namespace, 
					name  : fm.i18n(opts.name, 'places'),
					read  : true,
					write : true
				}),
			/**
			 * Places root node
			 *
			 * @type jQuery
			 **/
			root = wrapper.children('.'+navdir)
				.addClass(clroot)
				.click(function(e) {
					e.stopPropagation();
					if (root.hasClass(collapsed)) {
						places.toggleClass(expanded);
						subtree.slideToggle();
						fm.storage('placesState', places.hasClass(expanded)? 1 : 0);
					}
				})
				.append(
					// sort button
					$('<span class="elfinder-button-icon elfinder-button-icon-sort elfinder-places-root-icon" title="'+fm.i18n('cmdsort')+'"/>')
						.on('click', function(e) {
							e.stopPropagation();
							subtree.empty();
							sort();
						}
					)
				),
			/**
			 * Container for dirs
			 *
			 * @type jQuery
			 **/
			subtree = wrapper.children('.'+fm.res(c, 'navsubtree'))
				.sortable({
					appendTo : 'body',
					revert   : false,
					helper   : function(e) {
						var dir = $(e.target).parent();
							
						dir.children().removeClass('ui-state-hover');
						
						return $('<div class="ui-widget elfinder-place-drag elfinder-'+fm.direction+'"/>')
								.append($('<div class="elfinder-navbar"/>').show().append(dir.clone()));

					},
					stop     : function(e, ui) {
						var target = $(ui.item[0]),
							top    = places.offset().top,
							left   = places.offset().left,
							width  = places.width(),
							height = places.height(),
							x      = e.pageX,
							y      = e.pageY;
						
						if (!(x > left && x < left+width && y > top && y < y+height)) {
							remove(id2hash(target.children(':first').attr('id')));
							save();
						}
					},
					update   : function(e, ui) {
						save();
					}
				}),
			/**
			 * Main places container
			 *
			 * @type jQuery
			 **/
			places = $(this).addClass(fm.res(c, 'tree')+' elfinder-places ui-corner-all')
				.hide()
				.append(wrapper)
				.appendTo(fm.getUI('navbar'))
				.on('mouseenter mouseleave', '.'+navdir, function(e) {
					$(this).toggleClass('ui-state-hover', (e.type == 'mouseenter'));
				})
				.on('click', '.'+navdir, function(e) {
					var p = $(this);
					if (p.data('longtap')) {
						e.stopPropagation();
						return;
					}
					fm.exec('open', p.attr('id').substr(6));
				})
				.on('contextmenu', '.'+navdir+':not(.'+clroot+')', function(e) {
					var self = $(this),
						hash = self.attr('id').substr(6);
					
					e.preventDefault();

					fm.trigger('contextmenu', {
						raw : [{
							label    : fm.i18n('moveUp'),
							icon     : 'up',
							remain   : true,
							callback : function() { moveup(hash); save(); }
						},'|',{
							label    : fm.i18n('rmFromPlaces'),
							icon     : 'rm',
							callback : function() { remove(hash); save(); }
						}],
						'x'       : e.pageX,
						'y'       : e.pageY
					});
					
					self.addClass('ui-state-hover');
					
					fm.getUI('contextmenu').children().on('mouseenter', function() {
						self.addClass('ui-state-hover');
					});
					
					fm.bind('closecontextmenu', function() {
						self.removeClass('ui-state-hover');
					});
				})
				.droppable({
					tolerance  : 'pointer',
					accept     : '.elfinder-cwd-file-wrapper,.elfinder-tree-dir,.elfinder-cwd-file',
					hoverClass : fm.res('class', 'adroppable'),
					classes    : { // Deprecated hoverClass jQueryUI>=1.12.0
						'ui-droppable-hover': fm.res('class', 'adroppable')
					},
					over       : function(e, ui) {
						var helper = ui.helper,
							dir    = $.map(helper.data('files'), function(h) { return (fm.file(h).mime === 'directory' && !dirs[h])? h : null});
						e.stopPropagation();
						helper.data('dropover', helper.data('dropover') + 1);
						if (fm.insideWorkzone(e.pageX, e.pageY)) {
							if (dir.length > 0) {
								helper.addClass('elfinder-drag-helper-plus');
								fm.trigger('unlockfiles', {files : helper.data('files'), helper: helper});
							} else {
								$(this).removeClass(dropover);
							}
						}
					},
					out : function(e, ui) {
						var helper = ui.helper,
							ctr    = (e.shiftKey||e.ctrlKey||e.metaKey);
						e.stopPropagation();
						helper.toggleClass('elfinder-drag-helper-move elfinder-drag-helper-plus', helper.data('locked')? true : ctr).data('dropover', Math.max(helper.data('dropover') - 1, 0));
						$(this).removeData('dropover')
						       .removeClass(dropover);
						fm.trigger(ctr? 'unlockfiles' : 'lockfiles', {files : helper.data('files'), helper: helper});
					},
					drop       : function(e, ui) {
						var helper  = ui.helper,
							resolve = true;
						
						$.each(helper.data('files'), function(i, hash) {
							var dir = fm.file(hash);
							
							if (dir && dir.mime == 'directory' && !dirs[dir.hash]) {
								add(dir);
							} else {
								resolve = false;
							}
						})
						save();
						resolve && helper.hide();
					}
				})
				// for touch device
				.on('touchstart', '.'+navdir+':not(.'+clroot+')', function(e) {
					if (e.originalEvent.touches.length > 1) {
						return;
					}
					var hash = $(this).attr('id').substr(6),
					p = $(this)
					.addClass(hover)
					.data('longtap', null)
					.data('tmlongtap', setTimeout(function(){
						// long tap
						p.data('longtap', true);
						fm.trigger('contextmenu', {
							raw : [{
								label    : fm.i18n('rmFromPlaces'),
								icon     : 'rm',
								callback : function() { remove(hash); save(); }
							}],
							'x'       : e.originalEvent.touches[0].pageX,
							'y'       : e.originalEvent.touches[0].pageY
						});
					}, 500));
				})
				.on('touchmove touchend', '.'+navdir+':not(.'+clroot+')', function(e) {
					clearTimeout($(this).data('tmlongtap'));
					if (e.type == 'touchmove') {
						$(this).removeClass(hover);
					}
				});

		// "on regist" for command exec
		$(this).on('regist', function(e, files){
			var added = false;
			$.each(files, function(i, dir) {
				if (dir && dir.mime == 'directory' && !dirs[dir.hash]) {
					if (add(dir)) {
						added = true;
					}
				}
			});
			added && save();
		});
	

		// on fm load - show places and load files from backend
		fm.one('load', function() {
			var dat, hashes;
			
			if (fm.oldAPI) {
				return;
			}
			
			places.show().parent().show();

			dirs = {};
			dat = $.map((fm.storage(key) || '').split(','), function(hash) { return hash || null;});
			$.each(dat, function(i, d) {
				var dir = d.split('#')
				dirs[dir[0]] = dir[1]? dir[1] : dir[0];
			});
			// allow modify `dirs`
			/**
			 * example for preset places
			 * 
			 * elfinderInstance.bind('placesload', function(e, fm) {
			 * 	//if (fm.storage(e.data.storageKey) === null) { // for first time only
			 * 	if (!fm.storage(e.data.storageKey)) {           // for empty places
			 * 		e.data.dirs[targetHash] = fallbackName;     // preset folder
			 * 	}
			 * }
			 **/
			fm.trigger('placesload', {dirs: dirs, storageKey: key}, true);
			
			hashes = Object.keys(dirs);
			if (hashes.length) {
				root.prepend(spinner);
				
				fm.request({
					data : {cmd : 'info', targets : hashes},
					preventDefault : true
				})
				.done(function(data) {
					var exists = {};
					$.each(data.files, function(i, f) {
						var hash = f.hash;
						exists[hash] = f;
					});
					$.each(dirs, function(h, f) {
						add(exists[h] || { hash: h, name: f, mime: 'directory', notfound: true });
					});
					if (fm.storage('placesState') > 0) {
						root.click();
					}
				})
				.always(function() {
					spinner.remove();
				})
			}
			

			fm.change(function(e) {
				var changed = false;
				$.each(e.data.changed, function(i, file) {
					if (dirs[file.hash]) {
						if (file.mime !== 'directory') {
							if (remove(file.hash)) {
								changed = true;
							}
						} else {
							if (update(file)) {
								changed = true;
							}
						}
					}
				});
				changed && save();
			})
			.bind('rename', function(e) {
				var changed = false;
				if (e.data.removed) {
					$.each(e.data.removed, function(i, hash) {
						if (e.data.added[i]) {
							if (update(e.data.added[i], hash)) {
								changed = true;
							}
						}
					});
				}
				changed && save();
			})
			.bind('rm paste', function(e) {
				var names = [],
					changed = false;
				if (e.data.removed) {
					$.each(e.data.removed, function(i, hash) {
						var name = remove(hash);
						name && names.push(name);
					});
				}
				if (names.length) {
					changed = true;
				}
				if (e.data.added && names.length) {
					$.each(e.data.added, function(i, file) {
						if ($.inArray(file.name, names) !== 1) {
							file.mime == 'directory' && add(file);
						}
					});
				}
				changed && save();
			})
			.bind('sync', function() {
				var hashes = Object.keys(dirs);
				if (hashes.length) {
					root.prepend(spinner);

					fm.request({
						data : {cmd : 'info', targets : hashes},
						preventDefault : true
					})
					.done(function(data) {
						var exists  = {},
							updated = false,
							cwd     = fm.cwd().hash;
						$.each(data.files || [], function(i, file) {
							var hash = file.hash;
							exists[hash] = file;
							if (!fm.files().hasOwnProperty(file.hash)) {
								// update cache
								fm.trigger('tree', {tree: [file]});
							}
						});
						$.each(dirs, function(h, f) {
							if (!f.notfound != !!exists[h]) {
								if (f.phash === cwd || (exists[h] && exists[h].mime !== 'directory')) {
									if (remove(h)) {
										updated = true;
									}
								} else {
									if (update(exists[h] || { hash: h, name: f.name, mime: 'directory', notfound: true })) {
										updated = true;
									}
								}
							} else if (exists[h] && exists[h].phash != cwd) {
								// update permission of except cwd
								update(exists[h]);
							}
						});
						updated && save();
					})
					.always(function() {
						spinner.remove();
					});
				}
			})
			
		})
		
	});
};


/*
 * File: /js/ui/searchbutton.js
 */

/**
 * @class  elFinder toolbar search button widget.
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfindersearchbutton = function(cmd) {
	return this.each(function() {
		var result = false,
			fm     = cmd.fm,
			id     = function(name){return fm.namespace + name},
			toolbar= fm.getUI('toolbar'),
			btnCls = fm.res('class', 'searchbtn'),
			button = $(this).hide().addClass('ui-widget-content elfinder-button '+btnCls),
			search = function() {
				opts && opts.slideUp();
				var val = $.trim(input.val()),
					from = !$('#' + id('SearchFromAll')).prop('checked'),
					mime = $('#' + id('SearchMime')).prop('checked');
				if (from) {
					if ($('#' + id('SearchFromVol')).prop('checked')) {
						from = fm.root(fm.cwd().hash);
					} else {
						from = fm.cwd().hash;
					}
				}
				if (mime) {
					mime = val;
					val = '.';
				}
				if (val) {
					cmd.exec(val, from, mime).done(function() {
						result = true;
						input.focus();
					}).fail(function() {
						abort();
					});
					
				} else {
					fm.trigger('searchend');
				}
			},
			abort = function() {
				opts && opts.slideUp();
				input.val('');
				if (result) {
					result = false;
					fm.trigger('searchend');
				}
			},
			input  = $('<input type="text" size="42"/>')
				.focus(function(){
					opts && opts.slideDown();
				})
				.blur(function(){
					if (opts) {
						if (!opts.data('infocus')) {
							opts.slideUp();
						} else {
							opts.data('infocus', false);
						}
					}
				})
				.appendTo(button)
				// to avoid fm shortcuts on arrows
				.keypress(function(e) {
					e.stopPropagation();
				})
				.keydown(function(e) {
					e.stopPropagation();
					
					e.keyCode == 13 && search();
					
					if (e.keyCode== 27) {
						e.preventDefault();
						abort();
					}
				}),
			opts = (fm.api < 2.1)? null : $('<div class="ui-front ui-widget ui-widget-content elfinder-button-menu ui-corner-all"/>')
				.append(
					$('<div class="buttonset"/>')
						.append(
							$('<input id="'+id('SearchFromCwd')+'" name="serchfrom" type="radio" checked="checked"/><label for="'+id('SearchFromCwd')+'">'+fm.i18n('btnCwd')+'</label>'),
							$('<input id="'+id('SearchFromVol')+'" name="serchfrom" type="radio"/><label for="'+id('SearchFromVol')+'">'+fm.i18n('btnVolume')+'</label>'),
							$('<input id="'+id('SearchFromAll')+'" name="serchfrom" type="radio"/><label for="'+id('SearchFromAll')+'">'+fm.i18n('btnAll')+'</label>')
						),
					$('<div class="buttonset"/>')
						.append(
							$('<input id="'+id('SearchName')+'" name="serchcol" type="radio" checked="checked"/><label for="'+id('SearchName')+'">'+fm.i18n('btnFileName')+'</label>'),
							$('<input id="'+id('SearchMime')+'" name="serchcol" type="radio"/><label for="'+id('SearchMime')+'">'+fm.i18n('btnMime')+'</label>')
						)
				)
				.hide()
				.css('overflow', 'hidden')
				.appendTo(button);
		
		$('<span class="ui-icon ui-icon-search" title="'+cmd.title+'"/>')
			.appendTo(button)
			.click(search);
		
		$('<span class="ui-icon ui-icon-close"/>')
			.appendTo(button)
			.click(abort);
		
		$(function(){
			if (!opts) {
				return;
			}
			opts.find('div.buttonset').buttonset();
			$('#'+id('SearchFromAll')).next('label').attr('title', fm.i18n('searchTarget', fm.i18n('btnAll')));
			$('#'+id('SearchMime')).next('label').attr('title', fm.i18n('searchMime'));
			opts.find('input')
			.on('mousedown', function(){
				opts.data('infocus', true);
			})
			.on('click', function(){
				$.trim(input.val()) && search();
			});
		});
		
		// wait when button will be added to DOM
		toolbar.on('load', function(){
			var parent = button.parent();
			if (parent.length) {
				toolbar.prepend(button.show());
				parent.remove();
				// position icons for ie7
				if (fm.UA.ltIE7) {
					var icon = button.children(fm.direction == 'ltr' ? '.ui-icon-close' : '.ui-icon-search');
					icon.css({
						right : '',
						left  : parseInt(button.width())-icon.outerWidth(true)
					});
				}
				fm.resize();
			}
		});
		
		fm
			.select(function() {
				input.blur();
			})
			.bind('searchend', function() {
				input.val('');
			})
			.bind('open parents', function() {
				var dirs    = [],
					volroot = fm.file(fm.root(fm.cwd().hash));
				
				if (volroot) {
					$.each(fm.parents(fm.cwd().hash), function(i, hash) {
						dirs.push(fm.file(hash).name);
					});
		
					$('#'+id('SearchFromCwd')).next('label').attr('title', fm.i18n('searchTarget', dirs.join(fm.option('separator'))));
					$('#'+id('SearchFromVol')).next('label').attr('title', fm.i18n('searchTarget', volroot.name));
				}
			})
			.shortcut({
				pattern     : 'ctrl+f f3',
				description : cmd.title,
				callback    : function() { 
					toolbar.find('.'+btnCls+' input:text').select().focus();
				}
			});

	});
};


/*
 * File: /js/ui/sortbutton.js
 */

/**
 * @class  elFinder toolbar button menu with sort variants.
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfindersortbutton = function(cmd) {
	
	return this.each(function() {
		var fm       = cmd.fm,
			name     = cmd.name,
			c        = 'class',
			disabled = fm.res(c, 'disabled'),
			hover    = fm.res(c, 'hover'),
			item     = 'elfinder-button-menu-item',
			selected = item+'-selected',
			asc      = selected+'-asc',
			desc     = selected+'-desc',
			button   = $(this).addClass('ui-state-default elfinder-button elfinder-menubutton elfiner-button-'+name)
				.attr('title', cmd.title)
				.append('<span class="elfinder-button-icon elfinder-button-icon-'+name+'"/>')
				.hover(function(e) { !button.hasClass(disabled) && button.toggleClass(hover); })
				.click(function(e) {
					if (!button.hasClass(disabled)) {
						e.stopPropagation();
						menu.is(':hidden') && cmd.fm.getUI().click();
						menu.slideToggle(100);
					}
				}),
			menu = $('<div class="ui-front ui-widget ui-widget-content elfinder-button-menu ui-corner-all"/>')
				.hide()
				.appendTo(button)
				.on('mouseenter mouseleave', '.'+item, function() { $(this).toggleClass(hover) })
				.on('click', '.'+item, function(e) {
					e.preventDefault();
					e.stopPropagation();
					hide();
				}),
			update = function() {
				menu.children(':not(:last)').removeClass(selected+' '+asc+' '+desc)
					.filter('[rel="'+fm.sortType+'"]')
					.addClass(selected+' '+(fm.sortOrder == 'asc' ? asc : desc));

				menu.children(':last').toggleClass(selected, fm.sortStickFolders);
			},
			hide = function() { menu.hide(); };
			
			
		$.each(fm.sortRules, function(name, value) {
			menu.append($('<div class="'+item+'" rel="'+name+'"><span class="ui-icon ui-icon-arrowthick-1-n"/><span class="ui-icon ui-icon-arrowthick-1-s"/>'+fm.i18n('sort'+name)+'</div>').data('type', name));
		});
		
		menu.children().click(function(e) {
			var type = $(this).attr('rel');
			
			cmd.exec([], {
				type  : type, 
				order : type == fm.sortType ? fm.sortOrder == 'asc' ? 'desc' : 'asc' : fm.sortOrder, 
				stick : fm.sortStickFolders
			});
		});
		
		$('<div class="'+item+' '+item+'-separated"><span class="ui-icon ui-icon-check"/>'+fm.i18n('sortFoldersFirst')+'</div>')
			.appendTo(menu)
			.click(function() {
				cmd.exec([], {type : fm.sortType, order : fm.sortOrder, stick : !fm.sortStickFolders});
			});		
		
		fm.bind('disable select', hide).getUI().click(hide);
			
		fm.bind('sortchange', update)
		
		if (menu.children().length > 1) {
			cmd.change(function() {
					button.toggleClass(disabled, cmd.disabled());
					update();
				})
				.change();
			
		} else {
			button.addClass(disabled);
		}

	});
	
};


/*
 * File: /js/ui/stat.js
 */

/**
 * @class elFinder ui
 * Display number of files/selected files and its size in statusbar
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfinderstat = function(fm) {
	return this.each(function() {
		var size       = $(this).addClass('elfinder-stat-size'),
			sel        = $('<div class="elfinder-stat-selected"/>')
				.on('click', 'a', function(e) {
					var hash = $(this).data('hash');
					e.preventDefault();
					fm.exec('opendir', [ hash ]);
				}),
			titlesize  = fm.i18n('size'),
			titleitems = fm.i18n('items'),
			titlesel   = fm.i18n('selected'),
			setstat    = function(files, cwd) {
				var c = 0, 
					s = 0;

				$.each(files, function(i, file) {
					if (!cwd || file.phash == cwd) {
						c++;
						s += parseInt(file.size)||0;
					}
				})
				size.html(titleitems+': '+c+', '+titlesize+': '+fm.formatSize(s));
			},
			search = false;

		fm.getUI('statusbar').prepend(size).append(sel).show();
		
		fm
		.bind('open reload add remove change searchend', function() {
			setstat(fm.files(), fm.cwd().hash);
		})
		.bind('searchend', function() {
			search = false;
		})
		.search(function(e) {
			search = true;
			setstat(e.data.files);
		})
		.select(function() {
			var s = 0,
				c = 0,
				files = fm.selectedFiles(),
				dirs = [],
				file;

			if (files.length == 1) {
				file = files[0];
				s = file.size;
				if (search) {
					dirs.push('<a href="#elf_'+file.phash+'" data-hash="'+file.hash+'">'+(file.path? file.path.replace(/\/[^\/]*$/, '') : '..')+'</a>');
				}
				dirs.push(fm.escape(file.name));
				sel.html(dirs.join('/') + (s > 0 ? ', '+fm.formatSize(s) : ''));
				
				return;
			}

			$.each(files, function(i, file) {
				c++;
				s += parseInt(file.size)||0;
			});

			sel.html(c ? titlesel+': '+c+', '+titlesize+': '+fm.formatSize(s) : '&nbsp;');
		})

		;
	})
};


/*
 * File: /js/ui/toolbar.js
 */

/**
 * @class  elFinder toolbar
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfindertoolbar = function(fm, opts) {
	this.not('.elfinder-toolbar').each(function() {
		var commands = fm._commands,
			self     = $(this).addClass('ui-helper-clearfix ui-widget-header ui-corner-top elfinder-toolbar'),
			options  = {
				// default options
				autoHideUA: ['Mobile']
			},
			filter   = function(opts) {
				return $.map(opts, function(v) {
					if ($.isPlainObject(v)) {
						options = $.extend(options, v);
						return null;
					}
					return [v];
				});
			},
			panels   = filter(opts || []),
			dispre   = null,
			uiCmdMapPrev = '',
			l, i, cmd, panel, button, swipeHandle;
		
		self.prev().length && self.parent().prepend(this);

		var render = function(disabled){
			var name;
			self.empty();
			l = panels.length;
			while (l--) {
				if (panels[l]) {
					panel = $('<div class="ui-widget-content ui-corner-all elfinder-buttonset"/>');
					i = panels[l].length;
					while (i--) {
						name = panels[l][i];
						if ((!disabled || $.inArray(name, disabled) === -1) && (cmd = commands[name])) {
							button = 'elfinder'+cmd.options.ui;
							$.fn[button] && panel.prepend($('<div/>')[button](cmd));
						}
					}
					
					panel.children().length && self.prepend(panel);
					panel.children(':gt(0)').before('<span class="ui-widget-content elfinder-toolbar-button-separator"/>');

				}
			}
			
			(! self.data('swipeClose') && self.children().length)? self.show() : self.hide();
			self.trigger('load');
		};
		
		render();
		
		fm.bind('open sync', function(){
			var repCmds = [],
			disabled = fm.option('disabled');

			if (!dispre || dispre.toString() !== disabled.sort().toString()) {
				render(disabled && disabled.length? disabled : null);
			}
			dispre = disabled.concat().sort();

			if (uiCmdMapPrev !== JSON.stringify(fm.commandMap)) {
				uiCmdMapPrev = JSON.stringify(fm.commandMap);
				if (Object.keys(fm.commandMap).length) {
					$.each(fm.commandMap, function(from, to){
						var cmd = fm._commands[to],
						button = cmd? 'elfinder'+cmd.options.ui : null;
						if (button && $.fn[button]) {
							repCmds.push(from);
							var btn = $('div.elfinder-buttonset div.elfinder-button').has('span.elfinder-button-icon-'+from);
							if (btn.length && !btn.next().has('span.elfinder-button-icon-'+to).length) {
								btn.after($('<div/>')[button](fm._commands[to]).data('origin', from));
								btn.hide();
							}
						}
					});
				}
				// reset toolbar
				$.each($('div.elfinder-button'), function(){
					var origin = $(this).data('origin');
					if (origin && $.inArray(origin, repCmds) == -1) {
						$('span.elfinder-button-icon-'+$(this).data('origin')).parent().show();
						$(this).remove();
					}
				});
			}
		});
		
		if (fm.UA.Touch) {
			fm.bind('load', function() {
				swipeHandle = $('<div class="elfinder-toolbar-swipe-handle"/>').appendTo(fm.getUI());
				if (swipeHandle.css('pointer-events') !== 'none') {
					swipeHandle.remove();
					swipeHandle = null;
				}
			})
			.one('open', function() {
				if (options.autoHideUA && options.autoHideUA.length > 0) {
					if ($.map(options.autoHideUA, function(v){ return fm.UA[v]? true : null; }).length) {
						setTimeout(function() {
							self.stop(true, true).trigger('toggle', {duration: 500});
						}, 500);
					}
				}
			});
			
			self.on('toggle', function(e, data) {
				var wz    = fm.getUI('workzone'),
					toshow= self.is(':hidden'),
					wzh   = wz.height(),
					h     = self.height(),
					tbh   = self.outerHeight(true),
					delta = tbh - h,
					opt   = $.extend({
						step: function(now) {
							wz.height(wzh + (toshow? (now + delta) * -1 : h - now));
							fm.trigger('resize');
						},
						always: function() {
							wz.height(wzh + (toshow? self.outerHeight(true) * -1 : tbh));
							fm.trigger('resize');
							if (swipeHandle) {
								if (toshow) {
									swipeHandle.stop(true, true).hide();
								} else {
									swipeHandle.height(data.handleH? data.handleH : '');
									fm.resources.blink(swipeHandle, 'slowonce');
								}
							}
						}
					}, data);
				self.data('swipeClose', ! toshow).animate({height : 'toggle'}, opt);
			});
		}
	});
	

	
	return this;
};


/*
 * File: /js/ui/tree.js
 */

/**
 * @class  elFinder folders tree
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfindertree = function(fm, opts) {
	var treeclass = fm.res('class', 'tree');
	
	this.not('.'+treeclass).each(function() {

		var c = 'class', mobile = fm.UA.Mobile,
			
			/**
			 * Root directory class name
			 *
			 * @type String
			 */
			root      = fm.res(c, 'treeroot'),

			/**
			 * Open root dir if not opened yet
			 *
			 * @type Boolean
			 */
			openRoot  = opts.openRootOnLoad,

			/**
			 * Open current work dir if not opened yet
			 *
			 * @type Boolean
			 */
			openCwd   = opts.openCwdOnOpen,

			/**
			 * Subtree class name
			 *
			 * @type String
			 */
			subtree   = fm.res(c, 'navsubtree'),
			
			/**
			 * Directory class name
			 *
			 * @type String
			 */
			navdir    = fm.res(c, 'treedir'),
			
			/**
			 * Directory CSS selector
			 *
			 * @type String
			 */
			selNavdir = 'span.' + navdir,
			
			/**
			 * Collapsed arrow class name
			 *
			 * @type String
			 */
			collapsed = fm.res(c, 'navcollapse'),
			
			/**
			 * Expanded arrow class name
			 *
			 * @type String
			 */
			expanded  = fm.res(c, 'navexpand'),
			
			/**
			 * Class name to mark arrow for directory with already loaded children
			 *
			 * @type String
			 */
			loaded    = 'elfinder-subtree-loaded',
			
			/**
			 * Arraw class name
			 *
			 * @type String
			 */
			arrow = fm.res(c, 'navarrow'),
			
			/**
			 * Current directory class name
			 *
			 * @type String
			 */
			active    = fm.res(c, 'active'),
			
			/**
			 * Droppable dirs dropover class
			 *
			 * @type String
			 */
			dropover = fm.res(c, 'adroppable'),
			
			/**
			 * Hover class name
			 *
			 * @type String
			 */
			hover    = fm.res(c, 'hover'),
			
			/**
			 * Disabled dir class name
			 *
			 * @type String
			 */
			disabled = fm.res(c, 'disabled'),
			
			/**
			 * Draggable dir class name
			 *
			 * @type String
			 */
			draggable = fm.res(c, 'draggable'),
			
			/**
			 * Droppable dir  class name
			 *
			 * @type String
			 */
			droppable = fm.res(c, 'droppable'),
			
			/**
			 * Un-disabled cmd `paste` volume's root wrapper class
			 * 
			 * @type String
			 */
			pastable = 'elfinder-navbar-wrapper-pastable',
			
			/**
			 * Un-disabled cmd `upload` volume's root wrapper class
			 * 
			 * @type String
			 */
			uploadable = 'elfinder-navbar-wrapper-uploadable',
			
			insideNavbar = function(x) {
				var left = navbar.offset().left;
					
				return left <= x && x <= left + navbar.width();
			},
			
			drop = fm.droppable.drop,
			
			/**
			 * Droppable options
			 *
			 * @type Object
			 */
			droppableopts = $.extend(true, {}, fm.droppable, {
				// show subfolders on dropover
				over : function(e, ui) {
					var dst    = $(this),
						helper = ui.helper,
						cl     = hover+' '+dropover,
						hash, status;
					e.stopPropagation();
					helper.data('dropover', helper.data('dropover') + 1);
					dst.data('dropover', true);
					if (ui.helper.data('namespace') !== fm.namespace || ! insideNavbar(e.clientX) || ! fm.insideWorkzone(e.pageX, e.pageY)) {
						dst.removeClass(cl);
						helper.removeClass('elfinder-drag-helper-move elfinder-drag-helper-plus');
						return;
					}
					dst.addClass(hover)
					if (dst.is('.'+collapsed+':not(.'+expanded+')')) {
						dst.data('expandTimer', setTimeout(function() {
							dst.children('.'+arrow).click();
						}, 500));
					}
					hash = fm.navId2Hash(dst.attr('id'));
					dst.data('dropover', hash);
					$.each(ui.helper.data('files'), function(i, h) {
						if (h === hash || (fm.file(h).phash === hash && !ui.helper.hasClass('elfinder-drag-helper-plus'))) {
							dst.removeClass(cl);
							return false; // break $.each
						}
					});
					if (helper.data('locked')) {
						status = 'elfinder-drag-helper-plus';
					} else {
						status = 'elfinder-drag-helper-move';
						if (e.shiftKey || e.ctrlKey || e.metaKey) {
							status += ' elfinder-drag-helper-plus';
						}
					}
					dst.hasClass(dropover) && helper.addClass(status);
					setTimeout(function(){ dst.hasClass(dropover) && helper.addClass(status); }, 20);
				},
				out : function(e, ui) {
					var dst    = $(this),
						helper = ui.helper;
					e.stopPropagation();
					helper.removeClass('elfinder-drag-helper-move elfinder-drag-helper-plus').data('dropover', Math.max(helper.data('dropover') - 1, 0));
					dst.data('expandTimer') && clearTimeout(dst.data('expandTimer'));
					dst.removeData('dropover')
					   .removeClass(hover+' '+dropover);
				},
				deactivate : function() {
					$(this).removeData('dropover')
					       .removeClass(hover+' '+dropover);
				},
				drop : function(e, ui) {
					insideNavbar(e.clientX) && drop.call(this, e, ui);
				}
			}),
			
			spinner = $(fm.res('tpl', 'navspinner')),
			
			/**
			 * Directory html template
			 *
			 * @type String
			 */
			tpl = fm.res('tpl', 'navdir'),
			
			/**
			 * Permissions marker html template
			 *
			 * @type String
			 */
			ptpl = fm.res('tpl', 'perms'),
			
			/**
			 * Lock marker html template
			 *
			 * @type String
			 */
			ltpl = fm.res('tpl', 'lock'),
			
			/**
			 * Symlink marker html template
			 *
			 * @type String
			 */
			stpl = fm.res('tpl', 'symlink'),
			
			/**
			 * Html template replacement methods
			 *
			 * @type Object
			 */
			replace = {
				id          : function(dir) { return fm.navHash2Id(dir.hash) },
				cssclass    : function(dir) {
					var cname = (dir.phash ? '' : root)+' '+navdir+' '+fm.perms2class(dir);
					dir.dirs && !dir.link && (cname += ' ' + collapsed);
					opts.getClass && (cname += ' ' + opts.getClass(dir));
					dir.csscls && (cname += ' ' + fm.escape(dir.csscls));
					return cname;
				},
				permissions : function(dir) { return !dir.read || !dir.write ? ptpl : ''; },
				symlink     : function(dir) { return dir.alias ? stpl : ''; },
				style       : function(dir) { return dir.icon ? 'style="background:url(\''+fm.escape(dir.icon)+'\') 0 0 no-repeat;background-size:contain;"' : ''; }
			},
			
			/**
			 * Return html for given dir
			 *
			 * @param  Object  directory
			 * @return String
			 */
			itemhtml = function(dir) {
				dir.name = fm.escape(dir.i18 || dir.name);
				
				return tpl.replace(/(?:\{([a-z]+)\})/ig, function(m, key) {
					return dir[key] || (replace[key] ? replace[key](dir) : '');
				});
			},
			
			/**
			 * Return only dirs from files list
			 *
			 * @param  Array  files list
			 * @return Array
			 */
			filter = function(files) {
				return $.map(files||[], function(f) { return f.mime == 'directory' ? f : null });
			},
			
			/**
			 * Find parent subtree for required directory
			 *
			 * @param  String  dir hash
			 * @return jQuery
			 */
			findSubtree = function(hash) {
				return hash ? $('#'+fm.navHash2Id(hash)).next('.'+subtree) : tree;
			},
			
			/**
			 * Find directory (wrapper) in required node
			 * before which we can insert new directory
			 *
			 * @param  jQuery  parent directory
			 * @param  Object  new directory
			 * @return jQuery
			 */
			findSibling = function(subtree, dir) {
				var node = subtree.children(':first'),
					info, compare;

				compare = fm.naturalCompare;
				while (node.length) {
					info = fm.file(fm.navId2Hash(node.children('[id]').attr('id')));
					
					if ((info = fm.file(fm.navId2Hash(node.children('[id]').attr('id')))) 
					&& compare(dir.name, info.name) < 0) {
						return node;
					}
					node = node.next();
				}
				return $('');
			},
			
			/**
			 * Add new dirs in tree
			 *
			 * @param  Array  dirs list
			 * @return void
			 */
			updateTree = function(dirs) {
				var length  = dirs.length,
					orphans = [],
					i = dirs.length,
					dir, html, parent, sibling, init, atonce = {}, base;

				var firstVol = true; // check for netmount volume
				while (i--) {
					dir = dirs[i];

					if ($('#'+fm.navHash2Id(dir.hash)).length) {
						continue;
					}
					
					if ((parent = findSubtree(dir.phash)).length) {
						if (dir.phash && ((init = !parent.children().length) || (sibling = findSibling(parent, dir)).length)) {
							if (init) {
								if (!atonce[dir.phash]) {
									atonce[dir.phash] = [];
								}
								atonce[dir.phash].push(dir);
							} else {
								sibling.before(itemhtml(dir));
							}
						} else {
							parent[firstVol || dir.phash ? 'append' : 'prepend'](itemhtml(dir));
							firstVol = false;
							if (!dir.phash) {
								base = $('#'+fm.navHash2Id(dir.hash)).parent();
								if (!dir.disabled || dir.disabled.length < 1) {
									base.addClass(pastable+' '+uploadable);
								} else {
									if ($.inArray('paste', dir.disabled) === -1) {
										base.addClass(pastable);
									}
									if ($.inArray('upload', dir.disabled) === -1) {
										base.addClass(uploadable);
									}
								}
							}
						}
					} else {
						orphans.push(dir);
					}
				}

				// When init, html append at once
				if (Object.keys(atonce).length){
					$.each(atonce, function(p, dirs){
						var parent = findSubtree(p),
						    html   = [];
						dirs.sort(compare);
						$.each(dirs, function(i, d){
							html.push(itemhtml(d));
						});
						parent.append(html.join(''));
					});
				}
				
				if (orphans.length && orphans.length < length) {
					return updateTree(orphans);
				} 
				
				if (length && !mobile) {
					updateDroppable();
				}
				
			},
			
			/**
			 * sort function by dir.name
			 * 
			 */
			compare = function(dir1, dir2) {
				return fm.naturalCompare(dir1.name, dir2.name);
			},

			/**
			 * Auto scroll to cwd
			 *
			 * @return void
			 */
			autoScroll = function(target) {
				var self = $(this);
				self.data('autoScrTm') && clearTimeout(self.data('autoScrTm'));
				self.data('autoScrTm', setTimeout(function() {
					var current = $('#'+(target || fm.navHash2Id(fm.cwd().hash)));
					
					if (current.length) {
						var parent = tree.parent().stop(false, true),
						top = parent.offset().top,
						treeH = parent.height(),
						bottom = top + treeH - current.outerHeight(),
						tgtTop = current.offset().top;
						
						if (tgtTop < top || tgtTop > bottom) {
							parent.animate({ scrollTop : parent.scrollTop() + tgtTop - top - treeH / 3 }, { duration : 'fast' });
						}
					}
				}, 100));
			},
			
			/**
			 * Mark current directory as active
			 * If current directory is not in tree - load it and its parents
			 *
			 * @param {Boolean} do not expand cwd
			 * @return void
			 */
			sync = function(noCwd, dirs) {
				var cwd     = fm.cwd(),
					cwdhash = cwd.hash,
					current = $('#'+fm.navHash2Id(cwdhash)), 
					noCwd   = noCwd || false,
					dirs    = dirs || [],
					rootNode, dir, link, subs, subsLen, cnt;
				
				if (openRoot) {
					rootNode = $('#'+fm.navHash2Id(fm.root()));
					rootNode.hasClass(loaded) && rootNode.addClass(expanded).next('.'+subtree).show();
					openRoot = false;
				}
				
				if (!current.hasClass(active)) {
					tree.find(selNavdir+'.'+active).removeClass(active);
					current.addClass(active);
				}

				if (opts.syncTree || !current.length) {
					if (current.length) {
						if (!noCwd) {
							current.addClass(loaded);
							if (openCwd && current.hasClass(collapsed)) {
								current.addClass(expanded).next('.'+subtree).slideDown();
							}
						}
						subs = current.parentsUntil('.'+root).filter('.'+subtree);
						subsLen = subs.length;
						cnt = 1;
						subs.show().prev(selNavdir).addClass(expanded, function(){
							!noCwd && subsLen == cnt++ && autoScroll();
						});
						!subsLen && !noCwd && autoScroll();
						return;
					}
					if (fm.newAPI) {
						dir = fm.file(cwdhash);
						if (dir && dir.phash) {
							link = $('#'+fm.navHash2Id(dir.phash));
							if (link.length && link.hasClass(loaded)) {
								updateTree([dir]);
								sync(noCwd);
								return;
							}
						}
						link  = cwd.root? $('#'+fm.navHash2Id(cwd.root)) : null;
						if (link) {
							spinner.insertBefore(link.children('.'+arrow));
							link.removeClass(collapsed);
						}
						fm.request({
							data : {cmd : 'parents', target : cwdhash},
							preventFail : true
						})
						.done(function(data) {
							if (fm.api < 2.1) {
								data.tree = data.tree.concat([cwd]);
							}
							dirs = $.merge(dirs, filter(data.tree));
							updateTree(dirs);
							updateArrows(dirs, loaded);
							cwdhash == cwd.hash && fm.visible() && sync(noCwd);
						})
						.always(function(data) {
							if (link) {
								spinner.remove();
								link.addClass(collapsed+' '+loaded);
							}
						});
					}
					
				}
			},
			
			/**
			 * Make writable and not root dirs droppable
			 *
			 * @return void
			 */
			updateDroppable = function(target) {
				var limit = 100,
					next;
				
				if (!target) {
					tree.find('div.'+uploadable).find(selNavdir+':not(.elfinder-ro,.elfinder-na)').addClass('native-droppable');
					target = tree.find('div.'+pastable).find(selNavdir+':not(.'+droppable+',.elfinder-ro,.elfinder-na)');
				}
				
				if (target.length > limit) {
					next = target.slice(limit);
					target = target.slice(0, limit);
				}
				
				target.droppable(droppableopts);
				
				if (next) {
					setTimeout(function(){
						updateDroppable(next);
					}, 20);
				}
			},
			
			/**
			 * Check required folders for subfolders and update arrow classes
			 *
			 * @param  Array  folders to check
			 * @param  String css class 
			 * @return void
			 */
			updateArrows = function(dirs, cls) {
				var sel = cls == loaded
						? '.'+collapsed+':not(.'+loaded+')'
						: ':not(.'+collapsed+')';
				
						
				//tree.find('.'+subtree+':has(*)').prev(':not(.'+collapsed+')').addClass(collapsed)

				$.each(dirs, function(i, dir) {
					$('#'+fm.navHash2Id(dir.phash)+sel)
						.filter(function() { return $(this).next('.'+subtree).children().length > 0 })
						.addClass(cls);
				})
			},
			
			
			
			/**
			 * Navigation tree
			 *
			 * @type JQuery
			 */
			tree = $(this).addClass(treeclass)
				// make dirs draggable and toggle hover class
				.on('mouseenter mouseleave', selNavdir, function(e) {
					var link  = $(this), 
						enter = e.type == 'mouseenter';
					
					if (!link.hasClass(dropover+' '+disabled)) {
						!mobile && enter && !link.hasClass(root+' '+draggable+' elfinder-na elfinder-wo') && link.draggable(fm.draggable);
						link.toggleClass(hover, enter);
					}
				})
				// add/remove dropover css class
				.on('dropover dropout drop', selNavdir, function(e) {
					$(this)[e.type == 'dropover' ? 'addClass' : 'removeClass'](dropover+' '+hover);
				})
				// open dir or open subfolders in tree
				.on('click', selNavdir, function(e) {
					var link = $(this),
						hash = fm.navId2Hash(link.attr('id')),
						file = fm.file(hash);
					
						if (link.data('longtap')) {
							e.stopPropagation();
						return;
					}
					
					fm.searchStatus.state && fm.trigger('searchend', { noupdate: true });
				
					if (hash != fm.cwd().hash && !link.hasClass(disabled)) {
						fm.exec('open', hash).done(function() {
							fm.select({selected: [hash]});
						});
					} else {
						if (link.hasClass(collapsed)) {
							link.children('.'+arrow).click();
						}
						fm.select({selected: [hash]});
					}
				})
				// for touch device
				.on('touchstart', selNavdir, function(e) {
					if (e.originalEvent.touches.length > 1) {
						return;
					}
					var evt = e.originalEvent,
					p = $(this)
					.addClass(hover)
					.data('longtap', null)
					.data('tmlongtap', setTimeout(function(e){
						// long tap
						p.data('longtap', true);
						fm.trigger('contextmenu', {
							'type'    : 'navbar',
							'targets' : [fm.navId2Hash(p.attr('id'))],
							'x'       : evt.touches[0].pageX,
							'y'       : evt.touches[0].pageY
						});
					}, 500));
				})
				.on('touchmove touchend', selNavdir, function(e) {
					clearTimeout($(this).data('tmlongtap'));
					if (e.type == 'touchmove') {
						$(this).removeClass(hover);
					}
				})
				// toggle subfolders in tree
				.on('click', selNavdir+'.'+collapsed+' .'+arrow, function(e) {
					var arrow = $(this),
						link  = arrow.parent(selNavdir),
						stree = link.next('.'+subtree),
						slideTH = 30, cnt;

					e.stopPropagation();

					if (link.hasClass(loaded)) {
						link.toggleClass(expanded);
						cnt = link.hasClass(expanded)? stree.children().length + stree.find('div.elfinder-navbar-subtree[style*=block]').children().length : stree.find('div:visible').length;
						if (cnt > slideTH) {
							stree.toggle();
							fm.draggingUiHelper && fm.draggingUiHelper.data('refreshPositions', 1);
						} else {
							stree.stop(true, true).slideToggle('normal', function(){
								fm.draggingUiHelper && fm.draggingUiHelper.data('refreshPositions', 1);
							});
						}
					} else {
						spinner.insertBefore(arrow);
						link.removeClass(collapsed);

						fm.request({cmd : 'tree', target : fm.navId2Hash(link.attr('id'))})
							.done(function(data) { 
								updateTree(filter(data.tree)); 
								
								if (stree.children().length) {
									link.addClass(collapsed+' '+expanded);
									if (stree.children().length > slideTH) {
										stree.show();
										fm.draggingUiHelper && fm.draggingUiHelper.data('refreshPositions', 1);
									} else {
										stree.stop(true, true).slideDown('normal', function(){
											fm.draggingUiHelper && fm.draggingUiHelper.data('refreshPositions', 1);
										});
									}
								} 
								sync(true);
							})
							.always(function(data) {
								spinner.remove();
								link.addClass(loaded);
							});
					}
				})
				.on('contextmenu', selNavdir, function(e) {
					var self = $(this);
					e.preventDefault();

					fm.trigger('contextmenu', {
						'type'    : 'navbar',
						'targets' : [fm.navId2Hash($(this).attr('id'))],
						'x'       : e.pageX,
						'y'       : e.pageY
					});
					
					self.addClass('ui-state-hover');
					
					fm.getUI('contextmenu').children().on('mouseenter', function() {
						self.addClass('ui-state-hover');
					});
					
					fm.bind('closecontextmenu', function() {
						self.removeClass('ui-state-hover');
					});
				})
				.on('scrolltoview', selNavdir, function() {
					autoScroll($(this).attr('id'));
				}),
			// move tree into navbar
			navbar = fm.getUI('navbar').append(tree).show()
				
			;

		fm.open(function(e) {
			var data = e.data,
				dirs = filter(data.files),
				contextmenu = fm.getUI('contextmenu');

			data.init && tree.empty();

			if (fm.UA.iOS) {
				navbar.removeClass('overflow-scrolling-touch').addClass('overflow-scrolling-touch');
			}

			if (dirs.length) {
				if (!contextmenu.data('cmdMaps')) {
					contextmenu.data('cmdMaps', {});
				}
				updateTree(dirs);
				updateArrows(dirs, loaded);
				// support volume driver option `uiCmdMap`
				$.each(dirs, function(k, v){
					if (v.volumeid) {
						if (v.uiCmdMap && Object.keys(v.uiCmdMap).length && !contextmenu.data('cmdMaps')[v.volumeid]) {
							contextmenu.data('cmdMaps')[v.volumeid] = v.uiCmdMap;
						}
					}
				});
			} 
			sync(false, dirs);
		})
		// add new dirs
		.add(function(e) {
			var dirs = filter(e.data.added);

			if (dirs.length) {
				updateTree(dirs);
				updateArrows(dirs, collapsed);
			}
		})
		// update changed dirs
		.change(function(e) {
			var dirs = filter(e.data.changed),
				length = dirs.length,
				l    = length,
				dir, node, tmp, realParent, reqParent, realSibling, reqSibling, isExpanded, isLoaded;
			
			while (l--) {
				dir = dirs[l];
				if ((node = $('#'+fm.navHash2Id(dir.hash))).length) {
					if (dir.phash) {
						realParent  = node.closest('.'+subtree);
						reqParent   = findSubtree(dir.phash);
						realSibling = node.parent().next();
						reqSibling  = findSibling(reqParent, dir);
						
						if (!reqParent.length) {
							continue;
						}
						
						if (reqParent[0] !== realParent[0] || realSibling.get(0) !== reqSibling.get(0)) {
							reqSibling.length ? reqSibling.before(node) : reqParent.append(node);
						}
					}
					isExpanded = node.hasClass(expanded);
					isLoaded   = node.hasClass(loaded);
					tmp        = $(itemhtml(dir));
					node.replaceWith(tmp.children(selNavdir));
					
					if (dir.dirs 
					&& (isExpanded || isLoaded) 
					&& (node = $('#'+fm.navHash2Id(dir.hash))) 
					&& node.next('.'+subtree).children().length) {
						isExpanded && node.addClass(expanded);
						isLoaded && node.addClass(loaded);
					}
				}
			}

			sync();
			length && !mobile && updateDroppable();
		})
		// remove dirs
		.remove(function(e) {
			var dirs = e.data.removed,
				l    = dirs.length,
				node, stree;
			
			while (l--) {
				if ((node = $('#'+fm.navHash2Id(dirs[l]))).length) {
					stree = node.closest('.'+subtree);
					node.parent().detach();
					if (!stree.children().length) {
						stree.hide().prev(selNavdir).removeClass(collapsed+' '+expanded+' '+loaded);
					}
				}
			}
		})
		// lock/unlock dirs while moving
		.bind('lockfiles unlockfiles', function(e) {
			var lock = e.type == 'lockfiles',
				helperLocked = e.data.helper? e.data.helper.data('locked') : false,
				act  = (lock && !helperLocked) ? 'disable' : 'enable',
				dirs = $.map(e.data.files||[], function(h) {  
					var dir = fm.file(h);
					return dir && dir.mime == 'directory' ? h : null;
				});
				
			$.each(dirs, function(i, hash) {
				var dir = $('#'+fm.navHash2Id(hash));
				
				if (dir.length && !helperLocked) {
					dir.hasClass(draggable) && dir.draggable(act);
					dir.hasClass(droppable) && dir.droppable(act);
					dir[lock ? 'addClass' : 'removeClass'](disabled);
				}
			});
		});

	});
	
	return this;
};


/*
 * File: /js/ui/uploadButton.js
 */

/**
 * @class  elFinder toolbar's button tor upload file
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfinderuploadbutton = function(cmd) {
	return this.each(function() {
		var button = $(this).elfinderbutton(cmd)
				.off('click'), 
			form = $('<form/>').appendTo(button),
			input = $('<input type="file" multiple="true" title="'+cmd.fm.i18n('selectForUpload')+'"/>')
				.change(function() {
					var _input = $(this);
					if (_input.val()) {
						cmd.exec({input : _input.remove()[0]});
						input.clone(true).appendTo(form);
					} 
				})
				.on('dragover', function(e) {
					e.originalEvent.dataTransfer.dropEffect = 'copy';
				});

		form.append(input.clone(true));
				
		cmd.change(function() {
			form[cmd.disabled() ? 'hide' : 'show']();
		})
		.change();
	});
};


/*
 * File: /js/ui/viewbutton.js
 */

/**
 * @class  elFinder toolbar button to switch current directory view.
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfinderviewbutton = function(cmd) {
	return this.each(function() {
		var button = $(this).elfinderbutton(cmd),
			icon   = button.children('.elfinder-button-icon');

		cmd.change(function() {
			var icons = cmd.value == 'icons';

			icon.toggleClass('elfinder-button-icon-view-list', icons);
			button.attr('title', cmd.fm.i18n(icons ? 'viewlist' : 'viewicons'));
		});
	});
};


/*
 * File: /js/ui/workzone.js
 */

/**
 * @class elfinderworkzone - elFinder container for nav and current directory
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfinderworkzone = function(fm) {
	var cl = 'elfinder-workzone';
	
	this.not('.'+cl).each(function() {
		var wz     = $(this).addClass(cl),
			wdelta = wz.outerHeight(true) - wz.height(),
			parent = wz.parent();
			
		parent.add(window).on('resize.' + fm.namespace, function() {
				var height = parent.height();

				parent.children(':visible:not(.'+cl+')').each(function() {
					var ch = $(this);

					if (ch.css('position') != 'absolute' && ch.css('position') != 'fixed') {
						height -= ch.outerHeight(true);
					}
				});
				
				wz.height(height - wdelta);
			});
	});
	return this;
};


/*
 * File: /js/commands/archive.js
 */

/**
 * @class  elFinder command "archive"
 * Archive selected files
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.archive = function() {
	var self  = this,
		fm    = self.fm,
		mimes = [],
		dfrd;
		
	this.variants = [];
	
	this.disableOnSearch = false;
	
	/**
	 * Update mimes on open/reload
	 *
	 * @return void
	 **/
	fm.bind('open reload', function() {
		self.variants = [];
		$.each((mimes = fm.option('archivers')['create'] || []), function(i, mime) {
			self.variants.push([mime, fm.mime2kind(mime)])
		});
		self.change();
	});
	
	this.getstate = function(sel) {
		var sel = this.files(sel),
			cnt = sel.length,
			chk = (cnt && sel[0].phash && (fm.file(sel[0].phash) || {}).write),
			cwdId;
		
		if (chk && fm.searchStatus.state > 1) {
			cwdId = fm.cwd().volumeid;
			chk = (cnt === $.map(sel, function(f) { return f.read && f.hash.indexOf(cwdId) === 0 ? f : null; }).length);
		}
		
		return chk && !this._disabled && mimes.length && (cnt || (dfrd && dfrd.state() == 'pending')) ? 0 : -1;
	}
	
	this.exec = function(hashes, type) {
		var files = this.files(hashes),
			cnt   = files.length,
			mime  = type || mimes[0],
			cwd   = fm.file(files[0].phash) || null,
			error = ['errArchive', 'errPerm', 'errCreatingTempDir', 'errFtpDownloadFile', 'errFtpUploadFile', 'errFtpMkdir', 'errArchiveExec', 'errExtractExec', 'errRm'],
			i, open;

		dfrd = $.Deferred().fail(function(error) {
			error && fm.error(error);
		});

		if (!(this.enabled() && cnt && mimes.length && $.inArray(mime, mimes) !== -1)) {
			return dfrd.reject();
		}
		
		if (!cwd.write) {
			return dfrd.reject(error);
		}
		
		for (i = 0; i < cnt; i++) {
			if (!files[i].read) {
				return dfrd.reject(error);
			}
		}

		self.mime   = mime;
		self.prefix = ((cnt > 1)? 'Archive' : files[0].name) + (fm.option('archivers')['createext']? '.' + fm.option('archivers')['createext'][mime] : '');
		self.data   = {targets : self.hashes(hashes), type : mime};
		
		if (fm.cwd().hash !== cwd.hash) {
			open = fm.exec('open', cwd.hash);
		} else {
			open = null;
		}
		
		$.when(open).done(function() {
			fm.selectfiles({files : hashes});
			dfrd = $.proxy(fm.res('mixin', 'make'), self)();
		});
		
		return dfrd;
	}

};


/*
 * File: /js/commands/back.js
 */

/**
 * @class  elFinder command "back"
 * Open last visited folder
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.back = function() {
	this.alwaysEnabled  = true;
	this.updateOnSelect = false;
	this.shortcuts      = [{
		pattern     : 'ctrl+left backspace'
	}];
	
	this.getstate = function() {
		return this.fm.history.canBack() ? 0 : -1;
	}
	
	this.exec = function() {
		return this.fm.history.back();
	}

};


/*
 * File: /js/commands/chmod.js
 */

/**
 * @class elFinder command "chmod".
 * Chmod files.
 *
 * @type  elFinder.command
 * @author Naoki Sawada
 */
elFinder.prototype.commands.chmod = function() {
	this.updateOnSelect = false;
	var self = this;
	var fm  = this.fm,
	level = {
		0 : 'owner',
		1 : 'group',
		2 : 'other'
	},
	msg = {
		read     : fm.i18n('read'),
		write    : fm.i18n('write'),
		execute  : fm.i18n('execute'),
		perm     : fm.i18n('perm'),
		kind     : fm.i18n('kind'),
		files    : fm.i18n('files')
	},
	isPerm = function(perm){
		return (!isNaN(parseInt(perm, 8) && parseInt(perm, 8) <= 511) || perm.match(/^([r-][w-][x-]){3}$/i));
	};

	this.tpl = {
		main       : '<div class="ui-helper-clearfix elfinder-info-title"><span class="elfinder-cwd-icon {class} ui-corner-all"/>{title}</div>'
					+'{dataTable}',
		itemTitle  : '<strong>{name}</strong><span id="elfinder-info-kind">{kind}</span>',
		groupTitle : '<strong>{items}: {num}</strong>',
		dataTable  : '<table id="{id}-table-perm"><tr><td>{0}</td><td>{1}</td><td>{2}</td></tr></table>'
					+'<div class="">'+msg.perm+': <input id="{id}-perm" type="text" size="4" maxlength="3" value="{value}"></div>',
		fieldset   : '<fieldset id="{id}-fieldset-{level}"><legend>{f_title}{name}</legend>'
					+'<input type="checkbox" value="4" id="{id}-read-{level}-perm"{checked-r}> <label for="{id}-read-{level}-perm">'+msg.read+'</label><br>'
					+'<input type="checkbox" value="6" id="{id}-write-{level}-perm"{checked-w}> <label for="{id}-write-{level}-perm">'+msg.write+'</label><br>'
					+'<input type="checkbox" value="5" id="{id}-execute-{level}-perm"{checked-x}> <label for="{id}-execute-{level}-perm">'+msg.execute+'</label><br>'
	};

	this.shortcuts = [{
		//pattern     : 'ctrl+p'
	}];

	this.getstate = function(sel) {
		var fm = this.fm;
		sel = sel || fm.selected();
		if (sel.length == 0) {
			sel = [ fm.cwd().hash ];
		}
		return !this._disabled && self.checkstate(this.files(sel)) ? 0 : -1;
	};
	
	this.checkstate = function(sel) {
		var cnt = sel.length;
		if (!cnt) return false;
		var chk = $.map(sel, function(f) {
			return (f.isowner && f.perm && isPerm(f.perm) && (cnt == 1 || f.mime != 'directory')) ? f : null;
		}).length;
		return (cnt == chk)? true : false;
	};

	this.exec = function(hashes) {
		var files   = this.files(hashes);
		if (! files.length) {
			hashes = [ this.fm.cwd().hash ];
			files   = this.files(hashes);
		}
		var fm  = this.fm,
		dfrd    = $.Deferred().always(function() {
			fm.enable();
		}),
		tpl     = this.tpl,
		hashes  = this.hashes(hashes),
		cnt     = files.length,
		file    = files[0],
		id = fm.namespace + '-perm-' + file.hash,
		view    = tpl.main,
		checked = ' checked="checked"',
		buttons = function() {
			var buttons = {};
			buttons[fm.i18n('btnApply')] = save;
			buttons[fm.i18n('btnCancel')] = function() { dialog.elfinderdialog('close'); };
			return buttons;
		},
		save = function() {
			var perm = $.trim($('#'+id+'-perm').val());
			
			if (!isPerm(perm)) return false;
			
			dialog.elfinderdialog('close');
			
			fm.request({
				data : {
					cmd     : 'chmod',
					targets : hashes,
					mode    : perm
				},
				notify : {type : 'chmod', cnt : cnt}
			})
			.fail(function(error) {
				dfrd.reject(error);
			})
			.done(function(data) {
				dfrd.resolve(data);
			});
		},
		setperm = function() {
			var perm = '';
			var _perm;
			for (var i = 0; i < 3; i++){
				_perm = 0;
				if ($("#"+id+"-read-"+level[i]+'-perm').is(':checked')) {
					_perm = (_perm | 4);
				}
				if ($("#"+id+"-write-"+level[i]+'-perm').is(':checked')) {
					_perm = (_perm | 2);
				}
				if ($("#"+id+"-execute-"+level[i]+'-perm').is(':checked')) {
					_perm = (_perm | 1);
				}
				perm += _perm.toString(8);
			}
			$('#'+id+'-perm').val(perm);
		},
		setcheck = function(perm) {
			var _perm;
			for (var i = 0; i < 3; i++){
				_perm = parseInt(perm.slice(i, i+1), 8);
				$("#"+id+"-read-"+level[i]+'-perm').prop("checked", false);
				$("#"+id+"-write-"+level[i]+'-perm').prop("checked", false);
				$("#"+id+"-execute-"+level[i]+'-perm').prop("checked", false);
				if ((_perm & 4) == 4) {
					$("#"+id+"-read-"+level[i]+'-perm').prop("checked", true);
				}
				if ((_perm & 2) == 2) {
					$("#"+id+"-write-"+level[i]+'-perm').prop("checked", true);
				}
				if ((_perm & 1) == 1) {
					$("#"+id+"-execute-"+level[i]+'-perm').prop("checked", true);
				}
			}
			setperm();
		},
		makeperm = function(files) {
			var perm = '777', ret = '', chk, _chk, _perm;
			var len = files.length;
			for (var i2 = 0; i2 < len; i2++) {
				chk = getPerm(files[i2].perm);;
				ret = '';
				for (var i = 0; i < 3; i++){
					_chk = parseInt(chk.slice(i, i+1), 8);
					_perm = parseInt(perm.slice(i, i+1), 8);
					if ((_chk & 4) != 4 && (_perm & 4) == 4) {
						_perm -= 4;
					}
					if ((_chk & 2) != 2 && (_perm & 2) == 2) {
						_perm -= 2;
					}
					if ((_chk & 1) != 1 && (_perm & 1) == 1) {
						_perm -= 1;
					}
					ret += _perm.toString(8);
				}
				perm = ret;
			}
			return perm;
		},
		makeName = function(name) {
			return name? ':'+name : '';
		},
		makeDataTable = function(perm, f) {
			var _perm, fieldset;
			var value = '';
			var dataTable = tpl.dataTable;
			for (var i = 0; i < 3; i++){
				_perm = parseInt(perm.slice(i, i+1), 8);
				value += _perm.toString(8);
				fieldset = tpl.fieldset.replace('{f_title}', fm.i18n(level[i])).replace('{name}', makeName(f[level[i]])).replace(/\{level\}/g, level[i]);
				dataTable = dataTable.replace('{'+i+'}', fieldset)
				                     .replace('{checked-r}', ((_perm & 4) == 4)? checked : '')
				                     .replace('{checked-w}', ((_perm & 2) == 2)? checked : '')
				                     .replace('{checked-x}', ((_perm & 1) == 1)? checked : '');
			}
			dataTable = dataTable.replace('{value}', value).replace('{valueCaption}', msg['perm']);
			return dataTable;
		},
		getPerm = function(perm){
			if (isNaN(parseInt(perm, 8))) {
				var mode_array = perm.split('');
				var a = [];

				for (var i = 0, l = mode_array.length; i < l; i++) {
					if (i === 0 || i === 3 || i === 6) {
						if (mode_array[i].match(/[r]/i)) {
							a.push(1);
						} else if (mode_array[i].match(/[-]/)) {
							a.push(0);
						}
					} else if ( i === 1 || i === 4 || i === 7) {
						 if (mode_array[i].match(/[w]/i)) {
							a.push(1);
						} else if (mode_array[i].match(/[-]/)) {
							a.push(0);
						}
					} else {
						if (mode_array[i].match(/[x]/i)) {
							a.push(1);
						} else if (mode_array[i].match(/[-]/)) {
							a.push(0);
						}
					}
				}
			
				a.splice(3, 0, ",");
				a.splice(7, 0, ",");

				var b = a.join("");
				var b_array = b.split(",");
				var c = [];
			
				for (var j = 0, m = b_array.length; j < m; j++) {
					var p = parseInt(b_array[j], 2).toString(8);
					c.push(p)
				}

				perm = c.join('');
			} else {
				perm = parseInt(perm, 8).toString(8);
			}
			return perm;
		},
		opts    = {
			title : this.title,
			width : 'auto',
			buttons : buttons(),
			close : function() { $(this).elfinderdialog('destroy'); }
		},
		dialog = fm.getUI().find('#'+id),
		tmb = '', title, dataTable;

		if (dialog.length) {
			dialog.elfinderdialog('toTop');
			return $.Deferred().resolve();
		}

		view  = view.replace('{class}', cnt > 1 ? 'elfinder-cwd-icon-group' : fm.mime2class(file.mime));
		if (cnt > 1) {
			title = tpl.groupTitle.replace('{items}', fm.i18n('items')).replace('{num}', cnt);
		} else {
			title = tpl.itemTitle.replace('{name}', file.name).replace('{kind}', fm.mime2kind(file));
			tmb = fm.tmb(file);
		}

		dataTable = makeDataTable(makeperm(files), files.length == 1? files[0] : {});

		view = view.replace('{title}', title).replace('{dataTable}', dataTable).replace(/{id}/g, id);

		dialog = fm.dialog(view, opts);
		dialog.attr('id', id);

		// load thumbnail
		if (tmb) {
			$('<img/>')
				.on('load', function() { dialog.find('.elfinder-cwd-icon').addClass(tmb.className).css('background-image', "url('"+tmb.url+"')"); })
				.attr('src', tmb.url);
		}

		$('#' + id + '-table-perm :checkbox').on('click', function(){setperm('perm');});
		$('#' + id + '-perm').on('keydown', function(e) {
			var c = e.keyCode;
			e.stopPropagation();
			if (c == 13) {
				save();
				return;
			}
		}).on('focus', function(e){
			$(this).select();
		}).on('keyup', function(e) {
			if ($(this).val().length == 3) {
				$(this).select();
				setcheck($(this).val());
			}
		});
		
		return dfrd;
	};
};


/*
 * File: /js/commands/copy.js
 */

/**
 * @class elFinder command "copy".
 * Put files in filemanager clipboard.
 *
 * @type  elFinder.command
 * @author  Dmitry (dio) Levashov
 */
elFinder.prototype.commands.copy = function() {
	
	this.shortcuts = [{
		pattern     : 'ctrl+c ctrl+insert'
	}];
	
	this.getstate = function(sel) {
		var sel = this.files(sel),
			cnt = sel.length;

		return !this._disabled && cnt && $.map(sel, function(f) { return f.phash && f.read ? f : null  }).length == cnt ? 0 : -1;
	}
	
	this.exec = function(hashes) {
		var fm   = this.fm,
			dfrd = $.Deferred()
				.fail(function(error) {
					fm.error(error);
				});

		$.each(this.files(hashes), function(i, file) {
			if (!(file.read && file.phash)) {
				return !dfrd.reject(['errCopy', file.name, 'errPerm']);
			}
		});
		
		return dfrd.state() == 'rejected' ? dfrd : dfrd.resolve(fm.clipboard(this.hashes(hashes)));
	}

};


/*
 * File: /js/commands/cut.js
 */

/**
 * @class elFinder command "copy".
 * Put files in filemanager clipboard.
 *
 * @type  elFinder.command
 * @author  Dmitry (dio) Levashov
 */
elFinder.prototype.commands.cut = function() {
	
	this.shortcuts = [{
		pattern     : 'ctrl+x shift+insert'
	}];
	
	this.getstate = function(sel) {
		var sel = this.files(sel),
			cnt = sel.length;
		
		return !this._disabled && cnt && $.map(sel, function(f) { return f.phash && f.read && !f.locked ? f : null  }).length == cnt ? 0 : -1;
	}
	
	this.exec = function(hashes) {
		var fm     = this.fm,
			dfrd   = $.Deferred()
				.fail(function(error) {
					fm.error(error);
				});

		$.each(this.files(hashes), function(i, file) {
			if (!(file.read && file.phash) ) {
				return !dfrd.reject(['errCopy', file.name, 'errPerm']);
			}
			if (file.locked) {
				return !dfrd.reject(['errLocked', file.name]);
			}
		});
		
		return dfrd.state() == 'rejected' ? dfrd : dfrd.resolve(fm.clipboard(this.hashes(hashes), true));
	}

};


/*
 * File: /js/commands/download.js
 */

/**
 * @class elFinder command "download". 
 * Download selected files.
 * Only for new api
 *
 * @author Dmitry (dio) Levashov, dio@std42.ru
 **/
elFinder.prototype.commands.zipdl = function() {};
elFinder.prototype.commands.download = function() {
	var self   = this,
		fm     = this.fm,
		zipOn  = false,
		filter = function(hashes) {
			var czipdl = (fm.api > 2)? fm.command('zipdl') : null,
				mixed  = false,
				croot  = '';
			
			if (czipdl !== null && fm.searchStatus.state > 1 && fm.searchStatus.target === '') {
				croot = fm.root(hashes[0]);
				$.each(hashes, function(i, h) {
					if (mixed = (croot !== fm.root(h))) {
						return false;
					}
				});
			}
			zipOn = (! mixed && czipdl !== null && fm.isCommandEnabled('zipdl', hashes[0]));

			if (mixed) {
				hashes = $.map(hashes, function(h) {
					return fm.isCommandEnabled('download', h)? h : null;
				});
			} else {
				if (!fm.isCommandEnabled('download', hashes[0])) {
					return [];
				}
			}
			
			return $.map(self.files(hashes), function(f) { return (! f.read || (! zipOn && f.mime == 'directory')) ? null : f; });
		};
	
	this.linkedCmds = ['zipdl'];
	
	this.shortcuts = [{
		pattern     : 'shift+enter'
	}];
	
	this.getstate = function(sel) {
		var sel    = this.hashes(sel),
			cnt    = sel.length,
			maxReq = this.options.maxRequests || 10,
			czipdl = (fm.api > 2)? fm.command('zipdl') : null,
			mixed  = false,
			croot  = '';
		
		if (cnt < 1) {
			return -1;
		}
		cnt = filter(sel).length;
		
		return  (cnt && (zipOn || (cnt <= maxReq && ((!fm.UA.IE && !fm.UA.Mobile) || cnt == 1))) ? 0 : -1);
	};
	
	fm.bind('contextmenu', function(e){
		var fm = self.fm,
			helper = null,
			targets, file, link,
			getExtra = function(file) {
				var link = file.url || fm.url(file.hash);
				return {
					icon: 'link',
					node: $('<a/>')
						.attr({href: link, target: '_blank', title: fm.i18n('link')})
						.text(file.name)
						.on('mousedown click touchstart touchmove touchend contextmenu', function(e){
							var cm = fm.getUI('contextmenu');
							e.stopPropagation();
							// 'mouseEvInternal' for Firefox's bug (maybe)
							cm.data('mouseEvInternal', true);
							setTimeout(function(){
								cm.data('mouseEvInternal', false);
							}, 500);
						})
						.on('dragstart', function(e) {
							var dt = e.dataTransfer || e.originalEvent.dataTransfer || null;
							helper = null;
							if (dt) {
								var icon  = function(f) {
										var mime = f.mime, i, tmb = fm.tmb(f);
										i = '<div class="elfinder-cwd-icon '+fm.mime2class(mime)+' ui-corner-all"/>';
										if (tmb) {
											i = $(i).addClass(tmb.className).css('background-image', "url('"+tmb.url+"')").get(0).outerHTML;
										}
										return i;
									};
								dt.effectAllowed = 'copyLink';
								if (dt.setDragImage) {
									helper = $('<div class="elfinder-drag-helper html5-native">').append(icon(file)).appendTo($(document.body));
									dt.setDragImage(helper.get(0), 50, 47);
								}
								if (!fm.UA.IE) {
									dt.setData('elfinderfrom', window.location.href + file.phash);
									dt.setData('elfinderfrom:' + dt.getData('elfinderfrom'), '');
								}
							}
						})
						.on('dragend', function(e) {
							helper && helper.remove();
						})
				};
			};
		self.extra = null;
		if (e.data) {
			targets = e.data.targets || [];
			if (targets.length === 1 && (file = fm.file(targets[0])) && file.mime !== 'directory') {
				if (file.url != '1') {
					self.extra = getExtra(file);
				} else {
					// Get URL ondemand
					var node;
					self.extra = {
						icon: 'link',
						node: $('<a/>')
							.attr({href: '#', title: fm.i18n('getLink'), draggable: 'false'})
							.text(file.name)
							.on('click touchstart', function(e){
								if (e.type === 'touchstart' && e.originalEvent.touches.length > 1) {
									return;
								}
								var parent = node.parent();
								e.stopPropagation();
								e.preventDefault();
								parent.removeClass('ui-state-disabled').addClass('elfinder-button-icon-spinner');
								fm.request({
									data : {cmd : 'url', target : file.hash},
									preventDefault : true
								})
								.always(function(data) {
									parent.removeClass('elfinder-button-icon-spinner');
									if (data.url) {
										var rfile = fm.file(file.hash);
										rfile.url = data.url;
										node.replaceWith(getExtra(file).node);
									} else {
										parent.addClass('ui-state-disabled');
									}
								});

							})
					};
					node = self.extra.node;
					node.ready(function(){
						setTimeout(function(){
							node.parent().addClass('ui-state-disabled').css('pointer-events', 'auto');
						}, 10);
					});
				}
			}
		}
	});
	
	this.exec = function(hashes) {
		var hashes  = this.hashes(hashes),
			fm      = this.fm,
			base    = fm.options.url,
			files   = filter(hashes),
			dfrd    = $.Deferred(),
			iframes = '',
			cdata   = '',
			i, url;
			
		if (!files.length) {
			return dfrd.reject();
		}
		
		var link    = $('<a>').hide().appendTo($('body')),
			html5dl = (typeof link.get(0).download === 'string');
		
		if (zipOn && (files.length > 1 || files[0].mime === 'directory')) {
			dfrd = fm.request({
				data : {cmd : 'zipdl', targets : hashes},
				notify : {type : 'zipdl', cnt : 1, hideCnt : true, multi : true},
				cancel : true,
				preventDefault : true
			}).done(function(e) {
				var zipdl, dialog, btn = {}, dllink, form,
					uniq = 'dlw' + (+new Date());
				if (e.error) {
					fm.error(e.error);
					dfrd.reject();
				} else if (e.zipdl) {
					zipdl = e.zipdl;
					if (!html5dl && fm.UA.Mobile) {
						url = fm.options.url + (fm.options.url.indexOf('?') === -1 ? '?' : '&')
						+ 'cmd=zipdl&download=1';
						$.each([hashes[0], zipdl.file, zipdl.name, zipdl.mime], function(key, val) {
							url += '&targets%5B%5D='+encodeURIComponent(val);
						});
						$.each(fm.options.customData, function(key, val) {
							url += '&'+encodeURIComponent(key)+'='+encodeURIComponent(val);
						});
						url += '&'+encodeURIComponent(zipdl.name);
						dllink = $('<a/>')
							.attr('href', url)
							.attr('download', encodeURIComponent(zipdl.name))
							.attr('target', '_blank')
							.on('click', function() {
								fm.trigger('download', {files : files});
								dfrd.resolve(hashes);
								dialog.elfinderdialog('close');
							})
							.append('<span class="elfinder-button-icon elfinder-button-icon-download"></span>'+fm.escape(zipdl.name));
						btn[fm.i18n('btnCancel')] = function() {
							dialog.elfinderdialog('close');
						};
						dialog = fm.dialog(dllink, {
							title: fm.i18n('link'),
							buttons: btn,
							width: '200px'
						});
					} else {
						form = $('<form action="'+fm.options.url+'" method="post" target="'+uniq+'" style="display:none"/>')
						.append('<input type="hidden" name="cmd" value="zipdl"/>')
						.append('<input type="hidden" name="download" value="1"/>');
						$.each([hashes[0], zipdl.file, zipdl.name, zipdl.mime], function(key, val) {
							form.append('<input type="hidden" name="targets[]" value="'+fm.escape(val)+'"/>');
						});
						$.each(fm.options.customData, function(key, val) {
							form.append('<input type="hidden" name="'+key+'" value="'+fm.escape(val)+'"/>');
						});
						form.attr('target', uniq).appendTo('body');
						iframes = $('<iframe style="display:none" name="'+uniq+'">')
							.appendTo('body')
							.ready(function() {
								form.submit().remove();
								fm.trigger('download', {files : files});
								dfrd.resolve(hashes);
								setTimeout(function() {
									iframes.remove();
								}, fm.UA.Firefox? 20000 : 1000); // give mozilla 20 sec file to be saved
							});
					}
				}
			}).fail(function(error) {
				error && fm.error(error);
				dfrd.reject();
			}).always(function() {
				link.remove();
			});
			fm.trigger('download', {files : files});
			return dfrd;
		} else {
			for (i = 0; i < files.length; i++) {
				url = fm.openUrl(files[i].hash, true);
				if (html5dl) {
					link.attr('href', url)
					.attr('download', encodeURIComponent(files[i].name))
					.attr('target', '_blank')
					.get(0).click();
				} else {
					if (fm.UA.Mobile) {
						setTimeout(function(){
							if (! window.open(url)) {
								fm.error('errPopup');
							}
						}, 100);
					} else {
						iframes += '<iframe class="downloader" id="downloader-' + files[i].hash+'" style="display:none" src="'+url+'"/>';
					}
				}
			}
			link.remove();
			$(iframes)
				.appendTo('body')
				.ready(function() {
					setTimeout(function() {
						$(iframes).each(function() {
							$('#' + $(this).attr('id')).remove();
						});
					}, fm.UA.Firefox? (20000 + (10000 * i)) : 1000); // give mozilla 20 sec + 10 sec for each file to be saved
				});
			fm.trigger('download', {files : files});
			return dfrd.resolve(hashes);
		}
	};

};


/*
 * File: /js/commands/duplicate.js
 */

/**
 * @class elFinder command "duplicate"
 * Create file/folder copy with suffix "copy Number"
 *
 * @type  elFinder.command
 * @author  Dmitry (dio) Levashov
 */
elFinder.prototype.commands.duplicate = function() {
	var fm = this.fm;
	
	this.getstate = function(sel) {
		var sel = this.files(sel),
			cnt = sel.length;

		return !this._disabled && cnt && fm.cwd().write && $.map(sel, function(f) { return f.phash && f.read && f.phash === fm.cwd().hash? f : null  }).length == cnt ? 0 : -1;
	}
	
	this.exec = function(hashes) {
		var fm     = this.fm,
			files  = this.files(hashes),
			cnt    = files.length,
			dfrd   = $.Deferred()
				.fail(function(error) {
					error && fm.error(error);
				}), 
			args = [];
			
		if (!cnt || this.getstate(hashes) === -1) {
			return dfrd.reject();
		}
		
		$.each(files, function(i, file) {
			if (!file.read || !fm.file(file.phash).write) {
				return !dfrd.reject(['errCopy', file.name, 'errPerm']);
			}
		});
		
		if (dfrd.state() == 'rejected') {
			return dfrd;
		}
		
		return fm.request({
			data   : {cmd : 'duplicate', targets : this.hashes(hashes)},
			notify : {type : 'copy', cnt : cnt}
		});
		
	}

};


/*
 * File: /js/commands/edit.js
 */

/**
 * @class elFinder command "edit". 
 * Edit text file in dialog window
 *
 * @author Dmitry (dio) Levashov, dio@std42.ru
 **/
elFinder.prototype.commands.edit = function() {
	var self  = this,
		fm    = this.fm,
		mimes = fm.res('mimes', 'text') || [],
		rtrim = function(str){
			return str.replace(/\s+$/, '');
		},
	
		/**
		 * Return files acceptable to edit
		 *
		 * @param  Array  files hashes
		 * @return Array
		 **/
		filter = function(files) {
			return $.map(files, function(file) {
				return (file.mime.indexOf('text/') === 0 || $.inArray(file.mime, mimes) !== -1) 
					&& file.mime.indexOf('text/rtf')
					&& (!self.onlyMimes.length || $.inArray(file.mime, self.onlyMimes) !== -1)
					&& file.read && file.write ? file : null;
			});
		},
		
		/**
		 * Open dialog with textarea to edit file
		 *
		 * @param  String  id       dialog id
		 * @param  Object  file     file object
		 * @param  String  content  file content
		 * @return $.Deferred
		 **/
		dialog = function(id, file, content) {

			var dfrd = $.Deferred(),
				ta   = $('<textarea class="elfinder-file-edit" rows="20" id="'+id+'-ta">'+fm.escape(content)+'</textarea>'),
				old  = ta.val(),
				save = function() {
					ta.editor && ta.editor.save(ta[0], ta.editor.instance);
					old = ta.val();
					dfrd.notifyWith(ta);
				},
				cancel = function() {
					var close = function(){
						dfrd.reject();
						ta.elfinderdialog('close');
					};
					ta.editor && ta.editor.save(ta[0], ta.editor.instance);
					if (rtrim(old) !== rtrim(ta.val())) {
						old = ta.val();
						fm.confirm({
							title  : self.title,
							text   : 'confirmNotSave',
							accept : {
								label    : 'btnSaveClose',
								callback : function() {
									save();
									close();
								}
							},
							cancel : {
								label    : 'btnClose',
								callback : close
							}
						});
					} else {
						close();
					}
				},
				savecl = function() {
					save();
					cancel();
				},
				opts = {
					title   : fm.escape(file.name),
					width   : self.options.dialogWidth || 450,
					buttons : {},
					btnHoverFocus : false,
					closeOnEscape : false,
					close   : function() { 
						var $this = $(this),
						close = function(){
							ta.editor && ta.editor.close(ta[0], ta.editor.instance);
							$this.elfinderdialog('destroy');
						};
						ta.editor && ta.editor.save(ta[0], ta.editor.instance);
						if (rtrim(old) !== rtrim(ta.val())) {
							fm.confirm({
								title  : self.title,
								text   : 'confirmNotSave',
								accept : {
									label    : 'btnSaveClose',
									callback : function() {
										save();
										close();
									}
								},
								cancel : {
									label    : 'btnClose',
									callback : close
								}
							});
						} else {
							close();
						}
					},
					open    : function() { 
						fm.disable();
						ta.focus(); 
						ta[0].setSelectionRange && ta[0].setSelectionRange(0, 0);
						if (ta.editor) {
							ta.editor.instance = ta.editor.load(ta[0]) || null;
							ta.editor.focus(ta[0], ta.editor.instance);
						}
					}
					
				},
				mimeMatch = function(fileMime, editorMimes){
					editorMimes = editorMimes || mimes.concat('text/');
					if ($.inArray(fileMime, editorMimes) !== -1 ) {
						return true;
					}
					var i, l;
					l = editorMimes.length;
					for (i = 0; i < l; i++) {
						if (fileMime.indexOf(editorMimes[i]) === 0) {
							return true;
						}
					}
					return false;
				},
				extMatch = function(fileName, editorExts){
					if (!editorExts || !editorExts.length) {
						return true;
					}
					var ext = fileName.replace(/^.+\.([^.]+)|(.+)$/, '$1$2').toLowerCase(),
					i, l;
					l = editorExts.length;
					for (i = 0; i < l; i++) {
						if (ext === editorExts[i].toLowerCase()) {
							return true;
						}
					}
					return false;
				};
				
				ta.getContent = function() {
					return ta.val();
				};
				
				$.each(self.options.editors || [], function(i, editor) {
					if (mimeMatch(file.mime, editor.mimes || null)
					&& extMatch(file.name, editor.exts || null)
					&& typeof editor.load == 'function'
					&& typeof editor.save == 'function') {
						ta.editor = {
							load     : editor.load,
							save     : editor.save,
							close    : typeof editor.close == 'function' ? editor.close : function() {},
							focus    : typeof editor.focus == 'function' ? editor.focus : function() {},
							instance : null,
							doSave   : save,
							doCancel : cancel,
							doClose  : savecl,
							file     : file
						};
						
						return false;
					}
				});
				
				if (!ta.editor) {
					ta.keydown(function(e) {
						var code = e.keyCode,
							value, start;
						
						e.stopPropagation();
						if (code == 9) {
							e.preventDefault();
							// insert tab on tab press
							if (this.setSelectionRange) {
								value = this.value;
								start = this.selectionStart;
								this.value = value.substr(0, start) + "\t" + value.substr(this.selectionEnd);
								start += 1;
								this.setSelectionRange(start, start);
							}
						}
						
						if (e.ctrlKey || e.metaKey) {
							// close on ctrl+w/q
							if (code == 81 || code == 87) {
								e.preventDefault();
								cancel();
							}
							if (code == 83) {
								e.preventDefault();
								save();
							}
						}
						
					}).on('mouseenter', function(){this.focus();});
				}
				
				opts.buttons[fm.i18n('btnSave')]      = save;
				opts.buttons[fm.i18n('btnSaveClose')] = savecl;
				opts.buttons[fm.i18n('btnCancel')]    = cancel;
				
				fm.dialog(ta, opts)
					.attr('id', id)
					.on('keydown keyup keypress', function(e) {
						e.stopPropagation();
					});
				return dfrd.promise();
		},
		
		/**
		 * Get file content and
		 * open dialog with textarea to edit file content
		 *
		 * @param  String  file hash
		 * @return jQuery.Deferred
		 **/
		edit = function(file, doconv) {
			var hash   = file.hash,
				opts   = fm.options,
				dfrd   = $.Deferred(), 
				data   = {cmd : 'file', target : hash},
				id    = 'edit-'+fm.namespace+'-'+file.hash,
				d = fm.getUI().find('#'+id),
				conv   = !doconv? 0 : 1,
				error;
			
			
			if (d.length) {
				d.elfinderdialog('toTop');
				return dfrd.resolve();
			}
			
			if (!file.read || !file.write) {
				error = ['errOpen', file.name, 'errPerm'];
				fm.error(error);
				return dfrd.reject(error);
			}
			
			fm.request({
				data   : {cmd : 'get', target  : hash, conv : conv},
				notify : {type : 'file', cnt : 1},
				syncOnFail : true
			})
			.done(function(data) {
				if (data.doconv) {
					fm.confirm({
						title  : self.title,
						text   : 'confirmConvUTF8',
						accept : {
							label    : 'btnConv',
							callback : function() {  
								dfrd = edit(file, 1);
							}
						},
						cancel : {
							label    : 'btnCancel',
							callback : function() { dfrd.reject(); }
						}
					});
				} else {
					dialog(id, file, data.content)
						.progress(function() {
							var ta = this;
							fm.request({
								options : {type : 'post'},
								data : {
									cmd     : 'put',
									target  : hash,
									content : ta.getContent()
								},
								notify : {type : 'save', cnt : 1},
								syncOnFail : true
							})
							.fail(function(error) {
								dfrd.reject(error);
							})
							.done(function(data) {
								data.changed && data.changed.length && fm.change(data);
								dfrd.resolve(data);
								setTimeout(function(){
									ta.focus();
									ta.editor && ta.editor.focus(ta[0], ta.editor.instance);
								}, 50);
							});
						});
				}
			})
			.fail(function(error) {
				dfrd.reject(error);
			});

			return dfrd.promise();
		};
	
	
	
	this.shortcuts = [{
		pattern     : 'ctrl+e'
	}];
	
	this.init = function() {
		this.onlyMimes = this.options.mimes || [];
	};
	
	this.getstate = function(sel) {
		var sel = this.files(sel),
			cnt = sel.length;

		return !this._disabled && cnt && filter(sel).length == cnt ? 0 : -1;
	};
	
	this.exec = function(hashes) {
		var files = filter(this.files(hashes)),
			list  = [],
			file;

		if (this.disabled()) {
			return $.Deferred().reject();
		}

		while ((file = files.shift())) {
			list.push(edit(file));
		}
		
		return list.length 
			? $.when.apply(null, list)
			: $.Deferred().reject();
	};

};


/*
 * File: /js/commands/extract.js
 */

/**
 * @class  elFinder command "extract"
 * Extract files from archive
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.extract = function() {
	var self    = this,
		fm      = self.fm,
		mimes   = [],
		filter  = function(files) {
			return $.map(files, function(file) { 
				return file.read && $.inArray(file.mime, mimes) !== -1 ? file : null
				
			})
		};
	
	this.variants = [];
	this.disableOnSearch = true;
	
	// Update mimes list on open/reload
	fm.bind('open reload', function() {
		mimes = fm.option('archivers')['extract'] || [];
		if (fm.api > 2) {
			self.variants = [['makedir', fm.i18n('cmdmkdir')], ['intohere', fm.i18n('btnCwd')]];
		} else {
			self.variants = [['intohere', fm.i18n('btnCwd')]];
		}
		self.change();
	});
	
	this.getstate = function(sel) {
		var sel = this.files(sel),
			cnt = sel.length;
		
		return !this._disabled && cnt && this.fm.cwd().write && filter(sel).length == cnt ? 0 : -1;
	}
	
	this.exec = function(hashes, extractTo) {
		var files    = this.files(hashes),
			dfrd     = $.Deferred(),
			cnt      = files.length,
			makedir  = (extractTo == 'makedir')? 1 : 0,
			i, error,
			decision;

		var overwriteAll = false;
		var omitAll = false;
		var mkdirAll = 0;

		var names = $.map(fm.files(hashes), function(file) { return file.name; });
		var map = {};
		$.map(fm.files(hashes), function(file) { map[file.name] = file; });
		
		var decide = function(decision) {
			switch (decision) {
				case 'overwrite_all' :
					overwriteAll = true;
					break;
				case 'omit_all':
					omitAll = true;
					break;
			}
		};

		var unpack = function(file) {
			if (!(file.read && fm.file(file.phash).write)) {
				error = ['errExtract', file.name, 'errPerm'];
				fm.error(error);
				dfrd.reject(error);
			} else if ($.inArray(file.mime, mimes) === -1) {
				error = ['errExtract', file.name, 'errNoArchive'];
				fm.error(error);
				dfrd.reject(error);
			} else {
				fm.request({
					data:{cmd:'extract', target:file.hash, makedir:makedir},
					notify:{type:'extract', cnt:1},
					syncOnFail:true
				})
				.fail(function (error) {
					if (dfrd.state() != 'rejected') {
						dfrd.reject(error);
					}
				})
				.done(function () {
				});
			}
		};
		
		var confirm = function(files, index) {
			var file = files[index],
			name = file.name.replace(/\.((tar\.(gz|bz|bz2|z|lzo))|cpio\.gz|ps\.gz|xcf\.(gz|bz2)|[a-z0-9]{1,4})$/ig, ''),
			existed = ($.inArray(name, names) >= 0),
			next = function(){
				if((index+1) < cnt) {
					confirm(files, index+1);
				} else {
					dfrd.resolve();
				}
			};
			if (!makedir && existed && map[name].mime != 'directory') {
				fm.confirm(
					{
						title : fm.i18n('ntfextract'),
						text  : ['errExists', name, 'confirmRepl'],
						accept:{
							label : 'btnYes',
							callback:function (all) {
								decision = all ? 'overwrite_all' : 'overwrite';
								decide(decision);
								if(!overwriteAll && !omitAll) {
									if('overwrite' == decision) {
										unpack(file);
									}
									if((index+1) < cnt) {
										confirm(files, index+1);
									} else {
										dfrd.resolve();
									}
								} else if(overwriteAll) {
									for (i = index; i < cnt; i++) {
										unpack(files[i]);
									}
									dfrd.resolve();
								}
							}
						},
						reject : {
							label : 'btnNo',
							callback:function (all) {
								decision = all ? 'omit_all' : 'omit';
								decide(decision);
								if(!overwriteAll && !omitAll && (index+1) < cnt) {
									confirm(files, index+1);
								} else if (omitAll) {
									dfrd.resolve();
								}
							}
						},
						cancel : {
							label : 'btnCancel',
							callback:function () {
								dfrd.resolve();
							}
						},
						all : ((index+1) < cnt)
					}
				);
			} else if (!makedir) {
				if (mkdirAll == 0) {
					fm.confirm({
						title : fm.i18n('cmdextract'),
						text  : [fm.i18n('cmdextract')+' "'+file.name+'"', 'confirmRepl'],
						accept:{
							label : 'btnYes',
							callback:function (all) {
								all && (mkdirAll = 1);
								unpack(file);
								next();
							}
						},
						reject : {
							label : 'btnNo',
							callback:function (all) {
								all && (mkdirAll = -1);
								next();
							}
						},
						cancel : {
							label : 'btnCancel',
							callback:function () {
								dfrd.resolve();
							}
						},
						all : ((index+1) < cnt)
					});
				} else {
					(mkdirAll > 0) && unpack(file);
					next();
				}
			} else {
				unpack(file);
				next();
			}
		};
		
		if (!(this.enabled() && cnt && mimes.length)) {
			return dfrd.reject();
		}
		
		if(cnt > 0) {
			confirm(files, 0);
		}

		return dfrd;
	}

};


/*
 * File: /js/commands/forward.js
 */

/**
 * @class  elFinder command "forward"
 * Open next visited folder
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.forward = function() {
	this.alwaysEnabled = true;
	this.updateOnSelect = true;
	this.shortcuts = [{
		pattern     : 'ctrl+right'
	}];
	
	this.getstate = function() {
		return this.fm.history.canForward() ? 0 : -1;
	}
	
	this.exec = function() {
		return this.fm.history.forward();
	}
	
};


/*
 * File: /js/commands/getfile.js
 */

/**
 * @class elFinder command "getfile". 
 * Return selected files info into outer callback.
 * For use elFinder with wysiwyg editors etc.
 *
 * @author Dmitry (dio) Levashov, dio@std42.ru
 **/
elFinder.prototype.commands.getfile = function() {
	var self   = this,
		fm     = this.fm,
		filter = function(files) {
			var o = self.options;

			files = $.map(files, function(file) {
				return file.mime != 'directory' || o.folders ? file : null;
			});

			return o.multiple || files.length == 1 ? files : [];
		};
	
	this.alwaysEnabled = true;
	this.callback      = fm.options.getFileCallback;
	this._disabled     = typeof(this.callback) == 'function';
	
	this.getstate = function(sel) {
		var sel = this.files(sel),
			cnt = sel.length;
			
		return this.callback && cnt && filter(sel).length == cnt ? 0 : -1;
	}
	
	this.exec = function(hashes) {
		var fm    = this.fm,
			opts  = this.options,
			files = this.files(hashes),
			cnt   = files.length,
			url   = fm.option('url'),
			tmb   = fm.option('tmbUrl'),
			dfrd  = $.Deferred()
				.done(function(data) {
					fm.trigger('getfile', {files : data});
					self.callback(data, fm);
					
					if (opts.oncomplete == 'close') {
						fm.hide();
					} else if (opts.oncomplete == 'destroy') {
						fm.destroy();
					}
				}),
			result = function(file) {
				return opts.onlyURL
					? opts.multiple ? $.map(files, function(f) { return f.url; }) : files[0].url
					: opts.multiple ? files : files[0];
			},
			req = [], 
			i, file, dim;

		if (this.getstate(hashes) == -1) {
			return dfrd.reject();
		}
			
		for (i = 0; i < cnt; i++) {
			file = files[i];
			if (file.mime == 'directory' && !opts.folders) {
				return dfrd.reject();
			}
			file.baseUrl = url;
			if (file.url == '1') {
				req.push(fm.request({
					data : {cmd : 'url', target : file.hash},
					notify : {type : 'url', cnt : 1, hideCnt : true},
					preventDefault : true
				})
				.done(function(data) {
					if (data.url) {
						var rfile = fm.file(this.hash);
						rfile.url = this.url = data.url;
					}
				}.bind(file)));
			} else {
				file.url = fm.url(file.hash);
			}
			file.path    = fm.path(file.hash);
			if (file.tmb && file.tmb != 1) {
				file.tmb = tmb + file.tmb;
			}
			if (!file.width && !file.height) {
				if (file.dim) {
					dim = file.dim.split('x');
					file.width = dim[0];
					file.height = dim[1];
				} else if (opts.getImgSize && file.mime.indexOf('image') !== -1) {
					req.push(fm.request({
						data : {cmd : 'dim', target : file.hash},
						notify : {type : 'dim', cnt : 1, hideCnt : true},
						preventDefault : true
					})
					.done(function(data) {
						if (data.dim) {
							var dim = data.dim.split('x');
							var rfile = fm.file(this.hash);
							rfile.width = this.width = dim[0];
							rfile.height = this.height = dim[1];
						}
					}.bind(file)));
				}
			}
		}
		
		if (req.length) {
			$.when.apply(null, req).always(function() {
				dfrd.resolve(result(files));
			})
			return dfrd;
		}
		
		return dfrd.resolve(result(files));
	}

};


/*
 * File: /js/commands/help.js
 */

/**
 * @class  elFinder command "help"
 * "About" dialog
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.help = function() {
	var fm   = this.fm,
		self = this,
		linktpl = '<div class="elfinder-help-link"> <a href="{url}">{link}</a></div>',
		linktpltgt = '<div class="elfinder-help-link"> <a href="{url}" target="_blank">{link}</a></div>',
		atpl    = '<div class="elfinder-help-team"><div>{author}</div>{work}</div>',
		url     = /\{url\}/,
		link    = /\{link\}/,
		author  = /\{author\}/,
		work    = /\{work\}/,
		r       = 'replace',
		prim    = 'ui-priority-primary',
		sec     = 'ui-priority-secondary',
		lic     = 'elfinder-help-license',
		tab     = '<li class="ui-state-default ui-corner-top elfinder-help-tab-{id}"><a href="#'+fm.namespace+'-help-{id}">{title}</a></li>',
		html    = ['<div class="ui-tabs ui-widget ui-widget-content ui-corner-all elfinder-help">', 
				'<ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">'],
		stpl    = '<div class="elfinder-help-shortcut"><div class="elfinder-help-shortcut-pattern">{pattern}</div> {descrip}</div>',
		sep     = '<div class="elfinder-help-separator"/>',
		
		
		about = function() {
			html.push('<div id="'+fm.namespace+'-help-about" class="ui-tabs-panel ui-widget-content ui-corner-bottom"><div class="elfinder-help-logo"/>');
			html.push('<h3>elFinder</h3>');
			html.push('<div class="'+prim+'">'+fm.i18n('webfm')+'</div>');
			html.push('<div class="'+sec+'">'+fm.i18n('ver')+': '+fm.version+', '+fm.i18n('protocolver')+': <span id="apiver"></span></div>');
			html.push('<div class="'+sec+'">jQuery/jQuery UI: '+$().jquery+'/'+$.ui.version+'</div>');

			html.push(sep);
			
			html.push(linktpltgt[r](url, 'http://elfinder.org/')[r](link, fm.i18n('homepage')));
			html.push(linktpltgt[r](url, 'https://github.com/Studio-42/elFinder/wiki')[r](link, fm.i18n('docs')));
			html.push(linktpltgt[r](url, 'https://github.com/Studio-42/elFinder')[r](link, fm.i18n('github')));
			html.push(linktpltgt[r](url, 'http://twitter.com/elrte_elfinder')[r](link, fm.i18n('twitter')));
			
			html.push(sep);
			
			html.push('<div class="'+prim+'">'+fm.i18n('team')+'</div>');
			
			html.push(atpl[r](author, 'Dmitry "dio" Levashov &lt;dio@std42.ru&gt;')[r](work, fm.i18n('chiefdev')));
			html.push(atpl[r](author, 'Troex Nevelin &lt;troex@fury.scancode.ru&gt;')[r](work, fm.i18n('maintainer')));
			html.push(atpl[r](author, 'Alexey Sukhotin &lt;strogg@yandex.ru&gt;')[r](work, fm.i18n('contributor')));
			html.push(atpl[r](author, 'Naoki Sawada &lt;hypweb@gmail.com&gt;')[r](work, fm.i18n('contributor')));
			
			fm.i18[fm.lang].translator && html.push(atpl[r](author, fm.i18[fm.lang].translator)[r](work, fm.i18n('translator')+' ('+fm.i18[fm.lang].language+')'));
			
			html.push(sep);
			html.push('<div class="'+lic+'">'+fm.i18n('icons')+': Pixelmixer, <a href="http://p.yusukekamiyamane.com" target="_blank">Fugue</a></div>');
			
			html.push(sep);
			html.push('<div class="'+lic+'">Licence: BSD Licence</div>');
			html.push('<div class="'+lic+'">Copyright © 2009-2016, Studio 42</div>');
			html.push('<div class="'+lic+'">„ …'+fm.i18n('dontforget')+' ”</div>');
			html.push('</div>');
		},
		shortcuts = function() {
			var sh = fm.shortcuts();
			// shortcuts tab
			html.push('<div id="'+fm.namespace+'-help-shortcuts" class="ui-tabs-panel ui-widget-content ui-corner-bottom">');
			
			if (sh.length) {
				html.push('<div class="ui-widget-content elfinder-help-shortcuts">');
				$.each(sh, function(i, s) {
					html.push(stpl.replace(/\{pattern\}/, s[0]).replace(/\{descrip\}/, s[1]));
				});
			
				html.push('</div>');
			} else {
				html.push('<div class="elfinder-help-disabled">'+fm.i18n('shortcutsof')+'</div>');
			}
			
			
			html.push('</div>');
			
		},
		help = function() {
			// help tab
			html.push('<div id="'+fm.namespace+'-help-help" class="ui-tabs-panel ui-widget-content ui-corner-bottom">');
			html.push('<a href="https://github.com/Studio-42/elFinder/wiki" target="_blank" class="elfinder-dont-panic"><span>DON\'T PANIC</span></a>');
			html.push('</div>');
			// end help
		},
		debug = function() {
			// debug tab
			html.push('<div id="'+fm.namespace+'-help-debug" class="ui-tabs-panel ui-widget-content ui-corner-bottom">');
			html.push('<div class="ui-widget-content elfinder-help-debug"></div>');
			html.push('</div>');
			// end debug
		},
		debugRender = function() {
			var render = function(elm, obj) {
				$.each(obj, function(k, v) {
					elm.append($('<dt/>').text(k));
					if (typeof v === 'object' && ($.isPlainObject(v) || v.length)) {
						elm.append( $('<dd/>').append(render($('<dl/>'), v)));
					} else {
						elm.append($('<dd/>').append($('<span/>').text((typeof v === 'object')? '[]' : (v? v : '""'))));
					}
				});
				return elm;
			},
			target = content.find('#'+fm.namespace+'-help-debug').find('div:first').empty(),
			info;
			
			if (self.debug.options) {
				info = $('<fieldset>').append($('<legend/>').text('options'), render($('<dl/>'), self.debug.options));
				target.append(info);
			}
			if (self.debug.debug) {
				info = $('<fieldset>').append($('<legend/>').text('debug'), render($('<dl/>'), self.debug.debug));
				target.append(info);
			}
		},
		content = '';
	
	this.alwaysEnabled  = true;
	this.updateOnSelect = false;
	this.state = 0;
	
	this.shortcuts = [{
		pattern     : 'f1',
		description : this.title
	}];
	
	fm.one('load', function() {
		var parts = self.options.view || ['about', 'shortcuts', 'help', 'debug'];
		
		$.each(parts, function(i, title) {
			html.push(tab[r](/\{id\}/g, title)[r](/\{title\}/, fm.i18n(title)));
		});
		
		html.push('</ul>');

		$.inArray('about', parts) !== -1 && about();
		$.inArray('shortcuts', parts) !== -1 && shortcuts();
		$.inArray('help', parts) !== -1 && help();
		$.inArray('debug', parts) !== -1 && debug();
		
		html.push('</div>');
		content = $(html.join(''));
		
		content.find('.ui-tabs-nav li')
			.hover(function() {
				$(this).toggleClass('ui-state-hover');
			})
			.children()
			.click(function(e) {
				var link = $(this);
				
				e.preventDefault();
				e.stopPropagation();
				
				if (!link.hasClass('ui-tabs-selected')) {
					link.parent().addClass('ui-tabs-selected ui-state-active').siblings().removeClass('ui-tabs-selected').removeClass('ui-state-active');
					content.find('.ui-tabs-panel').hide().filter(link.attr('href')).show();
				}
				
			})
			.filter(':first').click();

		self.debug = {};

		fm.bind('open', function(e) {
			var tabDebug = content.find('.elfinder-help-tab-debug');
			if (e.data && e.data.debug) {
				tabDebug.show();
				self.debug = { options : e.data.options, debug : e.data.debug };
				if (self.dialog && self.dialog.is(':visible')) {
					debugRender();
				}
			} else {
				tabDebug.hide();
			}
		});
	});
	
	this.getstate = function() {
		return 0;
	};
	
	this.exec = function() {
		if (!this.dialog) {
			content.find('#apiver').text(this.fm.api);
			this.dialog = this.fm.dialog(content, {title : this.title, width : 530, autoOpen : false, destroyOnClose : false});
		}

		debugRender();

		this.dialog.elfinderdialog('open').find('.ui-tabs-nav li a:first').click();
	};

};


/*
 * File: /js/commands/home.js
 */


elFinder.prototype.commands.home = function() {
	this.title = 'Home';
	this.alwaysEnabled  = true;
	this.updateOnSelect = false;
	this.shortcuts = [{
		pattern     : 'ctrl+home ctrl+shift+up',
		description : 'Home'
	}];
	
	this.getstate = function() {
		var root = this.fm.root(),
			cwd  = this.fm.cwd().hash;
			
		return root && cwd && root != cwd ? 0: -1;
	}
	
	this.exec = function() {
		return this.fm.exec('open', this.fm.root());
	}
	

};


/*
 * File: /js/commands/info.js
 */

/**
 * @class elFinder command "info". 
 * Display dialog with file properties.
 *
 * @author Dmitry (dio) Levashov, dio@std42.ru
 **/
elFinder.prototype.commands.info = function() {
	var m   = 'msg',
		fm  = this.fm,
		spclass = 'elfinder-info-spinner',
		btnclass = 'elfinder-info-button',
		msg = {
			calc     : fm.i18n('calc'),
			size     : fm.i18n('size'),
			unknown  : fm.i18n('unknown'),
			path     : fm.i18n('path'),
			aliasfor : fm.i18n('aliasfor'),
			modify   : fm.i18n('modify'),
			perms    : fm.i18n('perms'),
			locked   : fm.i18n('locked'),
			dim      : fm.i18n('dim'),
			kind     : fm.i18n('kind'),
			files    : fm.i18n('files'),
			folders  : fm.i18n('folders'),
			items    : fm.i18n('items'),
			yes      : fm.i18n('yes'),
			no       : fm.i18n('no'),
			link     : fm.i18n('link'),
			owner    : fm.i18n('owner'),
			group    : fm.i18n('group'),
			perm     : fm.i18n('perm'),
			getlink  : fm.i18n('getLink')
		};
		
	this.tpl = {
		main       : '<div class="ui-helper-clearfix elfinder-info-title"><span class="elfinder-cwd-icon {class} ui-corner-all"/>{title}</div><table class="elfinder-info-tb">{content}</table>',
		itemTitle  : '<strong>{name}</strong><span class="elfinder-info-kind">{kind}</span>',
		groupTitle : '<strong>{items}: {num}</strong>',
		row        : '<tr><td>{label} : </td><td>{value}</td></tr>',
		spinner    : '<span>{text}</span> <span class="'+spclass+' '+spclass+'-{name}"/>'
	};
	
	this.alwaysEnabled = true;
	this.updateOnSelect = false;
	this.shortcuts = [{
		pattern     : 'ctrl+i'
	}];
	
	this.init = function() {
		$.each(msg, function(k, v) {
			msg[k] = fm.i18n(v);
		});
	};
	
	this.getstate = function() {
		return 0;
	};
	
	this.exec = function(hashes) {
		var files   = this.files(hashes);
		if (! files.length) {
			files   = this.files([ this.fm.cwd().hash ]);
		}
		var self    = this,
			fm      = this.fm,
			o       = this.options,
			tpl     = this.tpl,
			row     = tpl.row,
			cnt     = files.length,
			content = [],
			view    = tpl.main,
			l       = '{label}',
			v       = '{value}',
			reqs    = [],
			opts    = {
				title : this.title,
				width : 'auto',
				close : function() {
					$(this).elfinderdialog('destroy');
					$.each(reqs, function(i, req) {
						var xhr = (req && req.xhr)? req.xhr : null;
						if (xhr && xhr.state() == 'pending') {
							xhr.quiet = true;
							xhr.abort();
						}
					});
				}
			},
			count = [],
			replSpinner = function(msg, name) { dialog.find('.'+spclass+'-'+name).parent().html(msg); },
			id = fm.namespace+'-info-'+$.map(files, function(f) { return f.hash; }).join('-'),
			dialog = fm.getUI().find('#'+id),
			customActions = [],
			size, tmb, file, title, dcnt;
			
		if (!cnt) {
			return $.Deferred().reject();
		}
			
		if (dialog.length) {
			dialog.elfinderdialog('toTop');
			return $.Deferred().resolve();
		}
		
			
		if (cnt == 1) {
			file  = files[0];
			
			view  = view.replace('{class}', fm.mime2class(file.mime));
			title = tpl.itemTitle.replace('{name}', fm.escape(file.i18 || file.name)).replace('{kind}', '<span title="'+fm.escape(file.mime)+'">'+fm.mime2kind(file)+'</span>');

			tmb = fm.tmb(file);
			
			if (!file.read) {
				size = msg.unknown;
			} else if (file.mime != 'directory' || file.alias) {
				size = fm.formatSize(file.size);
			} else {
				size = tpl.spinner.replace('{text}', msg.calc).replace('{name}', 'size');
				count.push(file.hash);
			}
			
			content.push(row.replace(l, msg.size).replace(v, size));
			file.alias && content.push(row.replace(l, msg.aliasfor).replace(v, file.alias));
			content.push(row.replace(l, msg.path).replace(v, fm.escape(fm.path(file.hash, true))));
			if (file.read) {
				var href,
				name_esc = fm.escape(file.name);
				if (file.url == '1') {
					content.push(row.replace(l, msg.link).replace(v, '<button class="'+btnclass+' '+spclass+'-url">'+msg.getlink+'</button>'));
				} else {
					if (o.nullUrlDirLinkSelf && file.mime == 'directory' && file.url === null) {
						var loc = window.location;
						href = loc.pathname + loc.search + '#elf_' + file.hash;
					} else {
						href = fm.url(file.hash);
					}
					content.push(row.replace(l, msg.link).replace(v,  '<a href="'+href+'" target="_blank">'+name_esc+'</a>'));
				}
			}
			
			if (file.dim) { // old api
				content.push(row.replace(l, msg.dim).replace(v, file.dim));
			} else if (file.mime.indexOf('image') !== -1) {
				if (file.width && file.height) {
					content.push(row.replace(l, msg.dim).replace(v, file.width+'x'+file.height));
				} else {
					content.push(row.replace(l, msg.dim).replace(v, tpl.spinner.replace('{text}', msg.calc).replace('{name}', 'dim')));
					reqs.push(fm.request({
						data : {cmd : 'dim', target : file.hash},
						preventDefault : true
					})
					.fail(function() {
						replSpinner(msg.unknown, 'dim');
					})
					.done(function(data) {
						replSpinner(data.dim || msg.unknown, 'dim');
						if (data.dim) {
							var dim = data.dim.split('x');
							var rfile = fm.file(file.hash);
							rfile.width = dim[0];
							rfile.height = dim[1];
						}
					}));
				}
			}
			
			
			content.push(row.replace(l, msg.modify).replace(v, fm.formatDate(file)));
			content.push(row.replace(l, msg.perms).replace(v, fm.formatPermissions(file)));
			content.push(row.replace(l, msg.locked).replace(v, file.locked ? msg.yes : msg.no));
			file.owner && content.push(row.replace(l, msg.owner).replace(v, file.owner));
			file.group && content.push(row.replace(l, msg.group).replace(v, file.group));
			file.perm && content.push(row.replace(l, msg.perm).replace(v, fm.formatFileMode(file.perm)));
			
			// Add custom info fields
			if (o.custom) {
				$.each(o.custom, function(name, details) {
					if (
					  (!details.mimes || $.map(details.mimes, function(m){return (file.mime === m || file.mime.indexOf(m+'/') === 0)? true : null;}).length)
					    &&
					  (!details.hashRegex || file.hash.match(details.hashRegex))
					) {
						// Add to the content
						content.push(row.replace(l, fm.i18n(details.label)).replace(v , details.tpl.replace('{id}', id)));
						// Register the action
						if (details.action && (typeof details.action == 'function')) {
							customActions.push(details.action);
						}
					}
				});
			}
		} else {
			view  = view.replace('{class}', 'elfinder-cwd-icon-group');
			title = tpl.groupTitle.replace('{items}', msg.items).replace('{num}', cnt);
			dcnt  = $.map(files, function(f) { return f.mime == 'directory' ? 1 : null ; }).length;
			if (!dcnt) {
				size = 0;
				$.each(files, function(h, f) { 
					var s = parseInt(f.size);
					
					if (s >= 0 && size >= 0) {
						size += s;
					} else {
						size = 'unknown';
					}
				});
				content.push(row.replace(l, msg.kind).replace(v, msg.files));
				content.push(row.replace(l, msg.size).replace(v, fm.formatSize(size)));
			} else {
				content.push(row.replace(l, msg.kind).replace(v, dcnt == cnt ? msg.folders : msg.folders+' '+dcnt+', '+msg.files+' '+(cnt-dcnt)));
				content.push(row.replace(l, msg.size).replace(v, tpl.spinner.replace('{text}', msg.calc).replace('{name}', 'size')));
				count = $.map(files, function(f) { return f.hash; });
				
			}
		}
		
		view = view.replace('{title}', title).replace('{content}', content.join(''));
		
		dialog = fm.dialog(view, opts);
		dialog.attr('id', id);

		if (file && file.url == '1') {
			dialog.on('click', '.'+spclass+'-url', function(){
				$(this).parent().html(tpl.spinner.replace('{text}', fm.i18n('ntfurl')).replace('{name}', 'url'));
				fm.request({
					data : {cmd : 'url', target : file.hash},
					preventDefault : true
				})
				.fail(function() {
					replSpinner(name_esc, 'url');
				})
				.done(function(data) {
					if (data.url) {
						replSpinner('<a href="'+data.url+'" target="_blank">'+name_esc+'</a>' || name_esc, 'url');
						var rfile = fm.file(file.hash);
						rfile.url = data.url;
					} else {
						replSpinner(name_esc, 'url');
					}
				});
			});
		}

		// load thumbnail
		if (tmb) {
			$('<img/>')
				.load(function() { dialog.find('.elfinder-cwd-icon').addClass(tmb.className).css('background-image', "url('"+tmb.url+"')"); })
				.attr('src', tmb.url);
		}
		
		// send request to count total size
		if (count.length) {
			reqs.push(fm.request({
					data : {cmd : 'size', targets : count},
					preventDefault : true
				})
				.fail(function() {
					replSpinner(msg.unknown, 'size');
				})
				.done(function(data) {
					var size = parseInt(data.size);
					replSpinner(size >= 0 ? fm.formatSize(size) : msg.unknown, 'size');
				})
			);
		}
		
		// call custom actions
		if (customActions.length) {
			$.each(customActions, function(i, action) {
				try {
					action(file, fm, dialog);
				} catch(e) {
					fm.debug('error', e);
				}
			});
		}

	};
	
};


/*
 * File: /js/commands/mkdir.js
 */

/**
 * @class  elFinder command "mkdir"
 * Create new folder
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.mkdir = function() {
	var fm   = this.fm,
		self = this;
	
	this.value           = '';
	this.disableOnSearch = true;
	this.updateOnSelect  = false;
	this.mime            = 'directory';
	this.prefix          = 'untitled folder';
	this.exec            = function(contextSel) {
		if (! contextSel && ! this.options.intoNewFolderToolbtn) {
			fm.getUI('cwd').trigger('unselectall');
		}
		this.move = fm.selected().length? true : false;
		return $.proxy(fm.res('mixin', 'make'), self)();
	}
	
	this.shortcuts = [{
		pattern     : 'ctrl+shift+n'
	}];

	this.init = function() {
		if (this.options.intoNewFolderToolbtn) {
			this.options.ui = 'mkdirbutton';
		}
	}
	
	fm.bind('select', function(e) {
		var sel = (e.data && e.data.selected)? e.data.selected : [];
		self.title = sel.length? fm.i18n('cmdmkdirin') : fm.i18n('cmdmkdir');
		self.update(void(0), self.title);
	});
	
	this.getstate = function(sel) {
		var cwd = fm.cwd(),
			sel = (sel && sel[0] != cwd.hash)? this.files(sel) : [],
			cnt = sel.length;

		return !this._disabled && cwd.write && (!cnt || $.map(sel, function(f) { return f.phash && f.read && !f.locked ? f : null  }).length == cnt)? 0 : -1;
	}

};


/*
 * File: /js/commands/mkfile.js
 */

/**
 * @class  elFinder command "mkfile"
 * Create new empty file
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.mkfile = function() {
	this.disableOnSearch = true;
	this.updateOnSelect  = false;
	this.mime            = 'text/plain';
	this.prefix          = 'untitled file.txt';
	this.exec            = $.proxy(this.fm.res('mixin', 'make'), this);
	
	this.getstate = function() {
		return !this._disabled && this.fm.cwd().write ? 0 : -1;
	}

};


/*
 * File: /js/commands/netmount.js
 */

/**
 * @class  elFinder command "netmount"
 * Mount network volume with user credentials.
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.netmount = function() {
	var self = this;

	this.alwaysEnabled  = true;
	this.updateOnSelect = false;

	this.drivers = [];
	
	this.handlers = {
		load : function() {
			this.drivers = this.fm.netDrivers;
		}
	}

	this.getstate = function() {
		return this.drivers.length ? 0 : -1;
	}
	
	this.exec = function() {
		var fm = self.fm,
			dfrd = $.Deferred(),
			o = self.options,
			create = function() {
				var inputs = {
						protocol : $('<select/>').change(function(e, data){
							var protocol = this.value;
							content.find('.elfinder-netmount-tr').hide();
							content.find('.elfinder-netmount-tr-'+protocol).show();
							if (typeof o[protocol].select == 'function') {
								o[protocol].select(fm, e, data);
							}
						}).addClass('ui-corner-all')
					},
					opts = {
						title          : fm.i18n('netMountDialogTitle'),
						resizable      : false,
						modal          : true,
						destroyOnClose : true,
						close          : function() { 
							//delete self.dialog; 
							dfrd.state() == 'pending' && dfrd.reject();
						},
						buttons        : {}
					},
					content = $('<table class="elfinder-info-tb elfinder-netmount-tb"/>'),
					hidden  = $('<div/>'),
					dialog;

				content.append($('<tr/>').append($('<td>'+fm.i18n('protocol')+'</td>')).append($('<td/>').append(inputs.protocol)));

				$.each(self.drivers, function(i, protocol) {
					inputs.protocol.append('<option value="'+protocol+'">'+fm.i18n(o[protocol].name || protocol)+'</option>');
					$.each(o[protocol].inputs, function(name, input) {
						input.attr('name', name);
						if (input.attr('type') != 'hidden') {
							input.addClass('ui-corner-all elfinder-netmount-inputs-'+protocol);
							content.append($('<tr/>').addClass('elfinder-netmount-tr elfinder-netmount-tr-'+protocol).append($('<td>'+fm.i18n(name)+'</td>')).append($('<td/>').append(input)));
						} else {
							input.addClass('elfinder-netmount-inputs-'+protocol);
							hidden.append(input);
						}
					});
					o[protocol].protocol = inputs.protocol;
				});
				
				content.append(hidden);
				
				content.find('.elfinder-netmount-tr').hide();

				opts.buttons[fm.i18n('btnMount')] = function() {
					var protocol = inputs.protocol.val(),
						data = {cmd : 'netmount', protocol: protocol},
						cur = o[protocol];
					$.each(content.find('input.elfinder-netmount-inputs-'+protocol), function(name, input) {
						var val;
						if (typeof input.val == 'function') {
							val = $.trim(input.val());
						} else {
							val = $.trim(input.value);
						}
						if (val) {
							data[input.name] = val;
						}
					});

					if (!data.host) {
						return fm.trigger('error', {error : 'errNetMountHostReq'});
					}

					fm.request({data : data, notify : {type : 'netmount', cnt : 1, hideCnt : true}})
						.done(function(data) {
							data.added && data.added.length && fm.exec('open', data.added[0].hash);
							dfrd.resolve();
						})
						.fail(function(error) {
							//self.dialog.elfinderdialog('open');
							if (cur.fail && typeof cur.fail == 'function') {
								cur.fail(fm, error);
							}
							dfrd.reject(error);
						});

					self.dialog.elfinderdialog('close');
				};

				opts.buttons[fm.i18n('btnCancel')] = function() {
					self.dialog.elfinderdialog('close');
				};
				
				dialog = fm.dialog(content, opts);
				dialog.ready(function(){
					inputs.protocol.change();
					dialog.elfinderdialog('posInit');
				});
				return dialog;
			}
			;
		
		if (!self.dialog) {
			self.dialog = create();
		} else {
			self.dialog.elfinderdialog('open');
		}

		return dfrd.promise();
	}

	self.fm.bind('netmount', function(e) {
		var d = e.data || null,
			o = self.options;
		if (d && d.protocol) {
			if (o[d.protocol] && typeof o[d.protocol].done == 'function') {
				o[d.protocol].done(self.fm, d);
			}
		}
	});

}

elFinder.prototype.commands.netunmount = function() {
	var self = this;

	this.alwaysEnabled  = true;
	this.updateOnSelect = false;

	this.drivers = [];
	
	this.handlers = {
		load : function() {
			this.drivers = this.fm.netDrivers;
		}
	};

	this.getstate = function(sel) {
		var fm = this.fm;
		return !!sel && this.drivers.length && !this._disabled && fm.file(sel[0]).netkey ? 0 : -1;
	};
	
	this.exec = function(hashes) {
		var self   = this,
			fm     = this.fm,
			dfrd   = $.Deferred()
				.fail(function(error) {
					error && fm.error(error);
				}),
			drive  = fm.file(hashes[0]);

		if (this._disabled) {
			return dfrd.reject();
		}

		if (dfrd.state() == 'pending') {
			fm.confirm({
				title  : self.title,
				text   : fm.i18n('confirmUnmount', drive.name),
				accept : {
					label    : 'btnUnmount',
					callback : function() {  
						var chDrive = (fm.root() == drive.hash),
							base = $('#'+fm.navHash2Id(drive.hash)).parent(),
							navTo = (base.next().length? base.next() : base.prev()).find('.elfinder-navbar-root');
						fm.request({
							data   : {cmd  : 'netmount', protocol : 'netunmount', host: drive.netkey, user : drive.hash, pass : 'dum'}, 
							notify : {type : 'netunmount', cnt : 1, hideCnt : true},
							preventFail : true
						})
						.fail(function(error) {
							dfrd.reject(error);
						})
						.done(function(data) {
							var open = fm.root();
							if (chDrive) {
								if (navTo.length) {
									open = fm.navId2Hash(navTo[0].id);
								} else {
									var files = fm.files();
									for (var i in files) {
										if (fm.file(i).mime == 'directory') {
											open = i;
											break;
										}
									}
								}
								fm.exec('open', open);
							}
							dfrd.resolve();
						});
					}
				},
				cancel : {
					label    : 'btnCancel',
					callback : function() { dfrd.reject(); }
				}
			});
		}
			
		return dfrd;
	};

};


/*
 * File: /js/commands/open.js
 */

/**
 * @class  elFinder command "open"
 * Enter folder or open files in new windows
 *
 * @author Dmitry (dio) Levashov
 **/  
elFinder.prototype.commands.open = function() {
	this.alwaysEnabled = true;
	
	this._handlers = {
		dblclick : function(e) { e.preventDefault(); this.exec() },
		'select enable disable reload' : function(e) { this.update(e.type == 'disable' ? -1 : void(0));  }
	}
	
	this.shortcuts = [{
		pattern     : 'ctrl+down numpad_enter'+(this.fm.OS != 'mac' && ' enter')
	}];

	this.getstate = function(sel) {
		var sel = this.files(sel),
			cnt = sel.length;
		
		return cnt == 1 
			? 0 
			: (cnt && !this.fm.UA.Mobile) ? ($.map(sel, function(file) { return file.mime == 'directory' ? null : file}).length == cnt ? 0 : -1) : -1
	}
	
	this.exec = function(hashes, opts) {
		var fm    = this.fm, 
			dfrd  = $.Deferred().fail(function(error) { error && fm.error(error); }),
			files = this.files(hashes),
			cnt   = files.length,
			thash = (typeof opts == 'object')? opts.thash : false,
			file, url, s, w, imgW, imgH, winW, winH, reg, link, html5dl, inline;

		if (!cnt && !thash) {
			{
				return dfrd.reject();
			}
		}

		// open folder
		if (thash || (cnt == 1 && (file = files[0]) && file.mime == 'directory')) {
			return !thash && file && !file.read
				? dfrd.reject(['errOpen', file.name, 'errPerm'])
				: fm.request({
						data   : {cmd  : 'open', target : thash || file.hash},
						notify : {type : 'open', cnt : 1, hideCnt : true},
						syncOnFail : true
					});
		}
		
		files = $.map(files, function(file) { return file.mime != 'directory' ? file : null });
		
		// nothing to open or files and folders selected - do nothing
		if (cnt != files.length) {
			return dfrd.reject();
		}
		
		var doOpen = function() {
			try {
				reg = new RegExp(fm.option('dispInlineRegex'));
			} catch(e) {
				reg = false;
			}
	
			// open files
			link     = $('<a>').hide().appendTo($('body')),
			html5dl  = (typeof link.get(0).download === 'string');
			cnt = files.length;
			while (cnt--) {
				file = files[cnt];
				
				if (!file.read) {
					return dfrd.reject(['errOpen', file.name, 'errPerm']);
				}
				
				inline = (reg && file.mime.match(reg));
				url = fm.openUrl(file.hash, !inline);
				if (fm.UA.Mobile || !inline) {
					if (html5dl) {
						!inline && link.attr('download', file.name);
						link.attr('href', url)
						.attr('target', '_blank')
						.get(0).click();
					} else {
						var wnd = window.open(url);
						if (!wnd) {
							return dfrd.reject('errPopup');
						}
					}
				} else {
					
					// set window size for image if set
					imgW = winW = Math.round(2 * $(window).width() / 3);
					imgH = winH = Math.round(2 * $(window).height() / 3);
					if (parseInt(file.width) && parseInt(file.height)) {
						imgW = parseInt(file.width);
						imgH = parseInt(file.height);
					} else if (file.dim) {
						s = file.dim.split('x');
						imgW = parseInt(s[0]);
						imgH = parseInt(s[1]);
					}
					if (winW >= imgW && winH >= imgH) {
						winW = imgW;
						winH = imgH;
					} else {
						if ((imgW - winW) > (imgH - winH)) {
							winH = Math.round(imgH * (winW / imgW));
						} else {
							winW = Math.round(imgW * (winH / imgH));
						}
					}
					w = 'width='+winW+',height='+winH;
		
					if (url.indexOf(fm.options.url) === 0) {
						url = '';
					}
					var wnd = window.open(url, 'new_window', w + ',top=50,left=50,scrollbars=yes,resizable=yes');
					if (!wnd) {
						return dfrd.reject('errPopup');
					}
					
					if (url === '') {
						var form = document.createElement("form");
						form.action = fm.options.url;
						form.method = 'POST';
						form.target = 'new_window';
						form.style.display = 'none';
						var params = $.extend({}, fm.options.customData, {
							cmd: 'file',
							target: file.hash
						});
						$.each(params, function(key, val)
						{
							var input = document.createElement("input");
							input.name = key;
							input.value = val;
							form.appendChild(input);
						});
						
						document.body.appendChild(form);
						form.submit();
					}
					wnd.focus();
					
				}
			}
			link.remove();
			return dfrd.resolve(hashes);
		}
		
		if (cnt > 1) {
			fm.confirm({
				title: 'openMulti',
				text : ['openMultiConfirm', cnt + ''],
				accept : {
					label : 'cmdopen',
					callback : function() { doOpen(); }
				},
				cancel : {
					label : 'btnCancel',
					callback : function() { 
						dfrd.reject();
					}
				},
				buttons : (fm.command('zipdl') && fm.isCommandEnabled('zipdl', fm.cwd().hash))? [
					{
						label : 'cmddownload',
						callback : function() {
							fm.exec('download', hashes);
							dfrd.reject();
						}
					}
				] : []
			});
		} else {
			doOpen();
		}
		
		return dfrd;
	}

};


/*
 * File: /js/commands/opendir.js
 */

/**
 * @class  elFinder command "opendir"
 * Enter parent folder
 *
 * @author Naoki Sawada
 **/  
elFinder.prototype.commands.opendir = function() {
	this.alwaysEnabled = true;
	
	this.getstate = function() {
		var sel = this.fm.selected(),
			cnt = sel.length,
			cwdWrapper;
		if (cnt !== 1) {
			return -1;
		}
		cwdWrapper = this.fm.getUI('cwd').parent();
		return cwdWrapper.hasClass('elfinder-search-result')? 0 : -1;
	}
	
	this.exec = function(hashes) {
		var fm    = this.fm,
			dfrd  = $.Deferred(),
			files = this.files(hashes),
			cnt   = files.length,
			hash, pcheck = null;

		if (!cnt || !files[0].phash) {
			return dfrd.reject();
		}

		hash = files[0].phash;
		if (!fm.file(hash)) {
			// parents check
			pcheck = fm.request({
				data   : {cmd  : 'parents', target : hash},
				syncOnFail : false
			});
		}
		// open folder
		$.when(pcheck)
		.done(function(data){
			fm.trigger('searchend', { noupdate: true });
			fm.request({
				data   : {cmd  : 'open', target : hash},
				notify : {type : 'open', cnt : 1, hideCnt : true},
				syncOnFail : false
			});
		});
		
		return dfrd;
	}

};


/*
 * File: /js/commands/paste.js
 */

/**
 * @class  elFinder command "paste"
 * Paste filesfrom clipboard into directory.
 * If files pasted in its parent directory - files duplicates will created
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.paste = function() {
	
	this.updateOnSelect  = false;
	
	this.handlers = {
		changeclipboard : function() { this.update(); }
	}

	this.shortcuts = [{
		pattern     : 'ctrl+v shift+insert'
	}];
	
	this.getstate = function(dst) {
		if (this._disabled) {
			return -1;
		}
		if (dst) {
			if ($.isArray(dst)) {
				if (dst.length != 1) {
					return -1;
				}
				dst = this.fm.file(dst[0]);
			}
		} else {
			dst = this.fm.cwd();
		}

		return this.fm.clipboard().length && dst.mime == 'directory' && dst.write ? 0 : -1;
	}
	
	this.exec = function(dst) {
		var self   = this,
			fm     = self.fm,
			dst    = dst ? this.files(dst)[0] : fm.cwd(),
			files  = fm.clipboard(),
			cnt    = files.length,
			cut    = cnt ? files[0].cut : false,
			error  = cut ? 'errMove' : 'errCopy',
			fpaste = [],
			fcopy  = [],
			dfrd   = $.Deferred()
				.fail(function(error) {
					error && fm.error(error);
				})
				.always(function() {
					fm.unlockfiles({files : $.map(files, function(f) { return f.hash})});
				}),
			copy  = function(files) {
				return files.length && fm._commands.duplicate
					? fm.exec('duplicate', files)
					: $.Deferred().resolve();
			},
			paste = function(files) {
				var dfrd      = $.Deferred(),
					existed   = [],
					hashes  = {},
					intersect = function(files, names) {
						var ret = [], 
							i   = files.length;

						while (i--) {
							$.inArray(files[i].name, names) !== -1 && ret.unshift(i);
						}
						return ret;
					},
					confirm   = function(ndx) {
						var i    = existed[ndx],
							file = files[i],
							last = ndx == existed.length-1;

						if (!file) {
							return;
						}

						fm.confirm({
							title  : fm.i18n(cut ? 'moveFiles' : 'copyFiles'),
							text   : ['errExists', file.name, 'confirmRepl'], 
							all    : !last,
							accept : {
								label    : 'btnYes',
								callback : function(all) {
									!last && !all
										? confirm(++ndx)
										: paste(files);
								}
							},
							reject : {
								label    : 'btnNo',
								callback : function(all) {
									var i;

									if (all) {
										i = existed.length;
										while (ndx < i--) {
											files[existed[i]].remove = true
										}
									} else {
										files[existed[ndx]].remove = true;
									}

									!last && !all
										? confirm(++ndx)
										: paste(files);
								}
							},
							cancel : {
								label    : 'btnCancel',
								callback : function() {
									dfrd.resolve();
								}
							},
							buttons : [
								{
									label : 'btnBackup',
									callback : function(all) {
										var i;
										if (all) {
											i = existed.length;
											while (ndx < i--) {
												files[existed[i]].rename = true
											}
										} else {
											files[existed[ndx]].rename = true;
										}
										!last && !all
											? confirm(++ndx)
											: paste(files);
									}
								}
							]
						})
					},
					valid     = function(names) {
						var exists = {}, existedArr;
						if (names) {
							if ($.isArray(names)) {
								if (names.length) {
									if (typeof names[0] == 'string') {
										// elFinder <= 2.1.6 command `is` results
										existed = intersect(files, names);
									} else {
										$.each(names, function(i, v) {
											exists[v.name] = v.hash;
										});
										existed = intersect(files, $.map(exists, function(h, n) { return n; }));
										$.each(files, function(i, file) {
											if (exists[file.name]) {
												hashes[exists[file.name]] = file.name;
											}
										});
									}
								}
							} else {
								existedArr = [];
								existed = $.map(names, function(n) {
									if (typeof n === 'string') {
										return n;
									} else {
										// support to >=2.1.11 plugin Normalizer, Sanitizer
										existedArr = existedArr.concat(n);
										return null;
									}
								});
								if (existedArr.length) {
									existed = existed.concat(existedArr);
								}
								existed = intersect(files, existed);
								hashes = names;
							}
						}
						existed.length ? confirm(0) : paste(files);
					},
					paste     = function(files) {
						var renames = [],
							files  = $.map(files, function(file) { 
								if (file.rename) {
									renames.push(file.name);
								}
								return !file.remove ? file : null;
							}),
							cnt    = files.length,
							groups = {},
							args   = [],
							src;

						if (!cnt) {
							return dfrd.resolve();
						}

						src = files[0].phash;
						files = $.map(files, function(f) { return f.hash; });
						
						fm.request({
								data   : {cmd : 'paste', dst : dst.hash, targets : files, cut : cut ? 1 : 0, src : src, renames : renames, hashes : hashes, suffix : fm.options.backupSuffix},
								notify : {type : cut ? 'move' : 'copy', cnt : cnt}
							})
							.done(function(data) {
								dfrd.resolve(data);
								if (data && data.added && data.added[0]) {
									var newItem = fm.getUI('cwd').find('#'+fm.cwdHash2Id(data.added[0].hash));
									if (newItem.length) {
										newItem.trigger('scrolltoview');
									}
								}
							})
							.always(function() {
								fm.unlockfiles({files : files});
							});
					},
					internames;

				if (!fm.isCommandEnabled(self.name, dst.hash) || !files.length) {
					return dfrd.resolve();
				}
				
					
				if (fm.oldAPI) {
					paste(files);
				} else {
					
					if (!fm.option('copyOverwrite')) {
						paste(files);
					} else {
						internames = $.map(files, function(f) { return f.name});
						dst.hash == fm.cwd().hash
							? valid($.map(fm.files(), function(file) { return file.phash == dst.hash ? {hash: file.hash, name: file.name} : null }))
							: fm.request({
								data : {cmd : 'ls', target : dst.hash, intersect : internames},
								notify : {type : 'prepare', cnt : 1, hideCnt : true},
								preventFail : true
							})
							.always(function(data) {
								valid(data.list);
							});
					}
				}
				
				return dfrd;
			},
			parents, fparents;


		if (!cnt || !dst || dst.mime != 'directory') {
			return dfrd.reject();
		}
			
		if (!dst.write)	{
			return dfrd.reject([error, files[0].name, 'errPerm']);
		}
		
		parents = fm.parents(dst.hash);
		
		$.each(files, function(i, file) {
			if (!file.read) {
				return !dfrd.reject([error, files[0].name, 'errPerm']);
			}
			
			if (cut && file.locked) {
				return !dfrd.reject(['errLocked', file.name]);
			}
			
			if ($.inArray(file.hash, parents) !== -1) {
				return !dfrd.reject(['errCopyInItself', file.name]);
			}
			
			fparents = fm.parents(file.hash);
			fparents.pop();
			if ($.inArray(dst.hash, fparents) !== -1) {
				
				if ($.map(fparents, function(h) { var d = fm.file(h); return d.phash == dst.hash && d.name == file.name ? d : null }).length) {
					return !dfrd.reject(['errReplByChild', file.name]);
				}
			}
			
			if (file.phash == dst.hash) {
				fcopy.push(file.hash);
			} else {
				fpaste.push({
					hash  : file.hash,
					phash : file.phash,
					name  : file.name
				});
			}
		});

		if (dfrd.state() == 'rejected') {
			return dfrd;
		}

		return $.when(
			copy(fcopy),
			paste(fpaste)
		).always(function() {
			cut && fm.clipboard([]);
		});
	}

};


/*
 * File: /js/commands/places.js
 */

/**
 * @class  elFinder command "places"
 * Regist to Places
 *
 * @author Naoki Sawada
 **/
elFinder.prototype.commands.places = function() {
	var self   = this,
	fm     = this.fm,
	filter = function(hashes) {
		return $.map(self.files(hashes), function(f) { return f.mime == 'directory' ? f : null; });
	},
	places = null;
	
	this.getstate = function(sel) {
		var sel = this.hashes(sel),
		cnt = sel.length;
		
		return  places && cnt && cnt == filter(sel).length ? 0 : -1;
	};
	
	this.exec = function(hashes) {
		var files = this.files(hashes);
		places.trigger('regist', [ files ]);
	};
	
	fm.one('load', function(){
		places = fm.ui.places;
	});

};


/*
 * File: /js/commands/quicklook.js
 */

/**
 * @class  elFinder command "quicklook"
 * Fast preview for some files types
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.quicklook = function() {
	var self       = this,
		fm         = self.fm,
		/**
		 * window closed state
		 *
		 * @type Number
		 **/
		closed     = 0,
		/**
		 * window animated state
		 *
		 * @type Number
		 **/
		animated   = 1,
		/**
		 * window opened state
		 *
		 * @type Number
		 **/
		opened     = 2,
		/**
		 * window state
		 *
		 * @type Number
		 **/
		state      = closed,
		/**
		 * next/prev event name (requied to cwd catch it)
		 *
		 * @type Number
		 **/
		// keydown    = fm.UA.Firefox || fm.UA.Opera ? 'keypress' : 'keydown',
		/**
		 * navbar icon class
		 *
		 * @type Number
		 **/
		navicon    = 'elfinder-quicklook-navbar-icon',
		/**
		 * navbar "fullscreen" icon class
		 *
		 * @type Number
		 **/
		fullscreen  = 'elfinder-quicklook-fullscreen',
		/**
		 * Triger keydown/keypress event with left/right arrow key code
		 *
		 * @param  Number  left/right arrow key code
		 * @return void
		 **/
		navtrigger = function(code) {
			$(document).trigger($.Event('keydown', { keyCode: code, ctrlKey : false, shiftKey : false, altKey : false, metaKey : false }));
		},
		/**
		 * Return css for closed window
		 *
		 * @param  jQuery  file node in cwd
		 * @return void
		 **/
		closedCss = function(node) {
			return {
				opacity : 0,
				width   : 20,//node.width(),
				height  : fm.view == 'list' ? 1 : 20,
				top     : node.offset().top+'px', 
				left    : node.offset().left+'px' 
			}
		},
		/**
		 * Return css for opened window
		 *
		 * @return void
		 **/
		openedCss = function() {
			var win = $(window);
			var w = Math.min(width, $(window).width()-10);
			var h = Math.min(height, $(window).height()-80);
			return {
				opacity : 1,
				width  : w,
				height : h,
				top    : parseInt((win.height() - h - 60)/2 + win.scrollTop()),
				left   : parseInt((win.width() - w)/2 + win.scrollLeft())
			}
		},
		
		support = function(codec) {
			var media = document.createElement(codec.substr(0, codec.indexOf('/'))),
				value = false;
			
			try {
				value = media.canPlayType && media.canPlayType(codec);
			} catch (e) {
				
			}
			
			return value && value !== '' && value != 'no';
		},
		
		/**
		 * Opened window width (from config)
		 *
		 * @type Number
		 **/
		width, 
		/**
		 * Opened window height (from config)
		 *
		 * @type Number
		 **/
		height, 
		/**
		 * elFinder node
		 *
		 * @type jQuery
		 **/
		parent, 
		/**
		 * elFinder current directory node
		 *
		 * @type jQuery
		 **/
		cwd, 
		navdrag = false,
		navmove = false,
		navtm   = null,
		coverEv = 'mousemove touchstart ' + ('onwheel' in document? 'wheel' : 'onmousewheel' in document? 'mousewheel' : 'DOMMouseScroll'),
		title   = $('<div class="elfinder-quicklook-title"/>'),
		icon    = $('<div/>'),
		info    = $('<div class="elfinder-quicklook-info"/>'),//.hide(),
		cover   = $('<div class="ui-front elfinder-quicklook-cover"/>'),
		fsicon  = $('<div class="'+navicon+' '+navicon+'-fullscreen"/>')
			.on('click touchstart', function(e) {
				if (navmove) {
					return;
				}
				
				var win     = self.window,
					full    = win.hasClass(fullscreen),
					scroll  = 'scroll.'+fm.namespace,
					$window = $(window);
					
				e.stopPropagation();
				e.preventDefault();
				
				win.toggleClass(fullscreen);
				if (full) {
					win.css(win.data('position'));
					$window.off(scroll).trigger(self.resize).off(self.resize);
					navbar.off('mouseenter mouseleave');
					cover.off(coverEv);
					navStyle = '';
					navShow();
				} else {
					win.data('position', {
						left   : win.css('left'), 
						top    : win.css('top'), 
						width  : win.width(), 
						height : win.height(),
						display: 'block'
					})
					.removeAttr('style');

					$(window).on(self.resize, function(e) {
						self.preview.trigger('changesize');
					})
					.trigger(scroll)
					.trigger(self.resize);

					cover.on(coverEv, function(e) {
						if (! navdrag) {
							if (e.type === 'mousemove' || e.type === 'touchstart') {
								navShow();
								navtm = setTimeout(function() {
									if (fm.UA.Mobile || navbar.parent().find('.elfinder-quicklook-navbar:hover').length < 1) {
										navbar.fadeOut('slow', function() {
											cover.show();
										});
									}
								}, 3000);
							}
							if (cover.is(':visible')) {
								coverHide();
								cover.data('tm', setTimeout(function() {
									cover.show();
								}, 3000));
							}
						}
					}).show().trigger('mousemove');
					
					navbar.on('mouseenter mouseleave', function(e) {
						if (! navdrag) {
							if (e.type === 'mouseenter') {
								navShow();
							} else {
								cover.trigger('mousemove');
							}
						}
					});
				}
				if (fm.zIndex) {
					win.css('z-index', fm.zIndex + 1);
				}
				if (fm.UA.Mobile) {
					navbar.attr('style', navStyle);
				} else {
					navbar.attr('style', navStyle).draggable(full ? 'destroy' : {
						start: function() {
							navdrag = true;
							navmove = true;
							cover.show();
							navShow();
						},
						stop: function() {
							navdrag = false;
							navStyle = self.navbar.attr('style');
							setTimeout(function() {
								navmove = false;
							}, 20);
						}
					});
				}
				$(this).toggleClass(navicon+'-fullscreen-off');
				var collection = win;
				if(parent.is('.ui-resizable')) {
					collection = collection.add(parent);
				};
				$.fn.resizable && !fm.UA.Touch && collection.resizable(full ? 'enable' : 'disable').removeClass('ui-state-disabled');

				win.trigger('viewchange');
			}),
		
		navShow = function() {
			navtm && clearTimeout(navtm);
			navbar.stop(true, true).show();
			coverHide();
		},
		
		coverHide = function() {
			cover.data('tm') && clearTimeout(cover.data('tm'));
			cover.hide();
		},
			
		navbar  = $('<div class="elfinder-quicklook-navbar"/>')
			.append($('<div class="'+navicon+' '+navicon+'-prev"/>').on('click touchstart', function(e) { ! navmove && navtrigger(37); return false; }))
			.append(fsicon)
			.append($('<div class="'+navicon+' '+navicon+'-next"/>').on('click touchstart', function(e) { ! navmove && navtrigger(39); return false; }))
			.append('<div class="elfinder-quicklook-navbar-separator"/>')
			.append($('<div class="'+navicon+' '+navicon+'-close"/>').on('click touchstart', function(e) { ! navmove && self.window.trigger('close'); return false; }))
		,
		navStyle = '';

	(this.navbar = navbar)._show = navShow;
	this.resize = 'resize.'+fm.namespace;
	this.info = $('<div class="elfinder-quicklook-info-wrapper"/>')
		.append(icon)
		.append(info);
		
	this.preview = $('<div class="elfinder-quicklook-preview ui-helper-clearfix"/>')
		// clean info/icon
		.on('change', function(e) {
			navShow();
			navbar.attr('style', navStyle);
			self.preview.attr('style', '')
			self.info.attr('style', '').hide();
			icon.removeAttr('class').attr('style', '');
			info.html('');
		})
		// update info/icon
		.on('update', function(e) {
			var fm      = self.fm,
				preview = self.preview,
				file    = e.file,
				tpl     = '<div class="elfinder-quicklook-info-data">{value}</div>',
				tmb;

			if (file) {
				!file.read && e.stopImmediatePropagation();
				self.window.data('hash', file.hash);
				self.preview.off('changesize').trigger('change').children().remove();
				title.html(fm.escape(file.name));
				
				info.html(
						tpl.replace(/\{value\}/, fm.escape(file.name))
						+ tpl.replace(/\{value\}/, fm.mime2kind(file))
						+ (file.mime == 'directory' ? '' : tpl.replace(/\{value\}/, fm.formatSize(file.size)))
						+ tpl.replace(/\{value\}/, fm.i18n('modify')+': '+ fm.formatDate(file))
					)
				icon.addClass('elfinder-cwd-icon ui-corner-all '+fm.mime2class(file.mime));

				if (tmb = fm.tmb(file)) {
					$('<img/>')
						.hide()
						.appendTo(self.preview)
						.load(function() {
							icon.addClass(tmb.className).css('background-image', "url('"+tmb.url+"')");
							$(this).remove();
						})
						.attr('src', tmb.url);
				}
				self.info.delay(100).fadeIn(10);
				if (self.window.hasClass(fullscreen)) {
					cover.trigger('mousemove');
				}
			} else { 
				e.stopImmediatePropagation();
			}
		});
		

	

	this.window = $('<div class="ui-front ui-helper-reset ui-widget elfinder-quicklook" style="position:absolute"/>')
		.addClass(fm.UA.Touch? 'elfinder-touch' : '')
		.click(function(e) { e.stopPropagation();  })
		.append(
			$('<div class="elfinder-quicklook-titlebar"/>')
			.append(
				title,
				$('<span class="ui-icon ui-icon-circle-close"/>').mousedown(function(e) {
					e.stopPropagation();
					self.window.trigger('close');
				})),
				this.preview,
				self.info.hide(),
				cover.hide(),
				navbar
			)
		.draggable({handle : 'div.elfinder-quicklook-titlebar'})
		.on('open', function(e) {
			var win  = self.window, 
				file = self.value,
				node;

			if (self.closed() && file && (node = $('#'+fm.cwdHash2Id(file.hash))).length) {
				navStyle = '';
				navbar.attr('style', '');
				state = animated;
				node.trigger('scrolltoview');
				coverHide();
				win.css(closedCss(node))
					.show()
					.animate(openedCss(), 550, function() {
						state = opened;
						self.update(1, self.value);
						navShow();
					});
			}
		})
		.on('close', function(e) {
			var win     = self.window,
				preview = self.preview.trigger('change'),
				file    = self.value,
				node    = cwd.find('#'+fm.cwdHash2Id(win.data('hash'))),
				close   = function() {
					state = closed;
					win.hide();
					preview.children().remove();
					self.update(0, self.value);
					
				};
				
			if (self.opened()) {
				state = animated;
				win.hasClass(fullscreen) && fsicon.click();
				node.length
					? win.animate(closedCss(node), 500, close)
					: close();
			}
		});

	/**
	 * This command cannot be disable by backend
	 *
	 * @type Boolean
	 **/
	this.alwaysEnabled = true;
	
	/**
	 * Selected file
	 *
	 * @type Object
	 **/
	this.value = null;
	
	this.handlers = {
		// save selected file
		select : function() { this.update(void(0), this.fm.selectedFiles()[0]); },
		error  : function() { self.window.is(':visible') && self.window.data('hash', '').trigger('close'); },
		'searchshow searchhide' : function() { this.opened() && this.window.trigger('close'); }
	};
	
	this.shortcuts = [{
		pattern     : 'space'
	}];
	
	this.support = {
		audio : {
			ogg : support('audio/ogg; codecs="vorbis"'),
			mp3 : support('audio/mpeg;'),
			wav : support('audio/wav; codecs="1"'),
			m4a : support('audio/mp4;') || support('audio/x-m4a;') || support('audio/aac;')
		},
		video : {
			ogg  : support('video/ogg; codecs="theora"'),
			webm : support('video/webm; codecs="vp8, vorbis"'),
			mp4  : support('video/mp4; codecs="avc1.42E01E"') || support('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') 
		}
	};
	
	/**
	 * Return true if quickLoock window is visible and not animated
	 *
	 * @return Boolean
	 **/
	this.closed = function() {
		return state == closed;
	};
	
	/**
	 * Return true if quickLoock window is hidden
	 *
	 * @return Boolean
	 **/
	this.opened = function() {
		return state == opened;
	};
	
	/**
	 * Init command.
	 * Add default plugins and init other plugins
	 *
	 * @return Object
	 **/
	this.init = function() {
		var o       = this.options, 
			win     = this.window,
			preview = this.preview,
			i, p;
		
		width  = o.width  > 0 ? parseInt(o.width)  : 450;	
		height = o.height > 0 ? parseInt(o.height) : 300;

		fm.one('load', function() {
			parent = fm.getUI();
			cwd    = fm.getUI('cwd');

			if (fm.zIndex) {
				win.css('z-index', fm.zIndex + 1);
			}
			
			win.appendTo('body');
			
			// close window on escape
			$(document).keydown(function(e) {
				e.keyCode == 27 && self.opened() && win.trigger('close')
			})
			
			if ($.fn.resizable && !fm.UA.Touch) {
				win.resizable({ 
					handles   : 'se', 
					minWidth  : 350, 
					minHeight : 120, 
					resize    : function() { 
						// use another event to avoid recursion in fullscreen mode
						// may be there is clever solution, but i cant find it :(
						preview.trigger('changesize'); 
					}
				});
			}
			
			self.change(function() {
				if (self.opened()) {
					self.value ? preview.trigger($.Event('update', {file : self.value})) : win.trigger('close');
				}
			});
			
			$.each(fm.commands.quicklook.plugins || [], function(i, plugin) {
				if (typeof(plugin) == 'function') {
					new plugin(self)
				}
			});
			
			preview.on('update', function() {
				self.info.show();
			});
		});
		
		fm.bind('open',function() {
			// set current volume dispInlineRegex
			try {
				self.dispInlineRegex = new RegExp(fm.option('dispInlineRegex'));
			} catch(e) {
				self.dispInlineRegex = /.*/;
			}
		});
		
		fm.bind('destroy', function() {
			self.window.remove();
		});
	};
	
	this.getstate = function() {
		var fm  = this.fm,
			sel = fm.selected(),
			chk = sel.length === 1 && $('#'+fm.cwdHash2Id(sel[0])).length;
		return chk? state == opened ? 1 : 0 : -1;
	};
	
	this.exec = function() {
		this.enabled() && this.window.trigger(this.opened() ? 'close' : 'open');
	};

	this.hideinfo = function() {
		this.info.stop(true, true).hide();
	};

};


/*
 * File: /js/commands/quicklook.plugins.js
 */


elFinder.prototype.commands.quicklook.plugins = [
	
	/**
	 * Images preview plugin
	 *
	 * @param elFinder.commands.quicklook
	 **/
	function(ql) {
		var mimes   = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/x-ms-bmp'],
			preview = ql.preview;
		
		// what kind of images we can display
		$.each(navigator.mimeTypes, function(i, o) {
			var mime = o.type;
			
			if (mime.indexOf('image/') === 0 && $.inArray(mime, mimes)) {
				mimes.push(mime);
			} 
		});
			
		preview.on('update', function(e) {
			var fm   = ql.fm,
				file = e.file,
				img, loading;

			if (ql.dispInlineRegex.test(file.mime) && $.inArray(file.mime, mimes) !== -1) {
				// this is our file - stop event propagation
				e.stopImmediatePropagation();

				loading = $('<div class="elfinder-quicklook-info-data"> '+fm.i18n('nowLoading')+'<span class="elfinder-info-spinner"></div>').appendTo(ql.info.find('.elfinder-quicklook-info'));

				img = $('<img/>')
					.hide()
					.appendTo(preview)
					.load(function() {
						// timeout - because of strange safari bug - 
						// sometimes cant get image height 0_o
						setTimeout(function() {
							var prop = (img.width()/img.height()).toFixed(2);
							preview.on('changesize', function() {
								var pw = parseInt(preview.width()),
									ph = parseInt(preview.height()),
									w, h;
							
								if (prop < (pw/ph).toFixed(2)) {
									h = ph;
									w = Math.floor(h * prop);
								} else {
									w = pw;
									h = Math.floor(w/prop);
								}
								img.width(w).height(h).css('margin-top', h < ph ? Math.floor((ph - h)/2) : 0);
							
							})
							.trigger('changesize');
							
							loading.remove();
							// hide info/icon
							ql.hideinfo();
							//show image
							img.fadeIn(100);
						}, 1)
					})
					.error(function() {
						loading.remove();
					})
					.attr('src', ql.fm.openUrl(file.hash));
			}
			
		});
	},
	
	/**
	 * HTML preview plugin
	 *
	 * @param elFinder.commands.quicklook
	 **/
	function(ql) {
		var mimes   = ['text/html', 'application/xhtml+xml'],
			preview = ql.preview,
			fm      = ql.fm;
			
		preview.on('update', function(e) {
			var file = e.file, jqxhr, loading;
			
			if (ql.dispInlineRegex.test(file.mime) && $.inArray(file.mime, mimes) !== -1) {
				e.stopImmediatePropagation();

				loading = $('<div class="elfinder-quicklook-info-data"> '+fm.i18n('nowLoading')+'<span class="elfinder-info-spinner"></div>').appendTo(ql.info.find('.elfinder-quicklook-info'));

				// stop loading on change file if not loaded yet
				preview.one('change', function() {
					jqxhr.state() == 'pending' && jqxhr.reject();
				});
				
				jqxhr = fm.request({
					data           : {cmd : 'get', target  : file.hash, current : file.phash, conv : 1},
					preventDefault : true
				})
				.done(function(data) {
					ql.hideinfo();
					var doc = $('<iframe class="elfinder-quicklook-preview-html"/>').appendTo(preview)[0].contentWindow.document;
					doc.open();
					doc.write(data.content);
					doc.close();
				})
				.always(function() {
					loading.remove();
				});
			}
		})
	},
	
	/**
	 * Texts preview plugin
	 *
	 * @param elFinder.commands.quicklook
	 **/
	function(ql) {
		var fm      = ql.fm,
			mimes   = fm.res('mimes', 'text'),
			preview = ql.preview;
				
			
		preview.on('update', function(e) {
			var file = e.file,
				mime = file.mime,
				jqxhr, loading;
			
			if (mime.indexOf('text/') === 0 || $.inArray(mime, mimes) !== -1) {
				e.stopImmediatePropagation();
				
				loading = $('<div class="elfinder-quicklook-info-data"> '+fm.i18n('nowLoading')+'<span class="elfinder-info-spinner"></div>').appendTo(ql.info.find('.elfinder-quicklook-info'));

				// stop loading on change file if not loadin yet
				preview.one('change', function() {
					jqxhr.state() == 'pending' && jqxhr.reject();
				});
				
				jqxhr = fm.request({
					data   : {cmd     : 'get', target  : file.hash, conv : 1},
					preventDefault : true
				})
				.done(function(data) {
					ql.hideinfo();
					$('<div class="elfinder-quicklook-preview-text-wrapper"><pre class="elfinder-quicklook-preview-text">'+fm.escape(data.content)+'</pre></div>').appendTo(preview);
				})
				.always(function() {
					loading.remove();
				});
			}
		});
	},
	
	/**
	 * PDF preview plugin
	 *
	 * @param elFinder.commands.quicklook
	 **/
	function(ql) {
		var fm      = ql.fm,
			mime    = 'application/pdf',
			preview = ql.preview,
			active  = false;
			
		if ((fm.UA.Safari && fm.OS == 'mac') || fm.UA.IE) {
			active = true;
		} else {
			$.each(navigator.plugins, function(i, plugins) {
				$.each(plugins, function(i, plugin) {
					if (plugin.type == mime) {
						return !(active = true);
					}
				});
			});
		}

		active && preview.on('update', function(e) {
			var file = e.file, node;
			
			if (ql.dispInlineRegex.test(file.mime) && file.mime == mime) {
				e.stopImmediatePropagation();
				preview.one('change', function() {
					node.off('load').remove();
				});
				
				node = $('<iframe class="elfinder-quicklook-preview-pdf"/>')
					.hide()
					.appendTo(preview)
					.load(function() { 
						ql.hideinfo();
						node.show(); 
					})
					.attr('src', fm.url(file.hash));
			}
			
		})
		
			
	},
	
	/**
	 * Flash preview plugin
	 *
	 * @param elFinder.commands.quicklook
	 **/
	function(ql) {
		var fm      = ql.fm,
			mime    = 'application/x-shockwave-flash',
			preview = ql.preview,
			active  = false;

		$.each(navigator.plugins, function(i, plugins) {
			$.each(plugins, function(i, plugin) {
				if (plugin.type == mime) {
					return !(active = true);
				}
			});
		});
		
		active && preview.on('update', function(e) {
			var file = e.file,
				node;
				
			if (ql.dispInlineRegex.test(file.mime) && file.mime == mime) {
				e.stopImmediatePropagation();
				ql.hideinfo();
				node = $('<embed class="elfinder-quicklook-preview-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" src="'+fm.url(file.hash)+'" quality="high" type="application/x-shockwave-flash" wmode="transparent" />')
					.appendTo(preview);
			}
		});
	},
	
	/**
	 * HTML5 audio preview plugin
	 *
	 * @param elFinder.commands.quicklook
	 **/
	function(ql) {
		var preview  = ql.preview,
			autoplay = !!ql.options['autoplay'],
			mimes    = {
				'audio/mpeg'    : 'mp3',
				'audio/mpeg3'   : 'mp3',
				'audio/mp3'     : 'mp3',
				'audio/x-mpeg3' : 'mp3',
				'audio/x-mp3'   : 'mp3',
				'audio/x-wav'   : 'wav',
				'audio/wav'     : 'wav',
				'audio/x-m4a'   : 'm4a',
				'audio/aac'     : 'm4a',
				'audio/mp4'     : 'm4a',
				'audio/x-mp4'   : 'm4a',
				'audio/ogg'     : 'ogg'
			},
			node,
			win  = ql.window,
			navi = ql.navbar;

		preview.on('update', function(e) {
			var file = e.file,
				type = mimes[file.mime],
				setNavi = function() {
					navi.css('bottom', win.hasClass('elfinder-quicklook-fullscreen')? '50px' : '');
				};

			if (ql.support.audio[type]) {
				e.stopImmediatePropagation();
				
				node = $('<audio class="elfinder-quicklook-preview-audio" controls preload="auto" autobuffer><source src="'+ql.fm.openUrl(file.hash)+'" /></audio>')
					.appendTo(preview);
				autoplay && node[0].play();
				
				win.on('viewchange.audio', setNavi);
				setNavi();
			}
		}).on('change', function() {
			if (node && node.parent().length) {
				win.off('viewchange.audio');
				node[0].pause();
				node.remove();
				node= null;
			}
		});
	},
	
	/**
	 * HTML5 video preview plugin
	 *
	 * @param elFinder.commands.quicklook
	 **/
	function(ql) {
		var preview  = ql.preview,
			autoplay = !!ql.options['autoplay'],
			mimes    = {
				'video/mp4'       : 'mp4',
				'video/x-m4v'     : 'mp4',
				'video/quicktime' : 'mp4',
				'video/ogg'       : 'ogg',
				'application/ogg' : 'ogg',
				'video/webm'      : 'webm'
			},
			node,
			win  = ql.window,
			navi = ql.navbar;

		preview.on('update', function(e) {
			var file = e.file,
				type = mimes[file.mime],
				setNavi = function() {
					if (ql.fm.UA.iOS) {
						if (win.hasClass('elfinder-quicklook-fullscreen')) {
							preview.css('height', '-webkit-calc(100% - 50px)');
							navi._show();
						} else {
							preview.css('height', '');
						}
					} else {
						navi.css('bottom', win.hasClass('elfinder-quicklook-fullscreen')? '50px' : '');
					}
				};
				
			if (ql.support.video[type]) {
				e.stopImmediatePropagation();

				ql.hideinfo();
				node = $('<video class="elfinder-quicklook-preview-video" controls preload="auto" autobuffer><source src="'+ql.fm.openUrl(file.hash)+'" /></video>').appendTo(preview);
				autoplay && node[0].play();

				win.on('viewchange.video', setNavi);
				setNavi();
			}
		}).on('change', function() {
			if (node && node.parent().length) {
				win.off('viewchange.video');
				node[0].pause();
				node.remove();
				node= null;
			}
		});
	},
	
	/**
	 * Audio/video preview plugin using browser plugins
	 *
	 * @param elFinder.commands.quicklook
	 **/
	function(ql) {
		var preview = ql.preview,
			mimes   = [],
			node,
			win  = ql.window,
			navi = ql.navbar;
			
		$.each(navigator.plugins, function(i, plugins) {
			$.each(plugins, function(i, plugin) {
				(plugin.type.indexOf('audio/') === 0 || plugin.type.indexOf('video/') === 0) && mimes.push(plugin.type);
			});
		});
		
		preview.on('update', function(e) {
			var file  = e.file,
				mime  = file.mime,
				video,
				setNavi = function() {
					navi.css('bottom', win.hasClass('elfinder-quicklook-fullscreen')? '50px' : '');
				};
			
			if ($.inArray(file.mime, mimes) !== -1) {
				e.stopImmediatePropagation();
				(video = mime.indexOf('video/') === 0) && ql.hideinfo();
				node = $('<embed src="'+ql.fm.openUrl(file.hash)+'" type="'+mime+'" class="elfinder-quicklook-preview-'+(video ? 'video' : 'audio')+'"/>')
					.appendTo(preview);
				
				win.on('viewchange.embed', setNavi);
				setNavi();
			}
		}).on('change', function() {
			if (node && node.parent().length) {
				win.off('viewchange.embed');
				node.remove();
				node= null;
			}
		});
		
	},

	/**
	 * Archive(zip|gzip|tar) preview plugin using https://github.com/imaya/zlib.js
	 *
	 * @param elFinder.commands.quicklook
	 **/
	function(ql) {
		var mimes   = ['application/zip', 'application/x-gzip', 'application/x-tar'],
			preview = ql.preview,
			fm      = ql.fm;

		if (typeof Uint8Array !== 'undefined' && elFinder.Zlib) {
			preview.on('update', function(e) {
				var file = e.file,
					doc, xhr, loading;

				if ($.inArray(file.mime, mimes) !== -1) {
					// this is our file - stop event propagation
					e.stopImmediatePropagation();
					
					loading = $('<div class="elfinder-quicklook-info-data"> '+fm.i18n('nowLoading')+'<span class="elfinder-info-spinner"></div>').appendTo(ql.info.find('.elfinder-quicklook-info'));
					
					// stop loading on change file if not loaded yet
					preview.one('change', function() {
						loading.remove();
						xhr && xhr.readyState < 4 && xhr.abort();
					});
					
					xhr = new XMLHttpRequest();
					xhr.onload = function(e) {
						var filenames = [], header, unzip, tar, tarlen, offset, h, name, prefix, size, dbs, toStr;
						if (this.readyState === 4 && this.response) {
							setTimeout(function() {
								if (file.mime === 'application/zip') {
									unzip = new elFinder.Zlib.Unzip(new Uint8Array(xhr.response));
									filenames = unzip.getFilenames();
								} else {
									if (file.mime === 'application/x-gzip') {
										unzip = new elFinder.Zlib.Gunzip(new Uint8Array(xhr.response));
										tar = unzip.decompress();
									} else {
										tar = new Uint8Array(xhr.response);
									}
									tarlen = tar.length;
									offset = 0;
									toStr = function(arr) {
										return String.fromCharCode.apply(null, arr).replace(/\0+$/, '');
									};
									while (offset < tarlen && tar[offset] !== 0) {
										h = tar.subarray(offset, offset + 512);
										name = toStr(h.subarray(0, 100));
										if (prefix = toStr(h.subarray(345, 500))) {
											name = prefix + name;
										}
										size = parseInt(toStr(h.subarray(124, 136)), 8);
										dbs = Math.ceil(size / 512) * 512;
										if (name === '././@LongLink') {
											name = toStr(tar.subarray(offset + 512, offset + 512 + dbs));
										}
										(name !== 'pax_global_header') && filenames.push(name);
										offset = offset + 512 + dbs;
									}
								}
								if (filenames && filenames.length) {
									filenames = $.map(filenames, function(str) {
										try {
											str = decodeURIComponent(escape(str));
										} catch(e) {
											str = escape(str);
										}
										return str;
									});
									filenames.sort();
									loading.remove();
									header = '<strong>'+fm.escape(file.mime)+'</strong> ('+fm.formatSize(file.size)+')'+'<hr/>'
									doc = $('<div class="elfinder-quicklook-preview-archive-wrapper">'+header+'<pre class="elfinder-quicklook-preview-text">'+fm.escape(filenames.join("\n"))+'</pre></div>').appendTo(preview);
									ql.hideinfo();
								}
							}, 70);
						} else {
							loading.remove();
						}
					}
					xhr.open('GET', fm.openUrl(file.hash, fm.xhrFields.withCredentials || false), true);
					xhr.responseType = 'arraybuffer';
					// set request headers
					if (fm.customHeaders) {
						$.each(fm.customHeaders, function(key) {
							xhr.setRequestHeader(key, this);
						});
					}
					// set xhrFields
					if (fm.xhrFields) {
						$.each(fm.xhrFields, function(key) {
							if (key in xhr) {
								xhr[key] = this;
							}
						});
					}
					xhr.send();
				}
			});
		}
	},

	/**
	 * Any supported files preview plugin using Google docs online viewer
	 *
	 * @param elFinder.commands.quicklook
	 **/
	function(ql) {
		var fm      = ql.fm,
			mimes   = ql.options.googleDocsMimes || [],
			preview = ql.preview;
			
		preview.on('update', function(e) {
			var win  = ql.window,
				file = e.file, node, loading;
			
			if ($.inArray(file.mime, mimes) !== -1) {
				if (file.url == '1') {
					$('<div class="elfinder-quicklook-info-data"><button class="elfinder-info-button">'+fm.i18n('getLink')+'</button></div>').appendTo(ql.info.find('.elfinder-quicklook-info'))
					.on('click', function() {
						$(this).html('<span class="elfinder-info-spinner">');
						fm.request({
							data : {cmd : 'url', target : file.hash},
							preventDefault : true
						})
						.always(function() {
							$(this).html('');
						})
						.done(function(data) {
							var rfile = fm.file(file.hash);
							ql.value.url = rfile.url = data.url || '';
							if (ql.value.url) {
								preview.trigger($.Event('update', {file : ql.value}));
							}
						});
					});
				}
				if (file.url !== '' && file.url != '1') {
					e.stopImmediatePropagation();
					preview.one('change', function() {
						loading.remove();
						node.off('load').remove();
					});
					
					loading = $('<div class="elfinder-quicklook-info-data"> '+fm.i18n('nowLoading')+'<span class="elfinder-info-spinner"></div>').appendTo(ql.info.find('.elfinder-quicklook-info'));
					
					node = $('<iframe class="elfinder-quicklook-preview-iframe"/>')
						.css('background-color', 'transparent')
						.appendTo(preview)
						.on('load', function() {
							ql.hideinfo();
							loading.remove();
							$(this).css('background-color', '#fff').show();
						})
						.attr('src', 'http://docs.google.com/gview?embedded=true&url=' + encodeURIComponent(fm.convAbsUrl(fm.url(file.hash))));
				}
			}
			
		});
	}

];

try {
(function(){

/** @license zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License */(function() {'use strict';function m(a){throw a;}var q=void 0,u,aa=this;function v(a,b){var c=a.split("."),d=aa;!(c[0]in d)&&d.execScript&&d.execScript("var "+c[0]);for(var f;c.length&&(f=c.shift());)!c.length&&b!==q?d[f]=b:d=d[f]?d[f]:d[f]={}};var w="undefined"!==typeof Uint8Array&&"undefined"!==typeof Uint16Array&&"undefined"!==typeof Uint32Array&&"undefined"!==typeof DataView;new (w?Uint8Array:Array)(256);var x;for(x=0;256>x;++x)for(var y=x,ba=7,y=y>>>1;y;y>>>=1)--ba;var z=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,
2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,
2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,
2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,
3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,
936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],B=w?new Uint32Array(z):z;function C(a){var b=a.length,c=0,d=Number.POSITIVE_INFINITY,f,h,k,e,g,l,p,s,r,A;for(s=0;s<b;++s)a[s]>c&&(c=a[s]),a[s]<d&&(d=a[s]);f=1<<c;h=new (w?Uint32Array:Array)(f);k=1;e=0;for(g=2;k<=c;){for(s=0;s<b;++s)if(a[s]===k){l=0;p=e;for(r=0;r<k;++r)l=l<<1|p&1,p>>=1;A=k<<16|s;for(r=l;r<f;r+=g)h[r]=A;++e}++k;e<<=1;g<<=1}return[h,c,d]};var D=[],E;for(E=0;288>E;E++)switch(!0){case 143>=E:D.push([E+48,8]);break;case 255>=E:D.push([E-144+400,9]);break;case 279>=E:D.push([E-256+0,7]);break;case 287>=E:D.push([E-280+192,8]);break;default:m("invalid literal: "+E)}
var ca=function(){function a(a){switch(!0){case 3===a:return[257,a-3,0];case 4===a:return[258,a-4,0];case 5===a:return[259,a-5,0];case 6===a:return[260,a-6,0];case 7===a:return[261,a-7,0];case 8===a:return[262,a-8,0];case 9===a:return[263,a-9,0];case 10===a:return[264,a-10,0];case 12>=a:return[265,a-11,1];case 14>=a:return[266,a-13,1];case 16>=a:return[267,a-15,1];case 18>=a:return[268,a-17,1];case 22>=a:return[269,a-19,2];case 26>=a:return[270,a-23,2];case 30>=a:return[271,a-27,2];case 34>=a:return[272,
a-31,2];case 42>=a:return[273,a-35,3];case 50>=a:return[274,a-43,3];case 58>=a:return[275,a-51,3];case 66>=a:return[276,a-59,3];case 82>=a:return[277,a-67,4];case 98>=a:return[278,a-83,4];case 114>=a:return[279,a-99,4];case 130>=a:return[280,a-115,4];case 162>=a:return[281,a-131,5];case 194>=a:return[282,a-163,5];case 226>=a:return[283,a-195,5];case 257>=a:return[284,a-227,5];case 258===a:return[285,a-258,0];default:m("invalid length: "+a)}}var b=[],c,d;for(c=3;258>=c;c++)d=a(c),b[c]=d[2]<<24|d[1]<<
16|d[0];return b}();w&&new Uint32Array(ca);function F(a,b){this.l=[];this.m=32768;this.d=this.f=this.c=this.t=0;this.input=w?new Uint8Array(a):a;this.u=!1;this.n=G;this.L=!1;if(b||!(b={}))b.index&&(this.c=b.index),b.bufferSize&&(this.m=b.bufferSize),b.bufferType&&(this.n=b.bufferType),b.resize&&(this.L=b.resize);switch(this.n){case H:this.a=32768;this.b=new (w?Uint8Array:Array)(32768+this.m+258);break;case G:this.a=0;this.b=new (w?Uint8Array:Array)(this.m);this.e=this.X;this.B=this.S;this.q=this.W;break;default:m(Error("invalid inflate mode"))}}
var H=0,G=1;
F.prototype.r=function(){for(;!this.u;){var a=I(this,3);a&1&&(this.u=!0);a>>>=1;switch(a){case 0:var b=this.input,c=this.c,d=this.b,f=this.a,h=b.length,k=q,e=q,g=d.length,l=q;this.d=this.f=0;c+1>=h&&m(Error("invalid uncompressed block header: LEN"));k=b[c++]|b[c++]<<8;c+1>=h&&m(Error("invalid uncompressed block header: NLEN"));e=b[c++]|b[c++]<<8;k===~e&&m(Error("invalid uncompressed block header: length verify"));c+k>b.length&&m(Error("input buffer is broken"));switch(this.n){case H:for(;f+k>d.length;){l=
g-f;k-=l;if(w)d.set(b.subarray(c,c+l),f),f+=l,c+=l;else for(;l--;)d[f++]=b[c++];this.a=f;d=this.e();f=this.a}break;case G:for(;f+k>d.length;)d=this.e({H:2});break;default:m(Error("invalid inflate mode"))}if(w)d.set(b.subarray(c,c+k),f),f+=k,c+=k;else for(;k--;)d[f++]=b[c++];this.c=c;this.a=f;this.b=d;break;case 1:this.q(da,ea);break;case 2:fa(this);break;default:m(Error("unknown BTYPE: "+a))}}return this.B()};
var J=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],K=w?new Uint16Array(J):J,L=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,258,258],M=w?new Uint16Array(L):L,ga=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0],O=w?new Uint8Array(ga):ga,ha=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],ia=w?new Uint16Array(ha):ha,ja=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,
12,12,13,13],P=w?new Uint8Array(ja):ja,Q=new (w?Uint8Array:Array)(288),R,la;R=0;for(la=Q.length;R<la;++R)Q[R]=143>=R?8:255>=R?9:279>=R?7:8;var da=C(Q),S=new (w?Uint8Array:Array)(30),T,ma;T=0;for(ma=S.length;T<ma;++T)S[T]=5;var ea=C(S);function I(a,b){for(var c=a.f,d=a.d,f=a.input,h=a.c,k=f.length,e;d<b;)h>=k&&m(Error("input buffer is broken")),c|=f[h++]<<d,d+=8;e=c&(1<<b)-1;a.f=c>>>b;a.d=d-b;a.c=h;return e}
function U(a,b){for(var c=a.f,d=a.d,f=a.input,h=a.c,k=f.length,e=b[0],g=b[1],l,p;d<g&&!(h>=k);)c|=f[h++]<<d,d+=8;l=e[c&(1<<g)-1];p=l>>>16;a.f=c>>p;a.d=d-p;a.c=h;return l&65535}
function fa(a){function b(a,b,c){var d,e=this.K,f,g;for(g=0;g<a;)switch(d=U(this,b),d){case 16:for(f=3+I(this,2);f--;)c[g++]=e;break;case 17:for(f=3+I(this,3);f--;)c[g++]=0;e=0;break;case 18:for(f=11+I(this,7);f--;)c[g++]=0;e=0;break;default:e=c[g++]=d}this.K=e;return c}var c=I(a,5)+257,d=I(a,5)+1,f=I(a,4)+4,h=new (w?Uint8Array:Array)(K.length),k,e,g,l;for(l=0;l<f;++l)h[K[l]]=I(a,3);if(!w){l=f;for(f=h.length;l<f;++l)h[K[l]]=0}k=C(h);e=new (w?Uint8Array:Array)(c);g=new (w?Uint8Array:Array)(d);a.K=
0;a.q(C(b.call(a,c,k,e)),C(b.call(a,d,k,g)))}u=F.prototype;u.q=function(a,b){var c=this.b,d=this.a;this.C=a;for(var f=c.length-258,h,k,e,g;256!==(h=U(this,a));)if(256>h)d>=f&&(this.a=d,c=this.e(),d=this.a),c[d++]=h;else{k=h-257;g=M[k];0<O[k]&&(g+=I(this,O[k]));h=U(this,b);e=ia[h];0<P[h]&&(e+=I(this,P[h]));d>=f&&(this.a=d,c=this.e(),d=this.a);for(;g--;)c[d]=c[d++-e]}for(;8<=this.d;)this.d-=8,this.c--;this.a=d};
u.W=function(a,b){var c=this.b,d=this.a;this.C=a;for(var f=c.length,h,k,e,g;256!==(h=U(this,a));)if(256>h)d>=f&&(c=this.e(),f=c.length),c[d++]=h;else{k=h-257;g=M[k];0<O[k]&&(g+=I(this,O[k]));h=U(this,b);e=ia[h];0<P[h]&&(e+=I(this,P[h]));d+g>f&&(c=this.e(),f=c.length);for(;g--;)c[d]=c[d++-e]}for(;8<=this.d;)this.d-=8,this.c--;this.a=d};
u.e=function(){var a=new (w?Uint8Array:Array)(this.a-32768),b=this.a-32768,c,d,f=this.b;if(w)a.set(f.subarray(32768,a.length));else{c=0;for(d=a.length;c<d;++c)a[c]=f[c+32768]}this.l.push(a);this.t+=a.length;if(w)f.set(f.subarray(b,b+32768));else for(c=0;32768>c;++c)f[c]=f[b+c];this.a=32768;return f};
u.X=function(a){var b,c=this.input.length/this.c+1|0,d,f,h,k=this.input,e=this.b;a&&("number"===typeof a.H&&(c=a.H),"number"===typeof a.Q&&(c+=a.Q));2>c?(d=(k.length-this.c)/this.C[2],h=258*(d/2)|0,f=h<e.length?e.length+h:e.length<<1):f=e.length*c;w?(b=new Uint8Array(f),b.set(e)):b=e;return this.b=b};
u.B=function(){var a=0,b=this.b,c=this.l,d,f=new (w?Uint8Array:Array)(this.t+(this.a-32768)),h,k,e,g;if(0===c.length)return w?this.b.subarray(32768,this.a):this.b.slice(32768,this.a);h=0;for(k=c.length;h<k;++h){d=c[h];e=0;for(g=d.length;e<g;++e)f[a++]=d[e]}h=32768;for(k=this.a;h<k;++h)f[a++]=b[h];this.l=[];return this.buffer=f};
u.S=function(){var a,b=this.a;w?this.L?(a=new Uint8Array(b),a.set(this.b.subarray(0,b))):a=this.b.subarray(0,b):(this.b.length>b&&(this.b.length=b),a=this.b);return this.buffer=a};function V(a){a=a||{};this.files=[];this.v=a.comment}V.prototype.M=function(a){this.j=a};V.prototype.s=function(a){var b=a[2]&65535|2;return b*(b^1)>>8&255};V.prototype.k=function(a,b){a[0]=(B[(a[0]^b)&255]^a[0]>>>8)>>>0;a[1]=(6681*(20173*(a[1]+(a[0]&255))>>>0)>>>0)+1>>>0;a[2]=(B[(a[2]^a[1]>>>24)&255]^a[2]>>>8)>>>0};V.prototype.U=function(a){var b=[305419896,591751049,878082192],c,d;w&&(b=new Uint32Array(b));c=0;for(d=a.length;c<d;++c)this.k(b,a[c]&255);return b};function W(a,b){b=b||{};this.input=w&&a instanceof Array?new Uint8Array(a):a;this.c=0;this.ca=b.verify||!1;this.j=b.password}var na={P:0,N:8},X=[80,75,1,2],Y=[80,75,3,4],Z=[80,75,5,6];function oa(a,b){this.input=a;this.offset=b}
oa.prototype.parse=function(){var a=this.input,b=this.offset;(a[b++]!==X[0]||a[b++]!==X[1]||a[b++]!==X[2]||a[b++]!==X[3])&&m(Error("invalid file header signature"));this.version=a[b++];this.ja=a[b++];this.$=a[b++]|a[b++]<<8;this.I=a[b++]|a[b++]<<8;this.A=a[b++]|a[b++]<<8;this.time=a[b++]|a[b++]<<8;this.V=a[b++]|a[b++]<<8;this.p=(a[b++]|a[b++]<<8|a[b++]<<16|a[b++]<<24)>>>0;this.z=(a[b++]|a[b++]<<8|a[b++]<<16|a[b++]<<24)>>>0;this.J=(a[b++]|a[b++]<<8|a[b++]<<16|a[b++]<<24)>>>0;this.h=a[b++]|a[b++]<<
8;this.g=a[b++]|a[b++]<<8;this.F=a[b++]|a[b++]<<8;this.fa=a[b++]|a[b++]<<8;this.ha=a[b++]|a[b++]<<8;this.ga=a[b++]|a[b++]<<8|a[b++]<<16|a[b++]<<24;this.aa=(a[b++]|a[b++]<<8|a[b++]<<16|a[b++]<<24)>>>0;this.filename=String.fromCharCode.apply(null,w?a.subarray(b,b+=this.h):a.slice(b,b+=this.h));this.Y=w?a.subarray(b,b+=this.g):a.slice(b,b+=this.g);this.v=w?a.subarray(b,b+this.F):a.slice(b,b+this.F);this.length=b-this.offset};function pa(a,b){this.input=a;this.offset=b}var qa={O:1,da:8,ea:2048};
pa.prototype.parse=function(){var a=this.input,b=this.offset;(a[b++]!==Y[0]||a[b++]!==Y[1]||a[b++]!==Y[2]||a[b++]!==Y[3])&&m(Error("invalid local file header signature"));this.$=a[b++]|a[b++]<<8;this.I=a[b++]|a[b++]<<8;this.A=a[b++]|a[b++]<<8;this.time=a[b++]|a[b++]<<8;this.V=a[b++]|a[b++]<<8;this.p=(a[b++]|a[b++]<<8|a[b++]<<16|a[b++]<<24)>>>0;this.z=(a[b++]|a[b++]<<8|a[b++]<<16|a[b++]<<24)>>>0;this.J=(a[b++]|a[b++]<<8|a[b++]<<16|a[b++]<<24)>>>0;this.h=a[b++]|a[b++]<<8;this.g=a[b++]|a[b++]<<8;this.filename=
String.fromCharCode.apply(null,w?a.subarray(b,b+=this.h):a.slice(b,b+=this.h));this.Y=w?a.subarray(b,b+=this.g):a.slice(b,b+=this.g);this.length=b-this.offset};
function $(a){var b=[],c={},d,f,h,k;if(!a.i){if(a.o===q){var e=a.input,g;if(!a.D)a:{var l=a.input,p;for(p=l.length-12;0<p;--p)if(l[p]===Z[0]&&l[p+1]===Z[1]&&l[p+2]===Z[2]&&l[p+3]===Z[3]){a.D=p;break a}m(Error("End of Central Directory Record not found"))}g=a.D;(e[g++]!==Z[0]||e[g++]!==Z[1]||e[g++]!==Z[2]||e[g++]!==Z[3])&&m(Error("invalid signature"));a.ia=e[g++]|e[g++]<<8;a.ka=e[g++]|e[g++]<<8;a.la=e[g++]|e[g++]<<8;a.ba=e[g++]|e[g++]<<8;a.R=(e[g++]|e[g++]<<8|e[g++]<<16|e[g++]<<24)>>>0;a.o=(e[g++]|
e[g++]<<8|e[g++]<<16|e[g++]<<24)>>>0;a.w=e[g++]|e[g++]<<8;a.v=w?e.subarray(g,g+a.w):e.slice(g,g+a.w)}d=a.o;h=0;for(k=a.ba;h<k;++h)f=new oa(a.input,d),f.parse(),d+=f.length,b[h]=f,c[f.filename]=h;a.R<d-a.o&&m(Error("invalid file header size"));a.i=b;a.G=c}}u=W.prototype;u.Z=function(){var a=[],b,c,d;this.i||$(this);d=this.i;b=0;for(c=d.length;b<c;++b)a[b]=d[b].filename;return a};
u.r=function(a,b){var c;this.G||$(this);c=this.G[a];c===q&&m(Error(a+" not found"));var d;d=b||{};var f=this.input,h=this.i,k,e,g,l,p,s,r,A;h||$(this);h[c]===q&&m(Error("wrong index"));e=h[c].aa;k=new pa(this.input,e);k.parse();e+=k.length;g=k.z;if(0!==(k.I&qa.O)){!d.password&&!this.j&&m(Error("please set password"));s=this.T(d.password||this.j);r=e;for(A=e+12;r<A;++r)ra(this,s,f[r]);e+=12;g-=12;r=e;for(A=e+g;r<A;++r)f[r]=ra(this,s,f[r])}switch(k.A){case na.P:l=w?this.input.subarray(e,e+g):this.input.slice(e,
e+g);break;case na.N:l=(new F(this.input,{index:e,bufferSize:k.J})).r();break;default:m(Error("unknown compression type"))}if(this.ca){var t=q,n,N="number"===typeof t?t:t=0,ka=l.length;n=-1;for(N=ka&7;N--;++t)n=n>>>8^B[(n^l[t])&255];for(N=ka>>3;N--;t+=8)n=n>>>8^B[(n^l[t])&255],n=n>>>8^B[(n^l[t+1])&255],n=n>>>8^B[(n^l[t+2])&255],n=n>>>8^B[(n^l[t+3])&255],n=n>>>8^B[(n^l[t+4])&255],n=n>>>8^B[(n^l[t+5])&255],n=n>>>8^B[(n^l[t+6])&255],n=n>>>8^B[(n^l[t+7])&255];p=(n^4294967295)>>>0;k.p!==p&&m(Error("wrong crc: file=0x"+
k.p.toString(16)+", data=0x"+p.toString(16)))}return l};u.M=function(a){this.j=a};function ra(a,b,c){c^=a.s(b);a.k(b,c);return c}u.k=V.prototype.k;u.T=V.prototype.U;u.s=V.prototype.s;v("Zlib.Unzip",W);v("Zlib.Unzip.prototype.decompress",W.prototype.r);v("Zlib.Unzip.prototype.getFilenames",W.prototype.Z);v("Zlib.Unzip.prototype.setPassword",W.prototype.M);}).call(this);

/** @license zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License */(function() {'use strict';function n(e){throw e;}var q=void 0,aa=this;function r(e,c){var d=e.split("."),b=aa;!(d[0]in b)&&b.execScript&&b.execScript("var "+d[0]);for(var a;d.length&&(a=d.shift());)!d.length&&c!==q?b[a]=c:b=b[a]?b[a]:b[a]={}};var u="undefined"!==typeof Uint8Array&&"undefined"!==typeof Uint16Array&&"undefined"!==typeof Uint32Array&&"undefined"!==typeof DataView;new (u?Uint8Array:Array)(256);var v;for(v=0;256>v;++v)for(var w=v,ba=7,w=w>>>1;w;w>>>=1)--ba;function x(e,c,d){var b,a="number"===typeof c?c:c=0,f="number"===typeof d?d:e.length;b=-1;for(a=f&7;a--;++c)b=b>>>8^z[(b^e[c])&255];for(a=f>>3;a--;c+=8)b=b>>>8^z[(b^e[c])&255],b=b>>>8^z[(b^e[c+1])&255],b=b>>>8^z[(b^e[c+2])&255],b=b>>>8^z[(b^e[c+3])&255],b=b>>>8^z[(b^e[c+4])&255],b=b>>>8^z[(b^e[c+5])&255],b=b>>>8^z[(b^e[c+6])&255],b=b>>>8^z[(b^e[c+7])&255];return(b^4294967295)>>>0}
var A=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,
2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,
2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,
2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,
3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,
936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],z=u?new Uint32Array(A):A;function B(){}B.prototype.getName=function(){return this.name};B.prototype.getData=function(){return this.data};B.prototype.H=function(){return this.I};r("Zlib.GunzipMember",B);r("Zlib.GunzipMember.prototype.getName",B.prototype.getName);r("Zlib.GunzipMember.prototype.getData",B.prototype.getData);r("Zlib.GunzipMember.prototype.getMtime",B.prototype.H);function D(e){var c=e.length,d=0,b=Number.POSITIVE_INFINITY,a,f,g,k,m,p,t,h,l,y;for(h=0;h<c;++h)e[h]>d&&(d=e[h]),e[h]<b&&(b=e[h]);a=1<<d;f=new (u?Uint32Array:Array)(a);g=1;k=0;for(m=2;g<=d;){for(h=0;h<c;++h)if(e[h]===g){p=0;t=k;for(l=0;l<g;++l)p=p<<1|t&1,t>>=1;y=g<<16|h;for(l=p;l<a;l+=m)f[l]=y;++k}++g;k<<=1;m<<=1}return[f,d,b]};var E=[],F;for(F=0;288>F;F++)switch(!0){case 143>=F:E.push([F+48,8]);break;case 255>=F:E.push([F-144+400,9]);break;case 279>=F:E.push([F-256+0,7]);break;case 287>=F:E.push([F-280+192,8]);break;default:n("invalid literal: "+F)}
var ca=function(){function e(a){switch(!0){case 3===a:return[257,a-3,0];case 4===a:return[258,a-4,0];case 5===a:return[259,a-5,0];case 6===a:return[260,a-6,0];case 7===a:return[261,a-7,0];case 8===a:return[262,a-8,0];case 9===a:return[263,a-9,0];case 10===a:return[264,a-10,0];case 12>=a:return[265,a-11,1];case 14>=a:return[266,a-13,1];case 16>=a:return[267,a-15,1];case 18>=a:return[268,a-17,1];case 22>=a:return[269,a-19,2];case 26>=a:return[270,a-23,2];case 30>=a:return[271,a-27,2];case 34>=a:return[272,
a-31,2];case 42>=a:return[273,a-35,3];case 50>=a:return[274,a-43,3];case 58>=a:return[275,a-51,3];case 66>=a:return[276,a-59,3];case 82>=a:return[277,a-67,4];case 98>=a:return[278,a-83,4];case 114>=a:return[279,a-99,4];case 130>=a:return[280,a-115,4];case 162>=a:return[281,a-131,5];case 194>=a:return[282,a-163,5];case 226>=a:return[283,a-195,5];case 257>=a:return[284,a-227,5];case 258===a:return[285,a-258,0];default:n("invalid length: "+a)}}var c=[],d,b;for(d=3;258>=d;d++)b=e(d),c[d]=b[2]<<24|b[1]<<
16|b[0];return c}();u&&new Uint32Array(ca);function G(e,c){this.i=[];this.j=32768;this.d=this.f=this.c=this.n=0;this.input=u?new Uint8Array(e):e;this.o=!1;this.k=H;this.z=!1;if(c||!(c={}))c.index&&(this.c=c.index),c.bufferSize&&(this.j=c.bufferSize),c.bufferType&&(this.k=c.bufferType),c.resize&&(this.z=c.resize);switch(this.k){case I:this.a=32768;this.b=new (u?Uint8Array:Array)(32768+this.j+258);break;case H:this.a=0;this.b=new (u?Uint8Array:Array)(this.j);this.e=this.F;this.q=this.B;this.l=this.D;break;default:n(Error("invalid inflate mode"))}}
var I=0,H=1;
G.prototype.g=function(){for(;!this.o;){var e=J(this,3);e&1&&(this.o=!0);e>>>=1;switch(e){case 0:var c=this.input,d=this.c,b=this.b,a=this.a,f=c.length,g=q,k=q,m=b.length,p=q;this.d=this.f=0;d+1>=f&&n(Error("invalid uncompressed block header: LEN"));g=c[d++]|c[d++]<<8;d+1>=f&&n(Error("invalid uncompressed block header: NLEN"));k=c[d++]|c[d++]<<8;g===~k&&n(Error("invalid uncompressed block header: length verify"));d+g>c.length&&n(Error("input buffer is broken"));switch(this.k){case I:for(;a+g>b.length;){p=
m-a;g-=p;if(u)b.set(c.subarray(d,d+p),a),a+=p,d+=p;else for(;p--;)b[a++]=c[d++];this.a=a;b=this.e();a=this.a}break;case H:for(;a+g>b.length;)b=this.e({t:2});break;default:n(Error("invalid inflate mode"))}if(u)b.set(c.subarray(d,d+g),a),a+=g,d+=g;else for(;g--;)b[a++]=c[d++];this.c=d;this.a=a;this.b=b;break;case 1:this.l(da,ea);break;case 2:fa(this);break;default:n(Error("unknown BTYPE: "+e))}}return this.q()};
var K=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],L=u?new Uint16Array(K):K,N=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,258,258],O=u?new Uint16Array(N):N,P=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0],Q=u?new Uint8Array(P):P,R=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],ga=u?new Uint16Array(R):R,ha=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,
13,13],U=u?new Uint8Array(ha):ha,V=new (u?Uint8Array:Array)(288),W,ia;W=0;for(ia=V.length;W<ia;++W)V[W]=143>=W?8:255>=W?9:279>=W?7:8;var da=D(V),X=new (u?Uint8Array:Array)(30),Y,ja;Y=0;for(ja=X.length;Y<ja;++Y)X[Y]=5;var ea=D(X);function J(e,c){for(var d=e.f,b=e.d,a=e.input,f=e.c,g=a.length,k;b<c;)f>=g&&n(Error("input buffer is broken")),d|=a[f++]<<b,b+=8;k=d&(1<<c)-1;e.f=d>>>c;e.d=b-c;e.c=f;return k}
function Z(e,c){for(var d=e.f,b=e.d,a=e.input,f=e.c,g=a.length,k=c[0],m=c[1],p,t;b<m&&!(f>=g);)d|=a[f++]<<b,b+=8;p=k[d&(1<<m)-1];t=p>>>16;e.f=d>>t;e.d=b-t;e.c=f;return p&65535}
function fa(e){function c(a,c,b){var d,e=this.w,f,g;for(g=0;g<a;)switch(d=Z(this,c),d){case 16:for(f=3+J(this,2);f--;)b[g++]=e;break;case 17:for(f=3+J(this,3);f--;)b[g++]=0;e=0;break;case 18:for(f=11+J(this,7);f--;)b[g++]=0;e=0;break;default:e=b[g++]=d}this.w=e;return b}var d=J(e,5)+257,b=J(e,5)+1,a=J(e,4)+4,f=new (u?Uint8Array:Array)(L.length),g,k,m,p;for(p=0;p<a;++p)f[L[p]]=J(e,3);if(!u){p=a;for(a=f.length;p<a;++p)f[L[p]]=0}g=D(f);k=new (u?Uint8Array:Array)(d);m=new (u?Uint8Array:Array)(b);e.w=
0;e.l(D(c.call(e,d,g,k)),D(c.call(e,b,g,m)))}G.prototype.l=function(e,c){var d=this.b,b=this.a;this.r=e;for(var a=d.length-258,f,g,k,m;256!==(f=Z(this,e));)if(256>f)b>=a&&(this.a=b,d=this.e(),b=this.a),d[b++]=f;else{g=f-257;m=O[g];0<Q[g]&&(m+=J(this,Q[g]));f=Z(this,c);k=ga[f];0<U[f]&&(k+=J(this,U[f]));b>=a&&(this.a=b,d=this.e(),b=this.a);for(;m--;)d[b]=d[b++-k]}for(;8<=this.d;)this.d-=8,this.c--;this.a=b};
G.prototype.D=function(e,c){var d=this.b,b=this.a;this.r=e;for(var a=d.length,f,g,k,m;256!==(f=Z(this,e));)if(256>f)b>=a&&(d=this.e(),a=d.length),d[b++]=f;else{g=f-257;m=O[g];0<Q[g]&&(m+=J(this,Q[g]));f=Z(this,c);k=ga[f];0<U[f]&&(k+=J(this,U[f]));b+m>a&&(d=this.e(),a=d.length);for(;m--;)d[b]=d[b++-k]}for(;8<=this.d;)this.d-=8,this.c--;this.a=b};
G.prototype.e=function(){var e=new (u?Uint8Array:Array)(this.a-32768),c=this.a-32768,d,b,a=this.b;if(u)e.set(a.subarray(32768,e.length));else{d=0;for(b=e.length;d<b;++d)e[d]=a[d+32768]}this.i.push(e);this.n+=e.length;if(u)a.set(a.subarray(c,c+32768));else for(d=0;32768>d;++d)a[d]=a[c+d];this.a=32768;return a};
G.prototype.F=function(e){var c,d=this.input.length/this.c+1|0,b,a,f,g=this.input,k=this.b;e&&("number"===typeof e.t&&(d=e.t),"number"===typeof e.A&&(d+=e.A));2>d?(b=(g.length-this.c)/this.r[2],f=258*(b/2)|0,a=f<k.length?k.length+f:k.length<<1):a=k.length*d;u?(c=new Uint8Array(a),c.set(k)):c=k;return this.b=c};
G.prototype.q=function(){var e=0,c=this.b,d=this.i,b,a=new (u?Uint8Array:Array)(this.n+(this.a-32768)),f,g,k,m;if(0===d.length)return u?this.b.subarray(32768,this.a):this.b.slice(32768,this.a);f=0;for(g=d.length;f<g;++f){b=d[f];k=0;for(m=b.length;k<m;++k)a[e++]=b[k]}f=32768;for(g=this.a;f<g;++f)a[e++]=c[f];this.i=[];return this.buffer=a};
G.prototype.B=function(){var e,c=this.a;u?this.z?(e=new Uint8Array(c),e.set(this.b.subarray(0,c))):e=this.b.subarray(0,c):(this.b.length>c&&(this.b.length=c),e=this.b);return this.buffer=e};function $(e){this.input=e;this.c=0;this.m=[];this.s=!1}$.prototype.G=function(){this.s||this.g();return this.m.slice()};
$.prototype.g=function(){for(var e=this.input.length;this.c<e;){var c=new B,d=q,b=q,a=q,f=q,g=q,k=q,m=q,p=q,t=q,h=this.input,l=this.c;c.u=h[l++];c.v=h[l++];(31!==c.u||139!==c.v)&&n(Error("invalid file signature:"+c.u+","+c.v));c.p=h[l++];switch(c.p){case 8:break;default:n(Error("unknown compression method: "+c.p))}c.h=h[l++];p=h[l++]|h[l++]<<8|h[l++]<<16|h[l++]<<24;c.I=new Date(1E3*p);c.O=h[l++];c.N=h[l++];0<(c.h&4)&&(c.J=h[l++]|h[l++]<<8,l+=c.J);if(0<(c.h&8)){m=[];for(k=0;0<(g=h[l++]);)m[k++]=String.fromCharCode(g);
c.name=m.join("")}if(0<(c.h&16)){m=[];for(k=0;0<(g=h[l++]);)m[k++]=String.fromCharCode(g);c.K=m.join("")}0<(c.h&2)&&(c.C=x(h,0,l)&65535,c.C!==(h[l++]|h[l++]<<8)&&n(Error("invalid header crc16")));d=h[h.length-4]|h[h.length-3]<<8|h[h.length-2]<<16|h[h.length-1]<<24;h.length-l-4-4<512*d&&(f=d);b=new G(h,{index:l,bufferSize:f});c.data=a=b.g();l=b.c;c.L=t=(h[l++]|h[l++]<<8|h[l++]<<16|h[l++]<<24)>>>0;x(a,q,q)!==t&&n(Error("invalid CRC-32 checksum: 0x"+x(a,q,q).toString(16)+" / 0x"+t.toString(16)));c.M=
d=(h[l++]|h[l++]<<8|h[l++]<<16|h[l++]<<24)>>>0;(a.length&4294967295)!==d&&n(Error("invalid input size: "+(a.length&4294967295)+" / "+d));this.m.push(c);this.c=l}this.s=!0;var y=this.m,s,M,S=0,T=0,C;s=0;for(M=y.length;s<M;++s)T+=y[s].data.length;if(u){C=new Uint8Array(T);for(s=0;s<M;++s)C.set(y[s].data,S),S+=y[s].data.length}else{C=[];for(s=0;s<M;++s)C[s]=y[s].data;C=Array.prototype.concat.apply([],C)}return C};r("Zlib.Gunzip",$);r("Zlib.Gunzip.prototype.decompress",$.prototype.g);r("Zlib.Gunzip.prototype.getMembers",$.prototype.G);}).call(this);

}).bind(elFinder)();

} catch(e) {};

/*
 * File: /js/commands/reload.js
 */

/**
 * @class  elFinder command "reload"
 * Sync files and folders
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.reload = function() {
	var self   = this,
		search = false;
	
	this.alwaysEnabled = true;
	this.updateOnSelect = true;
	
	this.shortcuts = [{
		pattern     : 'ctrl+shift+r f5'
	}];
	
	this.getstate = function() {
		return 0;
	};
	
	this.init = function() {
		this.fm.bind('search searchend', function(e) {
			search = e.type == 'search';
		});
	};
	
	this.fm.bind('contextmenu', function(e){
		var fm = self.fm;
		if (fm.options.sync >= 1000) {
			self.extra = {
				icon: 'accept',
				node: $('<span/>')
					.attr({title: fm.i18n('autoSync')})
					.on('click touchstart', function(e){
						if (e.type === 'touchstart' && e.originalEvent.touches.length > 1) {
							return;
						}
						e.stopPropagation();
						e.preventDefault();
						$(this).parent()
							.toggleClass('ui-state-disabled', fm.options.syncStart)
							.parent().removeClass('ui-state-hover');
						fm.options.syncStart = !fm.options.syncStart;
						fm.autoSync(fm.options.syncStart? null : 'stop');
					}).on('ready', function(){
						$(this).parent().toggleClass('ui-state-disabled', !fm.options.syncStart).css('pointer-events', 'auto');
					})
			};
		}
	});
	
	this.exec = function() {
		var fm = this.fm;
		if (!search) {
			var dfrd    = fm.sync(),
				timeout = setTimeout(function() {
					fm.notify({type : 'reload', cnt : 1, hideCnt : true});
					dfrd.always(function() { fm.notify({type : 'reload', cnt  : -1}); });
				}, fm.notifyDelay);
				
			return dfrd.always(function() { 
				clearTimeout(timeout); 
				fm.trigger('reload');
			});
		} else {
			$('div.elfinder-toolbar > div.'+fm.res('class', 'searchbtn') + ' > span.ui-icon-search').click();
		}
	};

};


/*
 * File: /js/commands/rename.js
 */

/**
 * @class elFinder command "rename". 
 * Rename selected file.
 *
 * @author Dmitry (dio) Levashov, dio@std42.ru
 **/
elFinder.prototype.commands.rename = function() {
	
	this.shortcuts = [{
		pattern     : 'f2'+(this.fm.OS == 'mac' ? ' enter' : '')
	}];
	
	this.getstate = function(sel) {
		var sel = this.files(sel);

		return !this._disabled && sel.length == 1 && sel[0].phash && !sel[0].locked  ? 0 : -1;
	};
	
	this.exec = function(hashes, opts) {
		var fm       = this.fm,
			cwd      = fm.getUI('cwd'),
			sel      = hashes || (fm.selected().length? fm.selected() : false) || [fm.cwd().hash],
			cnt      = sel.length,
			file     = fm.file(sel.shift()),
			filename = '.elfinder-cwd-filename',
			opts     = opts || {},
			incwd    = (fm.cwd().hash == file.hash),
			type     = opts._currentType? opts._currentType : (incwd? 'navbar' : 'files'),
			navbar   = (type === 'navbar'),
			target   = $('#'+fm[navbar? 'navHash2Id' : 'cwdHash2Id'](file.hash)),
			tarea    = (type === 'files' && fm.storage('view') != 'list'),
			rest     = function(){
				if (!overlay.is(':hidden')) {
					overlay.addClass('ui-front')
						.elfinderoverlay('hide')
						.off('click', cancel);
				}
				pnode.removeClass('ui-front').css('position', '');
				if (tarea) {
					node.css('max-height', '');
				} else if (!navbar) {
					pnode.css('width', '')
						.parent('td').css('overflow', '');
				}
			}, colwidth,
			dfrd     = $.Deferred()
				.done(function(data){
					incwd && fm.exec('open', data.added[0].hash);
				})
				.fail(function(error) {
					var parent = input.parent(),
						name   = fm.escape(file.name);

					if (tarea) {
						name = name.replace(/([_.])/g, '&#8203;$1');
					}
					if (navbar) {
						input.replaceWith(name);
					} else {
						if (parent.length) {
							input.remove();
							parent.html(name);
						} else {
							//cwd.find('#'+fm.cwdHash2Id(file.hash)).find(filename).html(name);
							target.find(filename).html(name);
							setTimeout(function() {
								cwd.find('#'+fm.cwdHash2Id(file.hash)).click();
							}, 50);
						}
					}
					
					error && fm.error(error);
				})
				.always(function() {
					rest();
					fm.unbind('resize', resize);
					fm.enable();
				}),
			input = $(tarea? '<textarea/>' : '<input type="text"/>')
				.on('keyup text', function(){
					if (tarea) {
						this.style.height = '1px';
						this.style.height = this.scrollHeight + 'px';
					} else if (colwidth) {
						this.style.width = colwidth + 'px';
						if (this.scrollWidth > colwidth) {
							this.style.width = this.scrollWidth + 10 + 'px';
						}
					}
				})
				.keydown(function(e) {
					e.stopImmediatePropagation();
					if (e.keyCode == $.ui.keyCode.ESCAPE) {
						dfrd.reject();
					} else if (e.keyCode == $.ui.keyCode.ENTER) {
						e.preventDefault();
						input.blur();
					}
				})
				.mousedown(function(e) {
					e.stopPropagation();
				})
				.click(function(e) { // for touch device
					e.stopPropagation();
				})
				.dblclick(function(e) {
					e.stopPropagation();
					e.preventDefault();
				})
				.blur(function() {
					var name   = $.trim(input.val()),
						parent = input.parent(),
						valid  = true;

					if (!inError && pnode.length) {
						if (input[0].setSelectionRange) {
							input[0].setSelectionRange(0, 0)
						}
						if (name == file.name) {
							return dfrd.reject();
						}
						if (fm.options.validName && fm.options.validName.test) {
							try {
								valid = fm.options.validName.test(name);
							} catch(e) {
								valid = false;
							}
						}
						if (!name || name === '..' || !valid) {
							inError = true;
							fm.error('errInvName', {modal: true, close: select});
							return false;
						}
						if (fm.fileByName(name, file.phash)) {
							inError = true;
							fm.error(['errExists', name], {modal: true, close: select});
							return false;
						}
						
						rest();
						(navbar? pnode : node).html(fm.escape(name));
						fm.lockfiles({files : [file.hash]});
						fm.request({
								data   : {cmd : 'rename', target : file.hash, name : name},
								notify : {type : 'rename', cnt : 1}
							})
							.fail(function(error) {
								dfrd.reject();
								fm.sync();
							})
							.done(function(data) {
								dfrd.resolve(data);
								if (!navbar && data && data.added && data.added[0]) {
									var newItem = cwd.find('#'+fm.cwdHash2Id(data.added[0].hash));
									if (newItem.length) {
										newItem.trigger('scrolltoview');
									}
								}
							})
							.always(function() {
								fm.unlockfiles({files : [file.hash]})
							});
						
					}
				}),
			select = function() {
				var name = input.val().replace(/\.((tar\.(gz|bz|bz2|z|lzo))|cpio\.gz|ps\.gz|xcf\.(gz|bz2)|[a-z0-9]{1,4})$/ig, '');
				inError = false;
				if (fm.UA.Mobile) {
					overlay.on('click', cancel)
						.removeClass('ui-front').elfinderoverlay('show');
				}
				input.select().focus();
				input[0].setSelectionRange && input[0].setSelectionRange(0, name.length);
			},
			node = navbar? target.contents().filter(function(){ return this.nodeType==3 && $(this).parent().attr('id') === fm.navHash2Id(file.hash); })
					: target.find(filename),
			pnode = node.parent(),
			overlay = fm.getUI().children('.elfinder-overlay'),
			cancel = function(e) { 
				if (! inError) {
					e.stopPropagation();
					dfrd.reject();
				}
			},
			resize = function() {
				target.trigger('scrolltoview');
			},
			inError = false;
		
		pnode.addClass('ui-front').css('position', 'relative');
		fm.bind('resize', resize);
		if (navbar) {
			node.replaceWith(input.val(file.name));
		} else {
			if (tarea) {
				node.css('max-height', 'none');
			} else if (!navbar) {
				colwidth = pnode.width();
				pnode.width(colwidth - 15)
					.parent('td').css('overflow', 'visible');
			}
			node.empty().append(input.val(file.name));
		}
		
		if (cnt > 1 || this.getstate([file.hash]) < 0) {
			return dfrd.reject();
		}
		
		if (!file || !node.length) {
			return dfrd.reject('errCmdParams', this.title);
		}
		
		if (file.locked) {
			return dfrd.reject(['errLocked', file.name]);
		}
		
		fm.one('select', function() {
			input.parent().length && file && $.inArray(file.hash, fm.selected()) === -1 && input.blur();
		})
		
		input.trigger('keyup');
		
		select();
		
		return dfrd;
	};

};


/*
 * File: /js/commands/resize.js
 */

/**
 * @class  elFinder command "resize"
 * Open dialog to resize image
 *
 * @author Dmitry (dio) Levashov
 * @author Alexey Sukhotin
 * @author Naoki Sawada
 * @author Sergio Jovani
 **/
elFinder.prototype.commands.resize = function() {

	this.updateOnSelect = false;
	
	this.getstate = function() {
		var sel = this.fm.selectedFiles();
		return !this._disabled && sel.length == 1 && sel[0].read && sel[0].write && sel[0].mime.indexOf('image/') !== -1 ? 0 : -1;
	};
	
	this.exec = function(hashes) {
		var fm    = this.fm,
			files = this.files(hashes),
			dfrd  = $.Deferred(),
			api2  = (fm.api > 1),
			
			open = function(file, id) {
				var isJpeg   = (file.mime === 'image/jpeg'),
					dialog   = $('<div class="elfinder-dialog-resize"/>'),
					input    = '<input type="text" size="5"/>',
					row      = '<div class="elfinder-resize-row"/>',
					label    = '<div class="elfinder-resize-label"/>',
					control  = $('<div class="elfinder-resize-control"/>'),
					preview  = $('<div class="ui-front elfinder-resize-preview"/>'),
					spinner  = $('<div class="elfinder-resize-spinner">'+fm.i18n('ntfloadimg')+'</div>'),
					rhandle  = $('<div class="elfinder-resize-handle touch-punch"/>'),
					rhandlec = $('<div class="elfinder-resize-handle touch-punch"/>'),
					uiresize = $('<div class="elfinder-resize-uiresize"/>'),
					uicrop   = $('<div class="elfinder-resize-uicrop"/>'),
					uibuttonset = '<div class="ui-widget-content ui-corner-all elfinder-buttonset"/>',
					uibutton    = '<div class="ui-state-default elfinder-button"/>',
					uiseparator = '<span class="ui-widget-content elfinder-toolbar-button-separator"/>',
					uirotate    = $('<div class="elfinder-resize-rotate"/>'),
					uideg270    = $(uibutton).attr('title',fm.i18n('rotate-cw')).append($('<span class="elfinder-button-icon elfinder-button-icon-rotate-l"/>')
						.click(function(){
							rdegree = rdegree - 90;
							rotate.update(rdegree);
						})),
					uideg90     = $(uibutton).attr('title',fm.i18n('rotate-ccw')).append($('<span class="elfinder-button-icon elfinder-button-icon-rotate-r"/>')
						.click(function(){
							rdegree = rdegree + 90;
							rotate.update(rdegree);
						})),
					uiprop   = $('<span />'),
					reset    = $('<div class="ui-state-default ui-corner-all elfinder-resize-reset"><span class="ui-icon ui-icon-arrowreturnthick-1-w"/></div>'),
					uitype   = $('<div class="elfinder-resize-type"/>')
						.append('<input class="" type="radio" name="type" id="'+id+'-resize" value="resize" checked="checked" /><label for="'+id+'-resize">'+fm.i18n('resize')+'</label>',
						'<input class="api2" type="radio" name="type" id="'+id+'-crop" value="crop" /><label class="api2" for="'+id+'-crop">'+fm.i18n('crop')+'</label>',
						'<input class="api2" type="radio" name="type" id="'+id+'-rotate" value="rotate" /><label class="api2" for="'+id+'-rotate">'+fm.i18n('rotate')+'</label>'),
					type     = $('input', uitype).attr('disabled', 'disabled')
						.change(function() {
							var val = $('input:checked', uitype).val();
							
							resetView();
							resizable(true);
							croppable(true);
							rotateable(true);
							
							if (val == 'resize') {
								uiresize.show();
								uirotate.hide();
								uicrop.hide();
								resizable();
							}
							else if (val == 'crop') {
								uirotate.hide();
								uiresize.hide();
								uicrop.show();
								croppable();
							} else if (val == 'rotate') {
								uiresize.hide();
								uicrop.hide();
								uirotate.show();
								rotateable();
							}
						}),
					constr  = $('<input type="checkbox" checked="checked"/>')
						.change(function() {
							cratio = !!constr.prop('checked');
							resize.fixHeight();
							resizable(true);
							resizable();
						}),
					width   = $(input)
						.change(function() {
							var w = parseInt(width.val()),
								h = parseInt(cratio ? Math.round(w/ratio) : height.val());

							if (w > 0 && h > 0) {
								resize.updateView(w, h);
								height.val(h);
							}
						}),
					height  = $(input)
						.change(function() {
							var h = parseInt(height.val()),
								w = parseInt(cratio ? Math.round(h*ratio) : width.val());

							if (w > 0 && h > 0) {
								resize.updateView(w, h);
								width.val(w);
							}
						}),
					pointX  = $(input).change(function(){crop.updateView();}),
					pointY  = $(input).change(function(){crop.updateView();}),
					offsetX = $(input).change(function(){crop.updateView();}),
					offsetY = $(input).change(function(){crop.updateView();}),
					quality = isJpeg && api2?
						$(input).val(fm.option('jpgQuality'))
							.addClass('quality')
							.on('blur', function(){
								var q = Math.min(100, Math.max(1, parseInt(this.value)));
								dialog.find('input.quality').val(q);
							})
						: null,
					degree = $('<input type="text" size="3" maxlength="3" value="0" />')
						.change(function() {
							rotate.update();
						}),
					uidegslider = $('<div class="elfinder-resize-rotate-slider"/>')
						.slider({
							min: 0,
							max: 360,
							value: degree.val(),
							animate: true,
							change: function(event, ui) {
								if (ui.value != uidegslider.slider('value')) {
									rotate.update(ui.value);
								}
							},
							slide: function(event, ui) {
								rotate.update(ui.value, false);
							}
						}),
					ratio   = 1,
					prop    = 1,
					owidth  = 0,
					oheight = 0,
					cratio  = true,
					pwidth  = 0,
					pheight = 0,
					rwidth  = 0,
					rheight = 0,
					rdegree = 0,
					img     = $('<img/>')
						.load(function() {
							var r_scale, inputFirst,
								imgRatio = img.height() / img.width();
							
							if (imgRatio < 1 && preview.height() > preview.width() * imgRatio) {
								preview.height(preview.width() * imgRatio);
							}
							
							if (preview.height() > img.height() + 20) {
								preview.height(img.height() + 20);
							}
							
							pheight = preview.height() - (rhandle.outerHeight() - rhandle.height());
							
							spinner.remove();
							
							owidth  = img.width();
							oheight = img.height();
							ratio   = owidth/oheight;
							resize.updateView(owidth, oheight);

							rhandle.append(img.show()).show();
							width.val(owidth);
							height.val(oheight);
							
							r_scale = Math.min(pwidth, pheight) / Math.sqrt(Math.pow(owidth, 2) + Math.pow(oheight, 2));
							rwidth = owidth * r_scale;
							rheight = oheight * r_scale;
							
							type.button('enable');
							inputFirst = control.find('input,select').removeAttr('disabled')
								.filter(':text').keydown(function(e) {
									var c = e.keyCode, i;

									e.stopPropagation();
								
									if ((c >= 37 && c <= 40) 
									|| c == $.ui.keyCode.BACKSPACE 
									|| c == $.ui.keyCode.DELETE 
									|| (c == 65 && (e.ctrlKey||e.metaKey))
									|| c == 27) {
										return;
									}
								
									if (c == 9) {
										i = $(this).parent()[e.shiftKey ? 'prevAll' : 'nextAll']('div.elfinder-resize-row').children(':text');

										if (i.length) {
											i[0].focus();
										} else {
											$(this).parent().parent().find(':text:' + (e.shiftKey ? 'last' : 'first')).focus();
										}
									}
								
									if (c == 13) {
										fm.confirm({
											title  : $('input:checked', uitype).val(),
											text   : 'confirmReq',
											accept : {
												label    : 'btnApply',
												callback : function() {  
													save();
												}
											},
											cancel : {
												label    : 'btnCancel',
												callback : function(){}
											}
										});
										return;
									}
								
									if (!((c >= 48 && c <= 57) || (c >= 96 && c <= 105))) {
										e.preventDefault();
									}
								})
								.filter(':first');
								
							!fm.UA.Mobile && inputFirst.focus();
							resizable();
							
							reset.hover(function() { reset.toggleClass('ui-state-hover'); }).click(resetView);
							
						})
						.error(function() {
							spinner.text('Unable to load image').css('background', 'transparent');
						}),
					basec = $('<div/>'),
					imgc = $('<img/>'),
					coverc = $('<div/>'),
					imgr = $('<img/>'),
					round = function(v) {
						return isJpeg? Math.round(v/8)*8 : Math.round(v);
					},
					resetView = function() {
						width.val(owidth);
						height.val(oheight);
						resize.updateView(owidth, oheight);
					},
					resize = {
						update : function() {
							width.val(round(img.width()/prop));
							height.val(round(img.height()/prop));
						},
						
						updateView : function(w, h) {
							if (w > pwidth || h > pheight) {
								if (w / pwidth > h / pheight) {
									prop = pwidth / w;
									img.width(pwidth).height(Math.ceil(h*prop));
								} else {
									prop = pheight / h;
									img.height(pheight).width(Math.ceil(w*prop));
								}
							} else {
								img.width(w).height(h);
							}
							
							prop = img.width()/w;
							uiprop.text('1 : '+(1/prop).toFixed(2));
							resize.updateHandle();
						},
						
						updateHandle : function() {
							rhandle.width(img.width()).height(img.height());
						},
						fixHeight : function() {
							var w, h;
							if (cratio) {
								w = width.val();
								h = Math.round(w/ratio);
								resize.updateView(w, h);
								height.val(h);
							}
						}
					},
					crop = {
						update : function() {
							offsetX.val(round((rhandlec.data('w')||rhandlec.width())/prop));
							offsetY.val(round((rhandlec.data('h')||rhandlec.height())/prop));
							pointX.val(Math.round(((rhandlec.data('x')||rhandlec.offset().left)-imgc.offset().left)/prop));
							pointY.val(Math.round(((rhandlec.data('y')||rhandlec.offset().top)-imgc.offset().top)/prop));
						},
						updateView : function() {
							var x = parseInt(pointX.val()) * prop + imgc.offset().left;
							var y = parseInt(pointY.val()) * prop + imgc.offset().top;
							var w = offsetX.val() * prop;
							var h = offsetY.val() * prop;
							rhandlec.data({x: x, y: y, w: w, h: h})
								.width(Math.round(w))
								.height(Math.round(h))
								.offset({left: Math.round(x), top: Math.round(y)});
							coverc.width(rhandlec.width())
								.height(rhandlec.height());
						},
						resize_update : function() {
							rhandlec.data({w: null, h: null});
							crop.update();
							coverc.width(rhandlec.width())
								.height(rhandlec.height());
						},
						drag_update : function() {
							rhandlec.data({x: null, y: null});
							crop.update();
						}
					},
					rotate = {
						mouseStartAngle : 0,
						imageStartAngle : 0,
						imageBeingRotated : false,
							
						update : function(value, animate) {
							if (typeof value == 'undefined') {
								rdegree = value = parseInt(degree.val());
							}
							if (typeof animate == 'undefined') {
								animate = true;
							}
							if (! animate || fm.UA.Opera || fm.UA.ltIE8) {
								imgr.rotate(value);
							} else {
								imgr.animate({rotate: value + 'deg'});
							}
							value = value % 360;
							if (value < 0) {
								value += 360;
							}
							degree.val(parseInt(value));

							uidegslider.slider('value', degree.val());
						},
						
						execute : function ( e ) {
							
							if ( !rotate.imageBeingRotated ) return;
							
							var imageCentre = rotate.getCenter( imgr );
							var mouseXFromCentre = e.pageX - imageCentre[0];
							var mouseYFromCentre = e.pageY - imageCentre[1];
							var mouseAngle = Math.atan2( mouseYFromCentre, mouseXFromCentre );
							
							var rotateAngle = mouseAngle - rotate.mouseStartAngle + rotate.imageStartAngle;
							rotateAngle = Math.round(parseFloat(rotateAngle) * 180 / Math.PI);
							
							if ( e.shiftKey ) {
								rotateAngle = Math.round((rotateAngle + 6)/15) * 15;
							}
							
							imgr.rotate(rotateAngle);
							
							rotateAngle = rotateAngle % 360;
							if (rotateAngle < 0) {
								rotateAngle += 360;
							}
							degree.val(rotateAngle);

							uidegslider.slider('value', degree.val());
							
							return false;
						},
						
						start : function ( e ) {
							
							rotate.imageBeingRotated = true;
							
							var imageCentre = rotate.getCenter( imgr );
							var mouseStartXFromCentre = e.pageX - imageCentre[0];
							var mouseStartYFromCentre = e.pageY - imageCentre[1];
							rotate.mouseStartAngle = Math.atan2( mouseStartYFromCentre, mouseStartXFromCentre );
							
							rotate.imageStartAngle = parseFloat(imgr.rotate()) * Math.PI / 180.0;
							
							$(document).mousemove( rotate.execute );
							
							return false;
						},
							
						stop : function ( e ) {
							
							if ( !rotate.imageBeingRotated ) return;
							
							$(document).unbind( 'mousemove' , rotate.execute);
							
							setTimeout( function() { rotate.imageBeingRotated = false; }, 10 );
							return false;
						},
						
						getCenter : function ( image ) {
							
							var currentRotation = imgr.rotate();
							imgr.rotate(0);
							
							var imageOffset = imgr.offset();
							var imageCentreX = imageOffset.left + imgr.width() / 2;
							var imageCentreY = imageOffset.top + imgr.height() / 2;
							
							imgr.rotate(currentRotation);
							
							return Array( imageCentreX, imageCentreY );
						}
					},
					resizable = function(destroy) {
						if ($.fn.resizable) {
							if (destroy) {
								rhandle.filter(':ui-resizable').resizable('destroy');
								rhandle.hide();
							}
							else {
								rhandle.show();
								rhandle.resizable({
									alsoResize  : img,
									aspectRatio : cratio,
									resize      : resize.update,
									stop        : resize.fixHeight
								});
							}
						}
					},
					croppable = function(destroy) {
						if ($.fn.draggable && $.fn.resizable) {
							if (destroy) {
								rhandlec.filter(':ui-resizable').resizable('destroy')
									.filter(':ui-draggable').draggable('destroy');
								basec.hide();
							}
							else {
								basec.show()
									.width(img.width())
									.height(img.height());
								
								imgc
									.width(img.width())
									.height(img.height());
								
								coverc
									.width(img.width())
									.height(img.height());
								
								rhandlec
									.width(imgc.width())
									.height(imgc.height())
									.offset(imgc.offset())
									.resizable({
										containment : basec,
										resize      : crop.resize_update,
										handles     : 'all'
									})
									.draggable({
										handle      : coverc,
										containment : imgc,
										drag        : crop.drag_update
									});
								
								crop.update();
							}
						}
					},
					rotateable = function(destroy) {
						if ($.fn.draggable && $.fn.resizable) {
							if (destroy) {
								imgr.hide();
							}
							else {
								imgr.show()
									.width(rwidth)
									.height(rheight)
									.css('margin-top', (pheight-rheight)/2 + 'px')
									.css('margin-left', (pwidth-rwidth)/2 + 'px');

							}
						}
					},
					save = function() {
						var w, h, x, y, d, q;
						var mode = $('input:checked', uitype).val();
						
						//width.add(height).change(); // may be unnecessary
						
						if (mode == 'resize') {
							w = parseInt(width.val()) || 0;
							h = parseInt(height.val()) || 0;
						} else if (mode == 'crop') {
							w = parseInt(offsetX.val()) || 0;
							h = parseInt(offsetY.val()) || 0;
							x = parseInt(pointX.val()) || 0;
							y = parseInt(pointY.val()) || 0;
						} else if (mode == 'rotate') {
							w = owidth;
							h = oheight;
							d = parseInt(degree.val()) || 0;
							if (d < 0 || d > 360) {
								return fm.error('Invalid rotate degree');
							}
							if (d == 0 || d == 360) {
								return fm.error('Image dose not rotated');
							}
						}
						q = quality? parseInt(quality.val()) : 0;
						
						if (mode != 'rotate') {

							if (w <= 0 || h <= 0) {
								return fm.error('Invalid image size');
							}
							
							if (w == owidth && h == oheight) {
								return fm.error('Image size not changed');
							}

						}
						
						dialog.elfinderdialog('close');
						
						fm.request({
							data : {
								cmd    : 'resize',
								target : file.hash,
								width  : w,
								height : h,
								x      : x,
								y      : y,
								degree : d,
								quality: q,
								mode   : mode
							},
							notify : {type : 'resize', cnt : 1}
						})
						.fail(function(error) {
							dfrd.reject(error);
						})
						.done(function() {
							var reload = function(url) {
								var ifm;
								try {
									ifm = $('<iframe width="1" height="1" scrolling="no" frameborder="no" style="position:absolute; top:-1px; left:-1px">')
										.attr('src', url)
										.one('load', function() {
											this.contentDocument.location.reload(true);
											ifm.one('load', function() {
												ifm.remove();
											});
										})
										.appendTo('body');
								} catch(e) {
									ifm && ifm.remove();
								}
							},
							url = fm.url(file.hash);
							
							reload(src);
							if (url !== src) {
								reload(url);
							}
							dfrd.resolve();
						});
						
					},
					buttons = {},
					hline   = 'elfinder-resize-handle-hline',
					vline   = 'elfinder-resize-handle-vline',
					rpoint  = 'elfinder-resize-handle-point',
					src     = fm.openUrl(file.hash)
					;
				
				imgr.mousedown( rotate.start );
				$(document).mouseup( rotate.stop );
					
				uiresize.append(
					$(row).append($(label).text(fm.i18n('width')), width, reset),
					$(row).append($(label).text(fm.i18n('height')), height),
					$(row).append($('<label/>').text(fm.i18n('aspectRatio')).prepend(constr)),
					(quality? $(row).append($(label).text(fm.i18n('quality')), quality, $('<span/>').text(' (1-100)')) : $()),
					$(row).append($(label).text(fm.i18n('scale')), uiprop)
				);

				if (api2) {
					uicrop.append(
						$(row).append($(label).text('X'), pointX),
						$(row).append($(label).text('Y')).append(pointY),
						$(row).append($(label).text(fm.i18n('width')), offsetX),
						$(row).append($(label).text(fm.i18n('height')), offsetY),
						(quality? $(row).append($(label).text(fm.i18n('quality')), quality.clone(true), $('<span/>').text(' (1-100)')) : $())
					);
					
					uirotate.append(
						$(row).append(
							$(label).text(fm.i18n('rotate')),
							degree,
							$('<span/>').text(fm.i18n('degree')),
							$(uibuttonset).append(uideg270, $(uiseparator), uideg90)
						),
						$(row).css('height', '20px').append(uidegslider),
						(quality? $(row).append($(label).text(fm.i18n('quality')), quality.clone(true), $('<span/>').text(' (1-100)')) : $())
					);
				}
				
				dialog.append(uitype).on('resize', function(e){
					e.stopPropagation();
				});

				if (api2) {
					control.append($(row), uiresize, uicrop.hide(), uirotate.hide());
				} else {
					control.append($(row), uiresize);
				}
				control.find('input,select').attr('disabled', 'disabled');
				
				rhandle.append('<div class="'+hline+' '+hline+'-top"/>',
					'<div class="'+hline+' '+hline+'-bottom"/>',
					'<div class="'+vline+' '+vline+'-left"/>',
					'<div class="'+vline+' '+vline+'-right"/>',
					'<div class="'+rpoint+' '+rpoint+'-e"/>',
					'<div class="'+rpoint+' '+rpoint+'-se"/>',
					'<div class="'+rpoint+' '+rpoint+'-s"/>');
					
				preview.append(spinner).append(rhandle.hide()).append(img.hide());

				if (api2) {
					rhandlec.css('position', 'absolute')
						.append('<div class="'+hline+' '+hline+'-top"/>',
						'<div class="'+hline+' '+hline+'-bottom"/>',
						'<div class="'+vline+' '+vline+'-left"/>',
						'<div class="'+vline+' '+vline+'-right"/>',
						'<div class="'+rpoint+' '+rpoint+'-n"/>',
						'<div class="'+rpoint+' '+rpoint+'-e"/>',
						'<div class="'+rpoint+' '+rpoint+'-s"/>',
						'<div class="'+rpoint+' '+rpoint+'-w"/>',
						'<div class="'+rpoint+' '+rpoint+'-ne"/>',
						'<div class="'+rpoint+' '+rpoint+'-se"/>',
						'<div class="'+rpoint+' '+rpoint+'-sw"/>',
						'<div class="'+rpoint+' '+rpoint+'-nw"/>');

					preview.append(basec.css('position', 'absolute').hide().append(imgc, rhandlec.append(coverc)));
					
					preview.append(imgr.hide());
				}
				
				preview.css('overflow', 'hidden');
				
				dialog.append(preview, control);
				
				buttons[fm.i18n('btnApply')] = save;
				buttons[fm.i18n('btnCancel')] = function() { dialog.elfinderdialog('close'); };
				
				fm.dialog(dialog, {
					title          : fm.escape(file.name),
					width          : 650,
					resizable      : false,
					destroyOnClose : true,
					buttons        : buttons,
					open           : function() {
						var dw   = dialog.width() - 20,
							winH = $(window).height() - 20;
						(preview.width() > dw) && preview.width(dw);
						(preview.height() > winH) && preview.height(winH);
						pwidth  = preview.width()  - (rhandle.outerWidth()  - rhandle.width());
						pheight = preview.height() - (rhandle.outerHeight() - rhandle.height());
						img.attr('src', src + (src.indexOf('?') === -1 ? '?' : '&')+'_='+Math.random());
						imgc.attr('src', img.attr('src'));
						imgr.attr('src', img.attr('src'));
					}
				}).attr('id', id);
				
				// for IE < 9 dialog mising at open second+ time.
				if (fm.UA.ltIE8) {
					$('.elfinder-dialog').css('filter', '');
				}
				
				reset.css('left', width.position().left + width.width() + 12);
				
				coverc.css({ 'opacity': 0.2, 'background-color': '#fff', 'position': 'absolute'}),
				rhandlec.css('cursor', 'move');
				rhandlec.find('.elfinder-resize-handle-point').css({
					'background-color' : '#fff',
					'opacity': 0.5,
					'border-color':'#000'
				});

				imgr.css('cursor', 'pointer');

				if (! api2) {
					uitype.find('.api2').remove();
				}
				
				uitype.controlgroup? uitype.controlgroup() : uitype.buttonset();

			},
			
			id, dialog
			;
			

		if (!files.length || files[0].mime.indexOf('image/') === -1) {
			return dfrd.reject();
		}
		
		id = 'resize-'+fm.namespace+'-'+files[0].hash;
		dialog = fm.getUI().find('#'+id);
		
		if (dialog.length) {
			dialog.elfinderdialog('toTop');
			return dfrd.resolve();
		}
		
		open(files[0], id);
			
		return dfrd;
	};

};

(function ($) {
	
	var findProperty = function (styleObject, styleArgs) {
		var i = 0 ;
		for( i in styleArgs) {
	        if (typeof styleObject[styleArgs[i]] != 'undefined') 
	        	return styleArgs[i];
		}
		styleObject[styleArgs[i]] = '';
	    return styleArgs[i];
	};
	
	$.cssHooks.rotate = {
		get: function(elem, computed, extra) {
			return $(elem).rotate();
		},
		set: function(elem, value) {
			$(elem).rotate(value);
			return value;
		}
	};
	$.cssHooks.transform = {
		get: function(elem, computed, extra) {
			var name = findProperty( elem.style , 
				['WebkitTransform', 'MozTransform', 'OTransform' , 'msTransform' , 'transform'] );
			return elem.style[name];
		},
		set: function(elem, value) {
			var name = findProperty( elem.style , 
				['WebkitTransform', 'MozTransform', 'OTransform' , 'msTransform' , 'transform'] );
			elem.style[name] = value;
			return value;
		}
	};
	
	$.fn.rotate = function(val) {
		if (typeof val == 'undefined') {
			if (!!window.opera) {
				var r = this.css('transform').match(/rotate\((.*?)\)/);
				return  ( r && r[1])?
					Math.round(parseFloat(r[1]) * 180 / Math.PI) : 0;
			} else {
				var r = this.css('transform').match(/rotate\((.*?)\)/);
				return  ( r && r[1])? parseInt(r[1]) : 0;
			}
		}
		this.css('transform', 
			this.css('transform').replace(/none|rotate\(.*?\)/, '') + 'rotate(' + parseInt(val) + 'deg)');
		return this;
	};

	$.fx.step.rotate  = function(fx) {
		if ( fx.state == 0 ) {
			fx.start = $(fx.elem).rotate();
			fx.now = fx.start;
		}
		$(fx.elem).rotate(fx.now);
	};

	if (typeof window.addEventListener == "undefined" && typeof document.getElementsByClassName == "undefined") { // IE & IE<9
		var GetAbsoluteXY = function(element) {
			var pnode = element;
			var x = pnode.offsetLeft;
			var y = pnode.offsetTop;
			
			while ( pnode.offsetParent ) {
				pnode = pnode.offsetParent;
				if (pnode != document.body && pnode.currentStyle['position'] != 'static') {
					break;
				}
				if (pnode != document.body && pnode != document.documentElement) {
					x -= pnode.scrollLeft;
					y -= pnode.scrollTop;
				}
				x += pnode.offsetLeft;
				y += pnode.offsetTop;
			}
			
			return { x: x, y: y };
		};
		
		var StaticToAbsolute = function (element) {
			if ( element.currentStyle['position'] != 'static') {
				return ;
			}

			var xy = GetAbsoluteXY(element);
			element.style.position = 'absolute' ;
			element.style.left = xy.x + 'px';
			element.style.top = xy.y + 'px';
		};

		var IETransform = function(element,transform){

			var r;
			var m11 = 1;
			var m12 = 1;
			var m21 = 1;
			var m22 = 1;

			if (typeof element.style['msTransform'] != 'undefined'){
				return true;
			}

			StaticToAbsolute(element);

			r = transform.match(/rotate\((.*?)\)/);
			var rotate =  ( r && r[1])	?	parseInt(r[1])	:	0;

			rotate = rotate % 360;
			if (rotate < 0) rotate = 360 + rotate;

			var radian= rotate * Math.PI / 180;
			var cosX =Math.cos(radian);
			var sinY =Math.sin(radian);

			m11 *= cosX;
			m12 *= -sinY;
			m21 *= sinY;
			m22 *= cosX;

			element.style.filter =  (element.style.filter || '').replace(/progid:DXImageTransform\.Microsoft\.Matrix\([^)]*\)/, "" ) +
				("progid:DXImageTransform.Microsoft.Matrix(" + 
					 "M11=" + m11 + 
					",M12=" + m12 + 
					",M21=" + m21 + 
					",M22=" + m22 + 
					",FilterType='bilinear',sizingMethod='auto expand')") 
				;

	  		var ow = parseInt(element.style.width || element.width || 0 );
	  		var oh = parseInt(element.style.height || element.height || 0 );

			var radian = rotate * Math.PI / 180;
			var absCosX =Math.abs(Math.cos(radian));
			var absSinY =Math.abs(Math.sin(radian));

			var dx = (ow - (ow * absCosX + oh * absSinY)) / 2;
			var dy = (oh - (ow * absSinY + oh * absCosX)) / 2;

			element.style.marginLeft = Math.floor(dx) + "px";
			element.style.marginTop  = Math.floor(dy) + "px";

			return(true);
		};
		
		var transform_set = $.cssHooks.transform.set;
		$.cssHooks.transform.set = function(elem, value) {
			transform_set.apply(this, [elem, value] );
			IETransform(elem,value);
			return value;
		};
	}

})(jQuery);


/*
 * File: /js/commands/rm.js
 */

/**
 * @class  elFinder command "rm"
 * Delete files
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.rm = function() {
	
	this.shortcuts = [{
		pattern     : 'delete ctrl+backspace'
	}];
	
	this.getstate = function(sel) {
		var fm = this.fm;
		sel = sel || fm.selected();
		return !this._disabled && sel.length && $.map(sel, function(h) { var f = fm.file(h); return f && f.phash && !f.locked ? h : null }).length == sel.length
			? 0 : -1;
	}
	
	this.exec = function(hashes) {
		var self   = this,
			fm     = this.fm,
			dfrd   = $.Deferred()
				.fail(function(error) {
					error && fm.error(error);
				}),
			files  = this.files(hashes),
			cnt    = files.length,
			cwd    = fm.cwd().hash,
			tpl    = '<div class="ui-helper-clearfix elfinder-rm-title"><span class="elfinder-cwd-icon {class} ui-corner-all"/>{title}<div class="elfinder-rm-desc">{desc}</div></div>',
			targets, text, f, fname, size, tmb, descs, dialog;

		if (!cnt || this._disabled) {
			return dfrd.reject();
		}
		
		$.each(files, function(i, file) {
			if (!file.phash) {
				return !dfrd.reject(['errRm', file.name, 'errPerm']);
			}
			if (file.locked) {
				return !dfrd.reject(['errLocked', file.name]);
			}
		});

		if (dfrd.state() == 'pending') {
			targets = this.hashes(hashes);
			cnt     = files.length;
			descs   = [];
			
			if (cnt > 1) {
				if (!$.map(files, function(f) { return f.mime == 'directory' ? 1 : null ; }).length) {
					size = 0;
					$.each(files, function(h, f) { 
						if (f.size && f.size != 'unknown') {
							var s = parseInt(f.size);
							if (s >= 0 && size >= 0) {
								size += s;
							}
						} else {
							size = 'unknown';
							return false;
						}
					});
					descs.push(fm.i18n('size')+': '+fm.formatSize(size));
				}
				text = [$(tpl.replace('{class}', 'elfinder-cwd-icon-group').replace('{title}', '<strong>' + fm.i18n('items')+ ': ' + cnt + '</strong>').replace('{desc}', descs.join('<br>')))];
			} else {
				f = files[0];
				tmb = fm.tmb(f);
				if (f.size) {
					descs.push(fm.i18n('size')+': '+fm.formatSize(f.size));
				}
				descs.push(fm.i18n('modify')+': '+fm.formatDate(f));
				fname = fm.escape(f.i18 || f.name).replace(/([_.])/g, '&#8203;$1');
				text = [$(tpl.replace('{class}', fm.mime2class(f.mime)).replace('{title}', '<strong>' + fname + '</strong>').replace('{desc}', descs.join('<br>')))];
				
			}
			
			text.push('confirmRm');
			
			fm.lockfiles({files : targets});
			dialog = fm.confirm({
				title  : self.title,
				text   : text,
				accept : {
					label    : 'btnRm',
					callback : function() {  
						fm.request({
							data   : {cmd  : 'rm', targets : targets}, 
							notify : {type : 'rm', cnt : cnt},
							preventFail : true
						})
						.fail(function(error) {
							dfrd.reject(error);
						})
						.done(function(data) {
							dfrd.done(data);
						})
						.always(function() {
							fm.unlockfiles({files : targets});
						});
					}
				},
				cancel : {
					label    : 'btnCancel',
					callback : function() {
						fm.unlockfiles({files : targets});
						if (targets.length === 1 && fm.file(targets[0]).phash !== cwd) {
							fm.select({selected : targets});
						} else {
							fm.selectfiles({files : targets});
						}
						dfrd.reject();
					}
				}
			});
			// load thumbnail
			if (tmb) {
				$('<img/>')
					.load(function() { dialog.find('.elfinder-cwd-icon').addClass(tmb.className).css('background-image', "url('"+tmb.url+"')"); })
					.attr('src', tmb.url);
			}
		}
			
		return dfrd;
	}

};


/*
 * File: /js/commands/search.js
 */

/**
 * @class  elFinder command "search"
 * Find files
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.search = function() {
	this.title          = 'Find files';
	this.options        = {ui : 'searchbutton'}
	this.alwaysEnabled  = true;
	this.updateOnSelect = false;
	
	/**
	 * Return command status.
	 * Search does not support old api.
	 *
	 * @return Number
	 **/
	this.getstate = function() {
		return 0;
	}
	
	/**
	 * Send search request to backend.
	 *
	 * @param  String  search string
	 * @return $.Deferred
	 **/
	this.exec = function(q, target, mime) {
		var fm = this.fm,
			reqDef;
		
		if (typeof q == 'string' && q) {
			if (typeof target == 'object') {
				mime = target.mime || '';
				target = target.target || '';
			}
			target = target? target : '';
			mime = mime? $.trim(mime).replace(',', ' ').split(' ') : [];
			$.each(mime, function(){ return $.trim(this); });
			fm.trigger('searchstart', {query : q, target : target, mimes : mime});
			
			reqDef = fm.request({
				data   : {cmd : 'search', q : q, target : target, mimes : mime},
				notify : {type : 'search', cnt : 1, hideCnt : true},
				cancel : true
			});
			return reqDef;
		}
		fm.getUI('toolbar').find('.'+fm.res('class', 'searchbtn')+' :text').focus();
		return $.Deferred().reject();
	}

};


/*
 * File: /js/commands/sort.js
 */

/**
 * @class  elFinder command "sort"
 * Change sort files rule
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.sort = function() {
	var self  = this,
	fm    = self.fm,
	timer;
	
	/**
	 * Command options
	 *
	 * @type  Object
	 */
	this.options = {ui : 'sortbutton'};
	
	fm.bind('open sortchange', function() {
		self.variants = [];
		$.each(fm.sortRules, function(name, value) {
			var sort = {
					type  : name,
					order : name == fm.sortType ? fm.sortOrder == 'asc' ? 'desc' : 'asc' : fm.sortOrder
				};
			var arr = name == fm.sortType ? (sort.order == 'asc'? 's' : 'n') : '';
			self.variants.push([sort, (arr? '<span class="ui-icon ui-icon-arrowthick-1-'+arr+'"></span>' : '') + '&nbsp;' + fm.i18n('sort'+name)]);
		});
		self.variants.push('|');
		self.variants.push([
			{
				type  : fm.sortType,
				order : fm.sortOrder,
				stick : !fm.sortStickFolders
			},
			(fm.sortStickFolders? '<span class="ui-icon ui-icon-check"/>' : '') + '&nbsp;' + fm.i18n('sortFoldersFirst')
		]);
	});
	
	fm.bind('open sortchange viewchange search searchend', function() {
		timer && clearTimeout(timer);
		timer = setTimeout(function(){
			var cols = $(fm.cwd).find('div.elfinder-cwd-wrapper-list table');
			if (cols.length) {
				$.each(fm.sortRules, function(name, value) {
					var td = cols.find('thead tr td.elfinder-cwd-view-th-'+name);
					if (td.length) {
						var current = ( name == fm.sortType),
						sort = {
							type  : name,
							order : current ? fm.sortOrder == 'asc' ? 'desc' : 'asc' : fm.sortOrder
						},arr;
						if (current) {
							td.addClass('ui-state-active');
							arr = fm.sortOrder == 'asc' ? 'n' : 's';
							$('<span class="ui-icon ui-icon-triangle-1-'+arr+'"/>').appendTo(td);
						}
						$(td).on('click', function(e){
							e.stopPropagation();
							if (! fm.getUI('cwd').data('longtap')) {
								self.exec([], sort);
							}
						})
						.hover(function() {
							$(this).addClass('ui-state-hover');
						},function() {
							$(this).removeClass('ui-state-hover');
						});
					}
					
				});
			}
		}, 100);
	});
	
	this.getstate = function() {
		return 0;
	};
	
	this.exec = function(hashes, sortopt) {
		var fm = this.fm,
			sort = $.extend({
				type  : fm.sortType,
				order : fm.sortOrder,
				stick : fm.sortStickFolders
			}, sortopt);

		this.fm.setSort(sort.type, sort.order, sort.stick);
		return $.Deferred().resolve();
	};

};


/*
 * File: /js/commands/up.js
 */

/**
 * @class  elFinder command "up"
 * Go into parent directory
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.up = function() {
	this.alwaysEnabled = true;
	this.updateOnSelect = false;
	
	this.shortcuts = [{
		pattern     : 'ctrl+up'
	}];
	
	this.getstate = function() {
		return this.fm.cwd().phash ? 0 : -1;
	}
	
	this.exec = function() {
		return this.fm.cwd().phash ? this.fm.exec('open', this.fm.cwd().phash) : $.Deferred().reject();
	}

};


/*
 * File: /js/commands/upload.js
 */

/**
 * @class elFinder command "upload"
 * Upload files using iframe or XMLHttpRequest & FormData.
 * Dialog allow to send files using drag and drop
 *
 * @type  elFinder.command
 * @author  Dmitry (dio) Levashov
 */
elFinder.prototype.commands.upload = function() {
	var hover = this.fm.res('class', 'hover');
	
	this.disableOnSearch = true;
	this.updateOnSelect  = false;
	
	// Shortcut opens dialog
	this.shortcuts = [{
		pattern     : 'ctrl+u'
	}];
	
	/**
	 * Return command state
	 *
	 * @return Number
	 **/
	this.getstate = function(sel) {
		var fm = this.fm, f,
		sel = fm.directUploadTarget? [fm.directUploadTarget] : (sel || [fm.cwd().hash]);
		if (!this._disabled && sel.length == 1) {
			f = fm.file(sel[0]);
		}
		return (f && f.mime == 'directory' && f.write)? 0 : -1;
	};
	
	
	this.exec = function(data) {
		var fm = this.fm,
			targets = data && (data instanceof Array)? data : null,
			check  = !targets && data && data.target? [ data.target ] : targets,
			fmUpload = function(data) {
				fm.upload(data)
					.fail(function(error) {
						dfrd.reject(error);
					})
					.done(function(data) {
						var cwd = fm.getUI('cwd');
						dfrd.resolve(data);
						if (data && data.added && data.added[0]) {
							var newItem = cwd.find('#'+fm.cwdHash2Id(data.added[0].hash));
							if (newItem.length) {
								newItem.trigger('scrolltoview');
							}
						}
					});
			},
			upload = function(data) {
				dialog.elfinderdialog('close');
				if (targets) {
					data.target = targets[0];
				}
				fmUpload(data);
			},
			dfrd = $.Deferred().always(function() {
				//setTimeout(function() {
				//	fm.autoSync();
				//}, 1000);
			}),
			dialog, input, button, dropbox, pastebox, dropUpload, paste;
		
		//fm.autoSync('stop');
		if (this.getstate(check) < 0) {
			return dfrd.reject();
		}
		
		dropUpload = function(e) {
			e.stopPropagation();
			e.preventDefault();
			var file = false,
				type = '',
				elfFrom = null,
				mycwd = '',
				data = null,
				target = e._target || null,
				trf = e.dataTransfer || null,
				kind = (trf.items && trf.items.length && trf.items[0].kind)? trf.items[0].kind : '';
			
			if (trf) {
				try {
					elfFrom = trf.getData('elfinderfrom');
					if (elfFrom) {
						mycwd = window.location.href + fm.cwd().hash;
						if ((!target && elfFrom === mycwd) || target === mycwd) {
							dfrd.reject();
							return;
						}
					}
				} catch(e) {}
				
				if (kind === 'file' && (trf.items[0].getAsEntry || trf.items[0].webkitGetAsEntry)) {
					file = trf;
					type = 'data';
				} else if (kind !== 'string' && trf.files && trf.files.length && $.inArray('Text', trf.types) === -1) {
					file = trf.files;
					type = 'files';
				} else {
					try {
						if ((data = trf.getData('text/html')) && data.match(/<(?:img|a)/i)) {
							file = [ data ];
							type = 'html';
						}
					} catch(e) {}
					if (! file && (data = trf.getData('text'))) {
						file = [ data ];
						type = 'text';
					}
				}
			}
			if (file) {
				fmUpload({files : file, type : type, target : target});
			} else {
				dfrd.reject();
			}
		};
		
		if (!targets && data) {
			if (data.input || data.files) {
				data.type = 'files';
				fmUpload(data);
			} else if (data.dropEvt) {
				dropUpload(data.dropEvt);
			}
			return dfrd;
		}
		
		paste = function(e) {
			var e = e.originalEvent || e;
			var files = [], items = [];
			var file;
			if (e.clipboardData) {
				if (e.clipboardData.items && e.clipboardData.items.length){
					items = e.clipboardData.items;
					for (var i=0; i < items.length; i++) {
						if (e.clipboardData.items[i].kind == 'file') {
							file = e.clipboardData.items[i].getAsFile();
							files.push(file);
						}
					}
				} else if (e.clipboardData.files && e.clipboardData.files.length) {
					files = e.clipboardData.files;
				}
				if (files.length) {
					upload({files : files, type : 'files'});
					return;
				}
			}
			var my = e.target || e.srcElement;
			setTimeout(function () {
				if (my.innerHTML) {
					$(my).find('img').each(function(i, v){
						if (v.src.match(/^webkit-fake-url:\/\//)) {
							// For Safari's bug.
							// ref. https://bugs.webkit.org/show_bug.cgi?id=49141
							//      https://dev.ckeditor.com/ticket/13029
							$(v).remove();
						}
					});
					var src = my.innerHTML.replace(/<br[^>]*>/gi, ' ');
					var type = src.match(/<[^>]+>/)? 'html' : 'text';
					my.innerHTML = '';
					upload({files : [ src ], type : type});
				}
			}, 1);
		};
		
		input = $('<input type="file" multiple="true"/>')
			.change(function() {
				upload({input : input[0], type : 'files'});
			})
			.on('dragover', function(e) {
				e.originalEvent.dataTransfer.dropEffect = 'copy';
			});

		button = $('<div class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"><span class="ui-button-text">'+fm.i18n('selectForUpload')+'</span></div>')
			.append($('<form/>').append(input))
			.hover(function() {
				button.toggleClass(hover)
			});
			
		dialog = $('<div class="elfinder-upload-dialog-wrapper"/>')
			.append(button);
		
		pastebox = $('<div class="ui-corner-all elfinder-upload-dropbox" contenteditable="true">'+fm.i18n('dropFilesBrowser')+'</div>')
			.on('paste drop', function(e){
				paste(e);
			})
			.on('mousedown click', function(){
				$(this).focus();
			})
			.on('focus', function(){
				this.innerHTML = '';
			})
			.on('dragenter mouseover', function(){
				pastebox.addClass(hover);
			})
			.on('dragleave mouseout', function(){
				pastebox.removeClass(hover);
			});
		
		if (fm.dragUpload) {
			dropbox = $('<div class="ui-corner-all elfinder-upload-dropbox" contenteditable="true">'+fm.i18n('dropPasteFiles')+'</div>')
				.on('paste', function(e){
					paste(e);
				})
				.on('mousedown click', function(){
					$(this).focus();
				})
				.on('focus', function(){
					this.innerHTML = '';
				})
				.on('mouseover', function(){
					$(this).addClass(hover);
				})
				.on('mouseout', function(){
					$(this).removeClass(hover);
				})
				.prependTo(dialog)
				.after('<div class="elfinder-upload-dialog-or">'+fm.i18n('or')+'</div>')[0];
			
			dropbox.addEventListener('dragenter', function(e) {
				e.stopPropagation();
			  	e.preventDefault();
				$(dropbox).addClass(hover);
			}, false);

			dropbox.addEventListener('dragleave', function(e) {
				e.stopPropagation();
			  	e.preventDefault();
				$(dropbox).removeClass(hover);
			}, false);

			dropbox.addEventListener('dragover', function(e) {
				e.stopPropagation();
			  	e.preventDefault();
				e.dataTransfer.dropEffect = 'copy';
			  	$(dropbox).addClass(hover);
			}, false);

			dropbox.addEventListener('drop', function(e) {
				dialog.elfinderdialog('close');
				targets && (e._target = targets[0]);
				dropUpload(e);
			}, false);
			
		} else {
			pastebox
				.prependTo(dialog)
				.after('<div class="elfinder-upload-dialog-or">'+fm.i18n('or')+'</div>')[0];
			
		}
		
		fm.dialog(dialog, {
			title          : this.title + (targets? ' - ' + fm.escape(fm.file(targets[0]).name) : ''),
			modal          : true,
			resizable      : false,
			destroyOnClose : true
		});
		
		return dfrd;
	};

};


/*
 * File: /js/commands/view.js
 */

/**
 * @class  elFinder command "view"
 * Change current directory view (icons/list)
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.view = function() {
	this.value          = this.fm.viewType;
	this.alwaysEnabled  = true;
	this.updateOnSelect = false;

	this.options = { ui : 'viewbutton'};
	
	this.getstate = function() {
		return 0;
	}
	
	this.exec = function() {
		var value = this.fm.storage('view', this.value == 'list' ? 'icons' : 'list');
		this.fm.viewchange();
		this.update(void(0), value);
	}

};

})(jQuery);