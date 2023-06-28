import EventEmitter from './event-emitter.js';
type RendererRequiredParams = {
    container: HTMLElement | string | null;
};
export type RendererStyleOptions = {
    height: number;
    waveColor: string;
    progressColor: string;
    cursorColor?: string;
    cursorWidth: number;
    minPxPerSec: number;
    fillParent: boolean;
    barWidth?: number;
    barGap?: number;
    barRadius?: number;
    hideScrollbar?: boolean;
    autoCenter?: boolean;
};
type RendererEvents = {
    click: [relativeX: number];
};
type ChannelData = Float32Array[] | Array<number[]>;
declare class Renderer extends EventEmitter<RendererEvents> {
    private static MAX_CANVAS_WIDTH;
    private options;
    private container;
    private scrollContainer;
    private wrapper;
    private canvasWrapper;
    private progressWrapper;
    private timeout;
    private isScrolling;
    private channelData;
    private duration;
    private resizeObserver;
    constructor(params: RendererRequiredParams, options: RendererStyleOptions);
    private initHtml;
    setOptions(options: RendererStyleOptions): void;
    getContainer(): HTMLElement;
    getWrapper(): HTMLElement;
    destroy(): void;
    private delay;
    private renderPeaks;
    render(channelData: ChannelData, duration: number): void;
    reRender(): void;
    zoom(minPxPerSec: number): void;
    renderProgress(progress: number, autoCenter?: boolean): void;
}
export default Renderer;
