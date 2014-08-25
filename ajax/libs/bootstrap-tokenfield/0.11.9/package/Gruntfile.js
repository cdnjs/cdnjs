module.exports = function (grunt) {

  var semver = require('semver'),
      f = require('util').format;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    version: '<%= pkg.version %>',

    banner: [
      '/*!',
      ' * bootstrap-tokenfield <%= version %>',
      ' * https://github.com/sliptree/bootstrap-tokenfield',
      ' * Copyright 2013-2014 Sliptree and other contributors; Licensed MIT',
      ' */\n\n'
    ].join('\n'),    
    
    copy: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.js': 'js/<%= pkg.name %>.js'
        }
      },
      assets: {
        files: [{
          expand: true,
          flatten: true,
          src: [
            'bower_components/bootstrap/js/affix.js',
            'bower_components/bootstrap/js/scrollspy.js',
            'bower_components/typeahead.js/dist/typeahead.bundle.min.js'
          ],
          dest: 'docs-assets/js/'
        }]
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.js'
        }
      },
      docs: {
        files: {
          'docs-assets/js/docs.min.js': 'docs-assets/js/docs.js'
        }
      }
    },

    less: {
      compile: {
        files: {
          'dist/css/<%= pkg.name %>.css': 'less/<%= pkg.name %>.less',
          'dist/css/tokenfield-typeahead.css': 'less/tokenfield-typeahead.less'
        }
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          'dist/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.css',
          'dist/css/tokenfield-typeahead.min.css': 'dist/css/tokenfield-typeahead.css'
        }
      }
    },

    jekyll: {
      docs: {}
    },

    watch: {
      copy: {
        files: 'js/**/*',
        tasks: ['copy']
      },
      less: {
        files: 'less/**/*',
        tasks: ['less']
      },
      jekyll: {
        files: ['dist/**/*', 'index.html', 'docs-assets/**/*'],
        tasks: ['uglify:docs', 'jekyll']
      },
      livereload: {
        options: { livereload: true },
        files: ['dist/**/*'],
      }
    },

    exec: {
      git_is_clean: {
        cmd: 'test -z "$(git status --porcelain)"'
      },
      git_on_master: {
        cmd: 'test $(git symbolic-ref --short -q HEAD) = master'
      },
      git_add: {
        cmd: 'git add .'
      },
      git_commit: {
        cmd: function(m) { return f('git commit -m "%s"', m); }
      },
      git_tag: {
        cmd: function(v) { return f('git tag v%s -am "%s"', v, v); }
      },
      git_push: {
        cmd: 'git push && git push --tags'
      },
      update_docs: {
        cmd: [
          'git checkout gh-pages',
          'git reset master --hard',
          'sed -i.bak \'s/%VERSION%/v<%= version %>/\' index.html',
          'rm -rf index.html.bak',
          'git add index.html',
          'git commit -m "Update docs to <%= version %>"',
          'git checkout master'
        ].join(' && ')
      },
      npm_publish: {
        cmd: 'npm publish'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-sed');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('manifests', 'Update manifests.', function(version) {
    var _ = grunt.util._,
        pkg = grunt.file.readJSON('package.json'),
        bower = grunt.file.readJSON('bower.json'),
        jqueryPlugin = grunt.file.readJSON('bootstrap-tokenfield.jquery.json');

    bower = JSON.stringify(_.extend(bower, {
      name: pkg.name,
      version: version
    }), null, 2);

    jqueryPlugin = JSON.stringify(_.extend(jqueryPlugin, {
      name: pkg.name,
      title: pkg.name,
      version: version,
      author: pkg.author,
      description: pkg.description,
      keywords: pkg.keywords,
      homepage: pkg.homepage,
      bugs: pkg.bugs,
      maintainers: pkg.contributors
    }), null, 2);

    pkg = JSON.stringify(_.extend(pkg, {
      version: version
    }), null, 2);

    grunt.file.write('package.json', pkg);
    grunt.file.write('bower.json', bower);
    grunt.file.write('bootstrap-tokenfield.jquery.json', jqueryPlugin);
  });

  grunt.registerTask('release', 'Ship it.', function(version) {
    var curVersion = grunt.config.get('version');

    version = semver.inc(curVersion, version) || version;

    if (!semver.valid(version) || semver.lte(version, curVersion)) {
      grunt.fatal('invalid version dummy');
    }

    grunt.config.set('version', version);

    grunt.task.run([
      'exec:git_on_master',
      'exec:git_is_clean',
      'manifests:' + version,
      'build',
      'exec:git_add',
      'exec:git_commit:' + version,
      'exec:git_tag:' + version,
      'exec:update_docs'
      //'exec:git_push',
      //'exec:npm_publish',
    ]);
  });  

  // Build task
  grunt.registerTask('build', ['copy', 'uglify', 'less']);
}