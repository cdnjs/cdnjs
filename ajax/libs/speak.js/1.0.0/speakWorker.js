importScripts("//cdnjs.cloudflare.com/ajax/libs/speak.js/1.0.0/speakGenerator.js");onmessage=function(a){postMessage(generateSpeech(a.data.text,a.data.args))}
