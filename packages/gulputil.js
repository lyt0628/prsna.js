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

function genMinifyJs(glob){
  return function(cb){
    gulp.src(glob)
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./dist'));
    cb();
  }
}



function genBuildTSAsESM(inputs, output){
  const tsconfg =  path.resolve(__dirname, "../tsconfig.json");
  return async function() {

    const bundle = await rollup({
    input: inputs,
    plugins: [
      rollupTS({
      check: true,
      tsconfigPath: tsconfg,
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
module.exports.genMinify = genMinifyJs;
module.exports.genBuildTSAsESM = genBuildTSAsESM;