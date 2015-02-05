/**
 * http://github.com/Valums-File-Uploader/file-uploader
 *
 * Multiple file upload component with progress-bar, drag-and-drop, support for all modern browsers.
 *
 * Original version: 1.0 © 2010 Andrew Valums ( andrew(at)valums.com )
 * Current Maintainer (2.0+): © 2012, Ray Nicholus ( fineuploader(at)garstasio.com )
 *
 * Licensed under MIT license, GNU GPL 2 or later, GNU LGPL 2 or later, see license.txt.
 */
/*globals window, navigator, document, FormData, File, HTMLInputElement, XMLHttpRequest*/
var qq = function(element) {
    "use strict";

    return {
        hide: function() {
            element.style.display = 'none';
            return this;
        },

        /** Returns the function which detaches attached event */
        attach: function(type, fn) {
            if (element.addEventListener){
                element.addEventListener(type, fn, false);
            } else if (element.attachEvent){
                element.attachEvent('on' + type, fn);
            }
            return function() {
                qq(element).detach(type, fn);
            };
        },

        detach: function(type, fn) {
            if (element.removeEventListener){
                element.removeEventListener(type, fn, false);
            } else if (element.attachEvent){
                element.detachEvent('on' + type, fn);
            }
            return this;
        },

        contains: function(descendant) {
            // compareposition returns false in this case
            if (element === descendant) {
                return true;
            }

            if (element.contains){
                return element.contains(descendant);
            } else {
                /*jslint bitwise: true*/
                return !!(descendant.compareDocumentPosition(element) & 8);
            }
        },

        /**
         * Insert this element before elementB.
         */
        insertBefore: function(elementB) {
            elementB.parentNode.insertBefore(element, elementB);
            return this;
        },

        remove: function() {
            element.parentNode.removeChild(element);
            return this;
        },

        /**
         * Sets styles for an element.
         * Fixes opacity in IE6-8.
         */
        css: function(styles) {
            if (styles.opacity !== null){
                if (typeof element.style.opacity !== 'string' && typeof(element.filters) !== 'undefined'){
                    styles.filter = 'alpha(opacity=' + Math.round(100 * styles.opacity) + ')';
                }
            }
            qq.extend(element.style, styles);

            return this;
        },

        hasClass: function(name) {
            var re = new RegExp('(^| )' + name + '( |$)');
            return re.test(element.className);
        },

        addClass: function(name) {
            if (!qq(element).hasClass(name)){
                element.className += ' ' + name;
            }
            return this;
        },

        removeClass: function(name) {
            var re = new RegExp('(^| )' + name + '( |$)');
            element.className = element.className.replace(re, ' ').replace(/^\s+|\s+$/g, "");
            return this;
        },

        getByClass: function(className) {
            var candidates,
                result = [];

            if (element.querySelectorAll){
                return element.querySelectorAll('.' + className);
            }

            candidates = element.getElementsByTagName("*");

            qq.each(candidates, function(idx, val) {
                if (qq(val).hasClass(className)){
                    result.push(val);
                }
            });
            return result;
        },

        children: function() {
            var children = [],
                child = element.firstChild;

            while (child){
                if (child.nodeType === 1){
                    children.push(child);
                }
                child = child.nextSibling;
            }

            return children;
        },

        setText: function(text) {
            element.innerText = text;
            element.textContent = text;
            return this;
        },

        clearText: function() {
            return qq(element).setText("");
        }
    };
};

qq.log = function(message, level) {
    "use strict";

    if (window.console) {
        if (!level || level === 'info') {
            window.console.log(message);
        }
        else
        {
            if (window.console[level]) {
                window.console[level](message);
            }
            else {
                window.console.log('<' + level + '> ' + message);
            }
        }
    }
};

qq.isObject = function(variable) {
    "use strict";
    return variable !== null && variable && typeof(variable) === "object" && variable.constructor === Object;
};

qq.isFunction = function(variable) {
    "use strict";
    return typeof(variable) === "function";
};

qq.isFileOrInput = function(maybeFileOrInput) {
    "use strict";
    if (window.File && maybeFileOrInput instanceof File) {
        return true;
    }
    else if (window.HTMLInputElement) {
        if (maybeFileOrInput instanceof HTMLInputElement) {
            if (maybeFileOrInput.type && maybeFileOrInput.type.toLowerCase() === 'file') {
                return true;
            }
        }
    }
    else if (maybeFileOrInput.tagName) {
        if (maybeFileOrInput.tagName.toLowerCase() === 'input') {
            if (maybeFileOrInput.type && maybeFileOrInput.type.toLowerCase() === 'file') {
                return true;
            }
        }
    }

    return false;
};

qq.isXhrUploadSupported = function() {
    "use strict";
    var input = document.createElement('input');
    input.type = 'file';

    return (
        input.multiple !== undefined &&
            typeof File !== "undefined" &&
            typeof FormData !== "undefined" &&
            typeof (new XMLHttpRequest()).upload !== "undefined" );
};

qq.isFolderDropSupported = function(dataTransfer) {
    "use strict";
    return (dataTransfer.items && dataTransfer.items[0].webkitGetAsEntry);
};

qq.extend = function (first, second, extendNested) {
    "use strict";
    qq.each(second, function(prop, val) {
        if (extendNested && qq.isObject(val)) {
            if (first[prop] === undefined) {
                first[prop] = {};
            }
            qq.extend(first[prop], val, true);
        }
        else {
            first[prop] = val;
        }
    });
};

/**
 * Searches for a given element in the array, returns -1 if it is not present.
 * @param {Number} [from] The index at which to begin the search
 */
qq.indexOf = function(arr, elt, from){
    "use strict";

    if (arr.indexOf) {
        return arr.indexOf(elt, from);
    }

    from = from || 0;
    var len = arr.length;

    if (from < 0) {
        from += len;
    }

    for (null; from < len; from+=1){
        if (arr.hasOwnProperty(from) && arr[from] === elt){
            return from;
        }
    }
    return -1;
};

qq.getUniqueId = (function(){
    "use strict";

    var id = -1;
    return function(){
        id += 1;
        return id;
    };
}());

//
// Browsers and platforms detection

qq.ie       = function(){
    "use strict";
    return navigator.userAgent.indexOf('MSIE') !== -1;
};
qq.ie10     = function(){
    "use strict";
    return navigator.userAgent.indexOf('MSIE 10') !== -1;
};
qq.safari   = function(){
    "use strict";
    return navigator.vendor !== undefined && navigator.vendor.indexOf("Apple") !== -1;
};
qq.chrome   = function(){
    "use strict";
    return navigator.vendor !== undefined && navigator.vendor.indexOf('Google') !== -1;
};
qq.firefox  = function(){
    "use strict";
    return (navigator.userAgent.indexOf('Mozilla') !== -1 && navigator.vendor !== undefined && navigator.vendor === '');
};
qq.windows  = function(){
    "use strict";
    return navigator.platform === "Win32";
};

//
// Events

qq.preventDefault = function(e){
    "use strict";
    if (e.preventDefault){
        e.preventDefault();
    } else{
        e.returnValue = false;
    }
};

/**
 * Creates and returns element from html string
 * Uses innerHTML to create an element
 */
qq.toElement = (function(){
    "use strict";
    var div = document.createElement('div');
    return function(html){
        div.innerHTML = html;
        var element = div.firstChild;
        div.removeChild(element);
        return element;
    };
}());

//key and value are passed to callback for each item in the object or array
qq.each = function(obj, callback) {
    "use strict";
    var key, retVal;
    if (obj) {
        for (key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                retVal = callback(key, obj[key]);
                if (retVal === false) {
                    break;
                }
            }
        }
    }
};

/**
 * obj2url() takes a json-object as argument and generates
 * a querystring. pretty much like jQuery.param()
 *
 * how to use:
 *
 *    `qq.obj2url({a:'b',c:'d'},'http://any.url/upload?otherParam=value');`
 *
 * will result in:
 *
 *    `http://any.url/upload?otherParam=value&a=b&c=d`
 *
 * @param  Object JSON-Object
 * @param  String current querystring-part
 * @return String encoded querystring
 */
