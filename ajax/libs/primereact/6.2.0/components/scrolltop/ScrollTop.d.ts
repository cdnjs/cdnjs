import * as React from 'react';

interface ScrollTopProps {
    target?: string;
    threshold?: number;
    icon?: string;
    behavior?: string;
    className?: string;
    style?: object;
}

export class ScrollTop extends React.Component<ScrollTopProps,any> {}
