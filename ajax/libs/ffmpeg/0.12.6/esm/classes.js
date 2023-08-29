import { FFMessageType } from "./const.js";
import { getMessageID } from "./utils.js";
import { ERROR_TERMINATED, ERROR_NOT_LOADED } from "./errors.js";
/**
 * Provides APIs to interact with ffmpeg web worker.
 *
 * @example
 * ```ts
 * const ffmpeg = new FFmpeg();
 * ```
 */
export class FFmpeg {
    #worker = null;
    /**
     * #resolves and #rejects tracks Promise resolves and rejects to
     * be called when we receive message from web worker.
     */
    #resolves = {};
    #rejects = {};
    #logEventCallbacks = [];
    #progressEventCallbacks = [];
    loaded = false;
    /**
     * register worker message event handlers.
     */
    #registerHandlers = () => {
        if (this.#worker) {
            this.#worker.onmessage = ({ data: { id, type, data }, }) => {
                switch (type) {
                    case FFMessageType.LOAD:
                        this.loaded = true;
                        this.#resolves[id](data);
                        break;
                    case FFMessageType.EXEC:
                    case FFMessageType.WRITE_FILE:
                    case FFMessageType.READ_FILE:
                    case FFMessageType.DELETE_FILE:
                    case FFMessageType.RENAME:
                    case FFMessageType.CREATE_DIR:
                    case FFMessageType.LIST_DIR:
                    case FFMessageType.DELETE_DIR:
                        this.#resolves[id](data);
                        break;
                    case FFMessageType.LOG:
                        this.#logEventCallbacks.forEach((f) => f(data));
                        break;
                    case FFMessageType.PROGRESS:
                        this.#progressEventCallbacks.forEach((f) => f(data));
                        break;
                    case FFMessageType.ERROR:
                        this.#rejects[id](data);
                        break;
                }
                delete this.#resolves[id];
                delete this.#rejects[id];
            };
        }
    };
    /**
     * Generic function to send messages to web worker.
     */
    #send = ({ type, data }, trans = []) => {
        if (!this.#worker) {
            return Promise.reject(ERROR_NOT_LOADED);
        }
        return new Promise((resolve, reject) => {
            const id = getMessageID();
            this.#worker && this.#worker.postMessage({ id, type, data }, trans);
            this.#resolves[id] = resolve;
            this.#rejects[id] = reject;
        });
    };
    on(event, callback) {
        if (event === "log") {
            this.#logEventCallbacks.push(callback);
        }
        else if (event === "progress") {
            this.#progressEventCallbacks.push(callback);
        }
    }
    off(event, callback) {
        if (event === "log") {
            this.#logEventCallbacks = this.#logEventCallbacks.filter((f) => f !== callback);
        }
        else if (event === "progress") {
            this.#progressEventCallbacks = this.#progressEventCallbacks.filter((f) => f !== callback);
        }
    }
    /**
     * Loads ffmpeg-core inside web worker. It is required to call this method first
     * as it initializes WebAssembly and other essential variables.
     *
     * @category FFmpeg
     * @returns `true` if ffmpeg core is loaded for the first time.
     */
    load = (config = {}) => {
        if (!this.#worker) {
            this.#worker = new Worker(new URL("./worker.js", import.meta.url), {
                type: "module",
            });
            this.#registerHandlers();
        }
        return this.#send({
            type: FFMessageType.LOAD,
            data: config,
        });
    };
    /**
     * Execute ffmpeg command.
     *
     * @remarks
     * To avoid common I/O issues, ["-nostdin", "-y"] are prepended to the args
     * by default.
     *
     * @example
     * ```ts
     * const ffmpeg = new FFmpeg();
     * await ffmpeg.load();
     * await ffmpeg.writeFile("video.avi", ...);
     * // ffmpeg -i video.avi video.mp4
     * await ffmpeg.exec(["-i", "video.avi", "video.mp4"]);
     * const data = ffmpeg.readFile("video.mp4");
     * ```
     *
     * @returns `0` if no error, `!= 0` if timeout (1) or error.
     * @category FFmpeg
     */
    exec = (
    /** ffmpeg command line args */
    args, 
    /**
     * milliseconds to wait before stopping the command execution.
     *
     * @defaultValue -1
     */
    timeout = -1) => this.#send({
        type: FFMessageType.EXEC,
        data: { args, timeout },
    });
    /**
     * Terminate all ongoing API calls and terminate web worker.
     * `FFmpeg.load()` must be called again before calling any other APIs.
     *
     * @category FFmpeg
     */
    terminate = () => {
        const ids = Object.keys(this.#rejects);
        // rejects all incomplete Promises.
        for (const id of ids) {
            this.#rejects[id](ERROR_TERMINATED);
            delete this.#rejects[id];
            delete this.#resolves[id];
        }
        if (this.#worker) {
            this.#worker.terminate();
            this.#worker = null;
            this.loaded = false;
        }
    };
    /**
     * Write data to ffmpeg.wasm.
     *
     * @example
     * ```ts
     * const ffmpeg = new FFmpeg();
     * await ffmpeg.load();
     * await ffmpeg.writeFile("video.avi", await fetchFile("../video.avi"));
     * await ffmpeg.writeFile("text.txt", "hello world");
     * ```
     *
     * @category File System
     */
    writeFile = (path, data) => {
        const trans = [];
        if (data instanceof Uint8Array) {
            trans.push(data.buffer);
        }
        return this.#send({
            type: FFMessageType.WRITE_FILE,
            data: { path, data },
        }, trans);
    };
    /**
     * Read data from ffmpeg.wasm.
     *
     * @example
     * ```ts
     * const ffmpeg = new FFmpeg();
     * await ffmpeg.load();
     * const data = await ffmpeg.readFile("video.mp4");
     * ```
     *
     * @category File System
     */
    readFile = (path, 
    /**
     * File content encoding, supports two encodings:
     * - utf8: read file as text file, return data in string type.
     * - binary: read file as binary file, return data in Uint8Array type.
     *
     * @defaultValue binary
     */
    encoding = "binary") => this.#send({
        type: FFMessageType.READ_FILE,
        data: { path, encoding },
    });
    /**
     * Delete a file.
     *
     * @category File System
     */
    deleteFile = (path) => this.#send({
        type: FFMessageType.DELETE_FILE,
        data: { path },
    });
    /**
     * Rename a file or directory.
     *
     * @category File System
     */
    rename = (oldPath, newPath) => this.#send({
        type: FFMessageType.RENAME,
        data: { oldPath, newPath },
    });
    /**
     * Create a directory.
     *
     * @category File System
     */
    createDir = (path) => this.#send({
        type: FFMessageType.CREATE_DIR,
        data: { path },
    });
    /**
     * List directory contents.
     *
     * @category File System
     */
    listDir = (path) => this.#send({
        type: FFMessageType.LIST_DIR,
        data: { path },
    });
    /**
     * Delete an empty directory.
     *
     * @category File System
     */
    deleteDir = (path) => this.#send({
        type: FFMessageType.DELETE_DIR,
        data: { path },
    });
}
