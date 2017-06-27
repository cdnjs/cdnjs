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
_yuitest_coverage["build/uploader-html5/uploader-html5.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/uploader-html5/uploader-html5.js",
    code: []
};
_yuitest_coverage["build/uploader-html5/uploader-html5.js"].code=["YUI.add('uploader-html5', function (Y, NAME) {","","/**","* This module provides a UI for file selection and multiple file upload capability using","* HTML5 XMLHTTPRequest Level 2 as a transport engine.","* The supported features include: automatic upload queue management, upload progress","* tracking, drag-and-drop support, server response retrieval and error reporting.","*","* @module uploader-html5","*/","","// Shorthands for the external modules","var  substitute  = Y.Lang.sub,","     UploaderQueue = Y.Uploader.Queue;","","/**","* This module provides a UI for file selection and multiple file upload capability using","* HTML5 XMLHTTPRequest Level 2 as a transport engine.","* @class UploaderHTML5","* @extends Widget","* @constructor","*/","function UploaderHTML5() {","    UploaderHTML5.superclass.constructor.apply ( this, arguments );","}","","","","Y.UploaderHTML5 = Y.extend( UploaderHTML5, Y.Widget, {","","    /**","    * Stored reference to the instance of the file input field used to","    * initiate the file selection dialog.","    *","    * @property _fileInputField","    * @type {Node}","    * @protected","    */","    _fileInputField: null,","","    /**","    * Stored reference to the click event binding of the `Select Files`","    * button.","    *","    * @property _buttonBinding","    * @type {EventHandle}","    * @protected","    */","    _buttonBinding: null,","","    /**","    * Stored reference to the instance of Uploader.Queue used to manage","    * the upload process. This is a read-only property that only exists","    * during an active upload process. Only one queue can be active at","    * a time; if an upload start is attempted while a queue is active,","    * it will be ignored.","    *","    * @property queue","    * @type {Y.Uploader.Queue}","    */","    queue: null,","","    // Y.UploaderHTML5 prototype","","    /**","    * Construction logic executed during UploaderHTML5 instantiation.","    *","    * @method initializer","    * @protected","    */","    initializer : function () {","","        this._fileInputField = null;","        this.queue = null;","        this._buttonBinding = null;","        this._fileList = [];","","        // Publish available events","","        /**","        * Signals that files have been selected.","        *","        * @event fileselect","        * @param event {Event} The event object for the `fileselect` with the","        *                      following payload:","        *  <dl>","        *      <dt>fileList</dt>","        *          <dd>An `Array` of files selected by the user, encapsulated","        *              in Y.FileHTML5 objects.</dd>","        *  </dl>","        */","        this.publish(\"fileselect\");","","        /**","        * Signals that an upload of multiple files has been started.","        *","        * @event uploadstart","        * @param event {Event} The event object for the `uploadstart`.","        */","        this.publish(\"uploadstart\");","","        /**","        * Signals that an upload of a specific file has started.","        *","        * @event fileuploadstart","        * @param event {Event} The event object for the `fileuploadstart` with the","        *                      following payload:","        *  <dl>","        *      <dt>file</dt>","        *          <dd>A reference to the Y.File that dispatched the event.</dd>","        *      <dt>originEvent</dt>","        *          <dd>The original event dispatched by Y.File.</dd>","        *  </dl>","        */","        this.publish(\"fileuploadstart\");","","        /**","        * Reports on upload progress of a specific file.","        *","        * @event uploadprogress","        * @param event {Event} The event object for the `uploadprogress` with the","        *                      following payload:","        *  <dl>","        *      <dt>file</dt>","        *          <dd>The pointer to the instance of `Y.File` that dispatched the event.</dd>","        *      <dt>bytesLoaded</dt>","        *          <dd>The number of bytes of the file that has been uploaded</dd>","        *      <dt>bytesTotal</dt>","        *          <dd>The total number of bytes in the file</dd>","        *      <dt>percentLoaded</dt>","        *          <dd>The fraction of the file that has been uploaded, out of 100</dd>","        *      <dt>originEvent</dt>","        *          <dd>The original event dispatched by the HTML5 uploader</dd>","        *  </dl>","        */","        this.publish(\"uploadprogress\");","","        /**","        * Reports on the total upload progress of the file list.","        *","        * @event totaluploadprogress","        * @param event {Event} The event object for the `totaluploadprogress` with the","        *                      following payload:","        *  <dl>","        *      <dt>bytesLoaded</dt>","        *          <dd>The number of bytes of the file list that has been uploaded</dd>","        *      <dt>bytesTotal</dt>","        *          <dd>The total number of bytes in the file list</dd>","        *      <dt>percentLoaded</dt>","        *          <dd>The fraction of the file list that has been uploaded, out of 100</dd>","        *  </dl>","        */","        this.publish(\"totaluploadprogress\");","","        /**","        * Signals that a single file upload has been completed.","        *","        * @event uploadcomplete","        * @param event {Event} The event object for the `uploadcomplete` with the","        *                      following payload:","        *  <dl>","        *      <dt>file</dt>","        *          <dd>The pointer to the instance of `Y.File` whose upload has been completed.</dd>","        *      <dt>originEvent</dt>","        *          <dd>The original event fired by the SWF Uploader</dd>","        *      <dt>data</dt>","        *          <dd>Data returned by the server.</dd>","        *  </dl>","        */","        this.publish(\"uploadcomplete\");","","        /**","        * Signals that the upload process of the entire file list has been completed.","        *","        * @event alluploadscomplete","        * @param event {Event} The event object for the `alluploadscomplete`.","        */","        this.publish(\"alluploadscomplete\");","","        /**","        * Signals that a error has occurred in a specific file's upload process.","        *","        * @event uploaderror","        * @param event {Event} The event object for the `uploaderror` with the","        *                      following payload:","        *  <dl>","        *      <dt>originEvent</dt>","        *          <dd>The original error event fired by the HTML5 Uploader. </dd>","        *      <dt>file</dt>","        *          <dd>The pointer at the instance of Y.File that returned the error.</dd>","        *      <dt>status</dt>","        *          <dd>The status reported by the XMLHttpRequest object.</dd>","        *      <dt>statusText</dt>","        *          <dd>The statusText reported by the XMLHttpRequest object.</dd>","        *  </dl>","        */","        this.publish(\"uploaderror\");","","        /**","        * Signals that a dragged object has entered into the uploader's associated drag-and-drop area.","        *","        * @event dragenter","        * @param event {Event} The event object for the `dragenter`.","        */","        this.publish(\"dragenter\");","","        /**","        * Signals that an object has been dragged over the uploader's associated drag-and-drop area.","        *","        * @event dragover","        * @param event {Event} The event object for the `dragover`.","        */","        this.publish(\"dragover\");","","        /**","        * Signals that an object has been dragged off of the uploader's associated drag-and-drop area.","        *","        * @event dragleave","        * @param event {Event} The event object for the `dragleave`.","        */","        this.publish(\"dragleave\");","","        /**","        * Signals that an object has been dropped over the uploader's associated drag-and-drop area.","        *","        * @event drop","        * @param event {Event} The event object for the `drop` with the","        *                      following payload:","        *  <dl>","        *      <dt>fileList</dt>","        *          <dd>An `Array` of files dropped by the user, encapsulated","        *              in Y.FileHTML5 objects.</dd>","        *  </dl>","        */","        this.publish(\"drop\");","","    },","","    /**","    * Create the DOM structure for the UploaderHTML5.","    * UploaderHTML5's DOM structure consists of a \"Select Files\" button that can","    * be replaced by the developer's widget of choice; and a hidden file input field","    * that is used to instantiate the File Select dialog.","    *","    * @method renderUI","    * @protected","    */","    renderUI : function () {","        var contentBox = this.get('contentBox'),","            selButton = this.get(\"selectFilesButton\");","","        selButton.setStyles({width:\"100%\", height:\"100%\"});","        contentBox.append(selButton);","        this._fileInputField = Y.Node.create(UploaderHTML5.HTML5FILEFIELD_TEMPLATE);","        contentBox.append(this._fileInputField);","    },","","    /**","    * Binds to the UploaderHTML5 UI and subscribes to the necessary events.","    *","    * @method bindUI","    * @protected","    */","    bindUI : function () {","","        this._bindSelectButton();","        this._setMultipleFiles();","        this._setFileFilters();","        this._bindDropArea();","        this._triggerEnabled();","","        this.after(\"multipleFilesChange\", this._setMultipleFiles, this);","        this.after(\"fileFiltersChange\", this._setFileFilters, this);","        this.after(\"enabledChange\", this._triggerEnabled, this);","        this.after(\"selectFilesButtonChange\", this._bindSelectButton, this);","        this.after(\"dragAndDropAreaChange\", this._bindDropArea, this);","        this.after(\"tabIndexChange\", function () {","            this.get(\"selectFilesButton\").set(\"tabIndex\", this.get(\"tabIndex\"));","        }, this);","        this._fileInputField.on(\"change\", this._updateFileList, this);","","        this.get(\"selectFilesButton\").set(\"tabIndex\", this.get(\"tabIndex\"));","    },","","","    /**","    * Recreates the file field to null out the previous list of files and","    * thus allow for an identical file list selection.","    *","    * @method _rebindFileField","    * @protected","    */","    _rebindFileField : function () {","        this._fileInputField.remove(true);","        this._fileInputField = Y.Node.create(UploaderHTML5.HTML5FILEFIELD_TEMPLATE);","        this.get(\"contentBox\").append(this._fileInputField);","        this._fileInputField.on(\"change\", this._updateFileList, this);","        this._setMultipleFiles();","        this._setFileFilters();","    },","","","    /**","    * Binds the specified drop area's drag and drop events to the","    * uploader's custom handler.","    *","    * @method _bindDropArea","    * @protected","    */","    _bindDropArea : function (event) {","        var ev = event || {prevVal: null},","            ddArea = this.get(\"dragAndDropArea\");","","        if (ev.prevVal !== null) {","            ev.prevVal.detach('drop', this._ddEventHandler);","            ev.prevVal.detach('dragenter', this._ddEventHandler);","            ev.prevVal.detach('dragover', this._ddEventHandler);","            ev.prevVal.detach('dragleave', this._ddEventHandler);","        }","","        if (ddArea !== null) {","            ddArea.on('drop', this._ddEventHandler, this);","            ddArea.on('dragenter', this._ddEventHandler, this);","            ddArea.on('dragover', this._ddEventHandler, this);","            ddArea.on('dragleave', this._ddEventHandler, this);","        }","    },","","    /**","    * Binds the instantiation of the file select dialog to the current file select","    * control.","    *","    * @method _bindSelectButton","    * @protected","    */","    _bindSelectButton : function () {","       this._buttonBinding = this.get(\"selectFilesButton\").on(\"click\", this.openFileSelectDialog, this);","    },","","    /**","    * Handles the drag and drop events from the uploader's specified drop","    * area.","    *","    * @method _ddEventHandler","    * @protected","    */","    _ddEventHandler : function (event) {","","","        event.stopPropagation();","        event.preventDefault();","","        if (Y.Array.indexOf(event._event.dataTransfer.types, 'Files') > -1) {","            switch (event.type) {","                case \"dragenter\":","                    this.fire(\"dragenter\");","                    break;","                case \"dragover\":","                    this.fire(\"dragover\");","                    break;","                case \"dragleave\":","                    this.fire(\"dragleave\");","                    break;","                case \"drop\":","","                    var newfiles = event._event.dataTransfer.files,","                        parsedFiles = [],","                        filterFunc = this.get(\"fileFilterFunction\"),","                        oldfiles;","","                    if (filterFunc) {","                        Y.each(newfiles, function (value) {","                            var newfile = new Y.FileHTML5(value);","                            if (filterFunc(newfile)) {","                                parsedFiles.push(newfile);","                            }","                        });","                    }","                    else {","                        Y.each(newfiles, function (value) {","                            parsedFiles.push(new Y.FileHTML5(value));","                        });","                    }","","                    if (parsedFiles.length > 0) {","                        oldfiles = this.get(\"fileList\");","                        this.set(\"fileList\",","                        this.get(\"appendNewFiles\") ? oldfiles.concat(parsedFiles) : parsedFiles);","                        this.fire(\"fileselect\", {fileList: parsedFiles});","                    }","","                    this.fire(\"drop\", {fileList: parsedFiles});","                    break;","            }","        }","    },","","    /**","    * Adds or removes a specified state CSS class to the underlying uploader button.","    *","    * @method _setButtonClass","    * @protected","    * @param state {String} The name of the state enumerated in `buttonClassNames` attribute","    * from which to derive the needed class name.","    * @param add {Boolean} A Boolean indicating whether to add or remove the class.","    */","    _setButtonClass : function (state, add) {","        if (add) {","            this.get(\"selectFilesButton\").addClass(this.get(\"buttonClassNames\")[state]);","        }","        else {","            this.get(\"selectFilesButton\").removeClass(this.get(\"buttonClassNames\")[state]);","        }","    },","","    /**","    * Syncs the state of the `multipleFiles` attribute between this class","    * and the file input field.","    *","    * @method _setMultipleFiles","    * @protected","    */","    _setMultipleFiles : function () {","        if (this.get(\"multipleFiles\") === true) {","            this._fileInputField.set(\"multiple\", \"multiple\");","        }","        else {","            this._fileInputField.set(\"multiple\", \"\");","        }","    },","","    /**","    * Syncs the state of the `fileFilters` attribute between this class","    * and the file input field.","    *","    * @method _setFileFilters","    * @protected","    */","    _setFileFilters : function () {","        if (this.get(\"fileFilters\").length > 0) {","            this._fileInputField.set(\"accept\", this.get(\"fileFilters\").join(\",\"));","        }","        else {","            this._fileInputField.set(\"accept\", \"\");","        }","    },","","","    /**","    * Syncs the state of the `enabled` attribute between this class","    * and the underlying button.","    *","    * @method _triggerEnabled","    * @private","    */","    _triggerEnabled : function () {","        if (this.get(\"enabled\") && this._buttonBinding === null) {","            this._bindSelectButton();","            this._setButtonClass(\"disabled\", false);","            this.get(\"selectFilesButton\").setAttribute(\"aria-disabled\", \"false\");","        }","        else if (!this.get(\"enabled\") && this._buttonBinding) {","            this._buttonBinding.detach();","            this._buttonBinding = null;","            this._setButtonClass(\"disabled\", true);","            this.get(\"selectFilesButton\").setAttribute(\"aria-disabled\", \"true\");","        }","    },","","    /**","    * Getter for the `fileList` attribute","    *","    * @method _getFileList","    * @private","    */","    _getFileList : function () {","        return this._fileList.concat();","    },","","    /**","    * Setter for the `fileList` attribute","    *","    * @method _setFileList","    * @private","    */","    _setFileList : function (val) {","        this._fileList = val.concat();","        return this._fileList.concat();","    },","","    /**","    * Adjusts the content of the `fileList` based on the results of file selection","    * and the `appendNewFiles` attribute. If the `appendNewFiles` attribute is true,","    * then selected files are appended to the existing list; otherwise, the list is","    * cleared and populated with the newly selected files.","    *","    * @method _updateFileList","    * @param ev {Event} The file selection event received from the uploader.","    * @protected","    */","    _updateFileList : function (ev) {","        var newfiles = ev.target.getDOMNode().files,","            parsedFiles = [],","            filterFunc = this.get(\"fileFilterFunction\"),","            oldfiles;","","        if (filterFunc) {","            Y.each(newfiles, function (value) {","                var newfile = new Y.FileHTML5(value);","                if (filterFunc(newfile)) {","                    parsedFiles.push(newfile);","                }","            });","        }","        else {","            Y.each(newfiles, function (value) {","                parsedFiles.push(new Y.FileHTML5(value));","            });","        }","","        if (parsedFiles.length > 0) {","            oldfiles = this.get(\"fileList\");","","            this.set(\"fileList\",","                    this.get(\"appendNewFiles\") ? oldfiles.concat(parsedFiles) : parsedFiles );","","            this.fire(\"fileselect\", {fileList: parsedFiles});","        }","","        this._rebindFileField();","    },","","","    /**","    * Handles and retransmits events fired by `Y.File` and `Y.Uploader.Queue`.","    *","    * @method _uploadEventHandler","    * @param event The event dispatched during the upload process.","    * @protected","    */","    _uploadEventHandler : function (event) {","","        switch (event.type) {","            case \"file:uploadstart\":","                this.fire(\"fileuploadstart\", event);","                break;","            case \"file:uploadprogress\":","                this.fire(\"uploadprogress\", event);","                break;","            case \"uploaderqueue:totaluploadprogress\":","                this.fire(\"totaluploadprogress\", event);","                break;","            case \"file:uploadcomplete\":","                this.fire(\"uploadcomplete\", event);","                break;","            case \"uploaderqueue:alluploadscomplete\":","                this.queue = null;","                this.fire(\"alluploadscomplete\", event);","                break;","            case \"file:uploaderror\": // overflow intentional","            case \"uploaderqueue:uploaderror\":","                this.fire(\"uploaderror\", event);","                break;","            case \"file:uploadcancel\": // overflow intentional","            case \"uploaderqueue:uploadcancel\":","                this.fire(\"uploadcancel\", event);","                break;","        }","","    },","","    /**","    * Opens the File Selection dialog by simulating a click on the file input field.","    *","    * @method openFileSelectDialog","    */","    openFileSelectDialog : function () {","        var fileDomNode = this._fileInputField.getDOMNode();","        if (fileDomNode.click) {","            fileDomNode.click();","        }","    },","","    /**","    * Starts the upload of a specific file.","    *","    * @method upload","    * @param file {Y.File} Reference to the instance of the file to be uploaded.","    * @param url {String} The URL to upload the file to.","    * @param postVars {Object} (optional) A set of key-value pairs to send as variables along with the file upload HTTP request.","    *                          If not specified, the values from the attribute `postVarsPerFile` are used instead.","    */","    upload : function (file, url, postvars) {","","        var uploadURL = url || this.get(\"uploadURL\"),","            postVars = postvars || this.get(\"postVarsPerFile\"),","            fileId = file.get(\"id\");","","        postVars = postVars.hasOwnProperty(fileId) ? postVars[fileId] : postVars;","","        if (file instanceof Y.FileHTML5) {","","            file.on(\"uploadstart\", this._uploadEventHandler, this);","            file.on(\"uploadprogress\", this._uploadEventHandler, this);","            file.on(\"uploadcomplete\", this._uploadEventHandler, this);","            file.on(\"uploaderror\", this._uploadEventHandler, this);","            file.on(\"uploadcancel\", this._uploadEventHandler, this);","","            file.startUpload(uploadURL, postVars, this.get(\"fileFieldName\"));","        }","    },","","   /**","    * Starts the upload of all files on the file list, using an automated queue.","    *","    * @method uploadAll","    * @param url {String} The URL to upload the files to.","    * @param [postVars] {Object} A set of key-value pairs to send as variables along with the file upload HTTP request.","    *                          If not specified, the values from the attribute `postVarsPerFile` are used instead.","    */","    uploadAll : function (url, postvars) {","        this.uploadThese(this.get(\"fileList\"), url, postvars);","    },","","    /**","    * Starts the upload of the files specified in the first argument, using an automated queue.","    *","    * @method uploadThese","    * @param files {Array} The list of files to upload.","    * @param url {String} The URL to upload the files to.","    * @param [postVars] {Object} A set of key-value pairs to send as variables along with the file upload HTTP request.","    *                          If not specified, the values from the attribute `postVarsPerFile` are used instead.","    */","    uploadThese : function (files, url, postvars) {","        if (!this.queue) {","            var uploadURL = url || this.get(\"uploadURL\"),","                postVars = postvars || this.get(\"postVarsPerFile\");","","            this.queue = new UploaderQueue({","                simUploads: this.get(\"simLimit\"),","                errorAction: this.get(\"errorAction\"),","                fileFieldName: this.get(\"fileFieldName\"),","                fileList: files,","                uploadURL: uploadURL,","                perFileParameters: postVars,","                retryCount: this.get(\"retryCount\"),","                uploadHeaders: this.get(\"uploadHeaders\"),","                withCredentials: this.get(\"withCredentials\")","            });","","            this.queue.on(\"uploadstart\", this._uploadEventHandler, this);","            this.queue.on(\"uploadprogress\", this._uploadEventHandler, this);","            this.queue.on(\"totaluploadprogress\", this._uploadEventHandler, this);","            this.queue.on(\"uploadcomplete\", this._uploadEventHandler, this);","            this.queue.on(\"alluploadscomplete\", this._uploadEventHandler, this);","            this.queue.on(\"uploadcancel\", this._uploadEventHandler, this);","            this.queue.on(\"uploaderror\", this._uploadEventHandler, this);","            this.queue.startUpload();","","            this.fire(\"uploadstart\");","       }","       else if (this.queue._currentState === UploaderQueue.UPLOADING) {","            this.queue.set(\"perFileParameters\", this.get(\"postVarsPerFile\"));","            Y.each(files, function (file) {","                this.queue.addToQueueBottom(file);","            }, this);","       }","    }","}, {","","    /**","    * The template for the hidden file input field container. The file input field will only","    * accept clicks if its visibility is set to hidden (and will not if it's `display` value","    * is set to `none`)","    *","    * @property HTML5FILEFIELD_TEMPLATE","    * @type {String}","    * @static","    */","    HTML5FILEFIELD_TEMPLATE: \"<input type='file' style='visibility:hidden; width:0px; height: 0px;'>\",","","    /**","    * The template for the \"Select Files\" button.","    *","    * @property SELECT_FILES_BUTTON","    * @type {HTML}","    * @static","    * @default '<button type=\"button\" class=\"yui3-button\" role=\"button\" aria-label=\"{selectButtonLabel}\"","    *           tabindex=\"{tabIndex}\">{selectButtonLabel}</button>'","    */","    SELECT_FILES_BUTTON: '<button type=\"button\" class=\"yui3-button\" role=\"button\" aria-label=\"{selectButtonLabel}\" ' +","                         'tabindex=\"{tabIndex}\">{selectButtonLabel}</button>',","","    /**","    * The static property reflecting the type of uploader that `Y.Uploader`","    * aliases. The UploaderHTML5 value is `\"html5\"`.","    *","    * @property TYPE","    * @type {String}","    * @static","    */","    TYPE: \"html5\",","","    /**","    * The identity of the widget.","    *","    * @property NAME","    * @type String","    * @default 'uploader'","    * @readOnly","    * @protected","    * @static","    */","    NAME: \"uploader\",","","    /**","    * Static property used to define the default attribute configuration of","    * the Widget.","    *","    * @property ATTRS","    * @type {Object}","    * @protected","    * @static","    */","    ATTRS: {","","        /**","        * A Boolean indicating whether newly selected files should be appended","        * to the existing file list, or whether they should replace it.","        *","        * @attribute appendNewFiles","        * @type {Boolean}","        * @default true","        */","        appendNewFiles : {","            value: true","        },","","        /**","        * The names of CSS classes that correspond to different button states","        * of the \"Select Files\" control. These classes are assigned to the","        * \"Select Files\" control based on the configuration of the uploader.","        * Currently, the only class name used is that corresponding to the","        * `disabled` state of the uploader. Other button states should be managed","        * directly via CSS selectors.","        * <ul>","        *   <li> <strong>`disabled`</strong>: the class corresponding to the disabled state","        *      of the \"Select Files\" button.</li>","        * </ul>","        * @attribute buttonClassNames","        * @type {Object}","        * @default {","        *            disabled: \"yui3-button-disabled\"","        *          }","        */","        buttonClassNames: {","            value: {","                \"hover\": \"yui3-button-hover\",","                \"active\": \"yui3-button-active\",","                \"disabled\": \"yui3-button-disabled\",","                \"focus\": \"yui3-button-selected\"","            }","        },","","        /**","        * The node that serves as the drop target for files.","        *","        * @attribute dragAndDropArea","        * @type {Node}","        * @default null","        */","        dragAndDropArea: {","            value: null,","            setter: function (val) {","                return Y.one(val);","            }","        },","","        /**","        * A Boolean indicating whether the uploader is enabled or disabled for user input.","        *","        * @attribute enabled","        * @type {Boolean}","        * @default true","        */","        enabled : {","            value: true","        },","","        /**","        * The action  performed when an upload error occurs for a specific file being uploaded.","        * The possible values are:","        * <ul>","        *   <li> <strong>`UploaderQueue.CONTINUE`</strong>: the error is ignored and the upload process is continued.</li>","        *   <li> <strong>`UploaderQueue.STOP`</strong>: the upload process is stopped as soon as any other parallel file","        *     uploads are finished.</li>","        *   <li> <strong>`UploaderQueue.RESTART_ASAP`</strong>: the file is added back to the front of the queue.</li>","        *   <li> <strong>`UploaderQueue.RESTART_AFTER`</strong>: the file is added to the back of the queue.</li>","        * </ul>","        * @attribute errorAction","        * @type {String}","        * @default UploaderQueue.CONTINUE","        */","        errorAction: {","            value: \"continue\",","            validator: function (val) {","                return (","                    val === UploaderQueue.CONTINUE ||","                    val === UploaderQueue.STOP ||","                    val === UploaderQueue.RESTART_ASAP ||","                    val === UploaderQueue.RESTART_AFTER","                );","            }","        },","","        /**","        * An array indicating what fileFilters should be applied to the file","        * selection dialog. Each element in the array should be a string","        * indicating the Media (MIME) type for the files that should be supported","        * for selection. The Media type strings should be properly formatted","        * or this parameter will be ignored. Examples of valid strings include:","        * \"audio/*\", \"video/*\", \"application/pdf\", etc. More information","        * on valid Media type strings is available here:","        * http://www.iana.org/assignments/media-types/index.html","        * @attribute fileFilters","        * @type {Array}","        * @default []","        */","        fileFilters: {","            value: []","        },","","        /**","        * A filtering function that is applied to every file selected by the user.","        * The function receives the `Y.File` object and must return a Boolean value.","        * If a `false` value is returned, the file in question is not added to the","        * list of files to be uploaded.","        * Use this function to put limits on file sizes or check the file names for","        * correct extension, but make sure that a server-side check is also performed,","        * since any client-side restrictions are only advisory and can be circumvented.","        *","        * @attribute fileFilterFunction","        * @type {Function}","        * @default null","        */","        fileFilterFunction: {","            value: null","        },","","        /**","        * A String specifying what should be the POST field name for the file","        * content in the upload request.","        *","        * @attribute fileFieldName","        * @type {String}","        * @default Filedata","        */","        fileFieldName: {","            value: \"Filedata\"","        },","","        /**","        * The array of files to be uploaded. All elements in the array","        * must be instances of `Y.File` and be instantiated with an instance","        * of native JavaScript File() class.","        *","        * @attribute fileList","        * @type {Array}","        * @default []","        */","        fileList: {","            value: [],","            getter: \"_getFileList\",","            setter: \"_setFileList\"","        },","","        /**","        * A Boolean indicating whether multiple file selection is enabled.","        *","        * @attribute multipleFiles","        * @type {Boolean}","        * @default false","        */","        multipleFiles: {","            value: false","        },","","        /**","        * An object, keyed by `fileId`, containing sets of key-value pairs","        * that should be passed as POST variables along with each corresponding","        * file. This attribute is only used if no POST variables are specifed","        * in the upload method call.","        *","        * @attribute postVarsPerFile","        * @type {Object}","        * @default {}","        */","        postVarsPerFile: {","            value: {}","        },","","        /**","        * The label for the \"Select Files\" widget. This is the value that replaces the","        * `{selectButtonLabel}` token in the `SELECT_FILES_BUTTON` template.","        *","        * @attribute selectButtonLabel","        * @type {String}","        * @default \"Select Files\"","        */","        selectButtonLabel: {","            value: \"Select Files\"","        },","","        /**","        * The widget that serves as the \"Select Files control for the file uploader","        *","        *","        * @attribute selectFilesButton","        * @type {Node | Widget}","        * @default A standard HTML button with YUI CSS Button skin.","        */","        selectFilesButton : {","            valueFn: function () {","                return Y.Node.create(substitute(Y.UploaderHTML5.SELECT_FILES_BUTTON, {","                    selectButtonLabel: this.get(\"selectButtonLabel\"),","                    tabIndex: this.get(\"tabIndex\")","                }));","            }","        },","","        /**","        * The number of files that can be uploaded","        * simultaneously if the automatic queue management","        * is used. This value can be in the range between 2","        * and 5.","        *","        * @attribute simLimit","        * @type {Number}","        * @default 2","        */","        simLimit: {","            value: 2,","            validator: function (val) {","                return (val >= 1 && val <= 5);","            }","        },","","        /**","        * The URL to which file upload requested are POSTed. Only used if a different url is not passed to the upload method call.","        *","        * @attribute uploadURL","        * @type {String}","        * @default \"\"","        */","        uploadURL: {","            value: \"\"","        },","","        /**","        * Additional HTTP headers that should be included","        * in the upload request.","        *","        *","        * @attribute uploadHeaders","        * @type {Object}","        * @default {}","        */","        uploadHeaders: {","            value: {}","        },","","        /**","        * A Boolean that specifies whether the file should be","        * uploaded with the appropriate user credentials for the","        * domain.","        *","        * @attribute withCredentials","        * @type {Boolean}","        * @default true","        */","        withCredentials: {","            value: true","        },","","        /**","        * The number of times to try re-uploading a file that failed to upload before","        * cancelling its upload.","        *","        * @attribute retryCount","        * @type {Number}","        * @default 3","        */","        retryCount: {","            value: 3","        }","    }","});","","Y.UploaderHTML5.Queue = UploaderQueue;","","","","}, '@VERSION@', {\"requires\": [\"widget\", \"node-event-simulate\", \"file-html5\", \"uploader-queue\"]});"];
_yuitest_coverage["build/uploader-html5/uploader-html5.js"].lines = {"1":0,"13":0,"23":0,"24":0,"29":0,"73":0,"74":0,"75":0,"76":0,"92":0,"100":0,"115":0,"136":0,"153":0,"170":0,"178":0,"197":0,"205":0,"213":0,"221":0,"235":0,"249":0,"252":0,"253":0,"254":0,"255":0,"266":0,"267":0,"268":0,"269":0,"270":0,"272":0,"273":0,"274":0,"275":0,"276":0,"277":0,"278":0,"280":0,"282":0,"294":0,"295":0,"296":0,"297":0,"298":0,"299":0,"311":0,"314":0,"315":0,"316":0,"317":0,"318":0,"321":0,"322":0,"323":0,"324":0,"325":0,"337":0,"350":0,"351":0,"353":0,"354":0,"356":0,"357":0,"359":0,"360":0,"362":0,"363":0,"366":0,"371":0,"372":0,"373":0,"374":0,"375":0,"380":0,"381":0,"385":0,"386":0,"387":0,"389":0,"392":0,"393":0,"408":0,"409":0,"412":0,"424":0,"425":0,"428":0,"440":0,"441":0,"444":0,"457":0,"458":0,"459":0,"460":0,"462":0,"463":0,"464":0,"465":0,"466":0,"477":0,"487":0,"488":0,"502":0,"507":0,"508":0,"509":0,"510":0,"511":0,"516":0,"517":0,"521":0,"522":0,"524":0,"527":0,"530":0,"543":0,"545":0,"546":0,"548":0,"549":0,"551":0,"552":0,"554":0,"555":0,"557":0,"558":0,"559":0,"562":0,"563":0,"566":0,"567":0,"578":0,"579":0,"580":0,"595":0,"599":0,"601":0,"603":0,"604":0,"605":0,"606":0,"607":0,"609":0,"622":0,"635":0,"636":0,"639":0,"651":0,"652":0,"653":0,"654":0,"655":0,"656":0,"657":0,"658":0,"660":0,"662":0,"663":0,"664":0,"665":0,"775":0,"807":0,"924":0,"944":0,"999":0};
_yuitest_coverage["build/uploader-html5/uploader-html5.js"].functions = {"UploaderHTML5:23":0,"initializer:71":0,"renderUI:248":0,"(anonymous 2):277":0,"bindUI:264":0,"_rebindFileField:293":0,"_bindDropArea:310":0,"_bindSelectButton:336":0,"(anonymous 3):372":0,"(anonymous 4):380":0,"_ddEventHandler:347":0,"_setButtonClass:407":0,"_setMultipleFiles:423":0,"_setFileFilters:439":0,"_triggerEnabled:456":0,"_getFileList:476":0,"_setFileList:486":0,"(anonymous 5):508":0,"(anonymous 6):516":0,"_updateFileList:501":0,"_uploadEventHandler:541":0,"openFileSelectDialog:577":0,"upload:593":0,"uploadAll:621":0,"(anonymous 7):664":0,"uploadThese:634":0,"setter:774":0,"validator:806":0,"valueFn:923":0,"validator:943":0,"(anonymous 1):1":0};
_yuitest_coverage["build/uploader-html5/uploader-html5.js"].coveredLines = 166;
_yuitest_coverage["build/uploader-html5/uploader-html5.js"].coveredFunctions = 31;
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 1);
YUI.add('uploader-html5', function (Y, NAME) {

/**
* This module provides a UI for file selection and multiple file upload capability using
* HTML5 XMLHTTPRequest Level 2 as a transport engine.
* The supported features include: automatic upload queue management, upload progress
* tracking, drag-and-drop support, server response retrieval and error reporting.
*
* @module uploader-html5
*/

// Shorthands for the external modules
_yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "(anonymous 1)", 1);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 13);
var  substitute  = Y.Lang.sub,
     UploaderQueue = Y.Uploader.Queue;

