import * as React from 'react';
import {SyntheticEvent} from "react";

interface OverlayPanelProps {
    id?: string;
    dismissable?: boolean;
    showCloseIcon?: boolean;
    style?: object;
    className?: string;
    appendTo?: any;
    ariaCloseLabel?: string;
    onHide?(): void;
}

export class OverlayPanel extends React.Component<OverlayPanelProps,any> {
    public toggle(event:SyntheticEvent):void;
    public show(event:SyntheticEvent,target:EventTarget):void;
    public hide():void;
}
