module.exports = function(grunt) {



  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {

      options: {
        preserveComments: 'some'
      },

      build: {
        src: 'src/regression.js',
        dest: 'build/regression.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};