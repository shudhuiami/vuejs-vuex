let gulp = require('gulp'),
    sass = require('gulp-sass'),
    del = require('del'),
    minify = require('gulp-minify'),
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    cleanCSS = require('gulp-clean-css');



// gulp.task('minify', () => {
//     return gulp.src('resources/js/*.js', { allowEmpty: true })
//         .pipe(minify({noSource: true,ext:'.js',suffix: ''}))
//         .pipe(gulp.dest('js/'))
// });

gulp.task('build', () => {
    return gulp.src('stylesheets/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename({suffix: ".min",}))
        .pipe(gulp.dest('src/assets/styles/'));
});

gulp.task('cache-clean', () => {
    return del([
        'stylesheets/.sass-cache/',
    ]);
});


gulp.task('default', gulp.series(['build','cache-clean']));


gulp.task('watch', () => {
    gulp.watch('stylesheets/**/*.scss', (done) => {
        gulp.series(['build','cache-clean'])(done);
    });
});
