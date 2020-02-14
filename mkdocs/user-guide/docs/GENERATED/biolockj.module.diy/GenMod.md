# GenMod
Add to module run order:                    
`#BioModule biolockj.module.diy.GenMod`

## Description 
Allows user to add their own scripts into the BioLockJ pipeline.

## Properties 
*Properties are the `name=value` pairs in the configuration file.*                   
*These control how the pipeline is executed.*
### GenMod properties: 
| Property| Description |
| :--- | :--- |
| *genMod.launcher* | *string* <br>Define executable language command if it is not included in your $PATH<br>*default:  null* |
| *genMod.param* | *string* <br>parameters to pass to the user's script<br>*default:  null* |
| *genMod.scriptPath* | *file path* <br>path to user script<br>*default:  null* |

### General properties applicable to this module: 
| Property| Description |
| :--- | :--- |
| *cluster.batchCommand* | *string* <br>Terminal command used to submit jobs on the cluster<br>*default:  null* |
| *cluster.jobHeader* | *string* <br>Header written at top of worker scripts<br>*default:  null* |
| *cluster.modules* | *list* <br>List of cluster modules to load at start of worker scripts<br>*default:  null* |
| *cluster.prologue* | *string* <br>To run at the start of every script after loading cluster modules (if any)<br>*default:  null* |
| *cluster.statusCommand* | *string* <br>Terminal command used to submit jobs on the cluster<br>*default:  null* |
| *docker.imgVersion* | *string* <br>indicate specific version of Docker images<br>*default:  null* |
| *docker.saveContainerOnExit* | *boolean* <br>if ture, docker run command will NOT include the --rm flag<br>*default:  null* |
| *docker.user* | *string* <br>name of the Docker Hub user for getting docker containers<br>*default:  null* |
| *genMod.dockerContainerName* | *string* <br>Name of the docker container to use when executing an instance of the GenMod module.<br>*default:  null* |
| *script.defaultHeader* | *string* <br>Store default script header for MAIN script and locally run WORKER scripts.<br>*default:  #!/bin/bash* |
| *script.numThreads* | *integer* <br>Used to reserve cluster resources and passed to any external application call that accepts a numThreads parameter.<br>*default:  8* |
| *script.numWorkers* | *integer* <br>Set number of samples to process per script (if parallel processing)<br>*default:  1* |
| *script.permissions* | *string* <br>Used as chmod permission parameter (ex: 774)<br>*default:  770* |
| *script.timeout* | *integer* <br>Sets # of minutes before worker scripts times out.<br>*default:  null* |

## Details 
                   
The specified script is executed using the modules script directory as the current working directory. A _scriptPath_ is required.  If specified, the _launcher_ program (ie R, Python) will be used.  If specified, any _param_ will be listed as arguments to the script.  If running in docker, _dockerContainerName_ is required.                   
                   
This is ideal for:                   
                   
 * Custom analysis for a given pipeline, such as an R or python script                   
 * Any steps where an appropriate BioLockJ module does not exist                   
                   
Any step in your analysis process that might otherwise have to be done manually can be stored as a custom script so that the entire process is as reproducible as possible.                   
                   
It is SCRONGLY encouraged that users write scripts using common module conventions:                   
                   
 * use relative file paths (starting with `.` or `..`)                   
 * put all generated output in the modules `output` directory (`../output`)                   
 * put any temporary files in the modules `temp` directory (`../tmep`).                     
 * the main pipeline directory would be `../..`, and the output of a previous module such as `PearMergedReads` would be in `../../*_PearMergedReads/output`                   
                   
To use the GenMod module multiple times in a single pipeline, use the `AS` keyword to direct properties to the correct instance of the module.                   
                   
For example:                   
```                   
#BioModule biolockj.module.diy.GenMod AS Part1                   
#<other modules>                   
#BioModule biolockj.module.diy.GenMod AS Part2                   
                   
Part1.launcher=python                   
Part1.script=path/to/first/script.py                   
                   
Part2.script=path/to/bash/script/doLast.sh                   
```                   
With this, `script.py` will be run using python.  Then other modules will run. Then `doLast.sh` will be run using the default system (probably bash, unless it has a shebang line specifiying something else).                   


## Adds modules 
**pre-requisit modules**                    
*none found*                   
**post-requisit modules**                    
*none found*                   

## Citation 
BioLockJ v1.2.8

