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
    private shadowRoot;
    private mainCanvas;
    private progressCanvas;
    private cursor;
    private ctx;
    constructor(options: RendererOptions);
    destroy(): void;
    private renderLinePeaks;
    private renderBarPeaks;
    render(channelData: Float32Array[], duration: number, minPxPerSec?: number): void;
    private createProgressMask;
    renderProgress(progress: number, autoCenter?: boolean): void;
    getContainer(): HTMLElement;
}
export default Renderer;
