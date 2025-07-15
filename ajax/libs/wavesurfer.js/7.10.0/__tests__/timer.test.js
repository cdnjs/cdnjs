import Timer from '../timer.js';
describe('Timer', () => {
    test('start schedules ticks', () => {
        const timer = new Timer();
        const tick = jest.fn();
        timer.on('tick', tick);
        const raf = jest
            .fn()
            .mockImplementationOnce((cb) => {
            cb(0);
            return 1;
        })
            .mockImplementation(() => 1);
        global.requestAnimationFrame = raf;
        timer.start();
        expect(tick).toHaveBeenCalledTimes(2);
    });
});
