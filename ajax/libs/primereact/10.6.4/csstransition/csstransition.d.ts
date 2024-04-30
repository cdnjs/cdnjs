/**
 *
 * CSSTransition component wraps [ReactCSSTransition](https://reactcommunity.org/react-transition-group/css-transition) API.
 * It allows us to easily manage animations. All PrimeReact components use this component.
 *
 * [Live Demo](https://www.primereact.org/dropdown/)
 *
 * @module csstransition
 *
 */
import * as React from 'react';
import { CSSTransitionProps as ReactCSSTransitionProps } from 'react-transition-group/CSSTransition';

/**
 * Defines valid properties in [ReactCSSTransition](https://reactcommunity.org/react-transition-group/css-transition) API. In addition to these, all properties of HTMLElement can be used in this component.
 * @group Properties
 */
export type CSSTransitionProps<Ref extends undefined | HTMLElement = undefined> = ReactCSSTransitionProps<Ref> & {
    /**
     * When present, it specifies that the component should be disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
};

/**
 * **PrimeReact - CSSTransition**
 *
 * _CSSTransition component wraps [ReactCSSTransition](https://reactcommunity.org/react-transition-group/css-transition) API.
 * It allows us to easily manage animations. All PrimeReact components use this component._
 *
 * [Live Demo](https://www.primereact.org/dropdown/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class CSSTransition<Ref extends undefined | HTMLElement> extends React.Component<CSSTransitionProps<Ref>, any> {}
