
export type Defaults = {
    attribPrefix?: string;
    textureColor?: number[];
    crossOrigin?: string;
    addExtensionsToContext?: boolean;
};
export function setDefaults(newDefaults: Defaults): void;
export function addExtensionsToContext(gl: WebGLRenderingContext): void;
export function createContext(canvas: HTMLCanvasElement): WebGLRenderingContext;
export function getContext(canvas: HTMLCanvasElement, opt_attribs?: WebGLContextAttributes): WebGLRenderingContext;
export function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement, multiplier?: number): boolean;
export type AttribInfo = {
    value?: number[] | ArrayBufferView;
    numComponents?: number;
    size?: number;
    type?: number;
    normalize?: boolean;
    offset?: number;
    stride?: number;
    divisor?: number;
    buffer: WebGLBuffer;
    drawType?: number;
};
export type FullArraySpec = {
    value?: number[] | ArrayBufferView;
    data: number | number[] | ArrayBufferView;
    numComponents?: number;
    type?: Function;
    size?: number;
    normalize?: boolean;
    stride?: number;
    offset?: number;
    divisor?: number;
    attrib?: string;
    name?: string;
    attribName?: string;
    buffer?: WebGLBuffer;
};
export type ArraySpec = number | number[] | ArrayBufferView | FullArraySpec;
export type Arrays = {
    [key: string]: ArraySpec;
};
export type BufferInfo = {
    numElements: number;
    elementType?: number;
    indices?: WebGLBuffer;
    attribs?: {
        [key: string]: AttribInfo;
    };
};
export type DrawObject = {
    active?: boolean;
    type?: number;
    programInfo: ProgramInfo;
    bufferInfo?: BufferInfo;
    vertexArrayInfo?: VertexArrayInfo;
    uniforms: {
        [key: string]: any;
    };
    offset?: number;
    count?: number;
    instanceCount?: number;
};
export type AttachmentOptions = TextureOptions & {
    attachmentPoint?: number;
    format?: number;
    type?: number;
    target?: number;
    samples?: number;
    level?: number;
    layer?: number;
    attachment?: WebGLRenderbuffer | WebGLTexture;
};
export type FramebufferInfo = {
    framebuffer: WebGLFramebuffer;
    attachments: (WebGLRenderbuffer | WebGLTexture)[];
    width: number;
    height: number;
};
export type ErrorCallback = (msg: string, lineOffset?: number) => void;
export type ProgramOptions = {
    errorCallback?: (...params: any[]) => any;
    attribLocations?: {
        [key: string]: number;
    };
    transformFeedbackVaryings?: BufferInfo | {
        [key: string]: AttribInfo;
    } | string[];
    transformFeedbackMode?: number;
    callback?: ProgramCallback;
};
export type TransformFeedbackInfo = {
    index: number;
    type: number;
    size: number;
};
export function createTransformFeedbackInfo(gl: WebGLRenderingContext, program: WebGLProgram): {
    [key: string]: TransformFeedbackInfo;
};
export function bindTransformFeedbackInfo(gl: WebGLRenderingContext, transformFeedbackInfo: ProgramInfo | {
    [key: string]: TransformFeedbackInfo;
}, bufferInfo?: BufferInfo | {
    [key: string]: AttribInfo;
}): void;
export function createTransformFeedback(gl: WebGLRenderingContext, programInfo: ProgramInfo, bufferInfo?: BufferInfo | {
    [key: string]: AttribInfo;
}): WebGLTransformFeedback;
export type UniformData = {
    name: string;
    type: number;
    size: number;
    blockNdx: number;
    offset: number;
};
export type BlockSpec = {
    index: number;
    size: number;
    uniformIndices: number[];
    usedByVertexShader: boolean;
    usedByFragmentShader: boolean;
    used: boolean;
};
export type UniformBlockSpec = {
    blockSpecs: {
        [key: string]: BlockSpec;
    };
    uniformData: UniformData[];
};
export type UniformBlockInfo = {
    name: string;
    array: ArrayBuffer;
    asFloat: Float32Array;
    buffer: WebGLBuffer;
    offset?: number;
    uniforms: {
        [key: string]: ArrayBufferView;
    };
    setters: {
        [key: string]: (...params: any[]) => any;
    };
};
export type ProgramInfo = {
    program: WebGLProgram;
    uniformSetters: {
        [key: string]: (...params: any[]) => any;
    };
    attribSetters: {
        [key: string]: (...params: any[]) => any;
    };
    uniformBlockSpec?: UniformBlockSpec;
    transformFeedbackInfo?: {
        [key: string]: TransformFeedbackInfo;
    };
};
export type TextureFunc = (gl: WebGLRenderingContext, options: TextureOptions) => any;
export type TextureOptions = {
    target?: number;
    level?: number;
    width?: number;
    height?: number;
    depth?: number;
    min?: number;
    mag?: number;
    minMag?: number;
    internalFormat?: number;
    format?: number;
    type?: number;
    wrap?: number;
    wrapS?: number;
    wrapT?: number;
    wrapR?: number;
    minLod?: number;
    maxLod?: number;
    baseLevel?: number;
    maxLevel?: number;
    unpackAlignment?: number;
    color?: number[] | ArrayBufferView;
    premultiplyAlpha?: number;
    flipY?: number;
    colorspaceConversion?: number;
    auto?: boolean;
    cubeFaceOrder?: number[];
    src?: number[] | ArrayBufferView | TexImageSource | TexImageSource[] | string | string[] | TextureFunc;
    crossOrigin?: string;
};
export type TextureSrc = HTMLImageElement | HTMLImageElement[];
export type TextureReadyCallback = (err: any, texture: WebGLTexture, source: TextureSrc) => void;
export type TexturesReadyCallback = (err: any, textures: {
    [key: string]: WebGLTexture;
}, sources: {
    [key: string]: TextureSrc;
}) => void;
export type CubemapReadyCallback = (err: any, tex: WebGLTexture, imgs: HTMLImageElement[]) => void;
export type ThreeDReadyCallback = (err: any, tex: WebGLTexture, imgs: HTMLImageElement[]) => void;
export function isWebGL2(gl: WebGLRenderingContext): boolean;
export function isWebGL1(gl: WebGLRenderingContext): boolean;
export function glEnumToString(gl: WebGLRenderingContext, value: number): string;
export type VertexArrayInfo = {
    numElements: number;
    elementType?: number;
    vertexArrayObject?: WebGLVertexArrayObject;
};
export function setAttribInfoBufferFromArray(gl: WebGLRenderingContext, attribInfo: AttribInfo, array: ArraySpec, offset?: number): void;
export function createBufferInfoFromArrays(gl: WebGLRenderingContext, arrays: Arrays, srcBufferInfo?: BufferInfo): BufferInfo;
export function drawBufferInfo(gl: WebGLRenderingContext, bufferInfo: BufferInfo | VertexArrayInfo, type?: number, count?: number, offset?: number, instanceCount?: number): void;
export function drawObjectList(gl: WebGLRenderingContext, objectsToDraw: DrawObject[]): void;
export function createFramebufferInfo(gl: WebGLRenderingContext, attachments?: AttachmentOptions[], width?: number, height?: number): FramebufferInfo;
export function resizeFramebufferInfo(gl: WebGLRenderingContext, framebufferInfo: FramebufferInfo, attachments?: AttachmentOptions[], width?: number, height?: number): void;
export function bindFramebufferInfo(gl: WebGLRenderingContext, framebufferInfo?: FramebufferInfo | null, target?: number): void;
export function createProgramInfo(gl: WebGLRenderingContext, shaderSources: string[], opt_attribs?: ProgramOptions | string[] | ErrorCallback, opt_errorCallback?: ErrorCallback): ProgramInfo;
export function createUniformBlockInfo(gl: WebGL2RenderingContext, programInfo: ProgramInfo, blockName: string): UniformBlockInfo;
export function bindUniformBlock(gl: WebGL2RenderingContext, programInfo: ProgramInfo | UniformBlockSpec, uniformBlockInfo: UniformBlockInfo): boolean;
export function setUniformBlock(gl: WebGL2RenderingContext, programInfo: ProgramInfo | UniformBlockSpec, uniformBlockInfo: UniformBlockInfo): void;
export function setBlockUniforms(uniformBlockInfo: UniformBlockInfo, values: {
    [key: string]: any;
}): void;
export function setUniforms(setters: ProgramInfo | {
    [key: string]: (...params: any[]) => any;
}, values: {
    [key: string]: any;
}): void;
export function setBuffersAndAttributes(gl: WebGLRenderingContext, setters: ProgramInfo | {
    [key: string]: (...params: any[]) => any;
}, buffers: BufferInfo | VertexArrayInfo): void;
export function setTextureFromArray(gl: WebGLRenderingContext, tex: WebGLTexture, src: number[] | ArrayBufferView, options?: TextureOptions): void;
export function createTexture(gl: WebGLRenderingContext, options?: TextureOptions, callback?: TextureReadyCallback): WebGLTexture;
export function resizeTexture(gl: WebGLRenderingContext, tex: WebGLTexture, options: TextureOptions, width?: number, height?: number, depth?: number): void;
export function createTextures(gl: WebGLRenderingContext, options: {
    [key: string]: TextureOptions;
}, callback?: TexturesReadyCallback): {
    [key: string]: WebGLTexture;
};


