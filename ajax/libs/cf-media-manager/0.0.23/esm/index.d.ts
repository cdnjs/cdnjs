import Uppy from "@uppy/core";
import { z } from "zod";
import { type MediaManagerFile } from "./utils/UploadError";
import { type OverwriteTypes, type Prettyfy } from "./utils/types";
import "./index.css";
export type ManagerCallbacks = {
    onCancel?: () => unknown;
    onDone?: (result: {
        isAllComplete: boolean;
        isAllErrored: boolean;
        completedFiles: MediaManagerFile[];
        erroredFiles: MediaManagerFile[];
    }) => unknown;
    onUploadSuccess?: (file: MediaManagerFile) => unknown;
    onUploadError?: (file: MediaManagerFile) => unknown;
};
/**
 * Options that can be defined by user when
 * creating new instance of media manager
 */
declare const UserOptions: z.ZodObject<{
    accountId: z.ZodString;
    trigger: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>]>>;
    images: z.ZodObject<{
        maxNumberOfFiles: z.ZodDefault<z.ZodNumber>;
        minNumberOfFiles: z.ZodDefault<z.ZodNumber>;
        maxFileSizeInMegaBytes: z.ZodDefault<z.ZodNumber>;
        allowedFileTypes: z.ZodDefault<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"image/jpeg">, z.ZodLiteral<"image/png">, z.ZodLiteral<"image/svg+xml">, z.ZodLiteral<"image/webp">, z.ZodLiteral<"image/gif">, z.ZodLiteral<"image/avif">]>, "many">>;
    }, "strip", z.ZodTypeAny, {
        allowedFileTypes: ("image/jpeg" | "image/png" | "image/svg+xml" | "image/webp" | "image/gif" | "image/avif")[];
        maxNumberOfFiles: number;
        minNumberOfFiles: number;
        maxFileSizeInMegaBytes: number;
    }, {
        maxNumberOfFiles?: number | undefined;
        minNumberOfFiles?: number | undefined;
        maxFileSizeInMegaBytes?: number | undefined;
        allowedFileTypes?: ("image/jpeg" | "image/png" | "image/svg+xml" | "image/webp" | "image/gif" | "image/avif")[] | undefined;
    }>;
    auth: z.ZodObject<{
        authUrl: z.ZodString;
        numberOfRetriesOnError: z.ZodDefault<z.ZodNumber>;
        headers: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        userInfo: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strip", z.ZodTypeAny, {
        authUrl: string;
        numberOfRetriesOnError: number;
        headers?: {} | undefined;
        userInfo?: {} | undefined;
    }, {
        authUrl: string;
        numberOfRetriesOnError?: number | undefined;
        headers?: {} | undefined;
        userInfo?: {} | undefined;
    }>;
    onCancel: z.ZodOptional<z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>>;
    onDone: z.ZodOptional<z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>>;
    onUploadSuccess: z.ZodOptional<z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>>;
    onUploadError: z.ZodOptional<z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>>;
    onDragLeave: z.ZodOptional<z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>>;
    onDragOver: z.ZodOptional<z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>>;
    onDrop: z.ZodOptional<z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>>;
    styles: z.ZodOptional<z.ZodObject<{
        colors: z.ZodOptional<z.ZodObject<{
            brand: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            brand?: string | undefined;
        }, {
            brand?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        colors?: {
            brand?: string | undefined;
        } | undefined;
    }, {
        colors?: {
            brand?: string | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    accountId: string;
    images: {
        allowedFileTypes: ("image/jpeg" | "image/png" | "image/svg+xml" | "image/webp" | "image/gif" | "image/avif")[];
        maxNumberOfFiles: number;
        minNumberOfFiles: number;
        maxFileSizeInMegaBytes: number;
    };
    auth: {
        authUrl: string;
        numberOfRetriesOnError: number;
        headers?: {} | undefined;
        userInfo?: {} | undefined;
    };
    trigger?: string | {} | undefined;
    onCancel?: ((...args: unknown[]) => unknown) | undefined;
    onDone?: ((...args: unknown[]) => unknown) | undefined;
    onUploadSuccess?: ((...args: unknown[]) => unknown) | undefined;
    onUploadError?: ((...args: unknown[]) => unknown) | undefined;
    onDragLeave?: ((...args: unknown[]) => unknown) | undefined;
    onDragOver?: ((...args: unknown[]) => unknown) | undefined;
    onDrop?: ((...args: unknown[]) => unknown) | undefined;
    styles?: {
        colors?: {
            brand?: string | undefined;
        } | undefined;
    } | undefined;
}, {
    accountId: string;
    images: {
        maxNumberOfFiles?: number | undefined;
        minNumberOfFiles?: number | undefined;
        maxFileSizeInMegaBytes?: number | undefined;
        allowedFileTypes?: ("image/jpeg" | "image/png" | "image/svg+xml" | "image/webp" | "image/gif" | "image/avif")[] | undefined;
    };
    auth: {
        authUrl: string;
        numberOfRetriesOnError?: number | undefined;
        headers?: {} | undefined;
        userInfo?: {} | undefined;
    };
    trigger?: string | {} | undefined;
    onCancel?: ((...args: unknown[]) => unknown) | undefined;
    onDone?: ((...args: unknown[]) => unknown) | undefined;
    onUploadSuccess?: ((...args: unknown[]) => unknown) | undefined;
    onUploadError?: ((...args: unknown[]) => unknown) | undefined;
    onDragLeave?: ((...args: unknown[]) => unknown) | undefined;
    onDragOver?: ((...args: unknown[]) => unknown) | undefined;
    onDrop?: ((...args: unknown[]) => unknown) | undefined;
    styles?: {
        colors?: {
            brand?: string | undefined;
        } | undefined;
    } | undefined;
}>;
type UserOptions = Prettyfy<OverwriteTypes<OverwriteTypes<z.infer<typeof UserOptions>, ManagerCallbacks>, {
    trigger?: HTMLElement | null | undefined | string;
}>>;
declare class Widget {
    uppy: Uppy;
    constructor(opts: UserOptions);
    private initStyles;
    /**
     * Open the widget
     *
     * NOTE: This method is required to capture it's surrounding 'this'.
     * This needs to be an arrow function (!) DO NOT refactor to normal method
     * syntax.
     */
    open: () => void;
    /**
     * Close the widget
     *
     * NOTE: This method is required to capture it's surrounding 'this'.
     * This needs to be an arrow function (!) DO NOT refactor to normal method
     * syntax.
     */
    close: () => void;
}
declare const cfMediaManager: {
    create(opts: UserOptions): Widget;
};
export default cfMediaManager;
