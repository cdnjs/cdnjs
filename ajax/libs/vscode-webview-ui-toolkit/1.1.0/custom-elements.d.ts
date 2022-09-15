import type { Container } from '@microsoft/fast-foundation';
import { vsCodeBadge } from './badge/index';
import { vsCodeButton } from './button/index';
import { vsCodeCheckbox } from './checkbox/index';
import { vsCodeDataGrid, vsCodeDataGridCell, vsCodeDataGridRow } from './data-grid/index';
import { vsCodeDivider } from './divider/index';
import { vsCodeDropdown } from './dropdown/index';
import { vsCodeLink } from './link/index';
import { vsCodeOption } from './option/index';
import { vsCodePanels, vsCodePanelTab, vsCodePanelView } from './panels/index';
import { vsCodeProgressRing } from './progress-ring/index';
import { vsCodeRadioGroup } from './radio-group/index';
import { vsCodeRadio } from './radio/index';
import { vsCodeTag } from './tag/index';
import { vsCodeTextArea } from './text-area/index';
import { vsCodeTextField } from './text-field/index';
import type { Badge } from './badge/index';
import type { Button } from './button/index';
import type { Checkbox } from './checkbox/index';
import type { DataGrid, DataGridCell, DataGridRow } from './data-grid/index';
import type { Divider } from './divider/index';
import type { Dropdown } from './dropdown/index';
import type { Link } from './link/index';
import type { Option } from './option/index';
import type { Panels, PanelTab, PanelView } from './panels/index';
import type { ProgressRing } from './progress-ring/index';
import type { RadioGroup } from './radio-group/index';
import type { Radio } from './radio/index';
import type { Tag } from './tag/index';
import type { TextArea } from './text-area/index';
import type { TextField } from './text-field/index';
export { vsCodeBadge, vsCodeButton, vsCodeCheckbox, vsCodeDataGrid, vsCodeDataGridCell, vsCodeDataGridRow, vsCodeDivider, vsCodeDropdown, vsCodeLink, vsCodeOption, vsCodePanels, vsCodePanelTab, vsCodePanelView, vsCodeProgressRing, vsCodeRadioGroup, vsCodeRadio, vsCodeTag, vsCodeTextArea, vsCodeTextField, };
/**
 * All VSCode Web Components
 * @public
 * @remarks
 * This object can be passed directly to the Design System's `register` method to
 * statically link and register all available components.
 */
export declare const allComponents: {
    vsCodeBadge: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").FoundationElementDefinition> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").FoundationElementDefinition, typeof Badge>;
    vsCodeButton: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").ButtonOptions> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").ButtonOptions, typeof Button>;
    vsCodeCheckbox: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").CheckboxOptions> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").CheckboxOptions, typeof Checkbox>;
    vsCodeDataGrid: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").FoundationElementDefinition> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").FoundationElementDefinition, typeof DataGrid>;
    vsCodeDataGridCell: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").FoundationElementDefinition> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").FoundationElementDefinition, typeof DataGridCell>;
    vsCodeDataGridRow: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").FoundationElementDefinition> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").FoundationElementDefinition, typeof DataGridRow>;
    vsCodeDivider: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").FoundationElementDefinition> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").FoundationElementDefinition, typeof Divider>;
    vsCodeDropdown: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").SelectOptions> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").SelectOptions, typeof Dropdown>;
    vsCodeLink: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").AnchorOptions> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").AnchorOptions, typeof Link>;
    vsCodeOption: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").ListboxOptionOptions> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").ListboxOptionOptions, typeof Option>;
    vsCodePanels: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").FoundationElementDefinition> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").FoundationElementDefinition, typeof Panels>;
    vsCodePanelTab: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").FoundationElementDefinition> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").FoundationElementDefinition, typeof PanelTab>;
    vsCodePanelView: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").FoundationElementDefinition> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").FoundationElementDefinition, typeof PanelView>;
    vsCodeProgressRing: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").ProgressRingOptions> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").ProgressRingOptions, typeof ProgressRing>;
    vsCodeRadioGroup: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").FoundationElementDefinition> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").FoundationElementDefinition, typeof RadioGroup>;
    vsCodeRadio: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").RadioOptions> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").RadioOptions, typeof Radio>;
    vsCodeTag: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").FoundationElementDefinition> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").FoundationElementDefinition, typeof Tag>;
    vsCodeTextArea: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").FoundationElementDefinition> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").FoundationElementDefinition, typeof TextArea>;
    vsCodeTextField: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").TextFieldOptions> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").TextFieldOptions, typeof TextField>;
    register(container?: Container | undefined, ...rest: any[]): void;
};
