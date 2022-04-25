
        const source = "onmessage=function(e){console.log(\"version worker received message:\",e.data),postMessage(\"version: \".concat(\"latest\"))};";
        const blob = new Blob([source], {type: 'application/javascript'});
        const url = URL.createObjectURL(blob);
        export function create() {
          return new Worker(url);
        }
      
