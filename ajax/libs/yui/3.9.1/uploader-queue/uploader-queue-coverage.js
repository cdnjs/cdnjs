if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/uploader-queue/uploader-queue.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/uploader-queue/uploader-queue.js",
    code: []
};
_yuitest_coverage["build/uploader-queue/uploader-queue.js"].code=["YUI.add('uploader-queue', function (Y, NAME) {","","/**","* The class manages a queue of files that should be uploaded to the server.","* It initializes the required number of uploads, tracks them as they progress,","* and automatically advances to the next upload when a preceding one has completed.","* @module uploader-queue","*/","","","","/**","* This class manages a queue of files to be uploaded to the server.","* @class Uploader.Queue","* @extends Base","* @constructor","*/","var UploaderQueue = function() {","    this.queuedFiles = [];","    this.uploadRetries = {};","    this.numberOfUploads = 0;","    this.currentUploadedByteValues = {};","    this.currentFiles = {};","    this.totalBytesUploaded = 0;","    this.totalBytes = 0;","","    UploaderQueue.superclass.constructor.apply(this, arguments);","};","","","Y.extend(UploaderQueue, Y.Base, {","","    /**","    * Stored value of the current queue state","    * @property _currentState","    * @type {String}","    * @protected","    * @default UploaderQueue.STOPPED","    */","    _currentState: UploaderQueue.STOPPED,","","    /**","    * Construction logic executed during UploaderQueue instantiation.","    *","    * @method initializer","    * @protected","    */","    initializer : function () {},","","    /**","    * Handles and retransmits upload start event.","    *","    * @method _uploadStartHandler","    * @param event The event dispatched during the upload process.","    * @private","    */","    _uploadStartHandler : function (event) {","        var updatedEvent = event;","        updatedEvent.file = event.target;","        updatedEvent.originEvent = event;","","        this.fire(\"uploadstart\", updatedEvent);","    },","","    /**","    * Handles and retransmits upload error event.","    *","    * @method _uploadErrorHandler","    * @param event The event dispatched during the upload process.","    * @private","    */","    _uploadErrorHandler : function (event) {","        var errorAction = this.get(\"errorAction\"),","            updatedEvent = event,","            fileid,","            retries;","","        updatedEvent.file = event.target;","        updatedEvent.originEvent = event;","","        this.numberOfUploads-=1;","        delete this.currentFiles[event.target.get(\"id\")];","        this._detachFileEvents(event.target);","","        event.target.cancelUpload();","","        if (errorAction === UploaderQueue.STOP) {","            this.pauseUpload();","        }","","        else if (errorAction === UploaderQueue.RESTART_ASAP) {","            fileid = event.target.get(\"id\");","            retries = this.uploadRetries[fileid] || 0;","","            if (retries < this.get(\"retryCount\")) {","                this.uploadRetries[fileid] = retries + 1;","                this.addToQueueTop(event.target);","            }","            this._startNextFile();","        }","        else if (errorAction === UploaderQueue.RESTART_AFTER) {","            fileid = event.target.get(\"id\");","            retries = this.uploadRetries[fileid] || 0;","","            if (retries < this.get(\"retryCount\")) {","                this.uploadRetries[fileid] = retries + 1;","                this.addToQueueBottom(event.target);","            }","            this._startNextFile();","        }","","        this.fire(\"uploaderror\", updatedEvent);","    },","","    /**","    * Launches the upload of the next file in the queue.","    *","    * @method _startNextFile","    * @private","    */","    _startNextFile : function () {","        if (this.queuedFiles.length > 0) {","            var currentFile = this.queuedFiles.shift(),","                fileId = currentFile.get(\"id\"),","                parameters = this.get(\"perFileParameters\"),","                fileParameters = parameters.hasOwnProperty(fileId) ? parameters[fileId] : parameters;","","            this.currentUploadedByteValues[fileId] = 0;","","            currentFile.on(\"uploadstart\", this._uploadStartHandler, this);","            currentFile.on(\"uploadprogress\", this._uploadProgressHandler, this);","            currentFile.on(\"uploadcomplete\", this._uploadCompleteHandler, this);","            currentFile.on(\"uploaderror\", this._uploadErrorHandler, this);","            currentFile.on(\"uploadcancel\", this._uploadCancelHandler, this);","","            currentFile.set(\"xhrHeaders\", this.get(\"uploadHeaders\"));","            currentFile.set(\"xhrWithCredentials\", this.get(\"withCredentials\"));","","            currentFile.startUpload(this.get(\"uploadURL\"), fileParameters, this.get(\"fileFieldName\"));","","            this._registerUpload(currentFile);","        }","    },","","    /**","    * Register a new upload process.","    *","    * @method _registerUpload","    * @private","    */","    _registerUpload : function (file) {","        this.numberOfUploads += 1;","        this.currentFiles[file.get(\"id\")] = file;","    },","","    /**","    * Unregisters a new upload process.","    *","    * @method _unregisterUpload","    * @private","    */","    _unregisterUpload : function (file) {","        if (this.numberOfUploads > 0) {","            this.numberOfUploads -= 1;","        }","","        delete this.currentFiles[file.get(\"id\")];","        delete this.uploadRetries[file.get(\"id\")];","","        this._detachFileEvents(file);","    },","","    _detachFileEvents : function (file) {","        file.detach(\"uploadstart\", this._uploadStartHandler);","        file.detach(\"uploadprogress\", this._uploadProgressHandler);","        file.detach(\"uploadcomplete\", this._uploadCompleteHandler);","        file.detach(\"uploaderror\", this._uploadErrorHandler);","        file.detach(\"uploadcancel\", this._uploadCancelHandler);","    },","","    /**","    * Handles and retransmits upload complete event.","    *","    * @method _uploadCompleteHandler","    * @param event The event dispatched during the upload process.","    * @private","    */","    _uploadCompleteHandler : function (event) {","","        this._unregisterUpload(event.target);","","        this.totalBytesUploaded += event.target.get(\"size\");","        delete this.currentUploadedByteValues[event.target.get(\"id\")];","","","        if (this.queuedFiles.length > 0 && this._currentState === UploaderQueue.UPLOADING) {","            this._startNextFile();","        }","","        var updatedEvent = event,","            uploadedTotal = this.totalBytesUploaded,","            percentLoaded = Math.min(100, Math.round(10000*uploadedTotal/this.totalBytes) / 100);","","        updatedEvent.file = event.target;","        updatedEvent.originEvent = event;","","        Y.each(this.currentUploadedByteValues, function (value) {","            uploadedTotal += value;","        });","","        this.fire(\"totaluploadprogress\", {","            bytesLoaded: uploadedTotal,","            bytesTotal: this.totalBytes,","            percentLoaded: percentLoaded","        });","","        this.fire(\"uploadcomplete\", updatedEvent);","","        if (this.queuedFiles.length === 0 && this.numberOfUploads <= 0) {","            this.fire(\"alluploadscomplete\");","            this._currentState = UploaderQueue.STOPPED;","        }","    },","","    /**","    * Handles and retransmits upload cancel event.","    *","    * @method _uploadCancelHandler","    * @param event The event dispatched during the upload process.","    * @private","    */","    _uploadCancelHandler : function (event) {","","        var updatedEvent = event;","        updatedEvent.originEvent = event;","        updatedEvent.file = event.target;","","        this.fire(\"uploadcacel\", updatedEvent);","    },","","","","    /**","    * Handles and retransmits upload progress event.","    *","    * @method _uploadProgressHandler","    * @param event The event dispatched during the upload process.","    * @private","    */","    _uploadProgressHandler : function (event) {","","        this.currentUploadedByteValues[event.target.get(\"id\")] = event.bytesLoaded;","","        var updatedEvent = event,","            uploadedTotal = this.totalBytesUploaded,","            percentLoaded = Math.min(100, Math.round(10000*uploadedTotal/this.totalBytes) / 100);","","        updatedEvent.originEvent = event;","        updatedEvent.file = event.target;","","        this.fire(\"uploadprogress\", updatedEvent);","","        Y.each(this.currentUploadedByteValues, function (value) {","            uploadedTotal += value;","        });","","        this.fire(\"totaluploadprogress\", {","            bytesLoaded: uploadedTotal,","            bytesTotal: this.totalBytes,","            percentLoaded: percentLoaded","        });","    },","","    /**","    * Starts uploading the queued up file list.","    *","    * @method startUpload","    */","    startUpload: function() {","        this.queuedFiles = this.get(\"fileList\").slice(0);","        this.numberOfUploads = 0;","        this.currentUploadedByteValues = {};","        this.currentFiles = {};","        this.totalBytesUploaded = 0;","","        this._currentState = UploaderQueue.UPLOADING;","","        while (this.numberOfUploads < this.get(\"simUploads\") && this.queuedFiles.length > 0) {","            this._startNextFile();","        }","    },","","    /**","    * Pauses the upload process. The ongoing file uploads","    * will complete after this method is called, but no","    * new ones will be launched.","    *","    * @method pauseUpload","    */","    pauseUpload: function () {","        this._currentState = UploaderQueue.STOPPED;","    },","","    /**","    * Restarts a paused upload process.","    *","    * @method restartUpload","    */","    restartUpload: function () {","        this._currentState = UploaderQueue.UPLOADING;","        while (this.numberOfUploads < this.get(\"simUploads\")) {","             this._startNextFile();","        }","    },","","    /**","    * If a particular file is stuck in an ongoing upload without","    * any progress events, this method allows to force its reupload","    * by cancelling its upload and immediately relaunching it.","    *","    * @method forceReupload","    * @param file {Y.File} The file to force reupload on.","    */","    forceReupload : function (file) {","        var id = file.get(\"id\");","        if (this.currentFiles.hasOwnProperty(id)) {","            file.cancelUpload();","            this._unregisterUpload(file);","            this.addToQueueTop(file);","            this._startNextFile();","        }","    },","","    /**","    * Add a new file to the top of the queue (the upload will be","    * launched as soon as the current number of uploading files","    * drops below the maximum permissible value).","    *","    * @method addToQueueTop","    * @param file {Y.File} The file to add to the top of the queue.","    */","    addToQueueTop: function (file) {","            this.queuedFiles.unshift(file);","    },","","    /**","    * Add a new file to the bottom of the queue (the upload will be","    * launched after all the other queued files are uploaded.)","    *","    * @method addToQueueBottom","    * @param file {Y.File} The file to add to the bottom of the queue.","    */","    addToQueueBottom: function (file) {","            this.queuedFiles.push(file);","    },","","    /**","    * Cancels a specific file's upload. If no argument is passed,","    * all ongoing uploads are cancelled and the upload process is","    * stopped.","    *","    * @method cancelUpload","    * @param file {Y.File} An optional parameter - the file whose upload","    * should be cancelled.","    */","    cancelUpload: function (file) {","        var id,","            i,","            fid;","","        if (file) {","            id = file.get(\"id\");","","            if (this.currentFiles[id]) {","                this.currentFiles[id].cancelUpload();","                this._unregisterUpload(this.currentFiles[id]);","                if (this._currentState === UploaderQueue.UPLOADING) {","                    this._startNextFile();","                }","            }","            else {","                for (i = 0, len = this.queuedFiles.length; i < len; i++) {","                    if (this.queuedFiles[i].get(\"id\") === id) {","                        this.queuedFiles.splice(i, 1);","                        break;","                    }","                }","            }","        }","        else {","            for (fid in this.currentFiles) {","                this.currentFiles[fid].cancelUpload();","                this._unregisterUpload(this.currentFiles[fid]);","            }","","            this.currentUploadedByteValues = {};","            this.currentFiles = {};","            this.totalBytesUploaded = 0;","            this.fire(\"alluploadscancelled\");","            this._currentState = UploaderQueue.STOPPED;","        }","    }","}, {","    /**","    * Static constant for the value of the `errorAction` attribute:","    * prescribes the queue to continue uploading files in case of","    * an error.","    * @property CONTINUE","    * @readOnly","    * @type {String}","    * @static","    */","    CONTINUE: \"continue\",","","    /**","    * Static constant for the value of the `errorAction` attribute:","    * prescribes the queue to stop uploading files in case of","    * an error.","    * @property STOP","    * @readOnly","    * @type {String}","    * @static","    */","    STOP: \"stop\",","","    /**","    * Static constant for the value of the `errorAction` attribute:","    * prescribes the queue to restart a file upload immediately in case of","    * an error.","    * @property RESTART_ASAP","    * @readOnly","    * @type {String}","    * @static","    */","    RESTART_ASAP: \"restartasap\",","","    /**","    * Static constant for the value of the `errorAction` attribute:","    * prescribes the queue to restart an errored out file upload after","    * other files have finished uploading.","    * @property RESTART_AFTER","    * @readOnly","    * @type {String}","    * @static","    */","    RESTART_AFTER: \"restartafter\",","","    /**","    * Static constant for the value of the `_currentState` property:","    * implies that the queue is currently not uploading files.","    * @property STOPPED","    * @readOnly","    * @type {String}","    * @static","    */","    STOPPED: \"stopped\",","","    /**","    * Static constant for the value of the `_currentState` property:","    * implies that the queue is currently uploading files.","    * @property UPLOADING","    * @readOnly","    * @type {String}","    * @static","    */","    UPLOADING: \"uploading\",","","    /**","    * The identity of the class.","    *","    * @property NAME","    * @type String","    * @default 'uploaderqueue'","    * @readOnly","    * @protected","    * @static","    */","    NAME: 'uploaderqueue',","","    /**","    * Static property used to define the default attribute configuration of","    * the class.","    *","    * @property ATTRS","    * @type {Object}","    * @protected","    * @static","    */","    ATTRS: {","","        /**","        * Maximum number of simultaneous uploads; must be in the","        * range between 1 and 5. The value of `2` is default. It","        * is recommended that this value does not exceed 3.","        * @attribute simUploads","        * @type Number","        * @default 2","        */","         simUploads: {","                 value: 2,","                 validator: function (val) {","                         return (val >= 1 && val <= 5);","                 }","         },","","        /**","        * The action to take in case of error. The valid values for this attribute are:","        * `Y.Uploader.Queue.CONTINUE` (the upload process should continue on other files,","        * ignoring the error), `Y.Uploader.Queue.STOP` (the upload process","        * should stop completely), `Y.Uploader.Queue.RESTART_ASAP` (the upload","        * should restart immediately on the errored out file and continue as planned), or","        * Y.Uploader.Queue.RESTART_AFTER (the upload of the errored out file should restart","        * after all other files have uploaded)","        * @attribute errorAction","        * @type String","        * @default Y.Uploader.Queue.CONTINUE","        */","        errorAction: {","            value: \"continue\",","                validator: function (val) {","                return (","                    val === UploaderQueue.CONTINUE ||","                    val === UploaderQueue.STOP ||","                    val === UploaderQueue.RESTART_ASAP ||","                    val === UploaderQueue.RESTART_AFTER","                );","            }","        },","","        /**","        * The total number of bytes that has been uploaded.","        * @attribute bytesUploaded","        * @type Number","        */","        bytesUploaded: {","            readOnly: true,","            value: 0","        },","","        /**","        * The total number of bytes in the queue.","        * @attribute bytesTotal","        * @type Number","        */","        bytesTotal: {","            readOnly: true,","            value: 0","        },","","        /**","        * The queue file list. This file list should only be modified","        * before the upload has been started; modifying it after starting","        * the upload has no effect, and `addToQueueTop` or `addToQueueBottom` methods","        * should be used instead.","        * @attribute fileList","        * @type Array","        */","        fileList: {","            value: [],","            lazyAdd: false,","            setter: function (val) {","                var newValue = val;","                Y.Array.each(newValue, function (value) {","                    this.totalBytes += value.get(\"size\");","                }, this);","","                return val;","            }","        },","","        /**","        * A String specifying what should be the POST field name for the file","        * content in the upload request.","        *","        * @attribute fileFieldName","        * @type {String}","        * @default Filedata","        */","        fileFieldName: {","            value: \"Filedata\"","        },","","        /**","        * The URL to POST the file upload requests to.","        *","        * @attribute uploadURL","        * @type {String}","        * @default \"\"","        */","        uploadURL: {","            value: \"\"","        },","","        /**","        * Additional HTTP headers that should be included","        * in the upload request. Due to Flash Player security","        * restrictions, this attribute is only honored in the","        * HTML5 Uploader.","        *","        * @attribute uploadHeaders","        * @type {Object}","        * @default {}","        */","        uploadHeaders: {","            value: {}","        },","","        /**","        * A Boolean that specifies whether the file should be","        * uploaded with the appropriate user credentials for the","        * domain. Due to Flash Player security restrictions, this","        * attribute is only honored in the HTML5 Uploader.","        *","        * @attribute withCredentials","        * @type {Boolean}","        * @default true","        */","        withCredentials: {","            value: true","        },","","","        /**","        * An object, keyed by `fileId`, containing sets of key-value pairs","        * that should be passed as POST variables along with each corresponding","        * file.","        *","        * @attribute perFileParameters","        * @type {Object}","        * @default {}","        */","        perFileParameters: {","            value: {}","        },","","        /**","        * The number of times to try re-uploading a file that failed to upload before","        * cancelling its upload.","        *","        * @attribute retryCount","        * @type {Number}","        * @default 3","        */","        retryCount: {","            value: 3","        }","","    }","});","","","Y.namespace('Uploader');","Y.Uploader.Queue = UploaderQueue;","","","}, '@VERSION@', {\"requires\": [\"base\"]});"];
_yuitest_coverage["build/uploader-queue/uploader-queue.js"].lines = {"1":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"27":0,"31":0,"58":0,"59":0,"60":0,"62":0,"73":0,"78":0,"79":0,"81":0,"82":0,"83":0,"85":0,"87":0,"88":0,"91":0,"92":0,"93":0,"95":0,"96":0,"97":0,"99":0,"101":0,"102":0,"103":0,"105":0,"106":0,"107":0,"109":0,"112":0,"122":0,"123":0,"128":0,"130":0,"131":0,"132":0,"133":0,"134":0,"136":0,"137":0,"139":0,"141":0,"152":0,"153":0,"163":0,"164":0,"167":0,"168":0,"170":0,"174":0,"175":0,"176":0,"177":0,"178":0,"190":0,"192":0,"193":0,"196":0,"197":0,"200":0,"204":0,"205":0,"207":0,"208":0,"211":0,"217":0,"219":0,"220":0,"221":0,"234":0,"235":0,"236":0,"238":0,"252":0,"254":0,"258":0,"259":0,"261":0,"263":0,"264":0,"267":0,"280":0,"281":0,"282":0,"283":0,"284":0,"286":0,"288":0,"289":0,"301":0,"310":0,"311":0,"312":0,"325":0,"326":0,"327":0,"328":0,"329":0,"330":0,"343":0,"354":0,"367":0,"371":0,"372":0,"374":0,"375":0,"376":0,"377":0,"378":0,"382":0,"383":0,"384":0,"385":0,"391":0,"392":0,"393":0,"396":0,"397":0,"398":0,"399":0,"400":0,"502":0,"521":0,"562":0,"563":0,"564":0,"567":0,"652":0,"653":0};
_yuitest_coverage["build/uploader-queue/uploader-queue.js"].functions = {"UploaderQueue:18":0,"_uploadStartHandler:57":0,"_uploadErrorHandler:72":0,"_startNextFile:121":0,"_registerUpload:151":0,"_unregisterUpload:162":0,"_detachFileEvents:173":0,"(anonymous 2):207":0,"_uploadCompleteHandler:188":0,"_uploadCancelHandler:232":0,"(anonymous 3):263":0,"_uploadProgressHandler:250":0,"startUpload:279":0,"pauseUpload:300":0,"restartUpload:309":0,"forceReupload:324":0,"addToQueueTop:342":0,"addToQueueBottom:353":0,"cancelUpload:366":0,"validator:501":0,"validator:520":0,"(anonymous 4):563":0,"setter:561":0,"(anonymous 1):1":0};
_yuitest_coverage["build/uploader-queue/uploader-queue.js"].coveredLines = 138;
_yuitest_coverage["build/uploader-queue/uploader-queue.js"].coveredFunctions = 24;
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 1);
YUI.add('uploader-queue', function (Y, NAME) {

/**
* The class manages a queue of files that should be uploaded to the server.
* It initializes the required number of uploads, tracks them as they progress,
* and automatically advances to the next upload when a preceding one has completed.
* @module uploader-queue
*/



/**
* This class manages a queue of files to be uploaded to the server.
* @class Uploader.Queue
* @extends Base
* @constructor
*/
_yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "(anonymous 1)", 1);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 18);
var UploaderQueue = function() {
    _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "UploaderQueue", 18);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 19);
