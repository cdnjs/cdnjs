import { Cell } from './Cell';
export function autorun(fn, cellOptions) {
    let disposer;
    new Cell(function (cell, value) {
        return fn.call(this, value, (disposer ?? (disposer = () => {
            cell.dispose();
        })));
    }, cellOptions?.onChange
        ? cellOptions
        : {
            ...cellOptions,
            onChange: () => { }
        });
    return disposer;
}
