var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Renderer from '../renderer.js';
const createAudioBuffer = (channels, duration = 1) => {
    return {
        duration,
        length: channels[0].length,
        sampleRate: channels[0].length / duration,
        numberOfChannels: channels.length,
        getChannelData: (i) => Float32Array.from(channels[i]),
        copyFromChannel: jest.fn(),
        copyToChannel: jest.fn(),
    };
};
describe('Renderer', () => {
    let container;
    let renderer;
    const originalGetContext = window.HTMLCanvasElement.prototype.getContext;
    const originalToDataURL = window.HTMLCanvasElement.prototype.toDataURL;
    const originalToBlob = window.HTMLCanvasElement.prototype.toBlob;
    beforeAll(() => {
        Object.defineProperty(window, 'devicePixelRatio', { value: 1, writable: true });
        window.HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
            beginPath: jest.fn(),
            rect: jest.fn(),
            roundRect: jest.fn(),
            moveTo: jest.fn(),
            lineTo: jest.fn(),
            closePath: jest.fn(),
            fill: jest.fn(),
            drawImage: jest.fn(),
            fillRect: jest.fn(),
            createLinearGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
            globalCompositeOperation: '',
            canvas: { width: 100, height: 100 },
        }));
        window.HTMLCanvasElement.prototype.toDataURL = jest.fn(() => 'data:mock');
        window.HTMLCanvasElement.prototype.toBlob = jest.fn((cb) => cb(new Blob([''])));
    });
    afterAll(() => {
        window.HTMLCanvasElement.prototype.getContext = originalGetContext;
        window.HTMLCanvasElement.prototype.toDataURL = originalToDataURL;
        window.HTMLCanvasElement.prototype.toBlob = originalToBlob;
    });
    beforeEach(() => {
        container = document.createElement('div');
        container.id = 'root';
        document.body.appendChild(container);
        renderer = new Renderer({ container });
    });
    afterEach(() => {
        renderer.destroy();
        container.remove();
        jest.clearAllMocks();
    });
    test('parentFromOptionsContainer returns element and throws', () => {
        expect(renderer.parentFromOptionsContainer(container)).toBe(container);
        expect(renderer.parentFromOptionsContainer('#root')).toBe(container);
        expect(() => renderer.parentFromOptionsContainer('#missing')).toThrow();
    });
    test('initHtml creates shadow root', () => {
        const [el, shadow] = renderer.initHtml();
        expect(el.shadowRoot).toBe(shadow);
        expect(shadow.querySelector('.scroll')).not.toBeNull();
    });
    test('getHeight calculates values', () => {
        ;
        renderer.audioData = { numberOfChannels: 2 };
        expect(renderer.getHeight(undefined, undefined)).toBe(128);
        expect(renderer.getHeight(50, undefined)).toBe(50);
        container.style.height = '200px';
        expect(renderer.getHeight('auto', [{ overlay: false }])).toBe(64);
    });
    test('createDelay resolves after time', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.useFakeTimers();
        const delay = renderer.createDelay(10);
        const spy = jest.fn();
        const p = delay().then(spy);
        jest.advanceTimersByTime(10);
        yield p;
        expect(spy).toHaveBeenCalled();
        jest.useRealTimers();
    }));
    test('convertColorValues supports gradients', () => {
        const result = renderer.convertColorValues(['red', 'blue']);
        expect(typeof result).toBe('object');
        expect(renderer.convertColorValues('red')).toBe('red');
    });
    test('getPixelRatio returns positive', () => {
        window.devicePixelRatio = 2;
        expect(renderer.getPixelRatio()).toBe(2);
    });
    test('renderBarWaveform and renderLineWaveform draw on context', () => {
        const ctx = renderer.canvasWrapper.ownerDocument.createElement('canvas').getContext('2d');
        const data = [new Float32Array([0, 0.5, -0.5]), new Float32Array([0, -0.5, 0.5])];
        renderer.renderBarWaveform(data, {}, ctx, 1);
        expect(ctx.beginPath).toHaveBeenCalled();
        renderer.renderLineWaveform(data, {}, ctx, 1);
        expect(ctx.lineTo).toHaveBeenCalled();
    });
    test('renderWaveform chooses rendering path', () => {
        const ctx = document.createElement('canvas').getContext('2d');
        const data = [new Float32Array([0, 1])];
        const spyBar = jest.spyOn(renderer, 'renderBarWaveform');
        const spyLine = jest.spyOn(renderer, 'renderLineWaveform');
        renderer.renderWaveform(data, { barWidth: 1 }, ctx);
        expect(spyBar).toHaveBeenCalled();
        renderer.renderWaveform(data, {}, ctx);
        expect(spyLine).toHaveBeenCalled();
    });
    test('renderSingleCanvas appends canvases', () => {
        const canvasContainer = document.createElement('div');
        const progressContainer = document.createElement('div');
        const data = [new Float32Array([0, 1])];
        renderer.renderSingleCanvas(data, {}, 10, 10, 0, canvasContainer, progressContainer);
        expect(canvasContainer.querySelector('canvas')).not.toBeNull();
        expect(progressContainer.querySelector('canvas')).not.toBeNull();
    });
    test('renderMultiCanvas draws and subscribes', () => {
        const canvasContainer = document.createElement('div');
        const progressContainer = document.createElement('div');
        const data = [new Float32Array([0, 1])];
        Object.defineProperty(renderer.scrollContainer, 'clientWidth', { configurable: true, value: 200 });
        renderer.renderMultiCanvas(data, { barWidth: 1 }, 200, 10, canvasContainer, progressContainer);
        expect(canvasContainer.querySelector('canvas')).not.toBeNull();
    });
    test('renderChannel creates containers', () => {
        const data = [new Float32Array([0, 1])];
        renderer.renderChannel(data, {}, 10, 0);
        expect(renderer.canvasWrapper.children.length).toBeGreaterThan(0);
    });
    test('render processes audio buffer', () => __awaiter(void 0, void 0, void 0, function* () {
        const buffer = createAudioBuffer([[0, 0.5, -0.5]]);
        const spy = jest.fn();
        renderer.on('render', spy);
        yield renderer.render(buffer);
        expect(spy).toHaveBeenCalled();
    }));
    test('reRender keeps scroll position', () => __awaiter(void 0, void 0, void 0, function* () {
        const buffer = createAudioBuffer([[0, 0.5, -0.5]]);
        yield renderer.render(buffer);
        renderer.setScroll(10);
        renderer.reRender();
        expect(renderer.getScroll()).toBe(10);
    }));
    test('zoom updates option', () => {
        renderer.zoom(20);
        expect(renderer.options.minPxPerSec).toBe(20);
    });
    test('scrollIntoView updates scroll', () => {
        Object.defineProperty(renderer.scrollContainer, 'scrollWidth', { configurable: true, value: 100 });
        Object.defineProperty(renderer.scrollContainer, 'clientWidth', { configurable: true, value: 50 });
        renderer.renderProgress(0);
        renderer.scrollIntoView(0.8);
        expect(renderer.getScroll()).toBeGreaterThanOrEqual(0);
    });
    test('renderProgress updates styles', () => {
        renderer.renderProgress(0.5);
        expect(renderer.progressWrapper.style.width).toBe('50%');
    });
    test('exportImage returns data', () => __awaiter(void 0, void 0, void 0, function* () {
        const canvas = document.createElement('canvas');
        renderer.canvasWrapper.appendChild(canvas);
        const urls = yield renderer.exportImage('image/png', 1, 'dataURL');
        expect(urls).toHaveLength(1);
        const blobs = yield renderer.exportImage('image/png', 1, 'blob');
        expect(blobs).toHaveLength(1);
    }));
    test('destroy cleans up', () => {
        renderer.destroy();
        expect(container.contains(renderer.getWrapper())).toBe(false);
    });
});
