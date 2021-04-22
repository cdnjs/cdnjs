import * as React from 'react';

declare namespace Inplace {

    interface ToggleParams {
        originalEvent: React.SyntheticEvent;
        value: boolean;
    }
    interface InplaceProps {
        style?: object;
        className?: string;
        active?: boolean;
        closable?: boolean;
        disabled?: boolean;
        tabIndex?: number;
        ariaLabel?: string;
        onOpen?(event: React.MouseEvent<HTMLElement>): void;
        onClose?(event: React.MouseEvent<HTMLElement>): void;
        onToggle?(e: ToggleParams): void;
    }
}

export declare class Inplace extends React.Component<Inplace.InplaceProps, any> { }

// tslint:disable-next-line:max-classes-per-file
export declare class InplaceDisplay extends React.Component { }

// tslint:disable-next-line:max-classes-per-file
export declare class InplaceContent extends React.Component { }
