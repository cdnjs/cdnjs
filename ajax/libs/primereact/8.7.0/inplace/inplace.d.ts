import * as React from 'react';

interface InplaceToggleParams {
    originalEvent: React.SyntheticEvent;
    value: boolean;
}

export interface InplaceProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    active?: boolean;
    closable?: boolean;
    disabled?: boolean;
    ariaLabel?: string;
    onOpen?(event: React.MouseEvent<HTMLElement>): void;
    onClose?(event: React.MouseEvent<HTMLElement>): void;
    onToggle?(e: InplaceToggleParams): void;
    children?: React.ReactNode;
}

export declare class Inplace extends React.Component<InplaceProps, any> {
    public getElement(): HTMLDivElement;
}

// tslint:disable-next-line:max-classes-per-file
export declare class InplaceDisplay extends React.Component {
    children?: React.ReactNode;
}

// tslint:disable-next-line:max-classes-per-file
export declare class InplaceContent extends React.Component {
    children?: React.ReactNode;
}
