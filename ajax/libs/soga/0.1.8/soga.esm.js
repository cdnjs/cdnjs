/**
 * soga.js v0.1.8
 * (c) 2017-2019 musicode
 * Released under the MIT License.
 */

function createResponse (xhr, headers) {
    function response() {
        return {
            ok: xhr.status >= 200 && xhr.status < 300,
            statusText: xhr.statusText || 'OK',
            status: xhr.status || 200,
            url: xhr.responseURL || headers['x-request-url'] || '',
            headers: {
                get(name) {
                    return headers[name.toLowerCase()];
                },
                has(name) {
                    return name.toLowerCase() in headers;
                }
            },
            body: xhr.response || xhr.responseText,
            text() {
                return xhr.responseText;
            },
            json() {
                return JSON.parse(xhr.responseText);
            },
            blob() {
                return new Blob([xhr.response]);
            },
            clone: response,
        };
    }
    return response;
}

function parseResponse (xhr) {
    const headers = {};
    const rawHeaders = xhr.getAllResponseHeaders() || '';
    rawHeaders.replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function (match, key, value) {
        headers[key.toLowerCase()] = value;
        return match;
    });
    return createResponse(xhr, headers);
}

function setRequestHeaders (xhr, headers) {
    for (let key in headers) {
        xhr.setRequestHeader(key, headers[key]);
    }
}

function stringifyValue(value) {
    const type = typeof value;
    if (type === 'string') {
        return encodeURIComponent(value);
    }
    else if (type !== 'undefined') {
        return '' + value;
    }
}
function stringifyQuery (data) {
    const list = [];
    for (let key in data) {
        let value = data[key];
        if (Array.isArray(value)) {
            for (let i = 0, len = value.length; i < len; i++) {
                let item = stringifyValue(value[i]);
                if (typeof item === 'string') {
                    list.push(key + '[]=' + item);
                }
            }
        }
        else {
            value = stringifyValue(value);
            if (typeof value === 'string') {
                list.push(key + '=' + value);
            }
        }
    }
    return list.join('&');
}

function fetch(url, options = {}) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        const method = options.method
            ? options.method.toLowerCase()
            : 'get';
        let data = options.body || null;
        if (options.data) {
            let query = stringifyQuery(options.data);
            if (query) {
                if (method === 'get') {
                    url += '?' + query;
                }
                else if (!data) {
                    data = query;
                }
            }
        }
        xhr.open(method, url, true);
        xhr.onload = function () {
            const response = parseResponse(xhr);
            resolve(response());
        };
        xhr.onerror = reject;
        /**
         * The credentials indicates whether the user agent should send cookies
         * from the other domain in the case of cross-origin requests.
         *
         * omit: Never send or receive cookies
         *
         * include: Always send user credentials (cookies, basic http auth, etc..), even for cross-origin calls
         *
         * same-origin: Send user credentials (cookies, basic http auth, etc..) if the URL is on the same origin as the calling script.
         *              This is the default value.
         */
        if (options.credentials === 'include') {
            xhr.withCredentials = true;
        }
        else if (options.credentials === 'omit') {
            xhr.withCredentials = false;
        }
        setRequestHeaders(xhr, options.headers);
        xhr.send(data);
    });
}

