module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
	  concurrent:{
	dev:{
		tasks:["watch"]
		
	},
	options: {
		reload:true,
		logConcurrentOutput: true
	}
	},
	"browserify":{
		dist:{
			files:{
				"public/script.js":["react/script.js"]
			},
			options:{
				"transform": [
					["reactify", {"es6": true}]
				]
			}
		}
	},
	watch: {
	scripts: {
		files: ['source/*.js','game/*.js'],
		tasks: ["browserify","run:server"],
			options: {
				//debounceDelay: 250,
				reload:true,
				interrupt:true
			},
		},
	},
    
  );

	grunt.loadNpmTasks('grunt-babel');	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-run');
	grunt.loadNpmTasks('grunt-browserify');
  // Default task(s).
  grunt.registerTask('default', ["watch"]);
  
};