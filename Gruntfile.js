module.exports = function (grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {},
    
    jasmine: {},
    
    uglify: {},
    
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
  
  grunt.registerTask('default', ['concat', 'jasmine', 'uglify'])
  grunt.registerTask('test', ['jasmine'])
};