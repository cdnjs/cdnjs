import EventEmitter from '../event-emitter.js';
describe('EventEmitter', () => {
    test('on and emit', () => {
        const emitter = new EventEmitter();
        const handler = jest.fn();
        emitter.on('foo', handler);
        emitter.emit('foo', 42);
        expect(handler).toHaveBeenCalledWith(42);
    });
    test('once', () => {
        const emitter = new EventEmitter();
        const handler = jest.fn();
        emitter.once('bar', handler);
        emitter.emit('bar');
        emitter.emit('bar');
        expect(handler).toHaveBeenCalledTimes(1);
    });
    test('unAll', () => {
        const emitter = new EventEmitter();
        const handler = jest.fn();
        emitter.on('foo', handler);
        emitter.unAll();
        emitter.emit('foo', 1);
        expect(handler).not.toHaveBeenCalled();
    });
});
