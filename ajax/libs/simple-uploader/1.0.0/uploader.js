(function() {
  var Uploader,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Uploader = (function(_super) {
    __extends(Uploader, _super);

    Uploader.count = 0;

    Uploader.prototype.opts = {
      url: '',
      params: null,
      connectionCount: 3,
      leaveConfirm: '正在上传文件，如果离开上传会自动取消'
    };

    Uploader.prototype.files = [];

    Uploader.prototype.queue = [];

    Uploader.prototype.html5 = !!(window.File && window.FileList);

    function Uploader(opts) {
      var _this = this;
      if (opts == null) {
        opts = {};
      }
      $.extend(this.opts, opts);
      this.id = ++Uploader.count;
      this.on('uploadcomplete', function(e, file) {
        _this.files.splice($.inArray(file, _this.files), 1);
        if (_this.queue.length > 0 && _this.files.length < _this.opts.connectionCount) {
          return _this.upload(_this.queue.shift());
        } else {
          return _this.uploading = false;
        }
      });
      $(window).on('beforeunload.uploader-' + this.id, function(e) {
        if (!_this.uploading) {
          return;
        }
        e.originalEvent.returnValue = _this.opts.leaveConfirm;
        return _this.opts.leaveConfirm;
      });
    }

    Uploader.prototype.generateId = (function() {
      var id;
      id = 0;
      return function() {
        return id += 1;
      };
    })();

    Uploader.prototype.upload = function(file, opts) {
      var f, _i, _len;
      if (opts == null) {
        opts = {};
      }
      if (file == null) {
        return;
      }
      if ($.isArray(file)) {
        for (_i = 0, _len = file.length; _i < _len; _i++) {
          f = file[_i];
          this.upload(f, opts);
        }
      } else if ($(file).is('input:file') && this.html5) {
        this.upload($.makeArray($(file)[0].files), opts);
      } else if (!file.id || !file.obj) {
        file = this.getFile(file);
      }
      if (!(file && file.obj)) {
        return;
      }
      $.extend(file, opts);
      if (this.files.length >= this.opts.connectionCount) {
        this.queue.push(file);
        return;
      }
      if (this.triggerHandler('beforeupload', [file]) === false) {
        return;
      }
      this.files.push(file);
      if (this.html5) {
        this.xhrUpload(file);
      } else {
        this.iframeUpload(file);
      }
      return this.uploading = true;
    };

    Uploader.prototype.getFile = function(fileObj) {
      var name, _ref, _ref1;
      if (fileObj instanceof window.File || fileObj instanceof window.Blob) {
        name = (_ref = fileObj.fileName) != null ? _ref : fileObj.name;
      } else if ($(fileObj).is('input:file')) {
        name = $input.val().replace(/.*(\/|\\)/, "");
        fileObj = $(fileObj).clone();
      } else {
        return null;
      }
      return {
        id: this.generateId(),
        url: this.opts.url,
        params: this.opts.params,
        name: name,
        size: (_ref1 = fileObj.fileSize) != null ? _ref1 : fileObj.size,
        ext: name ? name.split('.').pop().toLowerCase() : '',
        obj: fileObj
      };
    };

    Uploader.prototype.xhrUpload = function(file) {
      var formData, k, v, _ref,
        _this = this;
      formData = new FormData();
      formData.append("upload_file", file.obj);
      formData.append("original_filename", file.name);
      if (file.params) {
        _ref = file.params;
        for (k in _ref) {
          v = _ref[k];
          formData.append(k, v);
        }
      }
      return file.xhr = $.ajax({
        url: file.url,
        data: formData,
        processData: false,
        contentType: false,
        type: 'POST',
        headers: {
          'X-File-Name': encodeURIComponent(file.name)
        },
        xhr: function() {
          var req,
            _this = this;
          req = $.ajaxSettings.xhr();
          if (req) {
            req.upload.onprogress = function(e) {
              return _this.progress(e);
            };
          }
          return req;
        },
        progress: function(e) {
          if (!e.lengthComputable) {
            return;
          }
          return _this.trigger('uploadprogress', [file, e.loaded, e.total]);
        },
        error: function(xhr, status, err) {
          return _this.trigger('uploaderror', [file, xhr, status]);
        },
        success: function(result) {
          _this.trigger('uploadprogress', [file, file.size, file.size]);
          return _this.trigger('uploadsuccess', [file, result]);
        },
        complete: function(xhr, status) {
          return _this.trigger('uploadcomplete', [file, xhr.responseText]);
        }
      });
    };

    Uploader.prototype.iframeUpload = function(file) {
      var k, v, _ref,
        _this = this;
      file.iframe = $('iframe', {
        src: 'javascript:false;',
        name: 'uploader-' + file.id
      }).hide().appendTo(document.body);
      file.form = $('<form/>', {
        method: 'post',
        enctype: 'multipart/form-data',
        action: file.url,
        target: file.iframe[0].name
      }).hide().append(file.obj).appendTo(document.body);
      if (file.params) {
        _ref = file.params;
        for (k in _ref) {
          v = _ref[k];
          $('<input/>', {
            type: 'hidden',
            name: k,
            value: v
          }).appendTo(form);
        }
      }
      file.iframe.on('load', function() {
        var error, iframeDoc, json, responseEl, result;
        if (!(iframe.parent().length > 0)) {
          return;
        }
        iframeDoc = iframe[0].contentDocument;
        if (iframeDoc && iframeDoc.body && iframeDoc.body.innerHTML === "false") {
          return;
        }
        responseEl = iframeDoc.getElementById('json-response');
        json = responseEl ? responseEl.innerHTML : iframeDoc.body.innerHTML;
        try {
          result = $.parseJSON(json);
        } catch (_error) {
          error = _error;
          _this.trigger('uploaderror', [file, null, 'parsererror']);
          result = {};
        }
        if (result.success) {
          _this.trigger('uploadsuccess', [file, result]);
        }
        _this.trigger('uploadcomplete', [file, result]);
        return file.iframe.remove();
      });
      return file.form.submit().remove();
    };

    Uploader.prototype.cancel = function(file) {
      var f, _i, _len, _ref;
      if (!file.id) {
        _ref = this.files;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          f = _ref[_i];
          if (f.id === file) {
            file = f;
            break;
          }
        }
      }
      this.trigger('uploadcancel', [file]);
      if (this.html5) {
        if (file.xhr) {
          file.xhr.abort();
        }
        return file.xhr = null;
      } else {
        file.iframe.attr('src', 'javascript:false;').remove();
        return this.trigger('uploadcomplete', [file]);
      }
    };

    Uploader.prototype.readImageFile = function(fileObj, callback) {
      var fileReader, img;
      if (!$.isFunction(callback)) {
        return;
      }
      img = new Image();
      img.onload = function() {
        return callback(img);
      };
      img.onerror = function() {
        return callback();
      };
      if (window.FileReader && FileReader.prototype.readAsDataURL && /^image/.test(fileObj.type)) {
        fileReader = new FileReader();
        fileReader.onload = function(e) {
          return img.src = e.target.result;
        };
        return fileReader.readAsDataURL(fileObj);
      } else {
        return callback();
      }
    };

    Uploader.prototype.destroy = function() {
      var file, _i, _len, _ref;
      this.queue.length = 0;
      _ref = this.files;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        this.cancel(file);
      }
      $(window).off('.uploader-' + this.id);
      return $(document).off('.uploader-' + this.id);
    };

    return Uploader;

  })(Module);

  this.simple || (this.simple = {});

  this.simple.uploader = function(opts) {
    return new Uploader(opts);
  };

}).call(this);
