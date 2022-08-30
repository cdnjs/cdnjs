export interface Response {
	readonly ok: boolean;
	readonly status: number;
	readonly statusText: string;
	readonly url: string;
	readonly headers: {
		get(name: string): string | void;
		has(name: string): boolean;
	};
	readonly body: any;
	blob(): Blob;
	json(): any;
	text(): string;
	clone(): Response;
}
export interface FetchOptions {
	body?: BodyInit | null;
	credentials?: RequestCredentials;
	headers?: HeadersInit;
	method?: string;
}
export interface UploadOptions {
	data?: Record<string, any>;
	credentials?: RequestCredentials;
	headers?: HeadersInit;
	fileName: string;
	action: string;
}
export interface UploadChunkOptions {
	headers?: HeadersInit;
	chunkIndex: number;
	chunkSize: number;
	action: string;
}
export interface UploadProgress {
	uploaded: number;
	total: number;
	percent: number;
}
export interface UploadChunkProgress {
	chunkIndex: number;
	uploaded: number;
	total: number;
	percent: number;
}
export interface UploadChunkSuccess {
	chunkIndex: number;
}
export interface ChunkInfo {
	uploaded: number;
	uploading: number;
	options: UploadChunkOptions;
}
export interface UploadHooks {
	onStart?: () => void;
	onEnd?: () => void;
	onError?: () => void;
	onAbort?: () => void;
	onProgress?: (progress: UploadProgress) => void;
	onSuccess?: (response: Response) => void;
	onChunkProgress?: (progress: UploadChunkProgress) => void;
	onChunkSuccess?: (success: UploadChunkSuccess) => void;
}
export function fetch(url: string, options?: FetchOptions): Promise<Response>;
export declare class AjaxUploader {
	xhr: XMLHttpRequest;
	file: File | Blob;
	fileSize: number;
	hooks: UploadHooks;
	chunkInfo?: ChunkInfo;
	static support(): boolean;
	constructor(file: File | Blob, hooks: UploadHooks);
	/**
	 * 上传整个文件
	 */
	upload(options: UploadOptions): void;
	/**
	 * 上传文件分片
	 */
	uploadChunk(options: UploadChunkOptions): void;
	/**
	 * 取消上传
	 */
	abort(): void;
	/**
	 * 销毁
	 */
	destroy(): void;
}
export interface IndexedFile {
	index: number;
	status: number;
	name: string;
	type: string;
	size: number;
}
export interface FlashDebug {
	text: string;
}
export interface FlashFile {
	file: IndexedFile;
}
export interface FlashSuccess {
	file: IndexedFile;
	responseText: string;
}
export interface FlashError {
	file: IndexedFile;
	code: number;
	detail: Object | void;
}
export interface FlashProgress {
	file: IndexedFile;
	uploaded: number;
	total: number;
}
export interface FlashUploaderOptions {
	swfUrl: string;
	accept?: string;
	multiple?: boolean;
	debug?: boolean;
	el: Element;
}
export interface FlashUploaderHooks {
	onReady?: () => void;
	onFileChange?: () => void;
	onStart?: (file: IndexedFile) => void;
	onEnd?: (file: IndexedFile) => void;
	onError?: (file: IndexedFile, code: number, detail: Object | void) => void;
	onAbort?: (file: IndexedFile) => void;
	onProgress?: (file: IndexedFile, progress: UploadProgress) => void;
	onSuccess?: (file: IndexedFile, responseText: string) => void;
}
export declare class FlashUploader {
	swf: Element;
	movieName: string;
	hooks: FlashUploaderHooks;
	debug: boolean;
	static instances: {};
	/**
	 * 文件状态 - 等待上传
	 */
	static STATUS_WAITING: number;
	/**
	 * 文件状态 - 正在上传
	 */
	static STATUS_UPLOADING: number;
	/**
	 * 文件状态 - 上传成功
	 */
	static STATUS_UPLOAD_SUCCESS: number;
	/**
	 * 文件状态 - 上传失败
	 */
	static STATUS_UPLOAD_ERROR: number;
	/**
	 * 文件状态 - 上传中止
	 */
	static STATUS_UPLOAD_ABORT: number;
	/**
	 * 错误码 - 上传出现沙箱安全错误
	 */
	static ERROR_SECURITY: number;
	/**
	 * 错误码 - 上传 IO 错误
	 */
	static ERROR_IO: number;
	constructor(options: FlashUploaderOptions, hooks?: FlashUploaderHooks);
	/**
	 * 获得要上传的文件
	 */
	getFiles(): IndexedFile[];
	/**
	 * 上传
	 */
	upload(index: number, options: UploadOptions): void;
	/**
	 * 取消上传
	 */
	abort(index: number): void;
	/**
	 * 启用鼠标点击打开文件选择窗口
	 */
	enable(): void;
	/**
	 * 禁用鼠标点击打开文件选择窗口
	 */
	disable(): void;
	/**
	 * 销毁对象
	 */
	destroy(): void;
	onReady(): void;
	onFileChange(): void;
	onStart(data: FlashFile): void;
	onEnd(data: FlashFile): void;
	onError(data: FlashError): void;
	onAbort(data: FlashFile): void;
	onProgress(data: FlashProgress): void;
	onSuccess(data: FlashSuccess): void;
	onDebug(data: FlashDebug): void;
}

export {};
