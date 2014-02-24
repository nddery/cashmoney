module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-ngmin');

  grunt.initConfig({
    ngmin: {
      app: {
        src: ['app/js/app.js']
        ,dest: 'build/js/app.js'
      }
      ,d3: {
        src: ['app/js/d3.js']
        ,dest: 'build/js/d3.js'
      }
      ,controllers: {
        src: ['app/js/controllers/*.js']
        ,dest: 'build/js/controllers.js'
      }
      ,directives: {
        src: ['app/js/directives.js', 'app/js/directives/*.js']
        ,dest: 'build/js/directives.js'
      }
      ,services: {
        src: ['app/js/services/*.js']
        ,dest: 'build/js/services.js'
      }
    }
  });
}
