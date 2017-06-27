YUI.add('uploader-html5', function(Y) {


    /**
     * This module provides a UI for file selection and multiple file upload capability using
     * HTML5 XMLHTTPRequest as a transport engine.
     * The supported features include: automatic upload queue management, upload progress
     * tracking, drag-and-drop support, server response retrieval and error reporting.
	 *
     * @module uploader-html5
     */     


var  substitute  = Y.substitute,
     UploaderQueue = Y.Uploader.Queue;

    /**
     * This module provides a UI for file selection and multiple file upload capability using
     * HTML5 XMLHTTPRequest as a transport engine.
     * @class UploaderHTML5
     * @extends Widget
     * @constructor
     */

function UploaderHTML5(config) {
  UploaderHTML5.superclass.constructor.apply ( this, arguments );
}



Y.UploaderHTML5 = Y.extend( UploaderHTML5, Y.Widget, {

   /**
    * Stored reference to the instance of the file input field used to 
    * initiate the file selection dialog.
    *
    * @property _fileInputField
    * @type {Node}
    * @protected
    */
	_fileInputField: null,

   /**
    * Stored reference to the instance of Uploader.Queue used to manage
    * the upload process.
    *
    * @property _uploaderQueue
    * @type {Y.Uploader.Queue}
    * @protected
    */
	_uploaderQueue: null,

    // Y.UploaderHTML5 prototype

    /**
     * Construction logic executed during UploaderHTML5 instantiation.
     *
     * @method initializer
     * @protected
     */
	initializer : function () {

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


    _ddEventHandler : function (event) {

       event.stopPropagation();
       event.preventDefault();  
                          
       switch (event.type) {
                case "dragenter":
                  this.fire("dragenter"); 
                break;
                case "dragover":
                  this.fire("dragover");
                break;
                case "drop":

                   var newfiles = event._event.dataTransfer.files,
                       parsedFiles = [];

                   Y.each(newfiles, function (value) {
                     parsedFiles.push(new Y.FileHTML5(value));
                   });


                   this.fire("fileselect", {fileList: parsedFiles});

                   var oldfiles = this.get("fileList");

                   this.set("fileList", 
                            this.get("appendNewFiles") ? oldfiles.concat(parsedFiles) : parsedFiles );
                break;
       }
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
                break;
    }	

	},

    /**
     * Syncs the state of the `multipleFiles` attribute between this class
     * and the file input field.
     * 
     * @method _setMultipleFiles
     * @private
     */
    _setMultipleFiles : function () {
    	    if (this.get("multipleFiles") === true) {
				this._fileInputField.set("multiple", "multiple");
			}
			else {
				this._fileInputField.set("multiple", "");
			}
    },

    /**
     * Binds the instantiation of the file select dialog to the current file select
     * control.
     * 
     * @method _bindSelectButton
     * @private
     */

    _bindDropArea : function (event) {
        var ev = event || {};

        if (ev.prevVal != null) {
            ev.prevVal.detach('drop', this._ddEventHandler);
            ev.prevVal.detach('dragenter', this._ddEventHandler);
            ev.prevVal.detach('dragover', this._ddEventHandler);
        }

        var ddArea = this.get("dragAndDropArea");

        if (ddArea != null) {
            ddArea.on('drop', this._ddEventHandler, this);
            ddArea.on('dragenter', this._ddEventHandler, this);
            ddArea.on('dragover', this._ddEventHandler, this);
        }
    },


    _bindSelectButton : function () {
       this.get("selectFilesButton").on("click", this.openFileSelectDialog, this);
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
       var newfiles = ev.target.getDOMNode().files,
           parsedFiles = [];

       Y.each(newfiles, function (value) {
         parsedFiles.push(new Y.FileHTML5(value));
       });


       this.fire("fileselect", {fileList: parsedFiles});

       var oldfiles = this.get("fileList");

	   this.set("fileList", 
	            this.get("appendNewFiles") ? oldfiles.concat(parsedFiles) : parsedFiles );

    },

    /**
     * Opens the File Selection dialog by simulating a click on the file input field.
     * 
     * @method openFileSelectDialog
     */
    openFileSelectDialog : function () {
      var fileDomNode = this._fileInputField.getDOMNode();
			if (fileDomNode.click) {
				fileDomNode.click();
			}	
    },

    /**
     * Create the DOM structure for the UploaderHTML5.
     * UploaderHTML5's DOM structure consists of a "Select Files" button that can 
     * be replaced by the developer's widget of choice; and a hidden file input field
     * that is used to instantiate the File Select dialog.
     *
     * @method renderUI
     * @protected
     */
	renderUI : function () {
	   var contentBox = this.get('contentBox');
       var selButton = this.get("selectFilesButton");
       selButton.setStyles({width:"100%", height:"100%"});
	   contentBox.append(this.get("selectFilesButton"));
	   this._fileInputField = Y.Node.create(UploaderHTML5.HTML5FILE_FIELD);
       contentBox.append(this._fileInputField);
	},

    /**
     * Binds to the UploaderHTML5 UI and subscribes to the necessary events.
     *
     * @method bindUI
     * @protected
     */
	bindUI : function () {

		this._bindSelectButton();
		this._setMultipleFiles();
        this._bindDropArea();

		this.after("multipleFilesChange", this._setMultipleFiles, this);
        this.after("selectFilesButtonChange", this._bindSelectButton, this);
        this.after("dragAndDropAreaChange", this._bindDropArea, this);
        this.after("tabIndexChange", function (ev) {this.get("selectFilesButton").set("tabIndex", this.get("tabIndex"));}, this);
        this._fileInputField.on("change", this._updateFileList, this);

        this.get("selectFilesButton").set("tabIndex", this.get("tabIndex"));
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

		if (file instanceof Y.FileHTML5) {
		   
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
    * The template for the hidden file input field container. The file input field will only
    * accept clicks if its visibility is set to hidden (and will not if it's `display` value
    * is set to `none`)
    *
    * @property HTML5FILE_FIELD
    * @type {String}
    * @static
    */
	HTML5FILE_FIELD: "<input type='file' style='visibility:hidden; width:0px; height: 0px;'>",
  
    SELECT_FILES_BUTTON: "<button type='button' class='yui3-button' role='button' aria-label='{selectButtonLabel}' tabindex='{tabIndex}'>{selectButtonLabel}</button>",

    TYPE: "html5",

    /**
     * The identity of the widget.
     *
     * @property NAME
     * @type String
     * @default 'uploaderhtml5'
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

        errorAction: {
            value: "continue",
            validator: function (val, name) {
                 return (val === UploaderQueue.CONTINUE || val === UploaderQueue.STOP || val === UploaderQueue.RESTART_ASAP || val === UploaderQueue.RESTART_AFTER);           }
        },

        selectButtonLabel: {
            value: "Select Files"
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
                return Y.Node.create(substitute(Y.UploaderHTML5.SELECT_FILES_BUTTON, {selectButtonLabel: this.get("selectButtonLabel"),
                                                                                      tabIndex: this.get("tabIndex")}));
            }
        },

        /**
         * The node that serves as the drop target for files.
         *
         * @attribute dragAndDropArea
         * @type {Node}
         * @default null
         */
		dragAndDropArea: {
			value: null,
            setter: function (val) {
                return Y.one(val);
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
                return (val >= 1 && val <= 5);
            }
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
         * The array of files to be uploaded. All elements in the array
	     * must be instances of `Y.File` and be instantiated with an instance
	     * of native JavaScript File() class.
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
        }
	}
});

Y.UploaderHTML5.UploaderQueue = UploaderQueue;



}, '@VERSION@' ,{requires:['widget', 'substitute', 'node-event-simulate', 'file-html5', 'uploader-queue']});
