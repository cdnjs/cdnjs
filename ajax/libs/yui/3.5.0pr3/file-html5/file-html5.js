YUI.add('file-html5', function(Y) {

    /**
     * The FileHTML5 class provides a wrapper for a file pointer in an HTML5 The File wrapper 
     * also implements the mechanics for uploading a file and tracking its progress.
     * @module file-html5
     */     
    /**
     * The class provides a wrapper for a file pointer.
     * @class FileHTML5
     * @extends Base
     * @constructor
     */
    var Lang = Y.Lang,
        Bind = Y.bind,
        Win = Y.config.win;

    var FileHTML5 = function(o) {
        
        var file = null;

        if (FileHTML5.isValidFile(o)) {
            file = o;
        }
        else if (FileHTML5.isValidFile(o.file)) {
            file = o.file;
        }
        else {
            file = false;
        }

        FileHTML5.superclass.constructor.apply(this, arguments);      
        
        if (file && FileHTML5.canUpload()) {
           if (!this.get("file")) {
               this._set("file", file);
           }
           if (!this.get("html5")) {       
           this._set("html5", true);
           }
           if (!this.get("name")) {
           this._set("name", file.name || file.fileName);
           }
           if (this.get("size") != (file.size || file.fileSize)) {
           this._set("size", file.size || file.fileSize);
           }
           if (!this.get("type")) {
           this._set("type", file.type);
           }
           if (file.hasOwnProperty("lastModifiedDate") && !this.get("dateModified")) {
               this._set("dateModified", file.lastModifiedDate);
           }
        }
    };


    Y.extend(FileHTML5, Y.Base, {

        initializer : function (cfg) {
            if (!this.get("id")) {
                this._set("id", Y.guid("file"));
            }
        },

        _uploadEventHandler: function (event) {
            switch (event.type) {
                case "progress":
                   this.fire("uploadprogress", {originEvent: event,
                                               bytesLoaded: event.loaded, 
                                               bytesTotal: this.get("size"), 
                                               percentLoaded: Math.min(100, Math.round(10000*event.loaded/this.get("size"))/100)
                                               });
                   this._set("bytesUploaded", event.loaded);
                   break;

                case "load":
                    this.fire("uploadcomplete", {originEvent: event,
                                                 data: event.target.responseText});
                    var xhrupload = this.get("xhr").upload,
                        xhr = this.get("xhr"),
                        boundEventHandler = this.get("boundEventHandler");

                    xhrupload.removeEventListener ("progress", boundEventHandler);
                    xhrupload.removeEventListener ("error", boundEventHandler);
                    xhrupload.removeEventListener ("abort", boundEventHandler);
                    xhr.removeEventListener ("load", boundEventHandler); 
                    xhr.removeEventListener ("readystatechange", boundEventHandler);
                    
                    this._set("xhr", null);                   
                   break;

                case "error":
                   var xhr = this.get("xhr");
                   this.fire("uploaderror", {originEvent: event,
                                                  status: xhr.status,
                                                  statusText: xhr.statusText});
                   break;

                case "abort":
                   this.fire("uploadcancel", {originEvent: event});
                   break;

                case "readystatechange":
                   this.fire("readystatechange", {readyState: event.target.readyState,
                                                  originEvent: event});
                   break;
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
         
            this._set("bytesUploaded", 0);

                 this._set("xhr", new XMLHttpRequest());
                 this._set("boundEventHandler", Bind(this._uploadEventHandler, this));
                         
                 var uploadData = new FormData(),
                     fileField = fileFieldName || "Filedata",
                     xhr = this.get("xhr"),
                     xhrupload = this.get("xhr").upload,
                     boundEventHandler = this.get("boundEventHandler");

            Y.each(parameters, function (value, key) {uploadData.append(key, value);});
            uploadData.append(fileField, this.get("file"));

             xhrupload.addEventListener ("progress", boundEventHandler, false);
             xhrupload.addEventListener ("error", boundEventHandler, false);
             xhrupload.addEventListener ("abort", boundEventHandler, false);

             xhr.addEventListener ("load", boundEventHandler, false); 
             xhr.addEventListener ("readystatechange", boundEventHandler, false);


             xhr.open("POST", url, true);
             xhr.send(uploadData);

             this.fire("uploadstart", {xhr: xhr});

        },
   /**
    * Cancels the upload of a specific file, if currently in progress.
    *
    * @method cancelUpload
    */  
        cancelUpload: function () {
            this.get('xhr').abort();
        },


    }, {

        NAME: 'file',

        TYPE: 'html5',

        ATTRS: {

        html5: {
            readOnly: true,
            value: false
        },

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
        xhr: {
            readOnly: true,
            value: null
        },

        boundEventHandler: {
            readOnly: true,
            value: null
        }
        },
   /**
    * Checks whether a specific native file instance is valid
    *
    * @method isValidFile
    * @param file {File} A native File() instance.
    */
        isValidFile: function (file) {
            return (Win && Win.File && file instanceof File);
        },

   /**
    * Checks whether the browser has a native upload capability
    * via XMLHttpRequest Level 2.
    *
    * @method canUpload
    */
        canUpload: function () {
            return (Win && Win.FormData && Win.XMLHttpRequest);
        }
    });

    Y.FileHTML5 = FileHTML5;


}, '@VERSION@' ,{requires:['base']});
