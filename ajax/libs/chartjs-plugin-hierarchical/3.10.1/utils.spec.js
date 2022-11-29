import { asNode, toNodes, parentsOf, lastOfLevel, countExpanded, spanLogic, flatChildren, determineVisible, } from './utils';
function nodeTest(n, label, options = {}) {
    const { childCount, level, hidden } = {
        childCount: 0,
        level: 0,
        hidden: false,
        ...options,
    };
    expect(n).toBeDefined();
    expect(n.label).toBe(label);
    expect(n.children.length).toBe(childCount);
    expect(n.expand).toBe(false);
    expect(n.level).toBe(level);
    expect(n.center).toBeNaN();
    expect(n.width).toBe(0);
    expect(n.hidden).toBe(hidden);
    expect(n.major).toBe(level === 0);
}
function treeNodeTest(n, parent, relIndex, index) {
    expect(n.relIndex).toBe(relIndex);
    expect(n.parent).toBe(parent);
    expect(n.index).toBe(index);
    expect(n.index).toBe(index);
}
function setupNodes(def) {
    const flat = toNodes(def);
    const root = flat.filter((d) => d.parent === -1);
    const visible = new Set(determineVisible(flat));
    return { flat, root, visible };
}
describe('asNode', () => {
    test('from label', () => {
        const n = asNode('test');
        nodeTest(n, 'test');
    });
    test('object', () => {
        const n = asNode({
            label: 'test2',
        });
        nodeTest(n, 'test2');
    });
    test('object with children', () => {
        const n = asNode({
            label: 'test3',
            children: ['abc', 'def'],
        });
        nodeTest(n, 'test3', { childCount: 2 });
        nodeTest(n.children[0], 'abc', { level: 1 });
        nodeTest(n.children[1], 'def', { level: 1 });
    });
    test('object with children complex', () => {
        const n = asNode({
            label: 'test3',
            children: [
                {
                    label: 'test4',
                    children: ['abc'],
                },
                'def',
            ],
        });
        nodeTest(n, 'test3', { childCount: 2 });
        nodeTest(n.children[0], 'test4', { childCount: 1, level: 1 });
        nodeTest(n.children[0].children[0], 'abc', { level: 2 });
        nodeTest(n.children[1], 'def', { level: 1 });
    });
});
describe('toNodes', () => {
    test('simple', () => {
        const nodes = toNodes(['a', 'b', 'c']);
        expect(nodes.length).toBe(3);
        nodeTest(nodes[0], 'a');
        treeNodeTest(nodes[0], -1, 0, 0);
        nodeTest(nodes[1], 'b');
        treeNodeTest(nodes[1], -1, 1, 1);
        nodeTest(nodes[2], 'c');
        treeNodeTest(nodes[2], -1, 2, 2);
    });
    test('hierarchy', () => {
        const nodes = toNodes([{ label: 'a', children: ['aa', 'ab'] }, 'b']);
        expect(nodes.length).toBe(4);
        nodeTest(nodes[0], 'a', { childCount: 2 });
        treeNodeTest(nodes[0], -1, 0, 0);
        nodeTest(nodes[1], 'aa', { level: 1, hidden: true });
        treeNodeTest(nodes[1], 0, 0, 1);
        nodeTest(nodes[2], 'ab', { level: 1, hidden: true });
        treeNodeTest(nodes[2], 0, 1, 2);
        nodeTest(nodes[3], 'b');
        treeNodeTest(nodes[3], -1, 1, 3);
    });
});
describe('parentsOf', () => {
    test('simple', () => {
        const nodes = toNodes([{ label: 'a', children: ['aa'] }]);
        const child = nodes[1];
        expect(child.parent).toBe(0);
        const parents = parentsOf(child, nodes);
        expect(parents.length).toBe(2);
        expect(parents[0]).toBe(nodes[0]);
        expect(parents[1]).toBe(child);
    });
});
describe('lastOfLevel', () => {
    test('simple', () => {
        const nodes = toNodes([{ label: 'a', children: ['aa'] }, 'b', 'c']);
        const last = lastOfLevel(nodes[0], nodes);
        expect(last).toBe(nodes[3]);
    });
});
describe('flatChildren', () => {
    test('a(aa)', () => {
        const { flat, root } = setupNodes([{ label: 'a', children: ['aa'] }, 'b', 'c']);
        const a = root[0];
        const children = flatChildren(a, flat);
        expect(children).toEqual(a.children);
    });
    test('b', () => {
        const { flat, root } = setupNodes([{ label: 'a', children: ['aa'] }, 'b', 'c']);
        const b = root[1];
        const children = flatChildren(b, flat);
        expect(children).toEqual([]);
    });
    test('c', () => {
        const { flat, root } = setupNodes([{ label: 'a', children: ['aa'] }, 'b', 'c']);
        const c = root[2];
        const children = flatChildren(c, flat);
        expect(children).toEqual([]);
    });
    test('a nested', () => {
        const { flat, root } = setupNodes([
            { label: 'a', children: ['aa', { label: 'ab', children: ['aba', 'abb'] }] },
            'b',
            'c',
        ]);
        const a = root[0];
        const children = flatChildren(a, flat);
        expect(children).toEqual(flat.slice(1, 1 + 4));
    });
    test('ab nested', () => {
        const { flat, root } = setupNodes([
            { label: 'a', children: ['aa', { label: 'ab', children: ['aba', 'abb'] }] },
            'b',
            'c',
        ]);
        const ab = root[0].children[1];
        const children = flatChildren(ab, flat);
        expect(children).toEqual(ab.children);
    });
});
describe('countExpanded', () => {
    test('simple', () => {
        const nodes = toNodes([{ label: 'a', children: ['aa'] }, 'b', 'c']);
        const count = countExpanded(nodes[0]);
        expect(count).toBe(1);
    });
    test('simple2', () => {
        const nodes = toNodes([{ label: 'a', children: ['aa', 'bb'], expand: true }, 'b', 'c']);
        const count = countExpanded(nodes[0]);
        expect(count).toBe(2);
    });
    test('simple3', () => {
        const nodes = toNodes([
            { label: 'a', children: ['aa', { expand: true, label: 'bb', children: ['bba', 'bbb'] }], expand: true },
            'b',
            'c',
        ]);
        const count = countExpanded(nodes[0]);
        expect(count).toBe(3);
    });
});
describe('spanLogic', () => {
    test('root level visible a', () => {
        const { flat, root, visible } = setupNodes([{ label: 'a', children: ['aa'] }, 'b', 'c']);
        const a = root[0];
        const r = spanLogic(a, flat, visible);
        expect(r).toBe(false);
    });
    test('root level visible b', () => {
        const { flat, root, visible } = setupNodes([{ label: 'a', children: ['aa'] }, 'b', 'c']);
        const b = root[1];
        const r = spanLogic(b, flat, visible);
        expect(r).toBe(false);
    });
    test('root level visible a (aa) expanded', () => {
        const { flat, root, visible } = setupNodes([{ label: 'a', children: ['aa'], expand: true }, 'b', 'c']);
        const a = root[0];
        const aa = a.children[0];
        const r = spanLogic(a, flat, visible);
        expect(r).not.toBe(false);
        const { hasCollapseBox, hasFocusBox, leftVisible, rightVisible, groupLabelCenter, leftFirstVisible, rightLastVisible, } = r;
        expect(leftVisible).toBe(aa);
        expect(rightVisible).toBe(aa);
        expect(hasCollapseBox).toBe(true);
        expect(hasFocusBox).toBe(false);
        expect(groupLabelCenter).toBe(aa.center);
        expect(leftFirstVisible).toBe(true);
        expect(rightLastVisible).toBe(true);
    });
    test('root level visible a (aa,ab) expanded', () => {
        const { flat, root, visible } = setupNodes([{ label: 'a', children: ['aa', 'ab'], expand: true }, 'b', 'c']);
        const a = root[0];
        const aa = a.children[0];
        const ab = a.children[1];
        const r = spanLogic(a, flat, visible);
        expect(r).not.toBe(false);
        const { hasCollapseBox, hasFocusBox, leftVisible, rightVisible, groupLabelCenter, leftFirstVisible, rightLastVisible, } = r;
        expect(leftVisible).toBe(aa);
        expect(rightVisible).toBe(ab);
        expect(hasCollapseBox).toBe(true);
        expect(hasFocusBox).toBe(true);
        expect(groupLabelCenter).toBe((aa.center + ab.center) / 2);
        expect(leftFirstVisible).toBe(true);
        expect(rightLastVisible).toBe(true);
    });
    test('root level visible a (aa,ab,ac) expanded', () => {
        const { flat, root, visible } = setupNodes([{ label: 'a', children: ['aa', 'ab', 'ac'], expand: true }, 'b', 'c']);
        const a = root[0];
        const aa = a.children[0];
        const ab = a.children[1];
        const ac = a.children[2];
        const r = spanLogic(a, flat, visible);
        expect(r).not.toBe(false);
        const { hasCollapseBox, hasFocusBox, leftVisible, rightVisible, groupLabelCenter, leftFirstVisible, rightLastVisible, } = r;
        expect(leftVisible).toBe(aa);
        expect(rightVisible).toBe(ac);
        expect(hasCollapseBox).toBe(true);
        expect(hasFocusBox).toBe(true);
        expect(groupLabelCenter).toBe((aa.center + ab.center) / 2);
        expect(leftFirstVisible).toBe(true);
        expect(rightLastVisible).toBe(true);
    });
    test('root level visible a (aa,ab,ac) focus', () => {
        const { flat, root, visible } = setupNodes([
            { label: 'a', children: ['aa', 'ab', 'ac'], expand: 'focus' },
            'b',
            'c',
        ]);
        const a = root[0];
        const aa = a.children[0];
        const ab = a.children[1];
        const ac = a.children[2];
        const r = spanLogic(a, flat, visible);
        expect(r).not.toBe(false);
        const { hasCollapseBox, hasFocusBox, leftVisible, rightVisible, groupLabelCenter, leftFirstVisible, rightLastVisible, } = r;
        expect(leftVisible).toBe(aa);
        expect(rightVisible).toBe(ac);
        expect(hasCollapseBox).toBe(false);
        expect(hasFocusBox).toBe(true);
        expect(groupLabelCenter).toBe((aa.center + ab.center) / 2);
        expect(leftFirstVisible).toBe(true);
        expect(rightLastVisible).toBe(true);
    });
    test('root level visible ac (aa,ab,(aca, acb)) focus', () => {
        const { flat, root, visible } = setupNodes([
            { label: 'a', children: ['aa', 'ab', { label: 'ac', children: ['aca', 'acb'], expand: 'focus' }], expand: true },
            'b',
            'c',
        ]);
        const a = root[0];
        const aa = a.children[0];
        const ab = a.children[1];
        const ac = a.children[2];
        const aca = ac.children[0];
        const acb = ac.children[1];
        const r = spanLogic(a, flat, visible);
        expect(r).not.toBe(false);
        const { hasCollapseBox, hasFocusBox, leftVisible, rightVisible, groupLabelCenter, leftFirstVisible, rightLastVisible, } = r;
        expect(leftVisible).toBe(aca);
        expect(rightVisible).toBe(acb);
        expect(hasCollapseBox).toBe(false);
        expect(hasFocusBox).toBe(false);
        expect(groupLabelCenter).toBe((aa.center + ab.center) / 2);
        expect(leftFirstVisible).toBe(false);
        expect(rightLastVisible).toBe(true);
    });
    test('root level visible c (ca,cb) expand', () => {
        const { flat, root, visible } = setupNodes([
            { label: 'a', children: ['aa', 'ab', 'ac'] },
            'b',
            { label: 'c', children: ['ca', 'cb'], expand: true },
        ]);
        const c = root[2];
        const ca = c.children[0];
        const cb = c.children[1];
        const r = spanLogic(c, flat, visible);
        expect(r).not.toBe(false);
        const { hasCollapseBox, hasFocusBox, leftVisible, rightVisible, groupLabelCenter, leftFirstVisible, rightLastVisible, } = r;
        expect(leftVisible).toBe(ca);
        expect(rightVisible).toBe(cb);
        expect(hasCollapseBox).toBe(true);
        expect(hasFocusBox).toBe(true);
        expect(groupLabelCenter).toBe((ca.center + cb.center) / 2);
        expect(leftFirstVisible).toBe(true);
        expect(rightLastVisible).toBe(true);
    });
});
//# sourceMappingURL=utils.spec.js.map