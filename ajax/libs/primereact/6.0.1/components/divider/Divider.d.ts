import * as React from 'react';

interface DividerProps {
    align?: string;
    layout?: string;
    type?: string;
    style?: object;
    className?: string;
}

export class Divider extends React.Component<DividerProps,any> {}
