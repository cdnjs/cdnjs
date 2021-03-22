import { DragLayerCollector, DndComponentEnhancer, DndOptions } from './types';
/**
 * @param collect The props collector function
 * @param options The DnD options
 */
export declare function DragLayer<RequiredProps, CollectedProps = any>(collect: DragLayerCollector<RequiredProps, CollectedProps>, options?: DndOptions<RequiredProps>): DndComponentEnhancer<CollectedProps>;
