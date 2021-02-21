import { useContext } from 'react';
import { invariant } from '@react-dnd/invariant';
import { DndContext } from '../core';
/**
 * A hook to retrieve the DragDropManager from Context
 */

export function useDragDropManager() {
  var _useContext = useContext(DndContext),
      dragDropManager = _useContext.dragDropManager;

  invariant(dragDropManager != null, 'Expected drag drop context');
  return dragDropManager;
}