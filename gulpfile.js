const {src, dest, watch} = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    cleanCSS = require( 'gulp-clean-css'),
    rename = require("gulp-rename");

function bs() {
    serveSass()
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    watch("./*.html").on('change', browserSync.reload);
    watch("./sass/**/*.sass", serveSass);
    watch("./sass/**/*.scss", serveSass);
    watch("./js/*.js").on('change', browserSync.reload);

};

function serveSass() {
   return src('./sass/**/*.sass', './sass/**/*.scss')
    .pipe(sass.sync())
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(dest('./css'))
    .pipe(browserSync.stream())
};

exports.serve = bs;
exports.default = this.serve; 