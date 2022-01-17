import { Anchor } from '@microsoft/fast-foundation';
import { Badge } from '@microsoft/fast-foundation';
import { BaseProgress } from '@microsoft/fast-foundation';
import { Button } from '@microsoft/fast-foundation';
import { Checkbox } from '@microsoft/fast-foundation';
import { DataGrid } from '@microsoft/fast-foundation';
import { DataGridCell } from '@microsoft/fast-foundation';
import { DataGridRow } from '@microsoft/fast-foundation';
import { Divider } from '@microsoft/fast-foundation';
import { ListboxOption } from '@microsoft/fast-foundation';
import { Radio } from '@microsoft/fast-foundation';
import { RadioGroup } from '@microsoft/fast-foundation';
import { Select } from '@microsoft/fast-foundation';
import { Tab } from '@microsoft/fast-foundation';
import { TabPanel } from '@microsoft/fast-foundation';
import { Tabs } from '@microsoft/fast-foundation';
import { TextArea } from '@microsoft/fast-foundation';
import { TextField } from '@microsoft/fast-foundation';

/**
 * Types of button appearance.
 * @public
 */
export declare type ButtonAppearance = 'primary' | 'secondary' | 'icon';

/**
 * The Visual Studio Code badge component.
 *
 * @remarks
 * HTML Element: `<vscode-badge>`
 *
 * @public
 */
export declare class VSCodeBadge extends Badge {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

/**
 * The Visual Studio Code button component.
 *
 * @remarks
 * HTML Element: `<vscode-button>`
 *
 * @public
 */
export declare class VSCodeButton extends Button {
    /**
     * The appearance the button should have.
     *
     * @public
     */
    appearance: ButtonAppearance;
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
    /**
     * Component lifecycle method that runs when an attribute of the
     * element is changed.
     *
     * @param attrName - The attribute that was changed
     * @param oldVal - The old value of the attribute
     * @param newVal - The new value of the attribute
     *
     * @internal
     */
    attributeChangedCallback(attrName: string, oldVal: string, newVal: string): void;
}

/**
 * The Visual Studio Code checkbox component.
 *
 * @remarks
 * HTML Element: `<vscode-checkbox>`
 *
 * @public
 */
export declare class VSCodeCheckbox extends Checkbox {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

/**
 * The Visual Studio Code data grid component.
 *
 * @remarks
 * HTML Element: `<vscode-data-grid>`
 *
 * @public
 */
export declare class VSCodeDataGrid extends DataGrid {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

/**
 * The Visual Studio Code data grid cell component.
 *
 * @remarks
 * HTML Element: `<vscode-data-grid-cell>`
 *
 * @public
 */
export declare class VSCodeDataGridCell extends DataGridCell {
}

/**
 * The Visual Studio Code data grid row component.
 *
 * @remarks
 * HTML Element: `<vscode-data-grid-row>`
 *
 * @public
 */
export declare class VSCodeDataGridRow extends DataGridRow {
}

/**
 * The Visual Studio Code divider component.
 *
 * @remarks
 * HTML Element: `<vscode-divider>`
 *
 * @public
 */
export declare class VSCodeDivider extends Divider {
}

/**
 * The Visual Studio Code dropdown component.
 *
 * @remarks
 * HTML Element: `<vscode-dropdown>`
 *
 * @public
 */
export declare class VSCodeDropdown extends Select {
}

/**
 * The Visual Studio Code link component.
 *
 * @remarks
 * HTML Element: `<vscode-link>`
 *
 * @public
 */
export declare class VSCodeLink extends Anchor {
}

/**
 * The Visual Studio Code option component.
 *
 * @remarks
 * HTML Element: `<vscode-option>`
 *
 * @public
 */
export declare class VSCodeOption extends ListboxOption {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

/**
 * The Visual Studio Code panels component.
 *
 * @remarks
 * HTML Element: `<vscode-panels>`
 *
 * @public
 */
export declare class VSCodePanels extends Tabs {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

/**
 * The Visual Studio Code panel tab component.
 *
 * @remarks
 * HTML Element: `<vscode-panel-tab>`
 *
 * @public
 */
export declare class VSCodePanelTab extends Tab {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

/**
 * The Visual Studio Code panel view component.
 *
 * @remarks
 * HTML Element: `<vscode-panel-view>`
 *
 * @public
 */
export declare class VSCodePanelView extends TabPanel {
}

/**
 * The Visual Studio Code progress ring component.
 *
 * @remarks
 * HTML Element: `<vscode-progress-ring>`
 *
 * @public
 */
export declare class VSCodeProgressRing extends BaseProgress {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
    /**
     * Component lifecycle method that runs when an attribute of the
     * element is changed.
     *
     * @param attrName - The attribute that was changed
     * @param oldVal - The old value of the attribute
     * @param newVal - The new value of the attribute
     *
     * @internal
     */
    attributeChangedCallback(attrName: string, oldVal: string, newVal: string): void;
}

/**
 * The Visual Studio Code radio component.
 *
 * @remarks
 * HTML Element: `<vscode-radio>`
 *
 * @public
 */
export declare class VSCodeRadio extends Radio {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

/**
 * The Visual Studio Code radio group component.
 *
 * @remarks
 * HTML Element: `<vscode-radio-group>`
 *
 * @public
 */
export declare class VSCodeRadioGroup extends RadioGroup {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

/**
 * The Visual Studio Code tag component.
 *
 * @remarks
 * HTML Element: `<vscode-tag>`
 *
 * @public
 */
export declare class VSCodeTag extends Badge {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

/**
 * The Visual Studio Code text area component.
 *
 * @remarks
 * HTML Element: `<vscode-text-area>`
 *
 * @public
 */
export declare class VSCodeTextArea extends TextArea {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

/**
 * The Visual Studio Code text field component.
 *
 * @remarks
 * HTML Element: `<vscode-text-field>`
 *
 * @public
 */
export declare class VSCodeTextField extends TextField {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

export { }
