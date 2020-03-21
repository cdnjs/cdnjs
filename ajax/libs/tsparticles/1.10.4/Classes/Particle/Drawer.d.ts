import { Container } from "../Container";
import { Particle } from "../Particle";
/**
 * Particle draw manager
 */
export declare class Drawer {
    private readonly particle;
    private readonly container;
    private readonly text?;
    constructor(container: Container, particle: Particle);
    draw(): void;
}
