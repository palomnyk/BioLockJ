# SraDownload
Add to module run order:                    
`#BioModule biolockj.module.getData.SraDownload`

## Description 
SraDownload downloads and compresses short read archive (SRA) files to fastq.gz

## Properties 
*Properties are the `name=value` pairs in the [configuration](../../../Configuration#properties) file.*                   

### SraDownload properties: 
| Property| Description |
| :--- | :--- |
| *exe.fasterq-dump* | _executable_ <br>Path for the "fasterq-dump" executable; if not supplied, any script that needs the fasterq-dump command will assume it is on the PATH.<br>*default:*  *null* |
| *input.dirPaths* | _list of file paths_ <br>Specifies a path to dummy seq data e.g. $SHEP/data_tiny/input/seq/fq/single_sample/separate_fw_rv/rhizosphere_16S_data/R1/rhizo_R1_subdir<br>*default:*  *null* |
| *sraDownload.metadataSraIdColumnName* | _string_ <br>Specifies the metadata file column name containing SRA run ids<br>*default:*  sra |

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
| *exe.gzip* | _executable_ <br>Path for the "gzip" executable; if not supplied, any script that needs the gzip command will assume it is on the PATH.<br>*default:*  *null* |
| *input.dirPaths* | _list of file paths_ <br>Specifies a path to dummy seq data e.g. $SHEP/data_tiny/input/seq/fq/single_sample/separate_fw_rv/rhizosphere_16S_data/R1/rhizo_R1_subdir<br>*default:*  *null* |
| *script.defaultHeader* | _string_ <br>Store default script header for MAIN script and locally run WORKER scripts.<br>*default:*  #!/bin/bash |
| *script.numThreads* | _integer_ <br>Used to reserve cluster resources and passed to any external application call that accepts a numThreads parameter.<br>*default:*  8 |
| *script.numWorkers* | _integer_ <br>Set number of samples to process per script (if parallel processing)<br>*default:*  1 |
| *script.permissions* | _string_ <br>Used as chmod permission parameter (ex: 774)<br>*default:*  770 |
| *script.timeout* | _integer_ <br>Sets # of minutes before worker scripts times out.<br>*default:*  *null* |

## Details 
Downloading and compressing files requires fasterq-dump and gzip. Your metadata file should include a column that contains SRA run accessions, and the name of this column must be specified in the configuration file, if named something other than 'sra'

## Adds modules 
**pre-requisite modules**                    
*none found*                   
**post-requisite modules**                    
*none found*                   

## Citation 
Module developed by Philip Badzuh                   
BioLockj v1.2.9-dev

