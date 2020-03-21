import { Container } from "./Container";
import { IMouseData } from "../Interfaces/IMouseData";
import { IRgb } from "../Interfaces/IRgb";
import { Particle } from "./Particle";
/**
 * Particles manager
 */
export declare class Particles {
    array: Particle[];
    pushing?: boolean;
    lineLinkedColor?: IRgb | string | null;
    private readonly container;
    private interactionsEnabled;
    constructor(container: Container);
    init(): void;
    update(delta: number): void;
    draw(delta: number): void;
    clear(): void;
    push(nb: number, mousePosition?: IMouseData): void;
    remove(nb: number): void;
}
