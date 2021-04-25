import * as React from 'react';
import TooltipOptions from './TooltipOptions';

declare module 'primereact/tooltip' {

    type TargetType = string | string[] | HTMLElement;

    export interface TooltipProps extends TooltipOptions {
        id?: string;
        target?: TargetType;
        content?: string;
        disabled?: boolean;
    }

    export class Tooltip extends React.Component<TooltipProps, any> {
        public updateTargetEvents(target: HTMLElement): void;
        public loadTargetEvents(target: HTMLElement): void;
        public unloadTargetEvents(target: HTMLElement): void;
    }
}
