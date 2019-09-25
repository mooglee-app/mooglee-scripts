// @remove-file-on-eject

'use strict';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const fs        = require('fs-extra');
const path      = require('path');
const execSync  = require('child_process').execSync;
const chalk     = require('react-dev-utils/chalk');
const paths     = require('../lib/paths');
const inquirer  = require('react-dev-utils/inquirer');
const spawnSync = require('react-dev-utils/crossSpawn').sync;
const os        = require('os');
const replace   = require('replace-in-file');

const green = chalk.green;
const cyan  = chalk.cyan;

function getGitStatus() {
  try {
    let stdout = execSync(`git status --porcelain`, {
      stdio: ['pipe', 'pipe', 'ignore'],
    }).toString();
    return stdout.trim();
  } catch (e) {
    return '';
  }
}

function tryGitAdd(appPath) {
  try {
    spawnSync(
      'git',
      ['add', path.join(appPath, 'config'), path.join(appPath, 'scripts')],
      {
        stdio: 'inherit',
      },
    );

    return true;
  } catch (e) {
    return false;
  }
}


inquirer
  .prompt({
    type: 'confirm',
    name: 'shouldEject',
    message: 'Are you sure you want to eject? This action is permanent.',
    default: false,
  })
  .then(answer => {
    if (!answer.shouldEject) {
      console.log(cyan('Close one! Eject aborted.'));
      return;
    }

    const gitStatus = getGitStatus();
    if (gitStatus) {
      console.error(
        chalk.red(
          'This git repository has untracked files or uncommitted changes:',
        ) +
        '\n\n' +
        gitStatus
          .split('\n')
          .map(line => line.match(/ .*/g)[0].trim())
          .join('\n') +
        '\n\n' +
        chalk.red(
          'Remove untracked files, stash or commit any changes, and try again.',
        ),
      );
      process.exit(1);
    }

    console.log('Ejecting...');

    const ownPath = paths.ownPath;
    const appPath = paths.app;

    // Do not override any existent file in the app directory
    function verifyAbsent(file, index) {
      const exceptions = ['_app.js', '_document.js', 'next.config.js'];
      if (fs.existsSync(file) && !exceptions.find(_exc => file.indexOf(_exc) >= 0)) {
        delete files[index];
      }
    }

    const folders = ['config', 'components', 'pages', 'store', 'lib', 'scripts', 'server', 'tools', 'wrappers'];


    // Make shallow array of files paths
    const files = folders.reduce((files, folder) => {
      return files.concat(
        fs
          .readdirSync(path.join(ownPath, folder))
          // set full path
          .map(file => path.join(ownPath, folder, file))
          // omit dirs from file list
          .filter(file => fs.lstatSync(file).isFile()),
      );
    }, []);

    // Make shallow array of files paths
    const appFiles = files.map(_file => {
      return _file.replace(paths.ownPath, paths.app);
    });

    appFiles.push(path.join(appPath, 'babel.config.js'));
    files.push(path.join(ownPath, 'babel.config.js'));
    files.push(path.join(ownPath, 'appExports.js'));


    // Ensure that the app folder is clean and we won't override any files
    appFiles.forEach(verifyAbsent);
    console.log(cyan(`Copying files into ${appPath}`));

    folders.forEach(folder => {
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(path.join(appPath, folder));
      }
    });

    files.forEach(file => {
      let content = fs.readFileSync(file, 'utf8');

      // Skip flagged files
      if (content.match(/\/\/ @remove-file-on-eject/)) {
        return;
      }
      content =
        content
        // Remove dead code from .js files on eject
          .replace(
            /\/\/ @remove-on-eject-begin([\s\S]*?)\/\/ @remove-on-eject-end/gm,
            '',
          )
          .replace(/\/\*\*@add-on-eject@/g, '')
          .replace(/@add-on-eject@\*\*\//g, '')
          .trim() + '\n';

      // Update the relative paths in appExports.js
      if (file.indexOf('appExports.js')) {
        content =
          content
            .replace(/..\/..\/./g, '');
      }
      console.log(`  Adding ${cyan(file.replace(ownPath, ''))} to the project`);
      fs.writeFileSync(file.replace(ownPath, appPath), content);
    });
    console.log();

    const ownPackage = require(path.join(ownPath, 'package.json'));
    const appPackage = require(path.join(appPath, 'package.json'));

    console.log(cyan('Updating the dependencies'));
    const ownPackageName = ownPackage.name;
    if (appPackage.devDependencies) {
      /**      if (appPackage.devDependencies[ownPackageName]) {
        console.log(`  Removing ${cyan(ownPackageName)} from devDependencies`);
        delete appPackage.devDependencies[ownPackageName];
      }**/
    }
    appPackage.dependencies = appPackage.dependencies || {};
    /**    if (appPackage.dependencies[ownPackageName]) {
      console.log(`  Removing ${cyan(ownPackageName)} from dependencies`);
      delete appPackage.dependencies[ownPackageName];
    }**/
    Object.keys(ownPackage.dependencies).forEach(key => {
      // For some reason optionalDependencies end up in dependencies after install
      if (
        ownPackage.optionalDependencies &&
        ownPackage.optionalDependencies[key]
      ) {
        return;
      }
      console.log(`  Adding ${cyan(key)} to dependencies`);
      appPackage.dependencies[key] = ownPackage.dependencies[key];
    });
    // Sort the deps
    const unsortedDependencies = appPackage.dependencies;
    appPackage.dependencies    = {};
    Object.keys(unsortedDependencies)
      .sort()
      .forEach(key => {
        appPackage.dependencies[key] = unsortedDependencies[key];
      });
    console.log();

    console.log(cyan('Updating the scripts'));
    delete appPackage.scripts['eject'];
    Object.keys(appPackage.scripts).forEach(key => {
      appPackage.scripts[key] = appPackage.scripts[key].replace(
        /node_modules\/@mooglee\/core\/scripts/g,
        './scripts',
      );
    });

    console.log();
    console.log(cyan('Configuring package.json'));


    fs.writeFileSync(
      path.join(appPath, 'package.json'),
      JSON.stringify(appPackage, null, 2) + os.EOL,
    );
    console.log();

    // "Don't destroy what isn't ours"
    /**    if (ownPath.indexOf(appPath) === 0) {
      try {
        // remove @mooglee/core from app node_modules
        fs.removeSync(ownPath);
      } catch (e) {
        // It's not essential that this succeeds
      }
    }**/


    console.log(cyan('Resolving the @mooglee/core imports'));

    const appPathDepth = appPath.split('/').length;

    // Replace all the "@mooglee/core" occurrences in the app by the matching relative path
    replace({
      files: [
        `${appPath}/**`,
        `${appPath}/**/**`,
        `${appPath}/**/**/**`,
        `${appPath}/**/**/**/**`,
      ],
      from:  /@mooglee\/core/g,
      to: (...args) => {
        const filePath = args[3];
        const filePathDepth = filePath.split('/').length;
        return ['', '.', '..', '../..', '../../..', '../../../..'][filePathDepth - appPathDepth];
      },
      ignore: [
        `${appPath}/node_modules/**`,
        `${appPath}/build/**`,
        `${appPath}/.git/**`,
        `${appPath}/package.json`,
        `${appPath}/package-lock.json`,
      ],
    })
      .catch(error => {
        throw error
      })
      .then(function() {
        console.log();
        console.log(cyan('Running npm install...'));
        spawnSync('npm', ['install', '--loglevel', 'error'], {
          stdio: 'inherit',
        });

        console.log(green('Ejected successfully!'));
        console.log();

        if (tryGitAdd(appPath)) {
          console.log(cyan('Staged ejected files for commit.'));
          console.log();
        }
      })
  });
