import { CellState, Cell_CommonState } from './Cell';
import { release } from './release';
export function transact(fn) {
    if (Cell_CommonState.transaction) {
        fn();
        return;
    }
    if (Cell_CommonState.pendingCells.length != 0) {
        release();
    }
    Cell_CommonState.transaction = {
        primaryCells: new Map(),
        secondaryCells: new Set()
    };
    try {
        fn();
    }
    catch (err) {
        for (let [cell, value] of Cell_CommonState.transaction.primaryCells) {
            // @ts-expect-error
            cell._value = value;
        }
        for (let cell of Cell_CommonState.transaction.secondaryCells) {
            // @ts-expect-error
            cell._state = CellState.ACTUAL;
        }
        Cell_CommonState.pendingCells.length = 0;
        Cell_CommonState.pendingCellsIndex = 0;
        Cell_CommonState.transaction = null;
        throw err;
    }
    Cell_CommonState.transaction = null;
    if (Cell_CommonState.pendingCells.length != 0) {
        release();
    }
}
