/*! UIkit 3.11.1 | https://www.getuikit.com | (c) 2014 - 2022 YOOtheme | MIT License */

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

            change: function(e) {

                if (!uikitUtil.matches(e.target, 'input[type="file"]')) {
                    return;
                }

                e.preventDefault();

                if (e.target.files) {
                    this.upload(e.target.files);
                }

                e.target.value = '';
            },

            drop: function(e) {
                stop(e);

                var transfer = e.dataTransfer;

                if (!transfer || !transfer.files) {
                    return;
                }

                uikitUtil.removeClass(this.$el, this.clsDragover);

                this.upload(transfer.files);
            },

            dragenter: function(e) {
                stop(e);
            },

            dragover: function(e) {
                stop(e);
                uikitUtil.addClass(this.$el, this.clsDragover);
            },

            dragleave: function(e) {
                stop(e);
                uikitUtil.removeClass(this.$el, this.clsDragover);
            }

        },

        methods: {

            upload: function(files) {
                var this$1$1 = this;


                if (!files.length) {
                    return;
                }

                uikitUtil.trigger(this.$el, 'upload', [files]);

                for (var i = 0; i < files.length; i++) {

                    if (this.maxSize && this.maxSize * 1000 < files[i].size) {
                        this.fail(this.msgInvalidSize.replace('%s', this.maxSize));
                        return;
                    }

                    if (this.allow && !match(this.allow, files[i].name)) {
                        this.fail(this.msgInvalidName.replace('%s', this.allow));
                        return;
                    }

                    if (this.mime && !match(this.mime, files[i].type)) {
                        this.fail(this.msgInvalidMime.replace('%s', this.mime));
                        return;
                    }

                }

                if (!this.multiple) {
                    files = [files[0]];
                }

                this.beforeAll(this, files);

                var chunks = chunk(files, this.concurrent);
                var upload = function (files) {

                    var data = new FormData();

                    files.forEach(function (file) { return data.append(this$1$1.name, file); });

                    for (var key in this$1$1.params) {
                        data.append(key, this$1$1.params[key]);
                    }

                    uikitUtil.ajax(this$1$1.url, {
                        data: data,
                        method: this$1$1.method,
                        responseType: this$1$1.type,
                        beforeSend: function (env) {

                            var xhr = env.xhr;
                            xhr.upload && uikitUtil.on(xhr.upload, 'progress', this$1$1.progress);
                            ['loadStart', 'load', 'loadEnd', 'abort'].forEach(function (type) { return uikitUtil.on(xhr, type.toLowerCase(), this$1$1[type]); }
                            );

                            return this$1$1.beforeSend(env);

                        }
                    }).then(
                        function (xhr) {

                            this$1$1.complete(xhr);

                            if (chunks.length) {
                                upload(chunks.shift());
                            } else {
                                this$1$1.completeAll(xhr);
                            }

                        },
                        function (e) { return this$1$1.error(e); }
                    );

                };

                upload(chunks.shift());

            }

        }

    };

    function match(pattern, path) {
        return path.match(new RegExp(("^" + (pattern.replace(/\//g, '\\/').replace(/\*\*/g, '(\\/[^\\/]+)*').replace(/\*/g, '[^\\/]+').replace(/((?!\\))\?/g, '$1.')) + "$"), 'i'));
    }

    function chunk(files, size) {
        var chunks = [];
        for (var i = 0; i < files.length; i += size) {
            var chunk = [];
            for (var j = 0; j < size; j++) {
                chunk.push(files[i + j]);
            }
            chunks.push(chunk);
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
