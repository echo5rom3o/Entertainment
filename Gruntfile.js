module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
	 
	"browserify":{
		dist:{
			files:{
				"public/interface/script.js":["react/script.js"],
				"public/interface/link.js":["react/link.js"],
				"public/interface/group.js":["react/group.js"]
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
		files: ['react/*.js','route/*.js',"index.js"],
		tasks: ["browserify","run:server"],
			options: {
				//debounceDelay: 250,
				reload:true,
				interrupt:true
			},
		},
	},
	run:{
		server:{
		args:["index.js"]
		}
	}
    
  });

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-run');
	grunt.loadNpmTasks('grunt-browserify');
  // Default task(s).
  grunt.registerTask('default', ["watch"]);
};