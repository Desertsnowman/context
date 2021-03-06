module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        uglify: {
            min: {
                files: grunt.file.expandMapping( [
                    'assets/js/*.js',
                    '!assets/js/*.min.js',
                    '!assets/js/*.min-latest.js'
                ], 'assets/js/', {
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
                cwd   : 'assets/css/',
                src   : ['*.css', '!*.min.css'],
                dest  : 'assets/css/',
                ext   : '.min.css'
            }
        },
        shell: {
            composer: {
                command: 'composer update'
            },
            apigen: {
                command: '"vendor/bin/apigen" generate'
            },
        }

    });

    //load modules
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-shell');
    //installer tasks
    grunt.registerTask( 'default', [ 'shell:composer', 'cssmin', 'uglify', 'shell:apigen' ] );
    grunt.registerTask( 'docs', [ 'shell:apigen' ] );

};
