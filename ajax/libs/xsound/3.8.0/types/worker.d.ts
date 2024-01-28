/**
 * This function returns worker script as string by removing container string.
 * @param {string} workerContainerString This argument is string that contains worker script.
 * @return {string} Return value is worker script as string.
 */
export declare function extractWorkerString(workerContainerString: string): string;
/**
 * This function returns worker script as `Blob` by removing container string.
 * @param {string} workerContainerString This argument is string that contains worker script.
 * @return {Blob} Return value is worker script as `Blob`.
 */
export declare function createWorkerBlob(workerContainerString: string): Blob;
/**
 * This function returns worker script as Object URL by removing container string.
 * @param {string} workerContainerString This argument is string that contains worker script.
 * @return {string} Return value is worker script as Object URL.
 */
export declare function createWorkerObjectURL(workerContainerString: string): string;
//# sourceMappingURL=worker.d.ts.map