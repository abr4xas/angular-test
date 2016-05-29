var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    size = require('gulp-size'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps');

// Js Bundle
gulp.task('bundleJS', function () {
    var jQuery = './src/jquery/dist/jquery.js',
        BootstrapJs = './src/bootstrap/dist/js/bootstrap.js',
        angular = './src/angular/angular.js',
        uiRouter = './src/angular-ui-router/release/angular-ui-router.js',
        ngResource = './src/angular-resource/angular-resource.js',
        appModule = './src/js/modules/*.js',
        appService = './src/js/services/*.js',
        appRoutes = './src/js/routes/*.js',
        appController = './src/js/controllers/*.js';

    gulp.src([jQuery, BootstrapJs])
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.stream());

    gulp.src([angular, uiRouter, ngResource])
        .pipe(sourcemaps.init())
        .pipe(concat('angular-libs.min.js'))
        .pipe(uglify())
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.stream());

    gulp.src([appModule, appService, appController, appRoutes])
        .pipe(sourcemaps.init())
        .pipe(concat('app-libs.min.js'))
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.stream());
});

// CSS
gulp.task('css', function () {
    var bootStrap = './src/bootstrap/dist/css/bootstrap.css';

    return gulp.src([bootStrap])
        .pipe(minifyCSS('*'))
        .pipe(concat('style.min.css'))
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest('./css'));
});

// Copiar archivos estaticos (icon fonts bootstrap/font-awesome)
gulp.task('static', function () {
    var BootstrapF = './src/bootstrap/fonts/**/*';

    return gulp.src([BootstrapF])
        .pipe(gulp.dest('./fonts'));
});



// Default
gulp.task('default', ['static', 'css', 'bundleJS', 'browser-sync']);

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['bundleJS'], browserSync.reload);

// Servidor estático.
// Crea un servidor local y efectúa un Livereload
// cuando ocurren cambios  dentro de directorio 'src'
gulp.task('browser-sync', ['bundleJS'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./src/**/*', ['js-watch']);
});