import type { RefObject, ReactElement } from 'react';
import type { DragSourceOptions, DragPreviewOptions } from './options';
export declare type ConnectableElement = RefObject<any> | ReactElement | Element | null;
export declare type DragElementWrapper<Options> = (elementOrNode: ConnectableElement, options?: Options) => ReactElement | null;
export declare type ConnectDragSource = DragElementWrapper<DragSourceOptions>;
export declare type ConnectDropTarget = DragElementWrapper<any>;
export declare type ConnectDragPreview = DragElementWrapper<DragPreviewOptions>;
