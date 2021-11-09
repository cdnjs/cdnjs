import * as React from 'react';
import {IconType} from "../utils/Utils";

type TagSeverityType = 'success' | 'info' | 'warn' | 'error' | (string & {});

export interface TagProps {
    value?: React.ReactNode;
    severity?: TagSeverityType;
    rounded?: boolean;
    icon?: IconType<TagProps>;
    style?: object;
    className?: string;
}

export declare class Tag extends React.Component<TagProps, any> { }
