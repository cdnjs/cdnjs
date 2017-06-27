/*Copyright (c) 2014, TT Labs, Inc.
 All rights reserved.

 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

 Neither the name of the TT Labs, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/


/***************************************************************************************************
 *                                                                                                  *
 *  version 1.4.2                                                                                   *
 *                                                                                                  *
 ***************************************************************************************************/

(function () {
    var FAR_FUTURE = new Date('2060-10-22');

    var Evaporate = function (config) {

        var PENDING = 0, EVAPORATING = 2, COMPLETE = 3, PAUSED = 4, CANCELED = 5, ERROR = 10, ABORTED = 20, ETAG_OF_0_LENGTH_BLOB = '"d41d8cd98f00b204e9800998ecf8427e"';
        var IMMUTABLE_OPTIONS = [
            'maxConcurrentParts',
            'logging',
            'cloudfront',
            'aws_url',
            'bucket',
            'encodeFilename',
            'computeContentMd5',
            'allowS3ExistenceOptimization',
            'onlyRetryForSameFileName',
            'timeUrl',
            'cryptoMd5Method',
            'cryptoHexEncodedHash256',
            'aws_key',
            'awsRegion',
            'awsSignatureVersion'
        ];

        var _ = this;
        var files = [];

        function noOpLogger() { return {d: function () {}, w: function () {}, e: function () {}}; }

        var l = noOpLogger();

        var con = extend({
            bucket: null,
            logging: true,
            maxConcurrentParts: 5,
            partSize: 6 * 1024 * 1024,
            retryBackoffPower: 2,
            maxRetryBackoffSecs: 300,
            progressIntervalMS: 500,
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
            awsRegion: null,
            awsSignatureVersion: '2',
            s3FileCacheHoursAgo: null, // Must be a whole number of hours. Will be interpreted as negative (hours in the past).
            signParams:{},
            signHeaders: {},
            awsLambda: null,
            awsLambdaFunction: null,
            maxFileSize: null,
            signResponseHandler: null,
            // undocumented
            testUnsupported: false,
            simulateStalling: false,
            simulateErrors: false
        }, config);

        if (console && console.log) {
            l = console;
            l.d = l.log;
            l.w = console.warn ? l.warn : l.d;
            l.e = console.error ? l.error : l.d;
        }

        this.supported = !(
            typeof File === 'undefined' ||
            typeof Blob === 'undefined' ||
            typeof (
            Blob.prototype['webkitSlice'] ||
            Blob.prototype['mozSlice']||
            Blob.prototype['slice']) === 'undefined' ||
            !!config.testUnsupported);

        if (!con.bucket) {
            l.e("The AWS 'bucket' option must be present.");
            return;
        }

        if (!this.supported) {
            l.e('The browser does not support the necessary features of File and Blob [webkitSlice || mozSlice || slice]');
            return;
        }

        if (con.computeContentMd5) {
            this.supported = typeof FileReader.prototype.readAsArrayBuffer !== 'undefined';
            if (!this.supported) {
                l.e('The browser\'s FileReader object does not support readAsArrayBuffer');
                return;
            }

            if (typeof con.cryptoMd5Method !== 'function') {
                l.e('Option computeContentMd5 has been set but cryptoMd5Method is not defined.');
                return;
            }

            if (con.awsSignatureVersion === '4') {
                if (typeof con.cryptoHexEncodedHash256 !== 'function') {
                    l.e('Option awsSignatureVersion is 4 but cryptoHexEncodedHash256 is not defined.');
                    return;
                }
            }
        } else if (con.awsSignatureVersion === '4') {
            l.e('Option awsSignatureVersion is 4 but computeContentMd5 is not enabled.');
            return;
        }

        if (!con.logging) {
            // Reset the logger to be a no_op
            l = noOpLogger();
        }

        var historyCache = {
            supported: (function () {
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
            })(),
            getItem: function (key) {
                if (this.supported) {
                    return localStorage.getItem(key)
                }
            },
            setItem: function (key, value) {
                if (this.supported) {
                    return localStorage.setItem(key, value);
                }
            },
            clear: function () {
                if (this.supported) {
                    return localStorage.clear();
                }
            },
            key: function (key) {
                if (this.supported) {
                    return localStorage.key(key);
                }
            },
            removeItem: function (key) {
                if (this.supported) {
                    return localStorage.removeItem(key);
                }
            }
        };

        var AWS_URL;
        if (con.s3Acceleration) {
            AWS_URL = ['https://', con.bucket, '.s3-accelerate.amazonaws.com'].join('');
            con.cloudfront = true;
        } else {
            AWS_URL = con.aws_url || ["https://", (con.cloudfront ? con.bucket + "." : ""), "s3.amazonaws.com"].join("");
        }
        var AWS_HOST = uri(AWS_URL).hostname;

        var _d = new Date(),
            HOURS_AGO = new Date(_d.setHours(_d.getHours() - (con.s3FileCacheHoursAgo || -100))),
            localTimeOffset = 0;

        if (con.timeUrl) {
            var xhr = new XMLHttpRequest();

            xhr.open("GET", con.timeUrl + '?requestTime=' + new Date().getTime());
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var server_date = new Date(Date.parse(xhr.responseText)),
                            now = new Date();
                        localTimeOffset = now - server_date;
                        l.d('localTimeOsset is', localTimeOffset, 'ms');
                    }
                }
            };

            xhr.onerror = function () {
                l.e('xhr error timeUrl', xhr);
            };
            xhr.send();
        }

        //con.simulateStalling =  true

        _.add = function (file,  pConfig) {
            var c = extend(pConfig, {});

            IMMUTABLE_OPTIONS.map(function (a) { delete c[a]; });

            var fileConfig = extend(con, c);

            l.d('add');
            var err;
            if (typeof file === 'undefined') {
                return 'Missing file';
            }
            if (fileConfig.maxFileSize && file.size > fileConfig.maxFileSize) {
                return 'File size too large. Maximum size allowed is ' + fileConfig.maxFileSize;
            }
            if (typeof file.name === 'undefined') {
                err = 'Missing attribute: name  ';
            } else if (fileConfig.encodeFilename) {
                file.name = encodeURIComponent(file.name); // prevent signature fail in case file name has spaces
            }

            /*if (!(file.file instanceof File)){
             err += '.file attribute must be instanceof File';
             }*/
            if (err) { return err; }

            var newId = addFile(file, fileConfig);
            asynProcessQueue();
            return newId;
        };

        _.cancel = function (id) {

            l.d('cancel ', id);
            if (files[id]) {
                files[id].stop();
                return true;
            } else {
                return false;
            }
        };

        _.pause = function (id) {};

        _.resume = function (id) {};

        _.forceRetry = function () {};

        function addFile(file, fileConfig) {

            var id = files.length;
            files.push(new FileUpload(extend({
                started: function () {},
                progress: function () {},
                complete: function () {},
                cancelled: function () {},
                info: function () {},
                warn: function () {},
                error: function () {},
                xAmzHeadersAtInitiate: {},
                notSignedHeadersAtInitiate: {},
                xAmzHeadersAtUpload: {},
                xAmzHeadersAtComplete: {}
            }, file, {
                id: id,
                status: PENDING,
                priority: 0,
                onStatusChange: onFileUploadStatusChange,
                loadedBytes: 0,
                sizeBytes: file.file.size,
                eTag: ''
            }), fileConfig));
            return id;
        }

        function onFileUploadStatusChange() {
            l.d('onFileUploadStatusChange');
            processQueue();
        }


        function asynProcessQueue() {
            setTimeout(processQueue,1);
        }

        function processQueue() {
            l.d('processQueue   length: ' + files.length);
            var next = -1, priorityOfNext = -1, readyForNext = true;
            files.forEach(function (file, i) {

                if (file.priority > priorityOfNext && file.status === PENDING) {
                    next = i;
                    priorityOfNext = file.priority;
                }

                if (file.status === EVAPORATING) {
                    readyForNext = false;
                }
            });

            if (readyForNext && next >= 0) {
                files[next].start();
            }
        }


        function FileUpload(file, con) {
            var me = this, parts = [], completedParts = [], progressTotalInterval, progressPartsInterval, countUploadAttempts = 0,
                countInitiateAttempts = 0, countCompleteAttempts = 0;
            extend(me,file);

            me.start = function () {
                l.d('starting FileUpload ' + me.id);
                me.started();
                setStatus(EVAPORATING);

                var awsKey = me.name;

                getUnfinishedFileUpload();

                if (typeof me.uploadId === 'undefined') {
                    initiateUpload(awsKey);
                } else {
                    if (typeof me.eTag === 'undefined' || !me.firstMd5Digest) {
                        getUploadParts(0);
                    } else {
                        var reader = new FileReader();
                        reader.onloadend = function () {
                            var md5_digest = con.cryptoMd5Method.call(this, this.result);
                            if (con.allowS3ExistenceOptimization && me.firstMd5Digest === md5_digest) {
                                headObject(awsKey);
                            } else {
                                me.firstMd5Digest = md5_digest; // let's store the digest to avoid having to calculate it again
                                initiateUpload(awsKey);
                            }
                        };
                        reader.readAsArrayBuffer(getFilePart(me.file, 0, con.partSize));
                    }
                }
            };

            me.stop = function () {
                l.d('stopping FileUpload ', me.id);
                me.cancelled();
                setStatus(CANCELED);
                me.info('Canceling uploads...');
                cancelAllRequests();
            };

            function setStatus(s) {
                if (s === COMPLETE || s === ERROR || s === CANCELED) {
                    clearInterval(progressTotalInterval);
                    clearInterval(progressPartsInterval);
                }
                me.status = s;
                me.onStatusChange();
            }

            function cancelAllRequests() {
                l.d('cancelAllRequests()');

                for (var i = 1; i < parts.length; i++) {
                    abortPart(i, true);
                }

                abortUpload();
            }


            function processFileParts() {
                if (con.computeContentMd5 && me.file.size > 0) {
                    processPartsListWithMd5Digests();
                } else {
                    createUploadFile();
                    processPartsList();
                }
            }

            function initiateUpload(awsKey) { // see: http://docs.amazonwebservices.com/AmazonS3/latest/API/mpUploadInitiate.html
                var initiate = {
                        method: 'POST',
                        path: getPath() + '?uploads',
                        step: 'initiate',
                        x_amz_headers: me.xAmzHeadersAtInitiate,
                        not_signed_headers: me.notSignedHeadersAtInitiate
                    },
                    originalStatus = me.status,
                    hasErrored;

                if (me.contentType) {
                    initiate.contentType = me.contentType;
                }

                initiate.onErr = function (xhr) {
                    if (hasErrored || me.status === ABORTED || me.status === CANCELED) {
                        return;
                    }

                    hasErrored = true;

                    l.d('onInitiateError for FileUpload ' + me.id);
                    me.warn('Error initiating upload', getAwsResponse(xhr));
                    setStatus(ERROR);

                    xhr.abort();

                    setTimeout(function () {
                        if (me.status !== ABORTED && me.status !== CANCELED) {
                            me.status = originalStatus;
                            initiateUpload(awsKey);
                        }
                    }, backOffWait(countInitiateAttempts++));
                };

                initiate.on200 = function (xhr) {

                    var match = xhr.response.match(/<UploadId>(.+)<\/UploadId>/);
                    if (match && match[1]) {
                        me.uploadId = match[1];
                        me.awsKey = awsKey;
                        l.d('requester success. got uploadId ' + me.uploadId);
                        makeParts();
                        processFileParts();
                    } else {
                        initiate.onErr(xhr);
                    }
                };

                setupRequest(initiate);
                authorizedSend(initiate);

                monitorProgress();
            }


            function uploadPart(partNumber) {  //http://docs.amazonwebservices.com/AmazonS3/latest/API/mpUploadUploadPart.html
                var backOff, hasErrored, upload, part;

                part = parts[partNumber];

                part.status = EVAPORATING;
                countUploadAttempts++;
                part.loadedBytesPrevious = null;

                backOff = backOffWait(part.attempts++);
                l.d('uploadPart #' + partNumber + '     will wait ' + backOff + 'ms to try');

                upload = {
                    method: 'PUT',
                    path: getPath() + '?partNumber=' + partNumber + '&uploadId=' + me.uploadId,
                    step: 'upload #' + partNumber,
                    x_amz_headers: me.xAmzHeadersAtUpload,
                    md5_digest: part.md5_digest,
                    contentSha256: "UNSIGNED-PAYLOAD",
                    attempts: part.attempts,
                    part: part
                };

                upload.onErr = function (xhr, isOnError) {

                    if (me.status === CANCELED || me.status === ABORTED) {
                        return;
                    }

                    var msg = 'problem uploading part #' + partNumber + ',   http status: ' + xhr.status +
                        ',   hasErrored: ' + !!hasErrored + ',   part status: ' + part.status +
                        ',   readyState: ' + xhr.readyState + (isOnError ? ',   isOnError' : '');

                    l.w(msg);
                    me.warn(msg);

                    if (hasErrored) {
                        return;
                    }
                    hasErrored = true;

                    if (xhr.status === 404) {
                        var errMsg = '404 error resulted in abortion of both this part and the entire file.';
                        l.w(errMsg + ' Server response: ' + xhr.response);
                        me.error(errMsg);
                        part.status = ABORTED;
                        abortUpload();
                    } else {
                        part.status = ERROR;
                        part.loadedBytes = 0;

                        var awsResponse = getAwsResponse(xhr);
                        if (awsResponse.code) {
                            l.e('AWS Server response: code="' + awsResponse.code + '", message="' + awsResponse.msg + '"');
                        }
                        processPartsList();
                    }
                    xhr.abort();
                };

                upload.on200 = function (xhr) {

                    var eTag = xhr.getResponseHeader('ETag'), msg;
                    l.d('uploadPart 200 response for part #' + partNumber + '     ETag: ' + eTag);
                    if (part.isEmpty || (eTag !== ETAG_OF_0_LENGTH_BLOB)) { // issue #58
                        part.eTag = eTag;
                        part.status = COMPLETE;
                    } else {
                        part.status = ERROR;
                        part.loadedBytes = 0;
                        msg = 'eTag matches MD5 of 0 length blob for part #' + partNumber  + '   Retrying part.';
                        l.w(msg);
                        me.warn(msg);
                    }
                    processPartsList();
                };

                upload.onProgress = function (evt) {
                    part.loadedBytes = evt.loaded;
                };

                upload.toSend = function () {
                    var slice = getFilePart(me.file, part.start, part.end);
                    l.d('part # ' + partNumber + ' (bytes ' + part.start + ' -> ' + part.end + ')  reported length: ' + slice.size);
                    if (!part.isEmpty && slice.size === 0) { // issue #58
                        l.w('  *** WARN: blob reporting size of 0 bytes. Will try upload anyway..');
                    }
                    return slice;
                };

                upload.onFailedAuth = function () {
                    var msg = 'onFailedAuth for uploadPart #' + partNumber + '.   Will set status to ERROR';
                    l.w(msg);
                    me.warn(msg);
                    part.status = ERROR;
                    part.loadedBytes = 0;
                    processPartsList();
                };

                setupRequest(upload);

                setTimeout(function () {
                    if (me.status !== ABORTED && me.status !== CANCELED) {
                        authorizedSend(upload);
                        l.d('upload #', partNumber, upload);
                    }
                }, backOff);

                part.uploader = upload;
            }

            function abortPart(partNumber, clearReadyStateCallback) {

                var part = parts[partNumber];
                if (part.currentXhr) {
                    if (!!clearReadyStateCallback) {
                        part.currentXhr.onreadystatechange = function () {};
                    }
                    part.currentXhr.abort();
                }
            }



            function completeUpload() { //http://docs.amazonwebservices.com/AmazonS3/latest/API/mpUploadComplete.html

                l.d('completeUpload');
                me.info('will attempt to complete upload');

                var completeDoc = [],
                    originalStatus = me.status,
                    hasErrored;

                completeDoc.push('<CompleteMultipartUpload>');
                parts.forEach(function (part, partNumber) {
                    if (part) {
                        completeDoc.push(['<Part><PartNumber>', partNumber, '</PartNumber><ETag>', part.eTag, '</ETag></Part>'].join(""));
                    }
                });
                completeDoc.push('</CompleteMultipartUpload>');

                var complete = {
                    method: 'POST',
                    contentType: 'application/xml; charset=UTF-8',
                    path: getPath() + '?uploadId=' + me.uploadId,
                    x_amz_headers: me.xAmzHeadersAtComplete,
                    step: 'complete'
                };

                complete.onErr = function (xhr) {
                    if (hasErrored || me.status === ABORTED || me.status === CANCELED) {
                        return;
                    }

                    hasErrored = true;

                    var msg = 'Error completing upload.';
                    l.w(msg, getAwsResponse(xhr));
                    me.error(msg);
                    setStatus(ERROR);

                    xhr.abort();

                    setTimeout(function () {
                        if (me.status !== ABORTED && me.status !== CANCELED) {
                            me.status = originalStatus;
                            completeUpload();
                            monitorProgress();
                        }
                    }, backOffWait(countCompleteAttempts++));
                };

                complete.on200 = function (xhr) {
                    var oDOM = parseXml(xhr.responseText),
                        result = oDOM.getElementsByTagName("CompleteMultipartUploadResult")[0];
                    me.eTag = nodeValue(result, "ETag");
                    me.complete(xhr, me.name);
                    completeUploadFile();
                };

                complete.toSend = function () {
                    return completeDoc.join("");
                };

                setupRequest(complete);
                authorizedSend(complete);
            }

            function headObject(awsKey) { //http://docs.amazonwebservices.com/AmazonS3/latest/API/mpUploadComplete.html
                l.d('headObject');
                me.info('will attempt to verify existence of the file');

                var head_object = {
                    method: 'HEAD',
                    path: getPath(),
                    step: 'head_object'
                };

                head_object.onErr = function () {
                    var msg = 'Error completing head object. Will re-upload file.';
                    l.w(msg);
                    initiateUpload(awsKey);
                };

                head_object.on200 = function (xhr) {
                    var eTag = xhr.getResponseHeader('Etag');
                    if (eTag === me.eTag) {
                        l.d('headObject found matching object on S3.');
                        me.progress(1.0);
                        me.complete(xhr, me.name);
                        setStatus(COMPLETE);
                    } else {
                        l.d('headObject not found on S3.');
                        initiateUpload(awsKey);
                    }
                };

                setupRequest(head_object);
                authorizedSend(head_object);
            }

            var numDigestsProcessed = 0,
                numParts = -1;

            function computePartMd5Digest(part) {
                return function () {
                    var s = me.status;
                    if (s === ERROR || s === CANCELED || s === ABORTED) {
                        return;
                    }

                    var md5_digest = con.cryptoMd5Method.call(this, this.result);

                    l.d(['part #', part.part, ' MD5 digest is ', md5_digest].join(''));
                    part.md5_digest = md5_digest;

                    if (part.part === 1) {
                        createUploadFile();
                    }

                    delete part.reader; // release potentially large memory allocation

                    numDigestsProcessed += 1;

                    processPartsList();

                    if (numDigestsProcessed === numParts) {
                        l.d('All parts have MD5 digests');
                    }

                    setTimeout(processPartsListWithMd5Digests, 1500);
                }
            }

            function processPartsListWithMd5Digests() {
                // We need the request body to compute the MD5 checksum but the body is only available
                // as a FileReader object whose value is fetched asynchronously.

                // This method delays submitting the part for upload until its MD5 digest is ready
                for (var i = 1; i <= numParts; i++) {
                    var part = parts[i];
                    if (part.status !== COMPLETE && part.md5_digest === null) {
                        if (i > 1 || typeof me.firstMd5Digest === 'undefined') {
                            part.reader = new FileReader();
                            part.reader.onloadend = computePartMd5Digest(part);
                            part.reader.readAsArrayBuffer(getFilePart(me.file, part.start, part.end));
                            break;
                        } else { // We already calculated the first part's md5_digest
                            part.md5_digest = me.firstMd5Digest;
                            createUploadFile();
                            processPartsList();
                        }
                    }
                }
            }

            function abortUpload() { //http://docs.amazonwebservices.com/AmazonS3/latest/API/mpUploadAbort.html

                l.d('abortUpload');
                me.info('will attempt to abort the upload');

                if(typeof me.uploadId === 'undefined') {
                    setStatus(ABORTED);
                    return;
                }

                var abort = {
                    method: 'DELETE',
                    path: getPath() + '?uploadId=' + me.uploadId,
                    step: 'abort',
                    successStatus: 204
                };

                abort.onErr = function () {
                    var msg = 'Error aborting upload.';
                    l.w(msg);
                    me.error(msg);
                };

                abort.on200 = function () {
                    setStatus(ABORTED);
                    checkForParts();
                };

                setupRequest(abort);
                authorizedSend(abort);
            }

            function checkForParts() { //http://docs.amazonwebservices.com/AmazonS3/latest/API/mpUploadListParts.html

                l.d('listParts');
                me.info('list parts');

                var list = {
                    method: 'GET',
                    path: getPath() + '?uploadId=' + me.uploadId,
                    step: 'list'
                };

                list.onErr = function (xhr) {
                    if (xhr.status === 404) {
                        // Success! Parts are not found because the uploadid has been cleared
                        removeUploadFile();
                        me.info('upload canceled');
                    } else {
                        var msg = 'Error listing parts.';
                        l.w(msg, getAwsResponse(xhr));
                        me.error(msg);
                    }
                };

                list.on200 = function (xhr) {
                    var oDOM = parseXml(xhr.responseText);
                    var parts = oDOM.getElementsByTagName("Part");
                    if (parts.length) { // Some parts are still uploading
                        l.d('Parts still found after abort...waiting.');
                        setTimeout(function () { abortUpload(); }, 1000);
                    } else {
                        me.info('upload canceled');
                    }
                };

                setupRequest(list);
                authorizedSend(list);
            }


            function getUploadParts(partNumberMarker) { //http://docs.amazonwebservices.com/AmazonS3/latest/API/mpUploadListParts.html

                l.d('getUploadParts() for uploadId starting at part # ' + partNumberMarker);
                me.info('getUploadParts() for uploadId starting at part # ' + partNumberMarker);

                var list = {
                    method: 'GET',
                    path: [getPath(), '?uploadId=', me.uploadId, "&part-number-marker=" + partNumberMarker].join(""),
                    step: 'get upload parts'
                };

                list.onErr = function (xhr) {
                    if (xhr.status === 404) {
                        // Success! Upload is no longer recognized, so there is nothing to fetch
                        me.info(['uploadId ', me.uploadId, ' does not exist.'].join(''));
                        removeUploadFile();
                        monitorProgress();
                        makeParts();
                        processPartsList();
                    } else {
                        var msg = 'Error listing parts for getUploadParts() starting at part # ' + partNumberMarker;
                        l.w(msg, getAwsResponse(xhr));
                        me.error(msg);
                    }
                };

                list.on200 = function (xhr) {
                    me.info(['uploadId ', me.uploadId, ' is not complete. Fetching parts from part marker=', partNumberMarker].join(''));
                    var oDOM = parseXml(xhr.responseText),
                        listPartsResult = oDOM.getElementsByTagName("ListPartsResult")[0],
                        isTruncated = nodeValue(listPartsResult, "IsTruncated") === 'true',
                        uploadedParts = oDOM.getElementsByTagName("Part"),
                        uploadedPart,
                        parts_len = uploadedParts.length,
                        cp;

                    for (var i = 0; i < parts_len; i++) {
                        cp = uploadedParts[i];
                        completedParts.push({
                            eTag: nodeValue(cp, "ETag"),
                            partNumber: parseInt(nodeValue(cp, "PartNumber")),
                            size: parseInt(nodeValue(cp, "Size")),
                            LastModified: nodeValue(cp, "LastModified")
                        });
                    }

                    oDOM = uploadedParts = null; // We don't need these potentially large objects any longer

                    if (isTruncated) {
                        var nextPartNumberMarker = nodeValue(listPartsResult, "NextPartNumberMarker");
                        getUploadParts(nextPartNumberMarker); // let's fetch the next set of parts
                    } else {
                        makeParts();
                        completedParts.forEach(function (cp) {
                            uploadedPart = makePart(cp.partNumber, COMPLETE, cp.size);
                            uploadedPart.eTag = cp.eTag;
                            uploadedPart.attempts = 1;
                            uploadedPart.loadedBytes = cp.size;
                            uploadedPart.loadedBytesPrevious = cp.size;
                            uploadedPart.finishedUploadingAt = cp.LastModified;
                            uploadedPart.md5_digest = 'n/a';
                            parts[cp.partNumber] = uploadedPart;
                        });
                        monitorProgress();
                        processFileParts();
                    }
                    listPartsResult = null;  // We don't need these potentially large object any longer
                };

                setupRequest(list);
                authorizedSend(list);
            }

            function makeParts() {

                numParts = Math.ceil(me.file.size / con.partSize) || 1; // issue #58
                for (var part = 1; part <= numParts; part++) {
                    var status = (typeof parts[part] === 'undefined') ? PENDING : parts[part].status;

                    if (status !== COMPLETE) {
                        parts[part] = makePart(part, PENDING, me.file.size);
                    }
                }
            }

            function makePart(partNumber, status, size) {
                return {
                    status: status,
                    start: (partNumber - 1) * con.partSize,
                    end: partNumber * con.partSize,
                    attempts: 0,
                    loadedBytes: 0,
                    loadedBytesPrevious: null,
                    isEmpty: (size === 0), // issue #58
                    md5_digest: null,
                    part: partNumber
                };
            }

            function createUploadFile() {
                var fileKey = uploadKey(me),
                    newUpload = {
                        awsKey: me.name,
                        bucket: con.bucket,
                        uploadId: me.uploadId,
                        fileSize: me.file.size,
                        fileType: me.file.type,
                        lastModifiedDate: dateISOString(me.file.lastModifiedDate),
                        partSize: con.partSize,
                        signParams: me.signParams,
                        createdAt: new Date().toISOString()
                    };
                if (con.computeContentMd5 && parts.length && typeof parts[1].md5_digest !== 'undefined') {
                    newUpload.firstMd5Digest = parts[1].md5_digest;
                }
                saveUpload(fileKey, newUpload);
            }

            function completeUploadFile() {
                var uploads = getSavedUploads(),
                    upload = uploads[uploadKey(me)];

                if (typeof upload !== 'undefined') {
                    upload.completedAt = new Date().toISOString();
                    upload.eTag = me.eTag;
                    historyCache.setItem('awsUploads', JSON.stringify(uploads));
                }

                setStatus(COMPLETE);
                me.progress(1.0);

            }

            function removeUploadFile() {
                if (typeof me.file !== 'undefined') {
                    removeUpload(uploadKey(me));
                }
            }

            function getUnfinishedFileUpload() {
                var savedUploads = getSavedUploads(true),
                    u = savedUploads[uploadKey(me)];

                if (canRetryUpload(u)) {
                    me.uploadId = u.uploadId;
                    me.name = u.awsKey;
                    me.eTag = u.eTag;
                    me.firstMd5Digest = u.firstMd5Digest;
                    me.signParams = u.signParams;
                }
            }

            function canRetryUpload(u) {
                // Must be the same file name, file size, last_modified, file type as previous upload
                if (typeof u === 'undefined') {
                    return false;
                }
                var completedAt = new Date(u.completedAt || FAR_FUTURE);

                // check that the part sizes and bucket match, and if the file name of the upload
                // matches if onlyRetryForSameFileName is true
                return con.partSize === u.partSize 
                    && completedAt > HOURS_AGO 
                    && con.bucket === u.bucket
                    && (con.onlyRetryForSameFileName ? me.name === u.awsKey : true);
            }

            function backOffWait(attempts) {
                return (attempts === 1) ? 0 : 1000 * Math.min(
                    con.maxRetryBackoffSecs,
                    Math.pow(con.retryBackoffPower, attempts - 2)
                );
            }

            function processPartsList() {

                var evaporatingCount = 0, finished = true, anyPartHasErrored = false, stati = [], bytesLoaded = [], info;

                if (me.status !== EVAPORATING) {
                    me.info('will not process parts list, as not currently evaporating');
                    return;
                }

                for (var i = 0; i < parts.length; i++) {
                    var part = parts[i];
                    if (part) {
                        if (con.computeContentMd5 && part.md5_digest === null) {
                            return; // MD5 Digest isn't ready yet
                        }
                        var requiresUpload = false;
                        stati.push(part.status);
                        switch (part.status) {

                            case EVAPORATING:
                                finished = false;
                                evaporatingCount++;
                                bytesLoaded.push(part.loadedBytes);
                                break;

                            case ERROR:
                                anyPartHasErrored = true;
                                requiresUpload = true;
                                break;

                            case PENDING:
                                requiresUpload = true;
                                break;

                            default:
                                break;
                        }

                        if (requiresUpload) {
                            finished = false;
                            if (evaporatingCount < con.maxConcurrentParts) {
                                uploadPart(i);
                                evaporatingCount++;
                            }
                        }
                    }
                }


                info = stati.toString() + ' // bytesLoaded: ' + bytesLoaded.toString();
                l.d('processPartsList()  anyPartHasErrored: ' + anyPartHasErrored,info);

                if (countUploadAttempts >= (parts.length - 1) || anyPartHasErrored) {
                    me.info('part stati: ' + info);
                }
                // parts.length is always 1 greater than the actually number of parts, because AWS part numbers start at 1, not 0, so for a 3 part upload, the parts array is: [undefined, object, object, object], which has length 4.

                if (finished) {
                    completeUpload();
                }
            }


            function monitorTotalProgress() {

                progressTotalInterval = setInterval(function () {

                    var totalBytesLoaded = 0;
                    parts.forEach(function (part) {
                        totalBytesLoaded += part.loadedBytes;
                    });

                    me.progress(totalBytesLoaded/me.sizeBytes);
                }, con.progressIntervalMS);
            }


            /*
             Issue #6 identified that some parts would stall silently.
             The issue was only noted on Safari on OSX. A bug was filed with Apple, #16136393
             This function was added as a work-around. It checks the progress of each part every 2 minutes.
             If it finds a part that has made no progress in the last 2 minutes then it aborts it. It will then be detected as an error, and restarted in the same manner of any other errored part
             */
            function monitorPartsProgress() {

                progressPartsInterval = setInterval(function () {

                    l.d('monitorPartsProgress() ' + new Date());
                    parts.forEach(function (part, i) {

                        var healthy;

                        if (part.status !== EVAPORATING) {
                            l.d(i, 'not evaporating ');
                            return;
                        }

                        if (part.loadedBytesPrevious === null) {
                            l.d(i,'no previous ');
                            part.loadedBytesPrevious = part.loadedBytes;
                            return;
                        }

                        healthy = part.loadedBytesPrevious < part.loadedBytes;
                        if (con.simulateStalling && i === 4) {
                            if (Math.random() < 0.25) {
                                healthy = false;
                            }
                        }

                        l.d(i, (healthy ? 'moving. ' : 'stalled.'), part.loadedBytesPrevious, part.loadedBytes);

                        if (!healthy) {
                            setTimeout(function () {
                                me.info('part #' + i + ' stalled. will abort. ' + part.loadedBytesPrevious + ' ' + part.loadedBytes);
                                abortPart(i);
                            },0);
                        }

                        part.loadedBytesPrevious = part.loadedBytes;
                    });
                },2 * 60 * 1000);
            }

            function monitorProgress() {
                monitorTotalProgress();
                monitorPartsProgress();
            }

            function setupRequest(requester) {
                requester.getPayload = function () {
                    return requester.toSend ? requester.toSend() : null;
                };

                requester.getPayloadSha256Content = function () {
                    var result = requester.contentSha256 || con.cryptoHexEncodedHash256(requester.getPayload() || '');
                    l.d('getPayloadSha256Content', result);
                    return result;
                };

                l.d('setupRequest()',requester);

                var datetime = con.timeUrl ? new Date(new Date().getTime() + localTimeOffset) : new Date();
                if (con.awsSignatureVersion === '4') {
                    requester.dateString = datetime.toISOString().slice(0, 19).replace(/-|:/g, '') + "Z";
                } else {
                    requester.dateString = datetime.toUTCString();
                }

                requester.x_amz_headers = extend(requester.x_amz_headers, {
                    'x-amz-date': requester.dateString
                });

                requester.onGotAuth = function () {

                    if (hasCurrentXhr(requester)) {
                        l.w('onGotAuth() step', requester.step, 'is already in progress. Returning.');
                        return;
                    }

                    var xhr = assignCurrentXhr(requester);

                    var payload = requester.getPayload();
                    var url = AWS_URL + requester.path;
                    if (requester.query_string) {
                        url += requester.query_string;
                    }
                    var all_headers = {};
                    var status_success = requester.successStatus || 200;

                    extend(all_headers, requester.not_signed_headers);
                    extend(all_headers, requester.x_amz_headers);

                    if (con.simulateErrors && requester.attempts === 1 && requester.step === 'upload #3') {
                        l.d('simulating error by POST part #3 to invalid url');
                        url = 'https:///foo';
                    }

                    xhr.open(requester.method, url);
                    xhr.setRequestHeader('Authorization', authorizationMethod(requester));

                    for (var key in all_headers) {
                        if (all_headers.hasOwnProperty(key)) {
                            xhr.setRequestHeader(key, all_headers[key]);
                        }
                    }

                    if (con.awsSignatureVersion === '4') {
                        xhr.setRequestHeader("x-amz-content-sha256", requester.getPayloadSha256Content());
                    }

                    if (requester.contentType) {
                        xhr.setRequestHeader('Content-Type', requester.contentType);
                    }

                    if (requester.md5_digest) {
                        xhr.setRequestHeader('Content-MD5', requester.md5_digest);
                    }
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {

                            if (payload) {
                                // Test, per http://code.google.com/p/chromium/issues/detail?id=167111#c20
                                l.d('  ### ' + payload.size);
                            }
                            clearCurrentXhr(requester);
                            if (xhr.status === status_success) {
                                requester.on200(xhr);
                            } else {
                                requester.onErr(xhr);
                            }
                        }
                    };

                    xhr.onerror = function () {
                        clearCurrentXhr(requester);
                        requester.onErr(xhr, true);
                    };

                    if (typeof requester.onProgress === 'function') {
                        xhr.upload.onprogress = function (evt) {
                            requester.onProgress(evt);
                        };
                    }
                    xhr.send(payload);
                };

                requester.onFailedAuth = requester.onFailedAuth || function (xhr) {
                        me.error('Error onFailedAuth for step: ' + requester.step);
                        requester.onErr(xhr);
                    };
            }


            //see: http://docs.amazonwebservices.com/AmazonS3/latest/dev/RESTAuthentication.html#ConstructingTheAuthenticationHeader
            function authorizedSend(authRequester) {

                l.d('authorizedSend() ' + authRequester.step);
                if (hasCurrentXhr(authRequester)) {
                    l.w('authorizedSend() step', authRequester.step, 'is already in progress. Returning.');
                    return;
                }

                if (con.awsLambda) {
                    return authorizedSignWithLambda(authRequester);
                }

                var xhr = assignCurrentXhr(authRequester),
                    url = [con.signerUrl, '?to_sign=', stringToSignMethod(authRequester), '&datetime=', authRequester.dateString].join(''),
                    warnMsg;

                var signParams = makeSignParamsObject(me.signParams);
                for (var param in signParams) {
                    if (!signParams.hasOwnProperty(param)) { continue; }
                    url += ('&' + encodeURIComponent(param) + '=' + encodeURIComponent(signParams[param]));
                }

                xhr.onreadystatechange = function () {

                    if (xhr.readyState === 4) {

                        if (xhr.status === 200) {
                            var payload = signResponse(xhr.response);

                            if (con.awsSignatureVersion === '2' &&  payload.length !== 28) {
                                warnMsg = 'failed to get authorization (readyState=4) for ' + authRequester.step + '.  xhr.status: ' + xhr.status + '.  xhr.response: ' + xhr.response;
                                l.w(warnMsg);
                                me.warn(warnMsg);
                                clearCurrentXhr(authRequester);
                                authRequester.onFailedAuth(xhr);
                            } else {
                              l.d('authorizedSend got signature for step: \'' + authRequester.step + '\'    sig: ' + payload);
                              authRequester.auth = payload;
                              clearCurrentXhr(authRequester);
                              authRequester.onGotAuth();
                            }
                        } else {
                            warnMsg = 'failed to get authorization (readyState=4) for ' + authRequester.step + '.  xhr.status: ' + xhr.status + '.  xhr.response: ' + xhr.response;
                            l.w(warnMsg);
                            me.warn(warnMsg);
                            clearCurrentXhr(authRequester);
                            authRequester.onFailedAuth(xhr);
                        }
                    }
                };

                xhr.onerror = function () {
                    warnMsg = 'failed to get authorization (onerror) for ' + authRequester.step + '.  xhr.status: ' + xhr.status + '.  xhr.response: ' + xhr.response;
                    l.w(warnMsg);
                    me.warn(warnMsg);
                    authRequester.onFailedAuth(xhr);
                };

                xhr.open('GET', url);
                var signHeaders = makeSignParamsObject(me.signHeaders);
                for (var header in signHeaders) {
                    if (!signHeaders.hasOwnProperty(header)) { continue; }
                    xhr.setRequestHeader(header, signHeaders[header])
                }

                if (typeof me.beforeSigner  === 'function') {
                    me.beforeSigner(xhr, url);
                }
                xhr.send();
            }

            function authorizedSignWithLambda(authRequester) {
                con.awsLambda.invoke({
                    FunctionName: con.awsLambdaFunction,
                    InvocationType: 'RequestResponse',
                    Payload: JSON.stringify({
                        to_sign: makeStringToSign(authRequester),
                        sign_params: makeSignParamsObject(me.signParams),
                        sign_headers: makeSignParamsObject(me.signHeaders)
                    })
                }, function (err, data) {
                    if (err) {
                        var warnMsg = 'failed to get authorization with lambda ' + err;
                        l.w(warnMsg);
                        me.warn(warnMsg);
                        authRequester.onFailedAuth(err);
                        return;
                    }
                    var payload = signResponse(JSON.parse(data.Payload));
                    authRequester.auth = payload;
                    authRequester.onGotAuth();
                });
            }

            function stringToSignMethod(request) {
                return encodeURIComponent(con.awsSignatureVersion === '4' ? stringToSignV4(request) : makeStringToSign(request));
            }

            function signResponse(payload) {
                if (typeof con.signResponseHandler === 'function') {
                    payload = con.signResponseHandler(payload) || payload;
                }

                return payload;
            }

            function makeSignParamsObject(params) {
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
            }

            function authorizationMethod(request) {
                return con.awsSignatureVersion === '4' ? authorizationV4(request) : authorizationV2(request);
            }

            function makeStringToSign(request) {

                var x_amz_headers = '', result, header_key_array = [];

                for (var key in request.x_amz_headers) {
                    if (request.x_amz_headers.hasOwnProperty(key)) {
                        header_key_array.push(key);
                    }
                }
                header_key_array.sort();

                header_key_array.forEach(function (header_key) {
                    x_amz_headers += (header_key + ':' + request.x_amz_headers[header_key] + '\n');
                });

                result = request.method + '\n' +
                    (request.md5_digest || '') + '\n' +
                    (request.contentType || '') + '\n' +
                    '\n' +
                    x_amz_headers +
                    (con.cloudfront ? '/' + con.bucket : '') +
                    request.path;

                l.d('makeStringToSign (V2)', result);
                return result;
            }

            function stringToSignV4(request) {
                var parts = [];
                parts.push('AWS4-HMAC-SHA256');
                parts.push(request.dateString);
                parts.push(credentialStringV4(request));
                parts.push(con.cryptoHexEncodedHash256(canonicalRequestV4(request)));
                var result = parts.join('\n');

                l.d('makeStringToSign (V2)', result);
                return result;
            }

            function authorizationV2(request) {
                return ['AWS ', con.aws_key, ':', request.auth].join('');
            }

            function authorizationV4(request) {
                var parts = [];

                var credentials = credentialStringV4(request);
                var headers = canonicalHeadersV4(request);

                parts.push(['AWS4-HMAC-SHA256 Credential=', con.aws_key, '/', credentials].join(''));
                parts.push('SignedHeaders=' + headers.signedHeaders);
                parts.push('Signature=' + request.auth);

                return parts.join(', ');
            }

            function credentialStringV4(request) {
                var parts = [];

                parts.push(request.dateString.slice(0, 8));
                parts.push(con.awsRegion);
                parts.push('s3');
                parts.push('aws4_request');
                return parts.join('/');
            }

            function canonicalRequestV4(request) {
                var parts = [];

                parts.push(request.method);
                parts.push(uri(request.path).pathname);
                parts.push(canonicalQueryStringV4(request) || '');

                var headers = canonicalHeadersV4(request);
                parts.push(headers.canonicalHeaders + '\n');
                parts.push(headers.signedHeaders);
                parts.push(request.getPayloadSha256Content());

                var result = parts.join("\n");
                l.d('CanonicalRequest', result);
                return result;
            }

            function canonicalQueryStringV4(request) {
                var search = uri(request.path).search,
                    parts = search.split('&'),
                    encoded = [],
                    nameValue,
                    i;

                for (i = 0; i < parts.length; i++) {
                    nameValue = parts[i].split("=");
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
            }

            function canonicalHeadersV4(request) {
                var canonicalHeaders = [],
                    keys = [],
                    i;

                function addHeader(name, value) {
                    var key = name.toLowerCase();
                    keys.push(key);
                    canonicalHeaders[key] = value.replace(/\s+/g, ' ');
                }

                if (request.md5_digest) {
                    addHeader("Content-Md5", request.md5_digest);
                }

                addHeader('Host', AWS_HOST);

                if (request.contentType) {
                    addHeader('Content-Type', request.contentType || '');
                }

                var amzHeaders = request.x_amz_headers || {};
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
                    not_signed = request.not_signed_headers || [],
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
            }

            function getPath() {
                var path = '/' + con.bucket + '/' + me.name;
                if (con.cloudfront || AWS_URL.indexOf('cloudfront') > -1) {
                    path = '/' + me.name;
                }
                return path;
            }

            function getBaseXhrObject(requester) {
                // The Xhr is either on the upload or on a part...
                return (typeof requester.part === 'undefined') ? requester : requester.part;
            }

            function hasCurrentXhr(requester) {
                return !!getBaseXhrObject(requester).currentXhr;
            }

            function assignCurrentXhr(requester) {
                return getBaseXhrObject(requester).currentXhr =  new XMLHttpRequest();
            }

            function clearCurrentXhr(requester) {
                delete getBaseXhrObject(requester).currentXhr;
            }
        }


        function extend(obj1, obj2, obj3) {
            obj1 = typeof obj1 === 'undefined' ? {} : obj1;

            if (typeof obj3 === 'object') {
                for (var key in obj3) {
                    obj2[key] = obj3[key];
                }
            }

            for (var key2 in obj2) {
                obj1[key2] = obj2[key2];
            }
            return obj1;
        }

        function parseXml(body) {
            var parser = new DOMParser();
            return parser.parseFromString(body, "text/xml");
        }

        function getSavedUploads(purge) {
            var result = JSON.parse(historyCache.getItem('awsUploads') || '{}');

            if (purge) {
                for (var key in result) {
                    if (result.hasOwnProperty(key)) {
                        var upload = result[key],
                            completedAt = new Date(upload.completedAt || FAR_FUTURE);

                        if (completedAt < HOURS_AGO) {
                            // The upload is recent, let's keep it
                            delete result[key];
                        }
                    }
                }
            }
            return result;
        }

        function uploadKey(fileUpload) {
            // The key tries to give a signature to a file in the absence of its path.
            // "<filename>-<mimetype>-<modifieddate>-<filesize>"
            return [
                fileUpload.file.name,
                fileUpload.file.type,
                dateISOString(fileUpload.file.lastModifiedDate),
                fileUpload.file.size
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

        function nodeValue(parent, nodeName) {
            return parent.getElementsByTagName(nodeName)[0].textContent;
        }
    };

    function uri(url) {
        var p = document.createElement('a');
        p.href = url || "/";

        return {
            protocol: p.protocol, // => "http:"
            hostname: p.hostname, // => "example.com"
            pathname: p.pathname, // => "/pathname/"
            port: p.port, // => "3000"
            search: (p.search[0] === '?') ? p.search.substr(1) : p.search, // => "search=test"
            hash: p.hash, // => "#hash"
            host: p.host  // => "example.com:3000"
        };
    }

    function dateISOString(date) {
        // Try to get the modified date as an ISO String, if the date exists
        return date ? date.toISOString() : '';
    }

    function getFilePart(file, start, end) {
        var slicerFn = (file.slice ? 'slice' : (file['mozSlice'] ? 'mozSlice' : 'webkitSlice'));
        // browsers' implementation of the Blob.slice function has been renamed a couple of times, and the meaning of the 2nd parameter changed. For example Gecko went from slice(start,length) -> mozSlice(start, end) -> slice(start, end). As of 12/12/12, it seems that the unified 'slice' is the best bet, hence it being first in the list. See https://developer.mozilla.org/en-US/docs/DOM/Blob for more info.
        return file[slicerFn](start, end);
    }

    function getAwsResponse(xhr) {
        var oParser = new DOMParser(),
            oDOM = oParser.parseFromString(xhr.responseText, "text/xml"),
            code = oDOM.getElementsByTagName("Code"),
            msg = oDOM.getElementsByTagName("Message");
        code = code.length ? code[0].innerHTML : '';
        msg = msg.length ? msg[0].innerHTML : '';

        return code.length ? {code: code, msg: msg} : {};
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Evaporate;
    } else if (typeof window !== 'undefined') {
        window.Evaporate = Evaporate;
    }

})();
