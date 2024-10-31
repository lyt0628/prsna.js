// Node Mudoles
const path = require('path')
const del = require('delete');
const fs = require('fs')

// Rolup
const { rollup } = require('rollup');
const rollupTS = require('rollup-plugin-typescript2')


// Gulp
const gulp = require('gulp');
const uglify = require('gulp-uglify')
const babel = require('gulp-babel');
const rename = require('gulp-rename');



function genClean(paths){
    return function clean(cb){
        del(paths, cb);
      }
}
 
function readJson(absPath){
    const jsonStr = fs.readFileSync(absPath).toString();
    return JSON.parse(jsonStr);
}

function genMinify(files){
  return function(cb){
    files.forEach(f => {
      gulp.src(f)
      .pipe(babel())
      .pipe(uglify())
      .pipe(rename({extname: '.min.js'}))
      .pipe(gulp.dest('./dist'));
    });
  
    cb();
  }

}

function genBuildTS(inputs, output, tsConfig){

  return async function() {

    const bundle = await rollup({
    input: inputs,
    plugins: [
      rollupTS({
      check: true,
      tsconfigPath: tsConfig,
    }),

  ],
  });

   let esmPromise = bundle.write({
    file: output,
    format: 'esm'
  }); 

  return esmPromise;
  }
}

module.exports.genClean = genClean;
module.exports.readJson = readJson;
module.exports.genMinify = genMinify;
module.exports.genBuildTS = genBuildTS;