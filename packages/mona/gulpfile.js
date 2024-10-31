// Node Mudoles
const path = require('path')


// Rolup
const { rollup } = require('rollup');
const rollupTS = require('rollup-plugin-typescript2')


// Gulp
const gulp = require('gulp');


const util = require('../gulputil');


let packageInfo;
let bundlePathESM;
let tsconfigPath; 

const meta = async function(){
  packageInfo = util.readJson(path.resolve(__dirname, 'package.json'))
  bundlePathESM = path.resolve(__dirname, `dist/prsna-mona-esm-${packageInfo.version}.js`);

  tsconfigPath = path.resolve(__dirname, '../../tsconfig.json');
}

const clean = util.genClean(['dist/*', 'tsconfig.json']);
const minify = util.genMinify([bundlePathESM])


const build = async function() {

  const bundle = await rollup({
    input: ['src/index.ts'],
    plugins: [
      rollupTS({
      check: true,
      tsconfigPath: tsconfigPath,

    }),

  ],
  });

   let esmPromise = bundle.write({
    file: bundlePathESM,
    format: 'esm'
  }); 

  return esmPromise;
}



exports.default = gulp.series(clean, meta, build);
  
exports.build = gulp.series(clean, meta, build, minify);