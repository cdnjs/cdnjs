/*!
 * elFinder - file manager for web
 * Version 2.1.24 (2017-05-19)
 * http://elfinder.org
 * 
 * Copyright 2009-2017, Studio 42
 * Licensed under a 3-clauses BSD license
 */
(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery','jquery-ui'], factory);
	} else if (typeof exports !== 'undefined') {
		// CommonJS
		var $, ui;
		try {
			$ = require('jquery');
			ui = require('jquery-ui');
		} catch (e) {}
		module.exports = factory($, ui);
	} else {
		// Browser globals (Note: root is window)
		factory(root.jQuery, root.jQuery.ui, true);
	}
}(this, function($, _ui, toGlobal) {
toGlobal = toGlobal || false;


/*
 * File: /js/elFinder.js
 */

/**
 * @class elFinder - file manager for web
 *
 * @author Dmitry (dio) Levashov
 **/
var elFinder = function(node, opts) {
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
		namespace = 'elfinder-' + (id ? id : Math.random().toString().substr(2, 7)),
		
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
		events = ['enable', 'disable', 'load', 'open', 'reload', 'select',  'add', 'remove', 'change', 'dblclick', 'getfile', 'lockfiles', 'unlockfiles', 'selectfiles', 'unselectfiles', 'dragstart', 'dragstop', 'search', 'searchend', 'viewchange'],
		
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
		 * Current working directory options default
		 *
		 * @type Object
		 **/
		cwdOptionsDefault = {
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
			tmbCrop       : false,
			tmb           : false // old API
		},
		
		/**
		 * Current working directory options
		 *
		 * @type Object
		 **/
		cwdOptions = {},
		
		/**
		 * Files/dirs cache
		 *
		 * @type Object
		 **/
		files = {},
		
		/**
		 * Files/dirs hash cache of each dirs
		 *
		 * @type Object
		 **/
		ownFiles = {},
		
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
		 * @type Object
		 **/
		remember = {},
		
		/**
		 * Queue for 'open' requests
		 *
		 * @type Array
		 **/
		queue = [],
		
		/**
		 * Queue for only cwd requests e.g. `tmb`
		 *
		 * @type Array
		 **/
		cwdQueue = [],
		
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
		 * Number: pixcel or String: Number + "%"
		 *
		 * @type Number | String
		 * @default 400
		 **/
		height = 400,
		
		/**
		 * Base node object or selector
		 * Element which is the reference of the height percentage
		 *
		 * @type Object|String
		 * @default null | $(window) (if height is percentage)
		 **/
		heightBase = null,
		
		/**
		 * elfinder path for sound played on remove
		 * @type String
		 * @default ./sounds/
		 **/
		soundPath = './sounds/',
				
		beeper = $(document.createElement('audio')).hide().appendTo('body')[0],
			
		syncInterval,
		autoSyncStop = 0,
		
		uiCmdMapPrev = '',
		
		gcJobRes = null,
		
		open = function(data) {
			// NOTES: Do not touch data object
		
			var volumeid, contextmenu, emptyDirs = {}, stayDirs = {},
				rmClass, hashes, calc, gc, collapsed, prevcwd;
			
			if (self.api >= 2.1) {
				if (data.options.uiCmdMap) {
					// support volume driver option `uiCmdMap`
					self.commandMap = (data.options.uiCmdMap && Object.keys(data.options.uiCmdMap).length)? data.options.uiCmdMap : {};
					if (uiCmdMapPrev !== JSON.stringify(self.commandMap)) {
						uiCmdMapPrev = JSON.stringify(self.commandMap);
					}
				}
			} else {
				self.options.sync = 0;
			}
			
			if (data.init) {
				// init - reset cache
				files = {};
				ownFiles = {};
			} else {
				// remove only files from prev cwd
				// and collapsed directory (included 100+ directories) to empty for perfomance tune in DnD
				prevcwd = cwd;
				rmClass = 'elfinder-subtree-loaded ' + self.res('class', 'navexpand');
				collapsed = self.res('class', 'navcollapse');
				hashes = Object.keys(files);
				calc = function(i) {
					if (!files[i]) {
						return true;
					}
					
					var isDir = (files[i].mime === 'directory'),
						phash = files[i].phash,
						pnav;
					
					if (
						(!isDir
							|| emptyDirs[phash]
							|| (!stayDirs[phash]
								&& $('#'+self.navHash2Id(files[i].hash)).is(':hidden')
								&& $('#'+self.navHash2Id(phash)).next('.elfinder-navbar-subtree').children().length > 100
							)
						)
						&& (isDir || phash !== cwd)
						&& ! remember[i]
					) {
						if (isDir && !emptyDirs[phash]) {
							emptyDirs[phash] = true;
							$('#'+self.navHash2Id(phash))
							 .removeClass(rmClass)
							 .next('.elfinder-navbar-subtree').empty();
						}
						deleteCache(files[i]);
					} else if (isDir) {
						stayDirs[phash] = true;
					}
				};
				gc = function() {
					if (hashes.length) {
						gcJobRes && gcJobRes._abort();
						gcJobRes = self.asyncJob(calc, hashes, {
							interval : 20,
							numPerOnce : 100
						});
					}
				};
				
				self.trigger('filesgc').one('filesgc', function() {
					hashes = [];
				});
				
				self.one('opendone', function() {
					if (prevcwd !== cwd) {
						if (! node.data('lazycnt')) {
							gc();
						} else {
							self.one('lazydone', gc);
						}
					}
				});
			}

			self.sorters = [];
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
			var defsorter = { name: true, perm: true, date: true,  size: true, kind: true },
				sorterChk = (self.sorters.length === 0),
				l         = data.length,
				setSorter = function(f) {
					var f = f || {};
					self.sorters = [];
					$.each(self.sortRules, function(key) {
						if (defsorter[key] || typeof f[key] !== 'undefined' || (key === 'mode' && typeof f.perm !== 'undefined')) {
							self.sorters.push(key);
						}
					});
				},
				f, i;

			for (i = 0; i < l; i++) {
				f = data[i];
				if (f.name && f.hash && f.mime) {
					if (sorterChk && f.phash === cwd) {
						setSorter(f);
						sorterChk = false;
					}
					
					// make or update of leaf roots cache
					if (f.isroot && f.phash) {
						if (! self.leafRoots[f.phash]) {
							self.leafRoots[f.phash] = [ f.hash ];
						} else {
							if ($.inArray(f.hash, self.leafRoots[f.phash]) === -1) {
								self.leafRoots[f.phash].push(f.hash);
							}
						}
						if (files[f.phash]) {
							if (! files[f.phash].dirs) {
								files[f.phash].dirs = 1;
							}
							if (f.ts && (files[f.phash].ts || 0) < f.ts) {
								files[f.phash].ts = f.ts;
							}
						}
					}
					
					files[f.hash] && deleteCache(files[f.hash], true);
					files[f.hash] = f;
					if (f.mime === 'directory' && !ownFiles[f.hash]) {
						ownFiles[f.hash] = {};
					}
					if (f.phash) {
						if (!ownFiles[f.phash]) {
							ownFiles[f.phash] = {};
						}
						ownFiles[f.phash][f.hash] = true;
					}
				} 
			}
			
			// for empty folder
			sorterChk && setSorter();
		},
		
		/**
		 * Delete cache data of files, ownFiles and self.optionsByHashes
		 * 
		 * @param  Object  file
		 * @param  Boolean update
		 * @return void
		 */
		deleteCache = function(file, update) {
			var hash = file.hash,
				phash = file.phash;
			
			if (phash && ownFiles[phash]) {
				 delete ownFiles[phash][hash];
			}
			if (!update) {
				ownFiles[hash] && delete ownFiles[hash];
				self.optionsByHashes[hash] && delete self.optionsByHashes[hash];
			}
			delete files[hash];
		},
		
		/**
		 * Maximum number of concurrent connections on request
		 * 
		 * @type Number
		 */
		requestMaxConn,
		
		/**
		 * Current number of connections
		 * 
		 * @type Number
		 */
		requestCnt = 0,
		
		/**
		 * Queue waiting for connection
		 * 
		 * @type Array
		 */
		requestQueue = [],
		
		/**
		 * Flag to cancel the `open` command waiting for connection
		 * 
		 * @type Boolean
		 */
		requestQueueSkipOpen = false,
		
		/**
		 * Exec shortcut
		 *
		 * @param  jQuery.Event  keydown/keypress event
		 * @return void
		 */
		execShortcut = function(e) {
			var code    = e.keyCode,
				ctrlKey = !!(e.ctrlKey || e.metaKey),
				ddm;

			if (enabled) {

				$.each(shortcuts, function(i, shortcut) {
					if (shortcut.type    == e.type 
					&& shortcut.keyCode  == code 
					&& shortcut.shiftKey == e.shiftKey 
					&& shortcut.ctrlKey  == ctrlKey 
					&& shortcut.altKey   == e.altKey) {
						e.preventDefault();
						e.stopPropagation();
						shortcut.callback(e, self);
						self.debug('shortcut-exec', i+' : '+shortcut.description);
					}
				});
				
				// prevent tab out of elfinder
				if (code == $.ui.keyCode.TAB && !$(e.target).is(':input')) {
					e.preventDefault();
				}
				
				// cancel any actions by [Esc] key
				if (e.type === 'keydown' && code == $.ui.keyCode.ESCAPE) {
					// copy or cut 
					if (! node.find('.ui-widget:visible').length) {
						self.clipboard().length && self.clipboard([]);
					}
					// dragging
					if ($.ui.ddmanager) {
						ddm = $.ui.ddmanager.current;
						ddm && ddm.helper && ddm.cancel();
					}
					// button menus
					node.find('.ui-widget.elfinder-button-menu').hide();
					// trigger keydownEsc
					self.trigger('keydownEsc', e);
				}

			}
		},
		date = new Date(),
		utc,
		i18n,
		inFrame = (window.parent !== window),
		parentIframe = (function() {
			var pifm, ifms;
			if (inFrame) {
				try {
					ifms = $('iframe', window.parent.document);
					if (ifms.length) {
						$.each(ifms, function(i, ifm) {
							if (ifm.contentWindow === window) {
								pifm = $(ifm);
								return false;
							}
						});
					}
				} catch(e) {}
			}
			return pifm;
		})();
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
	 * Configuration options
	 *
	 * @type Object
	 **/
	this.options = $.extend(true, {}, this._options, opts||{});
	
	// set dispInlineRegex
	cwdOptionsDefault['dispInlineRegex'] = this.options.dispInlineRegex;
	
	// auto load required CSS
	if (this.options.cssAutoLoad) {
		(function(fm) {
			var myTag = $('head > script[src$="js/elfinder.min.js"],script[src$="js/elfinder.full.js"]:first'),
				base, baseUrl, hide, fi, cnt;
			if (myTag.length) {
				// hide elFinder node while css loading
				hide = $('<style>.elfinder{visibility:hidden;overflow:hidden}</style>');
				
				$('head').append(hide);
				baseUrl = myTag.attr('src').replace(/js\/[^\/]+$/, '');
				if (! baseUrl.match(/^(https?\/\/|\/)/)) {
					// check <base> tag
					if (base = $('head > base[href]').attr('href')) {
						baseUrl = base.replace(/\/$/, '') + '/' + baseUrl; 
					}
				}
				fm.loadCss([baseUrl+'css/elfinder.min.css', baseUrl+'css/theme.css']);
				
				// additional CSS files
				if (Array.isArray(fm.options.cssAutoLoad)) {
					fm.loadCss(fm.options.cssAutoLoad);
				}
				
				// check css loaded and remove hide
				cnt = 1000; // timeout 10 secs
				fi = setInterval(function() {
					if (--cnt > 0 && node.css('visibility') !== 'hidden') {
						clearInterval(fi);
						hide.remove();
						fm.trigger('cssloaded');
					}
				}, 10);
			} else {
				fm.options.cssAutoLoad = false;
			}
		})(this);
	}
	
	/**
	 * Volume option to set the properties of the root Stat
	 * 
	 * @type Object
	 */
	this.optionProperties = {
		icon: void(0),
		csscls: void(0),
		tmbUrl: void(0),
		uiCmdMap: {},
		netkey: void(0),
		disabled: []
	};
	
	if (opts.ui) {
		this.options.ui = opts.ui;
	}
	
	if (opts.commands) {
		this.options.commands = opts.commands;
	}
	
	if (opts.uiOptions) {
		if (opts.uiOptions.toolbar && Array.isArray(opts.uiOptions.toolbar)) {
			if ($.isPlainObject(opts.uiOptions.toolbar[opts.uiOptions.toolbar.length - 1])) {
				Object.assign(this.options.uiOptions.toolbarExtra, opts.uiOptions.toolbar.pop());
			}
			this.options.uiOptions.toolbar = opts.uiOptions.toolbar;
		}
		if (opts.uiOptions.toolbarExtra && $.isPlainObject(opts.uiOptions.toolbarExtra)) {
			Object.assign(this.options.uiOptions.toolbarExtra, opts.uiOptions.toolbarExtra);
		}
	
		if (opts.uiOptions.cwd && opts.uiOptions.cwd.listView) {
			if (opts.uiOptions.cwd.listView.columns) {
				this.options.uiOptions.cwd.listView.columns = opts.uiOptions.cwd.listView.columns;
			}
			if (opts.uiOptions.cwd.listView.columnsCustomName) {
				this.options.uiOptions.cwd.listView.columnsCustomName = opts.uiOptions.cwd.listView.columnsCustomName;
			}
		}
	}
	// join toolbarExtra to toolbar
	this.options.uiOptions.toolbar.push(this.options.uiOptions.toolbarExtra);
	delete this.options.uiOptions.toolbarExtra;

	if (! inFrame && ! this.options.enableAlways && $('body').children().length === 2) { // only node and beeper
		this.options.enableAlways = true;
	}
	
	/**
	 * Is elFinder over CORS
	 *
	 * @type Boolean
	 **/
	this.isCORS = false;
	
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
			self.isCORS = true;
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

	Object.assign(this.options.contextmenu, opts.contextmenu);
	
	/**
	 * Ajax request type
	 *
	 * @type String
	 * @default "get"
	 **/
	this.requestType = /^(get|post)$/i.test(this.options.requestType) ? this.options.requestType.toLowerCase() : 'get';
	
	// set `requestMaxConn` by option
	requestMaxConn = Math.max(parseInt(this.options.requestMaxConn), 1);
	
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
	 * command names for into queue for only cwd requests
	 * these commands aborts before `open` request
	 *
	 * @type Array
	 * @default ['tmb', 'parents']
	 */
	this.abortCmdsOnOpen = this.options.abortCmdsOnOpen || ['tmb', 'parents'];

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
	 * Date format for if upload file has not original unique name
	 * e.g. Clipboard image data, Image data taken with iOS
	 *
	 * @type String
	 * @default "ymd-His"
	 **/
	this.nonameDateFormat = (this.options.nonameDateFormat || i18n.nonameDateFormat).replace(/[\/\\]/g, '_');

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
			+(this.UA.Touch? (' elfinder-touch' + (this.options.resizable ? ' touch-punch' : '')) : '')
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
		mime   : '',
		mixed  : false, // in multi volumes search
		ininc  : false // in incremental search
	};

	/**
	 * Method to store/fetch data
	 *
	 * @type Function
	 **/
	this.storage = (function() {
		try {
			if ('localStorage' in window && window['localStorage'] !== null) {
				if (self.UA.Safari) {
					// check for Mac/iOS safari private browsing mode
					window.localStorage.setItem('elfstoragecheck', 1);
					window.localStorage.removeItem('elfstoragecheck');
				}
				return self.localStorage;
			} else {
				return self.cookie;
			}
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

	this.sortAlsoTreeview = this.storage('sortAlsoTreeview');
	if (this.sortAlsoTreeview === null) {
		this.sortAlsoTreeview = !!this.options.sortAlsoTreeview;
	} else {
		this.sortAlsoTreeview = !!this.sortAlsoTreeview
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
	this.draggingUiHelper = null;
	
	// draggable closure
	(function() {
		var ltr, wzRect, wzBottom, nodeStyle,
			keyEvt = keydown + 'draggable' + ' keyup.' + namespace + 'draggable';

		/**
		 * Base draggable options
		 *
		 * @type Object
		 **/
		self.draggable = {
			appendTo   : node,
			addClasses : false,
			distance   : 4,
			revert     : true,
			refreshPositions : false,
			cursor     : 'crosshair',
			cursorAt   : {left : 50, top : 47},
			scroll     : false,
			start      : function(e, ui) {
				var helper   = ui.helper,
					targets  = $.map(helper.data('files')||[], function(h) {
						if (h) {
							remember[h] = true;
							return h;
						}
						return null;
					}),
					locked   = false,
					cnt, h;
				
				// fix node size
				nodeStyle = node.attr('style');
				node.width(node.width()).height(node.height());
				
				// set var for drag()
				ltr = (self.direction === 'ltr');
				wzRect = self.getUI('workzone').data('rectangle');
				wzBottom = wzRect.top + wzRect.height;
				
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
	
				helper.data('autoScrTm', setInterval(function() {
					if (helper.data('autoScr')) {
						self.autoScroll[helper.data('autoScr')](helper.data('autoScrVal'));
					}
				}, 50));
			},
			drag       : function(e, ui) {
				var helper = ui.helper,
					autoUp;
				
				if ((autoUp = wzRect.top > e.pageY) || wzBottom < e.pageY) {
					if (wzRect.cwdEdge > e.pageX) {
						helper.data('autoScr', (ltr? 'navbar' : 'cwd') + (autoUp? 'Up' : 'Down'));
					} else {
						helper.data('autoScr', (ltr? 'cwd' : 'navbar') + (autoUp? 'Up' : 'Down'));
					}
					helper.data('autoScrVal', Math.pow((autoUp? wzRect.top - e.pageY : e.pageY - wzBottom), 1.3));
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
				
				$(document).off(keyEvt);
				$(this).elfUiWidgetInstance('draggable') && $(this).draggable('option', { refreshPositions : false });
				self.draggingUiHelper = null;
				self.trigger('focus').trigger('dragstop');
				if (! helper.data('droped')) {
					files = $.map(helper.data('files')||[], function(h) { return h || null ;});
					self.trigger('unlockfiles', {files : files});
					self.trigger('selectfiles', {files : files});
				}
				self.enable();
				
				// restore node style
				node.attr('style', nodeStyle);
				
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
				
				$(document).on(keyEvt, function(e){
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
	})();
	
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
			
			if (typeof e.button === 'undefined' || ui.helper.data('namespace') !== namespace || ! self.insideWorkzone(e.pageX, e.pageY)) {
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
					self.clipboard([]);
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
		return enabled && this.visible();
	};
	
	/**
	 * Return true if filemanager is visible
	 *
	 * @return Boolean
	 **/
	this.visible = function() {
		return node[0].elfinder && node.is(':visible');
	};
	
	/**
	 * Return file is root?
	 * 
	 * @param  Object  target file object
	 * @return Boolean
	 */
	this.isRoot = function(file) {
		return (file.isroot || ! file.phash)? true : false;
	}
	
	/**
	 * Return root dir hash for current working directory
	 * 
	 * @param  String   target hash
	 * @param  Boolean  include fake parent (optional)
	 * @return String
	 */
	this.root = function(hash, fake) {
		hash = hash || cwd;
		var dir, i;
		
		if (! fake) {
			$.each(self.roots, function(id, rhash) {
				if (hash.indexOf(id) === 0) {
					dir = rhash;
					return false;
				}
			});
			if (dir) {
				return dir;
			}
		}
		
		dir = files[hash];
		while (dir && dir.phash && (fake || ! dir.isroot)) {
			dir = files[dir.phash]
		}
		if (dir) {
			return dir.hash;
		}
		
		while (i in files && files.hasOwnProperty(i)) {
			dir = files[i]
			if (!dir.phash && !dir.mime == 'directory' && dir.read) {
				return dir.hash;
			}
		}
		
		return '';
	};
	
	/**
	 * Return current working directory info
	 * 
	 * @return Object
	 */
	this.cwd = function() {
		return files[cwd] || {};
	};
	
	/**
	 * Return required cwd option
	 * 
	 * @param  String  option name
	 * @param  String  target hash (optional)
	 * @return mixed
	 */
	this.option = function(name, target) {
		var res;
		target = target || cwd;
		if (self.optionsByHashes[target] && typeof self.optionsByHashes[target][name] !== 'undefined') {
			return self.optionsByHashes[target][name];
		}
		if (cwd !== target) {
			res = '';
			$.each(self.volOptions, function(id, opt) {
				if (target.indexOf(id) === 0) {
					res = opt[name] || '';
					return false;
				}
			});
			return res;
		} else {
			return cwdOptions[name] || '';
		}
	};
	
	/**
	 * Return disabled commands by each folder
	 * 
	 * @param  Array  target hashes
	 * @return Array
	 */
	this.getDisabledCmds = function(targets) {
		var disabled = ['hidden'];
		if (! Array.isArray(targets)) {
			targets = [ targets ];
		}
		$.each(targets, function(i, h) {
			var disCmds = self.option('disabled', h);
			if (disCmds) {
				$.each(disCmds, function(i, cmd) {
					if ($.inArray(cmd, disabled) === -1) {
						disabled.push(cmd);
					}
				});
			}
		});
		return disabled;
	}
	
	/**
	 * Return file data from current dir or tree by it's hash
	 * 
	 * @param  String  file hash
	 * @return Object
	 */
	this.file = function(hash) { 
		return hash? files[hash] : void(0); 
	};
	
	/**
	 * Return all cached files
	 * 
	 * @param  String  parent hash
	 * @return Object
	 */
	this.files = function(phash) {
		var items = {};
		if (phash) {
			if (!ownFiles[phash]) {
				return {};
			}
			$.each(ownFiles[phash], function(h) {
				if (files[h]) {
					items[h] = files[h];
				} else {
					delete ownFiles[phash][h];
				}
			});
			return Object.assign({}, items);
		}
		return Object.assign({}, files);
	};
	
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
	};
	
	this.path2array = function(hash, i18) {
		var file, 
			path = [];
			
		while (hash) {
			if ((file = files[hash]) && file.hash) {
				path.unshift(i18 && file.i18 ? file.i18 : file.name);
				hash = file.isroot? null : file.phash;
			} else {
				path = [];
				break;
			}
		}
			
		return path;
	};
	
	/**
	 * Return file path or Get path async with jQuery.Deferred
	 * 
	 * @param  Object  file
	 * @param  Boolean i18
	 * @param  Object  asyncOpt
	 * @return String|jQuery.Deferred
	 */
	this.path = function(hash, i18, asyncOpt) { 
		var path = files[hash] && files[hash].path
			? files[hash].path
			: this.path2array(hash, i18).join(cwdOptions.separator);
		if (! asyncOpt || ! files[hash]) {
			return path;
		} else {
			asyncOpt = Object.assign({notify: {type : 'parents', cnt : 1, hideCnt : true}}, asyncOpt);
			
			var dfd    = $.Deferred(),
				notify = asyncOpt.notify,
				noreq  = false,
				req    = function() {
					self.request({
						data : {cmd : 'parents', target : files[hash].phash},
						notify : notify,
						preventFail : true
					})
					.done(done)
					.fail(function() {
						dfd.reject();
					});
				},
				done   = function() {
					self.one('parentsdone', function() {
						path = self.path(hash, i18);
						if (path === '' && noreq) {
							//retry with request
							noreq = false;
							req();
						} else {
							if (notify) {
								clearTimeout(ntftm);
								notify.cnt = -(parseInt(notify.cnt || 0));
								self.notify(notify);
							}
							dfd.resolve(path);
						}
					});
				},
				ntftm;
		
			if (path) {
				return dfd.resolve(path);
			} else {
				if (self.ui['tree']) {
					// try as no request
					if (notify) {
						ntftm = setTimeout(function() {
							self.notify(notify);
						}, self.notifyDelay);
					}
					noreq = true;
					done(true);
				} else {
					req();
				}
				return dfd;
			}
		}
	};
	
	/**
	 * Return file url if set
	 * 
	 * @param  String  file hash
	 * @return String
	 */
	this.url = function(hash) {
		var file = files[hash],
			baseUrl;
		
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
		
		baseUrl = (file.hash.indexOf(self.cwd().volumeid) === 0)? cwdOptions.url : this.option('url', file.hash);
		
		if (baseUrl) {
			return baseUrl + $.map(this.path2array(hash), function(n) { return encodeURIComponent(n); }).slice(1).join('/')
		}

		var params = Object.assign({}, this.customData, {
			cmd: 'file',
			target: file.hash
		});
		if (this.oldAPI) {
			params.cmd = 'open';
			params.current = file.phash;
		}
		return this.options.url + (this.options.url.indexOf('?') === -1 ? '?' : '&') + $.param(params, true);
	};
	
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
	};
	
	/**
	 * Return thumbnail url
	 * 
	 * @param  Object  file object
	 * @return String
	 */
	this.tmb = function(file) {
		var tmbUrl, tmbCrop,
			cls    = 'elfinder-cwd-bgurl',
			url    = '';

		if ($.isPlainObject(file)) {
			if (self.searchStatus.state && file.hash.indexOf(self.cwd().volumeid) !== 0) {
				tmbUrl = self.option('tmbUrl', file.hash);
				tmbCrop = self.option('tmbCrop', file.hash);
			} else {
				tmbUrl = cwdOptions['tmbUrl'];
				tmbCrop = cwdOptions['tmbCrop'];
			}
			if (tmbCrop) {
				cls += ' elfinder-cwd-bgurl-crop';
			}
			if (tmbUrl === 'self' && file.mime.indexOf('image/') === 0) {
				url = self.openUrl(file.hash);
				cls += ' elfinder-cwd-bgself';
			} else if ((self.oldAPI || tmbUrl) && file && file.tmb && file.tmb != 1) {
				url = tmbUrl + file.tmb;
			}
			if (url) {
				return { url: url, className: cls };
			}
		}
		
		return false;
	};
	
	/**
	 * Return selected files hashes
	 *
	 * @return Array
	 **/
	this.selected = function() {
		return selected.slice(0);
	};
	
	/**
	 * Return selected files info
	 * 
	 * @return Array
	 */
	this.selectedFiles = function() {
		return $.map(selected, function(hash) { return files[hash] ? Object.assign({}, files[hash]) : null });
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
	};
	
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
	this.request = function(opts) { 
		var self     = this,
			o        = this.options,
			dfrd     = $.Deferred(),
			// request data
			data     = Object.assign({}, o.customData, {mimes : o.onlyMimes}, opts.data || opts),
			// command name
			cmd      = data.cmd,
			isOpen   = (!opts.asNotOpen && cmd === 'open'),
			// call default fail callback (display error dialog) ?
			deffail  = !(opts.preventDefault || opts.preventFail),
			// call default success callback ?
			defdone  = !(opts.preventDefault || opts.preventDone),
			// options for notify dialog
			notify   = Object.assign({}, opts.notify),
			// make cancel button
			cancel   = !!opts.cancel,
			// do not normalize data - return as is
			raw      = !!opts.raw,
			// sync files on request fail
			syncOnFail = opts.syncOnFail,
			// use lazy()
			lazy     = !!opts.lazy,
			// prepare function before done()
			prepare  = opts.prepare,
			// open notify dialog timeout
			timeout,
			// request options
			options = Object.assign({
				url      : o.url,
				async    : true,
				type     : this.requestType,
				dataType : 'json',
				cache    : false,
				// timeout  : 100,
				data     : data,
				headers  : this.customHeaders,
				xhrFields: this.xhrFields
			}, opts.options || {}),
			/**
			 * Default success handler. 
			 * Call default data handlers and fire event with command name.
			 *
			 * @param Object  normalized response data
			 * @return void
			 **/
			done = function(data) {
				data.warning && self.error(data.warning);
				
				if (isOpen) {
					open(data);
				} else {
					cache(data.files || []);
					cache(data.tree || []);
				}

				self.lazy(function() {
					// fire some event to update cache/ui
					data.removed && data.removed.length && self.remove(data);
					data.added   && data.added.length   && self.add(data);
					data.changed && data.changed.length && self.change(data);
				}).then(function() {
					// fire event with command name
					return self.lazy(function() {
						self.trigger(cmd, data);
					});
				}).then(function() {
					// fire event with command name + 'done'
					return self.lazy(function() {
						self.trigger(cmd + 'done');
					});
				}).then(function() {
					// force update content
					data.sync && self.sync();
				});
			},
			/**
			 * Request error handler. Reject dfrd with correct error message.
			 *
			 * @param jqxhr  request object
			 * @param String request status
			 * @return void
			 **/
			error = function(xhr, status) {
				var error, data;
				
				switch (status) {
					case 'abort':
						error = xhr.quiet ? '' : ['errConnect', 'errAbort'];
						break;
					case 'timeout':	    
						error = ['errConnect', 'errTimeout'];
						break;
					case 'parsererror': 
						error = ['errResponse', 'errDataNotJSON'];
						if (xhr.responseText) {
							self.debug('backend-debug', { debug: {phpErrors: [ xhr.responseText] }});
							if (! cwd) {
								xhr.responseText && error.push(xhr.responseText);
							}
						}
						break;
					default:
						if (xhr.responseText) {
							// check responseText, Is that JSON?
							try {
								data = JSON.parse(xhr.responseText);
								if (data && data.error) {
									error = data.error;
								}
							} catch(e) {}
						}
						if (! error) {
							if (xhr.status == 403) {
								error = ['errConnect', 'errAccess', 'HTTP error ' + xhr.status];
							} else if (xhr.status == 404) {
								error = ['errConnect', 'errNotFound', 'HTTP error ' + xhr.status];
							} else {
								if (xhr.status == 414 && options.type === 'get') {
									// retry by POST method
									options.type = 'post';
									dfrd.xhr = xhr = self.transport.send(options).fail(error).done(success);
									return;
								}
								error = xhr.quiet ? '' : ['errConnect', 'HTTP error ' + xhr.status];
							} 
						}
				}
				
				self.trigger(cmd + 'done');
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
					response && response.debug && self.debug('backend-debug', response);
					return dfrd.resolve(response);
				}
				
				if (!response) {
					return dfrd.reject(['errResponse', 'errDataEmpty'], xhr, response);
				} else if (!$.isPlainObject(response)) {
					return dfrd.reject(['errResponse', 'errDataNotJSON'], xhr, response);
				} else if (response.error) {
					return dfrd.reject(response.error, xhr, response);
				}/* else if (!self.validResponse(cmd, response)) {
					return dfrd.reject('errResponse', xhr, response);
				}*/
				
				var resolve = function() {
					var pushLeafRoots = function(name) {
						if (self.leafRoots[data.target] && response[name]) {
							$.each(self.leafRoots[data.target], function(i, h) {
								var root;
								if (root = self.file(h)) {
									response[name].push(root);
								}
							});
						}
					};
					
					if (isOpen) {
						pushLeafRoots('files');
					} else if (cmd === 'tree') {
						pushLeafRoots('tree');
					}
					
					response = self.normalize(response);
					
					if (!self.validResponse(cmd, response)) {
						return dfrd.reject((response.norError || 'errResponse'), xhr, response);
					}
					
					if (!self.api) {
						self.api    = response.api || 1;
						if (self.api == '2.0' && typeof response.options.uploadMaxSize !== 'undefined') {
							self.api = '2.1';
						}
						self.newAPI = self.api >= 2;
						self.oldAPI = !self.newAPI;
					}
					
					if (response.options) {
						cwdOptions = Object.assign({}, cwdOptionsDefault, response.options);
					}

					if (response.netDrivers) {
						self.netDrivers = response.netDrivers;
					}

					if (response.maxTargets) {
						self.maxTargets = response.maxTargets;
					}

					if (isOpen && !!data.init) {
						self.uplMaxSize = self.returnBytes(response.uplMaxSize);
						self.uplMaxFile = !!response.uplMaxFile? parseInt(response.uplMaxFile) : 20;
					}

					if (typeof prepare === 'function') {
						prepare(response);
					}
					
					dfrd.resolve(response);
					response.debug && self.debug('backend-debug', response);
				};
				
				lazy? self.lazy(resolve) : resolve();
			},
			xhr, _xhr,
			xhrAbort = function(e) {
				if (xhr.state() === 'pending') {
					xhr.quiet = true;
					xhr.abort();
					if (e && e.type != 'unload' && e.type != 'destroy') {
						self.autoSync();
					}
				}
			},
			abort = function(e){
				self.trigger(cmd + 'done');
				if (e.type == 'autosync') {
					if (e.data.action != 'stop') return;
				} else if (e.type != 'unload' && e.type != 'destroy' && e.type != 'openxhrabort') {
					if (!e.data.added || !e.data.added.length) {
						return;
					}
				}
				xhrAbort(e);
			},
			request = function() {
				if (isOpen) {
					if (requestQueueSkipOpen) {
						return dfrd.reject();
					}
					requestQueueSkipOpen = true;
				}
				
				requestCnt++;
				
				dfrd.fail(function(error, xhr, response) {
					xhrAbort();
					self.trigger(cmd + 'fail', response);
					if (error) {
						deffail ? self.error(error) : self.debug('error', self.i18n(error));
					}
					syncOnFail && self.sync();
				})

				if (!cmd) {
					syncOnFail = false;
					return dfrd.reject('errCmdReq');
				}
				
				if (self.maxTargets && data.targets && data.targets.length > self.maxTargets) {
					syncOnFail = false;
					return dfrd.reject(['errMaxTargets', self.maxTargets]);
				}

				defdone && dfrd.done(done);
				
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
				if (isOpen) {
					while ((_xhr = queue.pop())) {
						if (_xhr.state() == 'pending') {
							_xhr.quiet = true;
							_xhr.abort();
						}
					}
					if (cwd !== data.target) {
						while ((_xhr = cwdQueue.pop())) {
							if (_xhr.state() == 'pending') {
								_xhr.quiet = true;
								_xhr.abort();
							}
						}
					}
				}

				// trigger abort autoSync for commands to add the item
				if ($.inArray(cmd, (self.cmdsToAdd + ' autosync').split(' ')) !== -1) {
					if (cmd !== 'autosync') {
						self.autoSync('stop');
						dfrd.always(function() {
							self.autoSync();
						});
					}
					self.trigger('openxhrabort');
				}

				delete options.preventFail

				dfrd.xhr = xhr = self.transport.send(options).always(function() {
					--requestCnt;
					if (requestQueue.length) {
						requestQueue.shift()();
					} else {
						requestQueueSkipOpen = false;
					} 
				}).fail(error).done(success);
				
				if (isOpen || (data.compare && cmd === 'info')) {
					// add autoSync xhr into queue
					queue.unshift(xhr);
					// bind abort()
					data.compare && self.bind(self.cmdsToAdd + ' autosync openxhrabort', abort);
					dfrd.always(function() {
						var ndx = $.inArray(xhr, queue);
						data.compare && self.unbind(self.cmdsToAdd + ' autosync openxhrabort', abort);
						ndx !== -1 && queue.splice(ndx, 1);
					});
				} else if ($.inArray(cmd, self.abortCmdsOnOpen) !== -1) {
					// add "open" xhr, only cwd xhr into queue
					cwdQueue.unshift(xhr);
					dfrd.always(function() {
						var ndx = $.inArray(xhr, cwdQueue);
						ndx !== -1 && cwdQueue.splice(ndx, 1);
					});
				}
				
				// abort pending xhr on window unload or elFinder destroy
				self.bind('unload destroy', abort);
				dfrd.always(function() {
					self.unbind('unload destroy', abort);
				});
				
				return dfrd;
			},
			queueingRequest = function() {
				if (isOpen) {
					requestQueueSkipOpen = false;
				}
				if (requestCnt < requestMaxConn) {
					// do request
					return request();
				} else {
					if (isOpen) {
						requestQueue.unshift(request);
					} else {
						requestQueue.push(request);
					}
					return dfrd;
				}
			},
			bindData = {opts: opts, result: true};
		
		// trigger "request.cmd" that callback be able to cancel request by substituting "false" for "event.data.result"
		self.trigger('request.' + cmd, bindData, true);
		
		if (! bindData.result) {
			self.trigger(cmd + 'done');
			return dfrd.reject();
		} else if (typeof bindData.result === 'object' && bindData.result.promise) {
			bindData.result
				.done(queueingRequest)
				.fail(function() {
					self.trigger(cmd + 'done');
					dfrd.reject();
				});
			return dfrd;
		}
		
		return queueingRequest();
	};
	
	/**
	 * Call cache()
	 * Store info about files/dirs in "files" object.
	 *
	 * @param  Array  files
	 * @return void
	 */
	this.cache = function(dataArray) {
		if (! Array.isArray(dataArray)) {
			dataArray = [ dataArray ];
		}
		cache(dataArray);
	};
	
	/**
	 * Compare current files cache with new files and return diff
	 * 
	 * @param  Array   new files
	 * @param  String  target folder hash
	 * @param  Array   exclude properties to compare
	 * @return Object
	 */
	this.diff = function(incoming, onlydir, excludeProps) {
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
			if (! raw[hash] && (! onlydir || f.phash === onlydir)) {
				removed.push(hash);
			}
		});
		
		// compare files
		$.each(raw, function(hash, file) {
			var origin = files[hash];

			if (!origin) {
				added.push(file);
			} else {
				$.each(file, function(prop) {
					if (! excludeProps || $.inArray(prop, excludeProps) === -1) {
						if (file[prop] !== origin[prop]) {
							changed.push(file)
							return false;
						}
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
	};
	
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
			opts = [this.request({
				data           : {cmd : 'open', reload : 1, target : cwd, tree : (! onlydir && this.ui.tree) ? 1 : 0, compare : comp},
				preventDefault : true
			})],
			exParents = function() {
				var parents = [],
					curRoot = self.file(self.root(cwd)),
					curId = curRoot? curRoot.volumeid : null,
					phash = self.cwd().phash,
					isroot,pdir;
				
				while(phash) {
					if (pdir = self.file(phash)) {
						if (phash.indexOf(curId) !== 0) {
							if (! self.isRoot(pdir)) {
								parents.push( {target: phash, cmd: 'tree'} );
							}
							parents.push( {target: phash, cmd: 'parents'} );
							curRoot = self.file(self.root(phash));
							curId = curRoot? curRoot.volumeid : null;
						}
						phash = pdir.phash;
					} else {
						phash = null;
					}
				}
				return parents;
			};
		
		if (! onlydir && self.api >= 2) {
			(cwd !== this.root()) && opts.push(this.request({
				data           : {cmd : 'parents', target : cwd},
				preventDefault : true
			}));
			$.each(exParents(), function(i, data) {
				opts.push(self.request({
					data           : {cmd : data.cmd, target : data.target},
					preventDefault : true
				}));
			});
		}
		$.when.apply($, opts)
		.fail(function(error, xhr) {
			if (! polling || $.inArray('errOpen', error) !== -1) {
				dfrd.reject(error);
				error && self.request({
					data   : {cmd : 'open', target : (self.lastDir('') || self.root()), tree : 1, init : 1},
					notify : {type : 'open', cnt : 1, hideCnt : true}
				});
			} else {
				dfrd.reject((error && xhr.status != 0)? error : void 0);
			}
		})
		.done(function(odata) {
			var pdata, argLen, i;
			
			if (odata.cwd.compare) {
				if (comp === odata.cwd.compare) {
					return dfrd.reject();
				}
			}
			
			// for 2nd and more requests
			pdata = {tree : []};
			
			// results marge of 2nd and more requests
			argLen = arguments.length;
			if (argLen > 1) {
				for(i = 1; i < argLen; i++) {
					if (arguments[i].tree && arguments[i].tree.length) {
						pdata.tree.push.apply(pdata.tree, arguments[i].tree);
					}
				}
			}
			
			if (self.api < 2.1) {
				if (! pdata.tree) {
					pdata.tree = [];
				}
				pdata.tree.push(odata.cwd);
			}
			
			// data normalize
			odata = self.normalize(odata);
			if (!self.validResponse('open', odata)) {
				return dfrd.reject((odata.norError || 'errResponse'));
			}
			pdata = self.normalize(pdata);
			if (!self.validResponse('tree', pdata)) {
				return dfrd.reject((pdata.norError || 'errResponse'));
			}
			
			var diff = self.diff(odata.files.concat(pdata && pdata.tree ? pdata.tree : []), onlydir);

			diff.added.push(odata.cwd);
			diff.removed.length && self.remove(diff);
			diff.added.length   && self.add(diff);
			diff.changed.length && self.change(diff);
			return dfrd.resolve(diff);
		})
		.always(function() {
			self.autoSync();
		});
		
		return dfrd;
	};
	
	this.upload = function(files) {
		return this.transport.upload(files, this);
	};
	
	/**
	 * Arrays that has to unbind events
	 * 
	 * @type Object
	 */
	this.toUnbindEvents = {};
	
	/**
	 * Attach listener to events
	 * To bind to multiply events at once, separate events names by space
	 * 
	 * @param  String  event(s) name(s)
	 * @param  Object  event handler
	 * @return elFinder
	 */
	this.bind = function(event, callback) {
		var i, len;
		
		if (typeof(callback) == 'function') {
			event = ('' + event).toLowerCase().replace(/^\s+|\s+$/g, '').split(/\s+/);
			
			len = event.length;
			for (i = 0; i < len; i++) {
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
		var i, len, l, ci;
		
		event = ('' + event).toLowerCase().split(/\s+/);
		
		len = event.length;
		for (i = 0; i < len; i++) {
			if (l = listeners[event[i]]) {
				ci = $.inArray(callback, l);
				ci > -1 && l.splice(ci, 1);
			}
		}
		
		callback = null;
		return this;
	};
	
	/**
	 * Fire event - send notification to all event listeners
	 * In the callback `this` becames an event object
	 *
	 * @param  String   event type
	 * @param  Object   data to send across event
	 * @param  Boolean  allow modify data (call by reference of data)
	 * @return elFinder
	 */
	this.trigger = function(type, data, allowModify) {
		var type     = type.toLowerCase(),
			isopen   = (type === 'open'),
			handlers = listeners[type] || [], i, l, jst, event;
		
		this.debug('event-'+type, data);
		
		if (isopen && !allowModify) {
			// for performance tuning
			jst = JSON.stringify(data);
		}
		if (l = handlers.length) {
			event = $.Event(type);
			if (allowModify) {
				event.data = data;
			}

			for (i = 0; i < l; i++) {
				if (! handlers[i]) {
					// probably un-binded this handler
					continue;
				}
				// only callback has argument
				if (handlers[i].length) {
					if (!allowModify) {
						// to avoid data modifications. remember about "sharing" passing arguments in js :) 
						event.data = isopen? JSON.parse(jst) : Object.assign({}, data);
					}
				}

				try {
					if (handlers[i].call(event, event, this) === false 
					|| event.isDefaultPrevented()) {
						this.debug('event-stoped', event.type);
						break;
					}
				} catch (ex) {
					window.console && window.console.log && window.console.log(ex);
				}
				
			}
			
			if (this.toUnbindEvents[type] && this.toUnbindEvents[type].length) {
				$.each(this.toUnbindEvents[type], function(i, v) {
					self.unbind(v.type, v.callback);
				});
				delete this.toUnbindEvents[type];
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
					: (code > 0 ? code : $.ui.keyCode[code]);

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
	};
	
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
		var map = function() { return $.map(clipboard, function(f) { return f.hash }); };

		if (hashes !== void(0)) {
			clipboard.length && this.trigger('unlockfiles', {files : map()});
			remember = {};
			
			clipboard = $.map(hashes||[], function(hash) {
				var file = files[hash];
				if (file) {
					
					remember[hash] = true;
					
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
	};
	
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
		if (dstHash && (! cvid || dstHash.indexOf(cvid) !== 0)) {
			disabled = self.option('disabled', dstHash);
			if (! disabled) {
				disabled = [];
			}
		} else {
			disabled = cwdOptions.disabled;
		}
		return this._commands[name] ? $.inArray(name, disabled) === -1 : false;
	};
	
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
			if (this.searchStatus.state || this.searchStatus.ininc) {
				this.trigger('searchend', { noupdate: true });
			}
			this.autoSync('stop');
		}
		return this._commands[cmd] && this.isCommandEnabled(cmd, dstHash) 
			? this._commands[cmd].exec(files, opts) 
			: $.Deferred().reject('No such command');
	};
	
	/**
	 * Create and return dialog.
	 *
	 * @param  String|DOMElement  dialog content
	 * @param  Object             dialog options
	 * @return jQuery
	 */
	this.dialog = function(content, options) {
		var dialog = $('<div/>').append(content).appendTo(node).elfinderdialog(options, this),
			dnode  = dialog.closest('.ui-dialog'),
			resize = function(){
				! dialog.data('draged') && dialog.is(':visible') && dialog.elfinderdialog('posInit');
			};
		if (dnode.length) {
			self.bind('resize', resize);
			dnode.on('remove', function() {
				self.unbind('resize', resize);
			});
		}
		return dialog;
	};
	
	/**
	 * Create and return toast.
	 *
	 * @param  Object  toast options - see ui/toast.js
	 * @return jQuery
	 */
	this.toast = function(options) {
		return $('<div class="ui-front"/>').appendTo(this.ui.toast).elfindertoast(options || {}, this);
	};
	
	/**
	 * Return UI widget or node
	 *
	 * @param  String  ui name
	 * @return jQuery
	 */
	this.getUI = function(ui) {
		return this.ui[ui] || node;
	};
	
	/**
	 * Return elFinder.command instance or instances array
	 *
	 * @param  String  command name
	 * @return Object | Array
	 */
	this.getCommand = function(name) {
		return name === void(0) ? this._commands : this._commands[name];
	};
	
	/**
	 * Resize elfinder node
	 * 
	 * @param  String|Number  width
	 * @param  String|Number  height
	 * @return void
	 */
	this.resize = function(w, h) {
		var getMargin = function() {
				var m = node.outerHeight(true) - node.innerHeight(),
					p = node;
				
				while(p.get(0) !== heightBase.get(0)) {
					p = p.parent();
					m += p.outerHeight(true) - p.innerHeight();
					if (! p.parent().length) {
						// reached the document
						break;
					}
				}
				return m;
			},
			fitToBase = function() {
				tm && clearTimeout(tm);
				if (! node.hasClass('elfinder-fullscreen')) {
					tm = setTimeout(function() {
						self.restoreSize();
					}, 100);
				}
			},
			fit = ! node.hasClass('ui-resizable'),
			prv = node.data('resizeSize') || {w: 0, h: 0},
			mt, tm, size = {};

		if (fit && heightBase) {
			tm && clearTimeout(tm);
			heightBase.off('resize.' + self.namespace, fitToBase);
		}
		
		if (typeof h === 'string') {
			if (mt = h.match(/^([0-9.]+)%$/)) {
				// setup heightBase
				if (! heightBase || ! heightBase.length) {
					heightBase = $(window);
				}
				if (! heightBase.data('marginToMyNode')) {
					heightBase.data('marginToMyNode', getMargin());
				}
				
				h = heightBase.height() * (mt[1] / 100) - heightBase.data('marginToMyNode');
				
				fit && heightBase.on('resize.' + self.namespace, fitToBase);
			}
		}
		
		node.css({ width : w, height : parseInt(h) });
		size.w = node.width();
		size.h = node.height();
		node.data('resizeSize', size);
		if (size.w !== prv.w || size.h !== prv.h) {
			node.trigger('resize');
			this.trigger('resize', {width : size.w, height : size.h});
		}
	};
	
	/**
	 * Restore elfinder node size
	 * 
	 * @return elFinder
	 */
	this.restoreSize = function() {
		this.resize(width, height);
	};
	
	this.show = function() {
		node.show();
		this.enable().trigger('show');
	};
	
	this.hide = function() {
		if (this.options.enableAlways) {
			prevEnabled = enabled;
			enabled = false;
		}
		this.disable().trigger('hide');
		node.hide();
	};
	
	/**
	 * Lazy execution function
	 * 
	 * @param  Object  function
	 * @param  Number  delay
	 * @param  Object  options
	 * @return Object  jQuery.Deferred
	 */
	this.lazy = function(func, delay, opts) {
		var busy = function(state) {
				var cnt = node.data('lazycnt'),
					repaint;
				
				if (state) {
					repaint = node.data('lazyrepaint')? false : opts.repaint;
					if (! cnt) {
						node.data('lazycnt', 1)
							.addClass('elfinder-processing');
					} else {
						node.data('lazycnt', ++cnt);
					}
					if (repaint) {
						node.data('lazyrepaint', true).css('display'); // force repaint
					}
				} else {
					if (cnt && cnt > 1) {
						node.data('lazycnt', --cnt);
					} else {
						repaint = node.data('lazyrepaint');
						node.data('lazycnt', 0)
							.removeData('lazyrepaint')
							.removeClass('elfinder-processing');
						repaint && node.css('display'); // force repaint;
						self.trigger('lazydone');
					}
				}
			},
			dfd  = $.Deferred();
		
		delay = delay || 0;
		opts = opts || {};
		busy(true);
		
		setTimeout(function() {
			dfd.resolve(func.call(dfd));
			busy(false);
		}, delay);
		
		return dfd;
	}
	
	/**
	 * Destroy this elFinder instance
	 *
	 * @return void
	 **/
	this.destroy = function() {
		if (node && node[0].elfinder) {
			this.options.syncStart = false;
			this.autoSync('forcestop');
			this.trigger('destroy').disable();
			clipboard = [];
			selected = [];
			listeners = {};
			shortcuts = {};
			$(window).off('.' + namespace);
			$(document).off('.' + namespace);
			self.trigger = function(){}
			node.off();
			node.removeData();
			node.empty();
			node[0].elfinder = null;
			$(beeper).remove();
			node.append(prevContent.contents()).removeClass(this.cssClass).attr('style', prevStyle);
		}
	};
	
	/**
	 * Start or stop auto sync
	 * 
	 * @param  String|Bool  stop
	 * @return void
	 */
	this.autoSync = function(mode) {
		var sync;
		if (self.options.sync >= 1000) {
			if (syncInterval) {
				clearTimeout(syncInterval);
				syncInterval = null;
				self.trigger('autosync', {action : 'stop'});
			}
			
			if (mode === 'stop') {
				++autoSyncStop;
			} else {
				autoSyncStop = Math.max(0, --autoSyncStop);
			}
			
			if (autoSyncStop || mode === 'forcestop' || ! self.options.syncStart) {
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
							.fail(function(error, xhr){
								if (error && xhr.status != 0) {
									self.error(error);
									if ($.inArray('errOpen', error) !== -1) {
										self.request({
											data   : {cmd : 'open', target : (self.lastDir('') || self.root()), tree : 1, init : 1},
											notify : {type : 'open', cnt : 1, hideCnt : true}
										});
									}
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
	};
	
	/**
	 * Target ui node move to last of children of elFinder node fot to show front
	 * 
	 * @param  Object  target    Target jQuery node object
	 */
	this.toFront = function(target) {
		var lastnode = node.children(':last');
		target = $(target);
		if (lastnode.get(0) !== target.get(0)) {
			lastnode.after(target);
		}
	};
	
	/**
	 * Return css object for maximize
	 * 
	 * @return Object
	 */
	this.getMaximizeCss = function() {
		return {
			width   : '100%',
			height  : '100%',
			margin  : 0,
			padding : 0,
			top     : 0,
			left    : 0,
			display : 'block',
			position: 'fixed',
			zIndex  : Math.max(self.zIndex? (self.zIndex + 1) : 0 , 1000)
		};
	};
	
	// Closure for togglefullscreen
	(function() {
		// check is in iframe
		if (inFrame && self.UA.Fullscreen) {
			self.UA.Fullscreen = false;
			if (parentIframe && typeof parentIframe.attr('allowfullscreen') !== 'undefined') {
				self.UA.Fullscreen = true;
			}
		}

		var orgStyle, bodyOvf, resizeTm, fullElm, exitFull, toFull,
			cls = 'elfinder-fullscreen',
			clsN = 'elfinder-fullscreen-native',
			checkDialog = function() {
				var t = 0,
					l = 0;
				$.each(node.children('.ui-dialog,.ui-draggable'), function(i, d) {
					var $d = $(d),
						pos = $d.position();
					
					if (pos.top < 0) {
						$d.css('top', t);
						t += 20;
					}
					if (pos.left < 0) {
						$d.css('left', l);
						l += 20;
					}
				});
			},
			funcObj = self.UA.Fullscreen? {
				// native full screen mode
				
				fullElm: function() {
					return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
				},
				
				exitFull: function() {
					if (document.exitFullscreen) {
						return document.exitFullscreen();
					} else if (document.webkitExitFullscreen) {
						return document.webkitExitFullscreen();
					} else if (document.mozCancelFullScreen) {
						return document.mozCancelFullScreen();
					} else if (document.msExitFullscreen) {
						return document.msExitFullscreen();
					}
				},
				
				toFull: function(elem) {
					if (elem.requestFullscreen) {
						return elem.requestFullscreen();
					} else if (elem.webkitRequestFullscreen) {
						return elem.webkitRequestFullscreen();
					} else if (elem.mozRequestFullScreen) {
						return elem.mozRequestFullScreen();
					} else if (elem.msRequestFullscreen) {
						return elem.msRequestFullscreen();
					}
					return false;
				}
			} : {
				// node element maximize mode
				
				fullElm: function() {
					var full;
					if (node.hasClass(cls)) {
						return node.get(0);
					} else {
						full = node.find('.' + cls);
						if (full.length) {
							return full.get(0);
						}
					}
					return null;
				},
				
				exitFull: function() {
					var elm;
					
					$(window).off('resize.' + namespace, resize);
					if (bodyOvf !== void(0)) {
						$('body').css('overflow', bodyOvf);
					}
					bodyOvf = void(0);
					
					if (orgStyle) {
						elm = orgStyle.elm;
						restoreStyle(elm);
						$(elm).trigger('resize', {fullscreen: 'off'});
					}
					
					$(window).trigger('resize');
				},
				
				toFull: function(elem) {
					bodyOvf = $('body').css('overflow') || '';
					$('body').css('overflow', 'hidden');
					
					$(elem).css(self.getMaximizeCss())
						.addClass(cls)
						.trigger('resize', {fullscreen: 'on'});
					
					checkDialog();
					
					$(window).on('resize.' + namespace, resize).trigger('resize');
					
					return true;
				}
			},
			restoreStyle = function(elem) {
				if (orgStyle && orgStyle.elm == elem) {
					$(elem).removeClass(cls + ' ' + clsN).attr('style', orgStyle.style);
					orgStyle = null;
				}
			},
			resize = function(e) {
				var elm;
				if (e.target === window) {
					resizeTm && clearTimeout(resizeTm);
					resizeTm = setTimeout(function() {
						if (elm = funcObj.fullElm()) {
							$(elm).trigger('resize', {fullscreen: 'on'});
						}
					}, 100);
				}
			};
		
		$(document).on('fullscreenchange.' + namespace + ' webkitfullscreenchange.' + namespace + ' mozfullscreenchange.' + namespace + ' MSFullscreenChange.' + namespace, function(e){
			if (self.UA.Fullscreen) {
				var elm = funcObj.fullElm(),
					win = $(window);
				
				resizeTm && clearTimeout(resizeTm);
				if (elm === null) {
					win.off('resize.' + namespace, resize);
					if (orgStyle) {
						elm = orgStyle.elm;
						restoreStyle(elm);
						$(elm).trigger('resize', {fullscreen: 'off'});
					}
				} else {
					$(elm).addClass(cls + ' ' + clsN)
						.attr('style', 'width:100%; height:100%; margin:0; padding:0;')
						.trigger('resize', {fullscreen: 'on'});
					win.on('resize.' + namespace, resize);
					checkDialog();
				}
				win.trigger('resize');
			}
		});
		
		/**
		 * Toggle Full Scrren Mode
		 * 
		 * @param  Object target
		 * @param  Bool   full
		 * @return Object | Null  DOM node object of current full scrren
		 */
		self.toggleFullscreen = function(target, full) {
			var elm = $(target).get(0),
				curElm = null;
			
			curElm = funcObj.fullElm();
			if (curElm) {
				if (curElm == elm) {
					if (full === true) {
						return curElm;
					}
				} else {
					if (full === false) {
						return curElm;
					}
				}
				funcObj.exitFull();
				return null;
			} else {
				if (full === false) {
					return null;
				}
			}
			
			orgStyle = {elm: elm, style: $(elm).attr('style')};
			if (funcObj.toFull(elm) !== false) {
				return elm;
			} else {
				orgStyle = null;
				return null;
			}
		};
	})();
	
	// Closure for toggleMaximize
	(function(){
		var cls = 'elfinder-maximized',
		resizeTm,
		resize = function(e) {
			if (e.target === window && e.data && e.data.elm) {
				var elm = e.data.elm;
				resizeTm && clearTimeout(resizeTm);
				resizeTm = setTimeout(function() {
					elm.trigger('resize', {maximize: 'on'});
				}, 100);
			}
		},
		exitMax = function(elm) {
			$(window).off('resize.' + namespace, resize);
			$('body').css('overflow', elm.data('bodyOvf'));
			elm.removeClass(cls)
				.attr('style', elm.data('orgStyle'))
				.removeData('bodyOvf')
				.removeData('orgStyle');
			elm.trigger('resize', {maximize: 'off'});
		},
		toMax = function(elm) {
			elm.data('bodyOvf', $('body').css('overflow') || '')
				.data('orgStyle', elm.attr('style'))
				.addClass(cls)
				.css(self.getMaximizeCss());
			$('body').css('overflow', 'hidden');
			$(window).on('resize.' + namespace, {elm: elm}, resize).trigger('resize');
		};
		
		/**
		 * Toggle Maximize target node
		 * 
		 * @param  Object target
		 * @param  Bool   max
		 * @return void
		 */
		self.toggleMaximize = function(target, max) {
			var elm = $(target),
				maximized = elm.hasClass(cls);
			
			if (maximized) {
				if (max === true) {
					return;
				}
				exitMax(elm);
			} else {
				if (max === false) {
					return;
				}
				toMax(elm);
			}
		};
	})();
	
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

	Object.assign($.ui.keyCode, {
		'F1' : 112,
		'F2' : 113,
		'F3' : 114,
		'F4' : 115,
		'F5' : 116,
		'F6' : 117,
		'F7' : 118,
		'F8' : 119,
		'F9' : 120,
		'F10' : 121,
		'F11' : 122,
		'F12' : 123,
		'DIG0' : 48,
		'DIG1' : 49,
		'DIG2' : 50,
		'DIG3' : 51,
		'DIG4' : 52,
		'DIG5' : 53,
		'DIG6' : 54,
		'DIG7' : 55,
		'DIG8' : 56,
		'DIG9' : 57,
		'NUM0' : 96,
		'NUM1' : 97,
		'NUM2' : 98,
		'NUM3' : 99,
		'NUM4' : 100,
		'NUM5' : 101,
		'NUM6' : 102,
		'NUM7' : 103,
		'NUM8' : 104,
		'NUM9' : 105,
		'CONTEXTMENU' : 93
	});
	
	this.dragUpload = false;
	this.xhrUpload  = (typeof XMLHttpRequestUpload != 'undefined' || typeof XMLHttpRequestEventTarget != 'undefined') && typeof File != 'undefined' && typeof FormData != 'undefined';
	
	// configure transport object
	this.transport = {};

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
	 * Decoding 'raw' string converted to unicode
	 * 
	 * @param  String str
	 * @return String
	 */
	this.decodeRawString = $.isFunction(this.options.rawStringDecoder)? this.options.rawStringDecoder : function(str) {
		var charCodes = function(str) {
			var i, len, arr;
			for (i=0,len=str.length,arr=[]; i<len; i++) {
				arr.push(str.charCodeAt(i));
			}
			return arr;
		},
		scalarValues = function(arr) {
			var scalars = [], i, len, c;
			if (typeof arr === 'string') {arr = charCodes(arr);}
			for (i=0,len=arr.length; c=arr[i],i<len; i++) {
				if (c >= 0xd800 && c <= 0xdbff) {
					scalars.push((c & 1023) + 64 << 10 | arr[++i] & 1023);
				} else {
					scalars.push(c);
				}
			}
			return scalars;
		},
		decodeUTF8 = function(arr) {
			var i, len, c, str, char = String.fromCharCode;
			for (i=0,len=arr.length,str=""; c=arr[i],i<len; i++) {
				if (c <= 0x7f) {
					str += char(c);
				} else if (c <= 0xdf && c >= 0xc2) {
					str += char((c&31)<<6 | arr[++i]&63);
				} else if (c <= 0xef && c >= 0xe0) {
					str += char((c&15)<<12 | (arr[++i]&63)<<6 | arr[++i]&63);
				} else if (c <= 0xf7 && c >= 0xf0) {
					str += char(
						0xd800 | ((c&7)<<8 | (arr[++i]&63)<<2 | arr[++i]>>>4&3) - 64,
						0xdc00 | (arr[i++]&15)<<6 | arr[i]&63
					);
				} else {
					str += char(0xfffd);
				}
			}
			return str;
		};
		
		return decodeUTF8(scalarValues(str));
	};

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
			: (arg === true? this : self.trigger('error', {error : arg, opts : opts}));
	};
	
	// create bind/trigger aliases for build-in events
	$.each(events, function(i, name) {
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
			if (!enabled && self.visible() && self.ui.overlay.is(':hidden') && ! node.children('.elfinder-dialog').find('.'+self.res('class', 'editing')).length) {
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
			var cnt = 0,
				unselects = [];
			selected = $.map(e.data.selected || e.data.value|| [], function(hash) {
				if (unselects.length || (self.maxTargets && ++cnt > self.maxTargets)) {
					unselects.push(hash);
					return null;
				} else {
					return files[hash] ? hash : null;
				}
			});
			if (unselects.length) {
				self.trigger('unselectfiles', {files: unselects, inselect: true});
				self.toast({mode: 'warning', msg: self.i18n(['errMaxTargets', self.maxTargets])});
			}
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
				Object.assign(opts, e.data.opts);
			}

			self.dialog('<span class="elfinder-dialog-icon elfinder-dialog-icon-error"/>'+self.i18n(e.data.error), opts);
		})
		.bind('tmb', function(e) {
			$.each(e.data.images||[], function(hash, tmb) {
				if (files[hash]) {
					files[hash].tmb = tmb;
				}
			})
		})
		.add(function(e) {
			cache(e.data.added || []);
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
				files[hash] = files[hash] ? Object.assign(files[hash], file) : file;
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
							if (self.searchStatus.state < 2) {
								$.each(files, function(h, f) {
									f.phash == hash && rm(h);
								});
							}
						}
						deleteCache(files[hash]);
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
			Object.assign(self.searchStatus, e.data);
			self.searchStatus.state = 1;
		})
		.bind('search', function(e) {
			self.searchStatus.state = 2;
			cache(e.data.files || []);
		})
		.bind('searchend', function() {
			self.searchStatus.state = 0;
			self.searchStatus.ininc = false;
			self.searchStatus.mixed = false;
		})

		;

	// We listen and emit a sound on delete according to option
	if (true === this.options.sound) {
		this.bind('playsound', function(e) {
			var play  = beeper.canPlayType && beeper.canPlayType('audio/wav; codecs="1"'),
				file = e.data && e.data.soundFile;

			play && file && play != '' && play != 'no' && $(beeper).html('<source src="' + soundPath + file + '" type="audio/wav">')[0].play();
		});
	}

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
			this.bind('dblclick', function() {
				this.preventDefault();
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
			this.options.getFileCallback = null;
		}
	}

	/**
	 * Root hashed
	 * 
	 * @type Object
	 */
	this.roots = {};
	
	/**
	 * leaf roots
	 * 
	 * @type Object
	 */
	this.leafRoots = {};
	
	/**
	 * Loaded commands
	 *
	 * @type Object
	 **/
	this._commands = {};
	
	if (!Array.isArray(this.options.commands)) {
		this.options.commands = [];
	}
	
	if ($.inArray('*', this.options.commands) !== -1) {
		this.options.commands = Object.keys(this.commands);
	}
	
	// load commands
	$.each(this.commands, function(name, cmd) {
		var proto = Object.assign({}, cmd.prototype),
			extendsCmd, opts;
		if ($.isFunction(cmd) && !self._commands[name] && (cmd.prototype.forceLoad || $.inArray(name, self.options.commands) !== -1)) {
			extendsCmd = cmd.prototype.extendsCmd || '';
			if (extendsCmd) {
				if ($.isFunction(self.commands[extendsCmd])) {
					cmd.prototype = Object.assign({}, base, new self.commands[extendsCmd](), cmd.prototype);
				} else {
					return true;
				}
			} else {
				cmd.prototype = Object.assign({}, base, cmd.prototype);
			}
			self._commands[name] = new cmd();
			cmd.prototype = proto;
			opts = self.options.commandsOptions[name] || {};
			if (extendsCmd && self.options.commandsOptions[extendsCmd]) {
				opts = $.extend(true, {}, self.options.commandsOptions[extendsCmd], opts);
			}
			self._commands[name].setup(name, opts);
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
	 * cwd options of each volume
	 * key: volumeid
	 * val: options object
	 * 
	 * @type Object
	 */
	this.volOptions = {};

	/**
	 * Hash of trash holders
	 * key: trash folder hash
	 * val: source volume hash
	 * 
	 * @type Object
	 */
	this.trashes = {};

	/**
	 * cwd options of each folder/file
	 * key: hash
	 * val: options object
	 *
	 * @type Object
	 */
	this.optionsByHashes = {};
	
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
			absolute      : true,
			resizable     : false,
			autoOpen      : false,
			closeOnEscape : false,
			title         : '&nbsp;',
			width         : parseInt(this.options.notifyDialog.width)
		}),
		statusbar : $('<div class="ui-widget-header ui-helper-clearfix ui-corner-bottom elfinder-statusbar"/>').hide().appendTo(node),
		toast : $('<div class="elfinder-toast"/>').appendTo(node),
		bottomtray : $('<div class="elfinder-bottomtray">').appendTo(node)
	};
	
	/**
	 * UI Auto Hide Functions
	 * Each auto hide function mast be call to `fm.trigger('uiautohide')` at end of process
	 *
	 * @type Array
	 **/
	this.uiAutoHide = [];
	
	// trigger `uiautohide`
	this.one('open', function() {
		if (self.uiAutoHide.length) {
			setTimeout(function() {
				self.trigger('uiautohide');
			}, 500);
		}
	});
	
	// Auto Hide Functions sequential processing start
	this.bind('uiautohide', function() {
		if (self.uiAutoHide.length) {
			self.uiAutoHide.shift()();
		}
	});
	
	// load required ui
	$.each(this.options.ui || [], function(i, ui) {
		var name = 'elfinder'+ui,
			opts = self.options.uiOptions[ui] || {};

		if (!self.ui[ui] && $.fn[name]) {
			// regist to self.ui before make instance
			self.ui[ui] = $('<'+(opts.tag || 'div')+'/>').appendTo(node);
			self.ui[ui][name](self, opts);
		}
	});
	


	// store instance in node
	node[0].elfinder = this;
	
	// make node resizable
	this.options.resizable 
	&& $.fn.resizable 
	&& node.resizable({
		resize    : function(e, ui) {
			self.resize(ui.size.width, ui.size.height);
		},
		handles   : 'se',
		minWidth  : 300,
		minHeight : 200
	});

	if (this.options.width) {
		width = this.options.width;
	}
	
	if (this.options.height) {
		height = this.options.height;
	}
	
	if (this.options.heightBase) {
		heightBase = $(this.options.heightBase);
	}
	
	if (this.options.soundPath) {
		soundPath = this.options.soundPath.replace(/\/+$/, '') + '/';
	}
	
	// update size	
	self.resize(width, height);
	
	// attach events to document
	$(document)
		// disable elfinder on click outside elfinder
		.on('click.'+namespace, function(e) { enabled && ! self.options.enableAlways && !$(e.target).closest(node).length && self.disable(); })
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
	
	(function(){
		var tm;
		$(window).on('resize.' + namespace, function(e){
			if (e.target === this) {
				tm && clearTimeout(tm);
				tm = setTimeout(function() {
					self.trigger('resize', {width : node.width(), height : node.height()});
				}, 100);
			}
		})
		.on('beforeunload.' + namespace,function(e){
			var msg, cnt;
			if (node.is(':visible')) {
				if (self.ui.notify.children().length && $.inArray('hasNotifyDialog', self.options.windowCloseConfirm) !== -1) {
					msg = self.i18n('ntfsmth');
				} else if (node.find('.'+self.res('class', 'editing')).length && $.inArray('editingFile', self.options.windowCloseConfirm) !== -1) {
					msg = self.i18n('editingFile');
				} else if ((cnt = Object.keys(self.selected()).length) && $.inArray('hasSelectedItem', self.options.windowCloseConfirm) !== -1) {
					msg = self.i18n('hasSelected', ''+cnt);
				} else if ((cnt = Object.keys(self.clipboard()).length) && $.inArray('hasClipboardData', self.options.windowCloseConfirm) !== -1) {
					msg = self.i18n('hasClipboard', ''+cnt);
				}
				if (msg) {
					e.returnValue = msg;
					return msg;
				}
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
						if (obj.bind) {
							self.trigger(obj.bind+'fail', data);
						}
						self.error(data.error);
					} else {
						data.warning && self.error(data.warning);
						data.removed && data.removed.length && self.remove(data);
						data.added   && data.added.length   && self.add(data);
						data.changed && data.changed.length && self.change(data);
						if (obj.bind) {
							self.trigger(obj.bind, data);
							self.trigger(obj.bind+'done');
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
		if (inFrame) {
			$(window.top).on('focus.' + namespace, function() {
				if (self.enable() && (! parentIframe || parentIframe.is(':visible'))) {
					setTimeout(function() {
						$(window).focus();
					}, 10);
				}
			});
		}
	} else if (inFrame) {
		$(window).on('blur.' + namespace, function(e){
			enabled && e.target === this && self.disable();
		});
	}

	(function() {
		var navbar = self.getUI('navbar'),
			cwd    = self.getUI('cwd').parent();
		
		self.autoScroll = {
			navbarUp   : function(v) {
				navbar.scrollTop(Math.max(0, navbar.scrollTop() - v));
			},
			navbarDown : function(v) {
				navbar.scrollTop(navbar.scrollTop() + v);
			},
			cwdUp     : function(v) {
				cwd.scrollTop(Math.max(0, cwd.scrollTop() - v));
			},
			cwdDown   : function(v) {
				cwd.scrollTop(cwd.scrollTop() + v);
			}
		};
	})();

	if (self.dragUpload) {
		// add event listener for HTML5 DnD upload
		(function() {
			var isin = function(e) {
				return (e.target.nodeName !== 'TEXTAREA' && e.target.nodeName !== 'INPUT' && $(e.target).closest('div.ui-dialog-content').length === 0);
			},
			ent       = 'native-drag-enter',
			disable   = 'native-drag-disable',
			c         = 'class',
			navdir    = self.res(c, 'navdir'),
			droppable = self.res(c, 'droppable'),
			dropover  = self.res(c, 'adroppable'),
			arrow     = self.res(c, 'navarrow'),
			clDropActive = self.res(c, 'adroppable'),
			wz        = self.getUI('workzone'),
			ltr       = (self.direction === 'ltr'),
			clearTm   = function() {
				autoScrTm && clearTimeout(autoScrTm);
				autoScrTm = null;
			},
			wzRect, autoScrFn, autoScrTm;
			
			node.on('dragenter', function(e) {
				clearTm();
				if (isin(e)) {
					e.preventDefault();
					e.stopPropagation();
					wzRect = wz.data('rectangle');
				}
			})
			.on('dragleave', function(e) {
				clearTm();
				if (isin(e)) {
					e.preventDefault();
					e.stopPropagation();
				}
			})
			.on('dragover', function(e) {
				var autoUp;
				if (isin(e)) {
					e.preventDefault();
					e.stopPropagation();
					e.originalEvent.dataTransfer.dropEffect = 'none';
					if (! autoScrTm) {
						autoScrTm = setTimeout(function() {
							var wzBottom = wzRect.top + wzRect.height,
								fn;
							if ((autoUp = e.pageY < wzRect.top) || e.pageY > wzBottom ) {
								if (wzRect.cwdEdge > e.pageX) {
									fn = (ltr? 'navbar' : 'cwd') + (autoUp? 'Up' : 'Down');
								} else {
									fn = (ltr? 'cwd' : 'navbar') + (autoUp? 'Up' : 'Down');
								}
								self.autoScroll[fn](Math.pow((autoUp? wzRect.top - e.pageY : e.pageY - wzBottom), 1.3));
							}
							autoScrTm = null;
						}, 20);
					}
				} else {
					clearTm();
				}
			})
			.on('drop', function(e) {
				clearTm();
				if (isin(e)) {
					e.stopPropagation();
					e.preventDefault();
				}
			});
			
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
				if (e.originalEvent && e.originalEvent.dataTransfer) {
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
					self.exec('upload', {dropEvt: e.originalEvent, target: id}, void 0, id);
				}
			});
		})();
	}

	// Swipe on the touch devices to show/hide of toolbar or navbar
	if (self.UA.Touch) {
		(function() {
			var lastX, lastY, nodeOffset, nodeWidth, nodeTop, navbarW, toolbarH,
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
					ltr = (self.direction === 'ltr'),
					navbarMode, treeWidth, swipeX, moveX, toolbarT, mode;
				
				if (x === null || y === null || (e.type === 'touchstart' && touches.length > 1)) {
					return;
				}
				
				if (e.type === 'touchstart') {
					nodeOffset = node.offset();
					nodeWidth = node.width();
					if (navbar) {
						lastX = false;
						if (navbar.is(':hidden')) {
							if (! handleW) {
								handleW = Math.max(50, nodeWidth / 10)
							}
							if ((ltr? (x - nodeOffset.left) : (nodeWidth + nodeOffset.left - x)) < handleW) {
								lastX = x;
							}
						} else {
							navbarW = navbar.width();
							treeWidth = Math.max.apply(Math, $.map(navbar.children('.elfinder-tree'), function(c){return $(c).width();}));
							if (ltr) {
								swipeX = (x < nodeOffset.left + navbarW && treeWidth - navbar.scrollLeft() - 5 <= navbarW);
							} else {
								swipeX = (x > nodeOffset.left + nodeWidth - navbarW && treeWidth + navbar.scrollLeft() - 5 <= navbarW);
							}
							if (swipeX) {
								handleW = Math.max(50, nodeWidth / 10);
								lastX = x;
							} else {
								lastX = false;
							}
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
						navbarMode = (ltr? (lastX > x) : (lastX < x))? 'navhide' : 'navshow';
						moveX = Math.abs(lastX - x);
						if (navbarMode === 'navhide' && moveX > navbarW * .6
							|| (moveX > (navbarMode === 'navhide'? navbarW / 3 : 45)
								&& (navbarMode === 'navshow'
									|| (ltr? x < nodeOffset.left + 20 : x > nodeOffset.left + nodeWidth - 20)
								))
						) {
							self.getUI('navbar').trigger(navbarMode, {handleW: handleW});
							lastX = false;
						}
					}
					if (toolbar && lastY !== false ) {
						toolbarT = toolbar.offset().top;
						if (Math.abs(lastY - y) > Math.min(45, toolbarH / 3)) {
							mode = (lastY > y)? 'slideUp' : 'slideDown';
							if (mode === 'slideDown' || toolbarT + 20 > y) {
								if (toolbar.is(mode === 'slideDown' ? ':hidden' : ':visible')) {
									toolbar.stop(true, true).trigger('toggle', {duration: 100, handleH: handleH});
									moveOff();
								}
								lastY = false;
							}
						}
					}
				}
			});
		})();
	}
	
	// return focus to the window on click (elFInder in the frame)
	if (inFrame) {
		node.on('click', function(e) {
			$(window).focus();
		});
	}
	
	// elFinder to enable by mouse over
	if (this.options.enableByMouseOver) {
		node.on('mouseenter', function(e) {
			(inFrame) && $(window).focus();
			! self.enabled() && self.enable();
		});
	}
	
	// trigger event cssloaded if cddAutoLoad disabled
	if (! this.options.cssAutoLoad) {
		this.trigger('cssloaded');
	}
	
	// calculate elFinder node z-index
	this.zIndexCalc();

	// send initial request and start to pray >_<
	this.trigger('init')
		.request({
			data        : {cmd : 'open', target : self.startDir(), init : 1, tree : self.ui.tree ? 1 : 0}, 
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
			// re-calculate elFinder node z-index
			self.zIndexCalc();
			
			self.load().debug('api', self.api);
			// update ui's size after init
			node.trigger('resize');
			// initial open
			open(data);
			self.trigger('open', data);
			self.trigger('opendone');
			
			if (inFrame && self.options.enableAlways) {
				$(window).focus();
			}
		});
	
	// self.timeEnd('load'); 

};

//register elFinder to global scope
if (typeof toGlobal === 'undefined' || toGlobal) {
	window.elFinder = elFinder;
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
	 * User os. Required to bind native shortcuts for open/rename
	 *
	 * @type String
	 **/
	OS : navigator.userAgent.indexOf('Mac') !== -1 ? 'mac' : navigator.userAgent.indexOf('Win') !== -1  ? 'win' : 'other',
	
	/**
	 * User browser UA.
	 * jQuery.browser: version deprecated: 1.3, removed: 1.9
	 *
	 * @type Object
	 **/
	UA : (function(){
		var webkit = !document.uniqueID && !window.opera && !window.sidebar && window.localStorage && 'WebkitAppearance' in document.documentElement.style;
		return {
			// Browser IE <= IE 6
			ltIE6   : typeof window.addEventListener == "undefined" && typeof document.documentElement.style.maxHeight == "undefined",
			// Browser IE <= IE 7
			ltIE7   : typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined",
			// Browser IE <= IE 8
			ltIE8   : typeof window.addEventListener == "undefined" && typeof document.getElementsByClassName == "undefined",
			IE      : document.uniqueID,
			Firefox : window.sidebar,
			Opera   : window.opera,
			Webkit  : webkit,
			Chrome  : webkit && window.chrome,
			Safari  : webkit && !window.chrome,
			Mobile  : typeof window.orientation != "undefined",
			Touch   : typeof window.ontouchstart != "undefined",
			iOS     : navigator.platform.match(/^iP(?:[ao]d|hone)/),
			Fullscreen : (typeof (document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen) !== 'undefined')
		};
	})(),
	
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
			nonameDateFormat : 'ymd-His',
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
			|| (data.added && !Array.isArray(data.added))
			||  (data.removed && !Array.isArray(data.removed))
			||  (data.changed && !Array.isArray(data.changed))) {
				return false;
			}
			return true;
		},
		open    : function(data) { return data && data.cwd && data.files && $.isPlainObject(data.cwd) && Array.isArray(data.files); },
		tree    : function(data) { return data && data.tree && Array.isArray(data.tree); },
		parents : function(data) { return data && data.tree && Array.isArray(data.tree); },
		tmb     : function(data) { return data && data.images && ($.isPlainObject(data.images) || Array.isArray(data.images)); },
		upload  : function(data) { return data && ($.isPlainObject(data.added) || Array.isArray(data.added));},
		search  : function(data) { return data && data.files && Array.isArray(data.files)}
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
			data = JSON.parse(text);
		} catch (e) {
			return {error : ['errResponse', 'errDataNotJSON']};
		}
		
		data = this.normalize(data);
		if (!this.validResponse('upload', data)) {
			return {error : (response.norError || ['errResponse'])};
		}
		data.removed = $.merge((data.removed || []), $.map(data.added||[], function(f) { return f.hash; }));
		return data;
		
	},
	
	iframeCnt : 0,
	
	uploads : {
		// xhr muiti uploading flag
		xhrUploading: false,
		
		// check file/dir exists
		checkExists: function(files, target, fm, isDir) {
			var dfrd = $.Deferred(),
				names, renames = [], hashes = {}, chkFiles = [],
				cancel = function() {
					var i = files.length;
					while (--i > -1) {
						files[i]._remove = true;
					}
				},
				resolve = function() {
					dfrd.resolve(renames, hashes);
				},
				check = function() {
					var existed = [], exists = [], i, c,
						confirm = function(ndx) {
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
												: resolve();
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
												: resolve();
										}
									},
									cancel : {
										label    : 'btnCancel',
										callback : function() {
											cancel();
											resolve();
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
													: resolve();
											}
										}
									]
								};
							
							if (!isDir) {
								opts.buttons.push({
									label : 'btnRename' + (last? '' : 'All'),
									callback : function() {
										renames = null;
										resolve();
									}
								});
							}
							if (fm.iframeCnt > 0) {
								delete opts.reject;
							}
							fm.confirm(opts);
						};
					
					if (! fm.file(target).read) {
						// for dropbox type
						resolve();
						return;
					}
					
					names = $.map(files, function(file, i) { return file.name && (!fm.UA.iOS || file.name !== 'image.jpg')? {i: i, name: file.name} : null ;});
					
					fm.request({
						data : {cmd : 'ls', target : target, intersect : $.map(names, function(item) { return item.name;})},
						notify : {type : 'preupload', cnt : 1, hideCnt : true},
						preventFail : true
					})
					.done(function(data) {
						var existedArr, cwdItems;
						if (data) {
							if (data.error) {
								cancel();
							} else {
								if (fm.options.overwriteUploadConfirm && fm.option('uploadOverwrite', target)) {
									if (data.list) {
										if (Array.isArray(data.list)) {
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
											cwdItems = $.map(fm.files(target), function(file) { return file.name; } );
											if ($.map(existed, function(n) { 
												return $.inArray(n, cwdItems) === -1? true : null;
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
							resolve();
						}
					})
					.fail(function(error) {
						cancel();
						resolve();
						error && fm.error(error);
					});
				};
			if (fm.api >= 2.1 && typeof files[0] == 'object') {
				check();
			} else {
				resolve();
			}
			return dfrd;
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
					var dirReader, entry, length,
					entries = [],
					toArray = function(list) {
						return Array.prototype.slice.call(list || [], 0);
					},
					excludes = fm.options.folderUploadExclude[fm.OS] || null;
					length = items.length;
					for (var i = 0; i < length; i++) {
						entry = items[i];
						if (entry) {
							if (entry.isFile) {
								processing++;
								entry.file(function (file) {
									if (! excludes || ! file.name.match(excludes)) {
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
				}, hasDirs;
				
				items = $.map(data.files.items, function(item){
					return item.getAsEntry? item.getAsEntry() : item.webkitGetAsEntry();
				});
				$.each(items, function(i, item) {
					if (item.isDirectory) {
						hasDirs = true;
						return false;
					}
				});
				if (items.length > 0) {
					fm.uploads.checkExists(items, target, fm, hasDirs).done(function(renames, hashes){
						var notifyto, dfds = [];
						if (fm.options.overwriteUploadConfirm && fm.option('uploadOverwrite', target)) {
							if (renames === null) {
								data.overwrite = 0;
								renames = [];
							}
							items = $.map(items, function(item){
								var i, bak, hash, dfd, hi;
								if (item.isDirectory && renames.length) {
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
					var tmp = $("<html/>").append($.parseHTML(str.replace(/ src=/ig, ' _elfsrc='))),
						atag;
					$('img[_elfsrc]', tmp).each(function(){
						var url, purl,
						self = $(this),
						pa = self.closest('a');
						if (pa && pa.attr('href') && pa.attr('href').match(/\.(?:jpe?g|gif|bmp|png)/i)) {
							purl = pa.attr('href');
						}
						url = self.attr('_elfsrc');
						if (url) {
							if (purl) {
								$.inArray(purl, ret) == -1 && ret.push(purl);
								$.inArray(url, check) == -1 &&  check.push(url);
							} else {
								$.inArray(url, ret) == -1 && ret.push(url);
							}
						}
						// Probably it's clipboard data
						if (ret.length === 1 && ret[0].match(/^data:image\/png/)) {
							data.clipdata = true;
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
				target      = (data.target || self.cwd().hash),
				dropEvt     = (data.dropEvt || null),
				chunkEnable = (self.option('uploadMaxConn', target) != -1),
				multiMax    = Math.min(5, Math.max(1, self.option('uploadMaxConn', target))),
				retryWait   = 10000, // 10 sec
				retryMax    = 30, // 10 sec * 30 = 300 secs (Max 5 mins)
				retry       = 0,
				dfrd   = $.Deferred()
					.fail(function(error) {
						if (self.uploads.xhrUploading) {
							setTimeout(function() { self.sync(); }, 5000);
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
						self.uploads.xhrUploading = false;
						files = null;
						error && self.error(error);
					})
					.done(function(data) {
						xhr = null;
						self.uploads.xhrUploading = false;
						files = null;
						if (data) {
							self.currentReqCmd = 'upload';
							data.warning && self.error(data.warning);
							data.removed && self.remove(data);
							data.added   && self.add(data);
							data.changed && self.change(data);
		 					self.trigger('upload', data);
		 					self.trigger('uploaddone');
							data.sync && self.sync();
							data.debug && fm.debug('backend-debug', data);
						}
					})
					.always(function() {
						// unregist fnAbort function
						node.off('uploadabort', fnAbort);
						$(window).off('unload', fnAbort);
						notifyto && clearTimeout(notifyto);
						notifyto2 && clearTimeout(notifyto2);
						dataChecked && !data.multiupload && checkNotify() && self.notify({type : 'upload', cnt : -cnt, progress : 0, size : 0});
						chunkMerge && notifyElm.children('.elfinder-notify-chunkmerge').length && self.notify({type : 'chunkmerge', cnt : -1});
					}),
				formData    = new FormData(),
				files       = data.input ? data.input.files : self.uploads.checkFile(data, self, target), 
				cnt         = data.checked? (isDataType? files[0].length : files.length) : files.length,
				loaded      = 0,
				prev        = 0,
				filesize    = 0,
				notify      = false,
				notifyElm   = self.ui.notify,
				cancelBtn   = true,
				abort       = false,
				checkNotify = function() {
					return notify = (notify || notifyElm.children('.elfinder-notify-upload').length);
				},
				fnAbort     = function() {
					abort = true;
					if (xhr) {
						xhr.quiet = true;
						xhr.abort();
					}
					if (checkNotify()) {
						self.notify({type : 'upload', cnt : notifyElm.children('.elfinder-notify-upload').data('cnt') * -1, progress : 0, size : 0});
					}
				},
				cancelToggle = function(show) {
					notifyElm.children('.elfinder-notify-upload').children('.elfinder-notify-cancel')[show? 'show':'hide']();
				},
				startNotify = function(size) {
					if (!size) size = filesize;
					return setTimeout(function() {
						notify = true;
						self.notify({type : 'upload', cnt : cnt, progress : loaded - prev, size : size,
							cancel: function() {
								node.trigger('uploadabort');
								dfrd.resolve();
							}
						});
						prev = loaded;
						if (data.multiupload) {
							cancelBtn && cancelToggle(true);
						} else {
							cancelToggle(cancelBtn && loaded < size);
						}
					}, self.options.notifyDelay);
				},
				doRetry = function() {
					if (retry++ <= retryMax) {
						if (checkNotify() && prev) {
							self.notify({type : 'upload', cnt : 0, progress : 0, size : prev});
						}
						xhr.quiet = true;
						xhr.abort();
						prev = loaded = 0;
						setTimeout(function() {
							if (! abort) {
								xhr.open('POST', self.uploadURL, true);
								xhr.send(formData);
							}
						}, retryWait);
					} else {
						node.trigger('uploadabort');
						dfrd.reject(['errAbort', 'errTimeout']);
					}
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
				if (xhr.status == 0) {
					if (abort) {
						dfrd.reject();
					} else {
						// ff bug while send zero sized file
						// for safari - send directory
						if (!isDataType && data.files && $.map(data.files, function(f){return ! f.type && f.size === (self.UA.Safari? 1802 : 0)? f : null;}).length) {
							errors.push('errFolderUpload');
							dfrd.reject(['errAbort', 'errFolderUpload']);
						} else if (data.input && $.map(data.input.files, function(f){return ! f.type && f.size === (self.UA.Safari? 1802 : 0)? f : null;}).length) {
							dfrd.reject(['errUploadNoFiles']);
						} else {
							doRetry();
						}
					}
				} else {
					node.trigger('uploadabort');
					dfrd.reject('errConnect');
				}
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
					if (!xhr.responseText) {
						error = ['errResponse', 'errDataEmpty'];
					}
				}
				
				if (error) {
					node.trigger('uploadabort');
					var file = isDataType? files[0][0] : files[0];
					return dfrd.reject(file._cid? null : error);
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
					node.off('uploadabort', fnAbort);
					notifyto2 = setTimeout(function() {
						self.notify({type : 'chunkmerge', cnt : 1});
					}, self.options.notifyDelay);
					isDataType? send(_file, files[1]) : send(_file);
					return;
				}
				
				res._multiupload = data.multiupload? true : false;
				if (res.error) {
					self.trigger('uploadfail', res);
					if (res._chunkfailure || res._multiupload) {
						abort = true;
						self.uploads.xhrUploading = false;
						notifyto && clearTimeout(notifyto);
						if (notifyElm.children('.elfinder-notify-upload').length) {
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

				if (e.lengthComputable && !chunkMerge && xhr.readyState < 2) {
					
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
					
					if (! data.multiupload && loaded >= filesize) {
						cancelBtn = false;
						cancelToggle(false);
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
				blobSize, blobMtime, i, start, end, chunks, blob, chunk, added, done, last, failChunk,
				multi = function(files, num){
					var sfiles = [], cid, sfilesLen = 0, cancelChk;
					if (!abort) {
						while(files.length && sfiles.length < num) {
							sfiles.push(files.shift());
						}
						sfilesLen = sfiles.length;
						if (sfilesLen) {
							cancelChk = sfilesLen;
							for (var i=0; i < sfilesLen; i++) {
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
									dropEvt: dropEvt,
									renames: renames,
									hashes: hashes,
									multiupload: true,
									overwrite: data.overwrite === 0? 0 : void 0
								}, void 0, target)
								.fail(function(error) {
									if (error && error === 'No such command') {
										abort = true;
										fm.error(['errUpload', 'errPerm']);
									}
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
									if (files.length) {
										multi(files, 1); // Next one
									} else {
										if (--cancelChk <= 1) {
											cancelBtn = false;
											cancelToggle(false);
										}
									}
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
					if (! (maxFileSize = fm.option('uploadMaxSize', target))) {
						maxFileSize = 0;
					}
					for (i=0; i < files.length; i++) {
						try {
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
						} catch(e) {
							cnt--;
							total--;
							continue;
						}
						
						// file size check
						if ((maxFileSize && blobSize > maxFileSize) || (!blobSlice && fm.uplMaxSize && blobSize > fm.uplMaxSize)) {
							self.error(self.i18n('errUploadFile', blob.name) + ' ' + self.i18n('errUploadFileSize'));
							cnt--;
							total--;
							continue;
						}
						
						// file mime check
						if (blob.type && ! self.uploadMimeCheck(blob.type, target)) {
							self.error(self.i18n('errUploadFile', blob.name) + ' ' + self.i18n('errUploadMime') + ' (' + self.escape(blob.type) + ')');
							cnt--;
							total--;
							continue;
						}
						
						if (blobSlice && blobSize > BYTES_PER_CHUNK) {
							start = 0;
							end = BYTES_PER_CHUNK;
							chunks = -1;
							total = Math.floor(blobSize / BYTES_PER_CHUNK);
							blobMtime = blob.lastModified? Math.round(blob.lastModified/1000) : 0;

							totalSize += blobSize;
							chunked[chunkID] = 0;
							while(start <= blobSize) {
								chunk = blob[blobSlice](start, end);
								chunk._chunk = blob.name + '.' + (++chunks) + '_' + total + '.part';
								chunk._cid   = chunkID;
								chunk._range = start + ',' + chunk.size + ',' + blobSize;
								chunk._mtime = blobMtime;
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
								size = 0;
								fcnt = 1;
								c++;
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
							if (data.clipdata) {
								data.overwrite = 0;
								formData.append('name[]', fm.date(fm.nonameDateFormat) + '.png');
							}
							if (fm.UA.iOS && file.name === 'image.jpg') {
								data.overwrite = 0;
								formData.append('name[]', fm.date(fm.nonameDateFormat) + '.jpg');
							}
						}
						if (file._chunk) {
							formData.append('chunk', file._chunk);
							formData.append('cid'  , file._cid);
							formData.append('range', file._range);
							formData.append('mtime[]', file._mtime);
						} else {
							formData.append('mtime[]', file.lastModified? Math.round(file.lastModified/1000) : 0);
						}
					}
				});
				
				if (isDataType) {
					$.each(paths, function(i, path) {
						formData.append('upload_path[]', path);
					});
				}
				
				if (data.overwrite === 0) {
					formData.append('overwrite', 0);
				}
				
				// send int value that which meta key was pressed when dropped  as `dropWith`
				if (dropEvt) {
					formData.append('dropWith', parseInt(
						(dropEvt.altKey  ? '1' : '0')+
						(dropEvt.ctrlKey ? '1' : '0')+
						(dropEvt.metaKey ? '1' : '0')+
						(dropEvt.shiftKey? '1' : '0'), 2));
				}
				
				xhr.send(formData);
				
				return true;
			};
			
			if (! isDataType) {
				if (files.length > 0) {
					if (! data.clipdata && renames == null) {
						var mkdirs = [],
							paths = [],
							excludes = fm.options.folderUploadExclude[fm.OS] || null;
						$.each(files, function(i, file) {
							var relPath = file.webkitRelativePath || file.relativePath || '';
							if (! relPath) {
								return false;
							}
							if (excludes && file.name.match(excludes)) {
								file._remove = true;
								relPath = void(0);
							} else {
								relPath = relPath.replace(/\/[^\/]*$/, '');
								if (relPath && $.inArray(relPath, mkdirs) === -1) {
									mkdirs.push(relPath);
								}
							}
							paths.push(relPath);
						});
						renames = [];
						hashes = {};
						if (mkdirs.length) {
							(function() {
								var checkDirs = $.map(mkdirs, function(name) { return name.indexOf('/') === -1 ? {name: name} : null;}),
									cancelDirs = [];
								fm.uploads.checkExists(checkDirs, target, fm, true).done(
									function(res, res2) {
										var dfds = [], dfd, bak, hash;
										if (fm.options.overwriteUploadConfirm && fm.option('uploadOverwrite', target)) {
											cancelDirs = $.map(checkDirs, function(dir) { return dir._remove? dir.name : null ;} );
											checkDirs = $.map(checkDirs, function(dir) { return !dir._remove? dir : null ;} );
										}
										if (cancelDirs.length) {
											$.each(paths.concat(), function(i, path) {
												if ($.inArray(path, cancelDirs) === 0) {
													files[i]._remove = true;
													delete paths[i];
												}
											});
										}
										files = $.map(files, function(file) { return file._remove? null : file; });
										paths = $.map(paths, function(path) { return path === void 0 ? null : path; });
										if (checkDirs.length) {
											dfd = $.Deferred();
											if (res.length) {
												$.each(res, function(i, existName) {
													// backup
													bak = fm.uniqueName(existName + fm.options.backupSuffix , null, '');
													$.each(res2, function(h, name) {
														if (res[0] == name) {
															hash = h;
															return false;
														}
													});
													if (! hash) {
														hash = fm.fileByName(res[0], target).hash;
													}
													fm.lockfiles({files : [hash]});
													dfds.push(
														fm.request({
															data   : {cmd : 'rename', target : hash, name : bak},
															notify : {type : 'rename', cnt : 1}
														})
														.fail(function(error) {
															dfrd.reject(error);
															fm.sync();
														})
														.always(function() {
															fm.unlockfiles({files : [hash]})
														})
													);
												});
											} else {
												dfds.push(null);
											}
											
											$.when.apply($, dfds).done(function() {
												// ensure directories
												fm.request({
													data   : {cmd : 'mkdir', target : target, dirs : mkdirs},
													notify : {type : 'mkdir', cnt : mkdirs.length}
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
														paths = $.map(paths.concat(), function(p) {
															if (p === '') {
																return target;
															} else {
																return data.hashes['/' + p];
															}
														});
													}
												})
												.always(function(data) {
													if (multiMax) {
														isDataType = true;
														if (! send(files, paths)) {
															dfrd.reject();
														}
													}
												});
											});
										} else {
											dfrd.reject();
										}
									}
								);
							})();
						} else {
							fm.uploads.checkExists(files, target, fm).done(
								function(res, res2){
									if (fm.options.overwriteUploadConfirm && fm.option('uploadOverwrite', target)) {
										if (res === null) {
											data.overwrite = 0;
										} else {
											renames = res;
											hashes = res2;
										}
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
						}
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
					}),
				name = 'iframe-'+fm.namespace+(++self.iframeCnt),
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
								onload();
								// data will be processed in callback response or window onmessage
								dfrd.resolve();
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
				if (fm.options.overwriteUploadConfirm && fm.option('uploadOverwrite', target)) {
					names = input.files? input.files : [{ name: $(input).val().replace(/^(?:.+[\\\/])?([^\\\/]+)$/, '$1') }];
					//names = $.map(names, function(file){return file.name? { name: file.name } : null ;});
					dfds.push(self.uploads.checkExists(names, target, self).done(
						function(res, res2){
							if (res === null) {
								data.overwrite = 0;
							} else{
								renames = res;
								hashes = res2;
								cnt = $.map(names, function(file){return !file._remove? file : null ;}).length;
								if (cnt != names.length) {
									cnt = 0;
								}
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
				
				if (data.overwrite === 0) {
					form.append('<input type="hidden" name="overwrite" value="0"/>');
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
		var self  = this,
			event = event.toLowerCase(),
			h     = function(e, f) {
				if (!self.toUnbindEvents[event]) {
					self.toUnbindEvents[event] = [];
				}
				self.toUnbindEvents[event].push({
					type: event,
					callback: h
				});
				return callback.apply(this, arguments);
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
			retval, oldval,t;

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
			t = typeof val;
			if (t !== 'string' && t !== 'number') {
				val = JSON.stringify(val);
			}
			try {
				s.setItem(key, val);
			} catch (e) {
				try {
					s.clear();
					s.setItem(key, val);
				} catch (e) {
					self.debug('error', e.toString());
				}
			}
			retval = s.getItem(key);
		}

		if (retval && (retval.substr(0,1) === '{' || retval.substr(0,1) === '[')) {
			try {
				return JSON.parse(retval);
			} catch(e) {}
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
		var d, o, c, i, retval, t;

		name = 'elfinder-'+name+this.id;

		if (value === void(0)) {
			if (document.cookie && document.cookie != '') {
				c = document.cookie.split(';');
				name += '=';
				for (i=0; i<c.length; i++) {
					c[i] = $.trim(c[i]);
					if (c[i].substring(0, name.length) == name) {
						retval = decodeURIComponent(c[i].substring(name.length));
						if (retval.substr(0,1) === '{' || retval.substr(0,1) === '[') {
							try {
								return JSON.parse(retval);
							} catch(e) {}
						}
						return retval;
					}
				}
			}
			return '';
		}

		o = Object.assign({}, this.options.cookie);
		if (value === null) {
			value = '';
			o.expires = -1;
		} else {
			t = typeof value;
			if (t !== 'string' && t !== 'number') {
				value = JSON.stringify(value);
			}
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
		var self   = this,
			chkCmdMap = function(opts) {
				// Disable command to replace with other command
				var disabled;
				if (opts.uiCmdMap) {
					if ($.isPlainObject(opts.uiCmdMap) && Object.keys(opts.uiCmdMap).length) {
						disabled = opts.disabled;
						$.each(opts.uiCmdMap, function(f, t) {
							if (t === 'hidden' && $.inArray(f, disabled) === -1) {
								disabled.push(f);
							}
						});
					} else {
						delete opts.uiCmdMap;
					}
				}
			},
			normalizeOptions = function(opts) {
				var getType = function(v) {
					var type = typeof v;
					if (type === 'object' && Array.isArray(v)) {
						type = 'array';
					}
					return type;
				};
				$.each(self.optionProperties, function(k, empty) {
					if (empty !== void(0)) {
						if (!opts[k] || getType(opts[k]) !== getType(empty)) {
							opts[k] = empty;
						}
					}
				});
				return opts;
			},
			filter = function(file) { 
				var vid, targetOptions, isRoot;
				
				if (file && file.hash && file.name && file.mime) {
					if (file.mime == 'application/x-empty') {
						file.mime = 'text/plain';
					}

					if (file.options) {
						self.optionsByHashes[file.hash] = normalizeOptions(file.options);
					}
					
					isRoot = self.isRoot(file);
					if (isRoot && ! file.volumeid) {
						self.debug('warning', 'The volume root statuses requires `volumeid` property.');
					}
					if (isRoot || file.mime === 'directory') {
						// Prevention of circular reference
						if (file.phash) {
							if (file.phash === file.hash) {
								error = error.concat(['Parent folder of "$1" is itself.', file.name]);
								return null;
							}
							if (isRoot && file.volumeid && file.phash.indexOf(file.volumeid) === 0) {
								error = error.concat(['Parent folder of "$1" is inner itself.', file.name]);
								return null;
							}
						}
						
						// set options, tmbUrls for each volume
						if (file.volumeid) {
							vid = file.volumeid;
							
							if (isRoot) {
								if (! self.volOptions[vid]) {
									self.volOptions[vid] = {
										// set dispInlineRegex
										dispInlineRegex: self.options.dispInlineRegex
									};
								}
								
								targetOptions = self.volOptions[vid];
								
								if (file.options) {
									// >= v.2.1.14 has file.options
									Object.assign(targetOptions, file.options);
								}
								
								// for compat <= v2.1.13
								if (file.disabled) {
									targetOptions.disabled = file.disabled;
								}
								if (file.tmbUrl) {
									targetOptions.tmbUrl = file.tmbUrl;
								}
								
								// check uiCmdMap
								chkCmdMap(targetOptions);
								
								// check trash bin hash
								if (targetOptions.trashHash) {
									self.trashes[targetOptions.trashHash] = file.hash;
								}
								
								// set immediate properties
								$.each(self.optionProperties, function(k) {
									if (targetOptions[k]) {
										file[k] = targetOptions[k];
									}
								});
								self.roots[vid] = file.hash;
							}
							
							if (prevId !== vid) {
								prevId = vid;
								i18nFolderName = self.option('i18nFolderName', vid);
							}
						}
						
						// volume root i18n name
						if (isRoot && ! file.i18) {
							name = 'volume_' + file.name,
							i18 = self.i18n(false, name);
	
							if (name !== i18) {
								file.i18 = i18;
							}
						}
						
						// i18nFolderName
						if (i18nFolderName && ! file.i18) {
							name = 'folder_' + file.name,
							i18 = self.i18n(false, name);
	
							if (name !== i18) {
								file.i18 = i18;
							}
						}
						
						if (self.leafRoots[file.hash]) {
							// has leaf root to `dirs: 1`
							if (! file.dirs) {
								file.dirs = 1;
							}
							// set ts
							$.each(self.leafRoots[file.hash], function() {
								var f = self.file(this);
								if (f && f.ts && (file.ts || 0) < f.ts) {
									file.ts = f.ts;
								}
							});
						}
						
						// lock trash bins holder
						if (self.trashes[file.hash]) {
							file.locked = true;
						}
					}
					delete file.options;
					
					return file;
				}
				return null;
			},
			getDescendants = function(hashes) {
				var res = [];
				$.each(self.files(), function(h, f) {
					$.each(self.parents(h), function(i, ph) {
						if ($.inArray(ph, hashes) !== -1 && $.inArray(h, hashes) === -1) {
							res.push(h);
							return false;
						}
					});
				});
				return res;
			},
			error = [],
			name, i18, i18nFolderName, prevId;
		

		if (data.options) {
			normalizeOptions(data.options);
		}
		
		if (data.cwd) {
			if (data.cwd.volumeid && data.options && Object.keys(data.options).length && self.isRoot(data.cwd)) {
				self.volOptions[data.cwd.volumeid] = data.options;
			}
			data.cwd = filter(data.cwd);
		}
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
		if (data.removed && data.removed.length && self.searchStatus.state === 2) {
			data.removed = data.removed.concat(getDescendants(data.removed));
		}
		if (data.api) {
			data.init = true;
		}

		// merge options that apply only to cwd
		if (data.cwd && data.cwd.options && data.options) {
			Object.assign(data.options, normalizeOptions(data.cwd.options));
		}
		
		// check error
		if (error.length) {
			data.norError = ['errResponse'].concat(error);
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
	setSort : function(type, order, stickFolders, alsoTreeview) {
		this.storage('sortType', (this.sortType = this.sortRules[type] ? type : 'name'));
		this.storage('sortOrder', (this.sortOrder = /asc|desc/.test(order) ? order : 'asc'));
		this.storage('sortStickFolders', (this.sortStickFolders = !!stickFolders) ? 1 : '');
		this.storage('sortAlsoTreeview', (this.sortAlsoTreeview = !!alsoTreeview) ? 1 : '');
		this.trigger('sortchange');
	},
	
	_sortRules : {
		name : function(file1, file2) {
			return elFinder.prototype.naturalCompare(file1.i18 || file1.name, file2.i18 || file2.name);
		},
		size : function(file1, file2) { 
			var size1 = parseInt(file1.size) || 0,
				size2 = parseInt(file2.size) || 0;
				
			return size1 === size2 ? 0 : size1 > size2 ? 1 : -1;
		},
		kind : function(file1, file2) {
			return elFinder.prototype.naturalCompare(file1.mime, file2.mime);
		},
		date : function(file1, file2) { 
			var date1 = file1.ts || file1.date,
				date2 = file2.ts || file2.date;

			return date1 === date2 ? 0 : date1 > date2 ? 1 : -1
		},
		perm : function(file1, file2) { 
			var val = function(file) { return (file.write? 2 : 0) + (file.read? 1 : 0); },
				v1  = val(file1),
				v2  = val(file2);
			return v1 === v2 ? 0 : v1 > v2 ? 1 : -1
		},
		mode : function(file1, file2) { 
			var v1 = file1.mode || (file1.perm || ''),
				v2 = file2.mode || (file2.perm || '');
			return elFinder.prototype.naturalCompare(v1, v2);
		},
		owner : function(file1, file2) { 
			var v1 = file1.owner || '',
				v2 = file2.owner || '';
			return elFinder.prototype.naturalCompare(v1, v2);
		},
		group : function(file1, file2) { 
			var v1 = file1.group || '',
				v2 = file2.group || '';
			return elFinder.prototype.naturalCompare(v1, v2);
		}
	},
	
	/**
	 * Valid sort rule names
	 * 
	 * @type Array
	 */
	sorters : [],
	
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
		
		return type !== 'name' && res === 0
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
			msg      = this.i18n((typeof opts.msg !== 'undefined')? opts.msg : (this.messages['ntf'+type] ? 'ntf'+type : 'ntfsmth')),
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
		} else if (typeof opts.msg !== 'undefined') {
			notify.children('span.elfinder-notify-msg').html(msg);
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
			ndialog.is(':hidden') && ndialog.elfinderdialog('open', this);
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
		
		if (opts.optionsCallback && $.isFunction(opts.optionsCallback)) {
			opts.optionsCallback(options);
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
			i, j, m, escFunc, start = 0;
		
		if (arguments.length && arguments[0] === false) {
			escFunc = function(m){ return m; };
			start = 1;
		}
		for (i = start; i< arguments.length; i++) {
			m = arguments[i];
			
			if (Array.isArray(m)) {
				for (j = 0; j < m.length; j++) {
					if (m[j] instanceof jQuery) {
						// jQuery object is HTML element
						input.push(m[j]);
					} else if (typeof m[j] !== 'undefined'){
						input.push(message('' + m[j]));
					}
				}
			} else if (m instanceof jQuery) {
				// jQuery object is HTML element
				input.push(m[j]);
			} else if (typeof m !== 'undefined'){
				input.push(message('' + m));
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
				m = messages[m] || (escFunc? escFunc(m) : self.escape(m));
				// replace placeholders in message
				m = m.replace(/\$(\d+)/g, function(match, placeholder) {
					placeholder = i + parseInt(placeholder);
					if (placeholder > 0 && input[placeholder]) {
						ignore.push(placeholder)
					}
					return escFunc? escFunc(input[placeholder]) : self.escape(input[placeholder]);
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
	 * Get icon style from file.icon
	 * 
	 * @param  Object  elFinder file object
	 * @return String|Object
	 */
	getIconStyle : function(file, asObject) {
		var self = this,
			template = {
				'background' : 'url(\'{url}\') 0 0 no-repeat',
				'background-size' : 'contain'
			},
			style = '',
			cssObj = {},
			i = 0;
		if (file.icon) {
			style = 'style="';
			$.each(template, function(k, v) {
				if (i++ === 0) {
					v = v.replace('{url}', self.escape(file.icon));
				}
				if (asObject) {
					cssObj[k] = v;
				} else {
					style += k+':'+v+';'
				}
			});
			style += '"';
		}
		return asObject? cssObj : style;
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
		var isObj = typeof(f) == 'object' ? true : false,
			mime  = isObj ? f.mime : f,
			kind;
		

		if (isObj && f.alias && mime != 'symlink-broken') {
			kind = 'Alias';
		} else if (this.kinds[mime]) {
			if (isObj && mime === 'directory' && (! f.phash || f.isroot)) {
				kind = 'Root';
			} else {
				kind = this.kinds[mime];
			}
		}
		if (! kind) {
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
	 * Returns a date string formatted according to the given format string
	 * 
	 * @param  String  format string
	 * @param  Object  Date object
	 * @return String
	 */
	date : function(format, date) {
		var self = this,
			output, d, dw, m, y, h, g, i, s;
		
		if (! date) {
			date = new Date();
		}
		
		h  = date[self.getHours]();
		g  = h > 12 ? h - 12 : h;
		i  = date[self.getMinutes]();
		s  = date[self.getSeconds]();
		d  = date[self.getDate]();
		dw = date[self.getDay]();
		m  = date[self.getMonth]() + 1;
		y  = date[self.getFullYear]();
		
		output = format.replace(/[a-z]/gi, function(val) {
			switch (val) {
				case 'd': return d > 9 ? d : '0'+d;
				case 'j': return d;
				case 'D': return self.i18n(self.i18.daysShort[dw]);
				case 'l': return self.i18n(self.i18.days[dw]);
				case 'm': return m > 9 ? m : '0'+m;
				case 'n': return m;
				case 'M': return self.i18n(self.i18.monthsShort[m-1]);
				case 'F': return self.i18n(self.i18.months[m-1]);
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
		
		return output;
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
			format = ts >= this.yesterday 
				? this.fancyFormat 
				: this.dateFormat;

			output = self.date(format, date);
			
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
		
		if (o.type) {
			c += ' elfinder-' + this.escape(o.type);
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
	
	/**
	 * Return boolean that uploadable MIME type into target folder
	 * 
	 * @param  String  mime    MIME type
	 * @param  String  target  target folder hash
	 * @return Bool
	 */
	uploadMimeCheck : function(mime, target) {
		target = target || this.cwd().hash;
		var res   = true, // default is allow
			mimeChecker = this.option('uploadMime', target),
			allow,
			deny,
			check = function(checker) {
				var ret = false;
				if (typeof checker === 'string' && checker.toLowerCase() === 'all') {
					ret = true;
				} else if (Array.isArray(checker) && checker.length) {
					$.each(checker, function(i, v) {
						v = v.toLowerCase();
						if (v === 'all' || mime.indexOf(v) === 0) {
							ret = true;
							return false;
						}
					});
				}
				return ret;
			};
		if (mime && $.isPlainObject(mimeChecker)) {
			mime = mime.toLowerCase();
			allow = check(mimeChecker.allow);
			deny = check(mimeChecker.deny);
			if (mimeChecker.firstOrder === 'allow') {
				res = false; // default is deny
				if (! deny && allow === true) { // match only allow
					res = true;
				}
			} else {
				res = true; // default is allow
				if (deny === true && ! allow) { // match only deny
					res = false;
				}
			}
		}
		return res;
	},
	
	/**
	 * call chained sequence of async deferred functions
	 * 
	 * @param  Array   tasks async functions
	 * @return Object  jQuery.Deferred
	 */
	sequence : function(tasks) {
		var l = tasks.length,
			chain = function(task, idx) {
				++idx;
				if (tasks[idx]) {
					return chain(task.then(tasks[idx]), idx);
				} else {
					return task;
				}
			};
		if (l > 1) {
			return chain(tasks[0](), 0);
		} else {
			return tasks[0]();
		}
	},
	
	/**
	 * Reload contents of target URL for clear browser cache
	 * 
	 * @param  String  url target URL
	 * @return Object  jQuery.Deferred
	 */
	reloadContents : function(url) {
		var dfd = $.Deferred(),
			ifm;
		try {
			ifm = $('<iframe width="1" height="1" scrolling="no" frameborder="no" style="position:absolute; top:-1px; left:-1px" crossorigin="use-credentials">')
				.attr('src', url)
				.one('load', function() {
					var ifm = $(this);
					try {
						this.contentDocument.location.reload(true);
						ifm.one('load', function() {
							ifm.remove();
							dfd.resolve();
						});
					} catch(e) {
						ifm.attr('src', '').attr('src', url).one('load', function() {
							ifm.remove();
							dfd.resolve();
						});
					}
				})
				.appendTo('body');
		} catch(e) {
			ifm && ifm.remove();
			dfd.reject();
		}
		return dfd;
	},
	
	/**
	 * Make netmount option for OAuth2
	 * 
	 * @param  String   protocol
	 * @param  String   name
	 * @param  String   host
	 * @param  Object   opts  Default {noOffline: false, root: 'root', pathI18n: 'folderId', folders: true}
			}
	 * 
	 * @return Object
	 */
	makeNetmountOptionOauth : function(protocol, name, host, opts) {
		var noOffline = typeof opts === 'boolean'? opts : null, // for backward compat
			opts = Object.assign({
				noOffline : false,
				root      : 'root',
				pathI18n  : 'folderId',
				folders   : true
			}, (noOffline === null? (opts || {}) : {noOffline : noOffline})),
			addFolders = function(fm, bro, folders) {
				var self = this,
					cnt  = Object.keys($.isPlainObject(folders)? folders : {}).length,
					select;
				
				bro.next().remove();
				if (cnt) {
					select = $('<select class="ui-corner-all elfinder-tabstop" style="max-width:200px;">').append(
						$($.map(folders, function(n,i){return '<option value="'+fm.escape((i+'').trim())+'">'+fm.escape(n)+'</option>'}).join(''))
					).on('change click', function(e){
						var node = $(this),
							path = node.val(),
							spn;
						self.inputs.path.val(path);
						if (opts.folders && (e.type === 'change' || node.data('current') !== path)) {
							node.next().remove();
							node.data('current', path);
							if (path != opts.root) {
								spn = spinner();
								if (xhr && xhr.state() === 'pending') {
									xhr.quiet = true;
									xhr.abort();
								}
								node.after(spn);
								xhr = fm.request({
									data : {cmd : 'netmount', protocol: protocol, host: host, user: 'init', path: path, pass: 'folders'},
									preventDefault : true
								}).done(function(data){
									addFolders.call(self, fm, node, data.folders);
								}).always(function() {
									xhr = null;
									spn.remove();
								}).xhr;
							}
						}
					});
					bro.after($('<div/>').append(select));
					select.focus();
				}
			},
			spinner = function() {
				return $('<div class="elfinder-netmount-spinner"/>').append('<span class="elfinder-info-spinner"/>');
			},
			xhr;
		return {
			vars : {},
			name : name,
			inputs: {
				offline  : $('<input type="checkbox"/>').on('change', function() {
					$(this).parents('table.elfinder-netmount-tb').find('select:first').trigger('change', 'reset');
				}),
				host     : $('<span><span class="elfinder-info-spinner"/></span><input type="hidden"/>'),
				path     : $('<input type="text" value="'+opts.root+'"/>'),
				user     : $('<input type="hidden"/>'),
				pass     : $('<input type="hidden"/>')
			},
			select: function(fm, ev, data){
				var f = this.inputs,
					oline = f.offline,
					f0 = $(f.host[0]),
					data = data || null;
				this.vars.mbtn = f.host.closest('.ui-dialog').children('.ui-dialog-buttonpane:first').find('button.elfinder-btncnt-0');
				if (! f0.data('inrequest')
						&& (f0.find('span.elfinder-info-spinner').length
							|| data === 'reset'
							|| (data === 'winfocus' && ! f0.siblings('span.elfinder-button-icon-reload').length))
							)
				{
					if (oline.parent().children().length === 1) {
						f.path.parent().prev().html(fm.i18n(opts.pathI18n));
						oline.attr('title', fm.i18n('offlineAccess'));
						oline.uniqueId().after($('<label/>').attr('for', oline.attr('id')).html(' '+fm.i18n('offlineAccess')));
					}
					f0.data('inrequest', true).empty().addClass('elfinder-info-spinner')
						.parent().find('span.elfinder-button-icon').remove();
					fm.request({
						data : {cmd : 'netmount', protocol: protocol, host: host, user: 'init', options: {id: fm.id, offline: oline.prop('checked')? 1:0, pass: f.host[1].value}},
						preventDefault : true
					}).done(function(data){
						f0.removeClass("elfinder-info-spinner").html(data.body.replace(/\{msg:([^}]+)\}/g, function(whole,s1){return fm.i18n(s1, host);}));
					});
					opts.noOffline && oline.closest('tr').hide();
				} else {
					oline.closest('tr')[(opts.noOffline || f.user.val())? 'hide':'show']();
					f0.data('funcexpup') && f0.data('funcexpup')();
				}
				this.vars.mbtn[$(f.host[1]).val()? 'show':'hide']();
			},
			done: function(fm, data){
				var f = this.inputs,
					p = this.protocol,
					f0 = $(f.host[0]),
					f1 = $(f.host[1]),
					expires = '&nbsp;';
				
				opts.noOffline && f.offline.closest('tr').hide();
				if (data.mode == 'makebtn') {
					f0.removeClass('elfinder-info-spinner').removeData('expires').removeData('funcexpup');
					f.host.find('input').hover(function(){$(this).toggleClass('ui-state-hover');});
					f1.val('');
					f.path.val(opts.root).next().remove();
					f.user.val('');
					f.pass.val('');
					! opts.noOffline && f.offline.closest('tr').show();
					this.vars.mbtn.hide();
				} else if (data.mode == 'folders') {
					if (data.folders) {
						addFolders.call(this, fm, f.path.nextAll(':last'), data.folders);
					}
				} else {
					if (data.expires) {
						expires = '()';
						f0.data('expires', data.expires);
					}
					f0.html(host + expires).removeClass('elfinder-info-spinner');
					if (data.expires) {
						f0.data('funcexpup', function() {
							var rem = Math.floor((f0.data('expires') - (+new Date()) / 1000) / 60);
							if (rem < 3) {
								f0.parent().children('.elfinder-button-icon-reload').click();
							} else {
								f0.text(f0.text().replace(/\(.*\)/, '('+fm.i18n(['minsLeft', rem])+')'));
								setTimeout(function() {
									if (f0.is(':visible')) {
										f0.data('funcexpup')();
									}
								}, 60000);
							}
						});
						f0.data('funcexpup')();
					}
					if (data.reset) {
						p.trigger('change', 'reset');
						return;
					}
					f0.parent().append($('<span class="elfinder-button-icon elfinder-button-icon-reload" title="'+fm.i18n('reAuth')+'">')
						.on('click', function() {
							f1.val('reauth');
							p.trigger('change', 'reset');
						}));
					f1.val(protocol);
					this.vars.mbtn.show();
					if (data.folders) {
						addFolders.call(this, fm, f.path, data.folders);
					}
					f.user.val('done');
					f.pass.val('done');
					f.offline.closest('tr').hide();
				}
				f0.removeData('inrequest');
			},
			fail: function(fm, err){
				$(this.inputs.host[0]).removeData('inrequest');
				this.protocol.trigger('change', 'reset');
			}
		};
	},
	
	/**
	 * Find cwd's nodes from files
	 * 
	 * @param  Array    files
	 * @param  Object   opts   {firstOnly: true|false}
	 */
	findCwdNodes : function(files, opts) {
		var self    = this,
			cwd     = this.getUI('cwd'),
			cwdHash = this.cwd().hash,
			newItem = $();
		
		opts = opts || {};
		
		$.each(files, function(i, f) {
			if (f.phash === cwdHash) {
				newItem = newItem.add(cwd.find('#'+self.cwdHash2Id(f.hash)));
				if (opts.firstOnly) {
					return false;
				}
			}
		});
		
		return newItem;
	},
	
	/**
	 * Convert from relative URL to abstract URL based on current URL
	 * 
	 * @param  String  URL
	 * @return String
	 */
	convAbsUrl : function(url) {
		if (url.match(/^http/i)) {
			return url;
		}
		if (url.substr(0,2) === '//') {
			return window.location.protocol + url;
		}
		var root = window.location.protocol + '//' + window.location.host,
			reg  = /[^\/]+\/\.\.\//,
			ret;
		if (url.substr(0, 1) === '/') {
			ret = root + url;
		} else {
			ret = root + window.location.pathname.replace(/\/[^\/]+$/, '/') + url;
		}
		ret = ret.replace('/./', '/');
		while(reg.test(ret)) {
			ret = ret.replace(reg, '');
		}
		return ret;
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
	
	isInWindow : function(elem, nochkHide) {
		var elm, rect;
		if (! (elm = elem.get(0))) {
			return false;
		}
		if (! nochkHide && elm.offsetParent === null) {
			return false;
		}
		rect = elm.getBoundingClientRect();
		return document.elementFromPoint(rect.left, rect.top)? true : false;
	},
	
	/**
	 * calculate elFinder node z-index
	 * 
	 * @return void
	 */
	zIndexCalc : function() {
		var self = this,
			node = this.getUI(),
			ni = node.css('z-index');
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
	},
	
	/**
	 * Load JavaScript files
	 * 
	 * @param  Array    urls      to load JavaScript file URLs
	 * @param  Function callback  call back function on script loaded
	 * @param  Object   opts      Additional options to $.ajax OR {loadType: 'tag'} to load by script tag
	 * @param  Object   check     { obj: (Object)ParentObject, name: (String)"Attribute name", timeout: (Integer)milliseconds }
	 * @return elFinder
	 */
	loadScript : function(urls, callback, opts, check) {
		var defOpts = {
				dataType : 'script',
				cache    : true
			},
			success = null;
		if ($.isFunction(callback)) {
			success = function() {
				if (check) {
					if (typeof check.obj[check.name] === 'undefined') {
						var cnt = check.timeout? (check.timeout / 10) : 1000; // timeout 10 secs
						var fi = setInterval(function() {
							if (--cnt > 0 && typeof check.obj[check.name] !== 'undefined') {
								clearInterval(fi);
								callback();
							}
						}, 10);
					} else {
						callback();
					}
				} else {
					callback();
				}
			}
		}
		if (opts && opts.loadType === 'tag') {
			$.each(urls, function(i, url) {
				$('head').append($('<script defer="defer">').attr('src', url));
			});
			success();
		} else {
			opts = $.isPlainObject(opts)? Object.assign(defOpts, opts) : defOpts;
			(function appendScript() {
				$.ajax(Object.assign(opts, {
					url: urls.shift(),
					success: urls.length? appendScript : success
				}));
			})();
		}
		return this;
	},
	
	/**
	 * Load CSS files
	 * 
	 * @param  Array    to load CSS file URLs
	 * @return elFinder
	 */
	loadCss : function(urls) {
		var self = this;
		if (typeof urls === 'string') {
			urls = [ urls ];
		}
		$.each(urls, function(i, url) {
			url = self.convAbsUrl(url).replace(/^https?:/i, '');
			if (! $("head > link[href='+url+']").length) {
				$('head').append('<link rel="stylesheet" type="text/css" href="' + url + '" />');
			}
		});
		return this;
	},
	
	/**
	 * Abortable async job performer
	 * 
	 * @param func Function
	 * @param arr  Array
	 * @param opts Object
	 * 
	 * @return Object $.Deferred that has an extended method _abort()
	 */
	asyncJob : function(func, arr, opts) {
		var dfrd = $.Deferred().always(function() {
				dfrd._abort = function() {};
			}),
			abortFlg = false,
			parms = Object.assign({
				interval : 0,
				numPerOnce : 1
			}, opts || {}),
			resArr = [],
			vars =[],
			curVars = [],
			exec,
			tm;
		
		dfrd._abort = function(resolve) {
			tm && clearTimeout(tm);
			vars = [];
			abortFlg = true;
			if (dfrd.state() === 'pending') {
				dfrd[resolve? 'resolve' : 'reject'](resArr);
			}
		};
		if (typeof func === 'function' && Array.isArray(arr)) {
			vars = arr.concat();
			exec = function() {
				if (abortFlg) {
					return;
				}
				curVars = vars.splice(0, parms.numPerOnce);
				$.each(curVars, function(i, v) {
					if (abortFlg) {
						return false;
					}
					var res = func(v);
					(res !== null) && resArr.push(res);
				});
				if (abortFlg) {
					return;
				}
				if (vars.length) {
					tm = setTimeout(exec, parms.interval);
				} else {
					dfrd.resolve(resArr);
				}
			}
			if (vars.length) {
				tm = setTimeout(exec, 0);
				//exec();
			} else {
				dfrd.resolve(resArr);
			}
		} else {
			dfrd.reject();
		}
		return dfrd;
	},
	
	log : function(m) { window.console && window.console.log && window.console.log(m); return this; },
	
	debug : function(type, m) {
		var d = this.options.debug;

		if (d == 'all' || d === true || (Array.isArray(d) && $.inArray(type, d) != -1)) {
			window.console && window.console.log && window.console.log('elfinder debug: ['+type+'] ['+this.id+']', m);
		} 
		
		if (type === 'backend-debug') {
			this.trigger('backenddebug', m);
		}
		
		return this;
	},
	time : function(l) { window.console && window.console.time && window.console.time(l); },
	timeEnd : function(l) { window.console && window.console.timeEnd && window.console.timeEnd(l); }
	

};

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
	})();
};
// Array.isArray
if (!Array.isArray) {
	Array.isArray = function(arr) {
		return jQuery.isArray(arr);
	};
}
// Object.assign
if (!Object.assign) {
	Object.assign = function() {
		return jQuery.extend.apply(null, arguments);
	};
}



/*
 * File: /js/elFinder.version.js
 */

/**
 * Application version
 *
 * @type String
 **/
elFinder.prototype.version = '2.1.24';



/*
 * File: /js/jquery.elfinder.js
 */

/*** jQuery UI droppable performance tune for elFinder ***/
(function(){
if ($.ui) {
	if ($.ui.ddmanager) {
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
	  touchHandled,
	  posX, posY;

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

	if (! $(event.currentTarget).hasClass('touch-punch-keep-default')) {
		event.preventDefault();
	}

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

	// Track element position to avoid "false" move
	posX = event.originalEvent.changedTouches[0].screenX.toFixed(0);
	posY = event.originalEvent.changedTouches[0].screenY.toFixed(0);

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

	// Ignore if it's a "false" move (position not changed)
	var x = event.originalEvent.changedTouches[0].screenX.toFixed(0);
	var y = event.originalEvent.changedTouches[0].screenY.toFixed(0);
	// Ignore if it's a "false" move (position not changed)
	if (Math.abs(posX - x) <= 2 && Math.abs(posY - y) <= 2) {
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
	this._touchMoved = false;
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
		self.element.on({
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
		self.element.off({
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
			new elFinder(this, typeof(o) == 'object' ? o : {});
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
};


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
	 * Maximum number of concurrent connections on request
	 * 
	 * @type Number
	 * @default 3
	 */
	requestMaxConn : 3,

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
	 * Confirmation dialog displayed at the time of overwriting upload
	 * 
	 * @type Boolean
	 * @default true
	 */
	overwriteUploadConfirm : true,
	
	/**
	 * Max size of chunked data of file upload
	 * 
	 * @type Number
	 * @default  10485760(10MB)
	 */
	uploadMaxChunkSize : 10485760,
	
	/**
	 * Regular expression of file name to exclude when uploading folder
	 * 
	 * @type Object
	 * @default { win: /^(?:desktop\.ini|thumbs\.db)$/i, mac: /^\.ds_store$/i }
	 */
	folderUploadExclude : {
		win: /^(?:desktop\.ini|thumbs\.db)$/i,
		mac: /^\.ds_store$/i
	},
	
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
	 * Auto load required CSS
	 * `false` to disable this function or
	 * CSS URL Array to load additional CSS files
	 * 
	 * @type Boolean|Array
	 * @default true
	 */
	cssAutoLoad : true,
	
	/**
	 * Additional css class for filemanager node.
	 *
	 * @type String
	 */
	cssClass : '',

	/**
	 * Active commands list. '*' means all of the commands that have been load.
	 * If some required commands will be missed here, elFinder will add its
	 *
	 * @type Array
	 */
	commands : ['*'],
	// Available commands list
	//commands : [
	//	'archive', 'back', 'chmod', 'colwidth', 'copy', 'cut', 'download', 'duplicate',
	//	'edit', 'extract', 'forward', 'fullscreen', 'getfile', 'help', 'home', 'info',
	//	'mkdir', 'mkfile', 'netmount', 'netunmount', 'open', 'opendir', 'paste', 'places',
	//	'quicklook', 'reload', 'rename', 'resize', 'rm', 'search', 'sort', 'up', 'upload', 'view'
	//],
	
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
			// get path before callback call
			getPath    : true, 
			// get image sizes before callback call
			getImgSize : false
		},
		open : {
			// HTTP method that request to the connector when item URL is not valid URL.
			// If you set to "get" will be displayed request parameter in the browser's location field
			// so if you want to conceal its parameters should be given "post".
			// Nevertheless, please specify "get" if you want to enable the partial request by HTTP Range header.
			method : 'post',
			// Where to open into : 'window'(default), 'tab' or 'tabs'
			// 'tabs' opens in each tabs
			into   : 'window'
		},
		// "upload" command options.
		upload : {
			// Open elFinder upload dialog: 'button' OR Open system OS upload dialog: 'uploadbutton'
			ui : 'button'
		},
		// "download" command options.
		download : {
			maxRequests : 10
		},
		// "quicklook" command options.
		quicklook : {
			autoplay : true,
			width    : 450,
			height   : 300,
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
				// 	 * @return Object      editor instance|jQuery.Deferred(return instance on resolve())
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
				// 	/**
				// 	 * Called after dialog resized..
				// 	 *
				// 	 * @param  DOMElement  textarea node
				// 	 * @param  Object      wysisyg instance (if was returned by "load" callback)
				// 	 * @param  Object      resize event object
				// 	 * @param  Object      data object
				// 	 * @return void
				// 	 */
				// 	resize : function(textarea, instance, event, data) {}
				// 
				// }
			],
			// Character encodings of select box
			encodings : ['Big5', 'Big5-HKSCS', 'Cp437', 'Cp737', 'Cp775', 'Cp850', 'Cp852', 'Cp855', 'Cp857', 'Cp858', 
				'Cp862', 'Cp866', 'Cp874', 'EUC-CN', 'EUC-JP', 'EUC-KR', 'ISO-2022-CN', 'ISO-2022-JP', 'ISO-2022-KR', 
				'ISO-8859-1', 'ISO-8859-2', 'ISO-8859-3', 'ISO-8859-4', 'ISO-8859-5', 'ISO-8859-6', 'ISO-8859-7', 
				'ISO-8859-8', 'ISO-8859-9', 'ISO-8859-13', 'ISO-8859-15', 'KOI8-R', 'KOI8-U', 'Shift-JIS', 
				'Windows-1250', 'Windows-1251', 'Windows-1252', 'Windows-1253', 'Windows-1254', 'Windows-1257']
		},
		search : {
			// Incremental search from the current view
			incsearch : {
				enable : true, // is enable true or false
				minlen : 1,    // minimum number of characters
				wait   : 500   // wait milliseconds
			}
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
			intoNewFolderToolbtn: false
		},
		resize: {
			// defalt status of snap to 8px grid of the jpeg image ("enable" or "disable")
			grid8px : 'enable'
		},
		rm: {
			// If trash is valid, items moves immediately to the trash holder without confirm.
			quickTrash : true
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
	 * If you want to find the hash in Javascript
	 * can be obtained with the following code. (In the case of a standard hashing method)
	 * 
	 * var volumeId = 'l1_'; // volume id
	 * var path = 'path/to/target'; // without root path
	 * //var path = 'path\\to\\target'; // use \ on windows server
	 * var hash = volumeId + btoa(path).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '.').replace(/\.+$/, '');
	 * 
	 * @type String
	 * @default ""
	 */
	startPathHash : '',

	/**
	 * Emit a sound when a file is deleted
	 * Sounds are in sounds/ folder
	 * 
	 * @type Boolean
	 * @default true
	 */
	sound : true,
	
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
			['fullscreen']
		],
		// toolbar extra options
		toolbarExtra : {
			// also displays the text label on the button (true / false)
			displayTextLabel: false,
			// Exclude `displayTextLabel` setting UA type
			labelExcludeUA: ['Mobile'],
			// auto hide on initial open
			autoHideUA: ['Mobile']
		},
		// directories tree options
		tree : {
			// expand current root on init
			openRootOnLoad : true,
			// expand current work directory on open
			openCwdOnOpen  : true,
			// auto loading current directory parents and do expand their node.
			syncTree : true,
			// Maximum number of display of each child trees
			// The tree of directories with children exceeding this number will be split
			subTreeMax : 100,
			// Numbar of max connctions of subdirs request
			subdirsMaxConn : 3,
			// Number of max simultaneous processing directory of subdirs
			subdirsAtOnce : 5
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
				// for custom, characters that can be used in the name is `a-z0-9_`
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

			// /**
			//  * Add CSS class name to cwd directories (optional)
			//  * see: https://github.com/Studio-42/elFinder/pull/1061,
			//  *      https://github.com/Studio-42/elFinder/issues/1231
			//  * 
			//  * @type Function
			//  */
			// ,
			// getClass: function(file) {
			// 	// e.g. This adds the directory's name (lowercase) with prefix as a CSS class
			// 	return 'elfinder-cwd-' + file.name.replace(/[ "]/g, '').toLowerCase();
			//}
			
			//,
			//// Template placeholders replacement rules for overwrite. see ui/cwd.js replacement
			//replacement : {
			//	tooltip : function(f, fm) {
			//		var list = fm.viewType == 'list', // current view type
			//			query = fm.searchStatus.state == 2, // is in search results
			//			title = fm.formatDate(f) + (f.size > 0 ? ' ('+fm.formatSize(f.size)+')' : ''),
			//			info  = '';
			//		if (query && f.path) {
			//			info = fm.escape(f.path.replace(/\/[^\/]*$/, ''));
			//		} else {
			//			info = f.tooltip? fm.escape(f.tooltip).replace(/\r/g, '&#13;') : '';
			//		}
			//		if (list) {
			//			info += (info? '&#13;' : '') + fm.escape(f.name);
			//		}
			//		return info? info + '&#13;' + title : title;
			//	}
			//}
		}
	},

	/**
	 * MIME regex of send HTTP header "Content-Disposition: inline" or allow preview in quicklook
	 * This option will overwrite by connector configuration
	 * 
	 * @type String
	 * @default '^(?:(?:image|video|audio)|text/plain|application/pdf$)'
	 * @example
	 *  dispInlineRegex : '.',  // is allow inline of all of MIME types
	 *  dispInlineRegex : '$^', // is not allow inline of all of MIME types
	 */
	dispInlineRegex : '^(?:(?:image|video|audio)|(?:text/plain|application/pdf)$)',

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
	 * All default rules (name/size/kind/date/perm/mode/owner/group) set in elFinder._sortRules
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
	 * Sort also applies to the treeview
	 *
	 * @type {Boolean}
	 * @default false
	 */
	sortAlsoTreeview : false,
	
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
	 * elFinder node height
	 * Number: pixcel or String: Number + "%"
	 *
	 * @type Number | String
	 * @default  400
	 */
	height : 400,
	
	/**
	 * Base node object or selector
	 * Element which is the reference of the height percentage
	 *
	 * @type Object|String
	 * @default null | $(window) (if height is percentage)
	 **/
	heightBase : null,
	
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
		navbar : ['open', 'download', '|', 'upload', 'mkdir', '|', 'copy', 'cut', 'paste', 'duplicate', '|', 'rm', '|', 'rename', '|', 'archive', '|', 'places', 'info', 'chmod', 'netunmount'],
		// current directory menu
		cwd    : ['reload', 'back', '|', 'upload', 'mkdir', 'mkfile', 'paste', '|', 'view', 'sort', 'colwidth', '|', 'info', '|', 'fullscreen'],
		// current directory file menu
		files  : ['getfile', '|' ,'open', 'download', 'opendir', 'quicklook', '|', 'upload', 'mkdir', '|', 'copy', 'cut', 'paste', 'duplicate', '|', 'rm', '|', 'edit', 'rename', 'resize', '|', 'archive', 'extract', '|', 'places', 'info', 'chmod', 'netunmount']
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
	 * elFinder node enable by mouse over
	 * 
	 * @type     Bool
	 * @default  true
	 */
	enableByMouseOver : true,

	/**
	 * Show window close confirm dialog
	 * Value is which state to show
	 * 'hasNotifyDialog', 'editingFile', 'hasSelectedItem' and 'hasClipboardData'
	 * 
	 * @type     Array
	 * @default  ['hasNotifyDialog', 'editingFile']
	 */
	windowCloseConfirm : ['hasNotifyDialog', 'editingFile'],

	/**
	 * Function decoding 'raw' string converted to unicode
	 * It is used instead of fm.decodeRawString(str)
	 * 
	 * @type Null|Function
	 */
	rawStringDecoder : typeof Encoding === 'object' && $.isFunction(Encoding.convert)? function(str) {
		return Encoding.convert(str, {
			to: 'UNICODE',
			type: 'string'
		});
	} : null,

	/**
	 * Debug config
	 *
	 * @type Array|Boolean
	 */
	// debug : true
	debug : ['error', 'warning', 'event-destroy']
};


/*
 * File: /js/elFinder.options.netmount.js
 */

/**
 * Default elFinder config of commandsOptions.netmount
 *
 * @type  Object
 */

elFinder.prototype._options.commandsOptions.netmount = {
	ftp: {
		name : 'FTP',
		inputs: {
			host     : $('<input type="text"/>'),
			port     : $('<input type="text" placeholder="21"/>'),
			path     : $('<input type="text" value="/"/>'),
			user     : $('<input type="text"/>'),
			pass     : $('<input type="password" autocomplete="new-password"/>'),
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
	dropbox2: elFinder.prototype.makeNetmountOptionOauth('dropbox2', 'Dropbox', 'Dropbox', {noOffline : true, root : '/', pathI18n : 'path'}),
	googledrive: elFinder.prototype.makeNetmountOptionOauth('googledrive', 'Google Drive', 'Google'),
	onedrive: elFinder.prototype.makeNetmountOptionOauth('onedrive', 'One Drive', 'OneDrive'),
	box: elFinder.prototype.makeNetmountOptionOauth('box', 'Box', 'Box', {noOffline : true})
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
	 * Command icon class name with out 'elfinder-button-icon-'
	 * Use this.name if it is empty
	 *
	 * @type  String
	 */
	this.className = '';

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
	
	this.syncTitleOnChange = false;
	
	/**
	 * elFinder events defaults handlers.
	 * Inside handlers "this" is current command object
	 *
	 * @type  Object
	 */
	this._handlers = {
		enable  : function() { this.update(void(0), this.value); },
		disable : function() { this.update(-1, this.value); },
		'open reload load sync'    : function() { 
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
			fm   = this.fm, i, s, sc, cb;

		this.name      = name;
		this.title     = fm.messages['cmd'+name] ? fm.i18n('cmd'+name)
		               : ((this.extendsCmd && fm.messages['cmd'+this.extendsCmd]) ? fm.i18n('cmd'+this.extendsCmd) : name), 
		this.options   = Object.assign({}, this.options, opts);
		this.listeners = [];

		if (opts.shortcuts) {
			if (typeof opts.shortcuts === 'function') {
				sc = opts.shortcuts(this.fm, this.shortcuts);
			} else if (Array.isArray(opts.shortcuts)) {
				sc = opts.shortcuts;
			}
			this.shortcuts = sc || [];
		}

		if (this.updateOnSelect) {
			this._handlers.select = function() { this.update(void(0), this.value); }
		}

		$.each(Object.assign({}, self._handlers, self.handlers), function(cmd, handler) {
			fm.bind(cmd, $.proxy(handler, self));
		});

		for (i = 0; i < this.shortcuts.length; i++) {
			s = this.shortcuts[i];
			cb = s.callback || self.exec;
			s.callback = function(e) {
				var enabled, checks = {};
				if (fm.searchStatus.state < 2) {
					enabled = fm.isCommandEnabled(self.name);
				} else {
					$.each(fm.selected(), function(i, h) {
						if (fm.optionsByHashes[h]) {
							checks[h] = true;
						} else {
							$.each(fm.volOptions, function(id) {
								if (!checks[id] && h.indexOf(id) === 0) {
									checks[id] = true;
									return false;
								}
							});
						}
					});
					$.each(checks, function(h) {
						enabled = fm.isCommandEnabled(self.name, h);
						if (! enabled) {
							return false;
						}
					});
				}
				if (enabled) {
					self.event = e;
					cb.call(self);
					delete self.event;
				}
			};
			!s.description && (s.description = this.title);
			fm.shortcut(s);
		}

		if (this.disableOnSearch) {
			fm.bind('search searchend', function() {
				self._disabled = this.type === 'search'? true : ! (this.alwaysEnabled || fm.isCommandEnabled(name));
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

		if (this._disabled && this.fm.searchStatus === 0) {
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
			? $.map(Array.isArray(hashes) ? hashes : [hashes], function(hash) { return fm.file(hash) ? hash : null; })
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
			? $.map(Array.isArray(hashes) ? hashes : [hashes], function(hash) { return fm.file(hash) || null })
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
		searchbtn   : 'elfinder-button-search',
		editing     : 'elfinder-to-editing'
	},
	tpl : {
		perms      : '<span class="elfinder-perms"/>',
		lock       : '<span class="elfinder-lock"/>',
		symlink    : '<span class="elfinder-symlink"/>',
		navicon    : '<span class="elfinder-nav-icon"/>',
		navspinner : '<span class="elfinder-navbar-spinner"/>',
		navdir     : '<div class="elfinder-navbar-wrapper{root}"><span id="{id}" class="ui-corner-all elfinder-navbar-dir {cssclass}"><span class="elfinder-navbar-arrow"/><span class="elfinder-navbar-icon" {style}/>{symlink}{permissions}{name}</span><div class="elfinder-navbar-subtree" style="display:none"/></div>',
		placedir   : '<div class="elfinder-navbar-wrapper"><span id="{id}" class="ui-corner-all elfinder-navbar-dir {cssclass}" title="{title}"><span class="elfinder-navbar-arrow"/><span class="elfinder-navbar-icon" {style}/>{symlink}{permissions}{name}</span><div class="elfinder-navbar-subtree" style="display:none"/></div>'
		
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
				org  = (this.origin && this.origin === 'navbar')? 'tree' : 'cwd',
				ui   = fm.getUI(org),
				tree = (org === 'tree'),
				find = tree? 'navHash2Id' : 'cwdHash2Id',
				tarea= (! tree && fm.storage('view') != 'list'),
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
					} else if (pnode) {
						pnode.css('width', '')
							.parent('td').css('overflow', '');
					}
				}, colwidth,
				dfrd = $.Deferred()
					.fail(function(error) {
						dstCls && dst.attr('class', dstCls);
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
						cleanup();
						fm.enable();
						fm.trigger('resMixinMake');
					}),
				id    = 'tmp_'+parseInt(Math.random()*100000),
				phash = tree? fm.file(sel[0]).hash : fm.cwd().hash,
				date = new Date(),
				file   = {
					hash  : id,
					phash : phash,
					name  : fm.uniqueName(this.prefix, phash),
					mime  : this.mime,
					read  : true,
					write : true,
					date  : 'Today '+date.getHours()+':'+date.getMinutes(),
					move  : move
				},
				data = this.data || {},
				node = ui.trigger('create.'+fm.namespace, file).find('#'+fm[find](id))
					.on('unselect.'+fm.namespace, function() {
						setTimeout(function() {
							input && input.blur();
						}, 50);
					}),
				nnode, pnode,
				overlay = fm.getUI('overlay'),
				cleanup = function() {
					fm.unbind('resize', resize);
					input.remove();
					if (tree) {
						node.closest('.elfinder-navbar-wrapper').remove();
					}
					node.remove();
				},
				cancel = function(e) { 
					if (! inError) {
						cleanup();
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
							if (!name || name === '.' || name === '..' || !valid) {
								inError = true;
								fm.error(file.mime === 'directory'? 'errInvDirname' : 'errInvName', {modal: true, close: select});
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
								input.hide().before($('<span>').text(name));

								fm.lockfiles({files : [id]});

								fm.request({
										data        : Object.assign({cmd : cmd, name : name, target : phash}, data || {}), 
										notify      : {type : cmd, cnt : 1},
										preventFail : true,
										syncOnFail  : true
									})
									.fail(function(error) {
										fm.unlockfiles({files : [id]});
										inError = true;
										input.show().prev().remove();
										fm.error(error, {modal: true, close: select});
									})
									.done(function(data) {
										dfrd.resolve(data);
										if (data && data.added && data.added[0]) {
											var item    = data.added[0],
												dirhash = item.hash,
												newItem = ui.find('#'+fm[find](dirhash));
											if (sel && move) {
												fm.one(cmd+'done', function() {
													fm.exec('paste', dirhash);
												});
											}
											fm.one(cmd+'done', function() {
												var acts = {
														'directory' : { cmd: 'open', msg: 'cmdopendir' },
														'text/plain': { cmd: 'edit', msg: 'cmdedit' },
														'default'   : { cmd: 'open', msg: 'cmdopen' }
													},
													act, extNode;
												newItem = ui.find('#'+fm[find](item.hash));
												if (data.added.length === 1) {
													act = acts[item.mime] || acts['default'];
													extNode = $('<div/>').append(
														$('<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all elfinder-tabstop"><span class="ui-button-text">'
															+fm.i18n(act.msg)
															+'</span></button>')
														.on('mouseenter mouseleave', function(e) { 
															$(this).toggleClass('ui-state-hover', e.type == 'mouseenter');
														})
														.on('click', function() {
															fm.exec(act.cmd, item.hash);
														})
													);
												}
												if (newItem.length) {
													newItem.trigger('scrolltoview');
													! move && extNode && fm.toast({msg: fm.i18n(['complete', fm.i18n('cmd'+cmd)]), extNode: extNode});
												} else {
													fm.trigger('selectfiles', {files : $.map(data.added, function(f) {return f.hash;})});
													! move && fm.toast({msg: fm.i18n(['complete', fm.i18n('cmd'+cmd)]), extNode: extNode});
												}
											});
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
				resize = function() {
					node.trigger('scrolltoview');
				},
				inError = false,
				// for tree
				dst, dstCls, collapsed, expanded, arrow, subtree;

			if ((! tree && this.disabled()) || !node.length) {
				return dfrd.reject();
			}

			if (tree) {
				dst = $('#'+fm[find](phash));
				collapsed = fm.res('class', 'navcollapse');
				expanded  = fm.res('class', 'navexpand');
				arrow = fm.res('class', 'navarrow');
				subtree = fm.res('class', 'navsubtree');
				
				node.closest('.'+subtree).show();
				if (! dst.hasClass(collapsed)) {
					dstCls = dst.attr('class');
					dst.addClass(collapsed+' '+expanded+' elfinder-subtree-loaded');
				}
				if (dst.is('.'+collapsed+':not(.'+expanded+')')) {
					dst.children('.'+arrow).click().data('dfrd').done(function() {
						if (input.val() === file.name) {
							input.val(fm.uniqueName(this.prefix, phash)).select().focus();
						}
					}.bind(this));
				}
				nnode = node.contents().filter(function(){ return this.nodeType==3 && $(this).parent().attr('id') === fm.navHash2Id(file.hash); });
				nnode.replaceWith(input.val(file.name));
			} else {
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
			}
			
			fm.bind('resize', resize);
			
			input.trigger('keyup');
			select();

			return dfrd;

		}
	},
	blink: function(elm, mode) {
		var acts = {
			slowonce : function(){elm.hide().delay(250).fadeIn(750).delay(500).fadeOut(3500);},
			lookme   : function(){elm.show().fadeOut(500).fadeIn(750);}
		}, func;
		mode = mode || 'slowonce';
		
		func = acts[mode] || acts['lookme'];
		
		elm.stop(true, true);
		func();
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
				.draggable({
					handle : '.dialogelfinder-drag',
					containment : 'window',
					stop : function() {
						node.trigger('resize');
						elfinder.trigger('resize');
					}
				})
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
 * @version 2017-05-11
 */
// elfinder.en.js is integrated into elfinder.(full|min).js by jake build
if (typeof elFinder === 'function' && elFinder.prototype.i18) {
	elFinder.prototype.i18.en = {
		translator : 'Troex Nevelin &lt;troex@fury.scancode.ru&gt;',
		language   : 'English',
		direction  : 'ltr',
		dateFormat : 'M d, Y h:i A', // Mar 13, 2012 05:27 PM
		fancyDateFormat : '$1 h:i A', // will produce smth like: Today 12:25 PM,
		nonameDateFormat : 'ymd-His', // to apply if upload file is noname: 120513172700
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
			'errInvDirname'        : 'Invalid folder name.',  // from v2.1.24 added 12.4.2017
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
			'errTrash'             : 'Unable into trash.', // from v2.1.24 added 30.4.2017
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
			'errNetUnMount'        : 'Unable to unmount.', // from v2.1 added 30.04.2012
			'errConvUTF8'          : 'Not convertible to UTF-8', // from v2.1 added 08.04.2014
			'errFolderUpload'      : 'Try the modern browser, If you\'d like to upload the folder.', // from v2.1 added 26.6.2015
			'errSearchTimeout'     : 'Timed out while searching "$1". Search result is partial.', // from v2.1 added 12.1.2016
			'errReauthRequire'     : 'Re-authorization is required.', // from v2.1.10 added 24.3.2016
			'errMaxTargets'        : 'Max number of selectable items is $1.', // from v2.1.17 added 17.10.2016
			'errRestore'           : 'Unable to restore from the trash. Can\'t identify the restore destination.', // from v2.1.24 added 3.5.2017

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
			'cmdtrash'     : 'Into trash', //from v2.1.24 added 29.4.2017
			'cmdrestore'   : 'Restore', //from v2.1.24 added 3.5.2017
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
			'cmdcolwidth'  : 'Reset column width', // from v2.1.13 added 12.06.2016
			'cmdfullscreen': 'Full Screen', // from v2.1.15 added 03.08.2016
			'cmdmove'      : 'Move', // from v2.1.15 added 21.08.2016

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
			'btnRename'    : 'Rename',      // from v2.1.24 added 6.4.2017
			'btnRenameAll' : 'Rename(All)', // from v2.1.24 added 6.4.2017
			'btnPrevious' : 'Prev ($1/$2)', // from v2.1.24 added 11.5.2017
			'btnNext'     : 'Next ($1/$2)', // from v2.1.24 added 11.5.2017

			/******************************** notifications ********************************/
			'ntfopen'     : 'Open folder',
			'ntffile'     : 'Open file',
			'ntfreload'   : 'Reload folder content',
			'ntfmkdir'    : 'Creating folder',
			'ntfmkfile'   : 'Creating files',
			'ntfrm'       : 'Delete files',
			'ntfcopy'     : 'Copy files',
			'ntfmove'     : 'Move files',
			'ntfprepare'  : 'Checking existing items',
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
			'ntfparents'  : 'Getting path infomation', // from v2.1.17 added 2.11.2016
			'ntfchunkmerge': 'Processing the uploaded file', // from v2.1.17 added 2.11.2016
			'ntftrash'    : 'Doing throw in the trash', // from v2.1.24 added 2.5.2017
			'ntfrestore'  : 'Doing restore from tha trash', // from v2.1.24 added 3.5.2017
			'ntfchkdir'   : 'Checking destination folder', // from v2.1.24 added 3.5.2017

			/*********************************** volumes *********************************/
			'volume_Trash' : 'Trash', //from v2.1.24 added 29.4.2017

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
			'sortperm'          : 'by permission', // from v2.1.13 added 13.06.2016
			'sortmode'          : 'by mode',       // from v2.1.13 added 13.06.2016
			'sortowner'         : 'by owner',      // from v2.1.13 added 13.06.2016
			'sortgroup'         : 'by group',      // from v2.1.13 added 13.06.2016
			'sortAlsoTreeview'  : 'Also Treeview',  // from v2.1.15 added 01.08.2016

			/********************************** new items **********************************/
			'untitled file.txt' : 'NewFile.txt', // added 10.11.2015
			'untitled folder'   : 'NewFolder',   // added 10.11.2015
			'Archive'           : 'NewArchive',  // from v2.1 added 10.11.2015

			/********************************** messages **********************************/
			'confirmReq'      : 'Confirmation required',
			'confirmRm'       : 'Are you sure you want to permanently remove items?<br/>This cannot be undone!',
			'confirmRepl'     : 'Replace old file with new one?',
			'confirmRest'     : 'Replace existing item with the item in trash?', // fromv2.1.24 added 5.5.2017
			'confirmConvUTF8' : 'Not in UTF-8<br/>Convert to UTF-8?<br/>Contents become UTF-8 by saving after conversion.', // from v2.1 added 08.04.2014
			'confirmNonUTF8'  : 'Character encoding of this file couldn\'t be detected. It need to temporarily convert to UTF-8 for editting.<br/>Please select character encoding of this file.', // from v2.1.19 added 28.11.2016
			'confirmNotSave'  : 'It has been modified.<br/>Losing work if you do not save changes.', // from v2.1 added 15.7.2015
			'confirmTrash'    : 'Are you sure you want to move items to trash bin?', //from v2.1.24 added 29.4.2017
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
			'selectForUpload' : 'Select files',
			'moveFiles'       : 'Move items',
			'copyFiles'       : 'Copy items',
			'restoreFiles'    : 'Restore items', // from v2.1.24 added 5.5.2017
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
			'dropPasteFiles'  : 'Drop files, Paste URLs or images(clipboard) here', // from v2.1 added 07.04.2014
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
			'emptySearch'     : 'Search results is empty in search target.', // from v2.1.12 added 5.16.2016
			'editingFile'     : 'It is editing a file.', // from v2.1.13 added 6.3.2016
			'hasSelected'     : 'You have selected $1 items.', // from v2.1.13 added 6.3.2016
			'hasClipboard'    : 'You have $1 items in the clipboard.', // from v2.1.13 added 6.3.2016
			'incSearchOnly'   : 'Incremental search is only from the current view.', // from v2.1.13 added 6.30.2016
			'reinstate'       : 'Reinstate', // from v2.1.15 added 3.8.2016
			'complete'        : '$1 complete', // from v2.1.15 added 21.8.2016
			'contextmenu'     : 'Context menu', // from v2.1.15 added 9.9.2016
			'pageTurning'     : 'Page turning', // from v2.1.15 added 10.9.2016
			'volumeRoots'     : 'Volume roots', // from v2.1.16 added 16.9.2016
			'reset'           : 'Reset', // from v2.1.16 added 1.10.2016
			'bgcolor'         : 'Background color', // from v2.1.16 added 1.10.2016
			'colorPicker'     : 'Color picker', // from v2.1.16 added 1.10.2016
			'8pxgrid'         : '8px Grid', // from v2.1.16 added 4.10.2016
			'enabled'         : 'Enabled', // from v2.1.16 added 4.10.2016
			'disabled'        : 'Disabled', // from v2.1.16 added 4.10.2016
			'emptyIncSearch'  : 'Search results is empty in current view.\\APress [Enter] to expand search target.', // from v2.1.16 added 5.10.2016
			'emptyLetSearch'  : 'First letter search results is empty in current view.', // from v2.1.23 added 24.3.2017
			'textLabel'       : 'Text label', // from v2.1.17 added 13.10.2016
			'minsLeft'        : '$1 mins left', // from v2.1.17 added 13.11.2016
			'openAsEncoding'  : 'Reopen with selected encoding', // from v2.1.19 added 2.12.2016
			'saveAsEncoding'  : 'Save with the selected encoding', // from v2.1.19 added 2.12.2016
			'selectFolder'    : 'Select folder', // from v2.1.20 added 13.12.2016
			'firstLetterSearch': 'First letter search', // from v2.1.23 added 24.3.2017

			/********************************** mimetypes **********************************/
			'kindUnknown'     : 'Unknown',
			'kindRoot'        : 'Volume Root', // from v2.1.16 added 16.10.2016
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
			text     = $('<span class="elfinder-button-text">'+cmd.title+'</span>'),
			button   = $(this).addClass('ui-state-default elfinder-button')
				.attr('title', cmd.title)
				.append('<span class="elfinder-button-icon elfinder-button-icon-' + (cmd.className? cmd.className : cmd.name) + '"/>', text)
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
			
		text.hide();
		
		// set self button object to cmd object
		cmd.button = button;
		
		// if command has variants create menu
		if (Array.isArray(cmd.variants)) {
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
			if (cmd.syncTitleOnChange) {
				text.html(cmd.title);
				button.attr('title', cmd.title);
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
		var cmItem = 'elfinder-contextmenu-item',
			smItem = 'elfinder-contextsubmenu-item',
			exIcon = 'elfinder-contextmenu-extra-icon',
			dragOpt = {
				distance: 8,
				start: function() {
					menu.data('touching') && menu.find('.ui-state-hover').removeClass('ui-state-hover');
				},
				stop: function() {
					menu.data('draged', true);
				}
			},
			menu = $(this).addClass('touch-punch ui-helper-reset ui-front ui-widget ui-state-default ui-corner-all elfinder-contextmenu elfinder-contextmenu-'+fm.direction)
				.hide()
				.on('touchstart', function(e) {
					menu.data('touching', true);
				})
				.on('touchend', function(e) {
					menu.removeData('touching');
				})
				.on('mouseenter mouseleave', '.'+cmItem, function(e) {
					$(this).toggleClass('ui-state-hover', (e.type === 'mouseenter' || (! menu.data('draged') && menu.data('submenuKeep'))? true : false));
					if (menu.data('draged') && menu.data('submenuKeep')) {
						menu.find('.elfinder-contextmenu-sub:visible').parent().addClass('ui-state-hover');
					}
				})
				.on('mouseenter mouseleave', '.'+exIcon, function(e) {
					$(this).parent().toggleClass('ui-state-hover', e.type === 'mouseleave');
				})
				.on('mouseenter mouseleave', '.'+cmItem+',.'+smItem, function(e) {
					var setIndex = function(target, sub) {
						$.each(sub? subnodes : nodes, function(i, n) {
							if (target[0] === n) {
								(sub? subnodes : nodes)._cur = i;
								if (sub) {
									subselected = target;
								} else {
									selected = target;
								}
								return false;
							}
						});
					};
					if (e.originalEvent) {
						var target = $(this);
						if (e.type === 'mouseenter') {
							// mouseenter
							if (target.hasClass(smItem)) {
								// submenu
								if (subselected) {
									subselected.removeClass('ui-state-hover');
								}
								subnodes = selected.find('div.'+smItem);
								setIndex(target, true);
							} else {
								// menu
								if (selected) {
									selected.removeClass('ui-state-hover');
								}
								setIndex(target);
							}
						} else {
							// mouseleave
							if (target.hasClass(smItem)) {
								//submenu
								subselected = null;
								subnodes = null;
							} else {
								// menu
								if (selected) {
									selected.removeClass('ui-state-hover');
								}
								(function(sel) {
									setTimeout(function() {
										if (sel === selected) {
											selected = null;
										}
									}, 250);
								})(selected);
							}
						}
					}
				})
				.on('contextmenu', function(){return false;})
				.on('mouseup', function() {
					setTimeout(function() {
						menu.removeData('draged');
					}, 100);
				})
				.draggable(dragOpt),
			subpos  = fm.direction == 'ltr' ? 'left' : 'right',
			types = Object.assign({}, fm.options.contextmenu),
			tpl     = '<div class="'+cmItem+'{className}"><span class="elfinder-button-icon {icon} elfinder-contextmenu-icon"{style}/><span>{label}</span></div>',
			item = function(label, icon, callback, opts) {
				var className = '',
					style = '',
					iconClass = '';
				if (opts) {
					if (opts.className) {
						className = ' ' + opts.className;
					}
					if (opts.iconClass) {
						iconClass = opts.iconClass;
						icon = '';
					}
					if (opts.iconImg) {
						style = ' style="background:url(\''+fm.escape(opts.iconImg)+'\') 0 0 no-repeat;background-size:contain;"';
					}
				}
				return $(tpl.replace('{icon}', icon ? 'elfinder-button-icon-'+icon : (iconClass? iconClass : ''))
						.replace('{label}', label)
						.replace('{style}', style)
						.replace('{className}', className))
					.click(function(e) {
						e.stopPropagation();
						e.preventDefault();
						callback();
					});
			},
			base, cwd,
			nodes, selected, subnodes, subselected, autoSyncStop,

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
			
			keyEvts = function(e) {
				var code = e.keyCode,
					ESC = $.ui.keyCode.ESCAPE,
					ENT = $.ui.keyCode.ENTER,
					LEFT = $.ui.keyCode.LEFT,
					RIGHT = $.ui.keyCode.RIGHT,
					UP = $.ui.keyCode.UP,
					DOWN = $.ui.keyCode.DOWN,
					subent = fm.direction === 'ltr'? RIGHT : LEFT,
					sublev = subent === RIGHT? LEFT : RIGHT;
				
				if ($.inArray(code, [ESC, ENT, LEFT, RIGHT, UP, DOWN]) !== -1) {
					e.preventDefault();
					e.stopPropagation();
					e.stopImmediatePropagation();
					if (code == ESC || code === sublev) {
						if (selected && subnodes && subselected) {
							subselected.trigger('mouseleave');
							selected.addClass('ui-state-hover');
							subnodes = null;
							subselected = null;
						} else {
							code == ESC && close();
						}
					} else if (code == UP || code == DOWN) {
						if (subnodes) {
							if (subselected) {
								subselected.trigger('mouseleave');
							}
							if (code == DOWN && (! subselected || subnodes.length <= ++subnodes._cur)) {
								subnodes._cur = 0;
							} else if (code == UP && (! subselected || --subnodes._cur < 0)) {
								subnodes._cur = subnodes.length - 1;
							}
							subselected = subnodes.eq(subnodes._cur).trigger('mouseenter');
						} else {
							subnodes = null;
							if (selected) {
								selected.trigger('mouseleave');
							}
							if (code == DOWN && (! selected || nodes.length <= ++nodes._cur)) {
								nodes._cur = 0;
							} else if (code == UP && (! selected || --nodes._cur < 0)) {
								nodes._cur = nodes.length - 1;
							}
							selected = nodes.eq(nodes._cur).addClass('ui-state-hover');
						}
					} else if (selected && (code == ENT || code === subent)) {
						if (selected.hasClass('elfinder-contextmenu-group')) {
							if (subselected) {
								code == ENT && subselected.click();
							} else {
								selected.trigger('mouseenter');
								subnodes = selected.find('div.'+smItem);
								subnodes._cur = 0;
								subselected = subnodes.first().addClass('ui-state-hover');
							}
						} else {
							code == ENT && selected.click();
						}
					}
				}
			},
			
			open = function(x, y, css) {
				var width      = menu.outerWidth(),
					height     = menu.outerHeight(),
					bstyle     = base.attr('style'),
					bpos       = base.offset(),
					bwidth     = base.width(),
					bheight    = base.height(),
					mw         = fm.UA.Mobile? 40 : 2,
					mh         = fm.UA.Mobile? 20 : 2,
					x          = x - (bpos? bpos.left : 0),
					y          = y - (bpos? bpos.top : 0),
					css        = Object.assign(css || {}, {
						top  : Math.max(0, y + mh + height < bheight ? y + mh : y - (y + height - bheight)),
						left : Math.max(0, (x < width + mw || x + mw + width < bwidth)? x + mw : x - mw - width),
						opacity : '1'
					}),
					evts;

				autoSyncStop = true;
				fm.autoSync('stop');
				fm.toFront(menu);
				base.width(bwidth);
				menu.stop().removeAttr('style').css(css).show();
				base.attr('style', bstyle);
				
				css[subpos] = parseInt(menu.width());
				menu.find('.elfinder-contextmenu-sub').css(css);
				if (fm.UA.iOS) {
					$('div.elfinder div.overflow-scrolling-touch').css('-webkit-overflow-scrolling', 'auto');
				}
				
				selected = null;
				subnodes = null;
				subselected = null;
				$(document).on('keydown.' + fm.namespace, keyEvts);
				evts = $._data(document).events;
				if (evts && evts.keydown) {
					evts.keydown.unshift(evts.keydown.pop());
				}
				
				fm.UA.Mobile && autoToggle();
			},
			
			close = function() {
				$(document).off('keydown.' + fm.namespace, keyEvts);
				currentType = null;
				
				if (menu.is(':visible') || menu.children().length) {
					menu.removeAttr('style').hide().empty().removeData('submenuKeep');
					try {
						if (! menu.draggable('instance')) {
							menu.draggable(dragOpt);
						}
					} catch(e) {
						if (! menu.hasClass('ui-draggable')) {
							menu.draggable(dragOpt);
						}
					}
					if (menu.data('prevNode')) {
						menu.data('prevNode').after(menu);
						menu.removeData('prevNode');
					}
					fm.trigger('closecontextmenu');
					if (fm.UA.iOS) {
						$('div.elfinder div.overflow-scrolling-touch').css('-webkit-overflow-scrolling', 'touch');
					}
				}
				
				autoSyncStop && fm.searchStatus.state < 1 && ! fm.searchStatus.ininc && fm.autoSync();
				autoSyncStop = false;
			},
			
			create = function(type, targets) {
				var sep    = false,
					insSep = false,
					disabled = [],
					isCwd = type === 'cwd',
					selcnt = 0,
					cmdMap;

				currentType = type;
				
				// get current uiCmdMap option
				if (!(cmdMap = fm.option('uiCmdMap', isCwd? void(0) : targets[0]))) {
					cmdMap = {};
				}
				
				if (!isCwd) {
					disabled = fm.getDisabledCmds(targets);
				}
				
				if (type === 'navbar') {
					fm.select({selected: targets, origin: 'navbar'});
				}

				selcnt = fm.selected().length;
				if (selcnt > 1) {
					menu.append('<div class="ui-corner-top ui-widget-header elfinder-contextmenu-header"><span>'
					 + fm.i18n('selectedItems', ''+selcnt)
					 + '</span></div>');
				}
				
				nodes = $();
				$.each(types[type]||[], function(i, name) {
					var cmd, cmdName, useMap, node, submenu, hover;
					
					if (name === '|') {
						if (sep) {
							insSep = true;
						}
						return;
					}
					
					if (cmdMap[name]) {
						cmdName = cmdMap[name];
						useMap = true;
					} else {
						cmdName = name;
					}
					cmd = fm.getCommand(cmdName);

					if (cmd && !isCwd && (!fm.searchStatus.state || !cmd.disableOnSearch)) {
						cmd.__disabled = cmd._disabled;
						cmd._disabled = !(cmd.alwaysEnabled || (fm._commands[cmdName] ? $.inArray(name, disabled) === -1 && (!useMap || $.inArray(cmdName, disabled) === -1) : false));
						$.each(cmd.linkedCmds, function(i, n) {
							var c;
							if (c = fm.getCommand(n)) {
								c.__disabled = c._disabled;
								c._disabled = !(c.alwaysEnabled || (fm._commands[n] ? $.inArray(n, disabled) === -1 : false));
							}
						});
					}

					if (cmd && !cmd._disabled && cmd.getstate(targets) != -1) {
						if (cmd.variants) {
							if (!cmd.variants.length) {
								return;
							}
							node = item(cmd.title, cmd.className? cmd.className : cmd.name, function(){});
							
							submenu = $('<div class="ui-front ui-corner-all elfinder-contextmenu-sub"/>')
								.hide()
								.appendTo(node.append('<span class="elfinder-contextmenu-arrow"/>'));
							
							hover = function(show){
								if (! show) {
									submenu.hide();
								} else {
									var bstyle = base.attr('style');
									base.width(base.width());
									submenu.css({ left: 'auto', right: 'auto' });
									var nodeOffset = node.offset(),
										nodeleft   = nodeOffset.left,
										nodetop    = nodeOffset.top,
										nodewidth  = node.outerWidth(),
										width      = submenu.outerWidth(true),
										height     = submenu.outerHeight(true),
										baseOffset = base.offset(),
										wwidth     = baseOffset.left + base.width(),
										wheight    = baseOffset.top + base.height(),
										x, y, over;
	
									over = (nodeleft + nodewidth + width) - wwidth;
									x = (nodeleft > width && over > 0)? (fm.UA.Mobile? 10 - width : nodewidth - over) : nodewidth;
									if (subpos === 'right' && nodeleft < width) {
										x = fm.UA.Mobile? 30 - nodewidth : nodewidth - (width - nodeleft);
									}
									over = (nodetop + 5 + height) - wheight;
									y = (over > 0 && nodetop < wheight)? 5 - over : (over > 0? 30 - height : 5);
	
									menu.find('.elfinder-contextmenu-sub:visible').hide().parent().removeClass('ui-state-hover');
									submenu.css({ top : y }).css(subpos, x).show();
									base.attr('style', bstyle);
								}
							};
							
							node.addClass('elfinder-contextmenu-group')
								.on('touchstart', '.elfinder-contextmenu-sub', function(e) {
									node.data('touching', true);
								})
								.on('mouseleave', '.elfinder-contextmenu-sub', function(e) {
									if (! menu.data('draged')) {
										menu.removeData('submenuKeep');
									}
								})
								.on('click', '.'+smItem, function(e){
									var opts;
									e.stopPropagation();
									if (! menu.data('draged')) {
										menu.hide();
										opts = $(this).data('exec');
										if ($.isPlainObject(opts)) {
											opts._currentType = type;
										}
										close();
										cmd.exec(targets, opts);
									}
								})
								.on('touchend', function(e) {
									menu.data('submenuKeep', true);
								})
								.on('mouseenter mouseleave', function(e){
									if (e.type === 'mouseleave') {
										if (! menu.data('submenuKeep')) {
											node.data('timer', setTimeout(function() {
												node.removeData('timer');
												hover(false);
											}, 250));
										}
									} else {
										if (node.data('timer')) {
											clearTimeout(node.data('timer'));
											node.removeData('timer');
										}
										if (! node.data('touching')) {
											hover(true);
										}
									}
									node.removeData('touching');
								});
							
							$.each(cmd.variants, function(i, variant) {
								submenu.append(
									variant === '|' ? '<div class="elfinder-contextmenu-separator"/>' :
									$('<div class="'+cmItem+' '+smItem+'"><span>'+variant[1]+'</span></div>').data('exec', variant[0])
								);
							});
								
						} else {
							node = item(cmd.title, cmd.className? cmd.className : cmd.name, function() {
								if (! menu.data('draged')) {
									close();
									cmd.exec(targets, {_currentType: type});
								}
							});
							if (cmd.extra && cmd.extra.node) {
								$('<span class="elfinder-button-icon elfinder-button-icon-'+(cmd.extra.icon || '')+' elfinder-contextmenu-extra-icon"/>')
									.append(cmd.extra.node).appendTo(node);
								$(cmd.extra.node).trigger('ready');
							} else {
								node.remove('.elfinder-contextmenu-extra-icon');
							}
						}
						
						if (cmd.extendsCmd) {
							node.children('span.elfinder-button-icon').addClass('elfinder-button-icon-' + cmd.extendsCmd);
						}
						
						if (insSep) {
							menu.append('<div class="elfinder-contextmenu-separator"/>');
						}
						menu.append(node);
						sep = true;
						insSep = false;
					}
					
					if (cmd && typeof cmd.__disabled !== 'undefined') {
						cmd._disabled = cmd.__disabled;
						delete cmd.__disabled;
						$.each(cmd.linkedCmds, function(i, n) {
							var c;
							if (c = fm.getCommand(n)) {
								c._disabled = c.__disabled;
								delete c.__disabled;
							}
						});
					}
				});
				nodes = menu.children('div.'+cmItem);
			},
			
			createFromRaw = function(raw) {
				currentType = 'raw';
				$.each(raw, function(i, data) {
					var node;
					
					if (data === '|') {
						menu.append('<div class="elfinder-contextmenu-separator"/>');
					} else if (data.label && typeof data.callback == 'function') {
						node = item(data.label, data.icon, function() {
							if (! menu.data('draged')) {
								!data.remain && close();
								data.callback();
							}
						}, data.options || null);
						menu.append(node);
					}
				});
				nodes = menu.children('div.'+cmItem);
			},
			
			currentType = null;
		
		fm.one('load', function() {
			base = fm.getUI();
			cwd = fm.getUI('cwd');
			fm.bind('contextmenu', function(e) {
				var data = e.data,
					css = {},
					prevNode;

				if (!data.type || data.type !== 'files') {
					cwd.trigger('unselectall');
				}
				close();

				if (data.type && data.targets) {
					create(data.type, data.targets);
				} else if (data.raw) {
					createFromRaw(data.raw);
				}

				if (menu.children().length) {
					prevNode = data.prevNode || null;
					if (prevNode) {
						menu.data('prevNode', menu.prev());
						prevNode.after(menu);
					}
					if (data.fitHeight) {
						css = {maxHeight: Math.min(fm.getUI().height(), $(window).height()), overflowY: 'auto'};
						menu.draggable('destroy').removeClass('ui-draggable');
					}
					open(data.x, data.y, css);
				}
			})
			.one('destroy', function() { menu.remove(); })
			.bind('disable', close)
			.bind('select', function(){
				(currentType === 'files') && close();
			})
			.getUI().click(close);
		})
		.shortcut({
			pattern     : fm.OS === 'mac' ? 'ctrl+m' : 'contextmenu shift+f10',
			description : 'contextmenu',
			callback    : function(e) {
				e.stopPropagation();
				e.preventDefault();
				$(document).one('contextmenu.' + fm.namespace, function(e) {
					e.preventDefault();
					e.stopPropagation();
				});
				var sel = fm.selected(),
					type, targets, pos, elm;
				
				if (sel.length) {
					type = 'files';
					targets = sel;
					elm = $('#'+fm.cwdHash2Id(sel[0]));
				} else {
					type = 'cwd';
					targets = [ fm.cwd().hash ];
					pos = fm.getUI('workzone').offset();
				}
				if (! elm || ! elm.length) {
					elm = fm.getUI('workzone');
				}
				pos = elm.offset();
				pos.top += (elm.height() / 2);
				pos.left += (elm.width() / 2);
				fm.trigger('contextmenu', {
					'type'    : type,
					'targets' : targets,
					'x'       : pos.left,
					'y'       : pos.top
				});
			}
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
			
			/**
			 * cwd current hashes
			 * 
			 * @type Array
			 */
			cwdHashes = [],

			/**
			 * incsearch current hashes
			 * 
			 * @type Array
			 */
			incHashes = void 0,

			/**
			 * Custom columns name and order
			 *
			 * @type Array
			 */
			customCols = [],

			/**
			 * Custom columns builder
			 *
			 * @type Function
			 */
			customColsBuild = function() {
				var cols = '';
				for (var i = 0; i < customCols.length; i++) {
					cols += '<td class="elfinder-col-'+customCols[i]+'">{' + customCols[i] + '}</td>';
				}
				return cols;
			},

			/**
			 * Make template.row from customCols
			 *
			 * @type Function
			 */
			makeTemplateRow = function() {
				return '<tr id="{id}" class="'+clFile+' {permsclass} {dirclass}" title="{tooltip}"{css}><td class="elfinder-col-name"><div class="elfinder-cwd-file-wrapper"><span class="elfinder-cwd-icon {mime}"{style}/>{marker}<span class="elfinder-cwd-filename">{name}</span></div>'+selectCheckbox+'</td>'+customColsBuild()+'</tr>';
			},
			
			selectCheckbox = ($.map(options.showSelectCheckboxUA, function(t) {return (fm.UA[t] || t.match(/^all$/i))? true : null;}).length)? '<div class="elfinder-cwd-select"><input type="checkbox"></div>' : '',

			colResizing = false,
			
			colWidth = null,

			/**
			 * File templates
			 *
			 * @type Object
			 **/
			templates = {
				icon : '<div id="{id}" class="'+clFile+' {permsclass} {dirclass} ui-corner-all" title="{tooltip}"><div class="elfinder-cwd-file-wrapper ui-corner-all"><div class="elfinder-cwd-icon {mime} ui-corner-all" unselectable="on"{style}/>{marker}</div><div class="elfinder-cwd-filename" title="{nametitle}">{name}</div>'+selectCheckbox+'</div>',
				row  : ''
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
					var name = fm.escape(f.i18 || f.name);
					!list && (name = name.replace(/([_.])/g, '&#8203;$1'));
					return name;
				},
				nametitle : function(f) {
					return fm.escape(f.i18 || f.name);
				},
				permsclass : function(f) {
					return fm.perms2class(f);
				},
				perm : function(f) {
					return fm.formatPermissions(f);
				},
				dirclass : function(f) {
					var cName = f.mime == 'directory' ? 'directory' : '';
					f.isroot && (cName += ' isroot');
					f.csscls && (cName += ' ' + fm.escape(f.csscls));
					options.getClass && (cName += ' ' + options.getClass(f));
					return cName;
				},
				style : function(f) {
					return f.icon? fm.getIconStyle(f) : '';
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
					if (list) {
						info += (info? '&#13;' : '') + fm.escape(f.i18 || f.name);
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
						.replace(/\{([a-z0-9_]+)\}/g, function(s, e) { 
							return replacement[e] ? replacement[e](f, fm) : (f[e] ? f[e] : ''); 
						});
			},
			
			/**
			 * jQueery node that will be selected next
			 * 
			 * @type Object jQuery node
			 */
			selectedNext = $(),
			
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
					if (selectedNext.length) {
						n = prev? selectedNext.prev() : selectedNext;
					} else {
						// there are no selected file - select first/last one
						n = cwd.find('[id]:not(.'+clDisabled+'):not(.elfinder-cwd-parent):'+(prev ? 'last' : 'first'));
					}
				}
				
				if (n && n.length && !n.hasClass('elfinder-cwd-parent')) {
					if (s && append) {
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
				fm.lazy(function() {
					var files;
					cwd.find('[id]:not(.'+clSelected+'):not(.elfinder-cwd-parent)').trigger(evtSelect);
					if (fm.maxTargets && (incHashes || cwdHashes).length > fm.maxTargets) {
						files = $.map(incHashes || cwdHashes, function(hash) { return fm.file(hash) || null });
						files = fm.sortFiles(files);
						selectedFiles = $.map(files, function(f) { return f.hash; });
					} else {
						selectedFiles = (incHashes || cwdHashes).concat();
					}
					trigger();
					selectCheckbox && selectAllCheckbox.data('pending', false);
				}, 0, {repaint: true});
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
			 * Last selected node id
			 * 
			 * @type String|Void
			 */
			lastSelect = void 0,
			
			/**
			 * Fire elfinder "select" event and pass selected files to it
			 *
			 * @return void
			 */
			trigger = function() {
				if (selectCheckbox) {
					var all = (selectedFiles.length === cwdHashes.length);
					selectAllCheckbox.find('input').prop('checked', all);
					cwd[all? 'addClass' : 'removeClass']('elfinder-cwd-allselected');
				}
				fm.trigger('select', {selected : selectedFiles});
			},
			
			/**
			 * Scroll file to set it visible
			 *
			 * @param DOMElement  file/dir node
			 * @return void
			 */
			scrollToView = function(o, blink) {
				if (! o.length) {
					return;
				}
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
				!!blink && fm.resources.blink(o, 'lookme');
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
			 * Scroll start event name
			 *
			 * @type String
			 **/
			scrollStartEvent = 'elfscrstart',
			
			/**
			 * Scroll stop event name
			 *
			 * @type String
			 **/
			scrollEvent = 'elfscrstop',
			
			scrolling = false,
			
			/**
			 * jQuery UI selectable option
			 * 
			 * @type Object
			 */
			selectableOption = {
				disabled   : true,
				filter     : '[id]:first',
				stop       : trigger,
				delay      : 250,
				appendTo   : 'body',
				autoRefresh: false,
				selected   : function(e, ui) { $(ui.selected).trigger(evtSelect); },
				unselected : function(e, ui) { $(ui.unselected).trigger(evtUnselect); }
			},
			
			/**
			 * hashes of items displayed in current view
			 * 
			 * @type Object  ItemHash => DomId
			 */
			inViewHashes = {},
			
			/**
			 * Processing when the current view is changed (On open, search, scroll, resize etc.)
			 * 
			 * @return void
			 */
			wrapperRepaint = function(init) {
				var selectable = cwd.data('selectable'),
					rec = (function() {
						var wos = wrapper.offset(),
							w = $(window),
							l = wos.left - w.scrollLeft() + (fm.direction === 'ltr'? 30 : wrapper.width() - 30),
							t = wos.top - w.scrollTop() + 10 + (list? bufferExt.itemH || 24 : 0);
						return {left: Math.max(0, Math.round(l)), top: Math.max(0, Math.round(t))};
					})(),
					tgt = $(document.elementFromPoint(rec.left , rec.top)),
					ids = [],
					tmbs = {},
					cnt = bufferExt.hpi? Math.ceil((wz.data('rectangle').height / bufferExt.hpi) * 1.5) : showFiles,
					chk = function() {
						var id = tgt.attr('id'),
							hash, file;
						if (id) {
							bufferExt.getTmbs = [];
							hash = fm.cwdId2Hash(id);
							inViewHashes[hash] = id;
							// for tmbs
							if (bufferExt.attachTmbs[hash]) {
								tmbs[hash] = bufferExt.attachTmbs[hash];
							}
							// for selectable
							selectable && ids.push(id);
						}
						// next node
						tgt = tgt.next();
					},
					done = function() {
						var id;
						if (cwd.data('selectable')) {
							if (selectedFiles.length) {
								ids = ids.concat($.map(selectedFiles, function(h) {
									id = fm.cwdHash2Id(h);
									return ($.inArray(id, ids) === -1)? id : null;
								}));
							}
							if (ids.length) {
								selectableOption.filter = '#'+ids.join(', #');
								cwd.selectable('enable').selectable('option', {filter : selectableOption.filter}).selectable('refresh');
							}
						}
						if (Object.keys(tmbs).length) {
							bufferExt.getTmbs = [];
							attachThumbnails(tmbs);
						}
					},
					arr;
				
				inViewHashes = {};
				selectable && cwd.selectable('option', 'disabled');
				
				if (tgt.length) {
					if (! tgt.hasClass(clFile)) {
						tgt = tgt.closest(fileSelector);
					}
					if (tgt.attr('id')) {
						if (init) {
							for (var i = 0; i < cnt; i++) {
								chk();
								if (! tgt.length) {
									break;
								}
							}
							done();
						} else {
							bufferExt.repaintJob && bufferExt.repaintJob._abort();
							arr = new Array(cnt);
							bufferExt.repaintJob = fm.asyncJob(function() {
								chk();
								if (! tgt.length) {
									bufferExt.repaintJob && bufferExt.repaintJob._abort(true);
								}
							}, arr).done(done);
						}
					}
				}
			},
			
			/**
			 * display parent folder with ".." name
			 * 
			 * @param  String  phash
			 * @return void
			 */
			oldSchool = function(phash) {
				var phash = fm.cwd().phash,
					pdir  = fm.file(phash) || null,
					set   = function(pdir) {
						if (pdir) {
							parent = $(itemhtml($.extend(true, {}, pdir, {name : '..', mime : 'directory'})))
								.addClass('elfinder-cwd-parent')
								.on('mousedown click mouseup touchstart touchmove touchend dblclick mouseenter', function(e) {
									e.preventDefault();
									e.stopPropagation();
								})
								.dblclick(function() {
									fm.exec('open', fm.cwdId2Hash(this.id));
								}
							);
							(list ? cwd.find('tbody') : cwd).prepend(parent);
						}
					};
				if (pdir) {
					set(pdir);
				} else {
					if (fm.getUI('tree').hasClass('elfinder-tree')) {
						fm.one('parents', function() {
							set(fm.file(phash) || null);
						});
					} else {
						fm.request({
							data : {cmd : 'parents', target : fm.cwd().hash},
							preventFail : true
						})
						.done(function(data) {
							set(fm.file(phash) || null);
						});
					}
				}
			},
			
			showFiles = fm.options.showFiles,
			
			/**
			 * Cwd scroll event handler.
			 * Lazy load - append to cwd not shown files
			 *
			 * @return void
			 */
			render = function() {
				if (bufferExt.rendering) {
					return;
				}
				var place = (list ? cwd.children('table').children('tbody') : cwd),
					chk,
					phash,
					// created document fragment for jQuery >= 1.12, 2.2, 3.0
					// see Studio-42/elFinder#1544 @ github
					docFlag = $.htmlPrefilter? true : false,
					tempDom = docFlag? $(document.createDocumentFragment()) : $('<div/>'),
					go      = function(over){
						var over  = over || null,
							html  = [],
							dirs  = false,
							atmb  = {},
							stmb  = (fm.option('tmbUrl') === 'self'),
							init  = bufferExt.renderd? false : true,
							files, locks, selected, init;
						
						files = buffer.splice(0, showFiles + (over || 0) / (bufferExt.hpi || 1));
						bufferExt.renderd += files.length;
						if (! buffer.length) {
							bottomMarker.hide();
							wrapper.off(scrollEvent, render);
						}
						
						locks = [];
						html = $.map(files, function(f) {
							if (f.hash && f.name) {
								if (f.mime == 'directory') {
									dirs = true;
								}
								if (f.tmb || (stmb && f.mime.indexOf('image/') === 0)) {
									atmb[f.hash] = f.tmb;
								}
								clipCuts[f.hash] && locks.push(f.hash);
								return itemhtml(f);
							}
							return null;
						});

						// html into temp node
						tempDom.empty().append(html.join(''));
						
						// make directory droppable
						dirs && !mobile && makeDroppable(tempDom);
						
						// check selected items
						selected = [];
						if (selectedFiles.length) {
							tempDom.find('[id]:not(.'+clSelected+'):not(.elfinder-cwd-parent)').each(function() {
								$.inArray(fm.cwdId2Hash(this.id), selectedFiles) !== -1 && selected.push($(this));
							});
						}
						
						// append to cwd
						place.append(docFlag? tempDom : tempDom.children());
						
						// trigger select
						if (selected.length) {
							$.each(selected, function(i, n) { n.trigger(evtSelect); });
							trigger();
						}
						
						locks.length && fm.trigger('lockfiles', {files: locks});
						!bufferExt.hpi && bottomMarkerShow(place, files.length);
						
						if (list) {
							// show thead
							cwd.find('thead').show();
							// fixed table header
							fixTableHeader({fitWidth: ! colWidth});
						}
						
						if (Object.keys(atmb).length) {
							Object.assign(bufferExt.attachTmbs, atmb);
						}
						
						if (init) {
							if (! mobile && ! cwd.data('selectable')) {
								// make files selectable
								cwd.selectable(selectableOption).data('selectable', true);
							}
							wrapperRepaint(true);
						}
						
						! scrolling && wrapper.trigger(scrollEvent);
					};
				
				if (! bufferExt.renderd) {
					// first time to go()
					bufferExt.rendering = true;
					// scroll top on dir load to avoid scroll after page reload
					wrapper.scrollTop(0);
					phash = fm.cwd().phash;
					go();
					if (options.oldSchool && phash && !query) {
						oldSchool(phash);
					}
					if (list) {
						colWidth && setColwidth();
						fixTableHeader({fitWidth: true});
					}
					bufferExt.itemH = (list? place.find('tr:first') : place.find('[id]:first')).outerHeight(true);
					fm.trigger('cwdrender');
					bufferExt.rendering = false;
				} else if (! bufferExt.rendering) {
					// next go()
					if ((chk = (wrapper.height() + wrapper.scrollTop() + fm.options.showThreshold + bufferExt.row) - (bufferExt.renderd * bufferExt.hpi)) > 0) {
						bufferExt.rendering = true;
						fm.lazy(function() {
							go(chk);
							bufferExt.rendering = false;
						});
					}
				}
			},
			
			// fixed table header jQuery object
			tableHeader = null,
			
			// To fixed table header colmun
			fixTableHeader = function(opts) {
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
				opts = opts || {},
				cnt, base, table, thead, tbody, hheight, htr, btr, htd, btd, htw, btw, init;
				
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
					
					if (init || opts.fitWidth || Math.abs(btr.outerWidth() - htr.outerWidth()) > 2) {
						cnt = customCols.length + 1;
						for (var i = 0; i < cnt; i++) {
							htd = htr.children('td:eq('+i+')');
							btd = btr.children('td:eq('+i+')');
							htw = htd.width();
							btw = btd.width();
							if (typeof htd.data('delta') === 'undefined') {
								htd.data('delta', (htd.outerWidth() - htw) - (btd.outerWidth() - btw));
							}
							btw -= htd.data('delta');
							if (! init && ! opts.fitWidth && htw === btw) {
								break;
							}
							htd.css('width', btw + 'px');
						}
					}
					
					tableHeader.data('widthTimer') && clearTimeout(tableHeader.data('widthTimer'));
					tableHeader.data('widthTimer', setTimeout(function() {
						if (tableHeader) {
							if (fm.direction === 'rtl') {
								tableHeader.css('right', (fm.getUI().width() - wrapper.width()) + 'px');
							}
							tableHeader.css(wrapper.position()).css('width', cwd.outerWidth() + 'px');
						}
					}, 10));
				}
			},
			
			// Set colmun width
			setColwidth = function() {
				if (list && colWidth) {
					var cl = 'elfinder-cwd-colwidth',
					first = cwd.find('tr[id]:first'),
					former;
					if (! first.hasClass(cl)) {
						former = cwd.find('tr.'+cl);
						former.removeClass(cl).find('td').css('width', '');
						first.addClass(cl);
						cwd.find('table:first').css('table-layout', 'fixed');
						$.each($.merge(['name'], customCols), function(i, k) {
							var w = colWidth[k] || first.find('td.elfinder-col-'+k).width();
							first.find('td.elfinder-col-'+k).width(w);
						});
					}
				}
			},
			
			/**
			 * Droppable options for cwd.
			 * Drop target is `wrapper`
			 * Do not add class on childs file over
			 *
			 * @type Object
			 */
			droppable = Object.assign({}, fm.droppable, {
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
			makeDroppable = function(place) {
				place = place? place : (list ? cwd.find('tbody') : cwd);
				var targets = place.children('.directory:not(.'+clDroppable+',.elfinder-na,.elfinder-ro)');

				if (fm.isCommandEnabled('paste')) {
					targets.droppable(droppable);
				}
				if (fm.isCommandEnabled('upload')) {
					targets.addClass('native-droppable');
				}
				
				place.children('.isroot').each(function(i, n) {
					var $n   = $(n),
						hash = fm.cwdId2Hash(n.id);
					
					if (fm.isCommandEnabled('paste', hash)) {
						if (! $n.hasClass(clDroppable+',elfinder-na,elfinder-ro')) {
							$n.droppable(droppable);
						}
					} else {
						if ($n.hasClass(clDroppable)) {
							$n.droppable('destroy');
						}
					}
					if (fm.isCommandEnabled('upload', hash)) {
						if (! $n.hasClass('native-droppable,elfinder-na,elfinder-ro')) {
							$n.addClass('native-droppable');
						}
					} else {
						if ($n.hasClass('native-droppable')) {
							$n.removeClass('native-droppable');
						}
					}
				});
			},
			
			/**
			 * Preload required thumbnails and on load add css to files.
			 * Return false if required file is not visible yet (in buffer) -
			 * required for old api to stop loading thumbnails.
			 *
			 * @param  Object  file hash -> thumbnail map
			 * @param  Bool    reload
			 * @return void
			 */
			attachThumbnails = function(tmbs, reload) {
				var attach = function(node, tmb) {
						$('<img/>')
							.on('load', function() {
								node.find('.elfinder-cwd-icon').addClass(tmb.className).css('background-image', "url('"+tmb.url+"')");
							})
							.attr('src', tmb.url);
					},
					chk  = function(hash, tmb) {
						var node = $('#'+fm.cwdHash2Id(hash)),
							file, tmbObj, reloads = [];
	
						if (node.length) {
							if (tmb != '1') {
								file = fm.file(hash);
								if (file.tmb !== tmb) {
									file.tmb = tmb;
								}
								tmbObj = fm.tmb(file);
								if (reload) {
									fm.reloadContents(tmbObj.url).done(function() {
										node.find('.elfinder-cwd-icon').addClass(tmbObj.className).css('background-image', "url('"+tmbObj.url+"')");
									});
								} else {
									attach(node, tmbObj);
								}
								delete bufferExt.attachTmbs[hash];
							} else {
								if (reload) {
									loadThumbnails([hash]);
								} else {
									bufferExt.getTmbs.push(hash);
								}
							}
						}
					};

				if ($.isPlainObject(tmbs) && Object.keys(tmbs).length) {
					Object.assign(bufferExt.attachTmbs, tmbs);
					$.each(tmbs, chk);
					if (! reload && bufferExt.getTmbs.length) {
						loadThumbnails();
					}
				}
			},
			
			/**
			 * Load thumbnails from backend.
			 *
			 * @param  Array|void reloads  hashes list for reload thumbnail items
			 * @return void
			 */
			loadThumbnails = function(reloads) {
				var tmbs = [],
					reload = false;
				
				if (fm.oldAPI) {
					fm.request({
						data : {cmd : 'tmb', current : fm.cwd().hash},
						preventFail : true
					})
					.done(function(data) {
						if (data.images && Object.keys(data.images).length) {
							attachThumbnails(data.images);
						}
						if (data.tmb) {
							loadThumbnails();
						}
					});
					return;
				} 

				if (reloads) {
					reload = true;
					tmbs = reloads.splice(0, tmbNum);
				} else {
					tmbs = bufferExt.getTmbs.splice(0, tmbNum);
				}
				if (tmbs.length) {
					if (reload || inViewHashes[tmbs[0]] || inViewHashes[tmbs[tmbs.length-1]]) {
						fm.request({
							data : {cmd : 'tmb', targets : tmbs},
							preventFail : true
						})
						.done(function(data) {
							if (data.images && Object.keys(data.images).length) {
								attachThumbnails(data.images, reload);
							}
							if (reload) {
								if (reloads.length) {
									loadThumbnails(reloads);
								}
							}
						})
						.always(function() {
							if (! reload && bufferExt.getTmbs.length) {
								loadThumbnails();
							}
						});
					}
				}
			},
			
			/**
			 * Add new files to cwd/buffer
			 *
			 * @param  Array  new files
			 * @return void
			 */
			add = function(files, mode) {
				var place    = list ? cwd.find('tbody') : cwd,
					l        = files.length, 
					atmb     = {},
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
					// created document fragment for jQuery >= 1.12, 2.2, 3.0
					// see Studio-42/elFinder#1544 @ github
					docFlag = $.htmlPrefilter? true : false,
					tempDom = docFlag? $(document.createDocumentFragment()) : $('<div/>'),
					file, hash, node, nodes, ndx;

				if (l > showFiles) {
					// re-render for performance tune
					content();
					selectedFiles = files.concat();
					trigger();
				} else {
					// add the item immediately
					l && wz.removeClass('elfinder-cwd-wrapper-empty');
					
					while (l--) {
						file = files[l];
						hash = file.hash;
						
						if ($('#'+fm.cwdHash2Id(hash)).length) {
							continue;
						}
						
						if ((node = findNode(file)) && ! node.length) {
							node = null;
						}
						if (! node && (ndx = findIndex(file)) >= 0) {
							buffer.splice(ndx, 0, file);
						} else {
							tempDom.empty().append(itemhtml(file));
							(file.mime === 'directory') && !mobile && makeDroppable(tempDom);
							nodes = docFlag? tempDom : tempDom.children();
							if (node) {
								node.before(nodes);
							} else {
								place.append(nodes);
							}
						}
						
						if ($('#'+fm.cwdHash2Id(hash)).length) {
							if (file.tmb) {
								atmb[hash] = file.tmb;
							}
						}
					}
	
					setColwidth();
					bottomMarkerShow(place);
					if (Object.keys(atmb).length) {
						Object.assign(bufferExt.attachTmbs, atmb);
					}
				}
			},
			
			/**
			 * Remove files from cwd/buffer
			 *
			 * @param  Array  files hashes
			 * @return void
			 */
			remove = function(files) {
				var l = files.length,
					inSearch = fm.searchStatus.state === 2,
					hash, n, ndx, allItems;

				// removed cwd
				if (!fm.cwd().hash && fm.currentReqCmd !== 'open') {
					allItems = fm.files();
					$.each(cwdParents.reverse(), function(i, h) {
						if (allItems[h]) {
							fm.one(fm.currentReqCmd + 'done', function() {
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
							--bufferExt.renderd;
						} catch(e) {
							fm.debug('error', e);
						}
					} else if ((ndx = index(hash)) !== -1) {
						buffer.splice(ndx, 1);
					}
					if (inSearch) {
						if ((ndx = $.inArray(hash, cwdHashes)) !== -1) {
							cwdHashes.splice(ndx, 1);
						}
					}
				}
				
				inSearch && fm.trigger('cwdhasheschange', cwdHashes);
				
				setColwidth();
			},
			
			msg = {
				name : fm.i18n('name'),
				perm : fm.i18n('perms'),
				date : fm.i18n('modify'),
				size : fm.i18n('size'),
				kind : fm.i18n('kind'),
				modestr : fm.i18n('mode'),
				modeoct : fm.i18n('mode'),
				modeboth : fm.i18n('mode')
			},
			
			customColsNameBuild = function() {
				var name = '',
				customColsName = '',
				names = Object.assign({}, msg, options.listView.columnsCustomName);
				for (var i = 0; i < customCols.length; i++) {
					if (typeof names[customCols[i]] !== 'undefined') {
						name = names[customCols[i]];
					} else {
						name = fm.i18n(customCols[i]);
					}
					customColsName +='<td class="elfinder-cwd-view-th-'+customCols[i]+' sortable-item">'+name+'</td>';
				}
				return customColsName;
			},
			
			bottomMarkerShow = function(place, cnt) {
				var ph, col = 1;
				place = place || (list ? cwd.find('tbody') : cwd);

				if (buffer.length > 0) {
					place.css({height: 'auto'});
					ph = place.height();
					if (cnt) {
						if (! list) {
							col = Math.floor(place.width()/place.find('[id]:first').width());
							cnt = Math.ceil(cnt/col) * col;
						}
						bufferExt.hpi = ph / cnt;
						bufferExt.row = bufferExt.hpi * col;
					}
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
							// long tap
							cwd.data('longtap', true);
							fm.trigger('contextmenu', {
								'type'    : 'cwd',
								'targets' : [fm.cwd().hash],
								'x'       : wrapper.data('touching').x,
								'y'       : wrapper.data('touching').y
							});
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
			 * @return void
			 */
			content = function() {
				var phash, emptyMethod, thtr;

				wz.append(selectAllCheckbox).removeClass('elfinder-cwd-wrapper-empty elfinder-search-result elfinder-incsearch-result elfinder-letsearch-result');
				if (fm.searchStatus.state > 1 || fm.searchStatus.ininc) {
					wz.addClass('elfinder-search-result' + (fm.searchStatus.ininc? ' elfinder-'+(query.substr(0,1) === '/' ? 'let':'inc')+'search-result' : ''));
				}
				
				// abort attachThumbJob
				bufferExt.attachThumbJob && bufferExt.attachThumbJob._abort();
				
				// destroy selectable for GC
				cwd.data('selectable') && cwd.selectable('disable').selectable('destroy').removeData('selectable');
				
				// notify cwd init
				fm.trigger('cwdinit');
				
				selectedNext = $();
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
					thtr = $('<tr class="ui-state-default"><td class="elfinder-cwd-view-th-name">'+msg.name+'</td>'+customColsNameBuild()+'</tr>');
					cwd.find('thead').hide().append(
						thtr
						.on('contextmenu.'+fm.namespace, wrapperContextMenu.contextmenu)
						.on('touchstart.'+fm.namespace, 'td', wrapperContextMenu.touchstart)
						.on('touchmove.'+fm.namespace+' touchend.'+fm.namespace+' mouseup.'+fm.namespace, 'td', wrapperContextMenu.touchend)
						.on('click.'+fm.namespace,'td', wrapperContextMenu.click)
					).find('td:first').append(selectAllCheckbox);

					if ($.fn.sortable) {
						thtr.addClass('touch-punch touch-punch-keep-default')
							.sortable({
							axis: 'x',
							distance: 8,
							items: '> .sortable-item',
							start: function(e, ui) {
								$(ui.item[0]).data('dragging', true);
								ui.placeholder
									.width(ui.helper.removeClass('ui-state-hover').width())
									.removeClass('ui-state-active')
									.addClass('ui-state-hover')
									.css('visibility', 'visible');
							},
							update: function(e, ui){
								var target = $(ui.item[0]).attr('class').split(' ')[0].replace('elfinder-cwd-view-th-', ''),
									prev, done;
								customCols = $.map($(this).children(), function(n) {
									var name = $(n).attr('class').split(' ')[0].replace('elfinder-cwd-view-th-', '');
									if (! done) {
										if (target === name) {
											done = true;
										} else {
											prev = name;
										}
									}
									return (name === 'name')? null : name;
								});
								templates.row = makeTemplateRow();
								fm.storage('cwdCols', customCols);
								prev = '.elfinder-col-'+prev+':first';
								target = '.elfinder-col-'+target+':first';
								fm.lazy(function() {
									cwd.find('tbody tr').each(function() {
										var $this = $(this);
										$this.children(prev).after($this.children(target));
									});
								});
							},
							stop: function(e, ui) {
								setTimeout(function() {
									$(ui.item[0]).removeData('dragging');
								}, 100);
							}
						});
					}

					if ($.fn.resizable) {
						thtr.find('td').addClass('touch-punch').resizable({
							handles: fm.direction === 'ltr'? 'e' : 'w',
							start: function(e, ui) {
								var target = cwd.find('td.elfinder-col-'
									+ ui.element.attr('class').split(' ')[0].replace('elfinder-cwd-view-th-', '')
									+ ':first');
								
								ui.element
									.data('resizeTarget', target)
									.data('targetWidth', target.width());
								colResizing = true;
								if (cwd.find('table').css('table-layout') !== 'fixed') {
									cwd.find('tbody tr:first td').each(function() {
										$(this).width($(this).width());
									});
									cwd.find('table').css('table-layout', 'fixed');
								}
							},
							resize: function(e, ui) {
								ui.element.data('resizeTarget').width(ui.element.data('targetWidth') - (ui.originalSize.width - ui.size.width));
							},
							stop : function() {
								colResizing = false;
								fixTableHeader({fitWidth: true});
								colWidth = {};
								cwd.find('tbody tr:first td').each(function() {
									var name = $(this).attr('class').split(' ')[0].replace('elfinder-col-', '');
									colWidth[name] = $(this).width();
								});
								fm.storage('cwdColWidth', colWidth);
							}
						})
						.find('.ui-resizable-handle').addClass('ui-icon ui-icon-grip-dotted-vertical');
					}
				}

				fm.lazy(function() {
					buffer = $.map(incHashes || cwdHashes, function(hash) { return fm.file(hash) || null });
					
					buffer = fm.sortFiles(buffer);
					bufferExt = {
						renderd: 0,
						attachTmbs: {},
						getTmbs: [],
						lazyOpts: { tm : 0 }
					};
					
					wz[(buffer.length < 1) ? 'addClass' : 'removeClass']('elfinder-cwd-wrapper-empty');
					wrapper.off(scrollEvent, render).on(scrollEvent, render).trigger(scrollEvent);
					
					// set droppable
					if (!fm.cwd().write) {
						wrapper.removeClass('native-droppable')
						       .droppable('disable')
						       .removeClass('ui-state-disabled'); // for old jQueryUI see https://bugs.jqueryui.com/ticket/5974
					} else {
						wrapper[fm.isCommandEnabled('upload')? 'addClass' : 'removeClass']('native-droppable');
						wrapper.droppable(fm.isCommandEnabled('paste')? 'enable' : 'disable');
					}
				});
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

					if (e.shiftKey) {
						prev = p.prevAll(lastSelect || '.'+clSelected+':first');
						next = p.nextAll(lastSelect || '.'+clSelected+':first');
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
					if (scrolling) { return; }
					var $this = $(this), helper = null,
						target = list ? $this : $this.children('div.elfinder-cwd-file-wrapper,div.elfinder-cwd-filename');

					if (!mobile && !$this.data('dragRegisted') && !$this.hasClass(clTmp) && !target.hasClass(clDraggable) && !target.hasClass(clDisabled)) {
						$this.data('dragRegisted', true);
						if (!fm.isCommandEnabled('copy', fm.searchStatus.state > 1? fm.cwdId2Hash($this.attr('id')) : void 0)) {
							return;
						}
						target.on('mousedown', function(e) {
							// shiftKey or altKey + drag start for HTML5 native drag function
							// Note: can no use shiftKey with the Google Chrome 
							var metaKey = e.shiftKey || e.altKey;
							if (metaKey && !fm.UA.IE && cwd.data('selectable')) {
								// destroy jQuery-ui selectable while trigger native drag
								cwd.selectable('disable').selectable('destroy').removeData('selectable');
								setTimeout(function(){
									cwd.selectable(selectableOption).selectable('option', {disabled: false}).selectable('refresh').data('selectable', true);
								}, 10);
							}
							target.draggable('option', 'disabled', metaKey).removeClass('ui-state-disabled');
							if (metaKey) {
								target.attr('draggable', 'true');
							} else {
								target.removeAttr('draggable')
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
						id    = fm.cwdId2Hash($this.attr('id'));
					
					if (!selectLock && !$this.hasClass(clDisabled)) {
						lastSelect = '#'+ this.id;
						$this.addClass(clSelected).children().addClass(clHover).find('input:checkbox').prop('checked', true);;
						if ($.inArray(id, selectedFiles) === -1) {
							selectedFiles.push(id);
						}
						// will be selected next
						selectedNext = cwd.find('[id].'+clSelected+':last').next();
					}
				})
				// remove hover class from unselected file
				.on(evtUnselect, fileSelector, function(e) {
					var $this = $(this), 
						id    = fm.cwdId2Hash($this.attr('id')),
						ndx;
					
					if (!selectLock) {
						$this.removeClass(clSelected).children().removeClass(clHover).find('input:checkbox').prop('checked', false);
						if (cwd.hasClass('elfinder-cwd-allselected')) {
							selectCheckbox && selectAllCheckbox.children('input').prop('checked', false);
							cwd.removeClass('elfinder-cwd-allselected');
						}
						ndx = $.inArray(id, selectedFiles);
						if (ndx !== -1) {
							lastSelect = void 0;
							selectedFiles.splice(ndx, 1);
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
					scrollToView($(this), true);
				})
				.on('mouseenter.'+fm.namespace+' mouseleave.'+fm.namespace, fileSelector, function(e) {
					var enter = (e.type === 'mouseenter');
					if (enter && scrolling) { return; }
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
					if (e.target === this && ! cwd.data('longtap')) {
						!e.shiftKey && !e.ctrlKey && !e.metaKey && unselectAll();
					}
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
					
					setColwidth();
					wrapper.scrollTop(0).scrollLeft(0);
				})
				// unselect all selected files
				.on('unselectall', unselectAll)
				.on('selectfile', function(e, id) {
					$('#'+fm.cwdHash2Id(id)).trigger(evtSelect);
					trigger();
				})
				.on('colwidth', function() {
					if (list) {
						cwd.find('table').css('table-layout', '')
							.find('td').css('width', '');
						fixTableHeader({fitWidth: true});
						fm.storage('cwdColWidth', colWidth = null);
					}
				}),
			wrapper = $('<div class="elfinder-cwd-wrapper"/>')
				// make cwd itself droppable for folders from nav panel
				.droppable(Object.assign({}, droppable, {autoDisable: false}))
				.on('contextmenu.'+fm.namespace, wrapperContextMenu.contextmenu)
				.on('touchstart.'+fm.namespace, wrapperContextMenu.touchstart)
				.on('touchmove.'+fm.namespace+' touchend.'+fm.namespace, wrapperContextMenu.touchend)
				.on('click.'+fm.namespace, wrapperContextMenu.click)
				.on('scroll.'+fm.namespace, function() {
					if (! scrolling) {
						cwd.data('selectable') && cwd.selectable('disable');
						wrapper.trigger(scrollStartEvent);
					}
					scrolling = true;
					bufferExt.scrtm && clearTimeout(bufferExt.scrtm);
					if (bufferExt.scrtm && Math.abs((bufferExt.scrolltop || 0) - (bufferExt.scrolltop = (this.scrollTop || $(this).scrollTop()))) < 5) {
						bufferExt.scrtm = 0;
						wrapper.trigger(scrollEvent);
					}
					bufferExt.scrtm = setTimeout(function() {
						bufferExt.scrtm = 0;
						wrapper.trigger(scrollEvent);
					}, 20);
				})
				.on(scrollEvent, function() {
					scrolling = false;
					wrapperRepaint();
				}),
			
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
						selectAll();
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
				
				list && ! colResizing && fixTableHeader();
				
				wrapperRepaint();
			},
			
			// elfinder node
			parent = $(this).parent().resize(resize),
			
			// workzone node 
			wz = parent.children('.elfinder-workzone').append(wrapper.append(this).append(bottomMarker)),
			
			winScrTm;

		// setup by options
		replacement = Object.assign(replacement, options.replacement || {});
		
		try {
			colWidth = fm.storage('cwdColWidth')? fm.storage('cwdColWidth') : null;
		} catch(e) {
			colWidth = null;
		}
		
		// setup costomCols
		if (customCols = fm.storage('cwdCols')) {
			customCols = $.map(customCols, function(n) {
				return (options.listView.columns.indexOf(n) !== -1)? n : null;
			});
			if (options.listView.columns.length > customCols.length) {
				$.each(options.listView.columns, function(i, n) {
					if (customCols.indexOf(n) === -1) {
						customCols.push(n);
					}
				});
			}
		} else {
			customCols = options.listView.columns;
		}
		templates.row = makeTemplateRow();
		
		if (mobile) {
			// for iOS5 bug
			$('body').on('touchstart touchmove touchend', function(e){});
		}
		
		selectCheckbox && cwd.addClass('elfinder-has-checkbox');
		
		$(window).on('scroll.'+fm.namespace, function() {
			winScrTm && clearTimeout(winScrTm);
			winScrTm = setTimeout(function() {
				wrapper.trigger(scrollEvent);
			}, 50);
		});
		
		$(document).on('keydown.'+fm.namespace, function(e) {
			if (e.keyCode == $.ui.keyCode.ESCAPE) {
				if (! fm.getUI().find('.ui-widget:visible').length) {
					unselectAll();
				}
			}
		});
		
		fm
			.one('init', function(){
				var style = document.createElement('style'),
				sheet, node, base, resizeTm, i = 0;
				if (document.head) {
					document.head.appendChild(style);
					sheet = style.sheet;
					sheet.insertRule('.elfinder-cwd-wrapper-empty .elfinder-cwd:after{ content:"'+fm.i18n('emptyFolder')+'" }', i++);
					sheet.insertRule('.elfinder-cwd-wrapper-empty .ui-droppable .elfinder-cwd:after{ content:"'+fm.i18n('emptyFolder'+(mobile? 'LTap' : 'Drop'))+'" }', i++);
					sheet.insertRule('.elfinder-cwd-wrapper-empty .ui-droppable-disabled .elfinder-cwd:after{ content:"'+fm.i18n('emptyFolder')+'" }', i++);
					sheet.insertRule('.elfinder-cwd-wrapper-empty.elfinder-search-result .elfinder-cwd:after{ content:"'+fm.i18n('emptySearch')+'" }', i++);
					sheet.insertRule('.elfinder-cwd-wrapper-empty.elfinder-search-result.elfinder-incsearch-result .elfinder-cwd:after{ content:"'+fm.i18n('emptyIncSearch')+'" }', i++);
					sheet.insertRule('.elfinder-cwd-wrapper-empty.elfinder-search-result.elfinder-letsearch-result .elfinder-cwd:after{ content:"'+fm.i18n('emptyLetSearch')+'" }', i++);
				}
				if (! mobile) {
					fm.one('open', function() {
						sheet && fm.zIndex && sheet.insertRule('.ui-selectable-helper{z-index:'+fm.zIndex+';}', i++);
					});
					base = $('<div style="position:absolute"/>');
					node = fm.getUI();
					node.on('resize', function(e, data) {
						var offset;
						if (data && data.fullscreen) {
							offset = node.offset();
							if (data.fullscreen === 'on') {
								base.css({top:offset.top * -1 , left:offset.left * -1 }).appendTo(node);
								selectableOption.appendTo = base;
							} else {
								base.detach();
								selectableOption.appendTo = 'body';
							}
							cwd.data('selectable') && cwd.selectable('option', {appendTo : selectableOption.appendTo});
						}
					});
				}
			})
			.bind('enable', function() {
				resize();
			})
			.bind('open add remove searchend', function() {
				var phash = fm.cwd().hash,
					type = this.type;
				if (type === 'open' || type === 'searchend' || fm.searchStatus.state < 2) {
					cwdHashes = $.map(fm.files(phash), function(f) { return f.hash; });
					fm.trigger('cwdhasheschange', cwdHashes);
				}
				if (type === 'open') {
					var inTrash = function() {
						var isIn = false;
						$.each(cwdParents, function(i, h) {
							if (fm.trashes[h]) {
								isIn = true;
								return false;
							}
						});
						return isIn;
					};
					cwdParents = fm.parents(fm.cwd().hash);
					wrapper[inTrash()? 'addClass':'removeClass']('elfinder-cwd-wrapper-trash');
					incHashes = void 0;
					unselectAll();
					content();
					resize();
				}
			})
			.bind('search', function(e) {
				cwdHashes = $.map(e.data.files, function(f) { return f.hash; });
				fm.trigger('cwdhasheschange', cwdHashes);
				incHashes = void 0;
				fm.searchStatus.ininc = false;
				content();
				fm.autoSync('stop');
				resize();
			})
			.bind('searchend', function(e) {
				if (query || incHashes) {
					query = '';
					if (incHashes) {
						fm.trigger('incsearchend', e.data);
					} else {
						if (!e.data || !e.data.noupdate) {
							content();
						}
					}
				}
				fm.autoSync();
				resize();
			})
			.bind('searchstart', function(e) {
				unselectAll();
				query = e.data.query;
			})
			.bind('incsearchstart', function(e) {
				selectedFiles = [];
				fm.lazy(function() {
					// incremental search
					var regex, q, fst = '';
					q = query = e.data.query || '';
					if (q) {
						if (q.substr(0,1) === '/') {
							q = q.substr(1);
							fst = '^';
						}
						regex = new RegExp(fst + q.replace(/([\\*\;\.\?\[\]\{\}\(\)\^\$\-\|])/g, '\\$1'), 'i');
						incHashes = $.map(cwdHashes, function(hash) {
							var file = fm.file(hash);
							return (file && (file.name.match(regex) || (file.i18 && file.i18.match(regex))))? file.hash : null;
						});
						fm.trigger('incsearch', { hashes: incHashes, query: q })
							.searchStatus.ininc = true;
						content();
						fm.autoSync('stop');
					} else {
						fm.trigger('incsearchend');
					}
					resize();
				});
			})
			.bind('incsearchend', function(e) {
				query = '';
				fm.searchStatus.ininc = false;
				incHashes = void 0;
				if (!e.data || !e.data.noupdate) {
					content();
				}
				fm.autoSync();
			})
			.bind('sortchange', function() {
				var lastScrollLeft = wrapper.scrollLeft();
				
				content();
				fm.one('cwdrender', function() {
					wrapper.scrollLeft(lastScrollLeft);
					selectedFiles.length && trigger();
					resize();
				});
			})
			.bind('viewchange', function() {
				var l      = fm.storage('view') == 'list',
					allsel = cwd.hasClass('elfinder-cwd-allselected');
				
				if (l != list) {
					list = l;
					fm.viewType = list? 'list' : 'icons';
					content();

					if (allsel) {
						cwd.addClass('elfinder-cwd-allselected');
						selectAllCheckbox.find('input').prop('checked', true);
					}
					selectedFiles.length && trigger();
				}
				resize();
			})
			.bind('wzresize', function() {
				var place = list ? cwd.find('tbody') : cwd,
					cwdOffset;
				resize(true);
				if (bufferExt.hpi) {
					bottomMarkerShow(place, place.find('[id]').length);
				}
				
				cwdOffset = cwd.offset();
				wz.data('rectangle', Object.assign(
					{
						width: wz.width(),
						height: wz.height(),
						cwdEdge: (fm.direction === 'ltr')? cwdOffset.left : cwdOffset.left + cwd.width()
					},
					wz.offset())
				);
				
				bufferExt.itemH = (list? place.find('tr:first') : place.find('[id]:first')).outerHeight(true);
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
			.bind('resMixinMake', function() {
				setColwidth();
			})
			.bind('tmbreload', function(e) {
				var imgs = {},
					files = (e.data && e.data.files)? e.data.files : null;
				
				$.each(files, function(i, f) {
					if (f.tmb && f.tmb != '1') {
						imgs[f.hash] = f.tmb;
					}
				});
				if (Object.keys(imgs).length) {
					attachThumbnails(imgs, true);
				}
			})
			.add(function(e) {
				var phash = fm.cwd().hash,
					regex = query? new RegExp(query.replace(/([\\*\;\.\?\[\]\{\}\(\)\^\$\-\|])/g, '\\$1'), 'i') : null,
					files = regex
						? $.map(e.data.added || [], function(f) { return ((! fm.searchStatus.ininc && fm.searchStatus.target === '' && fm.searchStatus.mime === '') || f.phash == phash) && (f.name.match(regex) || (f.i18 && f.i18.match(regex)))? f : null ;})
						: $.map(e.data.added || [], function(f) { return f.phash === phash ? f : null; })
						;
				add(files);
				if (fm.searchStatus.state === 2) {
					$.each(files, function(i, f) {
						if ($.inArray(f.hash, cwdHashes) === -1) {
							cwdHashes.push(f.hash);
						}
					});
					fm.trgger('cwdhasheschange', cwdHashes);
				}
				list && resize();
				wrapper.trigger(scrollEvent);
			})
			.change(function(e) {
				var phash = fm.cwd().hash,
					sel   = fm.selected(),
					files, added;

				if (query) {
					$.each(e.data.changed || [], function(i, file) {
						remove([file.hash]);
						if (file.name.indexOf(query) !== -1) {
							add([file], 'change');
							$.inArray(file.hash, sel) !== -1 && selectFile(file.hash);
							added = true;
						}
					});
				} else {
					$.each($.map(e.data.changed || [], function(f) { return f.phash == phash ? f : null; }), function(i, file) {
						remove([file.hash]);
						add([file], 'change');
						$.inArray(file.hash, sel) !== -1 && selectFile(file.hash);
						added = true;
					});
				}
				
				if (added) {
					list && resize();
					wrapper.trigger(scrollEvent);
				}
				
				trigger();
			})
			.remove(function(e) {
				var place = list ? cwd.find('tbody') : cwd;
				remove(e.data.removed || []);
				trigger();
				if (buffer.length < 1 && place.children().length < 1) {
					wz.addClass('elfinder-cwd-wrapper-empty');
					selectCheckbox && selectAllCheckbox.find('input').prop('checked', false);
					bottomMarker.hide();
					wrapper.off(scrollEvent, render);
					resize();
				} else {
					bottomMarkerShow(place);
					wrapper.trigger(scrollEvent);
				}
			})
			// select dragged file if no selected, disable selectable
			.dragstart(function(e) {
				var target = $(e.data.target),
					oe     = e.data.originalEvent;

				if (target.hasClass(fileSelector.substr(1))) {
					
					if (!target.hasClass(clSelected)) {
						!(oe.ctrlKey || oe.metaKey || oe.shiftKey) && unselectAll();
						target.trigger(evtSelect);
						trigger();
					}
				}
				
				cwd.removeClass(clDisabled).data('selectable') && cwd.selectable('disable');
				selectLock = true;
			})
			// enable selectable
			.dragstop(function() {
				cwd.data('selectable') && cwd.selectable('enable');
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
					parents, ctr, add, sels;

				if (l > 0) {
					parents = fm.parents(files[0]);
				}
				if (event === evtSelect || event === evtUnselect) {
					add  = (event === evtSelect),
					sels = add? selectedFiles.concat() : selectedFiles;
					$.each(files, function(i, hash) {
						var idx = $.inArray(hash, sels),
							all = cwd.hasClass('elfinder-cwd-allselected');
						if (idx === -1) {
							add && selectedFiles.push(hash);
						} else {
							if (all) {
								selectCheckbox && selectAllCheckbox.children('input').prop('checked', false);
								cwd.removeClass('elfinder-cwd-allselected');
								all = false;
							}
							! add && selectedFiles.splice(idx, 1);
						}
					});
				}
				if (!helper.data('locked')) {
					while (l--) {
						$('#'+fm.cwdHash2Id(files[l])).trigger(event);
					}
					! e.data.inselect && trigger();
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
			})
			.shortcut({
				pattern     : 'page_up',
				description : 'pageTurning',
				callback    : function(e) {
					if (bufferExt.itemH) {
						wrapper.scrollTop(
							Math.round(
								wrapper.scrollTop()
								- (Math.floor((wrapper.height() + (list? bufferExt.itemH * -1 : 16)) / bufferExt.itemH)) * bufferExt.itemH
							)
						);
					}
				}
			}).shortcut({
				pattern     : 'page_down',
				description : 'pageTurning',
				callback    : function(e) { 
					if (bufferExt.itemH) {
						wrapper.scrollTop(
							Math.round(
								wrapper.scrollTop()
								+ (Math.floor((wrapper.height() + (list? bufferExt.itemH * -1 : 16)) / bufferExt.itemH)) * bufferExt.itemH
							)
						);
					}
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
$.fn.elfinderdialog = function(opts, fm) {
	var platformWin = (window.navigator.platform.indexOf('Win') != -1),
		dialog, elfNode;
	
	if (fm && fm.ui) {
		elfNode = fm.getUI();
	} else {
		elfNode = this.closest('.elfinder');
		if (! fm) {
			fm = elfNode.elfinder('instance');
		}
	}
	
	if (typeof opts  === 'string') {
		if ((dialog = this.closest('.ui-dialog')).length) {
			if (opts == 'open') {
				dialog.css('display') == 'none' && dialog.fadeIn(120, function() {
					dialog.trigger('open');
				});
			} else if (opts == 'close' || opts == 'destroy') {
				dialog.stop(true);
				(dialog.is(':visible') || elfNode.is(':hidden')) && dialog.hide().trigger('close');
				opts == 'destroy' && dialog.remove();
			} else if (opts == 'toTop') {
				dialog.trigger('totop');
			} else if (opts == 'posInit') {
				dialog.trigger('posinit');
			} else if (opts == 'tabstopsInit') {
				dialog.trigger('tabstopsInit');
			}
		}
		return this;
	}
	
	opts = Object.assign({}, $.fn.elfinderdialog.defaults, opts);
	
	if (opts.allowMinimize && opts.allowMinimize === 'auto') {
		opts.allowMinimize = this.find('textarea,input').length? true : false; 
	}
	if (opts.headerBtnPos && opts.headerBtnPos === 'auto') {
		opts.headerBtnPos = platformWin? 'right' : 'left';
	}
	if (opts.headerBtnOrder && opts.headerBtnOrder === 'auto') {
		opts.headerBtnOrder = platformWin? 'close:maximize:minimize' : 'close:minimize:maximize';
	}
	
	if (opts.modal && opts.allowMinimize) {
		opts.allowMinimize = false;
	}
	
	this.filter(':not(.ui-dialog-content)').each(function() {
		var self       = $(this).addClass('ui-dialog-content ui-widget-content'),
			clactive   = 'elfinder-dialog-active',
			cldialog   = 'elfinder-dialog',
			clnotify   = 'elfinder-dialog-notify',
			clhover    = 'ui-state-hover',
			cltabstop  = 'elfinder-tabstop',
			cl1stfocus = 'elfinder-focus',
			id         = parseInt(Math.random()*1000000),
			titlebar   = $('<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"><span class="elfinder-dialog-title">'+opts.title+'</span></div>'),
			buttonset  = $('<div class="ui-dialog-buttonset"/>'),
			buttonpane = $('<div class=" ui-helper-clearfix ui-dialog-buttonpane ui-widget-content"/>')
				.append(buttonset),
			btnWidth   = 0,
			btnCnt     = 0,
			tabstops   = $(),
			tabstopsInit = function() {
				tabstops = dialog.find('.'+cltabstop);
				if (tabstops.length) {
					tabstops.attr('tabindex', '-1');
					if (! tabstops.filter('.'+cl1stfocus).length) {
						buttonset.children('.'+cltabstop+':'+(platformWin? 'first' : 'last')).addClass(cl1stfocus);
					}
				}
			},
			tabstopNext = function(cur) {
				var elms = tabstops.filter(':visible'),
					node = cur? null : elms.filter('.'+cl1stfocus+':first');
					
				if (! node || ! node.length) {
					node = elms.first();
				}
				if (cur) {
					$.each(elms, function(i, elm) {
						if (elm === cur && elms[i+1]) {
							node = elms.eq(i+1);
							return false;
						}
					});
				}
				return node;
			},
			tabstopPrev = function(cur) {
				var elms = tabstops.filter(':visible'),
					node = elms.last();
				$.each(elms, function(i, elm) {
					if (elm === cur && elms[i-1]) {
						node = elms.eq(i-1);
						return false;
					}
				});
				return node;
			},
			makeHeaderBtn = function() {
				$.each(opts.headerBtnOrder.split(':').reverse(), function(i, v) {
					headerBtns[v] && headerBtns[v]();
				})
				if (platformWin) {
					titlebar.children('.elfinder-titlebar-button').addClass('elfinder-titlebar-button-right');
				}
			},
			headerBtns = {
				close: function() {
					titlebar.prepend($('<span class="ui-widget-header ui-dialog-titlebar-close ui-corner-all elfinder-titlebar-button"><span class="ui-icon ui-icon-closethick"/></span>')
						.on('mousedown', function(e) {
							e.preventDefault();
							e.stopPropagation();
							self.elfinderdialog('close');
						})
					);
				},
				maximize: function() {
					if (opts.allowMaximize) {
						dialog.on('resize', function(e, data) {
							var full, elm;
							if (data && data.maximize) {
								elm = titlebar.find('.elfinder-titlebar-full');
								full = (data.maximize === 'on');
								elm.children('span.ui-icon')
									.toggleClass('ui-icon-plusthick', ! full)
									.toggleClass('ui-icon-arrowreturnthick-1-s', full);
								if (full) {
									try {
										dialog.hasClass('ui-draggable') && dialog.draggable('disable');
										dialog.hasClass('ui-resizable') && dialog.resizable('disable');
									} catch(e) {}
									if (typeof elm.data('style') === 'undefined') {
										self.height(self.height());
										elm.data('style', self.attr('style') || '');
									}
									self.css('width', '100%').css('height', dialog.height() - dialog.children('.ui-dialog-titlebar').outerHeight(true) - buttonpane.outerHeight(true));
								} else {
									self.attr('style', elm.data('style'));
									elm.removeData('style');
									try {
										dialog.hasClass('ui-draggable') && dialog.draggable('enable');
										dialog.hasClass('ui-resizable') && dialog.resizable('enable');
									} catch(e) {}
								}
								dialog.trigger('resize');
							}
						});
						titlebar.prepend($('<span class="ui-widget-header ui-corner-all elfinder-titlebar-button elfinder-titlebar-full"><span class="ui-icon ui-icon-plusthick"/></span>')
							.on('mousedown', function(e) {
								e.preventDefault();
								e.stopPropagation();
								fm.toggleMaximize(dialog);
							})
						);
					}
					
				},
				minimize: function() {
					if (opts.allowMinimize) {
						titlebar.on('dblclick', function(e) {
								$(this).children('.elfinder-titlebar-minimize').trigger('mousedown');
							})
							.prepend($('<span class="ui-widget-header ui-corner-all elfinder-titlebar-button elfinder-titlebar-minimize"><span class="ui-icon ui-icon-minusthick"/></span>')
							.on('mousedown', function(e) {
								var $this = $(this),
									pos, w;
								
								e.preventDefault();
								e.stopPropagation();
								if (typeof $this.data('style') !== 'undefined') {
									elfNode.append(dialog);
									dialog.attr('style', $this.data('style'))
										.removeClass('elfinder-dialog-minimized')
										.off('mousedown.minimize');
									$this.removeData('style').show();
									titlebar.children('.elfinder-titlebar-full').show();
									dialog.children('.ui-widget-content').slideDown('fast', function() {
										var eData;
										if (this === dialog.children('.ui-widget-content:first').get(0)) {
											if (dialog.find('.'+fm.res('class', 'editing'))) {
												fm.disable();
											}
											eData = { minimize: 'off' };
											if (! dialog.hasClass('elfinder-maximized')) {
												try {
													dialog.hasClass('ui-draggable') && dialog.draggable('enable');
													dialog.hasClass('ui-resizable') && dialog.resizable('enable');
												} catch(e) {}
											} else {
												eData.maximize = 'on';
											}
											dialog.trigger('resize', eData);
										}
									});
								} else {
									try {
										dialog.hasClass('ui-draggable') && dialog.draggable('disable');
										dialog.hasClass('ui-resizable') && dialog.resizable('disable');
									} catch(e) {}
									$this.data('style', dialog.attr('style') || '').hide();
									titlebar.children('.elfinder-titlebar-full').hide();
									w = dialog.width();
									dialog.children('.ui-widget-content').slideUp('fast', function() {
										if (this === dialog.children('.ui-widget-content:first').get(0)) {
											dialog.trigger('resize', { minimize: 'on' });
											dialog.attr('style', '').css({ maxWidth: w})
												.addClass('elfinder-dialog-minimized')
												.one('mousedown.minimize', function(e) {
													$this.trigger('mousedown');
												})
												.appendTo(fm.getUI('bottomtray'));
										}
									});
								}
							})
						);
					}
				}
			},
			dialog = $('<div class="ui-front ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable std42-dialog touch-punch '+cldialog+' '+opts.cssClass+'"/>')
				.hide()
				.append(self)
				.appendTo(elfNode)
				.draggable({
					handle : '.ui-dialog-titlebar',
					containment : 'document',
					stop : function(e, ui){
						dialog.css({height : opts.height});
						self.data('draged', true);
					}
				})
				.css({
					width  : opts.width,
					height : opts.height
				})
				.on('mousedown', function(e) {
					if (! dialog.hasClass('ui-front')) {
						setTimeout(function() {
							dialog.is(':visible:not(.elfinder-dialog-minimized)') && dialog.trigger('totop');
						}, 10);
					}
				})
				.on('open', function() {
					var d           = $(this),
						maxWinWidth = (d.outerWidth() > elfNode.width()-10)? elfNode.width()-10 : null;
					
					maxWinWidth && d.css({width: maxWinWidth, left: '5px'});

					if (!dialog.hasClass(clnotify)) {
						elfNode.children('.'+cldialog+':visible:not(.'+clnotify+')').each(function() {
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
					
					dialog.data('modal') && fm.getUI('overlay').elfinderoverlay('show');
					
					dialog.trigger('totop');
					
					typeof(opts.open) == 'function' && $.proxy(opts.open, self[0])();
					
					fm.UA.Mobile && tabstopNext().focus();
					
					if (opts.closeOnEscape) {
						$(document).on('keyup.'+id, function(e) {
							if (e.keyCode == $.ui.keyCode.ESCAPE && dialog.hasClass(clactive)) {
								self.elfinderdialog('close');
							}
						})
					}
				})
				.on('close', function() {
					var dialogs;
					
					if (opts.closeOnEscape) {
						$(document).off('keyup.'+id);
					}
					
					if (opts.allowMaximize) {
						fm.toggleMaximize(dialog, false);
					}
					
					dialog.data('modal') && fm.getUI('overlay').elfinderoverlay('hide');

					if (typeof(opts.close) == 'function') {
						$.proxy(opts.close, self[0])();
					} else if (opts.destroyOnClose) {
						dialog.hide().remove();
					}
					
					// get focus to next dialog
					dialogs = elfNode.children('.'+cldialog+':visible');
					if (dialogs.length) {
						dialogs.filter(':last').trigger('totop');
					} else {
						setTimeout(function() {
							// return focus to elfNode
							fm.enable();
						}, 20);
					}
				})
				.on('totop', function() {
					if (dialog.hasClass('elfinder-dialog-minimized')) {
						titlebar.children('.elfinder-titlebar-minimize').trigger('mousedown');
					}
					
					fm.toFront(dialog);
					elfNode.children('.'+cldialog).removeClass(clactive+' ui-front');
					dialog.addClass(clactive+' ui-front');

					! fm.UA.Mobile && tabstopNext().focus();
				})
				.on('posinit', function() {
					var css = opts.position;
					if (! css && ! dialog.data('resizing')) {
						css = {
							top  : Math.max(0, parseInt((elfNode.height() - dialog.outerHeight())/2 - 42))+'px',
							left : Math.max(0, parseInt((elfNode.width() - dialog.outerWidth())/2))+'px'
						};
					}
					if (opts.absolute) {
						css.position = 'absolute';
					}
					css && dialog.css(css);
				})
				.on('resize', function(e, data) {
					if (typeof(opts.resize) === 'function') {
						$.proxy(opts.resize, self[0])(e, data);
					}
				})
				.on('tabstopsInit', tabstopsInit)
				.on('focus', '.'+cltabstop, function() {
					$(this).addClass(clhover).parent('label').addClass(clhover);
					this.id && $(this).parent().find('label[for='+this.id+']').addClass(clhover);
				})
				.on('blur', '.'+cltabstop, function() {
					$(this).removeClass(clhover).removeData('keepFocus').parent('label').removeClass(clhover);
					this.id && $(this).parent().find('label[for='+this.id+']').removeClass(clhover);
				})
				.on('mouseenter mouseleave', '.'+cltabstop, function(e) {
					var $this = $(this);
					if (opts.btnHoverFocus) {
						if (e.type == 'mouseenter' && ! $(':focus').data('keepFocus')) {
							$this.focus();
						}
					} else {
						$this.toggleClass(clhover, e.type == 'mouseenter');
					}
				})
				.on('keydown', '.'+cltabstop, function(e) {
					var $this = $(this);
					if ($this.is(':focus')) {
						e.stopPropagation();
						if (e.keyCode == $.ui.keyCode.ENTER) {
							e.preventDefault();
							$this.click();
						}  else if ((e.keyCode == $.ui.keyCode.TAB && e.shiftKey) || e.keyCode == $.ui.keyCode.LEFT || e.keyCode == $.ui.keyCode.UP) {
							if ($this.is('input:text') && (!(e.ctrlKey || e.metaKey) && e.keyCode == $.ui.keyCode.LEFT)) {
								return;
							}
							if ($this.is('select') && e.keyCode != $.ui.keyCode.TAB) {
								return;
							}
							if ($this.is('textarea') && !(e.ctrlKey || e.metaKey)) {
								return;
							}
							e.preventDefault();
							tabstopPrev(this).focus();
						}  else if (e.keyCode == $.ui.keyCode.TAB || e.keyCode == $.ui.keyCode.RIGHT || e.keyCode == $.ui.keyCode.DOWN) {
							if ($this.is('input:text') && (!(e.ctrlKey || e.metaKey) && e.keyCode == $.ui.keyCode.RIGHT)) {
								return;
							}
							if ($this.is('select') && e.keyCode != $.ui.keyCode.TAB) {
								return;
							}
							if ($this.is('textarea') && !(e.ctrlKey || e.metaKey)) {
								return;
							}
							e.preventDefault();
							tabstopNext(this).focus();
						}
					}
				})
				.data({modal: opts.modal})
			;
		
		dialog.prepend(titlebar);

		makeHeaderBtn();

		$.each(opts.buttons, function(name, cb) {
			var button = $('<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only '
					+'elfinder-btncnt-'+(btnCnt++)+' '
					+cltabstop
					+'"><span class="ui-button-text">'+name+'</span></button>')
				.on('click', $.proxy(cb, self[0]));
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
		
		dialog.trigger('posinit').data('margin-y', self.outerHeight(true) - self.height());
		
		if (opts.resizable && $.fn.resizable) {
			dialog.resizable({
				minWidth   : opts.minWidth,
				minHeight  : opts.minHeight,
				start      : function() {
					if (dialog.data('resizing') !== true && dialog.data('resizing')) {
						clearTimeout(dialog.data('resizing'));
					}
					dialog.data('resizing', true);
				},
				stop       : function() {
					dialog.data('resizing', setTimeout(function() {
						dialog.data('resizing', false);
					}, 200));
				},
				resize     : function(e, ui) {
					var oh = 0;
					dialog.children('.ui-widget-header,.ui-dialog-buttonpane').each(function() {
						oh += $(this).outerHeight(true);
					});
					self.height(ui.size.height - oh - dialog.data('margin-y'));
					dialog.trigger('resize');
				}
			});
		} 
			
		typeof(opts.create) == 'function' && $.proxy(opts.create, this)();
			
		tabstopsInit();
		
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
	absolute  : false,
	width     : 320,
	height    : 'auto',
	minWidth  : 200,
	minHeight : 110,
	allowMinimize : 'auto',
	allowMaximize : false,
	headerBtnPos : 'auto',
	headerBtnOrder : 'auto'
};


/*
 * File: /js/ui/fullscreenbutton.js
 */

/**
 * @class  elFinder toolbar button to switch full scrren mode.
 *
 * @author Naoki Sawada
 **/

$.fn.elfinderfullscreenbutton = function(cmd) {
	return this.each(function() {
		var button = $(this).elfinderbutton(cmd),
			icon   = button.children('.elfinder-button-icon');
		cmd.change(function() {
			var fullscreen = cmd.value;
			icon.toggleClass('elfinder-button-icon-unfullscreen', fullscreen);
			button.attr('title', fullscreen? cmd.fm.i18n('reinstate') : cmd.fm.i18n('cmdfullscreen'));
			cmd.className = fullscreen? 'unfullscreen' : '';
			cmd.title = cmd.fm.i18n(fullscreen ? 'reinstate' : 'cmdfullscreen');
		});
	});
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
		var nav    = $(this).hide().addClass('ui-state-default elfinder-navbar'),
			parent = nav.parent(),
			wz     = parent.children('.elfinder-workzone').append(nav),
			delta  = nav.outerHeight() - nav.height(),
			ltr    = fm.direction == 'ltr',
			handle, swipeHandle, autoHide, setWidth,
			setWzRect = function() {
				var cwd = fm.getUI('cwd'),
					wz  = fm.getUI('workzone'),
					wzRect = wz.data('rectangle'),
					cwdOffset = cwd.offset();
				wz.data('rectangle', Object.assign(wzRect, { cwdEdge: (fm.direction === 'ltr')? cwdOffset.left : cwdOffset.left + cwd.width() }));
			};

			fm.one('cssloaded', function() {
				delta = nav.outerHeight() - nav.height();
			}).bind('wzresize', function() {
				nav.height(wz.height() - delta);
			});
		
		if (fm.UA.Touch) {
			autoHide = fm.storage('autoHide') || {};
			if (typeof autoHide.navbar === 'undefined') {
				autoHide.navbar = (opts.autoHideUA && opts.autoHideUA.length > 0 && $.map(opts.autoHideUA, function(v){ return fm.UA[v]? true : null; }).length);
				fm.storage('autoHide', autoHide);
			}
			
			if (autoHide.navbar) {
				fm.one('init', function() {
					fm.uiAutoHide.push(function(){ nav.stop(true, true).trigger('navhide', { duration: 'slow', init: true }); });
				});
			}
			
			fm.bind('load', function() {
				swipeHandle = $('<div class="elfinder-navbar-swipe-handle"/>').hide().appendTo(wz);
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
					fm.trigger('navbar'+ mode).getUI('cwd').trigger('resize');
					data.init && fm.trigger('uiautohide');
					setWzRect();
				});
				autoHide.navbar = (mode !== 'show');
				fm.storage('autoHide', Object.assign(fm.storage('autoHide'), {navbar: autoHide.navbar}));
			});
		}
		
		if ($.fn.resizable && ! fm.UA.Mobile) {
			handle = nav.resizable({
					handles : ltr ? 'e' : 'w',
					minWidth : opts.minWidth || 150,
					maxWidth : opts.maxWidth || 500,
					stop : function(e, ui) {
						fm.storage('navbarWidth', ui.size.width);
						setWzRect();
					}
				})
				.on('resize scroll', function(e) {
					if (! ltr && e.type === 'resize') {
						nav.css('left', 0);
					}
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

		if (setWidth = fm.storage('navbarWidth')) {
			nav.width(setWidth);
		} else {
			if (fm.UA.Mobile) {
				fm.one('cssloaded', function() {
					nav.data('defWidth', nav.width());
					$(window).on('resize.' + fm.namespace, function(e){
						setWidth = nav.parent().width() / 2;
						if (nav.data('defWidth') > setWidth) {
							nav.width(setWidth);
						} else {
							nav.width(nav.data('defWidth'));
						}
						nav.data('width', nav.width());
					});
				});
			}
		}

	});
	
	return this;
};


/*
 * File: /js/ui/overlay.js
 */


$.fn.elfinderoverlay = function(opts) {
	
	var fm = this.parent().elfinder('instance');
	
	this.filter(':not(.elfinder-overlay)').each(function() {
		opts = Object.assign({}, opts);
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

		fm.toFront(o);
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
					if (! f.phash && fm.root(fm.cwd().hash, true) !== f.hash) {
						raw.push({
							label    : fm.escape(f.i18 || f.name),
							icon     : 'home',
							callback : function() { fm.exec('open', f.hash); },
							options  : {
								iconClass : f.csscls || '',
								iconImg   : f.icon   || ''
							}
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
						f = fm.file(hash),
						name = fm.escape(f.i18 || f.name);
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
			.bind('navbarshow navbarhide', function() {
				var wz = fm.getUI('workzone');
				if (this.type === 'navbarshow') {
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
				fm.trigger('uiresize');
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
				var hashes = [], data = {};
				
				hashes = $.map(subtree.children().find('[id]'), function(n) {
					return id2hash(n.id);
				});
				if (hashes.length) {
					$.each(hashes.reverse(), function(i, h) {
						data[h] = dirs[h];
					});
				} else {
					data = null;
				}
				
				fm.storage(key, data);
			},
			/**
			 * Return node for given dir object
			 *
			 * @param  Object  directory object
			 * @return jQuery
			 **/
			create    = function(dir, hash) {
				return $(tpl.replace(/\{id\}/, hash2id(dir? dir.hash : hash))
						.replace(/\{name\}/, fm.escape(dir? dir.i18 || dir.name : hash))
						.replace(/\{cssclass\}/, dir? (fm.perms2class(dir) + (dir.notfound? ' elfinder-na' : '') + (dir.csscls? ' '+dir.csscls : '')) : '')
						.replace(/\{permissions\}/, (dir && (!dir.read || !dir.write || dir.notfound))? ptpl : '')
						.replace(/\{title\}/, (dir && dir.path)? fm.escape(dir.path) : '')
						.replace(/\{symlink\}/, '')
						.replace(/\{style\}/, (dir && dir.icon)? fm.getIconStyle(dir) : ''));
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
				
				dirs[hash] = dir;
				subtree.prepend(node);
				root.addClass(collapsed);
				sortBtn.toggle(subtree.children().length > 1);
				
				return true;
			},
			/**
			 * Remove dir from places
			 *
			 * @param  String  directory hash
			 * @return String  removed name
			 **/
			remove = function(hash) {
				var name = null, tgt, cnt;

				if (dirs[hash]) {
					delete dirs[hash];
					tgt = $('#'+hash2id(hash));
					if (tgt.length) {
						name = tgt.text();
						tgt.parent().remove();
						cnt = subtree.children().length;
						sortBtn.toggle(cnt > 1);
						if (! cnt) {
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
							if ((dir.i18 || dir.name).localeCompare(current.children('.'+navdir).text()) < 0) {
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
			// sort button
			sortBtn = $('<span class="elfinder-button-icon elfinder-button-icon-sort elfinder-places-root-icon" title="'+fm.i18n('cmdsort')+'"/>')
				.hide()
				.on('click', function(e) {
					e.stopPropagation();
					subtree.empty();
					sort();
				}
			),
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
				.append(sortBtn),
			/**
			 * Container for dirs
			 *
			 * @type jQuery
			 **/
			subtree = wrapper.children('.'+fm.res(c, 'navsubtree')),
			
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
					! p.hasClass('elfinder-na') && fm.exec('open', p.attr('id').substr(6));
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

		if ($.fn.sortable) {
			subtree.addClass('touch-punch')
			.sortable({
				appendTo : fm.getUI(),
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
			});
		}

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
			dat = fm.storage(key);
			if (typeof dat === 'string') {
				// old data type elFinder <= 2.1.12
				dat = $.map(dat.split(','), function(hash) { return hash || null;});
				$.each(dat, function(i, d) {
					var dir = d.split('#')
					dirs[dir[0]] = dir[1]? dir[1] : dir[0];
				});
			} else if ($.isPlainObject(dat)) {
				dirs = dat;
			}
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
					
					data.files && fm.cache(data.files);
					
					$.each(data.files, function(i, f) {
						var hash = f.hash;
						exists[hash] = f;
					});
					$.each(dirs, function(h, f) {
						add(exists[h] || Object.assign({notfound: true}, f));
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
			.bind('sync netmount', function() {
				var hashes = Object.keys(dirs),
					ev = this;
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
								if ((f.phash === cwd && ev.type !== 'netmount') || (exists[h] && exists[h].mime !== 'directory')) {
									if (remove(h)) {
										updated = true;
									}
								} else {
									if (update(exists[h] || Object.assign({notfound: true}, f))) {
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
			isopts = cmd.options.incsearch || { enable: false },
			id     = function(name){return fm.namespace + name},
			toolbar= fm.getUI('toolbar'),
			btnCls = fm.res('class', 'searchbtn'),
			button = $(this).hide().addClass('ui-widget-content elfinder-button '+btnCls),
			search = function() {
				input.data('inctm') && clearTimeout(input.data('inctm'));
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
				input.data('inctm') && clearTimeout(input.data('inctm'));
				input.val('').blur();
				if (result || incVal) {
					result = false;
					incVal = '';
					fm.lazy(function() {
						fm.trigger('searchend');
					});
				}
			},
			incVal = '',
			input  = $('<input type="text" size="42"/>')
				.on('focus', function() {
					incVal = '';
					opts && opts.slideDown();
				})
				.on('blur', function(){
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
				.on('keypress', function(e) {
					e.stopPropagation();
				})
				.on('keydown', function(e) {
					e.stopPropagation();
					
					e.keyCode == $.ui.keyCode.ENTER && search();
					
					if (e.keyCode == $.ui.keyCode.ESCAPE) {
						e.preventDefault();
						abort();
					}
				}),
			opts, cwdReady;
		
		if (isopts.enable) {
			isopts.minlen = isopts.minlen || 2;
			isopts.wait = isopts.wait || 500;
			input
				.attr('title', fm.i18n('incSearchOnly'))
				.on('compositionstart', function() {
					input.data('composing', true);
				})
				.on('compositionend', function() {
					input.removeData('composing');
					input.trigger('input'); // for IE, edge
				})
				.on('input', function() {
					if (! input.data('composing')) {
						input.data('inctm') && clearTimeout(input.data('inctm'));
						input.data('inctm', setTimeout(function() {
							var val = input.val();
							if (val.length === 0 || val.length >= isopts.minlen) {
								(incVal !== val) && fm.trigger('incsearchstart', { query: val });
								incVal = val;
								if (val === '' && fm.searchStatus.state > 1 && fm.searchStatus.query) {
									input.val(fm.searchStatus.query).select();
								} 
							}
						}, isopts.wait));
					}
				});
			
			if (fm.UA.ltIE8) {
				input.on('keydown', function(e) {
						if (e.keyCode === 229) {
							input.data('imetm') && clearTimeout(input.data('imetm'));
							input.data('composing', true);
							input.data('imetm', setTimeout(function() {
								input.removeData('composing');
							}, 100));
						}
					})
					.on('keyup', function(e) {
						input.data('imetm') && clearTimeout(input.data('imetm'));
						if (input.data('composing')) {
							e.keyCode === $.ui.keyCode.ENTER && input.trigger('compositionend');
						} else {
							input.trigger('input');
						}
					});
			}
		}
		
		$('<span class="ui-icon ui-icon-search" title="'+cmd.title+'"/>')
			.appendTo(button)
			.click(search);
		
		$('<span class="ui-icon ui-icon-close"/>')
			.appendTo(button)
			.click(abort);
		
		// wait when button will be added to DOM
		fm.bind('toolbarload', function(){
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
			}
		});
		
		fm
			.one('open', function() {
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
					.appendTo(button);
				if (opts) {
					opts.find('div.buttonset').buttonset();
					$('#'+id('SearchFromAll')).next('label').attr('title', fm.i18n('searchTarget', fm.i18n('btnAll')));
					$('#'+id('SearchMime')).next('label').attr('title', fm.i18n('searchMime'));
					opts.on('mousedown', 'div.buttonset', function(e){
							e.stopPropagation();
							opts.data('infocus', true);
						})
						.on('click', 'input', function(e) {
							e.stopPropagation();
							$.trim(input.val()) && search();
						});
				}
			})
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
			.bind('open', function() {
				incVal && abort();
			})
			.bind('cwdinit', function() {
				cwdReady = false;
			})
			.bind('cwdrender',function() {
				cwdReady = true;
			})
			.bind('keydownEsc', function() {
				if (incVal && incVal.substr(0, 1) === '/') {
					incVal = '';
					input.val('');
					fm.trigger('searchend');
				}
			})
			.shortcut({
				pattern     : 'ctrl+f f3',
				description : cmd.title,
				callback    : function() { 
					input.select().focus();
				}
			})
			.shortcut({
				pattern     : 'a b c d e f g h i j k l m n o p q r s t u v w x y z dig0 dig1 dig2 dig3 dig4 dig5 dig6 dig7 dig8 dig9 num0 num1 num2 num3 num4 num5 num6 num7 num8 num9',
				description : fm.i18n('firstLetterSearch'),
				callback    : function(e) { 
					if (! cwdReady) { return; }
					
					var code = e.originalEvent.keyCode,
						next = function() {
							var sel = fm.selected(),
								key = $.ui.keyCode[(!sel.length || $('#'+fm.cwdHash2Id(sel[0])).next('[id]').length)? 'RIGHT' : 'HOME'];
							$(document).trigger($.Event('keydown', { keyCode: key, ctrlKey : false, shiftKey : false, altKey : false, metaKey : false }));
						},
						val;
					if (code >= 96 && code <= 105) {
						code -= 48;
					}
					val = '/' + String.fromCharCode(code);
					if (incVal !== val) {
						input.val(val);
						incVal = val;
						fm
							.trigger('incsearchstart', { query: val })
							.one('cwdrender', next);
					} else{
						next();
					}
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
			text     = $('<span class="elfinder-button-text">'+cmd.title+'</span>'),
			button   = $(this).addClass('ui-state-default elfinder-button elfinder-menubutton elfiner-button-'+name)
				.attr('title', cmd.title)
				.append('<span class="elfinder-button-icon elfinder-button-icon-'+name+'"/>', text)
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
				menu.children('[rel]').removeClass(selected+' '+asc+' '+desc)
					.filter('[rel="'+fm.sortType+'"]')
					.addClass(selected+' '+(fm.sortOrder == 'asc' ? asc : desc));

				menu.children('.elfinder-sort-stick').toggleClass(selected, fm.sortStickFolders);
				menu.children('.elfinder-sort-tree').toggleClass(selected, fm.sortAlsoTreeview);
			},
			hide = function() { menu.hide(); };
			
		text.hide();
		
		$.each(fm.sortRules, function(name, value) {
			menu.append($('<div class="'+item+'" rel="'+name+'"><span class="ui-icon ui-icon-arrowthick-1-n"/><span class="ui-icon ui-icon-arrowthick-1-s"/>'+fm.i18n('sort'+name)+'</div>').data('type', name));
		});
		
		menu.children().click(function(e) {
			var type = $(this).attr('rel');
			
			cmd.exec([], {
				type  : type, 
				order : type == fm.sortType ? fm.sortOrder == 'asc' ? 'desc' : 'asc' : fm.sortOrder, 
				stick : fm.sortStickFolders,
				tree  : fm.sortAlsoTreeview
			});
		});
		
		$('<div class="'+item+' '+item+'-separated elfinder-sort-ext elfinder-sort-stick"><span class="ui-icon ui-icon-check"/>'+fm.i18n('sortFoldersFirst')+'</div>')
			.appendTo(menu)
			.click(function() {
				cmd.exec([], {type : fm.sortType, order : fm.sortOrder, stick : !fm.sortStickFolders, tree : fm.sortAlsoTreeview});
			});

		if ($.fn.elfindertree && $.inArray('tree', fm.options.ui) !== -1) {
			$('<div class="'+item+' '+item+'-separated elfinder-sort-ext elfinder-sort-tree"><span class="ui-icon ui-icon-check"/>'+fm.i18n('sortAlsoTreeview')+'</div>')
				.appendTo(menu)
				.click(function() {
					cmd.exec([], {type : fm.sortType, order : fm.sortOrder, stick : fm.sortStickFolders, tree : !fm.sortAlsoTreeview});
				});
		}
		
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
			setstat    = function(files) {
				var c = 0, 
					s = 0;

				$.each(files, function(i, file) {
					c++;
					s += parseInt(file.size)||0;
				})
				size.html(titleitems+': <span class="elfinder-stat-incsearch"></span>'+c+', '+titlesize+': '+fm.formatSize(s));
			},
			setIncsearchStat = function(data) {
				size.find('span.elfinder-stat-incsearch').html(data? data.hashes.length + ' / ' : '');
			};

		fm.getUI('statusbar').prepend(size).append(sel).show();
		
		fm
		.bind('cwdhasheschange', function(e) {
			setstat($.map(e.data, function(h) { return fm.file(h); }));
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
				if (fm.searchStatus.state === 2) {
					dirs.push('<a href="#elf_'+file.phash+'" data-hash="'+file.hash+'">'+(file.path? file.path.replace(/\/[^\/]*$/, '') : '..')+'</a>');
				}
				dirs.push(fm.escape(file.i18 || file.name));
				sel.html(dirs.join('/') + (s > 0 ? ', '+fm.formatSize(s) : ''));
				
				return;
			}

			$.each(files, function(i, file) {
				c++;
				s += parseInt(file.size)||0;
			});

			sel.html(c ? titlesel+': '+c+', '+titlesize+': '+fm.formatSize(s) : '&nbsp;');
		})
		.bind('incsearch', function(e) {
			setIncsearchStat(e.data);
		})
		.bind('incsearchend', function() {
			setIncsearchStat();
		})
		;
	})
};


/*
 * File: /js/ui/toast.js
 */

/**
 * @class  elFinder toast
 * 
 * This was created inspired by the toastr. Thanks to developers of toastr.
 * CodeSeven/toastr: http://johnpapa.net <https://github.com/CodeSeven/toastr>
 *
 * @author Naoki Sawada
 **/
$.fn.elfindertoast = function(opts, fm) {
	var defOpts = {
		mode: 'success',
		msg: '',
		showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
		showDuration: 300,
		showEasing: 'swing', //swing and linear are built into jQuery
		onShown: undefined,
		hideMethod: 'fadeOut',
		hideDuration: 1500,
		hideEasing: 'swing',
		onHidden: undefined,
		timeOut: 3000,
		extNode: undefined
	};
	return this.each(function() {
		opts = Object.assign({}, defOpts, opts || {});
		
		var self = $(this),
			show = function(notm) {
				self.stop();
				self[opts.showMethod]({
					duration: opts.showDuration,
					easing: opts.showEasing,
					complete: function() {
						opts.onShown && opts.onShown();
						if (!notm && opts.timeOut) {
							rmTm = setTimeout(rm, opts.timeOut);
						}
					}
				});
			},
			rm = function() {
				self[opts.hideMethod]({
					duration: opts.hideDuration,
					easing: opts.hideEasing,
					complete: function() {
						opts.onHidden && opts.onHidden();
						self.remove();
					}
				});
			},
			rmTm;
		
		self.on('click', function(e) {
			e.stopPropagation();
			e.preventDefault();
			self.stop().remove();
		}).on('mouseenter mouseleave', function(e) {
			if (opts.timeOut) {
				rmTm && clearTimeout(rmTm);
				rmTm = null;
				if (e.type === 'mouseenter') {
					show(true);
				} else {
					rmTm = setTimeout(rm, opts.timeOut);
				}
			}
		}).hide().addClass('toast-' + opts.mode).append($('<div class="elfinder-toast-msg"/>').html(opts.msg));
		
		if (opts.extNode) {
			self.append(opts.extNode);
		}
		
		show();
	});
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
				displayTextLabel: false,
				labelExcludeUA: ['Mobile'],
				autoHideUA: ['Mobile']
			},
			filter   = function(opts) {
				return $.map(opts, function(v) {
					if ($.isPlainObject(v)) {
						options = Object.assign(options, v);
						return null;
					}
					return [v];
				});
			},
			render = function(disabled){
				var name;
				
				$.each(buttons, function(i, b) { b.detach(); });
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
								if (! buttons[name] && $.fn[button]) {
									buttons[name] = $('<div/>')[button](cmd);
								}
								if (buttons[name]) {
									textLabel && buttons[name].find('.elfinder-button-text').show();
									panel.prepend(buttons[name]);
								}
							}
						}
						
						panel.children().length && self.prepend(panel);
						panel.children(':gt(0)').before('<span class="ui-widget-content elfinder-toolbar-button-separator"/>');

					}
				}
				
				(! self.data('swipeClose') && self.children().length)? self.show() : self.hide();
				fm.trigger('toolbarload').trigger('uiresize');
			},
			buttons = {},
			panels   = filter(opts || []),
			dispre   = null,
			uiCmdMapPrev = '',
			l, i, cmd, panel, button, swipeHandle, autoHide, textLabel;
		
		// correction of options.displayTextLabel
		textLabel = fm.storage('toolbarTextLabel');
		if (textLabel === null) {
			textLabel = (options.displayTextLabel && (! options.labelExcludeUA || ! options.labelExcludeUA.length || ! $.map(options.labelExcludeUA, function(v){ return fm.UA[v]? true : null; }).length));
		} else {
			textLabel = (textLabel == 1);
		}
		
		// add contextmenu
		self.on('contextmenu', function(e) {
				e.stopPropagation();
				e.preventDefault();
				fm.trigger('contextmenu', {
					raw: [{
						label    : fm.i18n('textLabel'),
						icon     : 'accept',
						callback : function() {
							textLabel = ! textLabel;
							self.height('').find('.elfinder-button-text')[textLabel? 'show':'hide']();
							fm.trigger('uiresize').storage('toolbarTextLabel', textLabel? '1' : '0');
						}
					}],
					x: e.pageX,
					y: e.pageY
				});
			}).on('touchstart', function(e) {
				if (e.originalEvent.touches.length > 1) {
					return;
				}
				self.data('tmlongtap') && clearTimeout(self.data('tmlongtap'));
				self.removeData('longtap')
					.data('longtap', {x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY})
					.data('tmlongtap', setTimeout(function() {
						self.removeData('longtapTm')
							.trigger({
								type: 'contextmenu',
								pageX: self.data('longtap').x,
								pageY: self.data('longtap').y
							})
							.data('longtap', {longtap: true});
					}, 500));
			}).on('touchmove touchend', function(e) {
				if (self.data('tmlongtap')) {
					if (e.type === 'touchend' ||
							( Math.abs(self.data('longtap').x - e.originalEvent.touches[0].pageX)
							+ Math.abs(self.data('longtap').y - e.originalEvent.touches[0].pageY)) > 4)
					clearTimeout(self.data('tmlongtap'));
					self.removeData('longtapTm');
				}
			}).on('click', function(e) {
				if (self.data('longtap') && self.data('longtap').longtap) {
					e.stopImmediatePropagation();
					e.preventDefault();
				}
			}).on('touchend click', '.elfinder-button', function(e) {
				if (self.data('longtap') && self.data('longtap').longtap) {
					e.stopImmediatePropagation();
					e.preventDefault();
				}
			});

		self.prev().length && self.parent().prepend(this);
		
		render();
		
		fm.bind('open sync select', function() {
			var disabled = fm.option('disabled'),
				doRender, sel;
			
			if (this.type === 'select') {
				if (fm.searchStatus.state < 2) {
					return;
				}
				sel = fm.selected();
				if (sel.length) {
					disabled = fm.getDisabledCmds(sel);
				}
			}
			
			if (Object.keys(fm.commandMap).length) {
				$.each(fm.commandMap, function(from, to){
					if (to === 'hidden') {
						disabled.push(from);
					}
				});
			}
			
			if (!dispre || dispre.toString() !== disabled.sort().toString()) {
				render(disabled && disabled.length? disabled : null);
				doRender = true;
			}
			dispre = disabled.concat().sort();

			if (doRender || uiCmdMapPrev !== JSON.stringify(fm.commandMap)) {
				uiCmdMapPrev = JSON.stringify(fm.commandMap);
				if (! doRender) {
					// reset toolbar
					$.each($('div.elfinder-button'), function(){
						var origin = $(this).data('origin');
						if (origin) {
							$(this).after(origin).detach();
						}
					});
				}
				if (Object.keys(fm.commandMap).length) {
					$.each(fm.commandMap, function(from, to){
						var cmd = fm._commands[to],
							button = cmd? 'elfinder'+cmd.options.ui : null,
							btn;
						if (button && $.fn[button]) {
							btn = buttons[from];
							if (btn) {
								if (! buttons[to] && $.fn[button]) {
									buttons[to] = $('<div/>')[button](fm._commands[to]);
									if (buttons[to]) {
										textLabel && buttons[to].find('.elfinder-button-text').show();
										if (cmd.extendsCmd) {
											buttons[to].children('span.elfinder-button-icon').addClass('elfinder-button-icon-' + cmd.extendsCmd)
										};
									}
								}
								if (buttons[to]) {
									btn.after(buttons[to]);
									buttons[to].data('origin', btn.detach());
								}
							}
						}
					});
				}
			}
		});
		
		if (fm.UA.Touch) {
			autoHide = fm.storage('autoHide') || {};
			if (typeof autoHide.toolbar === 'undefined') {
				autoHide.toolbar = (options.autoHideUA && options.autoHideUA.length > 0 && $.map(options.autoHideUA, function(v){ return fm.UA[v]? true : null; }).length);
				fm.storage('autoHide', autoHide);
			}
			
			if (autoHide.toolbar) {
				fm.one('init', function() {
					fm.uiAutoHide.push(function(){ self.stop(true, true).trigger('toggle', { duration: 500, init: true }); });
				});
			}
			
			fm.bind('load', function() {
				swipeHandle = $('<div class="elfinder-toolbar-swipe-handle"/>').hide().appendTo(fm.getUI());
				if (swipeHandle.css('pointer-events') !== 'none') {
					swipeHandle.remove();
					swipeHandle = null;
				}
			});
			
			self.on('toggle', function(e, data) {
				var wz    = fm.getUI('workzone'),
					toshow= self.is(':hidden'),
					wzh   = wz.height(),
					h     = self.height(),
					tbh   = self.outerHeight(true),
					delta = tbh - h,
					opt   = Object.assign({
						step: function(now) {
							wz.height(wzh + (toshow? (now + delta) * -1 : h - now));
							fm.trigger('resize');
						},
						always: function() {
							self.css('height', '');
							fm.trigger('uiresize');
							if (swipeHandle) {
								if (toshow) {
									swipeHandle.stop(true, true).hide();
								} else {
									swipeHandle.height(data.handleH? data.handleH : '');
									fm.resources.blink(swipeHandle, 'slowonce');
								}
							}
							data.init && fm.trigger('uiautohide');
						}
					}, data);
				self.data('swipeClose', ! toshow).stop(true, true).animate({height : 'toggle'}, opt);
				autoHide.toolbar = !toshow;
				fm.storage('autoHide', Object.assign(fm.storage('autoHide'), {toolbar: autoHide.toolbar}));
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
			 * Auto loading current directory parents and do expand their node
			 *
			 * @type Boolean
			 */
			syncTree  = openCwd || opts.syncTree,
			
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
			 * Class name to mark need subdirs request
			 *
			 * @type String
			 */
			chksubdir = 'elfinder-subtree-chksubdir',
			
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
			 * root wrapper class
			 * 
			 * @type String
			 */
			wrapperRoot = 'elfinder-navbar-wrapper-root',

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
			
			/**
			 * Is position x inside Navbar
			 * 
			 * @param x Numbar
			 * 
			 * @return
			 */
			insideNavbar = function(x) {
				var left = navbar.offset().left;
					
				return left <= x && x <= left + navbar.width();
			},
			
			/**
			 * To call subdirs elements queue
			 * 
			 * @type Object
			 */
			subdirsQue = {},
			
			/**
			 * To exec subdirs elements ids
			 * 
			 */
			subdirsExecQue = [],
			
			/**
			 * Request subdirs to backend
			 * 
			 * @param id String
			 * 
			 * @return Deferred
			 */
			subdirs = function(ids) {
				var targets = [];
				$.each(ids, function(i, id) {
					subdirsQue[id] && targets.push(fm.navId2Hash(id));
					delete subdirsQue[id];
				});
				if (targets.length) {
					return fm.request({
						data: {
							cmd: 'subdirs',
							targets: targets,
							preventDefault : true
						}
					}).done(function(res) {
						if (res && res.subdirs) {
							$.each(res.subdirs, function(hash, subdirs) {
								var elm = $('#'+fm.navHash2Id(hash));
								elm.removeClass(chksubdir);
								elm[subdirs? 'addClass' : 'removeClass'](collapsed);
							});
						}
					});
				}
			},
			
			subdirsJobRes = null,
			
			/**
			 * To check target element is in window of subdirs
			 * 
			 * @return void
			 */
			checkSubdirs = function() {
				var ids = Object.keys(subdirsQue);
				if (ids.length) {
					subdirsJobRes && subdirsJobRes._abort();
					execSubdirsTm && clearTimeout(execSubdirsTm);
					subdirsExecQue = [];
					subdirsJobRes = fm.asyncJob(function(id) {
						return fm.isInWindow($('#'+id))? id : null;
					}, ids, { numPerOnce: 200 })
					.done(function(arr) {
						if (arr.length) {
							subdirsExecQue = arr;
							execSubdirs();
						}
					});
				}
			},
			
			subdirsPending = 0,
			execSubdirsTm,
			
			/**
			 * Exec subdirs as batch request
			 * 
			 * @return void
			 */
			execSubdirs = function() {
				var cnt = opts.subdirsMaxConn - subdirsPending,
					i, ids;
				execSubdirsTm && clearTimeout(execSubdirsTm);
				if (subdirsExecQue.length) {
					if (cnt > 0) {
						for (i = 0; i < cnt; i++) {
							if (subdirsExecQue.length) {
								subdirsPending++;
								subdirs(subdirsExecQue.splice(0, opts.subdirsAtOnce)).always(function() {
									subdirsPending--;
									execSubdirs();
								});
							}
						}
					} else {
						execSubdirsTm = setTimeout(function() {
							subdirsExecQue.length && execSubdirs();
						}, 50);
					}
				}
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
					dst.addClass(hover);
					if (dst.is('.'+collapsed+':not(.'+expanded+')')) {
						dst.data('expandTimer', setTimeout(function() {
							dst.is('.'+collapsed+'.'+hover) && dst.children('.'+arrow).click();
						}, 500));
					}
					if (dst.is('.elfinder-ro,.elfinder-na')) {
						dst.removeClass(dropover);
						helper.removeClass('elfinder-drag-helper-move elfinder-drag-helper-plus');
						return;
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
			 * Directory hashes that has more pages
			 * 
			 * @type Object
			 */
			hasMoreDirs = {},
			
			/**
			 * Html template replacement methods
			 *
			 * @type Object
			 */
			replace = {
				id          : function(dir) { return fm.navHash2Id(dir.hash) },
				cssclass    : function(dir) {
					var cname = (dir.phash && ! dir.isroot ? '' : root)+' '+navdir+' '+fm.perms2class(dir);
					dir.dirs && !dir.link && (cname += ' ' + collapsed) && dir.dirs == -1 && (cname += ' ' + chksubdir);
					opts.getClass && (cname += ' ' + opts.getClass(dir));
					dir.csscls && (cname += ' ' + fm.escape(dir.csscls));
					return cname;
				},
				root        : function(dir) {
					var cls = '';
					if (!dir.phash || dir.isroot) {
						cls += ' '+wrapperRoot;
						if (!dir.disabled || dir.disabled.length < 1) {
							cls += ' '+pastable+' '+uploadable;
						} else {
							if ($.inArray('paste', dir.disabled) === -1) {
								cls += ' '+pastable;
							}
							if ($.inArray('upload', dir.disabled) === -1) {
								cls += ' '+uploadable;
							}
						}
						return cls;
					} else {
						return '';
					}
				},
				permissions : function(dir) { return !dir.read || !dir.write ? ptpl : ''; },
				symlink     : function(dir) { return dir.alias ? stpl : ''; },
				style       : function(dir) { return dir.icon ? fm.getIconStyle(dir) : ''; }
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
					var res = dir[key] || (replace[key] ? replace[key](dir) : '');
					if (key === 'id' && dir.dirs == -1) {
						subdirsQue[res] = res;
					}
					return res;
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
					info;

				while (node.length) {
					info = fm.file(fm.navId2Hash(node.children('[id]').attr('id')));
					
					if ((info = fm.file(fm.navId2Hash(node.children('[id]').attr('id')))) 
					&& compare(dir, info) < 0) {
						return node;
					}
					node = node.next();
				}
				return subtree.children('button.elfinder-navbar-pager-next');
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
					i = length,
					tgts = $(),
					done = {},
					cwd = fm.cwd(),
					append = function(parent, dirs, start, direction) {
						var hashes = {},
							curStart = 0,
							max = fm.newAPI? Math.min(10000, Math.max(10, opts.subTreeMax)) : 10000,
							setHashes = function() {
								hashes = {};
								$.each(dirs, function(i, d) {
									hashes[d.hash] = i;
								});
							},
							change = function(mode) {
								if (mode === 'prepare') {
									$.each(dirs, function(i, d) {
										d.node && parent.append(d.node.hide());
									});
								} else if (mode === 'done') {
									$.each(dirs, function(i, d) {
										d.node && d.node.detach().show();
									});
								}
							},
							update = function(e, data) {
								var i, changed;
								e.stopPropagation();
								
								if (data.select) {
									render(getStart(data.select));
									return;
								}
								
								if (data.change) {
									change(data.change);
									return;
								}
								
								if (data.removed && data.removed.length) {
									dirs = $.map(dirs, function(d) {
										if (data.removed.indexOf(d.hash) === -1) {
											return d;
										} else {
											changed = true;
											return null;
										}
									});
								}
								
								if (data.added && data.added.length) {
									dirs = dirs.concat($.map(data.added, function(d) {
										if (hashes[d.hash] === void(0)) {
											changed = true;
											return d;
										} else {
											return null;
										}
									}));
								}
								if (changed) {
									dirs.sort(compare);
									setHashes();
									render(curStart);
								}
							},
							getStart = function(target) {
								if (hashes[target] !== void(0)) {
									return Math.floor(hashes[target] / max) * max;
								}
								return void(0);
							},
							target = fm.navId2Hash(parent.prev('[id]').attr('id')),
							render = function(start, direction) {
								var html = [],
									nodes = {},
									total, page, s, parts, prev, next, prevBtn, nextBtn;
								delete hasMoreDirs[target];
								curStart = start;
								parent.off('update.'+fm.namespace, update);
								if (dirs.length > max) {
									parent.on('update.'+fm.namespace, update);
									if (start === void(0)) {
										s = 0;
										setHashes();
										start = getStart(cwd.hash);
										if (start === void(0)) {
											start = 0;
										}
									}
									parts = dirs.slice(start, start + max);
									hasMoreDirs[target] = parent;
									prev = start? Math.max(-1, start - max) : -1;
									next = (start + max >= dirs.length)? 0 : start + max;
									total = Math.ceil(dirs.length/max);
									page = Math.ceil(start/max);
								}
								$.each(parts || dirs, function(i, d) {
									html.push(itemhtml(d));
									if (d.node) {
										nodes[d.hash] = d.node;
									}
								});
								if (prev > -1) {
									prevBtn = $('<button class="elfinder-navbar-pager elfinder-navbar-pager-prev"/>')
										.text(fm.i18n('btnPrevious', page, total))
										.button({
											icons: {
												primary: "ui-icon-caret-1-n"
											}
										})
										.on('click', function(e) {
											e.preventDefault();
											e.stopPropagation();
											render(prev, 'up');
										});
								} else {
									prevBtn = $();
								}
								if (next) {
									nextBtn = $('<button class="elfinder-navbar-pager elfinder-navbar-pager-next"/>')
										.text(fm.i18n('btnNext', page + 2, total))
										.button({
											icons: {
												primary: "ui-icon-caret-1-s"
											}
										})
										.on('click', function(e) {
											e.preventDefault();
											e.stopPropagation();
											render(next, 'down');
										});
								} else {
									nextBtn = $();
								}
								detach();
								parent.empty()[parts? 'addClass' : 'removeClass']('elfinder-navbar-hasmore').append(prevBtn, html.join(''), nextBtn);
								$.each(nodes, function(h, n) {
									$('#'+fm.navHash2Id(h)).parent().replaceWith(n);
								});
								if (direction) {
									autoScroll(fm.navHash2Id(parts[direction === 'up'? parts.length - 1 : 0].hash));
								}
								! mobile && fm.lazy(function() { updateDroppable(null, parent); });
							},
							detach = function() {
								$.each(parent.children('.elfinder-navbar-wrapper'), function(i, n) {
									var n = $(n),
										ch = n.children('[id]:first'),
										h, c;
									if (ch.hasClass(loaded)) {
										h = fm.navId2Hash(ch.attr('id'));
										if (h && (c = hashes[h]) !== void(0)) {
											dirs[c].node = n.detach();
										}
									}
								});
							};
						
						render();
					},
					dir, html, parent, sibling, init, atonce = {}, updates = [], base, node,
					firstVol = true; // check for netmount volume
				
				while (i--) {
					dir = dirs[i];

					if (done[dir.hash] || $('#'+fm.navHash2Id(dir.hash)).length) {
						continue;
					}
					done[dir.hash] = true;
					
					if ((parent = findSubtree(dir.phash)).length) {
						if (dir.phash && ((init = !parent.children().length) || parent.hasClass('elfinder-navbar-hasmore') || (sibling = findSibling(parent, dir)).length)) {
							if (init) {
								if (!atonce[dir.phash]) {
									atonce[dir.phash] = [];
								}
								atonce[dir.phash].push(dir);
							} else {
								if (sibling) {
									node = itemhtml(dir);
									sibling.before(node);
									! mobile && (tgts = tgts.add(node));
								} else {
									updates.push(dir);
								}
							}
						} else {
							node = itemhtml(dir);
							parent[firstVol || dir.phash ? 'append' : 'prepend'](node);
							firstVol = false;
							if (!dir.phash || dir.isroot) {
								base = $('#'+fm.navHash2Id(dir.hash)).parent();
							}
							! mobile && updateDroppable(null, base);
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
						append(parent, dirs);
					});
				}
				
				if (updates.length) {
					parent.trigger('update.' + fm.namespace, { added : updates });
				}
				
				if (orphans.length && orphans.length < length) {
					updateTree(orphans);
					return;
				} 
				
				! mobile && tgts.length && fm.lazy(function() { updateDroppable(tgts); });
				
			},
			
			/**
			 * sort function by dir.name
			 * 
			 */
			compare = function(dir1, dir2) {
				if (! fm.sortAlsoTreeview) {
					return fm.sortRules.name(dir1, dir2);
				} else {
					var asc   = fm.sortOrder == 'asc',
						type  = fm.sortType,
						rules = fm.sortRules,
						res;
					
					res = asc? rules[fm.sortType](dir1, dir2) : rules[fm.sortType](dir2, dir1);
					
					return type !== 'name' && res === 0
						? res = asc ? rules.name(dir1, dir2) : rules.name(dir2, dir1)
						: res;
				}
			},

			/**
			 * Auto scroll to cwd
			 *
			 * @return void
			 */
			autoScroll = function(target) {
				var self = $(this),
					dfrd = $.Deferred(),
					current, parent, top, treeH, bottom, tgtTop;
				self.data('autoScrTm') && clearTimeout(self.data('autoScrTm'));
				self.data('autoScrTm', setTimeout(function() {
					current = $('#'+(target || fm.navHash2Id(fm.cwd().hash)));
					
					if (current.length) {
						// expand parents directory
						(openCwd? current : current.parent()).parents('.elfinder-navbar-wrapper').children('.'+loaded).addClass(expanded).next('.'+subtree).show();
						
						parent = tree.parent().stop(false, true);
						top = parent.offset().top;
						treeH = parent.height();
						bottom = top + treeH - current.outerHeight();
						tgtTop = current.offset().top;
						
						if (tgtTop < top || tgtTop > bottom) {
							parent.animate({
								scrollTop : parent.scrollTop() + tgtTop - top - treeH / 3
							}, {
								duration : 'fast',
								complete : function() {	dfrd.resolve(); }
							});
						} else {
							dfrd.resolve();
						}
					} else {
						dfrd.reject();
					}
				}, 100));
				return dfrd;
			},
			/**
			 * Get hashes array of items of the bottom of the leaf root back from the target
			 * 
			 * @param Object elFinder item(directory) object
			 * @return Array hashes
			 */
			getEnds = function(dir) {
				var cur = dir || fm.cwd(),
					res = [ cur.hash ],
					phash, root, dir;
				
				root = fm.root(cur.hash);
				dir = fm.file(root);
				while (phash = dir.phash) {
					res.unshift(phash);
					root = fm.root(phash);
					dir = fm.file(root);
					if ($('#'+fm.navHash2Id(dir.hash)).hasClass(loaded)) {
						break;
					}
				}
				
				return res;
			},
			
			/**
			 * Select pages back in order to display the target
			 * 
			 * @param Object elFinder item(directory) object
			 * @return Object jQuery node object of target node
			 */
			selectPages = function(cur) {
				var cur = cur || fm.cwd(),
					curHash = cur.hash,
					node = $('#'+fm.navHash2Id(curHash));
			
				if (!node.length) {
					while(cur && cur.phash) {
						if (hasMoreDirs[cur.phash] && !$('#'+fm.navHash2Id(cur.hash)).length) {
							hasMoreDirs[cur.phash].trigger('update.'+fm.namespace, { select : cur.hash });
						}
						cur = fm.file(cur.phash);
					}
					node = $('#'+fm.navHash2Id(curHash));
				}
				
				return node;
			},
			
			/**
			 * Mark current directory as active
			 * If current directory is not in tree - load it and its parents
			 *
			 * @param Array directory objects of cwd
			 * @param Boolean do auto scroll
			 * @return Object jQuery Deferred
			 */
			sync = function(cwdDirs, autoScr) {
				var cwd     = fm.cwd(),
					cwdhash = cwd.hash,
					autoScr = autoScr === void(0)? syncTree : autoScr,
					loadParents = function(dir) {
						var dfd  = $.Deferred(),
							reqs = [],
							ends = getEnds(dir),
							makeReq = function(cmd, h, until) {
								var data = {
										cmd    : cmd,
										target : h
									};
								if (until) {
									data.until = until;
								}
								return fm.request({
									data : data,
									preventFail : true
								});
							},
							baseHash, baseId;
						
						reqs = $.map(ends, function(h) {
							var d = fm.file(h),
								isRoot = d? fm.isRoot(d) : false,
								node = $('#'+fm.navHash2Id(h)),
								getPhash = function(h, depth) {
									var d, ph,
										depth = depth || 1;
									ph = (d = fm.file(h))? d.phash : false;
									if (ph && depth > 1) {
										return getPhash(ph, --depth);
									}
									return ph;
								},
								until,
								closest = (function() {
									var phash = getPhash(h);
									until = phash;
									while (phash) {
										if ($('#'+fm.navHash2Id(phash)).hasClass(loaded)) {
											break;
										}
										until = phash;
										phash = getPhash(phash);
									}
									if (!phash) {
										until = void(0);
										phash = fm.root(h);
									}
									return phash;
								})(),
								cmd;
							
							if (!node.hasClass(loaded) && (isRoot || !d || !$('#'+fm.navHash2Id(d.phash)).hasClass(loaded))) {
								if (isRoot || closest === getPhash(h) || closest === getPhash(h, 2)) {
									until = void(0);
									cmd = 'tree';
									if (!isRoot) {
										h = getPhash(h);
									}
								} else {
									cmd = 'parents';
								}
								if (!baseHash) {
									baseHash = (cmd === 'tree')? h : closest;
								}
								return makeReq(cmd, h, until);
							}
							return null;
						});
						
						if (reqs.length) {
							selectPages(fm.file(baseHash));
							baseId = fm.navHash2Id(baseHash);
							autoScr && autoScroll(baseId);
							baseNode = $('#'+baseId);
							spinner = $(fm.res('tpl', 'navspinner')).insertBefore(baseNode.children('.'+arrow));
							baseNode.removeClass(collapsed);
							
							$.when.apply($, reqs)
							.done(function() {
								var res = {},data, treeDirs, dirs, argLen, i;
								argLen = arguments.length;
								if (argLen > 0) {
									for (i = 0; i < argLen; i++) {
										data = arguments[i].tree || [];
										res[ends[i]] = Object.assign([], filter(data));
									}
								}
								dfd.resolve(res);
							})
							.fail(function() {
								dfd.reject();
							});
							
							return dfd;
						} else {
							return dfd.resolve();
						}
					},
					done= function(res, dfrd) {
						var open = function() {
								checkSubdirs();
								if (openRoot && baseNode) {
									findSubtree(baseNode.hash).show().prev(selNavdir).addClass(expanded);
									openRoot = false;
								}
								autoScr && autoScroll();
							},
							current;
						
						if (res) {
							$.each(res, function(endHash, dirs) {
								dirs && updateTree(dirs);
								selectPages(fm.file(endHash));
								dirs && updateArrows(dirs, loaded);
							});
						}
						
						if (cwdDirs) {
							(fm.api < 2.1) && cwdDirs.push(cwd);
							updateTree(cwdDirs);
						}
						
						// set current node
						current = selectPages();
						
						if (!current.hasClass(active)) {
							tree.find(selNavdir+'.'+active).removeClass(active);
							current.addClass(active);
						}
						
						// mark as loaded to cwd parents
						current.parents('.elfinder-navbar-wrapper').children('.'+navdir).addClass(loaded);
						
						if (res) {
							fm.lazy(open).done(function() {
								dfrd.resolve();
							});
						} else {
							open();
							dfrd.resolve();
						}
					},
					rmSpinner = function(fail) {
						if (baseNode) {
							spinner.remove();
							baseNode.addClass(collapsed + (fail? '' : (' ' + loaded)));
						}
					},
					dfrd = $.Deferred(),
					baseNode, spinner;
				
				if (!$('#'+fm.navHash2Id(cwdhash)).length) {
					loadParents()
					.done(function(res) {
						done(res, dfrd);
						rmSpinner();
					})
					.fail(function() { 
						rmSpinner(true);
						dfrd.reject();
					});
				} else {
					done(void(0), dfrd);
				}
					
				return dfrd;
			},
			
			/**
			 * Make writable and not root dirs droppable
			 *
			 * @return void
			 */
			updateDroppable = function(target, node) {
				var limit = 100,
					next;
				
				if (!target) {
					if (!node || node.closest('div.'+wrapperRoot).hasClass(uploadable)) {
						(node || tree.find('div.'+uploadable)).find(selNavdir+':not(.elfinder-ro,.elfinder-na)').addClass('native-droppable');
					}
					if (!node || node.closest('div.'+wrapperRoot).hasClass(pastable)) {
						target = (node || tree.find('div.'+pastable)).find(selNavdir+':not(.'+droppable+')');
					} else {
						target = $();
					}
					if (node) {
						// check leaf roots
						node.children('div.'+wrapperRoot).each(function() {
							updateDroppable(null, $(this));
						});
					}
				}
				
				// make droppable on async
				if (target.length) {
					fm.asyncJob(function(elm) {
						$(elm).droppable(droppableopts);
					}, $.makeArray(target), {
						interval : 20,
						numPerOnce : 100
					});
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
				
				$.each(dirs, function(i, dir) {
					$('#'+fm.navHash2Id(dir.phash)+sel)
						.filter(function() { return $.map($(this).next('.'+subtree).children(), function(n) {
							return ($(n).children().hasClass(root))? null : n;
						}).length > 0 })
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
					var enter = (e.type === 'mouseenter');
					if (enter && scrolling) { return; }
					var link  = $(this); 
					
					if (!link.hasClass(dropover+' '+disabled)) {
						if (!mobile && enter && !link.data('dragRegisted') && !link.hasClass(root+' '+draggable+' elfinder-na elfinder-wo')) {
							link.data('dragRegisted', true);
							if (fm.isCommandEnabled('copy', fm.navId2Hash(link.attr('id')))) {
								link.draggable(fm.draggable);
							}
						}
						link.toggleClass(hover, enter);
					}
				})
				// native drag enter
				.on('dragenter', selNavdir, function(e) {
					if (e.originalEvent.dataTransfer) {
						var dst = $(this);
						dst.addClass(hover);
						if (dst.is('.'+collapsed+':not(.'+expanded+')')) {
							dst.data('expandTimer', setTimeout(function() {
								dst.is('.'+collapsed+'.'+hover) && dst.children('.'+arrow).click();
							}, 500));
						}
					}
				})
				// native drag leave
				.on('dragleave', selNavdir, function(e) {
					if (e.originalEvent.dataTransfer) {
						var dst = $(this);
						dst.data('expandTimer') && clearTimeout(dst.data('expandTimer'));
						dst.removeClass(hover);
					}
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
					
					if (hash != fm.cwd().hash && !link.hasClass(disabled)) {
						fm.exec('open', hash).done(function() {
							fm.select({selected: [hash], origin: 'tree'});
						});
					} else {
						if (link.hasClass(collapsed)) {
							link.children('.'+arrow).click();
						}
						fm.select({selected: [hash], origin: 'tree'});
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
						dfrd  = $.Deferred(),
						slideTH = 30, cnt;

					e.stopPropagation();

					if (link.hasClass(loaded)) {
						link.toggleClass(expanded);
						fm.lazy(function() {
							cnt = link.hasClass(expanded)? stree.children().length + stree.find('div.elfinder-navbar-subtree[style*=block]').children().length : stree.find('div:visible').length;
							if (cnt > slideTH) {
								stree.toggle();
								fm.draggingUiHelper && fm.draggingUiHelper.data('refreshPositions', 1);
								checkSubdirs();
							} else {
								stree.stop(true, true).slideToggle('normal', function(){
									fm.draggingUiHelper && fm.draggingUiHelper.data('refreshPositions', 1);
									checkSubdirs();
								});
							}
						}).always(function() {
							dfrd.resolve();
						});
					} else {
						spinner.insertBefore(arrow);
						link.removeClass(collapsed);

						fm.request({cmd : 'tree', target : fm.navId2Hash(link.attr('id'))})
							.done(function(data) { 
								updateTree(Object.assign([], filter(data.tree))); 
								
								if (stree.children().length) {
									link.addClass(collapsed+' '+expanded);
									if (stree.children().length > slideTH) {
										stree.show();
										fm.draggingUiHelper && fm.draggingUiHelper.data('refreshPositions', 1);
										checkSubdirs();
									} else {
										stree.stop(true, true).slideDown('normal', function(){
											fm.draggingUiHelper && fm.draggingUiHelper.data('refreshPositions', 1);
											checkSubdirs();
										});
									}
								} 
							})
							.always(function(data) {
								spinner.remove();
								link.addClass(loaded);
								fm.one('treedone', function() {
									dfrd.resolve();
								});
							});
					}
					arrow.data('dfrd', dfrd);
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
					var self = $(this);
					autoScroll(self.attr('id')).done(function() {
						fm.resources.blink(self, 'lookme');
					});
				})
				// prepend fake dir
				.on('create.'+fm.namespace, function(e, item) {
					var pdir = findSubtree(item.phash),
						lock = item.move || false,
						dir  = $(itemhtml(item)).addClass('elfinder-navbar-wrapper-tmp'),
						selected = fm.selected();
						
					lock && selected.length && fm.trigger('lockfiles', {files: selected});
					pdir.prepend(dir);
				}),
			scrolling = false,
			navbarScrTm,
			// move tree into navbar
			navbar = fm.getUI('navbar').append(tree).show().on('scroll', function() {
				scrolling = true;
				navbarScrTm && clearTimeout(navbarScrTm);
				navbarScrTm = setTimeout(function() {
					scrolling = false;
					checkSubdirs();
				}, 50);
			}),
			
			prevSortTreeview = fm.sortAlsoTreeview;
			
		fm.open(function(e) {
			var data = e.data,
				dirs = filter(data.files),
				contextmenu = fm.getUI('contextmenu');

			data.init && tree.empty();

			if (fm.UA.iOS) {
				navbar.removeClass('overflow-scrolling-touch').addClass('overflow-scrolling-touch');
			}

			if (dirs.length) {
				fm.lazy(function() {
					if (!contextmenu.data('cmdMaps')) {
						contextmenu.data('cmdMaps', {});
					}
					updateTree(dirs);
					updateArrows(dirs, loaded);
					sync(dirs);
				});
			} else {
				sync();
			}
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
				tgts = $(),
				changed = {},
				dir, phash, node, tmp, realParent, reqParent, realSibling, reqSibling, isExpanded, isLoaded, parent, subdirs;
			
			$.each(hasMoreDirs, function(h, node) {
				node.trigger('update.'+fm.namespace, { change: 'prepare' });
			});
			
			while (l--) {
				dir = dirs[l];
				phash = dir.phash;
				if ((node = $('#'+fm.navHash2Id(dir.hash))).length) {
					parent = node.parent();
					if (phash) {
						realParent  = node.closest('.'+subtree);
						reqParent   = findSubtree(phash);
						realSibling = node.parent().next();
						reqSibling  = findSibling(reqParent, dir);
						
						if (!reqParent.length) {
							continue;
						}
						
						if (reqParent[0] !== realParent[0] || realSibling.get(0) !== reqSibling.get(0)) {
							reqSibling.length ? reqSibling.before(parent) : reqParent.append(parent);
						}
					}
					isExpanded = node.hasClass(expanded);
					isLoaded   = node.hasClass(loaded);
					tmp        = $(itemhtml(dir));
					node.replaceWith(tmp.children(selNavdir));
					! mobile && updateDroppable(null, parent);
					
					if (dir.dirs
					&& (isExpanded || isLoaded) 
					&& (node = $('#'+fm.navHash2Id(dir.hash))) 
					&& node.next('.'+subtree).children().length) {
						isExpanded && node.addClass(expanded);
						isLoaded && node.addClass(loaded);
					}
					
					subdirs |= dir.dirs == -1;
				}
			}
			
			// to check subdirs
			if (subdirs) {
				checkSubdirs();
			}
			
			$.each(hasMoreDirs, function(h, node) {
				node.trigger('update.'+fm.namespace, { change: 'done' });
			});
			
			sync(void(0), false);
		})
		// remove dirs
		.remove(function(e) {
			var dirs = e.data.removed,
				l    = dirs.length,
				node, stree;
			
			$.each(hasMoreDirs, function(h, node) {
				node.trigger('update.'+fm.namespace, { removed : dirs });
				node.trigger('update.'+fm.namespace, { change: 'prepare' });
			});

			while (l--) {
				if ((node = $('#'+fm.navHash2Id(dirs[l]))).length) {
					stree = node.closest('.'+subtree);
					node.parent().detach();
					if (!stree.children().length) {
						stree.hide().prev(selNavdir).removeClass(collapsed+' '+expanded+' '+loaded);
					}
				}
			}
			
			$.each(hasMoreDirs, function(h, node) {
				node.trigger('update.'+fm.namespace, { change: 'done' });
			});
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
		})
		.bind('sortchange', function() {
			if (fm.sortAlsoTreeview || prevSortTreeview !== fm.sortAlsoTreeview) {
				var dirs,
					ends = [],
					endsMap = {},
					endsVid = {},
					topVid = '',
					single = false,
					current;
				
				fm.lazy(function() {
					dirs = filter(fm.files());
					prevSortTreeview = fm.sortAlsoTreeview;
					
					tree.empty();
					
					// append volume roots at first
					updateTree($.map(fm.roots, function(h) {
						var dir = fm.file(h);
						return dir && fm.isRoot(dir)? dir : null;
					}));
					
					if (!Object.keys(hasMoreDirs).length) {
						updateTree(dirs);
						current = selectPages();
						updateArrows(dirs, loaded);
					} else {
						ends = getEnds();
						if (ends.length > 1) {
							$.each(ends, function(i, end) {
								var vid = fm.file(fm.root(end)).volumeid; 
								if (i === 0) {
									topVid = vid;
								}
								endsVid[vid] = end;
								endsMap[end] = [];
							});
							$.each(dirs, function(i, d) {
								if (!d.volumeid) {
									single = true;
									return false;
								}
								endsMap[endsVid[d.volumeid] || endsVid[topVid]].push(d);
							});
						} else {
							single = true;
						}
						if (single) {
							$.each(ends, function(i, endHash) {
								updateTree(dirs);
								current = selectPages(fm.file(endHash));
								updateArrows(dirs, loaded);
							});
						} else {
							$.each(endsMap, function(endHash, dirs) {
								updateTree(dirs);
								current = selectPages(fm.file(endHash));
								updateArrows(dirs, loaded);
							});
						}
					}
					
					sync();
				}, 100);
			}
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
			cmd.className = icons? 'view-list' : '';
			cmd.title = cmd.fm.i18n(icons ? 'viewlist' : 'viewicons');
			button.attr('title', cmd.title);
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
			prevH  = Math.round(wz.height()),
			parent = wz.parent(),
			fitsize = function() {
				var height = parent.height() - wdelta,
					style  = parent.attr('style'),
					curH   = Math.round(wz.height());
	
				parent.css('overflow', 'hidden')
					.children(':visible:not(.'+cl+')').each(function() {
						var ch = $(this);
		
						if (ch.css('position') != 'absolute' && ch.css('position') != 'fixed') {
							height -= ch.outerHeight(true);
						}
					});
				parent.attr('style', style || '');
				
				height = Math.max(0, Math.round(height));
				if (prevH !== height || curH !== height) {
					prevH  = Math.round(wz.height());
					wz.height(height);
					fm.trigger('wzresize');
				}
			};
			
		parent.add(window).on('resize.' + fm.namespace, fitsize);
		fm.one('cssloaded', function() {
			wdelta = wz.outerHeight(true) - wz.height();
			fitsize();
		}).bind('uiresize', fitsize);
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
			chk = (cnt && ! fm.isRoot(sel[0]) && (fm.file(sel[0].phash) || {}).write && ! $.map(sel, function(f){ return f.read ? null : true }).length),
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

		if (! (cnt && mimes.length && $.inArray(mime, mimes) !== -1)) {
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
			open = fm.exec('open', cwd.hash).done(function() {
				fm.one('cwdrender', function() {
					fm.selectfiles({files : hashes});
					dfrd = $.proxy(fm.res('mixin', 'make'), self)();
				});
			});
		} else {
			fm.selectfiles({files : hashes});
			dfrd = $.proxy(fm.res('mixin', 'make'), self)();
		}
		
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
(elFinder.prototype.commands.back = function() {
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

}).prototype = { forceLoad : true }; // this is required command


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
		return this.checkstate(this.files(sel)) ? 0 : -1;
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
			if (c == $.ui.keyCode.ENTER) {
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
 * File: /js/commands/colwidth.js
 */

/**
 * @class  elFinder command "colwidth"
 * CWD list table columns width to auto
 *
 * @author Naoki Sawada
 **/
elFinder.prototype.commands.colwidth = function() {
	this.alwaysEnabled = true;
	this.updateOnSelect = false;
	
	this.getstate = function() {
		return this.fm.getUI('cwd').find('table').css('table-layout') === 'fixed' ? 0 : -1;
	}
	
	this.exec = function() {
		this.fm.getUI('cwd').trigger('colwidth');
	}
	
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

		return cnt && $.map(sel, function(f) { return f.read ? f : null  }).length == cnt ? 0 : -1;
	}
	
	this.exec = function(hashes) {
		var fm   = this.fm,
			dfrd = $.Deferred()
				.fail(function(error) {
					fm.error(error);
				});

		$.each(this.files(hashes), function(i, file) {
			if (! file.read) {
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
	var fm = this.fm;
	
	this.shortcuts = [{
		pattern     : 'ctrl+x shift+insert'
	}];
	
	this.getstate = function(sel) {
		var sel = this.files(sel),
			cnt = sel.length;
		
		return cnt && $.map(sel, function(f) { return f.read && ! f.locked && ! fm.isRoot(f) ? f : null  }).length == cnt ? 0 : -1;
	}
	
	this.exec = function(hashes) {
		var dfrd = $.Deferred()
				.fail(function(error) {
					fm.error(error);
				});

		$.each(this.files(hashes), function(i, file) {
			if (!(file.read && ! file.locked && ! fm.isRoot(file)) ) {
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
		czipdl = null,
		zipOn  = false,
		mixed  = false,
		filter = function(hashes, inExec) {
			var volumeid, mixedCmd;
			
			if (czipdl !== null) {
				if (fm.searchStatus.state > 1) {
					mixed = fm.searchStatus.mixed;
				} else if (fm.leafRoots[fm.cwd().hash]) {
					volumeid = fm.cwd().volumeid;
					$.each(hashes, function(i, h) {
						if (h.indexOf(volumeid) !== 0) {
							mixed = true;
							return false;
						}
					});
				}
				zipOn = (fm.isCommandEnabled('zipdl', hashes[0]));
			}

			if (mixed) {
				mixedCmd = czipdl? 'zipdl' : 'download';
				hashes = $.map(hashes, function(h) {
					var f = fm.file(h),
						res = (! f || (! czipdl && f.mime === 'directory') || ! fm.isCommandEnabled(mixedCmd, h))? null : h;
					if (f && inExec && ! res) {
						$('#' + fm.cwdHash2Id(f.hash)).trigger('unselect');
					}
					return res;
				});
				if (! hashes.length) {
					return [];
				}
			} else {
				if (!fm.isCommandEnabled('download', hashes[0])) {
					return [];
				}
			}
			
			return $.map(self.files(hashes), function(f) { 
				var res = (! f.read || (! zipOn && f.mime == 'directory')) ? null : f;
				if (inExec && ! res) {
					$('#' + fm.cwdHash2Id(f.hash)).trigger('unselect');
				}
				return res;
			});
		};
	
	this.linkedCmds = ['zipdl'];
	
	this.shortcuts = [{
		pattern     : 'shift+enter'
	}];
	
	this.getstate = function(sel) {
		var sel    = this.hashes(sel),
			cnt    = sel.length,
			maxReq = this.options.maxRequests || 10,
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
							e.stopPropagation();
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
	}).one('open', function() {
		if (fm.api > 2) {
			czipdl = fm.getCommand('zipdl');
		}
	});
	
	this.exec = function(hashes) {
		var hashes  = this.hashes(hashes),
			fm      = this.fm,
			base    = fm.options.url,
			files   = filter(hashes, true),
			dfrd    = $.Deferred(),
			iframes = '',
			cdata   = '',
			targets = {},
			i, url,
			linkdl  = false,
			getTask = function(hashes) {
				return function() {
					var dfd = $.Deferred(),
						root = fm.file(fm.root(hashes[0])),
						volName = root? ' ('+(root.i18 || root.name)+')' : '';
					fm.request({
						data : {cmd : 'zipdl', targets : hashes},
						notify : {type : 'zipdl', cnt : 1, hideCnt : true, msg : fm.i18n('ntfzipdl') + volName},
						cancel : true,
						preventDefault : true
					}).done(function(e) {
						var zipdl, dialog, btn = {}, dllink, form, iframe,
							uniq = 'dlw' + (+new Date());
						if (e.error) {
							fm.error(e.error);
							dfd.resolve();
						} else if (e.zipdl) {
							zipdl = e.zipdl;
							if (linkdl || (!html5dl && fm.UA.Mobile)) {
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
										dfd.resolve();
										dialog.elfinderdialog('destroy');
									})
									.append('<span class="elfinder-button-icon elfinder-button-icon-download"></span>'+fm.escape(zipdl.name));
								btn[fm.i18n('btnCancel')] = function() {
									dialog.elfinderdialog('destroy');
								};
								dialog = fm.dialog(dllink, {
									title: fm.i18n('link'),
									buttons: btn,
									width: '200px',
									destroyOnClose: true,
									close: function() {
										(dfd.state() !== 'resolved') && dfd.resolve();
									}
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
								iframe = $('<iframe style="display:none" name="'+uniq+'">')
									.appendTo('body')
									.ready(function() {
										form.submit().remove();
										dfd.resolve();
										setTimeout(function() {
											iframe.remove();
										}, 20000); // give 20 sec file to be saved
									});
							}
						}
					}).fail(function(error) {
						error && fm.error(error);
						dfd.resolve();
					});
					return dfd.promise();
				};
			},
			link, html5dl;
			
		if (!files.length) {
			return dfrd.reject();
		}
		
		link = $('<a>').hide().appendTo($('body'));
		html5dl = (typeof link.get(0).download === 'string');
		
		if (zipOn && (files.length > 1 || files[0].mime === 'directory')) {
			link.remove();
			if (mixed) {
				linkdl = fm.UA.Mobile;
				targets = {};
				$.each(files, function(i, f) {
					var p = f.hash.split('_', 2);
					if (! targets[p[0]]) {
						targets[p[0]] = [ f.hash ];
					} else {
						targets[p[0]].push(f.hash);
					}
				});
			} else {
				targets = [ $.map(files, function(f) { return f.hash; }) ];
			}
			dfrd = fm.sequence($.map(targets, function(t) { return getTask(t); })).always(
				function() {
					fm.trigger('download', {files : files});
				}
			);
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
					}, 20000 + (10000 * i)); // give 20 sec + 10 sec for each file to be saved
				});
			fm.trigger('download', {files : files});
			return dfrd.resolve();
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

		return cnt && fm.cwd().write && $.map(sel, function(f) { return f.read && f.phash === fm.cwd().hash && ! fm.isRoot(f)? f : null  }).length == cnt ? 0 : -1;
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
			
		if (! cnt) {
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
		}).done(function(data) {
			var newItem;
			if (data && data.added && data.added[0]) {
				fm.one('duplicatedone', function() {
					newItem = fm.findCwdNodes(data.added);
					if (newItem.length) {
						newItem.trigger('scrolltoview');
					} else {
						fm.trigger('selectfiles', {files : $.map(data.added, function(f) {return f.hash;})});
						fm.toast({msg: fm.i18n(['complete', fm.i18n('cmdduplicate')])});
					}
				});
			}
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
		getEncSelect = function(heads) {
			var sel = $('<select class="ui-corner-all"/>'),
				hval;
			if (heads) {
				$.each(heads, function(i, head) {
					hval = fm.escape(head.value);
					sel.append('<option value="'+hval+'">'+(head.caption? fm.escape(head.caption) : hval)+'</option>');
				});
			}
			$.each(self.options.encodings, function(i, v) {
				sel.append('<option value="'+v+'">'+v+'</option>');
			});
			return sel;
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
		dialog = function(id, file, content, encoding) {

			var dfrd = $.Deferred(),
				stateChange = function() {
					if (selEncoding) {
						if (changed()) {
							selEncoding.attr('title', fm.i18n('saveAsEncoding')).addClass('elfinder-edit-changed');
						} else {
							selEncoding.attr('title', fm.i18n('openAsEncoding')).removeClass('elfinder-edit-changed');
						}
					}
				},
				ta   = $('<textarea class="elfinder-file-edit '+fm.res('class', 'editing')+'" rows="20" id="'+id+'-ta">'+fm.escape(content)+'</textarea>')
					.on('input propertychange', stateChange),
				old  = ta.val(),
				save = function() {
					ta.editor && ta.editor.save(ta[0], ta.editor.instance);
					old = ta.val();
					dfrd.notifyWith(ta, [selEncoding? selEncoding.val():void(0)]);
				},
				cancel = function() {
					ta.elfinderdialog('close');
				},
				savecl = function() {
					save();
					cancel();
				},
				changed = function() {
					ta.editor && ta.editor.save(ta[0], ta.editor.instance);
					return  (rtrim(old) !== rtrim(ta.val()));
				},
				opts = {
					title   : fm.escape(file.name),
					width   : self.options.dialogWidth || 450,
					buttons : {},
					allowMaximize : true,
					btnHoverFocus : false,
					closeOnEscape : false,
					close   : function() {
						var close = function(){
							dfrd.reject();
							ta.editor && ta.editor.close(ta[0], ta.editor.instance);
							ta.elfinderdialog('destroy');
						};
						fm.toggleMaximize($(this).closest('.ui-dialog'), false);
						if (changed()) {
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
						var heads = (encoding && encoding !== 'unknown')? [{value: encoding}] : [],
							loadRes;
						if (content === '' || ! encoding || encoding !== 'UTF-8') {
							heads.push({value: 'UTF-8'});
						}
						selEncoding = getEncSelect(heads).on('touchstart', function(e) {
							// for touch punch event handler
							e.stopPropagation();
						}).on('change', function() {
							// reload to change encoding if not edited
							if (! changed() && rtrim(ta.val()) !== '') {
								cancel();
								edit(file, $(this).val());
							}
						}).on('mouseover', stateChange);
						ta.parent().prev().find('.elfinder-titlebar-button:last')
							.after($('<span class="elfinder-titlebar-button-right"/>').append(selEncoding));
						
						fm.disable();
						ta.focus(); 
						ta[0].setSelectionRange && ta[0].setSelectionRange(0, 0);
						if (ta.editor) {
							loadRes = ta.editor.load(ta[0]) || null;
							if (loadRes && loadRes.done) {
								loadRes.done(function(instance) {
									ta.editor.instance = instance;
									ta.editor.focus(ta[0], ta.editor.instance);
								});
							} else {
								ta.editor.instance = loadRes;
								ta.editor.focus(ta[0], ta.editor.instance);
							}
						}
					},
					resize : function(e, data) {
						ta.editor && ta.editor.resize(ta[0], ta.editor.instance, e, data || {});
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
				},
				selEncoding;
				
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
							resize   : typeof editor.resize == 'function' ? editor.resize : function() {},
							instance : null,
							doSave   : save,
							doCancel : cancel,
							doClose  : savecl,
							file     : file,
							fm       : fm
						};
						
						return false;
					}
				});
				
				if (!ta.editor) {
					ta.keydown(function(e) {
						var code = e.keyCode,
							value, start;
						
						e.stopPropagation();
						if (code == $.ui.keyCode.TAB) {
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
							if (code == 'Q'.charCodeAt(0) || code == 'W'.charCodeAt(0)) {
								e.preventDefault();
								cancel();
							}
							if (code == 'S'.charCodeAt(0)) {
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
		edit = function(file, conv) {
			var hash   = file.hash,
				opts   = fm.options,
				dfrd   = $.Deferred(), 
				data   = {cmd : 'file', target : hash},
				id     = 'edit-'+fm.namespace+'-'+file.hash,
				d      = fm.getUI().find('#'+id),
				conv   = !conv? 0 : conv,
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
				notify : {type : 'file', cnt : 1}
			})
			.done(function(data) {
				var selEncoding;
				if (data.doconv) {
					fm.confirm({
						title  : self.title,
						text   : data.doconv === 'unknown'? 'confirmNonUTF8' : 'confirmConvUTF8',
						accept : {
							label    : 'btnConv',
							callback : function() {  
								dfrd = edit(file, selEncoding.val());
							}
						},
						cancel : {
							label    : 'btnCancel',
							callback : function() { dfrd.reject(); }
						},
						optionsCallback : function(options) {
							options.create = function() {
								var base = $('<div class="elfinder-dialog-confirm-encoding"/>'),
									head = {value: data.doconv},
									detected;
								
								if (data.doconv === 'unknown') {
									head.caption = '-';
								}
								selEncoding = getEncSelect([head]);
								$(this).next().find('.ui-dialog-buttonset')
									.prepend(base.append($('<label>'+fm.i18n('encoding')+' </label>').append(selEncoding)));
							}
						}
					});
				} else {
					dialog(id, file, data.content, data.encoding)
						.progress(function(encoding) {
							var ta = this;
							fm.request({
								options : {type : 'post'},
								data : {
									cmd     : 'put',
									target  : hash,
									encoding : encoding || data.encoding,
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
				var err = Array.isArray(error)? error[0] : error;
				(err !== 'errConvUTF8') && fm.sync();
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

		return cnt && filter(sel).length == cnt ? 0 : -1;
	};
	
	this.exec = function(hashes) {
		var files = filter(this.files(hashes)),
			list  = [],
			file;

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
		
		return cnt && this.fm.cwd().write && filter(sel).length == cnt ? 0 : -1;
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
(elFinder.prototype.commands.forward = function() {
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
	
}).prototype = { forceLoad : true }; // this is required command


/*
 * File: /js/commands/fullscreen.js
 */

/**
 * @class  elFinder command "fullscreen"
 * elFinder node to full scrren mode
 *
 * @author Naoki Sawada
 **/

elFinder.prototype.commands.fullscreen = function() {
	var self   = this,
		fm     = this.fm,
		update = function(e, data) {
			if (data && data.fullscreen) {
				self.update(void(0), (data.fullscreen === 'on'));
			}
		};

	this.alwaysEnabled  = true;
	this.updateOnSelect = false;
	this.value = false;

	this.options = {
		ui : 'fullscreenbutton'
	};

	this.getstate = function() {
		return 0;
	}
	
	this.exec = function() {
		var node = fm.getUI().get(0),
			fullNode = fm.toggleFullscreen(node);
		self.update(void(0), (fullNode === node));
	};
	
	fm.bind('init', function() {
		fm.getUI().off('resize.' + fm.namespace, update).on('resize.' + fm.namespace, update);
	});
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
(elFinder.prototype.commands.getfile = function() {
	var self   = this,
		fm     = this.fm,
		filter = function(files) {
			var o = self.options;

			files = $.map(files, function(file) {
				return (file.mime != 'directory' || o.folders) && file.read ? file : null;
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
					var res,
						done = function() {
							if (opts.oncomplete == 'close') {
								fm.hide();
							} else if (opts.oncomplete == 'destroy') {
								fm.destroy();
							}
						};
					
					fm.trigger('getfile', {files : data});
					
					res = self.callback(data, fm);
					
					if (typeof res === 'object' && typeof res.done === 'function') {
						res.done(done)
						.fail(function(error) {
							error && fm.error(error);
						});
					} else {
						done();
					}
				}),
			result = function(file) {
				return opts.onlyURL
					? opts.multiple ? $.map(files, function(f) { return f.url; }) : files[0].url
					: opts.multiple ? files : files[0];
			},
			req = [], 
			i, file, dim;

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
			if (! opts.onlyURL) {
				if (opts.getPath) {
					file.path = fm.path(file.hash);
					if (file.path === '' && file.phash) {
						// get parents
						(function() {
							var dfd  = $.Deferred();
							req.push(dfd);
							fm.path(file.hash, false, {})
								.done(function(path) {
									file.path = path;
								})
								.fail(function() {
									file.path = '';
								})
								.always(function() {
									dfd.resolve();
								});
						})();
					}
				}
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
		}
		
		if (req.length) {
			$.when.apply(null, req).always(function() {
				dfrd.resolve(result(files));
			})
			return dfrd;
		}
		
		return dfrd.resolve(result(files));
	}

}).prototype = { forceLoad : true }; // this is required command


/*
 * File: /js/commands/help.js
 */

/**
 * @class  elFinder command "help"
 * "About" dialog
 *
 * @author Dmitry (dio) Levashov
 **/
(elFinder.prototype.commands.help = function() {
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
		selfUrl = $('base').length? document.location.href.replace(/#.*$/, '') : '',
		
		
		about = function() {
			html.push('<div id="'+fm.namespace+'-help-about" class="ui-tabs-panel ui-widget-content ui-corner-bottom"><div class="elfinder-help-logo"/>');
			html.push('<h3>elFinder</h3>');
			html.push('<div class="'+prim+'">'+fm.i18n('webfm')+'</div>');
			html.push('<div class="'+sec+'">'+fm.i18n('ver')+': '+fm.version+', '+fm.i18n('protocolver')+': <span class="apiver"></span></div>');
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
			
			if (fm.i18[fm.lang].translator) {
				$.each(fm.i18[fm.lang].translator.split(', '), function() {
					html.push(atpl[r](author, $.trim(this))[r](work, fm.i18n('translator')+' ('+fm.i18[fm.lang].language+')'));
				});	
			}
			
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
		useDebug = false,
		debug = function() {
			useDebug = true;
			// debug tab
			html.push('<div id="'+fm.namespace+'-help-debug" class="ui-tabs-panel ui-widget-content ui-corner-bottom">');
			html.push('<div class="ui-widget-content elfinder-help-debug"><ul></ul></div>');
			html.push('</div>');
			// end debug
		},
		debugRender = function() {
			var render = function(elm, obj) {
				$.each(obj, function(k, v) {
					elm.append($('<dt/>').text(k));
					if (typeof v === 'undefined') {
						elm.append($('<dd/>').append($('<span/>').text('undfined')));
					} else if (typeof v === 'object' && !v) {
						elm.append($('<dd/>').append($('<span/>').text('null')));
					} else if (typeof v === 'object' && ($.isPlainObject(v) || v.length)) {
						elm.append( $('<dd/>').append(render($('<dl/>'), v)));
					} else {
						elm.append($('<dd/>').append($('<span/>').text((v && typeof v === 'object')? '[]' : (v? v : '""'))));
					}
				});
				return elm;
			},
			cnt = debugUL.children('li').length,
			targetL, target, tabId,
			info;
			
			if (self.debug.options || self.debug.debug) {
				if (cnt >= 5) {
					debugUL.children('li:last').remove();
					debugDIV.children('div:last').remove();
				}
				
				tabId = fm.namespace + '-help-debug-' + (+new Date());
				targetL = $('<li/>').html('<a href="'+selfUrl+'#'+tabId+'">'+self.debug.debug.cmd+'</a>').prependTo(debugUL);
				target = $('<div id="'+tabId+'"/>');
				
				if (self.debug.debug) {
					info = $('<fieldset>').append($('<legend/>').text('debug'), render($('<dl/>'), self.debug.debug));
					target.append(info);
				}
				if (self.debug.options) {
					info = $('<fieldset>').append($('<legend/>').text('options'), render($('<dl/>'), self.debug.options));
					target.append(info);
				}
				
				debugUL.after(target);
				
				debugDIV.tabs('refresh');
				debugUL.find('a:first').trigger('click');
			}
		},
		content = '',
		debugDIV, debugUL;
	
	this.alwaysEnabled  = true;
	this.updateOnSelect = false;
	this.state = -1;
	
	this.shortcuts = [{
		pattern     : 'f1',
		description : this.title
	}];
	
	fm.one('load', function() {
		var parts = self.options.view || ['about', 'shortcuts', 'help', 'debug'],
			tabDebug, i;
		
		// debug tab require jQueryUI Tabs Widget
		if (! $.fn.tabs) {
			if ((i = $.inArray(parts, 'debug')) !== false) {
				parts.splice(i, 1);
			}
		}
		
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
					content.children('.ui-tabs-panel').hide().filter(link.attr('href')).show();
				}
				
			})
			.filter(':first').click();
		
		// debug
		if (useDebug) {
			tabDebug = content.find('.elfinder-help-tab-debug').hide();
			debugDIV = content.find('#'+fm.namespace+'-help-debug').children('div:first').tabs();
			debugUL = debugDIV.children('ul:first');

			self.debug = {};
	
			fm.bind('backenddebug', function(e) {
				// CAUTION: DO NOT TOUCH `e.data`
				if (e.data && e.data.debug) {
					tabDebug.show();
					self.debug = { options : e.data.options, debug : Object.assign({ cmd : fm.currentReqCmd }, e.data.debug) };
					if (self.dialog/* && self.dialog.is(':visible')*/) {
						debugRender();
					}
				}
			});
		}

		content.find('#'+fm.namespace+'-help-about').find('.apiver').text(fm.api);
		self.dialog = fm.dialog(content, {title : self.title, width : 530, autoOpen : false, destroyOnClose : false})
			.on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
			});
		
		self.state = 0;
	});
	
	this.getstate = function() {
		return 0;
	};
	
	this.exec = function() {
		this.dialog.elfinderdialog('open').find('.ui-tabs-nav li a:first').click();
	};

}).prototype = { forceLoad : true }; // this is required command


/*
 * File: /js/commands/hidden.js
 */

/**
 * @class  elFinder command "hidden"
 * Always hidden command for uiCmdMap
 *
 * @author Naoki Sawada
 **/
elFinder.prototype.commands.hidden = function() {
	//this._disabled = true;
	this.hidden = true;
	this.updateOnSelect = false;
	this.getstate = function() {
		return -1;
	}
};

/*
 * File: /js/commands/home.js
 */


(elFinder.prototype.commands.home = function() {
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
	

}).prototype = { forceLoad : true }; // this is required command


/*
 * File: /js/commands/info.js
 */

/**
 * @class elFinder command "info". 
 * Display dialog with file properties.
 *
 * @author Dmitry (dio) Levashov, dio@std42.ru
 **/
(elFinder.prototype.commands.info = function() {
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
			roots    : fm.i18n('volumeRoots'),
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
		main       : '<div class="ui-helper-clearfix elfinder-info-title {dirclass}"><span class="elfinder-cwd-icon {class} ui-corner-all"{style}/>{title}</div><table class="elfinder-info-tb">{content}</table>',
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
			getSize = function(targets) {
				var getLeafRoots = function(file) {
						var targets = [];
						if (file.mime === 'directory') {
							$.each(fm.leafRoots, function(hash, roots) {
								var phash;
								if (hash === file.hash) {
									targets.push.apply(targets, roots);
								} else {
									phash = (fm.file(hash) || {}).phash;
									while(phash) {
										if (phash === file.hash) {
											targets.push.apply(targets, roots);
										}
										phash = (fm.file(phash) || {}).phash;
									}
								}
							});
						}
						return targets;
					},
					checkPhash = function(hash) {
						var dfd = $.Deferred(),
							dir = fm.file(hash),
							target = dir? dir.phash : hash;
						if (target && ! fm.file(target)) {
							fm.request({
								data : {
									cmd    : 'parents',
									target : target
								},
								preventFail : true
							}).done(function() {
								fm.one('parentsdone', function() {
									dfd.resolve();
								});
							}).fail(function() {
								dfd.resolve();
							});
						} else {
							dfd.resolve();
						}
						return dfd;
					},
					cache = function() {
						var dfd = $.Deferred(),
							cnt = Object.keys(fm.leafRoots).length;
						
						if (cnt > 0) {
							$.each(fm.leafRoots, function(hash) {
								checkPhash(hash).done(function() {
									--cnt;
									if (cnt < 1) {
										dfd.resolve();
									}
								});
							});
						} else {
							dfd.resolve();
						}
						return dfd;
					};
				
				fm.autoSync('stop');
				cache().done(function() {
					var files = [], grps = {}, dfds = [];
					
					$.each(targets, function() {
						files.push.apply(files, getLeafRoots(fm.file(this)));
					});
					targets.push.apply(targets, files);
					
					$.each(targets, function() {
						var root = fm.root(this);
						if (! grps[root]) {
							grps[root] = [ this ];
						} else {
							grps[root].push(this);
						}
					});
					
					$.each(grps, function() {
						dfds.push(fm.request({
							data : {cmd : 'size', targets : this},
							preventDefault : true
						}));
					});
					reqs.push.apply(reqs, dfds);
					
					$.when.apply($, dfds).fail(function() {
						replSpinner(msg.unknown, 'size');
					}).done(function() {
						var size = 0,
							argLen = arguments.length,
							i;
						
						for (i = 0; i < argLen; i++) {
							size += parseInt(arguments[i].size);
						}
						replSpinner(size >= 0 ? fm.formatSize(size) : msg.unknown, 'size');
					});
					
					fm.autoSync();
				});
			},
			style = '',
			size, tmb, file, title, dcnt, rdcnt, path;
			
		if (!cnt) {
			return $.Deferred().reject();
		}
			
		if (dialog.length) {
			dialog.elfinderdialog('toTop');
			return $.Deferred().resolve();
		}
		
			
		if (cnt == 1) {
			file  = files[0];
			
			if (file.icon) {
				style = ' '+fm.getIconStyle(file);
			}
			
			view  = view.replace('{dirclass}', file.csscls? fm.escape(file.csscls) : '').replace('{class}', fm.mime2class(file.mime)).replace('{style}', style);
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
			if (path = fm.path(file.hash, true)) {
				content.push(row.replace(l, msg.path).replace(v, fm.escape(path)));
			} else {
				content.push(row.replace(l, msg.path).replace(v, tpl.spinner.replace('{text}', msg.calc).replace('{name}', 'path')));
				reqs.push(fm.path(file.hash, true, {notify: null})
				.fail(function() {
					replSpinner(msg.unknown, 'path');
				})
				.done(function(path) {
					replSpinner(path, 'path');
				}));
			}
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
				rdcnt = $.map(files, function(f) { return f.mime === 'directory' && (! f.phash || f.isroot)? 1 : null ; }).length;
				dcnt -= rdcnt;
				content.push(row.replace(l, msg.kind).replace(v, (rdcnt === cnt || dcnt === cnt)? msg[rdcnt? 'roots' : 'folders'] : $.map({roots: rdcnt, folders: dcnt, files: cnt - rdcnt - dcnt}, function(c, t) { return c? msg[t]+' '+c : null}).join(', ')));
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
				.on('load', function() { dialog.find('.elfinder-cwd-icon').addClass(tmb.className).css('background-image', "url('"+tmb.url+"')"); })
				.attr('src', tmb.url);
		}
		
		// send request to count total size
		if (count.length) {
			getSize(count);
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
	
}).prototype = { forceLoad : true }; // this is required command


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
		self = this,
		curOrg;
	
	this.value           = '';
	this.disableOnSearch = true;
	this.updateOnSelect  = false;
	this.mime            = 'directory';
	this.prefix          = 'untitled folder';
	this.exec            = function(contextSel) {
		this.origin = curOrg? curOrg : 'cwd';
		if (! contextSel && ! this.options.intoNewFolderToolbtn) {
			fm.getUI('cwd').trigger('unselectall');
		}
		this.move = (this.origin !== 'navbar' && fm.selected().length)? true : false;
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
			
		curOrg = sel.length? (e.data.origin || '') : '';
		self.title = (sel.length && (curOrg !== 'navbar'))? fm.i18n('cmdmkdirin') : fm.i18n('cmdmkdir');
		self.update(void(0), self.title);
	});
	
	this.getstate = function(sel) {
		var cwd = fm.cwd(),
			sel = (curOrg === 'navbar' || (sel && sel[0] != cwd.hash))? this.files(sel || fm.selected()) : [],
			cnt = sel.length;

		if (curOrg === 'navbar') {
			return cnt && sel[0].write && sel[0].read? 0 : -1;  
		} else {
			return cwd.write && (!cnt || $.map(sel, function(f) { return f.read && ! f.locked? f : null  }).length == cnt)? 0 : -1;
		}
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
		return this.fm.cwd().write ? 0 : -1;
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
	var self = this,
		content;

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
				var winFocus = function() {
						inputs.protocol.trigger('change', 'winfocus');
					},
					inputs = {
						protocol : $('<select/>')
						.on('click',function() {
							var $this = $(this);
							if ($this.data('keepFocus')) {
								$this.removeData('keepFocus');
							} else {
								$this.data('keepFocus', true);
							}
						})
						.on('change', function(e, data){
							var protocol = this.value;
							content.find('.elfinder-netmount-tr').hide();
							content.find('.elfinder-netmount-tr-'+protocol).show();
							dialogNode.children('.ui-dialog-buttonpane:first').find('button').show();
							if (typeof o[protocol].select == 'function') {
								o[protocol].select(fm, e, data);
							}
							setTimeout(function() {
								content.find('input:text.elfinder-tabstop:visible:first').focus();
							}, 20);
						})
						.addClass('ui-corner-all')
					},
					opts = {
						title          : fm.i18n('netMountDialogTitle'),
						resizable      : false,
						modal          : true,
						destroyOnClose : true,
						open           : function() {
							$(window).on('focus.'+fm.namespace, winFocus);
							inputs.protocol.change();
						},
						close          : function() { 
							//delete self.dialog; 
							dfrd.state() == 'pending' && dfrd.reject();
							$(window).off('focus.'+fm.namespace, winFocus);
						},
						buttons        : {}
					},
					form = $('<form autocomplete="off"/>'),
					hidden  = $('<div/>'),
					dialog;

				content = $('<table class="elfinder-info-tb elfinder-netmount-tb"/>')
					.append($('<tr/>').append($('<td>'+fm.i18n('protocol')+'</td>')).append($('<td/>').append(inputs.protocol)));

				$.each(self.drivers, function(i, protocol) {
					if (o[protocol]) {
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
					}
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
							var pdir;
							if (data.added && data.added.length) {
								if (data.added[0].phash) {
									if (pdir = fm.file(data.added[0].phash)) {
										if (! pdir.dirs) {
											pdir.dirs = 1;
											fm.change({ changed: [ pdir ] });
										}
									}
								}
								fm.one('netmountdone', function() {
									fm.exec('open', data.added[0].hash);
								});
							}
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
				
				content.find('select,input').addClass('elfinder-tabstop');
				
				dialog = fm.dialog(form.append(content), opts);
				dialogNode = dialog.closest('.ui-dialog');
				dialog.ready(function(){
					inputs.protocol.change();
					dialog.elfinderdialog('posInit');
				});
				return dialog;
			},
			dialogNode;
		
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
				content.find('select,input').addClass('elfinder-tabstop');
				self.dialog.elfinderdialog('tabstopsInit');
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
									// fallback
									$.each(fm.files(), function(h, f) {
										if (f.mime == 'directory') {
											open = h;
											return null;
										}
									});
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
(elFinder.prototype.commands.open = function() {
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
			? (sel[0].read? 0 : -1) 
			: (cnt && !this.fm.UA.Mobile) ? ($.map(sel, function(file) { return file.mime == 'directory' || ! file.read ? null : file}).length == cnt ? 0 : -1) : -1
	}
	
	this.exec = function(hashes, opts) {
		var fm    = this.fm, 
			dfrd  = $.Deferred().fail(function(error) { error && fm.error(error); }),
			files = this.files(hashes),
			cnt   = files.length,
			thash = (typeof opts == 'object')? opts.thash : false,
			opts  = this.options,
			into  = opts.into || 'window',
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
						syncOnFail : true,
						lazy : false
					});
		}
		
		files = $.map(files, function(file) { return file.mime != 'directory' ? file : null });
		
		// nothing to open or files and folders selected - do nothing
		if (cnt != files.length) {
			return dfrd.reject();
		}
		
		var doOpen = function() {
			var wnd, target;
			
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
				target = 'elf_open_window';
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
					if (url.indexOf(fm.options.url) === 0) {
						url = '';
					}
					if (into === 'window') {
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
						wnd = window.open(url, target, w + ',top=50,left=50,scrollbars=yes,resizable=yes');
					} else {
						if (into === 'tabs') {
							target = file.hash;
						}
						wnd = window.open('about:blank', target);
					}
					
					if (!wnd) {
						return dfrd.reject('errPopup');
					}
					
					if (url === '') {
						var form = document.createElement("form");
						form.action = fm.options.url;
						form.method = typeof opts.method === 'string' && opts.method.toLowerCase() === 'get'? 'GET' : 'POST';
						form.target = target;
						form.style.display = 'none';
						var params = Object.assign({}, fm.options.customData, {
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
					} else if (into !== 'window') {
						wnd.location = url;
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
				buttons : (fm.getCommand('zipdl') && fm.isCommandEnabled('zipdl', fm.cwd().hash))? [
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

}).prototype = { forceLoad : true }; // this is required command


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
			wz;
		if (cnt !== 1) {
			return -1;
		}
		wz = this.fm.getUI('workzone');
		return wz.hasClass('elfinder-search-result')? 0 : -1;
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
		fm.trigger('searchend', { noupdate: true });
		fm.request({
			data   : {cmd  : 'open', target : hash},
			notify : {type : 'open', cnt : 1, hideCnt : true},
			syncOnFail : false
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
			if (Array.isArray(dst)) {
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
	
	this.exec = function(dst, opts) {
		var self   = this,
			fm     = self.fm,
			opts   = opts || {},
			dst    = dst ? this.files(dst)[0] : fm.cwd(),
			files  = fm.clipboard(),
			cnt    = files.length,
			cut    = cnt ? files[0].cut : false,
			cmd    = opts._cmd? opts._cmd : (cut? 'move' : 'copy'),
			error  = 'err' + cmd.charAt(0).toUpperCase() + cmd.substr(1),
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
							title  : fm.i18n(cmd + 'Files'),
							text   : ['errExists', file.name, cmd === 'restore'? 'confirmRest' : 'confirmRepl'], 
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
							if (Array.isArray(names)) {
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
								notify : {type : cmd, cnt : cnt}
							})
							.done(function(data) {
								var newItem, node;
								dfrd.resolve(data);
								if (data && data.added && data.added[0]) {
									fm.one('pastedone', function() {
										newItem = fm.findCwdNodes(data.added);
										if (newItem.length) {
											newItem.trigger('scrolltoview');
										} else {
											if (dst.hash !== fm.cwd().hash) {
												node = $('<div/>').append(
													$('<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all"><span class="ui-button-text">'+fm.i18n('cmdopendir')+'</span></button>')
													.on('mouseenter mouseleave', function(e) { 
														$(this).toggleClass('ui-state-hover', e.type == 'mouseenter');
													}).on('click', function() {
														fm.exec('open', dst.hash).done(function() {
															fm.one('opendone', function() {
																fm.trigger('selectfiles', {files : $.map(data.added, function(f) {return f.hash;})});
															});
														});
													})
												);
											} else {
												fm.trigger('selectfiles', {files : $.map(data.added, function(f) {return f.hash;})});
											}
											!opts.noToast && fm.toast({msg: fm.i18n(['complete', fm.i18n('cmd' + cmd)]), extNode: node});
										}
									});
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
					
					if (!fm.option('copyOverwrite', dst.hash)) {
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
				return !dfrd.reject([error, file.name, 'errPerm']);
			}
			
			if (cut && file.locked) {
				return !dfrd.reject(['errLocked', file.name]);
			}
			
			if ($.inArray(file.hash, parents) !== -1) {
				return !dfrd.reject(['errCopyInItself', file.name]);
			}
			
			if (file.mime && file.mime !== 'directory' && ! fm.uploadMimeCheck(file.mime, dst.hash)) {
				return !dfrd.reject([error, file.name, 'errUploadMime']);
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
(elFinder.prototype.commands.quicklook = function() {
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
			var elf = fm.getUI().offset(),
				base = node.find('.elfinder-cwd-file-wrapper'),
				baseOffset = base.offset();
			return {
				opacity : 0,
				width   : base.width(),
				height  : base.height(),
				top     : baseOffset.top - elf.top,
				left    : baseOffset.left  - elf.left
			}
		},
		/**
		 * Return css for opened window
		 *
		 * @return void
		 **/
		openedCss = function() {
			var win = $(window);
			var elf = fm.getUI().offset();
			var w = Math.min(width, $(window).width()-10);
			var h = Math.min(height, $(window).height()-80);
			return {
				opacity : 1,
				width  : w,
				height : h,
				top    : parseInt((win.height() - h - 60) / 2 + win.scrollTop() - elf.top),
				left   : parseInt((win.width() - w) / 2 + win.scrollLeft() - elf.left)
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
		leftKey = $.ui.keyCode.LEFT,
		rightKey = $.ui.keyCode.RIGHT,
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
					$window = $(window),
					resize  = function() { self.preview.trigger('changesize'); };
					
				e.stopPropagation();
				e.preventDefault();
				
				if (full) {
					navStyle = '';
					navShow();
					win.toggleClass(fullscreen)
					.css(win.data('position'));
					$window.trigger(self.resize).off(self.resize, resize);
					navbar.off('mouseenter mouseleave');
					cover.off(coverEv);
				} else {
					win.toggleClass(fullscreen)
					.data('position', {
						left   : win.css('left'), 
						top    : win.css('top'), 
						width  : win.width(), 
						height : win.height(),
						display: 'block'
					})
					.removeAttr('style');

					$(window).on(self.resize, resize)
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
				if (parent.is('.ui-resizable')) {
					collection = collection.add(parent);
				};
				$.fn.resizable && collection.resizable(full ? 'enable' : 'disable').removeClass('ui-state-disabled');

				win.trigger('viewchange');
			}),
		
		navShow = function() {
			if (self.window.hasClass(fullscreen)) {
				navtm && clearTimeout(navtm);
				navtm = null;
				// if use `show()` it make infinite loop with old jQuery (jQuery/jQuery UI: 1.8.0/1.9.0)
				// see #1478 https://github.com/Studio-42/elFinder/issues/1478
				navbar.stop(true, true).css('display', 'block');
				coverHide();
			}
		},
		
		coverHide = function() {
			cover.data('tm') && clearTimeout(cover.data('tm'));
			cover.removeData('tm');
			cover.hide();
		},
			
		prev = $('<div class="'+navicon+' '+navicon+'-prev"/>').on('click touchstart', function(e) { ! navmove && navtrigger(leftKey); return false; }),
		next = $('<div class="'+navicon+' '+navicon+'-next"/>').on('click touchstart', function(e) { ! navmove && navtrigger(rightKey); return false; }),
		navbar  = $('<div class="elfinder-quicklook-navbar"/>')
			.append(prev)
			.append(fsicon)
			.append(next)
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
		.on('change', function() {
			navShow();
			navbar.attr('style', navStyle);
			self.preview.attr('style', '').removeClass('elfinder-overflow-auto');
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
				tmb, name;

			if (file && (e.forceUpdate || self.window.data('hash') !== file.hash)) {
				name = fm.escape(file.i18 || file.name);
				!file.read && e.stopImmediatePropagation();
				self.window.data('hash', file.hash);
				self.preview.off('changesize').trigger('change').children().remove();
				title.html(name);
				
				prev.css('visibility', '');
				next.css('visibility', '');
				if (file.hash === fm.cwdId2Hash(cwd.find('[id]:first').attr('id'))) {
					prev.css('visibility', 'hidden');
				}
				if (file.hash === fm.cwdId2Hash(cwd.find('[id]:last').attr('id'))) {
					next.css('visibility', 'hidden');
				}
				
				info.html(
						tpl.replace(/\{value\}/, name)
						+ tpl.replace(/\{value\}/, fm.mime2kind(file))
						+ (file.mime == 'directory' ? '' : tpl.replace(/\{value\}/, fm.formatSize(file.size)))
						+ tpl.replace(/\{value\}/, fm.i18n('modify')+': '+ fm.formatDate(file))
					)
				icon.addClass('elfinder-cwd-icon ui-corner-all '+fm.mime2class(file.mime));
				
				if (file.icon) {
					icon.css(fm.getIconStyle(file, true));
				}

				if (file.read && (tmb = fm.tmb(file))) {
					$('<img/>')
						.hide()
						.appendTo(self.preview)
						.on('load', function() {
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
		

	

	this.window = $('<div class="ui-front ui-helper-reset ui-widget elfinder-quicklook touch-punch" style="position:absolute"/>')
		.hide()
		.addClass(fm.UA.Touch? 'elfinder-touch' : '')
		.on('click', function(e) { e.stopPropagation();  })
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
				hash    = win.data('hash'),
				close   = function() {
					state = closed;
					win.hide();
					preview.children().remove();
					self.update(0, self.value);
					
				},
				node;
				
			win.data('hash', '');
			if (self.opened()) {
				state = animated;
				win.hasClass(fullscreen) && fsicon.click();
				(hash && (node = cwd.find('#'+hash)).length)
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
			i, p, curCwd, cwdDispInlineRegex;
		
		width  = o.width  > 0 ? parseInt(o.width)  : 450;	
		height = o.height > 0 ? parseInt(o.height) : 300;

		fm.one('load', function() {
			parent = fm.getUI();
			cwd    = fm.getUI('cwd');

			if (fm.zIndex) {
				win.css('z-index', fm.zIndex + 1);
			}
			
			win.appendTo(parent);
			
			// close window on escape
			$(document).keydown(function(e) {
				e.keyCode == $.ui.keyCode.ESCAPE && self.opened() && win.trigger('close')
			})
			
			if ($.fn.resizable) {
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
					setTimeout(function() {
						if (self.value) {
							preview.trigger($.Event('update', {file : self.value}))
						} else {
							navtrigger(rightKey);
							setTimeout(function() {
								! self.value && win.trigger('close');
							}, 10);
						}
					}, 10);
				}
			});
			
			preview.on('update', function(data) {
				var hash = data.file.hash,
					serach = (fm.searchStatus.mixed && fm.searchStatus.state > 1);
				
				// set current dispInlineRegex
				self.dispInlineRegex = cwdDispInlineRegex;
				if (serach || fm.optionsByHashes[hash]) {
					try {
						self.dispInlineRegex = new RegExp(fm.option('dispInlineRegex', hash));
					} catch(e) {
						try {
							self.dispInlineRegex = new RegExp(!fm.isRoot(data.file)? fm.option('dispInlineRegex', data.file.phash) : fm.options.dispInlineRegex);
						} catch(e) {
							self.dispInlineRegex = /^$/;
						}
					}
				}
				self.info.show();
			});

			$.each(fm.commands.quicklook.plugins || [], function(i, plugin) {
				if (typeof(plugin) == 'function') {
					new plugin(self)
				}
			});
		});
		
		fm.bind('open',function() {
			var prevCwd = curCwd;
			
			// change cwd
			curCwd = fm.cwd().hash;
			if (self.opened() && prevCwd !== curCwd) {
				win.trigger('close');
			}
			
			// set current volume dispInlineRegex
			try {
				cwdDispInlineRegex = new RegExp(fm.option('dispInlineRegex'));
			} catch(e) {
				cwdDispInlineRegex = /^$/;
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

}).prototype = { forceLoad : true }; // this is required command


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
				url, img, loading, m;

			if (ql.dispInlineRegex.test(file.mime) && $.inArray(file.mime, mimes) !== -1) {
				// this is our file - stop event propagation
				e.stopImmediatePropagation();

				loading = $('<div class="elfinder-quicklook-info-data"> '+fm.i18n('nowLoading')+'<span class="elfinder-info-spinner"></div>').appendTo(ql.info.find('.elfinder-quicklook-info'));

				url = fm.openUrl(file.hash);
				if (url.indexOf('?') === -1) {
					url += '?_=';
				} else {
					if (m = url.match(/[\?&](_+)=/)) {
						url += '&' + '_'.repeat(m[1].length + 1) + '=';
					} else {
						url += '&_=';
					}
				}
				url += (file.ts || +new Date);
				
				img = $('<img/>')
					.hide()
					.appendTo(preview)
					.on('load', function() {
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
					.on('error', function() {
						loading.remove();
					})
					.attr('src', url);
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
				}).addClass('elfinder-overflow-auto');
				
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
			
		if ((fm.UA.Safari && (fm.OS == 'mac' || fm.UA.iOS)) || fm.UA.IE) {
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
				}).addClass('elfinder-overflow-auto');
				
				node = $('<iframe class="elfinder-quicklook-preview-pdf"/>')
					.hide()
					.appendTo(preview)
					.on('load', function() { 
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

			if (ql.dispInlineRegex.test(file.mime) && ql.support.audio[type]) {
				e.stopImmediatePropagation();
				
				node = $('<audio class="elfinder-quicklook-preview-audio" controls preload="auto" autobuffer><source src="'+ql.fm.openUrl(file.hash)+'" /></audio>')
					.on('change', function(e) {
						// Firefox fire change event on seek or volume change
						e.stopPropagation();
					})
					.appendTo(preview);
				autoplay && node[0].play();
				
				win.on('viewchange.audio', setNavi);
				setNavi();
			}
		}).on('change', function() {
			if (node && node.parent().length) {
				var elm = node[0];
				win.off('viewchange.audio');
				try {
					elm.pause();
					elm.src = '';
					elm.load();
				} catch(e) {}
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
				
			if (ql.dispInlineRegex.test(file.mime) && ql.support.video[type]) {
				e.stopImmediatePropagation();

				ql.hideinfo();
				node = $('<video class="elfinder-quicklook-preview-video" controls preload="auto" autobuffer><source src="'+ql.fm.openUrl(file.hash)+'" /></video>')
					.on('change', function(e) {
						// Firefox fire change event on seek or volume change
						e.stopPropagation();
					})
					.appendTo(preview);
				autoplay && node[0].play();

				win.on('viewchange.video', setNavi);
				setNavi();
			}
		}).on('change', function() {
			if (node && node.parent().length) {
				var elm = node[0];
				win.off('viewchange.video');
				try {
					elm.pause();
					elm.src = '';
					elm.load();
				} catch(e) {}
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
			
			if (ql.dispInlineRegex.test(file.mime) && $.inArray(file.mime, mimes) !== -1) {
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
								try {
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
								} catch (e) {
									loading.remove();
									fm.debug('error', e);
								}
								if (filenames && filenames.length) {
									filenames = $.map(filenames, function(str) {
										return fm.decodeRawString(str);
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
			preview = ql.preview,
			win     = ql.window,
			navi    = ql.navbar,
			node;
			
		preview.on('update', function(e) {
			var win     = ql.window,
				file    = e.file,
				setNavi = function() {
					navi.css('bottom', win.hasClass('elfinder-quicklook-fullscreen')? '56px' : '');
				},
				loading;
			
			if ($.inArray(file.mime, mimes) !== -1) {
				if (file.url == '1') {
					$('<div class="elfinder-quicklook-info-data"><button class="elfinder-info-button">'+fm.i18n('getLink')+'</button></div>').appendTo(ql.info.find('.elfinder-quicklook-info'))
					.on('click', function() {
						var self = $(this);
						self.html('<span class="elfinder-info-spinner">');
						fm.request({
							data : {cmd : 'url', target : file.hash},
							preventDefault : true
						})
						.always(function() {
							self.html('');
						})
						.done(function(data) {
							var rfile = fm.file(file.hash);
							file.url = rfile.url = data.url || '';
							if (file.url) {
								preview.trigger({
									type: 'update',
									file: file,
									forceUpdate: true
								});
							}
						});
					});
				}
				if (file.url !== '' && file.url != '1') {
					e.stopImmediatePropagation();
					preview.one('change', function() {
						win.off('viewchange.googledocs');
						loading.remove();
						node.off('load').remove();
						node = null;
					}).addClass('elfinder-overflow-auto');
					
					loading = $('<div class="elfinder-quicklook-info-data"> '+fm.i18n('nowLoading')+'<span class="elfinder-info-spinner"></div>').appendTo(ql.info.find('.elfinder-quicklook-info'));
					
					node = $('<iframe class="elfinder-quicklook-preview-iframe"/>')
						.css('background-color', 'transparent')
						.appendTo(preview)
						.on('load', function() {
							ql.hideinfo();
							loading.remove();
							$(this).css('background-color', '#fff').show();
						})
						.attr('src', '//docs.google.com/gview?embedded=true&url=' + encodeURIComponent(fm.convAbsUrl(fm.url(file.hash))));
					
					win.on('viewchange.googledocs', setNavi);
					setNavi();
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
(elFinder.prototype.commands.reload = function() {
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
		this.fm.bind('search searchend', function() {
			search = this.type == 'search';
		});
	};
	
	this.fm.bind('contextmenu', function(){
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

}).prototype = { forceLoad : true }; // this is required command


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

		return sel.length == 1 && sel[0].phash && !sel[0].locked  ? 0 : -1;
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
			unselect = function() {
				setTimeout(function() {
					input && input.blur();
				}, 50);
			},
			rest     = function(){
				if (!overlay.is(':hidden')) {
					overlay.addClass('ui-front')
						.elfinderoverlay('hide')
						.off('click', cancel);
				}
				pnode.removeClass('ui-front')
					.css('position', '')
					.off('unselect.'+fm.namespace, unselect);
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
						name   = fm.escape(file.i18 || file.name);

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
			blur = function() {
				var name   = $.trim(input.val()),
				parent = input.parent(),
				valid  = true;

				if (!inError && pnode.length) {
					
					input.off('blur');
					
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
					if (!name || name === '.' || name === '..' || !valid) {
						inError = true;
						fm.error(file.mime === 'directory'? 'errInvDirname' : 'errInvName', {modal: true, close: select});
						return false;
					}
					if (fm.fileByName(name, file.phash)) {
						inError = true;
						fm.error(['errExists', name], {modal: true, close: select});
						return false;
					}
					
					rest();
					
					(navbar? input : node).html(fm.escape(name));
					fm.lockfiles({files : [file.hash]});
					fm.request({
							data   : {cmd : 'rename', target : file.hash, name : name},
							notify : {type : 'rename', cnt : 1}
						})
						.fail(function(error) {
							dfrd.reject();
							if (! error || ! Array.isArray(error) || error[0] !== 'errRename') {
								fm.sync();
							}
						})
						.done(function(data) {
							dfrd.resolve(data);
							if (!navbar && data && data.added && data.added[0]) {
								var newItem = fm.findCwdNodes(data.added);
								if (newItem.length) {
									newItem.trigger('scrolltoview');
								}
							}
						})
						.always(function() {
							fm.unlockfiles({files : [file.hash]})
						});
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
				.on('keydown', function(e) {
					e.stopImmediatePropagation();
					if (e.keyCode == $.ui.keyCode.ESCAPE) {
						dfrd.reject();
					} else if (e.keyCode == $.ui.keyCode.ENTER) {
						e.preventDefault();
						input.blur();
					}
				})
				.on('mousedown click dblclick', function(e) {
					// click for touch device
					e.stopPropagation();
					if (e.type === 'dblclick') {
						e.preventDefault();
					}
				})
				.on('blur', blur),
			select = function() {
				var name = input.val().replace(/\.((tar\.(gz|bz|bz2|z|lzo))|cpio\.gz|ps\.gz|xcf\.(gz|bz2)|[a-z0-9]{1,4})$/ig, '');
				if (inError) {
					inError = false;
					input.on('blur', blur);
				}
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
			overlay = fm.getUI('overlay'),
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
		
		pnode.addClass('ui-front')
			.css('position', 'relative')
			.on('unselect.'+fm.namespace, unselect);
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
		
		if (cnt > 1) {
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
		return sel.length == 1 && sel[0].read && sel[0].write && sel[0].mime.indexOf('image/') !== -1 ? 0 : -1;
	};
	
	this.resizeRequest = function(data, file, dfrd) {
		var fm   = this.fm,
			file = file || fm.file(data.target),
			src  = file? fm.openUrl(file.hash) : null,
			tmb  = file? file.tmb : null,
			enabled = fm.isCommandEnabled('resize', data.target);
		
		if (enabled && (! file || (file && file.read && file.write && file.mime.indexOf('image/') !== -1 ))) {
			return fm.request({
				data : Object.assign(data, {
					cmd : 'resize'
				}),
				notify : {type : 'resize', cnt : 1},
				prepare : function(data) {
					var newfile;
					if (data) {
						if (data.added && data.added.length && data.added[0].tmb) {
							newfile = data.added[0];
						} else if (data.changed && data.changed.length && data.changed[0].tmb) {
							newfile = data.changed[0];
						}
						if (newfile) {
							file = newfile;
							src = fm.openUrl(file.hash);
							if (file.tmb && file.tmb != '1' && (file.tmb === tmb)) {
								file.tmb = '';
								return;
							}
						}
					}
					tmb = '';
				}
			})
			.fail(function(error) {
				if (dfrd) {
					dfrd.reject(error);
				}
			})
			.done(function() {
				var url = (file.url != '1')? fm.url(file.hash) : '';
				
				// need tmb reload
				if (tmb) {
					fm.one('resizedone', function() {
						fm.reloadContents(fm.tmb(file).url).done(function() {
							fm.trigger('tmbreload', {files: [ {hash: file.hash, tmb: tmb} ]});
						});
					});
				}
				
				fm.reloadContents(src);
				if (url && url !== src) {
					fm.reloadContents(url);
				}
				
				dfrd && dfrd.resolve();
			});
		} else {
			var error;
			
			if (file) {
				if (file.mime.indexOf('image/') === -1) {
					error = ['errResize', file.name, 'errUsupportType'];
				} else {
					error = ['errResize', file.name, 'errPerm'];
				}
			} else {
				error = ['errResize', data.target, 'errPerm'];
			}
			
			if (dfrd) {
				dfrd.reject(error);
			} else {
				fm.error(error);
			}
			return $.Deferred().reject(error);
		}
	}
	
	this.exec = function(hashes) {
		var self  = this,
			fm    = this.fm,
			files = this.files(hashes),
			dfrd  = $.Deferred(),
			api2  = (fm.api > 1),
			dialogWidth = 650,
			fmnode = fm.getUI(),
			ctrgrup = $().controlgroup? 'controlgroup' : 'buttonset',
			grid8Def = typeof this.options.grid8px === 'undefind' || this.options.grid8px !== 'disable'? true : false,
			
			open = function(file, id) {
				var isJpeg   = (file.mime === 'image/jpeg'),
					dialog   = $('<div class="elfinder-dialog-resize '+fm.res('class', 'editing')+'"/>'),
					input    = '<input type="text" size="5"/>',
					row      = '<div class="elfinder-resize-row"/>',
					label    = '<div class="elfinder-resize-label"/>',
					control  = $('<div class="elfinder-resize-control"/>')
						.on('focus', 'input[type=text]', function() {
							$(this).select();
						}),
					preview  = $('<div class="elfinder-resize-preview"/>')
						.on('touchmove', function(e) {
							e.stopPropagation();
							e.preventDefault();
						}),
					spinner  = $('<div class="elfinder-resize-spinner">'+fm.i18n('ntfloadimg')+'</div>'),
					rhandle  = $('<div class="elfinder-resize-handle touch-punch"/>'),
					rhandlec = $('<div class="elfinder-resize-handle touch-punch"/>'),
					uiresize = $('<div class="elfinder-resize-uiresize"/>'),
					uicrop   = $('<div class="elfinder-resize-uicrop"/>'),
					uirotate = $('<div class="elfinder-resize-rotate"/>'),
					uideg270 = $('<button/>').attr('title',fm.i18n('rotate-cw')).append($('<span class="elfinder-button-icon elfinder-button-icon-rotate-l"/>')),
					uideg90  = $('<button/>').attr('title',fm.i18n('rotate-ccw')).append($('<span class="elfinder-button-icon elfinder-button-icon-rotate-r"/>')),
					uiprop   = $('<span />'),
					reset    = $('<button class="elfinder-resize-reset">').text(fm.i18n('reset'))
						.on('click', function() {
							resetView();
						})
						.button({
							icons: {
								primary: 'ui-icon-arrowrefresh-1-n'
							},
							text: false
						}),
					uitype   = $('<div class="elfinder-resize-type"/>')
						.append('<input class="" type="radio" name="type" id="'+id+'-resize" value="resize" checked="checked" /><label for="'+id+'-resize">'+fm.i18n('resize')+'</label>',
						'<input class="api2" type="radio" name="type" id="'+id+'-crop" value="crop" /><label class="api2" for="'+id+'-crop">'+fm.i18n('crop')+'</label>',
						'<input class="api2" type="radio" name="type" id="'+id+'-rotate" value="rotate" /><label class="api2" for="'+id+'-rotate">'+fm.i18n('rotate')+'</label>'),
					mode     = 'resize',
					type     = uitype[ctrgrup]()[ctrgrup]('disable').find('input')
						.change(function() {
							mode = $(this).val();
							
							resetView();
							resizable(true);
							croppable(true);
							rotateable(true);
							
							if (mode == 'resize') {
								uiresize.show();
								uirotate.hide();
								uicrop.hide();
								resizable();
								isJpeg && grid8px.insertAfter(uiresize.find('.elfinder-resize-grid8'));
							}
							else if (mode == 'crop') {
								uirotate.hide();
								uiresize.hide();
								uicrop.show();
								croppable();
								isJpeg && grid8px.insertAfter(uicrop.find('.elfinder-resize-grid8'));
							} else if (mode == 'rotate') {
								uiresize.hide();
								uicrop.hide();
								uirotate.show();
								rotateable();
							}
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
					offsetX = $(input).change(function(){crop.updateView('w');}),
					offsetY = $(input).change(function(){crop.updateView('h');}),
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
					uidegslider = $('<div class="elfinder-resize-rotate-slider touch-punch"/>')
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
						}).find('.ui-slider-handle')
							.addClass('elfinder-tabstop')
							.off('keydown')
							.on('keydown', function(e) {
								if (e.keyCode == $.ui.keyCode.LEFT || e.keyCode == $.ui.keyCode.RIGHT) {
									e.stopPropagation();
									e.preventDefault();
									rotate.update(Number(degree.val()) + (e.keyCode == $.ui.keyCode.RIGHT? 1 : -1), false);
								}
							})
						.end(),
					pickcanv,
					pickctx,
					pickc = {},
					pick = function(e) {
						var color, r, g, b, h, s, l;

						try {
							color = pickc[Math.round(e.offsetX)][Math.round(e.offsetY)];
						} catch(e) {}
						if (!color) return;

						r = color[0]; g = color[1]; b = color[2];
						h = color[3]; s = color[4]; l = color[5];

						setbg(r, g, b, (e.type === 'click'));
					},
					palpick = function(e) {
						setbg($(this).css('backgroundColor'), '', '', (e.type === 'click'));
					},
					setbg = function(r, g, b, off) {
						var s, m, cc;
						if (typeof r === 'string') {
							g = '';
							if (r && (s = $('<span>').css('backgroundColor', r).css('backgroundColor')) && (m = s.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i))) {
								r = Number(m[1]);
								g = Number(m[2]);
								b = Number(m[3]);
							}
						}
						cc = (g === '')? r : '#' + getColorCode(r, g, b);
						bg.val(cc).css({ backgroundColor: cc, backgroundImage: 'none', color: (r+g+b < 384? '#fff' : '#000') });
						preview.css('backgroundColor', cc);
						if (off) {
							imgr.off('.picker').removeClass('elfinder-resize-picking');
							pallet.off('.picker').removeClass('elfinder-resize-picking');
						}
					},
					getColorCode = function(r, g, b) {
						return $.map([r,g,b], function(c){return ('0'+parseInt(c).toString(16)).slice(-2);}).join('');
					},
					picker = $('<button>').text(fm.i18n('colorPicker'))
					.on('click', function() { 
						imgr.on('mousemove.picker click.picker', pick).addClass('elfinder-resize-picking');
						pallet.on('mousemove.picker click.picker', 'span', palpick).addClass('elfinder-resize-picking');
					})
					.button({
						icons: {
							primary: 'ui-icon-pin-s'
						},
						text: false
					}),
					reseter = $('<button>').text(fm.i18n('reset'))
						.on('click', function() { 
							setbg('', '', '', true);
						})
						.button({
							icons: {
								primary: 'ui-icon-arrowrefresh-1-n'
							},
							text: false
						}),
					bg = $('<input class="elfinder-resize-bg" type="text">')
						.on('focus', function() {
							$(this).attr('style', '');
						})
						.on('blur', function() {
							setbg($(this).val());
						}),
					pallet  = $('<div class="elfinder-resize-pallet">').on('click', 'span', function() {
						setbg($(this).css('backgroundColor'));
					}),
					ratio   = 1,
					prop    = 1,
					owidth  = 0,
					oheight = 0,
					cratio  = true,
					cratioc = false,
					pwidth  = 0,
					pheight = 0,
					rwidth  = 0,
					rheight = 0,
					rdegree = 0,
					grid8   = isJpeg? grid8Def : false,
					constr  = $('<button>').html(fm.i18n('aspectRatio'))
						.on('click', function() {
							cratio = ! cratio;
							constr.button('option', {
								icons : { primary: cratio? 'ui-icon-locked' : 'ui-icon-unlocked'}
							});
							resize.fixHeight();
							rhandle.resizable('option', 'aspectRatio', cratio).data('uiResizable')._aspectRatio = cratio;
						})
						.button({
							icons : {
								primary: cratio? 'ui-icon-locked' : 'ui-icon-unlocked'
							},
							text: false
						}),
					constrc = $('<button>').html(fm.i18n('aspectRatio'))
						.on('click', function() {
							cratioc = ! cratioc;
							constrc.button('option', {
								icons : { primary: cratioc? 'ui-icon-locked' : 'ui-icon-unlocked'}
							});
							rhandlec.resizable('option', 'aspectRatio', cratioc).data('uiResizable')._aspectRatio = cratioc;
						})
						.button({
							icons : {
								primary: cratioc? 'ui-icon-locked' : 'ui-icon-unlocked'
							},
							text: false
						}),
					grid8px = $('<button>').html(fm.i18n(grid8? 'enabled' : 'disabled')).toggleClass('ui-state-active', grid8)
						.on('click', function() {
							grid8 = ! grid8;
							grid8px.html(fm.i18n(grid8? 'enabled' : 'disabled')).toggleClass('ui-state-active', grid8);
							if (grid8) {
								width.val(round(width.val()));
								height.val(round(height.val()));
								offsetX.val(round(offsetX.val()));
								offsetY.val(round(offsetY.val()));
								pointX.val(round(pointX.val()));
								pointY.val(round(pointY.val()));
								if (uiresize.is(':visible')) {
									resize.updateView(width.val(), height.val());
								} else if (uicrop.is(':visible')) {
									crop.updateView();
								}
							}
						})
						.button(),
					setuprimg = function() {
						var r_scale;
						r_scale = Math.min(pwidth, pheight) / Math.sqrt(Math.pow(owidth, 2) + Math.pow(oheight, 2));
						rwidth = Math.ceil(owidth * r_scale);
						rheight = Math.ceil(oheight * r_scale);
						imgr.width(rwidth)
							.height(rheight)
							.css('margin-top', (pheight-rheight)/2 + 'px')
							.css('margin-left', (pwidth-rwidth)/2 + 'px');
						if (imgr.is(':visible') && bg.is(':visible')) {
							if (file.mime !== 'image/png') {
								preview.css('backgroundColor', bg.val());
								setTimeout(function() {
									if (pickcanv && pickcanv.width !== rwidth) {
										setColorData();
									}
								}, 0);
							} else {
								bg.parent().hide();
								pallet.hide()
							}
						}
					},
					setupimg = function() {
						resize.updateView(owidth, oheight);
						setuprimg();
						basec
							.width(img.width())
							.height(img.height());
						imgc
							.width(img.width())
							.height(img.height());
						crop.updateView();
					},
					setColorData = function() {
						if (pickctx) {
							var n, w, h, r, g, b, a, s, l, hsl, hue,
								data, scale, tx1, tx2, ty1, ty2, rgb,
								domi = {},
								domic = [],
								domiv, palc,
								rgbToHsl = function (r, g, b) {
									var h, s, l,
										max = Math.max(Math.max(r, g), b),
										min = Math.min(Math.min(r, g), b);
		
									// Hue, 0 ~ 359
									if (max === min) {
										h = 0;
									} else if (r === max) {
										h = ((g - b) / (max - min) * 60 + 360) % 360;
									} else if (g === max) {
										h = (b - r) / (max - min) * 60 + 120;
									} else if (b === max) {
										h = (r - g) / (max - min) * 60 + 240;
									}
									// Saturation, 0 ~ 1
									s = (max - min) / max;
									// Lightness, 0 ~ 1
									l = (r *  0.3 + g * 0.59 + b * 0.11) / 255;
		
									return [h, s, l, 'hsl'];
								};
							
							calc:
							try {
								w = pickcanv.width = imgr.width();
								h = pickcanv.height = imgr.height();
								scale = w / owidth;
								pickctx.scale(scale, scale);
								pickctx.drawImage(imgr.get(0), 0, 0);
			
								data = pickctx.getImageData(0, 0, w, h).data;
			
								// Range to detect the dominant color
								tx1 = w * .1;
								tx2 = w * .9;
								ty1 = h * .1;
								ty2 = h * .9;
			
								for (var y = 0; y < h - 1; y++) {
									for (var x = 0; x < w - 1; x++) {
										n = x * 4 + y * w * 4;
										// RGB
										r = data[n]; g = data[n + 1]; b = data[n + 2]; a = data[n + 3];
										// check alpha ch
										if (a !== 255) {
											bg.parent().hide();
											pallet.hide();
											break calc;
										}
										// HSL
										hsl = rgbToHsl(r, g, b);
										hue = Math.round(hsl[0]); s = Math.round(hsl[1] * 100); l = Math.round(hsl[2] * 100);
										if (! pickc[x]) {
											pickc[x] = {};
										}
										// set pickc
										pickc[x][y] = [r, g, b, hue, s, l];
										// detect the dominant color
										if ((x < tx1 || x > tx2) && (y < ty1 || y > ty2)) {
											rgb = r + ',' + g + ',' + b;
											if (! domi[rgb]) {
												domi[rgb] = 1;
											} else {
												++domi[rgb];
											}
										}
									}
								}
								
								if (! pallet.children(':first').length) {
									palc = 1;
									$.each(domi, function(c, v) {
										domic.push({c: c, v: v});
									});
									$.each(domic.sort(function(a, b) {
										return (a.v > b.v)? -1 : 1;
									}), function() {
										if (this.v < 2 || palc > 10) {
											return false;
										}
										pallet.append($('<span style="width:20px;height:20px;display:inline-block;background-color:rgb('+this.c+');">'));
										++palc;
									});
								}
							} catch(e) {
								picker.hide();
								pallet.hide();
							}
						}
					},
					setupPicker = function() {
						try {
							pickcanv = document.createElement('canvas');
							pickctx = pickcanv.getContext('2d');
						} catch(e) {
							picker.hide();
							pallet.hide();
						}
					},
					img     = $('<img/>')
						.on('load', function() {
							owidth  = img.get(0).width || img.width();
							oheight = img.get(0).height || img.height();
							
							dMinBtn.show();

							var r_scale, inputFirst,
								imgRatio = oheight / owidth;
							
							if (imgRatio < 1 && preview.height() > preview.width() * imgRatio) {
								preview.height(preview.width() * imgRatio);
							}
							
							if (preview.height() > img.height() + 20) {
								preview.height(img.height() + 20);
							}
							
							pheight = preview.height() - (rhandle.outerHeight() - rhandle.height());
							
							spinner.remove();
							
							ratio   = owidth/oheight;

							rhandle.append(img.show()).show();
							width.val(owidth);
							height.val(oheight);

							setupPicker();
							setupimg();
							
							uitype[ctrgrup]('enable');
							inputFirst = control.find('input,select').prop('disabled', false)
								.filter(':text').on('keydown', function(e) {
									if (e.keyCode == $.ui.keyCode.ENTER) {
										e.stopPropagation();
										e.preventDefault();
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
												callback : function(){
													$(this).focus();
												}
											}
										});
										return;
									}
								})
								.on('keyup', function() {
									var $this = $(this);
									if (! $this.hasClass('elfinder-resize-bg')) {
										setTimeout(function() {
											$this.val($this.val().replace(/[^0-9]/g, ''));
										}, 10);
									}
								})
								.filter(':first');
								
							!fm.UA.Mobile && inputFirst.focus();
							resizable();
						})
						.on('error', function() {
							spinner.text('Unable to load image').css('background', 'transparent');
						}),
					basec = $('<div/>'),
					imgc = $('<img/>'),
					coverc = $('<div/>'),
					imgr = $('<img class="elfinder-resize-imgrotate" />'),
					round = function(v, max) {
						v = grid8? Math.round(v/8)*8 : Math.round(v);
						v = Math.max(0, v);
						if (max && v > max) {
							v = grid8? Math.floor(max/8)*8 : max;
						}
						return v;
					},
					resetView = function() {
						width.val(owidth);
						height.val(oheight);
						resize.updateView(owidth, oheight);
						pointX.val(0);
						pointY.val(0);
						offsetX.val(owidth);
						offsetY.val(oheight);
						crop.updateView();
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
								h = round(w/ratio);
								resize.updateView(w, h);
								height.val(h);
							}
						}
					},
					crop = {
						update : function(change) {
							pointX.val(round(((rhandlec.data('x')||rhandlec.position().left))/prop, owidth));
							pointY.val(round(((rhandlec.data('y')||rhandlec.position().top))/prop, oheight));
							if (change !== 'xy') {
								offsetX.val(round((rhandlec.data('w')||rhandlec.width())/prop, owidth - pointX.val()));
								offsetY.val(round((rhandlec.data('h')||rhandlec.height())/prop, oheight - pointY.val()));
							}
						},
						updateView : function(change) {
							var r, x, y, w, h;
							
							pointX.val(round(pointX.val(), owidth - (grid8? 8 : 1)));
							pointY.val(round(pointY.val(), oheight - (grid8? 8 : 1)));
							offsetX.val(round(offsetX.val(), owidth - pointX.val()));
							offsetY.val(round(offsetY.val(), oheight - pointY.val()));
							
							if (cratioc) {
								r = coverc.width() / coverc.height();
								if (change === 'w') {
									offsetY.val(round(parseInt(offsetX.val()) / r));
								} else if (change === 'h') {
									offsetX.val(round(parseInt(offsetY.val()) * r));
								}
							}
							x = Math.round(parseInt(pointX.val()) * prop);
							y = Math.round(parseInt(pointY.val()) * prop);
							if (change !== 'xy') {
								w = Math.round(parseInt(offsetX.val()) * prop);
								h = Math.round(parseInt(offsetY.val()) * prop);
							} else {
								w = rhandlec.data('w');
								h = rhandlec.data('h');
							}
							rhandlec.data({x: x, y: y, w: w, h: h})
								.width(w)
								.height(h)
								.css({left: x, top: y});
							coverc.width(w)
								.height(h);
						},
						resize_update : function(e, ui) {
							rhandlec.data({x: ui.position.left, y: ui.position.top, w: ui.size.width, h: ui.size.height});
							crop.update();
							crop.updateView();
						},
						drag_update : function(e, ui) {
							rhandlec.data({x: ui.position.left, y: ui.position.top});
							crop.update('xy');
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
								dinit();
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
								basec.show();
								
								rhandlec
									.resizable({
										containment : basec,
										aspectRatio : cratioc,
										resize      : crop.resize_update,
										handles     : 'all'
									})
									.draggable({
										handle      : coverc,
										containment : imgc,
										drag        : crop.drag_update,
										stop        : function() { crop.updateView('xy'); }
									});
								
								dinit();
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
								imgr.show();
								dinit();

							}
						}
					},
					save = function() {
						var w, h, x, y, d, q, b = '';
						
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
								return fm.error('errResizeNoChange');
							}
							b = bg.val();
						}
						q = quality? parseInt(quality.val()) : 0;
						
						if (mode != 'rotate') {

							if (w <= 0 || h <= 0) {
								return fm.error('Invalid image size');
							}
							
							if (w == owidth && h == oheight) {
								return fm.error('errResizeNoChange');
							}

						}
						
						dialog.elfinderdialog('close');
						
						self.resizeRequest({
							target : file.hash,
							width  : w,
							height : h,
							x      : x,
							y      : y,
							degree : d,
							quality: q,
							bg     : b,
							mode   : mode
						}, file, dfrd);
					},
					buttons = {},
					hline   = 'elfinder-resize-handle-hline',
					vline   = 'elfinder-resize-handle-vline',
					rpoint  = 'elfinder-resize-handle-point',
					src     = fm.openUrl(file.hash, fm.isCORS? true : false),
					dinit   = function() {
						if (base.hasClass('elfinder-dialog-minimized')) {
							return;
						}
						var dw,
							winH  = $(window).height(),
							winW  = $(window).width(),
							ctrW  = dialog.find('div.elfinder-resize-control').width(),
							prvW  = preview.width(),
							baseW = base.width();
						
						base.width(Math.min(dialogWidth, winW - 30));
						preview.attr('style', '');
						if (owidth && oheight) {
							pwidth  = preview.width()  - (rhandle.outerWidth()  - rhandle.width());
							pheight = preview.height() - (rhandle.outerHeight() - rhandle.height());
							resize.updateView(owidth, oheight);
						}
						prvW  = preview.width(),
						
						dw = dialog.width() - 20;
						if (prvW > dw) {
							preview.width(dw);
						} else if ((dw - prvW) < ctrW) {
							if (winW > winH) {
								preview.width(dw - ctrW - 20);
							} else {
								preview.css({ float: 'none', marginLeft: 'auto', marginRight: 'auto'});
							}
						}
						pwidth  = preview.width()  - (rhandle.outerWidth()  - rhandle.width());
						if (fmnode.hasClass('elfinder-fullscreen')) {
							if (base.height() > winH) {
								winH -= 2;
								preview.height(winH - base.height() + preview.height());
								base.css('top', 0 - fmnode.offset().top);
							}
						} else {
							winH -= 30;
							(preview.height() > winH) && preview.height(winH);
						}
						pheight = preview.height() - (rhandle.outerHeight() - rhandle.height());
						if (owidth && oheight) {
							setupimg();
						}
						if (img.height() && preview.height() > img.height() + 20) {
							preview.height(img.height() + 20);
							pheight = preview.height() - (rhandle.outerHeight() - rhandle.height());
							setuprimg();
						}
					},
					dMinBtn, base;
				
				if (fm.isCORS) {
					img.attr('crossorigin', 'use-credentials');
					imgc.attr('crossorigin', 'use-credentials');
					imgr.attr('crossorigin', 'use-credentials');
				}
				imgr.mousedown( rotate.start );
				$(document).mouseup( rotate.stop );
					
				uiresize.append(
					$(row).append($(label).text(fm.i18n('width')), width),
					$(row).append($(label).text(fm.i18n('height')), height, $('<div class="elfinder-resize-whctrls">').append(constr, reset)),
					(quality? $(row).append($(label).text(fm.i18n('quality')), quality, $('<span/>').text(' (1-100)')) : $()),
					(isJpeg? $(row).append($(label).text(fm.i18n('8pxgrid')).addClass('elfinder-resize-grid8'), grid8px) : $()),
					$(row).append($(label).text(fm.i18n('scale')), uiprop)
				);

				if (api2) {
					uicrop.append(
						$(row).append($(label).text('X'), pointX),
						$(row).append($(label).text('Y')).append(pointY),
						$(row).append($(label).text(fm.i18n('width')), offsetX),
						$(row).append($(label).text(fm.i18n('height')), offsetY, $('<div class="elfinder-resize-whctrls">').append(constrc, reset.clone(true))),
						(quality? $(row).append($(label).text(fm.i18n('quality')), quality.clone(true), $('<span/>').text(' (1-100)')) : $()),
						(isJpeg? $(row).append($(label).text(fm.i18n('8pxgrid')).addClass('elfinder-resize-grid8')) : $())
					);
					
					uirotate.append(
						$(row).addClass('elfinder-resize-degree').append(
							$(label).text(fm.i18n('rotate')),
							degree,
							$('<span/>').text(fm.i18n('degree')),
							$('<div/>').append(uideg270, uideg90)[ctrgrup]()
						),
						$(row).css('height', '20px').append(uidegslider),
						(quality? $(row).addClass('elfinder-resize-quality').append(
							$(label).text(fm.i18n('quality')),
							quality.clone(true),
							$('<span/>').text(' (1-100)')) : $()
						),
						$(row).append($(label).text(fm.i18n('bgcolor')), bg, picker, reseter),
						$(row).css('height', '20px').append(pallet)
					);
					uideg270.on('click', function() {
						rdegree = rdegree - 90;
						rotate.update(rdegree);
					});
					uideg90.on('click', function(){
						rdegree = rdegree + 90;
						rotate.update(rdegree);
					});
				}
				
				dialog.append(uitype).on('resize', function(e){
					e.stopPropagation();
				});

				if (api2) {
					control.append($(row), uiresize, uicrop.hide(), uirotate.hide());
				} else {
					control.append($(row), uiresize);
				}
				
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
				
				dialog.find('input,button').addClass('elfinder-tabstop');
				
				base = fm.dialog(dialog, {
					title          : fm.escape(file.name),
					width          : dialogWidth,
					resizable      : false,
					buttons        : buttons,
					open           : function() {
						dMinBtn = base.find('.ui-dialog-titlebar .elfinder-titlebar-minimize').hide();
						fm.bind('resize', dinit);
						img.attr('src', src + (src.indexOf('?') === -1 ? '?' : '&')+'_='+Math.random());
						imgc.attr('src', img.attr('src'));
						imgr.attr('src', img.attr('src'));
					},
					close          : function() {
						fm.unbind('resize', dinit);
						$(this).elfinderdialog('destroy');
					},
					resize         : function(e, data) {
						if (data && data.minimize === 'off') {
							dinit();
						}
					}
				}).attr('id', id).parent();
				
				// for IE < 9 dialog mising at open second+ time.
				if (fm.UA.ltIE8) {
					$('.elfinder-dialog').css('filter', '');
				}
				
				coverc.css({ 'opacity': 0.2, 'background-color': '#fff', 'position': 'absolute'}),
				rhandlec.css('cursor', 'move');
				rhandlec.find('.elfinder-resize-handle-point').css({
					'background-color' : '#fff',
					'opacity': 0.5,
					'border-color':'#000'
				});

				if (! api2) {
					uitype.find('.api2').remove();
				}
				
				control.find('input,select').prop('disabled', true);

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
 * File: /js/commands/restore.js
 */

/**
 * @class  elFinder command "restore"
 * Restore items from the trash
 *
 * @author Naoki Sawada
 **/
elFinder.prototype.commands.restore = function() {
	var self = this,
		fm = this.fm,
		getFilesRecursively = function(files) {
			var dfd = $.Deferred(),
				dirs = [],
				results = [],
				reqs = [];
			
			$.each(files, function(i, f) {
				f.mime === 'directory'? dirs.push(f) : results.push(f);
			});
			
			if (dirs.length) {
				$.each(dirs, function(i, d) {
					reqs.push(fm.request({
						data : {cmd  : 'open', target : d.hash},
						preventDefault : true,
						asNotOpen : true
					}));
				});
				$.when.apply($, reqs).fail(function() {
					dfd.reject();
				}).done(function() {
					var items = [];
					$.each(arguments, function(i, r) {
						var files;
						if (r.files) {
							items = items.concat(r.files);
						}
					});
					fm.cache(items);
					getFilesRecursively(items).done(function(res) {
						results = results.concat(res);
						dfd.resolve(results);
					});
				});
			} else {
				dfd.resolve(results);
			}
			
			return dfd.promise();
		},
		restore = function(dfrd, files, targets) {
			var rHashes = {},
				others = [],
				found = false,
				dirs = [],
				tm;
			
			fm.lockfiles({files : targets});
			
			dirs = $.map(files, function(f) {
				return f.mime === 'directory'? f.hash : null;
			});
			
			dfrd.done(function() {
				dirs && fm.exec('rm', dirs, {forceRm : true, quiet : true});
			}).always(function() {
				fm.unlockfiles({files : targets});
			});
			
			tm = setTimeout(function() {
				fm.notify({type : 'search', cnt : 1, hideCnt : true});
			}, fm.notifyDelay);
			
			
			getFilesRecursively(files).always(function() {
				tm && clearTimeout(tm);
				fm.notify({type : 'search', cnt : -1, hideCnt : true});
			}).fail(function() {
				dfrd.reject('errRestore', 'errFileNotFound');
			}).done(function(res) {
				var errFolderNotfound = ['errRestore', 'errFolderNotFound'],
					dirTop = '';
				
				if (res.length) {
					$.each(res, function(i, f) {
						var phash = f.phash,
							pfile,
							srcRoot, tPath;
						while(phash) {
							if (srcRoot = fm.trashes[phash]) {
								if (! rHashes[srcRoot]) {
									if (found) {
										// Keep items of other trash
										others.push(f.hash);
										return null; // continue $.each
									}
									rHashes[srcRoot] = {};
									found = true;
								}
		
								tPath = fm.path(f.hash).substr(fm.path(phash).length).replace(/\\/g, '/');
								tPath = tPath.replace(/\/[^\/]+?$/, '');
								if (tPath === '') {
									tPath = '/';
								}
								if (!rHashes[srcRoot][tPath]) {
									rHashes[srcRoot][tPath] = [];
								}
								rHashes[srcRoot][tPath].push(f.hash);
								if (!dirTop || dirTop.length > tPath.length) {
									dirTop = tPath;
								}
								break;
							}
							
							// Go up one level for next check
							pfile = fm.file(phash);
							
							if (!pfile) {
								phash = false;
								// Detection method for search results
								$.each(fm.trashes, function(ph) {
									var file = fm.file(ph),
										filePath = fm.path(ph);
									if ((!file.volumeid || f.hash.indexOf(file.volumeid) === 0) && fm.path(f.hash).indexOf(filePath) === 0) {
										phash = ph;
										return false;
									}
								});
							} else {
								phash = pfile.phash;
							}
						}
					});
					if (found) {
						$.each(rHashes, function(src, dsts) {
							var dirs = Object.keys(dsts),
								cnt = dirs.length;
							fm.request({
								data   : {cmd  : 'mkdir', target : src, dirs : dirs}, 
								notify : {type : 'chkdir', cnt : cnt},
								preventFail : true
							}).fail(function(error) {
								dfrd.reject(error);
								fm.unlockfiles({files : targets});
							}).done(function(data) {
								var cmdPaste, hashes;
								
								if (hashes = data.hashes) {
									cmdPaste = fm.getCommand('paste');
									if (cmdPaste) {
										// wait until file cache made
										fm.one('mkdirdone', function() {
											var hasErr = false;
											$.each(dsts, function(dir, files) {
												if (hashes[dir]) {
													if (fm.file(hashes[dir])) {
														fm.clipboard(files, true);
														cmdPaste.exec([ hashes[dir] ], {_cmd : 'restore', noToast : dir !== dirTop})
														.done(function(data) {
															if (data && (data.error || data.warning)) {
																hasErr = true;
															}
														})
														.fail(function() {
															hasErr = true;
														})
														.always(function() {
															if (--cnt < 1) {
																dfrd[hasErr? 'reject' : 'resolve']();
																if (others.length) {
																	// Restore items of other trash
																	fm.exec('restore', others);
																}
															}
														});
													} else {
														dfrd.reject(errFolderNotfound);
													}
												}
											});
										});
									} else {
										dfrd.reject(['errRestore', 'errCmdNoSupport', '(paste)']);
									}
								} else {
									dfrd.reject(errFolderNotfound);
								}
							});
						});
					} else {
						dfrd.reject(errFolderNotfound);
					}
				} else {
					dfrd.reject('errFileNotFound');
					dirs && fm.exec('rm', dirs, {forceRm : true, quiet : true});
				}
			});
		};
	
	this.updateOnSelect  = false;
	this.shortcuts = [{
		pattern     : 'ctrl+z'
	}];
	
	this.getstate = function(sel, e) {
		sel = sel || fm.selected();
		return sel.length && $.map(sel, function(h) {var f = fm.file(h); return f && ! f.locked && ! fm.isRoot(f)? h : null }).length == sel.length
			? 0 : -1;
	}
	
	this.exec = function(hashes) {
		var dfrd   = $.Deferred()
				.fail(function(error) {
					error && fm.error(error);
				}),
			files  = self.files(hashes);

		if (! files.length) {
			return dfrd.reject();
		}
		
		$.each(files, function(i, file) {
			if (fm.isRoot(file)) {
				return !dfrd.reject(['errRestore', file.name]);
			}
			if (file.locked) {
				return !dfrd.reject(['errLocked', file.name]);
			}
		});

		if (dfrd.state() === 'pending') {
			restore(dfrd, files, hashes);
		}
			
		return dfrd;
	}

};


/*
 * File: /js/commands/rm.js
 */

/**
 * @class  elFinder command "rm"
 * Delete files
 *
 * @author Dmitry (dio) Levashov
 * @author Naoki Sawada
 **/
elFinder.prototype.commands.rm = function() {
	var self = this,
		fm = this.fm,
		tpl = '<div class="ui-helper-clearfix elfinder-rm-title"><span class="elfinder-cwd-icon {class} ui-corner-all"/>{title}<div class="elfinder-rm-desc">{desc}</div></div>',
		confirm = function(dfrd, targets, files, tHash, addTexts) {
			var cnt = targets.length,
				cwd = fm.cwd().hash,
				descs = [],
				dialog, text, tmb, size, f, fname;
			
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
			
			if (addTexts) {
				text = text.concat(addTexts);
			}
			
			text.push(tHash? 'confirmTrash' : 'confirmRm');
			
			dialog = fm.confirm({
				title  : self.title,
				text   : text,
				accept : {
					label    : 'btnRm',
					callback : function() {  
						if (tHash) {
							toTrash(dfrd, targets, tHash);
						} else {
							remove(dfrd, targets);
						}
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
					.on('load', function() { dialog.find('.elfinder-cwd-icon').addClass(tmb.className).css('background-image', "url('"+tmb.url+"')"); })
					.attr('src', tmb.url);
			}
		},
		toTrash = function(dfrd, targets, tHash) {
			var dsts = {},
				dirs, cnt;
			
			$.each(targets, function(i, h) {
				var path = fm.path(h).replace(/\\/g, '/'),
					m = path.match(/^[^\/]+?(\/(?:[^\/]+?\/)*)[^\/]+?$/);
				
				if (m) {
					m[1] = m[1].replace(/(^\/.*?)\/?$/, '$1');
					if (! dsts[m[1]]) {
						dsts[m[1]] = [];
					}
					dsts[m[1]].push(h);
				}
			});
			
			dirs = Object.keys(dsts);
			cnt = dirs.length;
			if (cnt) {
				fm.request({
					data   : {cmd  : 'mkdir', target : tHash, dirs : dirs}, 
					notify : {type : 'chkdir', cnt : cnt},
					preventFail : true
				})
				.fail(function(error) {
					dfrd.reject(error);
					fm.unlockfiles({files : targets});
				})
				.done(function(data) {
					var margeRes = function(data) {
							$.each(data, function(k, v) {
								if (Array.isArray(v)) {
									if (res[k]) {
										res[k] = res[k].concat(v);
									} else {
										res[k] = v;
									}
								}
							});
							if (data.sync) {
								res.sync = 1;
							}
						},
						err = ['errTrash'],
						res = {},
						hasNtf = function() {
							return fm.ui.notify.children('.elfinder-notify-trash').length;
						},
						hashes, hasNtf, tm, prg, prgSt;
					
					if (hashes = data.hashes) {
						prg = 1 / cnt * 100;
						prgSt = 1;
						tm = setTimeout(function() {
							fm.notify({type : 'trash', cnt : 1, hideCnt : true, progress : prgSt});
						}, fm.notifyDelay);
						$.each(dsts, function(dir, files) {
							if (hashes[dir]) {
								fm.request({
									data   : {cmd : 'paste', dst : hashes[dir], targets : files, cut : 1},
									preventDefault : true
								})
								.fail(function(error) {
									if (error) {
										err = err.concat(error);
									}
								})
								.done(function(data) {
									margeRes(data);
									if (data.warning) {
										err = err.concat(data.warning);
										delete data.warning;
									}
									// fire some event to update cache/ui
									data.removed && data.removed.length && fm.remove(data);
									data.added   && data.added.length   && fm.add(data);
									data.changed && data.changed.length && fm.change(data);
									// fire event with command name
									fm.trigger('paste', data);
									// fire event with command name + 'done'
									fm.trigger('pastedone');
									// force update content
									data.sync && fm.sync();
								})
								.always(function() {
									var hashes, addTexts, end = 2;
									if (hasNtf()) {
										fm.notify({type : 'trash', cnt : 0, hideCnt : true, progress : prg});
									} else {
										prgSt+= prg;
									}
									if (--cnt < 1) {
										tm && clearTimeout(tm);
										hasNtf() && fm.notify({type : 'trash', cnt  : -1});
										fm.unlockfiles({files : targets});
										if (Object.keys(res).length) {
											if (err.length > 1) {
												if (res.removed || res.removed.length) {
													hashes = $.map(targets, function(h) {
														return $.inArray(h, res.removed) === -1? h : null;
													});
												}
												if (hashes.length) {
													if (err > end) {
														end = (fm.messages[err[end-1]] || '').indexOf('$') === -1? end : end + 1;
													}
													self.exec(hashes, { addTexts: err.slice(0, end) });
												} else {
													fm.error(err);
												}
											}
											res._noSound = true;
											dfrd.resolve(res);
										} else {
											dfrd.reject(err);
										}
									}
								});
							}
						});
					} else {
						dfrd.reject('errFolderNotFound');
						fm.unlockfiles({files : targets});
					}
				});
			} else {
				dfrd.reject(['error', 'The folder hierarchy to be deleting can not be determined.']);
				fm.unlockfiles({files : targets});
			}
		},
		remove = function(dfrd, targets, quiet) {
			var notify = quiet? {} : {type : 'rm', cnt : targets.length};
			fm.request({
				data   : {cmd  : 'rm', targets : targets}, 
				notify : notify,
				preventFail : true
			})
			.fail(function(error) {
				dfrd.reject(error);
			})
			.done(function(data) {
				if (data.error || data.warning) {
					data.sync = true;
				}
				dfrd.resolve(data);
			})
			.always(function() {
				fm.unlockfiles({files : targets});
			});
		},
		getTHash = function(targets) {
			var thash = null,
				root1st;
			
			if (targets && targets.length) {
				if (targets.length > 1 && fm.searchStatus.state === 2) {
					root1st = fm.file(fm.root(targets[0])).volumeid;
					if (!$.map(targets, function(h) { return h.indexOf(root1st) !== 0? 1 : null ; }).length) {
						thash = fm.option('trashHash', targets[0]);
					}
				} else {
					thash = fm.option('trashHash', targets[0]);
				}
			}
			return thash;
		};
	
	fm.bind('contextmenu', function(e) {
		self.update(void(0), getTHash(e.data.targets)? 'trash' : 'rm');
	});
	
	this.syncTitleOnChange = true;
	this.updateOnSelect = true;
	this.shortcuts = [{
		pattern     : 'delete ctrl+backspace shift+delete'
	}];
	this.handlers = {
		'open' : function() {
			self.update(void(0), fm.i18n(self.fm.option('trashHash')? 'trash' : 'rm'));
		}
	}
	
	this.init = function() {
		self.change(function() {
			delete self.extra;
			self.title = fm.i18n('cmd' + self.value);
			self.className = self.value;
			self.button.children('span.elfinder-button-icon')[self.value === 'trash'? 'addClass' : 'removeClass']('elfinder-button-icon-trash');
			if (self.value === 'trash') {
				self.extra = {
					icon: 'rm',
					node: $('<span/>')
						.attr({title: fm.i18n('cmdrm')})
						.on('click touchstart', function(e){
							if (e.type === 'touchstart' && e.originalEvent.touches.length > 1) {
								return;
							}
							e.stopPropagation();
							e.preventDefault();
							self.exec(void(0), {forceRm : true});
						})
				};
			}
		});
	}
	
	this.getstate = function(sel) {
		var name;
		sel = sel || fm.selected();
		if (sel && sel.length) {
			self.value = getTHash(sel)? 'trash' : 'rm';
		}
		return sel.length && $.map(sel, function(h) { var f = fm.file(h); return f && ! f.locked && ! fm.isRoot(f)? h : null }).length == sel.length
			? 0 : -1;
	}
	
	this.exec = function(hashes, opts) {
		var opts   = opts || {},
			dfrd   = $.Deferred()
				.fail(function(error) {
					error && fm.error(error);
				}).done(function(data) {
					!opts.quiet && !data._noSound && data.removed && data.removed.length && fm.trigger('playsound', {soundFile : 'rm.wav'});
				}),
			files  = self.files(hashes),
			cnt    = files.length,
			tHash  = null,
			addTexts = opts.addTexts? opts.addTexts : null,
			forceRm = opts.forceRm,
			quiet = opts.quiet,
			targets;

		if (! cnt) {
			return dfrd.reject();
		}
		
		$.each(files, function(i, file) {
			if (fm.isRoot(file)) {
				return !dfrd.reject(['errRm', file.name, 'errPerm']);
			}
			if (file.locked) {
				return !dfrd.reject(['errLocked', file.name]);
			}
		});

		if (dfrd.state() === 'pending') {
			targets = self.hashes(hashes);
			cnt     = files.length
			
			if (addTexts || forceRm || (self.event && self.event.originalEvent && self.event.originalEvent.shiftKey)) {
				tHash = '';
				self.title = fm.i18n('cmdrm');
			}
			
			if (tHash === null) {
				tHash = getTHash(targets);
			}
			
			fm.lockfiles({files : targets});
			
			if (tHash && self.options.quickTrash) {
				toTrash(dfrd, targets, tHash);
			} else {
				if (quiet) {
					remove(dfrd, targets, quiet);
				} else {
					confirm(dfrd, targets, files, tHash, addTexts);
				}
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
			reqDef = [],
			onlyMimes = fm.options.onlyMimes,
			phash;
		
		if (typeof q == 'string' && q) {
			if (typeof target == 'object') {
				mime = target.mime || '';
				target = target.target || '';
			}
			target = target? target : '';
			if (mime) {
				mime = $.trim(mime).replace(',', ' ').split(' ');
				if (onlyMimes.length) {
					mime = $.map(mime, function(m){ 
						m = $.trim(m);
						return m && ($.inArray(m, onlyMimes) !== -1
									|| $.map(onlyMimes, function(om) { return m.indexOf(om) === 0? true : null }).length
									)? m : null 
					});
				}
			} else {
				mime = [].concat(onlyMimes);
			}

			fm.trigger('searchstart', {query : q, target : target, mimes : mime});
			
			if (! onlyMimes.length || mime.length) {
				if (target === '' && fm.api >= 2.1) {
					$.each(fm.roots, function(id, hash) {
						reqDef.push(fm.request({
							data   : {cmd : 'search', q : q, target : hash, mimes : mime},
							notify : {type : 'search', cnt : 1, hideCnt : (reqDef.length? false : true)},
							cancel : true,
							preventDone : true
						}));
					});
				} else {
					reqDef.push(fm.request({
						data   : {cmd : 'search', q : q, target : target, mimes : mime},
						notify : {type : 'search', cnt : 1, hideCnt : true},
						cancel : true,
						preventDone : true
					}));
					if (target !== '' && fm.api >= 2.1 && Object.keys(fm.leafRoots).length) {
						$.each(fm.leafRoots, function(hash, roots) {
							phash = hash;
							while(phash) {
								if (target === phash) {
									$.each(roots, function() {
										reqDef.push(fm.request({
											data   : {cmd : 'search', q : q, target : this, mimes : mime},
											notify : {type : 'search', cnt : 1, hideCnt : false},
											cancel : true,
											preventDone : true
										}));
									});
								}
								phash = (fm.file(phash) || {}).phash;
							}
						});
					}
				}
			} else {
				reqDef = [$.Deferred().resolve({files: []})];
			}
			
			fm.searchStatus.mixed = (reqDef.length > 1);
			
			return $.when.apply($, reqDef).done(function(data) {
				var argLen = arguments.length,
					i;
				
				data.warning && fm.error(data.warning);
				
				if (argLen > 1) {
					data.files = (data.files || []);
					for(i = 1; i < argLen; i++) {
						arguments[i].warning && fm.error(arguments[i].warning);
						
						if (arguments[i].files) {
							data.files.push.apply(data.files, arguments[i].files);
						}
					}
				}
				
				fm.lazy(function() {
					fm.trigger('search', data);
				}).then(function() {
					// fire event with command name + 'done'
					return fm.lazy(function() {
						fm.trigger('searchdone');
					});
				}).then(function() {
					// force update content
					data.sync && fm.sync();
				});
			});
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
		setVar = function() {
			self.variants = [];
			$.each(fm.sortRules, function(name, value) {
				var sort = {
						type  : name,
						order : name == fm.sortType ? fm.sortOrder == 'asc' ? 'desc' : 'asc' : fm.sortOrder
					};
				if ($.inArray(name, fm.sorters) !== -1) {
					var arr = name == fm.sortType ? (sort.order == 'asc'? 's' : 'n') : '';
					self.variants.push([sort, (arr? '<span class="ui-icon ui-icon-arrowthick-1-'+arr+'"></span>' : '') + '&nbsp;' + fm.i18n('sort'+name)]);
				}
			});
			self.variants.push('|');
			self.variants.push([
				{
					type  : fm.sortType,
					order : fm.sortOrder,
					stick : !fm.sortStickFolders,
					tree  : fm.sortAlsoTreeview
				},
				(fm.sortStickFolders? '<span class="ui-icon ui-icon-check"/>' : '') + '&nbsp;' + fm.i18n('sortFoldersFirst')
			]);
			if (fm.ui.tree) {
				self.variants.push('|');
				self.variants.push([
					{
						type  : fm.sortType,
						order : fm.sortOrder,
						stick : fm.sortStickFolders,
						tree  : !fm.sortAlsoTreeview
					},
					(fm.sortAlsoTreeview? '<span class="ui-icon ui-icon-check"/>' : '') + '&nbsp;' + fm.i18n('sortAlsoTreeview')
				]);
			}
		};
	
	/**
	 * Command options
	 *
	 * @type  Object
	 */
	this.options = {ui : 'sortbutton'};
	
	fm.bind('open sortchange', setVar)
	.bind('open', function() {
		fm.unbind('add', setVar).one('add', setVar)
		fm.getUI('toolbar').find('.elfiner-button-sort .elfinder-button-menu .elfinder-button-menu-item').each(function() {
			var tgt = $(this),
				rel = tgt.attr('rel');
			tgt.toggle(! rel || $.inArray(rel, fm.sorters) !== -1);
		});
	})
	.bind('cwdrender', function() {
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
						if (! $(this).data('dragging')) {
							e.stopPropagation();
							if (! fm.getUI('cwd').data('longtap')) {
								self.exec([], sort);
							}
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
	});
	
	this.getstate = function() {
		return 0;
	};
	
	this.exec = function(hashes, sortopt) {
		var fm = this.fm,
			sort = Object.assign({
				type  : fm.sortType,
				order : fm.sortOrder,
				stick : fm.sortStickFolders,
				tree  : fm.sortAlsoTreeview
			}, sortopt);

		return fm.lazy(function() {
			fm.setSort(sort.type, sort.order, sort.stick, sort.tree);
			this.resolve();
		});
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
(elFinder.prototype.commands.up = function() {
	this.alwaysEnabled = true;
	this.updateOnSelect = false;
	
	this.shortcuts = [{
		pattern     : 'ctrl+up'
	}];
	
	this.getstate = function() {
		return this.fm.cwd().phash ? 0 : -1;
	}
	
	this.exec = function() {
		var fm = this.fm,
			cwdhash = fm.cwd().hash;
		return this.fm.cwd().phash ? this.fm.exec('open', this.fm.cwd().phash).done(function() {
			fm.one('opendone', function() {
				fm.selectfiles({files : [cwdhash]});
			});
		}) : $.Deferred().reject();
	}

}).prototype = { forceLoad : true }; // this is required command


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
		sel = (sel || [fm.cwd().hash]);
		if (!this._disabled && sel.length == 1) {
			f = fm.file(sel[0]);
		}
		return (f && f.mime == 'directory' && f.write)? 0 : -1;
	};
	
	
	this.exec = function(data) {
		var fm = this.fm,
			cwdHash = fm.cwd().hash,
			getTargets = function() {
				var tgts = data && (data instanceof Array)? data : null,
					sel;
				if (! data) {
					if (! tgts && (sel = fm.selected()).length === 1 && fm.file(sel[0]).mime === 'directory') {
						tgts = sel;
					} else {
						tgts = [ cwdHash ];
					}
				}
				return tgts;
			},
			targets = getTargets(),
			check = targets? targets[0] : (data && data.target? data.target : null),
			targetDir = check? fm.file(check) : fm.cwd(),
			fmUpload = function(data) {
				fm.upload(data)
					.fail(function(error) {
						dfrd.reject(error);
					})
					.done(function(data) {
						var cwd = fm.getUI('cwd'),
							node;
						dfrd.resolve(data);
						if (data && data.added && data.added[0] && ! fm.ui.notify.children('.elfinder-notify-upload').length) {
							var newItem = fm.findCwdNodes(data.added);
							if (newItem.length) {
								newItem.trigger('scrolltoview');
							} else {
								if (targetDir.hash !== cwdHash) {
									node = $('<div/>').append(
										$('<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all elfinder-tabstop"><span class="ui-button-text">'+fm.i18n('cmdopendir')+'</span></button>')
										.on('mouseenter mouseleave', function(e) { 
											$(this).toggleClass('ui-state-hover', e.type == 'mouseenter');
										}).on('click', function() {
											fm.exec('open', check).done(function() {
												fm.one('opendone', function() {
													fm.trigger('selectfiles', {files : $.map(data.added, function(f) {return f.hash;})});
												});
											});
										})
									);
								} else {
									fm.trigger('selectfiles', {files : $.map(data.added, function(f) {return f.hash;})});
								}
								fm.toast({msg: fm.i18n(['complete', fm.i18n('cmdupload')]), extNode: node});
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
			getSelector = function() {
				var hash = targetDir.hash,
					dirs = $.map(fm.files(hash), function(f) {
						return (f.mime === 'directory' && f.write)? f : null; 
					});
				
				if (! dirs.length) {
					return $();
				}
				
				return $('<div class="elfinder-upload-dirselect elfinder-tabstop" title="' + fm.i18n('folders') + '"/>')
				.on('click', function(e) {
					e.stopPropagation();
					e.preventDefault();
					dirs = fm.sortFiles(dirs);
					var $this  = $(this),
						cwd    = fm.cwd(),
						base   = dialog.closest('div.ui-dialog'),
						getRaw = function(f, icon) {
							return {
								label    : fm.escape(f.i18 || f.name),
								icon     : icon,
								remain   : false,
								callback : function() {
									var title = base.children('.ui-dialog-titlebar:first').find('span.elfinder-upload-target');
									targets = [ f.hash ];
									title.html(' - ' + fm.escape(f.i18 || f.name));
									$this.focus();
								},
								options  : {
									className : (targets && targets.length && f.hash === targets[0])? 'ui-state-active' : '',
									iconClass : f.csscls || '',
									iconImg   : f.icon   || ''
								}
							}
						},
						raw = [ getRaw(targetDir, 'opendir'), '|' ];
					$.each(dirs, function(i, f) {
						raw.push(getRaw(f, 'dir'));
					});
					$this.blur();
					fm.trigger('contextmenu', {
						raw: raw,
						x: e.pageX || $(this).offset().left,
						y: e.pageY || $(this).offset().top,
						prevNode: base,
						fitHeight: true
					});
				}).append('<span class="elfinder-button-icon elfinder-button-icon-dir" />');
			},
			inputButton = function(type, caption) {
				var button,
					input = $('<input type="file" ' + type + '/>')
					.change(function() {
						upload({input : input.get(0), type : 'files'});
					})
					.on('dragover', function(e) {
						e.originalEvent.dataTransfer.dropEffect = 'copy';
					});

				return $('<div class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only elfinder-tabstop elfinder-focus"><span class="ui-button-text">'+fm.i18n(caption)+'</span></div>')
					.append($('<form/>').append(input))
					.on('click', function(e) {
						if (e.target === this) {
							e.stopPropagation();
							e.preventDefault();
							input.click();
						}
					})
					.hover(function() {
						$(this).toggleClass(hover)
					});
			},
			dfrd = $.Deferred(),
			dialog, dropbox, pastebox, dropUpload, paste, dirs, spinner, uidialog;
		
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
				kind = (trf.items && trf.items.length && trf.items[0].kind)? trf.items[0].kind : '',
				errors;
			
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
				fmUpload({files : file, type : type, target : target, dropEvt : e});
			} else {
				errors = ['errUploadNoFiles'];
				if (kind === 'file') {
					errors.push('errFolderUpload');
				}
				fm.error(errors);
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
					upload({files : files, type : 'files', clipdata : true});
					return;
				}
			}
			var my = e.target || e.srcElement;
			setTimeout(function () {
				var type = 'text',
					src;
				if (my.innerHTML) {
					$(my).find('img').each(function(i, v){
						if (v.src.match(/^webkit-fake-url:\/\//)) {
							// For Safari's bug.
							// ref. https://bugs.webkit.org/show_bug.cgi?id=49141
							//      https://dev.ckeditor.com/ticket/13029
							$(v).remove();
						}
					});
					
					if ($(my).find('a,img').length) {
						type = 'html';
					}
					src = my.innerHTML;
					my.innerHTML = '';
					upload({files : [ src ], type : type});
				}
			}, 1);
		};
		
		dialog = $('<div class="elfinder-upload-dialog-wrapper"/>')
			.append(inputButton('multiple', 'selectForUpload'));
		
		if (! fm.UA.Mobile && (function(input) {
			return (typeof input.webkitdirectory !== 'undefined' || typeof input.directory !== 'undefined');})(document.createElement('input'))) {
			dialog.append(inputButton('multiple webkitdirectory directory', 'selectFolder'));
		}
		
		if (targetDir.dirs) {
			if (targetDir.hash === cwdHash || $('#'+fm.navHash2Id(targetDir.hash)).hasClass('elfinder-subtree-loaded')) {
				getSelector().appendTo(dialog);
			} else {
				spinner = $('<div class="elfinder-upload-dirselect" title="' + fm.i18n('nowLoading') + '"/>')
					.append('<span class="elfinder-button-icon elfinder-button-icon-spinner" />')
					.appendTo(dialog);
				fm.request({cmd : 'tree', target : targetDir.hash})
					.done(function() { 
						fm.one('treedone', function() {
							spinner.replaceWith(getSelector());
							uidialog.elfinderdialog('tabstopsInit');
						});
					})
					.fail(function() {
						spinner.remove();
					});
			}
		}
		
		if (fm.dragUpload) {
			dropbox = $('<div class="ui-corner-all elfinder-upload-dropbox elfinder-tabstop" contenteditable="true" data-ph="'+fm.i18n('dropPasteFiles')+'"></div>')
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
				.on('dragenter', function(e) {
					e.stopPropagation();
				  	e.preventDefault();
				  	$(this).addClass(hover);
				})
				.on('dragleave', function(e) {
					e.stopPropagation();
				  	e.preventDefault();
				  	$(this).removeClass(hover);
				})
				.on('dragover', function(e) {
					e.stopPropagation();
				  	e.preventDefault();
					e.originalEvent.dataTransfer.dropEffect = 'copy';
					$(this).addClass(hover);
				})
				.on('drop', function(e) {
					dialog.elfinderdialog('close');
					targets && (e.originalEvent._target = targets[0]);
					dropUpload(e.originalEvent);
				})
				.prependTo(dialog)
				.after('<div class="elfinder-upload-dialog-or">'+fm.i18n('or')+'</div>')[0];
			
		} else {
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
					$(this).addClass(hover);
				})
				.on('dragleave mouseout', function(){
					$(this).removeClass(hover);
				})
				.prependTo(dialog)
				.after('<div class="elfinder-upload-dialog-or">'+fm.i18n('or')+'</div>')[0];
			
		}
		
		uidialog = fm.dialog(dialog, {
			title          : this.title + '<span class="elfinder-upload-target">' + (targetDir? ' - ' + fm.escape(targetDir.i18 || targetDir.name) : '') + '</span>',
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
	var fm = this.fm;
	this.value          = fm.viewType;
	this.alwaysEnabled  = true;
	this.updateOnSelect = false;

	this.options = { ui : 'viewbutton'};
	
	this.getstate = function() {
		return 0;
	}
	
	this.exec = function() {
		var self  = this,
			value = fm.storage('view', this.value == 'list' ? 'icons' : 'list');
		return fm.lazy(function() {
			fm.viewchange();
			self.update(void(0), value);
			this.resolve();
		});
	}

};

return elFinder;
}));