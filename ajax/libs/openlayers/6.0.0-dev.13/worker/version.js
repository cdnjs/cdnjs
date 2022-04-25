var source = "onmessage=function(e){console.log(\"version worker received message:\",e.data),postMessage(\"version: \".concat(\"latest\"))};";
var blob = new Blob([source], { type: 'application/javascript' });
var url = URL.createObjectURL(blob);
export function create() {
    return new Worker(url);
}
//# sourceMappingURL=version.js.map