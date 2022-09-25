import * as React from 'react';

type OrganizationChartSelectionModeType = 'single' | 'multiple';

type OrganizationChartNodeDataType = OrganizationChartNodeData | undefined | null;

type OrganizationChartSelectionNodeDataType = OrganizationChartNodeData | OrganizationChartNodeData[] | undefined | null;

interface OrganizationChartNodeSelectParams {
    originalEvent: React.SyntheticEvent;
    node: OrganizationChartNodeDataType;
}

interface OrganizationChartNodeUnselectParams extends OrganizationChartNodeSelectParams {}

interface OrganizationChartNodeData {
    className?: string;
    expanded?: boolean;
    children?: OrganizationChartNodeData[];
    selectable?: boolean;
    label?: string;
}

export interface OrganizationChartProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    value?: OrganizationChartNodeData[];
    selectionMode?: OrganizationChartSelectionModeType;
    selection?: OrganizationChartSelectionNodeDataType;
    nodeTemplate?(node: OrganizationChartNodeData): React.ReactNode;
    selectionChange?(node: OrganizationChartSelectionNodeDataType): void;
    onNodeSelect?(e: OrganizationChartNodeSelectParams): void;
    onNodeUnselect?(e: OrganizationChartNodeUnselectParams): void;
    children?: React.ReactNode;
}

export declare class OrganizationChart extends React.Component<OrganizationChartProps, any> {
    public getElement(): HTMLDivElement;
}
