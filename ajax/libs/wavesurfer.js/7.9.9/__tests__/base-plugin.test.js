import { BasePlugin } from '../base-plugin.js';
class TestPlugin extends BasePlugin {
    constructor() {
        super(...arguments);
        this.initCalled = false;
    }
    onInit() {
        this.initCalled = true;
    }
}
describe('BasePlugin', () => {
    test('_init calls onInit and sets wavesurfer', () => {
        const plugin = new TestPlugin({});
        const ws = {};
        plugin._init(ws);
        expect(plugin.wavesurfer).toBe(ws);
        expect(plugin.initCalled).toBe(true);
    });
    test('destroy emits destroy and unsubscribes', () => {
        const plugin = new TestPlugin({});
        const unsub = jest.fn();
        plugin.subscriptions = [unsub];
        const spy = jest.fn();
        plugin.on('destroy', spy);
        plugin.destroy();
        expect(spy).toHaveBeenCalled();
        expect(unsub).toHaveBeenCalled();
    });
});
