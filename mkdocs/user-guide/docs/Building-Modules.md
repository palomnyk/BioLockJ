# Building New Modules

**Any Java class that implements the [BioModule](https://msioda.github.io/BioLockJ/docs/biolockj/module/BioModule.html) interface can be added to a BioLockJ pipeline.**

The BioLockJ v1.0 implementation is currently focused on metagenomics analysis, but the generalized application framework is not limited to this domain.  Users can implement new BioModules to automate a wide variety of bioinformatics and report analytics.  The [BioModule](https://msioda.github.io/BioLockJ/docs/biolockj/module/BioModule.html) interface was designed so that users can develop new modules on their own.  

## Beginners

See the BioModule hello world tutorial.

## Coding your module

To create a new [BioModule](https://msioda.github.io/BioLockJ/docs/biolockj/module/BioModule.html), simply extend one of the abstract Java superclasses, code it's abstract methods, and add it to your pipeline with #BioModule tag your Config file: 
###           
1. [BioModuleImpl](https://msioda.github.io/BioLockJ/docs/biolockj/module/BioModuleImpl.html): Extend if a more specific interface does not apply
1. [ScriptModuleImpl](https://msioda.github.io/BioLockJ/docs/biolockj/module/ScriptModuleImpl.html): Extend if your module generates and executes bash scripts
1. [JavaModuleImpl](https://msioda.github.io/BioLockJ/docs/biolockj/module/JavaModuleImpl.html): Extend if your module only runs Java code 
1. [ClassifierModuleImpl](https://msioda.github.io/BioLockJ/docs/biolockj/module/classifier/ClassifierModuleImpl.html): Extend to support a new classifier program
1. [ParserModuleImpl](https://msioda.github.io/BioLockJ/docs/biolockj/module/implicit/parser/ParserModuleImpl.html): Extend to parse output of a new classifier program
1. [R_Module](https://msioda.github.io/BioLockJ/docs/biolockj/module/report/r/R_Module.html): Extend if your module generates and executes R scripts

#### To support a new classifier, create 3 modules that implement the following interfaces:
1. [ClassifierModule](https://msioda.github.io/BioLockJ/docs/biolockj/module/classifier/ClassifierModule.html): Implement to generate bash scripts needed to call classifier program
1. [ParserModule](https://msioda.github.io/BioLockJ/docs/biolockj/module/implicit/parser/ParserModule.html): Implement to parse classifier output, configure as classifier post-requisite 
1. [OtuNode](https://msioda.github.io/BioLockJ/docs/biolockj/node/OtuNode.html): Classifier specific implementation holds OTU information for 1 sequence

#### [BioModuleImpl](https://msioda.github.io/BioLockJ/docs/biolockj/module/BioModuleImpl.html) is the top-level superclass for all modules.
| Method | Description | 
| :--- | :--- | 
| **checkDependencies()** | **Must override.**  Called before executeTask() to identify Configuration errors and perform runtime validations. |
| **executeTask()** | **Must override.**  Executes core module logic. |
| cleanUp() | Called after executeTask() to run cleanup operations, update Config properties, etc. |
| getInputFiles() | Return previous module output. |
| getModuleDir() | Return module root directory. |
| getOutputDir() | Return module output directory. |
| getPostRequisiteModules() | Returns a list of BioModules to run after the current module. |
| getPreRequisiteModules() | Returns a list of BioModules to run before the current module. |
| getSummary() | Return output directory summary.  Most modules override this method by adding module specific summary details to super.getSummary(). |
| getTempDir() | Return module temp directory.  |
| setModuleDir(path) | Set module directory. |

#### [ScriptModuleImpl](https://msioda.github.io/BioLockJ/docs/biolockj/module/ScriptModuleImpl.html) extends [BioModuleImpl](https://msioda.github.io/BioLockJ/docs/biolockj/module/BioModuleImpl.html):  superclass for script-generating modules.
| Method | Description | 
| :--- | :--- | 
| **buildScript(files)** | **Must override.**  Called by executeTask() for datasets with forward reads only.  The return type is a list of lists.  Each nested list contains the bash script lines required to process 1 sample.  Obtains sequence files from getInputFiles(). |
| buildScriptForPairedReads(files) | Calls back to buildScript(files) by default.  Subclasses override this method to generate unique scripts for datasets containing paired reads.  |
| checkDependencies() | Called before executeTask() to validate *script.batchSize*, *script.exitOnError*, *script.numThreads*, *script.permissions*, *script.timeout* |
| getJobParams() | Return shell command to execute the MAIN script. |
| getScriptDir() | Return module script directory. |
| getSummary() | Adds the script directory summary to super.getSummary().  Most modules override this method by adding module specific summary details to super.getSummary(). |
| getTimeout() | Return *script.timeout*. |
| getWorkerScriptFunctions() | Return bash script lines for any functions needed in the worker scripts. |

#### [JavaModuleImpl](https://msioda.github.io/BioLockJ/docs/biolockj/module/JavaModuleImpl.html) extends [ScriptModuleImpl](https://msioda.github.io/BioLockJ/docs/biolockj/module/ScriptModuleImpl.html): superclass for pure Java modules.
 
To avoid running code on the cluster head node, a temporary instance of BioLockJ is spawned on a cluster node which is launched by the sole worker script from the job queue. 

| Method | Description | 
| :--- | :--- | 
| **runModule()** | **Must override.**  Executes core module logic. |
| buildScript(files) | This method returns a single line calling java on the BioLockJ source code, passing -d parameter to run in direct mode and the full class name of the [JavaModule](https://msioda.github.io/BioLockJ/docs/biolockj/module/JavaModule.html) to indicate the module to run. |
| getSource() | Determines if running code from Jar or source code in order to write valid bash script lines. |
| getTimeout() | Return *java.timeout*. |
| moduleComplete() | Create the script success indicator file. |
| moduleFailed() | Create the script failures indicator file. |

#### [ClassifierModuleImpl](https://msioda.github.io/BioLockJ/docs/biolockj/module/classifier/ClassifierModuleImpl.html) extends [ScriptModuleImpl](https://msioda.github.io/BioLockJ/docs/biolockj/module/ScriptModuleImpl.html): biolockj.module.classifier superclass.
| Method | Description | 
| :--- | :--- | 
| buildScriptForPairedReads(files) | Called by executeTask() for datasets with paired reads.  The return type is a list of lists, where each nested list contains the bash script lines required to process 1 sample.  Obtains sequence files from [SeqUtil](https://msioda.github.io/BioLockJ/docs/biolockj/util/SeqUtil.html).getPairedReads(getInputFiles()). |
| checkDependencies() | Validate Configuration properties *exe.classifier* and *exe.classifierParams*, verify sequence file format, log classifier version info, and verify no biolockj.module.seq modules are configured run after the [ClassifierModule](https://msioda.github.io/BioLockJ/docs/biolockj/module/classifier/ClassifierModule.html). Subclasses should call super.checkDependencies() if overriding this method to retain these verifications. | 
| executeTask() | Call buildScript(files) or buildScriptForPairedReads(files) based input sequence format and calls [BashScriptBuilder](https://msioda.github.io/BioLockJ/docs/biolockj/util/BashScriptBuilder.html) to generate the main script + 1 worker script for every *script.batchSize* samples.  To change the batch scheme, override this method to call the alternate [BashScriptBuilder](https://msioda.github.io/BioLockJ/docs/biolockj/util/BashScriptBuilder.html).buildScripts() method signiture and hard code the batch size.  All biolockj.module.classifier modules override this method. |
| getClassifierExe() | Return Configuration property *exe.classifier* to call the classifier program in the bash scripts.  If the classifier is not included in *cluster.modules*, validate that value is a valid file path.  If *exe.classifier* is undefined, replace the property prefix *exe* with the lowercase prefix of the module class name (less the standard module suffix *classifier*).  For example, use *rdp.classifier* for [RdpClassifier](../module/classifier/module.classifier.r16s#rdpclassifier) and *kraken.classifier* for [KrakenClassifier](../module/classifier/module.classifier.wgs#krakenclassifier).  This allows users to define all classifier programs in a default Configuration file rather than setting *exe.clssifier* in each project Configuration file. |
| getClassifierParams() | Return Configuration property *exe.classifierParams* which may contain a list of parameters (without hyphens) to pass to the classifier program in the bash scripts.  If *exe.classifierParams* is undefined, replace the property prefix *exe* with the lowercase prefix of the module class name as described for *exe.classifier*. |
| getSummary() | Adds input directory summary to super.getSummary().  Most modules override this method to add module specific summary details to super.getSummary(). |
| logVersion() | Run *exe.classifier* --version to log version info.  [RDP](../module/classifier/module.classifier.r16s#rdpclassifier) overrides this method to return null since the version switch is not supported. |

#### [ParserModuleImpl](https://msioda.github.io/BioLockJ/docs/biolockj/module/implicit/parser/ParserModuleImpl.html) extends [JavaModuleImpl](https://msioda.github.io/BioLockJ/docs/biolockj/module/JavaModuleImpl.html): biolockj.module.implicit.parser superclass.
| Method | Description | 
| :--- | :--- |
| **parseSamples()** | **Must override.**  Called by executeTask() to populate the Set returned by getParsedSamples().  Each classifier requires a unique parser module to decode its output.  This method should iterate through the classifier reports to build [OtuNode](https://msioda.github.io/BioLockJ/docs/biolockj/node/OtuNode.html)s for each sample-OTU found in the report.  The [OtuNode](https://msioda.github.io/BioLockJ/docs/biolockj/node/OtuNode.html)s are stored in a [ParsedSample](https://msioda.github.io/BioLockJ/docs/biolockj/node/ParsedSample.html) and cached via addParsedSample([ParsedSample](https://msioda.github.io/BioLockJ/docs/biolockj/node/ParsedSample.html)). |
| addParsedSample( sample ) | Add the [ParsedSample](https://msioda.github.io/BioLockJ/docs/biolockj/node/ParsedSample.html) to the Set returned by getParsedSamples(). |
| buildOtuTables() | Generate OTU abundance tables from [ClassifierModule](https://msioda.github.io/BioLockJ/docs/biolockj/module/classifier/ClassifierModule.html) output. |
| checkDependencies() | Validate Configuration properties (*report.minOtuCount*, *report.minOtuThreshold*, *report.logBase*) and  verify no biolockj.module.classifier modules are configured to run after the [ParserModule](https://msioda.github.io/BioLockJ/docs/biolockj/module/implicit/parser/ParserModule.html). | 
| executeTask() | If *report.numHits*=Y, add "Num_Hits" column to metadata containing the number of reads that map to any OTU for each sample.  Calls buildOtuTables() to generate module output. |
| getParsedSample(id) | Return the [ParsedSample](https://msioda.github.io/BioLockJ/docs/biolockj/node/ParsedSample.html) from the the Set returned by getParsedSamples() for a given id. |
| getParsedSamples() | Return 1 [ParsedSample](https://msioda.github.io/BioLockJ/docs/biolockj/node/ParsedSample.html) for each classified sample in the dataset. |


#### [OtuNodeImpl](https://msioda.github.io/BioLockJ/docs/biolockj/node/OtuNodeImpl.html) is the superclass for the [biolockj.node](https://msioda.github.io/BioLockJ/docs/biolockj/node/package-summary.html) package.
| Method | Description | 
| :--- | :--- | 
| addOtu(level, otu) | A node represents a single OTU, each level in the taxonomic hierarchy is populated with this method. |
| getCount() | Get the OTU count. |
| getLine() | Get the classifier report line used to create the node. |
| getOtuMap() | This map may contain 1 element for each of the *report.taxonomyLevels* and is populated by addOtu(level, otu).  |
| getSampleId() | Get the sample ID to which the OTU belongs. |
| report() | Print node info to log file as DEBUG line - not visible unless *pipeline.logLevel=DEBUG*.  |
| setCount(num) | Set the OTU count. |
| setLine(line) | Set the classifier report line used to create the node. |
| setSampleId(id) | set the sample ID to which the OTU belongs. |

* [OtuNodeImpl](https://msioda.github.io/BioLockJ/docs/biolockj/node/OtuNodeImpl.html) methods do not need to be overridden.  
* New [OtuNode](https://msioda.github.io/BioLockJ/docs/biolockj/node/OtuNode.html) implementations should call existing methods from their constructor.

## Document your module

The BioLockJ API allows outside resources to get information about the BioLockJ program and any available modules.  

To interface with the API, your module will need to implement the **ApiModule interface**.

### API-generated html documentation

The BioLockJ documentation is stored in markdown files and rendered into html using mkdocs.  The BioLockJ API is designed to generate a markdown document, which is ready to be rendered into an html file using mkdocs.  

### Built-in descriptions

Override the `getCitationString()` method.  This should include citation information for any tool that your module wraps and a credit to yourself for creating the wrapper.

Override the `getDescription()` method to return a short description of what your module does, this should be one to two sentences.  For a more extensive description, including details about properties, expected inputs, assumptions, etc; override the `getDetails()` method (optional).  If your module has any pre-requisit modules or post-requisit modules, the modules Details should include the names of these modules and information about when and why these modules are added.

### Documenting Properties

If your module introduces any NEW configuration properties, those properties should registered to the module so the API can retrieve them.  Register properties using the `addNewProperty()` method in the modules constructor.  For example, the GenMod module defines three properties:
```java
public GenMod() {
	super();
	addNewProperty( PARAM, Properties.STRING_TYPE, "parameters to pass to the user's script" );
	addNewProperty( SCRIPT, Properties.FILE_PATH, "path to user script" );
	addNewProperty( LAUNCHER, Properties.STRING_TYPE, LAUNCHER_DESC );
}

protected static final String PARAM = "genMod.param";
protected static final String SCRIPT = "genMod.scriptPath";

/**
 * {@link biolockj.Config} property: {@value #LAUNCHER}<br>
 * {@value #LAUNCHER_DESC}
 */
protected static final String LAUNCHER = "genMod.launcher";
private static final String LAUNCHER_DESC = "Define executable language command if it is not included in your $PATH";
```
In this example, the descriptions for `PARAM` and `SCRIPT` are written in the `addNewProperty()` method.  The description for `LAUNCHER` is stored as its own string (`LAUNCHER_DESC`), and that string is referenced in the `addNewProperty` method and in the javadoc description for `LAUNCHER`. This rather verbose option IS NOT necissary, but it allows the description to be viewed through the api AND through javadocs, and IDE's; this is appropriate if you expect other classes to use the properties defined in your module.  

The descriptions for properties should be brief.  Additional details such as interactions between properties or the effects of different values should be part of the `getDetails()` method.  It should always be clear to a user what will happen if the value is "null".

If there is a logical default for the property, that can passed as an additional argument to `addNewProperty()`.  This value will only be used if there is no value given for the property in the config file (including any defaultProps layers and standard.properties).

If your module uses any general properties (beyond any uses by the the super class), then you should register it in the module's constructor using the `addGeneralProperty()` method.
```java
public QiimeClosedRefClassifier() {
	super();
	addGeneralProperty( Constants.EXE_AWK );
}
```
The existing description and type for this property (defined in biolockj.Properties) will be returned if the module is queried about this property.  For a list of general properties, run:<br> 
`biolockj_api listProps `

Finally, to very polished, you should override the `isValidProp()` method.  Be sure to include the call to super.
```java
@Override
public Boolean isValidProp( String property ) throws Exception {
	Boolean isValid = super.isValidProp( property );
	switch(property) {
		case HN2_KEEP_UNINTEGRATED:
			try {Config.getBoolean( this, HN2_KEEP_UNINTEGRATED );}
			catch(Exception e) { isValid = false; }
			isValid = true;
			break;
		case HN2_KEEP_UNMAPPED:
			try {Config.getBoolean( this, HN2_KEEP_UNMAPPED );}
			catch(Exception e) { isValid = false; }
			isValid = true;
			break;
	}
	return isValid;
}
```
In the example above, the Humann2Parser module uses two properties that are not used by any super class. The call to `super.isValidProp( property )` tests the property if it is used by a super class.  This class only adds checks for its newly defined properties.  Any property that is not tested, but is registered in the modules constructor will return true. This method is called through the API, and should be used to test one property at a time as if that is the only property in the config file. Tests to make sure that multiple properties are compatiable with each other should go in the `checkDependencies()` method.

### Generate user guide pages
For modules in the main BioLockJ project, the user guide pages are generated using the ApiModule methods as part of the deploy process.
Third party developers can use the same utilities to create matching documentation.

Suppose you have created one or more modules in a package `com.joesCode` and saved the compiled code in a jar file, `/Users/joe/dev/JoesMods.jar`.  
Set up a [mkdocs](https://www.mkdocs.org/) project:
```bash 
# See https://www.mkdocs.org/#installation
pip install mkdocs
mkdocs --version
mkdocs new joes-modules
mkdir joes-modules/docs/GENERATED
```
This mkdocs project will render markdown (.md) files into an html site.  Mkdocs supports a lot of really nice features, including a very nice default template.

Generate the .md files from your modules:
```bash
java -cp $BLJ/dist/BioLockJ.jar:/Users/joe/dev/JoesMods.jar \
    biolockj.api.BuildDocs \
    joes-modules/docs/GENERATED \
    com.joesCode
```

Put a link to your list of modules in the main index page.
```bash
cd joes-modules
echo "[view module list](GENERATED/all-modules.md)" >> docs/index.md 
```
The BuildDocs utility creates the .md files, but it assumes that these are part of a larger project, and you will need to make appropriate links to the generated pages from your main page.

Preview your user guide:
```bash
mkdocs serve
```
Open up `http://127.0.0.1:8000/` in your browser, and you'll see the default home page being displayed, with a link at the bottom to `view module list`, which links to a page listing all of the modules in the `joes.modules` pacakge. 

You can build this documentation locally using `mkdocs build` and then push to your prefered hosting site, or set up a service such as [ReadTheDocs](https://readthedocs.org/) to render and host your documentation from your `docs` folder.


Even if you choose not to build user guide pages for your module, you should still implement the ApiModule interface.  Anyone who uses your module can generate the user guide pages if they want them, and even incorporate them into a custom copy of the main BioLockJ user guide.  Any other support program, such as a GUI, could make use the the ApiModule methods as well.


## Using External Modules

To use a module that you have created yourself or aquired from a third party, you need to:

1. Save the compiled code in a folder on your machine, for example: `/Users/joe/biolockjModules/JoesMods.jar` 
1. Include your module in the module run order in your config file, for example:<br>
`#BioModule com.joesCode.biolockj.RunTool`
<br>Be sure to include any properties your module needs in the config file.
1. Use the ` --external-modules <dir>` option  when you call biolockj:<br>
`biolockj --external-modules /Users/joe/biolockjModules myPipeline.properties`

Any other modules you have made or aquired can also be in the `/Users/joe/biolockjModules` folder.

## Finding and Sharing Modules

The official repository for external BioLockJ modules is [blj_ext_modules](https://github.com/IvoryC/blj_ext_modules).  Each module has a folder at the top level of the repository and should include the java code as well a config file to test the module alone, a test file to run a multi-module pipeline that includes the module, and (where applicable) a dockerfile.  This is work in progress.

