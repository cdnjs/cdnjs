import { Cell_CommonState } from './Cell';
export function release() {
    while (Cell_CommonState.pendingCellsIndex < Cell_CommonState.pendingCells.length) {
        let cell = Cell_CommonState.pendingCells[Cell_CommonState.pendingCellsIndex++];
        // @ts-expect-error
        if (cell._active) {
            cell.actualize();
        }
    }
    Cell_CommonState.pendingCells.length = 0;
    Cell_CommonState.pendingCellsIndex = 0;
    if (Cell_CommonState.afterRelease) {
        let { afterRelease } = Cell_CommonState;
        Cell_CommonState.afterRelease = null;
        for (let i = 0; i < afterRelease.length; i++) {
            afterRelease[i]();
        }
    }
}
