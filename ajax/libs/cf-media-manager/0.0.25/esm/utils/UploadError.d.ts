import { type UppyFile } from "@uppy/core";
import { type Prettyfy } from "./types";
export type MediaManagerFile = Prettyfy<UppyFile<{
    cloudflareResourceId?: string;
}>>;
export declare class UploadError extends Error {
    file: MediaManagerFile;
    isUploadError: true;
    constructor(file: MediaManagerFile, cause?: string);
}