this.queuedFiles = [];
    _yuitest_coverline("build/uploader-queue/uploader-queue.js", 20);
this.uploadRetries = {};
    _yuitest_coverline("build/uploader-queue/uploader-queue.js", 21);
this.numberOfUploads = 0;
    _yuitest_coverline("build/uploader-queue/uploader-queue.js", 22);
this.currentUploadedByteValues = {};
    _yuitest_coverline("build/uploader-queue/uploader-queue.js", 23);
this.currentFiles = {};
    _yuitest_coverline("build/uploader-queue/uploader-queue.js", 24);
this.totalBytesUploaded = 0;
    _yuitest_coverline("build/uploader-queue/uploader-queue.js", 25);
this.totalBytes = 0;

    _yuitest_coverline("build/uploader-queue/uploader-queue.js", 27);
UploaderQueue.superclass.constructor.apply(this, arguments);
};


_yuitest_coverline("build/uploader-queue/uploader-queue.js", 31);
Y.extend(UploaderQueue, Y.Base, {

    /**
    * Stored value of the current queue state
    * @property _currentState
    * @type {String}
    * @protected
    * @default UploaderQueue.STOPPED
    */
    _currentState: UploaderQueue.STOPPED,

    /**
    * Construction logic executed during UploaderQueue instantiation.
    *
    * @method initializer
    * @protected
    */
    initializer : function () {},

    /**
    * Handles and retransmits upload start event.
    *
    * @method _uploadStartHandler
    * @param event The event dispatched during the upload process.
    * @private
    */
    _uploadStartHandler : function (event) {
        _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "_uploadStartHandler", 57);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 58);
var updatedEvent = event;
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 59);
updatedEvent.file = event.target;
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 60);
updatedEvent.originEvent = event;

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 62);
this.fire("uploadstart", updatedEvent);
    },

    /**
    * Handles and retransmits upload error event.
    *
    * @method _uploadErrorHandler
    * @param event The event dispatched during the upload process.
    * @private
    */
    _uploadErrorHandler : function (event) {
        _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "_uploadErrorHandler", 72);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 73);
