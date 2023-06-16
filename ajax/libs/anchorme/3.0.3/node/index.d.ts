/// <reference types="mocha" />
import { transform } from "./transform";
import { ListingProps, Options } from "./types";
declare const anchorme: {
    (arg: string | {
        input: string;
        options?: Partial<Options> | undefined;
        extensions?: {
            test: RegExp;
            transform: (string: string) => string;
        }[] | undefined;
    }): string;
    list: (input: string, skipHTML?: boolean) => ListingProps[];
    validate: {
        ip: (input: string) => boolean;
        email: (input: string) => boolean;
        file: (input: string) => boolean;
        url: (input: string) => boolean;
    };
};
export default anchorme;
