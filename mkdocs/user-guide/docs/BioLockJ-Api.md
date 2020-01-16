# BioLockJ API

BioLockJ comes with an API.

For the most up-to-date information about how to use the API, see the help menu:
<br>`biolockj_api help`

```bash
$ biolockj_api 
BioLockJ API v1.2.6-dev - UNCC Fodor Lab

Usage:
biolockj_api <query> [args...]

For some uses, redirecting stderr is recommended:
biolockj_api <query> [args...]  2> /dev/null

Use biolockj_api without args to get help menu.

query:

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

  propType <prop> [module]
        Returns the type expected for the property: String, list, integer, positive number, etc.
        If a module is supplied, then the modules propType method is used.
  describeProp <prop> [module]
        Returns a description of the property.
        If a module is supplied, then the modules getDescription method is used.

  propValue <prop> [confg]
        Returns the value for that property given that config file (optional) or 
        no config file (ie the default value)

  isValidProp <prop> <val> [module] [modules…]
        T/F/NA. Returns true if the value (val) for the property (prop) is valid;
        false if prop is a property but val is not a valid value,
        and NA if prop is not a recognized property.
        IF a module is supplied, then additionally call the validateProp(key, value)
        for each module given.

  propInfo
        Returns a json formatted list of the general properties (listProps)
        with the type, descrption and default for each property

  moduleInfo
        Returns a json formatted list of all modules and for each module that 
        implements the ApiModule interface, it lists the props used by the module,
        and for each prop the type, descrption and default.

  help  (or no args)
        Print help menu.

```

`listModules` and `listApiModules` are nearly identical.  The methods that allow the API to interface with modules are in the ApiModule interface, not all BioModules implement that interface.  Once all of the build-in modules have those methods, then these two functions will be identical; the BioModule interface will absorb the ApiModule interface, and listApiModules will be depricated.

`listAllProps` is the union of all possible output from `listProps`.

`propInfo` returns information equivelent to calling `biolockj_api listProps` and creating a for-loop to call `biolockj_api propType $PROP`, `biolockj_api describeProp $PROP` and `biolockj_api propValue $PROP` for each PROP in the list.

`moduleInfo` returns information equivelent to calling `biolockj_api listModules` and creating a for-loop to call `biolockj_api listProps $MODULE` and for each of its properties,  


