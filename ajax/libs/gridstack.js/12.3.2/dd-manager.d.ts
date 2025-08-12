/**
 * dd-manager.ts 12.3.2
 * Copyright (c) 2021-2025 Alain Dumesny - see GridStack root license
 */
import { DDDraggable } from './dd-draggable';
import { DDDroppable } from './dd-droppable';
import { DDResizable } from './dd-resizable';
/**
 * Global state manager for all Drag & Drop instances.
 *
 * This class maintains shared state across all drag & drop operations,
 * ensuring proper coordination between multiple grids and drag/drop elements.
 * All properties are static to provide global access throughout the DD system.
 */
export declare class DDManager {
    /**
     * Controls drag operation pausing behavior.
     * If set to true or a number (milliseconds), dragging placement and collision
     * detection will only happen after the user pauses movement.
     * This improves performance during rapid mouse movements.
     */
    static pauseDrag: boolean | number;
    /**
     * Flag indicating if a mouse down event was already handled.
     * Prevents multiple handlers from processing the same mouse event.
     */
    static mouseHandled: boolean;
    /**
     * Reference to the element currently being dragged.
     * Used to track the active drag operation across the system.
     */
    static dragElement: DDDraggable;
    /**
     * Reference to the drop target element currently under the cursor.
     * Used to handle drop operations and hover effects.
     */
    static dropElement: DDDroppable;
    /**
     * Reference to the element currently being resized.
     * Helps ignore nested grid resize handles during resize operations.
     */
    static overResizeElement: DDResizable;
}
