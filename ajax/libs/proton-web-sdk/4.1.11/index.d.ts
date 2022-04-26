/**
 * Proton Web SDK v4.1.11
 * undefined
 *
 * @license
 * MIT License
 * 
 * Copyright (c) 2020 jafri
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { LinkStorage, LinkOptions, TransactArgs, TransactOptions, LinkSession, Link, LoginResult } from '@proton/link';
export { Link, LinkSession, TransactResult } from '@proton/link';
import { BrowserTransportOptions } from '@proton/browser-transport';

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
declare class ProtonWebLink {
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
        transact: (args: TransactArgs, options?: TransactOptions | undefined) => Promise<any>;
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

declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
interface CustomStyleOptions {
    modalBackgroundColor?: string;
    logoBackgroundColor?: string;
    isLogoRound?: boolean;
    optionBackgroundColor?: string;
    optionFontColor?: string;
    primaryFontColor?: string;
    secondaryFontColor?: string;
    linkColor?: string;
}
interface SelectorOptions {
    appName?: string;
    appLogo?: string;
    walletType?: string;
    enabledWalletTypes?: string[];
    customStyleOptions?: CustomStyleOptions;
}
declare type LocalLinkOptions = PartialBy<LinkOptions, 'transport' | 'chains' | 'scheme'> & {
    endpoints: string[];
    storage?: LinkStorage;
    storagePrefix?: string;
    restoreSession?: boolean;
    testUrl?: string;
};
interface ConnectWalletArgs {
    linkOptions: LocalLinkOptions;
    transportOptions?: BrowserTransportOptions;
    selectorOptions?: SelectorOptions;
}
interface ConnectWalletRet {
    session?: LinkSession;
    link?: ProtonWebLink | Link;
    loginResult?: LoginResult;
    error?: any;
}

declare const ConnectWallet: ({ linkOptions, transportOptions, selectorOptions }: ConnectWalletArgs) => Promise<ConnectWalletRet>;

export { ConnectWalletArgs, ConnectWalletRet, CustomStyleOptions, LocalLinkOptions, ProtonWebLink, SelectorOptions, ConnectWallet as default };
