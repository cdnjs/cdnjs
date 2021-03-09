import * as React from 'react';

interface ToolbarProps {
    id?: string;
    style?: object;
    className?: string;
    left?:((props: object) => any | any) | JSX.Element;
    right?:((props: object) => any | any) | JSX.Element;
}

export class Toolbar extends React.Component<ToolbarProps,any> {}
