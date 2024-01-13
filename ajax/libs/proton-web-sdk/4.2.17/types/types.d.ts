import { LinkStorage, LinkOptions, LinkSession, Link, LoginResult } from "@proton/link";
import { BrowserTransportOptions } from "@proton/browser-transport";
import { ProtonWebLink } from './links/protonWeb';
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
export interface SelectorOptions {
    appName?: string;
    appLogo?: string;
    walletType?: string;
    enabledWalletTypes?: string[];
    customStyleOptions?: CustomStyleOptions;
}
export declare type LocalLinkOptions = PartialBy<LinkOptions, 'transport' | 'chains' | 'scheme'> & {
    endpoints: string[];
    storage?: LinkStorage;
    storagePrefix?: string;
    restoreSession?: boolean;
    testUrl?: string;
};
export interface ConnectWalletArgs {
    linkOptions: LocalLinkOptions;
    transportOptions?: BrowserTransportOptions;
    selectorOptions?: SelectorOptions;
}
export interface ConnectWalletRet {
    session?: LinkSession;
    link?: ProtonWebLink | Link;
    loginResult?: LoginResult;
    error?: any;
}
export {};
