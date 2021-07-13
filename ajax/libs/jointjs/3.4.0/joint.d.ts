/*! JointJS v3.4.0 (2021-07-13) - JavaScript diagramming library


This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
// Definitions by:
// Aidan Reel <http://github.com/areel>,
// David Durman <http://github.com/DavidDurman>,
// Ewout Van Gossum <https://github.com/DenEwout>,
// Federico Caselli <https://github.com/CaselIT>,
// Chris Moran <https://github.com/ChrisMoran>
// Michael MacFadden https://github.com/mmacfadden

// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// typings: https://github.com/CaselIT/typings-jointjs

/// <reference types="backbone" />

import * as Backbone from "backbone";

export as namespace joint;

export namespace g {

    export interface PlainPoint {

        x: number;
        y: number;
    }

    export interface PlainRect {

        x: number;
        y: number;
        width: number;
        height: number;
    }

    export interface Scale {

        sx: number;
        sy: number;
    }

    export interface PrecisionOpt {

        precision?: number;
    }

    export interface SubdivisionsOpt extends PrecisionOpt {

        subdivisions?: Curve[];
    }

    export interface SegmentSubdivisionsOpt extends PrecisionOpt {

        segmentSubdivisions?: Curve[][];
    }

    export interface PathT {

        segmentIndex: number;
        value: number;
    }

    export interface Segment {

        type: SegmentType;

        isSegment: boolean;
        isSubpathStart: boolean;
        isVisible: boolean;

        nextSegment: Segment | null;
        previousSegment: Segment | null;
        subpathStartSegment: Segment | null;

        start: Point | null | never; // getter, `never` for Moveto
        end: Point | null; // getter or directly assigned

        bbox(): Rect | null;

        clone(): Segment;

        closestPoint(p: Point, opt?: SubdivisionsOpt): Point;

        closestPointLength(p: Point, opt?: SubdivisionsOpt): number;

        closestPointNormalizedLength(p: Point, opt?: SubdivisionsOpt): number;

        closestPointT(p: Point): number;

        closestPointTangent(p: Point): Line | null;

        divideAt(ratio: number, opt?: SubdivisionsOpt): [Segment, Segment];

        divideAtLength(length: number, opt?: SubdivisionsOpt): [Segment, Segment];

        divideAtT(t: number): [Segment, Segment];

        equals(segment: Segment): boolean;

        getSubdivisions(): Curve[];

        isDifferentiable(): boolean;

        length(): number;

        lengthAtT(t: number, opt?: PrecisionOpt): number;

        pointAt(ratio: number): Point;

        pointAtLength(length: number): Point;

        pointAtT(t: number): Point;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint): this;

        tangentAt(ratio: number): Line | null;

        tangentAtLength(length: number): Line | null;

        tangentAtT(t: number): Line | null;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        serialize(): string;

        toString(): string;
    }

    export interface SegmentTypes {

        [key: string]: Segment;
    }

    type CardinalDirection = 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' | 'N';

    type RectangleSide = 'left' | 'right' | 'top' | 'bottom';

    type PathSegmentUnit = Segment | Segment[];

    type PathObjectUnit = Line | Line[] | Curve | Curve[];

    type SegmentType = 'L' | 'C' | 'M' | 'Z' | 'z';

    export function normalizeAngle(angle: number): number;

    export function snapToGrid(val: number, gridSize: number): number;

    export function toDeg(rad: number): number;

    export function toRad(deg: number, over360?: boolean): number;

    export function random(min?: number, max?: number): number;

    class Curve {

        start: Point;
        controlPoint1: Point;
        controlPoint2: Point;
        end: Point;

        constructor(p1: PlainPoint | string, p2: PlainPoint | string, p3: PlainPoint | string, p4: PlainPoint | string);
        constructor(curve: Curve);

        bbox(): Rect;

        clone(): Curve;

        closestPoint(p: PlainPoint, opt?: SubdivisionsOpt): Point;

        closestPointLength(p: PlainPoint, opt?: SubdivisionsOpt): number;

        closestPointNormalizedLength(p: PlainPoint, opt?: SubdivisionsOpt): number;

        closestPointT(p: PlainPoint, opt?: SubdivisionsOpt): number;

        closestPointTangent(p: PlainPoint, opt?: SubdivisionsOpt): Line | null;

        containsPoint(p: PlainPoint, opt?: SubdivisionsOpt): boolean;

        divideAt(ratio: number, opt?: SubdivisionsOpt): [Curve, Curve];

        divideAtLength(length: number, opt?: SubdivisionsOpt): [Curve, Curve];

        divideAtT(t: number): [Curve, Curve];
        divide(t: number): [Curve, Curve]; // alias to `divideAtT`

        endpointDistance(): number;

        equals(c: Curve): boolean;

        getSkeletonPoints(t: number): [Point, Point, Point, Point, Point];

        getSubdivisions(opt?: PrecisionOpt): Curve[];

        isDifferentiable(): boolean;

        length(opt?: SubdivisionsOpt): number;

        lengthAtT(t: number, opt?: PrecisionOpt): number;

        pointAt(ratio: number, opt?: SubdivisionsOpt): Point;

        pointAtLength(length: number, opt?: SubdivisionsOpt): Point;

        pointAtT(t: number): Point;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint | string): this;

        tangentAt(ratio: number, opt?: SubdivisionsOpt): Line | null;

        tangentAtLength(length: number, opt?: SubdivisionsOpt): Line | null;

        tangentAtT(t: number): Line | null;

        tAt(ratio: number, opt?: SubdivisionsOpt): number;

        tAtLength(length: number, opt?: SubdivisionsOpt): number;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        toPoints(opt?: SubdivisionsOpt): Point[];

        toPolyline(opt?: SubdivisionsOpt): Polyline;

        toString(): string;

        static throughPoints(points: PlainPoint[]): Curve[];
    }

    class Ellipse {

        x: number;
        y: number;
        a: number;
        b: number;

        constructor(center: PlainPoint | string, a: number, b: number);
        constructor(ellipse: Ellipse);

        bbox(): Rect;

        center(): Point;

        clone(): Ellipse;

        containsPoint(p: PlainPoint): boolean;

        equals(ellipse: Ellipse): boolean;

        inflate(dx?: number, dy?: number): this;

        intersectionWithLine(l: Line): Point[] | null;

        intersectionWithLineFromCenterToPoint(p: PlainPoint, angle?: number): Point;

        normalizedDistance(point: PlainPoint): number;

        round(precision?: number): this;

        tangentTheta(p: PlainPoint): number;

        toString(): string;

        static fromRect(rect: PlainRect): Ellipse;
    }

    class Line {

        start: Point;
        end: Point;

        constructor(p1: PlainPoint | string, p2: PlainPoint | string);
        constructor(line: Line);
        constructor();

        angle(): number;

        bbox(): Rect;

        bearing(): CardinalDirection;

        clone(): Line;

        parallel(): Line;

        closestPoint(p: PlainPoint | string): Point;

        closestPointLength(p: PlainPoint | string): number;

        closestPointNormalizedLength(p: PlainPoint | string): number;

        closestPointTangent(p: PlainPoint | string): Line | null;

        containsPoint(p: PlainPoint): boolean;

        divideAt(t: number): [Line, Line];

        divideAtLength(length: number): [Line, Line];

        equals(line: Line): boolean;

        intersect(line: Line): Point | null; // Backwards compatibility, should return an array
        intersect(rect: Rect): Point[] | null;
        intersect(ellipse: Ellipse): Point[] | null;
        intersect(polyline: Polyline): Point[] | null;
        intersect(path: Path, opt?: SegmentSubdivisionsOpt): Point[] | null;

        intersectionWithLine(l: Line): Point[] | null;

        isDifferentiable(): boolean;

        length(): number;

        midpoint(): Point;

        pointAt(t: number): Point;

        pointAtLength(length: number): Point;

        pointOffset(p: PlainPoint | string): number;

        rotate(origin: PlainPoint, angle: number): this;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint): this;

        setLength(length: number): this;

        squaredLength(): number;

        tangentAt(t: number): Line | null;

        tangentAtLength(length: number): Line | null;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        vector(): Point;

        toString(): string;

        serialize(): string;
    }

    class Path {

        segments: Segment[];

        start: Point | null; // getter
        end: Point | null; // getter

        constructor();
        constructor(pathData: string);
        constructor(segments: PathSegmentUnit | PathSegmentUnit[]);
        constructor(objects: PathObjectUnit | PathObjectUnit[]);
        constructor(polyline: Polyline);

        appendSegment(segments: PathSegmentUnit | PathSegmentUnit[]): void;

        bbox(): Rect | null;

        clone(): Path;

        closestPoint(p: Point, opt?: SegmentSubdivisionsOpt): Point | null;

        closestPointLength(p: Point, opt?: SegmentSubdivisionsOpt): number;

        closestPointNormalizedLength(p: Point, opt?: SegmentSubdivisionsOpt): number;

        closestPointTangent(p: Point, opt?: SegmentSubdivisionsOpt): Line | null;

        containsPoint(p: PlainPoint, opt?: SegmentSubdivisionsOpt): boolean;

        divideAt(ratio: number, opt?: SegmentSubdivisionsOpt): [Path, Path] | null;

        divideAtLength(length: number, opt?: SegmentSubdivisionsOpt): [Path, Path] | null;

        equals(p: Path): boolean;

        getSegment(index: number): Segment | null;

        getSegmentSubdivisions(opt?: PrecisionOpt): Curve[][];

        getSubpaths(): Path[];

        insertSegment(index: number, segments: PathSegmentUnit | PathSegmentUnit[]): void;

        intersectionWithLine(l: Line, opt?: SegmentSubdivisionsOpt): Point[] | null;

        isDifferentiable(): boolean;

        isValid(): boolean;

        length(opt?: SegmentSubdivisionsOpt): number;

        pointAt(ratio: number, opt?: SegmentSubdivisionsOpt): Point | null;

        pointAtLength(length: number, opt?: SegmentSubdivisionsOpt): Point | null;

        removeSegment(index: number): void;

        replaceSegment(index: number, segments: PathSegmentUnit | PathSegmentUnit[]): void;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint | string): this;

        segmentAt(ratio: number, opt?: SegmentSubdivisionsOpt): Segment | null;

        segmentAtLength(length: number, opt?: SegmentSubdivisionsOpt): Segment | null;

        segmentIndexAt(ratio: number, opt?: SegmentSubdivisionsOpt): number | null;

        segmentIndexAtLength(length: number, opt?: SegmentSubdivisionsOpt): number | null;

        tangentAt(ratio: number, opt?: SegmentSubdivisionsOpt): Line | null;

        tangentAtLength(length: number, opt?: SegmentSubdivisionsOpt): Line | null;

        toPoints(opt?: SegmentSubdivisionsOpt): Point[][] | null;

        toPolylines(opt?: SegmentSubdivisionsOpt): Polyline[] | null;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        serialize(): string;

        toString(): string;

        validate(): this;

        private closestPointT(p: Point, opt?: SegmentSubdivisionsOpt): PathT | null;

        private lengthAtT(t: PathT, opt?: SegmentSubdivisionsOpt): number;

        private pointAtT(t: PathT): Point | null;

        private tangentAtT(t: PathT): Line | null;

        private prepareSegment(segment: Segment, previousSegment?: Segment | null, nextSegment?: Segment | null): Segment;

        private updateSubpathStartSegment(segment: Segment): void;

        static createSegment(type: SegmentType, ...args: any[]): PathSegmentUnit;

        static parse(pathData: string): Path;

        static segmentTypes: SegmentTypes;

        static isDataSupported(pathData: string): boolean;
    }

    class Point implements PlainPoint {

        x: number;
        y: number;

        constructor(x?: number, y?: number);
        constructor(p: PlainPoint | string);

        chooseClosest(points: PlainPoint[]): Point | null;

        adhereToRect(r: Rect): this;

        angleBetween(p1: PlainPoint, p2: PlainPoint) : number;

        bearing(p: Point): CardinalDirection;

        changeInAngle(dx: number, dy: number, ref: PlainPoint | string): number;

        clone(): Point;

        cross(p1: PlainPoint, p2: PlainPoint) : number;

        difference(dx?: number, dy?: number): Point;
        difference(p: PlainPoint): Point;

        distance(p: PlainPoint | string): number;

        dot(p: PlainPoint): number;

        equals(p: Point): boolean;

        lerp(p: Point, t: number): Point;

        magnitude(): number;

        manhattanDistance(p: PlainPoint): number;

        move(ref: PlainPoint | string, distance: number): this;

        normalize(length: number): this;

        offset(dx?: number, dy?: number): this;
        offset(p: PlainPoint): this;

        reflection(ref: PlainPoint | string): Point;

        rotate(origin: PlainPoint | string, angle: number): this;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint | string): this;

        snapToGrid(gx: number, gy?: number): this;

        squaredDistance(p: PlainPoint | string): number;

        theta(p: PlainPoint | string): number;

        toJSON(): PlainPoint;

        toPolar(origin?: PlainPoint | string): this;

        toString(): string;

        serialize(): string;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        update(x?: number, y?: number): this;
        update(p: PlainPoint): this;

        vectorAngle(p: PlainPoint) : number;

        static fromPolar(distance: number, angle: number, origin?: PlainPoint | string): Point;

        static random(x1: number, x2: number, y1: number, y2: number): Point;
    }

    class Polyline {

        points: Point[];

        start: Point | null; // getter
        end: Point | null; // getter

        constructor();
        constructor(svgString: string);
        constructor(points: PlainPoint[]);

        bbox(): Rect | null;

        clone(): Polyline;

        closestPoint(p: PlainPoint | string): Point | null;

        closestPointLength(p: PlainPoint | string): number;

        closestPointNormalizedLength(p: PlainPoint | string): number;

        closestPointTangent(p: PlainPoint | string): Line | null;

        containsPoint(p: PlainPoint): boolean;

        convexHull(): Polyline;

        equals(p: Polyline): boolean;

        isDifferentiable(): boolean;

        intersectionWithLine(l: Line): Point[] | null;

        length(): number;

        pointAt(ratio: number): Point | null;

        pointAtLength(length: number): Point | null;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint | string): this;

        simplify(opt?: { threshold?: number }): this;

        tangentAt(ratio: number): Line | null;

        tangentAtLength(length: number): Line | null;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        serialize(): string;

        toString(): string;

        static parse(svgString: string): Polyline;
    }

    class Rect implements PlainRect {

        x: number;
        y: number;
        width: number;
        height: number;

        constructor(x?: number, y?: number, width?: number, height?: number);
        constructor(r: PlainRect);

        bbox(angle?: number): Rect;

        bottomLeft(): Point;

        bottomLine(): Line;

        bottomMiddle(): Point;

        bottomRight(): Point;

        center(): Point;

        clone(): Rect;

        containsPoint(p: PlainPoint | string): boolean;

        containsRect(r: PlainRect): boolean;

        corner(): Point;

        equals(r: PlainRect): boolean;

        inflate(dx?: number, dy?: number): this;

        intersect(r: Rect): Rect | null;

        intersectionWithLine(l: Line): Point[] | null;

        intersectionWithLineFromCenterToPoint(p: PlainPoint | string, angle?: number): Point;

        leftLine(): Line;

        leftMiddle(): Point;

        maxRectScaleToFit(rect: PlainRect, origin?: PlainPoint): Scale;

        maxRectUniformScaleToFit(rect: PlainRect, origin?: PlainPoint): number;

        moveAndExpand(r: PlainRect): this;

        normalize(): this;

        offset(dx?: number, dy?: number): this;
        offset(p: PlainPoint): this;

        origin(): Point;

        pointNearestToPoint(point: PlainPoint | string): Point;

        rightLine(): Line;

        rightMiddle(): Point;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint | string): this;

        sideNearestToPoint(point: PlainPoint | string): RectangleSide;

        snapToGrid(gx: number, gy?: number): this;

        topLeft(): Point;

        topLine(): Line;

        topMiddle(): Point;

        topRight(): Point;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        toJSON(): PlainRect;

        toString(): string;

        union(rect: PlainRect): Rect;

        update(x?: number, y?: number, width?: number, height?: number): this;
        update(rect: PlainRect): this;

        static fromEllipse(e: Ellipse): Rect;

        static fromPointUnion(...points: PlainPoint[]): Rect | null;

        static fromRectUnion(...rects: PlainRect[]): Rect | null;
    }

    namespace bezier {

        interface IBezierCurve {
            p0: Point;
            p1: Point;
            p2: Point;
            p3: Point;
        }

        export function curveThroughPoints(points: PlainPoint[] | Point[]): string[];

        export function getCurveControlPoints(points: PlainPoint[] | Point[]): [Point[], Point[]];

        export function getCurveDivider(
            p0: string | PlainPoint,
            p1: string | PlainPoint,
            p2: string | PlainPoint,
            p3: string | PlainPoint
        ): (t: number) => [IBezierCurve, IBezierCurve];

        export function getFirstControlPoints(rhs: number[]): number[];

        export function getInversionSolver(
            p0: PlainPoint,
            p1: PlainPoint,
            p2: PlainPoint,
            p3: PlainPoint
        ): (p: PlainPoint) => number;
    }

    namespace scale {

        export function linear(domain: [number, number], range: [number, number], value: number): number;
    }
}

export function V(
    svg: SVGElement | Vectorizer | string,
    attrs?: { [key: string]: any },
    children?: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]
): Vectorizer;

export namespace Vectorizer {

    interface RotateOptions {
        absolute?: boolean;
    }

    interface AnnotateStringOptions {
        includeAnnotationIndices?: boolean;
        offset?: number;
    }

    type TextVerticalAnchor = 'top' | 'bottom' | 'middle';

    interface TextOptions {
        eol?: string;
        x?: number | string;
        textVerticalAnchor?: TextVerticalAnchor | number | string;
        lineHeight?: number | string;
        textPath?: string | { [key: string]: any };
        annotations?: TextAnnotation[];
        includeAnnotationIndices?: boolean;
        displayEmpty?: boolean;
    }

    interface GetBBoxOptions {
        target?: SVGElement | Vectorizer;
        recursive?: boolean;
    }

    interface TransformOptions {
        absolute?: boolean;
    }

    interface ParseXMLOptions {
        async?: boolean;
    }

    interface TextAnnotation {
        start: number;
        end: number;
        attrs: { [key: string]: any };
    }

    // modifiable Matrix. SVGMatrix doesn't allow set on properties or a constructor.
    interface Matrix {
        a: number;
        b: number;
        c: number;
        d: number;
        e: number;
        f: number;
    }

    interface Sample {
        x: number;
        y: number;
        distance: number;
    }

    interface DecomposedTransformation {
        translateX: number;
        translateY: number;
        scaleX: number;
        scaleY: number;
        skewX: number;
        skewY: number;
        rotation: number;
    }

    interface RoundedRect extends g.PlainRect {
        'rx'?: number;
        'ry'?: number;
        'top-rx'?: number;
        'top-ry'?: number;
        'bottom-rx'?: number;
        'bottom-ry'?: number;
    }

    interface Rotation {
        angle: number;
        cx?: number;
        cy?: number;
    }

    interface Translation {
        tx: number;
        ty: number;
    }

    interface Scale {
        sx: number;
        sy: number;
    }

    interface Transform {
        value: string;
        translate: Translation;
        rotate: Rotation;
        scale: Scale;
    }

    interface QualifiedAttribute {
        ns: string | null;
        local: string;
    }
}

export class Vectorizer {

    id: string;
    node: SVGElement;

    constructor(
        el: string | SVGElement,
        attrs?: { [key: string]: any },
        children?: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]
    );

    getTransformToElement(toElem: SVGGElement | Vectorizer): SVGMatrix;

    transform(): SVGMatrix;
    transform(matrix: SVGMatrix | Vectorizer.Matrix, opt?: Vectorizer.TransformOptions): this;

    translate(): Vectorizer.Translation;
    translate(tx: number, ty?: number, opt?: Vectorizer.TransformOptions): this;

    rotate(): Vectorizer.Rotation;
    rotate(angle: number, cx?: number, cy?: number, opt?: Vectorizer.RotateOptions): this;

    scale(): Vectorizer.Scale;
    scale(sx: number, sy?: number): this;

    bbox(withoutTransformations?: boolean, target?: SVGElement | Vectorizer): g.Rect;

    getBBox(opt?: Vectorizer.GetBBoxOptions) : g.Rect;

    text(content: string, opt?: Vectorizer.TextOptions): this;

    removeAttr(name: string): this;

    attr(): { [key: string]: string };
    attr(name: string): string | null;
    attr(name: string, value: any): this;
    attr(attrs: { [key: string]: any }): this;

    normalizePath(): this;

    remove(): this;

    empty(): this;

    append(els: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]): this;

    prepend(els: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]): this;

    before(els: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]): this;

    appendTo(el: SVGElement | Vectorizer) : this;

    parent(): Vectorizer | null;

    // returns either this or Vectorizer, no point in specifying this.
    svg(): Vectorizer;

    tagName(): string;

    defs(): Vectorizer | undefined;

    clone(): Vectorizer;

    findOne(selector: string): Vectorizer | undefined;

    find(selector: string): Vectorizer[];

    children(): Vectorizer[];

    index(): number;

    findParentByClass(className: string, terminator?: SVGElement): Vectorizer | null;

    contains(el: SVGElement | Vectorizer): boolean;

    toLocalPoint(x: number, y: number): SVGPoint;

    translateCenterToPoint(p: g.PlainPoint): this;

    translateAndAutoOrient(position: g.PlainPoint, reference: g.PlainPoint, target?: SVGElement | Vectorizer): this;

    animateAlongPath(attrs: { [key: string]: any }, path: SVGElement | Vectorizer): void;

    hasClass(className: string): boolean;

    addClass(className: string): Vectorizer;

    removeClass(className: string): this;

    toggleClass(className: string, switchArg?: boolean): this;

    sample(interval?: number): Vectorizer.Sample[];

    convertToPath(): Vectorizer;

    convertToPathData(): string;

    findIntersection(ref: g.PlainPoint, target: SVGElement | Vectorizer): g.PlainPoint | undefined;

    private setAttributes(attrs: { [key: string]: any }): this;

    private setAttribute(name: string, value: string): this;

    static createSVGDocument(content: string): Document;

    static createSVGStyle(stylesheet: string): SVGStyleElement;

    static createCDATASection(data: string): CDATASection;

    static uniqueId(): string;

    static ensureId(node: SVGElement | Vectorizer): string;

    static sanitizeText(text: string): string;

    static isUndefined(value: any): boolean;

    static isString(value: any): boolean;

    static isObject(value: any): boolean;

    static isArray(value: any): boolean;

    static parseXML(data: string, opt?: Vectorizer.ParseXMLOptions): XMLDocument;

    static qualifyAttr(name: string): Vectorizer.QualifiedAttribute;

    static transformStringToMatrix(transform: string): SVGMatrix;

    static matrixToTransformString(matrix: SVGMatrix | Vectorizer.Matrix): string;

    static parseTransformString(transform: string): Vectorizer.Transform;

    static deltaTransformPoint(matrix: SVGMatrix | Vectorizer.Matrix, point: SVGPoint | g.PlainPoint): g.PlainPoint;

    static decomposeMatrix(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.DecomposedTransformation;

    static matrixToScale(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.Scale;

    static matrixToRotate(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.Rotation;

    static matrixToTranslate(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.Translation;

    static isV(value: any): boolean;

    static isVElement(value: any): boolean;

    static isSVGGraphicsElement(value: any): boolean;

    static createSVGMatrix(matrix: SVGMatrix | Vectorizer.Matrix): SVGMatrix;

    static createSVGTransform(matrix?: SVGMatrix | Vectorizer.Matrix): SVGTransform;

    static createSVGPoint(x: number, y: number): SVGPoint;

    static transformRect(r: g.PlainRect, matrix: SVGMatrix): g.Rect;

    static transformPoint(p: g.PlainPoint, matrix: SVGMatrix): g.Point;

    static transformLine(p: g.Line, matrix: SVGMatrix): g.Line;

    static transformPolyline(p: g.Polyline | g.PlainPoint[], matrix: SVGMatrix): g.Polyline;

    static styleToObject(styleString: string): { [key: string]: string };

    static createSlicePathData(innerRadius: number, outRadius: number, startAngle: number, endAngle: number): string;

    static mergeAttrs(a: any, b: any): any;

    static annotateString(t: string, annotations: Vectorizer.TextAnnotation[], opt?: Vectorizer.AnnotateStringOptions): Array< string | { [key: string]: any }> ;

    static findAnnotationsAtIndex(annotations: Vectorizer.TextAnnotation[], index: number): Vectorizer.TextAnnotation[];

    static findAnnotationsBetweenIndexes(annotations: Vectorizer.TextAnnotation[], start: number, end: number): Vectorizer.TextAnnotation[];

    static shiftAnnotations(annotations: Vectorizer.TextAnnotation[], index: number, offset: number): Vectorizer.TextAnnotation[];

    static convertLineToPathData(line: string | SVGElement | Vectorizer): string;

    static convertPolygonToPathData(line: string | SVGElement | Vectorizer): string;

    static convertPolylineToPathData(line: string | SVGElement | Vectorizer): string;

    static svgPointsToPath(points: g.PlainPoint[] | SVGPoint[]): string;

    static getPointsFromSvgNode(node: SVGElement | Vectorizer): SVGPoint[];

    static convertCircleToPathData(circle: string | SVGElement | Vectorizer): string;

    static convertEllipseToPathData(ellipse: string | SVGElement | Vectorizer): string;

    static convertRectToPathData(rect: string | SVGElement | Vectorizer): string;

    static rectToPath(r: Vectorizer.RoundedRect): string;

    static normalizePathData(path: string): string;

    static toNode(el: SVGElement | Vectorizer | SVGElement[]): SVGElement;
}

export const version: string;

export namespace config {
    var useCSSSelectors: boolean;
    var classNamePrefix: string;
    var defaultTheme: string;
}

export namespace dia {

    type Event = JQuery.TriggeredEvent;

    type Point = g.PlainPoint;

    type BBox = g.PlainRect;

    type Size = Pick<BBox, 'width' | 'height'>;

    type PaddingJSON = {
        left?: number;
        top?: number;
        right?: number;
        bottom?: number;
    };

    type Padding = number | PaddingJSON;

    type SidesJSON = {
        left?: number;
        top?: number;
        right?: number;
        bottom?: number;
        horizontal?: number;
        vertical?: number;
    }

    type Sides = number | SidesJSON;

    type OrthogonalDirection =
        'left' | 'top' | 'right' | 'bottom';

    type Direction =
        OrthogonalDirection |
        'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';

    type LinkEnd =
        'source' | 'target';

    type MarkupNodeJSON = {
        tagName: string;
        selector?: string;
        groupSelector?: string;
        namespaceUri?: string;
        className?: string;
        attributes?: attributes.NativeSVGAttributes;
        style?: { [key: string]: any };
        children?: MarkupJSON;
        textContent?: string;
    }

    type MarkupJSON = MarkupNodeJSON[];

    type Path = string | Array<string | number>;

    export namespace Graph {

        interface Options {
            [key: string]: any;
        }

        interface ConnectionOptions extends Cell.EmbeddableOptions {
            inbound?: boolean;
            outbound?: boolean;
        }

        interface ExploreOptions extends ConnectionOptions {
            breadthFirst?: boolean;
        }
    }

    class Graph extends Backbone.Model {

        constructor(attributes?: any, opt?: { cellNamespace?: any, cellModel?: typeof Cell });

        addCell(cell: Cell | Cell[], opt?: { [key: string]: any }): this;

        addCells(cells: Cell[], opt?: { [key: string]: any }): this;

        resetCells(cells: Cell[], opt?: { [key: string]: any }): this;

        getCell(id: string | number | Cell): Cell;

        getElements(): Element[];

        getLinks(): Link[];

        getCells(): Cell[];

        getFirstCell(): Cell | undefined;

        getLastCell(): Cell | undefined;

        getConnectedLinks(cell: Cell, opt?: Graph.ConnectionOptions): Link[];

        disconnectLinks(cell: Cell, opt?: { [key: string]: any }): void;

        removeLinks(cell: Cell, opt?: { [key: string]: any }): void;

        translate(tx: number, ty?: number, opt?: Element.TranslateOptions): this;

        cloneCells(cells: Cell[]): { [id: string]: Cell };

        getSubgraph(cells: Cell[], opt?: Cell.EmbeddableOptions): Cell[];

        cloneSubgraph(cells: Cell[], opt?: Cell.EmbeddableOptions): { [id: string]: Cell };

        dfs(element: Element, iteratee: (element: Element, distance: number) => boolean, opt?: Graph.ConnectionOptions): void;

        bfs(element: Element, iteratee: (element: Element, distance: number) => boolean, opt?: Graph.ConnectionOptions): void;

        search(element: Element, iteratee: (element: Element, distance: number) => boolean, opt?: Graph.ExploreOptions): void;

        getSuccessors(element: Element, opt?: Graph.ExploreOptions): Element[];

        getPredecessors(element: Element, opt?: Graph.ExploreOptions): Element[];

        isSuccessor(elementA: Element, elementB: Element): boolean;

        isPredecessor(elementA: Element, elementB: Element): boolean;

        isSource(element: Element): boolean;

        isSink(element: Element): boolean;

        getSources(): Element[];

        getSinks(): Element[];

        getNeighbors(element: Element, opt?: Graph.ConnectionOptions): Element[];

        isNeighbor(elementA: Element, elementB: Element, opt?: Graph.ConnectionOptions): boolean;

        getCommonAncestor(...cells: Cell[]): Element | undefined;

        toJSON(): any;

        fromJSON(json: any, opt?: { [key: string]: any }): this;

        clear(opt?: { [key: string]: any }): this;

        findModelsFromPoint(p: Point): Element[];

        findModelsInArea(rect: BBox, opt?: { strict?: boolean }): Element[];

        findModelsUnderElement(element: Element, opt?: {
            searchBy?: 'bottomLeft' | 'bottomMiddle' | 'center' |
                'corner' | 'leftMiddle' | 'origin' | 'rightMiddle' |
                'topMiddle' | 'topRight' | 'bbox'
        }): Element[];

        getBBox(): g.Rect | null;

        getCellsBBox(cells: Cell[], opt?: Cell.EmbeddableOptions): g.Rect | null;

        hasActiveBatch(name?: string | string[]): boolean;

        maxZIndex(): number;

        minZIndex(): number;

        removeCells(cells: Cell[], opt?: Cell.DisconnectableOptions): this;

        resize(width: number, height: number, opt?: { [key: string]: any }): this;

        resizeCells(width: number, height: number, cells: Cell[], opt?: { [key: string]: any }): this;

        startBatch(name: string, data?: { [key: string]: any }): this;

        stopBatch(name: string, data?: { [key: string]: any }): this;

        toGraphLib(opt?: { [key: string]: any }): any;

        fromGraphLib(glGraph: any, opt?: { [key: string]: any }): this;
    }

    // dia.Cell

    export namespace Cell {

        interface GenericAttributes<T> {
            attrs?: T;
            z?: number;
            [key: string]: any;
        }

        interface Selectors {
            [selector: string]: attributes.SVGAttributes | undefined;
        }

        interface Attributes extends GenericAttributes<Selectors> {
            [key: string]: any;
        }

        interface Constructor<T extends Backbone.Model> {
            new (opt?: { id?: string, [key: string]: any }): T;
            define(type: string, defaults?: any, protoProps?: any, staticProps?: any): dia.Cell.Constructor<T>;
        }

        interface Options {
            [key: string]: any;
        }

        interface EmbeddableOptions extends Options {
            deep?: boolean;
        }

        interface DisconnectableOptions extends Options {
            disconnectLinks?: boolean;
        }

        interface GetEmbeddedCellsOptions extends EmbeddableOptions {
            breadthFirst?: boolean;
        }

        interface TransitionOptions extends Options {
            delay?: number;
            duration?: number;
            timingFunction?: util.timing.TimingFunction;
            valueFunction?: util.interpolate.InterpolateFunction<any>;
        }
    }

    class Cell extends Backbone.Model {

        constructor(attributes?: Cell.Attributes, opt?: Graph.Options);

        id: string | number;
        graph: Graph;
        markup: string | MarkupJSON;

        protected generateId(): string | number;

        toJSON(): any;

        remove(opt?: Cell.DisconnectableOptions): this;

        toFront(opt?: Cell.GetEmbeddedCellsOptions): this;

        toBack(opt?: Cell.GetEmbeddedCellsOptions): this;

        parent(): string;
        parent(parentId: string): this;

        getParentCell(): Cell | null;

        getAncestors(): Cell[];

        getEmbeddedCells(opt?: Cell.GetEmbeddedCellsOptions): Cell[];

        isEmbeddedIn(cell: Cell, opt?: Cell.EmbeddableOptions): boolean;

        isEmbedded(): boolean;

        prop(key: Path): any;
        prop(object: Cell.Attributes, opt?: Cell.Options): this;
        prop(key: Path, value: any, opt?: Cell.Options): this;

        removeProp(path: Path, opt?: Cell.Options): this;

        attr(key?: Path): any;
        attr(object: Cell.Selectors, opt?: Cell.Options): this;
        attr(key: Path, value: any, opt?: Cell.Options): this;

        clone(): Cell;
        clone(opt: Cell.EmbeddableOptions): Cell | Cell[];

        removeAttr(path: Path, opt?: Cell.Options): this;

        transition(path: string, value?: any, opt?: Cell.TransitionOptions, delim?: string): number;

        getTransitions(): string[];

        stopTransitions(path?: string, delim?: string): this;

        embed(cell: Cell, opt?: Graph.Options): this;

        unembed(cell: Cell, opt?: Graph.Options): this;

        addTo(graph: Graph, opt?: Graph.Options): this;

        findView(paper: Paper): CellView;

        isLink(): boolean;

        isElement(): boolean;

        startBatch(name: string, opt?: Graph.Options): this;

        stopBatch(name: string, opt?: Graph.Options): this;

        angle(): number;

        getBBox(): g.Rect;

        getPointFromConnectedLink(link: dia.Link, endType: dia.LinkEnd): g.Point;

        getChangeFlag(attributes: { [key: string]: number }): number;

        static define(type: string, defaults?: any, protoProps?: any, staticProps?: any): Cell.Constructor<Cell>;

        /**
         * @deprecated
         */
        protected processPorts(): void;
    }

    // dia.Element

    export namespace Element {

        interface GenericAttributes<T> extends Cell.GenericAttributes<T> {
            markup?: string | MarkupJSON;
            position?: Point;
            size?: Size;
            angle?: number;
            ports?: {
                groups?: { [key: string]: PortGroup},
                items?: Port[]
            }
        }

        interface Attributes extends GenericAttributes<Cell.Selectors> {
            [key: string]: any
        }

        type PositionType = string | {
            name?: string,
            args?: { [key: string]: any }
        }

        interface PortGroup {
            position?: PositionType,
            markup?: string | MarkupJSON;
            attrs?: Cell.Selectors;
            label?: {
                markup?: string | MarkupJSON;
                position?: PositionType;
            }
        }

        interface Port {
            id?: string;
            markup?: string | MarkupJSON;
            group?: string;
            attrs?: Cell.Selectors;
            args?: { [key: string]: any };
            label?: {
                markup?: string | MarkupJSON;
                position?: PositionType;
            }
            z?: number | 'auto';
        }

        interface PortPosition extends Point {
            angle: number;
        }

        interface TranslateOptions {
            restrictedArea?: BBox;
            transition?: Cell.TransitionOptions;
        }
    }

    class Element extends Cell {

        constructor(attributes?: Element.Attributes, opt?: Graph.Options);

        isElement(): boolean;

        isLink(): boolean;

        translate(tx: number, ty?: number, opt?: Element.TranslateOptions): this;

        position(opt?: { parentRelative?: boolean, [key: string]: any }): g.Point;
        position(x: number, y: number, opt?: { parentRelative?: boolean, deep?: boolean, [key: string]: any }): this;

        size(): Size;
        size(width: number, height?: number, opt?: { direction?: Direction, [key: string]: any }): this;

        resize(width: number, height: number, opt?: { direction?: Direction, [key: string]: any }): this;

        rotate(deg: number, absolute?: boolean, origin?: Point, opt?: { [key: string]: any }): this;

        angle(): number;

        scale(scaleX: number, scaleY: number, origin?: Point, opt?: { [key: string]: any }): this;

        fitEmbeds(opt?: { deep?: boolean, padding?: Padding }): this;

        getBBox(opt?: Cell.EmbeddableOptions): g.Rect;

        addPort(port: Element.Port, opt?: Cell.Options): this;

        addPorts(ports: Element.Port[], opt?: Cell.Options): this;

        insertPort(before: number | string | Element.Port, port: Element.Port, opt?: Cell.Options): this;

        removePort(port: string | Element.Port, opt?: Cell.Options): this;

        removePorts(opt?: Cell.Options): this;
        removePorts(ports: Array<Element.Port|string>, opt?: Cell.Options): this;

        hasPorts(): boolean;

        hasPort(id: string): boolean;

        getPorts(): Element.Port[];

        getGroupPorts(groupName: string): Element.Port[];

        getPort(id: string): Element.Port;

        getPortsPositions(groupName: string): { [id: string]: Element.PortPosition };

        getPortIndex(port: string | Element.Port): number;

        portProp(portId: string, path: dia.Path): any;

        portProp(portId: string, path: dia.Path, value?: any, opt?: Cell.Options): Element;

        protected generatePortId(): string | number;

        static define(type: string, defaults?: any, protoProps?: any, staticProps?: any): Cell.Constructor<Element>;
    }

    // dia.Link

    export namespace Link {

        interface EndCellArgs {
            magnet?: string;
            selector?: string;
            port?: string;
            anchor?: anchors.AnchorJSON;
            connectionPoint?: connectionPoints.ConnectionPointJSON;
            priority?: boolean;
        }

        interface EndJSON extends EndCellArgs {
            id?: number | string;
            x?: number;
            y?: number;
        }

        interface GenericAttributes<T> extends Cell.GenericAttributes<T> {
            source?: EndJSON;
            target?: EndJSON;
            labels?: Label[];
            vertices?: Point[];
            manhattan?: boolean;
            router?: routers.Router | routers.RouterJSON;
            smooth?: boolean;
            connector?: connectors.Connector | connectors.ConnectorJSON;
        }

        interface LinkSelectors extends Cell.Selectors {
            '.connection'?: attributes.SVGPathAttributes;
            '.connection-wrap'?: attributes.SVGPathAttributes;
            '.marker-source'?: attributes.SVGPathAttributes;
            '.marker-target'?: attributes.SVGPathAttributes;
            '.labels'?: attributes.SVGAttributes;
            '.marker-vertices'?: attributes.SVGAttributes;
            '.marker-arrowheads'?: attributes.SVGAttributes;
            '.link-tools'?: attributes.SVGAttributes;
        }

        interface Attributes extends Cell.GenericAttributes<LinkSelectors> {
            [key: string]: any;
        }

        interface LabelPosition {
            distance?: number; // optional for default labels
            offset?: number | { x: number; y: number; };
            angle?: number;
            args?: LinkView.LabelOptions;
        }

        interface Label {
            markup?: string | MarkupJSON;
            position?: LabelPosition | number; // optional for default labels
            attrs?: Cell.Selectors;
            size?: Size;
        }

        interface Vertex extends Point {
            [key: string]: any;
        }
    }

    class Link extends Cell {

        toolMarkup: string;
        doubleToolMarkup?: string;
        vertexMarkup: string;
        arrowHeadMarkup: string;
        labelMarkup?: string | MarkupJSON; // default label markup
        labelProps?: Link.Label; // default label props

        constructor(attributes?: Link.Attributes, opt?: Graph.Options);

        isElement(): boolean;

        isLink(): boolean;

        disconnect(): this;

        source(): Link.EndJSON;
        source(source: Link.EndJSON, opt?: Cell.Options): this;
        source(source: Cell, args?: Link.EndCellArgs, opt?: Cell.Options): this;

        target(): Link.EndJSON;
        target(target: Link.EndJSON, opt?: Cell.Options): this;
        target(target: Cell, args?: Link.EndCellArgs, opt?: Cell.Options): this;

        router(): routers.Router | routers.RouterJSON | null;
        router(router: routers.Router | routers.RouterJSON, opt?: Cell.Options): this;
        router(name: routers.RouterType, args?: routers.RouterArguments, opt?: Cell.Options): this;

        connector(): connectors.Connector | connectors.ConnectorJSON | null;
        connector(connector: connectors.Connector | connectors.ConnectorJSON, opt?: Cell.Options): this;
        connector(name: connectors.ConnectorType, args?: connectors.ConnectorArguments, opt?: Cell.Options): this;

        label(index?: number): Link.Label;
        label(index: number, label: Link.Label, opt?: Cell.Options): this;

        labels(): Link.Label[];
        labels(labels: Link.Label[]): this;

        insertLabel(index: number, label: Link.Label, opt?: Cell.Options): Link.Label[];

        appendLabel(label: Link.Label, opt?: Cell.Options): Link.Label[];

        removeLabel(index?: number, opt?: Cell.Options): Link.Label[];

        vertex(index?: number): Link.Vertex;
        vertex(index: number, vertex: Link.Vertex, opt?: Cell.Options): this;

        vertices(): Link.Vertex[];
        vertices(vertices: Link.Vertex[]): this;

        insertVertex(index: number, vertex: Link.Vertex, opt?: Cell.Options): Link.Vertex[];

        removeVertex(index?: number, opt?: Cell.Options): Link.Vertex[];

        reparent(opt?: Cell.Options): Element;

        getSourceElement(): null | Element;

        getTargetElement(): null | Element;

        getSourceCell(): null | Cell;

        getTargetCell(): null | Cell;

        getPolyline(): g.Polyline;

        getSourcePoint(): g.Point;

        getTargetPoint(): g.Point;

        getBBox(): g.Rect;

        hasLoop(opt?: Cell.EmbeddableOptions): boolean;

        getRelationshipAncestor(): undefined | Element;

        isRelationshipEmbeddedIn(cell: Cell): boolean;

        applyToPoints(fn: (p: Point) => Point, opt?: Cell.Options): this;

        scale(sx: number, sy: number, origin?: Point, opt?: Cell.Options): this;

        translate(tx: number, ty: number, opt?: Cell.Options): this;

        static define(type: string, defaults?: any, protoProps?: any, staticProps?: any): Cell.Constructor<Link>;
    }

    // dia.CellView

    export namespace CellView {

        enum Highlighting {
            DEFAULT = 'default',
            EMBEDDING = 'embedding',
            CONNECTING = 'connecting',
            MAGNET_AVAILABILITY = 'magnetAvailability',
            ELEMENT_AVAILABILITY = 'elementAvailability'
        }

        interface Options<T extends Cell> extends mvc.ViewOptions<T> {
            id?: string
        }

        interface InteractivityOptions extends ElementView.InteractivityOptions, LinkView.InteractivityOptions {

        }

        type FlagLabel = string | string[];
        type PresentationAttributes = { [key: string]: FlagLabel };
    }

    abstract class CellViewGeneric<T extends Cell> extends mvc.View<T> {

        constructor(opt?: CellView.Options<T>);

        paper: Paper | null;

        initFlag: CellView.FlagLabel;

        presentationAttributes: CellView.PresentationAttributes;

        highlight(el?: SVGElement | JQuery | string, opt?: { [key: string]: any }): this;

        unhighlight(el?: SVGElement | JQuery | string, opt?: { [key: string]: any }): this;

        can(feature: string): boolean;

        findMagnet(el: SVGElement | JQuery | string): SVGElement | undefined;

        findBySelector(selector: string, root?: SVGElement | JQuery | string): JQuery;

        findProxyNode(el: SVGElement | null, type: string): SVGElement;

        getSelector(el: SVGElement, prevSelector?: string): string;

        notify(eventName: string, ...eventArguments: any[]): void;

        addTools(tools: dia.ToolsView): this;

        hasTools(name?: string): boolean;

        removeTools(): this;

        showTools(): this;

        hideTools(): this;

        updateTools(opt?: { [key: string]: any }): this;

        getNodeMatrix(node: SVGElement): SVGMatrix;

        getNodeBoundingRect(node: SVGElement): g.Rect;

        getBBox(opt?: { useModelGeometry?: boolean }): g.Rect;

        getNodeBBox(node: SVGElement): g.Rect;

        getNodeUnrotatedBBox(node: SVGElement): g.Rect;

        isNodeConnection(node: SVGElement): boolean;

        getEventTarget(evt: dia.Event, opt?: { fromPoint?: boolean }): Element;

        checkMouseleave(evt: dia.Event): void;

        getFlag(label: CellView.FlagLabel): number;

        requestUpdate(flags: number, opt?: { [key: string]: any }): void;

        protected removeHighlighters(): void;

        protected updateHighlighters(): void;

        protected transformHighlighters(): void;

        protected hasFlag(flags: number, label: CellView.FlagLabel): boolean;

        protected removeFlag(flags: number, label: CellView.FlagLabel): number;

        protected setFlags(): void;

        protected onToolEvent(eventName: string): void;

        protected pointerdblclick(evt: dia.Event, x: number, y: number): void;

        protected pointerclick(evt: dia.Event, x: number, y: number): void;

        protected contextmenu(evt: dia.Event, x: number, y: number): void;

        protected pointerdown(evt: dia.Event, x: number, y: number): void;

        protected pointermove(evt: dia.Event, x: number, y: number): void;

        protected pointerup(evt: dia.Event, x: number, y: number): void;

        protected mouseover(evt: dia.Event): void;

        protected mouseout(evt: dia.Event): void;

        protected mouseenter(evt: dia.Event): void;

        protected mouseleave(evt: dia.Event): void;

        protected mousewheel(evt: dia.Event, x: number, y: number, delta: number): void;

        protected onevent(evt: dia.Event, eventName: string, x: number, y: number): void;

        protected onmagnet(evt: dia.Event, x: number, y: number): void;

        static addPresentationAttributes(attributes: CellView.PresentationAttributes): CellView.PresentationAttributes;

        protected getLinkEnd(magnet: SVGElement, x: number, y: number, link: dia.Link, endType: dia.LinkEnd): dia.Link.EndJSON;

        protected customizeLinkEnd(end: dia.Link.EndJSON, magnet: SVGElement, x: number, y: number, link: dia.Link, endType: dia.LinkEnd): dia.Link.EndJSON;
    }

    class CellView extends CellViewGeneric<Cell> {

    }

    // dia.ElementView


    export namespace ElementView {

        enum Flags {
            UPDATE = 'UPDATE',
            TRANSLATE = 'TRANSLATE',
            TOOLS = 'TOOLS',
            RESIZE = 'RESIZE',
            PORTS = 'PORTS',
            ROTATE = 'ROTATE',
            RENDER = 'RENDER'
        }

        interface InteractivityOptions {
            elementMove?: boolean;
            addLinkFromMagnet?: boolean;
            stopDelegation?: boolean;
        }
    }

    class ElementView extends CellViewGeneric<Element> {

        update(element?: Element, renderingOnlyAttrs?: { [key: string]: any }): void;

        setInteractivity(value: boolean | ElementView.InteractivityOptions): void;

        getDelegatedView(): ElementView | null;

        findPortNode(portId: string | number, selector?: string): SVGElement | null;

        protected renderMarkup(): void;

        protected renderJSONMarkup(markup: MarkupJSON): void;

        protected renderStringMarkup(markup: string): void;

        protected dragStart(evt: dia.Event, x: number, y: number): void;

        protected dragMagnetStart(evt: dia.Event, x: number, y: number): void;

        protected drag(evt: dia.Event, x: number, y: number): void;

        protected dragMagnet(evt: dia.Event, x: number, y: number): void;

        protected dragEnd(evt: dia.Event, x: number, y: number): void;

        protected dragMagnetEnd(evt: dia.Event, x: number, y: number): void;

        protected dragLinkStart(evt: dia.Event, magnet: SVGElement, x: number, y: number): void;

        protected addLinkFromMagnet(magnet: SVGElement, x: number, y: number): LinkView;
    }

    // dia.LinkView


    export namespace LinkView {

        enum Flags {
            RENDER = 'RENDER',
            UPDATE = 'UPDATE',
            TOOLS = 'TOOLS',
            LEGACY_TOOLS = 'LEGACY_TOOLS',
            LABELS = 'LABELS',
            VERTICES = 'VERTICES',
            SOURCE = 'SOURCE',
            TARGET = 'TARGET',
        }

        interface InteractivityOptions {
            vertexAdd?: boolean,
            vertexMove?: boolean,
            vertexRemove?: boolean;
            arrowheadMove?: boolean;
            labelMove?: boolean;
            linkMove?: boolean;
            useLinkTools?: boolean;
        }

        interface GetConnectionPoint {
            (
                linkView: LinkView,
                view: ElementView,
                magnet: SVGElement,
                reference: Point,
                end: LinkEnd
            ): Point;
        }

        interface LabelOptions extends Cell.Options {
            absoluteDistance?: boolean;
            reverseDistance?: boolean;
            absoluteOffset?: boolean;
            keepGradient?: boolean;
            ensureLegibility?: boolean;
        }

        interface VertexOptions extends Cell.Options {

        }

        interface Options extends mvc.ViewOptions<Link> {
            shortLinkLength?: number,
            doubleLinkTools?: boolean,
            longLinkLength?: number,
            linkToolsOffset?: number,
            doubleLinkToolsOffset?: number,
            sampleInterval?: number
        }
    }

    class LinkView extends CellViewGeneric<Link> {

        options: LinkView.Options;

        sendToken(token: SVGElement, duration?: number, callback?: () => void): void;
        sendToken(token: SVGElement, opt?: { duration?: number, direction?: string; connection?: string }, callback?: () => void): void;

        addLabel(coordinates: Point, opt?: LinkView.LabelOptions): number;
        addLabel(coordinates: Point, angle: number, opt?: LinkView.LabelOptions): number;
        addLabel(x: number, y: number, opt?: LinkView.LabelOptions): number;
        addLabel(x: number, y: number, angle: number, opt?: LinkView.LabelOptions): number;

        addVertex(coordinates: Point, opt?: LinkView.VertexOptions): number;
        addVertex(x: number, y: number, opt?: LinkView.VertexOptions): number;

        getConnection(): g.Path;

        getSerializedConnection(): string;

        getConnectionSubdivisions(): g.Curve[][];

        getConnectionLength(): number;

        getPointAtLength(length: number): g.Point;

        getPointAtRatio(ratio: number): g.Point;

        getTangentAtLength(length: number): g.Line;

        getTangentAtRatio(ratio: number): g.Line;

        getClosestPoint(point: Point): g.Point;

        getClosestPointLength(point: Point): number;

        getClosestPointRatio(point: Point): number;

        getLabelPosition(x: number, y: number, opt?: LinkView.LabelOptions): Link.LabelPosition;
        getLabelPosition(x: number, y: number, angle: number, opt?: LinkView.LabelOptions): Link.LabelPosition;

        getLabelCoordinates(labelPosition: Link.LabelPosition): g.Point;

        getVertexIndex(x: number, y: number): number;
        getVertexIndex(point: Point): number;

        update(link: Link, attributes: any, opt?: { [key: string]: any }): this;

        requestConnectionUpdate(opt?: { [key: string]: any }): void;

        setInteractivity(value: boolean | LinkView.InteractivityOptions): void;

        getEndView(endType: dia.LinkEnd): dia.CellView | null;

        getEndAnchor(endType: dia.LinkEnd): g.Point;

        getEndConnectionPoint(endType: dia.LinkEnd): g.Point;

        getEndMagnet(endType: dia.LinkEnd): SVGElement | null;

        findLabelNode(labelIndex: string | number, selector?: string): SVGElement | null;

        protected onLabelsChange(link: Link, labels: Link.Label[], opt: { [key: string]: any }): void;

        protected onToolsChange(link: Link, toolsMarkup: string, opt: { [key: string]: any }): void;

        protected onVerticesChange(link: Link, vertices: Point[], opt: { [key: string]: any }): void;

        protected onSourceChange(element: Element, sourceEnd: any, opt: { [key: string]: any }): void;

        protected onTargetChange(element: Element, targetEnd: any, opt: { [key: string]: any }): void;

        protected onlabel(evt: dia.Event, x: number, y: number): void;

        protected dragConnectionStart(evt: dia.Event, x: number, y: number): void;

        protected dragLabelStart(evt: dia.Event, x: number, y: number): void;

        protected dragVertexStart(evt: dia.Event, x: number, y: number): void;

        protected dragArrowheadStart(evt: dia.Event, x: number, y: number): void;

        protected dragStart(evt: dia.Event, x: number, y: number): void;

        protected dragConnection(evt: dia.Event, x: number, y: number): void;

        protected dragLabel(evt: dia.Event, x: number, y: number): void;

        protected dragVertex(evt: dia.Event, x: number, y: number): void;

        protected dragArrowhead(evt: dia.Event, x: number, y: number): void;

        protected drag(evt: dia.Event, x: number, y: number): void;

        protected dragConnectionEnd(evt: dia.Event, x: number, y: number): void;

        protected dragLabelEnd(evt: dia.Event, x: number, y: number): void;

        protected dragVertexEnd(evt: dia.Event, x: number, y: number): void;

        protected dragArrowheadEnd(evt: dia.Event, x: number, y: number): void;

        protected dragEnd(evt: dia.Event, x: number, y: number): void;

        protected notifyPointerdown(evt: dia.Event, x: number, y: number): void;

        protected notifyPointermove(evt: dia.Event, x: number, y: number): void;

        protected notifyPointerup(evt: dia.Event, x: number, y: number): void;
    }

    // dia.Paper

    export namespace Paper {

        interface GradientOptions {
            id?: string;
            type: 'linearGradient' | 'radialGradient';
            stops: Array<{
                offset: string;
                color: string;
                opacity?: number;
            }>;
        }

        interface GridOptions {
            color?: string;
            thickness?: number;
            name?: 'dot' | 'fixedDot' | 'mesh' | 'doubleMesh';
            args?: Array<{ [key: string]: any }> | { [key: string]: any };
        }

        interface BackgroundOptions {
            color?: string;
            image?: string;
            quality?: number;
            position?: Point | string;
            size?: Size | string;
            repeat?: string;
            opacity?: number;
            waterMarkAngle?: number;
        }

        type Dimension = number | string | null;

        enum sorting {
            EXACT = 'sorting-exact',
            APPROX = 'sorting-approximate',
            NONE = 'sorting-none'
        }

        enum Layers {
            CELLS = 'cells',
            BACK = 'back',
            FRONT = 'front',
            TOOLS = 'tools'
        }

        type UpdateStats = {
            priority: number;
            updated: number;
            empty?: boolean;
            postponed?: number;
            unmounted?: number;
            mounted?: number;
            batches?: number;
        };

        type ViewportCallback = (view: mvc.View<any>, isMounted: boolean, paper: Paper) => boolean;
        type ProgressCallback = (done: boolean, processed: number, total: number, stats: UpdateStats, paper: Paper) => void;
        type BeforeRenderCallback = (opt: { [key: string]: any }, paper: Paper) => void;
        type AfterRenderCallback = (stats: UpdateStats, opt: { [key: string]: any }, paper: Paper) => void;

        interface FreezeOptions {
            key?: string;
        }

        interface UnfreezeOptions {
            key?: string;
            mountBatchSize?: number;
            unmountBatchSize?: number;
            batchSize?: number;
            viewport?: ViewportCallback;
            progress?: ProgressCallback;
            beforeRender?: BeforeRenderCallback;
            afterRender?: AfterRenderCallback;
        }

        type PointConstraintCallback = (x: number, y: number, opt: any) => Point;
        type RestrictTranslateCallback = (elementView: ElementView, x0: number, y0: number) => BBox | boolean | PointConstraintCallback;

        interface Options extends mvc.ViewOptions<Graph> {
            // appearance
            width?: Dimension;
            height?: Dimension;
            origin?: Point;
            perpendicularLinks?: boolean;
            linkConnectionPoint?: LinkView.GetConnectionPoint;
            drawGrid?: boolean | GridOptions | GridOptions[];
            background?: BackgroundOptions;
            // interactions
            gridSize?: number;
            highlighting?: boolean | Record<string | dia.CellView.Highlighting, highlighters.HighlighterJSON | boolean>
            interactive?: ((cellView: CellView, event: string) => boolean | CellView.InteractivityOptions) | boolean | CellView.InteractivityOptions
            snapLabels?: boolean;
            snapLinks?: boolean | { radius: number };
            markAvailable?: boolean;
            // validations
            validateMagnet?: (cellView: CellView, magnet: SVGElement, evt: dia.Event) => boolean;
            validateConnection?: (cellViewS: CellView, magnetS: SVGElement, cellViewT: CellView, magnetT: SVGElement, end: LinkEnd, linkView: LinkView) => boolean;
            restrictTranslate?: RestrictTranslateCallback | boolean | BBox;
            multiLinks?: boolean;
            linkPinning?: boolean;
            allowLink?: ((linkView: LinkView, paper: Paper) => boolean) | null;
            // events
            guard?: (evt: dia.Event, view: CellView) => boolean;
            preventContextMenu?: boolean;
            preventDefaultBlankAction?: boolean;
            clickThreshold?: number;
            moveThreshold?: number;
            magnetThreshold?: number | string;
            // views
            elementView?: typeof ElementView | ((element: Element) => typeof ElementView);
            linkView?: typeof LinkView | ((link: Link) => typeof LinkView);
            // embedding
            embeddingMode?: boolean;
            frontParentOnly?: boolean;
            findParentBy?: 'bbox' | 'center' | 'origin' | 'corner' | 'topRight' | 'bottomLeft' | ((elementView: ElementView) => Element[]);
            validateEmbedding?: (this: Paper, childView: ElementView, parentView: ElementView) => boolean;
            validateUnembedding?: (this: Paper, childView: ElementView) => boolean;
            // default views, models & attributes
            cellViewNamespace?: any;
            routerNamespace?: any;
            connectorNamespace?: any;
            highlighterNamespace?: any;
            anchorNamespace?: any;
            linkAnchorNamespace?: any,
            connectionPointNamespace?: any;
            defaultLink?: ((cellView: CellView, magnet: SVGElement) => Link) | Link;
            defaultRouter?: routers.Router | routers.RouterJSON;
            defaultConnector?: connectors.Connector | connectors.ConnectorJSON;
            defaultAnchor?: anchors.AnchorJSON  | anchors.Anchor;
            defaultLinkAnchor?: anchors.AnchorJSON  | anchors.Anchor;
            defaultConnectionPoint?: connectionPoints.ConnectionPointJSON | connectionPoints.ConnectionPoint | ((...args: any[]) => connectionPoints.ConnectionPoint);
            // connecting
            connectionStrategy?: connectionStrategies.ConnectionStrategy;
            // rendering
            async?: boolean;
            sorting?: sorting;
            frozen?: boolean;
            viewport?: ViewportCallback | null;
            onViewUpdate?: (view: mvc.View<any>, flag: number, priority: number, opt: { [key: string]: any }, paper: Paper) => void;
            onViewPostponed?: (view: mvc.View<any>, flag: number, paper: Paper) => boolean;
            beforeRender?: Paper.BeforeRenderCallback
            afterRender?: Paper.AfterRenderCallback
        }

        interface ScaleContentOptions {
            padding?: Padding;
            preserveAspectRatio?: boolean;
            minScale?: number;
            minScaleX?: number;
            minScaleY?: number;
            maxScale?: number;
            maxScaleX?: number;
            maxScaleY?: number;
            scaleGrid?: number;
            useModelGeometry?: boolean;
            fittingBBox?: BBox;
            contentArea?: BBox;
        }

        interface FitToContentOptions {
            gridWidth?: number;
            gridHeight?: number;
            padding?: Padding;
            allowNewOrigin?: 'negative' | 'positive' | 'any';
            allowNegativeBottomRight?: boolean;
            minWidth?: number;
            minHeight?: number;
            maxWidth?: number;
            maxHeight?: number;
            useModelGeometry?: boolean;
            contentArea?: BBox;
        }
    }

    class Paper extends mvc.View<Graph> {

        constructor(opt: Paper.Options);

        options: Paper.Options;

        svg: SVGElement;
        defs: SVGDefsElement;
        cells: SVGGElement;
        tools: SVGGElement;
        layers: SVGGElement;
        viewport: SVGGElement;

        $document: JQuery;
        $grid: JQuery;
        $background: JQuery;

        matrix(): SVGMatrix;
        matrix(ctm: SVGMatrix | Vectorizer.Matrix): this;

        clientMatrix(): SVGMatrix;

        clientOffset(): g.Point;

        pageOffset(): g.Point;

        clientToLocalPoint(x: number, y: number): g.Point;
        clientToLocalPoint(point: Point): g.Point;

        clientToLocalRect(x: number, y: number, width: number, height: number): g.Rect;
        clientToLocalRect(rect: BBox): g.Rect;

        localToClientPoint(x: number, y: number): g.Point;
        localToClientPoint(point: Point): g.Point;

        localToClientRect(x: number, y: number, width: number, height: number): g.Rect;
        localToClientRect(rect: BBox): g.Rect;

        localToPagePoint(x: number, y: number): g.Point;
        localToPagePoint(point: Point): g.Point;

        localToPageRect(x: number, y: number, width: number, height: number): g.Rect;
        localToPageRect(rect: BBox): g.Rect;

        localToPaperPoint(x: number, y: number): g.Point;
        localToPaperPoint(point: Point): g.Point;

        localToPaperRect(x: number, y: number, width: number, height: number): g.Rect;
        localToPaperRect(rect: BBox): g.Rect;

        pageToLocalPoint(x: number, y: number): g.Point;
        pageToLocalPoint(point: Point): g.Point;

        pageToLocalRect(x: number, y: number, width: number, height: number): g.Rect;
        pageToLocalRect(rect: BBox): g.Rect;

        paperToLocalPoint(x: number, y: number): g.Point;
        paperToLocalPoint(point: Point): g.Point;

        paperToLocalRect(x: number, y: number, width: number, height: number): g.Rect;
        paperToLocalRect(x: BBox): g.Rect;

        snapToGrid(x: number, y: number): g.Point;
        snapToGrid(point: Point): g.Point;

        defineFilter(filter: { [key: string]: any }): string;

        defineGradient(gradient: Paper.GradientOptions): string;

        defineMarker(marker: { [key: string]: any }): string;

        isDefined(defId: string): boolean;

        getComputedSize(): Size;

        getArea(): g.Rect;

        getRestrictedArea(): g.Rect | null;
        getRestrictedArea(elementView: ElementView, x: number, y: number): g.Rect | null | Paper.PointConstraintCallback;

        getContentArea(opt?: { useModelGeometry: boolean }): g.Rect;

        getContentBBox(opt?: { useModelGeometry: boolean }): g.Rect;

        findView<T extends ElementView | LinkView>(element: string | JQuery | SVGElement): T;

        findViewByModel<T extends ElementView | LinkView>(model: Cell | string | number): T;

        findViewsFromPoint(point: string | Point): ElementView[];

        findViewsInArea(rect: BBox, opt?: { strict?: boolean }): ElementView[];

        fitToContent(opt?: Paper.FitToContentOptions): g.Rect;
        fitToContent(gridWidth?: number, gridHeight?: number, padding?: number, opt?: any): g.Rect;

        scaleContentToFit(opt?: Paper.ScaleContentOptions): void;

        drawBackground(opt?: Paper.BackgroundOptions): this;

        drawGrid(opt?: Paper.GridOptions | Paper.GridOptions[]): this;

        clearGrid(): this;

        getDefaultLink(cellView: CellView, magnet: SVGElement): Link;

        getModelById(id: string | number | Cell): Cell;

        setDimensions(width: Paper.Dimension, height: Paper.Dimension): void;

        setGridSize(gridSize: number): this;

        setInteractivity(value: any): void;

        setOrigin(x: number, y: number): this;

        scale(): Vectorizer.Scale;
        scale(sx: number, sy?: number, ox?: number, oy?: number): this;

        translate(): Vectorizer.Translation;
        translate(tx: number, ty?: number): this;

        update(): this;

        getPointerArgs(evt: dia.Event): [dia.Event, number, number];

        // tools

        removeTools(): this;

        hideTools(): this;

        showTools(): this;

        dispatchToolsEvent(eventName: string, ...args: any[]): void;

        // layers

        getLayerNode(layerName: Paper.Layers | string): SVGGElement;

        // rendering

        freeze(opt?: Paper.FreezeOptions): void;

        unfreeze(opt?: Paper.UnfreezeOptions): void;

        isFrozen(): boolean;

        requestViewUpdate(view: mvc.View<any>, flag: number, priority: number, opt?: { [key: string]: any }): void;

        requireView<T extends ElementView | LinkView>(model: Cell | string | number, opt?: dia.Cell.Options): T;

        dumpViews(opt?: {
            batchSize?: number;
            mountBatchSize?: number;
            unmountBatchSize?: number;
            viewport?: Paper.ViewportCallback;
            progress?: Paper.ProgressCallback;
        }): void;

        checkViewport(opt?: {
            mountBatchSize?: number;
            unmountBatchSize?: number;
            viewport?: Paper.ViewportCallback;
        }): {
            mounted: number;
            unmounted: number;
        };

        updateViews(opt?: {
            batchSize?: number;
            viewport?: Paper.ViewportCallback;
            progress?: Paper.ProgressCallback;
        }): {
            updated: number;
            batches: number;
        };

        hasScheduledUpdates(): boolean;

        // protected

        protected scheduleViewUpdate(view: mvc.View<any>, flag: number, priority: number, opt?: { [key: string]: any }): void;

        protected dumpViewUpdate(view: mvc.View<any>): number;

        protected dumpView(view: mvc.View<any>, opt?: { [key: string]: any }): number;

        protected updateView(view: mvc.View<any>, flag: number, opt?: { [key: string]: any }): number;

        protected registerUnmountedView(view: mvc.View<any>): number;

        protected registerMountedView(view: mvc.View<any>): number;

        protected updateViewsAsync(opt?: {
            batchSize?: number;
            mountBatchSize?: number;
            unmountBatchSize?: number;
            viewport?: Paper.ViewportCallback;
            progress?: Paper.ProgressCallback;
            before?: Paper.BeforeRenderCallback
        }): void;

        protected updateViewsBatch(opt?: {
            batchSize?: number;
            viewport?: Paper.ViewportCallback;
        }): Paper.UpdateStats;

        protected checkMountedViews(viewport: Paper.ViewportCallback, opt?: { unmountBatchSize?: number }): number;

        protected checkUnmountedViews(viewport: Paper.ViewportCallback, opt?: { mountBatchSize?: number }): number;

        protected isAsync(): boolean;

        protected isExactSorting(): boolean;

        protected sortViews(): void;

        protected sortViewsExact(): void;

        protected insertView(view: dia.CellView): void;

        protected addZPivot(z: number): Comment;

        protected removeZPivots(): void

        protected pointerdblclick(evt: dia.Event): void;

        protected pointerclick(evt: dia.Event): void;

        protected contextmenu(evt: dia.Event): void;

        protected pointerdown(evt: dia.Event): void;

        protected pointermove(evt: dia.Event): void;

        protected pointerup(evt: dia.Event): void;

        protected mouseover(evt: dia.Event): void;

        protected mouseout(evt: dia.Event): void;

        protected mouseenter(evt: dia.Event): void;

        protected mouseleave(evt: dia.Event): void;

        protected mousewheel(evt: dia.Event): void;

        protected onevent(evt: dia.Event): void;

        protected onmagnet(evt: dia.Event): void;

        protected onlabel(evt: dia.Event): void;

        protected guard(evt: dia.Event, view: CellView): boolean;

        protected drawBackgroundImage(img: HTMLImageElement, opt: { [key: string]: any }): void;

        protected updateBackgroundColor(color: string): void;

        protected updateBackgroundImage(opt: { position?: any, size?: any }): void;

        protected createViewForModel(cell: Cell): CellView;

        protected cloneOptions(): Paper.Options;

        protected onCellAdded(cell: Cell, collection: Backbone.Collection<Cell>, opt: dia.Graph.Options): void;

        protected onCellRemoved(cell: Cell, collection: Backbone.Collection<Cell>, opt: dia.Graph.Options): void;

        protected onCellChanged(cell: Cell, opt: dia.Cell.Options): void;
        protected onCellChanged(cell: Backbone.Collection<Cell>, opt: dia.Graph.Options): void;

        protected onGraphReset(cells: Backbone.Collection<Cell>, opt: dia.Graph.Options): void;

        protected onGraphSort(): void;

        protected onGraphBatchStop(): void;

        protected onCellHighlight(cellView: CellView, magnetEl: SVGElement, opt?: { highlighter?: highlighters.HighlighterJSON }): void;

        protected onCellUnhighlight(cellView: CellView, magnetEl: SVGElement, opt?: { highlighter?: highlighters.HighlighterJSON }): void;

        protected onRemove(): void;

        protected removeView(cell: Cell): CellView;

        protected removeViews(): void;

        protected renderView(cell: Cell): CellView;

        protected resetViews(cells?: Cell[], opt?: { [key: string]: any }): void;
    }

    namespace ToolsView {

        interface Options extends mvc.ViewOptions<undefined> {
            tools?: dia.ToolView[];
            name?: string | null;
            relatedView?: dia.CellView;
            component?: boolean;
        }
    }

    class ToolsView extends mvc.View<undefined> {

        constructor(opt?: ToolsView.Options);

        isRendered: boolean;

        options: ToolsView.Options;

        configure(opt?: ToolsView.Options): this;

        getName(): string | null;

        focusTool(tool: ToolView): this;

        blurTool(tool?: ToolView): this;

        show(): this;

        hide(): this;

        mount(): this;

        protected simulateRelatedView(el: SVGElement): void;
    }

    namespace ToolView {

        interface Options {
            focusOpacity?: number;
        }
    }

    class ToolView extends mvc.View<undefined> {

        name: string | null;
        parentView: ToolsView;
        relatedView: dia.CellView;
        paper: Paper;

        constructor(opt?: ToolView.Options);

        configure(opt?: ToolView.Options): this;

        show(): void;

        hide(): void;

        isVisible(): boolean;

        focus(): void;

        blur(): void;

        update(): void;

        protected guard(evt: dia.Event): boolean;
    }


    namespace HighlighterView {

        type Constructor<T> = { new (): T }

        type NodeSelectorJSON = {
            selector?: string;
            port?: string;
            label?: number;
        };

        type NodeSelector = string | SVGElement | NodeSelectorJSON;

        type Options = {
            layer?: dia.Paper.Layers | string | null;
        };
    }

    class HighlighterView<Options = HighlighterView.Options> extends mvc.View<undefined> {

        constructor(options?: Options);

        options: Options;

        UPDATABLE: boolean;
        MOUNTABLE: boolean;

        cellView: dia.CellView;
        nodeSelector: HighlighterView.NodeSelector | null;
        node: SVGElement | null;
        updateRequested: boolean;
        transformGroup: Vectorizer | null;

        public unmount(): void;

        protected findNode(cellView: dia.CellView, nodeSelector: HighlighterView.NodeSelector): SVGElement | null;

        protected transform(): void;

        protected update(): void;

        protected highlight(cellView: dia.CellView, node: SVGElement): void;

        protected unhighlight(cellView: dia.CellView, node: SVGElement): void;

        static uniqueId(node: SVGElement, options?: any): string;

        static add<T extends HighlighterView>(
            this: HighlighterView.Constructor<T>,
            cellView: dia.CellView,
            selector: HighlighterView.NodeSelector,
            id: string,
            options?: any
        ): T;

        static remove(
            cellView: dia.CellView,
            id?: string
        ): void;

        static get<T extends HighlighterView>(
            this: HighlighterView.Constructor<T>,
            cellView: dia.CellView,
            id: string
        ): T | null;
        static get<T extends HighlighterView>(
            this: HighlighterView.Constructor<T>,
            cellView: dia.CellView
        ): T[];

        static update(cellView: dia.CellView, id?: string): void;

        static transform(cellView: dia.CellView, id?: string): void;

        static highlight(cellView: dia.CellView, node: SVGElement, options?: any): void;

        static unhighlight(cellView: dia.CellView, node: SVGElement, options?: any): void;

        protected static _addRef(cellView: dia.CellView, id: string, view: HighlighterView): void;

        protected static _removeRef(cellView: dia.CellView, id?: string): void;
    }
}

