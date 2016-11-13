var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function() {

});

gulp.task('develop', function() {
    var stream = nodemon({
        env: { 'NODE_ENV': 'development', 'NODE_PATH': './config:./app/libs' },
        script: 'server.js',
        ext: 'html js',
        ignore: ['node_modules']
    })

    stream
        .on('restart', function() {
            console.log('restarted!')
        })
        .on('crash', function() {
            console.error('Application has crashed!\n')
            stream.emit('restart', 10)
        })
})
