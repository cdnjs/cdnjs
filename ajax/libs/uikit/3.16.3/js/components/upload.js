/*! UIkit 3.16.3 | https://www.getuikit.com | (c) 2014 - 2023 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitupload', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitUpload = factory(global.UIkit.util));
})(this, (function (uikitUtil) { 'use strict';

    var I18n = {
      props: {
        i18n: Object
      },
      data: {
        i18n: null
      },
      methods: {
        t(key, ...params) {
          var _a, _b, _c;
          let i = 0;
          return ((_c = ((_a = this.i18n) == null ? void 0 : _a[key]) || ((_b = this.$options.i18n) == null ? void 0 : _b[key])) == null ? void 0 : _c.replace(
            /%s/g,
            () => params[i++] || ""
          )) || "";
        }
      }
    };

    var Component = {
      mixins: [I18n],
      i18n: {
        invalidMime: "Invalid File Type: %s",
        invalidName: "Invalid File Name: %s",
        invalidSize: "Invalid File Size: %s Kilobytes Max"
      },
      props: {
        allow: String,
        clsDragover: String,
        concurrent: Number,
        maxSize: Number,
        method: String,
        mime: String,
        multiple: Boolean,
        name: String,
        params: Object,
        type: String,
        url: String
      },
      data: {
        allow: false,
        clsDragover: "uk-dragover",
        concurrent: 1,
        maxSize: 0,
        method: "POST",
        mime: false,
        multiple: false,
        name: "files[]",
        params: {},
        type: "",
        url: "",
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
          e.target.value = "";
        },
        drop(e) {
          stop(e);
          const transfer = e.dataTransfer;
          if (!(transfer == null ? void 0 : transfer.files)) {
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
          uikitUtil.trigger(this.$el, "upload", [files]);
          for (const file of files) {
            if (this.maxSize && this.maxSize * 1e3 < file.size) {
              this.fail(this.t("invalidSize", this.maxSize));
              return;
            }
            if (this.allow && !match(this.allow, file.name)) {
              this.fail(this.t("invalidName", this.allow));
              return;
            }
            if (this.mime && !match(this.mime, file.type)) {
              this.fail(this.t("invalidMime", this.mime));
              return;
            }
          }
          if (!this.multiple) {
            files = files.slice(0, 1);
          }
          this.beforeAll(this, files);
          const chunks = chunk(files, this.concurrent);
          const upload = async (files2) => {
            const data = new FormData();
            files2.forEach((file) => data.append(this.name, file));
            for (const key in this.params) {
              data.append(key, this.params[key]);
            }
            try {
              const xhr = await ajax(this.url, {
                data,
                method: this.method,
                responseType: this.type,
                beforeSend: (env) => {
                  const { xhr: xhr2 } = env;
                  uikitUtil.on(xhr2.upload, "progress", this.progress);
                  for (const type of ["loadStart", "load", "loadEnd", "abort"]) {
                    uikitUtil.on(xhr2, type.toLowerCase(), this[type]);
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
          `^${pattern.replace(/\//g, "\\/").replace(/\*\*/g, "(\\/[^\\/]+)*").replace(/\*/g, "[^\\/]+").replace(/((?!\\))\?/g, "$1.")}$`,
          "i"
        )
      );
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
    function ajax(url, options) {
      const env = {
        data: null,
        method: "GET",
        headers: {},
        xhr: new XMLHttpRequest(),
        beforeSend: uikitUtil.noop,
        responseType: "",
        ...options
      };
      return Promise.resolve().then(() => env.beforeSend(env)).then(() => send(url, env));
    }
    function send(url, env) {
      return new Promise((resolve, reject) => {
        const { xhr } = env;
        for (const prop in env) {
          if (prop in xhr) {
            try {
              xhr[prop] = env[prop];
            } catch (e) {
            }
          }
        }
        xhr.open(env.method.toUpperCase(), url);
        for (const header in env.headers) {
          xhr.setRequestHeader(header, env.headers[header]);
        }
        uikitUtil.on(xhr, "load", () => {
          if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            resolve(xhr);
          } else {
            reject(
              uikitUtil.assign(Error(xhr.statusText), {
                xhr,
                status: xhr.status
              })
            );
          }
        });
        uikitUtil.on(xhr, "error", () => reject(uikitUtil.assign(Error("Network Error"), { xhr })));
        uikitUtil.on(xhr, "timeout", () => reject(uikitUtil.assign(Error("Network Timeout"), { xhr })));
        xhr.send(env.data);
      });
    }

    if (typeof window !== "undefined" && window.UIkit) {
      window.UIkit.component("upload", Component);
    }

    return Component;

}));