// highlighters

export namespace highlighters {

    import HighlighterView = dia.HighlighterView;

    interface AddClassHighlighterArguments extends HighlighterView.Options {
        className?: string;
    }

    interface OpacityHighlighterArguments extends HighlighterView.Options {

    }

    interface StrokeHighlighterArguments extends HighlighterView.Options {
        padding?: number;
        rx?: number;
        ry?: number;
        useFirstSubpath?: boolean;
        attrs?: attributes.NativeSVGAttributes;
    }

    interface MaskHighlighterArguments extends HighlighterView.Options {
        padding?: number;
        maskClip?: number;
        deep?: boolean;
        attrs?: attributes.NativeSVGAttributes;
    }

    interface HighlighterArgumentsMap {
        'addClass': AddClassHighlighterArguments;
        'opacity': OpacityHighlighterArguments;
        'stroke': StrokeHighlighterArguments;
        'mask': MaskHighlighterArguments;
        [key: string]: { [key: string]: any };
    }

    type HighlighterType = keyof HighlighterArgumentsMap;

    type GenericHighlighterArguments<K extends HighlighterType> = HighlighterArgumentsMap[K];

    interface GenericHighlighterJSON<K extends HighlighterType> {
        name: K;
        options?: GenericHighlighterArguments<K>;
    }