var errorAction = this.get("errorAction"),
            updatedEvent = event,
            fileid,
            retries;

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 78);
updatedEvent.file = event.target;
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 79);
updatedEvent.originEvent = event;

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 81);
this.numberOfUploads-=1;
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 82);
delete this.currentFiles[event.target.get("id")];
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 83);
this._detachFileEvents(event.target);

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 85);
event.target.cancelUpload();

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 87);
if (errorAction === UploaderQueue.STOP) {
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 88);
this.pauseUpload();
        }

        else {_yuitest_coverline("build/uploader-queue/uploader-queue.js", 91);
if (errorAction === UploaderQueue.RESTART_ASAP) {
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 92);
fileid = event.target.get("id");
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 93);
retries = this.uploadRetries[fileid] || 0;

            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 95);
if (retries < this.get("retryCount")) {
                _yuitest_coverline("build/uploader-queue/uploader-queue.js", 96);
this.uploadRetries[fileid] = retries + 1;
                _yuitest_coverline("build/uploader-queue/uploader-queue.js", 97);
this.addToQueueTop(event.target);
            }
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 99);
this._startNextFile();
        }
        else {_yuitest_coverline("build/uploader-queue/uploader-queue.js", 101);
if (errorAction === UploaderQueue.RESTART_AFTER) {
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 102);
fileid = event.target.get("id");
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 103);
retries = this.uploadRetries[fileid] || 0;

            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 105);
