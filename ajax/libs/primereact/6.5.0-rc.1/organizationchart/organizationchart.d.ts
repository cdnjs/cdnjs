import * as React from 'react';

type OrganizationChartSelectionModeType = 'single' | 'multiple';

type OrganizationChartNodeDataType = OrganizationChartNodeData | undefined | null;

type OrganizationChartSelectionNodeDataType = OrganizationChartNodeData | OrganizationChartNodeData[] | undefined | null;

interface OrganizationChartNodeSelectParams {
    originalEvent: React.SyntheticEvent;
    node: OrganizationChartNodeDataType;
}

interface OrganizationChartNodeUnselectParams extends OrganizationChartNodeSelectParams { }

interface OrganizationChartNodeData {
    className?: string;
    expanded?: boolean;
    children?: OrganizationChartNodeData[];
    selectable?: boolean;
    label?: string;
}

export interface OrganizationChartProps {
    id?: string;
    value?: OrganizationChartNodeData[];
    style?: object;
    className?: string;
    selectionMode?: OrganizationChartSelectionModeType;
    selection?: OrganizationChartSelectionNodeDataType;
    nodeTemplate?(node: OrganizationChartNodeData): React.ReactNode;
    selectionChange?(node: OrganizationChartSelectionNodeDataType): void;
    onNodeSelect?(e: OrganizationChartNodeSelectParams): void;
    onNodeUnselect?(e: OrganizationChartNodeUnselectParams): void;
}

export declare class OrganizationChart extends React.Component<OrganizationChartProps, any> { }
