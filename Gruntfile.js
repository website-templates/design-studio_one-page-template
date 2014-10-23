module.exports = function(grunt) {
    grunt.initConfig({

      //Assemble *.js files
        concat: {
          main: {
            files: [{
              src: ['dev/js/*.js', '!dev/js/assembled.js'],
              dest: 'dev/js/assembled.js'
            }]
          }
        },

      //Uglify assembled *.js file    
        uglify: {
          options: {
            mangle: false
          },
          vendor: {
            files: [{
                expand: true,
                cwd: 'dev/js/vendor',
                src: '**/*.js',
                dest: 'build/js/vendor',
                ext: '.min.js'
            }]
          },
          main: {
              files: {
                  'build/js/assembled.min.js': 'dev/js/assembled.js'
              }
          }
        },

      //Compile *.scss files  
        sass: {
          main: { 
            options: {
              style: 'expanded',
              sourcemap: 'none'
            },
            files: [{
              expand: true,
              cwd: 'dev/styles',
              src: ['*.{sass,scss}'],
              dest: 'dev/css',
              ext: '.css'
            }]
          }
        }, 

      //Minify and organize *.css files  
        csso: {
          options: {
            keepSpecialComments: '*'
          },
          main: {
            files:[{
              expand: true,
              cwd: 'dev/css/',
              src: ['*.css', '!*.min.css'],
              dest: 'build/css/',
              ext: '.min.css'
            }]  
          }
        },

      //Minify *.html files 
        htmlmin: {  
            main: {     
              options: {             
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true
              },
              files: [ {
                cwd: "dev/html",
                src: "*.html",
                dest: "build/",
                expand: true,
                ext: ".html"
              } ]
            }
        },

      //Minify image files   
        imagemin: {
          main: { 
            options: { 
              optimizationLevel: 7
            },              
            files: [{
              expand: true,      
              cwd: 'dev/img',            
              src: ['**/*.{png,jpg,gif}'], 
              dest: 'build/img/'            
            }]
          }
        },

      //Copy some folders or files (ex. *.php) from dev to build
        copy: {
          js: {
            files: [{
              expand: true, 
              cwd: 'dev/js/',
              src: [
                '**/assembled.js', 
                '**/vendor.js', 
                '**/head.js'],
              dest: 'build/js/'
            }]
          },  
          livejs: {
            files: [{
              expand: true, 
              cwd: 'dev/devtools/',
              src: '**/live.js',
              dest: 'build/js/'
            }]
          },        
          css: {
            files: [{
              expand: true, 
              cwd: 'dev/css',
              src: ['**/*.css'],
              dest: 'build/css/'
            }]
          },        
          html: {
            files: [{
              expand: true, 
              cwd: 'dev/html',
              src: ['**/*.html'],
              dest: 'build/'
            }]
          },   
          helpers: {
            files: [{
              expand: true,
              cwd: 'dev/main/helpers',
              src: ['**/*.*', '**/.htaccess'],
              dest: 'build'
            }]
          }
        },   

      //Assemble bower components in right order 
        bower_concat: {
          main: {
            dest: 'dev/js/vendor/vendor.js'
          }
        },

      //Delete .gitkeep files. If you don't use Bower - just run `grunt clean`  
        clean: {
          debug: ['build/js/**/*.js', 
                  '!build/js/**/*.min.js', 
                  'build/css/**/*.css',
                  '!build/css/**/*.min.css'],
          bower: 'bower_components'   
        },

      //Watch for changes    
        watch: {
          all: {
            files: ['dev/html/**/*.html', 
                    'dev/styles/**/*.{scss,less}', 
                    'dev/css/*.css',
                    'dev/js/**/*.js', 
                    'dev/img/**/*.{png,jpg,gif}'],
            tasks: ['default'],
            options: {
              spawn: false,
            },
          },
        }

    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');

    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['newer:concat', 
                                   'newer:sass', 
                                   'newer:imagemin',
                                   'newer:copy',
                                   'watch'
    ]);

    grunt.registerTask('bower-dev', ['bower_concat',
                                     'clean:bower'
    ]);

    grunt.registerTask('build', ['uglify',
                                 'csso',
                                 'htmlmin',                                     
                                 'clean:debug'
    ]);
};