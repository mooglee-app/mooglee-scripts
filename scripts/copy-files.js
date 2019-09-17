/* eslint-disable no-console */
const path        = require('path');
const glob        = require('glob');
const fse         = require('fse');
const packagePath = process.cwd();
const buildPath   = path.join(packagePath, './build');
const srcPath     = path.join(packagePath, './src');
const ncp = require('ncp').ncp

async function createPackageFile() {
  const packageData = await fse.readFile(path.resolve(packagePath, './package.json'), 'utf8');
  const { scripts, devDependencies, ...packageDataOther } = JSON.parse(
    packageData,
  );

  const newPackageData = {
    ...packageDataOther,
    private: false,
    main: './index.js',
  };
  const targetPath = path.resolve(buildPath, './package.json');

  await fse.writeFile(targetPath, JSON.stringify(newPackageData, null, 2), 'utf8');
  console.log(`Created package.json in ${targetPath}`);

  return newPackageData;
}

async function copyFiles() {
  return await Promise.all([
    '.env.development',
    '.env.production',
    '.env.test',
    'next.config.js',
    '.babelrc'
  ].map(async function(_file) {
    return await ncp(path.join(srcPath, _file), path.join(buildPath, _file));
  }))
}

/**
 * Puts a package.json into every immediate child directory of rootDir.
 * That package.json contains information about esm for bundlers so that imports
 * like import Typography from '@material-ui/core/Typography' are tree-shakeable.
 *
 * It also tests that an this import can be used in typescript by checking
 * if an index.d.ts is present at that path.
 *
 * @param {string} rootDir
 */
async function createModulePackages({ from, to }) {
  const directoryPackages = glob.sync('*/index.js', { cwd: from }).map(path.dirname);

  await Promise.all(
    directoryPackages.map(async directoryPackage => {
      const packageJson     = {
        sideEffects: false,
      };
      const packageJsonPath = path.join(to, directoryPackage, 'package.json');

      await fse.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));


      return packageJsonPath;
    }),
  );
}


async function run() {
  try {
    await createPackageFile();
    await copyFiles();
    await createModulePackages({ from: srcPath, to: buildPath });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
