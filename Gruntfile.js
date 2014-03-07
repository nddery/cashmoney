module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.initConfig({
    ngmin: {
      app: {
        src: ['app/js/app.js']
        ,dest: 'dist/js/app.js'
      }
      ,d3: {
        src: ['app/js/d3.js']
        ,dest: 'dist/js/d3.js'
      }
      ,controllers: {
        src: ['app/js/controllers/*.js']
        ,dest: 'dist/js/controllers.js'
      }
      ,directives: {
        src: ['app/js/directives.js', 'app/js/directives/*.js']
        ,dest: 'dist/js/directives.js'
      }
      ,services: {
        src: ['app/js/services/*.js']
        ,dest: 'dist/js/services.js'
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes:     true,
          collapseWhitespace:            true,
          removeAttributeQuotes:         true,
          removeComments:                true,
          removeEmptyAttributes:         true,
          removeRedundantAttributes:     true,
          removeScriptTypeAttributes:    true,
          removeStyleLinkTypeAttributes: true
        },
        // files: {
        //   'dist/index.html': 'app/index.html',
        // },
        expand: true,
        cwd: './',
        src: ['app/partials/*.html'],
        dest: 'dist/partials/'
      }
    }
  });

  grunt.registerTask('build',   ['ngmin', 'htmlmin']);
}
