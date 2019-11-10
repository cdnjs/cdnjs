"use strict";
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