qq.obj2url = function(obj, temp, prefixDone){
    "use strict";
     var i, len,
         uristrings = [],
         prefix = '&',
         add = function(nextObj, i){
            var nextTemp = temp
                ? (/\[\]$/.test(temp)) // prevent double-encoding
                ? temp
                : temp+'['+i+']'
                : i;
            if ((nextTemp !== 'undefined') && (i !== 'undefined')) {
                uristrings.push(
                    (typeof nextObj === 'object')
                        ? qq.obj2url(nextObj, nextTemp, true)
                        : (Object.prototype.toString.call(nextObj) === '[object Function]')
                        ? encodeURIComponent(nextTemp) + '=' + encodeURIComponent(nextObj())
                        : encodeURIComponent(nextTemp) + '=' + encodeURIComponent(nextObj)
                );
            }
        };

    if (!prefixDone && temp) {
        prefix = (/\?/.test(temp)) ? (/\?$/.test(temp)) ? '' : '&' : '?';
        uristrings.push(temp);
        uristrings.push(qq.obj2url(obj));
    } else if ((Object.prototype.toString.call(obj) === '[object Array]') && (typeof obj !== 'undefined') ) {
        // we wont use a for-in-loop on an array (performance)
        for (i = -1, len = obj.length; i < len; i+=1){
            add(obj[i], i);
        }
    } else if ((typeof obj !== 'undefined') && (obj !== null) && (typeof obj === "object")){
        // for anything else but a scalar, we will use for-in-loop
        for (i in obj){
            if (obj.hasOwnProperty(i)) {
                add(obj[i], i);
            }
        }
    } else {
        uristrings.push(encodeURIComponent(temp) + '=' + encodeURIComponent(obj));
    }

    if (temp) {
        return uristrings.join(prefix);
    } else {
        return uristrings.join(prefix)
            .replace(/^&/, '')
            .replace(/%20/g, '+');
    }
};

qq.obj2FormData = function(obj, formData, arrayKeyName) {
    "use strict";
    if (!formData) {
        formData = new FormData();
    }

    qq.each(obj, function(key, val) {
        key = arrayKeyName ? arrayKeyName + '[' + key + ']' : key;

        if (qq.isObject(val)) {
            qq.obj2FormData(val, formData, key);
        }
        else if (qq.isFunction(val)) {
            formData.append(encodeURIComponent(key), encodeURIComponent(val()));
        }
        else {
            formData.append(encodeURIComponent(key), encodeURIComponent(val));
        }
    });

    return formData;
};

qq.obj2Inputs = function(obj, form) {
    "use strict";
    var input;

    if (!form) {
        form = document.createElement('form');
    }

    qq.obj2FormData(obj, {
        append: function(key, val) {
            input = document.createElement('input');
            input.setAttribute('name', key);
            input.setAttribute('value', val);
            form.appendChild(input);
        }
    });

    return form;
};

/**
 * A generic module which supports object disposing in dispose() method.
 * */
qq.DisposeSupport = function() {
    "use strict";
    var disposers = [];

    return {
        /** Run all registered disposers */
        dispose: function() {
            var disposer;
            do {
                disposer = disposers.shift();
                if (disposer) {
                    disposer();
                }
            }
            while (disposer);
        },

        /** Attach event handler and register de-attacher as a disposer */
        attach: function() {
            var args = arguments;
            /*jslint undef:true*/
            this.addDisposer(qq(args[0]).attach.apply(this, Array.prototype.slice.call(arguments, 1)));
        },

        /** Add disposer to the collection */
        addDisposer: function(disposeFunction) {
            disposers.push(disposeFunction);
        }
    };
};
qq.UploadButton = function(o){
    this._options = {
        element: null,
        // if set to true adds multiple attribute to file input
        multiple: false,
        acceptFiles: null,
        // name attribute of file input
        name: 'file',
        onChange: function(input){},
        hoverClass: 'qq-upload-button-hover',
        focusClass: 'qq-upload-button-focus'
    };

    qq.extend(this._options, o);
    this._disposeSupport = new qq.DisposeSupport();

    this._element = this._options.element;

    // make button suitable container for input
    qq(this._element).css({
        position: 'relative',
        overflow: 'hidden',
        // Make sure browse button is in the right side
        // in Internet Explorer
        direction: 'ltr'
    });

    this._input = this._createInput();
};

qq.UploadButton.prototype = {
    /* returns file input element */
    getInput: function(){
        return this._input;
    },
    /* cleans/recreates the file input */
    reset: function(){
        if (this._input.parentNode){
            qq(this._input).remove();
        }

        qq(this._element).removeClass(this._options.focusClass);
        this._input = this._createInput();
    },
    _createInput: function(){
        var input = document.createElement("input");

        if (this._options.multiple){
            input.setAttribute("multiple", "multiple");
        }

        if (this._options.acceptFiles) input.setAttribute("accept", this._options.acceptFiles);

        input.setAttribute("type", "file");
        input.setAttribute("name", this._options.name);

        qq(input).css({
            position: 'absolute',
            // in Opera only 'browse' button
            // is clickable and it is located at
            // the right side of the input
            right: 0,
            top: 0,
            fontFamily: 'Arial',
            // 4 persons reported this, the max values that worked for them were 243, 236, 236, 118
            fontSize: '118px',
            margin: 0,
            padding: 0,
            cursor: 'pointer',
            opacity: 0
        });

        this._element.appendChild(input);

        var self = this;
        this._disposeSupport.attach(input, 'change', function(){
            self._options.onChange(input);
        });

        this._disposeSupport.attach(input, 'mouseover', function(){
            qq(self._element).addClass(self._options.hoverClass);
        });
        this._disposeSupport.attach(input, 'mouseout', function(){
            qq(self._element).removeClass(self._options.hoverClass);
        });
        this._disposeSupport.attach(input, 'focus', function(){
            qq(self._element).addClass(self._options.focusClass);
        });
        this._disposeSupport.attach(input, 'blur', function(){
            qq(self._element).removeClass(self._options.focusClass);
        });

        // IE and Opera, unfortunately have 2 tab stops on file input
        // which is unacceptable in our case, disable keyboard access
        if (window.attachEvent){
            // it is IE or Opera
            input.setAttribute('tabIndex', "-1");
        }

        return input;
    }
};
qq.FineUploaderBasic = function(o){
    var that = this;
    this._options = {
        debug: false,
        button: null,
        multiple: true,
        maxConnections: 3,
        disableCancelForFormUploads: false,
        autoUpload: true,
        request: {
            endpoint: '/server/upload',
            params: {},
            paramsInBody: false,
            customHeaders: {},
            forceMultipart: false,
            inputName: 'qqfile'
        },
        validation: {
            allowedExtensions: [],
            sizeLimit: 0,
            minSizeLimit: 0,
            stopOnFirstInvalidFile: true
        },
        callbacks: {
            onSubmit: function(id, fileName){}, // return false to cancel submit
            onComplete: function(id, fileName, responseJSON){},
            onCancel: function(id, fileName){},
            onUpload: function(id, fileName, xhr){},
            onProgress: function(id, fileName, loaded, total){},
            onError: function(id, fileName, reason) {},
            onAutoRetry: function(id, fileName, attemptNumber) {},
            onManualRetry: function(id, fileName) {},
            onValidate: function(fileData) {} // return false to prevent upload
        },
        messages: {
            typeError: "{file} has an invalid extension. Valid extension(s): {extensions}.",
            sizeError: "{file} is too large, maximum file size is {sizeLimit}.",
            minSizeError: "{file} is too small, minimum file size is {minSizeLimit}.",
            emptyError: "{file} is empty, please select files again without it.",
            noFilesError: "No files to upload.",
            onLeave: "The files are being uploaded, if you leave now the upload will be cancelled."
        },
        retry: {
            enableAuto: false,
            maxAutoAttempts: 3,
            autoAttemptDelay: 5,
            preventRetryResponseProperty: 'preventRetry'
        },
        classes: {
            buttonHover: 'qq-upload-button-hover',
            buttonFocus: 'qq-upload-button-focus'
        }
    };

    qq.extend(this._options, o, true);
    this._wrapCallbacks();
    this._disposeSupport =  new qq.DisposeSupport();

    // number of files being uploaded
    this._filesInProgress = 0;

    this._storedFileIds = [];

    this._autoRetries = [];
    this._retryTimeouts = [];
    this._preventRetries = [];

    this._paramsStore = this._createParamsStore();

    this._handler = this._createUploadHandler();

    if (this._options.button){
        this._button = this._createUploadButton(this._options.button);
    }

    this._preventLeaveInProgress();
};

