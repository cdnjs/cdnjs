import Uppy from "@uppy/core";
import { z } from "zod";
import { type Opts } from "./MediaManager";
import "./index.css";
import { type MediaManagerFile } from "./utils/UploadError";
import { type OverwriteTypes, type Prettyfy } from "./utils/types";
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
    isDefaultHidden: z.ZodDefault<z.ZodBoolean>;
    images: z.ZodObject<{
        maxNumberOfFiles: z.ZodDefault<z.ZodNumber>;
        minNumberOfFiles: z.ZodDefault<z.ZodNumber>;
        maxFileSizeInMb: z.ZodDefault<z.ZodNumber>;
        defaultDeliveryVariant: z.ZodDefault<z.ZodString>;
        allowedFileTypes: z.ZodDefault<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"image/jpeg">, z.ZodLiteral<"image/png">, z.ZodLiteral<"image/svg+xml">, z.ZodLiteral<"image/webp">, z.ZodLiteral<"image/gif">]>, "many">>;
    }, "strip", z.ZodTypeAny, {
        allowedFileTypes: ("image/jpeg" | "image/png" | "image/svg+xml" | "image/webp" | "image/gif")[];
        maxNumberOfFiles: number;
        minNumberOfFiles: number;
        maxFileSizeInMb: number;
        defaultDeliveryVariant: string;
    }, {
        maxNumberOfFiles?: number | undefined;
        minNumberOfFiles?: number | undefined;
        maxFileSizeInMb?: number | undefined;
        defaultDeliveryVariant?: string | undefined;
        allowedFileTypes?: ("image/jpeg" | "image/png" | "image/svg+xml" | "image/webp" | "image/gif")[] | undefined;
    }>;
    auth: z.ZodObject<{
        authUrl: z.ZodString;
        numberOfRetriesOnError: z.ZodDefault<z.ZodNumber>;
        headers: z.ZodDefault<z.ZodType<HeadersInit | (() => HeadersInit), z.ZodTypeDef, HeadersInit | (() => HeadersInit)>>;
        userInfo: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        headers: (HeadersInit | (() => HeadersInit)) & (HeadersInit | (() => HeadersInit) | undefined);
        authUrl: string;
        numberOfRetriesOnError: number;
        userInfo?: Record<string, any> | undefined;
    }, {
        authUrl: string;
        numberOfRetriesOnError?: number | undefined;
        headers?: HeadersInit | (() => HeadersInit) | undefined;
        userInfo?: Record<string, any> | undefined;
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
    images: {
        allowedFileTypes: ("image/jpeg" | "image/png" | "image/svg+xml" | "image/webp" | "image/gif")[];
        maxNumberOfFiles: number;
        minNumberOfFiles: number;
        maxFileSizeInMb: number;
        defaultDeliveryVariant: string;
    };
    accountId: string;
    isDefaultHidden: boolean;
    auth: {
        headers: (HeadersInit | (() => HeadersInit)) & (HeadersInit | (() => HeadersInit) | undefined);
        authUrl: string;
        numberOfRetriesOnError: number;
        userInfo?: Record<string, any> | undefined;
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
    images: {
        maxNumberOfFiles?: number | undefined;
        minNumberOfFiles?: number | undefined;
        maxFileSizeInMb?: number | undefined;
        defaultDeliveryVariant?: string | undefined;
        allowedFileTypes?: ("image/jpeg" | "image/png" | "image/svg+xml" | "image/webp" | "image/gif")[] | undefined;
    };
    accountId: string;
    auth: {
        authUrl: string;
        numberOfRetriesOnError?: number | undefined;
        headers?: HeadersInit | (() => HeadersInit) | undefined;
        userInfo?: Record<string, any> | undefined;
    };
    trigger?: string | {} | undefined;
    isDefaultHidden?: boolean | undefined;
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
type UserOptionsInputFromSchema = Prettyfy<z.input<typeof UserOptions>>;
type UserOptionsInput = Prettyfy<OverwriteTypes<UserOptionsInputFromSchema, ManagerCallbacks & {
    onDragLeave?: Opts["onDragLeave"];
    onDragOver?: Opts["onDragOver"];
    onDrop?: Opts["onDrop"];
}>>;
declare class Widget {
    uppy: Uppy;
    constructor(opts: UserOptionsInput);
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
    create(opts: UserOptionsInput): Widget;
};
export default cfMediaManager;
