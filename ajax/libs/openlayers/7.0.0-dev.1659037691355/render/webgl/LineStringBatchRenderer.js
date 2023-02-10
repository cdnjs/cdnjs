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
/**
 * @module ol/render/webgl/LineStringBatchRenderer
 */
import AbstractBatchRenderer from './BatchRenderer.js';
import { AttributeType } from '../../webgl/Helper.js';
import { transform2D } from '../../geom/flat/transform.js';
/**
 * Names of attributes made available to the vertex shader.
 * Please note: changing these *will* break custom shaders!
 * @enum {string}
 */
export var Attributes = {
    SEGMENT_START: 'a_segmentStart',
    SEGMENT_END: 'a_segmentEnd',
    PARAMETERS: 'a_parameters',
};
var LineStringBatchRenderer = /** @class */ (function (_super) {
    __extends(LineStringBatchRenderer, _super);
    /**
     * @param {import("../../webgl/Helper.js").default} helper WebGL helper instance
     * @param {Worker} worker WebGL worker instance
     * @param {string} vertexShader Vertex shader
     * @param {string} fragmentShader Fragment shader
     * @param {Array<import('./BatchRenderer.js').CustomAttribute>} customAttributes List of custom attributes
     */
    function LineStringBatchRenderer(helper, worker, vertexShader, fragmentShader, customAttributes) {
        var _this = _super.call(this, helper, worker, vertexShader, fragmentShader, customAttributes) || this;
        // vertices for lines must hold both a position (x,y) and an offset (dx,dy)
        _this.attributes = [
            {
                name: Attributes.SEGMENT_START,
                size: 2,
                type: AttributeType.FLOAT,
            },
            {
                name: Attributes.SEGMENT_END,
                size: 2,
                type: AttributeType.FLOAT,
            },
            {
                name: Attributes.PARAMETERS,
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
     * [ customAttr0, ... , customAttrN, numberOfVertices0, x0, y0, ... , xN, yN, numberOfVertices1, ... ]
     * @param {import("./MixedGeometryBatch.js").LineStringGeometryBatch} batch Linestring geometry batch
     * @override
     */
    LineStringBatchRenderer.prototype.generateRenderInstructions = function (batch) {
        // here we anticipate the amount of render instructions for lines:
        // 2 instructions per vertex for position (x and y)
        // + 1 instruction per line per custom attributes
        // + 1 instruction per line (for vertices count)
        var totalInstructionsCount = 2 * batch.verticesCount +
            (1 + this.customAttributes.length) * batch.geometriesCount;
        if (!batch.renderInstructions ||
            batch.renderInstructions.length !== totalInstructionsCount) {
            batch.renderInstructions = new Float32Array(totalInstructionsCount);
        }
        // loop on features to fill the render instructions
        var batchEntry;
        var flatCoords = [];
        var renderIndex = 0;
        var value;
        for (var featureUid in batch.entries) {
            batchEntry = batch.entries[featureUid];
            for (var i = 0, ii = batchEntry.flatCoordss.length; i < ii; i++) {
                flatCoords.length = batchEntry.flatCoordss[i].length;
                transform2D(batchEntry.flatCoordss[i], 0, flatCoords.length, 2, batch.renderInstructionsTransform, flatCoords);
                // custom attributes
                for (var k = 0, kk = this.customAttributes.length; k < kk; k++) {
                    value = this.customAttributes[k].callback(batchEntry.feature);
                    batch.renderInstructions[renderIndex++] = value;
                }
                // vertices count
                batch.renderInstructions[renderIndex++] = flatCoords.length / 2;
                // looping on points for positions
                for (var j = 0, jj = flatCoords.length; j < jj; j += 2) {
                    batch.renderInstructions[renderIndex++] = flatCoords[j];
                    batch.renderInstructions[renderIndex++] = flatCoords[j + 1];
                }
            }
        }
    };
    return LineStringBatchRenderer;
}(AbstractBatchRenderer));
export default LineStringBatchRenderer;
//# sourceMappingURL=LineStringBatchRenderer.js.map