/**
* This module provides a UI for file selection and multiple file upload capability using
* HTML5 XMLHTTPRequest Level 2 as a transport engine.
* @class UploaderHTML5
* @extends Widget
* @constructor
*/
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 23);
function UploaderHTML5() {
    _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "UploaderHTML5", 23);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 24);
UploaderHTML5.superclass.constructor.apply ( this, arguments );
}



_yuitest_coverline("build/uploader-html5/uploader-html5.js", 29);
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
    * Stored reference to the click event binding of the `Select Files`
    * button.
    *
    * @property _buttonBinding
    * @type {EventHandle}
    * @protected
    */
    _buttonBinding: null,

    /**
    * Stored reference to the instance of Uploader.Queue used to manage
    * the upload process. This is a read-only property that only exists
    * during an active upload process. Only one queue can be active at
    * a time; if an upload start is attempted while a queue is active,
    * it will be ignored.
    *
    * @property queue
    * @type {Y.Uploader.Queue}
    */
    queue: null,

    // Y.UploaderHTML5 prototype

    /**
    * Construction logic executed during UploaderHTML5 instantiation.
    *
    * @method initializer
    * @protected
    */
    initializer : function () {

        _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "initializer", 71);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 73);
this._fileInputField = null;
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 74);
this.queue = null;
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 75);
this._buttonBinding = null;
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 76);
this._fileList = [];

        // Publish available events

        /**
        * Signals that files have been selected.
        *
        * @event fileselect
        * @param event {Event} The event object for the `fileselect` with the
        *                      following payload:
        *  <dl>
        *      <dt>fileList</dt>
        *          <dd>An `Array` of files selected by the user, encapsulated
        *              in Y.FileHTML5 objects.</dd>
        *  </dl>
        */
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 92);
this.publish("fileselect");

        /**
        * Signals that an upload of multiple files has been started.
        *
        * @event uploadstart
        * @param event {Event} The event object for the `uploadstart`.
        */
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 100);
this.publish("uploadstart");

        /**
        * Signals that an upload of a specific file has started.
        *
        * @event fileuploadstart
        * @param event {Event} The event object for the `fileuploadstart` with the
        *                      following payload:
        *  <dl>
        *      <dt>file</dt>
        *          <dd>A reference to the Y.File that dispatched the event.</dd>
        *      <dt>originEvent</dt>
        *          <dd>The original event dispatched by Y.File.</dd>
        *  </dl>
        */
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 115);
this.publish("fileuploadstart");

        /**
        * Reports on upload progress of a specific file.
        *
        * @event uploadprogress
        * @param event {Event} The event object for the `uploadprogress` with the
        *                      following payload:
        *  <dl>
        *      <dt>file</dt>
        *          <dd>The pointer to the instance of `Y.File` that dispatched the event.</dd>
        *      <dt>bytesLoaded</dt>
        *          <dd>The number of bytes of the file that has been uploaded</dd>
        *      <dt>bytesTotal</dt>
        *          <dd>The total number of bytes in the file</dd>
        *      <dt>percentLoaded</dt>
        *          <dd>The fraction of the file that has been uploaded, out of 100</dd>
        *      <dt>originEvent</dt>
        *          <dd>The original event dispatched by the HTML5 uploader</dd>
        *  </dl>
        */
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 136);
this.publish("uploadprogress");

        /**
        * Reports on the total upload progress of the file list.
        *
        * @event totaluploadprogress
        * @param event {Event} The event object for the `totaluploadprogress` with the
        *                      following payload:
        *  <dl>
        *      <dt>bytesLoaded</dt>
        *          <dd>The number of bytes of the file list that has been uploaded</dd>
        *      <dt>bytesTotal</dt>
        *          <dd>The total number of bytes in the file list</dd>
        *      <dt>percentLoaded</dt>
        *          <dd>The fraction of the file list that has been uploaded, out of 100</dd>
        *  </dl>
        */
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 153);
this.publish("totaluploadprogress");

        /**
        * Signals that a single file upload has been completed.
        *
        * @event uploadcomplete
        * @param event {Event} The event object for the `uploadcomplete` with the
        *                      following payload:
        *  <dl>
        *      <dt>file</dt>
        *          <dd>The pointer to the instance of `Y.File` whose upload has been completed.</dd>
        *      <dt>originEvent</dt>
        *          <dd>The original event fired by the SWF Uploader</dd>
        *      <dt>data</dt>
        *          <dd>Data returned by the server.</dd>
        *  </dl>
        */
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 170);
this.publish("uploadcomplete");

        /**
        * Signals that the upload process of the entire file list has been completed.
        *
        * @event alluploadscomplete
        * @param event {Event} The event object for the `alluploadscomplete`.
        */
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 178);
this.publish("alluploadscomplete");

        /**
        * Signals that a error has occurred in a specific file's upload process.
        *
        * @event uploaderror
        * @param event {Event} The event object for the `uploaderror` with the
        *                      following payload:
        *  <dl>
        *      <dt>originEvent</dt>
        *          <dd>The original error event fired by the HTML5 Uploader. </dd>
        *      <dt>file</dt>
        *          <dd>The pointer at the instance of Y.File that returned the error.</dd>
        *      <dt>status</dt>
        *          <dd>The status reported by the XMLHttpRequest object.</dd>
        *      <dt>statusText</dt>
        *          <dd>The statusText reported by the XMLHttpRequest object.</dd>
        *  </dl>
        */
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 197);
this.publish("uploaderror");

        /**
        * Signals that a dragged object has entered into the uploader's associated drag-and-drop area.
        *
        * @event dragenter
        * @param event {Event} The event object for the `dragenter`.
        */
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 205);
this.publish("dragenter");

        /**
        * Signals that an object has been dragged over the uploader's associated drag-and-drop area.
        *
        * @event dragover
        * @param event {Event} The event object for the `dragover`.
        */
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 213);
this.publish("dragover");

        /**
        * Signals that an object has been dragged off of the uploader's associated drag-and-drop area.
        *
        * @event dragleave
        * @param event {Event} The event object for the `dragleave`.
        */
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 221);
this.publish("dragleave");

        /**
        * Signals that an object has been dropped over the uploader's associated drag-and-drop area.
        *
        * @event drop
        * @param event {Event} The event object for the `drop` with the
        *                      following payload:
        *  <dl>
        *      <dt>fileList</dt>
        *          <dd>An `Array` of files dropped by the user, encapsulated
        *              in Y.FileHTML5 objects.</dd>
        *  </dl>
        */
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 235);
this.publish("drop");

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
        _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "renderUI", 248);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 249);
