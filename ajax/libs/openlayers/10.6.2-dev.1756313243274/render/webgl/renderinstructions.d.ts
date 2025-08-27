/**
 * @param {import('./VectorStyleRenderer.js').AttributeDefinitions} customAttributes Custom attributes
 * @return {number} Cumulated size of all attributes
 */
export function getCustomAttributesSize(customAttributes: import("./VectorStyleRenderer.js").AttributeDefinitions): number;
/**
 * Render instructions for lines are structured like so:
 * [ x0, y0, customAttr0, ... , xN, yN, customAttrN ]
 * @param {import("./MixedGeometryBatch.js").PointGeometryBatch} batch Point geometry batch
 * @param {Float32Array} renderInstructions Render instructions
 * @param {import('./VectorStyleRenderer.js').AttributeDefinitions} customAttributes Custom attributes
 * @param {import("../../transform.js").Transform} transform Transform to apply to coordinates
 * @return {Float32Array} Generated render instructions
 */
export function generatePointRenderInstructions(batch: import("./MixedGeometryBatch.js").PointGeometryBatch, renderInstructions: Float32Array, customAttributes: import("./VectorStyleRenderer.js").AttributeDefinitions, transform: import("../../transform.js").Transform): Float32Array;
/**
 * Render instructions for lines are structured like so:
 * [ customAttr0, ... , customAttrN, numberOfVertices0, x0, y0, ... , xN, yN, numberOfVertices1, ... ]
 * @param {import("./MixedGeometryBatch.js").LineStringGeometryBatch} batch Line String geometry batch
 * @param {Float32Array} renderInstructions Render instructions
 * @param {import('./VectorStyleRenderer.js').AttributeDefinitions} customAttributes Custom attributes
 * @param {import("../../transform.js").Transform} transform Transform to apply to coordinates
 * @return {Float32Array} Generated render instructions
 */
export function generateLineStringRenderInstructions(batch: import("./MixedGeometryBatch.js").LineStringGeometryBatch, renderInstructions: Float32Array, customAttributes: import("./VectorStyleRenderer.js").AttributeDefinitions, transform: import("../../transform.js").Transform): Float32Array;
/**
 * Render instructions for polygons are structured like so:
 * [ customAttr0, ..., customAttrN, numberOfRings, numberOfVerticesInRing0, ..., numberOfVerticesInRingN, x0, y0, ..., xN, yN, numberOfRings,... ]
 * @param {import("./MixedGeometryBatch.js").PolygonGeometryBatch} batch Polygon geometry batch
 * @param {Float32Array} renderInstructions Render instructions
 * @param {import('./VectorStyleRenderer.js').AttributeDefinitions} customAttributes Custom attributes
 * @param {import("../../transform.js").Transform} transform Transform to apply to coordinates
 * @return {Float32Array} Generated render instructions
 */
export function generatePolygonRenderInstructions(batch: import("./MixedGeometryBatch.js").PolygonGeometryBatch, renderInstructions: Float32Array, customAttributes: import("./VectorStyleRenderer.js").AttributeDefinitions, transform: import("../../transform.js").Transform): Float32Array;
//# sourceMappingURL=renderinstructions.d.ts.map