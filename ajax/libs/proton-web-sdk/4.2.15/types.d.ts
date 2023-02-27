import type { LinkStorage, LinkOptions, LinkSession, Link, LoginResult } from "@proton/link";
import type { BrowserTransportOptions } from "@proton/browser-transport";
import type { ProtonWebLink } from './links/protonWeb';
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
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
    dialogRootNode?: HTMLElement | string;
    customStyleOptions?: CustomStyleOptions;
}
export type LocalLinkOptions = PartialBy<LinkOptions, 'transport' | 'chains' | 'scheme'> & {
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
export interface WalletItem {
    key: string;
    value: string;
}
export interface LoginOptions {
    selectorOptions: SelectorOptions;
    linkOptions: LocalLinkOptions;
    transportOptions: BrowserTransportOptions;
    repeat?: boolean;
}
export {};
