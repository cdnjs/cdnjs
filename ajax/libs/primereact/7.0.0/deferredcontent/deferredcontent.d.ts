import * as React from 'react';

export interface DeferredContentProps {
    onLoad?(event: React.SyntheticEvent): void;
}

export declare class DeferredContent extends React.Component<DeferredContentProps, any> { }
