import { CustomStyleOptions } from '.';
export default class WalletTypeSelector {
    readonly name?: string | undefined;
    constructor(name?: string | undefined, logo?: string, customStyleOptions?: CustomStyleOptions);
    private appLogo;
    private appName;
    private customStyleOptions;
    /** Container and stylesheet for Wallet Selector */
    private selectorContainerEl;
    private selectorEl;
    private styleEl?;
    private font?;
    private hideSelector;
    private showSelector;
    private setUpSelectorContainer;
    private clearDuplicateContainers;
    private createEl;
    /**
     * Only Proton and Anchor are available
     */
    displayWalletSelector(enabledWalletTypes: {
        key: string;
        value: string;
    }[]): Promise<string>;
}
