let project_folder = "dist";
let source_folder = "src";
let npmPath = "node_modules/";
let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
    },
    src: {
        html: [source_folder + "/**/*.twig", "!" + source_folder + "/layouts/_*.twig"],
        css: source_folder + "/scss/*.{scss,css}",
        js: source_folder + "/js/*.js",
        img: source_folder + "/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp,mp4,m4v}",
        fonts: source_folder + "/fonts/**/*",
    },
    watch: {
        html: source_folder + "/**/*.twig",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp,mp4,m4v}"
    },
    clean: "./" + project_folder + "/",
}

let {
    src,
    dest
} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    scss = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    twig = require('gulp-twig'),
    ttf2woff2 = require('gulp-ttftowoff2'),
    gutil = require('gulp-util');

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}

function js() {
    return src([
            npmPath + 'jquery/dist/jquery.min.js',
            npmPath + 'bootstrap/dist/js/bootstrap.bundle.js',
            npmPath + 'swiper/swiper-bundle.min.js',
            path.src.js
        ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function fonts() {
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
        .pipe(browsersync.stream())
}

function html() {
    return src(path.src.html)
        .pipe(twig())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src([
            npmPath + 'bootstrap/dist/css/bootstrap.css',
            npmPath + 'animate.css/animate.css',
            npmPath + 'swiper/swiper-bundle.min.css',
            path.src.css,
        ])
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(concat('app.min.css'))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 10 versions"],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function cleandist() {
    return src(project_folder, {
        allowEmpty: true
    }).pipe(clean())
}

let build = gulp.series(cleandist, gulp.parallel(js, css, html, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.build = build;
exports.watch = watch;
exports.default = watch;