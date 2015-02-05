//Assumes zopfli is installed
var glob = require('glob');
var fs = require('fs');
var execSync = require('execSync');


glob("../ajax/libs/**/package.json", function (error, matches) {
    matches.forEach(function(element){
        var package = JSON.parse(fs.readFileSync(element, 'utf8'));
        package.assets = Array();
        var versions = glob.sync("../ajax/libs/"+package.name+"/!(package.json)");
        versions.forEach(function(version) {
            var temp = Object();
            temp.files = glob.sync(version + "/**/*.*");

            for (var i = 0; i < temp.files.length; i++){
                var regex = /(?:^.+\/)?(.+?)?\.((?:js)|(?:css))([\.-](?:gz))?$/ig;
                var result = regex.exec(temp.files[i]);
                //result[0] Original Input
                //result[1] Filename
                //result[2] js|css
                //result[3] gz


                if (result == null) {
                    continue;
                }

                if (typeof result[3] == "undefined") { //
                    if (!fs.existsSync(temp.files[i] + ".gz")) {
                        console.log('zopfli', temp.files[i])
                        execSync.exec('zopfli ' + temp.files[i]);
                        console.log('zopfli ended')
                    }
                }
            }
        });
    });
});
