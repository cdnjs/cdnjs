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
