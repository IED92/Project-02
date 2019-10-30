// Variables
const gulp = require('gulp');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const cleanCss = require('gulp-clean-css');
const sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer');
// Sass
gulp.task('sass', () => gulp
    .src('./sass/style.scss')
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
      })));
// Lint
gulp.task('lint', () => gulp
  .src('./js/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));
// JS format and minify
gulp.task('mini-scripts', gulp.series('lint',
  () => gulp
    .src('./js/*.js')
    .pipe(terser())
    .pipe(rename({
      extname: '.min.js',
    }))
    .pipe(gulp.dest('./build/js'))));
// CSS minify
gulp.task('mini-styles', () => gulp
  .src('./css/*.css')
  .pipe(cleanCss())
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
  gulp.watch(['*.html', 'build/js/*.js', 'build/css/*.css'])
    .on('change', browserSync.reload);
});
gulp.task('watch', () => {
  gulp.watch(['js/*.js', 'css/*.css'], gulp.parallel(['mini-scripts', 'mini-styles']));
});
gulp.task('default', gulp.parallel(['browser-sync', 'watch', 'sass']));
