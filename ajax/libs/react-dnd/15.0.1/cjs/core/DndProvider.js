"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DndProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const dnd_core_1 = require("dnd-core");
const DndContext_1 = require("./DndContext");
let refCount = 0;
const INSTANCE_SYM = Symbol.for('__REACT_DND_CONTEXT_INSTANCE__');
/**
 * A React component that provides the React-DnD context
 */
exports.DndProvider = (0, react_1.memo)(function DndProvider({ children, ...props }) {
    const [manager, isGlobalInstance] = getDndContextValue(props); // memoized from props
    /**
     * If the global context was used to store the DND context
     * then where theres no more references to it we should
     * clean it up to avoid memory leaks
     */
    (0, react_1.useEffect)(() => {
        if (isGlobalInstance) {
            const context = getGlobalContext();
            ++refCount;
            return () => {
                if (--refCount === 0) {
                    context[INSTANCE_SYM] = null;
                }
            };
        }
        return;
    }, []);
    return (0, jsx_runtime_1.jsx)(DndContext_1.DndContext.Provider, { value: manager, children: children }, void 0);
});
function getDndContextValue(props) {
    if ('manager' in props) {
        const manager = { dragDropManager: props.manager };
        return [manager, false];
    }
    const manager = createSingletonDndContext(props.backend, props.context, props.options, props.debugMode);
    const isGlobalInstance = !props.context;
    return [manager, isGlobalInstance];
}
function createSingletonDndContext(backend, context = getGlobalContext(), options, debugMode) {
    const ctx = context;
    if (!ctx[INSTANCE_SYM]) {
        ctx[INSTANCE_SYM] = {
            dragDropManager: (0, dnd_core_1.createDragDropManager)(backend, context, options, debugMode),
        };
    }
    return ctx[INSTANCE_SYM];
}
function getGlobalContext() {
    return typeof global !== 'undefined' ? global : window;
}
