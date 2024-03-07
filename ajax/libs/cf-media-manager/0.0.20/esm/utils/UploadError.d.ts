import { UppyFile } from "@uppy/core";
export type MediaManagerFile = UppyFile<{
    cloudflareResourceId?: string;
}>;
export declare class UploadError extends Error {
    file: MediaManagerFile;
    isUploadError: true;
    constructor(file: MediaManagerFile, cause?: string);
}
//# sourceMappingURL=UploadError.d.ts.map