qq.FineUploaderBasic.prototype = {
    log: function(str, level) {
        if (this._options.debug && (!level || level === 'info')) {
            qq.log('[FineUploader] ' + str);
        }
        else if (level && level !== 'info') {
            qq.log('[FineUploader] ' + str, level);

        }
    },
    setParams: function(params, fileId){
        if (fileId === undefined) {
            this._options.request.params = params;
        }
        else {
            this._paramsStore.setParams(params, fileId);
        }
    },
    getInProgress: function(){
        return this._filesInProgress;
    },
    uploadStoredFiles: function(){
        "use strict";
        while(this._storedFileIds.length) {
            this._filesInProgress++;
            this._handler.upload(this._storedFileIds.shift());
        }
    },
    clearStoredFiles: function(){
        this._storedFileIds = [];
    },
    retry: function(id) {
        if (this._onBeforeManualRetry(id)) {
            this._handler.retry(id);
            return true;
        }
        else {
            return false;
        }
    },
    cancel: function(fileId) {
        this._handler.cancel(fileId);
    },
    reset: function() {
        this.log("Resetting uploader...");
        this._handler.reset();
        this._filesInProgress = 0;
        this._storedFileIds = [];
        this._autoRetries = [];
        this._retryTimeouts = [];
        this._preventRetries = [];
        this._button.reset();
        this._paramsStore.reset();
    },
    addFiles: function(filesOrInputs) {
        var self = this,
            verifiedFilesOrInputs = [],
            index, fileOrInput;

        if (filesOrInputs) {
            if (!window.FileList || !(filesOrInputs instanceof FileList)) {
                filesOrInputs = [].concat(filesOrInputs);
            }

            for (index = 0; index < filesOrInputs.length; index+=1) {
                fileOrInput = filesOrInputs[index];

                if (qq.isFileOrInput(fileOrInput)) {
                    verifiedFilesOrInputs.push(fileOrInput);
                }
                else {
                    self.log(fileOrInput + ' is not a File or INPUT element!  Ignoring!', 'warn');
                }
            }

            this.log('Processing ' + verifiedFilesOrInputs.length + ' files or inputs...');
            this._uploadFileList(verifiedFilesOrInputs);
        }
    },
    _createUploadButton: function(element){
        var self = this;

        var button = new qq.UploadButton({
            element: element,
            multiple: this._options.multiple && qq.isXhrUploadSupported(),
            acceptFiles: this._options.validation.acceptFiles,
            onChange: function(input){
                self._onInputChange(input);
            },
            hoverClass: this._options.classes.buttonHover,
            focusClass: this._options.classes.buttonFocus
        });

        this._disposeSupport.addDisposer(function() { button.dispose(); });
        return button;
    },
    _createUploadHandler: function(){
        var self = this,
            handlerClass;

        if(qq.isXhrUploadSupported()){
            handlerClass = 'UploadHandlerXhr';
        } else {
            handlerClass = 'UploadHandlerForm';
        }

        var handler = new qq[handlerClass]({
            debug: this._options.debug,
            endpoint: this._options.request.endpoint,
            forceMultipart: this._options.request.forceMultipart,
            maxConnections: this._options.maxConnections,
            customHeaders: this._options.request.customHeaders,
            inputName: this._options.request.inputName,
            demoMode: this._options.demoMode,
            log: this.log,
            paramsInBody: this._options.request.paramsInBody,
            paramsStore: this._paramsStore,
            onProgress: function(id, fileName, loaded, total){
                self._onProgress(id, fileName, loaded, total);
                self._options.callbacks.onProgress(id, fileName, loaded, total);
            },
            onComplete: function(id, fileName, result, xhr){
                self._onComplete(id, fileName, result, xhr);
                self._options.callbacks.onComplete(id, fileName, result);
            },
            onCancel: function(id, fileName){
                self._onCancel(id, fileName);
                self._options.callbacks.onCancel(id, fileName);
            },
            onUpload: function(id, fileName, xhr){
                self._onUpload(id, fileName, xhr);
                self._options.callbacks.onUpload(id, fileName, xhr);
            },
            onAutoRetry: function(id, fileName, responseJSON, xhr) {
                self._preventRetries[id] = responseJSON[self._options.retry.preventRetryResponseProperty];

                if (self._shouldAutoRetry(id, fileName, responseJSON)) {
                    self._maybeParseAndSendUploadError(id, fileName, responseJSON, xhr);
                    self._options.callbacks.onAutoRetry(id, fileName, self._autoRetries[id] + 1);
                    self._onBeforeAutoRetry(id, fileName);

                    self._retryTimeouts[id] = setTimeout(function() {
                        self._onAutoRetry(id, fileName, responseJSON)
                    }, self._options.retry.autoAttemptDelay * 1000);

                    return true;
                }
                else {
                    return false;
                }
            }
        });

        return handler;
    },
    _preventLeaveInProgress: function(){
        var self = this;

        this._disposeSupport.attach(window, 'beforeunload', function(e){
            if (!self._filesInProgress){return;}

            var e = e || window.event;
            // for ie, ff
            e.returnValue = self._options.messages.onLeave;
            // for webkit
            return self._options.messages.onLeave;
        });
    },
    _onSubmit: function(id, fileName){
        if (this._options.autoUpload) {
            this._filesInProgress++;
        }
    },
    _onProgress: function(id, fileName, loaded, total){
    },
    _onComplete: function(id, fileName, result, xhr){
        this._filesInProgress--;
        this._maybeParseAndSendUploadError(id, fileName, result, xhr);
    },
    _onCancel: function(id, fileName){
        clearTimeout(this._retryTimeouts[id]);

        var storedFileIndex = qq.indexOf(this._storedFileIds, id);
        if (this._options.autoUpload || storedFileIndex < 0) {
            this._filesInProgress--;
        }
        else if (!this._options.autoUpload) {
            this._storedFileIds.splice(storedFileIndex, 1);
        }
    },
    _onUpload: function(id, fileName, xhr){
    },
    _onInputChange: function(input){
        if (this._handler instanceof qq.UploadHandlerXhr){
            this.addFiles(input.files);
        } else {
            if (this._validateFile(input)){
                this.addFiles(input);
            }
        }
        this._button.reset();
    },
    _onBeforeAutoRetry: function(id, fileName) {
        this.log("Waiting " + this._options.retry.autoAttemptDelay + " seconds before retrying " + fileName + "...");
    },
    _onAutoRetry: function(id, fileName, responseJSON) {
        this.log("Retrying " + fileName + "...");
        this._autoRetries[id]++;
        this._handler.retry(id);
    },
    _shouldAutoRetry: function(id, fileName, responseJSON) {
        if (!this._preventRetries[id] && this._options.retry.enableAuto) {
            if (this._autoRetries[id] === undefined) {
                this._autoRetries[id] = 0;
            }

            return this._autoRetries[id] < this._options.retry.maxAutoAttempts
        }

        return false;
    },
    //return false if we should not attempt the requested retry
    _onBeforeManualRetry: function(id) {
        if (this._preventRetries[id]) {
            this.log("Retries are forbidden for id " + id, 'warn');
            return false;
        }
        else if (this._handler.isValid(id)) {
            var fileName = this._handler.getName(id);

            if (this._options.callbacks.onManualRetry(id, fileName) === false) {
                return false;
            }

            this.log("Retrying upload for '" + fileName + "' (id: " + id + ")...");
            this._filesInProgress++;
            return true;
        }
        else {
            this.log("'" + id + "' is not a valid file ID", 'error');
            return false;
        }
    },
    _maybeParseAndSendUploadError: function(id, fileName, response, xhr) {
        //assuming no one will actually set the response code to something other than 200 and still set 'success' to true
        if (!response.success){
            if (xhr && xhr.status !== 200 && !response.error) {
                this._options.callbacks.onError(id, fileName, "XHR returned response code " + xhr.status);
            }
            else {
                var errorReason = response.error ? response.error : "Upload failure reason unknown";
                this._options.callbacks.onError(id, fileName, errorReason);
            }
        }
    },
    _uploadFileList: function(files){
        var validationDescriptors, index, batchInvalid;

        validationDescriptors = this._getValidationDescriptors(files);
        batchInvalid = this._options.callbacks.onValidate(validationDescriptors) === false;

        if (!batchInvalid) {
            if (files.length > 0) {
                for (index = 0; index < files.length; index++){
                    if (this._validateFile(files[index])){
                        this._uploadFile(files[index]);
                    } else {
                        if (this._options.validation.stopOnFirstInvalidFile){
                            return;
                        }
                    }
                }
            }
            else {
                this._error('noFilesError', "");
            }
        }
    },
    _uploadFile: function(fileContainer){
        var id = this._handler.add(fileContainer);
        var fileName = this._handler.getName(id);

        if (this._options.callbacks.onSubmit(id, fileName) !== false){
            this._onSubmit(id, fileName);
            if (this._options.autoUpload) {
                this._handler.upload(id);
            }
            else {
                this._storeFileForLater(id);
            }
        }
    },
    _storeFileForLater: function(id) {
        this._storedFileIds.push(id);
    },
    _validateFile: function(file){
        var validationDescriptor, name, size;

        validationDescriptor = this._getValidationDescriptor(file);
        name = validationDescriptor.name;
        size = validationDescriptor.size;

        if (this._options.callbacks.onValidate([validationDescriptor]) === false) {
            return false;
        }

        if (!this._isAllowedExtension(name)){
            this._error('typeError', name);
            return false;

        }
        else if (size === 0){
            this._error('emptyError', name);
            return false;

        }
        else if (size && this._options.validation.sizeLimit && size > this._options.validation.sizeLimit){
            this._error('sizeError', name);
            return false;

        }
        else if (size && size < this._options.validation.minSizeLimit){
            this._error('minSizeError', name);
            return false;
        }

        return true;
    },
    _error: function(code, fileName){
        var message = this._options.messages[code];
        function r(name, replacement){ message = message.replace(name, replacement); }

        var extensions = this._options.validation.allowedExtensions.join(', ');

        r('{file}', this._formatFileName(fileName));
        r('{extensions}', extensions);
        r('{sizeLimit}', this._formatSize(this._options.validation.sizeLimit));
        r('{minSizeLimit}', this._formatSize(this._options.validation.minSizeLimit));

        this._options.callbacks.onError(null, fileName, message);

        return message;
    },
    _formatFileName: function(name){
        if (name.length > 33){
            name = name.slice(0, 19) + '...' + name.slice(-13);
        }
        return name;
    },
    _isAllowedExtension: function(fileName){
        var ext = (-1 !== fileName.indexOf('.'))
            ? fileName.replace(/.*[.]/, '').toLowerCase()
            : '';
        var allowed = this._options.validation.allowedExtensions;

        if (!allowed.length){return true;}

        for (var i=0; i<allowed.length; i++){
            if (allowed[i].toLowerCase() == ext){ return true;}
        }

        return false;
    },
    _formatSize: function(bytes){
        var i = -1;
        do {
            bytes = bytes / 1024;
            i++;
        } while (bytes > 99);

        return Math.max(bytes, 0.1).toFixed(1) + ['kB', 'MB', 'GB', 'TB', 'PB', 'EB'][i];
    },
    _wrapCallbacks: function() {
        var self, safeCallback;

        self = this;

        safeCallback = function(name, callback, args) {
            try {
                return callback.apply(self, args);
            }
            catch (exception) {
                self.log("Caught exception in '" + name + "' callback - " + exception, 'error');
            }
        }

        for (var prop in this._options.callbacks) {
            (function() {
                var callbackName, callbackFunc;
                callbackName = prop;
                callbackFunc = self._options.callbacks[callbackName];
                self._options.callbacks[callbackName] = function() {
                    return safeCallback(callbackName, callbackFunc, arguments);
                }
            }());
        }
    },
    _parseFileName: function(file) {
        var name;

        if (file.value){
            // it is a file input
            // get input value and remove path to normalize
            name = file.value.replace(/.*(\/|\\)/, "");
        } else {
            // fix missing properties in Safari 4 and firefox 11.0a2
            name = (file.fileName !== null && file.fileName !== undefined) ? file.fileName : file.name;
        }

        return name;
    },
    _parseFileSize: function(file) {
        var size;

        if (!file.value){
            // fix missing properties in Safari 4 and firefox 11.0a2
            size = (file.fileSize !== null && file.fileSize !== undefined) ? file.fileSize : file.size;
        }

        return size;
    },
    _getValidationDescriptor: function(file) {
        var name, size, fileDescriptor;

        fileDescriptor = {};
        name = this._parseFileName(file);
        size = this._parseFileSize(file);

        fileDescriptor.name = name;
        if (size) {
            fileDescriptor.size = size;
        }

        return fileDescriptor;
    },
    _getValidationDescriptors: function(files) {
        var index, fileDescriptors;

        fileDescriptors = [];

        for (index = 0; index < files.length; index++) {
            fileDescriptors.push(files[index]);
        }

        return fileDescriptors;
    },
    _createParamsStore: function() {
        var paramsStore = {},
            self = this;

        return {
            setParams: function(params, fileId) {
                var paramsCopy = {};
                qq.extend(paramsCopy, params);
                paramsStore[fileId] = paramsCopy;
            },

            getParams: function(fileId) {
                var paramsCopy = {};

                if (fileId !== undefined && paramsStore[fileId]) {
                    qq.extend(paramsCopy, paramsStore[fileId]);
                }
                else {
                    qq.extend(paramsCopy, self._options.request.params);
                }

                return paramsCopy;
            },

            remove: function(fileId) {
                return delete paramsStore[fileId];
            },

            reset: function() {
                paramsStore = {};
            }
        }
    }
};
/*globals qq, document*/
qq.DragAndDrop = function(o) {
    "use strict";

    var options, dz, dirPending,
        droppedFiles = [],
        droppedEntriesCount = 0,
        droppedEntriesParsedCount = 0,
        disposeSupport = new qq.DisposeSupport();

     options = {
        dropArea: null,
        extraDropzones: [],
        hideDropzones: true,
        multiple: true,
        classes: {
            dropActive: null
        },
        callbacks: {
            dropProcessing: function(isProcessing, files) {},
            error: function(code, filename) {},
            log: function(message, level) {}
        }
    };

    qq.extend(options, o);

    function maybeUploadDroppedFiles() {
        if (droppedEntriesCount === droppedEntriesParsedCount && !dirPending) {
            options.callbacks.log('Grabbed ' + droppedFiles.length + " files after tree traversal.");
            dz.dropDisabled(false);
            options.callbacks.dropProcessing(false, droppedFiles);
        }
    }
    function addDroppedFile(file) {
        droppedFiles.push(file);
        droppedEntriesParsedCount+=1;
        maybeUploadDroppedFiles();
    }

    function traverseFileTree(entry) {
        var dirReader, i;

        droppedEntriesCount+=1;

        if (entry.isFile) {
            entry.file(function(file) {
                addDroppedFile(file);
            });
        }
        else if (entry.isDirectory) {
            dirPending = true;
            dirReader = entry.createReader();
            dirReader.readEntries(function(entries) {
                droppedEntriesParsedCount+=1;
                for (i = 0; i < entries.length; i+=1) {
                    traverseFileTree(entries[i]);
                }

                dirPending = false;

                if (!entries.length) {
                    maybeUploadDroppedFiles();
                }
            });
        }
    }

    function handleDataTransfer(dataTransfer) {
        var i, items, entry;

        options.callbacks.dropProcessing(true);
        dz.dropDisabled(true);

        if (dataTransfer.files.length > 1 && !options.multiple) {
            options.callbacks.error('tooManyFilesError', "");
        }
        else {
            droppedFiles = [];
            droppedEntriesCount = 0;
            droppedEntriesParsedCount = 0;

            if (qq.isFolderDropSupported(dataTransfer)) {
                items = dataTransfer.items;

                for (i = 0; i < items.length; i+=1) {
                    entry = items[i].webkitGetAsEntry();
                    if (entry) {
                        //due to a bug in Chrome's File System API impl - #149735
                        if (entry.isFile) {
                            droppedFiles.push(items[i].getAsFile());
                            if (i === items.length-1) {
                                maybeUploadDroppedFiles();
                            }
                        }

                        else {
                            traverseFileTree(entry);
                        }
                    }
                }
            }
            else {
                options.callbacks.dropProcessing(false, dataTransfer.files);
                dz.dropDisabled(false);
            }
        }
    }

    function setupDropzone(dropArea){
        dz = new qq.UploadDropZone({
            element: dropArea,
            onEnter: function(e){
                qq(dropArea).addClass(options.classes.dropActive);
                e.stopPropagation();
            },
            onLeaveNotDescendants: function(e){
                qq(dropArea).removeClass(options.classes.dropActive);
            },
            onDrop: function(e){
                if (options.hideDropzones) {
                    qq(dropArea).hide();
                }
                qq(dropArea).removeClass(options.classes.dropActive);

                handleDataTransfer(e.dataTransfer);
            }
        });

        disposeSupport.addDisposer(function() {
            dz.dispose();
        });

        if (options.hideDropzones) {
            qq(dropArea).hide();
        }
    }

    function isFileDrag(dragEvent) {
        var fileDrag;

        qq.each(dragEvent.dataTransfer.types, function(key, val) {
            if (val === 'Files') {
                fileDrag = true;
                return false;
            }
        });

        return fileDrag;
    }

    function setupDragDrop(){
        if (options.dropArea) {
            options.extraDropzones.push(options.dropArea);
        }

        var i, dropzones = options.extraDropzones;

        for (i=0; i < dropzones.length; i+=1){
            setupDropzone(dropzones[i]);
        }

        // IE <= 9 does not support the File API used for drag+drop uploads
        if (options.dropArea && (!qq.ie() || qq.ie10())) {
            disposeSupport.attach(document, 'dragenter', function(e) {
                if (!dz.dropDisabled() && isFileDrag(e)) {
                    if (qq(options.dropArea).hasClass(options.classes.dropDisabled)) {
                        return;
                    }

                    options.dropArea.style.display = 'block';
                    for (i=0; i < dropzones.length; i+=1) {
                        dropzones[i].style.display = 'block';
                    }
                }
            });
        }
        disposeSupport.attach(document, 'dragleave', function(e){
            if (options.hideDropzones && qq.FineUploader.prototype._leaving_document_out(e)) {
                for (i=0; i < dropzones.length; i+=1) {
                    qq(dropzones[i]).hide();
                }
            }
        });
        disposeSupport.attach(document, 'drop', function(e){
            if (options.hideDropzones) {
                for (i=0; i < dropzones.length; i+=1) {
                    qq(dropzones[i]).hide();
                }
            }
            e.preventDefault();
        });
    }

    return {
        setup: function() {
            setupDragDrop();
        },

        setupExtraDropzone: function(element) {
            options.extraDropzones.push(element);
            setupDropzone(element);
        },

        removeExtraDropzone: function(element) {
            var i, dzs = options.extraDropzones;
            for(i in dzs) {
                if (dzs[i] === element) {
                    return dzs.splice(i, 1);
                }
            }
        },

        dispose: function() {
            disposeSupport.dispose();
            dz.dispose();
        }
    };
};


