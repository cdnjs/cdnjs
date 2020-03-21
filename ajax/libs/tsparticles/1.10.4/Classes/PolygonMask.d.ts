import { Container } from "./Container";
import { ICoordinates } from "../Interfaces/ICoordinates";
/**
 * Polygon Mask manager
 */
export declare class PolygonMask {
    redrawTimeout?: number;
    raw?: ICoordinates[];
    svg?: SVGSVGElement;
    path?: SVGPathElement;
    private readonly container;
    private readonly path2DSupported;
    private polygonPath?;
    private polygonPathLength;
    private width;
    private height;
    private offset?;
    constructor(container: Container);
    checkInsidePolygon(position: ICoordinates | undefined | null): boolean;
    randomPointInPolygon(): ICoordinates;
    /**
     * Depends on SVGPathSeg API polyfill https://github.com/progers/pathseg for Chrome
     * Deprecate SVGPathElement.getPathSegAtLength removed in:
     * Chrome for desktop release 62
     * Chrome for Android release 62
     * Android WebView release 62
     * Opera release 49
     * Opera for Android release 49
     */
    parseSvgPathToPolygon(svgUrl?: string): Promise<ICoordinates[] | undefined>;
    drawPolygon(): void;
    drawPointsOnPolygonPath(): void;
    private getRandomPointOnPolygonPath;
    private getRandomPointOnPolygonPathByLength;
    private getEquidistantPointOnPolygonPathByIndex;
    private getPoingOnPolygonPathByIndex;
    private createPath2D;
}
