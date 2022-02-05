"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSource = exports.registerTarget = void 0;
function registerTarget(type, target, manager) {
    const registry = manager.getRegistry();
    const targetId = registry.addTarget(type, target);
    return [targetId, () => registry.removeTarget(targetId)];
}
exports.registerTarget = registerTarget;
function registerSource(type, source, manager) {
    const registry = manager.getRegistry();
    const sourceId = registry.addSource(type, source);
    return [sourceId, () => registry.removeSource(sourceId)];
}
exports.registerSource = registerSource;
