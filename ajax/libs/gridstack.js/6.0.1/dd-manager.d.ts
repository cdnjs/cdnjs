/**
 * dd-manager.ts 6.0.1
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
import { DDDraggable } from './dd-draggable';
import { DDDroppable } from './dd-droppable';
import { DDResizable } from './dd-resizable';
/**
 * globals that are shared across Drag & Drop instances
 */
export declare class DDManager {
    /** true if a mouse down event was handled */
    static mouseHandled: boolean;
    /** item being dragged */
    static dragElement: DDDraggable;
    /** item we are currently over as drop target */
    static dropElement: DDDroppable;
    /** current item we're over for resizing purpose (ignore nested grid resize handles) */
    static overResizeElement: DDResizable;
}
