module.exports = function (grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
      dist: {
        src: [
          'src/export-top.js',
          'src/export-bot.js'
        ],
        dest: 'dist/disbranded.poker.js'
      }
    },
    
    // jasmine: {},
    
    uglify: {
      min: {
        options: {
          banner: '/*\n' + 
                  '* <%= pkg.name %> v<%= pkg.version %>\n' +
                  '* by Adrian Lafond\n' +
                  '* last updated <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                  '*/'
        },
        files: {
          'dist/disbranded.poker-min.js': ['dist/disbranded.poker.js']
        }
      }
    },
    
    watch: {
      test: {
        files: [],
        tasks: ['jasmine']
      }
    }
  })
  
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-jasmine')
  grunt.loadNpmTasks('grunt-contrib-watch')
  
  grunt.registerTask('default', ['concat', 'uglify'])
  grunt.registerTask('test', ['jasmine'])
};