if (retries < this.get("retryCount")) {
                _yuitest_coverline("build/uploader-queue/uploader-queue.js", 106);
this.uploadRetries[fileid] = retries + 1;
                _yuitest_coverline("build/uploader-queue/uploader-queue.js", 107);
this.addToQueueBottom(event.target);
            }
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 109);
this._startNextFile();
        }}}

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 112);
this.fire("uploaderror", updatedEvent);
    },

    /**
    * Launches the upload of the next file in the queue.
    *
    * @method _startNextFile
    * @private
    */
    _startNextFile : function () {
        _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "_startNextFile", 121);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 122);
if (this.queuedFiles.length > 0) {
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 123);
var currentFile = this.queuedFiles.shift(),
                fileId = currentFile.get("id"),
                parameters = this.get("perFileParameters"),
                fileParameters = parameters.hasOwnProperty(fileId) ? parameters[fileId] : parameters;

            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 128);
this.currentUploadedByteValues[fileId] = 0;

            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 130);
currentFile.on("uploadstart", this._uploadStartHandler, this);
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 131);
currentFile.on("uploadprogress", this._uploadProgressHandler, this);
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 132);
currentFile.on("uploadcomplete", this._uploadCompleteHandler, this);
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 133);
currentFile.on("uploaderror", this._uploadErrorHandler, this);
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 134);
currentFile.on("uploadcancel", this._uploadCancelHandler, this);

            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 136);
