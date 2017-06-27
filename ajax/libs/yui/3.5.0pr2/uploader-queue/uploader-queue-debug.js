YUI.add('uploader-queue', function(Y) {


    /**
     * The class manages a queue of files that should be uploaded to the server.
     * It initializes the required number of uploads, tracks them as they progress,
     * and automatically advances to the next upload when a preceding one has completed.
     * @module uploader-queue
     */     

    var Lang = Y.Lang,
        Bind = Y.bind,
        Win = Y.config.win,
        currentUploads,
        currentFiles,
        errorFiles,
        lastUploadPointer,
        fileListLength,
        uploadsLeftCounter,
        totalBytesUploaded,
        totalBytes;


    /**
     * The class manages a queue of files to be uploaded to the server.
     * @class UploaderQueue
     * @extends Base
     * @constructor
     */
    var UploaderQueue = function(o) {
        currentUploads = {};
        currentFiles = {};
        errorFiles = [];
        lastUploadPointer = 0;
        fileListLength = 0;
        uploadsLeftCounter = 0;
        totalBytesUploaded = 0;
        totalBytes = 0;      
        UploaderQueue.superclass.constructor.apply(this, arguments);
    };


    Y.extend(UploaderQueue, Y.Base, {

        _currentState: UploaderQueue.STOPPED,

        initializer : function (cfg) {

        },

        _uploadErrorHandler : function (event) {
           var errorAction = this.get("errorAction");
           var updatedEvent = event;
           updatedEvent.file = event.target;
           updatedEvent.originEvent = event;
           
           if (errorAction === UploaderQueue.STOP) {
             this.pauseUpload();
           }
           else if (errorAction === UploaderQueue.RESTART_ASAP || errorAction === UploaderQueue.RESTART_AFTER) {
            errorFiles.push(event.target);
           }

           this.fire("uploaderror", updatedEvent);  
        },

        _uploadCompleteHandler : function (event) {
                      
           uploadsLeftCounter -= 1;

           totalBytesUploaded += event.target.get("size");
           delete currentUploads[event.target.get("id")];
           delete currentFiles[event.target.get("id")];

           var errorAction = this.get("errorAction");

           console.log(errorAction);
           console.log(lastUploadPointer < fileListLength);
           console.log(this._currentState === UploaderQueue.UPLOADING);
           console.log(errorAction === UploaderQueue.STOP);
           console.log(errorAction === UploaderQueue.CONTINUE);
           console.log((errorAction === UploaderQueue.STOP || errorAction === UploaderQueue.CONTINUE));

           if (lastUploadPointer < fileListLength && this._currentState === UploaderQueue.UPLOADING && 
               (errorAction === UploaderQueue.STOP || errorAction === UploaderQueue.CONTINUE)) {
               var currentFile = this.get("fileList")[lastUploadPointer],
                   fid = currentFile.get("id"),
               parameters = this.get("perFileParameters"),
               fileParameters = parameters.hasOwnProperty(fid) ? parameters[fid] : parameters;
 
               currentFile.on("uploadprogress", this._uploadProgressHandler, this);
               currentFile.on("uploadcomplete", this._uploadCompleteHandler, this);
               currentFile.on("uploaderror", this._uploadErrorHandler, this);

               currentFile.startUpload(this.get("uploadURL"), fileParameters, this.get("fileFieldName"));
               currentUploads[currentFile.get("id")] = 0;
               currentFiles[currentFile.get("id")] = currentFile;
            
               lastUploadPointer += 1;
           }

           else if (this._currentState === UploaderQueue.UPLOADING && errorAction === UploaderQueue.RESTART_ASAP && errorFiles.length > 0) {
               var currentFile = errorFiles.shift(),
                   fid = currentFile.get("id"),
                   parameters = this.get("perFileParameters"),
                   fileParameters = parameters.hasOwnProperty(fid) ? parameters[fid] : parameters;
 
                   currentFile.on("uploadprogress", this._uploadProgressHandler, this);
                   currentFile.on("uploadcomplete", this._uploadCompleteHandler, this);
                   currentFile.on("uploaderror", this._uploadErrorHandler, this);

                   currentFile.startUpload(this.get("uploadURL"), fileParameters, this.get("fileFieldName"));
                   currentUploads[currentFile.get("id")] = 0;
                   currentFiles[currentFile.get("id")] = currentFile;
           }
           
           var updatedEvent = event;
           updatedEvent.file = event.target;
           updatedEvent.originEvent = event;

           this.fire("uploadcomplete", updatedEvent);

           if (uploadsLeftCounter == 0) {
               this.fire("alluploadscomplete");
           }
        },

        _uploadProgressHandler : function (event) {
          
          currentUploads[event.target.get("id")] = event.bytesLoaded;
          
          var updatedEvent = event;
          updatedEvent.originEvent = event;
          updatedEvent.file = event.target;

          this.fire("uploadprogress", updatedEvent);
          
          var uploadedTotal = totalBytesUploaded;
          Y.each(currentUploads, function (value) {
             uploadedTotal += value; 
          });
          
          var percentLoaded = Math.min(100, Math.round(10000*uploadedTotal/totalBytes) / 100);

          this.fire("totaluploadprogress", {bytesLoaded: uploadedTotal, 
                                            bytesTotal: totalBytes,
                                            percentLoaded: percentLoaded});
        },

        startUpload: function() {
           
           currentUploads = {};
           currentFiles = {};
           errorFiles = [];
           uploadsLeftCounter = fileListLength;
           lastUploadPointer = 0; 
           totalBytesUploaded = 0;
           
           this._currentState = UploaderQueue.UPLOADING;

           while (lastUploadPointer < this.get("simUploads") && lastUploadPointer < fileListLength) {

               var currentFile = this.get("fileList")[lastUploadPointer],
                   fileId = currentFile.get("id"),
                   parameters = this.get("perFileParameters"),
                   fileParameters = parameters.hasOwnProperty(fileId) ? parameters[fileId] : parameters;

               currentUploads[fileId] = 0;
               currentFiles[fileId] = currentFile;

               currentFile.on("uploadprogress", this._uploadProgressHandler, this);
               currentFile.on("uploadcomplete", this._uploadCompleteHandler, this);
               currentFile.on("uploaderror", this._uploadErrorHandler, this);

               currentFile.startUpload(this.get("uploadURL"), fileParameters, this.get("fileFieldName"));
               lastUploadPointer+=1;
           }
        },


        pauseUpload: function () {
            this._currentState = UploaderQueue.STOPPED;
        },

        restartUpload: function () {
            this._currentState = UploaderQueue.UPLOADING;
            if (lastUploadPointer < fileListLength) {
               var currentFile = this.get("fileList")[lastUploadPointer],
                   fid = currentFile.get("id"),
               parameters = this.get("perFileParameters"),
               fileParameters = parameters.hasOwnProperty(fid) ? parameters[fid] : parameters;
 
               currentFile.on("uploadprogress", this._uploadProgressHandler, this);
               currentFile.on("uploadcomplete", this._uploadCompleteHandler, this);
               currentFile.on("uploaderror", this._uploadErrorHandler, this);

               currentFile.startUpload(this.get("uploadURL"), fileParameters, this.get("fileFieldName"));
               currentUploads[currentFile.get("id")] = 0;
               currentFiles[currentFile.get("id")] = currentFile;
            
               lastUploadPointer += 1;
           }
        },

        cancelUpload: function () {
            var fList = this.get("fileList");
            for (fid in currentFiles) {
              currentFiles[fid].cancel();
            }

            currentUploads = {};
            currentFiles = {};
            errorFiles = [];
            uploadsLeftCounter = fileListLength;
            lastUploadPointer = 0;
            totalBytesUploaded = 0;
        }
    }, {

        CONTINUE: "continue",
        STOP: "stop",
        RESTART_ASAP: "restartasap",
        RESTART_AFTER: "restartafter",
        STOPPED: "stopped",
        UPLOADING: "uploading",

        NAME: 'uploaderqueue',

        ATTRS: {
       
       /**
        * @property simUploads
        * @type Number
        * @description Maximum number of simultaneous uploads
        */
        simUploads: {
            value: 2,
            validator: function (val, name) {
                return (val >= 2 && val <= 5);
            }
        },

        errorAction: {
            value: "continue",
            validator: function (val, name) {
                return (val === UploaderQueue.CONTINUE || val === UploaderQueue.STOP || val === UploaderQueue.RESTART_ASAP || val === UploaderQueue.RESTART_AFTER);
            }
        },

        bytesUploaded: {
            readOnly: true,
            value: 0
        },

        bytesTotal: {
            readOnly: true,
            value: 0
        },

        fileList: {
            value: [],
            lazyAdd: false,
            setter: function (val) {
                var newValue = val;
                Y.each(newValue, function (value) {
                    totalBytes += value.get("size");
                });
                fileListLength = uploadsLeftCounter = newValue.length;

                return val;
            }   
        },

        fileFieldName: {
           value: "Filedata"
        },

        uploadURL: {
          value: ""
        },

        perFileParameters: {
          value: {}
        }
        }
    });


    Y.namespace('Uploader');
    Y.Uploader.Queue = UploaderQueue;



}, '@VERSION@' ,{requires:['base']});