var contentBox = this.get('contentBox'),
            selButton = this.get("selectFilesButton");

        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 252);
selButton.setStyles({width:"100%", height:"100%"});
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 253);
contentBox.append(selButton);
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 254);
this._fileInputField = Y.Node.create(UploaderHTML5.HTML5FILEFIELD_TEMPLATE);
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 255);
contentBox.append(this._fileInputField);
    },

    /**
    * Binds to the UploaderHTML5 UI and subscribes to the necessary events.
    *
    * @method bindUI
    * @protected
    */
    bindUI : function () {

        _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "bindUI", 264);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 266);
this._bindSelectButton();
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 267);
this._setMultipleFiles();
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 268);
this._setFileFilters();
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 269);
this._bindDropArea();
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 270);
this._triggerEnabled();

        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 272);
this.after("multipleFilesChange", this._setMultipleFiles, this);
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 273);
this.after("fileFiltersChange", this._setFileFilters, this);
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 274);
this.after("enabledChange", this._triggerEnabled, this);
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 275);
this.after("selectFilesButtonChange", this._bindSelectButton, this);
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 276);
this.after("dragAndDropAreaChange", this._bindDropArea, this);
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 277);
this.after("tabIndexChange", function () {
            _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "(anonymous 2)", 277);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 278);
