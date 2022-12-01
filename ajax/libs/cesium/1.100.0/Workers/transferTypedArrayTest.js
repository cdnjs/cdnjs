undefined
typeof self>"u"&&(self={}),self.onmessage=function(a){const e=a.data.array,s=self.webkitPostMessage||self.postMessage;try{s({array:e},[e.buffer])}catch{s({})}};
