Ink.createModule('Ink.UI.Upload', '1', [
    'Ink.Dom.Event_1',
    'Ink.Dom.Element_1',
    'Ink.Dom.Browser_1',
    'Ink.UI.Common_1'
], function(Event, Element, Browser, Common) {
    'use strict';

    var DirectoryReader = function(options) {
        this.init(options);
    };

    DirectoryReader.prototype = {
        init: function(options) {
            this._options = Ink.extendObj({
                entry:      undefined,
                maxDepth:   10
            }, options || {});

            try {
                this._read();
            } catch(e) {
                Ink.error(e);
            }
        },


        _read: function() {
            if(!this._options.entry) {
                Ink.error('You must specify the entry!');
                return;
            }

            try {
                this._readDirectories();
            } catch(e) {
                Ink.error(e);
            }
        },


        _readDirectories: function() {
            var entries         = [],
                running         = false,
                maxDepth        = 0;

            /* TODO return as tree because much better well */
            var _readEntries = Ink.bind(function(currentEntry) {
                var dir     = currentEntry.createReader();
                    running = true;

                dir.readEntries(Ink.bind(function(res) {
                    if(res.length > 0) {
                        for(var i = 0, len = res.length; i<len; i++) {
                            entries.push(res[i]);
                            if(!res[i].isDirectory) {
                                continue;
                            }
                            maxDepth = this.clearArray(res[i].fullPath.split('/'));
                            maxDepth.shift();
                            maxDepth = maxDepth.length;
                            if(maxDepth <= this._options.maxDepth) {
                                _readEntries(res[i]);
                            }
                        }
                        if(this._stopActivityTimeout) {
                            clearTimeout(this._stopActivityTimeout);
                        }
                        this._stopActivityTimeout = setTimeout(function() {
                            running = false;
                        }, 250);
                    }
                    if(!res.length) {
                        running = false;
                    }
                }, this), Ink.bind(function(err) {
                    this._options.readError(err, currentEntry);
                }, this));
            }, this);

            _readEntries(this._options.entry);

            var activity;
            var checkActivity = function() {
                if(running) {
                    return false;
                }
                clearInterval(activity);
                if(this._options.readComplete && typeof this._options.readComplete === 'function') {
                    this._options.readComplete(entries);
                }
                return true;
            };

            activity = setInterval(Ink.bind(checkActivity, this), 250);
        },


        clearArray: function(arr) {
            for(var i = arr.length - 1; i>=0; i--) {
                if(typeof(arr[i]) === 'undefined' || arr[i] === null || arr[i] === '') {
                    arr.splice(i, 1);
                }
            }
            return arr;
        }
    };

    var Queue = {
        lists:  [],
        items:  [],


        /**
         * Create new queue list
         * @function create
         * @public
         * @param {String} list name
         * @param {Function} function to iterate on items
         * @return {Object} list id
        */
        create: function(name) {
            var id;
                name = String(name);
            this.lists.push({name: name});
            id = this.lists.length - 1;
            return id;
        },


        getItems: function(parentId) {
            if(!parentId) {
                return this.items;
            }
            var items = [];
            for(var i = 0, len = this.items.length; i<len; i++) {
                if(this.items[i].parentId === parentId) {
                    items.push(this.items[i]);
                }
            }

            return items;
        },


        /**
         * Delete list
         * @function purge
         * @public
         * @param {String} List name
         * @return {Object} removed list
        */
        purge: function(id, keepList) {
            if(typeof(id) !== 'number' || isNaN(Number(id))) {
                return false;
            }
            try {
                for(var i = this.items.length; i>=0; i--) {
                    if(this.items[i] && id === this.items[i].parentId) {
                        this.remove(this.items[i].parentId, this.items[i].pid);
                    }
                }
                if(!keepList) {
                    this.lists.splice(id, 1);
                }
                return true;
            } catch(e) {
                Ink.error('Purge: invalid id');
                return false;
            }
        },


        /**
         * add an item to a list
         * @function add
         * @public
         * @param {String} name
         * @param {Object} item
         * @return {Number} pid
        */
        add: function(parentId, item, priority) {
            if(!this.lists[parentId]) {
                return false;
            }
            if(typeof(item) !== 'object') {
                item = String(item);
            }

            var pid = parseInt(Math.round(Math.random() * 100000) + "" + Math.round(Math.random() * 100000), 10);
            priority    = priority || 0;

            this.items.push({parentId: parentId, item: item, priority: priority || 0, pid: pid});
            return pid;
        },


        /**
         * View list
         * @function view
         * @public
         * @param {Number} list id
         * @param {Number} process id
         * @return {Object} item
        */
        view: function(parentId, pid) {
            var id = this._searchByPid(parentId, pid);
            if(id === false) {
                return false;
            }
            return this.items[id];
        },


        /**
         * Remove an item
         * @function remove
         * @public
         * @param {Object} item
         * @return {Object|Boolean} removed item or false if not found
        */
        remove: function(parentId, pid) {
            try {
                var id = this._searchByPid(parentId, pid);
                if(id === false) {
                    return false;
                }
                this.items.splice(id, 1);
                return true;
            } catch(e) {
                Ink.error('Remove: invalid id');
                return false;
            }
        },

        _searchByPid: function(parentId, pid) {
            if(!parentId && typeof(parentId) === 'boolean' || !pid) {
                return false;
            }

            parentId    = parseInt(parentId, 10);
            pid         = parseInt(pid, 10);

            if(isNaN(parentId) || isNaN(pid)) {
                return false;
            }

            for(var i = 0, len = this.items.length; i<len; i++) {
                if(this.items[i].parentId === parentId && this.items[i].pid === pid) {
                    return i;
                }
            }
            return false;
        }
    };

    var UI = function(Upload) {
        this.Upload = Upload;
        this.init();
    };

    UI.prototype = {
        init: function() {
            this._fileButton = this.Upload._options.fileButton;
            this._dropzone = this.Upload._options.dropzone;
            this._setDropEvent();
            this._setFileButton();
        },


        _setDropEvent: function() {
            var dropzones = this._dropzone;
            if (!dropzones) { return; }

            for(var i = 0, len = dropzones.length; i<len; i++) {
                dropzones[i].ondrop        = Ink.bindEvent(this.Upload._dropEventHandler, this.Upload);
                dropzones[i].ondragleave   = Ink.bindEvent(this._onDragLeave, this);
                dropzones[i].ondragend     = Ink.bindEvent(this._onDragEndEventHandler, this);
                dropzones[i].ondragdrop    = Ink.bindEvent(this._onDragEndEventHandler, this);
                dropzones[i].ondragenter   = Ink.bindEvent(this._onDragEnterHandler, this);
                dropzones[i].ondragover    = Ink.bindEvent(this._onDragOverHandler, this);
            }
        },


        _onDragEnterHandler: function(ev) {
            if(ev && ev.stopPropagation) {
                ev.stopPropagation();
            }
            if(ev && ev.preventDefault) {
                ev.preventDefault();
            }
            if(ev) {
                ev.returnValue = false;
            }

            this.Upload.publish('DragEnter', ev);
            return false;
        },


        _onDragOverHandler: function(ev) {
            if(!ev) {
                return false;
            }
            ev.preventDefault();
            ev.stopPropagation();
            ev.returnValue = false;
            return true;
        },


        _onDragLeave: function(ev) {
            return this.Upload.publish('DragLeave', ev);
        },


        _onDragEndEventHandler: function(ev) {
            return this.Upload.publish('DragEnd', ev);
        },


        _setFileButton: function() {
            var btns = this._fileButton;
            if (!btns) { return; }
            Event.observeMulti(btns, 'change', Ink.bindEvent(this._fileChangeHandler, this));
        },


        _fileChangeHandler: function(ev) {
            var btn = Event.element(ev);
            var files = btn.files;
            var form = Element.findUpwardsByTag(btn, 'form');

            if(!files || !window.FormData || !('withCredentials' in new XMLHttpRequest())) {
                form.parentNode.submit();
                return false;
            }
            this.Upload._addFilesToQueue(files);
            btn.value = "";
        }
    };






    var Upload = function(options) {
        this.Queue = Queue;
        this.init(options);
        this._events = {};
    };

    Upload.prototype = {
        //_events: {},
        
        /**
         * This component is used to enable HTML5 upload on forms easily. It
         * evens out differences between browsers which support HTML5 upload,
         * and supports chunked uploads and directory tree uploads.
         *
         * Choose a drop zone and/or a file input. When the user drops the file
         * on the drop zone element, or chooses it using the file input,
         * Ink.UI.Upload takes care of uploading it through AJAX POST.
         *
         * The name given to the file in the POST request's data is chosen
         * through the `fileFormName` option.
         *
         * On the server side, you will receive a POST with a Content-type of
         * `multipart/form-data` or `x-www-form/urlencoded` if `useChunks`
         * is `true`.
         *
         * @class Ink.UI.Upload_1
         * @constructor
         *
         * @param options {Object} Options hash, containing:
         * @param [options.dropzone] {Element} Element where the user can drop files onto.
         * @param [options.fileButton] {Element} An `input[type="file"]` for the user to choose a file using a native dialog.
         * @param [options.fileFormName='Ink_Filelist'] The name of the file in the POST request.
         * @param [options.endpoint=window.location] The URL where we're POSTing the files to. Defaults to the current location, like a HTML form.
         * @param [options.maxFileSize] Maximum file size in bytes. Defaults to 300mb.
         * @param [INVALID_FILE_NAME] A regular expression to invalidate file names. For example, set this to `/\.png$/` if you don't want files with the ".png" extension. Remember that file extensions are just hints!
         * @param [options.extraData] Add more data to your POST request. Each key in this hash gets added to the form data sent to the server.
         * TODO chunk options, also write a bit above about chunking and the serverside of chunking.
         * TODO directory options, also write a bit above about directories and the server end of directories.
         */
        init: function(options) {
            if (typeof options === 'string') {
                options = Element.data(Common.elOrSelector(options, '1st argument'));
            }
            this._options = Ink.extendObj({
                dropzone:           undefined,
                fileButton:         undefined,
                fileFormName:       'Ink_Filelist',  // TODO default to fileButton's [name] if available.
                endpoint:           '',
                maxFilesize:        300 << 20, //300mb
                INVALID_FILE_NAME:  undefined,
                extraData:          {},
                // Chunks
                useChunks:          false,
                chunkSize:          4194304,  // 4MB
                minSizeToUseChunks: 20971520, // 20mb
                endpointChunk:      '',  // Where to send chunk data.
                endpointChunkCommit:'',  // Where to send the "chunk transaction" commit.
                // Directory trees
                foldersEnabled:     false,
                directoryMaxDepth:  10
            }, options || {});

            this._queueId           = Queue.create('Ink_UPLOAD');
            this._queueRunning      = false;
            this._folders           = {};


            if(this._options.dropzone) {
                this._options.dropzone =
                    Common.elsOrSelector(this._options.dropzone, 'Ink.UI.Upload - dropzone');
            }

            if(this._options.fileButton) {
                this._options.fileButton =
                    Common.elsOrSelector(this._options.fileButton, 'Ink.UI.Upload - fileButton');
            }

            if(!this._options.dropzone && !this._options.fileButton) {
                throw new TypeError(
                    'Ink.UI.Upload: Specify a fileButton or a Dropzone!');
            }

            new UI(this);
        },


        _supportChunks: function(size) {
            return this._options.useChunks &&
                    'Blob' in window &&
                    (new Blob()).slice &&
                    size > this._options.minSizeToUseChunks;
        },


        _dropEventHandler: function(ev) {
            Event.stop(ev);

            this.publish('DropComplete', ev.dataTransfer);

            var data = ev.dataTransfer;

            if(!data || !data.files || !data.files.length) {
                return false;
            }

            this._files = data.files;
            this._files = Array.prototype.slice.call(this._files || [], 0);

            // check if webkitGetAsEntry exists on first item
            if(data.items && data.items[0] && data.items[0].webkitGetAsEntry) {
                if(!this._options.foldersEnabled) {
                    return setTimeout(Ink.bind(this._addFilesToQueue, this, this._files), 0);
                }
                var entry, folders = [];
                for(var i = ev.dataTransfer.items.length-1; i>=0; i--) {
                    entry = ev.dataTransfer.items[i].webkitGetAsEntry();
                    if(entry && entry.isDirectory) {
                        folders.push(entry);
                        this._files[i].isDirectory = true;
                        this._files.splice(i, 1);
                    }
                }
                // starting callback hell
                this._addFolderToQueue(folders, Ink.bind(function() {
                    setTimeout(Ink.bind(this._addFilesToQueue, this, this._files), 0);
                }, this));
            } else {
                setTimeout(Ink.bind(this._addFilesToQueue, this, this._files), 0);
            }

            return true;
        },


        _addFolderToQueue: function(folders, cb) {
            var files = [], invalidFolders = {};

            if(!folders || !folders.length) {
                cb();
                return files;
            }

            var getFiles = function(entries) {
                var files = [];
                for(var i = 0, len = entries.length; i<len; i++) {
                    if(entries[i].isFile) {
                        files.push(entries[i]);
                    }
                }
                return files;
            };

            var convertToFile = function(cb, index) {
                var fullPath;
                index = index || 0;
                if(!this._files[index]) {
                    cb();
                    return files;
                }
                if(this._files[index].constructor.name.toLowerCase() !== 'fileentry') {
                    return convertToFile.apply(this, [cb, ++index]);
                }
                this._files[index].file(Ink.bind(function(res) {
                    fullPath = this._files[index].fullPath; // bug
                    this._files[index]              = res;
                    this._files[index].hasParent    = true;

                    // if browser don't have it natively, set it
                    if(!this._files[index].fullPath) {
                        this._files[index].fullPath = fullPath;
                    }
                    convertToFile.apply(this, [cb, ++index]);
                }, this), Ink.bind(function() {
                    this._files.splice(index, 1);
                    convertToFile.apply(this, [cb, index]);
                }, this));
            };

            var getSubDirs = Ink.bind(function(index) {
                if(!folders[index]) {
                    this._files = this._files.concat(files);
                    convertToFile.call(this, cb);
                    return false;
                }

                new DirectoryReader({
                    entry:      folders[index],
                    maxDepth:   this._options.directoryMaxDepth,
                    readComplete: Ink.bind(function(entries) {
                        files = files.concat(getFiles(entries));
                        // adding root dirs
                        if(!folders[index] || folders[index].fullPath in this._folders) {
                            return;
                        }

                        this._folders[folders[index].fullPath] = {
                            items:      entries,
                            files:      files,
                            length:     entries.length,
                            created:    false,
                            root:       true
                        };

                        // adding sub dirs
                        for(var i = 0, len = entries.length; i<len; i++) {
                            if(entries[i].isFile) {
                                continue;
                            }
                            if(entries[i].fullPath in invalidFolders) {
                                delete invalidFolders[entries[i].fullPath];
                                continue;
                            }
                            this._folders[entries[i].fullPath] = {
                                created:    false,
                                root:       false
                            };
                        }
                        getSubDirs(++index);
                    }, this),
                    readError: Ink.bind(function(err, dir) {
                        invalidFolders[dir.fullPath] = {};
                        invalidFolders[dir.fullPath].error = err;
                    }, this)
                });
            }, this);

            getSubDirs(0);
            return files;
        },


        _addFilesToQueue: function(files) {
            var file, fileID, o;
            for(var i = 0, len = files.length; i<len; i++) {
                file = files[i];

                if(!file.isDirectory) {
                    // dirty hack to allow 0B files avoiding folders on GECKO
                    if(file === null || (!file.type && file.size % 4096 === 0 && (!Browser.CHROME || !this._options.foldersEnabled))) {
                        this.publish('InvalidFile', file, 'size');
                        continue;
                    }
                }

                if(file.size > this._options.maxFilesize) {
                    this.publish('MaxSizeFailure', file, this._options.maxFilesize);
                    continue;
                }

                fileID = parseInt(Math.round(Math.random() * 100000) + "" + Math.round(Math.random() * 100000), 10);
                o = { id: i, data: file, fileID: fileID, directory: file.isDirectory };
                Queue.add(this._queueId, o);

                this.publish('FileAddedToQueue', o);
            }
            this._processQueue(true);
            this._files = [];
        },


        _processQueue: function(internalUpload) {
            if(this._queueRunning) {
                return false;
            }

            this.running = 0;
            var max = 1, i = 0, items,
                queueLen = Queue.items.length;
            this._queueRunning = true;

            this.interval = setInterval(Ink.bind(function() {
                if(Queue.items.length === i && this.running === 0) {
                    Queue.purge(this._queueId, true);
                    this._queueRunning = false;
                    clearInterval(this.interval);
                    this.publish('QueueEnd', this._queueId, queueLen);
                }

                items = Queue.getItems(this._queueId);

                if(this.running < max && items[i]) {
                    if(!items[i].canceled) {
                        _doRequest.call(this, items[i].pid, items[i].item.data, items[i].item.fileID, items[i].item.directory, internalUpload);
                        this.running++;
                        i++;
                    } else {
                        var j = i;
                        while(items[j] && items[j].canceled) {
                            i++;
                            j++;
                        }
                    }
                    return true;
                }
                return false;
            }, this), 100);


            var _doRequest = function(pid, data, fileID, directory, internalUpload) {
                var o = {
                    file:   data,
                    fileID: fileID,
                    cb: Ink.bind(function() {
                        this.running--;
                    }, this)
                };
                if(internalUpload) {
                    if(directory) {
                        // do magic
                        o.cb();
                    } else {
                        this._upload(o);
                    }
                }
            };

            return true;
        },


        _upload: function(o) {
            var file = o.file,
                xhr = new XMLHttpRequest(),
                fileID = o.fileID;

            this.publish('BeforeUpload', file, this._options.extraData, fileID, xhr, this._supportChunks(file.size));

            var forceAbort = function(showError) {
                if(o.cb && typeof(o.cb === 'function')) {
                    o.cb();
                }

                this.publish('OnProgress', {
                    length: file.size,
                    lengthComputable: true,
                    loaded: file.size,
                    total: file.size
                }, file, fileID);
                this.publish('EndUpload', file, fileID, (showError ? { error: true } : true));
                this.publish('InvalidFile', file, 'name');
                xhr.abort();
            };

            if(this._options.INVALID_FILE_NAME && this._options.INVALID_FILE_NAME instanceof RegExp) {
                if(this._options.INVALID_FILE_NAME.test(o.file.name)) {
                    forceAbort.call(this);
                    return;
                }
            }

            // If file was renamed, abort it
            // FU OPERA: Opera always return lastModified date as null
            if(!file.lastModifiedDate && !Ink.Dom.Browser.OPERA) {
                forceAbort.call(this, true);
                return;
            }

            xhr.upload.onprogress = Ink.bind(this.publish, this, 'OnProgress', file, fileID);

            var endpoint, method;
            if(this._supportChunks(file.size)) {
                if(file.size <= file.chunk_offset) {
                    endpoint = this._options.endpointChunkCommit;
                    method = 'POST';
                } else {
                    endpoint = this._options.endpointChunk;
                    if(file.chunk_upload_id) {
                        endpoint += '?upload_id=' + file.chunk_upload_id;
                    }
                    if(file.chunk_offset) {
                        endpoint += '&offset=' + file.chunk_offset;
                    }
                    method = 'PUT';
                }
            } else {
                endpoint = this._options.endpoint;
                method = 'POST';
            }

            xhr.open(method, endpoint, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader("x-requested-with", "XMLHttpRequest");
            if(this._supportChunks(file.size)) {
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            }

            var fd = new FormData(),
                blob;

            if("Blob" in window && typeof Blob === 'function') {
                blob = new Blob([file], { type: file.type });
                if(this._supportChunks(file.size)) {
                    file.chunk_offset = file.chunk_offset || 0;
                    blob = blob.slice(file.chunk_offset, file.chunk_offset + this._options.chunkSize);
                } else {
                    fd.append(this._options.fileFormName, blob, file.name);
                }
            } else {
                fd.append(this._options.fileFormName, file);
            }

            if(!this._supportChunks(file.size)) {
                for(var k in this._options.extraData) {
                    if(this._options.extraData.hasOwnProperty(k)) {
                        fd.append(k, this._options.extraData[k]);
                    }
                }
            } else {
                fd.append('upload_id', file.chunk_upload_id);
                fd.append('path', file.upload_path);
            }

            if(!file.hasParent) {
                if(!this._supportChunks(file.size)) {
                    xhr.send(fd);
                } else {
                    if(file.size <= file.chunk_offset) {
                        xhr.send('upload_id=' + file.chunk_upload_id + '&path=' + file.upload_path + '/' + file.name);
                    } else {
                        xhr.send(blob);
                    }
                }
            } else {
                this.publish('cbCreateFolder', file.parentID, file.fullPath, this._options.extraData, this._folders, file.rootPath, Ink.bind(function() {
                    if(!this._supportChunks(file.size)) {
                        xhr.send(fd);
                    } else {
                        if(file.size <= file.chunk_offset) {
                            xhr.send('upload_id=' + file.chunk_upload_id + '&path=' + file.upload_path + '/' + file.name);
                        } else {
                            xhr.send(blob);
                        }
                    }
                }, this));
            }


            xhr.onload = Ink.bindEvent(function() {
                /* jshint boss:true */
                if(this._supportChunks(file.size) && file.size > file.chunk_offset) {
                    if(xhr.response) {
                        var response = JSON.parse(xhr.response);

                        // check expected offset
                        var invalidOffset = file.chunk_offset && response.offset !== (file.chunk_offset + this._options.chunkSize) && file.size !== response.offset;
                        if(invalidOffset) {
                            if(o.cb) {
                                o.cb();
                            }
                            this.publish('ErrorUpload', file, fileID);
                        } else {
                            file.chunk_upload_id = response.upload_id;
                            file.chunk_offset = response.offset;
                            file.chunk_expires = response.expires;
                            this._upload(o);
                        }
                    } else {
                        if(o.cb) {
                            o.cb();
                        }
                        this.publish('ErrorUpload', file, fileID);
                    }
                    return (xhr = null);
                }

                if(o.cb) {
                    o.cb();
                }

                if(xhr.responseText && xhr['status'] < 400) {
                    this.publish('EndUpload', file, fileID, xhr.responseText);
                } else {
                    this.publish('ErrorUpload', file, fileID);
                }
                return (xhr = null);
            }, this);


            xhr.onerror = Ink.bindEvent(function() {
                if(o.cb) {
                    o.cb();
                }
                this.publish('ErrorUpload', file, fileID);
            }, this);

            xhr.onabort = Ink.bindEvent(function() {
                if(o.cb) {
                    o.cb();
                }
                this.publish('AbortUpload', file, fileID, {
                    abortAll: Ink.bind(this.abortAll, this),
                    abortOne: Ink.bind(this.abortOne, this)
                });
            }, this);
        },


        abortAll: function() {
            if(!this._queueRunning) {
                return false;
            }
            clearInterval(this.interval);
            this._queueRunning = false;
            Queue.purge(this._queueId, true);
            return true;
        },

        abortOne: function(id, cb) {
            var items = Queue.getItems(0),
                o;
            for(var i = 0, len = items.length; i<len; i++) {
                if(items[i].item.fileID === id) {
                    o = {
                        id:         items[i].item.fileID,
                        name:       items[i].item.data.name,
                        size:       items[i].item.data.size,
                        hasParent:  items[i].item.data.hasParent
                    };
                    Queue.remove(0, items[i].pid);
                    if(cb) {
                        cb(o);
                    }
                    return true;
                }
            }
            return false;
        },


        subscribe: function(eventName, fn) {
            if(!this._events[eventName]) {
                this._events[eventName] = [];
            }
            this._events[eventName].push(fn);
            return this._events[eventName];
        },


        publish: function(eventName) {
            var events = this._events[eventName],
                args = Array.prototype.slice.call(arguments || [], 0);

            if(!events) {
                return;
            }

            for(var i = 0, len = events.length; i<len; i++) {
                try {
                    events[i].apply(this, args.splice(1, args.length));
                } catch(err) {
                    Ink.error(eventName + ": " + err);
                }
            }
        }
    };

    return Upload;
});
