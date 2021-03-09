import { TargetType } from 'dnd-core';
import { DndOptions, DropTargetSpec, DropTargetCollector, DndComponentEnhancer } from './types';
/**
 * @param type The accepted target type
 * @param spec The DropTarget specification
 * @param collect The props collector function
 * @param options Options
 */
export declare function DropTarget<RequiredProps, CollectedProps = any, DragObject = any, DropResult = any>(type: TargetType | ((props: RequiredProps) => TargetType), spec: DropTargetSpec<RequiredProps, DragObject, DropResult>, collect: DropTargetCollector<CollectedProps, RequiredProps>, options?: DndOptions<RequiredProps>): DndComponentEnhancer<CollectedProps>;
