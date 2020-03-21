import { Bubbler } from "./Particle/Bubbler";
import { Container } from "./Container";
import { Drawer } from "./Particle/Drawer";
import { Grabber } from "./Particle/Grabber";
import { IVelocity } from "../Interfaces/IVelocity";
import { ISize } from "../Interfaces/ISize";
import { IOpacity } from "../Interfaces/IOpacity";
import { ICoordinates } from "../Interfaces/ICoordinates";
import { IParticleImage } from "../Interfaces/IParticleImage";
import { Repulser } from "./Particle/Repulser";
import { ShapeType } from "../Enums/ShapeType";
import { Updater } from "./Particle/Updater";
import { Connecter } from "./Particle/Connecter";
import { IRgb } from "../Interfaces/IRgb";
import { InteractionManager } from "./Particle/InteractionManager";
import { RotateDirection } from "../Enums/RotateDirection";
import { ICharacterShape } from "../Interfaces/Options/Particles/Shape/ICharacterShape";
/**
 * The single particle object
 */
export declare class Particle {
    angle: number;
    rotateDirection: RotateDirection;
    radius: number;
    readonly text?: string;
    readonly size: ISize;
    readonly initialPosition?: ICoordinates;
    readonly position: ICoordinates;
    readonly offset: ICoordinates;
    readonly color: IRgb | undefined;
    readonly opacity: IOpacity;
    readonly velocity: IVelocity;
    readonly shape?: ShapeType;
    readonly image?: IParticleImage;
    readonly character?: ICharacterShape;
    readonly initialVelocity: IVelocity;
    readonly updater: Updater;
    readonly bubbler: Bubbler;
    readonly repulser: Repulser;
    readonly connecter: Connecter;
    readonly drawer: Drawer;
    readonly grabber: Grabber;
    readonly interactionManager: InteractionManager;
    readonly container: Container;
    constructor(container: Container, position?: ICoordinates);
    private static calculateVelocity;
    resetVelocity(): void;
    update(index: number, delta: number): void;
    interact(p2: Particle): void;
    draw(): void;
    isOverlapping(): {
        collisionFound: boolean;
        iterations: number;
    };
    checkOverlap(position?: ICoordinates): void;
    private calcPosition;
}
