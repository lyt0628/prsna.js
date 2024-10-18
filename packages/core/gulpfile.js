const path = require('path')
const del = require('delete');

const { rollup } = require('rollup');
const rollupTS = require('rollup-plugin-typescript2')

const gulp = require('gulp');
const uglify = require('gulp-uglify')
const babel = require('gulp-babel');
const rename = require('gulp-rename');

var concat = require('gulp-concat')

const ts = require('gulp-typescript')
const tsPrj = ts.createProject(path.resolve(__dirname, '../../tsconfig.json'))

function clean(cb){
  del(['dist/*.js'], cb);
}

function build() {
  return gulp.src('src/**/*.ts')
    .pipe(tsPrj('../../tsconfig.json'))
    .pipe(gulp.dest('dist/'));
}


const bundle = async function() {
  const bundle = await rollup({
    input: ['src/index.ts'],
    plugins: [rollupTS({
      check: false,
      tsconfig: path.resolve(__dirname, '../../tsconfig.json')
    })]
  });

  return bundle.write({
    file: 'dist/index.js',
    format: 'esm'
  });
}

function minify(cb){
    gulp.src('dist/index.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./dist'));
    cb()
}

exports.default = gulp.series(clean, build)
exports.bundle = gulp.series(clean,  bundle, minify)