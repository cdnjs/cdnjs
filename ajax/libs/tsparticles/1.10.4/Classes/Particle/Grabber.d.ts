import { Container } from "../Container";
import { Particle } from "../Particle";
/**
 * Particle grab manager
 */
export declare class Grabber {
    private readonly container;
    private readonly particle;
    constructor(container: Container, particle: Particle);
    grab(): void;
}
