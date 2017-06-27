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
     UploaderQueue = Y.Uploader.Queue,
     getCN                 = Y.ClassNameManager.getClassName,
     UPLOADER              = 'uploader',
     SELECT_FILES          = getCN(UPLOADER, 'selectfiles-button');


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



    _buttonState: "up",
    _buttonFocus: false,

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
        this.publish("uploadstart");
        this.publish("fileuploadstart");
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
                case "file:uploadstart":
                   this.fire("fileuploadstart", event);
                break;
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
       
       Y.one("body").focus();
       this._swfReference._swf.focus();


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
         parsedFiles.push(new Y.FileFlash(value));
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
       var selFilesButton = this.get("selectFilesButton");
       selFilesButton.setStyles({width: "100%", height: "100%"});

	   contentBox.append(selFilesButton);
	   contentBox.append(Y.Node.create(substitute(UploaderFlash.FLASH_CONTAINER, 
		                                          {swfContainerId: this._swfContainerId})));
	   var flashContainer = Y.one("#" + this._swfContainerId);
	   var params = {version: "10.0.45",
                     fixedAttributes: {wmode: "transparent", 
                                       allowScriptAccess:"always", 
                                       allowNetworking:"all", 
                                       scale: "noscale"
                                      },
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

        this.after("tabElementsChange", this._attachTabElements);
        this._attachTabElements();

        // this._swfReference.on("trace", function (ev) {console.log(ev.message);});

        this._swfReference.on("mouseenter", function () {
            this._setButtonClass("hover", true);
            if (this._buttonState == "down") {
                this._setButtonClass("active", true);
            }
        }, this);
        this._swfReference.on("mouseleave", function () {
            this._setButtonClass("hover", false);
            this._setButtonClass("active", false);
            
        }, this);
        this._swfReference.on("mousedown", function () {
            this._buttonState = "down";
            this._setButtonClass("active", true);
        }, this);
        this._swfReference.on("mouseup", function () {
            this._buttonState = "up";
            this._setButtonClass("active", false);
        }, this);
        this._swfReference.on("click", function () {
            this._buttonFocus = true;
            this._setButtonClass("focus", true);
            Y.one("body").focus();
            this._swfReference._swf.focus();
        }, this);
	},

    _setButtonClass : function (state, add) {
        if (add) {
            this.get("selectFilesButton").addClass(this.get("buttonClassNames")[state]);
        }
        else {
            this.get("selectFilesButton").removeClass(this.get("buttonClassNames")[state]);
        }
    },

    _attachTabElements : function () {
        if (this.get("tabElements") != null && this.get("tabElements").from != null && this.get("tabElements").to != null) {
            var fromElement = Y.one(this.get("tabElements").from);
            var toElement = Y.one(this.get("tabElements").to);

            fromElement.on("keydown", function (ev) { 
                                                      if (ev.keyCode == 9 && !ev.shiftKey) {
                                                          ev.preventDefault();
                                                          this._swfReference._swf.setAttribute("tabindex", 0); 
                                                          this._swfReference._swf.setAttribute("role", "button");
                                                          this._swfReference._swf.setAttribute("aria-label", this.get("selectButtonLabel"));
                                                          this._swfReference._swf.focus();
                                                      }
                                                    }, this);
            toElement.on("keydown", function (ev) { 
                                                      if (ev.keyCode == 9 && ev.shiftKey) {
                                                          ev.preventDefault();
                                                          this._swfReference._swf.setAttribute("tabindex", 0); 
                                                          this._swfReference._swf.setAttribute("role", "button");
                                                          this._swfReference._swf.setAttribute("aria-label", this.get("selectButtonLabel"));
                                                          this._swfReference._swf.focus();
                                                      }
                                                    }, this);

            this._swfReference.on("tabback", function (ev) {this._swfReference._swf.blur(); setTimeout(function () {fromElement.focus();}, 30);}, this);
            this._swfReference.on("tabforward", function (ev) {this._swfReference._swf.blur(); setTimeout(function () {toElement.focus();}, 30);}, this);

            this._swfReference._swf.on("focus", function (ev) {this._buttonFocus = true; this._setButtonClass("focus", true);}, this);
            this._swfReference._swf.on("blur", function (ev) {this._buttonFocus = false; this._setButtonClass("focus", false);}, this);
        }
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
            postVars = postvars || this.get("postVarsPerFile"),
            fileId = file.get("id");

            postVars = postVars.hasOwnProperty(fileId) ? postVars[fileId] : postVars;

        if (file instanceof Y.FileFlash) {
           
            file.on("uploadstart", this._uploadStartHandler, this);
            file.on("uploadprogress", this._uploadProgressHandler, this);
            file.on("uploadcomplete", this._uploadCompleteHandler, this);
            file.on("uploaderror", this._uploadErrorHandler, this);

            file.startUpload(uploadURL, postVars, this.get("fileFieldName"));
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
        this.uploadThese(this.get("fileList"), url, postvars);
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
                                                errorAction: this.get("errorAction"),
                                                fileList: files,
                                                uploadURL: uploadURL,
                                                perFileParameters: postVars
                                               });
           this._uploaderQueue.on("uploadstart", this._uploadEventHandler, this);
           this._uploaderQueue.on("uploadprogress", this._uploadEventHandler, this);
           this._uploaderQueue.on("totaluploadprogress", this._uploadEventHandler, this);
           this._uploaderQueue.on("uploadcomplete", this._uploadEventHandler, this);
           this._uploaderQueue.on("alluploadscomplete", this._uploadEventHandler, this);
           this._uploaderQueue.on("uploaderror", this._uploadEventHandler, this);
           this._uploaderQueue.startUpload();  
           
           this.fire("uploadstart"); 
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
	FLASH_CONTAINER: "<div id='{swfContainerId}' style='position:absolute; top:0px; left: 0px; margin:0px; width:100%; height:100%'></div>",

  SELECT_FILES_BUTTON: "<button type='button' class='yui3-button' tabindex='-1'>{selectButtonLabel}</button>",

  TYPE: "flash",
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

        buttonClassNames: {
            value: {
                "hover": "yui3-button-hover",
                "active": "yui3-button-active",
                "disabled": "yui3-button-disabled",
                "focus": "yui3-button-selected"
            }
        },

        selectButtonLabel: {
            value: "Select Files"
        },

        errorAction: {
            value: "continue",
            validator: function (val, name) {
                 return (val === UploaderQueue.CONTINUE || val === UploaderQueue.STOP || val === UploaderQueue.RESTART_ASAP || val === UploaderQueue.RESTART_AFTER);           
             }
        },

        /**
         * The widget that serves as the &lquot;Select Files&rquot; control for the file uploader
         * 
         *
         * @attribute selectFilesButton
         * @type {Node | Widget}
         * @default A standard HTML button.
         */
		selectFilesButton : {
			valueFn: function () {
                return Y.Node.create(substitute(Y.UploaderFlash.SELECT_FILES_BUTTON, {selectButtonLabel: this.get("selectButtonLabel")}));
            }
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
        	value: Y.Env.cdn + "uploader/assets/flashuploader.swf"
        },

        tabElements: {
            value: null
        }
	}
});

Y.UploaderFlash.Queue = UploaderQueue;




}, '@VERSION@' ,{requires:['swf', 'widget', 'substitute', 'base', 'cssbutton', 'node', 'event-custom', 'file-flash', 'uploader-queue']});
