/*
* MIT Licensed
* http://www.23developer.com/opensource
* http://github.com/23/resumable.js
* Steffen Tiedemann Christensen, steffen@23company.com
*/

(function(){
"use strict";

  var Resumable = function(opts){
    if ( !(this instanceof Resumable) ) {
      return new Resumable(opts);
    }
    this.version = 1.0;
    // SUPPORTED BY BROWSER?
    // Check if these features are support by the browser:
    // - File object type
    // - Blob object type
    // - FileList object type
    // - slicing files
    this.support = (
                   (typeof(File)!=='undefined')
                   &&
                   (typeof(Blob)!=='undefined')
                   &&
                   (typeof(FileList)!=='undefined')
                   &&
                   (!!Blob.prototype.webkitSlice||!!Blob.prototype.mozSlice||!!Blob.prototype.slice||false)
                   );
    if(!this.support) return(false);


    // PROPERTIES
    var $ = this;
    $.files = [];
    $.defaults = {
      chunkSize:1*1024*1024,
      forceChunkSize:false,
      simultaneousUploads:3,
      fileParameterName:'file',
      throttleProgressCallbacks:0.5,
      query:{},
      headers:{},
      preprocess:null,
      method:'multipart',
      prioritizeFirstAndLastChunk:false,
      target:'/',
      testChunks:true,
      generateUniqueIdentifier:null,
      maxChunkRetries:undefined,
      chunkRetryInterval:undefined,
      permanentErrors:[400, 404, 415, 500, 501],
      maxFiles:undefined,
      withCredentials:false,
      xhrTimeout:0,
      maxFilesErrorCallback:function (files, errorCount) {
        var maxFiles = $.getOpt('maxFiles');
        alert('Please upload ' + maxFiles + ' file' + (maxFiles === 1 ? '' : 's') + ' at a time.');
      },
      minFileSize:1,
      minFileSizeErrorCallback:function(file, errorCount) {
        alert(file.fileName||file.name +' is too small, please upload files larger than ' + $h.formatSize($.getOpt('minFileSize')) + '.');
      },
      maxFileSize:undefined,
      maxFileSizeErrorCallback:function(file, errorCount) {
        alert(file.fileName||file.name +' is too large, please upload files less than ' + $h.formatSize($.getOpt('maxFileSize')) + '.');
      },
      fileType: [],
      fileTypeErrorCallback: function(file, errorCount) {
        alert(file.fileName||file.name +' has type not allowed, please upload files of type ' + $.getOpt('fileType') + '.');
      }
    };
    $.opts = opts||{};
    $.getOpt = function(o) {
      var $opt = this;
      // Get multiple option if passed an array
      if(o instanceof Array) {
        var options = {};
        $h.each(o, function(option){
          options[option] = $opt.getOpt(option);
        });
        return options;
      }
      // Otherwise, just return a simple option
      if ($opt instanceof ResumableChunk) {
        if (typeof $opt.opts[o] !== 'undefined') { return $opt.opts[o]; }
        else { $opt = $opt.fileObj; }
      }
      if ($opt instanceof ResumableFile) {
        if (typeof $opt.opts[o] !== 'undefined') { return $opt.opts[o]; }
        else { $opt = $opt.resumableObj; }
      }
      if ($opt instanceof Resumable) {
        if (typeof $opt.opts[o] !== 'undefined') { return $opt.opts[o]; }
        else { return $opt.defaults[o]; }
      }
    };
    
    // EVENTS
    // catchAll(event, ...)
    // fileSuccess(file), fileProgress(file), fileAdded(file, event), fileRetry(file), fileError(file, message),
    // complete(), progress(), error(message, file), pause()
    $.events = [];
    $.on = function(event,callback){
      $.events.push(event.toLowerCase(), callback);
    };
    $.fire = function(){
      // `arguments` is an object, not array, in FF, so:
      var args = [];
      for (var i=0; i<arguments.length; i++) args.push(arguments[i]);
      // Find event listeners, and support pseudo-event `catchAll`
      var event = args[0].toLowerCase();
      for (var i=0; i<=$.events.length; i+=2) {
        if($.events[i]==event) $.events[i+1].apply($,args.slice(1));
        if($.events[i]=='catchall') $.events[i+1].apply(null,args);
      }
      if(event=='fileerror') $.fire('error', args[2], args[1]);
      if(event=='fileprogress') $.fire('progress');
    };
    
    
    // INTERNAL HELPER METHODS (handy, but ultimately not part of uploading)
    var $h = {
      stopEvent: function(e){
        e.stopPropagation();
        e.preventDefault();
      },
      each: function(o,callback){
        if(typeof(o.length)!=='undefined') {
          for (var i=0; i<o.length; i++) {
            // Array or FileList
            if(callback(o[i])===false) return;
          }
        } else {
          for (i in o) {
            // Object
            if(callback(i,o[i])===false) return;
          }
        }
      },
      generateUniqueIdentifier:function(file){
        var custom = $.getOpt('generateUniqueIdentifier');
        if(typeof custom === 'function') {
          return custom(file);
        }
        var relativePath = file.webkitRelativePath||file.fileName||file.name; // Some confusion in different versions of Firefox
        var size = file.size;
        return(size + '-' + relativePath.replace(/[^0-9a-zA-Z_-]/img, ''));
      },
      contains:function(array,test) {
        var result = false;

        $h.each(array, function(value) {
          if (value == test) {
            result = true;
            return false;
          }
          return true;
        });

        return result;
      },
      formatSize:function(size){
        if(size<1024) {
          return size + ' bytes';
        } else if(size<1024*1024) {
          return (size/1024.0).toFixed(0) + ' KB';
        } else if(size<1024*1024*1024) {
          return (size/1024.0/1024.0).toFixed(1) + ' MB';
        } else {
          return (size/1024.0/1024.0/1024.0).toFixed(1) + ' GB';
        }
      },
      getTarget:function(params){
        var target = $.getOpt('target');
        if(target.indexOf('?') < 0) {
          target += '?';
        } else {
          target += '&';
        }
        return target + params.join('&');
      }
    };

    var onDrop = function(event){
      $h.stopEvent(event);

      //handle dropped things as items if we can (this lets us deal with folders nicer in some cases)
      if (event.dataTransfer && event.dataTransfer.items) {
        loadFiles(event.dataTransfer.items, event);
      }
      //else handle them as files
      else if (event.dataTransfer && event.dataTransfer.files) {
        loadFiles(event.dataTransfer.files, event);
      }
    };
    var onDragOver = function(e) {
      e.preventDefault();
    };

    // INTERNAL METHODS (both handy and responsible for the heavy load)
    /**
     * @summary This function loops over the files passed in from a drag and drop operation and gets them ready for appendFilesFromFileList
     *            It attempts to use FileSystem API calls to extract files and subfolders if the dropped items include folders
     *            That capability is only currently available in Chrome, but if it isn't available it will just pass the items along to 
     *            appendFilesFromFileList (via enqueueFileAddition to help with asynchronous processing.)
     * @param files {Array} - the File or Entry objects to be processed depending on your browser support
     * @param event {Object} - the drop event object
     * @param [queue] {Object} - an object to keep track of our progress processing the dropped items
     * @param [path] {String} - the relative path from the originally selected folder to the current files if extracting files from subfolders
     */
    var loadFiles = function (files, event, queue, path){
      //initialize the queue object if it doesn't exist
      if (!queue) {
        queue = {
          total: 0,
          files: [],
          event: event
        };
      }

      //update the total number of things we plan to process
      updateQueueTotal(files.length, queue);

      //loop over all the passed in objects checking if they are files or folders
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var entry, reader;

        if (file.isFile || file.isDirectory) {
          //this is an object we can handle below with no extra work needed up front
          entry = file;
        }
        else if (file.getAsEntry) {
          //get the file as an entry object if we can using the proposed HTML5 api (unlikely to get implemented by anyone)
          entry = file.getAsEntry();
        }
        else if (file.webkitGetAsEntry) {
          //get the file as an entry object if we can using the Chrome specific webkit implementation
          entry = file.webkitGetAsEntry();
        }
        else if (typeof file.getAsFile === 'function') {
          //if this is still a DataTransferItem object, get it as a file object
          enqueueFileAddition(file.getAsFile(), queue, path);
          //we just added this file object to the queue so we can go to the next object in the loop and skip the processing below
          continue;
        }
        else if (File && file instanceof File) {
          //this is already a file object so just queue it up and move on
          enqueueFileAddition(file, queue, path);
          //we just added this file object to the queue so we can go to the next object in the loop and skip the processing below
          continue;
        }
        else {
          //we can't do anything with this object, decrement the expected total and skip the processing below
          updateQueueTotal(-1, queue);
          continue;
        }

        if (!entry) {
          //there isn't anything we can do with this so decrement the total expected
          updateQueueTotal(-1, queue);
        }
        else if (entry.isFile) {
          //this is handling to read an entry object representing a file, parsing the file object is asynchronous which is why we need the queue
          //currently entry objects will only exist in this flow for Chrome
          entry.file(function(file) {
            enqueueFileAddition(file, queue, path);
          }, function(err) {
            console.warn(err);
          });
        }
        else if (entry.isDirectory) {
          //this is handling to read an entry object representing a folder, parsing the directory object is asynchronous which is why we need the queue
          //currently entry objects will only exist in this flow for Chrome
          reader = entry.createReader();

          //wrap the callback in another function so we can store the path in a closure
          var readDir = function(path){
            return function(entries){
              //process each thing in this directory recursively
              loadFiles(entries, event, queue, path);
              //this was a directory rather than a file so decrement the expected file count
              updateQueueTotal(-1, queue);
            }
          };

          reader.readEntries(readDir(entry.fullPath), function(err) {
            console.warn(err);
          });
        }
      }
    };

    /**
     * @summary Adjust the total number of files we are expecting to process
     *          if decrementing and the new expected total is equal to the number processed, flush the queue
     * @param addition {Number} - the number of additional files we expect to process (may be negative)
     * @param queue {Object} - an object to keep track of our progress processing the dropped items
     */
    var updateQueueTotal = function(addition, queue){
      queue.total += addition;
      
      // If all the files we expect have shown up, then flush the queue.
      if (queue.files.length === queue.total) {
        appendFilesFromFileList(queue.files, queue.event);
      }
    };

    /**
     * @summary Add a file to the queue of processed files, if it brings the total up to the expected total, flush the queue
     * @param file {Object} - File object to be passed along to appendFilesFromFileList eventually
     * @param queue {Object} - an object to keep track of our progress processing the dropped items
     * @param [path] {String} - the file's relative path from the originally dropped folder if we are parsing folder content (Chrome only for now)
     */
    var enqueueFileAddition = function(file, queue, path) {
      //store the path to this file if it came in as part of a folder
      if (path) file.relativePath = path + '/' + file.name;
      queue.files.push(file);

      // If all the files we expect have shown up, then flush the queue.
      if (queue.files.length === queue.total) {
        appendFilesFromFileList(queue.files, queue.event);
      }
    };

    var appendFilesFromFileList = function(fileList, event){
      // check for uploading too many files
      var errorCount = 0;
      var o = $.getOpt(['maxFiles', 'minFileSize', 'maxFileSize', 'maxFilesErrorCallback', 'minFileSizeErrorCallback', 'maxFileSizeErrorCallback', 'fileType', 'fileTypeErrorCallback']);
      if (typeof(o.maxFiles)!=='undefined' && o.maxFiles<(fileList.length+$.files.length)) {
        // if single-file upload, file is already added, and trying to add 1 new file, simply replace the already-added file 
        if (o.maxFiles===1 && $.files.length===1 && fileList.length===1) {
          $.removeFile($.files[0]);
        } else {
          o.maxFilesErrorCallback(fileList, errorCount++);
          return false;
        }
      }
      var files = [];
      $h.each(fileList, function(file){
        var fileName = file.name.split('.');
        var fileType = fileName[fileName.length-1].toLowerCase();
        
        if (o.fileType.length > 0 && !$h.contains(o.fileType, fileType)) {
          o.fileTypeErrorCallback(file, errorCount++);
          return false;
        }

        if (typeof(o.minFileSize)!=='undefined' && file.size<o.minFileSize) {
          o.minFileSizeErrorCallback(file, errorCount++);
          return false;
        }
        if (typeof(o.maxFileSize)!=='undefined' && file.size>o.maxFileSize) {
          o.maxFileSizeErrorCallback(file, errorCount++);
          return false;
        }

        // directories have size == 0
        if (!$.getFromUniqueIdentifier($h.generateUniqueIdentifier(file))) {(function(){
          var f = new ResumableFile($, file);
          window.setTimeout(function(){
            $.files.push(f);
            files.push(f);
            f.container = (typeof event != 'undefined' ? event.srcElement : null);
            $.fire('fileAdded', f, event)
          },0);
        })()};
      });
      window.setTimeout(function(){
        $.fire('filesAdded', files)
      },0);
    };

    // INTERNAL OBJECT TYPES
    function ResumableFile(resumableObj, file){
      var $ = this;
      $.opts = {};
      $.getOpt = resumableObj.getOpt;
      $._prevProgress = 0;
      $.resumableObj = resumableObj;
      $.file = file;
      $.fileName = file.fileName||file.name; // Some confusion in different versions of Firefox
      $.size = file.size;
      $.relativePath = file.webkitRelativePath || file.relativePath || $.fileName;
      $.uniqueIdentifier = $h.generateUniqueIdentifier(file);
      $._pause = false;
      $.container = '';
      var _error = false;

      // Callback when something happens within the chunk
      var chunkEvent = function(event, message){
        // event can be 'progress', 'success', 'error' or 'retry'
        switch(event){
        case 'progress':
          $.resumableObj.fire('fileProgress', $);
          break;
        case 'error':
          $.abort();
          _error = true;
          $.chunks = [];
          $.resumableObj.fire('fileError', $, message);
          break;
        case 'success':
          if(_error) return;
          $.resumableObj.fire('fileProgress', $); // it's at least progress
          if($.isComplete()) {
            $.resumableObj.fire('fileSuccess', $, message);
          }
          break;
        case 'retry':
          $.resumableObj.fire('fileRetry', $);
          break;
        }
      };

      // Main code to set up a file object with chunks,
      // packaged to be able to handle retries if needed.
      $.chunks = [];
      $.abort = function(){
        // Stop current uploads
        var abortCount = 0;
        $h.each($.chunks, function(c){
          if(c.status()=='uploading') {
            c.abort();
            abortCount++;
          }
        });
        if(abortCount>0) $.resumableObj.fire('fileProgress', $);
      };
      $.cancel = function(){
        // Reset this file to be void
        var _chunks = $.chunks;
        $.chunks = [];
        // Stop current uploads
        $h.each(_chunks, function(c){
          if(c.status()=='uploading')  {
            c.abort();
            $.resumableObj.uploadNextChunk();
          }
        });
        $.resumableObj.removeFile($);
        $.resumableObj.fire('fileProgress', $);
      };
      $.retry = function(){
        $.bootstrap();
        var firedRetry = false;
        $.resumableObj.on('chunkingComplete', function(){
          if(!firedRetry) $.resumableObj.upload();
          firedRetry = true;
        });
      };
      $.bootstrap = function(){
        $.abort();
        _error = false;
        // Rebuild stack of chunks from file
        $.chunks = [];
        $._prevProgress = 0;
        var round = $.getOpt('forceChunkSize') ? Math.ceil : Math.floor;
        var maxOffset = Math.max(round($.file.size/$.getOpt('chunkSize')),1);
        for (var offset=0; offset<maxOffset; offset++) {(function(offset){
            window.setTimeout(function(){
                $.chunks.push(new ResumableChunk($.resumableObj, $, offset, chunkEvent));
                $.resumableObj.fire('chunkingProgress',$,offset/maxOffset);
            },0);
        })(offset)}
        window.setTimeout(function(){
            $.resumableObj.fire('chunkingComplete',$);
        },0);
      };
      $.progress = function(){
        if(_error) return(1);
        // Sum up progress across everything
        var ret = 0;
        var error = false;
        $h.each($.chunks, function(c){
          if(c.status()=='error') error = true;
          ret += c.progress(true); // get chunk progress relative to entire file
        });
        ret = (error ? 1 : (ret>0.99999 ? 1 : ret));
        ret = Math.max($._prevProgress, ret); // We don't want to lose percentages when an upload is paused
        $._prevProgress = ret;
        return(ret);
      };
      $.isUploading = function(){
        var uploading = false;
        $h.each($.chunks, function(chunk){
          if(chunk.status()=='uploading') {
            uploading = true;
            return(false);
          }
        });
        return(uploading);
      };    
      $.isComplete = function(){
        var outstanding = false;
        $h.each($.chunks, function(chunk){
          var status = chunk.status();
          if(status=='pending' || status=='uploading' || chunk.preprocessState === 1) {
            outstanding = true;
            return(false);
          }
        });
        return(!outstanding);
      };
      $.pause = function(pause){
          if(typeof(pause)==='undefined'){
              $._pause = ($._pause ? false : true);
          }else{
              $._pause = pause;
          }
      };
      $.isPaused = function() {
        return $._pause;
      };


      // Bootstrap and return
      $.resumableObj.fire('chunkingStart', $);
      $.bootstrap();
      return(this);
    }

    function ResumableChunk(resumableObj, fileObj, offset, callback){
      var $ = this;
      $.opts = {};
      $.getOpt = resumableObj.getOpt;
      $.resumableObj = resumableObj;
      $.fileObj = fileObj;
      $.fileObjSize = fileObj.size;
      $.fileObjType = fileObj.file.type;
      $.offset = offset;
      $.callback = callback;
      $.lastProgressCallback = (new Date);
      $.tested = false;
      $.retries = 0;
      $.pendingRetry = false;
      $.preprocessState = 0; // 0 = unprocessed, 1 = processing, 2 = finished

      // Computed properties
      var chunkSize = $.getOpt('chunkSize');
      $.loaded = 0;
      $.startByte = $.offset*chunkSize;
      $.endByte = Math.min($.fileObjSize, ($.offset+1)*chunkSize);
      if ($.fileObjSize-$.endByte < chunkSize && !$.getOpt('forceChunkSize')) {
        // The last chunk will be bigger than the chunk size, but less than 2*chunkSize
        $.endByte = $.fileObjSize;
      }
      $.xhr = null;

      // test() makes a GET request without any data to see if the chunk has already been uploaded in a previous session
      $.test = function(){
        // Set up request and listen for event
        $.xhr = new XMLHttpRequest();

        var testHandler = function(e){
          $.tested = true;
          var status = $.status();
          if(status=='success') {
            $.callback(status, $.message());
            $.resumableObj.uploadNextChunk();
          } else {
            $.send();
          }
        };
        $.xhr.addEventListener('load', testHandler, false);
        $.xhr.addEventListener('error', testHandler, false);
        $.xhr.addEventListener('timeout', testHandler, false);

        // Add data from the query options
        var params = [];
        var customQuery = $.getOpt('query'); 
        if(typeof customQuery == 'function') customQuery = customQuery($.fileObj, $);
        $h.each(customQuery, function(k,v){
          params.push([encodeURIComponent(k), encodeURIComponent(v)].join('='));
        });
        // Add extra data to identify chunk
        params.push(['resumableChunkNumber', encodeURIComponent($.offset+1)].join('='));
        params.push(['resumableChunkSize', encodeURIComponent($.getOpt('chunkSize'))].join('='));
        params.push(['resumableCurrentChunkSize', encodeURIComponent($.endByte - $.startByte)].join('='));
        params.push(['resumableTotalSize', encodeURIComponent($.fileObjSize)].join('='));
        params.push(['resumableType', encodeURIComponent($.fileObjType)].join('='));
        params.push(['resumableIdentifier', encodeURIComponent($.fileObj.uniqueIdentifier)].join('='));
        params.push(['resumableFilename', encodeURIComponent($.fileObj.fileName)].join('='));
        params.push(['resumableRelativePath', encodeURIComponent($.fileObj.relativePath)].join('='));
        params.push(['resumableTotalChunks', encodeURIComponent($.fileObj.chunks.length)].join('='));
        // Append the relevant chunk and send it
        $.xhr.open('GET', $h.getTarget(params));
        $.xhr.timeout = $.getOpt('xhrTimeout');
        $.xhr.withCredentials = $.getOpt('withCredentials');
        // Add data from header options
        $h.each($.getOpt('headers'), function(k,v) {
          $.xhr.setRequestHeader(k, v);
        });
        $.xhr.send(null);
      };

      $.preprocessFinished = function(){
        $.preprocessState = 2;
        $.send();
      };

      // send() uploads the actual data in a POST call
      $.send = function(){
        var preprocess = $.getOpt('preprocess');
        if(typeof preprocess === 'function') {
          switch($.preprocessState) {
          case 0: preprocess($); $.preprocessState = 1; return;
          case 1: return;
          case 2: break;
          }
        }
        if($.getOpt('testChunks') && !$.tested) {
          $.test();
          return;
        }

        // Set up request and listen for event
        $.xhr = new XMLHttpRequest();

        // Progress
        $.xhr.upload.addEventListener('progress', function(e){
          if( (new Date) - $.lastProgressCallback > $.getOpt('throttleProgressCallbacks') * 1000 ) {
            $.callback('progress');
            $.lastProgressCallback = (new Date);
          }
          $.loaded=e.loaded||0;
        }, false);
        $.loaded = 0;
        $.pendingRetry = false;
        $.callback('progress');

        // Done (either done, failed or retry)
        var doneHandler = function(e){
          var status = $.status();
          if(status=='success'||status=='error') {
            $.callback(status, $.message());
            $.resumableObj.uploadNextChunk();
          } else {
            $.callback('retry', $.message());
            $.abort();
            $.retries++;
            var retryInterval = $.getOpt('chunkRetryInterval');          
            if(retryInterval !== undefined) {
              $.pendingRetry = true;
              setTimeout($.send, retryInterval);
            } else {
              $.send();
            }
          }
        };
        $.xhr.addEventListener('load', doneHandler, false);
        $.xhr.addEventListener('error', doneHandler, false);
        $.xhr.addEventListener('timeout', doneHandler, false);

        // Set up the basic query data from Resumable
        var query = {
          resumableChunkNumber: $.offset+1,
          resumableChunkSize: $.getOpt('chunkSize'),
          resumableCurrentChunkSize: $.endByte - $.startByte,
          resumableTotalSize: $.fileObjSize,
          resumableType: $.fileObjType,
          resumableIdentifier: $.fileObj.uniqueIdentifier,
          resumableFilename: $.fileObj.fileName,
          resumableRelativePath: $.fileObj.relativePath,
          resumableTotalChunks: $.fileObj.chunks.length
        };
        // Mix in custom data
        var customQuery = $.getOpt('query');
        if(typeof customQuery == 'function') customQuery = customQuery($.fileObj, $);
        $h.each(customQuery, function(k,v){
          query[k] = v;
        });

        var func   = ($.fileObj.file.slice ? 'slice' : ($.fileObj.file.mozSlice ? 'mozSlice' : ($.fileObj.file.webkitSlice ? 'webkitSlice' : 'slice'))),
        bytes  = $.fileObj.file[func]($.startByte,$.endByte), 
        data   = null,
        target = $.getOpt('target');
        
        if ($.getOpt('method') === 'octet') {
          // Add data from the query options
          data = bytes;
          var params = [];
          $h.each(query, function(k,v){
            params.push([encodeURIComponent(k), encodeURIComponent(v)].join('='));
          });
          target = $h.getTarget(params);
        } else {
          // Add data from the query options
          data = new FormData();
          $h.each(query, function(k,v){
            data.append(k,v);
          });
          data.append($.getOpt('fileParameterName'), bytes);
        }
        
        $.xhr.open('POST', target);
        $.xhr.timeout = $.getOpt('xhrTimeout');
        $.xhr.withCredentials = $.getOpt('withCredentials');
        // Add data from header options
        $h.each($.getOpt('headers'), function(k,v) {
          $.xhr.setRequestHeader(k, v);
        });
        $.xhr.send(data);
      };
      $.abort = function(){
        // Abort and reset
        if($.xhr) $.xhr.abort();
        $.xhr = null;
      };
      $.status = function(){
        // Returns: 'pending', 'uploading', 'success', 'error'
        if($.pendingRetry) {
          // if pending retry then that's effectively the same as actively uploading,
          // there might just be a slight delay before the retry starts
          return('uploading');
        } else if(!$.xhr) {
          return('pending');
        } else if($.xhr.readyState<4) {
          // Status is really 'OPENED', 'HEADERS_RECEIVED' or 'LOADING' - meaning that stuff is happening
          return('uploading');
        } else {
          if($.xhr.status==200) {
            // HTTP 200, perfect
            return('success');
          } else if($h.contains($.getOpt('permanentErrors'), $.xhr.status) || $.retries >= $.getOpt('maxChunkRetries')) {
            // HTTP 415/500/501, permanent error
            return('error');
          } else {
            // this should never happen, but we'll reset and queue a retry
            // a likely case for this would be 503 service unavailable
            $.abort();
            return('pending');
          }
        }
      };
      $.message = function(){
        return($.xhr ? $.xhr.responseText : '');
      };
      $.progress = function(relative){
        if(typeof(relative)==='undefined') relative = false;
        var factor = (relative ? ($.endByte-$.startByte)/$.fileObjSize : 1);
        if($.pendingRetry) return(0);
        var s = $.status();
        switch(s){
        case 'success':
        case 'error':
          return(1*factor);
        case 'pending':
          return(0*factor);
        default:
          return($.loaded/($.endByte-$.startByte)*factor);
        }
      };
      return(this);
    }

    // QUEUE
    $.uploadNextChunk = function(){
      var found = false;

      // In some cases (such as videos) it's really handy to upload the first
      // and last chunk of a file quickly; this let's the server check the file's
      // metadata and determine if there's even a point in continuing.
      if ($.getOpt('prioritizeFirstAndLastChunk')) {
        $h.each($.files, function(file){
          if(file.chunks.length && file.chunks[0].status()=='pending' && file.chunks[0].preprocessState === 0) {
            file.chunks[0].send();
            found = true;
            return(false);
          }
          if(file.chunks.length>1 && file.chunks[file.chunks.length-1].status()=='pending' && file.chunks[file.chunks.length-1].preprocessState === 0) {
            file.chunks[file.chunks.length-1].send();
            found = true;
            return(false);
          }
        });
        if(found) return(true);
      }

      // Now, simply look for the next, best thing to upload
      $h.each($.files, function(file){
        if(file.isPaused()===false){
         $h.each(file.chunks, function(chunk){
           if(chunk.status()=='pending' && chunk.preprocessState === 0) {
             chunk.send();
             found = true;
             return(false);
           }
          });
        }
        if(found) return(false);
      });
      if(found) return(true);

      // The are no more outstanding chunks to upload, check is everything is done
      var outstanding = false;
      $h.each($.files, function(file){
        if(!file.isComplete()) {
          outstanding = true;
          return(false);
        }
      });
      if(!outstanding) {
        // All chunks have been uploaded, complete
        $.fire('complete');
      }
      return(false);
    };


    // PUBLIC METHODS FOR RESUMABLE.JS
    $.assignBrowse = function(domNodes, isDirectory){
      if(typeof(domNodes.length)=='undefined') domNodes = [domNodes];

      $h.each(domNodes, function(domNode) {
        var input;
        if(domNode.tagName==='INPUT' && domNode.type==='file'){
          input = domNode;
        } else {
          input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.style.display = 'none';
          domNode.addEventListener('click', function(){
            input.style.opacity = 0;
            input.style.display='block';
            input.focus();
            input.click();
            input.style.display='none';
          }, false);
          domNode.appendChild(input);
        }
        var maxFiles = $.getOpt('maxFiles');
        if (typeof(maxFiles)==='undefined'||maxFiles!=1){
          input.setAttribute('multiple', 'multiple');
        } else {
          input.removeAttribute('multiple');
        }
        if(isDirectory){
          input.setAttribute('webkitdirectory', 'webkitdirectory');
        } else {
          input.removeAttribute('webkitdirectory');
        }
        // When new files are added, simply append them to the overall list
        input.addEventListener('change', function(e){
          appendFilesFromFileList(e.target.files,e);
          e.target.value = '';
        }, false);
      });
    };
    $.assignDrop = function(domNodes){
      if(typeof(domNodes.length)=='undefined') domNodes = [domNodes];

      $h.each(domNodes, function(domNode) {
        domNode.addEventListener('dragover', onDragOver, false);
        domNode.addEventListener('drop', onDrop, false);
      });
    };
    $.unAssignDrop = function(domNodes) {
      if (typeof(domNodes.length) == 'undefined') domNodes = [domNodes];

      $h.each(domNodes, function(domNode) {
        domNode.removeEventListener('dragover', onDragOver);
        domNode.removeEventListener('drop', onDrop);
      });
    };
    $.isUploading = function(){
      var uploading = false;
      $h.each($.files, function(file){
        if (file.isUploading()) {
          uploading = true;
          return(false);
        }
      });
      return(uploading);
    };
    $.upload = function(){
      // Make sure we don't start too many uploads at once
      if($.isUploading()) return;
      // Kick off the queue
      $.fire('uploadStart');
      for (var num=1; num<=$.getOpt('simultaneousUploads'); num++) {
        $.uploadNextChunk();
      }
    };
    $.pause = function(){
      // Resume all chunks currently being uploaded
      $h.each($.files, function(file){
        file.abort();
      });
      $.fire('pause');
    };
    $.cancel = function(){
      for(var i = $.files.length - 1; i >= 0; i--) {
        $.files[i].cancel();
      }
      $.fire('cancel');
    };
    $.progress = function(){
      var totalDone = 0;
      var totalSize = 0;
      // Resume all chunks currently being uploaded
      $h.each($.files, function(file){
        totalDone += file.progress()*file.size;
        totalSize += file.size;
      });
      return(totalSize>0 ? totalDone/totalSize : 0);
    };
    $.addFile = function(file, event){
      appendFilesFromFileList([file], event);
    };
    $.removeFile = function(file){
      for(var i = $.files.length - 1; i >= 0; i--) {
        if($.files[i] === file) {
          $.files.splice(i, 1);
        }
      }
    };
    $.getFromUniqueIdentifier = function(uniqueIdentifier){
      var ret = false;
      $h.each($.files, function(f){
        if(f.uniqueIdentifier==uniqueIdentifier) ret = f;
      });
      return(ret);
    };
    $.getSize = function(){
      var totalSize = 0;
      $h.each($.files, function(file){
        totalSize += file.size;
      });
      return(totalSize);
    };

    return(this);
  };


  // Node.js-style export for Node and Component
  if (typeof module != 'undefined') {
    module.exports = Resumable;
  } else if (typeof define === "function" && define.amd) {
    // AMD/requirejs: Define the module
    define(function(){
      return Resumable;
    });
  } else {
    // Browser: Expose to window
    window.Resumable = Resumable;
  }

})();
