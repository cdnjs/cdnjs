// gruntjs.com
 
/*jshint node:true*/
module.exports = function(grunt) {
	'use strict';

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		cmpnt: grunt.file.readJSON('../component.json'),
		banner: '/*! Social Likes v<%= cmpnt.version %> by Artem Sapegin - ' +
				'http://sapegin.github.com/social-likes - Licensed MIT */\n',
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			files: [
				'grunt.js',
				'social-likes.js'
			]
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: 'social-likes.js',
				dest: '../social-likes.min.js'
			}
		},
		stylus: {
			compile: {
				files: {
					'../social-likes.css': 'styles/index.styl'
				},
				options: {
					'include css': true,
					'urlfunc': 'embedurl'
				}
			}
		},
		csso: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '../social-likes.css',
				dest: '../social-likes.css'
			}
		},		
		watch: {
			stylus: {
				files: 'styles/**',
				tasks: 'stylus'
			}
		},
		imgo: {
			imgo: {
				src: 'icons/*.png',
				skip: require('os').platform() === 'win32'
			}
		}
	});

	grunt.registerTask('default', ['jshint', 'uglify', 'imgo', 'stylus', 'csso']);
	grunt.registerTask('build', ['uglify', 'imgo', 'stylus', 'csso']);

};