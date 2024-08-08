export function fastIndexOf(arr, value) {
    let len = arr.length;
    if (len != 0) {
        if (arr[0] === value) {
            return 0;
        }
        for (let i = 1; i < len; i++) {
            if (arr[i] === value) {
                return i;
            }
        }
    }
    return -1;
}