    type HighlighterJSON = GenericHighlighterJSON<HighlighterType>;

    class mask extends dia.HighlighterView<MaskHighlighterArguments> {

        VISIBLE: string;
        INVISIBLE: string;
        MASK_ROOT_ATTRIBUTE_BLACKLIST: string[];
        MASK_CHILD_ATTRIBUTE_BLACKLIST: string[];
        MASK_REPLACE_TAGS: string[];
        MASK_REMOVE_TAGS: string[];

        public getMaskId(): string;

        protected getMask(cellView: dia.CellView, vel: Vectorizer): Vectorizer;

        protected getMaskShape(cellView: dia.CellView, vel: Vectorizer): Vectorizer;

        protected transformMaskRoot(cellView: dia.CellView, root: Vectorizer): void;

        protected transformMaskChild(cellView: dia.CellView, child: Vectorizer): boolean;

        protected addMask(paper: dia.Paper, mask: Vectorizer): void;

        protected removeMask(paper: dia.Paper): void;
    }

    class stroke extends dia.HighlighterView<StrokeHighlighterArguments> {

        protected getPathData(cellView: dia.CellView, node: SVGElement): string;

        protected highlightConnection(cellView: dia.CellView): void;

        protected highlightNode(cellView: dia.CellView, node: SVGElement): void;
    }

