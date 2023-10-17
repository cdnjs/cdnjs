import { ComponentType, ReactNode } from 'react';
import { ExitHandler } from 'react-transition-group/Transition';
declare type FadeProps<ComponentProps> = {
    component: ComponentType<ComponentProps>;
    in?: boolean;
    onExited?: ExitHandler<undefined | HTMLElement>;
    duration?: number;
} & ComponentProps;
export declare const Fade: <ComponentProps extends {}>({ component: Tag, duration, in: inProp, onExited, ...props }: FadeProps<ComponentProps>) => JSX.Element;
export declare const collapseDuration = 260;
interface CollapseProps {
    children: ReactNode;
    in?: boolean;
    onExited?: ExitHandler<undefined | HTMLElement>;
}
export declare const Collapse: ({ children, in: _in, onExited }: CollapseProps) => JSX.Element;
export {};
