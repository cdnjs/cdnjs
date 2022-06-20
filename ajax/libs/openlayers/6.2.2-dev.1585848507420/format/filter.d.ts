/**
 * Create a logical `<And>` operator between two or more filter conditions.
 *
 * @param {...import("./filter/Filter.js").default} conditions Filter conditions.
 * @returns {!And} `<And>` operator.
 * @api
 */
export function and(...args: import("./filter/Filter.js").default[]): And;
/**
 * Create a logical `<Or>` operator between two or more filter conditions.
 *
 * @param {...import("./filter/Filter.js").default} conditions Filter conditions.
 * @returns {!Or} `<Or>` operator.
 * @api
 */
export function or(...args: import("./filter/Filter.js").default[]): Or;
/**
 * Represents a logical `<Not>` operator for a filter condition.
 *
 * @param {!import("./filter/Filter.js").default} condition Filter condition.
 * @returns {!Not} `<Not>` operator.
 * @api
 */
export function not(condition: import("./filter/Filter.js").default): Not;
/**
 * Create a `<BBOX>` operator to test whether a geometry-valued property
 * intersects a fixed bounding box
 *
 * @param {!string} geometryName Geometry name to use.
 * @param {!import("../extent.js").Extent} extent Extent.
 * @param {string=} opt_srsName SRS name. No srsName attribute will be
 *    set on geometries when this is not provided.
 * @returns {!Bbox} `<BBOX>` operator.
 * @api
 */
export function bbox(geometryName: string, extent: number[], opt_srsName?: string): Bbox;
/**
 * Create a `<Contains>` operator to test whether a geometry-valued property
 * contains a given geometry.
 *
 * @param {!string} geometryName Geometry name to use.
 * @param {!import("../geom/Geometry.js").default} geometry Geometry.
 * @param {string=} opt_srsName SRS name. No srsName attribute will be
 *    set on geometries when this is not provided.
 * @returns {!Contains} `<Contains>` operator.
 * @api
 */
export function contains(geometryName: string, geometry: import("../geom/Geometry.js").default, opt_srsName?: string): Contains;
/**
 * Create a `<Intersects>` operator to test whether a geometry-valued property
 * intersects a given geometry.
 *
 * @param {!string} geometryName Geometry name to use.
 * @param {!import("../geom/Geometry.js").default} geometry Geometry.
 * @param {string=} opt_srsName SRS name. No srsName attribute will be
 *    set on geometries when this is not provided.
 * @returns {!Intersects} `<Intersects>` operator.
 * @api
 */
export function intersects(geometryName: string, geometry: import("../geom/Geometry.js").default, opt_srsName?: string): Intersects;
/**
 * Create a `<Within>` operator to test whether a geometry-valued property
 * is within a given geometry.
 *
 * @param {!string} geometryName Geometry name to use.
 * @param {!import("../geom/Geometry.js").default} geometry Geometry.
 * @param {string=} opt_srsName SRS name. No srsName attribute will be
 *    set on geometries when this is not provided.
 * @returns {!Within} `<Within>` operator.
 * @api
 */
export function within(geometryName: string, geometry: import("../geom/Geometry.js").default, opt_srsName?: string): Within;
/**
 * Creates a `<PropertyIsEqualTo>` comparison operator.
 *
 * @param {!string} propertyName Name of the context property to compare.
 * @param {!(string|number)} expression The value to compare.
 * @param {boolean=} opt_matchCase Case-sensitive?
 * @returns {!EqualTo} `<PropertyIsEqualTo>` operator.
 * @api
 */
export function equalTo(propertyName: string, expression: string | number, opt_matchCase?: boolean): EqualTo;
/**
 * Creates a `<PropertyIsNotEqualTo>` comparison operator.
 *
 * @param {!string} propertyName Name of the context property to compare.
 * @param {!(string|number)} expression The value to compare.
 * @param {boolean=} opt_matchCase Case-sensitive?
 * @returns {!NotEqualTo} `<PropertyIsNotEqualTo>` operator.
 * @api
 */
export function notEqualTo(propertyName: string, expression: string | number, opt_matchCase?: boolean): NotEqualTo;
/**
 * Creates a `<PropertyIsLessThan>` comparison operator.
 *
 * @param {!string} propertyName Name of the context property to compare.
 * @param {!number} expression The value to compare.
 * @returns {!LessThan} `<PropertyIsLessThan>` operator.
 * @api
 */
