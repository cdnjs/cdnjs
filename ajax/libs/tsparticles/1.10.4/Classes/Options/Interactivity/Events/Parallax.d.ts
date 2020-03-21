import { IParallax } from "../../../../Interfaces/Options/Interactivity/Events/IParallax";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Parallax implements IParallax {
    enable: boolean;
    force: number;
    smooth: number;
    constructor();
    load(data?: RecursivePartial<IParallax>): void;
}
