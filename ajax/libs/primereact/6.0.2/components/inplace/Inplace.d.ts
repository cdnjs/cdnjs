import * as React from 'react';

interface InplaceProps {
    style?: object;
    className?: string;
    active?: boolean;
    closable?: boolean;
    disabled?: boolean;
    tabIndex?: number;
    ariaLabel?: string;
    onOpen?(event: Event): void;
    onClose?(event: Event): void;
    onToggle?(e:{originalEvent: Event, value: boolean}): void;
}

export class Inplace extends React.Component<InplaceProps,any> {}

// tslint:disable-next-line:max-classes-per-file
export class InplaceDisplay extends React.Component{}

// tslint:disable-next-line:max-classes-per-file
export class InplaceContent extends React.Component {}