export function setAttributePrefix(prefix: string): void;
export function createBufferFromTypedArray(gl: WebGLRenderingContext, typedArray: ArrayBuffer | SharedArrayBuffer | ArrayBufferView | WebGLBuffer, type?: number, drawType?: number): WebGLBuffer;
export function createAttribsFromArrays(gl: WebGLRenderingContext, arrays: Arrays, srcBufferInfo?: BufferInfo): {
    [key: string]: AttribInfo;
};
export function setAttribInfoBufferFromArray(gl: WebGLRenderingContext, attribInfo: AttribInfo, array: ArraySpec, offset?: number): void;
export function createBufferInfoFromArrays(gl: WebGLRenderingContext, arrays: Arrays, srcBufferInfo?: BufferInfo): BufferInfo;
export function createBufferFromArray(gl: WebGLRenderingContext, array: ArraySpec, arrayName: string): WebGLBuffer;
export function createBuffersFromArrays(gl: WebGLRenderingContext, arrays: Arrays): {
    [key: string]: WebGLBuffer;
};


export function drawBufferInfo(gl: WebGLRenderingContext, bufferInfo: BufferInfo | VertexArrayInfo, type?: number, count?: number, offset?: number, instanceCount?: number): void;
export function drawObjectList(gl: WebGLRenderingContext, objectsToDraw: DrawObject[]): void;


