export type WebGLWorkerMessageType = string;
export namespace WebGLWorkerMessageType {
    const GENERATE_POLYGON_BUFFERS: string;
    const GENERATE_POINT_BUFFERS: string;
    const GENERATE_LINE_STRING_BUFFERS: string;
}
/**
 * This message will trigger the generation of a vertex and an index buffer based on the given render instructions.
 * When the buffers are generated, the worked will send a message of the same type to the main thread, with
 * the generated buffers in it.
 * Note that any addition properties present in the message *will* be sent back to the main thread.
 */
export type WebGLWorkerGenerateBuffersMessage = {
    /**
     * Message id; will be used both in request and response as a means of identification
     */
    id: number;
    /**
     * Message type
     */
    type: WebGLWorkerMessageType;
    /**
     * Polygon render instructions raw binary buffer.
     */
    renderInstructions: ArrayBuffer;
    /**
     * Amount of custom attributes count in the polygon render instructions.
     */
    customAttributesCount?: number | undefined;
    /**
     * Vertices array raw binary buffer (sent by the worker).
     */
    vertexBuffer?: ArrayBuffer | undefined;
    /**
     * Indices array raw binary buffer (sent by the worker).
     */
    indexBuffer?: ArrayBuffer | undefined;
    /**
     * Transformation matrix used to project the instructions coordinates
     */
    renderInstructionsTransform?: number[] | undefined;
};
//# sourceMappingURL=constants.d.ts.map