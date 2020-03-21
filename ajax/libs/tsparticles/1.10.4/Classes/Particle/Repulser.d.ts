import { Container } from "../Container";
import { Particle } from "../Particle";
/**
 * Particle repulse manager
 */
export declare class Repulser {
    private readonly particle;
    private readonly container;
    constructor(container: Container, particle: Particle);
    repulse(): void;
    private divRepulse;
    private clickRepulse;
    private hoverRepulse;
    private processRepulse;
}