this.get("selectFilesButton").set("tabIndex", this.get("tabIndex"));
        }, this);
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 280);
this._fileInputField.on("change", this._updateFileList, this);

        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 282);
this.get("selectFilesButton").set("tabIndex", this.get("tabIndex"));
    },


    /**
    * Recreates the file field to null out the previous list of files and
    * thus allow for an identical file list selection.
    *
    * @method _rebindFileField
    * @protected
    */
    _rebindFileField : function () {
        _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "_rebindFileField", 293);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 294);
this._fileInputField.remove(true);
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 295);
this._fileInputField = Y.Node.create(UploaderHTML5.HTML5FILEFIELD_TEMPLATE);
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 296);
this.get("contentBox").append(this._fileInputField);
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 297);
this._fileInputField.on("change", this._updateFileList, this);
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 298);
this._setMultipleFiles();
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 299);
this._setFileFilters();
    },


    /**
    * Binds the specified drop area's drag and drop events to the
    * uploader's custom handler.
    *
    * @method _bindDropArea
    * @protected
    */
    _bindDropArea : function (event) {
        _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "_bindDropArea", 310);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 311);
var ev = event || {prevVal: null},
            ddArea = this.get("dragAndDropArea");

        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 314);
if (ev.prevVal !== null) {
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 315);
ev.prevVal.detach('drop', this._ddEventHandler);
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 316);
ev.prevVal.detach('dragenter', this._ddEventHandler);
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 317);
ev.prevVal.detach('dragover', this._ddEventHandler);
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 318);
ev.prevVal.detach('dragleave', this._ddEventHandler);
        }

        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 321);
