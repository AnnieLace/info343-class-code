module.exports = function(grunt) {
    //loads file for use
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');


    //tasks are specified with object passed in with this function
    grunt.initConfig({
        //tells how to use the grunt-contrib-connect plug in
        //is in grunt library
        connect: {
            server: {
                options: {
                    keepalive: true,
                    port: 8080,
                    //temporary, short for distribution
                    base: 'dist'
                }
            }
        },
        sass: {
            options: {
                //important for development
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/css/main.css': 'dawg-coffee/scss/main.scss'
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/js/medium-effect.js': 'dawg-coffee/js/medium-effect.js'
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            },
            files : {
                //output            input
                'dist/index.html': 'dawg-coffee/index.html',
                'dist/order.html': 'dawg-coffee/order.html'
            }
        },
        copy: {
            dist: {
                //change working directory
                cwd: 'dawg-coffee/img/',
                src: '*',
                dest: 'dist/img/'
            }
        }
    });

    grunt.registerTask('minify', ['uglify', 'htmlmin']);
    grunt.registerTask('default', ['sass', 'minify', 'connect']);
};