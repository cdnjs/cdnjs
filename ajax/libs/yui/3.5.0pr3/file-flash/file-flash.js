YUI.add('file-flash', function(Y) {

    /**
     * The FileFlash class provides a wrapper for a file pointer stored in Flash. The File wrapper 
     * also implements the mechanics for uploading a file and tracking its progress.
     * @module file-flash
     */     
    /**
     * The class provides a wrapper for a file pointer in Flash.
     * @class FileFlash
     * @extends Base
     * @constructor
     */

    var FileFlash = function(o) {
        FileFlash.superclass.constructor.apply(this, arguments);   
    };

    Y.extend(FileFlash, Y.Base, {

        initializer : function (cfg) {
            if (!this.get("id")) {
                this._set("id", Y.guid("file"));
            }
        },
        
        _swfEventHandler: function (event) {
          if (event.id === this.get("id")) {
          switch (event.type) {
            case "uploadstart":
                 this.fire("uploadstart", {uploader: this.get("uploader")});
                 break;
            case "uploadprogress":
                 this.fire("uploadprogress", {originEvent: event,
                                              bytesLoaded: event.bytesLoaded, 
                                              bytesTotal: event.bytesTotal, 
                                              percentLoaded: Math.min(100, Math.round(10000*event.bytesLoaded/event.bytesTotal)/100)
                                             });
                 this._set("bytesUploaded", event.bytesLoaded);
                 break;
            case "uploadcomplete":
                 this.fire("uploadfinished", {originEvent: event});
                 break;
            case "uploadcompletedata":
                 this.fire("uploadcomplete", {originEvent: event,
                                              data: event.data});  
                 break;
            case "uploadcancel":
                 this.fire("uploadcancel", {originEvent: event});
                 break;
            case "uploaderror":
                 this.fire("uploaderror", {originEvent: event});         

          }
        }
        },

   /**
    * Starts the upload of a specific file.
    *
    * @method startUpload
    * @param url {String} The URL to upload the file to.
    * @param parameters {Object} (optional) A set of key-value pairs to send as variables along with the file upload HTTP request.
    * @param fileFieldName {String} (optional) The name of the POST variable that should contain the uploaded file ('Filedata' by default)
    * @return {Boolean} This method always returns true.
    */

        startUpload: function(url, parameters, fileFieldName) {
         
        if (this.get("uploader")) {

            var myUploader = this.get("uploader"),
                fileField = fileFieldName || "Filedata",
                id = this.get("id"),
                params = parameters || null;

            this._set("bytesUploaded", 0);
            
            myUploader.on("uploadstart", this._swfEventHandler, this);
            myUploader.on("uploadprogress", this._swfEventHandler, this);
            myUploader.on("uploadcomplete", this._swfEventHandler, this);
            myUploader.on("uploadcompletedata", this._swfEventHandler, this);
            myUploader.on("uploaderror", this._swfEventHandler, this);

            myUploader.callSWF("upload", [id, url, params, fileField]);
         }

        },
   /**
    * Cancels the upload of a specific file, if currently in progress.
    *
    * @method cancelUpload
    */  
        cancelUpload: function () {
         if (this.get("uploader")) {
           this.get("uploader").callSWF("cancel", [this.get("id")]);
         }
        },


    }, {

        NAME: 'file',

        TYPE: "flash",

        ATTRS: {

        id: {
            writeOnce: "initOnly",
            value: null
        },

        size: {
            writeOnce: "initOnly",
            value: 0
        },

        name: {
            writeOnce: "initOnly",
            value: null
        },

        dateCreated: {
            writeOnce: "initOnly",
            value: null
        },

        dateModified: {
            writeOnce: "initOnly",
            value: null
        },

        bytesUploaded: {
            readOnly: true,
            value: 0
        },

        type: {
            writeOnce: "initOnly",
            value: null
        },

        file: {
            writeOnce: "initOnly",
            value: null
        },

        uploader: {
            writeOnce: "initOnly",
            value: null
        },

        boundEventHandler: {
            readOnly: true,
            value: null
        }
        }
    });

    Y.FileFlash = FileFlash;


}, '@VERSION@' ,{requires:['base']});
