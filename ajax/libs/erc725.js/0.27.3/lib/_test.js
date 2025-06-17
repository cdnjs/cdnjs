"use strict";
const decode = (receivedData) => {
    const capture = [];
    capture.push(receivedData[0]);
    if (receivedData.length > 3) {
        capture.push(receivedData[receivedData.length - 3]);
    }
    if (receivedData.length > 2) {
        capture.push(receivedData[receivedData.length - 2]);
    }
    if (receivedData.length > 1) {
        capture.push(receivedData[receivedData.length - 1]);
    }
    const key = String.fromCharCode.apply(null, capture);
    // console.log(capture, key, /^(\[.*\]|\{.*\})\s*$/.test(key));
    return key;
};
decode(Uint8Array.from(Buffer.from(JSON.stringify({ k: 0 }))));
decode(Uint8Array.from(Buffer.from(`${JSON.stringify({ k: 0 })}\n`)));
decode(Uint8Array.from(Buffer.from(`${JSON.stringify({ k: 0 })}\r\n`)));
//# sourceMappingURL=_test.js.map