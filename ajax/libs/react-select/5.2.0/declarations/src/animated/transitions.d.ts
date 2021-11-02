import React, { Component, ComponentType, CSSProperties, ReactNode } from 'react';
import { ExitHandler, TransitionStatus } from 'react-transition-group/Transition';
declare type FadeProps<ComponentProps> = {
    component: ComponentType<ComponentProps>;
    in?: boolean;
    onExited?: ExitHandler<undefined | HTMLElement>;
    duration?: number;
} & ComponentProps;
export declare const Fade: <ComponentProps extends {}>({ component: Tag, duration, in: inProp, onExited, ...props }: FadeProps<ComponentProps>) => JSX.Element;
export declare const collapseDuration = 260;
declare type Width = number | 'auto';
interface CollapseProps {
    children: ReactNode;
    in?: boolean;
    onExited?: ExitHandler<undefined | HTMLElement>;
}
interface CollapseState {
    width: Width;
}
export declare class Collapse extends Component<CollapseProps, CollapseState> {
    duration: number;
    rafID?: number | null;
    state: CollapseState;
    transition: {
        [K in TransitionStatus]?: CSSProperties;
    };
    nodeRef: React.RefObject<HTMLDivElement>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getStyle: (width: Width) => CSSProperties;
    getTransition: (state: TransitionStatus) => React.CSSProperties | undefined;
    render(): JSX.Element;
}
export {};
