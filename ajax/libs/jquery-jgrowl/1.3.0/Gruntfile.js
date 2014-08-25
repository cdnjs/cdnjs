module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! jquery.jgrowl.js <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap: true,
        sourceMapName: 'jquery.jgrowl.map'
      },
      jgrowl: {
        files: {
          'jquery.jgrowl.min.js': ['jquery.jgrowl.js']
        }
      },
    },
    cssmin: {
      minify: {
        expand: true,
        src: 'jquery.jgrowl.css',
        ext: '.jgrowl.min.css'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'jquery.jgrowl.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);

};
