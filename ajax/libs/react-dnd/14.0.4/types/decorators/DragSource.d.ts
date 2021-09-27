import { SourceType } from 'dnd-core';
import { DndOptions, DndComponentEnhancer, DragSourceSpec, DragSourceCollector } from './types';
/**
 * Decorates a component as a dragsource
 * @param type The dragsource type
 * @param spec The drag source specification
 * @param collect The props collector function
 * @param options DnD options
 */
export declare function DragSource<RequiredProps, CollectedProps = any, DragObject = any, DropResult = any>(type: SourceType | ((props: RequiredProps) => SourceType), spec: DragSourceSpec<RequiredProps, DragObject, DropResult>, collect: DragSourceCollector<CollectedProps, RequiredProps>, options?: DndOptions<RequiredProps>): DndComponentEnhancer<CollectedProps>;