if (ddArea !== null) {
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 322);
ddArea.on('drop', this._ddEventHandler, this);
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 323);
ddArea.on('dragenter', this._ddEventHandler, this);
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 324);
ddArea.on('dragover', this._ddEventHandler, this);
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 325);
ddArea.on('dragleave', this._ddEventHandler, this);
        }
    },

    /**
    * Binds the instantiation of the file select dialog to the current file select
    * control.
    *
    * @method _bindSelectButton
    * @protected
    */
    _bindSelectButton : function () {
       _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "_bindSelectButton", 336);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 337);
this._buttonBinding = this.get("selectFilesButton").on("click", this.openFileSelectDialog, this);
    },

    /**
    * Handles the drag and drop events from the uploader's specified drop
    * area.
    *
    * @method _ddEventHandler
    * @protected
    */
    _ddEventHandler : function (event) {


        _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "_ddEventHandler", 347);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 350);
event.stopPropagation();
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 351);
event.preventDefault();

        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 353);
if (Y.Array.indexOf(event._event.dataTransfer.types, 'Files') > -1) {
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 354);
switch (event.type) {
                case "dragenter":
                    _yuitest_coverline("build/uploader-html5/uploader-html5.js", 356);
this.fire("dragenter");
                    _yuitest_coverline("build/uploader-html5/uploader-html5.js", 357);
break;
                case "dragover":
                    _yuitest_coverline("build/uploader-html5/uploader-html5.js", 359);
this.fire("dragover");
                    _yuitest_coverline("build/uploader-html5/uploader-html5.js", 360);
break;
                case "dragleave":
                    _yuitest_coverline("build/uploader-html5/uploader-html5.js", 362);
this.fire("dragleave");
                    _yuitest_coverline("build/uploader-html5/uploader-html5.js", 363);
break;
                case "drop":

                    _yuitest_coverline("build/uploader-html5/uploader-html5.js", 366);
var newfiles = event._event.dataTransfer.files,
                        parsedFiles = [],
                        filterFunc = this.get("fileFilterFunction"),
                        oldfiles;

                    _yuitest_coverline("build/uploader-html5/uploader-html5.js", 371);
if (filterFunc) {
                        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 372);
Y.each(newfiles, function (value) {
                            _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "(anonymous 3)", 372);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 373);
var newfile = new Y.FileHTML5(value);
                            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 374);
