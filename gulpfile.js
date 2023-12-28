const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const fileInclude = require('gulp-file-include');

const server = require('gulp-server-livereload');

const clean = require('gulp-clean');
const fs = require('fs');

gulp.task('clean', function (done) {
    if (fs.existsSync('./docs/')) {
        return gulp.src('./docs/', {read: false})
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
        .pipe(gulp.dest('./docs/'));
})

gulp.task('sass', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./docs/css/'));
});

gulp.task('images', function () {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./docs/img/'));
})

gulp.task('fonts', function () {
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./docs/fonts/'));
})

gulp.task('js', function () {
    return gulp.src('./src/js/**/*')
        .pipe(gulp.dest('./docs/js/'));
})

gulp.task('server', function () {
    return gulp.src('./docs/')
        .pipe(server({
            livereload: true,
            open: true
        }));
})

gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass'))
    gulp.watch('./src/**/*.html', gulp.parallel('html'))
    gulp.watch('./src/img/**/*', gulp.parallel('images'))
    gulp.watch('./src/fonts/**/*', gulp.parallel('fonts'))
    gulp.watch('./src/js/**/*', gulp.parallel('js'))
})

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('html', 'sass', 'images', 'fonts', 'js'),
    gulp.parallel('server', 'watch')
));