qq.UploadDropZone = function(o){
    "use strict";

    var options, element, preventDrop, dropOutsideDisabled, disposeSupport = new qq.DisposeSupport();

    options = {
        element: null,
        onEnter: function(e){},
        onLeave: function(e){},
        // is not fired when leaving element by hovering descendants
        onLeaveNotDescendants: function(e){},
        onDrop: function(e){}
    };

    qq.extend(options, o);
    element = options.element;

    function dragover_should_be_canceled(){
        return qq.safari() || (qq.firefox() && qq.windows());
    }

    function disableDropOutside(e){
        // run only once for all instances
        if (!dropOutsideDisabled ){

            // for these cases we need to catch onDrop to reset dropArea
            if (dragover_should_be_canceled){
               disposeSupport.attach(document, 'dragover', function(e){
                    e.preventDefault();
                });
            } else {
                disposeSupport.attach(document, 'dragover', function(e){
                    if (e.dataTransfer){
                        e.dataTransfer.dropEffect = 'none';
                        e.preventDefault();
                    }
                });
            }

            dropOutsideDisabled = true;
        }
    }

    function isValidFileDrag(e){
        // e.dataTransfer currently causing IE errors
        // IE9 does NOT support file API, so drag-and-drop is not possible
        if (qq.ie() && !qq.ie10()) {
            return false;
        }

        var effectTest, dt = e.dataTransfer,
        // do not check dt.types.contains in webkit, because it crashes safari 4
        isSafari = qq.safari();

        // dt.effectAllowed is none in Safari 5
        // dt.types.contains check is for firefox
        effectTest = qq.ie10() ? true : dt.effectAllowed !== 'none';
        return dt && effectTest && (dt.files || (!isSafari && dt.types.contains && dt.types.contains('Files')));
    }

    function isOrSetDropDisabled(isDisabled) {
        if (isDisabled !== undefined) {
            preventDrop = isDisabled;
        }
        return preventDrop;
    }

    function attachEvents(){
        disposeSupport.attach(element, 'dragover', function(e){
            if (!isValidFileDrag(e)) {
                return;
            }

            var effect = qq.ie() ? null : e.dataTransfer.effectAllowed;
            if (effect === 'move' || effect === 'linkMove'){
                e.dataTransfer.dropEffect = 'move'; // for FF (only move allowed)
            } else {
                e.dataTransfer.dropEffect = 'copy'; // for Chrome
            }

            e.stopPropagation();
            e.preventDefault();
        });

        disposeSupport.attach(element, 'dragenter', function(e){
            if (!isOrSetDropDisabled()) {
                if (!isValidFileDrag(e)) {
                    return;
                }
                options.onEnter(e);
            }
        });

        disposeSupport.attach(element, 'dragleave', function(e){
            if (!isValidFileDrag(e)) {
                return;
            }

            options.onLeave(e);

            var relatedTarget = document.elementFromPoint(e.clientX, e.clientY);
            // do not fire when moving a mouse over a descendant
            if (qq(this).contains(relatedTarget)) {
                return;
            }

            options.onLeaveNotDescendants(e);
        });

        disposeSupport.attach(element, 'drop', function(e){
            if (!isOrSetDropDisabled()) {
                if (!isValidFileDrag(e)) {
                    return;
                }

                e.preventDefault();
                options.onDrop(e);
            }
        });
    }

    disableDropOutside();
    attachEvents();

    return {
        dropDisabled: function(isDisabled) {
            return isOrSetDropDisabled(isDisabled);
        },

        dispose: function() {
            disposeSupport.dispose();
        }
    };
};
/**
 * Class that creates upload widget with drag-and-drop and file list
 * @inherits qq.FineUploaderBasic
 */
