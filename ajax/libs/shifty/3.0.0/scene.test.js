"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tweenable_1 = require("./tweenable");
const scene_1 = require("./scene");
let scene;
beforeEach(() => {
    scene = new scene_1.Scene();
});
describe('constructor', () => {
    test('stores internal Tweenables', () => {
        scene = new scene_1.Scene(new tweenable_1.Tweenable(), new tweenable_1.Tweenable());
        const [tweenable1, tweenable2] = scene.tweenables;
        expect(scene.tweenables).toHaveLength(2);
        expect(tweenable1).toBeInstanceOf(tweenable_1.Tweenable);
        expect(tweenable2).toBeInstanceOf(tweenable_1.Tweenable);
    });
});
describe('get promises', () => {
    test('returns promises for all tweenables', () => {
        scene = new scene_1.Scene(new tweenable_1.Tweenable({}, {}));
        const { promises } = scene;
        expect(promises).toHaveLength(1);
        expect(promises[0]).toBeInstanceOf(Promise);
    });
});
describe('add', () => {
    test('adds a Tweenable', () => {
        const tweenable1 = scene.add(new tweenable_1.Tweenable());
        const tweenable2 = scene.add(new tweenable_1.Tweenable());
        expect(scene.tweenables[0]).toEqual(tweenable1);
        expect(scene.tweenables[1]).toEqual(tweenable2);
    });
});
describe('remove', () => {
    test('removes a Tweenable', () => {
        const tweenable1 = new tweenable_1.Tweenable({ foo: 1 });
        const tweenable2 = new tweenable_1.Tweenable({ bar: 1 });
        scene = new scene_1.Scene(tweenable1, tweenable2);
        const removedTweenable = scene.remove(tweenable1);
        expect(removedTweenable).toEqual(tweenable1);
        expect(scene.tweenables).toEqual([tweenable2]);
    });
});
describe('empty', () => {
    test('removes all Tweenables', () => {
        const tweenable1 = new tweenable_1.Tweenable({ foo: 1 });
        const tweenable2 = new tweenable_1.Tweenable({ bar: 1 });
        scene = new scene_1.Scene(tweenable1, tweenable2);
        const emptiedTweenables = scene.empty();
        expect(scene.tweenables).toHaveLength(0);
        expect(emptiedTweenables).toEqual([tweenable1, tweenable2]);
    });
});
describe('isPlaying', () => {
    beforeEach(() => {
        scene = new scene_1.Scene(new tweenable_1.Tweenable(), new tweenable_1.Tweenable());
    });
    test('returns false if no tweenables are playing', () => {
        expect(scene.isPlaying).toBeFalsy();
    });
    test('returns true if any Tweenables are playing', () => {
        scene.tweenables[1].tween({ from: { x: 0 }, to: { x: 10 } });
        expect(scene.isPlaying).toBeTruthy();
    });
});
describe('play', () => {
    beforeEach(() => {
        scene = new scene_1.Scene(new tweenable_1.Tweenable(), new tweenable_1.Tweenable());
    });
    test('plays all Tweenables from their beginning', () => {
        const [tweenable1, tweenable2] = scene.tweenables;
        tweenable1.setConfig({ from: { x: 0 }, to: { x: 10 } });
        tweenable2.setConfig({ from: { x: 10 }, to: { x: 0 } });
        scene.tween();
        expect(tweenable1.isPlaying).toBeTruthy();
        expect(tweenable2.isPlaying).toBeTruthy();
    });
});
describe('pause', () => {
    beforeEach(() => {
        scene = new scene_1.Scene(new tweenable_1.Tweenable(), new tweenable_1.Tweenable());
    });
    test('pauses all Tweenables', () => {
        scene.tween();
        scene.pause();
        expect(scene.isPlaying).toBeFalsy();
    });
});
describe('resume', () => {
    beforeEach(() => {
        scene = new scene_1.Scene(new tweenable_1.Tweenable(), new tweenable_1.Tweenable());
    });
    test('resumes Tweenables', () => {
        scene.tween();
        scene.pause();
        scene.resume();
        expect(scene.isPlaying).toBeTruthy();
    });
    test('does not resume Tweenables that have ended', () => {
        const tweenable1 = new tweenable_1.Tweenable();
        const tweenable2 = new tweenable_1.Tweenable();
        scene = new scene_1.Scene(tweenable1, tweenable2);
        jest.spyOn(tweenable1, 'hasEnded', 'get').mockReturnValue(false);
        jest.spyOn(tweenable1, 'resume');
        jest.spyOn(tweenable2, 'hasEnded', 'get').mockReturnValue(true);
        jest.spyOn(tweenable2, 'resume');
        scene.tween();
        scene.pause();
        scene.resume();
        expect(tweenable1.resume).toHaveBeenCalled();
        expect(tweenable2.resume).not.toHaveBeenCalled();
    });
});
describe('stop', () => {
    beforeEach(() => {
        scene = new scene_1.Scene(new tweenable_1.Tweenable(), new tweenable_1.Tweenable());
    });
    test('stops all Tweenables', () => {
        const [tweenable1, tweenable2] = scene.tweenables;
        tweenable1.setConfig({ from: { x: 0 }, to: { x: 10 } });
        tweenable2.setConfig({ from: { x: 10 }, to: { x: 0 } });
        jest.spyOn(tweenable1, 'stop');
        jest.spyOn(tweenable2, 'stop');
        scene.stop(true);
        expect(tweenable1.stop).toHaveBeenCalledWith(true);
        expect(tweenable2.stop).toHaveBeenCalledWith(true);
    });
});