export function createFramebufferInfo(gl: WebGLRenderingContext, attachments?: AttachmentOptions[], width?: number, height?: number): FramebufferInfo;
export function resizeFramebufferInfo(gl: WebGLRenderingContext, framebufferInfo: FramebufferInfo, attachments?: AttachmentOptions[], width?: number, height?: number): void;
export function bindFramebufferInfo(gl: WebGLRenderingContext, framebufferInfo?: FramebufferInfo | null, target?: number): void;


export type ProgramCallback = (err?: string, result?: WebGLProgram | ProgramInfo) => void;
export function createProgram(gl: WebGLRenderingContext, shaders: WebGLShader[] | string[], opt_attribs?: ProgramOptions | string[] | ErrorCallback, opt_errorCallback?: ErrorCallback): WebGLProgram;
export function createProgramAsync(gl: WebGLRenderingContext, shaders: WebGLShader[] | string[], opt_attribs?: ProgramOptions | string[] | ErrorCallback, opt_errorCallback?: ErrorCallback): Promise<WebGLProgram>;
export function createProgramInfoAsync(gl: WebGLRenderingContext, shaderSources: string[], opt_attribs?: ProgramOptions | string[] | ErrorCallback, opt_errorCallback?: ErrorCallback): Promise<ProgramInfo>;
export function createProgramFromScripts(gl: WebGLRenderingContext, shaderScriptIds: string[], opt_attribs?: ProgramOptions | string[] | ErrorCallback, opt_errorCallback?: ErrorCallback): WebGLProgram;
export function createProgramFromSources(gl: WebGLRenderingContext, shaderSources: string[], opt_attribs?: ProgramOptions | string[] | ErrorCallback, opt_errorCallback?: ErrorCallback): WebGLProgram;
export function createUniformSetters(gl: WebGLRenderingContext, program: WebGLProgram): {
    [key: string]: (...params: any[]) => any;
};
export function createUniformBlockSpecFromProgram(gl: WebGL2RenderingContext, program: WebGLProgram): UniformBlockSpec;
export function createUniformBlockInfoFromProgram(gl: WebGL2RenderingContext, program: WebGLProgram, blockName: string): UniformBlockInfo;
export function createUniformBlockInfo(gl: WebGL2RenderingContext, programInfo: ProgramInfo, blockName: string): UniformBlockInfo;
export function bindUniformBlock(gl: WebGL2RenderingContext, programInfo: ProgramInfo | UniformBlockSpec, uniformBlockInfo: UniformBlockInfo): boolean;
export function setUniformBlock(gl: WebGL2RenderingContext, programInfo: ProgramInfo | UniformBlockSpec, uniformBlockInfo: UniformBlockInfo): void;
export function setBlockUniforms(uniformBlockInfo: UniformBlockInfo, values: {
    [key: string]: any;
}): void;
export function setUniforms(setters: ProgramInfo | {
    [key: string]: (...params: any[]) => any;
}, values: {
    [key: string]: any;
}): void;
export function setUniformsAndBindTextures(setters: ProgramInfo | {
    [key: string]: (...params: any[]) => any;
}, values: {
    [key: string]: any;
}): void;
export function createAttributeSetters(gl: WebGLRenderingContext, program: WebGLProgram): {
    [key: string]: (...params: any[]) => any;
};
export function setBuffersAndAttributes(gl: WebGLRenderingContext, setters: ProgramInfo | {
    [key: string]: (...params: any[]) => any;
}, buffers: BufferInfo | VertexArrayInfo): void;
export function createProgramInfoFromProgram(gl: WebGLRenderingContext, program: WebGLProgram): ProgramInfo;
export function createProgramInfo(gl: WebGLRenderingContext, shaderSources: string[], opt_attribs?: ProgramOptions | string[] | ErrorCallback, opt_errorCallback?: ErrorCallback): ProgramInfo;


