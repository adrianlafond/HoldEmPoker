module.exports = function (grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
      dist: {
        src: [
          'src/export-top.js',
          'src/vars.js',
          'src/poker.js',
          'src/export-bot.js'
        ],
        dest: 'dist/disbranded.poker.js'
      }
    },
    
    jasmine: {
      src: 'dist/disbranded.poker-min.js',
      options: {
        specs: 'spec/*.js'
      }
    },
    
    uglify: {
      min: {
        options: {},
        files: {
          'dist/disbranded.poker-min.js': ['dist/disbranded.poker.js']
        }
      }
    },
    
    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '/*\n' + 
                  ' * <%= pkg.name %> v<%= pkg.version %>\n' +
                  ' * by <%= pkg.author.name %> / <%= pkg.author.email %>\n' +
                  ' * last updated <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                  '**/\n',
          linebreak: false
        },
        files: {
          dist: ['dist/disbranded.poker.js', 'dist/disbranded.poker-min.js']
        }
      }
    },
    
    watch: {
      test: {
        files: ['src/*.js'],
        tasks: ['concat']
      }
    }
  })
  
  grunt.loadNpmTasks('grunt-banner')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-jasmine')
  grunt.loadNpmTasks('grunt-contrib-watch')
  
  grunt.registerTask('default', ['concat', 'uglify', 'jasmine', 'usebanner'])
  grunt.registerTask('test', ['jasmine'])
};