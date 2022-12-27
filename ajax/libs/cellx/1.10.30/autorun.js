import { Cell } from './Cell';
export function autorun(cb, cellOptions) {
    let disposer;
    new Cell(function (cell, next) {
        if (!disposer) {
            disposer = () => {
                cell.dispose();
            };
        }
        return cb.call(this, next, disposer);
    }, (cellOptions === null || cellOptions === void 0 ? void 0 : cellOptions.onChange)
        ? cellOptions
        : Object.assign(Object.assign({}, cellOptions), { 
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onChange() { } }));
    return disposer;
}
