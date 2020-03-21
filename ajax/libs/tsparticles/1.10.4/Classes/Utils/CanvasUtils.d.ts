import { IDimension } from "../../Interfaces/IDimension";
import { ICoordinates } from "../../Interfaces/ICoordinates";
import { IRgb } from "../../Interfaces/IRgb";
import { Particle } from "../Particle";
import { IStroke } from "../../Interfaces/Options/Particles/Shape/IStroke";
import { ILineLinkedShadow } from "../../Interfaces/Options/Particles/ILineLinkedShadow";
import { IPolygonMaskDrawStroke } from "../../Interfaces/Options/PolygonMask/IPolygonMaskDrawStroke";
export declare class CanvasUtils {
    static paintBase(context: CanvasRenderingContext2D, dimension: IDimension, baseColor?: string): void;
    static clear(context: CanvasRenderingContext2D, dimension: IDimension): void;
    static drawPolygonMask(context: CanvasRenderingContext2D, rawData: ICoordinates[], stroke: IPolygonMaskDrawStroke): void;
    static drawLineLinked(context: CanvasRenderingContext2D, width: number, begin: ICoordinates, end: ICoordinates, backgroundMask: boolean, colorLine: IRgb, opacity: number, shadow: ILineLinkedShadow): void;
    static drawConnectLine(context: CanvasRenderingContext2D, width: number, lineStyle: CanvasGradient, begin: ICoordinates, end: ICoordinates): void;
    static gradient(context: CanvasRenderingContext2D, p1: Particle, p2: Particle, midColor: string): CanvasGradient | undefined;
    static drawGrabLine(context: CanvasRenderingContext2D, width: number, begin: ICoordinates, end: ICoordinates, colorLine: IRgb, opacity: number): void;
    static drawParticle(context: CanvasRenderingContext2D, particle: Particle, colorValue: string, backgroundMask: boolean, radius: number, stroke: IStroke): void;
}
