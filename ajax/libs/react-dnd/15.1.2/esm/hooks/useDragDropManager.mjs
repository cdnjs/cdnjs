import { useContext } from 'react';
import { invariant } from '@react-dnd/invariant';
import { DndContext } from '../core/index.mjs';
/**
 * A hook to retrieve the DragDropManager from Context
 */ export function useDragDropManager() {
    const { dragDropManager  } = useContext(DndContext);
    invariant(dragDropManager != null, 'Expected drag drop context');
    return dragDropManager;
}

//# sourceMappingURL=useDragDropManager.mjs.map