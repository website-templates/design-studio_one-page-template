module.exports = function(grunt) {
    grunt.initConfig({

      //Assemble *.js files
        concat: {
          main: {
            files: [{
              src: ['dev/js/*.js', '!dev/js/assembled.js'],
              dest: 'dev/js/assembled.js'
            }]
          },
          head: {
            files: [{
              src: ['dev/js/head/*.js', '!dev/js/head/head.js'],
              dest: 'dev/js/head/head.js'
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
          },
          head: {
            files: {
                'build/js/head/head.min.js': 'dev/js/head/head.js'
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

      //Compile *.less files
        less: {
          main: {
            files: [{
              expand: true,
              cwd: 'dev/styles',
              src: ['*.less'],
              dest: 'dev/css',
              ext: '.css'
            }]
          }       
        },  

      //Combine media queries in result *.css files   
        cmq: {
          options: {
            log: false
          },
          main: {
            files: {
              'dev/css': ['dev/css/*.css']
            }
          }
        },

      //Autoprefixer  
        autoprefixer: {
          options: {
            browsers: ['last 2 versions', 'ie 8', 'ie 9'] 
            //By default >1%, last 2 versions, Firefox ESR, Opera 12.1;
          },           
          main: {
            files:[{
              expand: true,
              flatten: true,
              src: 'dev/css/*.css',
              dest: 'dev/css/'
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

      //Compile *.jade files  
        jade: {
          main: {
            options: {
                client: false,
                pretty: true
            },
            files: [ {
              cwd: "dev/markup",
              src: "*.jade",
              dest: "dev/html/",
              expand: true,
              ext: ".html"
            } ]
          }
        },

      //Compile *.haml files  
        haml: {
          main: {
            files: [ {
              cwd: "dev/markup",
              src: "*.haml",
              dest: "dev/html/",
              expand: true,
              ext: ".html"
            } ]
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
          php: {
            files: [{
              expand: true, 
              cwd: 'dev/php/',
              src: '**', 
              dest: 'build/php/'
            }]
          },
          fonts: {
            files: [{
              expand: true, 
              cwd: 'dev/fonts/',
              src: ['**/*.{eot,svg,ttf,woff}'], 
              dest: 'build/fonts/'
            }]
          },
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
          }
        },   

      //Assemble bower components in right order 
        bower_concat: {
          main: {
            dest: 'dev/js/vendor/vendor.js'
          }
        },

      //Copy bower components to the custom folder   
        // bowercopy: {
        //   options: {
        //     clean: true,
        //     ignore: ['modernizr']
        //   },          
        //   jquery: {
        //     options: {
        //         destPrefix: 'dev/js/vendor'
        //     },
        //     files: {
        //       'jquery': 'jquery/dist/jquery.js'
        //     },
        //   }
        // },

      //Delete .gitkeep files. If you don't use Bower - just run `grunt clean`  
        clean: {
          gitkeep: ['dev/**/.gitkeep', 'build/**/.gitkeep'],
          less: 'dev/**/*.less',
          sass: 'dev/**/*.scss',
          haml: 'dev/**/*.haml',
          jade: 'dev/**/*.jade',
          debug: ['build/js/**/*.js', 
                  '!build/js/**/*.min.js', 
                  'build/css/**/*.css',
                  '!build/css/**/*.min.css'],
          bower: 'bower_components'   
        },

      //Delete some dev code and references from files        
        preprocess : {
          options: {
            context : {
              BUILD: true
            }
          },
          html : {
            src : [ 'dev/html/*.html' ],
            options: {
              inline : true
            }
          },
          css : {
            src : [ 'dev/css/*.css' ],
            options: {
              inline : true
            }
          },
          js : {
            src : [ 'dev/js/*.js' ],
            options: {
              inline : true
            }
          }
        },

      //Watch for changes    
        watch: {
          all: {
            files: ['dev/html/**/*.html', 
                    'dev/styles/**/*.{scss,less}', 
                    'dev/css/*.css',
                    'dev/js/**/*.js', 
                    'dev/img/**/*.{png,jpg,gif}',
                    'dev/markup/**/*.{haml,jade}',
                    'dev/php/**/*.php',
                    'dev/fonts/**/*.{eot,svg,ttf,woff}'],
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
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-combine-media-queries');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-haml2html');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');

    grunt.loadNpmTasks('grunt-bower-concat');
    // grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-preprocess');

    grunt.registerTask('default', ['newer:concat', 
                                   'newer:sass', 
                                   'newer:less', 
                                   'newer:jade',
                                   'newer:haml',
                                   'newer:imagemin',
                                   'newer:copy',
                                   'watch'
    ]);

    grunt.registerTask('bower-dev', ['bower_concat',
                                     // 'bowercopy',
                                     'clean:gitkeep',
                                     'clean:bower'
    ]);

    grunt.registerTask('build', ['preprocess',
                                 'cmq',
                                 'autoprefixer',
                                 'uglify',
                                 'csso',
                                 'htmlmin',                                     
                                 'clean:debug'
    ]);
};