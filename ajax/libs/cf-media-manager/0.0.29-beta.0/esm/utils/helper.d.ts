import classNames, { Argument } from "classnames";
export declare const ALLOWED_FILE_TYPES: readonly ["image/jpeg", "image/png", "image/svg+xml", "image/webp", "image/gif"];
export type AllowedFileTypes = string[];
export type StyleMap<Keys extends string | undefined | null> = Record<NonNullable<Keys>, Argument>;
export type StyleArgument = Argument;
export declare function truncateText(str: string, length?: number): string;
export declare function capitalizeFirstLetter(str: string): string;
export declare function cn(...args: classNames.ArgumentArray): string;
