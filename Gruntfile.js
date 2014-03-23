module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: ['dist/'],
      game: ['game/lib/']
    },

    concat: {
      dist: {
        src: [
          'src/export-top.js',
          'src/vars.js',
          'src/util.js',
          'src/card.js',
          'src/deck.js',
          'src/hand.js',
          'src/hand-constants.js',
          'src/hand-prototype.js',
          'src/hand-static.js',
          'src/player.js',
          'src/bet.js',
          'src/round.js',
          'src/sidepot.js',
          'src/pot.js',
          'src/table.js',
          'src/poker.js',
          'src/export-bot.js'

        ],
        dest: 'dist/disbranded.poker.js'
      },
      lingo: {
        src: ['src/lingo.en.js'],
        dest: 'dist/disbranded.poker.lingo.en.js'
      },
      game: {
        src: ['src/game.holdem.js'],
        dest: 'dist/disbranded.poker.game.holdem.js'
      }
    },

    jasmine: {
      src: [
        'dist/disbranded.poker.js',
        'dist/disbranded.poker.lingo.en.js',
        'dist/disbranded.poker.game.holdem.js'
      ],
      options: {
        specs: 'spec/*.js'
      }
    },

    uglify: {
      min: {
        options: {},
        files: {
          'dist/disbranded.poker-min.js': ['dist/disbranded.poker.js'],
          'dist/disbranded.poker.lingo.en-min.js': ['dist/disbranded.poker.lingo.en.js'],
          'dist/disbranded.poker.game.holdem-min.js': ['dist/disbranded.poker.game.holdem.js']
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

    copy: {
      game: {
        expand: true,
        cwd: 'dist/',
        src: ['**.js', '!*-test.js', '!*-min.js'],
        dest: 'game/lib/',
        filter: 'isFile'
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
      },
      game: {
        files: ['src/*.js'],
        tasks: ['build', 'game']
      }
    },

    shell: {
      game: {
        command: 'node www/www.js'
      }
    }
  })

  grunt.loadNpmTasks('grunt-banner')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-jasmine')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-shell')

  // grunt.registerTask('default', ['concat', 'uglify', 'usebanner', 'jasmine'])
  grunt.registerTask('build', ['clean', 'concat', 'uglify', 'usebanner', 'copy'])
  grunt.registerTask('test', ['jasmine'])
  grunt.registerTask('game', ['shell:game'])
  grunt.registerTask('default', ['build'])
};
