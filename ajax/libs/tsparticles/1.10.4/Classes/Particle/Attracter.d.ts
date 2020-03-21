import { Container } from "../Container";
import { Particle } from "../Particle";
export declare class Attracter {
    private readonly container;
    private readonly particle;
    constructor(container: Container, particle: Particle);
    attract(p2: Particle): void;
}
