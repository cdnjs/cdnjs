import type { LinkOptions, LinkStorage, LinkTransport, TransactArgs, TransactOptions } from "@proton/link";
import { JsonRpc } from '@proton/js';
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
    deferredTransact: {
        deferral: Deferred;
        transaction: any;
        params: any;
        waitingForOpen: boolean;
    } | undefined;
    deferredLogin: Deferred | undefined;
    scheme: string;
    storage: LinkStorage | null | undefined;
    client: JsonRpc | undefined;
    testUrl: string | undefined;
    transport: LinkTransport;
    chainId: string;
    get childWindow(): Window | null;
    set childWindow(window: Window | null);
    constructor(options: LinkOptions & {
        testUrl?: string;
    });
    childUrl(path: string): string;
    closeChild(force?: boolean): void;
    createSession(auth: Authorization): {
        auth: Authorization;
        chainId: string;
        transact: (args: TransactArgs, options?: TransactOptions) => Promise<any>;
        link: {
            walletType: string;
            client: JsonRpc | undefined;
        };
    };
    login(): Promise<{
        session: {
            auth: Authorization;
            chainId: string;
            transact: (args: TransactArgs, options?: TransactOptions | undefined) => Promise<any>;
            link: {
                walletType: string;
                client: JsonRpc | undefined;
            };
        };
    }>;
    restoreSession(/* requestAccount */ _: string, auth: any): Promise<{
        auth: Authorization;
        chainId: string;
        transact: (args: TransactArgs, options?: TransactOptions | undefined) => Promise<any>;
        link: {
            walletType: string;
            client: JsonRpc | undefined;
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
