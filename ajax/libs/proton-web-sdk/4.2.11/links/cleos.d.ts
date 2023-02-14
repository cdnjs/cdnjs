import type { LinkOptions, LinkStorage, TransactArgs, TransactOptions } from "@proton/link";
interface Authorization {
    actor: string;
    permission: string;
}
declare class Deferred {
    promise: Promise<any>;
    reject: any;
    resolve: any;
    constructor();
}
export declare class ProtonWebLink {
    childWindow: Window | null;
    deferredTransact: {
        deferral: Deferred;
        transaction: any;
        params: any;
        waitingForOpen: boolean;
    } | undefined;
    deferredLogin: Deferred | undefined;
    scheme: string;
    storage: LinkStorage | null | undefined;
    testUrl: string | undefined;
    constructor(options: LinkOptions & {
        testUrl?: string;
    });
    childUrl(path: string): string;
    closeChild(force?: boolean): void;
    createSession(auth: Authorization): {
        auth: Authorization;
        transact: (args: TransactArgs, options?: TransactOptions) => Promise<any>;
        link: {
            walletType: string;
        };
    };
    login(): Promise<{
        session: {
            auth: Authorization;
            transact: (args: TransactArgs, options?: TransactOptions | undefined) => Promise<any>;
            link: {
                walletType: string;
            };
        };
    }>;
    restoreSession(/* requestAccount */ _: string, auth: any): Promise<{
        auth: Authorization;
        transact: (args: TransactArgs, options?: TransactOptions | undefined) => Promise<any>;
        link: {
            walletType: string;
        };
    }>;
    removeSession(appIdentifier: string, auth: any, chainId: any): Promise<{
        appIdentifier: string;
        auth: any;
        chainId: any;
    }>;
    onEvent(e: MessageEvent): Promise<void>;
}
export {};