qq.FineUploader = function(o){
    // call parent constructor
    qq.FineUploaderBasic.apply(this, arguments);

    // additional options
    qq.extend(this._options, {
        element: null,
        listElement: null,
        dragAndDrop: {
            extraDropzones: [],
            hideDropzones: true,
            disableDefaultDropzone: false
        },
        text: {
            uploadButton: 'Upload a file',
            cancelButton: 'Cancel',
            retryButton: 'Retry',
            failUpload: 'Upload failed',
            dragZone: 'Drop files here to upload',
            dropProcessing: 'Processing dropped files...',
            formatProgress: "{percent}% of {total_size}",
            waitingForResponse: "Processing..."
        },
        template: '<div class="qq-uploader">' +
            ((!this._options.dragAndDrop || !this._options.dragAndDrop.disableDefaultDropzone) ? '<div class="qq-upload-drop-area"><span>{dragZoneText}</span></div>' : '') +
            (!this._options.button ? '<div class="qq-upload-button"><div>{uploadButtonText}</div></div>' : '') +
            '<span class="qq-drop-processing"><span>{dropProcessingText}</span><span class="qq-drop-processing-spinner"></span></span>' +
            (!this._options.listElement ? '<ul class="qq-upload-list"></ul>' : '') +
            '</div>',

        // template for one item in file list
        fileTemplate: '<li>' +
            '<div class="qq-progress-bar"></div>' +
            '<span class="qq-upload-spinner"></span>' +
            '<span class="qq-upload-finished"></span>' +
            '<span class="qq-upload-file"></span>' +
            '<span class="qq-upload-size"></span>' +
            '<a class="qq-upload-cancel" href="#">{cancelButtonText}</a>' +
            '<a class="qq-upload-retry" href="#">{retryButtonText}</a>' +
            '<span class="qq-upload-status-text">{statusText}</span>' +
            '</li>',
        classes: {
            button: 'qq-upload-button',
            drop: 'qq-upload-drop-area',
            dropActive: 'qq-upload-drop-area-active',
            dropDisabled: 'qq-upload-drop-area-disabled',
            list: 'qq-upload-list',
            progressBar: 'qq-progress-bar',
            file: 'qq-upload-file',
            spinner: 'qq-upload-spinner',
            finished: 'qq-upload-finished',
            retrying: 'qq-upload-retrying',
            retryable: 'qq-upload-retryable',
            size: 'qq-upload-size',
            cancel: 'qq-upload-cancel',
            retry: 'qq-upload-retry',
            statusText: 'qq-upload-status-text',

            success: 'qq-upload-success',
            fail: 'qq-upload-fail',

            successIcon: null,
            failIcon: null,

            dropProcessing: 'qq-drop-processing',
            dropProcessingSpinner: 'qq-drop-processing-spinner'
        },
        failedUploadTextDisplay: {
            mode: 'default', //default, custom, or none
            maxChars: 50,
            responseProperty: 'error',
            enableTooltip: true
        },
        messages: {
            tooManyFilesError: "You may only drop one file"
        },
        retry: {
            showAutoRetryNote: true,
            autoRetryNote: "Retrying {retryNum}/{maxAuto}...",
            showButton: false
        },
        showMessage: function(message){
            alert(message);
        }
    }, true);

    // overwrite options with user supplied
    qq.extend(this._options, o, true);
    this._wrapCallbacks();

    // overwrite the upload button text if any
    // same for the Cancel button and Fail message text
    this._options.template     = this._options.template.replace(/\{dragZoneText\}/g, this._options.text.dragZone);
    this._options.template     = this._options.template.replace(/\{uploadButtonText\}/g, this._options.text.uploadButton);
    this._options.template     = this._options.template.replace(/\{dropProcessingText\}/g, this._options.text.dropProcessing);
    this._options.fileTemplate = this._options.fileTemplate.replace(/\{cancelButtonText\}/g, this._options.text.cancelButton);
    this._options.fileTemplate = this._options.fileTemplate.replace(/\{retryButtonText\}/g, this._options.text.retryButton);
    this._options.fileTemplate = this._options.fileTemplate.replace(/\{statusText\}/g, "");

    this._element = this._options.element;
    this._element.innerHTML = this._options.template;
    this._listElement = this._options.listElement || this._find(this._element, 'list');

    this._classes = this._options.classes;

    if (!this._button) {
        this._button = this._createUploadButton(this._find(this._element, 'button'));
    }

    this._bindCancelAndRetryEvents();

    this._dnd = this._setupDragAndDrop();
};

