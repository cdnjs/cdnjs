
        export function create() {
          const source = "var e=self;e.onmessage=function(s){console.log(\"version worker received message:\",s.data),e.postMessage(\"version: \".concat(\"latest\"))};";
          return new Worker(typeof Blob === 'undefined'
            ? 'data:application/javascript;base64,' + Buffer.from(source, 'binary').toString('base64')
            : URL.createObjectURL(new Blob([source], {type: 'application/javascript'})));
        }
      
