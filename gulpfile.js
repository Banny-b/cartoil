const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const maps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const clean = require('gulp-clean');
const fs = require('fs');
const server = require('gulp-server-livereload');
const changed = require('gulp-changed');

// Task for Pug
gulp.task('pug', function buildHTML() {
    return gulp
        .src('./src/*.pug')
        .pipe(changed('./docs', {hasChanged: changed.compareContents}))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'PUG',
                message: 'Error <%= error.message %>',
                sound: false
            })
        }))
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./docs/'))
});

// Task for Scss
gulp.task('sass', function() {
    return gulp
        .src('./src/scss/*.scss')
        .pipe(changed('./docs/css/'))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'Styles',
                message: 'Error <%= error.message %>',
                sound: false
            })
        }))
        .pipe(maps.init())
        .pipe(autoprefixer())
        .pipe(sass())
        .pipe(csso()) // CSS minification
        .pipe(maps.write())
        .pipe(gulp.dest('./docs/css/'))
});

// Task for Fonts
gulp.task('fonts', function() {
    return gulp
        .src('./src/fonts/**/*')
        .pipe(changed('./docs/fonts/'))
        .pipe(gulp.dest('./docs/fonts/'))
})

// Task for Images
gulp.task('img', function() {
    return gulp
        .src('./src/images/**/*')
        .pipe(changed('./docs/images/'))
        .pipe(gulp.dest('./docs/images/'))
})

// Task for clean docs
gulp.task('clean', function(done) {
    if (fs.existsSync('./docs/')) {
        return gulp
            .src('./docs/', {read: false})
            .pipe(clean({force: true}))
    }
    done();
});

// Task for Watch
gulp.task('watch', function() {
    gulp.watch('./src/**/*.pug', gulp.parallel('pug'))
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass'))
    gulp.watch('./src/fonts/**/*', gulp.parallel('fonts'))
    gulp.watch('./src/images/**/*', gulp.parallel('img'))
});

// Task for Server
gulp.task('server', function() {
    return gulp
        .src('./docs/')
        .pipe(server({livereload: true, open: true}))
});

// Task Default
gulp.task('default', 
    gulp.series('clean', gulp.parallel('pug', 'sass', 'fonts', 'img'), 
    gulp.parallel('server', 'watch')
));