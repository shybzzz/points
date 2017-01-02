var gulp = require('gulp');
var typescript = require('gulp-typescript');
var tscConfig = require('./tsconfig.json');

const COMPILE_EXPRESS = 'compile:server';
const COPY_EXPRESS_ASSETS = 'copy:express:assets';

gulp.task(COMPILE_EXPRESS, function () {
    return gulp
        .src('src/**/*.ts')
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(gulp.dest('express'));
});

gulp.task(COPY_EXPRESS_ASSETS, function () {
    return gulp.src([
        "src/application.config.json"
    ]).pipe(gulp.dest('express'))
});

gulp.task("default", [COPY_EXPRESS_ASSETS, COMPILE_EXPRESS]);