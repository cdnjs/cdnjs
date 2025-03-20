/**
 * @param parent
 * @param w
 * @param h
 * @param points
 */
export function insertPolygonShape(parent: any, w: any, h: any, points: any): any;
export function createPathFromPoints(points: any): any;
export function generateFullSineWavePoints(x1: any, y1: any, x2: any, y2: any, amplitude: any, numCycles: any): {
    x: any;
    y: any;
}[];
export function generateCirclePoints(centerX: any, centerY: any, radius: any, numPoints: any, startAngle: any, endAngle: any): {
    x: number;
    y: number;
}[];
export function labelHelper(parent: any, node: any, _classes: any): Promise<{
    shapeSvg: any;
    bbox: any;
    halfPadding: number;
    label: any;
}>;
export function updateNodeBounds(node: any, element: any): void;
export function getNodeClasses(node: any, extra: any): string;
