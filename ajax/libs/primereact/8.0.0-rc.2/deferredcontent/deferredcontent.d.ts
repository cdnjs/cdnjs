import * as React from 'react';

export interface DeferredContentProps {
    onLoad?(event: React.SyntheticEvent): void;
    children?: React.ReactNode;
}

export declare class DeferredContent extends React.Component<DeferredContentProps, any> { }
