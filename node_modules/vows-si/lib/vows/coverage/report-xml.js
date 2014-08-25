var fs = require('fs'),
    file = require('./file');

this.name = 'coverage-report-xml';

this.report = function (coverageMap) {
    var all = {
            xml: '',
            packages: 0,
            files: 0,
            lines: 0,
            hits: 0
        },
        data = {};

    // group data by path      
    for (var filename in coverageMap) {
        if (coverageMap.hasOwnProperty(filename)) {
            var pkg = (filename.indexOf('/') > 0)
                ? filename.substr(0, filename.lastIndexOf('/'))
                : filename;
            if (!data[pkg]) {
                data[pkg] = {};
            }
            data[pkg][ (filename.indexOf('/'))
                ? filename.substr(filename.lastIndexOf('/') + 1, filename.length)
                : filename ]
                = file.coverage(filename, coverageMap[filename]);
        }
    }

    // generate groups xml-fragment
    for (var pkg in data) {
        if (data.hasOwnProperty(pkg)) {
            var pkgStat = {
                xml: '',
                files: 0,
                lines: 0,
                hits: 0
            };

            all.xml += '\t<package name="' + pkg + '">\n';

            for (var filename in data[pkg]) {
                if (data[pkg].hasOwnProperty(filename)) {
                    pkgStat.files += 1;
                    pkgStat.lines += data[pkg][filename].sloc;
                    pkgStat.hits += data[pkg][filename].hits;

                    pkgStat.xml += '\t\t<srcfile name="' + filename + '">\n'
                        + '\t\t\t<coverage type="line, %" value="' + data[pkg][filename].coverage.toFixed(2) + '%  (' + data[pkg][filename].hits + '/' + data[pkg][filename].sloc + ')"/>\n'
                        + '\t\t</srcfile>\n';
                }
            }

            all.packages += 1;
            all.files += pkgStat.files;
            all.lines += pkgStat.lines;
            all.hits += pkgStat.hits;

            all.xml += '\t\t<coverage type="line, %" value="' + ((pkgStat.hits * 100) / pkgStat.lines).toFixed(2) + '%  (' + pkgStat.hits + '/' + pkgStat.lines + ')"/>\n'
                + pkgStat.xml
                + '\t</package>\n';
        }
    }

    all.xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
        + '<report>\n<stats>\n'
        + '\t<packages value="' + all.packages + '"/>\n'
        + '\t<classes value="0"/>\n'
        + '\t<methods value="0"/>\n'
        + '\t<srcfiles value="' + all.files + '"/>\n'
        + '\t<srclines value="' + all.lines + '"/>\n'
        + '</stats>\n<data>\n'
        + '<all name="all classes">\n'
        + '\t<coverage type="line, %" value="' + ((all.hits * 100) / all.lines).toFixed(2) + '%  (' + all.hits + '/' + all.lines + ')"/>\n'
        + all.xml
        + '</all>\n</data>\n</report>\n';

    fs.writeFileSync('coverage.xml', all.xml);
};
