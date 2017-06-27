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
        queuedFiles,
        numberOfUploads,        
        currentUploadedByteValues,
        currentFiles,
        totalBytesUploaded,
        totalBytes;

    /**
     * The class manages a queue of files to be uploaded to the server.
     * @class UploaderQueue
     * @extends Base
     * @constructor
     */
    var UploaderQueue = function(o) {
        this.queuedFiles = [],
        this.numberOfUploads = 0,
        this.currentUploadedByteValues = {},
        this.currentFiles = {},
        this.totalBytesUploaded = 0,
        this.totalBytes = 0;      
  
        UploaderQueue.superclass.constructor.apply(this, arguments);
    };


    Y.extend(UploaderQueue, Y.Base, {

        _currentState: UploaderQueue.STOPPED,

        initializer : function (cfg) {

        },

        _uploadStartHandler : function (event) {
           var updatedEvent = event;
           updatedEvent.file = event.target;
           updatedEvent.originEvent = event;
           
           this.fire("uploadstart", updatedEvent);          
        },

        _uploadErrorHandler : function (event) {
           var errorAction = this.get("errorAction");
           var updatedEvent = event;
           updatedEvent.file = event.target;
           updatedEvent.originEvent = event;

           this.numberOfUploads-=1;
           delete this.currentFiles[event.target.get("id")];
           
           event.target.cancelUpload();

           if (errorAction === UploaderQueue.STOP) {
             this.pauseUpload();
           }

           else if (errorAction === UploaderQueue.RESTART_ASAP) {
             this.queuedFiles.unshift(event.target);
             this._startNextFile();
           }
           else if (errorAction === UploaderQueue.RESTART_AFTER) {
            this.queuedFiles.push(event.target);
            this._startNextFile();
           }

           this.fire("uploaderror", updatedEvent);  
        },

        _startNextFile : function () {
          if (this.queuedFiles.length > 0) {
            var currentFile = this.queuedFiles.shift(),
               fileId = currentFile.get("id"),
               parameters = this.get("perFileParameters"),
               fileParameters = parameters.hasOwnProperty(fileId) ? parameters[fileId] : parameters;

               this.currentUploadedByteValues[fileId] = 0;

               currentFile.on("uploadstart", this._uploadStartHandler, this);
               currentFile.on("uploadprogress", this._uploadProgressHandler, this);
               currentFile.on("uploadcomplete", this._uploadCompleteHandler, this);
               currentFile.on("uploaderror", this._uploadErrorHandler, this);

               currentFile.startUpload(this.get("uploadURL"), fileParameters, this.get("fileFieldName"));

               this._registerUpload(currentFile);
          }
        },

        _registerUpload : function (file) {
          this.numberOfUploads += 1;
          this.currentFiles[file.get("id")] = file;
        },

        _unregisterUpload : function (file) {
          if (this.numberOfUploads > 0) {
            this.numberOfUploads -=1;
          }
          delete this.currentFiles[file.get("id")];
        },

        _uploadCompleteHandler : function (event) {

           this._unregisterUpload(event.target);

           this.totalBytesUploaded += event.target.get("size");
           delete this.currentUploadedByteValues[event.target.get("id")];


           if (this.queuedFiles.length > 0 && this._currentState === UploaderQueue.UPLOADING) {
               this._startNextFile();
           }
           
           var updatedEvent = event;
           updatedEvent.file = event.target;
           updatedEvent.originEvent = event;

           this.fire("uploadcomplete", updatedEvent);

           if (this.queuedFiles.length == 0 && this.currentFiles.length == 0) {
               this.fire("alluploadscomplete");
           }
        },

        _uploadProgressHandler : function (event) {
          
          this.currentUploadedByteValues[event.target.get("id")] = event.bytesLoaded;
          
          var updatedEvent = event;
          updatedEvent.originEvent = event;
          updatedEvent.file = event.target;

          this.fire("uploadprogress", updatedEvent);
          
          var uploadedTotal = this.totalBytesUploaded;

          Y.each(this.currentUploadedByteValues, function (value) {
             uploadedTotal += value; 
          });
          
          var percentLoaded = Math.min(100, Math.round(10000*uploadedTotal/this.totalBytes) / 100);

          this.fire("totaluploadprogress", {bytesLoaded: uploadedTotal, 
                                            bytesTotal: this.totalBytes,
                                            percentLoaded: percentLoaded});
        },

        startUpload: function() {
           
           this.queuedFiles = this.get("fileList").slice(0);
           this.numberOfUploads = 0;
           this.currentUploadedByteValues = {};
           this.currentFiles = {};
           this.totalBytesUploaded = 0;
           
           this._currentState = UploaderQueue.UPLOADING;

           while (this.numberOfUploads < this.get("simUploads") && this.queuedFiles.length > 0) {
                this._startNextFile();
           }
        },


        pauseUpload: function () {
            this._currentState = UploaderQueue.STOPPED;
        },

        restartUpload: function () {
            this._currentState = UploaderQueue.UPLOADING;
            while (this.numberOfUploads < this.get("simUploads")) {
               this._startNextFile();
            }
        },

        forceReupload : function (file) {
            var id = file.get("id");
            if (this.currentFiles.hasOwnProperty(id)) {
              file.cancelUpload();
              this._unregisterUpload(file);
              this.queuedFiles.unshift(file);
              this._startNextFile();
            }
        },

        cancelUpload: function (file) {
            for (fid in this.currentFiles) {
              this.currentFiles[fid].cancel();
              this._unregisterUpload(this.currentFiles[fid]);
            }

            this.currentUploadedByteValues = {};
            this.currentFiles = {};
            this.totalBytesUploaded = 0;
        }
    }, 

    {
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
                return (val >= 1 && val <= 5);
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
                Y.Array.each(newValue, function (value) {
                    this.totalBytes += value.get("size");
                }, this);
 
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
