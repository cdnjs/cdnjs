import * as React from 'react';

declare module 'primereact/tag' {

    type SeverityType = 'success' | 'info' | 'warn' | 'error' | (string & {});

    export interface TagProps {
        value?: React.ReactNode;
        severity?: SeverityType;
        rounded?: boolean;
        icon?: string;
        style?: object;
        className?: string;
    }

    export class Tag extends React.Component<TagProps, any> { }
}
