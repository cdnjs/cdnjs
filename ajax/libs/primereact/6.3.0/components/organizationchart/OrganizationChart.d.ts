import * as React from 'react';

declare namespace OrganizationChart {

    type SelectionModeType = 'single' | 'multiple';

    type NodeDataType = OrganizationChartNodeData | undefined | null;

    type SelectionNodeDataType = OrganizationChartNodeData | OrganizationChartNodeData[] | undefined | null;

    interface NodeSelectParams {
        originalEvent: React.SyntheticEvent;
        node: NodeDataType;
    }

    interface NodeUnselectParams extends NodeSelectParams { }

    interface OrganizationChartNodeData {
        className?: string;
        expanded?: boolean;
        children?: OrganizationChartNodeData[];
        selectable?: boolean;
        label?: string;
    }

    interface OrganizationChartProps {
        id?: string;
        value?: OrganizationChartNodeData[];
        style?: object;
        className?: string;
        selectionMode?: SelectionModeType;
        selection?: SelectionNodeDataType;
        nodeTemplate?(node: OrganizationChartNodeData): React.ReactNode;
        selectionChange?(node: SelectionNodeDataType): void;
        onNodeSelect?(e: NodeSelectParams): void;
        onNodeUnselect?(e: NodeUnselectParams): void;
    }
}

export declare class OrganizationChart extends React.Component<OrganizationChart.OrganizationChartProps, any> { }
