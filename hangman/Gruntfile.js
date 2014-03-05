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
   uglify: {
	 	all: {
	 		files: {
	         	'js/main.min.js': [
	         	'js/libs/jquery-2.1.0.min.js', 
	         	'js/main.js'
	         	]
	     	}
		},
   },
   cssmin : {
        css:{
            src: 'styles/css/main.css',
            dest: 'styles/css/main.min.css'
        }
   }
    // Tasks
   });
 
    // Load the plugin that provides the "uglify" task.
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-compass');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-cssmin');
 
   // Default task(s).
   grunt.registerTask('default', ['compass:dev' , 'uglify' , 'watch', 'cssmin:css']);
 
};