import * as React from 'react';

interface TagProps {
    value?: any;
    severity?: string;
    rounded?: boolean;
    icon?: string;
    style?: object;
    className?: string;
}

export class Tag extends React.Component<TagProps,any> {}
