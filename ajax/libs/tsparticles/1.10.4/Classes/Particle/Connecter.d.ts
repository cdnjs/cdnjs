import { Particle } from "../Particle";
import { Container } from "../Container";
/**
 * Particle connection manager
 */
export declare class Connecter {
    private readonly particle;
    private readonly container;
    constructor(container: Container, particle: Particle);
    /**
     * Connecting particles on hover interactivity
     */
    connect(destParticle: Particle): void;
}
