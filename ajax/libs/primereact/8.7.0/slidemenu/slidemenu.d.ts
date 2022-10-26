import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { MenuItem } from '../menuitem';

type SlideMenuAppendToType = 'self' | HTMLElement | undefined | null;

interface SlideMenuNavigateParams {
    level: number;
}

export interface SlideMenuProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    appendTo?: SlideMenuAppendToType;
    autoZIndex?: boolean;
    backLabel?: string;
    baseZIndex?: number;
    children?: React.ReactNode;
    easing?: string;
    effectDuration?: number;
    menuWidth?: number;
    model?: MenuItem[];
    popup?: boolean;
    transitionOptions?: CSSTransitionProps;
    viewportHeight?: number;
    onShow?(e: React.SyntheticEvent): void;
    onHide?(e: React.SyntheticEvent): void;
    onNavigate?(e: SlideMenuNavigateParams): void;
}

export declare class SlideMenu extends React.Component<SlideMenuProps, any> {
    public show(event: React.SyntheticEvent): void;
    public hide(event: React.SyntheticEvent): void;
    public toggle(event: React.SyntheticEvent): void;
    public setLevelState(level: number): void;
    public navigateForward(): void;
    public navigateBack(): void;
    public getElement(): HTMLDivElement;
}
