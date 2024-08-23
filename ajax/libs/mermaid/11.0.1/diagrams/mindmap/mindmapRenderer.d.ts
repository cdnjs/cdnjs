import type { DrawDefinition } from '../../diagram-api/types.js';
declare module 'cytoscape' {
    interface EdgeSingular {
        _private: {
            bodyBounds: unknown;
            rscratch: {
                startX: number;
                startY: number;
                midX: number;
                midY: number;
                endX: number;
                endY: number;
            };
        };
    }
}
export declare const draw: DrawDefinition;
declare const _default: {
    draw: DrawDefinition;
};
export default _default;
