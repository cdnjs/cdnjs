var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var spawn = require('child_process').spawn;

var helpers = require('./helpers.js');
var v1 = require('./converters/v1.js');
var v2 = require('./converters/v2.js');


var MAX_FILE_SIZE = 5 * 1024 * 1024;
var TMP_DIR_NAME = process.cwd() + '/' + 'tmp/';
var SCRIPT = fs.readFileSync('./save_script_tpl.js', { encoding: 'utf8' });

if (!fs.existsSync(TMP_DIR_NAME)) {
    fs.mkdirSync(TMP_DIR_NAME);
}

var defaultHeaders = {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*'
};

function respond(response, code, data, headers) {
    headers = helpers.apply({}, headers, defaultHeaders);
    response.writeHead(code, headers);
    response.end(data);
}

var counter = (function () {
    var value = 0,
        max_int = Math.pow(2, 32) - 1;
    return function () {
        if (value > max_int) {
            value = 0;
        }
        return value++;
    }
})();

http.createServer(function (request, response) {
    if (request.method === 'POST') {
        var body = '';
        request.on('data', function (data) {
            if (body.length <= MAX_FILE_SIZE) {
                body += data;
            } else {
                respond(response, 413, "Request entity too large.");
            }
        });
        request.on('end', function () {
            try {
                var config = qs.parse(body);
            } catch (e) {
                console.error("Parsing request data failed.", e);
            }

            if (config) {
                switch (config.version) {
                    case '2':
                        config = v2.convert(config);
                        break;
                    default:
                        config = v1.convert(config);
                        break;
                }
            }

            if (!config || !config.data) {
                respond(response, 400, "Bad request.");
                return;
            }

            var userFileName = (config.filename || 'chart') + '.' + config.format;
            var serverFileName = TMP_DIR_NAME + counter().toString() + '.' + config.format;
            var scriptFileName = TMP_DIR_NAME + counter().toString() + '.js';

            var script = helpers.interpolate(SCRIPT, helpers.apply(config, {
                filename: serverFileName
            }));

            fs.writeFile(scriptFileName, script, { encoding: 'utf8' }, function (err) {
                if (err) throw err;

                var phantom = spawn('phantomjs', [scriptFileName]);
                phantom.stdout.pipe(process.stdout); // proxy console output from phantom to node
                phantom.on('exit', function (code) {
                    fs.unlink(scriptFileName, function () {
                        if (err) throw err;
                        console.log("Successfully deleted:", scriptFileName);
                    });
                    if (!code) {
                        fs.readFile(serverFileName, function (err, data) {
                            if (err) throw err;
                            respond(response, 200, data, {
                                'Content-Type': config.contentType,
                                'Content-Disposition': 'attachment; filename=' + userFileName
                            });
                            fs.unlink(serverFileName, function () {
                                if (err) throw err;
                                console.log("Successfully deleted:", serverFileName);
                            });
                        });
                    } else {
                        respond(response, 500, "Internal server error.\n" +
                            "phantomjs exited with code " + code);
                    }
                });
            });
        });
    } else {
        respond(response, 400, "Bad request.");
    }
}).listen(1337, '0.0.0.0');
