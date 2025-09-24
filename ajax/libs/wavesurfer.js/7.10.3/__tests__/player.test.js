var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Player from '../player.js';
describe('Player', () => {
    const createMedia = () => {
        const media = document.createElement('audio');
        media.play = jest.fn().mockResolvedValue(undefined);
        media.pause = jest.fn();
        media.setSinkId = jest.fn().mockResolvedValue(undefined);
        return media;
    };
    test('play and pause', () => __awaiter(void 0, void 0, void 0, function* () {
        const media = createMedia();
        const player = new Player({ media });
        yield player.play();
        expect(media.play).toHaveBeenCalled();
        player.pause();
        expect(media.pause).toHaveBeenCalled();
    }));
    test('pause before play promise resolves does not reject', () => __awaiter(void 0, void 0, void 0, function* () {
        const abort = new DOMException('interrupted', 'AbortError');
        let rejectPlay = () => undefined;
        const media = createMedia();
        media.play = jest.fn(() => new Promise((_, reject) => {
            rejectPlay = reject;
        }));
        const player = new Player({ media });
        const promise = player.play();
        player.pause();
        rejectPlay(abort);
        yield expect(promise).resolves.toBeUndefined();
    }));
    test('volume and muted', () => {
        const media = createMedia();
        const player = new Player({ media });
        player.setVolume(0.5);
        expect(player.getVolume()).toBe(0.5);
        player.setMuted(true);
        expect(player.getMuted()).toBe(true);
    });
    test('setTime clamps to duration', () => {
        const media = createMedia();
        Object.defineProperty(media, 'duration', { configurable: true, value: 10 });
        const player = new Player({ media });
        player.setTime(-1);
        expect(player.getCurrentTime()).toBe(0);
        player.setTime(11);
        expect(player.getCurrentTime()).toBe(10);
    });
    test('setSinkId uses media method', () => __awaiter(void 0, void 0, void 0, function* () {
        const media = createMedia();
        const player = new Player({ media });
        yield player.setSinkId('id');
        expect(media.setSinkId).toHaveBeenCalledWith('id');
    }));
});
