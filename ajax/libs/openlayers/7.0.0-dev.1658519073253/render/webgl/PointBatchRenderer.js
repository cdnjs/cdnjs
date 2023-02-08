/**
 * @module ol/render/webgl/PointBatchRenderer
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import AbstractBatchRenderer from './BatchRenderer.js';
import { AttributeType } from '../../webgl/Helper.js';
import { apply as applyTransform } from '../../transform.js';
/**
 * Names of attributes made available to the vertex shader.
 * Please note: changing these *will* break custom shaders!
 * @enum {string}
 */
export var Attributes = {
    POSITION: 'a_position',
    INDEX: 'a_index',
};
var PointBatchRenderer = /** @class */ (function (_super) {
    __extends(PointBatchRenderer, _super);
    /**
     * @param {import("../../webgl/Helper.js").default} helper WebGL helper instance
     * @param {Worker} worker WebGL worker instance
     * @param {string} vertexShader Vertex shader
     * @param {string} fragmentShader Fragment shader
     * @param {Array<import('./BatchRenderer.js').CustomAttribute>} customAttributes List of custom attributes
     */
    function PointBatchRenderer(helper, worker, vertexShader, fragmentShader, customAttributes) {
        var _this = _super.call(this, helper, worker, vertexShader, fragmentShader, customAttributes) || this;
        // vertices for point must hold both a position (x,y) and an index (their position in the quad)
        _this.attributes = [
            {
                name: Attributes.POSITION,
                size: 2,
                type: AttributeType.FLOAT,
            },
            {
                name: Attributes.INDEX,
                size: 1,
                type: AttributeType.FLOAT,
            },
        ].concat(customAttributes.map(function (attribute) {
            return {
                name: 'a_' + attribute.name,
                size: 1,
                type: AttributeType.FLOAT,
            };
        }));
        return _this;
    }
    /**
     * Render instructions for lines are structured like so:
     * [ x0, y0, customAttr0, ... , xN, yN, customAttrN ]
     * @param {import("./MixedGeometryBatch.js").PointGeometryBatch} batch Point geometry batch
     * @override
     */
    PointBatchRenderer.prototype.generateRenderInstructions = function (batch) {
        // here we anticipate the amount of render instructions for points:
        // 2 instructions per vertex for position (x and y)
        // + 1 instruction per vertex per custom attributes
        var totalInstructionsCount = (2 + this.customAttributes.length) * batch.geometriesCount;
        if (!batch.renderInstructions ||
            batch.renderInstructions.length !== totalInstructionsCount) {
            batch.renderInstructions = new Float32Array(totalInstructionsCount);
        }
        // loop on features to fill the render instructions
        var batchEntry;
        var tmpCoords = [];
        var renderIndex = 0;
        var value;
        for (var featureUid in batch.entries) {
            batchEntry = batch.entries[featureUid];
            for (var i = 0, ii = batchEntry.flatCoordss.length; i < ii; i++) {
                tmpCoords[0] = batchEntry.flatCoordss[i][0];
                tmpCoords[1] = batchEntry.flatCoordss[i][1];
                applyTransform(batch.renderInstructionsTransform, tmpCoords);
                batch.renderInstructions[renderIndex++] = tmpCoords[0];
                batch.renderInstructions[renderIndex++] = tmpCoords[1];
                // pushing custom attributes
                for (var j = 0, jj = this.customAttributes.length; j < jj; j++) {
                    value = this.customAttributes[j].callback(batchEntry.feature);
                    batch.renderInstructions[renderIndex++] = value;
                }
            }
        }
    };
    return PointBatchRenderer;
}(AbstractBatchRenderer));
export default PointBatchRenderer;
//# sourceMappingURL=PointBatchRenderer.js.map