currentFile.set("xhrHeaders", this.get("uploadHeaders"));
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 137);
currentFile.set("xhrWithCredentials", this.get("withCredentials"));

            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 139);
currentFile.startUpload(this.get("uploadURL"), fileParameters, this.get("fileFieldName"));

            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 141);
this._registerUpload(currentFile);
        }
    },

    /**
    * Register a new upload process.
    *
    * @method _registerUpload
    * @private
    */
    _registerUpload : function (file) {
        _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "_registerUpload", 151);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 152);
this.numberOfUploads += 1;
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 153);
this.currentFiles[file.get("id")] = file;
    },

    /**
    * Unregisters a new upload process.
    *
    * @method _unregisterUpload
    * @private
    */
    _unregisterUpload : function (file) {
        _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "_unregisterUpload", 162);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 163);
if (this.numberOfUploads > 0) {
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 164);
this.numberOfUploads -= 1;
        }

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 167);
delete this.currentFiles[file.get("id")];
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 168);
delete this.uploadRetries[file.get("id")];

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 170);
this._detachFileEvents(file);
    },

    _detachFileEvents : function (file) {
        _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "_detachFileEvents", 173);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 174);
file.detach("uploadstart", this._uploadStartHandler);
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 175);
file.detach("uploadprogress", this._uploadProgressHandler);
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 176);
file.detach("uploadcomplete", this._uploadCompleteHandler);
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 177);
file.detach("uploaderror", this._uploadErrorHandler);
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 178);
file.detach("uploadcancel", this._uploadCancelHandler);
    },

    /**
    * Handles and retransmits upload complete event.
    *
    * @method _uploadCompleteHandler
    * @param event The event dispatched during the upload process.
    * @private
    */
    _uploadCompleteHandler : function (event) {

        _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "_uploadCompleteHandler", 188);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 190);
