import * as React from 'react';

declare module 'primereact/deferredcontent' {

    export interface DeferredContentProps {
        onLoad?(event: React.SyntheticEvent): void;
    }

    export class DeferredContent extends React.Component<DeferredContentProps, any> { }
}
