import { Container } from "../Container";
import { Particle } from "../Particle";
/**
 * Particle bubble manager
 */
export declare class Bubbler {
    opacity?: number;
    radius?: number;
    private readonly particle;
    private readonly container;
    constructor(container: Container, particle: Particle);
    bubble(): void;
    private init;
    private process;
    private clickBubble;
    private hoverBubble;
    private hoverBubbleSize;
    private hoverBubbleOpacity;
}
