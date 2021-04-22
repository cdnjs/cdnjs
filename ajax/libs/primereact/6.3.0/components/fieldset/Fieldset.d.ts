import * as React from 'react';

declare namespace Fieldset {

    interface ToggleParams {
        originalEvent: React.MouseEvent<HTMLElement>;
        value: boolean;
    }

    interface FieldsetProps {
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
}

export declare class Fieldset extends React.Component<Fieldset.FieldsetProps, any> { }
