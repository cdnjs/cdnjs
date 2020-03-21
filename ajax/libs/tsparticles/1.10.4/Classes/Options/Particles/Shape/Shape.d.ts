import { IShape } from "../../../../Interfaces/Options/Particles/Shape/IShape";
import { ShapeType } from "../../../../Enums/ShapeType";
import { IImageShape } from "../../../../Interfaces/Options/Particles/Shape/IImageShape";
import { ICharacterShape } from "../../../../Interfaces/Options/Particles/Shape/ICharacterShape";
import { IPolygonShape } from "../../../../Interfaces/Options/Particles/Shape/IPolygonShape";
import { IStroke } from "../../../../Interfaces/Options/Particles/Shape/IStroke";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Shape implements IShape {
    /**
     * @deprecated the property images is deprecated, please use the image property, it works with one and many
     */
    get images(): IImageShape[];
    /**
     * @deprecated the property images is deprecated, please use the image property, it works with one and many
     */
    set images(value: IImageShape[]);
    character: ICharacterShape | ICharacterShape[];
    image: IImageShape | IImageShape[];
    polygon: IPolygonShape;
    stroke: IStroke;
    type: ShapeType | ShapeType[];
    constructor();
    load(data?: RecursivePartial<IShape>): void;
}
