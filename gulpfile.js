var gulp = require('gulp');
var typescript = require('gulp-typescript');
var tscConfig = require('./tsconfig.json');

const DEPLOY = "express";
const EXPRESS = "src";
const WEB_APP = "web";
const LIB = "lib";

const EXPRESS_DEST = `${DEPLOY}/${EXPRESS}`;
const WEB_DEST = `${DEPLOY}/${WEB_APP}`;
const LIB_DEST = `${WEB_DEST}/${LIB}`;

const COMPILE = "compile";
const COMPILE_EXPRESS = `${COMPILE}:${EXPRESS}`;
const COMPILE_APP = `${COMPILE}:${WEB_APP}`;

const COPY = "copy";
const ASSETS = "assets";
const COPY_ASSETS = `${COPY}-${ASSETS}`;
const COPY_EXPRESS_ASSETS = `${COPY_ASSETS}:${EXPRESS}`;
const COPY_WEB_ASSETS = `${COPY_ASSETS}:${WEB_APP}`;
const COPY_LIB = `${COPY}:${LIB}`;

function copyAssets(src, dest) {
    return gulp.src(src).pipe(gulp.dest(dest))
}

function copyLib(source, target) {
    return copyAssets(`node_modules/${source}/**/*`, `${target}/${source}`)
        .pipe(gulp.dest(`${WEB_APP}/${LIB}/${source}`));
}

function compileTs(sourceFolder, targetFolder) {
    return gulp
        .src(`${sourceFolder}/**/*.ts`)
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(gulp.dest(`${targetFolder}/${sourceFolder}`));
}
gulp.task(COMPILE_EXPRESS, ()=> compileTs("src", DEPLOY));
gulp.task(COMPILE_APP, ()=> compileTs("web", DEPLOY));


gulp.task(COPY_EXPRESS_ASSETS, ()=>copyAssets([
    "src/application.config.json"
], EXPRESS_DEST));


gulp.task(COPY_WEB_ASSETS, ()=>copyAssets([
    "web/index.html",
    "web/systemjs.config.js",
], WEB_DEST));

function copyLibTasks(sources, target) {
    return sources.map((s)=> {
        var task = `${COPY_LIB}:${s}`;
        gulp.task(task, ()=>copyLib(s, target));
        return task;
    });
}

gulp.task(COPY_LIB, copyLibTasks([
    "core-js",
    "zone.js/dist",
    "reflect-metadata",
    "systemjs/dist",
    "@angular",
    "rxjs"
], LIB_DEST));


gulp.task("default", [
    COPY_EXPRESS_ASSETS,
    COMPILE_EXPRESS,
    COMPILE_APP,
    COPY_WEB_ASSETS,
    COPY_LIB,
]);