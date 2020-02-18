/**
Author: Aaron Yerke
Purpose: Interfacing with biolockj-api
Notes:
*/

const { spawn } = require('child_process');
const path = require('path');
const {BLJ_PROJ, BLJ, BLJ_CONFIG, HOST_BLJ} = require(path.join('..','lib','constants.js'));

/*
listModules [extra_modules_dir]
Returns a list of classpaths to the classes that extend BioModule.
Optionally supply the path to a directory containing additional modules.

listApiModules [extra_modules_dir]
Like listModules but limit list to modules that implement the ApiModule interface.

listProps [module]
Returns a list of properties.
If no args, it returns the list of properties used by the BioLockJ backbone.
If a modules is given, then it returns a list of all properties used by
that module.

listAllProps [extra_modules_dir]
Returns a list of all properties, include all backbone properties and all module properties.
Optionally supply the path to a directory containing additional modules to include their properties.

propType <prop> [module [extra_modules_dir] ]
Returns the type expected for the property: String, list, integer, positive number, etc.
If a module is supplied, then the modules propType method is used.

describeProp <prop> [module [extra_modules_dir] ]
Returns a description of the property.
If a module is supplied, then the modules getDescription method is used.

propValue <prop> [confg]
Returns the value for that property given that config file (optional) or 
no config file (ie the default value)

isValidProp <prop> <val> [module] [modules…] [extra_modules_dir]
T/F/NA. Returns true if the value (val) for the property (prop) is valid;
false if prop is a property but val is not a valid value,
and NA if prop is not a recognized property.
IF a module is supplied, then additionally call the validateProp(key, value)
for each module given.

propInfo
Returns a json formatted list of the general properties (listProps)
with the type, descrption and default for each property

moduleInfo [extra_modules_dir]
Returns a json formatted list of all modules and for each module that 
implements the ApiModule interface, it lists the props used by the module,
and for each prop the type, descrption and default.
*/

exports.listModules = function (req, res, next) {
  try {
    console.log(`get req params: ${String(req.body.jsonParam)}`);
    let param = req.params.path ? req.body.jsonParam != undefined : "";
    let bljApi = spawn(`biolockj-api listModules ${param}`, {shell: '/bin/bash'});
    bljApi.stdout.on('data', function (data) {
      console.log('stdout: ' + data.toString());
      res.setHeader('Content-Type', 'text/html');
      res.write((JSON.stringify(data.toString())));
      res.end();
      return;
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

exports.listApiModules = function (req, res, next) {
  try {
    console.log(`get req params: ${String(req.body.jsonParam)}`);
    let param = req.params.path ? req.body.jsonParam != undefined : "";
    let bljApi = spawn(`biolockj-api listApiModules ${param}`, {shell: '/bin/bash'});
    bljApi.stdout.on('data', function (data) {
      console.log('stdout: ' + data.toString());
      res.setHeader('Content-Type', 'text/html');
      res.write((JSON.stringify(data.toString())));
      res.end();
      return;
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

exports.listProps = function (req, res, next) {
  try {
    console.log(`get req params: ${String(req.body.jsonParam)}`);
    let param = req.params.path ? req.body.jsonParam != undefined : "";
    let bljApi = spawn(`biolockj-api listProps ${param}`, {shell: '/bin/bash'});
    bljApi.stdout.on('data', function (data) {
      console.log('stdout: ' + data.toString());
      res.setHeader('Content-Type', 'text/html');
      res.write((JSON.stringify(data.toString())));
      res.end();
      return;
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


/*
listProps [module]
Returns a list of properties.
If no args, it returns the list of properties used by the BioLockJ backbone.
If a modules is given, then it returns a list of all properties used by
that module.

listAllProps [extra_modules_dir]
Returns a list of all properties, include all backbone properties and all module properties.
Optionally supply the path to a directory containing additional modules to include their properties.

propType <prop> [module [extra_modules_dir] ]
Returns the type expected for the property: String, list, integer, positive number, etc.
If a module is supplied, then the modules propType method is used.

describeProp <prop> [module [extra_modules_dir] ]
Returns a description of the property.
If a module is supplied, then the modules getDescription method is used.

propValue <prop> [confg]
Returns the value for that property given that config file (optional) or 
no config file (ie the default value)

isValidProp <prop> <val> [module] [modules…] [extra_modules_dir]
T/F/NA. Returns true if the value (val) for the property (prop) is valid;
false if prop is a property but val is not a valid value,
and NA if prop is not a recognized property.
IF a module is supplied, then additionally call the validateProp(key, value)
for each module given.

propInfo
Returns a json formatted list of the general properties (listProps)
with the type, descrption and default for each property

moduleInfo [extra_modules_dir]
Returns a json formatted list of all modules and for each module that 
implements the ApiModule interface, it lists the props used by the module,
and for each prop the type, descrption and default.

*/