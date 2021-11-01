import * as React from 'react';

type TagSeverityType = 'success' | 'info' | 'warn' | 'error' | (string & {});

export interface TagProps {
    value?: React.ReactNode;
    severity?: TagSeverityType;
    rounded?: boolean;
    icon?: string;
    style?: object;
    className?: string;
}

export declare class Tag extends React.Component<TagProps, any> { }
