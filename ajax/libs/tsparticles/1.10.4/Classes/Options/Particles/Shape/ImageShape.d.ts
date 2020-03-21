import { IImageShape } from "../../../../Interfaces/Options/Particles/Shape/IImageShape";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class ImageShape implements IImageShape {
    /**
     *
     * @deprecated this property is obsolete, please use the new replaceColor
     */
    get replace_color(): boolean;
    /**
     *
     * @deprecated this property is obsolete, please use the new replaceColor
     * @param value
     */
    set replace_color(value: boolean);
    height: number;
    replaceColor: boolean;
    src: string;
    width: number;
    constructor();
    load(data?: RecursivePartial<IImageShape>): void;
}
