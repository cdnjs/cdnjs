import { type UppyFile } from "@uppy/core";
import { type Prettyfy } from "./types";
export type MediaManagerFile = Prettyfy<UppyFile<{
    cloudflareFileId?: string;
    defaultDeliveryUrl?: string;
    cloudflareAccountHash?: string;
    resource?: "image";
}>>;
export declare class UploadError extends Error {
    file: MediaManagerFile;
    isUploadError: true;
    constructor(file: MediaManagerFile, cause?: string);
}
