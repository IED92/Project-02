const gulp = require('gulp');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
// Lint
gulp.task('lint', () => gulp
    .src('./js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));
// JS format and minify
gulp.task('scripts', gulp.series('lint',
    () => gulp
    .src('./js/*.js')
    .pipe(terser())
    .pipe(rename({
        extname: '.min.js',
    }))
    .pipe(gulp.dest('./build/js'))));
// CSS minify
gulp.task('styles', () => gulp
    .src('./css/*.css')
    .pipe(terser())
    .pipe(rename({
        extname: '.min.css',
    }))
    .pipe(gulp.dest('./build/css')));
// Static server
gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './',
        },
    });
    gulp.watch(['.html', 'build/js/.js', 'build/css/.css'])
        .on('change', browserSync.reload);
});
gulp.task('watch', () => {
    gulp.watch(['js/*.js', 'css/*.css'], gulp.parallel('scripts', 'styles'));
});
gulp.task('default', gulp.parallel('browser-sync', 'watch'));