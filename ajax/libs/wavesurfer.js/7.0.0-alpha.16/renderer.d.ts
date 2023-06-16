import EventEmitter from './event-emitter.js';
type RendererOptions = {
    container: HTMLElement | string | null;
    height: number;
    waveColor: string;
    progressColor: string;
    cursorColor?: string;
    minPxPerSec: number;
    fillParent: boolean;
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
    private wrapper;
    private mainCanvas;
    private progressCanvas;
    private cursor;
    private ctx;
    private timeout;
    constructor(options: RendererOptions);
    getContainer(): ShadowRoot;
    getWrapper(): HTMLElement;
    destroy(): void;
    private delay;
    private renderPeaks;
    private createProgressMask;
    render(audioData: AudioBuffer): void;
    zoom(audioData: AudioBuffer, minPxPerSec: number): void;
    renderProgress(progress: number, autoCenter?: boolean): void;
}
export default Renderer;
