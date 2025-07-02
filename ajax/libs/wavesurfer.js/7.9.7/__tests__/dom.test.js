import createElement from '../dom.js';
describe('createElement', () => {
    test('creates DOM structure', () => {
        var _a;
        const container = document.createElement('div');
        const el = createElement('div', {
            id: 'root',
            children: {
                span: { textContent: 'child' },
            },
        }, container);
        expect(container.firstChild).toBe(el);
        expect(el.id).toBe('root');
        expect((_a = el.querySelector('span')) === null || _a === void 0 ? void 0 : _a.textContent).toBe('child');
    });
});
