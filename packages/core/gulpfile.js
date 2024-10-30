// Node Mudoles
const path = require('path')
const del = require('delete');
const fs = require('fs')

// Rolup
const { rollup } = require('rollup');
const rollupTS = require('rollup-plugin-typescript2')
const tslib = require('tslib')

// Gulp
const gulp = require('gulp');
const uglify = require('gulp-uglify')
const babel = require('gulp-babel');
const rename = require('gulp-rename');







let packageInfo;
let bundlePathESM;
let bundlePathIIFE;
let tsconfigPath; 
const meta = async function(){
  fs.readFile(path.resolve(__dirname, 'package.json'), (err, data)=>{
    if(err){
      console.error("error when read package.json!");
    }
    const json = data.toString();
  
    try{
      packageInfo = JSON.parse(json);
      bundlePathESM = `dist/prsna-core-esm-${packageInfo.version}.js`;
      bundlePathIIFE = `dist/prsna-core-iife-${packageInfo.version}.js`;
    }catch(e){
      console.error(e);
    }
  });


  fs.copyFile(path.resolve(__dirname, '../../tsconfig.json'), './tsconfig.json', (err)=>{
    if(err){
      console.error("Copy tsconfig.json failed.");
    }
  })
  tsconfigPath = path.resolve(__dirname, '/tsconfig.json');
}

function clean(cb){
  del(['dist/*.js', 'tsconfig.json'], cb);
}

const build = async function() {

  const bundle = await rollup({
    input: ['src/index.ts'],
    plugins: [
      rollupTS({
      check: true,
      tsconfigPath: path.resolve(__dirname, '../../tsconfig.json'),

    }),

  ],
  });

   let esmPromise = bundle.write({
    file: bundlePathESM,
    format: 'esm'
  }); 

  let iifePromise = bundle.write({
    file: bundlePathIIFE,
    format: 'iife',
    name: 'prsna'
  })


  return Promise.all([esmPromise, iifePromise])
}


function minify(cb){
    gulp.src(bundlePathESM)
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./dist'));


    gulp.src(bundlePathIIFE)
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./dist'));
    cb()
}

exports.default = gulp.series(clean, meta, 
                              build);
  
exports.build = gulp.series(clean, meta, 
                                  build, minify);