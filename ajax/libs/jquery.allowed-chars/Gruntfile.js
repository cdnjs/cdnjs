module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            allowedChars: {
                options: {
                    banner: "/*! <%= pkg.name %> <%= grunt.template.today('dd-mm-yyyy') %> Copyright (c) 2014 Pavlo Voznenko (p.voznenko@gmail.com) " +
                        "https://github.com/fosco-maestro/jquery-allowed-chars-simple-plugin " +
                        "under MIT license: http://www.opensource.org/licenses/mit-license.php */",
                    mangle: true,
                    compress: true,
                    sourceMap: true
                },
                files: {
                    'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
                }
            }
        },
        jshint: {
            files: ['dist/<%= pkg.name %>.js'],
            options: {
                jshintrc: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint', 'uglify']);
};
