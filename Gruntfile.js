 module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg :   grunt.file.readJSON( '../package.json' ),
        copy: {
            main: {
                files:[
                    {
                        expand: false,
                        cwd: './',
                        src: 'context-plugin-bootstrap.php',
                        dest: "../<%= pkg.plugin_name.toLocaleLowerCase().replace(/[^a-z0-9]/gi, '-') %>-bootstrap.php"
                    },
                    {
                        expand: false,
                        cwd: './',
                        src: 'context-plugin.php',
                        dest: "../<%= pkg.plugin_name.toLocaleLowerCase().replace(/[^a-z0-9]/gi, '-' ) %>.php"
                    },
                    {
                        expand: false,
                        cwd: './',
                        src: 'composer.json',
                        dest: "../composer.json"
                    },
                    {
                        expand: false,
                        cwd: './',
                        src: 'apigen.neon',
                        dest: "../apigen.neon"
                    },
                    {
                        expand: true,
                        cwd: 'includes',
                        src: '**',
                        dest: '../includes/'
                    },
                    {
                        expand: true,
                        cwd: 'classes/',
                        src: '**',
                        dest: '../classes/'
                    },
                    {
                        expand: true,
                        cwd: 'languages/',
                        src: '**',
                        dest: '../languages/'
                    }
                ]
            }
        },
        rename: {
            core: {
                src: '../classes/class-context-plugin.php',
                dest: "../classes/class-<%= pkg.plugin_name.toLocaleLowerCase().replace(/[^a-z0-9]/gi, '-' ) %>.php"
            },
            grunt:{
                src: 'installed.js',
                dest: '../Gruntfile.js'
            }
        },
        uglify: {
            min: {
                files: grunt.file.expandMapping( [
                    'assets/js/*.js',
                    '!assets/js/*.min.js',
                    '!assets/js/*.min-latest.js'
                ], '../assets/js/', {
                    rename : function ( destBase, destPath ) {
                        return destBase + destPath.replace( '.js', '.min.js' );
                    },
                    flatten: true
                } )
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            minify : {
                expand: true,
                cwd   : '../assets/css/',
                src   : ['*.css', '!*.min.css'],
                dest  : '../assets/css/',
                ext   : '.min.css'
            }
        },
        clean: {
            build: ["etc/**", "node_modules/**",".git/**",".gitignore","composer.json","Gruntfile.js","package.json"],
        }
    });

     //load modules
     grunt.loadNpmTasks( 'grunt-curl' );
     grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
     grunt.loadNpmTasks( 'grunt-contrib-uglify' );
     grunt.loadNpmTasks( 'grunt-contrib-copy' );
     grunt.loadNpmTasks( 'grunt-contrib-clean' );
     grunt.loadNpmTasks( 'grunt-rename' );
     //installer tasks
     grunt.registerTask( 'default', [ 'copy', 'clean', 'rename', 'cssmin', 'uglify' ] );
 };
