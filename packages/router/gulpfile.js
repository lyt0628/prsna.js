// Node Mudoles
const path = require('path')


// Rolup
const { rollup } = require('rollup');
const rollupTS = require('rollup-plugin-typescript2')


// Gulp
const gulp = require('gulp');


const util = require('../gulputil');



let packageInfo;
let esmBundlePath;

packageInfo = util.readJson(path.resolve(__dirname, 'package.json'))
esmBundlePath = path.resolve(__dirname, `dist/prsna-mona-esm-${packageInfo.version}.js`);



const clean = util.genClean(['dist/*', 'tsconfig.json']);
const minify = util.genMinify('./dist/**/*.js')

const build = util.genBuildTSAsESM(['src/index.ts'], esmBundlePath)




exports.default = gulp.series(clean, build);
  
exports.prod = gulp.series(clean, build, minify);