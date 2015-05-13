'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({

        // Project settings
        app: require('./bower.json'),

        banner: '/*! ngCkeditor v<%= app.version %> by Vitalii Savchuk(esvit666@gmail.com) - ' +
        'https://github.com/esvit/ng-ckeditor - New BSD License */\n',
        copy: {
            styles: {
                files: [
                    {
                        src: './styles/ng-ckeditor.css',
                        dest: './ng-ckeditor.css'
                    }
                ]
            }
        },
        uglify: {
            js: {
                src: ['ng-ckeditor.js'],
                dest: 'ng-ckeditor.min.js',
                options: {
                    banner: '<%= banner %>',
                    sourceMap: function (fileName) {
                        return fileName.replace(/\.js$/, '.map');
                    }
                }
            }
        },
        less: {
            css: {
                files: {
                    'ng-ckeditor.css': './styles/ng-ckeditor.less'
                }
            }
        },
        cssmin: {
            css: {
                files: {
                    'ng-ckeditor.css': 'ng-ckeditor.css'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    'src/scripts/{,*/}*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        }
    });

    grunt.registerTask('test', [
        'karma'
    ]);

    grunt.registerTask('dev', [
        'jshint',
        'less'
    ]);

    grunt.registerTask('default', [
        'dev',
        'uglify',
        'cssmin'
    ]);
};