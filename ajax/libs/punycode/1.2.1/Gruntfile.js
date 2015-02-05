module.exports = function(grunt) {

	var commandOptions = {
		'stdout': true,
		'stderr': true,
		'failOnError': true
	};

	grunt.initConfig({
		'meta': {
			'testFile': 'tests/tests.js'
		},
		'uglify': {
			'dist': {
				'options': {
					'report': 'gzip',
					'preserveComments': 'some'
				},
				'files': {
					'punycode.min.js': ['punycode.js']
				}
			}
		},
		'shell': {
			'cover': {
				'command': 'istanbul cover --report "html" --verbose --dir "coverage" "<%= meta.testFile %>"',
				'options': commandOptions
			},
			// Rhino 1.7R4 has a bug that makes it impossible to test punycode.
			// https://bugzilla.mozilla.org/show_bug.cgi?id=775566
			// To test, use Rhino 1.7R3, or wait (heh) for the 1.7R5 release.
			'test-rhino': {
				'command': 'echo "Testing in Rhino..."; rhino -opt -1 "tests.js"',
				'options': {
					'stdout': true,
					'stderr': true,
					'failOnError': true,
					'execOptions': {
						'cwd': 'tests'
					}
				}
			},
			'test-ringo': {
				'command': 'echo "Testing in Ringo..."; ringo -o -1 "<%= meta.testFile %>"',
				'options': commandOptions
			},
			'test-narwhal': {
				'command': 'echo "Testing in Narwhal..."; export NARWHAL_OPTIMIZATION=-1; narwhal "<%= meta.testFile %>"',
				'options': commandOptions
			},
			'test-node': {
				'command': 'echo "Testing in Node..."; node "<%= meta.testFile %>"',
				'options': commandOptions
			},
			'test-browser': {
				'command': 'echo "Testing in a browser..."; open "tests/index.html"',
				'options': commandOptions
			}
		}
	});

	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('cover', 'shell:cover');
	grunt.registerTask('test', [
		'shell:test-rhino',
		'shell:test-ringo',
		'shell:test-narwhal',
		'shell:test-node',
		'shell:test-browser'
	]);

	grunt.registerTask('default', ['test', 'cover', 'uglify']);

};
