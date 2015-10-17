YUI.add('uploader-flash', function(Y) {


    /**
     * This module provides a UI for file selection and multiple file upload capability using
     * Flash as a transport engine.
     * The supported features include: automatic upload queue management, upload progress
     * tracking, server response retrieval and error reporting.
	 *
     * @module uploader-flash
     */     


var  substitute  = Y.substitute,
     UploaderQueue = Y.Uploader.Queue;


    /**
     * This module provides a UI for file selection and multiple file upload capability
     * using Flash as a transport engine.
     * @class UploaderFlash
     * @extends Widget
     * @constructor
     */

function UploaderFlash(config) {
  UploaderFlash.superclass.constructor.apply ( this, arguments );
}



Y.UploaderFlash = Y.extend(UploaderFlash, Y.Widget, {

   /**
    * Stored reference to the instance of SWF used to host the
    * Flash uploader.
    *
    * @property _swfReference
    * @type {SWF}
    * @protected
    */
	_swfReference: null,

   /**
    * Stored reference to the instance of Uploader.Queue used to manage
    * the upload process.
    *
    * @property _uploaderQueue
    * @type {Y.Uploader.Queue}
    * @protected
    */
	_uploaderQueue: null,

   /**
    * Stored value of the unique id for the container that holds the 
    * Flash uploader.
    *
    * @property _swfContainerId
    * @type {String}
    * @protected
    */
	_swfContainerId: null,

    // Y.UploaderFlash prototype

    /**
     * Construction logic executed during UploaderFlash instantiation.
     *
     * @method initializer
     * @protected
     */
	initializer : function () {

		// Assign a unique id for the SWF container
		this._swfContainerId = Y.guid("uploader");

		// Publish available events
		this.publish("fileselect");
		this.publish("uploadprogress");
		this.publish("totaluploadprogress");
		this.publish("uploadcomplete");
		this.publish("alluploadscomplete");
		this.publish("uploaderror");

	},


    /**
     * Handles and retransmits events fired by `Y.File` and `Y.Uploader.Queue`.
     * 
     * @method _uploadEventHandler
     * @param event The event dispatched during the upload process.
     * @private
     */
	_uploadEventHandler : function (event) {
	
	switch (event.type) {
                case "file:uploadprogress":
                   this.fire("uploadprogress", event);
                break;
                case "uploaderqueue:totaluploadprogress":
                   this.fire("totaluploadprogress", event);
                break;
                case "file:uploadcomplete":
                   this.fire("uploadcomplete", event);
                break;
                case "uploaderqueue:alluploadscomplete":
                   this.fire("alluploadscomplete", event);
                break;
                case "uploaderqueue:uploaderror":
                   this.fire("uploaderror", event);
                break;
    }	

	},

    /**
     * Syncs the state of the `multipleFiles` attribute between this class
     * and the Flash uploader.
     * 
     * @method _setMultipleFiles
     * @private
     */
    _setMultipleFiles : function () {
    	    if (this._swfReference) {
				this._swfReference.callSWF("setAllowMultipleFiles", [this.get("multipleFiles")]);
			}
    },


    /**
     * Syncs the state of the `fileFilters` attribute between this class
     * and the Flash uploader.
     * 
     * @method _setFileFilters
     * @private
     */
    _setFileFilters : function () {
            if (this._swfReference && this.get("fileFilters") != null) {
            	this._swfReference.callSWF("setFileFilters", [this.get("fileFilters")]);
            }	

    },


    /**
     * Adjusts the content of the `fileList` based on the results of file selection
     * and the `appendNewFiles` attribute. If the `appendNewFiles` attribute is true,
     * then selected files are appended to the existing list; otherwise, the list is
     * cleared and populated with the newly selected files.
     * 
     * @method _updateFileList
     * @param ev {Event} The file selection event received from the uploader.
     * @private
     */
    _updateFileList : function (ev) {
       
       var newfiles = ev.fileList,
           fileConfObjects = [],
           parsedFiles = [],
           swfRef = this._swfReference;
 
       Y.each(newfiles, function (value) {
       	 var newFileConf = {};
       	 newFileConf.id = value.fileId;
       	 newFileConf.name = value.fileReference.name;
       	 newFileConf.size = value.fileReference.size;
       	 newFileConf.type = value.fileReference.type;
       	 newFileConf.dateCreated = value.fileReference.creationDate;
       	 newFileConf.dateModified = value.fileReference.modificationDate;
       	 newFileConf.uploader = swfRef;

         fileConfObjects.push(newFileConf);
       });

       Y.each(fileConfObjects, function (value) {
         parsedFiles.push(new Y.File(value));
       });

       this.fire("fileselect", {fileList: parsedFiles});

       var oldfiles = this.get("fileList");

	   this.set("fileList", 
	             this.get("appendNewFiles") ? oldfiles.concat(parsedFiles) : parsedFiles );

    },

    /**
     * Create the DOM structure for the UploaderFlash.
     * UploaderFlash's DOM structure consists of two layers: the base "Select Files"
     * button that can be replaced by the developer's widget of choice; and a transparent
     * Flash overlay positoned above the button that captures all input events.
     *
     * @method renderUI
     * @protected
     */
	renderUI : function () {
	   var contentBox = this.get('contentBox');
	   contentBox.append(this.get("selectFilesButton"));
	   contentBox.append(Y.Node.create(substitute(UploaderFlash.FLASH_CONTAINER, 
		                                          {swfContainerId: this._swfContainerId})));
	   var flashContainer = Y.one("#" + this._swfContainerId);
	   var params = {version: "10.0.45",
                     fixedAttributes: {wmode: "transparent", 
                                       allowScriptAccess:"always", 
                                       allowNetworking:"all", 
                                       scale: "noscale"},
                    };
	   this._swfReference = new Y.SWF(flashContainer, this.get("swfURL"), params);
	},

    /**
     * Binds to the UploaderFlash UI and subscribes to the necessary events.
     * The binding is set to occur once the Flash player instance is ready
     * (as indicated by the `swfReady` event.)
     *
     * @method bindUI
     * @protected
     */
	bindUI : function () {

		this._swfReference.on("swfReady", function () {
			this._setMultipleFiles();
			this._setFileFilters();
			this.after("multipleFilesChange", this._setMultipleFiles, this);
			this.after("fileFiltersChange", this._setFileFilters, this);
		}, this);
        
		this._swfReference.on("fileselect", this._updateFileList, this);
	},


   /**
    * Starts the upload of a specific file.
    *
    * @method upload
    * @param file {Y.File} Reference to the instance of the file to be uploaded.
    * @param url {String} The URL to upload the file to.
 	* @param postVars {Object} (optional) A set of key-value pairs to send as variables along with the file upload HTTP request.
  	*                          If not specified, the values from the attribute `postVarsPerFile` are used instead. 
    */

	upload : function (file, url, postvars) {
        
        var uploadURL = url || this.get("uploadURL"),
            postVars = postvars || this.get("postVarsPerFile");

		if (file instanceof Y.File) {
		   this._uploaderQueue = new UploaderQueue({simUploads: this.get("simLimit"), 
	                                            errorAction: "restart",
	                                            fileList: [file],
	                                            uploadURL: uploadURL,
	                                            perFileParameters: postVars
	                                            });
	       this._uploaderQueue.on("uploadprogress", this._uploadEventHandler, this);
	       this._uploaderQueue.on("totaluploadprogress", this._uploadEventHandler, this);
	       this._uploaderQueue.on("uploadcomplete", this._uploadEventHandler, this);
	       this._uploaderQueue.on("alluploadscomplete", this._uploadEventHandler, this);

	       this._uploaderQueue.set("fileFieldName", this.get("fileFieldName"));

	       this._uploaderQueue.startUpload();
		}
	},

   /**
    * Starts the upload of all files on the file list, using an automated queue.
    *
    * @method uploadAll
    * @param url {String} The URL to upload the files to.
  	* @param postVars {Object} (optional) A set of key-value pairs to send as variables along with the file upload HTTP request.
  	*                          If not specified, the values from the attribute `postVarsPerFile` are used instead. 
    */
	uploadAll : function (url, postvars) {

        // Starting upload of all selected files.
        console.log("Starting upload of all selected files");
        var uploadURL = url || this.get("uploadURL"),
            postVars = postvars || this.get("postVarsPerFile");


           // Creating a new upload queue with the current file list
        console.log("Creating a new instance of upload queue");
		   this._uploaderQueue = new UploaderQueue({simUploads: this.get("simLimit"), 
	                                            errorAction: "restart",
	                                            fileList: this.get("fileList"),
	                                            uploadURL: uploadURL,
	                                            perFileParameters: postVars
	                                           });

           // Subscribing to events
        console.log("Subscribing to uploaderqueue's events");
	       this._uploaderQueue.on("uploadprogress", this._uploadEventHandler, this);
	       this._uploaderQueue.on("totaluploadprogress", this._uploadEventHandler, this);
	       this._uploaderQueue.on("uploadcomplete", this._uploadEventHandler, this);
	       this._uploaderQueue.on("alluploadscomplete", this._uploadEventHandler, this);

	       this._uploaderQueue.set("fileFieldName", this.get("fileFieldName"));

           // Starting the upload.
        console.log("Starting upload in the queue");
	       this._uploaderQueue.startUpload();		
	},

   /**
    * Starts the upload of the files specified in the first argument, using an automated queue.
    *
    * @method uploadThese
    * @param files {Array} The list of files to upload.
    * @param url {String} The URL to upload the files to.
  	* @param postVars {Object} (optional) A set of key-value pairs to send as variables along with the file upload HTTP request.
  	*                          If not specified, the values from the attribute `postVarsPerFile` are used instead. 
    */
	uploadThese : function (files, url, postvars) {
        var uploadURL = url || this.get("uploadURL"),
            postVars = postvars || this.get("postVarsPerFile");

		    this._uploaderQueue = new UploaderQueue({simUploads: this.get("simLimit"), 
	                                            errorAction: "restart",
	                                            fileList: files,
	                                            uploadURL: uploadURL,
	                                            perFileParameters: postVars
	                                           });

	       this._uploaderQueue.on("uploadprogress", this._uploadEventHandler, this);
	       this._uploaderQueue.on("totaluploadprogress", this._uploadEventHandler, this);
	       this._uploaderQueue.on("uploadcomplete", this._uploadEventHandler, this);
	       this._uploaderQueue.on("alluploadscomplete", this._uploadEventHandler, this);
	       this._uploaderQueue.on("uploaderror", this._uploadEventHandler, this);

	       this._uploaderQueue.set("fileFieldName", this.get("fileFieldName"));


	       this._uploaderQueue.startUpload();
	}
},

{
   /**
    * The template for the Flash player container. Since the Flash player container needs
    * to completely overlay the &lquot;Select Files&rqot; control, it's positioned absolutely,
    * with width and height set to 100% of the parent.
    *
    * @property FLASH_CONTAINER
    * @type {String}
    * @static
    */
	FLASH_CONTAINER: "<div id='{swfContainerId}' style='position:absolute; top:0px; left: 0px; width:100%; height:100%'></div>",

    /**
     * The identity of the widget.
     *
     * @property NAME
     * @type String
     * @default 'uploaderflash'
     * @readOnly
     * @protected
     * @static
     */
	NAME: "uploader",

    /**
     * Static property used to define the default attribute configuration of
     * the Widget.
     *
     * @property ATTRS
     * @type {Object}
     * @protected
     * @static
     */
	ATTRS: {

        /**
         * The widget that serves as the &lquot;Select Files&rquot; control for the file uploader
         * 
         *
         * @attribute selectFilesButton
         * @type {Node | Widget}
         * @default A standard HTML button.
         */
		selectFilesButton : {
			value: Y.Node.create("<button type='button' style='height:100%;width:100%'>Select Files</button>")
		},

        /**
         * A Boolean indicating whether multiple file selection is enabled.
         *
         * @attribute multipleFiles
         * @type {Boolean}
         * @default false
         */
		multipleFiles: {
			value: false
		},

        /**
         * An array indicating what fileFilters should be applied to the file
         * selection dialog. Each element in the array should be an object with
         * the following key-value pairs:
         * {
         *   description : String         	
             extensions: String of the form &lquot;*.ext1;*.ext2;*.ext3;...&rquot;
         * }
         * @attribute fileFilters
         * @type {Array}
         * @default null
         */
		fileFilters: {
			value: null
		},
         
        /**
         * A String specifying what should be the POST field name for the file
         * content in the upload request.
         *
         * @attribute fileFieldName
         * @type {String}
         * @default Filedata
         */
		fileFieldName: {
			value: "Filedata"
		},

        /**
         * A Boolean indicating whether newly selected files should be appended 
         * to the existing file list, or whether they should replace it.
         *
         * @attribute appendNewFiles
         * @type {Boolean}
         * @default true
         */
		appendNewFiles : {
			value: true
		},

        /**
         * The number of files that can be uploaded
         * simultaneously if the automatic queue management
         * is used. This value can be in the range between 2
         * and 5.
         *
         * @attribute simLimit
         * @type {Number}
         * @default 2
         */
		simLimit: {
            value: 2,
            validator: function (val, name) {
                return (val >= 2 && val <= 5);
            }
        },

        /**
         * The array of files to be uploaded. All elements in the array
	     * must be instances of `Y.File` and be instantiated with a `fileId`
	     * retrieved from an instance of the uploader.
         *
         * @attribute fileList
         * @type {Array}
         * @default []
         */
        fileList: {
        	value: []
        },

        /**
         * An object, keyed by `fileId`, containing sets of key-value pairs
         * that should be passed as POST variables along with each corresponding
         * file. This attribute is only used if no POST variables are specifed
         * in the upload request (only possible when calling the `upload()` method.
         *
         * @attribute postVarsPerFile
         * @type {Object}
         * @default {}
         */
        postVarsPerFile: {
        	value: {}
        },

        /**
         * The URL to POST the file upload requests to.
         *
         * @attribute uploadURL
         * @type {String}
         * @default ""
         */
        uploadURL: {
        	value: ""
        },

        /**
         * The URL to the SWF file of the flash uploader. A copy local to
         * the server that hosts the page on which the uploader appears is
         * recommended.
         *
         * @attribute swfURL
         * @type {String}
         * @default "CDN Prefix + assets/flashuploader.swf"
         */
        swfURL: {
        	value: "assets/flashuploader.swf"
        }
	}
});

Y.UploaderFlash.Queue = UploaderQueue;




}, '@VERSION@' ,{requires:['swf', 'widget', 'substitute', 'base', 'node', 'event-custom', 'file', 'uploader-queue']});
