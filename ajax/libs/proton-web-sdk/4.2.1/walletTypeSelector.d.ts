import type { CustomStyleOptions, WalletItem } from './types';
export default class WalletTypeSelector {
    private appLogo;
    private hasRoundedLogo;
    private appName;
    private customStyleOptions;
    constructor(name?: string, logo?: string, customStyleOptions?: CustomStyleOptions);
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
}
