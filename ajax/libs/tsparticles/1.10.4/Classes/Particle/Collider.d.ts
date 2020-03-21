import { Container } from "../Container";
import { Particle } from "../Particle";
export declare class Collider {
    private readonly container;
    private readonly particle;
    constructor(container: Container, particle: Particle);
    collide(p2: Particle): void;
}
