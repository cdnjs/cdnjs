import * as React from 'react';

declare namespace Tag {

    type SeverityType = 'success' | 'info' | 'warn' | 'error' | (string & {});

    interface TagProps {
        value?: React.ReactNode;
        severity?: SeverityType;
        rounded?: boolean;
        icon?: string;
        style?: object;
        className?: string;
    }
}

export declare class Tag extends React.Component<Tag.TagProps, any> { }
