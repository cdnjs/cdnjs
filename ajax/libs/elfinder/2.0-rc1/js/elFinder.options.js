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
		'open', 'reload', 'home', 'up', 'back', 'forward', 'getfile', 'quicklook', 
		'download', 'rm', 'duplicate', 'rename', 'mkdir', 'mkfile', 'upload', 'copy', 
		'cut', 'paste', 'edit', 'extract', 'archive', 'search', 'info', 'view', 'help', 'resize', 'sort'
	],
	
	/**
	 * Commands options.
	 *
	 * @type Object
	 **/
	commandsOptions : {
		// "getfile" command options.
		getfile : {
			onlyURL  : true,
			// allow to return multiple files info
			multiple : false,
			// allow to return filers info
			folders  : false,
			// action after callback (""/"close"/"destroy")
			oncomplete : ''
		},
		// "upload" command options.
		upload : {
			ui : 'uploadbutton'
		},
		// "quicklook" command options.
		quicklook : {
			autoplay : true,
			jplayer  : 'extensions/jplayer'
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
				// 	save : function(textarea, editor) {}
				// 
				// }
			]
		},
		
		help : {view : ['about', 'shortcuts', 'help']}
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
			// ['reload'],
			// ['home', 'up'],
			['mkdir', 'mkfile', 'upload'],
			['open', 'download', 'getfile'],
			['info'],
			['quicklook'],
			['copy', 'cut', 'paste'],
			['rm'],
			['duplicate', 'rename', 'edit', 'resize'],
			['extract', 'archive'],
			['search'],
			['view', 'sort'],
			['help']
		],
		// directories tree options
		tree : {
			// expand current root on init
			openRootOnLoad : true,
			// auto load current dir parents
			syncTree : true
		},
		// navbar options
		navbar : {
			minWidth : 150,
			maxWidth : 500
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
	 * How to sort files in current directory
	 *
	 * @type String
	 * @default "nameDirsFirst"
	 * @example
	 *  - sort : 'nameDirsFirst' - sort by name, directory first
	 *  - sort : 'kindDirsFirst' - sort by kind, name, directory first
	 *  - sort : 'sizeDirsFirst' - sort by size, name, directory first
	 *  - sort : 'dateDirsFirst' - sort by date, name, directory first
	 *  - sort : 'name' - sort by name
	 *  - sort : 'kind' - sort by kind, name
	 *  - sort : 'size' - sort by size, name
	 *  - sort : 'date' - sort by date, name
	 */
	sort : 'nameDirsFirst',
	
	/**
	 * Sort files direction.
	 *
	 * @type String
	 * @default  "asc"
	 * @example
	 *   - sort : 'asc'  // ascent sorting
	 *   - sort : 'desc' // descent sorting
	 */
	sortDirect : 'asc',
	
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
	 * Lazy load config.
	 * How many files display at once?
	 *
	 * @type Number
	 * @default  50
	 */
	showFiles : 30,
	
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
	 *
	 * @type false|RegExp|function
	 * @default  false
	 * @example
	 *  disable names with spaces:
	 *  validName : /^[^\s]$/
	 */
	validName : false,
	
	/**
	 * Sync content interval
	 * @todo - fix in elFinder
	 * @type Number
	 * @default  0 (do not sync)
	 */
	sync : 0,
	
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
		navbar : ['open', '|', 'copy', 'cut', 'paste', 'duplicate', '|', 'rm', '|', 'info'],
		// current directory menu
		cwd    : ['reload', 'back', '|', 'upload', 'mkdir', 'mkfile', 'paste', '|', 'sort', '|', 'info'],
		// current directory file menu
		files  : ['getfile', '|','open', 'quicklook', '|', 'download', '|', 'copy', 'cut', 'paste', 'duplicate', '|', 'rm', '|', 'edit', 'rename', 'resize', '|', 'archive', 'extract', '|', 'info']
	},

	/**
	 * Debug config
	 *
	 * @type Array|Boolean
	 */
	// debug : true
	debug : ['error', 'warning', 'event-destroy']
}
