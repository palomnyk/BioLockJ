/**
Author: Aaron Yerke
Purpose: Interfacing with biolockj-api
Notes:
*/

const { spawn } = require('child_process');
const path = require('path');
const {BLJ_PROJ, BLJ, BLJ_CONFIG, HOST_BLJ} = require(path.join('..','lib','constants.js'));

exports.listModules = function (req, res, next) {
  try {
    let bljApi = spawn(`biolockj-api listModules`, {shell: '/bin/bash'});
    bljApi.stdout.on('data', function (data) {
      console.log('stdout: ' + data.toString());
      res.setHeader('Content-Type', 'text/html');
      res.write((JSON.stringify(String(data))));
      res.end();
    });
    bljApi.stderr.on('data', function (data) {
      console.log('stderr: ' + data.toString());
    });
    bljApi.on('exit', function (code) {
      console.log('child process exited with code ' + code.toString());
    });
  } catch (error) {
    console.error(error);
    errorLogger.writeError(e.stack);
  }
}
