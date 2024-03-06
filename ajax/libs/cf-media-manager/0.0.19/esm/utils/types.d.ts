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
export type OverwriteTypes<Input extends object, Overwrite extends object> = {
    [K in keyof Input]: K extends keyof Overwrite ? Overwrite[K] : Input[K];
};
//# sourceMappingURL=types.d.ts.map