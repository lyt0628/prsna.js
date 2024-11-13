

const fs = require('fs')
const path = require('path')


const resolveEntryForPkg = (/** @type {string} */ p) =>
    path.resolve(
      __dirname,
      `../packages/${p}/src/index.ts`,
    );

const packageDirs = fs.readdirSync(path.resolve(__dirname, '../packages'));


/** variables to hold symbol references to disk path.
 *  spec entries for that project name is different with diirname.
 * @type {Record<string, string>} */
const aliasMap = {

};

/**
 * auto generate entries for key to dirname
 */
  for (const dir of packageDirs) {
    const key = `@prsna/${dir}`
    if (
      dir !== 'prsna' &&
      !(key in aliasMap) &&
      fs.statSync(path.resolve(__dirname, `../packages/${dir}`)).isDirectory()
    ) {
      aliasMap[key] = resolveEntryForPkg(dir)
    }
  }

  module.exports = aliasMap;