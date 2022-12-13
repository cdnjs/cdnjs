
        export function create() {
          const source = "var e=self;e.onmessage=function(s){console.log(\"version worker received message:\",s.data),e.postMessage(\"version: \".concat(\"latest\"))};";
          const blob = new Blob([source], {type: 'application/javascript'});
          const url = URL.createObjectURL(blob);
          return new Worker(url);
        }
      
