module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),
  	requirejs: {
  		compile: {
  			options: {
  				baseUrl: "src/lib/",
  				mainConfigFile: "src/config.js",
                name: "main", // not sure what this does yet.
      			out: "public/javascripts/main.js"
   			}
		}
	},
	watch: {
      js: {
        files: ['public/javascript/*.js'],
        tasks: ['requirejs:js'],
        options: {
          livereload: true,
        }
      }
  },
  nodemon: {
  dev: {
    script: 'app.js'
  }
}

});

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Default task(s).
  grunt.registerTask('default', ['nodemon','requirejs']);
  

};