/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { toBlobURL } from "./utils";
import { CORE_URL, FFMessageType, MIME_TYPE_JAVASCRIPT, MIME_TYPE_WASM, } from "./const";
import { ERROR_UNKNOWN_MESSAGE_TYPE, ERROR_NOT_LOADED } from "./errors";
let ffmpeg;
const load = async ({ coreURL: _coreURL = CORE_URL, wasmURL: _wasmURL, workerURL: _workerURL, blob = true, thread = false, }) => {
    const first = !ffmpeg;
    let coreURL = _coreURL;
    let wasmURL = _wasmURL ? _wasmURL : _coreURL.replace(/.js$/g, ".wasm");
    let workerURL = _workerURL
        ? _workerURL
        : _coreURL.replace(/.js$/g, ".worker.js");
    if (blob) {
        coreURL = await toBlobURL(coreURL, MIME_TYPE_JAVASCRIPT, (data) => self.postMessage({ type: FFMessageType.DOWNLOAD, data }));
        wasmURL = await toBlobURL(wasmURL, MIME_TYPE_WASM, (data) => self.postMessage({ type: FFMessageType.DOWNLOAD, data }));
        if (thread) {
            workerURL = await toBlobURL(workerURL, MIME_TYPE_JAVASCRIPT, (data) => self.postMessage({ type: FFMessageType.DOWNLOAD, data }));
        }
    }
    importScripts(coreURL);
    ffmpeg = await self.createFFmpegCore({
        // Fix `Overload resolution failed.` when using multi-threaded ffmpeg-core.
        mainScriptUrlOrBlob: coreURL,
        locateFile: (path, prefix) => {
            if (path.endsWith(".wasm"))
                return wasmURL;
            if (path.endsWith(".worker.js"))
                return workerURL;
            return prefix + path;
        },
    });
    ffmpeg.setLogger((data) => self.postMessage({ type: FFMessageType.LOG, data }));
    ffmpeg.setProgress((progress) => self.postMessage({ type: FFMessageType.PROGRESS, data: { progress } }));
    return first;
};
const exec = ({ args, timeout = -1 }) => {
    ffmpeg.setTimeout(timeout);
    ffmpeg.exec(...args);
    const ret = ffmpeg.ret;
    ffmpeg.reset();
    return ret;
};
const writeFile = ({ path, data }) => {
    ffmpeg.FS.writeFile(path, data);
    return true;
};
const readFile = ({ path, encoding }) => ffmpeg.FS.readFile(path, { encoding });
// TODO: check if deletion works.
const deleteFile = ({ path }) => {
    ffmpeg.FS.unlink(path);
    return true;
};
const rename = ({ oldPath, newPath }) => {
    ffmpeg.FS.rename(oldPath, newPath);
    return true;
};
// TODO: check if creation works.
const createDir = ({ path }) => {
    ffmpeg.FS.mkdir(path);
    return true;
};
const listDir = ({ path }) => {
    return ffmpeg.FS.readdir(path);
};
// TODO: check if deletion works.
const deleteDir = ({ path }) => {
    ffmpeg.FS.rmdir(path);
    return true;
};
self.onmessage = async ({ data: { id, type, data: _data }, }) => {
    const trans = [];
    let data;
    try {
        if (type !== FFMessageType.LOAD && !ffmpeg)
            throw ERROR_NOT_LOADED;
        switch (type) {
            case FFMessageType.LOAD:
                data = await load(_data);
                break;
            case FFMessageType.EXEC:
                data = exec(_data);
                break;
            case FFMessageType.WRITE_FILE:
                data = writeFile(_data);
                break;
            case FFMessageType.READ_FILE:
                data = readFile(_data);
                break;
            case FFMessageType.DELETE_FILE:
                data = deleteFile(_data);
                break;
            case FFMessageType.RENAME:
                data = rename(_data);
                break;
            case FFMessageType.CREATE_DIR:
                data = createDir(_data);
                break;
            case FFMessageType.LIST_DIR:
                data = listDir(_data);
                break;
            case FFMessageType.DELETE_DIR:
                data = deleteDir(_data);
                break;
            default:
                throw ERROR_UNKNOWN_MESSAGE_TYPE;
        }
    }
    catch (e) {
        self.postMessage({ id, type: FFMessageType.ERROR, data: e });
        return;
    }
    if (data instanceof Uint8Array) {
        trans.push(data.buffer);
    }
    self.postMessage({ id, type, data }, trans);
};
