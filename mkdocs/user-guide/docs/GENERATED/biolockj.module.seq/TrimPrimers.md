# TrimPrimers
Add to module run order:                    
`#BioModule biolockj.module.seq.TrimPrimers`

## Description 
Remove primers from reads, option to discard reads unless primers are attached to both forward and reverse reads.

## Properties 
*Properties are the `name=value` pairs in the [configuration](../../../Configuration#properties) file.*                   

### TrimPrimers properties: 
| Property| Description |
| :--- | :--- |
| *trimPrimers.filePath* | _file path_ <br>file path to file containing one primer sequence per line.<br>*default:*  *null* |
| *trimPrimers.requirePrimer* | _boolean_ <br>Options: Y/N. If Y, TrimPrimers will discard reads that do not include a primer sequence.<br>*default:*  Y |

### General properties applicable to this module: 
| Property| Description |
| :--- | :--- |
| *cluster.batchCommand* | _string_ <br>Terminal command used to submit jobs on the cluster<br>*default:*  *null* |
| *cluster.jobHeader* | _string_ <br>Header written at top of worker scripts<br>*default:*  *null* |
| *cluster.modules* | _list_ <br>List of cluster modules to load at start of worker scripts<br>*default:*  *null* |
| *cluster.prologue* | _string_ <br>To run at the start of every script after loading cluster modules (if any)<br>*default:*  *null* |
| *cluster.statusCommand* | _string_ <br>Terminal command used to submit jobs on the cluster<br>*default:*  *null* |
| *docker.imgVersion* | _string_ <br>indicate specific version of Docker images<br>*default:*  *null* |
| *docker.saveContainerOnExit* | _boolean_ <br>if ture, docker run command will NOT include the --rm flag<br>*default:*  *null* |
| *docker.user* | _string_ <br>name of the Docker Hub user for getting docker containers<br>*default:*  *null* |
| *script.defaultHeader* | _string_ <br>Store default script header for MAIN script and locally run WORKER scripts.<br>*default:*  #!/bin/bash |
| *script.numThreads* | _integer_ <br>Used to reserve cluster resources and passed to any external application call that accepts a numThreads parameter.<br>*default:*  8 |
| *script.numWorkers* | _integer_ <br>Set number of samples to process per script (if parallel processing)<br>*default:*  1 |
| *script.permissions* | _string_ <br>Used as chmod permission parameter (ex: 774)<br>*default:*  770 |
| *script.timeout* | _integer_ <br>Sets # of minutes before worker scripts times out.<br>*default:*  *null* |

## Details 
*none*

## Adds modules 
**pre-requisite modules**                    
*none found*                   
**post-requisite modules**                    
*none found*                   

## Citation 
Module developed by Mike Sioda                   
BioLockj v1.2.9-dev