// inherit from Basic Uploader
qq.extend(qq.FineUploader.prototype, qq.FineUploaderBasic.prototype);

qq.extend(qq.FineUploader.prototype, {
    clearStoredFiles: function() {
        qq.FineUploaderBasic.prototype.clearStoredFiles.apply(this, arguments);
        this._listElement.innerHTML = "";
    },
    addExtraDropzone: function(element){
        this._dnd.setupExtraDropzone(element);
    },
    removeExtraDropzone: function(element){
        return this._dnd.removeExtraDropzone(element);
    },
    getItemByFileId: function(id){
        var item = this._listElement.firstChild;

        // there can't be txt nodes in dynamically created list
        // and we can  use nextSibling
        while (item){
            if (item.qqFileId == id) return item;
            item = item.nextSibling;
        }
    },
    cancel: function(fileId) {
        qq.FineUploaderBasic.prototype.cancel.apply(this, arguments);
        var item = this.getItemByFileId(fileId);
        qq(item).remove();
    },
    reset: function() {
        qq.FineUploaderBasic.prototype.reset.apply(this, arguments);
        this._element.innerHTML = this._options.template;
        this._listElement = this._options.listElement || this._find(this._element, 'list');
        if (!this._options.button) {
            this._button = this._createUploadButton(this._find(this._element, 'button'));
        }
        this._bindCancelAndRetryEvents();
        this._dnd.dispose();
        this._dnd = this._setupDragAndDrop();
    },
    _setupDragAndDrop: function() {
        var self = this,
            dropProcessingEl = this._find(this._element, 'dropProcessing'),
            dnd, preventSelectFiles, defaultDropAreaEl;

        preventSelectFiles = function(event) {
            event.preventDefault();
        };

        if (!this._options.dragAndDrop.disableDefaultDropzone) {
            defaultDropAreaEl = this._find(this._options.element, 'drop');
        }

        dnd = new qq.DragAndDrop({
            dropArea: defaultDropAreaEl,
            extraDropzones: this._options.dragAndDrop.extraDropzones,
            hideDropzones: this._options.dragAndDrop.hideDropzones,
            multiple: this._options.multiple,
            classes: {
                dropActive: this._options.classes.dropActive
            },
            callbacks: {
                dropProcessing: function(isProcessing, files) {
                    var input = self._button.getInput();

                    if (isProcessing) {
                        qq(dropProcessingEl).css({display: 'block'});
                        qq(input).attach('click', preventSelectFiles);
                    }
                    else {
                        qq(dropProcessingEl).hide();
                        qq(input).detach('click', preventSelectFiles);
                    }

                    if (files) {
                        self.addFiles(files);
                    }
                },
                error: function(code, filename) {
                    self._error(code, filename);
                },
                log: function(message, level) {
                    self.log(message, level);
                }
            }
        });

        dnd.setup();

        return dnd;
    },
    _leaving_document_out: function(e){
        return ((qq.chrome() || (qq.safari() && qq.windows())) && e.clientX == 0 && e.clientY == 0) // null coords for Chrome and Safari Windows
            || (qq.firefox() && !e.relatedTarget); // null e.relatedTarget for Firefox
    },
    _storeFileForLater: function(id) {
        qq.FineUploaderBasic.prototype._storeFileForLater.apply(this, arguments);
        var item = this.getItemByFileId(id);
        qq(this._find(item, 'spinner')).hide();
    },
    /**
     * Gets one of the elements listed in this._options.classes
     **/
    _find: function(parent, type){
        var element = qq(parent).getByClass(this._options.classes[type])[0];
        if (!element){
            throw new Error('element not found ' + type);
        }

        return element;
    },
    _onSubmit: function(id, fileName){
        qq.FineUploaderBasic.prototype._onSubmit.apply(this, arguments);
        this._addToList(id, fileName);
    },
    // Update the progress bar & percentage as the file is uploaded
    _onProgress: function(id, fileName, loaded, total){
        qq.FineUploaderBasic.prototype._onProgress.apply(this, arguments);

        var item, progressBar, text, percent, cancelLink, size;

        item = this.getItemByFileId(id);
        progressBar = this._find(item, 'progressBar');
        percent = Math.round(loaded / total * 100);

        if (loaded === total) {
            cancelLink = this._find(item, 'cancel');
            qq(cancelLink).hide();

            qq(progressBar).hide();
            qq(this._find(item, 'statusText')).setText(this._options.text.waitingForResponse);

            // If last byte was sent, just display final size
            text = this._formatSize(total);
        }
        else {
            // If still uploading, display percentage
            text = this._formatProgress(loaded, total);

            qq(progressBar).css({display: 'block'});
        }

        // Update progress bar element
        qq(progressBar).css({width: percent + '%'});

        size = this._find(item, 'size');
        qq(size).css({display: 'inline'});
        qq(size).setText(text);
    },
    _onComplete: function(id, fileName, result, xhr){
        qq.FineUploaderBasic.prototype._onComplete.apply(this, arguments);

        var item = this.getItemByFileId(id);

        qq(this._find(item, 'statusText')).clearText();

        qq(item).removeClass(this._classes.retrying);
        qq(this._find(item, 'progressBar')).hide();

        if (!this._options.disableCancelForFormUploads || qq.isXhrUploadSupported()) {
            qq(this._find(item, 'cancel')).hide();
        }
        qq(this._find(item, 'spinner')).hide();

        if (result.success){
            qq(item).addClass(this._classes.success);
            if (this._classes.successIcon) {
                this._find(item, 'finished').style.display = "inline-block";
                qq(item).addClass(this._classes.successIcon);
            }
        } else {
            qq(item).addClass(this._classes.fail);
            if (this._classes.failIcon) {
                this._find(item, 'finished').style.display = "inline-block";
                qq(item).addClass(this._classes.failIcon);
            }
            if (this._options.retry.showButton && !this._preventRetries[id]) {
                qq(item).addClass(this._classes.retryable);
            }
            this._controlFailureTextDisplay(item, result);
        }
    },
    _onUpload: function(id, fileName, xhr){
        qq.FineUploaderBasic.prototype._onUpload.apply(this, arguments);

        var item = this.getItemByFileId(id);
        this._showSpinner(item);
    },
    _onBeforeAutoRetry: function(id) {
        var item, progressBar, cancelLink, failTextEl, retryNumForDisplay, maxAuto, retryNote;

        qq.FineUploaderBasic.prototype._onBeforeAutoRetry.apply(this, arguments);

        item = this.getItemByFileId(id);
        progressBar = this._find(item, 'progressBar');

        this._showCancelLink(item);
        progressBar.style.width = 0;
        qq(progressBar).hide();

        if (this._options.retry.showAutoRetryNote) {
            failTextEl = this._find(item, 'statusText');
            retryNumForDisplay = this._autoRetries[id] + 1;
            maxAuto = this._options.retry.maxAutoAttempts;

            retryNote = this._options.retry.autoRetryNote.replace(/\{retryNum\}/g, retryNumForDisplay);
            retryNote = retryNote.replace(/\{maxAuto\}/g, maxAuto);

            qq(failTextEl).setText(retryNote);
            if (retryNumForDisplay === 1) {
                qq(item).addClass(this._classes.retrying);
            }
        }
    },
    //return false if we should not attempt the requested retry
    _onBeforeManualRetry: function(id) {
        if (qq.FineUploaderBasic.prototype._onBeforeManualRetry.apply(this, arguments)) {
            var item = this.getItemByFileId(id);
            this._find(item, 'progressBar').style.width = 0;
            qq(item).removeClass(this._classes.fail);
            this._showSpinner(item);
            this._showCancelLink(item);
            return true;
        }
        return false;
    },
    _addToList: function(id, fileName){
        var item = qq.toElement(this._options.fileTemplate);
        if (this._options.disableCancelForFormUploads && !qq.isXhrUploadSupported()) {
            var cancelLink = this._find(item, 'cancel');
            qq(cancelLink).remove();
        }

        item.qqFileId = id;

        var fileElement = this._find(item, 'file');
        qq(fileElement).setText(this._formatFileName(fileName));
        qq(this._find(item, 'size')).hide();
        if (!this._options.multiple) this._clearList();
        this._listElement.appendChild(item);
    },
    _clearList: function(){
        this._listElement.innerHTML = '';
        this.clearStoredFiles();
    },
    /**
     * delegate click event for cancel & retry links
     **/
    _bindCancelAndRetryEvents: function(){
        var self = this,
            list = this._listElement;

        this._disposeSupport.attach(list, 'click', function(e){
            e = e || window.event;
            var target = e.target || e.srcElement;

            if (qq(target).hasClass(self._classes.cancel) || qq(target).hasClass(self._classes.retry)){
                qq.preventDefault(e);

                var item = target.parentNode;
                while(item.qqFileId == undefined) {
                    item = target = target.parentNode;
                }

                if (qq(target).hasClass(self._classes.cancel)) {
                    self.cancel(item.qqFileId);
                }
                else {
                    qq(item).removeClass(self._classes.retryable);
                    self.retry(item.qqFileId);
                }
            }
        });
    },
    _formatProgress: function (uploadedSize, totalSize) {
        var message = this._options.text.formatProgress;
        function r(name, replacement) { message = message.replace(name, replacement); }

        r('{percent}', Math.round(uploadedSize / totalSize * 100));
        r('{total_size}', this._formatSize(totalSize));
        return message;
    },
    _controlFailureTextDisplay: function(item, response) {
        var mode, maxChars, responseProperty, failureReason, shortFailureReason;

        mode = this._options.failedUploadTextDisplay.mode;
        maxChars = this._options.failedUploadTextDisplay.maxChars;
        responseProperty = this._options.failedUploadTextDisplay.responseProperty;

        if (mode === 'custom') {
            failureReason = response[responseProperty];
            if (failureReason) {
                if (failureReason.length > maxChars) {
                    shortFailureReason = failureReason.substring(0, maxChars) + '...';
                }
            }
            else {
                failureReason = this._options.text.failUpload;
                this.log("'" + responseProperty + "' is not a valid property on the server response.", 'warn');
            }

            qq(this._find(item, 'statusText')).setText(shortFailureReason || failureReason);

            if (this._options.failedUploadTextDisplay.enableTooltip) {
                this._showTooltip(item, failureReason);
            }
        }
        else if (mode === 'default') {
            qq(this._find(item, 'statusText')).setText(this._options.text.failUpload);
        }
        else if (mode !== 'none') {
            this.log("failedUploadTextDisplay.mode value of '" + mode + "' is not valid", 'warn');
        }
    },
    //TODO turn this into a real tooltip, with click trigger (so it is usable on mobile devices).  See case #355 for details.
    _showTooltip: function(item, text) {
        item.title = text;
    },
    _showSpinner: function(item) {
        var spinnerEl = this._find(item, 'spinner');
        spinnerEl.style.display = "inline-block";
    },
    _showCancelLink: function(item) {
        if (!this._options.disableCancelForFormUploads || qq.isXhrUploadSupported()) {
            var cancelLink = this._find(item, 'cancel');
            cancelLink.style.display = 'inline';
        }
    },
    _error: function(code, fileName){
        var message = qq.FineUploaderBasic.prototype._error.apply(this, arguments);
        this._options.showMessage(message);
    }
});
/**
 * Class for uploading files, uploading itself is handled by child classes
 */