this._unregisterUpload(event.target);

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 192);
this.totalBytesUploaded += event.target.get("size");
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 193);
delete this.currentUploadedByteValues[event.target.get("id")];


        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 196);
if (this.queuedFiles.length > 0 && this._currentState === UploaderQueue.UPLOADING) {
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 197);
this._startNextFile();
        }

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 200);
var updatedEvent = event,
            uploadedTotal = this.totalBytesUploaded,
            percentLoaded = Math.min(100, Math.round(10000*uploadedTotal/this.totalBytes) / 100);

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 204);
updatedEvent.file = event.target;
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 205);
updatedEvent.originEvent = event;

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 207);
Y.each(this.currentUploadedByteValues, function (value) {
            _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "(anonymous 2)", 207);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 208);
uploadedTotal += value;
        });

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 211);
this.fire("totaluploadprogress", {
            bytesLoaded: uploadedTotal,
            bytesTotal: this.totalBytes,
            percentLoaded: percentLoaded
        });

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 217);
this.fire("uploadcomplete", updatedEvent);

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 219);
if (this.queuedFiles.length === 0 && this.numberOfUploads <= 0) {
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 220);
this.fire("alluploadscomplete");
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 221);
this._currentState = UploaderQueue.STOPPED;
        }
    },

    /**
    * Handles and retransmits upload cancel event.
    *
    * @method _uploadCancelHandler
    * @param event The event dispatched during the upload process.
    * @private
    */
    _uploadCancelHandler : function (event) {

        _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "_uploadCancelHandler", 232);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 234);
var updatedEvent = event;
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 235);
updatedEvent.originEvent = event;
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 236);
updatedEvent.file = event.target;

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 238);
this.fire("uploadcacel", updatedEvent);
    },



    /**
    * Handles and retransmits upload progress event.
    *
    * @method _uploadProgressHandler
    * @param event The event dispatched during the upload process.
    * @private
    */
    _uploadProgressHandler : function (event) {

        _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "_uploadProgressHandler", 250);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 252);
this.currentUploadedByteValues[event.target.get("id")] = event.bytesLoaded;

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 254);
var updatedEvent = event,
            uploadedTotal = this.totalBytesUploaded,
            percentLoaded = Math.min(100, Math.round(10000*uploadedTotal/this.totalBytes) / 100);

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 258);
updatedEvent.originEvent = event;
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 259);
updatedEvent.file = event.target;

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 261);
this.fire("uploadprogress", updatedEvent);

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 263);
Y.each(this.currentUploadedByteValues, function (value) {
            _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "(anonymous 3)", 263);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 264);
uploadedTotal += value;
        });

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 267);
this.fire("totaluploadprogress", {
            bytesLoaded: uploadedTotal,
            bytesTotal: this.totalBytes,
            percentLoaded: percentLoaded
        });
    },

    /**
    * Starts uploading the queued up file list.
    *
    * @method startUpload
    */
    startUpload: function() {
        _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "startUpload", 279);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 280);
