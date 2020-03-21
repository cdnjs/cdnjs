import { Container } from "./Container";
import { IDimension } from "../Interfaces/IDimension";
import { Particle } from "./Particle";
import { ICoordinates } from "../Interfaces/ICoordinates";
/**
 * Canvas manager
 */
export declare class Canvas {
    /**
     * The particles canvas
     */
    element?: HTMLCanvasElement;
    /**
     * The particles canvas dimension
     */
    readonly dimension: IDimension;
    /**
     * The parent container
     */
    private readonly container;
    /**
     * The particles canvas context
     */
    private context;
    private generatedCanvas;
    /**
     * Constructor of canvas manager
     * @param container the parent container
     */
    constructor(container: Container);
    /**
     * Initializes the canvas element
     */
    init(): void;
    loadCanvas(canvas: HTMLCanvasElement, generatedCanvas?: boolean): void;
    destroy(): void;
    /**
     * Calculates the size of the canvas
     */
    size(): void;
    /**
     * Paints the canvas background
     */
    paint(): void;
    /**
     * Clears the canvas content
     */
    clear(): void;
    isPointInPath(path: Path2D, point: ICoordinates): boolean;
    drawPolygonMask(rawData: ICoordinates[]): void;
    drawLinkedLine(p1: Particle, p2: Particle, pos1: ICoordinates, pos2: ICoordinates, opacity: number): void;
    drawConnectLine(p1: Particle, p2: Particle): void;
    drawGrabLine(particle: Particle, opacity: number, mousePos: ICoordinates): void;
    drawParticle(particle: Particle): void;
    private paintBase;
    private lineStyle;
}