    class addClass extends dia.HighlighterView<AddClassHighlighterArguments> {

    }

    class opacity extends dia.HighlighterView<OpacityHighlighterArguments> {

        opacityClassName: string;
    }

    /**
     * @deprecated
     */
    interface GenericHighlighter<K extends HighlighterType> {

        highlight(cellView: dia.CellView, magnetEl: SVGElement, opt?: GenericHighlighterArguments<K>): void;

        unhighlight(cellView: dia.CellView, magnetEl: SVGElement, opt?: GenericHighlighterArguments<K>): void;
    }

    /**
     * @deprecated
     */
    type HighlighterArguments = GenericHighlighterArguments<HighlighterType>;

    /**
     * @deprecated
     */
    type Highlighter = GenericHighlighter<HighlighterType>;
}

export namespace shapes {

    namespace standard {

        interface RectangleSelectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGRectAttributes;
            label?: attributes.SVGTextAttributes;
        }

        class Rectangle extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<RectangleSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface CircleSelectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGCircleAttributes;
            label?: attributes.SVGTextAttributes;
        }

        class Circle extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<CircleSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface EllipseSelectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGCircleAttributes;
            label?: attributes.SVGTextAttributes;
        }

        class Ellipse extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<EllipseSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface PathSelectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGPathAttributes;
            label?: attributes.SVGTextAttributes;
        }

        class Path extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<PathSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface PolygonSelectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGPolygonAttributes;
            label?: attributes.SVGTextAttributes;
        }

        class Polygon extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<PolygonSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface PolylineSelectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGPolylineAttributes;
            label?: attributes.SVGTextAttributes;
        }

        class Polyline extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<PolylineSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface ImageSelectors {
            root?: attributes.SVGAttributes;
            image?: attributes.SVGImageAttributes;
            label?: attributes.SVGTextAttributes;
        }

        class Image extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<ImageSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface BorderedImageSelectors {
            root?: attributes.SVGAttributes;
            border?: attributes.SVGRectAttributes;
            background?: attributes.SVGRectAttributes;
            image?: attributes.SVGImageAttributes;
            label?: attributes.SVGTextAttributes;
        }

        class BorderedImage extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<BorderedImageSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface EmbeddedImageSelectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGRectAttributes;
            image?: attributes.SVGImageAttributes;
            label?: attributes.SVGTextAttributes;
        }

        class EmbeddedImage extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<EmbeddedImageSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface InscribedImageSelectors {
            root?: attributes.SVGAttributes;
            border?: attributes.SVGEllipseAttributes;
            background?: attributes.SVGEllipseAttributes;
            image?: attributes.SVGImageAttributes;
            label?: attributes.SVGTextAttributes;
        }

        class InscribedImage extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<InscribedImageSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface HeaderedRectangleSelectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGRectAttributes;
            header?: attributes.SVGRectAttributes;
            headerText?: attributes.SVGTextAttributes;
            bodyText?: attributes.SVGTextAttributes;
        }

        class HeaderedRectangle extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<HeaderedRectangleSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface CylinderBodyAttributes extends attributes.SVGPathAttributes {
            lateralArea?: string | number;
        }

        interface CylinderSelectors {
            root?: attributes.SVGAttributes;
            body?: CylinderBodyAttributes;
            top?: attributes.SVGEllipseAttributes;
        }

        class Cylinder extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<CylinderSelectors>,
                opt?: dia.Graph.Options
            )

            topRy(): string | number;
            topRy(t: string | number, opt?: dia.Cell.Options): this;
        }

        interface TextBlockSelectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGRectAttributes;
            label?: {
                text?: string;
                style?: { [key: string]: any };
                [key: string]: any;
            }
        }

        class TextBlock extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<TextBlockSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface LinkSelectors {
            root?: attributes.SVGAttributes;
            line?: attributes.SVGPathAttributes;
            wrapper?: attributes.SVGPathAttributes;
        }

        class Link extends dia.Link {
            constructor(
                attributes?: dia.Link.GenericAttributes<LinkSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface DoubleLinkSelectors {
            root?: attributes.SVGAttributes;
            line?: attributes.SVGPathAttributes;
            outline?: attributes.SVGPathAttributes;
        }

        class DoubleLink extends dia.Link {
            constructor(
                attributes?: dia.Link.GenericAttributes<DoubleLinkSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface ShadowLinkSelectors {
            root?: attributes.SVGAttributes;
            line?: attributes.SVGPathAttributes;
            shadow?: attributes.SVGPathAttributes;
        }

        class ShadowLink extends dia.Link {
            constructor(
                attributes?: dia.Link.GenericAttributes<ShadowLinkSelectors>,
                opt?: dia.Graph.Options
            )
        }
    }

    interface SVGTextSelector extends dia.Cell.Selectors {
        text?: attributes.SVGTextAttributes;
    }

    interface SVGRectSelector extends dia.Cell.Selectors {
        rect?: attributes.SVGRectAttributes;
    }

    interface SVGCircleSelector extends dia.Cell.Selectors {
        circle?: attributes.SVGCircleAttributes;
    }

    interface SVGEllipseSelector extends dia.Cell.Selectors {
        ellipse?: attributes.SVGEllipseAttributes;
    }

    interface SVGPolygonSelector extends dia.Cell.Selectors {
        polygon?: attributes.SVGPolygonAttributes;
    }

    interface SVGPolylineSelector extends dia.Cell.Selectors {
        polyline?: attributes.SVGPolylineAttributes;
    }

    interface SVGImageSelector extends dia.Cell.Selectors {
        image?: attributes.SVGImageAttributes;
    }

    interface SVGPathSelector extends dia.Cell.Selectors {
        path?: attributes.SVGPathAttributes;
    }

    namespace basic {

        class Generic extends dia.Element {

        }

        class Text extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<SVGTextSelector>,
                opt?: { [key: string]: any }
            );
        }

        interface RectSelectors extends SVGTextSelector, SVGRectSelector {

        }

        class Rect extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<RectSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface CircleSelectors extends SVGTextSelector, SVGCircleSelector {

        }

        class Circle extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<CircleSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface EllipseSelectors extends SVGTextSelector, SVGEllipseSelector {

        }


        class Ellipse extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<EllipseSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface PolygonSelectors extends SVGTextSelector, SVGPolygonSelector {

        }


        class Polygon extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<PolygonSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface PolylineSelectors extends SVGTextSelector, SVGPolylineSelector {

        }

        class Polyline extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<PolylineSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface ImageSelectors extends SVGTextSelector, SVGImageSelector {

        }

        class Image extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<ImageSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface PathSelectors extends SVGTextSelector, SVGPathSelector {

        }

        class Path extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<PathSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Rhombus extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<PathSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface TextBlockSelectors extends SVGTextSelector, SVGRectSelector {
            '.content'?: attributes.SVGTextAttributes;
        }

        class TextBlock extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<TextBlockSelectors>,
                opt?: { [key: string]: any }
            );
        }
    }

    namespace chess {

        class KingWhite extends basic.Generic {

        }

        class KingBlack extends basic.Generic {

        }

        class QueenWhite extends basic.Generic {

        }

        class QueenBlack extends basic.Generic {

        }

        class RookWhite extends basic.Generic {

        }

        class RookBlack extends basic.Generic {

        }

        class BishopWhite extends basic.Generic {

        }

        class BishopBlack extends basic.Generic {

        }

        class KnightWhite extends basic.Generic {

        }

        class KnightBlack extends basic.Generic {

        }

        class PawnWhite extends basic.Generic {

        }

        class PawnBlack extends basic.Generic {

        }
    }

    namespace devs {

        interface ModelSelectors extends dia.Cell.Selectors {
            '.label'?: attributes.SVGTextAttributes;
            '.body'?: attributes.SVGRectAttributes;
        }

        interface ModelAttributes extends dia.Element.GenericAttributes<ModelSelectors> {
            inPorts?: string[];
            outPorts?: string[];
        }

        class Model extends basic.Generic {

            constructor(attributes?: ModelAttributes, opt?: { [key: string]: any });

            changeInGroup(properties: any, opt?: any): boolean;

            changeOutGroup(properties: any, opt?: any): boolean;

            createPortItem(group: string, port: string): any;

            createPortItems(group: string, ports: string[]): any[];

            addOutPort(port: string, opt?: any): this;

            addInPort(port: string, opt?: any): this;

            removeOutPort(port: string, opt?: any): this;

            removeInPort(port: string, opt?: any): this;
        }

        class Coupled extends Model {

        }

        class Atomic extends Model {

        }

        class Link extends dia.Link {

        }
    }

    namespace erd {

        interface PolygonalSelectors extends dia.Cell.Selectors {
            '.label'?: attributes.SVGPolygonAttributes;
            '.body'?: attributes.SVGPolygonAttributes;
            'text'?: attributes.SVGTextAttributes;
        }

        interface EllipsoidSelectors extends dia.Cell.Selectors {
            '.label'?: attributes.SVGEllipseAttributes;
            '.body'?: attributes.SVGEllipseAttributes;
            'text'?: attributes.SVGTextAttributes;
        }

        class Entity extends basic.Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<PolygonalSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class WeakEntity extends Entity {

        }

        class Relationship extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<PolygonalSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class IdentifyingRelationship extends Relationship {

        }

        class Attribute extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<EllipsoidSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Multivalued extends Attribute {

        }

        class Derived extends Attribute {

        }

        class Key extends Attribute {

        }

        class Normal extends Attribute {

        }

        class ISA extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<basic.PolygonSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Line extends dia.Link {

            cardinality(value: string | number): void;
        }
    }

    namespace fsa {

        class State extends basic.Circle {

        }

        class StartState extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<SVGCircleSelector>,
                opt?: { [key: string]: any }
            );
        }

        interface CirculoidSelectors extends dia.Cell.Selectors {
            '.outer'?: attributes.SVGCircleAttributes;
            '.inner'?: attributes.SVGCircleAttributes;
        }

        class EndState extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<CirculoidSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Arrow extends dia.Link {

        }
    }

    namespace logic {

        abstract class Gate extends basic.Generic {

        }

        interface GateSelectors extends dia.Cell.Selectors {
            '.body'?: attributes.SVGRectAttributes;
            '.wire'?: attributes.SVGPathAttributes;
            'circle'?: attributes.SVGCircleAttributes;
            'text'?: attributes.SVGTextAttributes;
        }

        class IO extends Gate {
            constructor(
                attributes?: dia.Element.GenericAttributes<basic.CircleSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Input extends IO {

        }

        class Output extends IO {

        }

        interface Gate11Selectors extends dia.Cell.Selectors {
            '.input'?: attributes.SVGCircleAttributes;
            '.output'?: attributes.SVGCircleAttributes;
            '.body'?: attributes.SVGImageAttributes;
            'image'?: attributes.SVGImageAttributes;
        }

        class Gate11 extends Gate {
            constructor(
                attributes?: dia.Element.GenericAttributes<Gate11Selectors>,
                opt?: { [key: string]: any }
            );
        }

        interface Gate21Selectors extends dia.Cell.Selectors {
            '.input'?: attributes.SVGCircleAttributes;
            '.input1'?: attributes.SVGCircleAttributes;
            '.input2'?: attributes.SVGCircleAttributes;
            '.output'?: attributes.SVGCircleAttributes;
            '.body'?: attributes.SVGImageAttributes;
            'image'?: attributes.SVGImageAttributes;
        }

        class Gate21 extends Gate {
            constructor(
                attributes?: dia.Element.GenericAttributes<Gate21Selectors>,
                opt?: { [key: string]: any }
            );
        }

        class Repeater extends Gate11 {

            operation(input: any): any;
        }

        class Not extends Gate11 {

            operation(input: any): boolean;
        }

        class Or extends Gate21 {

            operation(input1: any, input2: any): boolean;
        }

        class And extends Gate21 {

            operation(input1: any, input2: any): boolean;
        }

        class Nor extends Gate21 {

            operation(input1: any, input2: any): boolean;
        }

        class Nand extends Gate21 {

            operation(input1: any, input2: any): boolean;
        }

        class Xor extends Gate21 {

            operation(input1: any, input2: any): boolean;
        }

        class Xnor extends Gate21 {

            operation(input1: any, input2: any): boolean;
        }

        class Wire extends dia.Link {

        }
    }

    namespace org {

        interface MemberSelectors extends dia.Cell.Selectors {
            '.card'?: attributes.SVGRectAttributes;
            '.rank'?: attributes.SVGTextAttributes;
            '.name'?: attributes.SVGTextAttributes;
            'image'?: attributes.SVGImageAttributes;
        }

        class Member extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<MemberSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Arrow extends dia.Link {

        }
    }

    namespace pn {

        class Place extends basic.Generic {
            constructor(attributes?: dia.Element.Attributes, opt?: { [key: string]: any });
        }

        class PlaceView extends dia.ElementView {
            renderTokens(): void;
        }

        class Transition extends basic.Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<SVGRectSelector>,
                opt?: { [key: string]: any }
            );
        }

        class Link extends dia.Link {

        }
    }

    namespace uml {

        interface ClassAttributes extends dia.Element.GenericAttributes<SVGRectSelector> {
            name: string[];
            attributes: string[];
            methods: string[];
        }

        class Class extends basic.Generic {

            constructor(attributes?: ClassAttributes, opt?: { [key: string]: any });

            getClassName(): string[];

            protected updateRectangles(): void;
        }

        class ClassView extends dia.ElementView {

        }

        class Abstract extends Class {
            constructor(attributes?: ClassAttributes, opt?: { [key: string]: any });
        }

        class AbstractView extends ClassView {
            constructor(attributes?: ClassAttributes, opt?: { [key: string]: any });
        }

        class Interface extends Class {
            constructor(attributes?: ClassAttributes, opt?: { [key: string]: any });
        }

        class InterfaceView extends ClassView {
            constructor(attributes?: ClassAttributes, opt?: { [key: string]: any });
        }

        class Generalization extends dia.Link {

        }

        class Implementation extends dia.Link {

        }

        class Aggregation extends dia.Link {

        }

        class Composition extends dia.Link {

        }

        class Association extends dia.Link {

        }

        interface StateSelectors extends dia.Cell.Selectors {
            '.uml-state-body'?: attributes.SVGRectAttributes;
            '.uml-state-separator'?: attributes.SVGPathAttributes;
            '.uml-state-name'?: attributes.SVGTextAttributes;
            '.uml-state-events'?: attributes.SVGTextAttributes;
        }

        class State extends basic.Generic {

            constructor(
                attributes?: dia.Element.GenericAttributes<StateSelectors>,
                opt?: { [key: string]: any }
            );

            protected updateName(): void;

            protected updateEvents(): void;

            protected updatePath(): void;
        }

        class StartState extends basic.Circle {
            constructor(
                attributes?: dia.Element.GenericAttributes<basic.CircleSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface EndStateSelectors extends dia.Cell.Selectors {
            'circle.outer'?: attributes.SVGCircleAttributes;
            'circle.inner'?: attributes.SVGCircleAttributes;
        }

        class EndState extends basic.Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<EndStateSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Transition extends dia.Link {

        }
    }
}

// util

export namespace util {

    export function hashCode(str: string): string;

    export function getByPath(object: { [key: string]: any }, path: string | string[], delim?: string): any;

    export function setByPath(object: { [key: string]: any }, path: string | string[], value: any, delim?: string): any;

    export function unsetByPath(object: { [key: string]: any }, path: string | string[], delim?: string): any;

    export function flattenObject(object: { [key: string]: any }, delim?: string, stop?: (node: any) => boolean): any;

    export function uuid(): string;

    export function guid(obj?: { [key: string]: any }): string;

    export function toKebabCase(str: string): string;

    export function normalizeEvent(evt: dia.Event): dia.Event;

    export function nextFrame(callback: () => void, context?: { [key: string]: any }, ...args: any[]): number;

    export function cancelFrame(requestId: number): void;

    export var shapePerimeterConnectionPoint: dia.LinkView.GetConnectionPoint;

    export function isPercentage(val: any): boolean;

    export function parseCssNumeric(val: any, restrictUnits: string | string[]): { value: number; unit?: string } | null;

    export function breakText(text: string, size: { width: number; height?: number; }, attrs?: attributes.NativeSVGAttributes, opt?: {
        svgDocument?: SVGElement;
        separator?: string | any;
        eol?: string;
        ellipsis?: boolean | string;
        hyphen?: string | RegExp;
        maxLineCount?: number;
    }): string;

    export function sanitizeHTML(html: string): string;

    export function downloadBlob(blob: Blob, fileName: string): void;

    export function downloadDataUri(dataUri: string, fileName: string): void;

    export function dataUriToBlob(dataUri: string): Blob;

    export function imageToDataUri(url: string, callback: (err: Error | null, dataUri: string) => void): void;

    export function getElementBBox(el: Element): dia.BBox;

    export function sortElements(
        elements: Element[] | string | JQuery,
        comparator: (a: Element, b: Element) => number
    ): Element[];

    export function setAttributesBySelector(el: Element, attrs: { [selector: string]: { [attribute: string]: any } }): void;

    export function normalizeSides(sides: dia.Sides): dia.PaddingJSON;

    export function template(html: string): (data: any) => string;

    export function toggleFullScreen(el?: Element): void;

    interface DOMJSONDocument {
        fragment: DocumentFragment,
        selectors: { [key: string]: Element },
        groupSelectors: { [key: string]: Element[] }
    }

    export function parseDOMJSON(json: dia.MarkupJSON): DOMJSONDocument;

    export namespace timing {

        type TimingFunction = (time: number) => number;

        export var linear: TimingFunction;
        export var quad: TimingFunction;
        export var cubic: TimingFunction;
        export var inout: TimingFunction;
        export var exponential: TimingFunction;
        export var bounce: TimingFunction;

        export function reverse(f: TimingFunction): TimingFunction;

        export function reflect(f: TimingFunction): TimingFunction;

        export function clamp(f: TimingFunction, min?: number, max?: number): TimingFunction;

        export function back(s?: number): TimingFunction;

        export function elastic(x?: number): TimingFunction;
    }

    export namespace interpolate {

        type InterpolateFunction<T> = (start: T, end: T) => ((time: number) => T);

        export var number: InterpolateFunction<number>;
        export var object: InterpolateFunction<{ [key: string]: any }>;
        export var hexColor: InterpolateFunction<string>;
        export var unit: InterpolateFunction<string>;
    }

    export namespace filter {

        interface FilterArgumentsMap {
            'outline': {
                color?: string;
                opacity?: number;
                margin?: number;
                width?: number;
            };
            'highlight': {
                color?: string;
                blur?: number;
                opacity?: number;
                width?: number;
            };
            'blur': {
                x?: number;
                y?: number;
            };
            'dropShadow': {
                dx?: number;
                dy?: number;
                opacity?: number;
                color?: string;
                blur?: number;
            };
            'grayscale': {
                amount?: number;
            };
            'sepia': {
                amount?: number;
            };
            'saturate': {
                amount?: number;
            };
            'hueRotate': {
                angle?: number;
            };
            'invert': {
                amount?: number;
            };
            'brightness': {
                amount?: number;
            };
            'contrast': {
                amount?: number;
            };
        }

        type FilterFunction<K extends keyof FilterArgumentsMap> = (args: FilterArgumentsMap[K]) => string;

        export var outline: FilterFunction<'outline'>;
        export var highlight: FilterFunction<'highlight'>;
        export var blur: FilterFunction<'blur'>;
        export var dropShadow: FilterFunction<'dropShadow'>;
        export var grayscale: FilterFunction<'grayscale'>;
        export var sepia: FilterFunction<'sepia'>;
        export var saturate: FilterFunction<'saturate'>;
        export var hueRotate: FilterFunction<'hueRotate'>;
        export var invert: FilterFunction<'invert'>;
        export var brightness: FilterFunction<'brightness'>;
        export var contrast: FilterFunction<'contrast'>;
    }

    namespace format {

        interface NumberLocale {
            currency: [string, string],
            decimal: string,
            thousands: string,
            grouping: number[]
        }

        export function number(specifier: string, value: number, locale?: NumberLocale): string;

        export function string(str: string, value: string): string;

        export function convert(type: string, value: number, precision: number): string;

        export function round(value: number, precision?: number): number

        export function precision(value: number, precision: number): number;

        export function prefix(value: number, precision: number): { scale: (d: number) => number; symbol: string; } | undefined
    }

    // LODASH FUNCTIONS:

    type NotVoid = {} | null | undefined; // the `any` type without `void` and `never`

    type Collection = object | any[]; // an object or an array

    type PropertyPath = string | string[];

    type Iteratee = IterateeFunction | IterateeShorthand;
    type IterateeFunction = (value: any) => NotVoid;
    type IterateeShorthand = PropertyPath; // there are other shorthands in Lodash but not in the methods we duplicate

    interface Cancelable {
        cancel(): void;
        flush(): void;
    }

    type SourceObjectsOptionalFinalCustomizer = Array<object | CustomizerFunction>; // typescript cannot express "any number of objects optionally followed by CustomizerFunction"
    type CustomizerFunction = (objValue: any, srcValue: any, key: string, object: any, source: any, stack: any) => NotVoid;

    /** @deprecated do not use */
    export function mixin(destinationObject: object, ...sourceObjects: object[]): object;

    /** @deprecated do not use */
    export function deepMixin(destinationObject: object, sourceObject: object, options?: object): object;

    /** @deprecated do not use */
    export function assign(destinationObject: object, ...sourceObjects: object[]): object;

    /** @deprecated use joint.util.defaults */
    export function supplement(destinationObject: object, ...sourceObjects: object[]): object;

    /** @deprecated use joint.util.defaultsDeep */
    export function deepSupplement(destionationObject: object, ...sourceObjects: object[]): object;

    export function defaults(destinationObject: object, ...sourceObjects: object[]): object;

    export function defaultsDeep(destinationObject: object, ...sourceObjects: object[]): object;

    export function invoke(collection: Collection, methodPath: PropertyPath, args?: any[]): any[];
    export function invoke(collection: Collection, functionToInvokeForAll: IterateeFunction, args?: any[]): any[];

    export function sortedIndex(sortedArray: any[], valueToInsert: any, iteratee?: Iteratee): number;

    export function uniq(array: any[], iteratee?: Iteratee): any[];

    export function clone<T>(value: T): T;

    export function cloneDeep<T>(value: T): T;

    export function isEmpty(value: any): boolean;

    export function isEqual(value: any, otherValue: any): boolean;

    export function isFunction(value: any): boolean;

    export function isPlainObject(value: any): boolean;

    export function toArray(value: any): any[];

    export function debounce<T extends Function>(func: T, wait?: number, options?: object): T & Cancelable;

    export function groupBy(collection: Collection, iteratee?: Iteratee): object;

    export function sortBy(collection: Collection, iteratee?: Iteratee[] | Iteratee): any[];

    export function flattenDeep(array: any[]): any[];

    export function without(array: any[], ...values: any[]): any[];

    export function difference(array: any[], ...excludedValuesArrays: any[][]): any[];

    export function intersection(...arrays: any[][]): any[];

    export function union(...arrays: any[][]): any[];

    export function has(object: object, path: PropertyPath): boolean;

    export function result(object: object, propertyPath: PropertyPath, defaultValue?: any): any;

    export function omit(object: object, ...propertyPathsToOmit: PropertyPath[]): object;

    export function pick(object: object, ...propertyPathsToPick: PropertyPath[]): object;

    export function bindAll(object: object, methodNames: PropertyPath[]): object;

    export function forIn(object: object, iteratee?: Iteratee): object;

    export function camelCase(string: string): string;

    export function uniqueId(prefix?: string): string;

    // `merge` has a weird signature
    // typescript cannot express "any number of objects optionally followed by CustomizerFunction"
    export function merge(destinationObject: object, sourceObject: object, customizer?: CustomizerFunction): object;
    export function merge(destinationObject: object, sourceObject1: object, sourceObject2: object, customizer?: CustomizerFunction): object;
    export function merge(destinationObject: object, sourceObject1: object, sourceObject2: object, sourceObject3: object, customizer?: CustomizerFunction): object;
    export function merge(destinationObject: object, sourceObject1: object, sourceObject2: object, sourceObject3: object, sourceObject4: object, customizer?: CustomizerFunction): object;
    // generic but less precise signature for `merge`
    export function merge(destinationObject: object, ...sourceObjectsOptionalFinalCustomizer: SourceObjectsOptionalFinalCustomizer): object;

    // ADDITIONAL SIMPLE UTIL FUNCTIONS:

    export function isBoolean(value: any): boolean;

    export function isObject(value: any): boolean;

    export function isNumber(value: any): boolean;

    export function isString(value: any): boolean;

    export function noop(): void;
}

// env

export namespace env {

    export function addTest(name: string, fn: () => boolean): void;

    export function test(name: string): boolean;
}

// layout

export namespace layout {

    export namespace DirectedGraph {

        interface Edge {
            minLen?: number;
            weight?: number;
            labelpos?: 'l' | 'c' | 'r';
            labeloffset?: number;
            width?: number;
            height?: number;
        }

        interface Node {
            width?: number;
            height?: number;
        }

        interface LayoutOptions {
            dagre?: any;
            graphlib?: any;
            align?: 'UR' | 'UL' |'DR' | 'DL';
            rankDir?: 'TB' | 'BT' | 'LR' | 'RL';
            ranker?: 'network-simplex' | 'tight-tree' | 'longest-path';
            nodeSep?: number;
            edgeSep?: number;
            rankSep?: number;
            marginX?: number;
            marginY?: number;
            resizeClusters?: boolean;
            clusterPadding?: dia.Padding;
            setPosition?: (element: dia.Element, position: dia.BBox) => void;
            setVertices?: boolean | ((link: dia.Link, vertices: dia.Point[]) => void);
            setLabels?: boolean | ((link: dia.Link, position: dia.Point, points: dia.Point[]) => void);
            debugTiming?: boolean;
            exportElement?: (element: dia.Element) => Node;
            exportLink?: (link: dia.Link) => Edge;
            // deprecated
            setLinkVertices?: boolean;
        }

        interface toGraphLibOptions {
            graphlib?: any,
            [key: string]: any
        }

        export function layout(graph: dia.Graph | dia.Cell[], opt?: LayoutOptions): g.Rect;

        export function toGraphLib(graph: dia.Graph, opt?: toGraphLibOptions): any;

        export function fromGraphLib(glGraph: any, opt?: { [key: string]: any }): dia.Graph;
    }
}

// mvc

export namespace mvc {

    interface ViewOptions<T extends Backbone.Model> extends Backbone.ViewOptions<T> {
        theme?: string;
    }

    interface viewEventData {
        [key: string]: any;
    }

    class View<T extends Backbone.Model> extends Backbone.View<T> {

        constructor(opt?: ViewOptions<T>);

        UPDATE_PRIORITY: number;
        DETACHABLE: boolean;
        FLAG_INSERT: number;
        FLAG_REMOVE: number;

        vel: Vectorizer | null;

        options: ViewOptions<T>;

        theme: string;

        themeClassNamePrefix: string

        defaultTheme: string;

        requireSetThemeOverride: boolean;

        documentEvents?: Backbone.EventsHash;

        children?: dia.MarkupJSON;

        childNodes?: { [key: string]: Element } | null;

        setTheme(theme: string, opt?: { override?: boolean }): this;

        getEventNamespace(): string;

        delegateDocumentEvents(events?: Backbone.EventsHash, data?: viewEventData): this;

        undelegateDocumentEvents(): this;

        delegateElementEvents(element: Element, events?: Backbone.EventsHash, data?: viewEventData): this;

        undelegateElementEvents(element: Element): this;

        eventData(evt: dia.Event): viewEventData;
        eventData(evt: dia.Event, data: viewEventData): this;

        stopPropagation(evt: dia.Event): this;
        isPropagationStopped(evt: dia.Event): boolean;

        renderChildren(children?: dia.MarkupJSON): this;

        findAttribute(attributeName: string, node: Element): string | null;

        confirmUpdate(flag: number, opt: { [key: string]: any }): number;

        unmount(): void;

        protected init(): void;

        protected onRender(): void;

        protected onSetTheme(oldTheme: string, newTheme: string): void;

        protected onRemove(): void;
    }
}

// routers

export namespace routers {

    interface NormalRouterArguments {

    }

    interface ManhattanRouterArguments {
        step?: number;
        padding?: dia.Sides;
        maximumLoops?: number;
        maxAllowedDirectionChange?: number;
        perpendicular?: boolean;
        excludeEnds?: dia.LinkEnd[];
        excludeTypes?: string[];
        startDirections?: dia.OrthogonalDirection[];
        endDirections?: dia.OrthogonalDirection[];
    }

    interface OrthogonalRouterArguments {
        elementPadding?: number;
        padding?: dia.Sides;
    }

    interface OneSideRouterArguments {
        side?: dia.OrthogonalDirection;
        padding?: dia.Sides;
    }

    interface RouterArgumentsMap {
        'normal': NormalRouterArguments;
        'manhattan': ManhattanRouterArguments;
        'metro': ManhattanRouterArguments;
        'orthogonal': OrthogonalRouterArguments;
        'oneSide': OneSideRouterArguments;
        [key: string]: { [key: string]: any };
    }

    type RouterType = keyof RouterArgumentsMap;

    type GenericRouterArguments<K extends RouterType> = RouterArgumentsMap[K];

    interface GenericRouter<K extends RouterType> {
        (
            vertices: dia.Point[],
            args?: GenericRouterArguments<K>,
            linkView?: dia.LinkView
        ): dia.Point[];
    }

    interface GenericRouterJSON<K extends RouterType> {
        name: K;
        args?: GenericRouterArguments<K>;
    }

    type RouterArguments = GenericRouterArguments<RouterType>;

    type Router = GenericRouter<RouterType>;

    type RouterJSON = GenericRouterJSON<RouterType>;

    export var manhattan: GenericRouter<'manhattan'>;
    export var metro: GenericRouter<'metro'>;
    export var normal: GenericRouter<'normal'>;
    export var orthogonal: GenericRouter<'orthogonal'>;
    export var oneSide: GenericRouter<'oneSide'>;
}

// connectors

export namespace connectors {

    interface NormalConnectorArguments {
        raw?: boolean;
    }

    interface RoundedConnectorArguments {
        raw?: boolean;
        radius?: number;
    }

    interface SmoothConnectorArguments {
        raw?: boolean;
    }

    interface JumpOverConnectorArguments {
        raw?: boolean;
        size?: number;
        jump?: 'arc' | 'gap' | 'cubic';
        radius?: number;
    }

    interface ConnectorArgumentsMap {
        'normal': NormalConnectorArguments;
        'rounded': RoundedConnectorArguments;
        'smooth': SmoothConnectorArguments;
        'jumpover': JumpOverConnectorArguments;
        [key: string]: { [key: string]: any };
    }

    type ConnectorType = keyof ConnectorArgumentsMap;

    type GenericConnectorArguments<K extends ConnectorType> = ConnectorArgumentsMap[K];

    interface GenericConnector<K extends ConnectorType> {
        (
            sourcePoint: dia.Point,
            targetPoint: dia.Point,
            routePoints: dia.Point[],
            args?: GenericConnectorArguments<K>,
            //linkView?: dia.LinkView
        ): string | g.Path;
    }

    interface GenericConnectorJSON<K extends ConnectorType> {
        name: K;
        args?: GenericConnectorArguments<K>;
    }

    type ConnectorArguments = GenericConnectorArguments<ConnectorType>;

    type Connector = GenericConnector<ConnectorType>;

    type ConnectorJSON = GenericConnectorJSON<ConnectorType>;

    export var normal: GenericConnector<'normal'>;
    export var rounded: GenericConnector<'rounded'>;
    export var smooth: GenericConnector<'smooth'>;
    export var jumpover: GenericConnector<'jumpover'>;
}

// anchors

export namespace anchors {

    interface RotateAnchorArguments {
        rotate?: boolean;
    }

    interface BBoxAnchorArguments extends RotateAnchorArguments {
        dx?: number | string;
        dy?: number | string;
    }

    interface PaddingAnchorArguments {
        padding?: number;
    }

    interface MidSideAnchorArguments extends RotateAnchorArguments, PaddingAnchorArguments {

    }

    interface ModelCenterAnchorArguments {
        dx?: number;
        dy?: number;
    }

    interface AnchorArgumentsMap {
        'center': BBoxAnchorArguments,
        'top': BBoxAnchorArguments,
        'bottom': BBoxAnchorArguments,
        'left': BBoxAnchorArguments,
        'right': BBoxAnchorArguments,
        'topLeft': BBoxAnchorArguments,
        'topRight': BBoxAnchorArguments,
        'bottomLeft': BBoxAnchorArguments,
        'bottomRight': BBoxAnchorArguments,
        'perpendicular': PaddingAnchorArguments;
        'midSide': MidSideAnchorArguments;
        'modelCenter': ModelCenterAnchorArguments;
        'connectionRatio': linkAnchors.ConnectionLengthAnchorArguments;
        'connectionLength': linkAnchors.ConnectionLengthAnchorArguments;
        'connectionPerpendicular': linkAnchors.ConnectionPerpendicularAnchorArguments;
        'connectionClosest': linkAnchors.ConnectionClosestAnchorArguments;
        [key: string]: { [key: string]: any };
    }

    type AnchorType = keyof AnchorArgumentsMap;

    type GenericAnchorArguments<K extends AnchorType> = AnchorArgumentsMap[K];

    interface GenericAnchor<K extends AnchorType> {
        (
            endView: dia.CellView,
            endMagnet: SVGElement,
            anchorReference: g.Point | SVGElement,
            opt: AnchorArgumentsMap[K],
            //endType: string,
            //linkView: dia.LinkView
        ): g.Point;
    }

    interface GenericAnchorJSON<K extends AnchorType> {
        name: K;
        args?: AnchorArgumentsMap[K];
    }

    type AnchorArguments = GenericAnchorArguments<AnchorType>;

    type Anchor = GenericAnchor<AnchorType>;

    type AnchorJSON = GenericAnchorJSON<AnchorType>;

    export var center: GenericAnchor<'center'>;
    export var top: GenericAnchor<'top'>;
    export var bottom: GenericAnchor<'bottom'>;
    export var left: GenericAnchor<'left'>;
    export var right: GenericAnchor<'right'>;
    export var topLeft: GenericAnchor<'topLeft'>;
    export var topRight: GenericAnchor<'topRight'>;
    export var bottomLeft: GenericAnchor<'bottomLeft'>;
    export var bottomRight: GenericAnchor<'bottomRight'>;
    export var perpendicular: GenericAnchor<'perpendicular'>;
    export var midSide: GenericAnchor<'midSide'>;
}

export namespace linkAnchors {

    interface ConnectionLengthAnchorArguments {
        length?: number
    }

    interface ConnectionRatioAnchorArguments {
        ratio?: number
    }

    interface ConnectionPerpendicularAnchorArguments {
        fallbackAt?: number | string;
        fixedAt?: number | string;
    }

    interface ConnectionClosestAnchorArguments {
        fixedAt?: number | string;
    }

    export var connectionRatio: anchors.GenericAnchor<'connectionRatio'>;
    export var connectionLength: anchors.GenericAnchor<'connectionLength'>;
    export var connectionPerpendicular: anchors.GenericAnchor<'connectionPerpendicular'>;
    export var connectionClosest: anchors.GenericAnchor<'connectionClosest'>;
}

// connection points

export namespace connectionPoints {

    type ConnectionPointAlignment = 'top' | 'bottom' | 'left' | 'right';

    interface DefaultConnectionPointArguments {
        offset?: number | dia.Point;
    }

    interface AlignConnectionPointArguments extends DefaultConnectionPointArguments {
        align?: ConnectionPointAlignment | null;
        alignOffset?: number;
    }

    interface StrokeConnectionPointArguments extends DefaultConnectionPointArguments {
        stroke?: boolean;
    }

    interface BoundaryConnectionPointArguments extends StrokeConnectionPointArguments {
        selector?: Array<string | number> | string;
        precision?: number;
        extrapolate?: boolean;
        sticky?: boolean;
        insideout?: boolean;
    }

    interface ConnectionPointArgumentsMap {
        'anchor': DefaultConnectionPointArguments,
        'bbox': StrokeConnectionPointArguments,
        'rectangle': StrokeConnectionPointArguments,
        'boundary': BoundaryConnectionPointArguments,
        [key: string]: { [key: string]: any };
    }

    type ConnectionPointType = keyof ConnectionPointArgumentsMap;

    type GenericConnectionPointArguments<K extends ConnectionPointType> = ConnectionPointArgumentsMap[K];

    interface GenericConnectionPoint<K extends ConnectionPointType> {
        (
            endPathSegmentLine: g.Line,
            endView: dia.CellView,
            endMagnet: SVGElement,
            opt: ConnectionPointArgumentsMap[K],
            //endType: string,
            //linkView: dia.LinkView
        ): g.Point;
    }

    interface GenericConnectionPointJSON<K extends ConnectionPointType> {
        name: K;
        args?: ConnectionPointArgumentsMap[K];
    }

    type ConnectionPointArguments = GenericConnectionPointArguments<ConnectionPointType>;

    type ConnectionPoint = GenericConnectionPoint<ConnectionPointType>;

    type ConnectionPointJSON = GenericConnectionPointJSON<ConnectionPointType>;

    export var anchor: GenericConnectionPoint<'anchor'>;
    export var bbox: GenericConnectionPoint<'bbox'>;
    export var rectangle: GenericConnectionPoint<'rectangle'>;
    export var boundary: GenericConnectionPoint<'boundary'>;
}

export namespace connectionStrategies {

    interface ConnectionStrategy {
        (
            endDefinition: dia.Link.EndJSON,
            endView: dia.CellView,
            endMagnet: SVGElement,
            coords: dia.Point,
            link: dia.Link,
            endType: dia.LinkEnd
        ): dia.Link.EndJSON;
    }

    export var useDefaults: ConnectionStrategy;
    export var pinAbsolute: ConnectionStrategy;
    export var pinRelative: ConnectionStrategy;
}

export namespace attributes {

    interface SVGCoreAttributes {
        'id'?: string;
        'xml:base'?: string;
        'xml:lang'?: string;
        'xml:space'?: string;
        'tabindex'?: number;
    }

    interface SVGConditionalProcessingAttributes {
        'requiredExtensions'?: boolean;
        'requiredFeatures'?: string;
        'systemLanguage'?: string;
    }

    interface SVGXLinkAttributes {
        'xlink:href'?: string;
        'xlink:type'?: string;
        'xlink:role'?: string;
        'xlink:arcrole'?: string;
        'xlink:title'?: string;
        'xlink:show'?: string;
        'xlink:actuate'?: string;
    }

    interface SVGPresentationAttributes {
        'alignment-baseline'?: any;
        'baseline-shift'?: any;
        'clip'?: any;
        'clip-path'?: any;
        'clip-rule'?: any;
        'color'?: any;
        'color-interpolation'?: any;
        'color-interpolation-filters'?: any;
        'color-profile'?: any;
        'color-rendering'?: any;
        'cursor'?: any;
        'direction'?: any;
        'display'?: any;
        'dominant-baseline'?: any;
        'enable-background'?: any;
        'fill'?: any;
        'fill-opacity'?: any;
        'fill-rule'?: any;
        'filter'?: any;
        'flood-color'?: any;
        'flood-opacity'?: any;
        'font-family'?: any;
        'font-size'?: any;
        'font-size-adjust'?: any;
        'font-stretch'?: any;
        'font-style'?: any;
        'font-variant'?: any;
        'font-weight'?: any;
        'glyph-orientation-horizontal'?: any;
        'glyph-orientation-vertical'?: any;
        'image-rendering'?: any;
        'kerning'?: any;
        'letter-spacing'?: any;
        'lighting-color'?: any;
        'marker-end'?: any;
        'marker-mid'?: any;
        'marker-start'?: any;
        'mask'?: any;
        'opacity'?: any;
        'overflow'?: any;
        'pointer-events'?: any;
        'shape-rendering'?: any;
        'stop-color'?: any;
        'stop-opacity'?: any;
        'stroke'?: any;
        'stroke-dasharray'?: any;
        'stroke-dashoffset'?: any;
        'stroke-linecap'?: any;
        'stroke-linejoin'?: any;
        'stroke-miterlimit'?: any;
        'stroke-opacity'?: any;
        'stroke-width'?: any;
        'text-anchor'?: any;
        'text-decoration'?: any;
        'text-rendering'?: any;
        'unicode-bidi'?: any;
        'visibility'?: any;
        'word-spacing'?: any;
        'writing-mode'?: any;
    }

    interface NativeSVGAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes, SVGXLinkAttributes {
        'class'?: string;
        'style'?: any;
        'transform'?: string;
        'externalResourcesRequired'?: boolean;

        [key: string]: any;
    }

    interface SVGAttributeTextWrap {
        text?: string;
        width?: string | number;
        height?: string | number;
        ellipsis?: boolean | string;
        hyphen?: string;
        maxLineCount?: number;
        [key: string]: any
    }

    interface SVGAttributes extends NativeSVGAttributes {
        // Special attributes
        eol?: string;
        filter?: string | { [key: string]: any };
        fill?: string | { [key: string]: any };
        stroke?: string | { [key: string]: any };
        sourceMarker?: { [key: string]: any };
        targetMarker?: { [key: string]: any };
        vertexMarker?: { [key: string]: any };
        text?: string;
        textWrap?: SVGAttributeTextWrap;
        lineHeight?: number | string;
        textPath?: any;
        annotations?: any;
        port?: string | { [key: string]: any };
        style?: { [key: string]: any };
        html?: string;
        ref?: string;
        refX?: string | number;
        refY?: string | number;
        refX2?: string | number;
        refY2?: string | number;
        refDx?: string | number;
        refDy?: string | number;
        refWidth?: string | number;
        refHeight?: string | number;
        refRx?: string | number;
        refRy?: string | number;
        refR?: string | number;
        refRInscribed?: string | number; // alias for refR
        refRCircumscribed?: string | number;
        refCx?: string | number;
        refCy?: string | number;
        refD?: string;
        refDResetOffset?: string; // alias for refD
        refDKeepOffset?: string;
        refPoints?: string;
        refPointsResetOffset?: string; // alias for refPoints
        refPointsKeepOffset?: string;
        resetOffset?: boolean;
        displayEmpty?: boolean;
        xAlignment?: 'middle' | 'right' | number | string;
        yAlignment?: 'middle' | 'bottom' | number | string;
        event?: string;
        magnet?: boolean | string;
        title?: string;
        textVerticalAnchor?: 'bottom' | 'top' | 'middle' | number | string;
        connection?: boolean | { stubs?: number };
        atConnectionLength?: number;
        atConnectionLengthKeepGradient?: number; // alias for atConnectionLength
        atConnectionLengthIgnoreGradient?: number;
        atConnectionRatio?: number;
        atConnectionRatioKeepGradient?: number; // alias for atConnectionRatio
        atConnectionRatioIgnoreGradient?: number;
        magnetSelector?: string;
        highlighterSelector?: string;
        containerSelector?: string;
        // CamelCase variants of native attributes
        alignmentBaseline?: any;
        baselineShift?: any;
        clipPath?: any;
        clipRule?: any;
        colorInterpolation?: any;
        colorInterpolationFilters?: any;
        colorProfile?: any;
        colorRendering?: any;
        dominantBaseline?: any;
        enableBackground?: any;
        fillOpacity?: any;
        fillRule?: any;
        floodColor?: any;
        floodOpacity?: any;
        fontFamily?: any;
        fontSize?: any;
        fontSizeAdjust?: any;
        fontStretch?: any;
        fontStyle?: any;
        fontVariant?: any;
        fontWeight?: any;
        glyphOrientationHorizontal?: any;
        glyphOrientationVertical?: any;
        imageRendering?: any;
        letterSpacing?: any;
        lightingColor?: any;
        markerEnd?: any;
        markerMid?: any;
        markerStart?: any;
        pointerEvents?: any;
        shapeRendering?: any;
        stopColor?: any;
        stopOpacity?: any;
        strokeDasharray?: any;
        strokeDashoffset?: any;
        strokeLinecap?: any;
        strokeLinejoin?: any;
        strokeMiterlimit?: any;
        strokeOpacity?: any;
        strokeWidth?: any;
        textAnchor?: any;
        textDecoration?: any;
        textRendering?: any;
        unicodeBidi?: any;
        wordSpacing?: any;
        writingMode?: any;
        xlinkHref?: string;
        xlinkShow?: string;
        xlinkType?: string;
        xlinkRole?: string;
        xlinkArcrole?: string;
        xlinkTitle?: string;
        xlinkActuate?: string;
        xmlSpace?: string;
        xmlBase?: string;
        xmlLang?: string;
        // Backwards compatibility
        'ref-x'?: string | number;
        'ref-y'?: string | number;
        'ref-dx'?: string | number;
        'ref-dy'?: string | number;
        'ref-width'?: string | number;
        'ref-height'?: string | number;
        'x-alignment'?: 'middle' | 'right' | number | string;
        'y-alignment'?: 'middle' | 'bottom' | number | string;
    }

    interface SVGTextAttributes extends SVGAttributes {
        x?: string | number;
        y?: string | number;
        dx?: string | number;
        dy?: string | number;
        rotate?: string;
        textAnchor?: string;
        textLength?: number;
        lengthAdjust?: string;
        'text-anchor'?: string;
        'text-lenght'?: number;
        'length-adjust'?: string;
    }

    interface SVGRectAttributes extends SVGAttributes {
        x?: string | number;
        y?: string | number;
        width?: string | number;
        height?: string | number;
        ry?: string | number;
        rx?: string | number;
    }

    interface SVGCircleAttributes extends SVGAttributes {
        cx?: string | number;
        cy?: string | number;
        r?: string | number;
    }

    interface SVGEllipseAttributes extends SVGAttributes {
        cx?: string | number;
        cy?: string | number;
        rx?: string | number;
        ry?: string | number;
    }

    interface SVGPolygonAttributes extends SVGAttributes {
        points?: string;
    }

    interface SVGPolylineAttributes extends SVGAttributes {
        points?: string;
    }

    interface SVGImageAttributes extends SVGAttributes {
        x?: string | number;
        y?: string | number;
        width?: string | number;
        height?: string | number;
        preserveAspectRatio?: string;
    }

    interface SVGPathAttributes extends SVGAttributes {
        d?: string;
        pathLength?: number;
        'path-length'?: number;
    }

}

export function setTheme(theme: string): void;

export namespace elementTools {

    namespace Button {

        type ActionCallback = (evt: dia.Event, view: dia.ElementView, tool: dia.ToolView) => void;

        interface Options extends dia.ToolView.Options {
            x?: number | string;
            y?: number | string;
            offset?: { x?: number, y?: number };
            rotate?: boolean;
            action?: ActionCallback;
            markup?: dia.MarkupJSON;
            useModelGeometry?: boolean;
        }
    }

    class Button extends dia.ToolView {

        constructor(opt?: Button.Options);

        protected onPointerDown(evt: dia.Event): void;
    }

    class Remove extends Button {

    }

    namespace Boundary {
        interface Options extends dia.ToolView.Options {
            padding?: number | dia.Sides;
            useModelGeometry?: boolean;
            rotate?: boolean;
        }
    }

    class Boundary extends dia.ToolView {

        constructor(opt?: Boundary.Options);
    }
}

export namespace linkTools {

    type AnchorCallback<T> = (
        coords: g.Point,
        view: dia.CellView,
        magnet: SVGElement,
        type: string,
        linkView: dia.LinkView,
        toolView: dia.ToolView
    ) => T;

    namespace Vertices {
        interface Options extends dia.ToolView.Options {
            handleClass?: any;
            snapRadius?: number;
            redundancyRemoval?: boolean;
            vertexAdding?: boolean;
            stopPropagation?: boolean;
        }
    }

    class Vertices extends dia.ToolView {

        constructor(opt?: Vertices.Options);
    }

    namespace Segments {
        interface Options extends dia.ToolView.Options {
            handleClass?: any;
            snapRadius?: number;
            snapHandle?: boolean;
            redundancyRemoval?: boolean;
            segmentLengthThreshold?: number;
            anchor?: AnchorCallback<anchors.AnchorJSON>;
            stopPropagation?: boolean;
        }
    }

    class Segments extends dia.ToolView {

        constructor(opt?: Segments.Options);
    }

    abstract class Arrowhead extends dia.ToolView {

        ratio: number;
        arrowheadType: string;

        protected onPointerDown(evt: dia.Event): void;

        protected onPointerMove(evt: dia.Event): void;

        protected onPointerUp(evt: dia.Event): void;
    }

    class SourceArrowhead extends Arrowhead {


    }

    class TargetArrowhead extends Arrowhead {


    }

    namespace Anchor {
        interface Options extends dia.ToolView.Options {
            snap?: AnchorCallback<dia.Point>,
            anchor?: AnchorCallback<anchors.AnchorJSON>,
            resetAnchor?: boolean | anchors.AnchorJSON;
            customAnchorAttributes?: attributes.NativeSVGAttributes;
            defaultAnchorAttributes?: attributes.NativeSVGAttributes;
            areaPadding?: number;
            snapRadius?: number;
            restrictArea?: boolean;
            redundancyRemoval?: boolean;
        }
    }

    abstract class Anchor extends dia.ToolView {

        type: string;

        constructor(opt?: Anchor.Options);
    }

    class SourceAnchor extends Anchor {


    }

    class TargetAnchor extends Anchor {


    }

    namespace Button {

        type ActionCallback = (evt: dia.Event, view: dia.LinkView, tool: dia.ToolView) => void;

        interface Options extends dia.ToolView.Options {
            distance?: number | string;
            offset?: number;
            rotate?: boolean;
            action?: ActionCallback;
            markup?: dia.MarkupJSON;
        }
    }

    class Button extends dia.ToolView {

        constructor(opt?: Button.Options);

        protected onPointerDown(evt: dia.Event): void;
    }

    class Remove extends Button {

    }

    namespace Boundary {
        interface Options extends dia.ToolView.Options {
            padding?: number | dia.Sides;
            useModelGeometry?: boolean;
        }
    }

    class Boundary extends dia.ToolView {

        constructor(opt?: Boundary.Options);
    }
}
