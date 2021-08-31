const fs = require('fs');

function copy() {
  [
    {
      source: './src/js/jQuery-provider.js', destination: './dist/js/jQuery-provider.js'
    }
  ].forEach(file => {
    console.log(`copying ${file.source} to ${file.destination}`);
    fs.copyFileSync(file.source, file.destination)
  });
}

copy();