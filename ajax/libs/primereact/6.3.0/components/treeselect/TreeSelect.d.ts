import * as React from 'react';
import TreeNode from '../treenode/TreeNode';

declare namespace TreeSelect {

    type SelectionModeType = 'single' | 'multiple' | 'checkbox';

    type SelectionKeys = string | SelectionKeysType | undefined | null;

    type DisplayType = 'comma' | 'chip';

    type FilterModeType = 'lenient' | 'strict';

    type ValueTemplateType = React.ReactNode | ((selectedNodes: TreeNode | TreeNode[], props: TreeSelectProps) => React.ReactNode);

    type PanelHeaderTemplateType = React.ReactNode | ((options: PanelHeaderTemplateOptions) => React.ReactNode);

    type PanelFooterTemplateType = React.ReactNode | ((props: TreeSelectProps) => React.ReactNode);

    interface PanelHeaderTemplateOptions {
        className: string;
        filterElement: JSX.Element;
        closeElement: JSX.Element;
        closeElementClassName: string;
        closeIconClassName: string;
        onCloseClick(): void;
        element: JSX.Element;
        props: TreeSelectProps;
    }

    interface ChangeTargetOptions {
        name: string;
        id: string;
        value: SelectionKeys;
    }

    interface ChangeParams {
        originalEvent: React.SyntheticEvent;
        value: SelectionKeys;
        stopPropagation(): void;
        preventDefault(): void;
        target: ChangeTargetOptions;
    }

    interface SelectionKeysType {
        [key: string]: boolean;
    }

    interface EventNodeParams {
        originalEvent: React.SyntheticEvent;
        node: TreeNode;
    }

    interface TreeSelectProps {
        id?: string;
        value?: SelectionKeys;
        name?: string;
        style?: object;
        className?: string;
        disabled?: boolean;
        options?: TreeNode[];
        scrollHeight?: string;
        placeholder?: string;
        tabIndex?: number;
        inputId?: string;
        ariaLabel?: string;
        ariaLabelledBy?: string;
        selectionMode?: SelectionModeType;
        panelStyle?: object;
        panelClassName?: string;
        appendTo?: HTMLElement | string;
        emptyMessage?: string;
        display?: DisplayType;
        metaKeySelection?: boolean;
        valueTemplate?: ValueTemplateType;
        panelHeaderTemplate?: PanelHeaderTemplateType;
        panelFooterTemplate?: PanelFooterTemplateType;
        transitionOptions?: object;
        filter?: boolean;
        filterBy?: string;
        filterMode?: FilterModeType;
        filterPlaceholder?: string;
        filterLocale?: string;
        filterInputAutoFocus?: boolean;
        resetFilterOnHide?: boolean;
        onShow?(): void;
        onHide?(): void;
        onChange?(e: ChangeParams): void;
        onNodeSelect?(node: TreeNode): void;
        onNodeUnselect?(node: TreeNode): void;
        onNodeExpand?(e: EventNodeParams): void;
        onNodeCollapse?(e: EventNodeParams): void;
    }
}

export declare class TreeSelect extends React.Component<TreeSelect.TreeSelectProps, any> { }
