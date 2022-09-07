import * as React from 'react';
import { CSSTransitionProps as ReactCSSTransitionProps } from 'react-transition-group/CSSTransition';

export type CSSTransitionProps<Ref extends undefined | HTMLElement = undefined> = ReactCSSTransitionProps<Ref> & {
    disabled?: boolean;
};

export declare class CSSTransition<Ref extends undefined | HTMLElement> extends React.Component<CSSTransitionProps<Ref>, any> {}
