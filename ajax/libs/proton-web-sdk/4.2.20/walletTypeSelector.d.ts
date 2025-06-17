import type { CustomStyleOptions, WalletItem } from './types';
export default class WalletTypeSelector {
    private appLogo;
    private hasRoundedLogo;
    private appName;
    private customStyleOptions;
    private dialogRootNode;
    constructor(name?: string, logo?: string, customStyleOptions?: CustomStyleOptions, dialogRootNode?: HTMLElement | string);
    /** Container and stylesheet for Wallet Selector */
    private Widget?;
    private widgetHolder?;
    private fontAdded;
    /**
     * Only Proton and Anchor are available
     */
    displayWalletSelector(enabledWalletTypes: WalletItem[]): Promise<string>;
    destroy(): void;
    private hideSelector;
    private showSelector;
    private setUpSelectorContainer;
    private addFont;
    private setDialogRootNode;
}
