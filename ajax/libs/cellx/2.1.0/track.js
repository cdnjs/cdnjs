import { Cell_CommonState } from './Cell';
export const DependencyFilter = {
    allExceptUntracked: (dep) => Cell_CommonState.untrackedCounter == 0,
    onlyTracked: (dep) => Cell_CommonState.trackedCounter != 0
};
export function untracked(fn) {
    Cell_CommonState.untrackedCounter++;
    try {
        return fn();
    }
    finally {
        Cell_CommonState.untrackedCounter--;
    }
}
export function tracked(fn) {
    Cell_CommonState.trackedCounter++;
    try {
        return fn();
    }
    finally {
        Cell_CommonState.trackedCounter--;
    }
}
