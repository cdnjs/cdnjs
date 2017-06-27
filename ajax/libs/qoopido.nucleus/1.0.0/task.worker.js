/*! Qoopido.nucleus 1.0.0 | https://github.com/dlueth/qoopido.nucleus | (c) 2015 Dirk Lueth */
!function(){var e=this,s=/\\s+/g;e.addEventListener("message",function(s){e.postMessage({type:"result",result:e.process(s.data.load).apply(null,s.data.parameter)})},!1),e.process=function(e){var n=e.substring(e.indexOf("(")+1,e.indexOf(")")).replace(s,",").split(",");return n.push(e.substring(e.indexOf("{")+1,e.lastIndexOf("}"))),Function.apply(null,n)}}();
//# sourceMappingURL=task.worker.js.map
