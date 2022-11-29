import { toNodes, parentsOf, lastOfLevel, countExpanded } from './utils';
describe('bug_#7', () => {
    let nodes;
    test('setup', () => {
        nodes = toNodes([
            {
                label: '0',
                expand: true,
                children: [
                    {
                        label: '00',
                        expand: true,
                        children: ['000', '001'],
                    },
                    {
                        label: '01',
                        children: ['010', '011'],
                    },
                ],
            },
            '1',
        ]);
        expect(nodes.length).toBe(8);
        expect(nodes.map((d) => d.label)).toEqual(['0', '00', '000', '001', '01', '010', '011', '1']);
    });
    test('parents', () => {
        const parents = (node, ...arr) => expect(parentsOf(node, nodes).map((d) => d.label)).toEqual(arr);
        parents(nodes[0], '0');
        parents(nodes[1], '0', '00');
        parents(nodes[2], '0', '00', '000');
        parents(nodes[3], '0', '00', '001');
    });
    test('lastOfLevel', () => {
        const last = (node, label) => expect(lastOfLevel(node, nodes).label).toEqual(label);
        last(nodes[0], '1');
        last(nodes[1], '01');
        last(nodes[2], '001');
    });
    test('countExpanded', () => {
        const count = (node, c) => expect(countExpanded(node)).toBe(c);
        count(nodes[0], 3);
        count(nodes[1], 2);
        count(nodes[2], 1);
    });
});
//# sourceMappingURL=utils_bug_7.spec.js.map