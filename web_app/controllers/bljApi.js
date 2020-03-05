/**
Author: Aaron Yerke
Purpose: Interfacing with biolockj-api
Notes:
*/

const { spawn } = require('child_process');
const path = require('path');
const {BLJ_PROJ, BLJ, BLJ_CONFIG, HOST_BLJ} = require(path.join('..','lib','constants.js'));

/*
Usage:
biolockj-api <query> [options...]

For some uses, redirecting stderr is recommended:
biolockj-api <query> [options...]  2> /dev/null

Use biolockj-api without args to get help menu.

Options:

Options shown in [ ] are optional for a given query.
  --external-modules <dir>
        path to a directory containing additional modules
  --module <module_path>
        class path for a specific module
  --property <property>
        a specific property
  --value <value>
        a vlue to use for a specific property
  --config <file>
        file path for a configuration file giving one or more property values
  --verbose
        flag indicating that all messages should go to standard err, including some that are typically disabled.
*/

exports.listModules = function (req, res, next) {
  // listModules [ --external-modules <dir> ]
  // Returns a list of classpaths to the classes that extend BioModule.
  try {
    let param = req.body.jsonParam != undefined ? ` --external-modules ${req.body.jsonParam}` : "";
    console.log(`get req params: ${param}`);
    let bljApi = spawn(`biolockj-api listModules ${param}`, {shell: '/bin/bash'});
    bljApi.stdout.on('data', function (data) {      
      let modules = String(data).split(/[\n,]/g);
      console.log(modules);
      return(res.end(JSON.stringify({output: modules})));
    });
    bljApi.stderr.on('data', function (data) {
      console.log('stderr: ' + data.toString());
    });
    bljApi.on('exit', function (code) {
      console.log('child process exited with code ' + code.toString());
    });
  } catch (e) {
    console.error(e);
    errorLogger.writeError(e.stack);
  }
}

exports.listApiModules = function (req, res, next) {
  // listApiModules [--external-modules <dir> ]
  // Like listModules but limit list to modules that implement the ApiModule interface.
  try {
    let param = req.body.jsonParam != undefined ? ` --external-modules ${req.body.jsonParam}` : "";
    let bljApi = spawn(`biolockj-api listApiModules ${param}`, {shell: '/bin/bash'});
    bljApi.stdout.on('data', function (data) {
      return(res.end(JSON.stringify({output: String(data)})));
    });
    bljApi.stderr.on('data', function (data) {
      console.log('stderr: ' + data.toString());
    });
    bljApi.on('exit', function (code) {
      console.log('child process exited with code ' + code.toString());
    });
  } catch (e) {
    console.error(e);
    errorLogger.writeError(e.stack);
  }
}

exports.listProps = function (req, res, next) {
  // listProps [ --module <module_path> ]
  // Returns a list of properties.
  // If no args, it returns the list of properties used by the BioLockJ backbone.
  // If a modules is given, then it returns a list of all properties used by
  // that module.
  try {
    let param = req.body.jsonParam != undefined ? ` --module ${req.body.jsonParam}` : "";
    let bljApi = spawn(`biolockj-api listProps ${param}`, {shell: '/bin/bash'});
    bljApi.stdout.on('data', function (data) {
      return(res.end(JSON.stringify({output: String(data)})));
    });
    bljApi.stderr.on('data', function (data) {
      console.log('stderr: ' + data.toString());
    });
    bljApi.on('exit', function (code) {
      console.log('child process exited with code ' + code.toString());
    });
  } catch (e) {
    console.error(e);
    errorLogger.writeError(e.stack);
  }
}

exports.listAllProps = function (req, res, next) {
  /*listAllProps [ --external-modules <dir> ]
        Returns a list of all properties, include all backbone properties and all module properties.
        Optionally supply the path to a directory containing additional modules to include their properties.*/
  try {
    console.log(`get req params: ${String(req.body.jsonParam)}`);
    let param = req.body.jsonParam != undefined ? ` --external-modules ${req.body.jsonParam}` : "";
    let bljApi = spawn(`biolockj-api listAllProps ${param}`, {shell: '/bin/bash'});
    bljApi.stdout.on('data', function (data) {
      return(res.end(JSON.stringify({output: String(data)})));
    });
    bljApi.stderr.on('data', function (data) {
      console.log('stderr: ' + data.toString());
    });
    bljApi.on('exit', function (code) {
      console.log('child process exited with code ' + code.toString());
    });
  } catch (e) {
    console.error(e);
    errorLogger.writeError(e.stack);
  }
}

