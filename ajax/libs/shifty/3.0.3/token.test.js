"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
test('can tween an rgb color', () => {
    const from = { color: 'rgb(0,128,255)' }, to = { color: 'rgb(128,255,0)' };
    let interpolated = (0, _1.interpolate)(from, to, 0);
    expect(interpolated.color).toEqual(from.color);
    interpolated = (0, _1.interpolate)(from, to, 0.5);
    expect(interpolated.color).toEqual('rgb(64,191,127)');
    interpolated = (0, _1.interpolate)(from, to, 1);
    expect(interpolated.color).toEqual(to.color);
});
test('can tween an rgb color with a number in the tween', () => {
    const from = { color: 'rgb(0,128,255)', x: 0 }, to = { color: 'rgb(128,255,0)', x: 10 };
    let interpolated = (0, _1.interpolate)(from, to, 0);
    expect(interpolated.color).toEqual(from.color);
    interpolated = (0, _1.interpolate)(from, to, 0.5);
    expect(interpolated.color).toEqual('rgb(64,191,127)');
    expect(interpolated.x).toEqual(5);
    interpolated = (0, _1.interpolate)(from, to, 1);
    expect(interpolated.color).toEqual(to.color);
});
test('can tween an rgba color with a number in the tween', () => {
    const from = { color: 'rgba(0,128,255,0)', x: 0 }, to = { color: 'rgba(128,255,0,1)', x: 10 };
    let interpolated = (0, _1.interpolate)(from, to, 0);
    expect(interpolated.color).toEqual(from.color);
    interpolated = (0, _1.interpolate)(from, to, 0.5);
    expect(interpolated.color).toEqual('rgba(64,191,127,0.5)');
    expect(interpolated.x).toEqual(5);
    interpolated = (0, _1.interpolate)(from, to, 1);
    expect(interpolated.color).toEqual(to.color);
});
test('can tween hex color values', () => {
    const from = { color: '#ff00ff' }, to = { color: '#00ff00' };
    let interpolated = (0, _1.interpolate)(from, to, 0);
    expect(interpolated.color).toEqual('rgb(255,0,255)');
    interpolated = (0, _1.interpolate)(from, to, 0.5);
    expect(interpolated.color).toEqual('rgb(127,127,127)');
    interpolated = (0, _1.interpolate)(from, to, 1);
    expect(interpolated.color).toEqual('rgb(0,255,0)');
});
test('can tween multiple rgb color tokens', () => {
    const from = { color: 'rgb(0,128,255) rgb(255,0,255)' }, to = { color: 'rgb(128,255,0) rgb(0,255,0)' };
    let interpolated = (0, _1.interpolate)(from, to, 0);
    expect(interpolated.color).toEqual(from.color);
    interpolated = (0, _1.interpolate)(from, to, 0.5);
    expect(interpolated.color).toEqual('rgb(64,191,127) rgb(127,127,127)');
    interpolated = (0, _1.interpolate)(from, to, 1);
    expect(interpolated.color).toEqual(to.color);
});
test('each token chunk can have its own easing curve', () => {
    const from = { color: 'rgb(0,0,0)' }, to = { color: 'rgb(255,255,255)' }, easing = 'linear easeInQuad easeInCubic';
    const interpolated = (0, _1.interpolate)(from, to, 0.5, easing);
    const interpolatedR = parseInt(String((0, _1.interpolate)({ r: 0 }, { r: 255 }, 0.5, 'linear').r), 10);
    const interpolatedG = parseInt(String((0, _1.interpolate)({ g: 0 }, { g: 255 }, 0.5, 'easeInQuad').g), 10);
    const interpolatedB = parseInt(String((0, _1.interpolate)({ b: 0 }, { b: 255 }, 0.5, 'easeInCubic').b), 10);
    const targetString = 'rgb(' + interpolatedR + ',' + interpolatedG + ',' + interpolatedB + ')';
    expect(interpolated.color).toEqual(targetString);
});
test('missing token eases inherit from the last easing listed', () => {
    const from = { color: 'rgb(0,0,0)' }, to = { color: 'rgb(255,255,255)' }, easing = 'linear easeInQuad';
    const interpolated = (0, _1.interpolate)(from, to, 0.5, easing);
    const interpolatedR = parseInt(String((0, _1.interpolate)({ r: 0 }, { r: 255 }, 0.5, 'linear').r), 10);
    const interpolatedG = parseInt(String((0, _1.interpolate)({ g: 0 }, { g: 255 }, 0.5, 'easeInQuad').g), 10);
    const interpolatedB = parseInt(String((0, _1.interpolate)({ b: 0 }, { b: 255 }, 0.5, 'easeInQuad').b), 10);
    const targetString = 'rgb(' + interpolatedR + ',' + interpolatedG + ',' + interpolatedB + ')';
    expect(interpolated.color).toEqual(targetString);
});
test('can tween a negative value token to a positive value', () => {
    const from = { transform: 'translateX(-50)' }, to = { transform: 'translateX(50)' };
    let interpolated = (0, _1.interpolate)(from, to, 0);
    expect(interpolated.transform).toEqual('translateX(-50)');
    interpolated = (0, _1.interpolate)(from, to, 0.5);
    expect(interpolated.transform).toEqual('translateX(0)');
    interpolated = (0, _1.interpolate)(from, to, 1);
    expect(interpolated.transform).toEqual('translateX(50)');
});
test('can interpolate two number strings that have no non-number token structure', () => {
    const from = { x: '2' };
    const to = { x: '3' };
    const interpolated = (0, _1.interpolate)(from, to, 0.5);
    expect(interpolated.x).toEqual('2.5');
});
test('can tween css value pairs', () => {
    const from = { x: '0px 0px' };
    const to = { x: '100px 100px' };
    const interpolated = (0, _1.interpolate)(from, to, 0.5);
    expect(interpolated.x).toEqual('50px 50px');
});
