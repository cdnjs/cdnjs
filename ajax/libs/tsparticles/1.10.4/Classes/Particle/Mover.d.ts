import { Particle } from "../Particle";
import { Container } from "../Container";
export declare class Mover {
    private readonly container;
    private readonly particle;
    constructor(container: Container, particle: Particle);
    move(delta: number): void;
    private moveParallax;
    private getProximitySpeedFactor;
}
