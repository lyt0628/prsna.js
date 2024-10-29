const path = require('path')
const del = require('delete');

const { rollup } = require('rollup');
const rollupTS = require('rollup-plugin-typescript2')

const gulp = require('gulp');
const uglify = require('gulp-uglify')
const babel = require('gulp-babel');
const rename = require('gulp-rename');


function clean(cb){
  del(['dist/*.js'], cb);
}


const build = async function() {
  const bundle = await rollup({
    input: ['src/main.ts'],
    external : [
      '../',
      '!./'
    ],
    plugins: [
      rollupTS({
      check: false,
      tsconfig: path.resolve(__dirname, '../../tsconfig.json'),
      
    }),

  ],
    
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
exports.bundle = gulp.series(clean,  build, minify)