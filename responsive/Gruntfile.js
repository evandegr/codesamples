module.exports = function(grunt) {
 
   // Project configuration.
   grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
     watch: {
	  	compass: {
	     	files: ['**/*.{scss,sass}'],
	     	tasks: ['compass:dev']
	     },
	     js: {
	 		files: ['js/**/*.js'],
	 		tasks: ['uglify']
	 	}
	},
	compass: {
	 	dev: {
	 		options: {              
	 			sassDir: ['styles/sass'],
	 			cssDir: ['styles/css'],
	 			environment: 'development'
	 		}
	 	},
	 	prod: {
	 		options: {              
	 			sassDir: ['styles/sass'],
	 			cssDir: ['styles/css'],
	 			environment: 'production'
	 		}
	  	},
  },
  cssmin : {
            css:{
                src: 'styles/css/main.css',
                dest: 'styles/css/main.min.css'
            }
        }
   });
 
    // Load the plugin that provides the "uglify" task.
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-compass');
   grunt.loadNpmTasks('grunt-contrib-cssmin');
 
   // Default task(s).
   grunt.registerTask('default', ['compass:dev', 'watch', 'cssmin:css']);
 
};