if (filterFunc(newfile)) {
                                _yuitest_coverline("build/uploader-html5/uploader-html5.js", 375);
parsedFiles.push(newfile);
                            }
                        });
                    }
                    else {
                        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 380);
Y.each(newfiles, function (value) {
                            _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "(anonymous 4)", 380);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 381);
parsedFiles.push(new Y.FileHTML5(value));
                        });
                    }

                    _yuitest_coverline("build/uploader-html5/uploader-html5.js", 385);
if (parsedFiles.length > 0) {
                        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 386);
oldfiles = this.get("fileList");
                        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 387);
this.set("fileList",
                        this.get("appendNewFiles") ? oldfiles.concat(parsedFiles) : parsedFiles);
                        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 389);
this.fire("fileselect", {fileList: parsedFiles});
                    }

                    _yuitest_coverline("build/uploader-html5/uploader-html5.js", 392);
this.fire("drop", {fileList: parsedFiles});
                    _yuitest_coverline("build/uploader-html5/uploader-html5.js", 393);
break;
            }
        }
    },

    /**
    * Adds or removes a specified state CSS class to the underlying uploader button.
    *
    * @method _setButtonClass
    * @protected
    * @param state {String} The name of the state enumerated in `buttonClassNames` attribute
    * from which to derive the needed class name.
    * @param add {Boolean} A Boolean indicating whether to add or remove the class.
    */
    _setButtonClass : function (state, add) {
        _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "_setButtonClass", 407);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 408);
if (add) {
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 409);
this.get("selectFilesButton").addClass(this.get("buttonClassNames")[state]);
        }
        else {
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 412);
this.get("selectFilesButton").removeClass(this.get("buttonClassNames")[state]);
        }
    },

    /**
    * Syncs the state of the `multipleFiles` attribute between this class
    * and the file input field.
    *
    * @method _setMultipleFiles
    * @protected
    */
    _setMultipleFiles : function () {
        _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "_setMultipleFiles", 423);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 424);
if (this.get("multipleFiles") === true) {
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 425);
this._fileInputField.set("multiple", "multiple");
        }
        else {
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 428);
this._fileInputField.set("multiple", "");
        }
    },

    /**
    * Syncs the state of the `fileFilters` attribute between this class
    * and the file input field.
    *
    * @method _setFileFilters
    * @protected
    */
    _setFileFilters : function () {
        _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "_setFileFilters", 439);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 440);
