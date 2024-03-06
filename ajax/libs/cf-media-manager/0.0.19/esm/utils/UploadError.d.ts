import { UppyFile } from "@uppy/core";
export type MediaManagerFile = UppyFile;
export declare class UploadError extends Error {
    file: MediaManagerFile;
    isUploadError: true;
    constructor(file: MediaManagerFile, cause?: string);
}
//# sourceMappingURL=UploadError.d.ts.map