import * as React from 'react';

declare module 'primereact/fieldset' {

    interface ToggleParams {
        originalEvent: React.MouseEvent<HTMLElement>;
        value: boolean;
    }

    export interface FieldsetProps {
        id?: string;
        legend?: React.ReactNode;
        className?: string;
        style?: object;
        toggleable?: boolean;
        collapsed?: boolean;
        transitionOptions?: object;
        onExpand?(event: React.MouseEvent<HTMLElement>): void;
        onCollapse?(event: React.MouseEvent<HTMLElement>): void;
        onToggle?(e: ToggleParams): void;
        onClick?(event: React.MouseEvent<HTMLElement>): void;
    }

    export class Fieldset extends React.Component<FieldsetProps, any> { }
}