export function lessThan(propertyName: string, expression: number): LessThan;
/**
 * Creates a `<PropertyIsLessThanOrEqualTo>` comparison operator.
 *
 * @param {!string} propertyName Name of the context property to compare.
 * @param {!number} expression The value to compare.
 * @returns {!LessThanOrEqualTo} `<PropertyIsLessThanOrEqualTo>` operator.
 * @api
 */
export function lessThanOrEqualTo(propertyName: string, expression: number): LessThanOrEqualTo;
/**
 * Creates a `<PropertyIsGreaterThan>` comparison operator.
 *
 * @param {!string} propertyName Name of the context property to compare.
 * @param {!number} expression The value to compare.
 * @returns {!GreaterThan} `<PropertyIsGreaterThan>` operator.
 * @api
 */
export function greaterThan(propertyName: string, expression: number): GreaterThan;
/**
 * Creates a `<PropertyIsGreaterThanOrEqualTo>` comparison operator.
 *
 * @param {!string} propertyName Name of the context property to compare.
 * @param {!number} expression The value to compare.
 * @returns {!GreaterThanOrEqualTo} `<PropertyIsGreaterThanOrEqualTo>` operator.
 * @api
 */
export function greaterThanOrEqualTo(propertyName: string, expression: number): GreaterThanOrEqualTo;
/**
 * Creates a `<PropertyIsNull>` comparison operator to test whether a property value
 * is null.
 *
 * @param {!string} propertyName Name of the context property to compare.
 * @returns {!IsNull} `<PropertyIsNull>` operator.
 * @api
 */
export function isNull(propertyName: string): IsNull;
/**
 * Creates a `<PropertyIsBetween>` comparison operator to test whether an expression
 * value lies within a range given by a lower and upper bound (inclusive).
 *
 * @param {!string} propertyName Name of the context property to compare.
 * @param {!number} lowerBoundary The lower bound of the range.
 * @param {!number} upperBoundary The upper bound of the range.
 * @returns {!IsBetween} `<PropertyIsBetween>` operator.
 * @api
 */
export function between(propertyName: string, lowerBoundary: number, upperBoundary: number): IsBetween;
/**
 * Represents a `<PropertyIsLike>` comparison operator that matches a string property
 * value against a text pattern.
 *
 * @param {!string} propertyName Name of the context property to compare.
 * @param {!string} pattern Text pattern.
 * @param {string=} opt_wildCard Pattern character which matches any sequence of
 *    zero or more string characters. Default is '*'.
 * @param {string=} opt_singleChar pattern character which matches any single
 *    string character. Default is '.'.
 * @param {string=} opt_escapeChar Escape character which can be used to escape
 *    the pattern characters. Default is '!'.
 * @param {boolean=} opt_matchCase Case-sensitive?
 * @returns {!IsLike} `<PropertyIsLike>` operator.
 * @api
 */
export function like(propertyName: string, pattern: string, opt_wildCard?: string, opt_singleChar?: string, opt_escapeChar?: string, opt_matchCase?: boolean): IsLike;
/**
 * Create a `<During>` temporal operator.
 *
 * @param {!string} propertyName Name of the context property to compare.
 * @param {!string} begin The begin date in ISO-8601 format.
 * @param {!string} end The end date in ISO-8601 format.
 * @returns {!During} `<During>` operator.
 * @api
 */
export function during(propertyName: string, begin: string, end: string): During;
import And from "./filter/And.js";
import Or from "./filter/Or.js";
import Not from "./filter/Not.js";
import Bbox from "./filter/Bbox.js";
import Contains from "./filter/Contains.js";
import Intersects from "./filter/Intersects.js";
import Within from "./filter/Within.js";
import EqualTo from "./filter/EqualTo.js";
import NotEqualTo from "./filter/NotEqualTo.js";
import LessThan from "./filter/LessThan.js";
import LessThanOrEqualTo from "./filter/LessThanOrEqualTo.js";
import GreaterThan from "./filter/GreaterThan.js";
import GreaterThanOrEqualTo from "./filter/GreaterThanOrEqualTo.js";
import IsNull from "./filter/IsNull.js";
import IsBetween from "./filter/IsBetween.js";
import IsLike from "./filter/IsLike.js";
import During from "./filter/During.js";
//# sourceMappingURL=filter.d.ts.map