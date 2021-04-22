import * as React from 'react';

declare namespace DeferredContent {

    interface DeferredContentProps {
        onLoad?(event: React.SyntheticEvent): void;
    }
}

export declare class DeferredContent extends React.Component<DeferredContent.DeferredContentProps, any> { }
