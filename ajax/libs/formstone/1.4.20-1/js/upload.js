/*! formstone v1.4.20-1 [upload.js] 2021-01-29 | GPL-3.0 License | formstone.it */
/* global define */

(function(factory) {
    if (typeof define === "function" && define.amd) {
      define([
        "jquery",
        "./core"
      ], factory);
    } else {
      factory(jQuery, Formstone);
    }
  }(function($, Formstone) {

    "use strict";

    /**
     * @method private
     * @name setup
     * @description Setup plugin.
     */

    function setup() {
      var blobSliceMethods = [
        'mozSlice',
        'webkitSlice',
        'slice'
      ];

      if (Formstone.support.file) {
        var testFile = false;

        try {
          testFile = new File([""], "f");
        } catch (e) {}

        if (!testFile) {
          // Safari & IE/Edge :/
          try {
            testFile = new Blob([""], {});
          } catch (e) {}
        }

        if (testFile) {
          for (var i in blobSliceMethods) {
            if (blobSliceMethods.hasOwnProperty(i) && blobSliceMethods[i] in testFile) {
              BlobSliceMethod = blobSliceMethods[i];
              break;
            }
          }
        }
      }
    }

    /**
     * @method private
     * @name construct
     * @description Builds instance.
     * @param data [object] "Instance data"
     */

    function construct(data) {
      if (Formstone.support.file) {
        var html = "";

        if (!BlobSliceMethod) {
          data.chunked = false;
        }

        // Backwards compat
        if (data.maxQueue) {
          data.maxConcurrent = data.maxQueue;
        }

        if (data.label !== false) {
          html += '<div class="' + RawClasses.target + '">';
          html += data.label;
          html += '</div>';
        }
        html += '<input class="' + RawClasses.input + '" type="file"';
        if (data.multiple) {
          html += ' multiple';
        }
        if (data.accept) {
          html += ' accept="' + data.accept + '"';
        }
        html += '>';

        data.baseClasses = [RawClasses.base, data.theme, data.customClass].join(" ");

        this.addClass(data.baseClasses)
          .append(html);

        data.$input = this.find(Classes.input);
        data.queue = [];
        data.total = 0;
        data.uploaded = 0;
        data.uploading = false;
        data.disabled = true;
        data.aborting = false;

        this.on(Events.click, Classes.target, data, onClick)
          .on(Events.dragEnter, data, onDragEnter)
          .on(Events.dragOver, data, onDragOver)
          .on(Events.dragLeave, data, onDragOut)
          .on(Events.drop, data, onDrop);

        data.$input.on(Events.focus, data, onFocus)
          .on(Events.blur, data, onBlur)
          .on(Events.change, data, onChange);

        enableUpload.call(this, data);
      }
    }

    /**
     * @method private
     * @name destruct
     * @description Tears down instance.
     * @param data [object] "Instance data"
     */

    function destruct(data) {
      if (Formstone.support.file) {
        data.$input.off(Events.namespace);

        this.off(Events.namespace)
          .removeClass(data.baseClasses)
          .html("");
      }
    }

    /**
     * @method private
     * @name abortUpload
     * @description Cancels specific upload.
     * @param data [object] "Instance data"
     * @param index [int] "File index"
     */

    /**
     * @method
     * @name abort
     * @description Cancels all active uploads, or specific file.
     * @example $(".target").upload("abort", [index]);
     */

    function abortUpload(data, index) {
      var file;

      data.aborting = true;

      for (var i in data.queue) {
        if (data.queue.hasOwnProperty(i)) {
          file = data.queue[i];

          if (typeof index === "undefined" || (index >= 0 && file.index === index)) {
            // Abort all
            if (file.started && !file.complete) {
              if (data.chunked) {
                file.chunkTransfer.abort();
              } else {
                file.transfer.abort();
              }
            } else {
              abortFile(data, file, "abort");
            }
          }
        }
      }

      data.aborting = false;

      checkQueue(data);
    }

    /**
     * @method private
     * @name abortFile
     * @description Aborts file.
     * @param data [object] "Instance data"
     * @param formData [object] "Target form"
     * @param file [object] "Target file"
     */

    function abortFile(data, file, error) {
      file.error = true;
      data.$el.trigger(Events.fileError, [file, error]);

      if (!data.aborting) {
        checkQueue(data);
      }
    }

    /**
     * @method private
     * @name abortChunk
     * @description Aborts file chunk.
     * @param data [object] "Instance data"
     * @param formData [object] "Target form"
     * @param file [object] "Target file"
     */

    function abortChunk(data, file, error) {
      data.$el.trigger(Events.chunkError, [file, error]);

      abortFile(data, file, error);
    }

    /**
     * @method
     * @name disable
     * @description Disables target instance.
     * @example $(".target").upload("disable");
     */

    function disableUpload(data) {
      if (!data.disabled) {
        this.addClass(RawClasses.disabled);
        data.$input.prop("disabled", true);

        data.disabled = true;
      }
    }

    /**
     * @method
     * @name enable
     * @description Enables target instance.
     * @example $(".target").upload("enable");
     */

    function enableUpload(data) {
      if (data.disabled) {
        this.removeClass(RawClasses.disabled);
        data.$input.prop("disabled", false);

        data.disabled = false;
      }
    }

    /**
     * @method private
     * @name onClick
     * @description Handles click to target.
     * @param e [object] "Event data"
     */

    function onClick(e) {
      Functions.killEvent(e);

      var data = e.data;

      if (!data.disabled) {
        data.$input.trigger(Events.click);
      }
    }

    /**
     * @method private
     * @name onFocus
     * @description Handles instance focus
     * @param e [object] "Event data"
     */

    function onFocus(e) {
      e.data.$el.addClass(RawClasses.focus);
    }

    /**
     * @method private
     * @name onBlur
     * @description Handles instance blur
     * @param e [object] "Event data"
     */

    function onBlur(e) {
      e.data.$el.removeClass(RawClasses.focus);
    }

    /**
     * @method private
     * @name onChange
     * @description Handles change to hidden input.
     * @param e [object] "Event data"
     */

    function onChange(e) {
      Functions.killEvent(e);

      var data = e.data,
        files = data.$input[0].files;

      if (!data.disabled && files.length) {
        handleUpload(data, files);
      }
    }

    /**
     * @method private
     * @name onDragEnter
     * @description Handles dragenter to target.
     * @param e [object] "Event data"
     */

    function onDragEnter(e) {
      Functions.killEvent(e);

      var data = e.data;

      // if (!data.disabled) {
      data.$el.addClass(RawClasses.dropping)
        .trigger(Events.fileDragEnter);
      // }
    }

    /**
     * @method private
     * @name onDragOver
     * @description Handles dragover to target.
     * @param e [object] "Event data"
     */

    function onDragOver(e) {
      Functions.killEvent(e);

      var data = e.data;

      // if (!data.disabled) {
      data.$el.addClass(RawClasses.dropping)
        .trigger(Events.fileDragOver);
      // }
    }

    /**
     * @method private
     * @name onDragOut
     * @description Handles dragout to target.
     * @param e [object] "Event data"
     */

    function onDragOut(e) {
      Functions.killEvent(e);

      var data = e.data;

      // if (!data.disabled) {
      data.$el.removeClass(RawClasses.dropping)
        .trigger(Events.fileDragLeave);
      // }
    }

    /**
     * @method private
     * @name onDrop
     * @description Handles drop to target.
     * @param e [object] "Event data"
     */

    function onDrop(e) {
      Functions.killEvent(e);

      var data = e.data,
        files = e.originalEvent.dataTransfer.files;

      data.$el.removeClass(RawClasses.dropping);

      if (!data.disabled) {
        handleUpload(data, files);
      }
    }

    /**
     * @method private
     * @name handleUpload
     * @description Handles new files.
     * @param data [object] "Instance data"
     * @param files [object] "File list"
     */

    function handleUpload(data, files) {
      var newFiles = [],
        numFiles = files.length;

      if (data.maxFiles) {
        var filesRemaining = data.maxFiles - data.uploaded;

        if (filesRemaining >= 0 && files.length > filesRemaining) {
          numFiles = filesRemaining;
        }
      }

      if (numFiles > 0) {
        for (var i = 0; i < numFiles; i++) {
          var file = {
            index: data.total++,
            file: files[i],
            name: files[i].name,
            size: files[i].size,
            started: false,
            complete: false,
            error: false,
            transfer: null
          };

          newFiles.push(file);
          data.queue.push(file);
        }

        data.$el.trigger(Events.queued, [newFiles]);

        if (data.autoUpload) {
          startUpload(data);
        }
      }

      data.$input.val("");
    }

    /**
     * @method private
     * @name startUpload
     * @description Start queued uploads.
     * @param data [object] "Instance data"
     */

    /**
     * @method
     * @name start
     * @description Starts queued uploads; Use when autoUpload is set to false.
     * @example $(".target").upload("start");
     */

    function startUpload(data) {
      if (!data.uploading) {
        $Window.on(Events.beforeUnload, function() {
          return data.leave;
        });

        data.uploading = true;

        data.$el.trigger(Events.start, [data.queue]);
      }

      checkQueue(data);
    }

    /**
     * @method private
     * @name checkQueue
     * @description Checks and updates file queue.
     * @param data [object] "Instance data"
     */

    function checkQueue(data) {
      var transfering = 0,
        newQueue = [];

      if (!data.uploading) {
        return;
      }

      // remove lingering items from queue
      for (var i in data.queue) {
        if (data.queue.hasOwnProperty(i) && !data.queue[i].complete && !data.queue[i].error) {
          newQueue.push(data.queue[i]);
        }
      }

      data.queue = newQueue;

      for (var j in data.queue) {
        if (data.queue.hasOwnProperty(j)) {
          if (!data.queue[j].started) {
            uploadFile(data, data.queue[j]);
          }

          transfering++;

          if (transfering >= data.maxConcurrent) {
            return;
          } else {
            i++;
          }
        }
      }

      if (transfering === 0) {
        $Window.off(Events.beforeUnload);

        data.uploading = false;

        data.$el.trigger(Events.complete);
      }
    }

    /**
     * @method private
     * @name uploadFile
     * @description Uploads file.
     * @param data [object] "Instance data"
     * @param file [object] "Target file"
     */

    function uploadFile(data, file) {
      if (file.size >= data.maxSize || file.error === true) {
        abortFile(data, file, "size");
      } else if (data.chunked) {
        // Chunked upload
        file.started = true;

        file.chunkSize = (1024 * data.chunkSize);
        file.totalChunks = Math.ceil(file.size / file.chunkSize);
        file.currentChunk = 0;

        data.$el.trigger(Events.fileStart, [file]);

        uploadChunk(data, file);
      } else {
        var formData = new FormData();

        formData.append(data.postKey, file.file);
        formData = setFormData(data, formData, file);

        if (formData === false) {
          abortFile(data, file, "abort");
        } else {
          // Standard upload
          file.started = true;
          file.transfer = $.ajax({
            url: data.action,
            data: formData,
            dataType: data.dataType,
            headers: data.headers,
            type: "POST",
            contentType: false,
            processData: false,
            cache: false,
            xhr: function() {
              var $xhr = $.ajaxSettings.xhr();

              if ($xhr.upload) {
                // Clean progress event
                $xhr.upload.addEventListener("progress", function(e) {
                  var percent = 0,
                    position = e.loaded || e.position,
                    total = e.total;

                  if (e.lengthComputable) {
                    percent = Math.ceil((position / total) * 100);
                  }

                  data.$el.trigger(Events.fileProgress, [file, percent, e]);
                }, false);
              }

              return $xhr;
            },
            beforeSend: function(jqXHR, settings) {
              data.$el.trigger(Events.fileStart, [file, settings, jqXHR]);
            },
            success: function(response, status, jqXHR) {
              file.complete = true;

              data.uploaded++;
              data.$el.trigger(Events.fileComplete, [file, response, status, jqXHR]);

              checkQueue(data);
            },
            error: function(jqXHR, status, error) {
              abortFile(data, file, error, jqXHR);
            }
          });
        }
      }
    }

    /**
     * @method private
     * @name uploadChunk
     * @description Uploads file chunk.
     * @param data [object] "Instance data"
     * @param formData [object] "Target form"
     * @param file [object] "Target file"
     */

    function uploadChunk(data, file) {
      var chunkStart = (file.chunkSize * file.currentChunk),
        chunkEnd = (chunkStart + file.chunkSize);

      if (chunkEnd > file.size) {
        chunkEnd = file.size;
      }

      var newChunk = file.file[BlobSliceMethod](chunkStart, chunkEnd),
        formData = new FormData();

      formData.append(data.postKey, newChunk, file.file.name);
      formData.append("chunks", file.totalChunks);
      formData.append("chunk", file.currentChunk);

      formData = setFormData(data, formData, file);

      if (formData === false) {
        abortFile(data, file, "abort");
      } else {
        file.chunkTransfer = $.ajax({
          url: data.action,
          data: formData,
          dataType: data.dataType,
          headers: data.headers,
          type: "POST",
          contentType: false,
          processData: false,
          cache: false,
          beforeSend: function(jqXHR, settings) {
            data.$el.trigger(Events.chunkStart, [file, settings, jqXHR]);
          },
          success: function(response, status, jqXHR) {
            file.currentChunk++;

            data.$el.trigger(Events.chunkComplete, [file]);

            var percent = Math.ceil((file.currentChunk / file.totalChunks) * 100);
            data.$el.trigger(Events.fileProgress, [file, percent, status, jqXHR]);

            if (file.currentChunk < file.totalChunks) {
              uploadChunk(data, file);
            } else {
              file.complete = true;
              data.$el.trigger(Events.fileComplete, [file, response, status, jqXHR]);

              checkQueue(data);
            }
          },
          error: function(jqXHR, status, error) {
            abortChunk(data, file, error, jqXHR);
          }
        });
      }
    }

    function setFormData(data, formData, file) {
      for (var i in data.postData) {
        if (data.postData.hasOwnProperty(i)) {
          formData.append(i, data.postData[i]);
        }
      }

      // Modify data before upload
      formData = data.beforeSend.call(data.$el, formData, file);

      return formData;
    }

    /**
     * @plugin
     * @name Upload
     * @description A jQuery plugin for simple drag and drop uploads.
     * @type widget
     * @main upload.js
     * @main upload.css
     * @dependency jQuery
     * @dependency core.js
     */

    var Plugin = Formstone.Plugin("upload", {
        widget: true,

        /**
         * @options
         * @param accept [string] "Input accept attribute"
         * @param action [string] "Where to submit uploads"
         * @param autoUpload [boolean] <false> "Beging upload when files are dropped"
         * @param beforeSend [function] "Run before request sent, must return modified formdata or `false` to cancel"
         * @param chunked [boolean] <false> "Use chunked uploading, if supported"
         * @param chunkSize [int] <100> "Size to chunk, in kB"
         * @param customClass [string] <''> "Class applied to instance"
         * @param dataType [string] <'html'> "Data type of AJAX request"
         * @param headers [object] "An object of additional header key/value pairs to send along with requests"
         * @param label [string] <'Drag and drop files or click to select'> "Drop target text; `false` to disable"
         * @param leave [string] <'You have uploads pending, are you sure you want to leave this page?'> "Before leave message"
         * @param maxConcurrent [int] <2> "Number of files to simultaneously upload"
         * @param maxFiles [int OR boolean] <false> "Total number of files that can be uploaded; `false` to disable"
         * @param maxSize [int] <5242880> "Max file size allowed"
         * @param multiple [true] <true> "Flag to allow mutiple file uploads"
         * @param postData [object] "Extra data to post with upload"
         * @param postKey [string] <'file'> "Key to upload file as"
         * @param theme [string] <"fs-light"> "Theme class name"
         */

        defaults: {
          accept: false,
          action: "",
          autoUpload: true,
          beforeSend: function(formdata) {
            return formdata;
          },
          chunked: false,
          chunkSize: 100,
          customClass: "",
          dataType: "html",
          headers: {},
          label: "Drag and drop files or click to select",
          leave: "You have uploads pending, are you sure you want to leave this page?",
          maxConcurrent: 2,
          // maxQueue       : 2,
          maxFiles: false,
          maxSize: 5242880, // 5 mb
          multiple: true,
          postData: {},
          postKey: "file",
          theme: "fs-light"
        },

        classes: [
          "input",
          "target",
          "multiple",
          "dropping",
          "disabled",
          "focus"
        ],

        methods: {
          _construct: construct,
          _destruct: destruct,

          disable: disableUpload,
          enable: enableUpload,
          abort: abortUpload,
          start: startUpload
        }
      }),

      // Localize References

      Classes = Plugin.classes,
      RawClasses = Classes.raw,
      Events = Plugin.events,
      Functions = Plugin.functions,

      Window = Formstone.window,
      $Window = Formstone.$window,

      // Internal
      BlobSliceMethod = false;

    // Setup

    Formstone.Ready(setup);

    /**
     * @events
     * @event chunkcomplete "File chunk complete"
     * @event chunkstart "File chunk starting"
     * @event chunkerror "File chunk error"
     * @event complete "All uploads are complete"
     * @event filecomplete "Specific upload complete"
     * @event filedragenter "File dragged into target"
     * @event filedragleave "File dragged from target"
     * @event filedragover "File dragged over target"
     * @event fileerror "Specific upload error"
     * @event fileprogress "Specific upload progress"
     * @event filestart "Specific upload starting"
     * @event fileremove "Specific upload removed"
     * @event start "Uploads starting"
     * @event queued "Files are queued for upload"
     */

    Events.chunkComplete = "chunkcomplete";
    Events.chunkError = "chunkerror";
    Events.chunkStart = "chunkstart";
    Events.complete = "complete";
    Events.fileComplete = "filecomplete";
    Events.fileDragEnter = "filedragenter";
    Events.fileDragLeave = "filedragleave";
    Events.fileDragOver = "filedragover";
    Events.fileError = "fileerror";
    Events.fileProgress = "fileprogress";
    Events.fileStart = "filestart";
    Events.start = "start";
    Events.queued = "queued";

  })

);
