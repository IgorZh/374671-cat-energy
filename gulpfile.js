"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var server = require("browser-sync").create();
var del = require("del");
var run = require("run-sequence");

gulp.task("style", function() {
  gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
});

gulp.task("sprite", function() {
  return gulp
    .src("source/img/sprite-*.svg")
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("images", function() {
  return gulp
    .src("build/img/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("build/img"))
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.svgo(),
      ])
    );
});

gulp.task("copy", function() {
  return gulp
    .src(
      [
        "source/*.html",
        "source/fonts/**/*.{woff,woff2}",
        "source/img/**",
        "source/js/**",
      ],
      {
        base: "source",
      }
    )
    .pipe(gulp.dest("build"));
});

gulp.task("copy-html", function() {
  return gulp
    .src(["source/*.html"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
});

gulp.task("copy-js", function() {
  return gulp
    .src(["source/js/**"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
});

gulp.task("copy-image", function() {
  return gulp
    .src(["source/img/**",], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("build", function(done) {
  run("clean", "copy", "style", "images", "sprite", done);
});

gulp.task("build-image", function(done) {
  run("copy-image", "images", done);
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html", ["copy-html"]);
  gulp.watch("source/js/*.js", ["copy-js"]);
  gulp.watch("source/img/*", ["build-image"]);
});