if (this.get("fileFilters").length > 0) {
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 441);
this._fileInputField.set("accept", this.get("fileFilters").join(","));
        }
        else {
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 444);
this._fileInputField.set("accept", "");
        }
    },


    /**
    * Syncs the state of the `enabled` attribute between this class
    * and the underlying button.
    *
    * @method _triggerEnabled
    * @private
    */
    _triggerEnabled : function () {
        _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "_triggerEnabled", 456);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 457);
if (this.get("enabled") && this._buttonBinding === null) {
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 458);
this._bindSelectButton();
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 459);
this._setButtonClass("disabled", false);
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 460);
this.get("selectFilesButton").setAttribute("aria-disabled", "false");
        }
        else {_yuitest_coverline("build/uploader-html5/uploader-html5.js", 462);
if (!this.get("enabled") && this._buttonBinding) {
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 463);
this._buttonBinding.detach();
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 464);
this._buttonBinding = null;
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 465);
this._setButtonClass("disabled", true);
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 466);
this.get("selectFilesButton").setAttribute("aria-disabled", "true");
        }}
    },

    /**
    * Getter for the `fileList` attribute
    *
    * @method _getFileList
    * @private
    */
    _getFileList : function () {
        _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "_getFileList", 476);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 477);
return this._fileList.concat();
    },

    /**
    * Setter for the `fileList` attribute
    *
    * @method _setFileList
    * @private
    */
    _setFileList : function (val) {
        _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "_setFileList", 486);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 487);
this._fileList = val.concat();
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 488);
return this._fileList.concat();
    },

    /**
    * Adjusts the content of the `fileList` based on the results of file selection
    * and the `appendNewFiles` attribute. If the `appendNewFiles` attribute is true,
    * then selected files are appended to the existing list; otherwise, the list is
    * cleared and populated with the newly selected files.
    *
    * @method _updateFileList
    * @param ev {Event} The file selection event received from the uploader.
    * @protected
    */
    _updateFileList : function (ev) {
        _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "_updateFileList", 501);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 502);
var newfiles = ev.target.getDOMNode().files,
            parsedFiles = [],
            filterFunc = this.get("fileFilterFunction"),
            oldfiles;

        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 507);
if (filterFunc) {
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 508);
Y.each(newfiles, function (value) {
                _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "(anonymous 5)", 508);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 509);
var newfile = new Y.FileHTML5(value);
                _yuitest_coverline("build/uploader-html5/uploader-html5.js", 510);
if (filterFunc(newfile)) {
                    _yuitest_coverline("build/uploader-html5/uploader-html5.js", 511);
parsedFiles.push(newfile);
                }
            });
        }
        else {
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 516);
Y.each(newfiles, function (value) {
                _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "(anonymous 6)", 516);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 517);
parsedFiles.push(new Y.FileHTML5(value));
            });
        }

        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 521);
if (parsedFiles.length > 0) {
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 522);
oldfiles = this.get("fileList");

            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 524);
this.set("fileList",
                    this.get("appendNewFiles") ? oldfiles.concat(parsedFiles) : parsedFiles );

            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 527);
this.fire("fileselect", {fileList: parsedFiles});
        }

        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 530);
this._rebindFileField();
    },


    /**
    * Handles and retransmits events fired by `Y.File` and `Y.Uploader.Queue`.
    *
    * @method _uploadEventHandler
    * @param event The event dispatched during the upload process.
    * @protected
    */
    _uploadEventHandler : function (event) {

        _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "_uploadEventHandler", 541);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 543);
switch (event.type) {
            case "file:uploadstart":
                _yuitest_coverline("build/uploader-html5/uploader-html5.js", 545);
this.fire("fileuploadstart", event);
                _yuitest_coverline("build/uploader-html5/uploader-html5.js", 546);
break;
            case "file:uploadprogress":
                _yuitest_coverline("build/uploader-html5/uploader-html5.js", 548);
this.fire("uploadprogress", event);
                _yuitest_coverline("build/uploader-html5/uploader-html5.js", 549);
break;
            case "uploaderqueue:totaluploadprogress":
                _yuitest_coverline("build/uploader-html5/uploader-html5.js", 551);
this.fire("totaluploadprogress", event);
                _yuitest_coverline("build/uploader-html5/uploader-html5.js", 552);
break;
            case "file:uploadcomplete":
                _yuitest_coverline("build/uploader-html5/uploader-html5.js", 554);
this.fire("uploadcomplete", event);
                _yuitest_coverline("build/uploader-html5/uploader-html5.js", 555);
break;
            case "uploaderqueue:alluploadscomplete":
                _yuitest_coverline("build/uploader-html5/uploader-html5.js", 557);
this.queue = null;
                _yuitest_coverline("build/uploader-html5/uploader-html5.js", 558);
this.fire("alluploadscomplete", event);
                _yuitest_coverline("build/uploader-html5/uploader-html5.js", 559);
break;
            case "file:uploaderror": // overflow intentional
            case "uploaderqueue:uploaderror":
                _yuitest_coverline("build/uploader-html5/uploader-html5.js", 562);
this.fire("uploaderror", event);
                _yuitest_coverline("build/uploader-html5/uploader-html5.js", 563);
break;
            case "file:uploadcancel": // overflow intentional
            case "uploaderqueue:uploadcancel":
                _yuitest_coverline("build/uploader-html5/uploader-html5.js", 566);
this.fire("uploadcancel", event);
                _yuitest_coverline("build/uploader-html5/uploader-html5.js", 567);
break;
        }

    },

    /**
    * Opens the File Selection dialog by simulating a click on the file input field.
    *
    * @method openFileSelectDialog
    */
    openFileSelectDialog : function () {
        _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "openFileSelectDialog", 577);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 578);
var fileDomNode = this._fileInputField.getDOMNode();
        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 579);
if (fileDomNode.click) {
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 580);
fileDomNode.click();
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

        _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "upload", 593);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 595);
var uploadURL = url || this.get("uploadURL"),
            postVars = postvars || this.get("postVarsPerFile"),
            fileId = file.get("id");

        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 599);
postVars = postVars.hasOwnProperty(fileId) ? postVars[fileId] : postVars;

        _yuitest_coverline("build/uploader-html5/uploader-html5.js", 601);
if (file instanceof Y.FileHTML5) {

            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 603);
file.on("uploadstart", this._uploadEventHandler, this);
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 604);
file.on("uploadprogress", this._uploadEventHandler, this);
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 605);
file.on("uploadcomplete", this._uploadEventHandler, this);
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 606);
file.on("uploaderror", this._uploadEventHandler, this);
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 607);
file.on("uploadcancel", this._uploadEventHandler, this);

            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 609);
file.startUpload(uploadURL, postVars, this.get("fileFieldName"));
        }
    },

   /**
    * Starts the upload of all files on the file list, using an automated queue.
    *
    * @method uploadAll
    * @param url {String} The URL to upload the files to.
    * @param [postVars] {Object} A set of key-value pairs to send as variables along with the file upload HTTP request.
    *                          If not specified, the values from the attribute `postVarsPerFile` are used instead.
    */
    uploadAll : function (url, postvars) {
        _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "uploadAll", 621);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 622);
this.uploadThese(this.get("fileList"), url, postvars);
    },

    /**
    * Starts the upload of the files specified in the first argument, using an automated queue.
    *
    * @method uploadThese
    * @param files {Array} The list of files to upload.
    * @param url {String} The URL to upload the files to.
    * @param [postVars] {Object} A set of key-value pairs to send as variables along with the file upload HTTP request.
    *                          If not specified, the values from the attribute `postVarsPerFile` are used instead.
    */
    uploadThese : function (files, url, postvars) {
        _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "uploadThese", 634);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 635);
if (!this.queue) {
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 636);
var uploadURL = url || this.get("uploadURL"),
                postVars = postvars || this.get("postVarsPerFile");

            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 639);
this.queue = new UploaderQueue({
                simUploads: this.get("simLimit"),
                errorAction: this.get("errorAction"),
                fileFieldName: this.get("fileFieldName"),
                fileList: files,
                uploadURL: uploadURL,
                perFileParameters: postVars,
                retryCount: this.get("retryCount"),
                uploadHeaders: this.get("uploadHeaders"),
                withCredentials: this.get("withCredentials")
            });

            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 651);