this.queuedFiles = this.get("fileList").slice(0);
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 281);
this.numberOfUploads = 0;
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 282);
this.currentUploadedByteValues = {};
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 283);
this.currentFiles = {};
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 284);
this.totalBytesUploaded = 0;

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 286);
this._currentState = UploaderQueue.UPLOADING;

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 288);
while (this.numberOfUploads < this.get("simUploads") && this.queuedFiles.length > 0) {
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 289);
this._startNextFile();
        }
    },

    /**
    * Pauses the upload process. The ongoing file uploads
    * will complete after this method is called, but no
    * new ones will be launched.
    *
    * @method pauseUpload
    */
    pauseUpload: function () {
        _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "pauseUpload", 300);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 301);
this._currentState = UploaderQueue.STOPPED;
    },

    /**
    * Restarts a paused upload process.
    *
    * @method restartUpload
    */
    restartUpload: function () {
        _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "restartUpload", 309);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 310);
this._currentState = UploaderQueue.UPLOADING;
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 311);
while (this.numberOfUploads < this.get("simUploads")) {
             _yuitest_coverline("build/uploader-queue/uploader-queue.js", 312);
this._startNextFile();
        }
    },

    /**
    * If a particular file is stuck in an ongoing upload without
    * any progress events, this method allows to force its reupload
    * by cancelling its upload and immediately relaunching it.
    *
    * @method forceReupload
    * @param file {Y.File} The file to force reupload on.
    */
    forceReupload : function (file) {
        _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "forceReupload", 324);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 325);
var id = file.get("id");
        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 326);
if (this.currentFiles.hasOwnProperty(id)) {
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 327);
file.cancelUpload();
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 328);
this._unregisterUpload(file);
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 329);
this.addToQueueTop(file);
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 330);
this._startNextFile();
        }
    },

    /**
    * Add a new file to the top of the queue (the upload will be
    * launched as soon as the current number of uploading files
    * drops below the maximum permissible value).
    *
    * @method addToQueueTop
    * @param file {Y.File} The file to add to the top of the queue.
    */
    addToQueueTop: function (file) {
            _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "addToQueueTop", 342);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 343);
this.queuedFiles.unshift(file);
    },

    /**
    * Add a new file to the bottom of the queue (the upload will be
    * launched after all the other queued files are uploaded.)
    *
    * @method addToQueueBottom
    * @param file {Y.File} The file to add to the bottom of the queue.
    */
    addToQueueBottom: function (file) {
            _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "addToQueueBottom", 353);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 354);
this.queuedFiles.push(file);
    },

    /**
    * Cancels a specific file's upload. If no argument is passed,
    * all ongoing uploads are cancelled and the upload process is
    * stopped.
    *
    * @method cancelUpload
    * @param file {Y.File} An optional parameter - the file whose upload
    * should be cancelled.
    */
    cancelUpload: function (file) {
        _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "cancelUpload", 366);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 367);
var id,
            i,
            fid;

        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 371);
if (file) {
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 372);
id = file.get("id");

            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 374);
if (this.currentFiles[id]) {
                _yuitest_coverline("build/uploader-queue/uploader-queue.js", 375);
this.currentFiles[id].cancelUpload();
                _yuitest_coverline("build/uploader-queue/uploader-queue.js", 376);
this._unregisterUpload(this.currentFiles[id]);
                _yuitest_coverline("build/uploader-queue/uploader-queue.js", 377);
if (this._currentState === UploaderQueue.UPLOADING) {
                    _yuitest_coverline("build/uploader-queue/uploader-queue.js", 378);
this._startNextFile();
                }
            }
            else {
                _yuitest_coverline("build/uploader-queue/uploader-queue.js", 382);
for (i = 0, len = this.queuedFiles.length; i < len; i++) {
                    _yuitest_coverline("build/uploader-queue/uploader-queue.js", 383);
if (this.queuedFiles[i].get("id") === id) {
                        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 384);
this.queuedFiles.splice(i, 1);
                        _yuitest_coverline("build/uploader-queue/uploader-queue.js", 385);
break;
                    }
                }
            }
        }
        else {
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 391);
for (fid in this.currentFiles) {
                _yuitest_coverline("build/uploader-queue/uploader-queue.js", 392);
this.currentFiles[fid].cancelUpload();
                _yuitest_coverline("build/uploader-queue/uploader-queue.js", 393);
this._unregisterUpload(this.currentFiles[fid]);
            }

            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 396);
this.currentUploadedByteValues = {};
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 397);
this.currentFiles = {};
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 398);
this.totalBytesUploaded = 0;
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 399);
this.fire("alluploadscancelled");
            _yuitest_coverline("build/uploader-queue/uploader-queue.js", 400);
