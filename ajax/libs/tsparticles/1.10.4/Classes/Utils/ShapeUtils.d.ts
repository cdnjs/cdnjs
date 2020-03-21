import { Particle } from "../Particle";
import { IStroke } from "../../Interfaces/Options/Particles/Shape/IStroke";
export declare class ShapeUtils {
    static drawShape(context: CanvasRenderingContext2D, particle: Particle, radius: number, stroke: IStroke): void;
    private static drawTriangleShape;
    private static drawPolygonShape;
    private static drawStarShape;
    private static drawLineShape;
    private static drawCircleShape;
    private static drawSquareShape;
    private static drawHeartShape;
    private static drawTextShape;
    private static drawGenericPolygonShape;
    private static drawImageShape;
}
