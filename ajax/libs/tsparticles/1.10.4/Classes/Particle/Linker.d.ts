import { Particle } from "../Particle";
import { Container } from "../Container";
export declare class Linker {
    private readonly container;
    private readonly particle;
    constructor(container: Container, particle: Particle);
    link(p2: Particle): void;
}
