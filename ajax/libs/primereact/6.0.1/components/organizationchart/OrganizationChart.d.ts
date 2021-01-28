import * as React from 'react';

export interface OrganizationChartNodeData {
    className?: string,
    expanded?: boolean,
    children?: OrganizationChartNodeData[]
    selectable?: boolean
    label?: string,
}

interface OrganizationChartProps {
    id?: string;
    value?: OrganizationChartNodeData[];
    style?: object;
    className?: string;
    selectionMode?: string;
    selection?: any;
    nodeTemplate?(node: OrganizationChartNodeData): React.ReactNode;
    selectionChange?(data: any): void;
    onNodeSelect?(e: { originalEvent: Event, node: any }): void;
    onNodeUnselect?(e: { originalEvent: Event, node: any }): void;
}

export class OrganizationChart extends React.Component<OrganizationChartProps, any> {
}
