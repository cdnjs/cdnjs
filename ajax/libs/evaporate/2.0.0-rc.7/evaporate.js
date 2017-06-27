/*Copyright (c) 2016, TT Labs, Inc.
 All rights reserved.

 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

 Neither the name of the TT Labs, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/


/***************************************************************************************************
 *                                                                                                 *
 *  version 2.0.0-rc.7                                                                             *
 *                                                                                                 *
 ***************************************************************************************************/

(function () {
    "use strict";

    var FAR_FUTURE = new Date('2060-10-22'),
        HOURS_AGO,
        PENDING = 0, EVAPORATING = 2, COMPLETE = 3, PAUSED = 4, CANCELED = 5, ERROR = 10, ABORTED = 20, PAUSING = 30,
        PAUSED_STATUSES = [PAUSED, PAUSING],
        ETAG_OF_0_LENGTH_BLOB = '"d41d8cd98f00b204e9800998ecf8427e"',
        PARTS_MONITOR_INTERVAL_MS = 2 * 60 * 1000,
        IMMUTABLE_OPTIONS = [
            'maxConcurrentParts',
            'logging',
            'cloudfront',
            'aws_url',
            'encodeFilename',
            'computeContentMd5',
            'allowS3ExistenceOptimization',
            'onlyRetryForSameFileName',
            'timeUrl',
            'cryptoMd5Method',
            'cryptoHexEncodedHash256',
            'aws_key',
            'awsRegion',
            'awsSignatureVersion',
            'evaporateChanged'
        ],
        l;

    var Evaporate = function (config) {
        this.config = extend({
            bucket: null,
            logging: true,
            maxConcurrentParts: 5,
            partSize: 6 * 1024 * 1024,
            retryBackoffPower: 2,
            maxRetryBackoffSecs: 300,
            progressIntervalMS: 1000,
            cloudfront: false,
            s3Acceleration: false,
            encodeFilename: true,
            computeContentMd5: false,
            allowS3ExistenceOptimization: false,
            onlyRetryForSameFileName: false,
            timeUrl: null,
            cryptoMd5Method: null,
            cryptoHexEncodedHash256: null,
            aws_key: null,
            awsRegion: 'us-east-1',
            awsSignatureVersion: '4',
            s3FileCacheHoursAgo: null, // Must be a whole number of hours. Will be interpreted as negative (hours in the past).
            signParams: {},
            signHeaders: {},
            customAuthMethod: undefined,
            maxFileSize: null,
            signResponseHandler: null,
            xhrWithCredentials: false,
            // undocumented, experimental
            localTimeOffset: undefined,
            evaporateChanged: function () {},
            abortCompletionThrottlingMs: 1000
        }, config);

        if (typeof window !== 'undefined' && window.console) {
            l = window.console;
            l.d = l.log;
            l.w = window.console.warn ? l.warn : l.d;
            l.e = window.console.error ? l.error : l.d;
        }

        this._instantiationError = this.validateEvaporateOptions();
        if (typeof this._instantiationError === 'string') {
            this.supported = false;
            return;
        } else {
            delete this._instantiationError;
        }

        if (!this.config.logging) {
            // Reset the logger to be a no_op
            l = noOpLogger();
        }

        var _d = new Date();
        HOURS_AGO = new Date(_d.setHours(_d.getHours() - (this.config.s3FileCacheHoursAgo || -100)));
        if (typeof config.localTimeOffset === 'number') {
            this.localTimeOffset = config.localTimeOffset;
        } else {
            var self = this;
            Evaporate.getLocalTimeOffset(this.config)
                .then(function (offset) {
                    self.localTimeOffset = offset;
                });
        }
        this.pendingFiles = {};
        this.queuedFiles = [];
        this.filesInProcess = [];
    };
    Evaporate.create = function (config) {
        var evapConfig = Object.assign({}, config);
        return Evaporate.getLocalTimeOffset(evapConfig)
                .then(function (offset) {
                    evapConfig.localTimeOffset = offset;
                    return new Promise(function (resolve, reject) {
                        var e = new Evaporate(evapConfig);
                        if (e.supported === true) {
                            resolve(e);
                        } else {
                            reject(e._instantiationError);
                        }
                    });
                });
    };
    Evaporate.getLocalTimeOffset = function (config) {
        return new Promise(function (resolve, reject) {
            if (typeof config.localTimeOffset === 'number') {
                return resolve(config.localTimeOffset);
            }
            if (config.timeUrl) {
                var xhr = new XMLHttpRequest();

                xhr.open("GET", config.timeUrl + '?requestTime=' + new Date().getTime());
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            var server_date = new Date(Date.parse(xhr.responseText)),
                                now = new Date();
                            resolve(server_date - now);
                        }
                    }
                };

                xhr.onerror = function (xhr) {
                    l.e('xhr error timeUrl', xhr);
                    reject('Fetching offset time failed with status: ' + xhr.status);
                };
                xhr.send();
            } else {
                resolve(0);
            }
        })
        .then(function (offset) {
            l.d('localTimeOffset is', offset, 'ms');
            return new Promise(function (resolve) {
                resolve(offset);
            });
        });
     };
    Evaporate.prototype.config = {};
    Evaporate.prototype.localTimeOffset = 0;
    Evaporate.prototype.supported = false;
    Evaporate.prototype._instantiationError = undefined;
    Evaporate.prototype.evaporatingCount = 0;
    Evaporate.prototype.pendingFiles = {};
    Evaporate.prototype.filesInProcess = [];
    Evaporate.prototype.queuedFiles = [];
    Evaporate.prototype.startNextFile = function (reason) {
        if (!this.queuedFiles.length ||
            this.evaporatingCount >= this.config.maxConcurrentParts) { return; }
        var fileUpload = this.queuedFiles.shift();
        if (fileUpload.status === PENDING) {
            l.d('Starting', decodeURIComponent(fileUpload.name), 'reason:', reason);
            this.evaporatingCnt(+1);
            fileUpload.start();
        } else {
            // Add the file back to the stack, it's not ready
            l.d('Requeued', decodeURIComponent(fileUpload.name), 'status:', fileUpload.status, 'reason:', reason);
            this.queuedFiles.push(fileUpload);
        }
    };
    Evaporate.prototype.fileCleanup = function (fileUpload) {
        if (removeAtIndex(this.filesInProcess, fileUpload)) {
            this.evaporatingCnt(-1);
        }
        fileUpload.done();
        this.consumeRemainingSlots();
    };
    Evaporate.prototype.queueFile = function (fileUpload) {
        this.filesInProcess.push(fileUpload);
        this.queuedFiles.push(fileUpload);
        if (this.filesInProcess.length === 1) {
            this.startNextFile('first file');
        }
    };
    Evaporate.prototype.add = function (file,  pConfig) {
        var self = this,
            fileConfig;
        return new Promise(function (resolve, reject) {
            var c = extend(pConfig, {});

            IMMUTABLE_OPTIONS.forEach(function (a) { delete c[a]; });

            fileConfig = extend(self.config, c);

            if (typeof file === 'undefined' || typeof file.file === 'undefined') {
                return reject('Missing file');
            }
            if (fileConfig.maxFileSize && file.file.size > fileConfig.maxFileSize) {
                return reject('File size too large. Maximum size allowed is ' + fileConfig.maxFileSize);
            }
            if (typeof file.name === 'undefined') {
                return reject('Missing attribute: name');
            }

            if (fileConfig.encodeFilename) {
                // correctly encode to an S3 object name, considering '/' and ' '
                file.name = s3EncodedObjectName(file.name);
            }

            var fileUpload = new FileUpload(extend({
                started: function () {},
                progress: function () {},
                complete: function () {},
                cancelled: function () {},
                paused: function () {},
                resumed: function () {},
                pausing: function () {},
                nameChanged: function () {},
                info: function () {},
                warn: function () {},
                error: function () {},
                beforeSigner: undefined,
                xAmzHeadersAtInitiate: {},
                notSignedHeadersAtInitiate: {},
                xAmzHeadersCommon: null,
                xAmzHeadersAtUpload: {},
                xAmzHeadersAtComplete: {}
            }, file, {
                status: PENDING,
                priority: 0,
                loadedBytes: 0,
                sizeBytes: file.file.size,
                eTag: ''
            }), fileConfig, self),
                fileKey = fileUpload.id;

            self.pendingFiles[fileKey] = fileUpload;

            self.queueFile(fileUpload);

            // Resolve or reject the Add promise based on how the fileUpload completes
            fileUpload.deferredCompletion.promise
                .then(
                    function () {
                        self.fileCleanup(fileUpload);
                        resolve(decodeURIComponent(fileUpload.name));
                    },
                    function (reason) {
                        self.fileCleanup(fileUpload);
                        reject(reason);
                    }
                );
        })
    };
    Evaporate.prototype.cancel = function (id) {
        return typeof id === 'undefined' ? this._cancelAll() : this._cancelOne(id);
    };
    Evaporate.prototype._cancelAll = function () {
        l.d('Canceling all file uploads');
        var promises = [];
        for (var key in this.pendingFiles) {
            if (this.pendingFiles.hasOwnProperty(key)) {
                var file = this.pendingFiles[key];
                if ([PENDING, EVAPORATING, ERROR].indexOf(file.status) > -1) {
                    promises.push(file.stop());
                }
            }
        }
        if (!promises.length) {
            promises.push(Promise.reject('No files to cancel.'));
        }
        return Promise.all(promises);
    };
    Evaporate.prototype._cancelOne = function (id) {
        var promise = [];
        if (this.pendingFiles[id]) {
            promise.push(this.pendingFiles[id].stop());
        } else {
            promise.push(Promise.reject('File does not exist'));
        }
        return Promise.all(promise);
    };
    Evaporate.prototype.pause = function (id, options) {
        options = options || {};
        var force = typeof options.force === 'undefined' ? false : options.force;
        return typeof id === 'undefined' ? this._pauseAll(force) : this._pauseOne(id, force);
    };
    Evaporate.prototype._pauseAll = function (force) {
        l.d('Pausing all file uploads');
        var promises = [];
        for (var key in this.pendingFiles) {
            if (this.pendingFiles.hasOwnProperty(key)) {
                var file = this.pendingFiles[key];
                if ([PENDING, EVAPORATING, ERROR].indexOf(file.status) > -1) {
                    promises.push(file.pause(force));
                    removeAtIndex(this.filesInProcess, file);
                    removeAtIndex(this.queuedFiles, file);
                }
            }
        }
        return Promise.all(promises);
    };
    Evaporate.prototype._pauseOne = function (id, force) {
        var promises = [],
            file = this.pendingFiles[id];
        if (typeof file === 'undefined') {
            promises.push(Promise.reject('Cannot pause a file that has not been added.'));
        } else if (file.status === PAUSED) {
            promises.push(Promise.reject('Cannot pause a file that is already paused.'));
        }
        if (!promises.length) {
            promises.push(file.pause(force));
            removeAtIndex(this.filesInProcess, file);
            removeAtIndex(this.queuedFiles, file);
        }
        return Promise.all(promises);
    };
    Evaporate.prototype.resume = function (id) {
        return typeof id === 'undefined' ? this._resumeAll() : this._resumeOne(id);
    };
    Evaporate.prototype._resumeAll = function () {
        l.d('Resuming all file uploads');
        for (var key in this.pendingFiles) {
            if (this.pendingFiles.hasOwnProperty(key)) {
                var file = this.pendingFiles[key];
                if (PAUSED_STATUSES.indexOf(file.status) > -1)  {
                    this.resumeFile(file);
                }
            }
        }
        return Promise.resolve();
    };
    Evaporate.prototype._resumeOne = function (id) {
        var file = this.pendingFiles[id],
            promises = [];
        if (typeof file === 'undefined') {
            promises.push(Promise.reject('Cannot pause a file that does not exist.'));
        } else if (PAUSED_STATUSES.indexOf(file.status) === -1) {
            promises.push(Promise.reject('Cannot resume a file that has not been paused.'));
        } else {
            this.resumeFile(file);
        }
        return Promise.all(promises);
    };
    Evaporate.prototype.resumeFile = function (fileUpload) {
        fileUpload.resume();
        this.queueFile(fileUpload);
    };
    Evaporate.prototype.forceRetry = function () {};
    Evaporate.prototype.consumeRemainingSlots = function () {
        var avail = this.config.maxConcurrentParts - this.evaporatingCount;
        if (!avail) { return; }
        for (var i = 0; i < this.filesInProcess.length; i++) {
            var file = this.filesInProcess[i];
            var consumed = file.consumeSlots();
            if (consumed < 0) { continue; }
            avail -= consumed;
            if (!avail) { return; }
        }
    };
    Evaporate.prototype.validateEvaporateOptions = function () {
        this.supported = !(
        typeof File === 'undefined' ||
        typeof Blob === 'undefined' ||
        typeof Promise === 'undefined' ||
        typeof (
        Blob.prototype.webkitSlice ||
        Blob.prototype.mozSlice ||
        Blob.prototype.slice) === 'undefined');

        if (!this.config.signerUrl && typeof this.config.customAuthMethod !== 'function') {
            return "Option signerUrl is required unless customAuthMethod is present.";
        }

        if (!this.config.bucket) {
            return "The AWS 'bucket' option must be present.";
        }

        if (!this.supported) {
            return 'The browser does not support the necessary features of File and Blob [webkitSlice || mozSlice || slice]';
        }

        if (this.config.computeContentMd5) {
            this.supported = typeof FileReader.prototype.readAsArrayBuffer !== 'undefined';
            if (!this.supported) {
                return 'The browser\'s FileReader object does not support readAsArrayBuffer';
            }

            if (typeof this.config.cryptoMd5Method !== 'function') {
                return 'Option computeContentMd5 has been set but cryptoMd5Method is not defined.'
            }

            if (this.config.awsSignatureVersion === '4') {
                if (typeof this.config.cryptoHexEncodedHash256 !== 'function') {
                    return 'Option awsSignatureVersion is 4 but cryptoHexEncodedHash256 is not defined.';
                }
            }
        } else if (this.config.awsSignatureVersion === '4') {
            return 'Option awsSignatureVersion is 4 but computeContentMd5 is not enabled.';
        }
        return true;
    };
    Evaporate.prototype.evaporatingCnt = function (incr) {
        this.evaporatingCount = Math.max(0, this.evaporatingCount + incr);
        this.config.evaporateChanged(this, this.evaporatingCount);
    };


    function FileUpload(file, con, evaporate) {
        this.fileTotalBytesUploaded = 0;
        this.s3Parts = [];
        this.partsOnS3 = [];
        this.partsInProcess = [];
        this.partsToUpload = [];
        this.numParts = -1;
        this.con = con;
        this.evaporate = evaporate;
        this.localTimeOffset = evaporate.localTimeOffset;
        this.deferredCompletion = defer();

        extend(this, file);

        this.id = decodeURIComponent(this.con.bucket + '/' + this.name);

        this.signParams = con.signParams;
    }
    FileUpload.prototype.con = undefined;
    FileUpload.prototype.evaporate = undefined;
    FileUpload.prototype.localTimeOffset = 0;
    FileUpload.prototype.id = undefined;
    FileUpload.prototype.status = PENDING;
    FileUpload.prototype.numParts = -1;
    FileUpload.prototype.fileTotalBytesUploaded = 0;
    FileUpload.prototype.partsInProcess = [];
    FileUpload.prototype.partsToUpload = [];
    FileUpload.prototype.s3Parts = [];
    FileUpload.prototype.partsOnS3 = [];
    FileUpload.prototype.deferredCompletion = undefined;
    FileUpload.prototype.abortedByUser = false;

    // Progress and Stats
    FileUpload.prototype.progressInterval = undefined;
    FileUpload.prototype.startTime = undefined;
    FileUpload.prototype.loaded = 0;
    FileUpload.prototype.totalUpoaded = 0;
    FileUpload.prototype.updateLoaded = function (loadedNow) {
        this.loaded += loadedNow;
        this.fileTotalBytesUploaded += loadedNow;
    };
    FileUpload.prototype.progessStats = function () {
        // Adapted from https://github.com/fkjaekel
        // https://github.com/TTLabs/EvaporateJS/issues/13
        if (this.fileTotalBytesUploaded === 0) {
            return {};
        }

        this.totalUpoaded += this.loaded;
        var delta = (new Date() - this.startTime) / 1000,
            avgSpeed = this.totalUpoaded / delta,
            stats = {
                speed: avgSpeed,
                readableSpeed: readableFileSize(avgSpeed),
                loaded: this.loaded
            },
            remainingSize = this.sizeBytes - this.fileTotalBytesUploaded;

        if (avgSpeed > 0) {
            stats.secondsLeft = Math.round(remainingSize / avgSpeed);
        }
        return stats;
    };
    FileUpload.prototype.onProgress = function () {
        if ([CANCELED, ABORTED, PAUSED].indexOf(this.status) === -1) {
            this.progress(this.fileTotalBytesUploaded / this.sizeBytes, this.progessStats());
            this.loaded = 0;
        }
    };
    FileUpload.prototype.startMonitor = function () {
        clearInterval(this.progressInterval);
        this.startTime = new Date();
        this.loaded = 0;
        this.totalUpoaded = 0;
        this.onProgress();
        this.progressInterval = setInterval(this.onProgress.bind(this), this.con.progressIntervalMS);
    };
    FileUpload.prototype.stopMonitor = function () {
        clearInterval(this.progressInterval);
     };

    // Evaporate proxies
    FileUpload.prototype.startNextFile = function (reason) {
    this.evaporate.startNextFile(reason);
  };
    FileUpload.prototype.evaporatingCnt = function (incr) {
    this.evaporate.evaporatingCnt(incr);
  };
    FileUpload.prototype.consumeRemainingSlots = function () {
    this.evaporate.consumeRemainingSlots();
  };
    FileUpload.prototype.getRemainingSlots = function () {
        var evapCount = this.evaporate.evaporatingCount;
        if (!this.partsInProcess.length && evapCount > 0) {
            // we can use our file slot
            evapCount -= 1;
        }
        return this.con.maxConcurrentParts - evapCount;
    };

    FileUpload.prototype.lastPartSatisfied = Promise.resolve('onStart');

    FileUpload.prototype.start = function () {
        this.status = EVAPORATING;
        this.startMonitor();
        this.started(this.id);

        if (this.uploadId) {
          l.d('resuming FileUpload ', this.id);
          return this.consumeSlots();
        }

        var awsKey = this.name;

        this.getUnfinishedFileUpload();

        var existenceOptimized = this.con.computeContentMd5 &&
              this.con.allowS3ExistenceOptimization &&
              typeof this.firstMd5Digest !== 'undefined' &&
              typeof this.eTag !== 'undefined',
          self = this,
          callComplete = false;

        new Promise(function (resolve, reject) {

            new Promise(function (resolve, rejectToUploadNew) {
                if (self.uploadId) {
                    if (existenceOptimized) {
                        return self.reuseS3Object(awsKey)
                            .then(resolve, rejectToUploadNew);
                    }

                    callComplete = true;
                    self.resumeInterruptedUpload()
                        .then(resolve, rejectToUploadNew);
                } else {
                    throw(""); // throw triggers the Upload here for the common case
                }
            })
                .then(resolve,
                    function (reason) { // rejectToUploadNew
                        l.d(reason);
                        self.uploadId = undefined;
                        callComplete = true;
                        self.uploadFile(awsKey)
                            .then(resolve, reject);
                    });
        })
            .then(
                function () {
                    var promise = callComplete ? self.completeUpload() : Promise.resolve();
                    promise.then(self.deferredCompletion.resolve.bind(self));
                },
                function () { // uploadFile failed
                    if (!self.abortedByUser) {
                        self.abortUpload()
                            .then(
                                function () { self.deferredCompletion.reject('File upload aborted due to a part failing to upload'); },
                                self.deferredCompletion.reject.bind(self));
                    }
                }
            );

    };
    FileUpload.prototype.stop = function () {
        l.d('stopping FileUpload ', this.id);
        this.setStatus(CANCELED);
        this.info('Canceling uploads...');
        this.abortedByUser = true;
        var self = this;
        return this.abortUpload()
            .then(function () {
                throw("User aborted the upload");
            })
            .catch(function (reason) {
                self.deferredCompletion.reject(reason);
            });
    };
    FileUpload.prototype.pause = function (force) {
        l.d('pausing FileUpload, force:', !!force, this.id);
        var promises = [];
        this.info('Pausing uploads...');
        this.status = PAUSING;
        if (force) {
            this.abortParts(true);
        } else {
            promises = this.partsInProcess.map(function (p) {
                return this.s3Parts[p].awsRequest.awsDeferred.promise
            }, this);
            this.pausing();
        }
        return Promise.all(promises)
            .then(function () {
                this.stopMonitor();
                this.status = PAUSED;
                this.startNextFile('pause');
                this.paused();
            }.bind(this));
    };
    FileUpload.prototype.resume = function () {
      this.status = PENDING;
      this.resumed();
    };
    FileUpload.prototype.done = function () {
        clearInterval(this.progressInterval);
        this.startNextFile('file done');
        this.partsOnS3 = [];
        this.s3Parts = [];
    };

    FileUpload.prototype.startPartUpload = function (part) {
        this.lastPartSatisfied
            .then(part.delaySend.bind(part));
        this.lastPartSatisfied = part.getStartedPromise();
    };
    FileUpload.prototype.abortParts = function (pause) {
        var self = this;
        var toAbort = this.partsInProcess.slice(0);
        toAbort.forEach(function (i) {
            var part = self.s3Parts[i];
            if (part) {
                part.awsRequest.abort();
                if (pause) { part.status = PENDING; }
                removeAtIndex(self.partsInProcess, part.part);
                if (self.partsToUpload.length) { self.evaporatingCnt(-1); }
            }
        });
    };
    FileUpload.prototype.makeParts = function (firstPart) {
        this.numParts = Math.ceil(this.sizeBytes / this.con.partSize) || 1; // issue #58
        var partsDeferredPromises = [];

        var self = this;

        function cleanUpAfterPart(s3Part) {
            removeAtIndex(self.partsToUpload, s3Part.part);
            removeAtIndex(self.partsInProcess, s3Part.part);

            if (self.partsToUpload.length) { self.evaporatingCnt(-1); }
        }

        function resolve(s3Part) { return function () {
                cleanUpAfterPart(s3Part);
                if (self.partsToUpload.length) { self.consumeRemainingSlots(); }
                if (self.partsToUpload.length < self.con.maxConcurrentParts) {
                    self.startNextFile('part resolve');
                }
            };
        }
        function reject(s3Part) { return function () {
                cleanUpAfterPart(s3Part);
            };
        }

        var limit = firstPart ? 1 : this.numParts;

        for (var part = 1; part <= limit; part++) {
            var s3Part = this.s3Parts[part];
            if (typeof s3Part !== "undefined"){
                if(s3Part.status === COMPLETE) { continue; }
            } else {
                s3Part = this.makePart(part, PENDING, this.sizeBytes);
            }
            s3Part.awsRequest = new PutPart(this, s3Part);
            s3Part.awsRequest.awsDeferred.promise
                .then(resolve(s3Part), reject(s3Part));

            this.partsToUpload.push(part);
            partsDeferredPromises.push(this.s3Parts[part].awsRequest.awsDeferred.promise);
        }

        return partsDeferredPromises;
    };
    FileUpload.prototype.makePart = function (partNumber, status, size) {
        var part = {
            status: status,
            loadedBytes: 0,
            loadedBytesPrevious: null,
            isEmpty: (size === 0), // issue #58
            md5_digest: null,
            part: partNumber
        };

        this.s3Parts[partNumber] = part;

        return part;
    };
    FileUpload.prototype.setStatus = function (s) {
        this.status = s;
    };

    FileUpload.prototype.createUploadFile = function () {
        var fileKey = uploadKey(this),
            newUpload = {
                awsKey: this.name,
                bucket: this.con.bucket,
                uploadId: this.uploadId,
                fileSize: this.sizeBytes,
                fileType: this.file.type,
                lastModifiedDate: dateISOString(this.file.lastModified),
                partSize: this.con.partSize,
                signParams: this.con.signParams,
                createdAt: new Date().toISOString()
            };
        saveUpload(fileKey, newUpload);
    };
    FileUpload.prototype.updateUploadFile = function (updates) {
        var fileKey = uploadKey(this);
        var uploads = getSavedUploads();
        var upload = Object.assign({}, uploads[fileKey], updates);
        saveUpload(fileKey, upload);
    };
    FileUpload.prototype.completeUploadFile = function (xhr) {
        var uploads = getSavedUploads(),
            upload = uploads[uploadKey(this)];

        if (typeof upload !== 'undefined') {
            upload.completedAt = new Date().toISOString();
            upload.eTag = this.eTag;
            upload.firstMd5Digest = this.firstMd5Digest;
            uploads[uploadKey(this)] = upload;
            historyCache.setItem('awsUploads', JSON.stringify(uploads));
        }

        this.complete(xhr, this.name, this.progessStats());
        this.setStatus(COMPLETE);
        this.onProgress();
    };
    FileUpload.prototype.removeUploadFile = function (){
        if (typeof this.file !== 'undefined') {
            removeUpload(uploadKey(this));
        }
    };
    FileUpload.prototype.getUnfinishedFileUpload = function () {
        var savedUploads = getSavedUploads(true),
            u = savedUploads[uploadKey(this)];

        if (this.canRetryUpload(u)) {
            this.uploadId = u.uploadId;
            this.name = u.awsKey;
            this.eTag = u.eTag;
            this.firstMd5Digest = u.firstMd5Digest;
            this.signParams = u.signParams;
        }
    };
    FileUpload.prototype.canRetryUpload = function (u) {
        // Must be the same file name, file size, last_modified, file type as previous upload
        if (typeof u === 'undefined') {
            return false;
        }
        var completedAt = new Date(u.completedAt || FAR_FUTURE);

        // check that the part sizes and bucket match, and if the file name of the upload
        // matches if onlyRetryForSameFileName is true
        return this.con.partSize === u.partSize &&
            completedAt > HOURS_AGO &&
            this.con.bucket === u.bucket &&
            (this.con.onlyRetryForSameFileName ? this.name === u.awsKey : true);
    };

    FileUpload.prototype.partSuccess = function (eTag, putRequest) {
        var part = putRequest.part;
        l.d(putRequest.request.step, 'ETag:', eTag);
        if (part.isEmpty || (eTag !== ETAG_OF_0_LENGTH_BLOB)) { // issue #58
            part.eTag = eTag;
            part.status = COMPLETE;
            this.partsOnS3.push(part);
            return true;
        } else {
            part.status = ERROR;
            putRequest.resetLoadedBytes(0);
            var msg = ['eTag matches MD5 of 0 length blob for part #', putRequest.partNumber, 'Retrying part.'].join(" ");
            l.w(msg);
            this.warn(msg);
        }
    };
    FileUpload.prototype.listPartsSuccess = function (listPartsRequest, partsXml) {
        this.info('uploadId', this.uploadId, 'is not complete. Fetching parts from part marker', listPartsRequest.partNumberMarker);
        var oDOM = parseXml(partsXml),
            listPartsResult = oDOM.getElementsByTagName("ListPartsResult")[0],
            uploadedParts = oDOM.getElementsByTagName("Part"),
            parts_len = uploadedParts.length,
            cp, partSize;

        for (var i = 0; i < parts_len; i++) {
            cp = uploadedParts[i];
            partSize = parseInt(nodeValue(cp, "Size"), 10);
            this.fileTotalBytesUploaded += partSize;
            this.partsOnS3.push({
                eTag: nodeValue(cp, "ETag"),
                partNumber: parseInt(nodeValue(cp, "PartNumber"), 10),
                size: partSize,
                LastModified: nodeValue(cp, "LastModified")
            });
        }

        return listPartsResult;
    };
    FileUpload.prototype.makePartsfromPartsOnS3 = function () {
        var self = this;
        this.partsOnS3.forEach(function (cp) {
            var uploadedPart = self.makePart(cp.partNumber, COMPLETE, cp.size);
            uploadedPart.eTag = cp.eTag;
            uploadedPart.loadedBytes = cp.size;
            uploadedPart.loadedBytesPrevious = cp.size;
            uploadedPart.finishedUploadingAt = cp.LastModified;
        });
    };
    FileUpload.prototype.completeUpload = function () {
        var self = this;
        return new CompleteMultipartUpload(this)
            .send()
            .then(
                function (xhr) {
                    var oDOM = parseXml(xhr.responseText),
                        result = oDOM.getElementsByTagName("CompleteMultipartUploadResult")[0];
                    self.eTag = nodeValue(result, "ETag");
                    self.completeUploadFile(xhr);
                });
    };
    FileUpload.prototype.getCompletedPayload = function () {
        var completeDoc = [];
        completeDoc.push('<CompleteMultipartUpload>');
        this.s3Parts.forEach(function (part, partNumber) {
            if (partNumber > 0) {
                ['<Part><PartNumber>', partNumber, '</PartNumber><ETag>', part.eTag, '</ETag></Part>']
                    .forEach(function (a) { completeDoc.push(a); });
            }
        });
        completeDoc.push('</CompleteMultipartUpload>');

        return completeDoc.join("");
    };
    FileUpload.prototype.consumeSlots = function () {
        if (this.partsToUpload.length === 0) { return -1 }
        if (this.partsToUpload.length !== this.partsInProcess.length &&
            this.status === EVAPORATING) {

            var partsToUpload = Math.min(this.getRemainingSlots(), this.partsToUpload.length);

            if (!partsToUpload) { return -1; }

            var satisfied = 0;
            for (var i = 0; i < this.partsToUpload.length; i++) {
                var part = this.s3Parts[this.partsToUpload[i]];

                if (part.status === EVAPORATING) { continue; }

                if (this.canStartPart(part)) {
                    if (this.partsInProcess.length && this.partsToUpload.length > 1) {
                        this.evaporatingCnt(+1);
                    }
                    this.partsInProcess.push(part.part);
                    this.startPartUpload(part.awsRequest);
                } else { continue; }

                satisfied += 1;

                if (satisfied === partsToUpload) { break; }

            }
            var allInProcess = this.partsToUpload.length === this.partsInProcess.length,
                remainingSlots = this.getRemainingSlots();
            if (allInProcess && remainingSlots > 0) {
                // We don't need any more slots...
                this.startNextFile('consume slots');
            }
            return remainingSlots;
        }
        return 0;
    };
    FileUpload.prototype.canStartPart = function (part) {
        return this.partsInProcess.indexOf(part.part) === -1 && !part.awsRequest.errorExceptionStatus();
    };
    FileUpload.prototype.uploadFile = function (awsKey) {
        this.status = EVAPORATING;
        this.removeUploadFile();
        var self = this;
        return new InitiateMultipartUpload(self, awsKey)
            .send()
            .then(
                function () {
                    self.partsToUpload = [];
                    return self.uploadParts()
                        .then(
                            function () {},
                            function (reason) {
                                    throw(reason);
                            })
                });
    };
    FileUpload.prototype.uploadParts = function () {
        this.loaded = 0;
        this.totalUpoaded = 0;
        var promises = this.makeParts();
        this.setStatus(EVAPORATING);
        this.startTime = new Date();
        this.consumeSlots();
        return Promise.all(promises);
    };
    FileUpload.prototype.abortUpload = function () {
        var self = this;
        return new Promise(function (resolve, reject) {

            if(typeof self.uploadId === 'undefined') {
                resolve();
                return;
            }

            new DeleteMultipartUpload(self)
                .send()
                .then(resolve, reject);
        })
            .then(
                function () {
                    self.setStatus(ABORTED);
                    self.cancelled();
                    self.removeUploadFile();
                },
                self.deferredCompletion.reject.bind(self));
    };
    FileUpload.prototype.resumeInterruptedUpload = function () {
        var self = this;
        return new GetMultipartUploadParts(self)
            .send()
            .then(self.uploadParts.bind(self));
    };
    FileUpload.prototype.reuseS3Object = function (awsKey) {
        var self = this;
        // Attempt to reuse entire uploaded object on S3
        this.makeParts(1);
        this.partsToUpload = [];
        var firstPart = this.s3Parts[1];
        function reject(reason) {
            self.name = awsKey;
            throw(reason);
        }
        return firstPart.awsRequest.getPartMd5Digest()
            .then(function () {
                    if (self.firstMd5Digest === self.s3Parts[1].md5_digest) {
                    return new ReuseS3Object(self, awsKey)
                        .send()
                        .then(
                            function (xhr) {
                                l.d('headObject found matching object on S3.');
                                self.completeUploadFile(xhr);
                                self.nameChanged(self.name);
                            })
                        .catch(reject);

                } else {
                    var msg = self.con.allowS3ExistenceOptimization ? 'File\'s first part MD5 digest does not match what was stored.' : 'allowS3ExistenceOptimization is not enabled.';
                    reject(msg);
                }
            });
    };


    function SignedS3AWSRequest(fileUpload, request) {
        this.fileUpload = fileUpload;
        this.con = fileUpload.con;
        this.attempts = 1;
        this.localTimeOffset = this.fileUpload.localTimeOffset;
        this.awsDeferred = defer();
        this.started = defer();

        this.awsUrl = awsUrl(this.con);
        this.awsHost = uri(this.awsUrl).hostname;

        this.updateRequest(request);
    }
    SignedS3AWSRequest.prototype.fileUpload = undefined;
    SignedS3AWSRequest.prototype.con = undefined;
    SignedS3AWSRequest.prototype.awsUrl = undefined;
    SignedS3AWSRequest.prototype.awsHost = undefined;
    SignedS3AWSRequest.prototype.authorize = function () {};
    SignedS3AWSRequest.prototype.localTimeOffset = 0;
    SignedS3AWSRequest.prototype.awsDeferred = undefined;
    SignedS3AWSRequest.prototype.started = undefined;
    SignedS3AWSRequest.prototype.getPath = function () {
        var path = '/' + this.con.bucket + '/' + this.fileUpload.name;
        if (this.con.cloudfront || this.awsUrl.indexOf('cloudfront') > -1) {
            path = '/' + this.fileUpload.name;
        }
        return path;
    };

    SignedS3AWSRequest.prototype.updateRequest = function (request) {
        this.request = request;
        var SigningClass = signingVersion(this, l);
        this.signer = new SigningClass(request, this.getPayload());
    };
    SignedS3AWSRequest.prototype.success = function () { return true; };
    SignedS3AWSRequest.prototype.error =  function (reason) {
        if (this.errorExceptionStatus()) {
            return;
        }

        l.d(this.request.step, 'error:', this.fileUpload.id, reason);

        if (typeof this.errorHandler(reason) !== 'undefined' ) {
            return;
        }

        this.fileUpload.warn('Error in ', this.request.step, reason);
        this.fileUpload.setStatus(ERROR);

        var self = this,
            backOffWait = (this.attempts === 1) ? 0 : 1000 * Math.min(
                this.con.maxRetryBackoffSecs,
                Math.pow(this.con.retryBackoffPower, this.attempts - 2)
            );
        this.attempts += 1;

        setTimeout(function () {
            if (!self.errorExceptionStatus()) { self.trySend(); }
        }, backOffWait);
    };
    SignedS3AWSRequest.prototype.errorHandler = function () { };
    SignedS3AWSRequest.prototype.errorExceptionStatus = function () { return false; };
    SignedS3AWSRequest.prototype.getPayload = function () { return null; };
    SignedS3AWSRequest.prototype.success_status = function (xhr) {
        return (xhr.status >= 200 && xhr.status <= 299) ||
            this.request.success404 && xhr.status === 404;
    };
    SignedS3AWSRequest.prototype.stringToSign = function () {
        return encodeURIComponent(this.signer.stringToSign());
    };
    SignedS3AWSRequest.prototype.makeSignParamsObject = function (params) {
        var out = {};
        for (var param in params) {
            if (!params.hasOwnProperty(param)) { continue; }
            if (typeof params[param] === 'function') {
                out[param] = params[param]();
            } else {
                out[param] = params[param];
            }
        }
        return out;
    };
    SignedS3AWSRequest.prototype.signResponse = function(payload, stringToSign, signatureDateTime) {
        var self = this;
        return new Promise(function (resolve) {
            if (typeof self.con.signResponseHandler === 'function') {
                return self.con.signResponseHandler(payload, stringToSign, signatureDateTime)
                    .then(resolve);
            }
            resolve(payload);
        });
    };
    SignedS3AWSRequest.prototype.sendRequestToAWS = function () {
        var self = this;
        return new Promise( function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            self.currentXhr = xhr;

            var payload = self.getPayload(),
                url = [self.awsUrl, self.getPath(), self.request.path].join(""),
                all_headers = {};

            if (self.request.query_string) {
                url += self.request.query_string;
            }
            extend(all_headers, self.request.not_signed_headers);
            extend(all_headers, self.request.x_amz_headers);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {

                    if (payload) {
                        // Test, per http://code.google.com/p/chromium/issues/detail?id=167111#c20
                        // Need to refer to the payload to keep it from being GC'd...sad.
                        l.d('  ###', payload.size);
                    }
                    if (self.success_status(xhr)) {
                        if (self.request.response_match &&
                            xhr.response.match(new RegExp(self.request.response_match)) === undefined) {
                            reject('AWS response does not match set pattern: ' + self.request.response_match);
                        } else {
                            resolve(xhr);
                        }
                    } else {
                        var reason = xhr.responseText ? getAwsResponse(xhr) : ' ';
                        reason += 'status:' + xhr.status;
                        reject(reason);
                    }
                }
            };

            xhr.open(self.request.method, url);
            xhr.setRequestHeader('Authorization', self.signer.authorizationString());

            for (var key in all_headers) {
                if (all_headers.hasOwnProperty(key)) {
                    xhr.setRequestHeader(key, all_headers[key]);
                }
            }

            self.signer.setHeaders(xhr);

            if (self.request.contentType) {
                xhr.setRequestHeader('Content-Type', self.request.contentType);
            }

            if (self.request.md5_digest) {
                xhr.setRequestHeader('Content-MD5', self.request.md5_digest);
            }
            xhr.onerror = function (xhr) {
                var reason = xhr.responseText ? getAwsResponse(xhr) : 'transport error';
                reject(reason);
            };

            if (typeof self.request.onProgress === 'function') {
                xhr.upload.onprogress = self.request.onProgress;
            }

            xhr.send(payload);

            setTimeout(function () { // We have to delay here or Safari will hang
                self.started.resolve('request sent ' + self.request.step);
            }, 20)
        });
    };
    //see: http://docs.amazonwebservices.com/AmazonS3/latest/dev/RESTAuthentication.html#ConstructingTheAuthenticationHeader
    SignedS3AWSRequest.prototype.authorize = function () {
        this.request.dateString = this.signer.dateString(this.localTimeOffset);
        this.request.x_amz_headers = extend(this.request.x_amz_headers, {
            'x-amz-date': this.request.dateString
        });
        return authorizationMethod(this).authorize();
    };
    SignedS3AWSRequest.prototype.authorizationSuccess = function (authorization) {
        l.d(this.request.step, 'signature:', authorization);
        this.request.auth = authorization;
    };
    SignedS3AWSRequest.prototype.trySend = function () {
        var self = this;
        return this.authorize()
            .then(
                function (value) {
                    self.authorizationSuccess(value);
                    self.sendRequestToAWS()
                        .then(
                            function (value) {
                                if (self.success(value)) {
                                    self.awsDeferred.resolve(value);
                                }
                            },
                            self.error.bind(self));
                },
                self.error.bind(self));
    };
    SignedS3AWSRequest.prototype.send = function () {
        this.trySend();
        return this.awsDeferred.promise;
    };

    function CancelableS3AWSRequest(fileUpload, request) {
        SignedS3AWSRequest.call(this, fileUpload, request);
    }
    CancelableS3AWSRequest.prototype = Object.create(SignedS3AWSRequest.prototype);
    CancelableS3AWSRequest.prototype.constructor = CancelableS3AWSRequest;
    CancelableS3AWSRequest.prototype.errorExceptionStatus = function () {
        return [ABORTED, CANCELED].indexOf(this.fileUpload.status) > -1;
    };

    function SignedS3AWSRequestWithRetryLimit(fileUpload, request, maxRetries) {
        if (maxRetries > -1) {
            this.maxRetries = maxRetries;
        }
        SignedS3AWSRequest.call(this, fileUpload, request);
    }
    SignedS3AWSRequestWithRetryLimit.prototype = Object.create(CancelableS3AWSRequest.prototype);
    SignedS3AWSRequestWithRetryLimit.prototype.constructor = SignedS3AWSRequestWithRetryLimit;
    SignedS3AWSRequestWithRetryLimit.prototype.maxRetries = 1;
    SignedS3AWSRequestWithRetryLimit.prototype.errorHandler =  function (reason) {
        if (this.attempts > this.maxRetries) {
            var msg = ['MaxRetries exceeded. Will re-upload file id ', this.fileUpload.id, ', ', reason].join("");
            l.w(msg);
            this.awsDeferred.reject(msg);
            return true;
        }
    };

    // see: http://docs.amazonwebservices.com/AmazonS3/latest/API/mpUploadInitiate.html
    function InitiateMultipartUpload(fileUpload, awsKey) {
        var request = {
            method: 'POST',
            path: '?uploads',
            step: 'initiate',
            x_amz_headers: fileUpload.xAmzHeadersAtInitiate,
            not_signed_headers: fileUpload.notSignedHeadersAtInitiate,
            response_match: '<UploadId>(.+)<\/UploadId>'
        };

        if (fileUpload.contentType) {
            request.contentType = fileUpload.contentType;
        }

        CancelableS3AWSRequest.call(this, fileUpload, request);
        this.awsKey = awsKey;
    }
    InitiateMultipartUpload.prototype = Object.create(CancelableS3AWSRequest.prototype);
    InitiateMultipartUpload.prototype.constructor = InitiateMultipartUpload;
    InitiateMultipartUpload.prototype.success = function (xhr) {
        var match = xhr.response.match(new RegExp(this.request.response_match));
        this.fileUpload.uploadId = match[1];
        this.fileUpload.awsKey = this.awsKey;
        l.d('InitiateMultipartUpload ID is', this.fileUpload.uploadId);
        this.fileUpload.createUploadFile();
        return true;
    };

    //http://docs.amazonwebservices.com/AmazonS3/latest/API/mpUploadComplete.html
    function CompleteMultipartUpload(fileUpload) {
        fileUpload.info('will attempt to complete upload');
        var request = {
            method: 'POST',
            contentType: 'application/xml; charset=UTF-8',
            path: '?uploadId=' + fileUpload.uploadId,
            x_amz_headers: fileUpload.xAmzHeadersCommon || fileUpload.xAmzHeadersAtComplete,
            step: 'complete'
        };
        CancelableS3AWSRequest.call(this, fileUpload, request);
    }
    CompleteMultipartUpload.prototype = Object.create(CancelableS3AWSRequest.prototype);
    CompleteMultipartUpload.prototype.constructor = CompleteMultipartUpload;
    CompleteMultipartUpload.prototype.getPayload = function () {
        return this.fileUpload.getCompletedPayload();
    };

    //http://docs.amazonwebservices.com/AmazonS3/latest/API/mpUploadComplete.html
    function ReuseS3Object(fileUpload, awsKey) {
        this.awsKey = awsKey;

        fileUpload.info('will attempt to verify existence of the file');

        var request = {
            method: 'HEAD',
            path: '',
            x_amz_headers: fileUpload.xAmzHeadersCommon,
            success404: true,
            step: 'head_object'
        };

        SignedS3AWSRequestWithRetryLimit.call(this, fileUpload, request);
    }
    ReuseS3Object.prototype = Object.create(SignedS3AWSRequestWithRetryLimit.prototype);
    ReuseS3Object.prototype.constructor = ReuseS3Object;
    ReuseS3Object.prototype.awsKey = undefined;
    ReuseS3Object.prototype.success = function (xhr) {
        var eTag = xhr.getResponseHeader('Etag');
        if (eTag !== this.fileUpload.eTag) {
            var msg = ['uploadId ', this.fileUpload.id, ' found on S3 but the Etag doesn\'t match.'].join('');
            this.awsDeferred.reject(msg);
            return false;
        }
        return true;
    };

    //http://docs.amazonwebservices.com/AmazonS3/latest/API/mpUploadListParts.html
    function GetMultipartUploadParts(fileUpload) {
        SignedS3AWSRequestWithRetryLimit.call(this, fileUpload);
        this.updateRequest(this.setupRequest(0));
    }
    GetMultipartUploadParts.prototype = Object.create(SignedS3AWSRequestWithRetryLimit.prototype);
    GetMultipartUploadParts.prototype.constructor = GetMultipartUploadParts;
    GetMultipartUploadParts.prototype.awsKey = undefined;
    GetMultipartUploadParts.prototype.partNumberMarker = 0;
    GetMultipartUploadParts.prototype.setupRequest = function (partNumberMarker) {
        var msg = ['setupRequest() for uploadId:', this.fileUpload.uploadId, 'for part marker:', partNumberMarker].join(" ");
        l.d(msg);

        this.fileUpload.info(msg);

        this.awsKey = this.fileUpload.name;
        this.partNumberMarker = partNumberMarker;

        var request = {
            method: 'GET',
            path: ['?uploadId=', this.fileUpload.uploadId].join(""),
            query_string: "&part-number-marker=" + partNumberMarker,
            x_amz_headers: this.fileUpload.xAmzHeadersCommon,
            step: 'get upload parts',
            success404: true
        };

        this.request = request;
        return request;
    };
    GetMultipartUploadParts.prototype.success = function (xhr) {
        if (xhr.status === 404) {
            // Success! Upload is no longer recognized, so there is nothing to fetch
            var msg = ['uploadId ', this.fileUpload.id, ' not found on S3.'].join('');
            this.awsDeferred.reject(msg);
            return false;
        }

        var listPartsResult = this.fileUpload.listPartsSuccess(this, xhr.responseText);
        var isTruncated = nodeValue(listPartsResult, "IsTruncated") === 'true';

        if (isTruncated) {
            var request = this.setupRequest(nodeValue(listPartsResult, "NextPartNumberMarker")); // let's fetch the next set of parts
            this.updateRequest(request);
            this.trySend();
        } else {
            this.fileUpload.nameChanged(this.fileUpload.name);
            this.fileUpload.makePartsfromPartsOnS3();
            return true;
        }
    };

    //http://docs.aws.amazon.com/AmazonS3/latest/API/mpUploadUploadPart.html
    function PutPart(fileUpload, part) {
        this.part = part;

        this.partNumber = part.part;
        this.start = (this.partNumber - 1) * fileUpload.con.partSize;
        this.end = this.partNumber * fileUpload.con.partSize;

        var request = {
            method: 'PUT',
            path: '?partNumber=' + this.partNumber + '&uploadId=' + fileUpload.uploadId,
            step: 'upload #' + this.partNumber,
            x_amz_headers: fileUpload.xAmzHeadersCommon || fileUpload.xAmzHeadersAtUpload,
            contentSha256: "UNSIGNED-PAYLOAD",
            onProgress: this.onProgress.bind(this)
        };

        SignedS3AWSRequest.call(this, fileUpload, request);
    }
    PutPart.prototype = Object.create(SignedS3AWSRequest.prototype);
    PutPart.prototype.constructor = PutPart;
    PutPart.prototype.part = 1;
    PutPart.prototype.start = 0;
    PutPart.prototype.end = 0;
    PutPart.prototype.partNumber = undefined;
    PutPart.prototype.getPartMd5Digest = function () {
        var self = this,
            part = this.part,
            reader = new FileReader();
        return new Promise(function (resolve) {
            if (self.con.computeContentMd5 && !part.md5_digest) {
                reader.onloadend = function () {
                    reader = undefined;
                    var md5_digest = self.con.cryptoMd5Method(this.result);
                    if (self.partNumber === 1 && self.con.computeContentMd5 && typeof self.fileUpload.firstMd5Digest === "undefined") {
                        self.fileUpload.firstMd5Digest = md5_digest;
                        self.fileUpload.updateUploadFile({firstMd5Digest: md5_digest})
                    }
                    resolve(md5_digest);
                };

                reader.readAsArrayBuffer(getFilePart(self.fileUpload.file, self.start, self.end));
            } else {
                resolve(part.md5_digest);
            }
        })
            .then(function (md5_digest) {
                if (md5_digest) {
                    l.d(self.request.step, 'MD5 digest:', md5_digest);
                    self.request.md5_digest = md5_digest;
                    self.part.md5_digest = md5_digest;
                }
            });
    };
    PutPart.prototype.sendRequestToAWS = function () {
        this.stalledInterval = setInterval(this.stalledPartMonitor(), PARTS_MONITOR_INTERVAL_MS);
        this.stalledPartMonitor();
        return SignedS3AWSRequest.prototype.sendRequestToAWS.call(this);
    };
    PutPart.prototype.send = function () {
        if (this.part.status !== COMPLETE &&
            [ABORTED, PAUSED, CANCELED].indexOf(this.fileUpload.status) === -1
        ) {
            l.d('uploadPart #', this.partNumber, this.attempts === 1 ? 'submitting' : 'retrying');

            this.part.status = EVAPORATING;
            this.attempts += 1;
            this.part.loadedBytesPrevious = null;

            var self = this;
            return this.getPartMd5Digest()
                .then(function () {
                    l.d('Sending', self.request.step);
                    SignedS3AWSRequest.prototype.send.call(self);
                });
        }
    };
    PutPart.prototype.success = function (xhr) {
        clearInterval(this.stalledInterval);
        var eTag = xhr.getResponseHeader('ETag');
        return this.fileUpload.partSuccess(eTag, this);
    };
    PutPart.prototype.onProgress = function (evt) {
        if (evt.loaded > 0) {
          var loadedNow = evt.loaded - this.part.loadedBytes;
          if (loadedNow) {
            this.part.loadedBytes = evt.loaded;
            this.fileUpload.updateLoaded(loadedNow);
          }
        }
    };
    PutPart.prototype.stalledPartMonitor = function () {
        var lastLoaded = this.part.loadedBytes;
        var self = this;
        return function () {
            clearInterval(self.stalledInterval);
            if ([EVAPORATING, ERROR, PAUSING, PAUSED].indexOf(self.fileUpload.status) === -1 &&
                self.part.status !== ABORTED &&
                self.part.loadedBytes < this.size) {
                if (lastLoaded === self.part.loadedBytes) {
                    l.w('Part stalled. Will abort and retry:', self.partNumber, decodeURIComponent(self.fileUpload.name));
                    self.abort();
                    if (!self.errorExceptionStatus()) {
                        self.delaySend();
                    }
                } else {
                    self.stalledInterval = setInterval(self.stalledPartMonitor(), PARTS_MONITOR_INTERVAL_MS);
                }
            }
        }
    };
    PutPart.prototype.resetLoadedBytes = function (v) {
        this.fileUpload.updateLoaded(0);
        this.part.loadedBytes = v;
        this.fileUpload.onProgress();
    };
    PutPart.prototype.errorExceptionStatus = function () {
        return [CANCELED, ABORTED, PAUSED, PAUSING].indexOf(this.fileUpload.status) > -1;
    };
    PutPart.prototype.delaySend = function () {
        var backOffWait;

        if (this.part.status === ERROR) {
            backOffWait = (this.attempts === 1) ? 0 : 1000 * Math.min(
                this.con.maxRetryBackoffSecs,
                Math.pow(this.con.retryBackoffPower, this.attempts - 2)
            );

            this.attempts += 1;
        } else {
            backOffWait = 0;
        }

        setTimeout(this.send.bind(this), backOffWait);
    };
    PutPart.prototype.errorHandler = function (reason) {
        clearInterval(this.stalledInterval);
        if (reason.match(/status:404/)) {
            var errMsg = '404 error on part PUT. The part and the file will abort. ' + reason;
            l.w(errMsg);
            this.fileUpload.error(errMsg);
            this.part.status = ABORTED;
            this.awsDeferred.reject(errMsg);
            return true;
        }
        this.resetLoadedBytes(0);
        this.part.status = ERROR;

        if (!this.errorExceptionStatus()) {
            this.delaySend();
        }
        return true;
    };
    PutPart.prototype.abort = function () {
        if (this.currentXhr) {
            this.currentXhr.abort();
        }
        this.resetLoadedBytes(0);
        this.attempts = 1;
    };
    PutPart.size = 0;
    PutPart.prototype.getPayload = function () {
        var slice = getFilePart(this.fileUpload.file, this.start, this.end);
        l.d(this.partNumber, 'payload bytes:', this.start, '->', this.end, ', size:', slice.size);
        if (!this.part.isEmpty && slice.size === 0) { // issue #58
            l.w('  *** WARN: blob reporting size of 0 bytes. Will try upload anyway..');
        }
        this.size = slice.size;
        return slice;
    };
    PutPart.prototype.stalledInterval = -1;
    PutPart.prototype.getStartedPromise = function () {
        return this.started.promise;
    };


    //http://docs.amazonwebservices.com/AmazonS3/latest/API/mpUploadAbort.html
    function DeleteMultipartUpload(fileUpload) {
        fileUpload.info('will attempt to abort the upload');

        fileUpload.abortParts();

        var request = {
            method: 'DELETE',
            path: '?uploadId=' + fileUpload.uploadId,
            x_amz_headers: fileUpload.xAmzHeadersCommon,
            success404: true,
            step: 'abort'
        };

        SignedS3AWSRequest.call(this, fileUpload, request);
    }
    DeleteMultipartUpload.prototype = Object.create(SignedS3AWSRequest.prototype);
    DeleteMultipartUpload.prototype.constructor = DeleteMultipartUpload;
    DeleteMultipartUpload.prototype.maxRetries = 1;
    DeleteMultipartUpload.prototype.success = function () {
        this.fileUpload.setStatus(ABORTED);
        return true;
    };
    DeleteMultipartUpload.prototype.errorHandler =  function (reason) {
        if (this.attempts > this.maxRetries) {
            var msg = 'Error aborting upload, Exceeded retries deleting the file upload: ' + reason;
            l.w(msg);
            this.fileUpload.error(msg);
            this.awsDeferred.reject(msg);
            return true;
        }
    };

    function signingVersion(awsRequest, l) {
        var con = awsRequest.con;
        function AwsSignature(request) {
            this.request = request;
        }
        AwsSignature.prototype.request = {};
        AwsSignature.prototype.authorizationString = function () {};
        AwsSignature.prototype.stringToSign = function () {};
        AwsSignature.prototype.setHeaders = function () {};
        AwsSignature.prototype.datetime = function (timeOffset) {
            return new Date(new Date().getTime() + timeOffset);

        };
        AwsSignature.prototype.dateString = function (timeOffset) {
            return this.datetime(timeOffset).toISOString().slice(0, 19).replace(/-|:/g, '') + "Z";
        };

        function AwsSignatureV2(request) {
            AwsSignature.call(this, request);
        }
        AwsSignatureV2.prototype = Object.create(AwsSignature.prototype);
        AwsSignatureV2.prototype.constructor = AwsSignatureV2;
        AwsSignatureV2.prototype.authorizationString = function () {
            return ['AWS ', con.aws_key, ':', this.request.auth].join('');
        };
        AwsSignatureV2.prototype.stringToSign = function () {
            var x_amz_headers = '', result, header_key_array = [];

            for (var key in this.request.x_amz_headers) {
                if (this.request.x_amz_headers.hasOwnProperty(key)) {
                    header_key_array.push(key);
                }
            }
            header_key_array.sort();

            var self = this;
            header_key_array.forEach(function (header_key) {
                x_amz_headers += (header_key + ':' + self.request.x_amz_headers[header_key] + '\n');
            });

            result = this.request.method + '\n' +
                (this.request.md5_digest || '') + '\n' +
                (this.request.contentType || '') + '\n' +
                '\n' +
                x_amz_headers +
                (con.cloudfront ? '/' + con.bucket : '') +
                awsRequest.getPath() + this.request.path;

            l.d('V2 stringToSign:', result);
            return result;

        };
        AwsSignatureV2.prototype.dateString = function (timeOffset) {
            return this.datetime(timeOffset).toUTCString();
        };

        function AwsSignatureV4(request, payload) {
            this.payload = payload;
            AwsSignature.call(this, request);
        }
        AwsSignatureV4.prototype = Object.create(AwsSignature.prototype);
        AwsSignatureV4.prototype.constructor = AwsSignatureV4;
        AwsSignatureV4.prototype.payload = null;
        AwsSignatureV4.prototype.authorizationString = function () {
            var authParts = [];

            var credentials = this.credentialString();
            var headers = this.canonicalHeaders();

            authParts.push(['AWS4-HMAC-SHA256 Credential=', con.aws_key, '/', credentials].join(''));
            authParts.push('SignedHeaders=' + headers.signedHeaders);
            authParts.push('Signature=' + this.request.auth);

            return authParts.join(', ');
        };
        AwsSignatureV4.prototype.stringToSign = function () {
            var signParts = [];
            signParts.push('AWS4-HMAC-SHA256');
            signParts.push(this.request.dateString);
            signParts.push(this.credentialString());
            signParts.push(con.cryptoHexEncodedHash256(this.canonicalRequest()));
            var result = signParts.join('\n');

            l.d('V4 stringToSign:', result);
            return result;
        };
        AwsSignatureV4.prototype.credentialString = function () {
            var credParts = [];

            credParts.push(this.request.dateString.slice(0, 8));
            credParts.push(con.awsRegion);
            credParts.push('s3');
            credParts.push('aws4_request');
            return credParts.join('/');
        };
        AwsSignatureV4.prototype.canonicalQueryString = function () {
            var qs = awsRequest.request.query_string || '',
                search = uri([awsRequest.awsUrl, this.request.path, qs].join("")).search,
                searchParts = search.length ? search.split('&') : [],
                encoded = [],
                nameValue,
                i;

            for (i = 0; i < searchParts.length; i++) {
                nameValue = searchParts[i].split("=");
                encoded.push({
                    name: encodeURIComponent(nameValue[0]),
                    value: nameValue.length > 1 ? encodeURIComponent(nameValue[1]) : null
                })
            }
            var sorted = encoded.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });

            var result = [];
            for (i = 0; i < sorted.length; i++) {
                nameValue = sorted[i].value ? [sorted[i].name, sorted[i].value].join("=") : sorted[i].name + '=';
                result.push(nameValue);
            }

            return result.join('&');
        };
        AwsSignatureV4.prototype.getPayloadSha256Content = function () {
            var result = this.request.contentSha256 || con.cryptoHexEncodedHash256(this.payload || '');
            l.d(this.request.step, 'getPayloadSha256Content:', result);
            return result;
        };
        AwsSignatureV4.prototype.canonicalHeaders = function () {
            var canonicalHeaders = [],
                keys = [],
                i;

            function addHeader(name, value) {
                var key = name.toLowerCase();
                keys.push(key);
                canonicalHeaders[key] = value.replace(/\s+/g, ' ');
            }

            if (this.request.md5_digest) {
                addHeader("Content-Md5", this.request.md5_digest);
            }

            addHeader('Host', awsRequest.awsHost);

            if (this.request.contentType) {
                addHeader('Content-Type', this.request.contentType || '');
            }

            var amzHeaders = this.request.x_amz_headers || {};
            for (var key in amzHeaders) {
                if (amzHeaders.hasOwnProperty(key)) {
                    addHeader(key, amzHeaders[key]);
                }
            }

            var sortedKeys = keys.sort(function (a, b) {
                if (a < b) {
                    return -1;
                } else if (a > b) {
                    return 1;
                }
                return 0;
            });

            var result = [];

            var unsigned_headers = [],
                not_signed = this.request.not_signed_headers || [],
                signed_headers = [];
            for (i = 0; i < not_signed.length; i++) {
                unsigned_headers.push(not_signed[i].toLowerCase());
            }

            for (i = 0; i < sortedKeys.length; i++) {
                var k = sortedKeys[i];
                result.push([k, canonicalHeaders[k]].join(":"));
                if (unsigned_headers.indexOf(k) === -1) {
                    signed_headers.push(k);
                }
            }

            return {
                canonicalHeaders: result.join("\n"),
                signedHeaders: signed_headers.join(";")
            };
        };
        AwsSignatureV4.prototype.canonicalRequest = function () {
            var canonParts = [];

            canonParts.push(this.request.method);
            canonParts.push(uri([awsRequest.awsUrl + awsRequest.getPath() + this.request.path].join("")).pathname);
            canonParts.push(this.canonicalQueryString() || '');

            var headers = this.canonicalHeaders();
            canonParts.push(headers.canonicalHeaders + '\n');
            canonParts.push(headers.signedHeaders);
            canonParts.push(this.getPayloadSha256Content());

            var result = canonParts.join("\n");
            l.d(this.request.step, 'V4 CanonicalRequest:', result);
            return result;
        };
        AwsSignatureV4.prototype.setHeaders = function (xhr) {
            xhr.setRequestHeader("x-amz-content-sha256", this.getPayloadSha256Content());
        };

        return con.awsSignatureVersion === '4' ? AwsSignatureV4 : AwsSignatureV2;
    }
    function authorizationMethod(awsRequest) {
        var fileUpload = awsRequest.fileUpload,
            con = fileUpload.con,
            request = awsRequest.request;

        function AuthorizationMethod() {
            this.request = request;
        }
        AuthorizationMethod.prototype = Object.create(AuthorizationMethod.prototype);
        AuthorizationMethod.prototype.request = {};
        AuthorizationMethod.makeSignParamsObject = function (params) {
            var out = {};
            for (var param in params) {
                if (!params.hasOwnProperty(param)) { continue; }
                if (typeof params[param] === 'function') {
                    out[param] = params[param]();
                } else {
                    out[param] = params[param];
                }
            }
            return out;
        };
        AuthorizationMethod.prototype.authorize = function () {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                awsRequest.currentXhr = xhr;


                var stringToSign = awsRequest.stringToSign(),
                    url = [con.signerUrl, '?to_sign=', stringToSign, '&datetime=', request.dateString].join('');

                var signParams = awsRequest.makeSignParamsObject(fileUpload.signParams);
                for (var param in signParams) {
                    if (!signParams.hasOwnProperty(param)) { continue; }
                    url += ('&' + encodeURIComponent(param) + '=' + encodeURIComponent(signParams[param]));
                }

                if (con.xhrWithCredentials) {
                    xhr.withCredentials = true;
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            awsRequest.signResponse(xhr.response, stringToSign, request.dateString)
                                .then(resolve);
                        } else {
                            if ([401, 403].indexOf(xhr.status) > -1) {
                                var reason = "status:" + xhr.status;
                                fileUpload.deferredCompletion.reject('Permission denied ' + reason);
                                return reject(reason);
                            }
                            reject("Signature fetch returned status: " + xhr.status);
                        }
                    }
                };

                xhr.onerror = function (xhr) {
                    reject('authorizedSend transport error: ' + xhr.responseText);
                };

                xhr.open('GET', url);
                var signHeaders = awsRequest.makeSignParamsObject(con.signHeaders);
                for (var header in signHeaders) {
                    if (!signHeaders.hasOwnProperty(header)) { continue; }
                    xhr.setRequestHeader(header, signHeaders[header])
                }

                if (typeof fileUpload.beforeSigner  === 'function') {
                    fileUpload.beforeSigner(xhr, url);
                }
                xhr.send();
            });
        };

        function AuthorizationCustom() {
            AuthorizationMethod.call(this);
        }
        AuthorizationCustom.prototype = Object.create(AuthorizationMethod.prototype);
        AuthorizationCustom.prototype.authorize = function () {
            return con.customAuthMethod(
                AuthorizationMethod.makeSignParamsObject(fileUpload.signParams),
                AuthorizationMethod.makeSignParamsObject(con.signHeaders),
                awsRequest.stringToSign(),
                request.dateString)
                .catch(function (reason) {
                    fileUpload.deferredCompletion.reject(reason);
                    throw reason;
                });
        };

        if (typeof con.customAuthMethod === 'function') {
            return new AuthorizationCustom()
        }

        return new AuthorizationMethod();
    }

    function awsUrl(con) {
        var url;
        if (con.aws_url) {
            url = [con.aws_url];
        } else {
            if (con.s3Acceleration) {
                url = ["https://", con.bucket, ".s3-accelerate"];
                con.cloudfront = true;
            } else {
                url = ["https://", (con.cloudfront ? con.bucket + "." : ""), "s3"];
                if (con.awsRegion !== "us-east-1") {
                    url.push("-", con.awsRegion);
                }
            }
            url.push(".amazonaws.com");
        }
        return url.join("");
    }

    function s3EncodedObjectName(fileName) {
        var fileParts = fileName.split('/'),
            encodedParts = [];
        fileParts.forEach(function (p) {
            encodedParts.push(encodeURIComponent(p).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/'/, "%27"));
        });
        return encodedParts.join('/');
    }

    function uri(url) {
        var p = document.createElement('a');
        p.href = url || "/";

        return {
            protocol: p.protocol, // => "http:"
            hostname: p.hostname, // => "example.com"
            // IE omits the leading slash, so add it if it's missing
            pathname: p.pathname.replace(/(^\/?)/, "/"), // => "/pathname/"
            port: p.port, // => "3000"
            search: (p.search[0] === '?') ? p.search.substr(1) : p.search, // => "search=test"
            hash: p.hash, // => "#hash"
            host: p.host  // => "example.com:3000"
        };
    }

    function dateISOString(date) {
        // Try to get the modified date as an ISO String, if the date exists
        return date ? new Date(date).toISOString() : '';
    }

    function getFilePart(file, start, end) {
        var slicerFn = (file.slice ? 'slice' : (file.mozSlice ? 'mozSlice' : 'webkitSlice'));
        // browsers' implementation of the Blob.slice function has been renamed a couple of times, and the meaning of the
        // 2nd parameter changed. For example Gecko went from slice(start,length) -> mozSlice(start, end) -> slice(start, end).
        // As of 12/12/12, it seems that the unified 'slice' is the best bet, hence it being first in the list. See
        // https://developer.mozilla.org/en-US/docs/DOM/Blob for more info.
        return file[slicerFn](start, end);
    }

    function getAwsResponse(xhr) {
        var oParser = new DOMParser(),
            oDOM = oParser.parseFromString(xhr.responseText, "text/html"),
            code = oDOM.getElementsByTagName("Code"),
            msg = oDOM.getElementsByTagName("Message");
        code = code && code.length ? (code[0].innerHTML || code[0].textContent) : '';
        msg = msg && msg.length ? (msg[0].innerHTML || msg[0].textContent) : '';

        return code.length ? ['AWS Code: ', code, ', Message:', msg].join("") : '';
    }

    function defer() {
        var deferred = {}, promise;
        promise = new Promise(function(resolve, reject){
            deferred = {resolve: resolve, reject: reject};
        });
        return {
            resolve: deferred.resolve,
            reject: deferred.reject,
            promise: promise
        }
    }

    function extend(obj1, obj2, obj3) {
        function ext(target, source) {
            if (typeof source !== 'object') { return; }
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }
        }

        obj1 = obj1 || {};
        ext(obj2, obj3);
        ext(obj1, obj2);

        return obj1;
    }

    function parseXml(body) {
        var parser = new DOMParser();
        return parser.parseFromString(body, "text/xml");
    }

    function nodeValue(parent, nodeName) {
        return parent.getElementsByTagName(nodeName)[0].textContent;
    }

    function getSavedUploads(purge) {
        var uploads = JSON.parse(historyCache.getItem('awsUploads') || '{}');

        if (purge) {
            for (var key in uploads) {
                if (uploads.hasOwnProperty(key)) {
                    var upload = uploads[key],
                        completedAt = new Date(upload.completedAt || FAR_FUTURE);

                    if (completedAt < HOURS_AGO) {
                        // The upload is recent, let's keep it
                        delete uploads[key];
                    }
                }
            }

            historyCache.setItem('awsUploads', JSON.stringify(uploads));
        }

        return uploads;
    }

    function uploadKey(fileUpload) {
        // The key tries to give a signature to a file in the absence of its path.
        // "<filename>-<mimetype>-<modifieddate>-<filesize>"
        return [
            fileUpload.file.name,
            fileUpload.file.type,
            dateISOString(fileUpload.file.lastModified),
            fileUpload.sizeBytes
        ].join("-");
    }

    function saveUpload(uploadKey, upload) {
        var uploads = getSavedUploads();
        uploads[uploadKey] = upload;
        historyCache.setItem('awsUploads', JSON.stringify(uploads));
    }

    function removeUpload(uploadKey) {
        var uploads = getSavedUploads();
        delete uploads[uploadKey];
        historyCache.setItem('awsUploads', JSON.stringify(uploads));
    }

    function removeAtIndex(a, i) {
        var idx = a.indexOf(i);
        if (idx > -1) {
            a.splice(idx, 1);
            return true;
        }
    }

    function readableFileSize(size) {
        // Adapted from https://github.com/fkjaekel
        // https://github.com/TTLabs/EvaporateJS/issues/13
        var units = ['B', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'],
            i = 0;
        while(size >= 1024) {
            size /= 1024;
            ++i;
        }
        return [size.toFixed(2).replace('.00', ''), units[i]].join(" ");
    }

  var historyCache = {
        supported: function () {
            var result = false;
            if (typeof window !== 'undefined') {
                if (!('localStorage' in window)) {
                    return result;
                }
            } else {
                return result;
            }

            // Try to use storage (it might be disabled, e.g. user is in private mode)
            try {
                localStorage.setItem('___test', 'OK');
                var test = localStorage.getItem('___test');
                localStorage.removeItem('___test');

                result = test === 'OK';
            } catch (e) {
                return result;
            }

            return result;
        },
        getItem: function (key) {
            if (this.supported()) {
                return localStorage.getItem(key)
            }
        },
        setItem: function (key, value) {
            if (this.supported()) {
                return localStorage.setItem(key, value);
            }
        },
        clear: function () {
            if (this.supported()) {
                return localStorage.clear();
            }
        },
        key: function (key) {
            if (this.supported()) {
                return localStorage.key(key);
            }
        },
        removeItem: function (key) {
            if (this.supported()) {
                return localStorage.removeItem(key);
            }
        }
    };

    function noOpLogger() { return {d: function () {}, w: function () {}, e: function () {}}; }

    l = noOpLogger();

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Evaporate;
    } else if (typeof window !== 'undefined') {
        window.Evaporate = Evaporate;
    }

}());