this.queue.on("uploadstart", this._uploadEventHandler, this);
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 652);
this.queue.on("uploadprogress", this._uploadEventHandler, this);
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 653);
this.queue.on("totaluploadprogress", this._uploadEventHandler, this);
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 654);
this.queue.on("uploadcomplete", this._uploadEventHandler, this);
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 655);
this.queue.on("alluploadscomplete", this._uploadEventHandler, this);
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 656);
this.queue.on("uploadcancel", this._uploadEventHandler, this);
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 657);
this.queue.on("uploaderror", this._uploadEventHandler, this);
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 658);
this.queue.startUpload();

            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 660);
this.fire("uploadstart");
       }
       else {_yuitest_coverline("build/uploader-html5/uploader-html5.js", 662);
if (this.queue._currentState === UploaderQueue.UPLOADING) {
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 663);
this.queue.set("perFileParameters", this.get("postVarsPerFile"));
            _yuitest_coverline("build/uploader-html5/uploader-html5.js", 664);
Y.each(files, function (file) {
                _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "(anonymous 7)", 664);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 665);
this.queue.addToQueueBottom(file);
            }, this);
       }}
    }
}, {

    /**
    * The template for the hidden file input field container. The file input field will only
    * accept clicks if its visibility is set to hidden (and will not if it's `display` value
    * is set to `none`)
    *
    * @property HTML5FILEFIELD_TEMPLATE
    * @type {String}
    * @static
    */
    HTML5FILEFIELD_TEMPLATE: "<input type='file' style='visibility:hidden; width:0px; height: 0px;'>",

    /**
    * The template for the "Select Files" button.
    *
    * @property SELECT_FILES_BUTTON
    * @type {HTML}
    * @static
    * @default '<button type="button" class="yui3-button" role="button" aria-label="{selectButtonLabel}"
    *           tabindex="{tabIndex}">{selectButtonLabel}</button>'
    */
    SELECT_FILES_BUTTON: '<button type="button" class="yui3-button" role="button" aria-label="{selectButtonLabel}" ' +
                         'tabindex="{tabIndex}">{selectButtonLabel}</button>',

    /**
    * The static property reflecting the type of uploader that `Y.Uploader`
    * aliases. The UploaderHTML5 value is `"html5"`.
    *
    * @property TYPE
    * @type {String}
    * @static
    */
    TYPE: "html5",

    /**
    * The identity of the widget.
    *
    * @property NAME
    * @type String
    * @default 'uploader'
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
        * The names of CSS classes that correspond to different button states
        * of the "Select Files" control. These classes are assigned to the
        * "Select Files" control based on the configuration of the uploader.
        * Currently, the only class name used is that corresponding to the
        * `disabled` state of the uploader. Other button states should be managed
        * directly via CSS selectors.
        * <ul>
        *   <li> <strong>`disabled`</strong>: the class corresponding to the disabled state
        *      of the "Select Files" button.</li>
        * </ul>
        * @attribute buttonClassNames
        * @type {Object}
        * @default {
        *            disabled: "yui3-button-disabled"
        *          }
        */
        buttonClassNames: {
            value: {
                "hover": "yui3-button-hover",
                "active": "yui3-button-active",
                "disabled": "yui3-button-disabled",
                "focus": "yui3-button-selected"
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
                _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "setter", 774);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 775);
return Y.one(val);
            }
        },

        /**
        * A Boolean indicating whether the uploader is enabled or disabled for user input.
        *
        * @attribute enabled
        * @type {Boolean}
        * @default true
        */
        enabled : {
            value: true
        },

        /**
        * The action  performed when an upload error occurs for a specific file being uploaded.
        * The possible values are:
        * <ul>
        *   <li> <strong>`UploaderQueue.CONTINUE`</strong>: the error is ignored and the upload process is continued.</li>
        *   <li> <strong>`UploaderQueue.STOP`</strong>: the upload process is stopped as soon as any other parallel file
        *     uploads are finished.</li>
        *   <li> <strong>`UploaderQueue.RESTART_ASAP`</strong>: the file is added back to the front of the queue.</li>
        *   <li> <strong>`UploaderQueue.RESTART_AFTER`</strong>: the file is added to the back of the queue.</li>
        * </ul>
        * @attribute errorAction
        * @type {String}
        * @default UploaderQueue.CONTINUE
        */
        errorAction: {
            value: "continue",
            validator: function (val) {
                _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "validator", 806);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 807);
return (
                    val === UploaderQueue.CONTINUE ||
                    val === UploaderQueue.STOP ||
                    val === UploaderQueue.RESTART_ASAP ||
                    val === UploaderQueue.RESTART_AFTER
                );
            }
        },

        /**
        * An array indicating what fileFilters should be applied to the file
        * selection dialog. Each element in the array should be a string
        * indicating the Media (MIME) type for the files that should be supported
        * for selection. The Media type strings should be properly formatted
        * or this parameter will be ignored. Examples of valid strings include:
        * "audio/*", "video/*", "application/pdf", etc. More information
        * on valid Media type strings is available here:
        * http://www.iana.org/assignments/media-types/index.html
        * @attribute fileFilters
        * @type {Array}
        * @default []
        */
        fileFilters: {
            value: []
        },

        /**
        * A filtering function that is applied to every file selected by the user.
        * The function receives the `Y.File` object and must return a Boolean value.
        * If a `false` value is returned, the file in question is not added to the
        * list of files to be uploaded.
        * Use this function to put limits on file sizes or check the file names for
        * correct extension, but make sure that a server-side check is also performed,
        * since any client-side restrictions are only advisory and can be circumvented.
        *
        * @attribute fileFilterFunction
        * @type {Function}
        * @default null
        */
        fileFilterFunction: {
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
        * The array of files to be uploaded. All elements in the array
        * must be instances of `Y.File` and be instantiated with an instance
        * of native JavaScript File() class.
        *
        * @attribute fileList
        * @type {Array}
        * @default []
        */
        fileList: {
            value: [],
            getter: "_getFileList",
            setter: "_setFileList"
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
        * An object, keyed by `fileId`, containing sets of key-value pairs
        * that should be passed as POST variables along with each corresponding
        * file. This attribute is only used if no POST variables are specifed
        * in the upload method call.
        *
        * @attribute postVarsPerFile
        * @type {Object}
        * @default {}
        */
        postVarsPerFile: {
            value: {}
        },

        /**
        * The label for the "Select Files" widget. This is the value that replaces the
        * `{selectButtonLabel}` token in the `SELECT_FILES_BUTTON` template.
        *
        * @attribute selectButtonLabel
        * @type {String}
        * @default "Select Files"
        */
        selectButtonLabel: {
            value: "Select Files"
        },

        /**
        * The widget that serves as the "Select Files control for the file uploader
        *
        *
        * @attribute selectFilesButton
        * @type {Node | Widget}
        * @default A standard HTML button with YUI CSS Button skin.
        */
        selectFilesButton : {
            valueFn: function () {
                _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "valueFn", 923);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 924);
return Y.Node.create(substitute(Y.UploaderHTML5.SELECT_FILES_BUTTON, {
                    selectButtonLabel: this.get("selectButtonLabel"),
                    tabIndex: this.get("tabIndex")
                }));
            }
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
            validator: function (val) {
                _yuitest_coverfunc("build/uploader-html5/uploader-html5.js", "validator", 943);
_yuitest_coverline("build/uploader-html5/uploader-html5.js", 944);
return (val >= 1 && val <= 5);
            }
        },

        /**
        * The URL to which file upload requested are POSTed. Only used if a different url is not passed to the upload method call.
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
        * in the upload request.
        *
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
        * domain.
        *
        * @attribute withCredentials
        * @type {Boolean}
        * @default true
        */
        withCredentials: {
            value: true
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

_yuitest_coverline("build/uploader-html5/uploader-html5.js", 999);
Y.UploaderHTML5.Queue = UploaderQueue;



}, '@VERSION@', {"requires": ["widget", "node-event-simulate", "file-html5", "uploader-queue"]});