this._currentState = UploaderQueue.STOPPED;
        }
    }
}, {
    /**
    * Static constant for the value of the `errorAction` attribute:
    * prescribes the queue to continue uploading files in case of
    * an error.
    * @property CONTINUE
    * @readOnly
    * @type {String}
    * @static
    */
    CONTINUE: "continue",

    /**
    * Static constant for the value of the `errorAction` attribute:
    * prescribes the queue to stop uploading files in case of
    * an error.
    * @property STOP
    * @readOnly
    * @type {String}
    * @static
    */
    STOP: "stop",

    /**
    * Static constant for the value of the `errorAction` attribute:
    * prescribes the queue to restart a file upload immediately in case of
    * an error.
    * @property RESTART_ASAP
    * @readOnly
    * @type {String}
    * @static
    */
    RESTART_ASAP: "restartasap",

    /**
    * Static constant for the value of the `errorAction` attribute:
    * prescribes the queue to restart an errored out file upload after
    * other files have finished uploading.
    * @property RESTART_AFTER
    * @readOnly
    * @type {String}
    * @static
    */
    RESTART_AFTER: "restartafter",

    /**
    * Static constant for the value of the `_currentState` property:
    * implies that the queue is currently not uploading files.
    * @property STOPPED
    * @readOnly
    * @type {String}
    * @static
    */
    STOPPED: "stopped",

    /**
    * Static constant for the value of the `_currentState` property:
    * implies that the queue is currently uploading files.
    * @property UPLOADING
    * @readOnly
    * @type {String}
    * @static
    */
    UPLOADING: "uploading",

    /**
    * The identity of the class.
    *
    * @property NAME
    * @type String
    * @default 'uploaderqueue'
    * @readOnly
    * @protected
    * @static
    */
    NAME: 'uploaderqueue',

    /**
    * Static property used to define the default attribute configuration of
    * the class.
    *
    * @property ATTRS
    * @type {Object}
    * @protected
    * @static
    */
    ATTRS: {

        /**
        * Maximum number of simultaneous uploads; must be in the
        * range between 1 and 5. The value of `2` is default. It
        * is recommended that this value does not exceed 3.
        * @attribute simUploads
        * @type Number
        * @default 2
        */
         simUploads: {
                 value: 2,
                 validator: function (val) {
                         _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "validator", 501);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 502);
return (val >= 1 && val <= 5);
                 }
         },

        /**
        * The action to take in case of error. The valid values for this attribute are:
        * `Y.Uploader.Queue.CONTINUE` (the upload process should continue on other files,
        * ignoring the error), `Y.Uploader.Queue.STOP` (the upload process
        * should stop completely), `Y.Uploader.Queue.RESTART_ASAP` (the upload
        * should restart immediately on the errored out file and continue as planned), or
        * Y.Uploader.Queue.RESTART_AFTER (the upload of the errored out file should restart
        * after all other files have uploaded)
        * @attribute errorAction
        * @type String
        * @default Y.Uploader.Queue.CONTINUE
        */
        errorAction: {
            value: "continue",
                validator: function (val) {
                _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "validator", 520);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 521);
return (
                    val === UploaderQueue.CONTINUE ||
                    val === UploaderQueue.STOP ||
                    val === UploaderQueue.RESTART_ASAP ||
                    val === UploaderQueue.RESTART_AFTER
                );
            }
        },

        /**
        * The total number of bytes that has been uploaded.
        * @attribute bytesUploaded
        * @type Number
        */
        bytesUploaded: {
            readOnly: true,
            value: 0
        },

        /**
        * The total number of bytes in the queue.
        * @attribute bytesTotal
        * @type Number
        */
        bytesTotal: {
            readOnly: true,
            value: 0
        },

        /**
        * The queue file list. This file list should only be modified
        * before the upload has been started; modifying it after starting
        * the upload has no effect, and `addToQueueTop` or `addToQueueBottom` methods
        * should be used instead.
        * @attribute fileList
        * @type Array
        */
        fileList: {
            value: [],
            lazyAdd: false,
            setter: function (val) {
                _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "setter", 561);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 562);
var newValue = val;
                _yuitest_coverline("build/uploader-queue/uploader-queue.js", 563);
Y.Array.each(newValue, function (value) {
                    _yuitest_coverfunc("build/uploader-queue/uploader-queue.js", "(anonymous 4)", 563);
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 564);
this.totalBytes += value.get("size");
                }, this);

                _yuitest_coverline("build/uploader-queue/uploader-queue.js", 567);
return val;
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
        * Additional HTTP headers that should be included
        * in the upload request. Due to Flash Player security
        * restrictions, this attribute is only honored in the
        * HTML5 Uploader.
        *
        * @attribute uploadHeaders
        * @type {Object}
        * @default {}
        */
        uploadHeaders: {
            value: {}
        },

        /**
        * A Boolean that specifies whether the file should be
        * uploaded with the appropriate user credentials for the
        * domain. Due to Flash Player security restrictions, this
        * attribute is only honored in the HTML5 Uploader.
        *
        * @attribute withCredentials
        * @type {Boolean}
        * @default true
        */
        withCredentials: {
            value: true
        },


        /**
        * An object, keyed by `fileId`, containing sets of key-value pairs
        * that should be passed as POST variables along with each corresponding
        * file.
        *
        * @attribute perFileParameters
        * @type {Object}
        * @default {}
        */
        perFileParameters: {
            value: {}
        },

        /**
        * The number of times to try re-uploading a file that failed to upload before
        * cancelling its upload.
        *
        * @attribute retryCount
        * @type {Number}
        * @default 3
        */
        retryCount: {
            value: 3
        }

    }
});


_yuitest_coverline("build/uploader-queue/uploader-queue.js", 652);
Y.namespace('Uploader');
_yuitest_coverline("build/uploader-queue/uploader-queue.js", 653);
Y.Uploader.Queue = UploaderQueue;


}, '@VERSION@', {"requires": ["base"]});
