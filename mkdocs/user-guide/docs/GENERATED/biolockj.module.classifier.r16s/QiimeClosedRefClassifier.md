# QiimeClosedRefClassifier
Add to module run order:                    
`#BioModule biolockj.module.classifier.r16s.QiimeClosedRefClassifier`

## Description 
Pick OTUs using a closed reference database and construct an OTU table via the QIIME script pick_closed_reference_otus.py

## Properties 
*Properties are the `name=value` pairs in the [configuration](../../../Configuration#properties) file.*                   

### QiimeClosedRefClassifier properties: 
| Property| Description |
| :--- | :--- |
| *exe.vsearch* | _executable_ <br>Path for the "vsearch" executable; if not supplied, any script that needs the vsearch command will assume it is on the PATH.<br>*default:*  *null* |
| *qiime.params* | _list_ <br>Parameters for qiime<br>*default:*  *null* |
| *qiime.pynastAlignDB* | _file path_ <br>path to define ~/.qiime_config pynast_template_alignment_fp<br>*default:*  *null* |
| *qiime.refSeqDB* | _file path_ <br>path to define ~/.qiime_config pick_otus_reference_seqs_fp and assign_taxonomy_reference_seqs_fp<br>*default:*  *null* |
| *qiime.removeChimeras* | _boolean_ <br>if vsearch is needed for chimera removal<br>*default:*  Y |
| *qiime.taxaDB* | _file path_ <br>path to define ~/.qiime_config assign_taxonomy_id_to_taxonomy_fp<br>*default:*  *null* |
| *qiime.vsearchParams* | _list_ <br>Parameters for vsearch<br>*default:*  *null* |

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
| *exe.awk* | _executable_ <br>Path for the "awk" executable; if not supplied, any script that needs the awk command will assume it is on the PATH.<br>*default:*  *null* |
| *pipeline.defaultFastaConverter* | _string_ <br>Java class name for default module used to convert files into fasta format<br>*default:*  biolockj.module.seq.AwkFastaConverter |
| *pipeline.defaultSeqMerger* | _string_ <br>Java class name for default module used combined paired read files<br>*default:*  biolockj.module.seq.PearMergeReads |
| *script.defaultHeader* | _string_ <br>Store default script header for MAIN script and locally run WORKER scripts.<br>*default:*  #!/bin/bash |
| *script.numThreads* | _integer_ <br>Used to reserve cluster resources and passed to any external application call that accepts a numThreads parameter.<br>*default:*  8 |
| *script.numWorkers* | _integer_ <br>Set number of samples to process per script (if parallel processing)<br>*default:*  1 |
| *script.permissions* | _string_ <br>Used as chmod permission parameter (ex: 774)<br>*default:*  770 |
| *script.timeout* | _integer_ <br>Sets # of minutes before worker scripts times out.<br>*default:*  *null* |

## Details 
This module picks OTUs using a closed reference database and constructs an OTU table via the QIIME script [pick_closed_reference_otus.py](http://qiime.org/scripts/pick_closed_reference_otus.html).  Taxonomy is assigned using a pre-defined taxonomy map of reference sequence OTU to taxonomy.  This is the fastest OTU picking method since samples can be processed in parallel batches.  Before the QIIME script is run, batches are prepared in the temp directory, with each batch directory containing a fasta directory with *script.batchSize* fasta files and a QIIME mapping file, created with awk, called batchMapping.tsv for the batch of samples.   Inherits from [QiimeClassifier](../../../module.implicit.qiime#QiimeClassifier).

## Adds modules 
**pre-requisite modules**                    
*pipeline-dependent*                   
**post-requisite modules**                    
biolockj.module.implicit.qiime.QiimeClassifier                   
biolockj.module.implicit.parser.r16s.QiimeParser                   

## Citation 
QIIME allows analysis of high-throughput community sequencing data                   
J Gregory Caporaso, Justin Kuczynski, Jesse Stombaugh, Kyle Bittinger, Frederic D Bushman, Elizabeth K Costello, Noah Fierer, Antonio Gonzalez Pena, Julia K Goodrich, Jeffrey I Gordon, Gavin A Huttley, Scott T Kelley, Dan Knights, Jeremy E Koenig, Ruth E Ley, Catherine A Lozupone, Daniel McDonald, Brian D Muegge, Meg Pirrung, Jens Reeder, Joel R Sevinsky, Peter J Turnbaugh, William A Walters, Jeremy Widmann, Tanya Yatsunenko, Jesse Zaneveld and Rob Knight; Nature Methods, 2010; doi:10.1038/nmeth.f.303                   
(needs further citation)                   
http://www.wernerlab.org/software/macqiime/citations