class AjaxUploader {
    static support() {
        const xhr = new XMLHttpRequest();
        return 'upload' in xhr && 'onprogress' in xhr.upload;
    }
    constructor(file, hooks) {
        const instance = this;
        instance.file = file;
        instance.hooks = hooks;
        // 碰到过传了几个分片之后，file.size 变成 0 的情况
        // 因此先存一下最初的 fileSize
        instance.fileSize = file.size || 0;
        const xhr = instance.xhr = new XMLHttpRequest();
        xhr.onloadstart = function () {
            if (hooks.onStart) {
                hooks.onStart();
            }
        };
        xhr.onloadend = function () {
            if (hooks.onEnd) {
                hooks.onEnd();
            }
        };
        xhr.onload = function () {
            const { fileSize, chunkInfo } = instance;
            if (chunkInfo) {
                if (chunkInfo.uploaded < fileSize) {
                    chunkInfo.uploaded += chunkInfo.uploading;
                    if (hooks.onChunkSuccess) {
                        hooks.onChunkSuccess({
                            chunkIndex: chunkInfo.options.chunkIndex
                        });
                    }
                    // 还有分片没上传完则继续上传下一个
                    if (chunkInfo.uploaded < fileSize) {
                        chunkInfo.options.chunkIndex++;
                        instance.uploadChunk(chunkInfo.options);
                        return;
                    }
                }
            }
            if (hooks.onSuccess) {
                const response = parseResponse(xhr);
                hooks.onSuccess(response());
            }
        };
        xhr.onerror = function () {
            if (hooks.onError) {
                hooks.onError();
            }
        };
        xhr.onabort = function () {
            if (hooks.onAbort) {
                hooks.onAbort();
            }
        };
        // 下载文件触发的是 xhr.onprogress
        // 上传文件触发的是 xhr.upload.onprogress
        xhr.upload.onprogress = function (event) {
            const { fileSize, chunkInfo } = instance;
            let uploaded;
            if (chunkInfo) {
                // 当前正在上传的分片 size
                const chunkTotal = chunkInfo.uploading;
                // 不能比当前正在上传的 size 还大
                const chunkUploaded = Math.min(chunkTotal, event.loaded);
                if (hooks.onChunkProgress) {
                    hooks.onChunkProgress({
                        chunkIndex: chunkInfo.options.chunkIndex,
                        uploaded: chunkUploaded,
                        total: chunkTotal,
                        // 怕浏览器有 bug 导致 chunkTotal 为 0
                        percent: chunkTotal > 0 ? chunkUploaded / chunkTotal : 0
                    });
                }
                // 加上之前上传成功的分片 size
                uploaded = chunkInfo.uploaded + chunkUploaded;
            }
            else {
                // 不能比文件 size 还大
                uploaded = Math.min(fileSize, event.loaded);
            }
            if (hooks.onProgress) {
                hooks.onProgress({
                    uploaded,
                    total: fileSize,
                    // 怕浏览器有 bug 导致 fileSize 为 0
                    percent: fileSize > 0 ? uploaded / fileSize : 0
                });
            }
        };
    }
    /**
     * 上传整个文件
     */
    upload(options) {
        const { xhr, file } = this;
        xhr.open('post', options.action, true);
        if (options.credentials === 'include') {
            xhr.withCredentials = true;
        }
        else if (options.credentials === 'omit') {
            xhr.withCredentials = false;
        }
        const formData = new FormData();
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
        formData.append(options.fileName, file);
        setRequestHeaders(xhr, options.headers);
        xhr.send(formData);
    }
    /**
     * 上传文件分片
     */
    uploadChunk(options) {
        let { xhr, file, fileSize, chunkInfo } = this;
        if (!chunkInfo) {
            chunkInfo = this.chunkInfo = {
                uploaded: 0,
                uploading: 0,
                options,
            };
        }
        else if (chunkInfo.options !== options) {
            chunkInfo.options = options;
        }
        // 默认从第一个分片开始上传，断点续传可以传入指定的分片
        const chunkIndex = options.chunkIndex || 0;
        // 默认一个分片为 4M
        const chunkSize = options.chunkSize || (4 * 1024 * 1024);
        const start = chunkSize * chunkIndex;
        const end = Math.min(fileSize, chunkSize * (chunkIndex + 1));
        chunkInfo.uploading = end - start;
        xhr.open('post', options.action, true);
        // xhr.setRequestHeader 必须在 open() 方法之后，send() 方法之前调用，否则会报错
        // xhr.setRequestHeader 设置相同的请求头不会覆盖，而是追加，如 key: value1, value2
        // 这里改成覆盖
        const headers = {
            Range: `bytes ${start}-${end}/${fileSize}`
        };
        for (let key in options.headers) {
            headers[key] = options.headers[key];
        }
        setRequestHeaders(xhr, headers);
        const blobSlice = File.prototype.slice || File.prototype['webkitSlice'] || File.prototype['mozSlice'];
        xhr.send(blobSlice.call(file, start, end));
    }
    /**
     * 取消上传
     */
    abort() {
        this.xhr.abort();
    }
    /**
     * 销毁
     */
    destroy() {
        this.abort();
    }
}

