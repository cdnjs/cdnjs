import * as React from 'react';

interface FieldsetProps {
    id?: string;
    legend?: any;
    className?: string;
    style?: object;
    toggleable?: boolean;
    collapsed?: boolean;
    onExpand?(event: Event): void;
    onCollapse?(event: Event): void;
    onToggle?(e:{event: Event, value: boolean}): void;
    onClick?(event: Event): void;
}

export class Fieldset extends React.Component<FieldsetProps,any> {}