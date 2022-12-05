import * as React from 'react';

type StyleClassSelectorType = '@next' | '@prev' | '@parent' | '@grandparent' | string;

export interface StyleClassProps {
    nodeRef: React.MutableRefObject<React.ReactNode>;
    selector?: StyleClassSelectorType;
    enterClassName?: string;
    enterActiveClassName?: string;
    enterToClassName?: string;
    leaveClassName?: string;
    leaveActiveClassName?: string;
    leaveToClassName?: string;
    hideOnOutsideClick?: boolean;
    toggleClassName?: string;
    children?: React.ReactNode;
}

export declare class StyleClass extends React.Component<StyleClassProps, any> {
    public getElement(): HTMLElement;
    public getTarget(): HTMLElement;
}
