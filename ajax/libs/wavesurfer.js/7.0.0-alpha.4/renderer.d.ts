import EventEmitter from './event-emitter.js';
type RendererOptions = {
    container: HTMLElement | string | null;
    height: number;
    waveColor: string;
    progressColor: string;
    minPxPerSec: number;
    barWidth?: number;
    barGap?: number;
    barRadius?: number;
};
type RendererEvents = {
    click: {
        relativeX: number;
    };
};
declare class Renderer extends EventEmitter<RendererEvents> {
    private options;
    private container;
    private scrollContainer;
    private mainCanvas;
    private progressCanvas;
    private cursor;
    private ctx;
    private timeout;
    constructor(options: RendererOptions);
    getContainer(): HTMLElement;
    destroy(): void;
    private delay;
    private renderPeaks;
    private createProgressMask;
    render(channelData: Float32Array[], duration: number): void;
    zoom(channelData: Float32Array[], duration: number, minPxPerSec: number): void;
    renderProgress(progress: number, autoCenter?: boolean): void;
}
export default Renderer;
