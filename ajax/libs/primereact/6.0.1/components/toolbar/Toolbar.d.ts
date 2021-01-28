import * as React from 'react';

interface ToolbarProps {
    id?: string;
    style?: object;
    className?: string;
    left?:((props: object) => any | any);
    right?:((props: object) => any | any);
}

export class Toolbar extends React.Component<ToolbarProps,any> {}