qq.UploadHandlerAbstract = function(o){
    // Default options, can be overridden by the user
    this._options = {
        debug: false,
        endpoint: '/upload.php',
        paramsInBody: false,
        // maximum number of concurrent uploads
        maxConnections: 999,
        log: function(str, level) {},
        onProgress: function(id, fileName, loaded, total){},
        onComplete: function(id, fileName, response, xhr){},
        onCancel: function(id, fileName){},
        onUpload: function(id, fileName, xhr){},
        onAutoRetry: function(id, fileName, response, xhr){}

    };
    qq.extend(this._options, o);

    this._queue = [];

    this.log = this._options.log;
};
qq.UploadHandlerAbstract.prototype = {
    /**
     * Adds file or file input to the queue
     * @returns id
     **/
    add: function(file){},
    /**
     * Sends the file identified by id
     */
    upload: function(id){
        var len = this._queue.push(id);

        // if too many active uploads, wait...
        if (len <= this._options.maxConnections){
            this._upload(id);
        }
    },
    retry: function(id) {
        var i = qq.indexOf(this._queue, id);
        if (i >= 0) {
            this._upload(id);
        }
        else {
            this.upload(id);
        }
    },
    /**
     * Cancels file upload by id
     */
    cancel: function(id){
        this.log('Cancelling ' + id);
        this._options.paramsStore.remove(id);
        this._cancel(id);
        this._dequeue(id);
    },
    /**
     * Cancells all uploads
     */
    cancelAll: function(){
        for (var i=0; i<this._queue.length; i++){
            this._cancel(this._queue[i]);
        }
        this._queue = [];
    },
    /**
     * Returns name of the file identified by id
     */
    getName: function(id){},
    /**
     * Returns size of the file identified by id
     */
    getSize: function(id){},
    /**
     * Returns id of files being uploaded or
     * waiting for their turn
     */
    getQueue: function(){
        return this._queue;
    },
    reset: function() {
        this.log('Resetting upload handler');
        this._queue = [];
    },
    /**
     * Actual upload method
     */
    _upload: function(id){},
    /**
     * Actual cancel method
     */
    _cancel: function(id){},
    /**
     * Removes element from queue, starts upload of next
     */
    _dequeue: function(id){
        var i = qq.indexOf(this._queue, id);
        this._queue.splice(i, 1);

        var max = this._options.maxConnections;

        if (this._queue.length >= max && i < max){
            var nextId = this._queue[max-1];
            this._upload(nextId);
        }
    },
    /**
     * Determine if the file exists.
     */
    isValid: function(id) {}
};
/**
 * Class for uploading files using form and iframe
 * @inherits qq.UploadHandlerAbstract
 */
qq.UploadHandlerForm = function(o){
    qq.UploadHandlerAbstract.apply(this, arguments);

    this._inputs = {};
    this._detach_load_events = {};
};
// @inherits qq.UploadHandlerAbstract
qq.extend(qq.UploadHandlerForm.prototype, qq.UploadHandlerAbstract.prototype);

