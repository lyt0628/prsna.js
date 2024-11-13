
// Help rollup to hadle node_modules reference that using just 'package_name' or '@scope/package_name'

const fs = require('fs')
const path = require('path')

const gulp = require('gulp');

// Rolup
const { rollup } = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript2');
const rollupNodeResolve = require('@rollup/plugin-node-resolve');
const rollupAlias = require('@rollup/plugin-alias');
const rollupCommonJs = require('@rollup/plugin-commonjs');

const entries = require('./scripts/alias');

const packagesInfo = require('./package.json');
const packageDirs = fs.readdirSync(path.resolve(__dirname, 'packages'));



function genOutputConfig(packageDir){
    const packagePackageInfo = require(path.resolve(packageDir, 'package.json'));
    const packageName = path.basename(packageDir);
    const packageVersion = packagePackageInfo.version;
    return {
        'esm-bundler': {
            file: path.resolve(packageDir, `dist/${packageName}-${packageVersion}.esm-bundler.js`),
            format: 'es'
        },
        cjs: {
            file: path.resolve(packageDir, `dist/${packageName}-${packageVersion}.cjs.js`),
            format: 'cjs'
        },
        iife: {
            file: path.resolve(packageDir, `dist/${packageName}-${packageVersion}.iife.js`),
            format: 'iife'
        }
    }
}

const lookupPackages = function(){
    return packageDirs
                .map((p)=>path.resolve(__dirname, `./packages/${p}`))
                .filter((p)=>fs.statSync(p).isDirectory())
}

const buildFormat = async function (format){
    // console.log(lookupPackages());


    const buildPromises =  lookupPackages().flatMap((packageDir)=>{
        const outputConfigs = genOutputConfig(packageDir);
        
        return [
            buildPromise(packageDir, outputConfigs[format]),
            // buildPromise(packageDir, outputConfigs.cjs)
        ]
    })


  return Promise.all(buildPromises);

    async function buildPromise(resolvedDir, outputConfig) {
        const bundle = await rollup({
            input: path.resolve(resolvedDir, 'src/index.ts'),
            plugins: [
                rollupAlias({
                    entries
                }),
                rollupTypescript({
                    check: true,
                    tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
                }),
                rollupCommonJs({
                    SourceMap: false,
                }),
                rollupNodeResolve()
            ],
        });

        return bundle.write({
            file: outputConfig.file,
            format: outputConfig.format
        });
    }
}


const build = function (){
    return buildFormat('esm-bundler');
}


exports.default = build;