exports.propType = function (req, res, next) {
  /*propType --property <property> [ --module <module_path> [ --external-modules <dir> ] ]
        Returns the type expected for the property: String, list, integer, positive number, etc.
        If a module is supplied, then the modules propType method is used.*/
  try {
    console.log(`get req params: ${String(req.body.prop)}`);
    let prop = req.body.prop != undefined ? ` --property ${req.body.prop}` : "";
    let mod = req.body.mod != undefined ? ` --module ${req.body.mod}` : "";
    console.log(`biolockj-api propType ${prop} ${mod}`);
    let bljApi = spawn(`biolockj-api propType ${prop} ${mod}`, {shell: '/bin/bash'});
    bljApi.stdout.on('data', function (data) {
      return(res.end(JSON.stringify({output: String(data)})));
    });
    bljApi.stderr.on('data', function (data) {
      console.log('stderr: ' + data.toString());
    });
    bljApi.on('exit', function (code) {
      console.log('child process exited with code ' + code.toString());
    });
  } catch (e) {
    console.error(e);
    errorLogger.writeError(e.stack);
  }
}
exports.describeProp = function (req, res, next) {
  /*  describeProp --property <property> [ --module <module_path> [ --external-modules <dir> ] ]
        Returns a description of the property.
        If a module is supplied, then the modules getDescription method is used.*/
  try {
    let prop = req.body.prop != undefined ? ` --property ${req.body.prop}` : "";
    let mod = req.body.mod != undefined ? ` --module ${req.body.mod}` : "";
    let extPath = req.body.extPath != undefined ? ` --external-modules ${req.body.extPath}` : "";
    let bljApi = spawn(`biolockj-api describeProp ${prop} ${mod} ${extPath}`, {shell: '/bin/bash'});
    bljApi.stdout.on('data', function (data) {
      return(res.end(JSON.stringify({output: String(data)})));
    });
    bljApi.stderr.on('data', function (data) {
      console.log('stderr: ' + data.toString());
    });
    bljApi.on('exit', function (code) {
      console.log('child process exited with code ' + code.toString());
    });
  } catch (e) {
    console.error(e);
    errorLogger.writeError(e.stack);
  }
}

exports.propValue = function (req, res, next) {
  /*propValue --property <property> [ --config <file> ]
        Returns the value for that property given that config file (optional) or 
        no config file (ie the default value)*/
  try {
    let prop = req.body.prop != undefined ? ` --property ${req.body.prop}` : "";
    let config = req.body.config != undefined ? ` --config ${req.body.config}` : "";
    let bljApi = spawn(`biolockj-api propValue ${prop} ${config}`, {shell: '/bin/bash'});
    bljApi.stdout.on('data', function (data) {
      return(res.end(JSON.stringify({output: String(data)})));
    });
    bljApi.stderr.on('data', function (data) {
      console.log('stderr: ' + data.toString());
    });
    bljApi.on('exit', function (code) {
      console.log('child process exited with code ' + code.toString());
    });
  } catch (e) {
    console.error(e);
    errorLogger.writeError(e.stack);
  }
}

exports.isValidProp = function (req, res, next) {
  /* 
    isValidProp --property <property> --value <value> [ --module <module_path>  [--external-modules <dir>] ]
        T/F/NA. Returns true if the value (val) for the property (prop) is valid;
        false if prop is a property but val is not a valid value,
        and NA if prop is not a recognized property.
        IF a module is supplied, then additionally call the validateProp(key, value)
        for that module, or for EACH module if a comma-separated list is given.*/
  try {
    let prop = req.body.prop != undefined ? ` --property ${req.body.prop}` : "";
    let val = req.body.val != undefined ? ` --value ${req.body.val}` : "";
    let mod = req.body.mod != undefined ? ` --module ${req.body.mod}` : "";
    let extPath = req.body.extPath != undefined ? ` --external-modules ${req.body.extPath}` : "";
    let bljApi = spawn(`biolockj-api isValidProp ${prop} ${val} ${mod} ${extPath}`, {shell: '/bin/bash'});
    bljApi.stdout.on('data', function (data) {
      return(res.end(JSON.stringify({output: String(data)})));
    });
    bljApi.stderr.on('data', function (data) {
      console.log('stderr: ' + data.toString());
    });
    bljApi.on('exit', function (code) {
      console.log('child process exited with code ' + code.toString());
    });
  } catch (e) {
    console.error(e);
    errorLogger.writeError(e.stack);
  }
}

exports.propInfo = function (req, res, next) {
  /*
    propInfo
        Returns a json formatted list of the general properties (listProps)
        with the type, descrption and default for each property
        */
  try {
    let bljApi = spawn(`biolockj-api propInfo`, {shell: '/bin/bash'});
    bljApi.stdout.on('data', function (data) {
      return(res.end(JSON.stringify({output: String(data)})));
    });
    bljApi.stderr.on('data', function (data) {
      console.log('stderr: ' + data.toString());
    });
    bljApi.on('exit', function (code) {
      console.log('child process exited with code ' + code.toString());
    });
  } catch (e) {
    console.error(e);
    errorLogger.writeError(e.stack);
  }
}

exports.moduleInfo = function (req, res, next) {
  /* 
    moduleInfo [--external-modules <dir>]
        Returns a json formatted list of all modules and for each module that 
        implements the ApiModule interface, it lists the props used by the module,
        and for each prop the type, descrption and default.*/
  try {
    let extPath = req.body.extPath != undefined ? ` --external-modules ${req.body.extPath}` : "";
    let bljApi = spawn(`biolockj-api moduleInfo ${extPath}`, {shell: '/bin/bash'});
    let resp = [];
    bljApi.stdout.on('data', function (data) {
      resp.push(data);
    });
    bljApi.stderr.on('data', function (data) {
      console.log('stderr: ' + data.toString());
    });
    bljApi.on('exit', function (code) {
      console.log('child process exited with code ' + code.toString());
      const respJoin = resp.join('')
      console.log(`Joined data: ${respJoin}`);
      return(res.end(JSON.stringify({output: String(respJoin)})));
    });
  } catch (e) {
    console.error(e);
    errorLogger.writeError(e.stack);
  }
}