qq.extend(qq.UploadHandlerForm.prototype, {
    add: function(fileInput){
        fileInput.setAttribute('name', this._options.inputName);
        var id = qq.getUniqueId();

        this._inputs[id] = fileInput;

        // remove file input from DOM
        if (fileInput.parentNode){
            qq(fileInput).remove();
        }

        return id;
    },
    getName: function(id){
        // get input value and remove path to normalize
        return this._inputs[id].value.replace(/.*(\/|\\)/, "");
    },
    isValid: function(id) {
        return this._inputs[id] !== undefined;
    },
    reset: function() {
        qq.UploadHandlerAbstract.prototype.reset.apply(this, arguments);
        this._inputs = {};
        this._detach_load_events = {};
    },
    _cancel: function(id){
        this._options.onCancel(id, this.getName(id));

        delete this._inputs[id];
        delete this._detach_load_events[id];

        var iframe = document.getElementById(id);
        if (iframe){
            // to cancel request set src to something else
            // we use src="javascript:false;" because it doesn't
            // trigger ie6 prompt on https
            iframe.setAttribute('src', 'javascript:false;');

            qq(iframe).remove();
        }
    },
    _upload: function(id){
        this._options.onUpload(id, this.getName(id), false);
        var input = this._inputs[id];

        if (!input){
            throw new Error('file with passed id was not added, or already uploaded or cancelled');
        }

        var fileName = this.getName(id);

        var iframe = this._createIframe(id);
        var form = this._createForm(iframe, this._options.paramsStore.getParams(id));
        form.appendChild(input);

        var self = this;
        this._attachLoadEvent(iframe, function(){
            self.log('iframe loaded');

            var response = self._getIframeContentJSON(iframe);

            // timeout added to fix busy state in FF3.6
            setTimeout(function(){
                self._detach_load_events[id]();
                delete self._detach_load_events[id];
                qq(iframe).remove();
            }, 1);

            if (!response.success) {
                if (self._options.onAutoRetry(id, fileName, response)) {
                    return;
                }
            }
            self._options.onComplete(id, fileName, response);
            self._dequeue(id);
        });

        this.log('Sending upload request for ' + id);
        form.submit();
        qq(form).remove();

        return id;
    },
    _attachLoadEvent: function(iframe, callback){
        var self = this;
        this._detach_load_events[iframe.id] = qq(iframe).attach('load', function(){
            self.log('Received response for ' + iframe.id);

            // when we remove iframe from dom
            // the request stops, but in IE load
            // event fires
            if (!iframe.parentNode){
                return;
            }

            try {
                // fixing Opera 10.53
                if (iframe.contentDocument &&
                    iframe.contentDocument.body &&
                    iframe.contentDocument.body.innerHTML == "false"){
                    // In Opera event is fired second time
                    // when body.innerHTML changed from false
                    // to server response approx. after 1 sec
                    // when we upload file with iframe
                    return;
                }
            }
            catch (error) {
                //IE may throw an "access is denied" error when attempting to access contentDocument on the iframe in some cases
                self.log('Error when attempting to access iframe during handling of upload response (' + error + ")", 'error');
            }

            callback();
        });
    },
    /**
     * Returns json object received by iframe from server.
     */
    _getIframeContentJSON: function(iframe){
        //IE may throw an "access is denied" error when attempting to access contentDocument on the iframe in some cases
        try {
            // iframe.contentWindow.document - for IE<7
            var doc = iframe.contentDocument ? iframe.contentDocument: iframe.contentWindow.document,
                response;

            var innerHTML = doc.body.innerHTML;
            this.log("converting iframe's innerHTML to JSON");
            this.log("innerHTML = " + innerHTML);
            //plain text response may be wrapped in <pre> tag
            if (innerHTML && innerHTML.match(/^<pre/i)) {
                innerHTML = doc.body.firstChild.firstChild.nodeValue;
            }
            response = eval("(" + innerHTML + ")");
        } catch(error){
            this.log('Error when attempting to parse form upload response (' + error + ")", 'error');
            response = {success: false};
        }

        return response;
    },
    /**
     * Creates iframe with unique name
     */
    _createIframe: function(id){
        // We can't use following code as the name attribute
        // won't be properly registered in IE6, and new window
        // on form submit will open
        // var iframe = document.createElement('iframe');
        // iframe.setAttribute('name', id);

        var iframe = qq.toElement('<iframe src="javascript:false;" name="' + id + '" />');
        // src="javascript:false;" removes ie6 prompt on https

        iframe.setAttribute('id', id);

        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        return iframe;
    },
    /**
     * Creates form, that will be submitted to iframe
     */
    _createForm: function(iframe, params){
        // We can't use the following code in IE6
        // var form = document.createElement('form');
        // form.setAttribute('method', 'post');
        // form.setAttribute('enctype', 'multipart/form-data');
        // Because in this case file won't be attached to request
        var protocol = this._options.demoMode ? "GET" : "POST",
            form = qq.toElement('<form method="' + protocol + '" enctype="multipart/form-data"></form>'),
            url = this._options.endpoint;

        if (!this._options.paramsInBody) {
            url = qq.obj2url(params, this._options.endpoint);
        }
        else {
            qq.obj2Inputs(params, form);
        }

        form.setAttribute('action', url);
        form.setAttribute('target', iframe.name);
        form.style.display = 'none';
        document.body.appendChild(form);

        return form;
    }
});
/**
 * Class for uploading files using xhr
 * @inherits qq.UploadHandlerAbstract
 */
qq.UploadHandlerXhr = function(o){
    qq.UploadHandlerAbstract.apply(this, arguments);

    this._files = [];
    this._xhrs = [];

    // current loaded size in bytes for each file
    this._loaded = [];
};

// @inherits qq.UploadHandlerAbstract
qq.extend(qq.UploadHandlerXhr.prototype, qq.UploadHandlerAbstract.prototype)

qq.extend(qq.UploadHandlerXhr.prototype, {
    /**
     * Adds file to the queue
     * Returns id to use with upload, cancel
     **/
    add: function(file){
        if (!(file instanceof File)){
            throw new Error('Passed obj in not a File (in qq.UploadHandlerXhr)');
        }

        return this._files.push(file) - 1;
    },
    getName: function(id){
        var file = this._files[id];
        // fix missing name in Safari 4
        //NOTE: fixed missing name firefox 11.0a2 file.fileName is actually undefined
        return (file.fileName !== null && file.fileName !== undefined) ? file.fileName : file.name;
    },
    getSize: function(id){
        var file = this._files[id];
        return file.fileSize != null ? file.fileSize : file.size;
    },
    /**
     * Returns uploaded bytes for file identified by id
     */
    getLoaded: function(id){
        return this._loaded[id] || 0;
    },
    isValid: function(id) {
        return this._files[id] !== undefined;
    },
    reset: function() {
        qq.UploadHandlerAbstract.prototype.reset.apply(this, arguments);
        this._files = [];
        this._xhrs = [];
        this._loaded = [];
    },
    /**
     * Sends the file identified by id to the server
     */
    _upload: function(id){
        var file = this._files[id],
            name = this.getName(id),
            size = this.getSize(id),
            self = this,
            url = this._options.endpoint,
            protocol = this._options.demoMode ? "GET" : "POST",
            xhr, formData, paramName, key, params;

        this._options.onUpload(id, this.getName(id), true);

        this._loaded[id] = 0;

        xhr = this._xhrs[id] = new XMLHttpRequest();

        xhr.upload.onprogress = function(e){
            if (e.lengthComputable){
                self._loaded[id] = e.loaded;
                self._options.onProgress(id, name, e.loaded, e.total);
            }
        };

        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4){
                self._onComplete(id, xhr);
            }
        };

        params = this._options.paramsStore.getParams(id);

        //build query string
        if (!this._options.paramsInBody) {
            params[this._options.inputName] = name;
            url = qq.obj2url(params, this._options.endpoint);
        }

        xhr.open(protocol, url, true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("X-File-Name", encodeURIComponent(name));
        xhr.setRequestHeader("Cache-Control", "no-cache");
        if (this._options.forceMultipart || this._options.paramsInBody) {
            formData = new FormData();

            if (this._options.paramsInBody) {
                qq.obj2FormData(params, formData);
            }

            formData.append(this._options.inputName, file);
            file = formData;
        } else {
            xhr.setRequestHeader("Content-Type", "application/octet-stream");
            //NOTE: return mime type in xhr works on chrome 16.0.9 firefox 11.0a2
            xhr.setRequestHeader("X-Mime-Type", file.type);
        }

        for (key in this._options.customHeaders){
            if (this._options.customHeaders.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, this._options.customHeaders[key]);
            }
        }

        this.log('Sending upload request for ' + id);
        xhr.send(file);
    },
    _onComplete: function(id, xhr){
        "use strict";
        // the request was aborted/cancelled
        if (!this._files[id]) { return; }

        var name = this.getName(id);
        var size = this.getSize(id);
        var response; //the parsed JSON response from the server, or the empty object if parsing failed.

        this._options.onProgress(id, name, size, size);

        this.log("xhr - server response received for " + id);
        this.log("responseText = " + xhr.responseText);

        try {
            if (typeof JSON.parse === "function") {
                response = JSON.parse(xhr.responseText);
            } else {
                response = eval("(" + xhr.responseText + ")");
            }
        } catch(error){
            this.log('Error when attempting to parse xhr response text (' + error + ')', 'error');
            response = {};
        }

        if (xhr.status !== 200 || !response.success){
            if (this._options.onAutoRetry(id, name, response, xhr)) {
                return;
            }
        }

        this._options.onComplete(id, name, response, xhr);

        this._xhrs[id] = null;
        this._dequeue(id);
    },
    _cancel: function(id){
        this._options.onCancel(id, this.getName(id));

        this._files[id] = null;

        if (this._xhrs[id]){
            this._xhrs[id].abort();
            this._xhrs[id] = null;
        }
    }
});