class FlashUploader {
    constructor(options, hooks = {}) {
        const movieName = createMovieName();
        const swf = createSWF(movieName, options.swfUrl, createFlashVars(movieName, options.accept || '', options.multiple || false));
        const { el } = options;
        if (el.parentNode) {
            el.parentNode.replaceChild(swf, el);
        }
        else {
            throw new Error('el.parentNode is not found.');
        }
        this.swf = swf;
        this.movieName = movieName;
        this.hooks = hooks;
        this.debug = !!options.debug;
        FlashUploader.instances[movieName] = this;
    }
    /**
     * 获得要上传的文件
     */
    getFiles() {
        return this.swf['getFiles']();
    }
    /**
     * 上传
     */
    upload(index, options) {
        this.swf['upload'](index, options.action, options.fileName, options.data, options.headers);
    }
    /**
     * 取消上传
     */
    abort(index) {
        this.swf['abort'](index);
    }
    /**
     * 启用鼠标点击打开文件选择窗口
     */
    enable() {
        this.swf['enable']();
    }
    /**
     * 禁用鼠标点击打开文件选择窗口
     */
    disable() {
        this.swf['disable']();
    }
    /**
     * 销毁对象
     */
    destroy() {
        const files = this.getFiles();
        for (let i = 0, len = files.length; i < len; i++) {
            this.abort(files[i].index);
        }
        this.swf['destroy']();
        FlashUploader.instances[this.movieName] = null;
        // 清除 IE 引用
        window[this.movieName] = null;
    }
    onReady() {
        // swf 文件初始化成功
        const { onReady } = this.hooks;
        if (onReady) {
            onReady();
        }
    }
    onFileChange() {
        // 用户选择文件
        const { onFileChange } = this.hooks;
        if (onFileChange) {
            onFileChange();
        }
    }
    onStart(data) {
        const { onStart } = this.hooks;
        if (onStart) {
            onStart(data.file);
        }
    }
    onEnd(data) {
        const { onEnd } = this.hooks;
        if (onEnd) {
            onEnd(data.file);
        }
    }
    onError(data) {
        const { onError } = this.hooks;
        if (onError) {
            onError(data.file, data.code, data.detail);
        }
    }
    onAbort(data) {
        const { onAbort } = this.hooks;
        if (onAbort) {
            onAbort(data.file);
        }
    }
    onProgress(data) {
        const { onProgress } = this.hooks;
        if (onProgress) {
            const { file, uploaded, total } = data;
            onProgress(file, {
                uploaded,
                total,
                percent: total > 0 ? uploaded / total : 0
            });
        }
    }
    onSuccess(data) {
        const { onSuccess } = this.hooks;
        if (onSuccess) {
            onSuccess(data.file, data.responseText);
        }
    }
    onDebug(data) {
        if (this.debug) {
            console.log(data.text);
        }
    }
}
FlashUploader.instances = {};
/**
 * 文件状态 - 等待上传
 */
FlashUploader.STATUS_WAITING = 0;
/**
 * 文件状态 - 正在上传
 */
FlashUploader.STATUS_UPLOADING = 1;
/**
 * 文件状态 - 上传成功
 */
FlashUploader.STATUS_UPLOAD_SUCCESS = 2;
/**
 * 文件状态 - 上传失败
 */
FlashUploader.STATUS_UPLOAD_ERROR = 3;
/**
 * 文件状态 - 上传中止
 */
FlashUploader.STATUS_UPLOAD_ABORT = 4;
/**
 * 错误码 - 上传出现沙箱安全错误
 */
FlashUploader.ERROR_SECURITY = 0;
/**
 * 错误码 - 上传 IO 错误
 */
FlashUploader.ERROR_IO = 1;
/**
 * 项目名称 AS 会用 projectName.instances[movieName] 找出当前实例
 */
const projectName = 'Soga_Flash_Uploader';
/**
 * 暴露给全局的对象，这样 AS 才能调到
 */
window[projectName] = FlashUploader;
/**
 * guid 初始值
 */
let guid = 0;
/**
 * 创建新的唯一的影片剪辑名称
 */
function createMovieName() {
    return projectName + (guid++);
}
/**
 * 创建 swf 元素
 *
 * 无需兼容 IE67 用现有方法即可
 *
 * 如果想兼容 IE67，有两种方法：
 *
 * 1. 把 wmode 改成 opaque
 * 2. 用 swfobject 或别的库重写此方法
 *
 * 这里不兼容 IE67 是因为要判断浏览器实在太蛋疼了。。。
 */
function createSWF(id, swfUrl, flashVars) {
    const div = document.createElement('div');
    // 不加 ID 在 IE 下没法运行
    div.innerHTML = '<object id="' + id + '" class="' + projectName.toLowerCase()
        + '" type="application/x-shockwave-flash" data="' + swfUrl + '">'
        + '<param name="movie" value="' + swfUrl + '" />'
        + '<param name="allowscriptaccess" value="always" />'
        + '<param name="wmode" value="transparent" />'
        + '<param name="flashvars" value="' + flashVars + '" />'
        + '</object>';
    return div.children[0];
}
/**
 * 拼装给 swf 用的参数
 */
function createFlashVars(movieName, accept, multiple) {
    const result = [
        'projectName=' + projectName,
        'movieName=' + movieName,
        'accept=' + encodeURIComponent(accept),
        'multiple=' + (multiple ? 'true' : 'false')
    ];
    return result.join('&amp;');
}

export { AjaxUploader, FlashUploader, fetch };
//# sourceMappingURL=soga.esm.js.map
