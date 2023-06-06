const { src, dest, parallel, series, watch } = require('gulp');
const cssnano = require('gulp-cssnano');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('node-sass'));
const autoprefixer = require('gulp-autoprefixer');
const group_media = require('gulp-group-css-media-queries');
const rename = require('gulp-rename');
const gulp_if = require('gulp-if');

function clear() {
  return src('./build/*', { read: false })
  .pipe(clean());
}

function fonts() {
  return src('./src/fonts/*')
    .pipe(dest('./build/fonts'));
}

function img() {
  return src('./src/image/**/*.jpg')
    .pipe(gulp_if(
      file => file.contents.length > 300 * 1024, 
      imagemin({progressive: true}), 
      dest('./build/image') 
    ))
    .pipe(dest('./build/image'));
}

function svg() {
  return src('./src/image/svg/*.svg')
    .pipe(dest('./build/image/svg'));
}

function scss() {
  const source = './src/style/scss/*.scss';
  return src(source)
    .pipe(changed(source))
    .pipe(
      sass({
        outputStyle: 'expanded'
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 3 versions'],
        cascade: false
      })
    )
    .pipe(group_media())
    .pipe(cssnano())
    .pipe(
      rename({
        extname: '.min.css'
      })
    )
    .pipe(dest('./build/style/scss'))
    .pipe(browsersync.stream());
}

function css() {
  const source = './src/style/normalize.css';
  return src(source)
    .pipe(cssnano())
    .pipe(
      rename({
        extname: '.min.css'
      })
    )
    .pipe(dest('./build/style'))
}

function html() {
  return src('./src/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('./build'))
    .pipe(browsersync.stream());
}

function script() {
  const scr = './src/script/*.js';
  return src(scr)
    .pipe(changed(scr))
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(dest('./build/script'))
    .pipe(browsersync.stream());
}

function watchFiles() {
  watch('./src/image/*');
  watch('./src/style/scss/.scss', scss);
  watch('./src/index.html', html);
  watch('./src/script/*.js', script);
}

function startServer() {
  browsersync.init({
    server: {
      baseDir: './build'
    },
    port: 3000,
    notify: false
  });
}


exports.default = series(clear, parallel(html, img, svg, scss, css, script, fonts));
exports.watch = parallel(watchFiles, startServer);
exports.watch();
