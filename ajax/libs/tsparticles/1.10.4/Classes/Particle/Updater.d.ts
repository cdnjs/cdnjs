import { Container } from "../Container";
import { Particle } from "../Particle";
/**
 * Particle updater, it manages movement
 */
export declare class Updater {
    private readonly particle;
    private readonly container;
    private readonly mover;
    constructor(container: Container, particle: Particle);
    private static checkBounds;
    update(delta: number): void;
    private updateOpacity;
    private updateSize;
    private updateAngle;
    private fixOutOfCanvasPosition;
    private updateOutMode;
    private updateBounce;
    private polygonBounce;
}
