var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
jest.mock('../renderer.js', () => {
    let lastInstance;
    class Renderer {
        constructor(options) {
            this.wrapper = document.createElement('div');
            this.renderProgress = jest.fn();
            this.on = jest.fn(() => () => undefined);
            this.setOptions = jest.fn();
            this.getWrapper = jest.fn(() => this.wrapper);
            this.getWidth = jest.fn(() => 100);
            this.getScroll = jest.fn(() => 0);
            this.setScroll = jest.fn();
            this.setScrollPercentage = jest.fn();
            this.render = jest.fn();
            this.zoom = jest.fn();
            this.exportImage = jest.fn(() => []);
            this.destroy = jest.fn();
            this.options = options;
            lastInstance = this;
        }
    }
    return { __esModule: true, default: Renderer, getLastInstance: () => lastInstance };
});
jest.mock('../timer.js', () => {
    let lastInstance;
    class Timer {
        constructor() {
            this.on = jest.fn(() => () => undefined);
            this.start = jest.fn();
            this.stop = jest.fn();
            this.destroy = jest.fn();
        }
    }
    const ctor = jest.fn(() => {
        lastInstance = new Timer();
        return lastInstance;
    });
    return { __esModule: true, default: ctor, getLastInstance: () => lastInstance };
});
jest.mock('../decoder.js', () => {
    const createBuffer = jest.fn((data, duration) => ({
        duration,
        numberOfChannels: data.length,
        getChannelData: (i) => Float32Array.from(data[i]),
    }));
    return { __esModule: true, default: { decode: jest.fn(), createBuffer } };
});
import WaveSurfer from '../wavesurfer.js';
import { BasePlugin } from '../base-plugin.js';
import * as RendererModule from '../renderer.js';
import * as TimerModule from '../timer.js';
const getRenderer = RendererModule.getLastInstance;
const getTimer = TimerModule.getLastInstance;
const createMedia = () => {
    const media = document.createElement('audio');
    media.play = jest.fn().mockResolvedValue(undefined);
    media.pause = jest.fn();
    Object.defineProperty(media, 'duration', { configurable: true, value: 100, writable: true });
    return media;
};
const createWs = (opts = {}) => {
    const container = document.createElement('div');
    return WaveSurfer.create(Object.assign({ container, media: createMedia() }, opts));
};
afterEach(() => {
    jest.clearAllMocks();
});
describe('WaveSurfer public methods', () => {
    test('create returns instance', () => {
        const ws = createWs();
        expect(ws).toBeInstanceOf(WaveSurfer);
    });
    test('setOptions merges options and updates renderer', () => {
        const ws = createWs();
        ws.setOptions({ height: 200, audioRate: 2, mediaControls: true });
        const renderer = getRenderer();
        expect(ws.options.height).toBe(200);
        expect(renderer.setOptions).toHaveBeenCalledWith(ws.options);
        expect(ws.getPlaybackRate()).toBe(2);
        expect(ws.getMediaElement().controls).toBe(true);
    });
    test('registerPlugin adds and removes plugin', () => {
        const ws = createWs();
        class TestPlugin extends BasePlugin {
        }
        const plugin = new TestPlugin({});
        ws.registerPlugin(plugin);
        expect(ws.getActivePlugins()).toContain(plugin);
        plugin.destroy();
        expect(ws.getActivePlugins()).not.toContain(plugin);
    });
    test('wrapper and scroll helpers call renderer', () => {
        const ws = createWs();
        const renderer = getRenderer();
        ws.getWrapper();
        expect(renderer.getWrapper).toHaveBeenCalled();
        ws.getWidth();
        expect(renderer.getWidth).toHaveBeenCalled();
        ws.getScroll();
        expect(renderer.getScroll).toHaveBeenCalled();
        ws.setScroll(42);
        expect(renderer.setScroll).toHaveBeenCalledWith(42);
        jest.spyOn(ws, 'getDuration').mockReturnValue(10);
        ws.setScrollTime(5);
        expect(renderer.setScrollPercentage).toHaveBeenCalledWith(0.5);
    });
    test('load and loadBlob call loadAudio', () => __awaiter(void 0, void 0, void 0, function* () {
        const ws = createWs();
        const spy = jest.spyOn(ws, 'loadAudio').mockResolvedValue(undefined);
        yield ws.load('url');
        expect(spy).toHaveBeenCalledWith('url', undefined, undefined, undefined);
        const blob = new Blob([]);
        yield ws.loadBlob(blob);
        expect(spy).toHaveBeenCalledWith('', blob, undefined, undefined);
    }));
    test('zoom requires decoded data', () => {
        const ws = createWs();
        expect(() => ws.zoom(10)).toThrow();
        ws.decodedData = { duration: 1 };
        ws.zoom(10);
        expect(getRenderer().zoom).toHaveBeenCalledWith(10);
    });
    test('getDecodedData returns buffer', () => {
        const ws = createWs();
        ws.decodedData = 123;
        expect(ws.getDecodedData()).toBe(123);
    });
    test('exportPeaks reads data from buffer', () => {
        const ws = createWs();
        ws.decodedData = {
            numberOfChannels: 1,
            getChannelData: () => new Float32Array([0, 1, -1]),
            duration: 3,
        };
        const peaks = ws.exportPeaks({ maxLength: 3, precision: 100 });
        expect(peaks[0]).toEqual([0, 1, -1]);
    });
    test('getDuration falls back to decoded data', () => {
        const ws = createWs();
        const media = ws.getMediaElement();
        Object.defineProperty(media, 'duration', { configurable: true, value: Infinity });
        ws.decodedData = { duration: 2 };
        expect(ws.getDuration()).toBe(2);
    });
    test('toggleInteraction sets option', () => {
        const ws = createWs();
        ws.toggleInteraction(false);
        expect(ws.options.interact).toBe(false);
    });
    test('setTime updates progress and emits event', () => {
        const ws = createWs();
        const spy = jest.fn();
        ws.on('timeupdate', spy);
        ws.setTime(1);
        expect(spy).toHaveBeenCalledWith(1);
        expect(getRenderer().renderProgress).toHaveBeenCalled();
    });
    test('seekTo calculates correct time', () => {
        const ws = createWs();
        jest.spyOn(ws, 'getDuration').mockReturnValue(10);
        const setTimeSpy = jest.spyOn(ws, 'setTime');
        ws.seekTo(0.5);
        expect(setTimeSpy).toHaveBeenCalledWith(5);
    });
    test('play sets start and end', () => __awaiter(void 0, void 0, void 0, function* () {
        const ws = createWs();
        const spy = jest.spyOn(ws, 'setTime');
        yield ws.play(2, 4);
        expect(spy).toHaveBeenCalledWith(2);
        expect(ws.stopAtPosition).toBe(4);
    }));
    test('playPause toggles play and pause', () => __awaiter(void 0, void 0, void 0, function* () {
        const ws = createWs();
        const media = ws.getMediaElement();
        yield ws.playPause();
        expect(media.play).toHaveBeenCalled();
        Object.defineProperty(media, 'paused', { configurable: true, value: false });
        yield ws.playPause();
        expect(media.pause).toHaveBeenCalled();
    }));
    test('stop resets time', () => {
        const ws = createWs();
        ws.setTime(5);
        ws.stop();
        expect(ws.getCurrentTime()).toBe(0);
    });
    test('skip and empty', () => {
        const ws = createWs();
        ws.getMediaElement().currentTime = 1;
        const spy = jest.spyOn(ws, 'setTime');
        ws.skip(2);
        expect(spy).toHaveBeenCalledWith(3);
        const loadSpy = jest.spyOn(ws, 'load').mockResolvedValue(undefined);
        ws.empty();
        expect(loadSpy).toHaveBeenCalledWith('', [[0]], 0.001);
    });
    test('setMediaElement reinitializes events', () => {
        const ws = createWs();
        const unsub = jest.spyOn(ws, 'unsubscribePlayerEvents');
        const init = jest.spyOn(ws, 'initPlayerEvents');
        const el = createMedia();
        ws.setMediaElement(el);
        expect(unsub).toHaveBeenCalled();
        expect(init).toHaveBeenCalled();
        expect(ws.getMediaElement()).toBe(el);
    });
    test('exportImage uses renderer', () => __awaiter(void 0, void 0, void 0, function* () {
        const ws = createWs();
        yield ws.exportImage('image/png', 1, 'dataURL');
        expect(getRenderer().exportImage).toHaveBeenCalled();
    }));
    test('destroy cleans up renderer and timer', () => {
        const ws = createWs();
        ws.destroy();
        expect(getRenderer().destroy).toHaveBeenCalled();
        expect(getTimer().destroy).toHaveBeenCalled();
    });
});
