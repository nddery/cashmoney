module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-cssc');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.initConfig({
    clean: ["dist"]

    ,concat: {
      app_js: {
         src: 'app/js/**/*.js'
        ,dest: 'dist/js/cm.js'
      }
      ,modules_js: {
        src: 'app/modules/**/*.js'
        ,dest: 'dist/modules/modules.js'
      }
      ,css: {
        src: [
           'app/css/vendor/**/*.css'
          ,'app/modules/**/*.css'
          ,'app/css/app.css'
        ]
        ,dest: 'dist/css/cm.css'
      }
    }

    ,ngmin: {
      cm: {
        files: {
          'dist/js/cm.js': ['dist/js/cm.js']
          ,'dist/modules/modules.js': ['dist/modules/modules.js']
        }
      }
    }

    ,uglify: {
      build: {
        files: {
          'dist/js/cm.js': ['dist/js/cm.js']
          ,'dist/modules/modules.js': ['dist/modules/modules.js']
        }
      }
    }

    ,cssc: {
      build: {
        files: {
          'dist/css/cm.css': 'dist/css/cm.css'
        }
      }
    }

    ,cssmin: {
      build: {
         src: 'dist/css/cm.css'
        ,dest: 'dist/css/cm.css'
      }
    }

    ,htmlmin: {
      dist: {
        options: {
           collapseBooleanAttributes:     true
          ,collapseWhitespace:            true
          ,removeAttributeQuotes:         true
          ,removeComments:                true
          ,removeEmptyAttributes:         true
          ,removeRedundantAttributes:     true
          ,removeScriptTypeAttributes:    true
          ,removeStyleLinkTypeAttributes: true
        }
        ,expand: true
        ,cwd: 'app/'
        ,src: ['**/*.html']
        ,dest: 'dist/'
      }
    }

    ,copy: {
      data: {
         src: 'app/data/data.full.json'
        ,dest: 'dist/data/data.full.json'
      }
      ,lib: {
        files: [{
          expand: true
          ,cwd: 'app/'
          ,src: ['lib/**/*.js']
          ,dest: 'dist/'
        }]
      }
    }

    ,imagemin: {
      dynamic: {
        options: {
          cache: false
          ,pngquant: true
        }
        ,files: [{
           expand: true
          ,cwd: 'app/'
          ,src: ['**/*.{png,jpg,gif}']
          ,dest: 'dist/'
        }]
      }
    }
  });

  grunt.registerTask('build', [
     'concat'
    ,'ngmin'
    ,'uglify'
    ,'cssc'
    ,'cssmin'
    ,'htmlmin'
    ,'copy'
    ,'imagemin'
  ]);
}
