const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const fileInclude = require('gulp-file-include');

const server = require('gulp-server-livereload');

const clean = require('gulp-clean');
const fs = require('fs');

gulp.task('clean', function (done) {
    if (fs.existsSync('./dist/')) {
        return gulp.src('./dist/', {read: false})
            .pipe(clean());
    }
    console.log('dist directory not found');
    done()
})

gulp.task('html', function () {
    return gulp.src('./src/*.html')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist/'));
})

gulp.task('sass', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('copyImages', function () {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img/'));
})

gulp.task('server', function () {
    return gulp.src('./dist/')
        .pipe(server({
            livereload: true,
            open: true
        }));
})

gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass'))
    gulp.watch('./src/**/*.html', gulp.parallel('html'))
    gulp.watch('./src/img/**/*', gulp.parallel('copyImages'))
})

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('html', 'sass', 'copyImages'),
    gulp.parallel('server', 'watch')
));