var source = "var e=self;e.onmessage=function(s){console.log(\"version worker received message:\",s.data),e.postMessage(\"version: \".concat(\"latest\"))};";
var blob = new Blob([source], { type: 'application/javascript' });
var url = URL.createObjectURL(blob);
export function create() {
    return new Worker(url);
}
//# sourceMappingURL=version.js.map