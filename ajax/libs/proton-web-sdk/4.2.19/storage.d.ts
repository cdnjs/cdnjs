import type { LinkStorage } from "@proton/link";
export declare class Storage implements LinkStorage {
    readonly keyPrefix: string;
    constructor(keyPrefix: string);
    write(key: string, data: string): Promise<void>;
    read(key: string): Promise<string | null>;
    remove(key: string): Promise<void>;
    storageKey(key: string): string;
}