export function getBytesPerElementForInternalFormat(internalFormat: number, type: number): number;
export type TextureFormatInfo = {
    format: number;
    type: number;
};
export function getFormatAndTypeForInternalFormat(internalFormat: number): TextureFormatInfo;
export function canGenerateMipmap(gl: WebGLRenderingContext, width: number, height: number, internalFormat: number): boolean;
export function canFilter(internalFormat: number): boolean;
export function getNumComponentsForFormat(format: number): number;
export function setDefaultTextureColor(color: number[]): void;
export function setTextureParameters(gl: WebGLRenderingContext, tex: WebGLTexture, options: TextureOptions): void;
export function setSamplerParameters(gl: WebGLRenderingContext, sampler: WebGLSampler, options: TextureOptions): void;
export function setTextureFilteringForSize(gl: WebGLRenderingContext, tex: WebGLTexture, options?: TextureOptions, width?: number, height?: number, internalFormat?: number): void;
export function setTextureFromElement(gl: WebGLRenderingContext, tex: WebGLTexture, element: HTMLElement, options?: TextureOptions): void;
export function loadTextureFromUrl(gl: WebGLRenderingContext, tex: WebGLTexture, options?: TextureOptions, callback?: TextureReadyCallback): HTMLImageElement;
export function setTextureFromArray(gl: WebGLRenderingContext, tex: WebGLTexture, src: number[] | ArrayBufferView, options?: TextureOptions): void;
export function setEmptyTexture(gl: WebGLRenderingContext, tex: WebGLTexture, options: TextureOptions): void;
export function createTexture(gl: WebGLRenderingContext, options?: TextureOptions, callback?: TextureReadyCallback): WebGLTexture;
export function resizeTexture(gl: WebGLRenderingContext, tex: WebGLTexture, options: TextureOptions, width?: number, height?: number, depth?: number): void;
export function createTextures(gl: WebGLRenderingContext, options: {
    [key: string]: TextureOptions;
}, callback?: TexturesReadyCallback): {
    [key: string]: WebGLTexture;
};


export function getGLTypeForTypedArray(typedArray: ArrayBufferView): number;
export function getGLTypeForTypedArrayType(typedArrayType: ArrayBufferView): number;
export function getTypedArrayTypeForGLType(type: number): (...params: any[]) => any;


export function createVertexArrayInfo(gl: WebGLRenderingContext, programInfo: ProgramInfo | ProgramInfo[], bufferInfo: BufferInfo): VertexArrayInfo;
export function createVAOAndSetAttributes(gl: WebGLRenderingContext, setters: {
    [key: string]: (...params: any[]) => any;
}, attribs: {
    [key: string]: AttribInfo;
}, indices?: WebGLBuffer): WebGLVertexArrayObject | null;
export function createVAOFromBufferInfo(gl: WebGLRenderingContext, programInfo: {
    [key: string]: (...params: any[]) => any;
} | ProgramInfo, bufferInfo: BufferInfo, indices?: WebGLBuffer): WebGLVertexArrayObject | null;
