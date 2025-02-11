// This is a sample JavaScript file for testing the AI-powered PR reviewer bot

const fs = require('fs');
const path = require('path');

// A custom module import
const listOfTestModules = require('./listOfTestModules');

const buildDirs = listOfTestModules.dirs;
const buildFiles = listOfTestModules.files;

// Check if a directory exists and create it
if (!fs.existsSync('./generated')) {
    fs.mkdirSync('./generated');
}

/**
 * This function is used to inject a list of files to compile into binding.gyp
 * @returns list of files to compile by node-gyp
 */
module.exports.filesToCompile = function () {
    const matchedModules = require('./matchModules').matchWildCards(process.env.npm_config_filter || '');

    const addedFiles = './generated/binding.cc test_helper.h';
    const filterConditions = matchedModules.split(' ').length ? matchedModules.split(' ') : [matchedModules];
    const files = [];

    for (const matchCondition of filterConditions) {
        if (buildDirs[matchCondition.toLowerCase()]) {
            for (const file of buildDirs[matchCondition.toLowerCase()]) {
                const config = buildFiles[file];
                const separator = config.dir.length ? '/' : '';
                files.push(config.dir + separator + file);
            }
        } else if (buildFiles[matchCondition.toLowerCase()]) {
            const config = buildFiles[matchCondition.toLowerCase()];
            const separator = config.dir.length ? '/' : '';
            files.push(config.dir + separator + matchCondition.toLowerCase());
        }
    }

    let filesToCompile = '';
    files.forEach((file) => {
        filesToCompile = `${filesToCompile} ../test/${file}.cc`;
    });

    fs.writeFileSync(path.join(__dirname, '/generated/compilelist'), `${addedFiles} ${filesToCompile}`.split(' ').join('\r\n'));

    return `${addedFiles} ${filesToCompile}`;
};

/**
 * This function is used by the generateBindingCC step in binding.gyp
 * @returns list of test files to bind exported init functions
 */
module.exports.filesForBinding = function () {
    const filterCondition = require('./matchModules').matchWildCards(process.env.npm_config_filter || '');
    fs.writeFileSync(path.join(__dirname, '/generated/bindingList'), filterCondition.split(' ').join('\r\n'));
    return filterCondition;
};

// Test cases
if (require.main === module) {
    const assert = require('assert');

    const setEnvAndCall = (fn, filterCondition) => {
        process.env.npm_config_filter = filterCondition;
        return fn();
    };

    assert.strictEqual(
        setEnvAndCall(module.exports.filesToCompile, 'typed*ex*'),
        './generated/binding.cc test_helper.h  ../test/typed_threadsafe_function/typed_threadsafe_function_existing_tsfn.cc'
    );

    console.log('All tests passed');
}
