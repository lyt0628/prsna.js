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


const util = require('../gulputil')





let packageInfo;
let bundlePathESM;
const meta = async function(){

  packageInfo = util.readJson(path.resolve(__dirname, 'package.json'))
  bundlePathESM = `dist/prsna-core-esm-${packageInfo.version}.js`;

}


const clean = util.genClean(['dist/*.js'])
const minify = util.genMinify([bundlePathESM])

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

  return bundle.write({
    file: bundlePathESM,
    format: 'esm'
  }); 

}





exports.default = gulp.series(clean, meta, 
                              build);
  
exports.build = gulp.series(clean, meta, 
                                  build, minify);