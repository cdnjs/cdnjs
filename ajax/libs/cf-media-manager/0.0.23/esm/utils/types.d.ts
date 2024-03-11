import { z } from "zod";
export declare const TemporaryAccessLinkResult: z.ZodObject<{
    url: z.ZodString;
    resource: z.ZodLiteral<"image">;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    resource: "image";
    url: string;
}, {
    id: string;
    resource: "image";
    url: string;
}>;
export type TemporaryAccessLinkResult = z.infer<typeof TemporaryAccessLinkResult>;
export type APIResponse<T> = {
    success: boolean;
    result: T;
};
export type OverwriteTypes<Input, Overwrite> = {
    [Key in keyof Input as Key extends keyof Overwrite ? never : Key]: Input[Key];
} & Overwrite;
export type Prettyfy<T> = {
    [K in keyof T]: T[K];
} & {};
