export function effect(cell, fn, context) {
    let disposer;
    let listener = function (evt) {
        return fn.call(this, evt, disposer);
    };
    disposer = () => {
        cell.offChange(listener, context);
    };
    cell.onChange(listener, context);
    return disposer;
}
