module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
          'src/export-top.js',
          'src/vars.js',
          'src/util.js',
          'src/deck.js',
          'src/hand.js',
          'src/hand-constants.js',
          'src/hand-prototype.js',
          'src/hand-static.js',
          'src/poker.js',
          'src/public-static.js',
          'src/export-bot.js'
        ],
        dest: 'dist/disbranded.poker.js'
      },
      lingo: {
        src: ['src/lingo.en.js'],
        dest: 'dist/disbranded.poker.lingo.en.js'
      }
    },

    jasmine: {
      src: ['dist/disbranded.poker.js', 'dist/disbranded.poker.lingo.en.js'],
      options: {
        specs: 'spec/*.js'
      }
    },

    uglify: {
      min: {
        options: {},
        files: {
          'dist/disbranded.poker-min.js': ['dist/disbranded.poker.js'],
          'dist/disbranded.poker.lingo.en-min.js': ['dist/disbranded.poker.lingo.en.js']
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
      build: {
        files: ['src/*.js'],
        tasks: ['default']
      },
      test: {
        files: ['spec/*.js'],
        tasks: ['test']
      }
    }
  })

  grunt.loadNpmTasks('grunt-banner')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-jasmine')
  grunt.loadNpmTasks('grunt-contrib-watch')

  // grunt.registerTask('default', ['concat', 'uglify', 'usebanner', 'jasmine'])
  grunt.registerTask('build', ['concat', 'uglify', 'usebanner'])
  grunt.registerTask('test', ['jasmine'])
  grunt.registerTask('default', ['build', 'test'])
};