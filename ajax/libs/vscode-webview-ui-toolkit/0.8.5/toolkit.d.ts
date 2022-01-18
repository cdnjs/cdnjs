import { Anchor } from '@microsoft/fast-foundation';
import { AnchorOptions } from '@microsoft/fast-foundation';
import { Badge as Badge_2 } from '@microsoft/fast-foundation';
import { BaseProgress } from '@microsoft/fast-foundation';
import { Button as Button_2 } from '@microsoft/fast-foundation';
import { ButtonOptions } from '@microsoft/fast-foundation';
import { Checkbox as Checkbox_2 } from '@microsoft/fast-foundation';
import { CheckboxOptions } from '@microsoft/fast-foundation';
import type { Container } from '@microsoft/fast-foundation';
import { DataGrid as DataGrid_2 } from '@microsoft/fast-foundation';
import { DataGridCell as DataGridCell_2 } from '@microsoft/fast-foundation';
import { DataGridCellTypes } from '@microsoft/fast-foundation';
import { DataGridRow as DataGridRow_2 } from '@microsoft/fast-foundation';
import { DataGridRowTypes } from '@microsoft/fast-foundation';
import { DesignSystem } from '@microsoft/fast-foundation';
import { Divider as Divider_2 } from '@microsoft/fast-foundation';
import { DividerRole } from '@microsoft/fast-foundation';
import { SelectPosition as DropdownPosition } from '@microsoft/fast-foundation';
import { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { GenerateHeaderOptions } from '@microsoft/fast-foundation';
import { ListboxOption } from '@microsoft/fast-foundation';
import { ListboxOptionOptions } from '@microsoft/fast-foundation';
import { OverrideFoundationElementDefinition } from '@microsoft/fast-foundation';
import { ProgressRingOptions } from '@microsoft/fast-foundation';
import { Radio as Radio_2 } from '@microsoft/fast-foundation';
import { RadioGroup as RadioGroup_2 } from '@microsoft/fast-foundation';
import { Orientation as RadioGroupOrientation } from '@microsoft/fast-web-utilities';
import { RadioOptions } from '@microsoft/fast-foundation';
import { Select } from '@microsoft/fast-foundation';
import { SelectOptions } from '@microsoft/fast-foundation';
import { Tab } from '@microsoft/fast-foundation';
import { TabPanel } from '@microsoft/fast-foundation';
import { Tabs } from '@microsoft/fast-foundation';
import { TextArea as TextArea_2 } from '@microsoft/fast-foundation';
import { TextAreaResize } from '@microsoft/fast-foundation';
import { TextField as TextField_2 } from '@microsoft/fast-foundation';
import { TextFieldOptions } from '@microsoft/fast-foundation';
import { TextFieldType } from '@microsoft/fast-foundation';

/**
 * All VSCode Web Components
 * @public
 * @remarks
 * This object can be passed directly to the Design System's `register` method to
 * statically link and register all available components.
 */
export declare const allComponents: {
    vsCodeBadge: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Badge>;
    vsCodeButton: (overrideDefinition?: OverrideFoundationElementDefinition<ButtonOptions> | undefined) => FoundationElementRegistry<ButtonOptions, typeof Button>;
    vsCodeCheckbox: (overrideDefinition?: OverrideFoundationElementDefinition<CheckboxOptions> | undefined) => FoundationElementRegistry<CheckboxOptions, typeof Checkbox>;
    vsCodeDataGrid: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof DataGrid>;
    vsCodeDataGridCell: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof DataGridCell>;
    vsCodeDataGridRow: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof DataGridRow>;
    vsCodeDivider: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Divider>;
    vsCodeDropdown: (overrideDefinition?: OverrideFoundationElementDefinition<SelectOptions> | undefined) => FoundationElementRegistry<SelectOptions, typeof Dropdown>;
    vsCodeLink: (overrideDefinition?: OverrideFoundationElementDefinition<AnchorOptions> | undefined) => FoundationElementRegistry<AnchorOptions, typeof Link>;
    vsCodeOption: (overrideDefinition?: OverrideFoundationElementDefinition<ListboxOptionOptions> | undefined) => FoundationElementRegistry<ListboxOptionOptions, typeof Option_2>;
    vsCodePanels: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Panels>;
    vsCodePanelTab: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof PanelTab>;
    vsCodePanelView: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof PanelView>;
    vsCodeProgressRing: (overrideDefinition?: OverrideFoundationElementDefinition<ProgressRingOptions> | undefined) => FoundationElementRegistry<ProgressRingOptions, typeof ProgressRing>;
    vsCodeRadioGroup: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof RadioGroup>;
    vsCodeRadio: (overrideDefinition?: OverrideFoundationElementDefinition<RadioOptions> | undefined) => FoundationElementRegistry<RadioOptions, typeof Radio>;
    vsCodeTag: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Tag>;
    vsCodeTextArea: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof TextArea>;
    vsCodeTextField: (overrideDefinition?: OverrideFoundationElementDefinition<TextFieldOptions> | undefined) => FoundationElementRegistry<TextFieldOptions, typeof TextField>;
    register(container?: Container | undefined, ...rest: any[]): void;
};

/**
 * The Visual Studio Code badge class.
 *
 * @public
 */
export declare class Badge extends Badge_2 {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

/**
 * The Visual Studio Code button class.
 *
 * @public
 */
export declare class Button extends Button_2 {
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
 * Types of button appearance.
 * @public
 */
export declare type ButtonAppearance = 'primary' | 'secondary' | 'icon';

/**
 * The Visual Studio Code checkbox class.
 *
 * @public
 */
export declare class Checkbox extends Checkbox_2 {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

/**
 * The Visual Studio Code data grid class.
 *
 * @public
 */
export declare class DataGrid extends DataGrid_2 {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

/**
 * The Visual Studio Code data grid cell class.
 *
 * @public
 */
export declare class DataGridCell extends DataGridCell_2 {
}

export { DataGridCellTypes }

/**
 * The Visual Studio Code data grid row class.
 *
 * @public
 */
export declare class DataGridRow extends DataGridRow_2 {
}

export { DataGridRowTypes }

/**
 * The Visual Studio Code divider class.
 *
 * @public
 */
export declare class Divider extends Divider_2 {
}

export { DividerRole }

/**
 * The Visual Studio Code dropdown class.
 *
 * @public
 */
export declare class Dropdown extends Select {
}

/**
 * Dropdown configuration options
 * @public
 */
export declare type DropdownOptions = SelectOptions;

export { DropdownPosition }

export { GenerateHeaderOptions }

/**
 * The Visual Studio Code link class.
 *
 * @public
 */
export declare class Link extends Anchor {
}

/**
 * Link configuration options
 * @public
 */
export declare type LinkOptions = AnchorOptions;

/**
 * The Visual Studio Code option class.
 *
 * @public
 */
declare class Option_2 extends ListboxOption {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}
export { Option_2 as Option }

/**
 * Dropdown option configuration options
 * @public
 */
export declare type OptionOptions = ListboxOptionOptions;

/**
 * The Visual Studio Code panels class.
 *
 * @public
 */
export declare class Panels extends Tabs {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

/**
 * The Visual Studio Code panel tab class.
 *
 * @public
 */
export declare class PanelTab extends Tab {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

/**
 * The Visual Studio Code panel view class.
 *
 * @public
 */
export declare class PanelView extends TabPanel {
}

/**
 * The Visual Studio Code progress ring class.
 *
 * @public
 */
export declare class ProgressRing extends BaseProgress {
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
 * Provides a design system for the specified element either by returning one that was
 * already created for that element or creating one.
 * @param element - The element to root the design system at. By default, this is the body.
 * @returns A VSCode Design System
 * @public
 */
export declare function provideVSCodeDesignSystem(element?: HTMLElement): DesignSystem;

/**
 * The Visual Studio Code radio class.
 *
 * @public
 */
export declare class Radio extends Radio_2 {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

/**
 * The Visual Studio Code radio group class.
 *
 * @public
 */
export declare class RadioGroup extends RadioGroup_2 {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

export { RadioGroupOrientation }

/**
 * The Visual Studio Code tag class.
 *
 * @public
 */
export declare class Tag extends Badge_2 {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

/**
 * The Visual Studio Code text area class.
 *
 * @remarks
 * HTML Element: `<vscode-text-area>`
 *
 * @public
 */
export declare class TextArea extends TextArea_2 {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

export { TextAreaResize }

/**
 * The Visual Studio Code text field class.
 *
 * @public
 */
export declare class TextField extends TextField_2 {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}

export { TextFieldType }

/**
 * The Visual Studio Code badge component registration.
 *
 * @remarks
 * HTML Element: `<vscode-badge>`
 *
 * @public
 */
export declare const vsCodeBadge: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Badge>;

/**
 * The Visual Studio Code button component registration.
 *
 * @remarks
 * HTML Element: `<vscode-button>`
 *
 * @public
 */
export declare const vsCodeButton: (overrideDefinition?: OverrideFoundationElementDefinition<ButtonOptions> | undefined) => FoundationElementRegistry<ButtonOptions, typeof Button>;

/**
 * The Visual Studio Code checkbox component registration.
 *
 * @remarks
 * HTML Element: `<vscode-checkbox>`
 *
 * @public
 */
export declare const vsCodeCheckbox: (overrideDefinition?: OverrideFoundationElementDefinition<CheckboxOptions> | undefined) => FoundationElementRegistry<CheckboxOptions, typeof Checkbox>;

/**
 * The Visual Studio Code data grid component registration.
 *
 * @remarks
 * HTML Element: `<vscode-data-grid>`
 *
 * @public
 */
export declare const vsCodeDataGrid: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof DataGrid>;

/**
 * The Visual Studio Code data grid cell component registration.
 *
 * @remarks
 * HTML Element: `<vscode-data-grid-cell>`
 *
 * @public
 */
export declare const vsCodeDataGridCell: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof DataGridCell>;

/**
 * The Visual Studio Code data grid row component registration.
 *
 * @remarks
 * HTML Element: `<vscode-data-grid-row>`
 *
 * @public
 */
export declare const vsCodeDataGridRow: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof DataGridRow>;

/**
 * The Visual Studio Code divider component registration.
 *
 * @remarks
 * HTML Element: `<vscode-divider>`
 *
 * @public
 */
export declare const vsCodeDivider: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Divider>;

/**
 * The Visual Studio Code link dropdown registration.
 *
 * @remarks
 * HTML Element: `<vscode-dropdown>`
 *
 * @public
 */
export declare const vsCodeDropdown: (overrideDefinition?: OverrideFoundationElementDefinition<SelectOptions> | undefined) => FoundationElementRegistry<SelectOptions, typeof Dropdown>;

/**
 * The Visual Studio Code link component registration.
 *
 * @remarks
 * HTML Element: `<vscode-link>`
 *
 * @public
 */
export declare const vsCodeLink: (overrideDefinition?: OverrideFoundationElementDefinition<AnchorOptions> | undefined) => FoundationElementRegistry<AnchorOptions, typeof Link>;

/**
 * The Visual Studio Code option component registration.
 *
 * @remarks
 * HTML Element: `<vscode-option>`
 *
 * @public
 */
export declare const vsCodeOption: (overrideDefinition?: OverrideFoundationElementDefinition<ListboxOptionOptions> | undefined) => FoundationElementRegistry<ListboxOptionOptions, typeof Option_2>;

/**
 * The Visual Studio Code panels component registration.
 *
 * @remarks
 * HTML Element: `<vscode-panels>`
 *
 * @public
 */
export declare const vsCodePanels: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Panels>;

/**
 * The Visual Studio Code panel tab component registration.
 *
 * @remarks
 * HTML Element: `<vscode-panel-tab>`
 *
 * @public
 */
export declare const vsCodePanelTab: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof PanelTab>;

/**
 * The Visual Studio Code panel view component registration.
 *
 * @remarks
 * HTML Element: `<vscode-panel-view>`
 *
 * @public
 */
export declare const vsCodePanelView: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof PanelView>;

/**
 * The Visual Studio Code progress ring component registration.
 *
 * @remarks
 * HTML Element: `<vscode-progress-ring>`
 *
 * @public
 */
export declare const vsCodeProgressRing: (overrideDefinition?: OverrideFoundationElementDefinition<ProgressRingOptions> | undefined) => FoundationElementRegistry<ProgressRingOptions, typeof ProgressRing>;

/**
 * The Visual Studio Code radio component registration.
 *
 * @remarks
 * HTML Element: `<vscode-radio>`
 *
 * @public
 */
export declare const vsCodeRadio: (overrideDefinition?: OverrideFoundationElementDefinition<RadioOptions> | undefined) => FoundationElementRegistry<RadioOptions, typeof Radio>;

/**
 * The Visual Studio Code radio group component registration.
 *
 * @remarks
 * HTML Element: `<vscode-radio-group>`
 *
 * @public
 */
export declare const vsCodeRadioGroup: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof RadioGroup>;

/**
 * The Visual Studio Code tag component registration.
 *
 * @remarks
 * HTML Element: `<vscode-tag>`
 *
 * @public
 */
export declare const vsCodeTag: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Tag>;

/**
 * The Visual Studio Code text area component registration.
 *
 * @remarks
 * HTML Element: `<vscode-text-area>`
 *
 * @public
 */
export declare const vsCodeTextArea: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof TextArea>;

/**
 * The Visual Studio Code text field component registration.
 *
 * @remarks
 * HTML Element: `<vscode-text-field>`
 *
 * @public
 */
export declare const vsCodeTextField: (overrideDefinition?: OverrideFoundationElementDefinition<TextFieldOptions> | undefined) => FoundationElementRegistry<TextFieldOptions, typeof TextField>;

export { }
