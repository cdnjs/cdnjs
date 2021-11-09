import * as React from 'react';

interface InplaceToggleParams {
    originalEvent: React.SyntheticEvent;
    value: boolean;
}

export interface InplaceProps {
    style?: object;
    className?: string;
    active?: boolean;
    closable?: boolean;
    disabled?: boolean;
    tabIndex?: number;
    ariaLabel?: string;
    onOpen?(event: React.MouseEvent<HTMLElement>): void;
    onClose?(event: React.MouseEvent<HTMLElement>): void;
    onToggle?(e: InplaceToggleParams): void;
}

export declare class Inplace extends React.Component<InplaceProps, any> { }

// tslint:disable-next-line:max-classes-per-file
export declare class InplaceDisplay extends React.Component { }

// tslint:disable-next-line:max-classes-per-file
export declare class InplaceContent extends React.Component { }
