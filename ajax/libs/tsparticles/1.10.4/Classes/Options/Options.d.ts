import { IOptions } from "../../Interfaces/Options/IOptions";
import { IInteractivity } from "../../Interfaces/Options/Interactivity/IInteractivity";
import { IParticles } from "../../Interfaces/Options/Particles/IParticles";
import { IPolygonMask } from "../../Interfaces/Options/PolygonMask/IPolygonMask";
import { IBackgroundMask } from "../../Interfaces/Options/BackgroundMask/IBackgroundMask";
import { RecursivePartial } from "../../Types/RecursivePartial";
export declare class Options implements IOptions {
    /**
     *
     * @deprecated this property is obsolete, please use the new fpsLimit
     */
    get fps_limit(): number;
    /**
     *
     * @deprecated this property is obsolete, please use the new fpsLimit
     * @param value
     */
    set fps_limit(value: number);
    /**
     *
     * @deprecated this property is obsolete, please use the new retinaDetect
     */
    get retina_detect(): boolean;
    /**
     *
     * @deprecated this property is obsolete, please use the new retinaDetect
     * @param value
     */
    set retina_detect(value: boolean);
    detectRetina: boolean;
    fpsLimit: number;
    interactivity: IInteractivity;
    particles: IParticles;
    polygon: IPolygonMask;
    backgroundMask: IBackgroundMask;
    pauseOnBlur: boolean;
    constructor();
    load(data: RecursivePartial<IOptions>): void;
}
