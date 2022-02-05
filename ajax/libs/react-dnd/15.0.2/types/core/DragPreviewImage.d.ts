import { FC } from 'react';
import type { ConnectDragPreview } from '../types';
export interface DragPreviewImageProps {
    connect: ConnectDragPreview;
    src: string;
}
/**
 * A utility for rendering a drag preview image
 */
export declare const DragPreviewImage: FC<DragPreviewImageProps>;
