# RarefySeqs
Add to module run order:                    
`#BioModule biolockj.module.seq.RarefySeqs`

## Description 
Randomly select samples to reduce all samples to the configured maximum.<br> Samples with less than the minimum number of reads are discarded. 

## Properties 
*Properties are the `name=value` pairs in the configuration file.*                   
*These control how the pipeline is executed.*
### RarefySeqs properties: 
| Property| Description |
| :--- | :--- |
| *rarefySeqs.max* | *numeric* <br>Randomly select maximum number of sequences per sample<br>*default:  null* |
| *rarefySeqs.min* | *numeric* <br>Discard samples without minimum number of sequences<br>*default:  null* |

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
| *script.defaultHeader* | *string* <br>Store default script header for MAIN script and locally run WORKER scripts.<br>*default:  #!/bin/bash* |
| *script.numThreads* | *integer* <br>Used to reserve cluster resources and passed to any external application call that accepts a numThreads parameter.<br>*default:  8* |
| *script.numWorkers* | *integer* <br>Set number of samples to process per script (if parallel processing)<br>*default:  1* |
| *script.permissions* | *string* <br>Used as chmod permission parameter (ex: 774)<br>*default:  770* |
| *script.timeout* | *integer* <br>Sets # of minutes before worker scripts times out.<br>*default:  null* |

## Details 
*none*

## Adds modules 
**pre-requisit modules**                    
*pipeline-dependent*                   
**post-requisit modules**                    
*none found*                   

## Citation 
Module developed by Mike Sioda                   
BioLockj v1.2.8

