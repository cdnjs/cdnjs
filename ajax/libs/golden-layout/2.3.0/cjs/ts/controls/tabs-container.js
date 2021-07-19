"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabsContainer = void 0;
const internal_error_1 = require("../errors/internal-error");
const utils_1 = require("../utils/utils");
const tab_1 = require("./tab");
/** @internal */
class TabsContainer {
    constructor(_layoutManager, _componentRemoveEvent, _componentFocusEvent, _componentDragStartEvent, _dropdownActiveChangedEvent) {
        this._layoutManager = _layoutManager;
        this._componentRemoveEvent = _componentRemoveEvent;
        this._componentFocusEvent = _componentFocusEvent;
        this._componentDragStartEvent = _componentDragStartEvent;
        this._dropdownActiveChangedEvent = _dropdownActiveChangedEvent;
        // There is one tab per ComponentItem in stack.  However they may not be ordered the same
        this._tabs = [];
        this._lastVisibleTabIndex = -1;
        this._dropdownActive = false;
        this._element = document.createElement('section');
        this._element.classList.add("lm_tabs" /* Tabs */);
        this._dropdownElement = document.createElement('section');
        this._dropdownElement.classList.add("lm_tabdropdown_list" /* TabDropdownList */);
        this._dropdownElement.style.display = 'none';
    }
    get tabs() { return this._tabs; }
    get tabCount() { return this._tabs.length; }
    get lastVisibleTabIndex() { return this._lastVisibleTabIndex; }
    get element() { return this._element; }
    get dropdownElement() { return this._dropdownElement; }
    get dropdownActive() { return this._dropdownActive; }
    destroy() {
        for (let i = 0; i < this._tabs.length; i++) {
            this._tabs[i].destroy();
        }
    }
    /**
     * Creates a new tab and associates it with a contentItem
     * @param index - The position of the tab
     */
    createTab(componentItem, index) {
        //If there's already a tab relating to the
        //content item, don't do anything
        for (let i = 0; i < this._tabs.length; i++) {
            if (this._tabs[i].componentItem === componentItem) {
                return;
            }
        }
        const tab = new tab_1.Tab(this._layoutManager, componentItem, (item) => this.handleTabCloseEvent(item), (item) => this.handleTabFocusEvent(item), (x, y, dragListener, item) => this.handleTabDragStartEvent(x, y, dragListener, item));
        if (this._tabs.length === 0) {
            this._tabs.push(tab);
            this._element.appendChild(tab.element);
        }
        else {
            if (index === undefined) {
                index = this._tabs.length;
            }
            if (index > 0) {
                this._tabs[index - 1].element.insertAdjacentElement('afterend', tab.element);
            }
            else {
                this._tabs[0].element.insertAdjacentElement('beforebegin', tab.element);
            }
            this._tabs.splice(index, 0, tab);
        }
    }
    removeTab(componentItem) {
        // componentItem cannot be ActiveComponentItem
        for (let i = 0; i < this._tabs.length; i++) {
            if (this._tabs[i].componentItem === componentItem) {
                const tab = this._tabs[i];
                tab.destroy();
                this._tabs.splice(i, 1);
                return;
            }
        }
        throw new Error('contentItem is not controlled by this header');
    }
    processActiveComponentChanged(newActiveComponentItem) {
        let activeIndex = -1;
        for (let i = 0; i < this._tabs.length; i++) {
            const isActive = this._tabs[i].componentItem === newActiveComponentItem;
            this._tabs[i].setActive(isActive);
            if (isActive) {
                activeIndex = i;
            }
        }
        if (activeIndex < 0) {
            throw new internal_error_1.AssertError('HSACI56632');
        }
        else {
            if (this._layoutManager.layoutConfig.settings.reorderOnTabMenuClick) {
                /**
                 * If the tab selected was in the dropdown, move everything down one to make way for this one to be the first.
                 * This will make sure the most used tabs stay visible.
                 */
                if (this._lastVisibleTabIndex !== -1 && activeIndex > this._lastVisibleTabIndex) {
                    const activeTab = this._tabs[activeIndex];
                    for (let j = activeIndex; j > 0; j--) {
                        this._tabs[j] = this._tabs[j - 1];
                    }
                    this._tabs[0] = activeTab;
                    // updateTabSizes will always be called after this and it will reposition tab elements
                }
            }
        }
    }
    /**
     * Pushes the tabs to the tab dropdown if the available space is not sufficient
     */
    updateTabSizes(availableWidth, activeComponentItem) {
        let dropDownActive = false;
        const success = this.tryUpdateTabSizes(dropDownActive, availableWidth, activeComponentItem);
        if (!success) {
            dropDownActive = true;
            // this will always succeed
            this.tryUpdateTabSizes(dropDownActive, availableWidth, activeComponentItem);
        }
        if (dropDownActive !== this._dropdownActive) {
            this._dropdownActive = dropDownActive;
            this._dropdownActiveChangedEvent();
        }
    }
    tryUpdateTabSizes(dropdownActive, availableWidth, activeComponentItem) {
        if (this._tabs.length > 0) {
            if (activeComponentItem === undefined) {
                throw new Error('non-empty tabs must have active component item');
            }
            let cumulativeTabWidth = 0;
            let tabOverlapAllowanceExceeded = false;
            const tabOverlapAllowance = this._layoutManager.layoutConfig.settings.tabOverlapAllowance;
            const activeIndex = this._tabs.indexOf(activeComponentItem.tab);
            const activeTab = this._tabs[activeIndex];
            this._lastVisibleTabIndex = -1;
            for (let i = 0; i < this._tabs.length; i++) {
                const tabElement = this._tabs[i].element;
                //Put the tab in the tabContainer so its true width can be checked
                if (tabElement.parentElement !== this._element) {
                    this._element.appendChild(tabElement);
                }
                const tabMarginRightPixels = getComputedStyle(activeTab.element).marginRight;
                const tabMarginRight = utils_1.pixelsToNumber(tabMarginRightPixels);
                const tabWidth = tabElement.offsetWidth + tabMarginRight;
                cumulativeTabWidth += tabWidth;
                //Include the active tab's width if it isn't already
                //This is to ensure there is room to show the active tab
                let visibleTabWidth = 0;
                if (activeIndex <= i) {
                    visibleTabWidth = cumulativeTabWidth;
                }
                else {
                    const activeTabMarginRightPixels = getComputedStyle(activeTab.element).marginRight;
                    const activeTabMarginRight = utils_1.pixelsToNumber(activeTabMarginRightPixels);
                    visibleTabWidth = cumulativeTabWidth + activeTab.element.offsetWidth + activeTabMarginRight;
                }
                // If the tabs won't fit, check the overlap allowance.
                if (visibleTabWidth > availableWidth) {
                    //Once allowance is exceeded, all remaining tabs go to menu.
                    if (!tabOverlapAllowanceExceeded) {
                        //No overlap for first tab or active tab
                        //Overlap spreads among non-active, non-first tabs
                        let overlap;
                        if (activeIndex > 0 && activeIndex <= i) {
                            overlap = (visibleTabWidth - availableWidth) / (i - 1);
                        }
                        else {
                            overlap = (visibleTabWidth - availableWidth) / i;
                        }
                        //Check overlap against allowance.
                        if (overlap < tabOverlapAllowance) {
                            for (let j = 0; j <= i; j++) {
                                const marginLeft = (j !== activeIndex && j !== 0) ? '-' + utils_1.numberToPixels(overlap) : '';
                                this._tabs[j].element.style.zIndex = utils_1.numberToPixels(i - j);
                                this._tabs[j].element.style.marginLeft = marginLeft;
                            }
                            this._lastVisibleTabIndex = i;
                            if (tabElement.parentElement !== this._element) {
                                this._element.appendChild(tabElement);
                            }
                        }
                        else {
                            tabOverlapAllowanceExceeded = true;
                        }
                    }
                    else if (i === activeIndex) {
                        //Active tab should show even if allowance exceeded. (We left room.)
                        tabElement.style.zIndex = 'auto';
                        tabElement.style.marginLeft = '';
                        if (tabElement.parentElement !== this._element) {
                            this._element.appendChild(tabElement);
                        }
                    }
                    if (tabOverlapAllowanceExceeded && i !== activeIndex) {
                        if (dropdownActive) {
                            //Tab menu already shown, so we just add to it.
                            tabElement.style.zIndex = 'auto';
                            tabElement.style.marginLeft = '';
                            if (tabElement.parentElement !== this._dropdownElement) {
                                this._dropdownElement.appendChild(tabElement);
                            }
                        }
                        else {
                            //We now know the tab menu must be shown, so we have to recalculate everything.
                            return false;
                        }
                    }
                }
                else {
                    this._lastVisibleTabIndex = i;
                    tabElement.style.zIndex = 'auto';
                    tabElement.style.marginLeft = '';
                    if (tabElement.parentElement !== this._element) {
                        this._element.appendChild(tabElement);
                    }
                }
            }
        }
        return true;
    }
    /**
     * Shows drop down for additional tabs when there are too many to display.
     */
    showAdditionalTabsDropdown() {
        this._dropdownElement.style.display = '';
    }
    /**
     * Hides drop down for additional tabs when there are too many to display.
     */
    hideAdditionalTabsDropdown() {
        this._dropdownElement.style.display = 'none';
    }
    handleTabCloseEvent(componentItem) {
        this._componentRemoveEvent(componentItem);
    }
    handleTabFocusEvent(componentItem) {
        this._componentFocusEvent(componentItem);
    }
    handleTabDragStartEvent(x, y, dragListener, componentItem) {
        this._componentDragStartEvent(x, y, dragListener, componentItem);
    }
}
exports.TabsContainer = TabsContainer;
//# sourceMappingURL=tabs-container.js.map