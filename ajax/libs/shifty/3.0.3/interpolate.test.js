"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
test('computes the midpoint of two numbers', () => {
    const interpolated = (0, _1.interpolate)({ x: 0 }, { x: 10 }, 0.5);
    expect(5).toEqual(interpolated.x);
});
test('computes the midpoint of two token strings', () => {
    const interpolated = (0, _1.interpolate)({ color: '#000' }, { color: '#fff' }, 0.5);
    expect('rgb(127,127,127)').toEqual(interpolated.color);
});
test('accounts for optional delay', () => {
    let interpolated = (0, _1.interpolate)({ x: 0 }, { x: 10 }, 0.5, 'linear', 0.5);
    expect(interpolated.x).toEqual(0);
    interpolated = (0, _1.interpolate)({ x: 0 }, { x: 10 }, 1.0, 'linear', 0.5);
    expect(interpolated.x).toEqual(5);
    interpolated = (0, _1.interpolate)({ x: 0 }, { x: 10 }, 1.5, 'linear', 0.5);
    expect(interpolated.x).toEqual(10);
});
test('supports per-interpolation custom easing curves', () => {
    const easingFn = (pos) => pos * 2;
    const interpolated = (0, _1.interpolate)({ x: 0 }, { x: 10 }, 0.5, easingFn);
    expect(interpolated.x).toEqual(10);
});
