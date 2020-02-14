# Input                   
                   
Specify the input data for the pipeline.                   
                   
| Property| Description |
| :--- | :--- |
| *input.dirPaths* | _list of file paths_ <br>List of one or more directories containing the pipeline input data.<br>*default:*  *null* |
| *input.ignoreFiles* | _list_ <br>file names to ignore if found in input directories<br>*default:*  *null* |
| *input.requireCompletePairs* | _boolean_ <br>Require all sequence input files have matching paired reads<br>*default:*  Y |
| *input.suffixFw* | _regex_ <br>file suffix used to identify forward reads ininput.dirPaths<br>*default:*  _R1 |
| *input.suffixRv* | _regex_ <br>file suffix used to identify reverse reads ininput.dirPaths<br>*default:*  _R2 |
| *input.trimPrefix* | _string_ <br>prefix to trim from sequence file names or headers to obtain Sample ID<br>*default:*  *null* |
| *input.trimSuffix* | _string_ <br>suffix to trim from sequence file names or headers to obtain Sample ID<br>*default:*  *null* |
                   
One way is to specify each input file by name in your metadata.                   
                   
Another way to specify one or more input directories, and specify some rules about how to link file names within that directory to sample names.                   
