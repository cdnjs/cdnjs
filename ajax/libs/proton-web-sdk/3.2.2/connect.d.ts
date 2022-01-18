import { BrowserTransportOptions } from '@proton/browser-transport';
import { Link, LinkOptions, LinkSession, LinkStorage, LoginResult } from '@proton/link';
import { ProtonWebLink } from './protonWeb';
declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export interface CustomStyleOptions {
    modalBackgroundColor?: string;
    logoBackgroundColor?: string;
    isLogoRound?: boolean;
    optionBackgroundColor?: string;
    optionFontColor?: string;
    primaryFontColor?: string;
    secondaryFontColor?: string;
    linkColor?: string;
}
interface ConnectWalletArgs {
    linkOptions: PartialBy<LinkOptions, 'transport' | 'chains' | 'scheme'> & {
        endpoints: string[];
        storage?: LinkStorage;
        storagePrefix?: string;
        restoreSession?: boolean;
        testUrl?: string;
    };
    transportOptions?: BrowserTransportOptions;
    selectorOptions?: {
        appName?: string;
        appLogo?: string;
        walletType?: string;
        enabledWalletTypes?: string[];
        customStyleOptions?: CustomStyleOptions;
    };
}
interface ConnectWalletRet {
    session?: LinkSession;
    link?: ProtonWebLink | Link;
    loginResult?: LoginResult;
    error?: any;
}
export declare const ConnectWallet: ({ linkOptions, transportOptions, selectorOptions }: ConnectWalletArgs) => Promise<ConnectWalletRet>;
export {};
