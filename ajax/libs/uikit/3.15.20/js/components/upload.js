/*! UIkit 3.15.20 | https://www.getuikit.com | (c) 2014 - 2023 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitupload', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitUpload = factory(global.UIkit.util));
})(this, (function (uikitUtil) { 'use strict';

    var Component = {
      props: {
        allow: String,
        clsDragover: String,
        concurrent: Number,
        maxSize: Number,
        method: String,
        mime: String,
        msgInvalidMime: String,
        msgInvalidName: String,
        msgInvalidSize: String,
        multiple: Boolean,
        name: String,
        params: Object,
        type: String,
        url: String
      },

      data: {
        allow: false,
        clsDragover: 'uk-dragover',
        concurrent: 1,
        maxSize: 0,
        method: 'POST',
        mime: false,
        msgInvalidMime: 'Invalid File Type: %s',
        msgInvalidName: 'Invalid File Name: %s',
        msgInvalidSize: 'Invalid File Size: %s Kilobytes Max',
        multiple: false,
        name: 'files[]',
        params: {},
        type: '',
        url: '',
        abort: uikitUtil.noop,
        beforeAll: uikitUtil.noop,
        beforeSend: uikitUtil.noop,
        complete: uikitUtil.noop,
        completeAll: uikitUtil.noop,
        error: uikitUtil.noop,
        fail: uikitUtil.noop,
        load: uikitUtil.noop,
        loadEnd: uikitUtil.noop,
        loadStart: uikitUtil.noop,
        progress: uikitUtil.noop
      },

      events: {
        change(e) {
          if (!uikitUtil.matches(e.target, 'input[type="file"]')) {
            return;
          }

          e.preventDefault();

          if (e.target.files) {
            this.upload(e.target.files);
          }

          e.target.value = '';
        },

        drop(e) {
          stop(e);

          const transfer = e.dataTransfer;

          if (!(transfer != null && transfer.files)) {
            return;
          }

          uikitUtil.removeClass(this.$el, this.clsDragover);

          this.upload(transfer.files);
        },

        dragenter(e) {
          stop(e);
        },

        dragover(e) {
          stop(e);
          uikitUtil.addClass(this.$el, this.clsDragover);
        },

        dragleave(e) {
          stop(e);
          uikitUtil.removeClass(this.$el, this.clsDragover);
        }
      },

      methods: {
        async upload(files) {
          files = uikitUtil.toArray(files);

          if (!files.length) {
            return;
          }

          uikitUtil.trigger(this.$el, 'upload', [files]);

          for (const file of files) {
            if (this.maxSize && this.maxSize * 1000 < file.size) {
              this.fail(this.msgInvalidSize.replace('%s', this.maxSize));
              return;
            }

            if (this.allow && !match(this.allow, file.name)) {
              this.fail(this.msgInvalidName.replace('%s', this.allow));
              return;
            }

            if (this.mime && !match(this.mime, file.type)) {
              this.fail(this.msgInvalidMime.replace('%s', this.mime));
              return;
            }
          }

          if (!this.multiple) {
            files = files.slice(0, 1);
          }

          this.beforeAll(this, files);

          const chunks = chunk(files, this.concurrent);
          const upload = async (files) => {
            const data = new FormData();

            files.forEach((file) => data.append(this.name, file));

            for (const key in this.params) {
              data.append(key, this.params[key]);
            }

            try {
              const xhr = await uikitUtil.ajax(this.url, {
                data,
                method: this.method,
                responseType: this.type,
                beforeSend: (env) => {
                  const { xhr } = env;
                  xhr.upload && uikitUtil.on(xhr.upload, 'progress', this.progress);
                  for (const type of ['loadStart', 'load', 'loadEnd', 'abort']) {
                    uikitUtil.on(xhr, type.toLowerCase(), this[type]);
                  }

                  return this.beforeSend(env);
                }
              });

              this.complete(xhr);

              if (chunks.length) {
                await upload(chunks.shift());
              } else {
                this.completeAll(xhr);
              }
            } catch (e) {
              this.error(e);
            }
          };

          await upload(chunks.shift());
        }
      }
    };

    function match(pattern, path) {
      return path.match(
      new RegExp(
      `^${pattern.
  replace(/\//g, '\\/').
  replace(/\*\*/g, '(\\/[^\\/]+)*').
  replace(/\*/g, '[^\\/]+').
  replace(/((?!\\))\?/g, '$1.')}$`,
      'i'));


    }

    function chunk(files, size) {
      const chunks = [];
      for (let i = 0; i < files.length; i += size) {
        chunks.push(files.slice(i, i + size));
      }
      return chunks;
    }

    function stop(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (typeof window !== 'undefined' && window.UIkit) {
      window.UIkit.component('upload', Component);
    }

    return Component;

}));
