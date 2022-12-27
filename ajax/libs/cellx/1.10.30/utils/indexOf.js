export function indexOf(arr, value) {
    let len = arr.length;
    if (len != 0) {
        if (arr[0] === value) {
            return 0;
        }
        if (len >= 2 && arr[1] === value) {
            return 1;
        }
        for (let i = 2; i < len; i++) {
            if (arr[i] === value) {
                return i;
            }
        }
    }
    return -1;
}
